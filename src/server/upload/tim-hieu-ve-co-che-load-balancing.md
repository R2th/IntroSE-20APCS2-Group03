![](https://images.viblo.asia/e062dec0-b01c-4ddb-aec0-cff599a16515.png)

### Load Balancing là gì?

Load Balancing là quá trình của việc phân phối lưu lượng truy cập một cách hiệu quả thông qua nhiều server hay còn được gọi là `server farm` hay `server pool`. Việc phân phối đồng một cách đồng đều sẽ cải thiện khả năng đáp ứng và tăng tính khả dụng của các ứng dụng. Phương pháp này ngày càng cần thiết vì các ứng dụng ngày nay đã phức tạp hơn, cùng với nhu cầu của người sử dụng tăng và lưu lượng truy cập tăng lên.

Cùng tìm hiểu xem Load Balancing phục vụ mục đích gì nhé!

| Problem      | Solving                                                         |
|--------------|-----------------------------------------------------------------|
| Performance  | Scale up (Vertical scaling) <br> Scale out (Horizontal scaling) |
| Availability | Backup instances                                                |
| Economy      | Smaller instances                                               |

### Các vấn đề khi triển khai hệ thống

Đối với việc phát triển hệ thống, có 3 vấn đề sau: 

#### 1. Performance

Luôn có giới hạn đối với mức độ công việc mà một máy tính có thể làm trong khoảng thời gian nhất định. Từ những năm 2000, chúng ta có Chip xử lí như `Intel Pentium`, cho đến nay chip mạnh nhất là I9 thế hệ thứ 10, tuy rằng giới hạn này vẫn đang tăng theo cấp số nhân, nhưng đối với nhu cầu của người dùng (ứng dụng phải nhanh, tối ưu) thì giới hạn tính toán là không đủ và giá thành cho những chip đời mới nhất cũng khá là cao. Ngay cả khi đáp ứng được về mặt chi phí, thì khi có đến hàng triệu người dùng, hoặc hàng tỷ người dùng như Facebook, thì hệ thống cũng không thể đáp ứng được. 

#### 2. Availability

Tỉ lệ mà server bị lỗi (mất điện đột ngột, downtime) dù là rất nhỏ nhưng vẫn có trường hợp xảy ra, để phòng tránh trường hợp này, việc triển khai nhiều server là điều cần thiết, gọi là `replica`. Tại thời điểm server bị lỗi, càng ít người dùng sử dụng hệ thống lúc đó càng tốt. Để tránh bị lỗi, phải có ít nhất 2 server chạy đồng thời, khi 1 server bị lỗi, chuyển request đến server còn lại nhanh nhất có thể.

#### 3. Economy

Lúc nào cũng phải nâng cấp server theo từng năm để chạy theo nhu cầu người dùng, và đồng thời phải chạy thêm 1 server backup phòng khi server kia bị lỗi. 



### Load Balancing giải quyết như thế nào?

#### 1. Performance

Khi nhu cầu người dùng tăng lên, để tăng hiệu suất của server thì có 2 cách

+ Scale up (hay còn gọi là vertical scaling): Cách này có giới hạn, như chúng ta đã nói ở trên
+ Scale out (hay còn gọi là horizontal scaling): Phân phối request cho các server để cùng nhau xử lí, và có thể thêm hoặc bớt server tuỳ mục đích và thời điểm sử dụng. 

#### 2. Availability

Chắc hẳn bạn đã từng nghe qua câu nói `Don't put all your eggs in one basket`.
Cái này cũng áp dụng cho việc phát triển hệ thống. Không nên để 1 server xử lí hết tất cả request. Bất kì ứng dụng nào trên production cũng nên có phương pháp xử lí nếu bị lỗi. Một trong những phương pháp đó là có dự phòng và cơ chế tự động khôi phục. Load Balancing cũng hoạt động theo phương pháp này, do đó nếu 1 server bị lỗi thì cũng không ảnh hưởng đến toàn hệ thống. 

#### 3. Economy

Triển khai một server có hiệu năng lớn thì đắt hơn so với một cụm server có hiệu năng nhỏ. Chi phí để duy trì một cụm server nhỏ thì rẻ hơn và dễ dàng thêm hoặc nâng cấp server trong cụm này so với việc nâng cấp và thay thế một server lớn.

Chính vì Load Balancing giải quyết được các vấn đề trên, do đó đây vẫn là phương pháp được lựa chọn và sử dụng rộng rãi. 

### Các thuật toán triển khai Load Balancing

#### 1. Round Robin

![](https://images.viblo.asia/becf4113-4d65-4c4d-97fa-fb50e59e0422.png)

Dễ dàng để hiểu và triển khai, là thuật toán được sử dụng rộng rãi nhất. Request sẽ được chuyển hướng tới server theo vòng tròn. Thuật toán này hoạt động hiệu quả khi các server này có khả năng tính toán và lưu trữ giống nhau.


#### 2. Weighted Round Robin

![](https://images.viblo.asia/0ca97c98-b132-4656-8c90-a900377aea4f.png)

Đây là thuật toán mở rộng của thuật toán Round Robin. Đối với Round Robin, server phải xử lí khối lượng request là ngang nhau. Nếu 1 server có nhiều CPU, nhiều RAM hơn, thuật toán này cũng không thể phân phối nhiều request hơn cho server này được. Do đó, server với khả năng xử lí thấp hơn có thể sẽ bị overload và nhanh chóng quá tải trong khi server mạnh hơn thì đang nhàn rỗi.

Thuật toán Weighted Round Robin yêu cầu quản lý Admin cho việc chỉ định trọng lượng cho mỗi server dựa trên năng lực xử lý. Server nào có trọng lượng cao hơn thì nhận nhiều request hơn. Ví dụ:

+ Server A có khả năng xử lý 15 request mỗi giây (tỉ lệ trung bình)
+ Server B có khả năng xử lý 10 request mỗi giây (tỉ lệ trung bình)    
+ Server C có khả năng xử lý 5 request mỗi giây (tỉ lệ trung bình)
    
    
Giả sử có 6 request thì:

+ 3 request được gửi tới server A
+ 2 request được gửi tới server B
+ 1 request được gửi tới server C
    
#### 3. Least Connection

![](https://images.viblo.asia/85012020-bc13-4d27-8c67-b6e905f79c70.jpg)

Các request được chuyển vào server có ít kết nối nhất trong hệ thống, để thực hiện được thì cần phải đếm số kết nối đang hoạt động của server. 

#### 4. Fastest Response Time

Thuật toán dựa trên thời gian đáp ứng của mỗi server, sẽ chọn ra server có thời gian đáp ứng nhanh nhất. Thời gian đáp ứng được xác định bằng khoảng thời gian giữa gửi một gói tin đến server và thời điểm nhận được gói tin trả lời. Việc gửi và nhận này do Load Balancer đảm nhiệm. Dựa trên thời gian đáp ứng, Load Balancer sẽ biết chuyển request tiếp theo đến server nào.
Thuật toán này thường được dùng khi các server ở các vị trí địa lý khác nhau. Như vậy người dùng gần server nào thì thời gian ở server đó sẽ nhanh nhất. Cuối cùng server đó sẽ được chọn để xử lí. 


### Load Balancing AWS

#### Load Balancer

AWS cung cấp giải pháp về Load Balancing, chúng ta sẽ cùng tìm hiểu xem cơ chế hoạt động của dịch vụ này ra sao. 

![](https://images.viblo.asia/c82219bd-ac3e-4a26-939e-b05660e9da27.png)

AWS hỗ trợ 3 loại LB: Classic, Application, Network. Application hỗ trợ ở tầng thứ 7, Network hỗ trợ ở tầng thứ 4. Classic ra đời đã khá lâu rồi và AWS khuyến khích nên dùng ALB hoặc NLB thay vì CLB. 

Quá trình giao tiếp giữa client và server là một quá trình phức tạp của network communication. Thực tế client phải gửi thông tin nói chuyện đi xuống hết stack, thông tin này đi ngược lại stack khi nó gặp LB, sau đó LB lại chuyển thông tin ngược lại stack và chuyển nó đến server, và server đọc ngược lại stack. 

Level của Load Balancing đề cập đến việc thông tin giao tiếp có thể đi đến tầng nào, trước khi Load Balancing có thể trực tiếp chuyển thông tin đó đến đích cuối. 

**Application Load balancer**

Ví dụ như mức 7, network communication phải đi đến tận tầng ứng dụng, và tầng ứng dụng này có thể đọc được HTTP request để xác định xem nó nên được chuyển tới đâu

![](https://images.viblo.asia/6fb5050d-b382-4e8e-94d4-f0d78d17381c.png)

Chính vì việc ALB có thể đọc được HTTP request, nên có thể tận dụng để làm microservices

![](https://images.viblo.asia/a9339bf0-56d2-412b-8e56-cb063ac384f8.png)

![](https://images.viblo.asia/5f230de3-b5ef-4152-987e-069fb1061bb7.png)

Như hình trên, từ việc đọc được /path, ALB có thể chuyển request tới các service khác nhau

**Network Load Balancer**

Ở mức 4, network communication đến tầng giao vận, LB đọc gói TCP để chuyển trực tiếp communication tới đúng chỗ, nó chỉ nhận nhiệm vụ chuyển tiếp chứ không đọc được thông tin trong gói tin có gì. 

![](https://images.viblo.asia/6b82c7c8-2004-471b-b9a0-6ac79693161a.png)

Do hoạt động ở tầng 4 nên NLB có thể xử lý hàng triệu request mỗi giây với độ trễ thấp, được dùng trong các ứng dụng như video streaming.


**Cơ chế hoạt động**

Trong AWS thì LB sẽ dựa trên cơ chế health checks để xác định xem servers nào available

![](https://images.viblo.asia/1e64fe09-2057-467b-a788-daac81c97960.png)

![](https://images.viblo.asia/9f5d04b5-3d86-4d0d-9392-37adfb77e05e.png)

![](https://images.viblo.asia/9b9dbc80-6c8b-4cc5-8abf-085edb7a595f.png)

Load Balancer gửi request định kì tới server để kiểm tra status của chúng, việc kiểm tra này được gọi là health checks. 

Nếu server là healthy tại thời điểm kiểm tra thì status của chúng là InServer (có thể phục vụ được), ngược lại nếu server unhealthy tại thời điểm kiểm tra thì status của chúng là OutOfService (tạm thời không phục vụ được).

Load Balancer thực hiện health checks trên tất cả các server, kể cả server đó là healthy hay unhealthy, tuy nhiên, LB chỉ gửi request đến những server nào là healthy, nếu 1 server trong trạng thái unhealthy, LB sẽ dừng việc gửi request tới server đó cho đến khi server đó có trạng thái healthy trở lại. 

---

### Tài liệu tham khảo
https://medium.com/containers-on-aws/using-aws-application-load-balancer-and-network-load-balancer-with-ec2-container-service-d0cb0b1d5ae5

--- 

Mình có viết 1 số bài liên quan đến AWS, mọi người quan tâm đọc ở dưới đây nhé.

[Tìm hiểu hệ thống chứng chỉ AWS](https://viblo.asia/p/tim-hieu-he-thong-chung-chi-aws-63vKjbq6K2R)

[Tìm hiểu về VPC](https://viblo.asia/p/tim-hieu-ve-vpc-virtual-private-cloud-aws-3P0lPPpGlox)