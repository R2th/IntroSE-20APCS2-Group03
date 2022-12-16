### 1. Agile Testing là gì?

![](https://images.viblo.asia/501c7777-60f2-4db8-ad5e-fbdc696f37a4.png)

AGILE TESTING là một phương pháp kiểm thử phần mềm tuân theo các nguyên tắc của mô hình phát triển phần mềm agile. Không giống như mô hình phát triển phần mềm Waterfall, mô hình phát triển phần mềm Agile yêu cầu việc kiểm thử phải được tiến hành ở các giai đoạn phát triển ban đầu. Kiểm thử Agile không phải là tuần tự mà là một quá trình liên tục.

**Theo định nghĩa của ISTQB foudation**<br>

Agile testing: Thực hiện kiểm thử cho một dự án bằng cách sử dụng các phương pháp luận phát triển phần mềm Agile, kết hợp các kỹ thuật và phương pháp, chẳng hạn như extreme programming (XP), coi việc phát triển là khách hàng của kiểm thử và nhấn mạnh mô hình thiết kế ưu tiên kiểm tra. 
 
### 2. So sánh waterfall và Agile

![](https://images.viblo.asia/160a5e12-15c0-4810-8fa3-5ca00bf93ff2.png)


| Agile testing | Waterfall testing | 
| -------- | -------- | 
| Lập kế hoạch kiểm tra là tối thiểu và quy trình kiểm tra ít cấu trúc hơn.     |  Lập kế hoạch kiểm tra kỹ lưỡng và quy trình kiểm tra có tính cấu trúc cao.  | 
| Kiểm thử được tiến hành khi bắt đầu (gần như song song với) phát triển phần mềm. Nói cách khác là kiểm thử tăng trưởng và liên tục và liên tục. |  Kiểm thử chỉ được tiến hành sau khi hoàn thành giai đoạn phát triển. Nói cách khác, kiểm thử là tuần tự.| 
| Có rất ít tài liệu kiểm thử. |  Tài liệu kiểm thử, như test plan, test cases, rất phức tạp.| 
|  Việc thay đổi yêu cầu thường xuyên đặt ra một thách thức đối với việc kiểm thử. Khi dự án tiến triển, người ta cần phải thích nghi (thậm chí có thể ứng biến.)|  Các thay đổi yêu cầu ít có khả năng sẽ làm giảm bớt quá trình kiểm thử.| 
|  Kiểm thử chấp nhận được tiến hành vào cuối mỗi lần lặp / sprint. Phản hồi của khách hàng là liên tục và cũng rất bất ngờ đến từ những package nhỏ có thể được xử lý dễ dàng.|  Việc kiểm tra nghiệm thu chỉ được tiến hành ở phần cuối của dự án. Phản hồi của khách hàng đến muộn và rủi ro nhận được gây bất ngờ lớn, có thể kèm theo chi phí khổng lồ.| 
| Người kiểm thử và nhà phát triển làm việc chặt chẽ. Cả hai đều đảm nhận vai trò ĐỐI TÁC VỀ CHẤT LƯỢNG. |  Người kiểm thử và nhà phát triển làm việc riêng biệt. Người kiểm thử đảm nhận vai trò NGƯỜI ĐẢM BẢO CHẤT LƯỢNG| 

### 3. Giá trị của kiểm thử Agile

![](https://images.viblo.asia/925a8139-0181-4484-b266-e0a3a8b5208e.png)

<br>

* **Cá nhân hóa và tương tác qua các quy trình và công cụ:**  <br>
Điều này có nghĩa là những người linh hoạt và giao tiếp được đánh giá cao hơn các quy trình và công cụ cứng nhắc. Tuy nhiên, điều này không có nghĩa là Agile testing bỏ qua các quy trình và công cụ. Trên thực tế, Agile testing được xây dựng dựa trên các quy trình rất đơn giản, mạnh mẽ và hợp lý như quy trình tiến hành cuộc họp hàng ngày hoặc chuẩn bị xây dựng hàng ngày. Tương tự, Agile testing cố gắng tận dụng các công cụ, đặc biệt là để tự động hóa kiểm thử, càng nhiều càng tốt. Tuy nhiên, cần phải hiểu rõ ràng rằng người kiểm thử là người điều khiển các công cụ đó và kết quả đầu ra của các công cụ phụ thuộc vào người kiểm thử chứ không phải ngược lại.
* **Phần mềm làm việc trên tài liệu toàn diện:**  
Điều này có nghĩa là phần mềm có chức năng và khả dụng được đánh giá cao hơn tài liệu toàn diện nhưng không sử dụng được. Mặc dù điều này hướng nhiều hơn đến các thông số kỹ thuật yêu cầu trả trước và thông số kỹ thuật thiết kế, nhưng điều này cũng có thể đúng với các kế hoạch kiểm thử và các trường hợp kiểm thử. Mục tiêu chính của chúng tôi là hành động tự kiểm tra và không phải bất kỳ tài liệu phức tạp nào cũng chỉ hướng đến mục tiêu đó. Tuy nhiên, tốt nhất là bạn nên chuẩn bị sẵn tài liệu cần thiết để 'bức tranh' được rõ ràng và 'bức tranh' vẫn ở bên nhóm nếu một thành viên rời đi.
* **Hợp tác với khách hàng trong toàn bộ quá trình đàm phán hợp đồng:**  
Điều này có nghĩa là khách hàng tham gia thường xuyên và liên hệ chặt chẽ với tiến độ của dự án (không phải thông qua các báo cáo tiến độ phức tạp mà thông qua các phần mềm làm việc). Điều này tạo thêm một số gánh nặng cho khách hàng, những người phải cộng tác với nhóm thường xuyên (thay vì chỉ đợi đến khi kết thúc hợp đồng, hy vọng rằng việc bàn giao sẽ được thực hiện như đã hứa). Nhưng sự tham gia thường xuyên này đảm bảo rằng dự án đang đi đúng hướng chứ không phải xây dựng một con ếch khi dự án mong đợi một con cá.
* **Đáp ứng sự thay đổi so với việc tuân theo một kế hoạch:**
Điều này có nghĩa là chấp nhận những thay đổi như một lẽ tự nhiên và không ngần ngại đáp ứng chúng. Luôn luôn là tốt khi có một kế hoạch từ trước nhưng sẽ không tốt lắm nếu bạn phải tuân theo một kế hoạch, bằng bất cứ giá nào, ngay cả khi tình huống đã thay đổi. Giả sử bạn viết một trường hợp kiểm thử, đó là kế hoạch của bạn, giả sử một yêu cầu nhất định. Bây giờ, nếu yêu cầu thay đổi, bạn không phải than thở về việc lãng phí thời gian và công sức của mình. Thay vào đó, bạn nhanh chóng điều chỉnh trường hợp kiểm thử của mình để xác thực yêu cầu đã thay đổi.

### 4. Các nguyên tắc đằng sau Agile testing 

![](https://images.viblo.asia/1ceffc17-19de-4189-9384-89db04563b07.png)



| Các nguyên tắc | Ý nghĩa đối với Người kiểm thử  phần mềm | 
| -------- | -------- | 
| Ưu tiên cao nhất là làm hài lòng khách hàng thông qua việc phát hành sớm và liên tục các phần mềm có giá trị.| Ưu tiên cao nhất là làm hài lòng khách hàng thông qua việc phát hành sớm và liên tục phần mềm chất lượng cao .|
| Hoan nghênh các yêu cầu thay đổi, ngay cả khi phát triển muộn. Các quy trình Agle khai thác sự thay đổi vì lợi thế cạnh tranh của khách hàng.| Hoan nghênh các yêu cầu thay đổi, ngay cả khi kiểm thử muộn. Các quy trình Agile khai thác sự thay đổi vì lợi thế cạnh tranh của khách hàng.| 
| Bàn giao phần mềm hoạt động thường xuyên, từ vài tuần đến vài tháng, với ưu tiên khoảng thời gian ngắn hơn. | Bàn giao phần mềm chất lượng cao thường xuyên, từ vài tuần đến vài tháng, ưu tiên khoảng thời gian ngắn hơn| 
| Người kinh doanh và nhà phát triển phải làm việc cùng nhau hàng ngày trong suốt dự án.|Người kinh doanh, nhà phát triển và người kiểm thử phải làm việc cùng nhau hàng ngày trong suốt dự án.| 
| Xây dựng các dự án xung quanh những cá nhân có động lực. Cung cấp cho họ môi trường và sự hỗ trợ mà họ cần, và tin tưởng để họ hoàn thành công việc.| Xây dựng các dự án thử nghiệm xung quanh các cá nhân có động lực. Cung cấp cho họ môi trường và sự hỗ trợ mà họ cần, và tin tưởng để họ hoàn thành công việc.| 
| Phương pháp hiệu quả và hiệu quả nhất để truyền tải thông tin đến và trong đội phát triển là trò chuyện trực tiếp. | Phương pháp hiệu quả và hiệu quả nhất để truyền tải thông tin đến và trong đội kiểm thử là trò chuyện trực tiếp.| 
| Phần mềm làm việc là thước đo chính của sự tiến bộ.| Phần mềm chất lượng cao làm việc là thước đo chính của sự tiến bộ..| 
| Các quy trình Agile thúc đẩy sự phát triển bền vững. Các nhà tài trợ, nhà phát triển và người dùng sẽ có thể duy trì một tốc độ liên tục vô thời hạn.| Các quy trình Agile thúc đẩy sự phát triển và thử nghiệm bền vững . Các nhà tài trợ, nhà phát triển, người kiểm thử và người dùng sẽ có thể duy trì tốc độ liên tục vô thời hạn. | 
| Sự quan tâm liên tục đến sự xuất sắc về kỹ thuật và thiết kế tốt giúp tăng cường sự nhanh nhẹn.| Sự quan tâm liên tục đến sự xuất sắc về kỹ thuật và thiết kế kiểm thử tốt giúp tăng cường sự nhanh nhẹn.| 
| Sự đơn giản - nghệ thuật tối đa hóa khối lượng công việc chưa hoàn thành - là điều cần thiết. | Sự đơn giản - nghệ thuật tối đa hóa khối lượng công việc chưa hoàn thành - là điều cần thiết. | 
| Theo định kỳ, nhóm phản ánh về cách làm thế nào để trở nên hiệu quả hơn, sau đó điều chỉnh hành vi của mình cho phù hợp. | Theo định kỳ, nhóm kiểm thử phản ánh về cáchlàm thế nào để trở nên hiệu quả hơn, sau đó điều chỉnh hành vi của mình cho phù hợp.|


### 5. Thách thức của QA trong Agile

![](https://images.viblo.asia/f058a427-d777-46b6-8a7f-6c62956c2d75.png)

* Phát hiện lỗi nhanh hơn , tuy nhiên tài liệu ít được coi trọng, do đó gây nhiều áp lực cho QA
* Tính năng mới được đưa ra nhanh chóng, làm giảm thời gian để nhóm test có thời gian xấc định các tính năng mới đó có phù hợp với yêu cầu.
* Chu kì thực hiện execute test bị dồn lại nhiều hơn.
* Có ít thời gian để chuẩn bị test plan
* Chỉ có khoảng thời gian tối thiểu để thực hiện regression test
* Vai trò của QA có sự thay đổi từ người quản lý chất lượng thành partner của chất lượng .
* Luôn phải đối mặt với thay đổi và cập nhật liên tục


<br>
<br>



Tham khảo: <br>
https://softwaretestingfundamentals.com/agile-testing/ <br>
https://www.guru99.com/agile-testing-a-beginner-s-guide.html