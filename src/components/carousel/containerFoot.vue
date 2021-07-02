<template>
  <div class="flex w">
    <div
      class="box"
      v-for="(item, index) in foot.panelContents"
      :key="index"
      @click="view(item.productId)"
    >
      <div class="img1"></div>
      <img :src="item.picUrl" alt="" class="img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    foot: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: [],
    };
  },
  components: {},
  methods: {
    //   赋值
    forData() {
      let datas = this.foot.panelContents;
      // console.log(this.foot);
      console.log();
      // 循环赋值
      datas.map((a) => {
        this.data.push(a.picUrl);
      });
      // console.log(this.data);
    },
    view(a, b) {
      // 商品id
      console.log(a);
      //dang当前点击的对象
      console.log(b);
      // 跳转页面时新开一个窗口
      let routeData = this.$router.resolve({
        path: "/goodsDetail",
        query: { productId: a },
      });
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    this.forData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.w {
  background-color: #fff;
  margin: 20px auto;
  .box {
    width: 25%;
    height: 200px;
    position: relative;
    .img {
      width: 100%;
      height: 100%;
    }
    .img1 {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      // background-color: springgreen;
    }
    .img1:hover {
      box-shadow: inset 0 0 20px rgb(197, 197, 197);
    }
  }
}
</style>