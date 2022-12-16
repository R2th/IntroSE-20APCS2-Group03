Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/what-is-the-difference-between-class-and-static-in-swift-3493848ed831

![](https://images.viblo.asia/178622fd-48ed-41b8-8848-85a0c26c4107.jpeg)
Hôm nay, chúng ta sẽ nhanh chóng khám phá sự khác biệt giữa các từ khóa `class` và `static` trong **Swift**.
Trước khi đi sâu vào mã, thì chúng ta nên biết về lý thuyết. Từ khóa `class` được sử dụng khi chúng ta muốn truy cập một hằng / biến của một lớp mà không cần khởi tạo lớp đó (giống như chúng ta sử dụng `static`) và có thể ghi đè lên thuộc tính đó trong các lớp con (còn thuộc tính `static` thì không bị ghi đè).
Mã dưới đây được viết và chạy trong một ** Xcode Playground**
### Cùng bắt đầu
Hãy xem cách triển khai đơn giản sau đây của lớp `Car`:
```
class Car {
    static let countryOfProduction = "Japan"
    static var topSpeed: Float {
        return 100.0
    }
}
```
Chúng ta thấy rằng: có thể truy cập vào các thuộc tính `countryOfProduction` và `topSpeed` mà không cần khởi tạo bất kì đối tượng `Car` nào.
Điều gì xảy ra nếu chúng ta muốn tạo lớp `SuperFastCar` kế thừa từ lớp `Car`? 
Chúng ta sẽ viết mã như sau:
```
class SuperFastCar: Car {
    override static let countryOfProduction = "Italy"
    override static var topSpeed: Float {
        return 250.0
    }
}
```
Tuy nhiên, điều này dẫn đến lỗi khi chúng ta tiến hành biên dịch mã. Đơn giản là chúng ta không thể ghi đè các thuộc tính `static`.
Vậy chúng ta phải làm sao để có thể ghi đè được các thuộc tính này? Chúng ta sẽ dùng từ khóa `class` thay vì sử dụng `static` (có một lưu ý ở đâu: chúng ta không thể sử dụng từ khóa `class`với các thuộc tính lưu trữ)
```
class Car {
    class var countryOfProduction: String { "Japan" }
    class var topSpeed: Float { 100.0 }
}

print(Car.countryOfProduction)
print(Car.topSpeed)

class SuperFastCar: Car {
    override class var countryOfProduction: String { "Italy" }
    override class var topSpeed: Float { 250.0 }
}

print(SuperFastCar.countryOfProduction)
print(SuperFastCar.topSpeed)
```
Bây giờ chúng ta thấy rằng các giá trị được in sẽ như mong đợi:
![](https://images.viblo.asia/7074dc18-c772-4e88-98e4-852953796398.png)

Cảm ơn bạn vì đã đọc!