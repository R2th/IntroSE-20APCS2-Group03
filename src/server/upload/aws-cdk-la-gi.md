![AWS Cloud Development Kit](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fogps%2Faws-cdk.png&w=1920&q=75)

Infrastructure as Code đã trở thành tiêu chuẩn và là một trong những good practices trong vài năm trở lại đây. Các tổ chức, doanh nghiệp đã thấy sự tiện lợi
và hữu ích của việc quản lý resource thông qua IaC thay vì cách làm truyền thống trên AWS console.

Hiện tại, có 2 công cụ phổ biến cho phép bạn định nghĩa và quản lý tài nguyên trên cloud sử dụng phương pháp khai báo (declarative) là AWS CloudFormation và Terraform.
Có một vấn đề với việc định nghĩa theo phương pháp khai báo là khi hệ thống của bạn lớn hơn đó là việc maintain các template files sử dụng JSON hoặc YAML cũng trở nên nặng nề và khó khăn hơn.

Đó là lý do AWS CDK xuất hiện để cải thiện quy trình làm việc của các developer và giúp họ tạo các tài nguyên, infrastructure trên Cloud sử dụng phương pháp mệnh lệnh (imperative).

Trong hướng dẫn này, bạn sẽ tìm hiểu AWS CDK là gì, làm sao để bạn có thể tạo được các resources từ những dòng code và những good practices trong quá trình phát triển.

## AWS Cloud Development Kit (CDK) là gì?

AWS Cloud Development Kit (AWS CDK) là một khung phát triển (framework) phần mềm mã nguồn mở để xác định tài nguyên ứng dụng đám mây bằng các ngôn ngữ lập trình quen thuộc.
Đây là công cụ tổng hợp ứng dụng AWS CDK thành các CloudFormation template và triển khai hạ tầng trên AWS Cloud.

Phiên bản beta công khai đầu tiên của AWS CDK (v.0.8.0) được công bố vào năm 2018, lúc đó CDK như một cách tiếp cận thay thế cho việc triển khai các AWS resources bằng code sử dụng ngôn ngữ Typescript.

AWS CDK là một [open source project](https://github.com/aws/aws-cdk) và version Generally Available (GA) của AWS CDKsv2 đã được Werner Vogels - CTO của Amazon công bố vào tháng 12 năm 2021 trong sự kiện re:invent.
V2 của CDK hỗ trợ các ngôn ngữ sau:

| Ngôn ngữ   | Stability    |
| ---------- | ------------ |
| TypeScript | Stable       |
| JavaScript | Stable       |
| Python     | Stable       |
| Java       | Stable       |
| C#/.NET    | Stable       |
| Go         | Experimental |

Khi bản GA được công bố, điều đó có nghĩa rằng sẽ không có thay đổi nào đó quá lớn từ thời điểm đó và chúng ta có thể yên tâm sử dụng chúng cho môi trường production.

## Tổng quan về AWS CDK

Nói đơn giản thì ứng dụng AWS CDK gồm 3 thành phần chính (basic building blocks):

1. **App** là thành phần chính của cấu trúc, hợp nhất tất cả các stacks trong ứng dụng và sau đó triển khai trên AWS
2. **Stack** gần tương tự với Stack trong CloudFormation, là một đơn vị (template) chứa các tài nguyên AWS ở dạng cấu trúc (constructs) và có thể sử dụng để triển khai.
3. **Construct** là thành phần cơ bản chứa các tài nguyên AWS (một hoặc nhiều). Bạn có thể tuỳ ý tạo ra và kết hợp các tài nguyên để tạo ra cấu trúc (construct) riêng của mình

![AWS CDK Diagram](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Faws-cdk-diagram.png&w=1920&q=75)

Có thể hiểu đơn giản theo diagram trên, AWS CDK giúp bạn tạo ra mã nguồn, thông qua AWS CDK CLI đóng vai trò như một "trình dịch" để tổng hợp
thành một CloudFormation template đóng vai trò như một "mã nguồn hợp ngữ" chứa toàn bộ các thành phần của hệ thống.
Template này sau đó có thể được triển khai lên AWS thông qua CloudFormation đóng vai trò như một bộ xử lý. Dễ hiểu ha 😅

Ngoài AWS CDK Core framework và AWS CDK CLI, AWS còn cung cấp thêm AWS Construct Hub Library - một thư viện tập hợp các cấu trúc của AWS CDK cho các dịch vụ của AWS.
[Construct Hub](https://constructs.dev/) là tài nguyên giúp bạn khám phá các cấu trúc bổ sung từ AWS, các bên thứ ba và cộng đồng mã nguồn mở.

## Tổng quan về AWS CDK Construct

Như bạn có thể thấy trong diagram ở trên, bạn có thể thấy nhiều stack được tạo thành từ nhiều construct, mỗi construct sẽ chứa nhiều tài nguyên AWS khác nhau.
Construct là thứ tiện lợi nhất mà AWS CDK mang lại cho các developer.

Có 3 cách để xây dựng các construct trong AWS CDK:

### L1 Construct

Về cơ bản, nó chính là các tài nguyên giống với CloudFormation, các thuộc tính được ánh xạ với các thuộc tính trong CloudFormation.
Nếu chúng ta chỉ sử dụng L1 Construct, thực sự thì không có lợi ích nào so với việc sử dụng CloudFormation.
Tuy nghiên, nếu L2 hoặc L3 Construct không cho phép bạn tùy chỉnh một thuộc tính nhất định thì bạn có thể khắc phục bằng cách sử dụng L1 Construct.

### L2 Construct

Là tài nguyên AWS được nhóm AWS CDK phát triển, đóng gói cấu trúc L1 bằng cách cài đặt các thuộc tính một cách tốt nhất về mặt bảo mật, tối ưu các giá trị mặc định cho tài nguyên.
Có thể coi đây như là các boilerplate cho các tài nguyên và bạn không cần hiểu quá rõ để tạo chúng trên AWS.
Lợi ích chính của cấu trúc L2 là bạn có thể tạo tài nguyên AWS một cách an toàn bằng một vài dòng mã.

### L3 Construct / Patterns

Hay còn được gọi là các mẫu (patterns) là một nhóm các cấu trúc L2 được kết hợp để cung cấp một giải pháp đầy đủ.
Ví dụ: bạn có thể nhóm nhiều tài nguyên lại với nhau để tạo thành 3 tiers web application, EC2 instances cho backend + frontend được liên kết với RDS và cuối cùng là Application Loadbalancer để cân bằng tải.
Bạn có thể khởi tạo nhóm tài nguyên này bằng cách một vài dòng code và nó giúp bạn có thể tái sử dụng các mẫu này trong nhiều dự án hoặc các stacks khác nhau.

## Những tính năng của AWS CDK

- Hỗ trợ nhiều ngôn ngữ lập trình phổ biến
- DRY, không phải lặp lại code cho những cụm tài nguyên được sử dụng nhiều trong dự án của bạn nhờ L2, L3 CDK Construct
- Khả năng tạo các template CloudFormation lớn với một vài dòng code, khả năng template hoá các cấu trúc, hệ thống được tái sử dụng nhiều lần 
- Lưu trữ cấu hình, config hạ tầng của bạn trong 1 repo, sử dụng 1 ứng dụng AWS CDK
- Đóng góp, phản hồi trực tiếp với đội phát triển vì là open source project 😌
- Sử dụng ngôn ngữ đã quen thuộc, viết logic để triển khai tài nguyên bằng chính ngôn ngữ đó và viết đc unit test (VD: Sử dụng vòng lặp để tạo 5 hàm lambda giống nhau mà không cần viết lại code 5 lần)

## AWS CDK với CloudFormation

Trong những ngày đầu tiên tiếp xúc với IaC (cụ thể là CloudFormation)
kiến thức cũng như kinh nghiệm làm việc rất ít được chia sẻ rộng rãi hoặc được thảo luận (có thể nó vẫn còn phức tạp).
Hầu hết tài liệu tìm được là ở trên các trang hướng dẫn của AWS, nhưng AWS CDK thì có cộng đồng rất lớn và chúng ta có hẳn một [thư viện Construct](https://constructs.dev/) để sử dụng.
Ngoài điểm khác biệt này này, AWS CDK còn một số điểm khác biệt so với CloudFormation:

- Sử dụng L2/L3 Construct sử dụng các cài đặt tốt nhất theo các best pracites khiến việc phát triển nhanh chóng và an toàn thay vì phải config setting cho từng tài nguyên như ở CloudFormation.
- Sử dụng ngôn ngữ lập trình thay vì sử dụng "ngôn ngữ" YAML hoặc JSON. Thời gian sử dụng ngôn ngữ lập trình có ích cho sự nghiệp của bạn hơn là viết YAML code cho CloudFormation 😅
- Một trong những selling point của AWS CDK

> 1500 lines of CloudFormation became 14 lines of CDK - It's important to understand that the
  deployed application still has 1500 lines' worth of operations and maintenance ownership, not 14
  &mdash; Ben Kehoe (@ben11kehoe)

Dù sao thì, AWS CDK chỉ là một cách tiếp cận khác và cuối cùng chúng ta vẫn cần tổng hợp thành một AWS CloudFormation template.
Chính vì vậy, bạn vẫn nên sử dụng các tool như [cfn-lint](https://www.google.com/search?q=cfn-lint&oq=cfn-lint&aqs=chrome..69i57.101j0j1&sourceid=chrome&ie=UTF-8)
hoặc [checkov](https://www.checkov.io/) để ngăn chặn việc cấu hình sai cho hệ thống của bạn.

Việc có một công cụ abstract CloudFormation như AWS CDK sẽ rất tốt nếu bạn thực sự hiểu những gì diễn ra ở phía sau.
Nếu bạn không hiểu CloudFormation làm như thể nào để triển khai các tài nguyên, bạn có thể mất nhiều thời gian hơn trong việc gỡ lỗi và không thể lý giải tại sao AWS CDK app của mình không hoạt động.

![Code của mình không chạy](https://vntechies.dev/_next/image?url=%2Fstatic%2Fimages%2Fassets%2Fcodedoesntwork.jpeg&w=640&q=75)

## Làm thế nào để bắt đầu với AWS CDK?

Để bắt đầu, bạn cần cài đặt AWS CDK toolkit bằng node package manager (npm), hướng dẫn cụ thể bạn có thể tham khảo ở bài viết dưới đây
[Hướng dẫn chi tiết cài đặt AWS CDK](https://vntechies.dev/courses/aws/cdk/huong-dan-chi-tiet-cai-dat-aws-cdk)

Ngắn gọn thì bạn cần chạy câu lệnh sau

```shell:shell
npm install -g aws-cdk
```

## AWS CDK good practices

- Tạo nhiều môi trường khác nhau bằng các tài khoản AWS riêng biệt (VD: Dev, Test, Stage, Prod) để triển khai những ứng dụng AWS CDK
- Thêm các integration test (tự động) trong pipeline để giảm thiểu khả năng thay đổi làm hỏng ứng dụng của bạn
- Sử dụng `cdk diff` để kiểm tra/review các thay đổi trước khi triển khai trên production.
- Phân tách stateful constructs chứa các tài nguyên như database, storage riêng biệt với các stateless constructs chứa các tài nguyên như API, ECS, Monitoring,... Từ đó bạn có thể bật chế độ bảo vệ (termination protection) cho các tài nguyên stateful và có thể an toàn xoá, tạo mới các stack chứa các tài nguyên stateless mà không cần lo việc mất dữ liệu.
- Các tài nguyên stateful thường sẽ bị thay thế khi đổi tên (tài nguyên hoặc constructs) nên không nên đặt các tài nguyên nào vào các constructs có khả năng cao sẽ bị di chuyển hoặc đổi tên (trừ khi dữ liệu có thể được tái tạo như cache). Đây chính là lý do chính đáng cho việc đặt các tài nguyên stateful và stack riêng chỉ chứa chúng.
- Dùng các cấu trúc điều khiển, điều kiện với ngôn ngữ lập trình bạn lựa chọn để khởi tạo Construct trong quá trình tổng hợp. Không dùng các logic của AWS CloudFormation Như Conditions, \{Fn:If\} hay Parameters,...

Tham khảo thêm [tài liệu chính thức](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html) để biết thêm một số good practices

## Công cụ lập trình cho AWS CDK

Dù bạn đã tiết kiệm rất nhiều thời gian khi sử dụng AWS CDK rồi nhưng những công cụ dưới đây còn giúp bạn tiết kiệm được nhiều thời gian và cải thiện workflow khi làm việc với AWS CDK:

- [AWS Toolkit for VS Code](https://aws.amazon.com/visualstudiocode/) - cho phép bạn dễ dàng access được các tài nguyên của ứng dụng AWS CDK dưới dạng cây

![AWS Toolkit for VS Code](https://github.com/aws/aws-toolkit-vscode/raw/HEAD/resources/marketplace/vscode/overview-aws-explorer.png)

- [Projen](https://github.com/projen/projen) - Là trình khởi tạo dự án AWS CDK (project generator) cho bạn bằng việc sử dụng các cấu hình tốt nhất cho dự án mới. Giúp bạn nhanh chóng phát triển dự án theo các quy chuẩn tốt nhất.
- [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) - cung cấp khả năng hoàn thành mã sử dụng AI khi xây dựng các Construct.
- [Cdk-nag](https://github.com/cdklabs/cdk-nag) - kiểm tra ứng dụng của bạn theo các quy tắc có sẵn hoặc best practices. Có thể tích hợp trong pipeline của bạn để chắc chắn những tiêu chuẩn cao nhất đối với các tài nguyên AWS được áp dụng khi bạn xây dựng và triển khai dự án.

## FAQ

**1. AWS CDK có tốt hơn Terraform**

Như đã nói ở đầu bài viết Terraform và CloudFormation sử dụng các tiếp cận khai báo (declarative) thay vì mệnh lệnh (imperative) như AWS CDK, đó là
điểm khác biệt lớn nhất. Cả 2 đều là những công cụ rất tốt và có hệ sinh thái, cộng đồng lớn để có thể triển khai các tài nguyên trên AWS. Một điểm nữa cần cân nhắc nếu bạn phải lựa chọn,
Terraform Sử dụng ngôn ngữ, syntax riêng cho việc viết code (HCL) còn với AWS CDK, bạn có thể lựa chọn ngôn ngữ mà bạn thấy phù hợp để làm việc cùng.
Trong một diễn biến khác, [Terraform cũng mới ra mắt CDK của riêng mình](https://www.terraform.io/cdktf)

**2. AWS CDK có phải là Infrastructure as Code (Iac)?**

Có, hệ thống trên AWS vẫn được tạo ra từ việc viết code và cụ thể là các CloudFormation template

**3. Tiềm năng của AWS CDK?**

Rất nhiều developer đã bắt đầu sử dụng AWS CDK, đây cũng là lý do cộng đồng của nó lớn mạnh hơn CloudFormation rất nhiều.
L2/L3 Construct giúp các lập trình viên không cần hiểu quá sâu về các dịch vụ của AWS cũng có thể tạo được các hệ thống theo những chuẩn tốt nhất.
Ngoài ra việc nó là một open source project cũng khiến tốc độ phát triển, lan rộng nhanh hơn nhiều. Việc chia sẻ các patterns/templates cũng trở nên dễ dàng hơn so với CloudFormation.

## Tổng kết

Trong bài viết này, bạn đã nắm được những khái niệm cơ bản của AWS CDK và cách nó giúp bạn cải thiện quy trình làm việc/xây dựng với các tài nguyên AWS. Bạn cũng đã hiểu cách nó làm việc với CloudFormation, những tính năng, lợi ích mà nó đem lại.

Các good practices và công cụ để bạn có thể vừa xây dựng hệ thống với những tiêu chuẩn tốt nhất mà không cần mất quá nhiều thời gian.

Nếu bạn muốn tìm hiểu sâu hơn, hãy tham khảo các [ví dụ của AWS CDK](https://github.com/aws-samples/aws-cdk-examples) và bắt đầu xây dựng các ứng dụng thực tế sử dụng AWS CDK qua [loạt bài viết của VNTechies](https://vntechies.dev/tags/aws-cdk-series) 😉

## Bài viết gốc

- [AWS CDK là gì? | VNTechies Dev Blog - Kho tài nguyên dành cho người Việt yêu công nghệ 👨‍💻👩‍💻](https://vntechies.dev/courses/aws/cdk/aws-cdk)

## References

- [What is the AWS CDK?](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [Best practices for developing and deploying cloud infrastructure with the AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html)
- [Examples](https://docs.aws.amazon.com/cdk/v2/guide/examples.html)
- [What is AWS CDK](https://towardsthecloud.com/aws-cdk)
- [Manage application security and compliance with the AWS Cloud Development Kit and cdk-nag](https://aws.amazon.com/blogs/devops/manage-application-security-and-compliance-with-the-aws-cloud-development-kit-and-cdk-nag/)
- [A No-Nonsense Guide To AWS Cloud Development Kit (CDK)](https://blog.phillipninan.com/a-no-nonsense-guide-to-aws-cloud-development-kit-cdk#key-cdk-terms)
- Hero photo by <a href="https://unsplash.com/@kirildobrev?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kiril Dobrev</a> on <a href="https://unsplash.com/s/photos/vietnam-school?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## VNTechies Dev Blog 🇻🇳 - Kho tài nguyên về Cloud ☁️ / DevOps 🚀
![](https://images.viblo.asia/1712f084-ee0f-47e8-b2a3-9af6cddf56f6.png)

- Website: https://vntechies.dev/
- Github repository: https://github.com/vntechies/blog
- Facebook: https://facebook.com/vntechies

Anh chị em hãy follow/ủng hộ VNTechies  để cập nhật những thông tin mới nhất về Cloud và DevOps nhé!