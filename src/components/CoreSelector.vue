<template>
  <el-row>
    <el-col>
      <div v-for="core in computedValue" style="display: flex; margin-bottom: 12px" :key="core.id">
        <el-button>指定</el-button>
        <el-select style="margin-left: 12px"></el-select>
        <el-select style="margin-left: 12px"></el-select>
        <el-select style="margin-left: 12px"></el-select>
        <el-button style="margin-left: 12px" type="primary" plain>複製</el-button>
        <el-button type="danger">刪除</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="15" style="margin-top: 12px">
    <el-col style="margin-bottom: 12px">
      <el-button type="primary" style="width: 100%" @click="add">添加核心</el-button>
    </el-col>
  </el-row>

  <el-descriptions>
    <el-descriptions-item>
      <h5>註: 「指定」的意思是排列組合裡一定要有這顆核心，常用於已經提升等級、但仍未湊齊其他核心的場景。</h5>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { VMatrixCore } from '../utils.js'

export default {
  name: 'CoreSelector',

  components: {},

  props: {
    modelValue: {
      type: Array,
      required: true,
    },

    skillOptions: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {}
  },

  computed: {
    computedValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },

  watch: {},

  created() {
    if (this.computedValue.length < 1) this.add()
  },

  methods: {
    add() {
      this.computedValue.push(new VMatrixCore())
      console.log(this.skillOptions)
    },
  },
}
</script>
