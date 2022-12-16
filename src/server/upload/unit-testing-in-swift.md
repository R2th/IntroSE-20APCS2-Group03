Trong bài viết về [UI Testing](https://viblo.asia/p/getting-started-with-xcode-ui-testing-in-swift-yMnKMydrK7P) lần trước, tôi có đề cập Unit test. Vậy Unit testing là gì?
Trong ngành Computer programming, Unit Testing là phương pháp kiểm thử mà từng đơn vị mã nguồn (unit), bộ một hoặc nhiều module cùng với dữ liệu liên quan, quy trình sử dụng và vận hành được kiểm tra để xác định nó có phù hợp hay không?

# 10 lý do để viết Unit Tests
1. Tests để giảm lỗi (bugs) trong tính năng mới
2. Tests để giảm lỗi trong các tính năng hiện có
3. Tests là một tài liệu tốt.
4. Tests giảm chi phí của việc thay đổi
5. Tests để cải thiện thiết kế
6. Tests cho phép tái cấu trúc (refactoring)
7. Tests hạn chế tính năng
8. Test giữ được sự đúng đắn trước các ý kiến khác
9. Test khiến bạn chậm lại và suy nghĩ tốt hơn
10. Test giảm sự e ngại về ảnh hưởng của đoạn code bạn gây ra trên toàn hệ thống.


Các bước thực hiện Unit Test

# 1. Setting up

## 1.1 Setting với project mới
Để bắt đầu, bạn tạo một new iOS project và check vào checkbox của **include unit tests**

![](https://cdn-images-1.medium.com/max/800/1*qimrE9EkrSNqI9yL5n3bCg.png)

## 1.2 Bạn có sẵn một project và muốn thêm Unit Tests
1. Chọn File > New > Target.
2. Chọn iOS Unit Testing Bundle.
3. Click Next

![](https://cdn-images-1.medium.com/max/800/1*-m3E-gJlCKoFvWUTe2spIA.png)

# 2. Tạo một internal Class
Tạo một Model Object đơn gian với một function mẫu. Bạn không add **Car**(object) vào target “UnitTestTests” và không public class hoặc methods

![](https://cdn-images-1.medium.com/max/1000/1*G0SR6ZOsKB5xQQLRw0wuQw.png)

# 3 Ví dụ Test case của Apple
Khi ứng dụng của bạn được cài đặt để Testing, bạn sẽ nhìn thấy 1 thư mục **UnitTestTests**, với các Tests files trong đó. Xcode thiết lập một file mẫu **UnitTestTests.swift** để thực hiện

![](https://cdn-images-1.medium.com/max/1000/1*vb7XF20SheomRjxmzryPrQ.png)
1. Mọi test case bạn viết sẽ import **XCTest framework.**
2. **@testable** là một khải niệm import mở rộng. Khi bạn sử dụng **@testable**, sẽ cân bất kỳ phải file nào trong ứng dụng add vào test target.
3. Khi tạo một Unit test, bạn sẽ được subclassing một cái gọi lại **XCTestCase** (class UnitTestTests: XCTestCase) .
4. Và hãy đặt con trỏ chuột lên chúng. Chung là một nút nội tuyến để chạy chương trình test. Nếu bạn di chuyển qua hình viên kim cương cạnh đó, bạn có thể nhấp chuột để chạy test. Ứng dụng và test target sẽ được build, test sẽ chạy và bạn nhìn thấy thông báo **test succeeded**

![](https://cdn-images-1.medium.com/max/1000/1*IEU-YoZiTwu8rWZ90w3hSg.png)

Ví dụ này không thực hiện điều gì hữu ích. Nó chỉ giúp bạn hiểu và cách viết một unit test. Để hiểu được sức mạnh thực sự của nó, chúng ta cần tạo ra một vài điều gì đó cụ thể hơn.

# 4 Cài đặt and sử dụng Car class
Hãy bắt đầu với một đoạn code đơn giản để quản lý xe:
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
Bây giờ bạn có thể khởi tạo và sử dụng một đối tượng xe *"ferrari"* trong viewController:
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
   override func didReceiveMemoryWarning() {
       super.didReceiveMemoryWarning()
   }
}
```
Ok, nó tuy khá đơn giản, nhưng là đủ cho unit test đầu tiên của chúng ta.

# 5 Tạo một Car unit test case
Các bước để tạo một unit case mới trong iOS:
1. Vào File
2. New file
3. Chọn Unit Test Case Class.
4. Gõ class name và Next:

![](https://cdn-images-1.medium.com/max/800/1*8_Lwt9ni_gpjmzquHJcR0A.png)

![](https://cdn-images-1.medium.com/max/800/1*NKStloeXKpHX0Wt7W1oyWg.png)

Khi bạn **Next** sẽ chuyển đến một màn hình khác, bạn có thể lựa chọn nơi để lưu file CarTests. Hãy chắc chắn nó ở trong group Unit Tests

![](https://cdn-images-1.medium.com/max/800/1*HXf44WeXXGXRlPPlKR9bJw.png)

Đó là một test case khác, nhưng lần này là để testing cho Car class
```
//  CarTests.swift
import XCTest
class CarTests: XCTestCase {
   override func setUp() {
      super.setUp()
   }
   override func tearDown() {
      super.tearDown()
   }
   func testExample() {
      // This is an example of a functional test case.
   }
   func testPerformanceExample() {
      // This is an example of a performance test case.
      self.measure {
         // Put the code you want to measure the time of here.
      }
   }
}
```

# 6 Customize CarTests

## 6.1 Use @testable to import your application
```
import XCTest
@testable import UnitTest
```
Bạn cần làm nó trước khi khai báo CarTests

## 6.2 Khai báo những gì bạn muốn test
```
class CarTests: XCTestCase {
   var ferrari:Car!
   var jeep:Car!
   var honda:Car!
}
```

## 6.3 Override the setup() method
Để cài đặt Car trong kiểm thử, chúng ta sẽ override hàm **setup()**. Đối tượng Car sẽ được thiết lập với các loại tương ứng.
```
override func setUp() {
   super.setUp()
   ferrari = Car(type: .Sport, transmissionMode: .Drive)
   jeep = Car(type: .OffRoad, transmissionMode: .Drive)
   honda = Car(type: .Economy, transmissionMode: .Park)
}
```

## 6.4 Override the tearDown() method
Chúng ta muốn chắc chắn rằng, mọi thứ sẽ thật rõ rang sau mỗi lần chạy kiểm thử. Để kết thúc, chúng ta override hàm  **tearDown()** trên XCTestCase. Chúng ta set giá trị về nil, và loại bỏ hết trang thái hiện có.
```
override func tearDown() {
   super.tearDown()
   ferrari = nil
   jeep = nil
   honda = nil
}
```

# 7 Write a real test
Bây giờ chúng ta phải setup một test case để đặt vào từng loại xe, ta cần viết một test thể hiện rằng xe thể thao phải nhanh hơn một chiếc xe jeep
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
Nào chúng ta sẽ chạy nó bằng cái click vào viên kim cương

![](https://cdn-images-1.medium.com/max/1000/1*TMvsI051ntoCpCnL4Eo_Ng.png)

Line code cuối cùng là một sự khẳng định. Bạn sẽ nhìn thấy kết quả của testcase 

![](https://cdn-images-1.medium.com/max/800/1*Ccvorr1Iuaa8EaT-SoRVrg.png)

[Refer](https://medium.com/@enricopiovesan/unit-testing-in-swift-tutorial-92daab95246b)