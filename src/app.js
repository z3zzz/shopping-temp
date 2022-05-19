import express from 'express';
import { productRouter } from './routers/product-router';

const app = express();

// 프론트에서 json 파일을 보내면, req.body에 자동으로 객체 형태로 데이터가 들어가도록 함.
app.use(express.json());

// 각 경로 URI( '/product/add' 등) 페이지에서, 폴더(views/product-add)의 index.html을 띄움
app.use('/product/add', express.static('views/product-add'));
app.use('/product/list', express.static('views/product-list'));

// 기본 '/' 페이지
app.get('/', (req, res) => {
  res.send(`
    쇼핑몰에 어서 오세요!
    /product/add -> 제품 추가
    /product/list -> 제품목록 보기
    `);
});

// productRouter의 라우팅을 사용할 수 있게 됨. 단, 앞에 'api'가 붙은 경로로 만들어지게 됨.
// 즉, product-router.js 파일에서 '/product' 면, 실제로는 /api/product 로 요청해야 함.
app.use('api', productRouter);

export { app };
