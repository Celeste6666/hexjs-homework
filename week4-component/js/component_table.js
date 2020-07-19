Vue.component('list', {
  props: ['products'],
  template: `<table class="table" style="overflow-x:scroll;min-width: 1024px;">
            <tr>
              <th>產品圖片</th>
              <th>產品名稱</th>
              <th>分類</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
            <tr v-for="(item,key) in newProducts" :key ="key">
              <td>
                <img :src="item.imageUrl" class="img-fluid" alt="" style="width: 100px;height: 100px;">
              </td>
              <td>{{item.title}} </td>
              <td>{{item.category}}</td>
              <td>{{item.origin_price}}</td>
              <td>{{item.price}}</td>
              <td class="enable">
                <input type="checkbox" :id="key" :checked="item.enabled" @change="changeChecked(item.id)">
              </td>
              <td>
                <button type="button" class="btn btn-outline-info" @click="edit(item.id)" data-backdrop="false">編輯</button>
                <button type="button" class="btn btn-outline-success" @click="remove(item.id)">刪除</button>
              </td>
            </tr>
          </table>`,
  data() {
    return {
      newProducts: {}
    }
  },
  methods: {
    edit(id) {
      const product = this.newProducts.find(item => item.id === id)
      //modal <=> table
      this.$bus.$emit('list-editproduct', product)
    },
    remove(id) {
      this.$emit('list-removeproduct', id)
    },
    changeChecked(ItemId) {
      const index = this.newProducts.findIndex(item => item.id === ItemId);
      if (this.newProducts[index]['enabled']) {
        this.newProducts[index]['enabled'] = false
      } else {
        this.newProducts[index]['enabled'] = true
      }
      this.$emit('list-changechecked', JSON.parse(JSON.stringify(this.newProducts[index])))
    }
  },
  created() {
    console.log(this.products)
    this.newProducts = JSON.parse(JSON.stringify(this.products));
    this.$bus.$on('sendProdutData', products => {
      this.newProducts = JSON.parse(JSON.stringify(products))
    })
  }
})