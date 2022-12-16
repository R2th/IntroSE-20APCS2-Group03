![](https://images.viblo.asia/6f3a1d29-fdd3-4267-857b-0816a3d4096f.jpg)

Sau một thời gian, mình đã vô tình tìm hiểu được vài tag HTML thú vị nên muốn chia sẻ với mọi người, nếu bạn biết rồi thì cho qua nhé!

### 22. `<dfn>`
Đầu tiên sẽ là tag `<dfn>`, tag này dùng để định nghĩa một thuật ngữ (xuất hiện lần đầu trong tài liệu) trong HTML. Cách sử dụng của nót tương tự như các từ in nghiêng ở giữa đoạn văn bản.

Tag cha gần nhất của tag `<dfn>` phải chứa định nghĩa/giải thích về thuật ngữ bên trong tag `<dfn>`. 
```html
  <p><dfn>HTML</dfn> is the hypertext markup language</p>
```
    
Hầu hết các trình duyệt sẽ hiển thị phần tử `<dfn>` với định dạng CSS như sau:
```css
dfn {
    font-style: italic;
}
```
Tag `<dfn>` được hấu hết các trình duyệt hỗ trợ nên bạn cứ yên tâm dùng nhé!

### 23. `<s>`
Tiếp theo là tag `<s>`, tag này dùng để chỉ định một văn bản không còn đúng, chính xác hoặc phù hợp nữa. Văn bản sẽ được hiển thị với một dòng gạch ngang (gạch bỏ) đi.
    
```html
<p><s>Java</s> <ins>HTML</ins> is the hypertext markup language.</p>
```
Vì có là dòng gạch ngang nên định dạng CSS của tag sẽ như này:
```css
 s {
    text-decoration: line-through;
}
```
Tag `<s>` sẽ không dùng để định nghĩa văn bản thay thế hoặc muốn xoá, nếu muốn xử lý các trường hợp ấy nên sử dụng tag `<del>` nha.
### 24. <legend>
Tag `<legend>` định nghĩa một chú thích cho các phần tử `<fieldset>`. 
    
```css
<fieldset>
<legend>Chú thích<legend>
<fieldset>
```
Cú pháp sử dụng:
```css
<legend thuoctinh="giatri"></legend>
```
 Thuộc tính của <legend> là align: top/bottom/left/right và các thuộc tính của tag này không hỗ trợ trong HTML5.
    
Ví dụ sử dụng:
    
```html
<form>
  <fieldset>
    <legend>Personalia:</legend>
    <label for="fname">First name:</label>
    <input type="text" name="fname">

    <label for="lname">Last name:</label>
    <input type="text" name="lname">

    <label for="email">Age:</label>
    <input type="number" name="age">

    <input type="submit" value="Submit">
  </fieldset>
</form>
```
Tag này cũng  được hỗ trợ trong đa số các trình duyệt.
### 25. <xmp>
Tag `<xmp>` xác định phần văn bản định dạng trước. Tag này là tag cũ (Deprecated Tag).
Ví dụ:
 ```html
 <body>
Trong HTML, co <xmp> <b> de in dam van ban, <i> de in nghieng van ban </xmp>.
</body>
 ```
     
 Kết quả của đoạn code trên sẽ là :
 ```html
 Trong HTML, co
<b> de in dam van ban, <i> de in nghieng van ban.
 ```
###  26. `<kbd>`
Tag `<kbd`> là thẻ cụm từ. Nó định nghĩa thông tin nhập từ bàn phím. Nó là một thẻ phrase.
```html
<body>
<p>Ban hay su dung <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd>
</body>
```
 Tag này được dùng khi một tài liệu đơn giản chỉ cần hiển thị văn bản người dùng nhập từ bàn phím, không nên nhầm lẫn với tag `<input>` nha.
    
Định dạng mặt định CSS của tag này là:
```css
kbd {
font-family: monospace;
}
```    
#### Tổng kết
Trên là một số trong các tag ít khi được sử dụng và thú vị mà mình biết. Qua bài chia sẻ, mình hi vọng sẽ truyền cảm hứng cho bạn để có những ý tưởng mới và tìm thấy một số trường hợp sử dụng cho các tag này. Đây chắc sẽ là phần cuối cùng của seri "Những đứa con rơi của HTML", vì ở đâu ra mà nhiều con rơi thế đúng không :v Cảm ơn bạn đã dành thời gian đọc bài viết! Các bạn có thể tham khảo các tài liệu sau:

* https://www.w3schools.com/tags/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element