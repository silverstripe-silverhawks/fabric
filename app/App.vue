<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

import { useStore } from "./stores/store";

import GlobalFeatures from "./components/GlobalFeatures.vue";

const store = useStore();

const ROOT = document.querySelector("#fabricator-app");
const username = ROOT.getAttribute("username");

const allowedFields = JSON.parse(ROOT.getAttribute("allowed-fields"));
const blocks = JSON.parse(ROOT.getAttribute("blocks"));
const settings = JSON.parse(ROOT.getAttribute("settings"));
const blockTypes = JSON.parse(ROOT.getAttribute("block-types"));
const pageFields = JSON.parse(ROOT.getAttribute("page-fields"));

// const dataProps = {
//     username,
//     pageFields,
//     allowedFields,
//     blocks,
//     blockTypes,
//     settings,
//     viewState: "home",
//     editBlockInfo: [],
// };

store.setBlocks(blockTypes);
store.setPageInfo({
    pageFields,
    blocks,
    settings,
})

console.log(blocks);

const fileList = store.getBlockByTitle("File List");
</script>

<template>
    <div class="fabricator">
        <div class="fabricator__content">
            <div class="fabricator__navigation">
                <GlobalFeatures />
            </div>
            <div class="fabricator__navigation">
                <div class="content">
                    <div class="title">Page content</div>
                </div>

                <div class="block-options">
                    <button
                        class="fabricator-btn fabricator-btn--blue fabricator-btn__icon--left fabricator-btn__icon-add"
                    >
                        Add a block
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
@import './scss/fabric'
</style>
