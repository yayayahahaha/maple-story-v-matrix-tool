<template>
  <el-text type="danger">
    <h1>🎉🎉🎉 你成功啦 🎉🎉🎉</h1>
  </el-text>

  <div v-for="(combination, index) in passList" :key="index" style="margin-bottom: 12px">
    <div v-for="(core, coreIndex) in combination" :key="coreIndex" style="margin-bottom: 12px">
      <span>{{ `第 ${coreIndex + 1} 顆` }}</span>
      <el-tag
        v-for="(skill, skillIndex) in core.skills"
        :type="skillMap[skill].color.type"
        :effect="skillMap[skill].color.effect"
        style="margin-left: 12px"
        :key="skillIndex"
      >
        {{ skillMap[skill].label }}
      </el-tag>
    </div>
    <el-divider v-if="index + 1 !== passList.length" />
  </div>
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
      return this.passList.map((group) => {
        return group.map((core) => {
          const returnCore = []
          core.skills.forEach((skill) => returnCore.push(this.skillMap[skill]))
          return returnCore
        })
      })
    },
  },
}
</script>
