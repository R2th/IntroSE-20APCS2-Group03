# Interrupt Testing là gì?
Interrupt Testing là một nhánh của Kiểm thử ứng dụng di động liên quan đến cách ứng dụng phản ứng với sự interrupt và tiếp tục trạng thái trước đó.

![](https://images.viblo.asia/8e990e9a-d780-46de-8afb-8e7360817a1e.jpg)

# Tại sao bạn cần Interrupt Testing?
Điều duy nhất luôn xảy ra khi bạn đang trong một cuộc họp là gì? Bạn bị interrupt, phải không? Khi điều đó xảy ra, một số người không bị ảnh hưởng, một số cần một vài phút để quay lại và một số hoàn toàn quên mất mình đang nghĩ gì. Nói một cách đơn giản, Interrupt Testing cố gắng tìm ra hành vi nào mà ứng dụng của bạn thể hiện khi bị ngắt giữa chừng.
Một tình huống khác, giả sử bạn sở hữu một đèn pin và bật nó lên. Pin hết, đó là một sự interrupt đến trạng thái hoạt động hiện tại của nó. Thay pin và khôi phục nó. Đèn pin sẽ trở lại ON như bình thường. 
Interrupt Testing áp dụng cho mọi loại ứng dụng - Web, Mobile, Stand Alone, v.v ... Tuy nhiên interrupt testing nổi bật hơn trong mobile testing do đa dạng của các thiết bị, mạng, cấu hình, v.v ... 

![](https://images.viblo.asia/5d60c424-596e-47f6-9509-619a3f1ce8b4.jpg)

# Các loại interrupt testing:

Dưới đây là những loại interrupt testing phổ biến nhất:
Battery low
Battery full- when charging
Incoming phone call
Incoming SMS
Incoming Alert from another mobile application
Plugged in for charging
Plugged out from charging
Device shut off
Application Update reminders
Alarm
Network connection loss
Network connection restoration

![](https://images.viblo.asia/d3c6ff4f-59f9-4ab6-a76f-e4e59c0a9c28.jpg)

# Resolution cho từng trường hợp Interrupt

Run in background: interrupt diễn ra trong khi ứng dụng chạy nền. Ứng dụng sẽ giành quyền kiểm soát sau khi sự interrupt kết thúc. Ví dụ: Cuộc gọi điện thoại / Facetime mà bạn tham dự khi bạn đang đọc sách kỹ thuật số trên iBooks (hoặc ứng dụng tương tự). Khi người dùng trả lời điện thoại, iBooks sẽ đợi cho đến khi hoàn thành và sau đó tiếp tục lại khi cuộc gọi kết thúc.

Show Alert , alert tắt và sau đó bạn lại sử dụng ứng dụng bình thường:  ' Tin nhắn SMS nhận được ' - tin nhắn xuất hiện trong tiêu đề. Người dùng không bận tâm về nó và tiếp tục làm việc với ứng dụng như bình thường. Các cảnh báo ứng dụng di động khác, như yêu cầu kết bạn mới trên tin nhắn Facebook hoặc WhatsApp, cũng thuộc danh mục này. Nhưng nếu người dùng quyết định đọc tin nhắn, hành vi được mô tả trong Điểm 1 sẽ được tuân theo. Nếu bỏ qua, trạng thái của ứng dụng là không thay đổi.

Call to Action : Báo động phải được tắt hoặc báo lại trước khi bạn tiếp tục làm việc. Điều tương tự với các thông báo cập nhật ứng dụng. Bạn phải Hủy bỏ hoặc Chấp nhận các thay đổi trước khi tiếp tục. Một ví dụ khác là cảnh báo pin yếu- Bạn có thể chọn tiếp tục như bình thường hoặc chuyển sang chế độ năng lượng thấp (nếu thiết bị cho phép.)

No impact: Một ví dụ là: nếu kết nối mạng khả dụng và thiết bị của bạn kết nối với nó. Ngoài ra, khi bạn cắm thiết bị của mình để sạc, không cần có cảnh báo hoặc gọi hành động nào. Nó có thể sẽ thực hiện công việc của nó trong khi bạn tiếp tục sử dụng ứng dụng của mình.

Do đó, tùy thuộc vào loại interrupt mà bạn đang kiểm thử, hãy hiểu hành vi và xem ứng dụng của bạn có thỏa mãn nó không. Ngoài ra, hành vi được mô tả ở trên không cần phải giống nhau cho tất cả các ứng dụng và thiết bị. Hãy chắc chắn để tìm hiểu chi tiết cụ thể về Ứng dụng di động của bạn.

# Thực hiện interrrupt testing như nào?
Interrupt Testing là một tập hợp con của Kiểm tra chức năng cho một ứng dụng di động. Và, để tiến hành Interrupt Testing, bạn sẽ tuân theo các Công cụ và Khung kiểm tra ứng dụng di động tương tự. Đó là kỹ năng của những người thử nghiệm để hình dung những kịch bản này. Sau khi hoàn thành, bạn sẽ thiết kế các trường hợp thử nghiệm và thực hiện theo cách chính xác giống như bất kỳ thử nghiệm nào khác

# Phân biệt Intterupt testing và Recovery Testing:
![](https://images.viblo.asia/c8b1de9b-4f8a-4ca3-bdf8-a82657969a1c.jpg)

Recovery Testing là để xác nhận sự phục hồi từ một thất bại. Interrupt Testing không nhất thiết là một thất bại. Đó là một sự phân phân luồng tạm thời trong hoạt động ứng dụng.

Nguồn: https://www.guru99.com/interrupt-testing.html