CI/CD Pipeline hay Continuous Integration/Continuous Deployment là xương sống của môi trường DevOps hiện đại. Nó là cầu nối giữa bộ phận phát triển và vận hành bằng cách tự động xây dựng, kiểm thử và triển khai ứng dụng.

Trước khi đến với CI/CD Pipeline, đầu tiên hãy hiểu về DevOps.

![](https://images.viblo.asia/5f48ba92-971c-4f17-84d2-5940bc8b2b51.png)

DevOps là phương pháp phát triển phần mềm mà việc phát triển, kiểm thử, triển khai, theo dõi phần mềm một cách liên tục suốt vòng đời phát triển của nó. Đây là quy trình được hầu hết các công ty hàng đầu áp dụng để phát triển phần mềm chất lượng cao và vòng đời phát triển ngắn hơn, dẫn đến sự hài lòng của khách hàng cũng lớn hơn.

Sự hiểu biết của bạn về DevOps sẽ không hoàn chỉnh nếu không nắm được vòng đời của nó. Bây giờ hãy xem xét vòng đời của DevOps và khám phá xem nó liên quan đến các giai đoạn phát triển phần mềm như thế nào.

![](https://images.viblo.asia/7e4547a0-249c-425c-8ad2-a35d0dab0eae.png)

CI là viết tắt của Continuous Integration và CD là viết tắt của Continuous Delivery/Continuous Deployment. Bạn có thể nghĩ nó là một quá trình giống như vòng đời phát triển phần mềm. 

Hãy xem nó hoạt động như thế nào.

![](https://images.viblo.asia/84d5e5b0-9956-467f-8311-4498e92897b1.png)

Luồng trên là biểu diễn logic của việc phần mềm sẽ trải qua một loạt các giai đoạn trong vòng đời của nó trước khi đến với khách hàng hay đưa lên production.

Trong đó, ở mỗi bước, nếu có lỗi xảy ra, code sẽ được fix và commit lại vào hệ thống quản lý phiên bản và tiếp tục đi theo luồng.

Vòng đời này sẽ tiếp tục đến khi code đã sẵn sàng để triển khai trên máy chủ production.

## CI Tool và tầm quan trọng của nó trong CI/CD Pipeline
Nhiệm vụ của ta là tự động hóa toàn bộ quá trình, từ lúc đội phát triển push code lên hệ thống quản lý phiên bản đến khi code được deploy lên production. Để thực hiện điều đó, ta cần một công cụ tự động.

![](https://images.viblo.asia/f230f48c-7b4a-4955-aaf9-5097ad7f5655.png)

Jenkins cung cấp cho chúng ta một loạt các giao diện và công cụ để tự động hóa toàn bộ quá trình đã nêu ở trên.

Chúng ta sử dụng Git là hệ thống quản lý phiên bản. Jenkins sử dụng để định nghĩa toàn bộ công việc hay nhiệm vụ. Công việc của ta là đảm bảo quá trình tích hợp và phân phối liên tục cho Jenkins.

Dưới đây là biểu đồ hoạt động:

![](https://images.viblo.asia/0e5f038d-6ee7-4526-a4e7-7fa87ea94a03.png)
## Thực hành: CI/CD Ruby On Rails sử dụng Jenkins
**Yêu cầu:** Cài đặt Java, Jenkins và Git

**Cài đặt các Plugins Jenkins**

1. Di chuyển đến Manage Jenkins -> Manage Plugins -> RubyMetrics, Rake, Rvm
2. Di chuyển đến Manage Jenkins -> Configure System -> Search for Rake

Để biết RVM và Ruby path, chạy lệnh sau
```
which rvm
which ruby
```

![](https://images.viblo.asia/ccf88fa6-1dfa-4c94-a455-5839311ed453.png)

Nhập các giá trị lấy được ở trên:

![](https://images.viblo.asia/bab63959-b3c1-40f0-8e9f-b1e58d3a1cd1.png)

**Thiết lập môi trường cho Jenkins user**

1. Thay đổi mật khẩu
```
sudo passwd jenkins
```
2. Chỉnh sửa file dưới đây
```
vi /etc/sudoers
```
3. Nhập nội dung sau vào file
```
jenkins ALL=NOPASSWD: ALL
```
4. Đăng nhập bằng Jenkins user
```
sudo -su jenkins
```
5. Chạy các lệnh sau
```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable --ruby
```
Tiếp theo, ta cần thêm rvm vào *shell profile*. Ở đây, ta sẽ thêm dòng sau vào cuối file *~/.bashrc*

```
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"
```
**Cấu hình Jenkins Job**
1. Tạo một freestyle Project -> chọn Source Code Management -> chọn Git - https://github.com/devops4solutions/CI_Jenkins_RubyonRails.git

![](https://images.viblo.asia/2a835a1e-6b4e-4358-b2cf-6021a6f54932.png)

2. Chọn Build Environment -> chọn Run the build in a RVM-managed environment -> giá trị là `.`

![](https://images.viblo.asia/60c1c43d-9a54-438e-8da3-3d01d8fa5cbf.png)

3. Add build step -> Execute Shell

```
bundle install
RAILS_ENV=test bundle exec rake db:migrate
RAILS_ENV=test bundle exec rspec — format RspecJunitFormatter — out results.xml
```
![](https://images.viblo.asia/bd779c39-d1bf-4d8f-b220-18632c010ea4.png)

4. Add Post Build Action ->Publish Junit Test Result Report

![](https://images.viblo.asia/6a156d44-50c1-4436-9d88-6aceeede0e73.png)

5. Kết quả build

![](https://images.viblo.asia/84e7929e-2d68-427e-8148-8e8357b87cbf.png)

6. Kiểm tra kết quả test

![](https://images.viblo.asia/5c99df78-d8bf-405d-8bc5-cd242adf8e1b.png)

Chúc mừng, bạn đã thực hiện thành công từng bước để thiết lập CI / CD của Ruby On Rails bằng Jenkins.
## Tham khảo
[https://dzone.com/articles/learn-how-to-setup-a-cicd-pipeline-from-scratch](https://dzone.com/articles/learn-how-to-setup-a-cicd-pipeline-from-scratch)

[https://medium.com/@khandelwal12nidhi/ci-cd-of-ruby-on-rails-using-jenkins-e7fb47a14aae](https://medium.com/@khandelwal12nidhi/ci-cd-of-ruby-on-rails-using-jenkins-e7fb47a14aae)