<template>
  <div class="flex w">
    <div
      class="box"
      v-for="(item, index) in data"
      :key="index"
      @click="view(item.productId, item)"
    >
      <!-- <img :src="item" alt="" class="img" /> -->
      <div
        class="img"
        :style="{ 'background-image': 'url(' + item.picUrl + ')' }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    activity: {
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
      //   console.log(this.activity.panelContents);
      let datas = this.activity.panelContents;
      // console.log(datas);
      // 循环赋值
      datas.map((a) => {
        this.data = datas;
      });
      //   console.log(this.data);
    },
    view(a, b) {
      // 商品id
      console.log(a);
      //dang当前点击的对象
      console.log(b);

      this.$router.push({
        // 传递当前点击的文章标题的id 在接受页用id发请求
        path: "/goodsDetail",
        query: {
          productId: a,
        },
      });
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
  .box {
    width: 24%;
    height: 200px;
    .img {
      width: 100%;
      height: 100%;
      background: no-repeat;
      background-size: contain;
    }
    .img:hover {
      box-shadow: inset 0 0 2em #eee;
    }
  }
}
</style>