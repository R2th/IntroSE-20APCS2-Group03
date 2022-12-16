Chẳng là ai là bug bounty hunter, pentester, researcher security cũng đã từng biết đến công cụ khai thác lỗ hổng XSS [XSSHunter](https://xsshunter.com/). Công cụ này giúp cho các bạn có thể test, khai thác các lỗ hổng XSS (nhưng chủ yếu là blind XSS), hoặc dùng để PoC cho các Triager của các Platform Bug bounty verify cho nó nhanh :joy: 

Tuy nhiên, @IAmMandatory đã thông báo rằng XSS Hunter sắp được shutdown :cry: 

![image.png](https://images.viblo.asia/515265f4-fbc4-4d0c-b63f-4451d0ff65da.png)

Tuy nhiên XSS Hunter là open source, nhanh trí deploy lên server của mình thôi, tự host cho nó đỡ phải dựa vào sống chết của người khác :rofl: 

# XSS Hunter là gì?
XSS Hunter cho phép bạn tìm thấy tất cả các loại lỗ hổng cross-site scripting (XSS) trên web, bao gồm cả Blind XSS thường bị bỏ qua (căn bản là mình có thấy đâu, phải chèn payload vào để lỡ đâu người khác truy cập và trigger XSS lên mới biết được). Dịch vụ này hoạt động bằng cách lưu  các payload XSS chuyên dụng, sử dụng JS để chụp màn hình, cookie, ... rồi gửi đến server của XSS Hunter. Từ đó chúng ta có thể thấy được ai đã trigger XSS, màn hình nào trigger XSS, ... (rồi còn chứng minh là pass qua CSP nữa). À có một cái tiện nữa là mỗi khi XSS Hunter nhận được dữ liệu, nó sẽ gửi email cho bạn, và từ đó bạn có thể vào kiểm tra ngay lập tức.




# Cài đặt XSS Hunter Express
Mặc dù hiện tại bạn vẫn có thể sử dụng XSS Hunter, tuy nhiên như đã thông báo thì sang năm nó sẽ được shutdown, bạn cần phải có server của riêng mình hoặc ai đó đứng ra host tiếp XSS Hunter để bạn dùng ké :D 

Tự host sẽ giúp chúng ta có thể tự lưu trữ mọi thứ, bạn có quyền kiểm soát tất cả đối với server đó. Ngoài ra, điều này đảm bảo rằng chỉ bạn mới có thể xem kết quả của mình. Bạn có thể nhận được thông báo nhanh hơn, email không bị vào thư mục spam nữa :joy:. Hoặc bạn có thể code thêm cái webhook để post dữ liệu lên các kênh chat như slack, discord, ... để nhận thông báo còn nhanh hơn nữa :laughing: 

Hiện tại XSS Hunter Express đang được open source trên Github  
https://github.com/mandatoryprogrammer/xsshunter-express (hơi ít star, mọi người vào star cho tác giả có thể cải thiện code, thêm tính năng mới nhiều hơn)

## Cài đặt DNS
Để sử dụng được XSS Hunter Express chúng ta cần phải có 1 tên miền, bạn có thể đăng ký vài tên miền miễn phí trên https://dot.tk, https://freenom.com. Ở đây mình sử dụng Cloudflare để cấu hình DNS

![image.png](https://images.viblo.asia/1012e6b1-d6eb-4369-a69a-61513ae66024.png)

Cấu hình DNS theo config như hình trên, sử dụng Type A để trỏ DNS về server mình sẽ host XSS Hunter Express. Phần name các bạn có thể để hoặc không, nếu để nó sẽ là subdomain (như hình trên domain sẽ thành **xss.example.com**), còn không có name nó sẽ thành domain root.

## Cấu hình XSS Hunter Express
Khi cài đặt xong DNS, chúng ta sẽ SSH lên VPS của mình, clone repo https://github.com/mandatoryprogrammer/xsshunter-express về rồi tiếp tục cấu hình.
```bash
git clone --depth 1 https://github.com/mandatoryprogrammer/xsshunter-express
cd xsshunter-express
```
À với 1 yêu cầu nữa, chúng ta sử dụng docker để deploy, vậy các bạn cần phải cài **docker** và **docker-compose** để có thể deploy nhé :D 

![image.png](https://images.viblo.asia/5639b1b3-1d99-4366-b46e-987bf39c25d6.png)

Sau khi thực hiện câu lệnh trên chúng ta sẽ có cấu trúc thư mục như này, thực hiện chỉnh sửa file **docker-compose.yml** để cấu hình cho XSS Hunter. Các bạn có thể sử dụng editor mà mình yêu thích, ở đây mình sử dụng vim :joy: 

![image.png](https://images.viblo.asia/e3a0b562-415e-44e0-8452-463ed0700e04.png)


Ở đây có một vài giá trị mà chúng ta cần thay đổi
- HOSTNAME: chỉnh sửa giá trị này theo domain của các bạn vừa đăng ký ở bước cài đặt DNS
- SSL_CONTACT_EMAIL: XSSHunter sẽ sử dụng LetsEncrypt để tạo chứng chỉ SSL để sử dụng. Nhập địa chỉ email sẽ được sử dụng cho chứng chỉ SSL này.

Phần SMTP sẽ sử dụng để gửi email thông báo nếu victim kích hoạt XSS 
- SMTP_USERNAME: Điền gmail của các bạn vào đây
- SMTP_PASSWORD: Password của gmail
- SMTP_FROM_EMAIL: Email của bạn
- SMTP_RECEIVER_EMAIL: Email mà bạn muốn gửi

Phần giá trị của Database các bạn có thể đổi hoặc không cũng được.

## Chạy thôi!
Sau khi cấu hình thành công, chúng ta chỉ cần làm một việc rất đơn giản, gõ cái lệnh bên dưới vào là xong
```bash
docker-compose up
```
Việc của các bạn bây giờ là ngồi chờ mà thôi, chờ cho docker làm việc của mình. Pull mấy cái image về rồi tự động setup, cài đặt letencrypt các thứ (rất là tiện). 

Setup xong xuôi nếu hiển thị lên màn hình như này là các bạn cài đặt thành công rồi đấy, còn nếu có bug thì comment xuống dưới bài viết này nhé, mình biết thì mình sẽ support :D

![image.png](https://images.viblo.asia/8547e77b-4f39-4428-a6c8-a65f1e0ec411.png)

Và hãy lưu lại cái password để truy cập vào admin control panel, không là lại đi tìm mệt người lắm :joy: 

Thử truy cập domain của mình xem

![image.png](https://images.viblo.asia/7fd15a9c-4400-4e8b-b0d8-7c89b42125b4.png)

Nó sẽ hiển thị cảnh báo như này, 1 vài dòng thông báo là mình đang sử dụng XSS Hunter với mục đích test xss + chơi bug bounty hunter cho vendor được biết :joy: 

Để vào được admin control panel thì các bạn truy cập https://xss.example.com/admin/ rồi nhập password vừa nãy lấy được ở terminal hiển thị ra. Chúng ta sẽ được một hệ thống trông như này

![image.png](https://images.viblo.asia/42364f04-5188-488d-a89f-a588f3591edc.png)

Có một vài payload XSS Hunter cho mình sẵn, các bạn có thể thử đối với website nào đó dính XSS thử xem

![image.png](https://images.viblo.asia/56f52df3-cd92-4e1c-afba-19edbd35ef09.png)

Trang nào trigger XSS thì XSS Hunter sẽ chụp ảnh màn hình trigger + các thông tin cần thiết gửi về hệ thống. Các bạn có thể chụp ảnh lại rồi gửi báo cáo cho các chương trình bug bounty là ngon rồi :joy: 

![image.png](https://images.viblo.asia/98e71c5a-4e40-4ebb-a895-dbe84ebd1536.png)

Có một vài tính năng khác nữa đang chờ bạn khám phá :dog: 

![image.png](https://images.viblo.asia/931a0fe7-75e6-421e-a79c-193796ecd010.png)

> Qua đây mình đã hướng dẫn các bạn deploy XSS Hunter Express để phòng hờ xsshunter.com tèo (mà cũng nên dùng hệ thống của mình cho nó an toàn và ổn định). Nếu có bất kỳ lỗi gì các bạn có thể comment bên dưới bài viết nhé. See you :blush: 
# Tham khảo
- https://github.com/mandatoryprogrammer/xsshunter-express
- https://blog.intigriti.com/2021/08/18/hacker-tools-xsshunter/