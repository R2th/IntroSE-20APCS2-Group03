Trước khi đẩy app lên Store, chúng ta sẽ cần tạo App Launcher Icon (icon của ứng dụng trên máy của người dùng). App code bằng React Native sẽ có thể đẩy lên cả Google Play (Android) và App Store (iOS), do đó mình sẽ hướng dẫn cách tạo App Launcher Icon cho cả 2 hệ hiều hành trên.

## 1. App Launcher Icon cho iOS

### Bước 1

Đầu tiên chúng ta cần phải có 1 ảnh icon được thiết kế sẵn với kích thước 1024x1024 pixels (hoặc lớn hơn cũng được).

Tiếp đến các bạn có thể dùng tool [Icon Set Creator](https://apps.apple.com/us/app/icon-set-creator/id939343785?mt=12) (trên App Store) để tạo ra bộ icon với các kích thước khác nhau cho các loại thiết bị iOS.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qu184onv32_image.png)

*Kéo thả ảnh, chọn Platform và thư mục lưu ảnh là xong*

Hoặc các bạn có thể truy cập website [https://makeappicon.com](https://makeappicon.com), upload ảnh lên (JPG hoặc PNG) và nhập email để nhận bộ icon trên cả iOS lẫn Android.
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kc98h51hjo_image.png)

*Upload ảnh lên website*

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/65mw2ui15c_image.png)

*Xem preview Icon, nhập email để nhận bộ icon*

### Bước 2
Bật XCode lên, mở project React Native (file [project].xcworkspace trong thư mục ios).

Tìm đến thư mục **Images.xcassets**, sau đó kéo thả bộ icon đã được tạo từ bước 1 (thư mục **AppIcon.appiconset**) hoặc bấm vào biểu tượng dấu cộng ở góc dưới bên trái, chọn import.
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gqy2y2lb9c_image.png)

Xong, build lại app để thấy kết quả!


> 1 phút quảng cáo: Icon ở trên là mình tự chế cho app game [Master Mind X](https://play.google.com/store/apps/details?id=com.robinhuy.mastermindx) viết bằng React Native, anh chị em chơi thử rồi cho xin góp ý ở comment nhé, review ủng hộ 5 sao thì càng tốt :D

## 2. App Launcher Icon cho Android

### Bước 1
Làm tương tự như bên iOS, chúng ta cũng cần 1 ảnh icon với kích thước tối thiểu 1024x1024 pixels. Sau đó dùng trang web sau để tạo bộ icon: [Android Assets Studio](http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher)
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/vn29hcdkwo_image.png)

### Bước 2
Giải nén bộ icon vừa download về, trong đó có thư mục res chứa các thư mục dạng: mipmap-hdpi, mipmap-mdpi, mipmap-xhdpi, ..., trong mỗi thư mục lại chứa file **ic_launcher** (tên mặc định). Copy (ghi đè) toàn bộ vào trong thư mục **android > app > src > main > res**.

Chú ý là có nhiều thiết bị android sử dụng icon dạng hình tròn, nên chúng ta tạo thêm 1 bộ icon dạng tròn (Circle) và cũng copy như trên, tên icon mặc định sẽ là **ic_launcher_round**. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8lni8mi0wd_image.png)

*Tên icon đã được khai báo sẵn trong file AndroidManifest.xml*

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/2a8wp49lvf_image.png)

*Import Icons*

**Chú ý**: Theo khuyến nghị của Google thì nên thiết kế icon cho Android theo dạng hình vuông đầy đủ (không cần bo tròn), không đổ bóng, vì khi đẩy app lên Store thì Google sẽ tự áp dụng các kiểu hiệu ứng đó cho đồng nhất. Do đó với bộ icons hình vuông thì có thể dùng luôn bộ icon tạo từ trang [https://makeappicon.com](https://makeappicon.com/), còn nếu tạo từ trang [Android Assets Studio](http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher) thì bỏ hết cấu hình phần Effect (để None).

 

Tham khảo thêm: https://developer.android.com/google-play/resources/icon-design-specification