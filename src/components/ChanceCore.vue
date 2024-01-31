<template>
  <skill-tag
    v-for="(skill, skillIndex) in neededSkillList"
    :key="`skill-${skillIndex}`"
    :skill="skill"
    :skill-map="skillMap"
  />

  <span v-if="firstCanBeList.length === 3">，開頭可以是其中任一個技能</span>

  <span v-else-if="firstCanBeList.length === 0">
    <span>，其中開頭<b>可以</b>是 </span>
    <b style="color: var(--el-color-error)">{{ OTHER_SKILL_LABEL }}</b>
  </span>

  <span v-else>
    <span>，其中開頭<b>可以</b>是 </span>

    <skill-tag
      v-for="(skill, skillIndex) in firstCanBeList"
      :key="`skill-first-cannot-${skillIndex}`"
      :skill="skill"
      :skill-map="skillMap"
    />
    <span v-if="allowOther">
      或 <b style="color: var(--el-color-error)">{{ OTHER_SKILL_LABEL }}</b></span
    >
  </span>

  <span style="margin: 0 12px; color: var(--el-color-info)">|</span>

  <el-link @click="showDetail">查看細節</el-link>

  <chance-core-detail-dialog v-model="changeDetailVisible" :payload="missOneCoreInfo" :skill-map="skillMap" />
</template>

<script>
import SkillTag from './SkillTag.vue'
import ChanceCoreDetailDialog from './ChanceCoreDetailDialog.vue'
import { OTHER_SKILL_LABEL } from '../utils'

export default {
  name: 'ChanceCore',

  components: {
    SkillTag,
    ChanceCoreDetailDialog,
  },

  props: {
    missOneCoreInfo: {
      type: Object,
      required: true,
    },

    skillMap: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      changeDetailVisible: false,
    }
  },

  computed: {
    OTHER_SKILL_LABEL: () => OTHER_SKILL_LABEL,

    allowOther() {
      return this.neededSkillList.length < 3
    },

    neededSkillList() {
      return this.missOneCoreInfo.integrateCount.missOne
    },

    firstCanBeList() {
      return this.missOneCoreInfo.firstCanBeList
    },
  },

  methods: {
    showDetail() {
      this.changeDetailVisible = true
    },
  },
}
</script>
