Việc giám sát máy chủ (server) gần như là việc tối quan trọng của một DevOps Engineer. Một bộ công cụ giúp trực quan hoá và cảnh báo sẽ giải quyết kịp thời các vấn đề xảy ra khi một trong những server gặp vấn đề sẽ giúp việc quản lý cũng như vận hành được dễ dàng hơn. Cho đến thời điểm hiện tại thì đã có rất nhiều dịch vụ cho phép thực hiện được điều đó như Zabbix, Nagios XI,...

Trong bài viết này mình sẽ mô phỏng cách thức làm việc của một dịch vụ như thế ( theo hệ thống sẵn có đã được mình thực hiện ). Ý tưởng này đã được research và áp dụng trên thực tế. Mặc dù bài viết này chỉ xoay quanh những ý tưởng và thiết kế. Những cái nhìn tổng quan nhất sẽ được thể hiện rõ và cũng mong muốn người đọc hiểu được những giá trị cốt lõi của hệ thống.

   
### **Tổng quan hệ thống**

Tính năng được xây dựng

- Giám sát thông tin tài nguyên của server 
- Logger (Cảnh báo khi server gặp vấn đề về tài nguyên)
- Quản lý và giám sát tiến trình ( process và users ) 


***Giám sát thông tin tài nguyên của server***
Các tài nguyên được giám sát ở đây bao gồm thông tin và trạng thái của CPU, RAM, DISK, các thông tin sẽ được hiển thị ở trên monitor nhằm trực quan hóa và hiển thị tập trung theo thời gian thực những thông tin cơ bản và trạng thái của các server

***Logging***
Logger ở đây đóng vai trò cảnh báo khi server gặp vấn đề về tài nguyên. Khi các phần cứng bị quá tải thì sẽ gửi cảnh báo chi tiết lên monitor sớm nhất, từ đó sẽ dễ dàng xác định server gặp vấn đề để đưa ra hướng khắc phục.

***Quản lý và giám sát tiến trình ( process và users )***
Những tiến trình chạy trên server, chiếm bao nhiêu tài nguyên hệ thống? Tiến trình này của user nào chạy? Đây cũng là mục tiêu cần được giám sát nhiều nhất. Hệ thống sẽ giúp quan sát được các trạng thái của tiến trình và thực hiện thao tác kill hoặc terminate tiến trình được chỉ định.

### Xây dựng hệ thống
![image.png](https://images.viblo.asia/b17edd43-ed9e-41f7-8d8d-2481b5cdc8f5.png)

Qua kiến trúc trên thì nhận thấy rõ ràng mọi thứ đều diễn ra tập trung ở collector. Bộ collector ở đây đóng vai trò như một công cụ được cài đặt ở phía server, tiến hành thu thập và phân tích tài nguyên của chính server đó. Những dữ liệu thu thập sẽ được push về MQTT.
MQTT (Message Queuing Telemetry Transport) là 1 message queue theo mô hình publish/subscribe, khi mà những messages được publish bởi server thì MQTT broker sẽ quản lý tập trung và phân phát những message vào các topic tương ứng.
Collector ở đây đảm nhận 2 vai trò vừa là publisher và cũng như là subscriber. Publisher thu thập và phân tích tài nguyên dữ liệu của server đã kết nối, subscriber đứng đấy chờ đợi những thao thác ở trên client (monitor) đối với các tiến trình (process), các thao tác như (kill, terminate) tiến trình trên server chỉ định sẽ được thực hiện.
    
***Tại sao là MQTT, SocketIO cũng có thể làm tốt?***

SocketIO. Khi nhắc đến các realtime communication application thời nay thì chắc hẳn không ít nghĩ đến nó, vì sự dễ sử dụng và scale theo chiều ngang bằng redis. Nhưng tại sao mình lại không dùng socketIO hệ thống:
- Mức chi phí cho message được gửi lên là nhiều hơn MQTT
- Không có cơ chế QoS (Quality of Service). Cơ chế này dùng để điều chỉnh mức độ dịch vụ phù hợp với độ tin cậy mạng và logic ứng dụng của nó. cơ chế này rất có ích trong thế giới của IoT, chúng giúp cho những thiết bị, có chất lượng mạng chập chờn  (như những thiết bị tầng thấp) giải quyết được vấn đề về thất lạc gói tin khi truyền tải.
- Khó khăn trong việc đồng bộ trạng thái của client và server khi việc mất kết nối xảy ra


Còn với MQTT, thiết kế của nó giảm thiểu được các vấn đề trên, nhất là khi lượng dữ liệu gửi lên monitor liên tục:

- Lý tưởng để truyền tìn hiệu cho các thiết bị hạn chế có băng thông thấp, độ trễ cao hoặc mạng không đáng tin cậy.
- Dữ liệu được gửi từ các server lên một monitor tập trung theo thời gian thực là rất lớn, vì vậy, theo thời gian thì việc dữ liệu đó được gửi lên liên tục là việc cần phải quan tâm. MQTT được thiết kế để phù hợp cho các thiết bị IoT ( Internet of Things ) nên chi phí để giao tiếp giữa các thiết bị là tối thiểu, việc đó giúp cho lưu lượng gửi dữ liệu được gửi lên monitor sẽ được giảm thiểu đáng kể.
- Việc quản lý các topic và các subtopic được dễ dàng, trong hệ thống này thì bạn chỉ cần dùng QoS ở mức 0: "Fire and forget" có nghĩa là các message khi được publish vào các topic tương ứng thì sẽ được "forget" ngay sau khi publish, do đó sẽ giảm thiểu độ trễ thời gian giữa 2 lần publish gần nhất.

***Cách thức hoạt động của collector với hệ thống***

![image.png](https://images.viblo.asia/75453fb1-04d3-4e62-b2f1-ed0eaf4ae4bb.png)

Luồng hoạt động trên giải thích chi tiết hoạt động của collector đối với hệ thống. Như đã thấy thì ở đây collector chịu trách nhiệm thu thập tài nguyên của server và tiến trình, khi thu thập xong sẽ publish những data đã thu thập dưới dạng message gửi đến MQTT Broker với topic là định danh của server đó (ở đây mình chọn địa chỉ IP của máy) trong mạng. Trong topic IP đó sẽ có những endpoint chỉ định những message data nào được gửi tới (resource, process, observer).
Trong đó:
- Resource: Tiếp nhận những message data là thông tin phần cứng của máy tính (RAM, CPU, Disk, ...) và trạng thái hiện tại của nó
- Process: Tiếp nhận những message data là thông tin những tiến trình đang chạy và user của server đó
- Observer: Tiếp nhận những message data là các hành động của monitor tới các tiến trình đang chạy (terminate, kill)

### **Vậy đối với trường hợp muốn kill một process của 1 server bất kì trên monitor thì mình đã xử lý như thế nào?**

Như đã nói ở trên, thì collector đảm nhận cả 2 vai trò là cả pub/sub và khi collector được cài đặt thành công vào server thì collector tự động subscribe vào 1 topic ( ở đây được đặt tên là observe ), và sẽ quan sát toàn bộ những tác động của monitor đối với process trên chính server đó. Khi monitor thực hiện kill hoặc terminate process trên server, monitor sẽ publish một message trong đó có chứa PID xuống observe topic, và sau đó thì việc thao tác với process qua PID sẽ được thực hiện bởi 1 luồng chạy riêng biệt bên trong collector.

### Lời kết

Những ứng dụng dạng monitor streaming ngày nay ngày càng được sử dụng nhiều vì các thiết bị cần được giám sát ngày càng được tăng, đối với MQTT nói riêng và IoT nói chung ( những thiết bị được gắn trên oto, smart home, ... ). Bài viết này là một ví dụ về cách sử dụng MQTT protocol nói riêng và cách thực hiện và ứng dụng của Streaming data nói chung, hi vọng độc giả hiểu được theo phương diện tổng quan nhất.
	Chúc ngủ ngon ^^!
    
    
### Tài liệu tham khảo


https://www.educba.com/mqtt-vs-websocket/
https://www.hivemq.com/