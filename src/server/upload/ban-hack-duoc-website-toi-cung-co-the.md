# I. TỔNG QUAN
Đã khi nào bạn vào một website và tự đặt ra câu hỏi rằng website này đang hoạt động như thế nào? Liệu chúng ta có thể làm gì để xem website này có thể bị "**hack**" hay không?
Hoặc khi bạn đang là chủ nhân của một website, bạn có từng lo lắng rằng website của chúng ta liệu có bị kẻ xấu tấn công hay phá hoại hay không? Để góp phần giải đáp được một phần thắc mắc này của chúng ta, bài viết sau đây sẽ giúp chúng ta giải đáp được một phần những câu hỏi này.

Quay trở lại quá khứ về những năm 1960, có rất nhiều quan điểm khác nhau về nguồn gốc của thuật ngữ “hacking”. Tuy nhiên hầu hết mọi người đều đồng ý rằng, Học viện Công nghệ Hoa kỳ Massachuset (MIT) là nơi đầu tiên sử dụng thuật ngữ này. Nhóm sinh viên trong một câu lạc bộ tại MIT chuyên nghiên cứu về lĩnh vực trí tuệ nhân tạo đã lần đầu tiên sử dụng hệ thống máy tính để điều khiển đoàn tàu chạy theo hướng mà nó không được lập trình sẵn từ trước. Kỹ thuật này được gọi đặt tên là “hack”. Từ đó, thuật ngữ hack ra đời để ám chỉ những hành động điều khiển các chương trình thông qua chiếc máy tính theo ý muốn của người thực hiện. Tuy nhiên, có lẽ trong chúng ta ít ai biết được rằng, cỗ máy đầu tiên bị các hacker tấn công là hệ thống mạng điện thoại chứ không phải là máy tính. Vậy thì thuật ngữ "hack" không hẳn là một điều gì đó quá khó, quá cao siêu mà có thể chỉ đơn giản chúng ta làm được những điều "khác lạ" so với logic của chương trình là đã có thể đạt được mục đích của chúng ta rồi.

Trước khi đi vào nội dung chi tiết chúng ta cùng tìm hiểu qua một số khái niệm cơ bản sau đây:

**1. Kiểm thử bảo mật (Penetration testing)**: Là một kỹ thuật kiểm thử mà người thực hiện công việc đóng vai trò như một kẻ tấn công tiến hành kiểm tra các chức năng của website để tìm ra các điểm yếu bảo mật. 

**2. Kiểm thử bảo mật website**: Là việc kiểm thử đối với website nhằm tập trung vào việc kiểm tra các ứng dụng web. Ứng dụng web cần được kiểm tra hoàn toàn trước khi đi vào hoạt động, điều này có thể giúp giải quyết các vấn đề trong ứng dụng web trước khi tiếp xúc với người dùng như các vấn đề về chức năng, bảo mật, các vấn đề dịch vụ web, các vấn đề tích hợp và khả năng xử lý lưu lượng truy cập, trong quá trình kiểm thử website, cần cố gắng phát hiện ra lỗi có thể xảy ra trong hệ thống nhằm giải quyết kịp thời. 

**3. Vulerability (Lỗ hổng bảo mật)**: Đây là điểm yếu trong ứng dụng website mà hacker tìm ra để tấn công vào website nhằm đánh cắp hoặc sửa đổi thông tin trái phép. Ví dụ: SQL Injection, XSS, IDOR, Path Traversal...

![image.png](https://images.viblo.asia/5e1e7969-9df6-4d0d-a01b-b2d438799e43.png)

<div align="center">Ảnh minh họa</div>


Chúng ta sẽ tiếp cận việc kiểm tra website theo hai hướng cơ bản là:
1. **Pentest** (Manual testing): Kiểm thử bảo mật thủ công
2. **Automation testing tools**: Sử dụng một số công cụ scan đơn giản

Trước khi đọc tiếp các nội dung bên dưới, các bạn cần lưu ý một vài lưu ý: Việc tấn công nhằm phá hoại hay đánh cắp thông tin của một website thực tế là không được phép (có thể vi phạm pháp luật) nếu không có sự đồng ý của chủ website thông qua các thỏa thuận hay văn bản nên việc kiểm thử chỉ nên thực hiện ở webiste của chúng ta hoặc dừng lại ở bước kiểm tra lỗ hổng (nếu chúng ta phát hiện lỗ hổng có thể báo cáo cho chủ quản webiste).
Thứ hai, mọi hướng dẫn, kỹ thuật, công cụ hay ví dụ được trình bày trong bài viết chỉ nhằm mục đích giáo dục, nghiêm cấm sử dụng với mục đích tấn công hay mục đích xấu. Tác giả không chịu trách nhiệm với bất kì hành vi sử dụng các kỹ thuật trong bài với mục tiêu tấn công.

Bài viết chỉ bao gồm các kỹ thuật và lỗ hổng "siêu căn bản" nên chỉ nhằm hướng tới đối tượng là những QA, tester, deveoper, administrators hoặc người dùng cơ bản. Chống chỉ định với các "hacker chuyên nghiệp" :D
Bây giờ bắt tay vào "hack" một website thôi.
# II. Kiểm thử một số lỗ hổng cơ bản
## 1. Kiểm tra lỗ hổng XSS
Đối với các website cho phép người dùng đăng nhập, đăng ký tài khoản chúng ta cần kiểm tra những chức năng gì và có thể bị tấn công những loại lỗ hổng nào?
### 1.1 Khi nào website bị lỗi
Lỗ hổng XSS xảy ra với các chức năng khi thực hiện output dữ liệu của người dùng trực tiếp len website mà không tiến hành việc encoded dữ liệu đầu ra. Các chức năng có thể bị lỗ hổng này thường là: Chức năng search, chức năng hiển thị nội dung người dùng nhập, review sản phẩm, chat, tạo ticket...
Có 3 loại lỗ hổng XSS chính thường xảy ra(Reflected XSS, Stored XSS và DOM XSS)
### 1.2 Khai thác lỗ hổng
- Lỗ hổng reflected XSS: Thường xảy ra khi dữ liệu người dùng được hiện thị lên website ngay khi người dùng nhập input (Chức năng search, trên URL..) mà dữ liệu không thực hiện việc output encoding. Để kiểm tra chúng ta có thể đơn giản nhập vào các input của người dùng bằng những đoạn script đơn giản: <script>alert(origin)</script> hoặc <img src=x onerror=alert(origin)>.. Nếu website hiện lên pop-up với nội dung là url của website thì webiste bị lỗ hổng XSS. Ngoài ra, một số website sử dụng kỹ thuật filter các ký tự nguy hiểm nên chúng ta có thể cần phải bypass bằng những kỹ thuật khác nhau. Ví dụ như sử dụng pay-load trên website [Payload All The Things](https://github.com/swisskyrepo/PayloadsAllTheThings). Để khai thác lỗ hổng, chúng ta chỉ cần gửi url cho nạn nhân để nạn nhân click và trigger javascript độc hại trên phía trình duyệt nạn nhân.

![image.png](https://images.viblo.asia/503304d2-8feb-40d2-a34a-e633cf4158b4.png)

- Lỗ hổng stored XSS; Xảy ra khi dữ liệu người dùng input được lưu lại trên phía server (Database) sau đó được hiển thị ra website mà không được input validation hay output encoding. Các chức năng như: review sản phẩm, để lại lời nhắn, chat hỗ trợ.. là những chức năng dễ bị khai thác lỗ hổng Stored-XSS. Để kiểm tra lỗ hổng chúng ta cũng có thể sử dụng các payload đơn giản như: <script>alert(1)</script> hoặc <img src=x onerror=alert(1)> hoặc  [Payload All The Things](https://github.com/swisskyrepo/PayloadsAllTheThings). Tuy nhiên, với lỗ hổng này chúng ta cần lưu ý nếu pop-up chỉ hiện ra ở phía trình duyệt của chúng ta mà không hiển thị trên nạn nhân thì chỉ được coi là Self-XSS. Đê kiểm tra website có thực sự bị Sotred XSS và tấn công, chúng ta có thể sử dụng công cụ [XSS Hunter](https://xsshunter.com/) để kiểm tra 
- 
![image.png](https://images.viblo.asia/acdd7a8e-bcf7-495d-abb8-8587a75bbe10.png)

## 2. Kiểm ta lỗ hổng brute-force tài khoản

### 2.1 Khi nào website bị lỗi
- Đối với các website cho phép người dùng đăng nhập, đăng ký tài khoản chúng ta cần kiểm tra những chức năng gì và có thể bị tấn công những loại lỗ hổng nào?

- Bruteforce tài khoản là kỹ thuật cho phép kẻ tấn công sử dụng một danh sách các tài khoản, mật khẩu và gửi liên tục lên server đẻ tìm ra thông tin đúng. Đây là lỗ hổng xảy ra khi chúng ta không ngăn chặn việc người dùng nhập sai tài khoản quá nhiều lần (thường là >= 5 lần). Nếu chúng ta quan sát sẽ thấy hầu hết các ứng dụng quan trọng (mail, ngân hàng, ví thương mại điện tử..) sẽ đều được phát triển tính năng này. Nếu người dùng nhập sai tài khoản, mật khẩu quá nhiều lần thì website cần chặn người dùng trong một khoảng thời gian nhất định hoặc cho đến khi admin mở tài khoản.

![image.png](https://images.viblo.asia/a0530832-1fb9-4581-83ac-6409ce8d1777.png)

### 2.2 Cách kiểm tra lỗ hổng
- Để kiểm tra lỗ hổng này, chúng ta chỉ cần đăng nhập thử sai khoảng 10 lần, nếu tài khoản chúng ta không bị khóa thì có thể dự đoán rằng website không có chức năng ngăn chặn người dùng bruteforce tài khoản. Để đơn giản hơn, chúng ta có thể sử dụng công cụ Burpsuite. Để biết cách cài đặt, sử dụng Burpsuite cũng như kiểm tra tấn công bruteforce, các bạn có thể tham khảo bài viết [Burp Suite - "trợ thủ đắc lực" cho tester và pentester trong kiểm tra ứng dụng web](https://viblo.asia/p/burp-suite-tro-thu-dac-luc-cho-tester-va-pentester-trong-kiem-tra-ung-dung-web-E375z4GWZGW) và xem phần: **Sử dụng BurpSuite tấn công Brute fore**

## 3.  Kiểm tra lỗ hổng phân quyền (Broken access control)
### 3.1 Khi nào website bị lỗi

Các chăng năng có thể xuất hiện lỗi: xem, cập nhật hoặc xóa thông tin profile, sản phẩm, tài liệu, ảnh...
Đối với lỗ hổng này, cách đơn giản nhất là chúng ta kiểm tra lỗ hổng IDOR:  IDOR là cụm từ viết tắt của Insecure Direct Object Reference (Tham chiếu đối tượng trực tiếp không an toàn). Lỗ hổng này nằm trong TOP 10 lỗ hổng nguy hiểm mà OWASP đã đưa ra IDOR. Lỗ hổng này xảy ra khi chương trình cho phép người dùng truy cập tài nguyên (dữ liệu, file, thư mục, database..) một cách trực tiếp thông qua dữ liệu do người dùng cung cấp nhưng kém an toàn. Những dữ liệu này thường là những dữ liệu quan trọng, dữ liệu nhạy cảm hoặc không quyền sở hữu của hacker, những dữ liệu public và cho phép bất kì ai truy cập không thuộc phạm vi của lỗ hổng này. Đọc thêm về lỗ hổng tại bài viết [IDOR là gì và ứng dụng bạn code có bị lỗi IDOR không?](https://viblo.asia/p/idor-la-gi-va-ung-dung-ban-code-co-bi-loi-idor-khong-gAm5yrJqKdb).

![image.png](https://images.viblo.asia/6aa68868-b200-49db-b1a6-56982c620ac3.png)

### 3.2 Cách kiểm tra lỗ hổng

Cách đơn giản để kiểm tra lỗ hổng này là khi bạn dùng các chức năng của website mà việc truy cập dữ liệu sẽ sử dụng id. Ví dụ những đường link có dạng /`users?id=123`, `/products?product_id=123`, `/users/user_name=test`, `/invoices?id=112233` ... Chúng ta sẽ thử cố gắng thay đổi các id này thành một số khác để xem chúng ta có thể xem thông tin của người khác hay không?
Ngoài cá request GET user có thể nhìn thấy trên URL và tiến hành thay đổi, chúng ta có thể sử dụng BurpSuite để chặn bắt và sửa đổi các request `POST`, `PUT`, `DELETE` và tiến hành thay đổi id để khai thác. Nếu thành công chúng ta có thể sửa đổi, xóa dữ liệu của người khác người dùng khác nếu hệ thống không thực hiện phân quyền.

**- Ví dụ POST request:**

![image.png](https://images.viblo.asia/a34a8c3d-9edc-4c8e-8f3f-5eedb5807e84.png)

**- Ví dụ DELETE request:**

![image.png](https://images.viblo.asia/9bf2292c-13a2-4c85-953a-a22430e7e597.png)

Lưu ý: Bạn cần xác định thông tin chúng ta xem được của người khác có phải là thông tin bí mật không thì lỗ hổng mới có giá trị

## 4. Kiểm tra lỗ hổng chức năng upload file
### 4.1 Khi nào website bị lỗi

Chức năng upload file có thể xuất hiện ở các chức năng: upload avtar, upload file ảnh, file tài liệu... Nếu website không tiến hành kiểm tra input đầu vào người dùng là các file upload (Extension file, content-type, header file, file size...) thì có thể bị kẻ tấn công khai thác các lỗ hổng như: Remote code excution (RCE) (các file thực thi: php, php7, phtml, asp, aspx...), Cross-Site Scripting (XSS) (file ảnh: .svg), deface thay đổi giao diện website ( file: .html). Đọc thêm về lỗ hổng tại: [Khai thác lỗi Unrestricted File Upload và các kỹ thuật bypass](https://viblo.asia/p/khai-thac-loi-unrestricted-file-upload-va-cac-ky-thuat-bypass-Ljy5VyNblra)

### 4.2 Khai thác lỗ hổng
Để khai thác lỗ hổng này chúng ta cần xác định việc upload file thực hiện như thế nào và thực hiện kiểm tra gì không.
Trường hợp 1: Khi webiste không kiểm tra khi upload file, lúc này việc cần làm của chúng ta là upload các file lên để khai thác. Với file `.svg`, `.html` để tấn công xss hoặc deface thì đơn giản chúng ta chỉ cần upload lên. Với lỗi remote code excution chúng ta có thể upload các file: `.php` [php shell](https://gist.github.com/joswr1ght/22f40787de19d80d110b37fb79ac3985)đổi với website chạy php, hoặc file `.asp`, `.aspx` đối với website chạy .NET...
Trường hợp 2: Khi website thực hiện kiểm tra các file upload nhưng chỉ kiểm tra ở phía client, chúng ta có thể sử dụng BurpSuite để capture request sau đó sửa nội dung của request. Nếu server không thực hiện kiểm tra phần extension của file trên phía server, chúng ta sẽ upload một file ảnh bình thường sau đó đổi phần extension thành `.php`, `.asp`, `.aspx` tùy thuộc vào xem server sử dụng ngôn ngữ gì

- Ví dụ: Website chỉ valdate phía client như sau:

![image.png](https://images.viblo.asia/d3593c92-b805-4434-9612-6c54abf423f7.png)

- Thực hiện upload file và thay đổi phần extension:

![image.png](https://images.viblo.asia/c4039c5b-4ddf-4019-8a26-57dca3333a0c.png)


# III. TỔNG KẾT
Bìa viết trên mình giới thiệu một số cách đơn giản nhất để kiểm tra một số lỗ hổng bảo mật đơn giản và phổ biến trên website mà nhiều người dùng có thể dễ dàng thực hiện. Các lỗ hổng Webiste rất đa dạng và loại lỗi cũng như cách thức khai thác khác nhau nên chúng ta cần tìm hiểu thêm nhiều lỗ hổng và cách khai thác các lỗ hỏng bảo mật. Một tài liệu có thể tham khảo là [OWSAP TOP 10](https://owasp.org/www-project-top-ten/).

Một lần nữa mình nhấn mạnh lại, bài viết chỉ hướng tới mục đích học tập và tìm hiểu nên bạn đọc cần thực sự lưu ý để tránh gặp phải những vấn đề rắc rối khi thực hiện kiểm tra lỗ hổng website khi chưa được cho phép. Hi vọng nhận được sự đón nhận của bạn đọc để mình có thể có động lực để ra tiếp phần II. Cảm ơn các bạn đã theo dõi