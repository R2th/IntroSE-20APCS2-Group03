Link bài viết gốc - [Chinh phục Terraform - Bài 0 - Infrastructure as Code và Terraform](https://devopsvn.tech/terraform-series/terraform/bai-0-infrastructure-as-code-va-terraform)

## Giới thiệu
Chào các bạn tới với series về Terraform. Ở bài đầu tiên chúng ta sẽ tìm hiểu IaC (Infrastructure as Code) là gì, Terraform là gì và tại sao ta cần nó.

## Infrastructure as Code
Từ cái tên của Infrastructure as Code thì ta có thể hiểu đơn giản là ta sẽ viết code để mô tả và cung cấp (provisioning) infrastructure của chúng ta 😁. Từ Infrastructure tiếng việt có nghĩa là hạ tầng, còn ở trong ngành IT của chúng ta thì mình hiểu nó là hạ tầng của hệ thống, bao gồm máy chủ, mạng, gateway, database, tất cả những thứ cần thiết để triển khai ứng dụng của chúng ta trên môi trường server. Infrastructure as Code thì chắc có lẽ được sử dụng phổ biến nhất trên môi trường Cloud.

Ví dụ ở trên AWS Cloud, bình thường thì ta sẽ đăng nhập lên web console, rồi ta cần máy ảo thì ta thao tác trên web để tạo máy ảo (EC2), ta cần database thì ta sẽ thao tác trên web để tạo database. Và từ từ thì hạ tầng hệ thống của chúng sẽ phình to ra, đây là lúc ta sẽ gặp vấn đề, ta sẽ không biết hệ thống hiện tại ta đang có những gì, cho dù ta có nhớ đi nữa thì lỡ người quản lý cloud đó nghỉ việc, người mới vào sẽ làm sao biết được hạ tầng hiện tại? Ngoài ra, nếu lỡ có ai đó xóa EC2 của ta thì sao, ta phải tạo lại nó bằng tay, mà ta đâu  biết là thằng EC2 lúc trước nó tạo ra với config thế nào, cho dù có docs đi nữa thì việc tạo lại rất mất thời gian. Và nếu lỡ nguyên hạ tầng cloud nó down luôn thì sao, không lẻ ta phải tạo lại nguyên cái hạ tầng hệ thống từ đầu? Thì IaC sẽ giúp ta giải quyết những vấn trên, ta sẽ viết những file để describe và backup lại hạ tầng của chúng ta, nếu có việc gì xảy ra như nguyên hạ tầng down hoặc ai đó sửa gì sai trên hạ tầng của ta thì ta có thể dễ dàng triển khai nó lại một cách dễ dàng.

## Terraform
Thì trong mảng IaC này thì tool mà thông dụng nhất ở thời điểm hiện tại chắc có lẽ là Terraform. Terraform là một open-source của HashiCorp, chuyên dùng để provisioning infrastructure, ta chỉ việc viết code, rồi gõ một vài câu CLI đơn giản, nó sẽ tạo ra Infrastructure cho ta, thay vì ta với lên web console bấm bấm rất tốn thời gian.

Flow của terraform sẽ như sau, ta viết code, xong ta gõ câu lệnh CLI, và đợi nó cung cấp infrastructure, sau khi nó tạo xong thì nó sẽ tạo ra một file state để lưu lại kiến trúc hạ tầng hiện tại của ta.

![image.png](https://images.viblo.asia/87bce8a8-0bb4-44d0-8db2-213b370ab326.png)

Thì cũng có nhiều tool khác có thể làm được việc này như là Ansible chẳng hạn, nhưng thằng Ansible nó là một Configuration Management tool chứ nó không phải được tạo ra để tập trung cho mảng IaC, nên ta dùng nó thì sẽ tốn công chạy những thứ không cần thiết 😁.

Để triển khai một ứng dụng thì ta có thể làm nguyên flow sau đây, dùng Terraform để tạo hạ tầng, sau đó dùng Ansible để setup những thứ cần thiết cho server, như install docker chẳng hạn, setup CI tool trên server. Sau đó thì ta dùng docker hoặc kubernetes để chạy ứng dụng của ta.

![image.png](https://images.viblo.asia/7a96b89f-92d4-45d6-af49-e3965c0458b3.png)

## Tại sao nên dùng Terraform
Đây là 4 điểm lợi của Terraform so với các công cụ khác:
+ Dễ xài.
+ Open source và miễn phí.
+ Declarative programing: chỉ diễn tả những thứ bạn cần và Terraform làm cho bạn.
+ Có thể cung cấp hạ tầng cho nhiều cloud khác nhau như AWS, GCP, Azure trong cùng một file cấu hình, này ta gọi là Cloud-agnostic.

Tới đây thì ta nói nhiều rồi, giờ sẽ làm một ví dụ nhỏ để ta hiểu hơn. Trong series này mình sẽ dùng Terraform để provisioning hạ tầng trên AWS  (tại mấy cloud cái khác mình chưa xài 😂).

Và để làm được thì yêu cầu là bạn phải có tài khoản AWS nhé, và ta tạo một IAM user và cho nó admin premission, xong ta lấy access key của nó config vào máy ta nhé. Tạo một file ở đường dẫn `~/.aws/credentials` với nội dung sau:

```
[default]
aws_access_key_id=<your-key>
aws_secret_access_key=<your-key>
```

Các bạn làm theo các bước ở đây nha https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html.

Sau đó ta cài terraform CLI. Các bạn xem ở link này https://learn.hashicorp.com/tutorials/terraform/install-cli.

Oke, sau khi cài xong hết thì ta bắt đầu viết code nào.

## “Hello Terraform!”
Ở bài ví dụ này ta sẽ dùng Terraform để tạo một EC2 trên AWS Cloud, ngôn ngữ Terraform sử dụng gọi là HashiCorp Configuration Language (HCL).

![image.png](https://images.viblo.asia/e3950270-79b3-4030-bd12-18bb74361ca9.png)

Các bước ta thực hiện như sau:

1. Viết terraform file.
2. Cấu hình AWS provider.
3. Khỏi tạo Terraform bằng câu lệnh `terraform init`.
4. Triển khai EC2 instance bằng câu lệnh `terraform apply`.
5. Xóa EC2 bằng câu lệnh `terraform destroy`.

![image.png](https://images.viblo.asia/cb965d4e-4095-4159-93f6-980ef3a783cc.png)

Tạo một file tên là `main.tf` và ta gõ đoạn code sau đây:

```
provider "aws" {
  region = "us-west-2"
}
```

Đây là ta sẽ chỉ định ta sử dụng aws provider, và resource của chúng ta sẽ được tạo ở region là us-west-2. Sau đó ta thêm vào đoạn code để mô tả EC2 của chúng ta:

```
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "hello" {
  ami           = "ami-09dd2e08d601bff67"
  instance_type = "t2.micro"
  tags = {
    Name = "HelloWorld"
  }
}
```

Ở trên ta sử dụng một block tên là resources, đây là block quan trọng nhất của terraform, ta sẽ sử dụng block này để tạo resource của chúng ta. Phía sau resources thì ta sẽ có thêm giá trị nữa là resource type mà ta muốn tạo (cái này phụ thuộc vào provider của chúng ta sẽ cung cấp những resource type nào) , ở trên resource type của ta là **aws_instance**, và giá trị cuối cùng là tên của resource đó, này ta muốn đặt gì cũng được.

![image.png](https://images.viblo.asia/1d1c76d2-4262-4676-b404-182df081990f.png)

Để xem những thuộc tính của một resource nào đó, ta lên trang https://registry.terraform.io/ để xem. Ví dụ ở đây mình cần xem thuộc tính của aws_instance thuộc aws provider.

![image.png](https://images.viblo.asia/9e700d80-da49-42a2-9ee8-5724742c7736.png)

Sau khi bấm vào thì trang web sẽ dẫn bạn qua docs của cách sử dụng provider này. Ta bấm qua Documentation.

![image.png](https://images.viblo.asia/341c2f11-9bb7-42f7-9b98-b988aa1022f4.png)

Tìm kiếm aws_instance.

![image.png](https://images.viblo.asia/90b2b42b-01db-49ee-bf64-316a81e6e2ee.png)

Mỗi resource của chúng ta sẽ có giá trị arguments (đầu vào) và attributes (đầu ra) tùy thuộc vào resource type, và attributes sẽ có loại gọi là computed attributes, là những attributes ta chỉ biết được khi resource đã được tạo ra.

![image.png](https://images.viblo.asia/97b4c7a4-44fc-4dea-aed1-1d0f1d102519.png)

Xong khi ta viết config xong hết, thì ta mở terrminal lên và gõ `terraform init`, bước này là bắt buộc khi ta viết một cấu hình cho một hạ tầng mới, nó sẽ tải code của provider xuống folder hiện tại mà ta viết file `main.tf`.

```
$ terraform init
Initializing the backend...

Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v3.66.0...
- Installed hashicorp/aws v3.66.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.
```

Sau khi init xong, ta gõ tiếp câu lệnh apply để nó tạo EC2 cho ta.

```
$ terraform apply -auto-approve
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the
following symbols:
  + create

Terraform will perform the following actions:

  # aws_instance.hello will be created
  + resource "aws_instance" "hello" {
      + ami                                  = "ami-09dd2e08d601bff67"
...
Plan: 1 to add, 0 to change, 0 to destroy.
aws_instance.hello: Creating...
aws_instance.hello: Still creating... [10s elapsed]
aws_instance.hello: Still creating... [20s elapsed]
...
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Sau khi nó chạy xong, ta lên aws console của mình, ta sẽ thấy EC2 đã được tạo 😁.

![image.png](https://images.viblo.asia/ac08414e-9f27-4052-b262-10579944843f.png)

Bây giờ nếu ta muốn xóa EC2 đi, ta chỉ cần chạy câu lệnh destroy.

```
$ terraform destroy -auto-approve
aws_instance.hello: Refreshing state... [id=i-0ec68130272c45152]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the
following symbols:
  - destroy

Terraform will perform the following actions:

  # aws_instance.hello will be destroyed
  - resource "aws_instance" "hello" {
      - ami                                  = "ami-09dd2e08d601bff67" -> null
...
Plan: 0 to add, 0 to change, 1 to destroy.
aws_instance.hello: Destroying... [id=i-0ec68130272c45152]
aws_instance.hello: Still destroying... [id=i-0ec68130272c45152, 10s elapsed]
aws_instance.hello: Still destroying... [id=i-0ec68130272c45152, 20s elapsed]
aws_instance.hello: Still destroying... [id=i-0ec68130272c45152, 30s elapsed]
aws_instance.hello: Destruction complete after 35s

Destroy complete! Resources: 1 destroyed.
```

Ta lên aws console thì ta sẽ thấy là EC2 của ta đã được xóa thành công. Vậy là ta đã hoàn thành ví dụ đầu tiên với Terraform. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để cập nhật tin tức về DevOps nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong về IaC là gì và Terraform sử dụng như thế nào. Như bạn thấy thì với Terraform, ta tạo và xóa resource đi một cách rất dễ dàng. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Bài tiếp theo mình sẽ nói sâu hơn về cách viết file config và life cycle của Terraform khi nó tạo resoruce, mong các bạn theo dõi series của mình nhé.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).