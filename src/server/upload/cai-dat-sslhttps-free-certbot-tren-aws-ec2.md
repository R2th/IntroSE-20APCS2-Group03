### Mở đầu
Hiện nay hầu hết các trang web đều đã hỗ trợ SSL (Secure Socket Layer). Nó mã hóa dữ liệu truyền đi giữa máy chủ web và trình duyệt và làm tăng tính bảo mật cho website. Ngoài ra, việc sử dụng SSL certificate (chứng chỉ SSL) là cần thiết bởi hiện tại Google đã ưu tiên xếp hạng website dựa theo giao thức https (HTTP + SSL), những website mà chỉ sử dụng giao thức http sẽ bị coi là "unsafe" (không an toàn).

![image](https://user-images.githubusercontent.com/55786352/73729403-8d892380-4767-11ea-83c9-c8f1115594c7.png)

Có nhiều loại chứng chỉ SSL cung cấp các mức độ bảo mật khác nhau. Ví dụ chúng ta có thể mua một chứng chỉ SSL tại Namecheap với các mức giá khác nhau tùy từng loại. Tuy nhiên trong bài viết này chúng ta sẽ chỉ nói đến loại cơ bản nhất và làm thế nào để có được nó một cách miễn phí 😁

### Chuẩn bị
- Các bạn có thể đăng ký server AWS theo hướng dẫn [Tại đây](https://viblo.asia/p/dang-ky-server-linux-free-voi-amazon-web-service-va-huong-dan-su-dung-co-ban-ORNZqj1el0n)
- Tại vì trong bài này mình cài đặt ssl phục vụ cho mục đích học tập hoặc làm các webhook ngịch ngịch nếu quan tâm hơn ta nên cân nhắc Sự khác biệt về SSL có phí và miễn phí  [Tại đây](https://www.digistar.vn/khac-biet-giua-ssl-co-phi-va-ssl-mien-phi/)

### Server
- Khi có 1 server mới tinh về AWS EC2, điều đầu tiên ta nên làm là tạo ra 1 tài khoản cho việc deploy code, trong loạt hướng dẫn bên dưới là mình sử dụng Ubuntu 18.04 OS và Nginx nha mọi người

```sh
sudo adduser deploy # Tạo tài khoản deploy
su deploy # Truy cập vào tài khoản này 
mkdir ~/.ssh && vim ~/.ssh/authorized_keys # Tạo ra file xác thực để nhét Public Key sau này ta muốn SSH vào tài khoản này 
exit # Logout ra tài khoản root
sudo usermod -a -G sudo deploy # Cho phép quyền sudo đối với deploy user
```

### Cài đặt Nginx
```sh
sudo apt-get update
sudo apt-get install nginx
```

Kiểm tra xem nginx có hoạt động hay không

```sh
sudo service nginx status
```
Nếu thấy activity running là ok rồi

### Cài đặt Thư viện Certbot

```sh
sudo apt-get install software-properties-common
sudo apt-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python-certbot-nginx
```

- Tới đây ta có 2 options 1 cái là chạy phát certbot sẽ cấu hình cho ta từ A - Z chạy phát f5 có https luôn

```sh
sudo certbot --nginx
```

- 2 là sẽ tạo cho ta những cái file liên quan tới ssl rồi ta tự config.

```sh
sudo certbot certonly --nginx
```

- Trong bài này mình demo cái đầu tiên 
- Sau khi chạy lệnh ở cách 1 đầu tiên nó sẽ yêu cầu mình điền email , điền như bình thường

![image](https://user-images.githubusercontent.com/55786352/72714554-7bbd5300-3ba1-11ea-847b-ba856758a625.png)

- Tiếp theo là đồng ý các chính sách, điều khoản ( Auto Agree ) :d 

![image](https://user-images.githubusercontent.com/55786352/72714599-90015000-3ba1-11ea-92d4-24b05c5ac0fb.png)

- Hỏi mình có muốn share email nhận các thông báo tin tức hay campaigns hay không ( cái này tùy các bạn nhé )

![image](https://user-images.githubusercontent.com/55786352/72714670-b0310f00-3ba1-11ea-96dd-1a7bde1c780c.png)

- Nhập tên miền mà mình muốn cấu hình SSL

![image](https://user-images.githubusercontent.com/55786352/72714750-d191fb00-3ba1-11ea-8c31-4ee7804d5c29.png)

- Cuối cùng là nó hỏi mình có muốn chuyển hướng từ HTTP sang HTTPS khi người dùng truy cập vào HTTP hay không

![image](https://user-images.githubusercontent.com/55786352/72714811-ecfd0600-3ba1-11ea-8ecd-ca1489a10e60.png)

- Sau khi thành công sẽ có thông báo chút các file key nằm ở đâu (Certbot tự động tạo cho mình ) rồi thời hạn của SSL và cách renew

![image](https://user-images.githubusercontent.com/55786352/72714910-1ae24a80-3ba2-11ea-9ecc-154dac119366.png)

### Cuối cùng mở Port
- Về server mới của AWS EC2 thì mặc định lúc tạo instance nó chỉ mở cho mình port 22 để SSH thôi , mình sẽ mở tiếp port 80 và 443 cho http và https
- Đầu tiên ta vào dashboard của instance nhé của mình là https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home vì lúc tạo mình chọn ap-southeast cho nó đỡ lag =))) 
- Bên trái màn hình chon instance

![image](https://user-images.githubusercontent.com/55786352/72715253-b70c5180-3ba2-11ea-8970-0404f18007a9.png)

- Rồi ở dưới phần description phần `Security groups` Ta bấm vào `launch-wizard-*`

![image](https://user-images.githubusercontent.com/55786352/72715198-a065fa80-3ba2-11ea-9193-451fa64ffa00.png)

- Ở dưới Chọn Inbound > Edit > add các rule như hình sau

![image](https://user-images.githubusercontent.com/55786352/72715474-1cf8d900-3ba3-11ea-94fe-34487d53dadc.png)

- Xong quay lại IP Public hoặc tên miền để kiểm tra

![image](https://user-images.githubusercontent.com/55786352/72715833-ca6bec80-3ba3-11ea-8f43-2fb74779031d.png)