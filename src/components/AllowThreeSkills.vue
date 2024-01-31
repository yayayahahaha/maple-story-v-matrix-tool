<template>
  <el-checkbox v-model="computedValue" label="允許單一技能重複出現 3 次" />
  <!-- TODO 還沒做範例 -->
  <el-button :text="true" style="margin-left: 12px" @click="showExample">範例</el-button>

  <el-dialog title="允許單一技能重複出現 3 次範例" v-model="showExampleVisible" width="60%">
    <el-row style="margin-bottom: 12px">
      <span>目標為 4 核 5 技</span>
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 1" :skill-map="skillMap" />
      <skill-tag skill="技能 2" :skill-map="skillMap" />
      <skill-tag skill="技能 3" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 2" :skill-map="skillMap" />
      <skill-tag skill="技能 1" :skill-map="skillMap" />
      <skill-tag skill="技能 3" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 3" :skill-map="skillMap" />
      <skill-tag skill="技能 4" :skill-map="skillMap" />
      <skill-tag skill="技能 5" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 4" :skill-map="skillMap" />
      <skill-tag skill="技能 5" :skill-map="skillMap" />
      <skill-tag skill="技能 1" :skill-map="skillMap" />
    </el-row>

    <span
      >其中技能 <skill-tag skill="技能 3" :skill-map="skillMap" />和技能
      <skill-tag skill="技能 1" :skill-map="skillMap" /> 出現了 3 次，</span
    >
    <span>由 3 個核心去練可以練得比較快，但也會失去可以把一個其他技能練到一半的機會。</span>

    <hr style="margin: 12px 0px" />

    <el-row style="margin-bottom: 12px">
      <p>目標同樣為 4 核 5 技</p>
    </el-row>

    <el-row style="margin-bottom: 12px">
      <span>包含其他技能的範例 1:</span>
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 1" :skill-map="skillMap" />
      <skill-tag skill="技能 2" :skill-map="skillMap" />
      <skill-tag skill="技能 3" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 2" :skill-map="skillMap" />
      <skill-tag skill="技能 1" :skill-map="skillMap" />
      <skill-tag skill="技能 3" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 4" :skill-map="skillMap" />
      <skill-tag skill="技能 5" :skill-map="skillMap" />
      <skill-tag :skill="OTHER_SKILL_VALUE" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 5" :skill-map="skillMap" />
      <skill-tag skill="技能 4" :skill-map="skillMap" />
      <skill-tag :skill="OTHER_SKILL_VALUE" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <span>包含其他技能的範例 2:</span>
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 1" :skill-map="skillMap" />
      <skill-tag skill="技能 2" :skill-map="skillMap" />
      <skill-tag skill="技能 3" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 2" :skill-map="skillMap" />
      <skill-tag skill="技能 3" :skill-map="skillMap" />
      <skill-tag skill="技能 4" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 4" :skill-map="skillMap" />
      <skill-tag skill="技能 5" :skill-map="skillMap" />
      <skill-tag skill="技能 1" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <skill-tag skill="技能 5" :skill-map="skillMap" />
      <skill-tag :skill="OTHER_SKILL_VALUE" :skill-map="skillMap" />
      <skill-tag :skill="OTHER_SKILL_VALUE" :skill-map="skillMap" />
    </el-row>

    <el-row style="margin-bottom: 12px">
      <span>等等組合，可以自行斟酌要不要勾選。</span>
    </el-row>
  </el-dialog>
</template>

<script>
import SkillTag from './SkillTag.vue'
import { OTHER_SKILL_VALUE } from '../utils'

export default {
  name: 'AllowThreeSkills',

  components: { SkillTag },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      skillMap: {
        '技能 1': { color: { effect: 'dark', type: '' }, label: '技能 1', value: '技能 1' },
        '技能 2': { color: { effect: 'dark', type: 'info' }, label: '技能 2', value: '技能 2' },
        '技能 3': { color: { effect: 'dark', type: 'success' }, label: '技能 3', value: '技能 3' },
        '技能 4': { color: { effect: 'dark', type: 'danger' }, label: '技能 4', value: '技能 4' },
        '技能 5': { color: { effect: 'dark', type: 'warning' }, label: '技能 5', value: '技能 5' },
      },
      showExampleVisible: false,
    }
  },

  computed: {
    OTHER_SKILL_VALUE: () => OTHER_SKILL_VALUE,

    computedValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },

  methods: {
    showExample() {
      this.showExampleVisible = true
    },
  },
}
</script>
