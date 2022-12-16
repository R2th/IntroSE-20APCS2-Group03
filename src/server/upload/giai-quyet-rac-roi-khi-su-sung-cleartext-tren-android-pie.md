# I. Mở đầu
*  Hôm nay là một ngày đẹp trời và cả team đang chuẩn bị đi chơi bowling thì đột nhiên nhận được tin không vui từ phía khách hàng, đó là phiên bản release phase 1 không thể thực hiện một tính năng quan trọng trên Android Pie (API level 29)! Một dòng log ngắn ngủi “***java.io.IOException: Cleartext HTTP traffic to http://abc.xyz.com not permitted***” nhưng chứa đầy đau thương. 

*  Sau khi tìm hiểu vấn đề thì team nhận ra đây là một issue nguy hiểm cần phải giải quyết khi muốn release app chạy trên các device đã được nâng cấp lên Android Pie. Trong bài viết này mình sẽ đưa ra giải pháp để giải quyết vấn đề một cách trọn vẹn nhất. Nội dung của bài viết có tham khảo từ [đây](https://medium.com/@son.rommer/fix-cleartext-traffic-error-in-android-9-pie-2f4e9e2235e6) và tại [đây](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted)
# II. Nội dung chính
* **Cleartext** trong dòng log trên có ý nghĩa gì? **Cleartext** là bất kỳ thông tin nào được truyền (transmitted) hay được lưu trữ (stored) mà không được mã hóa.

*  Khi app giao tiếp với server bằng cách sử dụng **cleartext** (ví dụ như HTTP) sẽ làm tăng nguy cơ bị rò rỉ và giả mạo nội dung. Các bên thứ ba có thể thêm bớt dữ liệu trái phép hoặc trích xuất thông tin của người dùng. Đó là lý do tại sao chúng ta được khuyến khích sử dụng các phương thức bảo mật thông tin (ví dụ như **HTTPS** thay thế cho **HTTP**). Tuy nhiên, trong trường bắt buộc phải sử dụng **cleartext** thì chúng ta có thể fix bằng 2 cách:
### 1. Sử dụng useCleartextTraffic  giá trị là "true" trong AndroiManifest
* Thuộc tính **useCleartextTraffic** đã được thêm vào từ Android 6.0. Với Android Pie thì thuộc tính này có giá trị mặc định là “**false**”, do đó chúng ta cần phải cấu hình lại cho thuộc tính này để có thể sử dụng **cleartext**.
```html
<application
    android:usesCleartextTraffic="true"
...
```
* Đây là cách khắc phục nhanh nhất, tuy nhiên nó lại gây ra mối đe dọa về tính toàn vẹn dữ liệu vì không giới hạn phạm vi của **cleartext**. Một giải pháp khác tốt hơn được giới thiệu từ Android 7.0 là cấu hình file **network_security_config.xml**. Việc cấu hình file này sẽ cho phép sử dụng **cleartext** từ một domain cụ thể.
### 2. Cấu hình network_security_config.xml
a. Thêm file **network_security_config.xml** trong mục res/xml

![](https://images.viblo.asia/8e475f72-41d7-485d-a461-5cb8d2c5d0ed.png)

b. Thêm cấu hình domain và đặt giá trị “**true**” cho thuộc tính **cleartextTrafficPermitted**
```html
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">your_domain.com</domain>
    </domain-config>
</network-security-config>
```
c. Thêm file **network_security_config.xml** vào AndroidManifest
```swift
<application
    android:name=".MyApplication"
    android:networkSecurityConfig="@xml/network_security_config"
...
```
# III. Kết
* Với nội dung bài viết này, mình đã giới thiệu 2 giải pháp để giải quyết issue liên quan đến **cleartext** trên Android Pie. Tuy nhiên, tốt hơn hết chúng nên sử dụng phương thức bảo mật bổ sung, dùng HTTPS thay thế cho HTTP để đạt hiệu quả cao hơn. Hy vọng với bài viết này các bạn sẽ có thêm một ít kiến thức để giải quyết vấn đề này một cách nhanh chóng.