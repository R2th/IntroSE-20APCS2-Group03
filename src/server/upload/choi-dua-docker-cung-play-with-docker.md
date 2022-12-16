Đã bao giờ bạn tìm thấy những service open source hay ho đến mức bạn mất ngủ trên github, hay những bộ code AI python trên mạng mà rất định sẽ rất ngầu nếu khoe với đám bạn?
Tôi cũng đã từng như bạn, clone source về, tìm cách tải python rồi đến java rồi đến golang, những đêm mất ngủ vì lỗi syntax hay chỉ đơn giản là kéo thư viện về không tương thích hoặc không được

Đau đầu với tụi nó cho đến một ngày tôi tìm ra một thứ cool ngầu trên github với cái tên play-with-docker

## play-with-docker
service này giúp chúng ta start 1 repo từ Dockerfile và open port để chúng ta test tính năng của chúng

## Flipt
https://github.com/markphelps/flipt

Feature flag service giúp chúng ta quản lý được tính năng(bật/tắt) khi lên production cũng như rollout hệ thống, chúng ta sẽ host flipt trên play-with-docker trong bài viết này

## 1.0 đăng nhập play-with-docker

truy cập https://labs.play-with-docker.com/ và đăng nhập bằng tài khoản docker của bạn (hoặc đăng ký nếu chưa có)

![](https://images.viblo.asia/c64782c5-e324-4eef-8154-6610a7bf5814.png)

## 2.0 truy cập

truy cập https://labs.play-with-docker.com/?stack=https://raw.githubusercontent.com/markphelps/flipt/master/docker-compose.yml và chọn nút start và chờ...

![](https://images.viblo.asia/8253b570-c804-484f-bf06-d1311105578a.png)

sau khi tạo xong session bạn sẽ được sử dụng 1 host trong thời gian 4 tiếng, sau đó session đóng và mọi dữ liệu sẽ được xóa

Màn hình bạn thấy sẽ gần giống như thế này:
![](https://images.viblo.asia/eb5e6869-957b-4b50-9246-a0cc4a8eff53.png)


## 3.0 test

vào lúc này thì flipt của bạn đã host thành công trên play-with-docker, bạn nhấn "Open Port" nhập 8080 và trải nghiệm thôi 🤣

Flipt bao gồm các tính năng như:
    Fast. Written in Go. Optimized for performance
    Stand alone, easy to run and configure
    Ability to create advanced distribution rules to target segments of users
    Native GRPC client SDKs to integrate with your applications
    Simple REST API
    Modern UI and debug console
    Support for multiple databases
    Data import and export to allow storing your flags as code
    
Hãy thử sử dụng nhé 😵


bạn có thể mở repo tại play-with-docker nếu repo github xuất hiện ảnh:
![](https://images.viblo.asia/7d7e3596-ce58-4a5e-8aee-9d0049c8ddc1.png)