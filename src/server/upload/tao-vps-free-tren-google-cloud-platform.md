## :+1::+1: Lời nói đầu :+1::+1:
- Chào các bạn, ở bài viết này mình xin chia sẻ về cách tạo **VPS Google Cloud** **miễn phí**.  Có thể nhiều bạn đã tìm hiểu nhưng hôm nay mình vẫn xin chia sẻ thêm cho các member mới để tìm hiểu và cấu hình server ạ. ( Lần đâu em viết viblo nên hơi xấu ạ)

# :+1: VPS là gì? VM là gì?
- **VPS (Virtual Private Server)** là dạng máy chủ ảo, ta hiểu đơn giản là ở một nơi nào đó có một máy chủ vật lý được phân chia thành nhiều máy chủ khác nhau (**server ảo**)  có tính năng tương tự như máy chủ riêng, chạy dưới dạng chia sẻ tài nguyên của máy chủ ban đầu.  Mỗi *server ảo* này là 1 VPS. 

- **VM (Virtual machines)** là 1 VPS hosting, một hệ thống hoàn toàn riêng biệt, có một phần CPU riêng, dung lượng ổ HDD riêng, địa chỉ IP riêng và hệ điều hành riêng, người dùng có toàn quyền quản lý root.
## :100: Hướng dẫn tạo VPS miễn phí

### 1. Chuẩn bị
- 1 thẻ visa hoặc các loại thẻ có chức năng thanh toán quốc tế đều được. 
- CMND / CCCD (đăng ký thẻ visa của bạn) để đăng ký thanh toán.
- Tài khoản google ( Cái này chắc không ai thiếu nhỉ)
- Và 1 tâm hồn đẹp.
### 2. Đăng ký tài khoản, tạo thông tin thanh toán
- Nếu lần đầu bạn truy cập [GCP Console ](https://console.cloud.google.com/getting-started) thì sẽ phải  **Try for free** để đăng ký theo hướng dẫn nhé

![image.png](https://images.viblo.asia/1b5004a6-8bd2-4b44-97f7-ab57146f942e.png)

- Phải đảm báo trong tài khoản của bạn có 1$ nhé. Sau khi add số tài khoản vào nó sẽ trừ của bạn 1$ nhưng bạn yên tâm sau 1phút sẽ được cộng lại thôi. Mình cam đoan là free mà. 
- Bước tiếp theo là tạo billing account để thanh toán. [Tạo billing account tại đây](https://console.cloud.google.com/billing/create?organizationId=0)

![image.png](https://images.viblo.asia/d3d15a27-062f-4a10-99b9-2f9dd7d70bb6.png)
- Sử dụng thẻ các bạn add hồi này để thanh toán

![image.png](https://images.viblo.asia/edcecbd7-07e2-443b-8449-9b9f2f5078c0.png)

- Vậy là xong 99% rồi đấy. Bạn kiểm tra trong tài khoản xem bao nhiêu nhé. ( 300$ gần 7 củ đấy ạ, cái này mà đổi được tiền thật thì ngon)

![image.png](https://images.viblo.asia/75e7862b-ba5d-4e85-be5b-b41ba35620a3.png)

### 3. Tạo VM instances thôi.

- Bạn vào Computer Engine => VM instances => Create instances. Trước tiên mình phải chon project và enable computer engine đã.
- Chọn cấu hình như bên dưới hoặc theo sử thích của bạn, free mà, nhưng bật details để xem bao nhiêu tiền/ tháng.
![image.png](https://images.viblo.asia/58052502-871c-4f50-9cf3-2dc5f0ea79d0.png)
- Chọn SSH như bên dưới để truy vập VM.

![image.png](https://images.viblo.asia/2f9bda9a-2197-4ddc-98cf-dab8a18f16ba.png)

- Như vậy là bạn đã truy cập được VM rồi đấy.

 ![image.png](https://images.viblo.asia/67283a08-cda5-45a6-a2f4-e74db1553a70.png)

- Sau khi truy cập Vm thì cần phải tạo password cho tài khoản root và user đăng nhập. 
```
Truy cập root: sudo -i 
Thay đổi password root: passwd
Thay đổi password user: passwd <username>
```
![image.png](https://images.viblo.asia/84bc872a-6dcc-4b26-9447-928dcccb6894.png)

### 4. Cấu hình ssh
- Truy cập file config sshd bỏ chọn 3 chỗ như bên dưới để cho phép truy cập từ mọi thiết bị được xác thực bằng ssh. 
```
sudo vi /etc/ssh/sshd_config
```
![image.png](https://images.viblo.asia/28257ead-906c-4041-80d4-4de1cc950c3b.png)

- Tiếp tục copy ssh key của bạn vào .ssh/authorized_keys, mỗi key là 1 dòng nếu bạn muốn add nhiều nhé.
- Tương tự nếu bạn muốn config ssh cho root thì vào ssh của root nhé
 Nếu chưa có key thì tạo ssh key [tại đây](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1604)
    ```
    sudo vi .ssh/authorized_keys
    ```
![image.png](https://images.viblo.asia/2ca1ccd2-c802-41ad-8a2c-560bba3cc3ac.png)
    
 - Xong rồi đấy, giờ thì tận hưởng thành quả thôi. 
 - Mở termminal của máy bạn lên gõ     ```  ssh <username>@<ip_host>  ```, ví dụ như  ```  ssh bathanh>@25.356.256.245 ```
 
 - Hiển thị như thế này là thành công nhé.
 - ![image.png](https://images.viblo.asia/545928e7-9455-41c2-af53-6fce3790e963.png)
 
### 5. Tài liệu
-  Set up ssh key client: https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1604
-  Create account GCP: https://cloud.google.com/apigee/docs/hybrid/v1.1/precog-gcpaccount