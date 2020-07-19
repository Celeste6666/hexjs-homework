//data
const uuid = `8ef975e4-f1b6-4328-932c-fe911c580ec7`;
const apiPath = `https://course-ec-api.hexschool.io/api/${uuid}/ec/products`;
const allRoom = document.querySelector('.allRoom')

//render
function render(data) {
  let content = '';
  data.forEach(item => {
    content += `<div class="col mb-4">
        <a href="#" class="card text-dark text-decoration-none border-0 h-100 room">
          <img
            src=${item.imageUrl}
            alt=${item.title} class="card-img-top room_img">
          <div class="card-body pb-2">
            <h5 class="card-title mb-3">${item.title}</h5>
            <h5 class="card-text room_price d-flex align-items-end">
              <span class="room_price-discount"><small class="mr-2">特惠價</small><span class="font-weight-bolder text-danger">NT.${item.price}</span></span>
              <span class="room_price-orign ml-auto"><small class="mr-2">原價</small><s>NT.${item.origin_price}</s></span>
            </h5>
          </div>
        </a>
      </div>`
  });
  allRoom.innerHTML = content;
}

function getData() {
  axios.get(apiPath)
    .then(res=>{
      render(res.data.data);
    }).catch(error=>console.log(error))
}

getData()