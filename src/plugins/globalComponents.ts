import type {App} from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'

export default {
  install(app: App) {
    app.component('StradaButton', Button)
    app.component('StradaInputText', InputText)
    app.component('StradaInputPassword', Password)
    app.component('StradaDataTable', DataTable)
    app.component('StradaColumn', Column)
    app.component('StradaTag', Tag)
  }
}
