Với tinh thần "thử làm cho biết", hôm nay mình sẽ thử tìm hiểu về các bước tạo 1 EC2 và thực hiện deploy 1 ứng dụng rails lên con EC2 này.

### Mục đích
1. Tạo được 1 con EC2
2. Deploy được 1 ứng dụng rails đã viết sẵn trên github. 

### Chuẩn bị
- 1 tài khoản AWS (chỉ cần loại Free-Tier thôi)
- 1 [ứng dụng rails](https://github.com/ngodinhnhathoang/alpha-blog) đã chạy ngon lành và được lưu trên github


### Phần 1: Tạo AWS EC2
* Sau khi login vào tài khoản AWS, ở thanh điều hướng, lựa chọn phần Services, rồi chọn EC2

![](https://images.viblo.asia/8671c772-72df-4365-b13d-28d03d7ca925.png)
* Ở phần Create Instance, click vào buton Launch Instance

![](https://images.viblo.asia/38c757c1-85a6-41fd-a553-1659ee3c883a.png)

* Step 1: Choose an Amazon Machine Image (AMI) -> Ở bước này, cho phép chúng ta lựa chọn các dạng server (có ubuntu, linux, window...)

Mình lựa chọn Ubuntu 18.04 LTS
![](https://images.viblo.asia/b50d2ea1-3115-4da8-86e9-0afc6630ee29.png)

* Step 2: Choose an Instance Type -> Lựa chọn type của Instance, ở đây mình sẽ lựa chọn type nào nằm trong Free-Tier là được.

![](https://images.viblo.asia/cecf2b0d-8c02-43fe-b279-8d3296bcc614.png)

* Step 3: Configure Instance Details -> Bước này mình giữ nguyên default và chọn Next

![](https://images.viblo.asia/79f27860-a81c-4113-a3da-a49fd24c522e.png)

* Step 4: Add Storage -> Next

![](https://images.viblo.asia/7d5817ba-3c80-451c-9108-8d6041f910db.png)

* Step 5: Add Tags -> Ở bước này, mình add tag với key = Name và Value = Webserver.

![](https://images.viblo.asia/1153da33-cfaf-4f31-ad59-5fc57a8512db.png)

* Step 6: Configure Security Group -> Click Review and Launch

![](https://images.viblo.asia/960ac49c-cdb4-4964-aacf-5c685b371746.png)

* Step 7: Review Instance Launch -> Click Launch

![](https://images.viblo.asia/712c0805-a526-4a3e-b4c0-8309f72875eb.png)

* Step 8: Download keypair -> Đặt tên file cho keypair và click download (file này sẽ dùng để thực hiện ssh vào EC2 này)

![](https://images.viblo.asia/1365f17f-0acb-4588-99ca-1bcae80fb03f.png)

* Như vậy là mình đã tạo xong được 1 Instance EC2 (coi như mục đích 1 đã hoàn thành)

![](https://images.viblo.asia/49b39828-87a7-4d59-a75a-54f1f94f9ad8.png)

* Khi chọn View Instance thì có thể nhìn thấy trạng thái của instance như sau

![](https://images.viblo.asia/74f36dc2-4916-453b-9692-2c2ebc1c86d9.png)

### Phần 2: Thực hiện SSH vào EC2 và chuẩn bị môi trường để deploy Rails app
Phần 1 thực sự rất đơn giản khi chỉ cần thực hiện step by step theo [hướng dẫn](https://docs.aws.amazon.com/efs/latest/ug/gs-step-one-create-ec2-resources.html) của AWS.

Tuy nhiên phần 2 có phần rắc rối và phiền hà hơn 1 chút.

* Connect vào EC2
Ở màn hình view instance, click vào button Connect, sẽ có 1 cửa sổ hướng dẫn ssh vào server rất cụ thể

![](https://images.viblo.asia/ecd53a47-9396-451d-8f68-671432f94f40.png)

Thực hiện đúng hướng dẫn trên thì khi connect thành công, terminal sẽ nhìn thấy như sau

![](https://images.viblo.asia/d1bca496-3a64-4c5f-8875-11049ad94f23.png)

* Sau khi connect thành công vào server, mình sẽ thực hiện tạo 1 user dùng để deploy. User này cũng sẽ được setting quyền sudo để có thể cài đặt môi trường.

`sudo useradd -d /home/deploy -m deploy`
`sudo passwd deploy`

![](https://images.viblo.asia/5e9306bb-c94f-4f27-a530-28c00001b418.png)

* Sau đó thực hiện cấp quyền sudo cho user này bằng cách mở file sudoers.tmp với command

`sudo nano /etc/sudoers`

và thực hiện add thêm đoạn text `%deploy ALL=(ALL) ALL`

![](https://images.viblo.asia/f5c8d4e1-0f2f-4a5d-aa54-e070e2e684cd.png)

* Sau khi add quyền sudo cho user deploy thành công, ta chuyển qua user này để thực hiện cài đặt môi trường

`sudo su - deploy`

![](https://images.viblo.asia/a492345f-9e58-4b45-92d4-98c5cc7b5b06.png)

* Đầu tiên sẽ thực hiện tạo keypair để có thể clone code từ github 

Ở bước này hoàn toàn giống với việc add ssh vào github từ 1 máy local nên có thể tham khảo như [hướng dẫn](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account) này.

* Tiếp theo sẽ tiến hành cài đặt 1 số package

Cài Git `sudo apt-get install git`

Cài rvm -> cài ruby -> cài rails
Thực hiện theo [hướng dẫn](https://www.digitalocean.com/communitytutorials/how-to-install-ruby-on-rails-with-rvm-on-ubuntu-18-04) này 

Sau khi cài xong ruby và rails theo đúng version phù hợp với ứng dụng của mình

![](https://images.viblo.asia/662878da-632f-447e-9b81-fc09b4d6b6ac.png)


* Sau khi đã cài xong ruby và rails thì thực hiện clone source code từ github về

`git clone git@github.com:ngodinhnhathoang/alpha-blog.git`

* Sau khi clone thành công thì cd vào thư mục ứng dụng

![](https://images.viblo.asia/8f6c7f1c-e4b6-4898-abf9-8a7da886bd2d.png)

* Từ đây mình có thể thao tác như là ở máy local của mình. Thực hiện cài bundle, migrate data,...
(Lúc này nếu ứng dụng báo thiếu cái gì thì cứ cài thêm cái đó)

### Phần 3: Khởi chạy server

* Vì server Rails chạy trên cổng 3000 nên trước tiên chúng ta sẽ tiến hành mở cổng này cho server.

Ở màn hình console AWS, chọn vào Security Group của phần NetWork & Security. Sau đó chọn vào tab Inbound và chọn Edit

![](https://images.viblo.asia/4372d640-8d60-4c30-aff5-7abd20aa51c4.png)

* Thêm vào rule như hình

![](https://images.viblo.asia/1b81d37f-d5a2-476f-920d-7461538c2c6f.png)

* Sau đó thực hiện khởi chạy server như thông thường 

`rails server`

* Truy cập vào web app qua URL: http://3.14.7.134:3000 

![](https://images.viblo.asia/934c719d-a5c8-4530-98a5-cbe1fbe88fff.png)

-> Mục tiêu thứ 2 coi như hoàn thành 

### Kết luận
Đối với các service của AWS, mình nghĩ ngoài việc đọc lý thuyết khô khan thì việc bắt tay vào thực hành sẽ mang lại cho chúng ta không ít trải nghiệm thú vị.