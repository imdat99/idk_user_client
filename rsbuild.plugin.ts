import type { RsbuildPlugin } from '@rsbuild/core';
export const pluginAddHtmlAttributes = (): RsbuildPlugin => ({
  name: 'plugin-add-html-attributes',

  setup(api) {
    //  (async ({ stats }) => {
    //   const outputFiles = stats?.toJson({ assets: true }).assets || [];

    //   const jsFiles = outputFiles
    //     .map((file) => file.name)
    //     .filter((name) => name.endsWith('.js'));

    //   console.log('\n🧾 Danh sách file JS đã build:');
    //   jsFiles.filter((file) => !file.includes('/async/')).forEach((file) => {
    //     console.log(`- ${file}`);
    //   });
    // });
    api.modifyHTML((html) => {
        console.log("build html", api.processAssets)
        return html;
      });
  },
});