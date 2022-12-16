**Anaconda là một nền tảng mã nguồn mở về Data Science và Machine Learning trên Python thông dụng nhất hiện nay, Anaconda có vai trò đơn giản hóa việc triển khai và quản lí các gói cài đặt khi làm việc với Python. Anaconda được cài đặt dễ dàng trên 3 nền tảng hệ điều hành thông dụng hiện nay là Ubuntu, Windows và MacOS. Anaconda có những ưu điểm như sau:**
- Hoàn toàn miễn phí
- Dễ dàng tạo ra virtual env để chúng ta nghịch thoải mái mà không sợ ảnh hưởng tới môi trường thật trên máy
- Hỗ trợ cài đặt những thư viện của Python một cách dễ dàng và nhanh chóng....

**1. Hướng dẫn cài đặt Anaconda**

Để cài đặt Anaconda hệ thống của bạn cần đáp ứng những yêu cầu sau:

- Hệ điều hành: Windows 8 or newer, 64-bit macOS 10.13+, or Linux, including Ubuntu, RedHat, CentOS 6+, and others.
- Kiến trúc hệ điều hành: Windows- 64-bit x86, 32-bit x86; MacOS- 64-bit x86; Linux- 64-bit x86, 64-bit Power8/Power9. 
- Ổ cứng trống tối thiểu 5GB

Chi tiết hơn, các bạn có thể tham khảo tại đây: https://docs.anaconda.com/anaconda/install/

Để có thể cài đặt Anaconda trên Ubuntu, chúng ta cần cài một số thư viện cần thiết, chạy câu lệnh sau:

```
sudo apt-get install libgl1-mesa-glx libegl1-mesa libxrandr2 libxrandr2 libxss1 
libxcursor1 libxcomposite1 libasound2 libxi6 libxtst6
```

Khi chạy xong câu lệnh trên, tải gói cài đặt Anaconda tại đây, chọn phiên bản phù hợp với hệ điều hành của mình: https://www.anaconda.com/products/individual#linux. Hệ điều hành mình đang sử dụng là Ubuntu 18.04 (64 bit). Vì vậy mình sẽ tải gói cài đặt: 

![](https://images.viblo.asia/053d1fdf-b68e-4b6e-98ac-979a892cd710.png)

Sau khi tải về, gói cài đặt sẽ nằm trong thư mục ~/Downloads/, để cài Anaconda chúng ta chạy câu lệnh sau:

```
bash ~/Downloads/Anaconda3-2020.11-Linux-x86_64.sh
```

Cửa sổ terminal sẽ hiện ra như sau:

![](https://images.viblo.asia/fdd79e4b-3865-40a4-8ea5-cc5bb7714690.png)

Và chúng ta sẽ nhấn Enter để đọc điều khoản, điều khoản sẽ hiện ra cho bạn đọc, bạn cứ ấn enter vì điều khoản rất dài (yaoming). Sau một hồi enter thì sẽ hiện ra như sau:

![](https://images.viblo.asia/3e897ad2-b6ee-4e19-9bcd-3ee7a3bce796.png)

Và chúng ta gõ 'yes' để đồng ý với điều khoản. Sau khi gõ 'yes', sẽ hiện thị như sau:

![](https://images.viblo.asia/40247d4e-fcb2-426b-ad33-093576c9be08.png)

Ở đây, chúng ta có thể tùy chọn thư mục để cài đặt Anaconda, mặc định sẽ như trên, để thuận tiện chúng ta sẽ nhấn 'enter'. Sau khi nhấn 'enter', terminal sẽ hiển thị như sau:

![](https://images.viblo.asia/e401668f-77b1-4fee-a777-8777d0dae7d1.png)

Và chúng ta sẽ gõ 'yes'. Vậy là chúng ta đã cài đặt thành công Anaconda. Khởi động lại terminal. Mặc định Anaconda sẽ được tự động kích hoạt khi khởi động terminal:

![](https://images.viblo.asia/52041473-ab68-4dc2-af49-0450428f10cf.png)


nếu chúng ta không thích điều đó chúng ta có thể sử dụng câu lệnh sau và khởi động lại terminal:
```
conda config --set auto_activate_base false
```

Như vậy Anaconda sẽ không tự động kích hoạt mỗi khi chúng ta bật terminal nữa
![](https://images.viblo.asia/8cd23496-a984-4b1f-9682-d117938ce8c8.png)

**2. Cách sử dụng**

Để có thể xem list virtual env trong Anaconda, chúng ta sử dụng câu lệnh sau:
```
conda env list
```

![](https://images.viblo.asia/f4f78ee1-c6a7-4287-8efa-879ace332b0d.png)

Mặc định, sẽ có một virtual env có tên là **base**. Để active virtual env **base** này, chúng ta sử dụng câu lệnh sau:

```
conda activate base
```

![](https://images.viblo.asia/63891090-4155-43a5-ac56-13608d0a95dc.png)

Để deactive virtual env **base** chúng ta sử dụng câu lệnh sau:

```
conda deactivate
```

Để tạo một virtual env, với phiên bản python chỉ định chúng ta sử dụng câu lệnh:

```
conda create -n virtual_env_name python=python_version
```

Cụ thể mình muốn tạo một virtual env với phiên bản python 3.7 và đặt tên virtual env đấy là python_3.7, mình sẽ có câu lệnh sau:
```
conda create -n python_3.7 python=3.7
```

Để xem list những package đã được cài trong virtual env, chúng ta sẽ sử dụng câu lệnh:

```
conda list
```

![](https://images.viblo.asia/b9c26c42-d10f-4b7e-9d0c-0a02746e156a.png)

Trên đây là một số câu lệnh để chúng ta làm quen với Anaconda, các bạn có thể tìm hiểu thêm ở đây: https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html

**3. Tài liệu tham khảo**
- Anaconda install guide: https://docs.anaconda.com/anaconda/install/
- Anaconda user guide: https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html