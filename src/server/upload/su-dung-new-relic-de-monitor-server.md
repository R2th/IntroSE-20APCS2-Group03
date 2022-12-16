Nguồn bài viết [サーバー監視 - New Relic を使ったアプリケーションのパフォーマンス監視入門](https://qiita.com/kumatronik/items/0ab5b1a37442940ce0a2)

Trong bài viết lần này tôi sẽ giới thiệu 2 vấn đề dưới đây

1. Server monitoring : giám sát tình trạng server, duy trì hệ thống hoạt động 1 cách hiệu quả
2. Change setting monitoring : giám sát setting của hệ thống, xác định được khi nào có thay đổi

# New Relic Infrastructure

Lợi ích khi sử dụng New Relic như khi tôi đã giới thiệu ở các bài viết trước, là có thể liên kết với các sản phẩm khác trong New Relic nên có thể dễ dàng so sánh, kiểm tra toàn hệ thống.

Hơn nữa New Relic Infrastructure như 1 chức năng riêng lẻ cũng có UI đặc biệt dễ quản lí  hàng chục, hàng trăm host 1 cách hiệu quả.

# Server monitoring
New Relic Infrastructure có 4 tab hiển thị kết quả đo lường server resouce như dưới đây

Hosts

Network

Storage

Processes

## Host

Đúng như tên gọi tab này hiển thị CPU của từng host, load average (số task đang chờ trong khoảng 5 phút trước), chart default hiển thị tỉ lệ sử dụng memory.

![](https://images.viblo.asia/25833f19-c5fe-4fd4-9335-2e4e215c7e82.png)

### Trục hiển thị của chart và cách thay đổi metrics

Không chỉ ở tab này mà các tab khác  thì metrics, host... hiển thị cũng là giá trị default, chúng ta có thể tùy ý thay đổi trong các lựa chọn có sẵn.



Để thay đổi trục ta click vào group by ở phía trên màn hình
![](https://images.viblo.asia/bf98873e-0816-4615-aea1-eabbfb7e93c9.png)


Để thay đổi metrics ta click vào bên cạnh title của từng chart sẽ hiển thị lựa chọn metrics

![](https://images.viblo.asia/f88667f6-ba00-4e4a-a5ae-9873400bbc82.png)


## Network

Chart ở tab network default hiển thị metrics của 1 khoảng theo đơn vị byte, đơn vị packet và thông tin về error liên quan đến chúng.

![](https://images.viblo.asia/76d1d60a-faff-434c-8623-82eb519ed37f.png)


## Storage

Ở tab storage sẽ hiển thị tỉ lệ sử dụng disc theo từng device, và byte đọc/ghi của chúng. Giống như các tab khác metrics cũng có rất nhiều lựa chọn để thay đổi.

![](https://images.viblo.asia/b20171b4-67dd-4ed5-bc6b-7abc38df52fd.png)

## Process

Ở tab process ta có thể kiểm tra được tỉ lệ sử dụng CPU theo đơn vị process, I/O, mmemory size.
Theo đó, ta sẽ biết được process nào đang tiêu tốn resource. Hơn nữa bằng cách setting tỉ lệ sử dụng CPU làm alert ta có thể biết được ngay khi nào có thay đổi đột ngột về resource.

![](https://images.viblo.asia/002046f6-b953-4b8e-a437-28bcaff96845.png)

# Change setting monitoring

Change setting là bao gồm nhiều việc như install/uninstall package, connect/bỏ connect của user qua SSH, alert, start/stop service...


New Relic Infrastructure sẽ hiển thị những change setting trên host theo dạng event history. 

Phía trên 4 tab hiển thị server reesource là "Events", hiển thị những thay đổi về setting của server.


Nguyên nhân gây giảm resource của server có thể là do thay đổi setting gì đó. 

New Relic Infrastructure có UI có thể xác định được nguyên nhân đó 1 cách nhanh chóng bằng việc thêm liên kết giữa thay đổi resource và event.
![](https://images.viblo.asia/4ead0edb-0219-41fe-8226-df080867a284.png)


Theo khoảng thời gian được chọn từ trái qua phải, 1 khoảng thời gian nhất định sẽ được hiển thị tách biệt. 

Những chỗ có màu là những thời điểm có thay đổi.

Màu càng đậm thì càng có nhiều lần thay đổi.

![](https://images.viblo.asia/4d4c25c5-b88f-4455-ac24-ff657b8f12aa.png)


Cụ thể là những thay đổi nào thì ta có thể click vào từng box để kiểm tra.


Ngoài ra event history có thể check được khi click vào menu "Events" của Infrastructure.

# Tổng kết

Trên đây tôi đã giới thiệu những setting cơ bản để giám sát performance của application. Vì chỉ là những điều rất cơ bản nên mong các bản có thể sử dụng New Relic 1 cách hiệu quả để giám sát và phân tích performances của hệ thống mình.