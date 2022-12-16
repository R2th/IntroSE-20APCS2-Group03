![](https://images.viblo.asia/a31f8cff-035e-48df-a7a9-f2613b2763bf.png)

Xin chào các bạn,

Như các bạn đã biét thì `React` và `Amaazon Web Service` là hai từ khoá được nhắc đến rất nhiều trong thời gian gần đây với sự tiện dụng mà nó mang lại đến cho developer lẫn người sử dụng. Và trong bài viết này mình sẽ giới thiệu cho các bạn về cách có thể deploy được một React App lên AWS S3 một cách dễ dàng, mà có thể tiết kiệm được phần lớn chi phí


### Các công nghệ sẽ sử dụng trong bài viết này

* **Amazon S3** (https://aws.amazon.com/s3/) để static web hosting
* **Buddy** (https://buddy.works/) để continuous deployment
* **Github** để lưu trữ source code của bạn
* **Amazon Route 53** (https://aws.amazon.com/route53/) để quản lý domain của bạn
* **Amazon CloudFront** (https://aws.amazon.com/cloudfront/) 
* **AWS Certificate Manager** (https://aws.amazon.com/certificate-manager/) để cung cấp certificates để giúp đảm bảo tính bảo mật của app
* **AWS Identity and Access Management (IAM)** để tạo account với những quyền được định sẵn cho Buddy

#### Prerequisites
* **Github account** (https://github.com/join)
* **AWS account** (https://portal.aws.amazon.com/billing/signup#/start)
* **Buddy account** (https://app.buddy.works/sign-up)
* **Node** installed (https://nodejs.org/en/download/)

#### Tạo React App
Bạn có thể follow theo hướng dẫn để có thể tạo ra một React App sử dụng *Create React App (https://facebook.github.io/create-react-app/). Để bắt đầu thì ta sẽ thực hiện trên terminal như sau

```bash
npx create-react-app introduction
cd introduction
yarn start
```

Sau khi `start` xong thì bạn có thể vào http://localhost:3000/ và kết quả như sau:

![](https://images.viblo.asia/a981a895-c1b0-4056-beeb-bd13c686750f.png)

Các bạn có thể tiếp tục develop site của bạn ở đây. Tuy nhiên, trong bài viết này mình không focus vào React App nên sẽ chỉ tạo đến đây và chuyển tiếp sang các step khác để deploy app lên S3

#### Push app lên Github

Đây là một trong những bước rất cơ bản và đơn giản, tuy nhiên với một bài viết đại trà cho tất cả mọi người thì mình vẫn xin phép hướng dẫn step-by-step cho những bạn mới hoặc newbie có thể follow được. Trong `Github`, click vào dấy `+` rồi bấm `New repository`

![](https://images.viblo.asia/0a03c1e5-ea6d-40fe-acd3-a1aed489a8ed.png)

Tiếp theo bạn sẽ nhìn thấy trang tương tự như sau
![](https://images.viblo.asia/47cdf78c-2b8f-480a-a429-3adb3bd71d14.png)

Điền thông tin `repository name` và `desription`, chọn trạng thái của repositoty (`private` hoặc `public`)

Sau khi bấm `Create repository` ta có kết quả như sau 
![](https://images.viblo.asia/7d93fa59-d0ba-458d-8617-2e421a0f7768.png)
Tiếp theo bạn làm theo các bước như trong hướng dẫn ở trong ảnh để có thể push code github của bạn lên repository. (Phần này mình tham khảo ảnh trên mạng). Và kết quả là như  sau:

![](https://images.viblo.asia/136c5c7d-9e2f-4666-967f-d45eaccf26ff.png)

Ngoài ra, bạn có thể setup ssh key khi push hoặc pull code. Có thể đọc theo hướng dẫn sau https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account.

#### Làm việc với AWS S3

Bây giờ chúng ta sẽ bước sang làm việc với S3, để build app. 

![](https://images.viblo.asia/ed9fb75c-7d9c-449d-8d58-0c4b86807a19.png)

Mọi người tạo bucket thêm tên rồi bấm `Next`

![](https://images.viblo.asia/108ea041-3077-46e5-824b-95273f85152c.png)

Ở trong `Configure options` tab, bạn không cần chọn gì cả chỉ cần click `Next`. Ở trong `Set permissions` tab, bạn cần phải uncheck `Block all public access`. Bạn sẽ hosting app của bạn với bucket này, bạn sẽ cần phải public để có thể access vào code của bạn.

![](https://images.viblo.asia/b00f3970-ceef-4f38-a028-8fa3cec2882f.png)

Click `Next`, và review những bucket config và click `Create bucket`. Bạn sẽ nhìn thấy bucket của mình ở phần list bucket. 

Chọn vào bucket bạn vừa tạo sau đó click vào `Properties` tab và sau đó chọn `Static website hosting` box

Click `Use this bucket to host a website` và cũng chọn index document với với index.html trước khi save.

![](https://images.viblo.asia/d83f4da0-ff37-4633-a7d6-ae86993da70e.png)

Và bạn sẽ thấy status đổi sang là `Bucket hosting`. Bạn có thể click vào `Static website hosting` sẽ mở ra đường dẫn tương ứng `endpoint`

Tuy nhiên, khi vào đường link đó bạn sẽ thấy lỗi như sau 

![](https://images.viblo.asia/11336c43-57d8-4a0a-af47-a455311a4a04.png)

Để sửa lỗi này, chuyển đến Permissions tab và click vào `Bucket policy` và điền thông itn  như sau

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "bucket-name"
        }
    ]
}
```

Và refresh lại page thì sẽ đổi thành lỗi khác 

![](https://images.viblo.asia/e6b54267-f391-4db7-bcc0-ff10a4f3dc79.png)

Để xử lý vấn đề này đầu tiên bạn cần build app của mình 

```bash
yarn build
or
npm run build
```

Và sau đó thì chúng ta sẽ upload toàn bộ dữ liệu trong thư mục build lên S3 
![](https://images.viblo.asia/0e4ef6c9-14a4-440d-b86c-58937ba9f741.png)

![](https://images.viblo.asia/7d3b39ab-c84b-4a0e-8e39-b939a4920802.png)

và khi reload lại thì bạn đã thấy app của mình chạy được rồi đó

#### Continuous Deployment

Ở trong bước này chúng ta sẽ setup continous deployment để có thể push code một cách tự động lên s3 bucket. Và để làm được điều đó chúng sẽ sử dụng Buddy https://buddy.works.

Đầu tiên, login vào Buddy. Nếu lần đầu bạn sử dụng dịch bị thì chúng ta sẽ  thấy trang giới thiệu như dưới đây.

![](https://images.viblo.asia/dc5c52d7-bfff-474d-8514-740872c2e27b.png)

Create một project bằng cách connect với Github và chọn repository bạn đã trước đó.

![](https://images.viblo.asia/6a26f8b9-e81c-464e-819f-0128ce131226.png)

Đầu tiên bạn cần link Buddy và Github với nhau thành công, chúng ta có thể build một deployment pipeline mới 

![](https://images.viblo.asia/0597ab5f-e0d7-42a3-a6b4-2ec6f7941f9f.png)

Gọi pipeline bất cứ khi nào bạn mong muốn với trigger `On push` Tức là mỗi khi bạn push thì sẽ deploy một lần 

![](https://images.viblo.asia/bb248d86-e3d0-428b-8de8-a095e4b53f61.png)

Một số action cần được defined. Đầu tiên là build application t ừ source code đã sẵn sàng deployment. Click `add the first action` và search `Node.js`. Đàm bảo rằng những command ở dưới sẽ đảm bảo chạy được

```bash
yarn // Installing dependencies 
yarn build // Building your application 
```

![](https://images.viblo.asia/6f451a55-9c76-418e-bac2-5d7b99d44122.png)
![](https://images.viblo.asia/a5b1fc0d-61ce-4f96-8151-7dcb64093c60.png)
![](https://images.viblo.asia/50d2a967-b781-4c25-96c4-32777681b963.png)

Bây giờ, mọi lần push lên repository, thì app của bạn sẽ tự build. Chúng ta cần thêm một số action để build files và deploy chúng lên S3 bucket. Không may mắn là kết nối của Buddy tới AWS không đơn giản như với Github. Bạn cần phải tạo một account đặc biệt, từ đó Buddy có thể control một số resource ở trong AWS account. Ở trong ví dụ, chúng ta muốn Buddy có quyền access và write files vaof bucket mới của bạn.

Di chuyển đến IAM (Identity Access Management) service của AWS và click và `Users`

![](https://images.viblo.asia/5c32e791-d6c1-41b3-8bc5-f7af61cf315d.png)

Click `Add user` để thêm username và mình chọn là `BuddyClient` và chọn `Programmatic access`
![](https://images.viblo.asia/f3f226ca-bd35-4cf0-9ca7-ceb11bedd987.png)

Ở page `Permissions` click `Attach existing policies directly` và search `AmazonS3FullAccess`. Quyền này sẽ cho Buddy có thể write vào bucket và không thể access vào bất cứ AWS resource khác 

![](https://images.viblo.asia/f1127ea5-ab64-459f-83ea-24d84f4db88e.png)

Click `Next` và add tags nếu bạn muốn. Cuối cùng, click `Create user`:

![](https://images.viblo.asia/1e85b111-068f-413a-913e-9b6a48d04d97.png)

Và bây giờ bạn có thể nhìn thấy **Access key ID** và **Secret access key**. Copy chúng vào một cẩn thận và "bí mật" tránh bị mất.

![](https://images.viblo.asia/2959a171-1993-4d52-9d2f-b0555c0da41a.png)

Bây giờ chugns ta quay lại Buddy à có thể add thêm action và pipeline. Search "S3"

![](https://images.viblo.asia/88a065ea-8049-4c84-84bb-5a14d7ee207e.png)

Một modal sẽ xuất hiện và chúng ta có thể thêm **credentials** lúc nãy chúng ta tạo ở `IAM`


![](https://images.viblo.asia/96ab99fa-3518-4708-9891-956321e2c828.png)

Tiếp theo, chúng ta sẽ config action như sau
1. Set source 'Pipeline Filesystem' 
2. Set ''Source path' đến `/build`
3. Set 'Bucket ID' vào bucket mà bạn đã tạo trước đó

![](https://images.viblo.asia/d359a16a-8c9a-4bab-8e7a-04e6b11a1069.png)

Và pipeline của bạn sẽ như thế này 
![](https://images.viblo.asia/9fc3cbed-26ce-4e7d-9214-cc7f7de86580.png)

Click `Run pipeline` để chắc chắn rằng mọi thứ hoạt động ổn định

![](https://images.viblo.asia/19109fba-091f-49b4-93fa-dfae3d214f0b.png)
![](https://images.viblo.asia/f1bcbf2d-d5ee-4a7c-b925-70207da370f1.png)

Để kiểm tra chắc chắn bạn thử thay đổi 1 chút trong code của mình và push thử lên để đảm bảo rằng code của bạn đã được deploy lên S3