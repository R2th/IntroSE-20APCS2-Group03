## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã tìm hiểu về Multi Cloud. Ở bài tiếp theo này chúng ta sẽ tìm hiểu về một chủ đề rất quan trọng là bảo mật trong Terraform. Ta sẽ quản lý những thông tin nhạy cảm trong Terraform như thế nào?

![image.png](https://images.viblo.asia/b25c0bcb-d62a-461d-94cb-9b58d9dd715e.png)

Khi ta dùng Terraform để quản lý và tạo hạ tầng cho môi trường production, thì đối với các resource như Database, Redis, Bastion Host, thông tin để truy cập được những thằng này là thông tin nhạy cảm và cần bảo mật. Và nếu bạn để ý thì sẽ thấy là toàn bộ những bài ta đã làm trong series này, dữ liệu của hạ tầng của ta đều được lưu trữ trong state file ở dạng plain text. Có nghĩa là nếu ai truy cập được state file này thì đều có thể thấy được những thông tin nhạy cảm của ta.

Nên ở bài này chúng ta sẽ học cách làm sao để bảo mật được những dữ liệu nhạy cảm đã nói ở trên. Ta sẽ tìm hiểu:
+ Securing logs.
+ Securing state files.
+ Dynamic secrets.
+ Sentinel (policy as code).

## Securing logs
Thứ đầu tiên có thể lộ thông tin bảo mật là logs, khi bạn chạy câu lệnh `terraform plan` hoặc `terraform apply`, những thứ in ra terminal sẽ được lưu vào file log ở thư mục `/tmp` (linux) trong một khoảng thời gian.

### Sensitive Variable
Nếu trong lúc terraform chạy apply mà ta có in ra thông tin gì nhạy cảm thì nó sẽ bị lộ nếu ai truy cập được vào máy bạn. Ví dụ nếu ta dùng `local-exec` như sau:

```main.tf
resource "null_resource" "print" {
  provisioner "local-exec" {
    command = <<-EOF
      echo "username = ${var.postgres_username}"
      echo "password = ${var.postgres_password}"
    EOF
  }
}
```

Khi ta chạy câu lệnh `terraform apply` thì log nó sẽ in ra như sau:

```
...
null_resource.uh_oh (local-exec): username=secret-username
null_resource.uh_oh (local-exec): password=secret-password
null_resource.uh_oh: Creation complete after 0s [id=5973892021553480485]
...
```

Thông in bảo mật của ta sẽ lưu vào trong log, nên khi ta sử dụng variable trong Terraform thì những biến chứa thông tin nhạy cảm ta nên thêm một trường cho nó là `sensitive`, ví dụ:

```main.tf
variable "postgres_username" {
  type = string
  sensitive = true
}

variable "postgres_password" {
  type = string
  sensitive = true
}

resource "null_resource" "print" {
  provisioner "local-exec" {
    command = <<-EOF
      echo "username = ${var.postgres_username}"
      echo "password = ${var.postgres_password}"
    EOF
  }
}
```

Khi ta chạy `apply` thì nó sẽ được in ra terminal như sau:

```
...
null_resource.uh_oh (local-exec): (output suppressed due to sensitive value in config)
null_resource.uh_oh (local-exec): (output suppressed due to sensitive value in config)
null_resource.uh_oh: Creation complete after 0s [id=5973892021553480485]
...
```

### Dangers of TF_LOG=trace
Khi bạn chạy apply với `TF_LOG=trace` thì ta sẽ thấy có rất nhiều thông tin được in ra.

```
export TF_LOG=trace
terraform apply
```

Thông tin nó in ra như sau:

```
...
Trying to get account information via sts:GetCallerIdentity
[aws-sdk-go] DEBUG: Request sts/GetCallerIdentity Details:
---[ REQUEST POST-SIGN ]-----------------------------
POST / HTTP/1.1
Host: sts.amazonaws.com
User-Agent: aws-sdk-go/1.30.16 (go1.13.7; darwin; amd64) APN/1.0
HashiCorp/1.0 Terraform/0.12.24 (+https://www.terraform.io)
Content-Length: 43
Authorization: AWS4-HMAC-SHA256 Credential=AKIATESI2XGPMMVVB7XL/20200504/us-east-1/sts/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-date, Signature=c4df301a200eb46d278ce1b6b9ead1cfbe64f045caf9934a14e9b7f8c207c3f8
Content-Type: application/x-www-form-urlencoded; charset=utf-8
...
```

Bạn sẽ thấy có một thông tin rất quan trọng ở phần Authorization, đây là token được lấy từ AWS STS, thông tin này ta có thể dùng để gọi API lên AWS. Nếu bạn dùng AWS IAM với quyền admin thì càng nguy hiểm hơn, tuy rằng token này chỉ tồn tại trong vòng 15 phút nhưng cũng khá nguy hiểm. **Nên bạn chỉ nên dùng `TF_LOG=trace` khi thực sự cần debug**.

## Securing state files
Terraform được sinh ra với mục đích là quản lý và cung cấp hạ tầng thông qua **state file**, nó sẽ không quan tâm là những thông tin được lưu trữ trong state file có phải là thông tin nhạy cảm hay không và nó cũng không có quá nhiều tính năng để làm điều đó. Nên để bảo mật được những dữ liệu trong state file, ta phải tìm những phương pháp khác, đây là một số cách để ta có thể bảo mật dữ liệu trong state file.

### Removing unnecessary secrets from Terraform
Mặc dù chúng ta không thể mã hóa thông tin bảo mật ở trong state file, nhưng ta có thể xóa bớt những thông tin được coi là nhạy cảm nhiều nhất có thể khi ta viết file code cho Terraform.

> Fewer secrets means you have less to lose in the event of a data breach

Cách bảo mật tốt nhất là ta càng có càng ít thông tin cần được bảo mật thì càng tốt `:)))`. 
Trong Terraform chỉ có **ba configuration blocks** sau là sẽ lưu trữ thông tin trong state file: resources, data sources, và output values. Còn các blocks khác như providers, input variables, local values, ... thì sẽ không được lưu trong state file.

Nên đối với các giá trị mà sẽ không lưu thông tin vào trong state file, thì thay vì fix cứng giá trị trong code, thì ta nên để nó trong biến môi trường và truyền vào khi ta chạy câu lệnh `apply`, ví dụ như sau, thay vì để giá trị trong code.

```main.tf
provider "aws" {
  region     = var.region
  access_key = "ABCXYZ"
  secret_key = "ABCXYZ"
}
```

Thì ta nên dùng như sau.

```main.tf
provider "aws" {
  region     = var.region
  access_key = var.access_key
  secret_key = var.secret_key
}
```

```
terraform apply -var="access_key=ABCXYZ" -var="secret_key=ABCXYZ"
```

Nhưng với những blocks mà lưu dữ liệu vào trong state file như resources thì cho dù ta có dùng biến môi trường thì nó vẫn được lưu vào trong state file, ví dụ.

```main.tf
resource "aws_rds_cluster" "postgres" {
  cluster_identifier = "postgres"
  engine             = "aurora-postgresql"
  engine_mode        = "provisioned"
  engine_version     = "13.6"
  database_name      = "terraform"
  master_username    = var.username
  master_password    = var.password
}
```

Thì khi ta tạo resource này, ta kiểm tra trong state file thì vẫn thấy giá trị của nó vẫn được lưu ở dạng plain text.

```
...
 {
      "mode": "managed",
      "type": "aws_db_instance",
      "name": "postgres",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
          ...
            "nchar_character_set_name": "",
            "option_group_name": "default:postgres-12",
            "parameter_group_name": "custom-postgres12",
            "password": "secret-password", // plain text
            ...
            "username": "secret-username", // plain text
            ...
          ...
          }
       ]
       ...
}
...
```

Như bạn thấy thì thông tin password vẫn được lưu trong state file ở dạng plain text, không có mã hóa gì hết, nên để bảo mật những thông tin thế này, thì ta nên làm theo phương pháp tiếp theo đây.

### Terraform Backend and Least-privileged access control
Sử dụng biến môi trường đối với các blocks mà không được lưu trong state file, còn với các blocks khác ta không thể ngăn chặn được việc nó được lưu vào trong state file theo dạng plain text, thì thay vào đó ta nên sử dụng Terraform Backend để lưu state file ở một chỗ có thể coi là rất bảo mật, và ta có thể cho phép ai mới được vào đó để đọc state file.

Ví dụ như là ta dùng [S3 Standard Backend ](https://viblo.asia/p/terraform-series-bai-7-terraform-backend-s3-standard-backend-eW65GrP9lDO), lúc này thì state file của ta sẽ được lưu trên AWS S3.

![image.png](https://images.viblo.asia/ebbe6c3a-b692-4421-a6cc-a3d36bae14a2.png)

Và với AWS thì nó đã cung cấp cho ta sẵn một bộ phân quyền cho S3, chỉ có ai ta cho phép thì họ mới có thể vào xem được, nên lúc này thì dữ liệu của ta có được lưu ở dạng plain text cũng không có vấn đề lắm, vì ta kiểm soát được việc ai mới có quyền để xem.

### Encryption at rest
Encryption at rest là cách để ta mã hóa dữ liệu và chuyển nó thành một dạng mà con người không thể đọc hiểu được, và chỉ có người đã mã hóa mới biết nó là gì.

![image.png](https://images.viblo.asia/85b0de26-8f91-4593-8827-719abe44f439.png)
*<div align="center">Image from [Terraform in Action](https://www.manning.com/books/terraform-in-action)</div>*

Hầu hết các loại Terraform Backend đều có Encryption at rest, ví dụ đối với S3 thì nó có cung cấp cho ta khá nhiều phương pháp để mã hóa.

## Kết luận
Vậy là ta đã tìm hiểu xong những vấn đề bảo mật ta có thể gặp phải và cách khắc phục nó, những ý quan trọng là ta nên sử dụng `sensitive` cho các biến secret, và dữ liệu sẽ được lưu trong state file ở dạng plain text, do đó ta nên sử dụng Terraform Backend và ta có thể kiểm soát người nào mới có thể truy cập được state file của ta. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).