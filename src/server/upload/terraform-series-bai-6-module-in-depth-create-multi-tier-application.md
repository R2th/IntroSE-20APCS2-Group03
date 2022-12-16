Link bài viết gốc -  [Bài 6 - Xây dựng hạ tầng cho một ứng dụng thực tế với Terraform Module](https://devopsvn.tech/terraform-series/terraform/bai-6-xay-dung-ha-tang-cho-mot-ung-dung-thuc-te-voi-terraform-module)

## Giới thiệu
Chào các bạn tới với series về Terraform, ở [bài trước](https://viblo.asia/p/terraform-series-bai-4-terraform-module-create-virtual-private-cloud-on-aws-ORNZqp2MK0n) chúng ta đã tìm hiểu cơ bản về Terraform Module và cách sử dụng nó. Ở bài này chúng ta sẽ tìm hiểu sâu hơn về module thông qua việc xây dựng hạ tầng cho một ứng dụng Multi-Tier bao gồm AWS Application Load Balancer + Auto Scaling Group + Relational Database Service.

Với Auto Scaling Group nó sẽ tạo ra một group EC2 mà hosting web server mà chạy ở port 80, và dữ liệu ta sẽ lưu ở RDS loại Postgres, và client sẽ truy cập tới dứng dụng của ta thông qua Load Balancer. Đây là một mô hình rất phổ biến ở trên AWS, minh họa như sau.

![](https://images.viblo.asia/c0f9829d-1d27-4a36-a163-56dbd96d7a19.jpg)

Ta sẽ có 3 thành phần chính trong mô hình trên là Networking, AutoScaling và Database. Từng thành phần chính sẽ được group lại thành một module như sau.

![image.png](https://images.viblo.asia/47b51129-ccb4-4c1a-9d71-95ffc677db4c.png)

Ta sẽ viết module cho Networking, AutoScaling và RDS. Tất cả các module đều có quan hệ với nhau theo mô hình cây, mà thằng top-level được gọi là root module.

## Root module
Tất cả các workspace (folder ta viết code và chạy câu lệnh apply) đều có một thằng gọi là root module. Ở trong root module đó, chúng ta có thể có một hoặc nhiều child modules. Module có thể là local module với source code nằm ở máy của ta hoặc remote moudle, module mà được để trên mạng và ta tải xuống bằng câu lệnh `terraform init`. Mô hình cây mối quan hệ giữ các module.

![](https://images.viblo.asia/d370d483-99ed-442f-affe-854637f193ed.jpg)

Như ta thấy ở module hình trên thì Networking, AutoScaling và RDS là child module của root module. Và trong một module nó có thể có chứa một hoặc nhiều module khác, như Networking nó chứa VPC module và SG (Security Group) module, nếu một module nằm trong một module khác, ta gọi nó là nested modules.

### Write code
Ok, giờ ta sẽ tiến hành viết code, ta tạo thư mục như sau.

```
.
├── main.tf
└── modules
    ├── autoscaling
    │   ├── main.tf
    │   ├── outputs.tf
    │   └── variables.tf
    ├── database
    │   ├── main.tf
    │   ├── outputs.tf
    │   └── variables.tf
    └── networking
        ├── main.tf
        ├── outputs.tf
        └── variables.tf
```

Ở file `main.tf` của root, ta thêm vào đoạn code sau.

```main.tf
locals {
  project = "terraform-series"
}

provider "aws" {
  region = "us-west-2"
}

module "networking" {
  source = "./modules/networking"
}

module "database" {
  source = "./modules/database"
}

module "autoscaling" {
  source = "./modules/autoscaling"
}
```

### Networking Module
Đầu tiên ta sẽ viết code cho networking module, khi viết module thì ta cần định nghĩa giá trị đầu vào và đầu ra của module, ta có thể định nghĩa từ đầu hoặc khi ta viết module xong ta thấy ta cần giá trị nào mà dynamic thì ta thêm vào cũng được không nhất thiết phải định nghĩa từ ban đầu. Networking module của ta sẽ có giá trị input và output như sau.

![image.png](https://images.viblo.asia/e7a2eaa9-edbd-483c-b379-c3cc734b207d.png)

Cập nhật file `variables.tf` của networking module.

```networking/variables.tf
variable "project" {
  type    = string
}

variable "vpc_cidr" {
  type    = string
}

variable "private_subnets" {
  type    = list(string)
}

variable "public_subnets" {
  type    = list(string)
}

variable "database_subnets" {
  type    = list(string)
}
```

Tiếp theo cập nhật file `main.tf` của networking module.

```networking/main.tf
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.12.0"
  
  name    = "${var.project}-vpc"
  cidr    = var.vpc_cidr
  azs     = data.aws_availability_zones.available.names

  private_subnets  = var.private_subnets
  public_subnets   = var.public_subnets
  database_subnets = var.database_subnets

  create_database_subnet_group = true
  enable_nat_gateway           = true
  single_nat_gateway           = true
}
```

Đây là remote module mà ta sẽ dùng câu lệnh `terraform init` để tải xuống, module này sẽ tạo VPC cho ta. Với các giá trị trên thì VPC của ta khi được tạo sẽ như thế này.

![](https://images.viblo.asia/9f56c668-81e1-4ba1-9cd8-2f8dbb741d69.jpg)

Tiếp theo ta sẽ tiến hành tạo Secutiry Group cho VPC của ta, Secutiry Group của ta phải cho phép 3 thằng sau:
1. Cho phép truy cập port 80 của ALB từ mọi nơi.
2. Cho phép truy cập port 80 của các EC2 từ ALB.
3. Cho phép truy cập port 5432 của RDS từ EC2.

Ta thêm SG rule vào.

```networking/main.tf
...
module "alb_sg" {
  source = "terraform-in-action/sg/aws"
  vpc_id = module.vpc.vpc_id
  ingress_rules = [
    {
      port        = 80
      cidr_blocks = ["0.0.0.0/0"]
    }
  ]
}

module "web_sg" {
  source = "terraform-in-action/sg/aws"
  vpc_id = module.vpc.vpc_id
  ingress_rules = [
    {
      port        = 80
      security_groups = [module.lb_sg.security_group.id]
    }
  ]
}

module "db_sg" {
  source = "terraform-in-action/sg/aws"
  vpc_id = module.vpc.vpc_id
  ingress_rules = [
    {
      port            = 5432
      security_groups = [module.web_sg.security_group.id]
    }
  ]
}
```

Để các module bên ngoài có thể truy cập được các giá trị của module này, ta cần output nó ra. Cập nhật file `outputs.tf`.

```networking/outputs.tf
output "vpc" {
  value = module.vpc
}

output "sg" {
  value = {
    lb = module.lb_sg.security_group.id
    web = module.web_sg.security_group.id
    db = module.db_sg.security_group.id
  }
}
```

### Output value
Để truy cập giá trị của một module, ta dùng systax sau `module.<name>.<output_value>`, ví dụ để truy cập giá trị lb_sg id của networking module.

```
module.networking.sg.lb
```

**Nên nhớ `module.<name>` thì name là tên ta khai báo khi ta sử dụng module chứ không phải tên folder của module nhé.** Ví dụ:
 
```examp_one.tf
module "networking" {
  source = "./modules/networking"
}

module.networking.sg.lb
```

```examp_two.tf
module "nt" {
  source = "./modules/networking"
}

module.nt.sg.lb
```

Oke, vậy là ta đã viết xong networking module, ta sử dụng nó như sau. Cập lại file `main.tf` ngoài root.

```main.tf
locals {
  project = "terraform-series"
}

provider "aws" {
  region = "us-west-2"
}

module "networking" {
  source = "./modules/networking"

  project          = local.project
  vpc_cidr         = "10.0.0.0/16"
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  database_subnets = ["10.0.7.0/24", "10.0.8.0/24", "10.0.9.0/24"]
}

module "database" {
  source = "./modules/database"
}

module "autoscaling" {
  source = "./modules/autoscaling"
}
```

## Database Module
Tiếp theo ta sẽ viết code cho database module, input và output của database module.

![image.png](https://images.viblo.asia/91670b5e-d2d8-4425-a873-6af0b323d235.png)

Ở trên AWS, khi ta tạo RDS, yêu cầu ta cần phải có một **subnet groups** trước, rồi RDS mới được deploy lên trên subnet group đó.

![image.png](https://images.viblo.asia/a0c6bb6f-79f2-4248-bd6b-d84d48ef9e16.png)

Để tạo subnet group bằng Terraform thì ta sẽ xài `aws_db_subnet_group` resource, ví dụ.

```
resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = [aws_subnet.frontend.id, aws_subnet.backend.id]

  tags = {
    Name = "My DB subnet group"
  }
}
```

Ở trên khi ta xài module VPC, thì nó đã tạo sẵn cho ta một thằng subnet groups sẵn, nên ta mới cần truyền thằng vpc vào module database, để ta đỡ phải một thằng subnet group khác. Ta lấy giá trị subnet group ở trong module vpc như sau `module.networking.vpc.database_subnet_group`. Giờ ta sẽ viết code cho module, cập nhật file `variables.tf` trong database module.

```database/variables.tf
variable "project" {
  type = string
}

variable "vpc" {
  type = any
}

variable "sg" {
  type = any
}
```

File `main.tf`.

```database/main.tf
resource "aws_db_instance" "database" {
  allocated_storage      = 20
  engine                 = "postgresql"
  engine_version         = "12.7"
  instance_class         = "db.t2.micro"
  identifier             = "${var.project}-db-instance"
  name                   = "terraform"
  username               = "admin"
  password               = "admin"
  db_subnet_group_name   = var.vpc.database_subnet_group
  vpc_security_group_ids = [var.sg.db]
  skip_final_snapshot    = true
}
```

Để tạo RDS trên AWS thì ta sẽ dùng `aws_db_instance` resource, ở trên ta chỉ định engine của RDS mà ta sẽ xài là postgresql version 12.7, với size là 20GB, giá trị subnet group của RDS, ta lấy giá trị truyền vào từ biến vpc (lát ta sẽ truyền biến này vào database module). Mọi thứ có vẻ ok, nhưng bạn để ý là ở trường password, hiện tại ta đang fix cứng giá trị, nếu ta không muốn fix cứng mà ta muốn giá trị này sẽ là random thì sao?

Ta sẽ dùng một resource khác trong terraform giúp ta random passoword, sau đó ta sẽ truyền giá trị password này vào database. Cập nhật code lại.

```database/main.tf
resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "_%@"
}

resource "aws_db_instance" "database" {
  allocated_storage      = 20
  engine                 = "postgresql"
  engine_version         = "12.7"
  instance_class         = "db.t2.micro"
  identifier             = "${var.project}-db-instance"
  db_name                = "series"
  username               = "series"
  password               = random_password.password.result
  db_subnet_group_name   = var.vpc.database_subnet_group
  vpc_security_group_ids = [var.sg.db]
  skip_final_snapshot    = true
}
```

**Lưu ý khi ta sử dụng resource này thì password của ta sẽ được lưu ở trong state file, lúc này ai truy cập vào state file cũng có thể thấy được password, việc này dẫn đến việc bảo mật của ta không được tốt lắm, ta sẽ bàn về vấn đề secutiry ở một bài khác.**

Ta output giá trị RDS ra ngoài để bên ngoài có thể truy cập được.

```database/outputs.tf
output "config" {
  value = {
    user     = aws_db_instance.database.username
    password = aws_db_instance.database.password
    database = aws_db_instance.database.name
    hostname = aws_db_instance.database.address
    port     = aws_db_instance.database.port
  }
}
```

Oke, ta đã viết xong database module, ta cập nhật lại fle `main.tf` ở root để có thể sử dụng được module.

```main.tf
locals {
  project = "terraform-series"
}

provider "aws" {
  region = "us-west-2"
}

module "networking" {
  source = "./modules/networking"

  project          = local.project
  vpc_cidr         = "10.0.0.0/16"
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  database_subnets = ["10.0.7.0/24", "10.0.8.0/24", "10.0.9.0/24"]
}

module "database" {
  source = "./modules/database"

  project = local.project
  vpc     = module.networking.vpc
  sg      = module.networking.sg
}

module "autoscaling" {
  source = "./modules/autoscaling"
}
```

Có một điểm ta cần nói là ở file khai báo biến của database module, hai giá trị là vpc với sg, ta khai báo type là **any**.

```database/variables.tf
...
variable "vpc" {
  type = any
}

variable "sg" {
  type = any
}
```

Khi ta muốn truyền một giá trị mà ta không biết nó thuộc loại dữ liệu nào, thì ta sẽ khai báo kiểu dữ của nó là any, ở trên vì biến vpc là any nên ta mới có thể truyền nguyên giá trị của module vpc vào database module được.

## Autoscaling Module
Module cuối cùng mà ta sẽ viết là autoscaling module, đây là một module chứa hơi nhiều thứ. Để tạo một autoscaling group trên AWS và khiến nó hoạt động được, ta cần một số service phải tạo chung với nó như là Load Balancer, Launch Templates, ... Trong khi Load Balancer, ta cũng cần phải tạo cho nó 3 thằng là Load Balancer + Target Group + LB Listener. Nên để tạo được ASG trên AWS mà ta không dùng module có sẵn thì viết code cũng hơi nhiều, đây là lý do tại sao ta nên xài module cho nhanh gọn và tiện. Hình minh họa.

![image.png](https://images.viblo.asia/e9f7b647-0161-4392-baca-a9fe91a456a0.png)
*[<div align="center">Image form DevOps @ CognitoiQ</div>](https://medium.com/cognitoiq/terraform-and-aws-application-load-balancers-62a6f8592bcf)*

Ta định nghĩa input và output của autoscaling module.

![image.png](https://images.viblo.asia/03bd28b1-532e-40b7-978f-b77520c0face.png)

Giờ ta sẽ tiến hành viết code, cập nhật file `variables.tf` của autoscaling module.

```autoscaling/variables.tf
variable "project" {
  type = string
}

variable "vpc" {
  type = any
}

variable "sg" {
  type = any
}

variable "db_config" {
  type = object(
    {
      user     = string
      password = string
      database = string
      hostname = string
      port     = string
    }
  )
}
```

Tiếp theo ta sẽ khai báo ASG, để tạo được ASG thì ta cần có một Launch Templates đi kèm với nó, ASG sẽ dùng template này để tạo EC2.

![image.png](https://images.viblo.asia/737aa173-4f46-4b49-89d5-c45473edc7e5.png)

Để tạo Launch Templates, ta dùng resource `aws_launch_template`, cập nhật file `main.tf` của autoscaling module.

```autoscaling/main.tf
data "aws_ami" "ami" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0.*-x86_64-gp2"]
  }

  owners = ["amazon"]
}

resource "aws_launch_template" "web" {
  name_prefix   = "web-"
  image_id      = data.aws_ami.ami.id
  instance_type = "t2.micro"

  vpc_security_group_ids = [var.sg.web]

  user_data = filebase64("${path.module}/run.sh")
}
```

File `run.sh`.

```autoscaling/run.sh
#!/bin/bash
yum update -y
yum install -y httpd.x86_64
systemctl start httpd
systemctl enable http
echo "$(curl http://169.254.169.254/latest/meta-data/local-ipv4)" > /var/www/html/index.html
```

Ở trên, ta dùng data source aws_ami để filter lấy ra image id của OS amazon-linux-2, sau đó gán id này vào launch template , mục user_data ta định nghĩa đoạn script sẽ chạy khi EC2 của ta được tạo ra. Tiếp theo ta gán nó vào autoscaling group.

```autoscaling/main.tf
...
resource "aws_autoscaling_group" "web" {
  name                = "${var.project}-asg"
  min_size            = 1
  max_size            = 3
  vpc_zone_identifier = var.vpc.private_subnets

  launch_template {
    id      = aws_launch_template.web.id
    version = aws_launch_template.web.latest_version
  }
}
```

Tiếp theo, vì RDS của ta được tạo ở chế độ private, nên để EC2 có thể truy cập được tới DB, ta phải gán IAM role vào trong EC2 này, ở trong Terraform ta có thể config nó thông qua thuộc tính `iam_instance_profile` của `aws_launch_template` resource. Ta cập nhật lại code như sau.

```autoscaling/main.tf
data "aws_ami" "ami" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0.*-x86_64-gp2"]
  }

  owners = ["amazon"]
}

module "iam_instance_profile" {
  source  = "terraform-in-action/iip/aws"
  actions = ["logs:*", "rds:*"]
}

resource "aws_launch_template" "web" {
  name_prefix   = "web-"
  image_id      = data.aws_ami.ami.id
  instance_type = "t2.micro"

  vpc_security_group_ids = [var.sg.web]

  user_data = filebase64("${path.module}/run.sh")

  iam_instance_profile {
    name = module.iam_instance_profile.name
  }
}

resource "aws_autoscaling_group" "web" {
  name                = "${var.project}-asg"
  min_size            = 1
  max_size            = 3
  vpc_zone_identifier = var.vpc.private_subnets

  launch_template {
    id      = aws_launch_template.web.id
    version = aws_launch_template.web.latest_version
  }
}
```

Ta dùng module `terraform-in-action/iip/aws` để tạo role với quyền là full access tới logs và rds, sau đó ta gán náo vào aws_launch_template. Ok, vậy là ta đã khai báo được ASG, resource mà tiếp theo ta cần khai báo là Load Balancer, để cho phép user truy cập được tới ASG của ta. Ta sẽ dùng `terraform-aws-modules/alb/aws`, thêm vào thêm `main.tf` đoạn code của LB.

```autoscaling/main.tf
...
module "alb" {
  source             = "terraform-aws-modules/alb/aws"
  version            = "~> 6.0"
  name               = var.project
  load_balancer_type = "application"
  vpc_id             = var.vpc.vpc_id
  subnets            = var.vpc.public_subnets
  security_groups    = [var.sg.lb]
  http_tcp_listeners = [
    {
      port               = 80,
      protocol           = "HTTP"
      target_group_index = 0
    }
  ]
  target_groups = [
    {
      name_prefix      = "web",
      backend_protocol = "HTTP",
      backend_port     = 80
      target_type      = "instance"
    }
  ]
}

resource "aws_autoscaling_group" "web" {
  name                = "${var.project}-asg"
  min_size            = 1
  max_size            = 3
  vpc_zone_identifier = var.vpc.private_subnets
  target_group_arns   = module.alb.target_group_arns

  launch_template {
    id      = aws_launch_template.web.id
    version = aws_launch_template.web.latest_version
  }
}
```

Sau khi khai báo LB thì ta cập nhật lại thuộc tính `target_group_arns` của `aws_autoscaling_group` với giá trị `target_group_arns` được lấy ra từ module lb. Cập nhật output của module.

```autoscaling/outputs.tf
output "lb_dns" {
  value = module.alb.lb_dns_name
}
```

Ta sử dụng autoscaling module ở file `main.tf` như sau.

```main.tf
locals {
  project = "terraform-series"
}

provider "aws" {
  region = "us-west-2"
}

module "networking" {
  source = "./modules/networking"

  project          = local.project
  vpc_cidr         = "10.0.0.0/16"
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  database_subnets = ["10.0.7.0/24", "10.0.8.0/24", "10.0.9.0/24"]
}

module "database" {
  source = "./modules/database"

  project = local.project
  vpc     = module.networking.vpc
  sg      = module.networking.sg
}

module "autoscaling" {
  source = "./modules/autoscaling"

  project   = local.project
  vpc       = module.networking.vpc
  sg        = module.networking.sg
  db_config = module.database.config
}
```

Cuối cùng ta khai báo file output cho root module. Tạo file `outputs.tf` ở root.

```outputs.tf
output "db_password" {
  value = module.database.config.password
  sensitive = true
}

output "lb_dns_name" {
  value = module.autoscaling.lb_dns
}
```

Oke, ta đã viết code xong, giờ ta chạy câu lệnh init và apply để tạo hạ tầng nào.

```
terraform init
```

```
terraform apply -auto-approve
```

```
...
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

db_password = <sensitive>
lb_dns_name = "terraform-series-1259399054.us-west-2.elb.amazonaws.com"
```

Sau khi Terraform chạy xong ta sẽ thấy url của Load Balancer được in ra terminal, ta truy cập vào nó.

```
curl terraform-series-1259399054.us-west-2.elb.amazonaws.com
```

Oke, ta đã tạo được hạ tầng cho một solution Application Load Balancer + Auto Scaling Group + Relational Database Service 😁. Github repo của toàn bộ series https://github.com/hoalongnatsu/terraform-series.

## Kết luận
Vậy là ta đã tìm hiểu sâu hơn một chút về cách sử dụng module, như bạn thấy khi ta sử dụng module, thì ở file main của root module ta chỉ việc khai báo module và sử dụng nó, thay vì phải viết code dài dòng trong file main. Sử dụng module sẽ giúp ta tổ chức code theo nhóm dễ dàng hơn. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).