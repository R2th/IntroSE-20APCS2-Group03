Tôi bắt đầu làm việc như một lập trình viên toàn thời gian từ cuối năm 2015. Tôi cùng với nhóm làm việc của mình xây dựng các service cho các ứng dụng web, ứng dụng di động.

Hồi đó hầu như tôi không biết gì về các server - nơi mà những đoạn code của tôi được thực thii, tôi sớm phải tìm hiểu về cách cấu trúc mạng, cân bằng tải, cơ sở dữ liệu phân tán và nhiều thứ nữa để hỗ trợ cho công việc của mình, hỗ trợ những đoạn code mà tôi viết ra. 

Đối với tôi việc xây dựng các phần mềm, service để giải quyết các vấn đề là một việc gì đó rất thích thú, còn việc quản lý các server, hệ thống phần cứng thì ngược lại - không vui chút nào :|

Khoảng năm 2016 tôi có đọc được một bài viết tóm tắt đại loại như "Chúng tôi đã xây dựng hệ thống XYZ với kiến trúc Serverless trên AWS như thế nào" (quên mất bài viết này rồi, khi nào phải tìm lại...). Ý tưởng sử dụng AWS lambda function để xây dựng một web service mà không phải quản lý hay scale các máy chủ là một điều mới mẻ và rất cuốn hút.

Cho tới thời gian gần đây, tôi mới có nhiều cơ hội tiếp xúc và làm việc với kiến trúc Serverless sử dụng các dịch vụ của AWS. Tôi nghĩ thời điểm này là tốt nhất để bắt đầu.

Định nghĩa về Serverless tôi sẽ không nhắc tới trong bài viết này, chúng ta có thể dễ dàng tìm thấy chúng trên mạng.

Chúng ta sẽ đến với một ví dụ ngay sau đây.

# Catface
Cách tốt nhất để học là thực hành. Giả sử chúng ta phải xây dựng một ứng dụng chèn các filter hay object lên ảnh, trong ứng dụng mà chúng ta đang nói tới "Catface" chúng ta sẽ nhận diện mặt người có trong một bức ảnh và thực hiện thêm "râu" cho các khuôn mặt đó.
![](https://images.viblo.asia/cc70789c-02e2-4875-9a63-aada3e47cc04.jpg)
*Không phải thế này, đây là con mèo(StupidCat) tôi sẽ phải pair progaming với nó. Tôi lên ý tưởng, "nó" code, tôi giải thích code cho các bạn*

Ứng dụng của chúng ta sẽ giúp xử lý ảnh như thế này. (biến ảnh bên trái thành ảnh bên phải :|)

![](https://images.viblo.asia/5bc931e7-a5e0-46b0-8d4c-695fdf3eb3bb.jpg)

Ứng dụng sẽ:
* Cho phép người dùng upload ảnh
* Phát hiện các khuôn mặt người trong ảnh
* "Gắn râu mèo" cho từng khuôn mặt
* Lưu trữ ảnh đã chỉnh sửa
* Trả lại kết quả cho người dùng là ảnh đã chỉnh sửa

Thay vì chúng ta tự xây dựng các service để thực hiện công việc, chúng ta sẽ sử dụng kiến trúc Serverless và các dịch vụ có sẵn của AWS.
## Serverless Architectures

Chúng ta sẽ cần 4 dịch vụ cho ứng dụng này:
* Amazon S3: Lưu trữ file
* AWS Lambda: serverless compute
* API Gateway: Public service via http service
* Amazon Rekognition: Dịch vụ phân tích ảnh

Kiến trúc của service sẽ giống như thế này
![](https://images.viblo.asia/de112c4c-8adc-457a-9994-a38472d309a0.png)

### Serverless js framework
Chúng ta sẽ khởi tạo một project bằng serverless js
Hãy đảm bảo rằng serverless đã được cài đặt bằng câu lệnh
```shell
npm install -g serverless
```

```shell
serverless create --template aws-nodejs --path meowed
```
câu lệnh trên sẽ tạo mới một thư mục có tên `"meowed"`, trong thư mục có file `serverless.yml`
```yml
service: meowed

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: ap-northeast-1
plugins:
  - serverless-offline

functions:
  hello:
    handler: handler.hello
```

Chúng ta sẽ sử dụng môi trường runtime là nodejs 8.10

Cài thêm một số gói để phát triển ở môi trường local
```shell
yarn add aws-sdk serverless-offline -D
```
### Direct-to-S3 File Uploads
Phía client sẽ yêu cầu upload một file lên S3. API Gateway sẽ forward yêu cầu tới Lambda function, từ đây t sẽ có được một "signed url" ([Bài viết trước](https://viblo.asia/p/serverless-typescript-voi-aws-lambda-api-gateway-va-dynamodb-tren-moi-truong-offline-phan-03-1VgZvNjmZAw)).

Mô tả tài nguyên S3 Bucket, sửa file `serverless.yml` thêm resource mới
```yml
...
resources:
  Resources:
    UploadBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: meowed-upload
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
...
```

Chúng ta cũng phải cấp quyền cho `Lambda function` làm việc với S3 bucket ở trên.

Nội dung của file `serverless.yml`
```yml
service: meowed

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: ap-northeast-1
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "s3:*"
      Resource: "arn:aws:s3:::meowed-upload/*"

plugins:
  - serverless-offline

resources:
  Resources:
    UploadBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: meowed-upload
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

functions:
  hello:
    handler: handler.hello
```

#### Handler function
Phần này các bạn có thể xem chi tiết ở ([Bài viết](https://viblo.asia/p/serverless-typescript-voi-aws-lambda-api-gateway-va-dynamodb-tren-moi-truong-offline-phan-03-1VgZvNjmZAw)).

Người dùng yêu cầu upload một file lên hệ thống với filename và filetype, Lambda function sẽ gọi hàm `getSignedUrl` của `AWS.S3` để tạo ra một `url kèm chữ ký`, client sẽ dùng url này để upload file lên S3.

Nội dung file `handler.js`
```javascript
'use strict';
const AWS = require('aws-sdk');

/**
 * meow miaow mrruh prrrup mrow yowl
 * @param event
 * @returns {{statusCode: number, headers: {"Access-Control-Allow-Origin": string}, body: string}}
 */
module.exports.requestUploadURL = (event) => {
  // Mrrowow
  const s3 = new AWS.S3();
  const params = JSON.parse(event.body);
  const s3Params = {
    Bucket: 'meowed-upload',
    Key:  params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };

  const uploadURL = s3.getSignedUrl('putObject', s3Params);

  return Promise.resolve({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadURL,
    }),
  };
});
```

Client gửi thông tin lên Lambda function bằng http event thông qua api gateway, event này thuộc tính body là stringify của object client gửi lên. Nội dung client gửi lên là tên file và loại file cần upload. Kết quả nhận được sẽ là một link kèm chữ ký dùng để upload file.

Deploy service lên aws
```
sls deploy
```

*Để chạy được lệnh deploy, máy tính của chạy lệnh này phải có certificate của tài khoản aws*

Sau khi deploy chúng ta sẽ có một endpoint dạng

POST - https://3v5k7wxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/requestUploadURL

Khi đăng nhập vào AWS console phần S3, chúng ta sẽ thấy Bucket `meowed-upload` đã được tạo.

![](https://images.viblo.asia/a301b876-3f78-46a7-a759-ec1d699a3b22.png)

Chúng ta sẽ gọi thử api để lấy url upload file
```shell
curl -X POST \
  https://3v5k7w9o6i.execute-api.ap-northeast-1.amazonaws.com/dev/requestUploadURL \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 5d2f79da-300c-4810-bc14-634f598fa52d' \
  -d '{
	"name": "girl.png",
	"type": "image/jpeg"
}'
```

kết quả chúng ta nhận được là 
```shell
{"uploadURL":"https://meowed-upload.s3.ap-northeast-1.amazonaws.com/girl.png?AWSAccessKeyId=ASIAIPJ2NAFHNLEI4AGA&Content-Type=image%2Fjpeg&Expires=1529760628&Signature=fG%2B38h5TWT7sWOPU4K5Nr9RL4Oo%3D&x-amz-acl=public-read&x-amz-security-token=FQoDYXdzEF0aDCF4cCqBH%2BJ%2F3IEolyL0ASUituZuF2dADQL%2BPwp%2B1AUjpV7gIEVNrjoa7%2B83sUN%2Bp%2FHLmyQ0vqB0%2FHhvhfn3M8wI6w1Er7zEf2wiJePN%2BhmJSmXCOrb7hQxextFiwDyq4yiDCaoK%2BVFxIiUCraNVz%2F6L29Z2Vkxo%2FnOMIAvdV1GodWyGOp7YPod44gHFWln0M9Oa%2F1eDXn7LhOYWIjr3OM5V7UCU1V49rGIqrfLgdhPWP48dXKOzy8nvyhDJ3M6ned4tbTRMQToomEhTO6HAUuxq6MlqS9oYKu3dn9RHK13gI18ga7sf9%2BJb7UK0cogscyEwkeDq0pCeS8Wh4yz5fQPqtTkosOy42QU%3D"}
```

Ok, nó làm việc rất ổn.

Chúng ta sẽ cần một "client" để upload file, để cho nhanh, chúng ta sẽ kiếm đoạn code có sẵn trên mạng để sử dụng. Con mèo của tôi đã kiếm được một đoạn khá "ngon", sửa lại một chút
`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>A File Upload Demo</title>
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }

    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .aligner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    #drop {
      height: 200px;
      width: 200px;
      border-radius: 100px;
      color: #fff;
      background-color: #67a746;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
<div class="aligner">
  <div id="drop">Drop files here.</div>
  <div id="list">
    <h1>Uploaded Files:</h1>
  </div>
</div>

<script type="text/javascript">
  const drop = document.getElementById('drop');
  const list = document.getElementById('list');
  const apiBaseURL = "https://3v5k7wxxxx.execute-api.ap-northeast-1.amazonaws.com/dev";

  function cancel(e) {
    e.preventDefault();
    return false;
  }

  function handleDrop(e) {
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.addEventListener('loadend', function (e) {
        fetch(apiBaseURL + "/requestUploadURL", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: file.name,
            type: file.type
          })
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            return fetch(json.uploadURL, {
              method: "PUT",
              body: new Blob([reader.result], {type: file.type})
            })
          })
          .then(function () {
            const uploadedFileNode = document.createElement('div');
            uploadedFileNode.innerHTML = '<a target="_blank" href="//s3-ap-northeast-1.amazonaws.com/meowed-upload/' + file.name + '">' + file.name + '</a>';
            list.appendChild(uploadedFileNode);
          });
      });
      reader.readAsArrayBuffer(file);
    }
    return false;
  }

  // Tells the browser that we *can* drop on this target
  drop.addEventListener('dragenter', cancel);
  drop.addEventListener('dragover', cancel);
  drop.addEventListener('drop', handleDrop);

</script>
</body>
</html>
```
Nội dung của file html: Khi có sự kiện kéo thả files vào vùng "drop", tiến hành lấy url signed với tên file và loại file được kéo thả, sau đó upload file lên S3 theo đường dẫn vừa lấy được. Cuối cùng là hiển thị đường dẫn files vừa được upload.

Chúng ta đã hoàn thành việc xây dựng service để người dùng upload file lên S3.

### AI Rekognition
Rekognition là một dịch vụ của aws cho phép bạn thực hiện phân tích hình ảnh và video một cách rất dễ dàng [Document](https://aws.amazon.com/rekognition/).

Ứng dụng Catface của chúng ta sử dụng dịch vụ là quả thật có chút gọi là "Dao mổ trâu để giết gà :|" nhưng không sao, mình chỉ muốn demo cho mọi người thôi :D.

Chúng ta sẽ tạo một handler function để xử lý khi có sự kiện "mội ai đó" upload file lên hệ thống.

Function này sẽ làm các nhiệm vụ:
* Lấy ra các image từ object event trigger bởi S3
* Phát hiện các khuôn mặt có trong các ảnh
* Xử lý ảnh: Thêm râu mèo, lưu lại ảnh đã chỉnh sửa

1. Lấy key của file vừa được upload lên S3
    ```javascript
    const getImagesFromEvent = (event) => {
      return event.Records.reduce((accum, r) => {
        if (r.s3.bucket.name === BUCKET_NAME) {
          const key = r.s3.object.key;
          const extension = path.extname(key).toLowerCase();
          if (ALLOWED_EXTENSIONS.indexOf(extension) !== -1  && key.indexOf('catface') === -1) {
            accum.push(key);
          }
        }
        return accum;
      }, []);
    };
    ```
    Chúng ta có thể có nhiều file được gửi trong một sự kiện, chỉ những file là file ảnh mới được xử lý.
    
2. Phát hiện các khuôn mặt trong ảnh
    ```javascript
      const detectFacesOnImages = async (images) => {
      let faces = {};
      const rekognition = new AWS.Rekognition();
      for (let image of images) {
        console.log(image);
        const params = {
          Image: {
            S3Object: {
              Bucket: BUCKET_NAME,
              Name: image,
            }
          },
          Attributes: [
            'ALL',
          ]
        };
        let data = await rekognition.detectFaces(params).promise();
        if (data.FaceDetails.length) {
          faces[image] = data;
        }
      }
      return faces;
    };
    ```
    Phương thức `detectFaces` của rekognition nhận vào param là một `S3Object` , kết quả trả ra là các đặc điểm của các khuôn mặt mà service này nhận diện được.
    ![](https://images.viblo.asia/0ae0bcfd-9698-471c-91e5-9dd101ef079a.png)
    
3. Xử lý ảnh

    Để xử lý ảnh chúng ta sẽ phải tải ảnh từ S3 xuống sau đó xử lý.
    ```javascript
    const downloadImage = async (key) => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: key
      };
      return await s3.getObject(params).promise();
    };
    ```

    Ý tưởng sẽ là gắn râu mèo vào giữa vị trí mũi (nose) của khuôn mặt.
    Xử lý ảnh chúng ta sẽ dùng package `jimp`
    ```shell
    yarn add jimp -D
    ```
    
    Xử lý ảnh
    ```javascript
    const processImages = async (faces) => {
      for (let key of Object.keys(faces)) {
        const faceDetails = faces[key].FaceDetails;
        let response = await downloadImage(key);

        let source = await Jimp.read(response.Body);
        for (let faceDetail of faceDetails) {
          const nose = getNosePoint(faceDetail);
          if (nose) {
            let catface = await Jimp.read('./catface.png');
            // x-coordinate from the top left of the landmark expressed as the ratio of the width of the image.
            // e.x, if the images is 700x200 and the x-coordinate of the landmark is at 350 pixels, this value is 0.5.

            // y-coordinate from the top left of the landmark expressed as the ratio of the height of the image.
            // e.x, if the images is 700x200 and the y-coordinate of the landmark is at 100 pixels, this value is 0.5.
            const {height, width} = source.bitmap;
            addImageCenter(source, catface, nose.X * width, nose.Y * height);
          }
        }
        source.write(`./output_${Date.now()}.png`)
      }
    };

    const getNosePoint = (faceDetail) => {
      let nose = null;
      for (let landmark of faceDetail.Landmarks) {
        if (landmark.Type === 'nose') {
          nose = landmark;
        }
      }
      return nose;
    };

    const addImageCenter = (source, catface, x, y) => {
      const {height, width} = catface.bitmap;
      const newX = x - width / 2;
      const newY = y - height / 2 + 10;
      return source.composite(catface, newX, newY);
    };
    ```
    
    Duyệt quả các khuôn mặt -> Tìm điểm mũi để đặt râu
    
    Phương thức `addImageCenter ` giúp chúng ta chèn một ảnh lên một ảnh khác với vị trí tâm của ảnh cần chèn trùng với toạ độ cho trước (ở đây con mèo của mình đã cho dịch toạ độ Y đi 10px)
    Về toạ độ  các Landmark của rekognition đã có chú thích rất rõ ràng ở trong code, vì package `Jimp` chỉ làm việc với đơn vị toạ độ là pixel nên chúng ta phải convert như vậy.
    
    Kết quả thử nghiệm ban đầu:
    
    ![](https://images.viblo.asia/20db741c-ae9a-4882-be2c-6de43b121a47.jpg)
    ![](https://images.viblo.asia/0bd177d3-3805-4456-bbb8-483992d15dfa.png)
    
    có vẻ ổn, chúng ta cần tính lại độ dài của "râu": Khoảng cách từ leftEyeLeft tới rightEyeRight + 10
    ([Landmarks](https://docs.aws.amazon.com/rekognition/latest/dg/faces-detect-images.html))
    
    ```javascript
    const resizeCatface = (catface, sHeight, sWidth, faceDetail) => {
      let e_ll = null;
      let e_rr = null;
      for (let landmark of faceDetail.Landmarks) {
        if (landmark.Type === 'leftEyeLeft') {
          e_ll = landmark;
        }
        if (landmark.Type === 'rightEyeRight') {
          e_rr = landmark;
        }
      }
      if (e_ll && e_rr) {
        let catfaceWidth =
          Math.sqrt(Math.pow(e_ll.X * sWidth - e_rr.X * sWidth, 2) + Math.pow(e_ll.Y * sHeight - e_ll.Y * sHeight, 2))
          + 20;
        catface.resize(catfaceWidth, Jimp.AUTO)
      }
    };
    ```
    Công thức tính khoảng cách giữa 2 điểm :D
    
    ![](https://images.viblo.asia/df72b0ca-b69a-48ee-8558-00c44fd91ab8.png)
    
    meowed!
    
    Thử thêm một ảnh nữa:
    
    ![](https://images.viblo.asia/e7487d4b-feb2-4e0e-b329-ef1a7cd38585.jpg)
    ![](https://images.viblo.asia/778c55cd-e4bd-435e-a0bb-26722d2a573c.png)
    
    @#$%^&*()(*&^%$#$%^&^%$#
    
    Chúng ta phải xử lý khi khuôn mặt bị nghiêng,  kiểu như thế này chúng ta cũng phải nghiêng bộ râu mèo theo một góc alpha (α)
    
    Dễ dàng nhận thấy góc nghiêng cần tìm cũng là góc nghiên của đoạn thẳng e_ll e_rr
    ![](https://images.viblo.asia/d57bb431-9c5b-4dd1-ae48-9a9d7cf2cac1.png)
    
    Góc cần tính là góc ACB, tam giác ABC vuông tại A nên ta có tan(ACB) = AB / AC (đối trên kề :D)
    
    Cập nhật thêm cho hàm `resizeCatface`
    
   ```javascript
   const resizeCatface = (catface, sHeight, sWidth, faceDetail) => {
      let e_ll = null;
      let e_rr = null;
      for (let landmark of faceDetail.Landmarks) {
        if (landmark.Type === 'leftEyeLeft') {
          e_ll = landmark;
        }
        if (landmark.Type === 'rightEyeRight') {
          e_rr = landmark;
        }
      }
      if (e_ll && e_rr) {
        let catfaceWidth =
          Math.sqrt(Math.pow(e_ll.X * sWidth - e_rr.X * sWidth, 2) + Math.pow(e_ll.Y * sHeight - e_ll.Y * sHeight, 2))
          + 20;

        // Cạnh đối và cạnh kề
        const ab = e_rr.Y * sHeight - e_ll.Y * sHeight;
        const ac = e_rr.X * sWidth - e_ll.X * sWidth;

        const tanACB = ab / ac;

        // Quy đổi radian sang độ
        const deg = Math.atan(tanACB) * 180 / Math.PI;

        catface.resize(catfaceWidth, Jimp.AUTO).rotate(deg);
      }
    };
   ```
   
   Kết quả:
   
   ![](https://images.viblo.asia/9ca0eacd-70ad-43b6-bc2b-19ec6133feba.png)
   
   
   Sau khi xử lý ảnh, chúng ta sẽ lưu ảnh đã xử lý vào S3 để client có thể lấy được
   ```javascript
   const uploadImage = async (key, imageBufferData, contentType) => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: `catface-${key}`,
        Body: imageBufferData,
        ACL: 'public-read',
        ContentType: contentType,
      };
      await s3.putObject(params).promise();
    };
   ```
   
   Cuối cùng là handler function xử lý khi có sự kiện Object created trên S3
   
   `handler.js`
   ```javascript
   module.exports.catFace = async (event) => {
      let images = getImagesFromEvent(event);
      let faces = await detectFacesOnImages(images);
      await processImages(faces);

      return faces;
    };
   ```
   
   `severless.yml`
   ```yml
   ...
     catFace:
        handler: handler.catFace
        timeout: 30
        events:
          - s3:
              bucket: meowed-upload
              event: s3:ObjectCreated:*
   ...
   ```
   
   Deploy
   
   ```shell
   sls deploy
   ```
   
   Sửa lại phía client một chút, ảnh sau khi được xử lý được lưu với tên là 'catface-' + tên cũ.
   
# Kết luận
Một bài viết khá dài, có thể không tiện cho các bạn theo dõi (bow). 
   
Qua bài viết mình đã giới thiệu, mô tả và thực hiện một service dạng serverless có sử dụng nhiều dịch vụ của AWS, hy vọng với bài viết sẽ cho các bạn một cái nhìn tổng quan về serverless trên aws. 

Mình cũng mong bài viết sẽ giúp mọi người có những ý tưởng hay, với Amazon Rekognition mình rất thích khả năng phát hiện cảm xúc, mong sẽ có lúc mình được dùng tính năng này :D

Mã nguồn toàn bộ project: [Github](https://github.com/hoangsetup/meowed)