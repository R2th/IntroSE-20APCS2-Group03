Công việc đầu tiên chúng ta cần làm ngay sau khi nhận được tài khoản login VPS/Server đó là kiểm tra cấu hình phần cứng, network coi có đúng như những gì nhà cung cấp đưa ra hay không. Trong bài viết này mình sẽ giới thiệu một số lệnh đơn giản check từng thông số server.
# 1. Kiểm tra thông tin CPU
```
cat /proc/cpuinfo
```
![](https://images.viblo.asia/7244dc28-9a86-423e-96dc-4ee7c95d86c5.png)
# 2. Kiểm tra thông tin RAM
```
free -m
```
![](https://images.viblo.asia/7fb37383-dcb9-4f36-aa41-c15a984a1c7a.png)

# 3. Kiểm tra thông tin ổ cứng
Sử dụng lệnh df có sẵn của Linux/Unix
```
df -h
```
![](https://images.viblo.asia/8d6aa226-b9a1-45d6-90d4-bf97106f2da9.png)
# 4. Kiểm tra thông tin Hệ điều hành
Thông tin hệ điều hành, ví dụ centos sẽ được lưu vào file /etc/centos-release
```
cat /etc/*-release
```
![](https://images.viblo.asia/fdee6f58-2f92-4b55-b80f-4ff8ef11f077.png)
Kiểm tra thông số của ổ cứng
```
dd if=/dev/zero of=1GB.tmp bs=1024 count=1M conv=fdatasync
```
![](https://images.viblo.asia/005d6f35-6d36-4884-8962-853ee1203d9f.png)
Các bạn có thể thấy tốc độ ổ cứng trên vps là 249MB/s (SSD Disk)

Tham khảo: [Lệnh kiểm tra các thông số VPS/Server](https://vietcalls.com/cac-lenh-linux-kiem-tra-cac-thong-so-vps-server/)