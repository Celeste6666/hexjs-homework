export default {
  props: ['products'],
  template: `<div class="row row-cols-1 row-cols-md-3" v-if="products">
      <div class="col mb-4" v-for="(item,key) in products" :key="key">
        <div class="card text-dark text-decoration-none border-0 h-100 product">
          <img :src="item.imageUrl[0]" :alt="item.title" class="card-img-top product_img">
          <div class="card-body pb-2">
            <h5 class="card-title mb-3 d-flex justify-content-between"><span>{{item.title}}</span><a href="#" class="text-warning" @click.prevent="buyProduct(item.id)"><i
                class="fas fa-cart-plus fa-lg"></i></a></h5>
            <h5 class="card-text product_price d-flex align-items-end">
              <span class="product_price-discount">
                <small class="mr-2"> 特惠價 </small>
                <span class="font-weight-bolder text-danger">NT.{{item.price}}</span>
              </span>
              <span class="product_price-orign ml-auto">
                <small class="mr-2">原價</small>
                <s>NT.{{item.origin_price}}</s>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>`,
  data() {
    return {}
  },
  methods: {
    buyProduct(id) {
      const product = this.products.find(item => item.id === id);
      this.$emit('buyproduct', JSON.parse(JSON.stringify(product)))
    }
  },
  created() {
  }
}