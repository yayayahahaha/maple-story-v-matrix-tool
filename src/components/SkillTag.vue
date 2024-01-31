<template>
  <span v-if="isOther" class="skill-item is-other">{{ OTHER_SKILL_LABEL }}</span>
  <el-tag v-else :type="type" :effect="effect" class="skill-item">
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
.skill-item:not(:last-child) {
  margin-right: 12px;
}
.skill-item.is-other {
  color: var(--el-color-info-light-3);
}
</style>
