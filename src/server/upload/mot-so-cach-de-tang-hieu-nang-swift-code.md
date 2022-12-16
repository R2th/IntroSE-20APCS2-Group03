Swift cơ bản đã nhanh rồi và các thiết bị iOS cũng rất là nhanh, nên những tips dưới đây có thể không cần thiết. Nhưng cũng không phải là không cần thiết, vì có thể chúng ta sẽ phải đương đầu với những device chậm hay những số lớn, ... 

## Set Optimization Level in Build Settings
Điều đầu tiên bạn cần tối ưu đó chính là để Xcode tự tối ưu chính nó. Hãy tới mục build settings, và tìm đến mục “Swift Compiler — Code Generation”, phần “Optimization Level” sẽ có 3 lựa chọn cho bạn:
* No Optimization
* Optimization for Speed
* Optimization for Size

Cái tên đã nói lên rất rõ rồi, các bạn có thể setting “Optimization for Speed” cho bản release để tăng trải nghiệm của người dùng hay để “Optimization for Size” cho chế độ debug để việc build có thể nhanh hơn, tốn ít thời gian phát triển hơn. Tất nhiên việc setting này còn tuỳ vào project của bạn cần gì nữa.

## Use “Final” and “Private” for Methods and Classes
Swift đã hỗ trợ rất nhiều về Protocol Oriented thay vì Object-Oriented, điều này có nghĩa là code của chúng ta không nên sử dụng quá nhiều kế thừa không cần thiết. Khi gọi một function chưa phải là final, hãy nhớ rằng nó sẽ luôn tìm kiếm xem có subclass nào không, hay nó có bị override bởi một subclass nào không, lặp lại cho tới khi tới được cuối cùng. Vì vậy nếu phương thức của bạn đã là final, hay class đó không còn có thể kế thừa nữa, việc đặt "final" sẽ giúp giảm công việc của compiler đi đó.
```
class MethodAccess: NSObject {

    final func finalFunction(x : Int)->Int {
        return x + 1
    }
    
    func notFinalFunction(x : Int)->Int {
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
Khi bạn chọn optimize swift code của bạn ở trong build settings, thì những thuộc tính "final" sẽ đảm bảo được gọi một cách trực tiếp mà không cần tìm kiếm các implemention của các subclass.

## Avoid "Print" in Release Builds
Việc in ra console giúp ích được rất nhiều cho việc debugging, nhưng việc để lại chúng ở bản release là một thói quen xấu. Việc để lại những dòng code `print` như vậy sẽ tốn kém. Bởi vì là một tác vụ I/O nên nó tốn nhiều thời gian và làm chậm đi rất là nhiều. Ví dụ dưới test giữa việc sử dụng print và không sử dụng.

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
Cách để optimize code ở đây chính là nên sử dụng một final class giúp thực hiện việc print này thay vì sử dụng trực tiếp function `print`. Trong hàm print của custom class này, hãy phân biệt giữa môi trường `Debug` và `Release`, làm như vậy thì bạn cũng không phải sợ rằng mình có quên mất không xoá bỏ print ở đâu đó khi release.
```
func printToConsole(message : String) {
     #if DEBUG
       print(message)
     #endif
}
```

## “Inline” Your Code
Việc viết tách biết các function thành các function nhỏ, mỗi function thực thi một tác vụ cụ thể là tốt. Nhưng điều này cũng khiến performance giảm đi, việc gọi các funtion trong function sẽ tốn hơn là việc thực hiện compile từ đầu đến cuối. Tuy nhiên việc hết code trong một function thì không hề tốt chút nào, vừa khiến việc tái sử dụng code kém, hay vi phạm nguyên tắc SOLID - một function thực hiện quá nhiều việc. Vì vậy hãy cân nhắc việc này, đừng nên đánh đổi một chút performance này mà phá vỡ các nguyên tắc, convention, ...

## Use Values (Structs) and Not References (Classes) in Array
Có thể bạn đã biết rằng NSArray thì chỉ lưu giữ đối tượng, còn Array thì lưu giữ cả đối tượng (references) và kiểu giá trị (values). Khi một mảng giá trị có chứa reference, nó tự động get các properties của NSArray, điều này khiến khó có thể optimized được. Nhưng nếu mảng đó chỉ chứa các giá trị kiểu giá trị như `Int` hay `Struct` thì việc optimized lại dễ dàng hơn rất nhiều cho compiler. Việc lưu trữ `Struct` trong mảng lợi thế và hiệu quả hơn `Class` rất nhiều.
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
Ở ví dụ trên, việc lấp đầy mảng bởi struct cho ra kết quả nhanh hơn 4 lần.

## Limit Protocols to Class Only if Possible.
Nếu bạn biết rằng protocol này chỉ sử dụng cho class, hãy define nó với `class`. Việc này giúp trình biên dịch biết rằng protocol này chỉ dùng cho class và giúp ARC (Automatic Reference Counting)  run code của bạn nhanh hơn.
```
protocol Person : class {
    
}
```

Trên đây là một số tips nhỏ giúp code Swift của bạn chạy nhanh và hiệu quả hơn. Bài viết được tham khảo từ nguồn: [9 Ways to boost your Swift code performance](https://medium.com/better-programming/9-ways-to-boost-your-swift-code-performance-56e0986dd9ec)