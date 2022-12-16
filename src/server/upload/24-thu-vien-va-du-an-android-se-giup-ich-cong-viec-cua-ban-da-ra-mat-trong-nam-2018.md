Chúng ta không thể phủ nhận vai trò to lớn của open source và bên cạnh nó là những bộ thư viện hay mã nguồn giúp dân lập trình tái sử dụng được giảm được rất nhiều thời gian và công sức, nâng cao hiệu quả công việc. Tại nội dung bài viết này tôi xin giới thiệu đến bạn đọc những thư viện, công cụ và những dự án trong năm 2018 đã ra mắt và tôi nghĩ nó sẽ rất có ích cho công việc của các bạn.
# [1. transitioner](https://github.com/dev-labs-bg/transitioner)
Transitioner là thư viện cung cấp những animation giữa 2 view với children con của nó một cách dễ dàng, đa dạng và dễ căn chỉnh. Thư viện này được viết bằng 100% Kotlin, document tốt với MIT license.
![](https://media.giphy.com/media/k72V2BZHnZrgWGMHCo/giphy.gif)
Thư viên này hỗ trợ API 19 trở lên, dự án này cũng có nhiều ví dụ cho bạn học hỏi. Hãy thử khám phá nó xem sao nhé.
# [2. FragmentRigger](https://github.com/JustKiddingBaby/FragmentRigger)
Thư viện này sẽ quản lí Fragment một cách tuyệt vời. Mục đích của nó được tạo ra là để Fragment dễ sử dụng hơn và chi phí cho viện quản lí nó giảm xuống.

![](https://media.giphy.com/media/495CXMKp2GhnUoHEaB/giphy.gif)

Thư viện này cũng có document khá chi tiết và đầy đủ. Nó được release với MIT license.
# [3. PRDownloader](https://github.com/MindorksOpenSource/PRDownloader)
Đây là 1 thư viện File Downloader cho android có thể pause và resume việc download.
![](https://images.viblo.asia/7d6f0055-bde2-4d73-b4ff-f37f4b508015.png)
> PRDownloader có thể dùng để download file ảnh, video, pdf, apk và một số file khác
Hỗ trợ download file nặng.
Có interface đơn giản để tạo request. Kiểm tra trạng trái download bằng Id. Callback trả về khi download : onProgress, onCancel, onStart, onError...
Hỗ trợ cancel request.
Nhiều request gọi song song.
Tất cả các loại customization đều khả dụng với thư viện này.
# [4. AnimatedPieView](https://github.com/razerdp/AnimatedPieView)
AnimatedPieView là một thư viện khác cho viện hiển thị biểu đồ thi pie và ring trên Android. Trông nó thật tuyệt phải không nào? Hãy dùng nó nếu có thể nhé.

![](https://media.giphy.com/media/1AfrM9hCjul9Y8oXfR/giphy.gif)
![](https://media.giphy.com/media/NS4sjxhTPMgVZ8PTI6/giphy.gif)

Thư viện này hỗ trợ:
* alpha animation on touch
* setting clearance angle
* fitting vị trí text field khi animation
* setting description và show nó
* click callback
* click hiệu ứng
* hiệu ứng chuyển đổi pie chart và ring chart
* hiệu ứng khi vẽ biểu đồ
Thư viện này có document tốt. Hỗ trợ tiếng Anh và release với Apache-2.0 license.
# [5. FloatWindow](https://github.com/yhaolpz/FloatWindow)
Thư viện này giúp thêm "Floating Window" có thể hiển thị luôn on top trên tất cả các Activity. Ví dụ như một Float Action Button.

![](https://media.giphy.com/media/82wBrzzlHXw68e6rnl/giphy.gif)

Thư viện được release với Apache 2.0 license. Document chỉ có tiếng Trung Quốc, để đọc được nó bạn phải tự dùng Google Translate.

# [6. MyLittleCanvas](https://github.com/florent37/MyLittleCanvas)
Lí do thư viện này ra đời nhằm đơn giản hóa việc làm việc với canvas trên Android. Thay vì method bạn có thể sử dụng object.

![](https://media.giphy.com/media/tZAD6mivQWVwsXwmBd/giphy.gif)

Bằng việc sử dụng thư viện này. Bạn có thể custom underline của 1 TextView kết quả đạt được như trên. Lib được release với  Apache-2.0 license.

# [7. WindowImageView](https://github.com/Bleoo/WindowImageView)
Đây là 1 thư viện khá thú vị cho việc hiển thị ImageView trong RecyclerView . Trông hoạt động của nó như 1 window.

![](https://cdn-images-1.medium.com/max/1600/1*3-AVoH4elBjkXV-dd_9vzQ.gif)
![](https://cdn-images-1.medium.com/max/1600/1*XSSM161wa9cwCBXsbuGhzA.gif)

Dự án này bao gồm cả các ví dụ. Document cũng đủ để người mới làm quen có thể làm được, được release với  MIT license.
# [8. ChartView](https://github.com/romandanylyk/ChartView)
ChartView là dự án dùng vẽ biểu đồ sử dụng Canvas và ValueAnimaionr.
![](https://cdn-images-1.medium.com/max/1600/1*-kgQjOF8MjzB-V8np5KWWA.gif)

# [9. hyperlog-android](https://github.com/hypertrack/hyperlog-android)
Đây là 1 công cụ log, nó cho phép ta log những chuẩn log Android để lưu trữ vào database sau đó push chúng lên server để debug
![](https://cdn-images-1.medium.com/max/1600/1*n-RMMPoJYGCHPUGlkKZYOA.gif)

Document của thư viện này khá toàn diện. Và cũng có những blog về chủ đề này rồi. Lib được release với MIT license và hiện tại version đang là 0.0.7.
# [10. Fairy](https://github.com/Zane96/Fairy)
Fairy là 1 công cụ debug dễ dàng, nó cho phép developer sử dụng adb logcat command để hiển thị Android system log trên Android phone thay vì trên máy tính.
Nó cũng cho phép scan thông tin system log bất cả nơi đâu sử dụng Android phone mà không cần quyền root.

![](https://cdn-images-1.medium.com/max/1600/1*R0nCIU2RSEOTmUQ5V6I-TQ.png)

Thư viện này release với Apache-2.0  và hỗ trợ API 21 trở lên.

# [11. ExpansionPanel](https://github.com/florent37/ExpansionPanel)
Đây là một thư viện tuyệt vời khác từ Florent Champigny. Nó cung cấp cho chúng ta cách implement Expansion Panels ( nó bao gồm việc tạo flows và cho phép sửa element một cách đơn giản).

![](https://cdn-images-1.medium.com/max/1600/1*J7o_zt99Vch0OdjAJhL4Kw.gif)

Document của lib này khá toàn diện, và trong dự án có bao gồm nhiều ví dụ. Được release với Apache-2.0 license.
# [12. kotlin-math](https://github.com/romainguy/kotlin-math)
Là 1 bộ Kotlin APIs để tạo ra  graphics math một cách dễ dàng hơn. Các API này phần lớn được mô hình hóa từ GLSL (OpenGL Shading Language) để port code từ shaders dễ dàng hơn.

Dự án release với Apache-2.0 license.
# [13. TicketView](https://github.com/vipulasri/TicketView)

Thư viện này giúp ta tạo ra các cái vé "Ticket View" . Nó cung cấp 3 loại : normal, rounded, scalltop

![](https://cdn-images-1.medium.com/max/1600/1*SAKw7FLkt2w3_Io1dH8sgg.png)
Lib release với Apache-2.0 license và có nhiều ví dụ trong repo. Hỗ trợ API 15 trở lên.


# [14. Cipher.so](https://github.com/MEiDIK/Cipher.so)
Thư viện này cung cấp 1 cách đơn giản để mã hóa những thông tin nhạy cảm vào native .so.
![](https://cdn-images-1.medium.com/max/1600/1*jMxaiYhmgqNOrbUkeSFVcg.png)

Cách hoạt động của thư viện này như thế nào? Tất cả các key- values sẽ tự động đóng gói vào thư viện native trong quá trình biên dịch. Sau đó nó có thể được lấy ra từ Java bởi Cipher.so.

Document thư viện này đầy đủ và release với Apache-2.0 license.

# [15. android-clean-architecture-mvi-boilerplate](https://github.com/bufferapp/android-clean-architecture-mvi-boilerplate)
Đây là 1 fork của Buffer clean architecture boilerplate sử dụng  Model-View-Intent pattern.

![](https://cdn-images-1.medium.com/max/1600/1*sPoW9RyB4DSPFSJkDmNp1g.png)

Trong presentation layer nó sử dụng  ViewModels từ  Android Architecture Components Library. Caching layer cũng sử dụng Room.
# [16. Android-Indefinite-Pager-Indicator](https://github.com/rbro112/Android-Indefinite-Pager-Indicator)
Thư viện hỗ trợ pager indicator với số lượng không xác định các chấm không rõ ràng được sử dụng cho RecyclerViews & ViewPagers.

![](https://cdn-images-1.medium.com/max/1600/1*IyJBQ1rM4Flcj8_P0-75sQ.gif)

Release với MIT license. API 16 trở lên.

# [17. daggraph](https://github.com/dvdciri/daggraph)
Nếu bạn đã từng sử dụng Dagger, bạn hầu như sẽ rất muốn có một sơ đồ biểu thị sự phụ thuộc của các thành phần hệ thống của bạn. Daggerph chính là công cụ giúp bạn thực hiện điều đó.

![](https://cdn-images-1.medium.com/max/1600/1*SJeUxkD1Y5SomH2GW5HX9w.png)

Document của lib khá sơ sài nhưng cũng đủ để ta dùng. Lib release với Apache-2.0 license.

# [18. ToastCompat](https://github.com/drakeet/ToastCompat)

Đây là lib dùng để fix Toast BadTokenException. Từ API 25, 1 parameter mới được add vào IBinder windowToken cho Toast#handleShow() và nó gây ra BadTokenException. Thư viện này sinh ra nhằm khắc phục lỗi đó.

Thông tin bạn có thể tìm hiểu thêm trong README trên Github. Dự án release với Apache-2.0 license.
# [19. RecyclerBanner](https://github.com/renjianan/RecyclerBanner)
Đây không phải là thư viện nhưng nó có những ví dụ giúp bạn làm được những điều sau đây với RecyclerView.

![](https://cdn-images-1.medium.com/max/1600/1*z03XaCe1VJiFg5bkS5QryQ.gif)

Thật không may nó không có document tiếng Anh, tuy nhiên bạn vẫn có thể dùng Google Translate để dịch nó.
# [20. FancyToast-Android](https://github.com/Shashank02051997/FancyToast-Android)
Thư viện này giúp style hóa Toast nhàm chán của hệ thống Android
![](https://cdn-images-1.medium.com/max/1600/1*xRGylM8wqFjq7IUxJOJbcQ.png)

Yêu cầu API 19 trở lên. Lib được release với Apache-2.0 .


# [21. RecyclerViewCardGallery](https://github.com/zjw-swun/RecyclerViewCardGallery)
Thư viện này là 1 fork từ RecyclerViewCardGallery. Thay vì sử dụng ViewPager, tác giả sử dụng RecyclerView để tạo ra hiệu ứng dưới đây và nó có thể swipe to refresh.
![](https://cdn-images-1.medium.com/max/1600/1*YKGJDd-cQ0S1thF7lwahcg.gif)

Document lib dạng cơ bản, release với Apache-2.0 license.


# [22. retrofit2-kotlin-coroutines-adapter](https://github.com/JakeWharton/retrofit2-kotlin-coroutines-adapter)
Đây là một thử nghiệm Retrofit 2 CallAdapter.Factory  cho Kotlin coroutine's Deferred. Được phát hành theo giấy phép Apache-2.0.

# [23. CalendarPicker](https://github.com/maxyou/CalendarPicker)
Đây là một sự lựa chọn khác cho calendar và date picker. Thư viện cho phép bạn dễ dàng customize màu, hình nền, và tiêu đề tháng...

![](https://cdn-images-1.medium.com/max/1600/1*nyZyTj3ouTs_ZpK3Q2mXIA.gif)
Lib release với MIT license và document cơ bản.

# [24. avocado](https://github.com/alexjlockwood/avocado)
Đây là 1 command line tool (giống với svgo) , nó tối ưu hóa Android VectorDrawable (VD) và AnimatedVectorDrawable (AVD) xml file. Nó được tạo ra bởi  Alex Lockwood , release với  MIT license.
Chính xác thì: 
> avdo viết lại VectorDrawable sử dụng số thẻ  <group> và <path> ít nhất có thể, giảm kích thước file và làm cho chúng parse và vẽ nhanh hơn khi chạy rumtime.

Nguồn tham khảo : [ProAndroidDev](https://proandroiddev.com/25-new-android-libraries-and-projects-to-check-at-the-beginning-of-2018-ba3b422bbbb4)