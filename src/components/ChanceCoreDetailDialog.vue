<template>
  <el-dialog title="組合細節" v-model="computedValue" width="60%" @close="close">
    <div v-if="payload != null">
      <el-row style="margin-bottom: 24px">
        <el-col>
          <el-row>
            <h4>挑選到的核心</h4>
          </el-row>
        </el-col>

        <el-col>
          <el-table :data="coreList" border>
            <el-table-column type="index" width="50" />

            <el-table-column label="是否指定" width="120px">
              <template #default="scope">
                <span
                  style="margin-right: 6px"
                  :class="{
                    'core-required': scope.row.required,
                  }"
                  v-text="scope.row.required ? '已指定' : '未指定'"
                >
                </span>
              </template>
            </el-table-column>

            <el-table-column label="技能組合">
              <template #default="scope">
                <skill-tag
                  v-for="(skill, skillIndex) in scope.row.skills"
                  :skill="skill"
                  :skill-map="skillMap"
                  :key="`core-${scope.row.$index}-${skillIndex}`"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 24px">
        <el-col>
          <el-row>
            <h4>技能數量統計</h4>
          </el-row>
        </el-col>
        <el-col>
          <el-row
            v-for="(countInfo, countIndex) in combinationCountList"
            style="margin-bottom: 12px"
            :key="`count-${countIndex}`"
          >
            <skill-tag :skill="countInfo.skill" :skill-map="skillMap" />
            <span>數量: </span>
            <span :class="{ 'count-is-one': countInfo.count === 1 }">{{ countInfo.count }}</span>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 24px">
        <el-col>
          <el-row>
            <h4>數量不足的技能</h4>
          </el-row>
        </el-col>
        <el-col>
          <el-row>
            <div style="margin-bottom: 12px">
              <skill-tag
                v-for="(skill, skillIndex) in payload.integrateCount.missOne"
                :key="skillIndex"
                :skill="skill"
                :skill-map="skillMap"
              />
            </div>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 24px">
        <el-col>
          <el-row>
            <h4>已有的技能開頭</h4>
          </el-row>
        </el-col>

        <el-col>
          <el-row>
            <skill-tag
              :key="skillIndex"
              v-for="(skill, skillIndex) in coreList.map((core) => core.skills[0])"
              :skill="skill"
              :skill-map="skillMap"
            />
          </el-row>
        </el-col>
      </el-row>
    </div>

    <template v-slot:footer>
      <el-button @click="close">關閉</el-button>
    </template>
  </el-dialog>
</template>

<script>
import SkillTag from './SkillTag.vue'

export default {
  name: 'ChanceCoreDetailDialog',

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    payload: {
      type: Object,
    },

    skillMap: {
      type: Object,
      required: true,
    },
  },

  components: { SkillTag },

  data() {
    return {}
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

    coreList() {
      return this.payload.coreList
    },

    combinationCountList() {
      return Object.keys(this.payload.combinationCount)
        .map((skill) => ({
          count: this.payload.combinationCount[skill],
          skill,
        }))
        .sort((a, b) => a.count - b.count)
    },
  },

  methods: {
    close() {
      this.computedValue = false
    },
  },
}
</script>

<style scoped>
.count-is-one {
  color: var(--el-color-error);
  font-weight: bold;
}
.core-required {
  color: var(--el-color-warning);
  font-weight: bold;
}
</style>
