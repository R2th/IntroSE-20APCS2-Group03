Nếu bạn làm web developer thì chắc hẳn cũng đã từng chai mặt với CSS và các cú pháp của nó rồi. Có khi nào bạn đã chán với cách viết CSS thông thường và muốn tìm một cách chuyên nghiệp, magic hơn không? Hôm nay, trong bài viết này mình sẽ giới thiệu qua về **SASS/SCSS** - thứ có thể giúp các bạn viết CSS trở nên chuyên nghiệp hơn. :sunglasses:

# Định nghĩa
## 1. CSS Preprocessor
**CSS Preprocessor** dịch ra sẽ là *"tiền xử lý CSS"*, là một ngôn ngữ kịch bản mở rộng của CSS có tác dụng giúp công việc viết CSS trở nên dễ đọc, dễ viết hơn bằng cách thêm các cú pháp logic giống với các ngôn ngữ lập trình thông thường rồi sau đó nó sẽ được biên dịch thành CSS để trình duyệt có thể làm việc. Có thể kể đến một số lợi ích của nó như sau:

- Đầu tiên phải kể đến là dễ đọc, dễ viết hơn ==> dễ bảo trì hơn.
- Có tính linh hoạt và tái sử dụng cao ==> tiết kiệm thời gian, DRY.
- Có tính tổ chức, được sắp xếp một cách rõ ràng.

Hiện nay có nhiều ngôn ngữ tiền xử lý được biến đến nhưng 3 bộ tiền xử lý được xử dụng nhiều nhất hiện nay là **SASS/SCSS**, **LESS** và **Stylus**. Trong phạm vi bài viết này mình sẽ chỉ đề cập đến SASS/SCSS vì hiện tại mình chỉ sử dụng đến nó chứ chưa làm quen với 2 em kia được.

## 2. SASS/SCSS
Về mặt bản chất thì SASS với SCSS là một, giữa 2 đứa chỉ khác nhau một chút về cách viết.

**SASS** là viết tắt của cụm từ **S**yntactively **A**wesome **S**tyle **S**heets, chương trình tiền xử lý bằng ngôn ngữ kịch bản. SASS có đuôi file là `.sass`, cho phép chúng ta viết CSS mà không cần sử dụng đến dấu `;`  và cũng không còn cặp dấu ngoặc nhọn `{` `}` nữa do nó sử dụng quy tắc thụt đầu dòng để phân chia các code block.
```
body
    font-size: 14px
    color: #95a5a6
.title
    font-weight: bold
    font-size: 18px
```

**SCSS** ra đời sau SASS nên có cú phá giống với CSS hơn, thu hẹp khoảng cách giữa SASS và CSS. SCSS có phần đuôi mở rộng là `.scss`, có sử dụng dấu `;`, sử dụng ngoặc nhọn để phân chia code block. Theo quan điểm cá nhân thì mình thích sử dụng dấu ngoặc nhọn hơn vì nhìn code nó sẽ rõ ràng hơn, linh động hơn (**S**exy **CSS**).
```
body {
    font-size: 14px
    color: #95a5a6
}
.title {
    font-weight: bold
    font-size: 18px
}
```
 Ơ khác m* gì CSS đâu? Ấy từ từ, mình ví dụ thế để so sánh với SASS thôi chứ SCSS có cách viết gần giống với CSS, với nó có nhiều quy tắc mà CSS phải thèm khát lắm. Bắt đầu thôi.

# Một số quy tắc trong SASS/SCSS
## 1. Nested (chồng nhau)
HTML với CSS là một cặp trời sinh vậy mà HTML sử dụng quy tắc chồng nhau, phân cấp rõ ràng nhưng thứ đó lại không hề tồn tại trong CSS làm mỗi lần mình viết CSS là phải lặp đi lặp lại những đoạn selector có bắt đầu giống nhau. Tứk á -.-

SASS/SCSS đã khắc phục được vấn đề này với quy tắc chồng nhau, cho phép có thể lồng các selector với nhau. Điều này giúp chúng ta có thể trực quan hóa khi style cho các phần tử có dạng cha - con (phân cấp), tuân theo hệ thống phân cấp giống như HTML. 
```
nav {
    background-color: #eeeeee;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li { display: inline-block; }

    a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
    }
}
```
Nhìn qua thì thấy giống với code mình vẫn hay viết hàng ngày, điều này thuận lợi cho việc đọc và bảo trì về sau này hơn.

## 2. Variable (biến)
Trong một trang web, có rất nhiều thứ phải dùng chung để trang web có được sự thống nhất như màu sắc, cỡ chữ, thụt lề, ... Những thứ như này là cố định và nên khai báo tập trung một nơi để quản lý cũng như điều chỉnh cho dễ dàng. Giải pháp là sử dụng biến và đặt tên cho các giá trị đó, sau này nếu cần thì chỉ việc gọi lại thôi.
```
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

## 3. Mixin
Mixin dùng để nhóm khai báo CSS và tái sử dụng lại nhằm tránh việc lặp lại các đoạn mã. Một mixin có thể được sử dụng như một helper độc lập, mixin cũng có thể truyền tham số để trở nên linh hoạt hơn.

Mixin được khai báo bằng cú pháp `@mixin` và gọi bằng `@include`.
```
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```
## 4. Extend (kế thừa)
Nghe có vẻ giống với kế thừa trong `OOP`. Đúng rồi đấy, kế thừa trong SCSS giúp cho các selector có thể kế thừa các thuộc tính của nhau. Điều này giúp cho code của bạn gọn gàng hơn, tránh việc lặp lại code không cần thiết.

Để sử dụng, ta gọi `@extend`.
```
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

# Kết luận
Trên đây mình đã giới thiệu qua về SASS/SCSS và một số cú pháp chính của nó. Còn nhiều cú pháp hay ho nữa nhưng mình không kể hết trong bài viết này, nếu bạn muốn tìm hiểu thêm thì xem thêm [ở đây](https://sass-lang.com/guide) nhé.