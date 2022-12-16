Tổng hợp sơ lược các công cụ Continuous Integration phổ biến trong cộng đồng.

![](https://images.viblo.asia/00523cdd-643a-4013-b45f-f3c9ba33db63.png)

CI/CD là viết tắt của (Continuous Integration and  Continuous Delivery/Continuous Deployment). Giải thích đơn giản CI/CD là một nền tảng mà tập họp các công cụ giúp nhà phát triển, kỹ sư, và DevOps đóng gói và phân phối phần mền tới người dùng một cách tự động và dễ dàng nhất.

Một nền tảng CI/CD sẽ bao gồm 3 mô-đun:
+ Continuous Integration: tích hợp sự thay đổi của code vào phiên bản hiện tại
+ Continuous Delivery: triển khai sự thay đổi của phần mền lên production một cách an toàn, ví dụ triển khai phiên bản Canary Release
+ Continuous Deployment: thực hiện triển khai sản phẩm lên production.

Sự khác biệt của Continuous Delivery với Continuous Deployment là Continuous Delivery sẽ triển khai phiên bản pre-release của sản phẩm, yêu cầu ta kiểm thử mọi thứ đều ổn thì mới tiến hành triển khai. Còn Continuous Deployment thì sẽ triển khai thẳng lên production luôn.

**01 - Continuous Integration**

## CircleCI
CircleCI là một công cụ Continuous Integration được thiết kế với tốc độ cao và có khả năng mở rộng, cấu hình CI được viết dưới dạng YAML file, giúp việc theo dõi các thay đổi cấu hình CI dễ dàng hơn. Hiện nay CircleCI là một trong những công cụ Continuous Integration được đánh giá tốt.

![](https://i.imgur.com/HNvC1cv.jpg)

Ưu điểm của CircleCI:
1. Giao diện người dùng đẹp, môi trường xây dựng linh hoạt, dễ sử dụng.
2. Hỗ trợ phân quyền theo kiểu role-based access control (RBAC).
3. Hỗ trợ nhiều môi trường build khác nhau.

Nhược điểm của CircleCI:
1. Rủi ro lớn nhất khi chọn CircleCI là hay bị downtime ngắn và đôi lúc rất chậm ở mặt trải nghiệm, nếu một Job của ta cần thời gian chạy rất lâu mà nó bị downtime một phát thi ta phải chạy lại từ đầu, rất tốn thời gian.
2. Có rất nhiều hạn chế với Docker.
3. Đội lúc một Job mất rất nhiều thời gian để được thực thi.

Chi phí

CircleCI cung cấp rất nhiều gói trả phí khác nhau. Nếu quy mô của chúng ta nhỏ thì có thể chọn gói Free, nếu quy mô khá lớn một chút thì ta có thể chọn gói Performance. Tuy nhiên nếu phần mền của ta yêu cầu phải cập nhật liên tục thì CircleCI phải chạy liên tục, nếu CircleCI thực thi càng nhiều thì sẽ càng tốn phí, giống với AWS CodeBuild (the more resources you use, the more you pay), nên nó không thích hợp với các dự án quy mô lớn và cần cập nhật liên tục.

## AWS CodeBuild
Nếu bạn là một DevOps mà đang sử dụng AWS thì sử dụng cộng cụ Continuous Integration của AWS phát triển luôn là một lựa chọn tốt nhất. AWS CodeBuild là công cụ Continuous Integration mà AWS phát triển, có thể tích hợp với rất nhiều dịch vụ khác của AWS. Sử dụng AWS CodeBuild sẽ giúp công việc triển khai trên AWS dễ dàng hơn, với CodeBuild ta không cần phải tự quản lý việc mở rộng build servers, AWS sẽ làm việc đó.

![](https://i.imgur.com/ujEaYPe.jpg)

Ưu điểm của AWS Codebuild là:
1. Có thể kết hợp với CloudWatch để lưu logs không giới hạn và có thể giám sát quá trình build
2. Có thể build song song cả trăm dự án với tính năng tự động mở rộng của CodeBuild
3. Hỗ trợ Docker-base, có sẵn docker command mà không cần phải tự cài
4. YAML-based

Nhược điểm:
1. Nhược điểm lớn nhất của CodeBuild là giao diện sử dụng không đẹp lắm
2. Không linh hoạt hoặc có thể tùy chỉnh
3. Thiết lập ban đầu phức tạp

Chi phí

AWS CodeBuild tính tiền theo từng phút build, thay vì phải xây dựng cả một server build và trả tiền 24/7 kể cả lúc không cần build. Với CodeBuild thì khi nào thực hiện build mới phải trả tiền sẽ giúp tiết kiệm rất nhiều chi phí cho server, mỗi tháng AWS sẽ miễn phí cho 100 phút build. Tuy nhiên đối với một dự án mà thời gian build lâu và liên tục thì AWS CodeBuild rất tốn tiền.

## Concourse
Concourse được phát triển năm 2014 bởi hai kỹ sư sau khi họ sử dụng rất nhiều công cụ CI và nhận ra những chức còn thiếu của những công cụ hiện có. Concourse là một open-source và được đánh giá tới 6.6k sao trên github, nó là một công cụ rất dễ sử dụng và hỗ trợ trên nền tảng Docker rất tốt.

![](https://i.imgur.com/sOsEWLT.jpg)

Ưu điểm:
1. Tốc độ nhanh, có thể mở rộng
2. Open-source và miễn phí
3. Giao diện đơn giản dễ sử dụng
4. Tất cả mọi thứ đều chạy trên nền Container

Nhược điểm:
1. Vì là open-source nên sẽ có nhiều lỗi có thể phát sinh, và nếu là lỗi của công cụ thì ta cần phải chờ maintainer sửa được lỗi đó
2. Thiếu các tính năng cơ bản, cần thời gian để đưa ra các giải pháp thay thế
3. Nhiều vấn đề về tính ổn định

Chí phí

Vì là open-source nên nó hoàn toàn miễn phí, nhưng nên nhớ là không có gì là hoàn toàn miễn phí, tuy công cụ Concourse là miễn phí nhưng ta phải tốn chi phí cho server, chi phí cho vận hành và quản lý

## Drone
Drone được phát triển năm 2012 bởi Brad Rydzewski là một nền tảng Continuous Integration dạng container-native, drone là một công cụ rất dễ sử dụng và có khả năng mở rộng. Drone là một open-source và được đánh giá tới 25.8k sao trên github, 50k+ người dùng và có hơn 100 triệu lượt pull trên github.

![](https://i.imgur.com/21TvvH0.jpg)

Ưu điểm:
1. Tất cả các bước đều chạy trên container riêng
2. Giao diện rất đẹp và dễ sử dụng
3. Cài đặt rất nhanh, tầm 5 phút
4. Tất cả pipeline đều được cấu hình với code

Nhược điểm:
1. Không có nhiều plugins có sẵn như Jenkins

Chi phí

Vì là open-source nên nó hoàn toàn miễn phí, ta chỉ tốn chi phí server và chi phí vận hành, bảo trì. Nếu so sánh với Jenkins thì chi phí server của nó sẽ rẻ hơn Jenkins.

## Travis CI
Travis CI là công cụ CIAAS (CI as a Service) đầu tiên, ban đầu nó được thiết kế để làm công cụ CI cho các dự án open-source, nhưng về sau vì đón nhận của cộng đồng nên nó được phát triển để có thể làm công cụ CI cho các dự án cá nhân (bản trả phí). Travis CI hỗ trợ cấu hình pipeline sử dụng định dạng YAML. Hỗ trợ kiểm thử và build code cho hơn 30+ ngôn ngữ.

![](https://i.imgur.com/Obf3pXI.jpg)

Ưu điểm:
1. Miễn phí 100% khi dùng cho dự án open-source (public repository)
2. Khởi tạo và cấu hình CI nhanh chóng chỉ trong vài phút
3. Giao diện đẹp và dễ sử dụng
4. Hỗ trợ 30+ ngôn ngữ
5. Có hỗ trợ database (rất tiện)

Nhược điểm:
1. Thiếu tính quản trị và bảo mật, ví dụ, thêm secrets vào khá khó khăn
2. Thiếu nhiều tính năng dành cho doanh nghiệp so với các công cụ CI khác

Chi phí

Sử dụng cho dự án open-source thì hoàn toàn miễn phí. Còn đối với Travis Pro thì chi phí sẽ tính theo tháng. Nếu bạn đăng ký Travis Pro thì sẽ được miễn phí 30 ngày đầu tiên, sau đó chi phí sẽ là $69 một tháng cho 1 concurrent jobs, nếu 2 concurrent jobs thì là $129 một tháng.

Nguồn: The CI/CD Buyer's Guide - Harness

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông tin về DevOps hàng ngày nhé.