Hello các bạn,

Trong cuộc sống hằng ngày, chắc hẳng mọi người ai đó cũng đã từng ít nhất 1 vài lần mua sắm online. Và nhất lại là trong thời kì công nghệ 4.0 như hiện nay, việc mua bán hàng hoá online cũng đã trở thành 1 phần ko thể thiếu của cuộc sống. 

Nhưng....

Đã bao giờ các bạn tự hỏi? hệ thống thanh toán hoạt động ra sao? Tại sao bạn dùng thẻ / tài khoản của bank A mà lại thanh toán được ở bank B. Phải chăng chúng có 1 mối quan hệ gì với nhau ư?

Xin thưa là đúng như vậy!

Các bank sẽ có chiến lược và hoạt động riêng rẽ với nhau. Các hệ thống cũng vậy, chúng sẽ hoạt động 1 cách độc lập. Để các bank có thể liên hệ với nhau. Chúng sẽ cần có các tổ chức đứng ở giữa làm nhiệm vụ bắc cầu nói chuyện giữa ông bank A và ông bank B. 

Ví dụ như là: Để ô người Pháp có thể giao tiếp được với ô người Việt thì sẽ cần có 1 bạn vừa hiểu tiếng Việt và vừa hiểu tiếng Pháp để có thể phiên dịch và truyền tin. 

Ở việt nam, ngoài các bank thì có 1 số tổ chức lớn chuyên làm về chuyển mạch hoặc đứng giữa các bank để xử lý trong đó có thể kể tới: Napas, NganLuong, VNPay .....

![image.png](https://images.viblo.asia/ba2ecae2-cad9-4d1c-952e-edbd98b6f092.png)

Hệ thống thanh toán kết nối với nhau cũng chặt chẽ đó chứ nhỉ? 

Lấy thêm 1 ví dụ để mọi người cùng dễ hiểu hơn nhé.

Cuối tuần, bạn phụ bố mẹ đi siêu thị mua đồ. Tới khi mua cần thanh toán lại ko có tiền mặt mà bạn lại là người tiêu dùng thời kì số, móc ví, rút ngay thẻ TPBank ra để thanh toán. 

Nhân viên siêu thị rút 1 chiếc máy POS (máy quẹt thẻ) và thực hiện nhập số tiền cũng như tab thẻ của bạn vào tiến hành thanh toán.

Chiếc máy POS của Agribank hoặc Techcombank khi đó thực hiện send 1 lệnh về server (HOST) và Agribank hay Techcombank được gọi là Ngân Hàng Chấp Nhận Thanh Toán nhận được msg từ máy POS gửi lên lập tức send req sang tổ chức trung gian (NAPAS, VISA, MASTER....) (Với mỗi ngân hàng sẽ có mã số đầu BIN 6-8 số đầu trên thẻ để phân biệt các thẻ của các bank) sẽ routing về Ngân Hàng Phát Hành (Phân biệt qua 6-8 kí tự đầu số thẻ) 

Khi đó Ngân Hành Phát Hành sẽ thực hiện check choác trước khi trừ tiền của các bạn và báo thành công về máy POS.

Ấy chà!!! để có thể thanh toán được cũng trải qua khá nhiều bước nhỉ? Nhưng các bạn yên tâm nhé ví tốc độ xử lý nó khá là nhanh chỉ mất khoảng vài s là bạn đã có thể thanh toán và mua hàng online rồi.

Kết thúc bài 1 ở đây nhé. Buổi sau chúng ta sẽ đi chi tiết hơn các bạn nhé!