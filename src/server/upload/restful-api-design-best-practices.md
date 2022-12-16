Hey hey hey hey, cuối năm cũng khá bận bịu công việc này kia nên cũng không có nhiều thời gian viết bài phục vụ anh em được. Nay mình xin chia sẻ một vài những tiêu chí mà mình hay sử dụng khi viết REST API. Mình tin rằng những tiêu chí này sẽ giúp ích khá nhiều khi các endpoint trong dự án của các bạn ngày dần nhiều lên. *1, 2, 3 zô..... 2, 3 zô ... 2, 3 à mà thôi*, bắt đầu nào.
### 1. Không trả lại plain text:
Mặc dù đây không phải là một quy định bắt buộc của REST, hầu hết REST APIs sử dụng JSON để gửi nhận dữ liệu. Tuy nhiên, như vậy là chưa đủ để trả về nội dung chưa một chuỗi có định dạng JSON. Bạn cần **phải** chỉ định rõ `Content-Type` trong *Header*, nó phải có giá trị là `application/json` .
### 2. Không sử dụng verbs (động từ) trong URIs:
Lý do là bởi vì HTTP method đã đủ để nói nên được hành động mà bạn muốn trên tài nguyên đó.
**Bad Practice:**
```go
GET: /restaurants/:id/listFood/
```
**Good Practice:**
```go
GET: /restaurants/:id/foods/
```
### 3. Sử dụng danh từ số nhiều cho tài nguyên:
**Bad Practice:**
```go
GET: /restaurant/:id/
```
**Good Practice:**
```go
GET: /restaurants/:id/
```
### 4. Trả về chi tiết lỗi trong response body:
Khi một API server xử lý một lỗi, bạn sẽ rất dễ dàng sử lý nếu như nhận được mô tả chi tiết của lỗi đó bên trong response body. Bạn có thể sử dụng cấu trúc như ví dụ bên dưới:
```json
{
  "error": "Invalid payoad.",
  "detail": {
    "surname": "This field is required."
  }
}
```
### 5. Chú ý cách sử dụng Status codes:
Có 6 status codes thường được sử dụng RESTful API. Sử dụng status code và **chỉ** sử dụng `response body` để cung cấp chi tiết lỗi. Nếu bạn làm được việc này thì quá tuyệt vời. Tuy nhiên, trong một vài trường hợp mình cũng nên để thêm `status code` bên trong `response body`.
```json
401 - Unauthorized
400 - Bad Request
404 - Not Found
403 - Forbidden Error
500 - Internal Error
503 - Service Unavailable
```
### 6. Xử dụng query string để tạo bộ lọc và phân trang:
Người dùng có thể muốn nhận được các mục đáp ứng một điều kiện cụ thể hoặc một số lượng nhỏ dữ liệu để cải thiện hiệu suất.

**Good Practice:**
```
GET: /restaurants?name=blabla&page=2&page_size=20
```
Với bộ lọc, người dùng có thể chỉ rõ thuộc tính mà dữ liệu trả về trong `response body` nên có.
Phân trang cho phép người dùng truy cập một bộ dữ liệu nhỏ hơn. Điều này khá gần gũi với các bạn phải không nào :)
### 7. 401 vs. 403:
* Người dùng chưa cung cấp thông tin xác thực hoặc chúng không hợp lệ. Lúc đó bạn sẽ sử dụng `401 - Unauthorized`.
* Người dùng đã thực hiện xác thực thành công, nhưng họ không được phép truy cập vào tài nguyên đó. Lúc này bạn sẽ sử dụng `403 - Forbidden`.

### 8. 202 Accepted:
Mình tin chắc ít ai để ý đến status code này. Tuy nhiên, nó rất hữu ích trong 2 trường hợp sau:
* Nếu tài nguyên sẽ được tạo ra do quá trình xử lý trong tương lai.
* Nếu tài nguyên này đã tồn tại, điều này không nên hiểu là một lỗi.
### 9. PUT vs PATCH:
Một `PUT` request sẽ thay đổi toàn bộ nội dung của một tài nguyên. Trong khi một `PATCH` request được sử dụng trong trường hợp thay đổi một phần nội dung của một tài nguyên.
### 10. Sử dụng URIs một cách nhất quán:
Và đây là điều mình nghĩ sẽ là quan trọng nhất, đó là sự nhất quán. Trong lập trình, nếu bạn làm được việc này thì code của bạn cũng sẽ `clear` và `clean` rất nhiều. Có rất nhiều naming convention trong lập trình (`CamelCase, snake_case, and spinal-case`). Ở đây, các bạn nên sử dụng `spinal-case`  bởi vì nó được sử dụng ở khá nhiều những tổ chức lớn (`Google, Paypal ...`).

### Lời kết:
Trên đây mình đã chắt lọc và viết ra những nguyên tắc theo mình nghĩ là quan trọng để có thể tạo ra những APIs xịn xò. Nếu các bạn thấy hay có thể cho mình một like và nếu có bất cứ thắc mắc gì cũng đừng ngại comment các bạn nhé. Mình sẽ cùng các bạn tìm hiểu và giải đáp những thắc mắc đó. Cảm ơn mọi người rất nhiều :D.

Link các bài viết tham khảo:  https://dev.to/pragativerma18/restful-api-design-best-practices-4mi8 
https://restfulapi.net/resource-naming/

Link bài viết gốc mình để trên Blog của mình nhé : https://chiasekienthuc.netlify.app/blog/10-best-practices-restful-api