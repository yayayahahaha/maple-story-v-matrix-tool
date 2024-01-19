<template>
  <el-row :gutter="15" class="container">
    <el-col style="margin-bottom: 12px">
      <h1>楓之谷 V 矩陣 核心工具</h1>
      <h6>適用版本: Ver.2.58.3</h6>
    </el-col>

    <el-col>
      <el-form>
        <el-form-item label="我的職業是">
          <JobSelector v-model="myJob" />
        </el-form-item>

        <el-form-item label="我想要湊">
          <el-radio-group v-model="targetCoreNumber">
            <el-radio :label="4">四核六技</el-radio>
            <el-radio :label="6">六核九技</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="我想要的技能是">
          <el-col>
            <el-row v-for="item in skills.length / 3" :key="item.key" :gutter="15" style="margin-bottom: 20px">
              <el-col :span="6" v-for="(skillName, index) in 3" :key="index">
                <el-input></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-form-item>

        <el-form-item label="我目前有的核心"> </el-form-item>

        <el-row>
          <el-col>
            <div style="display: flex">
              <el-button>hello</el-button>
              <el-select style="margin-left: 12px"></el-select>
              <el-select style="margin-left: 12px"></el-select>
              <el-select style="margin-left: 12px"></el-select>
              <el-button style="margin-left: 12px">hello</el-button>
              <el-button>hello</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15" style="margin-top: 12px">
          <el-col style="margin-bottom: 12px">
            <el-button style="width: 100%">添加</el-button>
          </el-col>
          <el-col>
            <el-button style="width: 100%">開始計算</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-divider></el-divider>
    </el-col>
  </el-row>
</template>

<script>
import JobSelector from './components/JobSelector.vue'
import { FREE_JOB_TEXT } from './dictionary'

export default {
  name: 'App',

  components: {
    JobSelector,
  },

  props: {},

  data() {
    return {
      myJob: FREE_JOB_TEXT,
      targetCoreNumber: 4,
      skills: [...new Array(9)].map((_, index) => ({
        value: `skill-${index + 1}`,
        placeholder: `技能-${index + 1}`,
        label: '',
      })),
    }
  },

  computed: {},

  watch: {},

  created() {},

  methods: {},
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

.container {
  padding: 15px;
}
</style>
