AWS là hệ thống webservice mạnh mẽ. Được sử dụng rộng rãi trên khắp thế giới, hôm nay mình sẽ hướng dẫn cho các bạn cách deploy 1 Rails App lên EC2 của AWS kết hợp sử dụng Capistrano Gem, Nginx và Puma.
# 1. Hiểu về các khái niệm: 
1. AWS : Amazon Web Services
2. Nginx: Là một máy chủ proxy mã nguồn mở (open source reverse proxy server) sử dụng phổ biến giao thức HTTP, HTTPS, SMTP, POP3 và IMAP. Cũng như dùng làm cân bằng tải(load balancer), HTTP casche và máy chủ web server.( Nó cũng y như thằng Apache vậy đấy)
3. Puma: Là 1 App Server. App server tải code và giữ trong bộ nhớ. Khi app server nhận một request từ web server nó sẽ báo lại cho bên Rails app biết. Sau khi app xử lý xong request app server sẽ gửi lại response cho web server (và thậm chí gửi tới user). Có rất nhiều app server được sử dụng cho rails app ngoài Puma: Thin, Rainbow, Unicorn.
4. EC2: Hay đầy đủ là Amazon EC2 ( Amazon Elastic Clound) là một trong các gói dịch vụ của AWS cung cấp giải pháp điện toán đám mây cho phép người dùng có thể tạo, thiết lập và sử dụng 1 server 1 cách dễ dàng. Và vì nó là giải pháp điện toán đám mây nên các bước sử dụng và cấu hình tương đối dễ dàng hơn so với các server vật lý khác.
4. Capistrano gem: Capistrano là một chương trình được viết bằng Ruby cung cấp cho bạn một bộ công cụ tiên tiến để triển khai các ứng dụng web đến các máy chủ của bạn. Capistrano cho phép bạn sao chép mã từ (SVN hoặc Git) đến máy chủ thông qua SSH, và thực hiện chức năng trước và sau khi triển khai như khởi động lại một máy chủ web, bộ nhớ cache busting, đổi tên tập tin, chạy di chuyển cơ sở dữ liệu và vv. Với Capistrano nó cũng có thể để triển khai đến nhiều máy cùng một lúc. [Xem thêm về Gem](https://github.com/capistrano/capistrano)
Xong rồi, nôm na các khái niệm nó là như vậy, hiểu sơ rồi thì làm thử thôi. 
# 2. Tạo tài khoản AWS và đăng ký EC2:
Tài khoản AWS thì free , các bạn truy cập vào link của nó [tại đây](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start) và làm theo hướng dẫn để đăng ký mới một tài khoản. Phần này không có gì vướng mắc nên các bạn tự triển nhé. À có một cái, tuy nói là tài khoản free nhưng các bạn cần tốn 1 USD để verify tài khoản thì mới có thể sử dụng các dịch vụ trial của nó nhé. Khi đăng kí nó gửi về email xác nhận, có thể phải chờ tối đa 24h đấy, nhẫn nại nhé.

* Có tài khoản thì login vào thôi, kích vào Go to My Console. sẽ ra màn Dashboard tài khoản của các bạn: 
![](https://images.viblo.asia/a746012c-0ded-4014-b085-666899c265af.png)

* Ở đây có rất nhiều các dịch vụ cho các bạn khám phá, nhưng mà cẩn thận cái nào có phí cái nào không nhé.

* Tiếp theo ở phần Compute các bạn click vào EC2 cái mà mình sẽ đăng kí để tạo 1 server.
![](https://images.viblo.asia/6a0c9060-61a3-4d04-9687-d1b3f1416955.png)

* Sau khi click vào EC2 sẽ đưa các bạn đến bảng điều khiển của EC2 như này :
![](https://images.viblo.asia/cce653cf-b1a9-4755-91ee-75f03c16fc88.png)

* Trong này phần resource có các thông số của bạn, tất cả đều sẽ là 0. của mình do đã tạo từ trước nên có vài cái nó ở số 1 =))

* Thấy cái nút Launch Instance chưa ? Click vào đó thôi :-?

![](https://images.viblo.asia/5405afa9-e4b0-44f4-b735-20bf420b1889.png)

* Ở bước này là bước chọn Máy chủ, có rất nhiều loại máy chủ free ( cái mà có dòng Free tier eligible ở dưới ấy ). Đa số chúng ta quen với Ubuntu rồi nên chọn cái `Ubuntu Server 16.04 LTS (HVM), SSD Volume Type - ami-51537029` này nhé. Ấn vào select phía cuối của dòng đấy 


![](https://images.viblo.asia/5d0185f5-6242-4d0c-b85e-3d3a025f71b0.png)


* Tiếp tục chuyển đến bước thứ 2 , chọn Instance Type. Trong này có nhiều thông số, các bạn cứ tìm hiểu thoái mái, nhưng chỉ có 1 cái được chọn sẵn và có type là t2.micro (lại là dòng free tier eligible) là miễn phí thôi nhé. Chọn nó rồi thì nhìn xuống dưới và chọn vào cái Review And Launch

![](https://images.viblo.asia/80eedbec-df95-4226-980f-32be5c2564a5.png)

* ở màn này thì ko có gì đặc biệt, nó chỉ miêu tả lại các option chúng ta lựa chọn trước đó thôi. Bấn Launch thôi :v: 

![](https://images.viblo.asia/2e8780e4-5277-4c62-8747-ec73c1552931.png)

* Một hộp điều khiển xuất hiện, cái này cho chúng ta tạo ra cái keypair, thứ mà giúp chúng ta connect với server thông qua ssh. Của mình đang có sẵn 1 cái rồi nên nó mặc định vào choose an existing key pair, các bạn hãy chọn ở hộp select trên thành create new key pair, ở phần keypair name đặt tên gì cũng được, tùy ý bạn 

![](https://images.viblo.asia/8b7b3e27-9e9d-4826-a9f6-6b7a9d311e57.png)


* Xong rồi thì ấn vào Download, cái file .pem này các bạn hãy giữ thật kĩ nó , trong đó nó chứa key ssh của server, nếu mất thì không thể truy cập lên server, còn nếu lộ thì ai cũng có thể vào server của bạn, Cái này bạn nào sài SSH rồi thì biết, nó y hệt như vậy . Download file về rồi thì ta chọn Launch Instance thôi nào.

![](https://images.viblo.asia/9d018a45-fdd3-4ed3-ae07-6c53caf259b6.png)


* Màn hình điều khiển cho cái instance bạn vừa tạo, Mình cắt bớt mấy thông tin dưới do có liên quan tới sv của mình nên các bạn thông cảm.
* Trong MH này các bạn chú ý vài thứ thôi.
1. `Public DNS (IPv4) ec2-54-213-209-223.us-west-2.compute.amazonaws.com` Cái này là địa chỉ DNS public của server mà bạn tạo ra, sau này dùng để link connect tới server, hoặc dùng thẳng IP cũng được không sao cả.
2. `Instance State` là trạng thái của con Instance này, nó báo running thì đang chạy.
3. Ở cụm nút phía trên có actions: cho phép các bạn bật/tắt hoặc setting instance. Phần này mình biết bật tắt thôi chứ mấy cái setting thì chưa rờ tới =))

* Xong rồi, chúng ta đã có 1 Server online rồi đó.
# 3. Kết nối đến EC2
Lúc nãy trong các step tạo instance ec2 có bước tạo file Pem. Bây giờ các bạn tìm đến địa chỉ của nó để connect, các bước thực hiện như sau :
1.  Cấp quyền cho file pem các bạn tải về. `chmod 400 your_key_pair.pem`
2.  Thực hiện ssh lên server với cú pháp : `ssh -i "your_key_pair.pem" ubuntu@ec2-54-213-209-223.us-west-2.compute.amazonaws.com`. Trong đó  `your_key_pair.pem` là đường dẫn đến cái file pem lúc nãy các bạn download về, `ubuntu` là tên user mặc định của các máy chủ Ubuntu, `ec2-54-213-209-223.us-west-2.compute.amazonaws.com` là địa chỉ Public DNS trên instance mà lúc nãy mình nhắc đến.
3. Các bạn cũng có thể làm theo hướng dẫn của AWS bằng cách bấm vào chữ Connect như trong hình :

![](https://images.viblo.asia/4fa61d6e-7b4f-4d78-ba5c-cc72921c7134.png)

* Và nó sẽ hiển thị ra bảng hướng dẫn :

![](https://images.viblo.asia/3f160965-947c-4811-b2ea-73461df283a0.png)

* Sau khi ssh thành công lên server sẽ có thông báo dạng như này :
![](https://images.viblo.asia/bbc727e9-104f-4b3d-aee6-9bf02f1a1b99.png)

* Ở màn hình hiện tại bạn đang access đến user mặc định của instance là ubuntu. nó là user root.
Trong quá trình thao tác trên server có thể bạn làm một mình hoặc có thể làm chung với ai đó, việc dùng tài khoản root thì khá là không hay, nên mình đề nghị các bạn tạo ra một tài khoản mới để deploy dự án của mình cũng như có thể chia sẽ cho người khác.
Và hơn nữa khi tạo user mới thì chúng ta chỉ cần add SSH public key của tụi nó vào thôi, khỏi phải chia sẽ cái file Pem của mình, thằng nào ngứa tay nó del 1 cái thì bỏ mọe.
# 4. Tạo user để deploy
## 4.1. Tạo User
1. Chạy lệnh `sudo adduser <new_user>` để tạo user, với new_user là tên bạn muốn, thích đặt gì cũng được, thường thì là www hoặc deploy, còn mình thì hay dùng tên của mình .
2. Tiếp chạy `sudo passwd <new_user>` thường thì khi tạo new user là đã có nhập pass rồi, cơ mà có lúc nó rảnh quá ko cho nhập pass thì chạy cái này để tạo pass nhé :v: 

## 4.2 Cấp quyền
Dĩ nhiên rồi, để mà thao tác ngon lành thì phải cấp quyền cho thằng mình mới tạo chứ.

Chạy lệnh :

```
sudo su linhnguyen1411
```

thành công thì chúng ta đang đứng ở user linhnguyen1411(cái này là của mình nhé, còn của các bạn thì khác nhé )
Ở user này các bạn không thể sử dụng các lệnh sudo để chạy các câu như sudo apt-get update ...
nó sẽ báo lỗi ko tồn tại 
```
linhnguyen1411 is not in the sudoers file. This incident will be reported.

```
Vì nó chưa có quyền gì cả, giờ cấp quyền cho nó thôi.
Quay về user ubuntu lại ( vì cái này mới có full quyền) 
```
sudo su ubuntu
```
chạy lệnh sau 
```
sudo nano /etc/sudoers
```
rồi quăng cái này vào 
```
%linhnguyen1411 ALL=(ALL) ALL
```
![](https://images.viblo.asia/117d1a8a-9277-49fd-8896-964a5239deae.png)

Rồi xong, đóng nó lại.
Chuyển về lại user mình tạo ra thôi 
```
sudo su linhnguyen1411
```
Giờ ở User này chúng ta có full quyền rồi, thích làm gì thì làm thôi.

* Để khỏi mỗi lần connect sài file pem hay mật khẩu các thứ thì giờ chúng ta tạo ssh cho nó.
```
mkdir .ssh
sudo chmod 700 .ssh
nano ~/.ssh/authorized_keys
sudo chmod 600 ~/.ssh/authorized_keys
```

Mấy cái này thì chắc quen thuộc quá rồi nhỉ, chỉ là tạo ra thư mục ssh và file chứa các key ssh public được phép.

Key ssh này đâu ra ? Chúng ta sẽ tạo ra một cái ở dưới máy local của chúng ta, nếu ai tạo rồi thì vào lấy ra thôi nhé.
```
ssh-keygen -t rsa -C <ten_gi_cung_duoc>
```

Cứ bấm enter enter enter cho tới khi xong ra như này là ok 
```
....
+--[RSA 2048]----+
|+E%.. . o .      |
|.O * . . +       |
```

Rồi giờ lấy cái key đó ra
```
cat ~/.ssh/id_rsa.pub
```
copy hết cái đoạn mã đó rồi lên server dán vào file `authorized_keys`
Tương tự nếu muốn add máy local nào lên thì làm y như vậy nhé, cứ enter rồi dán key mới lên là oke cả.
Xong phần thiết lập ssh, giờ mỗi lần cần kết nối tới con EC2 này thì chỉ cần gõ 
```
ssh linhnguyen1411@54.213.209.223
```
với `linhnguyen1411` là user bạn tạo để deploy, `54.213.209.223` là địa chỉ public ip được cung cấp trên con EC2.

Thế là xong phần connect tới server.
Con server này giờ như 1 trang giấy trắng, y hệt như cái máy tính cài ubuntu mới vậy, chưa có gì cả. Chúng ta cài vài thứ đáp ứng nhu cầu cho Rails app y như ở máy local thôi.
Mấy thứ cần thiết cho rails app: 
1. Ruby
2. Rails
3. MySql
4. Redis
5. Git 
6. ...

Trên đây mình giới thiệu xong về các bước tạo một con EC2 trên AWS và cách connect tới server. Bài tiếp theo mình sẽ hướng dẫn cho các bạn cách cấu hình Project để deploy nhé. (seeyou)