![](https://images.viblo.asia/286c9a3f-6a38-4113-addd-7b6e43b537bf.jpg)
1. Lời giới thiệu : 
Cùng mình tìm hiểu cách cấu hình mongodb trên môi trường production ( centos, ubuntu, linux...) để sử dụng với nhiều mục đích khác nhau.
2. Configuration File Options :
Vị trí file config:
- Linux: **/etc/mongod.conf**
- Macos: **/usr/local/etc/mongod.conf** or **/opt/homebrew/etc/mongod.conf**
- Windows: **<root install mongo>/binmongod.cfg**
3. Sample file config :
![image.png](https://images.viblo.asia/eeac69e7-aa05-40e4-88c0-b4af5d880e04.png)
 4. Explain : 
    - **fork** : **true** -> cài đặt này bật chế độ daemon cho mongod cho phép bạn chạy cơ sở dữ liệu như một máy chủ thông thường.
    - **bindIp** : **localhost** -> sử dụng cài đặt này buộc máy chủ MongoDB chỉ lắng nghe các yêu cầu đến từ IP localhost. Bạn có thể sử dụng nó để nghe các IP an toàn khác.
    - **port** : **27017** -> đây là cổng mặc định được các cá thể cơ sở dữ liệu MongoDB sử dụng. Bạn có thể thay đổi cổng thành một cổng tùy chỉnh nếu bạn muốn.
    - **quiet** : **true** -> điều này vô hiệu hóa tất cả trừ các mục quan trọng nhất trong tệp đầu ra / nhật ký. Đối với triển khai sản xuất, bạn nên đặt nó thành false.
    - **dbPath** : **/var/lib/mongodb** -> cài đặt này chỉ định nơi MongoDB sẽ lưu trữ các tệp của nó.
    - **systemLog.path** : **/var/log/mongodb/mongod.log** -> đây là đường dẫn mà mongod sẽ ghi đầu ra của nó.
    - **logAppend** : **true** -> điều này đảm bảo rằng mongod thêm các mục nhật ký mới thay vì ghi đè các mục hiện có trong quá trình máy chủ bắt đầu hoạt động.
    - **storage.journal.enabled** : **true** -> điều này cho phép viết nhật ký.
  5. Reference : 
    https://hevodata.com/learn/mongodb-configuration-file/
    
☺️☺️ Hôm nay tới đây thôi. Hẹn gặp lại ở những phần kế tiếp 😉😉
    
<a href="https://viblo.asia/p/truy-van-voi-mongodb-compass-mongo-shell-naQZRPeq5vx">Phần kế tiếp: Truy vấn với MongoCompass - Mongo Shell </a>