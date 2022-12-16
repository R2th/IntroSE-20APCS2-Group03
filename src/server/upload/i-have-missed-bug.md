Bạn đã từng để lọt bug?

Ở giai đoạn khi mới bước chân vào con đường kiểm thử phần mềm, nó là một trong những cơn ác mộng tồi tệ nhất của những tôi.

Tại sao vậy? Nếu bạn đang là một nhân viên kiểm thử phần mềm, bạn có thể biết rằng đã có một quan niệm sai lầm về kiểm thử rằng người kiểm thử chịu trách nhiệm bắt tất cả các lỗi trong hệ thống. Người kiểm thử được coi là người gác cổng hoặc thủ môn. Khi có bất kỳ bug nào bị lọt đến chỗ khách hàng và gây tổn thất như doanh số, uy tín của công ty, khách hàng tiềm năng, ... lúc này người kiểm thử thường sẽ là tiêu điểm mà cả dự án "quan tâm" đến.

Để lọt bug rất là phiền, nhưng có những lý do đằng sau nó. Hãy cùng xem xét những lý do phổ biến nhất và đưa ra các giải pháp có thể giúp chúng ta khắc phục tình trạng này và không để bug xuất hiện trong phiên bản cuối cùng gửi đến khách hàng vì lý do tương tự đã gặp.

### #1. Tôi đã để lọt bug vì tôi đã không kiểm tra nó

Điều này là hiển nhiên thôi.

Nếu tôi đã không kiểm tra một tính năng, một thành phần hoặc có thiếu xót trong khi liệt kê ra các trường hợp thử nghiệm, sẽ có nhiều khả năng các bug sẽ được chuyển đến tay khách hàng.

- Tất nhiên, có một số lý do khiến tôi không thử nghiệm một tính năng, tôi có thể quên kiểm tra một tính năng hoặc các TCs của tôi chưa đầy đủ, chưa cover được hết các trường hợp cần phải kiểm thử.
- Tôi đã không phân tích được những thay đổi được thực hiện bởi các nhà phát triển.
- Các bạn Dev chỉ đơn giản nghĩ rằng những thay đổi đó là nhỏ, do đó không cần kiểm thử/ kiểm thử lại.
- Tôi đã không nhận thức được tính năng đã thay đổi và dự án không thông tin gì về thay đổi này đến với nhân viên kiểm thử.

**Phải làm gì để cải thiện?**

- Theo dõi mọi thay đổi có thể có trong hệ thống trong mỗi bản build mới, đặc biệt là các thay đổi trên các thành phần quan trọng hoặc thay đổi vào phút cuối. 
- Hỏi và làm rõ về vùng ảnh hưởng của những thay đổi, đưa ra những rủi ro nếu bỏ qua thực hiện kiểm thử đối với những thay đổi đó. Thông điệp quan trọng cần truyền tải ở đây là về rủi ro, chất lượng của hệ thống trong tương lai.

### #2: Tôi đã chưa cover được hết các trường hợp cần phải kiểm thử

Bug rất thích chơi trốn tìm. Chúng thường trốn rất kĩ những người thử nghiệm, vì vậy nó không dễ để bắt chúng. Nó đòi hỏi một chút nỗ lực để khám phá chúng.

Về mặt kỹ thuật, phần mềm ngày càng phức tạp hơn để phục vụ và đáp ứng nhu cầu kinh doanh trong cách mạng công nghiệp 4.0. Là người thử nghiệm Blackbox, nếu chúng ta không nhận thức được hệ thống phức tạp như thế nào hoặc các thành phần của nó hoạt động cùng nhau như thế nào. Kết quả là, chúng ta sẽ không thiết kế đầy đủ các trường hợp cần phải kiểm thử và tìm được bug thường ẩn bên trong các xử lý.

**Phải làm gì để cải thiện?**

- Là nhân vên kiểm thử, bạn cần kiểm thử sản phẩm như người dùng cuối để hiểu cách họ thường sử dụng sản phẩm. Đôi khi, hành vi của họ thật kỳ lạ, nhưng bạn biết không, đó là cách họ sử dụng phần mềm. Đảm bảo rằng chúng ta đáp ứng được yêu cầu của họ khi dùng sản phẩm.
- Tìm hiểu để biết căn bản về mặt kỹ thuật thì hệ thống hoạt động như thế nào. Trong nhiều trường hợp, chúng ta không cần phải biết cách các thành phần "nói chuyện" với nhau hoặc hiểu từng dòng mã. Tuy nhiên, hiểu hệ thống từ quan điểm kỹ thuật có thể giúp chúng phát hiện các bug "xịn".
- Nếu bạn có nhiều thời gian, hãy dành nhiều thời gian hơn để thiết kế các trường hợp kiểm thử mà kết hợp nhiều xử lý càng tốt. Tất nhiên, làm điều này sẽ tốn thời gian và công sức của bạn, nhưng nếu nó xứng đáng với nỗ lực của bạn, chỉ cần làm điều đó.

### #3. Tôi đã bỏ lỡ các bug hiển nhiên

Thật kỳ lạ, bug bị lọt thường cũng là bug hiển nhiên, nó là những bug đang ở ngay trước mắt chúng ta, nhưng tôi đã không nhận ra chúng.

Thật đau đớn. Tôi biết, nhưng điều đó có thể xảy ra mọi lúc. Tại sao vậy?

Có một số lý do tại sao bạn đã không thấy các lỗi rõ ràng như vậy:

- Bạn có thể quá tập trung vào việc thử nghiệm một khu vực cụ thể của hệ thống mà bạn thậm chí không quan tâm để tìm kiếm các vấn đề trong các chức năng liên quan khác, nên đã bỏ lỡ các bug rõ ràng trên màn hình.
- Bạn đã thực hiện kiểm thử với cùng một lối tư duy để kiểm tra một tính năng nhiều lần.

**Phải làm gì để cải thiện?**

- Thành thật mà nói, tôi không chắc chắn làm thế nào để giải quyết vấn đề này, những gì tôi có thể đề nghị là luôn luôn giữ tâm trí ở chế độ "soi" để có thể phát hiện bug trên màn hình
- Bạn cũng có thể thử tiếp cận hệ thống từ một góc nhìn khác, áp dụng các kỹ thuật khác nhau để thực hiện kiểm thử hệ thống.

### #4. Tôi bị áp lực về thời gian

Ngày nay, nó càng trở nên phổ biến khi chúng ta cần đưa phần mềm ra thị trường càng sớm càng tốt nhưng vẫn phải đảm bảo chất lượng. Như vậy nhóm kiểm thử thường chịu áp lực phải hoàn thành công việc trong một khoảng thời gian ngắn (bằng cách làm thêm giờ hoặc bỏ qua một số trường hợp kiểm thử). Ngay cả khi bạn đủ siêng năng để chọn tùy chọn đầu tiên, bạn chắc chắn sẽ vội vàng và khó để đảm bảo được.

Đương nhiên, khi bạn đang vội, bạn bỏ qua một vài thứ và khi bạn đã bỏ qua bất cứ điều gì, khả năng cao là bạn đã để lọt bug.

**Phải làm gì để cải thiện?**
- Trên thực tế, giải pháp là tìm cách để các nhân viên kiểm thử KHÔNG phải chịu áp lực trong công việc :D
- Nếu thời gian đã được ấn định, hãy trao đổi với nhóm phát triển để cắt giảm một vài trường hợp kiểm thử và thực hiện phân tích rủi ro. Ý tưởng là trình bày những gì bạn có thể kiểm thử (có thể theo độ ưu tiên các các chức năng, bỏ qua chức năng có rủi ro thấp), những gì không thực hiện kiểm thử và những rủi ro có thể xảy ra nếu chúng ta không thực hiện kiểm thử những chức năng / thành phần đó.
- Mở rộng nhóm nhân viên kiểm thử của dự án, để có khả năng thực hiện kiểm thử kỹ lưỡng hơn trong thời gian ngắn hơn.

### #5. Tôi đã thấy vấn đề nhưng đã không báo cáo nó

Ngay khi bạn gặp vấn đề, hãy báo cáo ngay lập tức. Đó được xem là kinh nghiệm/ nguyên tắc chung, một câu thần chú khi nói đến thử nghiệm. Tuy nhiên, đôi khi những nhân viên kiểm thử đã không làm vậy.

- Đã bao nhiêu lần khi bạn tìm thấy một bug, bạn tự nghĩ sẽ báo cáo sau. Nhưng sau đó, bạn chuyển sang một nhiệm vụ khác, một nhiệm vụ khác, và sau đó đã trở thành không bao giờ. Bạn hoàn toàn quên mất việc báo cáo bug này và thật đáng buồn là con bug đó sẽ quay lại và "cắn" bạn. 
- Nhân viên kiểm thử không chắc đó có phải là bug không. Vì vậy, anh ta nghĩ không báo cáo nó.
- Nhân viên kiểm thử đã quá mệt mỏi với một danh sách các bug dài bất thường ngày hôm đó, rằng bug cuối cùng được coi là không đáng kể và do đó cuối cùng không được báo cáo.
- Trong các trường hợp khác, bạn không đủ tự tin để báo cáo (Ví dụ:bug này nhỏ thôi, tôi không muốn làm phiền các bạn Dev) hoặc bạn đánh giá thấp tầm quan trọng của bug thấp (Ví dụ: bug này có mức độ nghiêm trọng thấp, không ai quan tâm đâu, vì vậy hãy bỏ qua nó). Kết quả là bạn quyết định không báo cáo nó. 

Và vấn đề ở đây là bug không quan trọng (với bạn) hóa ra là một bug nghiêm trọng (với ai đó). Hãy nhớ, một bug không quan trọng đối với bạn, điều đó không nhất thiết có nghĩa là nó không quan trọng với những người khác.

**Phải làm gì để cải thiện?**

Nếu bạn nghĩ rằng nó là một bug, chỉ cần báo cáo nó (tất nhiên, luôn luôn làm rõ trong báo cáo bug của bạn với lý do tại sao bạn nghĩ rằng đó là một bug). 

### #6. Tài liệu dự án không được cung cấp đầy đủ

Đôi khi, nguyên nhân gốc của sự để lọt bug có thể được tìm thấy trong các giai đoạn sớm nhất của các dự án thử nghiệm, nó đến từ tài liệu về nghiệp vụ dự án không đúng/ đầy đủ. Nếu tài liệu không bao gồm tất cả các chức năng được đưa vào sử dụng sau này, người kiểm thử sẽ không thể thiết kế các trường hợp kiểm thử bao gồm các chức năng này khi kiểm thử.

**Phải làm gì để cải thiện?**

- Tài liệu về nghiệp vụ dự án rất quan trọng, tất cả tài liệu đặc tả và các trường hợp thử nghiệm phải được chuẩn bị đầy đủ và rõ ràng, bao gồm tất cả các chức năng và kịch bản người dùng.
- Khi các yêu cầu thay đổi, hãy đảm bảo rằng bạn đã xem xét và cập nhật các trường hợp thử nghiệm của mình.

### Kết luận

Là người kiểm thử, công việc của chúng ta  là kiểm thử sản phẩm và cung cấp thông tin có giá trị cho nhóm dự án về sản phẩm. Trong một số trường hợp, chúng tôi đóng vai trò là cánh cổng cuối cùng để đánh giá sản phẩm trước khi nó đến tay khách hàng. Nó có nghĩa là rất áp lực khi chúng ta để lọt một bug. Tuy nhiên, nhân viên kiểm thử cũng chỉ là con người và giống như mọi người nói rằng chúng ta không hoàn hảo. Chúng ta sẽ phạm sai lầm lúc này hay lúc khác. Một số có thể mắc nhiều lỗi hơn những người khác nhưng không sao cả, chúng ta sẽ cải thiện điều này.

Với tư cách là nhân viên kiểm thử, hãy xem những thiếu sót trên này như là một cơ hội để xem xét lại quy trình kiểm thử và xem vấn đề thực sự ở đâu và ngăn chặn nó xảy ra trong tương lai.

>  Bài viết đươc tham khảo từ nguồn **[AskTester](https://www.asktester.com/5-simple-reasons-missed-bugs-prevent/)**