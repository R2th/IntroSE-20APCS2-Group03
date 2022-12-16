## 1. Kiểm soát mã nguồn
Khi bạn đã được nhận vào làm tại một công ty, việc đầu tiên đó là fetch code từ repo về và làm việc thôi. 
Mọi Project đều cần có sự kiểm soát mã nguồn, ngay cả khi bạn là người duy nhất phát triển. Phổ biến nhất đó là Git và SVN.
### a. SVN: 
SVN được dựa trên một hệ thống tập trung để quản lý phiên bản. Đó là một kho lưu trữ trung tâm nơi các bản sao làm việc được tạo ra và cần có kết nối mạng để truy cập. Ủy quyền truy cập của nó là đường dẫn, nó theo dõi các thay đổi bằng cách đăng kí các tập tin và thay đổi lịch sử thay đổi chỉ có thể thấy một cách đầy đủ trong kho chứa.
### b. Git:
Git dựa trên hệ thống phân phối để quản lý phiên bản. Bạn sẽ có một kho lưu trữ cục bộ mà bạn có thể làm việc, chỉ cần kết nối mạng để đồng bộ hóa. Ủy quyền truy cập của nó là cho toàn bộ thư mục, theo dõi các thay đổi bằng cách đăng ký nội dung và cả kho lưu trữ và bản sao làm việc đều có lịch sử thay đổi hoàn chỉnh.
## 2.Các mẫu kiến trúc
Trước khi bạn bắt đầu code, bạn phải chọn một mẫu kiến trúc để đặt vào project của mình. Nếu bạn không bắt đầu dự án, bạn phải tuân theo mẫu đã được triển khai.
Có một số loại pattern được sử dụng trong phát triển ứng dụng dành cho thiết bị di động như: MVC, MVP, MVVM, VIPER, v.v. Sau đây là tổng quan nhanh về cách sử dụng một số pattern phổ biến nhất trong phát triển iOS:
### a. MVC:
Là viết tắt của Model, View, Controller. Controller tạo cầu nối giữa Model và View. Liên kết giữa View và Controller rất chặt chẽ, do đó Controller sẽ handling mọi xử lí. 
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/1200/1*dLNPhFL6k2MFJBAm9g24UA.png" src="https://cdn-images-1.medium.com/max/1200/1*dLNPhFL6k2MFJBAm9g24UA.png">
### b. MVVM:
Là viết tắt của Model, View, View Model. Binding được thiết lập giữa View và ViewModel, điều này cho phép ViewModel gọi các thay đổi trên Model, sau đó cập nhật ở ViewModel và tự cập nhật ở View do các binding.ViewModel không cần biết gì về View.
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/1200/1*E1TC8beTXLlgVHO29wJTpA.png" src="https://cdn-images-1.medium.com/max/1200/1*E1TC8beTXLlgVHO29wJTpA.png">
## 3. Objective -C và Swift
Khi quyết định ngôn ngữ nào bạn sẽ lập trình ứng dụng của mình, bạn cần phải biết ngôn ngữ nào mang lại cho bạn lợi ích cao hơn. Nếu đưa ra tùy chọn, cá nhân tôi, đề nghị sử dụng Swift. Tại sao? bời vì Objective-C có rất ít ưu điểm so với Swift. Hầu hết các ví dụ và hướng dẫn được viết trong Objective-C đều đã được cập nhật đối với Swift, các điều chỉnh được thực hiện cho các mô hình. Tuy nhiên, đây là những vấn đề mà về lâu dài sẽ biến mất.
Swift thực sự đã có rất nhiều cải tiến mới. Thật dễ đọc, giống với tiếng Anh tự nhiên và bởi vì nó không được xây dựng trên C, nó giảm các quy ước cũ. Đối với những người biết Objective-C, điều này có nghĩa là swift không còn có dấu chấm phẩy nữa, việc gọi phương thức không yêu cầu dấu ngoặc và không cần ngoặc đơn để bao quanh các biểu thức có điều kiện. Việc duy trì mã của bạn cũng dễ dàng hơn, Swift chỉ cần một tệp .swift thay vì tệp .h và a .m, vì Xcode và trình biên dịch LLVM có thể tìm ra các phụ thuộc và thực hiện các bản dựng gia tăng tự động. Nói chung bạn sẽ thấy rằng bạn có thể đạt được kết quả tương tự với ít mã hơn.
## 4. React hay non React
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/1200/1*pXx4SEZ7TExz5uCi2soXhw.gif" src="https://cdn-images-1.medium.com/max/1200/1*pXx4SEZ7TExz5uCi2soXhw.gif">

Functional Ractive Programming có mục đích là cho phép khởi tạo một cách dễ dàng các hoạt động không đồng bộ và các luồng sự kiện/ dữ liệu. Đối với Swift, nó là một sựu trừu tượng chung của tính toán thông qua các Observable
Đến với FRP bạn không chỉ còn làm việc với MVC mà bạn sẽ tiếp cận với mô hình MVVM. Bạn có thể tham khảo về RxSwift và RxCocoa là 2 thư viện mạnh mẽ của Swift FRP
##  5. Quản lý các thư viện
CocoaPods và Carthage là các nhà quản lý thư viện phổ biến nhất cho các dự án Swift và Objective-C Cocoa. Chúng đơn giản hóa quá trình thực hiện một thư viện và cập nhật nó.
 + Cocoapod được xây dựng bằng Ruby và được cài đặt bằng cách sử dụng lệnh sau : 
$ sudo gem install cocoapods
 + Carthage là một người quản lý thư viện phi tập trung, đối lập với CocoaPods. Nhược điểm này là nó trở nên khó khăn hơn cho người dùng để tìm các thư viện hiện có. Mặt khác, nó đòi hỏi công việc bảo trì ít hơn và tránh bất kỳ điểm trung tâm nào của sự thất bại.
## 6. Lưu trữ thông tin
Bắt đầu với cách đơn giản để lưu dữ liệu của app. Đó là NSUserDefault, bởi vì nó thường được dùng để lưu trữ dữ liệu người dùng mặc định, được đưa vào khi ứng dụng được tải lần đâì tiên. Hạn chế của nó là đối tượng nó nhận vào, chỉ đáp ứng một số loại nhất định như : NSDate, NSdata, NSNumber, NSDictionary, NSString. Ngoài ra Object cũng có thể được lưu trong NSUserDefault.
 + Keychain là hệ thống quản lý mật khẩu và có thể chứa mật khẩu, chứng chỉ, khóa cá nhân hoặc ghi chú riêng tư. KeyChain có hai mức mã hóa thiết bị. Mức đầu tiên sử dụng mật mã khóa màn hình làm khóa mã hóa. Mức thứ hai sử dụng một khóa được tạo ra bởi và được lưu trữ trên thiết bị.
 + CoreData là một framework được thiết kế bởi Apple, để ứng dụng của bạn giao tiếp với cơ sở dữ liệu của nó theo cách thức hướng đối tượng. Nó đơn giản hóa quá trình, giảm mã và loại bỏ sự cần thiết phải kiểm tra phần mã đó.
## 7. CollectionView và TableView
Mọi ứng dụng đều có một hoặc nhiều CollectionView và / hoặc TableView. Biết cách nó làm việc và khi nào sử dụng cái này hay cái kia, sẽ ngăn những thay đổi phức tạp đối với ứng dụng của bạn trong tương lai.
 + TableView hiển thị một danh sách các mục, trong một cột đơn, một kiểu thẳng đứng và chỉ giới hạn trong việc cuộn dọc. Mỗi mục được đại diện bởi một UITableViewCell, có thể được tùy chỉnh hoàn toàn. Đây có thể được sắp xếp thành các phần và hàng.
 + CollectionView cũng hiển thị một danh sách các mục, tuy nhiên, chúng có thể có nhiều cột và hàng . Nó có thể cuộn theo chiều ngang và / hoặc theo chiều dọc, và mỗi mục được đại diện bởi một UICollectionViewCell. Giống như UITableViewCells, chúng có thể được tùy chỉnh theo ý muốn và được sắp xếp thành các phần và hàng.
## 8. Storyboad và Xib
Mỗi phương pháp này có thể được sử dụng riêng lẻ để tạo giao diện người dùng, tuy nhiên có thể kết hợp chúng với nhau.
 + Storyboad cho phép xem rộng hơn về dự án mà nhà thiết kế yêu thích vì họ có thể thấy luồng ứng dụng và tất cả các màn hình. Nhược điểm là khi nhiều màn hình được thêm vào, các kết nối trở nên khó hiểu hơn và thời gian tải bảng phân cảnh được tăng lên. Hợp nhất các vấn đề xung đột xảy ra thường xuyên hơn rất nhiều, bởi vì toàn bộ giao diện người dùng thuộc về một tệp. Họ cũng rất khó giải quyết hơn.
 + Xibs cung cấp chế độ xem trực quan về màn hình hoặc các phần của màn hình. Lợi thế của họ dễ sử dụng lại, ít xung đột hợp nhất hơn so với cách tiếp cận cốt truyện và cách dễ dàng để xem nội dung trên mỗi màn hình.
## 9. Protocol
Protocol định nghĩa ra danh sách các phương thức, các thuộc tính và các yêu cầu khác của các chức năng đã cho. Nó có thể được implement bởi một lớp, một cấu trúc. 
Protocol cũng được dùng trong Delegation. Nó cho phép Class hay Struct implement các phương thức trong protocol.
## 10. Closures
Closures chủ yếu được sử dụng để trả lại một khối block, hay các hàm bậc cao. 
Closures trong Swift tương tự như Blocks trong Objective C.
Trong Swift function cũng chính là một closures đặc biệt
## 11. Schemes
Nói một cách đơn giản, Schemes là cách dễ dàng để chuyển đổi giữa các cấu hình. Hãy cung cấp cho bạn một số thông tin cơ bản. Một không gian làm việc chứa các dự án liên quan khác nhau. Một dự án có thể có nhiều target - target specify của một sản phẩm để xây dựng và cách xây dựng nó. Một dự án cũng có thể có nhiều cấu hình khác nhau. Một lược đồ Xcode định nghĩa một tập hợp các target để xây dựng, một cấu hình để sử dụng khi xây dựng và một tập hợp các phép thử để thực thi.
<img class="progressiveMedia-image js-progressiveMedia-image" data-src="https://cdn-images-1.medium.com/max/1200/1*eW_7GjRt-gmV1XoBB2BhlA.png" src="https://cdn-images-1.medium.com/max/1200/1*eW_7GjRt-gmV1XoBB2BhlA.png">

## 12. Test
Nếu bạn có thể phân bổ thời gian để thử nghiệm ứng dụng của mình, bạn đang đi đúng hướng. Bạn không thể ngăn chặn mọi lỗi và không thể đảm bảo ứng dụng của bạn sẽ không có bất kỳ vấn đề nào, tuy nhiên tôi nghĩ những ưu điểm vượt trội hơn nhược điểm.
Có một vài công cụ bạn có thể sử dụng để kiểm tra xem ứng dụng của bạn có gì. Tùy thuộc vào những gì bạn muốn xem, bạn có thể chọn một hoặc nhiều trong số đó. Ví dụ như: Leak Checks, Profile Timer & Memory Allocation.
## 13. Location
Rất nhiều ứng dụng sẽ có một số tính năng yêu cầu vị trí của người dùng. Vì vậy, bạn nên có kiến thức chung về cách vị trí hoạt động cho iOS. 
Có một framework được gọi là CoreLocation cho phép bạn truy cập tất cả những gì bạn cần:
+ CoreLocation cho phép bạn xác định vị trí hoặc tiêu đề hiện tại được liên kết với một thiết bị. Framework sử dụng phần cứng có sẵn để xác định vị trí và tiêu đề của người dùng. Bạn sử dụng các class và protocol trong framework này để định cấu hình và lên lịch phân phối các sự kiện vị trí và tiêu đề. Bạn cũng có thể sử dụng nó để xác định vùng địa lý và theo dõi khi người dùng vượt qua ranh giới của các vùng đó. Trong iOS, bạn cũng có thể xác định vùng xung quanh đèn hiệu Bluetooth.
## 14. Localizable Strings
Một  thứ mà mọi ứng dụng nên thực hiện. Nó cho phép ứng dụng thay đổi ngôn ngữ, theo khu vực mà người dùng đang ở. Ngay cả khi ứng dụng của bạn chỉ bắt đầu bằng một ngôn ngữ, trong tương lai, nhu cầu thêm ngôn ngữ mới có thể phát sinh. Nếu tất cả văn bản được nhập bằng cách sử dụng các chuỗi có thể định vị được, tất cả những gì cần phải làm là thêm phiên bản đã dịch của tệp Localizable.strings, cho ngôn ngữ mới.
Một source có thể được thêm vào một ngôn ngữ thông qua thanh tra tập tin. Để tìm nạp một String với NSLocalizedString, tất cả những gì bạn cần làm là như sau: NSLocalizedString(key:, comment:)

Trên là 14 điều cần biết đối với một lập trình viên IOS, các bạn nên tìm hiểu sâu hơn các vấn đề trên để nâng cao khả năng của mình hơn :D 

Nguồn : https://swiftsailing.net/14-must-knows-for-an-ios-developer-5ae502d7d87f