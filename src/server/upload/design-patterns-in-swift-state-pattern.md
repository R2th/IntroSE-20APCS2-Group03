### The State Pattern
Khi làm việc trong các dự án của mình, có thể bạn đã gặp phải các lớp có trạng thái internal states. Giả sử bạn có một lớp để tải xuống những hình ảnh lớn từ server. Lớp này có thể ở nhiều trạng thái khác nhau: requesting, downloading, processing, saving ... để đặt tên.

Trong 1 ví dụ, chúng ta sẽ sử dụng một chiếc xe. Xe của chúng ta có thể ở trạng thái dừng, nó có thể di chuyển hoặc tự động đỗ xe. Chiếc xe sẽ có chức năng của nó, như phanh hoặc đỗ. Tùy thuộc vào trạng thái của chiếc xe, gọi chức năng phanh sẽ có các hiệu ứng khác nhau. Không có tác dụng khi gọi chức năng phanh nếu xe đang dừng và gọi chức năng phanh trên xe tự động đỗ sẽ hủy hoạt động vào bãi đậu xe.

Chiếc xe sẽ quản lý trạng thái của nó trong nội bộ, chúng ta sẽ không thực sự biết, hoặc quan tâm đến trạng thái của nó. Như bạn đã nhận thấy từ đoạn trên, việc gọi một hàm sẽ tạo ra các kết quả khác nhau dựa trên trạng thái của đối tượng. quan điểm nó sẽ giống như chính đối tượng đã thay đổi. Điều này đưa chúng ta đến định nghĩa về state pattern:

> State pattern sẽ cho phép một đối tượng thay đổi hành vi của nó khi trạng thái nội bộ của nó thay đổi. Đối tượng sẽ xuất hiện để thay đổi lớp của nó.
Đó là các lý thuyết. Chúng ta hãy xem xét một số sơ đồ tiếp theo.

### Vehicle States

Chúng ta sẽ triển khai state pattern trên vehicle class. Xe của chúng tôi sẽ có ba trạng thái riêng biệt như bạn có thể thấy trên biểu đồ này:
![](https://images.viblo.asia/806bc104-29be-4afe-9d15-79dad3667d85.png)

Xe có thể thay đổi trạng thái, nhưng có một số quy tắc cần tuân theo. Ví dụ: bạn không thể di chuyển trực tiếp từ trạng thái moving sang trạng thái parking, trước tiên bạn phải chuyển sang trạng thái stopped.

Nếu bạn đang suy nghĩ về cách để thực hiện hành vi này vào vehicle class của bạn, bạn có thể nghĩ đến việc sử dụng enums để lưu trữ thông tin trạng thái trong một biến riêng của vehicle class. Hãy tưởng tượng như thế nào chức năng của bạn sẽ như thế nào, bạn sẽ kết thúc với rất nhiều trường hợp chuyển đổi trong mã của bạn. vehicle class của bạn sẽ trở nên khá lớn và khó maintain.

Những gì chúng tôi sẽ làm là tách riêng từng 'trường hợp' hoặc states thành một class. Chiếc xe sẽ có một tham chiếu đến tình trạng hiện tại của chiếc xe, và các class của state sẽ có một tham chiếu trở lại chiếc xe. Điều này sẽ cho phép họ kiểm soát trạng thái hiện tại của xe. Dưới đây là một sơ đồ đơn giản về phân cấp lớp của chúng ta:

![](https://images.viblo.asia/f4b02b4a-ff5f-45e5-a327-e27871e4b8eb.png)

### The Code

Chúng tôi sẽ giữ mọi thứ đơn giản. vehicle class của chúng ta sẽ chỉ có ba chức năng, một biến để lưu trữ tốc độ và một số factory methods để tạo ra các trạng thái:

```


import Foundation
 
protocol VehicleProtocol: class
{
    // MARK: - Vehicle State
    var speed: Int { get set }
    func setState(_ state: VehicleState)
    
    // MARK: - Vehicle Controls
    func accelerate()
    func brake()
    func park()
    
    // MARK: - State Getters
    func getStoppedState() -> VehicleState
    func getMovingState() -> VehicleState
    func getParkingState() -> VehicleState
}
```

Một class sử dụng chiếc xe thường chỉ tương tác với chiếc xe bằng cách gọi một trong ba chức năng "điều khiển xe". Các hàm / biến khác có nghĩa là được sử dụng bởi các lớp trạng thái.

Gọi bất kỳ chức năng điều khiển nào sẽ chỉ chuyển tiếp cuộc gọi hàm đó tới trạng thái, và trạng thái phương tiện hiện tại sẽ xử lý nó:

```

// MARK: - Vehicle Controls
func accelerate() {
    state?.accelerate()
}
    
func brake() {
    state?.brake()
}
    
func park() {
    state?.park()
}
```

Xe của chúng ta cũng sẽ có factory methods sẽ tạo ra các trạng thái xe:

```

// MARK: - State Getters
func getStoppedState() -> VehicleState {
    return StoppedState(self)
}
    
func getMovingState() -> VehicleState {
    return MovingState(self)
}
    
func getParkingState() -> VehicleState {
    return ParkingState(self)
}
```

Bây giờ bạn đang bắt đầu thấy mô hình đang hiện lên ở đây. Mỗi loại state class có một con trỏ trở lại một chiếc xe và nó có thể tạo ra các trạng thái mới. Tất cả những gì còn lại là triển khai các lớp của state.

### State Classes
Chúng ta sẽ sử dụng protocol cho vehicle states:

```

import Foundation
 
protocol VehicleState
{
    init(_ vehicle: VehicleProtocol)
    
    func accelerate()
    func brake()
    func park()
}
```

Mỗi lớp của state sẽ có một tham chiếu trở lại xe. Và mọi loại state class sẽ thực hiện các chức năng điều khiển xe. Việc gọi các chức năng điều khiển xe sẽ có ý nghĩa khác nhau đối với từng loại state class riêng lẻ, như chúng ta sẽ thấy trong sau đây.

* **Stopped State**

Hãy xem các trạng thái đơn giản nhất, trạng thái đã dừng:

```

class StoppedState: VehicleState
{
    private weak var vehicle: VehicleProtocol?
    
    required init(_ vehicle: VehicleProtocol) {
        self.vehicle = vehicle
    }
    
    func accelerate() {
        self.vehicle?.speed += 5
        if let movingState = self.vehicle?.getMovingState() {
            self.vehicle?.setState(movingState)
        }
    }
    
    func brake() {
        print("Can't brake... Vehicle is already stopped!")
    }
    
    func park() {
        if let parkingState = self.vehicle?.getParkingState() {
            self.vehicle?.setState(parkingState)
            parkingState.park()
        }
    }
}
```

Khi chiếc xe đang ở trạng thái dừng gọi ‘accelerate’ sẽ tăng tốc độ của xe lên 5 (kph, mph… nó không quan trọng, thực sự). Nó cũng sẽ đặt trạng thái mới của xe sang trạng thái chuyển động. Việc gọi chức năng ‘brake’ sẽ không có hiệu lực, bởi vì chiếc xe vẫn chưa di chuyển. Và gọi chức năng ‘park’ sẽ bắt đầu quy trình đỗ xe tự động.

* **Parking State**


Trạng thái đỗ xe thú vị hơn một chút:

```
class ParkingState: VehicleState
{
    private weak var vehicle: VehicleProtocol?
    private var parking: Bool = false
    
    required init(_ vehicle: VehicleProtocol) {
        self.vehicle = vehicle
    }
    
    func accelerate() {
        print("Vehicle is automatically parking, you can't accelerate!")
    }
    
    func brake() {
        print("Automatic parking has been aborted")
        stopParking()
    }
    
    func park() {
        guard self.parking == false else {
            print("Vehicle is already parking")
            return
        }
        print("Vehicle is now parking")
        self.parking = true
        DispatchQueue.global().asyncAfter(deadline: .now() + 5) {
            self.stopParking()
        }
    }
    
    private func stopParking() {
        print("Vehicle has stopped parking")
        self.parking = false
        if let stoppedState = self.vehicle?.getStoppedState() {
            self.vehicle?.setState(stoppedState)
        }
    }
}
```


Ở đây, chúng ta có thể thấy rằng việc gọi chức năng ‘brake’ sẽ dừng thủ tục đỗ xe. Và gọi ‘park’ sẽ kích hoạt một chuỗi các sự kiện. Bạn có thể cho rằng nội dung của phương pháp này có thể phù hợp hơn với ‘stopped state’ nhưng vì mục đích đơn giản, hãy giữ nó ở đây.

* **Moving State**

Trạng thái di chuyển cũng khá đơn giản:


```
class MovingState: VehicleState
{
    private weak var vehicle: VehicleProtocol?
    
    required init(_ vehicle: VehicleProtocol) {
        self.vehicle = vehicle
    }
    
    func accelerate() {
        self.vehicle?.speed += 5
    }
    
    func brake() {
        self.vehicle?.speed -= 5
        if self.vehicle?.speed == 0, let stoppedState = self.vehicle?.getStoppedState() {
            print("Vehicle braked to a stop")
            self.vehicle?.setState(stoppedState)
        }
    }
    
    func park() {
        print("Can't park the vehicle while it's moving. You need to stop first")
    }
}
```

Chúng ta có thể thấy ở đây rằng chúng ta có một đoạn logic trong chức năng 'brake' sẽ thay đổi trạng thái của xe để dừng lại nếu tốc độ giảm xuống 0.

### Testing It Out

```
private func testVehicle() {
    let vehicle = Vehicle()
    vehicle.brake()
    vehicle.accelerate()
    vehicle.accelerate()
    vehicle.brake()
    vehicle.park() // prints: Can't park the vehicle while it's moving. You need to stop first
    vehicle.brake()
    vehicle.park()
}
```

Chúng ta có thể thấy rằng cuộc gọi đầu tiên của chúng ta với phương pháp ‘park’ sẽ in ra một thông báo rằng chiếc xe cần phải dừng lại và sau khi chúng ta phanh, cuộc gọi thứ hai sẽ tạo ra kết quả mong đợi. Thử nghiệm đơn giản này chứng tỏ cách chiếc xe của chúng ta dường như đã thay đổi thực hiện khi đang bay. Gọi cùng một phương thức trên cùng một thể hiện của một lớp đang tạo ra các kết quả khác nhau. Và đó là bản chất của state pattern.

### Conclusion

Nếu bạn thấy một class có nhiều câu lệnh chuyển đổi, thì đó là một dấu hiệu tốt cho thấy bạn nên xem xét việc triển khai **state pattern**. Chúng ta có thể dễ dàng sử dụng một enum trong xe của chúng ta để đại diện cho state hiện tại. Nhưng hãy tưởng tượng lớp sẽ trông như thế nào sau một states. Các chức năng sẽ trở nên lớn, logic nghiệp vụ sẽ ở trong các khối trường hợp, mã sẽ dễ dàng bị lộn xộn và khó theo dõi. Mô hình đơn giản này giải quyết những vấn đề đó. Bạn sẽ kết thúc với một vài lớp khác trên sơ đồ lớp, nhưng mã sẽ tốt hơn và dễ đọc hơn nhiều. Và điều tốt nhất là, thêm các trạng thái mới sẽ yêu cầu thay đổi tối thiểu đối với mã hiện có.

State pattern là một pattern rất hữu ích để biết, nó có thể không phổ biến như các mẫu nổi tiếng khác, nhưng nó chắc chắn đáng biết. Bạn có thể tham khảo nhiều loại design pattern hơn tại [đây](https://agostini.tech/category/swift/design-patterns/).