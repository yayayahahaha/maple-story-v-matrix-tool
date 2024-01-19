<template>
  <el-text>
    <h2>💥💥💥 好機會 💥💥💥</h2>
  </el-text>

  <p>只要再開到下列核心，就可以完成技能組合:</p>
  <div v-for="(missOneCore, index) in missOneCoreList" :key="`core-${index}`" style="margin-bottom: 12px">
    <el-tag
      style="margin-right: 12px"
      :type="skillMap[skill].color.type"
      :effect="skillMap[skill].color.effect"
      v-for="(skill, skillIndex) in missOneCore.skills"
      :key="`core-${index}-skill-${skillIndex}`"
    >
      {{ skillMap[skill].label }}
    </el-tag>

    <span v-if="missOneCore.allAllow">，開頭可以是其中任一個技能</span>
    <span v-else>，其中開頭不可以是</span>
    <el-tag
      style="margin-left: 12px"
      :type="skillMap[skill].color.type"
      :effect="skillMap[skill].color.effect"
      v-for="(skill, skillIndex) in missOneCore.firstCannotList"
      :key="`core-${index}-skill-first-cannot-${skillIndex}`"
    >
      {{ skillMap[skill].label }}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'ChanceText',

  props: {
    chancePayload: {
      type: Object,
      required: true,
    },

    skillMap: {
      type: Object,
      required: true,
    },
  },

  computed: {
    missOneCoreList() {
      return Object.keys(this.chancePayload).map((skillsKey) => {
        const { firstCannotList, coreList, allAllow } = this.chancePayload[skillsKey]
        const skills = coreList[0].neededOne
        return { allAllow, skills, firstCannotList }
      })
    },
  },
}
</script>
