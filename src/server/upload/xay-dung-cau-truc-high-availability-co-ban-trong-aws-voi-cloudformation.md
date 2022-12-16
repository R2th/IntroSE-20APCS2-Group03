Chào các bạn, hôm nay mình xin giới thiệu về tạo một cấu trúc high availability trong AWS bằng CloudFormation

- Nói sơ về cấu trúc hệ thống của bài hôm nay
    
    **Architecture**
    ![](https://images.viblo.asia/5ade1693-cdc2-48a6-ad90-0a128a4a59d1.png)
  
  Người dùng truy cập tới trang web thông qua DNS của Application Load Balancer (Cái này có thể thay bằng Domain Route 53, vì demo nên mình lấy DNS của ALB luôn, trong hơi xấu xấu tí nhưng không sao !! hehe ). Tiếp đến traffic đưa tới Target Group với Auto Scaling đảm bảo 2 EC2 instance luôn được online. 
1. **Tạo VPC**

    `VPC.yml`
    ```yaml
    AWSTemplateFormatVersion: '2010-09-09'
    Description: >
      VPC Network

    Parameters:
      StageName:
        Type: String
        Default: dev

      ApplicationName:
        Type: String
        Default: wordpress

      VPCCIDR:
        Type: String
        Default: '192.168.48.0/20'
      PublicSubnetCIDRs:
        Type: CommaDelimitedList
        Default: '192.168.48.0/24,192.168.49.0/24'
      PrivateSubnetCIDRs:
        Type: CommaDelimitedList
        Default: '192.168.50.0/24,192.168.51.0/24'

    Resources:
      VPC:
        Type: AWS::EC2::VPC
        Properties:
          CidrBlock: !Ref VPCCIDR
          EnableDnsSupport: true
          EnableDnsHostnames: true
          InstanceTenancy: default
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-VPC"

      InternetGateway:
        Type: AWS::EC2::InternetGateway
        Properties:
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-IGW"

      IGAttachment:
        Type: AWS::EC2::VPCGatewayAttachment
        Properties:
          InternetGatewayId: !Ref InternetGateway
          VpcId: !Ref VPC

      # ROUTE TABLE
      PublicRouteTable:
        Type: AWS::EC2::RouteTable
        DependsOn: IGAttachment
        Properties:
          VpcId: !Ref VPC
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-PublicRouteTable"
      PrivateRouteTable:
        Type: AWS::EC2::RouteTable
        Properties:
          VpcId: !Ref VPC
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-PrivateRouteTable"

      PublicRoute:
        Type: AWS::EC2::Route
        DependsOn: IGAttachment
        Properties:
          RouteTableId: !Ref PublicRouteTable
          DestinationCidrBlock: "0.0.0.0/0"
          GatewayId: !Ref InternetGateway

      # SUBNET
      PublicSubnet1:
        Type: AWS::EC2::Subnet
        Properties:
          AvailabilityZone: !Select [0, !GetAZs {Ref: 'AWS::Region'}]
          CidrBlock: !Select [0, !Ref PublicSubnetCIDRs]
          VpcId: !Ref VPC
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-PublicSubnet1"
      PublicSubnet1RouteTableAssociation1:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
          SubnetId: !Ref PublicSubnet1
          RouteTableId: !Ref PublicRouteTable


      PublicSubnet2:
        Type: AWS::EC2::Subnet
        Properties:
          AvailabilityZone: !Select [1, !GetAZs {Ref: 'AWS::Region'}]
          CidrBlock: !Select [1, !Ref PublicSubnetCIDRs]
          VpcId: !Ref VPC
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-PublicSubnet2"
      PublicSubnet2RouteTableAssociation2:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
          SubnetId: !Ref PublicSubnet2
          RouteTableId: !Ref PublicRouteTable

      PrivateSubnet1:
        Type: AWS::EC2::Subnet
        Properties:
          AvailabilityZone: !Select [0, !GetAZs {Ref: 'AWS::Region'}]
          CidrBlock: !Select [0, !Ref PrivateSubnetCIDRs]
          VpcId: !Ref VPC
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-PrivateSubnet1"
      PrivateSubnet1RouteTableAssociation1:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
          SubnetId: !Ref PrivateSubnet1
          RouteTableId: !Ref PrivateRouteTable

      PrivateSubnet2:
        Type: AWS::EC2::Subnet
        Properties:
          AvailabilityZone: !Select [1, !GetAZs {Ref: 'AWS::Region'}]
          CidrBlock: !Select [1, !Ref PrivateSubnetCIDRs]
          VpcId: !Ref VPC
          Tags:
          - Key: Name
            Value: !Sub "${StageName}-${ApplicationName}-PrivateSubnet2"
      PrivateSubnet2RouteTableAssociation2:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
          SubnetId: !Ref PrivateSubnet2
          RouteTableId: !Ref PrivateRouteTable
       
      LoadBalancerSG:
        Type: AWS::EC2::SecurityGroup
        Properties:
          GroupDescription: Security Group for LoadBalancer
          GroupName: !Sub "${StageName}-${ApplicationName}-ALB-SG"
          VpcId: !Ref VPC
          SecurityGroupIngress:
            - CidrIp: '0.0.0.0/0'
              IpProtocol: tcp
              FromPort: 80
              ToPort: 80

     # SG cho Application, chỉ nhận traffic từ Load Balancer vào
      ApplicationSG:
        Type: AWS::EC2::SecurityGroup
        Properties:
          GroupDescription: Security Group for Application
          GroupName: !Sub "${StageName}-${ApplicationName}-Application-SG"
          VpcId: !Ref VPC
          SecurityGroupIngress:
            - SourceSecurityGroupId: !Ref LoadBalancerSG
              IpProtocol: tcp
              FromPort: 80
              ToPort: 80
              Description: 'From ALB'


    Outputs:
      VPC:
        Value: !Ref VPC
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-VPC"

      PublicSubnet1:
        Value: !Ref PublicSubnet1
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-PublicSubnet1"

      PublicSubnet2:
        Value: !Ref PublicSubnet2
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-PublicSubnet2"

      InternetGateway: 
        Value: !Ref InternetGateway
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-IGW"

      PublicRouteTable:
        Value: !Ref PublicRouteTable
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-PublicRouteTable"

      PrivateRouteTable:
        Value: !Ref PrivateRouteTable
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-PrivateRouteTable"

      LoadBalancerSG:
        Value: !Ref LoadBalancerSG
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-ALB-SG"

      ApplicationSG:
        Value: !Ref ApplicationSG
        Export:
          Name: !Sub "${StageName}-${ApplicationName}-Application-SG"
    ```
    
    - Create stack
    ```shell
    aws cloudformation create-stack \
    --stack-name dev-httpd-vpc \
    --template-body file://cloudformation/VPC.yml 
    ```
2. **Tạo Target Group, Auto Scaling Group, LoadBalancer...**

    `asg.yml`
    ```yaml
    AWSTemplateFormatVersion: '2010-09-09'
    Parameters:
      StageName:
        Description: An stage name that will be prefixed to resource names
        Type: String
        Default: dev
      ApplicationName:
        Type: String
        Default: wordpress
      KeyName:
        Description: EC2 SSH KEY
        Type: AWS::EC2::KeyPair::KeyName
        # Giá trị này các bạn lấy keypair name đã tạo cho vào
        Default: <KeyPairName>

      InstanceType:
        Type: String
        AllowedValues:
        - t2.nano
        - t2.micro
        - t2.small
        - t2.medium
        - m3.medium
        - m4.large
        - c3.medium
        - c4.medium
        - c4.large
        Default: t2.small
      Ec2ImageId:
        Type: AWS::SSM::Parameter::Value<String>
        Default: /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2

    Resources:
      TargetGroup:
        Type: AWS::ElasticLoadBalancingV2::TargetGroup
        Properties:
          Name: !Sub ${StageName}-${ApplicationName}-TG
          Port: 80
          Protocol: HTTP
          VpcId: {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-VPC"}
          TargetType: instance
          HealthCheckPath: '/var/www/html/index.html'
          HealthCheckIntervalSeconds: 10
          HealthCheckProtocol: HTTP
          HealthCheckTimeoutSeconds: 5
          HealthyThresholdCount: 2
          UnhealthyThresholdCount: 2

      LoadBalancerListener:
        Type: AWS::ElasticLoadBalancingV2::Listener
        Properties:
          LoadBalancerArn: !Ref LoadBalancer
          Port: 80
          Protocol: HTTP
          DefaultActions:
            - Type: forward
              TargetGroupArn: !Ref TargetGroup
      LoadBalancer:
        Type: AWS::ElasticLoadBalancingV2::LoadBalancer
        Properties:
          Name: !Sub ${StageName}-${ApplicationName}-ALB
          Subnets:
            - {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-PublicSubnet1"}
            - {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-PublicSubnet2"}
          SecurityGroups:
            - {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-ALB-SG"}


      LaunchConfiguration:
        Type: AWS::AutoScaling::LaunchConfiguration
        Properties:
          KeyName: !Ref KeyName
          AssociatePublicIpAddress: 'true'
          SecurityGroups: 
            - {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-Application-SG"}
          InstanceType: !Ref InstanceType
          ImageId: !Ref Ec2ImageId
          LaunchConfigurationName: !Sub "${StageName}-${ApplicationName}-LaunchConfig"
          UserData:
            Fn::Base64: !Sub |
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd.service
              systemctl enable httpd.service
              cd /var/www/html
              echo "<html><h1>Hello</h1></html>" > index.html
              chkconfig httpd on
          BlockDeviceMappings:
            - DeviceName: "/dev/xvda"
              Ebs:
                VolumeSize: "8"
                VolumeType: "gp2"

      AutoScalingGroup:
        Type: AWS::AutoScaling::AutoScalingGroup
        DependsOn: LoadBalancer
        Properties:
          LaunchConfigurationName: !Ref LaunchConfiguration
          MinSize: "2"
          MaxSize: "2"
          DesiredCapacity: "2"
          VPCZoneIdentifier:
            - {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-PublicSubnet1"}
            - {"Fn::ImportValue": !Sub "${StageName}-${ApplicationName}-PublicSubnet2"}
          TargetGroupARNs: 
            - !Ref TargetGroup

    ```
    - Create stack
    ```shell
   aws cloudformation create-stack --stack-name ec2-asg \
      --template-body file://asg.yml \
      --parameters \
      ParameterKey=StageName,ParameterValue=dev \
      ParameterKey=ApplicationName,ParameterValue=wordpress 
    ```
    
### Kết quả
  ![](https://images.viblo.asia/5da5ca65-741c-46ed-99c8-92c674523f32.png)
- Copy DNS name rồi paste mở một trình duyệt mới
  
  ![](https://images.viblo.asia/8e917aa6-f521-4a01-9293-aa219dce3200.png)   
  >                            index.html với Hello đã hiển thị

- Tiếp theo mình thử terminate 1 EC2 để xem nó có tự scaling lại cho mình một EC2 nữa không! 
![](https://images.viblo.asia/93071215-13ce-40b9-be7c-e3a37052021a.png)

- Và sau khoảng 2 phút một em EC2 lại start lên để đảm bảo đủ 2 EC2 cho mình !
![](https://images.viblo.asia/4c1472d6-bb3c-4025-8b81-0ceb4f0bb2c2.png)

### Clean up
Vào Cloudformation xoá lần lượt theo thứ tự ngược lại tạo là xong !

### Kết
Cảm ơn các bạn đã đọc tới đây. Hẹn gặp lại vào bài tiếp theo!!