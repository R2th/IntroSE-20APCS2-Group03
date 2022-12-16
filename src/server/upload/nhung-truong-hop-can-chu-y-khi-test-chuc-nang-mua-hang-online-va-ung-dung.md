![](https://images.viblo.asia/39d8ccba-fdff-43a9-a230-834d9e544397.jpg)

Trong quá trình làm dự án hiện tại, tôi có chia sẻ hai bài viblo tới các bạn: Một là "Cách tạo Subscription trên Stripe", hai là "Những lưu ý khi test với bài toán có yêu cầu về thời gian".
Hôm nay tôi sẽ chia sẻ về nội dung, Những trường hợp cần chú ý khi test chức năng mua hàng Online và ứng dụng.

# 1. Quy trình mua hàng thông thường

Ngày nay việc mua hàng online đã rất phổ biến ở cả Việt Nam vì vậy mà nhu cầu tạo ra phần mềm có chức năng mua hàng online đã trở nên nhiều hơn bao giờ hết, là một QA (Tester) chắc hẳn các bạn trong chúng ta ai cũng từng test qua hệ thống như này nếu bạn làm việc cho ứng dụng Web và Mobile. 

Quy trình mua hàng thông thường được tóm tắt như sau:
1. Người dùng login vào hệ thống
2. Chọn mặt hàng mình muốn mua và add vào giỏ hàng của mình
3. Chọn số lượng muốn mua
4. Chọn gói khuyến mại
5. Chọn địa chỉ giao hàng
6. Nhập thông tin thẻ thanh toán
7. Tiến hành thanh toán
8. Đợi nhận hàng
9. Nhận hàng


# 2. Xác định đầu vào và đầu ra
Đầu vào (input) của chức năng mua hàng phải kể đến đó là: Mặt hàng cần mua, số lượng, phí ship, gói khuyến mại, thành tiền, địa chỉ giao hàng và thông tin tài khoản thanh toán.
Đầu ra (output) của chức năng mua hàng phải kể đến đó là: Thanh toán thành công hay thất bại (Số tiền đúng chưa? Địa chỉ đúng chưa?)

Quá trình xác định này được tóm tắt thông qua sơ đồ sau:

![](https://images.viblo.asia/0e43bb2b-8ebf-4fda-85b6-29225aade03f.png)




# 3. Các trường hợp cần chú ý khi test chức năng mua hàng online
1. Xác định xem trong giỏ hàng đã đúng mặt hàng cần mua chưa?
2. Xác định giá của mặt hàng đã đúng chưa (giá = số lượng * đơn giá)?
3. Đơn vị tiền tệ cần thanh toán là gì? VNĐ, USD, Yên...?
4. Xác định gói khuyến mại mà bạn chọn đã đúng chưa? Nếu gói khuyến mại quy ra tiền trừ vào mặt hàng thì xem tổng tiền đã đúng chưa?
5. Hãy xác định xem đơn hàng của bạn có mất phí ship không? Nếu mất phí ship thì hãy kiểm tra xem tổng tiền đã đúng chưa?
6. Xác định xem địa chỉ và thông tin người nhận (Tên, số điện thoại, địa chỉ đã đúng chưa)
7. Xác định xem thông tin số tài khoản thanh toán đã đúng chưa (Số tài khoản, loại thẻ, tên chủ thẻ...)
8. Sau khi thanh toán xong hãy xác định xem đơn hàng của bạn đã lưu vào danh sách mặt hàng đã đặt chưa và số tiền đã đúng chưa?
9. Thông tin đã lưu đúng trong database chưa: Mặt hàng đã mua, Tổng tiền, địa chỉ giao hàng
10. Xác định xem sau khi User mua hàng xong họ đã bị trừ đúng số tiền trong đơn hàng chưa?
11. Có bị duplicate số lượng mặt hàng không?
12. Nếu hệ thống có cài đặt cho phép sau 20 phút thì sẽ trừ tiền của User thì hãy xác định xem chức năng ON/ OFF đó đã đúng chưa?
- Nếu ON thì sau 20 phút tài khoản của user bị trừ tiền lúc đó hãy kiểm tra xem số tiền đó có bị duplicate không
- Nếu OFF thì hệ thống sẽ thực hiện thanh toán ngay sau khi User click nút [Payment] thì sẽ cần kiểm tra ngay số tiền trừ trong tài khoản của khách hàng đã đúng chưa bằng cách lên trang Admin của hệ thống để check.
13. Xác định xem thời điểm User thanh toán đã đúng chưa? Nếu bạn ở Việt Nam và test cho site Nhật, thông thường sẽ sử dụng bên thứ 3 để thanh toán mà mình được biết thì có Stripe, Google Play, LINE...thì khi đó hãy kiểm tra thời điểm thanh toán đã đúng thời điểm mà User click [Payment] chưa? 
- Nếu test cho site Nhật: Hãy kiểm tra sau 2 giờ user click nút [Payment] hệ thống có thanh toán thêm lần nữa không?
- Nếu hệ thống là maintain mà trước đó dùng cho nước sử dụng giờ UTC thì hãy kiểm tra sau 8 giờ User click nút [Payment] hệ thống có thanh toán thêm lần nữa không?

# 4. Ứng dụng thực tế vào viết testcase
Hệ thống của bạn cho phép người dùng mua mỹ phẩm, nếu trọng lượng mỹ phẩm là 0.5 kg thì sẽ mất phí ship 20k và 1kg phí ship là 30k...
User có thể dùng point đã tích của mình để mua hàng: 1 point = 1k.
Ban đầu User có 2000k point.
Hệ thống của bạn cho phép bạn sử dụng bên thanh toán thứ 3 là Stripe để test.
Hệ thống cho phép thanh toán luôn sau khi user click nút [Payment]

## 4.1. Chúng ta cần nên biết gì về thẻ thanh toán trên Stripe để test
Chúng ta hãy dùng số thẻ trên Stripe thông qua page sau:
https://stripe.com/docs/testing

Thẻ hợp lệ để thanh toán ví dụ là những thẻ sau:
1. Visa: 4242 4242 4242 4242
2. Mastercard: 5555555555554444
3. American Express: 378282246310005

# 4.2. Cách tạo testcase cho bài toán cụ thể bên trên

![](https://images.viblo.asia/86057150-ecba-4a1c-9536-a10ec7f9ff99.png)

# Kết luận

Trên đây là một vài trường hợp chú ý khi test chức năng thanh toán điều mà mình muốn nhấn mạnh ở đây là bạn hãy để ý đến tổng tiền thanh toán mà user phải trả đã đúng chưa? (Tổng tiền = số lượng * đơn giá - Ship fee (nếu có) - point khuyến mại). User có bị thanh toán hai lần hay không? User đã thanh toán đúng tổng tiền chưa? Sau 2 giờ sau khi thanh toán kiểm tra lại một lần nữa xem user có bị trừ tiền thêm lần nữa không? (Liên quan đến timezone Nhật).  Sau 8 giờ thanh toán user có bị trừ tiền thêm lần nữa không? (Liên quan đến Timezone UTC). Đó là bài toán chung cho chức năng mua hàng. Tùy vào ứng dụng của mình mà khách hàng yêu cầu bạn hãy áp dụng vào cho linh hoạt nhé! Xin cảm ơn đã đọc bài viết.