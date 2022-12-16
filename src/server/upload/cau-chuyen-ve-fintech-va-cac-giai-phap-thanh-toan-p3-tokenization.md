Xin chào các bạn, lại là mềnh đây. 

- Không lan man nữa nhé, hôm nay mình sẽ giới thiệu cho các bạn 1 chủ đề mới. Có lẽ không quá xa lạ với các DEV làm trong lĩnh vực tài chính.
- Ten ten ten tèn: Đó chính là: **Tokenization** các bạn nhé. Vâỵ câu hỏi đặt ra?? **Tokenization** để làm gì?? và tại sao cần phải có **Tokenization**.

Có thể ví dụ nôm na như sau: Khi các bạn thực hiện các giao dịch online, giao dịch qua ví điện tử, các nhà cung cấp hoạt động tài chính hoặc các dịch vụ thanh toán kỹ thuật số. Mọi thông tin liên quan đến Card Number (số thẻ), Card  expiry (ngày hết hạn thẻ), CVV.... đều được mã hoá dưới 1 dạng data khác (để tránh bị lộ hoặc hacker trộm cắp thông tin) vì nó là những thông tin vô cùng nhạy cảm và quan trọng đối với mỗi các nhận hoặc tổ chức. 

Wow lý do trên đã khiến các bạn hiểu dõ hơn tại sao cần **tokenization** chưa nhỉ? -> rất đơn giản chỉ là để mã hoá dữ liệu thôi các bạn nhé!

Vậy còn cách thức hoạt động của chúng ra sao?

Đối với các message tài chính (các giao dịch tài chính). Việc đầu tiên khi chúng ta muốn thực hiện được chúng, muốn thực hiện được các giao dịch online (như thanh toán, nạp tiền, chuyển tiền) chúng ta cần trải qua các bước:

![](https://images.viblo.asia/76f1ea3a-b5b8-4865-ba15-e25461df474c.png)

### B1: Người dùng (Consumer) thực hiện đăng ký sử dụng dịch vụ (hoặc hiểu nôm na là liên kết thẻ).

- Consumer thực hiện điền thông tin cần thiết để đăng ký như: Card number ( số thẻ), Open date (Ngày phát hành) hoặc expiry date (ngày hết hạn).... Đó đều là những thông tin vô cùng quan trọng.
- Sau khi thực hiện điền các thông tin cần thiết, req trên (được gọi là Token Requestor) sẽ được send tới hệ thống (có thể là VisaNet, với thẻ VISA, hoặc hệ thống của MasterCard với thẻ MC). Toàn bộ các thông tin của Token Requestor được lưu trữ trong Token Vault của hệ thống. 
- Khi nhận được request, hệ thống sẽ thực hiện check các thông tin liên qua xem đã được liên kết trước đó chưa (xem đã tồn tại thông tin số thẻ trong hệ thống ko). Nếu đã tồn tài, hệ thống sẽ trả về thông tin liên quan như là: Số token, trạng thái token, ngày giờ hết hạn của token. Nếu thông tin về số thẻ trên không tồn tại trong hệ thống, hệ thống sẽ thực hiện tạo 1 request và gửi thông tin tới issuer bank (ngân hàng phát hành) để valid thông tin thẻ. Và khi đã nhận được response từ issuer bank là chính xác, hệ thống sẽ tự động tạo số token, trạng thái token (khi mới khởi tạo sẽ là chưa được active) ngày giờ hết hạn token.... và send ngược lại cho người tạo req trước đó.

Lưu ý: Tạo sao với số thẻ lại biết được đó là thẻ của ngân hàng nào? Bài sau mình sẽ tiết lộ nhé? Các bạn có thể tìm hiểu trước. Hehe :D :D 

### B2: Consumer thực hiện active token

- Sau khi nhận được thông tin liên quan về token, tiếp tục Consumer sẽ tạo request active token bằng cách gửi req và nhận OTP từ issuer bank. Khi đã đúng OTP, hệ thống Token Vault sẽ change trạng thái token sang active để Consumer có thể thực hiện giao dịch.
- -> Kết thực bước 1, Consumer đã có thể tạo được token (mã hoá của số thẻ PAN) để thực hiện các giao dịch mong muốn.

### B3: Thực hiện giao dịch

- Consumer thực hiện giao dịch thanh toán, tranfer (giao dịch online) tại app hoặc store.
![](https://images.viblo.asia/1675eefa-6f5e-42ce-ac2d-42d405c27729.png)

- Message thanh toán sẽ được merchant thực hiện send tới Accquirer bank (ngân hàng thanh toán) Ví dụ: Khi thanh toán tại BigC. các bạn dùng thẻ của TP Bank, quẹt POS thanh toán của BIDV thì ở đây, BIDV đóng vai trò là Accquirer bank, TP đóng vai trò Issuer bank. Accquirer bank thực hiện send message tới hệ thống Token Vault (tất nhiên trong request ở đây các thông tin như số thẻ, số CVV, open date hoặc expiry date đã được mã hoá). Token Vault thựuc hiện routing message, req này tới Issuer bank (và trong message từ hệ thống Token Vault gửi đi các message này đã được thay thế Token, CVV thành thông tin thực).
- Issuer thực hiện chuẩn chi giao dịch và trả response ngược lại cho Token Vault cũng như Token Vault trả ngược lại thông tin cho Accquiere bank và merchant cũng như khách hàng.
- Luồng giao dịch kết thúc.
 
-> Đó là những gì khi chúng ta thực hiên các giao dịch online, wow đi qua rẩt nhiều hệ thống và cần rất nhiều request các bạn ạ, còn việc token vault hoạt động như thế nào thì sao? Có ai đặt câu hỏi hem?

- Token vault có thể sử dụng các thuật toán mã hoá như: DES, 3DES, RSA... để thực hiện mã hoá data. Và tất nhiên, cần có key đã giải mã chúng nữa chứ? Vì vâky, khi muốn xây dựng 1 hệ thống Tokenization, bạn phải?
- Chuẩn bị key để có thể mã hoá và gỉai mã dữ liệu.
- Lựa chọn thuật toán cho phù hợp.
- Có thể tham khảo thêm 1 số tài liệu về: EMVCO (https://www.emvco.com/) hoặc PCI DSS (https://ecci.com.vn/pci-dss-la-gi-so-luoc-ve-pci-dss/)

Cảm ơn các bác đã đọc hết bài của em nhé? nếu các bác thấy hay đừng ngần ngại cho e 1 comment và 1 lượt follow nhé. Thanks các bác!!!