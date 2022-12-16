Lỗ hổng bảo mật XSS và Brute-force ở trang Sendo.vn
---------------------------------------------------

Chào mọi người. Do mấy ngày rảnh rỗi không có gì làm ( Vì hè rồi mà, nên học và làm cũng nhàn rỗi hơn :))) thì mình có lướt mấy trang mua hàng online. Sau đó vô tình vào trang Sendo.vn ( Ở Việt Nam thì có nhiều trang to lắm nhưng mình nhớ cái quảng cáo của Sendo về chị Đại :v ) . Lướt lướt một lúc thì lại nổi hứng tìm lỗi bảo mật.

1\. Về lỗ hổng bảo mật XSS ở trang Sendo.vn
-------------------------------------------

Thế là mình lại bắt đầu tìm. Trước hết thì mình có đăng kí một tài khoản ở Sendo.vn, vì lười nên là mình login bằng Google luôn :))) Chuyện không có gì cho đến khi mình bắt đầu nhìn thấy ô input trong phần "Địa chỉ nhận hàng".

Mình bắt đầu nghĩ đến việc sẽ test lỗi XSS ở đây, và cứ thế, nghĩ cái là thử luôn. Địa chỉ nhận hàng của mình bắt đầu được đổi thành :

-   Họ và tên : < img src=a onerror=alert(1);>
-   Địa chỉ : < img src=a onerror=alert(1);>

![](https://anonymousvn.org/wp-content/uploads/2018/05/hack-sendo-part-1.jpg)
 
Sau khi mình bấm "**LƯU THÔNG TIN" ** thì ....:

![](https://anonymousvn.org/wp-content/uploads/2018/05/hack-sendo.jpg)

Như vậy là XONG, từ đây bạn có thể tư duy rằng bạn có thể đổi alert(1) thành bất cứ đoạn mã nào bạn thích, thậm chí là đoạn mã để lưu cookie vào 1 file log ở server khác mà nạn nhân không hề hay biết.

Điều đáng nói ở đây là lỗi XSS này ở phần **địa chỉ nhận hàng **và bạn cũng có thể dễ dàng nhận ra rằng, bất cứ ai muốn giao hàng thì đều phải biết địa chỉ nhận hàng của bạn. Khi nhân viên ở Sendo.vn xem địa chỉ nhận hàng của bạn, vô tình đoạn mã trên kia sẽ chạy và cookie của nhân viên sẽ bay đi phương trời nào mà không ai hay.

Đó là lỗi đầu tiên mà mình muốn nói tới. Tuy nhiên thì Sendo.vn còn một lỗi khá nghiêm trọng khác mà mình cũng vô tình phát hiện ra. Đó là Brute-Force, còn brute-force cái gì và như thế nào thì mời bạn vui lòng đọc tiếp.

2\. Về lỗ hổng cho phép Brute-force ở Sendo.vn
----------------------------------------------

Lỗ hổng này thì cũng như trên, cũng là mình vô tình tìm ra mà thôi :))

Việc phải xác nhận số điện thoại ở một trang TMĐT để người ta có thể gọi điện cho bạn trở thành điều gì đó quá đỗi hiển nhiên rồi, và với mình cũng vậy. Cùng đi tới trang xác nhận số điện thoại nào.

![](https://anonymousvn.org/wp-content/uploads/2018/05/hack-sendo-part-1-2-1.jpg)

Ở đây mình chọn cập nhật số điện thoại và nhập số 0923****** rồi bấm tiếp tục

Tiếp sau đó mình mở Burp Suite cho trình duyệt chạy qua proxy của Burp suite tại 127.0.0.1 port 8080 như hình dưới :

![](https://anonymousvn.org/wp-content/uploads/2018/05/Screenshot-from-2018-05-28-12-47-57.png)

Bây giờ mình quay lại Tab proxy của Burp và chắc chắn rằng** Intercept is** on, nhập đại mã **123456** rồi mình bấm nút **Xác nhận**

![](https://anonymousvn.org/wp-content/uploads/2018/05/xac-nhan-so-dien-thoai-sendo-.jpg)

Lúc này mở lại Burp suite thì bắt được 1 request như thế này, các bạn hãy để ý ở dòng cuối cùng chính là thông tin được gửi đi và **otpCode=123456 **chính lã mã OTP mình nhập vào.

![](https://anonymousvn.org/wp-content/uploads/2018/05/Screenshot-from-2018-05-28-13-21-27.png)

Lúc này thì mình sẽ tiến hành Brute-force thử phần **optCode **này để xem mình đỏ đến đâu :)))

Để brute-force được thì bạn bấm **Action** rồi chọn **Send To Intruder **. Bạn chọn số **123456 **vừa rồi làm Payload, sang tab Payloads rồi set thông số như hinh sau để bắt đầu Brute-force:

![Burp suite brute force otp sendo](https://anonymousvn.org/wp-content/uploads/2018/05/Screenshot-from-2018-05-28-12-58-02.png)

Burp suite brute force otp sendo

Các bạn set là :

-   Payloads type: Numbers
-   From : 1000
-   To : 9999
-   Step: 1

Sở dĩ mình chọn from 1000 to 9999 là vì mình thấy mã của Sendo gửi về có 4 chữ số. Thế rồi bấm **Start Attack** và ngồi đợi thôi.

Để máy đó cho nó chạy, lúc sau mình quay lại thấy kết quả như sau :

![](https://anonymousvn.org/wp-content/uploads/2018/05/Screenshot-from-2018-05-28-13-02-19.png)

![](https://anonymousvn.org/wp-content/uploads/2018/05/Screenshot-from-2018-05-28-13-02-21.png)

![](https://anonymousvn.org/wp-content/uploads/2018/05/Screenshot-from-2018-05-28-13-02-22.png)

Các bạn có thể thấy khi mình dò đến **6537** thì vẫn báo mã xác thực không hợp lệ, tuy nhiên khi sang **6538** thì trả về **Status : 200 **và khi sang tới 6538 thì có thông báo "**Tài khoản đã xác thực số điện thoại**". Như vậy có thể tạm chắc chắn rằng mã **6538 **là đúng. giờ mình quay trở lại để xem thông tin tài khoản thì ....


Vậy đó :))) Thế là mình đã xác thực số điện thoại tại Sendo.vn xong rồi :v Đợi hơi lâu tí cơ mà cũng chả sao, dù sao mình vẫn xác nhận thành công rồi cơ mà. Bug thì vẫn luôn là bug. Do đó mình đã báo lại bên Sendo về các lỗi này với timeline như dưới.

Timeline:
---------

### 15/6/2018: Gửi báo cáo về 2 lỗ hổng bảo mật cho Sendo.vn

### 18/6/2018: Nhận được phản hồi của Sendo.vn về 2 lỗ hổng bảo mật, đại diện Sendo.vn xác nhận sẽ khắc phục sớm nhất có thể.

### 19/6/2018: Sendo xác nhận fix lỗi. Đại diện Sendo đề nghị một khoản tiền.

### 25/6/2018: Trao đổi thêm một số vấn đề. 

### Updating....
Nguồn : https://anonymousvn.org/toi-da-hack-trang-sendo-vn-nhu-the-nao.hav