Trong khi phát triển một ứng dụng Spring boot sử dụng ngôn ngữ Kotlin với docker phải thông qua quá trình build mới có thể start được server cho nên khi phát triển sẽ  sửa code liên tục cần nó tự động nhận code mới. Vậy trong bài viết này sẽ giới thiệu qua về giải pháp tận dụng một công cụ [entr](http://eradman.com/entrproject/)  để lắng nghe khi file thay đổi sẽ trigger rebuild và start lại server. Để mô phỏng thực tế sẽ build một ứng dụng RESTful sử dụng Spring boot, Kotlin với Gradle là quan lý dependencies trong môi trường của Docker.

## Spring boot

[Spring boot](https://spring.io/projects/spring-boot) giúp tạo stand-alone dựa trên ứng dụng Spring mà chỉ cần chạy với cấu hình đơn giản trong đó có những đặc điểm sau:
- Tạo ứng dụng Spring stand-alone
- Chạy trực tiếp Embed Tomcat, Jetty hoặc Undertow
- Cung cấp các dependencies 'starter' để đơn giản hóa xây dựng cấu hình
- Tự động cấu hình Spring và thư viện thứ 3 bất kỳ lúc nào
- Cung cấp tính năng sẵn production như metrics, health checks và cấu hình bên ngoài
- Tuyệt đối không sinh ra code và không yêu cầu cấu hình XML

## Init project
- Tạo project mới với Intellij IDEA

![](https://images.viblo.asia/5bbffb00-115a-478a-9799-d50d270e457b.png)

- Điền các thông tin về Spring Artifcat, Gradle, Kotlin, Java: 8

![](https://images.viblo.asia/3a2534db-67d0-421c-bfc7-03fd2a986269.png)

- Chọn dependencies `Spring Web`

![](https://images.viblo.asia/2eef65dc-130f-4b4f-8036-3f43d19dbf80.png)

- Chọn thư mục lưu project 

![](https://images.viblo.asia/e3197859-40d6-408b-8aab-32a8634a3a87.png)

- Chờ đợi nó tự build lần đầu các dependencies trong `build.gradle.kts`

![](https://images.viblo.asia/ba6490f9-697b-4d04-97b5-0c294528e46e.png)

- Tạo một `HomeController` để test project đã chạy ok chưa

![](https://images.viblo.asia/e3d40bcb-1c2f-45a6-9afe-f957e0a07dc0.png)

## Build Dockerfile

Phần này chúng sẽ sử dụng multi-stage để build Dockerfile

![](https://images.viblo.asia/e5976548-627c-4c64-bfeb-cbcebec660da.png)

#### Docker image `ubuntu:18.04` 
Phần này sẽ là môi trường tạm để build `entr` trong đó cần
- package `build-essential curl` là công cụ cơ bản cần thiết.
- `curl http://eradman.com/entrproject/code/entr-4.7.tar.gz | tar -xz  -C /tmp/` tải source rồi extract vào thư mục  `/tmp`
- Tiếp đến vào thư mục nãy để chạy các command build `entr`: `cd /tmp/entr-4.7 && ./configure && make test && make install` sau khi xong nó sẽ được sinh ra ở thư mục `/usr/local/bin/entr`

#### Docker image `gradle:6.7.1-jdk8`
Phần này đóng vài trò build project và lắng nghe sự thay đổi các file
- `COPY --from=entr_builder /usr/local/bin/entr /usr/local/bin` thực hiện copy từ stage trước sang image gradle
- Đoạn code dưới có nhiệm vụ dừng lại server, xóa các daemon gradle đã stop và cuối cùng build & start lại server
```
RUN echo $'gradle --stop \n\
rm -r /home/gradle/.gradle/daemon \n\
echo "Stop server ..." \n\
echo "Start server ..." \n\
gradle bootRun' > /usr/local/bin/precompile
```

- `RUN echo 'find . -type f \( -name "*kt" \) | entr -r precompile' > /usr/local/bin/watchfile` đóng vài trò lắng nghe sự kiện thay đổi file và gọi lại đến `precompile` trên.

## Build docker-compose.yml

Phần này mô tả về các service mà cần chạy trong docker

![](https://images.viblo.asia/58e0ab70-e08e-4980-a6b8-3d67927d469c.png)

- `kt_service` là service chứa các code được gán volume `work` của container với thư mục project.
- `command: /bin/bash -c 'watchfile'` là command khi dùng `docker-compose up` sẽ gọi đến `watchfile` đã viết trong Dockerfile thực hiện lắng nghe.
> Với lần đầu cần sử dụng command `docker-compose up --build` để build image, container, volumne từ Dockerfile

Sau khi chạy `docker-compose up --build` sẽ có log như sau:

![](https://images.viblo.asia/f0858647-78fc-40e0-9269-4733523d8474.png)

Chứng to rằng đã chạy thành công.

## HomeController test
Chúng ta sẽ thử vào url `http://localhost:8080` sẽ cho output

![](https://images.viblo.asia/987cd025-dcf3-48c7-bb28-22882eedac55.png)

Tiếp đến sửa đổi code từ `Alive` sang `Die` và quan sát
- Trong terminal log có đoạn `Stop server ...` và `Start server ...` của `precompile` nghĩa là nó được rebuild và start lại với `> Task :bootRun`

![](https://images.viblo.asia/aa060fdd-404d-4f93-9c7e-576d5fdeec6b.png)

- Trong trình duyệt hãy reload trang sẽ có output

![](https://images.viblo.asia/981bc276-0c26-42e7-9870-6802f97fb3d1.png)

## Kết luận
Theo các bước đã mô tả nhận thấy khi thay đổi phần code chúng ta không cần gõ manual các command như:
- `docker-compose down`
- `gradle --stop && rm -r /home/gradle/.gradle/daemon && gradle bootRun`
- `docker-compose up`

Để thực hiện nhận sự thay đổi mà nó đã tự động nhận.

Cảm ơn các bạn đã đọc bài viết của minh. (bow)

#### Tài liệu tham khảo
- [Spring boot](https://spring.io/projects/spring-boot)
- [entr](http://eradman.com/entrproject/)