![](https://images.viblo.asia/760e61d9-deb3-4000-86ce-10bd61a0e69e.png)

Là một nhà phát triển Android, chúng ta sẽ dành một phần lớn thời gian của mình cho Android Studio, trình biên dịch chính thức của Google để phát triển ứng dụng Android gốc. Qua nhiều năm, nó đã phát triển thành một IDE rất mạnh mẽ với nhiều tính năng và chức năng. Nhưng vẫn còn một số vấn đề chưa được khắc phục đối với nhiều nhà phát triển vì nhiều lý do như thời gian build Gradle, tốc độ Android Studio, v.v.

![](https://images.viblo.asia/f55ac52e-959f-4b7b-a0ba-07db1183a2ec.png)

Đã có nhiều bài viết bao gồm các tài liệu chính thức về cách tăng tốc. Một số hoạt động còn một số không. Nhưng bài viết này không phải là về thời gian build gradle. Thay vào đó, đây là vấn đề phổ biến hơn nhưng gây khó chịu: Android Studio chậm. Hãy xem cách tăng tốc và làm cho nó nhanh hơn bằng một số cách rất dễ dàng.

#
#### Yêu cầu Android Studio
####
Theo yêu cầu hệ thống chính thức của Android Studio, phải mất tối thiểu 3 GB RAM để chạy trơn tru. Thành thật mà nói, nó rất nhiều và tôi tin rằng đó là nguyên nhân lớn nhất của việc nó quá chậm mọi lúc.

![](https://images.viblo.asia/e10e5eac-3202-40ec-9e51-1f790b278baf.png)

Các nhà phát triển Android luôn phàn nàn về tốc độ của Android Studio và tốc độ TẤT CẢ THỜI GIAN của nó chậm như thế nào. Điều này làm cho sự phát triển tổng thể chậm và bực bội. Nó ảnh hưởng tiêu cực đến năng suất.

![](https://images.viblo.asia/f8020929-671b-40ed-927e-d705f2a13a64.png)

![](https://images.viblo.asia/77915d90-bf59-46b8-88d9-3fa80c12aab5.jpeg)

Chúng ta hãy xem làm thế nào để làm cho nó nhanh hơn rất nhiều theo một cách rất dễ dàng.

#
#### 🚀Speeding Up Android Studio
####
Bạn có thể đã đọc các thủ thuật khác nhau như Offline Gradle, tăng memory trong tệp gradle.properties, vô hiệu hóa Instant Run, v.v. Hãy để tôi chỉ cho bạn một cách rất dễ dàng, được chia sẻ bởi không ai khác ngoài Jake Wharton trên Reddit khoảng một năm.

![](https://images.viblo.asia/82270511-b3ce-43aa-b1bc-428b7d0c5fdc.png)

Đầu tiên, nhấp vào *File -> Settings -> Plugins* để mở hộp thoại như thế này.

Bây giờ, vô hiệu hóa hoặc Kiểm tra tất cả các plugin không thể sử dụng cho bạn. Tôi đã bị vô hiệu hóa sau:


* Android APK Support
* Android Games
* Android NDK
* App Links Assistant
* Copyright
* Coverage
* CVS Integeration
* Editor Config
* Fabric for Android Studio
* Firebase (App Indexing, Services, Testing)
* Github
* Google (Cloud Tools Core, Cloud Tools for Android, Developer Samples, Login, Services)
* Markdown Support
* Mercurial integration
* hg4idea
* Settings repository
* Subversion integration
* Task management
* Test recorder
* TestNG-J
* YAML

Bây giờ, hộp thoại của bạn sẽ giống như thế này:
![](https://images.viblo.asia/c29c5cf2-7887-4fd8-a4a8-7c42f1dc628a.png)

Bây giờ, nhấp vào *Apply -> OK* và khởi động lại Android Studio. Bạn sẽ cảm thấy sự khác biệt ngay lập tức, tôi đặt cược.

#
#### 🤔 Điều gì sẽ xảy ra nếu tôi cần bất kỳ Plugin nào sau này?
####
Ví dụ: tại một số điểm, ứng dụng của bạn cần Liên kết ứng dụng Firebase và bạn muốn sử dụng plugin. Sau đó chỉ cần kích hoạt nó trong một thời gian tạm thời. Làm công việc của bạn. Và sau đó bạn có thể vô hiệu hóa nó một lần nữa.

#
#### 💡 Thêm đề xuất từ độc giả
####
Cảm ơn tất cả các độc giả bao gồm cả bạn đã đọc và đánh giá cao bài viết này. Nó có nghĩa là cuộc sống với tôi. Một số độc giả đã tốt bụng chia sẻ đề xuất của họ để tăng tốc Android Studio thông qua các bình luận, twitter và các cách khác.
* Linux hoạt động tốt hơn cho Android Studio so với Windows.
* Android Studio needs at least 8 GB RAM to run better.
* Thay đổi đĩa cứng của bạn thành SSD. Thời gian Loading/Compiling/Designing/Writing  sẽ giảm ngay cả trong 4GB RAM
* Sử dụng chế độ Power Save  từ Menu File  sẽ giảm nhiều công việc nền.
* Thay đổi và định cấu hình Highlighting Level thành Syntax hoặc None có từ góc dưới bên phải của thanh trạng thái. Hãy nhớ điều này sẽ vô hiệu syntax highlighting.
* Nếu bạn đang sử dụng bất kỳ phần mềm chống vi-rút nào, hãy đảm bảo thêm Exception của tất cả các thư mục Android (android, java, .android, .gradle, .androidstudio (số phiên bản) tất cả các thư mục đó). Vì vậy, nó sẽ không thử và Quét chúng trong khi bạn đang sử dụng Android Studio. Nó làm cho nó thậm chí nhanh hơn.

Cảm ơn Ivan Panasiuk, Sooraj R, Chila Kasonde, M Bip, Yogesh Gosavi và Jeorane - Costureiro

Tôi hy vọng điều này sẽ khắc phục vấn đề của bạn và làm cho Android Studio của bạn nhanh hơn và phát triển ứng dụng của bạn nhanh hơn. 😃 Happy App Coding

#
#### Reference 
#### 

[android.jlelse.eu](https://android.jlelse.eu/is-your-android-studio-always-slow-heres-how-to-speed-up-immediately-326ef9238024)