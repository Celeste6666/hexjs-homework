import list from "./component_list.js";
Vue.component('list', list);
new Vue({
  el: '#app',
  data: {
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    uuid: '8ef975e4-f1b6-4328-932c-fe911c580ec7',
    products: [],
  },
  methods: {
    getData() {
      const productsPath = `${this.apiPath}${this.uuid}/ec/products`;
      axios.get(productsPath).then(res => {
        this.products = res.data.data;
      }).catch(error => console.log(error))
    },
  },
  created() {
    this.getData()
  }
})