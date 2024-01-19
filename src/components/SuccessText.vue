<template>
  <!-- success -->
  <el-text type="danger">
    <h1>🎉🎉🎉 你成功啦 🎉🎉🎉</h1>
  </el-text>

  <p>核心組成</p>
  <p v-for="(skillList, index) in renderList" :key="index" style="margin-bottom: 12px">
    <span v-text="`第 ${index + 1} 顆`"></span>
    <span>: </span>
    <el-tag
      :type="skill.color.type"
      :effect="skill.color.effect"
      style="margin-left: 12px"
      v-for="(skill, skillIndex) in skillList"
      :key="skillIndex"
      >{{ skill.label }}</el-tag
    >
  </p>
</template>

<script>
export default {
  name: 'SuccessText',

  props: {
    passList: {
      type: Array,
      required: true,
    },

    skillMap: {
      type: Object,
      required: true,
    },
  },

  computed: {
    renderList() {
      return this.passList.flat().map((core) => {
        const returnCore = []
        core.skills.forEach((skill) => returnCore.push(this.skillMap[skill]))
        return returnCore
      })
    },
  },

  created() {
    console.log(this.passList.flat())
  },

  methods: {},
}
</script>
