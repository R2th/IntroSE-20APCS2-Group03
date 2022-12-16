Tiếp theo bài của 2 phần trước

[Phần 01](https://viblo.asia/p/serverless-typescript-voi-aws-lambda-api-gateway-va-dynamodb-tren-moi-truong-offline-phan-01-3P0lPk7PZox)

[Phần 02](https://viblo.asia/p/serverless-typescript-voi-aws-lambda-api-gateway-va-dynamodb-tren-moi-truong-offline-phan-02-yMnKMypEK7P)

Do ngại đổi tên bài viết nên mình thêm bằng tag: S3

Trong bài này chúng ta sẽ sử dụng dịch vụ S3 của AWS.
# Giới thiệu
Lần này yêu cầu bài toán được mở rộng: Cần một API để cập nhật thông tin của một con mèo. Thông tin cập nhật lần này là video về con mèo (không biết video gì luôn), mỗi video có độ dài khoảng 2 giờ.

Thông tin video được lưu vào thông tin của con mèo tương ứng và video phải được lưu trữ để có thể xem được.

Khách hàng ra feature này cũng không có gì đặc biệt, chúng ta sẽ có một API để client upload file lên rồi Lambda function sẽ upload file đó lên S3 (là một Backend as a service của AWS), lưu thông tin vào bản ghi của con mèo tương ứng (ez).

Nhưng khoan đã, có gì đó không ổn ở đây "mỗi video có độ dài khoảng 2h", mỗi video sẽ "nặng" tầm trên 4 GB là chắc luôn, à không những thanh niên "chơi mèo" sẽ upload những video rất chất lượng, vậy sẽ tầm 10 GB.

Giới hạn của Lambda function bao gồm: **Ephemeral disk capacity ("/tmp" space): 512 MB** :|, Maximum execution duration per request: 300 seconds, Memory allocation range: 	Minimum = 128 MB / Maximum = 3008 MB (with 64 MB increments). If the maximum memory use is exceeded, function invocation will be terminated.

Tình hình có vẻ đang căng, không lẽ phải làm một con service khác chuyên làm nhiệm vụ chuyển file upload, sẽ tốn kém rất nhiều, việc xác thực giữa các serivce sẽ trở nên khó khăn. **Backend as a service** đúng rồi, S3 là một backend rồi mà, nó sẽ phải làm hết mọi việc haha, mình là người trả tiền thuê nó mà.

Ok, client sẽ upload file trực tiếp lên S3, rồi báo lại kết quả cho server qua API. Vẫn còn các vấn đề, để client trực tiếp làm việc với S3 chúng ta sẽ phải public clientID và SecretKey (X), hoặc tạo một `CognitoIdentityCredentials` để xác thực quyền truy cập, (nhưng chúng ta lại chưa cấu hình ứng dụng sử dụng Cognito để quản lý người dùng) vậy không lẽ để `CognitoIdentityCredentials` là `unauthenticated`. Thông tin S3 bucket với `IdentityPoolId` mà lộ ra thì "trẻ con" có thể lợi dụng để upload game lên service của mình để lưu trữ chùa :(.

Đọc lướt tài liệu của S3, đúng là service xịn có khác. S3 cung cấp phương thức để tạo ra các `Signed PUT Url`, các url này được ký bởi S3 các thông tin được ký lên bao gồm tên file vào lọai file (còn mấy thứ khác nữa như là ACL....), url này có thể được dùng để upload file đã được đăng ký cho S3 lên S3 từ bất kỳ đâu (khoc2)

Chúng ta sẽ có flow như thế này:
1. Client gửi thông tin file cần upload lên service bằng API `GET /api/v1/cats/videouploadurl`
2. API trả lại thông tin cho client: `{"signedRequest":"signedRequestURl","url":"https://${S3_BUCKET}.s3.amazonaws.com/${fileName}"}`, thông tin `Signed PUT Url`, và thông tin url nếu upload file thành công.
3. Client cập nhật thông tin cho con mèo tương ứng: `PUT /api/v1/cats/:id/videos`, thông tin gửi kèm `{"url":"https://${S3_BUCKET}.s3.amazonaws.com/${fileName}"}`
4. Cập nhật thông tin video cho con mèo.

# Thực hiện
Chúng ta vẫn sẽ sử dụng lại phần code của 2 bài trước.
## Định nghĩa S3 Bucket cho serverless
Chúng ta có thể tạo S3 Bucket bằng S3 console, nhưng theo mình thì chúng ta nên định nghĩa luôn trong cấu hình serverless.
Thêm mới một đối tượng trong phần `resources` của file `serverless.yml`
```yml
...
    videoUploadBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: meo_videos
        AccessControl: PublicRead
        CorsConfiguration:
          CorsRules:
          - AllowedMethods:
            - GET
            - PUT
            - POST
            - HEAD
            AllowedOrigins:
            - "*"
            AllowedHeaders:
            - "*"
```
Chúng ta phải nhớ phân quyền cho execute function role được "làm việc" trên s3 bucket chúng ta vừa mới tạo.
Mình sẽ cấu hình như thế này (yaoming)
```
    - Effect: "Allow"
      Action:
        - "s3:*"
      Resource: "arn:aws:s3:::meo_videos/*"
```
**!!!** Việc quản lý và phân quyền cho các dịch vụ trên aws là việc rất cần thiết, chúng ta chỉ nên `Allow` những action được dùng trên tài nguyên chỉ định cho một service khác. Trong bài này mình chỉ viết ví dụ nên mình để * , dù Lambda function của mình chỉ dùng mỗi action: `getSignedUrl`

## GET /api/v1/cats/videouploadurl
Chúng ta cần một helper để làm việc với dịch vụ S3 của AWS, bộ aws-sdk đã có đầy đủ các phương thức đủ để làm với S3, nhưng chúng ta lại cần phải phát triển ngay trên môi trường offline, nên chúng ta cần cấu hình một chút.

### S3
Tạo thư mới một thư mục `s3` trong `src/shared/`
Trong thư mục đó chúng ta sẽ tạo một ra một Interface mô tả các hàm của S3 helper
`IS3Helper.ts`
```typescript
interface IS3Helper {
  getSignedUrl(bucketName: string,
               file: { name: string, type: string },
               option?: {expires?: number, acl?: string}
               ): Promise<string>;
}

export default IS3Helper;
```

Một class hiện thực của interface trên:
`S3Helper.ts`
```typescript
import IS3Helper from "./IS3Helper";
import {S3} from "aws-sdk";

class S3Helper implements IS3Helper {
  private s3: S3;

  constructor() {
    if (process.env.S3_ENDPOINT) {
      this.s3 = new S3({
        apiVersion: "2006-03-01",
        endpoint: process.env.S3_ENDPOINT,
      });
    } else {
      this.s3 = new S3({
        apiVersion: "2006-03-01",
      });
    }
  }

  public getSignedUrl(bucketName: string, file: { name: string; type: string }, option?: { expires?: number; acl?: string }): Promise<string> {
    let params = {
      Bucket: bucketName,
      Key: file.name,
      ContentType: file.type,
      Expires: option && option.expires || 60,
      ACL: option && option.acl || "public-read",
    };
    return new Promise<string>((resolve, reject) => {
      this.s3.getSignedUrl("putObject", params, (err, url) => {
        if (err) {
          return reject(err);
        }
        resolve(url);
      });
    });
  }
}

export default S3Helper;
```

Chúng ta sẽ cần giả lập dịch vụ S3 ở môi trường offline, đó là lý do có thêm option endpoint khi khởi tạo đối tượng `s3` trong constructor của class.

Chúng ta phát triển ở môi trường offline nên những dịch vụ kiểu như S3 sẽ gây ra khá nhiều khó khăn cho việc dev và đặc biệt là test. Vì vậy chúng ta sẽ viết thêm một mock class cho `S3Helper` để thực việc phát triển offline dễ dàng hơn.
`S3HelperMock.ts`
```typescript
import S3Helper from "./S3Helper";

class S3HelperMock extends S3Helper {
  public getSignedUrl(bucketName: string, file: { name: string; type: string }, option?: { expires?: number; acl?: string }): Promise<string> {
    return Promise.resolve("https://s3.aws.com/yaoming");
  }
}

export default S3HelperMock;
```

Cuối cùng là một factory để lấy ra s3Helper thích hợp
`s3Factory.ts`
```typescript
import IS3Helper from "./IS3Helper";
import S3Helper from "./S3Helper";
import S3HelperMock from "./S3HelperMock";

class S3Factory {
  private s3Helper: IS3Helper;

  constructor() {
    if (process.env.S3_MOCK === "true") {
      this.s3Helper = new S3HelperMock();
    } else {
      this.s3Helper = new S3Helper();
    }
  }

  public getS3Helper(): IS3Helper {
    return this.s3Helper;
  }
}

export default new S3Factory().getS3Helper();
```

Chúng ta có sử dụng một class mock các tính năng của `s3Helper`, nên việc viết unit test cho class `S3Helper` là rất cần thiết. Để giả lập dịch vụ S3 ở dưới môi trường local chúng ta có thể sử dụng local-stack https://github.com/localstack/localstack Việc cài đặt và sử dụng cũng không có gì quá phức tạp (bow).

Nếu sử dụng local-stack thì dịch vụ S3 sẽ chạy ở địa chỉ http://localhost:4572 , chúng ta cần set giá trị cho biến môi trường `S3_ENDPOINT=http://localhost:4572`

###  Cat module
Chúng ta quay lại với cat module, một request để lấy signed url sẽ có dạng `GET /api/v1/cats/videouploadurl?file-name=${name}&file-type=${type}`

Trong `CatsController` chúng ta thêm một phương thức để xử lý api này
```typescript
...
public async getVideoUploadUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    // valid file-type
    const bucket = process.env.BUCKET_CAT_VIDEO || "meo_videos";
    let signedRequest = await s3Helper.getSignedUrl(bucket, {name: fileName, type: fileType});
    res.status(200).json({
      data: {
        signedRequest,
        url: `https://${bucket}.s3.amazonaws.com/${fileName}`
      },
      message: 'success',
      status: res.status,
    });
  } catch (err) {
    next(err);
  }
}
...
```

Cập nhật lại route
```typescript
...
  private init(): void {
    this.route
      .post('/', this.create)
      .get('/videouploadurl', this.getVideoUploadUrl)
      .get('/:id', this.findById);
  }
 ...
```

Còn một api nữa là cập nhật thông tin link video cho đối tượng mèo theo id, các bạn sẽ tự viết :D

###  Client browser
Phần html form để upload file mình tạm thời bỏ qua :D

Tập trung vào các phần xử lý bằng js

Xử lý cho sự kiện chọn file để upload
```javascript
(() => {
  document.getElementById("file-input").onchange = () => {
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  };
})();
```

Xử lý lấy signed url 
```
function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://domain.com/api/v1/cats/videouploadurl?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}
```

Upload file
```
function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('preview').src = url;
        document.getElementById('avatar-url').value = url;
        // TODO: request update cat info
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
```

# Kết thúc
Hy vọng bài viết sẽ giúp người đọc có thêm các ý tưởng, từ khóa hay để phục vụ cho công việc và các bài viết thuộc series này có thể sẽ giúp việc sử dụng những dịch vụ của aws trở nên đơn giản hơn!