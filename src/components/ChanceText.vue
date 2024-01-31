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
      v-for="(skill, skillIndex) in missOneCore.integrateCount.missOne"
      :key="`core-${index}-skill-${skillIndex}`"
    >
      {{ skillMap[skill].label }}
    </el-tag>

    <!-- TODO 測試一下各種場景 -->
    <span v-if="missOneCore.firstCanBeList.length === 0">，開頭可以是其中任一個技能</span>
    <span v-else>，其中開頭不可以是</span>
    <el-tag
      style="margin-left: 12px"
      :type="skillMap[skill].color.type"
      :effect="skillMap[skill].color.effect"
      v-for="(skill, skillIndex) in missOneCore.firstCanBeList"
      :key="`core-${index}-skill-first-cannot-${skillIndex}`"
    >
      {{ skillMap[skill].label }}
    </el-tag>

    <span style="margin: 0 12px; color: var(--el-color-info)">|</span>

    <!-- TODO 還沒處理 -->
    <el-link>查看細節</el-link>
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
      return this.chancePayload
    },
  },
}
</script>
