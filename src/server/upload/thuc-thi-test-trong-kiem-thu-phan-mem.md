Thực thi test chắc chắn là giai đoạn quan trọng nhất sau khi thực hiện xây dựng kịch bản test trong toàn bộ vòng đời phát triển. Lý do là - sự đóng góp và công việc của mỗi thành viên trong nhóm / thành viên được xác nhận ở đây:
- BA đã giải thích các yêu cầu một cách chính xác hay chưa ?
- Đội ngũ phát triển đã dịch các yêu cầu nghiệp vụ thành các yêu cầu chức năng và cuối cùng và code chính xác?
- Kiến trúc sư dữ liệu và các DBA đã thiết kế các hệ thống back-end đúng chưa?

Vâng, execute test (thực thi test) là nơi tất cả các câu trả lời cho những câu hỏi này sẽ được tìm thấy. Điều đó làm cho chúng ta, QA là anh hùng của toàn bộ quá trình xây dựng phần mềm, phải không? 

![](https://images.viblo.asia/30a13ff8-91dc-46d9-a1ac-55a2460f5738.jpg)

## Các công việc cần thực hiện khi execute test: 

1. Bản  build sẵn sàng để được triển khai vào môi trường QA nói cách khác, được cài đặt và cung cấp cho môi trường QA là một trong những khía cạnh quan trọng nhất cần phải xảy ra để execute test bắt đầu.

2. Execute test được thực hiện trong môi trường QA . Để đảm bảo rằng nhóm developer làm việc độc lập với môi trường nơi nhóm QA đang thử nghiệm, thực tế chung là có một môi trường Dev và QA chuyên dụng. 

3. Quy mô nhóm thử nghiệm không đổi từ khi bắt đầu dự án. Khi tets plan được bắt đầu, nhóm có thể có một nhóm trưởng. Execute test là giai đoạn khi nhóm ở kích thước tối đa.

4.  Execute test  cũng xảy ra trong ít nhất 2 chu kỳ (3 trong một số dự án). Thông thường trong mỗi chu kỳ, tất cả các trường hợp thử nghiệm (toàn bộ bộ kiểm tra) sẽ được thực thi. Mục tiêu của chu trình đầu tiên là xác định bất kỳ sự ngăn chặn, defects quan trọng nào và hầu hết các defects có tính nghiêm trọng cao.
![](https://images.viblo.asia/c76f26d6-d8d2-4a8b-946e-d025a2da4101.jpg)

Mục tiêu của chu trình thứ hai là xác định các defects cao và trung bình còn lại, sửa các khoảng trống trong các tập lệnh và thu được kết quả.

5.  Execute test  bao gồm các giai đoạn 
- Thực thi các kịch bản thử nghiệm 
- Bảo trì kịch bản thử nghiệm  
- Báo cáo (defects, tình trạng, số liệu, vv) Vì vậy, khi lên kế hoạch cho giai đoạn này lịch trình và nỗ lực cần được tính toán có tính đến xem xét tất cả các khía cạnh. 

6.  Sau khi Test script  được thực hiện và AUT được triển khai - và trước khi thực hiện Kiểm tra bắt đầu, có một bước trung gian. Đây được gọi là Đánh giá sẵn sàng kiểm tra (TRR) . Đây là một loại bước chuyển tiếp sẽ kết thúc giai đoạn thiết kế thử nghiệm và giúp chúng tôi dễ dàng thực hiện thử nghiệm.

7. Ngoài TRR, có một vài kiểm tra bổ sung trước khi chúng tôi đảm bảo rằng chúng tôi có thể tiếp tục với việc chấp nhận bản dựng hiện tại được triển khai trong môi trường QA để thực hiện kiểm tra. 

Đó là Smoke và Sanity test . 

8.  Sau khi hoàn thành thành công các bài kiểm tra TRR,  Smoke và Sanity test, chu kỳ kiểm tra chính thức bắt đầu.

9. Thử nghiệm thăm dò (Exploratory Testing ) sẽ được thực hiện khi bản build đã sẵn sàng để thử nghiệm. Mục đích của thử nghiệm này là để đảm bảo các lỗi nghiêm trọng được loại bỏ trước khi các cấp độ thử nghiệm tiếp theo có thể bắt đầu. Thử nghiệm thăm dò này được thực hiện trong ứng dụng mà không có bất kỳ kịch bản thử nghiệm và tài liệu nào. Nó cũng giúp làm quen với AUT.

10.  Cũng giống như các giai đoạn khác của vòng đời phát triển phần mềm, công việc được chia cho các thành viên trong nhóm trong giai đoạn Thực hiện Thử nghiệm. Việc phân chia có thể dựa trên mô-đun khôn ngoan hoặc trường hợp kiểm tra đếm khôn ngoan hoặc bất cứ điều gì khác có thể có ý nghĩa.

11. Kết quả chính của giai đoạn thực hiện kiểm tra là ở dạng báo cáo chủ yếu là: Báo cáo tình trạng lỗi(Defect Report)  và báo cáo Tình trạng thực hiện kiểm tra(Test Execution Status ) . Quá trình chi tiết để báo cáo có thể được tìm thấy tại các báo cáo Thực thi thử nghiệm (Executions reports.) 
![](https://images.viblo.asia/93e88672-1122-4954-a37e-76aaf40f4233.png)


## Cột mới trong tài liệu trường hợp thử nghiệm

Tài liệu Test Case hiện được mở rộng với hai cột sau - Trạng thái và kết quả thực tế .

( Lưu ý : Đối với Thực thi thử nghiệm dự án trực tiếp, chúng tôi đã thêm và cập nhật các cột này với kết quả thực hiện thử nghiệm trong bảng tính trường hợp thử nghiệm được cung cấp để tải xuống bên dưới)

1. Cột trạng thái
Kiểm tra thực thi không là gì ngoài việc sử dụng các bước kiểm tra trên AUT, cung cấp dữ liệu kiểm tra (như được xác định trong tài liệu trường hợp kiểm tra) và quan sát hành vi của AUT để xem liệu nó có thỏa mãn kết quả mong đợi hay không.

Nếu kết quả mong đợi không được đáp ứng, nó có thể được hiểu là một khiếm khuyết. Và trạng thái của trường hợp thử nghiệm trở thành Lỗi Fail, và nếu kết quả mong đợi được đáp ứng, trạng thái là Pass Pass. Nếu trường hợp thử nghiệm không thể được thực thi vì bất kỳ lý do nào (một khiếm khuyết hiện tại hoặc môi trường không hỗ trợ), trạng thái sẽ là bị chặn.

Trạng thái của một trường hợp thử nghiệm chưa được chạy có thể được đặt thành Không chạy / chưa thực hiện hoặc có thể để trống.

Đối với trường hợp thử nghiệm có nhiều bước, nếu kết quả mong đợi của một bước nhất định (ở giữa các bước của trường hợp thử nghiệm) không được đáp ứng, trạng thái trường hợp thử nghiệm có thể được đặt thành ngay lập tức và không thực hiện được các bước tiếp theo.
Trạng thái có thể được chỉ định bằng màu đỏ, nếu bạn muốn thu hút sự chú ý đến nó ngay lập tức.

2. Cột kết quả thực tế
Đây là cột để ghi lại độ lệch trong kết quả dự kiến là gì. Khi kết quả mong đợi được đáp ứng (hoặc trường hợp thử nghiệm có trạng thái là Pass Pass, thì trường này có thể bị bỏ trống. Bởi vì, nếu kết quả mong đợi được đáp ứng, điều đó có nghĩa là kết quả thực tế = kết quả mong đợi, có nghĩa là viết lại nó trong cột kết quả thực tế sẽ là sự lặp lại và dự phòng.

Một ảnh chụp màn hình của độ lệch có thể được đính kèm vào cột này để tăng cường sự rõ ràng về vấn đề là gì.

Bài viết được dịch từ trang :
https://www.softwaretestinghelp.com/test-execution-software-testing-qa-training-on-a-live-project-day-5/