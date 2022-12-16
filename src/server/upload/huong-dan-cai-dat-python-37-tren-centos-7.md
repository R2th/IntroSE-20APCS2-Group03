Mặc định các HĐH Centos đều được cài đặt sẵn Python 2. Trong bài viết này mình sẽ hướng dẫn các bạn cách cài đặt môi trường Python 3.7 trên hệ điều hành Centos 7.

**1. Cài đặt các yêu cầu**

Trước khi cài đặt Python, bạn cần phải cài đặt GCC compiler, bạn phải chạy với quyền root hoặc sudo
```
yum install gcc openssl-devel bzip2-devel libffi-devel
```

**2. Download Python 3.7**

Bạn tải bản cài đặt từ website chính thức
```
cd /usr/src
wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tgz
```

Bây giờ giải nén file đã tải về
```
tar xzf Python-3.7.3.tgz
```

**3. Cài đặt Python 3.7**

Bạn di chuyển vào thư mục Python-3.7 và chạy các lệnh dưới
```
cd Python-3.7.
./configure --enable-optimizations
make altinstall
```

Sử dụng **make altinstall** để tránh thay thế tệp binary mặc định của python **/usr/bin/python**

Bây giờ xóa file nén đã tải về đi
```
rm /usr/src/Python-3.7.3.tgz
```

**4. Kiểm tra Python Version **

```
python3.7 -V
```

Bài sau mình sẽ hướng dẫn cài môi trường Oracle Client cho phép bạn thao tác Python kết nối đến Database Oracle (Đây là 1 CSDL được đông đảo các nhà phát triển phần mềm sử dụng)