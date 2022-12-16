![](https://images.viblo.asia/f1ffa4da-8f32-4e26-b055-0ca433b9fc2f.PNG)
Android Dev Summit là sự kiện được tổ chức thường niên. Đây là nơi tuyệt vời để học hỏi, chia sẻ và kết nối các developer Android trên toàn cầu. 

Sự kiện Android Dev Summit 2019 được diễn ra vào ngày 23, 24 tháng 10 tại trung tâm sự kiện Google (MP7) ở Sunnyvale, CA. Tại đó các developer đã giới thiệu về những cải tiến mới nhất, các cách thức tốt nhất để giúp bạn xây dựng các ứng dụng Android tốt hơn và nhanh hơn. Vậy thì ở Android Dev Summit 2019 có gì mới? Cụ thể mọi người có thể xem [tại đây](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc_xXXubDti2eRnIKU0p7wHd).

Ở bài viết này mình chỉ điểm qua 1 số vấn đề mà mình thấy đáng chú ý thôi nhé.

### 1. Jetpack Compose
Jetpack Compose là bộ UI toolkit hỗ trợ xây dựng UI (cụ thể chúng ta có thể dụng kotlin để vẽ UI thay thế và kết hợp với xml). Compose sử dụng Kotlin và tương thích với UI toolkit hiện có. 

Jetpack Compose đã được giới thiệu trước đó tại Google I/O 2019, tuy nhiên để sử dụng thì quá trình tích hợp các thư viện vào project khá phức tạp. Tại Android Dev Summit, Jetpack Compose 1 lần nữa được nhắc đến cùng với những tính năng nổi bật hơn, đồng thời việc tích hợp và sử dụng trong project Android cũng dễ dàng hơn.

Hiện tại, Jetpack Compose vẫn đang trong giai đoạn thử nghiệm, nhưng nó là một ví dụ điển hình về các tính năng độc đáo của Kotlin có thể được sử dụng trên Android và phát triển trong tương lai.

Để trực quan hơn thì bạn có thể tham khảo tại: [Jetpack Compose Tutorial](https://developer.android.com/jetpack/compose/tutorial) và [Jetpack Compose Basic Codelab](https://codelabs.developers.google.com/codelabs/jetpack-compose-basics) 
### 2. Android Studio 4.0 Canary
Android Studio 4.0 có nhiều tính năng nổi bật giúp cho việc phát triển chất lượng và thú vị hơn

* **Multi Preview**

Multi Preview là một công cụ trực quan để xem trước các layout, cách bố trí màn hình trong các thiết bị và các cấu hình khác nhau, có thể giúp nắm bắt các vấn đề tiềm ẩn trong layout.

Bạn có thể sử dụng tính năng thú vị này bằng cách click vào tab **Multi Preview** ở góc trên cùng bên phải (top-right corner) của IDE:

![](https://images.viblo.asia/7efecaec-25cf-42a2-b67e-64ec3f464c40.png) 

![](https://images.viblo.asia/05fa56b3-8f3c-4f5e-a1ea-e908bcef40d6.gif)

* **Live Layout Inspector**
Phiên bản update của Live Layout Inspector có nhiều tính năng tương tự như layout inspector hiện có. Nhưng với một số bổ sung mới, layout inspector sẽ hiển thị phân cấp bố cục cập nhật trực tiếp khi chế độ xem trên device thay đổi. Điểm đáng chú ý nhất là layout inspector cho phép chúng ta quan sát view 3D cực kỳ thú vị, nó có thể giúp chúng ta xác định các vấn đề có thể ảnh hưởng tiêu cực đến hiệu suất UI. <br><br> - **Dynamic layout hierarchy**: Update khi view trên thiết bị thay đổi<br><br>
![](https://images.viblo.asia/9764a467-592f-4e1b-affc-176f50099611.png)<br><br>- **Property values resolution stack**: Tìm vị trí của resource dựa trên hyperlinks trên bảng thuộc tính<br><br>
![](https://images.viblo.asia/3e77fe67-58ae-4671-948d-7c8aadc5fb99.png)<br><br>- **3D view**: Cái này thú vị lắm luôn. Xem phân cấp view tại runtime với 3D view vô cùng đơn giản, chỉ cần click vào view trên layout và xoay.<br>

![](https://images.viblo.asia/f011f78f-4883-4136-b561-40ba14b4c2dc.png)

* **Monitor editor**

Android Studio 4.0 bao gồm trình chỉnh sửa thiết kế trực quan (visual design editor) cho MotionLayout, giúp tạo và xem trước animations dễ dàng hơn. 

Trong các bản release trước, việc tạo và thay đổi các thành phần này yêu cầu chúng ta phải tự chỉnh sửa ở XML resource files. Bây giờ, Motion Editor có thể tự generate XML cho chúng ta, với sự hỗ trợ cho các trạng thái start và end, keyframes, transitions và timelines.
![](https://images.viblo.asia/300173c6-e389-425a-ac8b-8b0feeb34e83.gif)

* **Multiple Display Emulator**
![](https://images.viblo.asia/a15c609b-44fe-4271-8bbd-51d8bc12c6ee.png)

Còn nữa cơ nhưng thôi mình xin dừng tại đây. Các bạn có thể tìm hiểu chi tiết hơn [tại đây](https://developer.android.com/studio/preview/features)
### 3.  Modern Android Development
Google thúc đẩy các developers khuyến nghị về cách xây dựng ứng dụng của họ - giảm quyền truy cập vào dữ liệu nhạy cảm và giúp Google Play an toàn hơn cho trẻ em và gia đình của chúng ta. Google gần đây đã hạn chế quyền đăng nhập SMS / Cuộc gọi đối với các ứng dụng ngoại trừ những ứng dụng cần chúng như một phần của chức năng cốt lõi. Do đó đã ít hơn 98% ứng dụng truy cập dữ liệu nhạy cảm này. 

Gần 60% trong số 1.000 top ứng dụng Android hiện nay sử dụng Kotlin. Google đang hợp tác với JetBrains để mang đến tốc độ biên dịch nhanh hơn cho Kotlin, check lint nhiều hơn, giảm thiểu độ trễ của IDE khi typing,... Hiện tại, Google đã phát hành IDE hộ trợ đầy đủ cho Kotlin build scripts. Ngoài ra, Google cũng đã có một khóa học Android nâng cao với Kotlin trên Udacity và Chứng chỉ Associate Android Developer với Kotlin.

Ngày nay, hơn 250.000 Android App Bundles hiện đang ở production, chiếm 25% tổng số lượt cài đặt đang hoạt động. Google hiện đang thực hiện các gói ứng dụng (app bundles) và phân phối động (dynamic delivery) dễ dàng hơn để kiểm tra. 

### 4. Android Developer Challenge!
“The Android Developer Challenge is back. And the first Android Developer Challenge we’re announcing will be helpful innovation and machine learning. We’re asking all of you to submit ideas. We’ll pick the top 10. We will then bring those teams to Google. You will meet leading experts in machine learning and Android from across the company. You will get an exclusive look at Android 11, and once your apps are ready, we’ll share them in a collection on Google Play for billions of users to see.” – Stephanie Saad Cuthbertson, Google" <br>
[Xem chi tiết tại đây](https://developer.android.com/dev-challenge)

Trên đây là một số điểm đáng chú ý ở Android Dev Summit 19'. Tất nhiên còn nhiều điểm đáng chú ý khác nữa mà mình không thể liệt kê ra hết được. Mọi người có thể tìm hiểu thêm [tại link ở đầu bài viết](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc_xXXubDti2eRnIKU0p7wHd).


**Mình xin kết thúc bài viết tại đây. Cảm ơn các bạn đã dành thời gian đọc bài của mình (bow)**