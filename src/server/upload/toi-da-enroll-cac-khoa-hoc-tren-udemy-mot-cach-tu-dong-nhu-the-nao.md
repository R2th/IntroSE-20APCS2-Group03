## 1. Giới thiệu
### 1.1 Udemy là gì ?
Chắc hẳn cái tên Udemy.com có vẻ như còn khá xa lạ đối với chúng ta nhưng đây lại là Website học trực tuyến có hơn 20 triệu người dùng trên toàn thế giới, và hiện tại Udemy được coi là nền tảng học trực tuyến lớn nhất thế giới với hơn 65.000 khóa học, thu hút trên 50 triệu lượt đăng ký. Khi đăng ký hoặc mua một khóa học thành công bạn sẽ được học khóa học đó trọn đời, học mọi lúc mọi nơi trên mọi thiết bị và hoàn toàn có thể trao đổi với giáo viên mà không cần phải đến lớp hay gặp mặt. Đặc biệt trên Udemy mình thấy hầu hết lĩnh vực nào cũng có cả như: Lập trình, kinh doanh, marketing, thiết kế đồ họa, nhiếp ảnh,…
### 1.2 Chúng ta sẽ enroll các khóa học một cách hoàn toàn tự động như thế nào ?
Ở đây mình sẽ dùng một repo trên github được một anh Ấn độ viết sẵn, các bạn có thể tham khảo [tại đây](https://github.com/aapatre/Automatic-Udemy-Course-Enroller-GET-PAID-UDEMY-COURSES-for-FREE), tiện tay +1 star cho ông ấy nhé.
## 2. Set up
### 2.1 Nguyên lý hoạt động
Muốn đăng ký thì phải có link.  Đầu tiên hệ thống sẽ crawl toàn bộ link(tất nhiên crawl theo từng pages nhá) các khóa học hiện đang free
trên site tutorialbar.com về, sau đó dùng [Selenium](https://www.selenium.dev/) để truy cập từng trang tự động sau đó enroll, sau khi hết 1 list link thì sẽ tự chuyển sang tab cart để check out cho chúng ta.
### 2.2 Cài đặt môi trường
Vì tác giả build bằng python 3.8 (nhưng mình test 3.6 vẫn thấy chạy ngon nên các bạn dùng version thấp thấp hơn tí vẫn ok nhé).Máy bạn nào chưa cài python thì có thể cài [tại đây](https://www.python.org/). <br><br>
Sau khi máy đã có python, ta tiến hành clone source code trên github về.  
```
git clone https://github.com/aapatre/Automatic-Udemy-Course-Enroller-GET-PAID-UDEMY-COURSES-for-FREE.git
cd Automatic-Udemy-Course-Enroller-GET-PAID-UDEMY-COURSES-for-FREE
```
Clone rồi thì install mấy cái thư viện về mới dùng được.
```
pip install -r requirements.txt
```
Các bạn chờ tí cho nó tải. Sau khi install xong, các bạn quan tâm cho mình các file như:![](https://images.viblo.asia/d5f7d7b4-d9c4-41b8-9749-d177c6db58be.PNG)

Thực ra nhớ tên trình duyệt là được, không cần quan tâm mấy kia lắm đâu.
<br>
Cài đặt các thứ xong cả rồi, giờ tận hưởng thành quả thôi chứ gì nữa.
### 2.3 Chạy chương trình
Các bạn mở terminal lên rồi chạy lệnh
```
python udemy_enroller.py --help
```
để biết thêm các option mà ta có thể dùng khi chạy chương trình nhé. <br><br>
Có 2 option mình nghĩ là nó hữu ích nhất:<br>
1. `--browser <tên browser>`: tham số quyết định xem trình duyệt nào sẽ được mở khi chạy chương trình. `<Tên browser>` có thể là edge, chrome, firefox, internet_explorer, ie, chromium, google-chrome, opera, ff (Firefox not lửa-mà-ai-cũng-biết-là-lửa-gì)
2. `--max-pages <MAX_PAGES>`: quyết định bao nhiêu trang sẽ được crawl.<br>

Ở đây mình sẽ dùng `--browser chrome`(Mê chrome đó giờ các ông ạ), các bạn mở terminal lên rồi chạy command
```
python udemy_enroller.py --browser chrome
```
Sau khi run thì nó sẽ yêu cầu các bạn nhập tài khoản udemy của mình vào(Ông nào sợ cứ việc tạo hẳn cái account mới rồi test cho an toàn, khỏi nghĩ ngợi, khỏe nữa).<br><br>
Phần zipcode thì ta pass và phần language bạn chọn ngôn ngữ bạn thích là được.<br><br>
Đến phần quan trọng nhất, ta phải list những course category mà ta muốn chọn cho hệ thống check để enroll hộ ta. Các bạn có thể tham khảo thêm các category [ở đây](https://www.tutorialbar.com/course-categories/).<br><br>
Option cuối cùng nhằm mục đích save lại config cho ta dùng về sau, bạn muốn thì gõ `Y` còn không thì pass bằng `N` cũng được.<br><br>
Để stop thì các bạn dùng tổ hợp `ctrl +c` nha.<br><br>
Nếu udemy buộc mình phải solve captcha thì bạn cứ bình tĩnh, xử lý cái captcha đấy là chạy tiếp được ngay ấy mà.
## 3. Kết
Mình cảm ơn các bạn đã đọc bài viết này, thật sự là lần đầu mình viết nên đọc sẽ có chút sượng ạ,
mong mọi người góp ý, đồng thời mọi người có thắc mắc gì thì cứ comment mình sẽ giải đáp hoặc tham khảo link này ạ:<br>
https://github.com/aapatre/Automatic-Udemy-Course-Enroller-GET-PAID-UDEMY-COURSES-for-FREE <br>
### Chúc các bạn thành công!