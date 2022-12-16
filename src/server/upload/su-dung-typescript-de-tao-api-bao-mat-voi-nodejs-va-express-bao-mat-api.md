Chào các bạn, trong loạt bài về **Sử dụng TypeScript để viết API bảo mật với Node.js và Express.**, mình xin bước sang bài thứ 4 về việc tạo **Bảo mật API**

### Tổng quan các bài viết
1. [Giới thiệu và cài đặt ban đầu](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-gioi-thieu-va-cai-dat-ban-dau-RQqKL99pZ7z)
2. [Tạo Data Model và Services](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-tao-data-models-va-services-RnB5pxOb5PG)
3. [Tạo Endpoints](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-endpoints-va-controllers-maGK7qaDlj2)
4. **Bảo mật API**
5. Quản lý quyền

> :warning: Các bạn chú ý đọc lần lượt từng bài để nắm rõ nội dung loạt bài nhé.

Như yêu cầu ban đầu, chỉ có admin hoặc những user mà được ủy quyền hoặc nằm trong role nào đó có rule xác định mới có thể sử dụng một hoặc nhiều chức năng thêm, sửa, xóa item.  Vấn đề này liên quan đến mô hình phân quyền RBAC (Role-Based Access Control) mà mình sẽ nói sơ qua ở bài viết sau. Trong bài này, để đảm bảo thực thi nhanh chóng nhưng vẫn bảo mật, mình sẽ sử dụng dịch vụ của [Auth0](https://auth0.com/) với JWTs để quản lý thông tin đăng nhập của user. 

# Cài đặt Auth0 API
Đầu tiên các bạn hãy tạo một tài khoản [Auth0 Sign Up](https://auth0.com/signup).

Sau đó, nhảy sang tab [APIs](https://manage.auth0.com/?&_ga=2.101438593.1635831820.1581905490-1185533974.1581905490#/apis) ở thanh menu bên trái và nhấn chọn *CREATE API*

Sau đó, điền đầy đủ các thông tin của form.
* **Name**: điền một tên gì đó bất kì, ví dụ: `MenuItemsAPI`
* **Identifier**: `https://menu-item-api.demo.com`
* Để nguyên lựa chọn** signing algorithm** là `RS256`

![](https://images.viblo.asia/f07920f0-8122-431d-a1ca-d78108c17657.png)

**Identifiers** là các unique string để Auth0 phân biệt giữa các API khác nhau. Chúng ta nên sử dụng URL vì chúng tạo điều kiện thuận lợi cho việc tạo các unique string; mặc dù vậy, Auth0 sẽ không bao giờ gọi các URL này.

Cuối cùng nhấn *CREATE*

Tại màn hình của APIs, chọn tab *Quick Start*. Ở trang này, nó sẽ hướng dẫn cài đặt và sử dụng (Vì chúng ta đang sử dụng Node.js nên các bạn nhớ chọn sang box Node.js ở phần code nhé). Để nguyên page đó và chưa vội làm theo hướng dẫn.

![](https://images.viblo.asia/6a3c2a33-a51d-4c13-8012-9f74604795a0.png)

API của bạn cần các cấu hình này để nhận dạng nó với Auth0:  Audience và một Domain value. Các bạn sẽ lưu tất cả thông tin này trong file `.env` như sau :

```php
PORT=7000
AUTH0_ISSUER=https://whatabyte.auth0.com/
AUTH0_AUDIENCE=https://menu-item-api.demo.com
```
`AUTH0_ISSUER` sẽ là giá trị của thuộc tính `audience`, `AUTH0_AUDIENCE` sẽ là giá trị của thuộc tính `issuer` ở tab *Quick Start* như box code trên.
> :warning: Lưu ý: các bạn cần **bỏ** các dấu nháy đơn đi nhé, chỉ lấy string bên trong thôi

`whatabyte` chí là chuỗi tên của Auth0 tenant hay là phần gạch đỏ trong box code trên. Và từ giờ chỗ nào mình có ghi `whatabyte` thì các bạn ngầm hiểu là phải tự thay bằng chuỗi của mình nhé.

# Tạo Authentication Middleware
Để bảo mật endpoint trong Express, chúng ta dựa vào middleware function sẽ được thực thi trước các callback function ở controller xử lý request. Có hai cách:

Cách 1: inject một authorization middleware function trong controller như sau :
```php
itemsRouter.post("/", authorizationFunction, async (req: Request, res: Response) => {
     // bala bala
});
```

Ở đây, authorizationFunction được gọi trước callback, trong đó nó sẽ thực hiện 2 nghiệp vụ sau :
* Nếu nó xác định được rằng user có quyền truy cập vào resource, nó sẽ gọi tới next function trong middleware chain.
* Nếu không, nó sẽ đóng chu trình req-res với lỗi `Unauthorized`, bảo vệ API khỏi việc thực thi.

Cách thêm authorization middleware vào controller sẽ chỉ cung cấp quyền kiểm soát chi tiết và ở mức thấp của luồng ủy quyền. Tuy nhiên, có thể sẽ bị trùng lặp nếu phải thêm cùng một authorization middleware cho mỗi controller.

Thay vào đó chúng ta có thể thực hiện như sau:
```php
itemsRouter.get(...);

itemsRouter.use(authorizationFunction);

itemsRouter.post(...);
itemsRouter.put(...);
itemsRouter.delete(...);
```

Clients có thể truy cập vào endpoint GET mà không cần bất kỳ "authorization" nào - bởi đó là *public endpoint*.

Các endpoint còn lại nằm sau `authorizationFunction` chỉ có thể truy cập nếu `authorizationFunction` xác định rằng client đó có quyền truy cập. Đối với API này, Auth0 cung cấp proof of authorization bằng một *access token* - JSON Web Token (JWT). Dành cho những bạn chưa biết JWT là gì [Tìm hiểu về json web token (JWT)](https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-7rVRqp73v4bP)

Khi người dùng login, Auth0 cung cấp cho client một  *access token* xác định resources mà client có quyền truy cập hoặc thao tác với token đó. Access token xác định thông tin về những gì user có thể làm với API của bạn, trong đối tượng JSON mà nó đóng gói. Như vậy, client phải gửi cả access token với mỗi request tiếp theo.

Chúng ta sẽ sử dụng phương pháp phân vùng cho ứng dụng này vì cần bảo vệ tất cả các endpoint đọc ghi item.

# Cài đặt authorization dependencies
```php
npm i express-jwt jwks-rsa
```
* [`express-jwt`](https://www.npmjs.com/package/express-jwt): Xác thực mức authorization của các request HTTP bằng cách sử dụng JWT tokens trong ứng dụng Node.js này.
* [`jwks-rsa`](https://www.npmjs.com/package/jwks-rsa): Library để truy xuất các signing keys RSA từ endpoint JWKS (JSON Web Key Set)

Vì đang sử dụng Typescript nên sẽ cần định nghĩa kiểu cho các package này, chỉ cần định nghĩa cho `express-jwt`.
```php
npm i -D @types/express-jwt
```

Tiếp theo, tạo file định nghĩa authorization middleware function:
```php
touch src/middleware/authz.middleware.ts
```
với nội dung như sau :
```php
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_ISSUER}`,
  algorithms: ["RS256"]
});
```
Khi gọi hàm `checkJwt`, nó sẽ gọi tới hàm `jwt`để xác thực, bất kì một JWT nào được gửi theo request để authorize cho request đều được hợp lệ. Auth0 xác định tính hợp lệ của JWT.
* `audience` và `issuer` của JWT (được khai báo trong ` .env `) đều được load vào module bằng việc gọi hàm `dotenv.config()`.
* `algorithms`, `secret` sử dụng để sign JWT. 

Để đạt được mục đích là bảo mật API, chúng ta cần bổ sung thêm vài cái: sử dụng help function `expressJwtSecret` từ thư viện `jwks-rsa` để truy vấn JSON Web Key Set (JWKS) endpoint của Auth0. Endpoint này có một bộ keys chứa các public key mà ứng dụng có thể sử dụng để xác thực JSON Web Token (JWT) do authorization server cấp và ký bằng thuật toán sign `RS256`.

Hàm `checkJwt` sẽ ngầm định nhận req và trả về res, sau đó gọi hàm `next()` để tiếp tục. Và chúng ta cần gọi hàm `checkJwt` này lên trước các controller post, put, delete.

Mở file `src/items/items.router.ts` và import `checkJwt` vào:
```php
/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item } from "./item.interface";
import { Items } from "./items.interface";

import { checkJwt } from "../middleware/authz.middleware";
```
Sau đó, ở phần `Controller Definitions`, thêm code sau:
```php
/**
 * Controller Definitions
 */

// GET items/
itemsRouter.get(...);

// GET items/:id

itemsRouter.get(...);

// Mount authorization middleware

itemsRouter.use(checkJwt);

// POST items/

itemsRouter.post(...);

// PUT items/

itemsRouter.put(...);

// DELETE items/:id

itemsRouter.delete(...);
```

Cùng thử test với trường hợp client ko có quyền nào. Nhớ run lại webpack và npm start nhé
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
Output: `No authorization token was found`
Để truy cập được thì chúng ta cần JWT do Auth0 cấp.
Tuy nhiên, để hỗ trợ test nhanh hơn thì chúng ta sẽ sử dụng một dịch vụ khác của Auth0 đó là test qua Auth0 client appication.

Trong phần tiếp theo, chúng ta sẽ tạo menu-admin role, liên kết các quyền (create, update, delete) với role đó và gán nó cho user mới thông qua Auth0 Dashboard. Người dùng đặc quyền này có thể sử dụng một hoặc nhiều tính năng như một admin. Ngoài ra, chúng ta sẽ tìm hiểu sơ qua về mô hình phân cấp quyền RBAC.

-------
Cảm ơn các bạn đã đọc bài của mình. Bài viết có thể khó hiểu hoặc sai sót, mong các bạn góp ý. Hẹn các bạn ở bài viết cuối cùng về **Quản lý quyền**