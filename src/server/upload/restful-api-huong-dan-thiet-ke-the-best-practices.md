Facebook, Google, GitHub, Netflix và một vài gã khổng lồ công nghệ khác đã cho các developers và các products cơ hội sử dụng dữ liệu của họ thông qua các API và trở thành nền tảng cho họ.

Ngay cả khi bạn không viết API cho các developers và các products khác, nó vẫn luôn rất tốt cho ứng dụng của bạn để có thể tạo thủ công một API đẹp mắt.

Có một cuộc tranh luận kéo dài trên internet về những cách tốt nhất để thiết kế API và đó là một trong những sắc thái tốt nhất. Không có guidelines chính thức được xác định.

API là một interface mà thông qua đó nhiều developers tương tác với dữ liệu. Một API được thiết kế tốt luôn rất dễ sử dụng và làm cho cuộc sống của nhà phát triển rất trơn tru.

API là GUI dành cho các developers, nếu nó khó hiểu hoặc rườm rà, thì developer sẽ bắt đầu tìm giải pháp thay thế hoặc ngừng sử dụng nó. Kinh nghiệm của các developers là thước đo quan trọng nhất để đo lường chất lượng của các API.

API giống như một nghệ sĩ biểu diễn trên sân khấu và người dùng của nó là khán giả.

### Terminologies

Sau đây là các điều khoản quan trọng nhất liên quan đến REST APIs.

* *Resource* là một object hoặc đại diện của một cái gì đó có một số dữ liệu liên quan với nó và có thể có một tập hợp các phương thức để vận hành trên nó. Ví dụ. động vật, trường học và nhân viên là tài nguyên và xóa, thêm và cập nhật là các hoạt động được thực hiện trên các tài nguyên này.
* *Collection* là một tập hợp các resouces, ví dụ: công ty là tập hợp các nguồn lực của công ty.
* URL (Uniform Resource Locator) là một đường dẫn qua đó tài nguyên có thể được định vị và các hành động có thể được thực hiện trên đó.

### API Endpoint

Hãy viết một vài APIs cho công ty có một vài nhân viên để hiểu thêm:

```/getAllEmployees``` là một API sẽ phản hồi với danh sách nhân viên. Một vài API nữa xung quanh một công ty sẽ trông như sau:

* ```/addNewEmployee```
* ```/updateEmployee```
* ```/deleteEmployee```
* ```/deleteAllEmployees```
* ```/promoteEmployee```
* ```/promoteAllEmployees```

Và sẽ có hàng tấn các API endpoint khác như thế này cho các operations khác nhau. Tất cả những thứ đó sẽ chứa nhiều hành động dư thừa. Do đó, tất cả các API endpoint này sẽ rất nặng nề để maintain khi số lượng API tăng.

**What is wrong?**

URL chỉ nên chứaresources (danh từ), không phải hành động (action) hoặc động từ. Đường dẫn API ```//addNewEmployee``` chứa hành động ```addNew``` cùng với tên resource ```Employee```.

**What is the correct way?**

 ```/companies``` endpoint  là một ví dụ tốt vì nó không chứa hành động. Nhưng câu hỏi là: Làm thế nào để chúng ta nói với server về các hành động được thực hiện trên resource của ```companies``` và liệu có nên thêm, xóa hoặc cập nhật không?
 
Đây là nơi mà các [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) (`GET`, `POST`, `DELETE`, `PUT`), còn được gọi là động từ, đóng một vai trò.

Resource phải luôn ở dạng số nhiều trong API endpoint và nếu chúng ta muốn truy cập một instance  của resource, chúng ta luôn có thể chuyển ID trong URL.

* Phương thức `GET` đường dẫn `/companies` sẽ nhận được danh sách của tất cả các công ty.
* Phương thức `GET` đường dẫn `/companies/34` sẽ nhận được thông tin chi tiết về công ty 34.
* Phương thức `DELETE` đường dẫn `/companies/34` để xóa công ty 34.

Trong một vài trường hợp sử dụng khác, nếu chúng ta có resource trong một resource, ví dụ: nhân viên của một công ty, thì một vài API enpoint mẫu sẽ là:

* `GET /companies/3/employees` nên lấy danh sách tất cả nhân viên từ công ty 3.
* `GET /companies/3/employees/45` nên lấy thông tin chi tiết về nhân viên 45, người thuộc công ty 3.
* `DELETE /companies/3/employees/45` nên xóa nhân viên 45, người thuộc công ty 3.
* `POST /companies` nên tạo một công ty mới và trả lại các chi tiết của công ty mới được tạo.

Có phải bây giờ API của chúng ta có tính chính xác và nhất quán hơn không?

### HTTP Methods (Verbs)

HTTP đã định nghĩa một vài methods chỉ ra loại hành động sẽ được thực hiện trên các resource.

URL là một câu trong đó resource là danh từ và HTTP method là động từ.

Các HTTP method quan trọng như sau:

1. `GET` method request dữ liệu từ tài nguyên và không tạo ra bất kỳ tác động nào khác. Ví dụ: `/companies/3/employees` trả về danh sách tất cả nhân viên từ công ty 3.
2. `POST` method request server tạo tài nguyên trong cơ sở dữ liệu, chủ yếu là khi một webform được sumitted. Ví dụ: `/companies/3/employees` tạo ra một nhân viên mới của công ty 3.`POST` là non-[idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning), điều đó có nghĩa là nhiều request sẽ có hiệu ứng khác nhau.
3. `PUT` method request server cập nhật tài nguyên hoặc tạo tài nguyên nếu nó không tồn tại. Ví dụ. `/companies/3/employees/john` sẽ request server cập nhật hoặc tạo nếu nó không tồn tại, tài nguyên john trong tập nhân viên thuộc công ty 3. `PUT` là [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning), có nghĩa là nhiều yêu cầu sẽ có cùng hiệu ứng.
4. `DELETE` method request các tài nguyên, hoặc instance của chúng, bị xóa khỏi cơ sở dữ liệu. Ví dụ: `/companies/3/employees/john/` sẽ request server xóa tài nguyên john khỏi tập nhân viên thuộc công ty 3.

Có một vài [method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) khác mà chúng ta sẽ thảo luận trong bài viết khác.

### HTTP Response Status Codes

Khi client đưa ra request đến server thông qua API, client nên nhận được phản, cho dù nó bị lỗi, được thông qua hay request bị sai.

HTTP status code là một loạt các mã được tiêu chuẩn hóa có nhiều cách giải thích khác nhau trong các tình huống khác nhau. Server phải luôn trả lại status code đúng.

Sau đây là các phân loại quan trọng của HTTP codes:

**2xx (Success Category)**

Các status code này thể hiện rằng hành động được request đã được server nhận và xử lý thành công.

* 200 OK - HTTP response tiêu chuẩn thể hiện thành công cho `GET`, `PUT` hoặc `POST`.
* 201 Created - Status code này phải được trả về bất cứ khi nào instance mới được tạo. Ví dụ. khi tạo một instance mới, sử dụng phương thức `POST`, sẽ luôn trả về status code 201.
* 204 No Content - Thể hiệnrequest được xử lý thành công nhưng chưa trả lại bất kỳ nội dung nào. `DELETE` có thể là một ví dụ tốt về điều này. API `DELETE /companies/43/employees/2` sẽ xóa nhân viên 2 và đổi lại, chúng ta không cần bất kỳ dữ liệu nào trong phần response của API, vì chúng ta đã request hệ thống xóa một cách rõ ràng. Nếu có bất kỳ lỗi nào, như nếu nhân viên 2 không tồn tại trong cơ sở dữ liệu, thì mã phản hồi sẽ không thuộc `2xx Success Category` mà nằm trong `4xx Client Error category`.

**3xx (Redirection Category)**

* 304 Not Modified - Cho biết client đã có response trong bộ đệm (cache) của nó. Và do đó, không cần phải chuyển cùng một dữ liệu lại lần nữa.

**4xx (Client Error Category)**

Các status code này thể hiện rằng client đã đưa ra một request bị lỗi.

* 400 Bad Request - Cho biết request của client không được xử lý, vì server không thể hiểu client đang request gì.
* 401 Unauthorized - Cho biết client không được phép truy cập tài nguyên và nên request lại với thông tin đăng nhập cần thiết.
* 403 Forbidden - Cho biết rằng request là hợp lệ và client được xác thực, nhưng client không được phép truy cập vào trang hoặc tài nguyên vì bất kỳ lý do nào. Ví dụ. đôi khi client được ủy quyền không được phép truy cập vào thư mục trên server.
* 404 Not Found - Cho biết rằng tài nguyên được request hiện không có sẵn.
* 410 Gone - Cho biết rằng tài nguyên đượcrequest không còn có sẵn mà đã được di chuyển có chủ ý.

**5xx (Server Error Category)**

* 500 Internal Server Error - Cho biết rằng request là hợp lệ, nhưng serverđang gặp vấn đề và server được yêu cầu phục vụ một điều kiện không mong muốn.
* 503 Service Unavailable - Cho biết rằng server không hoạt động hoặc không sẵn sàng để nhận và xử lý request. Chủ yếu là nếu máy chủ đang được bảo trì.

### Field Name Casing Convention

Bạn có thể làm theo bất kỳ casing convention, nhưng hãy chắc chắn rằng nó phù hợp trên ứng dụng. Nếu request body hoặc loại response là [JSON](https://en.wikipedia.org/wiki/JSON) thì hãy sử dụng `camelCase` để duy trì tính nhất quán.

### Searching, Sorting, Filtering, and Pagination

Tất cả những hành động này chỉ đơn giản là truy vấn trên một tập dữ liệu. Sẽ không có bộ API mới để xử lý các hành động này. Chúng ta cần nối các tham số truy vấn (query params) với API phương thức GET.

Để hiểu cách thực hiện những hành động này hãy đến với một vài ví dụ.

* Sorting  - Trong trường hợp client muốn nhận danh sách các công ty đã sắp xếp, `GET /companies` endpoint sẽ chấp nhận nhiều tham số sắp xếp trong truy vấn.
Ví dụ. `GET /companies?sort=rank_asc` sẽ sắp xếp các công ty theo thứ tự tăng dần.
* Filtering  - Để lọc tập dữ liệu, chúng ta có thể chuyển các tùy chọn khác nhau thông qua các query params. Ví dụ. `GET /companies?category=banking&location=india` sẽ lọc dữ liệu danh sách công ty với danh mục công ty ngân hàng và địa điểm là: Ấn Độ.
* Searching  - Khi tìm kiếm tên công ty trong danh sách công ty, API endpoint nên là `GET /companies?search=Digital Mckinsey`.
* Pagination  - Khi tập dữ liệu quá lớn, chúng ta chia tập dữ liệu thành các phần nhỏ hơn, giúp cải thiện hiệu suất và dễ dàng xử lý response hơn. Ví dụ. `GET /companies?page=23` có nghĩa là có được danh sách các công ty trên trang thứ 23.

Nếu việc thêm nhiều query params trong các phương thức GET làm cho URI quá dài, server có thể response với `414 URI Too long` HTTP status code. Trong những trường hợp đó, params cũng có thể được truyền vào phần thân yêu cầu của phương thức `POST`.

### Versioning

Khi các API của bạn đang được thế giới sử dụng, việc nâng cấp API với một số thay đổi đột phá cũng sẽ dẫn đến việc phá vỡ các sản phẩm hoặc dịch vụ hiện có bằng API của bạn.

`http://api.yourservice.com/v1/companies/34/employees` là một ví dụ hay, có số phiên bản của API trong đường dẫn. Nếu có bất kỳ cập nhật đột phá lớn nào, chúng ta có thể đặt tên cho bộ API mới là `v2` hoặc `v1.x.x`.

### Conclusion

Những hướng dẫn này dựa trên kinh nghiệm của tôi trong development. Tôi rất muốn biết quan điểm của bạn về vấn đề được đề cập ở trên. Hãy để lại nhận xét, và cho tôi biết!

<br>

***Bài viết được dịch từ:*** 

https://medium.com/better-programming/restful-api-designing-guidelines-the-best-practices-39454135f61