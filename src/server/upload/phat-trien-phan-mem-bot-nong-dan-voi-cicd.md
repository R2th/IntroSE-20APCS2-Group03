## 1. CI(Continuos Integration) là gì?
`Continuos Integration` tạm dịch là "Tích hợp liên tục", nó là một phương pháp phát triển phần mềm mà trong đó các thành viên của một nhóm phát triển phải cập nhật, tích hợp công việc một cách thường xuyên thường là mỗi ngày ít nhất một lần. Việc tích hợp này bao gồm cả việc test để nhằm mục đích phát hiện ra lỗi một cách nhanh nhất có thể. Bằng cách này có thể giảm thiểu thời gian phát triển phần mềm và những vấn đề gặp phải trong quá trình tích hợp.
    ![](https://images.viblo.asia/75645013-1aea-42af-8295-34e624dce505.png)
    
**Luồng hoạt động của CI có thể mô tả như sau:**
1. Các lập trình viên trong nhóm thực hiện các task, sau đó commit lên repository.
2. CI server được cài đặt sẽ giám sát xem có sự thay đổi nào trên repository một cách liên tục.
3. Khi phát hiện có sự thay đổi hệ thống sẽ cập nhật code mới nhất và tự động build, sau đó chạy test và gửi lại thông báo cho các thành viên trong nhóm phát triển xem chương trình khi được build có phát hiện ra lỗi hay không để thông báo một cách sớm nhất cho đội phát triển.
4. CI server sẽ tiếp tục lắng nghe các thay đổi tiếp theo. Hoạt động này lặp đi lặp lại một cách thường xuyên.

Ta có thể hiểu đơn giản một hệ thống CI cho phép ta chạy và test chương trình mỗi khi có một sự thay đổi nào đó trên repository. Nhờ vào đó ta có thể tìm và giải quyết vấn đề phát sinh một cách nhanh chóng nhất có thể. Đây là một vấn đề vô cùng quan trọng trong mô hình phát triển Agile đòi hỏi phần mềm được phát triển một cách nhanh chóng và luôn sẵn sàng để có thể deploy.


## 2. CD(Continuous Delivery và Continuous Deployment)
Trong phát triển phần mềm CD được dùng để biểu thị cho 2 thuật ngữ là Continuous Delivery và Continuous Deployment:


1. `Continuous Delivery` hay còn gọi là "Chuyển giao liên tục" là quy trình để triển khai các thay đổi về code đến môi trường Staging một cách tự động. Môi trường Staging là một môi trường mô phỏng của môi trường Production. Tại đây sản phẩm sẽ được trải qua những bài test để đảm bảo chất lượng một cách tự động để sẵn sàng deploy lên môi trường Production.
![](https://images.viblo.asia/6bacf2cb-1c23-4b29-bb81-215f3b6faec1.png)

2. `Continuous Deployment` là thuật ngữ mô tả một quy trình hoàn thiện hơn so với Continuous Delivery khi nó hoàn tất công việc deploy sản phẩm lên môi trường Production một cách tự động.

Trong thực tế thì công việc deploy sản phẩm lên môi trường Production thường được thực hiện một cách thủ công thay vì thực hiện tự động do cần đảm bảo tính chính xác một cách tuyệt đối. Mặc dù môi trường Staging được mô phỏng giống với môi trường Production tuy nhiên không thể đảm bảo giữa 2 môi trường là giống nhau một cách hoàn toàn, vì vậy việc deploy tự động một sản phẩm là một bài toán khó có thể giải quyết.
![](https://images.viblo.asia/bd62d1d3-c7db-4828-a53a-b353aec05557.gif)

## 3. Demo CI với TravisCI
### 3.1. Giới thiệu TravisCI
TravisCI là một công cụ được xây dựng nhằm hỗ trợ tích hợp các tính năng CI, nó giúp chúng ta dễ dàng và thuận lợi hơn trong việc test và deploy các dự án được lưu trữ trên GIthub. TravisCI có 2 plan trả phí và miễn phí, plan miễn phí chỉ được áp dụng đối với các public repository trên github.
Mô hình hoạt động của TravisCI có thể hiểu một cách đơn giản gồm 3 tiến trình.

- Developer commit và push code lên github
- TravisCI thông qua webhooks nhận sự kiện từ github, thực hiện những đoạn script đã được conffig trong file `.travis.yml`.
- Sau khi thực hiện các tác vụ được thiết lập, Travis CI gửi lại thông báo cho developer.

### 3.2. Demo tích hợp CI/CD sử dụng TravisCI
Mục tiêu của demo để mọi người có thể hình dung khái quát cách thức hoạt động của một dự án tích hợp CI trong phát triễn một cách đơn giản nhất, bài viết không đi sâu vào các công nghệ. Các bạn có thể tham khảo [source code](https://github.com/VuPhong95663/learn-ops) mình đã viết sẵn.
Để deploy demo mình sử dụng dịch vụ của Amazon là Amazon ElasticBeanstalk là một service giúp deploy một web app một cách nhanh chóng. Các bạn có thể chọn service ElasticBeanstalk và tạo một application. Ở mục platform các bạn có thể lựa chọn platform tương ứng, ở đây mình sử dụng Docker. 

![](https://images.viblo.asia/072c9043-7c7a-40b3-8346-af9ea6151ed3.png)

Sau khi click vào create các bạn đợi một thời gian để service khởi tạo ứng dụng. Ứng dụng được khởi tạo thành công bạn sẽ thấy dấu tích xanh. 

![](https://images.viblo.asia/498d8934-2c22-4ea5-a531-10cac710ff62.png)

Để thiết lập TravisCI các bạn vào trang https://travis-ci.com/, Đăng nhập thông qua tài khoản Github, trong phần Settings có thể lựa chọn `Manage repositories on Github` để lựa chọn repository bạn muốn tích hợp.

Trong file `.travis.yml` minhd config cho TravisCI thực hiện 1 số công việc như build một docker container, chạy test, deploy lên ElasticBeanstalk.

```yml
sudo: required
services:
  - docker

before_install:
  - docker build -t vuphong95663/learn-ops -f Dockerfile.dev .

script:
  - docker run vuphong95663/learn-ops npm run test -- --coverage --watchAll=false

deploy:
  provider: elasticbeanstalk
  region: "ap-southeast-1"
  app: "ops-sample"
  env: "OpsSample-env"
  bucket_name: "elasticbeanstalk-ap-southeast-1-170139420953"
  bucket_path: "learn-ops"
  on:
    branch: master
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key: $AWS_SECRET_KEY
```

Một số biến môi trường cần được thiết lập trong setting của TravisCI để đảm bảo tính bảo mật
![](https://images.viblo.asia/957cf727-a540-498f-a72e-a091d20da527.png)

Mỗi khi làm một tính năng mới, các bạn tạo một nhánh để implement tính năng đó. TravisCI thông qua  webhook sẽ được trigger và thực hiện các các tiến trình được thiết lập, ở đây là tạo  docker container và thực hiện unit test, ...
![](https://images.viblo.asia/7fe59df3-28a9-4b38-944e-a35e3d5427e6.png)

![](https://images.viblo.asia/d3c93462-6595-4ec6-a1f7-941fe4733c84.png)

Trong quá trình run CI trên github sẽ có những thông báo quá trình nào đang được thực hiện

![](https://images.viblo.asia/08750abc-f4d9-4728-9b85-49f9b21f8aeb.png)

Sau khi thực hiện xong quá trình chạy CI ta nhận được một pull request đã được kiểm tra thông qua unit tests, các bạn hoàn toàn có thể thực hiện nhiều công việc như chạy linter, codeclimate, ... để kiểm tra đảm bảo chất lượng code. Nếu các tiến trình được thực hiện thành công ta nhận được 1 pull request sẵn sàng cho việc merge, tích hợp, trái lại TravisCI sẽ trả lại thông báo lỗi khi các tiến trình phát sinh lỗi giúp cho developer có thể phát hiện và sửa lỗi.

![](https://images.viblo.asia/209a873c-429b-4f15-8095-4eafb7658da1.png)

Khi nhấn nút `merge` TravisCI sẽ tiếp tục thực hiện tự động deploy phần code đã được merge lên ElasticBeanstalk, thực hiện quá trình CD tích hợp lên production. 
![](https://images.viblo.asia/f310c0f6-5f26-42f7-a7ab-3f1259f24cff.png)

Khi dấu tích xanh xuất hiện thì quá trình deploy sẽ thành công.

## 4. Lời kết
Thông qua bài viết mình muốn giới thiệu về khái quát về qúa trình CI/CD, đây không phải là một khái niệm mới tuy nhiên nó là một quy trình cần có trong công việc phát triển phần mềm hiện nay. Hy vọng bài viết sẽ có ích đối với các bạn.

## 5. Tài liệu tham khảo
https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide

https://docs.travis-ci.com/