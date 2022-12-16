Bài viết này mình muốn chia sẻ với các bạn một số câu hỏi phỏng vấn cho vị trí Tester mà mình đã tổng hợp được ở một số nguồn tham khảo và từ bạn bè đồng nghiệp. 
Hi vọng bài viết sẽ hữu ích để các bạn tham khảo và tự mình trả lời để tổng hợp lại kiến thức kỹ năng bản thân, giúp cho mình thêm tự tin trước các buổi phỏng vấn nhé :wink:
## Các câu hỏi chung
* Giới thiệu về bản thân
* Bạn đã từng làm những công ty nào? Quy mô công ty cũ của bạn? 
* Tại sao rời công ty cũ? hay lý do bạn thôi việc?
* Bạn biết gì về công ty chúng tôi?
* Tại sao bạn chọn công ty chúng tôi?
* Tại sao bạn chọn công việc tester?
* Bạn thấy công việc này thế nào? 
* Điều gì khiến bạn nghĩ mình sẽ phù hợp với nghề này?
* Những lý do thuyết phục chúng tôi chọn bạn?
* Điểm mạnh, điểm yếu của bạn?
* Trong vòng 1 đến 3 năm tới bạn muốn mình sẽ như thế nào?
* Định hướng phát triển trong tương lai? hay Kế hoạch trong tương lai gần và xa?
## Về kinh nghiệm công việc trước đây của bạn
* Dự án bạn làm gần đây là gì? Hay các bạn dự án bạn đã làm là gì?
* Trình bày về một dự án mà bạn đã tham gia?
* Bạn tham gia dự án với vai trò gì?
* Trong một dự án bạn thường làm những gì? Hay các công việc bạn làm trong dự án?
## Về kỹ năng, cách xử lý và giải quyết vấn đề của bạn
* Dự án đang thực hiện, bạn tham gia vào dự án thì công việc đầu tiên bạn làm là gì?
* Bạn đọc và nghiên cứu tài liệu trong thời gian bao lâu? Có giới hạn nào không hay làm theo yêu cầu của leader/Người hướng dẫn?
* Khi không hiểu về tài liệu thì bạn làm gì?
* Bạn có từng verify bài của thành viên trong nhóm không? Dựa vào đâu để đảm bảo rằng bạn verify chính xác?
* Bạn có support thành viên trong team không?
* Nếu trong team có thành viên làm chậm hoặc nhác làm, đến khi gần đến hạn dự án thì làm không kịp, nếu cần đến sự hỗ trợ của bạn thì bạn có giúp đỡ không? Trường hợp bạn không đủ thời gian thì làm thế nào?
* Có khi nào bạn gặp bug nghiêm trọng nhưng độ ưu tiên log bug thấp không? Bạn xử lý như thế nào?
* Cách mà bạn estimate thời gian test cho một màn hình? Ví dụ 500 test case thì bạn sẽ cần thời gian bao lâu? Có công thức nào để tính không?
* Dựa vào những tiêu chí gì để estimate số lượng testcase? Cho một màn hình đăng ký estimate số lượng testcase + thời gian
* Nếu verify bài chéo cho thành viên khác, người đó viết test case trong vòng 3 ngày thì bạn sẽ verify trong thời gian bao lâu?
* Nếu leader giao cho bạn một màn hình, bảo bạn hoàn thành trong thời gian 3 ngày thì em xử lý như thế nào?
* Nếu trong màn hình mà requirement không yêu cầu chi tiết rõ ràng, bạn nhận thấy nếu thay đổi vị trí của 2 button cho nhau thì hợp lý hơn. Bạn làm thế nào để thuyết phục điều này với developer?
* Có bug bạn log lên nhưng Dev không chấp nhận thì bạn làm thế nào? Trường hợp giải quyết của bạn mà Dev vẫn không chấp nhận nữa thì bạn làm gì?
* Trường hợp em test có bug, nhưng bug đó dev lại không tái hiện được bug ở máy dev thì em làm thế nào? Hay dev nói đó không phải là bug thì làm sao?
* Từ trước đến giờ có bug nào làm bạn ấn tượng và nhớ nhất không?
* Nếu gần tới deadline mà công việc cần hoàn thành còn nhiều thì làm thế nào?
* Bạn báo cáo tiến độ công việc của mình cho ai? và báo cáo như thế nào?
* Khi nào thì bạn dừng test? Có khi nào dừng test bất thường không? Vì sao?
* Trong thời gian làm việc teamwork có xảy ra mâu thuẫn gì không?
* Nếu leader giao cho bạn support 1 bạn khác trong thời gian dài, điều đó khiến bạn phải OT và bạn đó lúc nào cũng cần support nhiều, thì bạn làm như thế nào?

### Một số ví dụ cụ thể
#### Ví dụ 1: 
Form search có 2 field [From date] và [To date], yêu cầu:
1. Cách viết test case cho form đó sao cho hiệu quả
2. Nếu các test case cho các field
3. Giả sử nhập liệu vào 2 field trên, click button "Search" thì hệ thống trả về các giá trị. Làm thế nào bạn biết các giá trị đó là đúng hay sai?
4. Bạn có thể viết câu lệnh SQL để search ở trên?
5. Giả sử dev bảo các giá trị search là đúng nhưng bạn lại cho là sai thì bạn sẽ làm gì?

#### Ví dụ 2: 
Màn hình search có một text field "Name" và button "Search", yêu cầu:
1. Viết các test case cho màn hình này
2. Nếu như kết quả search ra được 1 người, làm sao bạn biết người đó là đúng hay sai?

#### Ví dụ 3: 
Cho textfield cho phép nhập các số nguyên từ 1 đến 100, 
1. Sử dụng kĩ thuật phân vùng tương đương và phân tích giá trị biết thì sẽ cần viết bao nhiêu case? nêu các test case đó
2. Ngoài kỹ thuật ở trên thì bạn còn sử dụng kỹ thuật nào khác nữa không? Sử dụng nó thì bạn sẽ viết thêm những test case nào?

#### Ví dụ 4: 
Cho field kiểu ngày tháng năm gồm cả dropdownlist và textbox thì bạn sẽ viết được bao nhiêu case? các case đó như thế nào?
## Về chuyên môn kiểm thử phần mềm
* Dựa vào gì để biết test case đầy đủ?
* Cho một màn hình thì bạn sẽ test gì trước?
* Bạn dùng những kỹ thuật gì để thiết kế test case? Trong các kỹ thuật đó bạn thường dùng kỹ thuật nào nhất?
* Trường hợp nào thì sử dụng kỹ thuật gì để viết TC?
* Trong file test case gồm những nội dung gì?
* Phân tích ưu điểm và nhược điểm của kỹ thuật phân vùng tương đương và phân tích giá trị biên?
* Khi nào thì bạn tiến hành test?
* Regression testing là gì? Khi nào bạn thực hiện test hồi quy?
* Bạn dùng tool gì để log bug? Khi log bug bạn cần ghi những thông tin gì?
* Phân biệt severity và priority? Có những mức độ nghiêm trọng nào của bug? Có những mức độ ưu tiên nào?
* Vòng đời của một bug?
* Đoán lỗi là gì? Bạn có những kinh nghiệm nào trong đoán lỗi?
* Performance testing là gì? Bạn sử dụng tool gì để test? Trình bày về tool mà bạn sử dụng
* Dựa vào đâu để biết mình sẽ viết TC cho màn hình hay module nào?
* Nội dung của file Test Plan gồm những gì?
* Có những loại report nào và ý nghĩa của từng loại report?
## Về cơ sở dữ liệu (SQL)
* Bạn sử dụng hệ quản trị cơ sở dữ liệu nào?
* Viết 4 câu lệnh cơ bản (Insert/Update/Select/Delete)
* Bạn có sử dụng SQL trong dự án không?
* Những trường hợp nào bạn dùng SQL?
* Bạn thường dùng những query nào?
* Các phép nối bảng (join table)? Phân biệt Left join và Right join? Viết ví dụ cụ thể
* Bạn biết những query select nào? Có biết về group by và having? Ví dụ cụ thể
* Có biết Stored Procedure (Thủ tục lưu trữ) không? Cú pháp như thế nào?
## Kỹ năng nâng cao của bạn
* Test mobile và Test web có khác nhau không? khác như thế nào?
* Bạn có biết test auto? Bạn có test mobile chưa?
* Bạn sử dụng những tool nào để test auto?
* Bạn dùng ngôn ngữ nào để viết script?
* Bạn có nghiên cứu gì thêm về test không?
* Ngoài thời gian làm việc bạn có làm gì để cải thiện khả năng của mình không? ...
* Bạn có biết về mô hình Agile Scrum?
## Các câu hỏi kết
* Bạn có câu hỏi nào cho chúng tôi?
* Bạn muốn mức lương bao nhiêu?
* Khi nào bạn có thể đi làm?
....
##### Chắc chắn bài viết này chỉ là 1 phần nhỏ các câu hỏi vì kiến thức là bao la vô vàn :joy: hi vọng hữu ích cho mọi người