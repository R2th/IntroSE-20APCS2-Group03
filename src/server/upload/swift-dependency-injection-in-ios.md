Trong bài viết này, chúng ta sẽ cùng tìm hiểu về **Dependency Injection** - một trong những nguyên tắc lập trình vô cùng quan trọng để viết code "sạch" (hay còn gọi là clean code).
Trước khi đi vào **Dependency Injection**, ta sẽ cùng tìm hiểu về khái niệm "**Dependency** là gì?", và khi hiểu được khái niệm **Dependency** thì việc tìm hiểu về **Dependency Injection** sẽ trở nên dễ dàng hơn đối với lập trình viên.

### 1. Dependency

#### 1.1. Khái niệm **Dependency**:
* Giả sử ta có **component A** và **component B**, trong đó  **component A** sử dụng  **component B** thì ta nói **component A** phụ thuộc vào **component B**, và ngược lại **component B** chính là một ***Dependency*** của **component A**.

* Component ở đây có thể là một class, một struct hay một enum hoặc cũng có thể là một module.

![](https://images.viblo.asia/234d68f6-257c-4d69-9300-fae7aa798c1c.png)

* Ví dụ: Ta có 2 class là **Customer** và **CreditCard**, trong đó class **Customer** chứa một object có kiểu dữ liệu là **Credit Card** thì ta nói class **Customer** phụ thuộc vào object **creditCard**, hay object **creditCard** là một ***Dependency*** của **Customer**.

```
class Customer {
    let creditCard: CreditCard

    init(creditCard: CreditCard) {
        self.creditCard = creditCard
    }
}

class CreditCard {}
```

#### 1.2. Các loại **Dependency**:

- **Explicit Dependency**: Là **Dependency** có thể được nhìn thấy thông qua Interface của một Component. Như ví dụ dưới đây thì **creditCard** là một ***Explicit Dependency*** của **Customer**, vì chỉ cần nhìn vào Interface của **Customer** thì ta cũng có thể thấy rằng **Customer** đang phụ thuộc vào ***Dependency*** là **creditCard**.

```
protocol CustomerInterface {
    func getCreditCard(creditCard: CreditCard)
}

class Customer: CustomerInterface {
    func getCreditCard(creditCard: CreditCard) {
       // Implement code
    }
}

class CreditCard {}
```
- **Implicit Dependency**: Ngược lại với **Explicit Dependency** thì **Implicit Dependency** không thể được nhìn thấy nếu ta chỉ quan sát ở Interface của một Component. Ta có ví dụ sau đây:
```
protocol CustomerInterface {
    func getAddress()
}

class Customer: CustomerInterface {
    func getAddress() {
        let address = Address()
        address.getAddressNumber()
    }
}

class Address {
    func getAddressNumber() -> Int {
        return 10
    }
}
```
Rõ ràng class **Customer** đang phụ thuộc vào class **Address**, tuy nhiên nếu chỉ nhìn vào Interface của **Customer** thì ta không thể nào thấy được sự phụ thuộc này.
### 2. Dependency Injection

#### 2.1 Định nghĩa: 
- **Dependency Injection** (DI) là một nhóm các patterns giúp bạn có thể quản lý **dependencies** bằng cách truyền **dependencies** một cách công khai. Hay nói cách khác, DI là một nhóm các patterns giúp các bạn tạo ra các **Explicit Dependencies**.

#### 2.2. Các patterns cơ bản:
Có 3 loại patterns cơ bản trong **Dependency Injection**.

   - **Constructor Injection**: là khi bạn truyền **Dependency** vào một component thông qua hàm khởi tạo của conponent đó.  Ta có ví dụ sau đây:
              
 Trong hàm khởi tạo của class **Person**, ta khai báo param là một object kiểu **Car**, thì object này sẽ đóng vai trò là một ***Dependency*** của **Person**. 
       
```
class Person {
    let car: Car
    
    init(car: Car) {
        self.car = car
    }
}

class Car {}
```
Giờ nếu ta muốn khởi tạo một object kiểu **Person** thì ta bắt buộc phải truyền vào một object kiểu **Car**.
```
let car = Car()
let person = Person(car: car)
```

- **Property Injection**: Là khi bạn truyền **Dependency** sau khi object đã được khởi tạo bằng cách truyền nó qua các properties của object đó. Ví dụ như: 
```
class Person {
    let car: Car?
}

class Car {}
```
Sau khi khởi tạo object **person** thì ta sẽ truyền cho nó **Dependency** là object **car** thông qua property **car** nằm trong class **Person**
```
let car = Car()
let person = Person()
person.car = car
```
> Lưu ý: ta chỉ nên sử dụng **Property Injection** khi ta cung cấp cho property đó một giá trị default sử dụng hầu hết trong tất cả các trường hợp.


- **Method Injection**: Là khi bạn truyền **Dependency** sau khi object đã được khởi tạo bằng cách truyền nó qua các methods của object đó. Ví dụ như:
```
class Person {
    func getCar(car: Car) {
       let carName = car.getName()
        print(carName)
    }
}

class Car {
    func getName() -> String {
        return "Toyota"
    }
}
```
Sau khi khởi tạo object **person** thì ta sẽ truyền vào hàm **getCar()** thuộc class **Person** là một object **car**.
```
let car = Car()
let person = Person()
person.getCar(car: car)
```
> Lưu ý: Ta nên sử dụng **Method Injection** nếu bạn sử dụng phương thức **DI** nhiều lần và trong mỗi lần sử dụng bạn lại truyền vào **Dependency** khác nhau.