## Tổng quan

Xin chào mọi người, tiếp tục quay trở lại với chủ đề về Traefik mình đang viết gần đây. Nếu các bạn chưa biết về Traefik có thể quay lại đọc một số bài viết của mình trước:
- [Tổng quan về Traefik](https://viblo.asia/p/tong-quan-ve-traefik-XL6lAA8Dlek)
- [Reverse proxy với Traefik](https://viblo.asia/p/reverse-proxy-voi-traefik-va-docker-tich-hop-tu-dong-tao-ssl-mien-phi-1VgZvEdmKAw)
- [Deploy web app với Traefik](https://viblo.asia/p/deploy-web-app-voi-traefik-va-docker-swarm-aWj53pVpK6m)

Quay lại chủ đề chính, bài hôm nay mình và các bạn sẽ giả định là chúng ta đang sử dụng Traefik làm reverse proxy trong dự án. Chúng ta sẽ visualize traefik logs với Kibana sử dụng ELK stack.

## ELK stack (Elastic stack)
ELK stack là viết tắt của bộ 3 sản phẩm open source gồm: Elascticsearch, Logstash và Kibana. Trong đó:
- [Elasticsearch](https://www.elastic.co/products/elasticsearch): Là một search & analytics engine, giúp bạn lưu trữ dữ liệu, search, index và phân tích dữ liệu. Ở đây dữ liệu của chúng ta chính là traefik logs
- [Logstash](https://www.elastic.co/products/logstash): Thành phần xử lý dữ liệu phía máy chủ, tổng hợp dữ liệu từ nhiều nguồn khác nhau, thực hiện transform và lưu lại vào elasticsearch
- [Kibana](https://www.elastic.co/products/kibana): GUI tool dùng để truy cập dữ liệu được lưu trong elasticsearch một cách dễ dàng, nó cũn giúp dựng đồ thị (graph) để giúp bạn theo dõi và phân tích hiệu quả hơn
- [Traefik](https://docs.traefik.io/): Như bạn đã biết từ các bài trước của mình, nó là reverse proxy & load balancer
- [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html): Là một phần trong Beats platform, đóng vai trò đọc và vận chuyển dữ liệu từ file logs tới Logstash hoặc Elasticsearch. Ngày xưa, Filebeat chỉ có thể chuyển dữ liệu tới Logstash nhưng bây giờ, nó có thể thay thế Logstash và gửi thẳng tới Elasticsearch trong những hệ thống đơn giản. 

Ngoài ra, ELK Stack đã được đổi tên thành Elastic Stack. Mình nghĩ nó đã thoát khỏi cái bóng ELK, và phải chăng hàm chứa thông điệp rằng mọi thứ xoay quanh trái tim mang tên Elasticsearch sẽ còn nhiều, nhiều và phát triển hơn nữa; Không chỉ dừng lại ở ELK; Không nhất thiết phải dùng cả 3. Thực tế vào năm 2015, một thành phần mới được thêm vào stack được gọi là Beats. Thay vì chuyển nó thành BELK, BLEK, ELKB... rồi sau này lại phải đổi lại lần nữa thì họ đã đổi thành Elastic Stack :D.

Nói vui chút thôi, chúng ta cùng quay lại nội dung chính nhé. Có một số điều kiện tiên quyết:
1. Chúng ta cần có một bộ Elastic Stack đang hoạt động, (Elasticsearch + Kibana)
2. Cài đặt và chạy Filebeat thành công
3. Cấu hình filebeat đọc logs từ traefik/docker

## Setup Web stack + Traefik
Trong bài này, chúng ta dựng sử dụng Traefik, Elasticsearch, Kibana và Filebeat để tiến hành thử nghiệm phục vụ cho bài viết. Mình sẽ sử dụng docker và docker-compose nhé. Trước hết, mình tạo một stack web như sau:

```yaml:web.yml
version: '3.6'

networks:
  web-net:
    name: web-net
  traefik-net:
    name: traefik-net

services:
  # Reverse proxy:
  traefik:
    restart: unless-stopped
    image: traefik:1.7
    command:
      - --api
      - --docker
      - --docker.exposedByDefault=false
      - --docker.network=traefik-net
      - --logLevel=DEBUG
      - --traefikLog.filePath=/var/log/traefik/traefik.log
      - --traefikLog.format=json
      - --accessLog.filePath=/var/log/traefik/access.log
      - --accessLog.format=json
    ports:
      - 8000:80
    networks:
      - traefik-net
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    labels:
      - "traefik.enable=true"
      - "traefik.port=8080"
      - "traefik.backend=traefik"
      - "traefik.frontend.rule=Host:traefik.lc"

  # Node application:
  web-app:
    image: containous/whoami:latest
    restart: always
    networks:
      - web-net
      - traefik-net
    labels:
      - "traefik.enable=true"
      - "traefik.port=80"
      - "traefik.backend=web-app"
      - "traefik.frontend.rule=Host:app.lc"

```

Chúng ta sử dụng:
- Traefik version 1.7 publish post 8000, dashboard của nó có thể xem tại trang `traefik.lc:8000`. Vì traefik có support log với format là json nên chúng ta sẽ tận dụng nó luôn. Do đó, json log sẽ được gửi tới Elasticsearch.
- Web app đơn giản, truy cập tại trang `app.lc:8000`, dùng luôn image mà Traefik sử dụng làm demo. Truy cập nó sẽ trả về response nội dung dạng như sau:
    ```
    Hostname: 8a6b580f199d
    IP: 127.0.0.1
    IP: 172.29.0.2
    IP: 172.27.0.3
    GET / HTTP/1.1
    Host: app.lc:8000
    User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Accept-Encoding: gzip, deflate
    Accept-Language: en-US,en;q=0.9,vi;q=0.8
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    X-Forwarded-For: 172.27.0.1
    X-Forwarded-Host: app.lc:8000
    X-Forwarded-Port: 8000
    X-Forwarded-Proto: http
    X-Forwarded-Server: f17b2b724b03
    X-Real-Ip: 172.27.0.1
    ```

## Setup Elastic Stack + Filebeat
Chúng ta sẽ setup bộ Elastic stack gồm Elasticsearch và Kibana cùng với Filebeat luôn. Đảm bảo services đang chạy bình thường trước khi setup cho elasticsearch nhận dữ liệu từ filebeat. Tất cả cấu hình docker cho stack này mình đặt chung trong một file gọi là `elastic.yml`.

```yaml:elastic.yml
version: '3.6'

networks:
  elastic-net:
    name: elastic-net
  traefik-net:
    name: traefik-net

services:
  # Search and Analytics engine:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.6.2
    restart: unless-stopped
    networks:
      - elastic-net
    expose:
      - 9200
    volumes:
      - .docker-data/elasticsearch:/usr/share/elasticsearch/data

  # GUI tool:
  kibana:
    image: docker.elastic.co/kibana/kibana:6.6.2
    depends_on:
      - elasticsearch
    restart: unless-stopped
    networks:
      - elastic-net
      - traefik-net
    labels:
      - "traefik.enable=true"
      - "traefik.port=5601"
      - "traefik.backend=kibana"
      - "traefik.frontend.rule=Host:kibana.lc"
    environment:
      ELASTICSEARCH_URL: http://elasticsearch:9200

  # Run filebeat in docker
  # https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html
  filebeat:
    image: docker.elastic.co/beats/filebeat:6.6.2
    user: root
    restart: unless-stopped
    # Disabling strict permission check:
    # https://www.elastic.co/guide/en/beats/libbeat/6.6/config-file-permissions.html
    command: ["--strict.perms=false"]
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - .docker-data/logs/traefik:/var/log/traefik
     - ./etc/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
    #  - /var/lib/docker/containers:/var/lib/docker/containers:ro
    expose:
      - 5601
    networks:
      - elastic-net
    environment:
      - ELASTICSEARCH_HOST=${ELASTICSEARCH_HOST:-elasticsearch}
      - KIBANA_HOST=${KIBANA_HOST:-kibana}
```

Việc setup có thể các bạn sẽ gặp một số vấn đề:
- Với Elasticsearch, không hiểu sao nó đòi full quyền cho thư mục data mình mount vào. chmod cho nó 777 là nó sẽ running.
- Đối với Filebeat, sẽ có vấn đề với permission của file cấu hình `filebeat.yml` khi sử dụng với docker. Đừng lo trong trường hợp này, giải pháp từ Elastics nói là thêm command --strict.perms=false để tắt nó như các bạn thấy.

Ngoài ra, chúng ta tạm thời bỏ qua nội dung file cấu hình `filebeat.yml`. Các bạn comment dòng đấy lại và chạy stack này lên. Hãy kiểm tra lại các service đã được chạy lên hoàn toàn. Giờ các bạn có thể truy cập vào `kibana.lc:8000` để xem trang dashboard của kibana. Mặc dù bây giờ chúng ta có gì cả.

![](https://images.viblo.asia/546ba75a-6545-4c07-b9b1-bd93adfc1943.png)

## Cấu hình Filebeat đọc Traefik logs
Trong file `elastic.yml` ở trên, mình có mount file log của traefik vào filebeat. Tạo input cho filebeat bằng các chỉ định đọc dữ liệu từ file traefik log.  Ngoài ra, nếu để ý bạn thấy dòng bị comment với nội dung: `/var/lib/docker/containers:/var/lib/docker/containers:ro`. Nếu bỏ comment, bạn có thể visualize toàn bộ logs của các service trong docker swarm lên kibana chứ không riêng gì traefik nữa. :D

```yaml:./etc/filebeat/filebeat.yml
# traefik logs:
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/traefik/access.log
      - /var/log/traefik/traefik.log
    # Parse json log:
    fields_under_root: true
    json.keys_under_root: true
    json.add_error_key: true
    json.message_key: log

# Docker autodiscover provider supports hints in labels (enable when using docker logs):
# https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html#configuration-autodiscover-hints
# filebeat.autodiscover:
#   providers:
#     - type: docker
#       hints.enabled: true

processors:
- add_cloud_metadata: ~

# Elasticsearch Output
output.elasticsearch:
  hosts: '${ELASTICSEARCH_HOSTS:elasticsearch:9200}'

# Kibana
setup.kibana:
  host: ${KIBANA_HOST}

# Xpack Monitoring
xpack.monitoring:
  enabled: true
  elasticsearch:

```

Bây giờ mount file cấu hình này cho Filebeat, trong docker nó ở thư mục `/usr/share/filebeat`. Sau đó recreate lại filebeat service:
```bash
docker-compose -f web.yml up -d --force-recreate filebeat
```

### Kết quả
![](https://images.viblo.asia/0e653689-ac2b-4b05-b10b-d049202a722c.png)

Traefik logs đã được index trực tiếp vào elasticsearch mà không cần qua logstash. Nhiều bạn sẽ phân vân việc có nên sử dụng logstash hay không? Bạn có thể tham khảo bài blog trên elastic.co để chọn ra câu trả lời của mình nhé! [Link tại đây](https://www.elastic.co/blog/should-i-use-logstash-or-elasticsearch-ingest-nodes).

Chúng ta cũng có thể chọn từng field cho table để tiện xem hơn, như này chẳng hạn:
![](https://images.viblo.asia/f2a731ba-bf06-40ec-9f9a-8423d2330de8.png)


## References
Một số tài liệu tham khảo phục vụ cho bài viết:
- https://docs.traefik.io/configuration/logs/#access-logs
- https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-module-traefik.html
- https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html
- https://www.elastic.co/guide/en/beats/libbeat/6.6/config-file-permissions.html
- https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-modules-quickstart.html#_prerequisites
- https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html#configuration-autodiscover-hints

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***