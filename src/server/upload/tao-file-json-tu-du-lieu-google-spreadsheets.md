![](https://images.viblo.asia/6ef70478-7ab8-4f28-8a77-bb394453676a.png)

Chào các bạn!

Đợt này mình có làm một dự án cần sử dụng tới dữ liệu người dùng trên các file google spreadsheets, tất nhiên là việc truy cập trực tiếp từ ứng dụng vào file spreadsheets sẽ bị google giới hạn!

Mình tính tìm xem có cách nào lấy ra file Json từ file spreadsheets không, thì có một số ứng dụng bên thứ 3 yêu cầu trả phí.

Chính vì vậy mình đã tìm cách để tự tạo ra file có định dạng Json từ dữ liệu của spreadsheets, nhằm đưa nó vào ứng dụng sử dụng một cách dễ dàng hơn.

Bài viết hôm nay mình sẽ chia sẻ với các bạn các bước để thực hiện việc đó nhé!

### Bước 1: Chuẩn bị dữ liệu.

![](https://images.viblo.asia/00b0dfae-ae09-4b03-9517-f8df1ca4b6f4.JPG)

### Bước 2: Tạo một script liên kết với file dữ liệu đó.

![](https://images.viblo.asia/947461bd-df4e-48e8-8156-35950e6a15a9.JPG)

- Đặt tên cho script đó.

![](https://images.viblo.asia/eddc185e-96c2-4c12-9a81-8e1d077fed37.JPG)

### Bước 3: Lấy ra file spreadsheets đang được active.

![](https://images.viblo.asia/bf7df63f-8579-4c82-8b89-f87c90199ad7.JPG)

### Bước 4: Đọc nội dung của sheet nằm trong spreadsheets đang được active.

![](https://images.viblo.asia/476c785d-1485-433b-86f0-1d2553fc2bfc.JPG)

### Bước 5: Lưu nội dung đọc được vào biến string theo định dạng json.

![](https://images.viblo.asia/eba63a22-ebdd-4d39-9409-f22602d43ee9.JPG)

### Bước 6: Lưu toàn bộ nội dung của string đó vào file và lưu xuống google drive.

![](https://images.viblo.asia/77dd3127-3a63-4971-bf29-3cc2c59f2666.JPG)

### Bước 7: Thêm Macro của script vừa tạo vào menu google spreadsheets.

![](https://images.viblo.asia/07bfe3d6-7309-49ff-a34e-f1b7fd93f6d5.JPG)

![](https://images.viblo.asia/acc19948-f692-45ea-b12e-517d38e54266.JPG)

### Bước 8: Chạy thử và Cấp quyền truy cập google drive cho lần đầu.

![](https://images.viblo.asia/8d874b8d-b21f-4a55-82d6-278d95a22e83.JPG)

![](https://images.viblo.asia/970e1dd5-61c1-4a73-ac6c-6b2de6d5f7fa.JPG)

![](https://images.viblo.asia/23d25c0b-c1aa-4887-ae8f-7b92682f04e7.JPG)

![](https://images.viblo.asia/aa8aaed0-d36b-4a16-b394-f5bceec61c80.JPG)

![](https://images.viblo.asia/277e07bd-9d49-494e-ae79-db0c26f67e7b.JPG)

![](https://images.viblo.asia/f26b54e8-bfe4-4307-ad5f-11c0cf7578ef.JPG)

### Bước 9: kết quả.

![](https://images.viblo.asia/062f511d-cbc1-4e8d-a440-f370fa263301.JPG)

![](https://images.viblo.asia/32d5668c-29bf-4150-a9a6-7f87e36738c1.JPG)

Như vậy là mình đã hoàn thành bài hướng dẫn các bạn từng bước để có thể lấy được dữ liệu từ file google spreadsheets ra thành file Json.

Hi vọng các bạn có thể tận dụng được bài viết này phục vụ cho công việc của mình nhé!

Cảm ơn các bạn đã đọc bài! (bow)