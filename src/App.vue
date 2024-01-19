<template>
  <el-row :gutter="15" class="container">
    <el-col style="margin-bottom: 12px">
      <h1>楓之谷 V 矩陣 核心工具</h1>
      <h6>適用版本: Ver.2.58.3</h6>
    </el-col>

    <el-col>
      <el-form>
        <el-form-item label="我的職業是">
          <job-selector v-model="myJob" />
        </el-form-item>

        <el-form-item label="我想要湊">
          <el-radio-group v-model="targetCoreNumber">
            <el-radio :label="4">四核六技</el-radio>
            <el-radio :label="6">六核九技</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="我想要的技能是">
          <el-col>
            <el-row v-for="(skillRow, rowIndex) in skills" :key="rowIndex" :gutter="15" style="margin-bottom: 20px">
              <el-col :span="6" v-for="(skill, index) in skillRow" :key="index">
                <el-input :placeholder="skill.placeholder" v-model="skill.label" :disabled="skill.disabled" />
              </el-col>
            </el-row>
          </el-col>
        </el-form-item>

        <el-form-item label="我目前有的核心" />

        <core-selector v-model="coreList" :skill-options="skills" />

        <el-row>
          <el-col>
            <el-col>
              <el-button style="width: 100%" type="success" @click="start">開始計算</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>

      <el-divider></el-divider>

      <success-text v-if="passList.length !== 0" :pass-list="passList" :skill-map="skillMap" />
    </el-col>
  </el-row>
</template>

<script>
import JobSelector from './components/JobSelector.vue'
import CoreSelector from './components/CoreSelector.vue'
import SuccessText from './components/SuccessText.vue'
import { FREE_JOB_TEXT, SUCCESS_STATUS, FAILED_STATUS, CHANCE_STATUS } from './dictionary'
import { vMatrixTool } from './utils'

export default {
  name: 'App',

  components: {
    JobSelector,
    CoreSelector,
    SuccessText,
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
        // TODO testing codes
        label: `${index}`,
        // label: '',
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
      myJob: FREE_JOB_TEXT,
      targetCoreNumber: null,
      skills,
      coreList: [],

      passList: [],
    }
  },

  computed: {
    skillMap() {
      return Object.fromEntries(this.skills.flat().map((skill) => [skill.value, skill]))
    },
  },

  watch: {
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

  methods: {
    success({ passList }) {
      this.passList = passList
    },
    start() {
      this.passList = []

      const result = vMatrixTool(this.coreList, this.targetCoreNumber)
      switch (result.status) {
        case SUCCESS_STATUS:
          this.success(result)
          break
        case FAILED_STATUS:
          this.failed()
          break
        case CHANCE_STATUS:
          this.chance()
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

.container {
  padding: 15px;
}
</style>
