# Amazon Elastic Container Service

Được gọi tắt là ECS là một service quản lý container có tính scale cao và nhanh. Dễ dàng run, stop, hay quản lý docker container ở trong một cluster. Bạn có thể host một serverless infrastructure bằng cách chạy service hay task sử dụng Fragate launch type. 

Amazon ECScho phép bạn launch hay stop container-based thông qua API, cho phép bạn lấy state của cluster từ centralized service cũng như cho phép access tới các feature giống như EC2

Bạn có thể sử dụng Amazon ECS để cài đặt contaner thông qua cluster và dựa và nguồn tài nguyên mà bạn cần, chính sách độc lập hay khả năng thay đổi. Amazon ECS sẽ giúp bạn không phải operate việc quản lý cluster hay cấu hình system hay quản lý scaling infrastructure. 

Amazon ECS có thể được sử dụng để tạo ra một deployment thích hợp, scale batch, và Extra-Transform-Load và build kiến trúc của ứng dụng trên một microservice model

AWS elastic beanstalk cũng được sử dụng cho việc phát triển, test, hay deploy Docker container với các thành phần khác trong ứng dụng infra của bạn thế nhưng sử dụng Amazon ECS trực tiếp sẽ kiểm soát trơn tru hơn và truy cập rộng hơn 

# Các tính năng của ECS

Amazon ECS là một dịch vụ theo region, nó đơn giản hoá việc chạy ứng dụng containers trên nhiều AZ trong cùng một Region. 
Bạn có thể tạo một ECS cluster bên trong một VPC mới hoặc cũ. Sau khi một cluster được khởi tạo và chạy, bạn có thể định nghĩa cá task và services mà nó chỉ định Docker contatainer image sẽ chạy thông qua clusters. 

Các container images được lưu và pull về từ container registeries nó có hteer tồn tại bên trong or bên ngoài AWS infrastructure của bạn

![](https://images.viblo.asia/8ae392cf-3e6e-4bce-bf4a-fa1f5911a59a.png)


## Container và Images

Để deploy ứng dụng trên ECS, Các thành phần trong ứng dụng của bạn phải được kiến trúc để chạy containers. 
Một Docker container là một đơn vị chuẩn của phát triển phần mềm nó chứa tất cả các phần mềm cần thiết để chạy code, runtime, system tools, system libaries … Containers được tạo ra từ read-only template (image)

Image về cơ bản thì được build từ Dockerfile, là một text file chỉ ra tất cả các thành được chứa trong container. Những Image này sau đó sẽ được lưu vào  trong một registry, chúng có thể được download và chạy trong cluster. 

![](https://images.viblo.asia/5034bd80-4d9f-4c52-8b5d-6eb0b9b11524.png)

## Task definition

Task definition là một text file (json format). Nó sẽ mô tả 1 hoặc nhiều container (tối đa là 10) để hình thành nên ứng dụng của bạn. 
Task definition sẽ chỉ ra một vài parameter cho ứng dụng như container nào sẽ được sử dụng, launch type sẽ được dùng, những port nào sẽ được mở cho ứng dụng và data volume gì sẽ được với containers trong task. 

Parameter trong task definition phụ thuộc vào launch type nào đang được sử dụng 

Ví dụ về task definition chứ một container dùng để chạy một NGINX web server sử dụng Farage launch type. 
```
{
    "family": "webserver",
    "containerDefinitions": [
        {
            "name": "web",
            "image": "nginx",
            "memory": "100",
            "cpu": "99"
        },
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "networkMode": "awsvpc",
    "memory": "512",
    "cpu": "256",
}
```

## Task và schedule

Một task là việc khởi tạo một task definition bên trong  cluster. Sau khi bạn tạo một task definition cho ứng dụng trong ECS, bạn có thể chỉ định một lượng task nhất định chạy trên cluster. 

Với mỗi một task sử dụng Fargate launch type có một ranh giới riêng biệt và không share kernel, cpu resource, memory, hay elastic network interface với task khác

Amazon ECS task scheduler chịu trách nhiệm cho việc thay thế các task bên trong cluster. 
Có một vài cách khác nhau để lên schedule cho task
* Service schedule
* Manually running task
* Running task on a cron-like schedule
* Custom scheduler

![](https://images.viblo.asia/3489dede-6e8f-415d-90d0-1a501cea6c2f.png)

## Cluster

Khi các tasks được chạy trên ECS là khi đó chúng được đặt trong cluster, Khi sử dụng Fargate lauch type với các task bên trong cluster, ECS sẽ quản lý cluster resources. Khi sử dụng EC2 launch type thì các cluster là những group container instances.

Một ECS containter là một  instance Amazon EC2 instance mà nó chạy ECS container agent. Amazon ECS download container images của bạn từ registry mà bạn đã setting trước đó sau đó sẽ run những images này trong cluster của bạn 

* Cluster là Region-specific 
* Cluster có thể chứa nhiều tasks sử dụng cả Fargate và EC2 launch type. 
* Cho các task sử dụng EC2 launch type , các clusters có thể chứa nhiều container instance type khác nhau, nhưng mỗi một container instance có thể chỉ là một phần của một cluster tại một thời điểm
* Bạn có thể tạo một custom IAM policy cho cluster cho phép hoặc giới hạn user access tới clusters

# Tham khảo
Trên đây là một số khái niệm cơ bản về AWS ECS được tham khảo từ [amazon](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)