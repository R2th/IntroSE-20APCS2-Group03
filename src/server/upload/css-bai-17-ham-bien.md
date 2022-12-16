Trong bài này, chúng ta sẽ nói về một số hàm chức năng và biến trong CSS. Bài viết này được thực hiện sau khi mình đã đăng tải xong các bài giới thiệu về khái niệm biến và hàm trong JavaScript và cũng là trong lập trình máy tính nói chung. Vì vậy nên mình giả định là bạn đã biết hàm và biến là cái gì rồi. Ở đây chúng ta sẽ chỉ giới thiệu cú pháp trong CSS và làm các ví dụ để sử dụng thôi.

## Các hàm trong CSS

Tuy không phải là một ngôn ngữ lập trình và không hỗ trợ nhiều cấu trúc điều kiện với khả năng xử lý logic linh hoạt. CSS vẫn cung cấp cho chúng ta nhiều hàm tiện ích hỗ trợ một số thao tác tính toán đơn giản. Các hàm này được sử dụng để cung cấp các giá trị đặc biệt cho nhiều thuộc tính khác nhau. Dưới đây là 2 liên kết tham khảo về danh sách các hàm trong CSS.

- [**Tài liệu của W3schools**](https://www.w3schools.com/cssref/css_functions.asp) bao gồm những hàm phổ biến nhất đang được hỗ trợ bởi phiên bản CSS hiện tại.
- [**Tài liệu của Mozilla Developer Network**](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions) bao gồm cả các hàm đang được thử nghiệm cho các phiên bản CSS sắp phát hành và được hỗ trợ bởi các trình duyệt nighty build cho các dev.

Ở đây chúng ta sẽ làm ví dụ giới thiệu một vài hàm phổ biến nhất. Khởi đầu với `calc()`. Hàm này được sử dụng để tính toán các biểu thức toán học do người viết code cung cấp và tạo ra giá trị số học linh động sử dụng cho các thuộc tính. Chúng ta sẽ thử phác họa một lưới nội dung thường được sử dụng trong các trang web bán hàng bằng các khối `inline-block` được quy định độ rộng `width` linh động với `calc`.

```calc.css
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

.calc-grid {
   padding: 30px 15px;
   text-align: center;
}

.calc-card {
   display: inline-block;
   width: calc(100% / 4 - 10px);
   height: 210px;
  
   background: lightgray;
}
```

```calc.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <title>A Grid created by Calc</title>

   <link rel="stylesheet" href="calc.css">  
</head>
<body>
   <div class="calc-grid">
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
      <div class="calc-card"></div>
   </div>
</body>
</html>
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/PoEPvKy)

Trong cách thực hiện dàn vị trí các khối như trên thì các thẻ `.calc-card` là các khối `inline-block` nên sẽ được trình duyệt web thiết lập vị trí trong dòng chảy nội dung như các từ trong một đoạn văn bản bên trong `.calc-grid`. Với `font-size` mặc định thì các từ sẽ cách nhau khoảng 5px. Lúc này nếu chúng ta muốn dàn một lưới nội dung với 4 cột thì sẽ cần độ rộng các khối là `100% / 4` và giảm đi vài `px` nữa để bù trừ cho `word-spacing` mặc định.

Hãy thử làm một ví dụ khác với hàm `attr()`. Hàm này được sử dụng để truy xuất giá trị thuộc tính của chính phần tử được chọn. Ở đây chúng ta cần cung cấp cho hàm tên của thuộc tính cần đọc.

```attribute.css
.post-prev:after,
.post-next:after {
  content: " (" attr(href) ")";
}
```

```attribute.html
<article class="post">
   <!-- Tiêu đề và nội dung chính của bài viết -->
  
   <a class="post-prev" href="https://viblo.asia/p/css-bai-16-cac-hoat-anh-tu-tao-Az45bRbq5xY">
      [CSS] Bài 16 - Hàm & Biến
   </a>
   <br>
   <a class=post-next href="#">
      (Sắp đăng tải) [CSS] Bài 18 - Grid & Flex
   </a>
</article>
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/BaJjjBQ)

Chúng ta vừa mới truyền vào hàm `attr()` biến `href` đã được định nghĩa sẵn bởi phần tử `<a>` được chọn. Dường như việc sử dụng biến trong CSS để lưu trữ một vài giá trị cần được sử dụng lại nhiều lần cũng có nhiều lợi ích. Hãy nói về các biến tự tạo trong CSS.

## Sử dụng các biến tự tạo

Trước hết chúng ta cần một trường hợp ví dụ. Giả sử thiết kế web của bạn dùng tone màu chính `accent` với một giá trị màu nào đó cho nhiều thành phần trên trang web. Có chỗ thì dùng `accent` làm màu nền, có chỗ thì dùng `accent` làm màu chữ, có chỗ lại dùng `accent` làm màu viền. Lúc này nếu như chúng ta xử lý bằng cách tạo các class tiện ích như Bootstrap để gắn vào các thành phần cần sử dụng thì code CSS sẽ như thế này.

```colors.css
.bg-accent { color: royalblue; }
.border-accent { color: royalblue; }
.text-accent { color: royalblue; }
```

Khá tiện lợi rồi, nhưng khi mà chúng ta cần thay đổi `accent` bằng màu khác thì chúng ta vẫn phải thay đổi giá trị màu ở nhiều nơi vì có nhiều class tiện ích. Thay vì vậy thì chúng ta có thể sử dụng một biến `accent` để lưu giá trị và dùng cho các class tiện ích này.

```colors.css
body {
   --accent: royalblue;
}

.bg-accent { color: var(--accent); }
.border-accent { color: var(--accent); }
.text-accent { color: var(--accent); }
```

Như bạn đã nhìn thấy trong code ví dụ, để định nghĩa một biến trong CSS, chúng ta sử dụng cú pháp là `--tên_biến: giá_trị_gán;`. Và biến này sẽ có phạm vi sử dụng là ở bất kỳ đâu bên trong phần tử `body`.

Bài viết về sử dụng hàm và biến trong CSS của chúng ta tới đây là kết thúc. Trong bài viết tiếp theo, chúng ta sẽ nói về bộ công cụ hỗ trợ canh chỉnh bố cục của các thành phần trong trang web. Trước đó thì chúng ta xử lý tác vụ này bằng `position` và rồi rất nhanh chóng chúng ta đã làm quen với Bootstrap. Tuy nhiên việc hiểu được các công cụ được cung cấp bởi CSS sẽ rất quan trọng để có thể sử dụng và tùy biến Bootstrap tự tin hơn. Hẹn gặp lại trong bài viết tiếp theo.

[**[CSS] Bài 18 - Grid & Flex**](https://viblo.asia/p/naQZRRwvZvx)