## Giới thiệu
Chào các bạn tới với series về Terraform, ở bài trước chúng ta đã tìm hiểu về cách sử dụng Terraform với Jenkins. Ở bài tiếp theo này chúng ta sẽ tìm hiểu về một chủ đề rất thú vị là cách sử dụng Terraform với multi-cloud.

![image.png](https://images.viblo.asia/190c8f57-e979-44d2-9c5b-ec025536d9ef.png)

Điểm mạnh của Terraform so với các công cụ khác là nó giúp ta dễ dàng tạo được hạ tầng trên nhiều môi trường Cloud khác nhau, ở bài này chúng ta sẽ dùng Terraform để tạo connection giữa hai Virtual Private Cloud của AWS và GCP. Các bạn có thể đọc cách cấu hình bằng tay ở bài này [Connect VPC Network between AWS and GCP use VPN](https://viblo.asia/p/aws-practice-connect-vpc-network-between-aws-and-gcp-use-vpn-gDVK2rM0KLj).

## Terraform and Multi Cloud
Multi-cloud là cách ta sử dụng nhiều nhà cung cấp cloud khác nhau để xây dựng hạ tầng, ví dụ ta sử dụng cả AWS và GCP cho hạ tầng.

Vì mỗi Cloud sẽ có điểm mạnh và điểm yếu khác nhau, nên khi ta có nhiều lựa chọn phù hợp thì hệ thống của ta sẽ càng mạnh mẽ.

Một vài điểm mạnh khi ta sử dụng multi-cloud:
+ Flexibility: bạn có thể chọn cloud service phù hợp nhất cho ứng dụng của bạn.
+ Cost savings: lựa chọn pricing models phù hợp nhất giữa các cloud vendors.
+ Resilience: more resilient than single-cloud architectures.
+ Compliance: yếu tố nội bộ. Ví dụ nếu ta phát triển ứng dụng ở Trung Quốc thì ta nên xài AliCloud.

Và với Terraform việc tạo hạ tầng trên nhiều môi trường Cloud khác nhau không hề khó, Terraform có cung cấp sẵn cho ta các provider phù hợp cho từng môi trường.

![image.png](https://images.viblo.asia/fa8198b9-31a5-4fd4-afff-59126c68dc62.png)

## Site to Site VPN between AWS and GCP
### Architecture
Hạ tầng mà ta sẽ xây như sau.

![image.png](https://images.viblo.asia/190c8f57-e979-44d2-9c5b-ec025536d9ef.png)

Ở trên AWS và GCP ta sẽ có một VPC, sau đó để kết nối giữa hai VPC thì ở AWS ta sẽ tạo Virtual Private Gateway, Site-to-Site VPN, Customer Gateway. Ở GCP ta sẽ tạo External IP, Cloud VPN. Sau đó ta sẽ tạo tunnel để hai bên kết nối với nhau.

### Config Provider
Ok, giờ ta bắt tay vào code nào, ta tạo ba file tên là `main.tf`, `aws.tf`, `gcp.tf`.

```main.tf
provider "aws" {
  region      = "us-west-2"
}

provider "google" {
  project     = "hpi-111111"
  region      = "us-west2"
}
```

Để sử dụng AWS ta sẽ dùng `provider aws` (trong series này ta đã sử dụng rất nhiều), và để sử dụng Google Cloud ta dùng `provider google`. Cấu hình của provider google như sau.

```
provider "google" {
  project     = <project-id>
  region      = <region>
}
```

### Create VPC
Tiếp theo ta tạo GCP Virtual Private Cloud và AWS Virtual Private Cloud.

```gcp.tf
resource "google_compute_network" "aws_gcp" {
  name = "aws-gcp"
}
```

```aws.tf
data "aws_availability_zones" "available" {}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.2"

  name = "aws-gcp"
  cidr = "10.0.0.0/16"
  azs  = data.aws_availability_zones.available.names

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}
```

### GCP External IP and AWS Customer Gateway
Sau đó ta sẽ tạo GCP External IP và AWS Customer Gateway cho hai thằng VPC.

```gcp.tf
...

resource "google_compute_address" "aws_customer_gateway" {
  name = "aws-customer-gateway"
}
```

```aws.tf
...

resource "aws_customer_gateway" "gcp_customer_gateway" {
  bgp_asn    = 65000
  ip_address = google_compute_address.aws_customer_gateway.address
  type       = "ipsec.1"

  tags = {
    Name = "gcp-customer-gateway"
  }
}
```

Với ip_address của AWS Customer Gateway ta lấy từ GCP External IP.

### VPN Gateway
Tiếp đó ta tạo VPN Gateway cho GCP VPC và AWS VPC.

```gcp.tf
...

resource "google_compute_vpn_gateway" "aws_gcp" {
  name    = "aws-gcp"
  network = google_compute_network.aws_gcp.id
}

resource "google_compute_forwarding_rule" "fr_esp" {
  name        = "fr-esp"
  ip_protocol = "ESP"
  ip_address  = google_compute_address.aws_customer_gateway.address
  target      = google_compute_vpn_gateway.aws_gcp.id
}

resource "google_compute_forwarding_rule" "fr_udp500" {
  name        = "fr-udp500"
  ip_protocol = "UDP"
  port_range  = "500"
  ip_address  = google_compute_address.aws_customer_gateway.address
  target      = google_compute_vpn_gateway.aws_gcp.id
}

resource "google_compute_forwarding_rule" "fr_udp4500" {
  name        = "fr-udp4500"
  ip_protocol = "UDP"
  port_range  = "4500"
  ip_address  = google_compute_address.aws_customer_gateway.address
  target      = google_compute_vpn_gateway.aws_gcp.id
}
```

Chỗ này thì ta không cần hiễu kĩ lắm, phần quan trọng là ở resource `google_compute_vpn_gateway`, ta sẽ chỉ định GCP VPC mà ta muốn gắn VPN Gateway này vào bằng thuộc tính `network`.

```aws.tf
...

resource "aws_vpn_gateway" "aws_gcp" {
  vpc_id = module.vpc.vpc_id

  tags = {
    Name = "AWS-GCP"
  }
}
```

Tương tự cho bên AWS.

### GCP Cloud VPN and AWS Site-to-Site VPN
Tiếp theo ta sẽ tạo VPN để kết nối cả hai VPC với nhau.

```gcp.tf
...

resource "google_compute_vpn_tunnel" "tunnel_1" {
  name          = "tunnel-1"
  peer_ip       = aws_vpn_connection.aws_gcp.tunnel1_address
  shared_secret = aws_vpn_connection.aws_gcp.tunnel1_preshared_key

  target_vpn_gateway = google_compute_vpn_gateway.aws_gcp.id

  depends_on = [
    google_compute_forwarding_rule.fr_esp,
    google_compute_forwarding_rule.fr_udp500,
    google_compute_forwarding_rule.fr_udp4500,
  ]
}

resource "google_compute_route" "route_1" {
  name       = "route-1"
  network    = google_compute_network.aws_gcp.name
  dest_range = module.vpc.vpc_cidr_block
  priority   = 1000

  next_hop_vpn_tunnel = google_compute_vpn_tunnel.tunnel_1.id
}
```

Ở bên GCP ta tạo tunnel với giá trị VPN `tunnel1_address` và `tunnel1_preshared_key` từ AWS.

```aws.tf
...

resource "aws_vpn_connection" "aws_gcp" {
  customer_gateway_id = aws_customer_gateway.gcp_customer_gateway.id
  vpn_gateway_id      = aws_vpn_gateway.aws_gcp.id
  type                = "ipsec.1"
  static_routes_only  = true
}

resource "aws_vpn_connection_route" "office" {
  destination_cidr_block = "10.168.0.0/20" // fixed cidr block of gcp region on us-west-2 
  vpn_connection_id      = aws_vpn_connection.aws_gcp.id
}
```

### Apply
Giờ ta chạy câu lệnh apply nào 😁.


```
$ terraform apply
...
Plan: 32 to add, 0 to change, 0 to destroy.
```

Sau khi Terraform chạy xong, ta lên AWS và GCP kiểm tra thì sẽ thấy các resource tương ứng đã được tạo ra. Và để hai bên có thể dễ dàng tương tác với nhau, các bạn bật Security Group cho cả hai bên nhé.

## Enable Security Group
Ở AWS Console ta bấm vào Security Group của VPC, chọn default SG và sửa Inbound rules như sau.

![image.png](https://images.viblo.asia/8cf40e17-2ba9-47de-bc6a-2c096bf96413.png)

Sau đó ta cập nhật Firewall Rule ở bên GCP để các ứng dụng của AWS có thể thoải mái truy cập tới GCP VPC. Truy cập GCP Console, bấm vào memu Firewall, chọn default-allow-internal và Edit nó.

![image.png](https://images.viblo.asia/a9408a45-6007-4a9c-8d61-737587afbed7.png)

Ta thêm vào CIDR Block của AWS VPC là 10.0.0.0/16 và bấm save. Bây giờ thì các ứng dụng của AWS và GCP của ta đã có thể nói chuyện với nhau cho dù cả hai đều nằm trong private network 😁.

Github của toàn bộ series https://github.com/hoalongnatsu/terraform-series.

## Kết luận
Vậy là ta đã tìm hiểu xong cách sử dụng Terraform với multi-cloud. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).