<p align="center">Nằm nghe sóng vỗ từng lớp xa</p>
<p align="center">Bọt tràn theo từng làn gió đưa</p>
<p align="center">Một vầng trăng sáng với tình yêu chúng ta</p>
<p align="center">Vượt ngàn hải lý cũng không xa...</p>

Nhạc sĩ Lam Phương trong một lần đến thăm Nha Trang đã viết bài ***Biển Tình*** ngọt ngào lãng mạn đến thế.
Không biết bóng hồng trong bài hát là ai, nhưng ông đã đem chuyện tình ấy vào bài hát thật da diết.

Chắc hẳn ai cũng đã từng mong muốn đặt chân đến 2 thành phố biển nổi tiếng của Việt Nam là Đà Nẵng và Nha Trang. Đều là 2 thành phố của miền Trung đầy nắng gió, tuy nhiên mỗi nơi lại có một đặc trưng về cảnh quan riêng. Đà Nẵng, nơi tìm về của những cây cầu lung linh nghiêng mình bên dòng sông Hàn thơ mộng, nơi có những di sản văn hoá lâu đời của sự hoài cổ mang trong mình kiến trúc đậm nét Á Đông. Còn với Nha Trang, người ta sẽ nhớ đến một thành phố biển lộng gió với những hàng dừa nghiêng mình bên dải cát trắng ôm lấy bờ biển xanh, những hòn đảo cùng hệ sinh thái phong phú bao quanh thành phố.

![](https://images.viblo.asia/1bd85eaa-fb8d-4451-a3ca-f575a0e227b9.jpg)

Để tiếp tục chuyến du lịch, mình sẽ giới thiệu đến các bạn một vài điểm khác nhau giữa những điều tưởng giống nhau nhé.

### 1. `alt` và `title`
Đều là 2 thuộc tính sử dụng phổ biến đối với `<img />`. Tuy nhiên, mỗi thuộc tính lại có một chức năng riêng.
```html
<img
   src="./images/ahihi.jpg"
   alt="Sự khác nhau giữa những điều tưởng giống nhau - Phần 2"
   title="Sự khác nhau giữa những điều tưởng giống nhau - Phần 2"
/>
```
#### - alt
- Thuộc tính `alt` là văn bản thay thế dùng làm nội dung của element khi element không được hiển thị bình thường. Nó là thuộc tính được sử dụng phổ biến ở thẻ `<img />`.
- Khi không thể tải hình ảnh, trình duyệt sẽ hiển thị văn bản thay thế ở vị trí của nó để người dùng có thể biết lý do tại sao hình ảnh được đưa vào.
- `alt` là thuộc tính quan trọng để "tham dự" trong kho tìm kiếm của Google, được khuyến khích sử dụng nếu muốn SEO.

#### - title
- Thuộc tính `title` là văn bản chú thích được nhìn thấy khi được hover.
- Ngoài việc sử dụng trên `img`, nó còn được sử dụng ở nhiều tag khác, thường dùng cho trường hợp thay thế như ***tooltip***, ***truncate text***...

#### - Tips
Thông thường, khi làm việc với `img`, anh em thường quên việc định nghĩa `alt` điều này rất không nên vì nó sẽ ảnh hưởng đến chất lượng SEO của bạn. Vì vậy, mình sẽ có 1 thủ thuật bằng CSS để nhận diện những hình ảnh chưa có `alt`.

```scss
// Những thanh niên img nào chưa có "alt" sẽ được sáng nhất đêm nay
img:not([alt]),
img[alt=""] {
    outline: 8px solid red;
}
```

Còn đối với anh em nào dùng VS Code có thể sử dụng extension [webhint](https://marketplace.visualstudio.com/items?itemName=webhint.vscode-webhint) để giúp cảnh báo điều đó dễ dàng.

![](https://images.viblo.asia/a419f054-d48d-4414-90a6-13afe1957cc5.png)

### 2. `<button>` và `<input type="button" />`
#### - button
- Có thể sử dụng `pseudo-elements` như `:before` và `:after` để style
- Attribute mặc định của `<button>` là `type="submit"`, nếu không được định nghĩa, khi submit vẫn hoạt động được trong thẻ `<form>`
#### - input type="button"
- Không thể sử dụng `pseudo-elements` như `:before` và `:after` vì `<input />` là thẻ ***single tag***
- Để có thể submit được `form`, phải đổi lại `<input type="submit" />`
#### - Tips
- Nên sử dụng tag `<button>` vì có thể khai thác được tối đa style. 
- Nên định nghĩa rõ ràng `attribute` cho từng chức năng của button, ví dụ
```html
<button type="submit"> // submit form
<button type="reset"> // reset lại giá trị ban đầu của form
<button type="button"> // không làm gì cả, ấn cho vui
```

### 3. `<div>` và `<section>`
Phiên bản HTML5 đã cho ra thuật ngữ [Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp) - là những tag mới được ra mắt. Trong đó thẻ `<section>` được khuyến khích sử dụng thay thế cho `<div>`. Vậy nó khác nhau những gì?

#### - div
- `div` là thẻ đã quá quen thuộc, tuy nhiên nó không có ý nghĩa đặc biệt. Thường được sử dụng như một khối của phần tử con (thông thường nếu muốn tag đó mặc định là `display=block`).
- Ngoài sự khác biệt về semantic, `div` có constructor interface riêng là `HTMLDivElement`.
#### - section
- Sinh ra để nhóm các element con liên quan, thường dùng cho 1 đoạn content.

![](https://images.viblo.asia/039ddb56-f68f-4a20-8687-ced895e8d372.png)

Ví dụ bên trên, `<section>` sẽ là thẻ wrapper bao phần title `<h3>` và những đoạn text `<p>`, `<img />` và cũng có thể bao những thẻ `<div>` khác.
- Ngoài `section` ra thì các thẻ semantic khác như `article`, `footer`, `header`, `main`, `navbar` lại có cùng constructor interface là `HTMLElement`.


#### - Tips
- Có một điều thú vị là nếu phần tử `heading` được lồng ở nhiều cấp `section`, khi đó `font-size` của mỗi cấp element heading sẽ giảm xuống. Còn đối với `div` thì không bị ảnh hưởng.
```pug
section
  h1 Section title
  section
    h1 Title sub section

div
  h1 Div title
  div
    h1 Title sub div
```

![](https://images.viblo.asia/2b925fe4-5029-41a6-8808-4fc72d171edc.png)

Để tận dụng điều này, anh em có thể style cấp độ `font-size` của các `heading` thông qua đoạn CSS sau
```scss
/* First level */
:-webkit-any(article,aside,nav,section) h1 {
  font-size: 1.5em;
}

/* Second level */
:-webkit-any(article,aside,nav,section) 
:-webkit-any(article,aside,nav,section) h1 {
  font-size: 1.2em;
}

/* Third level */
:-webkit-any(article,aside,nav,section) 
:-webkit-any(article,aside,nav,section) 
:-webkit-any(article,aside,nav,section) h1 {
  font-size: 1.00em;
}

/* Fourth level */
:-webkit-any(article,aside,nav,section) 
:-webkit-any(article,aside,nav,section) 
:-webkit-any(article,aside,nav,section) 
:-webkit-any(article,aside,nav,section) h1 {
  font-size: .8em;
}
```
- Nên sử dụng `section` cho những đoạn content lớn thay vì chỉ dùng `div` truyền thống.
- Mặc định, các element không được xác định sẽ có kiểu mặc định là `display: inline`, vì vậy cần phải cần reset những tag mới của HTML5
```scss
article, aside, footer, header, nav, section {
  display: block;
}
```
- HTML5 semantic chỉ hỗ trợ cho phiên bản IE 9 trở lên, nếu bạn vẫn muốn được support thì có thể convert bằng cách
```js
<!--[if lt IE 9]>
<script>
  document.createElement("article");
  document.createElement("aside");
  document.createElement("footer");
  document.createElement("header");
  document.createElement("nav");
  document.createElement("section");
</script>
<![endif]-->
```

### Tổng kết
Trên đây là một số điểm khác biệt mà quá trình làm mình nhận ra. Hi vọng sau bài này sẽ giúp các bạn trong làng code có thêm kiến thức để tránh những phát sinh không mong muốn. Hãy đón chờ những bài sau để cùng mình đi du lịch nữa nhé :D