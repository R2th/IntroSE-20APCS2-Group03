## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã tìm hiểu về Remote Backend với Terraform Cloud. Ở bài này chúng ta sẽ tìm hiểu cách sử dụng Terraform Cloud để xây dựng CI/CD cho infrastructure của ta. Sau đó chúng ta sẽ tìm hiểu một thuộc tính của Terraform mà giúp ta thực hiện Zero-downtime deployments.

![image.png](https://images.viblo.asia/00dcdc5d-ae45-48ad-83a6-2bb6b4f197ee.png)

## CI/CD with Terraform Cloud
Như ta đã nói ở bài trước, khi ta tạo một workspaces trên Terraform Cloud thì sẽ có ba cách sử dụng là:
+ Version control system workflow.
+ CLI-driven workflow.
+ API-driven workflow.

Với CLI-driven workflow giúp ta trong việc xây dựng Remote Backend, còn Version control system workflow (VCS) sẽ giúp ta trong việc xây dựng luồng CI/CD.

Với Terraform Cloud VCS, việc xây dựng CI/CD rất dễ dàng, tất cả những gì chúng ta cần làm là tạo một github repository, kết nối repository đó tới Terraform Cloud, sau đó ta chỉ việc đẩy code lên github và Terraform Cloud sẽ thực hiện toàn bộ luồng CI/CD cho ta.

### Create github repository

Oke, trước tiên các bạn tạo một repository trên github, đây là repository của mình cho ví dụ này https://github.com/hoalongnatsu/terraform-cloud-vcs-example. Sau đó đăng nhập vào Terraform Cloud, cách đăng ký tài khoản và cấu hình aws credentials các bạn xem ở [bài trước](https://viblo.asia/p/terraform-series-bai-8-terraform-backend-remote-backend-with-terraform-cloud-vyDZOR0QKwj), màn hình sau khi đăng nhập vào Terraform Cloud.

![image.png](https://images.viblo.asia/3369df97-eacb-4f74-9368-14511866bf94.png)

### Create VCS Workspace

Ở trang Workspaces ta bấm **New Workspaces**, sau đó chọn **Version control workflow**.

![image.png](https://images.viblo.asia/3b4d1d28-c33e-4b47-bc86-1b823693d326.png)

Bước tiếp theo, chỗ **Connect to a version control provider**, các bạn bấm vào icon Github.

![image.png](https://images.viblo.asia/c6017ba1-299b-4543-b1a2-ccc21561a312.png)

Sau khi bạn bấm vào icon Github và kết nối tới github của bạn, nó sẽ dẫn ta qua bước thứ ba là chọn repository, các bạn chọn repository mà các bạn tạo cho ví dụ này, repo của mình tên là `terraform-cloud-vcs-example`.

![image.png](https://images.viblo.asia/8569c083-d5e1-4275-9c76-753ef499593e.png)

Sau đó nó sẽ dẫn ta qua bước cuối cùng, các bạn điền **Workspace Name** vào và bấm tạo workspace.

![image.png](https://images.viblo.asia/376fa621-bc0b-4f24-b312-f8957b06786d.png)

Đợi một chút để terraform cloud setup và bạn sẽ thấy workspace của ta hiện chữ **Configuration uploaded successfully** .

![image.png](https://images.viblo.asia/3ee3b56e-6a86-4ff5-ab7a-48e13257570b.png)

Oke, vậy là ta đã tạo workspace xong, bây giờ ta chỉ cần viết code và push nó lên github, Terraform Cloud VCS sẽ chạy và tạo infrastructure cho ta.

### Implement CI/CD
Các bạn thêm 3 file sau vào repo.

```versions.tf
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
```

```vars.tf
variable "region" {
  type = string
  default = "us-west-2"
}
```

```main.tf
provider "aws" {
  region = var.region
}

data "aws_ami" "ami" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

resource "aws_instance" "ansible_server" {
  ami           = data.aws_ami.ami.id
  instance_type = "t3.micro"
}
```

Commit code và push lên github.

```
git add .
git commit -m "init code"
git push
```

Sau đó ta quay lại UI của Terraform Cloud, các bạn bấm vào Action chọn Start new run.

![image.png](https://images.viblo.asia/7adab5e5-5cbb-4c9c-a62f-5cc5536b4d6a.png)

Ta sẽ thấy Terraform Cloud in ra cho ta plan step, thay vì chạy câu lệnh CLI và thấy tất cả resource của ta in ta trên terminal. Thì Terraform Cloud sẽ in resource của ta trên UI, rất trực quan và dễ hiểu.

![image.png](https://images.viblo.asia/b655b130-4ee3-4bfa-8c51-a3ac55e8d56b.png)

Kéo xuống phía dưới ta sẽ thấy có chỗ để chúng ta bấm apply. **Ta có thể cấu hình bước này là auto luôn, nhưng đối với môi trường production ta không nên cho phép nó auto apply.** Các bạn bấm Confirm & Apply.

![image.png](https://images.viblo.asia/5ba83814-8961-4bdd-a5ef-8e061d0d9b1a.png)

Nhập vào comment, và bấm Confirm Plan.
 
![image.png](https://images.viblo.asia/afc50914-34bc-478f-8f46-0717512f1393.png)

Terraform Cloud sẽ trigger quá trình apply.

![image.png](https://images.viblo.asia/5b579229-199c-4796-9a35-a508bbe06cd3.png)

Đợi nó chạy xong.

![image.png](https://images.viblo.asia/3d531631-f943-4c60-bca6-d67cb3cadaf5.png)

Lúc này các bạn lên AWS Console thì sẽ thấy EC2 của ta đã được tạo.

### Update resource
Bây giờ ta sẽ cập nhật lại instance_type của EC2 và push code lên lại github.

```main.tf
resource "aws_instance" "ansible_server" {
  ami           = data.aws_ami.ami.id
  instance_type = "t3.small" // t3.micro -> t3.small
}
```

```
git commit -am "update instance type"
git push
```

Lúc này bạn sẽ thấy Terraform Cloud tự động phát hiện code của ta đã thay đổi và trigger lại plan step mới.

![image.png](https://images.viblo.asia/96ec34ad-7ca6-4bcf-b6eb-c0825e263bdd.png)

Các bạn bấm Confirm & Apply.

![image.png](https://images.viblo.asia/f851849d-c877-4923-b32a-60c338f96da7.png)

Sau khi nó chạy xong ta sẽ thấy EC2 của ta được update lại với instance type mới.

### Destroy resource
Khi xài Terraform Cloud để destroy cũng khá đơn giản. Các bạn bấm vào Settings, chọn **Destruction and Deletion**.

![image.png](https://images.viblo.asia/e6b9a580-3205-4135-beea-67bc92380e9f.png)

Sau đó ta chọn **Delete from Terraform Cloud**.

![image.png](https://images.viblo.asia/95233dde-db7d-4d2f-8803-a2210cb28fb3.png)

Nhập vào tên và bấn delete.

![image.png](https://images.viblo.asia/79a69143-9f85-4146-bb7a-1392de187063.png)

Nếu các bạn bấm Delete workspace thì resource của ta đã bị xóa đi. **Nhưng lúc này các bạn chưa xóa vội nhé, ta sẽ để nó lại để làm ví dụ tiếp theo.**

## Zero-downtime deployment
Đối với EC2 của ta, khi ta thay đổi giá trị ami.

```
resource "aws_instance" "ansible_server" {
  ami           = data.aws_ami.ami.id // change here
  instance_type = "t3.small"
}
```

Vì ami của EC2 là một force-new attributes (ami, user_data), nên khi ta tiến hành quá trình apply thì resource EC2 hiện tại sẽ bị destroy và một thằng mới sẽ được tạo ra. Đây là hành động mặc định của Terraform đối với các resource mà có force-new attributes bị thay đổi. Điều này có thể dẫn tới hệ thống của ta bị downtime trong một khoảng thời gian dài.

![image.png](https://images.viblo.asia/57153dbe-1015-4c3a-bb88-88d91c93d8eb.png)

Để tránh downtime trong trường hợp này, terraform cung cấp cho một meta argument tên là `create_before_destroy`.

### Use create_before_destroy
Đây là một meta argument giúp ta giải quyết được vấn đề zero-downtime deployment khi ta thay đổi force-new attributes của một resource.

Thay vì Terraform sẽ hành động như mặc định là xóa resource trước rồi tạo resource mới sau, thì Terraform sẽ hành động ngược lại là sẽ tạo resource trước, kiểm tra resource đó được tạo xong rồi thì nó mới tiến hành xóa resource cũ.

![](https://images.viblo.asia/00dcdc5d-ae45-48ad-83a6-2bb6b4f197ee.png)

Ta sử dụng thuộc tính create_before_destroy như sau, cập nhật lại `main.tf`

```main.tf
resource "aws_instance" "ansible_server" {
  ami           = data.aws_ami.ami.id
  instance_type = "t3.small"

  lifecycle {
    create_before_destroy = true
  }
}
```

Ta thêm một block là lifecycle, trong đó ta sẽ khai báo thuộc tính create_before_destroy là true. Ok bây giờ bạn commit code và đẩy lên github, confirm cho Terraform Cloud apply, quan sát trên AWS Console chỗ EC2 thì ta sẽ thấy lúc này một con EC2 mới sẽ được tạo ra trước sau đó con cũ mới bị xóa đi.

### Considering when use create_before_destroy
Thuộc tính create_before_destroy có thể rất thuận tiện, nhưng ta cần nên lưu ý một điều là không phải lúc nào ta cũng có thể sử dụng thuộc tính này cho resource được, vì sẽ có một vài resource bị conflict.

Ví dụ như là đối với AWS thì S3 bucket là unique tên toàn bộ hệ thống của AWS, nên nếu ta dùng thuộc tính create_before_destroy với S3 thì nó sẽ bị lỗi, vì lúc này S3 bucket mới sẽ được tạo ra trước, nhưng bucket name của nó sẽ giống y như thằng cũ nên ta sẽ gặp lỗi ngay.

Vì lý do trên nên ta cần xem xét cẩn thận khi dùng create_before_destroy, ta phải xác định rõ resource nào ta có thể dùng create_before_destroy cho nó còn resource nào thì không thể dùng.

### No zero-downtime deployment
Tuy gọi là zero-downtime deployment, nhưng không phải lúc nào ta cũng có thể thực hiện việc này hoàn toàn được. Vì zero-downtime deployment là một vấn đề cần rất nhiều thứ để giải quyết và chỉ có thể áp dụng được với một số resource, như là cập nhật lại các resource mà chứa application, chứ không phải lúc nào ta cũng có thể áp dụng được zero-downtime deployment cho toàn bộ resource trong hệ thống của ta được.

Ví dụ đơn giản nhất là dịch vụ database của AWS là RDS, khi ta thay đổi instance_type của nó thì ta không thể sử dụng thuộc tính create_before_destroy để thực hiện zero-downtime deployment được, vì lúc này RDS của ta nó đâu có bị xóa và tạo lại đâu, nó chỉ cập nhật lại instance_type và bị downtime mà thôi.

Tất nhiên là cũng sẽ có cách để triển khai zero-downtime deployment cho database được, nhưng quá trình thực hiện sẽ rất phức tạp và cần kết hợp nhiều công cụ khác nhau chứ không thể chỉ dùng Terraform được.

Ở bài tiếp theo mình sẽ nói về một khái niệm mà có thể giúp ta thực hiện zero-downtime deployment cho database được, là blue/green deployment. Và cũng sẽ làm một ví dụ về blue/green deployment cho autoscaling group, đây là một trong những cách để giảm thiểu thời gian downtime cho hệ thống.

![](https://images.viblo.asia/dd438d8a-1c1c-4916-8ee1-b18c2b5a4b36.jpg)

## Kết luận
Vậy là ta đã tìm hiểu xong về cách thực hiện CI/CD với Terraform Cloud, và một cách đơn giản để thực hiện zero-downtime deployment cho resource của ta. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo ta sẽ tìm hiểu về **Blue/Green Deployment**.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).