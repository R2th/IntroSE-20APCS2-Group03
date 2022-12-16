Hôm nay chúng ta sẽ tìm hiểu cách sử dụng Firebase để xác thực số điện thoại bằng tin nhắn.

## Setup
- Đầu tiên chúng ta cần phải tạo mới một project trên [Firebase Console](https://console.firebase.google.com/) để có thể sử dụng dịch vụ của firebase vào ứng dụng.
 
![](https://images.viblo.asia/7af4702c-6e51-42b7-be9d-1552e0205e36.PNG)

- Sau khi đã tạo project và config trong ứng dụng, chúng ta sẽ thiết lập để kích hoạt chức năng năng cho việc xác thực.

 ![](https://images.viblo.asia/03ec46c8-5ee0-42d2-9d44-af8541bcca2e.PNG)

## Coding !
- Tổng quan về ứng dụng của chúng ta sẽ có một màn hình để nhập số điện thoại và sau đó sẽ hiện dialog lên để người dùng nhập code như sau:

![](https://images.viblo.asia/7f17898a-be2a-48f2-8949-2c471f8aee18.png)![](https://images.viblo.asia/511043b4-bf0a-41fa-8b78-2cca86ab5aaf.png)

- Để server firebase gửi tin nhắn đến người dùng, ta sẽ sử dụng phương thức `verifyPhoneNumber` trong  instance `PhoneAuthProvider`  và config các tham số như sau:
```
PhoneAuthProvider.getInstance().verifyPhoneNumber(
    "+84${editTextPhoneNumber.text}",
    120,
    TimeUnit.SECONDS,
    this,
    object : PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
        override fun onVerificationCompleted(phoneAuthCredential: PhoneAuthCredential?) {}

        override fun onVerificationFailed(firebaseException: FirebaseException?) {
            if (firebaseException is FirebaseTooManyRequestsException) {
                 Toast.makeText(applicationContext, "Too many request !", Toast.LENGTH_SHORT).show()
           }
        }

        override fun onCodeAutoRetrievalTimeOut(verificationId: String) {
            verifyId = verificationId
        }

        override fun onCodeSent(id: String, resendingToken: ForceResendingToken) {
            super.onCodeSent(id, resendingToken)
            verifyId = id
            token = resendingToken
        }
    }, token
)
```
- **Tham số đầu tiên**: là Số điện thoại sẽ được nhận sms.  Số điện thoại được sử dụng ở đây phải có mã vùng nên chúng ta cần thêm tiền tố `+84` vào trước. Ví dụ: +849051234**
- **Tham số thứ 2**: là thời gian TimeOut để nhận tin nhắn. Giá trị ở đây phải từ 0 - 120 seconds, nếu sau khoảng thời gian trên mà tin nhắn chưa được gửi thì nó trả lại call back cho mình.
- **Tham số thứ 3**: TimeUnit - định nghĩa đơn vị thời gian
- **Tham số thứ 4**: Activity
- **Tham số thứ 5**: một abstract class chứa các callback trả về
- **Tham số cuối cùng**: token Resend sms.

Ở đây ta sẽ chú ý vào 2 giá trị **verifyId** và **token** :

- **verifyId**: Mỗi khi server gửi tin nhắn cho người dùng, nó sẽ trả lại cho chúng ta một `id` (không phải sms code). Giá trị `id` này sẽ được sử dụng kết hợp với `sms code`  mà người dùng nhập để chúng ta có thể gửi lên server xác thực,
- **token**: Mình cần lưu giá trị này lại để dùng cho trường hợp  **Resend**.

### Verify SMS Code
![](https://images.viblo.asia/9ab78f4c-f156-4cce-9a07-820cc207aa08.png)
- Sau khi người dùng nhận được tin nhắn và nhập sms code, ta sẽ lấy code từ người dùng kết hợp với `verifyId` ở trên để tạo ta object `PhoneAuthCredential`. Chúng ta sẽ sử dụng object này để sign-in và firebase sẽ trả lại callback cho ta.
```
val credential = PhoneAuthProvider.getCredential(verifyId!!, alertDialog.editTextSMSCode.text.toString())

FirebaseAuth.getInstance().signInWithCredential(credential)
            .addOnCompleteListener { task ->
                Toast.makeText(applicationContext, "Verified Successful !", Toast.LENGTH_SHORT).show()
            }
            .addOnFailureListener {
                Toast.makeText(applicationContext, "Verified failed !", Toast.LENGTH_SHORT).show()
            }
```

**Chúc các bạn thành công !**