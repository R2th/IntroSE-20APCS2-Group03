Hello mọi người, với những phần trước mình đã đi qua những khái niệm cơ bản nhất ở Docker. Hôm nay với một khái niệm khác của docker. Chúng ta cùng đi vào Docker compose nhé.

# 1. Tổng quan:
Docker compose là một công cụ giúp định nghĩa và chạy multi-container trong những ứng dụng sử dụng Docker. Với Compose, chúng ta có thể config các services để phục vụ cho ứng dụng. Và tiện hơn khi chỉ với một câu lệnh, chúng ta có thể tạo và start tất cả các Docker containers services mà chúng ta sử dụng.
![](https://images.viblo.asia/cf34105f-2251-4608-9e3c-f6560968bc16.png)

Compose có thể hoạt động được trên tất cả các môi trương như: production, staging, development, testing hay theo workflows của CI. Để sử dụng compose vào project chúng ta cần có 3 bước : 

 
 - Định nghĩa môi trường chạy ứng dụng vời Dockerfile để nó có thể sao chép ở bất kỳ đâu. 
 - Định nghĩa các service tạo nên ứng dụng ví dụ như php, mysql, nginx hay node ở trong file docker-compose.yml (đây chính là file chính giúp Docker biết được những services cần chạy hay volume, network và chạy các services đó  lên cùng một lúc, chúng tách biệt với môi trường bên ngoài) - chúng ta sẽ biết được chi tiết trong file ngay dưới đây.
 - Cuối cùng chúng ta sẽ chạy câu lệnh ``` docker-compose up ``` để chạy các services cũng như ứng dụng.

# 2. Cài đặt :

Để sử dụng được Docker chúng ta cần phải cài đặt Docker Engine trước. Các bạn có thể cài đặt theo hướng dẫn ở đây : https://docs.docker.com/engine/install/#server

Sau khi đã có Docker Engine trên máy chúng ta sẽ cài đặt thêm Docker Compose để sử dụng được command ```docker-compose```. Dưới đây mình sử dụng Linux để cài đặt : 

1 . Chúng ta sẽ chạy command download bản ổn định nhất của Docker Compose hiện tại : (tháng 6/2021 là bản 1.29.2)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. Phân quyền thực thi cho file  khởi động (bin) docker-compose: 
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

3. Kiểm tra lại cài đặt: 
```bash
docker-compose --version
```


Để gỡ cài đặt chúng ta sử dụng: 

```bash
sudo rm /usr/local/bin/docker-compose
```

# 3. docker-compose.yml

> Vâng đây chính là file quan trọng nhất của docker-compose. Nơi mà chúng ta như một đầu bếp với các các services là nguyên liệu để tạo nên món ăn được ví như ứng dụng của bạn =))

Chém gió tí thôi, chúng ta cùng đi đến với file docker-compose.yml. Ở file này về cơ bản nó sẽ trông như thế này: 

```yml 
version: "3.9"  # optional since v1.27.0
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/code
      - logvolume01:/var/log
    links:
      - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

Đây là một file mẫu mà mình lấy ở trong tài liệu chính thức của Docker compose :D. Trong file này chúng ta sẽ có những thức thiết yếu mà chúng ta cần phải khai báo để chạy lên các container bao gồm: 
- services: Đây là nơi khai báo tất cả các services được build trực tiếp từ images trên dockerhub hay build từ Dockerfile đã được tạo sẵn. 
- volumes: Volume cung cho tất cả các container được chạy cùng docker compose. Để hiểu hơn về Volume mọi người có thể vào bài viết về Docker Storage của mình : https://viblo.asia/p/docker-co-ban-p2-storage-gAm5yVo8Kdb
- Ngoài ra còn một vài tùy chọn khác các bạn có thể lên trang chủ của docker để đọc. 

Đi sâu vào mỗi service chúng ta có thể khai báo như vị trí Dockerfile để build container, cổng thực thi container, volumes nhỏ (ví dụ ở đây mình khai báo volumes chung trong docker compose này là ```logvolume01``` thì khi ở service web ta thấy có 1 dòng khai báo logvolume01:var/log tức là bind /var/log của container web vào logvolume01 được lưu trong docker. ngoài ra chúng ta có thấy dòng 
```yml
volumes: 
.:/code
```
Dòng này chúng ta đã bind code ở thư mục cùng cấp với ```docker-compose.yml``` vào thư mục ```/code``` của container web. mỗi khi sửa code ở ngoài thì code ở trong container cũng sẽ được sửa theo.

Ngoài ra chúng ta có thể build trực tiếp một service mà không cần tới Dockerfile thông qua key: image như trong file ```docker-compose.yml``` .

### Biến môi trường cho docker-compose:
- Với docker compose chúng ta cũng có thể sử dụng biến môi trường tiện lợi cho việc thay đổi các tham số trong file yml
Ví dụ ở file này mình có cấu hình redis build từ image: redis trên docker hub
Tuy nhiền chúng ta có thể tùy chọn phiên bản redis thông qua :
```yml
redis: 
    image: "redis:6.2-alpine"
```

Để một cách linh động hơn chúng ta có thể tạo một file ```.env``` cùng cấp với docker-compose 
```.env
TAG=6.2-alpine
```

và cấu hình lại :
```yml
redis: 
    image: "redis:${TAG}"
```

Như vậy mỗi khi cần thay đổi phiên bản redis chúng ta chỉ cần vào file .env để cấu hình và docker compose up lên thôi :D 

# 4. Tổng kết:
Trong bài viết này mình đã giới thiệu qua về Docker-compose và cấu trúc cơ bản của một file docker-compose.yml. Còn rất nhiều những tùy chọn trong khi cấu hình docker-compose.yml.  Với những thứ giới thiệu cơ bản trên hy vọng sẽ giúp ích cho mọi người phần nào trong việc phát triển ứng dụng cũng như làm việc dễ dàng hơn giữa các thành viên trong team vì đã có một môi trường hoàn hảo thuận tiện khi phát triển ứng dụng. Build once, run everywhere là một câu slogan của docker. Đây cũng chính là những gì mà docker mang lại cho chúng ta. Hẹn gặp lại mọi người với bài sau mình sẽ thực hành tạo ra một docker-compose chạy ứng dụng Vue.js nhé. Cảm ơn mọi người đã theo dõi bài viết :D