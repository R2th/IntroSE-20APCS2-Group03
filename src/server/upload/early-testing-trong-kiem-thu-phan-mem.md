Theo như quan sát và thực tế thì hầu hết các bug sẽ được phát hiện, tìm thấy trong giai đoạn testing - kiểm thử. Nếu các bug này được tìm thấy trong quy trình phát triển phần mềm nhưng là sau khi hoàn thành các giai đoạn thì sẽ tốn nhiều chi phí để fix bug hơn so với việc bug được phát hiện và fix trong các giai đoạn đầu.

![](https://images.viblo.asia/9842d3fe-73e4-4b64-810e-661d6c132fa5.png)

*Hình 1. Quy trình phát triển phần mềm - Software development life cycle (SDLC).*

Một quy trình của vòng đời phát triển phần mềm thông thường bao gồm các bước:
- Trong SDLC, bước đầu tiên là “*Lập kế hoạch*”: Đây sẽ là kế hoạch chung cho toàn bộ dự án. Kết quả của bước này là các yêu cầu phải được hoàn thiện và bản kế hoạch cũng đã được chuẩn bị.
- Sau khi hoàn thiện các yêu cầu, chúng ta sẽ bắt đầu " *phân tích các yêu cầu đó*" và "*thiết kế hệ thống*" theo thời gian đã dự kiến.
- Trong kế hoạch này, tất cả các bước sau đều phụ thuộc vào các bước ở giai đoạn trước. Nếu các bước trước đó không hoàn thành thì các bước sau đó cũng không thể thực hiện. Ở bước này việc "*implement code*" sẽ được bắt đầu sau khi các công việc ở giai đoạn trước đã được hoàn thành.
- Cuối cùng sau khi hoàn thành việc implement cove việc kiểm thử sớm sẽ được bắt đầu.

Đây là quy trình chuẩn tuân theo SDLC. Nhưng nó có thể sẽ thay đổi tùy thuộc vào từng dự án cụ thể. Nhiều khả năng vòng đời dự án sẽ diễn ra như sau:
- Các công việc đã được lên kế hoạch không diễn ra suôn sẻ -> Cần thời gian để điều chỉnh kế hoạch.
- Phân tích, thiết kế và coding sẽ mất nhiều thời gian hơn so với thời gian đã ước tính -> gây ra các vấn đề không mong muốn khi thực hiện kế hoạch.

Nếu dự án nhỏ thời gian làm các task linh hoạt thì đây không phải là một vấn đề. Nhưng đối với các dự án lớn ngày release đã được lên lịch thì nó sẽ ảnh hưởng trực tiếp đến chất lượng của ứng dụng/phần mềm, vì lúc này không đủ thời gian để kiểm tra toàn bộ ứng dụng. 

=>  Hậu quả sẽ làm giảm sự uy tín của công ty. Nghiêm trọng hơn là chi phí để sửa các bug được tìm thấy ở giai đoạn này cao hơn nhiều so với tìm thấy ở giai đoạn đầu.
## Lợi ích về chi phí và lý do tại sao nên áp dụng kiểm thử sớm 
Để có hiệu quả về chi phí cao nhất team dự án nên bắt đầu việc kiểm thử sớm trong quá trình phát triển phần mềm.
![](https://images.viblo.asia/a6b091a2-c8fa-49a5-895c-92f214f66934.png)

*Hình 2. Biểu đồ chi phí cho việc fix bug.*

Vì:
- Trong giai đoạn *requirement* nếu chúng ta phát hiện các issue hoặc conflict trong chính các yêu cầu đó thì chúng ta sẽ không cần nhiều thời gian để giải quyết các vấn đề này. 
- Theo như biểu đồ, các bug được tìm thấy trong giai đoạn đầu của SDLC thì chi phí để sửa lỗi này sẽ rẻ hơn 50 lần so với sửa lỗi khi khách hàng test sản phẩm. Và sẽ là tốn kém hơn nếu bug được tìm thấy trong giai đoạn maintenance nghĩa là bug được tìm thấy sau khi sản phẩm đã được go live. Lúc này chi phí sẽ đắt gấp 100 lần.
## Ưu và khuyết của việc kiểm thử sớm
### ❆ Ưu điểm
- Thích hợp với mô hình thác nước.
- Team dự án có cái nhìn tổng quát về dự án và có thể định lượng được phạm vi các vấn đề có thể xảy ra. 
- Tester có nhiều thời gian test, sớm phát hiện ra các bug nghiêm trọng. Bên cạnh đó team dev cũng có nhiều thời gian fix lỗi hơn và chất lượng của sản phẩm sẽ được cải thiện đáng kể.
- Mở rộng phạm vi test và chu kỳ test hiệu quả.
- Hoàn thành việc viết testcase sớm sẽ giúp cho việc chỉnh sửa testcase và exe test dễ dàng hơn khi có các yêu cầu thay đổi.
- Team dev sớm hoàn chỉnh source code.
- Giảm thiểu tài nguyên (con người và chi phí) khi fix bug.
- Team quản lý có thể đưa ra các quyết định kinh doanh phù hợp với sự hiểu biết chuyên sâu về các lỗi nghiêm trọng chưa được giải quyết trong bản release hoặc bản Production.
- Việc phân bổ nhân sự giữa team dev và team test hiệu quả hơn.
### ❆ Khuyết điểm
- Không thích hợp với mô hình Agile/Scrum. Tuy nhiên, các mô hình này có thể áp dụng kiểm thử sớm trong từng Sprints với sự điều chỉnh thích hợp.
- Có khả năng làm sẽ giảm việc kiểm thử tích hợp -  Integration Testing của team dev.

## Kết luận
“***Chất lượng phải được xây dựng, không phải thêm vào***” -  *Quality is built in, not added on*. Vì vậy, việc thử nghiệm sớm nên được áp dụng ngay từ đầu khi dự án được bắt đầu và sẽ kết thúc khi dự án được release thành công.



---------------------------------------------------------------------------------------------------------------------------------------------
*Link tham khảo:*
- https://www.softwaretestinghelp.com/early-testing/ 
- https://www.softwaretestingclass.com/why-testing-should-start-early-in-software-development-life-cycle/ 
- http://softwaretestingtimes.com/2010/04/why-start-testing-early.html