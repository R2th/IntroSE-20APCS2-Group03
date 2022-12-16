Tiếp nối phần 1, phần 2 này mình xin tiếp tục hướng dẫn cách config để gửi thông tin lên CloudWatch và xem các thông tin đó trên CloudWatch.

## 5. Config
Để gửi thông tin các thông số tài nguyên theo dõi được ở trên EC2 lên CloudWatch chúng ta cần được AWS xác thực bằng 2 cách sau.

### I. API Access Key
Cách này thì chúng ta cần 2 thông tin Access Key ID và Secret Aaccess Key rồi sau đó cài đặt 2 thông tin đăng nhập trong tập tin awscreds.conf
![](https://images.viblo.asia/9072be61-22b1-4045-9d2c-3c13f80ec00c.png)


Trong thư mục aws-scripts-mon chúng ta cần sao chép và đổi tên file awscreds.template (một trong các file mình đã giới thiệu ở bài viết trước) sang awscreds.conf bằng lệnh sau:
```
cp awscreds.template awscreds.conf
```
Sau đó chúng ta mở file đó lên và đưa hai thông tin đó vào. Ở nay mình dùng nano để edit file và nhớ save lại.
```
nano awscreds.conf
```
![](https://images.viblo.asia/2532d150-fb36-4dcf-bd7b-3fc90bcd470b.png)
Nếu chưa có chúng ta có thể đăng nhập vào AWS web console, sau đó vào mục Users trong IAM service và thêm nó vào. Cái này các bạn có thể tham khảo rất nhiều trên google.

![](https://images.viblo.asia/fca98f18-1994-4152-b046-50cdbc9802dd.png)


### II. IAM Role
Cách này chúng ta cần liên kết IAM với EC2 và sau đó thêm các quyền sau.
* cloudwatch:PutMetricData
* cloudwatch:GetMetricStatistics
* cloudwatch:ListMetrics
* ec2:DescribeTags

Nếu không thì chúng ta có thể thêm duy nhất role CloudwatchFullAccess để cấp full quyền cho CloudWatch.
![](https://images.viblo.asia/25cd4deb-5bdd-4c0e-8639-d649a483d84f.png)

Cách thêm liên kết IAM với EC2 và thêm role
* Đăng nhập vào AWS web console
* Tìm kiếm và chọn service Identity & Access Management (IAM)
* Tiếp theo chúng ta chọn Roles | Create New Role
* Điền Role Name
* Chọn tiếp Next Step
* Chọn Amazon EC2 muốn liên kết.
* Search từ khoá cloudwatch
* Chọn lần lượt các roles ở trên hoặc chọn CloudwatchFullAccess
* Tiếp tục Next Step | Create Role
* Attach/Replace IAM Role cho EC2

Sau khi config 1 trong 2 cách kia chúng ta sẽ thử gửi thông tin cho CloudWatch bằng lệnh sau(bỏ 2 tham số --verify --verbose so với câu lệnh kiểm tra trực tiếp):
   ```
   ./mon-put-instance-data.pl --disk-space-util --disk-space-used --disk-space-avail  --disk-path=/data
   ```
   Và đây là kết quả:
![](https://images.viblo.asia/df9d46ea-2c67-4b75-947a-81505f2cc96d.png)
Cuối cùng chung ta cần tạo cronjob để thực hiện gửi các thông tin cho CloudWatch sau mỗi xx phút. Ở đây mình setting 5 phút 1 lần. Các gỏ lệnh crontab -e và thêm đoạn lệnh vào file

```
 */5 * * * * ~/aws-scripts-mon/mon-put-instance-data.pl --disk-space-util --disk-space-used --disk-space-avail  --disk-path=/data --from-cron
```
Chú ý đường dẫn đến thư mục aws-scripts-mon có thể sẽ khác nên cần chỉ định ở đây cho đúng sau đó Save lại là xong.
![](https://images.viblo.asia/a0617b1c-b2ac-4b04-9918-19378d050339.png)

## 6. CloudWatch
Để xem các thông tin mà mình đã gửi lên CloudWatch thì chúng ta cần đăng nhập vào AWS web console. Sau đó tìm kiếm và chon service CloudWatch
![](https://images.viblo.asia/50536d42-09ef-46b7-aca5-129a4af310dd.png)
Tiếp theo chúng ta chọn Metrics. Tại đây chúng ta sẽ chọn tiếp System/Linux.

Do mình đang dùng các mertrics liên quan đến Disk nên mình chọn tiếp Filesystem, InstanceId, MountPath. Sau đó mình select 3 mertrics mà mình đã gửi lên.
![](https://images.viblo.asia/e90ab78d-85d7-4337-b8a6-83873b3fda58.png)

Chúng ta có thể chọn  kiểu hiển thị là dạng biểu đồ hoặc là dạng số.  Các bạn có thể kiểm tra cronjob  của mình có hoạt động tốt hay không bằng cách đơn giản là chọn dạng biểu đồ là line và xem giá trị sau cùng có khớp hay không.
![](https://images.viblo.asia/c714b318-c05e-4344-a7c9-f9adffdaab17.png)

***Vậy là mình vừa hướng dẫn xong các cách config  để gửi thông tin các tài nguyên tracking được cho CloudWatch. Nếu muốn xem nhiều thông tin của  các tài nguyên  khác thì mình chỉ cần thêm các option trong câu lệnh push thông tin là được (Bảng options này vui lòng tham khảo ở bài 1). Ở bài viết tiếp theo mình sẽ hướng dẫn cách tạo một Alarm, quản lý topic SNS cũng như cách test alarm. Xin mời mọi người cùng đón đọc.***