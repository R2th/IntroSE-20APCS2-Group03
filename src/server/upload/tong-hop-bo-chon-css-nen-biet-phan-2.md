Bạn có thể xem lại Tổng hợp bộ chọn CSS nên biết (Phần 1) của mình [tại đây](https://viblo.asia/p/tong-hop-bo-chon-css-nen-biet-phan-1-XL6lAdvmZek#_1--0).
# 10. X[title]
```css
a[title] {
   color: green;
}
```

Được xem là một bộ chọn thuộc tính, trong ví dụ trên, điều này sẽ chỉ chọn các thẻ liên kết có một thuộc tính title. Các thẻ liên kết không có sẽ không nhận được phong cách đặc biệt này.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 11. X[href="foo"]
```css
a[href="https://net.tutsplus.com"] {
  color: #1f6053; /* nettuts green */
}
```

Đoạn code ở trên sẽ định phong cách cho tất cả các thẻ liên kết liên kết đến https://net.tutsplus.com chúng sẽ nhận được màu xanh của chúng ta. Tất cả các thẻ liên kết khác sẽ không bị ảnh hưởng.

> Lưu ý rằng chúng ta đang bao các giá trị trong dấu ngoặc kép. Đồng thời hãy nhớ làm điều này khi sử dụng công cụ chọn CSS dựa trên JavaScript. Khi có thể, hãy luôn luôn sử dụng các bộ chọn CSS3 thay vì các phương pháp không chính thức.

Tuy nhiên, điều này hoạt động tốt, hơi cứng nhắc một chút. Điều gì xảy ra nếu các liên kết không thực sự hướng đến Nettuts+, mà, có thể, đường dẫn nettuts.com thay vì url đầy đủ? Trong những trường hợp đó chúng ta có thể sử dụng một chút biểu thức chính quy.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes2.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 12. X[href*="nettuts"]
```css
a[href*="tuts"] {
  color: #1f6053; /* nettuts green */
}
```

Bạn thấy rồi đó; đó là những gì mà chúng ta cần. Cái ngôi sao chỉ định rằng giá trị phía sau phải xuất hiện ở đâu đó trong giá trị của thuộc tính. Bằng cách đó, nó bao hàm cả nettuts.com, net.tutsplus.com, và thậm chí tutsplus.com.

Hãy nhớ rằng đây là một bộ chọn rộng. Điều gì xảy ra nếu thẻ liên kết liên kết đến một số trang web không phải Envato với chuỗi tuts trong url? Khi bạn cần cụ thể hơn, hãy sử dụng ^ và $, để tham chiếu bắt đầu và kết thúc của một chuỗi, tương ứng.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes3.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 13. X[href^="http"]
```css
a[href^="http"] {
   background: url(path/to/external/icon.png) no-repeat;
   padding-left: 10px;
}
```

Có bao giờ tự hỏi làm thế nào một số trang web có thể hiển thị một biểu tượng nhỏ bên cạnh các liên kết mà là liên kết bên ngoài? Tôi chắc là bạn đã nhìn thấy nó trước đây; chúng đang nhắc khéo rằng các liên kết sẽ chỉ dẫn bạn tới một trang web hoàn toàn khác nhau.

Đây là một biểu thức với biểu tượng dấu mũ. Nó thường được sử dụng nhiều nhất trong các biểu thức chính quy để chỉ về chuỗi bắt đầu của một chuỗi. Nếu chúng ta muốn nhắm chọn tất cả các thẻ liên kết có một href bắt đầu bằng http, chúng ta có thể sử dụng một bộ chọn tương tự như đoạn code trên.

> Lưu ý rằng chúng ta không tìm kiếm https://; điều đó là không cần thiết, và không tính luôn các url mà bắt đầu bằng https://.

Bây giờ, nếu chúng ta muốn thay phong cách cho tất cả các thẻ liên kết mà liên kết tới, ví dụ, một bức ảnh thì sao nhỉ? Trong những trường hợp đó, hãy tìm kiếm phần cuối của chuỗi.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes4.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera
# 14. X[href$=".jpg"]
```css
a[href$=".jpg"] {
   color: red;
}
```

Một lần nữa, chúng ta sử dụng một biểu tượng của biểu thức chính quy, $, để tham chiếu đến phần cuối của một chuỗi. Trong trường hợp này, chúng ta đang tìm kiếm tất cả các liên kết mà liên kết đến một hình ảnh - hoặc ít nhất là một url kết thúc bằng .jpg. Hãy nhớ rằng điều này chắc chắn sẽ không làm việc cho gif và png.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes5.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 15. X[data-*="foo"]
```css
a[data-filetype="image"] {
   color: red;
}
```

Xem lại phần số tám; làm thế nào để chúng ta bù vào tất cả các kiểu hình ảnh khác: png, jpeg, jpg, gif? Vâng, chúng ta có thể tạo nhiều bộ chọn, chẳng hạn như:

```css
a[href$=".jpg"],
a[href$=".jpeg"],
a[href$=".png"],
a[href$=".gif"] {
   color: red;
}
```

Nhưng, đó là cách rất chậm, và không hiệu quả. Một giải pháp có thể là sử dụng các thuộc tính tùy chỉnh. Nếu chúng ta thêm thuộc tính data-filetype riêng của chúng ta vào mỗi liên kết mà liên kết đến một hình ảnh thì sao?

```html
<a href="path/to/image.jpg" data-filetype="image"> Image Link </a>
```

Sau đó, với cái móc đó, chúng ta có thể sử dụng một bộ chọn thuộc tính tiêu chuẩn để chỉ nhắm chọn những liên kết đó.

```css
a[data-filetype="image"] {
   color: red;
}
```

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes6.)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 16. X[foo~="bar"]
```css
a[data-info~="external"] {
   color: red;
}
 
a[data-info~="image"] {
   border: 1px solid black;
}
```

Dưới đây là một cái đặc biệt mà sẽ gây ấn tượng với bạn bè của bạn. Không quá nhiều người biết về thủ thuật này. Biểu tượng ~ cho phép chúng ta nhắm chọn một thuộc tính trong đó có một danh sách các giá trị được phân chia bởi khoảng trắng.

Cùng với thuộc tính tùy chỉnh của chúng ta từ phần số 15, ở trên, chúng ta có thể tạo ra một thuộc tính data-info, có thể nhận một danh sách phân chia bởi khoảng trắng của bất cứ điều gì chúng ta cần phải lưu ý đến. Trong trường hợp này, chúng ta sẽ để ý đến các liên kết bên ngoài và các liên kết đến hình ảnh - ví dụ như vậy.

```html
"<a href="path/to/image.jpg" data-info="external image"> Click Me, Fool </a>
```

Với mã đánh dấu đã có, bây giờ chúng ta có thể nhắm chọn bất kỳ thẻ nào có một trong những giá trị đó, bằng cách sử dụng bộ chọn thuộc tính ~.

```css
/* Target data-info attr that contains the value "external" */
a[data-info~="external"] {
   color: red;
}
 
/* And which contain the value "image" */
a[data-info~="image"] {
  border: 1px solid black;
}
```

Khá tiện lợi, phải không?

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/attributes7.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 17.  X:checked
```css
input[type=radio]:checked {
   border: 1px solid black;
}
```

Lớp giả này sẽ chỉ nhắm chọn một phần tử giao diện người dùng đã được tích chọn - giống như một nút radio, hoặc checkbox. Nó chỉ đơn giản như vậy.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/checked.html)

**Tương thích**
* IE9+
* Firefox
* Chrome
* Safari
* Opera

# 18. X:after
```css
.clearfix:after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
    }
 
.clearfix { 
   *display: inline-block; 
   _height: 1%;
}
```

Cách giải quyết này sử dụng lớp giả :after để nối thêm một khoảng trắng phía sau phần tử, và sau đó clear nó. Đây là một mẹo tuyệt vời cần có trong bộ công cụ của bạn, đặc biệt là trong các trường hợp khi overflow:hidden; là không thể.

> Theo các đặc điểm kỹ thuật của các bộ chọn CSS3, về mặt kỹ thuật bạn nên sử dụng các cú pháp phần tử giả với dấu hai dấu hai chấm ::. Tuy nhiên, để duy trì tương thích, user-agent sẽ chấp nhận một cách sử dụng một dấu hai chấm. Trong thực tế, vào thời điểm này, tốt hơn là nên sử dụng phiên bản một dấu hai chấm trong các dự án của bạn.

Demo

**Tương thích**
* IE8+
* Firefox
* Chrome
* Safari
* Opera

# 19. X:hover
```css
div:hover {
  background: #e3e3e3;
}
```

Thuật ngữ chính thức cho việc này là lớp người dùng tương tác giả. Nghe có vẻ khó hiểu, nhưng nó thực sự không có gì khó hiểu cả. Bạn muốn áp dụng phong cách cụ thể khi người dùng di chuyển chuột qua một phần tử phải không? Nó sẽ giúp bạn hoàn thành công việc!

> Hãy nhớ rằng phiên bản cũ của Internet Explorer không phản hồi khi lớp giả :hover được áp dụng cho bất cứ thứ gì khác ngoài một thẻ liên kết.

Bạn sẽ thường xuyên sử dụng bộ chọn này khi áp dụng, ví dụ, một border-bottom vào thẻ liên kết, khi di chuyển chuột qua.

```css
a:hover {
 border-bottom: 1px solid black;
}
```

Demo

**Tương thích**
* IE6 + (Trong IE6, :hover phải được áp dụng cho một phần tử liên kết)
* Firefox
* Chrome
* Safari
* Opera

# 20. X:not(selector)
```css
div:not(#container) {
   color: blue;
}
```

Lớp giả phủ định là đặc biệt hữu ích. Giả sử rằng tôi muốn chọn tất cả các thẻ div, ngoại trừ một cái trong đó có một id là container. Đoạn code ở trên sẽ xử lý nhiệm vụ đó một cách hoàn hảo.

Hoặc, nếu tôi muốn chọn tất cả các phần tử (không nên), trừ các thẻ cho đoạn văn, chúng ta có thể làm:

```css
*:not(p) {
  color: green;
}
```

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/not.html)

**Tương thích**
* IE9+
* Firefox
* Chrome
* Safari
* Opera

# Tổng hợp
Mình xin tổng hợp lại thành bảng dưới đây.

| Bộ chọn | Ví dụ | Mô tả các ví dụ CSS | Phiên bản CSS |
| -------- | -------- | -------- | -------- |
| [attribute]     | [target]     | Chọn tất cả các phần tử có cùng thuộc tínhị     | 2     |
| [attribute=value]     | [target=\_blank]    | Chọn tất cả các phần tử có thuộc tính bằng giá trị( target=”\_blank”)     | 2     |
| [attribute~=value]     | [title~=flower]     | Chọn tất cả các phần tử có tiêu đề của thuộc tính có chứa từ “flower”     | 2     |
| [attribute|=value]     | [lang|=en]     | Chọn tất cả các phần tử có giá trị thuộc tính “lang” bắt đầu bằng “en”     | 2     |
| [attribute^=value]     | a[href^=”https”]     | Chọn tất cả các phần tử  \<a> có giá trị thuộc tính “href” bắt đầu bằng “https”     | 3     |
| [attribute$=value]     | a[href$=”.pdf”]     | Chọn tất cả các phần tử \<a> có giá trị thuộc tính “href” kết thúc bằng”.pdf”     | 3     |
| [attribute*=value]     | a[href*=”timoday”]	     | 	Chọn tất cả các phần tử \<a> có giá trị thuộc tính “href” chứa chuỗi”timoday”     | 3     |
| :active     | a:active     | Chọn tất cả các liên kết được kích hoạt     | 1     |
| :checked     | input:checked     | Chọn tất cả các phần tử \<input> đang được chọn (selected)     | 3     |
| ::after     | p::after     | Chèn thêm nội dung ngay phía sau của các phần tử \<p>     | 2     |
| ::before     | p::before     | Chèn thêm nội dung ngay phía trước của các phần tử \<p>     | 2     |
| :disabled   | input:disabled     | Chọn tất cả các phần tử \<input> đang được vô hiệu hoá (disabled)     | 3     |
| :enabled   | input:enabled     | Chọn tất cả các phần tử \<input> đang được kích hoạt     | 3     |
| :empty     | p:empty     | Chọn tất cả các phần tử  \<p> không chứa phần tử con (bao gồm cả các nút văn bản)     | 3     |
| :hover     | a:hover     | Chọn các liên kết khi chuột di chuyển qua     | 1     |
| :not(selector)     | :not(p)     | Chọn tất cả các phần tử không phải là một phần tử \<p>     | 3     |