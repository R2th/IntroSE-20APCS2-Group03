## **1. Chuẩn bị môi trường**

**1.1 Cài đặt python và pip**

* Refer: [Python](https://www.python.org/downloads/)
[Pip](https://qiita.com/ohbashunsuke/items/e7c673db606a6dced8a6)

* Lưu ý: Để tránh phát sinh lỗi, Phiên bản python bạn cài cần phải trùng với phiên bản python bạn sử dụng trong SAM (runtime)

**1.2 Cài đặt SAM CLI**

* Là phần mềm để bạn có thể code dưới local
* Command : `pip install aws-sam-cli`

**1.3 Cài đặt virtualenv**

* Là phần mềm giúp bạn có thể install các thư viện cần sử dụng vào ngay folder hiện tại đang code như dạng docker, để sau đó có thể dễ dạng push lên cloud
* Command : `sudo pip install virtualenv`

## **2. Tiến hành code và test thử**

**2.1  Tạo project, test thử event**
* Tạo project bằng sam, ở đây mình chỉ định runtime là python version 3.7, các bạn có thể chỉ định các ngôn ngữ khác mà AWS support (tham khảo docs để biết thêm chi tiết) : 
        `sam init --runtime python3.7`
* Sau khi gõ lệnh này, bạn sẽ phải nhập tên project_name và 1 số thông tin khác, tham khảo [Docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html)
* Di chuyển vào thư mục project: `cd project_name`
* Ở đây bạn cần hiểu kết cấu thư mục của project được tạo ra sao, cụ thể tham khảo [SAM_SPECS](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html)
    * Sẽ có các phần chính như sau:
        * project_name/app.py : nơi chứa function chính mình sẽ xử lí
        * template.yaml : nơi chứa thông tin để build sang CloudFormation, từ đó tự động sinh ra các resource trên AWS, quan trọng nhất trong này là phần Resources

* Generate 1 object ảo sẽ trả về khi có 1 file được tạo trên bucket S3, object này sẽ được truyền vào param `event` trong function `lambda_handler(event, context)`: 
    * Command to generate:`sam local generate-event s3 put --bucket source-input-test`
    * Copy kết quả vào 1 file json mình tự tạo để phục vụ cho việc test, ở đây mình để là : test_event.json
    * Chú ý: Cần thay đổi thông số của các field object_key và bucket_name ở dưới đây, sao cho phù hợp với bucket thật và file thật có trên S3 của bạn
```
{
  "Records": [
    {
      "eventVersion": "2.0",
      "eventSource": "aws:s3",
      "awsRegion": "ap-northeast-1",
      "eventTime": "1970-01-01T00:00:00.000Z",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "EXAMPLE"
      },
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "responseElements": {
        "x-amz-request-id": "EXAMPLE123456789",
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH"
      },
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "testConfigRule",
        "bucket": {
          "name": bucket_name,
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          },
          "arn": "arn:aws:s3:::bucket_name"
        },
        "object": {
          "key": object_key,
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
}
```


* Call test thử bằng lệnh : `sam local invoke -e ./test_event.json`
    * ./test_event.json là đường dẫn đến file json mình vừa tạo bên trên
    * Để có thể test được bạn cần config setting secret key để local có thể kết nối tới cloud thông quan hướng dẫn sau: [credentials](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-set-up-credentials.html)

**2.2 Cài các thư viện cần thiết**

* Mình cần sử dụng virtualenv với mục đích đã miêu tả bên trên
    * Kích hoạt virtualenv bằng command:
        * virtualenv ./
        * source /bin/activate
        * Sau 2 câu lệnh trên thì mọi thư viện bạn install sau đó sẽ được tải vào local folder hiện tại của project
    * Tải thư viện cần thiết:
        * Thư viện liên quan đến xử lí ảnh: `pip install Pillow`
        * Thư viện liên quan đến kết nối vs s3: `pip install boto3`

**2.3 Code**

* Trong file app.py mình có code như sau:
```
import json
import urllib.parse
import boto3
import os
import tempfile
import datetime
from PIL import Image

AWS_BUCKET_INPUT_NAME = "source-input-test"
AWS_BUCKET_OUTPUT_NAME = "source-output-test"
s3_input_bucket = boto3.resource('s3').Bucket(AWS_BUCKET_INPUT_NAME)
s3_output_bucket = boto3.resource("s3").Bucket(AWS_BUCKET_OUTPUT_NAME)
IMAGE_SIZE = (100, 100)

def resize_image(image_path, resized_path):
    with Image.open(image_path) as image:
        image.thumbnail(IMAGE_SIZE, Image.ANTIALIAS)
        image.save(resized_path, quality=100, subsampling=0)

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        tmp_dir = tempfile.TemporaryDirectory()
        now = str(datetime.datetime.now().microsecond)
        print("TMP:", tmp_dir.name)
        download_file_path = tmp_dir.name + "/" + now + "_" + key
        print("Log download_path name:", download_file_path)
        upload_file_path = tmp_dir.name + "/resized_" + now + "_" + key
        print("Log upload_path name:", upload_file_path)
        
        input_obj = s3_input_bucket.Object(key).get()
        body = input_obj['Body'].read()
        fp = open(download_file_path, "wb")
        fp.write(body)
        fp.close
        resize_image(download_file_path, upload_file_path)
        result = s3_output_bucket.upload_file(upload_file_path, key)
        tmp_dir.cleanup()
        return result
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key))
        raise e

```

* Test bằng command: `sam build && sam local invoke -e ./test_event.json`
    * sam build để phản ánh kết quả ngay mỗi khi có sửa đổi

## **3. Deploy lên AWS**

* Sau code và test thử  xong xuôi, đến bước cuối là deploy project, trước khi deploy, bạn cần build và đóng gói project:
    * Build: ```sam build```

    * Pakage: 
        ```
        sam package \                                     
            --output-template-file packaged.yaml \
            --s3-bucket convert-image-to-thumbnail \;
        ```

    * Cuối cùng là deploy theo lệnh: 
        ```
        sam deploy \                                      
            --template-file packaged.yaml \       
            --stack-name convert-image-to-thumbnail \
            --capabilities CAPABILITY_IAM \;
        ```

**2.5 Create trigger && test**
* Cuối cùng bạn cần lên lambda để check kết quả, function sẽ được tạo trên lambda thông qua cloudformation.
* Ngoài ra để khi có file upload đến bucket, sẽ tự động gọi lambda thì mình cần add trigger cho lambda, và setup role cho nó nữa nhé :+1: