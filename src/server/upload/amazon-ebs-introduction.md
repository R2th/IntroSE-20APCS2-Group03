# EBS 
EBS là viết tắt của Amazon Elastic Block Store cung cấp block level storage volumes cho việc sử dụng với EC2 instances. 

Bạn có thể mount những volumes này như device trên instances, bạn có thể mount nhiều volumes trên cùng một instance nhưng mỗi volume chỉ được attach một instance tại một thời điểm.

Bạn có thể tạo ra một file cho nhiều volume hay sử dụng chúng theo cách bạn muốn giống như 1 ổ đĩa cứng.

Bạn có thể tự động thay đổi cấu hình của volume attach tới instance. 

EBS volumes là những volume đáng tin cậy nó có thể được attach tới bất cứ một instance đang chạy nào trên cùng một AZ(Availability Zone). 

Những EBS volumes đã được attach tới 1 EC2 instance được xem như là storage volumes nó được lưu trữ độc lập đối với vòng đời của instance (Instance bị stop hay restart thì dữ liệu không bị thay đổi). 

Bạn có thể attach nhiều volumes tới cùng một instance trong giới hạn của aws account. AWS account của bạn có giới hạn số lượng EBS volumes mà bạn có thể sử dụng và là tổng số storage khả dụng. 

Amazon EBS được recommend khi data phải là cần truy cập nhanh and lưu trữ lâu dài. EBS volumes đặc biệt phù hợp cho việc sử dụng như primary storage cho các file hệ thống, cơ sở dữ liệu, cho tất cả các ứng dụng yêu cầu truy cập vào dữ liệu gốc, chưa được format, block-level storage.

Amazon EBS phù hợp cho database-style application (random ready và write) và trong ứng dụng througput-intensive (thực thi lâu việc read và write).
# Các tính năng của EBS
EBS volumes được tạo ra cho một AZ cụ thể, và bạn có thể attach tới bất cứ một instance nào trong cùng một AZ

Để tạo ra một volume khả dụng bên ngoài AZ, bạn có thể tạo ra snapshot và khôi phục snapshot to một volume mới ở Region mà bạn muốn.

Bạn có thể copy một snapshot to những Regions khác và restore volume mới tại đó. 

Amazon EBS cung cấp các kiểu volume types sau:

**General Purpose SSD (gp2)**: cung cấp perfomance cơ bản của 3 IOPS/GiB, với khả năng truyền 3000 IOPS cho mỗi một khoảng thời gian. Những volume này là lý tưởng cho việc sử dụng boot volumes, cho các cơ sở dữ liệu dạng nhỏ và vừa và cho môi trường development, test.

**Provisioned IOPS SSD volumes**: Nó hỗ trợ tới 64,000 IOPS và througput 1000MB/s 

**Throughput Optimized HDD volumes**: Cung cấp kiểu lưu trữ dạng từ với chi phí thấp  và throughput perfomance thì tốt hơn IOPS. Những volumes này lý tưởng cho việc sử dụng workload lớn và tuần tự như Amazon EMR, ETL, dữ liệu nhà kho và xử lý log

**Cold HDD volumes**: cung cấp kiểu lưu trữ dạng từ với chi phí thấp, Những volumes này lý tưởng cho việc dùng data lớn, tuần tự, cold-data. Nếu không yêu cầu truy cập thường xuyên và chi phí thấp thì sử dụng những volumes là rất rẻ 

Bạn có thể tạo một EBS volume như là một encryted volume, khi bạn tạo ra một encrypted EBS volume và attach chúng vào vào instance type thì data đã được lưu trên volume, disk I/O và snapshot tất cả đều được mã hóa. 

Bạn có thể tạo ra snapshot của EBS volume(những volume này được lưu trên S3). 

Snapshot để bảo về dữ liệu trong thời gian dài và chúng có thể được sử dụng tại thời điểm bắt đầu của EBS volume mới. 

# Ưu điểm của EBS volume
## Tính khả dụng
Khi bạn tạo một EBS volume trên một AZ, nó sẽ được tự động replicated trong zone đó để tránh việc mất dữ liệu do bất cứ lý do nào về phần cứng.

Sau khi tạo volume bạn có thể attach tới bất kỳ EC2 instances nào trong cùng AZ, Sau khi attach xong nó sẽ trở thành một block device giống như một hard drive hay physical drive, tại thời điểm đó instance có thể tương tác với volume như là local drive 

Instance có thể format EBS volume với một system file(e.g ext3) và sau đó cài đặt ứng dụng 

Một EBS volume chỉ có thể được attach tới một  instance tại một thời điểm, Nhưng nhiều volumes có thể attach tới một instance. 

Bạn có thể monitor data cho các EBS volume bao gồm root device volume cho EBS-backed instance mà không phải trả phí thêm

## Data persistence 

EBS volume là kiểu lưu trữ off-instance nó có thể lưu trữ độc lập với vòng đời của instance

EBS volume được attach tới running instance, có thể tự động tách ra khỏi instance nguyên vẹn khi instance bị terminate (nhưng phải đảm bảo bạn đã uncheck checkbox Delete on Termination khi cấu hình EBS volumes cho instance của bạn trên EC2 console. Volume có thể được attach lại tới new instance. 

Nếu như Delete on Termination được check khi cấu hình EC2, volume sẽ xóa khi EC2 bị terminated

Nếu như bạn sử dụng EBS-backed instance, ban có thể stop và restart lại instance mà không ảnh tới việc lưu trữ dữ liệu trên attached volume.

Dữ liệu sẽ được lưu trên volume cho đến khi volume bị xoá

Mặc định thì root EBS volume được tạo và được attached tại thời điểm launch instance sẽ bị xoá khi instance đó bị terminated.
Bạn có thể sửa việc root EBS volume bị xoá bằng cách thay đổi giá trị của flag DeleteOnTermination thành false khi launch instance, data sẽ được lưu trữ lại cả khi instance bị terminated và bạn có thể sử dụng volume này để attach tới instance khác.

## Data Encryption 
Tất cả EBS volume đều support encryption

Amazon encryption sử dụng giải thuật 256-bit Advanced Encryption Standard để mã hoá

Default master key sẽ được tạo ra tự động khi bạn tạo encrypted EBS volume lần đầu, key này được sử dụng cho amazone EBS encryption nếu như bạn không chọn customer master key (CMK) 

## Snapshot
Amazon EBS cho phép bạn tạo ra snapshot(backups0 của bất cứ một EBS volume nào và ghi một bản sao dữ liệu của volume lên S3. 

Volume không cần phải attach tới running instance để tạo ra snapshot. 

Những snapshots này có thể được sử dụng để tạo nhiều EBS volumes mới hoặc là di chuyển volumes qua các AZ khác nhau. Snapshot của một encrypted EBS sẽ tự động được mã hoá.

khi bạn tạo ra một volume mới từ một snapshot, nó sẽ giống hệt với bản volume gốc tại thời điểm mà volume được tạo ra. 

EBS volume mà được restore từ một enctyped snapshot cũng sẽ tự động được mã hoá. 

Snapshot có thể được share với một tài khoản aws hoặc public snapshot 

## Tính mềm dẻo 
EBS volumes hỗ trợ việc thay đổi trực tiếp khi đang trên môi trường production, bạn có thể chỉnh sửa volume type, volume size, IOPS capacity mà không làm gián đoạn service đang chạy

# Tạo một volume trên EC2
1. vào ec2 console https://console.aws.amazon.com/ec2/
2. Chọn Region 
3. Chọn ELASTIC BLOCK STORE -> VOLUMES -> CREATE VOLUME
![](https://images.viblo.asia/3c5c667d-278f-4388-804c-97985b8cd451.png)
4.Chọn volume type, volume size và các option khác
![](https://images.viblo.asia/dfbda5e6-1563-41f4-b7a8-bbf3218378a5.png)
5. Create volume - việc tạo này sẽ mất khoảng 1 phút để hoàn thành
![](https://images.viblo.asia/87948c9d-5596-4015-9ee1-71924d35409b.png)

# Nguồn tham khảo 
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html