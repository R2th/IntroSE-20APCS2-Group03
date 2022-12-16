### Mở đầu
Hiện nay Docker đã quá nổi tiếng nên chắc có lẽ cũng không cần giới thiệu nhiều nữa. Không chỉ dừng lại ở việc mang đến môi trường phát triển đồng bộ trong quá trình xây dựng sản phẩm mà còn mang đến sự tiệm cận giữa môi trường phát triển và môi trường product. Vòng sử dụng Docker + Github + Dockerhub ( autobuild ) -> VPS thật sự mang đến nhiều lợi ích. Về lý thuyết cũng như cách sử dụng Docker thì trên Viblo của chúng ta cũng đã có khá nhiều bài viết về Docker nên mình xin phép không lạm bàn thêm nữa. Bạn có thể tìm hiểu thêm tại [đây](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-1-bJzKmM1kK9N) hay tại [đây](https://viblo.asia/p/tim-hieu-ve-docker-m68Z08RzZkG). Hôm nay, mình xin được phép hướng dẫn cách Deploy một project sử dụng Docker lên VPS  hosting mà cụ thể là `DigitalOcean`

### DigitalOcean
DigitalOcean là nhà cung cấp dịch vụ Cloud server với giá khá dễ chịu. Mình có một trang web nhỏ xài gói 5usd/tháng của DigitalOcean nhìn chung cũng khá ổn. Nhưng sự thật là  mình dùng DigitalOcean chẳng qua là vì nó cho mình xài chùa, mình có gói Github student pack nên DigitalOcean cho mình 100usd free, chứ mai mốt Linode, Lightsail hay bất cứ ai cho 100usd free là mình dùng liền hà =)). Bạn có thể dễ dàng đăng ký một tài khoản DigitalOcean tại [đây](https://m.do.co/c/8e91bc167cbc). Sau khi đăng ký, bạn xác nhận thẻ visa và nhận được 100USD miễn phí. Hoặc bạn phải nạp vào cho họ 5usd để xác nhận tài khoản nếu là đăng ký thanh toán qua paypal. Sau khi đăng ký thành công, bạn có thể dễ dàng triển khai một máy chủ web bằng việc tạo một Droplet và thoải mái nghịch phá.

### Tạo một Droplet có sẵn Ubuntu và Docker 
Sau khi đăng ký và xác nhận tài khoản xong xuôi, bạn click vào nút Create màu xanh trên góc phải màn hình  và click vào nut Droplets để tạo một Droplet như hình dưới đây <br/><br/>
![](https://images.viblo.asia/b0aa8f0f-6c66-427b-b8bc-ed77c37e4c4f.png)

Sau khi chuyển qua màn hình tạo Droplet, bạn nhấn vào `One-click apps` để tạo một `Droplet Ubuntu cài sẵn Docker` như hình <br/><br/>
![](https://images.viblo.asia/52d3a1df-e924-4163-b5e0-df8d74626576.png)

Tội nghiệp mình ghê, lần đầu không biết, tạo nguyên một Droplet Ubutu trắng trơn xong ngồi hì hục cài Docker, cài Git...v.v. Mắc mệt.... 

Tiếp tục kéo xuống phía dưới để chọn gói VPS của bạn. Ở đây, bộ `Standard Droplets` bạn sẽ có một số lựa chọn cấu hình như dưới đây. <br/><br/>
![](https://images.viblo.asia/a7da66ac-dfc5-45a2-87fd-3619ac2665c1.png)

Tiếp theo, chọn `Choose a datacenter region` thì bạn nhớ chọn `Sigapore` cho nó nhanh hơn xíu nhé ( Nếu người dùng chủ yếu đến từ VN )
Cuối cùng, và cũng quan trọng nhất, bạn phải add thêm `SSH KEY` của bạn để còn tương tác với Droplet <br/><br/>
![](https://images.viblo.asia/0045818b-994b-4556-8b74-ff71bd8be5d6.jpg)

Rồi, Bây giờ bạn đợi xíu bạn sẽ có một Droplet cho riêng mình. Sau khi tạo, `DigitalOcean sẽ gửi một email chứa Root password của Droplet vừa tạo`. Vậy nên bạn nhớ check mail nhé..

### Đăng nhập vào Droplet qua ssh 
Vậy là bạn đã hoàn tất việc tạo một Droplet cho riêng mình. Bây giờ bạn chỉ cần đăng nhập qua SSH là đã có thể làm chủ hoàn toàn Droplet vừa tạo.. Bạo click vào Droplet vừa rồi và copy lấy địa chỉ IP như hình dưới <br/><br/>
![](https://images.viblo.asia/10df5855-06eb-4232-b786-ebdbe39096cc.png)
Sau đó ở máy local, bật Terminal lên và đăng nhập bằng lệnh 
```
ssh root@dia_chi_ip_droplet
```
Sau đó nhập password bạn nhận được ở mail. Đổi pass mới là hoàn tất việc tạo mới và làm chủ một Droplet 
### Clone và chạy file docker-compose.yml 
Như đã nói, Droplet bạn vừa tạo đã được cài sẵn Docker và Git. Nên bạn không phải làm gì thêm, chỉ cần clone một Project có chứa `file doker-compose.yml` của bạn vào Droplet :
```
git clone repository_clone_url 
```
 `ls` để chắc rằng bạn đã clone thành công, và rồi chuyển vào Project folder. Tại đây, bạn chỉ cần chạy 
 ```
 docker-compose up -d 
 ```
 <br/>
 Nhìn chung, từ bây giờ bạn có thể tương tác với containers của bạn hệt như dưới local. Bạn có thể `exec` vào trong container để chạy seeder, install node module, clear cache...v..v. <br/>
 Như vậy là đã xong, webapp của bạn đã được deploy. Bây giờ bạn dán IP Droplet lên trình duyệt là đã thấy Webapp của bạn hoạt động ( Lưu ý cổng mà bạn đã expose trong file docker-compose.yml nhé ) Thường thì sẽ `expose cổng 80`. <br/>
 Nhìn chung, lần đầu đăng ký và tạo droplet nên hơi lòng vòng chút xíu. Nhưng kể từ lúc này về sau, bạn chỉ cần login vào droplet qua ssh là có thể mặc sức xài xể cái `web server` này của bạn y như dưới máy local =))

### Trỏ domain
Việc này khá đơn giản, bạn mua một domain và trỏ nó về IP của Droplet thôi (Cái IP mà bạn copy hồi nãy đó ). Việc trỏ domain này mất khoảng hai ngày mới có hiệu quả. Nên cần chút xíu kiên nhẫn... Ví dụ như nếu bạn mua domain của `Namecheap` chẳng hạn, thì bạn vào config lại DNS server như hình
![](https://images.viblo.asia/9d15ef7c-a11f-40e4-98ef-f7b053e6e0f3.png)
Như của mình chưa trỏ domain thì nó chỉ là một cái IP như thế này `128.199.229.75` bạn có thể copy và paste vào trình duyệt chạy thử xem nhá =))

### Kết luận
Việc sử dụng Docker thực sự là mang lại rất nhiều lợi ích, từ khâu phát triển sản phẩm đến Deploy. Thay vì nén source code vào một file zip rồi upload lên server, hay xài Filezilla rồi ngồi đợi hàng tiếng như cách làm với hosting thông thường. Bây giờ việc deloy trở nên hết sức gọn nhẻ chỉ với vài dòng lệnh trên terminal... Nếu kết hợp với github và autobuild của dockerhub nữa thì coding -> deploy tiện lợi vô cùng. Hy vọng bài viết của mình hữu ích cho ai đó. Mong nhận được sự đánh giá và góp ý của mọi người phía cuối bài viết ^^