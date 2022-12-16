# 1. Portainer là gì?
Portainer là một giao diện người dùng quản lý nhẹ cho phép bạn dễ dàng quản lý các môi trường Docker khác nhau của mình.

Portainer cung cấp giải pháp dễ dàng và đơn giản để quản lý Container Docker và các dịch vụ Swarm thông qua giao diện web. Portainer hỗ trợ một loạt các tính năng để quản lý Container Docker, chẳng hạn như quản lý việc tạo và xóa các dịch vụ Swarm, xác thực người dùng, ủy quyền, kết nối, thực thi lệnh trong bảng điều khiển của Container đang chạy và xem nhật ký của Container.
# 2. Cài đặt
## 2.1 Cài Portainer CE trên máy Host
Tạo một Portainer data volume
```
docker volume create portainer_data
```
Cài đặt Portainer CE
```
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
Sau khi cài đặt docker container cho portainer xong, chúng ra vào trình duyệt và gõ url: **http://IP:9000**

Đặt password lần đầu đăng nhập.
## 2.2 Cài Portainer Agent trên máy client
Chạy lệnh sau
```
docker run -d -p 9001:9001 --name portainer_agent --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes portainer/agent
```
Quay lại trang Home ta thấy có 1 máy Agent được thêm vào. Click vào để xem thông tin chi tiết

Bây giờ các bạn có thể start, stop, hay thâm chí remove các container mà không phải gõ command line nữa. Chúng ta có thể thao tác tất cả các nhiệm vụ của containers. Và bây giờ các bạn hoàn toàn có thể kiểm soát được toàn bộ hệ thống docker cho dự án của mình ở đây.
# Lời kết
Với những dự án nhỏ không sử dụng quá nhiều services hay containers docker thì bạn không nhất thiết phải cài đặt portainer để quản lý, vẫn hoàn toàn có thể sử dụng command line để quản lý cho chuyên nghiệp. Hy vọng qua bài viết các bạn đã biết về một công cụ để quản lý docker apps.

Tham khảo : [Quản lý Docker apps bằng Portainer](https://vietcalls.com/quan-ly-docker-apps-bang-portainer/)