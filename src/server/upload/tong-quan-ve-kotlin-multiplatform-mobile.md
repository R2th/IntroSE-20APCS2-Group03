# 1. Kotlin Multiplatform Mobile (KMM) là gì?
Trong bài viết này, chúng ta sẽ tìm hiểu **Kotlin Multiplatform Mobile** là gì và có thể sử dụng nó như thế nào trong dự án của mình. Chúng ta sẽ xem cách thiết lập (set-up) môi trường và chuẩn bị cho việc tạo một ứng dụng di động đa nền tảng (cross-platform mobile application) đầu tiên của mình với KMM! 

Vậy KMM là gì? KMM là viết tắt của Kotlin Multiplatform Mobile. Đây là một SDK để phát triển ứng dụng di động trên cả iOS lẫn Android. Nó sử dụng các khả năng đa nền tảng của Kotlin, bao gồm các công cụ (tools) và tính năng (features) khác nhau được thiết kế để cải thiện trải nghiệm xây dựng các *mobile cross-platform applications* (Hình 1). 

![](https://images.viblo.asia/1be87b9c-2237-4f44-981b-6563c2ed51d0.png)
<div align="center">Hình 1: Tổng quan về Kotlin Multiplatform Mobile</div>
<br>
Mình sẽ nói về tất cả các công cụ này trong các bài viết sắp tới! Dù bạn đang có dự định bắt đầu làm một project hay có một codebase đã được viết từ trước, bạn có thể tích hợp KMM một cách liền mạch. Shared code (ở trong 1 project KMM thì có 3 thư mục quan trọng là androidApp, iosApp và shared), được viết bằng Kotlin, được biên dịch thành JVM bytecode với Kotlin / JVM (giống như phát triển Android thông thường) và các tệp nhị phân native (native binaries) cho iOS với Kotlin / Native, vì vậy bạn có thể sử dụng các mô-đun KMM của mình giống như bất kỳ thư viện di động thông thường nào khác. (Hình 2)

![](https://images.viblo.asia/31ab95ba-3502-4753-aaee-8fbfcecf5189.png)
<div align="center" >
    Hình 2: cơ chế vận hành Module KMM
</div>
<br>
  
Điều đó cũng có nghĩa là KMM sẽ không áp đặt bất kỳ hạn chế nào đối với cách bạn phát triển giao diện người dùng của ứng dụng. Bạn có thể tự do sử dụng bất kỳ phong cách và khuôn khổ nào bạn muốn, bạn thích làm gì thì làm, bao gồm cả những kiểu hiện đại nhất, chẳng hạn như Jetpack Compose cho Android hoặc SwiftUl cho iOS.  

Mình tin rằng vẻ đẹp thật sự của KMM nằm ở tính linh hoạt của nó. KMM cho phép bạn chia sẻ những gì bạn muốn chia sẻ! Nó được thiết kế để giúp các nhà phát triển tái sử dụng (reuse) business logic của họ giữa các nền tảng di động (mobile platforms), chỉ viết code dành riêng cho từng nền tảng khi cần thiết, như triển khai native Ul hoặc khi làm việc với các API dành riêng cho nền tảng (platform-specific APIs).

![](https://images.viblo.asia/76fcc09e-b77b-4db0-b20b-dd2b0a9d2c98.png)
<div align="center" >
    Hình 3: Native code và Shared code
</div>

# 2. Sử dụng Kotlin Multiplatform
Khả năng sử dụng sức mạnh của từng nền tảng mà không cần bất kỳ chi phí nào trong khi vẫn giữ logic trừu tượng cho phép bạn sử dụng KMM theo bất kỳ cách nào bạn muốn. Bạn có thể quyết định chỉ chia sẻ các lớp dữ liệu (Hình 4 - Data/Core), sử dụng các thư viện phổ biến như Ktor hoặc SQLDelight.

![Presentation.png](https://images.viblo.asia/9dee9037-154f-4d41-8967-c739b54351b0.png)
<div align="center" >
    Hình 4: Cấu trúc một Project KMM - KMM Module lúc này chỉ có Data/Core
</div>
<br>
Có thể bạn đã xây dựng được một ứng dụng di động từ trước, trong trường hợp đó bạn có thể sử dụng KMM khi cần triển khai một số thuật toán xử lý dữ liệu mới. Logic này có thể dễ dàng tích hợp vào các dự án hiện có, đảm bảo hành vi giống hệt nhau trên cả hai nền tảng. (Hình 5 - Business / Domain)

![Presentation.png](https://images.viblo.asia/8f4724b9-49c8-49d5-8328-576025738cc4.png)
<div align="center" >
    Hình 5: Cấu trúc một Project KMM - KMM Module lúc này có thêm Business / Domain
</div>
<br>
Nếu các ứng dụng iOS và Android của bạn đủ giống nhau, bạn có thể sử dụng KMM để chia sẻ logic trình bày (Hình 6 - Presentation), cho phép bạn sử dụng một trình bày, mô hình chế độ xem hoặc bộ điều khiển chế độ xem hoặc thậm chí logic điều hướng. Trong các bài viết tiếp theo, chúng ta sẽ xem xét các dự án và chiến lược chia sẻ khác nhau. 

![Presentation.png](https://images.viblo.asia/a7834699-13a4-4639-a99f-046156e00956.png)
<div align="center" >
    Hình 6: Cấu trúc một Project KMM - KMM Module lúc này có thêm Presentation - ở Native chỉ hiện thị UI,các Module khác đã có thể làm việc trực tiếp tại KMM Module mà không cần đụng đến Native.
</div>

# 3. Cần có gì để Xây dựng KMM Project (Prerequisites)
Khái niệm vậy đủ rồi. Hãy nói về những gì chúng ta cần để bắt đầu với KMM. Mình hy vọng bạn sẽ hào hứng khi đọc bài viết này - nó thực sự không nhiều và ta có thể thực hiện hầu hết các thiết lập chỉ trong vài phút. Phát triển mobile cross-platform applications yêu cầu cần có Xcode để build Ứng dụng iOS. Điều này có nghĩa là bạn sẽ cần MacBook với hệ điều hành MacOS để phát triển các ứng dụng iOS với KMM, trong khi bạn vẫn có thể chạy phần chỉ dành cho Android trên máy Windows hoặc Linux. Bạn cũng sẽ cần Android Studio để code bằng ngôn ngữ lập trình Kotlin cho cả ứng dụng Android và *cross-platform module*. Ngoài ra, bạn sẽ cần Gradle để build tất cả mấy cái ở trên. 


Tất cả các dự án Kotlin Multiplatform đều được tạo bằng plugin **Kotlin Multiplatform Gradle**. Và cuối cùng, để sử dụng Gradle, bạn sẽ cần cài đặt *Java Development Kit (jdk)* trên máy của mình.

Tóm lại, các công cụ cần có gồm:
* Android Studio: để tạo multiplatform applications và run app trên máy ảo hoặc máy thật.
* XCode (chỉ chạy trên Macbook)
* Gradle
* Kotlin Multiplatform Mobile plugin
* JDK
* Kotlin plugin: Check nó tương tự như KMM Plugin, vào **Plugins | Installed.** Check Kotlin version ở **Tools | Kotlin | Configure Kotlin Plugin Updates.**

Install JDK theo hướng dẫn: https://www.geeksforgeeks.org/download-and-install-java-development-kit-jdk-on-windows-mac-and-linux/

Tải Xcode trên appStore MacOS để tải version mới nhất hoặc tải Xcode theo version https://xcodereleases.com/

Tải Android Studio ngay trên https://developer.android.com/android-studio/download

Tất tần tật tài liệu về KMM tại: https://kotlinlang.org/docs/multiplatform-mobile-getting-started.html
# 4. Kotlin for Android Studio
Đầu tiên bạn nên cài đặt Plugin Kotlin Multiplatform Mobile cho Android Studio. 

Các bước cài đặt như sau:

1) Chạy App **Android Studio**

2) Chọn **File -> Settings** (**Preferences** đối với Máy MacOS )

3) Plugins 
4) Ở Marketplace -> Search **Kotlin Multiplatform Mobile** -> Nhấn **Install** (Hình 7)

![Screenshot 2022-12-02 at 20.41.20.png](https://images.viblo.asia/de9bb89b-e042-4dc9-a639-736f434bc447.png)

<div align="center" >
    Hình 7: Cài đặt Plugin Kotlin Multiplatform Mobile cho Android Studio
</div>
<br>
Plugin này cung cấp tích hợp với trình mô phỏng iOS và thiết bị iOS trong Android Studio. Bạn sẽ có thể chạy và gỡ lỗi ứng dụng và thử nghiệm của mình trên iOS từ Android Studio mà không cần phải chuyển đổi IDE trong khi làm việc trên phần shared part của code. Plugin cũng cung cấp các trình hướng dẫn tiện dụng để tạo các KMM project mới hoặc thêm mô-đun vào các dự án Android hiện có. Với trình hướng dẫn “new project”, bạn có thể tạo một cross-platform mobile application sẵn sàng để chạy chỉ trong vài cú nhấp chuột!

Vậy là môi trường của chúng ta đã được thiết lập, 2 hình 8 và 9 là hình ảnh project sử dụng KMM của mình.
Các bạn có thể tham khảo source code ở đây: https://github.com/misterbo271/mpvKmmApp

![Screenshot 2022-12-02 at 19.25.50.png](https://images.viblo.asia/29dac05f-8b5c-450d-922a-e406248c408c.png)
<div align="center" >
    Hình 8: Chạy iOS Simulator ngay trên Android Studio mà không cần XCode
</div>
<br>

![Screenshot 2022-12-02 at 19.28.27.png](https://images.viblo.asia/5dd440d2-03f8-4827-b568-9f4033923a0e.png)
<div align="center" >
    Hình 9: Kotlin Multiplatform Mobile Project
</div>
<br>

Cảm ơn bạn đã đọc bài viết, chờ đón những nội dung về Kotlin, KMM trong các bài viết tiếp theo nhé.

# Preferences
* Get started with Kotlin Multiplatform Mobile, *Last modified: 21 October 2022*, url: https://kotlinlang.org/docs/multiplatform-mobile-getting-started.html
* FAQ - What is Kotlin Multiplatform Mobile?, *Last modified: 04 November 2022*, url: https://kotlinlang.org/docs/multiplatform-mobile-faq.html