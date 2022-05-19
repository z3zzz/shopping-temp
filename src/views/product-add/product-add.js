import * as Api from '/api.js';

// 요소(element)들과 상수들
const titleInput = document.querySelector('#titleInput');
const shortDescriptionInput = document.querySelector('#shortDescriptionInput');
const detailDescriptionInput = document.querySelector(
  '#detailDescriptionInput'
);
const imageInput = document.querySelector('#imageInput');
const priceInput = document.querySelector('#priceInput');
const submitButton = document.querySelector('#submitButton');
const addProductForm = document.querySelector('#registerProductForm');

// 이벤트 추가
submitButton.addEventListener('click', handleSubmit);

// 이벤트에 사용될, 제품 추가 함수
async function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;
  const category = categorySelectBox.value;
  const shortDescription = shortDescriptionInput.value;
  const detailDescription = detailDescriptionInput.value;
  const image = imageInput.value;
  const price = parseInt(priceInput.value);

  // 입력 칸이 비어 있으면 진행 불가
  if (
    !title ||
    !category ||
    !shortDescription ||
    !detailDescription ||
    !image ||
    !price
  ) {
    return alert('빈 칸 및 0이 없어야 합니다.');
  }

  try {
    const data = {
      title,
      category,
      shortDescription,
      detailDescription,
      image,
      price,
    };

    await Api.post('/api/product', data);

    alert(`정상적으로 ${title} 제품이 등록되었습니다.`);

    // 폼 초기화
    addProductForm.reset();
  } catch (err) {
    console.log(err);

    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
