### Version

Swift 5.2 hiện có sẵn như là một phần của Xcode 11.4.Bài viết này sẽ trình bày tổng quan về những thay đổi mà bạn sẽ thấy trong phiên bản mới nhất này.

Nhìn chung , Swift 5.2 là một bản phát hành nhỏ , nó mang lại nhiều cải tiến giúp ích cho công việc của các nhà phát triển Swift.Trong bản phát hành này, bạn có thể tìm thấy: 

•	Phát hiện lỗi và thông báo báo lỗi tốt hơn , đặc biệt là cho Swift UI.

•	Các tính năng mới sẽ đơn giản hoá các nhiệm vụ nhất định.

•	Sửa những lỗi cơ bản.

Để bắt đầu, bạn sẽ khám phá tính năng mới nhất : cải thiện các thông báo lỗi.

### Cải thiện chuẩn đoán và thông báo lỗi.

Bạn luôn luôn viết mã hoàn hảo trong lần thử đầu tiên? Nếu không, bạn sẽ yêu thích những cải tiến cho công cụ chẩn đoán trong Swift 5.2! Khi bạn gặp lỗi trong mã của mình, trình biên dịch sẽ cung cấp cho bạn một mô tả chính xác hơn về lỗi và vị trí của nó.

Công bằng mà nói, trình biên dịch Swift đã thực hiện tốt công việc báo cáo hầu hết các lỗi trong mã của bạn. Mã dưới đây:

 ![](https://images.viblo.asia/b7d57234-6523-4c01-a3e5-c2f3bd1fe6ed.PNG)

tạo ra một thông báo lỗi rõ ràng:

 ![](https://images.viblo.asia/6a35b2a4-d0c2-49cb-8603-10f94f320b6d.png)


Thông báo lỗi cho bạn biết rằng bạn không thể sử dụng toán tử ‘+ để tham gia Chuỗi và Int. Tùy thuộc vào ý định của bạn, nó cũng chỉ cho bạn hành động để khắc phục vấn đề. Nếu mục tiêu là thêm 5 vào số được biểu thị bằng chuỗi, thì bạn có thể sửa lỗi như sau:

 ![](https://images.viblo.asia/5d1dd76e-fdf0-476b-a9c4-7a22fbd202c8.png)

Tuy nhiên, vào những thời điểm khác, các thông báo lỗi không phải là hữu ích. Điều này đặc biệt đúng với các lỗi liên quan đến kiểm tra loại. Swift 5.2 đã giải quyết vấn đề này bằng cách tập trung vào các cải tiến cho trình kiểm tra loại.

### Xử lí lỗi dễ dàng hơn

Hãy xem xét đoạn code sau đây trong SwiftUI:
 
 ![](https://images.viblo.asia/f902982c-f3df-4091-ad26-56575254720e.png)

Trước Xcode 11.4, thông báo lỗi bạn sẽ thấy là:

  ![](https://images.viblo.asia/10ec4779-7bf9-4424-ad13-f954aa00b1d8.png)

Đây là một lỗi trong SwiftUI từ các phiên bản Swift cũ hơn, (Xcode 11, Swift 5)ở đây các lập trình viên thường thấy các thông báo lỗi không được rõ ràng như thế này khi làm việc với SwiftUI.Điều làm cho việc học Swift UI trở nên khó khăn hơn.

Nhìn lại code , Bạn có thể nhận ra vấn đề ở đây là gì ?- một gợi ý ,không liên quan đến việc chuyển đổi ‘Double’ thành ‘CGFloat’!
Bây  giờ hãy mở swiftui.playground thực thi dòng code (trên Xcode11.4, Swift 5.2.) Bạn sẽ thấy rằng trình biên dịch cung cấp cho bạn một thông báo lỗi hữu ích và hữu dụng hơn nhiều:

 ![](https://images.viblo.asia/cdf351db-2ad6-4398-96d6-b680e5042c2c.png)

Trình biên dịch thông báo lỗi cho bạn đến đúng dòng có lỗi và cho bạn biết vấn đề. Bạn có thể chuyển một ràng buộc kiểu ‘Double’  đến một phương thức mong đợi một ràng buộc kiểu ‘String’.
Bây giờ bạn đã biết phải làm gì để khắc phục lỗi này :

 `TextField("Angle", value: $angle, formatter: NumberFormatter.decimalFormatter)`

### Không chỉ SwiftUI

Mặc dù bạn sẽ nhận thấy thông báo lỗi tốt hơn thường xuyên nhất trong SwiftUI, nhưng bạn cũng sẽ thấy những cải tiến  code trong Swift.
Hãy xem xét đoạn code sau đây: 

 ![](https://images.viblo.asia/667fdef8-0ce2-44d0-bbd8-0cfed8129016.png)

Đoạn code này muốn thêm một Int vào UInt nhưng Xcode không biên dịch. Trước Swift 5.2, trình biên dịch đã hiển thị lỗi sau:

 ![](https://images.viblo.asia/a2e36bab-e0af-4677-8028-dc018972f838.png)

Bây giờ bạn sẽ thấy một thông báo lỗi chính xác và hữu ích hơn:

 ![](https://images.viblo.asia/6176209e-72a0-48ca-bc92-c8ce79c630f9.png)

Key Path as Functions
Với Swift 5.2, ngôn ngữ hiện cho phép \ Root.value đường dẫn khóa bất cứ nơi nào bạn có thể đã sử dụng (Root) ->Value.
Về code, bạn có thể viết:

 `orders.map{ $0.email }`

…bây giờ bạn cũng có thể viết:

 `orders.map{ \.email }`

Việc triển khai hiện tại giới hạn tính năng này đối với các biểu thức. Hiện tại bạn không thể viết như sau, tính năng này cho thấy việc triển khai trong tương lai:

 `
 let kq = \.email
 users.map(kp)
 `

Tuy nhiên, bạn có thể thực hiện các cú pháp khác nhau:

 ![](https://images.viblo.asia/67048768-a99a-4744-8ba8-5a41a1803f76.png)

Hai tính năng đầu tiên mang lại chức năng tốt hơn cho Swift. Bây giờ bạn có thể sử dụng các chức năng ở những nơi trước đây yêu cầu ‘blocks’ hoặc ’closures’. Vì bây giờ bạn có thể truyền một ‘key path’ dưới dạng một hàm, bạn cũng có thể chuyển một ‘key path’ tới một giá trị thực thi callAsFunction ()