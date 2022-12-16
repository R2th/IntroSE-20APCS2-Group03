Nếu là một lập trình viên web chúng ta chắc chắn sẽ phải làm việc rất nhiều với API đặc biệt với các dự án có liên quan đến mobile. Do vậy, việc hiểu các nguyên tắc và các lưu ý để xây dựng các API một cách rõ ràng và dễ dàng sử dụng, thay đổi đối với client là rất quan trọng. Bài viết sẽ tìm hiểu về những lưu ý khi làm việc với api để có thể giúp client "happy" khi sử dụng, có thể đáp ứng yêu cầu về UI. <br>

# 1. Restful các url
RESTful là 1 chuẩn đã được áp dụng cực kì rộng rãi. Các nguyên tắc chính của REST liên quan đến việc tách API của bạn thành các tài nguyên hợp lý. Các tài nguyên này được quản lý và vận hành/thao tác bằng cách sử dụng các request HTTP, trong đó các method (GET, POST, PUT, PATCH, DELETE) có một ý nghĩa cụ thể. Trước khi đi vào cụ thể có một số khái niệm về restAPI <br>
- **Resource** là một object hoặc đại diện cho đối tượng và nó có một tập hợp các methods liên quan đến nó. Ví dụ: employee, user, ... là các resources và delete, add, update là các method để thao tác với các resources.
- **Collections** là một tập hợp các resources. Ví dụ Companies là collections của resource Company  <br>
- **URL (Uniform Resource Locator)** là các đường dẫn mà resource có thể được định vị và các actions liên quan đến nó. <br>
Khi thiết kế một api ta cần xác định được resource. Khi bạn đã xác định được các resource của mình, cần phải xác định những hành động nào áp dụng cho chúng và cách các resource đó map vào API. Nguyên tắc là không rò rỉ các chi tiết implementation không liên quan đến API. Các URL chỉ nên bao gồm các danh từ là các resources chứ không phải là các hành động hoặc là động từ. Ví dụ:<br>
``` java
// tốt
method GET path /companies  get list của tất cả companies
method GET path /companies/1 show chi tiết company 1
method DELETE path /companies/1 xóa company 1

// không tốt
method GET path /getCompanies
method DELETE path /deleteCompanies/1
```
Các resource sẽ để ở dạng số nhiều và các HTTP method sẽ định nghĩa hành động sẽ thao tác với các resource. <br>

### Làm thế nào khi các action không CRUD
Có một số cách thực hiện như sau <br>
1. Cấu trúc lại action sao cho nó như là một trường của resource. Ví dụ: active action có thể map với trường activated thông qua method PATCH của resource
2. Cấu trúc như một sub-resource. Ví dụ giống github cho phép star một repo bằng api `PUT /gists/:id/star` và bỏ sao bằng `DELETE /gists/:id/star`
3. Đôi lúc sẽ không có cách nào để map action đến một cấu trúc RESTful hợp lý. Ví dụ, một action tìm kiếm nhiều tài nguyên sẽ không có cách nào map endpoint tới một tài nguyên cụ thể. Trong trường hợp này, sử dụng `/search` sẽ có ý nghĩa nhất mặc dù nó không phải là tài nguyên. Ta có thể tùy biến trong trường hợp này miễn sao cho api có ý nghĩa nhất và dễ dàng hiểu được. <br>
# 2. Http response code
Khi client gửi một request lên server thông qua API, khi gửi lại client bất kể là thành công hay thất bại ta cần gửi lại http code cho client một cách hợp lý nhất để client có thể biết được kết quả. Ví dụ không nên trả về status là 200 trong khi api đó đang xử lý bị lỗi. <br>
``` java
HTTP/1.1 200 OK
Content-Type: text/html

{
    "status": "failure",
    "data": {
        "error": "..."
    }
}
```
Các chuẩn HTTP code hay sử dụng <br>
**200 Ok** The standard HTTP response representing success for GET, PUT or POST. Respose trong trường hợp success cho GET, PUT hoặc POST <br>
**201 Created** Sử dụng khi tạo một instance thành công cho POST method <br>
**204 No Content**  Sử dụng khi xử lý thành công nhưng không return gì <br>
**3xx (Redirection Category)** <br>
**304 Not Modified**  Sử dụng khi response đã nằm trong cache của client và không cần phải request lại <br>
**4xx (Client Error Category)** <br>
Các status code thể hiện khi client bị request fail <br>
**400 Bad Request** Request của client không được xử lý, server không hiểu được request đó muốn xử lý gì <br>
**401 Unauthorized Client** Cần phải authorize cho request nếu muốn tiếp tục <br> 
**403 Forbidden Client** Đã authorize nhưng không có quyền truy cập tài nguyên muốn lấy. Ví dụ user thông thường đã authorize nhưng request để lấy thông tin của admin <br>
**404 Not Found Request** Báo rằng tài nguyên không tồn tại <br>
**410 Gone** Tài nguyên đã được di chuyển sang chỗ khác <br>
**422 Unprocessable Entity**  Sử dụng cho các lỗi validation <br>
**5xx (Server Error Category)** <br>
**500 Internal Server Error** Request đã hợp lệ nhưng server đang không xử lý được <br>
**503 Service Unavailable**  Server đã bị down hoặc không chấp nhận xử lý request được nữa thông thường là trong trường hợp server đang bảo trì <br>
Chúng ta cần phải sử dụng các status code trên một cách thống nhất. Có thể viết tài liệu trước về các status này trước để thống nhất trường hợp nào sẽ return status nào. <br>
# 3. Rerurn lỗi chi tiết trong body
Khi api của server bắt được lỗi, ta nên return lỗi một cách chi tiết trong JSON body để giúp client có thể debug một cách dễ dàng hơn. Ví dụ <br>
``` java
    {
       "type": "https://example.com/validation-error",
       "title": "Your request parameters didn't validate.",
       "invalid-params": [ {
                             "name": "age",
                             "reason": "must be a positive integer"
                           },
                           {
                             "name": "color",
                             "reason": "must be 'green', 'red' or 'blue'"}
                         ]
   }
```
Nếu không trả về lỗi một cách chi tiết nhất như trên thì cũng cần phải trả về thông tin cơ bản nhất để client biết được đó là lỗi trong trường hợp nào. <br>
# 4. Luôn sử dụng SSL
Luôn luôn sử dụng SSL. Không có ngoại lệ. Ngày nay, các API web của chúng ta có thể được truy cập từ mọi nơi có internet (như thư viện, quán cà phê, sân bay). Không phải tất cả những điều này đều an toàn. Và có rất nhiều nơi không mã hóa thông tin liên lạc, khiến cho việc dễ dàng nghe trộm hoặc giả mạo nếu thông tin xác thực bị tấn công.
Một ưu điểm khác của việc sử dụng SSL là một communication được mã hóa sẽ khiến việc xác thực trở nên đơn giản hơn rất nhiều - có thể authen bằng các access token thay vì việc phải ký vào từng API request.

# 5. snake_case, camelCase cho tên trường
Nếu dùng JSON thì sẽ follow naming conventions của JavaScript. Có nghĩa là camelCase cho tên trường. Hoặc nên sử dụng các quy ước đặt tên theo ngôn ngữ mà build các route - camelCase cho C# và Java, snake_case cho python và ruby. <br>
Dựa vào một số nghiên cứu theo dõi mắt về camelCase và snake_case từ năm 2010, snake_case dễ đọc hơn 20% so với camelCase. Khả năng dễ đọc này sẽ tác động đến việc người sử dụng API đọc tài liệu APIs. HIện nay, rất nhiều APIs JSON nổi tiếng sử dụng snake_case.
# 6. Filtering, sorting, searching kết quả
**Filtering** : Sử dụng một param unique cho mỗi mỗi trường cần implement filteing. Ví dụ, khi một request list các tickets từ endpoint /tickets ,  muốn giới hạn số lượng tickets được trả về là phải ở trang thái open. Nó có thể được thực hiện với một request GET như sau `GET /tickets?state=open`. Ở đây state chính là param thực hiện việc filter.
**Sorting** Tương tự với filtering, một param chung sort có thể được sử dụng để mô tả rule sort. Đảm bảo các yêu cầu sort phức tạp bằng cách cho phép các param sort nằm trong danh sách cách nhau bởi dấu phẩy, mỗi ô có thể là một số ấm để thể hiện thứ tự giảm dần. Ví dụ: <br>
GET /tickets?sort=-priority- Lấy list các tickets theo thứ tự giảm dần <br>
GET /tickets?sort=-priority,created_at - Lấy list các tickets theo thứ tự giảm dần theo created_at <br>
**Searching** Thỉnh thoảng, các filter cơ bản sẽ là ko đủ, cần search text. Có thể  sử dụng ElasticSearch hoặc các công nghệ tìm kiếm dưạ trên Lucene khác. Khi một full text search được sử dụng như một cơ chế để lấy dữ liệu tài nguyên đối với loại tài nguyên cụ thể, thì nó có thể được hiển thị trên API như là một param query trên endpoint của tài nguyên. Hãy truyền vào param q. Search query sẽ được truyền thẳng tới search engine và API output sẽ có cùng format với list kết quả thông thường.
Kết hợp lại <br>
GET /tickets?sort=-updated_at - Lấy list các tickets được update gần đây <br>
GET /tickets?state=closed&sort=-updated_at - Lấy list các ticket được update close gần đây <br>
GET /tickets?q=return&state=open&sort=-priority,created_at - Lấy các open tickets với ưu tiên ngày created_at và có chữ cái 'return'
# 7. Đánh version cho API
Luôn luôn đánh version của API vì version giúp ngăn các yêu cầu không hợp lệ khi truy cập vào các endpoint đã được update. Nó cũng giúp quá trình thay đổi phiên bản API một cách dễ dàng trong khi có thể tiếp tục cung cấp các phiên bản API cũ trong một khoảng thời gian. <br>
Có 2 cách phổ biến để đánh version đó là truyền vào bằng header thông tin version hoặc là thông qua path của URI. Cách sau thường được sử dụng hơn vì tính dễ đọc, dễ extend. Ví dụ một số URI được đánh version <br>
``` java
    https://us6.api.mailchimp.com/3.0/ (major + minor version)
    https://api.stripe.com/v1/ (major version)
    https://developer.github.com/v3/  (major version)
    https://api.twilio.com/2010-04-01/ (version theo date)
```
Một API sẽ không bao giờ được hoàn toàn ổn định. Thay đổi là không thể tránh khỏi. Điều quan trọng là làm thế nào thay đổi này được quản lý một cách cẩn thận.
# 8. Tài liệu API docs
Tài liệu docs của API sẽ vô cùng quan trọng khi các api được public. Bởi vì không chỉ các developer sẽ dựa vào đó để biết cách sử dụng, tích hợp mà còn cho các đối tượng rộng hơn sử dụng chúng <br>
API docs cần cung cấp các thông tin đầy đủ về endpoint, method sử dụng, các params khi request và các response trả về trong từng trường hợp đi kèm với status code. <br>
Cũng cần nhớ rằng tài liệu docs API chính là cách show cho khách hàng biết sự quan tâm đến các api. Khi tài liệu được viết một cách cẩn thận, tỉ mỉ, có thể dễ dàng sử dụng thì sẽ có nhiều client sử dụng chúng hơn. <br>
Một số api docs tốt có thể tham khảo <br>
[Mailchimp](https://developer.mailchimp.com/documentation/mailchimp/guides/get-started-with-mailchimp-api-3/) <br>
[Twilio](https://www.twilio.com/docs/) <br>
[Stripe](https://stripe.com/docs) <br>

# References
https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9 <br>
https://www.merixstudio.com/blog/best-practices-rest-api-development/ <br>
https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api <br>
https://florimond.dev/blog/articles/2018/08/restful-api-design-13-best-practices-to-make-your-users-happy/ <br>