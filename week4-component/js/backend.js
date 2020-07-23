Vue.prototype.$bus = new Vue()
let token = '';
const app = new Vue({
  el: '#app',
  data: {
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    uuid: '8ef975e4-f1b6-4328-932c-fe911c580ec7',
    products: [],
    paginations: {}
  },
  methods: {
    getCurrentPageData(num = 1) {
      const productsPath = `${this.apiPath}${this.uuid}/admin/ec/products?page=${num}`;
      const vm = this;
      //可以利用下面2種將Authorization傳到伺服器做驗證，只有Authorization驗證成功，才能取得值
      //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(productsPath, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        vm.products = res.data.data;
        vm.paginations = res.data.meta.pagination
        this.$bus.$emit('sendProdutData', this.products)
      })
    },
    confirmProduct(product) {
      if (product['id'] === '') {
        this.products = [...this.products, product]
        const productPath = `${this.apiPath}${this.uuid}/admin/ec/product`;
        const vm = this;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.post(productPath, product).then(res => {
          /*res.data.data是目前新增的資料內容而非全部的產品資料*/
          console.log(res.data.data);

          if (vm.paginations.count === vm.paginations.per_page) {
            vm.getCurrentPageData(vm.paginations.current_page++)
          } else {
            vm.getCurrentPageData(vm.paginations.current_page)
          }
        })
      } else {
        //找到products中對應的的temporary id 值
        const index = this.products.findIndex(item => item.id === product.id);
        //將更改過後的temporary傳入到相同id值的那個products[index]裡(這時候的的畫面會同時更新，因為v-for綁定的是products，所以products有變動，v-for也會跟著變動)
        this.products[index] = JSON.parse(JSON.stringify(product));

        //取得這個要變動產品的api位址
        const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${this.products[index].id}`;
        const vm = this;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //透過patch將目前更改過後temporary的資料傳進去這個產品API中
        axios.patch(productPath, vm.products[index]).then(res => vm.$bus.$emit('sendProdutData', vm.products)).catch(error => console.log(error))
      };

    },
    changeEnabled(Item) {
      const index = this.products.findIndex(item => item.id === Item.id);
      this.products[index] = Item;
      //取得這個要變動產品的api位址
      const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${this.products[index].id}`;
      const vm = this;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.patch(productPath, vm.products[index]).then(res => vm.$bus.$emit('sendProdutData', vm.products)).catch(error => console.log(error))
    },
    removeProduct(id) {
      const index = this.products.findIndex(item => item.id === id);
      this.products.splice(index, 1)
      const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${id}`;
      const vm = this;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.delete(productPath).then(res => vm.$bus.$emit('sendProdutData', vm.products)).catch(error => console.log(error))
    },
    signout() {
      document.cookie = `CelesteToken=; expires=; path=/`;
    }
  },
  created() {
    token = document.cookie.replace(/(?:(?:^|.*;\s*)CelesteToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token === '') {
      window.location = `login.html`
    };
    this.getCurrentPageData()
  },
  mounted() {},
})