# **Giới Thiệu**
- Từ phiên bản Android 6.0 sẽ được tích hợp chức năng kiểm soát quyền truy cập cho các ứng dụng, quyền truy cập được gom thành các nhóm (permission group), với tính năng mới này người dùng có thể thay đổi quyền truy cập của ứng dụng bất cứ khi nào từ menu Settings bên trong Hệ điều hành. Vì vậy các ứng dụng trên Android M cần phải check permission khi chạy để tránh trường hợp ứng dụng bị force close do thiếu một số permission cần thiết bị tắt bởi người dùng.
- Rxpermission ra đời để chúng đơn giản trong việc request cái permission, nó được làm đựa trên RxJava, một library mà bắt buộc các dev phải biết.
# **Lợi ích của RxPermission**
- Không còn lo lắng về framework version. Nếu sdk là những phiên bản trước android M, RxPermission sẽ tự động nhận diện và cấp quyền trực tiếp.
- Tất cả những gì RX cung cấp về transformation, filter, chaining bạn đều có thể sử dụng cùng với thư viện này.
# **Cài đặt**
- Khai báo trong file gradle(app)
```
dependencies {
...
    implementation 'com.github.tbruyelle:rxpermissions:0.10.2'
}
```
- Khai báo trong file gradle(project)
```
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```
# **Khởi tạo đối tượng**
- Chỉ cần khởi tạo như mọi biến bình thường
```
val rxPermissions = RxPermissions(this);
```
# **Sử dụng**
- Ví dụ khi chúng ta cần người dùng cấp quyền `camera`
```
// Must be done during an initialization phase like onCreate
rxPermissions
    .request(Manifest.permission.CAMERA)
    .subscribe(granted -> {
        if (granted) { // Always true pre-M
           // I can control the camera now
        } else {
           // Oups permission denied
        }
    });
```
- Nếu bạn muốn cấp 2 quyền thì sẽ làm như thế này 
```
rxPermissions
    .request(Manifest.permission.CAMERA,
             Manifest.permission.READ_PHONE_STATE)
    .subscribe(granted -> {
        if (granted) {
           // All requested permissions are granted
        } else {
           // At least one permission is denied
        }
    });
```

![](https://images.viblo.asia/622603fa-f94a-4620-b620-9bc541a5ad0b.png)
# **Kết thúc**
- Cảm ơn các bạn đã đọc bài viết của mình.
- Các bạn có thể xem rõ hơn về library này tại [đây](https://github.com/tbruyelle/RxPermissions)