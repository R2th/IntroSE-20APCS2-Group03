Cách truyền thống, ngôn ngữ lập trình hướng đối tượng, chúng ta tạo những lớp (đây là kiểu tham chiếu (reference type)) như là bản thiết kế cho những đối tượng của chúng ta. Trong swift, không giống như những ngôn ngữ hướng đối tượng khác. struct có nhiều tính năng tương tự class, tuy nhiên chúng là kiểu dữ liệu giá trị (value type). Apple đã nói rằng chúng ta nên ưu tiên value type như là struct hơn là value type nhưng điểm tiến bộ hơn của nó là gì. Swift thật sự có nhiều sự lựa chọn chúng ta có thể dùng và trong chương này chúng ta sẽ nhìn vào tất cả những kiểu đó và xem ưu và khuyết điểm của chúng. Biết cách và khi nào dùng mõi kiểu dữ liệu là 1 phần quan trọng để thực thi lập trình hướng đối tượng trong dự án của bạn.

Trong chương này bạn sẽ học theo những mục sau:

	⁃	Class là gì và cách dùng nó
    
	⁃	Struct là gì và cách để dùng nó
    
	⁃	Enumeration là gì và cách dùng
    
	⁃	Tuple là gì và cách dùng
    
	⁃	Sự khác nhau giữ value và reference types

Swift phân loại những kiểu dữ liệu thành những loại được đặt tên hoặc những loại cấu thành. 

Một kiểu được đặt tên là kiểu có thể đưa ra tên gọi khi nó được định nghĩa. Những kiểu được đặt tên như class, struct, enumeration, và protocol. Thêm vào nữa là  kiểu do người dùng định nghĩa, swift cũng định nghĩa nhiều kiểu thông dụng trong thư viện của swift như arrays, set, dictionaries.

Nhiều kiểu dữ liệu chúng ta xem như là kiểu cơ bản trong những ngôn ngữ khác nhưng thật sự là kiểu đặt tên trong swift và được thực thi trong thư viện chuẩn của swift bằng struct. Những kiểu này là những thể hiện cho kiểu số, chuỗi, kí tự, và giá trị logic. Những kiểu được thực thi như là kiểu đặt tên, chúng ta có thể mở rộng hành vi của chúng bằng extension như là cách chúng ta làm với những kiểu đặt tên khác. Đây là tính năng hữu ích của ngôn ngữ swift và trụ cột chính của nó là lập trình hướng protocol. Chúng ta sẽ xem xét ở chương 3 Extension.
	Một kiểu cấu thành là kiểu không dc đặt tên khi nó được định nghĩa. Trong swìt chúng ta có 2 kiểu cấu thành: function và tuple. Funvtion thể hiện là closures, functions, và methods. Trong khi tuple là kiểu danh sách được bắt đầu { phân chia các phần tử bởi dấu “,” và kết thúc }. Chúng ta có thể dùng typealias để định nghĩa

Có 2 thể loại của kiểu: kiểu tham chiếu và kiểu tham trị. 
* Khi chúng ta truyền một thực thể kiểu tham chiếu, chúng ta đang truyền một tham chiếu của một thực thể gốc. Điều này có nghĩa là 2 tham chiếu đang chia sẽ cùng thực thể. Class là kiểu tham chiếu.
* Khi ta truyền một thực thể kiểu tham trị, chúng ta đang truyền một bản sao chép của thực thể đó điều này có nghĩa là  mõi thực thể nhận một bản sao chép độc nhất.Kiểu tham trị bao gồm struct, enumeration, tuples.

Mõi kiểu dữ liệu trong swift sẽ có tên gọi hoặc không có tên gọi, Chúng cũng có thể là tham trị hoặc tham chiếu ngoại trừ protocol. Vì vậy chúng ta không thể tạo một thực thể protocol vì nó không phải kiểu tham chiếu hay tham trị. nghe khá khó hiểu, nhưng nó thực sự là vậy. Như chúng ta đã thấy tất cả các sự lựa chọn của kiểu và cách chúng ta có thể dùng chúng, chúng ta sẽ dễ dàng để hiểu.

Bây giờ chúng ta nhìn xem những sự lựa chọn kiểu chúng ta có trong swift, Chúng ta sẽ nhìn về bộ khung sường của lập trình hướng đối tượng là class.

**CLASSES**

Trong ngôn ngữ lập trình hướng đối tượng, chúng ta không thể tạo một đối tượng mà không có một bản thiết kế để nói cho ứng dụng biết những thuộc tính và phương thức được mong đợi từ đối tượng. Trong hầu hết ngôn ngữ hướng đối tượng, bản thiết kế này có hình dạng của một lớp. Một class là một cấu trúc cho phép chúng ta đóng khối những thuộc tính và phương thức và hàm khởi tạo của một đối tượng 1 mình nó. Nhiều class có thể bao gồm những thành phần khác, tuy nhiên chúng ta sẽ tập trung vào thành phần cơ bản làm nên class không chỉ trong swift mà trong những ngôn ngữ khác.
```
class MyClass {
     var oneProperty: String
     init(oneProperty: String) {
       self.oneProperty = oneProperty
} 
     func oneFunction() {
    } 
} 
```

Một thực thể của class được gọi là đối tượng. Tuy nhiên trong swift, struct và class có nhiều chức năng giống nhau, do đó chúng ta sẽ dùng từ thực thể khi tham chiết tới thực thể của từng loại.
Bất cứ ai đã dùng ngôn ngữ lập trình hướng đối tượng trong quá khứ có thể quen thuộc với kiểu class. Nó chính là khái niệm xương sống của lập trình hướng đối tượng nó chính là sự khởi đầu.

Khi chúng ta tạo một thực thể của class, nó có tên, do đó class là kiểu được đặt tên. class cũng là kiểu tham  chiếu.

Kiểu tiếp theo chúng ta cùng xem được xem là quan trọng nhất trong ngôn ngữ swift là struct.

**Structures**

Apple đã nói rằng nhà phát triển swift nên ưu tiên kiểu giá trị hơn là kiểu tham chiếu. và dường như họ cũng đã ghi nhớ triết lý đó. Nếu bạn nhìn vào thư viện chuẩn của swift bạn sẽ thấy đa phần những kiểu dữ liệu được thực thi bằng struct. Nguyên nhân apple có thể thực thi phần lớn thư viện của họ với struct đó là struct có nhiều chức năng giống với class. Tuy nhiên một vài sự khác nhau cơ bản giữa class và struct chúng ta sẽ tìm hiểu ở phần sau trong chương này.

trong swift, một struct là một cấu trúc cho phép chúng ta đóng khối các thuộc tính và phương thức và hàm khởi tạo trong chính nó. chúng ta cũng có thể bao gồm những thành phần khác như subscripts. Tuy nhiên chúng ta đang tập trung vào thành phần cơ bản nhất làm nên 1 struct. Phần diễn tả này khá giống với phần diễn tả của class trong phần trên. Bởi vì class là struct thì rất giống nhau trong swift. tôi biết chúng ta đã đề cập đến việc này. nhưng nó rất quan trọng để hiểu cách mà struct và class thì tương tự, và nó cũng cần thiết để hiểu cách thức khách nhau của từng loại.
```
struct MyStruct {
     var oneProperty: String
     func oneFunction() {
    } 
} 
```
Nếu chúng ta so sánh struct này với class ở phần trước chúng ta có thể thấy một vài điểm khách nhau cơ bản. Trong struct chúng ta không cần định nghĩa hàm khởi tạo bởi vì struct sẽ tạo một hàm khởi tạo mặt định cho chúng ta nếu chúng ta không cung cấp nó để thiết lập cho những thuộc tính cần khởi tạo. Hàm khởi tạo mặc định đòi hỏi chúng ta phải cung cấp giá trị mặc định cho tất cả các thuộc tính ko phải optional khi chúng ta tạo một thực thể từ struct.

Một sự khác biệt chúng ta không thấy đó là từ khoá mutating được dùng cho một số phương thức được định nghĩa trong struct. struct là kiểu tham trị, do đó mặc định là thuộc tính trong struct không thể bị thay đổi từ phương thức của thực thể. Bằng cách dùng mutating từ khoá chúng ta đang chọn hành vi thay đổi cho phương thức cụ thể. Chúng ta nên dùng từ khoá mutating cho bất cứ phương thức nào ở trong struct để thay đổi giá trị của thuộc tính trong struct. 

**Quản lý truy xuất**

Quản lý truy xuất thì rất hữu ích khi chúng ta phát triển các frameworks. Để dùng framework chúng ta cần đánh dấu phần giao diện bên ngoài là public để những module khác hoặc ứng dụng import framework có thể dùng chúng. Chúng ta nên dùng internal và private access để quản lý truy xuất để đánh dấu cho phần giao diện mà chúng ta muốn dùng bên trong framework.

Để định nghĩa mức độ truy xuất, chúng ta đặt tên cho mức độ trước khi định nghĩa phần nội dung của nó. theo như code
```
private struct EmployeeStruct {}
public var firstName = "Jon"
internal var lastName = "Hoffman"
private var salaryYear = 0.0
public func getFullName() -> String {} 
fileprivate func giveBonus(amount: Double) {} 
open func giveRaise(amount: Double) {} 
```

Có một số hạn chế với việc quản lý truy cập, nhưng những hạn chế này để đảm bảo rằng mức độ truy cập trong swift theo một nguyên lý: no entity can be defined in terms of another entity that has a lower (more restrictive) access level. (tạm dịch: không có thực thể nào có thể được định nghĩa bên trong thực thể khác mà nó có mức độ truy xuất thấp hơn)

Đây có một số ví dụ chứng mình cho quy luật này.
- Chúng ta không thể đánh dấu một phương thức là public khi một trong những biến số hoặc kiểu trả về của nó ở mức truy xuất là private bởi vì phía ngoài code không thể truy cập vào kiểu private
- Chúng ta không thể thiết lập mức độ quản lý truy xuất cho một phương thức hay một thuộc tinh là pubic khi class hoặc struct có một mức độ truy xuất là private bởi vì phía bên ngoài code không thể truy xuất vào kiến trúc bên trong khi lớp này là private

**Enumerations**

Trong hầu hết các ngôn ngữ, enumeration hơn là một kiểu dữ liệu nó chứa đựng một tập hợp của tên giá trị được gọi là phần tử. Trong swift enumerations có một sự thay đổi to lớn để cho nó nhiều sức mạnh hơn. Enumeration trong swift thì khá gần với class hoặc struct. Tuy nhiên chúng ta có thể vẫn dùng giống như những ngôn ngữ khác.
Trước khi chúng ta xem enumeration có sự tăng cấp trong swift. Chúng ta sẽ dùng nó như enumeration thông thường.
```
enum Devices
   {
     case IPod
     case IPhone
     case IPad
} 
```
Một nguyên nhân tại sao enumeration trong swift khác  khi so sánh với những ngôn ngữ khác có là chúng ta có thể xác định giá trị được biết như là giá trị thô. Như ví dụ trên chúng ta có thể định nghĩa lại Devices
```
enum Devices: String {
     case IPod = "iPod"
     case IPhone = "iPhone"
     case IPad = "iPad"
}
```
Chúng ta có thể dùng rawValue để nhận lại giá trị thô của một phần tử trong enumerations
 Devices.IPod.rawValue
Trong swift chúng ta có thể lưu giá trị có liên quan trong cùng  trường hợp của giá trị. Những giá trị liên quan có thể là bất kì kiểu gì và có thể thay đổi cho từng trường hợp. Việc này cho phép chúng ta có thể lưu thêm thông tin tuỳ chọn với kiểu dữ liệu của chúng ta. Cùng xem cách thực hiện
```
enum Devices {
	case iPod(model: Int, year: Int, memory: Int)
	case iPhone(model: String, memory: Int)
	case iPad(model: String, memory: Int)
}
```
Trong ví dụ trước, chúng ta định nghĩa 3 loại giá trị có liên kết với ipod và 2 giá trị có liên kết với IPhone và Ipad. Chúng ta có thể dùng new Devices như sau
```
var myPhone = Devices.iPhone(model:”6”,memory:64)
var myTablet = Devices.iPad(model:”Pro”,memory:128)
```
Trong ví dụ này chúng ta định nghĩa myPhone là iPhone 6 với bộ nhớ 64GB, và myTablet là ipad pro với 128GB. chúng ta có thể nhận giá trị liên kết theo như sau:
```
switch myPhone {
	case .iPod(let model, let year, let memory):
		print(“iPod : \(model) \(memory)”)
	case .iPhone(let model, let memory)
		print(“iphone: \(model) \(memory)”)
	case .iPad(let model, let memory)
		print(“ipad: \(model) \(memory)”)
}
```
Trong ví dụ này chúng ta sẽ chỉ đơn giản in những giá trị liên kết của thiết bị myPhone. cái gì làm cho chúng ta nghĩ rằng enumeration có nhiều sức mạnh hơn enumeration trong các ngôn ngữ khác. Tuy nhiên chúng ta vẫn chưa hoàn thành việc trình bày những gì enumeration có thể làm trong swift. Trong swift enumeration không bị giới hạn chỉ là một danh sách những phần tử. Chúng ta cũng có thể chứa các thuộc tính tính toán, hàm khởi tạo, phương thức giống như class hay struct.
Chúng ta cùng xem cách dùng phương thức và thuộc tính tính toán với enumeration.
```
enum Reindeer: String {
	case Dasher, Dancer, Prance, Vixen, Comet, Cupid, Donner, Blitzen,Rudolph
	static var allCases: [Reindeer] {
		return [Dasher, Dancer, Prance, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph]
	}
	static func randomCase() ->  Reindeer {
		let randomValue = Int (arc4random_uniform(UInt32(allCases.count)))
		return allCases[randomValue]
	}
}
```
Trong ví dụ này chúng ta đã tạo một enumeration Reindeer cái chứa đựng tên của 9 con tuần lộc với enumeration Reindeer chúng ta tạo thuộc tính tính toán là allCases để trả ra mảng chứa tất cả các trường hợp có thể của enumeration. Chúng ta cũng tạo hàm randomCase() để trả ra một giá trị ngẫu nhiên từ enumeation.
Ví dụ bên trên đã chỉ ra cách để dùng những tính năng của enumeration 1 cách độc lập. Nhưng sức mạnh thực sự của chúng là kết hợp những tính năng đó lại với nhau. Cùng xem thêm ví dụ nơi chúng ta kết hợp những giá trị liên kết với những phương thức và những thuộc tính để tăng khả năng của enumeration. Chúng ta sẽ bắt đầu bằng việc định nghĩa một enumeration có bản về các loại của một quyển sách, với số trang, và giá cho mõi loại định dạng trong giá trị liên kết
```
enum BookFormat {
	case PaperBack (pageCount: Int, price: Double)
	case HardCover (pageCount: Int, price: Double)
	case PDF (pageCount: Int, price: Double)
	case EPub (pageCount: Int, price: Double)
	case Kindle (pageCount: Int, price: Double)
}
```
enumeration này sẽ làm việc rất tuyệt vời nhưng có một vài nhược điểm. Đầu tiên nó thực sự khiến tôi phát điên, khi chúng ta nhận những giá trị liên kết từ enumeration của chúng ta. 
ví dụ 

```var paperBack = BookFormat.PaperBack(pageCount: 220, price: 39.99)```

Bây giờ  để nhận về số trang và giá trong enumeration chúng ta có thể dùng
```
switch paperBack {
     case .PaperBack(let pageCount, let price):
       print("\(pageCount) - \(price)")
     case .HardCover(let pageCount, let price):
       print("\(pageCount) - \(price)")
     case .PDF(let pageCount, let price):
       print("\(pageCount) - \(price)")
     case .EPub(let pageCount, let price):
       print("\(pageCount) - \(price)")
     case .Kindle(let pageCount, let price):
       print("\(pageCount) - \(price)")
} 
```
Việc này cần 1 ít code để nhận về giá trị của các giá trị liên kết, đặt biệt nơi chúng ta có thể nhận những giá trị ở nhiều nơi trong code của chúng ta. Chúng ta có thể tạo một hàm toàn cục để nhận về giá trị nhưng chúng ta có cách tốt hơn trong swift. Chúng ta có thể thêm vào một biến tính toán trong enumeration của chúng ta để trả về giá trị pageCount và price
```
enum BookFormat {
     case PaperBack (pageCount: Int, price: Double)
     case HardCover (pageCount: Int, price: Double)
     case PDF (pageCount: Int, price: Double)
     case EPub (pageCount: Int, price: Double)
     case Kindle (pageCount: Int, price: Double)

	var pageCount: Int {
		switch self {
			case .PaperBack(let pageCount, _):
           return pageCount
       case .HardCover(let pageCount, _):
           return pageCount
       case .PDF(let pageCount, _):
           return pageCount
       case .EPub(let pageCount, _):
           return pageCount
       case .Kindle(let pageCount, _):
           return pageCount

		}
	}

	var price: Double {
         switch self {
           case .PaperBack(_, let price):
             return price
           case .HardCover(_, let price):
             return price
           case .PDF(_, let price):
             return price
           case .EPub(_, let price):
             return price
           case .Kindle(_, let price):
             return price
        } 
    } 

}
```

Với những thuộc tính tính toán này chúng ta có thể dễ dàng nhận được giá trị của các giá trị liên kết từ enumeration BookFormat.
```
var paperBack = BookFormat.PaperBack(pageCount: 220, price: 39.99)
   print("\(paperBack.pageCount) - \(paperBack.price)")
```
Những thuộc tính tính toán này ẩn đi sự phức tạp của câu lệnh switch và cung cấp nhiều sự rõ ràng hơn
Chúng ta cũng có thể thêm phương thức tới enumeration của chúng ta . Ví dụ nếu một người mua nhiều bản sao sách của chúng ta trong những định dạng khác nhau, họ sẽ nhận 20% giảm giá.
```
func purchaseTogetther(otherFormat: BookFormat) -> Double {
	return (self.price + otherFormat.price) ) * 0.80
}
```
Chúng ta dùng phương thức này như sau:
```
    var paperBack = BookFormat.PaperBack(pageCount: 220, price: 39.99)
    var pdf = BookFormat.PDF(pageCount: 180, price: 14.99)
    var total = paperBack.purchaseTogether(otherFormat: pdf)
```
Như chúng ta đã thấy enumeration trong swift có nhiều sức mạnh hơn enumeration trong những ngôn ngữ khác. một điều để tránh sử dụng chúng quá nhiều. Chúng không có nghĩa là một sự thay thế cho class hay struct. Sâu thẳm bên dưới thì enumeration vẫn là một kiểu dữ liệu chứa một tập hợp có giới hạn và tất cả những đặt điểm thú vị của chúng làm cho chúng hữu ích với chúng ta.

Khi chúng ta tạo những thực thể của enumeration, nó có tên do đó nó là loại kiểu có tên. Enumeration cũng là loại tham trị. Bây giờ sẽ tìm hiểu về tuples ít dc sử dụng.

**Tuples**

Trong swift, một tuple là một tập hợp hữu hạn, có thứ tự, phân chia danh sách các phần tử bằng dấu ,. Trong khi có những tuple trong những ngôn ngữ khác tôi đã từng dùng. Tôi không bao giờ thật sự xem xét những lợi thế của chúng. Tôi chỉ mơ hồ cảm nhận rằng chúng có tồn tại trong những ngôn ngữ đó. Trong swift, tuple có nhiều tiềm năng hơn những ngôn ngữ khác, cái mà buộc tôi chú ý đến nó. Cái tôi đã tìm ra nó thật hữu ích để dùng chúng. Theo quan điểm của tôi, tuples là một trong những kiểu dữ liệu ít được dùng trong swift, nên tôi sẽ chi tập trung vào những trường hợp phổ biến khi dùng tuple.

Chúng ta có thể tạo một tuple và truy cập thông tin trong nó như sau:
```
let mathGrade1 = (“Jon”,100)
let (name, score) = mathGrade1
print(“\(name) - \(score)”)
```
Ví dụ bên trên chúng ta đã nhóm một kiểu String và một kiểu Integer vào trong một tuple duy nhất. Chúng ta sau đó phân tách tuple bằng mẫu này, nó sẽ đặt giá trị vào trong hằng số name và score.

Cái chúng ta đã thấy trong ví dụ trên là một tuple không có tên, Những tuple làm việc như một cái kẹp, nhưng tôi nhận thấy rằng tôi thường đặt tên cho tuple bởi vì nó sẽ dễ dàng để nhận giá trị từ một tuple có tên. Chúng ta có thể tạo một tuple có tên và truy xuất thông tin lữu trữ bên trong nó được trình bày dưới đây
```
let mathGrade2 = (name: “Jon”, grade:100)
print(“\(mathGrade2.name) - \(mathGrade2.grade)” )
```
Để ý rằng chúng đa đã nhóm giá trị kiểu String và Integer trong tuple, chúng ta gán cho mõi giá trị một cái tên. Chúng ta có thể dùng những tên này để truy cập thông tin bên trong tuple, do đó tránh bước phân rã.

Apple đã thông báo rằng chúng ta có thể dùng tuple như một kiểu dữ liệu trả về cho một hàm để có thể trả về nhiều giá trị hơn. Ví dụ tiếp theo sẽ trình bày cách chúng ta dùng tuple cho việc trả về nhiều giá trị từ một hàm:
```
func calculateTip(billAmount: Double,tipPercent: Double) -> (tipAmount: Double, totalAmount: Double) {
	let tip = billAmount * (tipPercent/100)
       let total = billAmount + tip
       return (tipAmount: tip, totalAmount: total)
}
```
Trong ví dụ này chúng ta đã tạo một phương thức calculateTip() để tính tiền hoa hồng dựa vào billAmount và tipPercentage đã được truyền vào phương thức. Chúng ta sau đó trả về cả tiền hoa hồng và toàn bộ chi phí hoá đơn.

Chúng ta có thể dùng phương thức này như sau:
```
var tip calculateTip(billAmount: 31.98, tipPercent:20)
print(“\(tip.tipAmont) - \(tip.totalAmount)”)
```
Những gì chúng ta thấy trong chương này là cách dùng tuple trong swift, Khi chúng ta đi qua hết cuốn sách này, chúng ta sẽ dùng tuple trong những ví dụ khác nhau. Tuples rất hữu dụng khi chúng ta muốn truyền một tập hợp dữ liệu trong code của mình.
Trong swift, một tuple là một kiểu tham trị. Tuples cũng là kiểu cấu thành, tuy nhiên chúng ta cũng có thể dùng typealias cho một tuple. Như ví dụ dưới đây
```
typealias myTuple = (tipAmount: Double, totalAmount: Double)
```
Trong swift thì protocol cũng được xem là một kiểu dữ liệu

**Protocol**

Khá ngạc nhiên khi protocol được xem là một kiểu dữ liệu nhưng chúng ta không thể thực sự tạo một thực thể từ chúng. Tuy nhiên chúng ta có thể dùng chúng như một kiểu dữ liệu. Điều này có nghĩa là gì. Khi chúng ta định nghĩa kiểu cho một biến, hằng số, tuple hoặc tập hợp ,chúng ta có thể dùng protocol.
Chúng ta không lặp lại protocol trong phần này chúng ta đã thực sự nói về chúng trong chương 1. Tuy nhiên điều quan trọng cần được hiểu đó là chúng được xem là 1 kiểu dữ liệu.

Mõi kiểu dữ liệu chúng ta thảo luận trước đây đều có thể là kiểu tham trị hoặc tham chiếu. Tuy nhiên một protocol thì không phải là loại nào trong 2 loại trên bởi vì không thể tạo thực thể từ chúng.

Một điều thực sự quan trọng cần phải hiểu 1 cách hoàn chỉnh đó là sự khác biệt giữa kiểu tham trị và kiểu tham chiếu trong swift. vậy cùng so sánh chúng nào.

**Value and reference types**

Có một số sự khác nhau cơ bản giữ kiểu tham trị (struct,enumeration,tuples) và kiểu tham chiếu (classes) đó là cách mà thực thể của kiểu tham trị và tham chiếu được truyền đi. Khi chúng ta truyền một thực thể của kiểu tham trị chúng ta thực sự truyền một bản sao của thực thể góc. Điều này có nghĩa là sự thay đổi được tạo ra trên một thực thể sẽ không ảnh hưởng ngược lại với thực thể còn lại. Khi chúng ta truyền một thực thể của kiểu tham chiếu, chúng ta truyền một tham chiếu của thực thể gốc. Điều này có nghĩa là cả 2 thực thể cùng tham chiếu tới cùng một thực thể. Do đó một sự thay đổi sẽ từ 1 thực thể sẽ ảnh hưởng đến thực thể khác.

Phần giải thích trong đoạn trên thì khá là thẳng thắng, tuy nhiên nó là một khái niệm quan trọng bạn cần phải hiểu. trong phần này chúng ta đang kiểm tra sự khác biệt giữa kiểu tham trị và kiểu tham chiếu để chúng ta hiểu những lợi thế cũng mõi cái, cũng như tránh dc những cạm bẫy khi dùng chúng.

Bắt đầu tạo 2 kiểu dữ liệu. một cái là struct (kiểu tham trị) và cái khác là class (kiểu tham chiếu) . Chúng ta sẽ dùng những kiểu này trong phần này để chứng mình sự khác nhau giữa 2 kiểu này. Kiểu đầu tiên chúng ta sẽ đặt tên MyValueType sẽ thực thi nó bằng struct.
```
struct MyValueType {
	var name: String
	var assignment: String
	var grade: Int
}
```
Trong MyValueType chúng ta có 3 thuộc tính. 2 cái kiểu String 1 cái kiểu integer. Bây giờ cùng xem cách thực thi bằng class
```
class MyReferenceType {
	var name: String
	var assignment: String
	var grade: Int
	init(name: String,assignment: String,grade: Int) {
		self.name = name
		self.assignment = assignment
		self.grade = grade
	}
}
```
MyReferenceType định nghĩa 3 thuộc tính như MyValueType, tuy nhiên chúng ta cần phải định nghĩa hàm khởi tạo trong MyReferenceType. Chúng ta không làm điều này trong MyValueType. Nguyên nhân là struct cung cấp cho chúng ta hàm khởi tạo mặc định sẽ khởi tạo tất cả những thuộc tính nào cần phải khởi tạo nếu chúng ta không cung cấp giá trị mặc định cho nó.
Cùng nhìn cách chúng ta dùng những kiểu này
```
var ref = MyReferenceType(name:”Jon”,assignment:”Math test 1”, grade: 90)
var val = MyValueType(name: “Jon”, assignment: “Math Test 1”, grade:90)
```
Như bạn có thể nhìn thấy một thực thể của struct được tạo ra giống như cách một thực thể của class. Có thể dùng cùng định dạng để tạo những thực thể của struct và class thì rất tốt vì nó làm cuộc sống đơn giản hơn. Tuy nhiên chúng ta nên nhớ rằng kiểu tham trị có hành xử một cách khác so với kiểu tham chiếu. các bạn cùng xem. điều đầu tiên chúng ta cần là là tạo 2 chức năng sẽ thay đổi điểm số cho những thực thể đó
```
func extraCreditReferenceType(ref: MyReferenceType: extraCredit:Int) {
	ref.grade += extraCredit
}

func extraCreditValueType(val: MyValueType, extraCredit:Int) {
	var val = val
	val.grade += extraCredit
}
```
Mõi function nhận và một thực thể của 2 kiểu dữ liệu và một giá trị bổ sung. Trong hàm chúng ta sẽ thêm giá trị bổ sung này vào điểm số. Bây giờ cùng xem chuyện gì sẽ xảy ra khi dùng những hàm này
```
var ref = MyReferenceType(name: "Jon", assignment: "Math Test 1", grade: 90)
 extraCreditReferenceType(ref: ref, extraCredit: 5)
 print("Reference: \(ref.name) - \(ref.grade)")
```
Trong đoạn code trên chúng ta tạo thực thể kiểu tham chiếu với giá trị điểm số là 90. Chúng ta sau đó dùng hàm  extraCreditReferenceType và thêm 5 điểm vào điểm số. khi chạy đoạn code thì kết quả là  

Reference: Jon - 95

5 điểm đã được cộng thêm vào. Bây giờ thử làm việc tương tự với MyValueType
```
var val = MyValueType(name: "Jon", assignment: "Math Test 1", grade: 90)
   extraCreditValueType(val: val, extraCredit: 5)
   print("Value: \(val.name) - \(val.grade)")
```

Kết quả Value: Jon - 90

như đã thấy 5 điểm đã không dc thêm vào. Nguyên nhân của việc này là khi chúng ta truyền thực thể kiểu tham trị vào trong 1 hàm thì chúng ta thực sự truyền một bản sao từ bản thực thể gốc. Điều này có nghĩa là khi chúng ta thêm giá trị bổ sung trong hàm extraCreditValueType chúng ta đang thêm vào thực thể sao chép của bản gốc. Kết quả sự thay đổi này không ảnh hưởng đến bản gốc.

Dùng kiểu tham trị bảo vệ chúng ta khỏi những sự thay đổi bất ngờ tới thực thể của chúng ta bởi vì những thực thể được khoanh vùng trong hàm hoặc kiểu ở nơi mà nó được tạo. Kiểu tham trị cũng bảo vệ chúng ta khỏi những thực thể có nhiều tham chiếu tới cùng một thực thể. Cùng xem điều này để chúng ta có thể hiểu và các loại vấn đề  chúng ta có thể đối mặt khi dùng kiểu tham chiếu. Chúng ta sẽ bắt đầu bằng cách tạo một hàm được thiết kế để nhận một điểm số cho một bài tập từ một kho dữ liệu. Tuy nhiên chúng ta sẽ đơn giãn là phát sinh ngẫu nhiên 1 điểm ngẫu nhiên. 
```
func getGradeForAssignment(assignment: MyReferenceType) {
     // Code to get grade from DB
     // Random code here to illustrate issue
     let num = Int(arc4random_uniform(20) + 80)
     assignment.grade = num
     print("Grade for \(assignment.name) is \(num)")
   }
```
Hàm này được thiết kế để nhận về điềm của phần bài tập được giao cái mà được định nghĩa trong thực thể MyReferenceType đã được truyền vào hàm. Một điểm dc nhận về chúng ta sẽ dùng nó để thiết lập giá trị điểm số cho thực thể MyReferenceType. Chúng ta cũng sẽ in điểm ra ngoài vì vậy chúng ta sẽ có thể nhìn thấy được điểm số đó là gì. cùng nhìn xem tại sao chúng ta sẽ không muốn dùng hàm này.
```
var mathGrades = [MyReferenceType] ()
var students = [“Jon”,”Kim”,”Kailey”,”Kara”]
var mathAssignment = MyReferenceType(name:””, assignment:”Math Assignment”, grade:0)
for student in students {
	mathAssignment.name = student
	getGradeForAssignment(assignment: mathAssignment)
	mathGrades.append(mathAssignment)
}
```
Trong ví dụ trên chúng ta tạo một mảng mathGrades để chứa những điểm số cho những phần bài tập được giao và một mảng students để chứa tên cùng những sinh viên chúng ta muốn nhận điểm số của họ. Chúng ta sau đó tạo một thực thể của lớp MyReferenceType chứa đựng tên của phần bài tập được giao. Chúng ta sẽ dùng thực thể này để yêu cầu điểm số từ hàm getGradeForAssignment. Bây giờ thì mọi thứ đã được định nghĩa chúng ta sẽ lặp qua danh sách sinh viên để nhận những điểm số. Kết quả mong muốn xuất ra như sau:
```
Grade for Jon is 90
   Grade for Kim is 84
   Grade for Kailey is 99
   Grade for Kara is 89
   ```
Kết quả xuất hiện chính xác như những gì chúng ta muốn. Tuy nhiên có một bug rất lớn trong đoạn code này.
khi chúng ta lặp qua danh sách mathGrades 
```
for assignment in mathGrades {
     print("\(assignment.name): grade \(assignment.grade)")
} 
kết quả là
Kara: grade 89
   Kara: grade 89
   Kara: grade 89
   Kara: grade 89
   ```
Đây không phải là thứ chúng ta muốn. Nguyên nhân chúng ta thấy những kết quả này là bởi vì chúng ta đã tạo một thực thể kiểu MyReferenceType  và sau đó chúng ta tiếp tục cập nhật thực thể này. Việc này có nghĩa là chúng ta tiếp tục ghi đè lên tên và điểm số của phần tử trước đó. Bởi vì MyReferenceType là kiểu tham chiếu, tất cả tham chiếu trong mảng mathGrades đều chỉ đến cùng một thực thể của kiểu MyReferenceType đó là phần tử kết thúc chính là điểm số của Kara

Hầu hết những người lập trình hướng đối tượng đã học để coi chừng kiểu này phát sinh vấn đề là điều rất khó, nhưng đây là loại lỗi vẫn thường xảy ra, đặt biệt với những lập trình viên mới bắt đầu. Dùng kiểu tham trị có thể giúp chúng ta tránh những lỗi này, tuy nhiên có một số lần khi chúng ta muốn có kiểu hành vi như vậy. Apple đã cũng cấp một cách để chúng ta có dc hành vi như vậy với kiểu tham trị bằng cách dùng inout. Một tham số inout cho phép chúng ta có thể thay đổi giá trị của một tham số kiểu tham trị và để có sự thay đổi đó sau khi hàm dc kết thúc.
Chúng ta định nghĩa một tham số inout bằng cách đặt từ khoá này ở trước định  nghĩa của tham số. Một tham số inout có một giá trị được truyền vào trong hàm. Giá trị này sau đó dc thay đổi bởi hàm và nó được truyền trở lại bên ngoài hàm để thay thế cho giá trị gốc.
Cùng xem cách chúng ta dùng kiểu giá trị với từ khoá inout để tạo một phiên bản như ví dụ trước nhưng làm việc một cách chính xác. Điều đầu tiên chúng ta cần làm đó là thay đổi hàm getGradesForAssignment() để dùng cho kiểm MyValueType
```
func getGradeForAssignment(assignment: inout MyValueType) {
	let num = Int(arc4random_uniform(20) + 80)
     assignment.grade = num
     print("Grade for \(assignment.name) is \(num)")
} 
```
Điều thay đổi ở đây chúng ta thực hiện với hàm đó là cách chúng ta định nghĩa tham số được truyền vào. Thuộc tính bây giờ được định nghĩa bằng kiểu MyValueType và chúng ta thêm vào từ khoá inout để cho phép hàm chỉnh sửa lại thực thể đã được truyền vào. Bây giờ hãy xem cách chúng ta dùng hàm này.
```
var mathGrades = [MyValueType]()
   var students = ["Jon", "Kim", "Kailey", "Kara"]
   var mathAssignment = MyValueType(name: "", assignment: "Math Assignment",grade: 0) 
for student in students {
     mathAssignment.name = student
     getGradeForAssignment(assignment: &mathAssignment)
     mathGrades.append(mathAssignment)
} 
   for assignment in mathGrades {
     print("\(assignment.name): grade \(assignment.grade)")
} 
```
Một lần nữa  khá là nhiều code giống với ví dụ trước tuy nhiên chúng ta tạo ra 2 sự thay đổi. Đầu tiên đó là biến mathAssignment được định nghĩa bằng kiểu MyValueType và khi chúng ta đã gọi hàm getGradeForAssignment (), chúng ta thêm tiền tố &. dấu & nói với chúng ta rằng chúng ta đang truyền một tham chiếu tới kiểu tham trị. Vì vậy bất cứ sự thay đổi nào trong hàm cũng sẽ ảnh hưởng tới thực thể gốc. Kết quả sẽ trong như thế này
```
Grade for Jon is 87
   Grade for Kim is 81
   Grade for Kailey is 90
   Grade for Kara is 83
   Jon: grade 87
   Kim: grade 81
   Kailey: grade 90
   Kara: grade 83
   ```
Đầu ra từ code này chính là những thứ chúng ta mong muốn. Mõi thực thể trong mảng mathGrades thể hiện những điểm số khác nhau. Nguyên nhân code này làm việc đúng đó là khi chúng ta thêm thực thể mathAssignment vào trong mảng mathGrades chúng ta đang thêm 1 bản sao của mathAssignment vào trong mảng. Tuy nhiên khi chúng ta truyền mathAssignment vào trong hàm getGradeForAssignment , chúng ta truyền một tham chiếu mặc dù nó làm kiểu tham trị.
Có 1 số thứ chúng ta không thể làm với kiểu tham trị mà chỉ có thể làm dc với kiểu tham chiếu. Đầu tiên đó là kiểu dữ liệu đệ quy.

**Recursive data types (chỉ dành cho kiểu tham chiếu.)**

Một kiểu dữ liệu đệ quy là một kiểu chứa đựng một giá trị của một kiểu cùng loại như là một thuộc tính của kiểu đó. Kiểu dữ liệu đệ quy được dùng khi chúng ta muốn định nghĩa cấu trúc dữ liệu động như danh sách hay cây. Kích thước của một cấu trúc động có thể tăng hoặc giảm phụ thuộc vào những yêu cầu lúc chạy chương trình.

Linked list là một ví dụ hoàn hảo về cấu trúc dữ liệu động. chúng ta sẽ thực hiện nó bằng một kiểu dữ liệu đệ quy, Một linked list là một nhóm của các nốt được liên kết với nhau và ở vị trí mõi nốt sẽ quản lý một liên kết tới một nốt tiếp theo trong list. 

![](https://images.viblo.asia/ec8177df-4e0d-40c3-9f74-db1c565935fd.png)


Mõi nốt trong list chứa đựng một vài giá trị hoặc dữ liệu. Nó cũng có thể liên kết với nốt tiếp theo trong list. Nếu một nốt trong list mất tham chiếu tới nốt tiếp theo, phần còn lại của list sẽ bị mất bởi vì mõi nốt chỉ có nhận thức về nốt tiếp theo. Một vài linked list duy trì cả nốt phía trước và nốt phía sau để cho phép chúng di chuyển tiến lên hoặc lùi lại trong list.

Chúng ta cùng tạo một linked list dùng kiểu tham chiếu
```
class LinkedListReferenceType {
	var value: String
	var next: LinkedListReferenceType?
	init(value: String) {
		self.value = value
	}
}
```
Trong linkedListReferenceType, chúng ta có 2 thuộc tính. đầu tiên là value nó chứa dữ liệu. Tiếp theo là next chỉ tới thành phần tiếp theo. Nếu next là nil nghĩa là đây là thành phần cuối cùng trong list. Nếu bạn cố gắng thực hiện linked list bằng struct thì nó sẽ trông như thế này
```
struct LinkedListValueType {
	var value: String
	var next: LinkedListValueType?
}
```
Khi chúng ta thử đoạn code này trên playground chúng ta sẽ nhận dc lỗi Recursive value ‘LinkedListValueType’ is not allowed.  Điều này nói với chúng ta rằng swift không cho phép đệ quy kiểu tham trị. Tuy nhiên chúng ta có thể thực hiện bằng kiểu tham chiếu như ví dụ bên trên.

Nếu chúng ta nghĩ rằng đệ quy kiểu tham trị thật sự là một ý tưởng tệ bởi vì cách hàm kiểu tham trị. Cùng kiểm tra code này vài phút. Bởi vì nó thực sự nhức đầu giữa kiểm tham trị và kiểu tham chiếu. Điều này giúp bạn hiểu tại sao lại cần kiểu tham chiếu.

Bây giờ chúng ta thử tại LinkedListValueType struct mà không bị lỗi. bây giờ tạo 3 node
```
var one = LinkedListValueType(value: "One",next: nil)
var two = LinkedListValueType (value: "Two",next: nil)
var three = LinkedListValueType (value: "Three",next: nil) 
```
tiếp theo link những node lại với nhau.
```
one.next = two 
two.next = three 
```
Bạn đã nhìn thấy vấn đề ở đây chưa. Nếu không suy nghĩ về cách một kiểu tham trị được truyền. Trong dòng đầu tiên one.next = two, chúng ta không thực sự thiết lập giá trị next tới thực thể two. Chúng ta chỉ thiết lập tới 1 bản sao chép của thực thể two. Điều này có nghĩa là. dòng thứ 2 two.next = three, chúng ta thiết lập giá trị next của two tới thực thể three. Tuy nhiên sự thay đôi không ảnh hưởng trở lại trong bản sao chép đã được thiết lập cho thuộc tính next của thực thể one. Nghe khá rối.  Chúng ta cùng nhìn hình biểu diễn

![](https://images.viblo.asia/d51369b2-6052-4b7e-9cec-382b50540d3a.png)


Như bạn có thể nhìn thấy trong hình. Thuộc tính next của thực thể one đang chỉ tới một bản sao của thực thể two, mà giá trị next của bản sao thực thể two này đang là nil.
thuộc tính next của thực thể two thật đang chỉ vào thực thể three. Điều này có nghĩa là chúng ta cố gắng duyệt từ thực thể one thì chúng ta sẽ ko thể đến dc thực thể three.

Điều thứ 2 có thể làm với kiểu tham chiếu đó là khả năng kết thừa của class.

**Inheritance for reference types only (Kế thừa chỉ dành cho kiểu tham chiếu.)**

Trong ngôn ngữ lập trình hướng đối tượng, kế thừa đề cập đến một class (được biết như là phụ hoặc lớp con) có nguồn gốc từ lớp khác (được xem là  siêu hoặc lớp cha). Lớp con này sẽ kết thừa những phương thức, thuộc tính và những đặc điểm khác của lớp cha. Việc kế thừa này, chúng ta cũng có thể tạo một cấu trúc phân lớp nơi chúng ta có thể kết thừa nhiều tầng.
Chúng ta cùng xem cách để tạo một cấu trúc phân lớp trong swift. Chúng ta sẽ bắt đầu bằng cách tạo một lớp cơ bản Animal:
```
class Animal {
	var numberOfLegs = 0
	func sleeps() {
		print(“zzzz”)
	}
	func walking() {
		print(“Walking on \(numberOfLegs) legs”)
	}
	func speaking() {
		print(“No sound”)
	}
}
```
Trong lớp Animal, chúng ta đã định nghĩa một thuộc tính là numberOfLegs và 3 phương thức sleeps(), walking(), speaking(). Bây giờ bất cứ lớp nào là lớp con của Animal cũng có những thuộc tính và phương thức này. Bây giờ cũng xem cách nó làm việc bằng cách tạo 2 lớp con của Animal. 2 lớp này là Biped (một con vật có 2 chân) Quadruped (một con vật có bốn chân)
```
class Biped: Animal {
	override init() {
		super.init()
		numerOfLegs = 2
	}
}

class Quadruped: Animal {
	override init() {
		super.init()
numerOfLegs = 4
	}
}
```
Từ đây 2 lớp này kết thừa tất cả những thuộc tính và phương thức của lớp Animal, tất cả mọi thứ chúng ta cần là tạo một hàm khởi tạo và thiết lập giá trị numberOfLegs đúng với số chân của lớp kế thừa. Bây giờ chúng ta thêm những lớp kế thừa khác bằng cách tạo lớp Dog là lớp con của lớp Quadruped
```
class Dog: Quadruped {
	override func speaking() {
		print(“”Barking)
	}
}
```
Trong lớp Dog chúng ta kế thừa từ lớp Quadruped cái mà kết thừa từ lớp Animal. Do đó lớp Dog sẽ có tất cả các thuộc tính , phương thức và đặc điểm của cả lớp Animal và lớp Quadruped. Nếu lớp Quadruped ghi đè bất cứ thứ gì từ lớp Animal, sau đó lớp Dog sẽ kết thừa lại phiên bản đã có của lớp Quadruped.
Chúng ta có thể tạo ra một cấu trúc phân lớp phức tạp trong hoàn cảnh này. Như một ví dụ, theo như đồ thị mở rộng trên cấu trúc phân lớp chúng ta vừa tạo để thêm một số lớp nhỏ khác

![](https://images.viblo.asia/02ad3585-4c2f-4255-a9ff-2693d1ed400a.png)


Như chúng ta đã thấy, cấu trúc phân lớp rất phức tạp. Tuy nhiên chúng có thể loại bỏ nhiều phần code lặp lại bởi vì những lớp con kế thừa phương thức , thuộc tính và những đặc điểm khác từ những lớp cha của chúng. Do đó chúng ta không cẩn tạo lại chúng cho tất cả các lớp con.

Hạn chế lớn nhất của hệ thống lớp phân cấp đó là sự phức tạp. Khi chúng ta có một hệ thống phức tạp như đã đưa ở đồ thị bên trên, rất dễ để tạo một sự thay đổi và không nhận ra cách mà nó ảnh hưởng đến tất cả các lớp con. Một ví dụ. Nếu chúng ta nghĩ về lớp dog và cat, chúng ta muốn thêm thuộc tính furColor(màu lông thú) cho lớp Quadruped vì vậy chúng ta có thể thiết lập giá trị color của lông thú. Tuy nhiên con ngựa không có lông, chúng gọi là tóc. Vì vậy trước khi chúng ta có thể tạo bất cứ sự thay đổi nào tới cấu trúc phân lớp của mình, chúng ta cần hiểu cách mà nó sẽ ảnh hưởng đến những lớp con trong cấu trúc phân lớp.

Trong swift, cách tốt nhất để tránh việc dùng cấu trúc phân lớp phức tạp là dùng hướng protocol. Nếu như không có lý do đặc biệt gì để dùng chúng. Chúng ta sẽ nhìn thấy cách dùng hướng tiếp cận protocol để tránh sự phức tạp của cấu trúc phân lớp thông qua cuốn sách này.

Trong hầu hết các ngôn ngữ hướng đối tượng, thư viện chuẩn là dạng kiểu cấu trúc phân lớp , nơi mà phần lớp thư viện được thực thi bằng class. Tuy nhiên swift thì có chút khác biệt.

**Dynamic Dispatch ( Điều phối động)**

Trong phần kết thừa chỉ dành cho kiểu tham chiếu chúng ta thấy được cách chúng ta có thể dùng kế thừa với những class để kế thừa và ghi đè những tính năng được định nghĩa ở lớp cha. Bạn có thể sẽ ngạc nhiên cách và khi nào phần thực thi thích hợp được chọn. Quá trình của việc chọn này được thực thi để gọi được thực hiện ở thời gian chạy ứng dụng và được gọi là điều phối động.
Một trọng những đặc điểm phải hiểu từ đoạn văn bên trên là phần thực thi được chọn lúc thời gian chạy. Điều này có nghĩa là một khoản chắc chắn của chi phí thời gian chạy thì liên quan đến việc dùng lớp kế thừa đã được trình bày trong phần trên. Đối với hầu hết các ứng dụng phần đầu này không phải là mối bận tâm, tuy nhiên đối với một số ứng dụng nhạy cảm như game thì phần đầu này có thể tốn chi phí.
Một trong những cách chúng ta có thể giảm chi phí liên quan với điều phối động này là dùng từ khoá final. Từ khoá này đặt một sự hạn chế trên class, phương thức hoặc hàm để chỉ ra rằng nó không thể dc kết thừa. trong trường hợp một số phương thức hoặc hàm hoặc những lớp phụ trong một class.
Để dùng từ khoá final bạn đặt nó ở trước class, phương thức hoặc hàm như ví dụ:
```
final func myFunc() {}
final var myProperty = 0
final class MyClass {}
```
Trong phần kế thừa chỉ dành cho kiểu tham chiếu chúng ta đã định nghĩa một cấu trúc phân cấp bắt đầu với lớp cha Animal. Nếu bạn muốn hạn chế những lớp con có thể ghi đè hàm walking() hoặc thuộc tính numberOfLegs, chúng ta sẽ thay đổi phần thực thi của Animal như sau:
```
class Animal {
     final var numberOfLegs = 0
     func sleeps() {
       print("zzzzz")
     }
     final func walking() {
       print("Walking on \(numberOfLegs) legs")
     }
     func speaking() {
       print("No sound")
     }
} 
```
Việc thay đổi này cho phép ứng dụng ở lúc đang chạy thực hiện một cách gọi trực tiếp tới hàm walking hơn là gọi gián tiếp phương thức này giúp ứng dụng thực hiện nhanh hơn. Nếu bạn phải dùng một lớp cấu trúc phân cấp . Đây là một cách tốt để dùng final bất cứ khi nào có thể. tuy nhiên tốt hơn là nên dùng thiết kế hướng protocol với kiểu tham trị để tránh trường hợp này.

**Swift’s built-in types (kiểu được dụng sẳn trong swift)**

Nếu bạn đang đọc cuốn sách này bạn có thể rất quen thuộc với kiểu dựng sẳn và cấu trúc dữ liệu. Tuy nhiên để thực sự giải phóng sức mạnh của nó bạn cần phải hiểu cách chúng được thực thi trong những thư viện chuẩn của swift.
Trong thư viện chuẩn của swift định nghĩa một vài kiểu dữ liệu như Int, Double và String. Trong hầu hết các ngôn ngữ những kiểu này được thực thi như là kiểu gốc nghĩa là chúng không thể được mở rộng hay tạo lớp con từ chúng. Tuy nhiên trong swift những kiểu này được thực thi trong thư viện chuẩn của swift như là struct. điều này có nghĩa là chúng ta có thể mở rộng những kiểu này như là chúng ta có thể làm với những kiểu dữ liệu khác được thực hiện bằng struct. Tuy nhiên chúng ta không thể tạo lớp con từ chúng như chúng ta có thể làm với những ngôn ngữ khác.

Swift cũng định nghĩa vài cấu trúc dữ liệu chuẩn như arrays, dictionaries và sets. Giống như những kiểu dữ liệu dựng sẳn những thứ này được thực thi bằng struct. Bạn có thể ngạc nhiên về phần thực thi của những cấu trúc dữ liệu này khi chúng chứa một lượng lớp các phần tử bởi vì kiểu tham trị nhận một bản sao của dữ liệu khi chúng ta gán nó tới một biến khác. Apple có câu trả lời cho phần này gọi là COW(copy-on-write)

**Copy on write**

Khi một thực thể của một kiểu tham trị như một struct được gán tới một biến và biến thứ 2 này nhận một bản sao của thực thể này. có nghĩa là nếu bạn có một mảng chứa 50000 phần tử, sau đó ở lúc chạy máy chúng ta cần sao chép 50000 phần tử  khi chúng ta gán mảng này tới một biến thứ hai hoặc nếu chúng ta truyền nó tới phần khác trong code. Điều này có thể thực sự ảnh hưởng tới khả năng vận hành, tuy nhiên với những cấu trúc dữ liệu được dựng sẳn trong swift như array, vấn đề này dc giảm thiểu bởi Copy-On-write

Với Copy-on-write swift không thực hiện việc copy dữ liệu của một cấu trúc dữ liệu cho đến khi một thực thay đổi được thực hiện trên cấu trúc dữ liệu đó. Do đó nếu bạn truyền một mảng 50000 phần tử tới một phần khác của code, và phần code này không thực sự tạo bất cứ thay đổi nào trên mảng, chúng ta sẽ tránh việc chi phí lúc đang chạy của việc sao chép tất cả các phần tử.
Không may, copy-on-write này chỉ dc thực hiện với những kiểu dữ liệu chuẩn của swift và không phải tất cả kiểm tham trị nào cũng có. Trong chương 4 Generic chúng ta sẽ thấy cách để thực hiện copy-on-write trên kiểu dữ liệu tuỳ biến.

**Tổng kết chương 2:**

Trong hầu hết các ngôn ngữ lập trình hướng đối tượng, kiểu dữ liệu được chọn có giới hạn. Trong swift tuy nhiên chúng ta có nhiều sự lựa chọn. Điều này cho phép chúng ta dùng đúng kiểu dữ liệu cho đúng hoàn cảnh. Hiểu được sự khác nhau giữa các kiểu là điều quan trọng để viết code tốt và chắc chăn.
trong chương này chúng ta đã thấy sự khác nhau giữa những kiểu dữ liệu chúng ta có thể dùng trong swift và nhấn mạnh sự khác nhau giữa kiểu tham trị và kiểu tham chiếu. trong khi apple nói rằng chúng ta nên ưu tiên kiểu tham trị. Chúng ta đã thấy những phần khác như kiểu dữ liệu đệ quy, các trường hợp cần kiểu tham chiếu.
Chúng ta cũng thảo luận cách để tối ưu code với final khi dùng kiểu tham chiếu. Trong chương tiếp theo chúng ta sẽ thấy chúng ta có thể tránh dùng một cấu trúc phân lớp bằng cách dùng extensions.

*Hẹn gặp các bạn ở chương tiếp theo!. *