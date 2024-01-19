<template>
  <el-row gutter="15px" class="container">
    <el-col style="margin-bottom: 12px">
      <h1>楓之谷 V 矩陣 核心工具</h1>
    </el-col>

    <el-col>
      <el-form>
        <el-form-item label="我的職業是">
          <el-select></el-select>
        </el-form-item>

        <el-form-item label="我想要湊">
          <el-radio-group>
            <el-radio>四核六技</el-radio>
            <el-radio>六核九技</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="我想要的技能是">
          <el-col>
            <el-row v-for="item in 3" :gutter="15" style="margin-bottom: 20px">
              <el-col :span="6" v-for="item in 3">
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
export default {
  name: 'App',

  components: {},

  props: {},

  data() {
    return {}
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
