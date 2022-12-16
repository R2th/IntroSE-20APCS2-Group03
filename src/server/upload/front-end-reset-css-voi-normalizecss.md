Mình thật sự chưa biết <strong>CSS Reset</strong> là gì cho đến khi mình gặp một vài vấn đề liên quan trong quá trình code giao diện.

Hôm bữa mình đang ngồi code mấy cái thẻ <code>div</code> ngon lành, chèn CSS khí thế đủ thứ kiểu, lúc sau inspect vào cái mấy <code>div</code> tự dưng lại thấy xuất hiện thêm một <code>padding-top</code> khác từ đầu ra.

Sau quá trình tìm hiểu, mình mới nhận ra nguyên do là mỗi phần tử <code>HTML</code> đều có những quy tắc hiển thị khác nhau tuỳ theo mỗi trình duyệt. Và đó là lí do mình viết bài post này. Hãy share và bình luận nếu các anh em cảm thấy nó hữu ích. Ahihi  :pray: :pray: :pray:

Đây là link bài viết của tui:

**[https://hungphamdevweb.com/front-end-reset-css-voi-normalize-css.html](https://hungphamdevweb.com/front-end-reset-css-voi-normalize-css.html)**

<h2>CSS Reset là gì ?</h2>
Chúng ta hãy dành một tí phút để tìm hiểu, trước khi sử dụng nó nhé :joy_cat:. Cũng giống như cái title <strong>CSS Reset</strong>, hiển nhiên nó là một số thuộc tính CSS dùng để "cài đặt" lại tất cả các CSS của trình duyệt về mặc định.

Việc này là tối quan trọng nếu các anh em không muốn viết nhiều phiên bản CSS trên project của mình riêng cho mỗi trình duyệt.

Thực chất nếu các anh em chỉ thường sử dụng các <code>CSS Framework</code> như Bootstrap, thì cũng chả cần quan tâm vấn đề này vì hầu như chúng luôn được include trong tất cả <code>Front End Framework</code> như trên.

Chúng ta chỉ thực sự để tâm đến <b>CSS Reset</b> khi các anh em muốn tạo riêng cho mình một <code>Mini CSS Framework</code> để xây dựng giao diện với một số công nghệ giới hạn CSS như <a href="https://www.ampproject.org/"><strong>Google AMP</strong></a>

![](https://images.viblo.asia/862fa59a-63c2-4974-8e8c-72f34e9ad2e8.jpg)

<h2>Thư Viện CSS Reset Normalize.css</h2>
Các anh em có thể tìm hiểu và download <code>Normalize</code> ở đây nhé <a href="https://necolas.github.io/normalize.css/"><strong>Normalize.css</strong></a>.

Có rất nhiều thư viện về <b>CSS Reset</b> nhưng ở đây mình sẽ chỉ giới thiệu về Normalize thôi, bởi vì độ phổ biến và sự tin dùng của nó.

![](https://images.viblo.asia/d1bc6fdf-d302-4856-b24a-36e67e8fb34c.png)

Cơ bản <code>Normalize</code> là một chuỗi các thuộc tính chuyên dùng chỉ để Reset CSS.

Dưới đây là một đoạn code nhỏ trong <code>Normalize</code>
```
/**

 * 1. Correct the line height in all browsers.
 
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}
```
Ở đây người ta cũng đã chú thích rất kỹ, các anh em chỉ cần đọc sơ qua thôi cũng sẽ hiểu.
<h2>Nguyên Tắc Sử Dụng CSS Reset</h2>
Dưới đây là một vài nguyên tắc hoạt động <strong>CSS Reset</strong>, các anh em nên biết sơ qua trước khi bắt đầu code giao diện:
<h3>Rule 1: CSS Reset luôn ở đầu tiên trong các file CSS</h3>
Điều này thì các anh em đã rõ như ban ngày rồi. Nếu nó là một file riêng hãy import nó ở trên cùng, còn nếu copy thì cũng nên nhớ paste nó ở trên cùng file CSS của mình.
<h3>Rule 2: CSS Reset luôn xử lý các element HTML</h3>
Nhiệm vụ của <b>CSS Reset</b> là làm việc trực tiếp với các element chứ không phải các class hay ID nào cả. Bởi nó sẽ làm việc với trình duyệt, mà các trình duyệt cũng làm cách tương tự để thêm các CSS mặc định vào.
<h3>Rule 3: Custom CSS Style phải gọi vào các Class/ID hoặc có parent element</h3>
Điều này rất rõ ràng và cần thiết trong <strong>Code Standards</strong>:
Bạn nên code vào <code>.button</code> thay vì <code>a.button</code>
Bạn nên code vào <code>.list li</code> thay vì <code>ul li</code> hay <code>ul.list li</code>
Việc tránh gọi các element trình duyệt mà sử dụng Class/ID đóng vai trò quan trọng giúp bạn dễ dàng xử lý xung đột giữa <strong>CSS Reset</strong> và Custom Style.
<h2>Kết Luận</h2>
Mặc dù <strong>CSS Reset</strong> đã là một kiến thức lỗi thời rồi nhưng mình nghĩ cũng còn đại đa số các anh em <code>Developer</code> như mình vẫn chưa có biết. Nếu muốn sớm trở thành một <strong>Senior Front-end</strong>, mình nghĩ đây là một kiến thức căn bản mà bất kì <code>Coder</code> nào cũng cần phải có.

Mọi thắc mắc vui lòng để lại bình luận nhé, thân ái và quyết thắng :joy_cat: :joy_cat: :joy_cat: