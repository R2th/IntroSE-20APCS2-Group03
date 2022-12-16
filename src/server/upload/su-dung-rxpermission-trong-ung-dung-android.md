**Giới thiệu**

Chào mọi người, ở bài viết này mình muốn trình bày về việc sử dụng runtime permission và RxPermission trong ứng dụng android. 

Dành cho những ai không biết thì runtime permission là một khái niệm không phải là mới xuất hiện từ API 23(Android M). Với các phiên bản cũ việc xin quyền(chụp ảnh, cung cấp location, gọi điện,...) được thực hiện đơn giản qua khai báo trong file AndroidManifest.
Nhưng với các phiên bản từ API 23 trở lên việc xin quyền vì lý do an toàn cho người sử dụng thì ngoài việc khai báo trong file AndroidManifest ra thì chúng ta cần xin cấp quyền ngay tại thời điểm cần sử dụng quyền nào đó. 

Chắc hẳn mọi người tại thời điểm này không còn lạ gì với RxJava, một thư viện mã nguồn mở implement ReactiveX trên Java vì rất nhiều những lợi điểm của mình mà RxJava đang ngày càng trở lên phổ biến. 
Vậy việc xin cấp quyền khi sử dụng RxJava trong ứng dụng như thế nào? Có một cách hay hơn thông thường đó là sử dụng RxPermission.

Ở bài viết này mình xin trình bày về việc sử dụng RxPermission để xin cấp quyền kết hợp cùng RxJava

# 1. Xử lý runtime permission thông thường 
Để thực hiện runtime permission thì thông thường chúng ta cần quan tâm 3 method cơ bản :
1. checkSelfPermission(Permission) để check xem quyền đã được cấp hay chưa
2. requestPermissions(String [] permissions, int requestCode) nếu không có quyền thì yêu cầu cấp quyền
3.  onRequestPermissionsResult(int premsRequestCode, String [] permissions, int [] grantResults)  kiểm tra kết quả xem liệu quyền đã được cấp hay chưa 

```
 if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                //Location Permission already granted or not
                captureImage();
            } else {
                //Request Location Permission
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.CAMERA};
            }
        } else {
            // not required any runtime permission for below M
            captureImage();
        }
```
Bên trên các bạn có thể thấy follow xử lý sẽ là xin cấp quyền với SDK>=23 . Còn dưới 23 sẽ thực hiện gọi hàm bình thường.

# 2. Sử dụng RxPermission
Để sử dụng RxPermission chúng ta cần minSdkVersion>=11

- Khai báo trong file gradle 

```
dependencies {
    compile 'com.tbruyelle.rxpermissions2:rxpermissions:0.9.5@aar'
}
```

- Sau khi đã import thư viện thêm khai báo vào Activity.onCreate, hoặc View.onFinishInflate lưu ý tránh khởi tạo ở onResume tránh việc khởi tạo lại nhiều lần.

RxPermissions rxPermissions = new RxPermissions(this); 

- Tiếp đến bạn thêm phần xử lý chính của việc xin quyền. 

```
rxPermissions
    .request(Manifest.permission.CAMERA,
             Manifest.permission.READ_PHONE_STATE)
    .subscribe(granted -> {
        if (granted) {
           // Tất cả quyền đã cấp
        } else {
           // Ít nhất 1 quyền đã bị từ chối
        }
    });
```
    
   Ở đây trong phần request bạn có thể lựa chọn 1 hay nhiều quyền tùy ý. Thật gọn nhẹ so với cách dùng xin runtime permission bình thường phải không?
   

# 3. Tại sao nên dùng RxPermission
- Không còn lo lắng về framework version. Nếu sdk là những phiên bản trước android M, RxPermission sẽ tự động nhận diện và cấp quyền trực tiếp.

- Ngăn bạn phân mảnh code của bạn giữa yêu cầu cấp quyền và xử lý kết quả. Hiện tại không có thư viện này, bạn phải yêu cầu quyền ở một nơi và xử lý kết quả trong Activity.onRequestPermissionsResult().

- Tất cả những gì RX cung cấp về transformation, filter, chaining bạn đều có thể sử dụng cùng với thư viện này.


Như vậy là mình đã trình bày xong bài viết về RxPermission trong ứng dụng Android. Hi vọng qua bài viết các bạn có thể biết về RxPermission và sử dụng khi cần thiết. 
Nguồn: https://github.com/tbruyelle/RxPermissions, . Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.