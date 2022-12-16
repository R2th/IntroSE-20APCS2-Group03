Chào các bạn! Trong thời gian vừa qua mình có tham gia dự án yêu cầu phải deploy liên tục mỗi lần có một pull request được merge. Nếu deploy như thủ công thì sẽ rất tốn effort, nên mình tìm hiểu jenkin để sau khi một pull request được merge thì server dev cũng sẽ được tự động deploy ngay giúp tiết kiệm được rất nhiều effort của cả team. Trong bài chia sẽ lần này mình sẽ hướng dẫn các bạn implement auto deploy với jenkin.

## Step 1: Cài đặt jenkin.
Add jenkin to PPA
```
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
```
Install jenkin
```
sudo apt-get update
sudo apt-get install jenkins
```
Sau khi cài đặt xong jenkin mặt định sẽ start ở port 8080.
Truy cập vào jenkin bằng url trên browser  http://localhost:8080
Jenkin sẽ yêu cầu password để vào màn hình quản lý, các bạn lấy password ở đây /var/lib/jenkins/secrets/initialAdminPassword
![](https://images.viblo.asia/6cad89c4-948c-4ac5-9d8a-d07508a46586.png)
Sau khi đăng nhập thành công, ở màn hình Getting Started các bạn chọn Install suggested plugins
![](https://images.viblo.asia/e086903c-9065-4a6d-a504-d71f25ac1cb3.png)
Lựa chọn này jenkin sẽ cài đặt các plugin phổ biến nhất cho bạn, quá trình cài đặt sẽ mất ít phút
![](https://images.viblo.asia/48a8d39a-d7ce-4091-a583-470c037dea09.png)
Sau khi cài đặt xong các plugins, các bạn sẽ được chuyển đến màn hình create accout admin. Ở đây bạn có thể chọn Continue as admin cho anh
![](https://images.viblo.asia/7fea8f1a-3f4d-4634-bf33-e77b56ce1e2b.png)
Cài đặt cơ bản jenkin đến đây đã xong, chúng ta chuyển qua config nginx
## Step 2: Config Nginx
Trong context server của project bạn muốn auto deploy, chúng ta add thêm location với config như sau:
```
location /github-webhook {
        proxy_pass localhost:8080 # Chuyển request cho jenkin service thực hiện auto deploy
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
```
## Step 3: Setup một Github webhook
Ở bước này nếu bạn có quyền admin của repository dự án thì có thể tự thực hiện, nếu không bạn phải nhờ admin của repository làm giúp.
Vào repository của dự án trên github -> Settings -> Webhooks -> Add webhook. Ở màn hình add webhook các bạn làm như trong ảnh nhé.
![](https://images.viblo.asia/5ff83c0b-27a2-4620-84ad-cba6706e9f31.png)
Trong hình, các bạn đổi domain_project http://domain_project.com/github-webhook/ thành domain của project của các bạn nhé. Lưu ý là phải cáo dấu '/' ở cuối nhé. 
## Step 4: Config Jenkin
Các bạn truy cập localhost:8080
![](https://images.viblo.asia/acb6d9d8-cbff-4c75-bcf9-5ab19cd8bb11.png)
Click vào New Item để vào màn hình setup jenkin cho project của mình.
![](https://images.viblo.asia/756612a4-9ace-4d0c-bc9c-b7ee33d42c04.png)
Ở màn hình setup này, các bạn input tên project của bạn vào Enter an item name, chọn Freestyle project sau đó click vào Ok để vào màn hình config.
![](https://images.viblo.asia/84272b6c-1bbd-4b31-8bfa-dd2cef3154df.png)
Ở tab General các bạn chọn GitHub project để điền link repo project trên github.
![](https://images.viblo.asia/14fdc916-9ece-40d1-89c9-8b55c02d8d64.png)
Ở tab Source Code Management các bạn chọn Git để điền thông tin repo github project. Repository URL các bạn input url repo github của bạn ví dụ: https://github/url_to_project.git. Nếu repo là private thì các bạn click vào button Add để add user và password để jenkin có thể pull code thử repo của bạn.
![](https://images.viblo.asia/1ee81257-022b-4e99-aab2-bca67d2034db.png)
Ở field Branch Specifier (blank for 'any') các bạn input branch nào bạn jenkin pull về khi có thay đổi code.
Tiếp theo đến tab Build Triggers các bạn chọn GitHub hook trigger for GITScm polling
![](https://images.viblo.asia/67079f2e-3df9-466d-88f0-4480bfac8d2f.png)
Ở tab Build các bạn chọn Execute shell. Các bạn input vào các command line mà bạn muốn chạy sau khi jenkin pull code về
![](https://images.viblo.asia/aa25b1d2-625f-43f2-93f2-deb843d930f6.png)

Ok xong rồi.
Các bạn thử tạo một pull request và merge vào nhánh mà bạn input vào Branch Specifier để xem kết quả nhé.