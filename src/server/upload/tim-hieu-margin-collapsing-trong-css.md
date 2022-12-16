## Giới thiệu.
Margin các bạn có thể hiểu là lề bao xung quanh của phần tử, nó là thuộc tính được sử dụng để tạo ra khoảng trống  từ viền của phần từ ra phía bên ngoài. Trong qua trình bạn sử dụng margin chắc hẳn các bạn đã gặp 1 số trường hợp margin của phần từ này đè lấn lên giá trị margin của phần tử kia. Đó chính là hiện tượng margin collapsing, và bây giờ chúng ta sẽ đi tìm hiểu kĩ về trường hợp đó.
## Margin collapsing là gì ?
Để gỉả thich câu hỏi này chúng ta có 1 ví dụ sau:
**HTML:**
```
<div class="container">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```
**CSS:**
```
.container {
    background: #ccc;
    width: 200px;
    margin-top: 30px;
}
.square {
    margin: 10px;
    height: 50px;
    background: #f0f;
}
```
*Demo:*
{@embed: https://codepen.io/TrinhThang/pen/bGbeyPR}

Như ở ví dụ trên nhiều bạn sẽ nghĩ rằng khoảng cách giữa các phần tử `.square` sẽ là 20px do ta có `margin: 10px` . Nhưng không phải vậy khoảng cách giữa 2 phần từ đó chỉ là 10px. Đó chính là margin collapsing, khi 2 phần từ gần nhau cùng có margin nó sẽ lấy giá trị margin lơn nhất của 1 trong hai phẩn từ, chứ không phải là tổng margin của 2 phẩn tử. Margin collapsing chỉ xảy ra với  margin-top và margin bottom

## Margin collapsing xảy ra khi nào ?
**1. Xảy ra với phần tử cha và con**

Như ở ví dụ trên chúng ta thấy thẻ cha `.container` có `margin-top: 30px ` và  `.square` có  `margin: 10px;`. Giá trị mong muốn là bằng tổng margin của thẻ cha và con là 40px, nhưng trên thự tế đã xảy ra margin collapsing nên chỉ nhận margin có giá trị lớn đó là 30px ở `.container`

**Cách xử lý:**
Để xử lý margin collapsing ở phần tử cha và con ta chỉ cần thêm vào phần từ cha một trong những thuộc tính sau:

* float: left / right
* position: absolute
* display: inline-block

```
.container {
      background: #ccc;
      width: 200px;
      margin-top: 30px;
      /* có thể sử dụng 1 trong 3 thuộc tính bên dưới*/
      position: absolute;
      /* float: left; */
      /*   display: inline-block; */
}
```
{@embed: https://codepen.io/TrinhThang/pen/zYOBQge}

Hoặc sử dụng thẻ giả thêm :before và after vào thẻ cha:
```
.container:before, 
.container:after{
   content: ' ';
   display: table;
}
```
{@embed: https://codepen.io/TrinhThang/pen/OJLXeLp}

Với 1 số cách trên các bạn có thể loại bỏ hoàn toàn margin collapsing xảy ra giữa phần tử cha và con, khoảng cách của phần tử đầu tiên với lề trên đã là 40px.

**2. Xảy ra với các thẻ cùng cấp (anh em) trong cùng 1 thẻ cha**

Như ví dụ ban đầu ta thấy các phần tử `.square` sẽ có khoảng cách là 10px, vậy khoảng cách giữa các phần tử `.square` mong muốn sẽ là 20px nhưng ở đây lại xảy ra margin collapsing nên các phẩn từ chỉ cách nhau 10px.

**Cách xử lý:**
Để xử lý ở tình huống này ta sử dụng một số thuộc tính quen thuộc `display: block;` `float: left;` như bên dưới
```
.square {
  margin: 10px;
  height: 50px;
  background: #f0f;
  display: block;
  float: left;
  width: calc(100% - 20px);
}
```
{@embed: https://codepen.io/TrinhThang/pen/NWKrZqw}

Hoặc bạn có thể xử lý với cách thứ 2 đơn giản hơn  đó là  sử dụng  `display:flex`  và `flex-direction: column` thêm vào phần tử cha thì các phần tử con sẽ không bị margin collapsing nữa.
{@embed: https://codepen.io/TrinhThang/pen/MWgeMaq}

**Note:**
Cách cuối cùng và cũng là kinh nghiệm của mình trong quá trình dựng layout thay vì các bạn sử dụng cùng 1 lúc cả `margin-top` và `maring-bottom` thì các bạn nên sử dụng margin 1 chiều đó là dùng `margin-top` hoặc `margin-bottom` thì sẽ hạn chế đươc margin collapsing xảy ra, và xử lý pixel perfect dễ hơn khi xảy ra bug khoảng cách trên giao diện.

## Kết luận
Sau bài viết trên mong rằng sẽ giúp các bạn hiểu rõ hơn về rargin collapsing, các trường hợp xảy ra và cách xử lý đối với từng trường hợp. Cảm ơn các bạn đã đọc bài viết của mình.