# Giới thiệu 
Khi bạn làm việc với **frontend** cho 1 project và backend chưa hoàn thành hết các API, bạn phải làm thế nào để vẫn có thể đảm bảo tiến độ và code của bạn vẫn đảm bảo chất lượng? Câu trả lời là bạn cần setup các **Mock API.**
Đôi khi để code ở backend tốn khá nhiều thời gian để load, dẫn đến việc bạn phải chờ mỗi khi thao tác, thật bực mình. 
Đôi khi là 1 developer mới join project, họ chỉ cần lấy code về và chạy `npm i` và `npm start` là có thể thấy được tất cả các chức năng của app hoạt động như thế nào. 
Lợi ích quá rõ ràng phải không nào. 

Ở bài viết này mình sẽ chỉ cho bạn cách tạo ra **mock api** nhanh chóng và dễ dàng để cho phép bạn chạy app mà không cần phụ thuộc vào api back end.

![](https://images.viblo.asia/e18dc7a2-0efd-47be-87a0-0c8fe3b8ec02.jpg)

# Triển khai
## Init project
Để bắt đầu thì bạn có thể tạo 1 react app từ https://github.com/facebook/create-react-app
Rất đơn giản với các dòng lệnh sau
```
npx create-react-app viblo-mock-api
cd viblo-mock-api
npm start
```
Như vậy là chúng ta đã có 1 app react default của facebook rồi.

## Cài đặt Mock API
Thư viện npm mà mình sử dụng để mock API là **connect-api-mocker**
> connect-api-mocker is a connect.js middleware that fakes REST API server with filesystem. It will be helpful when you try to test your application without the actual REST API server.

**connect-api-mocker** có thể được sử dụng với rất nhiều Node framework như Connect, Express và BrowserSync. Mình sẽ sử dụng **Express** để làm ví dụ:
Cài đặt thư viện:
```
npm i --save-dev express connect-api-mocker
```

Sau đó tạo 1 file mock-api.js trong thư mục gốc và thêm đoạn code sau:
```Javascript
var express = require('express');
var apiMocker = require('connect-api-mocker');
const port = 3001; 
var app = express();
 
app.use('/api', apiMocker('mock-api'));
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

## Tạo mock API của bạn
Để đơn giản, thì mình sẽ tạo 2 API endpoint cho app react của chúng ta sẽ dùng. 

### Endpoint GET user cho phép chúng ta lấy user bằng username
```
GET
/user/:userName

CASE 1:
userName = "tamntm" => 
Status: 200
Response: 
{
    "id": 1,
    "userName": "tamntm",
    "age": "24"
}

CASE 2:
userName = "unauthorised" => 
Status: 403
Response : { }

CASE 3:
userName = * ({USERNAME}) => 
Status: 200
Response :
{
    "id": 0,
    "userName": {USERNAME},
    "age": "20"
}
```

### Endpoint POST cho phép chúng ta tạo thêm User
```
POST
/user

CASE 4:
Body:
{
    "id": 2,
    "userName": "goodGirl",
    "age": 20
}
=>
Status: 201
Response: 
{
    "id": 2
}

CASE 5:
Body:
{
    "id": 1,
    "userName": "tamntm",
    "age": 22
}
=>
Status: 209
Response: 
{
    "errorMessage": "UserId already exists"
}
```

## Tiến hành
**connect-api-mocker** cho phép bạn tạo mock sử dụng filesytem. Có nghĩa là bạn có thể cấu trúc mock API sử dụng thư mục và file, rất dễ sử dụng và thay đổi.
Trong thư mục gốc, bạn tạo 1 folder gọi là `mock-api`. Bây giờ thì chúng ta sẽ mock 3 reponse cho 3 case của GET endpoint
### Case 1
Trong `mock-api` tạo 1 thư mục `user`, và trong đó tạo 1 thư mục khác là `tamntm`. Trong thư mục `tamntm` tạo 1 file là GET.json với nội dung
```
{
    "id": 1,
    "userName": "tamntm",
    "age": "24"
}
```
Thư mục có cấu trúc như sau:
```
/mock-api
    /user
        /tamntm
            GET.json
```

Bây giờ nếu bạn run **mock-server.js** và ở Postman, tạo 1 GET request tới http://localhost:3001/api/user/tamntm, bạn sẽ nhận được respone là nội dung trong file GET.json! Như vậy bạn có thể thấy là url của API nó đang map với cấu trúc của thư mục mà chúng ta tạo ra.

### Case 2
Trong thư mục `mock-api\user` tạo 1 thư mục `unauthorised`. Trong `unauthorised`, tạo 1 file GET.js với nội dung như sau:
```js
module.exports = (request, response) => response.status(403).send({ });
```
Thư mục có cấu trúc như sau:
```
/mock-api
    /user
        /tamntm
            GET.json
        /unauthorised
            GET.js
```

Đây là custom response, bạn có thể đọc thêm ở [connect-api-mocker](https://www.npmjs.com/package/connect-api-mocker) documentation

Gõ http://localhost:3001/api/user/unauthorised, bạn sẽ thấy mã lỗi 403 trả về.

### Case 3
Ở trường hợp này, bất kì request GET nào với username khác `tamntm` và `unauthorised` thì sẽ nhận được respone ở case này. Chúng ta sẽ sử dụng wildcard cung cấp bởi **connect-api-mocker**.
Tạo thư mục `__userName__` dưới thư mục `user`, sau đó tạo file **GET.js** với nội dung như sau
```js
module.exports = (request, response) => {
  response.json({
    id: 0,
    userName: request.params.userName,
    age: 20
  });
}
```
Bây giờ cấu trúc thư mục sẽ như sau:
```
/mock-api
    /user
        /tamntm
            GET.json
        /unauthorised
            GET.js
        /__userName__
            GET.js
```
Mở POSTMAN và gửi 1 request tới http://localhost:3001/api/user/testUser, respone sẽ như sau:
{
    "id": 0
    "userName": "testUser",
    "age": 20
}
### Case 4 và 5
2 trường hợp cuối cùng của chúng ta sẽ được handle trong file `POST.js`. Tạo 1 file `POST.js` dưới thư mục user với nội dung như sau:
```js
module.exports = (request, response) => {
    const userId = request.body.id;
    if (userId === 1) {
        return response.status(409).send({});
    }
    
    return response.status(201).send({
        "id": request.body.id,
        "userName": request.body.userName,
        "age": request.body.age
    });
}
```
Thư mục `mock-api` của bạn sẽ có cấu trúc như bên dưới:
```
/mock-api
    /user
        /tamntm
            GET.json
        /unauthorised
            GET.json
        /__userName__
            GET.js
        POST.js
```

Ở Postman, tạo 1 POST request tới http://localhost:3001/user với request body có Id là 1, bạn sẽ nhận được return code là 409. Còn với request body với Id khác 1, bạn sẽ nhận được return code là 201.
Yeah, và chúng ta đã tạo thành công Mock API. 

# Kết thúc
Hi vọng bài viết có ích cho các bạn, hãy thử áp dụng và bạn sẽ thấy được lợi ích tuyệt vời. Cảm ơn các bạn đã đọc bài.