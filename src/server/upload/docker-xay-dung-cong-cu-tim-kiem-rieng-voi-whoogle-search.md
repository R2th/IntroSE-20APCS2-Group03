Chào các bạn, tiếp tục **TIP** chia sẻ về **Docker** hôm nay là một góc chia sẻ nữa đó là **Xây dựng công cụ tìm kiếm riêng với Whoogle Search**.

![](https://images.viblo.asia/78ae5331-764f-449a-903f-2bd3d0104c7e.png)

## 1.Tổng quan
### 1.1 Whoogle-search là gì?
**Whoogle-search** là  một công cụ tìm kiếm tự lưu trữ, không có quảng cáo và tôn trọng quyền riêng tư. Bạn đọc thêm project [tại đây](https://github.com/benbusby/whoogle-search)

Khi nhận kết quả tìm kiếm của **Google** nhưng không có bất kỳ quảng cáo, javascript, liên kết AMP, cookie hoặc theo dõi địa chỉ IP nào. Có thể dễ dàng triển khai chỉ bằng một cú nhấp chuột dưới dạng ứng dụng **Docker** và có thể tùy chỉnh bằng một tệp cấu hình duy nhất. Nhanh chóng và đơn giản để triển khai như một công cụ tìm kiếm thay thế chính trên cả máy tính để bàn và thiết bị di động.
### 1.2 Các đặc trưng của Whoogle-search
* Không có quảng cáo hoặc nội dung được tài trợ
* Không có javascript
* Không có cookie
* Không theo dõi / liên kết địa chỉ IP cá nhân của bạn *
* Không có liên kết AMP
* Không có thẻ theo dõi URL (tức là utm =% s)
* Không có tiêu đề liên kết giới thiệu
* Tự động điền / đề xuất tìm kiếm
* ĐĂNG yêu cầu tìm kiếm và truy vấn đề xuất (khi có thể)
* Xem hình ảnh ở độ phân giải đầy đủ mà không cần chuyển hướng trang web (hiện chỉ dành cho thiết bị di động)
* Chế độ tối
* Tác nhân người dùng được tạo ngẫu nhiên
* Dễ dàng cài đặt / triển khai
* Tìm kiếm dựa trên vị trí tùy chọn (tức là các kết quả gần <city>)
* Chế độ NoJS tùy chọn để tắt tất cả Javascript trong kết quả
## 2.Cài đặt Whoogle-search
Có nhiều cách cài **Whoogle-search** khác nhau để bắt đầu sử dụng ứng dụng. Bạn đọc thêm doc hướng dẫn [tại đây](https://github.com/benbusby/whoogle-search). Trong bài viết hôm nay mình chia sẻ cách cài sử dụng công cụ **Docker**.
Nếu bạn chưa biết Docker là gì các bạn xem lại bài viết trước của mình 
    
[    Docker là gì?
](https://viblo.asia/p/docker-dockerfile-la-gi-WAyK8GNN5xX)    
    
[Cài đặt docker docker-compose trên Ubuntu, CentOS](https://viblo.asia/p/docker-scripts-cai-dat-docker-docker-compose-tren-ubuntu-centos-Eb85oOnm52G)
    
 Bài viết này mình sử dụng **Ubuntu 20.04 LTS ** và các bản phân phối khác tương tự.

**Server VPS cho Whoogle-search:**

> OS: Ubuntu 20.04 LTS
> 
> Cấu hình: 2 CPU / 2 GB RAM / 20 GB Disk
> 
> IP: 123.123.123.123 (IP Public – eth0)
### 2.1 Tạo một docker-compose file
Đầu tiên, các bạn tạo một thư mục **/opt/Whoogle-search** và file **docker-compose.yaml** mới trong thư mục này.
```
mkdir /opt/Whoogle-search
 ```
```    
vim /opt/Whoogle-search/docker-compose.yaml    
```
 ```
---
version: "2"
services:
  whoogle:
    image: benbusby/whoogle-search:latest
    container_name: whoogle
    ports:
      - 5000:5000
    restart: unless-stopped   
```
### 2.2.Thiết lập Whoogle-search
Chúng ta khởi động bằng command sau:
```
cd /opt/Whoogle-search
docker-compose up -d    
```
 Sau khi chạy hoàn tất, nếu không có lỗi hiển thị, bạn mở cửa sổ trình duyệt và truy cập địa chỉ IP máy chủ của bạn trên cổng 5000 (hoặc bất kỳ cổng nào bạn đặt ở bên trái của ánh xạ).
  http://IP:5000  
    ![](https://images.viblo.asia/c2e0dbe4-6feb-4118-9b3d-c2a77e0addae.png)

Bây giờ thử trải nghiệm, tìm kiếm điều bạn muốn  
## Lời kết
Mình xin đóng máy tại đây, phần trải nghiệm để các bạn tự sướng nhé 😅😅😅 .
 
 Chúc các bạn thành công.!
 
  Tham khảo:  [whoogle-search  ](https://github.com/benbusby/whoogle-search)
  
{@embed: https://www.youtube.com/watch?v=0r9PNYFV5BM}