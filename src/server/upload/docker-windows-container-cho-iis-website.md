# Giới thiệu
## Docker Windows Containers
![](https://images.viblo.asia/98dd19c5-b9d2-449e-8fbc-441df30bda86.png)

**Docker** và **Microft** đã hợp tác với nhau để đưa ra 1 sản phẩm tuyệt vời **Docker Windows container**. Tất cả **Windows Server 2016** và sau này đều có thể cài đặt **Docker Engine - Enterprise**. Thêm nữa, **developers** có thể sử dụng **Docker** trên nền **Windows 10** với bản **Docker Desktop**. **Docker Windows containers** hoạt động theo cách tương tự như trên **Linux**: giống Docker CLI, API, Image format và cả các distribution services. Những tiện ích có thể kể đến:
*  Đưa ra trải nghiệm người dùng đồng nhất: sử dụng cùng commands và UI trên **Windows** và cả **Linux**
*  Loại trừ xung đột: Các phiên bản khác nhau của **IIS/.NET** có thể cùng tồn tại trên 1 hệ thống với container độc lập
*  Bổ sung với **Hyper-V virtualization** với các tính năng mở rộng khi **Hyper V container** được chọn khi chạy runtime
*  Base images dung lượng nhỏ hơn: tận dụng những tính năng mạnh mẽ của những base images **Windows Server Core** và **Nano Server** ở Windows Server 1709, 1803 và Windows Server 2019

## IIS Server with Docker
Trong bài này, mình sẽ hướng dẫn các bạn run 1 website chạy trên nền **.NET framework** sử dụng **Docker**. Cùng bắt đầu nhé :)
# Build IIS server với Docker
## Yêu cầu
Nếu bạn đang sử dụng **Windows 10 Pro** hoặc **Enterprise** thì đó là 1 tin tốt lành. Bạn có thể chạy **Windows Nano Server** và **Windows Server Core** mà không phải cài đặt **Windows Server 2016** vào 1 máy ảo.
Sau đó bạn phải cài đặt **Docker cho Windows**. Bạn có thể tham khảo các bước tại đây https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/quick-start-windows-10

Microsoft đưa ra 2 image cho phiên bản **Windows Server**: **Server Core và Nano Server**. Nano Server là 1 OS đã được tối giản hết sức, nên nó thiếu các tính năng như PowerShell và không thể cài đặt các chương trình sử dụng MSI files.
## Chạy 1 instance Windows Server Core bằng Docker
Chúng ta sử dụng phiên bản **Windows Server Core** để tạo **Windows Container**. https://hub.docker.com/_/microsoft-windows-servercore 

Việc chạy lên 1 container trên image **Windows Server Core** rất đơn giản. Sau khi cài đặt docker, chỉ cần chạy dòng lệnh sau
```
PS C:\WINDOWS\system32> docker run -ti microsoft/windowsservercore cmd
```
**Docker** sẽ pull image **Windows Server Core** bản mới nhất về và build 1 container mới, sau đó chạy ra màn hình cmd của container mới đó luôn. Kết quả như sau:

![](https://images.viblo.asia/3421881a-0c8f-4cd6-a86d-c5c43ee5fb86.png)

Để hiểu thêm về câu lệnh "docker run" với các options, bạn có thể tham khảo ở đây https://medium.com/the-code-review/top-10-docker-run-command-options-you-cant-live-without-a-reference-d256834e86c1 và https://docs.docker.com/engine/reference/run/

## Vật liệu
Để có thể deploy được Website chạy trên **.NET framework** thì chúng ta phải cài thêm **IIS**. Để đơn giản hơn, chúng ta sẽ sử dụng 1 image khác đã cài đặt sẵn **IIS** luôn, đó chính là **Windows Server Core tích hợp IIS**, available tại đây https://hub.docker.com/_/microsoft-windows-servercore-iis
 
 Sau đó chúng ta sẽ run 1 Website generate ra 1 chuỗi Guid, source code nó available ở đây https://github.com/alexellis/guidgenerator-aspnet Bạn có thể clone về.
 
 ## Thực hiện
 Với project **Guids** vừa clone về, khi chạy bằng **Visual Studio** ở máy local, truy cập vào URL http://localhost:52428/api/values/ sẽ sinh ra 1 chuỗi **Guid**.
 
 ![](https://images.viblo.asia/6c690e38-eedb-4ee1-80d4-c97092206e73.png)
 

-----


 Bây giờ chúng ta sẽ dùng **Docker** để run website này.
 Tạo **Dockerfile** để chứa các command cần thiết để build container. Đặt file này cùng thư mục với **.sln** file. Với nội dung như sau
```
FROM microsoft/iis:10.0.14393.206
SHELL ["powershell"]

RUN Install-WindowsFeature NET-Framework-45-ASPNET ; \
    Install-WindowsFeature Web-Asp-Net45

COPY GuidGenerator GuidGenerator
RUN Remove-WebSite -Name 'Default Web Site'
RUN New-Website -Name 'guidgenerator' -Port 80 \
    -PhysicalPath 'c:\GuidGenerator' -ApplicationPool '.NET v4.5'
EXPOSE 80

CMD Write-Host IIS Started... ; \
    while ($true) { Start-Sleep -Seconds 3600 }

```
 **Dockerfile** trên sẽ thực hiện lần lượt các action sau:
1.  Tạo ra 1 container từ image microsoft/iis:10.0.14393.206
2.  Chạy **PowerShell** để cài đặt **NET-Framework-45-ASPNET và Web-Asp-Net45**
3.  Copy thư mục GuidGenerator (chứa code) ở máy local (máy chạy **Docker**) sang thư mục GuidGenerator ở container vừa mới tạo
4.  Remove Default Web Site ở container vừa tạo
5.  Tạo website mới với tên guidgenerator với đường dẫn source ở "C:\GuidGenerator" (ở container vừa tạo), dùng **ApplicationPool .NET v4.5**
6.  Expose cổng 80 
7.  Dòng cuối để đảm bảo vẫn giữ container chạy, nếu không nó sẽ quit. Nhưng từ tháng 6/2017, Microsoft đã bundle **ServiceMonitor.exe** để giữ task chạy mà không cần câu lệnh trên (nên câu lệnh này có thể bỏ đi)



-----

Bây giờ chúng ta chỉ cần build image này và chạy nó
Ở cùng thư mục với **Dockerfile**, chạy **PowerShell** với lệnh 
```
docker build -t guid-app .
```
![](https://images.viblo.asia/0289a1d7-fe93-479a-90fc-cd970c6c49c0.png)

Đợi vài phút để **Docker** pull image về và build container, sau đó chúng ta có thể run nó 
```
docker run --name guids -d -p 8080:80 guid-app
```
![](https://images.viblo.asia/2ab1c060-582d-460d-9a1b-128aa2b52f63.png)

Câu lệnh trên sẽ chạy container với tên là **guids**, expose cổng **80**, tạo ra 1 proxy để map cổng **8080** của máy local (localhost) với cổng 80 của container (IP như hình trên là **172.31.187.185**)
## Kết quả
Vậy là khi chúng ta vào đường dẫn **localhost:8080/api/values/** hay là **172.31.187.185/api/values/** thì chúng ta đều nhận được kết quả là 1 Guid mới. Như vậy là chúng ta đã thành công rồi!

![](https://images.viblo.asia/7caf64a8-cfc9-456d-9355-27f43aa4032b.png)

Thank you **Docker** :)
# Kết bài
Trên đây mình mới chỉ hướng dẫn deploy 1 website sử dụng **Docker**. Nhưng **Docker** đặc biệt hữu dụng khi chúng ta muốn tạo ra nhiều container để làm việc như trên production. Hi vọng mình có thể hướng dẫn tiếp phần này. Cảm ơn các bạn đã đọc bài. 

Một số link bài viết tham khảo https://blog.alexellis.io/run-iis-asp-net-on-windows-10-with-docker/