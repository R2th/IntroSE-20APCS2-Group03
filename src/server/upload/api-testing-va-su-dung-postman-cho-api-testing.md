**API là viết tắt của Application Programming Interface (Giao diện lập trình ứng dụng)**

API là một bộ quy tắc được định nghĩa trước, chứa các phương thức giao tiếp được định nghĩa rõ ràng. API giúp các thành phần khác nhau trong hệ thống tương tác được với nhau.

**API testing** bao gồm việc thực hiện các API và kiểm tra xem chúng có đáp ứng mong đợi về chức năng, độ tin cậy, hiệu suất, bảo mật và chính xác hay không

API testing được sử dụng để xác định xem đầu ra của API có cấu trúc tốt và dễ dàng sử dụng cho các ứng dụng khác hay không, kiểm tra kết quả trả về có phù hợp với các tham số đầu vào không, và kiểm tra xem API mất bao nhiêu thời gian để truy xuất dữ liệu.

Postman là một ứng dụng để test API, bằng cách gửi yêu cầu đến server và nhận kết quả phản hồi.

- Nó cho phép người dùng thiết lập tất cả các header và cookie cần thiết của API mong đợi và sẽ trả về kết quả

- Năng suất của tester có thể được tăng lên khi sử dụng một số tính năng của Postman, được liệt kê bên dưới.

Testing trong Postman về bản chất là nó sẽ chạy một mã JavaScript, nó sẽ gửi yêu cầu lên server và nhận phản hồi từ server.

**Cài đặt Postman**

Bạn có thể cài đặt Postman Native App ở đường dẫn sau :
https://www.getpostman.com/apps

hoặc cũng có thể cài đặt từ Google Chrome web store (Postman extension) bằng cách dùng link bên dưới : 

https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en

Postman rất dễ sử dụng. Nó cung cấp một tập các API calls và mọi người phải tuân theo để có thể test API

Bạn có thể chọn API call method từ list cho trước, cài đặt các thông tin Authorization, Header, Body tương ứng với API bạn muốn test.

Các API call method có thể hoạt động trên Postman : 
![](https://miro.medium.com/max/1519/1*EwTghNJuCoEK9kKnj64Jrg.png)

Cài đặt header : 
![](https://miro.medium.com/max/1099/1*00GLzEHB7AFKPaWafu_mxA.png)

Thêm thông tin của body : 
![](https://miro.medium.com/max/1098/1*Yz5D6TGwjBPw9tgf9_cQRQ.png)

Sau đó bạn có thể thực hiện lời gọi API bằng cách click vào button **Send**

**Các biến môi trường trong Postman**

Bạn có thể cài đặt các biến môi trường, từ góc trên bên phải, tùy theo yêu cầu. Bạn có thể dễ dàng cài đặt theo các bước bên dưới : 
1. Click vào Manage Environment từ Settings
2. Click vào Add button
3. Đặt tên cho Environment
4. Điền key & value, để có thể sử dụng sau này. 

![](https://miro.medium.com/max/1505/1*_PSKCCg5eIfIRt7gvCSgDg.png)

**Thêm mới Collection**

Bạn có thể thêm mỗi API call vào trong Collection hoặc tạo mới 1 Collection, điều này sẽ giúp dễ dàng tái sử dụng :
![](https://miro.medium.com/max/1493/1*KR9qGSnnpc4UW6P-KiyTDA.png)

Bạn có thể import hoặc export Collection, vì vậy những người khác có thể sử dụng trên máy họ 1 cách dễ dàng : 
![](https://miro.medium.com/max/1511/1*x4cqi2hO12mVSyY07lTqcA.png)
![](https://miro.medium.com/max/1504/1*oxwcsjGUr8z_-XlQLc0isA.png)

Trong các lời gọi API, chúng ta thường quan tâm 2 vấn đề chính

**1. HTTP Request**

Request là cách đơn giản nhất để có thể tạo ra http call
HTTP Request bao gồm Request Method, Request URL, Request Headers, Request Body, Pre-request Script và Tests.

Request Methods - định nghĩa kiểu của request. Những method có thể thực hiện ở Postman như hình dưới đây : 
![](https://miro.medium.com/max/1098/1*Uhxu47ERKjNfYGrTy-52pg.png)

Những method dưới đây là thường xuyên được sử dụng : 
- POST Request — dùng để tạo hoặc cập nhật dữ liệu
- PUT Request — để cập nhật dữ liệu
- GET Request — lấy dữ liệu
- DELETE Request — xóa dữ liệu

Request URL — Nơi sẽ nhận http request

Request Headers — Bao gồm các cặp key-value, tôi thường sử dụng 2 header : 
1. Content-Type -  mô tả định dạng của dữ liệu, tôi thường hay sử dụng nhất là kiểu application/json
2. Authorization - chứa token dùng để xác thực khi request

Request Body - chứa data (tùy thuộc vào yêu cầu của request) sẽ được gửi cùng với request. Ở ví dụ dưới sử dụng raw form :
![](https://miro.medium.com/max/1105/1*P4X_VsdOpsS2EUJW8ogN2g.png)

Pre-request Script — là đoạn code thực hiện trước khi request được gửi đi.

Ví dụ : Sử dụng Postman BDD, chúng ta cần định nghĩa đoạn code bên dưới ở trong Pre-request Script.
![](https://miro.medium.com/max/1104/1*5Jn8t8nB68YcLS01xlYjIw.png)

Nếu biến môi trường cho “postman_bdd_path” không được cài đặt, thì request có định nghĩa Pre-request Script sẽ sử dụng từ script để thực hiện request.

Tests in Postman — Bạn cũng có thể viết và test các request bằng JavaScript. Ví dụ : 
Test Description:
![](https://miro.medium.com/max/818/1*EozVgpNGSM-WKZU-KxmXDg.png)

Test Script:
![](https://miro.medium.com/max/1084/1*KVihyEqHROEY1TWzHtHFiQ.png)

Test Result:
![](https://miro.medium.com/max/1089/1*3An09j3F-Z5p4vTnTC4bZg.png)

**2. HTTP Response** 

Sau khi gửi request, kết quả nhận được sẽ bao gồm Body, Cookies, Headers, Tests, Status code và API Response Time.
Postman hiển thị body và headers ở tab khác nhau, status code cùng với time hoàn thành cũng sẽ hiển thị ở tab khác.
Có khá nhiều status code, dựa vào đó chúng ta có thể kiểm tra được kết quả trả về. Một số trong đó là : 
1. 200 — thành công
2. 201 — thành công và dữ liệu đã được tạo ra
3. 204 — Empty Response
4. 400 — Bad Request
5. 401 — Unauthorized
6. 403 — For Forbidden, Access denied.
7. 404 — Data Not Found.
8. 405 — Method không được phép thực hiện hoặc không được hỗ trợ.
9. 500 — Internal Server Error.
10. 503 — Service Unavailable.

Test Scripts trong Postman
Với Postman, bạn có thể viết và chạy bằng cách sử dụng JavaScript. Đoạn code được thêm vào dưới tab Tests sẽ được thực hiện sau khi nhận được response.
Ví dụ : 
`tests[“Status code is 200”] = responseCode.code ===200;`
dùng để kiểm tra responseCode có phải 200 không.
Bạn có thể có nhiều test cho 1 request, đa số các test này đơn giản và có ít câu lệnh JavaScript. Một số ví dụ :

Kiểm tra response body có chứa một string  nào đó : 
`tests["Body matches string"] = responseBody.has("string_you_want_to_search");`

Kiểm tra kết quả có phải đúng là string mong muốn không
`tests["Body is correct"] = responseBody === "response_body_string";`

Kiểm tra JSON value
```
var data = JSON.parse(responseBody);
tests["Your test name"] = data.value === 100;
```

Kiểm tra Response time nhỏ hơn 200ms hay không :
`tests["Response time is less than 200ms"] = responseTime < 200;`

Kiểm tra status code của POST request
`tests["Successful POST request"] = responseCode.code === 201 || responseCode.code === 202;`

Kiểm tra Response header content type:
`tests[‘The Content-Type is JSON’] = postman.getResponseHeader(‘Content-Type’) === ‘application/json’;`


Nguồn dịch: https://medium.com/aubergine-solutions/api-testing-using-postman-323670c89f6d