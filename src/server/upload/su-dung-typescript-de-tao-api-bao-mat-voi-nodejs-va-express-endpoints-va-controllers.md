Chào các bạn, trong loạt bài về **Sử dụng TypeScript để viết API bảo mật với Node.js và Express.**, mình xin bước sang bài thứ 3 về việc tạo **Tạo Endpoints**

### Tổng quan các bài viết
1. [Giới thiệu và cài đặt ban đầu](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-gioi-thieu-va-cai-dat-ban-dau-RQqKL99pZ7z)
2. [Tạo Data Model và Services](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-tao-data-models-va-services-RnB5pxOb5PG)
3. **Tạo Endpoints**
4. [Bảo mật API](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-bao-mat-api-Do754bXQZM6)
5. Quản lý quyền

> :warning: Các bạn chú ý đọc lần lượt từng bài để nắm rõ nội dung loạt bài nhé.


-----


# Lời xin lỗi ngọt ngào
Đầu tiên mình phải xin lỗi các bạn vì trong bài viết đầu tiên mình có nhầm một chút trong cách đặt tên file. Không có gì đáng nghiêm trọng cả, các bạn tìm lại cho mình toàn bộ những nơi có ghi là **endtry** và đổi lại thành **entry** giúp mình nhé. Quan trọng khi xong thì các bạn phải chạy lại câu lệnh sau để bundle lại:
```
npm run webpack
```
Mình đã sửa lại bài viết, nên các bạn mới đọc sẽ không gặp vấn đề này có thể bỏ qua. Có gì khúc mắc các bạn comment xuống dưới mình sẽ giải đáp. :sweat_smile:

-----
Let's GOOO

Trong bài này, chúng ta sẽ xem cách sử dụng Typescript và Express để tạo modular controllers cho API.

Trước hết, chúng ta sẽ tạo các endpoint truy cập tới các `items` để thao tác CRUD tới chúng (trong bài trước mình có nói thay vì sử dụng MongoDB, mình sẽ sử dụng một mảng các item là các đồ ăn được lưu trong mảng ~ RAM).

# Tạo Express Controllers sử dụng TypeScript
Thay vì định nghĩa các route trong file `entrypoint.ts`, các bạn sẽ tạo một Express router dưới dạng một module riêng biệt với tất cả các chi tiết xử lý route của bạn và import nó để sử dụng bất cứ khi nào cần.

Trong thư mục `/src/items` , tạo file `items.router.ts`:
```php
touch src/items/items.router.ts
```

Khi một ứng dụng client gửi request tới server của bạn, Express sẽ điều hướng request đó sang cho các function được thiết kế để xử lý (`GET` hoặc `POST`). Như vậy, mỗi một function này sẽ định nghĩa một route handle riêng - cái được hiểu là *controller*

Trong file `items.router.ts` sẽ có các phần sau :
```php
/**
 * Required External Modules and Interfaces
 */

/**
 * Router Definition
 */

/**
 * Controller Definitions
 */

// GET items/

// GET items/:id

// POST items/

// PUT items/

// DELETE items/:id
```
Dưới phần `Required External Modules and Interfaces`:
```php
/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item } from "./item.interface";
import { Items } from "./items.interface";
```
Ở đây, bạn đã import package `express` và 2 cái internal type definitions của nó (`Request` và `Response` ) sử dụng trong các function callback ở controller.

Bạn cũng cần import các function trong module `items.service` dưới dạng object `ItemService` (tránh trùng lặp tên).

Cuối cùng, cần import 2 interface `Item` và `Items` dùng để nhập các value trả về từ các function của object `ItemService`

Tiếp theo, chúng ta sẽ định nghĩa một Express router ở phần `Router Definition`:
```php
/**
 * Router Definition
 */

export const itemsRouter = express.Router();
```

Ở đây, bạn sử dụng class `express.Router` mục đích để tạo ra để tạo ra một gói modular cho các route handler. Một Express router instance có thể gọi là "app nhỏ" vì nó hoạt động như một middleware và hệ thống route hoàn chỉnh, rất cần thiết cho việc tổ chức kiến trúc của dự án Node.js của bạn thành các thành phần có thể dễ dàng kiểm tra và tái sử dụng.

Song song với đó là bạn sẽ export `itemsRouter` ra luôn, mặc dù các thuộc tính routing của nó chưa được định nghĩa. Nhưng bất kì thuộc tính nào mà bạn định nghĩa sau đó trong module trên object `itemsRouter` sẽ có thể được truy cập bởi bất kì module nào import nó.

Trong phần `Controller Definitions`, bạn sẽ định nghĩa các function tương ứng với một vài chức năng cơ bản CRUD như sau :
```php
/**
 * Controller Definitions
 */

// GET items/

itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Items = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    res.status(200).send(item);
  } catch (e) {
    res.status(404).send(e.message);
  }
});


// POST items/

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body.item;

    await ItemService.create(item);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/

itemsRouter.put("/", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body.item;

    await ItemService.update(item);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
```

Rất dễ hiểu phải không nào. Controller sẽ ủy thác phần lớn các thao tác logic với DB cho các function trong `ItemService`. Cái hay ở đây là nếu các bạn muốn sử dụng MongoDB hoặc PostgreSQL thì chỉ cần định nghĩa lại logic ở `service`.

Để hoàn thiện nốt phần controller này, các bạn sẽ đưa vào trong `itemsRouter`. Mở file **`entrypoint.ts`** (trước đó là endtrypoint.ts :laughing:) lên và import router bên dưới phần `Required External Modules`:
```php
/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";

dotenv.config();
```

Tiếp theo, cũng trong file đó, phần ` App Configuration`:
```php
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);
```

Phương thức `app.use()` có thể lấy tham số đầu vào là `path` và `callback` để đại diện cho một hoặc nhiều middleware function. Ở đây, Express app sẽ gọi tới các function của middleware `itemsRouter` (ví dụ khi gọi tới /items)

# Test API Endpoints
Với controller trên, chúng ta sẽ thực hiện test từng function.
> :warning:  Đừng quên mở 2 terminal riêng biệt và chạy các câu lệnh sau nhé:
> 
> npm run webpack 
> 
> npm start

OK. Mở terminal thứ 3 lên và thử nào:

### Lấy toàn bộ menu
```php
curl http://localhost:7000/items -i
```
> flag -i chỉ là dể thêm phần protocol header trong output

Nếu response là `HTTP/1.1 200 OK` và output gồm 3 object JSON đã khai báo ở file `items.service.ts` thì OK.

Hoặc các bạn có thể check trực tiếp bằng chrome bằng URL `http://localhost:7000/items` sẽ ra kết quả như sau:
![](https://images.viblo.asia/470708e2-c896-461e-9fcd-d4185940b820.png)
> :grinning: Để có kết quả như trên các bạn cài thêm extension trong chrome store: JSON FORMATTER nhé.

### Lấy món số 1
```php
curl http://localhost:7000/items/1 -i
```
Output trên terminal cũng ra `HTTP/1.1 200 OK` và trả về item đầu tiên là OK. Các bạn cũng có thể check bằng trình duyệt bằng URL `http://localhost:7000/items/1`.

### Thêm 1 món ăn
```php
curl -X POST -H 'Content-Type: application/json' -d '{
  "item": {
    "name": "Salad",
    "price": 4.99,
    "description": "Fresh",
    "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
  }
}' http://localhost:7000/items -i
```
Output: `HTTP/1.1 201 Created`

Xác nhận lại xem đã `create` thành công chưa nhé
```php
curl http://localhost:7000/items -i
```

### Update tên món ăn
```php
curl -X PUT -H 'Content-Type: application/json' -d '{
  "item": {
    "id": 2,
    "name": "Spicy Pizza",
    "price": 5.99,
    "description": "Blazing Good",
    "image": "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  }
}' http://localhost:7000/items -i
```
Output: `HTTP/1.1 200 OK`

Xác nhận lại kết quả nhé

### Xóa món ăn số 2
```php
curl -X DELETE http://localhost:7000/items/2 -i
```
Output: `HTTP/1.1 200 OK`

### Xử lý Handle Errors
Đơn giản chúng ta sẽ xử lý những request từ client gửi tới nhưng không map với bất kì route nào. Về phần này, mình mới đọc qua một phần khá hay về việc họ xử lý thông qua `domain`. Để nhanh gọn mình sử dụng class `HttpException` gói gọn các lỗi liên quan đến các HTTP requests và middleware function, giúp bạn quản lý lỗi chính xác.

Các bạn tạo thêm thư mục `common`:
```php
mkdir src/common
```
Trong thư mục đó tạo thêm file để định nghĩa class `HttpException`:
```php
touch src/common/http-exception.ts
```
Nội dung file :
```php
export default class HttpException extends Error {
  statusCode: number;
  message: string;
  error: string | null;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}
```

Tiếp theo sẽ tạo thêm một thư mục `middleware`:
```php
mkdir src/middleware
```
Trong đó, tạo thêm file
```
touch src/middleware/error.middleware.ts
```
mục đích để xử lý các request lỗi.

Nội dung file `error.middleware.ts`:
```php
import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message =
    error.message || "It's not you. It's us. We are having some problems.";

  response.status(status).send(message);
};
```

Các function này mang ý nghĩa là: khi các bạn nhận một error kiểu HttpException thì sẽ trả về một error thích hợp dựa trên thuộc tính của nó. Nếu 2 thuộc tính `error.status` và `error.message ` được định nghĩa, nó sẽ được bao gồm trong response. Còn không sẽ mặc định lỗi `500 Internal Server Error `

Điều quan trọng cần lưu ý là bạn phải cung cấp 4 tham số để xác định hàm ở đây là hàm xử lý error-handling middleware. Sau đó cần xác định object `next` để duy trì chữ ký error-handling ngay cả khi bạn không sử dụng nó. Còn không, Express sẽ coi object `next` như một middleware function thông thường và không xử lý bất kì error nào.

Chúng ta cũng cần xét đến điều kiện của router mà không tồn tại. Nó không được coi là lỗi trong Express. Giả sử một mặt hàng hoặc một trang không tồn tại thì cần thông báo chính xác với khách hàng (chứ nó không phải là một errorHandle).

Ví dụ :
```php
curl http://localhost:7000/employees/ -i
```

Output:
```php
HTTP/1.1 404 Not Found
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Content-Security-Policy: default-src 'none'
Content-Type: text/html; charset=utf-8
Content-Length: 149
Date: Thu, 30 Jan 2020 14:51:01 GMT
Connection: keep-alive
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /employees/</pre>
</body>
</html>
```

Để customize nội dung hiển thị, bên trong src/middleware, bạn hãy tạo thêm một file `notFound.middleware.ts`:
```php
touch src/middleware/notFound.middleware.ts
```

Nội dung như sau :
```php
import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const message = "Resource not found";

  response.status(404).send(message);
};
```

Cuối cùng, cần đưa nó vào trong Express app. Mở file `entrypoint.ts`, thêm các phần như sau:
```php
/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";

dotenv.config();
```

Và 
```php
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);

app.use(errorHandler);
app.use(notFoundHandler);
```

Các `errorHandler` middleware function cần phải được đặt sau cùng, dưới tất cả các controller function. Tuy vậy `errorHandler` lại ko bắt được lỗi 404 nên sẽ cần thêm middleware function `notFoundHandler`.

Trước khi test lần các bạn cần tắt server đi và bundle lại webpack:
```
npm run webpack
npm start
```

Thử test với câu lệnh dưới đây:
```php
curl http://localhost:7000/employees/ -i
```
Output: `Resource not found`

OK. Vậy là đã xong. Khá dài.

Cảm ơn các bạn đã đọc bài của mình. Bài viết có thể khó hiểu hoặc sai sót, mong các bạn góp ý. Hẹn các bạn ở bài viết tiếp theo về **Bảo mật API**