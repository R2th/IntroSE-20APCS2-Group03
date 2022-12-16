### Define
> The decorator pattern sửa đổi hành vi của một đối tượng cốt lõi mà không thay đổi định nghĩa lớp hiện có của nó.

The decorator pattern có hai thành phần chính: một đối tượng cốt lõi sẽ được sửa đổi hành vi của nó và một đối tượng decorator mang lại hành vi thay đổi trong đối tượng cốt lõi

Hai thành phần này hoạt động cùng nhau cho hai mục tiêu chính:

1. Behavior Modification
2.  Achieved Dynamically

#### Behavior Modification
Mục đích của pattern là thay đổi cách hoạt động của một đối tượng cốt lõi mà không sửa đổi triển khai lớp hiện có của nó. Điều này đạt được bằng cách bọc đối tượng lõi bằng các decorator, làm tăng hành vi mặc định của đối tượng lõi. 
![](https://images.viblo.asia/bc1d775c-2d09-4bfd-a8d3-fbfc4dd4a200.jpeg)

decorator tăng cường các hành vi đã tồn tại trong đối tượng cốt lõi. Chúng chia sẻ cùng một giao diện với đối tượng cốt lõi, nhưng cung cấp một cách thực hiện khác. Do đó, khách hàng không thể phân biệt được họ đang làm việc với một đối tượng decorator hay đối tượng cốt lõi: họ gọi các chức năng / thuộc tính chính xác giống nhau trên cả hai. Giao diện được chia sẻ này cho phép các nhà decorator  hoạt động như một người trung gian, chặn các cuộc gọi đến đối tượng cốt lõi và cung cấp hành vi tùy chỉnh cho khách hàng.
#### Dynamic Modifications
Decorator không chỉ đơn giản là sửa đổi hành vi, mà họ làm như vậy một cách linh hoạt. Nói cách khác, chúng thay đổi cách các đối tượng hoạt động trong thời gian chạy thay vì thời gian biên dịch.\
Biên dịch sửa đổi hành vi thời gian rất đơn giản: người ta chỉ cần thay đổi trực tiếp định nghĩa lớp đối tượng, hoặc lớp con và ghi đè các cài đặt mặc định của nó. Tuy nhiên, các tùy chọn này có thể không mong muốn vì những lý do sau:

1. Lớp đối tượng cốt lõi có thể được khai báo cuối cùng, điều này ngăn chặn phân lớp.
2. Lớp này có thể được định nghĩa trong khung bên thứ ba và mọi thay đổi đối với nó sẽ bị mất trong lần cập nhật khung tiếp theo.
3. Có thể tồn tại nhiều sửa đổi mong muốn và một số hành vi có thể được kết nối với nhau để tạo ra các kết hợp phức tạp. Tạo một lớp con cho mọi kết hợp có thể sẽ dẫn đến sự bùng nổ của lớp.
4. Thay đổi đối với các lớp hiện tại có thể gây ra tác dụng phụ ngoài ý muốn, từ phá vỡ chức năng đến sự cố. Điều này đặc biệt đúng khi kế thừa một cơ sở mã di sản mỏng manh và không được hiểu đầy đủ.

#### Implement
Hãy để thực hiện mô hình bằng cách sử dụng minh họa xe đua.
 ```swift 
 protocol Transporting {
  func getSpeed() -> Double
  func getTraction() -> Double
} 
  ```
  
  Chúng ta tạo ra một giao thức Transporting, đòi hỏi các đối tượng xe phù hợp để cung cấp cho chúng tôi các chỉ số tốc độ và lực kéo của chúng.
  
  ```swift
final class RaceCar: Transporting {
  private let speed = 10.0
  private let traction = 10.0
  
  func getSpeed() -> Double {
    return speed
  }
  
  func getTraction() -> Double {
    return traction
  }
```
**Using the RaceCar Class**
  ```swift
  let raceCar = RaceCar()
let defaultSpeed = raceCar.getSpeed()
let defaultTraction = raceCar.getTraction()
  ```
  
  **Adding a Decorator**
  ```swift
  // Abstract Decorator
class TireDecorator: Transporting {
  // 1
  private let transportable: Transporting
  
  init(transportable: Transporting) {
    self.transportable = transportable
  }
  
  // 2
  func getSpeed() -> Double {
    return transportable.getSpeed()
  }
  
  func getTraction() -> Double {
    return transportable.getTraction()
  }
}


class OffRoadTireDecorator: Transporting {
  private let transportable: Transporting
  
  init(transportable: Transporting) {
    self.transportable = transportable
  }
  
  func getSpeed() -> Double {
    return transportable.getSpeed() - 3.0
  }
  
  func getTraction() -> Double {
    return transportable.getTraction() + 3.0
  }
}

  ```