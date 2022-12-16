## 1. Lập trình viên không nên chỉ biết code 
Lập trình viên phải biết  ~~sửa máy giặt~~, ~~sửa điện~~, ~~sửa ống nước~~, **có người yêu** ,.... và phải biết **triển khai code lên internet**. Khi đã biết triển khai code lên internet (được sếp đánh giá rất cao rồi :D ) thì lại phải học tiếp **CI - CD** để build và test code tự động giúp quá trình triển khai diễn ra với ít sự can thiệp thủ công nhất, tiết kiệm thời gian và chi phí ( sếp thích luôn :D ),. Bài này mình sẽ thực hiện triển khai một dự án ReactJS với source base mình dùng UmiJS ( một bộ base khá phổ biến cho một dự án ReactJS với đầy đủ các thứ trên đời), bạn nào sử dụng **create-react-app** hay bất cứ project ngôn ngữ gì vẫn có thể làm theo bài viết này vì bài này tập trung vào việc deploy và deploy tự động là chính. Trong bài này mình sẽ thực hiện deploy thủ công trước, sau đó sẽ tích hợp Jenkins CI-CD
## 2. Chuẩn bị môi trường
Có rất nhiều công cụ giúp bạn thực hiện việc áp dụng CI-CD cho dự án của bạn như CircleCI, Jenkins, TravisCI, GitLabCI, .... Trong bài này chúng ta sẽ sử dụng Jenkins.
- Chuẩn bị:
    - **Repository github với source code UmiJS**: Có thể fork từ github của mình https://github.com/QuangDoXuan/react-base hoặc lấy trên trang chủ của UmiJS https://umijs.org/docs/getting-started. Các bạn tạo project của riêng mình rồi đẩy lên github, vì phần sau sẽ cần phải tiến hành cài đặt **github-webhook** cho chính repo này.
    - **2 AWS EC2 Ubuntu instances**  - một cái sử dụng để làm server chạy code của project, cái còn lại để chạy jenkins ( Sử dụng 1 instance cũng được nhưng do mình sử dụng EC2 instance free cấu hình hơi thấp :)) ). Bạn nào chưa có thì nên tạo tài khoản AWS rồi vào services EC2 để tạo nhé mất có 1đô thôi mà được **sử dụng free cơ bản các chức năng của AWS trong vòng 1 năm**.
    - Sau khi tạo 2 instance rồi thì chúng ta cần tiến hành mở cổng cho instance, đầu tiên kiểm tra xem từng instance đang sử dụng **Security group** nào ( trên màn danh sách các instance sẽ hiển thị thông tin của từng instance). Kéo sang phải đến gần cuối chúng ta sẽ thấy cột  **Securiry Group name**  - chính là tên của Security group ứng với instance. Tiếp theo chọn vào **Security Groups**, tìm đến đúng tên của group tương ứng chúng ta vừa thấy, chọn và click Actions -> Edit inbound rules và update như sau: 
![](https://images.viblo.asia/d154f007-fa1c-46e9-b9d6-7382fda257a4.PNG)

![](https://images.viblo.asia/7a56857a-ecfb-4bab-b073-cdcc118a2912.PNG)

## 3. Deploy dự án lên AWS EC2
Trong bước này mình sẽ thực hiện deploy một cách thủ công trước, nếu ai chưa biết deploy thủ công
Đầu tiên chúng ta sử dụng SSH để remote vào server nơi chúng ta cần để lưu trữ source code của dự án 
```ssh -i key.pem ubuntu@x.x.x.x``` ( x.x.x.x là public ip của EC2 instance của bạn khi tạo ra, key.pem là file key được tạo trong quá trình tạo instance giúp bạn có thể SSH vào instance và thực hiện việc cài đặt )
- Cài đặt Nginx: 
    Vào link này copy paste là được nhé
 [   https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
 
-  Cài đặt git
```
 $ sudo dnf install git-all
 $ sudo apt install git-all
```
Thường thì Ec2 sẽ cài sẵn git rồi, ta kiểm tra ```git --version``` nếu chưa có thì cài đặt bằng 2 lệnh trên
- Cài đặt node và npm, yarn
  ```
  $ curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
  $ sudo apt-get install nodejs
  $ curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  $ echo "deb https://dl.yarnpkg.com/debian/ stable main" |sudo tee /etc/apt/sources.list.d/yarn.list
  $ sudo apt update && sudo apt install yarn
  ```
- Clone source code từ gitthub
```
$ cd /var/www/
$ sudo mkdir react-base
$ cd react-base
$ sudo mkdir html
$ cd html 
$ git clone your-github-project-repo-url 
```
 - Tiến hành build
```
$ cd /var/www/react-base/html/react-base
$ yarn install
$ yarn run build
```
Khi chạy lệnh `yarn run build` sẽ sinh ra một file `index.js` trong thư mục `.dist` trong dự án. Ta cần cấu hình Nginx trỏ đến file này là thành công trong việc deploy thủ công rồi :D
- Cấu hình Nginx

    `$ sudo vim /etc/nginx/sites-available/react-base`
 Copy đoạn code dưới đây và lưu: 
 ```
server {
   listen 80;
   server_name your_instance_ip;
   root /var/www/react-base/html/react-base/dist;
   index index.html index.htm;
   location / {
   try_files $uri /index.html =404;
   }
}
 ```
 File config trên có ý nghĩa như sau: dự án được chạy ở cổng 80, với ip là public ip của instance của bạn. Nginx sẽ tìm đến đường dẫn ```/var/www/react-base/html/react-base/dist``` để đọc file có dạng index.js ( hoặc index.html, index.htm). File index.js này chính là file vừa được build ra từ câu lệnh `yarn run build` bước trên.
 
 - Tiếp theo cần enable file config mà bạn vừa tạo:
 
`  $ sudo ln -s /etc/nginx/sites-available/react-base /etc/nginx/sites-enabled`

Restart Nginx

`  $ sudo systemctl restart nginx`

Truy cập link http://x.x.x.x/ để kiểm tra 
![](https://images.viblo.asia/445f695a-e3fb-41cf-845a-18ec7ba4cff3.PNG)

## 4. Tích hợp CI-CD sử dụng Jenkins
Đã xong việc deploy thủ công rồi, bây giờ chúng ta bắt đầu tiến hành tích hợp Jenkins.

**1. Tiến hành SSH vào server thứ 2 và cài đặt Jenkins**
    ```ssh -i key.pem ubuntu@your_ip```
*  Cài đặt java: Để cài đặt được Jenkins, chúng ta phải cài java trước
```
    $ sudo apt install default-jre
    $ java -version
```
*  Cài đặt Jenkins: Link này rất cụ thể và chi tiết, truy cập link này và làm theo hướng dẫn 
[ https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-20-04](https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-20-04)
.Sau khi cài đặt thành công ta truy cập vào cổng 8080 của instance hiện tại để đăng nhập vào Jenkins ( nếu không truy cập được cổng 8080 thì tiến hành mở cổng bằng cách cấu hình Security Groups đã đề cập ở trên).

**2. Setting github webhook**
Sau khi cài đặt xong Jenkins, ta tiến hành setting github webhook. Truy cập vào repo github nơi lưu trữ **source code của dự án -> Settings ->Webhooks->Add Webhook**. Điền payload url như sau : `http://x.x.x.x:8080/github-webhook` với x.x.x.x là ip server cài đặt jenkins của bạn
![](https://images.viblo.asia/2854e301-007f-4899-bc23-9caddea34b9c.png)

**3. Tạo ssh-key trên server lưu trữ source code, sau đó copy nội dung của private key (file id_rsa)**
```
$ ssh -i key.pem ubuntu@your_ip
$ ssh-keygen -t rsa
$ cat ~/.ssh/id_rsa
```
Copy toàn bộ nội dung và paste vào một file text nào đó trên máy bạn. Ta cần tạo file key trên Jenkins server với nội dung này để khi Jenkins server thực hiện deploy sẽ cần dùng nó để SSH vào webServer (server lưu trữ source code của dự án).

**4. Cấu hình Jenkins**

1. Truy cập **Jenkins Dashboard**-> **New Item**-> **Free Style Project**

2. Tại tab **Source Code Management**, chọn **Git**, sau đó điền vào **Repository Url** là url github project của bạn (ví dụ: https://github.com/QuangDoXuan/react-base.git). Tại mục **Credentials** chọn **Add**-> **Kinds: Username and password **-> điền username và password github. ***

3. **Branch to build**: điền tên nhánh bạn muốn sử dụng để deploy, ở đây mình chọn nhánh master.
![](https://images.viblo.asia/c6fa9a9e-3b6f-42a6-b34e-87d280b197bf.PNG)
4. Tại tab **Build Triggers**, chọn **GitHub hook trigger for GITScm polling**
 ![](https://images.viblo.asia/67f5f44b-c183-4881-9832-57f91a467447.PNG)
5. Tại tab **Build**, paste đoạn code sau và nhấn Save: 
```
ssh -i /home/jenkins/web-key.pem ubuntu@x.x.x.x << EOF
cd /var/www/react-base/html/react-base
git pull origin master
yarn install
yarn run build
```
Đoạn code trên có ý nghĩa sau: Khi tiến hành bấm build để start quá trình build tự động, Jenkins server sẽ sử dụng user jenkins ( được tạo sẵn khi cài đặt jenkins) để SSH vào web server ( nơi lưu trữ source code) với key là web-key.pem (**là nội dung file private key mà chúng ta đã backup ra 1 file text ở các bước trên**) sau đó tiến hành chạy các lệnh để deploy như một người dùng thông thường.
![](https://images.viblo.asia/e954175f-8a86-4735-b07f-6042d29755df.PNG)

**6. Xong bây giờ nhấn Build xem đã ổn chưa nào :D, chắc chắn là chưa rồi, vì đã tạo private key đâu.** Bây giờ chúng ta sẽ tiến hành tạo key để SSH vào server ( Nguyên lý là sau khi chúng ta gen SSH key ở các bước trên, nó sẽ tạo cho chúng ta 1 cặp public key và private key. Nội dung của file public key sẽ được tự động ghi vào trong file **authorized_keys**). Khi 1 client muốn SSH đến server, chỉ cần sử dụng file **private-key** làm **key** (**giống với file pem của AWS**), server sẽ so sánh nội dung public key trong file **authorized_keys** với file **key** mà chúng ta sử dụng để SSH xem chúng có phải 1 cặp không. Nếu đúng thì server sẽ cho phép truy cập :D.

**7. Tạo private key với user jenkins**
    SSH vào Jenkins server lại và thực hiện lần lượt các lệnh sau: 
```
    $ sudo mkdir /home/jenkins
    $ cd /home/jenkins
    $ sudo nano web-key.pem
```
- Mở lại file text đã copy từ các bước trên (file **id_rsa** đó :D ). Paste toàn bộ nội dung vào file web-key.pem và lưu
- Kiểm tra xem user Jenkins đã thực sự SSH vào web server được chưa. Nếu được có nghĩa là bạn thành công 99% rồi đó :D,  nếu ko được hãy quay lại bước trước để đọc lại kỹ phần copy privatekey từ web server và paste key ở Jenkins server nha
```
$ sudo su - jenkins
$ cd /home/jenkins
$ ssh -i web-key.pem ubuntu@your_web_server_ip
```

OK giờ chúng ta quay lại và nhấn Build để tận hưởng thành quả thôi nào :D. 
    ![](https://images.viblo.asia/eddc5adf-6ed1-4e51-b5e6-88b41032ff30.PNG)
## 5. Tổng kết
Sau khi hoàn thành tất cả các bước trên, bạn hãy thử thay đổi code và commit lên github, sau đó merge code và truy cập lại Jenkins rồi bấm Build sẽ thấy code được build mới nhất mà chúng ta ko cần tốn công sức phải SSH vào server và chạy lệnh đúng không nào :D. Hi vọng bài viết sẽ giúp ích được cho mọi người trong quá trình triển khai code lên server cũng như làm việc với Jenkins  và CI-CD. Good Luck 
Quên, các bạn nhớ stop 2 instance AWS EC2 này đi khi học xong rồi nha **vì một tháng chỉ được dùng EC2 750 giờ miễn phí thôi, không là mất tiền oan đấy :D**