### Giới thiệu
Chào toàn thể cộng đồng Viblo, hôm nay mình sẽ chia sẻ một chút về Responsive trên các thế hệ mới của iPhone tính từ iPhone X không có phím home.Với việc thay đổi này thì cùng với thay đổi xu hướng dùng iPhone mới của người dùng thì các công ty thiết kế Web cũng phải làm sao để các sản phẩm Web họ làm ra cũng phải tương thích trên các thiết bị mới này của Apple.

Đây là hình ảnh của iPhone X khi bỏ nút Home sẽ lộ khoảng trắng như thế này, và khi sử lý để không còn khoảng trắng nữa sẽ được như hình bên dưới.
![](https://images.viblo.asia/fb023967-6255-4f45-86c2-05e860062dde.png)

### Cách sử lý
**1.Thêm viewport-fit vào thẻ meta**

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```
Sau khi thêm thì sẽ không còn khoảng trắng nữa và sẽ được như thế này
![](https://images.viblo.asia/6b28efa8-d6dc-4e06-8507-5a1e7d145723.png)

Tuy nhiên thì nó sẽ bị che mất 1 phần content ở chỗ tai thỏ và cái mình cần làm là đẩy content lùi xuống bằng với lúc có khoảng trắng
bằng safe-area-inset-x, trong đó x sẽ là top,right,bottom,left
```
safe-area-inset-top
safe-area-inset-right
safe-area-inset-left
safe-area-inset-bottom
```
Cách thêm sẽ là 
+ Phiên bản iOS 12 trở xuống
```CSS
padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
```
+Phiên bản iOS 12 trở lên thì sẽ là
```CSS
padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
```
Khi thêm như trên thì chúng ta sẽ được như hình dưới, có thể tương thích chạy tốt trên iPhone X và các phiên bản iPhone mới ra bây giờ.
![](https://images.viblo.asia/0fc2b517-076d-4225-8bd3-6cc1aa02357e.png)

### Lời kết
Trên đây là 1 chút chia sẻ về Responsive trên thế hệ iPhone mới của Apple tính từ iPhone X được bỏ nút  Home và khi làm và test Responsive chỉ cần những kĩ thuật nhỏ như trên là chúng ta có thể giải quyết được vấn đề Responsive trên iPhone thế hệ mới , cảm ơn các bạn đã đọc.