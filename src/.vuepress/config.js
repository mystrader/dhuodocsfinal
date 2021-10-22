const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "DhuoDocs",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "description",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#8E3CCB" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  extraWatchFiles: ["src/**/*.md", "src/index.md", "src/**/*.vue"],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "https://github.com/mystrader/dhuodocsfinal.git",
    editLinks: false,
    docsDir: "docs",
    editLinkText: "Editar página",
    lastUpdated: true,
    nav: [
      {
        text: "Manuais",
        link: "/manual/",
      },
      {
        text: "Produtos",
        link: "/produtos/",
      },
      {
        text: "Engineering",
        link: "https://www.engdb.com.br/",
      },
    ],
    sidebar: {
      "/manual/": [
        {
          title: "Manuais",
          collapsable: true,
          children: ["", "using-vue"],
        },
      ],
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "/docs/src/assets/images/",
      },
    },
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
