Mọi chuyện không phải bàn nếu những dòng CSS của bạn chỉ vỏn vẹn 500 dòng hoặc ít hơn. Nhưng sẽ không bao giờ có điều đó xảy ra! Viết CSS chưa bao giờ là một công việc đơn giản. Một khi mà đoạn CSS ngày một nhiều thì nó lại càng có nhiều vấn đề trong việc chỉnh sửa, bổ sung,... dẫn tới việc khó maintain sau này. Bài viết này sẽ giới thiệu về SCSS, BEM và cách kết hợp của cả 2 phương thức. Tuy nhiên bài viết này sẽ không đi sâu vào từng phương pháp, mà sẽ giới thiệu và chỉ ra ưu điểm cũng như cách kết hợp cả 2 lại để quản lý CSS được tối ưu hơn.

# SCSS
SCSS là gì? SCSS là một CSS pre-processor. Đơn giản nó là một tổ hợp CSS, và nó thêm nhiều tính năng mà CSS đơn thuần ko có: variables (biến), nesting, imports và mixins. Cùng tiếp tục tìm hiểu về các tính năng này nhé!

### Variables 
Trong SCSS ta có thể dễ dàng đặt biến với mục đính chính đó là có thể **tái sử dụng**. Lấy 1 ví dụ đơn giản, giả sử bạn có vài màu chủ đạo sẽ dùng xuyên suốt 1 trang web, vậy thì bạn có thể đặt biến cho các loại màu này và khi sử dụng thì chỉ cần gọi nó ra mà thôi. 

```
// Khai báo biến
$primary-color: #0099ff;
// Gọi đến biến
h1 {
  color: $primary-color;
}
```

Như vậy là toàn bộ thẻ heading sẽ có màu là *#0099ff* giả sử nếu thiết kế có thay đổi màu chủ đạo thì bạn ko cần phải sửa từng dòng có màu đó, mà chỉ cần sửa ở phần khai báo biến mà thôi. 

### Nesting 
Chúng ta có thể nest 1 đoạn CSS vào trong một CSS khác:

```
h1 {
  font-size: 5rem;
  color: blue;
}
h1 span {
  color: green;
}
```

Nesting với SCSS
```
h1 {
  font-size: 5rem;
  color: blue;
  
  span {
    color: green;
  }
}
```

Với cách này chúng ta sẽ dễ dàng đọc code hơn, và nếu như sau này có thay đổi gì thì chỉ cần tìm đến thằng cha để chỉnh sửa. Việc maintain cũng sẽ dễ dàng và nhẹ nhàng hơn rất nhiều. 

### Import
Khi nhắc đến việc bảo trì và dễ đọc codem thì việc dồn hết tất cả code vào trong 1 file lớn là một điều rất không nên. Tất nhiên là nó vẫn có thể hoạt động bình thường đối với những project nhỏ, nhưng ở mức độ chuyên nghiệp hơn thì... đừng bao giờ làm như vậy. May thay SCSS sẽ giúp ta trong việc này.

Bạn có thể tạo những file nhỏ bằng cách đặt tên file với dấu gạch chân đầu tên: _animation.scss, _base.scss, _variables.scss

Và khi đó, chúng ta sẽ dùng **import** để ghép file.

Giả dụ chúng ta đang tạo một animation cho header, chúng ta sẽ tách riêng 2 file này ra, và viết riêng đoạn CSS cho nó 
Đây là đoạn CSS cho animation:
```
// _animations.scss
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

Và chúng ta cần đoạn CSS trên cho header thì chỉ cần import animation vào như sau:
```
// header.scss
@import "animations";
h1 {
  animation: appear 0.5s ease-out;
}
```

# Tổ chức CSS code với BEM
BEM là gì? BEM viết tắt của **B**lock **E**lement **M**odifier. Chúng ta sẽ tìm hiểu rõ hơn ngay sau đây:

### Blocks
Hiểu một cách đơn giản, block chính là một khối to chứa các khối con. 

```
<div class = "block">
    <div class = "element-1">...</div>
    <div class = "element-2">...</div>
</div>
```

**Cách đặt tên:** `.block`
**Ví dụ:** .card, .form, .post,...

### Elements
Nếu Block là khối cha thì Elements chính là khối con. Lấy ví dụ này cho dễ hiểu: Nếu ```.face``` là một khối cha thì ta có các element như là ```.eye```, ```.nose```, ```.ear```,...
```
<div class = "face">
    <div class = "eye">...</div>
    <div class = "nose">...</div>
    <div class = "ear">...</div>
</div>
```

**Cách đặt tên:** `.block__element`
**Ví dụ:** .card__header, .form__footer, .post__date,...

### Modifiers
Block hay Elements cũng cần phải thay đổi chút color, font-size,... phải không nào? Thế nên Modifiers sinh ra để làm việc này. Nó giống như một cái cờ đặt vào Block hoặc Element để thay đổi màu sắc, kích thước,... cho chúng vậy.

**Cách đặt tên:** `.block--modifier`, `.block__element--modifier`
**Ví dụ:** .post--important , .post__btn--disabled...

# Kết hợp SCSS và BEM 
Một vài người sẽ thấy hơi lúng túng khi kết hợp 2 phương pháp này lại nhưng một khi đã hiểu rồi thì chả bảo giờ muốn viết CSS như trước đây nữa! 
Lấy một ví dụ:

```
<div class = "card">
    <div class = "card__header">
    <div class = "card__body card__body--bg-red">
    <div class = "card__footer">
</div>
```

Vậy viết BEM trong SCSS như thế nào? Rất đơn giản như sau:
Chúng ta sẽ sử dụng ```&__``` cho element và ```&--``` cho modifiers 

```
.card {
    &__header {...}
    &__body {
        ...
        &--bg-red {...}
    }
    &__footer {...}
}
```
Vậy là xong!

<hr>
Bài viết tham khảo: https://medium.freecodecamp.org/how-to-get-better-at-writing-css-a1732c32a72f