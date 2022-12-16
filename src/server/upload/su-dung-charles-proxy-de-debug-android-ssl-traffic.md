Trong bài viết này mình sẽ hướng dẫn các bạn cách sử dụng phần mềm Charless Proxy để tiến hành debug (gỡ lỗi) trên thiết bị Android. 
Nếu các bạn chưa cài đặt và config setting Charless thì có thể xem ở bài viết trước. 
Ở [bài viết trước](https://viblo.asia/p/cai-dat-config-charles-cho-may-ao-android-ios-simulator-emulator-Az45bDAoZxY) mình đã hướng dẫn cách cài đặt, config Charless trên máy ảo Android và IOS. 

# 1. Setting Up Your Project
Nếu thiết bị test của bạn đang chạy Android 7.0 trở lên, thì sẽ có thêm một vài bước để đảm bảo rằng bạn hoàn toàn tin tưởng (trust) vào Chứng chỉ Charles CA. Để đảm bảo Android tin tưởng vào chứng chỉ, bạn sẽ cần chỉ định Cấu hình bảo mật mạng cho ứng dụng của mình. Có một số cách khác nhau để thêm chứng chỉ của bạn vào trusted configuration của ứng dụng, nhưng cách dễ nhất không phải là bao gồm chứng chỉ Charles trong mã code ứng dụng, mà chỉ cần trust vào chứng chỉ CA do người dùng cài đặt (như các phiên bản Android trước đây dùng để làm).

Thêm thuộc tính android: networkSecurityConfig vào thẻ application trong tệp AndroidManifest.xml của bạn:
```xml
<application
             android:allowBackup=”true” android:icon=”@mipmap/ic_launcher”
             android:label=”@string/app_name”
             android:roundIcon=”@mipmap/ic_launcher_round”
             android:supportsRtl=”true”
             android:theme=”@style/AppTheme”
             android:networkSecurityConfig=”@xml/network_security_config”>
```

Tạo file config *networksecurityconfig.xml*:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <debug-overrides>
        <trust-anchors>
            <!-- Trust user added CAs while debuggable only -->
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```

# 2. Setting Up Charles
Mở Charles và sau đó chọn* Proxy > Proxy Settings* từ thanh công cụ toolbar. Bạn sẽ cần lưu ý Cổng HTTP Proxy được chỉ định.

![](https://images.viblo.asia/a7a9ab3e-2095-415f-a54b-505987d32b20.png)

Sau đó mở *Proxy > SSL Proxying Settings* từ thanh công cụ và thêm địa chỉ Server/Port (máy chủ / cổng) thích hợp mà bạn muốn debug. Ví dụ: 

![](https://images.viblo.asia/84743e78-8159-42c5-8dd4-8a66003a0cb5.png)


# 3. Setting Up Your Android device

Trước tiên, hãy lưu ý địa chỉ IP local của bạn trong mạng cục bộ (local network). Bạn sẽ dùng nó trong bước tiếp theo.

Ngoài ra, hãy đảm bảo Charles đang mở và máy tính của bạn cùng kết nối một mạng wifi với thiết bị Android mà bạn sẽ cài đặt.

Đi đến thiết bị của bạn cài đặt và cấu hình wifi. (Các bạn có thể xem cụ thể hơn ở [bài viết trước](https://viblo.asia/p/cai-dat-config-charles-cho-may-ao-android-ios-simulator-emulator-Az45bDAoZxY))

Nhấn và giữ vào mạng mà bạn sẽ sử dụng và chọn *Modify network*( Sửa đổi mạng ).

Sau đó chọn *Advanced Options* and scroll xuống dưới bạn sẽ thấy *Proxy*.

Chọn Manual trong menu Proxy.

Đối với tên máy chủ Proxy nhập địa chỉ IP của bạn mà bạn đã lưu ý ở trên.

Sau đó, đối với cổng Proxy, hãy sử dụng Cổng Proxy HTTP mà bạn đã lưu ý từ Cài đặt Proxy Charles ở trên.

Sau đó nhấn SAVE.

![](https://images.viblo.asia/ee6ac75f-5d7b-45fa-b444-7d5212c3bbff.png)

Sau khi lưu, bạn có thể nhận thấy một cửa sổ bật lên trên máy Mac của mình như thế này:

![](https://images.viblo.asia/ca873477-dd9e-4084-a3e0-ad77179d07a3.png)

Nhấn *Cho phép* để cho phép thiết bị Android của bạn kết nối với Charles thông qua proxy mà nó đã thiết lập.

Nếu bạn không thấy thông báo trên, bạn có thể đảm bảo rằng thiết bị của bạn có thể sử dụng proxy từ bên trong Charles bằng cách truy cập *Proxy > Access Control Settings* và thêm địa chỉ IP của thiết bị Android trên mạng wifi.

![](https://images.viblo.asia/e7508e2f-490d-4e15-8167-30f0350208fd.png)

Tiếp tục, trên thiết bị Android của bạn, hãy mở trình duyệt và truy cập URL sau chls.pro/ssl.

Bạn cũng có thể xem các hướng dẫn này từ trong ứng dụng Charles - chọn *Help > SSL Proxying > Install Charles Root Certificate on a Mobile Device or Remote Browser* trên thanh công cụ.

![](https://images.viblo.asia/3fb97287-b57d-4b12-9fec-f60997d970fe.jpg)

Trình duyệt tải xuống chứng chỉ và sau khi hoàn tất, chạm để mở tệp. Sau đó, Android sẽ thông báo để bạn tiến hành cài đặt tệp vừa download.

![](https://images.viblo.asia/fb33d31c-8dbe-4591-acf9-c9c18f5728c3.png)

Sau khi bạn đặt tên cho chứng chỉ và nhấn OK, bạn sẽ được thông báo nhập mã pin / mật khẩu của thiết bị hoặc được thông báo thiết lập pin / mật khẩu thiết bị của bạn. Khi quá trình đó hoàn tất, bạn đã có thể tiến hành thực hiện 1 vài request debug.

Lưu ý Cho đến khi bạn xóa proxy thủ công khỏi thiết bị này Cấu hình wifi, bất cứ khi nào bạn sử dụng lại mạng này, bạn sẽ cần phải mở Charles và chạy trên cùng một địa chỉ IP. Bạn luôn có thể đặt cấu hình mạng trở lại Proxy. Bạn  có thể đặt cấu hình mạng trở lại *Proxy: None*  khi bạn đã debug xong.

# 4. Using An Emulator
Theo hướng dẫn từ trang chủ [Charless](https://www.charlesproxy.com/documentation/configuration/browser-and-system-configuration/), bạn có thể start trình giả lập bằng flag để sử dụng proxy.
> In the Android emulator run configuration add an Additional Emulator Command Line Option:<br>-http-proxy http://LOCAL_IP:8888 <br> <br> Where LOCAL_IP is the IP address of your computer, not 127.0.0.1 as that is the IP address of the emulated phone.

Có nghĩa là:

> Trong cấu hình chạy trình giả lập Android, thêm tùy chọn dòng lệnh bổ sung: <br>-http-proxy http: // LOCAL_IP: 8888 <br><br>Trong đó LOCAL_IP là địa chỉ IP của máy tính của bạn, không phải 127.0.0.1 vì đó là địa chỉ IP của điện thoại được mô phỏng.

Command đầy đủ sẽ là: 
```
emulator -avd EMULATOR_NAME -http-proxy IP_ADDRESS:PORT
```

<br>
Và bây giờ, Sau khi bạn đã hoàn tất thiết lập , bạn sẽ thấy Charles ghi lưu lượng truy cập từ thiết bị của mình. Miễn là bạn được cấu hình đúng cách, bạn sẽ thấy các chi tiết yêu cầu SSL đó từ các địa chỉ host bạn đã chỉ định trong *Charles’ SSL Proxying Settings*.

<br>
<br>
Thanks for reading!