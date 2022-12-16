## AWS CDK Stack là gì

Stack đại diện cho một nhóm tài nguyên AWS cho một lần triển khai. AWS CDK stack dựa trên AWS CloudFormation Stack. Do đó, nó có các tính năng và hạn chế giống nhau. Việc tổng hợp (synthesie) AWS CDK Stack sẽ tạo ra CloudFormation template có thể được sử dụng để triển khai trên AWS.

Bạn có thể định nghĩa số lượng stack không tuỳ ý trong ứng dụng AWS CDK của mình. Đoạn mã sau đây cho biết cách tạo cấu trúc AWS CDK Stack mà bạn có thể Sử dụng làm mẫu để định nghĩa các stack của bạn.

## Ví dụ cho AWS CDK Stack

```python
from aws_cdk import (
    Stack,
)
from constructs import Construct


class ExampleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
```

Một pattern phổ biến khi tạo stack trong ứng dụng AWS CDK là mở rộng lớp cơ sở của Stack `cdk.Stack`, như trong ví dụ. Sau đó, bạn xác định phạm vi (scope), id và các tham số cho hàm `init`.

## Làm thế nào để tạo một AWS CDK Stack

- [Cài đặt AWS CDK](/courses/aws/cdk/huong-dan-chi-tiet-cai-dat-aws-cdk) và tạo ExampleStack tại `libs/example_stack.py`
- Import Stack đã được tạo trong CDK App

```python
from libs.example_stack import ExampleStack
```

- Tạo một stack mới

```python:app.py
from libs.example_stack import ExampleStack

app = App()

ExampleStack(app, 'example_stack', {
  # đối số truyền vào
})

app.synth()
```

![Cấu trúc folder một AWS CDK app](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Faws_cdk_stack.png&w=750&q=75)
## Bài viết gốc

- [Cách tạo một AWS CDK Stack | VNTechies Dev Blog - Kho tài nguyên dành cho người Việt yêu công nghệ 👨‍💻👩‍💻](https://vntechies.dev/courses/aws/cdk/cach-tao-mot-aws-cdk-stack)

## Reference

- [AWS CDK v2 Stacks](https://docs.aws.amazon.com/cdk/v2/guide/stacks.html)

## VNTechies Dev Blog 🇻🇳 - Kho tài nguyên về Cloud ☁️ / DevOps 🚀
![](https://images.viblo.asia/1712f084-ee0f-47e8-b2a3-9af6cddf56f6.png)

- Website: https://vntechies.dev/
- Github repository: https://github.com/vntechies/blog
- Facebook: https://facebook.com/vntechies

Anh chị em hãy follow/ủng hộ VNTechies  để cập nhật những thông tin mới nhất về Cloud và DevOps nhé!