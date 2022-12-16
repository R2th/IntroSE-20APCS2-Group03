Xin chào các bạn, lại là mình đây :joy:. Tiếp nối chủ để [Từng bước xây dựng Step Progress Bar với CSS](https://viblo.asia/p/tung-buoc-xay-dung-step-progress-bar-voi-css-L4x5x87B5BM) mà mình có hứa hẹn ở cuối bài,  trong bài viết này mình tiếp tục đưa thêm cho các bạn một cách nữa thay thế những nhược điểm của `float` + `width` đã nêu ra đó là **sử dụng table**, vậy cách thực hiện như nào hãy cùng tìm hiểu qua bài viết này nhé.

![](https://images.viblo.asia/5a52139e-e5de-4c14-b965-fbb2162aa602.png)
## Các bước thực hiện
### Bước 1: Tạo cấu trúc HTML
Cấu trúc HTML vẫn không có gì khác
```html
<ul class="progressbar">
  <li class="complete">Step 1</li>
  <li class="complete">Step 2</li>
  <li class="active">Step 3</li>
  <li>Step 4</li>
  <li>Step 5</li>
</ul>
```
### Bước 2: Style cho các thẻ `ul`, `li`
Tại đây mình sẽ biến thẻ `ul` thành "table" bằng cách sử dụng `display: table` + `width: 100%` và 1 thuộc tính cũng khá quan trọng đó là `table-layout: fixed`
```css
.progressbar {
  counter-reset: step;
  padding: 0;
  
  /* New */
  display: table;
  table-layout: fixed;
  width: 100%;
}
```

Và để các `li` có **width bằng nhau trong bảng** thì ta cần thêm `display: table-cell`

```css
.progressbar li {
  list-style: none;
  position: relative;
  text-align: center;
  
  /* New */
  display: table-cell; 
}
```
### Bước 3: Style cho `li:before`
Style không có gì thay đổi so với phiên bản trước
```css
.progressbar li:before {
  background: #fff;
  border: 2px solid #bebebe;
  border-radius: 50%;
  color: #bebebe;
  content: counter(step);
  counter-increment: step;
  display: block;
  font-weight: 700;
  height: 30px;
  line-height: 27px;
  margin: 0 auto 10px;
  text-align: center;
  width: 30px;
}
```
### Bước 4: Style cho `li:after`
Ở phiên bản này mình sẽ không dùng `left` âm nữa mà sử dụng giá trị **dương**, đồng nghĩa đó là sẽ clear đường kẻ ngang của item cuối cùng
```css
.progressbar li:after {
  background: #979797;
  content: '';
  height: 3px;
  left: 50%;
  position: absolute;
  top: 15px;
  width: 100%;
  z-index: -1;
}

.progressbar li:last-child:after {
  content: none;
}
```
### Bước 5: Thêm style riêng cho các trạng thái `active`, `complete`
```css
.progressbar li.complete:after {
  background: #3aac5d;
}

.progressbar li.active:before,
.progressbar li.complete:before {
  background: #3aac5d;
  border-color: #3aac5d;
  color: #fff;
}

.progressbar li.active {
  color: #3aac5d;
  font-weight: 700;
}

.progressbar li.complete {
  color: #333;
  font-weight: 700;
}
```

Thành quả chúng ta thu được
{@embed: https://jsfiddle.net/hunghv1001/0xL5gr8b/10/}
## Kết luận
Việc sử dụng `table` trong trường hợp này khá hay, nó giúp chúng ta chia width các item bằng nhau sẽ giúp tăng độ linh động khi **có sự thay đổi về số lượng step**

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công và hẹn gặp lại ở các bài viết sau !