## Giới thiệu
Chào các bạn tới với series về Terraform, ở [bài trước](https://viblo.asia/p/terraform-series-bai-5-module-in-depth-create-multi-tier-application-1VgZvAb2KAw) chúng ta đã tìm hiểu về Terraform Module. Ở bài này chúng ta sẽ tìm hiểu về Terraform Backend, và tìm hiểu về những vấn đề như làm sao nhiều người có thể cùng làm việc trên cùng một terraform project, làm sao để share terraform state file giữa các member trong team, khi nhiều người cùng chạy câu lệnh apply lên trên một terraform project thì chuyện gì sẽ xảy ra? Ở phần này chúng ta sẽ tìm hiểu về lý thuyết, phần sau ta sẽ triển khai Terraform dùng S3 standard backend.

Khi chúng ta làm việc với Terraform, nếu chỉ làm có một mình ta làm thì mọi chuyện rất yên ổn và không có gì xảy ra, nhưng nếu có thêm một người khác tham gia vào để viết terraform file cùng với ta, thì sẽ có rất nhiều vấn đề xảy ra.

 Vấn đề đầu tiên là làm sao ta có thể share source code với nhau, và làm sao chúng ta share terraform state file với nhau. Nên lưu ý là khi ta chạy câu lệnh apply, khi terraform chạy xong thì nó sẽ lưu cấu hình hệ thống của ta vào state file, hiện tại thì state file của ta đang được tạo ra là lưu ở máy local. Nếu có người khác tham gia vào làm việc cùng với ta thì ta share state file này thế nào?
 
 Cách mà ta hay làm là ta sẽ push nó lên trên github và để người khác pull xuống. Nhưng nếu ta dùng github để lưu và share state file, thì mỗi lần ta chạy câu lệnh apply và state file mới của ta được tạo ra, ta phải push nó lên lại github, và thành viên khác trong team phải pull xuống trước khi họ chạy apply. Nếu ta dùng cách như vậy thì rất dễ gây ra conflict.
 
 Vấn đề thứ hai là nếu cùng lúc có cả hai người chạy apply, thì hạ tầng của ta sẽ thế nào?
 
 ![](https://images.viblo.asia/a8253162-0bbf-4969-909a-201b361b5a49.jpg)

Để giải quyết những vấn đề trên thì ta sẽ sử dụng một feature của terraform là Backend.

## Terraform Backend
Một backend trong terraform sẽ đóng vai trò quyết định state file sẽ được lưu ở đâu và Terraform CLI operations như terraform plan hoặc terraform apply sẽ chạy như thế nào. Trong terraform sẽ có ba loại backend như sau:
+ Local backend.
+ Standard backend.
+ Remote backend (enhanced backend).

## Local backend
Đây là loại backend mặc định khi ta chạy terraform. Terraform runtime sẽ được thực thi ở máy local và sau khi chạy xong nó sẽ lưu lại kết quả ở dưới state file.

![](https://images.viblo.asia/324b0dd2-6466-4690-9e3f-0c45aa16e79b.jpg)

Loại backend này phù hợp khi ta làm dự án một mình. Nhưng nó gặp vấn đề giống như ta nói ở trên, khi cùng lúc có nhiều người chạy câu lệnh terraform apply lên trên cùng một terraform project, hạ tầng của ta sẽ bị conflict.

Nên để nhiều người có thể cùng nhau làm việc trên một terraform project, ta sẽ cần phải sử dụng loại backend tiếp theo.

## Standard backend
Ở loại backend này thì Terraform runtime vẫn được thực thi ở máy local, nhưng sau khi nó chạy xong thì kết quả của nó sẽ được lưu ở một nơi khác (remote state file). Nơi ta dùng để lưu trữ state file có thể là AWS S3, GCP Cloud Storage, ...

![](https://images.viblo.asia/8536695b-f34e-45d9-9cde-f6fb166bd093.jpg)

Lúc này thì ta có thể lưu source code ở trên github, không cần phải lưu state file vì state của ta đã được lưu ở một chỗ khác. Vậy nếu nhiều người cùng lúc chạy câu lệnh terraform
thì ta vẫn bị conflict vậy? Standard backend có giải quyết vấn đề này cho ta không? Câu trả lời là có.

Ngoài trừ việc lưu trữ state file ở một nơi khác, standard backend còn hỗ trợ cho ta một feature là lock remote state file. Khi một user chạy câu lệnh terraform apply, terraform sẽ lock lại state file của ta, cùng lúc đó nếu một user khác chạy câu lệnh terraform, terraform kiểm tra thấy state file của ta đã bị lock, nó sẽ reject câu lệnh terraform apply của user thứ hai => **từ đó giải quyết vấn đề nhiều người cùng lúc chạy câu lệnh terraform apply**.

![](https://images.viblo.asia/5c43d480-c083-4866-9e18-bdf4eefa7cff.jpg)

Ngoài ra khi ta sử dụng standard backend thì ta có thể tăng độ bảo mật lên một chút, vì các cấu hình của hạ tầng mà liên quan tới database như password, thì nó sẽ được lưu trữ ở remote state file, không phải ai cũng có thể vào remote state file để xem được.

Ví dụ khi ta xài S3 standard backend thì ta sẽ config như sau.

```
terraform {
  backend "s3" {
    bucket         = "state-bucket"
    key            = "team/rocket"
    region         = "us-west-2"
    encrypt        = true
    role_arn       = "arn:aws:iam::<ACCOUNT_ID>:role/state-bucket-assume-role"
    dynamodb_table = "state-assume-lock"
  }
  required_version = ">= 0.15"
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }
}
```

Nhưng ta cũng sẽ gặp một vấn đề nữa là những config yêu cầu để ta chạy Terraform vẫn phải lưu ở local, ví dụ như là khi ta chạy Terraform để tạo hạ tầng trên AWS, ta cần phải cấu hình secret key ở dưới máy local của ta, và cho tiện thì hầu hết mọi người đều tạo admin account mà có full quyền với AWS, sau đó lưu secret key của admin account này dưới máy local => không bảo mật lắm.

Nên để giải quyết vấn đề trên thì ta sẽ sử dụng loại backend tiếp theo, là remote backend.

## Remote backend
Ở loại backend này, **Terraform runtime của ta sẽ được thực thi ở remote server**, và Terraform CLI ở máy local của ta chỉ có nhiệm vụ streaming kết quả được in ra từ remote server về local CLI của ta. Và sau khi nó chạy xong, state file của ta cũng sẽ được lưu trữ ở remote server.

![](https://images.viblo.asia/d36fd5db-dd29-4916-9b81-9a8e94efb8f8.jpg)

Lúc này cả config cho Terraform và state file đều được lưu ở remote server. Remote backend cũng có tính năng lock state file để ngăn chặn việc nhiều người chạy apply cùng lúc.

![](https://images.viblo.asia/8c6b5bc0-b16b-4d22-9534-cccef08d10e1.jpg)

Ví dụ khi ta xài remote backend thì ta sẽ config như sau.

```
terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "hpi"

    workspaces {
      name = "pro"
    }
  }
}
```

Ta sẽ xài remote backend khi làm việc với team và sử dụng remote backend ta có thể centralize tất cả config ở cùng một chỗ.

Ngoài việc lựa chọn backend cho terraform, khi làm thực tế ta cũng thường phải xây dựng CI/CD cho một terraform project. Để làm CI/CD cho terraform cũng khá mất thời gian nên để tiết kiệm thời gian ta có thể xài một platform có sẵn của Terraform là Terraform Cloud.

## Terraform Cloud
Đây là một platform được Hashicorp (công ty phát triển Terraform) xây ra. Nó sẽ hỗ trợ ta trong việc sử dụng Terraform một cách rất dễ dàng.

![image.png](https://images.viblo.asia/869c1274-18c8-40ee-a930-43d5cad27ea0.png)

Khi xài Terraform Cloud thì những thứ ta cần làm rất đơn giản, chỉ cần viết code và push lên github, Terraform Cloud sẽ pull code xuống và chạy cho ta.

![](https://images.viblo.asia/8dc88c9a-6b30-4b09-a43e-73c3a1922e85.jpg)
 
 Cách sử dụng Terraform Cloud mình sẽ nói ở bài khác.
 
##  Kết luận
Vậy là ta đã tìm hiểu xong về lý thuyết của Terraform Backend, ở trên là ba loại backend Terraform hỗ trợ khi mình viết bài này, local backend thích hợp khi ta làm dự án một mình, standard và remote backend phù hợp khi ta làm theo team. Tùy vào trường hợp thì ta sẽ xài loại phù hợp. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Ở bài tiếp theo ta nói về cách config và triển khai Terraform dùng S3 Standard Backend.

## Mục tìm kiếm đồng đội

![Hoàng Phúc](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).