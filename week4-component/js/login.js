const login = new Vue({
  el: '#login',
  data: {
    uuid: '',
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    user: {
      //API系統的帳密才能取得資料
      "email": '',
      "password": '',
    },
    token: '',
  },
  methods: {
    signIn() {
      const signInPath = `${this.apiPath}auth/login`;
      const vm = this;
      axios.post(signInPath, this.user).then(res => {
        console.log(res)
        vm.uuid = res.data.uuid;
        vm.token = res.data.token;
        const expired = res.data.expired
        document.cookie = `CelesteToken=${vm.token}; expires=${new Date(expired*1000)}; path=/`;
        if (vm.token !== '') {
          window.location = `backend.html`
        }
      }).catch(error =>
        alert(`帳號或密碼不存在，請重新輸入！`))
    }
  },
  created() {

  }
})