Sử dụng các protocol của Swift để khắc phục các vấn đề về đa kế thừa và cải thiện tính linh hoạt của mô hình

###  1. Introduction

Lập trình hướng Protocol hoặc POP là một tính năng đặc biệt trong Swift như một câu trả lời cho sự kế thừa kế thừa và phân lớp trong các ngôn ngữ lập trình khác

POP giúp bổ sung các tính năng trong các lớp khác nhau thuộc nhiều loại khác nhau bằng cách sử dụng các giao thức. Nó cũng củng cố quy trình kiến trúc tốt hơn bằng cách thúc đẩy các nguyên tắc vững chắc của đảo ngược phụ thuộc .

Như chúng ta biết Swift không hỗ trợ nhiều lớp kế thừa, nhưng đôi khi chúng ta cần một lớp để kế thừa hành vi của các giao diện / lớp khác nhau trong một lớp, vì vậy POP giúp đạt được điều đó bằng cách sử dụng cácProtocol.

Chúng ta sẽ thấy hai loại tính năng protocol

- Protocols với extension
- Protocols với associated types

### 2. Interface reuse

Interface reuse cho phép mô-đun hóa. Cả hai giao thức và kế thừa đều cung cấp các tính năng này. Subclasses kế thừa từ superclass của chúng và các lớp tuân thủ Protocol conforming classes mà nó tuân theo.



```swift    
class Animal {
    func waksOnNumberOfLegs() -> Int {
       return 4
   }
   func hastail() -> Bool { 
      return true
      }
   func speaks { 
      print("") 
        }
}
class Dog : Animal {
  overide func speaks { 
      print("Bow Bow") 
        }
}
class Cat : Animal {
   overide func speaks { 
      print("Meow Meow") 
        }
}
let dog = Dog()
dog.waksOnNumberOfLegs() // 4
truedog.hastail() //tru
edog.speaks() //  Bow Bow
let cat = Cat()
cat.waksOnNumberOfLegs() // 4
cat.hastail() // true
   ```
   
   ### 3. Implementation
   
   
   Kế thừa giúp tái sử dụng thực thi. Tất cả các lớp con có thể kế thừa các thuộc tính và phương thức chung.Các lớp con kế thừa từ lớp cha của chúng và các lớp tuân thủ Giao thức từ phần mở rộng giao thức mà nó tuân theo.
   
   ### 4. Usable with value types
   
   Kế thừa chỉ có thể được sử dụng với các loại lớp trong khi các protocols có thể được sử dụng với các loại giá trị.
   
   ### 5. Modeling flexibility
   
   Trong Kế thừa, chúng ta phải xác định trước lớp cha của một lớp và bất kỳ thay đổi nào sau đó có thể dẫn đến sự thay đổi trong việc triển khai toàn bộ lớp con
   Trong khi đó trong lập trình hướng protocol, bạn có thể tuân theo mô hình hồi tố động của classes hoặc structs.
   
- **Protocol with extension**
   

```swift    
protocol Animal {
   func waksOnNumberOfLegs() -> Int
   func hastail() -> Bool
   func speaks
}
------------------------------------------------------
class Dog : Animal {
 func waksOnNumberOfLegs() -> Int {
       return 4
   }
func hastail () -> Bool{ 
       return true
   }
func speaks { 
      print("Bow Bow") 
     }
}
class Cat: Animal { 
func waksOnNumberOfLegs() -> Int {
       return 4
   }
func hastail() -> Bool { 
       return true
   }
 func speaks { 
      print("Meo Mew") 
     }
}

   ```
   
   
   Bây giờ như bạn đã thấy ở trên, đây là một triển khai protocol đơn giản, trong đó chúng tôi có thể sử dụng lại giao diện Animal trong cả hai  Cat Dog  và tùy chỉnh nó theo ý muốn.
   
   ![](https://images.viblo.asia/ece13a52-e057-4c8e-ad52-6bd42b8b3228.png)


Trong khi đó, chúng tôi phải triển khai từng methods riêng biệt trong tất cả các lớp tuân thủ vì chúng tôi không thể triển khai các phương thức mặc định trong  protocol

![](https://images.viblo.asia/8c4f5298-0ef0-482e-bf45-a417deb7b7bd.png)

   Giờ đây, với sự trợ giúp của các phần mở rộng protocol, chúng ta có thể triển khai các phương thức mặc định trong các thân protocol cho phép sử dụng lại Implementation.
   
   ```swift    

protocol Animal {
   func waksOnNumberOfLegs() -> Int 
   func hastail() -> Bool
   func speaks
}
------------------------------------------------------
extension Animal {
 func waksOnNumberOfLegs() -> Int {
       return 4
   }
func hastail() -> Bool { 
       return true
   }
}
------------------------------------------------------
class Dog : Animal {
  func speaks { 
      print("Bow Bow") 
     }
}
struct Cat: Animal {
  func speaks { 
      print("Meow Meow") 
     }
}
---------------------------------------------------
let dog = Dog()
dog.waksOnNumberOfLegs() // 4
dog.hastail() //true
dog.speaks() //  Bow Bow
let cat = Cat()
cat.waksOnNumberOfLegs() // 4
cat.hastail() // true
cat.speaks() //  Meow Meow
   ```