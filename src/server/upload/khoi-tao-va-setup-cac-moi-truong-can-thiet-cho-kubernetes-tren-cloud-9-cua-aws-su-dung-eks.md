**High Level Amazon EKS**

![](https://images.viblo.asia/1816ff20-879b-4bb8-91b6-d411b1fdd62c.png)

Theo cấu trúc trên chúng ta có 2 VPC (Amazon Virtual Private Cloud), một nơi chứa các Woker Nodes đang chạy và 1 VPC khác chứa Master Nodes ở đây nó là EKS Control Plane, chi tiết hơn chúng ta cùng xem hình ảnh sau.

![](https://images.viblo.asia/a8496418-c460-459a-b8bc-774163a7b111.png)

## Chạy một môi trường trên cloud9
Trước hết mình sẽ chọn khu vực cần thiết để tạo environment
![](https://images.viblo.asia/6f03c8dc-723a-4ad0-8675-3355331eedad.png)

Truy cập vào đường dẫn sau: https://console.aws.amazon.com/cloud9/home/product

Chúng ta có màn hình hiển thị

![](https://images.viblo.asia/bd9018e7-8822-468d-92f2-a20f57f87b6d.png)

Nhấn chọn **Create Environment**

![](https://images.viblo.asia/bcef73ae-92bf-4c39-a547-3d5dd81ec4b3.png)

Nhập tên môi trường.
Và **Next Step**

Ở bước tiếp theo, chúng ta sẽ để mặc định xài hàng Free Tier **t2.micro** và **Create environment**

![](https://images.viblo.asia/f5151cff-c428-4ea0-ac51-c38484e8f058.png)

Đây là môi trường của chúng ta =)) có giao diện giống như các IDE.
![](https://images.viblo.asia/eae6a1a0-3a31-411d-b16a-1a52895be4c7.png)

## Cài đặt Kubernetes
Chúng ta sẽ chọn New Terminal để tạo 1 terminal để cài đặt
![](https://images.viblo.asia/bae52cd6-faa5-4011-a9f8-724c0fd78ba4.png)

![](https://images.viblo.asia/53d926f1-9078-4bf4-85c8-28b18d39d318.png)

### Install kubectl
```
sudo curl --silent --location -o /usr/local/bin/kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.14.6/2019-08-22/bin/linux/amd64/kubectl
```

```
sudo chmod +x /usr/local/bin/kubectl
```

### Install jq, envsubst (from GNU gettext utilities) and bash-completion

```
sudo yum -y install jq gettext bash-completion
```

### Enable kubectl bash_completion
```
kubectl completion bash >>  ~/.bash_completion
. /etc/profile.d/bash_completion.sh
. ~/.bash_completion
```

![](https://images.viblo.asia/aec0a52e-513d-4b14-81d2-c4f2101d9a42.png)

## Khởi Tạo IAM ROLE cho Workspace

Truy cập vào IAM

![](https://images.viblo.asia/47d1c9de-3e8b-4d63-b2f3-a9fdef4e1fd7.png)

Create Role
![](https://images.viblo.asia/ce2ed11c-193e-47dd-85b2-92b516b0ce66.png)

![](https://images.viblo.asia/3dd37267-01ee-47d7-94db-4d5c061f6c0e.png)

Hãy chắc chắn rằng sẽ chọn AdministratorAccess 

![](https://images.viblo.asia/a8822bef-9c64-43ee-9a36-f5c583727838.png)

Sau đó **Next: Review**

![](https://images.viblo.asia/2e20d96f-1913-4413-a225-366b1020a4fc.png)

Mình sẽ đặt Role Name là: **eks-admin**

## Cấp quyền IAM cho Workspace

Truy cập trang [EC2](https://console.aws.amazon.com/ec2/v2/home?#Instances:tag:Name=aws-cloud9-.*workshop.*;sort=desc:launchTime) có các Instance

![](https://images.viblo.asia/03f14542-ef38-4140-99a7-4f0faf474bd3.png)

Select **Attach/Replace IAM Role**

Chọn **eks-admin** mà mình đã tạo

![](https://images.viblo.asia/547db2d9-674a-4ced-8109-56fce5bec1f5.png)

![](https://images.viblo.asia/da9674bf-1c84-47c1-a790-8f7a25b2dce9.png)

### Config AWS CLI với khu vực của mình
```
export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account)
export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')
```

Lưu thông tin đó vào bash_profile
```
echo "export ACCOUNT_ID=${ACCOUNT_ID}" | tee -a ~/.bash_profile
echo "export AWS_REGION=${AWS_REGION}" | tee -a ~/.bash_profile
aws configure set default.region ${AWS_REGION}
aws configure get default.region
```

Kiểm tra **IAM Role**
```
aws sts get-caller-identity
```

sẽ hiển thị kết quả:
```
{
    "Account": "243148885372", 
    "UserId": "AROATRHGNRV6EL6JDSTFH:i-03396afa59aea6e90", 
    "Arn": "arn:aws:sts::243148885372:assumed-role/eks-admin/i-03396afa59aea6e90"
}
```
**eks-admin** đã được cấp quyền đối với environment này

## Tiếp theo
Chúng ta sẽ cài đặt **eksctl** và tạo cluster.