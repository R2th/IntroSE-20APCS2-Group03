Bài viết này mình xin được tổng hợp lại các bộ chọn **CSS** cần nhớ.
# 1. *
```css
* {
 margin: 0;
 padding: 0;
}
```
Biểu tượng **\***  sẽ nhắm chọn tất cả các phần tử trên trang. Ở code trên, sử dụng thủ thuật này để loại bỏ margin và padding của tất các các phần tử trên trang. Mặc dù đây là công cụ để nhanh chóng kiểm tra, nhưng chúng ta đừng bao giờ sử dụng nó trong code. Nó thêm quá nhiều gánh nặng cho trình duyệt, và là không cần thiết.

Dấu * cũng có thể được sử dụng với các bộ chọn con.
```css
#container * {
 border: 1px solid black;
}
```
Điều này sẽ chọn mọi phần tử mà là con của #container. Một lần nữa, chúng ta đừng lạm dụng kỹ thuật này quá nhiều.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/star.html)

**Tương thích**
* IE6+
* Firefox
* Chrome
* Safari
* Opera
# 2. #X
```css
#container {
   width: 960px;
   margin: auto;
}
```
Gắn vào đằng trước biểu tượng # cho một bộ chọn cho phép chúng ta chọn bằng id. Và css tương ứng này sẽ được áp dụng duy nhất cho 1 phần tử có id="X". Đây là một cách sử dụng dễ dàng và phổ biến nhất. Nhưng nó cứng nhắc và không cho phép tái sử dụng. Nếu có thể, trước tiên cố gắng sử dụng một tên thẻ, một trong những phần tử HTML5 mới, hoặc thậm chí là một lớp.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/id.html)

**Tương thích**
* IE6+
* Firefox
* Chrome
* Safari
* Opera

# 3. .X
```css
.error {
  color: red;
}
```
Đây là một bộ chọn lớp (class). Sự khác nhau giữa id và các class đó là, với class, bạn có thể chọn nhiều phần tử. Sử dụng các class khi bạn muốn phong cách của bạn được áp dụng cho một nhóm các phần tử. Ngoài ra, sử dụng id để tìm một phần tử duy nhất, và chỉ định css cho 1 phần tử cụ thể.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/class.html)

**Tương thích**
* IE6+
* Firefox
* Chrome
* Safari
* Opera

# 4. X Y
```css
li a {
  text-decoration: none;
}
``` 
Bộ chọn được nhắc đến nhiều nhất tiếp theo là chọn **phần tử con**. Khi ta cần cụ thể hơn với các bộ chọn, thì ta hãy sử dụng cái này.

 Ví dụ trên có nghĩa là tất cả các tag a nằm trong tag li thì đều mang giá trị css text-decoration: none. X Y chỉ là đại diện cho selector. Không nhất thiết phải là tag element. Ta có thể hoặc xen kẽ thêm nhiều tấng id, class, type selector.
```css
#table td.title  {
    text-align: center;
}
```

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/descend.html)

**Tương thích**
* IE6+
* Firefox
* Chrome
* Safari
* Opera

# 5. X
```css
a {
    color: red;
}

ul {
    margin-left: 0;
}
```
Điều gì xảy ra nếu ta muốn nhắm chọn tất cả các phần tử trên một trang, theo kiểu của chúng, chứ không phải là một id hoặc tên lớp. Hãy giữ cho nó đơn giản, và sử dụng một bộ chọn theo kiểu. Nếu ta cần nhắm chọn tất cả các danh sách không có thứ tự, hãy sử dụng ul { }.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/tagName.html)

**Tương thích**
* IE6+
* Firefox
* Chrome
* Safari
* Opera
# 6. X + Y
```css
ul + p {
   color: red;
}
```
Đây được gọi là một bộ chọn liền kề. Nó sẽ chỉ chọn các phần tử mà nằm ngay sau phần tử trước đó. Trong trường hợp này, chỉ có đoạn văn đầu tiên sau mỗi ul sẽ có chữ màu đỏ.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/adjacent.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 7. X > Y
```css
div#container > ul {
  border: 1px solid black;
}
```
Sự khác biệt giữa X Y và X > Y đó là cái sau sẽ chỉ chọn phần tử con trực tiếp. Ví dụ, hãy xem xét mã đánh dấu sau.
```html
<div id="container">
   <ul>
      <li> List Item
        <ul>
           <li> Child </li>
        </ul>
      </li>
      <li> List Item </li>
      <li> List Item </li>
      <li> List Item </li>
   </ul>
</div>
```

Một bộ chọn của #container > ul sẽ chỉ chọn các ul mà là con trực tiếp của div với một id là container. Nó sẽ không chọn ul mà là con của li đầu tiên.

Vì lý do này, có những lợi ích về hiệu năng trong việc sử dụng các con kết hợp. Trong thực tế, nó được khuyến khuyến sử dụng đặc biệt là khi làm việc với các công cụ chọn CSS dựa trên JavaScript.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/childcombinator.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 8. X ~ Y
```css
ul ~ p {
   color: red;
}
```
Sự kết hợp này là tương tự như X + Y, tuy nhiên, nó ít nghiêm ngặt hơn. Trong khi một bộ chọn liền kề (ul + p) sẽ chỉ chọn phần tử đầu tiên ngay sau đó, thì cái này là tổng quát hơn. Nó sẽ chọn, lấy ví dụ trên, bất kỳ phần tử p, miễn là chúng theo sau một ul.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/generalcombinator.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Chrome
* Opera

# 9. X:visited và X:link
```css
a:link {
    color: red;
}

a:visted {
    color: purple;
}
```
Chúng ta sử dụng lớp giả **:link** để nhắm chọn tất cả các thẻ liên kết mà vẫn chưa được nhấp vào.

Ngoài ra, chúng ta cũng có lớp giả **:visited**, cho phép chúng ta áp dụng phong cách cụ thể đến chỉ các thẻ liên kết trên trang đã được nhấp vào, hoặc đã truy cập.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/links.html)

**Tương thích**
* IE7+
* Chrome
* Safari
* Opera


# Tổng hợp 
Mình xin tổng hợp lại thành bảng dưới đây. 

| Bộ chọn | Ví dụ | Mô tả các ví dụ	CSS | Phiên bản CSS |
| -------- | -------- | -------- | -------- |
| .X     | .intro     | Chọn tất cả các phần tử có class=”intro”     | 1     |
|#X     | #firstname     | Chọn tất cả các phần tử có id=”firstname”     | 1     |
| *     | *     | Chọn tất cả các phần tử	     | 2     |
| X     | p    | Chọn tất cả các phần tử  <p>    | 1     |
| X, Y     | div, p     | Chọn tất cả các phần tử <div>và phần tử <p>     | 1     |
| X Y     | div p     | Chọn tất cả các phần tử <p> và bên trong phần tử  <div>     | 1     |
| X > Y     | div > p     | Chọn tất cả các phần tử <p> có phần tử cha là <div>     | 2     |
| X + Y     |div + p     | Chọn tất cả các phần tử <p> được đặt phía sau phần tử  <div>     | 2     |
| X ~ Y      | p ~ ul     | Chọn tất cả các phần tử  <ul> được đặt trước bởi một phần tử  <p>     | 3     |
| X:link     | a:link     | Chọn tất cả các liên kết khi chưa được click     | 1     |
|  X:visited     | a:visited     | Chọn tất cả các liên kết được truy cập     | 1     |
    
Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình học tập cũng như làm việc. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.