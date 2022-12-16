Trong Swift có 2 cách để tạo protocol generic: 
1. Thêm Self Requirement.
2. Dùng Associated Types

# 1. Protocol Self Requirement
Kiểu của các parameters là kiểu **Self**. Khi class , struct hoặc enum adopt protocol này, thì kiểu sẽ tự động chuyển về kiểu của object  adopt protocol đó.

```
protocol WithSelfProtocol {
    func doAllTheThings(other: Self)  -> Bool
}

class SomeClass: WithSelfProtocol {
    func doAllTheThings(other: SomeClass) -> Bool {
        return true
    }
}


let someObject = SomeClass()
let oneOtherObject = SomeClass()
someObject.doAllTheThings(oneOtherObject)
```

+ Protocol with self sẽ không làm việc trong các case sau: 
  -  Properties of type **Self** aren’t allowed. (Thuộc tính không phù hợp với type **Self**).
  -  Nếu **Self** trả về là một kiểu của của một function. Ví dụ:


```
protocol NotAGenericSelfProtocol {
    func doAllTheThings(with: Self) -> Self // Nếu khai báo thế này
    // Xcode sẽ báo lỗi thiếu từ khoá final.
}

class SomeOtherClass: NotAGenericSelfProtocol {
    // This won't compile
    func doAllTheThings(with: SomeOtherClass) -> SomeOtherClass {
        
    }
}
```

Các bạn lại nghĩ tôi viết kiểu của parametes là kiểu protocol thì sao. Khi mà viết kiểu parametes là kiểu protocol thì nó được gọi là  **Without Self Requirement**:

```
protocol WithoutSelfProtocol {
    func doAllTheThings(other: WithoutSelfProtocol)  -> Bool
}

class SomeClass: WithoutSelfProtocol {
    func doAllTheThings(other: WithoutSelfProtocol) -> Bool {
        return true
    }

}
```

Mình sẻ giải thích cho các bạn ưu điểm khi sử dụng **Self requiment** so với  **Without Self Requirement** :
![](https://images.viblo.asia/a7050493-64eb-4c42-a6f4-3e0902b62f31.png)

Đây là bảng so sánh ưu điểm của with Self requirement.

 ### **1.1 Think heterogeneous? Think homogeneous?**
Giải thích  đã có trong [bài viết](https://medium.com/ios-os-x-development/heterogeneous-vs-homogeneous-generics-630971626b7d) các bạn đọc thêm để hiểu nhé.
Chỉ cần các bạn hiểu đơn giản là 

**- heterogeneous**: Các phần tử trong một mảng có thể có các kiểu khác nhau
   VD: [1, 6, 4, "2"]
   
**- homogeneous**: Ngược lại với heterogeneous là các phần tử trong một mảng phải cùng kiểu.

Mình sẽ làm ví dụ về **With Self Requirement** có  đặc điểm là  homogeneous:

-  **With Self Requirement** : 


```
// with Self Requirement
protocol Human {
    func getName(name: Self)
}

class Student: Human {
    print("toi la hoc sinh")
}

class Techer: Human {
    print("toi la giao vien")
}


Main: 
       let student = Student()
       let techter = Techer()               
       let human: [Human] = [student, techter]  // Error: Protocol 'Human'  
       // can only be used as a generic constraint 
       // because it has Self or associated type requirements

```

Mặc dù các object student, techter đều có kiểu Human nhưng không thể lưu vào trong một Collection.

- **Without Self Requirement**: 

```
protocol NotHuman {
    func getName(name: NotHuman)
}

class Dog: NotHuman {
    func getName(name: NotHuman) {
        print("con cho")
    }
}

class Cat: NotHuman {
    func getName(name: NotHuman) {
        print("con meo")
    }
}

Main: 
        let cat = Cat()
        let dog = Dog()
        let animal: [NotHuman] = [cat, dog] // Not Error
```

### 1.2 **Dynamic Dispatch ?  Static Dispatch ?**

**Dynamic Dispatch**: xác định hàm được chạy trong quá trình runtime.

**Static Dispatch**: xác định hàm  được chạy trong quá trình biên dịch.

**Một hàm không được khai báo ở protocol mà được khai báo ở extension thì nó là static dispatch.  (Các bạn có thể xem các ví dụ trên mạng nhé để hiểu vấn đề)**.

Để hiểu về dynamic dispatch với statich dispatch trong protocol các bạn có thể [đọc](https://medium.com/@PavloShadov/https-medium-com-pavloshadov-swift-protocols-magic-of-dynamic-static-methods-dispatches-dfe0e0c85509) .

Mình sẽ lấy ví dụ về **Self Requirement Protocol** có tính **static dispatch**
và **Without Self Requirement** có tính **dynamic dispatch**

```
protocol NotHuman {
    func getName(name: NotHuman) // Requirement -> dynamic method
}

extension NotHuman {
    // Requirement
    func getName(name: NotHuman) {
        print("Dong vat")
    }
    
}

class Dog: NotHuman {
    // Requirement
    func getName(name: NotHuman) {
        print("con cho")
    }
  
}

Main: 
        let dog = Dog()
        let notHumand: NotHuman = dog
        notHumand.getName(name: dog)  // result: "con cho"
        
       Vậy  Without Self Requirement có tính dynamic dispatch
```

```
protocol Human {
    func getName(name: Self)
}
extension Human {
    func getName(name: Self) {
        print("Con nguoi")
    }
}

class Student: Human {
    func getName(name: Student) {
        print("toi la hoc sinh")
    }
}

Main: 
        let student = Student()
        let human: Human = student // Error: Protocol 'Human' can only be used as a generic constraint because it has Self or associated type requirements
        human.getName(name: student) // Member 'getName' cannot be used on value of protocol type 'Human'; use a generic constraint instead
        -> tính static dispatch.
```



# 2. Protocol Associated Types 
Khi mà dùng **Self** chỉ có thể dùng được kiểu mà protocol đó adopt. Nếu dùng **Protocol Associated Types** có thể khai báo một hoặc nhiều associatedtypes trong một protocol.
### **Protocol Associated Types (PAT)= Type Alias + Generics**

Ví dụ dưới đây  sẽ cho các bạn thấy cách sử dụng Associated Types trong protocol:
```
protocol GenericProtocol {
 associatedtype myType
 var anyProperty: myType { get set }
}
```

Bất kỳ class, struct, enum mà dopt protcol **GenericProtocol** đều phải implement **anyProperty**. Tuy nhiên , kiểu của **anyProperty** chưa được khai báo rõ ràng.Vì vậy trong class, struct hoặc enum phải định nghĩa rõ ràng hoặc định nghĩa ngầm.
## 2.1  Define Associated Type Implicitly

Bạn có thể xác định kiểu của myType dựa vào giá trị liên kết với **anyProperty**

```
class SomeClass: GenericProtocol {
 var anyProperty: myType = "Bob"
}
```

Bây giờ , **myType** đã được định nghĩa là **String**,  tuy nhiên bạn có thể làm như bên dưới :

```
class SomeClass: GenericProtocol {
 var anyProperty = "Bob" // myType is "String"
}

```

## 2.2 Define Associated Type Explicitly
Bạn có thể định nghĩa **associated type** bằng cách gọi  **typealias** như bên dưới hoặc có thể định nghĩa myType như cách tôi viết ở trên.
```
class SomeClass: GenericProtocol {
 typealias myType = String
 var anyProperty: myType = "Bob"
}
```

 hoặc bạn có thể định nghĩa myType thành một kiểu bất kỳ mà bạn muốn :
 
 ```
 struct SomeStruct: GenericProtocol {
 var anyProperty = [1, 2, 3]
}
 ```
 
 Bài viết đang còn chưa đầy đủ, mọi ý kiến đóng góp các bạn có thể comment xuống bên dưới, để bài viết được tốt hơn.
 
 **Tài liệu tham khảo:**
 - https://medium.com/monstar-lab-bangladesh-engineering/swift-from-protocol-to-associatedtype-then-type-erasure-a4093f6a2d08
 - https://blog.bobthedeveloper.io/generic-protocols-with-associated-type-7e2b6e079ee2
 - https://dispatchswift.com/generic-protocols-in-swift-b47414e29bba
 - https://medium.com/@leandromperez/protocol-extensions-gotcha-9ef1a42c83b6
 - https://kipalog.com/posts/Method-dispatch-hay-tro-lo-cua-protocol