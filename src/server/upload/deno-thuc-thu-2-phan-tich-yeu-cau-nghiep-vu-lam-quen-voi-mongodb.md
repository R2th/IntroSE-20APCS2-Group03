Ở bài viết trước, chúng ta đã xây dựng các module khá nhỏ và viết hello world với Deno.
# 1. Phân tích yêu cầu
Ở bài này, mình sẽ phân tích 1 chút các chức năng của api tới chúng ta sẽ triển khai và cách tương tác với cơ sở dữ liệu, ở đây mình sử dụng MongoDB
Khá thiếu sót khi bài trước mình không phân tích chức năng của api mình cần làm nên bài này mình sẽ gộp luôn.
Chúng ta sẽ đi từ cơ bản đến xây dựng một vài api của shop bán thời trang, các api chúng ta cần sẽ là
- Đăng ký (POST): /api/v1/sign-up
- Đăng nhập (POST): /api/v1/sign-in
- Xem thông tin người dùng (GET): /api/v1/user-profile
- Xem danh sách sản phẩm (GET) : /api/v1/products
- ... có thể có thêm mình sẽ bổ xung sau 

# 2. Làm quen với MongoDB
Để làm việc với mongoDB, chúng ta cần sử dụng https://deno.land/x/mongo@v0.20.1. Thư viện cung cấp các api giúp chúng ta thao tác với mongoDB khá dễ
Ở thư mục project, chúng ta sẽ tạo thêm folder để thao tác với datasbe, model để chứa các entity của project, repository để thực hiện các thao tác query với mongodb tương ứng với từng entity
```
|__controller
|__database
|__repository
|__model
|__router
```
Chúng ta sẽ tạo ra một instance để thao tác với mongoDB và export nó ra ngoài :
### database/database.ts : 
```js
import {MongoClient } from "https://deno.land/x/mongo@v0.20.0/mod.ts";

const URI = "mongodb://127.0.0.1:27017";

const client = new MongoClient();
await client.connect(URI);
const database = client.database('deno-tutorial');

export default database;
```
Tạo ra user tối giản về các field, vì chúng ta chỉ demo mà thôi :D
### model/user.ts:
```js
export interface User {
    userName: String;
    password: String;
    numberPhone: String;
}
```
### repository/userRepository.ts
```js
import {User} from "../model/user.ts";
import database from "../database/database.ts";

const userCollection = database.collection("users");
export const createUser = async (user: User) => {
    return await userCollection.insertOne(user);
}
```
### controllers/userController.ts
```js
import {Context, Status} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {createUser} from "../repository/userRepository.ts";

export const signUpHandler = async (context: Context) => {
    const body = await context.request.body();
    const value = await body.value;
    const id = await createUser(value);
    if (id) {
        context.response.status = Status.OK;
    }
}
```
và cuối cùng, chúng ta thêm handler đó vào router thôi
### router/router.ts
```js
import {Router} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {helloHandler} from "../controllers/helloController.ts";
import {signUpHandler} from "../controllers/userController.ts";

let router = new Router();
router
    .get("/", helloHandler)
    .post("/api/v1/sign-up", signUpHandler);

export default router;
```
Chúng ta có thể dùng postman để kiểm tra kết quả, lúc này chúng ta cần allow thêm 1 số quyền cho mongodb như sau : `deno run --allow-net --allow-write --allow-read --unstable server.ts`
![](https://images.viblo.asia/a29d5fa2-44ef-4894-a13a-b0f4a293f8d6.png)
ở phía mongo :
![](https://images.viblo.asia/1140cccd-387f-47dd-b6c4-6b3b6407af07.png)
Ở bài tiếp theo mình sẽ hướng dẫn sử dụng jwt và login với deno. Cảm ơn các bạn đã theo dõi