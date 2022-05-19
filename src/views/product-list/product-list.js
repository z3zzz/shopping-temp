import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#producItemContainer');

addAllElements();

addProductItemsToContainer();

async function addProductItemsToContainer() {
  const products = await Api.get(`/api/productlist`);

  products.forEach(async (product) => {
    // 객체 destructuring
    const { title, shortDescription, image, price } = product;

    productItemContainer.insertAdjacentHTML(
      'beforeend',
      `
      <div class="message media product-item">
        <div class="media-left">
          <figure class="image">
            <img
              src="${image}"
              alt="제품 이미지"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title">${title}</p>
            <p class="description">${shortDescription}</p>
            <p class="price">${addCommas(price)}원</p>
          </div>
        </div>
      </div>
      `
    );
  });
}
