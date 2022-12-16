![image.png](https://images.viblo.asia/943cd684-9465-447d-ad99-f8b89ac1fcf6.png)

## Introduction

Vào một ngày bạn gặp phải yêu cầu của khách hàng:
+ Chuyển đổi video từ định dạng HD sang SD để tiết kiệm tài nguyên
+ Việc convert bắt đầu khi có 1 file video được upload lên S3
+ Quá trình hoàn toàn tự động

Mình sẽ sử dụng các dịch vụ trên AWS để giải quyết bài toán trên. Ưu điểm việc dùng AWS sẽ dễ dàng quản lý, triển khai, liên kết các service. Nếu cần tích hợp thêm thông báo sau khi xử lí xong thì có thể tích hợp nhanh chóng. Có nhiều định dạng video theo mong muốn của người dùng.

Source code Lambda: https://github.com/dtdat1997/aws-lambda-transcoding-video-by-aws-mediaconvert

Bài viết này khá dài rất mong mọi người có thể cùng mình theo dõi tới cuối bài 😅😅

## Workflow
Các dịch vụ trên AWS sẽ sử dụng tới

* AWS S3: kho chứa các file media, video input/output
* AWS Elemental MediaConvert: công cụ xử lí convert/transcoding video
* AWS Lambda: viết function xử lí trung gian, trong bài toán này xử lí input/output, các tham số khi convert video
* AWS EventBridge (AWS CloudWatch Events): quản lý các logs, sự kiện khi có video được upload lên S3 
* AWS IAM: tạo các role, policy cần dùng để xử lí bài toán

![Screenshot_2.png](https://images.viblo.asia/2f447efd-f3d5-4dfb-8b08-270721a1cfef.png)

Mô tả:

1. Quá trình bắt đầu khi có event upload file video (Object Created) lên S3 bucket input
1. EventBridge sẽ nhận biết sự kiện này truyền tới Lambda function
1. Lambda function sẽ đọc file vừa upload, định nghĩa option convert file, output destination
1. AWS MediaConvert nhận được input từ Lambda, sau quá trình convert sẽ chuyển file output vào S3 bucket output
1. Quá trình hoàn tất


> Workflow này các bạn cũng có thể dùng vào các bài toán tương tự như cải thiện audio, thêm caption vào video,....
> 
## Configuration
### S3
Các bạn vào S3 để tạo 2 bucket input, output để chứa các video upload và video sau xử lý

Ở đây mình sẽ tạo 2 bucket có tên **kid328-video-input** và **kid328-video-output**

> Lưu ý: không nhét dùng chung 1 bucket để chứa các file input lẫn output, vì ta sẽ bắt sự kiện objectCreated trên bucket, file convert xong nếu upload vào cùng bucket cũ sẽ bị sinh ra vòng lặp làm cho quá trình convert này chạy mãi, gây phát sinh chi phí
> 

![image.png](https://images.viblo.asia/a561c13c-2c10-4102-a615-f158a937d396.png)

![image.png](https://images.viblo.asia/96b62897-66bf-4e3a-aa88-ffdda15fec53.png)

![image.png](https://images.viblo.asia/f7ea5f41-46bc-4422-ac2c-92c06f199d97.png)

Giờ chúng ta sẽ bật Amazon EventBridge trên bucket input để bucket có thể gửi event vào EventBridge

Vào phần **Properties** của bucket input, tìm mục Amazon EventBridge, chọn Edit

![image.png](https://images.viblo.asia/1e69823d-ce3e-4a61-ac4d-86de828d6bd8.png)

![image.png](https://images.viblo.asia/a6704717-990d-44ee-a7da-beacdce4e7c9.png)

Thay đổi sang **On** rồi ấn **Save changes**

Như vậy các bước setup S3 đã xong, tiếp tới chúng ta sẽ đi tạo Lambda function

### MediaConvert

Trên S3 bucket input, ta up 1 video HD lên
![image.png](https://images.viblo.asia/b91e6fc1-9390-44fd-81ac-e8144c2f53c1.png)

![image.png](https://images.viblo.asia/cc834fe7-7555-4e66-beb3-83107127af3e.png)

Trong MediaConvert, ta tạo 1 job

Ở phần input, ta chọn đường dẫn của file vừa tải lên

![image.png](https://images.viblo.asia/6bf504c2-d7ec-4937-b095-fbc26ed495e0.png)

Sau Add một **Output groups**, chọn **File group**

![image.png](https://images.viblo.asia/7b38a29e-d600-430c-9157-c7a4e3d1c30d.png)

![image.png](https://images.viblo.asia/bfb92762-bd30-4a25-8b6d-2f5fde381f29.png)

Ta nhập vị trí bucket output

![image.png](https://images.viblo.asia/2e218d02-709b-4ef3-ae2e-cd474edbd1f2.png)

Trong output setting, ta điền thông tin file sau khi convert và chọn **Preset** (các option convert định dạng file video)

![image.png](https://images.viblo.asia/55068966-d413-4132-8dea-16d88278253c.png)

Có rất nhiều option cho bạn lựa chọn, ở đây mình sẽ lấy 1 định dạng file SD để convert về

Tiếp đến ta vào mục **AWS integration**, ta sẽ tạo một role mới full permission trên S3 và APIGatewayInvoke để cho MediaConvert chạy được job này

Ở đây mình tạo role có tên **AmazonMediaConvertUsingS3AndAPIGateway**

![image.png](https://images.viblo.asia/375dd36a-96c4-48e1-8335-010a01c756f7.png)

Sau khi đã điền xong thông tin ta ấn **Create** để Job này được tiến hành

Khi sang màn hình dashboard job ta sẽ thấy job vừa tạo đang được xử lý 

![image.png](https://images.viblo.asia/1ade2d23-dd05-4cf5-8273-e59ada9c8a3c.png)

Sau vài phút, job đã convert xong, ta cùng vào bucket output để xem kết quả

![image.png](https://images.viblo.asia/50f7711a-4532-4a71-a37b-6cde55683ffc.png)

![image.png](https://images.viblo.asia/37096a53-8c96-4e54-8838-63d4e6f55527.png)

File video HD ban đầu có dung lượng 11Mb sau khi convert về SD chỉ còn 1.3Mb

![image.png](https://images.viblo.asia/0d2d9335-8060-4950-873b-ac5262b04b13.png)

Ta quay lại Job detail của job vừa rồi chọn Export JSON

Trong file json vừa lấy về chúng ta lấy
+ 2 thông tin **OutputGroups** và **Inputs** vào nhét vào 1 file json riêng đặt tên là job.json
+ Phần **Role**, ta copy lại value để dùng cho Lambda function, ở đây mình lấy được role value dạng
```
arn:aws:iam::{{aws_user_id}}:role/service-role/AmazonMediaConvertUsingS3AndAPIGateway
```

![image.png](https://images.viblo.asia/bb216807-0f34-47c8-a6db-559902600a61.png)

Như sau quá trình trên ta đã có file job template để các file convert tự động sau có thể sử dụng template convert này

### Lambda

Vào Lambda, chọn Create function

Ở đây mình tạo function có tên là **convert-video**, mình sẽ dùng Python v3.8 để viết function

![image.png](https://images.viblo.asia/9622677c-6d4e-4727-bcc4-325307a7a043.png)

Chúng ta config các environment variables cho function

Chọn **Configuartion** >> **Environment variables** >> **Edit**

![image.png](https://images.viblo.asia/0f021fe3-1158-45a2-bb48-fb8aa4e202fd.png)

![image.png](https://images.viblo.asia/b9ec083f-aef8-49a6-bf7c-ce6a41e34f4f.png)

Mình điền 3 biến **Application** , **DestinationBucket**(ta điền tên bucket output), **MediaConvertRole** (ta lấy role value lấy được ở phần trên để điền vào) 

Các bạn clone repository dưới đây để lấy code up lên Lambda nhé

https://github.com/dtdat1997/aws-lambda-transcoding-video-by-aws-mediaconvert

Ta chọn upload **.zip file**

![image.png](https://images.viblo.asia/44b344e9-9e92-4c53-839e-c4563c73aeb1.png)

![image.png](https://images.viblo.asia/288a33f1-9f53-44e6-bc2f-2647743feaa5.png)

File job.json này ta đã có được ở phần trên

Sau khi upload code, ta ấn **Deploy**

> Lưu ý: trong một vài trường hợp việc xử lý Lambda bị mất thêm thời gian đọc file từ S3, bạn cần tăng timeout của Lambda lên nhé
> 
### EventBridge

![image.png](https://images.viblo.asia/f42903c2-67e2-4f24-8901-8e9aa365bd04.png)

Ta vào service **EventBridge**, chọn **Create rule**

![image.png](https://images.viblo.asia/9f199efb-5c3c-409a-a777-619d4ec3a36f.png)

Ở đây mình tạo event có tên **video-convert-uploaded**, bấm Next

![image.png](https://images.viblo.asia/0efda6f7-6220-4acb-ab96-9903dfbdd048.png)

Trong phần **Event pattern**, chúng ta chọn event type như trên vào chỉ check trong bucket input thôi nhé

![image.png](https://images.viblo.asia/167c235d-bdbe-41f6-80ec-fa91e09dd5c5.png)

Tại step **Select target(s)**, ta chọn Lambda vừa tạo bên trên

Ta next đến bước cuối cùng và chọn **Create rule**

![image.png](https://images.viblo.asia/4c1abde6-2aca-4906-a85c-a5acdbafb0bb.png)

Lambda đã nhận được trigger event trên

Công đoạn setup cuối cùng là **IAM**, để cung cấp thêm quyền xử lí cho **Lambda function**

### IAM

Để tới nhanh Role, ta vào Configuration >> Permissions và ấn vào Role name

![image.png](https://images.viblo.asia/b455c54f-6ccc-47df-817f-950da58f3960.png)

![image.png](https://images.viblo.asia/4e174bb2-f8f6-4296-8482-c4e0bac6e9b0.png)

Chọn **Attach policies**

Ta cần thêm các policy sau
* **AmazonS3FullAccess**
* **AWSElementalMediaConvertFullAccess**


## Test

Như vậy sau một quá trình dài setup, ta cùng thử kiểm tra thành quả nhé

Ta upload một file video HD lên S3 bucket input

Mình upload một file video-test1.mp4 lên bucket **kid328-video-input**

![image.png](https://images.viblo.asia/797e841a-7e98-4633-bf0e-74e7d18367b9.png)

Vậy là phía MediaConvert đã nhận được job và tiến hành xử lý

Status bên MediaConvert là COMPLETE thì job đã xử lý thành công

![image.png](https://images.viblo.asia/ba4f8c40-637c-4ae6-b235-b97bc365e120.png)

![image.png](https://images.viblo.asia/0d16bd22-23c2-4e40-846d-480668f89c62.png)

![image.png](https://images.viblo.asia/44ae2b05-9b61-4106-a399-76870d4b8f86.png)

> Lưu ý: Nếu có lỗi xảy ra bạn có monitoring trong Cloudwatch Logs group
> 

Cảm ơn mọi người đã theo dõi bài viết tới cuối 😀😀

Source code Lambda: https://github.com/dtdat1997/aws-lambda-transcoding-video-by-aws-mediaconvert

-----


*Nguồn tham khảo: https://aws.amazon.com/vi/blogs/media/vod-automation-part-1-create-a-serverless-watchfolder-workflow-using-aws-elemental-mediaconvert/*