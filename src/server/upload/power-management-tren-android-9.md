Android 9 (API level 28) giới thiệu nhiều tính năng mới giúp quản lý thời lượng pin của device. Những thay đổi này cùng với những tính năng sẵn có từ các phiên bản trước giúp đảm bảo rằng tài nguyên hệ thống được cung cấp cho các ứng dụng cần chúng nhất.
Tính năng quản lý pin được chia thành 2 loại:
* [**App standby buckets**](https://developer.android.com/about/versions/pie/power#buckets)
Hệ thống giới hạn quyền truy cập của các ứng dụng vào tài nguyên thiết bị như CPU hoặc pin dựa trên các mẫu sử dụng của người dùng. Đây là tính năng mới trên Android 9.
* [**Battery saver improvements**](https://developer.android.com/about/versions/pie/power#battery-saver)
Khi battery saver bật, hệ thống sẽ đặt hạn chế trên tất cả các ứng dụng. Tính năng này được cải tiến trên Android 9.
Note: Những thay đổi này được áp dụng với tất cả các app bất kể chúng có target Android 9 hay không.

## App Standby Buckets
Android 9 giới thiệu tính năng quản lý pin mới là App Standby Buckets. App Standby Buckets giúp hệ thống ưu tiên những yêu cầu của ứng dụng về tài nguyên dựa vào mức độ và tần suất sử dụng của ứng dụng. Dựa trên các mẫu sử dụng ứng dụng, mỗi ứng dụng sẽ được đặt vào 1 trong 5 nhóm ưu tiên.
5 nhóm ưu tiên ứng dụng dựa trên những tiêu chí sau:

**Active**

Ứng dụng trong nhóm Active nếu user đang sử dụng app, ví dụ:
* App đã khởi chạy activity
* App đang chạy foreground service
* App có sync adapter liên kết với content provider sử dụng bởi một app đang chạy foreground
* User click vào notification của app

Nếu một ứng dụng nằm trong nhóm active, hệ thống sẽ không đặt bất cứ hạn chế nào trong app jobs, alarm hay FCM messages.

**Working set**

Ứng dụng trong nhóm working set nếu nó thường xuyên được sử dụng nhưng hiện tại không active. Ví dụ một social media app user sử dụng mỗi ngày sẽ được nằm trong working set. Các ứng dụng cũng được đưa vào working set nếu nó được sử dụng gián tiếp.

Nếu ứng dụng nằm trong nhóm working set, hệ thống sẽ áp đặt các hạn chế nhẹ về khả năng chạy jobs và trigger alarm. Chi tiết hãy tham khảo ở [**Power management restrictions**](https://developer.android.com/topic/performance/power/power-details.html).

**Frequent**

Ứng dụng nằm trong nhóm frequent nếu nó hay được sử dụng nhưng không phải ngày nào cũng sử dụng. Ví dụ ứng dụng tracking workout user sử dụng khi chạy có thể nằm trong nhóm frequent.

Nếu ứng dụng nằm trong nhóm frequent, hệ thống sẽ đặt giới hạn nhiều hơn cho nó trong khả năng chạy jobs, trigger alarm và nhận FCM messages ưu tiên cao. Chi tiết tham khảo ở [**Power management restrictions**](https://developer.android.com/topic/performance/power/power-details.html).

**Rare**

Ứng dụng nằm trong nhóm rare nếu không thường được sử dụng. Ví dụ ứng dụng khách sạn mà user sẽ chỉ sử dụng khi đặt phòng hotel.

Nếu ứng dụng nằm trong nhóm frequent, hệ thống sẽ đặt giới hạn nghiêm khắc hơn cho nó trong khả năng chạy jobs, trigger alarm và nhận FCM messages ưu tiên cao. Hệ thống cũng giới hạn khả năng truy cập mạng của ứng dụng. Chi tiết tham khảo ở [**Power management restrictions**](https://developer.android.com/topic/performance/power/power-details.html).

**Never**

Ứng dụng đã được cài đặt nhưng chưa bao giờ được sử dụng sẽ nằm trong nhóm never. Hệ thống sẽ đặt giới hạn cao nhất cho những ứng dụng này.

Hệ thống sẽ tự động gán từng ứng dụng cho một nhóm ưu tiên và gán lại ứng dụng nếu cần. Sử dụng machine learning để preload ứng dụng và xác định khả năng sử dụng của từng ứng dụng và gán cho các nhóm thích hợp. Nếu ứng dụng hệ thống không có trên thiết bị, hệ thống sẽ mặc định sắp xếp ứng dụng dựa trên mức độ sử dụng ứng dụng gần đây. Ứng dụng active nhiều hơn được chỉ định vào nhóm cung cấo ưu tiên cao hơn, cung cấp nhiều tài nguyên ứng dụng hơn cho app. Cụ thể, nhóm xác định tần suất hoạt động của ứng udnjg,app trigger alarms có nhiều không, hay app có thể nhận FCM có mức độ ưu tiên cao hơn hay không. Những hạn chế này chỉ áp dụng khi thiết bị sử dụng pin, hệ thống không đặt giới hạn khi thiết bị đang sạc.

Mỗi nhà sản xuất có thể cài đặt tiêu chí riêng của họ về cách các non-active app được chỉ định cho các nhóm. Chúng ta không nên cố gắng tác động đến nhóm mà ứng dụng được chỉ định. Thay vào đó, hãy tập trung vào việc đảm bảo ứng dụng hoạt động tốt trong bất kỳ nhóm nào. Ứng dụng có thể biết được đang nằm trong nhóm nào bằng cách gọi phương thức mới [**UsageStatsManager.getAppStandbyBucket()**](https://developer.android.com/reference/android/app/usage/UsageStatsManager.html#getAppStandbyBucket()).

Note: Ứng dụng nằm trong [Doze whitelist](https://developer.android.com/training/monitoring-device-state/doze-standby#support_for_other_use_cases) được miễn khỏi giới hạn dựa trên nhóm của ứng dụng.

## Best practices

Nếu app của bạn đã làm theo best practices cho [Doze and app standby](https://developer.android.com/training/monitoring-device-state/doze-standby), xử lý các tính năng quản lý pin mới không phải là quá khó khăn. Tuy nhiên, một số behaviors app trước đó hoạt động tốt có thể có vấn đề.

* Đừng cố gắng thao tác hệ thống để đưa ứng dụng của bạn vào nhóm nào đó. Các phương thức nhóm của hệ thống có thể thay đổi và một nhà sản xuất thiết bị có thể viết ứng dụng nhóm của riêng họ bằng thuật toán của riêng mình. Thay vào đó, hãy đảm bảo rằng ứng dụng của bạn hoạt động một cách thích hợp với bất kì nhóm nào.
* Nếu app không có launcher activity, nó có thể không bao giờ được đưa vào nhóm active. Bạn có thể sẽ phải design lại app như thêm vào một activity nào đó.
* Nếu notification của app không hoạt động, user sẽ không thể kích hoạt quảng cáo của app cho nhóm active bằng cách tương tác với thông báo. Trong trường hợp này, sẽ phải thay đổi thiết kế với một số thông báo để cho phép chung nhận phản hồi từ user. Tham khảo hướng dẫn Meterial Design [Notifications design patterns](https://material.io/guidelines/patterns/notifications.html).
* Tương tự, nếu app không hiển thị notification khi nhận FCM messages có độ ưu tiên cao, nó sẽ không cung cấp cho user cơ hội tương tác với ứng dụng và do đó và đưa app vào active. Thực tế, mục đích duy nhất sử dụng DCM message độ ưu tiên cao là đẩy notification cho user, vì vậy tình huống này sẽ không bao giờ xảy ra. Nếu bạn đánh dấu không phù hợp một thông báo FCM là ưu tiên cao khi nó không kích hoạt tương tác user, nó có thể gây ra các hậu quả tiêu cực khác, ví dụ: nó có thể khiến app sử dụng hết khả năng sử dụng tài nguyên, gây ra FCM messages trở thành ưu tiên bình thường.

Note: Nếu user lặp lại việc loại bỏ notificaiton, hệ thống sẽ cho user chọn option block notificationnotification trong tương lai. Không nên spam user với notification để giữ app trong nhóm active.

Nếu app được chia thành nhiều package, những package này có thể được đặt trong nhiều nhóm khác nhau với nhiều mức độ truy cập. Hãy test các package để chắc chắn rằng behaviors của app hoạt động đúng.

## Cải thiện trình tiết kiệm pin

Android 9 thực hiện một số cải tiến đối với chế độ trình tiết kiệm pin. Nhà sản xuất thiết bị xác định các hạn chế chính xác được áp đặt. Ví dụ, trên AOSP xây dựng, hệ thống áp dụng các hạn chế sau:
* Hệ thống đặt ứng dụng ở chế độ chờ của ứng dụng tích cực hơn, thay vì chờ ứng dụng ở chế độ chờ.
* Giới hạn thực thi nền áp dụng cho tất cả các ứng dụng, bất kể cấp API mục tiêu của chúng.
* Dịch vụ vị trí có thể bị tắt khi màn hình tắt.
* Ứng dụng nền không có quyền truy cập mạng.

Ngoài ra, còn có các tối ưu hóa nguồn điện cụ thể khác. Để biết chi tiết đầy đủ, xem Phụ lục: [Power Management Restrictions](https://developer.android.com/preview/features/power-details.html).

Như thường lệ, bạn nên kiểm tra ứng dụng của mình trong khi trình tiết kiệm pin đang hoạt động. Bạn có thể bật trình tiết kiệm pin theo cách thủ công thông qua màn hình **Cài đặt**> **Tiết kiệm pin** của thiết bị.

Cảm ơn các bạn đã đọc bài của mình :D