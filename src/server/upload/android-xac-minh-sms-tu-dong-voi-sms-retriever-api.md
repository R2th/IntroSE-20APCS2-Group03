# I. Tổng quan
Như chúng ta biết mỗi phiên bản nâng cấp của Android đều đang trở nên an toàn và bảo mật hơn rất nhiều, do vậy gần đây Google đã thông báo rằng nhóm của họ sẽ sớm bắt đầu xóa các ứng dụng yêu cầu nhật ký cuộc gọi và tin nhắn SMS khỏi Play Store. 

Hãy tưởng tượng một ứng dụng chỉ có chức năng duy nhất cần đến truy xuất tin nhắn là đọc tin nhắn OTP trả về để xác thực, và phần còn lại của ứng dụng không sử dụng tính năng đọc SMS nữa. Trong trường hợp này, thật là lãng phí tài nguyên & thời gian và tất nhiên cả các dòng code để kiểm tra quyền SMS

Từ Android M (Marshmallow) trở đi, quyền hệ thống đã được chia thành nhiều cấp độ bảo vệ.
* Normal Permissions (Các quyền bình thường)
* Dangerous Permissions (Các quyền nguy hiểm)
* Signature Permissions (Các quyền chữ ký)
* Special Permissions (Các quyền đặc biệt)

Trong trường hợp thông thường, nếu bạn muốn chọn xác minh người dùng dựa trên SMS, bạn cần đọc mật khẩu một lần từ SMS và điền vào đó. Vì vậy, để đọc được SMS nhận được, bạn cần sử dụng quyền SMS, nhưng vì nó thuộc danh mục ‘dangerous permission’ , nó không nhất thiết là cách tiếp cận đúng do vấn đề bảo mật. 

Google thực tế đã bắt đầu chặn các ứng dụng như vậy. Để giải quyết vấn đề này, Google đã giới thiệu **SMS Retriever API**. Với SMS Retriever API, bạn có thể tự động thực hiện xác minh người dùng dựa trên SMS trong ứng dụng Android của mình mà không yêu cầu người dùng nhập mã xác minh theo cách thủ công và không yêu cầu thêm bất kỳ quyền ứng dụng nào. 

![](https://images.viblo.asia/49bc8028-ee5b-429b-8de5-ba3c9977d783.png)

> 1. Một người dùng bắt đầu xác minh SMS trong ứng dụng của bạn. Ứng dụng của bạn có thể nhắc người dùng cung cấp số điện thoại hoặc sử dụng công cụ chọn gợi ý Khóa thông minh cho mật khẩu nếu thông tin đó không bắt buộc để tạo tài khoản người dùng.
> 2. Ứng dụng của bạn yêu cầu máy chủ của bạn xác minh số điện thoại của người dùng. Tùy thuộc vào thông tin nào có sẵn trong cơ sở dữ liệu người dùng của bạn, yêu cầu này có thể bao gồm ID người dùng, số điện thoại của người dùng hoặc cả hai.
> 3. Đồng thời, ứng dụng của bạn gọi API SMS Retriever để bắt đầu nghe phản hồi SMS từ máy chủ của bạn.
> 4. Máy chủ của bạn gửi tin nhắn SMS đến người dùng bao gồm mã một lần được gửi lại cho máy chủ của bạn và hàm băm xác định ứng dụng của bạn.
> 5. Khi thiết bị của người dùng nhận được tin nhắn SMS, các dịch vụ Google Play sẽ sử dụng hàm băm ứng dụng để xác định rằng tin nhắn đó được dành cho ứng dụng của bạn và làm cho văn bản tin nhắn có sẵn cho ứng dụng của bạn thông qua API Retriever SMS.
> 6. Ứng dụng của bạn phân tích mã một lần từ văn bản tin nhắn và gửi lại cho máy chủ của bạn.
> 7. Máy chủ của bạn nhận được mã một lần từ ứng dụng của bạn, xác minh mã và cuối cùng ghi lại rằng người dùng đã xác minh thành công tài khoản của họ.

# II. Tích hợp SMS Retriever API
Điều kiện tiên quyết: SMS Retriever API chỉ khả dụng trên các thiết bị Android có Play services phiên bản 10.2 trở lên.
## 1. Tích hợp google play service

```
implementation 'com.google.android.gms:play-services-base:16.0.1'
implementation 'com.google.android.gms:play-services-identity:16.0.0'
implementation 'com.google.android.gms:play-services-auth:16.0.1'
implementation 'com.google.android.gms:play-services-auth-api-phone:16.0.0'
```

## 2. Lấy số điện thoại của người dùng

Bạn có thể lấy số điện thoại của người dùng theo bất kỳ cách nào phù hợp với ứng dụng của bạn. Thông thường, đó là trải nghiệm người dùng tốt nhất để sử dụng trình chọn gợi ý để nhắc người dùng chọn từ các số điện thoại được lưu trên thiết bị và do đó tránh phải nhập số điện thoại theo cách thủ công. Để sử dụng công cụ chọn gợi ý:
```
// Construct a request for phone numbers and show the picker
private void requestHint() {
    HintRequest hintRequest = new HintRequest.Builder()
           .setPhoneNumberIdentifierSupported(true)
           .build();

    PendingIntent intent = Auth.CredentialsApi.getHintPickerIntent(
            apiClient, hintRequest);
    startIntentSenderForResult(intent.getIntentSender(),
            RESOLVE_HINT, null, 0, 0, 0);
}

// Obtain the phone number from the result
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  if (requestCode == RESOLVE_HINT) {
      if (resultCode == RESULT_OK) {
          Credential credential = data.getParcelableExtra(Credential.EXTRA_KEY);
          // credential.getId();  <-- will need to process phone number string
      }
  }
}
```

## 3. Bắt đầu truy xuất SMS
Khi bạn đã sẵn sàng để xác minh số điện thoại của người dùng, sử dụng instance cua `SmsRetrieverClient` object, thực hiện gọi hàm `startSmsRetriever` và lắng nghe callback onSuccess/onFailure của Task. 
```
// Get an instance of SmsRetrieverClient, used to start listening for a matching
// SMS message.
SmsRetrieverClient client = SmsRetriever.getClient(this /* context */);

// Starts SmsRetriever, which waits for ONE matching SMS message until timeout
// (5 minutes). The matching SMS message will be sent via a Broadcast Intent with
// action SmsRetriever#SMS_RETRIEVED_ACTION.
Task<Void> task = client.startSmsRetriever();

// Listen for success/failure of the start Task. If in a background thread, this
// can be made blocking using Tasks.await(task, [timeout]);
task.addOnSuccessListener(new OnSuccessListener<Void>() {
  @Override
  public void onSuccess(Void aVoid) {
    // Successfully started retriever, expect broadcast intent
    // ...
  }
});

task.addOnFailureListener(new OnFailureListener() {
  @Override
  public void onFailure(@NonNull Exception e) {
    // Failed to start retriever, inspect Exception for more details
    // ...
  }
});
```
Tác vụ truy xuất SMS được bắt đầu khi SMS cần được lắng nghe. SmsRetrieverClient đợi trong 5 phút cho một tin nhắn sms phù hợp. SMSRetrieverClient không thể được hủy đăng ký vì nó tự động hết thời gian sau 5 phút, vì vậy cần phải cẩn thận nếu activity finish trước 5 phút và trước khi nhận được SMS.
## 4. Nhận tin nhắn xác minh
Sử dụng BroadcastReceiver để nhận thông báo xác minh. Khi SMS nhận được trên thiết bị của người dùng, Play services sẽ bắn tới ứng dụng 1 Intent `SmsRetriever.SMS_RETRIEVED_ACTION`, trong đó có chứa văn bản của tin nhắn.
```
/**
 * BroadcastReceiver to wait for SMS messages. This can be registered either
 * in the AndroidManifest or at runtime.  Should filter Intents on
 * SmsRetriever.SMS_RETRIEVED_ACTION.
 */
public class MySMSBroadcastReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    if (SmsRetriever.SMS_RETRIEVED_ACTION.equals(intent.getAction())) {
      Bundle extras = intent.getExtras();
      Status status = (Status) extras.get(SmsRetriever.EXTRA_STATUS);

      switch(status.getStatusCode()) {
        case CommonStatusCodes.SUCCESS:
          // Get SMS message contents
          String message = (String) extras.get(SmsRetriever.EXTRA_SMS_MESSAGE);
          // Extract one-time code from the message and complete verification
          // by sending the code back to your server.
          break;
        case CommonStatusCodes.TIMEOUT:
          // Waiting for SMS timed out (5 minutes)
          // Handle the error ...
          break;
      }
    }
  }
}
```

Bạn cần đăng ký BroadcastReceiver này trong Manifest
```
<receiver android:name=".SMSBroadcastReceiver" android:exported="true">
    <intent-filter>
        <action android:name="com.google.android.gms.auth.api.phone.SMS_RETRIEVED"/>
    </intent-filter>
</receiver>
```

Broadcast Receiver cũng có thể register tại activity hoặc fragment

## 5. Optional: Lưu số điện thoại bằng Smart Lock cho mật khẩu
Ngoài ra, sau khi người dùng đã xác minh số điện thoại của họ, Bạn có thể nhắc người dùng lưu tài khoản số điện thoại này bằng Smart Lock cho mật khẩu để nó sẽ tự động có sẵn trong các ứng dụng khác và trên các thiết bị khác mà không cần phải nhập hoặc chọn lại số điện thoại
```
Credential credential = new Credential.Builder(phoneNumberString)
        .setAccountType("https://signin.example.com")  // a URL specific to the app
        .setName(displayName)  // optional: a display name if available
        .build();
Auth.CredentialsApi.save(apiClient, credential).setResultCallback(
            new ResultCallback() {
                public void onResult(Result result) {
                    Status status = result.getStatus();
                    if (status.isSuccess()) {
                        Log.d(TAG, "SAVE: OK");  // already saved
                    } else if (status.hasResolution()) {
                        // Prompt the user to save
                        status.startResolutionForResult(this, RC_SAVE);
                    }
                }
            });
```

Sau đó, sau khi người dùng cài đặt lại ứng dụng hoặc cài đặt ứng dụng trên thiết bị mới, bạn có thể truy xuất số điện thoại đã lưu mà không cần hỏi lại người dùng về số điện thoại của họ:
```
// On the next install, retrieve the phone number
mCredentialRequest = new CredentialRequest.Builder()
    .setAccountTypes("https://signin.example.com")  // the URL specific to the developer
    .build();
Auth.CredentialsApi.request(apiClient, mCredentialRequest).setResultCallback(
    new ResultCallback<CredentialRequestResult>() {
        public void onResult(CredentialRequestResult credentialRequestResult) {
            if (credentialRequestResult.getStatus().isSuccess()) {
                credentialRequestResult.getCredential().getId();  // this is the phone number
            }
        }
    });

// Then, initiate verification and sign the user in (same as original verification logic)
```

# III. Tham khảo
Mọi người có thể tham khảo thêm tại:

https://developers.google.com/identity/sms-retriever/overview

https://medium.com/@sampadasalimath14/sms-retriever-api-for-automatic-sms-verification-e029cc501b1f