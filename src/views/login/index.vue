<template>
  <div ref="login" class="login-body">
    <div class="login-right-wrap">
      <div class="login-top-wrap">
        <div class="login-name">您好，欢迎访问</div>
        <div class="login-title">
          <el-image :src="require('../../assets/icon/logo.png')"></el-image>
          <span>时光拾贝</span>
        </div>
      </div>
      <div class="login-content">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-wrap">
          <el-tab-pane label="账户登录" name="first">
            <el-form ref="loginForm" :model="loginForm" class="login-form" :rules="rules">
              <el-form-item prop="nameCode">
                <el-input v-model="loginForm.nameCode" placeholder="请输入账号">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码"
                  show-password>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" :loading="loading" @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// import router from "@/router";
// import { login } from "@/api/request/login";
import { mapMutations } from "vuex";
export default {
  data() {
    //密码大小写判断
    // let validPassword = (rule, value, callback) => {
    //   let reg =
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,.$!%*?&])[a-zA-Z\d@,.$!%*?&]{8,16}$/;

    //   if (!reg.test(value)) {
    //     callback(new Error("密码必须是由8-16位大小写字母、数字和特殊符号组合"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      activeName: "first",
      loading: false,
      showPassword: false, // 用于控制密码字段的可见性
      iconSrc: require("@/assets/icon/yanjing_yincang_o.png"),
      verificationCode: [],
      loginForm: {
        nameCode: "",
        password: "",
        // code: ""
      },
      rules: {
        nameCode: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          // { validator: validPassword, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // this.changeCode();
  },
  methods: {
    // ...mapMutations(["login"]),
    // 登录tab切换
    handleClick(tab) {
      this.activeName = tab._props.name;
    },
    togglePasswordVisibility() {
      // 切换密码字段的可见性
      this.showPassword = !this.showPassword;
      if (this.showPassword === false) {
        this.iconSrc = require("@/assets/icon/yanjing_yincang_o.png");
      } else {
        this.iconSrc = require("@/assets/icon/yanjing_xianshi_o.png");
      }
    },
    submitForm(loginForm) {
      console.log('登录获取表单', this.loginForm)
      // this.$refs[loginForm].validate((valid) => {
      //   if (valid) {
      //     // this.loading = true;
      //     const data = {
      //       // username: this.Rsa.encrypt(this.loginForm.username),
      //       // password: this.Rsa.encrypt(this.loginForm.password),
      //       nameCode: this.loginForm.nameCode,
      //       password: this.loginForm.password,
      //     };
      //     login(data).then((res) => {
      //       console.log("登录成功", res);
      //       if (res.code == "200") {
      //         this.login(res.data); //存储login信息
      //         if(res.data.role == '管理员'){
      //           this.$router.push({path:'/workbench/home-page'})
      //         }else{
      //           this.$router.push({path:'/home-page'})
      //         }

      //         // window.location.href = "/";
      //         // this.$store.commit("setUserImpowerMenus", res.data.roles);
      //         // localStorage.setItem(
      //         //   "impowerMenus",
      //         //   JSON.stringify(res.data.roles)
      //         // );
      //       } else {
      //         this.loading = false;
      //       }
      //     });
      //   } else {
      //     this.loading = false;
      //     this.$message({
      //       type: "error",
      //       message: "请输入正确的信息!",
      //     });
      //     return false;
      //   }
      // });
    },
    /**
     * @description: 点击注册字体，触发注册请求
     */
    register() {
      console.log("用户注册");
    },
    // 检查验证码是否正确
    checkCode(rule, value, callback) {
      const oldtime = localStorage.getItem("time");
      if (new Date().getTime() > Number(oldtime) + 5 * 60 * 1000) {
        callback(new Error("验证码已过期！请重新获取"));
        return false;
      }
      if (value.toLowerCase() !== this.verificationCode.join("")) {
        callback(new Error("验证码输入错误！"));
      } else {
        callback();
      }
    },
    // 刷新验证码
    changeCode() {
      this.draw(this.verificationCode);
      localStorage.setItem("time", JSON.stringify(new Date().getTime()));
    },
    // 生成并渲染出验证码图形
    // draw(showNum = ["4", "r", "9", "s"]) {
    //   const canvas = document.getElementById("modifyCanvas"); // 获取到canvas的对象
    //   const canvasWidth = canvas.width;
    //   const canvasHeight = canvas.height;
    //   const context = canvas.getContext("2d"); // 获取到canvas画图的环境，演员表演的舞台
    //   canvas.width = canvasWidth;
    //   canvas.height = canvasHeight;
    //   const sCode =
    //     "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    //   const aCode = sCode.split(",");
    //   const aLength = aCode.length; // 获取到数组的长度
    //   for (let i = 0; i < 4; i++) {
    //     // 这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
    //     const j = Math.floor(Math.random() * aLength); // 获取到随机的索引值
    //     // let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
    //     const deg = Math.random() - 0.5; // 产生一个随机弧度
    //     const txt = aCode[j]; // 得到随机的一个内容
    //     showNum[i] = txt.toLowerCase(); // show_num得到的是verificationCode数组的地址，在这给verificationCode赋值了
    //     const x = 4 + i * 20; // 文字在canvas上的x坐标
    //     const y = 25 + Math.random() * 8; // 文字在canvas上的y坐标
    //     context.font = "bold 23px 微软雅黑";
    //     context.translate(x, y);
    //     context.rotate(deg);
    //     context.fillStyle = this.randomColor();
    //     context.fillText(txt, 0, 0);
    //     context.rotate(-deg);
    //     context.translate(-x, -y);
    //   }
    //   for (let i = 0; i <= 30; i++) {
    //     // 验证码上显示小点
    //     context.strokeStyle = this.randomColor();
    //     context.beginPath();
    //     const x = Math.random() * canvasWidth;
    //     const y = Math.random() * canvasHeight;
    //     context.moveTo(x, y);
    //     context.lineTo(x + 1, y + 1);
    //     context.stroke();
    //   }
    //   for (let i = 0; i <= 5; i++) {
    //     // 验证码上显示线条
    //     context.strokeStyle = this.randomColor();
    //     context.beginPath();
    //     context.moveTo(
    //       Math.random() * canvasWidth,
    //       Math.random() * canvasHeight
    //     );
    //     context.lineTo(
    //       Math.random() * canvasWidth,
    //       Math.random() * canvasHeight
    //     );
    //     context.stroke();
    //   }
    // },
    // 得到随机的颜色值
    randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
  },
};
</script>

<style lang="less" scoped>
/* 去除浏览器input自动填充的默认样式 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  /* 重置背景颜色、边框颜色和文本颜色为透明 */
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  -webkit-text-fill-color: inherit;
  background-color: transparent !important;
}

div {
  box-sizing: border-box;
}

.icon {
  color: #3b6be3;
  font-size: 20px;
  width: 18px;
  height: 18px;
  fill: currentColor;
}

:v-deep #app>div>div>div.login-content>div {
  width: 372px !important;
  height: 425px !important;
  left: 185px;
  background: rgb(255, 255, 255);
}

.login-body {
  width: 100%;
  height: 100vh;
  // overflow: auto;
  // display: flex;
  // justify-content: center;
  // flex-direction: column;
  background: url("../../assets/images/login-bg-all.png") no-repeat;
  background-size: cover;
  min-width: 800px;
  min-height: 500px;

  .login-right-wrap {
    width: 720px;
    height: 100vh;
    // position: absolute;
    // top: 0;
    // right: 0;
    // bottom: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    // justify-content: center;
    // background: rgb(6, 59, 62);
    opacity: 0.9;

    .login-content {
      // position: absolute;
      width: 372px;
      height: 425px;
      // left: 185px;
      // top: 265px;
      // right: 163px;
      background: rgb(255, 255, 255);

      .tab-wrap {
        width: 372px;
        height: 425px;
      }

      .login-tabs {
        .fontClass {
          display: inline-block;
          text-align: center;
          width: 160px;
          font-size: 20px;
        }
      }

      .registerText {
        width: 372px;
        height: 54px;
        background: rgb(245, 247, 250);
        color: rgb(48, 49, 51);
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0px;
        text-align: center;

        .green-registerText {
          color: rgb(1, 115, 116);
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 400;
          line-height: 50px;
          letter-spacing: 0px;
          text-align: center;
          margin-left: 7px;
          cursor: pointer;
        }
      }

      .login-form {
        width: 364px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        // .el-form-item {
        //   height: 53px;

        //   // .el-input {
        //   //   height: 43px;

        //   //   :deep(.el-input__inner) {
        //   //     border-radius: 2px;
        //   //   }

        //   //   :deep(.el-input__prefix) {
        //   //     display: flex;
        //   //     align-items: center;
        //   //     justify-content: center;
        //   //   }
        //   //   :deep(.el-input__suffix) {
        //   //     line-height: 55px;
        //   //   }
        //   // }

        //   .el-button--success {
        //     width: 364px;
        //     height: 44px;
        //     background-color: #1f29c9;
        //     border-radius: 2px;
        //     font-size: 16px;
        //     border: none;
        //   }
        // }
        .link {
          padding-bottom: 35px;

          .frogot {
            display: inline-box;

            float: left;
          }

          .forget {
            display: inline-box;

            float: right;
          }
        }

        .codeFlex {
          display: flex;
          width: 364px;
          align-items: center;
          justify-content: space-between;

          :deep(.el-form-item) {
            width: 100%;
            margin-right: 10px;
          }

          .code_box {
            cursor: pointer;
            height: 40px;
            width: 106px;
            border: solid 1px #b2c7df;
            margin-top: -36px;
          }
        }
      }
    }

    .login-top-wrap {
      width:350px;
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 50px;
      .login-name {
        width: 280px;
        height: 47px;
        // position: absolute;
        // right: 0;
        // right: 220px;
        // top: 104px;
        // bottom: 0;
        color: rgb(215, 241, 242);
        font-family: HYChengXingJ;
        font-size: 40px;
        font-weight: undefined;
        line-height: -1;
        letter-spacing: 0px;
        text-align: left;
        margin-bottom: 20px;
      }

      .login-title {
        width: 226px;
        height: 57.85px;
        display: flex;
        align-items: center;
        // position: absolute;
        // left: 312pxpx;
        // right: 252px;
        // top: 182px;
        // bottom: 17px;
        color: rgb(255, 255, 255);
        font-family: Tensentype;
        font-size: 24px;
        font-weight: undefined;
        line-height: 36px;
        letter-spacing: 0px;
        text-align: left;

        // background: url("../../assets//icon/logo.png") no-repeat;
        // background-position: left center;
        // padding-left: 20px;
        span {
          margin-left: 20px;
          color: grey;
        }
      }

    }

  }
}

::v-deep #pane-first>form>div:nth-child(2)>div>div>span>span>i,
::v-deep #pane-second>form>div:nth-child(2)>div>div>span>span>i {
  height: 20px;
  margin-top: 43px;
}

::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>div>div {
  padding-left: 24px;
}

::v-deep #tab-first,
::v-deep #tab-second {
  color: rgb(48, 49, 51);
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  padding-left: 0;
}

::v-deep .el-tabs__item.is-active {
  color: rgb(1, 115, 116) !important;
}

::v-deep .el-tabs__item.is-top.is-active {
  width: 320px !important;
  height: auto;
}

::v-deep .el-tabs__active-bar {
  background-color: rgb(1, 115, 116) !important;
  width: 160px !important;
  margin-left: 24px;
  display: none;
}

::v-deep .el-tabs__active-bar {
  background-color: rgb(1, 115, 116) !important;
  width: 160px !important;
  margin-left: 24px;
}

::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>div>div>div>div.el-tabs__active-bar.is-top {
  width: 161px !important;
}

::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>div>div>div,
::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>div>div>div {
  width: 372px;
}

::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>div>div>div {
  margin-left: 24px;
}

::v-deep #tab-first,
::v-deep #tab-second {
  width: 161px;
  height: 84px;
  text-align: center;
  padding-top: 40px;
}

::v-deep #tab-first {
  margin-left: 24px;
}

::v-deep #pane-first>form>div:nth-child(1)>div>div>input,
::v-deep #pane-first>form>div:nth-child(2)>div>div>input,
::v-deep #pane-second>form>div:nth-child(1)>div>div>input,
::v-deep #pane-second>form>div:nth-child(2)>div>div>input {
  width: 292px;
  height: 40px;
  border: 1px solid rgb(220, 223, 230);
  border-radius: 4px;
  margin-top: 41px;
}

::v-deep #pane-first>form>div:nth-child(3)>div>button,
::v-deep #pane-second>form>div:nth-child(3)>div>button {
  width: 292px;
  height: 40px;
  background: rgb(1, 115, 116);
  border-radius: 4px;
  margin-top: 40px;
}

::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>.el-tabs__nav-wrap is-top>.el-tabs__nav-scroll>.el-tabs__nav {
  width: 323px !important;
  margin-left: 24px;
}

::v-deep #app>div>div>div.login-content>div>div.el-tabs__header.is-top>div>div {
  display: flex;
}
</style>
