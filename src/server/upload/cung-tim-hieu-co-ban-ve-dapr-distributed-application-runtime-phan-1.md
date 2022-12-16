Chào mọi người đây là bài viết đầu tiên của mình trên Viblo, chắc chắn sẽ còn nhiều sai sót, mong mọi người có thể đóng góp bằng cách comment bên dưới nhé cảm ơn mọi người 😍. Công cụ hôm nay mình muốn giới thiệu cho mọi người đó là Dapr - Distributed Application Runtime.
# Dapr là gì?
Distributed Application Runtime - Dapr (đọc là đáp, đê áp hay đáp pơ 😄) là một mã nguồn mở  được phát triển bởi **Microsoft** vào 2019. Hiện tại Dapr đã release bản SDKs hỗ trợ các ngôn ngữ Java, .NET, Python và không thể thiếu Go 😍. 
Mã nguồn của Dapr được viết bằng Go, bạn nào có hứng thú thì có thể tìm hiểu ở Github của dự án nhé.

* Trang chủ: https://dapr.io/ 
* Github: https://github.com/dapr/dapr/

# Architecture của Dapr
![image.png](https://images.viblo.asia/5a825b42-fee5-4f8b-a0b2-92ab05274a0c.png)
Các bạn có thể hiểu Dapr sử dụng **Sidecar pattern**, có nghĩa là các services của bạn và Darp sẽ hoạt động độc lập, và Dapr sidecar sẽ chạy cùng với ứng dụng của bạn. Bạn có thể gọi tới Dapr thông qua HTTP request hoặc thông qua gRPC, mặc định nếu bạn sử dụng SDKs thì Dapr đã implement bằng gRPC nhằm tối ưu tốc độ.

Dapr cung cấp rất nhiều "đồ chơi" như trên hình giúp các bạn thuận tiện trong quá trình lập trình Microservice. Không những thế với mỗi "đồ chơi" đó còn có hàng tá công nghệ đằng sau, ví dụ nếu muốn dùng **State Management** bạn có thể dùng Redis, Aerospike, Apache Cassandra, Memcached, In Memory, ....

Một điểm rất hay mà mình thích ở Dapr đó là khi mình muốn đổi công nghệ của một component trong Dapr thì mình không phải sửa lại một dòng code nào, mình chỉ cần chỉnh lại file config, nghe hơi khó hiểu nhỉ 😄. 

Ví dụ như trong hệ thống của mình có dùng Pub/Sub broker thông qua Dapr và sử dụng **Kafka**. Bỗng một ngày anh Tech Lead bảo: "Em ơi đừng dùng **Kafka** nữa đổi qua **RabbitMQ** đi em tại vì nó có con thỏ cute hơn ><", thì các bạn ko cần phải chật vật sửa lại code nữa mà thay vào đó là vào file `pubsub.yaml` và đổi lại để thoả mãn thú vui của anh TL.

Chi tiết về các công nghệ đằng sau mỗi component các bạn có thể xem tại đây nhé: https://docs.dapr.io/reference/components-reference/

# Cài đặt CLI
Linh tinh, luyên thuyên thế đủ rồi bây giờ mình xắn tay áo lên bắt đầu nhé!

Đầu tiên các bạn cần cài đặt Dapr CLI:
- Linux / MacOS:
```shell
wget -q https://raw.githubusercontent.com/dapr/cli/master/install/install.sh -O - | /bin/bash
```

- Window:
```shell
powershell -Command "iwr -useb https://raw.githubusercontent.com/dapr/cli/master/install/install.ps1 | iex"
```

- Hoặc cài đặt từ Homebrew:
```shell
brew install dapr/tap/dapr-cli
```

Tiếp theo chúng ta chếch xem đã cài đặt thành công chưa nhé:
```shell
dapr -v
```
```shell
         __
    ____/ /___ _____  _____
   / __  / __ '/ __ \/ ___/
  / /_/ / /_/ / /_/ / /
  \__,_/\__,_/ .___/_/
              /_/

===============================
Distributed Application Runtime

Usage:
  dapr [command]

Available Commands:
  completion     Generates shell completion scripts
  components     List all Dapr components. Supported platforms: Kubernetes
  configurations List all Dapr configurations. Supported platforms: Kubernetes
  dashboard      Start Dapr dashboard. Supported platforms: Kubernetes and self-hosted
  help           Help about any command
  init           Install Dapr on supported hosting platforms. Supported platforms: Kubernetes and self-hosted
  invoke         Invoke a method on a given Dapr application. Supported platforms: Self-hosted
  list           List all Dapr instances. Supported platforms: Kubernetes and self-hosted
  logs           Get Dapr sidecar logs for an application. Supported platforms: Kubernetes
  mtls           Check if mTLS is enabled. Supported platforms: Kubernetes
  publish        Publish a pub-sub event. Supported platforms: Self-hosted
  run            Run Dapr and (optionally) your application side by side. Supported platforms: Self-hosted
  status         Show the health status of Dapr services. Supported platforms: Kubernetes
  stop           Stop Dapr instances and their associated apps. . Supported platforms: Self-hosted
  uninstall      Uninstall Dapr runtime. Supported platforms: Kubernetes and self-hosted
  upgrade        Upgrades a Dapr control plane installation in a cluster. Supported platforms: Kubernetes

Flags:
  -h, --help      help for dapr
  -v, --version   version for dapr

Use "dapr [command] --help" for more information about a command.
```
Nếu nó hiện như trên là đã oke rùi nhé, nếu hiện ko tồn tại lệnh dapr thì bạn thử mở lại terminal, nếu đã thực hiện đủ các bước mà vẫn không được thì để lại 1 comment bên dưới nha.

# Khởi tạo Dapr
Để khởi tạo Dapr chúng ta cần cài đặt Docker, bạn nào chưa cài thì cài dô chứ gì nữa, hoặc nếu bạn không muốn cài thì có thể cài đặt Dapr bản không cần docker tại [đây](https://docs.dapr.io/operations/hosting/self-hosted/self-hosted-no-docker/). Tiếp theo chúng ta thực hiện init Dapr:
```shell
dapr init
```

Khi init Dapr thì sẽ bao gồm:
- Chạy một container Redis để dùng cho **State Management** và **Message broker**.
- Chạy một container Zipkin để tracing cho hệ thống.
- Tạo một thư mục Components mặc định để định nghĩa các components nói trên.
- Chạy Dapr container.

Tiếp theo các bạn chạy `docker ps` hoặc xem trong Docker desktop thấy 3 thằng này đã chạy là oke nhé
![image.png](https://images.viblo.asia/f167bfbf-0df4-401b-81da-53756ab93e76.png)

# Trải nghiệm Dapr
### Bước 1: Chạy Dapr sidecar
Các bạn chạy lệnh sau nhé:
```shell
dapr run --app-id myapp --dapr-http-port 3500
```
Giải thích một chút thì ý nghĩa của các flag như sau:
* `--app-id`: ở đây là tên app của bạn, và nó phải là unique tức không được trùng với app khác
* `--dapr-http-port`: là port để Dapr chạy HTTP API (tương tự sẽ có `--dapr-grpc-port`)

Chi tiết hơn về các flag mình sẽ nói thêm ở các phần sau.

```shell
180ms Admin ❯ dapr run --app-id myapp --dapr-http-port 3500
WARNING: no application command found.
Starting Dapr with id myapp. HTTP Port: 3500. gRPC Port: 6039
Checking if Dapr sidecar is listening on HTTP port 3500
time="2022-10-25T22:52:12.4304437+07:00" level=info msg="starting Dapr Runtime -- version 1.9.0 -- commit fdce5f1f1b76012291c888113169aee845f25ef8" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4304437+07:00" level=info msg="log level set to: info" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4314438+07:00" level=info msg="metrics server started on :6040/" app_id=myapp instance=Admin-PC scope=dapr.metrics type=log ver=1.9.0
time="2022-10-25T22:52:12.4334443+07:00" level=info msg="standalone mode configured" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4334443+07:00" level=info msg="app id: myapp" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4334443+07:00" level=info msg="mTLS is disabled. Skipping certificate request and tls validation" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.460744+07:00" level=info msg="local service entry announced: myapp -> 192.168.1.182:6041" app_id=myapp instance=Admin-PC scope=dapr.contrib type=log ver=1.9.0
time="2022-10-25T22:52:12.460744+07:00" level=info msg="Initialized name resolution to mdns" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.461249+07:00" level=info msg="loading components" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4812529+07:00" level=info msg="component loaded. name: pubsub, type: pubsub.redis/v1" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4820076+07:00" level=info msg="waiting for all outstanding components to be processed" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4863854+07:00" level=info msg="detected actor state store: statestore" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4870947+07:00" level=info msg="component loaded. name: statestore, type: state.redis/v1" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4870947+07:00" level=info msg="all outstanding components processed" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4870947+07:00" level=info msg="gRPC proxy enabled" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4876022+07:00" level=info msg="enabled gRPC tracing middleware" app_id=myapp instance=Admin-PC scope=dapr.runtime.grpc.api type=log ver=1.9.0
time="2022-10-25T22:52:12.4876022+07:00" level=info msg="enabled gRPC metrics middleware" app_id=myapp instance=Admin-PC scope=dapr.runtime.grpc.api type=log ver=1.9.0
time="2022-10-25T22:52:12.4886316+07:00" level=info msg="API gRPC server is running on port 6039" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4891473+07:00" level=info msg="enabled metrics http middleware" app_id=myapp instance=Admin-PC scope=dapr.runtime.http type=log ver=1.9.0
time="2022-10-25T22:52:12.4891473+07:00" level=info msg="enabled tracing http middleware" app_id=myapp instance=Admin-PC scope=dapr.runtime.http type=log ver=1.9.0
time="2022-10-25T22:52:12.4896571+07:00" level=info msg="http server is running on port 3500" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4896571+07:00" level=info msg="The request body size parameter is: 4" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4896571+07:00" level=info msg="enabled gRPC tracing middleware" app_id=myapp instance=Admin-PC scope=dapr.runtime.grpc.internal type=log ver=1.9.0
time="2022-10-25T22:52:12.4896571+07:00" level=info msg="enabled gRPC metrics middleware" app_id=myapp instance=Admin-PC scope=dapr.runtime.grpc.internal type=log ver=1.9.0
time="2022-10-25T22:52:12.4896571+07:00" level=info msg="internal gRPC server is running on port 6041" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4896571+07:00" level=warning msg="App channel is not initialized. Did you configure an app-port?" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.4907023+07:00" level=info msg="actor runtime started. actor idle timeout: 1h0m0s. actor scan interval: 30s" app_id=myapp instance=Admin-PC scope=dapr.runtime.actor type=log ver=1.9.0
time="2022-10-25T22:52:12.4907023+07:00" level=warning msg="app channel not initialized, make sure -app-port is specified if pubsub subscription is required" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.491218+07:00" level=warning msg="failed to read from bindings: app channel not initialized " app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.491218+07:00" level=info msg="dapr initialized. Status: Running. Init Elapsed 57ms" app_id=myapp instance=Admin-PC scope=dapr.runtime type=log ver=1.9.0
time="2022-10-25T22:52:12.528362+07:00" level=info msg="placement tables updated, version: 0" app_id=myapp instance=Admin-PC scope=dapr.runtime.actor.internal.placement type=log ver=1.9.0
Checking if Dapr sidecar is listening on GRPC port 6039
Dapr sidecar is up and running.
You're up and running! Dapr logs will appear here.
```

### Bước 2: Lưu state:
Để lưu một state các bạn mở terminal khác (cẩn thận stop Dapr xong lại bảo sao ko chạy được 😅) và chạy lệnh sau:
```shell
curl -X POST -H "Content-Type: application/json" -d '[{ "key": "name", "value": "Le Quoc Binh"}]' http://localhost:3500/v1.0/state/statestore
```

Hoặc bạn có thể dùng Postman hay các app khác gọi HTTP request vào.

### Bước 3: Get state vừa lưu
Để get state bạn vừa lưu vào thông qua **State management API** với key `name` thì ở cùng một terminal các bạn gõ:
```shell
curl http://localhost:3500/v1.0/state/statestore/name 
```

Nếu dapr trả về trường value mà các bạn đã truyền vào ở **Bước 2** thì có nghĩa là bạn đã Lưu & Get state thành công rồi đó 😄.

### Bước 4: Kiểm tra state của bạn được lưu như thế nào trong Redis
Chúng ta cần truy cập vào trong container Redis đang chạy và sử dụng Redis CLI để kiểm tra state của chúng ta:
```shell
docker exec -it dapr_redis redis-cli
```

List ra list key mà dapr đã lưu vào redis:
```shell
keys *
```

Output: 

`1) "myapp||name"`

Xem giá trị của state đó bằng cách chạy lệnh sau:
```shell
hgetall "myapp||name"
```

Output: 

```
1) "data"
2) "\"Le Quoc Binh\""
3) "version"
4) "1"
```

Thoát Redis CLI:
```shell
exit
```

### Bước 5: Xoá state vừa tạo
Các bạn chạy lệnh sau:
```shell
curl -v -X DELETE -H "Content-Type: application/json" http://localhost:3500/v1.0/state/statestore/name
```


# Tổng kết
Vậy là qua phần này mình đã giới thiệu cho mọi người Dapr là gì, và những thứ liên quan tới nó, do phần này đã dài nên tạm thời chúng ta chưa code gì ở phần này, sang các phần khác mình sẽ đi sâu hơn vào Dapr nhé 😄. Có thắc mắc gì mọi người có thể để lại ở phần bình luận bên dưới. Cảm ơn mọi người đã đọc hết bài viết, nhớ nhấn Like và Subcribe à nhầm Up vote và Follow mình nhenn cảm ơn mọi người nhiều 😍.