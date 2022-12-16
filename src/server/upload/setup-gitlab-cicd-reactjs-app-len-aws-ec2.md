Xin chào, trong bài viết này mình sẽ hướng dẫn cách setup CI CD một project web ReactJS lên AWS EC2
## Các bước chính
1.  Khởi tạo project ReactJS và push lên remote repository
2. Tạo 1 EC2 instance dùng làm server để deploy project
3. Tạo SSH key và cài các package cần thiết trên EC2 instance
4. Tạo file .gitlab-ci-yml để deploy project lên EC2 instance
5. Thưởng thức thành quả
## 1. Khởi tạo project ReactJS và push lên remote repository
Để khởi tạo project ReactJS đơn giản, mình sử dụng [create-react-app](https://create-react-app.dev/):
```
npx create-react-app demo-cicd
```
Sau đó chạy thử project:
```
cd demo-cicd
npm start
```
Kết quả:
![image.png](https://images.viblo.asia/97f0b285-108d-4ac6-9ca8-8bd410125de7.png)
Để có thể push code lên remote repository, truy cập Gitlab và tạo project, ở đây mình đặt tên là **demo-cicd**. Sau khi tạo xong, ta làm theo hướng dẫn ở phần **Push an existing folder** (do chúng ta đã tạo project ở local):
```
cd demo-cicd
git init --initial-branch=main
git remote add origin git@gitlab.com:[your_username]/demo-cicd.git
git add .
git commit -m "Initial commit"
git push -u origin main
```
## 2. Tạo 1 EC2 instance dùng làm server để deploy project
Truy cập vào tài khoản AWS, vào phần service EC2:
![image.png](https://images.viblo.asia/db04e014-5ac8-40b7-90c0-bb7bad4ba8df.png)
Chọn **Launch Instance**:
![Screen Shot 2022-08-19 at 10.21.17.png](https://images.viblo.asia/894a7ab4-bc9c-4bae-a85e-8222a309150a.png)
Ở đây mình chọn **Ubuntu 20.04** (bạn có thể sử dụng AMI với hệ điều hành khác)
Các phần còn lại giữ nguyên cấu hình mặc định, chọn **Launch Instance**:
![Screen Shot 2022-08-19 at 10.23.19.png](https://images.viblo.asia/2a6a6cb1-3e73-415e-b485-8bd10e5a676d.png)
Tạo key pair (sẽ sử dụng để SSH vào EC2 instance nếu muốn access vào instance từ local machine), sau khi tạo, key pair sẽ được tải về. <br>
Khi khởi chạy EC2 instance, AWS đã mặc định mở port 22 (SSH), tuy nhiên chúng ta sẽ cần mở thêm port 3000 do ứng dụng ReactJS của chúng ta chạy trên port 3000.<br>
Chọn instance vừa tạo, chọn tab **Security**, tại phần Security groups, bấm vào security group bên dưới (trong tên có chứa "launch-wizard").<br>
Taị phần **Inbound rules**, chọn **Edit inbound rules**, chọn **Add rule**. Chọn Type = Custom TCP, Port range = 3000, Source = Anywhere-IPv4, sau đó chọn Save rules.<br>
Chờ một chút để EC2 instance được khởi tạo, đến khi cột **Instance state** là **Running** là ta có thể access đến instance:
![Screen Shot 2022-08-19 at 10.25.13.png](https://images.viblo.asia/7156a3fd-562b-48e1-9184-e440fe068857.png)
## 3. Tạo SSH key và cài các package cần thiết trên EC2 instance
Chọn instance vừa tạo, chọn Connect, các tuỳ chọn sẽ hiện ra, ở đây mình sử dụng **EC2 Instance Connect**:
![Screen Shot 2022-08-19 at 10.28.54.png](https://images.viblo.asia/b05fb5d4-0004-4cc1-b001-821d4d915c22.png)
Terminal được mở ra ở tab mới:
![image.png](https://images.viblo.asia/d2ff33c9-2b1d-4ccc-8bde-d79a494d54f8.png)
Tiếp theo ta tiến hành tạo SSH key và add vào Gitlab<br>
Việc tạo SSH key khá đơn giản, bạn có thể tham khảo [bài viết này](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04)<br>
Sau khi tạo, ta add SSH key và Gitlab:<br>
**Edit profile -> SSH Keys**<br>
Paste SSH keys (file .pub) vào mục **Key** và chọn **Add key**:<br>
![Screen Shot 2022-08-19 at 10.37.07.png](https://images.viblo.asia/6c72f74a-951b-4e88-8d56-12881c1c73f6.png)
Tiếp theo mình add Gitlab host vào **known_hosts** để khi tránh việc ask permission khi access Gitlab:
```
ssh-keyscan gitlab.com
```
![Screen Shot 2022-08-25 at 16.34.35.png](https://images.viblo.asia/37547655-5029-48cf-aeb2-fe5529b76d45.png)
Copy giá trị đầu tiên của ouput, sau đó chạy:<br>
```
echo [giá trị vừa copy] >> ~/.ssh/known_hosts
```
Như vậy là EC2 instance đã có thể truy cập vào project trên Gitlab.<br>
Tiếp theo ta cần cài thêm **git**, **node**, **npm**. Tham khảo link sau (dành cho Ubuntu 20.04, các hệ điều hành khác cũng tương tự): 
1. [install git](https://linuxhint.com/git-source-code-management-system/)
2. [install node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
3. [install npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) 
## 4. Tạo file .gitlab-ci.yml để deploy project lên EC2 instance
Trước tiên, mình sẽ lưu địa chỉ IP của EC2 instance và key pair (đã download khi khởi chạy EC2 instance ở bước 2) vào Environment Variables của Gitlab để sử dụng trong file .gitlab-ci.yml<br>
Chọn EC2 instance, tab **Details**, copy địa chỉ ở mục *Public IPv4 address*. Vào project Gitlab, chọn Settings => CI/CD, tại phần Variables, chọn Expand, Add Variable:<br>
Key = EC2_IPADDRESS<br>
Value = [paste địa chỉ IP vừa copy]<br>
Chọn Add variable.<br>
Copy content của file key pair đã download khi khởi chạy EC2 instance và add vào Environment Variables như trên, mình để Key = SSH_PRIVATE_KEY<br>
Tại project trên Gitlab, chọn **Set up CI/CD**<br>
![Screen Shot 2022-08-19 at 10.49.30.png](https://images.viblo.asia/991c2b33-4125-47f3-a949-51c4c4ba29d3.png)
Sau đó chọn Configure pipeline. Gitlab sẽ tự generate ra 1 template mẫu, tuy nhiên ở đây để đơn giản mình sẽ chỉ dùng 1 stage là **deploy**:<br>
Sửa nội dung của file thành như sau:<br>
```
stages:
  - deploy

deploy:
  stage: deploy
  image: alpine
  before_script:
    - apk add openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IPADDRESS "git clone git@gitlab.com:[your_username]/demo-cicd.git || true"
    - ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IPADDRESS "cd demo-cicd && git pull"
    - ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IPADDRESS "cd demo-cicd && npm i"
    - ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IPADDRESS "cd demo-cicd && (npm start || true)"
    - echo "Application successfully deployed."
```
Sau đó chọn Commit changes và Gitlab sẽ chạy job mà ta định nghĩa trong file. Dưới đây là kết quả:
![Screen Shot 2022-08-25 at 10.33.48.png](https://images.viblo.asia/2528f387-95aa-41fb-8177-021a56ef3f1c.png)
***Giải thích:***
Pipeline bao gồm 1 stages có tên là deploy.<br>
Taị stage deploy:<br>
* Sử dụng image (docker) alpine: bao gồm command apk để sử dụng openssh-client mà ta dùng trong *script*<br>
* Phần *beforescript* sẽ chạy đầu tiên: đoạn này chúng ta sẽ add key pair vào session hiện tại để có thể SSH được vào EC2 instance<br>
* Phần *script* bao gồm các command chính dùng để pull source code từ Gitlab và run<br>
## 5. Thưởng thức thành quả
Để truy cập vào ứng dụng, mình sẽ dùng địa chỉ IPv4 của EC2 instance:<br>
Chọn EC2 instance, tab **Details**, copy địa chỉ ở mục *Public IPv4 address*, mở trong tab mới và thêm ":3000" (port 3000), Enter:<br>
![Screen Shot 2022-08-25 at 10.46.51.png](https://images.viblo.asia/71643215-38dc-4c09-89ca-e1522ac67a4d.png)
Thử chỉnh sửa file App.js và commit để xem sự thay đổi.<br>
Đợi job chạy xong và đây là thành quả:<br>
![Screen Shot 2022-08-25 at 10.58.41.png](https://images.viblo.asia/5636e3ec-35bd-4305-930d-b883d2887408.png)

**Vừa rồi mình đã trình bày cách setup CI/CD ReactJS app từ Gitlab lên AWS EC2. Cảm ơn mọi người đã đọc bài viết!**