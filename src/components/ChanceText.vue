<template>
  <el-text>
    <h2>💥💥💥 好機會 💥💥💥</h2>
  </el-text>

  <p>只要再開到下列任一核心，就可以完成技能組合:</p>
  <div v-for="(missOneCore, index) in missOneCoreList" :key="`core-${index}`" style="margin-bottom: 12px">
    <chance-core :miss-one-core-info="missOneCore" :skill-map="skillMap" />
  </div>
</template>

<script>
import ChanceCore from './ChanceCore.vue'

export default {
  name: 'ChanceText',

  components: { ChanceCore },

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
      missOneCorePayload: null,
    }
  },

  computed: {
    missOneCoreList() {
      return this.chancePayload
    },
  },

  methods: {},
}
</script>
