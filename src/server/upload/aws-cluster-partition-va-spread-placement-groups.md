## 1. Placement Groups Overview
* Placement group xác định cách các instance được đặt trên phần cứng cơ bản (underlying hardware).
* AWS hiện cung cấp 3 loại placement group có sẵn trong EC2 và tất cả chúng đều tồn tại vì những lý do khác nhau. Về cơ bản chúng cho phép chúng ta nhìn thấy hoặc kiểm soát vị trí thực tế - nơi mà các EC2 instance khởi chạy ở các mức độ khác nhau. Chúng ta có thể lợi dụng tính năng này để cải thiện hiệu suất hoặc độ tin cậy.
    + **Cluster** - nhóm các instance thành một cụm có độ trễ thấp khi kết nối với nhau trong một AZ
    + **Partition** - phân tán các instances trên các phân vùng hợp lý, đảm bảo rằng các instances trong một phân vùng không chia sẻ phần cứng cơ bản với các instances trong các phân vùng khác
    + **Spread** - trải rộng các instances trên phần cứng cơ bản


## 2. Cluster Placement Groups (CPGs)

> Cluster placement groups place instances physically near each other in a single AZ. Every instance can talk to every other  instance at the same time at full speed. Works with enhanced networking for peak performance. 
* **Cluster placement group** đặt các instance gần nhau về mặt vật lý trong một AZ (availability zone). Mọi instance có thể giao tiếp với các instance khác cùng một lúc ở tốc độ tối đa. Cách hoạt động này sẽ đem lại hiệu suất mạng tối đa.

![](https://images.viblo.asia/420574d7-a2c7-4edd-84c3-fa24846f5974.png)

* Mục đích **cluster placement group** được thiết kế để phục vụ cho performance, chúng khá dễ cấu hình.
* Cluster bị giới hạn trong một vùng khả dụng. Vì vậy, khi bạn tạo cluster placement group, bạn không cần chỉ định vùng khả dụng; nhưng khi bạn khởi chạy instance vào placement group đó, chúng sẽ bị khóa vào vùng khả dụng của instance đầu tiên được đưa vào.Trên thực tế, tất cả những gì nó làm là đảm bảo rằng các instance được khởi chạy bên trong một cluster placement group gần nhau về mặt vật lý.

![](https://images.viblo.asia/4a58fef7-5d31-436a-8b09-9b6e237a9ea3.png)

* Nên khởi chạy tất cả các instances trong groups cùng một lúc để đảm bảo dung lượng. Có thể thêm các instances vào sau, nhưng có khả năng gặp phải lỗi dung lượng không đủ. Giả sử bạn đã đưa 4 EC2 instances vào một cluster placement group, thì AWS sẽ tìm một thời điểm thích hợp để khởi chạy 4 EC2 instances này từ đó. Chúng có thể đảm bảo không gian này đủ cho thêm 2 instance nữa trong trường hợp muốn khởi chạy thêm nhưng nếu bạn muốn chạy thêm tận 4 instance, bạn có thể sẽ gặp vấn đề về dung lượng. Vì vậy, bằng cách chọn các instances cùng loại và khởi chạy tất cả chúng từ ban đầu, việc khởi chạy placement group với các instance sẽ có cơ hội thành công cao hơn.
* Để di chuyển một instance vào placement group:
    + Tạo một AMI từ instance hiện có 
    + Khởi chạy một instance mới từ AMI này vào một placement group
    + Stop và start 1 instance trong placement group, instance đó vẫn chạy trong cùng một placement group
    + Trong trường hợp có lỗi về dung lượng, hãy dừng và khởi chạy lại tất cả các instances trong placement group. 

*  Cluster placement groups chỉ khả dụng trong một AZ duy nhất trong cùng một VPC hoặc peered VPCs.


## 3. Partition Placement Groups (PPGs)

> Instances deployed into a partition placement group (PPG) are  separated into partitions (max of seven per AZ), each occupying  isolated racks in AZs/regions. PPG can span multiple AZs in a  region. PPGs minimize failure to a partition and give you visibility on placement.

* Các instance được triển khai thành một **partition placement group (PPG)** được phân tách thành các phân vùng (tối đa bảy trên mỗi AZ), mỗi instance chiếm các racks độc lập trong AZs/region. PPG có thể trải rộng trên nhiều AZ trong một khu vực. PPG giảm thiểu thất bại đối với một phân vùng và cho phép bạn theo dõi trên placement.

![](https://images.viblo.asia/fd284f6f-84a5-429d-a6fb-1684618702a9.png)

* **Partition placement groups** được thiết kế để đảm bảo tính sẵn sàng của ứng dụng được đạt đến mức tối đa. Một partition là một nhóm cơ sở hạ tầng biệt lập bên trong AWS. Các partition cũng là các nhóm đối tượng logic, các instances được chứa trong đó không chia sẻ cùng một phần cứng cơ bản trên các partition khác nhau.

* Trong Availability Zone, bạn có thể có nhiều partition. Chúng cùng nhau lưu trữ, tính toán, kết nối mạng và chúng là loại tách biệt với các partition khác. Ý tưởng là, nếu một partition duy nhất thất bại, bạn sẽ không mất tài nguyên trong một partition khác, vì vậy các partition placement groups là một cách để có thể hạn chế miền chịu lỗi thậm chí còn nhỏ hơn các Availability Zone.

![](https://images.viblo.asia/1a072236-cfbf-42a6-9fc1-ae9f1a76f100.png)

* Có thể có tối đa 7 partitions cho mỗi Availability Zone và có thể trải rộng trên nhiều Availability Zones trong cùng một Region.

* Các **partition placement groups** có xu hướng chỉ được sử dụng cho các triển khai cơ sở hạ tầng lớn. Bạn có thể có một ứng dụng sử dụng hàng trăm EC2 instances và bạn muốn đảm bảo rằng chúng được chia đều cho tất cả các phân vùng cơ sở hạ tầng trong một region và do đó, bạn sẽ tạo một partition placement group có thể trải rộng trên các vùng khả dụng khác nhau và mỗi vùng khả dụng đó sẽ có tối đa bảy phân vùng và bạn có thể sử dụng phân vùng đó để phân chia các instance đó trên tất cả bảy phân vùng đó. Nếu cần, bạn có thể cung cấp thông tin đó cho các ứng dụng để bản thân ứng dụng có thể nhìn thấy vị trí cơ sở hạ tầng của nó.
Vì vậy, nhìn chung, các partition placement groups được thiết kế để đảm bảo tính khả dụng và mức độ trải rộng cơ sở hạ tầng cho các ứng dụng sử dụng một lượng lớn các EC2 instance. 
* Không được hỗ trợ cho Dedicated Hosts. Đối với Dedicated Instances, có thể có tối đa 2 partitions.
## 4. Spread placement groups (SPGs)

> Spread placement groups (SPGs) are designed for a max of seven instances per AZ that need to be separated. Each instance occupies  a partition and has an isolated fault domain. Great for email  servers, domain controllers, file servers, and application HA pairs.

* Các **Spread placement groups (SPGs)** được thiết kế cho tối đa 7 instance trên mỗi AZ cần được tách riêng. Mỗi instance chiếm một phân vùng và có một miền lỗi bị cô lập. Kiến trúc này phù hợp cho các email servers, domain controllers, file servers, và application HA pairs. 
    + partition placement groups : tối đa 7 phân vùng trên mỗi AZ. 
    + spread placement groups : tối đa 7 running instance trên mỗi AZ, mỗi instance sẽ nằm trong phân vùng riêng của nó
    
![](https://images.viblo.asia/edf3936b-a012-4495-803a-947c1f5eacbe.png)

* **Spread placement groups** là một nhóm các instances được đặt trên phần cứng cơ bản riêng biệt, có thể trải rộng trên nhiều AZ.
* **Spread placement groups (SPGs)** được thiết kế để triển khai cơ sở hạ tầng nhỏ, được áp dụng khi bạn muốn đảm bảo rằng mọi instance đều hoạt động trên một phân vùng riêng. Vì vậy, cách phân vừng này phù hợp cho email servers, domain controllers, file servers, and application, highly available pairs hay bất cứ thứ gì mà bạn cần để đảm bảo rằng khi một phân vùng xảy ra lỗi sẽ không làm sụp đổ tất cả các instance của bạn.
* Không được hỗ trợ cho Dedicated Instances hoặc Dedicated Hosts.

## 5. Conclusion

* Khi bạn khởi chạy một EC2 instance mới, dịch vụ EC2 sẽ cố gắng đặt instance đó theo cách sao cho tất cả các instance của bạn được trải đều trên phần cứng cơ bản để giảm thiểu các lỗi tương quan. Bạn có thể sử dụng các placement groups để tác động đến vị trí của một nhóm các instance phụ thuộc lẫn nhau để đáp ứng nhu cầu về khối lượng công việc. Tùy thuộc vào loại khối lượng công việc, bạn có thể tạo placement group bằng một trong các chiến lược vị trí sau:
    + **Cluster** : gói các instance gần nhau trong một Availability Zone. Chiến lược này cho phép khối lượng công việc đạt được hiệu suất mạng có độ trễ thấp - cần thiết cho giao tiếp giữa các node được liên kết chặt chẽ, điển hình của các ứng dụng HPC.
    + **Partition** : phân tán các instance trên các phân vùng logic (logical partitions) sao cho các nhóm instances trong một phân vùng không chia sẻ phần cứng với các nhóm instances trong các phân vùng khác. Chiến lược này thường được sử dụng bởi khối lượng công việc phân tán và quy mô lớn, chẳng hạn như Hadoop, Cassandra và Kafka.
    + **Spread** – đặt một nhóm nhỏ các instance trên phần cứng cơ bản riêng biệt để giảm các lỗi tương quan.
* Việc tạo placement group không hề tính phí.

### References
https://jayendrapatil.com/aws-ec2-placement-groups/