### Mở đầu
##### CI là gì?
CI là Continuous Integration. Nó là phương pháp phát triển phần mềm yêu cầu các thành viên của team tích hợp công việc của họ thường xuyên, mỗi ngày ít nhất một lần. Mỗi tích hợp được "build" tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể. Cả team nhận thấy rằng cách tiếp cận này giảm thiểu vấn đề tích hợp và cho phép phát triển phần mềm nhanh hơn.

##### Lợi ích mà CI mang lại cho chúng ta:
- Giảm thiểu rủi ro nhờ việc phát hiện lỗi và fix sớm, tăng chất lượng phần mềm nhờ việc tự động test và inspect
- Giảm thiểu những quy trình thủ công lặp đi lặp lại (build css, js, migrate, test...), thay vì đó là build tự động, chạy test tự động
- Sinh ra phần mềm có thể deploy ở bất kì thời gian, địa điểm
- Tạo phần mềm có giá trị sử dụng sớm nhất có thể và sẳn sàng triển khai mọi lúc mọi nơi.
- Cải thiện chất lượng phần mềm.

##### Tại sao lại sử dụng Jenkins:
- Dễ dàng cài đặt và sử dụng.
- Đa nền tảng.
- Hỗ trợ cho nhiều công nghệ phát triển phần mềm.
- Được sử dụng rộng rãi.
- Dễ mở rộng.
- Dễ dàng liên kết với các công cụ khác của hệ thống tích hợp liên tục thông qua các plug in.
- Miễn phí
### Install
Đầu tiên các mình sẽ create 1 instance trên AWS (Đoạn này không có gì các bạn cứ tạo bình thường thôi nhé) <br>
Ở đây mình tạo server Centos 7 nhé. :D
![](https://images.viblo.asia/519511f4-0944-4bcc-be25-59e8a27b7b22.png)

Sau đó các bạn bấm chọn connect rồi copy lệnh này ssh đến server của chúng ta nhé. <br>
Sau khi ssh vào server chúng ta chạy lệnh này để update lại server của chúng ta nhé.
```bash
yum update -y
```

Ok. XOng chúng ta sẽ cần cài Java và config lại chút với lệnh sau:

```bash
yum install -y java-1.8.0-openjdk-devel.x86_64

alternatives --config java
//Sau khi chạy lệnh này nó sẽ hỏi chúng ta chọn selection nào thì chúng ta nhập 1 vào nhé

// Sau đó kiểm tra xem java đã được cài đặt chưa
java -version

openjdk version "1.8.0_252"
OpenJDK Runtime Environment (build 1.8.0_252-b09)
OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)
```
Ok, vậy là cài xong java.
- Tiếp theo chúng ta sẽ cài Jenkins:
```bash
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
```

Chú ý: Nếu bạn chưa cài wget thì bạn cần cài nó với lệnh sau:

```bash
yum install wget
```

- Tiếp theo import key và install jenkins
```bash
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
yum install -y jenkins
```

- Start Jenkins:
```bash
systemctl start jenkins
```

Ok, Vậy là Jenkins của chúng ta đã chạy. Mặc định no sẽ chạy ở port 8080. Vì vậy chúng ta sẽ cần mở port 8080. Quay trở lại màn dashboard chúng ta sẽ thấy như sau:
![](https://images.viblo.asia/e970f4c2-d3be-488d-87d1-452e2391f8b5.png)

Click vào security group sẽ như sau:
![](https://images.viblo.asia/0fafe191-87b4-49a9-adef-ac8870c07a1d.png)

Mặc định nó đang mở port 22 để cho chúng ta ssh vào server. Bây giờ chúng ta sẽ thêm port 8080: <br>
Click vào edit bound rules: <br>
![](https://images.viblo.asia/0aff11f3-6de2-438e-abd1-9dc709dea66d.png)
Save lại là xong.
Copy lại public Ip của server và truy cập:

```
ip:8080
```

Nó sẽ hiện lên như sau:
![](https://images.viblo.asia/a84e50eb-5f57-4912-bc01-34a901e85207.png)
Vậy là Jenkins đã hoạt động. Giờ chúng ta sẽ cần unlock Jenkins với password như thông báo ở trên:

```
vi /var/lib/jenkins/secrets/initialAdminPassword
```

Ok. Nó sẽ hiện ra 1 đoạn password và chúng ta sẽ copy nó và dán lại vào vào màn hình unlock Jenkins:
![](https://images.viblo.asia/b4bf3820-45f0-4684-8bfc-a2a19b4ab248.png)
Chúng ta sẽ chọn install suggested plugins để Jenkins tự động cài những plugin cần thiết cho chúng ta.
<br>
Sau đó nó sẽ hỏi chúng ta tạo 1 tài khoản. Và tạo xong là xong.
![](https://images.viblo.asia/1988595c-424f-4e9d-9bf0-71c24508e401.png)

Vậy là chúng ta đã cài xong Jenkins rồi. <br>
Phần tiếp theo mình sẽ hướng dẫn các bạn sử dụng Jenkins để auto deploy khi mà github có pull request được merged. :D