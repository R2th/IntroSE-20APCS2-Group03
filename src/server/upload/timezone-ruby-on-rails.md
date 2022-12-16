## Vấn đề
Đối với các project mà có xu hướng phát triển ra quốc tế (vận hành không chỉ trong 1 nước), thì vấn đề liên quan time zone có thể nói khá quan trọng.
TimeZone sẽ ảnh hưởng đến việc thống kê, phân tích dữ liệu trong ngày.

Ví dụ như có 1 trang thương mại điện tử A được sử dụng ở cả Việt Nam (GMT +7) và Nhật Bản (GMT +9).
Admin ở Việt Nam thì sẽ mong muốn thống kê được số lượng Order được tạo trong ngày (theo múi giờ Việt Nam)
Admin ở Nhật thì sẽ mong muốn thống kê được số lượng Order được tạo trong ngày (theo múi giờ Nhật)

Đây là 1 cách suy nghĩ hoàn toàn tự nhiên. Tuy nhiên trong đại đa số các trường hợp, developer thường không để ý đến vấn đề TimeZone này (thường sử dụng luôn timezone trong default config của project)
→ Sẽ có khả năng xảy ra thông kê sai lệch
→ Đối với Shop, sự thống kê sai lệch có thể gây ra sự phán đoán sai lầm và sự điều chỉnh chiến thuật hay chiến lược bán hàng

Do đó, có thể nói đây là 1 vấn đề khá quan trọng mà trong khi phát triển dịch vụ, mỗi developer nên chú ý tới.

Hiện tại mình cũng đang gặp vấn đề như trên trong project hiện tại nên tiện thể cũng tìm hiểu qua về các khái niệm và cách thức giải quyết vấn đề này (trong Ruby và Rails)
## TimeZone là gì?
Đây mà 1 khái niệm mà chắc hẳn developer ai cũng đã từng nghe qua 1 lần.

> Time zone is a region where the same standard time is used.
* Giải thích 1 cách đơn giản hơn: Thế giới chia ra làm 24 múi giờ dựa theo kinh độ, mỗi múi giờ sẽ tương ứng với 1 time zone. Có nghĩa là mỗi 1 timezone sẽ trải dài với 15 độ kinh độ. Mốc 0 được lấy tại đường kinh độ 0 độ đi qua London, Anh.
![](https://images.viblo.asia/3204ba4c-1f7c-42a8-9f6d-00d312611c83.png)
* Danh sách database của timezone, các bạn có thể tham khảo tại[Link này](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
## Các class liên quan đến time trong Ruby và Rails
### Ruby
Ruby cung cấp các class sau để xử lý vấn đề thời gian.
* > Time
* > Date
* > DateTime
### Rails
Rails cung cấp class ActiveSupport::TimeWithZone để lưu time với time zone.
Khi tạo 1 dòng mới với các cột có type là datetime, trong DB sẽ mặc định lưu dưới time zone là UTC +0.
Tuy nhiên, khi lấy giá trị đó ra thì giá trị datetime ấy sẽ tự động được tính toán chuyển sang time zone tương ứng với setting trong application.rb.
```
config/application.rb】
config.time_zone = 'Asia/Tokyo'

【Rails console】
blog = Blog.create

blog.created_at
=> Sun, 24 Dec 2017 17:20:15 JST +09:00

blog.created_at_before_type_cast
=> 2017-12-24 08:20:15 UTC
```
## Cách giải quyết vấn đề đặt ra
Trong trường hợp đặt ra ở trên, để có thể giúp AdminUser tại mỗi 1 địa điểm khác nhau thống kê được chính xác theo time_zone tương ứng thì cần phải xác định được time_zone cho mỗi user chứ không sử dụng time_zone default được setting trong application.rb
Có 2 cách để xác định điều này:
* Lưu time_zone theo từng admin_user. 
* Khi admin_user access vào thì sử dụng javascript bên phía client để lấy thông tin timezone và gửi như 1 param lên server. Server sẽ sử dụng params time_zone được gửi lên ấy và xử lý lấy dữ liệu dựa trên param này. Các bạn có thể tham khảo cách lấy time_zone qua javascript.
## Note
1 điều cần chú ý khi cách generate sql để lấy data từ database ra bằng ActiveRecord với điều kiện so sánh là kiểu datetime trong câu lệnh where
Giả sử có model User với created_at.
Ta muốn lấy tất cả các users được tạo từ 12:00 21/12/2017 GMT +9 chẳng hạn.
Có 2 kiểu viết như sau:

```
User.where("created_at > #{Time.parse('2017-12-21 12:00')}")
 → SELECT `users`.* FROM `users` WHERE (created_at > 2017-12-21 12:00:00 +0900)
```

```
User.where("created_at > ?", Time.parse('2017-12-21 12:00'))
→ SELECT `users`.* FROM `users` WHERE (created_at > '2017-12-21 03:00:00')
```

Nhìn vào câu lệnh sql được generate ra ở phía trên, chúng ta có thể thấy:
* Cách 1: biến time truyền vào trong câu lệnh where thì time sẽ không được chuyển time ở UTC+0 mà vẫn bị giữ nguyên time tại UTC+9 để so sánh với giá trị created_at (UTC+0) → kết quả sẽ sai lệch
* Cách 2: Giá trị của biến time được tự động chuyển về UTC+0 và được so sánh với created_at (UTC +0) → đưa ra kết quả đúng.

Hi vọng bài này có ích cho anh chị em. :)