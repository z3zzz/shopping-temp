import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

class ProductModel {
  // 제품의 이름(타이틀)로 제품을 찾음
  async findByTitle(title) {
    const product = await Product.findOne({ title });
    return product;
  }
  
  // 제품의 mongodb ObjectId로 제품을 찾음 (string 값으로 찾으면, 자동으로 mongoose가 ObjectId로 변환하여 찾아줌)
  // 즉, ObjectId('6278ad2c927a0d0520ff6267') 말고, 그냥 '6278ad2c927a0d0520ff6267' 문자열로 찾으면 됨.
  async findById(productId) {
    const product = await Product.findOne({ _id: productId });
    return product;
  }

  // 특정 카테고리(남자 옷 등)에 속한 모든 제품을 가져옴 -> 배열을 반환함
  async findAllByCategory(category) {
    const products = await Product.find({ category });
    return products;
  }

  // 제품 데이터를 추가함
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }
  
  // 모든 제품 데이터를 가져옴 -> 배열을 반환함
  async findAll() {
    const products = await Product.find({});
    return products;
  }

  // 제품 데이터를 업데이트함. 
  // returnOriginal: false를 하면, 오리지널이 아닌, 즉, 업데이트된 이후의 최신 데이터를 반환함.
  async update({productId, update}) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }
  
  // 제품 데이터를 삭제함.
  async deleteById(productId) {
    const result = await Product.deleteOne({ _id: productId });
    return result;
  }
}

// 클래스를 가지고 객체로 만듦
const productModel = new ProductModel();

// 객체를 export함
export { productModel };