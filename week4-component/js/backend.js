Vue.prototype.$bus = new Vue()
const app = new Vue({
  el: '#app',
  data: {
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    uuid: '8ef975e4-f1b6-4328-932c-fe911c580ec7',
    token: '',
    products: [],
    paginations: {}
  },
  methods: {
    getCurrentPage(num) {
      this.paginations.current_page = Number(num);
    },
    confirmProduct(product) {
      if (product['id'] === '') {
        this.products = [...this.products, product]
        const productPath = `${this.apiPath}${this.uuid}/admin/ec/product`;
        const vm = this;
        axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
        axios.post(productPath, product).then(res => {
          console.log(res.data.data);
          vm.$bus.$emit('sendProdutData', vm.products)
        } /*res.data.data是目前新增的資料內容而非全部的產品資料*/ )
      } else {
        //找到products中對應的的temporary id 值
        const index = this.products.findIndex(item => item.id === product.id);
        //將更改過後的temporary傳入到相同id值的那個products[index]裡(這時候的的畫面會同時更新，因為v-for綁定的是products，所以products有變動，v-for也會跟著變動)
        this.products[index] = JSON.parse(JSON.stringify(product));

        //取得這個要變動產品的api位址
        const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${this.products[index].id}`;
        const vm = this;
        axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
      axios.patch(productPath, vm.products[index]).then(res => vm.$bus.$emit('sendProdutData', vm.products)).catch(error => console.log(error))
    },
    removeProduct(id) {
      const index = this.products.findIndex(item => item.id === id);
      this.products.splice(index, 1)
      const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${id}`;
      const vm = this;
      axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
      axios.delete(productPath).then(res => vm.$bus.$emit('sendProdutData', vm.products)).catch(error => console.log(error))
    },
    signout() {
      document.cookie = `CelesteToken=; expires=; path=/`;
    }
  },
  created() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)CelesteToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (this.token === '') {
      window.location = `login.html`
    };
    const productsPath = `${this.apiPath}${this.uuid}/admin/ec/products`;
    const vm = this;
    //可以利用下面2種將Authorization傳到伺服器做驗證，只有Authorization驗證成功，才能取得值
    //axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`;
    axios.get(productsPath, {
      headers: {
        Authorization: `Bearer ${vm.token}`
      }
    }).then(res => {
      console.log(res)
      vm.products = res.data.data;
      vm.paginations = res.data.meta.pagination
      this.$bus.$emit('sendProdutData', this.products)
    })
  },
  mounted() {
    //當modal執行'ensure'事件時，root的生命週期執行到mounted時，就會接收'ensure'事件，並且執行下面的函式
    this.$bus.$on('modal-ensure', newTemporary => {
      this.confirmProduct(newTemporary);
    });

  },
})