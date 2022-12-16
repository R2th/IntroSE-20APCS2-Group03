## Cloud formation là gì?

Cách dễ nhất để mô tả CloudFormation là nó là một công cụ từ AWS cho phép bạn khởi tạo tài nguyên một cách dễ dàng. Bạn xác định tất cả các tài nguyên mà bạn muốn AWS bật lên trong một bản thiết kế chi tiết, bấm vào một nút, và sau đó AWS sẽ thực hiện giúp bạn phần việc còn lại. Bản thiết kế này được gọi là một template trong CloudFormation.
CloudFormation đảm bảo rằng các tài nguyên phụ thuộc trong template của bạn đều được tạo theo đúng thứ tự. Ví dụ, giả sử chúng ta muốn tạo record DNS Route53 và một instance EC2 có record DNS trỏ tới instance EC2. CloudFormation sẽ để cung cấp instance EC2 trước, chờ cho nó sẵn sàng được sử dụng, và sau đó tạo bản ghi DNS. AWS CloudFormation điều phối việc cung cấp các tài nguyên mong muốn.
Vì vậy, thay vì phải viết script với một loạt các lời gọi API AWS, chờ vòng lặp và thử lại logic, bạn chỉ cần mô tả những gì bạn muốn và yêu cầu CloudFormation thực hiện điều đó cho bạn. Thật tuyệt phải không?

## Ví dụ cơ bản về Cloud formation

Chúng ta hãy xem qua một ví dụ đơn giản về việc bật một stack CloudFormation lên. Chúng ta sẽ khởi tạo một instance EC2 và một security group. Sau đó, ta sẽ ssh vào server để xác nhận. Để thực hiện tutorial này  bạn sẽ cần một tài khoản AWS của riêng bạn và tốn một số tiền nhỏ.
Thay vì bắt đầu với một template CloudFormation trống, hãy lấy một template mẫu từ document của AWS. Điều đơn giản mà chúng ta muốn là instance Amazon EC2 trong một security group. Theo văn bản này, template ví dụ được cung cấp ở dạng json nhưng tôi thích sử dụng yaml. Vì vậy, tôi đã lấy template mẫu và đã chuyển đổi nó thành định dạng yaml. Nó có sẵn trên GitHub: tongueroo/cloudformation-examples/ templates single_instance.yml. Hãy dùng các lệnh sau để tải xuống và chuyển đổi mẫu json thành yaml:

```
$ mkdir templates
$ cd templates
$ curl -o single_instance.json "https://s3-us-west-2.amazonaws.com/cloudformation-templates-us-west-2/EC2InstanceWithSecurityGroupSample.template"
$ ruby -ryaml -rjson -e 'puts YAML.dump(JSON.load(ARGF))' < single_instance.json > single_instance.yml
```

Chúng ta hãy cùng tìm hiểu về template. Ở top level của template, có 6 properties. Để điều tra về template, tôi sẽ dùng version json của file này vì  [jq](https://stedolan.github.io/jq/tutorial/) tool giúp cho việc tìm hiểu các top level keys dễ dàng hơn:

```
$ cat single_instance.json | jq -r 'keys[]'
```

Đây là một giải thích ngắn gọn về ý nghĩa của những mục trên:

- AWSTemplateFormatVersion: Cho biết version của file template AWS CloudFormation
- Description: Đoạn văn bản giải thích về template
- Mappings: Ánh xạ các key và các giá trị liên quan mà bạn có thể sử dụng để chỉ định các giá trị tham số có điều kiện. Đây là version CloudFormation của cú pháp "case".
- Outputs:Mô tả các giá trị được trả về bất cứ khi nào bạn xem các properties của stack của mình. Phần này được hiển thị trong Console của CloudFormation AWS.
- Parameters: Chỉ định các giá trị mà bạn có thể thiết lập cho các mục trong template của mình khi khởi tạo stack
- Resources: Chỉ định các resource và properties của stack, ví dụ như chỉ định instance EC2. Đây là property duy nhất bắt buộc phải có.

Các thuộc tính level cao nhất quan trọng nhất của một template CloudFormation là các Parameter và Resources. Resources là nơi mà instance EC2 của chúng ta được định nghĩa. Hãy xem xét tài nguyên EC2 Instance một cách cụ thể hơn: templates/single_instance.yml#L361-L378 Nó được viết lại ở đây để thuận tiện cho việc theo dõi:

```
EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType:
        Ref: InstanceType
      SecurityGroups:
      - Ref: InstanceSecurityGroup
      KeyName:
        Ref: KeyName
      ImageId:
        Fn::FindInMap:
        - AWSRegionArch2AMI
        - Ref: AWS::Region
        - Fn::FindInMap:
          - AWSInstanceType2Arch
          - Ref: InstanceType
          - Arch
  ```
  
 Ví dụ này rất phù hợp với tài liệu tham khảo template AWS CloudFormation và AWS Resource Types documentation về AWS :: EC2 :: Instance. Tài liệu tham khảo sẽ trở thành người bạn tốt nhất của bạn khi bạn làm việc với CloudFormation.
 
Tài nguyên EC2 Instance này trình bày một vài cách sử dụng Ref. Ref là một cách để gọi đến các giá trị từ các phần khác của mẫu. Ví dụ, Ref: InstanceSecurityGroup gọi đến đến tài nguyên duy nhất khác trong mẫu này, nhóm SecurityGroup sẽ được tạo. Dưới đây là định nghĩa của tài nguyên đó:

```
InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: '22'
        ToPort: '22'
        CidrIp:
          Ref: SSHLocation

```

`Ref: InstanceType` cũng đề cập đến những tham số InstanceType có thể được truyền vào. Phần Tham số level cao nhất là nơi tham số InstanceType đến từ đó. Hãy xem phần đó của mục Parameter:
```
Parameters:
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access to the instance
    Type: AWS::EC2::KeyPair::KeyName
    ConstraintDescription: must be the name of an existing EC2 KeyPair.
  InstanceType:
    Description: WebServer EC2 instance type
    Type: String
    Default: t2.small
    AllowedValues:
    - t1.micro
    - t2.nano
    - t2.micro
    - t2.small
    - t2.medium
```

Bạn có thể thấy rằng tham số mặc định cho kiểu Instance EC2 để khởi tạo là t2.small. Bạn có thể ghi đè giá trị này khi bạn khởi động instance nếu bạn muốn. Đối với các tham số có giá trị mặc định, bạn không cần phải cung cấp tham số. Đối với các tham số không có giá trị mặc định, bạn sẽ cần phải cung cấp giá trị. Trong template cụ thể này, tham số bắt buộc duy nhất là `KeyName`. `KeyName` là sử dụng ssh key để truy cập vào instance. Bạn có thể tạo khóa ssh bằng menu EC2 Console trong “Key Pairs”. Với hướng dẫn này, tôi đã tạo ra một tutorial keypair và sẽ sử dụng nó.

## Bật Stack

Cuối cùng, ta hãy cùng nhau bật stack lên thử xem sao!

```
$ aws cloudformation create-stack --template-body file://templates/single_instance.yml --stack-name single-instance --parameters ParameterKey=KeyName,ParameterValue=tutorial ParameterKey=InstanceType,ParameterValue=t2.micro
```

Sau khi bật thành công Stack CloudFormation, bận sẽ thấy output giống như sau:

```
{
    "StackId": "arn:aws:cloudformation:us-west-2:1606191131234:stack/single-instance/3401e900-3d83-11e7-bb7e-503f2a2cee4a"
}
```

Để kiểm tra trạng thái của stack mới bật, bạn có thể sử dụng console của AWS CloudFormation và ấn vào Tab Events sau khi chọn tên Stack. Nó sẽ giống như sau:
![](https://images.viblo.asia/60351d35-05b5-4b1b-9983-e5712658d4ae.png)

Bạn có thể thấy rằng EC2 Instance và nhóm EC2 Security đã được tạo chỉ trong vòng khoảng một phút. Tiếp theo, hãy tìm instance đang chạy để ta có thể lấy public DNS để đăng nhập. Ta có thể tìm thấy trên Console EC2.
![](https://images.viblo.asia/3c699baa-8661-4f0e-906d-01383318a9ed.png)

Hãy ssh vào instance sử dụng thông tin DNS ở trên

```
$ ssh -i ~/.ssh/tutorial.pem ec2-user@ec2–54–71–197–155.us-west-2.compute.amazonaws.com
$ uptime
```

Chúc mừng bạn đã bật thành công instance EC2 CloudFormation và ssh được vào nó!

## Clean up

Ta hãy cùng xoá resource vừa tạo, để bạn không phải mất thêm khoản tiền nào chạy nó nữa. Việc này rất đơn giản:

```
aws cloudformation delete-stack --stack-name single-instance
```

## Reference

https://medium.com/boltops/a-simple-introduction-to-aws-cloudformation-part-1-1694a41ae59d