# 1. Introduction
### 1. Permission 
- Để bảo vệ quyền riêng tư của người dùng, Android đưa  ra khái niệm Permission. Để ứng dụng của bạn có thể dùng được tài nguyên của hệ thống như là camera, storage, wiffi, .. thì ứng dụng của bạn buộc phải được sự cho phép của người dùng mới có thể sử dụng.
- Các phiên bản Android dưới 23, khi cài đặt ứng dụng bạn phải cấp tất cả các quyền mà ứng dụng yêu cầu. Nếu user cấp quyền cho ứng dụng, nó sẽ hoạt động bình thường, nếu không thì bạn không thể các chức năng mà yêu cầu quyền đó. Ví dụ: Ứng dụng cần cấp quyền wiffi và camera, nhưng bạn chỉ cấp mỗi quyền wiffi, vậy bạn không thể sử dụng tính năng chụp ảnh của app.
- Từ phiên bản 23 trở đi, Android đưa ra cụm từ mới đó là* "Runtime Permission"* . Với tính năng này, ứng dụng của bạn không cần phải hỏi permission dồn dập ngay từ lúc cài app. Mà chỉ khi nào cần dùng đến nó thì app mới request. Để tránh trường hợp, tính năng đó user ít sử dụng nhưng cần cấp quyền thì chỉ khi user dùng nó thì mới cần cấp quyền => đỡ spam từ đầu. 
=> Có nhiều cách để implement permission trong Android, một trong số đó là sử dụng thư viện EasyPermissions.

### 2. EasyPermissions
> EasyPermissions is a wrapper library to simplify basic system permissions logic when targeting Android M or higher.

- Đúng như cái tên của nó, EasyPermission giúp chúng ta dễ dàng implement các permission trong ứng dụng, bất kể trong quá trình cấp quyền bạn có thực hiện các thao tác gì. Việc cấp quyền được mô tả theo sơ đồ dưới đây: 

![](https://images.viblo.asia/ba7c3ea9-e4d3-4967-826c-1d84c5a31033.png)


Chúng ta cùng đi tới cách sử dụng thư viện này nhé!

# 2. Usages
- Trước tiên, để sử dụng được thư viện thì các bạn hãy thêm vào file *build.gradle* nhá: 
```java
dependencies {
    // For developers using AndroidX in their applications
    implementation 'pub.devrel:easypermissions:3.0.0'
 
    // For developers using the Android Support Library
    implementation 'pub.devrel:easypermissions:2.0.1'
}
```

- Để sử dụng EasyPermissions, bạn phải có Activity hay Fragment override hàm *onRequestPermissionsResult*:

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        // Forward results to EasyPermissions
        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }
}
```

- Ví dụ mình request hai quyền đó là **CAMERA** và **ACCESS_FINE_LOCATION**. Có một số điều cần lưu ý như sau: 
 + Sử dụng hàm EasyPermissions#*hasPermissions*(...) để check xem app đã yêu cầu quyền chưa. Bạn có thể truyền bao nhiêu permission làm tham số cùng được. Ví dụ: 

```java
val permissions = arrayOf(
                Manifest.permission.CAMERA,
                Manifest.permission.ACCESS_FINE_LOCATION
        )
        if (EasyPermissions.hasPermissions(this, *permissions)) {
            // do something
        }
```

+ Request permission với hàm EasyPermissions#*requestPermissions*. Phương thức này sẽ request tới các quyền hệ thống, bạn có thể truyền vào bao nhiêu quyền cũng được. Ví dụ: 

```java
EasyPermissions.requestPermissions(
                        this,
                        getString(R.string.permission_rationale_calendar),
                        PERMISSIONS_REQUEST_CODE, *permissions
                )
```

+ Sử dụng anotation *AfterPermissionGranted* . Đây là optional thôi nhưng mà nó cũng khá là hữu ích: Nếu như các quyền đều được cấp, thì tất cả những phương thức mà có anotation này đều được thực thi. Nhưng các quyền phải có cùng một request code và các hàm mà có anotation này không được có tham số đầu vào (nếu là java thì phải dùng void). Ví dụ: 

```java
@AfterPermissionGranted(RC_CAMERA_AND_LOCATION)
private void methodRequiresTwoPermission() {
    String[] perms = {Manifest.permission.CAMERA, Manifest.permission.ACCESS_FINE_LOCATION};
    if (EasyPermissions.hasPermissions(this, perms)) {
        // Already have permission, do the thing
        // ...
    } else {
        // Do not have permissions, request them now
        EasyPermissions.requestPermissions(this, getString(R.string.camera_and_location_rationale),
                RC_CAMERA_AND_LOCATION, perms);
    }
}
```

Ngoài ra, có một số phương thức khác để bạn tham khảo: 

```java
public class MainActivity extends AppCompatActivity implements EasyPermissions.PermissionCallbacks {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        // Forward results to EasyPermissions
        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }

    @Override
    public void onPermissionsGranted(int requestCode, List<String> list) {
        // Some permissions have been granted
        // ...
    }

    @Override
    public void onPermissionsDenied(int requestCode, List<String> list) {
        // Some permissions have been denied
        // ...
    }
}
```

Trên đây là một số thông tin cần thiết về thư viện implement permission EasyPermissions.

# Tham khảo: 
Library: https://github.com/googlesamples/easypermissions
Document: https://blog.mindorks.com/implementing-easy-permissions-in-android-android-tutorial