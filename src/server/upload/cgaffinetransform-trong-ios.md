# CGAffineTransform
![](https://images.viblo.asia/65865724-a5d3-4f28-ac23-6eeb3edd3e4a.png)
Core Animation là một nền tảng cho phép render và tạo ra các animation được hỗ trợ cho hệ điều hành iOS và OS X, chúng được sử dụng để tạo nên các hiệu ứng chuyển động cho các views và các thành phần hiển thị cho ứng dụng của bạn. Với Core Animation, hầu hết các công việc cần thiết để vẽ từng khung hình của 1 animation đều có thể thực hiện được. Tất cả những gì bạn cần phải làm là cấu hình một vài tham số (chẳng hạn như điểm bắt đầu và kết thúc) và yêu cầu Core Animation bắt đầu. Core Animation sẽ giúp bạn thực hiện phần còn lại, xử lý hầu hết công việc vẽ thực tế, tối ưu phần cứng đồ họa để tăng tốc độ hiển thị. Tăng tốc đồ họa tự động này sẽ giúp tốc độ khung hình cao và animation mượt mà, mà không làm nặng CPU và làm chậm ứng dụng của bạn.

Trong iOS, tất cả các lớp giao diện đều được kế thừa từ lớp cơ sở chung UIView. UIView xử lý các sự kiện chạm và hỗ trợ các hàm vẽ dựa trên Core Graphics, các phép biến hình và các ảnh động.


UIView có thuộc tính transform có kiểu là CGAffineTransform cho phép xoay đối tượng, phóng to, thu nhỏ và dịch chuyển. CGAffineTransform là một ma trận 2 cột, 3 dòng có thể nhân với một vector 2D (CGPoint) để thay đổi giá trị của nó.

Phép nhân được thực hiện bằng cách nhân từng giá trị trong vector CGPoint mới. Với giá trị trong ma trận CGAffineTransform, kết quả cuối cùng sẽ tạo ra một CGPoint mới.
![](https://images.viblo.asia/7ad99a62-4dd2-4932-97e3-70cfcefe1f5a.png)

Core Graphics cung cấp các hàm cho phép biến đổi đối tượng:
```Swift
CGAffineTransform(a: CGFloat, b: CGFloat, c: CGFloat, d: CGFloat, tx: CGFloat, ty: CGFloat)
CGAffineTransform(from: Decoder)throws
CGAffineTransform(rotationAngle: CGFloat)
CGAffineTransform(scaleX: CGFloat, y: CGFloat)
CGAffineTransform(translationX: CGFloat, y: CGFloat)
```

Chúng ta hãy thử bằng ví dụ đơn giản: khi currentAnimation có giá trị là 0, thì biến đổi khung hình nhìn gấp đôi kích thước thật của nó. Đoạn mã sẽ như sau:
```Swift
switch self.currentAnimation {
case 0:
    self.imageView.transform = CGAffineTransform(scaleX: 2, y: 2)

default:
    break
}
```

Điều này sẽ sử dụng một trình khởi tạo cho CGAffineTransform lấy giá trị tỷ lệ X và Y là 2 tham số. Giá trị 1 được hiểu như "kích thước mặc định", vì vậy 2, 2 sẽ làm cho chế độ xem gấp đôi chiều rộng và chiều cao của hình ban đầu.

Chạy ứng dụng để thấy kích thước của hình thay đổi, sau lần đầu tiên, bạn có thể tiếp tục nhấn START nhiều lần hơn nếu muốn, nhưng sẽ không có gì xảy ra vì lúc này, currentAnimation đã khác 0.

 ![](https://images.viblo.asia/6534dbde-fe56-4fa6-893f-241d782ce1fa.png)    ![](https://images.viblo.asia/ad4086b5-6bfa-4f0b-af0e-889307cd4655.png)

Tiếp theo, chúng ta sẽ sử dụng một biến đổi đặc biệt được gọi là CGAffineTransform.indentity. Điều này sẽ xóa mọi thay đổi trước đó và đặt lại mọi thứ về mặc định, và bây giờ đoạn mã của chúng ta sẽ như sau:

```Swift
switch self.currentAnimation {
case 0:
    self.imageView.transform = CGAffineTransform(scaleX: 2, y: 2)

case 1:
    self.imageView.transform = CGAffineTransform.identity

default:
    break
}
```

Lúc này khi chạy chương trình, START lần đầu, kích thước của hình sẽ được tăng gấp 2 lần, START lần tiếp theo hình sẽ trở về kích thước ban đầu.

 ![](https://images.viblo.asia/6534dbde-fe56-4fa6-893f-241d782ce1fa.png)

Chúng ta cùng xem thêm nhiều trường hợp khác:

```Swift
case 2:
    self.imageView.transform = CGAffineTransform(translationX: 0, y: 100)

case 3:
    self.imageView.transform = CGAffineTransform.identity
```

Việc sử dụng CGAffineTransform(translationX: 0, y:100) sẽ làm cho hình của bạn dịch chuyển đến tọa độ (0, 100)  so với tọa độ ban đầu.

Chúng ta cũng có thể sử dụng CGAffineTransform để xoay chế độ xem, sử dụng trình khởi tạo rotationAngle, và chúng ta phải truyền vào một tham số, đó là góc radian bạn muốn xoay.

```Swift
case 4:
    self.imageView.transform = CGAffineTransform(rotationAngle: CGFloat.pi)
case 5:
    self.imageView.transform = CGAffineTransform.identity
```

Có 3 lưu ý để sử dụng chức năng này:

- Bạn cần cung cấp giá trị trính bằng radian được chỉ định là CGFloat (nếu bạn nhập là 1.0 thì Swift tự hiểu đó là kiểu Float rồi nhé), nếu bạn muốn sử dụng một giá trị khác như pi, hãy sử dụng CGFloat.pi

- Core Animation sẽ luôn đi theo con đường ngắn nhất để làm cho vòng xoay hoạt động. Vì vậy, nếu đối tượng của bạn thẳng và xoay đến 90 độ, nó sẽ quay theo chiều kim đồng hồ. Nếu đối tượng của bạn thẳng và bạn xoay đến 270 độ thì nó sẽ xoay ngược chiều kim đồng hồ vì nó là vòng xoay ngắn nhất

- Một trường hợp nữa là nếu bạn cố xoay 360 độ, Core Animation sẽ tính toán vòng quay ngắn nhất là "đừng di chuyển, vì ta đang ở đó". Điều tương tự cũng xảy ra khi bạn cố xoay 540 độ thì bạn sẽ kết thúc chỉ với một vòng quay 1180 độ

Chúng ta còn có thể sử dụng CGAffineTransform để kéo ra các góc của khung hình theo 4 chiều để có thể tạo ra những khung hình đẹp mắt:

```Swift
case 6:
    self.imageView.transform = CGAffineTransform(rotationAngle: CGFloat.pi)
case 7:
    self.imageView.transform = CGAffineTransform.identity
```

Đây chỉ là 7 case tuy nhiên thì core animation không dừng lại ở đó. Chúng ta có thể làm nhiều thứ hơn với nó. ví dụ như thay thế dòng code:

`UIView.animate(withDuration: 1, delay: 0, options: [])`

thành  
`UIView.animate(withDuration: 1, delay: 0, usingSpringWithDamping: 0.5, initialSpringVelocity: 5, options: []`
bạn sẽ thấy sự khác biệt to lớn. 


Tài liệu tham khảo: https://www.hackingwithswift.com/read/15/4/transform-cgaffinetransform?fbclid=IwAR2iPOVVHXTzZxnL7K4z1zSJmWkFFCWhX3zMbJaWi92V17xMmT-ABgLybIk