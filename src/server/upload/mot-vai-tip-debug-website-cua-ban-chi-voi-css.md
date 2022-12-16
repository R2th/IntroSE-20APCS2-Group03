Mình nghĩ bất cứ ai trong đời cũng đã từng trải qua cảm xúc này. Bạn, đang ngồi vui vẻ giữa bạn bè, mọi thứ tưởng chừng như rất ổn, ai cũng đang cười đùa, nhưng bất giác, bạn lại cảm nhận được một nỗi buồn ở trong lòng... mà không hiểu được rằng nỗi buồn ấy lại xuất phát từ đâu cả.

Thứ cảm xúc kỳ quặc ấy thật ra lại là một trong những cảm xúc đặc biệt nhất của con người, của những chàng trai, cô gái đang theo nghề code.

Nó có thể xuất phát từ một sự tổn thương trong quá khứ. Ngày ấy khi bạn chưa kịp hàn gắn nỗi đau ấy thì đã phải giấu nó vào đáy sâu trong tiềm thức, cố gắng quên nó đi, mà không biết rằng di chứng của biến cố mãi mãi để lại một lớp filter trong thế giới quan của bạn, thay đổi cách bạn nhìn về cuộc sống, cách bạn hành xử với những người xung quanh. 

Ừa... đấy là cảm xúc bình thường của một coder thôi, là cảm giác fixbug. Nhưng với lần bài viết lần này, mình sẽ chia sẻ đến các bạn một vài tip khá thú vị, giúp mọi thứ trở nên đơn giản hơn chỉ với vài dòng `CSS`. 

![](https://images.viblo.asia/aeec3c25-aaa6-4055-bd4a-19ca57116444.jpg)

Khác với `Javascrip`, `HTML` khi bị viết sai cũng chẳng có điều gì xảy ra, thoạt nhìn thì có vẻ êm đềm, không ồn ào và kinh hãi như những cơn bão ở miền Trung. Ngày nay source dự án đều được setup các loại tool để validator, hoặc nếu thủ công hơn thì check ở https://validator.w3.org/. Tuy nhiên cũng có cách khác thông qua CSS, giúp mình dễ dàng phát hiện những thiếu sót làm cho website bạn bị thiếu đi tính "awesome".

### Faulty or Missing Link Targets
```scss
a:not([href]),
a[href="#"],
a[href=""],
a[href*="javascript:void(0)"] {
    // css style code
}
```

### Unaccessible Images
```scss
img:not([alt]) {
    // css style code
}
```
`alt` là một thuộc tính rất quan trọng trong website, nó có vai trò lớn đến việc SEO. Trước đây, để check `meta` và `alt` cho website mình hay sử dụng extension này https://chrome.google.com/webstore/detail/alt-meta-viewer/jjcjblcbnjhgjlnclhficglfjedhpjhl?hl=vi. Nhưng sau khi khám phá ra các dùng css thì mình thấy khá thú vị.

Nếu bạn có rules kỹ hơn với project, cũng có thể sử dụng cách sau, đây là cách check `alt` nếu không có nội dung.
```scss
img[alt=""] {
    // css style code
}
```

### Missing Document Language
```scss
html:not([lang]),
html[lang=""] {
    // css style code
}
```
Đây là một thuộc tính quan trọng nên có, nó dùng để xác định website thuộc ngôn ngữ gì, từ đó giúp cho google dễ dàng đề xuất translate. Hay nói cách khác nó là tín hiệu để sàng lọc người đọc trang ở ngôn ngữ nào, có thể xác định cách nội dung của trang được đọc.

### Incorrect Character Set
Thẻ `<meta>` cũng rất quan trọng, nó được dùng để mã hóa ký tự `UTF-8` - bảng mã phổ biến nhất hiện nay, thường là template được đề xuất cho HTML document.

Tốt nhất, thẻ này nên để đầu tiên sau thẻ `<head>`.
```scss
meta[charset="UTF-8"]:not(:first-child) {
    // css style code
}
```
    
### Unaccessible Viewport Attributes
```scss
meta[name="viewport"][content*="user-scalable=no"],
meta[name="viewport"][content*="maximum-scale"],
meta[name="viewport"][content*="minimum-scale"] {
    // css style code
}
```

Đây là selector có thể được sử dụng để làm nổi bật các thuộc tính meta viewport không thể truy cập. Thông thường, để tránh hạn chế khả năng thao tác khung nhìn của user bằng cách resize trình duyệt. Vì vậy, sử dụng `user-scalable=no, maximum-scale` hoặc `minimum-scale` không bao giờ nên được sử dụng.

### Unlabelled Form Elements
Các phần tử trong form có sự liên quan rất hay, về mặt UI/UX cũng rất quan trọng đối với người dùng. Ví dụ bạn muốn focus vào 1 field `input`, thay vì phải click vào field `input`, bạn cũng có thể click vào `label`.

Để làm được điều này, bạn phải check mối quan hệ giữa `id` của `input` và `for` của `label`. Đoạn css dưới đây là để check việc này.

```scss
input:not([id]),
select:not([id]),
textarea:not([id]) {
    // css style code
}

label:not([for]) {
    // css style code
}
```

Ngoài ra, để check `<form>` bị thiếu `id` hoặc `name` cũng có thể sử dụng cách sau:
```scss
form:not([name]):not([id]) {
    // css style code
}
```

### Empty Interactive Elements
Các elements tương tác như thẻ `<a>` liên kết hoặc `<button>` thường được gắn nhãn bởi nội dung của chúng. Thuộc tính này dùng để check các element được tạo ra nhưng không có nội dung, giúp hạn chế những dư thừa không đáng có.

```scss
button:empty, 
a:empty {
    // css style code
}
```

### Unnecessary or Deprecated Attributes
Để phát hiện ra những thuộc tính dư thừa, không còn cần thiết cho HTML nữa, cách sau cũng là một giải pháp hay.
```scss
script[type="text/javascript"],
link[rel="stylesheet"][type="text/css"] {
    // css style code
}
```

### Inline Styles
Cuối cùng là check những element nào sử dụng `inline style`, đây là cách viết chống chế, đường cùng. Cách viết này không được khuyến khích, muốn check những chỗ nào code ẩu bằng `inline style` anh em có thể sử dụng đoạn này.
```scss
*[style] { 
    border: 2px solid red;
}
```

### Tổng kết
Ngoài việc sử dụng extension, package hay những cải tiến của browser thì đây cũng là 1 cách khá thú vị cho những người thích dùng code làm nên đại sự. Vừa rồi là một vài tips để anh em giúp dự án của mình awesome hơn, nếu có tips hay, hãy để lại dưới comment. Cảm ơn mọi người đã dành thời gian đọc bài chia sẻ của mình.