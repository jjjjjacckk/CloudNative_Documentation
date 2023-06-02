<template>
  <div class="container py-4 px-4">
    <div class="row">
      <span class="fw-bolder fs-1 mb-3 mt-3">
        <i class="fa-solid fa-file-lines"></i>&nbsp;TsmcMD
      </span>
      <div class="col-lg-5 m-auto bg-light-gray">
        <div class="text-center mb-4">
          <h2 class="fw-bolder mt-4">Login</h2>
        </div>
        <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
          <span>{{ errorMessage }}</span>
        </div>
        <form id="login-form">
          <div class="row justify-content-center">
            <div class="col-sm-10 mb-4 form-group">
              <label class="fs-5 mb-1" for="account">account</label>
              <input type="text" id="account" v-model="user.account" class="form-control form-control-lg">
            </div>
            <div class="col-sm-10 mb-4 form-group">
              <label class="fs-5 mb-1" for="password">password</label>
              <input type="password" id="password" v-model="user.password" class="form-control form-control-lg">
            </div>
            <div class="col-sm-12 mb-4 form-group">
              <!-- <button :disabled="user.account == '' || user.password == ''" @click.prevent="loginRequest" class="btn btn-primary btn-lg col-sm-4">登入</button> -->
              <button :disabled="user.account == '' || user.password == ''" class="btn btn-primary btn-lg col-sm-4">Login</button>
            </div>
            <div class="col-sm-12 form-group">
            <p>Don't have an account? <router-link to="/signup">Signup</router-link></p>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  
</template>

<script>
export default{
  data() {
    return {
      user: {
        account: '',
        password: '',
      },
      errorMessage: '',
      // allUser: [],
    }
  },
  methods: {
    // loginRequest(){
    //   this.errorMessage = '';
    //   var matchAcc = this.allUser.find(element => element.account == this.user.account);
    //   if(matchAcc == undefined){
    //     this.errorMessage = '沒有這個使用者!';
    //   }else{
    //     if(matchAcc.password == this.user.password){
    //       this.errorMessage = '';
    //       var authID = matchAcc.id;
    //       this.$http.get(this.db + 'user.json').then(function(data){
    //         return data.json();
    //       }).then(function(data){
    //         for(let userID in data){
    //           if(data[userID].authid == authID){
    //             this.$router.push('/home/' + userID);
    //           }
    //         }
    //       })
    //     }else{
    //       this.errorMessage = '密碼錯誤!';
    //     }
    //   }
    // },
  },
  setup(){
    // // get all user
    // this.$http.get(this.db + 'auth.json').then(function(data){
    //   return data.json();
    // }).then(function(data){
    //   var userArr = [];
    //   for(let key in data){
    //     data[key].id = key;
    //     userArr.push(data[key]);
    //   }
    //   this.allUser = userArr;
    //   // console.log(this.allUser);
    // })
  },
}
</script>

<style scoped>
.bg-light-gray {
  background-color:#EBEDEF;
  border-radius: 25px;
}
.logo {
  height: auto;
  width: 300px;
}

</style>