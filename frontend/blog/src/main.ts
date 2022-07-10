import { createApp } from 'vue'
import App from './App.vue'

import router from './route'

import {
  ElPagination,
  ElTable,
  ElTableColumn
} from 'element-plus';

const app = createApp(App)

app.component(ElTable.name, ElTable);
app.component(ElTableColumn.name, ElTableColumn);
app.component(ElPagination.name, ElPagination);

app.use(router).mount('#app')
