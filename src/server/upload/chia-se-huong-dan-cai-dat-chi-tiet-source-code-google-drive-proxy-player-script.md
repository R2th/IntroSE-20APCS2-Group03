Chào mọi người ạ ! Theo như tiêu đề → bài viết này em xin phép được chia sẻ & hướng dẫn cài đặt chi tiết Source Code Google Drive Proxy Player Script . 
# **Google Drive Proxy Player Script** là gì ?! 
*/ Nếu ai biết về nó rồi thì có thể skip luôn đoạn này để đỡ mất thời gian ạ /*

Một ví dụ khá gần gũi với cư dân mạng Việt Nam, là khi có một video hót, bóc phốt , .. Sẽ được chia sẻ rất nhanh và rộng rãi . Và khi đó, một trong những nơi lưu trữ phổ biến được các ‘cao nhân’ lựa chọn là Google Drive . Nhưng éo le thay, tình trạng thường xuyên gặp phải với những người ‘chậm chân’ như em là khi link được ‘tuồn’ đến tay, thì lại bị ăn ngay ‘một chú’ limit → do quá nhiều người truy cập .

Cụ thể như sau : 

![](https://images.viblo.asia/31cfd5b1-3e73-4885-b52a-7795c203d7ec.png)

Vậy source code này đóng vai trò như một người xem duy nhất nên sẽ không bị giới hạn , vì vậy tốc độ load video sẽ phụ thuộc vào tốc độ + băng thông của máy chủ chạy source code 

# **Google Drive Proxy Player Script** giúp gì ?!
* Hỗ trợ chạy trên JWPlayer 7 & 8
* Hỗ trợ ‘giấu diếm’ link drive
* Hỗ trợ cache link drive 
* Hỗ trợ cpanel → sử dụng dễ dàng hơn
* Hỗ trợ lấy file list từ drive folder 

# **Google Drive Proxy Player Script** dành cho những ai ?! 
* Cho các website phim online ‘miễn phí’ ↔ dùng drive làm tài nguyên 
* Cho các ‘cao nhân’ share link video ‘bổ ích’ mà không bị limit & lộ link drive 
* Cho em xin 1 backlink :[Bongdaplus](https://bongdaplus.fun/)
* */ Em chưa nghĩ ra thêm , cái này tuỳ mục đích sử dụng của mọi người nha /*

# Cách cài đặt **Google Drive Proxy Player Script** 
Bước 1 : Đi sắm sửa VPS 
Để sử dụng source code này ,mọi người bắt buộc cần có một con VPS chạy CentOS 7 x64 . Theo cá nhân em thì mọi người nên mua [tại đây](https://www.vultr.com/?ref=8540666-6G) ạ : 

![](https://images.viblo.asia/19a91cfc-c5b8-4186-b566-13f0af4668f0.png)

Vâng, thằng Vultr này thì quá nổi tiếng rồi , các anh em web developer nào chắc cũng từng nghe qua . Trong bài viết này em xin phép chỉ hướng dẫn cài trên VPS mua tại Vultr .Còn các dịch vụ khác thì em chưa dùng qua nên em không biết , mọi người thông cảm .
> Hơn hết , hiện tại Vultr đang có chương trình tặng 104$ cho thành viên mới → [Link đăng ký nhận 100$](https://www.vultr.com/?ref=8540666-6G)
> 
Sau khi đăng ký thành công tài khoản . Mọi người deploy một server mới tại đây nha : 

![](https://images.viblo.asia/393c1f08-04f5-423c-8dd9-29b57ee83d2c.jpg)

Ở đây , em chọn location tại Singapore . Còn mọi người muốn chọn địa điểm ở đâu cũng được , tuỳ mọi người ạ.

![](https://images.viblo.asia/eb3d1d80-f91c-4e9d-bf90-7cfa1e3f0527.png)

Tiếp theo : **Server Type** . Mọi người bắt buộc phải chọn CentOS 7 x64 ạ :

![](https://images.viblo.asia/f9701afe-0b87-495a-be53-817fac6a39a5.jpg)

Tiếp theo : **Server Size** . Cái này tuỳ túi tiền & mục đích sử dụng của mọi người thôi ạ.

![](https://images.viblo.asia/a9b9309e-1c89-49e0-940d-1e00cd631c1d.png)

*/ Tất nhiên : VPS càng mạnh thì tốc độ preload video càng nhanh ,cũng như chịu tải được nhiều người xem cùng lúc /*

Tiếp theo : **Additional Features** . Bước này **khá quan trọng** , mọi người bắt buộc phải chọn “Enable IPv6” thì code mới chạy nha . Còn những tính năng khác thì tuỳ vào nhu cầu của mọi người.

![](https://images.viblo.asia/62793b11-d907-4ec6-8f0f-f281a3bc210e.jpg)

Cuối cùng : Mọi người đặt tên cho server và ‘deploy now’ thôi.

![](https://images.viblo.asia/e65bedf3-7348-4a06-a7fb-b6ce1191ced1.jpg)

# Bước 2 : Install **Google Drive Proxy Player Script** lên VPS 
Vào việc thôi nàooo, Sau khi tạo xong xuôi cho mình 1 con VPS , mọi người vào Server Information để lấy thông tin như hình dưới nhé 

![](https://images.viblo.asia/be71f560-e552-489b-9282-1f541d9234f5.png)

Ở đây thông tin mọi người cần phải lấy là : 
* IP Address
* Username
* Password

Tiếp theo : mọi người cần mở terminal lên và login vào server . Ở đây em dùng terminal **Hyper** . Mọi người có thể tải về & cài đặt tại đây : [https://hyper.is/](https://hyper.is/) 
Câu lệnh đăng nhập :
```
ssh username@ipaddress
```

![](https://images.viblo.asia/06b1e49c-952d-4e84-adcf-e711ed6ae86c.png)

Ví dụ : `ssh root@66.42.55.26 `

Sau khi “Enter” , terminal sẽ hỏi mọi người một câu muôn thuở là : “anh yêu có chắc là muốn tiếp tục kết nối không ?!’

Thì mọi người type : “yes” như hình dưới 

![](https://images.viblo.asia/b335ae07-25d3-4611-bd6e-453f594900b4.png)

Tiếp theo : mọi người copy & paste mật khẩu 

*/ Cho những người chưa biết :
 Nó sẽ không hiện ra password đâu ạ , nên mọi người cứ paste xong rồi enter thôi /*
 
 ![](https://images.viblo.asia/0dafb5fe-6d7b-40c0-94bd-3b4533f8965b.png)
 
 Tiếp theo : Khi đăng nhập thành công , terminal sẽ hiển thị ra như thế này 
 
 ![](https://images.viblo.asia/cf23ad2d-42da-4490-a5be-e3885263b676.png)

Tiến hành cài source code :
Đầu tiên : các bạn copy & paste câu lệnh này vào terminal như hình dưới 
```
curl -sO https://demo.apicodes.com/centos/install && bash install
```

![](https://images.viblo.asia/54b659c9-7f4e-4f1a-8470-a55dcbe63132.png)

Sau khi Enter : Source code sẽ tiến hành install lên VPS của mọi người , và nó sẽ yêu cầu bạn nhập domain để chạy riêng cho Google Drive Proxy Player Script → như hình dưới :
*/ Mọi người tự chuẩn bị cho mình 1 domain trỏ về IP của VPS nhé /*

![](https://images.viblo.asia/fcffe5d2-ef9a-4b31-8b14-3422969d8c3e.png)

Rồi source code sẽ tự động cài đặt , khi hoàn thành nó sẽ hiển thị như sau :

![](https://images.viblo.asia/336b1387-6c23-4afd-86df-25b04f89c701.png)

# Bước 3 : Upload source code lên server 
Ở đây mình sẽ dùng **FileZilla** cho tiện sử dụng , mọi người có thể download từ đây : [https://filezilla-project.org/](https://filezilla-project.org/)

Sau khi install **FileZilla** thành công , mọi người cần nhập thông tin như sau :
* Host : chính là IP Address
* Username
* Password
* Port : 22

![](https://images.viblo.asia/c9da6ffb-a45d-4e0e-be60-5a8e5c806d7f.png)

Đến đây , mọi người cần upload source code vào thư mục sau : `/home/ten-mien-cua-ban.com/public_html/`

*Trong lúc cài source code trên terminal , đến đoạn nhập domain thì em có nhập tên miền là : tuilathanh.com .Thì địa chỉ em cần upload source code vào là /home/tuilathanh.com/public_html/*

*Ví dụ tên miền của mọi người là : [bongdaplus](https://bongdaplus.fun/).fun .Thì địa chỉ mọi người cần upload source code vào cũng sẽ là : /home/[bongdaplus.fun](https://bongdaplus.fun/)/public_html/*

Và bây giờ thì gần như hoàn tất rồi . Mọi người chỉ cần làm một bước cuối là **CHMOD** 0777 cho folder **cache.storage** là xong
Cụ thể folder đó nằm tại đây : 

`/home/ten-mien-cua-ban.com/public_html/source_cpanel/`

*/ Cách làm cho những người chưa biết /*

`Chuột phải vào folder → File permissions → Thay numeric value : 0777 → Ok `

![](https://images.viblo.asia/9cc545c0-1906-48f6-ac8b-409c7b842b68.png)

![](https://images.viblo.asia/6a07b445-8e9a-418d-9025-9648581adea4.png)

Như vậy là đã hoàn thành, mọi người đã setup thành công source code **Google Drive Player Script** và có thể hưởng thụ thành quả của mình tại link tương tự như bên dưới :

`https://ten-mien-cua-ban.com/source_cpanel`

![](https://images.viblo.asia/f21f30ff-b9fc-4767-8f0f-9a7c945f56bb.png)

[!!! Update: mọi người có thể tải trực tiếp source code tại đây](https://drive.google.com/u/0/uc?id=1EN4JZm6jHIsYMsA7gLmYxF-RvC6TGP_g&export=download)