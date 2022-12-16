Chào mừng các bạn đã quay trở lại với [series học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình

Ở bài trước chúng ta đã cùng nhau setup [Auto deploy với CICD](https://viblo.asia/p/auto-deploy-voi-docker-va-gitlab-ci-E375z4eRZGW), giảm thiểu những thao tác thừa lặp lại, chỉ cần commit, tất cả mọi thứ còn lại như: build Docker image, test và deploy được làm hoàn toàn tự động.

Ở bài này chúng ta sẽ setup các công cụ để monitor các ứng dụng Docker trông đầy đủ, xịn xò và chuyên nghiệp nhé :raised_hands:

# Tổng quan
Một trong những công việc quan trọng khi chạy ứng dụng ở production là luôn phải theo dõi, giám sát ứng dụng của mình, theo dõi các thông tin hệ thống (Logs, CPU, RAM, disks, IO operations,...) xác định những điểm/những khoảng thời gian ảnh hưởng xấu tới hiệu suất của app mục đích là đảm bảo ứng dụng luôn hoạt động ổn định. Đây là công việc dù có hay không dùng Docker thì ta vẫn thường xuyên phải làm (nếu là người làm nhiệm vụ Deploy và maintain)

Thông thường khi mua VPS thì ta có thể xem được 1 số thông tin tổng quát về CPU, Ram, networks, có thể xem trực tiếp trên giao diện trang web quản trị của nhà cung cấp nơi ta mua VPS (bên dưới là dashboard cho VM - Virtual Machine của mình trên Azure)

![](https://images.viblo.asia/1f093c9e-d6a5-4ec0-b3a4-b19f3a32a1c0.png)

Nếu muốn những thông tin cụ thể hơn thì ta cần phải vào trực tiếp server để kiểm tra. Nhưng khi số lượng ứng dụng lên nhiều, đặc biệt khi ta chạy với Docker, số lượng container nhiều lên thì thật khó để có thể kiểm tra xem từng container chiếm bao nhiêu RAM, CPU, Network ra sao,...

Và cuộc đời thật may mắn vì thế giới open source luôn cứu rỗi những linh hồn đang lang thang tìm ra những công cụ hữu ích để xử lý vấn đề này với bộ 3 cặp bài trùng: `cAdvisor`, `Prometheus` và `Grafana` :muscle::muscle:. Bộ 3 này được dùng rất rất nhiều khi trong thế giới DevOps để monitor ứng dụng Container

Chúng ta sẽ cùng tìm hiểu theo thứ tự từng thành phần một xem chúng là gì và lợi ích chúng mang lại nhé. ;)

> Thực ra tên chính xác nên gọi là `monitoring` chứ gọi là `giám sát, theo dõi` nghe nó hơi nghiêm trọng. Nói `monitoring` là nói tới những điều mình kể bên trên, do vậy từ giờ trong bài này mình sẽ dùng `monitor/monitoring` thay vì dịch ra tiếng việt nhé :D
# Setup
## Clone source
Đầu tiên các bạn clone code thực hành bài này [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh `master` nhé)

Ở bài này ta sẽ chỉ quan tâm tới folder `docker-monitoring` nhé

Ở bài này mình vẫn lấy project NodeJS CRUD sản phẩm như các bài trước, về chức năng, hay setup Docker thì y hệt không có gì thay đổi 
## Test ở local
Và vẫn như thường lệ, để đảm bảo code vẫn chạy bình thường ta luôn test ở local trước khi làm những điều tiếp theo nhé.

Và project bài này cũng như các bài gần đây ta đều setup để chạy với non-root user nhé các bạn. Tập dần cách [chạy ứng dụng Docker với non-root user](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw) đi nhé ;)

Bắt đầu thôi nào :rocket::rocket:

Việc làm đầu tiên vẫn như thường lệ là check xem user ở môi trường gốc của ta là gì:
```
whoami
--->> maitrungduc

id -u
--->> 501

id -g
--->> 20
```
Như các bạn thấy ở trên user môi trường gốc của mình có `UID:GID` là `501:20`, do vậy Dockerfile của chúng ta cần cập nhật lại 1 chút, các bạn mở Dockerfile nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

RUN adduser -D -u 501 appuser -G dialout

RUN chown -R appuser:dialout /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên ta tạo user tên `appuser` với `UID` là `501`, và thuộc group `dialout`

Và nếu các bạn thắc mắc cái group `dialout` kia là gì và lí do tại sao lại dùng nó, thì mình khuyên các bạn nên xem lại bài [deploy ứng dụng Docker, NodeJS](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw), mình đã giải thích kĩ lí do rồi nhé. Lí do vì group với ID là 20 trùng với group `dialout` trong container rồi

> Tuỳ thuộc vào `UID:GID` ở môi trường gốc của các bạn khác mà ta thay vào cho phù hợp nhé

Tiếp theo ta cập nhật lại `user` của service `db` và `redis` trong `docker-compose.yml` cho khớp với môi trường gốc nhé:
```yaml
db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: "501:20"
    networks:
      - db-network
      
redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    user: "501:20"
    networks:
      - queue-network
```
Nhớ là ở bên trên 2 serivice `db` và `redis` mình đang chạy với user `501:20` giống với app NodeJS, các bạn nhớ update nó cho giống với user môi trường gốc của các bạn nhé (chạy `id -u` và `id -g` để check UID và GID)

Cuối cùng ta tiến hành build Docker image nhé các bạn:
```
docker build -t learning-docker:docker-monitoring .
```
Sau đó ta khởi động project lên:
```
docker-compose up -d
```
Tiếp đó ta truy cập trình duyệt ở địa chỉ `localhost:3000` thấy như sau là ôkê rồi nhé:

![](https://images.viblo.asia/e61f2297-c0fd-4b75-ae61-c87aa474859c.png)

Các bạn thử Regiser account mới, login và thêm thử vài sản phẩm xem mọi thứ ổn định chưa nhé. Phần này mình để các bạn tự sướng :D

Sau khi đã kiểm tra là app chạy ổn không lỗi lầm gì thì ta bắt đầu vào tiết mục chính của ngày hôm nay :muscle::muscle:

**Note cho bạn nào đang dùng Windows**: các bạn xem lại phần chú ý lúc mount volume cho MongoDB mình đã nói ở bài [Dockerize ứng dụng NodeJS, Mongo](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3#_chay-project-11) rồi nhé
# Phân tích tài nguyên sử dụng và hiệu suất bằng cAdvisor
Chúng ta cùng đi tới thành phần đầu tiên trong bộ 3 cặp bài trùng. Và đây cũng là thành phần core cho 2 thành phần sau có thể dựa vào.
## Tổng quan cAdvisor
cAdvisor (đọc là: xi-ớt-vai-dờ) là 1 dự án Open source của Google (nghe Google là biết hàng xịn rồi, không cần nói nhiều :D), mục đích để phân tích mức độ sử dụng, hiệu năng, và rất nhiều thông số khác từ các ứng dụng Container, cung cấp cho người dùng cái nhìn tổng quan về toàn bộ các container đang chạy.

Link chi tiết các bạn có thể xem [ở đây](https://github.com/google/cadvisor)
## Setup cAdvisor
Ở project của chúng ta, các bạn mở folder `.docker`, bên trong đó các bạn tạo cho mình 1 folder tên là `monitoring` để lưu cấu hình cho cAdvisor, Prometheus và Grafana nhé

Bởi vì Google đã cung cấp sẵn cho chúng ta Image của `cAdvisor` nên việc chạy sẽ vô cùng đơn giản :kissing_heart:

Trong folder `monitoring` bên trên, các bạn tạo cho mình 1 file `docker-compose.yml` mới với nội dung như sau:
```yaml
version: "3.4"
services:
  cadvisor:
    image: gcr.io/google-containers/cadvisor:latest
    container_name: cadvisor
    ports:
    - 8080:8080
    volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:rw
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro
```
Ở trên ta map `volumes` một số chỗ để `cAdvisor` có thể đọc thông tin liên quan, tổng hợp và đưa ra các con số thống kê cho chúng ta

Tiếp theo ta khởi động `cAdvisor` lên nhé, vẫn ở folder `monitoring` các bạn chạy:
```
docker-compose up -d
```
Sau đó ta mở trình duyệt, truy cập ở địa chỉ `localhost:8080` sẽ thấy giao diện như sau:

![](https://images.viblo.asia/02e72218-1036-4f44-86aa-0183f097678f.png)

Ở đó ta thấy vô vàn các thông tin hữu ích: danh sách các container, CPU/RAM/Disk... ở trên môi trường gốc:

![](https://images.viblo.asia/e70b861c-b35a-4db1-9428-1fae279513fc.png)

Ở trang chủ các bạn click vào `Docker containers` sẽ hiện ra danh sách chi tiết các container đang được chạy trên máy gốc của chúng ta, các bạn có thể xem chi tiết thống kê về từng container. 

> Chú ý là cAdvisor thống kê tất tần tật các container trên máy gốc của chúng ta, không chỉ mỗi project NodeJS ở bài này đâu nhé

Đến đây ta đã setup thành công cAdvisor để có một trang giao diện monitoring trông cũng đầy đủ và nhiều thông tin quan trọng, nom cũng ra gì phết ấy nhỉ :joy::joy:

Mặc dù ở trên ta đã thấy có 1 số thông tin tổng quát nhưng cAdvisor thực tế còn cung cấp rất nhiều thông tin chi tiết về các container đang chạy: IO operations, network, uptime, ... nhưng chúng không có ở trên trang giao diện quản lý kia. Mà cAdvisor để người dùng tuỳ chọn nếu có yêu cầu cụ thể. Các thông số khác mà cAdvisor cung cấp các ban có thể xem [ở đây](https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md)

Và để truy cập sâu hơn về thông tin các ứng dụng container ta cùng đi tới phần tiếp nhé
# Prometheus
## Tổng quan
[Prometheus](https://prometheus.io/) (đọc là: Pờ-ròm-mí-thi-ợt-s) là bộ toolkit để monitor system và thông báo (alert) dựa trên các thông số của hệ thống.

Prometheus có khá nhiều tính năng hay ho: dữ liệu tổ chức đa chiều, timeseries, có chức năng thông báo qua mail, sms,... Prometheus tích hợp được với rất nhiều thứ khác, không chỉ cAdvisor

Việc dùng cAdvisor và Prometheus cho phép ta có cái nhìn sâu hơn, chi tiết hơn về thông số của các ứng dụng Docker. cAdvisor đóng vai trò như người lấy thông tin, Prometheus là người nhận trách nhiệm lấy thông tin đó, tổ chức sao cho hợp lý và trả về cho người dùng.
## Setup
Và vì Prometheus cũng cung cấp sẵn image nên việc chạy sẽ vô cùng đơn giản (cứ nghe đơn giản là thích rồi :kissing_heart::kissing_heart:)

Vẫn ở folder `monitoring`, các bạn tạo cho mình 1 file tên là `prometheus.yml`, với nội dung như sau:
```yaml
scrape_configs:
- job_name: cadvisor
  scrape_interval: 5s
  static_configs:
  - targets:
    - cadvisor:8080
```
File này là file cấu hình cho Prometheus, ở trên ta có `scrape_configs` (scrape dịch ra là `cạo`, ý là liên tục "cạo" ra thông tin :D, nghe chuối nhỉ).

Trong config ta có 1 job tên là `cadvisor`, ta có `scrape_interval: 5s` ý là cứ 5 giây thì "cạo" ra thông tin từ cAvisor 1 lần. Tiếp theo ta có `static_config` và `targets` là `cadvisor:8080` ý là "đây cạo thông tin từ ông cAvisor đang chạy ở địa chỉ `cadvisor:8080`".

Nhớ là phần địa chỉ `cadvisor:8080` chính là tên service `cadvisor` ta viết ở `docker-compose.yml` nhé.

> Cổng 8080 là cổng mặc định được cadvisor expose ra rồi nhé

Tiếp đó, vẫn ở folder `.docker/monitoring`, ta thêm vào `docker-compose.yml` với nội dung như sau:
```yaml
... phần trên giữ nguyên

prometheus:
    image: prom/prometheus:latest
    ports:
    - 9090:9090
    command:
    - --config.file=/etc/prometheus/prometheus.yml
    volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    depends_on:
    - cadvisor
```
Cuối cùng ta khởi động lại phần monitoring nhé:
```
docker-compose down
docker-compose up -d
```
Sau đó ta mở trình duyệt ở địa chỉ `localhost:9090` sẽ thấy giao diện của Prometheus nhé:

![](https://images.viblo.asia/fac65510-a4b0-4b01-af32-40417143cb42.png)

Ta click chọn tab Graph, và select ở ô `insert metric at cursor` ta sẽ thấy có ti tỉ loại thông số rất là chi tiết, đầu tiên ta thử chọn `container_start_time_seconds`, đây là thông số thời gian các container khởi động lúc ban đầu, sau đó bấm Execute, ta sẽ thấy đồ thị hiện ra dạng như sau:

![](https://images.viblo.asia/8ce2b736-98a4-4353-b706-ec137ba6e1dd.png)

Ta có thể truy vấn cụ thể thời gian start_time của 1 container nào đó, ví dụ ở biểu thức truy vấn các bạn sửa lại như sau: `container_start_time_seconds{name="docker-monitoring_app_1"}`, ở đây ta truy vấn thời gian start_time của container `docker-monitoring_app_1`

> các bạn có thể gõ `docker container ls` để lấy tên của các container đang chạy ở máy các bạn nhé.

Ngoài ra còn có rất nhiều thông số khác ở ô select box, các bạn tuỳ chọn thoải mái tự sướng nhé ;)

Ở trên giao diện ta còn thấy có 1 số tab như Alerts (gửi thông báo, ví dụ khi CPU tăng lên 50% chẳng hạn, các bạn xem chi tiết [Alert Manager](https://prometheus.io/docs/alerting/latest/alertmanager/)), hay Status để xem thông tin về cấu hình Prometheus, phiên bản đang sử dụng....

Đến đây ta đã hoàn thành việc setup Prometheus, bằng việc kết hợp sử dụng cAdvisor ta có 2 công cụ để monitor ứng dụng Container rất hữu ích.

Có thể các bạn thấy rằng Prometheus nhiều thông số thật đấy, nhưng nom hơi phức tạp và không realtime, cứ phải bấm Execute. Thì ta cùng đến với phần tiếp theo đó là dùng Grafana để hiển thị (visualize) dữ liệu từ Prometheus cực chất nhé ;)

# Grafana
## Tổng quan
[Grafana](https://grafana.com/) (đọc là: grơ-pha-nà) là một platform chuyên về data-visualization để phân tích dữ liệu trên giao diện Web. Grafana tích hợp được với rất nhiều thứ: MySQL, MongoDB, .... và cả Prometheus.

Sử dụng Grafana cho phép chúng ta tạo ra những trang Dashboard cực kì đẹp mắt, đầy đủ và trông rất chuyên nghiệp.

![](https://images.viblo.asia/b4d7e9f8-38f2-4a78-b678-4646a6cb0ca9.png)

Ở bài này ta sẽ setup để Grafana lấy những thông tin mà bên Prometheus `scrape` được từ cAdvisor và hiển thị trên Dashboard của Grafana nhé
## Setup
Grafana cung cấp cho chúng ta Docker image nên việc chạy sẽ cực kì đơn giản.

Vẫn ở folder `./docker/monitoring` các bạn thêm vào `docker-compose.yml` 1 service mới tên là `grafana` với nội dung như sau:
```yaml
...
grafana:
    image: grafana/grafana
    ports:
    - 4000:3000
    volumes:
    - ./data:/var/lib/grafana
    restart: always
    depends_on:
    - prometheus
```
Tiếp đó, vẫn ở folder `monitoring`, ta tạo 1 folder tên là `data`, mục đích dùng để lưu lại những Dashboard mà tí nữa ta sẽ tạo.

Cuối cùng, vẫn ở folder `monitoring`, ta chạy command sau để khởi động lại nhé:
```
docker-compose down
docker-compose up -d
```
Ngay sau khi các service được chạy lên thành công, ta mở trình duyệt ở địa chỉ `localhost:4000` để truy cập Grafana, và sẽ thấy như sau:

![](https://images.viblo.asia/e0d9e124-8f32-42e8-a367-763645f2b24b.png)

Woaaaa, nom đẹp quá nhỉ :heart_eyes::heart_eyes:

Sau đó các bạn login với username+password mặc định đều là `admin`.

Sau khi login xong ta sẽ được điều hướng vào trang chủ nom rất đẹp như sau:

![](https://images.viblo.asia/6f561c18-a36a-4953-a008-9e73abae024e.png)

Sau đó các bạn click vào ô màu đỏ như trong hình để thêm Data Sources - thứ mà từ đó Grafana sẽ lấy data về để hiển thị

Tiếp đó các bạn chọn Prometheus:

![](https://images.viblo.asia/ebbfb5c7-ff4b-4876-ab01-7216991cc573.png)

Ở màn hình setup kết nối tới Prometheus, các bạn chỉ cần quan tâm tới mục HTTP như hình dưới, nhớ điền giống như mình nhé:

![](https://images.viblo.asia/95e25b3a-74b6-43bc-a312-359c738bd577.png)

Sau đó ta bấm Save & Test, thấy in ra `Data source is working` là oke rồi nhé.

Sau đó ta quay lại trang chủ, chọn `Create your first dashboard`:

![](https://images.viblo.asia/032943dc-7341-4aa9-8128-2b02c7134f0e.png)

Sau đó click chọn `Add new Panel`, tiếp đó ta chọn thông số `container->container_memory_max_usage_bytes` để xem thông tin về bộ nhớ mà mỗi container sử dụng, các bạn nhớ chọn interval là 10 giây để cứ 10 giây thì Grafana lại lấy mới dữ liệu nhé:

![](https://images.viblo.asia/b893007d-0d2d-4980-8933-5f16c0c1cf99.png)

Ngay lập tức sau khi ta select thông số thì ta sẽ thấy đồ thị được in ra :muscle::muscle:. Sau đó ta bấm apply, vậy là Dashboard của ta đã có 1 Panel với 1 thông số, nom như sau:

![](https://images.viblo.asia/471f08cf-8b6b-461c-9c38-69b97d4592a9.png)

Ều nom nghèo nàn nhỉ :rofl::rofl:. 

Muốn có dashboard đẹp đẹp như lúc đầu show hàng thì chả nhẽ cứ ngồi lọ mọ thêm từng Panel à? Biết thông số nào mà thêm vào đây??? :thinking::thinking:

Thì Grafana có 1 thư viện các dashboard được build sẵn khổng lồ, ti tỉ dashboard, ta tha hồ chọn, những người khác đã tốn công build sẵn cho chúng ta dùng rồi ;)

Các bạn truy cập vào trang thư viện Dashboard của Grafana [ở đây](https://grafana.com/grafana/dashboards), rồi lọc Dashboard với data source là Prometheus, ta sẽ thấy có rất nhiều Dashboard build sẵn dành cho Prometheus.

![](https://images.viblo.asia/d03243ba-3848-4937-bc30-e1797f907ff6.png)


Hìu vẫn chả biết chọn cái nào?? :sob::sob:

Thì mình có dùng 1 Dashboard với ID là `193` mình thấy  nom cũng ổn, ta cùng import Dashboard này nhé.

Ta quay lại Grafana ở local, ở thanh Sidebar bên trái chọn `Dashboard->Manage`, sau đó bấm `Import`:

![](https://images.viblo.asia/982b0b0d-b819-4d50-a188-3f4b949f1f9b.png)

Tiếp đó các bạn nhập ID dashboard mà ta muốn cài vào, bấm `Load`, ở ô Select chọn Prometheus, rồi bấm `Import` là xong:

![](https://images.viblo.asia/9d30a0c0-18fb-4349-a405-93bd2677f26c.png)

![](https://images.viblo.asia/fb167bdc-a28b-434c-af3c-4553af5e16bc.png)

Ngay sau đó ta sẽ thấy Dashboard hiển thị như sau:

![](https://images.viblo.asia/6c385a52-7ee8-4deb-80c4-de61bc899af8.png)

Vậy là chúng ta đã hoàn thành việc setup monitoring với Grafana rồi đó, Dashboard nom cũng ra gì phết ấy chứ nhỉ :joy::joy:

# Note
Thường theo cảm nhận bản thân thì mình thấy Grafana là đủ, 2 WebUI của cAdvisor và Prometheus mình khá ít dùng tới. Thứ nữa là 2 WebUI đó lại không có authentication. Đúng là Prometheus có support basic Auth, nhưng còn cAdvisor setup authentication khá là chuối. Mà chạy ở production không lẽ mình lại để vậy, mở public cho người ngoài xem :joy:

Vậy nên nếu ta không thực sự dùng tới 2 web UI của cAdvisor và Prometheus thì ta bỏ map port ở `docker-compose` đi nhé các bạn, thì bên ngoài sẽ không truy cập vào được:
```yaml
...

cadvisor:
    image: gcr.io/google-containers/cadvisor:latest
    # ports:
    # - 8080:8080  ---->>> Ở ĐÂY
    volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:rw
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro

  prometheus:
    image: prom/prometheus:latest
    # ports:
    # - 9090:9090 ------>>>> VÀ Ở ĐÂY
    command:
    - --config.file=/etc/prometheus/prometheus.yml
    volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    depends_on:
    - cadvisor
    
...
```
Ta chỉ cần map port của Grafana thôi là đủ vì ta chỉ sử dụng Grafana là chủ yếu.

Thứ nữa là vì những thông số thông kê từ cAdvisor là cho toàn bộ tất cả các container đang được chạy trên máy của chúng ta. Vì thế khi chạy thật mình nghĩ các bạn nên đặt cấu hình của chúng ra 1 nơi nào đó riêng. Ở bài này mình để chung cả vào project NodeJS để lát còn commit lên Gitlab được :D

# Đóng máy
Qua bài này ta đã biết được cách setup các công cụ để monitor ứng dụng Container sử dụng bộ 3 quân bài trùng cAdvisor, Prometheus và Grafana, từ đó tạo ra những Dashboard để monitor rất đẹp và trực quan.

Việc monitor system ở production là điều luôn luôn phải làm, và làm thường xuyên do vậy với sự trợ giúp đắc lực của những tool bên trên thì ta sẽ tiết kiệm được nhiều thời gian trong việc dựng Dashboard và có được những thôn tin hữu ích chi tiết về hệ thống của chúng ta.

Toàn bộ source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker/-/tree/complete-tutorial) (nhánh **complete-tutorial** nhé)

Cám ơn các bạn đã theo dõi, hẹn gặp lại các bạn vào những bài sau ^^