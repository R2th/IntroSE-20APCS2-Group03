Việc quản lý bộ nhớ trong lập trình phần mềm là vô cùng quan trọng, đặc biệt là viết app cho điện thoại. Mặc dù ngày nay có những thiết bị có bộ nhớ RAM rất lớn, tuy nhiên nếu ứng dụng viết ra mà tiêu tốn qúa nhiều bộ nhớ, hoặc có những rò rỉ bộ nhớ (memory leak) thì trong quá trình sử dụng, nó sẽ chiếm giữ tài nguyên của máy, gây giật, lag, crash app. Điều này là rất nguy hiểm, ảnh hưởng trực tiếp đến chất lượng của app :v. Chính vì vậy chúng ta sẽ cùng nhau tìm hiểu về quản lý bộ nhớ trong ứng dụng iOS, để có thể viết ra một app thật mượt mà, chạy đúng hiệu năng, không gây lãng phí tài nguyên của điện thoại (yomost). Let go !
![](https://images.viblo.asia/5a3b2109-7399-46e9-9be7-aad5505a4d2d.png)

# Value Type & Reference Type
Là phần kiến thức rất cơ bản về Swift nhưng mình vẫn sẽ điểm qua 1 chút để mọi người cùng nhớ lại. 
- Các dạng dữ liệu là Value Type: Int, Double, String, Array,  Dictionary, Set, Struct, Enum, Tuple
- Các dạng dữ liệu là Reference Type: Func, Closure, Class

Điều khác biệt giữa chúng là mỗi Value Type thì giữ 1 ô nhớ riêng, còn các Reference Type thì cùng nhau chia sẻ 1 ô nhớ. Nghe thì có vẻ liên quan đến vấn đề quản lý bộ nhớ nhưng thực ra ko hẳn. Chúng ta ko thể tạo Reference Type thay cho Value Type để tiết kiệm ô nhớ được :v. Mà cái chúng ta cần quan tâm là chúng được tạo và lưu vào bộ nhớ như thế nào, và sẽ được xoá ra sao? 
Trong iOS thì có 2 nơi để phân bổ bộ nhớ đó là Stack và Heap. Các biến thuộc Value Type hoặc Reference Type khi khởi tạo sẽ được lưu vào 2 nơi này.
# Stack & Heap
Bộ nhớ của ứng dụng chính là RAM của điện thoại. Các biến khi khởi tạo sẽ đều được lưu vào đó. Nhưng sẽ chia ra 2 loại phân bổ để quản lí. Đó là Stack và Heap.
## Stack
- Lưu tên biến và Value Type
- Lưu func, parameter của func
- Mỗi 1 thread sẽ có 1 stack
- Tự động xoá bỏ khi hết nhiệm vụ
=> Việc quản lý bộ nhớ được diễn ra tự động mà chúng ta không cần quan tâm. 
 Khối lượng mà Stack lưu lại chỉ chiếm số ít, có nghĩa là các thành phần còn lại sẽ được lưu vào Heap
## Heap
Khác với Stack, chỉ có duy nhất 1 Heap cho 1 ứng dụng
- Các Object (Reference type) sẽ được lưu vào Heap
- Bộ nhớ Heap tăng kích thước trong quá trình sử dụng app
- Không tự động giải phóng bộ nhớ 
=> Điều này có nghĩa là lập trình viên sẽ phải tự xử lý bộ nhớ Heap. Tuy nhiên trong Swift có 1 công cụ là ARC, tự động quản lý bộ nhớ Heap. Chúng ta sẽ xem qua nó hoạt động như thế nào ở phần sau nhé.
Tổng hợp so sánh: 
![](https://images.viblo.asia/70eb5740-bd8a-4c06-b8df-77d5cc501676.png)
Nguồn ảnh: Internet

Câu hỏi học sinh giỏi: Nếu 1 Reference Type có chứa Value Type thì giá trị của ValueType sẽ được lưu ở đâu ?

Câu trả lời là trong Heap :v. Vì Reference Type được lưu trong Heap mà ^^

```
Struct Computer {
}

Class Table {
    var computer: Computer?
}
```

# ARC
Đây là viết tắt của Automatic Reference Counting. Có nghĩa là nó tự động đếm số lượng reference, nếu mà = 0 thì xoá đi. Có nghĩa là thằng nào mà không được sử dụng nữa thì xoá đi để giải phóng bộ nhớ. Đó là cơ chế của nó. Nếu như vậy thì với ARC, việc quản lý bộ nhớ cũng giống như Stack, chẳng phải quan tâm nhiều nữa nhỉ ?
Nhưng trong quá trình code app. Nhiều khi chúng ta phải code những logic phức tạp và do sơ suất nên đã gây ra một thứ gọi là RetainCycle (2 strong reference giữ nhau), điều này khiến cho cơ chế của ARC không thể thực hiện được. Và nếu bộ nhớ không được giải phóng và tái sử dụng thì nó sẽ gây ra rò rỉ bộ nhớ hay Memory Leak!. Vậy cốt yếu là chúng ta phải code làm sao để không bị Retain Cycle
# RetainCycle
Đây là hiện tượng 2 reference giữ nhau. Ví dụ như là trong 1 class A có chứa class B và chính class B này cũng chứa class A

![](https://images.viblo.asia/b41ce644-1c93-4d67-80a0-e4a17c3c7965.png)

Giả sử ta có class 

```
Class Mobile {
	var screen: Screen?
}

Class Screen {
	var mobile: Mobile?
}

var mobile = Mobile()
var screen = Screen()
mobile.screen = screen
screen.mobile = mobile
```

Xin chúc mừng, bạn đã quay vào ô RetainCycle :v. Class Mobile chứa Screen và ngược lại, Screen cũng chứa mobile.

Vậy làm sao để khắc phục? Câu trả lời là chúng ta phải chuyển 1 trong 2 Strong Reference (tham chiếu mạnh) thành 1 Weak Reference (tham chiếu yếu)

```
Class Mobile {
Weak var screen: Screen? 
}
Class Screen { 
var mobile: Mobile? 
}
var mobile = Mobile() 
var screen = Screen() 
mobile.screen = screen screen.mobile = mobile
```

Về lý thuyết thì cũng khá dễ để hiểu và nắm bắt. Tuy nhiên trong thực tế thì có những trường hợp khó phát hiện hơn một chút, đặc biệt là với người mới bắt đầu. Ví dụ sau là một điển hình

```
Class Computer {
var didTap: ((_ value: Int?) -> Void)?
}

Class Table {
	var computer = Computer()
	func loadUI() {
		computer.didTap = { value
			self.log(String(value))
		}
	}
	
	func log(string: String) {
		print(string)
	}
}
```

Phân tích: Trong class Table chứa Class Computer. Và khi implement block didTap() thì block này lại chứa self.log(). có nghĩa là chứa class Table(). Như vậy là đã có 2 Strong Reference giữ nhau.
 Để giải quyết trường hợp này, chúng ta chuyển 1 trong 2 Object về weak là có thể phá vỡ liên kết chặt. Ở đây có thể làm như sau

```
Class Computer {
var didTap: ((_ value: Int?) -> Void)?
}

Class Table {
	var computer = Computer()
	func loadUI() {
		computer.didTap = { [weak self] value
			self?.log(String(value))
		}
	}
	
	func log(string: String) {
		print(string)
	}
}
```
# Deinit

Class trong swift cung cấp 1 hàm là deinit. Hàm này chỉ chạy trước khi class được giải phóng bộ nhớ. Vậy muốn biết một Class đã được giải phóng hay chưa, chỉ cần check xem hàm deinit có được gọi khi set về nil hay không.
 Điều này rất hữu dụng để check retain Cycle trong UIViewController()

Ví dụ 

```
Class ScreenA: UIViewController {
	override func viewDidLoad() {
	}
	
	deinit {
	print(“Screen A Deinit”)
	}
}

var screenA = ScreenA.init()

screenA = nil

// Screen A Deinit
```

Trong trường hợp trên, class đã gọi vào hàm deinit, như vậy cơ chế ARC có thể hoạt động bình thường để giải phóng bộ nhớ một cách bình thường.
Chúng ta nên tạo thói quen kiểm tra các hàm deinit trong class nói chung và UIViewController nói riêng. Trường hợp UIViewController dismiss thì hàm deinit phải được gọi. Nếu không thì cần kiểm tra lại code xem có retain cycle không !
# Strong, Weak và Unowned
Trong Swift, thông thường 1 biến khi khao báo thì sẽ mặc định là Strong Reference, có nghĩa là tham chiếu mạnh.
Ví dụ

`let computer = Computer?`

Và để thay đổi nó là tham chiếu yếu, ta thêm từ khoá weak, hoặc unowned

`weak let computer = Computer?`

`unowned let computer  = Computer?`

Điều này dùng để phá vỡ liên kết chặt, như ở ví dụ bên trên phần Deinit, tuy nhiên ở đấy có 2 cách là dùng weak hoặc unowned. Như vậy sự khác nhau giữa chúng là gì?

## Khác nhau giữa weak và unowned
Về bản chất thì chúng đều là không làm tăng reference count, từ đó được ARC giải phóng. Nhưng chúng ta sẽ sử dụng unowned khi instance này có tuổi đời lớn hơn hoặc bằng so với instance còn lại. Bởi vì theo quy định thì biến unowned sẽ phải luôn có giá trị khi được gọi đến. 
**Điều đó cũng có nghĩa unowned là non-optional trong khi weak là optional.**

Như vậy để sử dụng unowned cho ví dụ phần deinit:

```
Class Computer {
var didTap: ((_ value: Int?) -> Void)?
}

Class Table {
	var computer = Computer()
	func loadUI() {
		computer.didTap = { [weak self] value
			self?.log(String(value))
		}
	}
	
	func log(string: String) {
		print(string)
	}
}
```

Có thể chuyển đổi thành như sau:

```
Class Computer {
var didTap: ((_ value: Int?) -> Void)?
}

Class Table {
	var computer = Computer()
	func loadUI() {
		computer.didTap = { [unowned self] value
			self.log(String(value))
		}
	}
	
	func log(string: String) {
		print(string)
	}
}
```

Như vậy thì trong trường hợp này, unowned sẽ giúp chúng ta không cần phải unwrap biến self nữa. Vì nó là non-optional. Tuy vậy, nếu trường hợp self khi được closure này capture đã nil. Có nghĩa là chúng ta đang truy cập vào 1 biến nil, không khác gì sử dụng dấu `!` để force unwrap 1 biến nil cả. Điều đó sẽ dẫn tới crash !!!

Chính vì thế, lựa chọn giữa việc sử dụng unowned thay cho weak chỉ để tiết kiệm thời gian unwrap là **không phổ biến**. Bằng chứng là chúng ta sẽ ít tìm thấy unowned trong các dự án.
Tuy nhiên nếu bạn có một trình độ cao cũng như có khả năng quản lý code tốt thì sử dụng unowned để code trở nên sạch đẹp, chặt chẽ cũng là một lựa chọn không tồi.

[Xem thêm](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html)

Trên đây là toàn bộ bài chia sẻ của mình về quản lý bộ nhớ trong iOS, do mình tìm hiểu và tổng hợp lại. Rất mong sẽ giúp ích cho các bạn trong quá trình tìm hiểu về nó. Cảm ơn đã đọc bài viết !