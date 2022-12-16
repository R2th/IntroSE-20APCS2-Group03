Trong [Part 1](https://viblo.asia/p/chat-bot-testing-part-1-E375z4w1ZGW), chúng ta đã tìm hiểu tổng quan về Chatbot, ưu và nhược điểm, một số test scenario cho Bot như: Cách giới thiệu bản thân, cách nhận biết và đáp lại lời chào, khả năng hội thoại, thêm cảm xúc khi giao tiếp, khả năng hiểu ngôn ngữ, độ chính xác của phản hồi, độ trễ của phản hồi, độ chính xác của link, tránh câu trả lời trùng lặp.
Trong phần 2, chúng ta sẽ xem xét các khía cạnh khác như Intent hopping, xác thực đầu vào, kết xuất nội dung bằng đồ họa,Quản lý lỗi (khả năng thất bại một cách duyên dáng của BOT) và Tính thân thiện với người dùng cùng những thứ khác. 

### 1. Chatbot có thể chuyển chủ đề khi trò chuyện

Trường hợp phản hồi của người dùng không phải câu trả lời mà Bot mong muốn, mà lại là một truy vấn khác, thì Bot vẫn có thể tiếp tục cuộc trò chuyện với chủ đề mới.

Ví dụ: BOT muốn confirm với user về địa chỉ mà user muốn biết, nó sẽ hỏi:

“Chúng tôi có văn phòng tại Gurgaon, Pune, Mumbai, Kolkata, Bengaluru và Hyderabad, bạn muốn biết địa chỉ của địa điểm nào?”
Thay vì trả lời tên vị trí, user lại hỏi sang chủ đề khác:

“Tôi muốn biết về chính sách phúc lợi của công ty”

BOT có thể không hiểu rằng user muốn đề cập đến một vấn đề khác và tiếp tục lặp lại câu hỏi liên quan đến địa chỉ.
Vì vậy, Tester phải liên tục đặt câu hỏi có chủ đề khác nhau, để đảm bảo rằng BOT đủ thông minh để trả lời liền mạch, rõ ràng.


###  2. Các lỗi chính tả và ngữ pháp cần tránh khi trả lời
Phải đảm bảo rằng không có lỗi chính tả hoặc ngữ pháp trong câu trả lời. Tất cả các câu phải phân biệt chữ hoa chữ thường và kết thúc bằng dấu chấm. 

Đối với câu trả lời dạng list, các item phải được gạch đầu dòng hoặc đánh số.
### 3. Khả năng xác thực thông tin đầu vào như email, mà zip, số điện thoại

Scenario 1: 
Kiểm tra validate email, không chấp nhận những địa chỉ email không hợp lệ: chứa khoảng trắng, không có @, thiếu .com.

Scenario 2: 
Kiểm tra validate mã zip, từ chối những mã zip không tồn tại.

Scenario 3: 
Kiểm tra validate số điện thoại, chỉ chấp nhận giá trị 10 chữ số, ko chứa kí tự khác số hay khoảng trắng.

Scenario 4:
Đối với BOT nhận dạng đầu vào bằng giọng nói, cần đảm bảo output trong một số trường hợp là chính xác. VD: Khi người dùng nói địa chỉ mail là roger@gmail.com, BOT sẽ ghi nhận mail là “roger@gmail.com” chứ không phải “roger @ gmail.com”

Scenario 5: Đối với data cần xác nhận như email, số điện thoại hoặc mã zip, cần xác thực thông tin ngay sau khi người dùng nhập giá trị chứ không phải khi kết thúc cuộc hội thoại. Nếu giá trị input không hợp lệ, BOT sẽ cung cấp tùy chọn khác để người dùng nhập lại.

### 4. BOT hiển thị chính xác nội dung đồ họa
Trong một số phản hồi của BOT sẽ có thông tin cards, ảnh, link map gợi ý được nhúng trong tin nhắn. Cần đảm bảo những nội dung này hiển thị chính xác trên các trình duyệt khác nhau như “Chrome”, “Firefox” và “Internet Explorer”, nội dung hiển thị luôn vừa vặn trong cửa sổ chat ngay cả khi phóng to//thu nhỏ trình duyệt.

### 5. Validate độ dài tối đa cho câu hỏi
Cần có giới hạn về độ dài của truy vấn mà BOT có thể xử lý. Do trong trường hợp có một truy vấn lớn, BOT sẽ mất nhiều thời gian để truy xuất và phản hồi, thời gian xử lý quá lâu sẽ gây mất thiện cảm với người dùng. Thậm chí trong một số trường hợp hệ thống có thể bị sập nếu không có khả năng xử lý truy vấn lớn.
### 6. Phản hồi thân thiện khi không hiểu câu hỏi hoặc input không hợp lệ
Với nhưng câu hỏi mà boss không hiểu, BOT sẽ trả lời một cách lịch sự : Tôi xin lỗi, tôi không thể hiểu những gì bạn vừa nói. Vui lòng thử lại với thông tin đầu vào hợp lệ. ” thay vì nói rằng có sự cố máy chủ nội bộ khi truy xuất câu trả lời.
![](https://images.viblo.asia/5cc9f8e6-54e1-4873-b2c6-01e048f0da7c.jpg)


Trong tình huống người dùng liên tục cung cấp mã zip sai thì BOT nên trả lời bằng một phản hồi hướng người dùng bắt đầu lại hoặc giúp người dùng thoát khỏi vòng lặp và bắt đầu lại.
### 7. BOT không bị ảnh hưởng bởi lỗi chính tả trong truy vấn
BOT phải đủ thông minh để hiểu truy vấn ngay cả khi truy vấn có lỗi chính tả. Vì vậy, nếu người dùng định nói “California” và thay vào đó gõ “Calafornia”, BOT vẫn sẽ hiểu và đưa ra phản hồi chính xác. 
### 8. GUI thân thiện với người dùng và dễ sử dụng
VD một số tính năng GUI có giá trị :
- Button "Send" dễ nhận dạng, có thể gửi bằng phím tắt, default disable khi chưa nhập văn bản.
- Có thể tìm lại câu hỏi đã hỏi từ trước, chỉnh sửa, gửi lại câu hỏi đó.
- Khi cần cung cấp câu trả lời dạng list để người dùng lựa chọn, các item có thể gắn link, người dùng có thể click vào link để xem thêm thông tin chi tiết.
- 
![](https://images.viblo.asia/64fe8662-c176-4ecb-a928-54bba6337929.png)

### 9. Một số tip quan trọng khi kiểm thử
- Đảm bảo rằng BOT không đi vào vòng lặp vô hạn và không truy xuất được thông tin. Thường xảy ra trong trường hợp yêu cầu input hợp lệ như mã zip, số điện thoại,...
- Không hiển thị quá nhiều link đề xuất trong phản hồi. Tối đa 5 chip gợi ý sẽ là lý tưởng.
- Đối với các BOT hoạt động trên Trợ lý Google Assistant, hãy đảm bảo rằng người dùng luôn thoát khỏi ứng dụng khi nhập hoặc đọc các từ như “Exit” hoặc “Cancel”.
- Chú ý đến chức năng của ứng dụng và đảm bảo rằng BOT được kiểm tra kỹ lưỡng về chức năng của nó. Ví dụ: Nếu BOT phải truy xuất một số thông tin dựa trên một số đầu vào, hãy đảm bảo rằng BOT truy xuất thông tin đó, nếu có, cho tất cả các hoán vị và tổ hợp hợp lệ cho các giá trị đầu vào đó.
- Đối với các truy vấn BOT không hiểu, sau mỗi lần thử không thành công cho cùng một truy vấn, hãy đảm bảo rằng BOT lặp lại cùng một câu hỏi theo những cách khác nhau.
- Luôn đảm bảo rằng có các xác thực được triển khai cho tất cả các giá trị đầu vào như định dạng số hoặc email.

Đây là một số case phổ biến trong thử nghiệm Chatbot mà Tester phải xem xét. Thanks for reading!

Dịch từ : https://www.xoriant.com/blog/big-data-analytics/chatbot-testing-getting-right-first-time-part-2.html