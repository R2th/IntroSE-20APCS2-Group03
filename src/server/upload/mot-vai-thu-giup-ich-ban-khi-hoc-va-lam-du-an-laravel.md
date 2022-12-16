Thỉnh thoảng ngồi lướt facebook mình hay focus vào các group, page về Laravel Framework, đọc về các issue mọi người hỏi và trả lời, các chia sẻ về các package cá nhân, link bài viết hay, các công nghệ mới => Đó là một cách học thêm rất thú vị.
Nhân đây mình cũng chia sẻ tới các bạn vài thứ mình góp nhặt được trong ngày hôm nay -_-
### 1. Clean Code PHP
* Giới thiệu:
    * Những nguyên lý kỹ thuật phần mềm, được trích từ cuốn sách Clean Code của Robert C. Martin, thích hợp cho ngôn ngữ PHP.
    * Đây không phải là hướng dẫn về phong cách viết code. Mà đây là hướng dẫn cách làm thế nào để viết phần mềm dễ đọc, dễ sử dụng lại, và dễ cải tiến trong PHP.
    * Bạn không cần phải tuân theo tất cả các nguyên tắc trong tài liệu này. Đây chỉ đơn giản là những hướng dẫn, nhưng dù sao nó cũng là đúc kết từ nhiều năm kinh nghiệm của tác giả cuốn sách Clean Code.
    * Repository này lấy cảm hứng từ clean-code-javascript
    * Lưu ý: Dù nhiều lập trình viên còn sử dụng PHP 5, nhưng nhiều ví dụ trong đây chỉ chạy được trên PHP 7.1+.
* Rất hữu ích cho Dev PHP chứ không chỉ riêng các new dev đâu, hơn nữa nó là tiếng Việt phù hợp cho những bạn không tốt về đọc hiểu tiếng anh, bên cạnh đó là các ngôn ngữ khác như tiếng Anh, Trung, Nga, Pháp, Thái Lan, ...
* Khá chi tiết, từ những thứ đơn giản nhất như là:
    * Sử dụng tên biến có ý nghĩa và dễ hiểu
    * Sử dụng cùng từ vựng cho cùng một loại biến
    * Đặt tên sao cho dễ tìm kiếm
    * Sử dụng các biến có tính giải thích, tránh hack não người đọc.
    * ... v.v
* Rồi đến các hàm:
* OOP
* Giải thích về SOLID
    * Nguyên lý trách nhiệm duy nhất (SRP)
    * Nguyên lý Đóng/Mở (OCP)
    * Nguyên lý thay thế Liskov (LSP)
    * Nguyên lý phân tách interface (ISP)
    * Nguyên lý đảo ngược dependencies (DIP)
* Nguyên lý DRY
* **Via**: https://github.com/codeatnyte/clean-code-php

### 2. Laravel code
Khá thú vị, **implode.io** cung cấp cho ta các cửa sổ editor và run code laravel online, bạn có thể chọn version php (php5.6, php7.0, php7.1 và php7.2) và laravel version (5.3 -> 5.6).

* **Bạn có thể test PHP code**
            ![](https://images.viblo.asia/17c99b31-9416-447b-9b8e-6e82860caeec.png)
* **Test Eloquent & Database để check.**
            ![](https://images.viblo.asia/75b801e4-7c50-46c8-b3a4-4403b431b2eb.png)
* **Hoặc Blade Template**
            ![](https://images.viblo.asia/a5234af4-25cd-43fd-8e75-3558ada08569.png)
* **Bạn có thể login vs tài khoảng github và tạo fiddle cho mình rồi chia sẻ cho mọi người.**
            ![](https://images.viblo.asia/dd9d7565-c328-40de-9382-0de9353cb4e6.png)
* **Hoặc tham khảo các ví dụ của mọi người chia sẻ trên đây**
            ![](https://images.viblo.asia/dd63485c-07d4-439c-808c-1e643aabb39d.png)
* **Ví dụ**: https://implode.io/examples/database-query-builder
* **Còn một vài tính năng khác bạn có thể tự trải nghiệm.**

### 3. Generate Tests by Using your App
* Phù hợp với các bạn làm dự án phải viết unit test =))
* Đó là "Laravel TestTools Adds Dusk Support" một Laravel TestTools và là một Google Chrome extension được viết bởi Marcel Pociot.
* Bạn có thể tham khảo tại đây: https://laravel-news.com/laravel-testtools-dusk
* **Video demo**: [https://video.twimg.com/tweet_video/Dgrvqk2W4AAywRs.mp4](https://video.twimg.com/tweet_video/Dgrvqk2W4AAywRs.mp4)