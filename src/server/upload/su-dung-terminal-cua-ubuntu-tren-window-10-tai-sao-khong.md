# Window Subsystem Linux là gì?
**Windows Subsystem for Linux (WSL)** về bản chất giống như một công cụ thông dịch giữa các tools chạy trên *NIX và Windows Kernels.

1. Các hệ điều hành có 2 phần. Một phần là kernel (gọi là kernel space trong *nix) và user-mode(gọi là user space trong *nix). Kernel và user-mode nói chuyện với nhau thông qua một thứ gọi là system call.
2.   System call của Windows khác với system call của *NIX nên các phần mềm của *NIX không thể chạy được trên Windows. Ở đây Microsoft đã xây dựng Windows Subsystem for Linux (WSL) nằm ở giữa user-mode (bash, git, Ruby, etc) và Windows Kernel và nó làm nhiệm vụ “thông dịch viên”
3.   Lúc này những tool được viết trên *NIX có thể chạy trên Windows vì khi nó thực hiện system call, WSL trả lời hệt như trên *NIX nên mấy cái tool này cứ hoạt động bình thường mà không biết là nó đang chạy trên Windows

![](https://images.viblo.asia/4ab3cfc3-b4f5-4e11-9761-277e8baf325d.jpg)

# Hướng dẫn cài đặt WSL

Cài đặt WSL hết sức đơn giản, chỉ cần mở Store của Window 10 và gõ "Ubuntu 16.04" và thực hiện cài đặt

![](https://images.viblo.asia/01c5ea93-7866-4e08-9775-c79b6a7436a5.png)

Mở lên và cài đặt theo hướng dẫn của ứng dụng  ta được giao diện dòng lệnh như sau

![](https://images.viblo.asia/99d189f1-57f5-4b0e-bc67-b9890c8dc74c.png)

Bây giờ chúng ta hoàn toàn có thể thực hiện mọi thứ trên Ubuntu trên cửa sổ dòng lệnh này

Đối với các bạn sử dụng git để WSL trông xịn xò hơn thì có thể cài thêm zsh và oh-my-zsh

Các bạn có thể cài đặt zsh và oh-my-zsh như sau:

### Cài đặt zsh

Vào cửa sổ đong lệnh WSL lần lượt gõ các lệnh sau:

`sudo apt-get install zsh`

`vim~/.bashrc`

Cài đặt zsh để khởi chạy mặc đinh

![](https://images.viblo.asia/f9857163-3b51-4357-99e0-3a1bf94d144a.png)

### Cài đặt Oh-my-zsh

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

Tuy nhiên đến bước này thì font chữ trong WSL sẽ bị lỗi bởi vì trên window không có các font chữ giống như trên Linux

Chúng ta có thể cài thêm font bị thiếu theo hướng dẫn [ở đây](https://medium.com/@slmeng/how-to-install-powerline-fonts-in-windows-b2eedecace58)

Tèn ten :v.... sau khi đã hoàn tất thì ta được một WSL hoàn toàn mới

![](https://images.viblo.asia/99a61950-5c83-4785-906e-19778a2007a6.png)

Các bạn có thể cài thêm terminal mới như Hyper.js để tùy biến cho WSL của mình [tham khảo](https://medium.com/@ssharizal/hyper-js-oh-my-zsh-as-ubuntu-on-windows-wsl-terminal-8bf577cdbd97)

Cuối cùng mình sẽ thử chạy một server web trên WSL

Ở đây mình sử dụng Ruby On Rails

![](https://images.viblo.asia/04430bad-d0d7-4e00-bd5c-91887db6ffcb.png)

Vào `localhost:3000` và kiểm tra

![](https://images.viblo.asia/3d24ed28-3c51-4913-8de8-b5cffe2e3a23.png)

Vậy đã chạy thành công một ứng dụng rails trên môi trương Linux thông qua WSL. Chúng ta có thể sửa code với các texteditor trên window và chạy nó trong môi trường Linux, để thực hiện điều này chúng ta cần vào được phân vùng mount của window trên WSL.

![](https://images.viblo.asia/cb6a497b-9c7f-4c85-b7dd-5e2a5b09880e.png)

Trong hình trên khi di chuyển đến thư muc `mnt` trên WSL, trong thư mục này chứa các ổ đĩa tương ứng của window là `c,d,e,f` đến bước này thì ta có thể vào ổ đĩa tùy ý trên máy Win 10 và tạo các project với môi trường Linux, sau đó nếu muốn sửa chữa source code chỉ cần vào ổ đĩa tương ứng và mở project lên với bất kì một texteditor nào trên máy của bạn là có thể sửa được.

Nhìn chung thì WSL cung cấp cho chúng ta một cửa sổ dòng lệnh trên Linux và giao diện thao tác thì lại của window


Bài viết của mình đến đây là kết thúc, hy vọng có thể giúp các bạn coder có một cái nhìn khác về Window.

Bài viết có thể chưa được chi tiết, các bạn có thể tham khảo thêm tại:

https://www.youtube.com/watch?v=Cvrqmq9A3tA

https://docs.microsoft.com/en-us/windows/wsl/install-win10

https://medium.com/@ssharizal/hyper-js-oh-my-zsh-as-ubuntu-on-windows-wsl-terminal-8bf577cdbd97