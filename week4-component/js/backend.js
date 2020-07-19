Vue.prototype.$bus = new Vue()
const app = new Vue({
  el: '#app',
  data: {
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    uuid: '8ef975e4-f1b6-4328-932c-fe911c580ec7',
    token: '',
    products: [{
      id: 0,
      title: '星砂光燦金屬唇膏(3.8g) 6款可選',
      category: 'lipstick',
      description: '獨特光澤成為吸睛女神',
      content: '獨特的逆光星砂色彩唇膏！質感光澤唇立現，完美打造百變女孩妝容',
      imageUrl: 'https://images.unsplash.com/photo-1555050455-f96634b5cba6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      enabled: true,
      origin_price: 300,
      price: 190,
      unit: '組',
      num: 89,
    }, {
      id: 1,
      title: '眼色限量9色眼彩盤',
      category: 'eye shadow',
      description: '百搭眼影怎麼化怎麼美',
      content: '一盤多用，絕美的冷與暖色混搭盤！高顯色、服貼持色、不飛粉，多質地隨時滿足，粉霧 x 珠光 x 金屬光！',
      imageUrl: 'https://images.unsplash.com/photo-1575686717697-f43bd36e74c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      enabled: true,
      origin_price: 500,
      price: 459,
      unit: '盒',
      num: 599,
    }, {
      id: 2,
      title: '任你配玩色眼影',
      category: 'eye shadow',
      description: '打造自己專屬的眼影盤',
      content: '利用精湛科技創製出多種眼影質感，使眼妝更自然細滑，不會乾結輕輕一掃，粉末均勻推開，輕鬆控制著色效果，塑造自然的暈染眼妝',
      imageUrl: 'https://images.unsplash.com/photo-1581273154768-0a9a16887d2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      enabled: false,
      origin_price: 100,
      price: 89,
      unit: '盒',
      num: 589,
    }],
    temporary: {
      id: "",
      title: '',
      category: '',
      description: '',
      content: '',
      imageUrl: ['https://images.unsplash.com/photo-1555050455-f96634b5cba6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'],
      enabled: true,
      origin_price: '',
      price: '',
      unit: '',
      num: '',
    },
    paginations: {}
  },
  methods: {
    getCurrentPage(num) {
      this.paginations.current_page = Number(num);
    },
    confirmProduct() {
      if (this.temporary['id'] === '') {
        this.products = [...this.products, this.temporary]
        const productPath = `${this.apiPath}${this.uuid}/admin/ec/product`;
        const vm = this;
        axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
        axios.post(productPath, vm.temporary).then(res => console.log(res.data.data) /*res.data.data是目前新增的資料內容而非全部的產品資料*/ )
        vm.clearEdit()
      } else {
        //找到products中對應的的temporary id 值
        const index = this.products.findIndex(item => item.id === this.temporary.id);
        //將更改過後的temporary傳入到相同id值的那個products[index]裡(這時候的的畫面會同時更新，因為v-for綁定的是products，所以products有變動，v-for也會跟著變動)
        this.products[index] = JSON.parse(JSON.stringify(this.temporary));
        this.$bus.$emit('sendProdutData', this.products)

        //取得這個要變動產品的api位址
        const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${this.products[index].id}`;
        const vm = this;
        axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
        //透過patch將目前更改過後temporary的資料傳進去這個產品API中
        axios.patch(productPath, vm.temporary).then(res => console.log(`更改成功`)).catch(error => console.log(error))
        //新增完後 將id清空 以便之後判斷是否是編輯
        vm.clearEdit()
      };

    },
    changeEnabled(Item) {
      const index = this.products.findIndex(item => item.id === Item.id);
      this.products[index] = Item;
      //取得這個要變動產品的api位址
      const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${this.products[index].id}`;
      const vm = this;
      axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
      //透過patch將目前更改過後temporary的資料傳進去這個產品API中
      axios.patch(productPath, vm.temporary).then(res => console.log(`更改成功`)).catch(error => console.log(error))
    },
    removeProduct(id) {
      const index = this.products.findIndex(item => item.id === id);
      this.products.splice(index, 1)
      const productPath = `${this.apiPath}${this.uuid}/admin/ec/product/${id}`;
      const vm = this;
      axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`
      axios.delete(productPath).then(res => console.log(res)).catch(error => console.log(error))
    },
    clearEdit() {
      this.temporary = {
        id: "",
        title: '',
        category: '',
        description: '',
        content: '',
        imageUrl: '',
        enabled: true,
        origin_price: '',
        price: '',
        unit: '',
        num: '',
      }
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
      this.temporary = newTemporary;
      this.confirmProduct();
    });

  },
})