# 1. Mở đầu
Là 1 Backend Developer, trong quá trình làm việc và nghiên cứu, mình thường xuyên cần dùng đến các máy server. Đôi khi muốn thử nghiệm 1 cái gì đó mới hơn. Không phải cài gì cũng cài lên máy local hay server DEV của team. 
Chính vì vậy, mình thường xuyên tạo các máy ảo (VPS trên google cloud để học tập và nghiên cứu). 
Như mọi người đều biết thì hiện tại google cho [miễn phí](https://cloud.google.com/free/docs/gcp-free-tier/#free-trial) 300$ trong 90 ngày.

Có rất nhiều bài đã hướng dẫn tạo Google cloud miễn phí 
https://viblo.asia/p/install-java-library-to-local-machine-1Je5EAN45nL
https://viblo.asia/p/voc-vps-voi-300-mien-phi-tu-google-V3m5Wz1ylO7

Ban đầu mình cũng dùng như vậy, hết thì tạo 1 cái mới để dùng thử tiếp. 

-> Vấn đề: Khi tạo project mới thì sẽ mất các cài đặt của project cũ trước đó, ngoài ra, nếu bạn đã publish 1 số website cũng sẽ phải thao tác lại, khá mất công mỗi 90 ngày hoặc sau khi hết 300$.
# 2.Cách Thực Hiện
Để giải quyết vấn đề trên, mình tìm thấy 1 cách khá hữu ích để không phải cài đặt lại mỗi lần cần gia hạn.

## 2.1: Tạo tài khoản billing mới

Tạo tài khoản miễn phí mới như bình thường, sau đó add tài khoản cũ làm Billing Administrator. Khi đó tài khoản hiện tại sẽ có 2 billing account. 

![](https://images.viblo.asia/dc768f4f-2152-4f6e-9760-afa0949a4ff3.png)


## 2.2: Chuyển đổi giữa các cài khoản billing
Khi tài khoản gần hết tiền hoặc hết hạn. Chọn chuyển sang dùng billing account mới. 

![Screenshot from 2022-05-29 22-22-48.png](https://images.viblo.asia/6012325c-2a3d-4e39-8e62-9dec941d9172.png)

Tài khoản hết hạn khi hết thời gian (90 ngày ) hoặc hết số tiền đã cho (300$)
Cần lưu ý 2 khoảng thời gian này, nếu không project của bạn sẽ bị suspend tạm thời>
- Đặt lịch nhắc nhở thay đổi trước 90 ngày. 
- Tạo các billing alert trong billing của bạn, để nó gửi email về để chuyển đổi kịp thời.


# 3.Kết luận
Hướng dẫn của mình nhằm mục đình giúp việc sử dụng google miễn phí 1 cách hiệu quả hơn. 
Giúp cho việc học tập và nghiên cứu, còn nếu muốn dùng cho mục đích thương mại thì nên mua gói để dùng. Sẽ tránh được tình trạng bị ngắt quãng giữa chừng và hỗ trợ cho bên cung cấp dịch vụ nâng cao chất lượng sản phẩm.

Nếu cần trao đổi, mọi người hãy bình luận bên dưới. Cảm ơn vì đã đọc bài của mình.