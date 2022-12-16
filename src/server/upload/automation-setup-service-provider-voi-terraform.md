Vậy **[Infrastructure là gì ?](https://hungphamdevweb.com/infrastructure-la-gi-chon-terraform-de-tu-dong-hoa-setup.html)**. Infrastructure theo tiếng việt nghĩa là cơ sở hạ tầng, là nền tảng hoặc khuôn khổ hỗ trợ một hệ thống hoặc tổ chức. Trong giới công nghệ, cơ sở hạ tầng công nghệ thông tin bao gồm các tài nguyên vật lý và ảo hỗ trợ lưu lượng, lưu trữ, xử lý và phân tích dữ liệu.

Bởi vì hạ tầng mỗi ngày sẽ càng ngày to ra và việc setup sẽ trở nên khó khăn và phức tạp. Đó là lý do xuất hiện của khái niệm [Infrastructure]((https://hungphamdevweb.com/infrastructure-la-gi-chon-terraform-de-tu-dong-hoa-setup.html)) as Code
<h2>Infrastructure as Code là gì?</h2>
<strong>Infrastructure as Code</strong> là dùng nền tảng hoặc script dùng để tự động hoá quá trình cấu hình cơ sở hạ tầng thay vì phải setup thủ công.

Hiện nay việc setup cơ sở hạ tầng sẽ mất rất nhiều thời gian với nhiều quy trình thủ công liên quan đến nhau, nhưng với sự xuất hiện của những công cụ như Terraform, Chef, Ansible, Puppet, SaltStack, CloudFormation ... Nó khiến cho việc quản lý cũng như cung cấp những việc setup infrastructure trở nên đơn giản hơn.

Ví dụ như vậy cho các anh em dễ hiểu:

Giả sử mình có một **[website Wordpress](https://hungphamdevweb.com/wordpress-cai-dat-phpunit-cho-wordpress.html)** và được deploy trên 2 con instance bằng Amazon EC2 ngoài ra mình có setup thêm một con Classic Load Blancer bên ngoài 2 con instance.

Để monitor instance mình cần phải setup CloudWatch, nhưng giả sử tương lai mình thêm một con instance nữa thì những thông số bắt buộc mình phải vô trong AWS cấu hình thủ công lại.

Để công việc dễ dàng hơn mình sẽ tìm một open source hoặc một platform nào đó để tự động hoá vấn đề này.

Đó lý do mình sẽ đề cập về <strong>Terraform</strong>, một open source giúp ích chúng ta trong công việc này.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/fxzwnj26kt_infrastructure-la-gi.jpg)

<h2>Vậy Terraform là gì?</h2>
Sau khi đã hiểu được Infrastructure là gì thì chúng ta sẽ đi sâu hơn một xíu để hiểu thêm về <strong>Terraform</strong>, một cái tên khá xa lạ cho các anh em chưa từng làm tới <strong>Devops</strong>.

Terraform là một công cụ phát triển, thay đổi và "versioning" hệ thống an toàn và hiệu quả.

Terraform là công cụ cơ sở hạ tầng bất biến đa đám mây được <strong>HashiCorp</strong> đầu tiên giới thiệu thế giới vào tháng 7 năm 2014 và được viết bằng Go. Một lý do quan trọng mà mọi người chọn Terraform là vì nó quản lý cơ sở hạ tầng của họ dưới code.

Bên cạnh đó Terraform có thể quản lý và hỗ trợ hầu hết các "service provider" đình đám hiện nay như:

- **[Amazon Web Service](https://hungphamdevweb.com/quan-ly-hinh-anh-trong-wordpress-bang-amazon-s3.html)**
- Google Cloud
- Alibaba Cloud
- Microsoft Azure

<h2>Tại sao chọn Terraform?</h2>
Thật ra có rất nhiều những tool khác ngoài Terraform, nhưng vì mình chưa có dịp trải nghiệm qua những tool khác nên bài viết mang tính cá nhân một tí 

Một phần nữa mình phải công nhận cộng đồng sử dụng Terraform khá nhiều bằng chứng là theo thống kê của IAC (một bên thứ 3 thông kê và so sánh giữa các thương hiệu) thì số lượng job cho Developer biết Terraform khá là nhiều cũng như số lượng thư viện khá là khủng.

Với một lý do nữa là theo mình thấy code Terraform đọc khá dễ hiểu. Document đầy đủ, mô tả rất chi tiết và đó là một điểm cộng lớn nếu các anh em bắt đầu đi tìm một công nghệ mới.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/dtgwe49pye_so-sanh-terraform.jpg)

<h2>Demo Code Terraform</h2>
Dưới đây mình sẽ demo đoạn code nhỏ về Terraform và giải thích về cách hoạt động của nó:

```
module "metric_alarm" {
  source              = "terraform-aws-modules/cloudwatch/aws//modules/metric-alarm"
  version              = "~&gt; 0.2.0"

  alarm_name          = "wordpress-instances-health-check"
  alarm_description   = "Number of healthy instances less than 2"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "2"
  threshold           = "2"
  period              = "60"
  namespace           = "AWS/ELB"
  metric_name         = "HealthyHostCount"
  statistic           = "Minimum"
  actions_enabled     = "true"

  alarm_actions       = ["${var.cloudwatch_sns_topic}"]
  ok_actions          = ["${var.cloudwatch_sns_topic}"]

  dimensions = {
    LoadBalancerName = "wordpress-load-blancer"
  }
}
```

Ở đây mình auto setup một CloudWatch config để monitor instance trên EC2 nhằm một trong 2 con instance mình bị die thì nó sẽ báo về email cho mình.

Nhưng field bên trái cần phải follow theo syntax của Terraform còn giá trị bên phải sẽ tương đương với giá trị Service Provider các anh em dùng.

Ở đây mình dùng AWS nên mình cần phải dùng module Terraform của AWS còn về các giá trị thì các anh em chỉ cần lên AWS đọc document rồi set một giá trị mà mình muốn vào thôi.

Còn anh em nào không hiểu rõ thì có thể xem sơ qua các doc này nó ghi rất là rõ nhé:

https://www.terraform.io/docs/providers/aws/r/cloudwatch_metric_alarm.html

<h2>Kết Luận</h2>
Sau một hồi tìm hiểu Infrastructure là gì hoặc Terraform là gì thì mình biết là các em cũng hơi rối một xíu. Tóm cái váy lại như sau để dễ hiểu hơn. Mặc định các Service Provider như Amazon Web Service, nó sẽ có rất là nhiều service trên đó. Khi mà cách anh em phải edit trên UI bằng tay như vậy sẽ rất là rối.

Khi mà hệ thống nó càng phình ra đồng nghĩa cấu hình sẽ tương đôi phức tạp và việc quản lý bằng tay là không thể.

Để đơn giản hoá vấn đề hơn ở đây chúng ta sẽ sử dụng tool hỗ trợ điển hình ở đây là Terraform. Hy vọng là bài viết mình không quá lang mang và sẽ giúp ích phần nào cho các anh em. Hẹn gặp lại vào một bài viết khác 

Ngoài ra các anh em có thể xem bài viết gốc của mình ở đây:
**[https://hungphamdevweb.com/infrastructure-la-gi-chon-terraform-de-tu-dong-hoa-setup.html](https://hungphamdevweb.com/infrastructure-la-gi-chon-terraform-de-tu-dong-hoa-setup.html)**