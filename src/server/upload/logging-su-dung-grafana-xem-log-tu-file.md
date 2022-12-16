* Như bài viết trước mình đã có hướng dẫn sử dụng *Zap* và *Golang* để write log ra file, anh em xem lại [đây](https://viblo.asia/p/golang-log-ra-file-su-dung-zap-BQyJK9GwVMe) nhé.
* Vấn đề là log ra file chỉ để lưu lại thôi, chứ gặp vấn để trên môi trường production thì anh/em xem kiểu gì:
    * Mở từng file ra xem ak
    * Copy tất cả các file ra visual studio code rồi search all.
    * Đưa lên cloud-watch của aws, cách này hay đấy, hihi mà tiền đâu.
*  Theo như mình biết thì hiện tại vẫn có 1 số công ty sài cách mở file ra xem. Má nó chuối thôi rồi, nên tốt nhất là centralized lại, sử dụng Elastic-Logstash-Kibana (elk) hoặc Grafana-Loki-Promtail.
*  Ở bài viết này mình hướng dẫn cách cài đặt và view đơn giản sử dụng Grafana-Loki-Promtail, nếu anh/em cần thì mình làm demo đơn giản cái ELK sau.

## Môi trường
1. Cài docker-compose trên linux, anh em run từng lệnh một:
* DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
* mkdir -p $DOCKER_CONFIG/cli-plugins
* curl -SL https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m) -o $DOCKER_CONFIG/cli-plugins/docker-compose
* chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
* sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
* docker compose version
=> kết quả thế này là thành công:
![](https://images.viblo.asia/ccbef694-4d5b-432e-a098-ad4081c1c189.png)

2. Anh/em có thể tham khảo thêm cách cài ở [đây](https://docs.docker.com/compose/install/)

## Cài đặt
### 1. Tạo một file docker-compose.yml:
```
version: "3.3"
networks:
  monitor:
    driver: bridge
```
=> Sử dụng chung một network để các container grafana, loki và promtail có thể dễ dàng giao tiếp với nhau.
### 2. Trong file yml tạo 1 block services:
```
services:
```
=> block services này là để add các image cũng như để tạo thành container sau khi run.
### 3. Add *grafana*, add trong block services:
```
grafana:
    restart: always
    image: grafana/grafana:latest
    container_name: grafana
    ports:
        - "3000:3000"
    volumes:
      - $PWD/grafana:/var/lib/grafana
    networks:
      - monitor
``` 
* $PWD: là đường dẫn hiện tại, ví dụ hiện tại mình đang ở folder monitoring thì khi run pwd sẽ ra full đường dẫn.
![](https://images.viblo.asia/40937eee-3c9f-4945-a8e9-93adbe7e639c.png)
### 4. Add *loki*:
* Tạo một file loki-config.yaml, file này mình lấy mặc định nha:
```
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    instance_addr: 127.0.0.1
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093
```
=> file này phải được đặt cùng cấp với file docker-compose.yml.

* Add *loki* trong block services:
```
loki:
    image: grafana/loki:2.1.0
    container_name: loki
    restart: unless-stopped
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - ./loki-config.yaml:/etc/loki/config.yaml
    networks:
      - monitor
```
* ./loki-config.yaml:/etc/loki/config.yaml: là sẽ copy file loki-config.yaml vào bên trong container loki.

### 5. Add *promtail*:
* Tạo một file promtial-config.yml, file này mình lấy mặc định nha:
```
server:
    http_listen_port: 9080
    grpc_listen_port: 0
  
  positions:
    filename: /tmp/positions.yaml
  
  clients:
    - url: http://loki:3100/loki/api/v1/push
  
  scrape_configs:
    - job_name: demo
      pipeline_stages:
      static_configs:
      - targets:
          - localhost
        labels:
          job: demo
          __path__: /var/log/demo/*
```
=> tạo một job *demo*, sẽ collector file log từ trong folder */var/log/demo/*, folder này nằm trong container promtail nha. Khi start container mình sẽ mount một folder nào đó trên local máy vào folder này.
* add promtail vào block services:
```
promtail:
    image: grafana/promtail:latest
    container_name: promtail
    restart: unless-stopped
    volumes:
      - /home/ducnp/demo/logs:/var/log/demo
      - ./promtial-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
    networks:
      - monitor
```
=> trong block volumes: mình sẽ mount folder */home/ducnp/demo/logs* trên local máy vào* /var/log/demo* folder bên trong container.

## Run và Test
1.  Tại root của folder chứ file docker-compose.yml:
```
docker-compose up
```
2.  Run ok không có lỗi gì xuất hiện, mở web:
```
http://localhost:3000
```
* Sau khi mở web lên thì cần nhập *user/pass* mặc định: *admin/admin*.
* Đổi mật khẩu mới theo ý muốn của anh/em.

3. Add datasource loki trên grafana và test:
* Anh em vào youtube của mình xem nha, chỗ này viết dài quá nên mình quay video cho khoẻ, [link](https://www.youtube.com/watch?v=U2_613zR37k).

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang