## Giới thiệu
Chào các bạn tới với series thực hành về AWS, ở bài này chúng ta sẽ tìm hiểu cách gán một private IPv4 thứ hai cho EC2 của ta. Mục đích của việc này là fix một private ip cho EC2, như mọi người đã biết thì khi ta terminate một EC2 instance thì ENI giữ private IP của ta cũng chỉ bị xóa theo, nên khi ta tạo một EC2 mới thì nó sẽ có một private ip khác. Nếu ta lỡ tay xóa một ec2 mà hệ thống của ta dùng private ip của EC2 để gọi lần nhau thì việc đổi private ip như vậy sẽ gây ra lỗi.

![](https://images.viblo.asia/a0ec9f91-5575-448f-97b6-f6b3b0bb683a.jpg)

Khi ta gặp lỗi ở trên thì ta có thể giải quyết bằng cách gán một fix private ip thứ hai cho EC2 instance của ta.

![](https://images.viblo.asia/d81dc3cf-c21d-471f-99ad-709a8e7b8b18.jpg)

## Create AWS Network Interface
Ok, đầu tiên ta sẽ tạo ENI, sau đó gán nó vào EC2 ta muốn. Để tạo ENI, ta làm các bước sau.
1. Truy cập ENI Console https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?#NIC:.
2. Bấm **Create network interface**.
3.  Ô Description bạn nhập tùy ý, ô **Subnet** chọn subnet cùng với subnet mà EC2 đang chạy.
4.  **Private IPv4 address** ta chọn **Custom**, nhập vào IP mà bạn muốn, của mình nhập là 172.16.54.4

![image.png](https://images.viblo.asia/421e92e2-c7be-4d05-9865-01e7a451bb97.png)

5. Ở mục **Security groups** , ta chọn SG giống với SG của EC2 instance mà ta tính gắn vào.
6. Bấm tạo.

![image.png](https://images.viblo.asia/c7f61b50-1c16-4deb-9b26-ac03e07c6505.png)

## Assign ENI to EC2 instance
Tiếp theo ta sẽ gán ENI ta vừa tạo ở trên vào EC2 mà ta muốn. Ví dụ ta đang có một EC2 như sau.

![image.png](https://images.viblo.asia/552f7ec8-87f1-47ce-808f-417c642b65e1.png)

Để gán secondary private IPv4 cho EC2 trên, ta bấm vào ENI ta vừa mới tạo, chọn Action -> Attach.

![image.png](https://images.viblo.asia/bd421c31-691f-4154-a3e3-e270547a63eb.png)

Chọn EC2 mà ta muốn gán vào.

![image.png](https://images.viblo.asia/87b82470-e478-451d-b38d-b69b3ff7acef.png)

Bấm Attach. Sau đó truy cập EC2 Console, ta kiểm tra instance mà ta vừa gán ENI vào, bật qua tab **Networking**, bạn sẽ thấy con EC2 của ta đang có 2 private IP.

![image.png](https://images.viblo.asia/8301bc6d-76f0-4529-9d13-fa9ef5a73cd0.png)

Oke, vậy là ta đã gán thành công. Tiếp theo để kiểm tra xem IP thứ hai mà ta gán cho con EC2 này có work hay không, mình sẽ test bằng cách dùng ssh vào con `test-host` ở trên từ bastion host. Nếu các bạn không có bastion host thì tạo 1 con nha.

Đứng từ bastion host, ta ssh vào con EC2 ở trên với IP là `172.16.54.4`.

```
ubuntu@bastion:~$ ssh -i key.pem ubuntu@172.16.54.4
```

Bạn chờ một lát sẽ thấy bị timeout và ta chưa thể ssh vào con `test-host` với IP 172.16.54.4, vậy là secondary private IPv4 này của ta chưa hoạt động. Lý do là ta cần phải cấu hình ở trong instance của ta nữa thì nó mới work, bài này mình sẽ chỉ các bạn cấu hình cho EC2 linux với OS là amazon linux 2 và Ubuntu 18 hoặc 20.

Truy cập vào con `test-host`.

```
ubuntu@bastion:~$ ssh -i key.pem ubuntu@172.16.63.229
```

### Config for amazon linux 2 
Nếu EC2 của bạn xài OS amazon linux 2 thì việc cấu hình này khá đơn giản, ta làm như sau.

1. Cài ec2-net-utils package.

```
yum install ec2-net-utils
```

2. Refresh the list of interfaces.

```
sudo service network restart
```

Kiểm tra lại thì bạn sẽ thấy ta đã có thể ssh bằng IP 172.16.54.4

### Config for Ubuntu 18.04 and 20.04
Nếu ta xài linux distro ubuntu thì cấu hình sẽ phức tạp hơn xíu, nhưng cũng không khó. Vì ubuntu sử dụng Netplan để quản lý networking, ta sẽ cấu hình cho netplan như sau.

1. Install net-tools.

```
sudo apt install net-tools
```

2. Lấy default gateway IP.

```
$ route -n

Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.16.49.1     0.0.0.0         UG    100    0        0 ens5
...
```

Giá trị 172.16.49.1 là giá trị ta cần.

3. Lấy macaddress.

```
$ ip a

ens6: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 06:f9:ed:28:5b:43 brd ff:ff:ff:ff:ff:ff
...
```

Giá trị 06:f9:ed:28:5b:43 là giá trị ta cần.

4. Tạo config file.

```
sudo nano /etc/netplan/51-eth1.yaml
```

5. Gán các giá trị sau vào.

```
network:
  version: 2
  renderer: networkd
  ethernets:
    ens6:
      match:
         macaddress: 06:f9:ed:28:5b:43
      addresses:
       - 172.16.54.4/20 # <secondary private IPv4>/<subnet mask>
      dhcp4: no
      routes:
       - to: 0.0.0.0/0
         via: 172.16.49.1 # default gateway
         table: 1000
       - to: 172.16.54.4 # secondary private IPv4
         via: 0.0.0.0
         scope: link
         table: 1000
      routing-policy:
        - from: 172.16.54.4
          table: 1000
      set-name: ens6
```

**Giá trị subnet mask là giá trị cidr block của subnet mà ta tạo ENI.**

6. Chạy câu lệnh apply cấu hình.

```
netplan --debug apply
```

Bạn sẽ thấy terminal của ta bị đứng. Ta sẽ reboot EC2 và mọi thứ sẽ work. Bấm vào EC2 `test-host`, bấm **Instance state -> Reboot**.

![image.png](https://images.viblo.asia/17421aaa-2468-4f0c-ad42-c71af42af50d.png)

Đợi một lát bạn sẽ ssh bằng 172.16.54.4 được.

```
$ ssh -i key.pem ubuntu@172.16.54.4

Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.13.0-1021-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Wed Apr 20 09:09:00 UTC 2022

  System load:  0.0               Processes:             107
  Usage of /:   18.9% of 7.69GB   Users logged in:       0
  Memory usage: 9%                IPv4 address for ens5: 172.16.63.229
  Swap usage:   0%                IPv4 address for ens6: 172.16.54.4
```

Vậy là ta làm ok 😁.

## Terraform file
Ta có thể làm nhanh bằng cách sử dụng Terraform, nhưng đoạn cấu hình trong linux ta vẫn phải tự vào làm nhé 🤣. File terraform như sau.

```main.tf
provider "aws" {
  region = "us-west-2
}

resource "aws_security_group" "allow_ssh_bastion_host" {
  name   = "allow-ssh-bastion-host"

  ingress {
    from_port   = "22"
    to_port     = "22"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.tags
}

resource "aws_security_group" "allow_ssh_web" {
  name   = "allow-bastion-host-to-test-host"

  ingress {
    from_port = "22"
    to_port   = "22"
    protocol  = "tcp"
    security_groups = [
      aws_security_group.allow_ssh_bastion_host.id
    ]
    description = "Allow ssh from bastion host"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.tags
}

data "aws_subnets" "private" {}

resource "aws_network_interface" "fix_private_ip" {
  subnet_id                 = data.aws_subnets.private.ids[0]
  private_ips               = ["172.16.54.4"]
  ipv6_address_list_enabled = false
  private_ip_list_enabled   = false

  security_groups = [
    aws_security_group.allow_ssh_web.id
  ]

  attachment {
    instance     = aws_instance.test_host.id
    device_index = 1
  }

  tags = merge(
    local.tags,
    { Name = "fix-private-ip" }
  )
}

data "aws_ami" "ubuntu_20" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

resource "aws_instance" "test_host" {
  ami           = data.aws_ami.ubuntu_20.id
  instance_type = "t3a.small"
  key_name      = "key"
  subnet_id     = data.aws_subnets.private.ids[0]

  vpc_security_group_ids = [
    aws_security_group.allow_ssh_web.id,
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = merge(
    local.tags,
    { Name = "test-host" }
  )
}
```

## Kết luận
Vậy là ta đã tìm hiểu xong cách gán một secondary private IP vào EC2. Nếu ta làm trên môi trường production thì này sẽ hữu dụng lắm nha 🤣. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.