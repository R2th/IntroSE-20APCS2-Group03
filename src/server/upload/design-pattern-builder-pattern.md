## 1. Giới thiệu:
**Builder Pattern** là một trong những Pattern được đưa ra bởi nhóm **GoF**. Builder Pattern thuộc nhóm các Pattern tạo dựng (**Creational pattern**). 
Nhóm Pattern này giúp chúng ta:
- Giải quyết các công việc tạo và khởi tạo các đối tượng.
- Các mẫu sẽ tạo ra một cơ chế đơn giản, thống nhất khi tạo ra các thể hiện của đối tượng.
- Cho phép đóng gói các chi tiết về các lớp nào được khởi tạo và cách các thể hiện này được tạo ra.
Vậy chúng ta sẽ bắt đầu cùng tìm hiểu và áp dụng Builder Pattern vào Swift.
## 2. Định nghĩa:
**Builder Pattern** là một mẫu **Design Pattern** được tạo ra để cung cấp những giải pháp linh hoạt để giải quyết các vấn đề khác nhau xung quanh việc khởi tạo một đối tượng trong Lập trình hướng đối tượng.
Mục đích chính của Builder Pattern chính là tách riêng việc khởi tạo một đối tượng ra khỏi biểu diễn của nó.
## 3. Ưu nhược điểm:
* **Ưu điểm:**
    * Cho phép thay đổi biểu diễn nội bộ của một lớp.
    * Đóng gói code để xây dựng và trình bày.
    * Cho phép kiểm soát từng bước của quá trình xây dựng đối tượng.
* **Nhược điểm:**
     * Yêu cầu một ConcreteBuilder cho từng loại đối tượng khác nhau.
    * Các thuộc tính của đối tượng không đảm bảo rằng sẽ được khởi tạo.
## 4. Biểu đồ lớp:
![](https://images.viblo.asia/9d6bf797-a854-41e5-926c-3ddc48180c4a.png)
## 5. Code Demo:
Để cho dễ hiểu, chúng ta sẽ làm demo sử dụng Builder Pattern để khởi tạo một đối tượng Car với 2 thuộc tính là "weel" (số bánh) và "color" (màu sắc).
```swift
class Car {
    var weel:Int?
    var color:String?
}
```
Tạo ra một protocol để khai báo các phương thức đóng vai trò khởi tạo đối tượng.
```swift
protocol CarBuilderProtocol {
    func build() -> Car
    func setWeel(weel:Int) -> CarBuilder
    func setColor(color:String) -> CarBuilder
}
```
Lớp CarBuilder đóng vai trò triển khai các phương thức đã khai báo ở protocol, đây là nơi sẽ set giá trị cho các thuộc tính của đối tượng Car được khởi tạo.
```swift
class CarBuilder:CarBuilderProtocol{
    var car:Car

    init() {
        self.car = Car()
    }

    func build() -> Car{
        return car
    }

    func setWeel(weel: Int) -> CarBuilder {
        car.weel = weel
        return self
    }

    func setColor(color: String) -> CarBuilder {
        car.color = color
        return self
    }
}
```
Lớp CarBuilderDirector
```swift
class CarBuilderDirector{
    var builder:CarBuilder

    init(builder: CarBuilder) {
        self.builder = builder
    }

    func construct() -> Car {
        return builder.setWeel(weel: 4).setColor(color: "White").build()
    }
}
```
Khởi tạo đối tượng thông qua CarBuilderDirector
```swift
let builder = CarBuilder()
let carBuilderDirector = CarBuilderDirector(builder: builder)
let car = carBuilderDirector.construct()
print("Car weel: \(car.weel!), Car color: \(car.color!)") //result: "Car weel: 4, Car color: White"
```
## 6. Tài liệu tham khảo:
- https://en.wikipedia.org/wiki/Builder_pattern
- Kiến trúc và thiết kế phần mềm - Trần Đình Quế