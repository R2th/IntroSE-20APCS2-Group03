![](https://images.viblo.asia/ca30dda8-f25a-47ad-8175-40384b9c4c82.png)

**Xin chào tất cả các bạn, ở bài trước, sau khi đã tìm hiểu [Serverless là gì](https://trungquandev.com/xin-chao-serverless-chung-ta-lam-quen-voi-nhau-nhe/), hôm nay chúng ta sẽ cùng nhau đi xây dựng một REST API sử dụng giao diện điều khiển web console của aws amazon nhé.**

**"Bài này thuộc bài số 02 trong loạt bài [Xây dựng các ứng dụng không máy chủ với Nodejs, AWS Lambda, API Gateway, Serverless Framework và DynamoDB](https://trungquandev.com/xay-dung-cac-ung-dung-khong-may-chu-voi-nodejs-aws-lambda-api-gateway-serverless-framework-va-dynamodb/)"**

Những nội dung có trong bài này:

*1. Chuẩn bị một tài khoản AWS.*

*2. Tạo API trong API Gateway và cấu hình tới dịch vụ Lambda Function.*

-----

### 1. Chuẩn bị một tài khoản AWS.

Bước đầu tiên, chắc chắn rồi, chúng ta phải có một tài khoản AWS, các bạn vào link sau để đăng ký tài khoản:

[https://portal.aws.amazon.com/billing/signup#/start](https://portal.aws.amazon.com/billing/signup#/start)

![](https://images.viblo.asia/f3513767-9a8b-4bcd-b94c-bf2afaf99203.png)

Mặc định mình sẽ coi như các bạn đã làm qua bước này rồi vì cũng khó để mả hướng dẫn chi tiết phần này được. Mình có một số lưu ý sau cho các bạn chuẩn bị trước:

Như ở hình trên sau khi vào link đăng ký, các bạn có thể thấy Amazon cho chúng ta sử dụng 12 tháng gói miễn phí có giới hạn bao gồm khá nhiều dịch vụ như EC2, S3, DynamoDB, CodeBuild... Các bạn có thể nghiên cứu kỹ gói miễn phí giới hạn đó tại link này:
[https://aws.amazon.com/vi/free/](https://aws.amazon.com/vi/free/)

Để đăng ký được tài khoản **AWS** và nhận gói free trên thì bạn phải có một cái **thẻ VISA** thanh toán quốc tế, **debit** hay **credit** đều được. Và trong thẻ phải có ít nhất **$ 1** để Amazon xác nhận tài khoản, số tiền này sẽ được trả lại cho bạn sau vài ngày, như lần mình đăng ký thì 7 ngày sau nó mới trả lại tiền (slowmotion) (khoc)
Và một lưu ý nữa trong phần này đó là gói miễn phí thì sẽ có một số dịch vụ chỉ có thể dùng ở **Location bên Mỹ**, ví dụ như **CodeBuild**, nếu chọn location là **Singapore** thì sẽ không sử dụng được. Yên tâm mình sẽ nói kỹ hơn cái này ở những bài tiếp theo.

-----

### 2. Tạo API trong API Gateway và cấu hình tới dịch vụ Lambda Function.

Sau khi đã có tài khoản và [đăng nhập vào AWS Web Console](https://console.aws.amazon.com/console/home), chọn dịch vụ **API Gateway**. (Ấn vào mục Services gõ tìm kiếm API Gateway là sẽ thấy.)

Chọn button **Create new API**, còn với tài khoản mới chưa tạo API nào thì bạn sẽ thấy màn hình **Get Started** như dưới đây.

![](https://images.viblo.asia/6de487aa-246d-4528-be8d-91e262ad796e.png)

Có một vài cách để tạo API như **Clone** từ một API có sẵn, **Import** từ Swagger hoặc tham khảo từ một **API mẫu** của AWS, ở đây chúng ta đang tạo mới nên mình sẽ chọn **New API**:

**API name***: Tên của API - Get adorable cats

**Description**: Mô tả API.

**Enpoint type**: Nơi mà API của sẽ được deploy, trong bài này mình sẽ chọn Regional, và có 3 option trong phần này mình giải thích tóm tắt lại, đó là:

**Regional**: API sẽ được deploy ở vùng hiện tại, cụ thể mình đang để là US East (N. Virginia)

**Edge optimized**: API sẽ được deploy đến mạng phân phối Cloudfront của AWS.

**Private**: API chỉ có thể truy cập từ VPCs (Amazon Virtual Private Cloud)

![](https://images.viblo.asia/baf2332e-b8ab-4486-8dcb-52a7e4cdb71e.png)

Nhấn **Create API**, sang bước kế tiếp, trong bảng điều khiển của API **Get adorable cats** mình vừa tạo, chọn **Resources > Actions > Create resource**

![](https://images.viblo.asia/d6605e28-b15e-4641-b4a1-474ce591aec0.png)

Làm tiếp bước nhập **name + path** cho resource, mình nhập nó là **cats**, rồi nhấn **Create resource**

![](https://images.viblo.asia/4613fd18-195d-491a-9651-abec02b6fa56.png)

Việc tiếp theo là chúng ta cần định nghĩa **method** cho **resource** này, mình sẽ tạo một **method GET** để lấy ra thông tin những con mèo. Đứng từ resource **cats**, chọn **Action > Create method**

![](https://images.viblo.asia/9871df98-fb90-4440-bb12-02206c973342.png)

**Chọn method GET:**

![](https://images.viblo.asia/91201e04-8804-4e95-9120-49efa133ecde.png)

Có method rồi, bây giờ cần cấu hình **dịch vụ backend** mà sẽ trả về dữ liệu khi chúng ta gọi đến phương thức GET này, có nhiều dịch vụ như **Lambda function**, một **HTTP enpoint** hiện có, **Mock** (giả lập nội dung trả về) hoặc nhiều dịch vụ khác của **AWS**...vv. Mình sẽ chọn **Lambda function** làm backend.

![](https://images.viblo.asia/7db8961b-e557-44d5-b433-31e7674ea8d5.png)

Vì chưa có function nào ở dịch vụ Lambda nên bạn sẽ thấy dòng thông báo như trên, click vào **Create a Lambda Function** để sang tab mới của dịch vụ này. Tab **API Gateway** thì bạn cứ giữ nguyên, lát nữa sau khi tạo xong lambda function thì chúng ta sẽ quay lại.

**Trước khi tạo Function Lambda**, chúng ta cần tạo một cái **role** để cấp quyền thực thi lambda. Truy cập vào một service tên là **IAM > Roles > Create role**

Chọn **type** là **AWS service**, dịch vụ là **Lambda** như hình dưới, rồi **Next: Permissions**

![](https://images.viblo.asia/e3999b2a-28f5-4c07-93ce-ff9105c1b108.png)

Các bạn tìm và chọn cho mình một cái **Policy** có tên là **AWSLambdaFullAccess**, rồi **Next: Tags**

![](https://images.viblo.asia/9641cda4-da9c-4562-acb7-b6f631e5e246.png)

**Bước thêm tags thì các bạn bỏ qua, sang phần Next: Review luôn**

Trong bước **review**, mình nhập tên cho cái role này là **execute-lambda-full-access**, rồi nhấn **Create role**

![](https://images.viblo.asia/8eff10f1-0f3c-4328-88f2-beb84f547187.png)

Bây giờ quay lại màn hình tạo function Lambda - **Create Lambda function**, chọn **Author from scratch**, nhập các thông tin như hình dưới rồi ấn **Create function.**

**Name**: Tên của function - **getCats**

**Runtime**: Môi trường chạy, mình chọn **Node.js 8.10**, phiên bản nodejs cao nhất mà AWS hỗ trợ ở thời điểm hiện tại.

**Role**: chọn cái role mà chúng ta vừa tạo ở trên **service-role/execute-lambda-full-access**

![](https://images.viblo.asia/cf464fe3-d170-4113-ae8f-066423a5d9d4.png)

Tiếp theo là viết code cho **function getCats** này, mình sẽ viết một đoạn code đơn giản trả về một mảng danh sách 2 con mèo dưới dạng chuỗi json.

![](https://images.viblo.asia/93ea48df-5d38-4651-8f0f-0891e47e422e.png)

```javascript
/**
 * Created by trungquandev.com's author on 25/08/2018.
 */
exports.handler = async (event, context, callback) => {
    let cats = [
        {
            id: 1,
            name: "British Shorthair",
            gender: "Male",
            tagDefault: "#trungquandev"
        },
        {
            id: 2,
            name: "Russian Blue",
            gender: "Female",
            tagDefault: "#trungquandev"
        }
    ];
    
    callback(null, {
        statusCode: 200,
        body: {
            cats: cats
        }
    });
};
```

Nhấn **Save** để lưu  function.

Quay lại màn hình **API Gateway** ban nãy, nhập tên function vừa tạo vào phần **Lambda function** rồi nhấn **Save**. **AWS** sẽ hỏi bạn **Add Permission to Lambda Function** thì cứ ấn **ok**.

![](https://images.viblo.asia/fef9de87-c26e-484a-bfe6-b1fb0f4e99aa.png)

Sau một hồi hại não với mấy cái cấu hình này thì bây giờ đã có kết quả rồi :D

![](https://images.viblo.asia/2619b7ac-93c9-41f7-9a8e-0f854eb6eb5b.png)

Hiện tại chúng ta đã có thể **test API trước khi deploy**, ấn vào **nút Test** như hình trên, vì API chúng ta tạo ở đây không có yêu cầu gì về **query string** hay **header, body** gì cả nên cứ để trống và test, kết quả trả về đúng như những gì đã code ban nãy :D

![](https://images.viblo.asia/a8b15b7b-b43a-4fe7-a23d-93fee198c2bc.png)

Tới bước cuối cùng, **deploy API** này cho thế giới bên ngoài biết :v

Chọn **Action > Deploy API**

![](https://images.viblo.asia/50a9938b-8f29-451f-9b0c-400541362111.png)

Nó lại còn bắt mình nhập **stage** nữa, nhiều bước quá **(khoc)**, đại loại stage là sẽ nhập tên với mô tả giai đoạn mà chúng ta triển khai API, dạng như giai đoạn thử nghiệm, giai đoạn đưa ra thị trường gì gì đấy...

![](https://images.viblo.asia/7bc56e74-a112-4d49-862a-1c72638754a5.png)

Xong rồi ấn **Deploy**. Bạn sẽ nhận được **URL của API** tương tự như thế này:

![](https://images.viblo.asia/f7ac7d48-68ca-47bf-832f-803b544f1314.png)

Bây giờ ra trình duyệt **mở URL** đó lên hoặc dùng **Postman** test thử sẽ nhận được kết quả:

![](https://images.viblo.asia/52e2fe09-dbc8-464b-8e61-6db73af1055d.png)

-----

Xong rồi đó, khá nhiều công đoạn phải không, bài kế tiếp chúng ta sẽ không dùng nhiều tới giao diện **Web Console** này nữa mà sẽ đi xây dựng một **CRUD API** sử dụng **Serverless Framework**.

*Xin chào và hẹn gặp lại các bạn ở những bài viết tiếp theo.*

**[Best Regards – Trung Quân – Green Cat](https://trungquandev.com)**