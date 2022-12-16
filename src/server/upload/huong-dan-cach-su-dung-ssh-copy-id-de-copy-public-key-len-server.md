Bình thường, sau khi bạn tạo một VPS và muốn SSH được vào server bằng SSH key để thực hiện cài đặt server, bạn sẽ cần điền SSH Public Key của bạn vào file  `~/.ssh/authorized_keys`. Ngày trước, mình thường mở file SSH Public Key dưới local, copy nội dung rồi sau đó SSH lên server và paste nội dung bằng terminal.

Tuy nhiên, ngoài ra thì có một cách tiện lợi hơn để giúp bạn có thể copy SSH Public Key của mình lên server đó là dùng công cụ có sẵn đó là `ssh-copy-id`.

Nếu không có server để làm thử, bạn có thể tham khảo bài viết [Hướng dẫn dựng máy ảo Debian 10 trong Hyper-V trên Windows 10 ](https://viblo.asia/p/924lJGL85PM) để tạo nhiều máy ảo học tập nhé.

## ssh-copy-id là gì?

`ssh-copy-id` là công cụ được cài sẵn trong gói cài đặt [OpenSSH](https://www.ssh.com/academy/ssh/openssh). Nó giúp bạn copy SSH Public Key và điền vào file `~/.ssh/authorized_keys` trên server.

Chính vì nó đã cài sẵn thế nên thường bạn sẽ không cần phải thực hiện thêm lệnh nào để cài thêm nó nữa đâu.

## Cách dùng lệnh `ssh-copy-id`

Cách sử dụng `ssh-copy-id` cũng rất đơn giản, bạn chạy lệnh trong terminal giống như bạn sử dụng lệnh SSH lên server vậy:

```bash
ssh-copy-id username@remote-server
```

Trong đó:
- `username` là tên đăng nhập tài khoản trên server
- `remote-server` là địa chỉ IP hoặc là hostname tương ứng của server trong file `~/.ssh/config`

Khi chạy lệnh, bạn nhập mật khẩu đăng nhập của tài khoản server nữa là xong. Mặc định, nó sẽ copy SSH Public Key mặc định là `~/id_rsa.pub` lên server.

### Chỉ định rõ file SSH Public Key

Trong trường hợp bạn SSH Public Key của bạn không phải tên mặc định, bạn có thể chỉ rõ đường dẫn tới file Public Key bằng tham số `-i`.

VD:

```bash
ssh-copy-id -i ~/.ssh/viblo-asia.pub kimnguyen@viblo.asia
```

### Chỉ định SSH port

Trong trường hợp SSH Server của bạn không dùng port `22` như mặc định, bạn có thể dùng tham số `-p` để chỉ định rõ port.

VD:

```bash
ssh-copy-id -i ~/.ssh/viblo-asia.pub -p 2222 kimnguyen@viblo.asia
```

## Tổng kết

Trên đây là cách để bạn copy SSH Public Key nhanh chóng và không rườm rà. Nếu các bạn thấy bài viết này hữu ích, đừng quên upvote bài viết này để ủng hộ mình nhé.

Bài viết tiếp theo của mình sẽ là chủ đề về Kubernetes. Các bạn follow mình để nhận được thông báo nha.

Nếu bạn có thêm những yêu cầu chủ đề nào muốn mình chia sẻ, hãy để lại comment phía bên dưới nhé. Mình luôn sẵn lòng nếu khả năng mình cho phép :wink: =))

Bye :wave: :wave: :wave:

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***