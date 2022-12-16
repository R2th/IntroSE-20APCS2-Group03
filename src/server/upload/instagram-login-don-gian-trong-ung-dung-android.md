Instagram là mạng xã hội chia sẻ ảnh lớn nhất thế giới với hàng  tỷ tài khoản, thêm Instagram  Đăng nhập trong ứng dụng của bạn sẽ mở ra cơ hội cho bạn tiếp cận đến nhiều người dùng hơn.

Trong bài viết này mình sẽ giới thiệu cácgram  đơn giản nhất h thêm chức năng đăng nhập Instavào ứng dụng Android.

Các bước thực hiện:

1. Điều hướng người dùng tới Instagram
2. Lấy access token để thực hiện những yêu cầu khác

### Đăng ký với Instagram

Trước khi bắt đầu, chúng ta cần nhận được tất cả các tham số cần thiết cho yêu cầu. Để làm điều này, đăng ký ứng dụng của bạn tại https://www.instagram.com/developer/ . Nhấn vào button Register your application, tại mục **Trang web của bạn** bạn có thể diền bất kỳ link nào tùy thích.

Chọn mục **Manage Clients**, điền đầy đủ thông tin cần thiết và đăng ký, bạn sẽ nhận được client ID để sử dụng trong ứng dụng của mình.

Trong mục Sercurity, bỏ chọn Disable implicit OAuth và điền URL vào mục Valid redirect URIs, ví dụ như https://www.instagram.com. Chi tiết bạn có thể xem tại [đây](https://www.instagram.com/developer/authentication/): 

![](https://images.viblo.asia/ffabb2fc-a96a-4232-a013-3ce08bd7eae5.png)


### Tạo ứng dụng
Mở Android Studio, tạo một project mới. Để sử dụng Instagram chúng ta cần có kết nối internet. Chúng ta càn xerin quyền Internet trong Manifest: 
```java
<uses-permission android:name="android.permission.INTERNET" />
```

Và thêm 3 string sau vào file strings.xml
```java
<string name="client_id">your_client_id</string>
<string name="redirect_url">your_redirect_url</string>
<string name="base_url">https://api.instagram.com/</string>
<string name="request_url">https://api.instagram.com/oauth/authorize/?client_id=%s&amp;redirect_uri=%s&amp;response_type=token</string>
```

> Ở đây **your_client_id** là client ID bạn đã tạo được ở bước đầu tiên. Và **your_redirect_url** chính là URL bạn đã diền vào mục Valid redirect URIs ở bước trên.


Bây giờ chúng ta cần một button mà khi bấm vào có thể thực hiện việc đăng nhập với Instagram, mở file activity_main.xml và sửa thôi nào: 
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn_login"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="100dp"
        android:text="Login Instagram"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/image_avatar"
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/text_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/image_avatar" />

    <TextView
        android:id="@+id/text_username"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/text_name" />

</android.support.constraint.ConstraintLayout>
```
Khi nhấn vào Button Login Instagram, ta sẽ cho hiển thị một dialog để xác thực. Bằng cách tạo một dialog, chúng ta sẽ mở Instagram trong Webview và nhận access token trả về qua url.

Sau khi xác thực thành công ta sẽ lấy user infor và hiển thị lên màn hình.


    
```kotlin
val retrofit: Retrofit
init {

    retrofit = Retrofit.Builder()
        .baseUrl("https://api.instagram.com/v1/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
}
```



* **Tạo dialog:**
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
   <WebView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/webView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
    ```
    Tạo một class tên AuthenticationDialog (bạn cso thể đặt tùy ý) kế thừa từ Dialog
    ```java
    class AuthenticationDialog(context: Context, private val listener: AuthenListener) :
        Dialog(context) {

        object Token {
            val ACCESS_TOKEN = "access_token="
        }

        private var requestUrl: String
        var redirectUrl: String = context.resources.getString(R.string.redirect_url)

        init {
            requestUrl = String.format(
                context.resources.getString(R.string.request_url),
                context.resources.getString(R.string.client_id),
                redirectUrl
                )
        }

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.dialog_insta)

            window?.setLayout(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);

            webView.settings.javaScriptEnabled = true
            webView.loadUrl(requestUrl)
        }
    }
    ```
    Trong Kotlin ta có thể gọi View bằng id của nó trong file xml mà không cần phải findViewById(). 
   Webview load requestUrl và đi đến trang đăng nhập Instagram, khi người dùng đăng nhập thành công, ta cho ẩn dialog đi và lấy access token thông qua url trả về có dạng : redirectUrl#access_token=abcxyz..

* **Tạo callback trả về cho activity và custom WebviewClient** 

    Tạo interface AuthenListener dược truyền vào ở constructor của dialog: 
    ```java
    interface AuthenListener {
        fun onAuthenVerified(accessToken: String)
    }
    ```
   
   set WebviewClient cho Webview:

    ```java
     webView.webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                    if (url!!.startsWith(redirectUrl)) {
                        dismiss()
                        return true
                    }
                    return super.shouldOverrideUrlLoading(view, url)
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    if (url!!.contains(ACCESS_TOKEN)) {
                        val accessToken =
                            url.substring(url.lastIndexOf(ACCESS_TOKEN) + ACCESS_TOKEN.length)
                        listener.onAuthenVerified(accessToken)
                        dismiss();
                    } else if (url.contains("?error")) {
                        Log.e("access_token", "getting error fetching access token");
                        dismiss();
                    }
                }
            }
    ```
    
    Ở MainActivity:
    ```java
    class MainActivity : AppCompatActivity(), AuthenListener {

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            btn_login.setOnClickListener {
                val authenticationDialog = AuthenticationDialog(this, this)
                authenticationDialog.setCancelable(true)
                authenticationDialog.show()
            }
        }

        override fun onAuthenVerified(accessToken: String) {
            // TODO load user information 
        }
    }

    ```
    
* **Giờ đã có access token, chúng ta sẽ lấy thông tin của user bằng access token đó**.

    Thêm vào file build.gradle(module app) dòng sau :

    ```java
        implementation 'com.squareup.retrofit2:retrofit:2.5.0'
        implementation 'com.squareup.retrofit2:converter-gson:2.5.0'
        implementation 'com.github.bumptech.glide:glide:4.8.0'
        annotationProcessor 'com.github.bumptech.glide:compiler:4.8.0'
    ```
    Tạo class User để lấy thông tin người dùng :
    ```kotlin
    class User {

        @SerializedName("data")
        val data: Data? = null

        class Data {
            @SerializedName("id")
            val id: String = ""
            @SerializedName("username")
            val userName: String = ""
            @SerializedName("profile_picture")
            val image: String = ""
            @SerializedName("full_name")
            val fullName: String = ""
        }
    }
    ```
    Taọ Retrofit service:
    ```kotlin
    interface TokenService {

        @GET("users/self/")
        fun getUserInfo(@Query("access_token")  accessToken:String) : Call<User>
    }
    ```
    Thêm dòng sau vào MainActivity 
    :
    ```kotlin
    val retrofit: Retrofit

        init {
            retrofit = Retrofit.Builder()
                .baseUrl("https://api.instagram.com/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }
        override fun onAuthenVerified(accessToken: String) {
            getUserInfo(accessToken)
        }

        fun getUserInfo(accessToken: String) {
            val call = retrofit.create(TokenService::class.java).getUserInfo(accessToken)
            call.enqueue(object : Callback<User> {

                override fun onResponse(call: Call<User>, response: Response<User>) {
                    val user = response.body()?.data
                    Glide.with(this@MainActivity)
                        .load(user?.image)
                        .into(image_avatar)
                    text_username.text = user?.userName
                    text_name.text = user?.fullName
                }

                override fun onFailure(call: Call<User>, t: Throwable) {
                    Toast.makeText(this@MainActivity, "Error ${t.message}", Toast.LENGTH_SHORT).show()
                }

            })
        }
    ```
    
    
Xong rồi, bây giờ bạn hãy chạy thử ứng dụng và xem kết quả nhé.


-----


### Kết
Bạn có thể tham khảo thêm tại [**đây**](https://medium.com/@1537877453702/instagram-api-simple-android-application-with-login-and-getting-user-info-e24f4f1bc023).