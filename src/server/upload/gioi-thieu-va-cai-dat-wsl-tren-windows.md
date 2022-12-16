## Giới thiệu Windows Subsystem for Linux

WSL (Windows Subsystem for Linux) là một tính năng có trên Windows x64 (từ Windows 10, bản 1607 và trên Windows Server 2019), nó cho phép chạy hệ điều hành Linux (GNU/Linux) trên Windows. Với WSL bạn có thể chạy các lệnh, các ứng dụng trực tiếp từ dòng lệnh Windows mà không phải bận tâm về việc tạo / quản lý máy ảo như trước đây. Cụ thể, một số lưu ý mà Microsoft liệt kê có thể làm với WSL:
* Chọn sử dụng distro Linux từ Microsoft Store: Hiện giờ đang có các Distro Linux rất gọn nhẹ trên Store sử dụng được ngày như Ubuntu, Debian ...
* Chạy được từ dòng lệnh các lệnh linux như ls, grep, sed ... hoặc bất kỳ chương trình nhị phân 64 bit (ELF-64) nào của Linux
* Chạy được các công cụ như: vim, emacs ...; các ngôn ngữ lập trình như NodeJS, JavaScript, C/C++, C# ..., các dịch vụ như MySQL, Apache, lighthttpd ...
* Có thể thực hiện cài đặt các gói từ trình quản lý gói của Distro đó (như lệnh apt trên Ubuntu)
* Từ Windows có thể chạy các ứng dụng Linux (dòng lệnh)
* Từ Linux có thể gọi ứng dụng của Windows
## Cài đặt Windows Subsystem for Linux

Đảm bảo hệ thống của bạn là Windows 10 (64 bit, version 1607) trở đi hoặc Windows Server 2019, kiểm tra bằng lệnh trong PowerShell (PS):
```
[System.Environment]::OSVersion.Version
```
![](https://images.viblo.asia/42fe3149-9d8d-4d93-b072-5e22806c8bcb.png)

Ngoài ra cần kích hoạt chế độ hỗ trợ ảo hóa của CPU (CPU Virtualization), bạn kích hoạt bằng cách truy cập vào BIOS của máy, tùy loại mainboard mà nơi kích hoạt khác nhau

Để cài đặt, mở PS (PowserShell) với quyền Administrator (nhấn phải chuột vào biểu tượng của sổ - start, rồi chọn Windows PowerShell (admin)), rồi thực hiện lệnh trong PS

```
# Kích hoạt tính năng Windows Subsystem for Linux
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all
```

![](https://images.viblo.asia/c6985676-5aed-415c-900a-2d2755c32efb.png)

Sau khi nó kích hoạt, nhấn Y trả lời câu hỏi như hình trên để khởi động lại máy. Khởi động lại máy, vào dòng lệnh gõ lệnh kiểm tra danh dách các distro (bản linux) đã được cài đặt:

```
wsl -l --all
```

![](https://images.viblo.asia/52d36877-9829-4e4e-bae6-48cda9b3ee73.png)

Thời điểm này, chưa có bản linux nào cài đặt, đăng ký - nên thông báo như trên, nó yêu cầu bạn truy cập vào Microsoft Store theo đường dẫn https://aka.ms/wslstore, để tìm và tải về Distro Linux muốn cài

Truy cập vào Store theo link trên, trong danh sách Distro Linux tùy chọn cài đặt cái nào muốn dùng, ví dụng nếu chọn Ubuntu thì chọn biểu tượng Ubuntu
![](https://images.viblo.asia/807429bb-5947-490f-a164-71dd3db1aa06.png)

Bấm vào  Install để tải về và cài đặt Ubuntu cho WSL
![](https://images.viblo.asia/25830d57-45c5-4c17-91fb-e705e48e1b94.png)

Sau khi tải về, chọn chạy Ubuntu từ menu Start của Windows, để bắt đầu đăng ký với WSL
![](https://images.viblo.asia/60ed4f1c-5016-4c14-a6ff-bba2e1334ae2.png)

Quá trình cài đặt Ubuntu diễn ra, sau đó nó sẽ hỏi bạn thiết lập user và password cho Linux này, bạn nhập tên user, password do bạn đặt vào:
![](https://images.viblo.asia/d21f9e94-e7d1-4add-afa2-698cc238aa9c.png)

Bạn đã bắt đầu chạy Ubuntu trong Windows, đang ở dòng lệnh của Ubuntu, từ sau mỗi khi chạy Ubuntu từ menu Start bạn sẽ được vào thẳng dòng lệnh này. 
Giờ thì đã bắt đầu có thể thực hiện các lệnh Linux Ubuntu trên Windows.

Giờ nếu bạn có lệnh exit hoặc đóng cửa sổ thì Ubuntu thì nó sẽ dừng

Bây giờ từ PS bạn có thể có vài lệnh đểm kiểm tra:
```
# Liệt kê danh sách các distro được cài đặt
wsl -l -all
# Liệt kê danh sách các distro đang chạy
wsl -l --running
# Chạy và vào ngay dòng lệnh của Distro mặc định
wsl
```
Mẹo

> Hãy cài đặt và sử dụng Windows Terminal, là công cụ dòng lệnh mới cho Windows - hy vọng thay thế tốt cho PowserShell và Cmd với các tính năng như có tab, đổi theme ... Cài ở link: Windows Terminal
> 
Cập nhật Ubuntu: để cập nhật các gói trong Ubuntu, hãy gõ lệnh ```wsl``` để vào Ubuntu, sau đó thực hiện lênh
```
sudo apt update && sudo apt upgrade
```
## Tương tác qua lại giữa Windows và Linux
### Windows gọi lệnh Linux

Hệ thống đang có WSL, có đăng ký một Distro mặc định là Ubuntu. Giờ ở giao diện dòng lệnh của Windows (CMD, PowerShell, hoặc Windows Terminal) - có thể gọi, thi hành các lệnh có trong Ubuntu bằng cú pháp
```
wsl lenh-linux cac-tham-so
```
Ví dụ, trong Ubuntu - như đã biết có trình soạn thảo text là nano, thì giờ đây bạn có thể dùng nó trên Windows - như soạn thảo file 1.txt trong thư mục hiện tại:
```
wsl nano 1.txt
```

Đường dẫn của ổ ```C:/``` trên Windows được mount và Linux theo đường dẫn ```/mnt/c/```, như vậy để truy cập đến file ```C:\Users\xuanthulab\1.txt``` của Windows thì tương ứng trên Linux là ```/mnt/c/Users/xuanthulab/1.txt```

Ngoài ra bạn có thể duyệt hệ thống file của Ubuntu từ File Explore, tại địa chỉ  ```\\wsl$\Ubuntu```

### Linux gọi lệnh Windows

Theo chiều ngược lại, nếu bạn đang trong Linux (vào bằng lệnh wsl), thì bạn có thể gọi các chương trình của Windows, ví dụ như nodepad.exe, explorer.exe ...

## Cập nhật lên WSL2

Microsoft giới thiệu WSL2 tốt hơn, ví dụ hỗ trợ đầy đủ nhân Linux, sẽ cập nhật ở phiên bản Windows tiếp theo, Windows Feature May 2020 Update Version 2004, WSL2 có hiệu lực từ bản build Windows 10: Windows Builds 18917

Ở thời điểm này, nếu bạn kích hoạt đăng ký chương trình Windows Insider Program (truy cập vào Update and Setting - Chọn Windows Insider Program để đăng ký), bạn sẽ nhận được các bản cập nhật xem trước của Windows có hỗ trợ WSL2
distro linux wsl Đăng ký chương trình Windows Insider Program - nhận cập nhật xem trước

Sau khi cập nhật, vào địa chỉ wsl2-kernel, tải về WSL2 Linux kernel update package, sau đó chạy để cập nhật, rồi chạy lệnh sau để chuyển mặc định WSL2
```
wsl --set-default-version 2
```

Kiểm tra Distro đang chạy ở version nào
```
wsl --list --verbose
```
Convert Distro từ version 1 sang version 2 : ví dụ convert ubuntu
```
wsl --set-version ubuntu 2
```

Nguồn: https://xuanthulab.net/gioi-thieu-va-cai-dat-wsl-tren-windows.html