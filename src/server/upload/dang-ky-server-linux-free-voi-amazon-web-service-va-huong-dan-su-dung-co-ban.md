## 1. Mở đầu

+ Đối với các lập trình viên nói chung, đặc biệt là `lập trình viên web` nói riêng, khi nhắc tới `deploy projetc` lên server hẳn là một điều gì đó khá kích thích.

+ Nôm na ở mức cơ bản nhất, khi bạn lập trình website, sản phẩm đang chạy ở `localhost` trên máy của bạn, thì chỉ có `rất ít` người có thể tận hưởng thành quả này.

+ Bạn muốn thầy cô, bạn bè, người yêu hay `cả thế giới` cũng có thể trải nghiệm thành quả đó thì hãy `triển khai website` lên chiếc máy khác, mà ở đó, mọi người đều có thể truy cập để tận hưởng thành quả của bạn :v: 

> Đó chính là deploy: Triển khai sản phẩm vào đời sống

![](https://images.viblo.asia/e0e3e80f-d1bf-4959-8bd1-a1d0eb14521c.png)

> Vậy kiếm chiếc máy đó ở đâu ?


> Tuy nhiên, cùng tìm hiểu thêm một chút đã nhé :D

## 2. Cấu trúc

### 2.1 Mô hình

+ Chiếc máy đó chính là `server`, hay còn gọi là `máy chủ`

    + Máy chủ (server) là máy có chức năng `lưu trữ, cung cấp hoặc xử lý` thông tin.

    + Các máy khách (client) `gửi lên` hoặc `tải xuống` dữ liệu từ máy chủ.

![](https://images.viblo.asia/e9f655b4-767b-4894-8c7f-c25838d8ef0d.png)

Người yêu, hay bạn bè hay thầy cô của bạn có thể dùng `laptop, điện thoại hoặc PC` (ở bên trái), thông qua `mạng interet` để tiếp cận với `server` (ở bên phải - nơi bạn đặt ứng dụng của bạn làm ra).

> Đây chính là mô hình Client - Server. 

### 2.2 Các loại server

+ Căn cứ theo `phương pháp tạo ra` máy chủ, ta có ba loại:
    + Máy chủ `chuyên dụng` (Dedicated Server): 
                        
      + Chúng ta sẽ thuê cả `một chiếc máy thật`, bao gồm từ `phần cứng chuyên dụng` cho đến các `thiết bị hỗ trợ` như ổ cứng, CPU, RAM, card mạng ...
      
      + Với cách này thì sẽ thực sự sở hữu nguyên một chiếc máy server, `không chung chạ` gì với cha con đồng chí nào cả.
      
      ![](https://images.viblo.asia/9e713b3c-d073-4ecc-a058-1a255b37fdae.jpg)
      
      + Tuy nhiên, `giá thành` sẽ rất cao, mình không nghĩ là có đơn vị nào cung cấp free nó cả. 
      
      + Và việc `nâng cấp` hoặc thay đổi `cấu hình` của máy chủ riêng đòi hỏi phải `thay đổi phần cứng` của máy chủ, khá mất thời gian và `thủ công`. 
      + Nó sẽ phù hợp với doanh nghiệp mà thông tin được `chuyên biệt hóa`, hoặc ứng dụng liên quan đến `phần cứng`, các `thuộc tính` trên phần cứng, doanh nghiệp `kiểm soát` được hoàn toàn thông tin của công ty.

     + Máy chủ `ảo` (Virtual Private Server – VPS): 
       
       + Từ lý do phải dùng cả máy chủ lớn, `chi phí cao`, người ta dùng `công nghệ ảo hóa` (virtualization) để từ một `máy chủ vật lý` có thể chạy nhiều `máy chủ ảo`, rồi sau đó chúng ta sẽ thuê những máy chủ ảo này.
       
       ![](https://images.viblo.asia/a9548443-fd2c-4c99-ade7-4edd28819b32.png)
       + Các máy chủ ảo `dùng tài nguyên` từ máy chủ vật lý gốc. Việc nâng cấp hoặc thay đổi cấu hình của máy chủ ảo rất `đơn giản`, có thể thay đổi trực tiếp trên phần mềm. Tuy nhiên lại bị `giới hạn` bởi tài nguyên của máy chủ vật lý
       
       + Tư tưởng của việc này có nét giống với việc bạn thuê phòng ở `một mình` thì `đắt` nên tìm người ở cùng vậy :v:

  + Máy chủ `đám mây` (Cloud Server):
  
    + Rồi lại từ việc bị `giới hạn` tài nguyên phần cứng, người ta dùng `công nghệ điện toán đám mây` (cloud computing) cùng với `hệ thống lưu trữ SAN` để kết hợp `nhiều máy chủ vật lý` ở các nơi trên thế giới.
    
    + `Hệ thống lưu trữ SAN` với tốc độ truy xuất vượt trội giúp máy chủ hoạt động nhanh, ổn định, hạn chế mức thấp tình trạng downtime. 
     
    + `Công nghệ điện toán đám mây` nên dễ dàng nâng cấp từng phần thiết bị trong quá trình sử dụng mà không làm gián đoạn quá trình sử dụng máy chủ.
     
     ![](https://images.viblo.asia/fedc2cfd-bf2e-4ba0-95e3-47b0da4957d7.png)
     
     -> `Chi phí` tính theo giây thực tế sử dụng, khi không cần có thể `tạm ngưng` sử dụng.
     
     -> Có thể `scale, nâng cấp` cấu hình 
        
       + Ở giai đoạn đầu của sản phẩm đang có ít end_user thì dùng cấu hình thấp.
       + Sau này số lượng `end_user` tăng lên thì điều chỉnh tăng cấu hình tương ứng

     => Giúp tiết kiệm chi phí hơn.
     
> Trên thị trường hiện nay, các Cloud Server free có chất lượng không thua kém gì bản mất phí, chỉ là bị giới hạn dung lượng hoặc cấu hình.
> Còn VPS với những bản miễn phí đôi khi hay xảy ra tình trạng giật lác ...

> Vậy nên chúng ta sẽ tìm hiểu và sử dụng Cloud Server luôn nhé.


 ## 3. Nhà cung cấp
 
 Nhắc đến các nhà cung cấp Cloud Server thì có ba ông lớn:
 
  + Google với sản phẩm `Google Cloud`.
  + Microsoft với sản phẩm `Microsoft Azure`.
  + Amazon  với sản phẩm `Amazon Web Service` (AWS).
  
![](https://images.viblo.asia/3df7775e-f2af-47d5-8a37-0252e6cda38e.jpg)
 
+ Ngoài ra thì còn các nhà cung cấp khác với thị phần nhỏ hơn như `Aruba Cloud`, `DigitalOcean`,  `Vultr` ...

 + Thế `chọn` dịch vụ của bác nào bây giờ ?

   + `AWS` đã bước chân vào thị trường Cloud này `khá sớm` - 2006, và trở thành mỏ `đào ra vàng` cho Amazon. Hiện nay vẫn đang chiếm thị phần lớn nhất, `năm 2018 là 32%`, nếu bạn có một doanh nghiệp lớn và bạn cần `nhiều ứng dụng, tiện ích` nhất có thể, AWS có thể là giải pháp của bạn.
   + `Microsoft` bước chân vào năm 2010, đến `2018 thì đang chiếm 16,5 %`. Nếu doanh nghiệp của bạn đã rất `gắn bó` với `hệ sinh thái` này, thì Azure có thể là lựa chọn của bạn. 
   + Còn Google bước chân vào năm 2008, `đến 2018 thì chiếm 9,5 %`. Đối với các công ty khởi nghiệp nhỏ, Google Cloud có thể là một giải pháp tốt vì mức giá `hấp dẫn hơn`, dễ sử dụng cho công ty nhỏ.
 
 > Với các khách hàng Nhật Bản thì không hiểu sao họ cực kì chuộng AWS, gần như là mặc định khi chọn nhà cung cấp server. Mình cũng đang làm việc với AWS, độ miễn phí của AWS cũng có vẻ mạnh tay nên trong bài viết này, chúng ta sẽ cùng tìm hiểu AWS nhé !

Khi đó, [ta được miễn phí những gì](https://aws.amazon.com/vi/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc):
 
 ![](https://images.viblo.asia/2e4cbefc-62b1-46c5-8281-62faa2876fa8.png)
 
 ![](https://images.viblo.asia/64afbf5d-df4c-42e4-8a67-ce65849ffb3e.png)

+ Đó là `Amazon EC2`: dịch vụ máy chủ ảo với 750h free
+ Đó là `Amazon S3`: dịch vụ lưu trữ dữ liệu với 5 GB free
+ ... và rất nhiều dịch vụ khác.

Trong phạm vi bài viết, như đã đề cập ở trên, ta cùng `tìm hiểu Amazon EC2` nhé.

## 4. Các bước tiến hành

### 4.1 Chuẩn bị
- Chuẩn bị `thẻ VISA` hoặc `Master Card`.

  + Có thể một số bạn chưa quen và `ngại` đi làm thẻ VISA nhưng việc `thanh toán online` cho các công ty quốc tế như thế này là điều hết sức `bình thường`, trước sau gì thì cũng nên làm một cái.

  + Và bởi vì chúng ta sẽ thanh toán online nếu `phát sinh chi phí` cho nên ngay từ bước đăng ký tài khoản thì đã cần thông tin này rồi.

- Về thẻ quốc tế thì có chút lưu ý như sau:
  + Thẻ ngân hàng thông thường (thẻ nội địa) thì chỉ có thể `thanh toán trong nước`, `thanh toán quốc tế` thì cần thẻ VISA hoặc Master Card, khi ra nước ngoài `rút tiền` thì cần thẻ này.
  + Có 2 loại thẻ quốc tế là `Debit hoặc Credit`, google để tìm hiểu thêm
  + Vì chỉ cần có thông tin trên thẻ thanh toán quốc tế, sau đó xác thực OTP là có thể thanh toán được, (thậm chí một số hệ thống còn bỏ qua xác thực OTP) nên nếu bị `mất thẻ` thì coi như xong, vậy nên mô hình mà mọi người `khuyến cáo` nên sử dụng là làm một `thẻ nội địa` (để phần lớn tài khoản) và 1 `thẻ VISA` (để ít tiền).
  + Chọn `ngân hàng`: 
     + Nội địa thì hay dùng thẻ của ngân hàng `Vietcombank` (chất lượng ổn định, tuy phí duy trì với chuyển tiền hơi cao)
     + Quốc tế thì dùng thẻ của ngân hàng `ACB` (Thủ tục đơn giản, nhanh chóng, thời gian xác minh thấp, tới quầy giao dịch đăng ký thì sau 1-2 h đã có thể lấy thẻ dùng ngay, còn một số ngân hàng khác phải đợi từ 5-7 ngày.)
      
### 4.2 Đăng ký tài khoản

- Vào trang chủ, [đăng ký](https://portal.aws.amazon.com/billing/signup#/start) tài khoản Amazon nào.

![](https://images.viblo.asia/7dd2ab46-7f5c-41b8-bb39-239b35e5b462.png)

- Các bạn cứ lần lượt điền các thông tin rồi `Continue` nhé ! Cũng không có gì quá đặc biệt ở đây cả, chỉ có `lưu ý` nhỏ là:
  -  amazon.com -> trang `bán lẻ` của công ty Amazon 
  -  aws.amazon.com -> mới là `truy cập dịch vụ` Amazon Web Service
  -  Đăng ký xong sẽ cần một thời gian để hệ thống `xác minh thông tin ngân hàng` của bạn, nhỡ đâu bạn `khai man` thì sao :D Đợi email để biết kết quả nhé.
  - Tài khoản ngân hàng của bạn sẽ bị `trừ 1$`, khả năng là `phí xác minh danh tính` thì phải. Một số bạn của mình đã được `hoàn lại` sau một thời gian, nhưng mình thì mãi mà chẳng thấy được hoàn lại gì cả :D

### 4.3 Tạo Instance 

![](https://images.viblo.asia/54ec87fb-b30b-4b93-b47f-0dd356b87be3.png)

- Sau khi `Sign in to the Console`

    Dưới đây là màn hình Console
 ![](https://images.viblo.asia/f3b113f5-ca5e-4386-aa1f-dbc934c0d78e.png)

- Có rất nhiều dịch vụ được AWS cung cấp, để tạo và sử dụng `cloud server` ta chọn EC2 (Amazon Elastic Computer Cloud).
    - Chọn luôn `Region Singapore` cho gần Việt Nam nhé
    - Mỗi một khi chạy một `instance` tức là tức là chúng ta đang khởi chạy lên một `cloud server`, nếu bật `2 instance` thì `mỗi phút` trôi qua bạn sẽ bị tính thành `2 phút` và mỗi tháng bạn có `750 h free` như thế trong vòng 1 năm. 
   - Nếu sắp vượt quá giới hạn free thì sẽ có `email cảnh báo` gửi đến bạn, và nếu vượt qua thì bạn sẽ bị `trừ tiền`, vậy thôi =))

 ![](https://images.viblo.asia/b9655219-00ac-4b7e-abaf-5d662ceeee78.png)


- Click vào `Launch Instance`:
  - Bạn sẽ tới bước 1, chọn `Amazon machine images` (AMI) 
  - AMI cung cấp các gói cần thiết (bao gồm hệ điều hành và một số phần mềm cần thiết). 
  - AMI nào có chữ `Free tier eligible` tức bạn có thể sử dụng nó theo cấp free.
  - Ở đây, mình cứ chọn Server Ubuntu 18.04 `trắng tinh` mà quất thôi =))
![](https://images.viblo.asia/b9cff9d6-9ee3-414b-b713-da7e772c1285.png)
 
- Chọn `Instance Type`, 
  + Tương ứng sẽ chọn CPU, RAM ... nhưng ở đây chỉ có 1 loại được sử dụng cho "Free tier eligible" thôi.
  + Nếu chọn `Review and Launch` thì bạn sẽ đồng ý với các config mặc định tiếp theo.
  + Nếu chọn `Next: Configure Instance Details` thì bạn sẽ đi tới các bước cấu hình chi tiết và có thể sửa đổi chúng.

  ![](https://images.viblo.asia/269eee63-7f87-4206-a6a0-dac76649280e.png)

- Setting `Key Pair`
   - Ở bước này, chúng ta cần tạo `Key Pair` rồi tải xuống, để sau này, chúng ta có thể dùng nó để `SSH vào server`.
   - `Download Key Pair` về rồi giấu nó đi héng, để người khác `biết được` là cũng mệt đấy.
![](https://images.viblo.asia/9a953486-6c01-488e-b5b2-8104276ec3db.png)

- Click `Launch Instance`
  + Chúng ta sẽ tới màn hình quản lý Instance, sau khi Instance State chuyển sang Runing thì oki xong, chúng ta đã tạo xong một Cloud Server.
![](https://images.viblo.asia/5f699e4c-69db-4870-9d9c-b260c3502f12.png)

## 5. Hướng dẫn sử dụng cơ bản

### 5.1 Security groups

+ Click vào `view inbound rules`, mình sẽ nhìn thấy cổng kết nối đang được áp dụng.

![](https://images.viblo.asia/53fac31d-de84-4bb3-b5bd-d0aad65031be.png)

+ Click vào `launch-wizard-3`, sẽ tới màn hình quản lý các `Security groups`
   + SSH thì sẽ qua `cổng 22`, HTTP thì sẽ qua `cổng 80`, HTTPS thì qua `cổng 443` ...
   + Nếu muốn có `hình thức kết nối` nào thì ta cần `mở cổng tương ứng`.
   + Có 2 cách ở đây, một là `edit`, bổ sung thêm hình thức HTTP cho `launch-wizard-3`. Hai là `tạo mới` `launch-wizard-4` rồi chỉnh cho `instance` vừa tạo sử dụng `securiry groups` này ...
![](https://images.viblo.asia/1c5d1e6a-d8e9-4a5d-b2a6-13b3de019b6b.png)

### 5.2 Truy cập Instance

 + `Chuột phải` vào dòng hiển thị instance, `chọn connect` sẽ hiển thị lên hướng dẫn truy cập:
![](https://images.viblo.asia/f873d44d-7d58-4791-99fa-56dbde022b41.png)

Bao gồm
+ Cấp lại quyền cho file pem: 
    ```
    chmod 400 hoanky_blog_1.pem 
    ```
+ Sử dụng SSH để kết nối tới server 

  Cú pháp:
    ```
    ssh -i <path_to_pem_file> <user_name>@<public_dns_ipv4>
    ```

     + user_name: Mặc định thì user_name ở đây là ubuntu
     + public_dns_ipv4: các bạn có thể tìm thấy ở tab Description

  Vi dụ:
    ```
    ssh -i "hoanky_blog_1.pem" ubuntu@ec2-13-250-102-116.ap-southeast-1.compute.amazonaws.com
    ```
    
 ![](https://images.viblo.asia/bf0b2a90-393c-490a-b242-9e4b11e3a7a5.png)
 
 #### 5.3 Cấp quyền
 
 + `Tạo thêm` user

     ```
     ubuntu@ip-172-31-24-203:~$ sudo adduser deploy
     ```
 
 ![](https://images.viblo.asia/8dd724a3-6def-4396-8c97-0b8847f13d59.png)
 
  + `Chuyển đổi` user
  
 ![](https://images.viblo.asia/274bab87-5c3b-4006-80f1-33ff813cdf3d.png)
 
 + Bây giờ, bạn phép ai đó có thể `truy cập` server với `account user deploy`, còn `user ubuntu` thì chỉ có bạn thôi, vì bạn là `big boss` mà :D

    + Sinh SSH key ở local
         ```
          ssh-keygen -t rsa -C "deploy@gmail.com
         ```
     + Điều này sẽ tạo ra public key và private key.
          + Private key thì phải giấu nhé
          + Public key thì mặc định được lưu ở đây
              ```
              cat ~/.ssh/id_rsa.pub
              ```
     + Đem public key này đặt vào server, tương ứng cho user deploy
       ```
        su deploy
        cd
        mkdir .ssh
        nano ~/.ssh/authorized_keys
       ```
       rồi paste public key vào đây.
      
      + Okie, xong rồi, bạn có thể kết nối từ local vào `user deploy` rồi
      ![](https://images.viblo.asia/0f3041d1-a164-4af6-bb97-a9b4bdca820a.png)
      
  + Cấp `quyền sudo`
    + Tuy  nhiên `user deploy` này chưa thể chạy với `quyền sudo` được
     
       ```
        deploy@ip-172-31-24-203:~$ sudo apt-get update
        [sudo] password for deploy: 
        deploy is not in the sudoers file.  This incident will be reported.
       ```
    + Vậy nên hãy `cấp quyền` sudo cho nó
      
      ```
      sudo nano /etc/sudoers
      ```
      
      ![](https://images.viblo.asia/ec6b5d2e-be7f-402b-8871-978b921987f2.png)
      
      Để ý một chút, ta thấy có group `admin` và group `sudo` kìa, vậy add `user deploy` vào `group sudo` là xong.
      
      ```
      sudo usermod -a -G sudo deploy
      ```
      
      ![](https://images.viblo.asia/bfb2b49d-1679-4fe2-b33e-4948ec83451d.png)
      
      
 #### 5.4 Truy cập HTTP
 
 Ở phần này chúng ta sẽ `config` để có thể truy cập server từ `cổng 80` nhé. OK let go :D
 
 + Bước 1: Chỉnh `Security groups`
     + Chỉnh sửa `security groups` mà `instance` đang sử dụng, bổ sung thêm HTTP nếu chưa có
     ![](https://images.viblo.asia/66228812-69e1-481f-8c91-f69fbdffc80f.png)
  
 + Bước 2: Cài đặt nginx cho server.
         
     ```
     sudo apt-get install nginx
     ```
  + Kiểm tra lại status của nginx service
    ```
    sudo service nginx status
    ->    Active: active (running) since Wed 2019-07-24 03:42:54 UTC; 8s ago
    ```
  + Tận hưởng thành quả nào 
  ![](https://images.viblo.asia/bf5f7939-fa26-47af-936b-561eae406ab5.png)
 



**Tài liệu tham khảo:**

① https://www.google.com/

② https://vn.apps-gcp.com/so-sanh-dich-vu-gcp-vs-aws-vs-azure/

③ https://quantrimang.com/tim-hieu-ve-dich-vu-amazon-ec2-83626

④. https://www.codehub.vn/Phan-Biet-Su-Khac-Nhau-Giua-VPS-va-Cloud-Hosting

⑤ https://toidicodedao.com/2018/11/27/cloud-ra-doi-cloud-provider-aws-azure-gcp/

⑥ https://vuihocweb.com/vhw-reviews/hosting-reviews/nhung-dich-vu-vps-free-dang-dung

⑦ https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc

⑧ https://www.google.com/search?q=Cloud+Web+Services+c%E1%BB%A7a+c%C3%A1c+%C3%B4ng+l%E1%BB%9Bn+Amazon(AWS)%2C+Microsoft+Azure+hay+Google+Cloud.&oq=Cloud+Web+Services+c%E1%BB%A7a+c%C3%A1c+%C3%B4ng+l%E1%BB%9Bn+Amazon(AWS)%2C+Microsoft+Azure+hay+Google+Cloud.&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8