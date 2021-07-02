<template>
  <div class="w about--carousel">
    <el-carousel trigger="click" height="400px" :interval="6000" arrow="always">
      <el-carousel-item
        v-for="(item, index) in carousel.panelContents"
        :key="index"
      >
        <div @click="view(item.productId, index)">
          <div v-for="(item1, index1) in img1[index]" :key="index1">
            <img :src="item1" alt="" class="img1" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    carousel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      img1: [],
    };
  },
  components: {},
  methods: {
    //   赋值
    forData() {
      this.img = this.carousel.panelContents;
      //   console.log(this.img);
      // 循环数组
      this.img.map((a) => {
        // 去掉空字符串
        let obj = [a.picUrl, a.picUrl2, a.picUrl3].filter((b) => {
          return b !== "";
        });
        this.img1.push(obj);
        // console.log(this.img1);
      });
    },
    view(a, b) {
      // 商品id
      // console.log(a);
      //dang当前点击的对象
      // console.log(b);
      // 跳转页面时新开一个窗口
      let routeData = this.$router.resolve({
        path: "/goodsDetail",
        query: { productId: a },
      });
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    // console.log(this.carousel);
    this.forData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.img1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}

// 走马灯的子盒子 n为第一个   2n 为第2个
.el-carousel__item:nth-child(2n) {
  div:nth-child(2n) {
    img {
      z-index: 999;
    }
  }
}
</style>