Chào mọi người, hôm nay, mình sẽ hướng dẫn cách sử dụng CloudFormation của AWS để tạo ra một Web Server đơn giản sử dụng EC2
## Chuẩn bị 
#### Tạo Key Pair
Như các bạn đã biết, khi bạn muốn SSH vô được EC2 instance, bạn bắt buộc phải có KeyPair đã được tạo sẵn lúc init instance

Sau khi đăng nhập vào **AWS Console**, chọn **EC2**, chọn **Key Pairs**, chọn **Create Key Pair**, mình sẽ đặt tên KeyPair là **`cfdesigner`**. Chọn **Create**

![](https://images.viblo.asia/5eb91544-6f47-4ba5-a178-0b928bcf2402.png)

## Tạo Template
CloudFormation template đơn giản chỉ là file JSON hoặc là YAML, chứa các thông tin config về các resource mà bạn sẽ đưa vào stack, một template chứa nhiều mục khác nhau như:

- `AWSTemplateFormatVersion`
- `Description`
- `Parameters`
- `Mappings`
- `Resources`
- `Outputs`

Mục đích của từng phần, mình sẽ giải thích sau khi chúng ta đi đến chi tiết từng phần, tuy nhiên, phần quan trọng nhất và cũng là phần bắt buộc trong một template là `Resources`. Tại đây, chúng ta sẽ define các resources mà chúng ta sẽ sử dụng để tạo nên một stack hoàn chỉnh. 

Sau đây, chúng ta sẽ đi chi tiết đến từng `Resources`
### VPC
Template mình hiện tại sẽ như sau: (mình sẽ sử dụng JSON)

{@gist: https://gist.github.com/namtx/3cc42288a1a525419e9f7c2710dedf8f}

Ở đây, mình sẽ tạo ra một VPC có logical name là `VPC`, type của nó là `AWS::EC2::VPC`, nếu bạn đã từng tạo một `VPC` bằng "tay" trước đây, thì bạn sẽ quen với các Properties như là: `EnableDnsSupport`, `EnableDnsHostnames`, `CidrBlock`. Đây là cách mà CloudFormation sử dụng để đưa các Properties của Resource vào, nó tương tự như cách chúng ta config bằng tay trong `AWS Console`.
Bằng việc set
```json
{
    ...
    "EnableDnsSupport": "true",
    "EnableDnsHostnames": "true",
    ...
}
```

- các instances trong VPC của chúng ta sẽ nhận được public DNS hostname
- DNS mà AWS cung cấp có thể resolve được private DNS hostnames

Ngoài ra, chúng ta cũng cần phải config **CIDR Block** cho VPC bằng `"CidrBlock": "10.0.0.0/16"`

### Internet Gateway
Vì VPC thực chất chỉ là một mạng ảo, nên để instances trong VPC của chúng ta có thể kết nối được với Internet, chúng ta cần thêm một **Internet Gateway**
```json
    "Resources": {
        "IGW": {
            "Type": "AWS::EC2::InternetGateway",
            "Properties": {}
        }
        ....
    }
```
Trên đây, mình tạo ra một Internet Gateway có logical name là `IGW`.

Tạm thời sẽ để đơn giản thế thôi, để có thể kết nối được **VPC** tới một **Internet Gateway**, chúng ta cần một **VPCGatewayAttachment**

### VPCGatewayAttachment
```json
{
    ...
    "Resources": {
        ...
        "VPCGatewayAttachment": {
            "Type": "AWS::EC2::VPCGatewayAttachment",
            "Properties": {
                "VpcId": {
                    "Ref": "VPC"
                },
                "InternetGatewayId": {
                    "Ref": "IGW"
                }
            }
        }
    }
}
```

Đến đây, chúng ta sẽ sử dụng từ khóa `Ref` khi chúng ta muốn lấy một giá trị mà chúng ta đưa vào trong `Parameters` của stack hoặc các giá trị của các resources khác trong stack.
Ví dụ như trên, chúng ta muốn lấy 2 giá trị là: `VpcId` và `InternetGatewayId`, chúng ta sẽ refer đến 2 resources khác mà chúng ta đã thêm vào trước đó: `VPC`, `IGW`.

Đến đây, VPC của chúng ta đã được đính kèm một Internet Gateway

### Public Subnet
Tiếp đến, chúng ta cần tạo một **Public Subnet** nằm trong VPC với CIDR Block là `10.0.0.0/24`:
```json
{
    ...
    "Resources": {
        ...
        "PubSub": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "VPC"
                },
                "CidrBlock": "10.0.0.0/24"
            }
        }
        ...
    }
}
```

### Public Route Table
Tiếp theo là tạo một Public Route Table trong VPC:
```json
{
    ...
    "Resources": {
        ...
        "PubRouteTable": {
            "Type": "AWS::EC2::RouteTable",
            "Properties": {
                "VpcId": {
                    "Ref": "VPC"
                }
            },
            "DependsOn": [
                "PubSub"
            ]
        }
    }
    ...
}
```
Ở đây, xuất hiện từ khóa: `DependsOn`, nó sẽ được sử dụng khi chúng ta muốn một Resource nào sẽ phải init thành công trước khi init một resource khác, ở đây, chúng ta muốn Public Subnet sẽ được tạo thành công trước khi tạo Public Route Table. 

### Public Route
```json
{
    ...
    "Resources": {
        ...
        "PubRoute": {
            "Type": "AWS::EC2::Route",
            "Properties": {
                "DestinationCidrBlock": "0.0.0.0/0",
                "RouteTableId": {
                    "Ref": "PubRouteTable"
                },
                "GatewayId": {
                    "Ref": "IGW"
                }
            },
            "DependsOn": [
                "IGW"
            ]
        }
    }
}
```

Tiếp theo, chúng ta sẽ tạo resource quan trọng nhất của stack.

### Instance
{@gist: https://gist.github.com/namtx/bf6457f5f0bbea8954ab19a91872c4e5}

Các Properties vẫn tương tự như những properties mà chúng ta cần truyền vào khi tạo một EC2 Instance bằng `AWS CLI`.
Một số bạn tinh ý sẽ nhận ra, chúng ta có `"Ref": "InstanceType"` tuy nhiên, giá trị này lấy ở đâu ra?
Đây là lý do mà CloudFormation đưa ra `Parameters`, trong Parameters, chúng ta sẽ define ra một số Parameters mà khi deploy stack, chúng ta sẽ phải đưa vào để deploy.
Ví dụ: với từng lần deploy, Developer muốn sẽ chọn được Instance Type mà họ muốn, vì vậy, chúng ta sẽ define Parameters như sau: 
```json
{
    "Parameters": {
        "InstanceType": {
            "Description": "WebServer EC2 Instance type",
            "Type": "String",
            "Default": "t2.micro",
            "AllowedValues": [
                "t1.micro",
                "t2.micro",
                "t2.small",
                "t2.medium",
                "m1.small",
                "m1.medium",
                "m1.large",
                "m1.xlarge",
                "m2.xlarge",
                "m2.2xlarge",
                "m2.4xlarge",
                "m3.medium",
                "m3.large",
                ...
            ]
        },
        ...
    }
}
```

Khi define như trên, chúng ta sẽ đưa ra cho Developer khi deploy lựa chọn Instance Type mà họ cần, giá trị default là `t2.micro`.

Còn một vấn đề nữa mà chúng ta cần giải quyết là, sau khi Developer chọn Instance Type mà họ cần, chúng ta phải tự lựa chọn **AMI** phù hợp, vì với mỗi Region khác nhau, thì các Instance Type lại có nhiều Image Id khác nhau.

Đây là nơi mà `Mappings` phát huy được tác dụng của mình,
Trong phần Mappings, chúng ta sẽ define như sau: 
```json
{
    ...
    "Mappings": {
        "AWSInstanceType2Arch": {
            "t1.micro": {
                "Arch": "PV64"
            },
            "t2.micro": {
                "Arch": "HVM64"
            },
            "t2.small": {
                "Arch": "HVM64"
            },
            "t2.medium": {
                "Arch": "HVM64"
            },
            ...
        },
        "AWSRegionArch2AMI": {
            "us-east-1": {
                "PV64": "ami-1ccae774",
                "HVM64": "ami-1ecae776",
                "HVMG2": "ami-8c6b40e4"
            },
            "us-west-2": {
                "PV64": "ami-ff527ecf",
                "HVM64": "ami-e7527ed7",
                "HVMG2": "ami-abbe919b"
            },
            ...
        }
    }
}
```

Ví dụ, Developer muốn deploy một `t2.micro` trên Region là `us-east-1` thì chúng ta sẽ làm như sau: 
```json
{
    ...
    "Resources": {
        ...
        "WebServer": {
            ...
            "Properties": {
                "ImageId": {
                    "Fn::FindInMap": [
                        "AWSRegionArch2AMI",
                        {
                            "Ref": "AWS::Region"
                        },
                        {
                            "Fn::FindInMap": [
                                "AWSInstanceType2Arch",
                                {
                                    "Ref": "InstanceType"
                                },
                                "Arch"
                            ]
                        }
                    ]
                },
                ...
            }
            ...
        }
    }
}
```
Hàm `Fn::FindInMap` sẽ được dùng để duyệt để tìm ra giá trị phù hợp: 

- Tìm đến `AWSInstanceType2Arch` trong Mappings và dựa vào `InstanceType` để lấy giá trị Arch ra
- Tìm đến `AWSRegionArch2AMI` trong `Mappings`, dựa vào region (ví dụ hiện tại đang ở `us-east-1`) sẽ lấy ra được các `ImageId` dựa vào Arch vừa tìm được ở bước trên.

Dựa vào trên, chúng ta có thể tìm ra được AMI Id ra là: `ami-1ecae776`