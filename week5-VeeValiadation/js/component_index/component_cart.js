export default {
  props: ['cartproducts', 'hidden'],
  template: `<table class="table cart_detail text-white rounded text-center" :class="{hidden:hidden}">
              <thead>                
                <tr>
                  <th scope="col">名稱</th>
                  <th scope="col">數量</th>
                  <th scope="col">價格</th>
                  <th scope="col">總計</th>
                  <th scope="col">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in cartproducts" :key="key">
                  <td scope="row" class="text-truncate">{{item.product.title}}</td>
                  <td>{{item.quantity}}</td>
                  <td>{{item.product.price}}</td>
                  <td>{{item.quantity * item.product.price}}</td>
                  <td><a href="#" class="text-danger" @click.prevent=deleteProduct(item.product.id)><i class="far fa-trash-alt"></i></a></td>
                </tr>
              </tbody>
              <tfoot>
              <tr>
              <td scope="row" colspan="3">消費總計</td>
              <td colspan="2"  class="text-left">{{totalPrice}}</td>
              </tr>
              <tr>
              <td colspan="5"class="text-right"><a href="#" class="btn btn-dark" @click.prevent="toCart">結帳去</a></td>
              </tr>
              </tfoot>
            </table>`,
  data() {
    return {
      totalPrice: 0,
      apiPath: 'https://course-ec-api.hexschool.io/api/',
      uuid: '8ef975e4-f1b6-4328-932c-fe911c580ec7',
    }
  },
  methods: {
    getTotalPrice() {
      this.totalPrice = this.cartproducts.reduce((acc, cur) => acc += cur.quantity * cur.product.price, 0)
    },
    toCart() {
      if (this.totalPrice === 0) {
        alert(`您尚未挑選任何產品！`)
        return
      }
      window.location = 'cart.html'
    },
    deleteProduct(id) {
      this.$emit('cart-loading')
      const cartPath = `${this.apiPath}${this.uuid}/ec/shopping/${id}`;
      axios.delete(cartPath, {
        product: id
      }).then(res => this.$emit('cart-cartproducts')).catch(error => console.log(error))
    }
},
updated() {
  this.getTotalPrice()
}
}