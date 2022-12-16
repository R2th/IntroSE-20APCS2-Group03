Sau khi triển khai coding một ứng dụng thì một trong những công việc quan trọng sau đó là deploy chúng lên server. Bài này sẽ hướng dẫn cách thực hiện deploy một chương trình thông qua container(có thể được coi là một máy tính riêng biệt dùng để chạy server).Container này sẽ được build trong EC2 của AWS và sẽ kết nối với source code ở Git repo thông qua Jenkins. Kết nối này được gọi là đường ống CI/CD.

# I. CI/CD là gì?
## 1. Tổng quan về DevOps
    DevOps là viết tắt của Development (Dev) và Operations (Ops). DevOps là một văn hóa làm việc kết hợp giữa kỹ sư phát triển phần mềm (dev) với bộ phận operator (kỹ sư hệ thống, nhân viên bảo mật, kỹ sư mạng, kỹ sư hạ tầng,...) nhằm mục đích rút ngắn vòng đời phát triển sản phẩm.

Chi tiết tham khảo ở link : 
https://viblo.asia/p/tim-hieu-ve-devops-phan-1-ByEZk9Mo5Q0

Các lợi ích của DevOps (để nguyên tiếng anh cho đỡ chuối :D ):
- Increase the speed of software delivery
- Increases the speed of software evolution
- Have better reliability of the software
- Have scalability using automation
- Improved collaboration among teams.

Các công cụ và phương pháp hay được sử dụng trong DevOps:
- Continuous Integration / Continuous Delivery (CI/CD)
- Microservices
- Infrastructure as Code (IaaC) - Configuration Management and Policy as a Code
- Monitoring and Logging
- Communication and Collaboration

## 2. CI/CD là gì?
Như đã nêu ở trên thì CI/CD là một trong những phương pháp được sử dụng trong DevOps. Nó bao gồm 2 phần:
- CI - Continuous Integration : những đoạn code mới nhất thường xuyên được buil, test và merge vào repository được chia sẻ như là git.
- CD - Continuous Delivery: là quy trình tự động release các đoạn source mới đã được merge và kiểm tra vào nhánh chính và release vào nhánh Production để triển khai ở môi trường Production.
![](https://images.viblo.asia/662a2144-16db-442f-a290-98951a330c18.png)


# II. Git là gì?
    Git là open source miễn phí kiểm soát phiên bản phân tán, được thiết kế cho các dự án nhỏ đến rất lớn với tốc độ và hiệu quả.

Vì bài viết không tập trung vào Git nên muốn tìm hiểu sâu hơn nên tìm kiếm thêm thông tin khác.

# III. EC2 instance là gì?
    Là một máy ảo được nguời dùng config để chạy trên cloud. Nó như một máy tính vật lý có nhiều phiên bản cấu hình mà người dùng có thể lưạ chọn cho phù hợp với dự án cũng như để tối ưu chi phí.

# IV. Docker là gì?
    Là tool hỗ trợ việc tạo các Docker Image. Một image(docker image) là một template read-only di động, nó chứa các chỉ dẫn để tạo container. Một image có thể được khởi tạo bởi nhiều lúc để tạo nhiều các container khác nhau.

Container: là một hệ điều hành ảo, cho phép chạy song song các vùng người dùng riêng biệt. Một container(Docker container) bao gồm các mục sau đây được đóng vào 1 package:
- the application code
- the required dependencies (e.g. libraries, utilities, configuration files)
- the necessary runtime environment to run the application.

Lợi ích của việc dùng Container:
- Containers giúp người dùng có thể dễ dàng hơn, nhanh hơn trong việc tạo, triển khai và chạy ứng dụng trên nhiều phần cứng, platforms khác nhau.
- Container chia sẻ các thư viện của ứng dụng.
- Container có chi phí thấp hơn trong việc sử dụng máy ảo.

# V. Jenkins là gì?
    Jenkins là một máy chủ tự động hóa mã nguồn mở được viết bằng ngôn ngữ lập trình Java. Jenkins giúp tự động hóa một số khía cạnh liên quan đến xây dựng, thử nghiệm và phân phối hoặc triển khai phần mềm

# VI. Kết nối mọi thứ lại với nhau.
## 1. Khởi động và cài đặt EC2
Sử dụng Amazon Linux 2 AMI và t2.micro(tiết kiệm chi phí). Cấu hình theo các bước sau: 
- Chọn mặc định VPC, public subnet
- Trong phần Security group, chọn Alow TCP, port 8080, SSH chọn port 22.
- Tải xuống file key-pair.

## 2. Kết nối EC2 Instance
    - Tại folder file key đã download (ví dụ tên file là udacity.pem)
    
    chmod 400 udacity.pem
    
    - Kết nối đến instance thông qua public DNS
    
    ssh -i "udacity.pem" ec2-user@ec2-3-82-117-163.compute-1.amazonaws.com
![](https://images.viblo.asia/e6ddf1fe-4d16-4a86-8707-8d58ec5a8dbf.png)

## 3. Cài đặt Docker
Sau khi đã kết nối thành công đến instance, tiếp tục cài đặt docker

    # download and install Docker
    sudo yum install docker

    # Add the $USER user to the "docker" user group 
    # The current $USER is ec2-user
    sudo usermod -a -G docker $USER
    sudo reboot

![](https://images.viblo.asia/fe2b2e04-ec7d-4ced-97ae-5696a68ac5c0.png)


## 4. Tạo và chạy Docker container
Trong bài hướng dẫn này sẽ sử dụng jenkinsci/blueocean(https://hub.docker.com/r/jenkinsci/blueocean/) vì thế không cần thiết phải biết file Dockerfile.

    # start Docker service
    sudo service docker start
    # Check if the Docker engine is running
    systemctl show --property ActiveState docker
    # Create and run a new Container using the "jenkinsci/blueocean" image
    docker run -u root -d --name myContainer -p 8080:8080 -v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home jenkinsci/blueocean

Các thành phần chi tiết:
- **--name**: khởi tạo tên cho container.
- **-p**:  mô tả port mà Jenkins sẽ khởi động. Ví dụ, -p 8080:8080 sẽ mapping với 8080 port của host trong container.
- **-d**: detached mode - container sẽ tự động chạy ở chế độ nền
- **-v**: chỉ định ổ đĩa để duy trì máy chủ ở Jenkins. Điều này rất quan trọng bởi vì khi mà khởi động lại container, bạn sẽ muốn Jenkins di chuyển các data (configuration, user-data, plugins) đến nơi muốn di chuyển. Ở đây chúng ta sẽ có 3 ổ đĩa.
- **-v jenkins-data:/var/jenkins_home**: ổ cứng đầu tiên sẽ là ổ cứng mặc định home directory của jenkins.
- **-v "$HOME":/home**: ổ thứ 2 cho người dùng cụ thể
- **-v /var/run/docker.sock:/var/run/docker.sock**: ổ thứ 3 là nơi mà đã được xác định docker socket ở trong container. Điều này giúp thực hiện các lệnh docker từ bên trong Container. 

Kiểm tra lại status của container
![](https://images.viblo.asia/7d404103-5895-4abc-9239-66966620aab3.png)

## 5. Tạo cập RSA ở trong container
    # Open a shell into myContainer. The container name may vary in your case
    docker exec -it myContainer bash
    # Since our project is a Maven project, we need to install Maven in the container
    apk add maven
    # Generate RSA key-pair. It will generate a public and private key. 
    # We will place the public key in the Github account, and the private key in the Jenkins console
    ssh-keygen -t rsa
    # View the private key
    cat /root/.ssh/id_rsa
    # View the pubic key 
    cat /root/.ssh/id_rsa.pub

## 6. Đăng nhập vào Jenkins console.
Copy public IP ở trong AWS dashboard trong Linux EC2 instance, dán vào trong browser cùng với port 8080. Ở lần đăng nhập đầu tiên sẽ yêu cầu đăng ký tài khoản.

Màn hình sau khi đăng nhập
![](https://images.viblo.asia/8e65b755-be41-477e-8b8e-304f46881172.png)

## 7. Tạo private key ở trong Jenkins global credentials
![](https://images.viblo.asia/4307ca00-7bb8-4b34-9eee-f279f0f0a1e1.png)
![](https://images.viblo.asia/0696e909-28a3-4917-8b35-ced21392185d.png)
![](https://images.viblo.asia/25049e35-03e9-4d78-8dac-4d046a63f4e0.png)
![](https://images.viblo.asia/a6a74b60-35d5-42d0-bf14-4fd3c03f652c.png)

Cách lấy Private Key - tại màn hình console ở trong Container gõ lệnh

    cat /root/.ssh/id_rsa
    # ở trên có root- username được mô tả ở bước 4


**Lưu ý**: khi mà copy private key thì cần cả 2 dòng Begin và End. Mục đích để phân biết SSH key với các loại key khác.

## 8. Tạo public key ở trong Git Repo
![](https://images.viblo.asia/872c62ca-7d7f-41d7-b65b-03d9f4ac66ec.png)

Ở trong git repo, Open-> SSH-> add new public key.

Hoặc là truy cập trực tiếp vào link :https://github.com/settings/keys

Chọn New SSH Key
![](https://images.viblo.asia/1186377a-ba05-460d-a24e-2d9457ab77ee.png)

Cách lý public key để fill vào Key ở bước trên. tại màn hình console ở trong Container gõ lệnh

    cat /root/.ssh/id_rsa.pub

## 9. Tạo và build project trong Jenkins
Quay lại màn hình console của Jenkins-> New Item -> Nhập tên project -> chọn Freestyle project -> OK

![](https://images.viblo.asia/3355e506-9787-4681-bac0-48205a5b6321.png)

Bước này khi ban đầu khi fill git SSH URL vào RepositoryURL trong console thì sẽ bị báo lỗi như trên. 
Lúc này tại console của Container này run câu lệnh git được báo lỗi trong console Jenkins.

    git ls-remote -h -- git@github.com:sanglam2806/javaweb_udacity_pr4.git HEAD

![](https://images.viblo.asia/70a75444-a81a-4340-a77b-a6472dcbbe70.png)

Lỗi đã bị mất.

Fill những phần còn lại như dưới:
![](https://images.viblo.asia/a461c3c2-052a-4fa0-b3b6-033cebef3743.png)
![](https://images.viblo.asia/0d9d0c6b-ee5b-48ac-8129-cc8e428296e0.png)

Ví dụ về đường dẫn của file pom ở trên
![](https://images.viblo.asia/c6b3b649-a2b5-45fc-99d8-8a4b3336a144.png)