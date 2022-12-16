Sau [phần năm](https://viblo.asia/p/nhung-thuoc-tinh-thu-vi-trong-css-p4-gDVK2nzXKLj#_10-supports-9) về các thuộc tính thụ vị trong CSS, hôm nay mình sẽ lại tiếp tục với 10 thuộc tính tiếp theo nữa, và series này cũng sẽ sắp kết thúc rồi. Không chờ lâu, bắt đầu nào !!!
## 1. table-layout
Có khi nào bạn cần phải làm cho tất cả các ô trong một bảng bị buộc phải có cùng chiều rộng? Nếu có thì hãy thử thuộc tính này, nó sẽ rất có ích cho bạn đấy.
```css
table {
  table-layout: fixed;
}
```
   {@embed: https://codepen.io/gregh/pen/qREPYz}
## 2. text-transform
Thuộc tính `text-transform` có thể thay đổi trường hợp văn bản thành chữ thường – `lowercase` hoặc chữ hoa – `uppercase`. Bạn cũng có thể viết hoa chữ cái đầu tiên của mỗi từ với `capitalize`. Xem thêm chi tiết tại [đây](https://css-tricks.com/almanac/properties/t/text-transform/).
{@embed: https://codepen.io/TypographyCSS/pen/MmRgEo}

 ## 3. transition-timing-function
 Thuộc tính `transition-timing-function` xác định đường cong tốc độ của hiệu ứng `transition`, như `ease-in` hoặc `ease-out`. Đây là hai giá trị ít được biết đến:

- `steps(n, start|end)`: thay vì chỉ định chuyển tiếp trơn tru với các chức năng thời gian như vậy là `ease`, điều này hoàn thành hoạt hình theo số bước bạn xác định. Tham số thứ hai là tùy chọn và chỉ định tại điểm nào trong khoảng sẽ xảy ra thay đổi. Các giá trị mặc định cho tham số thứ hai là kết thúc. Bạn cũng có thể sử dụng các chức năng tốc ký `step-start(n)` và `step-end(n)`.
- `cubic-bezier(n, n, n, n)`: Bạn có thể tự định nghĩa cách mà transition hoạt động, ví dụ như độ nhanh chậm lúc bắt đầu, thời gian,...Chi tiết có tại [đây](https://cubic-bezier.com/#.23,.77,.78,.24) nhé.
{@embed: https://codepen.io/gregh/pen/mRypgY}
 ## 4. vh, vw, vmin, vmax 
Các giá trị này được sử dụng để định kích thước các thứ liên quan đến kích thước hiển thị của trình duyệt trên màn hình. Mặc dù chiều rộng là luôn luôn tương đối so với `parent container`, `vh` hoặc `vw` luôn sử dụng kích thước  hiển thị làm cơ sở.
 - `vh`: 1 vh bằng 1/100 chiều cao khung nhìn
- `vw`: 1 vw bằng 1/100 chiều rộng khung nhìn
- `vmin`: nó là giá trị nhỏ nhất của `vh` và `vw`
- `vmax`: là giá trị lớn nhất của  `vh` và `vw`
Đối với cửa sổ trình duyệt có chế độ xem `1280x655px`, `1vh` bằng `6,55 pixel`, `1vw` bằng `12,8 pixel`, `vmin` là `6,55 pixel` (nhỏ nhất trong hai giá trị) và `vmax` là `12,8 pixel` (lớn nhất trong hai giá trị).
## 5. white-space
Thuộc tính này xác định cách xử lý khoảng trắng bên trong phần tử.

- `normal`: thu gọn các dòng mới, thu hẹp không gian và các `tab`, `text wrap`
- `nowrap`: thu gọn dòng mới, thu gọn không gian và `tab`, `text wrap`
- `pre`: giữ các dòng mới, giữ các khoảng trắng và các `tab`, `text wrap`
- `pre-wrap`: giữ dòng mới, giữ khoảng trắng và `tab`, `text wrap`
- `pre-line`: giữ các dòng mới, thu hẹp không gian và các `tab`, `text wrap`
 {@embed: https://codepen.io/gregh/pen/dNPZpX}
## 6. word-break
Thuộc tính này chỉ định các quy tắc ngắt dòng.
- `normal`: sử dụng các quy tắc tiêu chuẩn để ngắt các từ
- `break-all`: dòng có thể bị ngắt giữa hai chữ cái bất kỳ
- `keep-all`: khi hết đoạn thì một từ sẽ tự động ngắt ở bất kỳ chữ nào để xuống hàng.
{@embed: https://codepen.io/gregh/pen/RKNxPJ}
## 7. word-spacing
Tương đương với `letter-spacing` nhưng chỉ đối với các `từ` trong `element`! Bạn có thể tăng (hoặc giảm) khoảng trống giữa các từ.  Giá trị tiêu chuẩn cho tài sản này là `normal` trong đó sử dụng khoảng trắng mặc định: `0,25em`. Hoặc bạn có thể cài đặt một kích thước mong muốn.
```css
p {
    width: 300px;
    padding: 10px;
    background-color: orange;
    word-spacing: normal;
}
```

## 8. will-change
Bạn có thể dùng will-change để thông báo cho trình duyệt biết bạn có ý định thay đổi thuộc tính của 1 phần tử. Nó cho phép trình duyệt cài đặt sẵn sàng trước những tối hưu hóa thích hợp nhất khi bạn cần thay đổi. Tuy nhiên cũng đừng lạm dụng will-change, bởi vì làm như thế có thể làm cho trình duyệt hao tốn tài nguyên và quay ngược lại gây ra nhiều vấn đề hơn về hiệu năng.
- `normal`:  thực hiện tối ưu hóa tiêu chuẩn
- `scroll-position`: chuẩn bị trình duyệt để thay đổi vị trí cuộn
- `content`: nội dung của phần tử sẽ thay đổi
Bạn cũng có thể đặt các thuộc tính cụ thể mà bạn sẽ thay đổi, như thế này:
```css
.will-be-animated {
    will-change: top, left;
}
```
Trước khi giới thiệu thuộc tính này, chúng tôi thường sử dụng các thủ thuật như thế này để lừa trình duyệt hoạt hình một số yếu tố có hiệu suất tốt hơn (bằng cách “forcing” phần tử “onto the GPU”):
```css
.will-be-animated {
    transform: translate3d(0, 0, 0);
}
```
## 9. writing-mode
Thuộc tính writing-mode xác định liệu văn bản được đặt theo chiều ngang hay chiều dọc cũng là hướng.

- `horizontal-tb`: nội dung chảy từ trái sang phải, từ trên xuống dưới
- `vertical-rl`: nội dung chảy từ trên xuống dưới, từ phải sang trái
- `vertical-lr`: nội dung chảy từ trên xuống dưới, từ trái sang phải

{@embed: https://codepen.io/gregh/pen/qREpMY}

## 10. :-webkit-autofill
Là một `pseudo-class`, Khi bạn lưu email hoặc mật khẩu ở trình duyệt, ở lần đăng nhập tiếp theo trình duyệt sẽ tự động điền các thông tin bạn đã lưu vào `input`. Điều này thật hữu ích, tuy nhiên nó lại có một style không hợp mắt cho lắm, bạn muốn ghi đè nó, thì hãy  sử dụng `:-webkit-autofill`  để style lại thẻ input của chính mình
### Tham khảo 
* [CSS-Tricks](https://css-tricks.com/lets-look-50-interesting-css-properties-values/)