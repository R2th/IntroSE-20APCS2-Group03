Bạn đã bao giờ đau đầu vì không thể nghĩ nổi 1 cái tên vừa tường minh vừa không bị trùng cho class CSS chưa? Mình thì rồi đấy, và BEM đúng là cứu tính của mình. Tất nhiên đấy không phải tất cả công dụng của BEM, cùng tìm hiểu thêm về nó nhé!

## Block-Element-Modifier (BEM)
BEM _ viết tắt của Block-Element-Modifier là một tiêu chuẩn quy ước đặt tên cho các tên lớp CSS. Nó được sử dụng khá rộng rãi và vô cùng hữu ích trong việc viết CSS dễ đọc, dễ hiểu và chia tỷ lệ hơn, cũng như đặc biệt phù hợp nếu bạn dùng SASS.

BEM khuyến khích mọi người nghĩ về một trang web như một tập hợp của các khối (block), có thể tái sử dụng, hoặc kết hợp với nhau để tạo thành 1 giao diện hoàn chỉnh. Một khối chỉ là 1 phần của trang như là header, footer, sidebar,... giống như hình minh họa bên dưới.

![](https://images.viblo.asia/8925b333-2db9-42bc-ad2b-c89b2a3daf1b.png)

Block có thể bao gồm các block khác. Ví dụ như block header có thể bao gồm block logo, navigation, form search. Footer có thể bao gồm block site map.

![](https://images.viblo.asia/68d062a1-d942-4bc4-b18d-784a756cbb16.png)

Chi tiết hơn là phần tử (element), như trong tài liệu về BEM giải thích là:

> Element là 1 phần của block thực hiện 1 chức năng nhất định. Element phụ thuộc vào ngữ cảnh, và chỉ có ý nghĩa trong ngữ cảnh đó. 

Ví dụ một block form tìm kiếm chứa 2 element là ô input và button submit, giống như trong hình bên dưới. 

![](https://images.viblo.asia/c50a5e85-7781-4635-8c20-9417d6980528.png)

Mặt khác, khối block có thể là 1 list các bài viết, bên trong lại có các khối bài viết. Mỗi khối bài viết lại chứa các element ảnh, đoạn trính, "Read more"

![](https://images.viblo.asia/5a292db3-a090-43c1-a0f9-6f67c6218d31.png)

Block và element là 2 thành phần tạo nên quy ước đặt tên BEM, như sau:
* Tên block phải là duy nhất trong 1 dự án, ví dụ `box`
* Tên element là duy nhất trong mỗi block, được đặt theo cú pháp `block__element`, ví dụ `box__title`
* Các biến thể của 1 block hay element, ta sẽ thêm modifier vào sau tên của nó, cú pháp `block--modifier`, `element--modifier`, ví dụ `box--bigger`, `box__title--lighter`

Giải thích thêm 1 chút về modifier, thì nó giống như bạn có 2 box có css tương tự nhau, chỉ khác nhau về kích thước, để tránh việc phải lặp CSS thì bạn có thể để box 1 là class `box` và ở box sau ta sẽ đặt class `box box--bigger`. Nó sẽ apply toàn bộ CSS của `box` cùng vs những thay đổi trong `box--bigger`, tuy nhiên, vì file CSS đọc từ trên xuống dưới, nên `.box--bigger` phải nằm dưới class `.box` nhé!  Nếu dùng SASS, chúng ta sẽ viết thế này:

```
.box {
    &__title {
        // some CSS
    }
    
    &--bigger {
        // some CSS
    }
}
```
Rất dễ nhìn đúng ko? Vậy mới nói nó cực hợp vs SASS mà :grin:

Một ví dụ đầy đủ về BEM cho block search:
```
<form class="search">
    <div class="search__wrapper">
        <label for="s" class="search__label">Search for: </label>
        <input type="text" id="s" class="search__input">
        <button type="submit" class="search__submit">Search</button>
    </div>
</form>
```
Cách tiếp cận này có 1 số ưu điểm như sau:
* Các thành viên mới có thể dễ dàng đọc và hiểu ý nghĩa của các class
* Tên là duy nhất làm giảm khả năng bị ghi đè CSS (đỡ phải nghĩ đặt tên class, mệt thật chứ đùa :v)
* Có khả năng tái sử dụng cao

Trong phạm vi bài viết mình không thể giải thích quá nhiều, bạn có thể tìm đọc thêm ở [đây](http://getbem.com/introduction/) .

## Pug
![](https://images.viblo.asia/4d6cb686-5179-49f3-89df-8a5e149bfec6.png)

Pug, hay thường được gọi là chó mặt xệ, là giống chó thuộc nhóm chó cảnh có nguồn gốc từ Trung Quốc... ak đùa đấy, Pug hay còn gọi là PugJs mình muốn nói đến là một template engine dùng cho Node và trình duyệt. Nó biên dịch sang HTML, có cú pháp đơn giản, code dễ đọc hơn, có thể tái sử dụng. 

Để dùng thì bạn cần Install Node, npm và package pug-cli, hoặc bạn có thể vào Codepen, chọn Setting -> HTML và chọn Pug để thử trải nghiệm trước khi install, nhưng ở đó thì sẽ hơi khó để thể hiện được tính tái sử dụng của Pug :grinning: Giờ vào phần hướng dẫn sử dụng nhé!

### Cú pháp cơ bản của Pug
Thông thường Pug hay được dùng kết hợp cùng Gulp, để tự biên dịch từ Pug thành HTML, cái này mọi người có thể tìm trên mạng sẽ có khá nhiều bài hướng dẫn nhé!

Mình sẽ đưa ra 1 ví dụ đơn giản để dễ hiểu hơn, đây là 1 file HTML đơn giản
```
<html lang="en">
  <head>
    <title>Hello, World!</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <div class="remark">
      <p>Pug rocks!!</p>
    </div>
  </body>
</html>
```
Còn ở trong pug chúng ta sẽ viết thế này
```
html(lang='en')
 head
   title Hello, World!
 body
   h1 Hello, World!
   div.remark
     p Pug rocks!
```
Bạn có thấy nó khác gì không? 

Trước tiên là nó ngắn hơn, vì Pug đã loại bỏ tất cả thẻ đóng, cũng như những dấu `<`, `>`, và cũng vì nó ko có thẻ đóng, nên nó sử dụng khoảng trắng thụt đầu dòng để phân biệt thẻ nào nằm trong thẻ nào. Ví dụ, viết
```
div.remark
  p Pug rocks!!
```
sẽ được hiểu là 
```
<div class="remark">
  <p>Pug rocks!!</p>
</div>
```
Nhưng nếu bạn viết
```
div.remark
p Pug rocks!!
```
Thì nó sẽ thành thế này
```
<div class="remark"></div>
<p>Pug rocks!!</p>
```
Kể cả với những thẻ tự đóng như `<input />`, thì cũng chỉ cần viết `input` là Pug có thể tự hiểu và đóng thẻ cho bạn.
### Classes, IDs và Attributes
Cái ngắn gọn tiếp theo là thay vì phải viết `class="..."` hay `id="..."` chúng ta chỉ cần viết `.className` hay `#IDname`. 
```
nav#navbar-default  
  div.container-fluid
    h1.navbar-header My Website!
```
Thậm chí, riêng với thẻ div, chúng ta chỉ cần viết `.container-fluid` là nó tự hiểu như trên. Khi biên dịch ra HTML sẽ thành thế này
```
<nav id="navbar-default">
  <div class="container-fluid">
    <h1 class="navbar-header">My Website!</h1>
  </div>
</nav>
```
Attributes thì vẫn được để trong dấu ngoặc
```
ul
    li
      a(href='/') Home
    li
      a(href='/page-1') Page 1
  input.search(
    type='text'
    name='search'
    placeholder='Enter a search term...'
  )
```
### Text
Với văn bản thì viết bình thường ngay sau thẻ
```
h1.navbar-header My Website! We can write anything we want here …
```
hoặc xuống dòng và thêm `|` phía trước
```
p
  | You are logged in as
  | user@example.com
```
Cái này chỉ là xuống dòng cho đỡ dài thôi, chứ đến lúc hiển thị nó sẽ không xuống dòng đâu nhé, nếu muốn xuống dòng bạn có thể thêm thẻ `br` vào giữa như này
```
p
  | You are logged in as
  br
  | user@example.com
```
Ngoài ra thì còn 1 cách khác là thêm dấu chấm đằng sau thẻ tag, nhưng mình cũng ít dùng cách này
```
p.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
  commodo consequat.
```

Để tổng hợp lại những gì vừa nói, bạn có thể xem bản demo ở Codepen trong [link này](https://codepen.io/SitePoint/pen/wOgKPr)

Còn một phần vô cùng hay ho và lý do chính mình thích dùng Pug là chúng ta có thể áp dụng JS vào file HTML, như là dùng biến, điều kiện if else, vòng lặp each,... và cách tái sử dụng code trong Pug, nhưng vì bài viết đã hơi dài rồi, nên hẹn mọi người 1 bài sau mình nói riêng về phần này nha!  


https://www.sitepoint.com/css-architecture-block-element-modifier-bem-atomic-css/
https://www.sitepoint.com/a-beginners-guide-to-pug/