# Giới thiệu
Charles là một web proxy (HTTP Proxy/HTTP Monitor) cho phép lập trình viên có thể theo dõi toàn bộ thông tin HTTP và SSL/HTTPS giữa thiết bị như browser/mobile tới Internet, bao gồm request, response và HTTP headers (bao gồm cả cookie và caching).

Khi bạn lập trình một ứng dụng Android, thì có thể bạn sẽ phải làm rất nhiều đến việc liên kết đến với phía server như request các API. Và đây là một công cụ rất hữu ích để bạn có thể debug các request đó đã chính xác chưa mà không cần phải dùng tới công cụ logging như Logcat đôi khi khá tốn thời gian và có thể phải mất công sửa code. 

Ở trong bài này mình muốn giới thiệu với các bạn công cụ Charles và cách để có thể kết nối và debug với thiết bị Android.

Ứng dụng Charles hiện có trên cả 3 nền tảng Mac, Linux, Windows, các bạn có thể tải về tại địa chỉ: https://www.charlesproxy.com/download/. Phiên bản dùng thử thì chỉ có thể sử dụng được trong 30 phút, nếu bạn muốn sử dụng thêm sẽ phải khởi động lại ứng dụng. Ở trong bài viết này mình sẽ sử dụng Charles trên hệ điều hành Mac.

# Cấu hình tạo Charles Proxy
1. Mở Charles sau đó chọn `Proxy -> Proxy Settings` 
2. Trong tab `Proxies`, bạn nhập `8888` xong phần `HTTP Proxy Port`. Có nghĩa là nếu địa chỉ IP của máy bạn là `192.168.15.91` thì bạn sẽ thiết lập một proxy server ở địa chỉ `192.168.16.91:8888`.

![](https://images.viblo.asia/4631a5e7-a44e-4eb3-8edd-b7d4a48fe46f.png)

3. Chọn `Proxy -> Proxy Settings`

![](https://images.viblo.asia/29d1c138-b508-4bcc-b960-60481d8b17f5.png)

4. Click vào tab `SSL Proxying` và check vào `Enable SSL Proxying`. 
5. Ấn vào nút add để chỉ định tên domain muốn lắng nghe. Bạn có thể sử dụng wildcard ví dụ như `*.mydomain.com` hoặc một domain chính xác như `api.mydomain.com` đều được.

![](https://images.viblo.asia/3d58a3be-5a11-421e-bd9c-b4938f82088e.png)

# Cấu hình cho điện thoại 
## Xác định địa chỉ IP của máy bạn.
Để biết địa chỉ IP của máy bạn có thể vào `Help -> Local IP addess` trên toolbar của Charles

![](https://images.viblo.asia/203affb1-e889-4e77-a1e7-374aae04b820.png)

Hãy ghi lại địa chỉ IP này để dùng cho bước tiếp theo.

## Cấu hình thiết bị Android để sử dụng Charles Proxy
Đầu tiên, bạn hãy chắc chắn điện thoại của bạn sử dụng chung mạng với máy tính.
1. Vào Setting của địện thoại sau đó chọn WIfi.
2. Nhấn và giữ vào tên mạng wifi bạn đang kết nối sau đó chọn `Modify network`
3. Sau đó check vào ô `Advanced Options` và cuộn xuống phần Proxy.
4. Nhấn vào phần proxy và chọn `Manual`
5. Ở phần `Proxy Host Name` bạn nhập địa chỉ ip máy tính của bạn vừa lấy ở bước trước
6. Phần `Proxy port` bạn nhập vào port mà bạn đã thiết lập ở bước `Proxy Settings`, do trước đó mình dùng `8888` nên ở đây nhập cổng đó vào.

![](https://images.viblo.asia/38da3666-638d-4b1e-9ce1-782aacd2bc4a.png)

7. Nhấn `Save`
8. Sau khi `Save`, bạn sẽ nhận được một pop-up thông báo có một kết nối từ điện thoại của bạn tới Charles như sau:

![](https://images.viblo.asia/93a21169-cd29-4595-a939-8af49d3edee6.png)

9. Bạn click vào `Allow` để cho điện thoại của bạn có thể được thiết lập để kết nối tới Charles thông qua proxy.
- Nếu bạn không thấy pop-up này, bạn có thể chắc chắn thiết bị của bạn đã được sử dụng proxy bằng cách vào `Proxy -> Access Control Settings` và thêm vào địa chỉ IP của máy điện thoại của bạn vào đó. 

![](https://images.viblo.asia/af04b2ba-b557-4154-98af-751118b3be26.png)

## Cài đặt Charles SSL certificate
1. Bạn vào trình duyệt trên điện thoại sau đó nhập địa chỉ chls.pro/ssl hoặc http://charlesproxy.com/getssl và download SSL certificate về. 
2. Sau khi download xong certificate, click vào để mở file đó. Android sẽ hiển thị mội dialog để bạn cài đặt file này, nhập tên chứng chỉ sau đó nhấn OK. Tên chứng chỉ bạn nhập gì cũng được, ở đây mình nhập luôn là `Charles`

![](https://images.viblo.asia/a759bf4b-21fb-4776-a1a8-307c6fc5062f.png)

Sau khi xong quá trình này là bạn đã có thể debug các request của bạn. Tuy nhiên cần chú ý là từ android N trở lên, bạn cần thêm phần config cho app của bạn để có thể sử dụng được SSL certificate được tạo ra bởi Charles proxy. Điều đó có nghĩa là bạn chỉ có thể sử dụng SSL proxy cho ứng dụng của bạn mà thôi. (Ở phiên bản thấp hơn, bạn có thể debug và lấy được cả request của các ứng dụng khác). Nếu bạn sử dụng android N trở lên thì hãy làm thêm bước sau đây: 
## Thêm Network Security Configuration cho android N
Bạn cần làm theo các bước như ở https://developer.android.com/training/articles/security-config cho ứng dụng của bạn:
1. Tạo file xml có nội dung như sau:
```
<network-security-config> 
  <debug-overrides> 
    <trust-anchors> 
      <!-- Trust user added CAs while debuggable only -->
      <certificates src="user" /> 
    </trust-anchors> 
  </debug-overrides> 
</network-security-config>
```
2. Lưu file.
3. Thêm `android:networkSecurityConfig` vào file `AndroidManifest.xml`
```
<?xml version="1.0" encoding="utf-8"?>
<manifest ... >
    <application 
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:networkSecurityConfig="@xml/network_security_config"  >
        ...
    </application>
</manifest>
```

Done, vậy là bạn đã hoàn tất quá trình cài đặt, giờ bạn có thể nhìn thấy được các traffic được ghi lại ở điện thoại của bạn.

Sau khi debug xong bạn hãy nhớ tắt setting proxy bằng cách chọn `Proxy: None` trong phần thiết lập wifi của điện thoại.