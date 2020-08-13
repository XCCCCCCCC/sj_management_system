import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  DatePicker,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Menu,
  MenuItem,
  MenuItemGroup,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Submenu,
  Select,
  Option,
  Table,
  TableColumn,
  Loading,
  Tooltip,
  Popover,
  Tabs,
  TabPane,
  Slider,
  Dialog,
  PageHeader,
  Pagination,
  MessageBox,
  Message,
  Upload,
} from 'element-ui'
import Vue from 'vue'
import '../style/element-variables.scss'

Vue.use(Aside)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Divider)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Slider)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Footer)
Vue.use(PageHeader)
Vue.use(Pagination)
Vue.use(Upload)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
