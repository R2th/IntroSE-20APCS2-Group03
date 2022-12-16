Xin chào các bạn, chắc hẳn khi làm Front-end không ít lần bạn sẽ gặp phải từ khóa 'Step Progress Bar' (từ đây mình sẽ gọi tắt là SPB). Nó là gì ý nhỉ ? SPB hiểu nôm na là một mô phỏng các bước tiến trình trong một luồng sự kiện nào đó. Ví dụ như chức năng thanh toán giỏ hàng bao gồm: Thêm sản phẩm vào giỏ hàng > Xác nhận giỏ hàng > Thanh toán, hoặc chức năng đăng kí tài khoản gồm: Điền thông tin > Xác nhận > Đăng ký, blabla... Như vậy nhờ có SPB người dùng có thể dễ dàng biết họ đang ở bước nào để dễ dàng tương tác với hệ thống hơn, và ở bài viết này mình sẽ cùng các bạn xây dựng SPB hoàn toàn bằng CSS

Trong bài viết này mình sẽ demo luồng gồm **5 step** và chúng ta đang ở **step 3**, tức là **step 1 và 2 đã hoàn thành**. Các trường hợp khác tương tự. Sản phẩm cuối cùng sẽ có dạng như sau

![](https://images.viblo.asia/5a52139e-e5de-4c14-b965-fbb2162aa602.png)

## Các bước thực hiện
### Bước 1: Tạo cấu trúc HTML
Cấu trúc HTML theo mô tả trên sẽ như sau
```html
<ul class="progressbar">
  <li class="complete">Step 1</li>
  <li class="complete">Step 2</li>
  <li class="active">Step 3</li>
  <li>Step 4</li>
  <li>Step 5</li>
</ul>
```
### Bước 2: Style cơ bản cho các thẻ `ul`, `li`
Tiếp theo ta sẽ cần CSS cho các thẻ `ul`, `li`. Có 1 số điểm cần lưu ý là thẻ `ul` cha sẽ cần có thuộc tính `counter-reset` dùng để khởi tạo bộ đếm CSS, và các thẻ li sẽ `float: left` để cùng nằm trên một dòng và có chiều rộng bằng nhau tức `width: calc(100% / 5)` (vì mình đang có **5 step**)
```css
.progressbar {
  counter-reset: step;
  padding: 0;
}

.progressbar li {
  float: left;
  list-style: none;
  position: relative;
  text-align: center;
  width: calc(100% / 5);
}
```
### Bước 3: Style cho `li:before`
Các chấm tròn ta sẽ sử dụng `:before` để tạo, ngoài các style cơ bản ra bạn cần lưu ý `content: counter(step)` và `counter-increment: step`, sẽ giúp ta fill bộ đếm đã khởi tạo ở trên vào từng step điều này sẽ giúp bạn không phải điền thủ công số đếm vào từng step
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
Tiếp theo ta sẽ tạo ra đường kẻ ngang nối các chấm tròn với nhau bằng việc dùng `:after`
```css
.progressbar li:after {
  background: #979797;
  content: '';
  height: 3px;
  left: -50%;
  position: absolute;
  top: 15px;
  width: 100%;
  z-index: -1;
}
```
Tuy nhiên sau khi thêm xong bạn sẽ thấy **5 chấm tròn nhưng sẽ chỉ có 4 đường kẻ** vì vậy ta phải xóa đi một đường kẻ của item con đầu tiên đi bằng việc thêm vào dòng CSS sau
```css
.progressbar li:first-child:after {
  content: none;
}
```
### Bước 5: Thêm style riêng cho các trạng thái `active`, `complete`
Và cuối cùng để phân biệt các trạng thái `active`, `complete` ta sẽ thêm một chút CSS cho `:before` `:after` như sau
```css
.progressbar li.active:after,
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

Bạn có thể xem nhanh kết quả tại đây
{@embed: https://jsfiddle.net/hunghv1001/43zojshy/}
## Ưu Nhược Điểm
**Ưu điểm**
- Responsive tốt do không fix cứng width cho từng step
- Hoạt động tốt trên nhiều trình duyệt
- Tự động fill bộ đếm CSS cho từng step mà không cần nhập thủ công

**Nhược điểm**
- Do dùng `float` và chia `width` nên ta luôn phải thay đổi giá trị `width` nếu số lượng step thay đổi, điều này khiến ta cân nhắc nghĩ đến 1 cách chia width 'mềm dẻo' hơn bằng việc sử dụng `flex: 1` có thể sẽ đến ở các bài viết sau, hãy cùng chờ xem =))
## Kết luận
Trên đây mình đã giới thiệu tới các bạn 'Từng bước xây dựng Step Progress Bar với CSS', hi vọng sẽ giúp ích cho các bạn khi làm việc

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !