<template>
  <el-row>
    <el-col>
      <div v-for="(core, coreIndex) in computedValue" style="display: flex; margin-bottom: 12px" :key="core.id">
        <el-button @click="requiredCore(core)" :type="core.required ? 'warning' : ''">{{
          core.required ? '已指定' : '指定'
        }}</el-button>
        <el-select
          style="margin-left: 12px"
          v-model="core.skills[0]"
          placeholder="請選擇技能"
          :filterable="false /* TODO 輸入後無法刪除? */"
        >
          <el-option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :label="option.label"
          ></el-option>
        </el-select>
        <el-select
          style="margin-left: 12px"
          v-model="core.skills[1]"
          placeholder="請選擇技能"
          :filterable="false /* TODO 輸入後無法刪除? */"
        >
          <el-option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :label="option.label"
          ></el-option>
        </el-select>
        <el-select
          style="margin-left: 12px"
          v-model="core.skills[2]"
          placeholder="請選擇技能"
          :filterable="false /* TODO 輸入後無法刪除? */"
        >
          <el-option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :label="option.label"
          ></el-option>
        </el-select>
        <el-button style="margin-left: 12px" type="primary" plain @click="add(core)">複製</el-button>
        <el-button type="danger" :disabled="computedValue.length === 1" @click="remove(coreIndex)">刪除</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="15" style="margin-top: 12px">
    <el-col style="margin-bottom: 12px">
      <el-button type="primary" style="width: 100%" @click="add()">添加核心</el-button>
    </el-col>
  </el-row>

  <el-descriptions>
    <el-descriptions-item>
      <h5>
        註:
        「指定」的意思是排列組合裡一定要有這顆核心。主要用於已經先把可用的核心提升過等級、但仍未湊齊其他核心的場景，這時就會將這顆已經提升過等級的核心指定為指定核心，避免如果排列組合沒有選到此顆核心時那些經驗值就浪費了。
      </h5>
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
    options() {
      return this.skillOptions.flat().filter((option) => !option.disabled && option.label !== '')
    },

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
    add(core = {}) {
      this.computedValue.push(new VMatrixCore(core))
    },

    remove(index) {
      this.computedValue.splice(index, 1)
    },

    requiredCore(core) {
      core.required = !core.required
    },
  },
}
</script>
