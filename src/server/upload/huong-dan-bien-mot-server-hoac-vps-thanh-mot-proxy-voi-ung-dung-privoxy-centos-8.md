<br>
<br>
<br>

## I. Privoxy là gì?
<br>

Privoxy là một proxy web không lưu vào bộ nhớ đệm với khả năng lọc nâng cao để tăng cường quyền riêng tư, sửa đổi dữ liệu trang web và tiêu đề HTTP, kiểm soát quyền truy cập và loại bỏ quảng cáo cũng như các rác Internet đáng ghét khác. Privoxy có cấu hình linh hoạt và có thể được tùy chỉnh để phù hợp với nhu cầu và thị hiếu cá nhân. Nó có ứng dụng cho cả hệ thống độc lập và mạng đa người dùng.
<br>
<br>

## II. Các bước biến một server hoặc vps thành proxy
<br>
<br>

**Bước 1:** 
<br>
Đầu tiên bạn cần chuẩn bị một server hoặc vps, bạn có thể liên hệ các bên mua bán vps uy tín để mua. Vì dùng để làm proxy nên bạn cũng ko cần mua cấu hình cao quá (Ram tầm 1GB, 1 core là quá ổn)
<br>
<br>
**Bước 2:**
<br>
Bạn cần truy cập vào server bằng các lệnh ssh quen thuộc (mình đã mua sẵn 1 cái để test đây rồi)
![image.png](https://images.viblo.asia/d9fe62c9-c387-43e8-9e16-e16d7040b588.png)

<br>

**Bước 3:**
<br>
Cài đặt với các lệnh sau (mình đang đang sài CentOs 8)

`yum install epel-release -y`


![image.png](https://images.viblo.asia/561092bf-a7df-41e1-b3b8-a8d223533176.png)

<br>

`yum install privoxy -y`

![image.png](https://images.viblo.asia/3430a78d-8033-4a4a-ba9a-3716bd688e06.png)

<br>

Vậy là bạn đã cài đặt xong privoxy rồi đó.

<br>

**Bước 4:**
<br>
Tạo config cho privoxy

`vi privoxy_config`

Sau đó copy dòng này vào nhé
<br>

`listen-address [ip_address]:[port]`

Trong đó, ip_address là ip vps bạn mua, còn port là cổng mà bạn muốn public
<br>
![image.png](https://images.viblo.asia/7ebc19c0-9890-4618-9497-55fd799f278c.png)

<br>

Sau đó lưu lại ESC -> :wq

<br>

**Bước 5:**
<br>

Chạy privoxy với config mình vừa tạo:

`/usr/sbin/privoxy privoxy_config`

<br>

OK, chúng ta khởi động privoxy xong rồi đó
<br>
![image.png](https://images.viblo.asia/f6ecc20a-b24b-445f-aaf6-4cc3b7ff6f3e.png)

<br>

**Bước 6:**
<br>

Bạn mở port mà bạn vừa lắng nghe ở bước 4 như vậy là xong.
<br>

**Bước 7:**

Kiểm tra tại local một chút xem đã oke chưa nhé. Bạn có thể sử dụng Firefox và cài proxy cho firefox
<br>
![image.png](https://images.viblo.asia/aa33c04d-64eb-4370-aa56-6048c8c44c51.png)

<br>

![image.png](https://images.viblo.asia/d6ea8732-9f3f-46d7-8e11-4665064e5e2d.png)

Thành công rồi nhé mọi người!!!

<br>
<br>
<br>

# Cảm ơn mọi người đã theo dõi mình!!!