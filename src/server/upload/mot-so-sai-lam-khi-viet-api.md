Gần đây, mình có làm qua các task cần sử dụng khá nhiều các **API từ bên thứ ba**. Trong quá trình sử dụng mình phát hiện ra một số **sai lầm** của lập trình viên khi viết **API**. Nhân tiện sự kiện MayFest lần này, hi vọng bài viết sẽ là giúp ích được cho mọi người trong quá trình viết **API** để tránh khỏi những lỗi cơ bản gây khó khăn cho người sử dụng chúng.

Thường thì khi viết **API** mọi người hãy **cố gắng đừng sáng tạo cả gì**, hãy tìm tòi các **chuẩn thiết kế** hoặc những tài liệu đã định nghĩa sẵn để có thể đáp ứng nhu cầu cao nhất của các bên sử dụng **API**, tuân thủ theo chuẩn **RESTful** là một lựa chọn không tồi.

# 1. Cấu trúc trả về 
Đứng từ góc độ của **FE dev** hay người sử dụng **API**, mình mong muốn tất các các trường trả về dữ liệu thực tế cho dù nó có là có giá trị hay không. Và kiểu dữ liệu trả về cũng được đồng nhất. Hay nói một cách khác endpoint cần trả về đầy đủ các **entity**. Nếu không, ít nhất bạn nên đảm bảo rằng trong object có chứa tất cả các trường ngay cả khi nó trống.
```php
// Bad
[
    {
        "id": "1",
        "email": "example1@gmail.com",
        "firstname": "John",
        "phone_code": "RU",
    },
    {
        "id": "2",
        "email": "example2@gmail.com",
        "firstname": "John",
        "lastname": "Smith",
        "timezone": "UTC",
        "phone_code": "RU",
    }
]
// Good
[
    {
        "id": "1",
        "email": "example1@gmail.com",
        "firstname": "John",
        "lastname": "",
        "timezone": "",
        "phone_code": "RU",
    },
    {
        "id": "2",
        "email": "example2@gmail.com",
        "firstname": "John",
        "lastname": "Smith",
        "timezone": "UTC",
        "phone_code": "RU",
    }
]
```
Như ví dụ mình nêu bên trên, kể cả khi **lastname** và **timezone** có trả về **null** đi nữa, hãy cứ trả về giá trị và đừng lược bỏ bớt đi. Chúng tôi không cần sự **dynamism** và ngắn gọn ở đây.
# 2. Phân trang
Bạn có vẻ thấy điều này rất bình thường nhưng trong thực tế, khi làm việc với bên thứ 3 cung cấp **API**, không ít bên **không sử dụng phân trang trong quá trình trả về dữ liệu**. Điều này thường gây khó khăn cho các bên sử dụng **API** đối với các dữ liệu lớn. Một số tips để làm phân trang hiệu quả hơn như sau.
* Nên cho phép người dùng tự lựa chọn giữa **số lượng** và **chất lượng** của các **requests**. Người dùng muốn hiển thị nhiều bản ghi thì phải đợi nhiều hơn so với việc hiển thị ít bản ghi. Ngoài ra việc cho phép người dùng lựa chọn số lượng cũng sẽ đáp ứng được nhu cầu hiển thị khác nhau của người dùng khác nhau
* Đặt tên rõ ràng và không đổi của các biến phân trang, ví dụ: **page_number** - số trang hiện tại; **page_size** - kích thước bước phân trang; **pages_total_count** - tổng số trang.

***Hãy nhớ xử lí phân trang mỗi khi trả về dữ liệu dạng danh sách các bạn nhé***
# 3. Ngày giờ
Đối với các trường hợp cần trả về giá trị thời gian, ngoài việc trả về giá trị thực tế thì còn phải chỉ định **múi giờ** sử dụng trong project. Điều này cũng gây bất cập với những múi giờ khác nhau. Để cho đơn giản, bạn có thể trả về giá trị **Unix Time**.

```php
//Bad
{
    "created_at" => '16/09/2021' 
}
//Good
{
    "created_at": 1523556863
}
```

# 4. Xử lí message lỗi
Ngay cả với các api mà không có **docs**, đâu đó cũng đoán được lỗi trả về và cách debug. Nhưng sẽ hoàn hảo và để thuận tiện hơn trong quá trình sử dụng API, sẽ tốt hơn nếu các bạn trả về **một thông báo rõ ràng về message lỗi** cho phía người sử dụng API. Ví dụ API tạo user, thay vì trả về mỗi **status code 422** bạn có thể trả về **tên trường truyền lên không hợp lệ**.

**Bad Error**
```php
HTTP/1.1 422 Unprocessable Entity
{
    “error”: Invalid Attribute
}
```

**Good Error**
```php
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/vnd.api+json
{
    "errors": [
        {
            "status": "422",
            "source": { "pointer": "/data/attributes/first-name" },
            "title": "Invalid Attribute",
            "details": "First name must contain min three chars."
        }
    ]
}
```
# 5. HTTP status codes
Một vấn đề muôn thủa khi viết **API** là định nghĩa các **status code**. Mỗi cá nhân, mỗi dự án lại định nghĩa ra **một con số khác nhau** dẫn đến khó khăn cho người tiếp cận **API**. Thực tế việc quyết định status là gì đã được chỉ rõ ở tài liệu [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231#section-6). Hãy tuân thủ theo chúng và đừng cố gắng thay đổi hay sáng tạo gì thêm 

* ***200 (OK)*** — success, handle responded data. Thành công, trả về data đã được xử lí
* ***500 (Internal Server Error)*** — Lỗi từ phía server
* ***400 (Bad Request)*** — Sai định dạng của request truyền lên. Vui lòng kiểm tra lại docs
* ***401 (Unauthorized)*** — Thông tin đăng nhập sai, hãy kiểm tra lại hoặc nếu token đã hết hạn, hãy làm mới.
* ***403 (Forbidden)*** — Hành động không được phép từ phía người dùng
* ***404 (Not Found)*** — Bản ghi không tồn tại trong database hoặc không phải của user đó
* ***405 (Method Not Allowed)*** — Không đúng method quy định. Ví dụ api với method get lại truyền lên với method post
# 6. API limits
Nếu bạn có ý định giới hạn số lượng request trong **API** của mình, tôi muốn thấy thông báo lỗi rõ ràng khi tôi đã **đạt đến giới hạn**. Sẽ tốt hơn nếu API endpoint của bạn thể hiện điều này, khi đó client không cần phải tính toán **số lượng request API**. Bạn nên hiển thị thông tin về các lệnh gọi API có sẵn trong **Header**.
```php
X-RateLimit-Limit - Số request giới hạn mỗi giờ
X-RateLimit-Remaining - Số request còn lại được sử dụng

```
# 7. Tổng kết
Vậy là mình đã đi qua các lỗi cơ bản khi làm việc với API bên thứ 3. Về cơ bản thì đối với các công việc cần phục vụ cho nhiều người dùng ở nhiều project khác nhau. Để đơn giản hóa và tránh việc phải customize nhiều, hãy tuân thủ theo những nguyên tắc có sẵn để công việc trở lên đơn giản hơn nhé.

**Chúc các bạn code vui, khỏe, giải trí !!!**