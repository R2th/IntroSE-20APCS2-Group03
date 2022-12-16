1. Có thể làm được những gì với IoT

Với IoT chúng ta có thể làm được rất nhiều, nhưng điển hình cần nói đến : 
Lưu trữ dữ liệu, trực quan hoá, tự động hóa, điều khiển ,tối ưu hoá ,  tự trị hoá. 

* Lưu trữ dữ liệu 

Thông qua những device như sensor thu thập  big data vào cloud storage. Bằng việc phân tích big data đã được thu thập chúng ta có thể dự đoán trước được những vấn đề hỏng hóc thiệt hại có thể xảy ra.Hơn nữa big data đã được thu thập cũng có khả năng sử dụng trong machine learning trí tuệ nhân tạo (AI).

![](https://images.viblo.asia/ae2a9458-87b1-4bad-a078-2b2724b8d3fd.png)


* Trực quan hoá

Thu thập data thông qua device, dựa trên những data đó có thể monitoring được hành vi trạng thái của đối tượng. Ví dụ như việc sử dụng cảm biến trong các nhà máy, có thể monitoring hiệu suất làm việc, từ đó có thể đưa ra được phương án cải thiện hiệu quả. 

![](https://images.viblo.asia/1f3c6385-1423-45e9-a5c9-275359f80d0d.png)

* Điều khiển 

Có thể điều khiển từ xa bởi con người, hay đặt sẵn các rule để điều khiển hệ thống. Ví dự như smartphone lock key. Có thể thao tác từ xa tới tất cả các vật được kết nối đến network.

![](https://images.viblo.asia/d2db23c0-c41e-4bb8-86d6-a36cff39aac3.png)


* Tự động hoá

Bằng việc phân tích dữ liệu , không cần đến con người cũng có thể thao tác hoặc xử lý một cách tự động.  Máy móc có thể tự giao tiếp với nhau, điều kiểu lẫn nhau, tự thu nhập dữ liệu mà không cần đến con người. Tính năng này đặc biệt hữu ích trong các dây chuyền sản xuất (M2M). 

![](https://images.viblo.asia/2e320c80-ce68-46bc-9c11-b90f6adc7485.png)


* Tối ưu hoá 

Với AI không chỉ đơn thuần chỉ là tự động hoá, ứng với từng điều kiện, trạng thái sẽ đưa ra những xử lý phù hợp nhất. Với những dữ liệu của cảm biến trong gia đình, AI tiến hành phân tích, khi chủ nhà vắng nhà có thể tự động khoá cửa, đây là một trong những ứng dụng điển hình. 
Khác với  điều khiển và tự động hoá đó là thông qua việc AI  phân tích dữ liệu đã thu thập, chúng ta không cần tạo ra một chương trình do con người quy định mà vẫn có thể điều khiển được các vật khác.

![](https://images.viblo.asia/f5e63200-2c0f-438b-8b78-1435b5267105.png)

* Tự trị hoá.

Không cần đến con người, với đầy đủ tính “Trực quan hoá / Trực quan hoá / Điều khiển / Tự động hoá / Tối ưu hoá  sẽ tạo nên một hệ tự trị.

2. Tổ chức cơ bản của IoT

Những yếu tố điển hình cấu tạo của IoT đó là : Device (sensor/actuator) , Network, Cloud (App/Storage).
Get data từ sensor thông qua network gửi data lên cloud. Data được gửi đi sẽ được thu thập trong storage của Cloud, thông qua Application tiến hành trực quan hoá, phân tích và đo đạc. 
Dựa trên kết quả sau khi  tiến hành trực quan hoá, phân tích và đo đạc, sẽ điều khiển actuator, liên kết tới các service bên ngoài (PC, SmartPhone, Robot, ect ).

![](https://images.viblo.asia/97af3e40-067d-44b3-9c64-77bbafdb8a5f.png)

* Device sensor

Có rất nhiều loại sensor như sensor nhiệt độ, gia tốc, góc, âm thanh, hình ảnh, rung, vị trí…
Hãy hình dung nếu như bạn cần đo nhiệt độ , bạn có thể mua về cảm biến ADT 7410. Vậy với cảm biến này bạn có nghĩ đã đủ để thực hiện việc lấy được dữ liệu của nhiệt độ hiện tại. Câu trả lời là “Chưa Đủ”.

![](https://images.viblo.asia/04c5ecfd-f865-42b7-ac63-67fd76dbd35e.png)

Trên thực tế chúng ta cần một Device sensor,  bao gồm bản thân sensor, microcomputer, wifi module. 

![](https://images.viblo.asia/cd6a1489-09a0-4e9e-9440-11affe2ffd6e.png)

Hiếm có trường hợp 1 set bao gồm sensor và  microcomputer được bán ra.  Việc lấy dữ liệu của sensor được quyết định bởi microcomputer (CPU). Những dữ liệu này sẽ được gửi lên Cloud bởi Network (Wifi module).
 
* Device actuator

Đại diện của actuator phải nói đến motor. Sau khi phân tích data được lấy về từ Device sensor, tiến hành điều khiển các khối  Device actuator. Có 4 loại motor như sau, được phân ra theo từng mục đích sử dụng. 

DC motor : Động cơ điện hoạt động với dòng điện một chiều. 

![](https://images.viblo.asia/7cae1917-9ec5-4802-bf90-58debbcf85a7.png)

Servo motor : Là một bộ phận của hệ thống điều khiển chuyển động của máy móc. Động cơ Servo cung cấp lực chuyển động cần thiết cho các thiết bị máy móc khi vận hành.

![](https://images.viblo.asia/a6bfb732-a6d1-4cac-82e2-53432cc55901.png)

Stepping motor : Một loại động cơ điện có nguyên lý và ứng dụng khác biệt với đa số các động cơ điện thông thường. Chúng thực chất là một động cơ đồng bộ dùng để biến đổi các tín hiệu điều khiển dưới dạng các xung điện rời rạc kế tiếp nhau thành các chuyển động góc quay hoặc các chuyển động của rôto có khả năng cố định rôto vào các vị trí cần thiết.

![](https://images.viblo.asia/60db2cc4-7fea-4111-951f-9351bae4ac6c.jpeg)

Vibration motor : Được hiểu đúng nghĩa "động cơ rung" , ví dụ điển hình đó là chức năng rung của điện thoại . 

![](https://images.viblo.asia/d0d58b8a-45b2-47e1-a192-a7c595d73161.jpg)

* Single board computer

Với người chưa có nhiều kiến thức về mạch điện thì việc tạo nên Device sensor khá vất vả. Vậy giải pháp ở đây đó là sử dụng  Single board computer chúng ta có thể điều khiển sensor bởi Microcomputer (CPU).
Raspberry pi 3 được biết đến là một trong những Single board computer điển hình  đáp ứng việc học tập, nghiên cứu để xây dựng hệ thống IoT.
![](https://images.viblo.asia/d9927a7c-137a-483a-8efd-535b0df4430a.jpg)

 Single board computer là một bo mạch có chứa : Microcomputer (CPU) , storage (HDD),  Module truyền tin....  Một số loại Single board computer điển hình như: 
 
* Cloud

Một trong những chức năng của Cloud đó là : Lưu trữ dữ liệu (Storage), trực quan hoá, tính toán phân tích, điểu khiển (Application). Có một số loại Cloud điển hình như : Azure, GCP, AWS（Amazon Web Service）

![](https://images.viblo.asia/ac06eacf-c2f9-4f02-9d89-6218e42da5c8.png)

Amazone cung cấp Public cloud service.
Đây là cloudservice được sử dụng nhiều nhất trên thế giới.  Có 18 region trên toàn thế giới và 55 Availability zone.

Bài viết này đưa ra cái nhìn thổng quan về hệ thống IoT , các bạn có thể tìm hiểu nhiều hơn các kiến thức khác dựa trên nguồn : https://codezine.jp/article/detail/12063?fbclid=IwAR1SI0LR0VFSig2t1htJQfdVGoJdh1CFUZJusREv6nKhW9_HVRRWV9EzvRw