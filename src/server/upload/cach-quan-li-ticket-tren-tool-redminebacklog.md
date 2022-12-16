# Nội dung chính:
1. Môi trường test

2. Process khi nhận một task

3. Format viết Title của một task

4. Mô tả trong task cần những gì

5. Target của task

6. Impact range của task

7. Độ ưu tiên của task

8. Khi nào một task là CR


# Giới thiệu
Redmine/ Backlog là tool quản lý các ticket, document, tiến độ...của dự án.

![](https://images.viblo.asia/f075313b-a209-4bce-a429-d414e996e95a.png)

![](https://images.viblo.asia/a8d568da-075a-4d4d-a7bb-09ce1f4afe04.jpg)

# 1. Môi trường test

Môi trường test của dự án cần phải được xác định đầu tiên khi bắt đầu bắt tay vào làm và cần đặt các câu hỏi:

- Môi trường test là gì?

- Xác định hệ thống là Web PC hay Mobile/ Webview Mobile.

+ Nếu hệ thống là Web trên PC cần xác định test trên trình duyệt nào (Chrome/ Firefox), hệ điều hành là gì (Win 10, Win 7, Ubuntu), version là gì?

+ Nếu hệ thống là Mobile cần xác định: Device test là gì (IP, IPad, Samsung..), version yêu cầu là gì?

+ Nếu hệ thống là Webview Mobile cần xác định: Device test là gì (IP, IPad, Samsung..), version yêu cầu là gì? Test trên Safari hay Chrome...

# 2. Process khi nhận một task

![](https://images.viblo.asia/87f1abee-212e-4761-b3c6-a6543261e5e8.png)

# 3. Format viết title của một task


![](https://images.viblo.asia/3a951cba-d8d8-408d-bd8e-98b96b910e3b.png)

Ví dụ: [Front][RE-01][Registration]Đăng ký hội viên của hệ thống

## Phân tích: 

Khi nhìn vào title của task người đọc dễ dàng hình dung ra nơi task cần làm là ở đâu, tên màn hình của task là gì? Mã màn hình để thuận lợi cho việc quản lý đó là: Trên Front hệ thống người sử dụng, màn hình đăng ký thành viên, đăng ký một vài thông tin cho thành viên trước để có thể sử dụng được hệ thống.

Nhìn vào title này người đọc sẽ không thể nhầm lẫn sang site của Admin được và cũng không thể nhầm lẫn nó là màn hình Profile của member được, và tất nhiên nó không thể là màn hình dạng list được

# 4. Mô tả trong task cần những gì?

1. Mô tả ngắn gọn về task

2. Nếu không có flow di chuyển màn hình thì có thể đặt câu hỏi nhờ khách hàng cung cấp nếu không có thì cần confirm sau khi đăng ký xong thì đi đến đâu?

## 4.1. Mô tả ngắn gọn về task

Ex: Trong task này: [Registration]Đăng ký hội viên của hệ thống

- Các trường cần đăng ký cho member là gì?

- Có file validation: Format, Required, Optional, Min-Maxlength

- Sau khi đăng ký xong thì có những output gì? Có gửi mail không? Đối tượng hệ thống gửi mail là những ai?...

- Sau khi đăng ký xong thì member có cần phải thanh toán khoản nào không? Nếu có thanh toán cần làm rõ dùng phương thức nào thanh toán (Stripe/ …)

## 4.2. Flow di chuyển màn hình

Xác định fow di chuyển màn hình của task.

# 5. Loại task

Task

Research

CR


# 6. Status

Open

In-Progress

Resolved

Testing

Re-open

Close

# 7. Priority

Immediatly

High

Medium

Low

# 8. Impact Range

What is impact range?

+ Impact range là phạm vi ảnh hưởng, đối tượng xác định bao gồm cả Dev và test.
Dev/ Test: Xác định task ảnh hưởng đến chức năng nào ngoài phạm vi task mô tả. 
Test: Define testcase cho vùng ảnh hưởng liên quan.


Ví dụ: 
Màn hình đăng ký có chức năng thông tin của member khi đăng ký Country = Japan => State = Select box
Impact range: Cần phải test chức năng tương tự trên màn hình Profile.

# 9. Khi nào một task là CR và cách quản lý CR.
Các mô hình dự án ngày nay hầu như không còn theo mô hình thác nước mà hầu hết là theo "Agile". Vì thế chúng ta luôn luôn chào đón sự thay đổi trong spec. Mặc dù vậy nhưng không có nghĩa là cứ thay đổi là làm. Mọi thay đổi của khách hàng, hơn ai hết chính bản thân chúng ta cần chủ động trao đổi để làm rõ vấn đề, tạo sao lại có sự thay đổi như vậy?

Khi nào một task là CR:

* Đó là sự thay đổi function logic, UI (Text, thứ tự của từng item trong màn hình)...trong một task đã có.
* Thêm một item mới vào bên trong màn hình
* Thay đổi giá trị mặc định với từng loại: Textbox, Textarea, Selectbox, Radio button, Kiểu Boolean...
* Thay đổi logic trong cách tính toán của bài toán đặc thù trong dự án.

## Cách quản lý change request:
Về cách quản lý CR như nào cho hiệu quả để dự án chắc chắn thành công các bạn có thể tham khảo tại đây:

https://viblo.asia/p/6-dieu-rut-ra-khi-lam-viec-o-du-an-lon-bxjvZOBjGJZ

# 10. Process Close task

Một task có thể close được khi nào?
- Không có bug làm chết chức năng hiện tại
- 70% số testcase pass (phụ thuộc vào process của từng dự án)
- Chỉ còn bug UI nhỏ: Bug về sai text...

# Kết luận:
Trên đây là nội dung normal khi thực hiện làm một task. Tùy theo từng dự án mà sẽ có process khác nhau, tôi muốn nói nhưng gì chung và cơ bản nhất để các bạn dễ hình dung.