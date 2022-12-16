Khi xây dựng một ứng dụng dạng serverless có sử dụng aws lambda và api gateway, chúng ta thường nghĩ ngay tới việc xây dựng một http api và loại dữ liệu thường được trả về cho phía client sẽ là `application/json` hoặc `application/xml`.

Nhưng, để thực hiện được một vài yêu cầu đặc biệt của dự án, phía server phải trả lại nội dung ở dạng binary (`image/png`, `audio/*`, ...). Yêu cầu đặc biệt có thể là từ việc phân quyền được đọc file phức tạp, hoặc do một đặc điểm nào đó.

Ví dụ: Endpoint `GET /users/avatar.png` sẽ trả lại ảnh của người dùng tương ứng, nội dung ảnh được quyết định bằng chuỗi token xác thực người dùng (gửi kèm trong http request).

Trong bài viết này chúng ta sẽ cùng xem làm thế nào để gửi dữ liệu dạng binary cho phía client sử dụng aws lambda function, api gateway và serverless framework.


![](https://images.viblo.asia/74c88ca5-b6b6-4a7d-b415-adf609704943.png)

# Ví dụ: Trả về avatar của user `GET /users/avatar.png`
Giả sử chúng ta đang xây dựng một dịch vụ, trong đó cần một chức năng trả lại ảnh avatar của user.
Đường dẫn để phía clien lấy ảnh avatar của user là `/users/avatar.png`, endpoint này dùng chung cho tất cả user và mỗi user chỉ xem được ảnh avatar của mình.

Chúng ta sẽ cùng giải quyết vấn đề, tôi mặc định các bạn đã có kiến thức cơ bản cho việc xây dựng một ứng dụng dạng serverless với aws lambda và api gateway.

## Lambda Function

Nội dung file hander cho api

`users.ts`

```javascript
...
export async function getUserAvatar(event: APIGatewayEvent) {
  try {
    let accessToken: string = event.headers.Authorization;
    let user: User = await UserService.getUserByAccessToken(accessToken);
    let avatarObjectId: string = await ResourceService.getAvatarObjectIdByUser(user);
    let avatarImgBuff: Buffer = await S3Service.getObjectById(avatarObjectId);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/png' },
      body: avatarImgBuff.toString('base64'),
      isBase64Encoded: true, // important
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}
...
```

Nội dung đoạn code đã khá rõ ràng, ở đây chúng ta viết bằng typescript và sử dụng Lambda runtime là Nodejs v8.10


Kết quả hàm trả về từ một `Lambda proxy integration` phải là một JSON object  gồm các thuộc tính `statusCode: number` - Quyết định http status code, `headers: {[string]: string}` - Http Custome Response Headers, `body: string` - JSON string.

Nhưng trong trường hợp này `body` không phải là một JSON string, mà lại là một `base64 encoded string` nên chúng ta sẽ set thêm một thuộc tính cho đối tượng trả về - `isBase64Encoded: true`

## API Gateway
Chúng ta cần cài đặt Api gateway để cho phép trả lại những `Conten-types` đặc biệt.

Chúng ta sẽ sử dụng một plugin của serverless framework để làm việc này -  [serverless-apigw-binary](https://github.com/maciejtreder/serverless-apigw-binary):

`npm install --save-dev serverless-apigw-binary`

Tiếp theo chúng ta phải thay đổi dung file `serverless.yml` để sử dụng và cấu hình cho plugin ở trên:

```yml
...
plugins:
  ...
  - serverless-apigw-binary

custom:
  apigwBinary:
    types:
      - 'image/png'
...
```

Như chúng ta thấy, chúng ta có thể liệt kê danh sách các `mime types` được cho phép như là `binary`.

Chúng ta cũng có thể sử dụng `ký tự đại diện` kiểu như `image/*` hoặc `*/*`.

Sau khi thực hiện deploy chúng ta có thể xem `binary types` đã được bật trong phần setting của Api gateway

![](https://images.viblo.asia/b014a7e9-3b09-4179-9860-ede1394cc6fa.png)


Trong trường hợp không sử dụng serverless framework, chúng ta cũng có thể cài đặt bằng tay những thông số này, bằng cách vào phần `settings` của api và thêm vào các mime types cần support.

![](https://images.viblo.asia/e9cf5334-6383-4abf-90cd-59c39a5190eb.png)

# Lưu ý
Nếu chúng ta sử dụng package `aws-serverless-express` để sử dụng một `express app` như một ứng dụng dạng serverless, chúng ta cần cấu hình rõ những mime sẽ được support dạng binary

```javascript
const binaryMimeTypes = [
  'image/png',
];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
```

Nếu trong project của chúng ta có sử dụng plugin `serverless-offline` để phát triển và debug ở local thì chúng ta cần plugin này ở version `v3.18.0` trở lên để được hỗ trợ tính năng binary response.

# Tham khảo
* [https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-payload-encodings.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-payload-encodings.html)
* [https://github.com/dherault/serverless-offline/releases/tag/v3.18.0](https://github.com/dherault/serverless-offline/releases/tag/v3.18.0)