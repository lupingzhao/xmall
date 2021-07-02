<template>
  <div class="p-tb-20 box">
    <div
      class="b-radius-10 flex top-box"
      v-if="dataImgs && dataImgs.length > 0"
    >
      <div class="side-img">
        <div
          v-for="(item, index) in dataImgs"
          :key="index"
          :class="{ 'active-img': index === index1 }"
          @click="switchImg(index)"
        >
          <div class="small"><img :src="item" alt="" /></div>
        </div>
      </div>
      <div class="m-lr-25">
        <div class="big"><img :src="dataImgs[index1]" alt="" /></div>
      </div>
      <div class="aide-ringt">
        <div class="font-s-18 font-w-7">{{ datas.productName }}</div>
        <div class="flex jcsb bor-b p-b-10">
          <div class="font-s-12">{{ datas.subTitle }}</div>
          <div class="font-c-red m-t-10 font-w-7 font-s-18">
            ￥{{ datas.salePrice }}
          </div>
        </div>
        <div class="bor-b numberbox">
          <span class="m-r-15">数量</span>
          <button class="btn" @click="reduce">-</button>
          <input v-model.number="value" class="ipt" />
          <button class="btn" @click="add">+</button>
          <!-- <div :class="{ animation: boo }" v-if="boo">{{ value }}</div> -->
          <div
            class="font-s-12 font-c-red m-t-5"
            :class="{ yc: value !== max }"
          >
            已是最大库存
          </div>
        </div>

        <div class="m-tb-25">
          <el-button type="primary" @click="addCart(datas.productId)"
            >加入购物车</el-button
          >
          <el-button>现在购买</el-button>
        </div>
      </div>
    </div>

    <div class="m-tb-25 foot-box">
      <div class="goods-detail-img">产品信息</div>
      <div v-html="data" class="about--img"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      dataImgs: [],
      data: null,
      datas: null,
      index1: 0,
      value: 1,
      reduceNumber: null,
      max: null,
      boo: false,
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get(`/api/goods/detail?productId=${this.productId}`)
        .then((res) => {
          this.dataImgs = res.data.data.result.productImageSmall;
          // console.log(this.dataImgs);
          this.data = res.data.data.result.detail;
          // console.log(res.data.data.result);
          this.datas = res.data.data.result;
          this.max = this.datas.limitNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    switchImg(val) {
      this.index1 = val;
    },
    reduce() {
      if (Boolean(Number(this.value))) {
        if (this.value > 1) {
          this.value -= 1;
        }
      } else {
        this.value = "NaN";
      }
    },
    add() {
      // // 最大值不能大于库存
      if (Number(this.value) >= this.max) {
        this.value = this.datas.limitNum;
      } else if (this.value === "") {
        this.value += 1;
      } else if (Boolean(Number(this.value))) {
        this.value += 1;
      } else {
        this.value = 1;
      }
      this.boo = true;
    },
    // 购物车添加数据
    addCart(a) {
      console.log(a);
      axios
        .post("/api/goods/addCart", { productId: a })
        .then((res) => {
          console.log(res.data);
          console.log(this.$parent.cars());
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.productId = this.$route.query.productId;
    this.getData();
    this.boo = false;
  },
  computed: {},
  watch: {
    // 监听输入框的值 是不是整数
    value(val) {
      // console.log(val);
      if (!Boolean(Number(this.value))) {
        if (val > 1 && val % 1 === 0) {
          if (val > this.max) {
            this.value = this.max;
          } else {
            this.value = val;
          }
        } else if (val === "") {
          this.value = "";
        } else {
          // this.value = String(val).split(".")[0] * 1;
          // this.value = 1;
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  .yc {
    visibility: hidden;
  }
  .top-box {
    background-color: #fff;
    padding: 20px 30px;
  }
  .foot-box {
    background-color: #fff;
  }
  width: 1000px;
  margin: auto;
  .goods-detail-img {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-size: 14px;
    padding: 20px;
    background-color: rgb(156, 153, 153);
  }
  .side-img {
    height: 100%;
    .small {
      img {
        width: 80px;
        height: 100%;
        margin: 10px;
      }
    }
  }

  .big img {
    width: 360px;
    margin: auto 10px;
  }
  // 点击添加边框
  .active-img {
    border: 1px solid grey;
  }
  .numberbox {
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .aide-ringt {
    .btn {
      font-size: 16px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      border: 1px solid gainsboro;
    }
    .ipt {
      width: 40px;
      border: none;
      outline: none;

      text-align: center;
    }
  }

  // 输入框的动画效果
  .animation {
    animation: animation 1s;
  }

  @keyframes animation {
    10% {
      display: block;
      width: 40px;
      background-color: red;
    }
    70% {
      background-color: yellow;
    }
    100% {
      display: none;
      background-color: yellow;
    }
  }
}
</style>