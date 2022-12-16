Xin chào mọi người, bài viết này mình lại đề cập đôi chút về Traefik - một phần mềm opensource mà mình đã từng giới thiệu trên Viblo. Thời điểm đó, phiên bản mới nhất của Traefik ở version `v1.7`. Sau một thời gian dài phát triển thì vào tháng 10 năm 2019, Traefik đã được release phiên bản v2 với rất nhiều thay đổi cũng như cải tiến. Hãy cũng mình khám phá xem Traefik v2 khá khẩm gì hơn qua bài viết này nhé!

## Traefik v1.7 - Điểm qua

Điểm qua lại một tẹo! Traefik là một reverse-proxy, thân thiện với kiến trúc micro services - giúp chúng ta dễ dàng hơn trong việc deploy các service của hệ thống. Được sử dụng kết hợp với Docker, K8s... Cấu hình Traefik để publish một web service với Docker thông qua docker label nên việc triển khai khá đơn giản:

```yaml:traefik-v1.yml
version: '3.7'

services:
  traefik:
    image: traefik:v1.7
    command:
      - --logLevel=INFO
      - --api
      - --docker
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 80:80
    labels:
      - traefik.port=8080
      - traefik.frontend.rule=Host:traefik.lc

  ctf:
    image: containous/whoami:v1.4.0
    labels:
      - traefik.frontend.rule=Host:ctf.viblo.lc

  code:
    image: containous/whoami:v1.4.0
    labels:
      - traefik.frontend.rule=Host:code.viblo.lc

```

Bạn có thể dựng thử stack đơn giản ở trên nhé:
```bash
docker-compose -f traefik-v1.yml up -d
```

Ở Traefik v1.7 thì chúng ta biết tới có ba khái niệm chính đó là `Entrypoint`,  `Frontend` và `Backend`:
- Entrypoint: Các điểm kết nối giữa Traefik và "the world" như tên entrypoint, listen port bao nhiêu, ssl hay không?...
- Frontend: Chứa các khai báo có quy tắc để xác định cách routing sang backend hợp lý.
- Backend: Mapping tương ứng với service, hỗ trợ loadbalancing.

## Traefik v2.x

Traefik v2 bây giờ ngoài support static configuration file ở format TOML thì còn support thêm cả YAML. Nếu bạn là fan của YAML thì quả thực xin chúc mừng nhé!

Trong phần tiếp theo dưới đây chúng ta sẽ cùng khám phá những điều mới trên v2 và migrate stack nhỏ bên trên sang v2.

### Provider

![](https://images.viblo.asia/fc6e5d36-ca85-4809-a9cf-368053ce6bcd.png)


Mặc dù Traefik v1 cũng support khá nhiều Infrastructure như: Docker, Kubernetes, Amazon ECS... nhưng các cấu hình còn khá rời rạc. Sang v2, tất cả đã được quy về một mối gọi là *Provider*. Ý tưởng là Traefik sẽ query các API của provider để tìm các thông tin cho việc định tuyến (routing). Các provider được support gồm:

| Provider | Type | Configuration Type |
| --- | --- | --- |
| [Docker](https://docs.traefik.io/providers/docker/) | Orchestrator | Label |
| [Kubernetes](https://docs.traefik.io/providers/kubernetes-crd/) | Orchestrator | Custom Resource |
| [Consul Catalog](https://docs.traefik.io/providers/consul-catalog/) | Orchestrator | Label |
| [Marathon](https://docs.traefik.io/providers/marathon/) | Orchestrator | Label |
| [Rancher](https://docs.traefik.io/providers/rancher/) | Orchestrator | Label |
| [File](https://docs.traefik.io/providers/file/) | Manual | TOML/YAML format |

Trong bài này, mình sử dụng Traefik + Docker nên mình sẽ dùng provider là Docker. Ngoài ra, một số provider chưa được hỗ trợ nhưng có lẽ sẽ được cung cấp trong thời gian tới gồm:

| # | Provider |
| --- | --- |
| 1 | Azure Service Fabric |
| 2 | BoltDB |
| 3 | Consul |
| 4 | DynamoDB |
| 5 | ECS |
| 6 | Etcd |
| 7 | Eureka |
| 8 | Mesos |
| 9 | Zookeeper |

Do đó, hãy cân nhắc kỹ lưỡng nếu bạn có dự định upgrade Traefik lên v2 nhé! :wink:

### Frontend, Backend are dead?

![](https://images.viblo.asia/bfbc5715-97cc-4768-8b79-814e9e87eb81.png)

Ngoài Provider ở trên, Traefik cũng viết lại và tổ chức lại một số các thành phần trong đó có `Frontend` và `Backend` - Chúng đều đã được *khai tử*. Và thay thế sẽ là các thành phần mới gồm các router, service và các middleware.
- Router: Vai trò tương tự như `Frontend` ở v1 giúp detect xem request sẽ cần điều hướng tới *"Service"* nào với mỗi router sẽ nhắm vào một service tương ứng.
- Service: đảm nhận vai trò tương tự `Backend` ở v1, chỉ cách để incomming request sẽ tới được các *service thực tế* như mong muốn của `Router`. Và nó vẫn đi kèm các cấu hình load balancer giống v1.
- Middleware: Vai trò y chang trong Laravel :v Nó được sử dụng để tinh chỉnh các request trước khi router gửi chúng sang service, hoặc trước response từ services trả về cho client.

Chính vì sự thay đổi lớn này nên toàn bộ các config cho việc routing đều bị thay đổi. Chi tiết các rule/matcher sẽ bị thay đổi như nào ở trang https://docs.traefik.io/routing/routers/#rule. Một số thay đổi matcher để check request cơ bản gồm:

|Rule|Description|
|--- |--- |
|Headers(\`key\`, \`value\`)|Nếu header chứa `key=value`|
|HeadersRegexp(\`key\`, \`regexp\`)|Nếu header có `key` với `value` thỏa mãn regex `regexp` |
|Host(\`domain-1\`, ...)|Request tới một trong các domain `domain-1`,...|
|HostRegexp(\`traefik.io\`, \{subdomain:[a-z]+}.traefik.io\`, ...)|Request tới domain thỏa mãn bởi regex |
|Method(\`GET\`, ...)|Check theo HTTP method |
|Path(\`/path\`, \`/articles/{category}/{id:[0-9]+}\`, ...)|Kiểm tra nếu URL chưa path trùng khớp với `/path` hoặc regex |
|PathPrefix(\`/products/\`, \`/articles/{category}/{id:[0-9]+}\`)|Kiểm tra URL có path bắt đầu bằng `/products/` hoặc regex |
|Query(\`foo=bar\`, \`bar=baz\`)|Nếu request có query string trùng khớp: `?foo=bar` hoặc `?bar=baz` |

### Traefik v2 "lột xác"

Cũng chính vì việc tái cấu trúc như trên nên v2 có rất nhiều breaking change với v1. Bây giờ mình sẽ convert cấu hình Traefik v1 lên v2 xem khác bọt gì không nhé!

```yaml:traefik-v2.yml
version: '3.7'

services:
  traefik:
    image: traefik:v2.1
    command:
      - --log.level=INFO
      - --api.insecure=true
      - --providers.docker
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 80:80
    labels:
      - traefik.http.routers.rule=Host(`traefik.lc`)

  ctf:
    image: containous/whoami:v1.4.0
    labels:
      - traefik.http.routers.ctf.rule=Host(`ctf.viblo.lc`)

  code:
    image: containous/whoami:v1.4.0
    labels:
      - traefik.http.routers.code.rule=Host(`code.viblo.lc`)

```

Chạy thử:

```bash
docker-compose -f traefik-v2.yml up -d
```

Thay vì sử dụng label `traefik.frontend.rule=Host:ctf.viblo.lc` thì bây giờ chúng ta sẽ sử dụng `traefik.http.routers.ctf.rule=Host(``ctf.viblo.lc``)`. Đó là một breaking change trong việc routing. Chúng ta có thể xem các label mới tại trang [Docker Provider](https://docs.traefik.io/providers/docker/) và [Routing with Docker](https://docs.traefik.io/routing/providers/docker/#port).

Một số docker label rất hay dùng vẫn được giữ nguyên giống v1 như:
- traefik.enable=true // override lại config `exposedByDefault`
- traefik.docker.network=traefik-net // chỉ định rõ docker network

Ngoài ra, Traefik v2 cũng đã lột xác với một bộ áo mới rất hiện đại, bố cục rõ ràng và bắt mắt:

![](https://images.viblo.asia/3093581d-05b9-45ff-ab65-b79291c97d2b.png)
<p align="center">Traefik Dashboard</p>

![](https://images.viblo.asia/1a43ab3c-d482-4cee-89a4-ca059c1a0655.png)
<p align="center">Traefik Routers</p>

![](https://images.viblo.asia/94b11693-ad08-40d6-8e27-5e3f37b8f178.png)
<p align="center">Traefik Service Detail, load lablancer với 5 server</p>

### HTTPS redirection

Config để redirect từ HTTP sang HTTPS bị loại bỏ khỏi `entryPoints`. Thay vào đó, nó sẽ được áp dụng trong `Router` bằng cách sử dụng một trong các middleware: [RedirectRegex](https://docs.traefik.io/middlewares/redirectregex/) hoặc  [RedirectScheme](https://docs.traefik.io/middlewares/redirectscheme/). Ví dụ sử dụng RedirectScheme với docker:

```yaml:v2
# Redirect to https
labels:
  - "traefik.http.middlewares.test-redirectscheme.redirectscheme.scheme=https"
```


### ACME (Let's Encrypt)

ACME là config để sử dụng Let's Encrypt để tự động tạo cert key cho https free. Phiên bản này sẽ thay config key `acme` bằng `certificatesResolvers`. 

```toml:v1
# static configuration
defaultEntryPoints = ["web-secure","web"]

[entryPoints.web]
address = ":80"
  [entryPoints.web.redirect]
  entryPoint = "webs"
[entryPoints.web-secure]
  address = ":443"
  [entryPoints.https.tls]

[acme]
  email = "your-email-here@my-awesome-app.org"
  storage = "acme.json"
  entryPoint = "web-secure"
  onHostRule = true
  [acme.httpChallenge]
    entryPoint = "web"
```

```toml:v2
# static configuration
[entryPoints]
  [entryPoints.web]
    address = ":80"

  [entryPoints.web-secure]
    address = ":443"

[certificatesResolvers.sample.acme]
  email = "your-email@your-domain.org"
  storage = "acme.json"
  [certificatesResolvers.sample.acme.httpChallenge]
    # used during the challenge
    entryPoint = "web"
```

### Traefik Logs

Có một thay đổi nhỏ đối với cấu hình logs của Traefik. Lưu ý, có nhiều loại cấu hình logs như: Traefik log, access log, metric logs... và phần này mình đang đề cập tới là Traefik log nhé. Ở version 2, tất cả các config cho traefik log bây giờ đã vào trong `[log]`; `logLevel` sẽ rút gọn thành `level`, trông như sau:

```toml:v1
logLevel = "INFO"

[traefikLog]
    filePath = "/path/to/file"
    format = "json"

```

```toml:v2
[log]
    level = "INFO"
    filePath = "/path/to/file"
    format = "json"

```

### Tracing

Traefik vẫn implement tuân thủ theo các đặc tả của `OpenTracing`.  V2 sẽ hỗ trợ nhiều distributed tracing system hơn:

| Distributed System | Version 1 | Version 2 |
| --- | --- | --- |
| Jaeger | :white_check_mark: | :white_check_mark: |
| Zipkin | :white_check_mark: | :white_check_mark: |
| Datadog | :white_check_mark: | :white_check_mark: |
| Instana | :x: | :white_check_mark: |
| Haystack | :x: | :white_check_mark: |

Cùng với đó là một thay đổi nhỏ trong config. Key `backend` sẽ không còn trên version 2:

```toml:v1
# static configuration
[tracing]
  backend = "jaeger"
  servicename = "tracing"
  [tracing.jaeger]
    samplingParam = 1.0
    samplingServerURL = "http://12.0.0.1:5778/sampling"
    samplingType = "const"
    localAgentHostPort = "12.0.0.1:6831"
```

```toml:v2
# static configuration
[tracing]
  servicename = "tracing"
  [tracing.jaeger]
    samplingParam = 1.0
    samplingServerURL = "http://12.0.0.1:5778/sampling"
    samplingType = "const"
    localAgentHostPort = "12.0.0.1:6831"
```

### Metrics

Metrics trong version 2 sẽ support cho các services. Ngoài ra, Traefik vẫn support metric cho entry point giống version 1. Còn về config thì vẫn giống v1.

```toml:v2
# static configuration
[metrics.prometheus]
  buckets = [0.1,0.3,1.2,5.0]
  entryPoint = "metrics"
```

Version 2 vẫn hỗ trợ 4 system gồm:

| Backend System | Version 1 | Version 2 |
| --- | --- | --- |
| Datadog | :white_check_mark: | :white_check_mark: |
| InfluxDB | :white_check_mark: | :white_check_mark: |
| Prometheus | :white_check_mark: | :white_check_mark: |
| StatsD | :white_check_mark: | :white_check_mark: |

### Không còn config ở Root Level

Nếu bạn để ý các config thay đổi ở trên thì sẽ nhận ra rằng các `key` ở root level đều đã bị chuyển vào trong một group nào đó. Thực sự thì phiên bản này đã loại bỏ toàn bộ các key ở `root level` trong file config. Chẳng hạn:

```toml:v1
# static configuration
checkNewVersion = false
sendAnonymousUsage = true
logLevel = "DEBUG"
insecureSkipVerify = true
rootCAs = [ "/mycert.cert" ]
maxIdleConnsPerHost = 200
providersThrottleDuration = "2s"
AllowMinWeightZero = true
debug = true
defaultEntryPoints = ["web", "web-secure"]
keepTrailingSlash = false
```

```toml:v2
# static configuration
[global]
  checkNewVersion = true
  sendAnonymousUsage = true

[log]
  level = "DEBUG"

[serversTransport]
  insecureSkipVerify = true
  rootCAs = [ "/mycert.cert" ]
  maxIdleConnsPerHost = 42

[providers]
  providersThrottleDuration = 42
```

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***