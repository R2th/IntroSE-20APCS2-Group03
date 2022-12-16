Là một lập trình viên, việc quản lý độ phức tạp là một điều rất khó khăn, là một vấn đề mà chúng ta luôn trăn trở tìm cách giải quyết. Khi chúng ta tìm hiểu về POP, bạn sẽ không thấy được ngay một kết quả khả quan hay xứng đáng cho việc bạn đầu tư thời gian vào nguyên cứu công nghệ này. Nhưng nếu bạn chịu khó tìm hiểu cùng tôi, bạn sẽ bắt đầu nhìn thấy được POP đặt vấn đề giải quyết độ phức tạp như thế nào và nó cung cấp cho bạn một công cụ để làm chủ được sự hỗn loạn vốn có trong hệ thống phần mềm. 

Tôi đã nghe thấy ngày càng nhiều người nói về POP nhưng chưa thật sự nhìn thấy nhiều sản phẩm được tạo ra trên chính phương pháp này, nói theo cách khác, tôi chưa nhìn thấy nhiều người dùng phương pháp này để tạo nên ứng dụng mà chức năng tạo bởi Protocol thay vì Class. Điều này không chỉ là do việc thay đổi khái niệm code của con người rất khó mà không dễ gì học và đưa hẳn một mô hình mới hoàn toàn vào thực tế. 

Có một sô lượng lớn việc nói rằng nên thay thế POP cho OOP, như là một sự thích thú cho việc chạy theo xu hướng mới. Điều này sẽ không xảy ra trừ khi POP giống như việc Swift thay đổi cho Objective-C rất mạnh mẽ. Bạn nên sử dụng hai mô hình sao cho hợp lý vì chúng đều có điểm mạnh và điểm yếu riêng, chúng không liên quan gì đến nhau hết nên dùng như thế nào là tuỳ thuộc vào các bạn. 

# Tìm hiểu về Protocol

Khi một lập trình viên bắt đầu với cấu trúc đơn giản của một ứng dụng iOS mới, họ luôn bắt đầu với việc thêm vào các thư viện có sẵn như là Foundation và UIKit. Hầu như tất cả cácp ứng dụng tôi biết đều có một hệ thống di chuyển các luồng màn hình. Người dùng cần phải có chỗ nào đó để dẫn đến các chức năng của ứng dụng.

Khi những ứng dụng đó được mở lên thì bạn sẽ thấy gì ? Chắc chắn là những lớp con của UITableViewController, UICollectionViewController, UIPageViewController.

Tất cả các bạn chắc chắn sẽ nhận ra  đoạn code sau khi mới tạo một project iOS mới tứ Single View App trong Xcode:

```swift
...
import UIKit
 
class ViewController: UIViewController
{
...
```

Một vài lập trình viên sẽ dừng lại ở đây và biến tấu nó theo cách của họ, còn lại đa số sẽ tiếp tục làm bình thường.

Vậy đối với một lập trình viên iOS thì chức năng đầu tiên rõ ràng đã là OOP, vậy làm POP ở đâu ?

Vậy hãy nghĩ về bước lớn tiếp theo mà chúng ta phải làm, đó chính là đưa protocol vào.

Để tôi đưa cho bạn xem một ví dụ dễ hiểu. Tôi chắc rằng đa số các bạn đều không lạ gì UITableViews. Việc đưa các protocol sau UITableViewDataSource và UITableViewDelegate đã quá quen thuộc rồi.

```swift
class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate
```

Noí chi tiết hơn, UITableViewDataSource cho phép bạn đưa dữ liệu vào trong UITableViewCell, như là tên của vật phẩm mà bạn muốn người dùng nhìn thấy. Đưa UITableViewDelegate vào cho phép bạn thao tác các tác vụ liên quan đến UITableView, ví dụ như là khi người dùng bấm vào UITableViewCell.

## Định nghĩa

Đầu tiên ta hãy định nghĩa về từ "protocol" của Layman : 

![](https://images.viblo.asia/87f3dc12-6410-40e3-a9dc-24aff7014c83.png)

Và theo tài liệu của Apple "The Swift Programming Language (Swift 4.0.3)"

![](https://images.viblo.asia/0ae8bf0e-505c-4c7f-a6e6-d1f508f35ee4.png)

Protocol là một trong những công cụ quan trọng mà chúng ta phải sử dụng để quản lý sự hỗn loạn ở trong phần mềm. Protocol cho phép chúng ta khả năng yêu cầu tối thiểu về class và struct, yêu cầu hoặc đưa ra tối thiểu về thuộc tính.

## Sử dụng Protocol 

Chúng ta sẽ làm cho class Person chứa protocol Equatable của Apple có sẵn 

![](https://images.viblo.asia/89ed0688-b2ed-4e12-82b8-1a6e9b5925e7.png)

```swift
class Person : Equatable
{
    var name:String
    var weight:Int
    var sex:String
    
    init(weight:Int, name:String, sex:String)
    {
        self.name = name
        self.weight = weight
        self.sex = sex
    }
    
    static func == (lhs: Person, rhs: Person) -> Bool
    {
        if lhs.weight == rhs.weight &&
            lhs.name == rhs.name &&
            lhs.sex == rhs.sex
        {
            return true
        }
        else
        {
            return false
        }
    }
}
```


Bạn có thể định nghĩa hoá Protocol như là một bản hợp đồng hoặc một lời hứa rằng bạn có thể đưa nó vào trong class ,struct hoặc enum. Tôi đã đưa class Person của tôi vào một hợp đồng với protocol Equatable, và class Person của tôi phải thực hiện lời hứa sẽ phải tiến hành bản hợp đồng là thực thi các hàm hoặc biến mà Equatable yêu cầu.

Protocol Equatable không phải thực thi gì cả. Nó chỉ đăc tả ra những hàm hoặc biến mà phải được thực thi ở trong class, struct hoặc enum mà đã đưa protocol này vào. 

##  Cách tạo ra protocol

Cách để dễ dàng nắm bắt protocol là thông qua việc code. Tôi sẽ viết ra phiển bản Equatable của riêng tôi để cho các bạn thấy protocol làm việc thế ngay

```swift
protocol IsEqual
{
    static func == (lhs: Self, rhs: Self) -> Bool
    
    static func != (lhs: Self, rhs: Self) -> Bool
}
```

Hãy nhớ rằng protocol "IsEqual" không thực thi hai toán tử "==" và "!=". "IsEqual" yêu cầu những thành phần đưa nó vào phải tự thực thi hai toán tử đó.

Tất cả quy tắc cho việc tạo ra protocol đã được Apple định nghĩa trong [tài liệu](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267). Ví dụ, bạn chưa bao giờ dùng "let" để cho thuộc tính trong protocol. Các thuộc tính Read-only được định nghĩa bằng cách sử dụng "var" và sau đó chỉ có hàm "get". Nếu bạn có một hàm có thể sửa đổi các thuộc tính, bạn đánh dấu nó là "mutating". 

Để cho các bạn thấy việc sử dụng protocol rộng lớn như thế nào, chúng ta sẽ xây dựng một class như bên dưới, nhưg trước khi đến phần đó, ta sẽ nói về kiểu tham chiếu(reference) và kiểu giá tri(value)

## Thuật ngữ tham chiếu và thuật ngữ giá trị

Trước tiên bạn nên đọc định nghĩa [về chúng](https://developer.apple.com/swift/blog/?id=10). Tôi sẽ cho bạn gợi ý như sau. Giả sử rằng bạn có nhiều tham chiếu đến cùng một instance của class hoặc một thuộc tính gì đó. Những tham chiếu này cùng trỏ đến cùng một vùng dữ liệu nên cũng có thể gọi là chia sẻ dữ liệu. Ở một số trường hợp, việc chia sẻ dữ liệu có thể gây ra nhiều vấn đề, hãy xem đoạn code dưới sau đây để tìm hiểu.

## Thuật ngữ tham chiếu

Đoạn code sau đây từ Xcode playground diễn tả một trường hợp thú vị khi sao chép một object được tạo và thay đổi thuộc tính của nó. Đoạn code này còn biểu diễn cách tạo protocol và một extension.
```swift
// REFERENCE SEMANTICS: EVERYBODY HAS USED CLASSES
// FOR SO LONG -- AND THINK ABOUT ALL THE IMPLICIT
// COPYING THAT GOES ON IN COCOA.
 
protocol ObjectThatFlies
{
    var flightTerminology: String { get }
    func fly() // no need to provide implementation unless I want
}
 
extension ObjectThatFlies
{
    func fly() -> Void
    {
        let myType = String(describing: type(of: self))
        let flightTerminologyForType = myType + " " + flightTerminology + "\n"
        print(flightTerminologyForType)
    }
}
 
class Bird : ObjectThatFlies
{
    var flightTerminology: String = "flies WITH feathers, and flaps wings differently than bats"
}
 
class Bat : ObjectThatFlies
{
    var flightTerminology: String = "flies WITHOUT feathers, and flaps wings differently than birds"
}
 
// REFERENCE SEMANTICS
 
let bat = Bat()
bat.fly()
// "Bat flies WITHOUT feathers, and flaps wings differently than birds"
 
let bird = Bird()
bird.fly()
// "Bird flies WITH feathers, and flaps wings differently than bats"
 
var batCopy = bat
batCopy.fly()
// "Bird flies WITH feathers, and flaps wings differently than bats"
 
batCopy.flightTerminology = ""
batCopy.fly()
// just "Bat" prints to console
 
bat.fly()
// just "Bat" prints to console
```

Và output như sau 
```swift
Bat flies WITHOUT feathers, and flaps wings differently than birds
 
Bird flies WITH feathers, and flaps wings differently than bats
 
Bat flies WITHOUT feathers, and flaps wings differently than birds
 
Bat 
 
Bat
```

## Thuật ngữ giá tri

Trong đoạn code dưới đây, chúng ta sẽ sử dụng struct chứ không phải là class.

Và output như sau 
```swift
// THIS IS WHERE THE PARADIGM SHIFT STARTS, NOT JUST
// WITH PROTOCOLS, BUT WITH VALUE SEMANTICS
 
protocol ObjectThatFlies
{
    var flightTerminology: String { get }
    func fly() // no need to provide implementation unless I want
}
 
extension ObjectThatFlies
{
    func fly() -> Void
    {
        let myType = String(describing: type(of: self))
        let flightTerminologyForType = myType + " " + flightTerminology + "\n"
        print(flightTerminologyForType)
    }
}
 
struct Bird : ObjectThatFlies
{
    var flightTerminology: String = "flies WITH feathers, and flaps wings differently than bats"
}
 
struct Bat : ObjectThatFlies
{
    var flightTerminology: String = "flies WITHOUT feathers, and flaps wings differently than birds"
}
 
// VALUE SEMANTICS
 
let bat = Bat()
bat.fly()
// "Bat flies WITHOUT feathers, and flaps wings differently than birds"
 
let bird = Bird()
bird.fly()
// "Bird flies WITH feathers, and flaps wings differently than bats"
 
var batCopy = bat
batCopy.fly()
// "Bird flies WITH feathers, and flaps wings differently than bats"
 
// Here, it's obvious what we did to this INSTANCE of Bat...
batCopy.flightTerminology = ""
batCopy.fly()
// just "Bat" prints to console
 
// BUT, because we're using VALUE semantics, the original
// instance of Bat was not corrupted by side effects
bat.fly()
// "Bat flies WITHOUT feathers, and flaps wings differently than birds"
```

Output như sau 

Và output như sau 

```swift
Bat flies WITHOUT feathers, and flaps wings differently than birds
 
Bird flies WITH feathers, and flaps wings differently than bats
 
Bat flies WITHOUT feathers, and flaps wings differently than birds
 
Bat 
 
Bat flies WITHOUT feathers, and flaps wings differently than birds
```

## Sử dụng nhiều protocol 

Khi bắt đầu làm việc với protocol thì chúng ta sẽ rất ngại việc phải viết nhiều, nhưng khi bóc tách ra từng phần thì chúng ta sẽ sử dụng các protocol linh hoạt hơn và không phải sử dụng những biến hay hàm thừa thãi. Dưới đây là ví dụ về việc ghép 2 protocol "Equatable" và "Comparable" của App

```swift
protocol IsEqualAndComparable
{
 
    static func == (lhs: Self, rhs: Self) -> Bool
 
    static func != (lhs: Self, rhs: Self) -> Bool
    
    static func > (lhs: Self, rhs: Self) -> Bool
    
    static func < (lhs: Self, rhs: Self) -> Bool
    
    static func >= (lhs: Self, rhs: Self) -> Bool
    
    static func <= (lhs: Self, rhs: Self) -> Bool
 
}
```

Nhìn rất nhiều hàm và trông rối mắt đúng không. Thay vì viết quá nhiều thế này sao chúng ta không tách nó ra.

```swift
protocol IsEqual
{
    static func == (lhs: Self, rhs: Self) -> Bool
    
    static func != (lhs: Self, rhs: Self) -> Bool
}
 
protocol Comparable
{
    static func > (lhs: Self, rhs: Self) -> Bool
    
    static func < (lhs: Self, rhs: Self) -> Bool
    
    static func >= (lhs: Self, rhs: Self) -> Bool
    
    static func <= (lhs: Self, rhs: Self) -> Bool
}
```

Vậy là chúng ta đã đi qua được phần định nghĩa của POP, cách tạo và sử dụng protocol, những điểm khác biệt giữa kiểu tham chiếu và giá trị. Nếu bạn vẫn muốn tìm hiểu kĩ hơn về sự khác biệt giữa POP và OOP thì hãy đón đọc phần 2 nhé.

REF: https://www.appcoda.com/protocol-oriented-programming/