![](https://images.viblo.asia/c43979b2-bf1e-46e5-b271-e784beadaaa2.png)

## TL;DR Talk is cheap. Show me the code.

Bạn có thể tham khảo mã nguồn tại [Github repository này](https://github.com/vntechies/011-aws-cdk-scheduled-fargate-task)

## Tạo AWS VPC

_Trong bài viết này, Scheduled Fargate Task sẽ được dịch là **tác vụ Fargate được lập lịch**, nếu bạn đọc có cách dịch nào tốt hơn, xin vui lòng để lại comment ở bên dưới 😍_

Để sử dụng các tác vụ Fargate được lập lịch, trước tiên, bạn cần thiết lập một Virtual Private Cloud (VPC). VPC là một mạng ảo được tách biệt cho phép bạn khởi tạo vào triển khai các tài nguyên AWS của mình, ví dụ như các tác vụ Fargate được lập lịch.

Bạn có thể chỉ định dải địa chỉ IP cho VPC, thêm mạng con (subnet), liên kết nhóm bảo mật (security group)và định cấu hình bảng định tuyến (route tables). Đối với bài viết này, chúng tôi sẽ tạo một VPC với 9 mạng con được chia trên 3 AZs bằng AWS CDK.

Dưới đây là một ví dụ về cách tạo VPC:

```python:aws_cdk_scheduled_fargate_task_stack.py
# Tạo VPC với 9 subnets trên 3 AZs
my_vpc = ec2.Vpc(
    self,
    "myvpc",
    cidr="172.31.0.0/16",
    max_azs=3,
    nat_gateways=1,
    subnet_configuration=[
        ec2.SubnetConfiguration(
            cidr_mask=20, name="public", subnet_type=ec2.SubnetType.PUBLIC
        ),
        ec2.SubnetConfiguration(
            cidr_mask=20,
            name="application",
            subnet_type=ec2.SubnetType.PRIVATE_WITH_NAT,
        ),
        ec2.SubnetConfiguration(
            cidr_mask=20,
            name="data",
            subnet_type=ec2.SubnetType.PRIVATE_ISOLATED,
            reserved=True,
        ),
    ],
)
```

## Tạo AWS ECS Cluster

Sau khi đã triển khai các tài nguyên phụ thuộc, chúng ta có thể tiếp tục với tài nguyên Fargate thực tế. Đoạn mã tiếp theo sử dụng thư viện Cấu trúc CDK chính thức cho Cấu trúc ECS cấp cao hơn (aws-ecs-pattern) để tạo Nhiệm vụ Fargate đã lên lịch:

```python:aws_cdk_scheduled_fargate_task_stack.py
# Tạo ECS Cluster
my_cluster = ecs.Cluster(
    self,
    "service-cluster",
    cluster_name="service-cluster",
    container_insights=True,
    vpc=my_vpc,
)
```

## Tạo một Scheduled Fargate Task với AWS CDK

Sau khi đã triển khai các tài nguyên trên, chúng ta có thể tiếp tục với tài nguyên Fargate. Đoạn mã dưới dây sử dụng [CDK Construct library for higher-level ECS Constructs](https://docs.aws.amazon.com/cdk/api/v1/docs/aws-ecs-patterns-readme.html) (aws-ecs-patterns) để tạo một tác vụ Fargate được lập lịch (Scheduled Fargate Task):

```python:aws_cdk_scheduled_fargate_task_stack.py
image = ecs.ContainerImage.from_registry("amazonlinux:2")

ecs_patterns.ScheduledFargateTask(
    self,
    "amazon-linux-echo-task",
    cluster=my_cluster,
    platform_version=ecs.FargatePlatformVersion.LATEST,
    schedule=appscaling.Schedule.expression("rate(1 minute)"),
    scheduled_fargate_task_image_options=ecs_patterns.ScheduledFargateTaskImageOptions(
        image=image,
        memory_limit_mib=1024,
        log_driver=ecs.LogDriver.aws_logs(
            stream_prefix="scheduled-fargate-task",
            log_retention=aws_logs.RetentionDays.ONE_DAY,
        ),
        environment={"APP_NAME": "scheduled-fargate-task"},
        command=["echo", "Xin chào VNTechies!"],
    ),
)
```

- `ecs_patterns.ScheduledFargateTask`, tại đây chúng ta khởi tạo tài nguyên ScheduledFargateTask từ thư viện ecspatterns. Chúng ta tham chiếu đến cluster đã được tạo trong phần trước để AWS CDK biết vị trí cần để triển khai tác vụ Fargate được lập lịch.
- Trong `ScheduleFargateTaskImageOptions`, chúng tôi định nghĩa cho container, ví dụ như image nào nên được sử dụng. Tại đây, chúng ta sẽ sử dụng image `amazonlinux:2` cho container. AWS CDK sẽ tự động lấy image Amazon Linux 2 từ Amazon ECR và sử dụng image đó để triển khai tác vụ Fargate được lập lịch.
- Bạn có thể chỉ định thời gian lưu giữ cho logs của tác vụ. Mặc định, AWS CDK không cài đặt thời gian lưu trữ cho các logs được tạo bởi các tác vụ của nó. Nếu bạn muốn có cài đặt thời gian lưu trữ log của mình, bạn cần định nghĩa với thuộc tính `log_retention` trên `log_driver`. Giá trị `aws_logs.RetentionDays.ONE_DAY`, có nghĩa là log sẽ bị xoá sau 1 ngày.
- `command` chỉ định tác vụ bạn muốn chạy trên container. Sau khi lệnh kết thúc, tác vụ Fargate (Fargate task) sẽ ngừng chạy.
- `environment` cho phép bạn import các biến môi trường vào container để sử dụng cho tác vụ Fargate.
- `memory_limit_mib` đặt giới hạn memory sử dụng hco tác vụ Fargate, giá trị mặc định là **512MB**

![Tác vụ Fargate đã được tạo](https://images.viblo.asia/98f20fee-e2e8-4038-8cb2-a6556c18e37f.png)

![Log được tạo bởi tác vụ Fargate được lên lịch](https://images.viblo.asia/ce835b25-edb3-4805-9e1a-5fe6058b9897.png)


## Dọn dẹp tài nguyên

Xoá stack vừa được tạo bởi AWS CDK để tránh phát sinh chi phí không cần thiết bạn nhé 😉

```shell
cdk destroy
```

## Kết luận

Qua hướng dẫn này, chúng ta đã:

- Tạo AWS VPC
- Tạo một AWS ECS Cluster
- Tạo một tách vụ Fargate được lập lịch

Việc sử dụng các Construct level cao hơn hoặc còn được gọi là là các mẫu (patterns), chẳng hạn như các mẫu `ECS` mà chúng ta đã sử dụng trong ví dụ này giúp giảm bớt rất nhiều công việc trong việc tạo ra nhiều tài nguyên AWS và có cả những giá trị mặc định hợp lý được cài đặt sẵn. Các mẫu như vậy có thể tiết kiệm thời gian phát triển, nhưng chúng ta sẽ có ít các thiết lập được tuỳ biến hơn.

## Bài viết gốc
- [Tác vụ Fargate được lập lịch - Scheduled Fargate Tasks với AWS CDK - VNTechies Dev Blog 🇻🇳 - Kho tài nguyên về Cloud ☁️ / DevOps 🚀](https://vntechies.dev/courses/aws/cdk/tac-vu-fargate-duoc-lap-lich-scheduled-fargate-tasks-voi-aws-cdk)