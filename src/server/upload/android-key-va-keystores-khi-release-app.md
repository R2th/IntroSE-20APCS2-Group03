# Một số khái niệm
Đầu tiên ta sẽ tìm hiểu về khái niệm và định nghĩa quan trọng sau.
- App signing key: Khóa này được sử dụng để ký APK được cài đặt trên thiết bị của người dùng. Là một phần của mô hình cập nhật bảo mật Android, signing key không bao giờ thay đổi trong suốt vòng đời của ứng dụng. App signing key là riêng tư và phải được giữ bí mật. 
- Upload key: Khóa bạn sử dụng để ký gói ứng dụng hoặc APK trước khi bạn tải lên để đăng ký ứng dụng với Google Play. Bạn phải giữ bí mật khóa tải lên. Tuy nhiên, bạn có thể chia sẻ chứng chỉ được tạo bằng khóa tải lên của mình.
- Certificate (Chứng chỉ): Chứng chỉ chứa khóa công khai cũng như một số thông tin xác định bổ sung về người sở hữu khóa này.
- Java keystore (.jdk hoặc .keystore): Một tệp nhị phân phục vụ như một kho lưu trữ chứng chỉ và khóa riêng.

![](https://images.viblo.asia/2e822112-5dd3-431a-82b1-b842cfd8e1b3.png)

# Ký ứng dụng
Để có thể phát hành ứng dụng lên Google play, thì ứng dụng cần phải được "ký" (sign).
### Tạo một upload key và keystore
Bạn có thể tạo một upload key bằng Android studio bằng các bước sau:
1. Trên thanh menu, click Build > Build > Generate Signed Bundle/APK.
![](https://images.viblo.asia/ed17cd24-259d-47f8-abd8-c4f942c47dba.png)

2. Trong cửa số Generate Signed Bundle or APK ,chọn Android App Bundle hoặc APK và click Next.
![](https://images.viblo.asia/820cf559-7210-46bb-8936-dad111349417.png)

3. Click chọn Create new.
![](https://images.viblo.asia/698fa409-07ee-49d1-9d82-7326da0a7094.png)

4. Trong cửa sổ New Key Store vừa hiện lên, bạn cần cung cấp thông tin cho keystore và key của bạn.
![](https://images.viblo.asia/8a05806e-6095-40db-b3e1-4fd50b9f1385.png)

5. Keystore: 
* Key store path: là nơi lưu keystore.
* Password: Tạo và xác nhận mật khẩu an toàn cho keystore của bạn.
6. Key:
Alias: Nhập tên cho khóa của bạn.
Password: Tạo và xác nhận mật khẩu an toàn cho khóa của bạn.
Validity (years): khoảng thời gian hợp lệ của khoá (tối thiểu là 25 năm).
Certificate: Nhập một số thông tin về bản thân cho chứng chỉ của bạn. Thông tin này không được hiển thị trong ứng dụng của bạn, nhưng được bao gồm trong chứng chỉ của bạn như một phần của APK.
7. Click OK.

Vậy là bạn đã tạo thành công key và keystore, tiếp theo ta sẽ "ký" ứng dụng với key vừa tạo ở trên.

Nếu bạn gặp lỗi trên Android Studio 4.2 : "Warning: Different store and key passwords not supported for PKCS12 KeyStores. Ignoring user-specified -keypass value". 
Thì bạn cần đặt pass keystore vs pass alias giống nhau:
[stackoverflow](https://stackoverflow.com/questions/66621669/warning-different-store-and-key-passwords-not-supported-for-pkcs12-keystores-i)
### Ký ứng dụng với upload key
1. Trên thanh menu, click Build > Build > Generate Signed Bundle/APK.
![](https://images.viblo.asia/ed17cd24-259d-47f8-abd8-c4f942c47dba.png)

2. Trong cửa số Generate Signed Bundle or APK ,chọn Android App Bundle hoặc APK và click Next.
![](https://images.viblo.asia/820cf559-7210-46bb-8936-dad111349417.png)

3. Click chọn đường dẫn đến keystore mà bạn đã tạo ở trên
![](https://images.viblo.asia/031b56cf-bf38-44cc-bb08-79cc2de77552.png)

4. Nhập mật khẩu cho keystore, alias và mật khẩu của key. chọn Next.
![](https://images.viblo.asia/8f0f06fa-2b36-4274-9754-3e0eed5d24fb.png)

5.  Destination folder: Chọn thư mục lưu file apk. Chọn build type, Signature Versions mà bạn muốn ứng dụng của mình hỗ trợ. chọn Finish.
6. Khi Android Studio kết thúc build app. Popup sau sẽ được hiển thị lên. Nhấp vào liên kết trong cửa sổ bật lên để phân tích hoặc định vị gói ứng dụng của bạn.
![](https://images.viblo.asia/9cd37f4c-f1ff-46bc-99d7-28f3ed220353.png)

Như vậy là chúng ta đã export được file release-apk . Bạn có thể tìm hiểu các bước để đăng ứng dụng lên Google Play ở [đây](https://developer.android.com/studio/publish/upload-bundle).

**Tài liều tham khảo**
[Google Developers.](https://developer.android.com/studio/publish/app-signing)