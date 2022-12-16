Quảng cáo: bạn có thể xem bài viết gốc tại https://vuonghv.github.io/blog/pyenv-virtualenv-perfect-couple.html
# Pyenv là gì?

Nếu đã từng phải làm việc với nhiều project Python, trong đó mỗi project lại yêu cầu các phiên bản Python khác nhau, có lẽ bạn phải đối mặt với vấn đề cài đặt và chọn lựa phiên bản Python cho project của mình.

Hơn nữa, các bản Python được cài đặt sẵn trong OS thường rất chậm trong việc cập nhật các tính năng mới vì mục đích ổn định, do đó nếu bạn muốn test thử các tính năng mới, bạn thường đi đến 2 lựa chọn sau:

1. Tự build và cập nhật phiên bản Python của OS, nhưng việc này ẩn chứa nhiều rủi ro, có thể những thành phần khác sẽ chưa tương thích với phiên bản mới này.
2. Sử dụng máy ảo hoặc docker, nhưng nhiều lúc chúng quá rườm rà và phức tạp. Dù sao thì gõ lệnh trực tiếp trên máy thật vẫn nhanh gọn hơn phải không?

Được tạo ra để giải quyết các vấn đề trên, [Pyenv](https://github.com/pyenv/pyenv) là công cụ quản lý phiên bản Python, giúp việc cài đặt các phiên bản Python khác nhau cực kỳ dễ dàng.
Pyenv tích hợp với plugin [Virtualenv](https://github.com/pypa/virtualenv) hỗ trợ tạo ra các môi trường ảo (virtual environment), các thư viện của project sẽ được cài đặt cô lập trong môi trường ảo này mà không ảnh hưởng đến hệ thống.

Một tính năng cực kỳ hữu dụng của Pyenv, không thể bỏ qua, đó là câu lệnh `pyenv local`: **tự động kích hoạt (activate)** môi trường ảo khi bạn cd vào thư mục project của mình, và **tự động tắt (deactivate)** môi trường khi bạn rời khỏi thư mục đó.

# Cài đặt

Bạn có thể xem hướng dẫn cài đặt từ trang chủ của Pyenv trên Github hoặc sử dụng tool [pyenv-installer](https://github.com/pyenv/pyenv-installer) như bên dưới:

```bash
$ curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

Sau đó chèn 3 dòng dưới đây vào file cấu hình shell (vd file `~/.bashrc` với Bash hoặc `~/.zshrc` cho Zsh) để tự động load `pyenv` khi mở một termial mới:

```bash
export PATH="~/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

# Sử dụng

Bên dưới mình sẽ demo cách sử dụng pyenv để thiết lập môi trường ảo sử dụng python 3.6.6 cho project demo, giả sử có đường dẫn là `~/projects/demo`:

1. Cài đặt phiên bản Python mong muốn sử dụng pyenv:

    ```bash
    $ pyenv install 3.6.6
    ```
    Nếu cài đặt bị lỗi, có thể hệ thống của bạn thiếu các thư viện cần thiết cho việc compile, cài đặt các thư việc còn thiếu tại đây [https://github.com/pyenv/pyenv/wiki/Common-build-problems](https://github.com/pyenv/pyenv/wiki/Common-build-problems)
2. Tạo môi trường ảo với virtualenv, môi trường này sử dụng Python 3.6.6. Ở đây mình đặt tên là `demo-env`:

    ```bash
    $ pyenv virtualenv 3.6.6 demo-env
    ```
3. Kích hoạt môi trường ảo vừa tạo cho project của mình, sử dụng `pyenv local`:

    ```bash
    $ cd ~/projects/demo
    $ pyenv local demo-env
    $ python --version # Test the new env
    Python 3.6.6 # Bingo
    ```
    Câu lệnh `pyenv local` chỉ cần chạy một lần duy nhất, môi trường sẽ được kích hoạt tự động mỗi khi bạn cd vào thư mục project của mình sau này.

Đối với mình, Pyenv + Virtualenv là cặp đôi hoàn hảo, bộ công cụ không thể thiếu trong công việc hàng ngày. Trên đây là chia sẻ về kinh nghiệm làm việc với Python của mình, mong nhận được góp ý và chia sẻ của các bạn.

\_EOF\_