Đối với các nhà phát triển Android, có bốn thay đổi đột phá với Android O :

-Giới hạn thực hiện nền

-Giới hạn cập nhật vị trí

-Loại bỏ các broadcasts ngầm

-Notification channels

Ở đây, trong bài viết này, ta nói về giới hạn thực hiện nền. Giới hạn thực hiện nền chủ yếu áp dụng cho hai thành phần chính:
-Service
-Wakelocks

Hãy nói về những hạn chế được áp dụng trên các Service trong bài viết này.

### Dịch vụ trong Android là gì?
Trước tiên hãy làm mới dịch vụ trong Android là gì? Theo tài liệu Android:

Service là một thành phần ứng dụng có thể thực hiện các hoạt động chạy dài trong nền và nó không cung cấp giao diện người dùng.
Vì vậy, về cơ bản, Dịch vụ cũng giống như hoạt động nhưng nó không có thành phần UI trong đó. Vì vậy, nó không phải thực hiện hoạt ảnh mượt mà ở 60 khung hình / giây. Đó là lý do tại sao nó có thể chạy thực hiện bất kỳ nhiệm vụ nào trong khoảng thời gian dài hơn hoạt động.

Có ba loại dịch vụ:

Started Service  - Một dịch vụ được bắt đầu khi một thành phần ứng dụng (như hoạt động) gọi startService() .
Bound Service - Một dịch vụ bị ràng buộc khi một thành phần ứng dụng liên kết với nó bằng cách gọi bindService() .
Scheduled Service - Một dịch vụ được lên lịch khi một API như JobScheduler .

### Các ứng dụng Background vs Foreground:
Để tìm hiểu các thay đổi thực hiện nền, trước tiên chúng ta cần biết sự khác biệt giữa ứng dụng nền và ứng dụng nền trước.

Nguyên tắc chung , ứng dụng của bạn sẽ được coi là dịch vụ tiền cảnh nếu bất kỳ trường hợp nào trong ba trường hợp dưới đây là đúng:

Ứng dụng của bạn hiện đang hoạt động có thể nhìn thấy.
Ứng dụng của bạn có dịch vụ Foreground đang chạy.
Ứng dụng của bạn được kết nối với một ứng dụng Foreground khác bằng cách ràng buộc dịch vụ hoặc bằng cách sử dụng các nhà cung cấp nội dung của họ.
Nếu bất kỳ tình huống nào ở trên không đúng trong trường hợp hiện tại, ứng dụng của bạn được coi là ở chế độ nền.

### Tại sao chúng ta cần hạn chế sử dụng dịch vụ nền?
Bất cứ khi nào ứng dụng của bạn chạy trong nền bằng các dịch vụ, ứng dụng của bạn sẽ tiêu tốn hai tài nguyên quý giá: 1) Bộ nhớ và 2) Pin .

Đây là hai tài nguyên hạn chế trên các thiết bị di động và hầu hết các thiết bị tầm thấp đến tầm trung không có nhiều bộ nhớ hoặc pin bên trong nó.

Giả sử, nếu ứng dụng của bạn đang thực hiện một số tác vụ rất chuyên sâu trong nền và sử dụng dung lượng RAM lớn hơn để thực hiện tác vụ đó, thì điều này sẽ tạo ra trải nghiệm người dùng rất khó chịu, đặc biệt là nếu người dùng đang sử dụng một ứng dụng sử dụng nhiều tài nguyên khác, chẳng hạn như chơi một trò chơi hoặc xem một video ở phía trước.

Theo tài liệu cho dịch vụ bắt đầu, thực tiễn tốt nhất là,

Khi hoạt động hoàn tất, dịch vụ sẽ tự dừng lại.
Tuy nhiên, nhiều ứng dụng có các dịch vụ nền chạy lâu, về cơ bản chạy trong thời gian vô hạn để duy trì kết nối ổ cắm với máy chủ hoặc theo dõi một số tác vụ hoặc hoạt động của người dùng. Những dịch vụ này tạo ra sự hao pin và chúng cũng liên tục tiêu thụ bộ nhớ.

Từ vài phiên bản phát hành trước đây của Android (Bắt đầu từ Marshmallow), Google đang rất cố gắng để tăng thời lượng pin và giảm mức tiêu thụ bộ nhớ mà các ứng dụng sử dụng bằng cách giới thiệu chế độ chờ và chế độ chờ ứng dụng bằng cách trì hoãn thời gian thực hiện nền trong một khoảng thời gian nếu điện thoại không hoạt động

Nhưng hầu hết thời gian mặc dù biết những nhược điểm của các nhà phát triển dịch vụ lâu dài vẫn sử dụng chúng. (Chủ yếu là vì nó dễ thực hiện và bảo trì hơn là sử dụng các cách giải quyết khác.)

### Những hạn chế trên các dịch vụ bắt đầu từ Android O là gì?
Bắt đầu từ Android O, nếu ứng dụng của bạn ở chế độ nền (kiểm tra ba điều kiện trên), ứng dụng của bạn được phép tạo và chạy các dịch vụ nền trong vài phút.

Sau vài phút trôi qua, ứng dụng của bạn sẽ bước vào giai đoạn nhàn rỗi. Khi ứng dụng của bạn bước vào giai đoạn nhàn rỗi, hệ thống sẽ dừng tất cả các dịch vụ nền giống như dịch vụ của bạn gọi Service.stopSelf () .

**Và đây là phần thú vị**
Như tôi đã thảo luận ở trên, vấn đề hao pin và tiêu thụ bộ nhớ chủ yếu là do các dịch vụ bắt đầu. Để loại bỏ điều này, Android O hoàn toàn ngăn chặn việc sử dụng phương thức startService () để bắt đầu dịch vụ. Nếu bạn gọi startService () trên Android O, cuối cùng bạn sẽ nhận được IllegalArgumentException .


Có một số trường hợp ngoại lệ trong các trường hợp này khi ứng dụng của bạn tạm thời được đưa vào danh sách trắng trong một số cửa sổ thời gian. Trong thời gian này, ứng dụng của bạn có thể tạo các dịch vụ nền một cách tự do. Ứng dụng sẽ đưa vào danh sách trắng tạm thời trong các tình huống dưới đây:

Khi nhận được tin nhắn FCM ưu tiên cao
Nhận được một Broadcas
Thực hiện PendingIntent từ một thông báo.

### Làm thế nào bạn có thể chạy các tác vụ nền?
Nếu bạn đang xây dựng một ứng dụng Android rất lớn, có thể có một số tình huống chính hãng mà bạn cần thực hiện một số tác vụ trong nền. Vì bắt đầu một dịch vụ bằng lệnh startService () không phải là một tùy chọn, chúng tôi cần tìm ra một cách khác để thực hiện các tác vụ trong nền.

**Lập lịch cho các nhiệm vụ của bạn bằng API Lập lịch công việc:**
Api JobScheduler được giới thiệu trong API21 để thực hiện các tác vụ nền.
API này cho phép bạn chạy dịch vụ theo lịch trình và hệ thống Android sẽ bó tất cả các dịch vụ từ các ứng dụng khác nhau và chạy chúng cùng nhau trong một số khung thời gian cụ thể. Lý do đằng sau việc này là để giảm thời gian CPU và radio của bạn thức dậy bằng cách gộp các tác vụ lại với nhau. Điều này sẽ tiêu thụ ít pin hơn và duy trì sức khỏe hệ thống.
Nếu ứng dụng của bạn có minSdkVersion <21 thì sao? Trong tình huống này, cách chính thức để sắp xếp công việc là sử dụng Firebase Job Dispatcher . Firebase Job Dispatcher được hỗ trợ cho đến hết API9.
firebase / firebase-jobdispatcher-android

firebase-jobdispatcher-android - Firebase JobDispatcher là một thư viện để lên lịch các công việc nền trong Android của bạn
github.com	
**Sử dụng dịch vụ nền trước**
Nếu bạn muốn một số tác vụ chạy dài được thực hiện trong nền, hãy xem xét sử dụng các dịch vụ nền trước cho điều đó. Không có giới hạn thực hiện nền nào ở trên áp dụng cho các dịch vụ nền trước.

Điều này cũng sẽ giữ cho người dùng của bạn biết rằng ứng dụng của bạn đang thực hiện một số tác vụ nền bằng cách hiển thị thông báo đang diễn ra. Điều này sẽ tăng tính minh bạch với người dùng của bạn.

Trước Android O, nếu bạn muốn tạo dịch vụ nền trước, bạn thường bắt đầu dịch vụ nền bằng cách gọi startService () . Sau đó, sau khi bạn có thể quảng cáo dịch vụ của mình lên dịch vụ nền trước bằng cách chỉ định một thông báo đang diễn ra bằng phương thức startForeground () . Nhưng bắt đầu từ Android O, bạn không thể sử dụng startService () nữa. Vì vậy, để tạo dịch vụ tiền cảnh, bạn phải sử dụng NotificationManager.startServiceInForeground () . Phương pháp này tương đương với việc tạo dịch vụ nền và kết hợp nó với dịch vụ nền trước kết hợp.


Phần kết luận:
Những hạn chế này được áp dụng cho dịch vụ nền chắc chắn sẽ cung cấp thời lượng pin kéo dài và sử dụng RAM thấp hơn. Cuối cùng, nó sẽ làm cho các ứng dụng của bạn trơn tru và người dùng của bạn hài lòng.

Bạn có nên thay đổi mã ứng dụng của bạn bây giờ?
Android O vẫn ở DP1. Có thêm 3 bản xem trước dành cho nhà phát triển sẽ được phát hành trước khi phiên bản Android O cuối cùng được phát hành. Có thể có một số thay đổi API trong bản phát hành sắp tới. Vì vậy, ngay bây giờ đã đến lúc nghĩ về tác động của những thay đổi này trong ứng dụng của bạn và suy nghĩ về giải pháp thay thế cho chúng. Khi nhà phát triển xem trước 3 Ném4 được phát hành, hãy áp dụng những thay đổi đó cho các ứng dụng của bạn và làm cho ứng dụng Android O của bạn tương thích.