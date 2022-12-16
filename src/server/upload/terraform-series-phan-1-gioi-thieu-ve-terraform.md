# Terraform Series - Phần 1: Giới thiệu cơ bản về Terraform

## Giới thiệu

Terraform là một open source “Infrastructure as Code (IaC)” tool, được sử dụng bởi các DevOps và SysOps Engineers.

> Infrastructure as Code nhầm giải quyết bài toán khi setup kiến trúc hạ tầng cho hệ thống sẽ cần trải qua nhiều bước, với nhiều môi trường khác nhau. Điều này dẫn tới việc khó quản lý, cũng như khi có sự thay đổi hoặc tạo mới hạ tầng có thể sẽ có những sai sót trong quá trình thực hiện. Tính chất của code đó chính là bất biến có thể lưu trữ được, dễ theo dõi, kiểm soát và chia sẻ. Khi triển khai kiến trúc hạ tầng trên môi trường mới. Engineer chỉ cần tiến hành apply lại code là có thể triển khai hạ tầng mới.
> 

Concept cơ bản khi sử dụng Terraform.

![](https://images.viblo.asia/2785910f-03a6-4315-9261-5e48d61af9d3.png)

## Khái niệm

- Terraform file sẽ có định dạng “.tf” được viết bởi ngôn ngữ HCL (Hashicorp Configuration Language).
- Provisioning workflow
    1. **terraform validate**
    2. **terraform plan**
    3. **terraform apply**
    4. **terraform destroy**
- Một RootModule thông thường sẽ có 3 Terraform files chính:
    - ```main.tf```
    - ```variables.tf```
    - ```outputs.tf```
    - ```terraform.tfstate```(optional) dùng để quản lý state
    - ```terraform.tfstate``` (optional) đùng để quản lý backup state

## Terraform Workspace

- Workspace thường được dùng để tách quản lý các môi trường riêng biệt như: dev, production, staging …
- Sử dụng cmd: **terraform workspace**
- Workspaces sẽ tiến hành chia tách và quản lý riêng biệt các terraform state file theo từng môi trường.

![](https://images.viblo.asia/9dfdb49d-e63f-43c1-a3ef-a748a2f07ad9.png)

## Terraform  - Main file

- ```main.tf``` file là file tập trung các config Terraform chính, nằm ở  root project.
- Bao gồm các nội dung:
    - Resources
    - Provider
    - Data source
- Ví dụ

```jsx
//main.tf

resource "aws_instance" "computel"{
	ami = data.aws_ami.ubuntu.id
	instance_type = var.instance_type
	key_name = var.key_name
	subnet_id = var.subnet_id

	tags = {
		Name = "AWSInstance.Computel"
	}
}

```

## Terraform - Variables File

- ```variables.tf``` là file tập trung tất cả các khai bao biến, nằm ở root project.
- Có thể set type, default value, overwrite cho variable.
- Ví dụ

```jsx
//variables.tf

variable "instance_type" {}
variable "asg_desired"{
	type = number
	default = 2 
}

//overwrite asg_desired variable
variable "asg_desired"{
	type =. number
	default =. 3
}
```

## Terraform - Outputs File

- ```outputs.tf``` dùng để export value sau khi terraform apply đã thực thi hoàn tất, nằm ở root project.
- Outputs có thể được tham chiếu ở bất kỳ parent Terraform template
- Thường được sử dụng khi tạo mới các modules. Cho phép modules value được sử dụng trong parent Terraform template
- Ví dụ:

```jsx
//outputs.tf

output "vpc_id" {
	value = aws_vpc.main.id
}

output "subnet1_id"{
	value = aws_subnet.subnet1.id
}
```

## Terraform - State

- Terraform là một Stateful application
- State dùng để track tất cả các infrastructure provisioned. Tất cả các state sẽ được track và lưu vào terraform state file.
- Khi terraform apply, terraform sẽ tiến hành lưu lại infrastructure state vào 2 files:
    - terraform.tfstate
    - terraform.tfstate.backup
- Từ state ta có thể biết được những thay đổi trong lần build gần nhất.
- Có thể sử dụng cmd **terraform refresh** để refresh state.

## Kết bài

Ở phần này, mình tập trung giới thiệu các khái niệm cơ bản của Terraform. Trong phần sau mình sẽ giới thiệu về Terraform CLI bao gồm cách cài đặt, các command line cơ bản. Bài viết chủ yếu được tổng hợp lại từ những kiến thức mình góp nhặt được trong quá trình tự học terraform và diễn đạt lại theo cách hiểu của mình. Mình nghĩ sẽ có nhiều chỗ sai sót hoặc mơ hồ. Mong nhận được sự phản hồi, góp ý từ mọi người. Xin cám ơn.