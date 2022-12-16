QnA Maker là dịch vụ lưu trữ ngôn ngữ tự nhiên trên nền tảng đám mây (do microsoft cung cấp ). <br>
Ở QnA chúng ta có thể tạo đoạn hội thoại (gồm câu hỏi và câu trả lời ) cho 1 nội dung được xác định. Từ đó nó sẽ tìm ra câu trả lời tương ứng và phù hợp nhất cho câu hỏi từ người dùng nhập vào. <br>
Không chỉ đơn thuần là lưu trữ, QnA Maker còn có thể thu thập nội dung, cách thức câu hỏi từng người dùng để phân tích và đưa ra gợi ý hay chọn câu trả lời phù hợp khi có nhiều câu trả lời trên cùng 1 nội dung. <br>
QnA Maker thường được ứng dụng trong việc xây dựng ứng dụng giao tiếp với khách hàng (chatbot).
### Các ngôn ngữ QnA Maker hỗ trợ.
- Hỗ trợ 1 ngôn ngữ trên 1 QnA Maker resource.
- Không hỗ trợ nhiều ngôn ngữ trên 1 QnA Maker resource (khi tạo 1 resource thì ngôn ngữ được chọn về sau sẽ không thể thay đổi ).
- Có thể hỗ trợ nhiều ngôn ngữ trên 1 knowledge base. (có thể sử dụng thông qua translate, hay theo kiểu quản lý câu hỏi và câu trả lời riêng biệt cho từng ngôn ngữ ).
- Hỗ trợ 53 ngôn ngữ trên thế giới.
- Hỗ trợ 14 ngôn ngữ trong việc truy vấn kết quả và mức độ liên quan (giữa question và answer ).
![](https://images.viblo.asia/cae1ca7d-6d45-4cad-9568-a6d7a2a22e2c.png)
### Tìm hiểu về knowledge base trong QnA Maker
- Knowledge base là nơi để QnA Maker nhập nội dung của người dùng vào bao gồm toàn bộ câu hỏi, câu trả lời tương ứng. <br>
- Là nơi có thể nhập vào cũng như lấy ra thông tin về mối quan hệ, đề xuất mối quan hệ giữa các cập câu hỏi và câu trả lời. <br>
- Tại đây chúng ta có thể chỉnh sửa, có thể thêm mới hoặc xóa đi các cập câu hỏi. <br>
- Để QnA Maker cập nhật đúng, sau khi chỉnh sửa xong thì cần phải Publish Knowledge base. <br>
![](https://images.viblo.asia/0c7364fc-15b2-4f33-a11f-9a93501be069.png)
### Những giới hạn trong QnA Maker knowledge
- Số lượng knowledge base tối đa.
![](https://images.viblo.asia/cbdd3628-e61f-47a3-b2c9-12b0339d6027.png)
- Cách đặt tên file export thông tin không được chứa ký tự đặc biệt
![](https://images.viblo.asia/bc3b06d2-80ce-4194-97ca-6b7fa0891705.png)
- Kích thước tối đa dành cho file là
![](https://images.viblo.asia/574bda9c-1f26-4b2c-97fc-4d15762f8d3b.png)
- Độ dài và các ký tự có thể sử dụng cho tên và nội dung dữ liệu trong knowledge base.
![](https://images.viblo.asia/440939af-c64f-44e0-9eb3-ebaf6f6a2e0b.png)
- Độ dài các nội dung trong Knowledge:
    + Độ dài của câu trả lời ( answer ): 25,000
    + Độ dài của câu hỏi ( question ): 1,000
    + Độ dài của Metadata key: 100
    + Độ dài của Metadata value: 500
    + Những ký tự được sử dụng trong metadata name: Alphabets, số và _
    + Những ký tự được sử dụng trong metadata value: Sử dụng tất cả trừ 2 ký tự " : " và " | "
    + Độ dài tên file : 200
    + Số lượng câu hỏi tối đa nhận được câu hỏi thay thế: 300
    + URL, HTML trong 1 trang là 1000000 ký tự. 
### Hỗ trợ SDK trên các ngôn ngữ
- C#
- Go
- JavaScript
- Python
- Ruby
### Sử dụng active learning để cải thiện knowledge base
- Active learning hoạt động trên cơ sở cho phép nâng cao chất lượng knowledge base bằng cách để xuất các câu hỏi thay thế. Từ đó chúng ta có thể linh hoạt sử dụng nguồn dữ liệu đề xuất nếu hợp lí và cần thiết. <br>
Knowledge base không tự động thay đổi, câu hỏi thay thế chỉ hiển thị dưới dạng đề xuất. Để sử dụng chúng ta phải thao tác chấp nhận, và những đề xuất này không làm thay đổi hay mất đi những dữ liệu đã có. <br>
- Active learning được hỗ trợ từ phiên bản 4.4.0 trở lên. Nếu ở phiên bản cũ hơn, cần nâng cấp để có thể sử dụng.<br>
- Phải bật tính năng active learning trên knowledge base khi sử dụng (ở phiên bản "stable release" thì active learning sẽ không được bật sẵn).<br><br>


Trên này là những thông tin kiến thức cơ bản tìm hiểu về QnA Maker để bắt đầu làm việc với nó. <br>
Nội dung và ứng dụng chi tiết hơn mình sẽ hướng dẫn ở bài tiếp theo. <br>
Xin chân thành cám ơn. <br>

Tài liệu tham khảo: https://docs.microsoft.com/vi-vn/azure/cognitive-services/qnamaker/