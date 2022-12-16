# Python Exporter là gì?
Python exporter là công cụ được viết bằng Python giúp chúng ta chạy một web server chứa các thông số chúng ta đã thu thập được và biểu thị chúng ta theo một cách để Prometheus có thể hiểu được. Nếu các bạn chưa biết thì Prometheus là công cụ giám sát có hỗ trợ 2 cơ chế pull và push để lấy dữ liệu (metrics) từ các ứng dụng về, thường được kết hợp với Grafana để visualize lên thành các biểu đồ.

Nếu như các bạn đã quen với việc dựng các service database, web server, queue,... thì chắc không còn lạ gì với những công cụ giúp chúng ta xuất ra các thông số (metrics), dễ dàng có thể tìm thấy các công cụ được xây dựng sẵn cho từng ứng dụng với từ khóa "Tên ứng dụng + exporter". Tuy nhiên các công cụ được xây dựng sẵn thì sẽ xây dựng cho nhưng mô hình chung để đáp ứng được nhiều nhất những trường hợp sử dụng, nên việc thiếu đi những thông số đặc thù cho từng trường hợp là rất hay gặp. Chính vì vậy Python Exporter được sinh ra để giải quyết vấn đề này.
![image.png](https://images.viblo.asia/01e32e4d-0f5b-4091-a4ff-476be1c3e7cf.png)
# Các kiểu dữ liệu của Prometheus
Bởi vì Prometheus cung cấp các kiểu dữ liệu khác nhau để mô hình hóa trên các biểu đồ khác nhau nên chúng ta sẽ cần biết kiểu dữ liệu nào mình sẽ xử dụng cho từng trường hợp. Tại thời điểm này tháng 5/2022 thì Prometheus đang hỗ trợ 6 kiểu dữ liệu chính, ta sẽ đi qua từng kiểu dữ liệu với các cách sử dụng tương ứng:

## Counter
Đây là kiểu metric hoạt động như một bộ đếm, chỉ có thể tăng mà không thể giảm. Khi exporter chạy lại từ đầu thì giá trị của counter sẽ bị reset về 0. Khi expose metric counter ra ngoài thì tên sẽ được tự động thêm vế '_total ' vào phía sau
```
from prometheus_client import Counter
c = Counter('my_failures', 'Description of counter')
c.inc()     # Increment by 1
c.inc(1.6)  # Increment by given value
```

## Gauge
Đây là kiểu metric có thể tăng hoặc giảm, phù hợp set cho các thông tin có thể tăng giảm liên tục như số request/s
```
from prometheus_client import Gauge
g = Gauge('my_inprogress_requests', 'Description of gauge')
g.inc()      # Increment by 1
g.dec(10)    # Decrement by given value
g.set(4.2)   # Set to a given value
```

## Summary
 
Summary sẽ dùng để theo dõi độ trễ của một task, thời gian hoàn thành task đó.

```
from prometheus_client import Summary
s = Summary('request_latency_seconds', 'Description of summary')
s.observe(4.7)    # Observe 4.7 (seconds in this case)
```

## Histogram
Kiểu metric này sẽ theo dõi size và số lượng của sự kiện. Ví dụ ta muốn tìm số phần trăm hoặc số lượng request đến Server mất hơn 1s để trả lời.

```
from prometheus_client import Histogram
h = Histogram('request_latency_seconds', 'Description of histogram')
h.observe(4.7)    # Observe 4.7 (seconds in this case)
```

## Info
 
Kiểu metric là kiểu key - value thường dùng để lưu trữ thông tin về target

```
from prometheus_client import Info
i = Info('my_build_version', 'Description of info')
i.info({'version': '1.2.3', 'buildhost': 'foo@bar'})
```

## Enum
 
Kiểu metric này được dùng để theo dõi trạng thái của service hoặc task

```
from prometheus_client import Enum
e = Enum('my_task_state', 'Description of enum',
        states=['starting', 'running', 'stopped'])
e.state('running')
```

# Thực nghiệm

Như vậy chúng ta đã có những hiểu biết về kiểu dữ liệu của Prometheus, bây giờ chúng ta sẽ thực hành để giám sát một số thông tin.

**Nội dung thực nghiệm:** Thực hiện giám sát số người chơi đang online thông qua API có sẵn, thực hiện chạy web server ở port 8192 để expose ra metrics cho server Prometheus. Từ server Prometheus sẽ cấu hình để pull dữ liệu từ web server trên. Sử dụng Grafana để visualize data từ prometheus Server.

![viblo metrics.drawio.png](https://images.viblo.asia/6e919156-2e55-47bd-86d0-7cc17468fd90.png)

## Code

Nội dung API trả về: ![image.png](https://images.viblo.asia/562b5c8e-1f1d-41ee-968d-a7d6c1a8a25d.png)

Import một vài thư viện cần thiết
```
import requests, time
from prometheus_client import start_http_server, Gauge
```

Khai báo các biến global, ở đây vì để giám sát số lượng người chơi có tính chất tăng giảm nên ta chọn kiểu dữ liệu **Gauge** 

```
keys = ["sbSdp7SUm7eDk5ey326bztEvMbjTAasdsIByF", "vfKIyG9GZDBqZE0I3D555555kzIftu6mIjCD", "vLLifd1524ORZYJyZQPHEpbfUai7878zQA"]

total_player = Gauge('total_players', 'All players in 3 servers')
pvp_player = Gauge('pvp_players', 'Number of players in PVP server')
pve_player = Gauge('pve_players', 'Number of players in PVE server')
vanilla_player = Gauge('vanilla_players', 'Number of players in Vanilla server')
```

Thêm đối tượng Server
```
class Server:
    def __init__(self, name, player_online, max_players):
        self.name = name
        self.player_online = player_online
        self.max_players = max_players
```

Viết hàm giúp lấy thông tin từ API, set dữ liệu lấy được từ API vào biến player đã khai báo

```
def get_server_info():

    data = requests.get("https://unturned-servers.net/api/?object=servers&element=detail&key=" + keys[0]).json()
    serverPVE = Server(data["name"], data["players"], data["maxplayers"])
    pve_player.set(serverPVE.player_online)

    data = requests.get("https://unturned-servers.net/api/?object=servers&element=detail&key=" + keys[1]).json()
    serverPVP = Server(data["name"], data["players"], data["maxplayers"])
    pvp_player.set(serverPVP.player_online)

    data = requests.get("https://unturned-servers.net/api/?object=servers&element=detail&key=" + keys[2]).json()
    serverVanilla = Server(data["name"], data["players"], data["maxplayers"])
    vanilla_player.set(serverVanilla.player_online)

    total_player.set(serverPVE.player_online + serverPVP.player_online + serverVanilla.player_online)
```

Khởi động http server tại port 8192, viết thêm vòng while để liên tục cập nhật số players mới mỗi 1 phút

```
def main():
    start_http_server(8192)
    while True:
        get_server_info()
        time.sleep(60)

main()
```

Toàn bộ code có nội dung như sau:
```
import requests, time
from prometheus_client import start_http_server, Gauge

keys = ["sbSdp7SUm7eDk5ey326bztEvMbjTA15IByF", "vfKIyG9GZDBqZE0I3DwGoSLkzIftu6mIjCD", "vLLifd1524ORZYJyZQPHEpbfUaigppczQA"]

total_player = Gauge('total_players', 'All players in 3 servers')
pvp_player = Gauge('pvp_players', 'Number of players in PVP server')
pve_player = Gauge('pve_players', 'Number of players in PVE server')
vanilla_player = Gauge('vanilla_players', 'Number of players in Vanilla server')
class Server:
    def __init__(self, name, player_online, max_players):
        self.name = name
        self.player_online = player_online
        self.max_players = max_players

def get_server_info():

    data = requests.get("https://unturned-servers.net/api/?object=servers&element=detail&key=" + keys[0]).json()
    serverPVE = Server(data["name"], data["players"], data["maxplayers"])
    pve_player.set(serverPVE.player_online)

    data = requests.get("https://unturned-servers.net/api/?object=servers&element=detail&key=" + keys[1]).json()
    serverPVP = Server(data["name"], data["players"], data["maxplayers"])
    pvp_player.set(serverPVP.player_online)

    data = requests.get("https://unturned-servers.net/api/?object=servers&element=detail&key=" + keys[2]).json()
    serverVanilla = Server(data["name"], data["players"], data["maxplayers"])
    vanilla_player.set(serverVanilla.player_online)

    total_player.set(serverPVE.player_online + serverPVP.player_online + serverVanilla.player_online)

def main():
    start_http_server(8192)
    while True:
        get_server_info()
        time.sleep(60)

main()
```

Khá đơn giản đúng không, sau khi chạy thì truy cập địa chỉ localhost:8192 ta có thông tin như sau:
![image.png](https://images.viblo.asia/e77bc102-4c9c-4443-a063-06d9fddbb653.png)

ở gần cuối ta đã thấy thông tin về số players (pve_players, pvp_players, vanilla_players) như kỳ vọng.
## Cấu hình Prometheus 
Tại file config prometheus.yml ta thêm job để scrape dữ liệu từ web server đã chạy như hình:
![image.png](https://images.viblo.asia/8433ddee-a952-46bb-85e1-784d727a6abe.png)

Sau đó ta cần restart service Prometheus để cập nhật job mới. Bạn có thể check xem Prometheus đã cào được dữ liệu về chưa ở dashboard thường chạy port 9090.

## Vẽ biểu đồ trên Grafana
Ta chọn tạo thêm dashboard nếu chưa có dashboard, sau đó chọn add Panel ở góc trên bên phải
![image.png](https://images.viblo.asia/6867cc86-2fe6-4efd-a6e3-38b95b5bbe64.png)

Tiếp tục ta điền vào metrics cần visualize như hình:
![image.png](https://images.viblo.asia/456b6056-3d89-46e3-a856-f831a5283ef4.png)

Apply thêm vào Dashboard có sẵn xong nhìn cũng tạm ổn :))))
![image.png](https://images.viblo.asia/372186d5-ce6d-499e-9b86-4f5ecb2d6efd.png)
# Kết
Bài viết đã giúp các bạn viết tool bằng python expose ra bất cứ thông tin nào bạn muốn monitor thông qua Prometheus. Hy vọng bài viết này sẽ giúp bạn phần nào đó trong công việc.

# Tài liệu tham khảo
https://github.com/prometheus/client_python