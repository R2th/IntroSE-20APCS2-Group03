Phần trước chúng ta đã đi tìm hiểu thế nào là RESful API, và cách để xây dựng như thế nào, cùng với đó là những thuật ngữ thường dùng trong API. 
link: https://viblo.asia/p/restful-api-guide-thiet-ke-the-nao-phan-1-jvEla1vdlkw
Hôm nay chúng ta sẽ đi tìm hiểu các Method(Phương thức) của HTTP và các dạng trả về của API. 
# HTTP Methods (Verbs)
HTTP đã định nghĩa một vài bộ phương thức chỉ ra loại hành động sẽ được thực hiện trên các resources (tài nguyên).
URL là một câu trong đó resources (tài nguyên) là danh từ và phương thức HTTP là Verbs (động từ).
Các phương thức HTTP quan trọng như sau:

1. Phương thức GET yêu cầu dữ liệu từ resources. và không tạo ra bất kỳ tác dụng phụ nào. Ví dụ: **/companies/3/employees** trả về danh sách tất cả nhân viên từ công ty 3.
2. Phương thức POST yêu cầu máy chủ tạo resources trong cơ sở dữ liệu, chủ yếu là khi một webform được gửi. Ví dụ: **/companies/3/employees** tạo ra một nhân viên mới của công ty 3. POST là không bình thường, điều đó có nghĩa là nhiều yêu cầu sẽ có cách truy vấn khác nhau.
3. Phương thức PUT yêu cầu máy chủ cập nhật resources hoặc tạo resources nếu nó không tồn tại. Ví dụ. **/companies/3/employees/john** sẽ yêu cầu máy chủ cập nhật hoặc tạo nếu nó không tồn tại, resources john trong bộ sưu tập nhân viên thuộc công ty 3. PUT là idempotent, có nghĩa là nhiều yêu cầu sẽ có cùng kết quả.
4. Phương thức XÓA yêu cầu các resources, hoặc thể hiện của chúng, bị xóa khỏi cơ sở dữ liệu. Ví dụ: ** /companies/3/employees/john/ ** sẽ yêu cầu máy chủ xóa resources john khỏi bộ sưu tập nhân viên thuộc công ty 3.

Có một vài phương pháp khác mà chúng ta sẽ thảo luận trong bài viết khác.
# HTTP Response Status Codes (mã trạng thái)
Khi client đưa ra yêu cầu đến máy chủ thông qua API, client sẽ biết phản hồi, cho dù nó bị lỗi, được thông qua hay yêu cầu bị sai.

Mã trạng thái HTTP là một loạt các mã được tiêu chuẩn hóa có nhiều cách giải thích khác nhau trong các tình huống khác nhau. Máy chủ phải luôn trả lại mã trạng thái đúng.

Sau đây là các phân loại quan trọng của mã HTTP:

## 2xx (Success Category)

Các mã trạng thái này thể hiện rằng hành động được yêu cầu đã được máy chủ nhận và xử lý thành công.
* 200 OK - Phản hồi HTTP tiêu chuẩn thể hiện thành công cho GET, PUT hoặc POST.
* 201 Created - Mã trạng thái này phải được trả về bất cứ khi nào phiên bản mới được tạo. Ví dụ. khi tạo một thể hiện mới, sử dụng phương thức POST, sẽ luôn trả về mã trạng thái 201.
* 204 No Content - Thể hiện yêu cầu được xử lý thành công nhưng chưa trả lại bất kỳ nội dung nào. DELETE có thể là một ví dụ tốt về điều này. API **DELETE /companies/43/employees/2** sẽ xóa nhân viên 2 và đổi lại, chúng ta không cần bất kỳ dữ liệu nào trong phần phản hồi của API, vì chúng ta đã yêu cầu hệ thống xóa một cách rõ ràng. Nếu có bất kỳ lỗi nào, như nếu nhân viên 2 không tồn tại trong cơ sở dữ liệu, thì mã phản hồi sẽ không thuộc *2xx Success Category* mà nằm trong *4xx Client Error category*.

## 3xx (Redirection Category)

* 304 Not Modified - Cho biết client đã có phản hồi trong bộ đệm. Và do đó, không cần phải chuyển cùng một dữ liệu.

## 4xx (Client Error Category)

Các mã trạng thái này thể hiện rằng client đã đưa ra một yêu cầu bị lỗi.

* 400 Bad Request - Cho biết rằng yêu cầu của client không được xử lý, vì máy chủ không thể hiểu client đang yêu cầu gì.
* 401 Unauthorized - Cho biết client không được phép truy cập tài nguyên và nên yêu cầu lại với thông tin đăng nhập được yêu cầu.
* 403 Forbidden - Cho biết rằng yêu cầu là hợp lệ và client được xác thực, nhưng client không được phép truy cập vào trang hoặc tài nguyên vì bất kỳ lý do nào. Ví dụ. đôi khi client được ủy quyền không được phép truy cập vào thư mục trên máy chủ.
* 404 Not Found - Cho biết rằng tài nguyên được yêu cầu hiện không có sẵn.
* 410 Gone - Cho biết rằng tài nguyên được yêu cầu không còn có sẵn mà đã được di chuyển có chủ ý.

## 5xx (Server Error Category)

* 500 Internal Server Error - Cho biết rằng yêu cầu hợp lệ, nhưng máy chủ hoàn toàn bối rối và máy chủ được yêu cầu phục vụ một điều kiện không mong muốn.
* 503 Service Unavailable - Cho biết rằng máy chủ ngừng hoạt động hoặc không khả dụng để nhận và xử lý yêu cầu. Chủ yếu là nếu máy chủ đang được bảo trì.
# Field Name Casing Convention
 Chúng ta có thể làm theo bất kỳ Casing Convention nào, nhưng hãy chắc chắn rằng nó phù hợp trên ứng dụng. Nếu request body hoặc loại phản hồi là JSON thì hãy dùng camelCase Convention  để duy trì tính nhất quán.
#  Searching, Sorting, Filtering, and Pagination
Tất cả những hành động này chỉ đơn giản là truy vấn trên một tập dữ liệu. Sẽ không có bộ API mới để xử lý các hành động này. Chúng ta cần nối các tham số truy vấn với API phương thức GET.

Thực hiện những hành động này với một vài ví dụ.

* Sorting - Trong trường hợp khách hàng muốn nhận danh sách các công ty đã sắp xếp, GET /companies endpoint sẽ chấp nhận nhiều tham số sắp xếp trong truy vấn.
    Ví dụ. *GET /companies?sort=rankasc*  sẽ sắp xếp các công ty theo thứ tự tăng dần.
* Filtering - Để lọc tập dữ liệu, chúng tôi có thể chuyển các tùy chọn khác nhau thông qua các tham số truy vấn.
    Ví dụ. *GET /companies?category=banking&location=india* sẽ lọc dữ liệu danh sách của công ty với danh mục ngân hàng của công ty và địa điểm là: india.
* Searching -  khi tìm kiếm tên công ty trong danh sách công ty, điểm cuối API phải là *GET /companies?search=Digital Mckinsey*.
* Pagination - Khi tập dữ liệu quá lớn, chúng tôi chia tập dữ liệu thành các phần nhỏ hơn, giúp cải thiện hiệu suất và dễ dàng xử lý phản hồi hơn.
    Ví dụ. *ET /companies?page=23* có nghĩa là để có được danh sách các công ty trên trang thứ 23.
    
Nếu việc thêm nhiều tham số truy vấn trong các phương thức GET làm cho URI quá dài, máy chủ có thể phản hồi với *414 URI Too long HTTP status*. Trong những trường hợp đó, params cũng có thể được truyền vào phần thân yêu cầu của phương thức POST.
# Versioning
Khi các API của bạn đang được thế giới sử dụng, việc nâng cấp API với một số thay đổi đột phá cũng sẽ dẫn đến việc phá vỡ các sản phẩm hoặc dịch vụ hiện có bằng API của bạn.
*http://api.yourservice.com/v1/companies/34/employees* là một ví dụ điển hình, có số phiên bản của API trong đường dẫn. Nếu có bất kỳ cập nhật đột phá lớn nào, chúng ta có thể đặt tên cho bộ API mới là v2 hoặc v1.x.x.

renference: [RESTful API Designing Guidelines](https://medium.com/better-programming/restful-api-designing-guidelines-the-best-practices-39454135f61)