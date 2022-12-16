Hi các bạn, chắc hẳn developer dự án thì hầu hết mọi người sẽ làm việc liên quan đến việc xử lý time (thời gian), nếu dự án của các bạn chỉ sử dụng ở 1 quốc gia duy nhất thì sẽ ít có khả năng sẽ bị sai về query hay function nào đó liên quan đến time, nếu bạn code không sai :)). Nhưng các bạn thử nghĩ xem, nếu chúng ta làm dự án mà function nào đó liên quan tới đa quốc gia mà server mình chỉ config được 1 múi giờ cho 1 quốc gia duy nhất, thì điều này sẽ như thế nào nhỉ ??? Nếu các bạn chưa cover được code thì chắc chắn sẽ sinh bug ở function này. Và cũng vì như thế hôm nay mình sẽ chỉ ra những cách mà các bạn có thể code và sử dụng ở nhiều quốc gia mà mình biết được nha, let's go

Đầu tiên chúng ta nên tìm hiểu:
# Time zone
Giải thích 1 cách đơn giản nha: Thế giới chia ra làm 24 múi giờ dựa theo kinh độ, mỗi múi giờ sẽ tương ứng với 1 time zone. Có nghĩa là mỗi 1 timezone sẽ trải dài với 15 độ kinh độ. Mốc 0 được lấy tại đường kinh độ 0 độ đi qua London, Anh. 
![](https://images.viblo.asia/83c4defa-8dfb-449d-bd79-3e21ede7ccf1.png)
trong ruby sẽ có các class liên quan đến Time như:
* Time
* Date
* DateTime
Còn trong Rails nó sẽ cung cấp class ActiveSupport::TimeWithZone để lưu time với time zone. 
Khi tạo 1 dòng mới với các cột có type là datetime, trong DB sẽ mặc định lưu dưới time zone là UTC +0. Tuy nhiên, khi lấy giá trị đó ra thì giá trị datetime ấy sẽ tự động được tính toán chuyển sang time zone tương ứng với setting trong application.rb.
```
config/application.rb】
config.time_zone = "Asia/Tokyo"
thử ở rails console

user = User.create

user.created_at
=> Sat, 23 May 2020 07:20:15 UTC +00:00

Time.zone.at user.created_at
=> Sat, 23 May 2020 16:18:35 +09 +09:00
```
ở trên do mình đang set time_zone ở Nhật nên khi mình Time.zone nó sẽ +9 giờ vào giờ của data nhận được khi mình query từ DB lên
## Vấn đề sẽ xảy ra khi mình dùng ở nhiều quốc gia
Mình lấy ví dụ: trong cùng một lúc 2 thằng Admin muốn xem số liệu của bảng user nhưng vì ở đây mình chỉ config server là giờ Nhật, thì data trả về nó hiện đang chỉ đúng so với thằng admin ở bên Nhật và thằng admin ở bên Việt Nam data sẽ không đúng vì lúc này nó đang trả data của giờ Nhật :)
## Cách giải quết vấn đề
Trong trường hợp đặt ra ở trên, để có thể giúp Admin tại mỗi 1 địa điểm khác nhau thống kê được chính xác theo time_zone tương ứng thì cần phải xác định được time_zone cho mỗi user chứ không sử dụng time_zone default được setting trong application.rb Có 2 cách để xác định điều này:
* Lưu time_zone theo từng admin_user.
* Khi admin_user access vào thì sử dụng javascript bên phía client để lấy thông tin timezone và gửi như 1 param lên server. Server sẽ sử dụng params time_zone được gửi lên ấy và xử lý lấy dữ liệu dựa trên param này. Các bạn có thể tham khảo cách lấy time_zone qua javascript.
* Đưa tất cả query về cùng múi giờ (cách này khá nhọc vì mình phải convert mọi query liên quan tới time zone)
## Phát sinh
Mình ví dụ thêm 1 trường hợp mà dù bạn có lưu time zone ở user thì vẫn không giải quyết được.
ex: Có 1 function, người ta muốn vào 00h hẳng ngày hay một giờ nào đó hằng ngày, sẽ tự động chạy tất cả data và thông báo nếu data đó hợp lệ, thì hiển nhiên vì server của mình chỉ config 1 múi giờ thì lúc 00h bên Nhật chạy thì ở bên Nhật auto đúng, nhưng ở VN thì nó sẽ chạy vào lúc 22h ngày trước đó => sai so với múi giờ khác config.
cách giải quyết của mình là khi lưu data, mình sẽ phải lưu attribute mà mình muốn query đó theo 00h và chuyển hết về giờ UTC để query, chạy job 24 lần trong một  ngày :)
đây là cách xử lý riêng của mình, nhìn củ chuối nhưng nó đảm bảo được vẫn đúng spec =))

Nếu các bạn có cách xử lý nào hay thì có thể comment bên dưới để mình học hỏi nhé, thanks mọi người.