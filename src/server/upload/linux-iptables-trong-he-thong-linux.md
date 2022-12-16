**IPtables** là ứng dụng tường lửa miễn phí trong **Linux**, cho phép thiết lập các quy tắc riêng để kiểm soát truy cập, tăng tính bảo mật. Khi sử dụng máy chủ, tường lửa là một trong những công cụ quan trọng giúp bạn ngăn chặn các truy cập không hợp lệ. Đối với các bản phân phối Linux như **Ubuntu, Fedora, CentOS…** bạn có thể tìm thấy công cụ tường lửa tích hợp sẵn **IPtables**

![](https://images.viblo.asia/ec0d70b6-3173-4d2b-a7fe-c1c58ef42ef7.jpeg)

# 1. Các bảng trong IPTables
```
- FILTER: đây là bảng mặc định được sử dụng để lọc các gói và bao gồm các chuỗi như: INPUT, OUTPUT và FORWARD.
- NAT: bản có liên quan đến việc dịch địa chỉ mạng.
- MANGLE: bản được sử dụng để thay đổi các gói chuyên biệt
- RAW: dùng để cấu hình không theo dõi các kết nối
- SECURITY: thông thường, SELinux sử dụng để thiết lập chính sách bảo mật.
```

**Target trong IPTables**

 Target là một hành động sau khi các gói đáp ứng được các điều kiện của rule.

```
- ACCEPT: chấp nhận gói tin và gói được phép đi vào hệ thống.
- DROP: loại bỏ gói tin
- REJECT: loại bỏ gói tin và chuyển hướng xử lý đến một bảng khác.
- LOG: chấp nhận gói tin và ghi lại nhật ký.
```
**Chains trong IPTables**

Chains hay các chuỗi được tạo ra trong mỗi bảng giúp lọc các gói tin. Chúng ta có 3 dạng cơ bản như sau:

```
- INPUT: sử dụng để điều khiển các gói tin đến điểm đích hoặc máy chủ. Bạn có thể cho phép hoặc chặn các kết nối bằng nhiều cách như: địa chỉ IP, cổng hoặc giao thức.
- FORWARD: máy chủ sẽ trở thành trung gian để chuyển tiếp các gói đến nơi khác.
- OUTPUT: sử dụng để lọc các gói tin đi ra từ phía máy chủ của bạn.
```
Ngoài ra, còn có 2 chuỗi:
```
- PREROUTING: dùng để sửa đổi các gói khi chúng đến
- POSTROUTING: dùng để sửa đổi các gói khi chúng đi.
```
# 2. Lab
![](https://images.viblo.asia/8b5d2120-9d34-4c1c-a303-fa8704d50236.png)

## **Mô hình:**
- **Client, Server** cài hệ điều hành **Ubuntu** Server.
- Cấu hình **iptables** tại Server.

##  **Yêu cầu**
- Mặc định là DROP INPUT.
- Mặc định là ACCEPT OUTPUT.
- Mặc định là DROP FORWARD.
- ACCEPT Established Connection.
- ACCEPT kết nối từ loopback.
- ACCEPT kết nối Ping với 10 lần mỗi phút từ mạng LAN.
- ACCEPT kết nối SSH từ trong mạng LAN

## **Thực hiện**

Tạo default rule  **DROP INPUT, ACCEPT OUTPUT** và **DROP FORWARD**

```
iptables -P INPUT DROP
iptables -P OUTPUT ACCEPT
iptables -P FORWARD DROP
```
```
iptables -S
-P INPUT DROP
-P FORWARD DROP
-P OUTPUT ACCEPT
```
Tạo **Rule ACCEPT Established Connection**.

```
iptables -A INPUT -p tcp -m state --state ESTABLISHED -j ACCEPT
iptables -A INPUT -p udp -m state --state ESTABLISHED -j ACCEPT
```
Tạo rule **ACCEPT kết nối từ card loopback:**

```
iptables -A INPUT -s 127.0.0.1 -d 127.0.0.1 -j ACCEPT
```

Tạo rule **ACCEPT** kết nối Ping với 10 lần mỗi phút từ mạng LAN.
```
iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 10/m --limit-burst 5 -m state --state NEW,ESTABLISHED -s 172.16.100.0/24 -d 172.16.100.101 -j ACCEPT
```

Tạo rule **ACCEPT SSH**
```
iptables -A INPUT -p tcp -m state --state NEW -s 172.16.100.0/24 -d 172.16.100.101 --dport 22 -j ACCEPT
```
# Kết luận
Như vậy, qua bài viết này mình kết hợp với một lab nhỏ đã giải đáp được cho bạn Iptables là gì cũng như hướng dẫn bạn cách để cấu hình Iptables Ubuntu. Hi vọng có thể giúp ích cho bạn trong công việc bảo vệ server của mình. Chúc các bạn thành công!