# Công cụ dò quét lỗ hổng OpenVAS (GVM)
Dò quét, quản lý lỗ hổng là một bước quan trọng trong quá trình pentest cũng như duy trì hệ thống và có sẵn một công cụ như vậy thì sẽ có ích cho bạn rất nhiều. Vì vậy, trong bài viết này mình sẽ giới thiệu đến các công cụ dò quét lỗ hổng OpenVAS.
Open Vulnerability Assessment System (OpenVAS) là một công cụ dò quét lỗ hổng có mã nguồn mở được đánh giá cao, nó được duy trì và phát triển bởi Greenbone Network.
## 1.	Kiến trúc của OpenVAS
**OpenVAS** có 3 thành phần chính: Greenbone Vulnerability Manager (GVMd), Greenbone Security Assistant (GSA), OpenVAS Scanner.
![](https://images.viblo.asia/c045dd83-dad4-4351-9b53-1b81d38f2e74.png)
 
**GVMd**: là trung tâm dịch vụ, hợp nhất các công cụ quét lỗ hổng đơn giản thành một giải pháp quản lý lỗ hổng đầy đủ. GVMd điều khiển OpenVAS Scanner qua một giao thức nội bộ và cung cấp thêm một giao thức chung Open Scanner Protocol (OSP) để có thể tích hợp các máy quét khác. Bản thân GVMd cũng cung cấp một giao thức dựa trên XML khác, Greenbone Management Protocol (GMP) để các thành phần khác có thể gửi những yêu cầu xử lý như tạo người dùng, tạo lịch quét, tạo một mục tiêu quét, tạo một nhiệm vụ để quét mục tiêu, bắt đầu nhiệm vụ quét một mục tiêu,… .GVMd cũng kiểm soát cơ sở dữ liệu SQL ( Postgres ở phiên bản GVM 10 và SQLite 3 cho các phiên bản trước) nơi tất cả dữ liệu kết quả và cấu hình quét được lưu trữ tập trung.

**GSA:** là giao diện web của GVM. Nó kết nối với GVMd để cung cấp giao diện cho người dùng với đầy đủ những tính năng của công cụ quản lý lỗ hổng. GSA bao gồm các thành phần:
•	GSA - ứng dụng web được viết bằng React.
•	GSAD – Là HTTP server giao tiếp với GVMd thông qua giao thức GMP.

**OpenVAS Scanner**: là một công cụ quét đầy đủ tính năng để thực thi một mẫu thử NVT nhằm mục đích kiểm tra một mục tiêu quét có vi phạm các lỗ hổng bảo mật, chưa cập nhật các bản vá cho hệ thống và các mục đích khác của một công cụ dò quét lỗ hổng. Và hầu hết Openvas Scanner sẽ thực hiện các nhiệm vụ và trả lại kết quả mà GVMd gọi đến.
## 2.	Cài đặt.
Đơn giản nhất, cách bạn có thể tải file vitual của OpenVAS tại đây (https://dl.greenbone.net/download/VM/gsm-ce-4.2.24.iso) rồi dùng Vmware hay phần mềm tương tự để setup như một máy ảo làm phần backend. Với cách này mặc dù OpenVAS chỉ hoạt động trên Linux nhưng có thể sử dụng được trên cả Windows hay Mac OS. Còn sau đây mình sẽ hướng dẫn cài đặt OpenVAS 9 trên Ubuntu:


**Bước 1: Thêm PPA repository**
`sudo add-apt-repository ppa:mrazavi/openvas`


**Bước 2: Update System**
`sudo apt-get update`


**Bước 3: Cài đặt SQLite**
Trong OpenVAS 9 trở về trước sẽ dùng SQLite để lưu trữ thông tin người dùng, quản lý thông tin các lỗ hổng, quản lý các config, ...

`sudo apt install sqlite3`


**Bước 4: Cài đặt OpenVAS 9**
`sudo apt install openvas9`

Nếu nó để nghị cấu hình Redis Unix socket thì lựa chọn yes và tiếp tục:
 ![](https://images.viblo.asia/0ed66475-0dfe-4a1a-8c99-bfa546aa8ce0.png)

**Bước 5: Cài những package cần thiết khác**
Để có thể đưa ra những báo cáo dưới dạng PDF, chúng ta cần phải cài một số package cho nó:
```
sudo apt install texlive-latex-extra --no-install-recommends
sudo apt install texlive-fonts-recommended
```

Chúng ta cần thêm “openvas-nasl” được cung cấp trong gói “libopenvas9-dev” để có thể chạy các OpenVAS NASL script phục vụ cho việc chạy các kịch bản kiểm tra:
`sudo apt install libopenvas9-dev`

Ngoài ta chúng ta sẽ thêm dữ liệu về các lỗ hổng vào database của công cụ bằng các đồng bộ chúng với các nguồn cung cấp:
```
sudo greenbone-nvt-sync
sudo greenbone-scapdata-sync
sudo greenbone-certdata-sync
```

Nếu đồng bộ lần đầu có thể sẽ mất khá nhiều thời gian. Sau khi đồng bộ xong chúng ta sẽ restart lại các service.

**Bước 6: Restart OpenVAS service**
Restart OpenVAS scanner.

`systemctl restart openvas-scanner`

Restart OpenVAS manager (GVMd).

`systemctl restart openvas-manager`

Restart Greenbone security assistant (GSA).

`systemctl restart openvas-gsa`

Rồi enable lại sau khi khởi đông lại các service.

```
systemctl enable openvas-scanner
systemctl enable openvas-manager
systemctl enable openvas-gsa
```


**Bước 7: Kiểm tra OpenVAS process**
`ps -aux | grep openvas`

 
Rebuild lại NVT cache và các mẫu thử được đồng bộ sẽ được load vào trong OpenVAS Manager
`openvasmd --rebuild --progress`


**Bước 8: Kiểm tra cài đặt**
Đến đây chúng ta đã hoàn tất cài đặt và có thể sử dụng công cụ dưới giao diện website. Mở browser và truy cập theo đường dẫn sau:
https://Server-Ip:4000

Thông tin đăng nhập mặc định là “admin/admin”
![](https://images.viblo.asia/38663392-34e6-4925-9420-c7dbec51561d.png)
 
Sau khi login chúng ta có thể thấy Dashboard
 ![](https://images.viblo.asia/ae71d5b3-757c-4228-adab-698abc013fb8.png)

## 3.	Sử dụng
OpenVAS có rất nhiều tính năng như đặt lịch quét, đặt lịch đồng bộ, vân vân mây mây thực sự là mình cũng chưa khám phá, sử dụng hết, để dành cho các bạn vậy :P. Sau đây mình sẽ thêm một target và bắt đầu quét nó:
-	Để thêm một target chúng ta click vào Configuration -> Target
 ![](https://images.viblo.asia/1a4fbe3d-5a87-4e19-a837-de7a9a9c27b4.png)
rồi click vào biểu tượng Vietnam Captain (sao xanh xanh)  và có thể cấu hình cho target
![](https://images.viblo.asia/0f01b444-bccf-484f-aded-266e19b70778.png)
-	Sau khi thêm target xong, để quét nó thì chúng ta thêm một task để rò quét nó tương tự như thêm target nhưng ở Scans -> Task
 ![](https://images.viblo.asia/e9f3c914-53a1-414d-a76a-c39dee90345f.png)
-	Đây là những bước đầu tiên Google bị hacker Vietnam quét sập :D
 ![](https://images.viblo.asia/20a90b49-7142-4872-b1cd-a3b275daa9d6.png)
Ok, done, trong bài này mình đã trình bày kiến trúc, cài đặt, và quét một target bằng OpenVAS. Sắp tới nếu có cơ hội mình sẽ giới thiệu một vài tool quét lỗ hổng cũng được đánh giá cao khác.


Tham khảo:
https://community.greenbone.net/t/about-gvm-architecture/1231
https://www.fosslinux.com/7320/how-to-install-and-configure-openvas-9-on-ubuntu.htm

- DaiNT -