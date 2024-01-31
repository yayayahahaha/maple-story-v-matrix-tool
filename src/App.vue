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
            <skills-input v-model="skills" @skill-input-changed="skillInputChanged($event)" />

            <el-col v-if="skillHasSlot">
              <el-row>
                <allow-three-skills v-model="allowThreeSkills" />
              </el-row>
            </el-col>

            <el-col>
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
import SkillsInput from './components/SkillsInput.vue'
// TODO 有一個什麼奇怪的 eslint bug?

import JobSelector from './components/JobSelector.vue'
import CoreSelector from './components/CoreSelector.vue'
import SuccessText from './components/SuccessText.vue'
import FailedText from './components/FailedText.vue'
import ChanceText from './components/ChanceText.vue'
import Description from './components/Description.vue'
import AllowThreeSkills from './components/AllowThreeSkills.vue'
import { jobsMap, FREE_JOB_TEXT, SUCCESS_STATUS, FAILED_STATUS, CHANCE_STATUS } from './dictionary'
import {
  VMatrixCore,
  vMatrixTool,
  CURRENT_JOB_KEY,
  resetLocalStorage,
  getLocalStorageData,
  saveLocalStorageData,
  OTHER_SKILL_VALUE,
  OTHER_SKILL_LABEL,
} from './utils'

const COLOR_SET = [
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
  { effect: 'plain', type: '' },
  { effect: 'plain', type: 'success' },
]
const createSkillList = () =>
  [...new Array(12)].map((_, index) => ({
    label: '',
    value: `技能 ${index + 1}`,
    placeholder: `技能 ${index + 1}`,
    color: COLOR_SET[index],
  }))

export default {
  name: 'App',

  components: {
    SkillsInput,
    JobSelector,
    CoreSelector,
    SuccessText,
    FailedText,
    ChanceText,
    Description,
    AllowThreeSkills,
  },

  data() {
    return {
      isLoading: false, // for simulate

      allowThreeSkills: true,

      myJob: FREE_JOB_TEXT,
      skills: createSkillList(),
      coreList: [],

      passList: [],
      isFailed: false,
      chancePayload: [],
    }
  },

  computed: {
    skillHasSlot() {
      const filledSkillListLength = this.skills.filter((skill) => skill.label).length
      return Math.floor((filledSkillListLength * 2) / 3) !== Math.ceil((filledSkillListLength * 2) / 3)
    },

    skillMap() {
      return Object.fromEntries(
        this.skills
          .map((skill) => [skill.value, skill])
          .concat([
            [
              OTHER_SKILL_VALUE,
              {
                color: {},
                label: OTHER_SKILL_LABEL,
                value: OTHER_SKILL_VALUE,
              },
            ],
          ])
      )
    },
  },

  watch: {
    myJob() {
      this.resetStatus()

      const savedData = getLocalStorageData() || {}

      _skillPart.call(this)
      _corePart.call(this)

      this.saveData()

      function _skillPart() {
        // 如果是自由職業
        if (this.myJob === FREE_JOB_TEXT) {
          // 沒有存過, 直接清空
          if (!savedData[FREE_JOB_TEXT]?.skills) {
            this.clearSkills()
          } else {
            this.skills = savedData[FREE_JOB_TEXT]?.skills
          }
        } else {
          // 如果是其他職業

          // 先直接重置, 避免後面的東西沒有被清掉
          this.clearSkills()
          if (savedData[this.myJob] != null) {
            this.skills = savedData[this.myJob].skills
          } else {
            // 沒有存過, 綁上寫死的技能組
            this.resetSkills()
          }
        }
      }

      function _corePart() {
        if (!savedData[this.myJob]?.coreList) {
          this.resetCoreList()
        } else {
          // TODO 這邊可以整合? 有兩段相似的 code, 好像也不一定要就是了
          this.coreList = []
          savedData[this.myJob].coreList.forEach((savedCore) => {
            const { required, skills: originSkills } = savedCore
            this.coreList.push(
              new VMatrixCore({
                required,
                skills: originSkills.slice(),
              })
            )
          })
        }
      }
    },
  },

  mounted() {
    this.defaultSetting()

    this.loadData()
    window.vm = this
  },

  methods: {
    defaultSetting() {
      // default core
      this.coreList.push(new VMatrixCore())
    },

    skillInputChanged(skill) {
      skill.label = skill.label.trim()

      this.saveData()
    },

    resetAll() {
      resetLocalStorage()
      window.location.reload()
    },

    clearSkills() {
      this.skills = createSkillList()
    },

    resetCoreList() {
      this.coreList = [new VMatrixCore()]
    },

    resetSkills() {
      if (this.myJob !== FREE_JOB_TEXT) {
        const jobInfo = jobsMap[this.myJob].skills
        this.skills.forEach((skill, index) => {
          skill.label = jobInfo[index] || ''
        })
      } else {
        this.clearSkills()
      }
      this.saveData()
    },

    saveData() {
      const { coreList, myJob, skills } = this
      saveLocalStorageData({ coreList, myJob, skills })
    },

    loadData() {
      const savedData = getLocalStorageData()
      if (savedData == null) return

      this.$notify.success('已成功套用先前的操作記錄')

      this.myJob = savedData[CURRENT_JOB_KEY]
      _loadSkillPart.call(this)
      _loadCorePart.call(this)

      function _loadSkillPart() {
        this.clearSkills()
        this.skills.forEach((skill, index) => {
          skill.label = savedData[this.myJob].skills[index].label
        })
      }

      function _loadCorePart() {
        this.coreList = []
        savedData[this.myJob].coreList.forEach((savedCore) => {
          const { required, skills: originSkills } = savedCore
          this.coreList.push(
            new VMatrixCore({
              required,
              skills: originSkills.slice(),
            })
          )
        })
      }
    },

    resetStatus() {
      this.passList = []
      this.isFailed = false
      this.chancePayload = []
    },

    check() {
      const formatSkillList = this.skills.filter((skill) => {
        return skill.label !== ''
      })

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
        const list = core.skills.filter((skill) => skill !== OTHER_SKILL_VALUE)
        return list.length === [...new Set(list)].length
      })
      if (!coreSkillsUnique) {
        this.$notify.error('在「我目前有的核心」欄位有核心出現一樣的技能，請檢查一下')
        return false
      }

      return true
    },

    async start() {
      if (!this.check()) return

      // just for simulation
      this.isLoading = true
      await new Promise((r) => setTimeout(r, 200))
      this.isLoading = false

      // 清掉上次的計算結果
      this.resetStatus()

      // 排除掉沒有填寫完畢的 core
      const formatCoreList = this.coreList.filter((core) => {
        return core.skills.every((skill) => {
          return skill !== null && skill !== ''
        })
      })
      const formatSkillList = this.skills.filter((skill) => skill.label !== '').map((skill) => skill.value)

      const result = vMatrixTool(formatCoreList, formatSkillList)
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
