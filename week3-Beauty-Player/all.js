const app = new Vue({
  el: '#app',
  data: {
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
      imageUrl: 'https://images.unsplash.com/photo-1555050455-f96634b5cba6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      enabled: true,
      origin_price: '',
      price: '',
      unit: '',
      num: '',
    }
  },
  methods: {
    confirmProduct() {
      if (this.temporary['id'] === '') {
        const now = new Date();
        this.temporary['id'] = now.getTime();
        this.products = [...this.products, JSON.parse(JSON.stringify(this.temporary))];
      } else {
        const index = this.products.findIndex(item => item.id === this.temporary.id);
        this.products[index] = JSON.parse(JSON.stringify(this.temporary));
      };
      $('#addProduct').modal('toggle')
      //新增完後 將id清空 以便之後判斷是否是編輯
      this.temporary = {
        id: '',
        title: '',
        category: '',
        description: '',
        content: '',
        imageUrl: 'https://images.unsplash.com/photo-1555050455-f96634b5cba6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
        enabled: true,
        origin_price: '',
        price: '',
        unit: '',
        num: '',
      }
    },
    changeEnable(ItemId) {
      const index = this.products.findIndex(item => item.id === ItemId);
      if (this.products[index]['enabled']) {
        this.products[index]['enabled'] = false
      } else {
        this.products[index]['enabled'] = true
      }
    },
    removeProduct(id) {
      const index = this.products.findIndex(item => item.id === id);
      this.products.splice(index, 1)
    },
    editProduct(id) {
      $('#addProduct').modal('toggle')
      this.temporary = JSON.parse(JSON.stringify(this.products.find(item => item.id === id)));
    },
    cancelEdit() {
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

  }
})