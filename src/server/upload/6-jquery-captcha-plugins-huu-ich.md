Chào các bạn!

Như chúng ta đã biết, sử dụng captcha cho thiết kế web có vai trò rất quan trọng đối với mọi website hiện nay. Bất khi bạn đăng kí một tài khoản email mới. Bạn không thể bỏ qua bước nhập Captcha. Hay với những trang web bình chọn trực tuyến, những trang web đặt mua vé máy bay online…Tất cả đều phải dùng đến Captcha. Vậy Captcha là gì? Vì sao nên sử dụng Captcha cho thiết kế website?

**Captcha là gì?**

**Captcha** được hiểu là hình ảnh chứa một đoạn từ mã. Có thể gồm 5 chữ hoặc số liền kề hay một cụm từ nào đó. Nhưng sẽ rất khó thấy vì bị sắp xếp không theo hàng lối. Hay bị cố tình làm cho méo mó đi để khó đọc hơn.

**Captcha** là cụm từ viết tắt của **Completely Automated Public Turing test to tell Computers and Humas Apart**. Có thể hiểu là tự động kiểm tra để chứng minh bạn là con người đang có gắng truy cập vào một trang web nào đó. Nói cách khác đây là phiên bản được nâng cấp từ các bài test Turing nhằm xác định “tính con người” thực hiện bài kiểm tra đó. Đây là một loại biện pháp an ninh được coi là xác thực phản ứng. Captcha giống như một phép thử về mức độ chính xác trong phản hồi

Sử dụng captcha khi thiết kế web giúp bảo vệ người dùng khỏi spam và giải mã mật khẩu. Bằng cách yêu cầu bạn hoàn thành một bài kiểm tra Captcha đơn giản gồm hai phần: Một chuỗi các chữ cái hoặc số ngẫu nhiên được tạo ra như một hình ảnh méo mó và một hộp văn bản. Để vượt qua bài kiểm tra và chứng minh nhân thân. Bạn chỉ cần gõ các kí tự mà bạn thấy trong hình ảnh vào hộp văn bản.

Nói 1 cách khái quát thì ***CAPTCHA cơ bản là một bài kiểm tra về mức độ chính xác trong phản hồi nhằm phân biệt người dùng là con người hay robot.***

**Vậy tại sao chúng ta cần sử dụng CAPTCHA?**

Một số người nghĩ rằng, việc thêm Captcha là không có lợi ích gì, trái lại nó còn khiến cho việc thiết kế giao diện website của họ trở nên khó khăn hơn vì không biết bố cục Captcha như thế nào là hợp lý, đó là một trong những suy nghĩ sai lầm về Captcha, bởi Captcha có thể mang đến rất nhiều lợi ích khi bạn tích hợp nó vào webiste, cùng xem những lợi ích đó là gì ngay dưới đây.

- Đảm bảo lượng tương tác thật
- Đảm bảo an ninh, bảo mật
- Chống spam, tạo tài khoản tự động hoặc thực hiện tự đăng bài trong các diễn đàn, trang web.

Chính vì những lợi ích trên, bài viết này mình sẽ giới thiệu tới các bạn một số thư viện CAPTCHA vô cùng hữu ích.

## 1. MotionCAPTCHA

Để có thể pass được qua captcha này, bạn vẫn vẽ lại những hình được in ra trong box.

![](https://images.viblo.asia/c440a20d-29bf-4247-8378-e55e1e384e93.jpg)

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js"></script>
 <script src="jquery.motionCaptcha.0.2.min.js"></script>
 <link href="jquery.motionCaptcha.0.2.css"></script>
```

Demo: http://www.josscrowcroft.com/demos/motioncaptcha/
Thao khảo: https://github.com/wjcrowcroft/MotionCAPTCHA

## 2. Ajax Fancy Captcha

Mức độ bảo mật của Ajax Fancy Captcha ở mức trung bình, chú trọng vào chất lượng dễ nhìn và thân thiện với người dùng trong khi vẫn cung cấp sự bảo vệ hợp lý khỏi những vị khách không mong muốn. Thiết kế cơ bản và các yếu tố của nó rất dễ thay đổi và tùy chỉnh.

![](https://images.viblo.asia/5cb953be-0e47-40af-b3d5-7b694df3d291.jpg)

```
<!-- Begin of captcha -->
<div class="ajax-fc-container"></div>
<!-- End of captcha -->
```

Khai báo như sau:

```
<script type="text/javascript" charset="utf-8">
    $(function() {
        $(".ajax-fc-container").captcha({formId: "myForm"});
    });
</script>
```

Tham khảo: https://webdesignbeach.com/beachbar/ajax-fancy-captcha-jquery-plugin.html

## 3. qaptcha

![](https://images.viblo.asia/cf53d165-84bb-442c-9aed-c1b401dc24dd.jpg)

Tham khảo: https://www.jqueryscript.net/form/Draggable-jQuery-Captcha-Plugin-QapTcha.html

## 4. s3Capcha

![](https://images.viblo.asia/c4bd39d0-d903-430e-9091-4a754a17e8ff.jpg)

Thao khảo: http://www.serie3.info/s3capcha/

## 5. Coding a Minimalist Contact Form with CAPTCHA Spam Protection

Các hình thức liên hệ trang web gần như là một yếu tố chính của Internet hiện đại. Hầu hết các trang web của công ty sẽ có một hình thức liên lạc nhỏ nơi khách truy cập có thể chia sẻ suy nghĩ hoặc đề xuất của họ với quản trị trang web. Nhưng cũng có rất nhiều bot có sẵn mà các hình thức này có thể trở nên khó chịu với thư rác.

![](https://images.viblo.asia/523f251c-cdfd-4c71-b383-acc7d3a5586e.jpg)

Tham khảo: https://spyrestudios.com/coding-a-minimalist-contact-form-with-captcha-spam-protection/

## 6. jQuery Real Person

Plugin này được thiết kế để giúp khắc phục việc gửi biểu mẫu tự động bằng cách yêu cầu một người thực sự của Google, xác định văn bản được tạo thành từ các dấu chấm. Giá trị đã nhập được so sánh trên máy chủ với giá trị được tạo để xác định xem có nên tiếp tục xử lý hay không.

![](https://images.viblo.asia/fa588cdf-b5ad-403d-9f69-d951d05e0755.jpg)

Tham khảo: http://keith-wood.name/realPerson.html

Như vậy, qua bài viết này chúng ta cũng biết thêm được một số library hỗ trợ Captcha vô cùng hữu ích mà lại rất dễ sử dụng. Chúc các bạn tìm được thư viện ưng ý!