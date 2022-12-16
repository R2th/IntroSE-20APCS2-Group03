Bạn có thể xem lại Tổng hợp bộ chọn CSS nên biết (Phần 2) của mình [tại đây](https://viblo.asia/p/tong-hop-bo-chon-css-nen-biet-phan-2-3P0lP0pmlox).
# 21. X::phần tử giả
```css
p::first-line {
   font-weight: bold;
   font-size: 1.2em;
}
```

Chúng ta có thể sử dụng các phần tử giả (được chỉ định bởi ::) để định phong cách cho các mảnh của một phần tử, chẳng hạn như dòng đầu tiên, hoặc chữ cái đầu tiên. Hãy nhớ rằng những cái này phải được áp dụng vào các phần tử cấp độ khối để đạt được hiệu quả.

> Một phần tử giả gồm có hai dấu hai chấm: ::

**Nhắm chọn ký tự đầu tiên của đoạn văn**

```css
p::first-letter {
   float: left;
   font-size: 2em;
   font-weight: bold;
   font-family: cursive;
   padding-right: 2px;
}
```

Đoạn code này là một minh hoạ cho việc tìm tất cả các đoạn văn trên trang, và sau đó chỉ chọn chữ cái đầu tiên của phần tử đó. Điều này thường được sử dụng để tạo ra phong cách giống với báo chí cho chữ cái đầu tiên của một bài báo.

**Chọn dòng đầu tiên của đoạn văn**

```css
p::first-line {
   font-weight: bold;
   font-size: 1.2em;
}
```

Tương tự như vậy, phần tử giả ::first-line sẽ, như kỳ vọng, chỉ định phong cách dòng đầu tiên của phần tử.

> Đối với khả năng tương thích với stylesheet hiện có, user-agent cũng phải chấp nhận ký hiệu một dấu hai chấm cho các phần tử giả được giới thiệu ở CSS cấp độ 1 và 2 (cụ thể là, :first-line, :first-letter, :before và :after). Khả năng tương thích này không được phép cho các phần tử giả mới được giới thiệu trong đặc tả này.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/pseudoElements.html)

**Tương thích**
* IE6+
* Firefox
* Chrome
* Safari
* Opera

# 22. X:nth-child(n)
```css
li:nth-child(3) {
   color: red;
}
```

Còn nhớ những ngày khi chúng ta không có cách nào để chọn các phần tử cụ thể trong một ngăn xếp không? Lớp giả nth-child sẽ giải quyết điều đó!

Tuy nhiên, xin lưu ý rằng nth-child chấp nhận một số nguyên như là một tham số, nó không dựa vào số 0 làm chỉ số đầu tiên. Nếu bạn muốn chọn phần tử danh sách thứ hai, sử dụng li:nth-child(2).

Chúng ta thậm chí có thể sử dụng điều này để chọn một tập hợp các phần tử con. Ví dụ, chúng ta có thể làm cho li:nth-child(4n) chọn tất cả các phần cách sau mỗi bốn phần trong danh sách.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/nth.html)

**Tương thích**
* IE 9+
* Firefox 3.5+
* Chrome
* Safari

# 23. X:nth-last-child(n)
```css
li:nth-last-child(2) {
   color: red;
}
```

Điều gì xảy ra nếu bạn có một danh sách rất lớn các phần tử trong một ul, và chỉ cần truy cập, ví dụ, phần tử thứ ba đến phần tử cuối cùng? Thay vì thực hiện li:nth-child(397), thay vào đó bạn có thể sử dụng lớp giả nth-last-child.

Kỹ thuật này hoạt động gần giống với số 16 ở trên, tuy nhiên, sự khác biệt là nó bắt đầu vào cuối của tập hợp, và quay ngược trở lại.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/nthLast.html)

**Tương thích**
* IE9+
* Firefox 3.5+
* Chrome
* Safari
* Opera

# 24. X:nth-of-type(n)
```css
ul:nth-of-type(3) {
   border: 1px solid black;
}
```

Sẽ có lúc, thay vì chọn một phần tử con, bạn cần phải chọn theo kiểu của phần tử.

Hãy tưởng tượng mã đánh dấu bao gồm năm danh sách không có thứ tự. Nếu bạn muốn chỉ định phong cách cho ul thứ ba, và không có một id để chọn, bạn có thể sử dụng các lớp giả nth-of-type(n). Trong đoạn code ở trên, chỉ ul thứ ba sẽ có một đường viền xung quanh nó.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/nthOfType.html)

**Tương thích**
* IE9+
* Firefox 3.5+
* Chrome
* Safari

# 25. X:nth-last-of-type(n)
```css
ul:nth-last-of-type(3) {
   border: 1px solid black;
}
```

Và vâng, để thống nhất, chúng ta cũng có thể sử dụng nth-last-of-type để bắt đầu vào cuối danh sách bộ chọn, và lần ngược trở lại để chọn phần tử mong muốn.

Demo

**Tương thích**
* IE 9+
* Firefox3.5+
* Chrome
* Safari
* Opera

# 26.  X:first-child
```css
ul li:first-child {
  border-top: none;
}
```

Lớp giả này cho phép chúng ta chỉ chọn phần tử con đầu tiên của phần tử cha. Bạn sẽ thường sử dụng điều này để loại border khỏi phần tử đầu tiên và cuối cùng.

Ví dụ: giả sử bạn có một danh sách các hàng, và mỗi cái đều có border-top và một border-bottom. Vâng, với sự sắp xếp đó, phần tử đầu tiên và cuối cùng trong tập hợp đó sẽ trông hơi khác.

Nhiều nhà thiết kế áp dụng các lớp first và last để bù đắp cho việc này. Thay vào đó, bạn có thể sử dụng các lớp giả này.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/firstChild.html)

**Tương thích**
* IE7+
* Firefox
* Chrome
* Safari
* Opera

# 27. X:last-child
```css
ul > li:last-child {
   color: green;
}
```

Ngược lại của first-child, last-child sẽ chọn phần tử con cuối cùng của phần tử cha.

Ví dụ: Hãy xây dựng một ví dụ đơn giản để minh hoạ một khả năng sử dụng của các lớp này. Chúng ta sẽ tạo ra một danh sách các phần tử.

**HTML**

```html
<ul>
   <li> List Item </li>
   <li> List Item </li>
   <li> List Item </li>
</ul>
```

Không có gì đặc biệt ở đây; chỉ là một danh sách đơn giản.

**CSS**

```css
ul {
 width: 200px;
 background: #292929;
 color: white;
 list-style: none;
 padding-left: 0;
}
 
li {
 padding: 10px;
 border-bottom: 1px solid black;
 border-top: 1px solid #3c3c3c;
}
```

Phong cách này sẽ thiết lập một nền, loại bỏ padding mặc định của trình duyệt trên ul, và áp dụng border vào từng li để thêm một chút chiều sâu.

![](https://images.viblo.asia/192496b6-558b-4afe-8f6f-43c58f394a62.png)

Để thêm chiều sâu cho danh sách của bạn, áp dụng border-bottom vào từng li màu tối hơn màu nền của li. Tiếp theo, áp dụng border-top với một vài sắc thái nhẹ hơn.

Vấn đề duy nhất, như thể hiện trong hình trên, là một border sẽ không được áp dụng cho phần trên và dưới cùng của danh sách không có thứ tự - trông nó hơi khác. Hãy sử dụng các lớp giả :first-child và :last-child để khắc phục điều này.

```css
li:first-child {
    border-top: none;
}
 
li:last-child {
   border-bottom: none;
}
```

![](https://images.viblo.asia/12451488-eec4-445a-bc7b-bd142e7daeb8.png)

Bạn thấy đó; điều này đã khắc phục được nó!

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/firstChild.html)

**Tương thích**
* IE9+
* Firefox
* Chrome
* Safari
* Opera

# 28. X:only-child
```css
div p:only-child {
   color: red;
}
```

Thành thật mà nói, có thể bạn sẽ thấy rằng mình không sử dụng lớp giả only-child thường xuyên. Tuy nhiên, nó có sẵn, bạn sẽ cần nó.

Nó cho phép bạn chọn các phần tử mà là con duy nhất của phần tử cha. Ví dụ, tham khảo đoạn code ở trên, chỉ có đoạn đó là con duy nhất của div sẽ có màu đỏ.

Giả sử HTML sau.

```html
<div><p> My paragraph here. </p></div>
 
<div>
   <p> Two paragraphs total. </p>
   <p> Two paragraphs total. </p>
</div>
```

Trong trường hợp này, đoạn văn của div thứ hai sẽ không được chọn; chỉ div đầu tiên. Ngay sau khi bạn áp dụng nhiều hơn một con vào một phần tử, thì lớp giả only-child không còn có hiệu lực.

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/onlyChild.html)

**Tương thích**
* IE9+
* Firefox
* Chrome
* Safari
* Opera

# 29. X:only-of-type
```css
li:only-of-type {
   font-weight: bold;
}
```

Lớp giả này có thể được sử dụng theo một số cách khéo léo. Nó sẽ chọn các phần tử mà không có anh chị em trong container cha của nó. Ví dụ, chúng ta hãy chọn tất cả ul, mà chỉ có một phần tử duy nhất.

Đầu tiên, hãy tự hỏi làm thế nào bạn thực hiện nhiệm vụ này? Bạn có thể làm ul li, nhưng, điều này sẽ chọn tất cả các phần tử trong list. Giải pháp duy nhất để sử dụng là only-of-type.

```css
ul > li:only-of-type {
   font-weight: bold;
}
```

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/onlyOfType.html) 

**Tương thích**
* IE9+
* Firefox 3.5+
* Chrome
* Safari
* Opera

# 30. X:first-of-type
Lớp giả first-of-type cho phép bạn chọn các anh chị em đầu tiên của cùng kiểu.

Để hiểu rõ hơn về điều này, chúng ta hãy thực hiện một bài kiểm tra. Sao chép HTML sau vào trình soạn thảo code của bạn:

```html
<div>
   <p> My paragraph here. </p>
   <ul>
      <li> List Item 1 </li>
      <li> List Item 2 </li>
   </ul>
 
   <ul>
      <li> List Item 3 </li>
      <li> List Item 4 </li>
   </ul>   
</div>
```

Bây giờ, không đọc thêm nữa, cố gắng tìm cách để chỉ chọn "List Item 2". Khi bạn đã tìm ra cách (hoặc bỏ cuộc), hãy đọc tiếp.

**Giải pháp 1**

Có nhiều cách khác nhau để giải quyết bài kiểm tra này. Chúng ta sẽ xem xét một số ít trong số chúng. Hãy bắt đầu bằng cách sử dụng first-of-type.

```css
ul:first-of-type > li:nth-child(2) {
   font-weight: bold;
}
```

Đoạn này chủ yếu nói, "tìm danh sách không có thứ tự đầu tiên trên trang, sau đó tìm phần tử con ngay sau, mà là danh sách các phần tử. Tiếp theo, lọc nó đến chỉ phần tử danh sách thứ hai trong bộ đó.

**Giải pháp 2**

Một lựa chọn khác là sử dụng bộ chọn liền kề.

```css
p + ul li:last-child {
   font-weight: bold;
}
```

Trong trường hợp này, chúng ta tìm thấy ul đó ngay trước thẻ p, và sau đó tìm con cuối cùng của phần tử.

**Giải pháp 3**

Chúng ta có thể làm cho phức tạp hay đơn giản tuỳ chúng ta muốn với các bộ chọn.

```css
ul:first-of-type li:nth-last-child(1) {
   font-weight: bold;   
}
```

Lần này, chúng ta lấy ul đầu tiên trên trang, và sau đó tìm phần tử danh sách đầu tiên, nhưng bắt đầu từ phía dưới! =))

[Demo](https://cdn.tutsplus.com/net/uploads/legacy/840_cssSelectors/selectors/firstOfType.html) 

**Tương thích**
* IE9+
* Firefox 3.5+
* Chrome
* Safari
* Opera

# Tổng hợp
Mình xin tổng hợp lại thành bảng dưới đây.

| Bộ chọn | Ví dụ | Mô tả các ví dụ CSS | Phiên bản CSS |
| -------- | -------- | -------- | -------- |
| ::after     | p::after     | Chèn thêm nội dung ngay phía sau của các phần tử \<p>     | 2     |
| ::before     | p::before    | Chèn thêm nội dung ngay phía trước của các phần tử \<p>    | 2     |
| :first-child     | p:first-child     | Chọn các phần tử  \<p> có phần tử đầu tiên của phần tử cha chứa nó	     | 2     |
| ::first-letter     | p::first-letter     | Chọn kí tự đầu tiên của phần tử  \<p>     | 1     |
| ::first-line     | p::first-line     | Chọn dòng đầu tiên của các phần tử \<p>     | 1    |
| :first-of-type     | p:first-of-type     | Chọn tất cả các phần tử \<p> có phần tử đầu tiên \<p> là phần tử cha     | 3     |
| :last-child     | p:last-of-type	     | 	Chọn tất cả các phần tử \<p> là thuộc tính cuối cùng của phần tử cha     | 3     |
| :nth-child(n)     | p:nth-child(2)     | Chọn tất cả các phần tử<\p> là phần tử thứ hai của phần tử cha     | 3     |
| :nth-last-child(n)     | p:nth-last-child(2)     | Chọn tất cả các phần tử \<p> là phần tử con thứ hai của phần tử cha, tính từ phần tử con cuối cùng     | 3     |
| :nth-last-of-type(n)     | p:nth-last-of-type(2)     | Chọn tất cả các phần tử \<p>là phần tử thuộc tính thứ hai của phần tử cha, tính từ phần tử thuộc tính con cuối cùng     | 3     |
| :nth-of-type(n)     | p:nth-of-type(2)     | Chọn tất cả các phần tử \<p> là phần tử thuộc tính con thứ hai của phần tử cha     | 3     |
| :only-of-type   | p:only-of-type     | Chọn tất cả các phần tử \<p> là thuộc tính duy nhất của phần tử cha     | 3     |
| :only-child   | p:only-child     | Chọn tất cả các phần tử \<p> là con duy nhất của phần tử cha     | 3     |