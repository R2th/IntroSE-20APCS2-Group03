# 1. Giới thiệu về SwiftUI   
Ở sự kiện WWDC 2019 vừa diễn ra, Apple đã giới thiệu một framework để xử lý thiết kế giao diện theo phong cacsh mới. Bài viết này giới thiệu về **SwiftUI** framework. 

**SwiftUI** là bộ công cụ giao diện người dùng cho phép  thiết kế các ứng dụng theo cách **declarative**.  **SwiftUI** cho phép chúng ta thực hiện  giao diện  trông như thế nào và hoạt động ra sao, và nó chỉ ra cách làm cho điều đó xảy ra khi người dùng tương tác với nó.

Thiết kế UI theo phong cách **declarative**  được hiểu rõ nhất so với UI theo trường phái **imperative**, đó là những gì các nhà phát triển iOS đã làm trước với phiển bản  iOS 13. Trong giao diện theo kiểu **imperative**, chúng ta có thể gọi một hàm khi nhấn  vào một **button**  và bên trong hàm chúng ta sẽ đọc một giá trị và hiển thị một **label**  - chúng ta thường xuyên sửa đổi giao diện dựa trên những gì đang xảy ra.

Giao diện theo kiểu **imperative**  gây ra tất cả các loại vấn đề, hầu hết trong số đó xoay quanh **state**,   có nghĩa là các giá trị được lưu trữ trong code. Chúng ta cần theo dõi state của code và đảm bảo giao diện  phản ánh chính xác **state** đó.

Nếu chúng ta có một màn hình với một thuộc tính Boolean ảnh hưởng đến UI, chúng ta có hai **state**: boolean  có thể ON hoặc OFF. Nếu chúng ta có hai boolean, A và B, bây giờ chúng ta có bốn **state**.
* A  là OFF  và  B là  OFF
* A là ON and B là OFF
* A là OFF and B là ON
* A là ON and B is ON

Vậy  nếu chúng ta có ba Booleans? Hay năm? Hoặc là dữ liệu dạng số nguyên, chuỗi,  hay date và nhiều hơn nữa? Kết quả là càng lúc càng phức tạp hơn.

Nếu bạn đã từng sử dụng một ứng dụng nói rằng bạn có 1 tin nhắn chưa đọc cho dù bạn có cố gắng chỉ ra rằng bạn đã đọc  thì đó là một vấn đề về **state**- đó là một vấn đề về UI theo kiểu **imperative**.

Ngược lại, UI kiểu **declarative** cho phép chúng ta nói với iOS về tất cả  các  **state** có thể có của ứng dụng  cùng một lúc. Chúng ta có thể nói nếu chúng ta đăng nhập thì sẽ hiển thị thông báo chào mừng nhưng nếu chúng tôi đăng  xuất thì hiển thị nút đăng nhập. Chúng  ta không cần phải viết code để di chuyển giữa hai trạng thái đó bằng tay - đó là cách làm việc không tốt, đó là cách **imperative** !

Thay vào đó, chúng ta để SwiftUI di chuyển giữa các UI  khi mà   **state** thay đổi. Chúng ta hiển thị dựa trên việc người dùng đã đăng nhập hay đăng xuất, vì vậy khi chúng ta thay đổi   **state** xác thực, SwiftUI sẽ  cập nhật UI.

Có nghĩa là bằng cách **declarative**: chúng ta không làm cho các thành phần SwiftUI hiển thị và ẩn bằng tay, chúng ta thiết lập  các quy tắc để nó tuân theo và  thoát khỏi SwiftUI, đảm bảo các quy tắc đó được thi hành.

Nhưng SwiftUI không dừng lại ở đó: nó cũng hoạt động như một lớp UI đa nền tảng hoạt động trên iOS, macOS, tvOS và thậm chí là watchOS. Điều này có nghĩa là bây giờ bạn có thể học một ngôn ngữ và một khung layout  dạng framework, sau đó triển khai code của bạn ở bất cứ đâu.

# 2. Sự khác nhau giữa SwiftUI và Interface Builder, Storyboard
Hầu hết các nhà phát triển iOS có kinh nghiệm đều quá quen thuộc với **IB** (Interface Builder) và **Storyboard**.
Vậy sự khác biệt giữa **SwiftUI** và **IB**, **Storyboard** là gì?
File **XIB** và **Storyboard** chứa lượng lớn code định dạng **XML**, bạn đã bao giờ phải chỉnh sửa file này chưa? Ứng dụng càng phát triển thì số lượng file, bản thân file ngày càng phình to lên khi bạn thêm các UI control khác nhau, khi bạn có bất kỳ thay đổi nào dẫn đến chi phí nguồn lực tăng lên đáng kể. Hoặc khi ai đó thay đổi XIB, gây ra sự conflict tương đối trầm trọng. Ngoài ra, file XIB hoặc Storyboard có mối liên hệ chặt chẽ với sourcode, bất kỳ thay đổi nào trong file này mà không được update trong source code, sẽ gây ra sai sót đáng kể.

Những vấn đề này tồn tại bởi vì IB và Swift là những thứ rất riêng biệt. Đây không phải là một bất ngờ lớn - không chỉ có tool tạo UI  bắt đầu từ trước khi Mac OS X ban đầu , mà nó còn được thiết kế  xung quanh cách thức hoạt động của Objective-C.

**SwiftUI** được tạo ra để giải quyết vấn đề này. Đơn giản, nó là một framework dành cho Swift, ngoài việc Appl đang dần khai tử **Objective-C**,  nó cho phép **SwiftUI** tận dụng toàn bộ phạm vi chức năng của Swift, - các loại giá trị, các kiểu trả về , mở rộng giao thức, v.v

Dù sao, chúng ta  sẽ nhận được chính xác cách SwiftUI hoạt động sớm. Hiện tại, điều tối thiểu bạn cần biết là SwiftUI khắc phục nhiều vấn đề mà mọi người gặp phải với cách tiếp cận Swift + Interface Builder cũ:

* Chúng ta không còn phải tranh luận về thiết kế dựa trên lập trình hoặc dựa trên thiết kế storyboard, bởi vì SwiftUI cho phép chúng ta thực hiện  cả hai cùng một lúc.
* Chúng tôi không còn phải lo lắng về việc tạo ra các vấn đề kiểm soát nguồn khi cam kết công việc thiết kế UI, bởi vì code dễ đọc và quản lý hơn nhiều so với XML khi mà phải thay đổi xử lý UI control.
* Chúng ta không còn cần phải lo lắng quá nhiều về các API phải được khai báo chặt chẽ - vẫn còn một số, nhưng ít hơn đáng kể.
* Chúng ta không còn phải lo lắng về việc gọi các chức năng mà nó không còn  tồn tại, bởi vì UI của chúng ta được kiểm tra bởi trình biên dịch Swift.

# 3. Các câu hỏi thường gặp về SwiftUI
## Nên học cái gì: SwiftUI hay là UIKit
Hiện tại, phần lớn các ứng dụng iOS được viết bằng UIKit. Một số khác thì không  vì họ sử dụng React Native hoặc một cái gì đó khác, nhưng nói chung là UIKit và iOS app luôn đi cùng nhau.

Vì vậy, nếu bạn bỏ qua **SwiftUI** trong một năm, hai năm hoặc thậm chí nhiều hơn, bạn có thể sẽ bị mất việc. Không ai - kể cả Apple, tôi nghĩ vậy! - hy vọng cộng đồng iOS sẽ chuyển sang SwiftUI càng sớm càng tốt.

Mặt khác, nếu bạn mới phát triển iOS và bỏ qua UIKit để bạn có thể tập trung vào SwiftUI, rất có thể bạn sẽ rất khó tìm việc vì không ai sử dụng nó cho mục đích thương mại. Điều này khá rủi ro cho những ai muốn tìm kiểm công việc ngay với iOS. 

## Chỗ nào thì sử dụng SwiftUI?
SwiftUI chạy trên iOS 13, macOS 10.15, tvOS 13 và watchOS 6 hoặc bất kỳ phiên bản nào sau này của các nền tảng đó. Điều này có nghĩa là nếu bạn làm việc trên một ứng dụng phải hỗ trợ iOS N-1 hoặc thậm chí N-2 - tức là phiên bản hiện tại và một hoặc hai trước đó - thì sẽ là một hoặc hai năm trước khi bạn có thể nghĩ đến việc chuyển sang SwiftUI .

Tuy nhiên, điều quan trọng là bạn không nên nghĩ rằng SwiftUI là một framework đa nền tảng tương tự như Java Swing hoặc React Native. SwiftUI không phải là một framework đa nền tảng, mà thay vào đó là một framework để tạo các ứng dụng trên nhiều nền tảng.

Điều này nghe có vẻ giống nhau, nhưng có một sự khác biệt quan trọng: Apple không nói rằng bạn có thể sử dụng mã SwiftUI giống hệt nhau trên mọi nền tảng, bởi vì một số điều không thể - không có cách nào để sử dụng  Apple Watch trên máy Mac, và tương tự như vậy có một thanh tab trên ứng dụng watchOS sẽ không hoạt động.

## SwiftUI sẽ thay thế UIKit
Không hẳn như thế, nhiều phần của SwiftUI được build trực tiếp ở trên các thành phần UIKit, chẳng hạn như UITableView. Đương nhiên, nhiều thành phần khác, chúng được render bởi SwiftUI, không phải UIKit.

## SwiftUI sử dụng Auto Layout?
Mặc dù Auto Layout chắc chắn đang được sử dụng cho một số thứ phía sau, nhưng nó không được thể hiển ra như là  một  SwiftUI designer. Thay vào đó, nó sử dụng một hệ thống layout  linh hoạt tương đối quen thuộc với các nhà phát triển web

## UIKit sẽ bị khai tử?
Không hẳn, Apple có hàng ta các function UIKit mới, được đem giới thiệu ở WWDC. Nếu Apple vẫn tiếp nói về UIKit, có nghĩa là chúng ta vẫn có thể làm việc được với UIKit bình thường

Bài viết này giới thiệu một vài ý tưởng ngắn gọn ban đầu về SwiftUI.
Vì vậy, tôi hy vọng bạn sẽ đồng ý rằng có rất nhiều lợi ích khi chuyển sang SwiftUI.
Chào mừng bạn đến với thế giới mới, phong cách lập trình UI mới của Apple.