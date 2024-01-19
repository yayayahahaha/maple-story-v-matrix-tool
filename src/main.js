import { createApp } from 'vue'
import App from './App.vue'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus).mount('#app')

// reference
// https://stackoverflow.com/questions/71644855/how-to-add-element-ui-to-vue-3
// https://element-plus.org/zh-CN/
// https://v3-migration.vuejs.org/zh/breaking-changes/v-model.html
