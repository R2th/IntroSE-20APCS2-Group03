Bạn là tester, đã bao giờ bạn log bug mà dev không hiểu gì rồi quay sang hỏi lại hoặc thắc mắc vì không hiểu bạn đã viết gì trong bug report đó chưa?<br>
Tôi chắc chắn, dù ít hay nhiều thì là bạn cũng đã từng đối mặt với trường hợp đó rồi. Và thậm chí bạn còn phải đọc và ngẫm lại thì mới hiểu chính bạn đã viết gì =)) <br><br>
Vậy có cách nào để viết bug report một cách tốt nhất, đầy đủ, ngắn gọn, dễ hiểu mà hiệu quả nhất không? Trong bài viết lần này, mình sẽ chia sẻ một số tip nhỏ khi viết bug report một cách hiệu quả.
# I. Bug report là gì?
![](https://images.viblo.asia/66946aac-cada-4990-a231-dea37a6c3e0f.png)<br>
*Bug report là gì?*<br><br>
Bug report là mô tả lỗi xảy ra khi thực thi test phần mềm, thường hay được Dev nhà mình gọi vui là log Bug hay report Bug. Bug report thường được Tester thực hiện trên các phần mềm quản lý tasks như Jooto, Backlog, Redmine, Jira,…<br><br>

# II. Tại sao cần phải viết bug report tốt
![](https://images.viblo.asia/49023ab4-2015-4601-a0cc-293c726695e9.png)<br>
*Tại sao cần phải viết bug report tốt*<br><br>
Viết báo cáo lỗi tốt là một kỹ năng thường bị các công ty phát triển ứng dụng bỏ qua. Nhưng các báo cáo lỗi được viết tốt có thể giảm thời gian giữa việc tìm lỗi và giải quyết nó. Lỗi có thể trì hoãn việc phát hành ứng dụng và các sự cố với lỗi có thể nhanh chóng làm hỏng mối quan hệ giữa team dự án với khách hàng. Viết báo cáo một lỗi không có gì to tát cả, nó chỉ là một kỹ năng cần thiết trong công việc của 1 tester và tôi sẽ giải thích làm thế nào để đạt được kỹ năng này.<br><br>
Điểm quan trọng của việc viết báo cáo lỗi là để sửa lỗi. Nếu một người kiểm thử không viết báo cáo một lỗi chính xác, rất có thể lập trình viên sẽ từ chối lỗi này nói rằng nó là không thể sửa được hoặc đây không phải là lỗi mà là tính năng :D. <br> Và rồi 2 bên lại tranh cãi đó là bug hay không, nếu là bug thì tại sao dev lại không thể nhận ra ngay khi đọc bug report mà lại phải đối chất lại rồi mới thừa nhận. <br><br>
Nhưng tóm lại, tại sao phải viết một bug report tốt thì lợi ích mà một bug report tốt mang lại chính là câu trả lời:
* Dev có thể tái hiện Bug dễ dàng
* Tỷ lệ Bug được fix sẽ cao hơn, triệt để hơn và ít có nguy cơ ảnh hưởng đến chức năng khác hơn
* Góp phần đưa ra một sản phẩm chất lượng tốt hơn
* Nâng cao khả năng teamwork. Khi Tester viết Bug report “chất lượng” vô hình tạo cho Dev một ấn tượng, sự tin tưởng về kết quả test của Tester và những Bug mà Tester đã log lên. Khi đó, sẽ tránh được một vài xung đột không đáng có giữa Dev và Tester.
* Nâng cao kỹ năng code của Dev. Sau mỗi Bug bị reopen, Dev sẽ có thêm kinh nghiệm cover code của mình hơn.
* Nâng cao kỹ năng của Tester trong quá trình kiểm thử và báo cáo bug.
    
# III. Những yếu tố nào để đánh giá một bug report tốt?
![](https://images.viblo.asia/41b250fe-ff6e-472e-8a1a-76a414a385a9.png)<br>
*Đánh giá một bug report tốt*<br><br>
Bất cứ ai cũng có thể viết một báo cáo lỗi. Nhưng không phải ai cũng có thể viết một báo cáo lỗi hiệu quả để Dev có thể tái hiện được, chấp nhận Bug và thực hiện fix.<br>
Vậy làm thế nào để có thể phân biệt được Bug report có chất lượng tốt và chất lượng trung bình? Dưới đây là một vài tiêu chí đánh giá tiêu biểu để xác định:<br><br>


|Tiêu chí |  Bug report chất lượng tốt | Bug report chất lượng trung bình |
| -------- | -------- | -------- |
| Lượng thông tin      | Chứa đầy đủ thông tin về vấn đề cần sửa     | Thiếu thông tin hoặc thông tin không rõ ràng     |
| Tái hiện lỗi      | Có thể tái hiện được     | Không thể tái hiện     |
| Hỗ trợ teamwork      | Tạo nên được tiền đề phối hợp giữa Dev và Tester     | Gây tranh cãi hoặc không hợp tác giữa Dev và Tester     |
| Tiến trình xử lý bug      | Bug được sửa nhanh, triệt để và ít có nguy cơ ảnh hưởng đến các chức năng khác liên quan      | Bug không được sửa hoặc sửa nhưng không đạt yêu cầu, ảnh hưởng đến các chức năng khác    |
# IV. Format bug report đơn giản và đầy đủ những thông tin cần thiết
![](https://images.viblo.asia/cf27f36c-f898-451e-b119-b5268174eef2.png)<br>
*Bug report format*

-----


## 1. Bug ID<br>
Bug ID rất quan trọng trong việc có thể đề cập đến lỗi trong các báo cáo. Nếu một công cụ báo cáo lỗi được sử dụng để ghi nhật ký lỗi, ID thường là một số duy nhất được tạo bởi công cụ quản lý lỗi, tăng theo mỗi lần tạo mới bug.

## 2. Tiêu đề lỗi
Tiêu đề lỗi được đọc thường xuyên hơn bất kỳ phần nào khác của báo cáo lỗi. Nó sẽ nói lên khái quát lỗi gì đã xảy ra trên ứng dụng.<br>
Tiêu đề lỗi nên nêu khái vấn đề gặp phải là gì và ở đâu. Như kinh nghiệm của mình, nên đặt cho tiêu đề lỗi những prefix nhất định ví dụ như tên màn hình, tên chức năng xảy ra lỗi, sau đó mới khái quát lỗi. <br>
Bạn nên nêu ra vấn đề lỗi trước, và nguyên nhân tại sao lỗi nêu sau. Làm như vậy mục đích là để nhấn mạnh vấn đề gặp phải với phía Dev. Nên viết theo kiểu **BUG XẢY RA  KHI NÀO** thay vì **~~KHI NÀO XẢY RA BUG~~** . <br>
Ví dụ với  chức năng change password, người dùng vẫn có thể change password mới khi nhập sai password cũ. <br>
***Bạn nên viết*** <br>
>>> Bug title: [Change password] STILL CAN change password successful when input curent password incorrectly<br>

***Không nên viết:***
>>>Bug title: [Change password] When input curent password incorrectly, user still can change password successful 

Như vậy, bạn đang nhấn mạnh vào việc vẫn có thể change password trước.<br>
Ngoài ra, bạn cũng nên high light hay viết hoa những keyword cần nhấn mạnh cho người đọc để ý. Như ví dụ trên, tôi đã viết hoa từ "STILL CAN" để nhấn mạnh việc bình thường là không thể làm nhưng hiện tại lại có thể làm.

## 3. Môi trường kiểm thử
Cấu hình, hệ điều hành và trình duyệt là cần thiết cho một báo cáo lỗi rõ ràng. Đây là cách tốt nhất để liên lạc về cách có thể sao chép lỗi.

Nếu không có nền tảng hoặc môi trường chính xác, ứng dụng có thể hoạt động khác đi và lỗi ở phía tester có thể không thể tái hiện trên phía môi trường của Dev. Vì vậy, tốt nhất là đề cập rõ ràng đến môi trường phát hiện ra lỗi.
* Lỗi này ảnh hưởng đến hệ điều hành nào? NêN viết hoàn chỉnh phiên bản của hệ điều hành: Windows XP> Windows XP Pro 2002 SP3
* Lỗi trình duyệt này ảnh hưởng gì? Lỗi chỉ xảy ra trên những trình duyệt nào?
* Lỗi này ảnh hưởng đến thiết bị nào? Trên các thiết bị di động thì cần nêu rõ loại thiết bị, version là gì. Ví dụ, bạn test 1 ứng dụng trên iPhone, có bug chỉ xảy ra trên version >10. hoặc chỉ xảy ra trên iPhone 5, iPhone 6 còn những thiết bị vầ version khác thì lại không. 
* Bất kỳ thông tin bổ sung?
    * Cung cấpthông số kỹ thuật của hệ thống , vì điều này có thể giúp gỡ lỗi với các vấn đề như hết thời gian do hiệu năng: RAM 16GB, 4GB miễn phí, Intel Core i5- 2300 CPU @ 2.80ghZ64-bit.
    * Thời gian thực hiện kiểm thử có ảnh hướng đến kết quả test hay không?


## 4. Mô tả/ Cách tái hiện
Mô tả lỗi giúp nhà phát triển tái hiện lại vấn đề gặp phải. Mô tả kém sẽ tạo ra sự nhầm lẫn và lãng phí thời gian của 2 bên phía người phát triển và người kiểm thử.

Trong mô tả cần nêu rõ những vấn đề sau:
- **Tiền điều kiện** (nếu có)
- **Các bước tái hiện:** Cần cụ thể và chính xác những gì xảy ra sau mỗi bước. Nên đánh số cho từng bước, không nên gạch đầu dòng như kiểu liệt kê. 
- **Kết quả thực tế:** Nêu rõ lỗi gì, đã xảy ra sau bước thứ mấy
- **Kết quả mong đợi:** Tester cần nắm chắc kết quả mong đợi chính xác là gì. Nếu cần có thể dẫn chứng spec, design yêu cầu minh chứng cho kết quả mong đợi sau khi xử lý lỗi này. Trong trường hợp spec và design không khớp nhau, bạn cũng nên confirm lại với khách hàng để chắc chắn nha, tránh trường hợp dev lại hỏi ngược lại là "Tôi làm theo đúng spec rồi, tôi không làm theo design".
- **Tỉ lệ tái hiện bug:**  Có những lỗi xảy ra với tần suất nhỏ, có lỗi cần số bước tối thiểu để tái hiện, hay thậm chỉ xảy ra theo số lần chẵn lẻ thao tác một chức năng nào đó bạn cũng nên đề cập vào mô tả. Đó chính là lý do bạn nên tái hiện lại bug ít nhất 3 lần trước khi log bug. 
## 5. Mức độ nghiêm trọng
Mức độ nghiêm trọng của lỗi cho thấy ảnh hưởng của lỗi đối với các hệ thống, doanh nghiệp, môi trường và cuộc sống của con người, tùy thuộc vào bản chất của hệ thống ứng dụng. Mức độ nghiêm trọng thường được xếp hạng và phân loại theo 4 hoặc 5 cấp độ, tùy thuộc vào định nghĩa của tổ chức.
- **Critical( Nguy hiểm):** Điều này có nghĩa là lỗi là một điểm dừng của việc sử dụng ứng dụng với khả năng thiệt hại cao và không có cách giải quyết để tránh lỗi. <br>
Ví dụ: Ứng dụng hoàn toàn không khởi chạy và khiến hệ điều hành ngừng hoạt động. Điều này gây gián đoạn trong việc tiếp tục sử dụng ứng dụng của người dùng và yêu cầu ngya lập tức phải sửa lỗi đó. 
- **Serious( Nghiêm trọng):** Điều này có nghĩa là một số chức năng chính của ứng dụng bị thiếu hoặc không hoạt động và không có cách giải quyết. <br>
Ví dụ, một ứng dụng xem hình ảnh không thể đọc một số định dạng hình ảnh phổ biến.
- **Normal( Bình thường):** Điều này có nghĩa là một số chức năng chính không hoạt động, nhưng một cách giải quyết khác có thể được sử dụng thay thế như một giải pháp tạm thời.
- **Cosmetic / Enhancement( Mỹ quan / Tính năng mở rộng):** Điều này có nghĩa là lỗi gây ra sự bất tiện và phiền toái. <br>Ví dụ có thể có một thông báo bật lên cứ sau 15 phút hoặc bạn luôn phải nhấp hai lần vào nút GUI để thực hiện hành động.
-  **Suggestion( Gợi ý):** Đây thường không phải là lỗi mà là gợi ý để cải thiện chức năng. Đây có thể là GUI hoặc tùy theo thói quen sử dụng của người dùng. 

## 6. Mức độ ưu tiên
Khi mức độ nghiêm trọng được xác định, tiếp theo là xem cách ưu tiên giải quyết. Xác định mức độ ưu tiên nhanh chóng để sửa lỗi. Ưu tiên thường liên quan đến tầm quan trọng của doanh nghiệp như tác động đến dự án và khả năng thành công của sản phẩm trên thị trường. Giống như mức độ nghiêm trọng, mức độ ưu tiên cũng được phân loại thành 4 hoặc 5 cấp độ.
- **Urgent( Khẩn cấp):** Có nghĩa là rất khẩn cấp và yêu cầu giải quyết ngay lập tức mới có thể tiếp tục sử dụng ứng dụng, hoặc có thể liên quan đến những vấn đề bảo mật gây nguy hại cấp bách đến người dùng, doanh nghiệp.
- **High( Cao):** Yêu cầu cần xử lý cho bản phát hành mở rộng tiếp theo hoặc có ảnh hưởng đến chức năng khác cần phải fix lỗi này trước mới sử dụng được các chức năng khác liên quan. 
- **Medium( Trung bình):** Yêu cầu cần xử lý cho lần triển khai đầu tiên (thay vì tất cả các lần triển khai) hiểu đơn giản là lỗi này xảy ra độc lập, không ảnh hưởng đến các chức năng khác. 
- **Low( Thấp):** Mong muốn cho lần triển khai đầu tiên hoặc các bản phát hành tiếp theo trong tương lai. <br><br>
**Hiểu thêm về mức độ nghiêm trọng và mức độ ưu tiên**<br><br>
Cần lưu ý là một lỗi có mức độ nghiêm trọng cao luôn luôn có mức độ ưu tiên cao, tức là một lỗi nghiêm trọng sẽ đòi hỏi mức độ ưu tiên cao để giải quyết vấn đề càng nhanh càng tốt. Không bao giờ có một lỗi có mức độ nghiêm trọng cao mà mức độ ưu tiên thấp. Tuy nhiên, một lỗi có thể có mức độ nghiêm trọng thấp nhưng có mức độ ưu tiên cao.<br>
Một ví dụ có thể là tên công ty bị sai chính tả trên màn hình ngay khi khởi chạy ứng dụng . Điều này không gây thiệt hại nghiêm trọng đến môi trường hoặc cuộc sống của mọi người, nhưng có thể gây thiệt hại tiềm tàng cho danh tiếng của công ty và có thể gây tổn hại đến lợi nhuận kinh doanh.

## 7. Tài liệu đính kèm, bằng chứng
Bất kỳ bằng chứng nào về sự thất bại nên được nắm bắt và gửi cùng với báo cáo lỗi. Đây là một lời giải thích trực quan về mô tả của lỗi và giúp người đánh giá, nhà phát triển hiểu rõ hơn về lỗi. Thực tế, đôi khi chủ quan mà bạn đã không đính kèm một bằng chứng đơn giản như ảnh chụp màn hình, đến khi lập trình viên mở bug report của bạn ra, làm theo chuẩn các bước mà vẫn không tái hiện được. Và thậm chí bạn cũng không tái hiện được, thế là mang tiếng log bug "điêu". Vậy thì, dù bug to hay bug bé, hãy chịu khó đính kèm thêm cái attachment vào, vì "Nói có sách, mách có chứng" mà :) . Dù không tài hiện được thì cũng đảm bảo rằng lỗi chắc chắn đã từng xảy ra. OK =))

* Đính kèm TẤT CẢ các tệp có liên quan để giải thích, sao chép và gỡ lỗi: ví dụ như spec, testcase, dẫn chứng confirm với khách hàng, các ứng dụng khác tương tự 
* High light các khu vực cần chú ý trong ảnh chụp màn hình, dẫn mắt người xem đến vùng bị lỗi
* Đính kèm ảnh chụp màn hình trực tiếp vào  ticket (không nên nén file ở định dạng .rar , .zip, ...)
* Tạo video nếu các bước phức tạp (các bước trong mô tả nên khớp với video)
* Nén các tệp zip quá lớn để đính kèm hoặc có thể upload lên drive attachment của dự án
* Nếu kích thước tệp vượt quá giới hạn để đính kèm, hãy tách các tệp zip khi nén
* Một số tool offline cho phép chụp/ record màn hình: 
    * Snagit để chụp và quay màn hình
    * Recordmydesktop để record màn hình
    * Gif screen record: record màn hình lưu định dạng ở file gif
    * Qsnap: exension trên Chrome cho phép chụp, chỉnh sửa và download ảnh chụp màn hình

## 8. Các thành phần ảnh hưởng  
Dưới quan điểm của một người kiểm thử, hãy nên đưa ra dự đoán hoặc logic mà các chức năng, màn hình khác có thể bị ảnh hưởng từ lỗi này. Từ đó, tester có thể cover được tối đa việc fix bug này rồi nhưng lại gây ra các lỗi khác.
## 9. Gán cho ai
Tùy vào cách tổ chức quản lý và hoạt động của từng tổ chức mà sẽ có yêu cầu gán lỗi cho ai xử lý. <br>
Ví dụ:<br>
* Có team khi tạo bug report thì gán cho leader > Leader xem xét và gán lại cho dev phù hợp 
* Có team khi tester tạo bug thì gán trực tiếp cho dev phát triển chức năng đó. 
## 10. Thời gian phát hiện và fix bug
Ngày và thời gian mà lỗi xảy ra hoặc báo cáo cũng rất cần thiết. Điều này thường hữu ích khi bạn muốn tìm kiếm các lỗi được xác định cho một bản phát hành phần mềm cụ thể hoặc từ khi giai đoạn kiểm thử bắt đầu.<br>
Thời gian cũng có thể giúp ích cho việc estimate và tổng hợp thời gian xử lý cho từng lỗi. Thường ta sẽ có Start date và Due date cho từng ticket.
# V. Một số mẹo nhỏ đảm bảo bạn luôn có một bug report tốt
![](https://images.viblo.asia/de613ba8-9de6-4e63-974b-f3a820afa7af.jpg)<br>
*Tip nhỏ để viết một bug report tốt*<br><br>
Dưới đây là một số mẹo bổ sung để viết báo cáo lỗi tốt:<br>

## 1. Báo cáo lỗi ngay lập tức:

 Nếu bạn tìm thấy bất kỳ lỗi nào trong khi kiểm tra, thì không cần phải đợi để viết báo cáo lỗi chi tiết sau này. Thay vào đó hãy viết báo cáo lỗi ngay lập tức. Điều này sẽ đảm bảo một báo cáo lỗi tốt và tái sử dụng. Nếu bạn quyết định viết báo cáo lỗi sau này thì có nhiều khả năng bỏ lỡ các bước quan trọng trong báo cáo của bạn.<br>

## 2. Tái hiện lỗi ít nhất 3 lần trước khi viết báo cáo lỗi: 

Lỗi của bạn nên được tái hiện. Hãy chắc chắn rằng các bước của bạn đủ chính xác để tái hiện lỗi mà không có bất kỳ sự mơ hồ nào. Nếu lỗi của bạn không thể tái hiện thường xuyên, bạn vẫn có thể gửi lỗi đề cập đến bản chất định kỳ của lỗi.

## 3. Kiểm tra sự xuất hiện lỗi tương tự trên các mô-đun tương tự khác: 

Đôi khi nhà phát triển sử dụng cùng một mã cho các mô-đun tương tự khác nhau. Vì vậy, có nhiều khả năng xảy ra lỗi trong một mô-đun trong các mô-đun tương tự khác. <br>
Ví dụ: ở 2 màn hình khác nhau nhưng có 1 chức năng nhỏ nào đó giống nhau, developer sử dụng chung 1 mã code, khi màn hình này lỗi thì màn hình kia rất có thể có lỗi giống y như vậy. 

## 4. Viết một bản tóm tắt lỗi tốt:

Tóm tắt lỗi sẽ giúp các nhà phát triển nhanh chóng phân tích bản chất lỗi. Hãy nhớ rằng tóm tắt lỗi được sử dụng làm tài liệu tham khảo để tìm kiếm lỗi trong kho lưu trữ và quản lý lỗi.

## 5. Tự đọc báo cáo lỗi trước khi nhấn nút Gửi:
**Lưu ý nho nhỏ nhưng không kém phần quan trọng:** Trước khi log bug, bạn hãy đặt mình vào vị trí người tiếp nhận ticket và tự review lại một lượt:
* Điều đầu tiên, bạn phải nắm chắc được tổng quan hệ thống bạn sẽ test, nắm chắc requirement và quan trọng nhất là phần bạn phụ trách test.
* Nên xem xét kỹ các điều kiện, môi trường, device test kỹ càng. Cách sử dụng, các cấu hình cần thiết, việc cài cắm các thiết bị, phần mềm tích hợp khác có liên quan, trước khi thực thi test. Để đảm bảo được các yếu tố này thì bạn cần phải nắm được bạn sẽ cần những gì khi test hệ thống đó để tìm hiểu các thông tin tương ứng, tránh trường hợp không biết cấu hình, hay cấu hình sai, bạn sẽ trở thành tội đồ của chính mình!
* Khi phát hiện ra vấn đề khác thường, thì nên check lại latest requirement của phần này một lần nữa để đảm bảo là vấn đề khác thường này đúng là khác thường thật! Lưu ý là version mới nhất ấy nhé, tránh trường hợp sử dụng version cũ thì lỗi lầm lại thuộc về bạn ngay từ bước này rồi! ( 100% là lỗi của tester :D )
* Kiểm tra lại nhiều lần để xác định tần xuất xảy ra bug, có thể là reset lại máy test, clear cache các thứ để xem việc tái hiện vấn đề này có vấn đề gì không?
* Sau đó kiểm tra một lần nữa trên các máy test khác xem nó có xảy ra trên máy khác hay không?
* Nếu vẫn chưa chắc chắn thì có thể tham khảo ý kiến của các thành viên trong nhóm, hay những người có kinh nghiệm để xem xét thêm về vấn đề này.

* Trước khi log bug, thì nên kiểm tra kỹ bug toàn bộ hệ thống để xem vấn đề này đã từng xảy ra hay chưa, tránh việc log bug trùng. Nguyên nhân thì do chủ quan hay khách quan đều có, nhưng dù là gì đi nữa thì bạn cũng nên hạn chế thấp nhất vấn đề này, một vài lần xảy ra sẽ khiến dev “mất niềm tin” ở bạn ngay. Vì vậy, cần kiểm tra và lọc kỹ thông tin trước khi log bug, một vài chục bug ta có thể nhớ được chứ khi đã lên đến hàng trăm thì không thể chủ quan được!

* Trong trường hợp có xảy ra tranh cãi, những thông tin liên quan cần thiết bạn đã cung cấp đầy đủ rồi mà vẫn không tìm được tiếng nói chung với người được assgin để fix bug thì nên nhanh chóng đưa vấn đề lên trưởng nhóm hoặc người có trách nhiệm cao hơn để cùng tìm hướng giải quyết phù hợp nhất.
* Đọc tất cả các câu và cắt bỏ những từ không cần thiết. Xem nếu bất kỳ câu nào đang tạo ra sự mơ hồ có thể dẫn đến giải thích sai. Nên tránh những từ hoặc câu gây hiểu lầm để có thể có một báo cáo lỗi rõ ràng.
* Kiểm tra chính tả và ngữ pháp: Đa số các dự án đều dùng tiếng Anh để trao đổi, vậy nên hãy chỉn chu từng câu chữ ngắn gọn, súc tích nhất có thể, đảm bảo rằng đúng ý. Đặc biệt cần lưu ý khi dùng thể khẳng định - phủ định, chủ động - bị động, quá khứ - hiện tại - tương lai. Vì chỉ cần thiếu hoặc thừa 1 chữ thôi cũng làm sai lệch hoàn toàn nội dung của bug. 

    
## 6. Không lạm dụng việc sử dụng ngôn ngữ
![](https://images.viblo.asia/12551352-b1fd-41f6-be56-fc0635c096cb.png)<br>
*Code anh không có bug, đây chỉ là tính năng*<br><Br>
Bạn phát hiện ra một lỗi và báo cáo nó nhiều lần, lỗi xảy ra nhiều lần nhưng không nên sử dụng những từ ngữ chỉ trích hoặc có thể gây tổn thương đến nhà phát triển hoặc nhắm đến bất kỳ ai. Điều này có thể gây tổn thương cho họ hoặc đơn giản là giảm hiệu quả teamwork. <br><br>Vì thế hãy luôn mang một tinh thần và mục tiêu là cùng đóng góp để xây dựng một sản phẩm chất lượng, đừng gay gắt ra lệnh, nó dễ làm ảnh hưởng đến tâm lý người nhận và dễ gây căng thẳng giữa hai bên. 🙂
# VI. Phần kết luận
Không có nghi ngờ rằng báo cáo lỗi của bạn phải là một tài liệu chất lượng cao.<br>
Tập trung vào viết báo cáo lỗi tốt và dành thời gian cho nhiệm vụ này vì đây là điểm giao tiếp chính giữa người kiểm tra, nhà phát triển và người quản lý. Người kiểm thử nên nhận thức rằng viết báo cáo lỗi tốt là trách nhiệm chính của mình.<br>
Nỗ lực của bạn đối với việc viết một báo cáo lỗi tốt sẽ không chỉ tiết kiệm tài nguyên của công ty mà còn tạo ra mối quan hệ tốt giữa bạn và các nhà phát triển, góp phần tạo hiệu quả cao trong công việc.
# VII. Tài liệu tham khảo
http://smartqa.com/blog/bug-reports/how-to-write-good-bug-reports/
https://rubygarage.org/blog/how-to-write-a-quality-bug-report
https://text.relipasoft.com/2018/12/mot-so-meo-viet-bug-report-chat-luong/
https://www.softwaretestinghelp.com/how-to-write-good-bug-report/