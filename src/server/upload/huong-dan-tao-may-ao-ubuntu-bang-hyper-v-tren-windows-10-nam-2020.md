Nếu anh em dùng WSL2 + Hyper-V thì cũng đã biết, Một khi bật Hyper-V thì sẽ không dùng được VirtualBox. Vì thế bài viết này mình sẽ hướng dẫn cách để tạo một máy ảo (Virtual Machine) Ubuntu trên Windows 10 bằng Hyper-V thay vì VirtualBox. Phiên bản mình sử dụng là Ubuntu Server 18.04 - Windows 10 Enterprise (20H2). Các bản khác có thể được tạo qua các bước tương tự.

Yêu cầu khi làm theo hướng dẫn này:
- Windows 10 Pro / Enterprise
- Đã bật Hyper-V feature

## Chuẩn bị image cài Ubuntu (.iso)

MÌnh sẽ cần download bản cài đặt Ubuntu Server 18.04 mà mình sẽ cài. Truy cập trang Download của Ubuntu tại https://ubuntu.com/download/alternative-downloads. Kéo xuống phía dưới có mục BitTorrent, chúng ta chỉ cần copy link download phiên bản tương ứng thôi.

![](https://images.viblo.asia/290c164a-4836-4b64-b36f-114fd485c3ad.png)

Thực hiện xóa `.torrent` ở cuối link vừa copy để lấy link download cái image ISO Ubuntu về.
- Torrent link: https://releases.ubuntu.com/18.04/ubuntu-18.04.5-live-server-amd64.iso.torrent
- Link image:  https://releases.ubuntu.com/18.04/ubuntu-18.04.5-live-server-amd64.iso

## Tạo máy ảo Ubuntu với Hyper-V

Nhấn nút Windows và mở ứng dụng `Hyper-V Manager`, dùng để quản lý các máy ảo mà chúng ta đã tạo.

![](https://images.viblo.asia/585ea52f-8f18-477c-989a-e730597ecc02.png)

Nó sẽ có giao diện như sau:

![](https://images.viblo.asia/5da566ca-06f0-4c93-80e6-7c4c6e759c7f.png)

Chúng ta tiến hành tạo VM bằng cách mở theo menu: `Action > Quick Create...`. Tại hộp thoại mở ra, bạn làm theo 3 bước:
1. Nhấn `Local Installation Source` để chuyển qua chế độ cài Ubuntu từ file ISO
2. Nhấn nút `Change Installation Source` để chọn file ISO
3. Bỏ tích `Windows Secure Boot`
4. Nhấn `More Options` để đặt tên cho máy ảo, chọn card mạng. Của mình dùng cái mặc định là `Default Switch`.
5. Nhấn nút `Create Virtual Machine` để tạo nhanh máy ảo.

![](https://images.viblo.asia/3cc5f078-2b0a-48fe-abf1-f97a8a1dce0b.png)
![](https://images.viblo.asia/bf1bd8fe-00b3-4e52-b160-04a72bfd9c0e.png)
![](https://images.viblo.asia/26c84539-f0a1-4c8b-99aa-4d7f9719e7ac.png)

Như vậy là tạo xong VM, bây giờ chúng ta nhấn nút `Connect > Start` để tạo bắt đầu chui vào nó và install Ubuntu Server.

## Cấu hình Static IP

Nếu bạn không cần cấu hình Static IP cho VM thì có thể bỏ qua bước này nhé. Để cấu hình Static IP thì chúng ta cần một vài thông tin về Network Adapter mà mình đang dùng. Lúc tạo VM mình có setup Network là `Default Switch`. Xem thông tin về Network Adapter `Default Switch`:

```bash:powershell
ipconfig /all

Ethernet adapter vEthernet (Default Switch):

   Connection-specific DNS Suffix  . :
   Description . . . . . . . . . . . : Hyper-V Virtual Ethernet Adapter
   Physical Address. . . . . . . . . : 00-15-5D-21-B5-D3
   DHCP Enabled. . . . . . . . . . . : No
   Autoconfiguration Enabled . . . . : Yes
   Link-local IPv6 Address . . . . . : fe80::5c6f:6f6d:8a7e:7f61%30(Preferred)
   IPv4 Address. . . . . . . . . . . : 172.21.208.1(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . :
   DHCPv6 IAID . . . . . . . . . . . : 503321949
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-26-25-07-AE-90-78-41-07-E1-53
   DNS Servers . . . . . . . . . . . : fec0:0:0:ffff::1%1
                                       fec0:0:0:ffff::2%1
                                       fec0:0:0:ffff::3%1
   NetBIOS over Tcpip. . . . . . . . : Enabled
```

Như bạn thấy, IP của Adapter này là `172.21.208.1` và subnet là `255.255.240.0`, viết tắt lại là `172.21.208.1/20`. Đấy là trên máy mình còn nó này sẽ khác ở trên máy của các bạn.

Chúng  sẽ chọn lấy một IP khả dụng trong dải IP trên: `172.21.222.10`. Một vài thông số để thiết lập network cho con VM Ubuntu:

```bash
Subnet: 172.21.208.0/20
IP Address: 172.21.222.10
Gateway: 172.21.208.1
Name servers: 172.21.208.1
```

## Cài đặt Ubuntu Server 18.04

Quay trở lại Hyper-V Manager, sau khi tạo xong VM và nhấn `Connect`, chúng ta sẽ thực hiện các bước dưới đây nhé. Lưu ý dùng phím Enter, Space, Up/Down để chỉnh sửa các tùy chọn nhé.

### Chọn ngôn ngữ

![](https://images.viblo.asia/ccac5bbe-2b38-447c-b920-fd4ea2eb2a99.png)
![](https://images.viblo.asia/422eb05e-120e-4f55-bd77-8e2ea592a2bf.png)

### Setup Static IP

Mặc định là DHCP, đối với các bạn không cần Static IP thì có thể bỏ qua bước này. Setup static ip thì chúng ta làm như sau:

![](https://images.viblo.asia/d6626620-6d3f-4458-85c1-86a9860bfb99.png)
![](https://images.viblo.asia/1b38cb32-a2e7-4e34-b75b-707447a9f42f.png)
![](https://images.viblo.asia/eeb7e2b0-fffb-493b-b47f-85c0c82cfcf5.png)

Điền các thông số đã chuẩn bị trước đó và `Save` để tiếp tục.

### Next qua các bước này

![](https://images.viblo.asia/3d7f522b-6029-4a56-b498-01ee7ddde03b.png)
![](https://images.viblo.asia/8afe9e33-5ee4-46f7-8b75-78162ebddd07.png)
![](https://images.viblo.asia/ed887311-862c-41e1-b77d-b52f2f8ae8a2.png)
![](https://images.viblo.asia/4f6f4c47-58f4-4af9-bf30-8b92f5f447fd.png)

### Tạo tài khoản đăng nhập

Nhập thông tin tài khoản:

![](https://images.viblo.asia/0bc0dbe0-4858-49c4-b15a-c5984791f892.png)

Bỏ qua cái này:

![](https://images.viblo.asia/e0b91a79-c6ee-463b-91eb-9733597e11d8.png)

Cài thêm dependencies dưới đấy nếu cần, ví dụ như mình thử tích chọn `docker`.

![](https://images.viblo.asia/4a990026-86f4-4444-9117-d275e6b4933b.png)

Next tiếp để quá trình cài đặt Ubuntu bắt đầu. Khi kết thúc, chúng ta nhấn rebot VM để hoàn tất.

![](https://images.viblo.asia/1854d0cf-7858-4c18-a60c-26bb3fffed4b.png)

## Dùng thử

Cuối cùng thì chỉ cần check thử lại hàng thôi.

### Login vào hệ thống

Các thông số về IP đã hiển thị ra màn hình đúng như config.

![](https://images.viblo.asia/76f21df9-f079-48ba-86ef-451225dccf25.png)

### Kiểm tra kết nối mạng

![](https://images.viblo.asia/69b6f176-04b3-4468-ac10-a33290e25ff2.png)

### Kiểm tra Docker được cài chưa

![](https://images.viblo.asia/9c4a599c-3650-4298-b618-0e6560e92a06.png)

## Nhận xét

- Khi muốn chạy VM lên thì chúng ta truy cập Hyper-V Manager để thực hiện start VM. Một VM đã start, khi reboot windows thì nó cũng sẽ được tự động chạy sau khi reboot.
- Nên bật Secure-Boot cho VM, tuy nhiên khi enable thì như trên máy mình sẽ cần setting boot template là UEFI.
- Có thể thực hiện giới hạn resource cho VM trong setting như memory, CPU. Có chế độ Dynamic memory giúp tự động cho phép cấp phát thêm/bớt cho VM.
- Có thể thực hiện tạo một VM Ubuntu từ giống hệt một VM đã tạo trước đó, khi đó sẽ không cần thực hiện các bước cài đặt OS như ở trên nữa.
- Trong hướng dẫn trên mình chưa cài OpenSSH Server, do đó sẽ không truy cập được vào VM thông qua SSH. Để SSH được vào VM thì chúng ta cài thêm OpenSSH Server:
```bash
sudo apt-get purge openssh-server
sudo apt-get install -y openssh-server
```
- Khi sử dụng, mỗi khi reboot thì cái network `Default Switch` nó lại bị cấp phát lại IP mới nên việc mình set static IP ở trên trở thành vô dụng. Giải pháp là thực hiện tạo một Virtual Switch (External) mới trong HyperV Manager, hoặc tạo một cái Virtual Switch (Internal) rồi share internet cho nó. Cái Virtual Switch này mình sẽ gán được Static IP, chúng ta cấu hình là Static IP cho phù hợp là được. Ví dụ như sau:
```/etc/netplan/00-....yml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
     dhcp4: no
     addresses:
     - 192.168.137.10/24
     gateway4: 192.168.137.1
     nameservers:
       addresses:
       - 192.168.137.1
```

## Tổng kết

Như vậy, sau khi thực hiện các bước trên thì mình đã hoàn thành việc cài đặt máy ảo Ubuntu Server 18.04 trên Windows với Hyper-V và rút ra được một vài nhận xét giúp các bạn tiết kiệm khá nhiều thời gian khi tiếp cận. Cảm ơn các bạn đã đọc bài viết này của mình! Đừng quên upvote, folllow mình nhé nếu thấy nó hữu ích nhé.

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***