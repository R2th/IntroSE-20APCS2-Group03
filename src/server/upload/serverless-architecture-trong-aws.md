Giống như AWS Lambdas, kiến trúc không máy chủ (Serverless Architecture) có tính năng vượt trội hơn nhiều so với Function as a Service (FaaS).

Một trong số những lý do khiến Lambdas thu hút người sử dụng là khả năng tự động mở rộng quy mô (vào & ra) và là mô hình định giá trả tiền cho mỗi lần sử dụng. Để có thể tận dụng hết các khả năng này và chạm tới toàn bộ các lợi ích của kiến trúc không máy chủ mang lại, chúng ta cần thêm các thành phần cơ sở hạ tầng khác có cùng tính linh hoạt.

***Một kiến trúc như vậy trong một dự án web sẽ có cấu trúc như thế nào?***

Tại [Theodo](https://www.theodo.fr/), serverless được sử dụng trong rất nhiều dự án. Một số dịch vụ và mô hình bắt đầu được sử dụng rộng rãi. Vì vậy, chúng tôi quyết định chia sẻ những thực tiễn đã trải nghiệm về kiến trúc này khi thực hiện nó trên một ứng dụng web.

![](https://images.viblo.asia/bd756d97-399b-4a1c-9380-1519fe27fe27.png)

Trong sơ đồ trên, một block sẽ biểu thị cho một miền hoặc một tính năng kỹ thuật được phân tách rõ ràng và có thể tìm thấy trong hầu hết các kiến trúc không máy chủ. Chúng không nhất định phải biểu thị cho các micro-services hoặc các stack trong thuật ngữ [CloudFormation](https://aws.amazon.com/cloudformation).

## Sử dụng đầy đủ các micro-services hướng event của AWS được viết bằng Typescript.

Mục tiêu của chúng tôi là có được một hệ thống quản lý mạnh mẽ với một trải nghiệm thoải mái cho các nhà phát triển. Để đạt được nó, chúng tôi cần:

### [Amazon Web Services](https://aws.amazon.com/)

Cuộc đua cạnh tranh đám mây giữa: AWS, GCP, Azure, IBM Cloud, Alibaba Cloud diễn ra rất mạnh mẽ. Tất cả họ đều có một số dịch vụ tuyệt vời và phát triển với một tốc độ chóng mặt.
Ben Ellerby đã so sánh 3 nhà cung cấp hàng đầu trong [bài viết](https://medium.com/serverless-transformation/choosing-the-right-cloud-provider-a-serverless-cloud-atlas-eeae672076ce) này và chúng tôi ủng hộ các giải pháp AWS.

Chúng là những máy chủ tân tiến nhất. Với các giải pháp AWS, chúng tôi tiến gần đến một kiến trúc không máy chủ hoàn toàn.Chi tiết từng dịch vụ AWS được kết hợp với các khối kiến trúc sẽ được trình bày chi tiết trong các phần tiếp theo của bài viết này.

### Node in TypeScript

JavaScript là một trong những ngôn ngữ lập trình phổ biến nhất trên toàn thế giới, do đó nó có một cộng đồng phát triển khá lớn (các số liệu thống kê trên [GitHub](https://octoverse.github.com/)). Thế giới không máy chủ không khác biệt quá nhiều so với quan sát này, theo [Datadog](https://www.datadoghq.com/state-of-serverless/), 39% trên toàn bộ các Lambdas được triển khai, hiện đang chạy trên JavaScript, mặc dù Python vẫn dẫn đầu với 47%. TypeScript đã đưa JS tiến thêm một bước và thêm một tầng bảo vệ tuyệt vời. Và cuối cùng, JavaScript trong Lambdas hoạt động hoàn hảo cho phần lớn các trường hợp đang sử dụng chúng.

### [Serverless Framework](https://www.serverless.com)

Nó thực hiện hầu hết các cơ sở hạ tầng cơ bản như Code (IaC) nâng nặng (trên đỉnh CloudFormation). Xác định một Lambda phản ứng với HTTP event, Serverless Framework (FW) sẽ tự động triển khai tài nguyên API Gateway có liên quan và route tương ứng cùng với Lambda mới. Và khi đạt đến giới hạn FW nhưng muốn có cấu hình dịch vụ phức tạp hơn, chúng tôi chỉ cần thêm một số CloudFormation.

### Chi tiết về các Lambda …

Lambda là một function, đảm nhận một job và thực hiện nó. Ví dụ: 
- Khi Front-end cần lấy danh sách các mặt hàng? Làm một Lambda cho nó.
- Cần gửi email xác nhận sau khi người dùng đã đăng ký? Làm một Lambda khác cho nó.

Tất nhiên với một số mã cụ thể (như data entities) có thể được factorised và chia sẻ trong thư mục chuyên dụng, nhưng hãy chú ý kỹ đến mã này, bởi vì khi thay đổi sẽ ảnh hưởng đến tất cả các Lambdas có liên quan; và vì Lambdas có thể được test và deploy độc lập nên chúng ta có thể sẽ bỏ lỡ điều gì đó.

### ... Phân tách trong các micro-services …

Để không có các nhóm chồng lên nhau, không có package.json và serverless.yml khổng lồ (CloudFormation có giới hạn 200 resources), thời gian triển khai CloudFormation dài "bất tận" và thực thi rõ ràng trách nhiệm giữa các Lambdas, chúng ta cần xác định ranh giới để phân tách dự án trong các Micro-Services. Ben Ellerby đã viết [ở đây](https://medium.com/serverless-transformation/eventbridge-storming-how-to-build-state-of-the-art-event-driven-serverless-architectures-e07270d4dee) về một loại workshop, EventBridge Storming, giúp xác định các ranh giới đó.

Trong repo đơn của chúng tôi: 
```
1 micro-service = 1 ngăn xếp CloudFormation = 1 serverless.yml + pack.json.
```
Ngoài ra, 1 micro-service sẽ làm chủ các thực thể dữ liệu của chính nó và không được chia sẻ với các micro-services khác.

Chúng tôi khuyến khích sử dụng full JavaScrip, nhưng có thể có nhiều lý do khiến bạn muốn sử dụng ngôn ngữ khác hoặc di chuyển dần dần sang serverless trong JavaScript: lợi thế cực lớn của micro-service trong serverless là bạn có thể dễ dàng trộn lẫn các công nghệ trong kiến trúc của bạn trong khi vẫn duy trì một kiến trúc dễ dàng và mạch lạc với các giao diện không thể biết giữa các micro-services.

### ... giao tiếp hướng Event 
![](https://images.viblo.asia/dc49f3e4-4cc7-4203-9da5-38e2d3e24383.png)

Các micro-services cần phải độc lập hoàn toàn với nhau, Nếu một trong số chúng ngừng hoạt động hoặc nếu chúng tôi đang thực hiện các thay đổi lớn ở một dịch vụ, thì tác động lên phần còn lại của hệ thống phải càng hạn chế càng tốt. Và để giải quyết vấn đề đó, Lambdas chỉ liên lạc với nhau thông qua [EventBridge](https://aws.amazon.com/eventbridge), một event bus không máy chủ. Trong [bài viết này](https://medium.com/serverless-transformation/eventbridge-the-key-component-in-serverless-architectures-e7d4e60fca2d), Ben Ellerby nói chi tiết về lý do tại sao EventBridge lại hữu ích như vậy.

## Mỗi loại tính năng sẽ yêu cầu một kiến trúc không máy chủ nhất định với các dịch vụ AWS cụ thể

### Frontend (development)
![](https://images.viblo.asia/bdb3008a-9e8f-4e96-aa1a-e16d8fed90cc.png)

Serverless backend làm thế nào để cung cấp một frontend? Để phát triển frontend với AWS, chúng tôi dùng [Amplify](https://aws.amazon.com/amplify). Amplify có một số công cụ CLI, công cụ IaC, SDK và một bộ các UI components. Tận dụng SDK JS frontend để tích hợp với các tài nguyên (ví dụ: Cognito để xác thực) được triển khai thông qua các công cụ IaC khác (như Serverless Framework) nhanh hơn.

### Website hosting
![](https://images.viblo.asia/99a218f3-96da-4c31-a7ac-ae15f35d55e7.png)

Hầu hết các website ngày nay là SPA, là các ứng dụng động có tính năng đầy đủ được đóng gói trong một tập các tệp tĩnh được trình duyệt của người dùng tải xuống khi truy cập URL đầu tiên. Trong môi trường AWS, chúng ta lưu trữ các tệp đó trên [S3](https://aws.amazon.com/s3) (một file storage) được hiển thị thông qua [CloudFront](https://aws.amazon.com/cloudfront) (Network phân phối nội dung (CDN)).

Xu hướng hiện tại rõ ràng đang nghiêng về các website Server(less) Side Rendering (SSR) như Next.js. Để thiết lập website SSR trong serverless, sử dụng [Lambda@Edge](https://aws.amazon.com/lambda/edge/) trong CloudFront. Điều này cho phép chúng ta thực hiện server-side rendering với Lambdas càng gần với người dùng cuối càng tốt. 
Tham khảo thêm [bài viết này](https://medium.com/serverless-transformation/what-a-typical-100-serverless-architecture-looks-like-in-aws-40f252cd0ecb).

### Tên miền và chứng chỉ (certificate)
![](https://images.viblo.asia/cd88ad3a-1c93-4d6f-a910-9610fdda079e.png)

Đối với website của chúng tôi, chúng tôi muốn thứ gì đó tốt hơn URL S3 được tạo tự động, để làm điều đó chúng tôi tạo và liên kết chứng chỉ của mình với CloudFront với [Certificate Manager](https://aws.amazon.com/certificate-manager) và quản lý tên miền với [Route 53](https://aws.amazon.com/route53/).

### Business API
![](https://images.viblo.asia/197461c7-ed82-43cc-8488-157cea0cd2e7.png)

Bây giờ, website của chúng tôi phải liên lạc với một back-end để lấy và đẩy dữ liệu. Để làm điều này, chúng tôi sử dụng [API Gateway](https://aws.amazon.com/api-gateway/) để xử lý các kết nối và tuyến đường HTTP, kích hoạt đồng bộ [Lambda](https://aws.amazon.com/lambda/) cho từng tuyến. Lambdas chứa business logic giao tiếp với [DynamoDB](https://aws.amazon.com/dynamodb/) để lưu trữ và sử dụng dữ liệu.

Như đã nói ở trên, chúng tôi hướng Event, điều đó có nghĩa là chúng tôi sẽ nhanh chóng phản hồi người dùng nhưng "đằng sau" vẫn tiếp tục xử lý các yêu cầu không đồng bộ. Ví dụ, DynamoDB hiển thị các luồng có thể kích hoạt không đồng bộ Lambda để phản ứng với bất kỳ thay đổi dữ liệu nào. Hầu hết các dịch vụ không máy chủ đều có khả năng tương tự.

Bản thân DynamoDB là một chủ đề rất lớn, trong [bài viết này](https://medium.com/serverless-transformation/how-to-remain-agile-with-dynamodb-eca44ff9817), Rob Cronin chia sẻ về một số mối quan tâm cơ bản liên quan đến cơ sở dữ liệu "khét tiếng" của NoQuery.

### Asynchronous tasks
![](https://images.viblo.asia/bba36016-4e3e-4b98-b500-1e440c7f6f6d.png)

Kiến trúc của chúng tôi đang hướng Event, do đó nhiều Lambdas không đồng bộ và được kích hoạt bởi các EventBridge events, S3 events, DynamoDB Streams, … Chúng tôi có thể có một Lambda không đồng bộ chịu trách nhiệm gửi email chào mừng khi đăng ký thành công.

Xử lý lỗi là rất quan trọng trong một hệ thống không đồng bộ phân tán. Vì vậy, đối với Lambdas async, chúng tôi sử dụng Dead Letter Queue ([DLQ](https://www.serverless.com/framework/docs/providers/aws/guide/functions/#dead-letter-queue-dlq)) và chuyển thông báo lỗi cuối cùng đầu tiên cho Simple Notification Service ([SNS](https://aws.amazon.com/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc)) sau đó chuyển nó đến Simple Queue Service ([SQS](https://aws.amazon.com/sqs/)). Chúng tôi phải làm điều đó ngay bây giờ vì nó chưa thể gắn trực tiếp SQS vào DLQ Lambda.

### Back-end to front-end push
![](https://images.viblo.asia/8cc5fb8d-7b4e-46a6-945e-8e4304704934.png)

Với các hoạt động không đồng bộ, frontend không còn có thể hiển thị loader trong khi chờ XHR response. Chúng tôi cần trạng thái chờ xử lý và đẩy dữ liệu từ backend. Để làm như vậy, sử dụng WebSocket API của API Gateway, giữ kết nối WebSocket tồn tại và chỉ kích hoạt Lambdas trên các messages. Tôi đã viết một [bài viết](https://medium.com/serverless-transformation/asynchronous-client-interaction-in-aws-serverless-polling-websocket-server-sent-events-or-acf10167cc67) chi tiết về lý do tại sao sử dụng WebSocket so với các giải pháp khác và cách để triển khai nó.

### File upload
![](https://images.viblo.asia/4bcdf5e3-9fd6-482c-9705-5a5d2abb8705.png)

Thay vì xử lý luồng file upload từ Lambda, có thể rất tốn kém, thì S3 cung cấp khả năng cho Lambdas tạo signed upload URL (được bảo mật), sẽ được sử dụng bởi giao diện người dùng để trực tiếp tải tệp lên S3. Như hầu hết các dịch vụ AWS, phần thú vị là Lambda không đồng bộ khác có thể lắng nghe một sự kiện thay đổi tệp S3 để xử lý mọi hoạt động tiếp theo.

### Người dùng và xác thực
![](https://images.viblo.asia/ffc4ffd4-bdc5-44a2-94f4-fa06ecd1c0c2.png)

[Cognito](https://aws.amazon.com/cognito/) có mọi thứ chúng ta cần: xác thực, quản lý người dùng, kiểm soát truy cập và tích hợp nhà cung cấp nhận dạng bên ngoài. Mặc dù được biết đến là một thứ khá phức tạp khi sử dụng nhưng nó có thể giúp ích rất nhiều cho chúng ta. Và như thường, nó có SDK chuyên dụng để Lambdas tương tác với nó và có thể gửi các Event kích hoạt Lambdas.

Trong ví dụ của chúng tôi, minh họa khả năng liên kết người ủy quyền Cognito với các tuyến đường API Gateway của [chúng tôi](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html). Chúng tôi cũng đã tiết lộ một Lambda để làm mới mã thông báo xác thực và một Lambda khác để lấy danh sách người dùng.

Mặc dù vậy, vẫn có một cảnh báo, Cognito chưa có nghĩa là cơ sở dữ liệu để quản lý toàn bộ thực thể người dùng của bạn, có một số giới hạn như số lượng thuộc tính có thể có. Nếu bạn cần một chút linh hoạt, bạn sẽ thích lưu trữ các thuộc tính tùy chỉnh trong DynamoDB.

### State machine
![](https://images.viblo.asia/5c1a351f-1dd9-44d4-9817-c0273ddb5c2b.png)

Trong một số tình huống, logic và luồng dữ liệu của chúng tôi có thể trở nên khá phức tạp.  Do có một thời gian khó khăn để theo dõi và cấu trúc những gì đang xảy ra nên thay vì vận hành luồng này trực tiếp bên trong Lambdas chúng tôi đã sử dụng một dịch vụ của AWS, đó là [Step Functions](https://aws.amazon.com/vi/step-functions/).

Khai báo máy trạng thái (State machine) thông qua CloudFormation: mọi bước và trạng thái tiếp theo, mọi kết quả mong đợi hoặc không mong đợi, và đính kèm với các bước đó một số hành động native (như wait hoặc choice) hoặc Lambda (trong một số [tích hợp](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-service-integrations.html)). Sau đó chúng ta có thể thấy machine chạy trực tiếp và trực quan (có logs) thông qua giao diện AWS. Tại mỗi step chúng ta có thể định nghĩa retry và xử lý lỗi. Ben Ellerby chi tiết hơn về dịch vụ trong [bài viết này](https://medium.com/serverless-transformation/b4f24997c8e2).

Để đưa ra một ví dụ cụ thể hơn, giả sử rằng chúng tôi muốn gửi một campaign email với SaaS và đảm bảo rằng campaign này đã được gửi:
- **Step 1 - Lambda:** yêu cầu SaaS gửi email campaign và lấy id campaign.
- **Step 2 - Task Token Lambda:** nhận callback token từ Step Function, liên kết nó với id campaign, sau đó chờ callback từ SaaS.
- **Step 3 (bên ngoài luồng) - Lambda:** được gọi bằng một hook từ SaaS khi thay đổi trạng thái campaign (đang chờ xử lý, lưu trữ, thất bại, thành công), tiếp tục lại luồng với trạng thái campaign bằng cách sử dụng callback token được liên kết.
- **Step 4 - Lựa chọn:** dựa trên trạng thái, nếu campaign chưa thành công, quay lại bước 2.
- **Step 5 (cuối cùng) - Lambda:** dựa trên campaign đã được gửi, cập nhật người dùng.
[Bài viết này](https://medium.com/@zaccharles/async-callbacks-with-aws-step-functions-and-task-tokens-9df97fe8973c) giải thích chi tiết cách thức hoạt động của Task Tokens.

### Bảo mật
![](https://images.viblo.asia/d0366972-7e63-4a57-846a-566fd522ac76.png)

Nhận dạng & Quản lý truy cập (Identity & Access Management - [IAM](https://aws.amazon.com/vi/iam/)) ở đây để giúp chúng tôi quản lý mức độ chi tiết tốt hơn cho bất kỳ quyền truy cập AWS nào, cho dù họ là nhà phát triển, CI / CD pipelines hoặc dịch vụ AWS liên kết với nhau. Lúc đầu, nó rất khó, nhưng nó có ưu điểm là khá mới và tinh tế, yêu cầu chúng tôi phải suy nghĩ kỹ về mọi hành động micro mà một "consumer" cụ thể nên được phép thực hiện. Điều đó có nghĩa là mọi tầng cơ sở hạ tầng của chúng tôi đều được bảo vệ theo mặc định. Ben Ellerby đã nói trong [ServerlessDays Nashville](https://www.youtube.com/watch?v=qhIzUHvllGw) về chủ đề này.

Liên quan tới data "sensitive", như SaaS API key, chúng tôi lưu trữ an toàn trong Parameter Store của [Systems Manager](https://aws.amazon.com/vi/systems-manager/). Và yêu cầu chúng từ bên trong các file Serverless và CloudFormation, hoặc thậm chí từ trong mã code với SDK được liên kết. Nó rất có ích khi [Secrets Manager](https://aws.amazon.com/vi/secrets-manager/) thực hiện một công việc tương tự. Và  [Key Management Service](https://aws.amazon.com/vi/kms/) (KMS) giúp chúng tôi quản lý các key mã hóa của mình.

### Monitoring
![](https://images.viblo.asia/835b728f-52db-4b94-a5ee-e74222383ec1.png)

[Cloudwatch](https://aws.amazon.com/vi/cloudwatch/) là dịch vụ giám sát thực tế. Tất cả các dịch vụ AWS đều có số liệu và nhật ký tự động cơ bản được gửi đến CloudWatch để cung cấp một số thông tin cơ bản. Chúng ta có thể đi sâu hơn: gửi số liệu và nhật ký tùy chỉnh, tạo bảng điều khiển, kích hoạt báo động theo ngưỡng, thực hiện các truy vấn phức tạp để tìm hiểu dữ liệu và hiển thị trong biểu đồ tùy chỉnh.

Chúng tôi vẫn đang tìm kiếm các lựa chọn khác. Ví dụ, [X-Ray](https://aws.amazon.com/vi/xray/) với mục tiêu là theo dõi các request từ đầu đến cuối thông qua toàn bộ hệ thống phân tán, sau đó thể hiện nó theo cách trực quan và sinh động. Chỉ có điều tại thời điểm theo dõi này bị mất vì một số dịch vụ như EventBridge (vốn là trung tâm trong kiến ​​trúc) chưa được hỗ trợ. Một dịch vụ khác, [ServiceLens](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ServiceLens.html), được xây dựng dựa trên X-Ray và CloudWatch. Ngoài ra còn có một số giải pháp bên ngoài (đến AWS) đầy hứa hẹn như Thundra, Epsagon hoặc Lumigo, nhưng chúng tôi chưa có cơ hội để thử chúng.

Nếu bạn muốn cải thiện khả năng quan sát và development tại local của mình, bạn chắc chắn nên thử [Serverless-Dev-Tools](https://theodo-uk.github.io/sls-dev-tools/).

## Nguồn 
[What a typical 100% Serverless Architecture looks like in AWS!](https://medium.com/serverless-transformation/what-a-typical-100-serverless-architecture-looks-like-in-aws-40f252cd0ecb)