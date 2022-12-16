# Giới thiệu

Internet of Things (viết tắt là IoT) là một kịch bản của thế giới, khi mà mỗi đồ vật, con người được qua một mạng duy nhất mà không cần đến sự tương tác trực tiếp giữa người với người, hay người với máy tính. IoT đã phát triển từ sự hội tụ của công nghệ không dây, công nghệ vi cơ điện tử và Internet. Nói đơn giản là một tập hợp các thiết bị có khả năng kết nối với nhau, với Internet và với thế giới bên ngoài để thực hiện một công việc nào đó.

Thời đại IoT yêu cầu một giao thức kết nối mới để đảm bảo hỗ trợ đầy đủ cho các thiết bị vật lý thực tế. Để giải quyết vấn đề này, Message Queuing Telemetry Transport (MQTT) đang dần trở nên phổ biến.

# MQTT là gì?
## Định nghĩa

- MQTT (Message Queuing Telemetry Transport) là giao thức truyền thông điệp (message) theo mô hình publish/subscribe (cung cấp / thuê bao), được sử dụng cho các thiết bị IoT với băng thông thấp, độ tin cậy cao và khả năng được sử dụng trong mạng lưới không ổn định. Nó dựa trên một Broker (tạm dịch là “Máy chủ môi giới”) “nhẹ” (khá ít xử lý) và được thiết kế có tính mở (tức là không đặc trưng cho ứng dụng cụ thể nào), đơn giản và dễ cài đặt.

- MQTT là lựa chọn lý tưởng trong các môi trường như: 
    + Những nơi mà giá mạng viễn thông đắt đỏ hoặc băng thông thấp hay thiếu tin cậy.
    + Khi chạy trên thiết bị nhúng bị giới hạn về tài nguyên tốc độ và bộ nhớ.
    + Bởi vì giao thức này sử dụng băng thông thấp trong môi trường có độ trễ cao nên nó là một giao thức lý tưởng cho các ứng dụng M2M (Machine to Machine).
    
        MQTT cũng là giao thức được sử dụng trong Facebook Messenger
## Lịch sử hình thành 
- MQTT được phát minh bởi Andy Stanford - Clark (IBM) và Arlen Nipper (EUROTECH) cuối năm 1999 khi mà nhiệm vụ của họ là tạo ra một giao thức sao cho sự hao phí năng lượng và băng thông là thấp nhất để kết nối đến đường ống dẫn dầu thông qua sự kết nối của vệ tinh.
- Năm 2011, IBM và Eurotech đã trao lại MQTT cho một dự án của Eclipse có tên là Paho.
- Năm 2013 MQTT đã được đệ trình lên OASIS (Organization for the Advancement of Structured Information Standards) để chuẩn hóa.

![H1](https://images.viblo.asia/9ae73b22-f527-4c71-a5f0-af4e10b6be9f.png)

## Vị trí của MQTT trong mô hình IoT 

Một số ưu điểm nổi bật của MQTT như: băng thông thấp, độ tin cậy cao và có thể sử dụng ngay cả khi hệ thống mạng không ổn định, tốn rất ít byte cho việc kết nối với server và connection có thể giữ trạng thái open xuyên suốt, có thể kết nối nhiều thiết bị (MQTT client) thông qua một MQTT server (broker). Bởi vì giao thức này sử dụng băng thông thấp trong môi trường có độ trễ cao nên nó là một giao thức lý tưởng cho các ứng dụng IoT.
![H2](https://images.viblo.asia/58a59ccd-4d3c-4d84-bded-54b376b35e78.png)

## Tính năng, đặc điểm nổi bật
- Dạng truyền thông điệp theo mô hình Pub/Sub cung cấp việc truyền tin phân tán một chiều, tách biệt với phần ứng dụng.
- Việc truyền thông điệp là ngay lập tức, không quan tâm đến nội dung được truyền.
- Sử dụng TCP/IP là giao thức nền.
- Tồn tại ba mức độ tin cậy cho việc truyền dữ liệu (QoS: Quality of service)
    + QoS 0: Broker/client sẽ gửi dữ liệu đúng một lần, quá trình gửi được xác nhận bởi chỉ giao thức TCP/IP.
    + QoS 1: Broker/client sẽ gửi dữ liệu với ít nhất một lần xác nhận từ đầu kia, nghĩa là có thể có nhiều hơn 1 lần xác nhận đã nhận được dữ liệu.
    + QoS 2: Broker/client đảm bảo khi gửi dữ liệu thì phía nhận chỉ nhận được đúng một lần, quá trình này phải trải qua 4 bước bắt tay.
- Phần bao bọc dữ liệu truyền nhỏ và được giảm đến mức tối thiểu để giảm tải cho đường truyền.
## Ưu điểm của MQTT

Với những tính năng, đặc điểm nổi bật trên, MQTT mang lại nhiều lợi ích nhất là trong hệ thống SCADA (Supervisory Control And Data Acquisition) khi truy cập dữ liệu IoT.
- Truyền thông tin hiệu quả hơn.
- Tăng khả năng mở rộng.
- Giảm đáng kể tiêu thụ băng thông mạng.
- Rất phù hợp cho điều khiển và do thám.
- Tối đa hóa băng thông có sẵn.
- Chi phí thấp.
- Rất an toàn, bảo mật.
- Được sử dụng trong các ngành công nghiệp dầu khí, các công ty lớn như Amazon, Facebook, ....
- Tiết kiệm thời gian phát triển.
- Giao thức publish/subscribe thu thập nhiều dữ liệu hơn và tốn ít băng thông hơn so với giao thức cũ.
# Mô hình Pub/Sub và Cơ chế hoạt động của MQTT
## Mô hình Pub/Sub
### 1. Thành phần
- Client
    + Publisher - Nơi gửi thông điệp
    + Subscriber - Nơi nhận thông điệp
- Broker - Máy chủ môi giới

Trong đó Broker được coi như trung tâm, nó là điểm giao của tất cả các kết nối đến từ Client (Publisher/Subscriber). Nhiệm vụ chính của Broker là nhận thông điệp (message) từ Publisher, xếp vào hàng đợi rồi chuyển đến một địa điểm cụ thể. Nhiệm vụ phụ của Broker là nó có thể đảm nhận thêm một vài tính năng liên quan tới quá trình truyền thông như: bảo mật message,
lưu trữ message, logs, ....

Client thì được chia thành hai nhóm là Publisher và Subscriber. Client chỉ làm ít nhất một trong 2 việc là publish các thông điệp (message) lên một/nhiều topic cụ thể hoặc subscribe một/nhiều topic nào đó để nhận message từ topic này.

![H3](https://images.viblo.asia/2b763e46-9b53-4130-be29-8719d07035d6.png)

MQTT Clients tương thích với hầu hết các nền tảng hệ điều hành hiện có: MAC OS, Windows, Linux, Android, iOS, ....
### 2. Ưu điểm
- Kết nối riêng rẽ, độc lập.
- Khả năng mở rộng.
- Thời gian tách biệt (Time decoupling).
- Đồng bộ riêng rẽ (Synchronization decoupling).
### 3. Nhược điểm
- Máy chủ môi giới (Broker) không cần thông báo về trạng thái gửi thông điệp. Do đó không có cách nào để phát hiện xem thông điệp đã gửi đúng hay chưa.
- Publisher không hề biết gì về trạng thái của subscribe và ngược lại. Vậy làm sao chúng ta có thể đảm bảo mọi thứ đều ổn.
- Những kẻ xấu (Malicious Publisher) có thể gửi những thông điệp xấu, và các Subscriber sẽ truy cập vào những thứ mà họ không nên nhận.
## Cơ chế hoạt động của MQTT theo mô hình Pub/Sub

### 1. Tính chất và những đặc điểm riêng
- Tính chất:
    + Space decoupling (Không gian tách biệt)
    + Time decoupling (Thời gian tách biệt)
    + Synchronization decoupling (Sự đồng bộ riêng rẽ)
- Đặc điểm riêng:
    + MQTT sử dụng cơ chế lọc thông điệp dựa vào tiêu đề (subject-based)
    + MQTT có một tầng gọi là chất lượng dịch vụ (Quality of Services – QoS). Nó giúp cho dễ dàng nhận biết được là message có được truyền thành công hay không.
### 2. Cơ chế tổng quan
![H4](https://images.viblo.asia/2da0b26e-8eb3-475d-a683-c2e1ef9fb79a.png)

- MQTT hoạt động theo cơ chế client/server, nơi mà mỗi cảm biến là một khách hàng (client) và kết nối đến một máy chủ, có thể hiểu như một Máy chủ môi giới (broker), thông qua giao thức TCP (Transmission Control Protocol). Broker chịu trách nhiệm điều phối tất cả các thông điệp giữa phía gửi đến đúng phía nhận.
- MQTT là giao thức định hướng bản tin. Mỗi bản tin là một đoạn rời rạc của tín hiệu và broker không thể nhìn thấy. Mỗi bản tin được publish một địa chỉ, có thể hiểu như một kênh (Topic). Client đăng kí vào một vài kênh để nhận/gửi dữ liệu, gọi là subscribe. Client có thể subscribe vào nhiều kênh. Mỗi client sẽ nhận được dữ liệu khi bất kỳ trạm nào khác gửi dữ liệu vào kênh đã đăng ký. Khi một client gửi một bản tin đến một kênh nào đó gọi là publish.

### 3. Kiến trúc thành phần

![H5](https://images.viblo.asia/08c269b7-f083-4ebf-8fd4-15a621cdcf62.png)

- Thành phần chính của MQTT là Client (Publisher/Subscriber), Server (Broker), Sessions (tạm dịch là Phiên làm việc), Subscriptions và Topics.
- MQTT Client (Publisher/Subscriber): Clients sẽ subscribe một hoặc nhiều topics để gửi và nhận thông điệp từ những topic tương ứng.
- MQTT Server (Broker): Broker nhận những thông tin subscribe (Subscriptions) từ client, nhận thông điệp, chuyển những thông điệp đến các Subscriber tương ứng dựa trên Subscriptions từ client.
- Topic: Có thể coi Topic là một hàng đợi các thông điệp, và có sẵn khuôn mẫu dành cho Subscriber hoặc Publisher. Một cách logic thì các topic cho phép Client trao đổi thông tin với những ngữ nghĩa đã được định nghĩa sẵn. Ví dụ: Dữ liệu cảm biến nhiệt độ của một tòa
nhà.
- Session: Một session được định nghĩa là kết nối từ client đến server. Tất cả các giao tiếp giữa client và server đều là 1 phần của session.
- Subscription: Không giống như session, subscription về mặt logic là kết nối từ client đến topic. Khi đã subscribe một topic, Client có thể nhận/gửi thông điệp (message) với topic đó.

# Tổng kết

MQTT là giao thức gọn nhẹ được thiết kế chủ yếu để kết nối các thiết bị bị hạn chế nguồn trên các mạng băng thông thấp. Mặc dù nó đã tồn tại trong hơn một thập kỷ nhưng chỉ khi có sự ra đời của M2M (máy để truyền thông máy) và Internet of Things (IoT) mới làm cho nó trở thành một giao thức phổ biến.

Cảm ơn các bạn đã theo dõi bài viết của mình, ở bài viết tiếp theo, mình sẽ hướng dẫn các bạn [Tìm hiểu và cài đặt MQTT broker Mosquitto](https://viblo.asia/p/tim-hieu-ve-mqtt-mosquitto-broker-va-cach-cai-dat-yMnKMjgrZ7P) - một MQTT broker  nhỏ, nhẹ thường được sử dụng, các bạn cùng đón xem nhé :)))