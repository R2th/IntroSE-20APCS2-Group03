# Giới thiệu
***Launch Screen*** là tương tác đầu tiên mà người dùng nhìn thấy khi sử dụng ứng dụng của chúng ta. Đó là lý do tại sao việc đầu tư thời gian để làm cho ***Launch Screen*** của ứng dụng  chúng ta cảm thấy  hấp dẫn về mặt hình ảnh là rất quan trọng,  và đó có thể là ấn tượng đầu tiên tuyệt vời.
Trong WWDC 2020, Apple  đã giới thiệu một cách mới để thực hiện màn hình khởi chạy cho ứng dụng *SwiftUI* trong *iOS 14* bằng cách sử dụng *Xcode 12*. Khi chúng ta tạo một ứng dụng *SwiftUI* mới, đây là cách mới để tạo ***Launch Screen***. Chúng ta vẫn có thể sử dụng cách cũ với ***Launch Screen***  bằng Storyboard với các ứng dụng hiện có của chúng ta.
# Launch Screen with SwiftUI
## Launch Screen in Info.plist

Tất cả các thiết lập được thực hiện trong tệp *Info.plist*, chúng ta có thể thấy rằng Xcode 12 sẽ tạo sẵn cho chúng ta key  *Launch Screen*  với một  kiểu *Dictionary*, và chúng ta có một vài tuỳ chọn trong  *Dictionary* đó.

![](https://images.viblo.asia/622841bd-b59f-4afc-ab3f-a4226b64811d.png)

Bây giờ chúng ta hãy xem xét tất cả các tùy chọn này và tìm hiểu cách chúng ta có thể sử dụng chúng để thiết lập *Launch Screen*.

## Background color

Đầu tiên, chúng ta có thể thay đổi backgroundColor cho *Launch Screen*. Đây là giá trị ***String*** của tên màu từ ***Asset catalog***. Mặc định, iOS đang sử dụng màu *systemBackground*.
Hãy thêm *Color Set* mới vào ***Asset catalog*** và đặt tên cho nó là *launchScreenBackground*:

![](https://images.viblo.asia/003672b2-3e77-4492-97fa-8e537c615ce5.png)

Sau đó chúng ta thêm key *launchScreenBackground* vài Launch Screen dictionary trong file Info.plist. Bây giờ chúng ta chạy thử ứng dụng và nhìn thấy background color của *launch screen* sẽ thay đổi.

## Background Image

Sau background Color, chúng ta hãy hiển thị một hình ảnh của ứng dụng. Có hai tùy chọn chúng ta có thể sử dụng để thiết lập:

*Image Name* là tên của một ảnh của ứng dụng lẩy từ *Assets catalog*.
*Image respects safe area insets* có giá trị là một Boolean mô tả hình ảnh của ứng dụng sẽ không vượt ra ngoài *safe area*.

Giả sử chúng ta có logo Swift trong  *Assets catalog* là tệp SVG. Trong Xcode 12, cuổi cùng thì Apple cũng support cho  SVG file (y) :

![](https://images.viblo.asia/6ec3948f-fafc-435f-bd87-789a2692fa66.png)


Bây giờ chúng ta có thể thêm ảnh trên vào *Info.plist* trong *Launch Screen dictionary* bằng cách sử dụng key *Image Name*. Với việc set *Image respects safe area insets* là YES, chúng ta chắc chắn rằng nó cân chỉnh chính xác và không vượt ra ngoài *safe area*. Image ở định dạng  SVG và tỷ lệ hoàn hảo mà không làm giảm chất lượng hình ảnh.
Bây giờ khi khởi chạy ứng dụng, chúng ta có thể thấy màu nền và logo Swift ở trên nó.

![](https://images.viblo.asia/72afc665-8e4a-4f6b-9abd-c3c57b769048.png)

Có một số tùy chọn khác mà chúng ta có thể sử dụng thiết lập cho *Launch Screen*:

**Show Navigation bar** - Hiển thị *navigation bar*  với một image.

**Show Tabbar** -  Hiển thị *Show Tabbar*  với một image.

**Show Toolbar** -  Hiển thị *Toolbar*  với một image.
Chúng ta có thể thêm chúng vào để cho màn hình *Launch* đẹp mắt hơn.

# Kết luận
Như vậy, trong WWDC 2020, Apple đã giới thiệu một cách mới cho các ứng dụng SwiftUI về cách tạo *Launch Screen* bằng cách sử dụng *Info.plist* và *Assets*, nó giúp chúng ta thực hiện thiết lập *Launch Screen*  nhanh và đẹp mắt hơn.
Cách cũ thiết lập *Launch Screen*  với Storyboard vẫn hoạt động tốt, nhưng chúng ta có thể nghĩ rằng trong tương lai nó sẽ được thay thế bằng cách mới hoàn toàn.
Cám ơn các bạn đã đọc bài viết

Nguồn tham khảo:
https://kristaps.me/swiftui-launch-screen/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B481

Ứng dụng Demo:
https://drive.google.com/file/d/1uSGiFpWK28a-C_pZzxvPNeJxQv4Bzyzq/view?usp=sharing