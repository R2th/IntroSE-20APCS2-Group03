## 1. Giới thiệu về Jenkins Agent
Bản thân Jenkins Controller có thể vừa quản trị các biến môi trường, vừa chạy các jobs bằng tài nguyên mà nó sở hữu. Tuy nhiên, khi số lượng jobs (hay cụ thể hơn là project pipeline) quá lớn, Jenkins Controller không thể cứ "vertical scale" (nâng RAM, CPUs, ...)  lên mãi được. Ngoài ra, việc để tất cả các jobs cùng chạy trên Controller còn dẫn đến nhiều vấn đề về bảo mật, khi mà tất cả người dùng đều có quyền truy cập vào resource, enviroment của Jenkins Controller.

Giải pháp cho vấn đề nêu trên là Jenkins Agent.

Jenkins Agent là một machine (VM, docker container, máy chủ vật lý, AWS EC2 instance, ...) kết nối và nhận jobs từ Controller. Nhiều agent kết nối với controller sẽ tạo ra kiến trúc phân tán cho Jenkins, ngoài việc giảm workloads cho Controller, tăng cường bảo mật, còn nâng cao khả năng sẵn có cho hệ thống.
## 2. Kết nối Agent với Controller
Hiện tại có 2 cách kết nối Agent với Controller phổ biến: SSH connector và Inbound connector.
![](https://images.viblo.asia/fbfa5585-b66b-4de0-b41a-32f1a8bc019a.png)
### 2.1 SSH connector
Với cách thức kết nối này, Jenkins Controller sẽ có thông tin remote SSH, SSH key để chủ động call tới agent.

**Demo cấu hình SSH connector cho agent (Docker container trên Linux)**

Yêu cầu:
- Machine 1: đã cài đặt Jenkins (đóng vai trò là Jenkins Controller), cung cấp giao diện quản trị Jenkins.
- Machine 2: hệ điều hành Linux, đã cài đặt Docker (để chạy container Jenkins Agent)

#1 Trên machine 2, tạo SSH key với lệnh
```shell
ssh-keygen -f ~/.ssh/jenkins_agent_key
```

#2 Start agent trên machine 2:

Start agent container
```shell
docker run -d --rm --name=agent1 -p 22:22 \
-e "JENKINS_AGENT_SSH_PUBKEY=[your-public-key]" \
jenkins/ssh-agent:alpine
```
Trong đó, [your-public-key] là nội dung file ~/.ssh/jenkins_agent_key.pub (đã tạo ở B1)

Cập nhật container enviroment
```shell
$ VARS1="HOME=|USER=|MAIL=|LC_ALL=|LS_COLORS=|LANG="
$ VARS2="HOSTNAME=|PWD=|TERM=|SHLVL=|LANGUAGE=|_="
$ VARS="${VARS1}|${VARS2}"
$ docker exec agent1 sh -c "env | egrep -v '^(${VARS})' >> /etc/environment"
```
Lấy thông tin javaPath (để cấu hình cho bước sau):
```
docker exec agent1 which java
```

#3 Trên giao diện Jenkins Controller, tạo Jenkins SSH credential

Truy cập mục Manage Jenkins --> Manage Credentials --> Add Credentials (trong mục Global)
![image.png](https://images.viblo.asia/7467f0e7-af80-4174-8148-ea7d77e12bcd.png)

Trong mục New Credentials, điền các thông tin
* Kind: SSH Username with private key
* Scope: Global
* Username: agent1-credential (cái này bạn có thể tùy chỉnh theo ý muốn)
* Private key: tick chọn "Enter directly", click Add, điền nội dung file ~/.ssh/jenkins_agent_key (đã tạo ở B1)

Click Create để tạo Credential.

#4 Trên giao diện Jenkins Controller, khởi tạo Agent

Truy cập mục Manage Jenkins --> Manage Nodes and Clouds --> (+) New Node

Điền tên node, tick chọn Permanent Agent, click Create.

Trong mục New Agent, điền các thông tin:
* Remote directory: /home/directory
* Label: ssh-agent (phần này bạn có thể tùy chỉnh, đây là trường ta sẽ dùng để khai báo Agent trong Jenkinsfile)
* Launch method: Launch Agent via SSH
    * Host: <agent_IP>
    * Credentials: agent1-credential (Credential ta đã tạo ở bước trên)
    * Host key verification Strategy: Manual trusted key Verification Strategy
    * Click **Advanced** để cấu hình tham số nâng cao
        * Port: 22 (có thể open port khác tùy theo agent container port)
        * JavaPath: <java_path> (đã có ở B2)

Click Save.

#5 kiểm tra agent kết nối thành công.
Truy cập mục Log của agent, trường hợp kết nối thành công sẽ có kết quả tương tự như ảnh dưới:
![image.png](https://images.viblo.asia/7dae8daf-dfbd-4802-b31a-8382d445106c.png)

### 2.2 Inbound connector
Đối với cách này, Jenkins Agent sẽ chủ động kết nối tới Jenkins Controller bằng cách chạy lệnh với file agent.jar

**Demo cấu hình inbound connector cho agent (VM hoặc máy chủ vật lý)**

Yêu cầu:
- Machine 1: đã cài đặt Jenkins (đóng vai trò là Jenkins Controller), cung cấp giao diện quản trị Jenkins.
- Machine 2: hệ điều hành Linux, đã cài đặt java

#1 Khởi tạo agent trên giao diện quản trị Jenkins

Truy cập mục Manage Jenkins --> Manage nodes and clouds --> (+) New node

Trong mục New Node, điền các thông tin
* Remote directory: /home/directory
* Label: inbound-agent (phần này bạn có thể tùy chỉnh, đây là trường ta sẽ dùng để khai báo Agent trong Jenkinsfile)
* Usage: Only build jobs with label expressions matching this node
* Launch method: Launch agent by connecting it to the controller

Click Save.

Trong mục Manage Jenkins --> Manage nodes and clouds, click chọn agent vừa tạo.

Jenkins sẽ sinh sẵn command để kết nối tới Jenkins Controller từ machine chạy agent.
![image.png](https://images.viblo.asia/e872c9ed-9d20-4aaa-80bc-ec24ee3c736c.png)

#2 Chạy lệnh trên machine 2

Download file agent.jar (tại đường dẫn http://<jenkins-host>/jnlpJars/agent.jar), copy lệnh phía trên và chạy

*Lưu ý*: cần đảm bảo machine 2 đã cài java.

Kết quả thu được khi agent kết nối thành công:
    ![image.png](https://images.viblo.asia/c8b6671f-43fc-4f4c-b2fa-2c77b1814231.png)

Chúc mọi người cài đặt thành công và có trải nghiệm thú vị với Jenkins :))) !
## 3. Link tham khảo
https://www.jenkins.io/doc/book/using/using-agents/
https://www.jenkins.io/doc/book/scaling/architecting-for-scale/