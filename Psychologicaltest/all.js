const vm = new Vue({
  el: '#vm',
  data: {
    classList: {
      isHidden: true,
      isTestBtnHidden: false,
      isArrowHidden: true,
    },
    allData: {},
    problems: [],
    categories: [],
    localStorageData: {},
    score: {},
    //暫存
    nowProblemData: {},
    nowQuestionIndex: -1,
    resultCategory: '',
    resultData: {},
    resultScore: 0

  },
  methods: {
    getData() {
      const vm = this;
      axios.get('https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json').then(res => {
        vm.allData = res.data
        //取得人格特質(英文)
        vm.categories = res.data.traits.en;
        vm.problemList = res.data.problemList
        vm.categories.forEach(item => {
          //因為item屬性並不是原本就存在的，所以要用$set將資料新增進去並確保這些資料都有setter的功能
          vm.$set(vm.score, item, 0)
          vm.$set(vm.score, `${item}Total`, 0)
        })
        //取得問題內容
        vm.categories.forEach(item => {
          res.data.problemList[item].problems.forEach(data => {
            vm.problems = [...vm.problems, data]
          });
        });
        //取得localStorage
        vm.getLocalStorage();
        vm.getResult('openness')
      }).catch(error => console.log(error))
    },
    render(index) {
      index = Number(index)
      if (index === -1) {
        this.classList.isHidden = true;
        this.classList.isArrowHidden = true;
        this.classList.isTestBtnHidden = false;
      } else if (index === (this.problems.length - 1) || index === this.problems.length) {
        if (this.score[this.nowProblemData.category] === 0) {
          alert(`你尚未點選任何一個選項！`)
          return
        }
        this.claculateScore(this.nowProblemData.category);
        if (index === this.problems.length) {
          this.classList.isHidden = true;
          localStorage.setItem('score', JSON.stringify(this.score))
          return
        }
        this.classList.isHidden = false;
        this.classList.isArrowHidden = true;
        this.classList.isTestBtnHidden = false;
        this.nowProblemData = this.problems[index];
        //資料改變
      } else {
        //claculateScore要放在最上層，因為這時候的nowProblemData的資料還沒變動，才能取得上一頁點選後的category的值
        //放在資料處理過後的話，原本要計算的score[openness] 在資料改變後，帶到claculateScore裡的引數會變成score[conscientiousness]
        if (index !== 0) {
          if (this.score[this.nowProblemData.category] === 0) {
            alert(`你尚未點選任何一個選項！`)
            return
          }
          this.claculateScore(this.nowProblemData.category)
        }
        this.classList.isHidden = false;
        this.classList.isArrowHidden = false;
        this.classList.isTestBtnHidden = true;
        this.nowProblemData = this.problems[index];
      }
    },
    claculateScore(category) {
      this.score[`${category}Total`] += this.score[category];
      //將跟頁面radio的資料值變為0，避免資料儲存之後同個category的問題會取得上一筆的資料，而導致一進入頁面就設定好選取的物件
      //例如問題o1選取後，因為設定了v-model資料連動，所以score.openness的值會被儲存成o1 radio的value值，在下一個問題o2畫面渲染後，會先取得score.openness的值(也就是之前o1選取後的值)，導致一進入畫面就先設定擁有該值的物件被選取
      this.score[`${category}`] = 0;
    },
    getLocalStorage() {
      this.localStorageData = JSON.parse(localStorage.getItem('score'))
    },
    //result
    getResult(category) {
      this.resultData = this.allData.problemList[category];
      this.resultCategory = category;
      this.resultScore = this.localStorageData[`${category}Total`]
    },
    renderResult(category) {
      const navs = document.querySelectorAll('.js-nav');
      navs.forEach(nav => {
        if (nav.classList[1] === category) {
          nav.classList.add('active')
        } else {
          nav.classList.remove('active')
        }
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    console.log(document.querySelector('.result_banner-nav'))
    //<ul v-if="allData.traits">底下元素會是在mounted只是將allData.traits資料帶入並準備開始渲染，所以這時候找不到<li></li>，因為他們還沒被渲染，畫面要一直到生命週期updated()時，才真正全部被渲染完畢(包括v-for下的DOM元素)，這時候才找的到v-for下的DOM元素。
    console.log(document.querySelector('.result_banner-nav ul'))
  },
  updated() {
    console.log(document.querySelector('.result_banner-nav ul'))
    this.renderResult(this.resultCategory)
  }
})