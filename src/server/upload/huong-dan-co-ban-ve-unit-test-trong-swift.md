Đợt này trong dự án của công ty mình đang chuẩn bị triển khai việc dùng Unit Test. Unit Test thì không còn xa lạ gì với anh em Dev, ngay cả bản thân mình hồi học đại học thì cũng đã từng học qua môn quản lý dự án liên quan Unit Test nhưng để áp dụng vào thực tế thì không phải chuyện dễ. Hôm nay , mình cũng thử vọc vặt bước đầu xem Unit Test nó có tác dụng gì, lý do nên viết Unit Test.Dưới đây là 10 lý do để viết Unit:

10 Lý do nên viết Unit Test:  
1. Giảm lỗi khi implement tính năng mới.
2. Giảm lỗi trong tính năng hiện có.
3. Test là 1 tài liệu tốt.  Một đoạn code ngắn thay cho 1 đống tài liệu.
4. Giảm chi phí thay đổi.
5. Cải thiện design khi test
6. Test cấu trúc code
7. Test các điều kiện rằng buộc.
8. Test giúp bảo về, đề phòng các lập trình viên khác ( Một ngày  đẹp trời bạn nghỉ một hôm, có ông dev khác nhảy vào code  thì ...).
9. Khi test kết hợp với code bắt buộc bạn phải suy nghĩ chậm lại để code mình viết ra có thể implement unit test vào được.
10. Giảm nỗi sợ hãi lớn nhất mà các lập trình viên hay gặp phải là khi có 1 đoạn code nhỏ thay đổi nhỏ mà không biết điều gì sẽ xảy ra.

# 1. Cài đặt Unit test
## 1.1. Cài đặt vào project.
Để bắt đầu Unit Test, mình sẽ tạo project mới , các bạn tick vào ô include unit tests.
![](https://images.viblo.asia/d5985405-cf3e-46e1-b659-59f347ad49c5.png)
# 1.2 .Trường hợp nếu bạn đã có project nhưng chưa tạo   file Unit Test.
1. Trên Menu của Xcode , các bạn chọn **File > New > Target.**
2.  Chọn  **iOS Unit Testing Bundle.** và click **Next**. 
![](https://images.viblo.asia/daed909d-8458-46e4-8297-fb20dfb3f386.png)

# 2 .Tạo Internal Class
![](https://images.viblo.asia/f35d110b-815e-46b1-97ac-e572d168e3cd.png)
Tạo Internal Model Object  trong project của bạn . Bạn đừng tick  target "**UnitTestTests**"  cho  thằng class Car và không làm cho class hoặc method của bạn **public**.
![](https://images.viblo.asia/9421ea59-1309-4914-a880-85e9c2cda7b5.png)
# 3. Ví dụ Test Case
Khi app của bạn setting testing thì trong thư mục **UnitTestTests**, Xcode đã setup mẫu 1 file [TênProject]Tests.Swift
![](https://images.viblo.asia/2a54b9ad-ec6b-4b8d-9e98-27d8fad36acc.png)

1. Mỗi một test case thì bạn phải **import XCTest**
2. **import @testable** là khai báo nhập thêm . Khi bạn dùng khai báo **@testable** thì sẽ không cần đưa file của target khác vào target test.
3. Để tạo một unit test bạn cần 1 class kế thừa class **XCTestCase** (class UnitTestTests: XCTestCase) .
4. Nhập chuột vào hình kim cương ở bên phải màn hình nếu bạn muốn chạy 1 case unit test nào đó.
5. ![](https://images.viblo.asia/f35d110b-815e-46b1-97ac-e572d168e3cd.png)

# 4. Setup và dùng class Car.
Cho đoạn code quản lý car dưới đây: 
```
//  Car.swift
import Foundation
class Car {
   var miles = 0
   var type: CarType
   var transmissionMode: CarTransmissionMode
   init(type:CarType, transmissionMode:CarTransmissionMode){
      self.type = type
      self.transmissionMode = transmissionMode
   }
   func start(minutes: Int) {
      var speed = 0
      if self.type == .Economy && self.transmissionMode == .Drive {
         speed = 35
      }
      if self.type == .OffRoad && self.transmissionMode == .Drive {
        speed = 50
      }
      if self.type == .Sport && self.transmissionMode == .Drive {
        speed = 70
      }
      self.miles = speed * (minutes / 60)
   }
}
enum CarType {
   case Economy
   case OffRoad
   case Sport
}
enum CarTransmissionMode {
   case Park
   case Reverse
   case Neutral
   case Drive
}
```

Bây giờ chúng ta sẽ khởi tạo object Car trong ViewController.
```
//  ViewController.swift
import UIKit
class ViewController: UIViewController {
   override func viewDidLoad() {
      super.viewDidLoad()
      let ferrari = Car(type: .Sport, transmissionMode: .Drive)
      ferrari.start(minutes: 120)
      print(ferrari.miles) // => 140
   }
}
```
OK. Bây giờ chúng ta sẽ thực hiện Ví dụ về Unit Test.

# 5 .Tạo  Car Unit Test Case

1. Go to **File ->  New File**
2. Sau đó  select **Unit Test Case Class**.
3. Trong choose options, type class name: **CarTests** and press **Next**
4. Chú ý Target mình chọn phải là target [TênProject]Tests.

# 6. Customize CarTests
6.1 Import  @testable vào trong class **CarTests**
```
import XCTest
@testable import UnitTest
```
6.2 Khai bao những điều mà bạn muốn test.
Chúng ta sẽ khai báo implicitly unwrapped optionals (!)  vì tại thời điểm test thì các property chắc chắn phải có giá trị .
```
class CarTests: XCTestCase {
   var ferrari:Car!
   var jeep:Car!
   var honda:Car!
}
```

6.3 Override method setup()

Car sẽ được setup với types and transmission mode tương ứng.
```
override func setUp() {
   super.setUp()
   ferrari = Car(type: .Sport, transmissionMode: .Drive)
   jeep = Car(type: .OffRoad, transmissionMode: .Drive)
   honda = Car(type: .Economy, transmissionMode: .Park)
}
```

6.4 Override  method tearDown()
Chúng ta muốn chắc chắn mọi thứ sẽ được clear khi test kết thúc. Mình sẽ gán nil cho các property cho class CarTests.
```
override func tearDown() {
   super.tearDown()
   ferrari = nil
   jeep = nil
   honda = nil
}

```

# 7. Viết thử một Unit test.
Viết đoạn code test dưới đây: 
```
func testSportFasterThanJeep() {
   let minutes = 60
   //1 start ferrari
   ferrari.start(minutes: minutes)
   //2 start jeep
   jeep.start(minutes: minutes)
   //Test it
   XCTAssertTrue(ferrari.miles > jeep.miles)
}
```

Giờ hãy thử chạy  test case này bằng cách click vào nút kim cương ở bên trái của func trên.


# Tài liệu tham khảo: 
https://medium.com/@enricopiovesan/unit-testing-in-swift-tutorial-92daab95246b