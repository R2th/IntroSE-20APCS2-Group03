# Setting up
Việc seup ECS cũng tương tự như việc setup EC2 nếu bạn đã từng sử dụng qua service này
Bạn có thể tạo ra cluster bằng cách sử dụng một trong 2 cách Amazon ECS first-run winzard hoặc Amazon Command Line Interface (CLI)

## Bước đầu tiên bạn tạo ra một IAM User 
Thao khảo các bược tạo IAM User [tại đây](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html)
NOTE: Chú ý là IAM này phải có quyền billing, việc add billing cho user cũng khá đơn giản bạn có thể tham khảo [tại đây](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_billing.html#:~:targetText=To%20enable%20access%20to%20billing%20data%20on%20your%20AWS%20test%20account&targetText=On%20the%20navigation%20bar%2C%20choose,IAM%20Access%20and%20choose%20Update.)
## Tạo key pair
Bạn có thể tham khảo cách tạo keypair theo region trên amazon [Tạo Keypair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)

## Tạo VPC (Vitual Private Cloud)

### Tạo nondefault VPC
* Truy cập vào VPC console https://console.aws.amazon.com/vpc/
* Chọn region cho VPC, nên chọn region trùng với region của keypair đã tạo ở bước trên
* VPC Dashboard -> chọn Launch VPC Wizard

![](https://images.viblo.asia/a9bd1d48-3162-4dc5-9428-820484e98034.png)

* Chọn Select VPC with a Single Public Subnet -> chọn select

![](https://images.viblo.asia/663065c7-aff7-4d6d-98a0-d962c153cdfe.png)


* Nhập tên cho VPC, các trường khác để mặc định 

![](https://images.viblo.asia/f0202cf6-811d-430d-ad0b-d528391e11d4.png)


## Tạo Security group
Security group giống như bức tường lửa cho việc liên kết cho container instances, điều khiển lưu lượng cho cả inbound và oundbound tại tầng container instance.

Bạn có thể add rule cho một security group cho phép kết nối tới instance từ IP thông qua ssh. 

Bạn cũng có thể add rules cho phép truy cập inbound , outbound http và https ở bất cứ nơi đâu

Thêm rule để mở port

Container instance yêu cầu truy cập external network để kết nối với Amazon ECS enpoint 

Nếu bạn muốn chạy nhiều container instances trên nhiều region khác nhau thì bạn phải tạo security group cho nhiều Region

### Tạo security group 
* access vào amazon ec2 https://console.aws.amazon.com/ec2/
* Chọn region cho security group. Security group là riêng biệt cho từng region, bạn nên chọn region giống như region mà bạn đã tạo keypair
* Chọn security group -> create security group
* Nhập tên và mô tả cho security group

![](https://images.viblo.asia/e7f5e7ae-d535-4315-ab50-b19f3ac62d29.png)

* Chọn default VPC 
* Amazon ECS container instance không yêu cầu bất cứ một inbound port nào phải mở, thế nhưng bạn phải thêm ssh rule nếu bạn muốn login vào container instance, bạn cũng có thể thêm rule cho HTTP và HTTPS
 Container instance yêu cầu truy cập external network để giao tiếp với Amazon ECS service endpoint. 

![](https://images.viblo.asia/4af01555-d054-4090-913c-5e83460bc169.png)

# Docker for ECS

Docker như các bạn đã biết là một công nghệ rất hữu dụng cho việc build, run, test và deploy distributed ứng dụng trên Linux container. 
Docker ECS sử dụng Docker images trong task definition để khởi tạo container trên EC2 instances

## Cài đặt Docker trên EC2 instance
Tạo một Amazon Linux instance ( bạn tham khảo cách tạo instance từ bài viết này https://viblo.asia/p/amazon-ec2-YWOZrw2rlQ0)
Connect tới Instance thông qua ssh 
Update các packet đã được cài đặt trên instance 
```
sudo yum update -y
```
Cài docker 
```
sudo amazon-linux-extras install docker
```


Start docker service 
```
sudo service docker start
```
add ec2-user vào docker group để có thể run docker command mà không cần sudo
```
sudo usermod -a -G docker ec2-user
```
Check docker info
```
docker info
```

## Tạo docker images

Amazon ECS task definition sử dụng Docker image để launch container trên container instance của cluster. 
Dưới đây là một ví dụ về việc tạo docker image của ứng dụng web đơn giản “Hello world”


Tạo Dockerfile
```
touch Dockerfile
```
Edit Dockerfile
```
FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && \
 apt-get -y install apache2

# Install apache and write hello world message
RUN echo 'Hello World!' > /var/www/html/index.html

# Configure apache
RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \ 
 echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \ 
 chmod 755 /root/run_apache.sh

EXPOSE 80

CMD /root/run_apache.sh

```

Build docker image từ Dockerfile
```
docker build -t hello-world .
```
check  docker image
```
docker images --filter reference=hello-world
```
Chạy docker image trên cổng 80
```
docker run -t -i -p 80:80 hello-world
```

Mở web browser và trỏ tới địa chỉ mà server của bạn đang chạy docker 


# Kết
Trên đây mới chỉ là các bước setup tiền đề cần thiết trước khi đi vào xây dựng một ECS cluster 
Nguồn tham khảo: [Amazon ECS ](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html)