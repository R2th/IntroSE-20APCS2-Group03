![](https://images.viblo.asia/cb9a8a33-07ad-4f98-ba7f-ce603b85bb26.PNG)
## 1. Using presigned URLs
- Các bucket và object trong S3 mặc định là private, người dùng không thể truy cập được.
- Tuy nhiên, có thể sử dụng presigned URL để chia sẻ hoặc cho phép người dùng upload object đến bucket mà không cần thông tin xác thực. (Key pair, IAM Role).
- Khi tạo presigned URLs cần gắn nó với một action cụ thể (GET, POST, PUT...).
- Bất kì ai cũng có thể thực hiện action trong thời gian tồn tại của presigned URLs.
## 2. Who can create a presigned URL
- Bất kỳ ai với thông tin xác thực hợp lệ đều có thể tạo presigned URL. Nhưng để truy cập vào object, presigned URL phải được tạo bởi người có quyền thực hiện.
- Sau đây là credentials có thể sử dụng để tạo presigned URL:
    - IAM instance profile: 6 giờ.
    - AWS Security Token Service: 36 giờ.
    - IAM user: 7 ngày khi sử dụng AWS Signature Version 4.
## 3. When does Amazon S3 check the expiration date and time of a presigned URL?
- Amazon S3 kiểm tra ngày và giờ hết hạn của signed URL tại thời điểm yêu cầu HTTP.
    - Nếu người dùng tải xuống một file lớn ngay trước thời điểm hết hạn. Quá trình tải xuống sẽ hoàn tất ngay cả khi thời gian signed URL hết hạn trong quá trình tải xuống.
    - Nếu kết nối bị ngắt và người dùng cố gắng khởi động lại quá trình tải xuống sau khi signed URL hết hạn, quá trình tải xuống sẽ không thành công.
## 4. Hands on
- Requirement: Python basic, boto3, requests package.
- Setup profile:
```shell
aws configure
AWS Access Key ID [****************NLSB]: xxx
AWS Secret Access Key [****************Pz/K]: xxx
Default region name [ap-southeast-1]:
Default output format [None]:
```
- Policy IAM user upload.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowFullAccessS3",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "*"
        }
    ]
}
```
4.1. Generating a presigned URL to upload an object
- Tạo một presigned URL để upload object lên S3 trong thời gian nhất định.
```python
import boto3

url = boto3.client('s3').generate_presigned_url(
    ClientMethod='get_object',
    Params={'Bucket': 'presignurl2022', 'Key': 'data.csv'},
    ExpiresIn=3600
)
print(url)
```
- ClientMethod: Lấy object từ Amazon S3.
- Params: Chứa thông tin bucket và tên file.
- ExpiresIn: Thời gian tồn tại của presigned URL (đơn vi: giây).
```shell
{
    'url': 'https://presignurl2022.s3.amazonaws.com/',
    'fields': {
        'key': 'data.csv',
        'AWSAccessKeyId': 'AKIA3PXGBSUDVQBNTQ4M',
        'policy': 'eyJleHBpcmF0aW9uIjogIjIwMjItMDUtMTRUMTA6MDA6MzBaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAicHJlc2lnbnVybDIwMjIifSwgeyJrZXkiOiAiZGF0YS5jc3YifV19',
        'signature': '93/6UpGjgKv27JBbJgEfBVVbLDc='
    }
}
```
- Tạo file data.csv lưu dữ liệu test đặt cùng thư mục với file code python.
```csv
STT,Name,Score
1,John Doe,100,
2,Michel Rass,89
3,Jacky D,100
```
- Sử dụng requests package để thực hiện upload với presigned URL.
```python
import requests
import boto3

filekey='data.csv'
response = boto3.client('s3').generate_presigned_post(
    Bucket='presignurl2022',
    Key=filekey,
    ExpiresIn=3600
)

print(response)

fin=open(filekey, 'rb')
file={'file': fin}

try:
    r = requests.post(response['url'], data=response['fields'], files=file)
    print(r)
finally:
    fin.close()
```
```shell
<Response [204]>
```
4.2. Sharing object
```python
import boto3

url = boto3.client('s3').generate_presigned_url(
    ClientMethod='get_object', 
    Params={'Bucket': 'presignurl2022', 'Key': 'data.csv'},
    ExpiresIn=3600
)

print(url)
```
```shell
https://presignurl2022.s3.amazonaws.com/data.csv?AWSAccessKeyId=AKIA3PXGBSUDVQBNTQ4M&Signature=%2Funz%2F6udzYXw9WMy6b32YMXN8MY%3D&Expires=1652524464
```
## 5. Reference
[Using presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)
https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.generate_presigned_url
https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.generate_presigned_post