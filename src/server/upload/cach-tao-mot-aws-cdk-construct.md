![](https://images.viblo.asia/ea9c00b3-ff11-4f3c-8e99-58b4678583d2.png)

## AWS CDK Construct là gì

**Construct** là thành phần cơ bản chứa các tài nguyên AWS. Construct đóng gói mọi thứ mà AWS CloudFormation cần để tạo tài nguyên và thuộc tính của tài nguyên. Construct có thể chứa một hoặc nhiều tài nguyên AWS, bạn có thể tuỳ ý định nghĩa.

Ưu điểm của việc tạo một construct là bạn có thể tái sử dụng các thành phần trong các stacks mà không cần phải định nghĩa lại.

Đoạn mã dưới đây tạo một AWS CDK construct mà bạn có thể sử dụng làm ví dụ để định nghĩa các tài nguyên của mình.

## Ví dụ cho AWS CDK Construct

```python
from constructs import Construct

class ExampleConstruct(Construct):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id)
        # các tài nguyên bạn muốn sử dụng trong construct này
```

Các construct được triển khai trong các lớp mở rộng của lớp Construct. Tất cả các cấu trúc nhận ba tham số khi chúng được khởi tạo:

- **scope** - Cấu trúc mà construct này được xác định, đại diện cho phạm vi hiện tại mà bạn đang định nghĩa cho construct, nó có thể là **App**, **Stack** hoặc **Construct**.
- **id** - ID phải là duy nhất trong phạm vi này. id đóng vai trò là không gian tên cho mọi thứ được xác định trong cấu trúc hiện tại và được sử dụng để phân bổ các nhận dạng duy nhất như tên tài nguyên và ID logic của AWS CloudFormation.

## Làm thế nào để tạo một AWS CDK Construct

- [Cài đặt AWS CDK](/courses/aws/cdk/huong-dan-chi-tiet-cai-dat-aws-cdk) và định nghĩa ExampleConstruct tại `libs/example_construct.py`
- Import Construct đã được tạo trong

```python
from libs.example_construct import ExampleConstruct
```

- Tạo một construct

```python:app.py
from aws_cdk import (
    Stack,
)
from constructs import Construct
from libs.example_construct import ExampleConstruct

class ExampleStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        ExampleConstruct(self,"ExampleConstruct")
```

## Bài viết gốc 

- [Cách tạo một AWS CDK Construct | VNTechies Dev Blog - Kho tài nguyên dành cho người Việt yêu công nghệ 👨‍💻👩‍💻](https://vntechies.dev/courses/aws/cdk/cach-tao-mot-aws-cdk-construct)


## Reference

- [AWS CDK v2 Stacks](https://docs.aws.amazon.com/cdk/v2/guide/stacks.html)