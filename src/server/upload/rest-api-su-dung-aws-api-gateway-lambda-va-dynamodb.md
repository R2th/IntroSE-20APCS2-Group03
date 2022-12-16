![](https://images.viblo.asia/021ae40c-2af3-41d7-9890-164095103931.png)

## Mục tiêu

Mục tiêu của chúng ta là tạo REST API đơn giản bằng cách sử dụng Amazon API gateway, Lambda và DynamoDB. Chúng ta sẽ thực hiện các request đến end-point API, các request này sẽ được tiếp nhận bằng API gateway. Sau đó, API gateway sẽ chuyển tiếp yêu cầu đến Lambda function. Tại đây, request được xử lý và nó thực hiện các action trên DynamoDB.

## API là gì ?

Theo [Redhat](https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces) , API là một tập hợp các định nghĩa và giao thức để xây dựng và tích hợp phần mềm ứng dụng. API là viết tắt của giao diện lập trình ứng dụng.
API cho phép sản phẩm hoặc dịch vụ của bạn giao tiếp với các sản phẩm và dịch vụ khác. Điều này giúp đơn giản hóa việc phát triển ứng dụng, tiết kiệm thời gian và chi phí.

## Amazon API Gateway

[AWS API Gateway](https://aws.amazon.com/api-gateway/#:~:text=Amazon%20API%20Gateway%20is%20a,secure%20APIs%20at%20any%20scale.&text=Using%20API%20Gateway%2C%20you%20can,time%20two%2Dway%20communication%20applications.) là một dịch vụ với đầy đủ các quyền quản lý giúp các nhà phát triển dễ dàng tạo, publish, maintain, theo dõi và bảo mật các API. API hoạt động như một cánh cửa đầu tiên để ứng dụng truy cập vào dữ liệu, logic nghiệp vụ hoặc chức năng từ các dịch vụ Backend. Nó xử lý tất cả các nhiệm vụ liên quan đến việc chấp nhận và xử lý hàng trăm hoặc hàng nghìn lệnh gọi API đồng thời, bao gồm quản lý lưu lượng, phân quyền, kiểm soát truy cập, giám sát và quản lý API.

## AWS Lambda

[AWS lambda](https://aws.amazon.com/lambda/) cho phép người dùng chạy code mà không cần cung cấp hoặc quản lý máy chủ. Người dùng sẽ phải trả tiền cho những gì mà họ sử dụng. Người dùng cũng có thể mở rộng và giảm quy mô của nó theo nhu cầu của mỗi người.

## Amazon DynamoDB

[Amazon DynamoDB](https://aws.amazon.com/dynamodb/)  là môt dịch vụ quản lý NoSQL có khả năng đáp ứng hiệu suất cao và nhanh kèm theo khả năng mở rộng. Amazon DynamoDB là cơ sở dữ liệu về khóa-giá trị và tài liệu, với hiệu năng hoạt động chỉ trong vài mili giây ở mọi quy mô. Đây là một cơ sở dữ liệu bền vững, đa hoạt tính, đa khu vực, được quản lý toàn phần, có tích hợp tính năng bảo mật, sao lưu, khôi phục và lưu vào bộ nhớ đệm cho các ứng dụng trên quy mô internet. Nó cho phép chúng ta tạo các bảng cơ sở dữ liệu có thể lưu trữ và truy xuất bất kỳ lượng dữ liệu nào. Nó cũng giải phóng khách hàng khỏi gánh nặng vận hành và mở rộng cơ sở dữ liệu phân tán.
Chúng ta hãy cùng bắt tay vào việc thiết kế các API nhé.

## Điều kiện tiên quyết

1. Bạn cần phải có một tài khoản AWS.
2. Bạn đã nắm được các kiến thức cơ bản về Node.js.
3. Postman hoặc CURL nên được cài đặt trong hệ thống của mình.

**Bước 1** : Vào bảng điều khiển DynamoDB và click vào **Create table** và nhập tên bảng là **myDB** và **khóa chính** là **id** có kiểu là **string** . Đây sẽ là khóa duy nhất của chúng ta cho dự án này. Tất cả các cài đặt còn lại trong trang đó sẽ được giữ nguyên theo mặc định và sau đó chúng tôi sẽ click vào **create** để tạo bảng. Sau khi bảng được tạo, chúng ta sẽ nhận được tên của các tài nguyên trên Amazon (Amazon Resource Name - ARN) trông như sau:

```
arn:aws:dynamodb:ap-south-1:123456789023:table/myDB
```

Lưu ý rằng **123456789023** là ID tài khoản AWS, ID này sẽ là duy nhất cho mỗi người.

**Bước 2** : Bây giờ chúng ta sẽ tạo chính sách truy cập IAM với định dạng JSON để cấp các quyền cần thiết trên bảng DynamoDB và CloudWatch Logs. Chúng ta sẽ đính kèm chính sách này với một vai trò và vai trò này sau đó sẽ được gắn vào Lambda Function, hàm này sẽ đảm nhận quyền truy cập cần thiết vào DynamoDB và CloudWatch Logs.

Bây giờ, chúng ta sẽ chuyển đến bảng điều khiển IAM và click vào **Policies** và sau đó click vào **create policy** . Chúng ta sẽ nhập nội dung sau vào trình chỉnh sửa dưới dạng JSON.

```
{  
  "Version": "2012-10-17",
  "Statement":[{
    "Effect": "Allow",
    "Action": [
     "dynamodb:BatchGetItem",
     "dynamodb:GetItem",
     "dynamodb:Query",
     "dynamodb:Scan",
     "dynamodb:BatchWriteItem",
     "dynamodb:PutItem",
     "dynamodb:UpdateItem"
    ],
    "Resource": "arn:aws:dynamodb:ap-south-1:123456789023:table/myDB"
   },
   {
    "Effect": "Allow",
    "Action": [
     "logs:CreateLogStream",
     "logs:PutLogEvents"
    ],
    "Resource": "arn:aws:logs:ap-south-1:123456789023:*"
   },
   {
    "Effect": "Allow",
    "Action": "logs:CreateLogGroup",
    "Resource": "*"
   }
  ]
 }
```

Sau đó, chúng tôi sẽ click vào **Review Policy** và sau đó nhập tên của chính sách là **policy_for_LambdaDdbApi** rồi click vào **Create Policy**.

* Bây giờ, chúng ta hãy cùng tìm hiểu policy trên. Thành phần đầu tiên của chính sách là `Version` - xác định phiên bản của chính sách mà chúng ta sử dụng. Yếu tố tiếp theo là `Statement`, là phần chính của chính sách và bao gồm rất nhiều thành phần.

* **Effect** - giá trị của nó sẽ là **Allow** hay **Deny** - dùng để xác định xem chúng ta có được cho phép thực hiện các quyền được định nghĩ trong **Action** đối với **Resource** hay không. Theo mặc định, quyền truy cập vào tài nguyên bị từ chối hoàn toàn. Trong ví dụ này, chúng ta sử dụng **Allow** vì chúng ta muốn cho phép các hành động được thực hiện trên hành động.
* **Action** - Mô tả các hành động. Mỗi dịch vụ AWS có một tập hợp các hành động được mô tả cho tác vụ mà chúng ta có thể thực hiện. Chúng ta sử dụng các hành động mà DynamoDB cung cấp. Để biết được định nghĩa của tất cả các hành động mà DynamoDB cung cấp, các bạn có thể tham khảo tại [đây](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations.html).
* **Resource** - Chỉ định đối tượng hoặc các đối tượng sẽ được thực hiện các action được định nghĩa trong **Action** bằng cách sử dụng tên tài nguyên của Amazon - Amazon Resource Names (ARN). Chúng ta sử dụng ARN để xác định tài nguyên AWS. Để xây dựng *Resource* của DynamoDB, chúng ta phải chỉ định dịch vụ AWS ( *dynamodb*), AWS region (*ap-south-1*), ID tài khoản AWS ( *123456789023*) và bảng (* table/myDB*).

Trong policy này, chúng ta đã tạo một statement thứ hai để cho phép truy cập vào **CloudWatch Logs** và để Lambda function có thể ghi vào tệp nhật ký, từ đó có thể dùng chúng để phân tích và khắc phục sự cố nếu có. Chúng ta đã sử dụng các thành phần tương tự như cho DynamoDB, nhưng đã thay đổi các giá trị sau:

* Đối với các **Action**, chúng ta đã sử dụng các hành động mà CloudWatch cho phép. Định nghĩa của tất cả các hành động có sẵn cho CloudWatch các bạn có thể tham khảo tại [đây](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Operations.html).
* Đối với **Resource**, chúng ta đã chỉ định tài khoản AWS mà chúng ta muốn cho phép Lambda function thực hiện việc ghi vào tệp nhật ký của nó. Như trong ví dụ trước cho DynamoDB, chúng ta phải sử dụng ARN cho CloudWatch Logs để chỉ định nơi cần cấp quyền truy cập. Để xây dựng Resource cho CloudWatch Logs, chúng ta phải chỉ định dịch vụ AWS (*logs*), AWS region (*ap-south-1*), ID tài khoản AWS (*123456789023*) và tất cả các nhóm nhật ký trong tài khoản này (***).

Chúng ta cũng đã tạo statement thứ ba để cho phép truy cập vào CloudWatch Logs để Lambda function có thể tạo nhóm nhật ký. Điều này là bắt buộc vì action *logs:CreateLogGroup* chỉ hỗ trợ tên phần tử ký tự đại diện. Chúng ta sử dụng các phần tử tương tự như cho DynamoDB, nhưng đã thay đổi các giá trị sau:

* Đối với **Action**, chúng tôi đã sử dụng các hành động CloudWatch cho phép.
* Đối với **Resource**, chúng tôi đã sử dụng ký tự đại diện **"*"** vì *logs:CreateLogGroup* chỉ hỗ trợ với ký tự đại diện.

**Bước 3** : Bây giờ, trong bảng điều khiển IAM, click vào **Roles** và sau đó **Create Roles**. Role này sẽ được tạo cho Lambda function. Vì vậy, hãy chọn Lambda từ phần lựa chọn dịch vụ. chúng ta sẽ tìm kiếm tên chính sách mà chúng ta vừa tạo ở trên, tức là *policyforLambdaDdbApi* và gắn nó vào **role** có tên là *roleforLambdaDdbApi*.

**Bước 4** : Bây giờ, chúng ta sẽ tạo Lambda function. Chúng ta sẽ vào Lambda console và nhấp vào **create function**. Chọn **Author from scratch**. Chúng ta sẽ đặt tên cho function là *funcLambdaDdbApi* . runtime sẽ được lựa chọn như **node.js12.x**. Trong phần **permission** , hãy chọn **Use an existing role** , sau đó từ dropdown menu, hãy chọn *roleforLambdaDdbApi* . Bằng cách này, chúng ta đã tích hợp bảng DynamoDB với Lambda function. Bây giờ, hãy click vào **create function** và viết mã hàm sau và triển khai nó nhé.

```
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {

    var operation = event.operation;

    if (event.tableName) {
        event.payload.TableName = event.tableName;
    }

    switch (operation) {
        case 'create':
            dynamo.put(event.payload, callback);
            break;
        case 'read':
            dynamo.get(event.payload, callback);
            break;
        default:
            callback('Unknown operation: ${operation}');
    }
};
```

Khi người dùng gửi một request, thì sẽ phải truyền những thông tin sau trong nội dung request:

* **operation** - thao tác muốn thực hiện trên cơ sở dữ liệu.
* **tableName** -  tên bảng thực hiện thao tác.
* **payload** - dữ liệu muốn insert hoặc đọc từ bảng.

Ba thứ trên sẽ được phân tích cú pháp bởi Lambda function và sẽ thực hiện các tác vụ như được định nghĩa trước đó.

**Bước 5** : Bây giờ, chúng ta phải tích hợp API Gateway với lambda function này. Chúng ta sẽ chuyển đến bảng điều khiển API Gateway và click vào Create **REST API** . Chúng ta sẽ nhập tên API là *apiforlambdaDdbAPi* . Các tùy chọn còn lại sẽ được giữ nguyên và sau đó chúng ta sẽ click vào **Create API**. Sau đó, từ dropdown menu **Actions** , chúng ta sẽ chọn **Create Resource**. Nhập tên tài nguyên là *myresource* và sau đó click vào **Create Resource**. Sau đó, một lần nữa từ dropdown menu **Actions** , hãy chọn **Create Method**. Chúng ta sẽ chọn phương thức **POST** . Trong phương pháp này, **integration type** sẽ là **Lambda function** . Trong phần **Lambda function name** , chúng ta sẽ nhập *funcLambdaDdbApi*, để tích hợp lambda function của chúng ta với API gateway này. Các trường còn lại sẽ được giữ nguyên. Sau đó, click vào **Save** . Bây giờ, chúng ta sẽ public API này. Từ dropdown **Actions**, chọn **deploy API** và nhập **deployment stage** là [new stage] và **stage name** là **Test** . Cuối cùng, click vào **deploy**. Chúng ta phải lưu ý về **URL API** mà chúng ta nhận được sau khi **deploy**, URL này sẽ giống như sau:

`https://xt657hawc4.execute-api.ap-south-1.amazonaws.com/test`

**Bước 6** : Bây giờ, dự án của chúng ta đã hoạt động và chúng ta sẽ kiểm tra nó bằng lệnh CURL. Chúng ta mở terminal và chạy hai lệnh sau:

```
curl -X POST -d '{"operation":"create","tableName":"myDB","payload":{"Item":{ "id":"1", "name":"Maverick", "movie":"Top Gun" }}}' https://xt59h6awc4.execute-api.ap-south-1.amazonaws.com/test/myresource
curl -X POST -d '{"operation":"create","tableName":"myDB","payload":{"Item":{ "id":"2", "name":"Tom Cruise" }}}' https://xt59h6awc4.execute-api.ap-south-1.amazonaws.com/test/myresource
```

Bây giờ, chúng ta sẽ chuyển đến bảng điều khiển DynamoDB và chúng ta sẽ thấy rằng payload của chúng ta đã được insert vào bảng.

![](https://images.viblo.asia/d5a40b1e-60ed-42b3-808f-fb6270719991.png)

Xin lưu ý rằng, DynamoDB không yêu cầu định nghĩa schema và do đó, không có thứ gì được gọi là **"column"**. Chúng ta chỉ có thể thêm một mặt hàng mới với một thuộc tính mới.

Bây giờ, chúng ta sẽ thực hiện thao tác đọc. Để làm được điều đó, hãy chạy các lệnh sau.

```
curl -X POST -d '{"operation": "read", "tableName": "myDB", "payload": {"Key": {"id": "1"}}}' https: // xt59h6awc4 .execute-api.ap-south-1.amazonaws.com / test / myresource
```

Output:

![](https://images.viblo.asia/8f6e7063-8cc0-4703-935a-4cb332eeac4b.png)

```
curl -X POST -d '{"operation": "read", "tableName": "myDB", "payload": {"Key": {"id": "2"}}}' https: // xt59h6awc4 .execute-api.ap-south-1.amazonaws.com / test / myresource
```

Output:

![](https://images.viblo.asia/703ec0d4-0f23-4ee0-ae49-49ca05f02b54.png)


## Tổng kết

Trong bài viết này, chúng tôi đã thảo luận về Amazon API Gateway, AWS lambda, Amazon DynamoDB và cuối cùng, chúng tôi đã tạo một API REST sử dụng tất cả ba dịch vụ AWS.

### Tài liệu tham khảo

https://medium.com/swlh/rest-api-using-aws-api-gateway-lambda-and-dynamodb-bc87fd695c5d
https://docs.aws.amazon.com/apigateway/index.html
https://aws.amazon.com/blogs/security/how-to-create-an-aws-iam-policy-to-grant-aws-lambda-access-to-an-amazon-dynamodb-table/
https://docs.aws.amazon.com/dynamodb/
https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces
https://docs.aws.amazon.com/lambda/index.html