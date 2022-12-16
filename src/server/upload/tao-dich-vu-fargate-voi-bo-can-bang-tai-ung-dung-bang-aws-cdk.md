## TL;DR Talk is cheap. Show me the code.

Bạn có thể tham khảo mã nguồn tại [Github repository này](https://github.com/vntechies/011-aws-cdk-scheduled-fargate-task)

## Tạo AWS VPC

Trước khi có thể bắt đầu xây dựng dịch vụ Fargate của mình, chúng ta cần thiết lập một Virtual Private Cloud (VPC). VPC là một mạng ảo được tách biệt cho phép bạn khởi tạo vào triển khai các tài nguyên AWS của mình, ví dụ như các dịch vụ Fargate

Bạn có thể chỉ định dải địa chỉ IP cho VPC, thêm mạng con (subnet), liên kết nhóm bảo mật (security group)và định cấu hình bảng định tuyến (route tables). Đối với bài viết này, chúng tôi sẽ tạo một VPC với 9 mạng con được chia trên 3 AZs bằng AWS CDK.

Sau đây là một ví dụ về cách tạo VPC.

Dưới đây là một ví dụ về cách tạo VPC:

```python:aws_cdk_alb_fargate_service_stack.py
# Tạo VPC với 9 subnets trên 3 AZs
my_vpc = ec2.Vpc(
    self,
    "my_vpc",
    nat_gateways=1,
    cidr="172.31.0.0/16",
    max_azs=3,
    subnet_configuration=[
        ec2.SubnetConfiguration(
            name="public",
            cidr_mask=20,
            subnet_type=ec2.SubnetType.PUBLIC,
        ),
        ec2.SubnetConfiguration(
            name="application",
            cidr_mask=20,
            subnet_type=ec2.SubnetType.PRIVATE_WITH_NAT,
        ),
        ec2.SubnetConfiguration(
            name="data",
            cidr_mask=20,
            subnet_type=ec2.SubnetType.PRIVATE_ISOLATED,
        ),
    ],
)
```

## Tạo AWS ECS Cluster

Sau khi đã triển khai các tài nguyên phụ thuộc, chúng ta có thể tiếp tục với tài nguyên Fargate thực tế. Đoạn mã tiếp theo sử dụng thư viện Cấu trúc CDK chính thức cho Cấu trúc ECS cấp cao hơn (aws-ecs-pattern) để tạo Nhiệm vụ Fargate đã lên lịch:

```python:aws_cdk_alb_fargate_service_stack.py
# Tạo ECS Cluster
cluster = ecs.Cluster(
    self,
    "service-cluster",
    cluster_name="service-cluster",
    container_insights=True,
    vpc=my_vpc,
)
```

## Tạo một dịch vụ Fargate với bộ cân bằng tải ứng dụng (ALB) sử dụng AWS CDK

Sau khi đã triển khai các tài nguyên trên, chúng ta có thể tiếp tục với tài nguyên Fargate. Đoạn mã dưới dây sử dụng [CDK Construct library for higher-level ECS Constructs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-ecs-patterns-readme.html) (aws-ecs-patterns) để tạo một dịch vụ Fargate với bộ cân bằng tải ứng dụng (ALB):

```python:aws_cdk_alb_fargate_service_stack.py
image = ecs.ContainerImage.from_registry("amazon/amazon-ecs-sample")

ecs_patterns.ApplicationLoadBalancedFargateService(
    self,
    "amazon-ecs-sample",
    circuit_breaker=ecs.DeploymentCircuitBreaker(rollback=True),
    desired_count=1,
    task_image_options=ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
        image=image,
        container_port=80,
        log_driver=ecs.LogDriver.aws_logs(
            stream_prefix="alb-fargate-service",
            log_retention=aws_logs.RetentionDays.ONE_DAY,
        ),
    ),
)
```

- `circuit_breaker` Bật tính năng này cho phép bạn tự động rollback lại các tác vụ liên quan tới ECS của mình với CloudFormation sau khi vượt quá giới hạn ngưỡng triển khai không thành công (kiểm tra health check không thành công).
- `desired_count` số lần khởi tạo định nghĩa tác vụ (task definition) mong muốn để tiếp tục chạy trên dịch vụ.
- `ecs_patterns.ApplicationLoadBalancedFargateService` tại đây dịch vụ Fargate và bộ cân bằng tải ứng dụng được khởi tạo sử dụng thư viện patterns mẫu của ECS. Chúng ta tham chiếu đến cluster đã được tạo trong phần trước để AWS CDK biết vị trí cần để triển khai dịch vụ Fargate.
- `taskImageOptions` chúng ta cấu hình các chi tiết cho container chẳng hạn như image. Trong bài viết này, chúng ta sử dụng hình ảnh mẫu `amazon/amazon-ecs-sample`, AWS CDK sẽ tự động lấy image này từ Amazon ECR và sử dụng để triển khai dịch vụ Fargate.
- `containerPort=80` cho biết cổng nào sẽ được expose từ dịch vụ Fargate.
- Bạn có thể chỉ định thời gian lưu giữ cho logs của tác vụ. Mặc định, AWS CDK không cài đặt thời gian lưu trữ cho các logs được tạo bởi các tác vụ của nó. Nếu bạn muốn có cài đặt thời gian lưu trữ log của mình, bạn cần định nghĩa với thuộc tính `log_retention` trên `log_driver`. Giá trị `aws_logs.RetentionDays.ONE_DAY`, có nghĩa là log sẽ bị xoá sau 1 ngày.

![Dịch vụ Fargate đã được tạo](https://images.viblo.asia/75e79ae8-817d-4c02-af08-8056ae504a5d.png)

![Khi truy cập vào địa chỉ được cung cấp](https://images.viblo.asia/539d191e-b9f7-42fd-bdf9-bca062d30724.png)

## Dọn dẹp tài nguyên

Xoá stack vừa được tạo bởi AWS CDK để tránh phát sinh chi phí không cần thiết bạn nhé 😉

```shell
cdk destroy
```

## Kết luận

Qua hướng dẫn này, chúng ta đã:

- Tạo AWS VPC
- Tạo một AWS ECS Cluster
- Tạo một dịch vụ Fargate với bộ cân bằng tải ứng dụng (ALB)

Việc sử dụng các Construct level cao hơn hoặc còn được gọi là là các mẫu (patterns), chẳng hạn như các mẫu `ECS` mà chúng ta đã sử dụng trong ví dụ này giúp giảm bớt rất nhiều công việc trong việc tạo ra nhiều tài nguyên AWS và có cả những giá trị mặc định hợp lý được cài đặt sẵn. Các mẫu như vậy có thể tiết kiệm thời gian phát triển, nhưng chúng ta sẽ có ít các thiết lập được tuỳ biến hơn.

## Bài viết gốc 

- [Tạo dịch vụ Fargate với bộ cân bằng tải ứng dụng bằng AWS CDK - VNTechies Dev Blog 🇻🇳 - Kho tài nguyên về Cloud ☁️ / DevOps 🚀](https://vntechies.dev/courses/aws/cdk/tao-dich-vu-fargate-voi-bo-can-bang-tai-ung-dung-bang-aws-cdk)