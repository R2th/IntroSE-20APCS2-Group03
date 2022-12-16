Tên miền là một trong những yếu tố quan trọng nhất của một website. Tên miền mặc định của Shopify sẽ có dạng: store-name.myshopify.com. Để thiết lập tên miền của bạn cho website Shopify bạn có thể mua một tên miền mới hoặc chuyển hướng tên miền bạn đang sở hữu sang Shopify.
## Mua tên miền mới
Shopify có sẵn dịch vụ cung cấp tên miền mới, bạn chỉ cần làm theo các bước sau:
1. Từ Shopify admin, Truy cập vào: **Online store** -> **Domain** 
2. Nhấp chuột vào **Buy new domain** trên phần header
![](https://images.viblo.asia/7146b567-56d7-4f3f-a9d5-7d81f3086194.png)

3. Nhập tên miền bạn muốn mua
![](https://images.viblo.asia/47d8f38f-23b2-42d2-ab7a-192024b15adf.png)

4. Danh sách tên miền khả dụng sẽ được hiển thị cùng giá mua theo năm. Nhấp chuột vào **Buy** ứng với tên miền bạn lựa chọn.
![](https://images.viblo.asia/01e26c6b-e070-4aae-a6a5-48b279a7f26e.png)

5. Nhấp chuột vào Auto-renew this domain every year nếu bạn muốn hệ thống tự động gia hạn trước khi tên miền hết hạn.
![](https://images.viblo.asia/87392e40-5dad-4c57-abdf-7b042dad4bb7.png)

6. Sau khi đã đọc ICANN policy and Domain Registration Agreement (Chính sách ICANN và Domain Registration Agreement) bạn nhấp chuột vào **Buy domain** để hoàn tất thủ tục.

Bạn sẽ nhận được một email của Shopify xác nhận đơn hàng của bạn. Hệ thống có thể mất đến 48 giờ để cập nhật và tên miền mới của bạn hoạt động.

## Chuyển hướng tên miền tới website Shopify
Shopify không cung cấp tên miền có đuổi ".vn". Nếu muốn sử dụng tên miền .vn bạn phải mua từ một nhà cung cấp tên miền của Việt Nam. Sau khi sở hữu tên miền của bạn, bạn có thể chuyển hướng tới website Shopify theo các bước sau:
### Thêm tên miền đã sở hữu vào website Shopify của bạn
1. Từ Shopify admin, Truy cập vào: **Online store** -> **Domain** 
2. Nhấp chuột vào **Connect existing domain**
![](https://images.viblo.asia/81b06066-de92-48aa-a4f0-bb3ef2084fca.png)

3. Nhập tên domain bạn đã sở hữu
![](https://images.viblo.asia/cb736e17-2398-4dd8-91e8-dfeed9956fa1.png)

4. Nhấp chuột vào **Next**
Bước tiếp theo bạn cần thiết lập tên miền của bạn kết nối tới website Shopify

### Thiết lập tên miền kết nối tới Shopify
Bạn cần thiết lập DNS như sau
* A record cần được trỏ đến địa chỉ IP của Shopify: ***23.227.38.32***
* CNAME record cần được trở tới: ***shops.myshopify.com***
1. Đăng nhập vào trang quản lý tên miền mà bạn đã sở hữu
2. Tìm chức năng cài đặt DNS
3. Chỉnh sửa A record của bạn để trỏ về IP: ***23.227.38.32***
4. Lưu lại A record
5. Tìm CNAME record trong cài đặt DNS
6. Thay đổi CNAME record để trỏ tới ***shops.myshopify.com***. CNAME record luôn phải trở tới một tên miền, không thể trỏ tới một IP.
7. Lưu lại CNAME record đã thay đổi
Bước tiếp theo bạn cần xác minh lại kết nối của bạn tới Shopify

### Xác minh kết nối tới Shopify
Nhấp chuột vào **Verify connection** trong Shopify admin để xác nhận tên miền của bạn đã được kết nối tới website Shopify.

Sau khi bạn đã thêm tên miền của bạn vào website Shopify. Bạn cần chọn tên miền chính **Primary domain**. Tên miền mà khách hàng có thể truy cập vào website của bạn thông qua một trình duyệt.

Hướng dẫn thiết lập tên miền chính **Primary domain** và thay đổi lại tên miền bạn đã thiết lập.