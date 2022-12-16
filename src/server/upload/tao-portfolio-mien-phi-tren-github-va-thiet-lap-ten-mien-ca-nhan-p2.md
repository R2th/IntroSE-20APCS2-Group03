# Giới thiệu
Ở [phần trước](https://viblo.asia/p/tao-portfolio-mien-phi-tren-github-va-thiet-lap-ten-mien-ca-nhan-p1-yMnKMB2QZ7P) thì mình đã hướng dẫn các bạn cách tạo 1 trang Portfolio bằng HTML, CSS và host miễn phí trên Github Pages. 
Ở bài này mình sẽ hướng dẫn các bạn trỏ **tên miền cá nhân** về cái địa chỉ `user_name.github.io` của các bạn. Để khi truy cập
chỉ cần gõ đúng custom domain của các bạn là sẽ vào được Portfolio, không cần phải `.github.io` chi cho dài dòng.

*Bài này yêu cầu các bạn có 1 tên miền riêng, trả phí hay miễn phí gì cũng được. Trong bài mình sẽ sử dụng tên miền miễn phí của [Freenom](http://www.freenom.com). Ông Freenom này xài rất đã, free cả năm luôn nhưng mà đăng kí hơi cực, bạn nào chưa biết cách tạo thì có thể tra Youtube và trong tương lai mình cũng sẽ cố gắng viết 1 bài hướng dẫn cách tạo tên miền free với Freenom. Ok, Let's go!!!*

# I. Thiết lập DNS Record
Trong bài này mình sẽ sử dụng tên miền của mình là `tommy-port.tk`
![Domain Appearance](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/domain-appearance.png?raw=true)

Đầu tiên là truy cập vào phần Quản lí DNS của tên miền của bạn 
![DNS Management](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/dns-management.png?raw=true)

Bây giờ ta tiến hành tạo 4 `A record`  trỏ về 4 địa chỉ IP của Github Pages Server sau đây:

185.199.108.153 <br>
185.199.109.153 <br>
185.199.110.153 <br>
185.199.111.153 <br>

Và nó sẽ trông như sau:
![Create 4 DNS Records](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/dns-records.png?raw=true)
Bên cạnh đó là tạo thêm 1 cái `CNAME Record` với subdomain là WWW. và trỏ về tên miền **username.github.io của bạn** (cái có viền màu xanh, và nhớ là CNAME Record nhé).

Lí do của việc thiết lập thêm cái này để hỗ trợ việc khi bạn gõ thêm `www.` vào trước tên miền của mình thì nó vẫn trỏ về đúng cái domain của bạn (Ví dụ như `www.hellobaby.com` và `hellobaby.com` đều trỏ về đúng Portfolio của bạn hay nói cách khác là 1 địa chỉ IP).

Vậy là thiết lập các DNS Record đã xong. Bây giờ sang Github để thiết lập tên miền cái nữa là ổn.

# II. Cài đặt tên miền cho Github Pages

Các bạn vào lại phần Setting và Pages
![Pages page](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/setting-page-again.png?raw=true)

Đây là màn hình Pages quen thuộc.
![Set Up Domain](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/domains-checking.png?raw=true)

Ở phần **Custom domain** các bạn sẽ nhập tên miền của các bạn vào và nhớ là **phải có `www`** nha. Sau đó nhấn Save.
Khi set thêm `www`, thì cái hay ở chỗ khi bạn gõ trên thanh tìm kiếm domain của bạn (tức là không có `www`), thì khi chạy về Github Pages, nó sẽ tự
thêm `www` vào trước luôn cho hợp lẽ phải. Vì thế nên bây giờ bạn có gõ `www` hay không có đều được. Bạn thử set không có `www` và cho chạy thử thì sẽ thấy là
tên miền `www.domain_cua_ban` nó sẽ không trỏ về được Portfolio của bạn đâu. 

Sau khi cài đặt tên miền ở đây xong, đợi tí Github nó kiểm tra một chút.

![Set Up Domain](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/domain-result.png?raw=true)
Sau khi check xong ta sẽ thấy như này. Bây giờ các bạn thử gõ địa chỉ domain của bạn lên và check luôn cả có/không có subdomain `www` để cho chắc nha.

Đây là [tài liệu tham khảo](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) về việc thiết lập domain đối với Github Pages, của Github cả thôi. Chúc các bạn may mắn, luôn học hỏi và nâng cao kiến thức bản thân. 
Thank you for reading!