![](https://images.viblo.asia/a5720ebe-947b-4ec7-8075-a11d8a6474b2.jpg)

Trong công việc, điều mà chúng ta luôn hướng đến chính là giá trị bản thân mình. Là một Web developer, mình nghĩ chỉ biết code thôi là chưa đủ, để tăng giá trị bản thân mình ta cần phải làm nhiều việc hơn như thế, ví dụ tự build được một con server chẳng hạn :thinking:. Đúng, mình nghĩ đây là điều mình cần phải theo đuổi trong những khoảng thời gian sắp tới. Mình đã tự học và tìm hiểu để có thể tự build được một con server của riêng mình, cảm giác rất phấn khích. Bài đầu tiên trong series này, mình xin chia sẻ lại cách thuê 1 con VPS Ubuntu, tạo 1 Instance và quản lý VPS nhé (bow).

# 1. Đăng ký VPS
*Lưu ý: Có Visa hoặc Master Card với tên của chính mình.*

Hiện nay có rất nhiều nhà cung cấp dịch vụ Cloud Server trên thế giới như Vultr, Linode, OVHcloud, ..v..v với rất nhiều chương trình khuyến mại ưu đãi. Khi mình mới bắt đầu học, mình đã đăng ký của Linode nhưng bằng một lý do thần kì nào đấy mình không thể xác thực được tài khoản, vì thế mình đã chuyển qua Vultr. Ở đây mình đăng ký dễ dàng hơn, Vultr là nhà cung cấp dịch vụ mình đang tin tưởng sử dụng cho trang web của mình.

Các bạn có thể vào thẳng [link này](https://canhme.com/server/vultr-100/) để đăng ký gói ưu đãi 100$. Hoặc bạn có thể vào [link này](https://canhme.com/vultr/tang-mien-phi-account-credit/) để xem thêm nhiều gói ưu đãi khác của Vultr nhé.

![](https://images.viblo.asia/dfc3f0a4-df12-4bde-9d84-e9609263c73d.png)
Sau khi ấn vào link, bạn sẽ được đưa đến trang của Vultr và nhập email, password cho tài khoản của bạn.

Tiếp theo đó bạn vào email vừa nhập ở trên để xác thực tài khoản.

Xác thực xong bạn sẽ được đưa đến trang để nhập thông tin cá nhân và thông tin thẻ.

![](https://images.viblo.asia/15b97f65-4a11-4af3-9678-6911f009b2f3.png)

*Lưu ý: Nhớ chọn vào ô "I just want to link my credit card - $0.00 deposit" để không bị trừ tiền trong thẻ nhé.*

# 2. Cài đặt VPS (tạo mới một Instance)
Sau khi cập nhật thông tin thanh toán thành công, bạn sẽ được đưa đến trang Products, đây chính là nơi để bạn tạo mới một Instance.

### 2.1. Chọn server
Đầu tiên, bạn sẽ chọn server, có 4 loại server cho bạn chọn:
1. Cloud Compute - Tạo VPS thường (ta sẽ chọn server này).
2. High Frequency - Gói mới của Vultr với tốc độ CPU cao hơn rất nhiều (3GHz trở lên).
3. Bare Metal - Là dịch vụ server vật lý ngày trước nhưng được chạy trên nền cloud, có nhiều tính năng riêng biệt hấp dẫn.
4. Dedicated Cloud - Máy chủ vật lý (cái này nó khác gì so với Bare Metal thì mình cũng chưa tìm hiểu :sweat_smile:).

![](https://images.viblo.asia/3409defd-f106-417a-9fe3-4ef73e0446d7.png)

### 2.2. Chọn nơi đặt máy chủ
Hiện nay Vultr đang có đến 17 nơi đặt máy chủ trải rộng trên toàn cầu. Ta sẽ ưu tiên chọn Location gần Việt Nam như Nhật Bản, Hàn Quốc, Singapore để tốc độ truyền tải về Việt Nam là nhanh nhất. Bên cạnh đó cũng có những Location ổn định như của Mỹ (Seattle, New York, ...)

![](https://images.viblo.asia/933e2607-ba9c-4def-b319-7d33a657e5af.png)

Ở đây mình chọn Singapore nhé :laughing:.

### 2.3. Chọn loại server (Server Type)
Hiện nay các nhà cung cấp dịch vụ lớn cũng đều hỗ trợ đầy đủ các hệ điều hành nhân Linux như CentOS, Debian, Ubuntu, ... Bên cạnh đó còn có cả Windows để các bạn có thể làm server game nữa :heart_eyes:.

![](https://images.viblo.asia/deb2dffd-95a7-4f7c-a5e9-5deb0b35c14c.png)

Ở đây mình sẽ chọn **Ubuntu 16.04 x64** nhé (vì trước giờ mình mới chỉ làm việc trên Ubuntu và chơi game trên Windows thôi :satisfied:).

### 2.4. Chọn Server Size
* Nếu thời gian sử dụng gói ưu đãi của bạn không thời hạn, thì nên chọn gói thấp nhất để tiết kiệm, gói này đủ cho duy trì một blog. Sau này ta vẫn có thể nâng cấp nếu nhu cầu tăng cao mà không bị ảnh hưởng gì cả.
* Còn nếu gói ưu đãi có thời hạn, thì theo mình cứ chọn gói cao cao 1 tí, nếu không thì hết thời hạn bạn cũng không sử dụng hết được ưu đãi ấy đâu :laughing:.

![](https://images.viblo.asia/6b613cbc-dcc3-4626-aa67-1c46f932aa55.png)

Ở đây mình chọn gói 20$ / 1 tháng, có 2 CPU, 4Gb RAM và 3000Gb băng thông :heart_eyes:.

### 2.5. Additional Features
Có 3 tuỳ chọn cho bạn thêm, ta nên chọn những cái miễn phí và cần thiết:
* Enable IPv6: Kích hoạt dải địa chỉ IP v6, miễn phí, nên chọn.
* Enable Auto Backups: Tự động sao lưu, mất 4$ / 1 tháng, cái này thì tuỳ bạn chọn :sweat_smile:.
* Enable Private Networking: Thêm IP nội mạng để kết nối với VPS, nếu cần thì chọn.

![](https://images.viblo.asia/ea533532-9d1f-420b-a7a2-6b0a1749544a.png)

Ở đây mình chỉ chọn mỗi IPv6 là đủ với mình rồi.

### 2.6. Startup Script - SSH Keys - Server Hostname & Label
Ở 3 mục cuối này thực sự cũng không quá quan trọng trong việc build server và deploy sau này của ta.

1. **Startup Script**: Cái này của Vultr cho phép chạy một chương trình tuỳ biến VPS (mình cũng không rõ lắm).
2. **SSH Keys**: Nếu chúng ta dùng SSH keys để đăng nhập sẽ an toàn hơn so với việc đăng nhập trực tiếp bằng tài khoản root. Nếu các bạn làm việc với Git thì cũng hiểu SSH key như thế nào rồi đúng ko. Bước này chúng ta có thể add SSH key vào sau khi tạo xong VPS cũng được.
3. **Server Hostname & Label**: Phần hostname bạn nhập tên miền chính của bạn vào (tên miền ảo cũng được, chưa cần phải mua ngay 1 tên miền làm gì cho phí), phần Label nhập gì cũng được :sweat_smile:.

![](https://images.viblo.asia/f17bd872-85ad-4fab-848c-5060103273ea.png)

Sau khi hoàn tất các bước trên, các bạn ấn **Deploy Now** và chờ một vài phút để Vultr khởi tạo.

# 3. Quản lý VPS
Sau khi khởi tạo xong một VPS mới tinh, các bạn sẽ được đưa về trang quản lý chung.

![](https://images.viblo.asia/6a675adc-1a38-43ab-9914-8f4066bd5a09.png)

Ở đây là danh sách các server bạn đã tạo, để xem chi tiết hơn, ta click vào tên server in đậm kia là sẽ vào được trang detail của server đó.

![](https://images.viblo.asia/d8ccc199-2f7f-4c21-9227-78dcd306cd16.png)

Từ đây, bạn có thể nhìn thấy được địa chỉ IP và thông tin tài khoản `root` để ssh lên server lần đầu. Tuy nhiên khi ssh lên nhớ đổi pass luôn của tài khoản `root` đi nhé.

Sau khi thêm ssh-key ở máy của bạn vào VPS phía trên rồi, để truy cập và đổi pass root thì chỉ cần mở terminal ở máy local của bạn, gõ:
```
ssh root@<ip server>
VD: ssh root@149.28.136.241
```
Lần đầu ssh bằng tài khoản root thì phải nhập pass, bạn ấn vào hình con mắt là thấy được pass rồi.
Tiếp theo đổi pass của tài khoản root:
```
passwd
```
Tiến hành nhập pass cũ, pass mới. Ở các nhà cung cấp dịch vụ khác thì mình chưa biết, chứ ở Vultr, thì pass mới các bạn đặt cũng phải tuân thủ các quy tắc đặt pass của Vultr, điều này khiến mình an tâm hơn khi sử dụng dịch vụ của nhà này :grin:.

Nhìn vào ảnh phía trên, các bạn cũng đã thấy được các thông số của server mình rồi đúng ko, chi tiết thì mình không nói nữa nhé.

# 4. Chốt tộ
Ở bài viết đầu tiên trong series này, mình đã hướng dẫn các bạn cách để có được 1 VPS khá ngon cho bản thân mình. Các bác lão làng đi ra nhá :sweat_smile:, đừng chê cười bài viết của em.

Ở phần 2, mình sẽ viết tiếp về [***Cài đặt các thành phần cần thiết để chạy PHP Application***](https://viblo.asia/p/deploy-voi-ubuntu-vps-setup-server-va-config-github-phan-2-bJzKmqgYK9N).

Cảm ơn các bạn đã đọc! (bow).