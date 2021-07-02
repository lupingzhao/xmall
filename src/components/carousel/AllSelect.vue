<template>
  <!-- 单独的精选 -->
  <div class="w1">
    <div class="w head">{{ allselect.name }}</div>
    <div class="w bigbox">
      <div
        v-for="(item, index) in allselect1"
        :key="index"
        class="box"
        :class="{ 'w-5': index === 0 }"
      >
        <div
          class="img"
          :style="{ 'background-image': 'url(' + item.picUrl + ')' }"
        ></div>
        <!-- <img :src="item.picUrl" alt="" class="img" /> -->
        <div style="text-align: center; margin-bottom: 10px" v-if="index !== 0">
          {{ item.productName }}
        </div>
        <div style="text-align: center; margin-bottom: 10px" v-if="index !== 0">
          {{ item.subTitle }}
        </div>
        <div
          style="text-align: center; line-height: 50px; color: red"
          class="price"
          v-if="index !== 0"
        >
          ￥{{ item.salePrice }}
        </div>
        <div
          style="text-align: center; height: 50px"
          class="tip"
          v-if="index !== 0"
        >
          <el-button type="info" @click="view(item.productId, item1)"
            >查看详情</el-button
          >
          <el-button type="primary" @click="add(item.productId)"
            >添加至购物车</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    allselect: {
      type: Object,
    },
  },
  data() {
    return {
      allselect1: null,
    };
  },
  components: {},
  methods: {
    // 购物车添加数据
    add(a) {
      console.log(a);
      axios
        .post("/api/goods/addCart", { productId: a })
        .then((res) => {
          console.log(res.data);
          this.$parent.$parent.cars();
          // 第一级是home 第二级是layout  调用layout里面的数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
    view(a, b) {
      // 商品id
      // console.log(a);
      //dang当前点击的对象
      // console.log(b.productId);
      // 跳转页面时新开一个窗口
      let routeData = this.$router.resolve({
        path: "/goodsDetail",
        query: { productId: a },
      });
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    this.allselect1 = this.allselect.panelContents;
    // console.log(this.allselect1);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  padding: 20px 0;
  margin: 10px auto 0;
  background-color: rgb(243, 243, 243);
  color: rgb(39, 38, 38);
}
.bigbox {
  overflow: hidden;
  flex-wrap: wrap;
  align-content: flex-start;
  background-color: #fff;
  .box {
    width: 24%;
    height: 350px;
    background-color: #fff;
    margin-bottom: 1px;
    .img {
      width: 100%;
      height: 200px;
      background: no-repeat;
      object-position: center;
      background-size: contain;
    }
    .tip {
      display: none;
    }
  }
  .box:hover {
    .tip {
      margin-top: 20px;
      display: block;
    }
    .price {
      display: none;
    }
    animation: dh 1.5s infinite;
  }
  @keyframes dh {
    from {
      box-shadow: 0 0 4px rgba(95, 94, 94);
      // height: 500px;
    }

    to {
      // height: 495px;
      box-shadow: 0 0 20px rgba(95, 94, 94);
    }
  }
  .w-5 {
    width: 50%;
    .img {
      width: 100% !important;
      height: 100% !important;
      &:hover {
        box-shadow: inset 0 0 20px rgb(224, 223, 223);
      }
    }
    img {
      height: 100%;
    }
  }
  .w-5:hover {
    animation: none;
  }
}
</style>