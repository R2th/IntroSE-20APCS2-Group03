Khi quản lý các Server Linux mình thích dòng lệnh hơn nhưng có một số tình huống mà bạn cần quản lý Server Linux của mình bằng GUI.

*Ví dụ:* Bạn muốn xem nhanh các thống kê Server sử dụng như **CPU, RAM,HDD…** sẽ nhanh hơn và dễ dàng hơn nếu bạn không quen các lệnh. Trong bài viết này, mình chia sẻ các bạn một web GUI để quản lý Server Linux của mình có tên là Cockpit.

## Cockpit là gì ?
**Cockpit** là một Web GUI tool hữu ích, thông qua đó các sysadmin có thể giám sát và quản lý các máy chủ Linux của họ, nó cũng có thể được sử dụng để quản lý network và storage trên các máy chủ, container, máy ảo và kiểm tra các log của hệ thống và ứng dụng.

**Cockpit** có sẵn cho các hệ thống **CentOS** và **RHEL**.

Gần đây **CentOS 8** và **RHEL 8** được phát hành trong đó **cockpit** được giữ lại làm công cụ quản lý máy chủ mặc định.

Package của nó có sẵn trong package repository mặc định của **CentOS8** và **RHEL 8**.

**Cockpit** có các tùy chỉnh nâng cao và mở rộng do có các plugin tùy chỉnh. Trước khi cài đặt phần mềm này trên Server Linux của mình, bạn nên kiểm tra tài liệu cài đặt nếu bản phân phối Linux của bạn được hỗ trợ. *Lưu ý*, phần mềm này có thể hơi khác trên một số bản phân phối vì chúng không phải lúc nào cũng có các tính năng giống nhau. Trong ví dụ này, mình cài đặt điều này trên Server Ubuntu 20.04 LTS.

```
sudo apt install cockpit
```

Username và Password là tài khoản đã tạo trên Server (thường dùng các tài khoản root)

Sau khi đăng nhập, người dùng có thể thao tác với server thông qua giao diện web vô cùng trực quan và dễ dàng.

![](https://images.viblo.asia/3c1a70d6-d6f1-4f67-88fb-abf91187b036.png)

## Các tính năng cơ bản cockpit

Đây là giao diện **Cockpit** khi bạn mở nó trên **Ubuntu 20.04 LTS.** Nó cung cấp các tính năng chính để quản lý toàn bộ máy chủ Linux của bạn.

![](https://images.viblo.asia/5c2f101f-6606-4882-a2b7-723dbe1b517e.png)

### Logs
Cho phép bạn theo dõi log của các ứng dụng cũng như của chính hệ thống 
![](https://images.viblo.asia/bd6bcae6-3396-42d4-a857-700fb32a5137.png)

### Network
 Theo dõi network log và thao tác ở menu networking
 ![](https://images.viblo.asia/1406c09b-2a88-49ba-8090-04552a0b70f4.png)
### Account
Thao tác (thêm,xóa,sửa,…) với các tài khoản sẽ được thực hiện ở đây
![](https://images.viblo.asia/e28bf2d9-30ea-49b4-8da7-9b7b275e0e2f.png)
### Services
Theo dõi và thao tác với các service có trên hệ thống 
![](https://images.viblo.asia/7d344325-fa80-4024-85ee-df7a26bed4ab.png)
### Application
![](https://images.viblo.asia/36d3e22e-caf4-4c5a-9aed-2d9f25ba2ba1.png)
### Terminal
Thao tác với terminal 
![](https://images.viblo.asia/8f55d876-50df-4ab5-b366-26000f407779.png)

## Một số ưu điểm của Cockpit
* Dễ sử dụng bởi thao tác trên web browser và dùng chuột hoặc chuyển đổi sử dụng terminal khi muốn.
* Dễ dàng start các container, quản lý lưu trữ, cấu hình mạng và kiểm tra nhật ký.
* Thân thiện với những người sử dụng Linux và hữu ích với các quản trị viên dày dạn kinh nghiệm.
* Cài đặt dễ dàng.
* Và đặc biệt nó miễn phí

## Lời kết
Như vậy qua bài viết này, mình chia sẻ các bạn một GUI web để quản lí trên Server Linux bằng giao diện trực quan mà không phải thao tác gì nhiều trên command line. Giờ bạn thử cài đặt ngay để trải nghiệm bạn sẽ thấy nó hữu ích và tiện dụng như thế nào. Chúc các bạn thành công.!
{@embed: https://www.youtube.com/watch?v=XKYbEXSraJw}