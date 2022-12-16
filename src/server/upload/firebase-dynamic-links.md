# Overview
Firebase Dynamic Links là các liên kết (links) hoạt động theo cách bạn muốn, trên nhiều nền tảng và cho dù ứng dụng của bạn đã được cài đặt hay chưa.

Firebase Dynamic Links giúp kiểm soát nơi người dùng muốn đến tùy thuộc vào việc họ đã cài đặt ứng dụng hay chưa. Với hành vi như vậy sẽ mang lại trải nghiệm người dùng phong phú hơn khi tương tác với các chiến dịch marketing.

Với Firebase Dynamic Links, người dùng của bạn sẽ có được trải nghiệm tốt nhất hiện cho nền tảng mà họ mở liên kết (link) của bạn. Nếu người dùng mở Liên kết động trên iOS hoặc Android, họ có thể được đưa trực tiếp đến nội dung được liên kết trong native app của bạn. Nếu người dùng mở cùng một Liên kết động trong trình duyệt trên máy tính để bàn, họ có thể được đưa đến nội dung tương đương trên trang web của bạn.

Ngoài ra, Liên kết động (Dynamic Links) hoạt động trên các lượt cài đặt ứng dụng: nếu người dùng mở Liên kết động trên iOS hoặc Android và chưa cài đặt ứng dụng của bạn, người dùng có thể được nhắc cài đặt nó; sau đó, sau khi cài đặt, ứng dụng của bạn khởi động và có thể truy cập liên kết.

Bạn có thể tạo Liên kết động (Dynamic Links) bằng cách sử dụng bảng điều khiển Firebase (Firebase console), sử dụng API REST, trình tạo API  cho iOS hoặc Android hoặc bằng cách tạo URL bằng cách thêm parameter Liên kết động vào domain cụ thể cho ứng dụng của bạn. Các thông số này chỉ định các liên kết bạn muốn mở, tùy thuộc vào nền tảng của người dùng và ứng dụng của bạn có được cài đặt hay không.

Khi người dùng mở một trong các Liên kết động của bạn, nếu ứng dụng của bạn chưa được cài đặt, người dùng sẽ được đưa đến Cửa hàng Play hoặc App Store để cài đặt ứng dụng của bạn (trừ khi bạn chỉ định khác) và ứng dụng của bạn sẽ mở ra. Sau đó, bạn có thể truy xuất liên kết đã được chuyển đến ứng dụng của mình và xử lý deeplinks phù hợp với ứng dụng của bạn.

Trong bài viết này, chúng ta sẽ xem xét sự khác nhau giữa các component trong Firebase Dynamic Links , thứ mà bạn cần phải xem xét khi tạo liên kết động (Dynamic Links). Những điều này giúp đảm bảo rằng người dùng được chuyển hướng đến trang đích/ứng dụng mong muốn và các kênh tiếp thị vẫn nguyên vẹn trong suốt quá trình chuyển đổi.

Ví dụ: Khi app lazada, shoppee, tiki quảng cáo sản phẩm trên facebook, vậy khi bạn click quảng cáo vào sản phẩm bạn chọn thì hệ thống sẽ check và mở app lazada, hiện thị đúng sản phẩm bạn chọn.

# 1. Dynamic Link Components

Có bốn thành phần (Components) của liên kết động (Dynamic Link) cần lưu ý khi tạo Liên kết động Firebase:

- What to do when a **user already has the app installed**? (Phải làm gì khi người dùng đã cài đặt ứng dụng?)
- What to do when a user **clicks from Android without an app**? (Phải làm gì khi người dùng click từ Android mà không có ứng dụng?)
- What to do when a user **clicks from iPhone without an app**? (Phải làm gì khi người dùng click từ Iphone mà không có ứng dụng?)
- Where to add **UTM parameters** to the URL of dynamic link? (Thêm parameter UTM vào URL của liên kết động ở đâu?)

Dưới đây là một follow liên kết động (Dynamic Link) điển hình:

![](https://images.viblo.asia/59fead1e-8e68-4f40-a680-2197ab38dc24.png)

## 1.1 What to do when a user already has the app installed?
DeepLink được sử dụng trong Liên kết động Firebase khi người dùng đã cài đặt ứng dụng và chúng được kích hoạt lại theo mục tiêu (targeted).

DeepLink là gì?
DeepLink là các liên kết cho phép người dùng di chuyển đến một phần hoặc một phần nội dung cụ thể của ứng dụng hoặc trang web. Ví dụ: một DeepLink khi được click vào sẽ đưa người dùng trực tiếp đến phần danh mục sản phẩm của ứng dụng.

DeepLink chứa tất cả thông tin cần thiết để trỏ đến một mục cụ thể.

Dưới đây là cách thêm DeepLink trong tạo Liên kết động Firebase:

![](https://images.viblo.asia/9bf6a183-46c2-4288-85bf-e81d3f68954b.png)

DeepLink được nhập ở trên sẽ kích hoạt khi người dùng đã cài đặt ứng dụng.

## 1.2 What to do when a user clicks from Android without an app?
Trong trường hợp không có ứng dụng Android nào được cài đặt, Dynamic Link cho phép mở trang ứng dụng Cửa hàng Play hoặc bất kỳ URL tùy chỉnh nào.

Bất kể nhà tiếp thị muốn đưa người dùng đến trang web hay App Store, chúng ta sẽ đề xuất sử dụng tùy chọn custom URL. Lý do cho URL tùy chỉnh là chúng ta có thể thêm các parameters UTM trong URL tùy chỉnh. Làm như vậy cho phép chúng tôi nắm bắt UTM trong native code của ứng dụng dành cho thiết bị di động sau khi người dùng đã cài đặt ứng dụng, có thể được gửi đến bất kỳ nền tảng phân tích mong muốn nào như Mixpanel, Amplitude, hoặc Firebase Analytics. [Đọc ở đây để biết thêm chi tiết về cách nắm bắt giới thiệu trên cài đặt ứng dụng.](https://developer.android.com/google/play/installreferrer/igetinstallreferrerservice)

How to create a custom URL for Android? (Làm thế nào để tạo 1 custom URL cho Android)

[PlayStore URL builder](https://developers.google.com/analytics/devguides/collection/android/v3/campaigns#google-play-url-builder) sẽ giúp tạo URL tùy chỉnh cho android. Cuộn xuống cuối trang để tạo URL.

Hãy xem ví dụ dưới đây:

![](https://images.viblo.asia/45c4fb72-a496-42b3-8040-f6fb4111b6db.png)

> Example custom URL generated by the Google Play URL Builder <br>
> https://play.google.com/store/apps/details?id=com.disrupt.savyour&referrer=utm_source%3DtestSource%26utm_medium%3DtestMedium%26utm_campaign%3DtestCampaign

Bạn có thể thấy trong URL có 1 param ***referrer*** ở trước UTMs? Param này là Param cho phép chúng ta nắm bắt thông tin lưu lượng (traffic) native code trong Android.

Here is how it looks in Firebase:

![](https://images.viblo.asia/fa66a1d7-ec0c-48ee-a40b-b8ad30f88a42.png)

## 1.3 What to do when a user clicks from iPhone without an app?
Gửi người dùng đến App Store tương tự như Android. Thay đổi duy nhất là chúng ta không phải sử dụng URL tùy chỉnh vì khi viết bài này, App Store không có bất kỳ API nào cho phép chúng ta nắm bắt các nguồn lưu lượng truy cập trong native app tương tự như Android.

Tuy nhiên, đối với iPhone, chúng tôi thêm campaign parameters trên App Store. Làm như vậy giúp xem thông tin chiến dịch trực tiếp trong in-app store analytics.

![](https://images.viblo.asia/e07c30ec-b044-4b39-ad61-e35c6c259eda.png)

[Xem thêm thông tin chi tiết tại đây](https://appstoreconnect.apple.com/login?module=AppAnalytics&hostname=analytics.itunes.apple.com&targetUrl=%2F&authResult=FAILED#%2Fcampaigngenerator%3Fapp=1237114277)

## 1.4 Where to add UTM parameters to the URL of dynamic link?
Mặc dù chúng ta đã thêm UTM trong URL tùy chỉnh cho Android, chúng ta cũng cần thêm thông số UTM trong phần cuối cùng của quá trình tạo liên kết động. Lý do là khi người dùng nhấp vào liên kết động với ứng dụng đã được cài đặt, đây là những giá trị mà chúng tôi nhận được trong native code để gửi đến nền tảng phân tích (analytics platform). Do đó, việc thêm UTM ở đây cũng là điều cần thiết.

Phần cuối cùng này cũng có một tùy chọn để thêm text (văn bản) và links (liên kết) cho các bản xem trước trên mạng xã hội (social media). Tốt hơn là thêm thông tin có liên quan vào đó. Xem hình ảnh bên dưới:

![](https://images.viblo.asia/a10da901-e7a9-4b7d-853c-588b06338170.png)

# 2. How to verify Dynamic Links?
Firebase cung cấp một cách để xác minh hoạt động của Liên kết động Firebase. Điều này cho phép xem link (liên kết) sẽ hoạt động như thế nào tùy thuộc vào vị trí người dùng nhấp vào link.

Để xác minh liên kết (link), hãy dán liên kết đó vào trình duyệt và thêm **?d=1** vào cuối và nhấn enter. Làm như vậy sẽ mở ra một biểu đồ (chart) cho thấy người dùng sẽ di chuyển như thế nào tùy thuộc vào nơi họ tương tác với liên kết.

Dưới đây là hình ảnh ví dụ về những gì bạn sẽ thấy:

![](https://images.viblo.asia/a4582c78-52ab-443a-9752-5a7a4c348f74.png)

Nó mô tả hoạt động của liên kết động tùy thuộc vào nền tảng của người dùng. Vì vậy, ví dụ từ trên cùng bên trái, trong hình ảnh, nếu liên kết được nhấp từ Android có cài đặt ứng dụng thì liên kết động sẽ được mở và nếu ứng dụng chưa được cài đặt thì URL dự phòng sẽ được kích hoạt. URL dự phòng trong trường hợp của chúng tôi là URL tùy chỉnh mà chúng tôi đã nhập.

# 3. How to View Dynamic Link Stats?
Tùy chọn đầu tiên là xem thống kê, chẳng hạn như số lần nhấp mới và tổng số lần nhấp, trực tiếp trong bảng điều khiển Firebase (Firebase console).

![](https://images.viblo.asia/4684cb1c-9772-4abe-9664-bfd8e29b34dc.png)

Tùy chọn thứ hai là xem nó trong Firebase analytics. Dưới đây là các sự kiện mà bạn sẽ thấy trong phân tích Firebase:

![](https://images.viblo.asia/63df9400-3355-48db-8537-dbdc6b71138b.png)

[Xem chi tiết tại đây](https://firebase.google.com/docs/dynamic-links/analytics#:~:text=Firebase%20Dynamic%20Links%20records%20events,retrieved%20using%20a%20REST%20API.)

# Conclusion
Firebase Dynamic Links cung cấp một cách mạnh mẽ để kiểm soát cách người dùng được chuyển đến ứng dụng, tùy thuộc vào trạng thái cài đặt ứng dụng của họ. Nếu được tạo đúng cách, các liên kết động không chỉ mang lại trải nghiệm tốt hơn mà còn cho phép bạn nắm bắt đúng thông tin kênh tiếp thị trong các công cụ phân tích của mình.


Tài liệu tham khảo:
- https://firebase.google.com/docs/dynamic-links
- https://medium.com/firebase-developers/firebase-dynamic-links-guide-76552c0f292e