# WSL là gì
Windows Subsystem for Linux (viết tắt WSL) là một tính năng tùy chọn của windows 10 cho phép người dùng chạy hầu hết các câu lệnh Linux ngay trên máy tính có cài đặt hệ điều hành Windows, thông qua Kernel Interface tương thích với Linux do Microsoft phát triển mà không cần cài song song hay cài máy ảo. Từ đó có thể tiết kiệm được thêm kha khá tài nguyên hệ thống. Nếu bạn chưa từng sử dụng qua Unix hay Linux thì đây là một cơ hội để làm quen với bash trên windows.

**Yêu cầu**
- Theo mình tìm hiểu thì WSL chỉ có trên phiên bản 64-bit của Windows 10
- Windows với bản cập nhật #16215 trở lên, để kiểm tra phiên bản hiện tại bạn có thể tham khảo [tại đây](https://docs.microsoft.com/en-us/windows/wsl/troubleshooting#check-your-build-number)

# Cài đặt WSL


**Bước 1:** Mở **PowerShell** bằng quyền **Adminstrator** bằng cách nhấp phải chuột vào biểu tượng windows góc dưới bên trái màn hình chọn **Windows PowerShell(Admin)** và chạy câu lệnh sau để kích hoạt WSL:
```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
Chọn **Y** để khởi động lại máy tính

![](https://images.viblo.asia/fd79d2dc-98dc-475e-ae13-260dec7aee4d.png)

**Bước 2:**
Có rất nhiều "phiên bản" chạy nhân Linux cho bạn lựa chọn, ở trong bài viết này mình chọn Ubuntu 18.04 LTS và mình khuyên bạn nào mới làm quen với hệ điều hành nhân Linux thì nên bắt đầu với Ubuntu
- [Kali Linux](https://www.microsoft.com/store/apps/9PKR34TNCV07)
- [Debian GNU/Linux](https://www.microsoft.com/store/apps/9MSVKQC78PK6)
- [Ubuntu 16.04 LTS](https://www.microsoft.com/store/apps/9pjn388hp8c9)
- [Ubuntu 18.04 LTS](https://www.microsoft.com/store/apps/9N9TNGVNDL3Q)
- [Pengwin](https://www.microsoft.com/store/apps/9NV1GV1PXZ6P)
- [Pengwin Enterprise](https://www.microsoft.com/store/apps/9N8LP0X93VCP)
- ...

Mở `Microsoft store`, tìm kiếm với từ khóa `Ubuntu 18.04` và chọn **Install**, sau đó chọn **Lauch**

![](https://images.viblo.asia/6ce5f3c5-5f52-4fa8-9a05-e223aa5df232.png)

**Sử dụng:**
- Cách 1: Search **Ubuntu** ở phần windows search
- Cách 2: Mở Command Prompt/Power Shell gõ **bash**
![](https://images.viblo.asia/8c79fa21-3f34-41eb-b8c3-d8e23bb0f601.png)


**Bước 3:**
Nhập **username**, **password** để tạo tài khoản mới cho nhân Linux

![](https://images.viblo.asia/36b1ae84-ebae-4225-b080-602c2cf897d0.png)

Thử chạy một vài câu lệnh xem nào
![](https://images.viblo.asia/e795af86-2b00-487e-988f-0da2c2f094fd.png)

Như vậy là mình đã có thể chạy câu lệnh linux ngay trên windows, để di chuyển đến các ổ cứng trên windows chúng ta dùng lệnh 
`cd /mnt/c` với `c` là tên của ổ đĩa

Nếu bạn nào thắc mắc là thư mục home của cái wsl chúng mình vừa cài nó nằm ở đâu thì nó nằm ở đây này

`C:\Users\user\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc\LocalState\rootfs\home\`

Mở **Run** bằng cách nhấn tổ hợp phím **Windows + R** sau đó copy và dán đường dẫn sau rồi chọn **OK**

```
%LOCALAPPDATA%\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs
```

# Cài đặt ZSH
ZSH được giới thiệu lần đầu vào năm 1990 bới Paul Falstad, là bash extension được thêm rất nhiều chức năng và tiện ích, hỗ trợ nhiều plugin (như git, osx, ruby, rben...) giúp cho công việc có năng suất cao hơn ví dụ như với git plugin mình có thể dễ dàng biết đang làm ở trên branch nào mà không cần phải dùng `git branch`. 

Ngoài ra zsh có thêm plugin `oh-my-zsh` giúp cho giao diện trở nên cool và đẹp hơn khi hỗ trợ rất nhiều theme và cho người sủ dụng tùy chỉnh giao diện theo ý muốn, hiện tại mình đang sử dụng theme agnoster.

Bắt đầu cài đặt thôi

**Cài đặt zsh**

```
sudo apt-get update
sudo apt install zsh
sudo apt-get install powerline fonts-powerline
```

**Cài đặt oh-my-zsh**

- Clone the Oh My Zsh Respo
```
git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
```
- Tạo file config ZSH và cài đặt theme (theme mình sử dụng là theme `agnoster` các bạn có thể tham khảo các theme khác [tại đây](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes))
```
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
nano ~/.zshrc
```
- Tìm đến đoạn `ZSH_THEME="robbyrussell"` và thay `robbyrussell` bằng `agnoster`


Như vậy, chúng ta đã có thêm một sự lựa chọn để sử dụng Linux bash trên Windows mà không cần thiết phải cài đặt phiên bản đầy đủ của Linux thông qua máy ảo phải không nào?