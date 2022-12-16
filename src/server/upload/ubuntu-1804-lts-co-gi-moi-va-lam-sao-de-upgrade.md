Không biết các bạn code trên OS nào, còn với các framgia-er thì hầu như là trên nền tảng linux, đặc biệt là ubuntu. Vậy trong phiên bản LTS(long time support) lần này của Ubuntu có gì mới và làm sao để update từ phiên bản hiện tại của bạn.
#### Ubuntu 18.04 LTS Bionic Beaver cuối cùng đã được phát hành. Sau đây là bản tóm tắt nhanh về các tính năng mới và liên kết tải xuống cho Ubuntu 18.04.


## Ubuntu 18.04: Có gì mới?
Mặc dù có thể không có quá nhiều thay đổi trực quan từ Ubuntu 17.10, nhưng nó vẫn là một sự chuyển đổi rất lớn từ Ubuntu 16.04.

Ubuntu 18.04 sử dụng GNOME desktop thay vì màn hình nền Unity của nó. GNOME đã được tùy chỉnh để giống với Unity nhưng nó vẫn là một môi trường máy tính để bàn khác nhau. Đây là lý do tại sao Ubuntu giới thiệu màn hình chào mừng lần đầu tiên trong lịch sử của nó.

![](https://images.viblo.asia/c09935b1-6369-4170-8d1f-e4393eb144de.jpeg)

*Ubuntu giới thiệu màn hình chào mừng*


Dưới dây là tóm tắt nhanh các thay đổi trong phiên bản Ubuntu 18.04 LTS

* GNOME 3.28 là màn hình mặc định.
* Tùy chọn bản vá hạt nhân(kernel) trực tiếp cho máy tính để bàn.
* Tùy chọn cài đặt tối thiểu cho phép bạn cài đặt Ubuntu chỉ với các tiện ích thiết yếu và trình duyệt web.
* Cơ chế PPA được cải thiện khi thêm kho lưu trữ sẽ tự động cập nhật.
* Nhân Linux 4.15 (Linux Kernel 4.15).
* Quản lý tập tin Nautilus được thiết kế lại một chút.
* Xorg là máy chủ hiển thị mặc định một lần nữa (Wayland là mặc định trong 17.10).
* Trình cài đặt mới cho Ubuntu 18.04 Phiên bản máy chủ.
* Hỗ trợ cho biểu tượng cảm xúc màu gốc trong ứng dụng GTK.
* Hỗ trợ Thunderbolt 3 trong GNOME Shell.
* Tự động tạm ngưng cho máy tính xách tay sau 20 phút không hoạt động để tiết kiệm pin.
* Cập nhật phần mềm.
* Không có bản tải xuống ISO 32-bit mới.
* Python 3.6.
* Đối với các cài đặt mới, tệp hoán đổi được sử dụng theo mặc định thay vì phân vùng trao đổi.
* Bạn không còn có thể mã hóa chỉ tùy chọn nhà bằng ecryptfs-utils tại thời điểm cài đặt. Bạn nên sử dụng mã hóa toàn bộ đĩa thay thế.

## Downlload Ubuntu 18.04 LTS
Bạn có thể tải xuống phiên bản GNOME mặc định của Ubuntu 18.04 LTS từ liên kết bên dưới:

 [Download Ubuntu 18.04 LTS](http://releases.ubuntu.com/18.04/ubuntu-18.04-desktop-amd64.iso)

Nếu bạn thích torrents, dưới đây là liên kết torrent.dưới

 [Torrent Download for Ubuntu 18.04 LTS](http://releases.ubuntu.com/18.04/ubuntu-18.04-desktop-amd64.iso.torrent)

Hoặc các bạn có thể Download các phiên bản khác của Ubuntu 18.0.4 LTS từ [trang chủ Ubuntu](https://www.ubuntu.com/download).

## Cập nhậ trực tiếp từ phiên bản hiện tại
* Bước 1:

 Truy cập Software & Updates:
 
 ![](https://images.viblo.asia/d41da06d-37a0-4c31-81e0-95f2713c90c2.jpeg)
 
 
 Trong tab Updates, đảm bảo rằng tùy chọn ‘Notify me for a new Ubuntu version‘ được đặt là ‘For any new version‘.
 ![](https://images.viblo.asia/c636be0f-2e44-4f35-b8c5-8e07ffcced62.jpeg)
 
 Để nâng cấp lên Ubuntu phiên bản 18.04, hãy kiểm tra  ‘Pre-released updates‘ trong tabs Developer Options.abs
 ![](https://images.viblo.asia/d459ff6d-bd33-45df-a89d-f3220be3823e.jpeg)

Thao tác này sẽ tải lại bộ nhớ cache trong Kho phần mềm.

* Bước 2:

 Khi cài đặt Nguồn phần mềm đúng, mở terminal và sử dụng lệnh dưới đây để cập nhật hệ thống. Có thể mất một thời gian, tùy thuộc vào tốc độ internet của bạn.

```
sudo apt update && sudo apt dist-upgrade
```
Nếu bạn được yêu cầu hệ thống khởi động lại, khởi động lại hệ thống của bạn.

* Bước 3:

 Bây giờ hãy chạy Trình quản lý Cập nhật với tùy chọn d để có thể nâng cấp.

```
sudo update-manager -d
```

Thao tác này sẽ mở ra Software Updater và nó sẽ thông báo cho bạn biết về sự sẵn có của Ubuntu 18.04.

![](https://images.viblo.asia/a0b12eb1-47bd-49da-9c98-725da95eb228.jpeg)

Nhấp vào Upgrade.

* Bước 4:

 Phần còn lại của quá trình này là khá dễ dàng. Tất cả bạn phải làm là thực hiện theo các hướng dẫn trên màn hình.
 
 ![](https://images.viblo.asia/6e004435-a750-48ef-b7c0-9000e8df31be.jpeg)

Nó sẽ tải về công cụ nâng cấp bản phát hành Ubuntu 18 beta.eta

![](https://images.viblo.asia/fc4cb7e4-db79-4759-8ece-07f79146472b.jpeg)

Và sau đó nó sẽ chuẩn bị hệ thống của bạn để nâng cấp bằng cách thiết lập các kho phần mềm mới.

![](https://images.viblo.asia/18af4d6a-7aae-4fa3-87da-858857f51933.jpeg)

Và ở giai đoạn này, bạn sẽ được yêu cầu nâng cấp hệ thống của mình. Toàn bộ quá trình có thể mất từ 20 phút đến 90 phút tùy thuộc vào tốc độ internet của bạn.

![](https://images.viblo.asia/40436844-afd6-45fe-bd67-3eef7966443e.jpeg)

Bây giờ hệ thống của bạn sẽ cài đặt gói Ubuntu 18.04 beta mới.

![](https://images.viblo.asia/4715cc82-496a-4437-9822-b6663a84886c.jpeg)

Sau một thời gian, bạn sẽ được hỏi liệu bạn có muốn giữ các gói lỗi thời từ trước cài đặt 17.10 Ubuntu (như hình bên dưới). Tôi khuyên nên gỡ bỏ chúng.

![](https://images.viblo.asia/a71c2e15-5cf5-46e1-9aee-91deeba5436a.jpeg)

Tại thời điểm này, bạn đã hoàn thành quá trình nâng cấp Ubuntu 18.04 beta. Bạn sẽ được yêu cầu khởi động lại hệ thống ngay bây giờ.

![](https://images.viblo.asia/461f6540-1eca-44bf-a191-2edda3767af2.jpeg)

Sau khi khởi động lại hệ thống, bạn có thể không nhận thấy sự khác biệt ngay lập tức. Ngay cả hình nền vẫn giữ nguyên như Ubuntu 17.10. Tuy nhiên, khi bạn kiểm tra chi tiết hệ thống, bạn sẽ thấy rằng hệ thống của bạn bây giờ là Ubuntu 18.04 beta.

![](https://images.viblo.asia/dc7d988d-9bd6-40af-bd95-f931e927793b.jpeg)

Nguồn: [itsfoss.com](https://itsfoss.com)