Việc đăng ký dịch vụ Free Tier AWS của Amazon 1 năm mà không cần ra ngân hàng ? Bằng cách nào thực hiện được điều đó ?

Trước tiên chúng ta cần tìm hiểu AWS (Amazon Web Services) là sản phẩm của Amazon chuyên cung cấp các giải pháp về Cloud. Trước đây có nhiều cách đăng ký Acc AWS để sử dụng miễn phí 1 năm VPS, nhưng tất cả đều đã Fix. Như mình thì lười làm thủ tục với ngân hàng này nọ và việc này hơi khó cho 1 số bạn không có thẻ tín dụng. Tuy nhiên, mình sẽ hướng dẫn bạn đăng ký VPS Free AWS 1 năm bằng thẻ mastercard của viettelPay.

Đầu tiên các bạn đăng ký tài khoản AWS. Sau đó bạn nhận được mail như thế này:

![](https://images.viblo.asia/baf298a5-9c34-4336-b4ec-cea81d13c258.png)


Tài khoản AWS bao gồm 12 tháng sử dụng bậc miễn phí trong việc sử dụng Amazon EC2, Amazon S3 và Amazon DynamoDB.

# Đăng kí tài khoản viettelPay và tạo mastercard ảo
## Thẻ Mastercard ViettelPay là gì?
Trước khi bắt đầu chúng ta cùng tìm hiểu xem thẻ Mastercard của ViettelPay là gì ?
> Là thẻ trả trước quốc tế phi vật lý đồng thương hiệu do Viettel hợp tác với Ngân hàng TMCP Quân đội (MB) phát hành cho các khách hàng ViettelPay. Gồm có 2 loại:
> - Thẻ trả trước vô danh: là thẻ không có các thông tin định danh chủ thẻ trên hệ thống ViettelPay/MB. Số dư trên một thẻ trả trước vô danh tại mọi thời điểm không được quá 05 (năm) triệu đồng Việt Nam và chỉ sử dụng thẻ để thanh toán tiền hàng hóa, dịch vụ, không được phép chuyển khoản hay rút tiền mặt.
> - Thẻ trả trước định danh: là thẻ có các thông tin định danh chủ thẻ trên hệ thống ViettelPay/MB, cho phép Chủ thẻ thực hiện giao dịch thẻ trong phạm vi giá trị tiền được nạp vào thẻ tương ứng với số tiền mà chủ thẻ đã trả trước cho tổ chức phát hành thẻ.
> - Khi Chủ thẻ thực hiện thủ tục định danh thì thẻ vô danh được chuyển sang trạng thái thẻ định danh.
## Thẻ có gì đặc biệt
> Mở thẻ ONLINE ngay trên điện thoại
> 
> KHÔNG CẦN chứng minh tài chính hay các điều kiện đi kèm
> 
> KHÔNG MẤT phí duy trì
> 
> KHÔNG MẤT thời gian chờ tạo thẻ - Nhận ngay thẻ sau khi đăng ký

## Thẻ này có thể dùng làm gì?
> - Thanh toán toàn cầu: có thể sử dụng để thanh toán hàng hóa, dịch vụ trong ứng dụng hay thanh toán trực tuyến tại bất kỳ điểm chấp nhận thẻ MasterCard nào
> - Có thể thực hiện thanh toán trên các ứng dụng website, mobile app một cách nhanh chóng.
> - Đối với thẻ vô danh không được dùng để rút tiền hay chuyển khoản (chỉ sử dụng thẻ để thanh toán tiền hàng hóa, dịch vụ).
## Làm thế nào để có thể mở thẻ “Mastercard ViettelPay”?
###  Mở ứng dụng ViettelPay, mục Cá Nhân ở góc phải màn hình

![](https://images.viblo.asia/c9bbfdb8-93d1-4b44-84c9-95ded73f4f88.jpg)

### Chọn “Thẻ” sau đó chọn “Thẻ Mastercard ViettelPay”

![](https://images.viblo.asia/0e1ea182-3bda-4b7d-90dc-69b33ef446ac.jpg)

###  Chọn đăng ký (phí đăng ký 22.000VNĐ) rồi nhập mật khẩu tài khoản ViettelPay.

Sau đó sẽ có tin nhắn xác nhận từ ViettelPay là bạn đã đăng ký thành công và có thể bắt đầu sử dụng thẻ!
![](https://images.viblo.asia/6e66de57-c09d-44f0-bb9d-371efa51b25a.jpg)

Mở khóa hiển thị các thông tin của thẻ.
# Liên kết thẻ với AWS
Truy cập https://console.aws.amazon.com/billing/home#/paymentmethods để thêm tài khoản mastercard của bạn
Bạn nên nhớ nạp khoảng trên 1$ (tầm khoảng 50k gì đó) cho tài khoản mastercard ViettelPay của bạn để  AWS sẽ trừ 1$ xác nhận.
> Verify your credit card information is correct. Also, check your credit card activity to see if there’s a $1 authorization (this is not a charge). You may need to contact your card issuer to approve the authorization.


Bạn ghi đầy đủ thông tin thẻ ảo, sau khi billing xong chúng ta thử chọn EC2 để tạo VPS

![](https://images.viblo.asia/ec87a6d2-e6b0-43a9-86bc-5f3efd78e900.png)

Kết quả:

![](https://images.viblo.asia/b56ba450-6716-4f71-a07c-044cf25f601b.png)

Bạn kiên nhẫn chờ đợt khoảng tầm 1 tiếng sẽ có thông báo gửi mail để kích hoạt dịch vụ. Bạn bây giờ có thể sử dụng 1 năm miễn phí để xài AWS rồi

![](https://images.viblo.asia/0b0f3df3-a051-4af3-a3ed-28ea01c7944e.png)

# Vậy chúng ta dùng viettelPay làm với google cloud, azure thì sao ?
Câu trả lời đáng tiếc là không được vì đây là thẻ mastercard ảo nên Google, Microsoft không chấp nhận chúng.

Đây là thẻ ảo, cũng có thể được gọi là Prepaid MasterCard. Thẻ này Azure, Gcloud từ chối liên kết, nếu bạn muốn liên kết thẻ của bạn với 2 dịch vụ trên thì nên ra ngân hàng làm thẻ debit Card thanh toán quốc tế

# References
https://viettelpay.vn/about_newsdetail13.html