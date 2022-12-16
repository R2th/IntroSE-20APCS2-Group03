![](https://images.viblo.asia/6e974056-28e8-498f-a345-8701b53e96fb.jpg)


Chào cả nhà, lại là mình đây! Hôm nay mình mang tới chủ đề mới đó là **subdomain takeover** hay nói cách đơn giản chiếm subdomain của  người khác. Lỗi này rất thú vị và khá đơn giản để tìm kiếm. Trước khi đi vào nội dung chính mình sẽ nói về tổng quan về lỗi subdomain takeover và tại sao nó lại xảy ra.

# Tổng quan subdomain takeover
Để hiểu được lỗi này trước tiên ta cần tìm hiểu quá trình phân giải tên miền. Qua trình phân giải tên miền được mô tả như hình dưới.

![](https://images.viblo.asia/a70bbbb4-ca1a-489c-8f50-a0882d53299f.png)

Hình trên rất tường minh và dễ hiểu nên mình sẽ không giải thích nhiều. Chỉ có một điểm lưu ý là khi **Client** truy cập vào domain **example.com** thì sẽ được máy chủ phân giải tên miền gửi lại địa chỉ **IP** để cho **client** truy vấn nội dung. Vì như ta đã biết các thiết bị mạng giao tiếp với nhau trên Internet thông qua địa chỉ IP, tên miền chỉ để cho con người dễ nhớ hơn mà thôi.

Tiếp đến ta sẽ tìm hiểu bản ghi **CNAME**. **CNAME** được sử dụng để trỏ tên miền này tới tiên miền khác (hay còn gọi là bí danh).

![](https://images.viblo.asia/1928ca95-0123-4670-8efa-6b9d19b931cc.png)

Như trên hình khi ta truy cập vào **sub.example.com** thì sẽ được máy chủ phân giải tên miền ra **anotherdomain.com**. Để rõ hơn ta sẽ nhìn vào hình dưới để thấy được quá trình phân giải tên miền khi sử dụng **CNAME**.

![](https://images.viblo.asia/6cd5d9fa-c680-4156-91d5-cc541bc61f48.png)

Đến đây ta đã hiểu về quá trình phân giải tên miền. Tiếp theo là vì sao mà lỗi này lại xảy ra.
## Khi nào bị subdomain takeover?
Kịch bản chung:
1. Tên miền sử bản ghi **DNS**: **CNAME** (hay gặp), **NS**, **A**, **MX**.
2. Hiện tại ta có thể đăng ký được domain **anotherdomain.com** hoặc địa chỉ **IP**.
3. Bản ghi **DNS** chưa bị xóa.

OK! Vậy là ta đã có cái nhìn tổng quan về lỗi subdomain takeover. Bây giờ mình sẽ demo thực tế nhẹ để xác nhận lại lý thuyết trên.

# Demo trường MIT
## MIT University
Mục tiêu lần này của mình là trường đại học MIT ([dành cho ai chưa biết MIT là gì](https://en.wikipedia.org/wiki/Massachusetts_Institute_of_Technology)).

![](https://images.viblo.asia/5e509182-5152-46e1-b92e-2c0adc921980.png)

Đây là trường đại học công nghệ hàng đầu thế giới (viện công nghệ Massachusetts).

## Tiến hành khai thác
Sau gần một tuần nghiên cứu mục tiêu và thu thập thông tin mình đã tìm ra một vài domain có thể bị lỗi **subdomain takevover**. Vì thời gian đợi kết quả lâu nên mình đã tự tạo một con bot để khi có kết qủa nó sẽ gửi về cho mình. Sau khi có kết quả mình đã ngay lập tức tiến hành khai thác (sợ để lâu c*\*t trâu hóa bùn).

**Lỗi lần này mình khai thác thông qua github page**

### 1. Kiểm tra lại kết quả
Đầu tiên mình vào lại domain bị lỗi để kiểm tra lại một lần nữa cho chắc ăn.

![](https://images.viblo.asia/bec10af6-7c77-468d-ad2a-4aa024f66c04.png)

Khi mình truy cập vào địa chỉ **wmoses.mit.edu** nhận được kết quả là 404 của github page. Lúc đó mình chỉ mong lần này sẽ thành công, vì trước đó mấy domain trước cũng như vậy mà đều không thành công.

### 2. Tạo repo github và cấu hình lại domain
Đầu tiên mình tạo một repo với tên bất kỳ. Trong demo mình tạo tên repo là **mitcm0s**.

![](https://images.viblo.asia/2dc9f881-40ce-4833-8050-9a309b2394cb.png)

Tiếp theo, mình sửa phần source **Page** trong phần **Setting** thành **main** sau đó lưu lại.

![](https://images.viblo.asia/7cca9c22-27a0-4866-a1bb-60f96656d070.png)

Sau khi lưu lại sẽ có phần **Custom domain** hiện ra. mình điền domain **wmoses.mit.edu** và chọn **save**. Nếu thành công sẽ có thông báo màu xanh hy vọng như hình dưới.

![](https://images.viblo.asia/80deadf7-26db-46a0-b6d5-a78d768f524a.png)

Sau đó mình tạo file **index.html** và điền nội dung bất kỳ. Và dưới là kết quả.

![](https://images.viblo.asia/46786f29-a62c-4332-9540-a1b27fdd47d1.png)

Vậy là bài mình đã kết thúc rồi. Xin chào vào hẹn gặp lại!