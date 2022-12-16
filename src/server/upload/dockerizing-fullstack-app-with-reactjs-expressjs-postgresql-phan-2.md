#### Chào mọi người, lại là mình đây, hôm nay chúng ta cùng nhau hoàn thành nốt "Như thế nào để kết hợp reactjs, expressjs, postresql và docker trong một ứng dụng ?". Nào hãy theo dõi bài viết này nhé :pray:
# 1. Chuẩn bị
Vẫn như lần trước các bạn nhé :D (https://viblo.asia/p/dockerizing-fullstack-app-with-reactjs-expressjs-postgresql-phan-1-maGK74zMZj2)
# 2. Tiến hành
Hôm nay chúng ta sẽ làm 2 phần còn lại là `server` và `database`.

#### database
Mình sẽ tiến hành khởi tạo `database` sử dụng hệ quản trị `PostgreSQL` trước nhé.

Đầu tiên chúng ta vào thư mục `database` và bắt đầu tạo các file cần thiết.

Tạo file `table.sql` để khởi tạo table
```sql
CREATE TABLE public.products (
  id bigserial NOT NULL,
  name varchar(128) NOT NULL
);
```

Tạo file `testdata.sql` để tạo các dữ liệu
```sql
START TRANSACTION;

-- Set sequence
SELECT setval('products_id_seq', 10000);

DELETE FROM products;

INSERT INTO products
(id, name)
VALUES
(1, 'Iphone X 64G'),
(2, 'Iphone 8 plus 64G'),
(3, 'Samsung Galaxy Note 9 128GB');

COMMIT;
```

Tạo file `script.sh` chứa các đoạn lệnh
```bash
#!/bin/sh

if [ "$1" == "create-db" ]; then
    docker exec -it app-db dropdb -U postgres management-app
    docker exec app-db createdb -U postgres management-app
elif [ "$1" == "create-table" ]; then
    docker cp ./table.sql app-db:/table.sql
    docker exec -it app-db psql -U postgres -d management-app -f ./table.sql
elif [ "$1" == "insert-testdata" ]; then
    docker cp ./testdata.sql app-db:/testdata.sql
    docker exec -it app-db psql -U postgres -d management-app -f ./testdata.sql
elif [ "$1" == "check" ]; then
    docker exec -it app-db psql -U postgres -d management-app -c "SELECT * FROM products"
else
    echo "syntax error."
fi
```

Sau đó cập nhật file `docker-compose.yml`
```yaml
  db:
    image: postgres:9.6
    container_name: app-db
    volumes:
      - db-data:/var/lib/postgresql
    ports:
      - 15432:5432
    networks:
      - backend_network
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=management-app
volumes:
  db-data:
```

Run nhẹ cái database này bằng chạy lệnh docker-compose xem nó lên gì nhé :sunglasses:
```
docker-compose up db
```
Kết quả
![](https://images.viblo.asia/5eb0de0b-91d1-419a-a1dd-76f6e0c4cdb4.PNG)


Tiếp tục tiến hành lần lượt các lệnh trong file `script.sh`
```sh
cd database/
./script.sh create-db
./script.sh create-table
./script.sh insert-testdata
./script.sh check
```

Kết quả
![](https://images.viblo.asia/909ecb74-877a-40b7-aec1-6254789c536f.PNG)

Vậy là dữ liệu đã được thêm vào như đúng mong đợi :+1:


#### server
Đầu tiên chúng ta vào thư mục `server` và bắt đầu tạo các file cần thiết.

Tạo file `package.json`
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "pg": "^7.11.0"
  },
  "devDependencies": {
    "nodemon": "^1.19.1"
  },
  "scripts": {
    "start": "nodemon src/app.js"
  }
}
```

Tạo file `src/app.js`. Ở đây mình chỉ cấu hình node đơn giản thôi nhé :grinning:
```javascript
const express = require('express')
const cors = require('cors')

const productRouter = require('./productRouter')

const app = express()

app.use(
  cors({
    credentials: true,
    origin: `http://localhost:6969`,
  }),
)

app.use('/api/products', productRouter)

app.get('/', (req, res) => res.send('DaiNT2 - Hello server!'))

app.listen(9696, () => console.log(`Server listening on port 9696`))
```

Tiếp theo là tạo file `src/connect.db.js` để tạo một kết nối với database PostgreSQL
```javascript
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
})

module.exports = pool
```

Tạo file `src/productController.js` để thao tác với database
```javascript
const pool = require('./connect.db')

module.exports.findAll = (req, res, next) => {
  const sql = 'SELECT * FROM products'
  pool.query(sql, (err, response) => res.send(response.rows))
}
```

Tạo file `src/productRouter.js` để tạo liên kết route với controller
```javascript
const express = require('express')
const router = express.Router()

const { findAll } = require('./productController')

router.get('/', findAll)

module.exports = router
```

Tạo file `Dockerfile` để lên kịch bản build `image` cho `server`
```bash
FROM node:10-alpine

RUN mkdir /usr/app
WORKDIR /usr/app
COPY package.json .
RUN yarn
COPY . .

CMD ["yarn", "start"]
```

Sau đó cập nhật file `docker-compose.yml` (Lưu ý khi sử dụng window thì phải setting `Shared Drives` để có thể sử dụng volumes nhé)
```yaml
version: '3.3'
services:
  client:
    build:
      context: ./client
    container_name: app-client
    volumes:
      - ./client/src:/usr/app/src
    ports:
      - 6969:6969
    networks:
      - frontend_network
    environment:
      - CHOKIDAR_USEPOLLING=true
  server:
    build:
      context: ./server
    container_name: app-server
    volumes:
      - ./server/src:/usr/app/src
    ports:
      - 9696:9696
    depends_on:
      - db
    networks:
      - backend_network
    environment:
      - CHOKIDAR_USEPOLLING=true
      - DATABASE_CONNECTION_STRING=postgresql://postgres:password@db:5432/management-app
  db:
    image: postgres:9.6
    container_name: app-db
    volumes:
      - db-data:/var/lib/postgresql
    ports:
      - 15432:5432
    networks:
      - backend_network
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=management-app
volumes:
  db-data:
networks:
  frontend_network:
  backend_network:
```
Cuối cùng là run nhẹ cái app (toàn bộ) này bằng chạy lệnh docker-compose xem tất cả đã ổn áp chưa nhé :sunglasses:
```bash
docker-compose up
```
Kết quả
![](https://images.viblo.asia/81b68188-cedf-4117-ae70-eb5e2ab6211d.PNG)

Lên hết rồi đó. Giờ ta truy cập vào `http://localhost:6969/`

![](https://images.viblo.asia/458310a4-2b1d-45da-bcbb-1eeddf23330f.PNG)

Sự kết hợp đã thành công như mong đợi :100:. Quẩy lên nào anh em, hehe :laughing:

# 3. Kết luận
Tổng kết qua 2 phần thì chúng ta đã dựng thành công `Dockerizing fullstack app with reactjs, expressjs, postgresql` . Nhìn chung thì phần source code mình viết ở trên cũng không có gì khó hiểu cho các bạn đã biết cơ bản. Cảm ơn bạn đã đọc bài viết của mình, hi vọng nó có thể giúp phần nào đó giúp các bạn sớm trở thành một lập trình viên fullstack nhé :pray: :stuck_out_tongue_winking_eye:

Link repo tại đây https://github.com/daint2git/viblo.asia/tree/master/fullstack-reactjs-expressjs-postgresql-docker