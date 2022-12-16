## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã nói về lý thuyết của [Terraform Backend](https://viblo.asia/p/terraform-series-bai-6-terraform-backend-understand-backend-924lJRr6lPM). Ở bài này chúng ta sẽ thực hành sử dụng Terraform Standard Backend, cụ thể là S3 Standard Backend. Ta sẽ tìm hiểu Terraform S3 Backend sẽ bao gồm các thành phần gì, tạo nó ra sao và ứng dụng nó vào dự án của ta thế nào.

Mô hình đơn giản của S3 Standard Backend như sau.

![image.png](https://images.viblo.asia/ebbe6c3a-b692-4421-a6cc-a3d36bae14a2.png)

## Developing an S3 backend
### Architecture
Trước khi sử dụng S3 backend thì ta cần phải tạo nó trước, cấu trúc của một S3 backend gồm những thành phần:
+ IAM
+ DynamoDB
+ S3 bucket - KMS

![image.png](https://images.viblo.asia/12f98b04-c5be-47ec-86b8-c0f35f2b8678.png)

Từng thành phần trên sẽ được sử dụng như sau:
+ IAM được sử dụng để terraform assume role, để terraform có quyền ghi vào dynamodb table và fetch/store state vào bên trong S3.
+ Dynamodb được terraform dùng để ghi lock key của một process vào bên trong nó, vì dynamodb có tốc độ đọc và ghi nhanh tới mức milisecond nên nó rất thích hợp để lock state của một process.
+ S3 bucket dùng để lưu trữ state khi terraform chạy xong, KMS được S3 sử dụng để mã hóa dữ liệu state khi nó được lưu vào bên trong S3.

### Developing
Giờ thì ta sẽ tiến hành tạo S3 backend, phía dưới các resource mà ta sẽ sử dụng để tạo S3 backend.

![](https://images.viblo.asia/fe89e3b4-11f3-4d9d-83de-c65225a12b45.jpg)

Tạo một một folder và file `main.tf` + `variables.tf` + `versions.tf` với nội dung.

```main.tf
provider "aws" {
  region = var.region
}
```

```variables.tf
variable "region" {
  type = string
  default = "us-west-2"
}

variable "project" {
  description = "The project name to use for unique resource naming"
  default     = "terraform-series"
  type        = string
}

variable "principal_arns" {
  description = "A list of principal arns allowed to assume the IAM role"
  default     = null
  type        = list(string)
}
```

```versions.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
```

Sau đó chạy câu lệnh `terraform init`. Oke, vậy là bước chuẩn bị đã xong, tiếp theo ta tạo file `dynamodb.tf`.

```dynamodb.tf
resource "aws_dynamodb_table" "dynamodb_table" {
  name         = "${var.project}-s3-backend"

  hash_key     = "LockID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = local.tags
}
```

Đây là DynamoDB Table resource để chứa lock state của ta, ta định nghĩa table này sẽ có một trường là **LockID với type là String** đây là cấu hình bắt buộc mà terraform quy định cho table mà dùng để lưu lock state.

Tiếp theo ta tạo file `iam.tf` chứa các IAM resource.

```iam.tf
data "aws_caller_identity" "current" {}

locals {
  principal_arns = var.principal_arns != null ? var.principal_arns : [data.aws_caller_identity.current.arn]
}

data "aws_iam_policy_document" "policy_doc" {
  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.s3_bucket.arn]
  }

  statement {
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.s3_bucket.arn}/*"]
  }

  statement {
    actions   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem"]
    resources = [aws_dynamodb_table.dynamodb_table.arn]
  }
}
```

Data source `aws_caller_identity` dùng để lấy thông tin về aws account mà ta đang chạy. Biến principal_arns sẽ chứa tất cả đối tượng mà ta cho phép nó assume role với aws account của ta.

Từ biểu thức so sánh `var.principal_arns != null ? var.principal_arns : [data.aws_caller_identity.current.arn]` ở trên => nếu ta không truyền biến này vào khi chạy terraform thì nó sẽ chỉ cho phép account mà ta dùng để chạy terraform có quyền assume role.

Resoruce `aws_iam_policy_document` dùng để định nghĩa các policy của ta, policy document ở trên sẽ định nghĩa quyền cần thiết để ta có thể thực hiện hành động lên trên DynamoDB, S3, KSM. Tiếp theo ta sẽ gắn policy document này vào policy và role.

```iam.tf
...
resource "aws_iam_policy" "policy" {
  name   = "${title(var.project)}S3BackendPolicy"
  path   = "/"
  policy = data.aws_iam_policy_document.policy_doc.json
}

resource "aws_iam_role" "iam_role" {
  name = "${title(var.project)}S3BackendRole"

  assume_role_policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
        "AWS": ${jsonencode(local.principal_arns)}
      },
      "Effect": "Allow"
      }
    ]
  }
  EOF

  tags = local.tags
}

resource "aws_iam_role_policy_attachment" "policy_attach" {
  role       = aws_iam_role.iam_role.name
  policy_arn = aws_iam_policy.policy.arn
}
```

Sau đó ta tạo file `s3.tf`.

```s3.tf
resource "aws_s3_bucket" "s3_bucket" {
  bucket        = "${var.project}-s3-backend"
  force_destroy = false

  tags = local.tags
}

resource "aws_s3_bucket_acl" "s3_bucket" {
  bucket = aws_s3_bucket.s3_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "s3_bucket" {
  bucket = aws_s3_bucket.s3_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_kms_key" "kms_key" {
  tags = local.tags
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket" {
  bucket = aws_s3_bucket.s3_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.kms_key.arn
    }
  }
}
```

Resource `aws_s3_bucket` ta dùng để định nghĩa s3 bucket, `aws_s3_bucket_acl` ta dùng để định nghĩa access control list của s3, ta nên để là private.

Tiếp theo và quan trọng là để S3 có thể dùng để lưu trữ state, ta phải bật versioning cho nó, ta làm bằng resource `aws_s3_bucket_versioning`. Cuối cùng là ta bật SSE (Server Side Encryption) cho bucket của ta bằng resource `aws_s3_bucket_server_side_encryption_configuration`.

Oke, vậy là ta đã chuẩn bị đủ các resource cho S3 backend, tiếp theo ta cập nhật lại file `main.tf` để nó output ra giá trị của S3 backend mà ta sẽ cần, để sử dụng cho các terraform project khác.

```main.tf
...
locals {
  tags = {
    project = var.project
  }
}

data "aws_region" "current" {}

resource "aws_resourcegroups_group" "resourcegroups_group" {
  name = "${var.project}-s3-backend"

  resource_query {
    query = <<-JSON
      {
        "ResourceTypeFilters": [
          "AWS::AllSupported"
        ],
        "TagFilters": [
          {
            "Key": "project",
            "Values": ["${var.project}"]
          }
        ]
      }
    JSON
  }
}

output "config" {
  value = {
    bucket         = aws_s3_bucket.s3_bucket.bucket
    region         = data.aws_region.current.name
    role_arn       = aws_iam_role.iam_role.arn
    dynamodb_table = aws_dynamodb_table.dynamodb_table.name
  }
}
```

Bạn sẽ để ý thấy có resource tên là `aws_resourcegroups_group`, thằng này chủ yếu được dùng để group resource lại cho ta dễ quản lý thôi, lát mình sẽ show cho các bạn xem.

Giờ bạn chạy câu lệnh `terraform plan` để tạo S3 backend, sau khi chạy xong ta sẽ thấy output như dưới, đây là các giá trị ta sẽ cần.

```
config = {
  "bucket" = "terraform-series-s3-backend"
  "dynamodb_table" = "terraform-series-s3-backend"
  "region" = "us-west-2"
  "role_arn" = "arn:aws:iam::<ACCOUNT_ID>:role/HpiS3BackendRole"
}
```

Để kiểm tra các resource của S3 backend, ta truy cập AWS Console https://console.aws.amazon.com/resource-groups/home, bạn sẽ thấy resource group của ta.

![image.png](https://images.viblo.asia/db675355-5957-41e1-ad82-3fa0af5a1033.png)

Bấm vào nó bạn sẽ thấy chi tiết của từng resource của S3 backend. Oke, tiếp theo ta sẽ tiến hành sử dụng S3 backend này vào trong project 😁.

### Using S3 backend
Để sử dụng S3 backend cho một project, ta cấu cần cấu hình như sau.

```main.tf
terraform {
  backend "s3" {
    bucket         = <bucket-name>
    key            = <path>
    region         = <region>
    encrypt        = true
    role_arn       = <arn-role>
    dynamodb_table = <dynamodb-table-name>
  }
}
```

Ta sẽ khai báo một block tên là terraform với backend là s3 với các giá trị sau:
+ bucket: s3 bucket name.
+ key: path ta lưu state trong bucket.
+ role_arn: IAM role mà có quyền cần thiết.
+ dynamodb_table: table dùng để save lock state.

Giờ ta sẽ làm ví dụ tạo một EC2 mà sử dụng S3 backend. Tạo một folder và file `main.tf`.

```main.tf
terraform {
  backend "s3" {
    bucket         = "terraform-series-s3-backend"
    key            = "test-project"
    region         = "us-west-2"
    encrypt        = true
    role_arn       = "arn:aws:iam::<ACCOUNT_ID>:role/HpiS3BackendRole"
    dynamodb_table = "terraform-series-s3-backend"
  }
}

provider "aws" {
  region = "us-west-2"
}

data "aws_ami" "ami" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

resource "aws_instance" "server" {
  ami           = data.aws_ami.ami.id
  instance_type = "t3.micro"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "Server"
  }
}

output "public_ip" {
  value = aws_instance.server.public_ip
}
```

Chạy `terraform init` sau đó ta chạy `terraform plan`, sau khi nó chạy xong bạn sẽ thấy `terraform.tfstate` sẽ không còn nằm ở local nữa. Mà ta sẽ cần lên trên S3 bucket để xem state file của ta.

Truy cập AWS S3 Console https://s3.console.aws.amazon.com/s3/buckets.

![image.png](https://images.viblo.asia/42917c37-36f1-470b-9a0a-75661acc8c03.png)

Bấm vào terraform-series-s3-backend ta sẽ thấy state file của ta.

![image.png](https://images.viblo.asia/01cb095a-f4ab-4682-ac7d-fbb182f477dc.png)

Oke, s3 backend của ta đã được implement thành công 😁. Github repo của toàn bộ series https://github.com/hoalongnatsu/terraform-series.git.

## Kết luận
Vậy là ta đã tìm hiểu xong về S3 backend, cách tạo ra nó và cách sử dụng nó. Khi ta làm việc với team thì ta nên sử dụng S3 backend cho project của ta, vừa centralized được state file, vừa giải quyết được vấn để conflict khi nhiều người chạy terraform project cùng một lúc.  Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Ở bài tiếp theo ta nói về cách config và triển khai Terraform dùng remote backend và Terraform Cloud.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).