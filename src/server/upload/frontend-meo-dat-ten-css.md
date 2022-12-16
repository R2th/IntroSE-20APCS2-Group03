Chào bà con, hôm nay mình lại đến tháng đây, những bài trước mình hay nói về laravel, vuejs và docker , thì đến bài này mình đổi bọt tý nhé, mình sẽ nói về css nhé, 

CSS không phải là “ngôn ngữ” đẹp nhất, nhưng nó đã thành công trong việc làm front-end cho các website trong hơn 20 năm nay. Tuy nhiên, khi bạn viết nhiều CSS, bạn sẽ nhận ra được thấy một nhược điểm lớn. Quá khó để developer có thể maintain CSS. Các bạn có thể hình dung khi bạn nhận 1 dự án về để maintain bạn đọc 1 cái file main.css của nó xem thế nào nhé, nếu dev trước code không có quy tắc nào thì nó là 1 đống bùi nhùi và nó sẽ trở thành ác mộng của bạn khi bạn maintain nó đấy, nhưng dưới đây mình sẽ nói ra 1 vài quy ước đặt tên giúp bạn giảm vô số giờ để debug

# Sử dụng dấu phân cách "-"
Nhiều bạn code js hay đặt tên biến theo kiểu **cameCase** như
```js
var navHeader = document.getElementById('...')
```
sau đó đặt tên id của div đấy cũng là 
```js
<div id="navHeader"></div>
```
như thế này đúng là không có vấn đề gì nhưng mà nó không phù hợp nếu bạn sử dụng id để cho Css, đùng bao giờ viết css là 
```css
#navHeader {
    border: 1px solid red
}
```
thay vì thế hãy đặt như thế này 
```css
#nav-header {
    border: 1px solid red
}
```
đây là 1 tiêu chuẩn đặt tên cho Css và điều này được cho là dễ đọc hơn và nó cũng phù hợp vơi thuộc tính của Css
```css
// Correct
.some-class {
   font-weight: 10em
}
// Wrong
.some-class {
   fontWeight: 10em
}
```
# Quy ước đặt tên BEM
BEM giúp chúng ta giải quyết 3 vấn đề
1. Để biết 1 selector làm cái gì , chỉ cần nhìn vào tên của nó
2. Để có 1 ý tưởng về nơi mà một selector được sử dụng, chỉ cần nhìn vào nó
3. Để biết mối quan hệ giữa các classname chỉ càn nhìn vào nó
Bạn đã bao giờ nhìn thấy class name viết như thế này chưa
```css
.nav--secondary {
  ...
}
.nav__header {
  ...
}
```
Đó chính là quy tắc BEM đấy
Vậy BEM là gì và tác dụng của nó là gì, thì mình sẽ nói rõ hơn nhé
## BEM (Block Element Modifiers)
BEM là 1 quy ước đặt tên cho các class trong html và css , nó được viết tắt từ các từ Block, Element, Modifier, 
### Quy ước đặt tên
```css
    .block {}   /* Block */
    .block__element {}  /* Element */
    .block--modifier {}  /* Modifier */
```
1. .**block** Thành phần cấp to nhất của abstraction hoặc component. 
2. .**blockelement** Thành phần con bên trong của block 
3. .**block--modifier** Là 1 phiên bản # của block. Hay những thay đổi style khác so với style ban đầu


Ví dụ 1

-----


```html
  <a class="btn btn--green" href="#"></a>
```
Ở đây btn là **block**
.**btn---green** là modifier. Style của chúng ta như sau
```css
 .btn {
      background: gray;
      border: 0;
      
      border-radius: 3px;
      box-shadow: none;
      padding: 5px 20px;
      color: #fff;
      font-size: 18px;
      line-height: 1.5;
   }
 /* style .btn--green   */
 
  .btn--green {
      background: green;
  }
```
> **Modifire**: Các bạn cứ hiểu như là những thay đổi về style của .btn có 1 số điểm style khác so với .btn ban đầu. Ở đây btn--green thay đổi background từ màu xám sang màu xanh. Các bạn có thể thay đổi màu background, font-size, padding .... 
> 
Ví dụ 2

-----
```html
<div class="info">
  <div class="info__title">
  </div>
  <div class="info__description">
  </div>
</div>
```
Ở đây info__title, info__description là **element** con bên trong info.
```css
  .info {
    background: #f2f4f7;
    margin-top: 23px;
    padding-bottom: 30px;
    &__description {
      font-size: 15px;
      font-family: "Kozuka Gothic Pr6N", sans-serif;
    }
    &__title {
      font-size: 20px;
      font-family: "Kozuka Gothic Pr6N", sans-serif;
      font-weight: bold;
    }
  }

```
### Lý do nên sử dung BEM

1.  Bạn không phải đau đầu suy nghĩ để đặt tên class html, css nữa
2.  Giúp code viết đơn giản hơn, dễ sửa chữa, maintain
### Tham khảo
[1. Topdev](https://topdev.vn/blog/meo-quy-uoc-ten-cho-css-giup-ban-rut-ngan-23-thoi-gian-khi-debug/?fbclid=IwAR3tjqPn1SG9TgpU13ohyjqPewH6WlLrdC0hEuGC9K5DyfZHmDMB4wi5Fyc#giai-thich-bem)

[2. Techtalk](https://techtalk.vn/su-dung-ky-phap-bem-cho-css.html)