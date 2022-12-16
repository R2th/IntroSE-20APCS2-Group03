Trong bài viết này, chúng ta sẽ cùng khám phá cách để test ứng dụng **[ExpressJS](https://expressjs.com/)** + **[Sequelize](https://sequelize.org/master/)** không gây rủi ro với database của bạn, đảm bảo bạn có đủ dữ liệu để test và không chỉ bao gồm các cases thông thường mà còn các cases khác nữa.

Hãy cùng bắt tay vào xây dựng test cho ứng dụng của mình nào.
# ExpressJS + Sequelize
Đầu tiền, chúng ta sẽ bắt đầu tạo một dự án Sequelize mới. Trong ví dụ này, tôi sẽ sử dụng 2 phiên bản Node v14.15.0 và MySQL 5.7.29, nó có thể hoạt động tốt trên bất cứ database nào.

Chúng ta sẽ cài đặt **Sequelize**, **ExpressJS** và **[sequeline-cli ](https://github.com/sequelize/cli)** như một công cụ chính để phát triển ứng dụng này.

```CS
npm init
npm install --save sequelize
npm install --save mysql2
npm install --save express
```

<br>

Ngoài ra, chúng ta sẽ cài thêm tools **[mocha](https://mochajs.org/)** và **[chai](https://www.chaijs.com/)** cho việc  tesing và assertion, và **[supertest](https://www.npmjs.com/package/supertest)** như một lựa chọn phổ biến nhất để phục vụ cho việc test của chúng ta.

```CS
npm install --save mocha
npm install --save supertest
npm install --save chai
```

<br>

Tiếp theo, chúng ta sẽ cài đặt một số packages hữu dụng liên quan để cài đặt như: [**dotenv**](https://www.npmjs.com/package/dotenv), [**cross-env**](https://www.npmjs.com/package/cross-env) hay [**body-parser**](https://www.npmjs.com/package/body-parser).

```CS
npm install --save dotenv
npm install --save-dev cross-env
npm install --save-dev body-parser
```
<br>
Tổng hợp những pakage dependencies như sau:

`package.json`
```JSON
"dependencies": {
    "chai": "^4.3.4",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mocha": "^8.3.2",
    "mysql2": "^2.2.5",
    "sequelize": "^6.5.1",
    "supertest": "^6.1.3"
  },
  "devDependencies": {
    "body-parser": "^1.19.0",
    "cross-env": "^7.0.3"
  }
```
<br>
Sau khi cài đặt các package cần thiết, chúng ta sẽ tiến hành khởi tạo ứng dụng với command:

```
npx sequelize-cli init
```

# Unit tests
## Cấu hình Database

Bắt đầu tiến hành tạo và cấu hình kết nối tới database. Trong ví dụ này, chúng ta sẽ thiết lập 3 bộ cấu hình database cho 3 môi trường: production, development và một cấu hình động được tạo mỗi khi bạn chạy tests.

> Tại sao chúng ta cần viết cấu hình cho môi trường development và testing riêng mặc dù nó có thể giống nhau? Trong thực tế thì khi thực hiện làm unit tests, tôi thấy rằng mỗi khi tôi chạy tests, nếu tôi sử dụng chung database cho testing và development, tôi có thể sẽ mất quyền kiểm soát dữ liệu hoặc mất hoàn toàn dữ liệu trên development. Vì vậy tôi muốn bảo toàn dữ liệu của mình mỗi khi chạy tests.

<br>

Sau khi cài đặt ứng dụng với sequelize-cli, chúng ta sẽ tìm đến file `config/config.json`. Thực hiện chỉnh sửa file này thành `config/config.js` và cấu hình như sau: 
```JS
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_DEV_USER,
    password: process.env.MYSQL_DEV_PASSWORD,
    database: process.env.MYSQL_DEV_DB_NAME,
    host: process.env.MYSQL_DEV_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    database: process.env.MYSQL_TEST_DB_NAME,
    host: process.env.MYSQL_TEST_HOST,
    port: process.env.MYSQL_TEST_PORT,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
};
```
<br>
Để sử dụng file config.js thay thế file JSON, chúng ta cần cập nhật file `models/index.js`, thay đổi đường dẫn load file và các biến const được định nghĩa sẵn.

```JS
const config = require(__dirname + ‘/../config/config.js’)[env];
```
<br>

Chúng ta có thể tạo database ngay với sequelize-cli.
```
npx sequelize-cli db:create
```

## Tạo models
Chúng ta sẽ giả sử rằng chúng ta đang tạo sản phẩm cho một ứng dụng quản lý kho. Thông tin sản phẩm sẽ có name, price, stock và minStock. 

Sau khi định nghĩa models, chúng ta thử chạy migration để tạo ra các table với: 
```
npx sequelize-cli model:generate --name Product --attributes name:string,price:double,stock:integer,minStock:integer
```
<br>
Tiếp đói, 2 file mới được tạo ra lần lượt là migration và model. Bây giờ chúng ta sẽ chạy migration để tạo table `productions` trong database.

```
npx sequelize-cli db:migrate
```
<br>
Chúng ta nên thêm một số dữ liệu trực tiếp từ database để một số dữ liệu từ môi trường development khác so với môi trường testing.

## Tạo Endpoint cơ bản
Với database đã được tạo, chúng ta sẽ tạo thêm 1 endpoint cơ bản để lấy dữ liệu sản phẩm và đưa ra cảnh báo nếu stock nhỏ hơn minStock.

Để làm điều này, đầu tiên chúng ta sẽ tạo 3 files quan trọng. 

- **routes/index.js** - điều hướng tới endpoint
- **app.js** - là file ban đầu của hệ thống
- **controllers/products.js** - xử lý và lấy dữ liệu

<br>
Cụ thể với những đoạn code trong ví dụ dưới đây.

<br>

`app.js`
```JS
equire('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.APP_PORT || 3000;

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());

routes(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = {
  app,
};
```

<br>

`routes/index.js`
```JS
const productsController = require('../controllers/products');

module.exports = (app) => {
  app.get('/products', productsController.getProducts);
};
```

<br>

`coontrollers/products.js`
```JS
const { Product } = require('../models');

const getProducts = async (req, res) => {
  const filters = req.body;
  try {
    const data = await Product.findAll(filters);
    const products = data.map(({ dataValues: product }) => {
      product.shouldRestock = 'no';
      if (product.stock < product.minStock) {
        product.shouldRestock = 'yes';
      }
      if (product.stock === product.minStock) {
        product.shouldRestock = 'shortly';
      }
      return product;
    });
    console.log(products);
    return res
      .json({
        status: 'success',
        data: products,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return res
      .json({
        status: 'error',
        error: error.message,
      })
      .status(400);
  }
};

exports.getProducts = getProducts;
```

Tới đây, bạn đã có thể kiểm tra kết quả thoogn qua trình duyệt web hoặc bất kì tools nào như Postman, REST Client. Chúng sẽ tạo ra một request `GET` tới http://localhost:3000/products. 

```JSON
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Item 1",
      "price": 100,
      "stock": 20,
      "minStock": 10,
      "createdAt": "2021-03-19T05:51:45.709Z",
      "updatedAt": "2021-03-19T05:51:45.709Z",
      "shouldRestock": false
    }
  ]
}
```

## Viết Unit tests với Seeders
Điều gì sẽ xảy ra nếu chúng ta muốn kiếm tra hoạt động của `shouldRestock`, nhưng lại không muốn thay đổi bất cứ dữ liệu gì trên development database. Để bảo toàn được dữ liệu gốc, chúng ta có thể sử dụng **[sequelize-seeds](https://sequelize.org/master/manual/migrations.html#creating-the-first-seed)** với testing database và chỉ sử dụng cho unit tests.

Bắt đầu tạo testing database với
```
npx cross-env NODE_ENV=test npx sequelize-cli db:create
```

<br>

Chúng ta sẽ viết một seeder để tạo dữ liệu cho `Products` 

```
npx sequelize-cli seed:generate --name test-products
```

<br>

Sau khi chạy command này, một file mới sẽ được tạo trong thư mục `seeders/`. Chúng ta sẽ move nó tới `seeders/test` để tách riêng biệt từng loại seeder.

Sau đó chúng ta sẽ tạo một seeder đơn giản, trong trường hợp này, chúng ta cần 3 sản phẩm khác nhau bao gồm các trường hợp sau:

1. Sản phẩm có stock lớn hơn minStock.
2. Sản phẩm có stock nhỏ hơn minStock.
3. Sản phẩm có stock bằng với minStock.

<br>

Dưới đây là ví dụ vể seeder:
```JS
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Products',
      [
        {
          id: 1,
          name: 'Guitar',
          price: 120,
          stock: 20,
          minStock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Piano',
          price: 230,
          stock: 1,
          minStock: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Flute',
          price: 80,
          stock: 4,
          minStock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Products', null, {}),
};
```

<br>

Việc tiếp theo của chúng ta là tạo một đoạn test đơn giản với product controller testing
**`tests/controller/products.test.js`** .

Trong ví dụ dưới đây, chúng ta sẽ tạo ra 3 đối tượng khác nhau với dữ liệu được mong đợi, và các test case của chúng ta sẽ chưa 3 đối tượng đã được đề cập trước đó.

```JS
const chai = require('chai');
const request = require('supertest');
const { server } = require('../../app');

const { expect } = chai;

const shouldNotRestockProduct = {
  id: 1,
  name: 'Guitar',
  price: 120,
  stock: 20,
  minStock: 10,
  createdAt: '2021-02-08T00:00:00.000Z',
  updatedAt: '2021-02-08T00:00:00.000Z',
  shouldRestock: 'no',
};
const shouldRestockProduct = {
  id: 2,
  name: 'Piano',
  price: 230,
  stock: 1,
  minStock: 2,
  createdAt: '2021-02-08T00:00:00.000Z',
  updatedAt: '2021-02-08T00:00:00.000Z',
  shouldRestock: 'yes',
};
const shouldShortlyStockProduct = {
  id: 3,
  name: 'Flute',
  price: 80,
  stock: 4,
  minStock: 4,
  createdAt: '2021-02-08T00:00:00.000Z',
  updatedAt: '2021-02-08T00:00:00.000Z',
  shouldRestock: 'shortly',
};

describe('Fetch products test', async () => {
  it('Shows all stock states', async () => {
    const { body, status } = await request(server).get('/products');
    const { data } = body;
    expect(status).to.equal(200);
    expect(data).to.deep.include(shouldNotRestockProduct);
    expect(data).to.deep.include(shouldRestockProduct);
    expect(data).to.deep.include(shouldShortlyStockProduct);
  });
});
```

<br>

Bước cuối cùng chúng ta sẽ thực hiện cấu hình cho test script với các tác vụ sau:

1. Xóa testing database trước đó.
2. Tạo mới testing database.
3. Seed testing database.
4. Chạy tests.

Chúng ta sẽ cập nhật lại command bên trong `scripts` tại file `package.js`:

```JSON
"test": "cross-env NODE_ENV=test mocha ./tests/*",
"pretest": "cross-env NODE_ENV=test npm run db:reset",
"db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all --seeders-path ./seeders/test",
"db:create:test": "cross-env NODE_ENV=test npx sequelize-cli db:create"
```

## Chạy tests

Cuối cùng, chúng ta có chạy `npm test` để chạy kiểm tra các test case đã hoạt động đúng chưa. 
Nếu mọi thứ suôn sẻ, bạn sẽ nhận được phản hồi như dưới đây:

```
Sequelize CLI [Node: 14.3.0, CLI: 6.2.0, ORM: 6.5.1]

Loaded configuration file "config/config.js".
Using environment "test".
Database express_test dropped.
npx: installed 81 in 4.619s

Sequelize CLI [Node: 14.3.0, CLI: 6.2.0, ORM: 6.5.1]

Loaded configuration file "config/config.js".
Using environment "test".
Database express_test created.
npx: installed 81 in 4.475s

Sequelize CLI [Node: 14.3.0, CLI: 6.2.0, ORM: 6.5.1]

Loaded configuration file "config/config.js".
Using environment "test".
== 20210319061512-create-product: migrating =======
== 20210319061512-create-product: migrated (0.079s)

npx: installed 81 in 5.015s

Sequelize CLI [Node: 14.3.0, CLI: 6.2.0, ORM: 6.5.1]

Loaded configuration file "config/config.js".
Using environment "test".
== 20210319063732-test-products: migrating =======
== 20210319063732-test-products: migrated (0.011s)


> express-tests@1.0.0 test /var/www/html/express-tests
> cross-env NODE_ENV=test mocha ./tests/*



  1 passing (77ms)
```

## Kết luận

Hy vọng sau khi thực hiện các bước hướng dẫn trên, bạn có thể tạo cho mình một ứng dụng express với unit tests và seeders. Nếu bạn có bất kì thắc mắc gì về project vui lòng đóng góp để tôi có thể hoàn thiện hơn cho bài viết của mình.

Nếu thấy bài viết này hữu ích => tiếc gì 1 follow :D