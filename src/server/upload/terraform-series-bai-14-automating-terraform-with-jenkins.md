## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã nói về cách sử dụng Terraform với Gitlab CI. Ở bài này chúng ta sẽ tìm hiểu về cách sử dụng Terraform với Jenkins để thiết lập CI/CD cho infrastructure trên AWS.

![image.png](https://images.viblo.asia/d8d6657c-23c2-4172-8ea1-90da848147d7.png)

Jenkins là một công cụ CI/CD rất phổ biến và được nhiều người sử dụng.

## Prepare the environment
Trước khi ta tiến hành viết code cho Terraform và file CI/CD, ta sẽ cần chuẩn bị các thứ sau để Terraform có thể chạy được trong Jenkins.

### Github repository
Ở bài này mình chỉ tập trung hướng dẫn Jenkins xài với Terraform thế nào, nên mình sẽ không hướng dẫn cách cấu hình tự động trigger CI/CD với Jenkins và Github nhé, các bạn có thể đọc ở bài này [How To Set Up Continuous Integration With Git and Jenkins?](https://www.lambdatest.com/blog/how-to-setup-continuous-integration-with-git-jenkins).

Ta tạo một github repository để chứa source code, sau đó ta kết nối Jenkins với repository này để chạy CI/CD. Source code mà mình sẽ dùng ở bài này https://github.com/hoalongnatsu/terraform-series-jenkins-example, các bạn nhớ tạo public repo nha.

Sau đó các bạn tạo project ở trên Jenkins, đặt tên nó là terraform-jenkins, chọn kiểu Pipeline.

![image.png](https://images.viblo.asia/ea4b4d1e-ca16-431b-add2-d6d655ab59e0.png)

Bấm qua tab Pipeline và các bạn điền vào như bên dưới.

![image.png](https://images.viblo.asia/23fa1cd0-208b-4563-ac2a-bfb603c7569d.png)

Sau đó bạn bấm save.

### AWS Credentials
Tiếp theo vì ta xài Terraform với AWS nên ta cần cấu hình AWS Credentials ở trên Jenkins cho Terraform. Các bạn theo hướng dẫn này để tạo IAM user với quyền AdministratorAccess: [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html).

Sau đó các bạn tạo secret key cho IAM user ở trên và quay trở lại Jenkins. Ở menu Jenkins chọn **Manage Jenkins -> Manage Credentials**.

![image.png](https://images.viblo.asia/cc048b13-2a88-4975-8f2d-a7e2695cbeff.png)

Ở mục **Stores scoped to Jenkins** chọn Jenkins.

![image.png](https://images.viblo.asia/c458310f-b628-4dfa-a6e6-5e0dd916784f.png)

Chọn **Global credentials**.

![image.png](https://images.viblo.asia/c7482a91-81b4-40cf-9be0-a261aaa8d76c.png)

Chọn **Add Credentials**, tiếp đó nó sẽ hiện form cho ta thêm Credentials vào.

![image.png](https://images.viblo.asia/b0b4774f-7321-4c04-ad2b-b7a1815d7007.png)

1. Ở trường Kind các bạn chọn Secret text.
2. Trường Scope các bạn để mặc định.
3. Trường Secret các bạn điền vào giá trị của của AWS_ACCESS_KEY_ID.
4. Trường ID là tên của secret, ta đặt tên cho nó là `aws-secret-key-id`.
5. Trường Description các bạn nhập gì cũng được.

Tương tự các bạn tạo một **Secret text** khác để chứa giá trị của AWS_SECRET_ACCESS_KEY và đặt tên cho nó là `aws-secret-access-key`.

![image.png](https://images.viblo.asia/71d26bde-ea7c-4ed2-acbe-8da7492f9815.png)

### S3 Backend
Tiếp theo ta sẽ tạo S3 Backend để lưu trữ terraform state thay vì dùng cache của Jenkins, nếu các bạn muốn hiểu kĩ hơn về S3 Backend thì đọc [Bài 7 - Terraform Backend: S3 Standard Backend](https://viblo.asia/p/terraform-series-bai-7-terraform-backend-s3-standard-backend-eW65GrP9lDO) nhé.

Clone repo sau https://github.com/hoalongnatsu/terraform-series, di chuyển tới `bai-14/s3-backend`, ta chạy các câu sau để tạo S3 Backend.

```
terraform init
terraform apply -auto-approve
```

Khi terraform chạy xong, nó sẽ in ra cho ta các giá trị cần dùng cho S3 Backend.

```
Apply complete! Resources: 10 added, 0 changed, 0 destroyed.

Outputs:

config = {
  "bucket" = "terraform-series-s3-backend"
  "dynamodb_table" = "terraform-series-s3-backend"
  "region" = "us-west-2"
  "role_arn" = "arn:aws:iam::112337013333:role/Terraform-SeriesS3BackendRole"
}
```

Copy lại các giá trị này nhé 😁.

### Integrate Terraform with Jenkins
Để chạy Terraform trong Jenkins thì ta có một vài cách là:
1. Cài Terraform lên trên build agent.
2. Sử dụng Docker container.
3.  Sử dụng Terraform plugin.

Ta sẽ sử dụng cách thứ ba trong bài này, di chuyển tới **Manage Jenkins -> Manage Plugins**, tìm Terraform Plugin và bấm install.

![image.png](https://images.viblo.asia/f9be121c-e82e-45d0-845d-a18d84270530.png)

Sau đó các bạn truy cập **Manage jenkins -> Global Tool Configuration**, kiếm phần Terraform và cấu hình nó như sau.

![image.png](https://images.viblo.asia/89ceff4d-379e-465a-abd6-2ab902fea2d1.png)

Ta đã chuẩn bị hết tất cả những thứ cần thiết, tiếp theo ta sẽ tiến hành viết code Terraform và CI/CD nào.

## Implement CI/CD
Tạo một folder và một file tên là `main.tf`.

```main.tf
terraform {
  backend "s3" {
    bucket         = "terraform-series-s3-backend"
    key            = "terraform-jenkins"
    region         = "us-west-2"
    encrypt        = true
    role_arn       = "arn:aws:iam::<ACCOUNT_ID>:role/Terraform-SeriesS3BackendRole"
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

Để cấu hình S3 Backend thì ta config như sau.

```
terraform {
  backend "s3" {
    bucket         = "terraform-series-s3-backend"
    key            = "terraform-jenkins"
    region         = "us-west-2"
    encrypt        = true
    role_arn       = "arn:aws:iam::<ACCOUNT_ID>:role/Terraform-SeriesS3BackendRole"
    dynamodb_table = "terraform-series-s3-backend"
  }
}
```

Đây là các giá trị được in ra từ  `bai-14/s3-backend` ở trên, các bạn nhớ sửa `<ACCOUNT_ID>` thành account id của các bạn thì nó mới chạy được nhé.

Tiếp theo ta tạo `Jenkinsfile` để định nghĩa các đoạn script mà CI/CD sẽ thực thi.

```Jenkinsfile
pipeline {
  agent any

  tools {
    terraform 'terraform'
  }

  environment {
    AWS_ACCESS_KEY_ID     = credentials('aws-secret-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
  }

  stages {
    stage('Init Provider') {
      steps {
        sh 'terraform init'
      }
    }
    stage('Plan Resources') {
      steps {
        sh 'terraform plan'
      }
    }
    stage('Apply Resources') {
      input {
        message "Do you want to proceed for production deployment?"
      }
      steps {
        sh 'terraform apply -auto-approve'
      }
    }
  }
}
```

Để sử dụng terraform trong pipeline, ta dùng thuộc tính:

```
tools {
  terraform 'terraform'
}
```

Đây là global tool mà ta đã cấu hình ở trên khi cài Terraform Plugin. Và để sử dụng AWS Credentials ta dùng hai thộc tính sau:

```
environment {
  AWS_ACCESS_KEY_ID     = credentials('aws-secret-key-id')
  AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
}
```

Hàm credentials sẽ được dùng để lấy giá trị của **Secret text** mà ta đã tạo ở trên. Các đoạn code còn lại là để chạy Terraform, gồm có bước init, plan và deploy.

Đoạn code phần deploy sẽ khác một chút, nó sẽ có thêm thuộc tính input như sau :

```
input {
  message "Do you want to proceed for production deployment?"
}
```

Ta sử dụng thuộc tính này để làm tính năng manual approve. Ta sẽ không cho CI/CD tự động chạy `terraform apply`, mà ta cần review các resource nào sẽ được tạo ra trước (ở phần plan), nếu ta ok thì ta mới bấm confirm để nó apply.

Oke, giờ ta push code lên github. Sau đó ta truy cập vào Jenkins để trigger CI/CD nào 😁. Đây là giao diện pipeline cũ của Jenkins.

![image.png](https://images.viblo.asia/36c06562-0ae8-47ae-b47b-c24bdb654219.png)

Các bạn bấm vào **Open Blue Ocean** để chuyển qua giao diện mới, vì mình thấy nó đẹp hơn thôi `:)))))`, các bạn có thể dùng giao diện cũ.

![image.png](https://images.viblo.asia/b576d06d-840b-464f-b282-0325b3b54f4c.png)

Đây là giao diện mới của Jenkins, các bạn bấm Run để nó trigger Job nào.

![image.png](https://images.viblo.asia/3b092f31-2f88-437c-a666-59b8efb88f1f.png)

Bấm vào Job để xem logs.

![image.png](https://images.viblo.asia/09359467-e5ff-41b5-b33e-76dee4849d75.png)

Như bạn thấy thì phần `Apply Resources` nó sẽ ở trạng thái chờ, sau khi review phần plan xong thấy ok thì các bạn bấm **Proceed**.

Kiểm tra AWS Console bạn sẽ thấy EC2 đã được tạo ra bằng CI/CD thành công 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong cách sử dụng Terraform với Jenkins. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).