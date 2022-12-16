## Giới thiệu
Docker là một phần mềm nguồn mở được thiết kế để hỗ trợ và đơn giản hóa việc phát triển ứng dụng. Nó là một tập hợp các platform-as-a-service products tạo ra các virtualized environments cô lập để building, deploy , và testing các ứng dụng.

Mặc dù Docker tương đối dễ để tiếp cận, nhưng có một số thuật ngữ dành riêng cho Docker mà người dùng cần tìm hiểu. Dockerfiles, images, containers, volumes và một vài thuật ngữ khác sẽ cần phải được làm rõ và trở nên thành thạo theo thời gian.

Một trong những câu hỏi mà nhiều người đặt ra là:

**Sự khác nhau giữa Docker image và Container?**

Trong phần này mình sẽ giải thích về sự khác nhau và mối liên hệ giữa chúng.

![](https://images.viblo.asia/90a21c90-7372-4d54-9d01-b56c9a092056.png)

## Docker image là gì?
Docker image là một file bất biến - không thay đổi, chứa các source code, libraries, dependencies, tools và các files khác cần thiết cho một ứng dụng để chạy.

Do tính chất read-only của chúng, những images này đôi khi được gọi là snapshots. Chúng đại diện cho một application và virtual environment của nó tại một thời điểm cụ thể. Tính nhất quán này là một trong những tính năng tuyệt vời của Docker. Nó cho phép các developers test và thử nghiệm phần mềm trong điều kiện ổn định, thống nhất.

Vì theo một cách nào đó, images chỉ là các mẫu, bạn không thể start hoặc run chúng. Những gì bạn có thể làm là sử dụng mẫu đó làm cơ sở để xây dựng một container. Một container cuối cùng chỉ là một image đang chạy. Khi bạn tạo một container, nó sẽ thêm một lớp có thể ghi lên trên image bất biến, nghĩa là bây giờ bạn có thể sửa đổi nó.

Image mà ở đó bạn tạo một container tồn tại riêng biệt và không thể thay đổi. Khi bạn chạy một môi trường containerized, về cơ bản, bạn tạo một bản sao đọc-ghi của image bên trong container. Lúc này nó sẽ thêm một Container Layer cho phép sửa đổi toàn bộ bản sao của image.

![](https://images.viblo.asia/2e80a8b1-522a-4690-9424-28b8a5f0b53f.png)

Bạn có thể tạo số lượng Docker image không giới hạn từ một image base. Mỗi khi bạn thay đổi trạng thái ban đầu của một image và lưu trạng thái hiện có, bạn tạo một image mới với một layer mới ở trên nó.

Do đó, Docker image có thể bao gồm một loạt các layer, mỗi layer khác nhau nhưng cũng có nguồn gốc từ layer trước. Các image layer đại diện cho các readonly-file mà chứa thêm các container layer mỗi khi bạn sử dụng nó để khởi động một virtual environment.

## Docker Container là gì?
Docker container là một run-time environment mà ở đó người dùng có thể chạy một ứng dụng độc lập. Những container này rất gọn nhẹ và cho phép bạn chạy ứng dụng trong đó rất nhanh chóng và dễ dàng.

Một tính năng quan trọng của container là tính chuẩn xác cho việc chạy các ứng dụng trong container. Không chỉ đảm bảo cho ứng dụng hoạt động như nhau trong các môi trường giống nhau, nó còn làm đơn giản việc cài đặt và chia sẻ cài đặt này cho các thành viên trong team.

Vì container hoạt động độc lập, nó đảm bảo không làm ảnh hưởng xấu đến các container khác, cũng như server mà nó đang chạy trong đó. Docker được cho là "tạo ra sự độc lập tuyệt vời". Vì vậy, bạn sẽ không cần lo lắng việc máy tính của bạn bị xung đột do ứng dụng đang được phát triển được chạy trong container.

Không giống như máy ao (VM) nơi mà sự ảo hóa (virtualization) xảy ra ở tầng phần cứng (hardware level), container chỉ ảo hóa ở lớp ứng dụng (app level). Nó có thể dùng 1 máy, chia sẻ kernel và giả môi trường để chạy process độc lập. Điều này làm cho container cực kì nhẹ, không chiếm nhiều tài nguyên của máy.

![](https://images.viblo.asia/824f7ecc-9120-448a-ab30-e6b58d2084e4.png)

## Docker image và container

Khi thảo luận về sự khác nhau giữa image và container, nó không đúng khi cho răng nó là 2 thực thể đối lập. Cả 2 khá giống nhau và là 1 phần của system được đưa ra bởi Docker platform.
Nếu bạn đã đọc 2 section phía trước định nghĩa về image và container, bạn chắc chắn đã có những hiểu biết nhất định về cách chúng tạo ra mối liên hệ.

Image có thể tồn tại mà không cần container, trong khi container chạy thì cần có image đã tồn tại. Vì vậy, container phụ thuộc vào image và sử dụng nó để tạo ra run-time environment và chạy ứng dụng trên đó.

Cả image và container đều là thành phần quan trọng để tạo ra 1 running container. Docker image là cực kì quan trọng để chi phối và định hình 1 Docker container.

## Từ Docker file đến Image đến Container
Tất cả bất đầu từ 1 script gồm các instruction mà định nghĩa cách để tạo ra 1 Docker image. Đoạn script này được gọi là Docker file. File này chạy 1 loạt các command và tạo ra 1 Docker image. 
Câu lệnh để tạo ra 1 image từ Dockerfile là `docker build`

Image sau đó được sử dụng như 1 template (base), được các developer copy và sử dụng để chạy ứng dụng. Ứng dụng cần 1 môi trường độc lập để chạy container.
Môi trường này không chỉ là 1 virtual "space". Nó hoàn toàn dựa trên image tạo ra nó. Source code, files, dependencies, và binary libraries, tất cả đều được chứa trong Docker image, cái mà tạo nên container.

Để tạo ra 1 container từ 1 image, sử dụng lệnh `docker create`

Cuối cùng, sau khi bạn chạy container từ 1 image, bạn start các services trong container đó và chạy ứng dụng của bạn.

![](https://images.viblo.asia/af72cb13-530a-4550-8785-4810281d3c2b.png)



### Tạo 1 docker image từ 1 container

Nếu bạn thay đổi 1 vài thứ từ image gốc và muốn giữ sự thay đổi đó cho tương lai, bạn có thể lưu cái image đã được modify này bằng cách tạo ra 1 screenshot cho trạng thái hiện tại của container. Bằng cách đó bạn attach container layer mới trên image gốc, cuối cùng tạo ra 1 image mới (đương nhiên là immutable). Kết quả là bạn có 2 Docker image mà đều kế thừa từ chung các filesystem.

# Kết bài 
Một khi bạn đã hiểu được cách 1 container được tạo ra, bạn sẽ dễ dàng nhận thấy được sự khác nhau của image và container. Hi vọng sau khi đọc xong bài viết, bạn có thể hiểu được Docker image là gì, Docker container là gì, và cách nó liên quan lẫn nhau. Bài viết được mình tham khảo từ [Docker Image Vs Container: The Major Differences](https://phoenixnap.com/kb/docker-image-vs-container) của Sofija Simic.

Happy learning!