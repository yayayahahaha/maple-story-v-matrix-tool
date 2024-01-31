<template>
  <el-text type="danger">
    <h1>🎉🎉🎉 你成功啦 🎉🎉🎉</h1>
  </el-text>

  <div v-for="(combination, index) in passList" :key="index" style="margin-bottom: 12px">
    <div v-for="(core, coreIndex) in combination" :key="coreIndex" style="margin-bottom: 12px">
      <span style="margin-right: 12px">{{ `第 ${coreIndex + 1} 顆` }}</span>

      <skill-tag v-for="skill in core.skills" :key="skill" :skill="skill" :skill-map="skillMap" />
    </div>
    <el-divider v-if="index + 1 !== passList.length" />
  </div>
</template>

<script>
import SkillTag from './SkillTag.vue'

export default {
  name: 'SuccessText',

  components: { SkillTag },

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
