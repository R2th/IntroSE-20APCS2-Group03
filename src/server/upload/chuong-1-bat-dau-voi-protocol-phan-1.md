**Chương 1**

Khi Apple giới thiệu Swift 2 ở (WWDC) hội nghị lập trình viên. Họ cũng định nghĩa rằng swift là ngôn ngữ lập trình hướng protocol đầu tiên trên thế giới. Từ cái tên của nó chúng ra có thể giả sử rằng lập trình hướng protocol là tất cả về protocol. Tuy nhiên đây là giả định sai lầm. Lập trình hướng protocol có nhiều thứ hơn chỉ là protocol. Nó thật sự là một cách mới không chỉ để viết ứng dụng mà còn là cách nghĩ về thiết kế ứng dụng.
trong chương này chúng ta sẽ học:

* Cách để định nghĩa thuộc tính và hàm cần thiết trong một protocol
* Cách để dùng protocol kết thừa và sự tổ hợp
* Cách để dùng một protocol như một kiểu dữ liệu
* Đa hình là gì
* Cách để dùng associated type với protocol (1 số chữ vẫn dùng tiếng anh)
* Cách để thực hiện mẫu delegation với protocol
* Cách để thiết kế yêu cầu với protocols

Nếu bạn đến từ nền tảng lập trình hướng đối tượng OOP, bạn có thể đã quen với khái niệm interface. Trong thế giới lập trình hướng đối tượng, interface là một kiểu chứa phương thức và thuộc tính, nhưng không chứa bất cứ phần thực thi chi tiết nào. Một Interface có thể được xem như một bản **hợp đồng** nơi mà bất cứ loại dữ liệu nào thoả mãn với interface thì cần phải thực hiện những chức năng được yêu cầu. Hầu hết những lập trình viên hướng đối tượng hiếm khi dùng interface như là điểm bắt đầu cho việc thiết kế ứng dụng nếu họ không làm việc với một framework tương tự.
Khi chúng ta đang thiết kế một ứng dụng bằng cách hướng đối tượng, chúng ta thường xuyên bắt đầu việc thiết kế bằng cách tập trung vào cấu trúc phân lớp và cách những đối tượng tương tác với nhau. Đối tượng là một cấu trúc chứa đựng thông tin về các thuộc tính của đối tượng trong dạng là các tính chất và các hành động thực thi của đối tượng dưới dạng các phương thức. Chúng ta không thể tạo một đối tượng mà không có một bảng thiết kế để nói với ứng dụng về những thuộc tính và hành động được mong chờ từ đối tượng. Trong ngôn ngữ lập trình hướng đối tượng, bản thiết kế này

Việc thiết kế một ứng dụng trong cách hướng protocol khác nhau đáng kể so với hướng đối tượng. Thay vì bắt đầu với hệ thống phân cấp, Thiết kế hướng protocol nói rằng chúng ta nên bắt đầu với protocol. Trong khi thiết kế hướng protocol có nhiều thứ hơn là protocol. Chúng ta có thể nghỉ về protocol như bộ khung. Rốt cuộc thì sẽ rất khó để có ngôn ngữ lập trình hướng protocol mà ko có protocol.
Một protocol trong swift thì tương tự với interface trong ngôn ngữ hướng đối tượng nơi mà protocol hành động như một bản hợp đồng đã định nghĩa những phương thức, thuộc tính và những yêu cầu cần thiết khác bằng những kiểu của nó để thực hiện những công việc của nó. Chúng ta nói rằng protocol như là một bảng hợp đồng bởi vì bất cứ loại nào có thể thoả mãn những lời hứa và thực thi những yêu cầu được định nghĩa bởi protocol. Nếu một loại nào đó được nói là thoả mãn một protocol nhưng nó không thực thi đầy đủ tất cả các tính năng được định nghĩa bởi protocol, chúng ta sẽ bị lỗi khi compile và project đó sẽ không thể biên dịch được. Trong swift, bất cứ class, struct, enumeration có thể thoã mãn một protocol

Trong đoạn bên trên chúng ta đã đề cập rằng protocol tương tự như interface. Đừng bị lừa bởi việc so sánh này, mặt dù interface và protocol tương tự nhau, protocol trong swift thật sự có nhiều năng lực hơn interface trong các ngôn ngữ hướng đối tượng. như bạn sẽ đọc thông qua cuốn sách này, bạn sẽ hiểu thế nào là sức mạnh của protocol.
Hầu hết các ngôn ngữ lập trình hướng đối tượng thực thi thư viện tiêu chuẩn của họ với hệ thống phân cấp. Tuy nhiên thư viện tiêu chuẩn của swift là protocol. Do đó nó không chỉ được apple khuyến cáo chúng ta nên dùng mô hình lập trình hướng protocol trong ứng dụng của mình, mà họ cũng dùng trong các thư viện swift.
Với việc protocol là phần cơ bản của các thư viện swift và cũng là bộ khung sườn của các mô hình lập trình hướng protocol. Nó rất quan trọng để chúng ta hiểu một cách toàn diện protocol là gì và cách chúng ta dùng nó.
Trong chương này chúng ta không chỉ học về cơ bản của protocol mà còn hiểu cách nó có thể được dùng trong thiết kế ứng dụng

**Cú pháp của protocol**

trong chương này chúng ta sẽ xem cách định nghĩa một protocol và cách để thêm những yêu cầu vô cho nó. 
Định nghĩa một protocol
cú pháp của nó cũng khá giống với việc định nghĩa một class, struct, enumeration
```swift
protocol MyProtocol {

}
```
Tiếp theo là định nghĩ một struct thoả mãn protocol
```swift
struct MyStruct: MyProtocol {

}
```
Một kiểu dữ liệu có thể thoã mãn nhiều protocol cùng lúc. Chúng ta sẽ liệt kê nhiều protocol mà kiểu dữ liệu đó thoã mãn bằng cách tách rời chúng bởi dấu ,
```swift
struct MyStruct1: MyProtocol, AnotherProtocol, ThirdProtocol {
}
```
Việc có một kiểu dữ liệu thoã mãn nhiều protocol là một khái niệm quan trọng trong lập trình hướng protocol. Khái niệm này gọi là protocol thành phần

Một protocol có thể yêu cầu rằng những kiểu dữ liệu thoã mãn với nó cung cấp chắc chắn những thuộc tính với tên và kiểu được chỉ định. Protocol không nói rằng bất cứ thuộc tính nên được lưu trữ hoặc tính toán. Bởi vì phần thực thi chi tiết  sẽ được chuyển qua cho những kiểu dữ liệu nào thoã mãn nó.
Khi định nghĩa một thuộc tính trong protocol, chúng ta cần phải chỉ ra rằng thuộc tính đó là read-only hay read-write bằng cách dùng từ khoá get , set. chúng ta cũng cần chỉ ra kiểu dữ liệu. ví dụ
```swift
protocol FullName {
var firstName: String {get set}
var lastName: String {get set}
}
```
trong ví dụ này chúng ta đã định nghĩa tên firstName và lastName. Đây là những thuộc tính read-write. Bất cứ kiểu dữ liệu nào thoã mãn protocol này cần phải thực thi các 2 thuộc tính. Nếu chúng ta muốn định nghĩa thuộc tính là read-only, chúng ta nên định nghĩa nó chỉ dùng get
ví du:  ```var readOnly : String {get}```
Có thể định nghĩa thuộc tính tĩnh bằng cách dùng từ khoá static

```static var typeProperty: String {get}```

Tiếp theo cách để chúng ta thêm phương thức cho protocol

Một Protocol có thể yêu cầu những kiểu dữ liệu thoã mãn nó cung cấp những phương thức nhất định. Nhưng phương thức này được định nghĩa trong protocol giống như chúng ta định nghĩa chúng trong class hoặc struct nhưng không có dấu {} và body. Chúng ta có thể định nghĩa những phương thức này là một thực thể hoặc là kiểu những phương thức dùng từ khoá static. Việc thêm giá trị mặt định cho các biến của phương thức thì không được phép khi định nghĩa phương thức trong protocol.
ví du:
```swift
protocol FullName {
     var firstName: String {get set}
     var lastName: String {get set}
    func getFullName() -> String
    }
```
Protocol FullName bây giờ yêu cầu một phương thức là getFullName() và 2 thuộc tính read-write là firstName, lastName
ví dụ kiểu dữ liệu tham trị như struct. Nếu chúng ta có ý định thay đổi giá trị của thực thể đó, chúng ta cần phải thêm tiền tố trước định nghĩa của phương thức **mutating**. Từ khoá này chỉ ra rằng phương thức cho phép thay đổi thực thể mà nó phụ thuộc .
```mutating func changeName()```
Việc thêm từ khoá mutating này không cần thiết đối với kiểu dữ liệu tham chiếu như class.

Những yêu cầu không bắt buộc (Optional requirements OR)
Có nhiều lần chúng ta muốn protocol định nghĩa những yêu cầu không bắt buộc. OR là một phương thức hoặc thuộc tính mà không yêu cầu để thực thi. để dùng OR, chúng ta cần bắt đầu protocol với tính chất @objc
```swift
@objc protocol Phone {
    @objc optional var emailAddress : String {get set}
    var phoneNumber: String {get set}
    func dialNumber()
    @objc optional func getEmail()
}
```
>  Ghi chú chỉ có kiểu dữ liệu tham chiếu Class mới có thể conform với loại protocol optional. Struct ko conform dc nhé.

Tiếp theo chúng ta sẽ khám phá công việc kế thừa
**Protocol kế thừa**
Protocol có thể kế thừa từ một hoặc nhiều protocol khác để có thể thêm những yêu cầu
```swift
protocol ProtocolThree: ProtocolOne, ProtocolTwo {
     // Add requirements here
} 
```
ví dụ:
```swift
protocol Person: FullName {
     var age: Int {get set}
} 
```
Bây giờ chúng ta tạo một kiểu thoã mãn tới protocol Person chúng ta cần phải thực thi những yêu cầu đuợc định nghĩa trong Protocol Person, cũng như những yêu cầu được định nghĩa trong Protocol FullName. Một ví dụ là struct Student thoã mãn protocol Person
```swift
struct Student: Person {
     var firstName = ""
     var lastName = ""
     var age = 0
     func getFullName() -> String {
       return "\(firstName) \(lastName)"
    } 
}
```
 Chú ý rằng trong struct Student chúng ta đã thực thi những yêu cầu được định nghĩa trong cả protocol FullName, Person. Tuy nhiên chỉ protocol Person được chỉ định trong struct. Chúng ta chỉ cần liệt kê Person bởi vì nó đã kế thừa tất các yêu cầu từ full Name Protocol.

Bây giờ chúng ta sẽ xem xét khái niệm quan trọng trong mô hình lập trình hướng protocol

**Protocol composition** (PC) Thành phần.
PC cho phép kiểu dữ liệu của chúng ta tiếp cận tới nhiều protocol. Đây là một khái niệm có lợi chúng ta nhận được khi dùng protocol hơn là mô hình phân lớp. Bởi vì trong swift và những ngôn ngữ đơn kế thừa khác, chỉ có thể kế thừa từ 1 super class. Cú pháp của PC thì giống với kế thừa protocol
```swift
struct MyStruct: ProtocolOne, ProtocolTwo, Protocolthree {
     // implementation here
} 
```

PC cho phép chúng ta chia những yêu cầu của chúng ta thành những thành phần nhỏ hơn thay vì kế thừa tất cả những yêu cầu từ một protocol đơn hoặc 1 super class. Việc này cho phép kiểu dữ liệu của chúng ta phát triển mối quan hệ theo chiều rộng chứ không phải chiều cao. Cũng có nghĩa là chúng ta tránh việc tạo một kiểu dữ liệu mà chứa đựng những thứ không cần thiết. PC có thể trong giống một khái niệm đơn giản nhưng nó là một khái niệm quan trọng trong lập trình hướng protocol. 

![](https://images.viblo.asia/c903efa1-f2db-4009-a808-71d06abb0718.png)

Trong mô hình lớp phân cấp, chúng ta có một lớp cơ bản Athlete. lớp Athlete có 2 lớp phụ là Amateur và Pro. Những lớp này  phụ thuộc vào loại lực sĩ nghiệp dư hay chuyên nghiệp.
Amateur và Pro chúng ta cũng chia ra làm 2 lớp nhỏ. là football và Baseball…
Còn với PC thay vì có một cấu trúc phân lớp nơi mà những lớp con kế thừa tất các các chức năng từ một super class, chúng ta có một tập hợp các protocol cái mà chúng ta có thể trộn lẫn và match trong những kiểu dữ liệu của chúng ta.
![](https://images.viblo.asia/99878972-be88-42b8-ac17-bac73e74a48c.png)

Chúng ta có thể dùng một hoặc nhiều hơn những protocols cần thiết cho kiểu dữ liệu của mình. Ví dụ chúng ta có thể tạo AmFootballPlayer struct bằng cách thoã mãn Athlete, Amateur, FootballPlayer.

Từ quan điểm thuần protocol, ví dụ bên trên có thể chưa  được  dễ hiểu ngay bây giờ. Bởi vì protocol chỉ định nghĩa những yêu cầu, Tuy nhiên ở chương 3 extension chúng tôi sẽ xem cách để protocol có thể dùng để thực thi những kiểu dữ liệu với ít code bị trùng lắp.

 *Hết Phần 1 của chương 1 còn tiếp..*