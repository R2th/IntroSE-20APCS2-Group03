Self trong ruby (p1): https://viblo.asia/p/self-trong-rubyp1-ORNZqP7GK0n.

Chào các bạn, trong phần trước mình đã giới thiệu về sender và receiver trong ruby, hôm nay chúng ta sẽ cùng tiếp tục tìm hiểu về self và cách giá trị của self thay đổi khi chương trình được thực thi nhé.
* Đầu tiên chúng ta sẽ khai báo 1 class Car với phương thức drive như thế này:
* ![](https://images.viblo.asia/bd8adce9-3706-47ea-802d-d1b3be806972.png)
* Chúng ta có thể khởi tạo ra 1 đối tượng của class `Car` và gửi 1 `message` đến đối tượng `car` mà chúng ta vừa tạo
* ![](https://images.viblo.asia/f6034349-2dfd-4335-ad9a-3339c5407529.png)
* Chúng ta sẽ có:
* ![](https://images.viblo.asia/cdce8053-2f32-4fbf-8ef4-20fe34e3d19f.png)
* Khá là đơn giản đúng không, nhưng đó không phải cái mình muốn nói tới ở đây, hãy cùng tìm hiểu sâu hơn chút nữa nhé
## 1. `self`  trước khi `message` được gửi đi
* Hãy cùng xem giá trị của `self` trước khi chúng ta gửi `message` đến đối tượng `car` nhé. Thêm dòng này vào cái đã
* ![](https://images.viblo.asia/749c0b02-ceb4-4690-8728-e9f9f563b48a.png)
* Dòng trên sẽ in ra:
* ![](https://images.viblo.asia/816be850-85bd-4532-b680-0ba40c8f19b9.png)
* Vì chúng ta đang ở top level, mình cũng đã giải thích ở bài trước ruby sẽ tự sinh ra một đối tượng main làm sender ở top level nên trong trường hợp này self sẽ trỏ đến main, khá là dễ hiểu đúng không.
## 2. `self` khi `message` được gửi đi
* Thử đoán xem khi `message` được gửi đi thì `self` có giá trị là gì nào
 ![](https://images.viblo.asia/5d961c0b-2756-4a8a-9653-e03fea4e97b6.png) 
 ![](https://images.viblo.asia/ed73cfe8-9ab0-414e-a250-74a7cd599280.png) 
* Nếu bạn đoán `self` chính là đối tượng `car` mà chúng ta đã tạo thì chúc mừng bạn đã đoán đúng rồi đó, kiến thức về ruby của bạn không tồi đâu :). Đã có trước khi gửi và trong khi gửi, cuối cùng hãy cùng xem sau khi gửi thì `self` sẽ có hình thù ra sao nào.
## 3. `self` sau khi `message` được gửi đi
* Hãy cùng thay đổi lại thứ tự dòng lệnh 1 chút 
![](https://images.viblo.asia/3e371776-cbfb-4f12-9cc6-6009cca18cae.png)
* Chúng ta sẽ có
![](https://images.viblo.asia/ecda6d1c-9519-4c7a-bdd9-e0cc4e4728a6.png)
* Bất ngờ chưa (đùa đấy :)), `self` lại quay trở về giá trị `main` như ban đầu, nếu bạn có hơi hoang mang thì cũng đừng lo lắng quá, thực ra đây là cơ chế của `ruby`, `self` trong `ruby` sẽ luôn thay đổi giá trị của nó, không bao giờ giữ nguyên 1 giá trị hay nói cách khác giá trị của nó rất linh động để phù hợp với ngữ cảnh. 
## 4. Tổng kết
* Vậy là hôm nay mình đã giới thiệu với các bạn tính linh động của `self` trong ruby, mình hi vọng qua bài viết này các bạn sẽ hiểu thêm được thêm về ngôn ngữ `ruby` để có 1 cái nhìn đúng đắn hơn về `ruby` cũng như áp dụng được nó trong công việc, nếu yêu thích bài viết này thì hãy nhấn nút up vote ở góc trái nhé, cảm ơn vì đã dành thời gian đọc bài viết của mình.
* Bài viết có sử dụng tư liệu trong cuốn sách Ruby Basic của tác giả Bala Paranj