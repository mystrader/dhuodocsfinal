import Vue from 'vue'
Vue.component("OtherComponent", () => import("/workspace/dhuodocsfinal/src/.vuepress/components/OtherComponent"))
Vue.component("demo-component", () => import("/workspace/dhuodocsfinal/src/.vuepress/components/demo-component"))
Vue.component("Foo-Bar", () => import("/workspace/dhuodocsfinal/src/.vuepress/components/Foo/Bar"))
Vue.component("Badge", () => import("/workspace/dhuodocsfinal/node_modules/@vuepress/theme-default/global-components/Badge"))
Vue.component("CodeGroup", () => import("/workspace/dhuodocsfinal/node_modules/@vuepress/theme-default/global-components/CodeGroup"))
Vue.component("CodeBlock", () => import("/workspace/dhuodocsfinal/node_modules/@vuepress/theme-default/global-components/CodeBlock"))


export default {}