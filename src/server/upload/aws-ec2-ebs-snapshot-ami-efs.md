# Lời nói đầu
Gần đây mình mới có cơ hội được tham gia vào một khóa học về AWS  cơ bản online rất thú vị . Nó cho mình các kiến thức nền tảng về AWS. Ngày hôm nay mình xin được viết thêm về 1 bài viết khác về AWS EC2 cơ bản . Đây là những kiến thức mình muốn chia sẻ với mọi người và cũng coi như một lần mình note ra để nhớ lại bài học . Và các kiến thức mình tiếp thu được trong bài thì nó không toàn diện và có thể sai sót vì đây là những kiến thức hạn hẹp của mình . Nếu có gì thiếu sót mong mọi người comment và cho mình biết . Mình rất hy vọng nó có ích cho ai đó . Cám ơn các bạn rất nhiều ! Nào mình cùng bắt đầu nhé ! 😄 😄
# Nội dung
## EBS (Elastic Block Store)

### 1 : EBS là gì ?

- EBS là một ổ đĩa (nơi để bạn lưu trữ dữ liệu) bạn có thể attach vào instance của mình trước hoặc sau khi cài đặt xong instance đó thông qua network dirver
- Nó cho phép bạn lưu trữ dữ liệu dài hạn cho mình kể cả khi instance đó đã bị xóa bỏ (tùy thuộc vào việc setup nhé )
- Chỉ có thể attach vào duy nhất một instance trong cùng một khoảng thời gian.
- EBS bị cố định bởi các Avaiablety zone ==> Khi bạn tạo EBS ở zone A thì chỉ attach được các instance thuộc chính zone A đó 

> Bạn có thể nghĩ về nó giống như một chiếc USB bỏ rời cho máy tính của bạn. Bạn có thể rút và cắm vào các máy tính khác nhau .... Miễn là các máy tính đó trong cùng 1  Avaiablety Zone (AZ) .
> 
> Gói Free Tiger dùng để học tập AWS free 30G / tháng để bạn sử dụng nên là xõa thôi nhé.


- Bởi vì EBS là 1 `network dirver` nên :

    -  Nó sử dụng hệ thống networking để kết nối với các instance ==> điều này có nghĩa sẽ có một độ trễ nho nhỏ nhất định khi so với các hệ thống vật lý.
    -  Có thể deatch khỏi EC2 và attach vào EC2 khác một cách nhanh chóng.

- Bởi vì EBS bị khóa bới các (AZ) nên :

    -  EBS được tạo ở `us-east-1a` không thể attach vào instance ở `us-east-1b`
    -  Để chuyển đổi giữa các AZ chúng ta có thể sử dụng `Snapshot`

- Có khả tính toán và cung cấp các EBS dựa trên dung lượng (size) hoặc IOPS (I/O Ops per seconds), giúp bạn cải thiện performace hoặc tăng size của hệ thống một cách nhanh chóng và dễ dàng

### 2 : EBS Volume Type
- Các EBS được phân loại đữa trên (`Size`, `Throughput` , `IOPS` (I/O Ops per seconds)) 
- EBS được chia ra làm 6 loại khác nhau và được chia thành các category như sau :

**2.1: `gp2` vs `gp3`** 

 - Thiết kế với bộ nhớ  SSD cho các mục đích thông thường như website app với sự cân bằng về tiền và hiệu năng với khối lương công việc đa dạng
- Size : 1GB --> 16 TB
- `gp2`
    - Là phiên bản volume cũ hơn .
    - IOPS của 1 `gp2` nhỏ nhất có thể đạt đến 3000
    - Size và IOPS có sự phụ thuộc vào nhau và `IOPS` max có thể đạt đến 16000 ==> Điều này có nghĩa rằng để tăng `IOPS` bạn bắt buộc phải tăng size của volume lên
  

- `gp3`
    - Là phiên bản volume mới hơn .
    - Baseline 3000 `IOPS` và `throughput` 125 MB/s
    - Chúng ta có thể setup `IOPS` lên đến 16000 và `throughput` lên đến 1000 MB/s một cách độc lập và không phụ thuộc vào size
<hr>

**2.1: `io1` vs `io2`** 

- Hiệu năng cực cao (SSD) phù hợp với các nhiệm vụ cực kì quan trọng với độ trễ thấp và high-throughput workloads
- Hoặc nếu App của bạn cần nhiều hơn 16000 `IOPS`
- Cực kì phù hợp với các app cần lưu trữ dữ liệu thực sự mẫn cảm và yêu câu tính nhất quán cao (Streaming, Game , v..v....)
- Size : 4GB --> 16 TB
- Max IOPS : 
    - Nitro EC2 Instance : 64000
    - Other :  3200
- Bạn có thể tăng IOPS một cách hoàn toàn độc lập với size của volume giống `gp3`
- `io2` là phiên bản mới hơn so với `io1` cung cấp nhiều IOPS trên mỗi GB và độ bên bỉ cao hơn so với `io1` (so sánh ở cùng mức giá)
-  `io2 block express`  4GB --> 64 TB
    - Độ trễ : Dưới 1 ms 
    - Max `IOPS`: 25600
    - 1000 `IOPS` / 1 GB

- Support EBS multi Attach to Instance 

<hr>

**2.1: `st1(HDD)`** 

  - Mức chi phí rẻ với HDD volume được thiêt kế cho các app thường xuyên được truy cập nhưng throughput với mức độ thông thường
 - Size : 125MB --> 16 TB
 - Phù hợp với việc lưu trữ big data, data warehouses, log processing
 - Max `IOPS`:  500 - Throuput: 500 MB/s
<hr>

**2.1: `sc1(HDD)`** 

  -  Mức chi phí rẻ với HDD volume được thiêt kế cho các app ít thường xuyên được truy cập 
  - Size : 125MB --> 16 TB
 - Phù hợp với các kịch bản tiết kiệm chi phí nhất có thể
 - Max `IOPS`:  250 - Throuput: 250 MB/s

<hr>

- Chỉ `gp2` / `gp3`, `io1` /`io2` được sủ dụng làm Boot Volumes cho instance (nơi mà OS được cài đặt và runnining )

- Để biết thêm chi tiết về `EBS volume type` vui lòng truy cập vào [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html) để tìm hiểu thêm.


## SnapShot

### 1 : SnapShot là gì ?

Hiểu một cách ngắn gọn thì `SnapShot` là bản view file  của 1 `EBS` của bạn tại một thời điểm khi bạn muốn backup EBS của mình. Nhờ vào bản view file này , AWS có thế build ra chính xác nội dụng của EBS tại thời điểu đó của bạn


### 2 : Tại sao cần SnapShot ?

- Phục vụ mục đích muốn backup lại `EBS` của bạn tại một thời điểm nào đó với mục đích restore lại nếu muốn trong tương lai.
- Tạo ra 1 version clone phục vụ cho việc deploy server mới hay tạo thêm 1 node mới trong loadbalancing
- Hoặc bạn muốn di chuyển dữ liệu hoặc instance của mình từ một AZ này sang 1 AZ khác (Create EBS by Snapshot) hoặc chuyển từ region này sang region khác thông qua chức năng copy Snapshot ==> Create EBS by Snapshot ==> Attach Instance 

## AMI (Amazone Machine Image)
- AMI là có thể cho bạn khả năng tùy biến các EC2 mà AWS cung cấp
- Trong AMI có toàn bộ một OS của bạn : software , configruation, tool , monitoring , ...v....v.... (nói chung là full tùy vào khả năng setup của bạn)
- Nên nhớ rằng khi bạn tạo EC2 có phần chọn AMI ==> Thông thường mình ko để ý step này (nó là step đầu tiên khi create EC2 luôn ) , bạn có thể tự tạo AMI và chọn vào tab `My AMI` để select AMI của mình. 
- Việc sử dụng AMI khi build App của mình sẽ làm gia tăng tốc độ create EC2 một cách đáng kể nếu App của bạn require nhiều thành phần (Đâu đó chỉ mất khoảng 30s - 1p để build bởi vì tất cả đã xong hết rồi)
- `AMI` và `SnapShot` là khác nhau . Trong khi `SnapShot` chỉ là backup 1 ổ thì `AMI` là sự backup cả 1 cụm nhé
- Chính vì như vậy nên `AMI` được sử dụng để :
    -  Tạo ra 1 version clone phục vụ cho việc deploy server mới hay tạo thêm 1 node mới trong loadbalancing
    -  Chuyển dự liệu hay APP của mình giữa các region và AZ một cách dễ dàng và nhanh chóng.

## EFS (Elastic File System)
-  `EFS` mang lại cho chúng ta khả năng chia sẻ file thông qua `NFS (Network File System)` trên nhiều EC2 khacs nhau. Điều này cũng có nghĩa rằng `EFS` có thể hoạt đo trên nhiều EC2 nằm trên nhiều AZ khác nhau
-  `EFS` mang lại tính bổ trợ rất cao cho EBS bởi EBS bị khóa lại trên 1 AZ còn EFS sẽ giúp chúng ta share data trên nhiều AZ khác nhau . Rất là tiện dụng cho các APP và trong cả việc scale App khi cần
-  Chính vì điều này nên phí sử dụng EFS khá là đắt ( = phí `gp2` * 3 ). Tuy nhiên, phí này chỉ bị charge theo dung lượng sử dụng . Dùng đến đâu trả đến đấy :D 
-  `EFS` sử dụng `Sercurity Group` để bảo mật cũng như share quyền truy cập EC2.

![](https://images.viblo.asia/5ba45b52-bddb-4376-aa93-57176313b73b.png)

- `EFS` sử dụng giao thức `NFSv4.1`
- `EFS` chỉ tương thích với các `AMI` base trên Linux (Window thì ko dùng được)
- `EFS` scale
    - Hỗ trợ hàng nghìn client cùng access vào `EFS` trong cùng 1 thời điểm
    - Các file `EFS` có dung lượng lên đến quy mô  Petabyte

- Performance mode (Setup khi khởi tạo `EFS`)
    - General Purpose :Phục vụ cho các App  thông thường cần chia sẻ file hệ thống  với nhiều file nhỏ (Website, Cache file , v...v... ) vì với nhiều file nhỏ bạn có thể truy cập 1 cách đễ dàng và nhanh chóng
    - Max I/O : Phục vụ cho các big data  hay media processing cần throuput cao và latency tốt hơn

- Throughput mode.
    -  Mặc định thì với 1TB storage chúng ta `throughput` từ 50 -> 100MB /s
    -  Bạn cũng có thể tách biệt `storage` với `throughput` băng cách truy cập `provision throughput mode` và set các thông tin như bạn muốn (Ví dụ : 1TB storage => 1GB/s throughput)

- Lưu trữ:
    - Standard : Các file nếu thường xuyên được access thì sẽ thuộc dạng EFS thông thường
    - Các file ko được truy cập thường xuyên (EFS-IA) : đây là các file sau `N` ngày ko có bất kì truy cập nào sẽ bị chuyển xuống lưu trữ ở dạng này với 1 chi phí thấp hơn, kinh tế hơn . `N` được định nghĩ khi tạo `EFS` và mặc định là 30 ngày . Tuy nhiên, 1 khi file `EFS-IA` được truy cập thì ngay lập tức file này sẽ được chuyển về `Standard` và truy cập như thường.

# Kết Luận

Ok, vậy là mình đã trình bày xong tất cả kiến thức mà mình thu thập được về EBS, AMI, Snapshot, EFS trong AWS. Hy vọng bài viết này sẽ giúp ích chút gì đó cho mọi người. Thân !