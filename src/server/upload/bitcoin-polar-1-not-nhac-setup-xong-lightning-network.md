# One-click Bitcoin Lightning Networks
![](https://images.viblo.asia/9e44dc9a-ea23-4ebb-93b8-993a59db6b92.png)

# Vấn đề khi phát triển Dapps trên Lightning network
Để cài đặt Lightning network hiện tại chúng ta cần cài đặt Golang > go1.11 rồi sau đó cài đặt **bitcoin** node sau đó cài đặt **lnd**,...
chi tiết cài đặt mình có đề cập trong bài viết [này](https://viblo.asia/p/bitcoin-lightning-network-toan-thu-hoi-1-setting-up-local-cluster-bWrZn4wn5xw) các bạn có thể tham khảo. Theo mình thấy thì thực sự cách cài đặt đó rất dài dễ lỗi khó follow và thực sự tốn rất nhiều thời gian cho người mới bắt đầu . Gần đây mình mới có tìm hiểu và phát hiện ra một app khá hay để setup môi trường test nhanh gọn nhẹ trong vài click để chúng ta có thể setup môi trường Lightning network . Đó chính là **Polar**

**Polar** được xây dựng để giúp các coder phát triển ứng dụng Lightning Network nhanh chóng bằng cách tạo ra một hoặc nhiều local network trên máy tính của họ.

Với Polar bạn có thể:

* Tạo một Lightning Network regtest chỉ trong vài cú nhấp chuột
* Kết nối từ ứng dụng của bạn với các nút Lightning thông qua RPC
* Khởi chạy terminal trong mỗi nút bitcoin / Lightning
* Thêm nhiều nút hơn bằng cách sử dụng kéo và thả
* Mở và đóng kênh
* Mine các khối mới
* Gửi tiền regtest vào mỗi nút Lightning

Các Network node được hỗ trợ:
* LND v0.8.0 & v0.7.1
* Bitcoin Core v0.18.1
* c-lightning
# Cách cài đặt 

## Dependencies
Polar yêu cầu bạn phải cài đặt Docker để tạo các mạng cục bộ

Trên Mac & Windows, bạn chỉ cần cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop)

Trên Linux, bạn cần cài đặt [Docker Server](https://docs.docker.com/install/#server) và [Docker Compose](https://docs.docker.com/compose/install/) riêng

## Download
Hiện tại Polar đã releases một vài bản dành cho Mac , Win và Ubuntu để cài đặt các bạn có thể vào link sau để chọn bản cài đặt.

https://github.com/jamaljsr/polar/releases

Hoặc bạn cũng có thể clone github của Polar và chạy : 
https://github.com/jamaljsr/polar
**Lưu ý** nên cài các bản releases vì bản dev hiện tại vẫn đang dev vẫn còn khá nhiều lỗi trong quá trình sử dụng 

```
yarn	#install dependencies
```
Sau đó
```
yarn dev	#run the app with react hot reloading and electron live restarting
```
**chú ý** nếu trong quá trình pull docker về lỗi thì hãy sửa lại DNS server 
config thành **8.8.8.8** thay vì **127.0.1.1** bằng lệnh
```
sudo vi /etc/resolv.conf
```


Polar là app được phát triển trên React code bằng TypeScript và Electron cho đến hiện nay vẫn đang tiếp tục dev vá một số lỗi và phát triển thêm các chức năng . 

## Kiến trúc đằng sau polar

![](https://images.viblo.asia/b745ec6c-7b27-4916-9494-2d6a723ffcc6.png)

## Hướng dẫn sử dụng 
Chúng ta sẽ bắt đầu bằng việc tạo một mạng Lightning 
![](https://images.viblo.asia/9e44dc9a-ea23-4ebb-93b8-993a59db6b92.png)

Ở đây chúng ta có một vài thông số

* Network Name : Vì có thể tạo nhiều network nên bạn có thể đặt tên cho network để phân biệt vs các network khác
* How many LND node : Bạn có thể config số lượng node LND khi khởi tạo ( Ở bản mình clone repo về thì đã có thêm node c-lightning ) 
* How many bitcoind nodes : hiện tại mặc định là 1 node bitcoind cho mỗi mạng

![](https://images.viblo.asia/910c2515-b3b7-4a96-bdae-7978fb6465b4.png)

Sau khi tạo xong chúng ta sẽ có một mạng như sau. Để bắt đầu bạn nhấn **Start** 

Ở Side bar bên trái bạn có thể kéo thả để thêm node

![](https://images.viblo.asia/c9456b2a-d25a-48f1-adac-0de26078861e.png)

Phần **info** của node LND chứa thông tin của node LND gồm :

* Node type : gồm loại node lighning hay bitcoind
* Implementation : LND hoặc c-lightning
* Version : v0.8.0-beta hoặc v0.7.1-beta ,...
* Status : Stopping hoặc Running

![](https://images.viblo.asia/5a2107ec-ed5c-4383-944e-a036a16ca445.png)

Phần **connect**  là phần hay nhất :

* GRPC Host và REST Host
* P2P LN Url : địa chỉ của node
* API Docs : mở đến trang document của LND

ngoài ra còn TLS Cert, Admin Macaroon và Read-only Macaroon cung cấp dưới dạng path đến file , giá trị dưới dạng HEX, Base64, ...
Những giá trị này vô cùng quan trọng trong quá trình dev bạn có thể connect từ code rất đơn giản mà ko phải setup môi trường .

Hãy cùng thử sử dụng những giá trị này để connect với ví **Joule** nào .
Joule là extension ví lightning network 

![](https://images.viblo.asia/bac3b023-a7c7-47bd-bac5-3f565d71b4e0.png)

Sau khi cài đặt nhấn **Start**  chọn phần **Local node** 

![](https://images.viblo.asia/78f38639-b6d5-4ec5-bb85-cacedd8a4c1f.png)

Phần Node URL điền theo REST Host của Node LND trong Polar cung cấp ở đây mình chọn node Bob REST URL là **localhost:8083**

![](https://images.viblo.asia/837a077d-6a85-44cd-8778-9824ffde23f9.png)

Sau đó là điền **admin.macaroon** và **readonly.macaroon** chúng ta chỉ cần mở file theo Path mà Polar cung cấp rồi kéo thả 2 file đó vào 

![](https://images.viblo.asia/000d01d1-b302-4b38-b068-8c1a1dbc6c98.png)

Đây là kết quả sau khi đã hoàn thành việc kết nối Node bob vs ví Joule vô cùng đơn giản và ko tốn quá nhiều thời gian .

![](https://images.viblo.asia/f73dbf98-0c30-4556-8393-ccca79392c80.png)

Ngoài ra phần Actions có thể mở terminal và thao tác bằng lệnh lncli

Có thể Deposit cho node LND 

Phần **Quick Mine** trên navbar là để mine 1 block và bạn cũng có thể cài đặt 1 lần quickmine là bn block

## Open channel

Bạn chỉ cần kéo thả các node LND với nhau và điền giá trị tiền khởi tạo cho channel

![](https://images.viblo.asia/82e8b76a-a6c9-4dcb-a169-82d8ec14f665.png)

Sau đó bạn có thể gửi và nhận tiền trong channel và xem đc các giá trị trong channel bằng cách bấm vào đường nối giữa các nốt ( biểu tượng cho Channel )

![](https://images.viblo.asia/6ddbe251-c427-432e-93d3-624f15e09d66.png)

Những giá trị của app cung cập thực sự rất hữu ích trong quá trình dev Lightning .

# Các bạn có thể xem demo chi tiết hơn tại đây :

https://www.youtube.com/watch?v=HInI_G3oYpc&pbjreload=10