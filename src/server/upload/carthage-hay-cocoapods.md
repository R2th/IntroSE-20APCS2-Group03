Mỗi ngôn ngữ lập trình đi kèm với một giải pháp chính thức để phân phối code, chia sẻ và sử dụng lại code đã được viết, thường được xử lý bởi [package manager](https://en.wikipedia.org/wiki/Package_manager). 
Các ví dụ về package manager phổ biến là [RubyGems](https://rubygems.org/) cho Ruby, [Composer](https://getcomposer.org/) cho PHP, [NPM](https://www.npmjs.com/) cho NodeJS, Gradle cho Java,... 
không chỉ cung cấp các giải pháp chính thức mà còn có các kho lưu trữ tập trung cho các gói máy chủ được tạo bởi các nhà phát triển. Tuy nhiên, Apple là một ngoại lệ cho điều này, các ngôn ngữ như Objective-C và Swift đã được phát hành ra không có giải pháp quản lý gói chính thức được hỗ trợ hoặc có kho lưu trữ tập trung vào các gói lưu trữ. 
Điều này tạo cơ hội cho các công ty hoặc nhà phát triển bên thứ ba xây dựng một công cụ không chính thức để quản lý các gói cho Objective-C hoặc Swift. Đó là lý do các công cụ như Cocoapods và Carthage tung ra thị trường và trở nên phổ biến.

Công cụ quản lý thư viện Swift cho iOS hiện chỉ có hai tùy chọn chính tại thời điểm này là [Cocoapods](https://cocoapods.org/) và [Carthage](https://github.com/Carthage/Carthage). Trình quản lý gói chính thức mà Apple hiện đang làm việc là [Swift Package Manager](https://swift.org/package-manager/) để chia sẻ và phân phối các gói Swift sẽ thay thế cho các trình quản lý gói hiện tại trong giới phát triển iOS. Tuy nhiên, sự phát triển của nó rất chậm và hiện tại nó không hỗ trợ cho iOS nên nó không đáng để suy nghĩ về nó. Có một cách giải quyết để làm cho nó hoạt động với mẫu Xcode cho các dự án iOS nhưng nó có thể không hỗ trợ với phiên bản Xcode sau này. Bạn nên kiên nhẫn và đợi đến khi Apple công bố hỗ trợ chính thức của Trình quản lý gói Swift cho các ứng dụng iOS. Hy vọng rằng một ngày nào đó, các nhà phát triển iOS sẽ có giải pháp quản lý gói chính thức cho iOS từ Apple.
Trong bài đăng này, mình sẽ đánh giá một cách nghiêm túc các công cụ quản lý thư viện Swift là CocoaPods và Carthage để các nhà phát triển iOS có thể đưa ra lựa chọn phù hợp cho ứng dụng của họ.
## CocoaPods
Dù có thích hay ghét nó thì bạn vẫn phải sử dụng nó. Cocoapods tồn tại từ những ngày Objective-C cũ và cũng hoạt động với Swift. Điều này chủ yếu được sử dụng quản lý phụ thuộc cho đến nay cho dự án iOS là công cụ tiêu chuẩn thực tế. CocoaPods là một thư viện Ruby và cần được cài đặt bằng RubyGem.CocoaPods có kho lưu trữ tập trung của tất cả các gói có thể được sử dụng trong dự án Xcode. CocoaPods không phải là một dự án đơn lẻ mà là tập hợp các dự án được viết bằng Ruby. CocoaPods được xây dựng với Ruby và có thể cài đặt với Ruby mặc định có sẵn trên OS X.
```
$ sudo gem install cocoapods
```
Nếu bạn đến từ nền tảng phát triển của Ruby thì bạn có thể sử dụng [RVM](https://rvm.io/) và [Bundler](https://bundler.io/) để quản lý các phiên bản và thư viện của Ruby. CocoaPods có thể được khởi tạo bằng lệnh pod init sẽ tạo mẫu Podfile nhưng chúng ta có thể tạo Podfile đơn giản của riêng mình sẽ trông như thế này:
```
platform :ios, '8.0'
use_frameworks!
target 'MyApp' do
  pod 'SwiftyJSON', '~> 2.3'
end
```
Để thiết lập SwiftyJSON, thư viện Swift rất phổ biến để phân tích cú pháp JSON ứng dụng. Bây giờ, chúng ta có thể cài đặt SwiftyJSON bằng câu lệnh:
```
$ pod install
```
Sau lệnh này, bạn sẽ bối rối và có thể không nhận ra dự án Xcode cũ của mình vì CocoaPods đã thực hiện rất nhiều thay đổi cho dự án Xcode của bạn bằng câu lệnh này. Mình chắc chắn rằng không nhiều người trong chúng ta bận tâm để biết những gì đã được thay đổi miễn là ứng dụng iOS biên dịch và xây dựng đúng sau lệnh pod install. Chúng ta sẽ xem nhanh những gì đã thay đổi sau khi cài đặt.
### Những thay đổi nào đã được CocoaPods thực hiện?
Lệnh trên (pod install) rất kỳ diệu, tạo ra nhiều thay đổi cho dự án Xcode của chúng ta. Hầu hết thời gian, nó rất khó hiểu rằng những gì đã được thay đổi.
* CocoaPods tạo thư mục Xcode Workspace, có phần mở rộng .xcworkspace nơi nó xây dựng tất cả các phụ thuộc. Chúng ta phải sử dụng không gian làm việc Xcode để làm cho CocoaPods hoạt động.
* CocoaPods đã thêm một số scripts trong các giai đoạn xây dựng mục tiêu của chúng tôi. Thường có ba scripts được thêm vào các giai đoạn xây dựng của mục tiêu
![](https://images.viblo.asia/6e7f2c66-e4c1-49a4-874c-9e19dad0aa12.png)
* Thêm Podfile.lock (Phiên bản khóa của thư viện)
* Đã liên kết Pods với Binaries Libraries
![](https://images.viblo.asia/a5bda60e-678a-4a96-b2b7-334da9bebe24.png)
* Một thư mục Pods chứa mã nguồn của các phụ thuộc Pod, các tệp hỗ trợ, xcconfigfiles
![](https://images.viblo.asia/96f7a4b9-0161-4101-9692-ba15fa121e05.png)
### Quá trình xây dựng CocoaPods
Quá trình xây dựng điển hình của các dự án của CocoaPods bao gồm các bước sau.
* CocoaPods sẽ xây dựng và biên dịch các frameworks của chúng ta mỗi khi bạn thực hiện việc xây dựng, cài đặt hoặc cập nhật pod cho dự án.
* Xcode sau đó kiểm tra xem Podfile.lock có thay đổi hay không nếu thay đổi thì Xcode sẽ xây dựng lại framework nếu không sử dụng các framework dựng sẵn.
* Bạn có thể đã thấy rằng dự án mất nhiều thời gian khi bạn thực hiện xây dựng hoặc xóa dữ liệu có nguồn gốc khi sử dụng CocoaPods.
* CocoaPods sẽ xây dựng tất cả các thư viện được đề cập trong Podfile cho project đó, có thể có một số trường hợp bạn không muốn cài đặt một số thư viện nhưng CocoaPods đã tự động cài đặt vào project của bạn.
### Làm thế nào để loại bỏ CocoaPods
Khi bạn đã sử dụng CocoaPods, không có cách nào để loại bỏ nó khỏi dự án của bạn. CocoaPods đã thực hiện nhiều thay đổi trên toàn bộ dự án Xcode của bạn, xây dựng cài đặt và cấu trúc thư mục. CocoaPods có các lệnh pod deintegrate và pod sạch nhưng vẫn cần đảm bảo những gì nó đã thực hiện. Tuy nhiên, có một số hành động thủ công để loại bỏ hoàn toàn CocoaPods khỏi các dự án iOS:
* Xóa các tệp: Podfile, Podfile.lock và thư mục Pods của bạn
* Xóa xcworkspace đã tạo
* Mở tệp xcodeproj của bạn, xóa các tham chiếu đến Pods.xcconfig và libPods.a
* Trong Giai đoạn xây dựng của bạn, hãy xóa các Tài nguyên Pods sao chép, các framework nhúng Pods và kiểm tra các giai đoạn Manifest.lock của Pods.
* Trong Build Phases hãy xóa Copy Pods Resources , Embed Pods Frameworks và Check Pods Manifest.lock
* Cách này có vẻ hiển nhiên nhưng bạn sẽ cần tích hợp các thư viện bên thứ 3 theo cách khác hoặc xóa tham chiếu đến chúng khỏi mã của bạn.
### Ưu điểm của Cocoapods
* Dễ cài đặt
* CocoaPods tự động hóa toàn bộ quá trình xây dựng, liên kết sự phụ thuộc với các mục tiêu.
* Cộng đồng CocoaPods lớn, rất nhiều đóng góp, khắc phục những thiếu sót của Apple
* Hỗ trợ hầu hết các thư viện cho swift
* Hoạt động tốt cho các dự án nhỏ với ít mã hơn để có được một cái gì đó hoạt động rất nhanh.
### Nhược điểm
* Nó đòi hỏi kiến thức về Ruby
* Khó tích hợp khi đã sử dụng Xcode workspace.
* Khó để loại bỏ 1 thư viện đã được tích hợp
* CocoaPods kiểm soát toàn bộ dự án Xcode và nếu có lỗi xảy ra, toàn bộ dự án stop builing. Việc sửa các lỗi được đưa ra bởi CocoaPods là nhiệm vụ khó khăn, tốn thời gian và đòi hỏi sự hiểu biết về những gì mà Cocoapods đã thay đổi trong dự án iOS.
* Pods buộc dự án của bạn vào một cấu trúc cụ thể
* Xây dựng các thư viện và framework cho Cocoapods trở thành một nỗi đau đối với các nhà phát triển iOS không có kỹ năng về Ruby. Nhà phát triển cần ghi tệp .podspec và theo dõi nhiều Ruby không liên quan
* Tích hợp với Continuous Integration Server rất khó vì chúng ta phải cài đặt và quản lý thư viện Ruby. Tất cả các phụ thuộc cần phải được cài đặt và xây dựng cho mỗi bản hoặc chúng ta phải kiểm tra toàn bộ các phụ thuộc của bên thứ ba trong dự án. Cơ chế bộ nhớ đệm không phải lúc nào cũng cho kết quả sạch.
* Không thế làm việc với framework và project cùng một lúc vì quy trình hai bước để làm việc phụ thuộc.
## Carthage
Carthage là một trình thư viện, framework cho dự án iOS. Carthage đã được viết hoàn toàn bằng Swift để quản lý các phụ thuộc iOS mà không thay đổi bất cứ điều gì trong các dự án Xcode của bạn. Carthage chỉ tải xuống và xây dựng các phụ thuộc bằng công cụ xcodebuild nhưng sẽ không thay đổi tệp Dự án hoặc cài đặt xây dựng dự án Xcode như CocoaPods. Chúng ta phải kéo thủ công các framework binaries vào Thư viện và Frameworks được liên kết trong giai đoạn xây dựng của dự án.
Chúng tôi có thể cài đặt Carthage bằng [HomeBrew](https://brew.sh/) hoặc bạn có thể tải xuống .pkg từ [Github](https://github.com/Carthage/Carthage) và cài đặt thủ công.
```
$ brew install carthage
```
Bây giờ chúng ta đã sẵn sàng để sử dụng Carthage. Như ví dụ với Cocoapods, chúng ta cần lấy SwiftyJSON bằng Carthage sau đó chúng ta phải tạo tệp có tên Cartfile với nội dung sau.
```
github "SwiftyJSON/SwiftyJSON"
```
Bây giờ, chúng tôi đã chỉ sự phụ thuộc vào Cartfile, chạy câu lệnh:
```
$ carthage update
```
Việc này sẽ lấy phụ thuộc vào thư mục [Carthage / Checkouts](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#carthagecheckouts), sau đó xây dựng từng cái. Trong khi Cocoapods là tự động, chúng ta phải thực hiện thủ công.
Trên ứng dụng của bạn, chọn General, trong Linked Frameworks and Libraries, kéo và thả từng framework bạn muốn sử dụng từ thư mục [Carthage / Build](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#carthagebuild).
### Carthage thực hiện những thay đổi gì?
Carthage rất đơn giản và chỉ cần kiểm tra và xây dựng các phụ thuộc và để lại cho bạn để thêm các nhị phân vào Xcode. Nó cung cấp cho bạn toàn quyền kiểm soát những gì chúng ta đang thêm vào Xcode.
### Quá trình xây dựng Carthage
Quá trình xây dựng điển hình mà các dự án Carthage bao gồm các bước sau.
* Carthage lấy các thư viện và framework bằng cách sử dụng lệnh cập nhật carthage chỉ xảy ra một lần.
* Xcode sẽ không build lại bất kỳ framework nào khi build dự án. Điều này tăng tốc quá trình build.
* Framework cần phải build lại khi chúng ta có phiên bản mới của bất kỳ sự phụ thuộc nào.
### Làm thế nào để loại bỏ Carthage?
Sau khi được tích hợp, nó rất dễ dàng loại bỏ Carthage khỏi dự án iOS. Có một vài bước mà chúng ta có thể thực hiện để đảm bảo Carthage được xóa hoàn toàn khỏi dự án Xcode.
* Xoá Cartfile và Cartfile.resolved
* Xoá thư mục Carthage
* Xoá linked frameworks khỏi Build phase.
* Xoá copy-frameworks script khỏi Build phase.
Như vậy là bạn đã loại bỏ hoàn toàn Carthage ra khỏi project của mình.
### Ưu điểm của Carthage
* Carthage là quản lý phụ thuộc phi tập trung, đơn giản cho iOS
* Carthage hoàn toàn được viết bằng Swift để các nhà phát triển iOS có thể hiểu được công nghệ đằng sau Carthage và có thể viết một công cụ khác bằng [CarthageKit](https://github.com/Carthage/Carthage/tree/master/Source/CarthageKit)
* Carthage rất dễ tích hợp và dễ dàng loại bỏ khỏi dự án nếu nó không phù hợp với nhu cầu của dự án.
* Carthage không ảnh hưởng cài đặt Xcode hoặc tệp dự án của bạn. Nó chỉ tải xuống và xây dựng các phụ thuộc để bạn có quyền kiểm soát phù hợp với những gì bạn đang làm.
* Carthage hoạt động tuyệt vời cho các cơ sở mã hóa lớn hoặc chiết trung vì tính linh hoạt của nó
* Dễ dàng tích hợp và cập nhật các thư viện
* Carthage có thể dễ dàng tích hợp với Continuous Integration server.
* Dễ dàng để tương thích các thư viện với Carthage
* Phân cấp
* Có hỗ trợ Sub Modules
### Nhược điểm của Carthage
* Carthage có quá nhiều bước thủ công cần được thực hiện trong khi thiết lập.
* Carthage vẫn là framework mới và không có nhiều người đóng góp như CocoaPods
* Carthage chỉ hoạt động với các dynamic frameworks. Nó không làm việc với các static libraries.
* Carthage không có cách rõ ràng để hỗ trợ subspec trong các thư viện.
* Kiểm tra carthage và xây dựng các framework, chúng ta có thể cần kiểm tra các framework đó để xây dựng nhanh hơn có thêm repository size.
* Một số ý kiến cho rằng Carthage khá chậm chạp khi build các framework
* Carthage được cài đặt với homebrew không tương thích ngược.
* Không phải tất cả các framework đều có sẵn cho Carthage, đặc biệt là các thư viện cũ cần được thêm bằng cách sử dụng sub modules.
Carthage là trình quản lý phụ thuộc Swift rất đơn giản nhưng nó bao gồm rất nhiều thiết lập thủ công để bắt đầu.
## Mẹo để chọn Carthage hoặc CocoaPods
Bây giờ, chúng ta đã thấy những ưu và nhược điểm của cả CocoaPods và Carthage nhưng câu hỏi đặt ra là nên chọn loại nào cho dự án iOS của bạn. Tôi ghét câu trả lời này nhưng câu trả lời là "Tuỳ từng trường hợp!". Không có gì sai với Carthage hoặc CocoaPods nhưng việc chọn đúng thực sự phụ thuộc vào đội ngũ và kỹ năng của các kỹ sư làm việc trong nhóm.
Dưới đây là một số lời khuyên:
* Trước hết, hãy cố gắng tránh thêm bất kỳ sự phụ thuộc nào vào dự án iOS của bạn trừ khi nó thực sự cần thiết. Apple đã cung cấp cho bạn rất nhiều framework và công cụ riêng. Ngoài ra còn có khả năng thêm chức năng bổ sung vào các framework do Apple cung cấp. Hãy suy nghĩ 10 lần trước khi thêm bất kỳ sự phụ thuộc nào vào dự án của bạn. ví dụ: Khi thực hiện call API, bạn có thực sự cần Alamofire không, điều còn thiếu mà URLSession mặc định của Apple không thể giải quyết vấn đề của bạn. Cố gắng đạt được mọi thứ với các framework có sẵn vì rất hiếm khi Apple phá vỡ dự án của bạn.
* Trong khi bắt đầu các dự án mới, hãy suy nghĩ thật kỹ trước khi sử dụng CocoaPods. Khi bạn bắt đầu sử dụng CocoaPods, rất khó để loại bỏ nó khỏi dự án Xcode của bạn và bạn sẽ mất quyền kiểm soát dự án Xcode của mình.
* Ưu tiên Carthage trước vì nó được viết bằng Swift và nếu bạn nghĩ rằng nó không phù hợp thì hãy đến với CocoaPods
* Trong khi tích hợp các thư viện với cơ sở mã lớn, hãy sử dụng Carthage vì nó chỉ cần được xây dựng một lần.
* Nếu bạn đang suy nghĩ sử dụng nhiều thư viện trong dự án của mình thì CocoaPods sẽ là một lựa chọn tốt vì nó sẽ xây dựng framework mỗi khi bạn thực hiện clean build. Cũng như đã đề cập trước đó, bạn không có cơ hội ngừng xây dựng các thư viện mà bạn không cập nhật thường xuyên. Điều này thêm thời gian thêm vào quá trình xây dựng của bạn.
* Trong trường hợp cả CocoaPods và Carthage đều có thiếu sót, chúng ta có thể sử dụng cả 2 cùng một lúc.
* Nếu bạn không thành thạo Ruby, thì chắc chắn nên tránh CocoaPods. Sẽ rất khó để duy trì phiên bản và thư viện Ruby trên máy cục bộ cũng như trên Continuous Integration server
* Các thư viện sử dụng nhiều repos có thể được xử lý tốt với subspec của CocoaPods trong khi không có giải pháp tối ưu cho Carthage.
* Dù bạn chọn gì, hãy luôn kiểm tra mã nguồn của các thư viện bên thứ ba trong kho SCM. Không bao giờ mạo hiểm dự án của bạn khi thư viện bị mất từ Github.
* Sử dụng Carthage để kiểm tra các framework riêng tư hoặc nội bộ.
## Kết luận
Cả Carthage và CocoaPod đều có ưu và nhược điểm nhưng việc chọn một công cụ có thể khó cho bất kỳ dự án nào. Sở thích cá nhân của tôi là đi với Carthage trước sau đó thử đối phó với Ruby và Cocoapods nếu Carthage thất bại. Kinh nghiệm của bạn khi sử dụng Carthage hoặc Cocoapods là gì, hãy bình luận chia sẻ bên dưới bài viết này nhé!

Bài viết tham khảo [tại đây.](http://shashikantjagtap.net/carthage-cocoapods-question/)