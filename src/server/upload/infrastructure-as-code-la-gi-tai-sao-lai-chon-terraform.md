![](https://miro.medium.com/max/1000/1*LEGSC7cU0sh8dyzz0o5n9A.png)
### Infrastructure As Code là gì ?
Hiện nay, việc quản lý các web applications khá là phức tạp, ví dụ bạn phải quản lý load balancer, vài web servers, database servers, ... Bạn có thể sẽ phải mất hàng giờ để provisioning và quản lý những hệ thống này. Infrastructure as Code có thể hiểu là bạn có thể thiết lập/quản lý những stack trước kia của hệ thống thông qua việc định nghĩa chúng trong 1 file script chẳng hạn thay vì tốn thời gian và công sức setup manual từng thứ (eg: ssh rồi cài cắm package, services, lib nọ kia). 
### Tại sao lại chọn Terraform ?
Nếu các bạn search  “infrastructure-as-code” trên Google, nó sẽ liệt kê ra một đống tools khá phổ biến như:
- Chef
- Puppet
- Ansible
- SaltStack
- CloudFormation
- Terraform

Tất cả những tools trên đều có thể giúp bạn quản lý infrastructure (servers, vpc, storage ...). Chúng hầu hết cũng là open source, được hỗ trợ bởi đông đảo contributors và có thể dùng với nhiều cloud provider khác nhau như Google Cloud, AWS, Azure, ... (*CloudFormation thì không open source và chỉ hỗ trợ AWS*). Vậy thì tại sao lại chọn Terraform ?

#### 1. Configuration Management vs Provisioning
Chef, Puppet, Ansible và SaltStack đều là configuration management tool, tức là nó được design để cài đặt và quản lý phần mềm trên những servers có sẵn. CloudFormation và Terraform là provisioning tool, có nghĩa là nó được thiết kế để xây dựng servers (cũng như việc thiết lập load balancers, databases, networking,...) và việc config server sẽ nhường lại cho tool khác. 2 khái niệm/công việc của những tool này không khác nhau hoàn toàn, chúng có thể làm được những phần việc mà cái kia cũng có thể làm được. Nhưng ở đây chúng ta sẽ tập trung vào việc configuration management hoặc provisioning sẽ phù hợp trong trường hợp nào.

Ví dụ, bạn dùng Docker thì hầu hết phần việc config đã được thực hiện trước đó rồi. Trong Docker images thì hầu hết những phần mềm mà server bạn cần đều đã được cài đặt và config cả rồi. Một khi bạn đã có Docker images rồi thì điều bạn cần làm chỉ là chạy nó mà thôi. Điều bạn thực sự cần làm ở đây là provision những servers để chạy những container này, do vậy Terraform sẽ phù hợp và tốt hơn những configuration management tool khác.

#### Mutable Infrastructure vs Immutable Infrastructure
Configuration management tool như Chef, Puppet, Ansible và SaltStack thường thay đổi một hệ thống đã có sẵn. Ví dụ bạn muốn Chef cài đặt version mới của OpenSSL, nó sẽ chạy lệnh software update trên server của bạn. Qua nhiều lần chạy update thì mỗi server sẽ có những trạng thái thay đổi khác nhau. Điều này dẫn tới vấn đề là **configuration drift**, có nghĩa là các server sẽ khác nhau một chút dẫn tới việc kiểm soát configuration sẽ khó điều tra và tái hiện.

Ngược lại nếu bạn dùng provisioning tool như Terraform thì việc deploy machine image được tạo bởi Docker, mọi thay đổi sẽ tạo một deployment mới (giống như việc thay đổi biến trong functional programming đều trả về một biến mới). Cũng như ví dụ update version OpenSSL trên, bạn sẽ tạo một Docker image mới với version mới của OpenSSL đã được cài đặt, deploy image đó với servers mới và xóa bỏ những servers cũ đi (cũng cần phải lưu ý nếu servers đó là database server). Điều này sẽ làm giảm khả năng configuration drift và dễ dàng biết được trạng thái hiện tại của server. Bạn cũng có thể dễ dàng deploy bất cứ version nào trước đó (rollback).
#### 3. Procedural vs Declarative
Chef và Ansible khuyến khích sử dụng procedural style tức là bạn sẽ viết những đoạn code chi tiết, step by step. Terraform, CloudFormation, SaltStack và Puppet thì lại khuyến khích viết theo kiểu declarative style tức là bạn sẽ viết code là state mà bạn cần và chúng sẽ tự tìm cách để setup.

Ví dụ là bạn muốn deploy 10 servers (EC2 instance của AWS chẳng hạn) để chạy version 1 của app gọi là v1. Với Ansible thì bạn viết procedural như sau:
``` yaml
- ec2:
    count: 10
    image: ami-v1
    instance_type: t2.micro
```
Và declarative với Terraform thì bạn viết đơn giản là:
``` go
resource "aws_instance" "example" {
  count = 10
  ami = "ami-v1"
  instance_type = "t2.micro"
}
```
Không khác nhau lắm và chúng cùng trả về kết quả là 10 EC2 instances.

Giờ thì chúng ta thay đổi một chút. bạn muốn tạo thêm 5 servers nữa (tổng cộng là 15 servers). Với Ansible thì code cũ không còn tác dụng nữa vì nếu bạn sửa số lượng server từ 10 thành 15 và chạy lại đoạn code đó thì nó sẽ tạo ra 15 servers mới nữa. Vì vậy bạn sẽ phải viết/copy đoạn code để thêm 5 server mới nữa:
``` yaml
- ec2:
    count: 5
    image: ami-v1
    instance_type: t2.micro
```
Ngược lại thì với declarative approach thì bạn chỉ cần sửa ở Terraform số lượng servers là 15:
``` go
resource "aws_instance" "example" {
  count = 15
  ami = "ami-v1"
  instance_type = "t2.micro"
}
```
Terraform thấy rằng đã có 10 servers trước đó rồi nên giờ chỉ cần tạo mới 5 servers nữa. Để chắc chắn thì bạn dùng `terraform plan` để xem sự thay đổi:
``` bash
$> terraform plan
+ aws_instance.example.11
    ami:                      "ami-v1"
    instance_type:            "t2.micro"
+ aws_instance.example.12
    ami:                      "ami-v1"
    instance_type:            "t2.micro"
+ aws_instance.example.13
    ami:                      "ami-v1"
    instance_type:            "t2.micro"
+ aws_instance.example.14
    ami:                      "ami-v1"
    instance_type:            "t2.micro"
+ aws_instance.example.15
    ami:                      "ami-v1"
    instance_type:            "t2.micro"
Plan: 5 to add, 0 to change, 0 to destroy.
```
Tương tự nếu bạn muốn deploy v2 thì sao ? Với Ansible thì lại viết tìm những servers đã được deploy trước đó và update v2 lên từng server. Với Terraform thì đơn giản là đổi ami version:
``` go
resource "aws_instance" "example" {
  count = 15
  ami = "ami-v2"
  instance_type = "t2.micro"
}
```
Đây là một ví dụ đơn giản, trên thực tế thì Ansible có thể cho phép bạn sử dụng tags để search EC2 instances nào đang tồn tại trước khi deploy (ví dụ sử dụng `instance_tags` và `count_tag`) nhưng việc này thì khá là phức tạp (ví dụ phải tìm instances cả bởi image version, availability zone,...). 

Đúc kết lại thì có 2 vấn đề chính với procedural IAC:
- Procedural code thì khó nắm bắt trạng thái hiện tại của hệ thống. Chẳng hạn, việc đọc 3 Ansible template trên cũng chưa đủ để biết được ta đã deploy những gì. Bạn sẽ phải biết được thứ tự apply của từng template. Nói cách khác là với Ansible hoặc Chef thì bạn phải biết toàn bộ lịch sử về mọi thay đổi đã xảy ra.
- Procedural code không có tính tái sử dụng cao.

Ngược lại thì với declarative IAC như Terraform thì thực trạng hệ thống sẽ được phản ánh qua code hiện tại, codebase sẽ ít và dễ hiểu hơn. Tuy nhiên nó cũng có mặt không tốt. Vì bạn không có quyền access vào toàn bộ programming language nên việc config sẽ có chút hạn chế. Một số sự thay đổi infrastructures như rolling, zero-downtime deployment thường khó để config theo declaretive code. Nhưng Terraform cũng cung cấp một số chức năng như input variables, output variables, modules, `create_before_destroy` và `count` giúp cho việc config clear và clean hơn.
#### 4. Master vs Masterless
Chef, Puppet và SaltStack đều yêu cầu bạn phải chạy trên master server để lưu lại state và update những thay đổi của hệ thống. Mỗi khi bạn muốn update một cái gì đó, bạn cần sử dụng client (UI hoặc CLI) để chạy commands trên master server, master server sẽ đẩy những thay đổi đó cho những servers khác hoặc những servers đó sẽ pull bản update mới nhất từ master server. Việc này có một số vấn đề như sau:
- **Extra infrastructure**: bạn sẽ phải deploy 1 sever hoặc nhiều server nữa cho việc high availability và scalability
- **Maintainance**: bạn sẽ phải maintain,  upgrade, back up, monitor và scale master server
- **Security**: bạn cần phải tạo cách thức giao tiếp giữa client-server và master server - servers khác. Nào là mở thêm port, auth system,... điều này có thể tạo thêm cơ hội cho attackers.

Ansible, CloudFormation, Heat và Terraform mặc định đều là masterless, chính xác hơn thì một trong số chúng sẽ dựa vào master server nhưng nó cũng là 1 phần hệ thống bạn đang sử dụng chứ không phải phần bạn cần phải quản lý thêm. Ví dụ thì Terraform sẽ giao tiếp với hệ thống thông qua API cloud provider, có thể hiểu là API server là master server (bạn gần như ko cần quan tâm đến chúng lắm). Ansible thì làm việc thông qua SSH nên bạn không cần phải thông qua extra infrastructure nào.
### Conclusion
Chúng ta đã so sánh những IAC tool phổ biến rồi, và thực tế thì bạn sẽ kết hợp nhiều tool để build infra của mình vì mỗi loại có điểm mạnh và yếu riêng. Ví dụ bạn dùn Terraform để deploy toàn bộ infrastructure như cấu trúc mạng (VPC, subnet, route), data store (MySQL, Redis), load balancers,... Sau đó dùng Ansible để deploy ứng dụng của bạn trên những server đó. Tóm lại, bảng dưới đây là bảng sắp xếp những IAC tool phổ biến. Vì vậy nếu bạn muốn dùng một tool open source, hỗ trợ immutable  infrastructure, declarative code và client-only architecture thì Terraform là sự lựa chọn hợp lý nhất.

![](https://miro.medium.com/max/1000/1*VDiEQvt_5WpywOY22WW6dw.png)
### References
https://dev.to/pavanbelagatti/what-is-infrastructure-as-code-and-why-terraform--2pc3
https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c