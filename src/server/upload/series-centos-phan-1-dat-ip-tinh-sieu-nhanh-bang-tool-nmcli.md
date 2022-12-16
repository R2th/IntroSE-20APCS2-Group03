## Các bước đổi IP tĩnh cho thiết bị sử dụng hệ điều hành CentOS (CentOS 7, CentOS 8 ) một cách đơn giản và cực kì nhanh chóng với 6 CLI sau

#### 1. Kiểm tra các card đang có và xác định tên card mạng cần đặt ip tĩnh
```
nmcli c
```
#### 2. Đặt ip với tên card mạng tương ứng
```
nmcli c m ens33 ipv4.addresses 192.168.99.100/24
```
#### 3. Đặt ip gateway
```
nmcli c m ens33 ipv4.gateway 192.168.99.1
```
#### 4. Đặt mode static
```
nmcli c m ens33 ipv4.method manual
```
#### 5. Đặt ip dns
```
nmcli c m ens33 ipv4.dns "8.8.8.8"
```
#### 6. Up card mạng
```
nmcli c up ens33 
```
### Lưu ý:
- **ens33** tên card mạng muốn đặt ip tĩnh (tên card mạng cũng có thể là eth hoặc eno )
- các tham số ip address, gateway, dns có thể thay đổi tùy ý
- tool nmcli thường có sẵn trong CentOS7, 8.
    
***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Mình xin cám ơn.***