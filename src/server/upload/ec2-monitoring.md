AWS cung cung cấp các tool cho việc monitor EC2, một số tool yêu cầu phải tự cấu hình manual

# Automated Monitoring Tool

Sử dụng automated tool để check EC2 và report cho bạn khi một EC2 có vấn đề

## System Status Check

Phát hiện ra vấn đề và yêu cầu cần được sửa chữa instance, khi system status check fails bạn có thể lựa chọn hoặc là đợi AWS fix cho bạn hoặc là bạn phải tự fix (như stop, restart hay terminate instnace)

Các nguyên nhân làm cho system status check fails:
* không có kết nối mạng
* hệ thống mất nguồn
* Phân mềm trên host có vấn đề
* Phần cứng trên host xảy ra lỗi ảnh hường tới network 

## instance Status Check

Dùng cho việc monitor software và network của một instance cụ thể. 
Khi instance status check fails thông thường bạn sẽ phải tự sửa bằng cách reboot instance or chỉnh sửa trong hệ điều  hành của bạn
Một số các nguyên nhân có thể dẫn đến instance status check fail:
Failed system status check 
thiếu network config hay startup configuration 
Memory có vấn đề
Kernel không tương thích
# Status check cho instance

Với instance status monitoring bạn có thể nhanh chóng xác định được liệu rằng Amazon EC2 có phát hiện được bất cứ vấn gì ảnh hường tới instance từ ứng dụng đang chạy.

Amazon EC2 sẽ tự động check trên từng running instance để xác định vấn đề xảy ra trên hardware hay software

Status check được thực thi từng phút, sẽ trả về kết quả pass hoặc fail. Nếu kiểm tra tất cả và không gặp vấn đề gì thì status tổng thể của instance là `OK`. Nếu một trong các check fail thì overall status là `impaired`. 

Status check được built sẽ trong EC2 nên bạn không thể disable hay enable nó

Khi status check fail, thì tương ứng một cloudwatch metric cho status check sẽ được tăng lên.

Bạn có thể sử dụng metrics để tạo Cloudwatch alarm được kích hoạt dựa vào kết quả của status check

# Xem Status Check

## Sử dụng aws console 
* access vào EC2  https://console.aws.amazon.com/ec2/
* Chọn instance 
![](https://images.viblo.asia/d841c141-08f1-4605-8217-d57377a24ccf.png)
![](https://images.viblo.asia/eca1e98a-2b1e-411c-8948-7eb713d2482c.png)

Nếu bạn có một instance status check fail và không thể truy cập trong vòng 20 phút, chọn AWS Support để request được hỗ trợ 

##  Sử dụng command line 

Xem status của tất cả các instance 

```
aws ec2 describe-instance-status

```

Lấy thông tin của các instance mà có instance status là `impaired`

```
aws ec2 describe-instance-status --filters Name=instance-status.status,Values=impaired
```

Để lấy status của một instance cụ thể

```
aws ec2 describe-instance-status --instance-ids i-0fc354e247330852b
```


# Tạo và chỉnh sửa Status Check Alarm
![](https://images.viblo.asia/4494d123-9be0-4599-a98c-aae82e290f0a.png)

![](https://images.viblo.asia/01bc4480-5fd6-4680-aa26-db943a6d0b3d.png)

NOTE: Ở bước nhập email nhận notification, Amazon SNS sẽ gửi một email confirmation tới từng email, Alert notification chỉ được gửi khi bạn confirm email mà Amazon SNS đã gửi

# Monitoring sử dụng CloudWatch

Bạn có thể monitor instances sử dụng Amazon Cloudwatch, Cloudwatch sẽ thu thập và xử lý data từ EC2

Những thống kê này sẽ được sau mỗi 15 tháng nên bạn có thể truy cập vào dữ liệu cũ từ đó có cái nhìn đánh giá về server mà bạn đang chạy trong 1 khoảng thời gian.

Mặc định thì Amazon ec2 sẽ gửi metrics data tới CloudWatch trong mỗi 5 phút, Để gửi metric data tới instance theo từng phút bạn có thể enalbe detailed monitoring trên instance

## Enable hoặc Disable Detailed Monitoring cho instance

Mặc định thì instance sẽ được enable basic monitoring. 

Sau khi enable Detailed Monitoring Amazon EC2 console hiển thị đồ thị monitoring theo từng phút cho instance

Basic Monitoring: Miễn phí. Data sẽ được tự động lấy theo mỗi 5 phút
Detailed Monitoring: Mất phí. Data sẽ được lấy theo từng phút. Để lấy được thông tin của từng kiểu data bạn phải enable cho instance 

### Enable Detailed Monitoring 

Bạn có thể enable detailed monitoring ngay khi instance vừa được launch hoặc khi instance đang running hay stopped. 

Việc enable này sẽ không làm ảnh hưởng tới  monitoring của EBS volumn được attach tới instance.

![](https://images.viblo.asia/7edeb686-c655-425b-b7e1-4eeef21ca7d1.png)

### Disable Detailed Monitoring 

![](https://images.viblo.asia/2d057794-1800-42b7-b64f-35f769c3ebf8.png)

# Tham khảo
Trong bài sau mình sẽ tiếp tục chi tiết hơn về Cloudwatch
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring_ec2.html