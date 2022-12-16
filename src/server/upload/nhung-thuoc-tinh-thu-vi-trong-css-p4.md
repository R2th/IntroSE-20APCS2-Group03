Sau [phần ba](https://viblo.asia/p/nhung-thuoc-tinh-thu-vi-trong-css-p3-Az45bDXLZxY) về các thuộc tính thụ vị trong CSS, hôm nay mình sẽ lại tiếp tục với 10 thuộc tính tiếp theo nữa, và series này cũng sẽ sắp kết thúc rồi. Không chờ lâu, bắt đầu nào !!!
## 1. overflow-wrap
Thuộc tính này chỉ định ngắt dòng sẽ xảy ra trong các từ dài nếu chúng không vừa trong `container` dưới dạng một từ.

- `normal`: Từ quá dài sẽ tràn ra khỏi layout.
- `break-word`: Những từ quá dài sẽ xuống hàng.

Nó cũng nhận các giá trị global như `inherit`, `initial`, `unset`
    {@embed: https://codepen.io/impressivewebs/pen/ZLBvav}
## 2. page-break-*
Có ba thuộc tính CSS cho phép bạn điều chỉnh ngắt trang:
- `page-break-before`: Xác định các phân chia văn bản ngay trước phần tử
- `page-break-after`: Ngắt trang nếu không có không gian.
- `page-break-inside`:  Xác định các phân chia văn bản ngay bên trong phần tử,  thường sử dụng cho văn bản print.

Nó chấp nhận các giá trị sau: `auto`, `always`, `avoid`, `left`, `right`, `recto`, `verso`. Trong đó recto và verso  là 2 giá trị đang trong quá trình thử nghiệm.
{@embed: https://codepen.io/katydecorah/pen/40cb167e16dc53bc78f1ddad8db6c82f}
 ## 3. percentage
 `%` (percentage) là đơn vị tham chiếu tỷ lệ so với một phần tử mẹ của nó dựa vào kích thước. 

Ví dụ bạn có một cái khung với kích thước là `500px` và khung bên trong có kích thước là `50%` thì nó sẽ là `250px`. Nếu bạn sử dụng đơn vị phần trăm này để gán kích thước cho thẻ `<html>` trên website thì nó sẽ thay đổi theo kích thước màn hình hoặc/cửa sổ website.
 
 ## 4. perspective 
 Thông thường khi nhìn một element ta sẽ thấy element có dạng 2D (chiều rộng và chiều cao), để nhìn vật thể 3D ta cần có thêm chiều sâu, thuộc tính `perspective` sẽ cho ta thấy được chiều sâu của element, khoảng chiều sâu được tính từ điểm đặt ban đầu tới giá trị của `perspective` (theo đơn vị pixel)
 
 Giá trị của nó là khoảng cách từ khung nhìn đến mặt phẳng z. Giá trị là độ dài, có thể được biểu thị bằng `px` hoặc `em` hoặc từ khóa `none`.

Thuộc tính phải được áp dụng cho phần tử cha (vùng chứa) hoặc phần tử mà bạn muốn phối cảnh được áp dụng.
{@embed: https://codepen.io/gregh/pen/wgBKJX}
## 5. pointer-events
Thuộc tính này chỉ định cách các phần tử phản ứng với các sự kiện chuột. 

- `auto`: element hoạt động bình thường
- `none`: bỏ qua tất cả các sự kiện `clicks`, `selects`, `dragging`,…

{@embed: https://codepen.io/zakkain/pen/dseHt}

Nó cũng có các giá trị đặc biệt và là duy nhất cho thẻ `SVG`:
- `visiblePainted`
- `visibleFill`
- `visibleStroke`
- `visible`
- `painted`
- `fill`
-  `stroke`
-   `all`
## 6. var()
Những website lớn thường sẽ sử dụng rất nhiều CSS với lượng lớn giá trị bị lặp lại. Giả sử khi bạn muốn sửa màu chủ đạo của website thì rất có khả năng bạn sẽ phải sửa ở rất nhiều vị trí ví dụ như button, navbar, title,... Điều này gây ra rất nhiều khó khăn khi code cũng như khi bảo dưởng và duy trì website.

Để giải quyết vấn đề này chúng ta có thể sử dụng `var()`
```css
/* Khai báo biến */
element {
  --spacing:10px;
}

/* Sử dụng biến */
element {
  padding: var(--spacing);
}
```
Lưu ý, tất cả biến trong css khi khai báo đều cần có hai dấu gạch ngang `--` ở phía trước
## 7. position
Bạn có thể quen thuộc với các giá trị position như `static`, `relative`, `absolute`, và `fixed`. Có một giá trị thú vị khác: `sticky`

Các yếu tố có vị trí: `sticky` được coi là tương đối, cho đến khi chúng đạt đến điểm nhất định, sau đó chúng trở nên cố định. Đây thường là thứ chúng ta phải sử dụng `JavaScript`, nhưng bây giờ có thể thực hiện được bằng `CSS` thuần túy.
{@embed: https://codepen.io/gregh/pen/BpydOB}

## 8. resize
Thuộc tính `resize` xác định liệu phần tử có thể được thay đổi kích thước bởi người dùng. Bạn có thể làm cho một phần tử có thể thay đổi kích thước theo chiều dọc, chiều ngang hoặc cả hai.

- `none`:  Element không thể thay đổi kích thước. Đây là giá trị mặc định cho hầu hết các thành phần, ngoại trừ `textarea` là `“both”` theo mặc định
- `both`: Có thể thay đổi cả hai hướng
- `horizontal`: có thể thay đổi theo chiều ngang
- `vertical`:  có thể thay đổi theo chiều dọc
Quan trọng: để làm cho một phần tử có thể thay đổi kích thước, `overflow` của nó phải được đặt thành `visible`.
{@embed: https://codepen.io/team/css-tricks/pen/QbJqMG}
## 9. shape-outside
Thuộc tính shape-outside cho phép chúng ta bọc văn bản trong một hình dạng xung quanh một phần tử nổi. Có thể đó là một hình ảnh tròn và bạn muốn văn bản bao quanh vòng tròn đó. Thuộc tính sẽ được áp dụng cho phần tử mà bạn muốn bọc nội dung xung quanh. Nó chấp nhận các giá trị sau:

- `Giá trị từ khóa`: **none**, **margin-box**, **padding-box**, **border-box**, **padding-box**
- `Các giá trị hàm`: **circle()**, **ellipse()**, **inset()**, **polygon()**
Bạn cũng có thể chuyển URL tới một hình ảnh xung quanh nội dung sẽ bao bọc, và nó chấp nhận các giá trị toàn cầu initial, inherit, và unset.

Nếu bạn chọn sử dụng một hình ảnh, thuộc tính `shape-image-threshold` sẽ xác định ngưỡng kênh `alpha` để tách hình dạng khỏi hình ảnh. `Firefox` và `IE` vẫn chưa hỗ trợ cho thuộc tính này và `Safari` hỗ trợ nó với tiền tố `-webkit-`.
{@embed: https://codepen.io/team/css-tricks/pen/7fa99015d63597648d5e312c5b73ac25}

## 10. @supports
Quy tắc CSS này cung cấp cho bạn khả năng kiểm tra xem trình duyệt có hỗ trợ các thuộc tính nhất định (hoặc kết hợp thuộc tính / giá trị) trước khi sử dụng chúng không.

```css
@supports (display: grid) {
  .container {
    display: grid;
  }
}            
 
@supports (image-rendering) {
  img {
    image-rendering: pixelated;
  }
}
```

Hoặc có thể như thế này.
```css
@supports (display: grid) and ((image-rendering: crisp-edges) or (image-rendering: pixelated)) {
}
```
### Tham khảo 
* [CSS-Tricks](https://css-tricks.com/lets-look-50-interesting-css-properties-values/)