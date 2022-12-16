Ở bài trước chúng ta đã biết cách gen token để xác thực người dùng, bài viết này mình sẽ hướng dẫn sử dụng cái token đó cho phiên làm việc.

Đầu tiên chúng ta sẽ tạo package middleware để dành riêng cho tác vụ xử lý middleware(nếu các bạn chưa biết middleware là gì thì hãy search gg khoảng 3-5 phút là có thể hiểu đương sơ sơ khái niệm về nó)
### middleware/middlewareJWT.ts:
```js
export const jwtMiddleware = async (context: Context, next: any) => {}
```
đầu tiên chúng ta cần 1 function làm nhiệm vụ đó, tiếp theo chúng ta sẽ lấy ra headers của request người dùng :
`const header: Headers = context.request.headers;`
sau đó thêm 1 vài tiểu tiết để hoàn thiện code thôi :Đ
```js
if (!author) {
        return ResponseCustom(context, Status.Unauthorized, {
            message: "Invalid JWT Token",
        });
    }
    const token = author.split(" ")[1];
    if (token) {
        if (await verify(token, keyHS256)) {
            await next();
            return;
        }
    } else {
        return ResponseCustom(context, Status.Unauthorized, {
            message: "Invalid JWT Token",
        });
    }
```
đoạn code hoàn chỉnh :
```js
import {validate, verify} from "https://deno.land/x/djwt@v2.4/mod.ts";
import {Context, Status} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {ResponseCustom} from "../utilities/responseCustom.ts";
import {keyHS256} from "../secure/token.ts";
export const jwtMiddleware = async (context: Context, next: any) => {
    const header: Headers = context.request.headers;
    // đầu tiên chúng ta bóc tách header để lấy token
    const author = header.get("Authorization");
    if (!author) {
        return ResponseCustom(context, Status.Unauthorized, {
            message: "Invalid JWT Token",
        });
    }
    // vd : Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm
    // thì token sẽ là eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm
    const token = author.split(" ")[1];
    if (token) {
        // việc đơn giản chúng ta get cái token này và verify nó với keyHS256 mà chúng ta đã tạo trước đó,
        // nếu verify được thì next() : cho thực hiện bước tiếp theo
        if (await verify(token, keyHS256)) {
            await next();
            return;
        }
    } else {
        return ResponseCustom(context, Status.Unauthorized, {
            message: "Invalid JWT Token",
        });
    }
}
```
* cách sử dụng middleware cũng rất đơn giản, chúng ta hãy thêm middleware vừa viết vào trước `helloHandler` xem sao nhé :
```js
router
    .get("/", jwtMiddleware, helloHandler)
    .post("/api/v1/sign-up", signUpHandler)
    .post("/api/v1/sign-in", signInHandler);
```
Nếu get theo như bài 1, chúng ta sẽ bị lỗi như sau :
```js
{
    "message": "Invalid JWT Token"
}
```
* Nếu muốn qua được lớp "hàng rào" này, chúng ta cần dùng token nào đó, hay thử sign-in lại và lấy token nhận được, thêm vào Authorization->Type(Bearer Token), kết quả sẽ được như sau : 
```
Hello world
```
* Khá đơn giản phải không nào, nhưng như chúng ta biết, muốn xem thông tin người dùng từ cái token đó chúng ta cần phải trải qua các công đoạn : parse token (thuật ngữ này mình cũng k rõ là đúng hay ko, nếu sai mn góp ý nhé) đó ra, vì token đó mang thông tin user, ở các bài trước mình có sử dụng `{phone: reqValue.numberPhone, userName: reqValue.userName}` để gen ra token, vậy khi mình parse token đó, chúng ta sẽ nhận được những thông tin y đúc như vậy
* Đâu tiên, chúng ta cần thêm vài function bóc tách và decode cái token mà nhận được ở headers:
### middleware/middlewareJWT.ts:
ở file này, thêm vào đoạn code dùng để lấy thông tin từ token
```js
export const parseToken = async (context: Context) => {
    const token = await getToken(context);
    const data = decode(token);
    // hàm decode sẽ trả về dạng [header: unknown, payload: unknown, signature: Uint8Array], link tại https://deno.land/x/djwt@v2.4/mod.ts#L73 , trong đó payload là thông tin
    // mà chúng ta thu được
    return data ? data[1] : null;
}
const getToken = async (context: Context) => {
    const header: Headers = context.request.headers;
    const author = header.get("Authorization");
    if (author) {
        const token = author.split(" ")[1];
        if (token) {
            return token;
        }
    }
    return "";
}
```
### controllers/userController.ts:
```js
export const userProfileHandler = async(context : Context) => {
    const dataUser = await parseToken(context);
    if(!dataUser){
        return;
    }
    const userName = (dataUser as any).userName;
    const user = await getByUserName(userName);
    if (user){
        return ResponseCustom(context, Status.OK, {
            status: Status.OK,
            message: STATUS_TEXT.get(Status.OK),
            data : user
        });
    }else{
        return ResponseCustom(context, Status.NotFound, {
            status: Status.NotFound,
            message: STATUS_TEXT.get(Status.NotFound)
        });
    }
}
```
> Doạn này thì đơn giản rồi, chúng ta sẽ lấy userName từ token, và dùng hàm `getByUserName()` ở userRepository.ts để lấy ra thông tin user có userName từ token, nếu k tìm thấy user nào thỏa màn thì trả về NotFound thôi
* Đến đây thì chúng ta đã biết cách sử dụng middleware như 1 "rào chắn" trong api. Bài tiếp theo mình sẽ dần dần hoàn thành cách api như : lấy thông tin sản phẩm, order,...