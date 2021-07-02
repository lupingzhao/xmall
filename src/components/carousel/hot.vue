<template>
  <div class="w1">
    <div class="w head">{{ hot.name }}</div>
    <div class="w allbox">
      <div
        v-for="(item, index) in data"
        :key="index"
        @click="view(item.productId, item)"
        class="box flex a-i-fs"
      >
        <div class="box1">
          <img :src="item.picUrl" alt="" />
          <div style="text-align: center; margin-bottom: 10px">
            {{ item.productName }}
          </div>
          <div style="text-align: center; margin-bottom: 10px">
            {{ item.subTitle }}
          </div>
          <div
            style="text-align: center; line-height: 50px; color: red"
            :class="`price${index + 1}`"
            class="price"
          >
            ￥{{ item.salePrice }}
          </div>
          <div
            style="text-align: center; height: 50px"
            class="tip"
            :class="`tip${index + 1}`"
          >
            <el-button type="info" @click="view(item.productId, item)"
              >查看详情</el-button
            >
            <el-button type="primary" @click.stop="add(item.productId, index)"
              >添加至购物车</el-button
            >
            <div :ref="'imgBox' + index">tup</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {
    hot: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: null,
      boo: true,
    };
  },
  components: {},
  methods: {
    forData() {
      //   console.log(this.hot);
      this.data = this.hot.panelContents;
      // console.log(this.data);
    },
    // 购物车添加数据
    add(a, b) {
      console.log(b);
      console.log(a);
      console.log(this.$refs[`imgBox${b}`]);
      axios
        .post("/api/goods/addCart", { productId: a })
        .then((res) => {
          console.log(res.data);
          this.$parent.$parent.cars();
          this.$refs[`imgBox${b}`][0].classList.add("addcaar");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    view(a, b) {
      console.log(a);
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
.addcaar {
  width: 300px;
  height: 200px;
  // position: absolute;
  background-color: red;
  // animation: adddh 5s;
  // top: 90%;
  // transform: translate(300px, -100%);
  top: -100px;
  margin-right: 0;
  z-index: 1000;
}

// 添加购物车的动画
@keyframes adddh {
  // from {
  //   display: none;
  // }
  // to {
  //   display: block;
  //   top: 0px;
  // }
  0% {
    display: none;
  }
  25% {
    // top: -100px;
  }
}

.head {
  padding: 20px 0;
  margin: 10px auto 0;
  background-color: rgb(243, 243, 243);
  color: rgb(39, 38, 38);
}
.allbox {
  background-color: #fff;
  overflow: hidden;
}
.box {
  flex: 1;
  // width: 50%;
  // background-color: #fff;
  justify-content: center;
  height: 500px;
  // margin-right: 5px;
  margin-bottom: 5px;

  .tip {
    height: 50px;
    display: flex;
    justify-content: center;
    display: none;
  }

  .box:hover {
    .price {
      display: none;
    }
    .tip {
      display: block;
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
}

.box1 {
  width: 300px;
}
img {
  margin: 10px auto;
  width: 100%;
}

// .box:nth-child(1) {
//   .box:hover {
//     border: 1px solid rgb(156, 137, 31);
//     .tip1 {
//       display: block;
//     }
//     .price1 {
//       display: none;
//     }

//     box-shadow: 5px 10px 10px rgb(218, 216, 216, 0.5);
//   }
// }

// .box:nth-child(2) {
//   &:hover {
//     // border: 1px solid rgb(156, 137, 31);
//     .tip2 {
//       display: block;
//     }
//     .price2 {
//       display: none;
//     }

//     box-shadow: -5px 5px 5px rgb(218, 216, 216, 0.5);
//   }
// }
</style>