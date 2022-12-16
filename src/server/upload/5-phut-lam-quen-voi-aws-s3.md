Amazon S3 là dịch vụ lưu trữ đối tượng được xây dựng để lưu trữ và truy xuất dữ liệu với khối lượng bất kỳ từ bất cứ nơi nào trên Internet. Đây là dịch vụ lưu trữ đơn giản cung cấp hạ tầng lưu trữ dữ liệu có độ bền, độ khả dụng cực cao và quy mô vô cùng linh hoạt với chi phí rất thấp. 

S3 không giới hạn số lượng files cũng như tổng dung lượng các files mà bạn tải lên. Đối với file được tải lên bằng PUT API thông thường, giới hạn dung lượng là 5GB. Đối với file sử dụng tính năng `Upload objects in parts` - tức là tải lên thành nhiều parts thì giới hạn dung lượng là 5TB. Amazon khuyến cáo nên sử dụng `Upload objects in parts` đối với các files có dung lượng trên 100MB.

**Mức phí**: Sau khi đăng ký, khách hàng mới của AWS được nhận 5GB dung lượng lưu trữ thuộc lớp lưu trữ Tiêu chuẩn S3 của Amazon S3; 20.000 yêu cầu GET; 2.000 yêu cầu PUT, COPY, POST hoặc LIST và 15GB Truyền dữ liệu ra mỗi tháng trong một năm. 
Khi vượt mức miễn phí kia bạn sẽ mất khoảng 0,025 USD/GB lưu trữ.

## 1. Bucket

Bucket là một đơn vị lưu trữ logic trong S3. Chứa các đối tượng bao gồm dữ liệu và siêu dữ liệu. Bạn cần phải tạo Bucket để có thể lưu trữ dữ liệu của mình.

#### a. Tạo bằng cơm

Cái này khá đơn giản, bạn đăng nhập vào service S3 của Amazon, chọn **Create bucket** rồi Next, Next,... để `Configure options` cũng như `Set permission` là xong :laughing::laughing::laughing:

![](https://images.viblo.asia/226a9655-7610-4d6f-a854-68bf1bbb58a4.png)

#### b. Tạo bằng code

Thời đại DevOps lên ngôi, anh em ta cũng phải học đòi một xíu. Không thể cái gì cũng chạy bằng cơm mãi được.

Đoạn này mình code bằng Node.js nha, các thím ngôn ngữ khác tự mày mò đọc [docs](https://aws.amazon.com/vi/getting-started/tools-sdks/) :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Đầu tiên, bạn phải tải hoặc tạo file `credentials`  cho AWS. Mặc định khi SDK được tải về nó sẽ load file này như sau:
- Linux, Unix, and macOS: `~/.aws/credentials`
- Windows: `C:\Users\USER_NAME\.aws\credentials`

Truy cập vào [đây](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) để xem hướng dẫn nếu bạn chưa biết cách tạo `credentials`

File này sẽ có dạng:
```
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

Nếu bạn không muốn lưu file `credentials`:
```
const s3  = new AWS.S3({
  accessKeyId: '<ACCESS_KEY_ID>' , // Replace with your access key id
  secretAccessKey: '<SECRET_ACCESS_KEY>' , // Replace with your secret access key
  signatureVersion: 'v4'
});
```

Mọi sự đã đủ, chỉ đợi code thôi :grinning::grinning:

```
const AWS = required('aws-sdk');

const s3 = new AWS.S3();

const params = {
  Bucket: "tuanlv", // ten bucket
  CreateBucketConfiguration: {
     LocationConstraint: "ap-southeast-1", // region
  },
  ACL: 'private',
};

s3.createBucket(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
```

Bạn cũng có thể set lại các thuộc tính Bucket của mình qua một số function như: [putBucketCors](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketCors-property), [putBucketAcl](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketAcl-property), [putBucketPolicy](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketPolicy-property), ...

## 2. PUT and GET object

Sau khi đã tạo Bucket, bạn có thể lưu hoặc get file của mình.

PUT:
```
var params = {
  Body: <Binary String>, // file data
  Bucket: 'tuanlv', 
  Key: 'Deptrai.jpg', // file path
 };
 s3.putObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
```

GET:
```
var params = {
  Bucket: 'tuanlv', 
  Key: 'Deptrai.jpg',
 };
 s3.getObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
```

## 3. Signed URLs

Nhìn vào đoạn code phía trên chắc bạn sẽ nhận ra vấn đề ngay lập tức: mọi thứ sẽ phải đi qua `server` của bạn vì bạn không thể đặt `credentials` ở client. Bạn cũng không thể để quyền read/write vào Bucket của mình là public hết được.

![](https://images.viblo.asia/a229e45a-40c4-4f59-bf43-c0cd46063438.png)

Hãy thử tưởng tượng bạn PUT một file 100MB lên S3, bạn phải gửi nó lên server của bạn rồi server mới gửi lên S3. Vậy là thời gian xử lý dài gấp đôi và cũng tương tự với GET.

Một tập đoàn siêu to khổng lồ như Amazon thì chắc chắn không để anh em ta phải vất vả thế, và họ đã cung cấp một tính năng là SignedURL để giải quyết vấn đề trên.

SignedURL ở đây là: `URL + Signature + Expire date`

Có nghĩa là bạn sẽ gửi 1 request lên server để yêu cầu 1 url(có permission) để PUT/GET với S3. Server sẽ sinh ra một url có kèm `signature + expire date`. Client sẽ call trực tiếp lên s3 qua url đó để PUT/GET object.

![](https://images.viblo.asia/d679ce46-2b9d-4651-996a-d136f228ae93.png)

*Mấy cái này mình vẽ trông hơi ngu, các bạn thông cảm nhé (thông cảm chứ đừng thông mình :cold_sweat:)*

Hiểu về cách làm việc của nó rồi, giờ bắt tay vào code thôi :smiley:

Server:

```
var params = {
  Bucket: 'tuanlv', // bucket name
  Key: 'Deptrai.jpg', // file path
  Expires: 60, // Expire date (seconds) - default là 900s
};
// response lại cho client cái url nha
const singedUrl = await s3.getSignedUrlPromise('putObject', params); // getObject nếu bạn cần GET file
```

Sau khi server đã trả về SignedUrl thì bạn dùng `axios` mà PUT thẳng file lên thôi

```
const options = {
  headers: { 'Content-Type': type, 'X-Amz-Acl': 'private' },
};
axios.put(singedUrl, fileBuffer, options);
```

Ví dụ mình vừa lấy là cho PUT, cách làm với GET cũng tương tự như vậy và hoạt động với cả `CloudFront` nhé :grinning:

## 4. Upload objects in parts

Như đã nói ở phần đầu, Amazon cung cấp function hỗ trợ `Upload objects in parts` giúp bạn có thể upload các file lớn dễ dàng hơn bằng cách chia chúng thành các `parts` nhỏ để upload.

S3 SDK cho js cung cấp function `upload` giúp bạn thực hiện upload file một cách thông minh, tự động chia part hợp lý đối với các file lớn. Bạn cũng có thể config dung lượng mỗi part qua thông số `options`:

```
const params = {Bucket: 'tuanlv', Key: 'Deptrai.jpg', Body: stream};
const options = {partSize: 10 * 1024 * 1024, queueSize: 1};
s3.upload(params, options, function(err, data) {
  console.log(err, data);
});
```

Lại một bài toán xảy ra ở đây. Làm thế nào để upload multipart từ phía client?

Để thực hiện điều này khá phức tạp, AWS không có function hỗ trợ triệt để vấn đề này, ít nhất là đối với JS-SDK. Bạn phải kết hợp nhiều function và dĩ nhiên là tự chia part ở phía client :laughing:

Bỏ qua vấn đề chia file ra như thế nào, mình sẽ trình bày cách mà mình xử lý nhé:

- Đầu tiên, sử dụng `createMultipartUpload` function để tạo `UploadId` ở phía server:

```
var params = {
  Bucket: "tuanlv", 
  Key: "Deptrai.jpg"
 };
s3.createMultipartUpload(params, function(err, data) {
 if (err) console.log(err, err.stack); // an error occurred
 else     console.log(data);           // successful response
  /*
  data = {
   Bucket: "examplebucket", 
   Key: "largeobject", 
   // Nhớ response cái này lại cho client nhé!
   UploadId: "ibZBv_75gd9r8lH_gqXatLdxMVpAlj6ZQjEs.OwyF3953YdwbcQnMA2BLGn8Lx12fQNICtMw5KyteFeHw.Sjng--"
  }
  */
});
```

*Tại sao phải cần cái này? Vì các bạn không thể sử dụng hàm `upload`, phía client không có S3 SDK, nên nó cũng chả biết chia part thế nào. Chúng ta phải tự chia và gắn cái `UploadId` vào để S3 biết rằng các part này là của cùng một file.*

- Tiếp theo chúng ta tạo url cho `uploadPart`:

```
var params = {
  Bucket: 'tuanlv',
  Key: 'Deptrai.jpg',
  PartNumber: number, // number of part
  UploadId: uploadId,
};
// response lại cho client cái url nha
const singedUrl = await s3.getSignedUrlPromise('uploadPart', params);
```

Đọc đến đoạn này chắc bạn cũng hiểu hiểu mình định làm gì đúng không? `uploadPart` là một function mà S3 cung cấp để chúng ta tự custom việc upload multipart (nếu bạn không thích dùng `upload` function)

Có nghĩa là bạn chia file làm 10 parts, bạn sẽ call lên server 10 lần để lấy 10 `singedUrls` tương ứng cho mỗi part. Rồi sau đó dùng `axios` để PUT lên S3 thôi :laughing:

```
// Giả sử bạn đã chia file thành các parts và lưu trong fileBufferParts

const uploadId = await axios.get(`${serverUrl}/upload-id`); // get uploadId API
for (let index = 0; index < fileBufferParts.length; index++) {
  const singedUrl = await axios.get(`${serverUrl}/signed-url`, {  // get signedUrl API
    fileName: 'Deptrai.jpg',
     partNumber: index + 1,
     uploadId,
  });
  axios.put(singedUrl, fileBufferParts[index], options);
}
```


Trên đây là một số kiến thức mang tính `tutorial` về S3, có thể còn nhiều sai sót mong được các thím góp ý :relaxed:
Hi vọng bài viết của mình sẽ giúp các bạn làm quen với S3 một cách nhanh chóng và dễ dàng hơn!