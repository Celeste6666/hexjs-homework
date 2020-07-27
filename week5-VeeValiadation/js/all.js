import list from "./component_index/component_list.js";
import cart from "./component_index/component_cart.js";
import pagination from "./component_index/component_pagination.js";

Vue.component('list', list);
Vue.component('cart', cart);
Vue.component('pagination', pagination);
Vue.component('loading', VueLoading);

new Vue({
  el: '#app',
  data: {
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    uuid: '8ef975e4-f1b6-4328-932c-fe911c580ec7',
    products: [],
    cartProducts: [],
    paginations: {},
    classList: {
      cartHidden: true,
    },
    isLoading: false,
    loader: 'dots'
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      const productsPath = `${this.apiPath}${this.uuid}/ec/products?page=${page}`;
      axios.get(productsPath).then(res => {
        this.products = res.data.data;
        this.paginations = res.data.meta.pagination;
        this.getCartData();
      }).catch(error => console.log(error))
    },
    getCartData() {
      this.isLoading = true;
      const cartPath = `${this.apiPath}${this.uuid}/ec/shopping`;
      axios.get(cartPath).then(res => {
        this.cartProducts = res.data.data;
        this.isLoading = false;
      }).catch(error => console.log(error))
    },
    setNewCartItem(product) {
      this.isLoading = true;
      const cartPath = `${this.apiPath}${this.uuid}/ec/shopping`;
      if (this.cartProducts.some(item => item.product.id === product.id)) {
        let index = this.cartProducts.findIndex(item => item.product.id === product.id);
        this.cartProducts[index].quantity++;
        axios.patch(cartPath, {
          product: this.cartProducts[index].product.id,
          quantity: JSON.stringify(this.cartProducts[index].quantity)
        }).then(res => {
          console.log(this.cartProducts);
          this.isLoading = false;
        }).catch(error => console.log(error))
      } else {
        axios.post(cartPath, {
          product: product.id,
          quantity: "1"
        }).then(res => {
          this.cartProducts = [...this.cartProducts, res.data.data];
          this.isLoading = false;
        }).catch(error => console.log(error))
      }
    },
    toggleCartDetail() {
      this.classList.cartHidden = this.classList.cartHidden ? false : true;
    }
  },
  created() {
    this.getData()
  }
})