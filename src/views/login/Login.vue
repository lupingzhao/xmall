<template>
  <div class="box1">
    <div class="box m-c">
      <div class="m">M</div>
      <div class="sl">使用 XMall 账号 登录官网</div>
      <div class="ipt">
        <input type="text" placeholder="账户" v-model="login.user" />
        <input type="text" placeholder="密码" v-model="login.pass" />
        <input type="text" placeholder="验证码" v-model="code" />
      </div>
      <div class="flex jcsb ipt1">
        <div><input type="checkbox" name="" id="" />记住密码</div>
        <div class="flex">
          <div><a href=""></a></div>
          <el-link type="primary" @click="regis">注册 XMall 账号</el-link>
          <div class="line m-lr-10"></div>
          <el-link type="primary" @click="open">忘记密码 ?</el-link>
        </div>
      </div>
      <button class="dl dl1" :disabled="boolean" ref="dl" @click="login1">
        登陆
      </button>
      <button class="dl m-t-10">返回</button>
      <div class="foot flex">
        其他账号登陆:
        <span>
          <i class="iconfont icon-weibo"></i>
        </span>
        <span> <i class="iconfont icon-weixin"></i></span>
        <span> <i class="iconfont icon-qq"></i></span>
      </div>
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
      login: {
        user: "",
        pass: "",
      },
      code: "",
      boolean: true,
    };
  },
  components: {},
  methods: {
    open() {
      this.$notify.info({
        title: "消息",
        message: "请联系作者邮箱找回密码或使用测试账号登录：test | test",
      });
    },
    regis() {
      this.$router.push("/Registered");
    },
    login1() {
      axios
        .post("/api/users/login", {
          username: this.login.user,
          password: this.login.pass,
        })
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res.data);
            this.$message.success(`${res.data.msg}`);
            this.$router.push("/");
          } else {
            this.$message.error(`${res.data.msg}`);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {
    login: {
      handler(val) {
        // console.log(val);
        if (Boolean(val.user) && Boolean(val.pass)) {
          this.boolean = false;
          this.$refs.dl.classList.add("bgc");
          this.$refs.dl.classList.remove("dl1");
        } else {
          this.$refs.dl.classList.remove("bgc");
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.box1 {
  background-color: #eee;
  padding: 20px 0;
  .box {
    width: 800px;
    height: 100%;
    background-color: #fff;
    margin-top: 50px;
    margin-bottom: 50px;
    padding-top: 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px gray;
    .m {
      margin: auto;

      background-color: red;
      padding: 10px;
      font-size: 50px;
      width: fit-content;
      color: #fff;
      border-radius: 100%;
    }
    .sl {
      margin-top: 20px;
      font-size: 20px;
      text-align: center;
    }
    .ipt {
      width: 70%;
      margin: auto;
      input {
        outline: none;
        width: 100%;
        height: 40px;
        margin: 20px 0;
        text-indent: 2em;
      }
    }
  }
  .ipt1 {
    width: 70%;
    margin: auto;
    padding: 10px;
  }
  .dl {
    width: 70%;
    height: 50px;

    transform: translateX(50%);
    margin-left: -156px;
  }
  .dl1:hover {
    cursor: not-allowed;
  }
  .bgc {
    background-color: rgb(78, 99, 126);
  }
  .foot {
    margin-top: 50px;
    padding: 20px;
    border-top: 1px solid #000;
    span {
      font-size: 16px !important;
      margin-right: 5px;
    }
  }
  .line {
    margin: 0 10px;
  }
}
</style>