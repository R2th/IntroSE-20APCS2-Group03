# Giới thiệu
Đối với lập trình viên chúng ta đã quen thuộc với lập trình hướng đối tượng (Object Oriented Programing). OOP từ lâu được xem như là một trong những bài học vỡ lòng, bắt buộc đối với mỗi người. Khi Apple giới thiệu Swift 2 trong sự kiện WWDC năm 2015, họ tạo ra một phong cách lập trình mới gọi là Protocol-Objected Programming. Nó tạo thành một thành một trào lưu mới đối với cộng đồng iOS deveploer. Trong bài viết này mình sẽ giới thiệu các bạn sức mạnh vi diệu từ phong cách này để làm sao cho code trở nên "bén" hơn.

# Protocol là gì:
Trong lập trình ngôn ngữ hướng đối tượng, chắc hẵn chúng ta đã đều biết đến interface, protocol trong Swift cũng có thể hiểu tương tự như interface. Protocol xem như một bản hợp đồng mà trong đó chứa các điều khoản (thuộc tính, phương thức) mà các thực thể bắt buộc phải tuân thủ khi làm việc với nó.

Trước khi tìm hiểu về Protocol-Oriented programming, chúng ta cần nắm rõ được các thuộc tính và khả năng vi diệu của nó

# Cú pháp
## Khai báo

Tương tự như interface cú pháp khai báo một protocol như sau
```
Protocol  People {
    let name: String { get }
    let old: Int { get set }
    
    func gotoSchool()
}
```

Trong đó: 
- name, và old: là các thuộc tính.
- gotoScholl() : là các phương thức của protocol

Protocol được xem như là một bản phác thảo cho các đối tượng tuân theo vì vậy trong protocol chúng ta chỉ khái báo các thuộc tính, và func mà không khởi tạo giá trị mặc định cũng như implement các phương thức mà cách implement phụ thuộc vào các phần tử thừa kế nó.

## Optional definition

Như đã nói ở trên, protocol bắt buộc việc kế thừa các thuộc tính và phương thức của nó. Tuy nhiên trong một số trường hợp nó vẫn cho phép optional implement. Để làm điều này chúng ta phải thêm thuộc từ khoá @objc vào trước khai báo của protocol

```
@objc protocol  People {
        let name: String { get }
        let old: Int { get set }
     
      @objc optional let address: String { get set }

      @objc optional func sendMessage()
       
        func gotoSchool()
}

class Student {
    let name: String
    let old: Int
    
    func gotoScool() {
    // go to school
    }
}
```

Trong ví dụ trên bằng việc sử dụng optional class Student ko cần phải implement phương thức gotoSchool và address

Tuy nhiên, optional requirement chỉ được phép đối với class. Optional requirement không thể thực hiện đối với các khai báo kiểu value type như struc, enum.

## Inheritance

 Tuơng tự như class, protocol cũng có thể cho phép một protocol khác kế thừa
 
 ```
     protocol  People {
    let name: String { get }
    let old: Int { get set }
    
    func gotoSchool()
}

    protocol  Developer: People {
    let language: String { get }
    
}

struct AppleDeveloper: Deverloper {
    let name: String { 
        return "John"
    }
    let old: Int = 24
    
    let language: String { 
    return "Swift"
    }
}
 ```
 
 Trong ví dụ trên protocol Developer kế thừa thuộc tính của protocol People vì vậy khi AppDeveloper implement protocol Developer phải tuân thủ các thuộc tính của cả 2.
 
##  Composition

Trong một số ngôn ngữ OOP như Java, một class chỉ có thể kế thừa từ một class cha vì vậy không cho phép đa kế thừa. Tương tự trong Swift mỗi việc đa kế thừa đối với class cũng bị ngăn cấm. Nhưng với protocol cho phép các thực thể con kết hợp để implement nhiều protocol cùng lúc

```
    protocol  People {
   let name: String { get }
   let old: Int { get set }
   
   func gotoSchool()
}

   protocol  Developer {
   let language: String { get }
   
}

struct AppleDeveloper: Deverloper, People {
   let name: String { 
       return "John"
   }
   let old: Int = 24
   
   let language: String { 
   return "Swift"
   }
}
```

## Tính đa hình
-Tính đa hình (polymorphism) được lấy từ gốc Hy Lạp gồm poly (nhiều) và morphe (dạng). Tính đa hình của protocol cũng tương tự như trong OOP, nhiều thể hiện (form) có thể được biểu diễn bởi một interface.

Ví dụ:
```
protocol People {
    let firstName: String {get set}
    let lastName: Date {get set}
}

struct Worker: People {
     let firstName: String = ""
     let lastName: Date = ""
}

struct Developer: People {
     let firstName: String = ""
     let lastName: Date = ""
}
```

 - Trong ví dụ trên struct Worker và Developer conform từ People. Do đó Worker và Developer đều có thể được thể hiện bởi People

```
var people:[People] = []
let worker = Worker()
let dev = Developer()

people.apend(worker)
people.append(dev)
```
 
 Trong ví dụ trên ta có thể append worker, dev vào mảng People. điều này thể hiện tính đa hình của Protocol.
 
###  Ép kiểu
 Ta có thể ép kiểu một thực thể trong protocol thành đúng với kiểu của nó
 Ví dụ: Trong mảng people có chứa cả phần tử Developer và Worker. Ta sử dụng từ khóa is để kiểm tra thực thể có đúng với kiểu hiện tại.
 
```
 for member in people {
     if member is Developer {
         print ("Developer")
     } else {
         print ("Worker")
     }
 }
```

Ngoài ra cũng có thể dùng từ khóa as để chuyển về kiểu mà mình mong muốn

```
  for member in people {
     if let dev = member as? Developer {
         print ("Developer is \(dev.firstName)")
     } 
 }
```

Trog ví dụ trên, từ khóa as kiểm tra thực thực member có phải kiểu Developer không để ép kiểu từ People thành Developer.

## Protocol Extension
Những ngày đầu mới tiếp cận với Protocol, tôi nghĩ rằng nó chỉ là một interface không phải thực thể vì vậy không thể gán giá trị mặc định cho thuộc tính cũng như không thể implement chức năng cho mỗi function. Vì vậy khi kế thừa protocol đề phải khai báo và implement lại các thuộc tính của nó. Tuy nhiên, khi tìm hiểu kĩ hơn về protocol, chúng ta hoàn toàn có thể viết chức năng cho function cũng như tạo giá trị mặc định cho thực thuộc tính trong protocol thay vì implement ở từng phần tử kế thừa

```
extention People { 
    let weight = 50
    let height = 170
    
    func getIBMIndex() -> Float {
        return weight/(2*height)
    }
}

let dev = Developer()

let devIbmIndex = dev.getIBMIndex()

let worker = Worker()
let wkIbmIndex = worker.getIBMIndex()

```


Trong ví dụ trên ta đã implement function cho protocol thay vì implement cho từng class, struct con

## Generics
 Generics là một trong những chức năng quan trọng và được sử dụng rộng rãi trong Swift và Protocol-Programing. Generics cho phép tạo một kiểu dạng placeholder để khai báo và sau đó định nghĩa kiểu cho placeholder. Điều này giúp code trở nên linh hoạt hơn và có thể reuse được code với những function giống nhau nhưng có type khác nhau.
 ```
 enum Optional<T>{
 case None
 case Some(T)
}
```
Trong ví dụ trên, T là một dạng type placeholder được định nghĩa, T có thể được truyền vào các type khác nhau trong quá trình thực thi code
Trong thực tế, placeholder này không bắt buộc là T, nó có thể thay bằng các kí tự khác, Nhưng đa số trong các tài liệu người ta sử dụng kí tự T để đại diện cho generics.

### Generics fuction

```
func swapInts (a: inout Int,b: inout Int) {
 let tmp = a
 a = b
 b = tmp
}

func swapDoubles(a: inout Double,b: inout Double) {
 let tmp = a
 a = b
 b = tmp
}

func swapStrings(a: inout String, b: inout String) {
 let tmp = a
 a = b
 b = tmp
}

```

Trong ví dụ trên ta thây 3 hàm swap với  các kiểu khác nhau là Int, Double, String. Bằng việc sử dụng Generics ta có thể thay thế 3 hàm trên bằng 1 hàm

```
func swapGeneric<T>(a: inout T, b: inout T) {
 let tmp = a
 a = b
 b = tmp
}

let a = 1
let b = 43

swapGeneric(a: &a, b: &b)

```

Trong đoạn code trên Swift sẽ kiểm tra kiểu của tham số đầu tiên và xác định kiểu cho T là Int.

```
let a = 1
let b = "Hello generics"

swapGeneric(a: &a, b: &b)

```

Trong đoạn code trên Swift sẽ kiểm tra kiểu của tham số đầu tiên và xác định kiểu cho T là Int
tuy nhiên tham số b truyền vào lại là kiểu String. Vì vậy sẽ có báo lỗi khi thực thi đoạn code này " cannot convert value of type String to
expected argument type Int"

Trong trường hợp muốn truyền nhiều hơn 1 biến generics ta có thể làm như sau

 ```
 func testGeneric<T,E>(a:T, b:E) {
 print("\(a) \(b)")
}
```

Đoạn code trên cho phép truyền nhiều generics là T và E

###  Generics Constraint

Generics cho phép đặt constraint cho các kiểu bằng cách quy định dạng mà nó kết thừa

```
func testGenericComparable<T: Comparable>(a: T, b: T) -> Bool{
 return a == b
}

testGenericComparable(a:2, b: 5)

let dev = Developer()
let worker = Worker()
testGenericComparable(a:dev, b: worker)
```

Trong ví dụ trên ta đặt constraint cho T, bắt buộc T truyền vào phải được kế thừa từ Protocol Comparable của swift.
Vì vậy, Developer và Worker không thừa kế từ Comparable nên hệ thống sẽ báo lỗi
 "binary operator '==' cannot be applied to two 'T'"

Trong ví dụ trên struct AppleDeveloper  có thể kết hợp vừa implement protocol People và Developer. Nhờ vào điều này giúp ta có thêm nhiều phương án thiết kế linh hoạt và ảo diệu hơn mà mình sẽ trình bày trong những phần sau.

# Kết luận
Trong phần này mình đã giới thiệu về POP một trong nhưng phong cách của Swift. Nắm vững được những bí kíp, và thuần thục về protocol code của bạn sẽ trở nên "bén" và chuyên nghiệp hơn.