Swift là một ngôn ngữ nhanh và nó sẽ nhanh hơn trong mỗi bản phát hành. Các thiết bị iOS cũng rất nhanh, vì vậy rất có thể những mẹo này không quá cần thiết. Ngay cả trong những trường hợp chúng ta gặp phải các vấn đề về hiệu năng, thì vẫn có những cách phổ biến như sử dụng cache, background threads hoặc bất kỳ kỹ thuật nào khác.
Nhưng khi làm việc với dự án lớn, những cách này sẽ làm cho hiệu năng tối ưu nhất có thể.

## 1. Optimization Level trong Build Settings
Điều đầu tiên bạn cần làm để tối ưu hóa code của mình là để cho Xcode tự tối ưu. Trình biên dịch Xcode đủ thông minh để biết khi nào nó có thể bỏ qua các functions không sử dụng hoặc gọi trực tiếp đến các phương thức trong class không được kế thừa, nhưng điều này có thể đi kèm với việc tăng thời gian biên dịch bổ sung hoặc kích thước.
Các bước: Build settings -> Swift Compiler — Code Generation -> Optimization Level, lúc này bạn có ba lựa chọn:
* No Optimization
* Optimization for Speed
* Optimization for Size
![](https://images.viblo.asia/ab040485-0fd0-45ce-98bb-549a1f97d03c.png)
Thường thì bạn nên chọn `Optimization for Speed` cho các bản release, `Optimization for Size` cho quá trình debug nhưng tất nhiên nó phụ thuộc yêu cầu project của bạn.

## 2. Sử dụng `Final` và `Private` cho các phương thức, lớp
Một trong những điều mà Swift Optimization Level xử lý là trực tiếp hoặc gián tiếp gọi đến các phương thức. Như bạn có thể biết, Swift là một ngôn ngữ hướng đối tượng, có nghĩa là bạn có thể subclass và override các phương thức để mở rộng chức năng. Để làm được điều này, Swift sử dụng Dynamic Dispatch.
Dynamic Dispatch là thuật toán quyết định phương thức nào sẽ được gọi bất cứ khi nào một thông điệp được gửi đến một đối tượng. Nó sử dụng một "vTable" (Virtual Table).
Bất cứ khi nào một đối tượng được yêu cầu trả về địa chỉ phương thức, nó sẽ tìm kiếm trong virtual table để lấy ra địa chỉ của nó. Đây không phải là một hành động rõ ràng, nó cần tìm kiếm một lớp con và xem liệu phương thức này có bị ghi đè không và trả về phương thức này thay thế. Phương thức này cũng có thể bị ghi đè bởi một lớp con khác, vì vậy nó cần phải thực hiện lại nhiều lần cho đến khi nó chạm đáy. Để giúp Swift tối ưu hóa nhiệm vụ tốn hiệu năng này, bạn có thể thêm thuộc tính `final` vào đầu phương thức, biến hoặc thậm chí là cả lớp.
```
class MethodAccess: NSObject {
    final func finalFunction(x: Int) -> Int {
        return x + 1
    }
    
    func notFinalFunction(x: Int) -> Int {
        return x + 1
    }
}


class PerformanceTuningTests: XCTestCase {
    func testFinalFunction() {  // this test runs 30% faster than "testNotFinalFunction"
        let methodAccess = MethodAccess()
        self.measure {
            for _ in 0...100000000 {
                _ = methodAccess.finalFunction(x: 100)
            }
        }
    }
    
    func testNotFinalFunction() {
        let methodAccess = MethodAccess()
        self.measure {
            for _ in 0...100000000 {
                _ = methodAccess.notFinalFunction(x: 100)
            }
        }
    }
}
```
Khi bạn tối ưu hóa code của mình trong Build settings, thuộc tính `final` sẽ đảm bảo lệnh gọi phương thức trực tiếp mà không cần tìm đến lớp con.

## 3. Tránh “Print” trong các bản Release
`print` hỗ trợ rất tốt cho quá trình debug nhưng các nhà phát triển đôi khi có thói quen xấu là để các lệnh `print` trôi nổi trong code. Vì các lệnh `print` được ghi vào bảng điều khiển và sử dụng bộ nhớ, nên nó có vẻ là một hành động gây ảnh hưởng hiệu năng. Hãy xem:

```
class PerformanceTuningTests: XCTestCase {
    func testWithPrint() { // this test runs 1600 times slower!
        let methodAccess = MethodAccess()
        self.measure {
            for _ in 0...100000 {
                _ = methodAccess.returnValue(x: 100, withPrint: true)
            }
        }
    }
    
    func testWithOutPrint() {
        let methodAccess = MethodAccess()
        self.measure {
            for _ in 0...100000 {
                _ = methodAccess.returnValue(x: 100, withPrint: false)
            }
        }
    }
}
```
Test với `print` đã chạy chậm hơn 1600 lần!
Lời khuyên là đừng bao giờ gọi trực tiếp đến `print`, nhưng hãy gói nó với một số lớp và bên trong lớp đó thêm MACRO để bạn không bao giờ quên những lệnh `print` đó nữa!
```
    func printToConsole(message : String) {
        #if DEBUG
            print(message)
        #endif
    }
```

## 4. “Inline” Code
Sẽ rất tốt khi tạo ra các chức năng nhỏ, với mỗi chức năng dành riêng cho một nhiệm vụ. Nhưng việc tách mã của bạn thành các hàm nhỏ cũng đi kèm với việc giảm hiệu năng, bạn thêm một chức năng khác vào stack và bạn đã buộc Swift sử dụng vTable để tự động gọi các function. Khi bạn muốn siết chặt mã của mình để có hiệu năng cao hơn, bạn có thể gộp chúng lại, phương thức của bạn sẽ nhanh hơn. Tuy nhiên, nó lại phải đánh đổi giữa clean code và hiệu năng. (Mình không ủng hộ cách này)

## 5. Xử lý mảng
Rất nhiều cách tối ưu hóa hiệu suất chủ yếu có liên quan khi xử lý nhiều lần lặp, hay nói cách khác là mảng.
Nếu bạn biết cách một mảng được xây dựng và bạn nhận thức được sự đánh đổi, bạn có thể thực hiện tối ưu code của mình.
Dưới đây là một số ví dụ để tối ưu hóa code với các mảng:
### Sử dụng “withUnsafeBufferPointer” khi lặp mảng
Khi làm việc với các đối tượng Swift nói chung, đôi khi chúng ta quên mất các vấn đề về bộ nhớ hoặc an toàn vì Swift đang xử lý mọi thứ cho chúng ta. Điều này đi kèm với chi phí cho hiệu suất. Nếu bạn muốn đánh đổi sự an toàn để thực hiện, bạn có thể sử dụng phương thức `withUnsafeBufferPointer` để lấy mảng các con trỏ cho các phần tử mảng.
```
    func unsafeArray() {
        let arr = ["a","c","b"]
        var x = 0
        arr.withUnsafeBufferPointer { unsafedArray -> () in
            for i in unsafedArray {
                x += i.count
            }
        }
    }
```
Nhưng bạn nên cẩn thận vì một lý do nào đó, các elements bị giải phóng, app của bạn sẽ crash.

## 6. ContiguousArray
Đây là một kiểu mảng ít quen thuộc, nhưng nó có ích khi bạn biết cách tận dụng nó.
Nói chung, Array giữ các đối tượng của chúng trong các khối bộ nhớ - không nhất thiết phải liền kề nhau. Điều này có nghĩa là bất cứ khi nào bạn thêm một element mới vào mảng, nó chỉ tìm thấy một block ngẫu nhiên, cấp phát nó và thêm nó vào mảng. Điều này rất tốt cho hiệu năng khi append, nhưng nó kém hiệu quả hơn cho việc loop. Vì vậy, nếu đây là một mảng lớn mà bạn biết bạn sẽ loop, thì ContiguousArray có thể là một giải pháp.
ContiguousArray đảm bảo tất cả các mục trong mảng tiếp giáp với nhau. Điều này rất hữu ích trong việc tìm kiếm các yếu tố tiếp theo. Nhưng, như thường lệ, chúng ta đang phải đánh đổi. Sử dụng ContiguousArray trên thực tế, chúng ta đang thêm các ràng buộc cho việc quản lý mảng và các hành động đơn giản như insert hoặc append có thể nặng hơn. Chúng ta hiện đang buộc tất cả các element của nó phải liền kề nhau, vì vậy nó phụ thuộc vào trường hợp sử dụng của bạn.

## 7. Sử dụng Values (Structs) và Not References (Classes) trong Array
Đây là một mẹo khá hay. Bạn biết rằng Array có thể liên kết với NSArray. NSArray chỉ có thể chứa các đối tượng và Array có thể chứa cả các đối tượng (tham chiếu) và các giá trị.
Khi một Array trong Swift chứa các tham chiếu, nó sẽ tự động lấy các thuộc tính của NSArray và do đó không thể được tối ưu hóa. Nhưng, nếu bạn chỉ giữ các giá trị như Int hoặc Struct trong mảng, nó có thể dễ dàng được tối ưu hóa bởi trình biên dịch.
Nếu bạn phải chọn giữa một Struct và một Class, đây là một lợi thế lớn của các Struct - việc giữ các Struct trong một mảng sẽ hiệu quả hơn nhiều so với việc giữ các Class.
```
class PerformanceTuningTests: XCTestCase {

    func testInsertingValuesIntoArray() { // this test runs 4 times faster than "testInsertingObjectsIntoArray"
        let methodAccess = MethodAccess()
        self.measure {
            methodAccess.valuesInArray()
        }
    }
    
    func testInsertingObjectsIntoArray() {
        let methodAccess = MethodAccess()
        self.measure {
            methodAccess.objectsInArray()
        }
    }
}

struct PhonebookEntry {
    var name : String
    var number : [Int]
}

class PhonebookEntryClass {
    var name : String
    var number : [Int]
    
    init(name : String, number : [Int]) {
        self.name = name
        self.number = number
    }
}

class MethodAccess: NSObject {

    func valuesInArray() {
        var a = [PhonebookEntry]()
        
        for _ in 1...1000000 {
            let entry = PhonebookEntry(name: "a", number: [1])
            a.append(entry)
        }
    }
    
    func objectsInArray() {
        var a = [PhonebookEntryClass]()

        for _ in 1...1000000 {
            let entry = PhonebookEntryClass(name: "a", number: [1])
            a.append(entry)
        }
    }
}
```

## 8. Sử dụng Linked List thay vì Array
Arrays rất đơn giản để sử dụng, nhưng trong một số trường hợp, danh sách liên kết có thể hiệu quả hơn. Vì các danh sách liên kết chỉ là các mục trỏ đến nhau, nên việc chèn một mục vào giữa danh sách rất dễ dàng - chỉ cần kết nối các con trỏ đúng cách. Trong Arrays, nó có thể tốn tài nguyên hơn. Vì vậy, bất cứ khi nào bạn cần thay thế vị trí element, append,... danh sách liên kết sẽ rất nhanh chóng. Mặt khác, Arrays vượt trội hơn các danh sách được liên kết khi bạn phải sắp xếp hoặc thực hiện loop.

## 9. Giới hạn Protocols for Class
Nếu bạn biết rằng `protocol` bạn định nghĩa chỉ dành cho các `class`, hãy đánh dấu nó là class protocol. Khi trình biên dịch biết giao thức chỉ dành cho các lớp, nó có thể tối ưu hóa ARC (Đếm tham chiếu tự động) làm cho code của bạn chạy nhanh hơn.
```
protocol Readable: class {
    
}
```

# TỔNG KẾT
Như đã nói lúc đầu, nhiều vấn đề về hiệu suất có thể được giải quyết bằng các kỹ thuật kiến trúc ứng dụng khác nhau, bộ nhớ đệm hoặc bất kỳ phương pháp thuật toán nào khác.
Nhưng sẽ luôn luôn tốt nếu biết cách siết chặt Swift engine của bạn để có tốc độ tối đa.

Nguồn: https://medium.com/better-programming/9-ways-to-boost-your-swift-code-performance-56e0986dd9ec