![](https://images.viblo.asia/2964057c-85da-41fb-b14b-70eea31a327d.png)

Dự án đang ở giai đoạn closed beta, chuẩn bị mời user vào sử dụng thử. Bỗng một hôm ... nhận được tin nhắn từ chị BrSE: "Em ơi, vào check giúp chị server xem có vấn đề gì không với, API không gọi được". Nhanh nhảu SSH lên server, tôi lập tức  nhận được message **no space left on device**. Nhưng tại sao lại hết ổ cứng nhanh thế, source code có mỗi hơn 800MB. Sau một hồi truy lùng, chúng tôi đã tìm ra thủ phạm là ... Docker.

## 1. Tổng quan

Những thành phần chủ yếu chiếm dụng  bộ nhớ trong Docker:

- **Images**: Mỗi Docker images chiếm dung lượng từ khoảng vài chục MB đến hàng GB.
- **Containers**: Dữ liệu của ứng dụng chứa trong các containers.
- **Local Volumes**: Dữ liệu của container được mount ra ngoài ổ cứng thật.
- **Build Cache**: Có từ phiên bản Docker 18.09

Để kiểm tra các thông số này, chúng ta thực hiện lệnh:

```bash
docker system df
```

![](https://images.viblo.asia/83272cbd-8f7b-4114-a471-8ea5cf93804a.png)

Hừm. Tổng dung lượng chưa đến 1GB, thế dung lượng ổ cứng đi đâu hết ?

Nếu máy của các bạn bị đầy do images, Volumes hay Container thì đơn giản là xóa những cái không cần thiết đi

### Images

Xóa các Docker image đang không sử dụng đi

```bash
docker image prune
```

### Volumes

Tương tự với volumes

```bash
docker volume prune
```

### Build Cache

Cả build cache nữa

```bash
docker builder prune
```

## 2. Truy tìm nguyên nhân

Để tìm ra nguyên do đầy ổ cứng, chúng ta trở về cách cơ bản nhất là liệt kê ra dung lượng của các thư mục xem đâu là thử mục chiếm nhiều ổ cứng nhất.

Trên Linux, chúng ta chạy lệnh, hệ thống sẽ liệt kê cho chúng ta các thư mục theo dung lượng từ thấp đến cao:

```bash
du -h | sort -h
```

Bắt ngay được folder chiếm 14GB (phân vùng  / trên server 15GB)

```bash
12G	./var/lib/docker/containers
14G	./var/lib/docker
```

Vậy là do Docker rồi :confused: Nhưng mấy folder này lưu cái gì nhỉ :thinking:

- `/var/lib/docker/containers`: Lưu log của các container (mặc định được lưu dưới dạng file JSON)

Vậy là đã rõ.Theo mặc định, Docker sẽ không giới hạn kích thước file log trong container, server chạy 1 thời gian thì kích thước file log sẽ tăng dần lên, có thể đến hàng chục, hàng trăm GB :scream:

## 3. Giải pháp

Giới hạn kích thước file log của Docker container, tự clear file log theo định kỳ.

### Clear file log

```bash
sudo sh -c 'truncate -s 0 /var/lib/docker/containers/*/*-json.log'
```

Sau khi truncate xong:

```bash
270MB ./var/lib/docker/containers
```

### Clear file log theo định kỳ với Logrotate

**Logrotate** là tiện tích hệ thống quản lý việc tự động  xóa log theo định kỳ. Chúng ta sẽ cùng config với **Logrotate**  để giới hạn kích thước cũng như clear theo định kỳ file log của Docker.

```bash
cd /etc/logrotate.d
sudo touch docker-logs
```

Chỉnh sửa nội dung của file `docker-logs`

```js
/var/lib/docker/containers/*/*.log {
 rotate 7
 daily
 compress
 size=50M
 missingok
 delaycompress
 copytruncate
}
```

## Tài liệu tham khảo
https://medium.com/better-programming/docker-tips-clean-up-your-local-machine-35f370a01a78

https://blog.birkhoff.me/devops-truncate-docker-container-logs-periodically-to-free-up-server-disk-space/