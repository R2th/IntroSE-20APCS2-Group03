# Sơ lược về Faceplus
**Từ xưa đến nay cúp học luôn là tình trạng phổ biến ở các tầng lớp sinh viên, để ngăn chặn tình trạng cúp học, điểm danh hộ thì rất nhiều trường đại học đã áp dụng công nghệ vào việc điểm danh tại giảng đường. Mới đây tại UET (Đại học công nghệ – ĐH Quốc Gia Hà Nội) triển khai thử nghiệm điểm danh bằng công nghệ nhận diện khuôn mặt (thông qua app Faceplus hỗ trợ cả nền tảng IOS và Android). Ở bài viết này mình chia sẻ về quá trình mình tìm ra lỗ hổng bảo mật của Faceplus – hệ thống điểm danh tại UET.**

Ngay khi được triển khai thì app đã thu hút được rất nhiều bài viết thể hiện sự quan tâm tới từ cộng đồng VNUer, trong đó có rất nhiều bình luận ở những bài viết này khá thú vị =))

![](https://images.viblo.asia/1610af09-44c4-4380-bd2d-96b428037d7e.jpg)

Ảnh được mình lấy từ một bài viết trên VNU troll trong này còn rất nhiều comment thú vị khác. Các bạn có thể xem [tại đây](https://www.facebook.com/VNUTroll/photos/a.768759973172223/2084188924962648)

Qua tìm hiểu thì được biết khi điểm danh app sẽ yêu cầu sử dụng quyền Bluetooth (dùng để xác định vị trí phòng học bằng Beacon) và Internet (tất nhiên rồi). Cuối cùng cơ duyên cũng đến, chúng mình được dùng thử app Faceplus vào tiết mạng máy tính. Vì là tiết của thầy Hồ Đắc Phương nên mình không cúp học nhé =))

Tiết đó không được dùng laptop nên mình dùng app điểm danh bình thường và xem chúng bạn thử chụp ảnh thay vì chụp người thật thì thường sẽ bị báo có gian lận. Nhưng có điểm danh thành công thì cách này cũng tiềm tàng nhiều mối nguy vì khi điểm danh thành công thì ảnh ở lần điểm danh đó được lưu lại (Cái này mình biết được là do xem trên máy chiếu kết quả điểm danh ở máy thầy. Nên hoàn toàn có thể thầy lướt qua và phát hiện sẽ cấm thi). Timeline: 19/04/2019

# Có thể hack được hệ thống điểm danh của trường để ở nhà mà điểm danh hay không?
Vì tò mò nên mình quyết định đi học buổi chiểu để capture request điểm danh xem thử chứ không cúp học như các bạn khác :grinning::grinning: (Vì nếu không quét được Beacon nào thì app không cho gửi request điểm danh). Đến lớp, mở app lên và thử capture request gửi đi từ app (Mình dùng [Fiddler](https://www.telerik.com/blogs/how-to-capture-ios-traffic-with-fiddler.) để [capture request](https://www.telerik.com/blogs/how-to-capture-ios-traffic-with-fiddler.))

Một POST request được gửi đến http://112.137.129.110/api/enrollment, thử truy cập vào địa chỉ này thì mình phát hiện debug mode vẫn được bật, mình kiểm tra thấy database đang disable remote access nên mình không khai thác được gì.

![](https://images.viblo.asia/0760d295-10c7-4218-9998-06b053c59e8b.jpg)


Trở về lại với request mình vừa gửi đi:
![](https://images.viblo.asia/ce9b80c2-aaca-49fe-9b2b-d67f424635a5.jpg)
Cùng phân tích request này:
* face_img_scr:  cái này mình đoán là ảnh sau khi được convert sang base64. Sau khi thử convert ngược lại thì đúng thật. Mình cũng thử thay face_img_scr thành chuỗi base64 từ một ảnh khác chụp sẵn thì cũng điểm danh được.
* locationCode: chứa một đoạn mã có độ dài 32 ký tự mình đoán là mỗi phòng học thì có locationCode khác nhau. Vì mình có gửi lại yêu cầu điểm danh lại vài lần nhưng mã này không đổi.

***Kết luận:*** Hoàn toàn có thể gửi request để điểm danh mà không cần tới lớp (chỉ cần có location code – có thể được lưu từ trước hoặc nhờ một bạn ở lớp cung cấp, thay đổi face_img_scr bằng cách convert ảnh thành base64).

Để tiện cho việc **test** thì mình code tạm một trang để điểm danh.

![](https://images.viblo.asia/05c654ff-7de1-4a75-923c-234447d9f612.jpg)

Không biết test nhiều lần quá bị phát hiện hay sao mà vài hôm sau mình thấy response trả về khi điểm danh bắt cập nhật ứng dụng để điểm danh. Check appstore thì thấy app được cập nhật lên v1.1, thế là cách của mình bị fix. Không nản chí mình tiếp tục ngâm cứu v1.0.1.

# Cần cù thì bù siêng năng

## Tìm hiểu vấn đề
Lại thử capture request bằng Fiddler khi điểm danh bằng v1.0.1 thì thấy có thêm một trường xuất hiện ở request điểm danh đến địa chỉ https://diemdanh.uet.vnu.edu.vn/api/enrollment là createdDate (có lẽ để check thời gian điểm danh), các trường khác có vẻ không có thay đổi.

![](https://images.viblo.asia/b12648b7-5c90-4823-baf1-8c71dd7667a8.jpg)

Để kiểm tra cho chắc chắn thì mình bật chế độ Automatic BreakPoints Before Request để thử thay đổi trường face_img_src thành ảnh mình chuẩn bị sẵn và convert sang base64. Response mà server trả về như sau:

![](https://images.viblo.asia/e35cbb54-f114-42d1-89e7-401798484af3.jpg)

Vậy là face_img_src đã được thay đổi, không còn là ảnh được convert sang base64 nữa. Nhưng mà ông bà ta dạy rồi "có chí thì nên", thầy mình cũng dạy "cần cù thì bù siêng năng" nên mình đi bước nữa.

Thử tải apk của app về và dịch ngược xem sao. Để dịch ngược thì mình dùng JADX (các bạn có thể tìm hiểu cách sử dụng [tại đây](https://github.com/skylot/jadx))

Sau khi dịch ngược được apk thì mình quan tâm tới method checkin của class MainActivity trong package vn.facenet.faceplus.uet

![](https://images.viblo.asia/9a90f46e-9e54-4654-86a6-cde3b24b4edc.jpg)

Phần mình quan tâm nằm ở 1176->1194. Cụ thể đoạn code này thực hiện các công việc sau:

1. Tạo byte array và thêm lần lượt ngày tháng + ảnh + location code (bytes) vào array, đem hash md5 và trả về digest (bytes).

![](https://images.viblo.asia/a41f88ee-d31b-453f-8e78-aced527a903f.jpg)


2. Tiếp tục tạo byte array với ảnh + digest rồi convert sang base64 (convertToBase64), sau đó gọi phương thức enrollment() để gửi request điểm danh với sb4 là enroll url, location_code là location code phòng học, format là ngày tháng.

![](https://images.viblo.asia/fb06e586-9fda-43bb-8177-40e9adfe5632.jpg)

Mình đoán digest ở đây có thể dùng làm checksum. Server side có thể tính lại checksum bằng cách sử dụng thời gian phía server + location_code + (face_img_src.length – 16) bytes đầu của face_img_src và so sánh 16 bytes cuối cùng của face_img_src để kiểm tra request có hợp lệ hay không.

## Giải quyết vấn đề
Bây giờ chỉ cần thay đổi phần xử lí ở code cũ của mình để tạo dữ liệu như cách mà app Faceplus làm:

![](https://images.viblo.asia/9614f994-07ca-4280-8090-368890ae194c.jpg)

Sau đó gửi request với enrollData là được.

# Kết luận
* Không cần dịch ngược app (để tìm hiểu cách build request) vẫn có thể điểm danh được bằng cách thay đổi ngày trên thiết bị, điểm danh, capture request của ngày cần điểm danh rồi lưu request lại, đến ngày cần dùng thì gửi lại request.
* Qua tìm hiểu cơ chế hoạt động hệ thống thì mình còn phát hiện lỗ hổng không thể vá bằng việc cập nhật phần mềm.
* v1.0.1 decompile apk code dễ đọc nên dễ bị hack (đã được thay đổi ở v1.1).


***Sau khi báo cáo lỗ hổng phía trên (v1.0.1) cho Facenet thì app được update lên v1.1(code khó đọc hơn, mã hóa request, tính checksum khó nhằn hơn) nhưng vẫn còn đấy lỗ hổng không thể vá bằng việc cập nhật phần mềm. Mong facenet sớm tìm ra phương pháp giải quyết :3.Cảm ơn mọi người đã dành thời gian đọc bài viết của mình, vì không có kiến thức chuyên sâu nên có thể có nhiều sai sót, mong mọi người bỏ qua và để lại comment bên dưới để mình rút kinh nghiệm nhé!***