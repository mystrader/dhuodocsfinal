import Vue from 'vue'
Vue.component("demo-component", () => import("E:\\WORK\\ENGINEERING\\PROJETOS\\@DOCS\\docsdhuofinal\\docs\\src\\.vuepress\\components\\demo-component"))
Vue.component("OtherComponent", () => import("E:\\WORK\\ENGINEERING\\PROJETOS\\@DOCS\\docsdhuofinal\\docs\\src\\.vuepress\\components\\OtherComponent"))
Vue.component("Foo-Bar", () => import("E:\\WORK\\ENGINEERING\\PROJETOS\\@DOCS\\docsdhuofinal\\docs\\src\\.vuepress\\components\\Foo\\Bar"))
Vue.component("Badge", () => import("E:\\WORK\\ENGINEERING\\PROJETOS\\@DOCS\\docsdhuofinal\\docs\\node_modules\\@vuepress\\theme-default\\global-components\\Badge"))
Vue.component("CodeGroup", () => import("E:\\WORK\\ENGINEERING\\PROJETOS\\@DOCS\\docsdhuofinal\\docs\\node_modules\\@vuepress\\theme-default\\global-components\\CodeGroup"))
Vue.component("CodeBlock", () => import("E:\\WORK\\ENGINEERING\\PROJETOS\\@DOCS\\docsdhuofinal\\docs\\node_modules\\@vuepress\\theme-default\\global-components\\CodeBlock"))


export default {}