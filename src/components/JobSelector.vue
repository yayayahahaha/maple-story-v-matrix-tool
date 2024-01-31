<template>
  <el-select v-model="computedValue" :filterable="false /*TODO 為什麼不能刪除?*/">
    <el-option :value="FREE_JOB_TEXT" key="自由的" label="自由的" />
    <el-option-group v-for="group in optionGroup" :key="group.key" :label="group.groupName">
      <el-option v-for="job in group.jobs" :value="job.value" :key="job.key" :label="job.name" />
    </el-option-group>
  </el-select>
</template>

<script>
import { jobs, FREE_JOB_TEXT } from '../dictionary.js'

export default {
  name: 'JobSelector',

  props: {
    modelValue: String,
  },
  // emits: ['update:modelValue'], // ?

  data() {
    const jobsInfo = jobs

    const optionGroup = jobsInfo.map((group, groupIndex) => {
      const { groupName, jobs: originJobs } = group
      const key = `${groupName}-${groupIndex}`
      const jobs = originJobs.map(({ name }) => ({
        label: name,
        value: name,
        key: name,
      }))

      return { groupName, key, jobs }
    })

    return {
      optionGroup,
    }
  },

  computed: {
    FREE_JOB_TEXT: () => FREE_JOB_TEXT,

    computedValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>

<!-- reference -->
<!-- https://v3-migration.vuejs.org/zh/breaking-changes/v-model.html -->
