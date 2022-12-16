REST API hay RESTful API là một cái gì đó mà nếu bạn làm về web thì bạn không gặp một lần thì bạn gặp nhiều lần, nói chung là rất rất nhiều lần rồi đúng không..!!!

## Web Service là gì?

Trước khi bàn về RESTful chúng ta sẽ bàn sơ về web service. 

Bạn vào chrome và gõ [https://j17lt.csb.app/](https://j17lt.csb.app/) thì giao diện hiển thị danh sách users, đó là nội dùng bình thường mà bạn (*người dùng cuối*) và xem.

Trong khi đó **Web Service** là một dịch vụ web, nó cung cấp các thông tin thô, và khó hiểu với đa số người dùng và vì vậy nó được sử dụng bởi các ứng dụng (Web front end, app di động). Các ứng dụng này sẽ chế biến các dữ liệu thô trước khi trả về cho bạn (*người dùng cuối*). Bạn có thể vào [https://reqres.in/api/users?page=2](https://reqres.in/api/users?page=2) để xem dữ liệu này nó như thế nào..  

Các **Web Service** thường cung cấp các dữ liệu thô mà nó khó hiểu đối với đa số người dùng thông thường, chúng thường được trả về dưới dạng `XML` hoặc `JSON`.

## Resource là gì?

**Resource** là **tài nguyên**!!! :V :V

Và quản lý **tài nguyên** chính là nhiệm vụ quan trọng và chiếm phần lớn thời gian trong việc phát triển website.

Trong đó **resource** của các *website khác nhau* thì có thể sẽ *khác nhau*, ví dụ:
    
- **Facebook**: **resource** nó có thể là người dùng, fanpage....
- **Tiki**: thì có thể là sản phẩm, người dùng....
- **Blog của Sói**: Thì là mấy cái bài viết linh tinh của sói...

Và quản lý một resource của một website bao gồm 4 tác vụ chính:

- Thêm một resource.
- Lấy thông tin một resource.
- Cập nhật một resource.
- Xoá một resource.

Từ đó ta lại qua phần tiếp theo...

## Các phương thức HTTP.

Các phương thức HTTP *(HTTP request methods)* là một phần của thế giới hiện nay, tuy nhiên những người biết về nó thì chỉ có lập trình viên.

GET hay POST thì nó quá nổi tiếng rồi nên mình sẽ nói riêng về nó ở một bài khác.

Có tất cả 9 loại request, GET và POST là 2 loại thông dụng được sử dụng nhiều hiện này:

- **GET**: được sử dụng để lấy thông tin từ sever theo URI đã cung cấp.
- **HEAD**: giống với GET nhưng response trả về không có body, chỉ có header.
- **POST**: gửi thông tin tới sever thông qua các biểu mẫu HTTP.
- **PUT**: ghi đè tất cả thông tin của đối tượng với những gì được gửi lên.
- **PATCH**: ghi đè các thông tin được thay đổi của đối tượng.
- **DELETE**: xóa tài nguyên trên server.
- **CONNECT**: thiết lập một kết nối tới server theo URI.
- **OPTIONS**: mô tả các tùy chọn giao tiếp cho resource.
- **TRACE**: thực hiện một bài test loop - back theo đường dẫn đến resource.

Nói thật thì ngoài GET, POST, PUT, PATCH, DELETE thì mấy cái còn lại mình chưa từng sử dụng.

Vậy giờ quay lại cái phần **Resource là gì?** bên trên ta có thể dễ dàng thấy:

- Thêm một resource. (Ta dùng POST)
- Lấy thông tin một resource. (Ta dùng GET)
- Cập nhật một resource. (Ta dùng PUT hay PATCH)
- Xoá một resource. (Ta dùng DELETE)

Cớ mà để lấy thông tin một bài viết có id là `22` thì mình có cả trăm ngàn cách để xem, ví dụ như:

- Gửi một request tới URL `http://example.com/posts?id=22` với HTTP method là GET
- Gửi một request tới URL `http://example.com/posts/22` với HTTP method là GET
- Gửi một request tới URL `http://example.com/action=view_post&id=22` với HTTP method là GET
- Gửi một request tới URL `http://example.com/view_post&id=22` với HTTP method là GET
- Gửi một request tới URL `http://example.com/posts?id=22` với HTTP method là POST
- Gửi một request tới URL `http://example.com/posts/22` với HTTP method là POST
- ...

Và sau hàng trăm, triệu năm như thế thì người ta đã có một vài  tiêu chuẩn để thống nhất cách quản lý tài nguyên. Các tiêu chuẩn này (hay còn được gọi là Web API hoặc HTTP API) quy định một cách thống nhất việc quản lý các tài nguyên của trang web. Và RESTful là một trong các web API được sử dụng phổ biến ngày nay.

## RESTful API là gì?

Cuối cùng cũng tới phần quan trọng nhất!!! Mừng quá... :V : 

### Nguyên tắc thiết kế của REST API?

#### 1. Dùng HTTP method rõ ràng như sau.

Chúng ta có 4 HTTP method cơ bản bao gồm POST, GET, PUT, DELETE. Với mỗi method sẽ ứng với một chức năng tương ứng của API là tạo, đọc, sửa và xoá. Như sau nè: 

![Nguyên tắc](https://cdn-images-1.medium.com/max/800/1*YRFNzFCvu0gdRHWoTOctPw.png)

Đó là một nguyên tắt nhỏ nếu bạn muốn API mình rõ ràng.

#### 2. Sử dụng danh từ số nhiều và không sử dụng động từ.

Ví dụ như */dogs*, */cats*,...  chứ không phải là */getAllDog*,...

#### 3. Chỉ sử dụng danh từ số nhiều.

Không vừa dùng số nhiều vừa dùng số ít.

#### 4. Versioning

Versioning là một điều bắt buộc với tất cả resource, việc đánh version cho resource tuân thủ 2 nguyên tắc sau:

- Bắt đầu bằng “v” và kết thúc bằng một số nguyên dương , tránh dùng số thập phân (dùng v1 thay vì v1.5)
- Versioning sẽ được đặt ở vị trí đầu tiên của resource


#### 5. HTTP status code và error message

Chuẩn HTTP cung cấp cho ta rất nhiều status code. Chúng ta sẽ không cần biết hết tất cả nhưng ít nhất nên biết đến những status code:

- 200 — OK — Everything is working
- 304 — Not Modified — The client can use cached data
- 400 — Bad Request — The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“
- 401 — Unauthorized — The request requires an user authentication
- 403 — Forbidden — The server understood the request, but is refusing it or the access is not allowed.
- 404 — Not found — There is no resource behind the URI.
- 422 — Unprocessable Entity — Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
- 500 — Internal Server Error — API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.

## Rồi REST rồi REST(ful)

Cái gì mà REST rồi còn RESTful?

> REST là viết tắt của cụm từ Representational State Transfer và các ứng dụng sử dụng kiểu thiết kế REST thì được gọi là RESTful (-ful là tiếp vị ngữ giống như beauty và beautiful). Tất nhiên bạn cũng có thể sử dụng thuật ngữ REST thay cho RESTful và ngược lại.

Dài thật là dài và dài thật dài, mệt quá... :V :v

Ref: [https://f97.xyz/cau-chuyen-cua-restful-api/](https://f97.xyz/cau-chuyen-cua-restful-api/)