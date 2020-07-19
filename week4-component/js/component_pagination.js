Vue.component('pagination', {
  props: ['total_pages'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="n in total_pages"><a class="page-link" href="#" @click="getPageNum(n)">{{n}}</a></li>    
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
  data() {
    return {
      currentPage: '',
    }
  },
  methods: {
    getPageNum(num) {
      this.currentPage = Number(num);
      console.log(this.currentPage)
      this.$emit('getcurrentpage', this.currentPage)
    }
  }
})