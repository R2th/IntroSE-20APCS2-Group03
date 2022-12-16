![](https://images.viblo.asia/841d1f60-a9cf-4bb5-8540-b5487998757c.png)

Trong khi gửi một số biểu mẫu hoặc bất kỳ loại thông tin nào trên website, bạn có thể nhận thấy mình phải điền một số **captcha** (hình ảnh xác thực) trước khi ấn gửi được. Hình ảnh xác thực đó có thể ở dạng hình ảnh có một dãy số hoặc có thể là hình ảnh của một cái gì đó và bạn phải xác định vị trí của nó trong bức ảnh. Nhưng bạn đã bao giờ nghĩ tại sao những captcha này được tích hợp hoặc đưa vào các trang web chưa? Lý do rất đơn giản. Để xác minh tính xác thực của người dùng, những captcha này được sử dụng để tìm xem người dùng có phải là người hay không. Ngày nay, nhiều bot thông minh có thể điền thông tin vào một biểu mẫu và để tránh trường hợp như vậy, chúng ta có thể sử dụng captcha trong trang web hoặc ứng dụng của mình.

Trong bài viết này, chúng ta sẽ tìm hiểu cách triển khai **CAPTCHA** bằng **reCAPTCHA** của Google.

### SafetyNet reCAPTCHA API

**SafetyNet** cung cấp các API có thể được sử dụng để bảo vệ ứng dụng di động của bạn khỏi các mối đe dọa bảo mật như người dùng giả mạo, giả mạo thiết bị, URL xấu, v.v. Một trong những dịch vụ của nó bao gồm hỗ trợ reCAPTCHA để bảo vệ người dùng khỏi lưu lượng độc hại.

Dưới đây là phần giới thiệu **reCAPTCHA** có trên trang web Android:

> reCAPTCHA là một dịch vụ miễn phí sử dụng công cụ phân tích rủi ro tiên tiến để bảo vệ ứng dụng của bạn khỏi spam và các hành động lạm dụng khác. Nếu dịch vụ nghi ngờ rằng người dùng tương tác với ứng dụng của bạn có thể là bot thay vì con người, thì nó sẽ yêu cầu bạn phải giải quyết một captcha trước khi ứng dụng của bạn có thể tiếp tục thực thi.

<br>

Nhưng để sử dụng các API này, `minSdkVersion` của bạn phải từ 14 trở lên.

### Cách thức hoạt động

Cách thức hoạt động của **reCAPTCHA** bao gồm các `network call` nhất định (ví dụ: cuộc gọi từ ứng dụng Android của bạn đến máy chủ SafetyNet, sau đó là máy chủ SafetyNet đến ứng dụng Android của bạn và cuối cùng từ ứng dụng Android đến máy chủ của bạn). Vì vậy, sau đây là các bước liên quan đến hoạt động của Google reCAPTCHA trong ứng dụng Android của bạn:

1. Đầu tiên, bạn phải lấy **Site key** và **Secret key** từ [trang web reCAPTCHA](https://www.google.com/recaptcha/admin/create). **Site key** sẽ được sử dụng trong ứng dụng Android của bạn và **Secret key** sẽ giữ ở phía máy chủ của bạn.
2. Bằng cách sử dụng **Site key**, reCAPTCHA sẽ được tạo và người dùng phải hoàn thành thử thách reCAPTCHA nếu cần.
3. Sau khi tạo reCAPTCHA, ứng dụng sẽ liên lạc với máy chủ captcha và sẽ trả về **User Response Token** bằng **Site key** của bạn.
4. Bây giờ, ứng dụng Android của bạn sẽ gửi token đến máy chủ của bạn và máy chủ sẽ gửi lại token đến máy chủ reCAPTCHA nhưng với **Secret key**. Máy chủ reCAPTCHA sẽ gửi trạng thái thành công đến máy chủ của bạn và máy chủ đổi lại gửi trạng thái thành công cho ứng dụng Android của bạn.

<br>
Toàn bộ quá trình có thể được tóm tắt như sau:

![](https://images.viblo.asia/a637a52c-877c-4de4-897a-632dead6bae5.jpg)

### Khởi tạo Site key và Secret key

Chúng ta đã biết được cách thức hoạt động của reCAPTCHA, công việc tiếp theo là khởi tạo site key và secret key để sử dụng. Các bạn có thể thực hiện theo các bước dưới đây:

1. Truy cập [trang web reCAPTCHA](https://www.google.com/recaptcha/admin/create).
2. Nhập nhãn để xác định khóa của bạn. Bạn có thể nhập bất kỳ tên nào ở đây.
3. Sau khi nhập nhãn, chọn loại reCAPTCHA mà bạn muốn thêm vào ứng dụng của mình. Ví dụ: reCAPTCHA v2 và reCAPTCHA Android.
4. Nhập package name của dự án Android.
5. Cuối cùng, chọn "Accept the reCAPTCHA Terms and Conditions" và "Send alerts to owners".
6. Bấm vào Submit.

![](https://images.viblo.asia/0f015c39-dc09-4b78-b6ef-251dea74a6e9.jpg)

Sau khi gửi biểu mẫu, bạn sẽ nhận được một Site key và một Secret key. Hãy lưu trữ chúng ở đâu đó, ta sẽ cần sử dụng chúng trong ứng dụng của mình.

### Thiết lập ứng dụng Android cho reCAPTCHA

Đầu tiên, bạn cần thêm dependency của reCAPTCHA trong tệp build.gradle:

```java
//dependency for the reCAPTCHA (safetynet)
implementation 'com.google.android.gms:play-services-safetynet:17.0.0'
//dependency for fast networking for networking
implementation 'com.amitshekhar.android:android-networking:1.0.2'
```

Sau khi thêm dependency, công việc tiếp theo của chúng ta là thêm quyền internet vào ứng dụng, hãy thêm dòng sau vào file AndroidManifest.xml của bạn:
```java
<uses-permission android:name="android.permission.INTERNET"/>
```

Và để khởi tạo thư viện FastNetworking trong ứng dụng, hãy viết dòng sau vào trong lớp Application:
```java
AndroidNetworking.initialize (applicationContext);
```
Giao diện cho activity_main.xml:
```java
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="reCAPTCHA example"
            app:layout_constraintBottom_toBottomOf="parent"
            android:layout_marginTop="8dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            android:layout_marginEnd="8dp"
            app:layout_constraintStart_toStartOf="parent"
            android:layout_marginStart="8dp"
            android:id="@+id/textView"
            android:textSize="32sp"/>

    <Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Click for CAPTCHA"
            android:layout_marginTop="8dp"
            app:layout_constraintTop_toBottomOf="@+id/textView" app:layout_constraintEnd_toEndOf="parent"
            android:layout_marginEnd="8dp" app:layout_constraintStart_toStartOf="parent"
            android:layout_marginStart="8dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```
Trong tệp MainActivity.kt:
```java
class MainActivity : AppCompatActivity(), View.OnClickListener {

    var TAG = "MainActivity"
    lateinit var btnverifyCaptcha: Button
    private var SITE_KEY = "YOUR_SITE_KEY"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        btnverifyCaptcha = findViewById(R.id.button)
        btnverifyCaptcha.setOnClickListener(this)
    }

    override fun onClick(view: View) {
        SafetyNet.getClient(this).verifyWithRecaptcha(SITE_KEY)
            .addOnSuccessListener(this) { response ->
                if (!response.tokenResult.isEmpty()) {
                    handleVerify(response.tokenResult)
                }
            }
            .addOnFailureListener(this) { e ->
                if (e is ApiException) {
                    Log.d(TAG,("Error message: " + CommonStatusCodes.getStatusCodeString(e.statusCode)))
                } else {
                    Log.d(TAG, "Unknown type of error: " + e.message)
                }
            }
    }

    protected fun handleVerify(responseToken: String) {
        //it is google recaptcha siteverify server
        //you can place your server url
        val url = "https://www.google.com/recaptcha/api/siteverify"
        AndroidNetworking.get(url)
            .addHeaders("token", responseToken)
            .setTag("MY_NETWORK_CALL")
            .setPriority(Priority.LOW)
            .build()
            .getAsJSONArray(object : JSONArrayRequestListener() {
                fun onResponse(response: JSONArray) {
                    // do anything with response
                }

                fun onError(error: ANError) {
                    // handle error
                }
            })
    }
}
```

Cuối cùng, hãy chạy ứng dụng của mình và thử nghiệm thử nhé.

Các API error thông thường của reCAPTCHA:

1. **RECAPTCHA_INVALID_SITEKEY**: Nếu bạn chưa đăng ký khóa API chính xác.
2. **RECAPTCHA_INVALID_KEYTYPE**: Loại khóa không hợp lệ. Tạo khóa reCAPTCHA mới.
3. **RECAPTCHA_INVALID_PACKAGENAME**: Tên package mà bạn đã nhập trong quá trình tạo API không giống với tên packge của ứng dụng. Thêm tên gói chính xác.
4. **NETWORK_ERROR**: Nếu không có kết nối internet thì sẽ gặp phải lỗi này.
5. **UNSUPPORTED_SDK_VERSION**: Bạn có thể đang sử dụng API cấp 13 trở xuống. Thay đổi MinSdkVersion của bạn thành 14 hoặc cao hơn.