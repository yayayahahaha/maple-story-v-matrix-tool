<template>
  <div class="outer">
    <el-row :gutter="15" class="container">
      <el-col style="margin-bottom: 12px">
        <h1>楓之谷 V 矩陣 核心工具</h1>
        <h6>適用版本: Ver.2.58.3 (2024/1)</h6>
      </el-col>

      <el-col>
        <el-form>
          <el-form-item label="我的職業是">
            <job-selector v-model="myJob" />
          </el-form-item>

          <el-form-item label="我想要湊">
            <el-radio-group v-model="targetCoreNumber">
              <el-radio :label="4">4 核 6 技</el-radio>
              <el-radio :label="6">6 核 9 技</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="我想要的技能是">
            <el-col>
              <el-row v-for="(skillRow, rowIndex) in skills" :key="rowIndex" :gutter="15" style="margin-bottom: 20px">
                <el-col :span="6" v-for="(skill, index) in skillRow" :key="index">
                  <el-input
                    :placeholder="skill.placeholder"
                    v-model="skill.label"
                    @change="skillInputChanged(skill)"
                    :disabled="skill.disabled"
                  />
                </el-col>
              </el-row>
              <el-row>
                <!-- TODO reset button implement -->
                <el-button type="primary" plain>重置</el-button>
              </el-row>
            </el-col>
          </el-form-item>

          <el-form-item label="我目前有的核心" />

          <core-selector v-model="coreList" :skill-options="skills" @core-update="saveData" />

          <el-row>
            <el-col>
              <el-col>
                <el-button style="width: 100%" type="success" @click="start">開始計算</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>

        <el-divider></el-divider>

        <div v-loading="isLoading">
          <success-text v-if="passList.length !== 0" :pass-list="passList" :skill-map="skillMap" />
          <failed-text v-else-if="isFailed" />
          <chance-text v-else-if="chancePayload.length !== 0" :chance-payload="chancePayload" :skill-map="skillMap" />
        </div>
      </el-col>

      <description />
    </el-row>
  </div>
</template>

<script>
import JobSelector from './components/JobSelector.vue'
import CoreSelector from './components/CoreSelector.vue'
import SuccessText from './components/SuccessText.vue'
import FailedText from './components/FailedText.vue'
import ChanceText from './components/ChanceText.vue'
import Description from './components/Description.vue'
import { jobsMap, FREE_JOB_TEXT, SUCCESS_STATUS, FAILED_STATUS, CHANCE_STATUS } from './dictionary'
import { vMatrixTool, getLocalStorageData, saveLocalStorageData } from './utils'

export default {
  name: 'App',

  components: {
    JobSelector,
    CoreSelector,
    SuccessText,
    FailedText,
    ChanceText,
    Description,
  },

  data() {
    const colorSet = [
      { effect: 'dark', type: '' },
      { effect: 'dark', type: 'info' },
      { effect: 'dark', type: 'success' },
      { effect: 'dark', type: 'danger' },
      { effect: 'dark', type: 'warning' },
      { effect: 'light', type: '' },
      { effect: 'light', type: 'info' },
      { effect: 'light', type: 'success' },
      { effect: 'light', type: 'danger' },
      { effect: 'light', type: 'warning' },
    ]

    const skills = [...new Array(9)]
      .map((_, index) => ({
        value: `skill-${index + 1}`,
        placeholder: `技能 ${index + 1}`,
        label: '',
        color: colorSet[index],
        disabled: false,
      }))
      .reduce(
        (list, skill, index) => {
          list[Math.floor(index / 3)].push(skill)

          return list
        },
        [[], [], []]
      )

    return {
      isLoading: false, // for simulate

      myJob: FREE_JOB_TEXT,
      targetCoreNumber: null,
      skills,
      coreList: [],

      passList: [],
      isFailed: false,
      chancePayload: [],
    }
  },

  computed: {
    skillMap() {
      return Object.fromEntries(this.skills.flat().map((skill) => [skill.value, skill]))
    },
  },

  watch: {
    myJob() {
      this.saveData()

      const flatSkills = this.skills.flat()

      // 如果是自由職業
      if (this.myJob === FREE_JOB_TEXT) {
        flatSkills.forEach((skill) => Object.assign(skill, { label: '' }))
        return
      }

      const jobInfo = jobsMap[this.myJob]
      if (jobInfo == null) {
        alert('發生了奇怪的錯誤，可以先用手動輸入的嗎 🥲')
        return
      }

      this.targetCoreNumber = (() => {
        // 凱殷 有夠特別
        if (this.myJob === '凱殷') return 6

        switch (jobInfo.skills.length) {
          case 6:
            return 4
          case 9:
            return 6
          default:
            return 4
        }
      })()

      flatSkills.forEach((skill) => {
        skill.label = ''
      })
      jobInfo.skills.forEach((skill, index) => {
        flatSkills[index].label = skill
      })
    },

    targetCoreNumber(targetCoreNumber) {
      const flatSkills = this.skills.flat()

      if (targetCoreNumber === 4) {
        flatSkills.slice(6).forEach((skill) => Object.assign(skill, { disabled: true }))
      } else {
        flatSkills.forEach((skill) => Object.assign(skill, { disabled: false }))
      }
    },
  },

  created() {
    this.targetCoreNumber = 4
  },

  mounted() {
    this.loadData()
  },

  methods: {
    skillInputChanged(skill) {
      skill.label = skill.label.trim()

      this.saveData()
    },
    saveData() {
      const { coreList, myJob, skills } = this
      saveLocalStorageData({ coreList, myJob, skills })
    },
    loadData() {
      const savedData = getLocalStorageData()
      if (savedData == null) return

      console.log('loadData')
    },

    resetStatus() {
      this.passList = []
      this.isFailed = false
      this.chancePayload = []
    },

    check() {
      const formatSkillList = this.skills.flat().filter((skill) => !skill.disabled)

      // 空白欄位
      const emptySkill = formatSkillList.some((skill) => skill.label === '')
      if (emptySkill) {
        this.$notify.error('請填滿所有「想要的技能」欄位')
        return false
      }

      // 重複技能欄位
      const skillUnique = formatSkillList.length === [...new Set(formatSkillList.map((skill) => skill.label))].length
      if (!skillUnique) {
        this.$notify.error('在「想要的技能」欄位有出現一樣的技能名稱，請檢查一下')
        return false
      }

      // TODO 在選擇器上畫顏色? custom selector options 之類的

      // 相同核心有重複的技能
      const coreSkillsUnique = this.coreList.every((core) => {
        // 有空的就不看了
        if (core.skills.some((skill) => skill === null)) return true

        // 直接用 unique 判斷
        return core.skills.length === [...new Set(core.skills)].length
      })
      if (!coreSkillsUnique) {
        this.$notify.error('在「我目前有的核心」欄位有核心出現一樣的技能，請檢查一下')
        return false
      }

      return true
    },

    async start() {
      if (!this.check()) return

      this.isLoading = true
      await new Promise((r) => setTimeout(r, 200))
      this.isLoading = false

      this.resetStatus()

      const formatCoreList = this.coreList.filter((core) => core.skills.every((skill) => skill !== null))

      const result = vMatrixTool(formatCoreList, this.targetCoreNumber)
      switch (result.status) {
        case SUCCESS_STATUS:
          this.passList = result.passList
          break

        case FAILED_STATUS:
          this.isFailed = true
          break

        case CHANCE_STATUS:
          this.chancePayload = result.payload
          break
      }
    },
  },
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

.outer {
  width: 100%;
  justify-content: center;
  display: flex;
}

.container {
  padding: 15px;
  max-width: 900px;
}
</style>
