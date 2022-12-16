### Giới thiệu:
Chắc hẳn các bạn không lạ gì với khái niệm icon font, nếu bạn nào chưa biết thì có thể tham khảo qua bài viết này [Icon font là gì](https://viblo.asia/p/bai-17-cach-su-dung-icon-font-trong-thiet-ke-web-vyDZOzaPKwj)

Trong bài viết này mình sẽ giới thiệu tới các bạn một thư viện tạo ra bộ icons chỉ từ CSS, đó chính là thư viện có tới 500 CSS Icons - [css.gg](https://github.com/astrit/css.gg).

![](https://images.viblo.asia/4e178aed-e152-472b-8c15-fe816e5317c8.png)


Ngoài việc kế thừa lại được các ưu điểm từ icon font, bộ thư viện này được cấu thành chỉ từ CSS nên so với icon font nó rất nhẹ: Vì không cần phải tải các file fonts, có thể tải riêng từng icon thay vì load cả resource cho thư viện.

Tuy nhiên nó cũng có nhược điểm là chỉ bao gồm 500 icons, có thể sẽ chưa đáp ứng được nhu cầu của những thiết kế đa dạng.

### Cách sử dụng:
**Import thư viện:**

Để sử dụng thì chúng ta cần import thư viện vào, bằng một trong các cách sau
1. Trong thẻ HTML:
```HTML
<!-- Uncompressed - Single Icon -->
<link href='https://css.gg/icon-name.css' rel='stylesheet'>

<!-- Compressed - Single Icon -->
<link href='https://css.gg/c?=|icon-name' rel='stylesheet'>

<!-- Multiple icons  -->
<link href='https://css.gg/c?=|icon-name|icon-name|icon-name' rel='stylesheet'>

<!-- All icons  -->
<link href='https://css.gg/c' rel='stylesheet'>
```

2. Trong CSS
Bạn có thể sử dụng tính năng import của CSS
```CSS
/* Uncompressed - Single icon */
@import url('https://css.gg/icon-name.css');

/* Compressed - Single icon*/
@import url('https://css.gg/c?=|icon-name');

/* Multiple icons */
@import url('https://css.gg/c?=|icon-name|icon-name|icon-name');

/* All icons */
@import url('https://css.gg/c');
```
hoặc bằng cách copy CSS của icon paste vào file CSS trong trang web của bạn

**Thêm icon vào mã HTML**

Có thể thêm vào mã HTML như sau, tên luôn bắt đầu bởi `gg-`.
```HTML
<i class="gg-icon-name"></i>
```

**Gọi API**

Ngoài ra bạn cũng có thể sử dụng bằng cách gọi API, cụ thể như sau:
```HTML
// Single icon
https://css.gg/json?=|icon-name

// Multiple icons
https://css.gg/json?=|icon-name|icon-name|icon-name
```

**Tìm kiếm icon**

Các bạn có thể sử dụng bộ lọc và input để tìm kiếm icons theo nhu cầu của bản thân
![](https://images.viblo.asia/fbeff80b-9de3-4729-93cf-c52f3b244bf9.jpeg)


### Kết luận:
Qua bài viết này mình đã giới thiệu tới các bạn một cách mới để có thể tạo ra những icons. Nếu dự án của bạn cần ưu tiên về tốc độ, không quá cầu kì về design thì bộ icons này là một giải pháp rất tốt.