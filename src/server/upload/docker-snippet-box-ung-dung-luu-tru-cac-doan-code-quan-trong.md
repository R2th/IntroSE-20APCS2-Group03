## Mở đầu
Chào mọi người, tiếp các bài chia sẻ về ứng dụng trong Docker. Hôm nay là TIP tiếp theo mình chia sẻ mọi người một ứng dụng khác. Có rất nhiều cách để lưu trữ lại các đoạn code mà bạn ưu thích không phải nói là vô vàng cách 😜😜 . Hôm nay mình chia sẻ mọi người cách tạo một ứng dụng siêu đơn giản và nhẹ tênh mà hữu ích với Docker nhé. 
Dzoo luôn...
## 1. Snippet Box là gì?

Snippet Box là một ứng dụng lưu trữ đơn giản tổ chức các đoạn code của bạn. Nó cho phép bạn dễ dàng tạo, chỉnh sửa, xoá và quản lý các đoạn code của mình bằng nhiều ngôn ngữ khác nhau. Hỗ trợ Markdown tích hợp, Snippet Box giúp bạn dễ dàng thêm ghi chú hoặc tài liệu đơn giản vào code của mình. Bạn đọc thêm thông tin [tại đây](https://github.com/pawelmalak/snippet-box)

![](https://images.viblo.asia/cdda25e8-690e-4b84-a34c-94c45cf61f81.png)

## 2 Cài đặt
Việc cài đặt Snippet Box khá đơn giản bạn dùng Docker hoặc docker-compose để cài đặt. Bạn nào chưa cài đặt docker tham khảo bài viết trước của mình.

[Cài đặt docker docker-compose trên Ubuntu, CentOS](https://viblo.asia/p/docker-scripts-cai-dat-docker-docker-compose-tren-ubuntu-centos-Eb85oOnm52G)

### Chạy trực tiếp với Docker
```
sudo docker run -d --name snippetbox -p 5100:5000 -v /srv/config/snippetbox:/app/data pawelmalak/snippet-box
```
### Chạy với docker-compose
```
version: '3'
services:
 snippet-box:
  image: pawelmalak/snippet-box:latest
  container_name: snippet-box
  volumes:
    - /path/to/host/data:/app/data
  ports:
    - 5000:5000
  restart: unless-stopped
```
## 3 Chức năng
* Tìm kiếm- Tìm kiếm các đoạn code của bạn với các thẻ lưu sẵn.
* Ghim - Ghim lại các đoạn code yêu thích, quan trọng của bạn vào màn hình chính để truy cập dễ dàng và nhanh chóng.

![](https://images.viblo.asia/d2b26e29-732a-4986-9655-832d58f8a82a.png)

* Snippet library - Quản lý các đoạn code của bạn thông qua thư viện có sẵn dễ dàng lọc và truy cập qua các thẻ.

![](https://images.viblo.asia/41b87ac1-f8ab-4218-9e1c-c533847f48f1.png)

* Snippet - Tab này cho phép bạn thêm xoá  sửa đoạn code mà bạn muốn

![](https://images.viblo.asia/a1f6632b-9105-478c-8f90-80ae2f67207d.png)

Hi vọng bài viết giúp các bạn tạo cho mình một nơi ghi chú lưu lại các đoạn code  hay bất cứ gì mà bạn muốn qua ứng dụng Snippet Box với Docker thật đơn giản.
Chúc các bạn thành công.!

Tham khảo:

[Project](https://github.com/pawelmalak/snippet-box)

[Bài viết tham khảo](https://vietcalls.com/snippet-box-noi-luu-lai-cac-doan-code-quan-trong/)