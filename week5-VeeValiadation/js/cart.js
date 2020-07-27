const apiPath = 'https://course-ec-api.hexschool.io/api/';
const uuid = '8ef975e4-f1b6-4328-932c-fe911c580ec7';
import list from "./component_cart/component_list.js";
import zh_TW from './component_cart/zh_TW.js';
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('validation-provider', VeeValidate.ValidationProvider);
Vue.component('loading', VueLoading);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('validation-observer', VeeValidate.ValidationObserver);
// Class 設定檔案
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});
// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);
Vue.component('list', list);
new Vue({
  el: '#vm',
  data: {
    cartproducts: [],
    buyerDetail: {
      buyer: '',
      recipient: '',
      buyerTel: '',
      buyerEmail: '',
      address: '',
      paymentway: '',
      addtion: '',
    },
    isLoading: false,
    loader: 'dots'

  },
  methods: {
    getCartData() {
      this.isLoading = true;
      const cartPath = `${apiPath}${uuid}/ec/shopping`;
      axios.get(cartPath).then(res => {
        this.cartproducts = res.data.data;
        this.isLoading = false;
      }).catch(error => console.log(error))
    },
    deleteAll() {
      const cartPath = `${apiPath}${uuid}/ec/shopping/all/product`;
      axios.delete(cartPath).then(res => this.getCartData()).catch(error => console.log(error))
    },
    submitForm() {
      alert(`謝謝您的購買！`)
    }
  },
  created() {
    this.isLoading = true;
    this.getCartData()
  }
})