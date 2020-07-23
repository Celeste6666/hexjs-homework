Vue.component('pagination', {
  props: ['paginations'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{disabled:paginations.current_page===1}">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPageNum(paginations.current_page--)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="n in paginations.total_pages"><a class="page-link" href="#" @click="getPageNum(n)">{{n}}</a></li>    
    <li class="page-item" :class="{disabled:paginations.current_page===paginations.total_pages}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="getPageNum(paginations.current_page++)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
  data() {
    return {}
  },
  methods: {
    getPageNum(num) {
      this.$emit('pagination-getcurrentpage', num)
    }
  }
})