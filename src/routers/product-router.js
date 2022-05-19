import is from '@sindresorhus/is';
import { Router } from 'express';
import { productService } from '../services/product-service';

const productRouter = Router();

productRouter.post('/product', async (req, res, next) => {
  try {
    // 프론트 단에서 api 요청하면서 application/json 설정을 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const category = req.body.category;
    const shortDescription = req.body.shortDescription;
    const detailDescription = req.body.detailDescription;
    const image = req.body.image;
    const price = req.body.price;

    // 위 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      title,
      category,
      shortDescription,
      detailDescription,
      image,
      price,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/productlist', async function (req, res, next) {
  try {
    // 전체 제품 목록을 얻음
    const products = await productService.getProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/products/:productId', async function (req, res, next) {
  try {
    // URI로부터 params를 얻음
    const productId = req.params.productId;

    // 특정 id의 제품 데이터를 얻음
    const productData = await productService.getProductData(productId);

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
});

// 데이터 정보 수정
productRouter.patch('/products/:productId', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request)의 body 에서 데이터 가져오기. 물론 해당 프로퍼티가 없다면, undefined임
    const productId = req.params.productId;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const detailDescription = req.body.detailDescription;
    const image = req.body.image;
    const price = req.body.price;

    // toUpate 객체를 만듦.
    const toUpdate = {
      title,
      category,
      shortDescription,
      detailDescription,
      image,
      price,
    };

    // 제품 정보를 업데이트함.
    const updatedProduct = await productService.setProduct(productId, toUpdate);

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 제품 데이터 삭제
productRouter.delete('/products/:productId', async function (req, res, next) {
  try {
    // params로부터 productId를 추출함.
    const productId = req.params.productId;

    // 서비스 층의 함수를 이용하여 제품 데이터를 삭제함.
    const deleteResult = await productService.deleteProductData(productId);

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
