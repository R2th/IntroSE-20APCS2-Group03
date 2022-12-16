## What is a RESTful API?
Mọt RESTful API cần thỏa mã được các yêu cầu sau để được gọi là RESTful API.

1. **Client - Server**: API RESTful tuân theo mô hình client - server trong đó server cung cấp data và client kết nối với máy chủ để sử dụng data. Sự tương tác giữa client và server thông qua các request  HTTP (S) transfer dữ liệu được yêu cầu.

2. **Stateless**: Quan trọng hơn, một RESTful API phải stateless. Mỗi request được coi là một standalone requet. Server không nên theo dõi bất kỳ internal state nào có thể ảnh hưởng đến kết quả của các request khác trong tương lai.

3. **Uniform interface**: Cuối cùng uniformity xác định cách thức tương tác giữa client và server. Các RESTful API define các best practice để đặt tên cho resource nhưng define các HTTP operation cố định cho phép bạn sửa đổi / tương tác với resource. Các HTTP operation sau có thể được truy cập trong các RESTful API:

* request GET: truy xuất tài nguyên
* request POST: tạo tài nguyên hoặc gửi thông tin đến API
* request PUT: tạo hoặc thay thế tài nguyên
* request PATCH: cập nhật tài nguyên hiện có
* request DELETE: xóa tài nguyên

## Best Practices For Designing Your First RESTful API
### 1. Use HTTP methods correctly
Chúng ta đã thảo luận về các phương thức HTTP khả thi mà bạn có thể sử dụng để modify resource: GET, POST, PUT, PATCH và DELETE.

Tuy nhiên, nhiều developer có xu hướng lạm dụng GET và POST hoặc PUT và PATCH. Có thể bạn đã gặp các developer sử dụng request POST để lấy dữ liệu. Hoặc, chúng ta có thể thấy các developer sử dụng một request PUT để thay thế resource trong khi họ chỉ muốn cập nhật một trường duy nhất cho resource đó.

Hãy đảm bảo sử dụng phương thức HTTP chính xác nếu không điều này sẽ gây thêm nhiều nhầm lẫn cho các developer sử dụng RESTful API của bạn. Tốt hơn là bạn nên tuân theo các nguyên tắc đã định.

### 2. Naming conventions
Hiểu các quy ước đặt tên RESTful API sẽ giúp bạn rất nhiều trong việc thiết kế API của mình một cách có tổ chức. Thiết kế một RESTful API theo các resource mà bạn cung cấp.

Ví dụ: API của bạn quản lý author và book, bây giờ, chúng ta muốn thêm một author mới hoặc truy cập thông tin một author có ID là 3. Bạn có thể thiết kế các router sau để phục vụ các mục đích này:
* `api.com/addNewAuthor`
* `api.com/getAuthorByID/3`

Hãy tưởng tượng một API lưu trữ nhiều resource mà mỗi resource có nhiều thuộc tính. Danh sách các endpoint có thể có sẽ trở nên vô tận và không thân thiện với người dùng. Vì vậy, chúng ta cần một cách thiết kế endpoint API có tổ chức và chuẩn hóa hơn.
Các phương pháp hay nhất của RESTful API mô tả rằng một endpoint phải bắt đầu bằng tên resource, trong khi HTTP operation mô tả hành động. Áp dụng chúng ta được:
* POST `api.com/authors`
* GET `api.com/authors/3`

Điều gì sẽ xảy ra nếu chúng ta muốn truy cập tất cả các book mà author có ID là 3 đã từng viết? Cũng đối với trường hợp này, các API RESTful có một giải pháp:
* GET `api.com/authors/3/books`

Cuối cùng, điều gì sẽ xảy ra nếu bạn muốn xóa một book có ID 5 cho một author có ID 3. Một lần nữa, hãy làm theo cùng một cách tiếp cận có cấu trúc để tạo endpoint như sau:
* DELETE `api.com/authors/3/books/5`

Tóm lại, hãy sử dụng các HTTP operation và cách lập bản đồ structure resource để tạo thành một endpoint path dễ đọc và dễ hiểu. Ưu điểm lớn của phương pháp này là mọi developer đều hiểu cách các RESTful API được thiết kế và họ có thể ngay lập tức sử dụng API mà không cần phải đọc tài liệu của bạn trên mỗi endpoint.

### 3. Use plural resources
Các resource phải luôn sử dụng dạng số nhiều của chúng. Tại sao? Hãy tưởng tượng bạn muốn truy xuất tất cả các author. Do đó, bạn sẽ gọi endpoint sau: GET `api.com/authors`.

Khi bạn đọc request, bạn không thể biết liệu API response sẽ chỉ chứa một hay tất cả các tác giả. Vì lý do đó, các endpoint API nên sử dụng resource số nhiều.

### 4. Correct use of status codes
Status code không chỉ để mua vui. Chúng có mục đích rõ ràng, status code thông báo cho client về sự thành công hay thất bại của request.

Các loại mã trạng thái phổ biến nhất bao gồm:
* 200 (OK): Request đã được xử lý và hoàn tất thành công.
* 201 (Created): Biểu thị việc tạo resource thành công.
* 400 (Bad Request): Đại diện cho lỗi phía client. Có nghĩa là, request đã không đúng định dạng hoặc thiếu các tham số.
* 401 (Unauthorized): Bạn đã cố gắng truy cập vào một resource mà bạn không có quyền.
* 404 (Not Found): Resource được request không tồn tại.
* 500 (Internal Server Error): Bất cứ khi nào server throw ra một Exception trong quá trình thực thi request.

Bạn có thể tìm thấy danh sách đầy đủ các mã trạng thái tại Mozilla Developers. Đừng quên kiểm tra mã trạng thái “I’m a teapot” (418).

### 5. Follow casing conventions
Thông thường nhất, một RESTful API phân phát JSON data. Do đó, quy ước về camelCase nên được thực hành. Tuy nhiên, với các ngôn ngữ lập trình khác nhau thì có thể sử dụng các quy ước đặt tên khác nhau.

### 6. How to handle searching, pagination, filtering, and sorting
Các hành động như tìm kiếm, phân trang, lọc và sắp xếp không đại diện cho các endpoint riêng biệt. Những hành động này có thể được thực hiện thông qua việc sử dụng các paramater truy vấn được cung cấp cùng với API request.

Ví dụ: hãy truy xuất tất cả các author được sắp xếp với tên theo thứ tự tăng dần. Request API của bạn sẽ giống như sau: `api.com/authors?sort=name_asc`.

Hơn nữa, ta muốn truy xuất một author có tên ‘Michiel’. Request có dạng như thế này `api.com/authors?search=Michiel`

May mắn thay, nhiều dự án API đi kèm với khả năng tìm kiếm, phân trang, lọc và sắp xếp được tích hợp sẵn. Điều này sẽ giúp bạn tiết kiệm rất nhiều thời gian.

### 7. API versioning
Ta không thấy điều này thường xuyên, nhưng đó là phương pháp hay nhất để phiên bản API của bạn. Đó là một cách hiệu quả để truyền đạt những thay đổi đột phá cho người dùng của bạn.

Thông thường, số phiên bản của API được kết hợp trong URL API, như sau: `api.com/v1/authors/3/books`

### 8. Send metadata via HTTP headers
HTTP header cho phép client gửi thông tin bổ sung với request của họ. Ví dụ: header `Authorization` thường được sử dụng để gửi dữ liệu xác thực để có thể truy cập API.

Bạn có thể tìm thấy danh sách đầy đủ tất cả các HTTP header có thể có tại [đây](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

### 9. Rate Limiting
Rate limiting là một cách tiếp cận thú vị để kiểm soát số lượng request trên mỗi client. Đây là những Rate limiting  header có thể có mà server của bạn có thể trả về:

* X-Rate-Limit-Limit: Cho biết số lượng request mà client có thể gửi trong một khoảng thời gian cụ thể.
* X-Rate-Limit-Remaining: Cho biết số lượng reqiuest mà client vẫn có thể gửi trong khoảng thời gian hiện tại.
* X-Rate-Limit-Reset: Cho client biết khi nào giới hạn tỷ lệ sẽ đặt lại.

### 10. Meaningful error handling
Trong trường hợp xảy ra sự cố, điều quan trọng là bạn phải cung cấp một thông báo lỗi có ý nghĩa cho developer. Ví dụ: Twilio API trả về định dạng lỗi như sau:

```
{
    "status": 400,
    "message": "Resource books does not exist",
    "code": 24801,
    "more_info": "api.com/docs/errors/24801"
}
```

Trong ví dụ này, server trả về status code và message lỗi dễ hiểu. Hơn nữa, một internal error code cũng được trả về để developer tìm kiếm lỗi cụ thể. Điều này cho phép developer nhanh chóng tra cứu thêm thông tin về lỗi.

### 11. Choose the right API framework
Nhiều framework tồn tại cho các ngôn ngữ lập trình khác nhau. Điều quan trọng là chọn một framework hỗ trợ các phương pháp hay nhất của RESTful API.

Đối với Node.js, các  back-end developer thích sử dụng Express.js, trong khi đối với Python, Falcon là một lựa chọn tuyệt vời.

### 12. Document your API
Cuối cùng, hãy viết tài liệu, đó vẫn là một trong những cách dễ nhất để transfer kiến thức về API mới được phát triển của bạn.

Mặc dù API của bạn tuân theo tất cả các phương pháp hay nhất được nêu cho RESTful API, nhưng vẫn đáng để bạn ghi lại các yếu tố khác nhau như resource mà API của bạn xử lý hoặc rate limits áp dụng cho server của bạn.

Hãy nghĩ về các developer khác. Tài liệu làm giảm đáng kể thời gian cần thiết để tìm hiểu về API của bạn.

### 13. Keep it simple!
Đừng phức tạp hóa API của bạn và giữ các resource đơn giản. Định nghĩa thích hợp về các resource khác nhau mà API của bạn xử lý sẽ giúp bạn tránh được các vấn đề liên quan đến resource trong tương lai. Xác định resource của bạn, nhưng cũng xác định chính xác các thuộc tính của nó và mối quan hệ giữa các resource. Bằng cách này, không có chỗ để tranh cãi về cách kết nối các resource khác nhau.

## References
https://www.sitepoint.com/build-restful-apis-best-practices/