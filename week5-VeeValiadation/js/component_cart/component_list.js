export default {
  props: ['cartproducts'],
  template: `<table class="table text-left">
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
            <td>
            <button type="button" class="btn btn-sm btn-outline-dark mr-2" @click.prevent="changeQuantity(item.product.id,item.quantity+=1)">+</button>
            {{item.quantity}}
            <button type="button" class="btn btn-sm btn-outline-dark ml-2" @click.prevent="changeQuantity(item.product.id,item.quantity-+1)">-</button></td>
            <td>{{item.product.price}}</td>
            <td>{{item.quantity * item.product.price}}</td>
            <td><a href="#" class="text-danger" @click.prevent=deleteProduct(item.product.id)><i
                  class="far fa-trash-alt fa-lg"></i></a></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="3">消費總計</th>
            <th colspan="2" class="text-left">{{totalPrice}}</th>
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
    calculateTotal() {
      this.totalPrice = this.cartproducts.reduce((acc, cur) => acc += cur.quantity * cur.product.price, 0)
    },
    changeQuantity(id, quantity) {
      this.$emit('list-loading')
      const cartPath = `${this.apiPath}${this.uuid}/ec/shopping`;
      if (quantity === 0) {
        const deletePath = `${this.apiPath}${this.uuid}/ec/shopping/${id}`
        axios.delete(deletePath, {
          product: id
        }).then(res => {
          this.$emit('list-cartproducts')
        }).catch(error => console.log(error))
      } else {
        axios.patch(cartPath, {
          product: id,
          quantity: JSON.stringify(quantity)
        }).then(res => this.$emit('list-cartproducts')).catch(error => console.log(error))
      }
    },
    deleteProduct(id) {
      this.$emit('list-loading')
      const cartPath = `${this.apiPath}${this.uuid}/ec/shopping/${id}`;
      axios.delete(cartPath, {
        product: id
      }).then(res => this.$emit('list-cartproducts')).catch(error => console.log(error))
    }
  },
  beforeUpdate() {
    this.calculateTotal()
  }
}