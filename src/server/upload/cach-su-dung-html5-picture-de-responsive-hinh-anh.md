# Lời nói đầu:
Để responsive 1 hình ảnh chúng ta có rất nhiều cách, nhưng phổ biến nhất chúng ta vẫn để width: 100% khi màn hình nhỏ, nhưng đôi khi có những hình ảnh quá lớn mà chúng ta để như thế thì lại không tập trung vào điểm quan trọng của bức ảnh. Chính vì thế HTML5 picture ra đời, nó giúp chúng ta có thể hiện thị các bức ảnh khác nhau ở từng màn hình mình mong muốn.
# Chuẩn bị: 
Tôi đã chuẩn bị một hình ảnh trong ba chiều khác nhau, như sau. Hình ảnh đã được cắt để giữ tập trung vào người trong ảnh. Kế hoạch ở đây là chúng tôi sẽ hiển thị kích thước nhỏ nhất trong màn hình nhỏ và hình ảnh lớn hơn trong màn hình lớn.!
[](https://images.viblo.asia/2c081fd9-68e0-49c7-9e69-9d46c9a77244.jpg)
# Sử dụng HTML <picture>
**Picture** có thể hoạt động theo hai cách: chúng ta có thể nhúng **srcset** vào thẻ** img** hoặc sử dụng phần tử **picture**. Ở đây chúng tôi sẽ lựa chọn yếu tố **picture** vì nó dễ quản lý hơn, dễ dàng hơn để hoàn tác và dễ đọc hơn.

Tương tự như các thẻ **video** và **audio**, **picture** bao bọc các thẻ nguồn **source**  , như sau:
```html
<picture>
  <source srcset="img/person-xsmall.jpg" media="(max-width: 480px)">
  <source srcset="img/person-small.jpg" media="(max-width: 640px)">
  <source srcset="img/person-med.jpg">
  <img srcset="img/person-med.jpg" alt="">
</picture>
```
Phần tử **source**, như bạn có thể thấy từ đoạn mã trên, được đặt với thuộc tính **media**. Trong thuộc tính này, chúng tôi chỉ định điểm dừng của chế độ xem mà hình ảnh sẽ được trình bày. Bạn có thể thấy hiệu quả ngay lập tức.
Kiểm tra [trang demo ](https://hongkiat.github.io/html5-picture/)và thay đổi kích thước kích thước khung nhìn, bạn sẽ tìm thấy hình ảnh được hiển thị trong chiều rộng khung nhìn được chỉ định.
![](https://images.viblo.asia/eeb7332d-8fe2-4051-b23e-a87598b1d0d1.jpg)
# Hỗ trợ trình duyệt
Hiện tại mọi trình duyệt đều hỗ trợ phần tử hình ảnh HTML5 bao gồm Microsoft Edge cũng như các trình duyệt di động.
# Nguồn: 
hongkiat.com