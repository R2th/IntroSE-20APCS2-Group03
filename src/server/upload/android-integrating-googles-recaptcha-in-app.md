Google's [reCaptcha](https://www.google.com/recaptcha/intro/android.html) API bảo vệ website/app của bạn từ những kết nối không an toàn. Bạn có thể thấy được reCaptcha được tích hợp trên các web pages. Bạn cũng có thể tích hợp nó vào ứng dụng Android của bạn bằng cách sử dụng SafetyNet API. Dịch vụ này là free và it sẽ hiển thị Captcha được giải quyết nếu  nghi ngờ động cơ tương tác là Bot thay vì người dùng.
## How it work?
ReCaptcha sẽ được xác nhận bằng cách making certain network calls giữa ứng dụng của bạn, [
Safetynet](https://developer.android.com/training/safetynet/recaptcha.html#use-api) server và server của bạn.

 - Đầu tiên, bạn phải đang ký SafetyNet để nhận **Site key** và **Secret**.
 - **Site key** sẽ được tích hợp trong Android app và nó sẽ được public. **Secret** sẽ được giữ ở Server của bạn và không nên lộ cho người khác biết.
 - Khi reCaptcha được gọi, nó sẽ hiển thị thử thách Captcha cho user nếu cần thiết. Trong bước này nó sẽ tương tác voiws captcha server và trả **User response Token** sử dụng **Site key**.
 - Khi  User Response Token được nhận, nó vẫn sẽ cần thiết để validated trên server sử dụng **Secret** key
 - Từ mobile app, User Response Token sẽ gửi đến server của bạn. Từ server, Token sẽ được gửi đến SafetyNet server với Secret. Khi SafetyNet server validated token, nó sẽ thông báo về cho server của bạn với success status.
 - Cuối cùng, server của bạn sẽ thông báo về mobile app với status của captcha là success or fail.
![Flow reCaptcha](https://images.viblo.asia/01553ee7-52c0-4411-a76e-709bfc106f21.png)
## Đăng ký SafetyNet Site Key và Secret

1. Truy cập [reCaptcha](https://www.google.com/recaptcha/admin#androidsignup) để đăng ký cho app.
2. Enter label to xác định  key.
3. Chọn type reCaptcha, prefer select reCaptcha Android
4. Enter package name, bạn có thể enter multiple package name.
5. Accept and click register. After register bạn sẽ nhận được **Site key** và **Secrect ** .
## Create project
1. Create new project 
2. Add **safetyNet** trong build.gradle
```
build.gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:26.1.0'
 
    // SafetyNet reCAPTCHA
    implementation 'com.google.android.gms:play-services-safetynet:11.8.0'
 
    // ButterKnife
    implementation 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
 
    // Volley
    implementation 'com.android.volley:volley:1.1.0'
}
```
3.  Add resource, color, string, dimens
```
colors.xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#00bbd3</color>
    <color name="colorPrimaryDark">#0097a7</color>
    <color name="colorAccent">#FF4081</color>
</resources>
```
```
strings.xml
<resources>
    <string name="app_name">reCAPTCHA</string>
    <string name="feedback">Feedback</string>
    <string name="hint_feedback">Enter your feedback here!</string>
    <string name="btn_send">Send Feedback</string>
    <string name="title_form">Send us some feedback!</string>
    <string name="desc_form">Have a suggestion? Fill out the form  below and we’ll take a look!</string>
    <string name="message_feedback_done">Thanks for your feedback. We\'ll get back to you soon!</string>
</resources>
```
```
dimens.xml
<resources>
    <dimen name="activity_margin">16dp</dimen>
</resources>
```
4. Create layout file
```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.androidhive.recaptcha.MainActivity">
 
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">
 
        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />
 
    </android.support.design.widget.AppBarLayout>
 
    <include layout="@layout/content_main" />
 
</android.support.design.widget.CoordinatorLayout> 
```
```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.androidhive.recaptcha.MainActivity">
 
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">
 
        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />
 
    </android.support.design.widget.AppBarLayout>
 
    <include layout="@layout/content_main" />
 
</android.support.design.widget.CoordinatorLayout>
```
5. Tạo MyApplication extend from Application.
```
MyApplication.java
import android.app.Application;
import android.text.TextUtils;
 
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
 
/**
 * Created by ravi on 13/03/18.
 */
 
public class MyApplication  extends Application {
 
    public static final String TAG = MyApplication.class
            .getSimpleName();
 
    private RequestQueue mRequestQueue;
 
    private static MyApplication mInstance;
 
    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
    }
 
    public static synchronized MyApplication getInstance() {
        return mInstance;
    }
 
    public RequestQueue getRequestQueue() {
        if (mRequestQueue == null) {
            mRequestQueue = Volley.newRequestQueue(getApplicationContext());
        }
 
        return mRequestQueue;
    }
 
    public <T> void addToRequestQueue(Request<T> req, String tag) {
        // set the default tag if tag is empty
        req.setTag(TextUtils.isEmpty(tag) ? TAG : tag);
        getRequestQueue().add(req);
    }
 
    public <T> void addToRequestQueue(Request<T> req) {
        req.setTag(TAG);
        getRequestQueue().add(req);
    }
 
    public void cancelPendingRequests(Object tag) {
        if (mRequestQueue != null) {
            mRequestQueue.cancelAll(tag);
        }
    }
}
```
6. Mở AndroidManifest.xml  cấpinternet permission
```
AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.androidhive.recaptcha">
 
    <uses-permission android:name="android.permission.INTERNET" />
 
    <application
        android:name=".MyApplication">
    </application>
 
</manifest>
```
7. Cuối cùng, mở **MainActivity.java** và thay đổi code như dưới đây.
- Thay đổi ****SAFETY\_NET\_API\_SITE\_KEY**** với SafetyNet  Site Key của bạn
-  Thay thế **URL\_VERIFY\_ON_SERVER**  với server URL. 
-   **https://api.androidhive.info/google-recaptcha-verfication.php**  là url server của tôi, chỉ làm việc với app này. bạn sẽ thấy code bên dưới và tạo server riêng cho bạn.
-   **validateCaptcha()**  hiển thị Captcha dialog và fetches  **User Response Token** nó sẽ gửi token đến server của bạn để validation.
-   **verifyTokenOnServer()**  method gửi  User Response Token đến server để validating nó sử dụng Secret. Server sẽ making POST request đến **https://www.google.com/recaptcha/api/siteverify**  và validates  token.
-   Khi token được validated trên server, server của bạn phản hồi JSON với success status. Bạn cần thực hiện hành động tùy thuộc và success status.
```
MainActivity.java
package info.androidhive.recaptcha;
 
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
 
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.safetynet.SafetyNet;
import com.google.android.gms.safetynet.SafetyNetApi;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
 
import org.json.JSONException;
import org.json.JSONObject;
 
import java.util.HashMap;
import java.util.Map;
 
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
 
public class MainActivity extends AppCompatActivity {
 
    private static final String TAG = MainActivity.class.getSimpleName();
 
    // TODO - replace the SITE KEY with yours
    private static final String SAFETY_NET_API_SITE_KEY = "6Lf8z0sUAAAAAP80KqD1U-3e7M_JlOrgWSms5XDd";
 
    // TODO - replace the SERVER URL with yours
    private static final String URL_VERIFY_ON_SERVER = "https://api.androidhive.info/google-recaptcha-verfication.php";
 
    @BindView(R.id.input_feedback)
    EditText inputFeedback;
 
    @BindView(R.id.layout_feedback_form)
    LinearLayout layoutFeedbackForm;
 
    @BindView(R.id.message_feedback_done)
    TextView messageFeedbackDone;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
 
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle(getString(R.string.feedback));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
 
        Toast.makeText(getApplicationContext(), "Always check Android Studio `LogCat` for errors!", Toast.LENGTH_LONG).show();
    }
 
    @OnClick(R.id.btn_send)
    public void validateCaptcha() {
 
        String feedback = inputFeedback.getText().toString().trim();
        // checking for empty feedback message
        if (TextUtils.isEmpty(feedback)) {
            Toast.makeText(getApplicationContext(), "Enter feedback!", Toast.LENGTH_LONG).show();
            return;
        }
 
        // Showing reCAPTCHA dialog
        SafetyNet.getClient(this).verifyWithRecaptcha(SAFETY_NET_API_SITE_KEY)
                .addOnSuccessListener(this, new OnSuccessListener<SafetyNetApi.RecaptchaTokenResponse>() {
                    @Override
                    public void onSuccess(SafetyNetApi.RecaptchaTokenResponse response) {
                        Log.d(TAG, "onSuccess");
 
                        if (!response.getTokenResult().isEmpty()) {
 
                            // Received captcha token
                            // This token still needs to be validated on the server
                            // using the SECRET key
                            verifyTokenOnServer(response.getTokenResult());
                        }
                    }
                })
                .addOnFailureListener(this, new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        if (e instanceof ApiException) {
                            ApiException apiException = (ApiException) e;
                            Log.d(TAG, "Error message: " +
                                    CommonStatusCodes.getStatusCodeString(apiException.getStatusCode()));
                        } else {
                            Log.d(TAG, "Unknown type of error: " + e.getMessage());
                        }
                    }
                });
    }
 
    /**
     * Verifying the captcha token on the server
     * Post param: recaptcha-response
     * Server makes call to https://www.google.com/recaptcha/api/siteverify
     * with SECRET Key and Captcha token
     */
    public void verifyTokenOnServer(final String token) {
        Log.d(TAG, "Captcha Token" + token);
 
        StringRequest strReq = new StringRequest(Request.Method.POST,
                URL_VERIFY_ON_SERVER, new Response.Listener<String>() {
 
            @Override
            public void onResponse(String response) {
                Log.d(TAG, response.toString());
 
                try {
                    JSONObject jsonObject = new JSONObject(response);
                    boolean success = jsonObject.getBoolean("success");
                    String message = jsonObject.getString("message");
 
                    if (success) {
                        // Congrats! captcha verified successfully on server
                        // TODO - submit the feedback to your server
 
                        layoutFeedbackForm.setVisibility(View.GONE);
                        messageFeedbackDone.setVisibility(View.VISIBLE);
                    } else {
                        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(getApplicationContext(), "Json Error: " + e.getMessage(), Toast.LENGTH_LONG).show();
                }
 
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, "Error: " + error.getMessage());
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                params.put("recaptcha-response", token);
 
                return params;
            }
        };
 
        MyApplication.getInstance().addToRequestQueue(strReq);
    }
}
```
![](https://images.viblo.asia/81c9b78f-1d18-4dac-a0e4-8be0c19be500.png)
## Server validating Captcha Token sử dụng PHP
```
google-recaptcha-verfication.php
<?php
$ch = curl_init();
 
// TODO - Define your SafetyNet Secret in the below line
$secretKey = 'Place your SafetyNet Secret here';
$captcha = isset($_POST['recaptcha-response']) && !empty($_POST['recaptcha-response']) ? $_POST['recaptcha-response']: '';
 
curl_setopt_array($ch, [
    CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => [
        'secret' => $secretKey,
        'response' => $captcha,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ],
    CURLOPT_RETURNTRANSFER => true
]);
 
$output = curl_exec($ch);
curl_close($ch);
 
$json = json_decode($output);
$res = array();
 
if($json->success){
    $res['success'] = true;
    $res['message'] = 'Captcha verified successfully!';
}else{
    $res['success'] = false;
    $res['message'] = 'Failed to verify captcha!';
}
 
echo json_encode($res);
?>
```
Have a nice day 🙂