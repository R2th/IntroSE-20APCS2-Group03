Pyenv là một công cụ "vi diệu" dùng để quản lí các version Python khác nhau. Công cụ này cho phép bạn cài đặt các version Python một cách nhanh chóng và dễ dàng và vẫn giữ hệ thống của bạn sạch sẽ, tránh việc phải cài đặt những gói không cần thiết. Đối với những dự án khác nhau sẽ yêu cầu version Python khác nhau, Pyenv sẽ giúp bạn chuyển đổi sang các version Python khác nhau tùy  một cách nhanh chóng và thuận tiện. Trong bài viết này, mình sẽ hướng dẫn mọi người cách cài đặt Pyenv trên môi trường Ubuntu và cách sử dụng Pyenv như thế nào.

**1. Cài đặt PyEnv**

- Đầu tiên, để Pyenv cài đặt chính xác phiên bản Python mà bạn cần, cần phải cài đặt các dependencies cần thiết cho Python. Các bạn sử dụng câu lệnh sau để cài đặt:

```
sudo apt-get update
sudo apt-get install --no-install-recommends make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```
- Tiếp theo tải Pyenv về bằng câu lệnh sau:
```
 git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```
- Ở đây mình tải pyenv về thư mục $HOME/.pyenv, bạn có thể chọn tải về vào thư mục khác.
- Tiếp theo cài đặt biến môi trường, sử dụng câu lệnh sau:
```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
```
- Tiếp theo theo thêm pyenv vào CMD:
```
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
```
- Sau đó chạy câu lệnh:
```
exec "$SHELL"
```
- Kiểm tra đã cài đặt thành công hay chưa, các bạn sử dụng câu lệnh sau:
```
pyenv --version
```

![](https://images.viblo.asia/f057947e-0412-4299-b121-3b6fff201060.png)

**2. Cách sử dụng**
- Phiên bản python mình đang sử dụng: 

![](https://images.viblo.asia/15cfa1f4-1ffb-4dac-9204-350c0d9ec7e3.png)

- Mình muốn cài đặt python 3.8.0, mình sẽ làm như sau: 
```
pyenv install 3.8.0
```
- Để có thể sử dụng python 3.8.0, mình sẽ tạo ra một virtualenv cho python 3.8.0:
```
pyenv virtualenv 3.8.0 python_3.8.0
```
- Mình tạo ra một virtualenv có tên là python_3.8.0, và để kích hoạt virtualenv vừa được tạo ra, mình sẽ làm như sau:
```
pyenv local python_3.8.0
```
![](https://images.viblo.asia/9f563376-d141-4d9b-a0fe-a27c0e06ee0f.png)

- Vậy là mình đang sử dụng python_3.8.0, và để deactive virtualenv, mình sẽ làm như sau:
```
pyenv local system
```
![](https://images.viblo.asia/821e7875-0206-40c6-9016-1d27d82cdd6e.png)

- Bạn có thể chuyển sang các phiên bản python khác nhau, bằng cách tải phiên bản python mà bạn muốn sử dụng, và tạo ra một virtualenv và active lên là có thể sử dụng được.

**3. Lời kết**
- Hy vọng bài viết này sẽ có ích với các bạn.
- Các bạn tham khảo thêm pyenv ở đây: https://github.com/pyenv/pyenv