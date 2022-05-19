import 'dotenv/config';
import { app } from './src/app';

const port = process.env.PORT;

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. http://localhost:${port}`);
});
