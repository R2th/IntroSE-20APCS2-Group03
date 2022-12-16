AWS là một dịch vụ cho phép các bạn pay-as-you-go, có nghĩa là dùng bao nhiêu trả bấy nhiêu. Thế nên với những server bắt đầu với mức chi phí thấp, có thể đến một lúc sẽ phát sinh nhu cầu tăng cường. Bộ nhớ lưu trữ cũng là một trong những thứ thường xuyên phải mở rộng. Hôm nay mình sẽ hướng dẫn các bạn tăng kích thước volume cho Instance EC2 mà không làm mất dữ liệu của Instance đó, đồng thời cũng là cách đơn giản nhất.
## Prerequisite
1. Một Instance EC2 chạy Linux
2. Các bạn đã vào phần EC2 trong AWS Console
## Cách thực hiện
### Tạo snapshot 
1. Đầu tiên các bạn tạo snapshot của Instance đang chạy bằng cách vào `Volume` của side menu bên trái Console -> Chuột phải vào Volume của Instance các bạn muốn tăng dung lượng bấm `Create Snapshot`. 
![](https://images.viblo.asia/6a27b558-49bc-493e-93d9-ba10fac0f1f7.png)
2. Tiếp theo nhập các thông tin của Snapshot mới -> Sau đó bấm `Create Snapshot`
![](https://images.viblo.asia/ce81ea7f-074e-4512-8b8b-72e2ddcab3ec.png)
3. Đợi 1 lúc và bạn có thể tìm thấy Snapshot mới tạo sẽ nằm ở trong mục `Snapshots` ở side menu
### Tạo volume mới
Tiếp theo chúng ta sẽ tạo Volume mới từ Snapshots đã có bằng cách
1. Vào `Snapshots` từ side menu -> Chuột phải vào Snapshot vừa tạo -> Bấm `Create Volume`
![](https://images.viblo.asia/c08b1015-fe30-4cd4-b3d5-865f9e5df151.png)
2. Nhập các thông tin mong muốn cho Volume mới. 
/* Chú ý là Availability Zone phải giống với Availability Zone của Instance hiện tại
![](https://images.viblo.asia/fcdd9f48-af42-4ab3-ab5d-4e80c0a6b6c4.png)
3. Bấm `Create Volume`. Volume mới này sẽ có dữ liệu giống hệt với Volume cũ lúc tạo Snapshot.
### Attach Volume mới tạo vào Instance
Sau đó chúng ta sẽ phải dừng Instance hiện tại lại để tiến hành tráo đổi Volume mới và Volume cũ
1. Stop Instance đang chạy
2. Vào `Volumes` từ side menu click chuột phải vào Volume hiện tại đang attach với Instance -> Chọn `Detach` -> Bấm `Yes, detach`
![](https://images.viblo.asia/f0a16300-748c-4c48-b901-a5be9474104f.png)
3. Attach Volume mới vào Instance bằng cách chuột vào Volume mới tạo -> Chọn `Attach` -> Điền đúng thông tin của Instance đang chạy vào ô `Instance` , ở ô `Device`  điền  `/dev/sda` -> Bấm `Attach`
![](https://images.viblo.asia/f6d03494-e9f8-454b-9768-7847307221c5.png)
### Khởi động Instance
Bạn đã hoàn thành đổi dung lượng cho Instance mà không làm mất dữ liệu. Tiếp theo hãy khởi động Instance lên và tận hưởng thành quả.
## Lời kết
Vừa rồi mình đã trình bày 1 cách đơn giản nhất để mở rộng dung lượng lưu trữ của một Instance mà không làm mất dữ liệu của Instance đó. Hy vọng sẽ được trình bày với các bạn những cách khác ở các bài viết sau này. Cảm ơn các bạn