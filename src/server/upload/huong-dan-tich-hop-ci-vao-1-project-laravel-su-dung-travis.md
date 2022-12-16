![https://api.travis-ci.org/travis-ci/travis-web.svg?branch=master](https://api.travis-ci.org/travis-ci/travis-web.svg?branch=master)
![https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.svg](https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.svg)

Trong các dự án cá nhân hay outsource thì CI (continuous integration) & CD (Continuous delivery) là rất quan trọng chắc hẳn các bạn không còn ai xa lạ đến 2 từ khoá này. Tuy nhiên hôm nay mình vẫn muốn giới thiệu qua và hướng dẫn các bạn tích hợp nó vào trong dự án. Mục đích của nó thì quá rõ rồi, các bạn có thể yên tâm merged pull. Thay vì phải căng mắt ra review check lỗi, hãy để việc đó lại cho máy móc. Nhiệm vụ của bạn chỉ cần code logic. Một project với những icon của CI và chỉ số coverage sẽ được đánh giá cao hơn rất nhiều.

## Giới thiệu
Đã không còn xa lạ nhưng mình vẫn muốn giới thiệu lại có thể có 1 số bạn vẫn còn chưa biết

> Tích hợp liên tục (CI) là phương pháp phát triển phần mềm đòi hỏi các thành viên trong nhóm tích hợp công việc thường xuyên. Mỗi ngày, các thành viên đều phải theo dõi và phát triển công việc của họ ít nhất một lần. Việc này sẽ được một nhóm khác kiểm tra tự động, nhóm này sẽ tiến hành kiểm thử truy hồi để phát hiện lỗi nhanh nhất có thể. Cả nhóm thấy rằng phương pháp tiếp cận này giúp giảm bớt vấn đề về tích hợp hơn và cho phép phát triển phần mềm gắn kết nhanh hơn. 

Trích từ [https://www.digitalocean.com/community/tutorials/an-introduction-to-continuous-integration-delivery-and-deployment](https://www.digitalocean.com/community/tutorials/an-introduction-to-continuous-integration-delivery-and-deployment)

Lý thuyết thì khó hiểu là thế nhưng thực tế nó lại ko phức tạp và dài dòng như vậy. Cứ hình dung đơn giản rằng quy trình của 1 project lúc nào cũng hình thành từ `develop -> testing -> build -> release -> deploy`
![CI - CD](https://images.viblo.asia/8339fba9-e090-4dc2-8100-fa4edfdb8e54.png)

CI sẽ đảm nhiệm giúp bạn việc testing, Tất nhiên ở đây không phải nó không phải tự động vào project của bạn rồi thao tác các kiểu để tìm ra lỗi. Những Rule để test thì hiển nhiên các bạn sẽ vẫn phải tự mình viết. Điểm coverate càng cao tức là project của bạn càng chất lượng càng được tin tưởng.

## CI hoạt động như thế nào
Cách hoạt động của CI rất đơn giản, ngày nay khi có rất nhiều những trang mạng xã hội cho lập trình viên như `github`, `bitbucket`, ... Đó là nơi lưu trữ các repo, project, hoạt động của các bạn trên 1 mạng xã hội. Các trang mạng xã hội này cũng cho phép tạo ra những webhooks, hay những services bên ngoài để giao tiếp

Khi các bạn gửi pull của mình tới repo đó (mình ví dụ ở đây là `github`) ngay lập tức nó sẽ tạo 1 trigger tới các services CI bên ngoài. Tất nhiên trước khi hoạt động này xảy ra những services CI đã yêu cầu bạn cấp quyền để có toàn quyền với project của bạn. Các services CI này thường sẽ dựng 1 môi trường có sẵn và phù hợp với project của bạn. Nó sẽ giả lập merged pull request vào và tiến hành chạy 1 loạt các `scripts` mà bạn định nghĩa để chạy test toàn bộ các rules do bạn đã đặt ra. Nếu tất các các test case thành công nó sẽ response cho bạn status pass. Nếu các rule của bạn được định nghĩa kỹ càng và chi tiết tới từng file thì hiển nhiên nó sẽ đánh điểm coverage của các bạn cực kỳ cao.

Sau khi đã hoàn thành đầy đủ các test case nó sẽ response và đưa lên thông báo lên repo của bạn. Dựa vào status đó các bạn có thể hoàn toàn yên tâm merged pull request mà không cần mất quá nhiều thời gian của mình cho việc review lại code nữa.

## Tích hợp với project PHP 
Có rất nhiều những services về CI ngày nay như 
`circleci, travis, Jenkin, ...` 

Mình thì thường sử dụng 1 open source Travis [https://docs.travis-ci.com/](https://docs.travis-ci.com/)

Ưu điểm của nó là free, nhanh gọn đơn giản và cực kỳ dễ sử dụng, thời điểm hiện tài mình thấy nó cũng khá mạnh đã hỗ trợ đủ mọi ngôn ngữ lập trình cho đến thời điểm này.
Nó hỗ trợ các bạn rất rất nhiều các test case. Tuy nhiên không phải cứ test nhiều rule thì là hoàn hảo, với mình với 1 project về PHP thì các bạn chỉ cần `Unit Test` và `PHPCS` như vậy thôi là đủ rồi, mục tiêu của mình đặt ra là điểm coverage chứ ko phải là test nhiều rules ;))

Dài dòng quá rồi bây giờ mình sẽ hướng đẫn chi tiết các bạn tích hợp nó vào project.

Đầu tiên các bạn hãy truy cập [https://docs.travis-ci.com/](https://docs.travis-ci.com/) và login nó với chính account github của mình.
Sau đó hạy chọn repo project của mình và cấp quyền truy cập cho `travis`

Ở dưới project hạy tạo 1 file config `.travis.yml`

```yaml
language: php

addons:
  hosts:
    - travis.dev

services:
  - mysql

php:
  - 7.0

before_script:
  - cp .env.travis .env
  - mysql -e 'create database travis;'
  - composer install --no-interaction
  - php artisan key:generate
  - php artisan migrate:refresh --seed

script: ./vendor/bin/phpunit
```
Chỉ cần đơn giản như thế này thôi các bạn đã có thể cấu hình để CI đảm nhiệm việc test thử trước rồi.

`language:` language ở đây mình dùng là php nên mình khai báo php, các bạn dùng language khác thì có thể xem thêm ở travis docs để khai báo phù hợp với project của mình.

`before_script:` Đây chính là những scripts các bạn cần phải khai báo để trước khi khởi chạy project của mình. Cứ mỗi lần CI nhận được pull nó đều phải lấy code mới nhất từ branch `master` của bạn và khởi chạy từ đầu tất cả các câu lệnh được khai báo ở đây để đảm bảo tính toàn vẹn. Đừng lo với việc kéo các thư viện bên ngoài sẽ làm bạn mất thời gian. Travis rất thông minh và nó đã tự động cache tất các các thư viện từ bên ngoài, công việc install package của bạn chỉ diễn ra trong 1 tích tắc.

`script:` phần quan trọng nhất chính là đây, nó chính là script chính các bạn muốn CI làm việc. Ở đây mình chỉ chạy `Unit Test`. Nếu có thời gian kỹ hơn các bạn có thể viết thêm scripts để check `PHPCS`, để check thêm `coding standards` cho project của mình đẹp hơn.

## Kết luận
Tóm lược lại, CI đối với mình là 1 công cụ tuyệt vời và hữu dụng. Nhờ có nó mà mình đã yên tâm hơn phần nào và không còn lo ngại đến vấn đề chất lượng code nữa qua đó các bạn có thể yên tâm và tập trung hơn vào code logic của mình. Trong những project lớn với nhiều contributors thì CI gần như không thể thiếu, nó cũng mang lại cảm giác yên tâm phần nào khi các bạn merged pull. 

Cám ơn các bạn đã đọc qua bài viết của mình. Hi vọng nó sẽ giúp ích gì đó cho các bạn.