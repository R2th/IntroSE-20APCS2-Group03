# **R8**
* Kích thước APK là một yếu tố quan trọng đối với các developer cũng như user. Thu gọn code giúp giảm kích thước APK của bạn bằng cách loại bỏ code và resource không sử dụng.
* Google chuẩn bị release R8 ở phiên bản AS 3.4, vậy R8 là gì ?
> R8 does all of shrinking, desugaring and dexing in one step. When comparing to the current code shrinking solution, Proguard, R8 shrinks the code faster while improving the output size.
* Nôm na thì R8 là thế hệ tiếp theo của `Proguard`, R8 thực hiện tất cả các thao tác thu nhỏ, desugaring và dexing trong một bước. Khi so sánh với giải pháp thu hẹp mã hiện tại, Proguard, R8 thu nhỏ mã nhanh hơn trong khi cải thiện kích thước đầu ra.
* Biểu đồ so sánh giữa `Proguard` và `R8`

 ![](https://images.viblo.asia/47343bf4-0e14-4c2f-b07d-cddb2f4ee097.png)
 
 ![](https://images.viblo.asia/faba81cd-63d7-4eec-8087-73830b76f67e.png)
 
 ![](https://images.viblo.asia/99fe4485-4e36-4c60-b287-a725ac66130b.png)
 
#  **How to try it**
* Bản beta R8 có trên Android Studio 3.3, để sử dụng bạn hãy vào  project's gradle.properties file và thêm dòng sau :
 ```
android.enableR8=true
```
* Hoặc có thể sử dụng đầy đủ các tính năng của `R8` bằng cách sử dụng lệnh này :
```
android.enableR8.fullMode=true
```

* Từ AS 3.4 thì `R8` sẽ mặc định được thêm vào, hãy đón chờ nhé :D
* Cám ơn các bạn đã đọc bài của mình. 
* Nguồn tại [đây](https://android-developers.googleblog.com/2018/11/r8-new-code-shrinker-from-google-is.html)