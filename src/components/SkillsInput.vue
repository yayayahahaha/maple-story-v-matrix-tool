<template>
  <el-col>
    <el-row v-for="(_, rowIndex) in 4" :gutter="15" style="margin-bottom: 20px" :key="`row-${rowIndex}`">
      <el-col
        :span="6"
        v-for="(skill, colIndex) in 3"
        :key="`col-${colIndex}`"
        :set="(skill = computedValue[rowIndex * 3 + colIndex])"
      >
        <el-input
          :placeholder="skill.placeholder"
          v-model="skill.label"
          @change="$emit('skill-input-changed', skill)"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-text
          >依照想要的技能組合，目標為
          <b
            ><span>{{ coreCount }}</span> 核 <span>{{ skillCount }}</span> 技</b
          >
        </el-text>
      </el-col>

      <!-- TODO 核心未滿的情況下，可不可以接受有技能是站了 3 位子的 checkbox 和 example 提示 -->
    </el-row>

    <el-button type="primary" plain @click="$emit('reset-skills')">重置</el-button>
  </el-col>
</template>

<script>
export default {
  name: 'SkillsInput',

  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },

  computed: {
    computedValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },

    // TODO 這裡要改寫一下: 如果只想要兩個技能的話，可能會出問題
    coreCount() {
      return Math.ceil((this.skillCount * 2) / 3)
    },

    skillCount() {
      return this.computedValue.filter((skill) => skill.label !== '').length
    },
  },
}
</script>
