Đằng sau việc chúng ta code, chúng ta có khi nào để ý rằng tham chiếu đến những biến là các cụm từ `strong` `weak`, hoặc `unowned` khi viết code. Vậy ý nghĩa của chúng thực sự là gì ? 

Việc sử dụng `strong` `weak`, hoặc `unowned` liên quan đến việc quản lý bộ nhớ trong Swift gọi là **Automatic Reference Counting (ARC)** . Định nghĩa trong Khoa học máy tính thì *Reference Counting* là kĩ thuật lưu lại số tham chiếu, con trỏ, hoặc sử lý liên quan đến resource như là đối tương, block hoặc bộ nhớ. Nói ngắn gọn, ARC giúp bạn lưu các tham chiếu vào trong bộ nhớ và giúp giải thoát nó đi khi không được dùng nữa.

Việc quản lý bộ nhớ đóng vai trò quan trọng việc phân vùng bộ nhớ để chương trình có thể chạy những yêu cầu của người sử dụng và có thể tái sử dụng lại vùng nhớ khi nó không cần thiết nữa.
### ARC hoạt động như thế nào

Mỗi lúc bạn tạo một instance từ class qua hàm `init()` , ARC tự động cấp một vùng nhớ để lưu thông tin. Vùng nhớ đó lưu trữ instance đó cùng với các giá trị của thuộc tính của nó. Khi mà instance đó không còn cần thiết nữa, `deinit()` sẽ được gọi và ARC sẽ giải phóng vùng nhớ đó của instance.

Đoạn code sau đây sẽ demo về cách hoạt động trên
```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    var gadget: Gadget?
    deinit {
        print("\(name) is being deinitialized")
    }
}
 
class Gadget {
    let model: String
    init(model: String) {
        self.model = model
        print("\(model) is being initialized")
    }
    var owner: Person?
    deinit {
        print("\(model) is being deinitialized")
    }
}
```

### Sự khác biệt giữa Strong, Weak và Unowed

Bức ảnh dưới đây sẽ giải thích về yêu cầu về việc sử dụng của mỗi loại tham chiếu trên
![](https://images.viblo.asia/509b818a-6a85-47a9-a303-3d08d4397165.png)

1.  Thông thường, khi một thuộc tính được tạo ra, thuộc tính đó là `strong` trừ phi chúng ta muốn nó là `weak` hoặc `unowned`
2.  Khi thuộc tính là `weak`, nó sẽ không tăng việc đếm tham chiếu lên.
3.  Kiểu `unowned` nằm ở giữa, nó không phải là `strong` và cũng không phải là `optional` . Trình biên dịch sẽ hiểu là đối tượng đó sẽ không bị giải phóng khi mà những đối tượng tham chiếu đến nó vẫn còn trong bộ nhớ.

**Kiểu tham chiếu : strong**

Hãy nhìn vào ví dụ sau. Chúng ta có một biến của class `Person`  với đối tượng là "kelvin" và class "Gadget" với đôí tượng là "iphone"
```swift
var kelvin: Person?
var iphone: Gadget?
 
kelvin = Person(name: "Kelvin")
iphone = Gadget(model: "iPhone 8 Plus")
```

Bây giờ nếu như bạn đặt cả hai biến này thành `nil` và chạy Playgrounds :
![](https://images.viblo.asia/d5eeb89f-bb50-4279-aba7-7c89d57b9533.png)

Hãy nhìn vào phần console bạn sẽ thấy cả hai biến đã được giải phóng cả rồi.
Giờ chúng ta sẽ đặt `owner` của `kelvin` và `iphone` cho nhau. Hãy đặt đoạn code này trước khi set hai biến trên thành `nil`:

```swift
kelvin!.gadget = iphone
iphone!.owner = kelvin
```

Đây là một ví dụ để diễn tả việc liên kết chặt giữa các biến là như thế nào. Hãy nhớ rằng trong class `Person` có một biến của `gadget` mà ở đây nó chứa giá trị của `iphone`. Để nhìn một cách trực quan hơn thì nó sẽ như sau :
![](https://images.viblo.asia/d1d2adf5-aa02-4474-8a6f-c438c1b66462.png)

Giờ hãy chạy lại đoạn code trên, bạn sẽ thấy rằng chỉ có việc khởi tạo là thành công.

![](https://images.viblo.asia/3c6d8e9b-2c15-4b1a-aeb8-27b9ff11d514.png)

Vậy lý do vì sao, chúng ta đã gia lệnh giải thoát vùng nhớ cho các tham chiếu `strong` trên rồi mà tổng số tham chiếu vẫn chưa về 0 dẫn đếu việc là ARC vẫn chưa giải phóng vùng nhớ. Lý do là liên kết giữa `Person` và `Gadget` vẫn còn và nó chưa bị phá huỷ cho dù instance của nó có là `nil` đi chăng nữa.

![](https://images.viblo.asia/fc8c8948-1048-45eb-bd8e-4411536984fd.png)

Đây chính là vòng tròn liên kết chặt chẽ, lý do chính dẫn đến việc bị thất thoát bộ nhớ. Để phá vỡ vòng tròn này, bạn cần phải sử dụng `weak` và `unowned`.

**Kiểu tham chiếu : weak**

`weak` luôn được khai báo là optional vì giá trị của biến có thể đặt là `nil`. Để có thể chỉ ra tham chiếu là weak, bạn thêm từ khoá `weak` vào sau thuộc tính: 

```swift
	weak var owner: Person?
```

ARC sẽ tự động đựat tham chiếu weak là `nil` khi instance bị giải phóng. Gía trị được gán là weak sẽ không thay đổi được giá trị của nó và như là một constant.

Chúng ta có thể phá vòng lặp liên kết chặt bằng cách sử dụng weak. Hãy thay đổi code như sau :
```swift
class Gadget {
    let model: String
    init(model: String) {
        self.model = model
        print("\(model) is being initialized")
    }
    weak var owner: Person?
    deinit {
        print("\(model) is being deinitialized")
    }
}
```

Và chạy Playgrounds :
![](https://images.viblo.asia/9edd53b4-50e6-4f88-ac86-9ce67324a728.png)

Bạn sẽ thấy rằng chúng đã được giải phóng. Sau khi chuyển `owner` thành `weak` . Sự liên kết sẽ như sau :

![](https://images.viblo.asia/a9799beb-f3e7-4adc-bf99-62388c685cfd.png)

Khi bạn đặt `kelvin` thành `nil`, nó thể được giải phóng bởi vì không còn tham chiếu chặt nào đến `Person` nữa.
![](https://images.viblo.asia/6b149b0b-34ba-4e9b-931a-21e84e8583ab.png)

**Kiểu tham chiếu : unowned**

`unowned` khá giống với `weak` khi nó có thể sử dụng để phá liên kết chặt. Nhưng điểm khác biệt là nó luôn phải có giá trị. ARC sẽ không đặt giá trị của nó là `nil`. 
Bởi vì `unowned` luôn phải có giá trị nên ta sửa như sau :
```swift
class Person {
    let name: String
        
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
        
    var gadget: Gadget?
    deinit {
        print("\(name) is being deinitialized")
    }
}
 
class Gadget {
    let model: String
    unowned var owner: Person
        
    init(model: String, owner: Person) {
        self.model = model
        self.owner = owner
        print("\(model) is being initialized")
    }
    
    deinit {
        print("\(model) is being deinitialized")
    }
}
```
Như bạn thấy ở trên, `owner` của `Gadget` được định nghĩa là non-optional là một `unowned`. Bởi vì nó mà khi khởi tạo phải thêm tham số là `owner`. Quan hệ giữa `Person` và `Gadget` có chút khác biệt, `Person` có thể có gadget nhưng `Gadget` buộc phải có `Person`.
```swift
var kelvin: Person?
...
kelvin = Person(name: "Kelvin")
kelvin!.gadget = Gadget(model: "iPhone 8 Plus", owner: kelvin!)
```
Dưới đây là minh hoạ về quan hệ giữa các biến bây giờ. 
![](https://images.viblo.asia/a84d4181-c54d-42fd-90b2-d37517c2dd9f.png)

Giờ ta sẽ phá vòng liên kết chặt bằng cách đặt `kelvin` về `nil` sau đó xem kết quả. 
![](https://images.viblo.asia/0a3152ef-1fe8-414f-b49b-9cb8c216c701.png)

Đến đây là bài viết kết thúc, mong các bạn hiểu rõ tham chiếu `strong`, `weak` và `unowned` . Cảm ơn các bạn đã đón đọc. 

REF: https://www.appcoda.com/memory-management-swift/