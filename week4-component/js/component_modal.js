Vue.component('modal', {
  template: `<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="addProductLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable " style="max-width: 1000px !important;">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addProductLabel">新增/編輯 產品</h5>
              <button type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <span class="font-weight-bold py-1">輸入圖片網址</span>
                    <input class="form-control" type="text"
                      placeholder="https://images.unsplash.com/photo-1498842812179-c81beecf902c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                      v-model="newTemporary.imageUrl[0]">
                    <img :src="newTemporary.imageUrl[0]" class="w-100 h-100 rounded img-bg mt-2">
                  </div>
                  <div class="col-md-8">
                    <div class="container-fluid d-flex flex-column">
                      <div class="d-flex">
                        <div class="d-flex flex-column mr-1 w-25">
                          <span class="font-weight-bold py-1">分類</span>
                          <input class="form-control" type="text" placeholder="口紅" v-model="newTemporary.category">
                        </div>
                        <div class="d-flex flex-column w-75">
                          <span class="font-weight-bold py-1">產品名稱</span>
                          <input class="form-control" type="text" placeholder="請輸入產品名稱" v-model="newTemporary.title">
                        </div>
                      </div>
                      <div class="d-flex flex-column">
                        <span class="font-weight-bold py-1">產品描述</span>
                        <textarea class="form-control" cols="30" rows="1" placeholder="永遠缺一支的口紅" v-model="newTemporary.options.description"></textarea>
                      </div>
                      <div class="d-flex">
                        <div class="d-flex flex-column mr-1 w-50">
                          <span class="font-weight-bold py-1">數量</span>
                          <input class="form-control" type="text" placeholder="50" v-model="newTemporary.options.totalNum">
                        </div>
                        <div class="d-flex flex-column w-50">
                          <span class="font-weight-bold py-1">單位</span>
                          <input class="form-control" type="text" placeholder="支" v-model="newTemporary.unit">
                        </div>
                      </div>
                      <div class="d-flex">
                        <div class="d-flex flex-column w-50 mr-1">
                          <span class="font-weight-bold py-1">原價</span>
                          <input class="form-control" type="text" placeholder="200"
                            v-model.number="newTemporary.origin_price">
                        </div>
                        <div class="d-flex flex-column w-50">
                          <span class="font-weight-bold py-1">售價</span>
                          <input class="form-control" type="text" placeholder="190" v-model.number="newTemporary.price">
                        </div>
                      </div>
                      <div class="d-flex flex-column">
                        <span class="font-weight-bold py-1">產品說明</span>
                        <textarea class="form-control" cols="30" rows="3"
                          placeholder="輕薄不易掉色，顯色度佳，飽和色澤、綿密細緻狂掃世界唇彩排行榜，熱銷全球！" v-model="newTemporary.content"></textarea>
                      </div>
                      <div class="d-flex flex-column mt-2">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="enableCheck"
                            v-model="newTemporary.enabled">
                          <label class="custom-control-label" for="enableCheck">是否啟用</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button"
                class="btn btn-outline-secondary"
                @click="cancel">取消編輯</button>
              <span>
                <button type="button"
                class="btn btn-warning"
                @click="confirm" v-if="newTemporary.id===''">新增產品</button>
                <button type="button" class="btn btn-warning" @click="confirm" v-else>確認編輯</button>
              </span>
            </div>
          </div>
        </div>
      </div>`,
  data() {
    return {
      newTemporary: {
        id: '',
        title: '',
        category: '',
        description: '在重新串接資料時，會跑不出來，但使用options就不會',
        content: '',
        imageUrl: [],
        enabled: true,
        origin_price: '',
        price: '',
        unit: '',
        options: {
          eitor: '',
          supervisor: '',
          commet: '',
          totalNum: '',
          description: '',
        }
      }
    }
  },
  methods: {
    confirm() {
      this.$bus.$emit('modal-ensure', JSON.parse(JSON.stringify(this.newTemporary)));
      $('#addProduct').modal('toggle')
    },
    cancel() {
      this.newTemporary = {
        id: '',
        title: '',
        category: '',
        description: '',
        content: '',
        imageUrl: [],
        enabled: true,
        origin_price: '',
        price: '',
        unit: '',
        options: {
          eitor: '',
          supervisor: '',
          commet: '',
          totalNum: '',
          description: ''
        }
      }
      $('#addProduct').modal('toggle')
    }
  },
  created() {},
  mounted() {
    this.$bus.$on('list-editproduct', temporary => {
      this.newTemporary = JSON.parse(JSON.stringify(temporary));
      $('#addProduct').modal('toggle')
    });
  }
})