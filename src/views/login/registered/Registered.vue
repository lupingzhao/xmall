<template>
  <div class="box">
    <div class="box1">
      <el-card class="box-card">
        <div class="head">注册 XMall 账号</div>
        <el-input
          placeholder="账户"
          v-model="login.user"
          class="ipt"
        ></el-input>
        <el-input
          placeholder="密码"
          v-model="login.pass"
          show-password
          class="ipt"
        ></el-input>
        <el-input
          placeholder="重复密码"
          v-model="login.repass"
          show-password
          class="ipt"
        ></el-input>
        <el-input placeholder="验证码" v-model="code" class="ipt"></el-input>
        <div>
          <div class="terms">
            <input type="checkbox" name="" id="" />我已阅读并同意遵守
            <el-link type="primary" @click="open1">法律声明</el-link>
            和
            <el-link type="primary" @click="open2"> 隐私条款</el-link>
          </div>
        </div>
        <!-- :class="{ btn1: boolean === false }" -->
        <el-button :type="type" class="btn" :disabled="boolean" @click="Login">
          登陆</el-button
        >
        <div class="foot">
          如果您已拥有 XMall 账号，则可在此
          <span class="foot-dl" @click="login1">登陆</span>
        </div>
      </el-card>
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
        repass: "",
      },
      code: "",
      type: "info",
      boolean: true,
    };
  },
  components: {},
  methods: {
    open1() {
      this.$notify({
        title: "法律声明",
        message:
          "此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题",
        iconClass: "iconfont icon-warning-circle-fill",
      });
    },
    open2() {
      this.$notify({
        title: "隐私条款",
        dangerouslyUseHTMLString: true,
        iconClass: "iconfont icon-warning-circle-fill",
        message:
          "本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息",
      });
    },
    login1() {
      this.$router.push("/Login");
    },
    Login() {
      axios
        .post("/api/users/register", {
          username: this.login.user,
          password: this.login.pass,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.$router.push("/Login");
            this.$message.success(`${res.data.msg}`);
            this.login.user = "";
            this.login.pass = "";
            this.login.repass = "";
          } else {
            console.log(res.data.msg);
            this.login.user = "";
            this.login.pass = "";
            this.login.repass = "";
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
    //   监听
    login: {
      handler(val) {
        // console.log(val);
        if (val.user && val.pass && val.repass) {
          this.boolean = false;
          this.type = "primary";
        } else {
          this.boolean = true;
          this.type = "info";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  background-color: #eee;
  height: 700px;
  padding: 20px 0;
  .box1 {
    width: 600px;
    margin: auto;
    text-align: center;
    .head {
      padding-bottom: 10px;
      border-bottom: 1px solid #000;
    }
    .terms {
      font-size: 14px;
      margin-top: 20px;
      input {
        margin-right: 10px;
      }
    }
    // .el-card__body {
    //   padding: 0 !important;
    // }

    .btn {
      width: 60%;
      margin: 20px;
    }

    .foot {
      text-align: center;
      padding-top: 30px;
      padding-bottom: 30px;
      border-top: 1px solid #000;
      .foot-dl {
        color: rgb(97, 186, 212);
      }
    }
    .ipt {
      width: 60%;
      margin-top: 20px;
    }
    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
    }

    .box-card {
      width: 100%;
    }
  }
}
</style>