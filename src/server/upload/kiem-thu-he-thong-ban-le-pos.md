Nguồn dịch: https://www.guru99.com/testing-for-retail-pos-point-of-sale-system.html

### 1. Thế nào là kiểm thử POS

- Để hiểu thế nào là kiểm thử POS ta cần biết được POS là gì. Theo wikipedia định nghĩa thì:
> POS viết tắt của Point of Sale (hoặc point of service). Nó sử dụng cho các shop bán lẻ (retail shop), tại quầy thanh toán tiền (check out counter) trong shop, hay là một vị trí có thể thay đổi được khi mà giao dịch xuất hiện trong loại của môi trường kiểu này. Thêm nữa, point of sale thỉnh thoảng đáp ứng giống như một hệ thống tính tiền (electronic cash register system). PoS được sử dụng trong các nhà hàng ăn uống, khách sạn, sân vận động, casino, nói chung nó thích hợp cho môi trường bán lẻ- tóm lại, nó là thứ phục vụ cho việc bán hàng, một điểm bán hàng trong một hệ thống bán hàng (point of sale system)
> 
- Kiểm thử POS là kiểm thử ứng dụng điểm bán hàng. Phần mềm POS là một giải pháp quan trọng cho các doanh nghiệp bán lẻ các cửa hàng để thực hiện các giao dịch bán lẻ dễ dàng từ mọi nơi. 

Hệ thống phức tạp hơn bạn nghĩ và được tích hợp chặt chẽ với các hệ thống phần mềm khác như Kho, Hàng tồn kho, đơn đặt hàng, chuỗi cung ứng, tiếp thị, lập kế hoạch hàng hóa, v.v. POS Domain Knowledge rất quan trọng để kiểm thử.
![](https://images.viblo.asia/6993cb14-1fec-44f4-ae35-769f453faa12.jpg)

### 2. Kiểm thử kiến trúc ứng dụng POS

Kiến trúc POS bao gồm ba thành phần để kiểm thử - thiết bị đầu cuối POS, máy chủ lưu trữ và máy chủ doanh nghiệp. Về cơ bản, nó được phân thành ba cấp độ để kiểm thử ứng dụng POS.
![](https://images.viblo.asia/1a5097a0-9c7c-439e-9ec3-8124b794322f.png)


| Level 1- (POS Terminal ) | Level 2- (Store Server) | Level 3- (Enterprise Server) |
| -------- | -------- | -------- |
| - Kiểm tra thiết bị và phần cứng (RIFD, Máy quét, Máy in, Đầu đọc mã vạch) <br> - Kiểm tra khả năng tương tác<br>- Kiểm tra BI (Business Intelligence) và phân tích<br>- Kiểm tra năng suất|- Kiểm thử bảo mật<br>- Kiểm tra BI và phân tích<br> - Kiểm tra khắc phục thảm họa<br>- Kiểm tra giao diện    |- Kiểm thử bảo mật<br>-Kiểm tra BI và phân tích<br> - Kiểm tra khắc phục thảm họa<br>- Kiểm tra giao diện     |

### 3. Các loại kiểm thử cho hệ thống POS

Kiểm thử hệ thống POS có thể được chia thành hai cấp độ
- Application Level (Cấp độ ứng dụng)
- Enterprise Level (Cấp độ doanh nghiệp)
![](https://images.viblo.asia/412ac6d8-75e2-493d-8b55-cfd58e9f01a5.png)


| Kiểm thử hiệu năng cấp độ ứng dụng | Kiểm thử hiệu năng cấp độ doanh nghiệp |
| -------- | -------- | 
|- Kiểm tra chức năng Kiểm tra tương thích.<br> - Kiểm tra cổng thanh toán.<br> -  Kiểm tra báo cáo     |- Kiểm tra tuân thủ.<br> - Kiểm tra năng suất.<br> - Kiểm tra khả năng tương tác. <br>- Di chuyển dữ liệu.<br> - Vận động     | 


### 4. Các trường hợp kiểm thử mẫu được sử dụng trong POS 

Để đảm bảo chất lượng của hệ thống POS, việc kiểm thử phần mềm POS thích hợp là bắt buộc. Việc kiểm thử POS kéo dài nhiều thứ như


| Kịch bản kiểm thử | Test case | 
| -------- | -------- | 
| Cashier activity (hoạt động thu ngân)|- Kiểm tra mục nhập của các mặt hàng được mua bởi một khách hàng là chính xác<br>- Kiểm thử mục giảm giá được áp dụng chính xác<br>- Xác minh thẻ giá trị cửa hàng có thể được sử dụng<br>- Kiểm tra quản lý tiền chi tiết làm việc như mong đợi<br>- Kiểm tra tổng số và kết thúc khớp nhau<br>- Kiểm tra khoản vay ngăn kéo tiền mặt được xử lý đúng cách<br>- Kiểm tra hệ thống POS có tương thích với các thiết bị ngoại vi như Đầu đọc thẻ RFID, Máy quét mã vạch, v.v.     |
|Payment Gateway Processing (Xử lý cổng thanh toán)|- Kiểm tra tính hợp lệ của số CVV của thẻ tín dụng <br>- Kiểm tra quẹt thẻ từ cả hai bên và chip<br>- Xác minh rằng các chi tiết thẻ bị bắt được mã hóa và giải mã chính xác|
|Sales(Bán hàng)|- Kiểm tra quy trình bán hàng thường xuyên<br> - Kiểm tra doanh số có thể được xử lý bằng thẻ ghi nợ / thẻ tín dụng<br>- Kiểm tra thẻ khách hàng thân thiết <br>- Kiểm tra giá chính xác được hiển thị cho hàng hóa mua<br>- Kiểm tra giao dịch "0" hoặc null<br>- Buộc UPC hoặc mã vạch cho các nhà cung cấp<br>- Kiểm tra chi tiết thanh toán hoặc chi tiết giao hàng trong trình quản lý thanh toán<br>- Kiểm tra giao dịch tham chiếu<br>- Kiểm tra định dạng in của hóa đơn được tạo<br>- Xác minh rằng mã chính xác được tạo cho các giao dịch được chấp thuận, giữ hoặc từ chối|
|Return & Exchange scenarios (Kịch bản trao đổi và hoàn trả)|- Đảm bảo hàng tồn kho trong cửa hàng được tích hợp tốt với các cửa hàng hoặc chuỗi cung ứng khác<br>- Kiểm tra trao đổi hàng hóa hoặc trả lại một mặt hàng bằng tiền mặt<br>- Kiểm tra xem hệ thống có phản hồi khi trao đổi hoặc trả lại một mặt hàng bằng thẻ tín dụng không<br> - Kiểm tra hệ thống xử lý việc bán hàng có hóa đơn hoặc không có hóa đơn<br>- Xác minh rằng hệ thống sẽ cho phép nhập mã vạch theo cách thủ công, máy quét không hoạt động<br> - Xác minh hệ thống hiển thị cả số tiền hiện tại cũng như số tiền chiết khấu trên một trao sản phẩm nếu có|
|Performance (Hiệu năng)|- Kiểm tra tốc độ hoặc thời gian thực hiện để nhận được phản hồi hoặc gửi yêu cầu<br>- Kiểm tra các quy tắc dựa trên giao dịch được áp dụng (giảm giá / thuế / giảm giá, v.v.)<br>- Xác minh rằng mã chính xác được tạo cho các giao dịch được chấp thuận, giữ hoặc từ chối giao dịch |
|Negative Scenarios (Kịch bản tiêu cực)|- Hệ thống kiểm tra với chi tiết thẻ hết hạn<br>- Kiểm tra mã PIN không hợp lệ cho thẻ tín dụng<br>- Kiểm tra hàng tồn kho bằng cách nhập sai mã cho mặt hàng<br>- Kiểm tra cách hệ thống phản hồi trong khi nhập sai số hóa đơn<br>- Kiểm tra giao dịch tiêu cực<br>- Kiểm tra phản hồi của hệ thống trong khi nhập ngày không hợp lệ cho các mặt hàng khuyến mại|
|Managing Promotions and Discounts(Quản lý chương trình khuyến mãi và giảm giá)|- Hệ thống kiểm tra giảm giá khác nhau như giảm giá kỳ cựu, giảm giá theo mùa, giảm giá hành lý  vv<br> - Hệ thống kiểm thử cho các khuyến mại khác nhau trên các chi tiết đơn hàng nhất định<br>- Kiểm tra hệ thống cảnh báo thông báo kết thúc hoặc bắt đầu khuyến mãi theo mùa<br>- Kiểm tra xem biên lai có in giảm giá chính xác hoặc ưu đãi được tận dụng không<br>- Kiểm thử hệ thống có cung cấp ưu đãi sai hay giảm giá mặt hàng trực tuyến hay không?<br>- Kiểm tra quy trình quản lý đơn hàng<br>- Xác minh dữ liệu sản phẩm thu được sau khi quét mã vạch là chính xác|
|Tracking customer's data(Theo dõi dữ liệu khách hàng)|- Kiểm tra phản hồi của hệ thống với dữ liệu khách hàng nhập sai<br>- KIểm tra xem hệ thống có cho phép truy cập được ủy quyền vào dữ liệu bí mật của khách hàng không?<br>- Kiểm tra cơ sở dữ liệu để ghi lại lịch sử mua của khách hàng như (sản phẩm mua, tần suất mua, v.v.)|
|Security & Regulatory Compliance (Tuân thủ an ninh & quy định)|- Xác minh hệ thống POS theo quy định tuân thủ quy định<br>- Kiểm tra hệ thống cảnh báo thông báo cho bảo vệ<br>- Hãy chắc chắn rằng bạn có thể làm mất hiệu lực thanh toán trước khi rời quầy thanh toán<br>- Kiểm tra hồ sơ người dùng và cấp độ truy cập trên Phần mềm POS<br>- Kiểm tra tính nhất quán của cơ sở dữ liệu<br>- Xác minh thông tin cụ thể về từng loại tiền, số nhận dạng phiếu giảm giá, số kiểm tra, v.v.|
|Report testing (Kiểm thử báo cáo)|- Kiểm tra báo cáo phân tích xu hướng<br>- Thông tin kiểm tra liên quan đến giao dịch thẻ tín dụng cần được phản ánh trong các báo cáo<br>- Kiểm tra cho các báo cáo cá nhân cũng như tổng hợp lịch sử mua của khách hàng<br>- Kiểm thử cho tạo báo cáo trực tuyến|
### 5. Kiểm tra bảo mật cho các hệ thống bán lẻ POS

Một số nghiên cứu gần đây có các lỗ hổng bảo mật rất cao của Hệ thống bán hàng. Các biện pháp sau đây sẽ giúp bảo mật POS
- Kiểm tra bảo mật tuân thủ tiêu chuẩn PCI là rất quan trọng được coi là một phần của kiểm thử doanh nghiệp
- Chủ động quản lý tất cả phần mềm trên mạng để chỉ phần mềm được ủy quyền chỉ có thể thực thi và cài đặt
- Tiến hành Kiểm tra thâm nhập thường xuyên để xác định các nguồn tấn công và lỗ hổng
- Bao gồm các kiểm thử cho sự hiện diện của thông tin hệ thống không được bảo vệ và các thông tin sẽ hữu ích cho tin tặc
- Sử dụng các công cụ kiểm tra lỗ hổng
- Tạo một môi trường kiểm thử giống môi trường thật để kiểm tra thâm nhập cụ thể và tấn công chống lại các yếu tố không được kiểm thử trong môi trường chính 

### 6. Những thách thức trong kiểm thử POS 

* Nhiều cấu hình
* Giao diện phức tạp
* Các vấn đề ngoại vi
* Nâng cấp
* Tuân thủ PCI
* Bảo trì trên môi trường kiểm thử 

### 7. Tổng kết


POS bán lẻ đòi hỏi một mức độ kiểm thử cao, hãy nhớ rằng hiệu suất và chức năng chính xác của nó ảnh hưởng trực tiếp đến doanh thu kinh doanh của cửa hàng.
Để giảm rủi ro và cơ hội thất bại POS trong quá trình giao dịch, kiểm thử trong điều kiện chặt chẽ là điều cần thiết.
Kiểm tra cần thực hiện ở cấp độ Ứng dụng cũng như cấp độ doanh nghiệp
KIểm thử của bạn phải bao gồm các tình huống sau 
- Hoạt động thu ngân
- Xử lý cổng thanh toán
- Bán hàng
- Hoàn trả và trao đổi
- Hiệu suất
- Kịch bản tiêu cực
- Quản lý khuyến mãi và giảm giá
- Tuân thủ quy định và bảo mật.
Các kiểu cài đặt cấu hình, các sự cố ngoại vi và, nâng cấp là một số vấn đề quan trọng bạn sẽ cần test trong khi kiểm thử.