![](https://images.viblo.asia/8b95d16d-777a-472f-8401-72541749de3c.png)

## 1. Giới thiệu
**API**, viết gọn của **Application Programming Interface**, là một bộ quy tắc được xác định, chứa các phương thức giao tiếp được xác định rõ ràng. API giúp các thành phần phần mềm khác nhau tương tác với nhau.

**API testing** là gì? Nó là một bộ kiểm tra xem các **API** có đáp ứng mong đợi về chức năng, độ tin cậy, hiệu suất và bảo mật hay không và trả về phản hồi chính xác. Nói 1 cách đơn giản nó được sử dụng để xác định xem đầu ra có cấu trúc tốt và hữu ích cho ứng dụng khác hay không, kiểm tra phản hồi trên cơ sở tham số (yêu cầu) đầu vào và kiểm tra xem API mất bao nhiêu thời gian để truy xuất và ủy quyền dữ liệu.

**Postman** là một ứng dụng cho việc test các api bằng cách gửi request tới web server và nhận lại phản hổi từ server.
- Nó cho phép người dùng thiết lập tất cả các headers và cookie mà API mong đợi và kiểm tra phản hồi.
- Năng suất có thể được tăng lên bằng cách sử dụng một số tính năng của Postman, được liệt kê bên dưới.

Một test trong Postman về cơ bản là một đoạn code JavaScript, chạy sau khi request được gửi và nhận được phản hồi từ máy chủ.

## 2. Cài đặt và sử dụng Postman
Cái này khá dễ dàng, các bạn vào www.getpostman.com để xem hướng dẫn download và cài đặt nhé.

Postman rất dễ sử dụng với giao diện thân thiện, và đặt biệt có theme tối màu (hầu hết cái developer thích theme tối màu :rofl: )

Các phương thức mà postman hỗ trợ
![](https://images.viblo.asia/7d60ccaa-41a7-447e-93ef-a3d8c1ce8871.png)

Postman hỗ trợ chúng ta format và beauty kết quả trả về từ server
![](https://images.viblo.asia/8037b93e-0de5-4e95-8669-396585e0af30.png)

Khi sử dụng postman, chúng ta thường (chỉ) chú ý tới 2 thành phần chính, đó là:
1. HTTP Request
2. HTTP Response

### 2.1. HTTP Request

HTTP Request chứa các thông tin về phương thức (method), URL, headers, Request Body, Pre-request Script and Tests.

**Request methods**
Như hình ở trên, postman cung cấp cho chúng ta khá là nhiều phương thức. Trong số đó POST, PUT, GET, DELETE là 4 phương thức mà chúng ta thường sử dụng:
- POST Request — Sử dụng cho tạo mới hay cập nhật dữ liệu (cập nhật dữ liệu có thể dùng post hoặc put)
- PUT Request — Sử dụng cho cập nhật dữ liệu
- GET Request — Sử dụng cho việc lấy dữ liệu
- DELETE Request — Sử dụng để xóa dữ liệu

**Request URL**: địa chỉ mà chúng ta gửi request
**Request Headers**: chứa các thông tin về header theo dạng `key-value`.  Trong request header, chúng ta có
- **Content-Type**: mô tả dạng format của dữ liệu, ví dụ `application/json`.
- **Authorization**: chứa thông tin về authorization, như  `authorization token`, dùng đệ định dạng user.

**Request Body**:  Chứa data mà chúng ta muốn gửi lên server:
![](https://images.viblo.asia/d368e549-1c72-4fa2-b1cc-5469d7764000.png)

**Pre-request Scrip**: Chứa đoạn code nhỏ chạy trước khi gửi request

Ví dụ: chúng ta set lại 1 giá trị global trước khi gửi request dựa theo env
![](https://images.viblo.asia/59d9437b-98c6-4de1-a2d7-7b830873f366.png)


#### Tests in Postman
Trong postman chúng ta có thể viết và chạy test cho mỗi request bằng cách sử dụng javascript. Ví dụ:

Test Script
![](https://images.viblo.asia/8aaf0b63-f4c1-4303-8053-18a8ff2e6131.png)

Test Result
![](https://images.viblo.asia/f1cc7319-f24c-4e32-93ce-ce8cb743f653.png)

### 2.2. HTTP Response
Sau khi chúng ta gửi request, API sẽ trả về kết quả bao gồm body, cookie, headers, tests, status code và response time.

Có khá là nhiều status code mà api có thể trả về, dưới đây là một số status code thường gặp trong quá trình sử dụng:
- 200 — For Successful request.
- 201 — For successful request and data was created.
- 204 — For Empty Response.
- 400 — For Bad Request. The request could not be understood or was missing any required parameters.
- 401 — For Unauthorized access. Authentication failed or user does not have permissions for the requested operation.
- 403 — For Forbidden, Access denied.
- 404 — For data not found.
- 405 — For Method Not Allowed or Requested method is not supported.
- 500 — For Internal Server Error.
- 503 — For Service Unavailable.
*Mình xin phép không dịch các mã lỗi này nhé*

## 3. Test Scripts in Postman
Như đã nói ở trên, chúng ta có thể viết và chạy test cho mỗi request bằng javascript. Code được thêm vào tab `Tests` sẽ được chạy sau khi nhận được reponse.
Bạn có thể thêm bao nhiêu test cũng được. Hầu hết các test có thể viết bằng 1 dòng code js :rofl: 

1 số test cơ bản:

Kiểm tra status code là 200
```js
tests[“Status code is 200”] = responseCode.code ===200;
```

Kiểm tra response chứa text mong muốn:
```js
tests["Body matches string"] = responseBody.has("string_you_want_to_search");
```

Kiểm tra reponse trả về bằng 1 đoạn text hay không:
```js
tests["Body is correct"] = responseBody === "response_body_string";
```

Kiểm tra giá trị trong json
```js
var data = JSON.parse(responseBody);
tests["Your test name"] = data.value === 100;
```

Kiểm tra thời gian phản hổi (response time)
```js
tests["Response time is less than 200ms"] = responseTime < 200;
```

Kiểm tra request hoàn thành hay chưa
```js
tests["Successful POST request"] = responseCode.code === 201 || responseCode.code === 202;
```

Kiểm tra content type của header
```js
tests[‘The Content-Type is JSON’] = postman.getResponseHeader(‘Content-Type’) === ‘application/json’;
```

### Overview of Postman Behavior Driven Development (Postman BDD)
Postman BDD allows to use BDD syntax to structure tests and fluent `Chai-JS` syntax to write assertions. So the above test cases could look like as below:
Postman BDD cho phép sử dụng cú pháp BDD để kiểm tra cấu trúc và cú pháp Chai-JS để viết các `assertions`. Vì vậy, các test ở trên có thể trông như dưới đây:

Kiểm tra content type
```js
it(‘should return JSON’, () => {
 response.should.be.json;
 response.should.have.header(‘Content-Type’, ‘application/json’);
 response.type.should.equal(‘application/json’);
});
```

Kiểm tra Status code là 200:
```js
it(‘should be a 200 response’, () => {
    response.should.have.status(200);
});
```

Kiểm tra thời gian phản hồi
```js
it(‘should respond in a timely manner’, () => {
    response.time.should.be.below(200);
});
```

#### Features & Benefits of Postman BDD
- Easy syntax: như các bạn thấy ở trên, với việc sử dụng cú pháp của `Chai-JS`, các test trở nên dễ học và dễ viết hơn khá nhiều
- Error Handling: nếu có lỗi xảy ra ở 1 vài test, thì các test khác vẫn chạy được. Nếu viết bằng js thuần thì các test sau test bị lỗi sẽ không chạy.
- Lots of Assertions: với các`assertions` của `Chai-JS`, việc kiểm tra dữ liệu sẽ dễ dàng hơn nhiều với việc so sánh bằng tay (code js thuần)
- JSON Schema Validation: bạn có thể kiểm tra cấu trúc của json được trả về từ server với việc sử dụng `response.body.should.have.schema(someJsonSchema)`