# Mở đầu

Tản mạn trên [Quiita](https://qiita.com/nasuB7373/items/0e507abad2017976c407), mạn phép share bài viết về tạo 1 Webapp sử dụng kĩ thuật infra rất được ưa chuộng hiện nay đó là **Docker**, **CircleCI**, **AWS**,
Backend sử dụng **Laravel**, FrontEnd sử dụng **Vue.js**.

# Overview về app
Đây là SNS app phục vụ việc meeting buổi sáng (hoặc meeting online nói chung)
App được đặt tên là **「AsaKotsu」「朝活」**.

URL vào app ở link sau, hiện tại mới hoàn thiện bản trên PC, chưa hoàn thiện trên SP, các bạn có thể vào thao tác thử nhé :v:
URL：https://pf.asakotsu.com/
GitHub：https://github.com/ngsw877/asakotsu

### Các màn hình sử dụng

Top page（List các bài post và ranking etc)
![スクリーンショット 2020-11-16 8.00.00.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/cf1c1ea2-5a3e-fbcf-ae1b-772e55141b12.png)

List post của mỗi tag
![スクリーンショット 2020-11-22 20.10.06.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/120b28b4-af86-d23d-ab12-8aa5c6232ba8.png)

Post detail và List comment
![スクリーンショット 2020-11-22 20.05.41.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/bc44ba04-361b-9817-acc9-2ce9da89fd30.png)

List Zoom Meeting
![スクリーンショット 2020-11-16 22.44.58 2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/80cb57df-8cf4-9284-8e48-6070c8dc9426.png)

User detai
![スクリーンショット 2020-11-16 23.06.16.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/1f5f32c4-ee2c-4842-9fea-c6049c689640.png)

Unlimited scroll
![infinitscroll.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/ea04f26f-d1cb-2610-a236-15f80e31e28e.gif)


### Tính năng của app

Cơ bản thì gồm các chức năng SNS như là Post bài, comment, Like, Follow gôngiống như twitter, ngoài ra còn có các đặc tính sau đây:

* Thông qua app, gọi đến ZoomAPI để Thêm/Sửa/Xóa được Asakotsu Zoom Meeting
* Set giờ báo thức, record được số ngày dậy sớm theo giờ báo thức
* Chức năng sếp ranking theo số ngày dậy sớm theo giờ báo thức (summary theo đơn vị tháng)
* Gắn tag vào bài post (gắn category), có thể share bằng các tag

# Kĩ thuật sử dụng trong app

* __FrontEnd__
  * __Vue.js 2.6.11__
  * __jQuery 3.4.1__
  * __HTML / CSS / Sass / MDBootstrap__

* __Backend__
  * __PHP 7.4.9__
  * __Laravel 6.18.36__
  * __PHPUnit 8.5.8__
  * __ZoomAPI (guzzlehttp/guzzle 7.0.1)__

* __Infra__
  * __CircleCi__
  * __Docker 19.03.12 / docker-compose 1.26.2__
  * __nginx 1.18__
  * __mysql 5.7.31 / PHPMyAdmin__
  * __AWS__ ( EC2, ALB, ACM, S3, RDS, CodeDeploy, SNS, Chatbot, CloudFormation, Route53, VPC, EIP, IAM )


Logic bên server được code bằng PHP/Laravel, các thiết kế chi tiết của Frontend hiệu chỉnh bằng Sass, khi thêm thao tác thì thực hiện bằng Vue.js và Query.
Sử dụng Docker/docker-compose trên môi trường dev,
về piperline CI/CD, thực hiện Autotest-build bằng CircleCI,
và cho auto deploy bằng CodeDeploy của AWS.

# Cấu tạo infra

![AWS_Diagram.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/c405b8d3-5864-1674-ec7d-2e041a98ec69.png)


#### Môi trường dev, Môi trường product
Trên môi trường dev, sử dụng `Docker / docker-compose`, chia ra sử dụng 4 container sau đây:
1. Web server container： Nginx
2. Application container： PHP / Laravel / Vue.js
3. DB container： MySQL
4. DB Management container： PHPMyAdmin

Refer link：

- [絶対に失敗しないDockerでLaravel+Vueの実行環境（LEMP環境）を構築する方法〜前編〜](https://qiita.com/shimotaroo/items/29f7878b01ee4b99b951#8docker-composeyml%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)

- [絶対に失敗しないDockerでLaravel6.8+Vueの実行環境（LEMP環境）を構築する方法〜後編〜](https://qiita.com/shimotaroo/items/679104b7e00dd9f89907)

- [phpMyAdmin on docker が便利すぎる
](https://qiita.com/furu8ma/items/50718efebee20fd24517)

AWS trên môi trường PRD vốn mong muốn là deploy bằng ECS nhưng mà đoạn này khó quá, bỏ qua, tìm hiểu sau :vulcan_salute: 
nên lần này tạm dùng EC2 để deploy do đã có kinh nghiệm.

#### Phát hành SSL certification
Phát hành SSL certification thực hiện HTTPS hóa nên sử dụng `ACM(AWS Certificate Manager)`.

Để sử dụng ACM thì cũng cần thêm `ALB(ELB)` và `CloudFront` và EC2, khá phức tạp nên lần này tôi áp dụng ALB.
Ngoài ra, dù là dùng ALB, nhưng do chưa tính được lượng access nào mà gây quá tải nên tạm chuẩn bị 2 instance EC2.
Và **keymark ở address bar, nếu không setting proxy bên Laravel thì sẽ không đọc được file css và js, routing sẽ không được https hóa** nên cần lưu ý điểm này

Refer link：
- [AWS：無料でSSL証明書を取得する方法](https://qiita.com/iwaseasahi/items/1687426add4124899fe3)
- [信用するプロキシの設定](https://readouble.com/laravel/6.x/ja/requests.html)
 

#### Upload lên S3 bucket
Về S3 chia ra làm 2 phần sau
1. Lưu source đã build bằng CircleCI
2. Lưu data hình ảnh đã upload bằng app trên EC2

Mục số 2. cần phải setting bucket policy của S3, install package dành cho S3 nữa.

Refer link：

- [Rails, Laravel(画像アップロード)向けAWS(IAM:ユーザ, S3:バケット)の設定](https://qiita.com/nobu0717/items/4425c02157bc5e88d7b6)
- [LaravelでAWS S3へ画像をアップロードする](https://qiita.com/nobu0717/items/51dfcecda90d3c5958b8)


#### Setting push notification to Slack
Hiện nay thông qua `CodeDeploy`,`SNS`. `Chatbot` có thể bắn các thông báo khi bắt đầu - kết thúc deploy lên Slack. khá là tiện.

# Function list

* __About User Register__
  * Chức năng Sign up. Edit profile
  * Chức năng login. logout
  * Chức năng login đơn giản ( login dành cho guest user）

* __Liên kết ZoomAPI__
    * Chức năng Asakotsu Zoom Meeting (CRUD)
      * Thêm mới Meeting, hiển thị list, Edit, Xóa

* __Chức năng nhận định dậy sớm thành công__
  * Mỗi user đều có thể setting thời gian target thức dậy（trong khoảng 4:00〜10:00）
  * Nếu post bài trước giờ thức dậy thì số ngày dậy sớm tăng lên 1<br>
    * ※Lưu ý phải detect sao cho các bài post xuất hiện sau giờ đêm khuya sẽ không được count ngày dậy sớm<br>
   　  và post bài sớm hơn giờ thức dậy 3 tiếng cũng không được tính<br>
       （Ex）Set giờ thức dậy là 7:00 thì khi post bài trong khoảng 04:00~07:00 thì sẽ được count. 

* __Chức năng ranking số ngày dậy sớm của user（monthly）__

* __Chức năng unlimited scroll__ (jQuery / inview.js / ajax)

* __About user post(CRUD)__

* __Chức năng comment__

* __Chức năng tag__ (Vue.js / Vue Tags Input)

* __Chức năng like__ (Vue.js / ajax)

* __Chức năng follow__
  - Following/Follower list（phân trang）

* __Chức năng hiển thị flash message__ (jQuery/ Toastr)
  * Hiển thị flash message khi Post, Edit, Delete, Login. Logout.

* __Chức năng upload ảnh__ (AWS S3バケット)

* __PHPUnittest__


# DB design

#### ER diagram

![AsaKotsu_ERD.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/613419/393cb6d0-0b10-918b-f79b-321805de41f8.png)

#### Tables

| Tables name | Description |
|:-:|:-:|
| users  | registered users info |
|  follows | Following/Followers info  |
| achievement_days  | quản lý data lịch sử ngày giờ đã thức dậy sớm  |
| meetings  | thông tin Zoom MTG user đã tạo  |
| articles  | thông tin user post  |
| tags  | thông tin tag của user post  |
| article_tags  | table trung gian giữa article và tags  |
| likes  | thông tin like post |
| comments  | thông tin các comment đến user post  |

#### Chức năng báo dậy sớm\

`wake_up_time`của table **users** là phần record **giờ báo thức**.
Nếu dậy sớm hơn giờ đã set và post bài thì user đa đạt chỉ tiêu.

và cũng cân nhắc sao cho khi 「giờ báo thức là 7:00, post bài lúc 1:00」thì trường hợp này sẽ không được tính vì nó quá sớm so với giờ hẹn, như đã lưu ý ở trên.
Để đạt được cơ chế này thì có thêm giá trị `range_of_success` trong bảng **users** .
Giá trị này là chỉnh số thể hiện phạm vi cho phép count dậy sớm thành công bằng cách khoanh vùng thời gian.
Default là `3`, ví dụ đặt giờ báo là **07:00** thì cho phép trong khoảng trước đó 3 tiếng, tức là khoảng từ **04:00 〜 07:00** mà post bài thì sẽ coi là dậy sớm thành công

Khi dậy sớm thành công thì sẽ record lịch sử ngày dậy sớm này vào giá trị `date` của bảng **achievement_days**.
`例） 2020-11-22`
Dùng data của ngày này để thực hiện chức năng sau:
**① 　Tính ra số ngày dậy sớm trong 1 tháng**
**②　Sử dụng kết quả ở ① để tính ranking**

※ Do đây là app hướng đến hoạt động buổi sáng nên giờ thức dậy ban đầu tôi dự định để set trong khoảng 04:00~10:00 nhưng hiện tại tôi thử nghiệm hướng open, để set khoảng giờ nào cũng được.
--Tobe continued--