# 1. Mở đầu
Gần đây, mình mới được nhận một task tìm hiểu và tích hợp CI/CD cho dự án đang làm. Nếu bạn nào đã từng tìm hiểu về CI/CD rồi thì chắc hẳn sẽ thấy sự cần thiết của việc tích hợp nó vào trong quá trình phát triển phần mềm. Hay nói nôm na là nó sẽ đảm nhận việc tự động build, chạy test và triển khai code khi có thay đổi. Qua một tuần ngồi vọc vạch, tìm hiểu trên mạng thì cũng biết được Jenkins có một công cụ có thể hỗ trợ để tạo ra những job chạy CI và CD.
### CI/CD - Continuous Intergration/Continuous Delivery
Đầu tiên, nói lại về CI/CD một chút. CI hay Continuous Integration, là phương pháp phát triển phần mềm yêu cầu các thành viên của team tích hợp công việc của họ thường xuyên, mỗi ngày ít nhất một lần. Mỗi tích hợp được build tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể. Và tất nhiên giúp cho việc tích hợp và phát triển phần mềm trở nên nhanh và hiệu quả hơn.

Tiếp đến, CD hay đầy đủ là Continuous Delivery (tạm dịch là chuyển giao liên tục), là quá trình triển khai tất cả thay đổi về code lên môi trường test hoặc staging. Continuous Delivery cho phép tự động hóa phần testing bên cạnh việc sử dụng unit test, kiểm tra phần mềm qua nhiều thước đo trước khi triển khai cho khách hàng.
### Jenkins là gì?
Là một ứng dụng Web mã nguồn mở được viết bằng Java, đóng vai trò máy chủ build & test của hệ thống tích hợp liên tục. Jenkins có thể kết hợp được với hầu hết các công cụ khác của hệ thống tích hợp liên tục với nhiều nền tảng khác nhau. Ngoài ra, cộng đồng sử dụng Jenkins rất lớn nên cũng rất dễ trong việc sử dụng và hỗ trợ khi gặp khó khăn.
# 2. Sử dụng Jenkins để cấu hình CI/CD
Trở lại bài toán đặt ra lúc đầu, chi tiết yêu cầu như sau: *Khi 1 PR mới được tạo, Jenkins sẽ bắt sự kiện và trigger để chạy job CI, CI job sẽ chạy Unit Test, checkstyle code và report kết quả. Khi PR được (merged), thì job CD sẽ chạy deploy code mới lên server test và chỉ việc chờ tới khi có thông báo deploy thành công trên Chatwork là xong :v*.
## 2.1. Cài đặt Jenkins
Jenkins được viết bằng Java nên trước khi cài bạn cần cài đặt Java cho máy tính của bạn nhé. Bắt đầu thôi nào!
 ```sh
 wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
 sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
 sudo add-apt-repository universe
 sudo apt-get update
 sudo apt-get install jenkins -y
 ```
Để truy cập vào Jenkins, vào browser và nhập địa chỉ http://localhost:8080. Tiếp theo là bước cài đặt cho lần đầu khởi động Jenkins. Nói chung cũng không có gì đặc biệt, chỉ có bước cài plugin thì nên click vào "Install suggested plugins" thôi.

Ở đây chúng ta còn cần phải sử dụng Github webhook để trigger những sự kiện như tạo PR hoặc merge PR, mà webhook cần phải có một public domain để hoạt động. Các bạn có thể dùng các tool để public cổng 8080 trên local thành public domain. Ví dụ như ngrok.com và làm theo hướng dẫn hoặc chạy lệnh `ssh -R 80:localhost:8080 ssh.localhost.run`.
## 2.2. Cấu hình CI
Trước hết chúng ta cần biết được khi nào trên repo có một pull request mới được tạo để chạy CI. Để làm được điều này cần nhờ đến một plugin của Jenkins là *GitHub Pull Request Builder*. Chúng ta sẽ vào phần quản lí plugin: *Manage Jenkins > Manage Plugins > Tab Available*, search và click "Install without restart".
![](https://images.viblo.asia/bc972ca3-27ad-4e3b-9150-99f526bf4cc1.png)
**Bước 1**: Tạo webhook trên repo: Vào setting webhook, chọn Add webhook. Tại payload url, điền với format sau: `<PUBLIC_DOMAIN>/ghprbhook/` ví dụ: `http:/my-domain.com/ghprbhook/`. Content type chọn application/json và thêm Secret nếu cần. Cuối cùng tại mục action chọn Issue comments và Pull requests.

**Bước 2**: Cài đặt cho plugin GitHub Pull Request Builder. Vào setting: *Manage Jenkins > Configure System*, Thêm credentials (username/password) của tài khoản github cho plugin.

**Bước 3**: Tạo job mới. Tại mục Github project nhập link của repo vào đó. Tiếp theo, chọn GitHub Pull Request Builder, tích chọn "Use github hooks for build triggering". Trong mục Advance Setting..., nhập whitelist branch khi có pull request mới được tạo. Và nếu muốn thay đổi tên hiển thị trên pull request khi job chạy thì bạn có thể setting trong mục Trigger setup. Thêm action "Update commit status during build" và nhập tên hiển thị của job vào ô "Commit Status Context".
![](https://images.viblo.asia/e6bb8679-8f50-4ff4-a3ab-64649d64500a.png)
![](https://images.viblo.asia/8a74b19c-c55c-4bb0-b0c5-0d933213f485.png)
![](https://images.viblo.asia/ec21fc43-e820-4492-9084-900440926cea.png)
![](https://images.viblo.asia/9ac694d0-fbc3-42f7-a3ec-62fe7fa285fb.png)
**Bước 4**: Viết script pipeline cho job.

Việc setting đã xong, bây giờ hãy thử tạo một pull request trên repo vào nhánh master và trải nghiệm.
![](https://images.viblo.asia/03350045-079b-4cc4-8c44-8111a7ce0525.png)
## 2.3. Cấu hình CD
Thật không may là github webhook chưa hỗ trợ cho chúng ta khi có sự kiện merge pull request. Vì vậy cần sử dụng plugin Generic Webhook Trigger Plugin và phân tích payload của Github webhook khi có sự kiện merge. Ở đây, chúng ta cần kiểm tra 2 trường $.action="closed" và $.pull_request.merged=true. 

**Bước 1**: Tạo một webhook khác với payload url như sau: `<PUBLIC_DOMAIN>/generic-webhook-trigger/invoke?token=my-token`, tại mục action chọn Pull requests.

**Bước 2**: Tạo job mới. Tại phần Build Trigger, tích vào chọn Generic Webhook Trigger và setting như trong hình dưới đây.
![](https://images.viblo.asia/d3e5ba1b-450b-4d80-86cd-b5c9edbe17e2.png)
**Bước 3**: Viết script cho job.
```
pipeline {
    agent any
    tools {
        maven "mvn3"
    }
    stages {
        stage("Checkout") {
            when {
                expression {
                    return current_status == "closed" && merged == "true"
                }
            }
            steps {
                echo "Checkout done."
            }
        }
        stage("Build") {
            when {
                expression {
                    return current_status == "closed" && merged == "true"
                }
            }
            steps {
                echo "Build done."
            }
        }
        stage("Deploy") {
            when {
                expression {
                    return current_status == "closed" && merged == "true"
                }
            }
            steps {
                echo "Deploy done."
            }
        }
        stage("Notify") {
            when {
                expression {
                    return current_status == "closed" && merged == "true"
                }
            }
            steps {
                echo "Notify when deploy success."
            }
    }
}
```
# 3. Kết luận
Trên đây là bài viết hướng dẫn các cấu hình, tích hợp CI/CD bằng Jenkins vào project. Rất mong nhận được sự góp ý và chia sẻ những ý kiến thêm của mọi người. Thank all!