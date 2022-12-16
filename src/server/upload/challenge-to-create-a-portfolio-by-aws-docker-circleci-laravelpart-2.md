# Những vấn đề gặp phải

Trong quá trình phát triển đến khi deploy thì dĩ nhiên không tránh khỏi các bug còn sai sót, ở đây tôi sẽ chỉ đề cập đến các issue nổi cộm mà tôi có ấn tượng.

## Các vấn đề với CircleCI :sweat_smile:

* Setting **config.yml** có trong file setting CircleCI
* Đọc hiểu flow build tự động - test tự động

Về setting config.yml đã gặp rất nhiều sai sót dẫn đến error, đặc biệt là khi chỉ định command và path, tôi đã hiểu được tầm quan trọng của khởi điểm của route path.
Khi test failed, tôi thường phải login SSH vào container đã build, check log và giải quyết các nguyên nhân.

Refer link： [Debug sử dụng SSH](https://circleci.com/docs/ja/2.0/ssh-access-jobs/)

## Các vấn đề deploy bằng AWS

* phát hành SSL certification ở ACM
* Setting upload ảnh lên S3 bằng Laravel
* Setting auto deploy ở CodeDeploy（đặc biệt là appspec.yml）
* setup EC2 instance

Xoay quanh các nội dung đề cập ở trên cũng gặp vài case error
[phát hành SSL certification](####SSL証明書の発行)
[Upload S3 bucket ](####S3バケットへのアップロード)
Ngoài ra , lần này không deploy bằng ECS mà bằng EC2m nhưng sau khi SSH login vào EC2 thấy có rất nhiều file setting được install, thao tác rất vất vả. Nên nói về effort thì quả nhiên làm với ECS sẽ tránh được các phiền toái này.

## Các vấn đề bên Front

* Điều chỉnh UI/UX（Sass）
* Ajax regular

## Các vấn đề bên Backend

* DB design
* Các xử lý liên quan DB
* tổng quan test bằng PHPUnit

Các vấn đề liên quan DB khó nhằn nhất chính là nên join bảng nào với bảng nào, các thông tin đã liên kết sẽ get kiểu gì
ngoài ra tôi cũng hiểu được tầm quan trọng của điểm khác biệt giữa 2 biến kiểu như:
* $article->user()
* $article->user

Và để viết code test PHPUnit tôi cũng khá vất vả trong việc tổng hợp kiến thức vì không có tài liệu nào có thể học tổng quan hệ thống được phần này.

## Các vấn đề trong liên kết ZoomAPI

* Đọc hiểu Guzzle
* Đọc hiểu ZoomAPI

Từ bên app này có thể thêm/sửa Zoom MTG một cách đơn giản, tôi cũng có kinh nghiệm trong việc sử dụng API ngoài vậy mà vẫn thấy ca hiểu được cơ chế truyền tin của API và cú pháp cũng khá là khó nhằn.

Trước hết khi thực hiện. để có thể kết nối với ZoomAPI bằng Laravel, cần cài đặt **Guzzle**  HTTP Client của PHP.

Refer link：

* [Guzzle 7 official document (english version)](https://docs.guzzlephp.org/en/latest/)
* [PHP HTTP client Guzzle](https://qiita.com/yousan/items/2a4d9eac82c77be8ba8b)

Sau đó đăng kí app trên [Zoom app market place](https://marketplace.zoom.us/), đọc doc bản offical toàn tiếng anh nên lại khó nhằn tập 2 :smile: 
Giới thiệu sample code xử lý thực hiện truyền tin với ZoomAPI bằng Laravel etc đều là các tài liệu nước ngoài, nên tôi cũng học thêm được cách làm sao tìm kiếm được đúng thông tin mình cần

Refer link：

* [ZoomAPI official document (English)](https://marketplace.zoom.us/docs/api-reference/introduction)
* [Manage Zoom Meeting Rooms through Zoom API with Laravel](https://kim-jangwook.medium.com/manage-zoom-meeting-rooms-through-zoom-api-with-laravel-ff40b89f921b)

Tuy nhiên lần này tôi phát triển app với Laravel6.x cho nên có chỗ không dùng được Guzzle wrapper mà có thể sử dụng được bình thường ở Laravel7, nên đôi khi phải đổi hướng code.


# Các tài liệu tham khảo

Từ basic thì tôi học được bằng **Udemy** và **Techpit**, 2 cái này rất là dễ hiểu, cá nhân tôi thì học phần Udemy trước, vận dụng nó học tiếp Techpit thì sẽ đơn giản và nhanh hiểu hơn.

### Docker / docker-compose

* [【Udemy】American API developer 's Docker course from zero](https://www.udemy.com/course/aidocker/learn/lecture/20294805?start=0#overview)

### PHPUnit / CircleCI / AWS
* [【Techpit】Learn Laravel × CircleCI × AWS CI/CD](https://www.techpit.jp/courses/78)

### AWS
* [【Udemy】AWS：pratise from zero Amazon Web Services](https://www.udemy.com/course/aws-and-infra/)
* [【Udemy】AWS authenfication solution architect](https://www.udemy.com/course/aws-associate/)
* [【others】Amazon Web Services network and server knowledge from basic](https://www.amazon.co.jp/Amazon-Web-Services-%E5%9F%BA%E7%A4%8E%E3%81%8B%E3%82%89%E3%81%AE%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF%EF%BC%86%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E6%A7%8B%E7%AF%89-%E6%94%B9%E8%A8%823%E7%89%88-%E5%A4%A7%E6%BE%A4-ebook/dp/B084QQ7TCF/ref=sr_1_2?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=aws&qid=1606093752&sr=8-2)

### Laravel
* [【Udemy】from PHP to Laravel, implement server side](https://www.udemy.com/course/phpbeginnertolaravel/)

### Laravel / Vue.js
* [【Techpit】Create web service style SNS by Laravel(+Vue.js)](https://www.techpit.jp/courses/11)

### Sass
* [【Udemy】How to write CSS effectly ](https://www.udemy.com/course/sass-for-frontend-engineer/)


# Các vấn đề sau này

* Responsive Web design (for SP)
* improve design
* fix bug in unlimited scroll
* thêm Auto Scaling vào ALB,  EC2 đổi về dự phòng
* deploy bằng ECS(EKS)
* RDS đổi về dự phòng
* code hóa phần infra
* thêm chức năng search
* thực hiện test code
* khi post bài thì sẽ ko di chuyển sang màn hình mới mà cho hiển thị form nhập dạng model
* Thêm chức năng filter ZoomMTG đã kết thúc/chưa start

vẫn còn rất nhiều các thiếu sót ở app này tuy nhiên hi vọng bài giới thiệu này sẽ giúp ích làm thông tin tham khảo cho mọi người :v: