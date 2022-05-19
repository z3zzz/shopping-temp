import { productModel } from '../db'; // 폴더를 이렇게 경로로 하면, 자동으로 index.js에서 가져옴.

class ProductService {
  // new ProductService(productModel) 로 만들면 constructor 함수가 실행되어, this.productModel 변수에 productModel이 할당됨.
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    // 타이틀을 가져옴
    const title = productInfo.title;

    // 타이틀로 db에서 찾아봄
    const product = await this.productModel.findByTitle(title);

    // 찾은 결과가 있다면, 이미 쓰고 있는 타이틀(이름)이므로, 에러를 반환함. -> 자동으로 에러 미들웨어로 넘어감.
    if (product) {
      throw new Error(
        '이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.'
      );
    }

    // 해당 타이틀의 제품은 db에 없는 상황이므로, 정상적으로 db에 저장하면 됨.

    // db에 저장
    const createdNewProduct = await this.productModel.create(productInfo);

    // db에 저장하면 mongoose는 저장된 데이터를 반환하는데, 이를 그대로 다시 컨트롤러 층에 반환함.
    return createdNewProduct;
  }

  async getProducts() {
    // 모든 제품 목록을 db에서 가져옴
    const products = await this.productModel.findAll();

    return products;
  }

  // 제품 정보 업데이트 시 사용함.
  async setProduct(productId, toUpdate) {
    // toUpdate 객체에서 하기 프로퍼티들 값을 추출함. 물론, 해당 프로퍼티가 toUpdate 객체에 없다면, undefined임.
    const title = toUpdate.title;
    const shortDescription = toUpdate.title;
    const detailDescription = toUpdate.detailDescription;
    const image = toUpdate.image;
    const price = toUpdate.title;

    // 우선 해당 id의 제품이 db에 있는지 확인
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 반환 -> 자동으로 에러 미들웨어로 넘어감.
    if (!product) {
      throw new Error('해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.');
    }

    // toUpdate 객체에 title 프로퍼티가 있었다면, 이 값으로 db를 업데이트함. 없으면 ,넘어감.
    if (title) {
      product = await this.productModel.update({
        productId,
        update: { title },
      });
    }

    // toUpdate 객체에 shortDescription 프로퍼티가 있었다면, 이 값으로 db를 업데이트함. 없으면 ,넘어감.
    if (shortDescription) {
      product = await this.productModel.update({
        productId,
        update: { shortDescription },
      });
    }

    // toUpdate 객체에 detailDescription 프로퍼티가 있었다면, 이 값으로 db를 업데이트함. 없으면 ,넘어감.
    if (detailDescription) {
      product = await this.productModel.update({
        productId,
        update: { detailDescription },
      });
    }

    // toUpdate 객체에 image 프로퍼티가 있었다면, 이 값으로 db를 업데이트함. 없으면 ,넘어감.
    if (image) {
      product = await this.productModel.update({
        productId,
        update: { image },
      });
    }

    // toUpdate 객체에 price 프로퍼티가 있었다면, 이 값으로 db를 업데이트함. 없으면 ,넘어감.
    if (price) {
      product = await this.productModel.update({
        productId,
        update: { price },
      });
    }

    return product;
  }

  async getProductData(productId) {
    // mongodb ObjectId로 제품을 찾음 (product-model.js 파일의 설명 참고)
    const product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 반환 -> 자동으로 에러 미들웨어로 넘어감.
    if (!product) {
      throw new Error('해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.');
    }

    return product;
  }

  async deleteProductData(productId) {
    // mongoose는 deleteOne을 하면, 삭제 성공 시 {deletedCount: 1} 객체를, 실패시 {deletedCount: 0} 객체를 반환함.
    const { deletedCount } = await this.productModel.deleteById(productId);

    // 삭제에 실패한 경우, 에러 반환 -> 자동으로 에러 미들웨어로 넘어감.
    if (deletedCount === 0) {
      throw new Error(`${productId} 제품의 삭제에 실패하였습니다`);
    }

    // 삭제에 성공한 경우
    return { result: 'success' };
  }
}

const productService = new ProductService(productModel);

export { productService };
