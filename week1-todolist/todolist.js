const modal = {
  todos: {
    importantUrgent: ['JS homework', 'Hex task'],
    importantNotUrgent: ['do exercise'],
    NotImportantUrgent: ['work'],
    NotImportantNotUrgent: ['watch movie']
  },
  //暫時紀錄新增資料狀態
  dataTemporary: '',
  importantStatus: '',
  urgentStatus: '',
  //將新增的暫時資料分類
  addTodos(dataTemporary, importantStatus, urgentStatus) {
    if (dataTemporary === '') {
      return
    }
    if (importantStatus === "important" && urgentStatus === "urgent") {
      modal.todos.importantUrgent = [...modal.todos.importantUrgent, dataTemporary];
    } else if (importantStatus === 'important' && urgentStatus === 'notUrgent') {
      modal.todos.importantNotUrgent = [...modal.todos.importantNotUrgent, dataTemporary];
    } else if (importantStatus === 'notImportant' && urgentStatus === 'urgent') {
      modal.todos.NotImportantUrgent = [...modal.todos.NotImportantUrgent, dataTemporary];
    } else if (importantStatus === 'notImportant' && urgentStatus === 'notUrgent') {
      modal.todos.NotImportantNotUrgent = [...modal.todos.NotImportantNotUrgent, dataTemporary];
    }
  },
  removeAllDatas(todos) {
    todos.splice(0)
  }
}


const view = {
  clearAll: document.querySelector('.clearall'),
  formAddTodo: document.querySelector('.form-addTodo'),
  newTodo: document.querySelector('#newTodo'),
  jsImportant: document.querySelector('.js-important'),
  jsUrgent: document.querySelector('.js-urgent'),
  focusmatrix: document.querySelector('.focusmatrix'),
  myImportantUrgent: document.querySelector('.my-importantUrgent'),
  myImportantNotUrgent: document.querySelector('.my-importantNotUrgent'),
  myNotImportantUrgent: document.querySelector('.my-NotImportantUrgent'),
  myNotImportantNotUrgent: document.querySelector('.my-NotImportantNotUrgent'),
  badgeImportantUrgent: document.querySelector('.badge-importantUrgent'),
  badgeImportantNotUrgent: document.querySelector('.badge-importantNotUrgent'),
  badgeNotImportantUrgent: document.querySelector('.badge-NotImportantUrgent'),
  badgeNotImportantNotUrgent: document.querySelector('.badge-NotImportantNotUrgent'),

  //將datas匯入dataTo
  render(datas, dataTo) {
    let content = '';
    datas.forEach(item => {
      content += `<li class="d-flex justify-content-between align-items-baseline my-1">
              <div class="form-check">
                <input class="form-check-input js-checked" type="checkbox" value="${item}">
                <label class="form-check-label ml-2">
                  ${item}
                </label>
                </div>
                <a href="#" class="text-secondary js-trash"><i class="far fa-lg fa-trash-alt" data-name="${item}"></i></a>
            </li>`
    })
    dataTo.innerHTML = content;
  },
  //完成的事項做完成.checked樣式
  toggleHaveDone(target) {
    if (target.tagName === "INPUT" && target.matches('.js-checked')) {
      if (target.nextElementSibling.matches('.checked')) {
        target.nextElementSibling.classList.remove('checked');
      } else {
        target.nextElementSibling.classList.add('checked');
      }
    } else {
      return
    }
  },
  //將小標籤的資料(區域內資料)做更新
  renderBadge(importantUrgent, importantNotUrgent, NotImportantUrgent, NotImportantNotUrgent) {
    view.badgeImportantUrgent.textContent = importantUrgent.length;
    view.badgeImportantNotUrgent.textContent = importantNotUrgent.length;
    view.badgeNotImportantUrgent.textContent = NotImportantUrgent.length;
    view.badgeNotImportantNotUrgent.textContent = NotImportantNotUrgent.length;
  },
  init() {
    //取得jsImportant區的input被改變後的資料
    view.jsImportant.addEventListener('change', e => {
        controller.getDataValue(e.target);
      }),
      //取得jsUrgent區的input被改變後的資料
      view.jsUrgent.addEventListener('change', e => {
        controller.getDataValue(e.target);
      }),
      view.formAddTodo.addEventListener('submit', e => {
        e.stopPropagation();
        e.preventDefault();
        controller.setItemInTodos();
      }),
      view.focusmatrix.addEventListener('change', e => {
        view.toggleHaveDone(e.target);
      }),
      view.focusmatrix.addEventListener('click', e => {
        controller.removeTodo(e.target);
      }),
      view.clearAll.addEventListener('click', e => {
        controller.clearAllTodos(e.target)
      })
  }
}


const controller = {
  init() {
    controller.renderAll();
    view.init();
  },
  //透過畫面取得分類資料並將資料存入modal暫時區域
  getDataValue(target) {
    if (target.name === 'radio-important') {
      modal.importantStatus = target.value;
    } else if (target.name === 'radio-urgent') {
      modal.urgentStatus = target.value;
    }
  },
  //將所有render變成一筆
  renderAll() {
    view.renderBadge(modal.todos.importantUrgent, modal.todos.importantNotUrgent, modal.todos.NotImportantUrgent, modal.todos.NotImportantNotUrgent)
    view.render(modal.todos.importantUrgent, view.myImportantUrgent);
    view.render(modal.todos.importantNotUrgent, view.myImportantNotUrgent);
    view.render(modal.todos.NotImportantUrgent, view.myNotImportantUrgent);
    view.render(modal.todos.NotImportantNotUrgent, view.myNotImportantNotUrgent);
  },
  //取得畫面上輸入的文字資料，並進行分類，最後渲染整個畫面
  setItemInTodos() {
    modal.dataTemporary = view.newTodo.value;
    modal.addTodos(modal.dataTemporary, modal.importantStatus, modal.urgentStatus);
    controller.renderAll();
    view.newTodo.value = '';
  },
  //將不要的資料移除後，重新渲染畫面
  removeTodo(target) {
    if (target.parentElement.tagName === "A" && target.parentElement.matches('.js-trash')) {
      let index = '';
      let targetParentUL = target.parentElement.parentElement.parentElement;
      Object.keys(modal.todos).forEach(key => {
        if (targetParentUL.matches(`.my-${key}`)) {
          index = modal.todos[key].findIndex(value => value === target.dataset.name);
          if (index !== -1) {
            modal.todos[key].splice(index, 1);
            target.parentElement.parentElement.remove();
            view.renderBadge(modal.todos.importantUrgent, modal.todos.importantNotUrgent, modal.todos.NotImportantUrgent, modal.todos.NotImportantNotUrgent)
            return
          }
        }
      });
    }
  },
  //清除所有資料
  clearAllTodos(target) {
    console.log(target)
    if (target.matches('.js-trash.clearall') || target.dataset.clear==='all') {
      Object.keys(modal.todos).forEach(items => {
        modal.removeAllDatas(modal.todos[items]);
      })
      controller.renderAll();
    }
  }

}
//執行所有程式碼
controller.init()