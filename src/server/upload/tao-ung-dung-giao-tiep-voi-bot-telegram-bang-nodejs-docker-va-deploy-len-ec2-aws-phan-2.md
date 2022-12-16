Nối tiếp [phần 1 - (Hướng dẫn kết nối với Bot Telegram bằng Node.js)](https://viblo.asia/p/tao-ung-dung-giao-tiep-voi-bot-telegram-bang-nodejs-docker-va-deploy-len-ec2-aws-phan-1-LzD5dR0eZjY), mình sẽ đi tiếp phần còn lại là chạy ứng dụng bằng Docker và Deploy lên EC2 AWS

## III. Run Docker

1. Cài Docker lên máy:
    + MacOs: [tại đây](https://docs.docker.com/desktop/mac/install/)
    + Window: [tại đây](https://docs.docker.com/desktop/windows/install/)
2. Start Docker trên máy bạn
3. Tạo file Dockerfile ở root project và thêm vào đoạn code sau:
```Dockerfile
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1234

CMD [ "node", "index.js" ]
```

4. Run câu lệnh: `docker build -t bot-tele-sample .` Bạn đợi đến khi Docker pull image về hoàn tất
![image.png](https://images.viblo.asia/a4b01d63-c2a2-4352-934a-bf235f827dfb.png)

5. Kiểm tra images đã được tạo bằng cách chạy câu lệnh: `docker images`
![image.png](https://images.viblo.asia/a6dd4e35-070b-4b52-9829-5e9e44b7175f.png)
6. Run image đã được tạo: `docker run bot-tele-sample`
7. Sau khi run thành công, bạn kiểm tra container đã được tạo bằng cách: `docker ps`
![image.png](https://images.viblo.asia/249eb1d4-1791-49ec-b01d-82148d781faf.png)
8. Project đã được chạy bằng Docker thành công, bây giờ bạn vào chat với Bot sẽ nhận được phản hồi:
![image.png](https://images.viblo.asia/84280de8-16cb-4850-ab86-4fd160dda7c4.png)

**Tiếp theo chúng ta sẽ deploy ứng dụng lên EC2 nhé**

## IV. Deploy
1. Khởi tạo Instance EC2 (nếu chưa có tài khoản AWS bạn hãy đăng kí trước nhé: [hướng dẫn tại đây](https://viblo.asia/p/cach-dang-ky-su-dung-dich-vu-free-tier-aws-cua-amazon-1-nam-bang-viettelpay-63vKjkQRZ2R))
2. Sau khi đăng nhập AWS, bạn tìm kiếm EC2 ở ô tìm kiếm
![image.png](https://images.viblo.asia/8c4027ab-ada6-4348-9ad7-b1a84b0ec53a.png)
3. Chọn Launch Instance
4. Chọn option: Ubuntu 18.04 free tier 
![image.png](https://images.viblo.asia/f00f2cde-f55f-4514-8be0-c197e37ed576.png)
5. Chọn: 'Review and Launch' ở step 2 luôn
![image.png](https://images.viblo.asia/6e5a8bf0-bf91-4a70-a1dd-019beb79d940.png)
6. Chọn: Launch
![image.png](https://images.viblo.asia/d625a485-fed9-42ba-999a-4bc45a8ad3f1.png)
7. AWS sẽ show key pair option cho bạn, ta sẽ dùng key này để access vào instance sau này, bạn có thể dùng key đã có, hoặc tạo mới key. Ở đây mình dùng lại key vì mình đã tạo trước đó. Chọn Launch Instance => Chọn View Instance
![image.png](https://images.viblo.asia/89cd9d33-2d17-4d0c-b29e-90d95be80a5c.png)
8. Ở AWS EC2 console, chọn Elastic IPs -> Allocate Elastic IP address -> Allocate
![image.png](https://images.viblo.asia/d05dd432-768f-4abd-8b53-53eb6c92b2c3.png)
9. Chọn IP vừa được tạo -> Associate Elastic IP address -> link với instance bạn vừa tạo -> Click Associate 
![image.png](https://images.viblo.asia/1e7fd3af-8284-4500-9dde-d2cedb5caa8e.png)
10. Tiếp theo chọn Security  Groups ở AWS EC2 Console -> Create Security Group
    - Nhập tên ở Security group name
![image.png](https://images.viblo.asia/004e31fe-7517-4195-b38d-cb78c58f8b63.png)
    - Thêm Inbounds/Outbound rules, ở đây chúng ta sẽ run project ở port 1234 (config trong Dockerfile)
![image.png](https://images.viblo.asia/f633ddca-13c8-41e9-8110-02f7ef14a0cf.png)
![image.png](https://images.viblo.asia/d3098537-0821-4b05-a580-b68ab67137bb.png)

11. Tiếp theo vào instance đã tạo, chọn `change security groups`
![image.png](https://images.viblo.asia/37f7a7de-03fc-4c44-9a5b-bfa6d2fc0195.png)
12. Save lại
![image.png](https://images.viblo.asia/aec84cf4-5af8-4b6b-939e-b7ec529c49a8.png)

13. Mở terminal lên, run câu lệnh: ssh -i *đường dẫn tới key pair* ubuntu@*public ip của bạn* -> chọn yes 
![image.png](https://images.viblo.asia/da699f94-df87-48f4-8674-1bc2a58b0428.png)

14. Run `cd /home/ubuntu`
15. Clone project đã được public lên git (các bạn public source lên project lên github trước nhé): 
`git clone https://github.com/khaaleoo/bot-tele-sample.git`

16. Tiếp theo chúng ta sẽ cài docker ở EC2:
- sudo apt update
- sudo apt install docker.io
- sudo snap install docker
- Kiểm tra docker được cài đặt thành công: `docker --version`
17. Run docker
- `cd bot-tele-sample` và build docker `sudo docker build -t bot-tele-sample .`
-  Tới đây thì như phần III mình đã để cập ở phía trên. Chỉ cần chạy câu lệnh `sudo docker run bot-tele-sample`
<br>
<br>

Thành công, bây giờ bạn chat với Bot để kiểm tra mọi thứ vẫn work đúng như mong đợi nhé!
****
Mình đã hướng dẫn xong việc tạo project cơ bản tương tác với Bot telegram và deploy lên AWS EC2. 
<br>
Hẹn gặp mọi người ở các series khác  ^^
<br>
<br>
<br>


### Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:

+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

<br>
Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:

+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.


Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email khalx.se@gmail.com của mình nha .


Cảm ơn các bạn đã đọc.