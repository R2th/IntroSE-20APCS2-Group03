### 1. AndroidX là gì? Tại sao phải dùng nó?
Khi nghe đến "AndroidX" lần đầu thì bạn có nghe thấy mới lạ không? Có khi nào bạn nghĩ nó là một version mới của hệ điều hành Android, giống như kiểu Android10 hay của Apple là IphoneX chẳng hạn :). Nếu bạn nghĩ như vậy thì đã nhầm rồi đó nghe ^^

AndroidX là một mã nguồn mở mà những Developers của Google dùng để phát triển, test, đóng gói và phát hành các thư viện trong Jetpack. AndroidX chỉ mới được giới thiệu gần đây ở trong gói Jetpack của Google và hàu như chưa được sử dụng rộng rãi.

AndroidX là một cải tiến lớn đối với thư viện Android Support Library gốc. Cũng giống như Android Support Library, AndroidX phân phối riêng biệt với hệ điều hành Android và cung cấp khả năng tương thích ngược trên các phiên bản Android trước đó. AndroidX thay thế hoàn toàn Support Library bằng cách cung cấp tính năng hỗ trợ và những thư viện mới. Ngoài ra AndroidX còn bao gồm tính năng sau:

1. Tất cả các package trong AndroidX đều tồn tại trong một namespace nhất quán, bắt đầu bằng chuỗi androidx. Các package của Support Library được ánh xạ vào trong các package của androix.* tương ứng.

2. Không giống như Support Library. AndroidX được maintain và cập nhật riêng. android.* package sử dụng nghiêm ngặt Semantic Vesioning bắt đầu với version 1.0.0 . Bạn có thể hiểu Semantic Vesioning là một cái để giải quyết vấn đề khi các thứ phục thuộc lẫn nhau trong một dự án lớn:

***In the world of software management there exists a dreaded place called “dependency hell.” The bigger your system grows and the more packages you integrate into your software, the more likely you are to find yourself, one day, in this pit of despair.***

Bạn có thể cập nhật độc lập thư viện AndroidX trong các dự án của mình.

3. Mọi thứ phát triển mới trong Support Library sẽ có trong AndroidX. Điều này bao gồm cả việc bảo trì các Support Library ban đầu và giới thiệu thêm thành phần Jetpack mới.
### 2. Sử dụng AndroidX.
***2.1 Khi tạo mới project***.

Nếu bạn muốn sử dụng AndroidX trong một project mới, bạn cần thiết lập SDK cho compiler time thành Android 9.0 (API level 28) hoặc cao hơn và đặt cả hai cờ Android Gradle plugin thành true trong file ***gradle.properties*** của bạn:

***android.useAndroidX***: khi set là true thì Android plugin sẽ sử dụng thư viện AndroidX thích hợp thay vì sử dụng Support Library. Nếu không chỉ định thì giá trị default là false.

***android.enableJetifier***: Khi set là true thì Android plugin tự động di chuyển các thư viện bên thứ 3 hiện có để dụng AndroidX bằng cách viết lại các file nhị phân của chúng. Mặc định cũng là cờ false
```java
android.useAndroidX=true
android.enableJetifier=true
```

***2.2 Di chuyển sang AndroidX từ project hiện có.***

Android ánh xạ các Support Library API vào ***androidx*** namespace. Chỉ tên của package và Maven artifact bị thay đổi, còn tên class, method và fied thì không.

Với Android Studio 3.2 hoặc cao hơn, bạn có thể nhanh chóng di chuyển project hiện có để sử dụng AndroidX bằng cách chọn ***Refactor > Migrate to AndroidX*** từ thanh menu

Nếu bạn có bất kì phục thuộc Maven nào chưa được di chuyển sang AndroidX namespace, hệ thống Android Studio cũng sẽ di chuyển những phụ thuộc đó khi bạn đặt 2 cờ thành true trong file ***gradle.properties*** của mình như trên mục 2.1.

Để chuyển dự án hiện tại không sử dụng bất kì thư viện bên thứ 3 nào có phụ thuộc cần chuyển đổi, bạn có thể đặt cờ cho android.useAndroidX là true, còn android.enableJetifier là false.

Bạn có thể tham khảo về bảng ánh xạ thư viện và các class từ phiên bản cũ sang Android:

*Artifact mappings:*
![](https://images.viblo.asia/434da7bb-6cbd-4e98-9bfd-7819f35c2ecd.png)

*Class mappings*:
![](https://images.viblo.asia/498b489a-61e8-495a-b631-10612e51a0b4.png)
### 3. Tài nguyên bổ sung
Các thành phần của Jetpack là một phần của thư viện AndroidX, nếu chưa rõ về Jetpack các bạn có thể đọc ở [trang chủ](https://developer.android.com/jetpack/).

Để biết thêm về cách tái cấu trúc từ Support Library sang AndroidX bạn cũng có thể theo dõi ở [blog](https://android-developers.googleblog.com/2018/05/hello-world-androidx.html) của google.
### 4. Tổng kết.
Qua bài viết mình đã giới thiệu về AndroidX, một thư viện vô cùng mới mẽ phải không nào. Cám ơn bạn đã theo dõi bài viết.
### 5. Tài liệu tham khảo.
https://developer.android.com