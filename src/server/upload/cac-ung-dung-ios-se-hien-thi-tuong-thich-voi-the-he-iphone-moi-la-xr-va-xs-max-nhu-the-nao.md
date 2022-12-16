# Lời mở đầu
Tháng chín vừa qua, tại sự kiện WWDC được tổ chức thường niên, Apple đã ra mắt ba mẫu iPhone mới với tên gọi: iPhone  XS, iPhone XS Max và iPhone XR. Trong đó mẫu iPhone XS hoàn toàn giống mẫu iPhone X được ra mắt năm ngoài cả về kích thước màn hình lẫn hành vi người dùng (behavior). 

Nếu ứng dụng của bạn đã hỗ trợ iPhone X thì nó hoàn toàn có thể hoạt động và hiển thị một cách tương tự trên iPhone XS. Vì vậy trong bài viết này tôi xin phép không đề cập đến iPhone XS mà chỉ đề cập đến các mẫu iPhone mới với màn hình thiết kế có chút khác biệt, nơi mà một số điều thú vị sẽ diễn ra. 

iPhone XS Max có kích thước màn hình 6,5 inches và iPhone X với kích thước màn hình 5,8 inches, có kích thước tổng thể tương đương với hai chiếc iPhone đời cũ hơn là iPhone Plus 5,5 inches và iPhone 4,7 inches, nhưng kích thước màn hình lại lớn hơn nhờ thiết kế tràn viền.

iPhone XS Max có cùng chiều rộng màn hình tính theo số điểm ảnh so với iPhone Plus nhưng chiều cao lại lớn hơn với tỉ lệ màn hìinh 9 : 19,5. iPhone XS Max có kích thước màn hình 414 x 896 point (tương đương với 1242 x 2688 pixel)

iPhone XR chính xác được gọi là phiên bản 2x của iPhone XS Max sử dụng màn hình LCD với mật độ điểm ảnh tương đương với iPhone 6 / 6S / 7 / 8. iPhone XR có kích thước màn hình 414 x 896 (828 x 1792 pixel).

Làm thế nào để iPhone XS Max và iPhone XR hiển thị các ứng dụng với màn hình "ngoại cỡ" của mình? Giống như năm ngoái, điều đó phụ thuộc vào phiên bản Xcode mà chúng ta sử dụng để build ứng dụng. Chúng ta sẽ cùng tìm hiểu xem điều gì xảy ra trên các màn hình với kích thước mới này:

# iPhone X
Sau đây là cách màn ứng dụng được build bằng Xcode 9/ iOS 11 hiển thị trên  iPhone X:

![](https://images.viblo.asia/c7f2c589-50ce-48f3-a688-ad677bc9e1a8.png)

Với kích thước màn hình 375 x 812 và bốn góc bo tròn, Apple đã rất khéo léo khi thiết kế thanh Navigation Bar lớn hơn (được gọi là [NavigationBar Large Title](https://viblo.asia/p/ios-11-safe-area-layout-guide-va-large-titles-4dbZNgdvlYM)) và thanh công cụ kích thước cũng lớn tương đương để đảm bảo cho vùng hiển thị không bao giờ bị che khuất bởi "tai thỏ" và thanh điều hướng cạnh dưới màn hình.

Ở trạng thái Landscape, thanh trạng thái được ẩn đi và các thanh công cụ được giảm độ cao:

![](https://images.viblo.asia/10c42838-af17-43b8-9d75-fd8c6c415742.png)

# Xcode 9 / iOS 11
Các ứng dụng được xây dựng trên Xcode 9, khi mà iPhone XS Max và iPhone XR chưa được ra đời, vì vậy cách hiển thị  của chúng trên màn hình của các thiết bị này đơn giản chỉ là được phóng to lên để lấp đầy màn hình.

![](https://images.viblo.asia/8afdd224-a46a-4f00-a510-5b60eda3c964.png)
*Ứng dụng build bằng Xcode 9/ iOS 11 chạy trên Simulator XS Max iOS 12, chế độ Portrait*

![](https://images.viblo.asia/e50e693e-bd58-4457-85ce-1e9eb8b04e21.png)
*Ứng dụng build bằng Xcode 9/ iOS 11 chạy trên Simulator XS Max iOS 12, chế độ Landscape*

Việc thu phóng này sẽ dẫn đến việc app hiển thị hơi mờ nhòe một chút, nếu tinh mắt sẽ nhận ra, tuy nhiên điều này không ảnh hưởng mấy đến trải nghiệm người dùng. Nhờ khả năng tương thích ngược của Apple mà iPhone XS Max hiển thị gần như giống với trên iPhone X đối với app được build bằng Xcode 9 iOS 11.

# Xcode 10 / iOS 12
Khi cùng là ứng dụng này được build trên Xcode 10 iOS 12 , nó sẽ được hiển thị một cách tự nhiên nhất, đúng với bản chất của màn hình iPhone XS Max và iPhone XR.

![](https://images.viblo.asia/073b283c-bbcd-45d2-95fd-2496d5b5d887.png)
*Ứng dụng build bằng Xcode 10/ iOS 12 chạy trên Simulator XS Max iOS 12, chế độ Portrait*

Như ta thấy, kích thước màn hình đã hiển thị đúng so với độ phân giải thực của iPhone XS Max là 414 x 896. Layout margin đã tăng từ 16 points lên 20 points để phù hợp hơn với iPhone có màn hình lớn. 

Ở chế độ xoay ngang thì mọi thứ càng thú vị hơn:

![](https://images.viblo.asia/0fb94b72-a723-4e0d-993c-39f06787ce59.png)
*Ứng dụng build bằng Xcode 10/ iOS 12 chạy trên Simulator XS Max iOS 12, chế độ Landscape*

Các thanh Navigation bar và Tool bar không bị giảm chiều cao nhiều (so với chế độ Portrait) như trên iPhone X. Lưu ý rằng ở chế độ Landscape, iPhone XS Max có kích thước chiều ngang là Regular, tương tự như trên các dòng iPhone Plus trước đó. Tuy nhiên vùng Readable content lại có độ rộng khác so với vùng Layout margin, khác hoàn toàn so với dòng iPhone Plus.

Ta có thể thấy sự khác biệt tiếp theo trong việc hiển thị ở chế độ Landscape Split view, iPhone 8 Plus iOs 11 sẽ hiển thị như sau:

![](https://images.viblo.asia/7b18ac94-9696-47cf-a1c5-eedd76bba6f0.png)
*Ứng dụng build bằng Xcode 9/ iOS 11 chạy trên Simulator iPhone 8Plus iOS 11, chế độ Landscape split view*

Còn trên iPhone XS Max, màn hình Detail View vẫn được hiển thị với kích thước ngang kéo dài toàn màn hình giống như chế độ Landscape single View, còn màn hình Master View được hiển thị dạng slide over và có kích thước lớn hơn đáng kể so với iPhone 8 Plus.

![](https://images.viblo.asia/276cc9b9-689f-45e3-9b3e-254744557039.png)
*Ứng dụng build bằng Xcode 10/ iOS 12 chạy trên Simulator XS Max iOS 12, chế độ Landscape*

# Tổng Kết
Như ta đã thấy, iPhone XS Max, iPhone XR hoàn toàn có thể tương thích ngược với các ứng dụng được build trên Xcode 9, nơi mà chưa hỗ trợ các loại thiết bị này. Các ứng dụng sẽ được tự động thu phóng sử dụng Auto layout để lấp đầy màn hình, tuy nhiên chỉ khi build bằng Xcode 12 mới cho ra kích thước thực của màn hình trên các thiết bị mới.

Tôi sẽ có một bài viết tương tự về các mà các ứng dụng Apple watch hiển thị trên thiết bị Apple watch series 4, đón đọc nhé.
Đừng quên để lại bình luận / chia sẻ / ý kiến đóng góp của mình, have fun, cheers.