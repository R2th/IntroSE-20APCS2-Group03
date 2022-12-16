### 1. Vấn đề về resize ảnh trong s3
Để tối ưu image và tăng tốc độ load web, chúng ta cần phải tối ưu lại dung lượng của ảnh và kích thước của nó. Điều này đã được amazon s3 hỗ trợ khá là đầy đủ. Về cơ bản khi ta có link s3 public, nếu có quyền sửa ảnh và muốn chỉnh kích thước, thì chỉ cần thêm width, height trên url. amzon s3 sẽ tự sinh ra một thư mục ảnh với kích thước ảnh như vây. Nhưng việc config s3 về quyền và các bước thì cũng khá là dài và sẽ được nói đến ở dưới đây.

### 2. Config với S3

step 1: trong S3 console, tạo một S3 bucket name. (url: https://console.aws.amazon.com/s3)
![3340_1](https://user-images.githubusercontent.com/12491647/33306377-ed86299c-d444-11e7-956a-3c66928d3932.png)
step 2: upload image test, điều này để chúng ta test quyền.
![3340_2](https://user-images.githubusercontent.com/12491647/33306406-0fca8976-d445-11e7-99e9-635e8fdaaf79.png)
step 3: Chọn Permissions, Add Bucket Policy. Add a bucket policy to allow anonymous access.
![3340_3](https://user-images.githubusercontent.com/12491647/33306594-c241f9b8-d445-11e7-9eba-06670e658b97.png)
-generate policy
![3340_4](https://user-images.githubusercontent.com/12491647/33306588-bdedc266-d445-11e7-8cca-00b3dfb4c09c.png)
- copy phần bucket policy
![3340_5](https://user-images.githubusercontent.com/12491647/33306595-c4daa2f6-d445-11e7-8297-466db3665a0b.png)

step 4: Chọn Static Website Hosting, Enable website hosting và mục Index Document nhập index.html.
![3340_6](https://user-images.githubusercontent.com/12491647/33306720-402a878c-d446-11e7-9539-a13bb3dc241a.png)
step 5: Note lại bucket name chúng ta đã tạo và hostname của phần Endpoint.

### 3. Tạo Lambda function:
step 1: Trong Lambda console, chọn Create a Lambda function, Blank Function.
![3340_2_1](https://user-images.githubusercontent.com/12491647/33306844-c5f16b42-d446-11e7-8a5e-84f588ba2912.png)
![3340_2_2](https://user-images.githubusercontent.com/12491647/33306846-c664021a-d446-11e7-9b88-f3bed10462af.png)
step 2: Để chọn integration, hãy chọn hình vuông chấm và chọn API Gateway.
step 3: Để cho phép tất cả người dùng gọi phương thức API, trong Security, chọn Open và sau đó Next.
![3340_2_3](https://user-images.githubusercontent.com/12491647/33306890-026eae18-d447-11e7-92ec-3a41ad873138.png)
step 4: Ở phần Name, chọn resize. phần Code entry type, chọn Upload a .ZIP file.
step 5: Chọn Function package và upload the .ZIP file (file này là code đã được amazon xử lý, có thể custom lại nó để phù hợp với chức năng project)
[function.zip](https://github.com/LancersDevTeam/now/files/1508824/function.zip)
![3340_2_4](https://user-images.githubusercontent.com/12491647/33306986-76cf2580-d447-11e7-99dd-b8c9db7669fb.png)
step 6: To configure your function, ở phần Environment variables, thêm 2 giá trị
Với Key nhập BUCKET, phần giá trị nhập bucket name đã tạo ở trên
phần Key thứ 2, nhập URL, và giá trị là endpoint field mà chúng ta đã note lại ở trên, prefixed with http://.
![3340_2_5](https://user-images.githubusercontent.com/12491647/33307066-ce67ccfc-d447-11e7-848a-51e36add9da9.png)

step 7: set quyền: mục Role, chọn Create a custom role. chọn View Policy Document, Edit, Ok.
![3340_2_6](https://user-images.githubusercontent.com/12491647/33307084-e69664c8-d447-11e7-8d4f-2c97569c0cc5.png)
![3340_2_7](https://user-images.githubusercontent.com/12491647/33307236-626d6038-d448-11e7-9645-6904cf67cdab.png)

step 8: thay thế YOUR_BUCKET_NAME_HERE với tên của bucket name đã tạo và copy code như dưới đây. Phần này không được để trống
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::__YOUR_BUCKET_NAME_HERE__/*"    
    }
  ]
}
```
step 9: mục Memory, chọn 1536. mục Timeout nhập giá trị 10 sec. Next và Create function.
step 10: Chọn Triggers và ghi lại hostname trong URL function của bạn.
![3340_2_8](https://user-images.githubusercontent.com/12491647/33307454-21059e98-d449-11e7-8d68-502806408df2.png)

### 4. Cài đặt redirect rule s3

step 1: Trong S3 console, mở bucket đã tạo.
step 2: Mở Static Website Hosting, Sửa lại Redirection Rules.
step 3: thay thế YOUR_API_HOSTNAME_HERE với hostname mà chúng ta đã note lại ở trên và sửa code như ở dưới để config cho Redirection Rules.

```xml
<RoutingRules>
    <RoutingRule>
        <Condition>
            <KeyPrefixEquals/>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <Protocol>https</Protocol>
            <HostName>4zfx8xas03.execute-api.us-east-1.amazonaws.com</HostName>
            <ReplaceKeyPrefixWith>prod/fc-pook-resize-image?key=</ReplaceKeyPrefixWith>
            <HttpRedirectCode>307</HttpRedirectCode>
        </Redirect>
    </RoutingRule>
</RoutingRules>
```
![3340_2_9](https://user-images.githubusercontent.com/12491647/33307506-505d9c5e-d449-11e7-9e95-f7425948cbd1.png)

step 10: ấn vào  LambdaMicroservice
![3340_2_10](https://user-images.githubusercontent.com/12491647/33307544-75367794-d449-11e7-92cc-f9ee8ca9605f.png)
redirect
![3340_2_11](https://user-images.githubusercontent.com/12491647/33307561-85f77060-d449-11e7-9e78-7f6c99f9fa0e.png)

step 11: thêm key vào Method Request
![3340_2_12](https://user-images.githubusercontent.com/12491647/33307609-b0a6ee3a-d449-11e7-97c5-4198ce125c8c.png)

step 12: thêm role của iam service
![3340_2_13](https://user-images.githubusercontent.com/12491647/33307694-0ee96770-d44a-11e7-9e13-cbc5e23e0e51.png)
step 13:
![3340_2_14](https://user-images.githubusercontent.com/12491647/33307701-13230832-d44a-11e7-8021-eed1a9aa3ced.png)
![3340_2_14_1](https://user-images.githubusercontent.com/12491647/33307723-2972c848-d44a-11e7-87c4-aaf23bceb065.png)
kết quả: (link endpoint + image_name)
http://pook-resize-image.s3-website-us-east-1.amazonaws.com/100x100/IMG_0563.JPG
=> s3 sẽ tự động tạo thư mục 100x100
![3340_2_17](https://user-images.githubusercontent.com/12491647/33307866-c12fd7e8-d44a-11e7-89c1-547c98116c12.png)

### 5. Kết luận
Amazon s3 hỗ trợ chúng ta rất tốt trong việc xử lý ảnh để tối ưu cho project của mình. Cũng chính vì thế mà tài liệu khá dài và phức tạp, hi vọng qua bài viết này thì đối với những người mới bắt đầu, sẽ cài đặt dễ dàng hơn.

### 6. Tài liệu tham khảo
https://aws.amazon.com/blogs/compute/resize-images-on-the-fly-with-amazon-s3-aws-lambda-and-amazon-api-gateway/