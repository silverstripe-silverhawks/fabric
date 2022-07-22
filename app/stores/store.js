import { defineStore } from "pinia";

export const useStore = defineStore('store', {
  state: () => ({
    blocks: [],
    page: {
      blocks: [],
      settings: [],
    },
    view: '',
  }),
  getters: {
    getBlockByTitle: (state) => {
      return (title) => state.blocks.filter(block => block.Title === title);
    },

    getPageSettings({ page }) {
      return page.settings;
    },
  },
  actions: {
    setBlocks(blocks) {
      this.blocks = blocks;
    },

    setView(view) {
      this.view = view;
    },

    setPageInfo(pageInfo) {
      this.page = pageInfo;
    }
  }
})
