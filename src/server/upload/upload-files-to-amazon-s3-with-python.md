## 1. S3 là gì 
Amazon S3 là viết tắt của cụm từ Amazon Simple Storage Service: Là dịch vụ đám mây lưu trữ do đó bạn có thể tải lên các tệp, các tài liệu, các dữ liệu tải về của người dùng hoặc các bản sao lưu.

Với lợi ích là khả năng mở rộng, đáng tin cậy và với mức chi phí thấp nhất cho việc lưu trữ.
So, let's go.

## 2. Tạo class kiểm soát việc tương tác với S3

Trước khi bắt đầu thì mình nghĩ các bạn nên set up key và secret key cho aws bằng aws cli(cách tiện dụng nhất)

Nếu bạn chưa biết về aws cli thì có thể đọc thêm ở [đây](https://aws.amazon.com/vi/cli/)

Giờ thì bắt tay vào chiến thôi (baibien)

Mình sẽ làm 1 đoạn code demo nhỏ, trong này có 3 phần chính là tạo bucket, upload file, và get file trực tiếp từ s3

Còn nhiều phần khác như download file, get object  . . .  các bạn tìm hiểu thêm và làm tương tự là được nhé

```
import boto3
import os
from boto3.dynamodb.conditions import Key, Attr

#bucket name va region name các bạn set up trong env cho tiện nha
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
REGION_NAME = os.getenv("REGION_NAME")

#connect tới s3 thông qua boto3, ở đây thì key và secret key chúng ta đã set up bằng aws cli rồi nên không cần nữa nha
s3 = boto3.client('s3')

class S3Upload(object):
  # Nếu bạn muốn truyền thêm gì lúc init thì thêm vào đây, nếu không thì pass thôi
  def __init__(self):
    pass
  
  # Hàm này kiểm tra xem 1 bucket nào đó đã tồn tại chưa, ví dụ như bạn muốn kiểm tra trước khi tạo chẳng hạn
  def check_bucket_exist(self, bucket_name):
    try:
        response = s3.list_buckets()
        buckets = [bucket['Name'] for bucket in response['Buckets']]
        return bucket_name in buckets
    except Exception as e:
        return False
        
  # Hàm này để tạo 1 bucket mới
  def create_new_bucket(self, bucket_name):
    s3.create_bucket(
      Bucket=bucket_name,
      CreateBucketConfiguration={
        'LocationConstraint': REGION_NAME
      }
    )
  
  #file_path ở đây là đường dẫn và file mà bạn muốn upload lên.
  #Ví dụ bạn chỉ muốn upload file logo.png ở ngay thư mục ngoài của bucket thì file_path="logo.png", còn nếu bạn muốn chứa file upload lên trong một thư mục nữa thì file_path="framgia/logo.png".
  #Lúc này nếu folder framgia chưa có trên bucket thì nó sẽ tự tạo cho bạn luôn (len3)
  def upload_file_to_s3(self, file, file_path, bucket_name=S3_BUCKET_NAME, acl="public-read"):
    S3_LOCATION = "http://{}.s3.amazonaws.com/{}".format(S3_BUCKET_NAME, file_path)
    try:
        data = s3.upload_fileobj(
            file,
            bucket_name,
            file_path,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
        return S3_LOCATION
    except Exception as e:
        return e

  # Hàm này để get file nha  
  def get_file_from_s3(self, file_path, bucket_name=S3_BUCKET_NAME):
   # Đoạn này mình kiểm tra luôn nếu mà cái bucket_name không tồn tại thì thôi khỏi get file mất công
    if not self.check_bucket_exist(bucket_name):
        return None
    try:
        # generate_presigned_url chỉ là một trong những cách bạn có thể tương tác với file trên s3, ở đây mình muốn lấy url của 1 file lưu private trên s3, ví dụ như cần lấy ảnh bằng link chẳng hạn
        url = s3.generate_presigned_url(
            ClientMethod='get_object',
            Params={
                'Bucket': bucket_name,
                'Key': file_path
            },
            ExpiresIn=3600)
        return url
    except Exception as e:
        return e

```

## 3. Sử dụng 

Xong cái class upload là khỏe rồi, giờ chỉ việc gọi hàm tương ứng với việc bạn cần làm thôi.

Chú ý các tham số truyền vào, đặc biệt là khi bạn muốn upload file vào 1 thư mục nhất định nào đó trên s3

Tất nhiên bạn có thể upload file lên ở dạng public nhưng mình vẫn khuyến khích mọi người sử dụng private vì những lợi ích của nó

Các bạn có thể tham khảo thêm thông tin và các tùy chọn config ở document của [s3](https://docs.aws.amazon.com/s3/index.html#lang/en_us) và [boto](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-example-creating-buckets.html)

Peace!