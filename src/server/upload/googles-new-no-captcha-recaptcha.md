## 1. Khái niệm?
**CAPTCHA** viết tắt của **C**ompletely **A**utomated **P**ublic **T**uring test to tell **C**omputers and **H**umans **A**part - Phép thử Turing công cộng tự động để phân biệt máy tính với người.

reCAPTCHA là dịch vụ CAPTCHA miễn phí được cung cấp bởi Google, giúp bảo vệ các website khỏi spam và lạm dụng. Thêm reCAPTCHA vào website, có thể chặn phần mềm tự động đồng thời cho phép người dùng hợp pháp truy cập dễ dàng.

reCAPTCHA hỗ trợ các trình duyệt sau:
- Máy tính (Windows, Linux, Mac): Chrome, Firefox, Safari, IE/Edge
- Di động: Chrome, Safari, Android native browser

Sử dụng reCAPTCHA cho website rất đơn giản. Trước hết, hãy đăng ký tại [đây](https://www.google.com/recaptcha/admin#createsite), sau đó làm theo hướng dẫn trên màn hình. Có thể trải nghiệm reCAPTCHA tại https://www.google.com/recaptcha/api2/demo

No CAPTCHA reCAPTCHA là phiên bản 2 của CAPTCHA, được phát hành năm 2014.
## 2. Lịch sử
reCAPTCHA ban đầu được Google tạo ra dựa vào việc robot không có khả năng đọc văn bản bị bóp méo.

Tuy nhiên, theo nghiên cứu mới nhất của Google, công nghệ Artificial Intelligence (AI) có thể giải quyết cả những biến thể khó nhất của văn bản bị bóp méo với độ chính xác lên đến 99,8%. Do đó, văn bản bị bóp méo đã không còn là một giải pháp đáng tin.

Để chống lại điều này, Google đã phát triển No CAPTCHA reCAPTCHA, xem xét toàn bộ sự tương tác của người dùng với CAPTCHA (trước - trong - sau) để xác minh người dùng có phải con người hay không. Điều này không chỉ khắc phục những nhược điểm của văn bản bóp méo, mà còn mang lại trải nghiệm tốt hơn cho người dùng.

Các phiên bản reCAPTCHA:
- reCAPTCHA V1 có nhiều dạng, nhưng đây là những dạng phổ biến nhất:

![](https://images.viblo.asia/195d5246-55db-4b81-8825-fdafd43c50c8.png)
- reCAPTCHA V2 (No CAPTCHA reCAPTCHA) trông giống như sau:

![](https://images.viblo.asia/6aa77f9d-81ac-4baf-9345-bb4bf8a81d40.gif)
- ReCAPTCHA V3 (Invisible reCAPTCHA): Hiện tại, Google đang tiến thêm một bước nữa là làm cho reCAPTCHA vô hình. Người dùng là con người sẽ được cho phép mà không nhìn thấy checkbox "I'm not a robot", trong khi những người đáng ngờ và bot vẫn phải giải quyết các thử thách.
## 3. Lợi thế
**Bảo mật nâng cao**: Chống lạm dụng và spam cho các website
- reCAPTCHA được trang bị công nghệ hiện đại, luôn đi đầu trong xu hướng chống spam và lạm dụng.
- reCAPTCHA không chỉ dựa vào văn bản bị bóp méo để phân biệt con người với máy móc. Thay vào đó, nó sử dụng các kỹ thuật phân tích rủi ro nâng cao, xem xét toàn bộ sự tương tác của người dùng với CAPTCHA và đánh giá một loạt các dấu hiệu phân biệt con người với bot.
- reCAPTCHA là nhà cung cấp CAPTCHA được sử dụng rộng rãi nhất trên thế giới, cở sở xác định hoạt động lạm dụng đa dạng, vì vậy kẻ xấu không thể che giấu.

**Dễ sử dụng**: Tương tác dễ dàng cho người dùng
- Dễ dàng với con người và khó cho bot.
- Đối với người khiếm thị, reCAPTCHA cung cấp thêm tùy chọn CAPTCHA âm thanh. Người dùng hợp pháp của bạn sẽ thấy CAPTCHA âm thanh đơn giản. Mặt khác, bot sẽ nhận được CAPTCHA âm thanh khó hơn nhiều.

**Tạo ra giá trị**: Tận dụng nỗ nực giải CAPTCHA của con người để mang lại lợi ích cho cộng đồng. Hàng triệu CAPTCHA được giải mỗi ngày, chúng được chuyển thành số hóa văn bản, chú thích hình ảnh và xây dựng bộ dữ liệu Machine Learning. Điều này giúp bảo quản sách, cải thiện bản đồ và giải quyết các vấn đề khó khăn cho AI.
- reCAPTCHA cải thiện kiến thức về thế giới thông qua việc tạo CAPTCHA với hình ảnh có văn bản lấy từ Google Street View. Khi văn bản trong các CAPTCHA này được xác minh, thông tin sẽ được sử dụng để làm cho cải thiện sự chính xác, chi tiết của Google Maps.

![](https://images.viblo.asia/7a99d642-7577-493e-838e-2945a2c8b62d.png)
- reCAPTCHA giúp giải quyết các vấn đề khó trong AI. Nhiều hình ảnh được lưu trữ thành bộ dữ liệu cho hệ thống Machine Learning, tạo ra những đột phá trong AI.

![](https://images.viblo.asia/a47e232b-33f8-4006-a788-f5f45ca68063.jpg)
- reCAPTCHA số hóa sách bằng cách biến những từ không thể đọc được bằng máy tính thành CAPTCHA để mọi người giải. Từng chữ một, một cuốn sách được số hóa và lưu giữ trên mạng để mọi người tìm và đọc.

Từ khi No CAPTCHA reCAPTCHA ra mắt, hàng triệu người dùng internet đã có thể chứng thực họ là con người chỉ bằng thao tác click chuột. Nhiều website áp dụng No CAPTCHA reCAPTCHA như [Snapchat](https://support.snapchat.com/login2?next=/) , [WordPress](https://wordpress.org/support/register.php) , [Humble Bundle](https://www.humblebundle.com/)... đã và đang nhận được những kết quả tuyệt vời.
## 4. Cách hoạt động
*Google giữ bí mật các thuật toán của họ, vì vậy không thể biết chính xác cách No CAPTCHA reCAPTCHA hoạt động.*

Google có quyền phân tích hoạt động của người dùng trên tất cả các dịch vụ họ cung cấp. Do đó, việc xác minh có thể không chỉ giới hạn ở website sử dụng No CAPTCHA reCAPTCHA.

Ví dụ: Nếu xác định được thiết bị của người dùng từng thực hiện các hành động giống con người như: Kiểm tra Gmail, tìm kiếm trên Google, duyệt web... thì có thể bỏ qua xác minh hình ảnh. Ngược lại, nếu không thể liên kết thiết bị với bất kỳ hoạt động nào giống con người nào trong quá khứ, thì sẽ được yêu cầu xác minh hình ảnh.

Đối với xác minh hình ảnh, sẽ không thể tìm thấy những hình ảnh đó bằng tính năng Reverse Image Search hoặc tạo cơ sở dữ liệu về chúng. Chúng thường là các biển báo giao thông, số nhà bất kỳ được chụp bởi Google's Street View hay các từ trong sách được cung cấp bởi Google Books...

Khi đăng nhập [Chatwork](https://www.chatwork.com/) với Google Chrome:
- Đang đăng nhập Gmail: Chỉ với thao tác click chuột, sẽ được xác nhận không phải là robot
- Không đăng nhập Gmail hay bất kỳ dịch vụ nào của Google (Chể độ ẩn danh): Xác minh hình ảnh sẽ được đưa ra

![](https://images.viblo.asia/c343a3a5-235b-42d4-a509-e76b679bd35a.png)

**Tham khảo:**

[reCAPTCHA: Tough on bots Easy on humans](https://www.google.com/recaptcha/intro/invisible.html?ref=producthunt)

[reCAPTCHA Help](https://support.google.com/recaptcha/?hl=en)

[Are you a robot? Introducing "No CAPTCHA reCAPTCHA"](https://developers.google.com/search/blog/2014/12/are-you-robot-introducing-no-captcha)