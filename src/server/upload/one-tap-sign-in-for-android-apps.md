Đăng nhập và đăng ký bằng **One Tap** trên Android giúp bạn tối ưu hóa luồng để xác thực người dùng trong ứng dụng của bạn. Đối với nhiều ứng dụng Android, tài khoản người dùng là một phần quan trọng của kênh chuyển đổi. Người dùng (và nhà phát triển cũng vậy!) thường quên tài khoản mà họ đã đăng nhập hoặc mật khẩu họ đã sử dụng cho dịch vụ của bạn. Bằng cách tối ưu hóa quy trình, bạn có thể cải thiện tỷ lệ chuyển đổi và giảm tỷ lệ mất người dùng từ ứng dụng của bạn.

![](https://images.viblo.asia/17af3f06-72f6-47d4-a67a-41002f19bfb3.gif)

**One Tap** tạo luồng UI cho việc đăng kí hoặc đăng nhập cho ứng dụng 1 cách đơn giản. Chỉ cần 1 cửa sổ bật lên, chọn tài khoản muốn liên kết, và người dùng đã được xác thực mà không cần phải điền vô số những thông tin không cần thiết. Lưu ý rằng đối với những ứng dụng cần sử dụng thông tin của người dùng chính xác, **One Tap** sẽ không thay thế hoàn toàn cho luồng đăng nhập hoặc đăng kí sẵn có của ứng dụng, nó chỉ giúp bạn tối ưu hóa trải nghiệm người dùng trong ứng dụng mà thôi.

**One Tap supports**
* **Đăng nhập với một tài khoản hiện có** với dịch vụ của bạn sử dụng Google accounts hoặc password đã lưu.
* **Đăng kí một tài khoản mới** với dịch vụ của bạn sử dụng Google account.

Nó được phát hành với thư viện `com.google.android.gms:play-services-auth` phiên bản `18.0.0`.

## One Tap và Google Identity Services
**One Tap** là một phần của bộ thư viện mới hiện đang được phát triển có tên là **Google Identity Services**. **Google Identity Services** cuối cùng sẽ kết hợp bộ tính năng đầy đủ của **Smart Lock for Passwords** và thư viện **Google Sign-In**, cũng như giới thiệu các tính năng mới.  **Google Sign-In** cho phép bạn đăng nhập bằng tài khoản Google (giống như **One Tap**) cũng như cung cấp các tính năng bổ sung như nút `Google Sign-in` và khả năng yêu cầu quyền bổ sung. Tuy nhiên, đây là một công việc đang được phát triển và phiên bản đầu tiên chưa triển khai bộ tính năng đầy đủ của các thư viện này.

**One Tap** là tính năng đầu tiên của **Google Identity Service** mà các nhà phát triển đang triển khai và nó đã sẵn sàng để sử dụng trong các ứng dụng hiện tại để tối ưu hóa các luồng đăng nhập và đăng ký. Các nhà phát triển sẽ làm việc để thêm các tính năng khác được cung cấp bởi **Google Sign-In** và **Smart Lock for Passwords**. Các tính năng này bao gồm khả năng lưu mật khẩu, đăng nhập bằng nút `Google Sign-in`, yêu cầu quyền truy cập dữ liệu người dùng như nội dung ổ đĩa, thực hiện đăng nhập tự động và im lặng bằng **Google Sign-in**, lưu thông tin đăng nhập id và tra cứu số điện thoại cho luồng tự động. Các nhà phát triển hy vọng sẽ ra mắt nhiều tính năng này trong **Google Identity Service** vào cuối năm nay.

So với **Google Sign-in** hiện tại và **Smart Lock for Passwords UIs**, chúng tôi đã thấy rằng người dùng có nhiều khả năng đăng nhập thành công với giao diện người dùng **One Tap**. Ngoài ra, họ có nhiều khả năng chọn đúng tài khoản khi đăng nhập lại - điều này giúp họ vào ứng dụng của bạn, tránh tạo tài khoản trùng lặp và cắt giảm các yêu cầu hỗ trợ. Phiên bản web của giao diện người dùng này, được ra mắt trước đó, đã dẫn đến tăng gấp đôi số chuyển đổi cho một số trang web.

Đối với các ứng dụng hiện có, khuyến nghị của chúng tôi là đánh giá việc thêm **One Tap** để tăng cường đăng nhập hiện tại của bạn và đăng ký các luồng sẽ có ý nghĩa đối với ứng dụng và nhóm của bạn (bạn không cần phải thực hiện ngay).
Các ứng dụng cần các tính năng của **Google Sign-in** hoặc **Smart Lock for Passwords** chưa có sẵn có thể sử dụng cả hai thư viện ngay hôm nay để thêm **One Tap** vào đầu các luồng hiện có hoặc chờ hỗ trợ để thêm vào cuối năm nay.

Đối với các ứng dụng mới, chúng tôi khuyên bạn nên sử dụng One Tap để tạo đăng nhập được tối ưu hóa và đăng ký trải nghiệm.

## Hỗ trợ đăng nhập bằng One Tap
Đăng nhập được hỗ trợ bằng **One Tap** sẽ hiển thị overlay cho người dùng nhắc họ đăng nhập lại bằng tài khoản được ủy quyền trước đó. Người dùng phải đăng nhập trước đó để nó được hiển thị dưới dạng tùy chọn *đăng nhập*.

Đăng nhập **One Tap** được kích hoạt bởi code của bạn. Tùy thuộc vào ứng dụng của bạn, điều này có thể được kích hoạt khi ứng dụng khởi chạy lần đầu tiên hoặc sau đó khi người dùng cố gắng thực hiện hành động được bảo vệ.

Khi bạn đã quyết định bắt đầu quá trình đăng nhập, bạn có thể truy vấn để xem liệu có tài khoản nào có sẵn để đăng nhập hay không bằng cách gọi `beginSignIn` trên `SignInClient`. Đối với các luồng đăng nhập, điều quan trọng là bạn phải định cấu hình đăng nhập bằng `setFilterByAuthorizedAccounts(true)` để chỉ trả lại các tài khoản được ủy quyền (hoặc đăng nhập) trước đó. 

Cuộc gọi lại từ `beginSignIn` sẽ gửi PendingIntent để hiển thị overlay khi khởi chạy. Sau đó, bạn gọi `startIntentSenderForResult` với `PendingIntent` được cung cấp để hiển thị cửa sổ đăng nhập thông qua activity hiện tại.

![](https://images.viblo.asia/d4a98f4d-69d3-4ee7-9055-838fc78df006.png)

Dialog **One Tap** có thể được hiển thị bất cứ đâu trong ứng dụng của bạn. Vì vậy bạn có thể cho phép người dùng sử dụng ứng dụng của bạn trước khi yêu cầu họ đăng nhập. Điều này cho phép bạn xây dựng luồng đăng nhập được tối ưu hóa cho ứng dụng của mình. Bất cứ nơi nào bạn gọi `startIntentSenderForResult`, hộp thoại **One Tap** sẽ hiển thị lên trên `Activity` đó.

![](https://images.viblo.asia/ad3e0a22-e407-4619-b769-50bb00245e76.png)

## Hỗ trợ đăng kí bằng One Tap

Nếu **One Tap** không tìm thấy bất kỳ tài khoản được ủy quyền nào để đăng nhập, `beginSignIn` sẽ gọi failure listener thay vì chuyển cho ứng dụng một `PendingIntent`. Khi điều này xảy ra, bạn nên lặp lại truy vấn nhưng lần này hãy tìm các tài khoản có thể được sử dụng để đăng ký.

Lần này hãy xác định cấu hình **One Tap** với `setFilterByAuthorizedAccounts(false)` và nó sẽ truy vấn mọi tài khoản hợp lệ có thể được sử dụng để đăng ký, cũng như mọi tài khoản đã được cho phép trước đó. Nếu bất kỳ tài khoản nào được tìm thấy, bạn sẽ nhận lại `PendingIntent` mà bạn có thể sử dụng để hiển thị overlay đăng ký. Khi được nhắc đăng ký, người dùng sẽ được yêu cầu đồng ý chia sẻ email và quyền hồ sơ của họ.

Dưới đây là mô tả luồng hoạt động của **One Tap**:

![](https://images.viblo.asia/ffb6a598-1e82-462c-bf83-f5b661b50d46.png)

## Làm thế nào để triển khai password flow

Bạn có thể nghĩ đến việc đăng nhập mật khẩu bằng **One Tap** làm trình quản lý mật khẩu - thông tin đăng nhập sẽ được lưu trữ và chia sẻ với ứng dụng của bạn giống như người dùng đã nhập chúng.

**One Tap** sử dụng cơ chế lưu trữ mật khẩu giống như **Autofill** và **Smart Lock for Passwords**. Vì vậy, nếu người dùng đã từng lưu mật khẩu bằng một trong hai cách này cho ứng dụng của bạn, nó sẽ được hiển thị cho người dùng dưới dạng tùy chọn tài khoản trên lời nhắc của **One Tap**.

Có ba password flow cơ bản: **truy xuất thông tin đăng nhập đã lưu**, **nhập thông tin đăng nhập mới** và **lưu thông tin đăng nhập mới**.

### Truy xuất thông tin đăng nhập đã lưu

Trong luồng đăng ký One Tap ban đầu, hãy định cấu hình `beginSignInRequest` để hỗ trợ mật khẩu. Sau đó, người dùng sẽ được cung cấp bất kỳ mật khẩu đã lưu nào dưới dạng tùy chọn trong UI của **One Tap**

```php
.setPasswordRequestOptions(PasswordRequestOptions.builder()
    .setSupported(true)
    .build())
```

### Đăng nhập người dùng bằng mật khẩu

Nếu người dùng chọn mật khẩu đã lưu từ giao diện **One Tap**, nó sẽ được cung cấp cho ứng dụng của bạn bằng cách sử dụng `onActivityResult`. Sau đó, bạn nên đăng nhập vào phần phụ trợ của mình như bình thường nếu như người dùng đã nhập mật khẩu.

Nếu người dùng không chọn một tài khoản với **One Tap**, bạn có thể hiển thị màn hình tên người dùng/mật khẩu thông thường. **One Tap** không có giao diện để nhập mật khẩu, vì vậy bạn sẽ phải xây dựng màn hình này và tự mình đăng nhập.

### Lưu lại password sau khi đăng nhập

Sau khi người dùng nhập mật khẩu, nhắc người dùng lưu mật khẩu bằng **Autofill**. Lần sau khi người dùng quay lại ứng dụng của bạn, mật khẩu đã lưu sẽ có sẵn dưới dạng tùy chọn trong lời nhắc đăng nhập **One Tap**.

Hãy chắc chắn rằng bạn đã tối ưu hóa ứng dụng của mình cho **Autofill** để đảm bảo rằng **Autofill** có thể lưu thành công thông tin đăng nhập của bạn! Để kiểm tra lưu thông tin xác thực trong **Autofill** trên thiết bị, hãy cài đặt dịch vụ **Autofill** thử nghiệm được giới thiệu ở đây - điều này cho phép bạn đảm bảo rằng việc triển khai **Autofill** của bạn sẽ hoạt động với tất cả các dịch vụ **Autofill**. 

Sau khi bạn tối ưu hóa ứng dụng của mình cho **Autofill**, bạn cũng có thể xem xét tích hợp **Smart Lock for Passwords**, điều này cho phép bạn kiểm soát nhiều hơn việc lưu mật khẩu.

## Lời cuối
Hãy truy cập [documents của **One Tap**](https://developers.google.com/identity/one-tap/android/overview) để tìm hiểu thêm về việc tích hợp nó vào ứng dụng của bạn!

## Nguồn tham khảo
[Medium](https://medium.com/androiddevelopers/one-tap-sign-in-for-android-apps-2259ce15bc2c)