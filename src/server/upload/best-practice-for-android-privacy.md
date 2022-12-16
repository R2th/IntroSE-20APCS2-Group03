# I. Mở đầu
* Hệ điều hành Android luôn tập trung vào việc giúp user được trải nghiệm những cải tiến mới nhất, đồng thời việc đảm bảo tính bảo mật và quyền riêng tư của user luôn là ưu tiên hàng đầu. Trong bài viết này chúng ta sẽ đi tìm hiểu những best practice cho Android Privacy.
* Nội dung của bài viết được tham khảo tại [đây](https://developer.android.com/privacy/best-practices)
# II. Nội dung chính
## 1. Chú ý đến các yêu cầu cấp quyền
> Xây dựng lòng tin với user của chúng ta bằng cách minh bạch và cung cấp cho user quyền kiểm soát cách mà họ trải nghiệm ứng dụng của chúng ta.
* Chỉ yêu cầu các quyền tối thiểu mà tính năng của chúng ta cần. Bất cứ khi nào chúng ta giới thiệu những thay đổi lớn cho ứng dụng của mình, hãy xem lại các quyền được yêu cầu để xác nhận rằng các tính năng của ứng dụng vẫn cần chúng.
    1. Hãy nhớ rằng các phiên bản Android mới hơn thường giới thiệu các cách truy cập dữ liệu theo cách có ý thức về quyền riêng tư mà không yêu cầu cấp quyền.
    2. Yêu cầu quyền khi cần thay vì ngay khi khởi động ứng dụng, làm cho quyền này trở nên rõ ràng với user.
    3. Nếu ứng dụng của chúng ta được phân phối trên Google Play, [Android vitals]( https://developer.android.com/topic/performance/vitals/permissions#use_android_vitals_to_gauge_user_perceptions) sẽ cho chúng ta biết tỷ lệ phần trăm người dùng từ chối các quyền được yêu cầu trong ứng dụng. Sử dụng dữ liệu này để đánh giá lại thiết kế của các tính năng mà các quyền bắt buộc thường bị từ chối.
* Làm theo quy trình được đề xuất để giải thích lý do tại sao một tính năng trong ứng dụng của chúng ta cần được cấp quyền.
* Hãy nhớ rằng user hoặc hệ thống có thể từ chối quyền nhiều lần. Android tôn trọng sự lựa chọn này của user bằng cách bỏ qua các yêu cầu cấp quyền từ cùng một ứng dụng.
* Giảm giá trị một cách tinh tế khi user từ chối hoặc thu hồi quyền. Ví dụ: chúng ta có thể tắt tính năng nhập liệu bằng giọng nói của ứng dụng nếu user không cấp quyền cho micro.
* Nếu bạn đang sử dụng SDK hoặc thư viện để truy cập dữ liệu được bảo vệ bởi các quyền nguy hiểm, user thường sẽ gán điều này cho ứng dụng của chúng ta. Đảm bảo rằng chúng ta luôn hiểu các quyền mà SDK yêu cầu và lý do tại sao.
    1. Nếu chúng ta test ứng dụng trên Android 11, hãy sử dụng tính năng kiểm tra quyền truy cập dữ liệu để biết được các vị trí trong code và trong thư viện 3rd-party đang truy cập dữ liệu cá nhân.
## 2. Hạn chế tối đa việc sử dụng vị trí
> Nếu ứng dụng của chúng ta yêu cầu quyền truy cập vị trí, thì hãy giúp user đưa ra quyết định sáng suốt.
* Nếu ứng dụng của chúng ta thu thập thông tin vị trí, hãy giải thích cho user cách mà ứng dụng của chúng ta sử dụng thông tin này để mang lại những lợi ích cụ thể cho họ. Nếu ứng dụng của chúng ta có thể hỗ trợ các trường hợp sử dụng mà không yêu cầu bất kỳ dữ liệu vị trí nào, thì đừng yêu cầu bất kỳ quyền vị trí nào cả.
* Nếu ứng dụng của chúng ta cần ghép nối thiết bị của user với thiết bị lân cận qua Bluetooth hoặc Wi-Fi thì hãy sử dụng trình quản lý thiết bị đồng hành mà không yêu cầu quyền vị trí.
* Xem xét mức độ chi tiết của vị trí mà ứng dụng của chúng ta cần. Truy cập vị trí thô là đủ để đáp ứng hầu hết các trường hợp sử dụng liên quan đến vị trí.
* Truy cập dữ liệu vị trí trong khi ứng dụng của bạn đang hiển thị cho user. Bằng cách đó, user có thể hiểu rõ hơn tại sao ứng dụng của chúng ta lại yêu cầu thông tin vị trí.
* Nếu ứng dụng của chúng ta yêu cầu vị trí khi chạy nền, chẳng hạn như khi triển khai hàng rào địa lý (geofencing) thì hãy đảm bảo rằng điều đó rất quan trọng đối với chức năng cốt lõi của ứng dụng và được thực hiện theo cách mà user dễ thấy. Tìm hiểu thêm về những lưu ý khi sử dụng vị trí trong khi chạy nền tại [đây]( https://developer.android.com/training/location/background)
* Thiết kế ứng dụng của chúng ta có thể xử lý một cách tinh tế khi không có quyền truy cập thường xuyên vào vị trí. Trên Android 10 trở lên, user có thể giới hạn quyền truy cập vị trí của ứng dụng trong khi ứng dụng đang được sử dụng.
* Nếu ứng dụng của chúng ta cần duy trì quyền truy cập vị trí cho tác vụ liên tục do user khởi tạo sau khi điều hướng khỏi giao diện của ứng dụng, hãy khởi động dịch vụ nền trước khi ứng dụng của chúng ta chuyển sang chế độ nền. Chúng ta có thể thực hiện việc này trong onPause().
 * Không khởi tạo các dịch vụ foreground từ background. Thay vào đó, hãy cân nhắc khởi chạy ứng dụng của chúng ta từ một thông báo và sau đó thực thi code vị trí khi giao diện của ứng dụng hiển thị.
## 3. Xử lý dữ liệu một cách an toàn
> Minh bạch và bảo mật trong cách chúng ta xử lý dữ liệu nhạy cảm.
* Giúp user biết khi nào và tại sao ứng dụng của chúng ta lại thu thập, sử dụng hoặc chia sẻ dữ liệu nhạy cảm.
* Sử dụng mô hình lưu trữ theo phạm vi nếu có thể. Tìm hiểu cách chuyển sang bộ nhớ có phạm vi dựa trên các trường hợp sử dụng ứng dụng của chúng ta tại [đây]( https://developer.android.com/training/data-storage/use-cases)
* Luôn sử dụng kết nối mạng an toàn. Đối với dữ liệu của ứng dụng của chúng ta, hãy sử dụng mã hóa thông tin xác thực được tích hợp sẵn của Android. Đối với dữ liệu đang chuyển, bạn nên sử dụng TLS (kế thừa của SSL) cho tất cả việc truyền dữ liệu bất kể độ nhạy cảm.
* Các tệp chứa dữ liệu nhạy cảm phải nằm trong thư mục ứng dụng riêng của chúng ta trong bộ nhớ trong.
* Trên Android 10, đối với các tệp chỉ liên quan đến ứng dụng của chúng ta, hãy lưu trữ chúng trong thư mục dành riêng cho ứng dụng trong bộ nhớ ngoài. Tìm hiểu thêm về bộ nhớ theo phạm vi tại [đây]( https://developer.android.com/training/data-storage#scoped-storage)
* Nếu chúng ta cần chuyển dữ liệu nhạy cảm cho một ứng dụng khác, hãy sử dụng một explicit intent. Cấp quyền truy cập dữ liệu một lần để hạn chế hơn nữa quyền truy cập của ứng dụng khác.
* Ngay cả khi ứng dụng của chúng ta ở foreground, cách tốt nhất là hiển thị chỉ báo thời gian thực rằng chúng ta đang chụp từ micro hoặc máy ảnh. Lưu ý rằng Android 9 trở lên không cho phép truy cập micro hoặc máy ảnh khi ứng dụng của chúng ta ở background.
* Jetpack cung cấp một số thư viện để giữ cho dữ liệu ứng dụng của chúng ta an toàn hơn. Tìm hiểu thêm trong hướng dẫn sử dụng thư viện [Jetpack Security]( https://developer.android.com/topic/security/data) và [Jetpack Preferences]( https://developer.android.com/guide/topics/ui/settings/use-saved-values).
* Không đưa dữ liệu nhạy cảm vào logcat hoặc file log trong ứng dụng của bạn. Tìm hiểu thêm về cách xử lý dữ liệu người dùng tại [đây]( https://developer.android.com/training/articles/security-tips#UserData)
## 4. Sử dụng mã định danh có thể đặt lại
> Tôn trọng quyền riêng tư của người dùng và sử dụng số nhận dạng có thể đặt lại.
* Không truy cập IMEI và số seri của thiết bị, vì những thông số nhận dạng này là bất biến. Nếu chúng ta cố gắng truy cập các thông số nhận dạng này trong một ứng dụng trên Android 10 (API 29) trở lên thì sẽ xảy ra [SecurityException](https://developer.android.com/reference/java/lang/SecurityException).
* Chỉ sử dụng [Advertising ID]( https://developer.android.com/training/articles/user-data-ids#advertising-ids) cho hồ sơ user hoặc các trường hợp sử dụng quảng cáo. Đối với các ứng dụng trong Google Play thì đây là bắt buộc. Luôn tôn trọng sở thích của user về việc theo dõi quảng cáo để cá nhân hóa.
* Đối với đại đa số các trường hợp sử dụng không phải quảng cáo, hãy sử dụng [globally-unique ID (GUID)](https://developer.android.com/training/articles/user-data-ids#signed-out-anon-user-analytics) được lưu trữ riêng tư, dành cho phạm vi ứng dụng.
* Sử dụng cài đặt bảo mật Android ID (SSAID) để chia sẻ trạng thái giữa các ứng dụng mà chúng ta sở hữu mà không yêu cầu user đăng nhập vào tài khoản. Tìm hiểu thêm về cách theo dõi tùy chọn user đã đăng xuất giữa các ứng dụng tại [đây]( https://developer.android.com/training/articles/user-data-ids#signed-out-user-prefs-between-apps)