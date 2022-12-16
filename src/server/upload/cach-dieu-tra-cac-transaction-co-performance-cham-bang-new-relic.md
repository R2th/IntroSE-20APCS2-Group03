Nguồn bài viết : [7: 基礎編 その3: 遅いトランザクションのパフォーマンス調査方法 - New Relic を使ったアプリケーションのパフォーマンス監視入門](https://qiita.com/kumatronik/items/01677a7a613ab6c82e3e)


Trong bài viết này tôi sẽ giới thiệu về cách phổ biến nhất để phân tích, theo dõi performance một cách chi tiết khi sử New Relic.

Cách để nhận biết có điều gì bất thường với performance là nhận thông báo alert hoặc thỉnh thoảng check màn hình New Relic APM. Thông thường thì nếu setting sẵn alert thì nếu có vấn đề bất thường sẽ ngay lập tức nhận ra.

Khi nhận được alert rồi thì tiếp theo phải làm gì? Theo nguyên tắc chung thì chúng ta xem màn hình Overview của New Relic.

# Cách dùng transaction trace để kiểm tra performance đến level SQL
Cách phân tích performance phổ biến nhất là lấy transaction làm trung tâm để phân tích. Ưu điểm của phương pháp này là có thể kiểm tra được tới cả SQL. 

Trường hợp có vấn đề với xử lí DB thì có thể dùng cách này để kiểm tra DB mà không cần kiểm tra code.


1. Trường hợp có alert ta sẽ điều chỉnh thời gian trên timepicker và chart để hiển thị thời gian có alert


2. Trên màn hình overview ta chú ý vào những transaction chậm hơn bình thường
![](https://images.viblo.asia/65923ce9-8a9a-43fa-883f-ed949619d881.png)

Đặc biệt ta sẽ kiểm tra 5 transaction chậm ở phía dưới bên trái màn hình.
![](https://images.viblo.asia/78e47134-d4e4-40a7-9472-925ad74b714a.png)



3. Tiếp theo ta click vào transaction được cho là nguyên nhân của alert lần này. Khi chọn transaction đó transaction page sẽ được hiển thị. 

Ở đây ta sẽ kiểm tra xem có xử lí nào bị chậm trên bảng hiển thị theo thời gian không? ta cũng kiểm tra xem xử lí nào chiếm nhiều thời gian nhất. Bằng việc này ta có thể biết được transaction mất nhiều thời gian ở đâu, ở xử lí nào (ở DB, gọi ở hệ thống ngoài hay ở code...)

![](https://images.viblo.asia/8718403f-e74b-47a1-b290-d3b0efaad3d5.png)

4. Ở xử lí này ta có thể thấy thời gian gọi hệ thống ngoài và thời gian xử lí code gần như tương đương nhau, bằng cách cả thiện vấn đề này ta có thể kì vọng sẽ tăng được performance. 

5. Trường hợp muốn kiểm tra chi tiết hơn thì khi scroll page xuống phía dưới sẽ có hiển thị transaction trace (có trường hợp không có)

Transaction trace là transaction riêng biệt ở 1 thời điểm nhất định, và là transaction chậm nhất. Trung bình là 1.190ms nhưng ở đây các transaction đều mất tới khoảng 4s. Trước tiên ta sẽ click vào transaction trace ở phía trên cùng.
![](https://images.viblo.asia/8e28310d-a0c8-482f-ab16-ec2d80e28640.png)


6. Summary tag của transaction này sẽ được hiển thị, trước tiên là chi tiết về xử lí của transaction này, sau đó là những thuộc tính request (như user agent...)
![](https://images.viblo.asia/fd70174e-9364-49e4-bdf2-33ca3a30f153.png)
Phần quan trọng là trace details ở bên cạnh, ta sẽ click vào đây.


7. Ở đây ta có thể kiểm tra được thông tin chi tiết performance của từng xử lí, xem chúng mất bao nhiêu giây theo thứ tự các xử lí.
![](https://images.viblo.asia/a24f159d-e096-4464-975e-7089f4c85fe5.png)

Phần quan trọng nhất ở đây là phần đóng khung màu đỏ. Ta có thể phán đoán được đây là phần xử lí tốn nhiều thời gian nhất.

Do vậy trước tiên cần chú ý vào mục này, thấy rằng xử lí này tốn tới 3550 ms, là 87% tổng thể thời gian. Như trong chi tiết xử lí, ta biết được đây là xử lí gọi từ hệ thống ngoài. Vì vậy chỗ này đặc biệt khó để cải thiện, có thể liên lạc nhờ hệ thống ngoài cải thiện?

Nếu đây là hệ thống ta quản lí thì có thể lấy đây là bằng chứng để báo cáo với team chịu trách nhiệm phần này.

Ngoài ra như chúng ta thấy thì không còn vấn đề đặc biệt nào khác. Từ ví dụ này ta có thể thấy được cách sử dụng New Relic để điều tra chi tiết khi có vấn đề xảy ra.

Ngoài ra thì thường các xử lí DB cũng hay có vấn đề. Theo điều tra của New Relic thì transaction chậm là do 25% nguyên nhân từ xử lí DB. 

Nếu biết được transaction chậm là do xử lí DB thì phía bên phải của transaction trace sẽ hiển thị icon DB, click vào đây ta sẽ thấy được SQL đang được sử dụng. 

Hơn nữa phía dưới còn có Explain Plan và stack trace nên có thể trở thành gợi ý đầy đủ cho việc cải thiện SQL.

![](https://images.viblo.asia/31e46f28-ec39-4ce7-9883-345af5f5a747.png)

Nếu ta click vào tab "Database queries" thì sẽ thấy được list các query được gọi đến ở transaction này, click vào icon DB ở transaction chậm sẽ thấy được Expalin Plan.
![](https://images.viblo.asia/235d0408-059b-4e08-bdda-1a5f927b7645.png)

# Phương châm cải thiện performance: cơ bản là cải thiện từ các transaction thường xuyên chậm

Trên blog New Relic có bài viết "The Right Way to Use Slow Transaction Traces" chỉ ra rằng khi cải thiện performance thì không phải là nên chú ý vào những transaction chậm nhất mà là những transaction thường xuyên chậm. 

Do các transaction chậm nhất thường là các trường hợp ngoại lệ đặc biệt nên dù có cải thiện thì cũng chỉ ảnh hưởng đến khoảng 1% user, vậy thì trước tiên nên cải thiện các transaction thường xuyên chậm thì sẽ có hiệu quả lớn hơn.