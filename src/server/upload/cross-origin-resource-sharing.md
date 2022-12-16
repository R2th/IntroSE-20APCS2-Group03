Cross-Origin Resource Sharing (CORS) là một giao thức cho phép các script chạy trên trình duyệt tương tác với các tài nguyên từ một nguồn gốc khác. Việc này rất hữu ích vì `XMLHttpRequest ` và `fetch` thực thi chính sách same-origin dẫn đến Javascript chỉ có thể thực hiện các cuộc gọi đến các URL có cùng nguồn gốc với vị trí của script đang chạy. Ví dụ nếu một ứng dụng Javascipt muốn tạo một cuộc gọi AJAX đến một API trên một domain khác, nó sẽ bị chặn theo chính sách same-origin.

Nhưng tại sao điều này là cần thiết, nó hoạt động như thế nào?

## CORS - Tại sao nó cần thiết?
Hầu như các script chạy trên trình duyệt chỉ cần truy cập đến các tài nguyên có cùng nguồn gốc với script đó. Vì vậy, việc JavaScript thường không thể truy cập tài nguyên trên các nguồn gốc khác là một điều tốt cho bảo mật. Trong trường hợp này, "nguồn gốc khác" nghĩa là những URL được truy cập khác với vị trí của Javascipt đang chạy:
* Một scheme khác (HTTP hay HTTPS)
* Một domain khác
* Một port khác

Tuy nhiên, có những kịch bản hợp pháp trong đó việc truy cập nguồn gốc khác là điều mong muốn hoặc thậm chí là cần thiết. Ví dụ bạn đang chạy React SPA tạo các cuộc gọi đến API backend chạy trên một domain khác.
## Định nghĩa một CORS Response
Khi một máy chủ đã được cấu hình đúng để cho phép chia sẻ tài nguyên chéo nguồn gốc, một số header đặc biệt sẽ được thêm vào. Các header đó sẽ được sử dụng để nhận biết request hỗ trợ CORS. Trình duyệt web sẽ sử dụng những header này để xác định một `XMLHttpRequest` có được tiếp tục hay không.

Header chính xác định ai có thể truy cập tài nguyên là `Access-Control-Allow-Origin`. Ví dụ, để cho phép truy cập từ bất kỳ nguồn nào, bạn có thể đặt header như sau:
```
Access-Control-Allow-Origin: *
```
Hoặc có thể là một nguồn cụ thể:
```
Access-Control-Allow-Origin: https://example.com
```
## Các loại CORS request
Có 2 loại CORS request: "simple" request và "preflight" request và trình duyệt sẽ xác định cái nào được sử dụng. Là một developer, bạn không cần quan tâm loại nào được sử dụng khi tạo request đến server. Tuy nhiên, bạn vẫn có thể biết được loại request nào được gửi đi bằng việc xem network log. Vì nó có thể có tác động hiệu suất đến ứng dụng của bạn, có thể có lợi cho bạn khi biết tại sao và khi nào các request này được gửi.

### Simple requests (GET, POST, và HEAD)
Trình duyệt coi request là một "simple" request khi request đó thỏa mãn các yêu cầu sau:
* Một trong những phương thức sau được sử dụng: GET, POST, hay HEAD
* Một CORS safe-listed header được sử dụng
* Khi sử dụng Content-Type header, chỉ những giá trị sau được cho phép: `application/x-www-form-urlencoded`, `multipart/form-data`, hay `text/plain`
* Không có event listener nào được đăng ký trên bất kỳ đối tượng `XMLHttpRequestUpload` nào.
* Không có đối tượng  `ReadableStream` nào được sử dụng trong request.

Request được cho phép tiếp tục nếu đáp ứng các tiêu chí này, và header `Access-Control-Allow-Origin` được kiểm tra khi respose được trả về.
### Preflight requests (OPTIONS)
Nếu một request không đáp ứng được tiêu chí cho một simple request, trình duyệt sẽ tự động tạo một preflight request sử dụng phương thức `OPTIOINS`. Cuộc gọi này được sử dụng để xác định xem server đã thực sự thực hiện CORS hay chưa. Nếu kết quả của cuộc gọi `OPTIONS` báo hiệu rằng không thể thực hiện request thì request thực sự đến server sẽ không được thực hiện.

preflight request đặt chế độ là `OPTIONS` và một loạt header mô tả requet thực sự sẽ phải tuân theo:

* `Access-Control-Request-Method`: Phương thức dự định của request (ví dụ GET hay POST)
* `Access-Control-Request-Headers`: Các custom header sẽ được gửi cùng với request
* `Origin`: origin header chứa origin hiện tại của script

Dưới đây là một ví dụ của request như vậy:
```
# Request
curl -i -X OPTIONS localhost:3001/api/ping \
-H 'Access-Control-Request-Method: GET' \
-H 'Access-Control-Request-Headers: Content-Type, Accept' \
-H 'Origin: http://localhost:3000'
```

Request này thực hiện một GET request với `Content-Type` và `Accept` header từ `http://localhost:3000`.

Server sẽ chèn một vài `Access-Control-*` header trong response để cho biết request tiếp theo có được cho phép hay không, bao gồm:
* `Access-Control-Allow-Origin`: origin được cho phép tạo request.
* `Access-Control-Allow-Methods`: các phương thức http được cho phép.
* `Access-Control-Allow-Headers`: các custom header được cho phép để gửi.
* `Access-Control-Max-Age`: Thời lượng tối đa mà response cho request preflight có thể được lưu trong bộ đệm trước khi thực hiện cuộc gọi khác

Response cho request trên dạng như sau:
```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Vary: Access-Control-Request-Headers
Access-Control-Allow-Headers: Content-Type, Accept
Content-Length: 0
Date: Fri, 05 Apr 2019 11:41:08 GMT
Connection: keep-alive
```

Ở đây, `Access-Control-Allow-Origin` là `*` tức là cho phép request từ bất kỳ origin nào. `Access-Control-Allow-Methods` mô tả chỉ cho phép các HTTP methods.  Nếu một HTTP method nào không được cho phép, nó sẽ không xuất hiện trong list trên. `Access-Control-Allow-Headers` trả lời các header nào được cho phép trong câu hỏi của `OPTIONS` request. Điều đó có nghĩa là tất cả các header được yêu cầu bởi `OPTIONS` request được cho phép. Nếu server không cho phép `Accept` header thì trong respone trả về `Access-Control-Allow-Headers` sẽ chỉ có `Content-Type` và trình duyệt sẽ chặn cuộc gọi.
## Kết luận
Hy vọng những điều trên đây sẽ giúp ích được cho các bạn, cũng như lý giải được thắc mắc của một số bạn về CORS từ trước đến giờ.
## Tham khảo
[https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/](https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/)