Chào mn, qua thời gian ngắn tìm hiểu deno, bản thân mình thấy tài liệu dành cho deno khá ít, nên hôm nay mình sẽ làm series cơ bản về deno. Chúng ta sẽ đi từ cơ bản hello world đến cách viết API cơ bản cho 1 ứng dụng nho nhỏ. Thời gian mình tìm hiểu khá ngắn, nên bài viết có thể thiếu sót nhiều, mong mn thông cảm và góp ý.

Mình sẽ bỏ qua các bước giới thiệu và install deno (vì mấy cái này có khá nhiều trên mạng), ở loạt series mình sẽ dùng deno 1.14.1 và Webstorm(https://www.jetbrains.com/webstorm/)
Để viết được hello world với Deno thì có khá nhiều cách, ở trang chủ https://deno.land/ giới thiệu cách truyền thống nhất của deno, các bạn có thể qua đó tham khảo. Ở đây mình sẽ hướng dẫn viết API bằng oak(https://github.com/oakserver/oak), tại thời điểm bài viết, oak đang ở phiên bản 9.0.1 và mình cũng sẽ sử dụng nó luôn

Đầu tiên chúng ta cần import class Aplication của oak bằng cách 
```js
import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
```

Trong tài liệu của oak có viết : Application là lớp quản lý máy chủ HTTP, middleware, xử lý các lỗi xảy ra trong quá trình request của người dùng.

Hai phương thức được sử dụng nhiều trong lớp Application là `use()` và `listen()` .  Middleware, request, response sẽ được thêm vào ở method `use()`, method `listen()` sẽ khởi động server và bắt đầu xử lý các api được thêm ở `use()`

Đầu tiên các bạn tạo một project mới ở Webstorm, tạo một file mới có tên server.ts:
```js
import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8888 });
```
Đoạn code này khá dễ hiểu , đầu tiên chúng ta tạo một instance của Application(), lớp Context (ctx) của oak có tác dụng lắng nghe request của người dùng dựa vào `ctx.request`, và trả về cho người dùng response : `ctx.response` ở đây chúng ta trả về mỗi từ "Hello World!", Tiếp đến chúng ta sẽ cho server lắng nghe ở cổng 8888.

Tiếp đến chúng ta cd vào thư mục chứa file server và chạy câu lệnh 
`deno run --allow-net server.ts`

Khi mở localhost:8888 chúng ta sẽ thấy kết quả của mình :D 

Nhưng chắn chắn để triển khai 1 dự án nho nhỏ, chúng ta không thể nào dồn hết tất cả code vào file server được :D, ta sẽ chia dần theo module như sau
![](https://images.viblo.asia/01244b12-b0ce-4f0f-819c-a743dc372555.png)

Lần lượt ta có helloController.ts sẽ chứa các handler xử lý liên quan đến hello(mình ví dụ ra thôi, sau này chúng ta xây dựng lớp này sẽ biến mất)
```js
import {Context} from "https://deno.land/x/oak@v9.0.1/mod.ts";
export const helloHandler = async (context: Context) => {
    context.response.body = "Hello world";
}
```
Tiếp đến router.ts sẽ chứa các api của chúng ta bằng cách gọi các handler tương ứng trong package controllers:
```js
import {Router} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {helloHandler} from "../controllers/helloController.ts";

let router = new Router();
router.get("/", helloHandler);

export default router;
```
cuối cùng server.ts  chỉ gọi lại và sử dụng router mà thôi
```js
import {Application} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import router from "./router/router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: 8888});
```
Kết quả sau khi chạy project vẫn như vậy, chỉ là chúng ta chia nhỏ module  mà thôi.

Ở bài tiếp theo chúng ta sẽ đi dần đến làm việc với controller, router và tương tác với mongodb