<template>
  <!-- success -->
  <el-text type="danger">
    <h1>🎉🎉🎉 你成功啦 🎉🎉🎉</h1>
  </el-text>

  <p>核心組成</p>
  <p v-for="(skillList, index) in renderList" :key="index">
    <span v-text="`第${index + 1}顆`"></span>
    <span>: </span>
    <span v-text="`[${skillList.join('] [')}]`"></span>
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

    skillLabelMap: {
      type: Object,
      required: true,
    },
  },

  computed: {
    renderList() {
      return this.passList.flat().map((core) => {
        const returnCore = []
        core.skills.forEach((skill) => returnCore.push(this.skillLabelMap[skill]))
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
