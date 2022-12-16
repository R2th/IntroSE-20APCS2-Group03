Facebook là mạng truyền thông xã hội lớn nhất thế giới với hơn 2 tỷ tài khoản, thêm Facebook Đăng nhập trong ứng dụng của bạn sẽ mở ra cơ hội cho bạn tiếp cận đến nhiều người dùng hơn. 

Trong bài viết này mình sẽ giới thiệu cách thêm chức năng đăng nhập Facebook đơn giản nhất vào ứng dụng Android.


## Đăng ký với facebook
Trước tiên bạn cần có tài khoản Facebook để sử dụng những dịch vụ mà Facebook Develop cung cấp.

- Đi tới [Facebook dành cho developer](https://developers.facebook.com/) để đăng ký  ứng dụng
![](https://images.viblo.asia/91eb23b7-6aa0-4f2a-aa51-e42b85f52604.png)
Chọn "Thêm ứng dụng mới".
- Sau khi popup hiển thị, bạn điền đầy đủ thông tin và  chọn "Tạo ID ứng dụng"
![](https://images.viblo.asia/b463f7df-2dc6-4f97-aa8d-907ea23fc469.png)

- Bạn sẽ được điều hướng tới trang điều khiển của Facebook develop, chọn "Thêm sản phẩm" ở góc dưới bên trái màn hình. 
    
    Bạn có thể thấy ID ỨNG DỤNG ở góc trên màn hình là một dãy gồm 15 chữ số.
    
    Tiếp tục chọn "Thiết lập" trong mục Đăng nhập Facebook.
    Sau đó trong mục sản phẩm chọn Đăng nhập Facebook và chọn Android
    ![](https://images.viblo.asia/e654aa80-742e-48d9-a5d3-7ee28922085d.png)
    
- Bỏ qua bước 1 và đi đến bước 2 Nhập Facebook SDK
![](https://images.viblo.asia/9dc5b900-42d1-45cc-bab5-09f1d886ebf7.png)
## Thêm gradle dependency
Thêm dòng này vào phần dependency ở tệp build.gradle trong mdule app :
```java
implementation 'com.facebook.android:facebook-android-sdk:[4,5)'
```


##     Quay lại với Facebook develop
Điền thông tin ứng dụng cảu bạn vào bước 3 và bấm Save
![](https://images.viblo.asia/ac41aaf7-d77f-433d-a4e3-a95486bb7a5c.png)

## Tạo Key Hash cho bản debug và release 
Ở bước 4 chúng ta sẽ tạo key hash để đảm bảo tính xác thực của tương tác giữa ứng dụng của bạn và Facebook.

Mở Terminal của Android Studio 
- Đối với bản dubug:

    ```java
    keytool -exportcert -alias androiddebugkey -keystore debug.keystore | openssl sha1 -binary | openssl base64
    ```
- Đối với bản release :

    ```java
    keytool -exportcert -alias <aliasName> -keystore <keystoreFilePath> | openssl sha1 -binary | openssl base64
    ```
    Thay thế aliasName và keystoreFilePath bằng những giá trị thật.
    

Sau khi tạo được hash key alf một chuỗi 28 ký tự bạn nhập vào mục Hash khóa và bấn Save
![](https://images.viblo.asia/dd3410e9-f377-4809-adcf-87644dcf83da.png)

## Bật đăng nhập một lần cho ứng dụng của bạn
Nếu bạn muốn Thông báo trên Android của mình có thể khởi chạy ứng dụng, hãy bật đăng nhập một lần. Ở đây mình không bật dăng nhập môt lần.
![](https://images.viblo.asia/4b6b0ee4-ff40-4a8e-94f9-0517f3301329.png)

##     Thêm Facebook App ID
Bây giờ chúng ta sẽ nhập ID ứng dụng được tạo ở bước trên trong ứng dụng.

- Mở file /app/res/values/strings.xml của bạn.
Thêm phần sau:
    ```java
    <string name="facebook_app_id">xxx</string>
    <string name="fb_login_protocol_scheme">fbxxx</string>
    ```
    Thay "xxx" bằng ID ứng dụng mà bạn tạo được ở bước ở trên.

- Mở file /app/manifest/AndroidManifest.xml.

    Tất nhiên rồi muốn sử dụng Facebook bạn cần có internet.  Thêm uses-permission sau đây vào phía sau thành phần application:
    ```java
     <uses-permission android:name="android.permission.INTERNET"/>
    ```
     Thêm đoạn sau vào trong thẻ <apllicaton>
    ```java
    <meta-data
            android:name="com.facebook.sdk.ApplicationId"
            android:value="@string/facebook_app_id" />

        <activity
            android:name="com.facebook.FacebookActivity"
            android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
            android:label="@string/app_name" />
        <activity
            android:name="com.facebook.CustomTabActivity"
            android:exported="true">
            <intent-filter><action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data android:scheme="@string/fb_login_protocol_scheme" />
            </intent-filter>
        </activity>
    ```
   
##  Khởi tạo Facebook SDK
    
   Bạn cần tạo một class extend từ Application và sau khi đã đăng jký trong Manifest, thêm đoạn sau vào phương thức onCreate():
    
```JAVA
@Override
public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
}
```
**CHÚ Ý:** Ở bản cập nhật mới của Facebook SDK thì sdkInitialize() và activateApp() được gọi tự động khi ứng dụng khởi động. Vì vậy bạn có thể bỏ qua bước này.
    
##     Thêm nút Đăng nhập Facebook
Cách đơn giản nhất để thêm Đăng nhập Facebook vào ứng dụng của bạn là thêm LoginButton từ SDK. LoginButton là thành phần giao diện có sẵn chức năng có trong LoginManager. Khi ai đó nhấp vào nút này, đăng nhập sẽ bắt đầu với các quyền đã đặt trong LoginManager.
   
File activity_mail.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.facebook.login.widget.LoginButton
        android:id="@+id/login_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```
    
 Bạn có thể tùy chỉnh các thuộc tính của Login button như LoginBehavior, DefaultAudience, ToolTipPopup.Style và các quyền trên LoginButton.
## Đăng ký callback 
Bây giờ, hãy tạo một callbackManager để xử lý các callback đăng nhập bằng cách gọi CallbackManager.Factory.create.
```java
callbackManager = CallbackManager.Factory.create();
```
    
Ở MainActivity để xử lý kết quả đăng nhập, bạn cần đăng ký listener  bằng LoginManager hoặc LoginButton. Nếu bạn đăng ký gọi lại bằng LoginButton thì không cần đăng ký ở LoginManager nữa.
```java
loginButton = (LoginButton) findViewById(R.id.login_button);
    loginButton.setReadPermissions("email",  "public_profile");

    // Callback registration
    loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
        @Override
        public void onSuccess(LoginResult loginResult) {
            // Lấy access token sử dụng LoginResult
            AccessToken accessToken = loginResult.getAccessToken();
            getUserProfile(accessToken);
        }

        @Override
        public void onCancel() {
            // App code
        }

        @Override
        public void onError(FacebookException exception) {
            // App code
        }
    });
    
```
Khi chúng ta có AccessToken sau khi người dùng đăng nhập, chúng ta có thể dễ dàng truy vấn các chi tiết cá nhân của người dùng (họ đã cấp quyền).
```java
private void useLoginInformation(AccessToken accessToken) {
     /**
      Creating the GraphRequest to fetch user details
       1st Param - AccessToken
       2nd Param - Callback (which will be invoked once the request is successful) 
     **/
      GraphRequest request = GraphRequest.newMeRequest(accessToken, new GraphRequest.GraphJSONObjectCallback() {
          //OnCompleted is invoked once the GraphRequest is successful
          @Override
          public void onCompleted(JSONObject object, GraphResponse response) {
              try {
                  String name = object.getString("name");
                  String email = object.getString("email");
                  String image = object.getJSONObject("picture").getJSONObject("data").getString("url");
    
            //Sử dụng thông tin lấy được 
              } catch (JSONException e) {
                  e.printStackTrace();
              }
          }
      });
      // We set parameters to the GraphRequest using a Bundle.   
      Bundle parameters = new Bundle();
      parameters.putString("fields", "id,name,email,picture.width(200)");
      request.setParameters(parameters);
      // Initiate the GraphRequest
      request.executeAsync();
  }
```
 - Nếu người dùng đăng nhập thành công, nút Đăng nhập hoạt động như  nút Đăng xuất và người dùng sẽ đăng xuất sau khi nhấp vào nó.
 -  Bạn cũng có thể có một nút tùy chỉnh để đăng xuất và thực hiện đăng xuất:
    ```java
    LoginManager.getInstance().logOut();
    ```
##     Kết bài
Trên đây là một cách đơn giản để bạn có thể implement Facebook Login vào trong ứng dụng của mình. Bạn có thể tham khảo thêm tại [đây](https://developers.facebook.com/apps/325803914953266/fb-login/quickstart/).