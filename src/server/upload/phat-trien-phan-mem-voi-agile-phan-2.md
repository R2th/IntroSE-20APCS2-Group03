Các bài viết cũ cùng chủ đề:

[Phát triển phần mềm với Agile - Phần 1](https://viblo.asia/p/phat-trien-phan-mem-voi-agile-phan-1-QpmleQwklrd)

***

## So sánh Agile và Waterfall

| Tình huống | Agile | Waterfall |
|:--- |:--- |:--- |
| Quản lý dự án muốn thêm chức năng mới trong quá trình phát triển | Chức năng mới được bổ sung vào ngay backlog, có thể triển khai sớm đáp ứng các yêu cầu nghiệp vụ gần nhất. | Giai đoạn thiết kế và cấu trúc hệ thống đã được hoàn thành từ trước đó, nên hạn chế việc thêm các chức năng mới cho đến lần lên kế hoạch tiếp theo (thường 6 tháng 1 lần). |
| Khi test, phát hiện bug bắt buộc phải sửa ngay | Vấn đề được phát hiện sớm, dễ đánh giá thời gian sửa, có thể đưa vào lịch phát triển của sprint sau. | Vấn đề được phát hiện ở cuối giai đoạn phát triển, có thể ảnh hưởng đến toàn bộ code của project, khó đánh giá thời gian sửa, dễ làm chậm tiến độ. |
| Nhận feedback từ khách hàng | Feedback sẽ được phân tích và có thể triển khai ngay từ sprint sau | Feedback sẽ được ghi lại nhưng không được triển khai cho đến lần release tiếp theo |

## Agile và Extreme Programming

Một trong những phương pháp phát triển phần mềm đặc trưng của Agile là Extreme Programming (viết tắt là XP), bao gồm: lập trình theo cặp, kiểm thử tự động, chỉ làm các chức năng thực sự cần, tối giản hoá code, tương tác liên tục với khách hàng.

![eXtreme Programming](http://epf.eclipse.org/wikis/xp/xp/customcategories/resources/circleOfLife.jpg)

## Agile ở Pivotal

Với 25 năm kinh nghiệm sử dụng Agile, Extreme Programming được lan toả mọi bộ phận trong Pivotal, giúp chúng tôi thực hiện công việc hàng ngày:

* **9:00AM**:
	*Breakfast*
	Lấy thức ăn, nước ép hoa quả hay cafe và tán gẫu 1 chút với đồng nghiệp.	

* **9:06AM**:
	*Company Standup*
	Cập nhật nhanh thông tin về các sự kiện sắp tới, hỏi đáp 1 số vấn đề cần giúp đỡ (nếu có).
	
* **9:15AM**:
	*Team Standup*
	Chia sẻ với team về công việc hôm trước làm, và dự định công việc hôm nay làm.
	
* **9:25AM**:
	*Bắt đầu công việc*
	Thực hiện nghiên cứu khách hàng, tạo wireframe, thiết kế giao diện, tạo prototype, hướng dẫn khách hàng v.vv..	
	
* **12:30PM**:
	*Lunch* - *Tech talk*
	Thưởng thức bữa trưa và học thêm kiến thức mới về code, design, quy trình hay một startup mới.	
	
* **3:48PM**:
	*Ping Pong break!*
	(chắc là nghỉ ngơi giữa giờ, đánh bóng bàn v.vv..)
	
* **5:00PM**:
	*Weekly Team Retro*
	Thứ 6 hàng tuần, team sẽ ngồi thảo luận về những gì đã làm được, chưa làm đc, cải thiện thế nào trong tuần sau, với 1 chút bia hoặc rượu.
				
* **6:00PM**:
	*You're Done!*
	Chúng tôi ko làm việc thêm giờ, cũng ko làm việc vào cuối tuần. Riêng thứ 6 thì có vài thành viên Whiskey Club ở lại.
	
Theo nguyên lý Agile, chúng tôi luôn:

 * Tổ chức standup meetings và iteration planning meetings để thảo luận, sắp xếp mức độ ưu tiên và theo dõi công việc qua tool quản lý (Pivotal Tracker).
 * Sử dụng pair programming để đảm bảo chất lượng code.
 * Viết code, sau đó tự động test/deliver qua CI/CD tool (Concourse).
 * Deploy mọi thứ lên Pivotal Web Services hoặc Pivotal Cloud Foundry. 
 * Liên tục lặp lại với hệ thống quản lý dữ liệu (Pivotal Data Suite).

Ở Pivot, mọi quy trình lớn hay nhỏ đều được tối ưu hoá, mọi người làm việc trong từng team nhỏ để có thể phát huy được tốt nhất khả năng của mình và deliver sản phẩm ở tốc độ nhanh nhất.

> Productive people are happy people.

***
**Source**: *[Agile: The Way to Develop Great Software](https://pivotal.io/agile)*