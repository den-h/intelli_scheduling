import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import {router} from "@/router/router";

const app = createApp(App)

app.use(router)
app.use(ViewUIPlus)
    .mount('#app')
