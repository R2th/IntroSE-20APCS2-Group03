# Lời nói đầu.
[Nginx - Loadbalancing  - Part 1](https://viblo.asia/p/nginx-loadbalancing-part-1-yMnKMmLmK7P)

[Nginx - Loadbalancing  - Part 2](https://viblo.asia/p/nginx-loadbalancing-part-2-07LKXm1JZV4)

[Loadbalancing - Các vấn đề ảnh hưởng đến performance.](#)

Dạo này mình đang nghiên cứu về loadbalancing cho các website , mình đã có 1 vài bài trình bày về những gì mình hiểu về loadbalacing với nginx (ở những link bên trên ai có hứng thú có thể đọc qua :D ). Tuy nhiên đào sâu vào tìm hiểu mình là thấy có 1 vài vấn đề có liên quan đến performance của hệ thống loadbalacing nên hôm nay mình sẽ trình bày thêm về các vấn đề mình tìm hiểu được. Bài tìm hiểu này dựa trên kiến thức hạn hẹp của mình nên nếu có gì sai hay có vấn đề gì mong các bạn comment để mình biết thêm nhé. Thank you :D

# Nội dung:
![](https://images.viblo.asia/1a9fa9e1-091a-454a-9fb8-febad6b16622.png)

Hình ảnh bên trên là một mô hình của một hệ thống loadbalacing. Về cơ bản thì mọi hệ thống loadbalancing đều có mô hình như thế này.

Như các bạn đã biết (hoặc chưa rõ) , các `loadbalancer` có 2 kiểu phân tải :

- Layer 4: TCP (layer transport - mô hình OSI) ==> Vơi hình thức phân tải này , tất cả các traffic đi vào `loadbalancer` sẽ sẽ được chuyển tiếp đến từng server phân tải và theo các chiến lược đã config trong loadbalacer (round-robin, ip_hash, hash) . Như vậy, các server con cần chứa các nội dung code hoàn toàn giống nhau và đều connect với cùng 1 datatabase

![](https://images.viblo.asia/19bbf5a5-7803-45e4-bf5a-9f5c4693a4c2.png)

- Layer 7: HTTP (layer application - mô hình OSI) ==> Hình thức phân tải này , cho phép cân bằng tải để chuyển tiếp các request tới những server backend tương ứng dựa trên nội dung của request từ người dùng. Như vậy, hiểu đơn giản thì các server con sẽ chứa các phần code khác nhau để xử lý những nội dung khác nhau. Tuy nhiên vẫn cần connect đến 1 database giống nhau.

![](https://images.viblo.asia/ae23d712-a2c5-4138-8da6-9b468aeb85eb.png)

Ok, nhìn một cách tổng quát thì mô hình trên không hề có vấn đề gì, việc phân tải sẽ giúp hệ thống được tăng cường . Tuy nhiên với mô hình mình đã trình bày bên trên mình thì thực sự là nó còn một vài điểm yếu chết người nữa mà chúng ta cần quan tâm để hệ thống vận hành một cách trơn mượt . Đó là : 

## 1, Database.

Nhìn trên mô hình bên trên không khó để bạn nhận ra rằng, tất cả các server con đều cần connect đến 1 database thống nhất để bảo toàn dữ liệu . 

Tuy nhiên , chính việc bảo toàn dữ liệu này lại gây ra nhược điểm chết người. Nếu database của bạn tự nhiên lăn ra chết thì `loadbalacing` sẽ không còn ý nghĩa gì nữa đúng không. 

Khi nghĩ đến vấn đề này mình đã cảm thấy cực kì khó giải quyết và không tìm ra phương hướng. Tuy nhiên, mình lại cảm thấy nó quen quen với bài toán loadbalacing :D . Các website có thể loadbalacing được thì tại sao các database không loadbalacing được. Chỉ cần `loadbalacing` được database thì đó không còn là vấn đề nữa.

Tuy nhiên, đến đây mình lại gặp 1 vấn đề lớn nữa, nếu sử dụng `loadbalacing` cho database thì làm thế nào đảm bảo tính thống nhất của dữ liệu. Và thật tuyêt vời chỉ sau một vài đường search cơ bản mình đẫ tìm ra phương án giải quyết vấn đề . Thật tuyệt vời vì Mysql có cơ chế `replication database`.
![](https://images.viblo.asia/83f3b5b2-1a7e-420d-b915-1c0470646c9c.png)

Về `replication database` bạn có thể tìm hiểu nó trên mạng vì có rất nhiều tài liêu liên quàn. Tuy nhiên nói ngắn gọn thì nó là cơ chế backup database tự động của mysql. Chia ra làm Master và Slave . Mỗi khi Master làm gì thì Slave sẽ làm y hệt chinh vì thế đảm bảo tính toàn vẹn của dữ liệu.

Để có thể thực hiện được các kĩ thuật mình nói bên trên các bạn có thể tìm hiểu thêm về những thứ sau :
- HAProxy
- Replication Mysql 

## 2, Loadbalancer.

Cũng giống như database thôi ,  ta đều dùng chung 1  `Loadbalancer` để phân tải cho tất cả các server con thì việc gì sẽ diễn ra nếu 1 ngày đẹp trời nhà cung cấp server  `Loadbalancer` báo chuột cắn server và mọi thứ đều tèo hoặc 1 ngày nào đó site của bạn tăng traffic lên một cách đột ngột và `Loadbalancer` của bạn tèo vì đã bị quá tải .

Cho dù kịch bản nào đi chăng nữa thì mọi việc cũng không phải là điều tốt đẹp cho hệ thống, mọi thứ sẽ công dã tràng khi mà `Loadbalancer` của bạn ra đi.

Đừng lo vì các tiền bối đi trước đã cho chúng ta phương án để giải quyết nỗi lo này.  Đó chính là kĩ thuật [keepalived](https://www.keepalived.org/). Nghe quen quen phải không, tuy nhiên bạn đường hiểu nhầm đây là `keepalived` trong HTTP keep-alive nhé vì nó hoàn toàn khác đấy .

`Keepalived` là một kĩ thuât kiểm tra trạng thái giữa 2 thiết bị bằng cách kết nối với nhau. Với bài toán của chúng ta , hiểu đơn giải thì `Keepalived` sẽ tạo ra 1 vitrual IP , sẽ có 1 serever làm master (Đánh priority cao hơn) và còn lại `Keepalived` sẽ check xem `master` có hẹo hay ko, nếu master hẹo thì chuyển master cho server khác đang avaiable 
![](https://images.viblo.asia/8007e956-9254-4ddf-a1fe-91fbf97e9d1e.png)


Để có thể thực hiện được các kĩ thuật mình nói bên trên các bạn có thể tìm hiểu thêm về những thứ sau :
- HAProxy
- [keepalived](https://www.keepalived.org/).

# Lời kết
Bài viết trên mình tổng kết lại những vấn đề mình tìm ra và các giải pháp có thể sử dụng để giải quyết vấn đề. Tuy nhiên, mình cũng chưa đi vào giải quyết vấn đề một cách cụ thể. Nếu mọi người có hứng thú thì mình sẽ trình bày về từng vấn đề cụ thể . Thank you for reading ! :D