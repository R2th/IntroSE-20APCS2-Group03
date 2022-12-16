# Giới thiệu

Ở bài biết trước, mình đã giới thiếu đến các bạn về [giao thức MQTT](https://viblo.asia/p/mqtt-la-gi-vai-tro-cua-mqtt-trong-iot-V3m5WL3bKO7) - một giao thức kết nối có ý nghĩa quan trọng trong môi trường IoT. MQTT có cơ chế hoạt động theo mô hình Pub/Sub, gồm 2 thành phần chính: MQTT client (Publisher/Subscriber) và MQTT broker (máy chủ mô giới). Chi tiết mời các bạn đọc thêm tại [đây](https://viblo.asia/p/mqtt-la-gi-vai-tro-cua-mqtt-trong-iot-V3m5WL3bKO7#_mo-hinh-pubsub-va-co-che-hoat-dong-cua-mqtt-7).

Có rất nhiều loại MQTT broker khác nhau, được viết bằng nhiều loại ngôn ngữ lập trình khác nhau. Trong bài viết này, mình sẽ giới thiệu đến các bạn một MQTT broker khá phổ biến là Mosquitto, cũng như cách cài đặt của nó trên Ubuntu.
# Mosquitto và ưu/nhược điểm của nó

Mosquitto là một MQTT Broker mã nguồn mở cho phép thiết bị truyền nhận dữ liệu theo giao thức MQTT version 5.0, 3.1.1 và 3.1 – Một giao thức nhanh, nhẹ theo mô hình publish/subscribe được sử dụng rất nhiều trong lĩnh vực Internet of Things. Mosquitto cung cấp một thư viện viết bằng ngôn ngữ C để triển khai các MQTT Client và có thể dễ dàng sử dụng bằng dòng lệnh: “mosquitto_pub” và “mosquitto_sub”. Ngoài ra, Mosquitto cũng là một phần của [Eclipse Foundation](https://www.eclipse.org/), là dự án [ iot.eclipse.org](https://iot.eclipse.org/) và được tài trợ bởi [cedalo.com](https://cedalo.com/)

- Ưu điểm: 
    + Ưu điểm nổi bật của Mosquitto là tốc độ truyền nhận và xử lí dữ liệu nhanh, độ ổn định cao, được sử dụng rộng rãi và phù hợp với những ứng dụng embedded.
    + Mosquitto rất nhẹ và phù hợp để sử dụng trên tất cả các thiết bị.
    + Ngoài ra, Mosquitto cũng được hỗ trợ các giao thức TLS/SSL (các giao thức nhằm xác thực server và client, mã hóa các message để bảo mật dữ liệu).
- Nhược điểm:

    + Một số nhược điểm của mosquitto là khó thiết kế khi làm những ứng dụng lớn và ít phương thức xác thực thiết bị nên khả năng bảo mật vẫn chưa tối ưu.
# Cài đặt Mosquitto broker với Ubuntu và test

Để cài đặt một MQTT server sử dụng Mosquiito broker với Ubuntu, trước hết chúng ta sẽ cần một server Ubuntu có quyền truy cập `root` và một cổng `TCP:1883` được mở trên firewall.
## Cài đặt Mosquitto broker
- Với Ubuntu 16.04 trở lên, ta thực hiện theo các bước sau:
```
sudo apt-get update
sudo apt-get install mosquitto
```
- Với các phiên bản Ubuntu < 16.04, ta thực hiện:
```
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt-get install mosquitto
```

Service Mosquitto sẽ được start ngay sau khi cài đặt và các message được gửi đến qua port 1883.

![](https://images.viblo.asia/2527e813-187d-40b9-aa49-c66eb8bd73c0.png)
![](https://images.viblo.asia/0fd83911-c611-4c88-9add-b4eed6940ab4.png)

## Cài đặt Mosquitto client và test Mosquitto broker

- Cài đặt mosquitto client
```
sudo apt-get install mosquitto-clients
```

Mosquitto clients sẽ giúp chúng ta dễ dàng kiểm tra hoạt động của một MQTT broker Mosquito thông qua dòng lệnh. Chúng ta sẽ thực hiện test Publish và Subcribe đến Mosquitto broker vừa được cài đặt. Chúng ta sẽ sử dụng 2 cửa sổ dòng lệnh, một để thực hiện publish message đến broker, một để thực hiện subclribe message từ broker.

Một `topic` được broker sử dụng như là các nhãn để lọc message cho từng client kết nối đến broker. Một client subcribe một `topic` nào sẽ chỉ nhận được các message được các client khác publish vào đúng `topic` đó.

- Ở một cửa sổ dòng lệnh, chúng ta sẽ thực hiện subcribe đến một topic `test` như sau:
```
mosquitto_sub -t "test"
```
Option `-t` sẽ theo sau là tên một `topic`.

- Ở một cửa sổ dòng lệnh khác, chúng ta sẽ thực hiện publish một vài message cho chủ để `test`
```
mosquitto_pub -m "Hello! Viblo" -t "test"
mosquitto_pub -m "message from mosquitto_pub client" -t "test"
mosquitto_pub -m "Hihi" -t "test"
```
Option `-m` được thêm vào ở đây sẽ theo sau là 1 message được publish đến broker theo topic.
- Ở phía cửa sổ dòng lệnh thực hiện subcribe topic, chúng ta sẽ thấy được các message:

![](https://images.viblo.asia/a98f1193-f122-4329-98f6-bcbcba7e2791.png)

Như vậy, nếu có kết quả tương tự như trên, chúng ta đã hoàn thành việc cài đặt và kiểm tra một MQTT broker Mossquitto rồi :) 
# Đặt password bảo mật cho Mosquitto broker server

Mosquitto còn cung cấp một cơ chế đặt password để bảo mật cho broker server với `mosquitto_passwd`
```
sudo mosquitto_passwd -c /etc/mosquitto/passwd mqtt_user_name
Password: mqtt_password
```
Tiếp đó chúng ta sẽ tạo một file config cho mossquitto để trỏ đến file password mà chúng ta vừa tạo với nội dung như sau:
```
allow_anonymous false
password_file /etc/mosquitto/passwd
```
Để hoàn thành đặt password, chúng ta thực hiện resatrt service mosquitto:
```
sudo systemctl restart mosquitto
```
Sau khi đặt user, password, từ client muốn publish hoặc subcribe đến Mosquitto broker, chúng ta sẽ phải thông qua khai báo user và password như sau:
```
mosquitto_sub -t "test" -u "mqtt_user_name" -P "mqtt_password"
```
```
mosquitto_pub -m "Hello! Viblo" -t "test" -u "mqtt_user_name" -P "mqtt_password"
```
# Tổng kết

Trên đây là hướng dẫn cài đặt một MQTT broker mosquitto đơn giản với các config mặc định sẵn có. Để biết thêm về các option và co fig của mosquitto, hãy tham khảo thêm tại [đây](https://mosquitto.org/documentation/).

Ngoài ra, còn nhiều các MQTT broker khác, khi có nhu cầu sử dụng, chúng ta hãy căn cứ vào yêu cầu ứng dụng để lựa chọn cho phù hợp.