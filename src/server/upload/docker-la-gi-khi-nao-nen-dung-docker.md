![image.png](https://images.viblo.asia/8e2a6a02-fc37-4f5f-b5be-80f76e93edb3.png)

Docker là một trong những requirement xuất hiện liên tục trong những JD tuyển dụng backend developer trong những năm gần đây. Rồi nào là DevOps, rồi SRE, CI/CD đều cần phải biết Docker. Qua bài viết này mình hy vọng sẽ giúp các bạn hiểu được một chút về Docker và lý do tại sao lại cần nó như thế.

## Docker là gì

Docker là một nền tảng mở để phát triển và triển khai ứng dụng dễ dàng hơn bằng cách sử dụng các “container”. Qua đó, Docker giúp các nhà phát triển có thể dễ dàng phân tách được ứng dụng khỏi sự lệ thuộc với hạ tầng (phần cứng máy chủ, mạng, ổ đĩa,…)

Docker hiện tại là mã nguồn mở với Golang là ngôn ngữ chính. Chi tiết tại: https://github.com/docker

![image.png](https://images.viblo.asia/79081a48-5707-4dea-b465-e16bf9209f52.png)

## Khi chưa có Docker

Thay vì cứ đi tìm hiểu Docker thì có lẽ mình sẽ kể các bạn nghe từ khá lâu rồi, khi Docker chưa thịnh hành và phổ biến. Lúc đó, mình còn là sinh viên ngành IT, cứ mỗi một môn là mình sẽ theo chỉ dẫn của các thầy cô cài đặt các phần mềm vào máy tính cá nhân. Có cái phù hợp có cái không phù hợp, thậm chí có cái các bạn phải cài thêm cả OS mới vào, có cái thì lại cần format lại ổ cứng.

Có khá nhiều cách để chúng ta giải quyết chuyện này. Hoặc tạo hẳn phân vùng ổ cứng mới rồi cài OS cần thiết cùng các phần mềm hoặc dùng qua một hệ thống ảo hoá (VMWare hoặc Virtual Box).

Nhưng dù có dùng cách nào thì mình cũng mất rất nhiều thời gian để nghĩ xem là cấp bao nhiêu RAM, số core CPU và ổ cứng. Cấp ít quá thì nó không đủ dùng mà cấp nhiều quá thì lãng phí. Các công cụ ảo hoá giúp mình làm tốt hơn vì có thể dễ dàng cấu hình lại mà không cần cài đặt lại từ đầu. Nhưng nhìn chung thì chúng đều mất thời gian để setup, cấu hình và tinh chỉnh. Ước gì mọi thứ có thể tự động thì tốt quá.

Docker thời đó xuất hiện như một vị thần! Đó là lời giải không thể tuyệt vời hơn.

![image.png](https://images.viblo.asia/de9c1b42-85c3-4263-8b69-44057a25a338.png)

## Docker hoạt động ra sao

Docker nổi tiếng với việc điều hành và quản lý “ảo hoá” các Container. Nhưng thực tế là công nghệ container đã có từ khá lâu, nổi tiếng có LinuX Containers (Docker sử dụng trong giai đoạn đầu). Sau đó Docker đã phát triển và tách hẳn phần lõi container là containerd. Điều khiến Docker phát triển rực rỡ là các thành phần và công cụ hỗ trợ để giúp các nhà phát triển sử dụng Container nhanh chóng, dễ dàng và an toàn hơn.

Nói ngắn gọn thì Container là tất cả những gì cần thiết để một ứng dụng, một service có thể chạy lên được mà chúng không cần phải lo lắng về hệ điều hành (OS), loại ổ đĩa (disk) và những thư viện có liên quan. Khi không còn nhu cầu sử dụng, ta có thể “bứng” cái container đó đi là xong.

![image.png](https://images.viblo.asia/bbcfb748-838a-4171-beb5-96299ee8a3e1.png)

* Docker Engine : là thành phần chính của Docker, đây có thể được xem là một “công xưởng” để hỗ trợ đóng gói và vận hành các ứng dụng thông qua các container.
* Docker Hub : là một cái… hub, chuyên chứa tất cả các images Docker. Các image này được build và đóng gói sẵn bởi rất nhiều nhà phát triển trên thế giới.
* Images: là một khuôn mẫu để chạy lên thành container. Có thể hình dung image như một cái đĩa game, bạn muốn cài đặt thì phải có cái đĩa này, thậm chí chia sẻ cho nhiều máy khác cài đặt nữa.
* Container: image khi run lên sẽ là container, chúng ta có thể có nhiều container chạy cùng lúc từ một image.
* Docker Client: là nơi chúng ta có thể giao tiếp với Docker thông qua các câu lệnh (Docker CLI).
* Docker Daemon: là một service chạy ngầm, tiếp nhận tất cả yêu cầu từ Docker Client để quản lý các đối tượng như Container, Image, Network và Volumes. Các Docker Daemon cũng giao tiếp với nhau để quản lý các Docker Service.
* Dockerfile: là một file bao gồm các chỉ dẫn để build một image.
* Volumes: là cơ chế lưu trữ dữ liệu khi các container vận hành.

Mình sẽ bổ sung thêm các bài viết về các thành phần chi tiết Docker sau nhé. Ở trên chỉ giới thiệu đại khái chức năng của chúng nhé.

## Docker nên dùng khi nào

1. Phát triển các ứng dụng, dịch vụ yêu cầu cài đặt quá nhiều thứ liên quan, hoặc có version không tương thích với máy chủ hiện tại.
2. Khi có nhu cầu scale, mở rộng linh hoạt để đáp ứng nhanh. VD như bật/tắt nhanh các container để hỗ trợ tăng tải cho hệ thống của bạn.
3. Rất phù hợp với Microservices. Mình chắc chắn rằng bạn sẽ không muốn chạy từng service nhỏ lên và cấu hình chúng bằng tay.
4. Tăng tốc, hỗ trợ CI/CD tốt hơn. Vì lúc này automation server chỉ cần quan tâm Docker thay vì lại phải cài đặt đủ thứ vào.
5. Dễ thay đổi, di chuyển hơn vì mọi thứ ở trong container. Bản thân Docker vẫn có version control cho các Image, từ đó dễ dàng up/down version ứng dụng hơn.
6. An toàn hơn vì mỗi container là một môi trường hoàn toàn độc lập với bên ngoài.

## Run thử một container đơn giản

### 1. Cài đặt Docker

Đầu tiên chúng ta cần phải có Docker trong máy tính. Cài đặt Docker thì các bạn xem ở link https://docs.docker.com/engine/install (hãy chọn đúng OS máy của bạn nhé).

Để kiểm tra xem Docker đã được cài và sẵn sàng chưa thì các bạn mở console / terminal và thử lệnh:

`docker -v`

Nếu ổn thì bạn sẽ thấy đại khái là version Docker hiện hành được trả về. Nếu không là bị báo lỗi “command not found”.

### 2. Chạy một web service với Docker

Sau khi có Docker trong máy tính, các bạn chạy tiếp lệnh sau:

`docker run -it -p 80:80 yeasy/simple-web`

Trong đó:

* docker run: lệnh chạy một container. Bản chất là chúng ta đang dùng Docker CLI ra lệnh cho Docker Deamon.
* -it: Đây là một flag hay có thể hiểu là một tham số cho lệnh docker run. “-it” giúp cho màn hình console hiện tại tương tác được với bên trong container. Cái chúng ta nhìn thấy giờ đây chính là môi trường trong container.
* -p: Tham số để map port. Bên trái “:” sẽ là PORT ngoài máy chúng ta, bên phải là PORT của container. VD: nếu bạn chọn “-p 3000:80” thì port ngoài là 3000. Tuy nhiên PORT container phải đúng nha.
* yeasy/simple-web: tên image. Có rất nhiều Image đã được build sẵn và đây là một trong số chúng. Thông thường bạn có thể thêm version (VD: yeasy/simple-web:v1.0), mặc định version là “latest”.

Kết quả:

![image.png](https://images.viblo.asia/2d63839c-6853-4e81-98ce-c2c09ef3d94d.png)

Vì đây là lần đầu tiên chúng ta sử dụng image **yeasy/simple-web**, image này không tồn tại trong sẵn có trên máy tính, Docker sẽ tiến hành “kéo về”, tương đương với lệnh “`docker pull yeasy/simple-web`“.

Sau khi tiến trình pull, giải nén và run container lên thành công các bạn sẽ thấy dòng chữ đại khái như sau:

`Serving HTTP on 0.0.0.0 port 80 …`

Hãy mở trình duyệt vào chạy thử: http://localhost (mặc định là PORT 80)

![image.png](https://images.viblo.asia/ccb73c12-05e0-4523-bd6d-d5c739537bc4.png)

### 3. Chạy container như một service ngầm (daemon)

Vấn đề lúc này là màn hình console của chúng ta bị “kẹt” trong container. Nếu chúng “CTRL + C” để thoát thì container sẽ dừng ngay (exited).

Để kiểm tra việc này các bạn cứ “CTRL + C” rồi dùng lệnh “`docker ps -a`” nhé:

![image.png](https://images.viblo.asia/f532481c-80a2-49ae-8113-600779faa4eb.png)

Okie, chúng ta có một container ID: a27fc8f3a840 đã bị exited. Trước khi chạy lại thì bạn có thể “tháo” container ra hẳn luôn với lệnh:

`docker rm a27fc8f3a840`

Lưu ý: a27fc8f3a840 là container ID của các bạn nhé.

Sử dụng lại lệnh “`docker ps -a`” các bạn sẽ không thấy container đó nữa. Tiến hành chạy lại container tuy nhiên lần này thêm vào một tham số nữa là “`-d`“:

`docker run -it -d -p 80:80 yeasy/simple-web`

Lần này các bạn sẽ thấy container sau khi chạy lên sẽ “nhả” console ra chứ không “kẹt” lại nữa. Làm sao để biết rằng container đang chạy?? Vẫn là câu lệnh:

`docker ps -a`

![image.png](https://images.viblo.asia/e260363c-0e13-4cd0-ac16-a2a1f60bca0d.png)

Kết
Mình hy vọng đã giúp các bạn hiểu hơn phần nào về Docker và cách chạy container cơ bản. Những bài viết sau mình sẽ hướng dẫn những thứ hay ho hơn về Docker nhé.

Một số link tham khảo thêm:

https://docs.docker.com

https://hub.docker.com/r/yeasy/simple-web

https://edu.200lab.io/blog/docker-la-gi-khi-nao-nen-dung-docker