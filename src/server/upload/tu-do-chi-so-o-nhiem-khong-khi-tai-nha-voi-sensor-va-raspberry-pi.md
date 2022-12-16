![](https://images.viblo.asia/ddf68522-6212-496a-bc7f-37eb281db7e3.png)
# Mở đầu

Tình hình ô nhiễm không khí có vẻ đã lắng xuống sau khi không thấy báo chí nhắc đến nhiều nhưng thực tế thì ô nhiễm vẫn còn đó. Trước khi suy nghĩ đến việc mua một máy lọc không khí cho gia đình thì có thể bạn sẽ thắc mắc, không biết chỉ số ô nhiễm không khí AQI (__Air Quality Index__) của nhà mình hiện đang ở mức nào :thinking:. Mình cũng hoang mang như vậy đó :joy:. May mắn có người bạn có ship hàng từ taobao về, mình đã đặt mua 1 cái sensor đo bụi và setup thử. Sau khi cặm cụi khoảng 5 tiếng, việc hoàn toàn không hề khó như mình tưởng, Mình xin chia sẻ quá trình cũng như công cụ thực hiện trong bài viết này. Hi vọng là ai cũng có thể tự đo cho bản thân và gia đình mình.

Toàn bộ source code trong bài viết được public tại: [https://github.com/vigov5/aqi_meter](https://github.com/vigov5/aqi_meter)

Kết quả thực tế tại điểm đo Phú Đô: http://aqi-phudo.surge.sh/

# Chuẩn bị
![](https://images.viblo.asia/696b8a09-bffb-458f-abe0-16cdbdba8d4d.png)

Những thứ bạn cần chuẩn bị
- Sensor đo bụi trong không khí để tính toán AQI. Ở đây mình dùng sensor: __Nova PM sensor SDS011__ sử dụng lase để đo, tính chính xác cao. Bạn có thể mua trên Shopee hoặc Taobao. Mình mua với giá 330K/sensor.
    -  https://shopee.vn/M%C3%B4-%C4%91un-c%E1%BA%A3m-bi%E1%BA%BFn-b%E1%BB%A5i-pm2.5-sds011-i.143793918.2354606092
    -  https://m.intl.taobao.com/detail/detail.html?spm=a230r.1.14.33.12fb4a17AcGaVj&id=526375973012&ns=1&abbucket=7

![](https://images.viblo.asia/2ae97139-f192-4afa-95cd-d318944eef18.jpg)https://images.viblo.asia/2ae97139-f192-4afa-95cd-d318944eef18.jpg

- Một con __Raspberry Pi__ để chạy và lập lịch đo cho sensor, đặt tại địa điểm cần đo. Mình dùng model Raspberry Pi 3 Model B+ (có sẵn Wifi + Ethernet). Bạn có thể cài sẵn hệ điều hành [Raspbian](https://www.raspberrypi.org/downloads/raspbian/).

![](https://images.viblo.asia/bb6d2354-fff6-4341-8926-5a174353c695.jpg)

Nếu không có Raspberry Pi, bạn có thể sử dụng máy tính cũ đặt tại nhà nhưng phải đảm bảo là nó chạy 24/7 :sunglasses:
- Một __VPS server__ để lưu trữ dữ liệu đo và hosting cho trang hiển thị kết quả. Mình đang chạy blog trên server của Digital Ocean với phí 5$ một tháng (1 CPU, 2GB RAM) nên dùng luôn. Bạn có thể đăng ký tại [đây](https://m.do.co/c/c775bb36bf74)
- Một chút skill về chạy lệnh terminal, python, coding, docker :joy:

# Thực hiện
## Cài đặt InfluxDB

### Cài đặt DB ban đầu

Để tiện lợi cho việc truy vấn cũng như lưu trữ sau này, mình dùng [__InfluxDB__](https://www.influxdata.com), một hệ cơ sở dữ liệu chuyên dùng cho lưu trữ dữ liệu dạng time series.

Trước hết chúng ta sẽ tạo ra 3 user:
- User __root__: full quyền
- User __sensor__: sẽ do sensor quản lý, chịu trách nhiệm ghi dữ liệu vào trong DB
- User __readonly__: nhiệm vụ truy vấn và hiển thị dữ liệu lên trang web (chỉ có duy nhất quyền đọc)

Mình sẽ dùng docker và docker-compose để quản lý việc chạy InfluxDB. Việc cài đặt thì coi như là bài tập cho người đọc :D

Tạo thư mục  `db` trên server Digital Ocean rồi tạo file `docker-compose.yml` như sau (nhớ thay đổi password cho phù hợp nhé):
```
version: "3.5"

services:
  influxdb:
    image: influxdb
    environment:
      - INFLUXDB_ADMIN_USER=root
      - INFLUXDB_ADMIN_PASSWORD=root_password
      - INFLUXDB_DB=aqi_mesurement
      - INFLUXDB_USER=sensor
      - INFLUXDB_USER_PASSWORD=sensor_password
    volumes:
      - ./db:/var/lib/influxdb
    ports:
      - 8086:8086
```

Và chạy lệnh `docker-compose up -d`. Vậy là chúng ta đã có 2 user.

### Thêm DB

Chạy lệnh

```sh
pip install influxdb==5.2.3
```

để cài đặt package `influxdb` cho `python3` và chạy (thay thế `IP_SERVER` bằng IP của server Digital Ocean):

```
$ python
>>> from influxdb import InfluxDBClient
>>> client = InfluxDBClient('IP_SERVER', 8086, 'root', 'root_password', 'aqi_mesurement')
>>> client.create_database('aqi_mesurement')
```

### Thêm người dùng chỉ có quyền đọc

Chạy 2 lệnh đơn giản sau để thêm nhé:

```
curl 'http://IP_SERVER:8086/query?p=root_password&u=root&db=aqi_mesurement' --data-urlencode "q=CREATE USER readonly WITH PASSWORD 'readonly'"
curl 'http://IP_SERVER:8086/query?p=root_password&u=root&db=aqi_mesurement' --data-urlencode "q=GRANT READ ON aqi_mesurement TO readonly"
```

## Cài đặt sensor

### Kết nối sensor với Raspberry Pi

![](https://images.viblo.asia/04824f9b-d957-440f-8fae-4a5316021b34.jpg)

- Sau khi bóc team sensor, thì bạn sẽ thấy gồm có 2 phần chính: Phần vuông vuồng là phần đo, gồm phần đỏ trong hình trên là quạt và một ống thoát khí, chú ý để 2 phần này thông thoáng, không bị bịt chắn. Phần thứ 2 là cổng kết nối với 1 đầu là USB (phần màu xanh), bạn cắn đầu này vào cổng USB trên Raspberry Pi
- Tại màn hình terminal Raspberry gõ lệnh `dmesg` và kiểm tra kết quả:

```bash
$ dmesg 
[ 5.559802] usbcore: registered new interface driver usbserial 
[ 5.559930] usbcore: registered new interface driver usbserial_generic 
[ 5.560049] usbserial: USB Serial support registered for generic 
[ 5.569938] usbcore: registered new interface driver ch341 
[ 5.570079] usbserial: USB Serial support registered for ch341-uart 
[ 5.570217] ch341 1–1.4:1.0: ch341-uart converter detected 
[ 5.575686] usb 1–1.4: ch341-uart converter now attached to ttyUSB0
```

ta sẽ kiểm tra được  thiết bị được kết nối vào `ttyUSB0`, nghĩa là đường dẫn của thiết bị sẽ là `/dev/ttyUSB0`

Ảnh thực tế:

![](https://images.viblo.asia/ab01924f-b6aa-4858-b31c-90f2f04bd8b6.jpg)

### Cài đặt script

Tạo file `requirements.txt`:

```
python-aqi==0.6.1
influxdb==5.2.3
git+git://github.com/ikalchev/py-sds011
```

Cài đặt môi trường cho script:

```
pip3 install -r requirements.txt
```

Tạo một scrip tên `aqi_client.py` để thực hiện việc đo (nhớ thay đổi các giá trị cấu hình ở đầu file cho phù hợp):

```python
import time
import datetime
from sds011 import SDS011
import aqi
from influxdb import InfluxDBClient

DEV_PATH = '/dev/ttyUSB0'
HOST = 'IP_SERVER'
PORT = 8086
USER = 'sensor'
PASSWORD = 'sensor_password'
DATABASE = 'aqi_mesurement'
PLACE = 'home'


def mesure():
    sensor = SDS011(DEV_PATH, use_query_mode=True)
    print('Sleep device...')
    sensor.sleep(sleep=True)  # Turn off fan and diode
    print('Wake-up device...')
    sensor.sleep(sleep=False)  # Turn on fan and diode
    print('Mesure for 30 secs...')
    time.sleep(30)  # Allow time for the sensor to measure properly
    print('Query data...')
    result = sensor.query()
    print('Sleep device...')
    sensor.sleep()  # Turn off fan and diode

    return result if result else (0, 0)


if __name__ == '__main__':
    pm25, pm10 = mesure()
    aqi = int(aqi.to_aqi([
        (aqi.POLLUTANT_PM25, pm25),
        (aqi.POLLUTANT_PM10, pm10),
    ]))
    print('Result: AQI: {}, PM2.5: {}, PM10: {}'.format(aqi, pm25, pm10))

    now = datetime.datetime.now().replace(microsecond=0).isoformat()
    json_body = [
        {
            'measurement': 'aqi',
            'tags': {
                'place': PLACE,
            },
            'time': now,
            'fields': {
                'aqi': aqi,
                'pm25': pm25,
                'pm10': pm10,
            }
        }
    ]

    client = InfluxDBClient(HOST, PORT, USER, PASSWORD, DATABASE)
    client.write_points(json_body)
    print('Done...')
```

Script sẽ có nhiệm vụ:

- Định kỳ bật sensor lên, để sensor chạy 30 giây sau đó lấy kết quả đo, rồi lại sleep sensor. Vì tuổi thọ sensor là 8000 giờ (theo file spec) và chúng ta cũng không cần đo liên tục nên làm như trên sẽ giúp kéo dài tuổi thọ thiết bị.
- Gửi dữ liệu đo lên DB influxDB ở trên server

Chúng ta cần thiết lập thêm cron job để định kỳ chạy script mỗi 5 phút 1 lần. Ví dụ với đường dẫn của script ở `/home/pi/aqi/aqi_client.py` ta cấu hình như sau:

```
*/5 * * * * python3 /home/pi/aqi/aqi_client.py >> /tmp/aqi.log
```

Save lại và kiểm tra xem có log request gửi đến ko (chạy `docker logs container_id_of_influxdb`)

```
[httpd] 42.112.192.68 - sensor [04/Nov/2019:07:20:37 +0000] "POST /write?db=aqi_mesurement HTTP/1.1" 204 0 "-" "python-requests/2.21.0" 993f3ecf-fed3-11e9-88a3-0242ac120002 1261
```

## Hiển thị kết quả lên web-app

Với dữ liệu đã có trong DB, việc query hoặc visualize là tuỳ ở từng người. Đơn giản nhất là chạy một docker [__Grafana__](https://hub.docker.com/r/grafana/grafana/) với data source là Influx DB, ta có thể truy vấn kết quả như sau:
![](https://images.viblo.asia/1aba98db-c20d-4d15-b36f-2f6bfcaa2ea8.png)

Mình thì viết nhanh một web-app bằng __[VueJS](https://vuejs.org/)__ sử dụng __[Tailwind CSS](https://tailwindcss.com/)__ để style lại cho đẹp :heart_eyes: để cứ 5 phút sẽ lấy dữ liệu từ server thông qua user __readonly__ và hiển thị.
Trước hết clone repo [https://github.com/vigov5/aqi_meter](https://github.com/vigov5/aqi_meter):

```
git clone git@github.com:vigov5/aqi_meter.git
```

Cài đặt các package

```
yarn install
```

Copy file `.env.sample` thành `.env` và chỉnh sửa lại thông số

```
# config your URL to InfluxDB
VUE_APP_DB_URL=http://user:password@host:post/db
VUE_APP_PLACE=My Home
VUE_APP_LOCATION=Ciy, Country
```

Chạy `yarn serve` để xem kết quả trên local hoặc dùng 1 trang cho phép hosting các trang tĩnh như [__Surge__](https://surge.sh/) để đẩy code local lên:

```sh
yarn build && surge dist aqi-phudo.surge.sh
```

Kết quả cuối cùng (như hình vẽ đầu bài viết): [http://aqi-phudo.surge.sh/](http://aqi-phudo.surge.sh/)

# Kết luận
![](https://images.viblo.asia/9b350f3e-62ae-4414-8ddb-fcabe44b5c28.png)

Thiết bị mình đang đặt ở trong phòng tầng 2 (thường đóng kín cửa) mà chỉ số cũng không được tốt cho lắm, gấp 2 lần chỉ số khuyến nghị. Có lẽ đã đến lúc phải cân nhắc mua máy lọc không khí thật rồi :cold_sweat:.
Hi vọng sau bài này sẽ có thêm điểm đo nữa mọc lên, bổ sung thêm những điểm đo mới cho hệ thống của thành phố của chúng ta :D

The End~

"Xung quanh anh toàn là bụi ! Êi ! Mênh mông toàn là bụi !"
# Tham khảo

- https://hackernoon.com/how-to-measure-particulate-matter-with-a-raspberry-pi-75faa470ec35
- https://aqicn.org/sensor/sds011/