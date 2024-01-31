<!-- TODO 檢查一下哪裡還有沒有整理過來的 skill-tag -->

<template>
  <span v-if="isOther" style="margin-right: 12px; color: var(--el-color-info-light-3)">{{ OTHER_SKILL_LABEL }}</span>
  <el-tag v-else :type="type" :effect="effect" style="margin-right: 12px">
    {{ label }}
  </el-tag>
</template>

<script>
import { OTHER_SKILL_VALUE, OTHER_SKILL_LABEL } from '../utils'
export default {
  name: 'SkillTag',

  props: {
    skill: {
      type: String,
      required: true,
    },

    skillMap: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isOther() {
      return this.skill === OTHER_SKILL_VALUE
    },

    OTHER_SKILL_LABEL: () => OTHER_SKILL_LABEL,

    skillInfo() {
      return this.skillMap[this.skill]
    },

    label() {
      return this.skillInfo.label
    },

    type() {
      return this.skillInfo.color.type
    },

    effect() {
      return this.skillInfo.color.effect
    },
  },
}
</script>

<style>
/* TODO 如果不是最後一個的話才加的 margin-left  */
</style>
