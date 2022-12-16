### Giới thiệu về Kiểm thử bảo mật cho ứng dụng Web

Việc kiểm tra tính bảo mật cho các ứng dụng web ngày càng trở nên quan trọng do số lượng dữ liệu khổng lồ được lưu trữ và số lượng các giao dịch thông qua web ngày càng tăng.

Trong bài này, chúng ta sẽ tìm hiểu chi tiết về các thuật ngữ chính được sử dụng trong Kiểm thử bảo mật trang web và phương pháp kiểm thử.
Kiểm thử bảo mật là gì?

Kiểm thử bảo mật là quá trình mà kiểm tra xem dữ liệu bí mật vẫn được bảo mật hay không (tức là nó không được tiếp xúc với các cá nhân / tổ chức không được phép) và người dùng chỉ có thể thực hiện những công việc mà họ được phép thực hiện ( Ví dụ . người dùng không thể xóa bỏ chức năng của trang web hoặc người dùng không thể thay đổi chức năng của ứng dụng web theo cách không mong muốn, v.v.).

![](https://images.viblo.asia/af152320-a72c-41a9-8f96-e45de3b07ab7.jpg)

## Một số thuật ngữ chính được sử dụng trong kiểm thử bảo mật

Trước khi chúng ta tiếp tục, Hãy làm quen với một số thuật ngữ thường được sử dụng trong kiểm thử bảo mật ứng dụng web để dễ dàng hơn khi tiếp cận nó.

**"Lỗ hổng" - “Vulnerability” là gì?**

Đây là điểm yếu trong ứng dụng web. Nguyên nhân của "điểm yếu" như vậy có thể là do các lỗi trong ứng dụng, sau một lần injection ( SQL / script code) hoặc sự có sự hiện diện của virus.

**"Thao tác URL" - “URL Manipulation” là gì?**

Một số ứng dụng web bổ sung thông tin giữa client  (trình duyệt) và server qua URL. Thay đổi một số thông tin trong URL đôi khi có thể dẫn đến hành vi không mong muốn bởi server và điều này được gọi là Thao tác URL .

**"SQL injection" là gì?**

Đây là quá trình chèn các câu lệnh SQL thông qua giao diện người dùng ứng dụng web vào một số truy vấn sau đó được thực thi bởi máy chủ.
"XSS (Cross Site Scripting)" là gì?

Khi người dùng chèn tập lệnh HTML / client-side script vào giao diện người dùng của ứng dụng web, việc chèn này hiển thị với người dùng khác và được gọi là XSS .

**"Giả mạo" - “Spoofing” là gì?**

Việc tạo ra các trang web hoặc email giống như lừa đảo được gọi là Giả mạo .

## Phương pháp kiểm thử bảo mật

Để thực hiện kiểm thử bảo mật của một ứng dụng web hiệu quả, trình kiểm thử bảo mật phải có kiến thức tốt về giao thức HTTP.

Điều quan trọng là phải hiểu cách client (trình duyệt) và server  giao tiếp bằng cách sử dụng HTTP như thế nào.

Ngoài ra, người kiểm thử - Tester ít nhất nên biết những điều cơ bản về SQL injection và XSS.

Hy vọng rằng, số lỗi bảo mật hiện diện trong ứng dụng web sẽ không cao. Tuy nhiên, có khả năng mô tả tất cả các lỗi bảo mật chính xác với tất cả các chi tiết cần thiết chắc chắn sẽ rất có ích.

Dưới đây là một số phương pháp để kiểm tra Bảo mật Web:

### 1. Bẻ khóa mật khẩu

Kiểm thử bảo mật trên một ứng dụng web có thể được khởi động bằng cách “bẻ khóa mật khẩu”. Để đăng nhập vào các vùng riêng tư của ứng dụng, người ta có thể đoán tên người dùng / mật khẩu hoặc sử dụng một số công cụ cracker mật khẩu. Danh sách tên người dùng và mật khẩu phổ biến có sẵn cùng với các trình bẻ khóa mật khẩu nguồn mở. Nếu ứng dụng web không sử dụng mật khẩu phức tạp ( Ví dụ: với bảng chữ cái, số và ký tự đặc biệt hoặc với ít nhất một ký tự số bắt buộc), có thể không mất nhiều thời gian để crack tên người dùng và mật khẩu.

Nếu tên người dùng hoặc mật khẩu được lưu trữ trong cookie mà không mã hóa, kẻ tấn công có thể sử dụng các phương pháp khác nhau để lấy cắp cookie và thông tin được lưu trữ trong cookie như tên người dùng và mật khẩu.

### 2. URL Manipulation thông qua phương thức HTTP GET 

Tester nên kiểm tra xem ứng dụng có truyền thông tin quan trọng trong chuỗi truy vấn hay không. Điều này xảy ra khi ứng dụng sử dụng phương thức HTTP GET để truyền thông tin giữa client và server. Thông tin được truyền qua các tham số trong chuỗi truy vấn. Tester có thể sửa đổi một giá trị tham số trong chuỗi truy vấn để kiểm tra xem server có chấp nhận nó hay không.

Thông qua HTTP GET yêu cầu thông tin người dùng được chuyển tới server để xác thực hoặc tìm nạp dữ liệu. Kẻ tấn công có thể thao tác mọi biến đầu vào được chuyển từ GET request này đến một server để nhận thông tin được yêu cầu hoặc làm hỏng dữ liệu. Trong những điều kiện như vậy, bất kỳ hành vi bất thường nào của ứng dụng hoặc web server là cánh cửa cho kẻ tấn công truy cập vào ứng dụng.

### 3. SQL Injection

Yếu tố tiếp theo cần được kiểm tra là SQL injection. Việc nhập một dấu nháy đơn (') vào một textbox bất kỳ sẽ bị ứng dụng từ chối. Thay vào đó, nếu trình kiểm tra gặp lỗi cơ sở dữ liệu, điều đó có nghĩa là đầu vào của người dùng được chèn vào một số truy vấn mà sau đó ứng dụng đã thực thi nó. Trong trường hợp này, ứng dụng dễ bị tấn công SQL injection.

Các cuộc tấn công SQL injection rất nguy hiểm vì kẻ tấn công có thể lấy thông tin quan trọng từ cơ sở dữ liệu server. Để kiểm tra các điểm nhập SQL injection vào ứng dụng web của bạn, hãy tìm code từ codebase của bạn nơi các truy vấn MySQL trực tiếp được thực hiện trên cơ sở dữ liệu bằng cách chấp nhận một số đầu vào của người dùng.

Nếu dữ liệu đầu vào của người dùng được tạo có chứa các truy vấn SQL để truy vấn cơ sở dữ liệu, kẻ tấn công có thể injection các câu lệnh SQL hoặc một phần của câu lệnh SQL khi người dùng nhập vào để trích xuất thông tin quan trọng từ cơ sở dữ liệu. Ngay cả khi kẻ tấn công thành công trong việc tấn công ứng dụng, từ lỗi truy vấn SQL được hiển thị trên trình duyệt, kẻ tấn công có thể nhận được thông tin mà họ đang tìm kiếm.

Các ký tự đặc biệt từ đầu vào của người dùng phải được handled/escaped đúng cách trong các trường hợp như vậy.

### 4. Cross Scripting (XSS)

Quá trình kiểm thử nên bổ sung thêm việc kiểm tra XSS cho ứng dụng Web (Cross-site scripting). HTML bất kỳ Ví dụ<HTML> hoặc script bất kỳ Ví dụ . <SCRIPT> không được ứng dụng chấp nhận. Nếu có, thì ứng dụng có thể dễ bị tấn công bởi Cross Site Scripting.
    
Kẻ tấn công có thể sử dụng phương pháp này để thực thi tập lệnh hoặc URL độc hại trên trình duyệt của nạn nhân. Sử dụng kịch bản cross-site, kẻ tấn công có thể sử dụng các tập lệnh như JavaScript để lấy cắp cookie của người dùng và thông tin được lưu trữ trong cookie.

Nhiều ứng dụng web nhận được một số thông tin hữu ích và chuyển thông tin này vào một số biến từ các trang khác nhau.

Ví dụ : http://www.examplesite.com/index.php?userid=123&query=xyz

Kẻ tấn công có thể dễ dàng truyền một số đầu vào độc hại hoặc <script> như một ‘&query’ parameter có thể khai thác dữ liệu người dùng / server quan trọng trên trình duyệt.
    
Quan trọng: Trong quá trình kiểm tra bảo mật, Tester phải rất cẩn thận không sửa đổi bất kỳ điều nào sau đây:

*  Cấu hình của ứng dụng hoặc server

*  Các Service đang chạy trên server

*  Dữ liệu người dùng hoặc khách hàng hiện có được lưu trữ bởi ứng dụng
 
Ngoài ra, nên tránh kiểm tra bảo mật trong hệ thống sản xuất.

## Phần kết luận

Mục đích của kiểm thử bảo mật là khám phá các lỗ hổng của ứng dụng web để các nhà phát triển có thể loại bỏ các lỗ hổng này khỏi ứng dụng và làm cho ứng dụng web và dữ liệu an toàn khỏi bất kỳ hành động trái phép nào.