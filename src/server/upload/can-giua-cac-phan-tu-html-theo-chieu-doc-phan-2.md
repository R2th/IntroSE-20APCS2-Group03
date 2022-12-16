Bài viết được dịch từ bài [Vertical centering of elements in HTML](http://www.web-plus-plus.com/Articles/vertical-centering-elements-html) xuất bản ngày 18/01/2015 trên trang [Web++](http://www.web-plus-plus.com/).

Phần 1: https://viblo.asia/p/can-giua-cac-phan-tu-html-theo-chieu-doc-phan-1-gGJ59jyJKX2


-----


# Các trường hợp căn giữa thông thường nhất

Dưới đây tôi sẽ trình bày cách sử dụng cả 2 phương pháp sử dụng table và flexible box. Để đơn giản, tôi sẽ bỏ qua các tiếp đầu ngữ (prefix) dành riêng cho các trình duyệt, nhưng bạn nên quan tâm đến chúng khi sử dụng trong code thật của mình.

## Căn giữa textbox chứa ảnh được bao quanh bởi chữ

Trong ví dụ này, chúng ta sẽ căn giữa một ô chứa chứ và ảnh nằm bên trong ô đó. Ô được hiển thị dạng inline-block với độ rộng cố định. Để cho sống động hơn, hãy trang trí nó với màu nền, đường viền và giá trị đổ bóng khác. Để ảnh được bao quanh bởi chữ, chúng ta gán giá trị left cho thuộc tính float và thêm một chút padding vào bên phải:

```css
.wrap-cnt {
  display: inline-block;
  width: 220px;
  font-size: 16px;
  text-align: justify;
  padding: 16px;
  background-color: #d7ffff;
  display: solid 1px gray;
  box-shadow: 2px 2px 8px #c0c0c0;
}
.wrap-cnt img {
  float: left;
  padding-right: 10px;
}
```

Để căn giữa ô này bên trong một phần tử khác, ví dụ như một div, hãy sử dụng cách căn chỉnh bằng table như đã nói từ trước: hiển thị phần tử chứa như table cộng với một thẻ span hiển thị như một table-cell ở bên trong nó:

```html
<div class="wrap-tbl">
  <span>
    <div class="wrap-cnt">
      <img src="dog.png">This content with image and text is an example of perfect centering of content inside its holder, both vertically and horizontally.
    </div>
  </span>
</div>
```

```css
.wrap-tbl {
  display: table;
  width: 400px;
  height: 220px;
  background-color: #ffe6cc;
  border: solid 1px lightgray;
}
.wrap-tbl > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

{@embed: https://jsfiddle.net/hieuns/Lxtsc4kv/embedded/result}

Để căn giữa bằng flexible box model, tất cả những gì chúng ta cần làm là gán giá trị 'flex' cho thuộc tính 'display' của phần tử chứa và giá trị 'center' cho các thuộc tính 'justify-content' và 'align-items' như đã làm ở ví dụ trước:

```html
<div class="wrap-flex">
  <div class="wrap-cnt">
    <img src="dog.png">This content with image and text is an example of perfect centering of content inside its holder, both vertically and horizontally.
  </div>
</div>
```

```css
.wrap-flex {
  display: flex;
  width: 400px;
  height: 220px;
  justify-content: center;
  align-items: center;
  background-color: #f0fff0;
  border: solid 1px lightgray;
}
```

{@embed: https://jsfiddle.net/hieuns/z9yjshpg/embedded/result}

## Nút với ảnh và chữ được căn giữa

Trong ví dụ trước chúng ta đã coi nội dung khối được căn giữa như một đối tượng duy nhất, nhưng để tạo ra một nút với ảnh và chữ đẹp, 2 thành phần này phải được căn chỉnh một cách hợp lý so với nhau. Để đạt được mục tiêu này bằng cách sử dụng căn chỉnh bằng bảng, chúng ta phải tách chúng ra các ô riêng biệt. Do vậy, HTML sẽ  như sau:

```html
<a href="#" class="tbl-btn">
  <span><img src="save.png"/></span>
  <span>Save everything!</span>
</a>
```

Trong CSS, chúng ta sẽ thêm class cho nút và gán giá trị 'table' cho thuộc tính 'display' của nó. Sau đó chúng ta sẽ thêm class cho các ô và ảnh. Chú ý rằng ảnh phải có thuộc tính 'float: left'!

```css
.tbl-btn {
  display: table;
  color: black;
  text-decoration: none;
  padding: 12px 24px 12px 24px;
  background-color: #ffe6cc;
  border: solid 1px lightgray;
  border-radius: 4px;
}
.tbl-btn span {
  display: table-cell;
  vertical-align: middle;
}
.tbl-btn img {
  float: left;
  margin-right: 6px;
}
```

{@embed: https://jsfiddle.net/hieuns/mo804yhw/embedded/result}

Nhắc lại rằng, thực hiện cùng nhiệm vụ bằng cách sử dụng flexible box sẽ đơn giản hơn. Cả ảnh và chữ đều có thể được đặt trực tiếp bên trong nút và không cần float vì cách căn giữa của flexible model đủ thông minh để tạo ra kết quả đẹp. Chú ý rằng do nút không có chiều cao cụ thể, thuộc tính 'display' nên được gán giá trị là 'inline-flex'.

```html
<a href="#" class="flex-btn">
  <img src="save.png">Save everything!
</a>
```

```css
.flex-btn {
  display: inline-flex;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 12px 24px 12px 24px;
  background-color: #f0fff0;
  border: solid 1px lightgray;
  border-radius: 4px;
}
.flex-btn img {
  margin-right: 6px;
}
```

{@embed: https://jsfiddle.net/hieuns/f3xugLms/embedded/result}

## Menu với ảnh và chữ được căn giữa

Một trường hợp thông thường khác là menu, được tạo nên bởi danh sách không sắp xếp thứ tự (unordered list - ul). Trong ví dụ dưới đây, chúng ta sẽ tạo ra một menu hiển thị theo chiều dọc chứa chữ và ảnh. Sử dụng cách căn chỉnh bằng table, chúng ta sẽ căn giữa nội dung của các mục của menu theo cùng một cách mà chúng ta sử dụng để căn giữa nội dung của nút trong ví dụ trước, tức là đặt ảnh và nhãn của các mục vào các ô riêng biệt:

```html
<ul class="vmenu-tbl">
  <li>
    <span><img src="facebook.png"/></span>
    <span>Facebook</span>
  </li>
  <li>
    <span><img src="googleplus.png"/></span>
    <span>Google+</span>
  </li>
  <li>
    <span><img src="twitter.png"/></span>
    <span>Twitter</span>
  </li>
  <li>
    <span><img src="reddit.png"/></span>
    <span>Reddit</span>
  </li>
</ul>
```

```css
.vmenu-tbl {
  display: inline-block;
  list-style: none;
  padding-left: 0;
  font-size: 15px;
}
.vmenu-tbl li {
  display: table;
  width: 100%;
  margin: 0 0 2px 0;
  padding: 5px 0 6px 8px;
  background-color: #ffe6cc;
  border: solid 1px lightgray;
}
.vmenu-tbl span {
  display: table-cell;
  text-align: left;
  vertical-align: middle;
}
.vmenu-tbl span:first-child {
  width: 1px;
}
.vmenu-tbl img {
  float: left;
  margin-right: 6px;
}
```

{@embed: https://jsfiddle.net/hieuns/gfhenuto/embedded/result}

Với flexible box model, như ví dụ trước, chúng ta có thể viết code rõ ràng và ngắn gọn hơn:

```html
<ul class="vmenu-flex">
  <li><img src="facebook.png"/>Facebook</li>
  <li><img src="googleplus.png"/>Google+</li>
  <li><img src="twitter.png"/>Twitter</li>
  <li><img src="reddit.png"/>Reddit</li>
</ul>
```

```css
.vmenu-flex {
  display: inline-block;
  list-style: none;
  padding-left: 0;
  font-size: 15px;
}
.vmenu-flex li {
  display: flex;
  align-items: center;
  padding: 5px 8px 6px 8px;
  margin-bottom: 2px;
  background-color: #f0fff0;
  border: solid 1px lightgray;
}
.vmenu-flex img {
  margin-right: 6px;
}
```

{@embed: https://jsfiddle.net/hieuns/suj7f5p9/embedded/result}

Để tránh việc có quá nhiều code trong bài viết này, tôi sẽ không trình bày ví dụ về menu hiển thị theo chiều ngang, về việc căn giữa nội dung của các mục trong menu thì nó cũng tương tự với menu hiển thị theo chiều dọc.

## Các thẻ input với nhãn được căn giữa

Trường hợp thông thường cuối cùng mà tôi muốn đề cập đến trong bài viết này là trường hợp căn giữa nhãn của các input như checkbox, radio button, text box, v..v.. Nói chung, thứ được căn giữa là gì không quan trọng, vậy nên checkbox hay radio button không khác so với ảnh. Hai ví dụ dưới đây sẽ miêu tả cho việc đó, không cần diễn giải thêm:

Sử dụng cách căn chỉnh bằng table:

```html
<div class="chkbxs-group-tbl">
  <div class="chkbxs-tbl">
    <span><input type="checkbox"/></span>
    <span>Option #1</span>
  </div>
  <div class="chkbxs-tbl">
    <span><input type="checkbox"/></span>
    <span>Option #2</span>
  </div>
  <div class="chkbxs-tbl">
    <span><input type="checkbox"/></span>
    <span>Option #3</span>
  </div>
</div>
```

```css
.chkbxs-group-tbl {
  display: inline-block;
  padding: 16px 32px 16px 24px;
  background-color: #ffe6cc;
  border: solid 1px lightgray;
  border-radius: 3px;
}
.chkbxs-tbl {
  display: table;
  font-size: 16px;
  padding: 0 0 4px 0;
}
.chkbxs-tbl > span {
  display: table-cell;
  vertical-align: middle;
}
.chkbxs-tbl > span:last-child {
  padding-left: 6px;
}
```

{@embed: https://jsfiddle.net/hieuns/ot2uqsd4/embedded/result}

Sử dụng flexible box:

```html
<div class="chkbxs-group-flex">
  <div class="chkbxs-flex">
    <input type="checkbox"/><span>Option #1</span>
  </div>
  <div class="chkbxs-flex">
    <input type="checkbox"/><span>Option #2</span>
  </div>
  <div class="chkbxs-flex">
    <input type="checkbox"/><span>Option #3</span>
  </div>
</div>
```

```css
.chkbxs-group-flex {
  display: inline-block;
  padding: 16px 32px 16px 24px;
  background-color: #f0fff0;
  border: solid 1px lightgray;
  border-radius: 3px;
}
.chkbxs-flex {
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0 0 4px 0;
}
.chkbxs-flex > span {
  padding-left: 6px;
}
```

{@embed: https://jsfiddle.net/hieuns/4gn0ohdr/embedded/result}

# Kết luận
Có 2 phương pháp tốt giúp căn giữa các phần tử HTML là: căn chỉnh bằng table và flexible box model. Phương pháp đầu đáng tin cậy hơn ở khía cạnh tương thích, trong khi phương pháp thứ hai đơn giản hơn, chính xác hơn và cho phép viết code ngắn gọn hơn.

Code của các ví dụ được sử dụng trong bài viết này [có ở trên CodePen](http://codepen.io/rijii49/pen/NPdewx/), bạn có thể chỉnh sửa thử tùy ý.