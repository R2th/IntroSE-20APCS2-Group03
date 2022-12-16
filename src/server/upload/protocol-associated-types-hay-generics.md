Chắc hẳn trong các dự án, chúng ta đã từng gặp rất nhiều đoạn code có dùng đến Protocol associated types (PAT) và Generics. Cả hai đều được sử dụng để tránh việc trùng lặp code bằng cách đặt tên 1 kiểu dữ liệu đại diện cho các kiểu dữ liệu khác. Ở bài viết này, chúng ta sẽ cùng tìm hiểu xem chúng có những gì khác biệt nhau.

## 1. Protocol associated types
```
protocol PlayerDescriptorProtocol {
    func describeSpeciality()
}
```
Đầu tiên chúng ta có 1 protocol là `PlayerDescriptorProtocol` với 1 function `describeSpeciality()`. Như chúng ta đã biết thì khi 1 class, struct, ... conform protocol này thì chúng sẽ phải định nghĩa cho function `describeSpeciality()` 1 cách rõ ràng về đặc điểm của 1 player. Câu hỏi được đặt ra là các loại `Player` nào sẽ conform protocol này? FootballPlayer hay BaksetBallPlayer? Tất nhiên mỗi loại Player sẽ có những đặc điểm khác nhau.
Chúng ta sẽ sử dụng `associatedtype` để làm protocol trở nên rõ ràng hơn
```
protocol PlayerDescriptorProtocol {
    associatedtype PlayerType
    func describeSpeciality(of type:PlayerType)
}
```

Bây giờ thử tạo 1 loại `Player`

```
struct FootballPlayer {
    var name: String
    var age: Int
    var speciality: String
    
    init(name: String, age: Int, speciality: String) {
        self.name = name
        self.age = age
        self.speciality = speciality
    }
}

let hung = FootballPlayer(
    name: "Hung",
    age: 23,
    speciality: "Cao"
)
```

Sau đó tạo 1 struct conform theo protocol
```
struct FootballPlayerDescriptor: PlayerDescriptorProtocol {
    typealias PlayerType = FootballPlayer
    
    func describeSpeciality(of type: PlayerType) {
        print("\(type.speciality)")
    }
}

var footballDescriptor = FootballPlayerDescriptor()
footballDescriptor.describeSpeciality(of: hung)
```

Tất nhiên, kết quả nhận được là: `Cao`

## 2. Điều gì đã xảy ra?
Sẽ không có gì đáng nói trừ khi bạn thực sự quan tâm đến performance  của ứng dụng. Bạn nghĩ rằng trình biên dịch sẽ suy ra được type của associatedtype hoặc generic khi nào?

### Dynamic dispatch
Đối với PAT, trình biên dịch sẽ phải suy ra type trong thời gian runtime bằng cách sử dụng dynamic dispatch. Vậy dynamic dispatch là cái gì? Nói 1 cách đơn giản thì nó sẽ dừng 1 cái gì đó trong khi runtime và đưa ra quyết định thay vì làm điều này ở compile time. Dynamic dispatch thực sự cần thiết đối với các loại đa hình, khi trình biên dịch chưa biết type nào được sử dụng trong lúc compile.

### Static dispatch
Static dispatch thì tất nhiên sẽ ngược lại với dynamic dispatch. Lúc này trình biên dịch đã biết rõ được type nào được sử dụng ngay tại compile time.

### Static dispatch nhanh hơn?
Nếu so sánh với nhau thì là có. Tuy nhiên nó có tốt hơn dynamic dispatch không? Bạn cần hiểu rằng 2 cái sẽ thực hiện những nhiệm vụ khác nhau và trình biên dịch được thiết kế để khiến chúng làm việc 1 cách hiệu quả. 

## 3. Generics và Static Dispatch
Thử viết lại code sử dụng Generics thay vì PAT

```
protocol PlayerDescriptorProtocol {
    func describeSpeciality()
}

struct FootballPlayer : PlayerDescriptorProtocol {
    var name: String
    var age: Int
    var speciality: String
    
    init(name: String, age: Int, speciality: String) {
        self.name = name
        self.age = age
        self.speciality = speciality
    }

    func describeSpeciality() {
        print(speciality)
    }
}

let hung = FootballPlayer(
    name: "Hung",
    age: 23,
    speciality: "Cao"
)

// generic method
func describePlayer<PlayerType: PlayerDescriptorProtocol>(of type: PlayerType) {
    type.describeSpeciality()
}
```

Sau đó test
`describePlayer(of: hung)`
Kết quả tất nhiên vẫn vậy. 

## 4. Kết luận
Cả 2 đều có mục đích như nhau nhưng chúng ta sẽ chọn cái nào?
* Tuy Generics sẽ nhanh hơn vì nó sử dụng static dispatch, nhưng nó sẽ khiến memory nặng hơn so với PAT. Bởi vì với mỗi type, trình biên dịch sẽ đẩy 1 function vào stack trong khi với PAT, dynamic dispatch chỉ tạo các function khi nào cần thiết.
* Nếu bạn không muốn những lớp `Player` conform protocol nhưng vẫn muốn giữ những định nghĩa riêng cho từng lớp `Descriptor` thì bạn phải viết thêm code.

Vậy nên hãy tự lựa chọn chúng tùy theo bạn muốn app của mình như thế nào. Nếu bạn không ngại việc hi sinh 1 chút memory để đổi lấy performance tăng 1 chút thì hãy chọn Generics. Ngược lại, hãy chọn PAT. Điều này tương tự việc bạn chọn giữa `struct` và `class` vậy :D

Nguồn: https://medium.com/better-programming/swift-pat-or-generics-f2f01d788de9