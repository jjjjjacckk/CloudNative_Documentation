<template>
  <div class="container py-4 px-4">
    <div class="row" >
      <span class="fw-bolder fs-1 mb-3 mt-3">
        <i class="fa-solid fa-file-lines"></i>&nbsp;TsmcMD
      </span>
      <div class="col-lg-5 m-auto bg-light-gray" >
        <div class="text-center mb-4">
          <h2 class="fw-bolder mt-4">Signup</h2>
        </div>
        <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
          <span>{{ errorMessage }}</span>
        </div>
        <div v-if="successMessage !== ''" class="alert alert-success mx-4" role="alert">
          {{ successMessage }}&nbsp;&nbsp;<router-link to="/">Login</router-link>
        </div>
        <form id="signup-form" >
          <div class="row justify-content-center">
            <div class="col-sm-10 mb-4 form-group">
              <label class="fs-5 mb-1" for="account">account</label>
              <input type="text" id="account" v-model="user.account" class="form-control form-control-lg">
            </div>
            <div class="col-sm-10 mb-4 form-group">
              <label class="fs-5 mb-1" for="password">password</label>
              <input type="password" id="password" v-model="user.password" class="form-control form-control-lg">
            </div>
            <div class="col-sm-10 mb-4 form-group">
              <label class="fs-5 mb-1" for="password">name</label>
              <input type="text" id="text" v-model="user.username" class="form-control form-control-lg">
            </div>
            <div class="col-sm-12 mb-4 form-group">
              <button :disabled="user.account == '' || user.password == '' || user.username == ''" @click.prevent="newUser" class="btn btn-success btn-lg col-sm-4">Signup</button>
            </div>
            <div class="col-sm-12 form-group">
              <p>Already have an account? <router-link to="/">Login</router-link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default{
  // data() {
  //   return {
  //     user: {
  //       account: '',
  //       password: '',
  //       name: '',
  //     },
  //     errorMessage: '',
  //     successMessage: '',
  //     // allUser: [],
  //     // db: 'https://volleague-default-rtdb.firebaseio.com/',
  //     // SingleProfile: {
  //     //   authid: '',
  //     //   name: 'User',
  //     //   birthday: {
  //     //     year: 'yyyy',
  //     //     month: 'mm',
  //     //     day: 'dd',
  //     //   },
  //     //   position: ['OH'],
  //     //   teamList: [''],
  //     //   StatisticsList: [''],
  //     // }
  //   }
  // },
  // methods: {
  //   // signupRequest() {
  //   //   this.errorMessage = '';
  //   //   this.successMessage = '';
  //   //   if(this.allUser.find(element => element.account == this.user.account)){
  //   //     this.errorMessage = '這個帳號已被使用!';
  //   //   }else{
  //   //     this.successMessage = '註冊成功!';
  //   //     // create auth
  //   //     this.$http.post(this.db + 'auth.json', this.user).then(function(data){
  //   //       this.SingleProfile.authid = data.body.name;
  //   //       this.$http.post(this.db + 'user.json',this.SingleProfile).then(function(data){
  //   //         console.log(data);
  //   //       });
          
  //   //     })
  //   //   }
  //   // }
  // },
  setup() {
    const user = ref(
      {
        account: '',
        password: '',
        username: '',
      })
    const errorMessage = ref('')
    const successMessage = ref('')


    const newUser = () => { 
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "auth-token": state.token
        },
        body: JSON.stringify({
          account: user.value.account,
          password: user.value.password,
          username: user.value.username,
        }),
        mode: "cors",
      }
      
      
      fetch("http://localhost:3080/api/newUser", requestOptions)
        .then(res => res.json()).then(data => console.log(data.message))
        // .catch(err => err.json()).then(data => console.log(data))
    }
  
    return { user, successMessage, errorMessage, newUser }
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