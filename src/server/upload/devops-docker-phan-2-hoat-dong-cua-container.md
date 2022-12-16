# Đây là phần 2 mình sẽ nói về hoạt động của các Container
## I. Container là gì?
Container có thể hiểu đơn là một vùng nhớ riêng biệt được tạo ra để phục vụ cho một hoặc nhiều ứng dụng chạy trên nó.

Container có thể được tạo ra từ image có sẵn trên máy 
![image.png](https://images.viblo.asia/4fe4ad7e-9361-46f8-b796-a59071ba0a42.png)

Nếu trong trường hợp image không tồn tại trên máy, nó sẽ tự động tìm kiếm trên docker hub image đó để cài đặt.
![image.png](https://images.viblo.asia/3b556a51-545e-4c2e-8d79-a7a316da5ccb.png)


## II. Các thao tác với container
### 2.1. Tạo và bắt đầu một container
`docker run -ti ubuntu:latest bash`
![image.png](https://images.viblo.asia/a8df5763-8147-416f-b500-71eded06ea1a.png)

Lệnh sử dụng hai cờ trên lệnh run: *--interactive (hoặc -i)* và *--tty (hoặc -t)*. Đầu tiên, tùy chọn --interactive yêu cầu Docker giữ luồng đầu vào tiêu chuẩn (stdin) mở cho vùng chứa ngay cả khi không có thiết bị đầu cuối nào được gắn vào. Thứ hai, tùy chọn --tty yêu cầu Docker phân bổ một thiết bị đầu cuối ảo cho vùng chứa, điều này sẽ cho phép bạn chuyển các tín hiệu đến vùng chứa. Đây thường là những gì bạn muốn từ một chương trình dòng lệnh tương tác. Bạn thường sẽ sử dụng cả hai điều này khi đang chạy một chương trình tương tác, chẳng hạn như một trình bao trong một vùng chứa tương tác.

Bạn có thể chạy ứng dụng khác bằng cách thay thế tên image **ubuntu** và version của image **latest** mà bạn muốn. Nếu không chọn version image thì giá trị mặc định sẽ là latest.

`docker run -ti --rm ubuntu:latest bash`\
Lệnh thêm cờ *--rm* để tự động xóa container này khi thoát container.

`docker run -ti ubuntu:latest bash -c "echo da chay xong"`
![image.png](https://images.viblo.asia/0b1f9762-d354-47e0-a385-8a2c8c8de7ef.png)\
Lệnh thêm cờ *-c* để chạy một hoặc nhiều mệnh lệnh trong " ".

`docker run -ti -d ubuntu:latest bash`
![image.png](https://images.viblo.asia/d97fca49-76b7-4158-8863-dd317eba79ff.png)

Lệnh thêm cờ *-d hoặc --detach* để cho phép container này chạy nền. Và bạn có thể sử dụng 12 mã ký tự đầu để thực hiện kết nối vào container đó với lệnh attach.

`docker run -ti -d --name demo ubuntu:latest bash`
![image.png](https://images.viblo.asia/3457a4ba-8fa4-4164-8604-e96f2ba29947.png)

Lệnh thêm cờ *--name* để tạo tên container.

### 2.2. Liệt kê các container đang chạy trên hệ thống
Với một container sẽ có 6 trạng thái sau đây:
![image.png](https://images.viblo.asia/31339e31-9142-4190-98dc-33779b1eed59.png)
Khi container đang chạy chúng ta có thể kiểm tra các trạng thái của container đó bằng 1 trong 3 lệnh sau:\
`docker ps`
![image.png](https://images.viblo.asia/5c024e59-e925-4a31-a9ea-8312b4f9c3d3.png)
* CONTAINER ID: ID ngẫu nhiên sinh ra và cần sử dụng khi muốn kết nối lại trong lệnh attach. ID này sẽ khác với ID của image ban đầu
* IMAGE: tên image gốc và version image khởi tạo
* COMMAND: lệnh đang chạy với container này
* CREATED: thời gian tạo container
* STATUS: trạng thái container 
* PORT: cổng kết nối tới container
* NAMES: tên định danh container. Sử dụng trong các lệnh docker inspect, docker logs,...

`docker inspect competent_spence`
![image.png](https://images.viblo.asia/fa57057d-11dc-41c8-91f0-aca310c275cb.png)\
Lệnh này show toàn bộ file cấu hình của container **competent_spence** bao gồm cả trạng thái. Bạn hoàn toàn có thể thay thế tên container competent_spence bằng tên container của bạn. Trong các lệnh phía dưới cũng tương tự như vậy.

`docker inspect --format "{{.State.Running}}" competent_spence`
![image.png](https://images.viblo.asia/3e9f0ad7-a508-41d6-81b1-9db533121da1.png)\
Sử dụng thêm cờ *--format* để kiểm tra trạng thái cụ thể của container **competent_spence**. Container đang tồn tại trong trạng thái đó thì màn hình trả về kết quả true và ngược lại là false. Ngoài ra có thể thay trạng thái **Running** bằng các trạng thái khác như **Paused, Exited, Restarting,..**

### 2.3. Xem container logs
`docker logs competent_spence`
![image.png](https://images.viblo.asia/64625b88-50c1-49ec-9d73-c4f432ea34b3.png)\
Terminal bên phải sau khi chạy lệnh show logs thì sẽ hiển thị của giá trị bên trái.

`docker logs -f competent_spence`
![image.png](https://images.viblo.asia/26700304-3304-430a-a4e1-7403852cca85.png)\
Lệnh docker logs có một cờ, --follow hoặc -f, sẽ hiển thị các bản ghi và sau đó tiếp tục xem và cập nhật màn hình với các thay đổi đối với bản ghi khi chúng xảy ra. Khi bạn hoàn tất, nhấn Ctrl-C (hoặc Command-C) để ngắt lệnh nhật ký.
### 2.4. Start, Stop và Restart container
Để thực hiện start, stop và restart một container bạn sử dụng lệnh

```
docker start competent_spence
docker stop competent_spence
docker restart competent_spence
```
Để chạy được các lệnh start, stop và restart thì container phải ở các trạng thái tương ứng. Bạn có thể xem lại ở hình trong mục **2.2.  Liệt kê các container đang chạy trên hệ thống** phía trên.

### 2.5. Kết nối lại một terminal của một container
`docker attach competent_spence`

![image.png](https://images.viblo.asia/9e014ae5-7366-454f-bfa2-071c3d52aac1.png)                                                                                                                                 
Với lệnh attach bạn chỉ có thể kết nối lại các container đang chạy trong danh sách **docker ps**
![image.png](https://images.viblo.asia/f7ecbccb-ac15-43a6-8f5a-e456dcd8009d.png)

### 2.6. Dọn dẹp container
`docker rm competent_spence`
![image.png](https://images.viblo.asia/0b135cf8-9df0-4e4a-8e74-3ce7e0120c51.png)\
Bạn có thể xóa các container không dùng tới.

## III. Một số lệnh hay dùng khác
### 3.1. Commit
Tạo một image từ container để lưu trạng thái thay đổi của container\
`docker commit competent_spence lv1`
![image.png](https://images.viblo.asia/84654252-1f80-4510-a5a3-be830ea7b1b2.png)

Kiểm tra các image trên máy\
`docker images`  
![image.png](https://images.viblo.asia/a2db2653-f4c2-4c35-9f14-68166a7956bd.png)
### 3.2. Create
`docker create -ti ubuntu:latest bash`
![image.png](https://images.viblo.asia/d6755c42-6b63-4912-9183-4d0051006018.png)\
Tạo một container mà trạng thái ban đầu không phải running. Bạn có thể tạo trước và khi nào cần dùng tới sẽ thực hiện start container.
### 3.3. Cp
Copy file hoặc folder từ container tới local machine và ngược lại. Áp dụng được cho cả trạng thái running và stoped.\
`docker cp ebook.txt competent_spence:/root/ebook.txt`
![image.png](https://images.viblo.asia/e87e0a5f-ecb4-47a6-9a9e-25bdfb2cf894.png)
![image.png](https://images.viblo.asia/cb2c7511-21fe-4d3e-8a35-bf97ac7c4a74.png)
### 3.4. Automation restart
Sử dụng cờ *--restart* tại thời điểm tạo container, bạn có thể yêu cầu Docker thực hiện bất kỳ điều nào sau đây:
* Không bao giờ khởi động lại (mặc định) 
* Cố gắng khởi động lại khi phát hiện lỗi 
* Cố gắng khởi động lại trong một khoảng thời gian định trước khi có lỗi
* Luôn khởi động lại vùng chứa bất kể điều kiện nào

Docker không phải lúc nào cũng cố gắng khởi động lại vùng chứa ngay lập tức. Nếu nó xảy ra, điều đó sẽ gây ra nhiều vấn đề hơn là nó đã giải quyết. Hãy tưởng tượng một thùng chứa không làm gì khác ngoài việc in thời gian và thoát ra. Nếu vùng chứa đó được định cấu hình để luôn khởi động lại và Docker luôn khởi động lại nó ngay lập tức, hệ thống sẽ không làm gì khác ngoài việc khởi động lại vùng chứa đó. Thay vào đó, Docker sử dụng chiến lược dự phòng theo cấp số nhân để định thời gian cho các lần thử khởi động lại.

Chiến lược dự phòng xác định khoảng thời gian sẽ trôi qua giữa các lần khởi động lại liên tiếp. Chiến lược dự phòng theo cấp số nhân sẽ làm điều gì đó giống như gấp đôi thời gian trước đó đã dành cho việc chờ đợi cho mỗi lần thử liên tiếp. Ví dụ: nếu lần đầu tiên khởi động lại vùng chứa Docker đợi 1 giây, thì ở lần thử thứ hai, nó sẽ đợi 2 giây, 4 giây ở lần thử thứ ba, 8 giây ở lần thứ tư, v.v. Các chiến lược dự phòng theo cấp số nhân với thời gian chờ ban đầu thấp là một kỹ thuật phục hồi phổ biến. Bạn có thể thấy Docker tự mình sử dụng chiến lược này bằng cách xây dựng một vùng chứa luôn khởi động lại và chỉ cần in thời gian: \
`docker run -d --name backoff-detector --restart always busybox:1.29 date`

Sau đó, sau một vài giây, hãy sử dụng tính năng theo dõi nhật ký để xem nó tắt và khởi động lại: \
`docker logs -f backoff-detector `

Các log sẽ hiển thị tất cả các lần nó đã được khởi động lại và sẽ đợi cho đến lần khởi động lại tiếp theo, in thời gian hiện tại rồi thoát. Thêm cờ đơn này vào hệ thống giám sát và vùng chứa WordPress mà bạn đang làm việc sẽ giải quyết được vấn đề khôi phục. Lý do duy nhất bạn có thể không muốn áp dụng điều này trực tiếp là trong thời gian chờ đợi, vùng chứa không chạy. Các vùng chứa đang chờ khởi động lại đang ở trạng thái khởi động lại. Để chứng minh, hãy thử chạy một quy trình khác trong vùng chứa backoff-detector:\
`docker execute backoff-detector echo Test`

Chỉ cần chạy thử lệnh đó sẽ dẫn đến thông báo lỗi: \
`Container <ID> is restarting, wait until the container is running `
    
Điều đó có nghĩa là bạn không thể thực hiện bất kỳ điều gì yêu cầu vùng chứa ở trạng thái đang chạy, chẳng hạn như thực hiện các lệnh bổ sung trong vùng chứa. Đó có thể là một vấn đề nếu bạn cần chạy các chương trình chẩn đoán trong một thùng chứa bị hỏng. Một chiến lược hoàn chỉnh hơn là sử dụng các bộ chứa khởi động hệ thống init nhẹ.


### 3.5. Exec
Mở nhiều hơn 1 tiến trình kết nối đến container. Tiện lợi cho việc debug và quản lý database nhưng không thể thêm port, volume,...\
`docker exec -ti competent_spence bash`                      
![image.png](https://images.viblo.asia/2e01e698-4311-400e-a828-15f588eb17a6.png)

### 3.6. Rename
`docker rename demo demo_old`
![image.png](https://images.viblo.asia/45ea224e-8609-4ff8-8f03-7e9da2822647.png)\
Đổi tên container.

### 3.7. Giới hạn tài nguyên
`docker run -d --name demo --memory 256m --cpu-shares 1024 ubuntu:latest`

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***