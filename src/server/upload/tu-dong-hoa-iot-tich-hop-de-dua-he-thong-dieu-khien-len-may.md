***Lại là IoT?*** 

Không.
Đầu tiên mình khẳng đinh rằng đây không phải là một bài viết thuần về IoT. Bài viết ở link sau sẽ giải thích cho các bạn.
https://en.wikipedia.org/wiki/Internet_of_things
Đây sẽ là chỗ mình kể lể than vãn về quá trình tích hợp IoT và tự động hóa trong thời gian đầu bắt đầu nghiên cứu về IoT và IIoT. 
Cũng như chia sẻ về hướng đi thích hợp để tích hợp IoT và tự động hóa công nghiệp.
Mọi chia sẻ của mình đều xuất phát từ việc tự nghiên cứu, còn các giải pháp tương tự của hãng đều đã có nhưng chưa được tích hợp nhiều do rất tốn kém về chi phí.

***Công nghiệp thì liên quan gì IoT?***

Có.
Công nghiệp hiện đại vận hành dựa trên máy móc được điều khiển bằng máy tính công nghiệp với độ tin cậy cao, kết nối ổn định và có thể sử dụng lâu dài.
Hơn nữa bản chất của công nghiệp vẫn là Things và kết nối các thiết bị này lên internet là xu thế chung hiện nay.
![](https://images.viblo.asia/980296c9-43ff-4552-be34-51df216e7f7b.jpg)
nguồn: https://blog.econocom.com/

Tuy nhiên.
Đến hiện tại chúng ta chưa thấy hoặc rất ít hệ thống điều khiển tích hợp với điện toán đám mây hay internet.
Lí do là các hệ thống công nghiệp được xây dựng lên bằng các máy móc thiết bị vô cùng đắt đỏ, quy trình vận hành khắt khe nên phải đảm bảo việc hệ thống luôn an toàn và ổn định.
Các loại truyền thông công nghiệp hiện đại đều phải đáp ứng độ trễ thấp và sự an toàn bảo mật thông tin tối đa. Do đó việc đưa một hệ thống trị giá cả triệu đô la lên internet và phụ thuộc vào nó là quá nguy hiểm.
Vậy làm sao để vẫn có thể tích hợp hệ thống điều khiển với IoT hay điện toán đám mây mà vẫn đảm bảo các yêu cầu khắt khe trên.

***Tự động hóa kết hợp IoT tại sao không***

Tự động hóa công nghiệp phải chính thức bắt đầu từ những năm 1947 trong khi đó IoT mới bắt đầu phổ biến từ những năm 2000. Thời điểm này các hệ thống tự động hóa công nghiệp đã trở nên tin cậy và mang lại giá trị thực tế cho toàn nhân loại. Về bản chất tự động hóa cũng là kết nối các Things lại với nhau thông qua các phương thức truyền tin khác nhau, trước đây đa số chúng được kết nối với máy tính điều khiển trung tâm thông qua các kết nối vật lí như RS-485, 232, Analog ... Và máy tính trung tâm xử lý rồi phản hồi việc điều khiển hệ thống. Sau khi các phương thức truyền thông digital phát triển thì modbus TCP hay OPC UA, EtherCat dần thay thế và mang lại tốc độ xử lý cao và chính xác.
![](https://images.viblo.asia/24fe474b-2719-46bb-b782-d89a4fe9ea24.jpg)
nguồn: https://www.harting.com/

Tương tự với IoT các things được kết nối với nhau thông qua kết nối internet. Nghe có vẻ khá vui, vậy thì ngại gì mà không thử?

***Điều khiển mọi thứ thông qua Internet***

Khi bắt đầu nghiên cứu về IoT mình được biết đến cơ chế pubsub tương tự như OPC-UA từ message broker và ý tưởng đầu tiên của mình là tại sao không xây dựng một cái gì đó giống OPC-UA mà nó phải IoT một xíu. Đại khái như phải nhẹ hơn và cũng phải ổn định và có thể kết nối đa thiết bị đa nền tảng  ... Muốn thì nhiều nhưng lúc lựa chọn thì đúng là nhiều thật, không biết chọn cái nào. Kafka, RabbitMQ hay MQTT message broker và với tâm thế một đứa mới tìm hiểu mình đã chọn MQTT. Bắt đầu bằng việc Mosquitto lên local rồi dùng nó để kết nối thử đến các client khác nhau như Node-Red hay viết Script connect thử. Đặc điểm của nó là nhanh và dễ setup và nhẹ. Setup xong broker thì phải làm sao để kết nối thiết bị với message broker. Lúc này mình bắt đầu tìm hiểu về IoT Gatewaly và nhận rằng mấy con máy tính nhúng đều được tận dụng làm Gateway và chúng chỉ có một tính năng đơn giản là chuyển đổi kiểu dữ liệu từ A sang B. Dễ vậy thì tại sao không tự code =)). 
Vậy là mình mày mò code cái gateway với python để chuyển đổi từ modbus TCP sang MQTT và dĩ nhiên làm ngược lại thì cũng tương tự.
Xem lại thì mình đã có mọi thứ kết nối qua Internet thông qua cái message broker kia. Ok done thử nghiệm 1. Kết quả khá khả quan có vẻ mọi thứ hoạt động khá ok và áp dụng thực tế được.
Nhưng khi deploy MQTT broker lên VPS thì mình lại thấy connect này khá bất ổn, phụ thuộc vào internet nên rất dễ tạch giữa chừng. Khó áp dụng cho các hệ thống điều khiển tự động hoàn toàn.

***Đưa hệ thống lên Cloud***

Thử với message broker thấy không ổn định nên mình quyết định thử với Cloud, lựa chọn đầu tiên của mình là IBM lí do là vì có Freetrial :)).
Khi này IBM có cấp tài khoản Lite và có thể dung IBM Bluemix free giới hạn lượng truy cập. Mình vẫn sử dụng lại hệ thống cũ nhưng thay message broker bằng IBM Cloud Service mọi thứ hoạt động tương tự nhưng mình có thể board để xem các thông tin hệ thống. Lúc này não bắt đầu nảy số kiểu data ngon như này sao không làm dashboard cho sếp xem :). Rồi mình dùng Board của Bluemix để dựng board data đẩy lên nó đẹp và sinh động hơn mấy cái SCADA của mình thường làm bằng WinCC hay Winform. Dĩ nhiên là việc đưa hệ thống lên cloud nó vẫn bị vướng những bất lợi như lúc dùng VPS nhưng thứ mình thu lại được chính là hướng phát triển mà mình đã chọn sau đó.
![](https://images.viblo.asia/de32f77e-f62c-4899-91ac-f8fab0a77791.png)
nguồn: https://community.ibm.com/

***Xây dựng hệ thống giám sát từ xa trên đám mây***

Sau quá trình cố gắng điều khiển hệ thống công nghiệp qua internet mình đã học được rằng hệ thống tự động vẫn nên ưu tiên tính ổn định. Và thứ cần được thu thập phân tích đó là data. Data là vô giá và data trong công nghiệp lại càng có giá khi mỗi cái máy mỗi cái đèn đều được hiển thị trực quan lên chart về lượng điện tiêu thụ, tốc độ quay thì hầu như chúng ta sẽ biết hệ thống vận hành như thế nào. Đúng vậy mình đã thu thập hết data từ hệ thống thông qua IoT, bất kì thông số nào cũng đều được gửi lên đám mây để phân tích, hiển thị và lưu trữ. Nó thực sự mở ra một chân trời mới cho các nhà quản lý và vận hành, PLM giờ đã realtime và trực quan hơn bao giờ hết. Với số data đó mình có thể dùng cho AI hay digitalTwin đều được. Với AWS việc tích hợp data của mình lại càng dễ với một board Grafana và Prometheus mình thu thập các metrics để hiển thị lên board, lưu dữ liệu vào DynamoDB, thu thập data thông qua AWS IoT, xử lý backend bằng Lambda ... Sau này khi được làm việc với dự án thực tế thì chúng mình đã áp dụng hết vào. Mọi thứ khá lí tưởng.
![](https://images.viblo.asia/25443478-9464-4a8f-8dde-48a3d1c1180c.png)
nguồn: https://docs.aws.amazon.com/

***Kết lại***

Tích hợp hệ thống tự động với điện toán đám mây hay IoT là xu thế hiện nay và tích hợp chúng lại với nhau một cách hiệu quả sẽ mang lại lợi ích đáng kể cho doanh nghiệp. Hy vọng với chút chia sẻ của mình các bạn mới trong lĩnh vực IoT và IIoT sẽ tìm thấy được một hướng đi thích hợp trọng việc số hóa và tự động hóa 4.0.