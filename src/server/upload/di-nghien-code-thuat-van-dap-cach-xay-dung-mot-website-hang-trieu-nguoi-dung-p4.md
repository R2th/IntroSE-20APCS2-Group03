Link bài trước tại [đây](https://viblo.asia/p/di-nghien-code-thuat-van-dap-cach-xay-dung-mot-website-hang-trieu-nguoi-dung-p3-bJzKmArBK9N)
Đĩ: Anh nghiện ơi, đã lâu không gặp dạo này anh đi đâu đấy?

Nghiện: Mưa to ngập quá tao lên núi trồng cây, làm người nông dân chuyên cần.

Đĩ: Hệ thống của em ngày càng to, có hệ thống đặt đào sân golf, hệ thống đặt đào du thuyền, hệ thống quản lý tour rồi đủ thứ khác, còn kết nối với nhiều bên khác nữa cơ.

Nghiện: Sang đây khoe đấy à, chúc mừng em nhé, anh thì vẫn mãi mãi với sự nghiệp nông dân, mang lại tiếng cười cho mọi người thôi

Đĩ: Nhưng em gặp vấn đề lớn, các hệ thống của em cần chuyển dữ liệu qua cho nhau, em đang dùng API nhưng như thế có thể gây chậm performance do gọi API nhiều, hơn nữa còn vấn đề hiệu năng khi gọi API đợi lâu ảnh hưởng tới trải nghiệm người dùng.

Nghiện:  Chỗ này em cần tới message broker thay vì gọi qua API

Đĩ: Message broker là gì hả anh

Nghiện: Nó giống cái queue mà ngày xưa được học trong cấu trúc dữ liệu ấy, First in First out. Các message (thông tin cần gửi qua các ứng dụng)  được gửi vào queue, rồi các ứng dụng đọc dữ liệu trong đó xử lý. Cái này chạy bất đồng bộ, bên gửi chỉ cần gửi vào Queue là xong hết request nên nhanh, bên nhận thì đọc ra rồi xử lý thôi.

![](https://images.viblo.asia/246bfa4a-4a8c-46ee-a38d-0533f73d6142.png)


Đĩ: Chắc hôm đấy em đi khách nên không học, kaka. Nhưng queue như anh thì mỗi ứng dụng gửi đi chỉ có một ứng dụng nhận được thôi à? Em muốn bắn từ một ứng dụng này qua nhiều ứng dụng khác thì làm thế nào được? Hay là em tạo nhiều queue, mỗi thằng nhận một queue.

Nghiện: Thế thêm một ứng dụng mới thì em lại cần thêm một queue nữa, rồi sửa code để bắn thêm à?

Đĩ: Vâng đúng ý em là thế.

Nghiện: Để cho cuộc sống trở nên đơn giản, người ta xây dựng một cơ chế gọi là Pub/Sub

Đĩ: Là kiểu Bar Pub hay là gì anh?

Nghiện: Không phải nó là viết tắt publish và Subscribe em xem hình dưới nhé!

![](https://images.viblo.asia/b8aac539-f159-4e7b-9386-b16138e4d31f.png)

Nghiện: Với cơ chế này ứng dụng gửi đi chỉ cần biết là tao đã gửi message đi, còn thằng nào thích nhận tao k quan tâm, sau này thêm bớt người nhận (subscriber) thì cũng không phải sửa gì hệ thống đang chạy ổn định xịn xò của tao cả. Bên nào muốn nhận thông tin từ một topic thì cứ thế subscrible rồi nhận thôi.

Đĩ: OK em hiểu rồi, ví dụ em có đào mới, em chỉ cần publish báo là em có đào mới, còn bên sân goft, du thuyền... tự subscrible rồi đưa em đào vào vào hệ thống của các app đó đúng không?

Nghiện: Code nhiều thông minh phết.

Đĩ: Em hỏi chút, đôi khi hệ thống của em cần toàn vẹn dữ liệu vào đảm bảo đúng thứ tự, làm sao để đảm bảo điều này? Nhỡ hệ thống pub/sub chết thì message của em mất hết à?

Nghiện: Để tránh mất hết theo em nên làm thế nào?

Đĩ: Em nghĩ là lưu nó lại, sau này nó sống mình lại bắn lại.

Nghiện: Đúng rồi đấy, để tránh trường hợp này người ta dùng một pattern gọi là Outbox, Inbox patterns. Dữ liệu sẽ được lưu ở DB trước rồi đẩy vào Queue sau bằng một worker

![](https://images.viblo.asia/b97809a8-b43e-4b41-a9cd-014968cbba20.png)

Nghiện: Khi đọc dữ liệu outbox ra đảm bảo truyền đúng thứ tự, nếu queue bị lỗi thì dữ liệu vẫn còn ở outbox nên không sao cả, lúc gửi lên Queue thành công thì đổi trạng thái trên outbox là xong.

Đĩ: Quá tuyệt vời anh. Nhưng em có câu hỏi nữa, khi em nhận được message xử lý rồi nhưng bị lỗi chả hạn, sau đấy em lấy lại message đó lần nữa có sao không anh?

Nghiện: Còn tùy xem message của em có idempotent (không thay đổi giá trị dù thực hiện lại nhiều lần) không nhé, nếu có thì chả sao.

Đĩ: Nếu không thì sao?

Nghiện: Thì tùy nghiệp vụ mà xử lý phức tạp hay đơn giản, ví dụ lưu được bước cuối thành công ở đâu rồi rồi thực hiện tiếp hoặc kệ nó xử lý tay. Cần monitor được các trường hợp này.

Đĩ: Em hỏi nốt câu nhé, khách gọi rồi, nếu worker chết thì sao? Có cách gì dự phòng không anh?

Nghiện: Thì để mấy con worker dự phòng, con chính chết thì cho con nhỏ thay, cơ chế đó gọi là leader election, nghĩa là chỉ thằng leader được chạy còn các thằng khác đợi thôi, khi nào leader down thì bầu thằng khác làm leader chạy tiếp

Đĩ: OK em tương đối hiểu rồi kiểu em là tiếp viên chính, chuyên khác VIP khi nào em ốm mệt thì cho con khác lên thay em. Thôi anh trồng trọt tiếp đi em về đi khách đây. Làm Leader mệt lắm chứ đùa. Cơ chế chọn leader anh bảo em buổi sau nhé!

Nghiện: OK. Bye.

Một số khái niệm cần lưu ý: Message broker, pubsub, queue, inbox outbox pattern, leader election

Link bài [sau](https://viblo.asia/p/di-nghien-code-thuat-van-dap-cach-xay-dung-mot-website-hang-trieu-nguoi-dung-p5-leader-election-vyDZOv8RKwj)