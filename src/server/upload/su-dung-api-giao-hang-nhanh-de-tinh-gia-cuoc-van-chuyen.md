Nếu ai đang phát triển một trang web liên quan đến việc vận chuyển sản phẩm như mua bán hàng online, chắc hẳn sẽ phải tích hợp API của các dịch vụ giao hàng như Giao hàng Nhanh, Viettel Post,...

Trong bài này, mình xin hướng dẫn cách sử dụng API của Giao hàng Nhanh để tính phí vận chuyển hàng hóa. 
# 1. Tạo tài khoản
Để có thể sử dụng được API, chúng ta cần có tài khoản của GHN để lấy user token. 

+ B1: Truy cập vào link sau để đăng ký tài khoản: https://sso.ghn.vn/register
+ B2: Sau khi đăng nhập thành công, bấm vào tên mình ở góc trên bên trái màn hình để xem thông tin cá nhân.
![](https://images.viblo.asia/dbbf23d8-104b-4c85-84c9-7a56566d5a6b.png)
+ B3: Tại ô Token API, nhấn Xem để lấy Token.
![](https://images.viblo.asia/150e44be-82fe-42df-9f9f-6d27c31b5f8e.png)
# 2. API lấy thông tin địa chỉ giao hàng
Để có thể tính toán được chi phí vận chuyển, chúng ta cần phải có input là Quận huyện, Phường xã nơi lấy hàng và nơi nhận hàng.

Để lấy được dữ liệu về tất cả Tỉnh thành phố, Quận huyện, Phường xã của Việt Nam, chúng ta làm như sau:
## 2.1. API lấy thông tin Tỉnh, Thành Phố
+ Method: GET/POST
+ API: https://online-gateway.ghn.vn/shiip/public-api/master-data/province
+ Header: token

Sau đây mình sẽ gọi thử API này bằng Postman.
![](https://images.viblo.asia/f8a2e8c0-fb52-4441-848c-4b21e1348cff.png)
Copy token vừa lấy được ở phần 1, cho vào Headers.
Kết quả trả về thành công sẽ như trong hình.
## 2.2. API lấy thông tin Quận, Huyện
Để lấy thông tin Quận/Huyện của một Tỉnh/ Thành phố nào đó, ta dùng API sau:
+ API: https://online-gateway.ghn.vn/shiip/public-api/master-data/district
+  Method: GET/POST
+ Header: token
+ Param: province_id (int - ID của tỉnh/thành phố vừa lấy được bên trên.)

Ví dụ mình lấy danh sách các quận thuộc thành phố Hà Nội:

Vì thành phố Hà Nội có province_id là 201 nên mình sẽ truyền param province_id=201 dưới dạng json vào Body. Kết quả trả về thành công sẽ như sau:
![](https://images.viblo.asia/c7a43ff3-9e49-4e98-9fc1-a77e3a5b5e00.png)
## 2.3. API lấy thông tin Phường, Xã
API này tương tự như API lấy thông tin Quận, Huyện.
+ API: https://online-gateway.ghn.vn/shiip/public-api/master-data/ward
+ Method: GET/POST
+ Header: token
+ Param: district_id (int - ID của quận/huyện vừa lấy được bên trên.)

Ví dụ mình lấy danh sách các phường thuộc quận Hà Đông (district_id = 1542)
![](https://images.viblo.asia/b686653d-b55a-4a8c-9013-3d9588c328a9.png)
# 3. API lấy thông tin gói dịch vụ
Việc giao hàng từ vị trí A đến vị trí B sẽ có nhiều cách thức khác nhau như: giao hàng bằng đường bộ, đường hàng không, tàu thủy,... Mỗi phương thức giao hàng sẽ có giá cước khác nhau, nên đây cũng sẽ là input cho API tính cước phí giao hàng.

Để lấy các phương thức giao hàng khả dụng, ta dùng API sau:

+ API: https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services
+ Method: GET/POST
+ Header: token
+ Param: 
    + shop_id: int - ID của shop
    + from_district: int - ID của quận/huyện người gửi
    + to_district: int - ID của quận/huyện người nhận

Cách lấy shop_id sẽ nằm trong màn Quản lý cửa hàng.
![](https://images.viblo.asia/8e2eee94-abde-4a2e-a409-2867916f2a3f.png)
Ví dụ mình lấy gói dịch vụ khả dụng khi chuyển hàng từ quận Hà Đông (id: 1542) đến quận 1 - TP Hồ Chí Minh (id: 1442):
![](https://images.viblo.asia/c425f5a5-c2cf-4c80-9b4e-bb0992bc191c.png)
Kết quả trả về cho thấy có 2 gói khả dụng, đó là vận chuyển theo đường hàng không và theo đường bộ.
# 4. API tính giá cước vận chuyển
Cuối cùng cũng đến API tính giá cước :D
+ API: https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee
+ Method: GET/POST
+ Header: token, shop_id
+ Param: 
    + service_id hoặc service_type_id: 
        + service_id: int - ID của gói dịch vụ mà bạn chọn (lấy được ở phần 3)
        + service_type_id: Nếu không điền service_id, có thể thay thế bằng 1 trong 3 lựa chọn sau: 1:  Express, 2: Standard, 3: Saving
    + insurance_value: int - giá trị của sản phẩn. GHN căn cứ vào giá trị này để tính tiền bảo hiểm cho hàng hóa.
    + coupon: String - Mã giảm giá của GHN. Nếu không có, để rỗng: "" hoặc null
    + to_ward_code: String - ID Phường/ Xã người nhận
    + to_district_id: int - ID Quận/Huyện người nhận
    + from_district_id: int - ID Quận/Huyện người gửi
    + weight: int - trọng lượng hàng hóa (gram)
    + length: int - Chiều dài (cm)
    + width: int - Chiều rộng (cm)
    + height: int - Chiều cao (cm)
    
Ví dụ, mình sẽ tính phí vận chuyển với thông tin vận chuyển như sau: 
```json
{
    "service_id":53321,
    "insurance_value":500000,
    "coupon": null,
    "from_district_id":1542,
    "to_district_id":1444,
    "to_ward_code":"20314",
    "height":15,
    "length":15,
    "weight":1000,
    "width":15
}
```
Gọi API với params truyền vào như trên, ta được kết quả như sau:
```json
{
    "code": 200,
    "message": "Success",
    "data": {
        "total": 37000,
        "service_fee": 37000,
        "insurance_fee": 0,
        "pick_station_fee": 0,
        "coupon_value": 0,
        "r2s_fee": 0
    }
}
```
Vậy tổng giá cước khi vận chuyển một kiện hàng có kích thước 15x15x15cm, nặng 1kg từ Hà Đông (Hà Nội) đi Quận 1 (TP Hồ Chí Minh) là 37000đ.
# 5. Kết
Trên đây, mình đã hướng dẫn cách sử dụng API của GHN để tính giá cước vận chuyển. Ngoài ra còn những API khác cũng rất quan trọng như tính thời gian vận chuyển, tạo đơn hàng,.... thì mời các bạn xem thêm trong doc của GHN: https://api.ghn.vn/home/docs/detail, cách làm cũng tương tự như trên.

Cảm ơn các bạn đã theo dõi
# 6. Tài liệu tham khảo
+ https://api.ghn.vn/home/docs/detail
+ https://www.youtube.com/watch?v=ha-HzsYPWDU