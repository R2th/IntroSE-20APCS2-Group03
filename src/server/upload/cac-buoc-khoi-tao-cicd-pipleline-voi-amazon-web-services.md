# Overview
Tiếp nối ở bài viết trước về các bước khởi tạo CI/CD Pipeline với Google Cloud Services
Ở bài viết này, chúng ta sẽ cũng tìm hiểu cách để khởi tạo một CI/CD Pipeline bằng cách sử dụng Amazon Web Services: AWS CodeCommit, AWS CodeBuild, AWS Pipeline, AWS ECS & Fargate.

**Các kiến thức tiền đề**
Để có thể hiểu rõ hơn về bài viết này, người đọc sẽ cần có **Basic AWS Cloud Knowledge**
Có thể tham khảo[ tài liệu sau](https://www.analyticsvidhya.com/blog/2021/06/deploying-machine-learning-application-on-aws-fargate/) 

# Introduction
Có thể nói, chúng ta đã có một quãng đường dài trong ngành công nghệ, với những tiến bộ hiện nay thì khi thực hiện deploy website hoặc application, chúng ta không cần quan tâm quá nhiều về hạ tầng Infra, server, network management hay việc scale hạ tầng Infra dựa trên network traffic nữa. 

Chúng ta hoàn toàn có thể dựa vào mô hình cloud computing

### Vậy Cloud Computing là gì?
Cloud Computing là service cung cấp theo yêu cầu của người dùng các dịch vụ như computing power, các server, database, phần mềm cho người dùng sử dụng với định giá trả theo số lần sử dụng.

Giờ thì doanh nghiệp không còn cần phải tốn quá nhiều chi phí cho việc dựng physical server, data center. Chúng ta hoàn toàn có thể truy cập các dịch vụ như computing power, các server, database, dựa trên nhu cầu sử dụng.

Các Cloud Services phổ biến hiện nay có thể kể đến như: Amazon Web Services (AWS), Cloud Cloud Platform(GCP), or Azure Cloud.

Phân loại Models Cloud Computing
### Infrastructure as a Service (IaaS)
IaaS cung cấp quyền truy cập vào các tính năng network, máy tính (máy tính ảo hoặc trên phần cứng chuyên dụng) và không gian lưu trữ dữ liệu. Các service này rất linh hoạt và người dùng hoàn toàn làm chủ việc kiểm soát các resource mình đang sử dụng (VD: AWS ES2)

### Platform as a Service (PaaS)
Với mô hình PaaS, chúng ta sẽ không cần phải quản lý hạ tầng Infra cơ bản (thường là phần cứng và hệ điều hành), và chỉ cần tập trung vào việc phát triển phần mềm VD: AWS Elastic Beanstalk

### Software as a Service (SaaS)
SaaS cung cấp cho chúng ta một product hoàn chỉnh được quản lý và điều hành bởi bên cung cấp dịch vụ. VD: Gmail

**Advantages of Cloud Computing**

**Flexible access**: Cho phép truy cập vào cloud services từ bất kì đâu thông qua internet.

**High availability**: Đảm bảo resource luôn available dựa trên yêu cầu của khách hàng, cung cấp khả năng chịu lỗi.

**Flexible scaling**: Cho phép sacling các resouce dựa trên nhu cầu, của người dùng, có thể thực hiện manual hoặc automatic.

**Reduce IT cost**: Giảm các chi phí trả trước, tối ưu việc sử dụng tài nguyên, giảm thải tiêu thụ năng lượng và không gian chứa server, data center dựa trên mô hình trả phí theo số lần sử dụng.

**Business continuity**: Giảm impact của thời gian chết.

# AWS
Amazone Web Services cung cấp các dịch vụ kiện toán đám mây rất đáng tin cậy với độ bảo mật cao, có thể mở rộng quy mô linh hoạt và tiết kiệm chi phí. AWS cung cấp các cơ sở hạ tầng Infra như là một dịch vụ Infrastructure as a service(IaaS), Platform as a Service(PaaS), Software as a Service(SaaS) và đồng thời cũng cung cấp một model mới là Function as a Service(FaaS) như AWS Lambda là **một entity không có máy chủ**

Về các background knowledge liên quan đến AWS, các bạn có thể tham khảo chuỗi các bài viết liên quan đến setting AWS:
https://viblo.asia/p/aws-essentials-phan-1-guildline-settings-iam-tren-aws-1Je5EDDmlnL

### Amazon Elastic Container Service(ECS)
Amazon ECS là một nền tảng điều phối container phát triển bởi Amazon, tương đồng với Kubernetes.

Amazon Elastic Container Service (ECS) giúp lên schedule và sắp xếp các container trên một nhóm các server.

![](https://images.viblo.asia/872a6927-fe2f-4502-9fc9-587c4d04ac7f.png)

Source: [AWS ECR](https://aws.amazon.com/ecs/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&ecs-blogs.sort-by=item.additionalFields.createdDate&ecs-blogs.sort-order=desc)

Hai thành phần chính của ECS là Tasks và Services.

Task là một hoặc nhiều container sẽ được ECS lên schedule cùng nhau.

A Service giống như một Auto Scaling group cho các task. nó tự định nghĩa số lượng các task để run thông qua cluster, nơi mà các task cần phải chạy, tự động liên kết chúng với load balancer, và chia tỉ lệ theo chiều ngang dựa trên các metrics (số liệu) mà người dùng đã định nghĩa như là Memory Ultilization,....

Một service quan trọng khác của AWS service là Elastic Container Registry(ECR), đây là một service để đăng kí lưu trữ, quản lý các container images.

###  Khái niệmFargate?
AWS Fargate là một compute engine không máy chủ dành cho Amazon ECS để thực hiện chạy các container mà không cần lo lắng về các cơ sở hạ tầng Infra phía dưới. Với Fargate, chúng tá sẽ chỉ định một image đại diện trong ECR để deploy với thông số CPU cũng như memory cần thiết. Fargate xử lý việc cập nhật và bảo mật dưới Linux OS, Docker daemon, và ECS agent được biết như là các hạ tầng Infra để quản lý cũng như scaling.

Giờ chúng ta sẽ bắt đầu làm việc trên AWS cloud.

# Steps để Deploy Application trên AWS Fargate
**Step1**: Bước đầu tiên chúng ta cần login vào AWS management console và search theo keyword ECR

![](https://images.viblo.asia/72af84a6-29a9-4f15-b60f-ad2fa15482a1.png)

**Step2**: Click vào ‘Get started’ trên page tiếp theo, site sẽ yêu cầu bạn tạo repository. Điền các thông tin cần thiết. Bạn có thể tạo một private hoặc public repository, đặt tên cho repository và click  ‘Create repository’

![](https://images.viblo.asia/c4427e90-9ae3-4f00-bd90-3bf0c66e2816.png)

**Step3**: Lúc này ECR đã sẵn sàng, click vào repository radio button, và  ‘View push commands’ button sẽ xuất hiện

![](https://images.viblo.asia/73bb3b39-4a84-4b05-b380-55daeedc89bd.png)

**Step4**: Tiếp tục clicck vào ‘View push commands’, sẽ xuất hiện popup command để upload một docker images lên Elastic container registry(ECR)

**Note**: Chúng ta cần có sẵn docker image để push lên ECR.

Các bạn có thể tham khảo các image khả dụng sử dụng docker images command, dưới đây là một docker image đã được chuẩn bị sẵn để deploy và push lên ECR.

![](https://images.viblo.asia/bf463e30-befb-4eea-9383-927cf6ef97ba.png)

Trước khi chạy AWS command chúng ta sẽ cần install AWS CLI, tham khảo [bài viết sau](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) để install AWS CLI  

AWS Command Line Interface(CLI) là command line tool để quản lý AWS.

![](https://images.viblo.asia/a717ba38-315f-40f6-b854-6068cd7441a1.png)

Với Linux, chúng ta sẽ chạy command sau để instal CLI 

![](https://images.viblo.asia/be527178-3e8a-42dd-8f7d-fe407e29e94b.png)

Chúng ta có thể check xem install có thành công hay không bằng cách sử dụng command ‘aws –version’

Tiếp theo chúng ta sẽ cần config với AWS account credentials để execute AWS commands. Click vào account và tiếp tục click vào ‘My Security Credentials‘ sau đó sẽ khởi tạo. Credentials sẽ được tạo và sau đó người dùng có thê download chúng.

![](https://images.viblo.asia/a8f2cea6-821b-42fa-8537-7a9787961505.png)

Bây giờ, trên terminal sẽ chạy  ‘aws configure command để config credentials của bạn, chỉ định credentials, và set bất kì region nào sau đó với output format, bạn có thể ấn Enter (hoặc use json như là output format).

![](https://images.viblo.asia/75fd9791-5ad8-4adb-b6d6-222f23e4f759.png)

Giờ chúng ta đã setting xong và có thể push docker image lên ECR.

**Step5**: Follow commands dựa trên Operating system bạn đang chạy, chạy command ở dưới local terminals. Nếu bị gặp lỗi get permission denied thì sử dụng sudo trước khi chạy docker commands.

![](https://images.viblo.asia/a99f685f-11ef-4056-8286-06eca390dffe.png)

Nếu bạn đã sàng tạo docker image thì tạm chưa chạy run build command và nếu chưa tạo docker image thì sẽ đi tới directory nơi lưu trữ Dockerfile và chạy command chỉ định.

![](https://images.viblo.asia/0d4ff443-d74c-4ee7-96f1-4f6ce43351c2.png)

Và đó là các step để push docker image lên ECS, chúng ta có thể xác nhận lại từ console.

![](https://images.viblo.asia/53b9699d-c1f4-4555-8d3f-c7b6d0b25e8f.png)

**Step6**: Giờ chúng ta cần khởi tạo một cluster. Check panel bên trái cho các Cluster và click vào đó. Trên redirect page click vào ‘Create Cluster’. Chọn  ‘Networking only‘ và click để config cluster. Assign name cho cluster và add tags cho nó (Điều này sẽ rất hữu dụng khi bạn làm việc trong tổ chức và cần phân biệt giữa các project để take note billing) sau đó click create.

![](https://images.viblo.asia/8635277d-047e-4b0e-9e12-56636fe6fcda.png)

**Step7**: Giờ chúng ta cần tạo ‘Task Definition’. Click vào ‘View cluster’ và phía bên trái bạn sẽ thấy ‘Task Definitions’ option, click vào mục này. Sau đó click vào ‘Create new Task Definition‘ và chọn Fargate là launch type sau đó click next để config.

![](https://images.viblo.asia/7927dae4-8949-401a-b2b7-880280b92e9a.png)

Tiếp theo chúng ta cần config Task Definition, đặt tên, và chỉ định task Memory cũng như CPU cần để chạy task.

![](https://images.viblo.asia/850accd3-ee44-4a01-9b7e-52d1d594a6ca.png)

![](https://images.viblo.asia/dc4d55bf-b8e4-4408-8f47-b71b8072e17b.png)

Click vào Add container, để thêm container chúng ta đã push lên ECR. Đặt tên và image URI chúng ta đã copy ở sep trước sau đó chỉ định pỏt mappings thành 5000 để cho phép các container truy cập vào port của host containers để send hoặc nhận traffic. Sau đó click Add và click Create.

![](https://images.viblo.asia/ca6ad007-8dcb-481b-aa81-e0e1f9f457d6.png)

![](https://images.viblo.asia/cd7864c6-07be-44c5-822d-214553d15112.png)

Giờ chúng ta có thể view  ‘Task Definition‘

![](https://images.viblo.asia/746d365d-f4f8-4efc-a4e2-cec890a8bbe4.png)

**Step8**: Click vào Actions và Run Task, chọn launch type là Fargate 

![](https://images.viblo.asia/9fe08a5e-8ab8-425f-8677-8db9b4bacbcc.png)

Chọn VPC và subnet từ dropdown sau đó click **Run Task**

![](https://images.viblo.asia/8a2d81ae-0a99-40c7-8772-f19f5f89fe0f.png)

**Step9**: Lúc này các Task đã được khởi tạo thành công, chúng ta cần add inbound rule cho security group để access application vào port 5000.

Click vào các task đã tạo và trên page tiếp theo click vào ENI Id phía dưới Network section và note lại Public IP.

![](https://images.viblo.asia/57fc4193-a178-4be4-9fbb-bab3ec767cac.png)

![](https://images.viblo.asia/d9346754-e9b4-42e9-97b5-eed614b816bf.png)

Page sẽ được redirect tới page network interface, click vào checkbox, sau đó chọn security group phía dưới Details section.

![](https://images.viblo.asia/301a69a6-537b-461c-8540-be78d25560b4.png)

Giờ click vào Edit inbound rules và click Add rule. Add một custom TCP rule cho port 5000 và source là 0.0.0.0/0 (để đảm bảo application có thể access thông qua mọi IP) sau đó  click Save rules.

![](https://images.viblo.asia/20b25069-aaa6-4b97-948b-cd9c0fe23a32.png)

Bây giờ chúng ta có thể access toàn bộ application sử dụng Public IP thông qua Network section và port 5000.

![](https://images.viblo.asia/bd6cea50-96e9-4086-b1b2-4d72acaba6f6.png)

Reference/ Nguồn:
https://www.analyticsvidhya.com/blog/2021/06/deploying-machine-learning-application-on-aws-fargate/

https://aws.amazon.com/what-is-cloud-computing/

https://aws.amazon.com/blogs/compute/building-deploying-and-operating-containerized-applications-with-aws-fargate/