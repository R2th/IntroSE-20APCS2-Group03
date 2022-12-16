## 1. Copy-on-Write là gì?
Copy-on-Write là một điều đầy ma thuật đằng sau value type. Bắt đầu chúng ta sẽ xem qua ví dụ sau:
```
var x = ["a", "b", "c"]
let y = x
x.append("d")
print(x) //["a", "b", "c", "d"]
print(y) //["a", "b", "c"]
```

Như các bạn đã biết collection như Array là loại value type. Điều đó có nghĩa là không giống với reference type thì lưu trữ dạng object còn value type lưu trữ dạng các bản copy.
Như trong ví dụ trên, `y` nhận được một bản copy của `x`.

Mỗi lần bạn tạo 1 biến value type thì một bản copy sẽ được tạo ra, nghe có vẻ sẽ tốn bộ nhớ nhưng làm thế nào Swift tối ưu nó?

Và câu trả lời chính là Copy-on-Write đã giúp Swift xử lý vấn đề đó. 
Phía sau đó cả hai mảng này đều trỏ đến một vùng nhớ lưu trữ giá trị của mảng. Như ví dụ trên, tại thời điểm nay  cả x và y cùng trỏ tới 1 vùng nhớ.
```swift
//Memory location of x and y before appending to x:
//This code is from this SO answer:
// https://stackoverflow.com/a/45777692/10706839
struct MemoryAddress<T>: CustomStringConvertible {
    let intValue: Int
    var description: String {
        let length = 2 + 2 * MemoryLayout<UnsafeRawPointer>.size
        return String(format: "%0\(length)p", intValue)
    }
    // for structures
    init(of structPointer: UnsafePointer<T>) {
        intValue = Int(bitPattern: structPointer)
    }
}
print(MemoryAddress(of: x)) // 0x00007fb0254100b0
print(MemoryAddress(of: y)) // 0x00007fb0254100b0
```

Khi x bị thay đổi đầu tiên n sẽ kiểm tra xem vùng nhớ đó có phải mình nó đang chiém giữ hay không, nếu có thì bạn có thể yên tâm, nó sẽ được thay đổi một cách an toàn. Còn nếu bộ nhớ có biến khác cùng giữ thì nó sẽ được copy ra vùng
nhớ khác và thay đổi.

```
//Memory address of x and y after appending to x:
print(MemoryAddress(of: x)) // 0x00007fb027b93740
print(MemoryAddress(of: y)) // 0x00007fb0254100b0
```

Như bạn có thể thấy nhờ có Copy-on-Write chúng ta có thể tối ưu về bộ nhớ, nó chỉ copy khi cần thiết.

## 2. Hành động của Copy-on-Write.
Copy-on-Write được tivhs hợp với tất cả các loại Collection trong Swift, nhưng nếu bạn muốn xây dựng cấu trúc riêng của bạn có thể biến đổi và duy tri giá trị của nó thì bạn cần tự thực hiện như phần sau đây của bài viết.
Nói một cách đơn giản là chúng ta sẽ sao chép giá trị mỗi khi chúng ta thay đổi nó. Chúng ta sẽ thực hiện được mong muốn nhưng sẽ gây tốn bộ nhớ.
Ví dự như nếu bạn thực hiện thay đổi biến trong vòng lặp `for` mà không chia sẻ bộ nhớ với bất kì biến nào thì chúng ta sẽ kết thúc với việc hàng loạt các bản sao được tạo ra dư thừa.

Điều kì diệu là key được biết success của Copy-on-Write là `isKnownUniquelyReferenced(_:)`.
Ban sẽ truyền vào một instance của class và hàm sẽ trả về kết quả dạng bool để chỉ ra liệu class đó chỉ có một strong reference. 

Đầu tiên bạn cần tạo một class Persion như sau 
```swift
final class Person {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

Chúng ta sẽ goi class này vào trong Struct để thực hiện hành vi của Copy-on-Write
``` swift
struct PersonCOW {
    private var person: Person
    init(name: String) {
        person = Person(name: name)
    }
    var name: String {
    get {return person.name}
    set {
        if !isKnownUniquelyReferenced(&person) {
            person = Person(name: newValue)
            print("Making a copy")
            return
        }
        person.name = newValue
   }
}
}
```

Trong struct này có một thuộc tính tính toán là name. Điều bất ngờ sẽ xảy ra ở hàm setter. Đầu tiên chúng ta sử dụng `isKnownUniquelyReferenced` xem có biến nào trỏ vào cùng vùng nhớ hay không.

Nếu có thì chúng ta sẽ gán nó với một đối tượng Person mới và in dòng thông báo, nếu không chúng ta sẽ trả về giá trị name của đối tượng person.

Hãy chạy code demo:
```swift

var person1 = PersonCOW(name: "John")
var person2 = person1
let names = ["Brian", "Stewie", "Peter", "Quagmire"]
for name in names {
    person1.name = name
}
```

Dùng vào lặp `for` để thay đổi persion1 và xem kết quả. Chỉ có 1 lần dòng thông báo được in ra trong lần thay đổi đầu tiên.

## 3.Tổng kết.
* Trong bài viết chúng ta sẽ hiểu được Copy-on-Write là gì và tác dụng cũng như cách sử dụng nó.
* Copy-on-Write làm việc với value type bằng cách kiểm tra xem liệu có cần copy hay không. Kiến thức về nó hi vọng sẽ giúp cho code của bạn tốt hơn. 
* Nguồn tham khảo: https://medium.com/better-programming/understand-copy-on-write-in-swift-5-52a4716165a3