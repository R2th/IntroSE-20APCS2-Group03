Trong bài viết hôm nay, chúng ta tìm hiểu về bastion host và cách thiết lập nó để truy cập các Linux EC2 instance private trên AWS nhé mọi người.

Trước khi bắt đầu đi sâu vào tìm hiểu, chúng ta cần hiểu rõ khái niệm “Bastion Host là gì”.

**Bastion Host** là [a special-purpose compute](https://en.wikipedia.org/wiki/Bastion_host) (máy tính có mục đích đặc biệt) để quản lý instance hoặc database private được đặt trên private subnet (mà không cần giao dịch với internet). Bastion Host được đặt trong public subnet của AWS VPC (Virtual Private Cloud) và hoạt động như một “**gateway of login**” giữa thế giới bên ngoài vào các private subnets.

![](https://images.viblo.asia/167358ff-23ce-482b-8cc7-8f265da74853.png)

Mục đích của việc đặt bastion host bên trong public subnet là để bảo mật việc đăng nhập vào ứng dụng của bạn và dữ liệu được lưu trữ trong private instance. Các nỗ lực đăng nhập bên ngoài không thể kết nối trực tiếp đến các private instances. Nó chỉ có thể kết nối qua bastion host trong public subnet của VPC.

![](https://images.viblo.asia/9d88132b-de4f-4623-8137-1e3ed634b003.png)

## Các bước triển khai

Hãy đi sâu vào việc triển khai từng bước cho bastion host nhé mn.

STEP 1: Tạo các private instance với resource đã chọn (Bastion Host) qua SSH.

STEP 2 - Tạo bastion host trên public subnet với resource đã lựa chọn (Your Public IP).

STEP 3 - (Đăng nhập vào private instance thông qua bastion host)  Xác thực kết nối đến private instance thông qua bastion host bằng lệnh ssh proxy.

STEP 4 - (Thay thế việc đăng nhập vào private instance thông qua bastion host) Sử dụng tệp cấu hình ssh để đăng nhập vào private instance thông qua bastion host.

### Step 1 — Tạo private instance với nguồn resource bảo mật đã được chọn

Trước tiên, tạo một private instance trên private subnet trong security group mà mình đã lựa chọn từ trước. Tiếp theo đó chúng ta sẽ phải setting rule inbound cho SG bastion host trong private instance SG của chúng ta trên cổng 22 (như hình bên dưới). Việc setting này có nghĩa là private instance có thể được connect thông qua bastion host.

![](https://images.viblo.asia/1edf751e-9f9e-4e2f-a156-68c053e14cd2.png)

Sau khi tạo private instance, chúng ta cần tải xuống khóa ssh pem để có thể đăng nhập private instance.

![](https://images.viblo.asia/5953548f-1a4d-4a65-8b3d-9809a4ecebdf.png)

Chúng ta kiểm tra qua status của private instance nhé.

![](https://images.viblo.asia/ea65e47a-0572-437c-a3a4-a2a4d5af3067.png)

Sau khi private instance được chạy thành công trên private subnet, chúng ta sẽ chuyển sang bước tiếp theo là bước tạo bastion host.

### Step 2— Tạo bastion host trên public subnet

Trong bước này, chúng ta sẽ tạo bastion host trên public subnet, có thể giao tiếp được với internet bên ngoài. Tại thời điểm này, chúng ta sẽ sử dụng AMI Amazon Linux 2 để thiết lập bastion host.

Để tạo bastion host, chúng ta sẽ follow theo các bước từ bảng điều khiển trên AWS của mn nha.

{@youtube: https://www.youtube.com/watch?v=z0JOet01rEk}

Thông thường, bastion host instance chỉ được sử dụng thấp cho các mục đích quản trị, đó là lý do tại sao bạn có thể chọn phiên bản t2.micro.

![](https://images.viblo.asia/204b3eaf-2a51-4f0c-9387-2ee60e91427f.png)

Thiết lập và tạo tương tự ở trên private instance, chúng ta cần tạo bastion host và tải khóa ssh pem xuống máy tính của bạn.

![](https://images.viblo.asia/c9fe5037-1bf1-4774-ac81-353deaa2d8b7.png)

Sau khi tạo bastion host, chúng ta có thể thấy hai instance (Private instance & bastion host) đang chạy trên subnet tương ứng.

![](https://images.viblo.asia/b45124c2-c0e0-4bd1-8519-b4e058644952.png)

Bước tiếp theo, chúng ta sẽ đăng nhập và kiểm tra các thiết lập từ máy tính để bàn (hoặc) laptop.

### Step 3 — Đăng nhập vào private instance thông qua bastion host (sử dụng ssh)

Bước này là bước chúng ta có thể kiểm tra các cài đặt trên bastion và private instance đã chính xác hay chưa bằng cách đăng nhập vào chúng. Việc đăng nhập vào private instance qua bastion host có hai cách:

* Login with SSH Proxy Command.
* Login with SSH Config File.

Trước khi bắt đầu login, chúng ta cần xem lại thông tin instance của mình (Public DNS & IP Address)

> Bastion Host Public URL = ec2–3–208–93–134.compute-1.amazonaws.com Private Instance IP = 192.168.3.225

Sau khi chúng ta nhận được thông tin về các instance, chúng ta cần áp dụng lệnh SSH proxy để đăng nhập trực tiếp vào private instance thông qua bastion host. Để sử dụng với phương pháp này, chúng ta sẽ thực hiện câu lệnh sau trên terminal

```
$ ssh -i private-key.pem ec2-user@192.168.3.225 -o ProxyCommand="ssh -W %h:%p -i bastion-key.pem ec2-user@ec2-3-208-93-134.compute-1.amazonaws.com"
```

Chúng ta có thể thấy việc login vào private instance qua bastion host thành công nếu các cấu hình mà chúng ta thực hiện ở trên chính xác.

```
$ ssh -i private-key.pem ec2-user@192.168.3.225 -o ProxyCommand="ssh -W %h:%p -i bastion-key.pem ec2-user@ec2-3-208-93-134.compute-1.amazonaws.com"
Last login: Thu Jan  9 17:49:38 2020 from ip-192-168-1-248.ec2.internal
__|  __|_  )
_|  (     /   Amazon Linux 2 AMI
___|\___|___|
https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-192-168-3-225 ~]$ ip a | grep eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc pfifo_fast state UP group default qlen 1000
inet 192.168.3.225/24 brd 192.168.3.255 scope global dynamic eth0
```

### Step 4 — Login vào private instance thông qua bastion host (thêm ssh configuration trong file ssh config)

Như tôi đã đề cập ở trên, chúng ta có một cách khác để đăng nhập private instance thông qua bastion với tệp cấu hình ssh. Bạn có thể tạo tệp cấu hình SSH theo đường dẫn ~ / .ssh / config và điền nội dung bên dưới.

```
$ vim ~/.ssh/config
Host private-instance
Hostname 192.168.3.225
IdentityFile  /Users/phyominhtun/Desktop/private-key.pem
ForwardAgent yes
User ec2-user
ProxyCommand ssh -W %h:%p -i /Users/phyominhtun/Desktop/bastion-key.pem ec2-user@ec2-3-208-93-134.compute-1.amazonaws.com
```

Phần cấu hình này có thể đăng nhập vào bastion host để chuyển tiếp đến private instance trực tiếp từ máy local của bạn. Sau khi fill đầy đủ cấu hình vào tệp cấu hình, chúng ta nhập lệnh ssh để đăng nhập trực tiếp vào private instance.

```
$ ssh private-instance
Last login: Thu Jan  9 17:56:04 2020 from ip-192-168-1-248.ec2.internal
__|  __|_  )
_|  (     /   Amazon Linux 2 AMI
___|\___|___|
https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-192-168-3-225 ~]$
```

Bạn có thể thấy chúng ta đã đăng nhập thành công trực tiếp vào private instance bằng cách nhảy qua bastion host.

## Tổng kết

Trải qua một vài dự án thực tế, thì mô hình này được hầu hết các dự án lựa chọn. Nó đảm bảo an toàn cho các tài nguyên của chúng ta từ các truy cập bên ngoài.

Xin lưu ý rằng việc thiết lập bastion host chỉ để đăng nhập từ  bên ngoài (Internet) vào VPC của mọi người. Nếu muốn truy cập ra ngoài (Internet) từ VPC Private Network, chúng ta có thể sử dụng [NAT Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html). 

### Tài liệu tham khảo

https://phyominhtun.medium.com/securing-private-linux-ec2-instance-with-bastion-host-5a4d5dd7a266

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html