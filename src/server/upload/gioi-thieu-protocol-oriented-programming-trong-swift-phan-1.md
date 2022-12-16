Bạn đã bao giờ nghe nói về Object-Oriented Programming? Mình đoán là rồi vì nó cực kì phổ biến ngày nay

![](https://images.viblo.asia/f98e9257-d0a2-49cc-a9f6-43541a1dff47.jpeg)

Nhưng còn Protocol-Oriented Programming thì sao?

![](https://images.viblo.asia/7de064c9-6af7-48d0-b0a6-4e311b6848b7.jpeg)

Protocol-Oriented Programming (POP) được giới thiệu lần đầu bởi Apple tại sự kiện WWDC 2015 với Swift 2.0, và họ gọi Swift là POP,  chứ không phải là OOP như những ngôn ngữ phổ biến khác như: Java, Python, C#,…

Bạn có thể sẽ tự hỏi: POP là cái quái gì vậy ?

# 1. POP là gì
Nếu bạn đã làm quen với OOP rồi thì khi so sánh với POP, bạn sẽ thấy nhiều điểm tương đồng. Hãy nghĩ một chút về OOP, khi bạn giải quyết vấn đề bằng OOP, bạn sẽ suy nghĩ hướng giải quyết bài toán thông qua các Class và Object (instance của Class). Với POP, bạn thay vì suy nghĩ dưới góc độ của Class, bạn sẽ chuyển sang tập trung vào các Protocol ( lý do sẽ được giải thích sau). Xu hướng lập trình Swift hiện đại là cố gắng sử dụng POP kết hợp với Struct, thay vì sử dụng Class. Protocol linh hoạt hơn Class; instance của Struct được cấp phát trên Stack, còn instance của Class được cấp phát trên Heap nên phương pháp này thực thi tốt hơn. Apple tại WWDC đã nói một câu rất hay như sau:

“THINK ABOUT PROTOCOL FIRST”

–> POP là phương pháp lập trình thiết kế và làm việc ưu tiên với các Protocol, thay vì Class như OOP.

## 2. Ví dụ về POP

Bời vì POP được kế thừa từ OOP nên POP có rất nhiều ưu diểm vượt trội hơn OOP. Ngày nay, trong Swift, Mình thấy rất nhiều người ưa thích sử dụng Struct kết hợp Protocol (Thường được sử dụng trong POP) thay vì sử dụng class (OOP). Mọi thứ Class có thể làm, Struct cũng có thể. Struct dựa trên Value Type thay vì Reference Type như Class -> Chúng ta không cần phải lo nghĩ nhiều tới việc Memory Leak, deadlock (multithread), implicit sharing data...

Bây giờ chúng ta sẽ đi tới ví dụ cụ thể

Giả sử chúng ta có class là Bird, Bird có 2 thuộc tính: name và feather.

```

class Bird {
    
    var name:String
    var feathers:String
    
    func fly(){
        //TODO: nothing
    }
    
    init(name:String, feathers:String){
        self.name = name
        self.feathers = feathers
    }
    
}
```

Tiếp theo, Chúng ta có 2 subclass của Bird, là Parrot và Eagle.

```
class Parrot:Bird {
    
    override init(name: String, feathers: String) {
        super.init(name: name, feathers: feathers)
    }
    
    override func fly() {
        //TODO: nothing
    }
}

class Eagle:Bird{
    
    override init(name: String, feathers: String) {
        super.init(name: name, feathers: feathers)
    }

    override func fly() {
        //TODO: nothing
    }
}
```

Và giờ mình muốn theo Penguin. Oops...

```
class Penguin:Bird { 
    
    //Oops, i do not have feather
    override init(name: String, feathers: String) {
        super.init(name: name, feathers: feathers)
    }

    // i'm too fatty, how can i fly :(
    override func fly() {
    }
}
```

Penguin là chim, nhưng nó không hề có lông và không thể bay :(

![](https://images.viblo.asia/9292b0c5-da71-4f1f-bc4d-69490647a67d.jpeg)

Vậy giờ phải sửa thế nào? Trong OOP chúng ta sẽ làm cách sau:

Chia tách ra thành 2 class khác nhau : Bird và Penguin Class → Oops, ý tưởng tồi.
Tạo 1 protocol Flyable  → Chúng ta sẽ phải viết lại khá nhiều code
Đổi thành  static func fly() → Sẽ thế nào nếu ta có 10 - 100 subclass???

### 3. Welcome to POP:

Chúng ta có thể thiết kế lại base code, thay đổi từ Class sang Protocol và Struct để giải quyết vấn đề này.

```
protocol Bird {
    var name:String? {get set}
}

protocol Flyable {
    func fly()
}
extension Flyable {
    func fly() {
        print("I believe i can fly")
    }
}

protocol Featherable {
    var feather:String?{get set}
}
extension Featherable {
    var feather:String? {
        get {
            return "I have feather"
        }
        set{
            
        }
    }
}
```

Với Extension, chúng ta không cần viết lại quá nhiều code, chỉ cần sửa hoặc trong một vài hành vi đặc biệt của việc bay 

```
struct Parrot:Bird,Flyable,Featherable{
    var name: String?
    
    init(name: String){
        self.name = name
    }
}

struct Eagle:Bird,Flyable,Featherable {
    var name: String?
    
    init(name:String){
        self.name = name
    }
}

struct Penguin:Bird{
    var name: String?
    
    init(name:String){
        self.name = name
    }
}
```

Như bạn có thể thấy, Penguin không cần phải implement Flyable và Featherable và không phá vỡ thiết kế và cấu trúc. 

![](https://images.viblo.asia/7f0c1476-9474-4811-a0f8-b9d4b1f210d9.jpeg)

Bây giờ bạn có thể thêm loài mới như Ostrich(Không thể bay nhưng có lông) ) :D

# 4. Kết luận
Với ví dụ này, mình hi vọng bạn sẽ có cái nhìn tốt về Protocol-Oriented Programming. Hiển nhiên, POP chỉ là khái niệm, bạn có thể áp dụng nếu bạn muôn hoặc không nhất thiết phải dùng, tuỳ thuộc vào quyết định và vấn đề của bạn.

![](https://images.viblo.asia/4d0751ae-ab7a-4d78-a482-82197f5026bb.jpeg)

Nguồn: https://medium.com/@starptit/an-example-of-protocol-oriented-programming-in-swift-4c87804d4bd9