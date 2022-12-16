## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã nói về S3 Standard Backend. Ở bài này chúng ta sẽ tìm hiểu về loại Backend tiếp theo, là Remote Backend. Chúng ta sẽ sử dụng Terraform Cloud để làm remote backend.

![image.png](https://images.viblo.asia/791c2fe0-c917-4d5d-bdc7-0ec741135e1a.png)
*<div align="center">Terraform Cloud - image from [Hashicorp](https://www.hashicorp.com/)</div>*

## Implement Terraform Cloud Remote Backend
Các bạn có thể đọc [bài 6](https://viblo.asia/p/terraform-series-bai-6-terraform-backend-understand-backend-924lJRr6lPM) để hiểu rõ hơn về ưu và nhược điểm của remote backend.

Để sử dụng remote backend, ta cần phải tạo tài khoản và login vào trong Terraform Cloud.

### Terraform Cloud
Terraform Cloud là một dịch vụ của HashiCorp, nó sẽ giúp ta trong việc quản lý terraform resource một cách dễ dàng và bảo mật hơn. Ngoài ra Terraform Cloud còn giúp ta trong việc xây dựng CI/CD cho infrastructure provisioning một cách rất đơn giản.

![image.png](https://images.viblo.asia/203d58fb-d2ba-4ba2-93b6-2765797bd0f2.png)
*<div align="center">Terraform Cloud - image from [Amazic](https://amazic.com/terraform-cloud-operator-for-kubernetes-is-now-ga/)</div>*

Terraform Cloud có ba cách sử dụng là:
+ Version control workflow.
+ CLI-driven workflow.
+ API-driven workflow.

Ta sẽ sử dụng CLI-driven workflow cho remote backend, Version control workflow cho CI/CD.

### Create a account
Đầu tiên để làm việc với Terraform Cloud ta phải tạo tài khoản trước, các bạn truy cập vào link này https://app.terraform.io/signup/account để tạo tài khoản.

![image.png](https://images.viblo.asia/04d81969-5784-4845-a9b8-fd3d75061b93.png)

Sau đó các bạn đăng nhập vào Terraform Cloud thì các bạn sẽ thấy UI như sau, chúng ta chọn **Start from scratch**.

![image.png](https://images.viblo.asia/374830f9-fdc1-413c-983d-4208ff628f84.png)

Bước tiếp theo nó sẽ bắt bạn nhập thông tin về organization, các bạn nhập gì cũng được. Sau đó bấm tạo, khi tạo xong bạn sẽ thấy ta có UI như sau.

![image.png](https://images.viblo.asia/b72f221e-f1ad-40b6-b825-7ad348f3025f.png)

Oke, vậy là ta đã chuẩn bị đầy đủ, bước tiếp theo ta sẽ làm việc với remote backend.

### Use Remote Backend
Để sử dụng được remote backend, ở UI Workspaces bạn bấm vào tạo Workspaces, ở trang tiếp theo các bạn chọn CLI-driven workflow.

![image.png](https://images.viblo.asia/f1484fdb-2c60-4f77-bf66-0e5a7844c7fc.png)

Sau đó các bạn nhập vào tên của Workspace và bấm tạo.

![image.png](https://images.viblo.asia/7cfc26e4-b422-4317-a406-0c28e28d53cb.png)

Sau khi tạo xong thì workspace của ta đã sẵn sàng để sử dụng.

![image.png](https://images.viblo.asia/681480be-8eeb-4fc6-b8f0-d63f29340145.png)

Bạn sẽ thấy status của workspace là Waiting for configuration, tiếp theo ta sẽ cấu hình để terraform local của ta có thể sử dụng Remote Backend này. Kéo xuống xíu thì bạn sẽ thấy có phần hướng dẫn để ta cấu hình và sử dụng.

![image.png](https://images.viblo.asia/4779f4a9-f978-4389-9aa7-6f0cd5e1e8ad.png)

Các bạn có thể làm theo nó cho nhanh hoặc làm theo hướng dẫn của mình.

Đầu tiên ta tạo một folder và file `main.tf` với đoạn code.

```main.tf
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

Để sử dụng remote backend ta cần thêm config như sau vào file terraform của ta.

```
terraform {
  cloud {
    organization = <organization-name>

    workspaces {
      name = <workspace-name>
    }
  }
}
```
 Ta sẽ xài **cloud** block với hai thuộc tính là organization và workspaces. Cập nhật file `main.tf` với config của workspace ta vừa tạo ở trên. 
 
>  Sử dụng **cloud** block với terraform version 1.1 trở lên, đối với version nhỏ hơn 1.1 ta xài **remote** block.
 
 ```main.tf
 terraform {
  cloud {
    organization = "HPI"

    workspaces {
      name = "terraform-series-remote-backend"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

...
 ```

Oke, sau khi viết code xong, ta sẽ chạy câu lệnh terraform login để ta đăng nhập vào remote backend của ta. Chạy `terraform login` nó sẽ mở một UI như sau cho ta.

![image.png](https://images.viblo.asia/efc4121c-ed58-4c6d-9a4e-fb7f0ed0d082.png)

Bấm Create API token.

![image.png](https://images.viblo.asia/117a6d38-4a28-42ec-8388-4c33641fbf01.png)

Nhớ copy nhé. Sau đó bấm Done, quay lại terminal dán giá trị ta vừa copy vào.

![image.png](https://images.viblo.asia/ee55bc47-af3f-40d0-bf96-b1a3e5070aa4.png)

Nếu giá trị đúng thì terraform local của ta đã login vào Terraform Cloud thành công.

![image.png](https://images.viblo.asia/3ef6706e-c6b2-482e-a921-c34f152f0e87.png)

Sau khi login xong, ta chạy câu lệnh init.

```
$ terraform init

Initializing Terraform Cloud...

Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v4.8.0...
- Installed hashicorp/aws v4.8.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform Cloud has been successfully initialized!

You may now begin working with Terraform Cloud. Try running "terraform plan" to
see any changes that are required for your infrastructure.

If you ever set or change modules or Terraform Settings, run "terraform init"
again to reinitialize your working directory.
```

Vậy là ta đã config remote backend thành công 😁. Bây giờ bạn chạy câu lệnh `terraform plan` thử.

```
$ terraform plan

Running plan in Terraform Cloud. Output will stream here. Pressing Ctrl-C
will stop streaming the logs, but will not stop the plan running remotely.

Preparing the remote plan...

To view this run in a browser, visit:
https://app.terraform.io/app/HPI/terraform-series-remote-backend/runs/run-7R7giQVT4TqnaAzL

Waiting for the plan to start...

Terraform v1.1.7
on linux_amd64
Configuring remote state backend...
Initializing Terraform configuration...
╷
│ Error: error configuring Terraform AWS Provider: no valid credential sources for Terraform AWS Provider found.
```

Bạn sẽ thấy nó báo lỗi, vì bây giờ khi ta sử dụng remote backend thì toàn bộ config liên quan tới credential như là secret key và access key của AWS ta đều phải config ở trên remote backend. Đây là một điểm mạnh khi ta xài remote backend, vì toàn bộ config liên quan tới credential ta đều setting ở một chỗ, không cần phải lưu credential dưới máy của ta => tăng tính bảo mật.

Để cấu hình credential ta bấm quá menu **Settings** chọn **Variable sets**.

![image.png](https://images.viblo.asia/1c32d435-c961-452f-8859-f0c1db436c5e.png)

Bấm tạo. Đặt tên variable sets là AWS Credentials, chọn **Apply to all workspaces in this organization**.

![image.png](https://images.viblo.asia/a4143f75-0294-424d-8960-21a18757c05e.png)

Tiếp theo ta tạo biến để lưu hai giá trị `AWS_ACCESS_KEY_ID` và `AWS_SECRET_ACCESS_KEY`. Bấm Add variable cho AWS_ACCESS_KEY_ID, chọn option là Environment variable, điền vào giá trị, **nhớ check biến đó là Sensitive**.

![image.png](https://images.viblo.asia/74486656-e4ab-482b-acbf-394c593d6c66.png)

Làm tương tự cho AWS_SECRET_ACCESS_KEY.

![image.png](https://images.viblo.asia/f17d3538-4279-4e58-9992-9a01321bdef6.png)

Bấm save.

![image.png](https://images.viblo.asia/863dab17-7095-4ef9-9190-db5b48c6995e.png)

Ok, giờ ta chạy lại câu lệnh `terraform plan` ta sẽ thấy nó chạy thành công.

```
$ terraform plan

Running plan in Terraform Cloud. Output will stream here. Pressing Ctrl-C
will stop streaming the logs, but will not stop the plan running remotely.

Preparing the remote plan...
...

Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + public_ip = (known after apply)
```

Giờ ta chạy câu lệnh apply nào.

```
$ terraform apply

...
aws_instance.server: Creating...
aws_instance.server: Still creating... [10s elapsed]
aws_instance.server: Creation complete after 12s [id=i-0839b6f71c5749de4]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

public_ip = "34.220.170.155"
```

Khi câu lệnh apply chạy xong thì lúc này state file của ta sẽ được lưu ở remote, bạn có thể kiểm tra ở trên terraform cloud, bấm qua tab **State**.

![image.png](https://images.viblo.asia/1ca34b38-723e-4c02-88f0-b9c10853baa5.png)

Bấm vào **Triggered via CLI** ta sẽ thấy giá trị của state file. Ngoài ra terraform cloud còn hiển thị các resource hiện tại đang có cho ta, giúp ta có cái nhìn tốt hơn về các resource hiện tại. Bấm qua tab **Overview** kéo xuống phía dưới.

![image.png](https://images.viblo.asia/45fd7ac8-a895-472e-848b-d311df769d73.png)

**Quan trọng:** lưu ý một điều là khi ta chạy các câu lệnh của terraform với remote backend, thì terraform runtime sẽ không chạy ở máy của ta mà sẽ chạy ở remote server, và nó sẽ stream kết quả về máy local của ta. Do đó, khi bạn đang chạy mà bạn có bấm Ctrl + C để tắt quá trình chạy thì nó chỉ tắt stream thôi, còn runtime ở remote server của ta vẫn chạy bình thường.

![](https://images.viblo.asia/f58313a7-f219-4afd-a731-b4d170b1f237.jpg)

## Kết luận
Vậy là ta đã tìm hiểu xong về cách sử dụng Terraform Remote Backend, sử dụng remote backend giúp ta tập trung toàn bộ cấu hình credentials về chung một chỗ, giúp team có thể làm việc một cách hiệu quả hơn và đảm bảo security. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo ta sẽ tìm hiểu về **CI/CD với Terraform Cloud**.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).