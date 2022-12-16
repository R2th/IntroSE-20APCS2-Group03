Với `create-react-app` bạn có thể tạo một web với React một cách dễ dàng. React là `static` có nghĩa là khi bạn build ra file thì sẽ không cần phải chạy server gì cả. Tất cả mọi thứ sẽ được xử lý ở trình duyệt. Để đưa React app online thì bạn chỉ cần kiếm 1 cái static hosting và upload thư mục build lên đấy. Amazon S3 là một trong những dịch vụ có thể giúp bạn đưa React app lên online. 
## Create-React-App
Để tạo nhanh một project app với react thì chỉ cần chạy 
`reate-react-app s3-test`
Sau khi chạy xong thì chạy `yarn start` là xong

![](https://images.viblo.asia/fc2eeab1-75a5-4a8d-8818-69729bdf114a.png)
## Cấu hình AWS
Bạn cần tạo thêm một user có đầy đủ quyền với `s3`. Vào https://console.aws.amazon.com/iam/home, chọn tab `user` bên menu bên trái, chọn `Add user`

![](https://images.viblo.asia/c1dc785a-dd84-472e-9aa6-e595c562cfe3.png)

Sau đó thì chọn quyền cho user. Tích chọn `AmazonS3FullAccess` Rồi next đến khi xong

![](https://images.viblo.asia/489a37c5-2ede-4647-ade0-7703e3b430cd.png)

Sau khi tạo xong thì nhớ copy lại `Access key id` và `Access secret key`

![](https://images.viblo.asia/34baad6c-a3df-4113-9255-7d7d5f954203.png)
## AWS CLI
aws cli là công cụ giúp bạn có thể quản lý `aws service` chỉ trên terminal. Bạn xem thêm cách cài ở đây https://docs.aws.amazon.com/cli/latest/userguide/installing.html
Sau khi đã cài xong thì gõ lệnh `aws configure`. Rồi điền `Access key id` và `Access secret key` theo như hướng dẫn trên terminal

![](https://images.viblo.asia/574ca592-9b6d-4ad9-84ba-1a4e268857eb.png)
## Tạo bucket s3
Kế tiếp là sẽ tạo bucket trên s3. https://console.aws.amazon.com/s3/home

![](https://images.viblo.asia/056fa23b-756c-4f28-9fc4-16f3e2b9d3c0.png)

Khi tạo xong thì sẽ trông như thế này

![](https://images.viblo.asia/82e00dcc-3328-4e32-8e4c-80c03b980c9a.png)

Việc cần làm kế tiếp là
* Cập nhật quyền
* Cài đặt bucket như là một static hosting
Để cập nhật quyền chọn vào `Bucket Policy` xong nhấn vào `Policy Generator`, bạn sẽ thấy 1 form như sau

![](https://images.viblo.asia/81ec318a-ab99-4bce-bfbe-ee59fdfc0a1a.png)

Ở step 1 chọn `S3 Bucket Policy`
Step 2 thì Efect: Alllow, Principal: , AWS Service: Amazon S3, Actions: "GetObject". Ở ARN thì ghi `arn:aws:s3:::{BUCKETNAME}/`. BUCKETNAME ở đây là tên s3 bucket bạn vừa tạo
Click vào `Add Statement` sau đó `Generate Policy` thì sẽ nhận được một chuỗi như sau
```
{
  "Id": "Policy1511261302545",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1511261285825",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::wonderful-app/*",
      "Principal": "*"
    }
  ]
}
```
Copy và paste vào `bucket policy` rồi save

![](https://images.viblo.asia/92d188b5-c5a0-4fd0-a6e3-9203947ea2f5.png)

Tiếp đến là nhấn vào tab `Properties`chọn `Static Website hosting` ghi `index.html` vào Index document và Error document. Thế là xong.
Tiếp đến là chỉnh lại script trong package.json một chút. Thêm dòng `deploy` vào

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "deploy": "aws s3 sync build/ s3://wonderful-app",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```

bây giờ khi nào muốn deploy thì bạn chỉ cần chạy `yarn build` sau đó thì chạy `yarn deploy`. Xong !!!
Nguồn: https://medium.com/ovrsea/deploy-automatically-a-react-app-on-amazon-s3-iam-within-minutes-da6cb0096d55