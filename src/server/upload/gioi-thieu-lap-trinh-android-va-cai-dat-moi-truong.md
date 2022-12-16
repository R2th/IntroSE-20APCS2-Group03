## Giới thiệu

**Hệ điều hành Android** đang chiếm hơn 80% thị trường thiết bị di động hiện đại ngày nay. Nhu cầu sử dụng ứng dụng di động cũng ngày càng cao. Nhu cầu việc làm về lập trình trên hệ điều hành mobile phổ biến nhất thế giới này cũng vì thế mà tăng mạnh do tính mở và dễ tiếp cận của nó.

Loạt bài viết sẽ hướng dẫn các bạn các kiến thức cơ bản trong LẬP TRÌNH ANDROID. Từ Activity cho đến database Sqlite, xử lý đa phương tiện,..v…v… để các bạn có thể tự tạo ứng dụng Android của mình cho sở thích hoặc công việc.

## Nội dung

Để có thể bắt đầu làm việc với Android, bạn cần có những kiến thức cơ bản về Java và lập trình hướng đối tượng (OOP – Object Oriented Programming). Cụ thể là:

* Java là gì, hoạt động ra sao, JVM là gì.
* Biến và kiểu dữ liệu trong Java.
* Toán tử trong Java.
* Câu điều kiện trong Java.
* Cấu trúc cơ bản của một vòng lặp.

Trong bài học này, chúng ta sẽ cùng tìm hiểu các vấn đề:

* Tổng quan về hệ điều hành Android.
* Các bước cài đặt môi trường làm việc với Android Studio, JDK và Android SDK.

## Tổng quan về hệ điều hành Android

**Android** là hệ điều hành mã nguồn mở, dựa trên Linux Kernel, dành cho các thiết bị di động nói chung (điện thoại, máy tính bảng, đồng hồ thông minh, máy nghe nhạc,…).

Có nghĩa là Android không chỉ giới hạn trong phạm vi một hệ điều hành cho điện thoại! Nó có thể được nhà sản xuất cài đặt lên đồng hồ, máy nghe nhạc, thiết bị định vị GPS, thậm chí là ô tô (các thiết bị Android Auto).

Android cũng không phải là một thiết bị hay sản phẩm cụ thể, nó là một hệ điều hành dựa trên Linux, nguồn mở, linh hoạt.

Hiện Android là một thương hiệu của Google. Có khả năng tùy biến rất cao và có thể chạy trên nhiều thiết bị, nhiều kiến trúc vi xử lý (ARM / x86). Tính đến nay, Android đã có các phiên bản (kèm tên mã) lần lượt là:

* Android 1.5 Cupcake
* Android 1.6 Donut
* Android 2.1 Eclair
* Android 2.2 Froyo
* Android 2.3 Gingerbread
* Android 3.2 Honeycomb – Phiên bản Android đầu tiên được thiết kế cho máy tính bảng.
* Android 4.0 Ice Cream Sandwich
* Android 4.1 Jelly Bean
* Android 4.2 Jelly Bean
* Android 4.3 Jelly Bean
* Android 4.4 KitKat
* Android 5.0 Lollipop
* Android 6.0 Marshmallow
* Android 7.0 Nougat

Về kiến trúc của hệ điều hành Android, chúng ta có thể xem qua sơ đồ sau:

![](https://images.viblo.asia/e35f2ed2-d017-4aab-b2fc-a4f6b5acb4df.png)

Thoạt nhìn có vẻ rối rắm, nhưng các bạn chỉ cần để ý đến các tầng màu sắc. Mình tóm tắt về các tầng của kiến trúc này như sau (từ trên xuống nhé):

*  Tầng Applications: Là tầng chứa các ứng dụng Danh bạ, Gọi điện, Trình duyệt, Nghe nhạc,… các ứng dụng này thường mua máy về chúng ta đã có sẵn rồi.
*  Tầng Framework: Là tầng chứa các API để làm việc với hệ điều hành như lấy thông tin danh bạ, quản lý các Activity (Activity là gì thì giờ chúng ta chưa cần quan tâm, các bài sau sẽ giải thích kĩ), quản lý địa điểm, quản lý các View (cũng chưa cần quan tâm).
*  Tầng Libraries: Chứa các thư viện, API gần như là cốt lõi của Android, bao gồm bộ quản lý bề mặt cảm ứng (Surface Manager), OpenGL (phục vụ cho việc dựng đồ họa phức tạp),…
*  Tầng Android Runtime: Chứa các thư viện lõi của Android và máy ảo Dalvik Virtual Machine (từ Android 4 trở lên chúng ta có thêm máy ảo ART).
*  Tầng Kernel: Là nhân lõi của hệ điều hành, chứa các tập lệnh, driver giao tiếp giữa phần cứng và phần mềm của Android.

Trong quá trình làm việc, chúng ta sẽ gần như chỉ làm việc với tầng xanh lam (Applications và Application Framework) và xanh lá (Libraries). Chương trình Android được viết bằng ngôn ngữ Java và được máy ảo DVM / ART trong mỗi thiết bị Android biên dịch ra mã máy.

## Giới thiệu về Android Studio và Android SDK

Tháng 5 năm 2013, Google công bố Android Studio, một môi trường phát triển ứng dụng tích hợp (IDE) dành riêng cho Android, mã nguồn mở, dựa trên IDE Java IntelliJ của hãng JetBrains (đối thủ với Eclipse và Netbeans, vốn khá quen thuộc với dân lập trình Java).

 Android Studio chạy trên Windows, Mac và Linux, nhằm thay thế cho Eclipse Android Development Tool (ADT) vốn được sử dụng làm IDE chính trong các năm trước đó.
 
###  Một số tính năng nổi bật:

* Bộ công cụ build ứng dụng dựa trên Gradle (thay vì Maven).
* Chức năng dò và sửa lỗi nhanh, hướng Android.
* Công cụ chỉnh sửa màn hình dạng kéo thả tiện lợi.
* Các wizard tích hợp nhằm giúp lập trình viên tạo ứng dụng từ mẫu có sẵn.
* Tích hợp Google Cloud Platform, dễ dàng tích hợp với Google Cloud Messaging và App Engine của Google.

Giao diện màn hình đầu của Android Studio:

![](https://images.viblo.asia/7b9f62b0-842f-450d-9ae3-b12962109a20.png)

Và một project bình thường thì có dạng như thế này:

![](https://images.viblo.asia/645fb6f3-912d-4c30-a2dd-2363fcab2b1a.png)


Như các bạn thấy đó, có nhiều không gian cho việc chỉnh sửa code, quản lý file (cột trái). Các vùng khác chiếm chỗ hơn thì được thu hẹp lại sang 2 bên và có thể mở ra như ngăn kéo bằng cách click vào bất cứ khi nào.

Ngoài ra thì chúng ta còn có thể chỉnh màu sắc của IDE sang tông đen cho dịu mắt, và đổi màu chữ, đổi màu các cú pháp trong code cho dễ nhìn hơn.
 
 Và đi kèm với Android Studio là Android SDK. Nếu Android Studio là trình soạn thảo code (IDE) thì Android SDK là bộ tổng hợp các công cụ để build app, các bản mẫu máy ảo Android (sử dụng để test app) cần thiết để làm ra một ứng dụng Android hoàn chỉnh.

Nào, chúng ta cùng bắt tay vào thiết lập môi trường để code nhé !

## Cài đặt môi trường làm việc

Bước 1: Chúng ta sẽ cần có JDK (Java Development Kit) trước khi làm bất cứ việc gì với Android trên máy. Truy cập vào link:

[](https://link.sun-asterisk.vn/8dasU7)

Và click vào một trong 2 nút khoanh đỏ:

![](https://images.viblo.asia/84a728e6-c5f6-476f-95ad-c94957ff3b61.png)

Chọn Accept License Agreement và chọn phiên bản Java muốn cài đặt (Windows x64). 
Tải về xong thì cài đặt như bình thường. Các thành phần của JDK đã có đầy đủ trong bộ cài hết (bao gồm cả source code và JRE):

![](https://images.viblo.asia/afd6e375-63c5-4e55-ba28-9038a4f89ef5.png)

```
Hãy chú ý phần bôi đỏ. Bạn hãy ghi nhớ đường dẫn này.
```

Bước 2: Với đường dẫn bôi đỏ ở trên. Các bạn chuột phải vào biểu tượng My Computer (hoặc với Windows 10 là This PC) chọn Properties, hoặc chuột phải vào biểu tượng Start của Windows, chọn System.

![](https://images.viblo.asia/c0deafe0-6b80-4c3a-80db-55d9ba2a5ac6.png)

* Chọn Advanced System Settings:

![](https://images.viblo.asia/791b2df4-a794-4fcc-838d-8dfe536858cb.png)

* Ở tab Advanced, chọn Environment Variables > New… (có 2 nút New, nút nào cũng được nhưng tốt nhất là dùng nút New… ở dưới) > nhập vào New user variable như hình với:
    --> Variable value là đường dẫn JDK như bôi đỏ đã ghi nhớ ở bước trước.
    
![](https://images.viblo.asia/005ed434-c5af-4796-9b0b-1136400dc4b6.png)

* Sau đó nhấn OK hết ở cả 3 hộp thoại. Vậy là ta đã chuẩn bị xong cho JDK.

Bước 3: Chuẩn bị Android Studio và Android SDK.

Truy cập vào trang:

https://www.howkteam.vn/redirect?Id=xQ4nO%2fJ3pWli0782PgH4V%2bc%2b43yAms8v3c2J2eu9lYv649OtrvR0SFAZ5sQ0FR2sYgJHMshFWO7H9CTDVzHmRw%3d%3d

![](https://images.viblo.asia/385acd75-beeb-4b04-a043-38473b5cc1f1.png)

* Và nhấn nút như hình trên để tải về.
* Ở thời điểm viết bài, phiên bản 2.1 là phiên bản stable (ổn định) mới nhất. Sau khi tải về thì chỉ cần cài đặt file .exe đã bao gồm cả Android Studio IDE và Android SDK.

Sau khi cài đặt thì chỉ việc sử dụng bằng cách click vào biểu tượng Android Studio ngoài desktop. Tuy nhiên chúng ta có một lựa chọn khác là cài đặt riêng từng thành phần: Android Studio IDE và Android SDK như bước 4 dưới đây.

Bước 4 (Tùy chọn): Nếu bạn không thích cài theo bộ exe có sẵn thì bạn có thể cài đặt từng thành phần lẻ của bộ phát triển Android Studio. Cũng ở địa chỉ trên, kéo xuống dưới đáy trang ta sẽ thấy tùy chọn như sau.

![](https://images.viblo.asia/7673f025-3ae1-434c-acd0-65f01b5d327f.png)

* Màu cam: Bộ Android Studio lẻ / Màu xanh: Bộ Android SDK lẻ.
* Chúng ta cần download cả 2 bộ này về và giải nén ra.
* Sau khi tải về và giải nén gói .zip của Android Studio , vào thư mục \android-studio\bin và chạy file studio.exe (hoặc studio64.exe, nếu máy bạn có hệ điều hành 64-bit).
* Android Studio sẽ yêu cầu chúng ta chỉ định đường dẫn đến thư mục chứa Android SDK (giải nén ra từ file .zip ở phần khoanh màu xanh lá ở trên. Chúng ta chỉ cần nhập vào theo Wizard:

![](https://images.viblo.asia/f4af1a7f-af12-4b10-b234-32758d360b5f.png)

Nếu sau này trong quá trình sử dụng, hệ thống không tìm thấy đường dẫn đến Android SDK thì chúng ta có thể tinh chỉnh lại bất cứ khi nào bằng cách vào Configure > Settings:

![](https://images.viblo.asia/c7e785b2-9e54-455c-8e0a-06b4eda7b310.png)

* Và chọn Appearance & Behavior > System Settings > Android SDK > Edit:

![](https://images.viblo.asia/ba621688-5fd1-4c60-a127-1079ea484c3c.png)

Lỗi thường gặp trong quá trình cài đặt môi trường là các bạn đã đặt sai đường dẫn JAVA_HOME và IDE sẽ hiện thông báo lỗi dạng như:

```
Failed to complete Gradle execution.
Cause: Supplied javaHome is not a valid folder. You supplied: C:\Program Files\Java\jdk1.7.0_45
```

Để giải quyết lỗi này, các bạn hãy quay lại Bước 2 và để ý kỹ phần khoanh đỏ ở Bước 1 rồi nhập lại đường dẫn cho đúng.

## Kết luận

Qua bài này các bạn đã hiểu được phần nào về lập trình Android cũng như tiềm năng phát triển của nó.

Ở phần sau, chúng ta sẽ tìm hiểu về CÁC CHỨC NĂNG CƠ BẢN CỦA ANDROID STUDIO.
 
Cảm ơn các bạn đã theo dõi bài viết. Hãy để lại bình luận hoặc góp ý của mình để phát triển bài viết tốt hơn. Đừng quên “Luyện tập – Thử thách – Không ngại khó”.

> Nguồn: HowKTeam.