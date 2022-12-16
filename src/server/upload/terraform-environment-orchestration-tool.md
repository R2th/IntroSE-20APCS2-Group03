Terraform là gì ?? Google 1 tý thì các bạn sẽ biết Terraform là 1 công cụ mã nguồn mở, được phát triển bởi 1 công ty có tên là HashiCorp . Release lần đầu vào năm 2014 và mới ra bản cập nhật 0.12.19 vào ngày 08-01-2020 ( vài ngày trước khi mình viết bài này). Terraform cho phép bạn định nghĩa, xây dựng, thay đổi và quản lý cơ sở hạ tầng (infrastructure) một cách tự động. Thay vì chạy bằng năng lượng sinh học thông thường (như command line, console v.v...) để thao tác tạo mới và quản lý môi trường  thì nay bạn chỉ cần viết sẵn một bộ terraform và bấm apply thì phần infra sẽ được xây dựng luôn cho bạn.

***Lưu ý một tý là Terraform sử dụng một loại ngôn ngữ riêng , gọi là Hashicorp Configuration Language (HCL). Hơi độc và lạ nhưng mà cũng không khó lắm, ngu như mình mà học mới có 1 tháng đã hiểu rồi, các bạn dev code quen rồi chắc chỉ mất 1 ngày thôi :D***


**Terraform thần thánh đến mức nào ?** Terraform có thể khiến cho mấy ông infra vô dụng như mình ngày càng trở nên vô dụng hơn . Vì như đã nói ở trên, chỉ cần 1 bộ terraform được thiết kế sẵn thì một người không biết gì về infra cũng có thể tạo ra 1 môi trường hoàn hảo. Thế nên chả việc gì phải TO mấy ông infra làm chi nữa :D Việc quan trọng bây giờ là làm sao để thiết kế và viết nên 1 bộ terraform như thế mà thôi .

Việc chạy Terraform cũng khá đơn giản, nó chỉ là một tool được cài đặt trên máy tinh của bạn hoặc trên server. Nó hỗ trợ rất nhiều provider khác nhau , bạn chỉ việc chỉ định provider mong muốn, và cung cấp credentials (nếu cần) là nó có thể chạy được rồi . (Tham khảo danh sách các provider mà terraform hỗ trợ tại [đây](https://www.terraform.io/docs/providers/index.html) )

# Cài đặt Terraform :
Terraform chỉ có 1 file chạy duy nhất, vậy nên chỉ cần download về và bỏ vào /usr/local/bin là nó chạy được thôi. Download tại [đây](https://www.terraform.io/downloads.html) 
```
hungdhm@test:~$ curl -O https://releases.hashicorp.com/terraform/0.12.18/terraform_0.12.18_linux_amd64.zip
hungdhm@test:~$ sudo unzip terraform_0.12.18_linux_amd64.zip -d /usr/local/bin/
Archive:  terraform_0.12.18_linux_amd64.zip
  inflating: /usr/local/bin/terraform 
hungdhm@test:~$ terraform --version
Terraform v0.12.18
```

# Cách sử dụng terraform :
Để hiểu cách sử dụng, mình sẽ đi trực tiếp vào hướng dẫn các bạn xây dựng 1 bộ terraform basic để tạo 1 con EC2 trên AWS :D . Mô hình infra sẽ như sau :
![](https://images.viblo.asia/4461723c-3d39-4bf6-9e69-107669bdb594.png)
Ok, nhìn vào cái sơ đồ ở trên, thì các bạn sẽ hình dung phần infra của chúng ta sẽ gồm các thành phần sau :
- Network : Gồm 1 VPC , 1 subnet để đặt con EC2 vào và tất nhiên network thì sẽ có gateway (internet gateway) và routing table.
- Phần server : Chỉ có 1 con EC2 thôi. 
Đấy, phân tích mô hình infra nó đơn giản như thế thôi =))
Để bắt đầu làm việc, thì sau khi phân tích mô hình , mình sẽ tiến hành thiết kế các cụm chức năng theo từng module để thuật tiện cho việc quản lý và update sau này. Tương tự như các bạn code, các function càng clear thì càng dễ maintaince thôi :D

## Cấu trúc file của terraform:
File source code của terraform cơ bản sẽ có đuôi **.tf* . Ví dụ như sau :
```
hungdhm@test:~/test-terraform$ tree
.
├── main.tf
├── modules
│   ├── ec2
│   │   ├── ec2.tf
│   │   ├── outputs.tf
│   │   ├── security-group.tf
│   │   └── variables.tf
│   └── network
│       ├── outputs.tf
│       ├── subnet.tf
│       ├── variables.tf
│       └── vpc.tf
├── outputs.tf
├── terraform.tfstate
├── terraform.tfstate.backup
├── terraform.tfvars
└── variables.tf

3 directories, 14 files
```
Theo như cấu trúc ở trên, thì thằng nào chứa file main.tf sẽ được gọi là **root**. Bạn cần lưu ý cái này, khi chạy apply thì sẽ đứng ở đây chạy. (Ngoài ra nó còn có tác dụng chỉ định path file trong hàm **file** của terraform.)
- File main.tf : sẽ chứa các khai báo như provider , credentials key như đã nói ở trên và bao gồm các resource cần khởi tạo.
- File outputs.tf : sẽ chứa các thông tin resource đã được khởi tạo và in ra màn hình. Muốn in gì ra thì khai báo ở đây. Ngoài việc show ra màn hình thì nó còn có tác dụng outputs các giá trị để các module có thể tái sử dụng. Ví dụ output của module A sử dụng làm input của module B.
- File variables.tf : Khai báo các biến được sử dụng trong terraform. File này có tác dụng cục bộ ( biến local) . 1 biến khai báo ở module A không thể sử dụng ở module B.
- File terraform.tfvars : Khai báo các **value** của các biến trong file variables.tf . Trường hợp bạn không muốn fix cứng giá trị của biến thì khai báo riêng ở đây còn không thì thôi :v.
- File terraform.tfstate và terraform.tfstate.backup : Lưu trữ các state của terraform. Được ứng dụng để nhiều người có thể cùng sử dụng 1 bộ terraform mà ko confict. Khá là phức tạp , trong khuông khổ guide newbie này thì .... thôi mình bỏ qua vậy =))
- Folder modules : tên sao thì người vậy.
- Folder ec2 : Nơi sẽ định nghĩa resource Ec2 của mình.  
- Folder network : Nơi sẽ định nghĩa các thành phần network của mình : vpc , subnet, internet gateway , routing table .
## Terraform command :
*Tham khảo full docs ở [đây](https://www.terraform.io/docs/commands/index.html)*
Terraform có không qua nhiều command, nhưng cơ bản để sử dụng, các bạn chỉ cần biết 4 command là được :D
### Terraform init :
```
terraform init [options] [DIR]
```
Command này sẽ verify providers , check credentials và sẽ download những driver cần thiết để chạy . Những định nghĩa này sẽ nằm trong file main.tf ở root path.
### Terraform plan :
```
terraform plan [options] [dir]
```
Command này sẽ chạy thử đống config mà bạn đã viết. Kiểu như mô phỏng thử và in ra kết quả mà bạn sẽ có được khi chạy. Lệnh này chạy không chết người được, nên thoải mái :v 
### Terraform apply :
```
terraform apply [options] [dir-or-plan]
```
Command này sau khi chạy thì nó sẽ tiến hành tạo các resource theo đúng kịch bản bạn đã viết . Trước khi ký vào lựa chọn yes or no , thì nó cũng show ra kết quả trước cho bạn review. Nên xem kỹ trước khi bấm yes . Bút sa là cơm gà xối mỡ ngay :v vì terraform không có tính năng rollback đâu nhé .
### Terraform destroy :
```
terraform destroy [options] [dir]
```
Thằng trên apply cái gì thì thằng này destroy cái đó. Thế thôi. Nhưng cũng cẩn thận, nó sẽ hỏi dét or lâu, thế nên cố mà xem cho kỹ !!

-----------------------------
Trên đấy là 4 command hay dùng. Trong 1 bài lab như này thì mình nghĩ đã đủ để xài rồi. Thế nên các bạn nào muốn deep dive thì hãy vào docs của terraform để nghiên cứu thêm nhá :)

# Viết terraform :
Các bạn tham khảo repo của mình :D Mình viết ở dưới nè .
https://github.com/hungdhm-0574/terraform-test

Các bạn download về thì cd vào trong chỗ chứa file main.tf rồi bắt đầu chạy test thử.
Chạy thử terraform init :
```
hungdhm@web1-1-93:~/test-terraform$ terraform init
Initializing modules...

Initializing the backend...

Initializing provider plugins...

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, it is recommended to add version = "..." constraints to the
corresponding provider blocks in configuration, with the constraint strings
suggested below.

* provider.aws: version = "~> 2.44"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

Terraform plan :
```
hungdhm@web1-1-93:~/test-terraform$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

module.network.data.aws_availability_zones.available: Refreshing state...
module.ec2.data.aws_caller_identity.current: Refreshing state...
module.ec2.data.aws_ami.ubuntu: Refreshing state...

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # module.ec2.aws_instance.ec2_test will be created
  + resource "aws_instance" "ec2_test" {
      + ami                          = "ami-09f9d773751b9d606"
      + arn                          = (known after apply)
...
...
...
Plan: 9 to add, 0 to change, 0 to destroy.
```

Terraform apply
```
Apply complete! Resources: 9 added, 0 changed, 0 destroyed.

Outputs:

ec2_id_test = i-04ab46b1763622555
ec2_public_ip = 54.211.13.241
subnet_id_test = [
  "subnet-00d2b0eb6e680ff07",
]
vpc_id_test = vpc-0f13c86937ae53dae

```

Kết quả output ra là nó nằm trong outputs.tf ở root đấy :v: 
Xong rồi thì lên console check resource được tạo ra .
![](https://images.viblo.asia/8dd21b13-a1cb-4003-a9c8-a0dce1d99069.JPG)

# Kết :
Đến đây là đã xong phần xây dựng môi trường bằng terraform, các bạn có thắc mắc phần nào cứ commend, mình sẽ giải đáp :D
Cái Terraform nó chỉ tạo được resource chứ chưa config gì cả. Có nghĩa là con Ec2 của các bạn nó chỉ là 1 con server trắng sạch tinh tươm. Bài sau mình sẽ hướng dẫn các bạn cách config luôn con Ec2 lúc nó được tạo ra bằng cách dùng Ansible nhé :D
Hẹn gặp lại sau tết =))