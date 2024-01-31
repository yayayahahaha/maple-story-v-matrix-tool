<template>
  <el-tag :type="skillMap[skill].color.type" :effect="skillMap[skill].color.effect" style="margin-right: 12px">
    {{ skillMap[skill].label }}
  </el-tag>
</template>

<script>
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
}
</script>
