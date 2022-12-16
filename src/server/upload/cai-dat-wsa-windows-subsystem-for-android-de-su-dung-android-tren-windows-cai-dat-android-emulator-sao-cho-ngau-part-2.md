> Ngày xửa ngày xưa mình có 1 ước ao "*làm thế nào để Windows + Linux hoà vào làm một nhỉ*", và rồi WSL được sinh ra vào hồi 5 năm trước. Tuy còn khá sida và lắm lỗi, tuy nhiên vào năm 2019 WSL2 ra đời cùng với sử dụng kernel linux chính ngạch cùng với các thay đổi gần đây đã làm WSL2 hoàn thiện hơn (nhất là mới có tính năng Run Linux GUI apps sử dụng X11 trên Windows 11 [Run Linux GUI apps with WSL | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps))

Và đấy là chuyện mình mong muốn đã trở thành hiện thực, xong rồi có thông tin Microsoft đang phát triển WSA (Windows Subsystem for Android) vào 2 năm trước làm mình háo hứng chờ đến cái ngày mà **Windows + Linux + Android** chạy tất tần tận trên 1 con máy. Và rồi cái ngày đấy cuối cùng cũng trở thành hiện thực ╰(*°▽°*)╯
Bài viết này mình sẽ hướng dẫn các bạn làm sao để cài WSA và cài WSA phục vụ mục đích pentest android nhé.

# Chuẩn bị
Để tiến hành cài đặt WSA một cách đơn giản, các bạn cần xác định mục đích sử dụng WSA để làm gì (dùng như người dùng bình thường, sử dụng cho mục đích pentest, ...). 
Điều kiện tiên quyết ban đầu theo Microsoft công bố là: 
- Bạn cần phải sử dụng Windows 11, Windows 10 trở xuống không cài được WSA (thật ra mình chưa thử, đấy là nsx công bố thôi 😂)
- Nhiều RAM 1 chút, 16GB là vừa đủ
- Đương nhiên là k thể thiếu SSD rồi
- Processor yêu cầu khá cao, mình đang sử dụng Ryzen 7 5800x, chạy khá mượt mà
- Chip kiến trúc x64 hay ARM64 đều được (support hếtttt)
![Pasted image 20220408070312.png](https://images.viblo.asia/2ddbe7a7-e070-4ff6-a7b3-3a28b61f496e.png)

# Cài đặt
## Cài đặt siêu đơn giản
Các bạn muốn cài đặt nhanh chóng, đơn giản để sử dụng bình thường theo hướng dẫn của nsx luôn thì đơn giản lắm. Chuyển region sang US rồi bấm vào link này cài đặt Amazon Appstore [ms-windows-store://pdp/?productid=9NJHK44TTKSX](ms-windows-store://pdp/?productid=9NJHK44TTKSX). Cài đặt lên và làm theo hướng dẫn 1 tý là xong WSA rồi, nhưng mà cái store của Amazon chả có gì đâu, phải cài đặt app bằng file APK bên ngoài. 

## Cài đặt đơn giản (không có chữ siêu)
Nhưng mà bài viết này mình hướng tới cài đặt WSA cho Pentester Android, sử dụng cách cài đặt nhanh hơn, root máy luôn + Google Apps cùng với rất nhiều tính năng thuận tiện cho việc pentest nữa

Đầu tiên các bạn có thể xem repo này [LSPosed/MagiskOnWSA: Integrate Magisk root and Google Apps (OpenGApps) into WSA (Windows Subsystem for Android) (github.com)](https://github.com/LSPosed/MagiskOnWSA), mình cài đặt theo repo này luôn, khá nhanh chóng. 
[Build WSA · LSPosed/MagiskOnWSA@1d4f333 (github.com)](https://github.com/LSPosed/MagiskOnWSA/actions/runs/2007160084) các bạn có thể download bản build tại đây, có 2 phiên bản x64 và arm64. Mình sử dụng x64 nên tải bản bên dưới nhé. 
![Pasted image 20220408071407.png](https://images.viblo.asia/1b3573b6-471d-46a8-8920-79592dcb8aa9.png)

Cách cài đặt thì siêu dễ, tải bản zip đó về, giải nén ra, chuột phải vào `Install.ps1` rồi `Run with powershell`, tiếp tục ấn Yes để cấp thêm quyền cho nó cài, và chờ 1 tý. Thế là xong 
![Pasted image 20220408071545.png](https://images.viblo.asia/bc080aae-5ab9-4e72-b2ba-c2bdd44ce4b6.png)

WSA khởi động lên cùng với Google Apps, phiên bản này là pico (Android 11)
![Pasted image 20220408071613.png](https://images.viblo.asia/5c6c925a-5596-4aa1-8ae5-2ad6302e3a95.png)

**Magisk** cũng được cài đặt luôn, hiện nó đang hoạt động tương thích hoàn toàn với WSA. Magisk là 1 ứng dụng được sử dụng cho các thiết bị Root Android. Root sẽ cung cấp thêm chức năng để sau này có thể giúp ích cho bạn.
![Pasted image 20220408072244.png](https://images.viblo.asia/a2c3f014-cad5-415d-a6a7-179bb382771d.png)

Với các bạn nào sử dụng để pentest thì đừng có login vào Google Play nhoé, mình đang gặp vấn đề với nó, không biết bao giờ mới fix được :cry:

Tiếp tục cài thêm WSA Pacman để thuận tiện cho việc cài APK cũng như là truy cập vào setting của WSA [alesimula/wsa_pacman: A GUI package manager and package installer for Windows Subsystem for Android (WSA) (github.com)](https://github.com/alesimula/wsa_pacman)

Bản release có ở [Release WSA-pacman v1.3.4 · alesimula/wsa_pacman (github.com)](https://github.com/alesimula/wsa_pacman/releases/tag/v1.3.4)

Tiếp theo, chúng ta mở Settings của WSA lên
![Pasted image 20220408072341.png](https://images.viblo.asia/54312569-59c3-49ae-b64e-04e96a22cf05.png)
sau đó gạt chuyển sang chế độ developer mode để có thể debug bằng ADB
![Pasted image 20220408072424.png](https://images.viblo.asia/cbf719f0-56cb-4cd7-80f2-fc9d1e67f21f.png)

Khởi động WSA Pacman lên vào chúng ta có thể thấy được nó đã được kết nối với WSA, và giờ mình có thể kết nối tới ADB shell được rồi
![Pasted image 20220408072520.png](https://images.viblo.asia/00aff829-2e43-43da-a7f6-66daa39e9c19.png)

Các bạn muốn lên root thì siêu đơn giản rồi 
![Pasted image 20220408072740.png](https://images.viblo.asia/cd9a65b4-df61-4ee9-b020-de0bb109eebb.png)
Cấp quyền 1 phát là lên root luôn :joy:

## Intercept with Burpsuite
Để intercept được với BurpSuite thì cần cài đặt trusted root certification của Burp vào WSA, tuy nhiên việc này cực kỳ đơn giản khi Android đã được Root và lại còn đang cài Magisk nữa :joy:

### Với Magisk
[NVISOsecurity/MagiskTrustUserCerts: A Magisk module that automatically adds user certificates to the system root CA store (github.com)](https://github.com/NVISOsecurity/MagiskTrustUserCerts)

Sử dụng module này với Magisk, khi các bạn cài đặt cert cho user thì nó sẽ tự động chuyển cái cert đó vào Trusted Root, việc làm của bạn là cài đặt Cert cho user như bình thường, sau đó tiến hành khởi động lại WSA là được 
![image.png](https://images.viblo.asia/14749996-176a-459e-b32a-8ff4fe16e876.png)
> 1 điểm mình thích ở WSA là quá trình turn off hay start đều khá là nhanh (mình đang không muốn nói là rất nhanh so với emulator :<)

### Sử dụng Root Certificate Manager
Do WSA đã được root, nên các bạn có thể sử dụng app để làm thay mình luôn cũng được

[Root Certificate Manager APK (ROOT) 1.0.1 (Ứng dụng Android) - Tải về (apkcombo.com)](https://apkcombo.com/vi/root-certificate-manager-root/net.jolivier.cert.Importer/)

Tiến hành cài đặt, cấp quyền root cho ứng dụng, tải và load cert của Burp Suite vào, thế là xong rồi :D

### Cài đặt ProxyDroid
[ProxyDroid APK 3.2.0 (Ứng dụng Android) - Tải về (apkcombo.com)](https://apkcombo.com/vi/proxydroid/org.proxydroid/)

App này được sử dụng để điều hướng các request của các app khác tới proxy (yêu cầu root), có thể chọn các ứng dụng nào mình muốn điều hướng thông qua profiles, khá tiện.
> Cảm ơn anh @vigov5 đã suggest app này ạ :D 

![image.png](https://images.viblo.asia/343254dd-f0dd-489e-9eaf-5cdf1688c487.png)

Phần Host và Port các bạn để cái ip mạng LAN máy thật nhé, tại WSA mỗi lần khởi động lại là 1 IP riêng, việc set cái IP máy thật để tránh việc mỗi lần khởi động lại WSA bị thay đổi IP

![image.png](https://images.viblo.asia/464a836c-779f-4251-abdd-5de6717b3086.png)

Trên Burp Suite cũng thực hiện cài đặt lắng nghe tương ứng.

![image.png](https://images.viblo.asia/4f34edd8-744c-40a9-bedf-da84e0a53c49.png)

Mở app lên phát là capture được ngay :joy:

Mọi vấn đề các bạn có thể comment bên dưới nhé, mình có thể giải đáp. See you.
# Vấn đề
Khi mà mình login tài khoản google vào, thì mình bị lỗi như hình dưới (trong khi chưa login thì không bị) 
![image.png](https://images.viblo.asia/12822b20-9f93-43f4-9b7b-0b64f6ec01b1.png)
Mình vẫn đang tìm hiểu nguyên nhân, k biết Android có cơ chế gì để bảo vệ nó không :<
# Tham khảo
- https://sensepost.com/blog/2021/android-application-testing-using-windows-11-and-windows-subsystem-for-android/
- https://github.com/LSPosed/MagiskOnWSA
- https://github.com/alesimula/wsa_pacman
- https://github.com/NVISOsecurity/MagiskTrustUserCerts