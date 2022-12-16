# **1. Giới thiệu tổng quát về Charles Proxy:**

## **1.1. Charles Proxy là gì?**

Charles Proxy là tool cho phép mình có thể nhìn thấy được traffic từ trình duyệt hoặc mobile app tới internet/server, bao gồm request, response, header.

## **1.2. Mục đích của Charles Proxy:**
- Check khi mở app lên nó gọi api nào, nó gọi mấy lần, gửi gì lên server.
- Check xem bị duplincate request với test phía server.
- Charles còn có thể chỉnh tốc độ mạng, cho phép test ứng dụng trong điều kiện mạng lag, mất kết nối.

# **2. Cài đặt Charles Proxy:**
Để cài đặt Charles cần:

**Bước 1:** Truy cập vào đường link https://www.charlesproxy.com và download file installer về máy.

![](https://images.viblo.asia/aea5a517-7ac9-4b78-bba2-cf7f26b7102f.png)

**Bước 2:** Khởi động installer đã down về, hoàn thành theo chỉ dẫn:

![](https://images.viblo.asia/b32a8a14-eadd-4ae7-a720-d26e5975ee45.png)
![](https://images.viblo.asia/bf29bd19-28ef-4f96-9373-f4a7c043873e.png)

**Bước 3:** Khởi động Charles:

![](https://images.viblo.asia/7c9c01db-5810-4bc5-9c75-2fe201d18699.png)

**Bước 4:** Gói Charles free cho 30 ngày, vào đây để mua license nhé. Sau đó thì đi tới **Help > Register Charles... > Điền Register Name và License Key** để đăng ký rồi restart lại Charles.

![](https://images.viblo.asia/5fdc838c-481b-4a1e-a8f8-5e6605f0886f.png)
![](https://images.viblo.asia/f890ed73-ef47-4332-96c5-90ce26f3ce18.png)
![](https://images.viblo.asia/3780ec44-84c3-46af-be1b-c49f02e1fe0f.png)

**1.1. Configure Charles And Environment**

Phần set up Charles và môi trường là phần vô cùng quan trọng. Nếu bạn set up môi trường không đúng hoặc không đầy đủ, điều tất yếu là bạn sẽ chả thể làm việc được với nó.
Để giúp bạn có thể kiểm tra liệu mình đã set up đúng chưa, thì sau đây là checklist các bước mình sử dụng:
 - Config Proxy
 + Bật macOS Proxy cho Charles
 + Config proxy cho device
 
**Config Proxy**

Proxy là một Internet server làm nhiệm vụ chuyển tiếp thông tin và kiểm soát tạo sự an toàn cho việc truy cập Internet của các máy client.
Khi sử dụng Charles trên máy Mac, bạn cần config cho Charles sử dụng macOS Proxy.

**Enable macOS Proxy for Charles**

Lần đầu sử dụng Charles bạn sẽ được tự động hỏi về việc cấp quyền macOS Proxy như sau. Chọn **Grant Privileges** và nhập user name và password:

![](https://images.viblo.asia/c8fc818b-b8b6-42fc-80ef-1724c5fe8351.png)
![](https://images.viblo.asia/04830b58-59f5-4022-aa5a-f8ec540e99b9.png)

Sau khi enable macOS Proxy cho Charles, dấu tick sẽ xuất hiện bên cạnh mục **View > macOS** Proxy như thế này:

![](https://images.viblo.asia/1b843dbe-7496-4f1a-aeb9-b92a02bb257b.png)

Nếu bước trên bạn chọn **Not yet** trong lúc cài đặt Automatic macOS Proxy Configuration, lần tới bạn có thế cài đặt thông qua **View > Proxy Settings...**.

**Config proxy cho iOS Device**

Khi bạn chọn debug app của bạn trên real device cùng với Charles, bạn cần phải trỏ HTTP Proxy của device đến máy tính mà bạn đang sử dụng.
**Lưu ý:** Máy tính và điện thoại của bạn phải xài cùng wifi.
Config cho device như sau:
- Vào **Settings > Wif**i.
- Chọn network đang kết nối tới.
- Chọn **Config Proxy**.
- Chọn **Manual** và điền vào form, trong đó:
+ Server: Địa chỉ IP của máy tính đang chạy Charles
+ Port: Cổng mà Charles chạy (thường là 8888)
+ Authentication: Off

![](https://images.viblo.asia/668b4f6b-44c3-40ee-8bcd-88f48cfa4ec9.png)
![](https://images.viblo.asia/a272cd13-228b-4197-af83-35b674ec16af.png)
![](https://images.viblo.asia/e3eb03e4-ff17-4cd8-a923-e7ff64e75769.png)
![](https://images.viblo.asia/ee8c8a88-f7c8-4503-a9a8-ec5d58e3988d.png)

Để biết local IP của máy tính, vào **Help > Local IP Address**.

![](https://images.viblo.asia/82299d05-4ee5-4705-a669-a7e192ed3bae.png)
![](https://images.viblo.asia/4671e42a-e7d5-4267-b8c6-200075899589.png)

Tiếp tục, config access control cho máy mac như sau:
Vào **Proxy > Access Control Settings…** để cho phép các device được phép kết nối với Charles bằng cách thêm mới.

![](https://images.viblo.asia/21c48f68-10c3-4ea3-a7ef-e7bd10c03403.png)
![](https://images.viblo.asia/20f4f2d3-3c8b-4cf4-b889-421d3cd99b1f.png)

**Lưu ý:** Sau khi testing và debug trên device xong, nhớ setting lại wifi của device, bằng cách vào Setting > Wifi, chọn wifi sử dụng, chọn Config Proxy > Off. Nếu không làm vậy thì điện thoại của bạn không xài wifi được đâu.

# **3. Application Interface**
![](https://images.viblo.asia/ce633056-9d58-41a0-a41e-e8f20aa55151.png)
Các nút thông dụng:
1. Clear the current session:
- Session chứa tất cả các thông tin được ghi lại.
- Khi session đầy/busy, có thể clean session.
2. Start/stop recording:
+ Record là chức năng căn bản của Charles.
+ Request và response được lưu lại vào session hiện tại chỉ khi chức năng Record bật.
. Request hiển thị trên màn hình session khi nó được lưu lại. Có thể xem request ở 2 chế độ: Structure và Sequence.
3. Start/stop throttling: Điều chỉnh băng thông
4. Enable/Disable breakpoints: Bật breakpoint để debug request/response
5. Compose: Soạn một request mới
6. Repeat: Thực hiện lại request được chọn
7. Tool: Active/deactive các tool như
- Breakpoint
- No caching
8. Settings:
- Recording settings
- Access control settings