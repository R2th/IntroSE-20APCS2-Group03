# Lời mở đầu
Chào các bạn, lâu rồi tôi mới có cơ hội viết một bài hướng dẫn về Docker. Bài viết này hướng đến những bạn đã, đang, sẽ sử dụng Docker trong công việc. Vì vậy bạn nào mới làm quen với Docker nên tìm hiểu trước rồi hãy quay lại đây sau.

Như các bạn biết việc cài đặt docker trên Linux khá là dễ, chỉ bằng một vài câu lệnh trên terminal, việc setup config diễn ra một cách tự động. Nhưng trên Windows khác rất nhiều và khó. Chính vì thế đội ngũ lập trình Docker xây dựng ứng dụng Docker Desktop nhằm hỗ trợ chạy Docker container trên Windows.

Không lan man nữa, vào đề nào.

# Cài Docker Desktop
Trên Windows, cài Docker Desktop Installer theo link này: https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe, có nhiều options nhưng tôi khuyến khích chọn theo recommendation.

Sau khi cài đặt xong, ở góc phải bên dưới sẽ hiện lên icon của Docker Desktop và trạng thái của nó. Có 3 trạng thái: Stopping, Restarting và Running.
![](https://images.viblo.asia/baf82f8c-4815-488e-8006-070dddaf7f6b.png)

Click chuột phải vào Docker icon sẽ hiện ra các option. Ở đây tôi chọn Dashboard
![](https://images.viblo.asia/20aec872-152c-48d7-915a-90ef00f2a256.png)

Đây là giao diện chính của Docker Desktop
![](https://images.viblo.asia/2533eeff-35fa-4db7-9b40-23a863c61ad2.png)

Có 2 cách để vào phần Settings (mục này quan trọng lắm)
1. Click chuột phải docker icon và chọn Settings
2. Vào giao diện chính như hình trên và chọn icon bánh răng

![](https://images.viblo.asia/ea5a9bf1-4db5-4a74-8c91-b883e5d0acec.png)

Ở đây xảy ra 2 trường hợp:
1. Bạn chọn dùng Windows Container làm backend engine
2. Bạn chọn dùng WSL 2 làm backend engine

Cả 2 cách có ưu/nhược bù trừ. Như bạn dùng Windows Container thì setup đơn giản vì Windows 10 hỗ trợ hết rồi, nhưng khổ nỗi chạy không mượt bằng WSL 2. Còn nếu bạn dùng cách 2 thì chạy ngon hơn cách 1 nhưng setup thì rườm rà.

Tôi sẽ hướng dẫn các bạn cách 1 trước: sử dụng Windows Container
- Bạn vào Apps&Features, một mục trong Settings của Windows
![](https://images.viblo.asia/1b886431-0b85-4669-af55-308fb0b33b9e.png)

- Vào phần Programes and Features góc phải bên trên
![](https://images.viblo.asia/b18e8e63-d932-41e9-8221-8c4f62e1684c.png)

- Vào phần Turn Windows features on or off
![](https://images.viblo.asia/5d93d354-3df2-49b9-9925-86d06414a931.png)

- Bạn chọn 2 ô `Containers` và `Hyper-V` ở hình dưới
![](https://images.viblo.asia/e8e20149-e01f-4e74-abec-26a7079c71a3.png)

- Restart máy

Nếu bạn dùng cách này thì trong phần Settings của Docker Desktop sẽ có phần thiết lập tài nguyên máy của mỗi Docker Container và thiết lập đường dẫn để mount thư mục trong Container với bên ngoài.

![](https://images.viblo.asia/a506f206-f762-496d-aafc-c108eb8fd932.png)

![](https://images.viblo.asia/2a08c87e-d40f-4f8c-afcb-0b1a2109abd5.png)

Sau khi điều chỉnh ok thì bạn ấn vào Apply & Restart để lưu thay đổi.

Ok thế là xong cách 1, chúng ta chuyển sang cách 2 nhé.

# Cài đặt WSL 2
- Bật tính năng Windows Subsystem for Linux bằng CMD của Windows, type dòng này:
```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

- Kiểm tra cấu hình máy xem có đủ điều kiện không
    - For x64 systems: Version 1903 or higher, with Build 18362 or higher.
    - For ARM64 systems: Version 2004 or higher, with Build 19041 or higher.

- Bật tính năng Virtual Machine (máy ảo) lên
```
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

- Tải về gói update Linux kernel qua link https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

- Để WSL 2 làm mặc định khi cài đặt Linux distribution
```
wsl --set-default-version 2
```

- Về cơ bản làm xong bước trên là ok rồi nhưng nếu bạn muốn dùng Ubuntu hay Kali hay Debian thì vào Microsoft Store để tải các Linux distribution về nhé (https://aka.ms/wslstore)

- Sau đó Linux sẽ đòi hỏi bạn tạo Username, Password các kiểu nhưng chỉ một lần thôi
![](https://docs.microsoft.com/en-us/windows/wsl/media/ubuntuinstall.png)

Nếu bạn dùng WSL 2 làm backend thì không cần lo việc thay đổi Settings của Docker Desktop như tài nguyên máy cần sử dụng hay mount đường dẫn trong/ngoài container bởi mọi thứ đã được config sẵn rồi.

# Lời kết
Ok xong rồi đấy, bài ngắn thôi cho đời nó thanh thản.