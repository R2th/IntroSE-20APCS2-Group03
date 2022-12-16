## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã tìm hiểu về vấn đề security trong Terraform. Ở bài này chúng ta sẽ tiếp tục nói về vấn đề security, và chúng ta sẽ tìm hiểu về một công cụ là **Vault**, đây là thằng sẽ giúp ta quản lý các thông tin nhạy cảm một cách dễ dàng nhất.

![image.png](https://images.viblo.asia/88556c37-e456-4b6c-ace9-916d1f5a0083.png)

Khi ta sử dụng Terraform với AWS thì vấn đề quản lý  AWS Access Credentials khá lằng nhằng, với mỗi team khác nhau ta cần phải tạo cho họ một IAM role với quyền tương ứng, ta sẽ xem Vault giúp ta giải quyết vấn đề đó như thế nào?

## Vault
Vault là một công cụ dùng để quản lý Secret, nó được phát triển bởi công ty Hashicorp, Terraform mà ta đang học cũng được phát triển bởi công ty này.

![image.png](https://images.viblo.asia/a4828009-fbf9-48b2-b9f9-6d001f231390.png)

Việc quản lý Secret trong những năm gần đây đang trở thành chuẩn của nghành công nghệ, và ở thời điểm mình viết bài thì Vault đang là công cụ đứng ở top đầu của lĩnh vực này. Vault không chỉ được sử dụng trong Terraform mà còn rất nhiều chỗ khác, ví dụ như là Kubernetes.

Trong bài này mình sẽ hướng dẫn các bạn cách xài Vault đơn giản. Mọi người xem cách cài đặt Vault ở đây [Install Vault](https://learn.hashicorp.com/tutorials/vault/getting-started-install).

Sau khi cài xong các bạn chạy câu lệnh sau để chạy Vault.

```bash
vault server -dev -dev-root-token-id="education"
```

```
==> Vault server configuration:

             Api Address: http://127.0.0.1:8200
                     Cgo: disabled
         Cluster Address: https://127.0.0.1:8201
              Go Version: go1.17.12
              Listener 1: tcp (addr: "127.0.0.1:8200", cluster address: "127.0.0.1:8201", max_request_duration: "1m30s", max_request_size: "33554432", tls: "disabled")
               Log Level: info
                   Mlock: supported: true, enabled: false
           Recovery Mode: false
                 Storage: inmem
                 Version: Vault v1.11.2, built 2022-07-29T09:48:47Z
             Version Sha: 3a8aa12eba357ed2de3192b15c99c717afdeb2b5

==> Vault server started! Log data will stream in below:
...
```

Truy cập địa chỉ `http://127.0.0.1:8200`, ta sẽ thấy trang đăng nhập, chọn Method là Token và nhập giá trị `education`.

![image.png](https://images.viblo.asia/b51fda1b-a476-4269-a8ab-0562346db267.png)

Sau đó nó sẽ dẫn ta qua trang UI để quản lý Secret.

![](https://images.viblo.asia/0a4625a4-802f-4a07-94d7-34091fee523d.PNG)

### Config  AWS Access Credentials for Vault
Vault sẽ giúp ta giải quyết vấn đề phải tạo nhiều IAM user khác nhau cho mỗi team, bằng cách ta chỉ cần cấu hình cho Vault một *AWS Access Credentials* mà có toàn bộ quyền trên AWS, sau đó ta sẽ tạo role tương ứng ở trên Vault.

Khi ta sử dụng Terraform thì ta chỉ cần chỉ định role tương ứng trên Vault và nó sẽ tạo ra cho ta một *Credentials* tạm thời để ta tạo hạ tầng trên AWS.

Ta sẽ làm thực hành để hiểu hơn, ở trang UI của Vault các bạn bấm vào nút **Enable new engine**, mục Cloud các bạn chọn AWS.

![](https://images.viblo.asia/b1d58de7-3559-460b-9383-62f1139edded.PNG)

 Bấm Next và chọn Enable Engine.

![](https://images.viblo.asia/35a54bb8-f816-43fe-9681-78f40288be7a.PNG)

Ta sẽ thấy UI như sau.

![](https://images.viblo.asia/fa160aca-c6c9-4b39-bf75-b4217a854278.PNG)

Bấm qua mục **Configuration** và chọn nút **Configuration >**.

![](https://images.viblo.asia/e788c37c-173d-42a1-b98d-a06146ef48c7.PNG)

Sau đó ta nhập vào Access key và Secret key của ta, mục Lease là thời gian sống của *Credentials*  (mặc định là 30 giây).

![](https://images.viblo.asia/308c0903-2821-444f-80f8-2dd567bb1ada.PNG)

Bấm Save, nó sẽ quay lại UI cấu hình AWS, ta bấm nút **Create role +** để tạo role.

![](https://images.viblo.asia/94b3eca1-a408-4dbc-958a-86f2ca3951f3.PNG)

Bạn tạo role như bên dưới.

![](https://images.viblo.asia/e5f570cd-9d04-4c32-8a1e-acc98dbc9387.PNG)

Phần **Role name** bạn nhập gì cũng được, mục **Policy document** ta sẽ nhập vào theo cú pháp của  *IAM Policy*, khi ta sử dụng Role thì Vault sẽ tạo ra cho ta *Credentials* tạm thời với quyền tương ứng ta khai báo trong phần Policy document này.

Bấm save ta sẽ thấy role như sau.

![](https://images.viblo.asia/28f691f0-d47a-4284-ad37-7f618e8363a0.PNG)

Ok, tiếp theo ta sẽ xem cách Terraform xài Vault Role này như thế nào?

## Terraform with Vault
Để xử dụng Vault trong Terraform, ta sẽ dùng vault provider. Tạo một file tên là `main.tf`.

```main.tf
provider "vault" {}
```

Để cấu hình cho vault, ta chạy hai câu lệnh sau.

```
export VAULT_ADDR='http://127.0.0.1:8200' && export VAULT_TOKEN=education
```

Để lấy được Vault Role, ta dùng data source `vault_aws_access_credentials`.

```main.tf
provider "vault" {}

data "vault_aws_access_credentials" "creds" {
  backend = "aws"
  role    = "ec2-role"
}
```

Thuộc tính backend ta điền vào là `aws`, thuộc tính role ta điền vào role mà ta muốn sử dụng, sau đó ta sẽ nhúng *Credentials* này vào aws provider.

```main.tf
provider "vault" {}

data "vault_aws_access_credentials" "creds" {
  backend = "aws"
  role    = "ec2-role"
}

provider "aws" {
  region     = "us-west-2"
  access_key = data.vault_aws_access_credentials.creds.access_key
  secret_key = data.vault_aws_access_credentials.creds.secret_key
}
```

Chạy câu lệnh init.

```
terraform init
```

Cập nhật lại `main.tf` thêm vào đoạn code tạo EC2 trên AWS.

```main.tf
provider "vault" {}

data "vault_aws_access_credentials" "creds" {
  backend = "aws"
  role    = "ec2-role"
}

provider "aws" {
  region     = "us-west-2"
  access_key = data.vault_aws_access_credentials.creds.access_key
  secret_key = data.vault_aws_access_credentials.creds.secret_key
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-trusty-14.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

# Create AWS EC2 Instance
resource "aws_instance" "main" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.nano"
}
```

Chạy apply thử xem nó có tạo được EC2 không nào.

```
terraform apply -auto-approve
```

```
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated
with the following symbols:
  + create
  
...

Plan: 1 to add, 0 to change, 0 to destroy.
aws_instance.main: Creating...
aws_instance.main: Still creating... [10s elapsed]
aws_instance.main: Still creating... [20s elapsed]
aws_instance.main: Creation complete after 25s [id=i-0dcce3da9ca4ed7eb]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Oke, vậy là ta đã sử dụng được Vault Role trong Terraform thành công 😁. **Nhớ destroy resource đi nhé.**

## Kết luận
Vậy là ta đã biết được cách sử dụng Terraform với Vault. Đây chỉ là một ví dụ đơn giản, nếu các bạn muốn tìm hiểu thêm về Vault thì mình giới thiệu các bạn cuốn sách này [Running HashiCorp Vault in Production](https://www.amazon.com/Running-HashiCorp-Vault-Production-McTeer-ebook/dp/B08JJLGMZ3). Biết sử dụng được một công cụ Secret Manager cũng là một kỹ năng mà DevOps nên có. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).