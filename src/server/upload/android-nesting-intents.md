Ứng dụng của bạn có cung cấp dịch vụ chạy Activity của ứng dụng khác dưới dạng callback khi một action xảy ra không? Ví dụ: nó có chấp nhận một Intent làm tham số phụ của một Intent khác, được sử dụng như một tham số của lệnh gọi startActivity () không?
Bạn có biết điều này có thể khiến ứng dụng của bạn dễ bị tấn công không?
Trong phần còn lại của bài đăng này, tôi sẽ giải thích các vấn đề khi sử dụng phương pháp này và cung cấp giải pháp cho phép ứng dụng của bạn cung cấp chức năng tương tự một cách an toàn hơn.

# Vấn đề
Cách chúng ta mong muốn loại tương tác này hoạt động sẽ giống như sau:
![](https://miro.medium.com/max/700/0*IEWopqfWI0gFMsnk)

Tại đây, Ứng dụng Client tạo Intent cho ClientCallbackActivity của nó và thêm nó như một phần bổ sung vào Intent mà nó sẽ sử dụng để khởi động ApiService của Provider App. Sau khi xử lý yêu cầu, Provider App sử dụng Intent mà Ứng dụng khách cung cấp để khởi động ClientCallbackActivity.
Điều cần lưu ý ở đây là Ứng dụng nhà cung cấp đang gọi startActivity () trong Ngữ cảnh ứng dụng của chính nó. Điều này có hai hậu quả, cả hai đều không tối ưu:
* Vì ClientCallbackActivity đang được Khởi động bởi Provider App, nên nó phải được đánh dấu là exported, điều này cho phép không chỉ Provider App khởi động mà còn cho bất kỳ ứng dụng nào khác trên thiết bị.
* Intent lồng nhau được chuyển tới ApiService có thể được sử dụng để start bất kỳ Activity nào thuộc Provider App. Điều này bao gồm các private activity, activity nhạy cảm, non-exported activities!

Để chứng minh, hãy xem xét điều gì sẽ xảy ra nếu ứng dụng gọi điện không cung cấp Intent cho Activity của chính nó, tức là: ClientCallbackActivity, mà thay vào đó, hãy đưa vào một Intent để start một private activity trong Provider App.
![](https://miro.medium.com/max/700/0*iof2-14vTyoDX-h5)

Vì một Mục đích lồng nhau được sử dụng, nên Ứng dụng của nhà cung cấp khó có thể đề phòng các Intent nhắm mục tiêu đến các private activity, activity nhạy cảm. Vì Provider App đang gọi startActivity () theo Intent trực tiếp, nên nó có thể khởi động ApiSensitiveActivity ngay cả khi nó không được export.

# Giải pháp: PendingIntent
Giải pháp rất đơn giản: thay vì chấp nhận Intent, Provider App thay vào đó có thể chấp nhận PendingIntent.
Sự khác biệt giữa Intent và PendingIntent là PendingIntent luôn được xử lý với danh tính mà nó được tạo:
![](https://miro.medium.com/max/700/0*J1fPWozrWb-__b7u)

Bởi vì lệnh gọi lại được cung cấp dưới dạng PendingIntent, khi Provider App gọi send () trên nó, startActivity () sẽ tiến hành như thể Ứng dụng tấn công đã gọi nó và vì Ứng dụng tấn công không có đặc quyền khởi động ApiSensitiveActivity, hệ thống sẽ ngăn Activity từ đầu.
Đó chắc chắn là một lợi ích cho Provider App, nhưng còn ứng dụng của chúng tôi, Ứng dụng client thì sao? Vì chúng ta đã cung cấp PendingIntent, nên giờ đây ClientCallbackActivity có thể là private Activity, non-exported activity. Thay đổi đã cho phép bảo mật tốt hơn cho cả hai ứng dụng!
Nếu bạn đã quen thuộc với các API của trình quản lý báo thức hoặc thông báo, bạn sẽ nhận thấy rằng chúng sử dụng PendingIntents để kích hoạt các hành động và thông báo cho một ứng dụng báo thức. Đây là lý do hệ thống sử dụng PendingIntents, được xử lý như một ứng dụng đã tạo ra chúng, thay vì Intent thông thường.

# Tóm lược
Việc sử dụng Intent như một cơ chế để triển khai callback một Activity có thể dẫn đến các lỗ hổng bảo mật, cả trong Provider App và Client App. Điều này là do Intent luôn được xử lý trong Context của ứng dụng mà chúng được gọi bên trong. Ngữ cảnh này mở ra khả năng start bất kỳ activity nào non-exported trong Provider App và buộc ứng dụng client export Activity sẽ nhận được callback.

Ngược lại, PendingIntents luôn được xử lý bên trong Ngữ cảnh đã tạo ra chúng. Điều này không chỉ cho phép Provider App tự do sử dụng chúng mà không để lộ các non-exported activity mà còn cho phép client chỉ định bất kỳ Activity nào, bao gồm cả các non-exported activity, để nhận callback.
Tìm hiểu thêm về cách Android 12 đang giúp bảo vệ các ứng dụng khỏi việc khởi chạy không an toàn với các Intent lồng nhau.
https://developer.android.com/about/versions/12/behavior-changes-12#nested-intents

Nguồn đây khỏi tìm : 
https://medium.com/androiddevelopers/android-nesting-intents-e472fafc1933