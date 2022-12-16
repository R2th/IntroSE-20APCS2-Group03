# Restoring Amazon EBS Volume từ Snapshot
Bạn có thể restore dữ liệu EBS volume từ một snapshot được lưu trên S3

Bạn cần có ID và permission để truy cập vào snapshot 

EBS snapshots là một công cụ khôi phục dữ liệu được ưa thích vì tốc độ , thuận tiên và giá thành tốt.

Khi bạn restore một volume từ một snapshot thì trạng thái dữ liệu sẽ được khôi phục tại thời điểm tạo snapshot 

Khi restore volume cho instance bạn có thể tạo ra các bản sao cho các regions, tạo ra môi trường test hay lấy các files, thư mục và chuyển chúng sang một attached volume khác

Khi volume mới được tạo ra từ snapshot sẽ được xử lý lazy load dưới background. Điều đó có nghĩa là sau khi một volume được tạo ra từ một snapshot bạn không cần phải đợi tất cả dữ liệu được chuyển từ  S3 tới EBS volume

Nếu như instance chưa load được dữ liệu thì volume sẽ ngay lập tức download dữ liệu từ s3 và tiếp tục download dữ liệu còn lại cho volume dưới background

EBS volumes được restore từ snapshot mã hoá sẽ được tự động mã hoá. Bạn có thể volume on-the-fly khi đang restore từ một snapshot không phải là encrypted snapshot.

Bởi vì ràng buộc về bảo mật nên bạn không thể trực tiếp restore một EBS volume từ một shared encrypted snapshot mà không phải của bạn. Trước tiên bạn cần copy snapshot đó và sau đó restore từ bản copy 

1. https://console.aws.amazon.com/ec2/
2. Chọn region
3. chọn ELASTIC BLOCK STORE, Volumes.
4. create volume 
5. Chọn volume type (để mặc định là gp2)
6. nhập snapshot ID bạn muốn restore
7. Size: bạn phải chọn size lớn hơn hoặc bằng snapshot size (ở đây tôi chọn 10GB, snápshot của tôi là 8GB)
8. Create volume

![](https://images.viblo.asia/3caa2c92-4d4b-47d0-8210-df6bcbc44bb4.png)


kết quả là 2 volume mới cùng một snapshot bởi tôi đã lấy snapshot của volume khác để tạo một EBS volume mới

![](https://images.viblo.asia/b313dc86-c0d4-4096-aca5-5f1c686a8d0e.png)

# Attach Amazon EBS Volume tới Instance
Bạn có thể attach một EBS tới một instance trong cung một AZ 

Điều kiện bắt buộc:
* Phải xác định được bao nhiêu volumes mà bạn attach tới instance. Vì instance có giới hạn volume
* Nếu như 1 volume được mã hoá bạn chỉ có thể attach tới instance mà support Amazon EBS encryption
* Nếu một volume có product code của aws 
   * Bạn chỉ có thể attach tới một instance mà nó đã được stop
   * Bạn phải suscribe aws code đó trên volume
   * Việc cấu hình (Kiểu instance, hệ điều hành) của instance phải support aws marketplace code đó

**Để atttach một EBS volume tới một instance các bạn cần làm các bước như sau**
1. Truy cập vào amazon ec2 console https://console.aws.amazon.com/ec2/.
2. ở Panel bạn chọn Elastic Block Store, Volumes 
3. Chọn volume > Actions > Attach volume
4. Điền tên hoặc ID của instance > chọn instance từ list(lưu ý chỉ có các instance cùng AZ với volume mới được hiển thị)
5. Chọn device 
6. Chọn attach 
7. Connect tới instance và mount volume

# Tạo một EBS volume sử dụng cho linux
Sau khi attach EBS volume tới instnace, bạn có thể format volumevới bất cứ file system nào và sau đó mount . 

Bất cứ data ghi trong file system sẽ được ghi lại  trong EBS volume

Bạn có thể tạo snapshot của EBS volume cho việc backup hoặc để sử dụng cho việc tạo một volume khác. 

### Format và Mount tới một Attached Volume 
Giả sử bạn có một EC2 instance với một EBS volume (root device) `/dev/xvda` và bạn vừa mới attached một EBS volume tới instance sử dụng `/dev/xvdf` 
1. ssh tới instance 
2. dùng command `lsblk` để xem thông tin về ổ đĩa khả dụng 
![](https://images.viblo.asia/804fc09b-ceb4-4ffe-80db-7afa0bd00a57.png)

*Note: Câu lệnh trên sẽ không show ra prefix `/dev/`*

/dev/xvda là root device

/dev/xvdf là volume mới được attach nhưng chưa được mount 

3.  Kiểm tra xem trên volume đã có file system chưa nếu chưa có thì bạn phải tạo bằng trước khi mount 
Lấy thông tin device bằng câu lệnh 

```
sudo file -s /dev/xvdf
/dev/xvdf: data
```
Nếu không show thông tin gì thì nghĩa là volume chưa có system file bạn phải tạo 

![](https://images.viblo.asia/9c052049-4cb4-4a49-b01f-913d2a119b41.png)

Nếu có rồi thì sẽ hiển thị thông tin của device và bạn ko cần tạo file system nữa

4. Tạo file system bằng câu lệnh 
```
sudo mkfs -t xfs /dev/xvdf
```
5. Tạo ra thư mục để mount device xvdf tới 
```
sudo mkdir /data
```
6. Mount device tới folder /data
```
sudo mount /dev/xvdf /data
```
Sau khi mount xong giờ mountpoint của /dev/xvdf đã trỏ tới thư mục /data

![](https://images.viblo.asia/5e412781-41d2-4205-a69f-3055178a20e0.png)

# Tham khảo 
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumes.html