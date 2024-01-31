<template>
  <el-text>
    <h2>💥💥💥 好機會 💥💥💥</h2>
  </el-text>

  <p>只要再開到下列任一核心，就可以完成技能組合:</p>
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
    <span v-if="missOneCore.firstCanBeList.length === 3">，開頭可以是其中任一個技能</span>
    <span v-else>
      <span>，其中開頭<b>可以</b>是</span>
      <el-tag
        style="margin-left: 12px"
        :type="skillMap[skill].color.type"
        :effect="skillMap[skill].color.effect"
        v-for="(skill, skillIndex) in missOneCore.firstCanBeList"
        :key="`core-${index}-skill-first-cannot-${skillIndex}`"
      >
        {{ skillMap[skill].label }}
      </el-tag>
    </span>

    <span style="margin: 0 12px; color: var(--el-color-info)">|</span>

    <!-- TODO 還沒處理 -->
    <el-link @click="showDetail(missOneCore)">查看細節</el-link>
  </div>

  <chance-core-detail-dialog v-model="changeDetailVisible" :payload="missOneCorePayload" :skill-map="skillMap" />
</template>

<script>
import ChanceCoreDetailDialog from './ChanceCoreDetailDialog.vue'

export default {
  name: 'ChanceText',

  components: { ChanceCoreDetailDialog },

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

  data() {
    return {
      changeDetailVisible: false,
      missOneCorePayload: null,
    }
  },

  computed: {
    missOneCoreList() {
      return this.chancePayload
    },
  },

  methods: {
    showDetail(missOneCore) {
      this.changeDetailVisible = true
      this.missOneCorePayload = missOneCore
    },
  },
}
</script>
