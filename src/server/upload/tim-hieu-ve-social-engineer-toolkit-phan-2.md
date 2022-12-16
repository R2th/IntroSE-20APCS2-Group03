# 1. Giới thiệu.
Tiếp tục với series SEToolkit, hôm nay mình sẽ giới thiệu với các bạn 1 kiểu tấn công khác cũng vô cùng phổ biến đó là giả mạo email. Trong bài viết này, mình sẽ hướng dẫn các bạn cách sử dụng SEToolkit để giả mạo và spam email, hay còn gọi là `Mass Mailer Attack`.

Ngoài ra, nếu các bạn chưa biết và có hứng thú với cách sử dụng SEToolkit để thực hiện tấn công phishing Facebook thì hãy tham khảo [phần 1](https://viblo.asia/p/tim-hieu-ve-social-engineer-toolkit-va-ky-thuat-phishing-facebook-1VgZvQJmKAw) trong series bài viết về SEToolkit của mình
## Mass Mailer Attack
Đúng như tên gọi của nó, Mass Mailer Attack cho phép chúng ta gửi những email lừa đảo tới một hoặc nhiều địa chỉ email. Mô-đun này cũng cho phép bạn chèn các liên kết hoặc tệp độc hại vào các email đã gửi.  Mass Mailer Attack còn được sử dụng để thực hiện các cuộc tấn công phá hoại bằng cách gửi 1 loạt các email spam khiến nạn nhân cảm thấy khó chịu và đôi khi lỡ mất các email quan trọng khác.
# 2. Khai thác.
Trước khi sử dụng tính năng trên, cần bật cấu hình `Sendmail=ON` trong file config. Truy cập vào `/etc/setoolkit/set.config` để chỉnh sửa:

![email7.png](https://images.viblo.asia/6f1709f5-43c9-4217-99ed-55b041d60114.png)

Khởi động Setoolkit, chọn 1: Social-Engineering Attacks

![1.png](https://images.viblo.asia/aed44aef-fff0-4a31-805e-e2bf7fd722b5.png)

Sau đó chọn 5: Mass Mailer Attack

![email1.png](https://images.viblo.asia/cf78a7d0-da3c-420f-9d92-80562de02a7d.png)

Chọn tuỳ chọn 2: E-Mail Attack Mass Mailer để thực hiện gửi email hàng loạt

![email2.png](https://images.viblo.asia/c82ed53b-40f6-4f17-a007-406cd77e91ff.png)

Điền đường dẫn chứa file chứa danh sách các địa chỉ email mà bạn muốn gửi. Ở đây mình đã tạo 1 file có tên là `email.txt` nằm ở Desktop với đường dẫn là : `/home/kali/Desktop/email.txt`.

![email5.png](https://images.viblo.asia/1171e898-93c3-4674-aebf-36d14b0e8714.png)

Sau đó thực hiện nhập đường dẫn email vào Setoolkit cùng với các  thông tin như hình dưới đây:

![email3.png](https://images.viblo.asia/8fed2e82-56fa-4187-b9f5-24a83274610e.png)

Đầu tiên ta có 2 tuỳ chọn: Sử dụng tài khoản gmail để gửi thư hoặc sử dụng server của bạn. Tại đây mình chọn sử dụng tài khoản Gmail để gửi thư. Bạn nên tạo một thư ẩn danh cho việc này. Để sử dụng gmail thành công để gửi email từ Setoolkit, bạn cần cho phép các ứng dụng kém an toàn hơn truy cập vào email của bạn. 

![email10.png](https://images.viblo.asia/1c696f56-d974-43f8-a238-ae44dfffc45b.png)

Đối với các tài khoản có xác thực hai yếu tố, bạn cần phải tắt nó để gửi thư từ các ứng dụng bên ngoài như setoolkit.
Tiếp theo bạn sẽ thực hiện có gửi đính kèm file hay không, ở đây mình chọn `no`. Điền tiêu đề email. Có 2 tuỳ chọn là gửi thư dưới dạng html hoặc plain. Ấn `h` để chọn html và `p` để chọn plain. Nhập phần thư để gửi, nhập `END` viết hoa để thể hiện việc kết thúc phần tin nhắn.
Công cụ sẽ tự động gửi thư vào các địa chỉ có trong file `email.txt`:

![email4.png](https://images.viblo.asia/ac9634c4-a7aa-4db9-b342-3b1d5da1af5f.png)

Kết quả:

![email9.png](https://images.viblo.asia/a961a2eb-320b-4e54-8862-6a1fdbfb14d8.png)

 Nội dung bên trong của thư:
 
![email6.png](https://images.viblo.asia/00431bd7-01c2-498f-8ba1-339ada0e5524.png)

Thực hiện khai thác đầy đủ bằng việc gửi file mã độc giả mạo: ` Update_Antivirus_BKAV.exe`.

Làm tương tự đến bước nhập thông tin cho email. Tại mục gửi kèm file bạn chọn `yes` là gửi kèm đường dẫn chứa mã độc. Thực hiện tạo file với tựa đề Chăm sóc khách hàng BKAV: 

![email11.png](https://images.viblo.asia/689e9a25-bf6b-4e12-9e1c-0aeca34eb787.png)

Nội dung email giả mạo như sau:
```
Xin chào bạn!
Tôi là Nguyễn Tử Quảng – CEO tập đoàn BKAV
Tôi gửi bạn phiên bản update của phần mềm BKAV_Antivirus. Bạn vui lòng tải và cài đặt để được update phiên bản mới nhất nhé!
Cảm ơn bạn!
```

Ở đây Google đã chặn việc đính kèm tệp exe nên mình sẽ gắn link rút gọn vào file để bypass qua google. Thực hiện đẩy file mã độc lên `Google Driver` và sử dụng `Bitly` để rút gọn link. 

![email12.png](https://images.viblo.asia/15e2216d-5c20-4d56-a0ca-a8dfddaa66ae.png)

Email cuối cùng nhận được sẽ có dạng:

![email13.png](https://images.viblo.asia/da941b3d-b242-4f36-b48c-43cce692ce8d.png)

Người dùng truy cập và không để ý kỹ sẽ nghĩ đây là 1 email thật và thực hiện tải và cài đặt file trên máy. Khi đó mã độc sẽ được thực thi và ta có thể chiếm được quyền điều khiển máy của nạn nhân.

# 3. Kết luận.
Vậy là chúng ta đã có thể thực hiện sử dụng công cụ Setoolkit để gửi email giả mạo và spam email làm sập hệ thống. Bài viết sau mình sẽ hướng dẫn sử dụng công cụ Setookit để tấn công tạo mã độc và chiếm quyền điều khiển.