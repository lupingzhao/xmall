<template>
  <div class="box pos-rel">
    <div class="head">
      <div class="w">
        <div class="M">M</div>
        <div class="flex head-nav">
          <input
            type="text"
            v-model.trim="enter"
            @keydown.enter="enterdata(enter)"
            class="head-ipt"
            placeholder="请输入商品信息"
          />
          <i class="iconfont icon-sousuo seach"></i>
          <div class="nav">全部商品</div>
          <div class="nav">捐赠</div>
          <div class="line"></div>

          <div>
            <i class="iconfont icon-geren m-r-15 geren"></i>
          </div>

          <div class="big-car1">
            <el-popover
              placement="bottom"
              trigger="hover"
              width="300"
              class="popover"
            >
              <!-- car yangshi -->
              <div v-for="(item, index) in data" :key="index" class="big-car">
                <div class="flex">
                  <div class="car-img">
                    <img :src="item.productImageSmall[0]" alt="" />
                  </div>
                  <div class="car-details">
                    <div class="ellipsis">{{ item.productName }}</div>
                    <div class="m-t-10">
                      <span class="font-c-red font-s-16"
                        >￥{{ item.salePrice }}</span
                      >
                      &nbsp; &nbsp;
                      <span> x {{ item.count }}</span>
                    </div>
                  </div>
                  <div class="ml-25 noview" @click="removecar(item.productId)">
                    X
                  </div>
                </div>
              </div>
              <div class="flex jcsb big-foot">
                <div>
                  <div class="m-10 car-foot font-s-12">
                    共计{{ carCount }}件商品
                  </div>
                  <div class="m-10 car-foot">
                    合计：<span class="font-c-red font-s-14">
                      ￥{{ carsPrice }}</span
                    >
                  </div>
                </div>
                <div>
                  <el-button type="primary" size="small">去购物车</el-button>
                </div>
              </div>
              <div slot="reference" class="flex car-tip">
                <i class="iconfont icon-gouwuchekong carts"></i>
                <div class="cars" :class="{ cars1: data.length > 0 }">
                  {{ carCount }}
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <!-- 正常页面显示的导航栏 -->
    <div class="head--nav">
      <div class="main1 w jcs main-nav">
        <div v-for="(item, index) in title1" :key="index" class="flex">
          <div class="dot-5"></div>
          <div @click="click(item.path, index)" :class="{ ative: n === index }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- 当导航栏到达顶部时的导航栏 -->
    <div class="head--nav hasFixed" v-if="needFixed">
      <div class="main1 w jcsb main-nav">
        <div class="flex jcs">
          <div v-for="(item, index) in title1" :key="index" class="flex">
            <div class="dot-5"></div>
            <div
              @click="click(item.path, index)"
              :class="{ ative: n === index }"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="big-car1">
          <el-popover
            placement="bottom"
            trigger="hover"
            width="300"
            class="popover"
          >
            <!-- car yangshi -->
            <div v-for="(item, index) in data" :key="index" class="big-car">
              <div class="flex">
                <div class="car-img">
                  <img :src="item.productImageSmall[0]" alt="" />
                </div>
                <div class="car-details">
                  <div class="ellipsis">{{ item.productName }}</div>
                  <div class="m-t-10">
                    <span class="font-c-red font-s-16"
                      >￥{{ item.salePrice }}</span
                    >
                    &nbsp; &nbsp;
                    <span> x {{ item.count }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex jcsb big-foot">
              <div>
                <div class="m-10 car-foot font-s-12">
                  共计{{ carCount }}件商品
                </div>
                <div class="m-10 car-foot">
                  合计：<span class="font-c-red font-s-14">
                    ￥{{ carsPrice }}</span
                  >
                </div>
              </div>
              <div>
                <el-button type="primary" size="small">去购物车</el-button>
              </div>
            </div>
            <div slot="reference" class="flex car-tip">
              <i class="iconfont icon-gouwuchekong carts"></i>
              <div class="cars" :class="{ cars1: data.length > 0 }">
                {{ data.length }}
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="main">
      <router-view ref="Ademo"></router-view>
    </div>
    <div class="foot about--foot">
      <el-footer class="w">
        <div>
          <div>订单服务</div>
          <div>购买指南</div>
          <div>支付方式</div>
          <div>送货政策</div>
        </div>
        <div>
          <div>服务支持</div>
          <div>官方开源</div>
          <div>项目前端</div>
          <div>项目后端</div>
        </div>
        <div>
          <div>自助服务</div>
          <div>个人博客</div>
          <div>个人简介</div>
          <div>个人视频</div>
        </div>
        <div>
          <div>其他项目</div>
          <div>XPay支付系统</div>
          <div>数据共享</div>
          <div>待开发...</div>
        </div>
        <div>
          <div>友情链接</div>
          <div>宇cccc</div>
          <div>Smartisan</div>
          <div>Vue</div>
        </div>
        <div>
          <div>关注我吧</div>
          <div>腾讯QQ</div>
          <div>新浪微博</div>
          <div>官方邮箱</div>
        </div>
      </el-footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {
    needFixed: {
      type: Boolean,
    },
  },
  data() {
    return {
      n: 0,
      needFixed1: null,
      enter: null,
      title1: [
        { name: "首页", path: "/" },
        {
          name: "全部",
          path: "/Text",
        },
        {
          name: "捐赠名单",
          path: "/Login",
        },
        {
          name: "XMall小程序",
          path: "/",
        },

        //
        // "后台管理系统",
        //
        // "XPay支付系统",
        // "XBoot开发平台",
        // "宣传视频",
        // "Github",
        // "商用授权",
      ],
      data: [],
    };
  },
  components: {},
  methods: {
    all() {
      this.$router.push("/Text");
    },
    // 搜索
    enterdata(a) {
      axios
        // .get("/api/goods/search?keyword=" + a)
        .get(`/api/goods/search?keyword=${a}`)
        .then((res) => {
          // console.log(res, data);
          this.enter = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    click(a, b) {
      this.n = b;
      this.$router.push(a);
    },
    toView() {},
    // 购物车数据
    cars() {
      // console.log("我是购物车请求");
      axios
        .get("/api/goods/getCart")
        .then((res) => {
          console.log(res.data.data);
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // removecar
    removecar(val) {
      console.log(val);
      axios
        .post("/api/goods/delCart", {
          productId: val,
        })
        .then((res) => {
          console.log(res);
          this.cars();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 加入购物车时 购物车信息显示
  },
  mounted() {
    this.cars();
    // console.log(this.$refs.Ademo);
    // 监听窗口的滚动事件 scroll固定写法  this.$parent.handleScroll是app.vue里的方法
    window.addEventListener("scroll", this.$parent.handleScroll);
    // this.destroyed();
  },
  computed: {
    // 购物车总数
    carCount() {
      let sum = 0;
      this.data.map((a) => {
        sum += a.count;
      });
      return sum;
    },
    // 购物车总价
    carsPrice() {
      let sum1 = 0;
      this.data.map((a) => {
        sum1 += a.count * a.salePrice;
      });
      return sum1;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.noview {
  display: none;
}
.big-car:hover {
  .noview {
    cursor: pointer;
    display: block;
  }
  // background-color: red;
}
.head--nav {
  background-color: #fff;
}
// 导航栏固定时的样式s
.hasFixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000; //视情况而定，需不需要
}
.big-foot {
  width: 100%;
  font-size: 12px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.big-car1 {
  .car-tip {
    height: 25px;
  }
  .popover {
    margin-top: -10px;
  }
  .carts {
    font-size: 20px;
    color: rgb(126, 122, 122);
  }
  .cars {
    margin-bottom: 20px;
    padding: 5px;
    background-color: rgb(90, 90, 89);
    border-radius: 100%;
    color: rgb(230, 224, 224);
  }
  .cars1 {
    margin-bottom: 20px;
    padding: 5px;
    background-color: rgb(228, 196, 18);
    border-radius: 100%;
    color: rgb(7, 7, 7);
  }
}
.big-car {
  border-bottom: 1px solid rgb(138, 136, 136);
  .car-img {
    img {
      width: 80px;
      // height: 30px;
    }
  }
  .car-details {
    width: 150px;
  }
}
.ative {
  color: rgb(221, 163, 56);
}
.head {
  background-color: rgb(7, 7, 7);
  padding: 10px 0;
  width: 100%;
  color: #fff;

  .w {
    padding: 1px 0;

    .head-nav {
      > div {
        margin-left: 20px;
      }
    }
    .M {
      padding: 10px;
      border-radius: 100%;
      color: #000;
      background-color: #fff;
    }
  }

  .head-ipt {
    outline: none;
    width: 200px;
    height: 20px;
    font-size: 12px;
    text-indent: 5px;
  }
  .seach {
    margin-left: -30px;
    color: gray;
  }
  .geren {
    color: gray;
  }
}
.main-nav {
  // position: fixed;
  // top: 100px;
  .dot-5 {
    margin: 20px;
  }
  div:nth-child(1) {
    div:nth-child(2) {
      margin-right: 20px;
    }
  }
}
.main {
  background-color: #eee;
}
.foot {
  padding-top: 30px;
  .w {
    > div {
      > div {
        margin: 10px 0;
      }
    }
  }
}
</style>