Trải nghiệm ấn tượng đầu tiên của người dùng là trải nghiệm khởi động ứng dụng. Mỗi mili giây họ chờ đợi ứng dụng của bạn bắt đầu là thời gian quý báu họ có thể dành ở nơi khác. Nếu ứng dụng của bạn có sự truy cập cao và được sử dụng nhiều lần một ngày thì người dùng phải chờ khởi động nhiều lần. Apple khuyến nghị frame đầu tiên được vẽ dưới 400ms. Điều này đảm bảo ứng dụng của bạn đã sẵn sàng để được sử dụng khi Springboard animation của app kết thúc.
 Chỉ với 400ms, developers cần phải thật cẩn thận để không vô tình làm tăng thời gian khởi động app. Tuy nhiên, việc khởi động app là một quá trình phức tạp với rất nhiều phần mà khó để biết chính xác nó đóng góp những gì. Ta bắt đầu đào sâu hơn về mối quan hệ giữa binary size và startup time trong khi làm việc với [Emerge](https://www.emergetools.com/), app size profiler. Trong bài đăng này, ta sẽ làm sáng tỏ một trong những khía cạnh bí truyền của ứng dụng nhiều hơn và chỉ cho bạn cách các reference type đóng góp vào kích thước nhị phân và làm app khởi động chậm hơn.
#  Dyld
App của bạn bắt đầu khi Macho-O executable được loaded bởi dyld. Dyld là Apple's program chịu trách nhiệm cho việc getting một app đã sẵn sàng để sử dụng. Nó chạy trong cùng một quy trình với code bạn viết và bắt đầu bằng cách load tất cả frameworks, bao gồm cả system frameworks.

Một phần công việc của dyld's là "rebasing" pointer trong binary metadata nơi mô tả các types trong source code của bạn. Metadata này cho phép các tính năng dynamic runtime, nhưng có thể là nguồn chung của việc to lên binary size. Đây là layout của một Obj-C class được tìm thấy trong compiled app binary:
```Swift
struct ObjcClass {
  let isa: UInt64
  let superclass: UInt64
  let cache: UInt64
  let mask: UInt32
  let occupied: UInt32
  let taggedData: UInt64
}
```
Mỗi `UInt64` là m,ột địa chỉ của một mảnh metadata khác. Đây là trong app binary, vì vậy mọi người trên thế giới đều tải xuống cùng một dữ liệu từ App Store. Tuy nhiên, mỗi lần app của bạn được khởi động nó được đặt ở những vị trí khác nhau trong bộ nhớ (trái ngược với việc luôn bắt đầu từ 0) bới vì address space layout randomization (ASLR). Đây là một tính năng bảo mật được thiết kế để gây khó khăn cho việc dự đoán một chức năng cụ thể trong bộ nhớ.

Vậy vấn đề với ASLR là địa chỉ thì hardcoded trong app của bạn bây giờ đã bị sai, offset bởi một random start location. Dyld chịu trách nhiệm cho việc sửa lỗi này bằng cách rebase lại tất cả các pointer để tính đến vị trí bắt đầu duy nhất. Quá trình này được thực hiện cho mọi pointer trong tệp thực thi của bạn và tất cả các frameworks phụ thuộc, bao gồm cả recursive dependencies. Có những loại thiết lập metadata khác được thực hiện bởi DYLD mà tác động đến thời gian khởi động, chẳng hạn như "binding", nhưng đối với bài viết này, chúng ta sẽ chỉ tập trung vào sự rebase lại.

Tất cả các thiết lập pointer này làm tăng thời gian khởi động ứng dụng, do đó, giảm nó trong app binary sẽ làm thời gian bắt đầu nhanh hơn. Hãy xem nó đến từ đâu và chính xác những gì nó có thể tác động.

# Swift và Obj-C
Chúng ta thấy rằng rebase time là do Obj-C metadata trong app nhưng chính xác nguyên nhân gây ra metadata trong Swift app? Swift có `@objc` attribute để hiển thị các khai báo từ Objective-C code, nhưng metadata được sinh ra ngay cả khi Swift type không hiển thị với code Objective-C. **Điều này là do tất cả các class type chứa Objective-C metadata trong Apple platforms**
Hãy xem điều này trong hành động với đoạn code sau:
```Swift
final class TestClass { }
```
Đây là một đoạn code thuần Swift, nó không kế thừa từ `NSObject` và cũng không sử dụng `@objc`. Tuy nhiên, nó sẽ sinh ra một Obj-C class metadata trong binary và thêm 9 pointer rằng nó cần rabasing. Để chứng minh nó, quan sát binary với tool như Hopper và xem mục objc_class cho class "thuần Swift" của bạn:
![Obj-C metadata in the app binary](https://images.viblo.asia/f166d451-1fc2-4603-bead-5c74bbcfa504.png)
Bạn có thể xem chính xác số lượng pointer cần thiết để chạy một ứng dụng bằng cách đặt biến môi trường của `DYLD_PRINT_STATISTICS_DETAILS` thành 1. Nó sẽ in ra tổng cộng số lượng rebae fixups trên console sau khi app khởi động. Chúng ta thậm chí có thể tìm ra chính xác nơi của 9 pointer này
![](https://images.viblo.asia/1150f8aa-0640-4354-be21-1d83efd9339e.jpeg)
Không phải tất cả các swift type cần một số rebase. Nếu bạn phơi bày các phương thức đối với Obj-C bằng cách override từ superclass hoặc confirm với một Obj-C protocol bạn sẽ cần thêm nhiều rebase. Ngoài ra mọi property trong Swift class sẽ tạo ra một ivar trong Objective-C metadata.
# Đo lường
Thời gian khởi động app bị tác động bởi rebase sẽ thay đổi dựa trên loại thiết bị và những cái khác chạy trên điện thoại. Tôi đã đo trên một trong những thiết bị lâu đời nhất iPhone 5S.

Khởi động iOS có thể được phân loại vào warm hoặc cool. Ấm khi hệ thống đã khởi chạy ứng dụng và lưu trữ một số thông tin thiết lập DYLD. Kể từ lần khởi động đầu tiên tôi thử nghiệm với một cool start nó đã chậm hơn một chút.
![](https://images.viblo.asia/5ea4effc-3de8-45c0-a557-366d10a8cd17.png)
Trong trường hợp này, chúng ta sẽ thấy ~ 1ms tăng trên 2000 hoạt động rebase. Đây sẽ không phải là số tuyệt đối cho thời gian khởi động vì một số thao tác có thể được thực hiện song song, nhưng nó cung cấp cho chúng ta một giới hạn thấp hơn và với 400k rebase, chúng ta đã dùng một nửa giới hạn khuyến nghị của Apple là 400ms.
# Ví dụ
Hãy thử đo số lượng hoạt động rebase trong một vài ứng dụng phổ biến.
```Swift
% xcrun dyldinfo -rebase TikTok.app/TikTok | wc -l
2066598
```
Tiktok có hơn 2 triệu rebase, kết quả này trong toàn bộ thời gian khởi động! Tiktok sử dụng Objective-C, nhưng tôi cũng đã thử nghiệm một vài ứng dụng Swift lớn nhất sử dụng kiến trúc nhị phân monolithic (trái ngược với các framworks) và được tìm thấy trong khoảng 685k đến 1,8m rebase.
# Vậy ta nên làm gì?
Mặc dù mỗi class tăng các hoạt động Rebase, tôi sẽ không khuyến nghị thay thế mọi class Swift bằng một struct. Các struct lớn cũng có thể tăng kích thước binary và trong một số trường hợp, bạn chỉ cần reference semantics. Như với bất kỳ cải tiến hiệu suất nào, bạn nên tránh tối ưu hóa sớm và bắt đầu với phép đo. [Emerge](https://www.emergetools.com/) có thể xác định có bao nhiêu rebase trong ứng dụng của bạn, mà chúng đến từ các modules và type nào trong các modules đó là đóng góp lớn nhất. Khi bạn đã đo được vấn đề bạn có thể tìm kiếm các lĩnh vực cải tiến trong ứng dụng của riêng bạn. Dưới đây là một vài trường hợp phổ biến:
## Composition vs Inheritance
Giả sử bạn có:
```Swift
class Section: Decodable {
  let name: String
  let id: Int
}

final class TextRow: Section {
  let title: String
  let subtitle: String

  private enum CodingKeys: CodingKey {
    case title
    case subtitle
  }

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    title = try container.decode(String.self, forKey: .title)
    subtitle = try container.decode(String.self, forKey: .subtitle)
    try super.init(from: decoder)
  }
}

final class ImageRow: Section {
  let imageURL: URL
  let accessibilityLabel: String

  private enum CodingKeys: CodingKey {
    case imageURL
    case accessibilityLabel
  }

  required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    imageURL = try container.decode(URL.self, forKey: .imageURL)
    accessibilityLabel = try container.decode(String.self, forKey: .accessibilityLabel)
    try super.init(from: decoder)
  }
}
```
Điều này sẽ tạo ra rất nhiều metadata, nhưng bạn có thể biểu thị cùng một ý tưởng với các loại giá trị được ưu tiên cho một lớp dữ liệu và kết thúc với rebase ít hơn 22%. Điều này liên quan đến việc thay thế object inheritance với value composition, chẳng hạn như enum với associated values hoặc generic types.
```Swift
struct Section<SectionType: Decodable>: Decodable {
  let name: String
  let id: Int
  let type: SectionType
}

struct TextRow: Decodable {
  let title: String
  let subtitle: String
}

struct ImageRow: Decodable {
  let imageURL: URL
  let accessibilityLabel: String
}
```
## Categories trong Swift
Mặc dù Swift sử dụng extension và k dùng categorues, bạn vẫn có thể tạo ra category binary metadata bằng cách định nghĩa một extension sử dụng Objective-C function. Ví dụ:
```Swift
extension TestClass {
  @objc
  func foo() { }
 
  override func bar() { }
}
```
cả 2 function đã bao gồm binary metadata, nhưng khi chúng được khai báo trong extension nên chúng được reference bới một synthesized category trong `TestClass`. Di chuyển các function này vào original class declaration  để tránh thêm chi phí metadata trong binary. Loại metadata này có thể được tự động gắn cờ với các công cụ phân tích nhị phân của Emerge.

Tiếp tục một bước nữa, bạn có thể tránh hoàn toàn @ojbc bằng cách sử dụng các closure-based callbacks - được [giới thiệu trong iOS 14](https://developer.apple.com/documentation/uikit/uibutton/3600777-init).
## Many Properties
Mỗi một property trong một Swift class sẽ thêm 3 - 6 rebasing fixups, tuỳ thuộc vào nếu class đó là `final`. Chúng thực sữ có thể tăng lên cho các class lớn hơn với hơn 20 property. Ví dụ:
```Swift
final class TestClass {
  var property1: Int = 0
  var property2: Int = 0
  ...
  var property20: Int = 0
}
```
Đưa nó vào struct sẽ giảm tới 60% rebase fixups:
```Swift
final class TestClass {
  struct Content {
    var property1: Int = 0
    var property2: Int = 0
    ...
    var property20: Int = 0
  }
 
  var content: Content = .init()
```
## Codegen
Một trong những thay đổi ROI cao nhất bạn có thể thực hiện là cải thiện codegen. Việc sử dụng CodeGen phổ biến là tạo các mô hình dữ liệu được chia sẻ trên các codebase. Nếu bạn đang làm điều này với nhiều type, bạn nên cảnh giác với số lượng metadata OBJ-C mà nó có thể thêm. Tuy nhiên, thậm chí các value type có một overhead trong mã và rebase fixups. Giải pháp tốt nhất sẽ là giảm thiểu số lượng các cidegebed types, thậm chí thay thế các custom type với các generated functions.

Những ví dụ này chỉ là một vài trong số các cách có binary size có thể dẫn đến tăng thời gian khởi động. Một nguyên nhân khác là thời gian để load code từ disk vào memory, bạn càng có nhiều code thì nó sẽ càng lâu.

Bài viết đến đây là hết.
Nguồn: https://medium.com/geekculture/why-swift-reference-types-are-bad-for-app-startup-time-90fbb25237fc