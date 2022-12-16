Đây là một bài viết được dịch từ : https://www.valuecoders.com/blog/technology-and-apps/laravel-best-php-framework-2017/. Vì vậy bài viết thường xuyên sử dụng danh xưng là chúng tôi. :D

**Sau đây mình xin dịch lại nội dung bài viết.**

Chọn một PHP framework phù hợp để phát triển ứng dụng web cho doanh nghiệp có thể là một nhiệm vụ rất khó khăn vì có rất nhiều lựa chọn có sẵn. Từ vài năm trước, chúng tôi đã sử dụng Laravel framework một cách thường xuyên. Chúng tôi cũng đã làm việc và thử nghiệm với các PHP framework khác. Tuy nhiên, chúng tôi cần một số tính năng và khả năng bổ sung. Trong blog trước của chúng tôi, nơi chúng tôi đã thảo luận về các khung phát triển PHP hàng đầu. Trong bài viết này, chúng tôi sẽ thảo luận về những gì khiến chúng tôi thấy rằng Laravel là PHP framework tốt nhất năm 2018.

Hiện tại, Laravel có 38132 star trên Github. Dưới đây là hình ảnh được đưa ra để cho thấy hiện tại có bao nhiêu trang website được tạo ra bằng cách sử dụng Laravel.
![](https://images.viblo.asia/2f8d7e64-b241-4006-87ff-0dcbb689422f.png)

Bây giờ bạn đã biết rằng tại sao Laravel được sử dụng bởi nhiều ngành công nghiệp trên toàn thế giới. Bây giờ, hãy xem những lợi thế kỹ thuật chính nào làm cho Laravel trở thành tốt nhất trong tất cả.

### Reasons why Laravel is the best PHP framework:

<br>

**1.  Authorization Technique:**

Laravel làm cho việc thực hiện các kỹ thuật xác thực (authentication) trở nên rất đơn giản. Hầu như tất cả mọi thứ được cấu hình một cách phi thường. Laravel cũng cung cấp một cách đơn giản để tổ chức logic ủy quyền(authorization) và kiểm soát quyền truy cập vào tài nguyên.

**2. Object-Oriented Libraries:**

Một trong những lý do hàng đầu làm cho Laravel trở thành PHP framework tốt nhất là nó có các thư viện hướng đối tượng và nhiều thư viện được cài đặt sẵn khác, không tìm thấy trong bất kỳ PHP framework phổ biến nào khác. Một trong những thư viện được cài đặt sẵn là thư viện Authentication. Mặc dù dễ thực hiện, nhưng nó có nhiều tính năng nâng cao, chẳng hạn như kiểm tra người dùng hoạt động, băm mật mã, đặt lại mật khẩu, bảo vệ CSRF (Cross-site Request Giả mạo) và mã hóa.

**3. Artisan**

Laravel cung cấp một công cụ được tích hợp sẵn có tên là ```Artisan```. Một developer thường phải tương tác với Laravel bằng cách sử dụng commend line và xử lý môi trường trong dự án Laravel. Laravel cung cấp một công cụ tích hợp cho commend line gọi là ```Artisan```. Công cụ này cho phép chúng ta thực hiện phần lớn các task lặp đi lặp lại và tẻ nhạt mà hầu hết các developer không muốn thực hiện thủ công.

**4. MVC Support:**

Một lý do khác làm cho Laravel trở thành PHP framework tốt nhất là nó hỗ trợ kiến trúc MVC như ```Symfony```, đảm bảo sự rõ ràng giữa logic và presentation. MVC giúp cải thiện hiệu suất và có nhiều chức năng tích hợp. Đây là cách thức hoạt động của MVC đối với Laravel.

![](https://images.viblo.asia/e68e9655-44a4-4a9b-aeb6-e41460195f46.png)

**5. Security:**

Trong khi phát triển một ứng dụng, mọi người đều phải sử dụng một số hoặc các cách khác để làm cho ứng dụng được an toàn. Laravel quan tâm tới  security trong khuôn khổ của nó. Nó sử dụng salted và hash password, có nghĩa là mật khẩu sẽ không bao giờ lưu dưới dạng văn bản thuần túy trong cơ sở dữ liệu. Nó sử dụng thuật toán băm ```Bcrypt``` để generate một đại diện được mã hóa của mật khẩu. Laravel sử dụng các câu lệnh SQL đã chuẩn bị khiến các cuộc tấn công injection không thể thực hiện. Cùng với đó, Laravel cung cấp một cách đơn giản để tránh việc người dùng truyền ```<script>``` tag. Dưới đây là các tính năng bảo mật mà Laravel cung cấp:
    
 ![](https://images.viblo.asia/659220fe-1b6a-4b3e-8fa4-a9f632be9d34.jpg)
 
 **6. Database Migration**
 
 Một điểm đau đầu của các developer là giữ cho cơ sở dữ liệu được đồng bộ giữa các máy phát triển. Với database migration của Laravel, nó cực kỳ dễ dàng. Sau thời gian làm việc dài, bạn có thể đã thực hiện nhiều thay đổi đối với cơ sở dữ liệu và, trong tùy chọn của chúng tôi, MySQL Workbench không phải là một cách tuyệt vời để đồng bộ hóa cơ sở dữ liệu giữa các máy phát triển của tôi. Đi vào migration. Miễn là bạn giữ cho tất cả các cơ sở dữ liệu hoạt động trong quá trình migration và seed, bạn có thể dễ dàng migrate các thay đổi vào bất kỳ máy phát triển nào khác mà bạn có. Đây là một lý do khác làm cho Laravel trở thành PHP framework tốt nhất.
 
![](https://images.viblo.asia/45b9f097-202c-43c1-87f3-66a76b11e609.jpg)

Đọc thêm: https://www.valuecoders.com/blog/technology-and-apps/laravel-spark-6-0-now-available/#
    
**7. Great Tutorials (Laracasts):**

Bạn hoặc developer của bạn cần tìm hiểu thêm để cung cấp nhiều hơn. Không giống như những framework khác (Codeigniter, Yii, CakePHP, v.v.) Laravel cung cấp Laracasts có tính năng kết hợp các hướng dẫn bằng video miễn phí và trả phí để chỉ cho bạn cách sử dụng Laravel. Các video đều được thực hiện bởi Jeffery Way, một chuyên gia và người hướng dẫn giàu kinh nghiệm. Với những tutorial chất lượng cao, và các bài học chu đáo và có ý nghĩa.

**8. Blade Templating Engine:**

Blade template engine của Laravel rất trực quan và giúp làm việc với ```PHP/HTML``` spaghetti điển hình tốt hơn rất nhiều, đó là một trong những tính năng tốt nhất của framework. Nếu bạn đã từng phải xử lý một câu lệnh if có HTML bên trong nó, bạn sẽ biết chính xác ý tôi là gì. Nhưng với Blade, nó rất dễ dàng. Đây là cách nó thực hiện:

![](https://images.viblo.asia/9c1b52f5-3141-4ec0-a9ff-8ad458fbc0a3.png)

**9. Responsable Interface**

**10. Automatic Package Discovery**

Trước đây trong các phiên bản trước của Laravel, không dễ để cài đặt các package. Tuy nhiên, trong Laravel 5.5, một tính năng mới có tên Automatic Package Discovery sẽ tự động phát hiện các package mà người dùng muốn cài đặt. Có nghĩa là bây giờ người dùng không phải thiết lập bất kỳ aliases  hoặc provider nào để cài đặt các package mới trong Laravel. Ngoài ra, Laravel 5.5 cho phép các nhà phát triển vô hiệu hóa tính năng này cho các package cụ thể.

Thêm thông tin: https://laravel-news.com/category/laravel-5.5