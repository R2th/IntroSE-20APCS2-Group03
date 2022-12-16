## 1. Những thành phần trong Switch được tạo bằng HTML và CSS:
![](https://images.viblo.asia/1ab04b5a-37ee-4d3a-a8ab-3da1ca446ec9.png)
Ngoài 3 thành phần đã  được chỉ ra trong ảnh thì còn một thành phần cực kỳ quan trọng nữa đó là một checkbox (đã được ẩn đi), checkbox có tác dụng xác định trạng thái của cái Switch kia.

Các thẻ trong HTML mà chúng ta cần:

* label : Thẻ lable sẽ tương ứng với thành phần container như trên hình, được sửu dụng để: Tạo một cái khung để bao bọc các thẻ thẻ còn lại, giúp cho các thẻ xác định vị trí cũng như kích thước và cuối cùng là tạo truy cập tới checkbox.
* input: Thẻ input có kiểu là checkbox sử dụng để xác định trạng thái của switch.
* span: Thẻ span sẽ dùng để tạo background và mask như trong hình.

## 2. Tiến hành code:

**- Cấu trúc HTML:**

```html
<html>

  <label class="container">

    <input type="checkbox">

    <span class="background"></span>

    <span class="mask"></span>

  </label>

</html>
```

**- Code CSS cho thành phần "Container":**

```css 
.container {

     display: block; /* Xác định kiểu hiển thị có dạng là block */

     position: relative; /* Xác định vị trí của phần tử là tuyệt đối */

     width: 55px;

     height: 30px;

     margin: 50px auto; /* Phần tử cách lề trên 50px và căn giữa 2 bên */

}
```

**Giải thích code:** *display: block; * vì thẻ label là một thẻ có kiểu hiển thị là inline nên không thể sử dụng width, height để xét kích thước cho phần tử vì thế chúng ta cần chuyển kiểu hiển thị của nó sang block để có thể xét kích thước cho nó.

- Code CSS cho thẻ <input>:

```css 
.container > input[type = checkbox] {

     display: none;

}
```

**Giải thích code:** *container > input[type = checkbox]* truy cập tới thẻ input nằm trong container có type là checkbox sau đó tắt hiển thị của cái input này (display: none;).

**- Code CSS cho thành phần "Background":**

```css 
.background {

     display: block; 

     position: absolute; /* Xác định vị trí của phần tử là tuyệt đối so với phần tử bao ngoài */

     width: 100%;

     height: 100%;

     background-color: white;

     border-radius: 30px; /* Xác định độ bo cong góc của phần tử */

     transition: 0.25s; /* Xác khoảng thời gian để phần tử biến đổi trạng thái */

     border: 2px solid #eeeeee; /* Xác định đồ dầy viền là 2px, có kiểu nét liền và có màu #eeeeee*/

}
```

**Giải thích code:**

* position: absolute; xác định vị trí của phần tử là tuyệt đối so với phần tử bao ngoài, nhờ đó chúng ta có thể sử dụng các thuộc tính như top, left, right, bottom để xác định vị trí của phẩn tử so với phần tử bao ngoài có position là relative (ở đây chính là phần tử container).
* transition: 0.25s; xác định khoảng thời gian để phần tử biến đổi từ trạng thái hiện tại sang trạng thái mới là 0.25 giây.

**- Code CSS cho thành phần "Mask":**

```css 
.mask {

     display: block;

     position: absolute;

     width: 30px;

     height: 30px;

     background-color: white;

     box-shadow: 1px 1px 3px silver;

     border-radius: 50%; /* Bo cong các góc để phần từ chuyển từ hình vuông sang hình tròn */

     left: 2px; /* Cách lề trái của phần tử container 2px */

     top: 2px; /* Cách lề trên của phần tử container 2px */

     transition: 0.25s;

     cursor: pointer; /* Xác định kiểu hiển thị của con trỏ chuột khi rê con trỏ chuột vào phần tử là pointer */

}
```

**Giải thích code:** *cursor: pointer;* khi chúng ta rê chuột vào phần từ thì kiểu hiển thị của con trỏ chuột sẽ chuyển sang dạng bàn tay giống như khi chúng ta rê chuột vào một đường link vậy.

**- Code CSS cho phần sự kiện On và Off switch:**

```css 
.container > input[ type = checkbox ]:checked + .background {

     background-color: #4cd964;

     border-color: #4cd964;

}
```

**Giải thích code:** Nếu như checkbox được chọn (checked) thì phần tử nằm ngay sau nó có tên class là "background" (ở đây là phần tử background) sẽ được cập nhật các thuộc tính trong ngoặc nhọn vậy nên phần tử background sẽ được cập nhật lại background-color và border-color và khi checkbox không được chọn nữa thì các giá trị của các thuộc tính của background sẽ quay lại giá trị ban đầu.

```css 
.container > input[ type = checkbox ]:checked ~ .mask {

     left: 27px;

}
```

Giải thích code: Tương tự câu trên chỉ khác là câu lệnh selector sẽ thay dấu + thành dấu ~, dấu + để chọn phần tử ngay sau còn dấu ~ sẽ chọn tất cả các phần tử nằm sau checkbox có tên class là "mask".
Trên đây là phần code, để có thể xem được kết quả các bạn có thể vào [đây](https://codepen.io/batran2599/pen/XWXyWNG) để xem nhé.

{@embed: https://codepen.io/batran2599/pen/XWXyWNG}

Xem các bài viết thú vị khác tại [Lập trình Basic](https://laptrinhbasic.info/)