<template>
  <div id="app">
    <router-view :needFixed="needFixed"></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      needFixed: false,
    };
  },
  components: {},
  methods: {
    // 监听滚动事件
    handleScroll() {
      // console.log("我是app vue");
      // 页面滚动距离顶部的坐标轴
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 55) {
        this.needFixed = true;
      } else {
        this.needFixed = false;
      }
    },
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll());
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' >
@import "../src/styles/common";
@import "//at.alicdn.com/t/font_2637862_qmiueptepy.css";
@import "../src/styles/ui";
</style>