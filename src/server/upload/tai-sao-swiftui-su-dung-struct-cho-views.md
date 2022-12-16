# Tại sao SwiftUI sử dụng struct cho views mà ko phải là class ?
Nếu bạn đã từng làm việc với UIKit thì bạn thường thấy là nó sử dụng class để thể hiện các view và sử dụng struct để thể hiện data. Với SwiftUI thì ngược lại với UIKit ( struct thể hiện cho view còn class thể hiện cho data) và câu hỏi là tại sao ??
Có một số lý do như sau:
1. Yếu tố về performance: struct thì đơn giản & nhanh hơn class.
2. Trong UIKit mỗi view là 1 class UIView có rất nhiều property & method, background color, các constraints để auto align nó theo từng thiết bị ... Mỗi UIView & subclass của UIView đều có những cái này bởi vì nó là sự kế thừa trong class. 1 UIView có thể kế thừa từ UIView khác, và UIView khác đó có thể kế thừa từ UIView khác nữa ....
3. Thông thường thì ko có vấn đề gì, nhưng đối với trường hợp đặc biệt : UIStackView (cái mà được biết đến tương tự trong SwiftUI là : VStack & HStack) thì trong UIKit UIStackView là 1 kiểu ko được hiển thị chỉ thiết kế ra để làm cho bố cục sắp xếp dễ dàng hơn. Lúc này thì background color ko được sử dụng, nhưng nó lại tồn tại trong UIStackView vì tính kế thừa trong class. Trường hợp này trở nên dư thừa...
4. Trong SwiftUI, tất cả các views thì sẽ được tạo ra từ struct & tạo ra từ struct thì gần như ko tốn thêm bất cứ cái gì.. Vd: chúng ta tạo 1 struct chứa 1 số int, thì size của struct lúc này là 1 số int. Ko có gì nữa, ko có bất kỳ 1 cái nào từ việc kế thừa từ lớp cha, lớp ông nội, lớp ông cố ... và nó chứa chính xác những gì chúng ta nhìn thấy trên view..
5. Khi sử dụng class thì các giá trị được lưu trữ trong class sẽ được thay đổi dễ dàng & tùy ý, cho nên dẫn đến code dễ dàng bị lộn xộn. Struct thì ko thể thay đổi các giá trị được lưu trong struct 1 cách tùy ý, nên SwiftUI sẽ qui định 1 cách thức để thay đổi giá trị & cập nhật giao diện của view 1 cách tự động ( Binding - giống như trong Xamarin/ State của React)

Tham khảo từ: https://www.hackingwithswift.com/books/ios-swiftui/why-does-swiftui-use-structs-for-views

Xem thêm: https://blog.quilv.com/blog/