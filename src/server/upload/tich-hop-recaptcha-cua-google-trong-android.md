API reCaptcha của Google bảo vệ trang web, ứng dụng của bạn khỏi lưu lượng truy cập độc hại. Bạn cũng có thể tích hợp trong các ứng dụng Android của mình bằng cách sử dụng API SafetyNet. Dịch vụ này là miễn phí,  và nó sẽ hiển thị một Captcha nếu có nghi ngờ tương tác người dùng là một bot thay vì con người.

Trong bài viết này, chúng tôi sẽ xây dựng một demo phản hồi đơn giản và tích hợp hình ảnh xác thực để tránh việc gửi dữ liệu của các bot. Không chỉ là gửi dữ liệu, bạn có thể tích hợp hình ảnh xác thực trong bất kỳ mô-đun nào trong ứng dụng của mình.

{@youtube:https://www.youtube.com/watch?v=lzxg3diCNqM}

# 1. reCAPTCHA làm việc như thế nào?

ReCAPTCHA sẽ được xác thực bằng cách thực hiện việc gọi API giữa ứng dụng, máy chủ SafetyNet và máy chủ của bạn.

- Trước tiên, bạn cần lấy cặp khóa SafetyNet bằng cách đăng ký ứng dụng của bạn. Bạn sẽ nhận được Key Site và Secret Key.
- Key Site sẽ được tích hợp trong ứng dụng android và nó có thể được public. Secret Keynên được lưu trên máy chủ của bạn và không nên để lộ thông tin đó.
- Khi reCaptcha được gọi, nó sẽ hiển thị Captcha cho người dùng nếu cần thiết. Trong bước này, nó giao tiếp với máy chủ captcha và trả về mã thông báo phản hồi người dùng bằng cách sử dụng Key Site.
- Khi nhận được User Response Token, nó vẫn cần phải được xác thực trên máy chủ bằng cách sử dụng Secret key.
- Từ ứng dụng dành cho thiết bị di động, User Response Token sẽ được gửi tới máy chủ của bạn. Từ máy chủ, User Response Token sẽ được gửi đến máy chủ SafetyNet cùng với Secret Key. Khi máy chủ SafetyNet xác thực mã thông báo, nó sẽ thông báo cho máy chủ của bạn về trạng thái thành công.
- Cuối cùng, máy chủ của bạn sẽ thông báo cho ứng dụng di động với trạng thái captcha tức là thành công hay thất bại.

![](https://images.viblo.asia/04cbd192-11aa-4568-ae37-8c438cea875c.png)

# 2. Obtaining SafetyNet Site Key and Secret

Làm theo các bước dưới đây để lấy Site Key và Secret Key.

- Vào trang đăng ký reCaptcha và đăng ký ứng dụng của bạn.
- Nhập nhãn để xác định khóa. Bạn có thể đặt tên ứng dụng hoặc tên màn hình của mình.
- Chọn loại reCaptcha. Tôi chọn reCaptcha Android.
- Nhập package ứng dụng của bạn. Bạn có thể nhập nhiều tên gói ứng dụng cho cùng một khóa.
- Chấp nhận Điều khoản dịch vụ và nhấp vào Đăng ký. Sau khi đăng ký, bạn có thể thấy Key Site và Secret Key hiển thị trên màn hình cùng với mã mẫu.

# 3. Tạo dự án demo
## 3.1. Bước 1 
Tạo một dự án mới trong Android Studio từ File ⇒ New Project và chọn Basic Activity. Trong khi tạo, hãy sử dụng package name đã đăng ký trên trang reCAPTCHA.

## 3.2. Bước 2 
Thêm dependency Safetynet vào build.gradle của bạn và rebuild lại dự án. Tôi cũng bổ sung thêm các dependency của Volley và ButterKnife. Volley được sử dụng để gửi việc gọi HTTP tới máy chủ của  tôi để xác thực mã thông báo xác thực ở phía máy chủ.

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

## 3.3. Bước 3
Thêm các resources bên dưới vào file colors.xml tương ứng, strings.xml và dimens.xml.

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

## 3.4. Bước 4
Mở file layout (activity_main.xml và content_main.xml) và thêm đoạn code ở dưới.

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
content_main.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="@dimen/activity_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="info.androidhive.recaptcha.MainActivity"
    tools:showIn="@layout/activity_main">
 
    <LinearLayout
        android:id="@+id/layout_feedback_form"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">
 
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/title_form"
            android:textColor="#666666"
            android:textSize="20dp"
            android:textStyle="bold" />
 
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@string/desc_form" />
 
        <EditText
            android:id="@+id/input_feedback"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/activity_margin"
            android:gravity="top"
            android:hint="@string/hint_feedback"
            android:lines="5" />
 
        <Button
            android:id="@+id/btn_send"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/activity_margin"
            style="@style/Widget.AppCompat.Button.Colored"
            android:text="@string/btn_send"
            android:textColor="@android:color/white" />
 
    </LinearLayout>
 
    <TextView
        android:id="@+id/message_feedback_done"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="40dp"
        android:gravity="center"
        android:padding="@dimen/activity_margin"
        android:text="@string/message_feedback_done"
        android:textSize="22dp"
        android:visibility="gone" />
 
</LinearLayout>
```

## 3.5. Bước 5 
Tạo 1 class với tên là MyApplication.java kế thừa từ Application. Trong class này, Volley singleton instances được tạo ra.

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

## 3.6. Bước 6 
Mở AndroidManifest.xml và thêm MyApplication vào thẻ <application>. Và thêm quyền INTERNET.
    
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

## 3.7. Bước 7
Cuối cùng mở MainActivity.java và thực hiện các thay đổi như hình dưới đây.

Thay thế giá trị SAFETY_NET_API_SITE_KEY bằng SafetyNet Key của bạn
Thay thế giá trị URL_VERIFY_ON_SERVER bằng URL máy chủ của bạn. Url này xác thực khóa xác thực vì nó chứa Secret Key cho package.
https://api.androidhive.info/google-recaptcha-verfication.php là url của máy chủ của tôi, chỉ hoạt động cho ứng dụng này. Bạn sẽ thấy mã của endpoint.
validateCaptcha () hiển thị hộp thoại Captcha và lấy phản hồi của người dùng được gửi đến máy chủ của bạn để xác thực.
Phương thức verifyTokenOnServer () gửi Mã thông báo phản hồi người dùng đã nhận tới máy chủ để xác thực nó bằng cách sử dụng Secret Key. Máy chủ tạo ra phương thức POST tới https://www.google.com/recaptcha/api/sitexác và xác thực mã thông báo.
Khi mã thông báo được xác thực trên máy chủ, máy chủ của bạn sẽ trả lời JSON có trạng thái thành công. Bạn cần thực hiện thêm tùy thuộc vào trạng thái thành công. Trong trường hợp này, phản hồi phải được gửi.

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

Chạy và kiểm tra ứng dụng một lần. Nếu ứng dụng không hoạt động, hãy kiểm tra bạn đang sử dụng tên package, cặp key và endpoint máy chủ.

![](https://images.viblo.asia/f1391d6c-80d6-496f-86d9-5496bed6cb7d.png)

# 4. Validating Captcha Token on Server using PHP

Dưới đây là mã PHP để xác thực mã thông báo xác thực trên máy chủ. Bạn có thể sử dụng Secret Key của mình và lưu trữ mã này trên máy chủ để làm cho mã hoạt động cho ứng dụng của bạn.

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

[Source](https://www.androidhive.info/2018/04/android-recaptcha-safetynet/)