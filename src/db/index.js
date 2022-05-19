import mongoose from 'mongoose';

const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL)
);
db.on('error', (error) =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error)
);

// product-model.js 에서 export 하는 것을 그대로 다시 export함.
// 나중에 import할 때, 경로를 짧게 쓸 수 있게 해 줌
// 예시) './db/models/product-models' 대신, './db' 로 짧아짐 (product-service.js) 파일 참조
export { productModel } from './models/product-model';
