Theo dự kiến, Google sẽ ra mắt hệ điều hành Android 11 dùng thử vào tháng 5 sắp tới đây và bản chính thức vào cuối năm 2020 . 

Timeline như Google thông báo ở đây : 

![](https://images.viblo.asia/f4ed561c-7e99-4f72-b494-10b5c016ade7.png)

Nhưng từ bây giờ bạn cũng có thể trải nghiệm luôn  Android 11 với điều kiện bạn có device Pixel 2, 3, 3a hoặc  4 và làm theo hướng dẫn ở đây ( [manual download and flash only](https://developer.android.com/preview/download)) 

Trong bài viết này sẽ giới thiệu những tính năng mới sẽ có trong  Android 11

### New experiences
**5G state API - DP2**  với việc thêm [ 5G state API ](https://developer.android.com/reference) sẽ cho phép bạn kiểm tra được xem user  đang dùng mạng mobile 5G hay mạng  Non-Standalone .  Bạn có thể sử dụng điều này để làm tăng tính trải nghiệm ứng dụng và tốc độ mạng 5G của ứng dụng của bạn khi người dùng được kết nối. Bạn có thể sử dụng API này cùng với [dynamic meteredness API ](https://developer.android.com/reference/android/net/NetworkCapabilities.html#NET_CAPABILITY_NOT_METERED) và [bandwidth estimator API](https://developer.android.com/reference/android/net/NetworkCapabilities.html#getLinkDownstreamBandwidthKbps()), cũng như các API kết nối hiện có, để có thể tận dụng được tốc độ và cũng như những  cải thiện mới  của mạng 5G. 

**Hinge angle for foldables**  Yêu cầu hàng đầu đối với các thiết bị foldable (có thể gập lại ) là API để lấy góc của các bề mặt màn hình thiết bị. Android 11 hiện hỗ trợ **hinge angle sensor** cho phép các ứng dụng truy vấn trực tiếp hoặc thông qua API AndroidX mới cho góc bản lề chính xác, để tạo trải nghiệm thích ứng cho các device foldables (  như là  Samsung Galaxy Fold , Microsoft Surface Duo , Huawei Mate X ) 

**Call screening service improvements** Để giúp người dùng quản lý **robocalls**, từ Android 11  đã thêm API  để cho phép các ứng dụng sàng lọc cuộc gọi làm nhiều hơn để giúp người dùng. Ngoài việc xác minh trạng thái [ STIR / SHAKEN](https://developer.android.com/reference/android/telecom/Call.Details.html#getCallerNumberVerificationStatus()) của cuộc gọi đến (các tiêu chuẩn bảo vệ chống giả mạo ID người gọi) như một phần của chi tiết cuộc gọi, các ứng dụng sàng lọc cuộc gọi có thể báo cáo lý do từ chối cuộc gọi. Ứng dụng cũng có thể tùy chỉnh màn hình cuộc gọi  do hệ thống cung cấp để cho phép người dùng thực hiện các hành động như đánh dấu cuộc gọi là spam hoặc thêm vào danh bạ. 

 **Controls in Neural Networks API** cải thiện và tối ưu cho các ứng dụng có sử dụng **machine learning** và **AI** ( tham khảo thêm [ở đây ](https://ai.googleblog.com/2019/11/introducing-next-generation-on-device.html) ) 
 
###  Privacy and security
Android 11 đã bổ sung thêm một số tính năng để giúp giữ an toàn cho người dùng và tăng tính minh bạch cũng như kiểm soát . 

**Foreground service types for camera and microphone**  trong Android 10 đã giới thiệu  attribute `foregroundServiceType` trong file manifest như một cách giúp đảm bảo accountability cho các use-cases cụ thể .Cũng như tăng tính bảo mật thông tin user . Giờ đây, trong Android 11  đã bổ sung thêm hai loại mới -**camera** và **microphone**. Nếu ứng dụng của bạn muốn truy cập dữ liệu camera hoặc microphone từ Foreground service , bạn cần thêm giá trị foregroundServiceType vào file manifest của ứng dụng .

**Scoped storage updates** Với mục đích bảo vệ tốt hơn dữ liệu của người dùng và ứng dụng trên bộ nhớ ngoài ( external storage) . Trong bản phát hành này đã thực hiện các cải tiến và thay đổi nhiều hơn , chẳng hạn như hỗ trợ di chuyển các tệp từ **legacy model** sang **scoped storage model** và quản lý tốt hơn các tệp được lưu trong bộ nhớ cache. Đọc thêm [ở đây ](https://developer.android.com/preview/privacy/storage?authuser=7) để biết thêm các cải tiến trong bản cập nhật Android 11 này . 

### Polish and quality

**Synchronized IME transitions** Một bộ API mới cho phép bạn đồng bộ hóa nội dung của ứng dụng với IME (viết tắt của **input method editor** hay đơn giản là **soft keyboard** ) và các thanh hệ thống khi chúng hoạt hình trên và ngoài màn hình, giúp dễ dàng tạo ra tự nhiên, trực quan và không bị giật . Ngoài ra, các ứng dụng có thể kiểm soát IME và chuyển đổi thanh hệ thống thông qua API [WindowInsetsAnimationControll](https://developer.android.com/reference/android/view/WindowInsetsAnimationController). 

Như ảnh bên dưới : 

![](https://images.viblo.asia/c673ddce-dbb7-4191-abf3-de629591c77b.gif)


**Variable refresh rate** Hiện tại hầu hết các thiết bị Android refresh màn hình ở tốc độ  60Hz, nhưng một số thiết bị hỗ trợ nhiều tốc độ khác nhau chẳng hạn như 90Hz cũng như 60Hz, với chuyển đổi runtime. Trên các thiết bị này, hệ thống sử dụng tốc độ khung hình ưa thích của ứng dụng để chọn tốc độ refresh tốt nhất cho ứng dụng. API có sẵn trong cả SDK và NDK. Xem chi tiết [ tại đây](https://developer.android.com/preview/features#frame-rate-api).

**Camera support in Emulator**  Trình giả lập Android hiện hỗ trợ các thiết bị camera giả lập trước và sau . Với sự hỗ trợ camera giả lập này, bạn có thể xây dựng và thử nghiệm với bất kỳ tính năng camera nào được thêm vào trong Android 11.

Trên đây làm một số tính năng mới trong Android 11 lần này  

Ref : 

https://developer.android.com/preview

https://android-developers.googleblog.com/

https://www.androidauthority.com/android-11-features-1085228/