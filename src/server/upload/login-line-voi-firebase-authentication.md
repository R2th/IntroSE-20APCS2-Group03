Ngày nay, khi sử dụng một dịch vụ online online, chúng ta có xu hướng sử dụng một tài khoản liên kết (Google, Facebook, Twitter... tạm gọi là **bên thứ 3**) để đăng nhập vào dịch vụ đó thay vì cứ mỗi một dịch vụ, ta lại tạo một account/passord riêng. 

Bạn là một develop phát triển một service, để cung cấp tính năng này cho người dùng, bạn sẽ phải mất rất nhiều effort để "tự" liên kết các **bên thứ 3** vào trong app của mình. 

Lúc này `Firebase Authentication` (từ đây sẽ gọi tắt là Firebase) sẽ là một giải pháp! 

`Firebase` hỗ trợ hầu hết các nhà cung cấp liên kết login (ngoài Google, Facebook, còn cả Github, Yahoo nữa...). Việc chúng ta cần làm đó là tích hợp `Firebase`, phần còn lại `Firebase` sẽ lo tất :yum:

User ở mỗi quốc gia, lại chuộng các nhà cung cấp login khác nhau. Với Nhật - một Khách Hàng lớn của đa số anh em dev chúng ta, lại chuộng login với mạng xã hội [LINE Login](https://developers.line.me/line-login/overview). Tuy nhiên hiện tại Firebase chưa hỗ trợ login với LINE anh em ạ. 

Song ta vẫn có cách! 

Bài viết này mình sẽ giới thiệu một cách để tích hợp LINE login với Firebase sử dụng **Custom Auth**!

## Sơ đồ tổng quát

[![img](https://3.bp.blogspot.com/-qtdENOy0gfU/WCUA6OEe0GI/AAAAAAAAAlE/iSrF0al_40Ax9rmT1RMDA4KncpBVi87OQCLcB/s1600/image00.png)](https://3.bp.blogspot.com/-qtdENOy0gfU/WCUA6OEe0GI/AAAAAAAAAlE/iSrF0al_40Ax9rmT1RMDA4KncpBVi87OQCLcB/s1600/image00.png)

Luồng login sẽ gồm 3 bước: 

Bước 1: Sử dụng LINE Login SDK để User login, và nhận `LINE Access Token` trả về

Bước 2: Gửi `LINE Access Token` lên server của bạn, xác thực `LINE Access Token` với LINE server. Nếu token hợp lệ, tạo `Firebase Custom Auth token` tương ứng với *user* đó rồi gửi ngược về thiết bị của user. 

Bước 3: Sử dụng `Firebase Custom Auth token` để login vào Firebase từ thiết bị của user.

## Cùng xem ví dụ code nhá~

### Bước 0. chuẩn bị 

Đầu tiên, cần setup LINE Business account và Project trên Firebase.

- Để tạo LINE Business account, bạn xem tại [đây](https://account.line.biz/signup)
- Tiếp theo, cài library Firebase Authentication library vào app ([iOS](https://firebase.google.com/docs/ios/setup) / [Android](https://firebase.google.com/docs/android/setup?utm_campaign=Firebase_culture_education_general_en_11-10-16&utm_source=Firebase&utm_medium=blog))
- Để tạo `Custom Auth token` ta có thể dùng [Server SDK](https://firebase.google.com/docs/server/setup) hoặc thư viện *JSON Web Token* là đủ.

### Bước 1. Login vào LINE

Các bạn có thể xem docs của LINE: ([iOS](https://developers.line.me/ios/development-with-sdk) / [Android](https://developers.line.me/android/development-with-sdk#login)) để được hướng dẫn cách tích hợp LINE SDK và implement luồng login với LINE. 

Sau khi user login thành công, ta sẽ lấy được `LINE access token`

**iOS (Objective-C)**

```cpp
NSString *lineAccessToken = self.lineAdapter.getLineApiClient.accessToken;
```

**Android**

```
LineAuthManager authManager = LineSdkContextManager.getSdkContext().getAuthManager();
final String accessToken = authManager.getAccessToken().accessToken;
```

Sau đó, bạn có thể sử dụng cách thức bạn hay dùng để gửi access token này lên server của bạn để tiếp tục bước xác thực. Trong ví dụ này, mình sử dụng [GTM HTTP Fetcher](https://github.com/google/gtm-http-fetcher) cho iOS và [Volley](https://developer.android.com/training/volley/index.html) cho Android.

**iOS (Objective-C)**

```cpp
NSURL *url = [NSURL URLWithString:@"https:///verifyToken"];
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"content-type"];

NSDictionary *token = @{@"token" : lineAccessToken};
NSError *error;
NSData *requestBody = [NSJSONSerialization dataWithJSONObject:token
                                    options:kNilOptions error:&error];
[request setHTTPBody:requestBody];
GTMHTTPFetcher *fetcher = [GTMHTTPFetcher fetcherWithRequest:request];
[fetcher beginFetchWithCompletionHandler:^(NSData *data, NSError *error) {
    if (!error) {
       // Extract Firebase Custom Auth token from response
       // ・・・
    }
}];
```

**Android**

```java
HashMap validationObject = new HashMap<>();
validationObject.put("token", accessToken);
Response.Listener responseListener = new Response.Listener() {
   @Override
   public void onResponse(JSONObject response) {
       // Extract Firebase Custom Auth token from response
       // ・・・
   }
};
JsonObjectRequest fbTokenRequest = new JsonObjectRequest(
       Request.Method.POST,
       "https:///verifyToken",
       new JSONObject(validationObject),
       responseListener, errorListener);

NetworkSingleton.getInstance(activity).addToRequestQueue(fbTokenRequest);
```

### Bước 2. Tạo Firebase Custom Auth Token tương ứng từ LINE Access Token 

Server của bạn sẽ làm nhiệm vụ kiểm chứng tính hợp lệ của `LINE access token` sử dụng *LINE Social Rest API*. Nếu token hợp lệ thì tạo `Firebase Custom Auth token` cho user LINE đó. 

> Chú ý: Đừng quên kiểm chứng giá trị *channelId* nhận được từ LINE API, để chắc chắn là access token đó được phát hành cho app của bạn. Điều này giúp ngăn chặn spoof attack. Hacker có thể sử dụng lại access token của hắn mà dành cho app khác để thử login vào app của chúng ta. 
**Server (Node.js)**

```javascript
app.post('/verifyToken', (req, res) => {
  if (!req.body.token) {
    return res.status(400).send('Access Token not found');
  }
  const reqToken = req.body.token;

  // Send request to LINE server for access token verification
  const options = {
    url: 'https://api.line.me/v1/oauth/verify',
    headers: {
      'Authorization': `Bearer ${reqToken}`
    }
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const lineObj = JSON.parse(body);
       // Don't forget to verify the token's channelId to prevent spoof attack
      if ((typeof lineObj.mid !== 'undefined') 
               && (lineObj.channelId === myLINEChannelId)) {
        // Access Token Validation succeed with LINE server
        // Generate Firebase token and return to device
        const firebaseToken = generateFirebaseToken(lineObj.mid);

        // Update Firebase user profile with LINE profile
        updateUserProfile(reqToken, firebaseToken, lineObj.mid, () => {
          const ret = {
            firebase_token: firebaseToken
          };
          return res.status(200).send(ret);
        });
      }
    }

    const ret = {
      error_message: 'Authentication error: Cannot verify access token.'
    };
    return res.status(403).send(ret);
     
    });

  }
});
```

Sau khi kiếm chứng LINE Access Token là hợp lệ, sử dụng `Firebase Server SDK` để tạo ra `Firebase Custom Auth token` tương ứng rồi trả về cho thiết bị của user.

**Server (Node.js)**

```javascript
function generateFirebaseToken(lineMid) {
  var firebaseUid = 'line:' + lineMid;
  var additionalClaims = {
    provider: 'LINE'
  };
  return firebase.auth().createCustomToken(firebaseUid);
}
```

### Login đến Firebase sử dụng Custom Auth token

Tại phía thiết bị của user, sau khi nhận được Firebase Custom Auth token, chỉ cần dùng nó để login user vào Firebase là DONE!

**iOS (Objective-C)**

```cpp
[[FIRAuth auth] signInWithCustomToken:firebaseToken 
             completion:^(FIRUser * _Nullable user, NSError * _Nullable error) {
        // Process sign in result
        // ・・・
    }];
```

**Android**

```java
FirebaseAuth.getInstance()
    .signInWithCustomToken(firebaseToken)
    .addOnCompleteListener(new OnCompleteListener() {
        // Process sign in result
        // ・・・
    });
```

*Bài viết gốc: https://firebase.googleblog.com/2016/11/authenticate-your-firebase-users-with-line-login.html*