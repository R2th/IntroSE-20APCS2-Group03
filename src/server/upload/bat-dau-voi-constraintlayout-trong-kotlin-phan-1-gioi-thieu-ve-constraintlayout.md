## **1) Giới thiệu**
Đây là phần đầu tiên mình giới thiệu cho các bạn trong bộ 5 phần. ở phần này, chúng ta sẽ thấy được bố cục gần đây, được phát hành trong Android là Constraintlayout. Chúng ta sẽ cùng xây dựng phân tích trong phần layout này, cách thức làm việc và cách tạo bố cục phức tạp trong phần cuối cùng.
Đối với phần đầu tiên này. Tuy nhiên, chúng ta sẽ thấy được những đặc điểm và những vấn đề để khắc phục trong layout. Chúng ta sẽ cài đặt một dự án android. Nào chúng ta cùng bắt đầu.**
## 2) Điều kiện cần trước tiên
Khi bạn theo dõi toàn bộ series, bạn cần có những điều kiện cần:
* Android studio (v3.0 hoặc cao hơn) được cài đặt trong máy của bạn. *https://developer.android.com/studio/*
* Khả năng điều hướng tới IDE Android Studio.
* Một số hiểu biết về Android, bố cục của layout.
Nếu bạn có đủ những điều kiện này, chúng ta bắt đầu nào.
## 3) Sự ra đời của ConstraintLayout
ConstraintLayout là layout mới được phát triển hỗ trợ trong Android, được xây dựng linh hoạt và hiệu quả. Không giống như những layout khác, nó không được đóng gói vào thư viện hỗ trợ. Điều này có nghĩa nó sẽ được phát hành thường xuyên, chuyển đổi dễ dàng, mà không gây ảnh hưởng tới Framework chính của Android.
Nó được giới thiệu vào tháng 5/2016 trong sự kiện Google I/O {@embed: https://www.youtube.com/watch?v=sO9aX87hq9c}
Nó trở thành layout lợi thế cao, có performance tốt hơn, và linh hoạt hơn so với layout khác. Layout tương thích với API 9 (Android 2.3).
Dựa trên ràng buộc mà bạn đặt ra, nó sử dụng thuật toán cassowary phổ biến để biết cách giải quyết phương trình (định vị ràng buộc của nó). Thuật toán này sử dụng trong ác nền tảng phổ biển khác giống như AutoLayout trong phát triển IOS. Các phương trình được xác định và trả về vị trí kích thước trong layout.
ConstraintLayout rất cần thiết để xây dựng bố cục phức tạp. Nó có đặc điểm độc đáo của riêng nó. Một số trong đó có thể sử dụng để xây dựng bố cục phức tạp. Tuy nhiên nó có những điểm chưa hoàn chỉnh, do đó cần phải giới thiệu những layout mới.
Những layout cũ hơn có quy tắc xu hướng quá cứng nhắc. Do đó, xu hướng bố trí phải trở lên tốt hơn. Chẳng hạn, LinearLayout chỉ cho phép đặt các views, theo chiều ngang hoặc dọc. FrameLayout đặt các view chồng lên nhau. RelativeLayout đặt các view tương đối với nhau.
## 4) Những điều bất cập layout khác.
Một trong những điểm bất cập chính trong các Layout khác là nhiều chế độ phân cấp. Một hệ thống phân cấp càng nhiều sẽ phát sinh nhiều vấn đề.
Đây là chế độ phân cấp của LinearLayout:
 ```
  <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout>
       <LinearLayout>
           <LinearLayout>
             <TextView></TextView>       
           </LinearLayout>
           <ImageView></ImageView>
       </LinearLayout>
       <TextView></TextView>
       <LinearLayout>
           <Button></Button>
       </LinearLayout>
    </LinearLayout>
```
Ở trong mẫu trên, chúng ta có bố cục layout cha LinearLayout chứa các Layout con khác, TextView, Button... Nó chứa quá nhiều chế độ phân cấp.
Constraintlayout có cách tiếp cận tốt hơn. Nó cung cấp một chế độ phân cấp tốt hơn.
Dưới đây ConstraintLayout được chuyển đổi, chúng ta sẽ thấy chúng tương tự nhau.
 ```
 <?xml version="1.0" encoding="utf-8"?>
    <ConstraintLayout>
       <TextView></TextView>
       <ImageView></ImageView>
       <TextView></TextView>
       <Button></Button>
    </ConstraintLayout>
```
Bố cục phân cấp ở đây 1 cấp có nghĩa sẽ mất một thời gian ngắn hơn để xây dựng bố cục, do đó, hiệu suất được cải thiện so với trước đây. Đây là lý do chính cho sự ra đời của ConstraintLayout.
Layout là chìa khóa cho người dùng trải nghiệm tổng thể của một ứng dụng, do đó nó phải được tối ưu hóa. 
## 5) Một số tính năng thú vị khác của ConstraintLayout
ConstrainLayout ngoài cho hiệu suất tốt hơn và cung cấp bố cục có thể mở rộng phù hợp với nhiều màn hình, còn có tính năng thú vị được nhúng trong bố cục.
* Có khả năng xử lý views GONE tốt. Khi mà GONE bị mất, nó sẽ tương thích sắp xếp lại bố cục.
ConstraintLayout dùng dimenstion zero để đặt cho views, để chúng có thể tương thích không bị biến dạng.
* Constraintlayout giới thiệu những thuộc tính mới gọi là bias. Bias là tỉ lệ ràng buộc liên kết giữa các view. Nó giống với thuộc tính weight trong LinearLayout. Chúng ta sẽ đi sâu hơn vào phần tiếp theo của loạt bài. Theo mặc định, bias được để là 0.5, nó được sử dụng cho các phần tử bị ràng buộc ở giữa.
* Layout cũng có một tính năng khác gọi là chains, khá giống với bias, ConstraintLayout nó có sức mạnh của Linearlayout và RelativeLayout.
* ConstraintLayout cũng có khả năng animations. Gần đây ConstraintLayout có phát hành thêm có tên là MotionLayout, điều này sẽ giúp ích cho animation. Chúng ta sẽ xem xét nó trong bốn loạt bài sau.
## 6) Cài đặt dự án Android
Chúng ta cần cài đặt, tạo mới dự án Android
![](https://images.viblo.asia/95d5b95b-993f-4396-b3e7-0b5470d85263.png)
Chọn Start a new Android Studio project và chú ý phần cài đặt dự án của bạn. Như thường lệ, tên ứng dụng và tên package của bạn sẽ được yêu cầu, với SDK thấp nhất 19. Chọn Empty Activity và đợi android studio cài đặt dự án của bạn.
Kể từ Android studio 3.0. Constraintlayout xuất hiện mặc định khi bạn tạo dự án mới. Tuy nhiên nếu bạn không nhìn thấy nó, bạn có thể thêm nó theo hướng dẫn bên dưới.
Đảm bảo bạn có maven.google.com được khai áo trong tệp build.gradle.
```
buildscript {
        repositories {
            google()
        }
        [...]
    }
```
Sau đó thêm trong build.gradle của module.
  ```
  dependencies {
        [...]
        implementation 'com.android.support.constraint:constraint-layout:1.1.2'
    }
```
Sau đó đồng bộ lại gradle của bạn sau khi bạn thêm thư viện.
Bạn có thể thêm Constraintlayout vào file XML của bạn
 ```<?xml version="1.0" encoding="utf-8"?>

    <android.support.constraint.ConstraintLayout 
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent">

      <!-- Other views go here --!>

    </android.support.constraint.ConstraintLayout>
```
## 7) Phần kết luận
Trong phần mở đầu này, chúng ta đã biết được ConstraintLayout, sử dụng tốt hơn và hiệu quả hơn với những layout khác. Chúng ta học được cách đưa nó vào ứng dụng của mình. trong phần tiếp theo, chúng ta sẽ nghiên cứu sâu hơn về Constraintlayout.

Cảm ơn bạn đã theo dõi bài viết, mời bạn xem phần 2 của constraintLayout:
https://viblo.asia/p/bat-dau-voi-constraintlayout-trong-kotlin-phan-2-hieu-ve-constraints-bias-va-chains-gGJ59vvDKX2

*Tham khảo tại: https://pusher.com/tutorials/constraintlayout-kotlin-part-1*