# 1. API Testing với Postman
Postman (getpostman.com) là Môi trường phát triển API tinh vi và được sử dụng rộng rãi, lý tưởng cho hầu hết các thử nghiệm API:
* Phiên bản cơ bản là miễn phí
* Có sẵn cho Windows, MacOS hoặc Linux
* Giao diện gọn gàng và rõ ràng
* Không yêu cầu rất nhiều bước thiết lập

## Tạo collection và request đầu tiên
1. Khi bạn cài đặt và chạy Postman, bạn sẽ thấy màn hình đăng nhập. Ở cuối trang, nhấp vào "Skip signing in and take me straight to the app". Nếu bạn không thấy nút để bỏ qua, bạn có thể đăng ký và đăng nhập

![](https://images.viblo.asia/667106a0-37d5-4c73-9353-46d285bf5cf7.png)

2. Khi khởi chạy, bạn sẽ thấy màn hình Create New

![](https://images.viblo.asia/539dfcd2-a688-49e2-b0f1-7aacfc7505a8.png)

3. Chọn “Request” để tạo ra một request cơ bản
4. Với lần thử nghiệm đầu tiên, hãy tạo ra một collection mới bằng cách nhấn vào nút “Create Collection” gần dưới cùng của cửa sổ Save Request và cung cấp cho nó một cái tên như “First Collection”
5. Sau đó click vào checkbox để lưu lại
6. Tiếp theo, nhập tên Request và nhấn Save

![](https://images.viblo.asia/7081f9b9-51cc-4f60-8412-de92c7994e6c.png)

## Gửi GET request
Bây giờ là thời gian để tạo yGET request đầu tiên của bạn.

1. Nhập URL đầy đủ của resource bạn muốn yêu cầu (ví dụ: https://example.com) vào trường được gắn nhãn là "Enter request URL" và click Send:

![](https://images.viblo.asia/dfe33a71-4c60-49c1-9e98-fced9ad7ce73.png)

2. Chế độ xem mà bạn sẽ thấy được phân tách thành khu vực yêu cầu ở trên cùng, gồm Params, Authorization, Headers và các tab khác.
3. Vùng response ở phía dưới, bao gồm Cookies, Headers và các tab khác. Theo mặc định, phần response body sẽ được hiển thị ở phía dưới, trong một hình thức khá đẹp.

![](https://images.viblo.asia/8d334c18-39f0-4148-aedf-38390d46a31a.png)

4. Để tạo một request khác, click vào biểu tượng +. Sau này, bạn có thể chọn "Save" để lưu trữ các request mới trong cùng một collection (hoặc bất kỳ thứ gì khác).

![](https://images.viblo.asia/599a0993-82f2-4b05-88a8-6e30952f87b8.png)

# 2. CRUD với Postman
CRUD trong lập trình máy tính là bốn hoạt động cơ bản của lưu trữ liên tục.
* **C**reate: PUT, POST
* **R**ead: GET
* **U**pdate: PUT, POST, PATCH
* **D**elete: DELETE

Rõ ràng có một sự mâu thuẫn đang diễn ra giữa PUT, POST và PATCH. Trong thế giới thực, nó phụ thuộc vào API (hoặc dịch vụ web trực tuyến), phương thức nào sẽ được sử dụng khi nào.
Nhưng lý tưởng là:
* **PUT** sẽ được sử dụng để cập nhật tài nguyên theo cách không cần thiết: nhiều request giống hệt nhau phải luôn có cùng kết quả, giống như GET. 
* **GET** request giống nhau sẽ luôn dẫn đến cùng một kết quả - cùng một response
* **POST** sẽ tạo ra một resource và sẽ không dẫn đến kết quả tương tự. Vì vậy, nếu bạn gọi nó nhiều lần, nhiều resource sẽ được tạo (nếu được phép)
* **PATCH** có nghĩa là áp dụng một bản cập nhật một phần cho resource. Nhưng chỉ khi nó đã tồn tại. Vì vậy, không giống như PUT, nó sẽ không tạo ra một mục mới nếu resource được chỉ định không tồn tại

## Lỗi thường gặp khi chọn phương thức HTTP
Mặc dù nhiều quyết định trên thuộc về các nhà phát triển, có một lỗi phổ biến liên quan đến việc lựa chọn chính xác phương thức HTTP: nếu trong quá trình kiểm thử của bạn, bạn sẽ thấy bất kỳ yêu cầu GET nào yêu cầu xác thực (chúng tôi sẽ đề cập đến vấn đề này sau), đó rất có thể là một vấn đề bạn nên báo cáo. Nó có thể có tác động bảo mật đáng kể, bởi vì các yêu cầu GET, như được chỉ định trong Giao thức HTTP, được cho là không ổn định và an toàn. Các trình duyệt web mong đợi nó là như vậy và do đó ít hạn chế hơn.
Phương thức HTTP an toàn có nghĩa là mọi yêu cầu sử dụng phương pháp an toàn không thể sửa đổi hoặc thay đổi tài nguyên.

![](https://images.viblo.asia/d2323e3c-1572-4428-9c79-c6a4335bea56.png)

Sau đây, chúng ta hãy xem xét các ví dụ cho từng phương thức.

### GET
1. Trong ví dụ này, tạo một request mới (click vào nút + ở trên cùng), theo mặc định, đó sẽ là một yêu cầu GET.
2. Để yêu cầu nội dung của tệp văn bản đơn giản với Postman, chỉ cần nhập URL đầy đủ và click vào Send để gửi request.

![](https://images.viblo.asia/4aa8b518-33ef-433b-a088-ad71c9d2e41a.png)

3. Nội dung của tệp sẽ được hiển thị trong phần **Response** ở phía dưới:

![](https://images.viblo.asia/8719073d-2ff4-407a-a1bf-1300bff5e44e.png)

4. Kiểm tra tab "Headers", là nơi hiển thị danh sách đầy đủ các tiêu đề phản hồi:

![](https://images.viblo.asia/616eb6ab-8a94-4eba-a645-a8f2abfbc5d3.png)

5. Trong phần phản hồi, Postman cũng sẽ hiển thị mã trạng thái HTTP (200 OK) và bên cạnh đó là thời gian thực hiện cho yêu cầu (46 mili giây), cũng như kích thước phản hồi (575 Byte):

![](https://images.viblo.asia/40d6ff29-0046-411b-9cae-e12590d8c51a.png)

6. Kết quả được trả về trong ví dụ này là văn bản đơn giản `one,two,three,four` - là danh sách bốn từ đó ở định dạng CSV. CSV là viết tắt của "comma-separated values" - các giá trị được phân tách bằng dấu phẩy. Nó được sử dụng để lưu trữ một danh sách các giá trị riêng lẻ, được phân tách bằng một dấu phẩy ở giữa chúng.
7. Vui lòng lưu trữ yêu cầu GET này trong collection của bạn dưới dạng: "GET file example", trước khi bạn chuyển sang yêu cầu PUT tiếp theo.

### PUT
1. Phương pháp khác để tạo một request mới mà không cần phải nhập lại tất cả đầu vào là click chuột phải vào tab của một request hiện có và chọn "Duplicate Tab" từ menu. Hãy làm điều này ngay bây giờ và thay đổi phương thức yêu cầu thành "PUT".

![](https://images.viblo.asia/97e33c4c-e8da-492e-b597-e59e15105d72.png)

2. Sau đó chọn "Save As…" từ danh sách dropdown bên cạnh nút Save để lưu request mới vào collection của bạn:

![](https://images.viblo.asia/4b912d5a-e861-48b4-8d92-0bd5183f5857.png)

3. Tiếp theo hãy điền vào URL - nơi bạn muốn đẩy dữ liệu lên (cái này sẽ được gọi là "endpoint" hay "API endpoint").
4. Chọn "Body" tab trong phần request. Nó sẽ cho phép bạn chọn content-type. Theo mặc định, nó sẽ được đặt thành "none" vì không có nội dung thông điệp. Thay đổi điều đó bằng cách chọn "raw", là content-type của phần body và nhập dữ liệu CSV `a, b, c, d` trong trường văn bản mới xuất hiện khi bạn đã chọn content-type.

![](https://images.viblo.asia/261983da-3f8d-4d23-9eaa-4f6f0bf86026.png)

5. Khi bạn đã thiết lập xong, bấm Send.
6. Sau đó quay lại request trước đó của bạn ("GET file example") và gửi lại yêu cầu đó để xác minh rằng dữ liệu đã được cập nhật. Bây giờ nó sẽ hiển thị dữ liệu CSV mà bạn vừa gửi trong phản hồi:

![](https://images.viblo.asia/84fb8c64-6102-4d00-881a-586310eb214f.png)

7. Bây giờ, nếu bạn chỉ muốn sửa đổi một mục CSV, ví dụ: bạn muốn thay thế `c` bằng `three`, thì bạn có thể sử dụng phương thức PATCH.

### Patch
Cú pháp để vá các bản ghi có thể khác nhau rất nhiều giữa các API hoặc dịch vụ web. Bạn sẽ tìm hiểu về các chi tiết sau này trong khóa học này, các API có thể sử dụng các tiêu chuẩn như JSON, XML hoặc thậm chí các định dạng độc quyền.

1. Lưu ý rằng giống như trong ví dụ PUT request ở trên, PATCH sử dụng văn bản thuần cho dữ liệu thông điệp.

![](https://images.viblo.asia/2e94970a-746b-4d50-8dcb-fdb58053feb2.png)

2. Khi bạn sao chép yêu cầu dữ liệu của PUT request, hãy thay đổi đường dẫn thành patchdata.php, phương thức HTTP thành "PATCH", và sửa đổi body text (`2 = Charlie`).
3. Sau đó bấm Send để gửi nó, và có được kết quả như hình.
4. Hãy nhớ sử dụng Save as… để lưu trữ nó như một new request, và đừng ghi đè lên bản gốc.
5. Nếu bạn yêu cầu dữ liệu sau đó với “GET file example” request, thì nó sẽ giống như sau:

![](https://images.viblo.asia/5d1cd826-f596-48cd-bd0b-9c317bb1cee9.png)

6. Hãy nhớ lưu yêu cầu PATCH mới vào collection của bạn, trước khi bạn chuyển sang phương thức tiếp theo.

Trong ví dụ này, PATCH endpoint cho phép chúng tôi cập nhật các mục cụ thể của danh sách CSV thành giá trị mới. Như các tham số, nó dự kiến các chỉ số mà bạn muốn sửa đổi, cũng như giá trị mới.
* `0 = Text` có nghĩa là bạn muốn cập nhật mục nhập đầu tiên (nó bắt đầu đếm từ 0) và đặt nó thành giá trị: "Text"
    * Khi bạn gửi cái này, danh sách sẽ thay đổi từ `a, b, c, d` trước đó thành `Text, b, c, d`
* Nếu bạn điền `2 = Charlie`
    * Sẽ đặt dữ liệu CSV thành giá trị mới: `a, b, Charlie, d`
    * Chỉ mục là `2`, hoặc mục thứ ba trong danh sách CSV và giá trị mới là Charlie

![](https://images.viblo.asia/2e94970a-746b-4d50-8dcb-fdb58053feb2.png)

    * Đây là yêu cầu PATCH hoàn chỉnh để thay đổi mục nhập thứ ba (hãy nhớ rằng các chỉ mục như thế này thường bắt đầu đếm bằng 0) của danh sách CSV thành giá trị mới `Charlie`
    
### POST
1. Tạo một yêu cầu mới với POST làm phương thức HTTP và sử dụng định dạng "form-data" của cơ sở dữ liệu cho request body.
2. Nhập hai key: "firstname" và "city", và điền vào bất kỳ giá trị nào bạn muốn.
3. Yêu cầu đầy đủ sẽ trông như thế này:

![](https://images.viblo.asia/41dedacc-1f11-4828-b4dd-eaa27f911c63.png)

4. Khi bạn gửi yêu cầu bằng cách click vào nút Send, nó sẽ hiển thị xác nhận trong phản hồi và trong ví dụ này, phản hồi cũng chứa dữ liệu đã gửi:

![](https://images.viblo.asia/6132ff2d-f1b6-43f4-a224-d8114af60187.png)

5. Bạn có thể nhận thấy nút “Code” rồi.

![](https://images.viblo.asia/b312031a-d3b4-4b82-94cd-335482745def.png)

6. Khi bạn click vào nó, bạn sẽ thấy các tùy chọn để chuyển đổi dữ liệu yêu cầu thành các định dạng khác nhau để xuất:
    
 ![](https://images.viblo.asia/b11765a6-771f-4081-b7cd-bbf3c785dd50.png)

    * Nếu bạn chọn "HTTP", từ dropdown ở trên cùng bên trái, bạn sẽ thấy yêu cầu http dạng raw  - dạng chính xác mà máy chủ sẽ nhận được.
    * Ngoài ra còn có các tùy chọn để cho phép Postman tạo các đoạn mã cho các ngôn ngữ lập trình khác nhau như PHP, Java, Python...

### DELETE
Trong trường hợp này, bạn có thể:
* Gọi DELETE endpoint với một chỉ mục như được mô tả trước đây, để xóa một mục cụ thể khỏi danh sách
* Hoặc chỉ gọi nó mà không có bất kỳ tham số nào để xóa toàn bộ danh sách

Thử xóa một số mục theo các bước sau:
1. Tạo một yêu cầu mới và lưu nó trong collection của bạn dưới dạng "DELETE data".
2. Một lần nữa, sử dụng phần raw Body và nhập chỉ mục trong danh sách mà bạn muốn xóa.
3. Từ ví dụ trước, dữ liệu trong danh sách phải là a, b, Charlie, d.
4. Nếu bạn gửi yêu cầu DELETE với chỉ mục 1, sẽ là xóa mục nhập thứ hai, và danh sách kết quả sẽ trở thành: a, Charlie, d.
5. Trong trường hợp bạn có kết quả khác, trước tiên hãy gửi yêu cầu PUT trước đó, để khôi phục các giá trị ban đầu:

![](https://images.viblo.asia/7152111e-f54a-4b11-b3d6-248ef55a3ba3.png)

6. Yêu cầu DELETE hoàn chỉnh:

![](https://images.viblo.asia/2700296c-0586-45e5-98b6-81fbdd2aa68a.png)

7. Để xác minh rằng yêu cầu đã thành công, hãy gọi lại yêu cầu GET một lần nữa:

![](https://images.viblo.asia/08e9ef4a-f961-4c81-89d2-bf3db9e5b3c1.png)


--Còn tiếp --

**Nguồn tham khảo:**

Dịch từ: https://www.utest.com/academy/tracks/28/courses/api-testing-with-postman