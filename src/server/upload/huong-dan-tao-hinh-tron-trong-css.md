## Giới thiệu
Gần đây, chúng tôi đã làm việc trong một dự án liên quan đến hình tròn, hình thu nhỏ tròn, nút tròn, container tròn,... Trong bài viết hôm nay mình sẽ chia sẻ cho các bạn các cách tạo hình tròn bằng CSS. Nếu các bạn đang gặp phải vấn đề về tạo hình tròn trong CSS thì đây sẽ là bài viết hữu ích dành cho bạn.

Có một số kỹ thuật để xác định hình dạng tròn động trong HTML và CSS, mỗi cái có ưu và nhược điểm riêng. Dưới đây là một số cách tôi đã thử nghiệm nhiều nhất, từ phổ biến nhất đến ít dùng nhất.

![](https://images.viblo.asia/acc46915-9042-4ca9-a2df-208aa07de6a7.png)

## Border radius
Kỹ thuật phổ biến nhất là làm tròn tất cả các góc bằng cách set `border-radius: 50%` . Đây là kỹ thuật đơn giản nhất được sử dụng và hỗ trợ đa trình duyệt. Thuộc tính `border-radius`  cũng sẽ ảnh hưởng đến `border`, `box-shadow` và kích thước của phần tử.
{@embed: https://codepen.io/tylersticka/pen/ZEEYazj}
Nếu bạn muốn tạo phần tử pill (hình viên thuốc), chúng ta sẽ set thuộc tính `border-radius` giá trị bằng 1 nửa chiều cao của phần tử. Nếu chiều cao không xác định, chọn một số giá trị lớn tùy ý (ví dụ: 99em).
```
.circle {
  background: #456BD9;
  border: 0.1875em solid #0F1C3F;
  border-radius: 50%;
  box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
  height: 5em;
  width: 5em;
}
```
{@embed: https://codepen.io/tylersticka/pen/XWrgxjw}

## SVG
Các SVG có thể bao gồm một phần tử `<circle />`, có thể được style tương tự như bất kỳ cách nào khác. Chúng được hỗ trợ rất tốt và thực hiện để animate, nhưng chúng đòi hỏi nhiều markup hơn các kỹ thuật khác. Để ngăn việc cắt hình ảnh trực quan, hãy đảm bảo bán kính hình tròn (cộng với một nửa chiều rộng của nó, nếu có) nhỏ hơn một chút so với `viewBox` SVG.
```
.circle {
  fill: #456BD9;
  stroke: #0F1C3F;
  stroke-width: 0.1875em;
}
```
{@embed: https://codepen.io/tylersticka/pen/OJJPOgj}
## Clip Path
Đường dẫn clip là một kỹ thuật mới hơn. Hỗ trợ là tốt nhưng ít nhất quán. Clip Path không ảnh hưởng đến bố cục yếu tố, có nghĩa là chúng sẽ không ảnh hưởng đến `border` và có khả năng sẽ ẩn `box-shadow` bên ngoài.
```
.circle {
  background: #456BD9;
  clip-path: circle(50%);
  height: 5em;
  width: 5em;
}
```
{@embed: https://codepen.io/tylersticka/pen/qBBEVZW}

## Radial Gradient
Chúng ta có thể sử dụng `background-image` và `radial-gradient` để lấp đầy trực quan một phần tử bằng một vòng tròn. Bất kỳ nội dung nào cũng sẽ nằm trên cùng của hình dạng đó, nhưng bố cục của nó sẽ không bị ảnh hưởng. Đây là kỹ thuật yêu thích ít nhất của tôi vì các cạnh của hình tròn có thể xuất hiện lởm chởm hoặc mờ tùy theo trình duyệt, nhưng nó có thể phù hợp với các điểm nhấn nền tinh tế.
```
.circle {
  background-image: radial-gradient(circle, #456BD9, #456BD9 66%, transparent 66%);
  height: 5em;
  width: 5em;
}
```

{@embed: https://codepen.io/tylersticka/pen/oNNgoEx}

## Kết luận
Qua bài viết này mình đã giúp các bạn tìm hiểu các cách tạo hình tròn bằng CSS. Mình hy vọng nó sẽ có ích cho bạn.

Bài viết tham khảo: [CSS Circles](https://cloudfour.com/thinks/css-circles/)