Làm trai "ngành" được mấy năm, mình nhận thấy mọi thứ cũng đang dần thay đổi chóng mặt. Nếu xét thời điểm 5 năm trước, Docker vẫn còn là một thứ gì đó xa lạ mà nhiều công ty cũng chỉ mới bắt đầu sử dụng thì bây giờ nó giường như là công cụ "gối đầu giường" của các anh dev luôn. Và thuận theo xu thế, khi bạn bước chân vào thế giới micro-services, tìm hiểu về Docker rồi sau đó Kubernetes chắc chắn sẽ là điểm đến tiếp theo trong chặng đường làm "ngành" năm 2021 của bạn.

Bài viết này sẽ hướng dẫn cách để bạn cài đặt máy ảo Debian 10 trong Hyper-V trên Windows 10. Giúp bạn tạo dựng nhiều "VPS" trên máy local để việc học tập Kubernetes trở nên giống với thực tế hơn, qua việc bạn có được K8s cluster với nhiều node ngay máy localhost.

## Requirement

- Máy đã cài đặt và kích hoạt Hyper-V thành công trên Windows 10
- Chuẩn bị file ISO cài đặt Debian 10.
- Bộ nhớ khả dụng  >= 10GB

## Download Debian 10

Bạn có thể truy cập https://debian.org rồi nhấn vào nút "Download" để tải bản mới nhất.

![](https://images.viblo.asia/113e1983-cfcd-49f4-a0c2-4123355b9957.png)

Hoặc có thể dùng link download trực tiếp này của Debian mà mình dùng cũng được: https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-10.9.0-amd64-netinst.iso

## Cài đặt Debian 10 trong Hyper-V

Dưới đây là quá trình thực hiện cài đặt, bạn mở Hyper-V Manager lên, sau đó nhấn vào nút "Quick Create" để tạo một VM mới. Bạn làm theo video screencast của mình dưới đây nha.

***Chú ý:** Phần Network Adapter, trên máy mình mình dùng custom thành Hyper-V Internal, các bạn để Default Switch hoặc dùng cái khác tùy bạn nhé. Còn mình tạo cái Hyper-V Internal có fix IP Static để thuận tiện cho nhu cầu cá nhân.*

{@embed: https://www.youtube.com/watch?v=oaqNt5e_Jws}

## Fix lỗi "sudo command not found"

Sau khi cài đặt, mặt định thì lệnh `sudo` sẽ không có nên bạn cần cài thêm package `sudo` để có nhé.

1. Chuyển qua `root` user

```bash
su root
```

2. Chạy lệnh update

```bash
apt update
```

3. Cài `sudo`

```bash
apt install sudo
```

4 Promote user `clouduser`  thành `sudoer`

```bash
usermod -aG sudo clouduser
```

## Tổng kết

Trên đây là chia sẻ cách bạn cài đặt Debian 10 trong Hyper-V, nếu bạn thấy hữu ích thì đừng ngại ngần Upvote cho mình nhé. Chúc các bạn một ngày cuối tuần vui vẻ và học hỏi được nhiều kiến thức IT mới trên Viblo!

Cảm ơn các bạn đã theo dõi! Bye :wave: :wink:

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***