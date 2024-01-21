<template>
  <el-row>
    <el-col>
      <div
        v-for="(core, coreIndex) in computedValue"
        style="display: flex; margin-bottom: 12px; padding: 2px"
        :key="core.id"
        class="core"
        :class="{ error: !core.validate }"
      >
        <el-button @change="$emit('core-update')" @click="requiredCore(core)" :type="core.required ? 'warning' : ''">{{
          core.required ? '已指定' : '指定'
        }}</el-button>

        <el-select
          v-for="(_, index) in 3"
          :key="`core-skill-${index + 1}`"
          style="margin-left: 12px"
          v-model="core.skills[index]"
          placeholder="請選擇技能"
          :filterable="false /* TODO 輸入後無法刪除? */"
          @change="coreUpdate(core)"
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
</template>

<script>
import { VMatrixCore } from '../utils.js'

export default {
  name: 'CoreSelector',

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
  emits: ['core-update'],

  data() {
    return {}
  },

  computed: {
    options() {
      return this.skillOptions.filter((option) => option.label !== '')
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

  methods: {
    add(core = {}) {
      this.computedValue.push(new VMatrixCore(core))
      this.$emit('core-update')
    },

    remove(index) {
      this.computedValue.splice(index, 1)
      this.$emit('core-update')
    },

    requiredCore(core) {
      core.required = !core.required
    },

    coreUpdate(core) {
      console.log(core)
      core.doValidate()
      this.$emit('core-update')
    },
  },
}
</script>
<style scoped>
.core.error {
  background-color: var(--el-color-danger);
}
</style>
