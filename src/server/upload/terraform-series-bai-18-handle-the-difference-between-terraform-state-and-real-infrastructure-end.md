## Giới thiệu
Chào các bạn tiếp tục với series về Terraform, ở bài trước chúng ta đã tìm hiểu về các vấn đề bảo mật trong Terraform. Ở bài này chúng ta sẽ tìm hiểu về một vấn đề rất quan trọng là ta sẽ xử lý thế nào khi Terraform state file của ta khác biệt với hạ tầng thực tế.

![](https://images.viblo.asia/8f22dec9-d16b-4654-a167-7fa5ecf6c666.png)

Ví dụ ta dùng Terraform để tạo hạ tầng trên AWS, sau khi Terraform tạo hạ tầng xong thì nó sẽ tạo ra một state file để lưu lại trạng thái của hạ tầng. Nếu có ai đó không dùng Terraform mà truy cập thẳng lên AWS Web Console để thay đổi bất cứ thứ gì liên quan tới hạ tầng của ta, thì lúc này trạng thái của hạ tầng trong state file sẽ khác với hạ tầng thực tế, ta sẽ giải quyết vấn đề này như thế nào trong Terraform?

## Create infrastructure
Ta sẽ làm một ví dụ nhỏ là tạo một EC2 + Security Group cho phép truy cập port 22 của EC2, sau đó ta sẽ giả lập một sự thay đổi bên ngoài Terraform bằng cách dùng AWS CLI tạo thêm một SG cho phép truy cập port 80 và gán nó vào EC2.

Tạo một file tên là `main.tf` với đoạn code như sau.

```main.tf
provider "aws" {
  region = "us-west-2"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

resource "aws_security_group" "allow_ssh" {
  name   = "allow-ssh"

  ingress {
    from_port = "22"
    to_port   = "22"
    protocol  = "tcp"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name  = "allow-ssh"
  }
}

resource "aws_instance" "server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"

  vpc_security_group_ids = [
    aws_security_group.allow_ssh.id
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name  = "Server"
  }
}

output "ec2" {
  value = aws_instance.server.id
}
```

Chạy câu lệnh Terraform để tạo các resource trên.

```bash
terraform init && terraform apply -auto-approve
```

```
...
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

instance_id = "i-082e7dcd35b327dbb"
```

Oke, mở AWS Console tên ta sẽ thấy con EC2 ta vừa tạo.

![image.png](https://images.viblo.asia/5cf157b2-c4b7-4a36-9a09-70bae33243b5.png)

### Change Infrastructure
Tiếp theo ta sẽ dùng AWS CLI để tạo Security Group và gán nó vào EC2. Tạo SG.

```
aws ec2 create-security-group --group-name "allow-http" --description "allow http" --region us-west-2 --output text
```

Ta sẽ thấy SG id được in ra terminal, nhớ copy giá trị đó lại.

```
sg-026401f9c4e93a37a
```

Cập nhật SG cho phép truy cập port 80.

```
aws ec2 authorize-security-group-ingress --group-name "allow-http" --protocol tcp --port 80 --cidr 0.0.0.0/0 --region us-west-2
```

Gán SG vào EC2.

```
current_security_groups=$(aws ec2 describe-instances --instance-ids $(terraform output -raw instance_id) --query Reservations[*].Instances[*].SecurityGroups[*].GroupId --region us-west-2 --output text)
```

```
aws ec2 modify-instance-attribute --instance-id $(terraform output -raw instance_id) --groups $current_security_groups sg-026401f9c4e93a37a --region us-west-2
```

Lúc này thì hạ tầng trên AWS của ta đã khác biệt với Terraform state, bạn chạy câu lệnh plan sẽ thấy.

```
terraform plan
```

```bash
Terraform will perform the following actions:

  # aws_instance.server will be updated in-place
  ~ resource "aws_instance" "server" {
        id                                   = "i-0531f02acb4fa3c2b"
        tags                                 = {
            "Name" = "Server"
        }
      ~ vpc_security_group_ids               = [
          - "sg-026401f9c4e93a37a",
            # (1 unchanged element hidden)
        ]
        # (29 unchanged attributes hidden)

        # (7 unchanged blocks hidden)
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```

Nếu ta chạy apply thì Terraform sẽ rollback hạ tầng của chúng ta về trước lúc ta thêm SG `sg-026401f9c4e93a37a` vào, nhưng cái ta muốn bây giờ là cần Terraform state phải phản ánh đúng hạ tầng thực tế.

Ta sẽ có hai cách để làm việc này:
+ `terraform refresh`
+ `terrform apply -refresh-only`

## Terraform Refresh
**Các bạn đừng làm theo cách này nhé.**

Cách đầu tiên là ta sẽ sử dụng câu lệnh *refresh*. Khi ta chạy câu lệnh `terraform refresh` thì Terraform sẽ đọc trạng thái của hạ tầng mà nó đang quản lý, sau đó nó sẽ cập nhật lại Terraform state cho giống với hạ tầng.

```
terraform refresh
```

```
data.aws_ami.ubuntu: Reading...
aws_security_group.allow_ssh: Refreshing state... [id=sg-08326a64e6951fcbf]
data.aws_ami.ubuntu: Read complete after 0s [id=ami-0123376e204addb71]
aws_instance.server: Refreshing state... [id=i-0531f02acb4fa3c2b]

Outputs:

instance_id = "i-0531f02acb4fa3c2b"
```

Bây giờ thì Terraform state của ta đã giống với hạ tầng trên AWS, tiếp theo ta sẽ cập nhật lại code bằng tay, vì Terraform không có câu lệnh nào để ta có thể thay đổi được code trong file cấu hình giống với hạ tầng được hết, nên ta phải tự làm bằng tay ở đoạn này.

Cập nhật lại file `main.tf`.

```main.tf
...
resource "aws_instance" "server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"

  vpc_security_group_ids = [
    aws_security_group.allow_ssh.id,
    "sg-026401f9c4e93a37a"
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name  = "Server"
  }
}
...
```

Ở chỗ `vpc_security_group_ids` ta thêm SG `sg-026401f9c4e93a37a` vào. Bây giờ thì ta chạy câu lệnh plan, ta sẽ thấy Terraform state đã phản ánh đúng hạ tầng hiện tại.

```
terraform plan
```

```
data.aws_ami.ubuntu: Reading...
aws_security_group.allow_ssh: Refreshing state... [id=sg-08326a64e6951fcbf]
data.aws_ami.ubuntu: Read complete after 0s [id=ami-0123376e204addb71]
aws_instance.server: Refreshing state... [id=i-0531f02acb4fa3c2b]

No changes. Your infrastructure matches the configuration.
```

Ok, vậy là ta đã xử lý được khác biệt của Terraform state và hạ tầng thực tế, nhưng `terraform refresh` là câu lệnh cũ và không được khuyến kích sử dụng, vì khi ta chạy refresh ta không biết được resource nào đã thay đổi trong state file.

Nên từ phiên bản Terraform v0.15.4 đã có một câu lệnh mới hơn để giúp ta giải quyết vấn đề này, và các bạn nên sử dụng nó trong các dự án của mình, đó là refresh only.

## Terraform Reresh Only
**Nếu các bạn có làm theo phần refresh thì nhớ revert lại hạ tầng như ban đầu của phần Create infrastructure**.

Giống với với câu lệnh refresh thì refresh only cũng sẽ đọc trạng thái của hạ tầng mà nó đang quản lý, nhưng thay vì cập nhật luôn Terraform state thì nó sẽ cho phép ta thấy resource nào sẽ thay đổi và ta có chấp nhận cập nhật lại state file không.

Ta chạy câu lệnh refresh only như sau.
```
terraform apply -refresh-only
```

```
Terraform detected the following changes made outside of Terraform since the last "terraform
apply" which may have affected this plan:

  # aws_instance.server has changed
  ~ resource "aws_instance" "server" {
        id                                   = "i-0531f02acb4fa3c2b"
        tags                                 = {
            "Name" = "Server"
        }
      ~ vpc_security_group_ids               = [
          + "sg-026401f9c4e93a37a",
            # (1 unchanged element hidden)
        ]
        # (29 unchanged attributes hidden)

        # (7 unchanged blocks hidden)
    }


This is a refresh-only plan, so Terraform will not take any actions to undo these. If you were
expecting these changes then you can apply this plan to record the updated values in the
Terraform state without changing any remote objects.

Would you like to update the Terraform state to reflect these detected changes?
  Terraform will write these changes to the state without modifying any real infrastructure.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value:
```

Nó sẽ hiển thị cho ta biết là SG `sg-026401f9c4e93a37a` đã được thêm vào EC2, ta có muốn cập nhật lại state file cho nó giống với hạ tầng hiện tại không? Nếu các bạn gõ 'yes' thì nó sẽ cập nhật lại state file.

```
Would you like to update the Terraform state to reflect these detected changes?
  Terraform will write these changes to the state without modifying any real infrastructure.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes


Apply complete! Resources: 0 added, 0 changed, 0 destroyed.

Outputs:

instance_id = "i-0531f02acb4fa3c2b"
```

Tiếp theo thì ta cũng cần phải cập nhật lại file cấu hình bằng tay.

```
vpc_security_group_ids = [
    aws_security_group.allow_ssh.id,
    "sg-026401f9c4e93a37a"
]
```

Chạy câu lệnh plan ta sẽ thấy Terraform state đã phản ánh đúng hạ tầng hiện tại. Nhưng hiện tại ta đang để giá trị của `vpc_security_group_ids` bằng giá trị `sg-026401f9c4e93a37a` luôn, vậy thì không hay lắm, có cách nào ta sẽ import thằng này vào file cấu hình luôn hay không?

Câu trả lời là có, và **hiện tại chưa có công cụ nào chuyển toàn bộ hạ tầng của ta thành file code của Terraform mà hoàn hảo cả, tất cả mọi thứ ta đều phải cần làm bằng tay**.

## Terraform import
Để quản lý một resource của hạ tầng mà chưa có trong file code của Terraform, ta sẽ làm các bước sau đây:
1. Khai báo cấu hình của resource đó trong file code.
2. Dùng câu lệnh `terraform import` để import resource vào state file.

Cập nhật lại file `main.tf` thêm vào SG của `sg-026401f9c4e93a37a`.

```main.tf
...

resource "aws_security_group" "allow_http" {
  name        = "allow-http"
  description = "allow http"

  ingress {
    from_port = "80"
    to_port   = "80"
    protocol  = "tcp"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  tags = {
    Name = "allow-http"
  }
}

...
```

Tiếp theo ta sẽ chạy câu lệnh import.

```
terraform import aws_security_group.allow_http sg-026401f9c4e93a37a
```

```
aws_security_group.allow_http: Importing from ID "sg-026401f9c4e93a37a"...
aws_security_group.allow_http: Import prepared!
  Prepared aws_security_group for import
aws_security_group.allow_http: Refreshing state... [id=sg-026401f9c4e93a37a]

Import successful!
```

**Để xem cách import của các resource khác nhau thì các bạn xem trên docs của provider aws nhé.**

Tiếp theo ta cập nhật lại  `vpc_security_group_ids` của `aws_instance.server` không cần phải fix cứng giá trị nữa.

```main.tf
...

  vpc_security_group_ids = [
    aws_security_group.allow_ssh.id,
    aws_security_group.allow_http.id,
  ]

...
```

Full code.

```main.tf
provider "aws" {
  region  = "us-west-2"
  profile = "kala"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

resource "aws_security_group" "allow_ssh" {
  name = "allow-ssh"

  ingress {
    from_port = "22"
    to_port   = "22"
    protocol  = "tcp"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow-ssh"
  }
}

resource "aws_security_group" "allow_http" {
  name        = "allow-http"
  description = "allow http"

  ingress {
    from_port = "80"
    to_port   = "80"
    protocol  = "tcp"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }

  tags = {
    Name = "allow-http"
  }
}

resource "aws_instance" "server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"

  vpc_security_group_ids = [
    aws_security_group.allow_ssh.id,
    aws_security_group.allow_http.id,
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "Server"
  }
}

output "instance_id" {
  value = aws_instance.server.id
}
```

Giờ ta chạy câu lệnh apply thì sẽ thấy có một số thay đổi nhỏ ở phần tag của SG, các bạn đừng quan tâm giá trị này mà cứ gõ 'yes' là được.

```
terraform apply
```

```bash
Terraform will perform the following actions:

  # aws_security_group.allow_http will be updated in-place
  ~ resource "aws_security_group" "allow_http" {
        id                     = "sg-026401f9c4e93a37a"
        name                   = "allow-http"
      + revoke_rules_on_delete = false
      ~ tags                   = {
          + "Name" = "allow-http"
        }
      ~ tags_all               = {
          + "Name" = "allow-http"
        }
        # (6 unchanged attributes hidden)

        # (1 unchanged block hidden)
    }

Plan: 0 to add, 1 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_security_group.allow_http: Modifying... [id=sg-026401f9c4e93a37a]
aws_security_group.allow_http: Modifications complete after 1s [id=sg-026401f9c4e93a37a]

Apply complete! Resources: 0 added, 1 changed, 0 destroyed.

Outputs:

instance_id = "i-0531f02acb4fa3c2b"
```

Done 😁. Nhớ destroy resource đi nhé.

```
terraform destroy -auto-approve
```

## Kết luận
Vậy là ta đã tìm xong cách làm sao để xử lý sự khác biệt giữa Terraform state và hạ tầng thực tế, và chúng ta nên sử dụng cách refresh only thay vì cách refresh. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Đây là bài cuối của terraform series, hi vọng có thể gặp các bạn ở các series tiếp theo.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).