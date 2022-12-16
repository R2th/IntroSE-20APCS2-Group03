Google đã công bố Android Jetpack tại Google I / O 2018. Jetpack là tập hợp các component Android để giúp bạn dễ dàng phát triển các ứng dụng Android hơn. Các thành phần này giúp bạn tuân theo các thực tiễn tốt nhất, giải phóng bạn khỏi việc viết mã soạn sẵn và đơn giản hóa các tác vụ phức tạp, để bạn có thể tập trung viết code bạn quan tâm. Để giúp các nhà phát triển tìm hiểu cách tích hợp các thành phần Jetpack vào các ứng dụng của riêng họ, chúng tôi đã tạo ra Sunflower, một ứng dụng minh họa các thực tiễn tốt nhất về phát triển Android với Android Jetpack. Nếu bạn chưa quen với Jetpack, bạn nên kiểm tra nội dung Jetpack trên developer.android.com và xây dựng ứng dụng dựa trên Jetpack đơn giản đầu tiên của bạn trước khi tiếp tục.


#
#### Tổng quan 
####


Khi ứng dụng được khởi chạy lần đầu tiên, người dùng sẽ thấy màn hình "Khu vườn của tôi", lúc đầu trống.
![](https://images.viblo.asia/675e93e6-9a6c-410d-99e5-4ce1592339b2.png)

Hãy thêm một màn hình Plant! Điều hướng đến list plaint bằng cách nhấn vào menu hamburger và mở navigation drawer 

![](https://images.viblo.asia/ec7b6ead-bf94-487e-a558-45d6f0275679.png)

Mỗi một plaint được liên kết với một Grow Zone, cái mà được xác định theo vĩ độ và chỉ ra vùng phù hợp nhất để cây phát triển mạnh. Bạn có thể lọc danh sách các plant  bằng cách nhấn vào mục menu bộ lọc chọn Grow Zone. 

Chạm vào một plant cụ thể sẽ điều hướng đến màn hình PlantDetail.

![](https://images.viblo.asia/c233db2e-1587-4acf-9e37-d368098ad252.png)

Màn hình PlantDetail cho thấy tên, mô tả, nhu cầu tưới nước của plant và hình ảnh của plant. Người dùng có thể thêm cây vào khu vườn của họ từ màn hình này bằng cách nhấn vào nút FloatButton. Họ cũng có thể share plant thông qua menu option.

![](https://images.viblo.asia/a7d7b423-c6c8-4faa-8bec-2404ab019b83.png)

Màn hình "My Garden"  hiển thị các loại cây được thêm vào, cùng với ngày chúng được trồng và tưới nước lần cuối.

#
#### Using Jetpack components
####

Sunflower sử dụng nhiều thành phần Jetpack. Dưới đây là một cái nhìn ngắn gọn về cách mỗi thành phần đóng vai trò của nó:
* Sunflower được viết hoàn toàn bằng Kotlin, sử dụng Android KTX. Android KTX là một bộ tiện ích mở rộng Kotlin tối ưu hóa API nền tảng Jetpack và Android để có mã Kotlin ngắn gọn và thành ngữ hơn.
* Ứng dụng sử dụng một Activity duy nhất với nhiều Fragment. Chuyển tiếp giữa các fragment sử dụng Navigation component và transition animation.
* Các màn hình sử dụng fragment layout, được tạo bằng ConstraintLayout và Data Binding
* Lưu trữ dữ liệu trên thiết bị của List Plant và các mục trong vườn của tôi được quản lý với Room ở cấp cơ sở dữ liệu và được hiển thị trên giao diện người dùng thông qua ViewModels qua LiveData
* AppCompat được sử dụng để bảo vệ chức năng ứng dụng chính trên các phiên bản Android cũ hơn
* Các tác vụ nền được xử lý bởi WorkManager
* PlantDetail có thể được chia sẻ với các ứng dụng khác trên thiết bị hoặc chỉ cần sao chép vào clipboard
* Việc testing được thực hiện bằng cả kiểm tra JUnit cục bộ và kiểm tra giao diện người dùng Android Espresso

#
#### Future improvements
####
Sunflower hiện đang được phát hành dưới dạng alpha và đang trong quá trình phát triển mạnh mẽ, với các tính năng mới và tích hợp thành phần sâu hơn thường xuyên release. Một số cải tiến sắp tới bao gồm lọc list plant dựa trên vị trí của người dùng, di chuyển sang AndroidX và thông báo khi plant cần tưới nước

Trong các bài viết tiếp theo, chúng tôi sẽ khám phá bằng cách sử dụng các thành phần Jetpack khác trong Sunflower như navigation  và các task định kỳ, vì vậy hãy theo dõi. Cảm ơn vì đã đọc!

![](https://images.viblo.asia/50b6521e-551b-46d4-8842-9ea0a55c9a08.jpeg)

#
#### Continue Exploring
####

Kiểm tra mã cho Sunflower tại https://github.com/googlesamples/android-sunflower.

Tìm hiểu về [Jetpack](https://developer.android.com/jetpack/) và [xây dựng ứng dụng Jetpack đầu tiên của bạn](https://developer.android.com/jetpack/docs/getting-started).

#
#### Reference 
####

* [Medium](https://medium.com/androiddevelopers/introducing-android-sunflower-e421b43fe0c2)
* [Sunflower](https://github.com/googlesamples/android-sunflower)