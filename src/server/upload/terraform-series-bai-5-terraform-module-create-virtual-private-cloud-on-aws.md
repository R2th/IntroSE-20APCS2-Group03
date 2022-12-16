Link bài viết gốc - [Bài 5 - Tạo AWS Virtual Private Cloud với Terraform Module](https://devopsvn.tech/terraform-series/terraform/bai-5-tao-aws-virtual-private-cloud-voi-terraform-module)

## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã nói về cách viết một số config cơ bản trong Terraform. Ở bài này chúng ta sẽ làm ví dụ tạo một Virtual Private Cloud (VPC) ở trên AWS, thông qua đó chúng ta sẽ tìm hiểu về cách viết code từng bước và sau đó từ một đống code như thế thì ta tổ chức code lại như thế nào, làm sao để sử dụng lại code hiệu quả nhất mà tránh bị lập code nhiều nhất có thể, bằng cách sử dụng module.

Sau khi gôm code thành module xong ta sẽ tìm hiểu cách làm sao để sử dụng nó lại cho các project khác nhau, và cách để đẩy module của ta lên mạng để mọi người có thể sử dụng chung được. Hạ tầng mà ta sẽ xây dựng ở bài này như sau.

![](https://images.viblo.asia/b2ffda60-d1e6-4bd2-b4a8-815b7e8f636e.jpg)

## Provisioning Virtual Private Cloud
Chúng ta sẽ code từ đầu, ta sẽ đi qua từng resource mà Terraform dùng để tạo ra một VPC, mình cũng sẽ giải thích sơ về lý thuyết của từng cái trên AWS. Đầu tiên ta tạo một file tên là `main.tf` với đoạn code sau và chạy câu lệnh init.

```main.tf
provider "aws" {
  region = "us-west-2"
}
```

```
terraform init
```

Oke, giờ ta sẽ nói qua từng resource của AWS.

### VPC
VPC hiểu đơn giản là một mạng ảo nội bộ, nó là một container mà chứa toàn bộ các service của ta bên trong network của nó.

![image.png](https://images.viblo.asia/bfd90f71-3156-406c-982c-7d95a8a7aca3.png)

Mặc định thì mỗi region của AWS sẽ có một VPC mặc định tên là default. Để tạo một thằng mới, ta dùng resource `aws_vpc` của Terraform.

```main.tf
provider "aws" {
  region = "us-west-2"
}

resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  
    tags = {
    "Name" = "custom"
  }
}
```

Ở trên ta sẽ tạo một VPC mới với cidr là 10.0.0.0/16 và tên là Custom. CIDR của VPC sẽ có các giá trị nằm trong khoảng sau:
+ 10.0.0.0/16 -> 10.0.0.0/28
+ 172.16.0.0/16 -> 172.16.0.0/28
+ 192.168.0.0/16 -> 192.168.0.0/28

### Subnet
Subnet sẽ chia VPC của ta ra thành nhiều sub network nhỏ hơn. Mỗi subnet sẽ nằm trong một AZ. Và các service của ta sẽ được launch ở trong subnet này.

![image.png](https://images.viblo.asia/32488ec2-2929-442c-b658-8a822d31ef37.png)

Ta dùng `aws_subnet` của Terraform để tạo subnet.

```main.tf
...
resource "aws_subnet" "private_subnet_2a" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-west-2a"

  tags = {
    "Name" = "private-subnet"
  }
}

resource "aws_subnet" "private_subnet_2b" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-west-2b"

  tags = {
    "Name" = "private-subnet"
  }
}

resource "aws_subnet" "private_subnet_2c" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "us-west-2c"

  tags = {
    "Name" = "private-subnet"
  }
}
```

Ở đoạn code trên ta sẽ tạo 3 subnet là 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24 nằm trong các zone a,b, c. Nếu ta cần nhiều subnet hơn thì ta có thể copy ra thêm một resource block khác, nhưng như vậy sẽ khiến code của ta khá dài, ta có thể rút gọn code lại như sau.

```main.tf
...
locals {
  private = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  zone   = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

resource "aws_subnet" "private_subnet" {
  count = length(local.private)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = local.private[count.index]
  availability_zone = local.zone[count.index % length(local.zone)]

  tags = {
    "Name" = "private-subnet"
  }
}
```

Ta sẽ thêm 3 subnet nữa là 10.0.4.0/24, 10.0.5.0/24, 10.0.6.0/24 (vì sao tên gọi của các subnet này là public hay là private mình sẽ giải thích ở dưới nhé).

```main.tf
...
locals {
  private  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  zone    = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

resource "aws_subnet" "private_subnet" {
  count = length(local.private)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = local.private[count.index]
  availability_zone = local.zone[count.index % length(local.zone)]

  tags = {
    "Name" = "private-subnet"
  }
}

resource "aws_subnet" "public_subnet" {
  count = length(local.public)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = local.public[count.index]
  availability_zone = local.zone[count.index % length(local.zone)]

  tags = {
    "Name" = "public-subnet"
  }
}
```

Bây giờ khi service của chúng ta được tạo bên trong các subnet này, thì tụi nó có thể nói chuyện với nhau được, nhưng nếu các service ở trên muốn nói chuyện được với các thằng khác ở bên ngoài internet thì sẽ không được, hoặc ở bên ngoài muốn gọi vào các service ở bên trong subnet của ta cũng sẽ không được. Vì ta chưa có thằng nào đóng vai trò router để các service của ta có thể nói chuyện được với internet bên ngoài cả.

![](https://images.viblo.asia/119ba789-c698-482f-8047-d8095c10925a.jpg)

### Internet gateway
Để các service bên trong subnet của ta có thể tương tác được với bên ngoài, ta cần một thằng tên là internet gateway (IG), và ta sẽ gán thằng IG này vào thằng route table. Sau đó ta gán subnet nào mà ta muốn nó có thể tương tác được với internet bên ngoài vào route table này.

![](https://images.viblo.asia/cd422d9c-e4ef-493e-bfc2-e000668a92eb.jpg)

Từ đây ta mới có khái niệm là public subnet và private subnet, public subnet là subnet mà các service bên trong nó có thể tương tác với internet bên ngoài và ngược lại bên ngoài cũng có thể tương tác với nó thông qua IG, còn đối với private subnet thì các service bên trong nó có thể tương tác được với bên ngoài, **nhưng bên ngoài không thể tương tác ngược lại nó được**. Ta dùng resource `aws_internet_gateway` để tạo IG.

```main.tf
...
resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    "Name" = "custom"
  }
}
```

Gán nó vào route table.

```main.tf
...
resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    "Name" = "custom"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ig.id
  }

  tags = {
    "Name" = "public"
  }
}
```

Gán route table cho các subnet.

```main.tf
...
resource "aws_route_table_association" "public_association" {
  for_each       = { for k, v in aws_subnet.public_subnet : k => v }
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}
```

![](https://images.viblo.asia/0fe2595a-acca-4e55-8cae-5c6aa8ed4027.jpg)

Oke, giờ các service của ta bên trong public subnet có thể tương tác được với bên ngoài, vậy còn các private subnet thì sao? Hiện tại thì nó không thể tương tác được với bên ngoài, nhưng ta không gán IG vào nó được, vì IG là hai chiều ra vào, trong khi ta chỉ muốn 1 chiều thôi là chiều tương tác từ bên trong private subnet ra bên ngoài và ta không muốn có chiều ngược lại.

### NAT gateway
Đây là thằng giúp ta làm việc đó, ta sẽ deploy NAT lên trên một public subnet, và gán nó vào route table, rồi gán route table đó vào các private subnet.

![](https://images.viblo.asia/bb0564cc-f693-4ee4-b4bd-04b3e7e3234a.jpg)

Ta dùng resource `aws_nat_gateway` của Terraform để tạo NAT.

```main.tf
...
resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "public" {
  depends_on = [aws_internet_gateway.ig]

  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_subnet[0].id

  tags = {
    Name = "Public NAT"
  }
}
```

Tạo private route table và gán NAT vào nó.

```main.tf
...
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.public.id
  }

  tags = {
    "Name" = "private"
  }
}
```

Gán route table vào các private subnet.

```main.tf
...
resource "aws_route_table_association" "public_private" {
  for_each       = { for k, v in aws_subnet.private_subnet : k => v }
  subnet_id      = each.value.id
  route_table_id = aws_route_table.private.id
}
```

Full code.

```
provider "aws" {
  region  = "us-west-2"
}

resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    "Name" = "custom"
  }
}

locals {
  private = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  zone    = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

resource "aws_subnet" "private_subnet" {
  count = length(local.private)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = local.private[count.index]
  availability_zone = local.zone[count.index % length(local.zone)]

  tags = {
    "Name" = "private-subnet"
  }
}

resource "aws_subnet" "public_subnet" {
  count = length(local.public)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = local.public[count.index]
  availability_zone = local.zone[count.index % length(local.zone)]

  tags = {
    "Name" = "public-subnet"
  }
}

resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    "Name" = "custom"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ig.id
  }

  tags = {
    "Name" = "public"
  }
}

resource "aws_route_table_association" "public_association" {
  for_each       = { for k, v in aws_subnet.public_subnet : k => v }
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "public" {
  depends_on = [aws_internet_gateway.ig]

  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_subnet[0].id

  tags = {
    Name = "Public NAT"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.public.id
  }

  tags = {
    "Name" = "private"
  }
}

resource "aws_route_table_association" "public_private" {
  for_each       = { for k, v in aws_subnet.private_subnet : k => v }
  subnet_id      = each.value.id
  route_table_id = aws_route_table.private.id
}
```

Oke, vậy là ta đã viết code xong, tiếp theo ta chạy câu lệnh apply để tạo hạ tầng nào 😁.

```
$ terraform apply -auto-approve
...
Plan: 18 to add, 0 to change, 0 to destroy.
...
Apply complete! Resources: 18 added, 0 changed, 0 destroyed.
```

Như ta thấy thì sử dụng Terraform để tạo VPC cũng khá đơn giản, có cái là viết code hơi nhiều, vậy mỗi lần ta muốn tạo một VPC khác không lẻ ta phải copy đống code này qua chỗ khác tiếp, vậy thì bất tiện quá. Để giải quyết vấn đề này thì Terraform có cung cấp cho ta một tính năng là module, giúp ta gom code lại thành một module và có thể sử dụng lại ở nhiều chỗ khác nhau. Nhớ destroy resource nhé.

```
terraform destroy -auto-approve
```

## Terraform Module
Terraform Module là một self-contained packages of code, cho phép ta gom code lại một chỗ và sử dụng ở nhiều chỗ khác nhau. Khi nói về module, ta có thể nghĩ nó như là một blocks nhỏ trong một sản phẩm lớn, ta sẽ gáp nhiều blocks nhỏ này lại với nhau để ra được sản phẩm cuối cùng, và blocks này ta có thể lấy để xây dựng sản phẩm khác cũng được, như trò chơi lego.

### Standard module structure
Một module cơ bản sẽ gồm 3 file sau đây:
+ `main.tf` chứa code.
+ `variables.tf` chứa input vào của module.
+ `outputs.tf` chưa giá trị đầu ra của module.
 
 Ngoài ra còn một vài file khác mà không bắt buộc là `providers.tf`, `versions.tf` các bạn xem full cấu trúc ở trang này https://www.terraform.io/language/modules/develop#standard-module-structure.
 
### Using module
Để sử dụng module, ta dùng resource tên là module như sau.

```
module <module_name> {
  source = <source>
  version = <version>

  input_one = <input_one>
  input_two = <input_two>
}
```

`<source>` có thể là dường dẫn local hoặc một url trên mạng, `<version>` chỉ định version của module, `<input_one>` là các giá trị input ta định nghĩa trong file `variables.tf`.

### Write module
Bây giờ ta sẽ chuyển code mà ta dùng để tạo VPC ở trên thành module, trước khi viết module ta cần phải định nghĩa trước những giá trị nào mà ta cần nó động ở trong module, để khi ta sử dụng module ta sẽ truyền giá trị đó vào để có được các resource khác nhau tùy thuộc vào biến ta truyền vào.

Ví dụ ở trên, thì các giá trị động mà ta cần truyền vào module vpc của ta là:
+ vpc cidr_block
+ subnet cidr_block và zone.

Ta tạo folder với cấu trúc như sau.

```
.
├── main.tf
└── vpc
    ├── main.tf
    ├── outputs.tf
    └── variables.tf
```

Ta định nghĩa giá trị input của module ở trong file `variables.tf` như sau.

```vpc/variables.tf
variable "vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

variable "private_subnet" {
  type    = list(string)
}

variable "public_subnet" {
  type    = list(string)
}

variable "availability_zone" {
  type    = list(string)
}
```

Cập nhật code cho file `main.tf` ở trong vpc.

```vpc/main.tf
resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true

  tags = {
    "Name" = "custom"
  }
}

resource "aws_subnet" "private_subnet" {
  count = length(var.private_subnet)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.private_subnet[count.index]
  availability_zone = var.availability_zone[count.index % length(var.availability_zone)]

  tags = {
    "Name" = "private-subnet"
  }
}

resource "aws_subnet" "public_subnet" {
  count = length(var.public_subnet)

  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.public_subnet[count.index]
  availability_zone = var.availability_zone[count.index % length(var.availability_zone)]

  tags = {
    "Name" = "public-subnet"
  }
}

resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    "Name" = "custom"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ig.id
  }

  tags = {
    "Name" = "public"
  }
}

resource "aws_route_table_association" "public_association" {
  for_each       = { for k, v in aws_subnet.public_subnet : k => v }
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "public" {
  depends_on = [aws_internet_gateway.ig]

  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_subnet[0].id

  tags = {
    Name = "Public NAT"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.public.id
  }

  tags = {
    "Name" = "private"
  }
}

resource "aws_route_table_association" "public_private" {
  for_each       = { for k, v in aws_subnet.private_subnet : k => v }
  subnet_id      = each.value.id
  route_table_id = aws_route_table.private.id
}
```

Như ta thấy, giá trị fix cứng ta đã thay đổi thành variable, khi ta xài module vpc này ta chỉ cần truyền vào giá trị input khác ta sẽ có được vpc khác. Ở trong file `main.tf` ngoài cùng, ta sử dụng module như sau.

```main.tf
provider "aws" {
  region = "us-west-2"
}

module "vpc" {
  source = "./vpc"

  vpc_cidr_block    = "10.0.0.0/16"
  private_subnet    = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnet     = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  availability_zone = ["us-west-2a", "us-west-2b", "us-west-2c"]
}
```

Oke, như bạn thấy thì code của ta khi xài module nó rất là gọn, ta chạy thử câu lệnh plan để xem module của ta có viết đúng hay không.

```
$ terraform plan
...
Plan: 18 to add, 0 to change, 0 to destroy.
...
```

Nếu nó in ra được dòng ở trên thì module của ta đã viết đúng nhé, các bạn có thể chạy apply để xem.

### Publish module
Tiếp theo ta sẽ đẩy module của ta lên trên mạng để mọi người có thể sử dụng, để tạo module thì ta cần phải có tài khoản github và truy cập trang https://registry.terraform.io login vào nó.

Đăng nhập github và tạo một repo ở trạng thái public, tên phải ở dạng format `terraform-<PROVIDER>-<NAME>`, sau đó copy 3 file ở folder vpc và đẩy lên github repo đó, ví dụ của mình tạo một repo tên là terraform-aws-vpc.

![image.png](https://images.viblo.asia/a90708cc-b1c3-45b2-b3e4-294f39200314.png)

Sau đó ta cần tạo tag cho repo này, tag này sẽ tương ứng với version module của ta.

![image.png](https://images.viblo.asia/f4c8b16e-b3eb-4025-96fb-f84ea0372168.png)

Sau đó truy cập trang registry ở trên. Khi bạn đăng nhập rồi thì nó sẽ có menu publish, ta nhấn vào và chọn module.

![image.png](https://images.viblo.asia/930ed8ee-0059-4445-a033-6bbba5618ecf.png)

Sau đó nó sẽ dẫn ta qua trang chọn module để publish. Chọn vpc module.

![image.png](https://images.viblo.asia/ad65e977-cf7e-4792-b472-6c0ef8cf155b.png)

Sau đó nhấn publish module, ta sẽ thấy module của ta.

![image.png](https://images.viblo.asia/9cfc9475-ff7a-4b22-ae68-8ea2fcc6fde1.png)

Phía bên phải có để cách làm sau để sử dụng module này. Giờ nếu ta muốn tạo VPC thì ta sẽ sử dụng module như sau.

```
module "vpc" {
  source  = "hoalongnatsu/vpc/aws"
  version = "1.0.0"
  
  vpc_cidr_block    = "10.0.0.0/16"
  private_subnet    = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnet     = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  availability_zone = ["us-west-2a", "us-west-2b", "us-west-2c"]
}
```

## Common module
Ở trên ta viết với mục đích là tìm hiểu, khi làm thực tế cho môi trường production, ta nên xài những module có sẵn trên mạng, họ viết sẽ kĩ hơn nhiều và sẽ có rất nhiều chức năng và use case hơn so với ta phải tự viết. Ví dụ vpc module ở trên, ta có thể sử dụng một module có sẵn là [terraform-aws-modules/vpc/aws](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest).

![image.png](https://images.viblo.asia/e94b4539-e727-45d1-96dd-cc43dbe5808c.png)

Họ cover cho ta rất nhiều trường hợp. Ví dụ tạo một VPC cho AWS Kubernetes dùng module có sẵn.

```main.tf
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 3.0"

  name = var.cluster_name
  cidr = "10.0.0.0/16"

  azs              = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  database_subnets = ["10.0.7.0/24", "10.0.8.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false
  enable_dns_hostnames   = true

  // Create db subnet group and enable public access to RDS instances
  create_database_subnet_group           = true
  create_database_subnet_route_table     = true
  create_database_internet_gateway_route = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                    = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = 1
  }

  tags = local.tags
}
```

Với nhiều trường hợp như trên mà ta tự code thì cũng tối mày tối mặt, chưa kể phải test rồi làm hằng bà lằng thứ nữa, rất mất thời gian 😂. Nên trước khi ta làm gì thì lên kiếm xem coi có ai viết module đó rồi chưa nhé, sẽ giúp ta tiết kiệm rất nhiều thời gian. Github repo của toàn bộ series https://github.com/hoalongnatsu/terraform-series.

## Kết luận
Vậy là ta đã tìm hiểu xong cách viết code từ đầu và sau đó tổ chức code lại thành module, cách publish một module lên trên mạng, cách sử dụng module có sẵn. Module giúp ta sử dụng code có sẵn và tránh phải viết code đi code lại nhiều lần. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo. Bài tiếp theo ta cũng nói tiếp về module mà sẽ đi sâu hơn chút, ta sẽ làm ví dụ tạo VPC, Autoscaling Group và Load Balancer trên AWS.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).