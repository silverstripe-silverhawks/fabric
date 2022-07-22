import { openBlock, createElementBlock, createApp } from "vue";
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var App_vue_vue_type_style_index_0_lang = "";
const __default__ = {
  mounted() {
    console.log("Hello");
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("h1", null, "Hello");
    };
  }
});
const app = createApp(_sfc_main).mount("#app");
export { app };
