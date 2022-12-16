### Thuật ngữ
`keypath`: Read-only access tới các thuộc tính.

`writablekeypath`: read-write access đến các thuộc tính kiểu giá trị.

`referencewriteablekeypath`: read-write access đến thuộc tính kiểu tham chiếu.
### Keypath là gì?
Một `keypath` cung cấp cách thức truy cập `read-only` đến một thuộc tính, trong khi một `writable` `keypath` thì cung cấp cách thức truy cập `writable` đến một thuộc tính.<br>
Ví dụ:<br>
Có lẽ cách tốt nhất để mô tả cách truy cập `keypath` này là thông qua một ví dụ, ở đây chúng ta có một đối tượng kiểu `struct`:
```
struct Person {
    var firstname: String
    var secondname: String
    var age: Int
}
let dave = Person(firstname: "Dave", secondname: "Trencher" , age: 21)
```
Sau đó chúng ta có thể tiếp cận các thuộc tính này thông qua `WritableKeyPath<Person, String>` hoặc `WritableKeyPath<Person, Int>` ( Trong đó firstname và secondname là kiểu `String` và age là kiểu `Int`).

Kết quả ta có là :
```
let firstname: String = dave[keyPath: \Person.firstname]
print (firstname) // Dave
```

Với truy cập WritableKeyPath chúng ta có lưu trữ được các thuộc tính như sau:

```
var writableKeyPathFirstName: WritableKeyPath<Person, String> = \Person.firstname
print (dave[keyPath: writableKeyPathFirstName]) // Dave
```

Có nghĩa là chúng ta có tiềm năng sử dụng cùng một thuộc tính ở nhiều nơi khác nhau và lưu trữ chúng như chính một thuộc tính.

### Thuộc tính lòng nhau
Sau đây là một ví dụ của những keypaths được lòng vào nhau

```
struct Socks {
    var sockname: String
}

struct DrawContents {
    var name: String
    var socks: Socks
}

let topdrawer = DrawContents(name: "top", socks: Socks(sockname: "Birthday Socks"))
print (topdrawer)
print (topdrawer[keyPath: \DrawContents.name]) // top
print (topdrawer[keyPath: \DrawContents.socks.sockname]) // Birthday Socks
```

### Thành phần của keypath
Swift cho phép chúng ta linh động phối hợp các keypaths lại tại runtime
```
let topdrawerkpath = \DrawContents.socks
let sockspath = \Socks.sockname
let composedPath: WritableKeyPath<DrawContents, String> = topdrawerkpath.appending(path: sockspath)
```

Keypath như kiểu biến có thể xoá
Chúng ta có thể sử dụng một keypath trên một kiểu tham chiếu ( ví dụ như class)

```
let horse = Animal(name: "Keith")
var refKeyPath: ReferenceWritableKeyPath<Animal, String> = \Animal.name
let animalname: String = horse[keyPath: \Animal.name] // Keith
```

### Giới hạn của keypath

Key path không thể tham chiếu đến thành viên tĩnh 'lifeform'

Nếu chúng ta thay đổi Person để có một biến tĩnh.
```
struct Person {
    static var lifeform = "Carbon"
    var firstname: String
    var secondname: String
    var age: Int
}

dave[keyPath: \Person.lifeform] // Key path cannot refer to static member 'lifeform'
```

### Và..
Nếu chúng ta muốn sử dụng KVO thì sao? Chúng ta sẽ cần phải gọi một keypath khi sử dụng hàm `func observe<Value>(_ keyPath: KeyPath<ViewController, Value>, options: NSKeyValueObservingOptions = [], changeHandler: @escaping (ViewController, NSKeyValueObservedChange<Value>) -> Void) -> NSKeyValueObservation` như sau:
```
observation = observe(
    \.objectToObserve!.myDate,
    options: [.old, .new]
) { object, change in
    print("myDate changed from: \(change.oldValue!), updated to: \(change.newValue!)")
}
```

### Kết luận

Keypaths thật sự rất hữu dụng trong lập trình iOS cũng như liên quan đến Combine và SwiftUI  cũng như KVO.<br>
Mình hi vọng bài viết ngắn này đã chúng chúng ta trở nên quen thuộc với tính năng này trong Swift.


reference: https://stevenpcurtis.medium.com/what-are-swifts-keypaths-e8c829bc97d3