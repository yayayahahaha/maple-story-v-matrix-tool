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

          <el-form-item label="我想要的技能是">
            <el-col>
              <el-row v-for="(skillRow, rowIndex) in skills" :key="rowIndex" :gutter="15" style="margin-bottom: 20px">
                <el-col :span="6" v-for="(skill, index) in skillRow" :key="index">
                  <el-input :placeholder="skill.placeholder" v-model="skill.label" @change="skillInputChanged(skill)" />
                </el-col>
              </el-row>
              <el-row>
                <el-button type="primary" plain @click="resetSkills">重置</el-button>
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

      <el-button @click="resetAll">清除全部資料</el-button>
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
import { vMatrixTool, CURRENT_JOB_KEY, resetLocalStorage, getLocalStorageData, saveLocalStorageData } from './utils'

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

    const skills = [...new Array(12)]
      .map((_, index) => ({
        label: '',
        value: `技能 ${index + 1}`,
        placeholder: `技能 ${index + 1}`,
        color: colorSet[index],
      }))
      .reduce((list, skill, index) => {
        const listIndex = Math.floor(index / 3)
        list[listIndex] = list[listIndex] || []
        list[listIndex].push(skill)
        return list
      }, [])

    console.log('skills:', skills)

    return {
      isLoading: false, // for simulate

      myJob: FREE_JOB_TEXT,
      skills,
      coreList: [],

      passList: [],
      isFailed: false,
      chancePayload: [],

      dataLoaded: false,
    }
  },

  computed: {
    skillMap() {
      return Object.fromEntries(this.skills.flat().map((skill) => [skill.value, skill]))
    },
  },

  watch: {
    myJob() {
      const flatSkills = this.skills.flat()
      const savedData = getLocalStorageData() || {}

      _skillPart.call(this)
      _corePart.call(this)

      this.saveData()

      function _skillPart() {
        // 如果是自由職業
        if (this.myJob === FREE_JOB_TEXT) {
          // 沒有存過, 直接清空
          if (!savedData[FREE_JOB_TEXT]?.skills) {
            this.skills.flat().forEach((skill) => Object.assign(skill, { label: '' }))
          } else {
            this.skills = savedData[FREE_JOB_TEXT]?.skills
          }
        } else {
          // 如果是其他職業

          // 沒有存過, 直接清空, 避免後面的東西沒有被清掉
          this.skills.flat().forEach((skill) => Object.assign(skill, { label: '' }))
          const jobInfo = jobsMap[this.myJob]
          if (savedData[this.myJob] != null) {
            this.skills = savedData[this.myJob].skills
          } else {
            jobInfo.skills.forEach((skill, index) => {
              flatSkills[index].label = skill
            })
          }
        }
      }

      function _corePart() {
        if (!savedData[this.myJob]?.coreList) {
          this.coreList.splice(1)
          this.coreList.forEach((core) => {
            core.skills = core.skills.map(() => null)
          })
        } else {
          this.coreList = savedData[this.myJob].coreList
        }
      }
    },
  },

  mounted() {
    this.loadData()
    window.vm = this
  },

  methods: {
    skillInputChanged(skill) {
      skill.label = skill.label.trim()

      this.saveData()
    },

    resetAll() {
      resetLocalStorage()
      window.location.reload()
    },

    resetSkills() {
      this.skills.flat().forEach((skill) => Object.assign(skill, { label: '' }))
      if (this.myJob !== FREE_JOB_TEXT) {
        const jobInfo = jobsMap[this.myJob].skills
        this.skills.flat().forEach((skill, index) => {
          skill.label = jobInfo[index] || ''
        })
      }
      this.saveData()
    },

    saveData() {
      if (!this.dataLoaded) return

      const { coreList, myJob, skills } = this
      saveLocalStorageData({ coreList, myJob, skills })
    },

    loadData() {
      this.dataLoaded = true // to avoid core-update refresh page

      const savedData = getLocalStorageData()
      if (savedData == null) return

      this.myJob = savedData[CURRENT_JOB_KEY]
      this.skills = savedData[this.myJob].skills
      this.coreList = savedData[this.myJob].coreList
    },

    resetStatus() {
      this.passList = []
      this.isFailed = false
      this.chancePayload = []
    },

    check() {
      const formatSkillList = this.skills.flat().filter((skill) => {
        skill.label !== ''
      })

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

      // TODO 這裡要改掉，大改
      const result = vMatrixTool(formatCoreList, 4)
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
