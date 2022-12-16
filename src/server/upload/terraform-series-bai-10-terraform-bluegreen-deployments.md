## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta tìm hiểu về Zero-downtime deployments, nhưng ta chỉ mới tìm hiểu cách thực hiện ZDD cho một resource đơn giản là EC2. Ở bài này ta sẽ tìm hiểu cách thực hiện ZDD cho một resource phức tạp hơn là Autoscaling Group bằng phương pháp Blue/Green deployments.

![](https://images.viblo.asia/66d5204c-526a-4766-a4a0-71a2d778406e.jpg)

Bài này mình tham khảo từ cuốn Terraform in Action, các bạn nên đọc thử cuốn này vì nó rất hay 😁.

## Blue/Green deployments
Blue/Green deployments là một phương pháp giúp ta thực hiện Zero-downtime khi triển khai một version mới của ứng dụng. Đây là phương pháp cũ nhất nhưng lại được sử dụng nhiều nhất, các phương pháp cải tiến hơn của Blue/Green deployments là Rolling Blue/Green hoặc Canary deployments.

Để thực hiện Blue/Green deployment thì ứng dụng của ta sẽ có hai môi trường production, một thằng sẽ được gọi là Blue và một thằng được gọi là Green, chỉ một trong hai thằng này sẽ ở trạng thái **live** để nhận request của user, còn một thằng con lại sẽ ở trạng thái **idle** (không làm việc).

Khi ta muốn triển khai version mới của ứng dụng, ta sẽ triển khai trên môi trường đang ở trạng thái idle (có thể là Blue hoặc Green), sau đó ta kiểm ta mọi thứ trên môi trường idle đã hoạt động ổn hết thì ta chuyển router từ môi trường live sang idle.

![](https://images.viblo.asia/280fc352-93a7-4af7-b86e-6271943d1c76.jpg)

### Blue/Green deployments with Autoscaling Group
Trong bài này chúng ta sẽ làm ví dụ Blue/Green deployments cho resource Autoscaling Group trên AWS. Kiến trúc của ta sẽ bao gồm:
+ Virtual Private Cloud (VPC).
+ Application Load Balancer (ALB).
+ 2 Autoscaling Group (Blue/Green).

![](https://images.viblo.asia/dd438d8a-1c1c-4916-8ee1-b18c2b5a4b36.jpg)

### Base resource and Application resource
Khi thực hiện Blue/Green deployments, việc đầu tiên ta cần làm là xác định resource nào là base resource và resource nào là application resource. Với base resource là các thành phần được sử dụng chung và sẽ không thay đổi nhiều trong quá trình deploy, còn application resource có thể thay đổi nhiều trong quá trình deploy, thậm chí có thể xóa nó luôn và tạo lại thằng mới mà không ảnh hưởng gì tới hệ thống của ta.

Ví dụ với mô hình Autoscaling Group ở trên thì các thành phần thuộc base resource là VPC và ALB, còn application resource là Autoscaling Group. Khi ta triển khai một version mới của ứng dụng thì chắc chắn là VPC của ta sẽ giữ nguyên không thay đổi gì (bởi vì chả có lý do gì mà ta cần phải tạo mới VPC để deploy version mới của ứng dụng cả), còn ALB thì có thể thay đổi một chút. Còn Autoscaling Group thì ta có thể xóa thằng cũ và tạo lại thằng mới cũng được.

> Đối với các resource dùng để lưu dữ liệu như là database, thì để chuyển đổi database giữa các môi trường là một vấn đề rất phức tạp nên thông thường ta sẽ xếp database vào trong base resource.

![image.png](https://images.viblo.asia/3656e57e-6da1-4248-bf23-1b818b26597a.png)

Và khi deploy ta chỉ cần tác động tới application resource, sau đó ta sẽ tiến hành thực hiện chuyển traffic của application resource từ môi trường live sang idle, có thể là tự động hoặc làm bằng tay.

### Implement
Ta sẽ có một Autoscaling Group cho version 1.0, và ta gán cho nó là Green. Sau đó ứng dụng của ta sẽ có version mới là 2.0, ta sẽ tạo thêm một Autoscaling Group cho version 2.0 và gán cho nó là Blue. Hiện tại thì Green sẽ là môi trường live, còn Blue sẽ là môi trường idle.

Và sau đó ta sẽ tiến hành chuyển router cho traffic từ Green sang Blue bằng tay (việc chuyển router như vậy được gọi là **cutover**). Tạo một file tên là `main.tf` với đoạn code sau.

```main.tf
provider "aws" {
  region  = "us-west-2"
}

variable "production" {
  default = "green"
}

module "base" {
  source     = "terraform-in-action/aws/bluegreen//modules/base"
  production = var.production
}

module "green" {
  source      = "terraform-in-action/aws/bluegreen//modules/autoscaling"
  app_version = "v1.0"
  label       = "green"
  base        = module.base
}

output "lb_dns_name" {
  value = module.base.lb_dns_name
}
```

Ở trên ta sẽ sử dụng module là `terraform-in-action/aws/bluegreen` cho ví dụ này, trong module trên sẽ có base resource là VPC với ALB từ submodule `modules/autoscaling`, còn application resource là Autoscaling Group từ submodule `modules/autoscaling`.

Ứng dụng version 1.0 của ta được deploy bằng submodule `terraform-in-action/aws/bluegreen//modules/autoscaling` và ta đặt tên cho nó là green.

Oke, giờ tiến hành deploy version 1.0 nào.

```
$ terraform apply -auto-approve
...
Plan: 34 to add, 0 to change, 0 to destroy.
...
Apply complete! Resources: 34 added, 0 changed, 0 destroyed.

Outputs:

lb_dns_name = "terraforminaction-ovgcpc-lb-909615962.us-west-2.elb.amazonaws.com"
```

Đợi khi terraform chạy xong thì nó sẽ in ra cho ta domain của ALB, ta truy cập vào domain đó.

![image.png](https://images.viblo.asia/a4f199c3-f2ab-4599-b43e-75e5da694d09.png)

Tiếp theo ta sẽ deploy version 2.0 của ứng dụng và đặt tên cho nó là blue.

```main.tf
...
module "green" {
  source      = "terraform-in-action/aws/bluegreen//modules/autoscaling"
  app_version = "v1.0"
  label       = "green"
  base        = module.base
}

module "blue" {
  source      = "terraform-in-action/aws/bluegreen//modules/autoscaling"
  app_version = "v2.0"
  label       = "blue"
  base        = module.base
}
...
```

Chạy câu lệnh.

```
$ terraform apply -auto-approve
...
Plan: 5 to add, 0 to change, 0 to destroy.
...
Apply complete! Resources: 5 added, 0 changed, 0 destroyed.

Outputs:

lb_dns_name = "terraforminaction-ovgcpc-lb-909615962.us-west-2.elb.amazonaws.com"
```

Sau khi ta kiểm tra mọi thứ ở môi trường blue đều ổn hết, ta tiến hành đổi router của traffic vào ứng dụng.

### Blue/Green cutover
Các bạn làm việc này bằng một cách đơn giản là thay đổi giá trị của biến `production` trong file `main.tf`.

Chuyển giá trị từ green.

```main.tf
...
variable "production" {
  default = "green"
}
...
```

Thành blue.

```main.tf
provider "aws" {
  region  = "us-west-2"
}

variable "production" {
  default = "blue" // change here
}

module "base" {
  source     = "terraform-in-action/aws/bluegreen//modules/base"
  production = var.production
}

module "green" {
  source      = "terraform-in-action/aws/bluegreen//modules/autoscaling"
  app_version = "v1.0"
  label       = "green"
  base        = module.base
}

module "blue" {
  source      = "terraform-in-action/aws/bluegreen//modules/autoscaling"
  app_version = "v2.0"
  label       = "blue"
  base        = module.base
}

output "lb_dns_name" {
  value = module.base.lb_dns_name
}
```

Chạy câu lệnh apply.

```
$ terraform apply -auto-approve
...
Plan: 0 to add, 2 to change, 0 to destroy.
...
Apply complete! Resources: 0 added, 2 changed, 0 destroyed.

Outputs:

lb_dns_name = "terraforminaction-ovgcpc-lb-909615962.us-west-2.elb.amazonaws.com"
```

Sau khi terraform chạy xong, nó sẽ chuyển target group của ALB từ Autoscaling Group Green sang Blue. Ta tải lại trang và các bạn sẽ thấy nó chuyển thành blue với version 2.0.

![image.png](https://images.viblo.asia/7c4b12da-dd0d-4ab8-b226-0f2131e56066.png)

Oke, ta làm một ví dụ đơn giản về Blue/Green deployments thành công 😁. Khi ta thực hiện Blue/Green deployments thế này thì ta có thể giảm thời gian down time của ứng dụng nhiều nhất có thể.

Bây giờ thì ta đang có hai môi trường production là Green và Blue, nếu ta lại có một version mới của ứng dụng là 3.0, ta chỉ việc cập nhật giá trị app_version của `module green` lại thành 3.0 và chuyển giá trị của biến `production` lại thành green.

**Ta nhớ chạy câu lệnh destroy để xóa resource nhé.**

## Kết luận
Vậy là ta đã tìm hiểu xong về Blue/Green deployments, đây chỉ là một trong những phương pháp để thực hiện Zero-downtime deployments, các bạn có thể tìm hiểu thêm về Rolling Blue/Green deployments và Canary deployments để ta có thêm nhiều sự lựa chọn nữa khi tiến hành deploy ứng dụng với version mới. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo ta sẽ tìm hiểu về một phương pháp deployment tiếp theo là **A/B Testing Deployment**.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).