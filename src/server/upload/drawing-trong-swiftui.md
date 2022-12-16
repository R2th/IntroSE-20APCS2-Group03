Hôm nay mình sẽ chia sẽ cho các bạn các dạng hình khối ở trong SwiftUI. Thì ở trong SwiftUI ta sẽ có 5 dạng  hình khối cơ bản.
Bây giờ chúng ta sẽ bắt đầu nhé.

# Rectangle
Thì thẻ này sẽ giúp ta tạo ra một hình khối hộp với kích thước chiều rộng và chiều dài ta truyền vào thông qua thuộc tính frame

![](https://images.viblo.asia/6220bd86-da24-4faa-94eb-0e799928c3f8.png)

# RoundedRectangle
Thì thằng này cũng sẽ giúp ta tạo ra một dạng hình khối nhưng nó khác thằng trên ở một chổ là nó sẽ giúp ta bo tròn các góc của hình khối. Thằng này sẽ cho ta truyền vào hai tham số:
Tham số thứ một cornerRadius là số bo góc của hình khối
Tham số thứ hai của nó style, xác định xem bạn muốn các góc bo tròn cổ điển ( .circular) hay sự thay thế mượt mà hơn một chút của Apple ( .continuous).

![](https://images.viblo.asia/0c1865d7-55a4-40af-b733-cac7ba28af56.png)

# Capsule
Khi dùng này thì ta sẽ được một hộp trong đó các cạnh chiều rộng sẽ được bo tròn các góc kiểu như nó tự động được cornerRadius theo chiều rộng chia hai.

![](https://images.viblo.asia/9f065ce3-09dc-4c9f-8d9d-8a845f665db1.png)

# Ellipse
Thì thẻ này sẽ giúp ta tạo ra một hình Elip với kích thước chiều rộng và chiều dài ta truyền vào thông qua thuộc tính frame.

![](https://images.viblo.asia/ba9bf8de-8f7d-42b1-958d-4e1527e0d20a.png)

Circle 
Thẻ này sẽ cho phép ta tạo ra một hình tròn khi ta truyền vào chiều dài và chiều rộng bằng nhau thì lúc đó ta sẽ tạo ra được một cái hình tròn.

![](https://images.viblo.asia/d3eb205d-6a95-49a1-9aef-03212b906223.png)

# Path

Thì thằng này sẽ cho phép ta vẽ ra một đường dẫn bằng cách sử dụng các thuộc tính sau.
addLine nó sẽ thêm đường thẳng vào bằng cách truyền vào CGPoint điểm mà mình muốn vẽ đường thẳng đó.

Và ở trong này những thằng này thì ta sẽ có những thuộc tính chung như sau :
+ Fill: Nó sẽ tô màu cho hình khối của ta
+ Stroke: Nó sẽ trả về một hình khối mới với background clear và độ dài cạnh ta truyền vô.

![](https://images.viblo.asia/83e03b6d-7a23-41c3-aba8-8c4e54d5f420.png)