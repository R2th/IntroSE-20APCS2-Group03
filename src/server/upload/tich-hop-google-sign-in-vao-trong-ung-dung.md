Trước khi bạn bắt đầu tích hợp Google Sign-in vào trong ứng dụng của bạn, Bạn phải cấu hình Google API Console và thiết lập trong project của bạn ở Android Studio. Chúng ta sẽ qua từng bước làm sao để tích hợp Google Sign-in vào trong ứng dụng.

**Điều kiện :**

Google Sign-In cho Android có những yêu cầu như sau :

1. Thiết bị android tương thích  chạy Android 4.0 hoặc là mới hơn và bao gồm Google Play Store hoặc máy ảo với AVD chạy Google APIs platform dự vào Android 4.2.2 hoặc mới hơn nữa và có Google Play Services phiên bản 15.0.0 hoặc là mới hơn
2. Phiên bản mới nhất của Android SDK, bao gồm bộ công cụ SDK.  SDK thì có sẵn trong Android SDK Manager trong Android Studio. 

3. Ứng dụng được cấu hình để biên dịch dự vào Android 4.0 (Ice Cream Sandwich) hoặc là mới hơn

**Google services SDK:**
1) Trong Android Studio, Lựa chọn Tools -> Android -> SDK Manager
2) Di chuyển tới cuối của danh sách và lựa chọn Extras -> Google Repository. Package được tải tới máy tính của bạn và cài vào trong môi trường SDK của bạn tại  andorid-sdk-folder/extras/google/google_play_services

**Thêm Google Play Services**

Trong ứng dụng của bạn top-level build.gradle. Chắc chắn rằng Google`s Maven repository đã trong đó:
```

allprojects {
    repositories {
        google()

        // If you're using a version of Gradle lower than 4.1, you must instead use:
        // maven {
        //     url 'https://maven.google.com'
        // }
    }
}
```

Thêm Google Play Service vào ứng dụng của bạn:

        `compile 'com.google.android.gms:play-services-auth:15.0.1'`
 
**Cấu hình Google API Console**

Để cấu hình Google API Console . Bạn vào[ link](https://developers.google.com/identity/sign-in/android/start-integrating) để thiệt lập tại mục **Configure a Google API Console project** . Bạn sẽ cần cung cấp SHA-1 xác thực. Đây là link để lấy SHA-1 từ máy tính của bạn : https://developers.google.com/android/guides/client-auth

Sau khi bạn nhấn vào sẽ thấy mục "Enter new project name" như hình bên dưới :
![](https://images.viblo.asia/c44ef64f-9c13-4f09-a8e3-e72a1df16208.png)

Sau khi bạn nhấn next sẽ hiện lên hộp thoại tiếp theo :
![](https://images.viblo.asia/915b3aa1-d606-4498-a273-ed151f2356d2.png)

Bạn lấy SHA1 trên máy bạn trước . Đây là dưới máy của mình :
![](https://images.viblo.asia/4a08dbae-e1ea-46a8-9c1a-cead3cd8ce65.png)

Sau đó bạn dán SHA1 của bạn vào trong hộp thoại:
![](https://images.viblo.asia/31c510d6-eb94-4390-995f-1d04875d5521.png)

Sau khi hoàn thành bạn tải file về bạn thêm nó vào project của bạn.

### **Thêm Google Sign-In tới ứng dụng Android của bạn**

**Cấu hình Google Sign-in**

```

// Configure sign-in to request the user's ID, email address, and basic
// profile. ID and basic profile are included in DEFAULT_SIGN_IN.
GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestEmail()
        .build();


// Build a GoogleSignInClient with the options specified by gso.
mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
```

Sau đó, khi bạn click Sign-in Button, sẽ bắt đầu Sign-in Intent.
```

private void signIn() {
    Intent signInIntent = mGoogleSignInClient.getSignInIntent();
    startActivityForResult(signInIntent, RC_SIGN_IN);
}
```

Người sử dụng có thể lựa chọn Google Account nào khi Sign-In. Nếu bạn yêu cầu phạm vi: profile, email and openid . Người dùng cũng được nhắc cấp quyền truy cập vào các tài nguyên được yêu cầu.

Cuối cùng là chúng ta xử lý ở Activity Result 

```

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
    if (requestCode == RC_SIGN_IN) {
        // The Task returned from this call is always completed, no need to attach
        // a listener.
        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
        handleSignInResult(task);
    }
}

private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
    try {
        GoogleSignInAccount account = completedTask.getResult(ApiException.class);

        // Signed in successfully, show authenticated UI.
        updateUI(account);
    } catch (ApiException e) {
        // The ApiException status code indicates the detailed failure reason.
        // Please refer to the GoogleSignInStatusCodes class reference for more information.
        Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
        updateUI(null);
    }
}
```



Tài liệu tham khảo : https://developers.google.com/identity/sign-in/android/start-integrating
Source tham khảo bạn có thể lấy từ những Sample của Google như : https://github.com/googlesamples/google-services.git