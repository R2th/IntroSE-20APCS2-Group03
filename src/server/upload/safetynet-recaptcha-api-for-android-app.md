# I. Mở đầu
* **reCAPTCHA API** là một dịch vụ của [SafetyNet]( https://developer.android.com/training/safetynet) có thể giúp chúng ta bảo vệ ứng dụng tránh khỏi những lưu lượng truy cập độc hại.
* **reCAPTCHA** là dịch vụ hoàn toàn miễn phí sử dụng công cụ phân tích rủi ro nâng cao để bảo vệ ứng dụng của chúng ta khỏi spam và các hành động lạm dụng khác. Nếu nghi ngờ người dùng đang tương tác với ứng dụng có thể là bot thì nó sẽ phân phát **CAPCHA** và buộc đối tượng phải giải quyết trước khi ứng dụng của chúng ta có thể tiếp tục thực thi.
* **reCAPTCHA API** chỉ có thể được sử dụng từ phiên bản Android 4.0 (API level 14) trở lên.

# II. Nội dung chính
## 1. Điều khoản dịch vụ reCAPTCHA
* Chúng ta đều thừa nhận và hiểu rằng **reCAPTCHA API** hoạt động bằng các thu thập thông tin phần cứng và phần mềm, chẳng hạn như dữ liệu thiết bị và ứng dụng cũng như kết quả kiểm tra tính toàn vẹn, đồng thời gửi dữ liệu đó cho Google để phân tích.
* Căn cứ vào Mục 3(d) của [Google APIs Terms of Service]( https://developers.google.com/terms/), chúng ta đồng ý rằng nếu sử dụng API, chúng ta có trách nhiệm cung cấp mọi thông báo hoặc sự đồng ý cần thiết cho việc thu thập và chia sẻ dữ liệu này với Google.
## 2. Đăng ký reCAPTCHA key pair
* Để đăng ký key pair sử dụng với SafetyNet reCAPTCHA API, chúng ta truy cập web đăng ký của [reCAPTCHA](https://g.co/recaptcha/androidsignup) và hoàn thành các bước sau:
* B1. Chúng ta sẽ cung cấp thông tin trong form đầu tiên như sau:
    *  **Label**: Định danh duy nhất cho key. Thông thường sẽ lấy tên của công ty hoặc tổ chức của chúng ta.
    * **reCAPTCHA type**: Chúng ta chọn **reCAPTCHA v2** rồi chọn **reCAPTCHA Android**.
    * **Packages**: Tên package của ứng dụng.
    * **Send alerts to owners**: Nếu chúng ta muốn nhận email thông báo của dịch vụ.
* B2. Chọn Accept the reCAPTCHA Terms of Service để Đồng ý với các điều khoản dịch vụ rồi chọn Register.
* B3. Trong phần Adding reCAPTCHA to your site, chúng ta sẽ sử dụng Site key để gửi yêu cầu xác minh và Secret key để xác thực token response của user.
## 3. SafetyNet API dependency
* Trước khi sử dụng **reCAPTCHA API** chúng ta cần thêm **SafetyNet API** vào project như sau:
```
apply plugin: 'com.android.application'
...
dependencies {
    compile 'com.google.android.gms:play-services-safetynet:17.0.0'
}
```
## 4. Sử dụng reCAPTCHA API
### a. Gửi yêu cầu xác minh
* Để gọi ra **SafetyNet reCAPTCHA API**, chúng ta sử dụng phương thức [verifyWithRecaptcha()](https://developers.google.com/android/reference/com/google/android/gms/safetynet/SafetyNetClient.html#verifyWithRecaptcha(java.lang.String)). Thông thường phươn thức này tương ứng với việc user thác tác với một thành phần của UI (ví dụ: button, edittext...).
* Khi sử dụng phương thức [verifyWithRecaptcha()](https://developers.google.com/android/reference/com/google/android/gms/safetynet/SafetyNetClient.html#verifyWithRecaptcha(java.lang.String)) chúng ta cần lưu ý như sau:
    *  Dùng **Site key** làm tham số.
    *  Override 2 phương thức [onSuccess()](https://developers.google.com/android/reference/com/google/android/gms/tasks/OnSuccessListener.html#onSuccess(TResult)) và [onFailure()](https://developers.google.com/android/reference/com/google/android/gms/tasks/OnFailureListener.html#onFailure(java.lang.Exception)) để xử lý cả hai kết quả có thể xảy ra của task yêu cầu xác minh. Trong trường API trả về [ApiException]( https://developers.google.com/android/reference/com/google/android/gms/common/api/ApiException) trong [onFailure()](https://developers.google.com/android/reference/com/google/android/gms/tasks/OnFailureListener.html#onFailure(java.lang.Exception)), chúng ta cần phải xử lý từng mã lỗi có thể có bằng cách sử dụng [getStatusCode()](https://developers.google.com/android/reference/com/google/android/gms/common/api/ApiException#getStatusCode()).
```
fun onClick(view: View) {
    SafetyNet.getClient(this).verifyWithRecaptcha(YOUR_API_SITE_KEY)
            .addOnSuccessListener(this as Executor, OnSuccessListener { response ->
                // Indicates communication with reCAPTCHA service was
                // successful.
                val userResponseToken = response.tokenResult
                if (response.tokenResult?.isNotEmpty() == true) {
                    // Validate the user response token using the
                    // reCAPTCHA siteverify API.
                }
            })
            .addOnFailureListener(this as Executor, OnFailureListener { e ->
                if (e is ApiException) {
                    // An error occurred when communicating with the
                    // reCAPTCHA service. Refer to the status code to
                    // handle the error appropriately.
                    Log.d(TAG, "Error: ${CommonStatusCodes.getStatusCodeString(e.statusCode)}")
                } else {
                    // A different, unknown type of error occurred.
                    Log.d(TAG, "Error: ${e.message}")
                }
            })
}
```
### b. Xác thực token response của user
* Khi **reCAPTCHA API** thực thi phương thức [onSuccess()](https://developers.google.com/android/reference/com/google/android/gms/tasks/OnSuccessListener.html#onSuccess(TResult)) có nghĩ là user đã hoàn thành thử thách **CAPTCHA** thành công. Tuy nhiên, phương thức này chỉ cho biết rằng user đã giải **CAPTCHA** theo một cách chính xác nào đó và chúng ta vẫn cần phải xác thực token response của user từ backend server.
## 5. Xử lý lỗi
* Nếu ứng dụng của chúng ta không thể giao tiếp thành công với dịch vụ **reCAPTCHA**, thì có thể là do API đang gặp lỗi. Chúng ta nên xử lý một cách khéo léo những lỗi như vậy. Ngoài ra, khi lỗi xảy ra, ứng dụng sẽ hiển thị thông báo cho user và giải thích lý do tại sao nó không thể xử lý xong phản hồi **CAPTCHA** của user.
* Danh sách đưới đây biểu thị các mã lỗi phổ biến nhất:
    * `RECAPTCHA_INVALID_SITEKEY`: Site key không hợp lệ. Code: 12007
    * `RECAPTCHA_INVALID_KEYTYPE`: Kiểu của Site key không hợp lệ. Code: 12008
    * `RECAPTCHA_INVALID_PACKAGE_NAME`: Tên package của ứng udnjg không tồn tại. Code: 12013
    * `UNSUPPORTED_SDK_VERSION`: Phiên bản Android SDK hiện tại không được hỗ trợ. Code: 12006
    * `TIMEOUT`: User không tương tác với CAPTCHA trong một khoảng thời gian nhất định. Code: 15
    * `NETWORK_ERROR`: Không có kết nối internet. Code: 7
    * `ERROR`: Lỗi chung không xác định. Code: 13
* Danh sách lỗi đầy đủ chúng ta có thể tham khảo tại [đây]( https://developers.google.com/android/reference/com/google/android/gms/safetynet/SafetyNetStatusCodes) 
# III. Kết
* Hy vọng nội dung của bài viết sẽ phần nào giúp các bạn có thêm những kiến thức mới về bảo mật cho ứng dụng.
* Toàn bộ nội dung của bài viết được tham khảo tại [đây](https://developer.android.com/training/safetynet/recaptcha)