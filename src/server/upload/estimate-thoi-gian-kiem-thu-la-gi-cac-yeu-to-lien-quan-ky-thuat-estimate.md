Cần có ít nhất một ước tính sơ bộ về tổng chi phí cho các hoạt động kiểm thử cũng như ngày hoàn thành kiểm thử. Estimate Test được sử dụng để ước tính nỗ lực, chi phí và thời gian để kiểm thử. Ước tính chính xác nỗ lực kiểm thử và timeline giúp lập kế hoạch dự án tốt hơn.
Các ước tính kiểm thử cần thiết:

-	Bao gồm đầu vào từ những QA có kinh nghiệm
-	Đã được chấp thuận hoặc có sự đồng thuận bởi tất cả những người tham gia
-	Cung cấp các giá trị định lượng của chi phí phát sinh, các nguồn lực cần thiết, các nhiệm vụ cần thực hiện và mọi người tham gia
-	Cung cấp ước tính chi phí, thời gian và nỗ lực cho mọi hoạt động

Trong quản lý dự án, cách tốt nhất đối với estimate nỗ lực là thiết lập tốt nó. Estimate Test được xem như hoạt động kiểm thử bắt buộc trong mỗi dự án.

Điều đó sẽ bao gồm tất cả các hoạt động kiểm thử được đưa ra dưới đây:
* Lập kế hoạch và giám sát việc kiểm thử.
* Phân tích kiểm thử.
* Thiết kế kiểm thử.
* Thực hiện và thực thi kiểm thử.
* Đánh giá tiêu chuẩn kết thúc và báo cáo.
* Các hoạt động kết thúc kiểm thử.

Các nhóm quản lý thường quan tâm nhất đến các mốc thời gian thực hiện kiểm thử vì kiểm thử phần mềm thường nằm trên lộ trình quan trọng của kế hoạch dự án.

Nhưng ước tính thực hiện kiểm thử không dễ trình ra cũng như không chắc chắn, nếu chất lượng phần mềm kém hoặc tệ hơn, không xác định. Các ước tính cũng bị ảnh hưởng bởi mức độ quen thuộc của người đánh giá với hệ thống. Việc đưa ra con số tổng test case trong quá trình kiểm thử thường chỉ là dự đoán.

# Các yếu tố ảnh hưởng đến Estimate Test.


Nhiều yếu tố có thể ảnh hưởng đến chi phí phát sinh, nỗ lực cần thiết và thời gian kiểm thử . Ước tính phải được thực hiện bằng cách xem xét tất cả các yếu tố có thể, một số trong đó là:

* Mức chất lượng được mong đợi của sản phẩm.
* Độ lớn của hệ thống phải được kiểm tra.
* Thống kê từ các dự án kiểm thử trước đó, được tăng cường với dữ liệu tiêu chuẩn từ các dự án khác kiểm thử của các đơn vị khác.
* Các quy trình khác nhau như chiến lược kiểm thử, vòng đời sản phẩm, độ chính xác của  Estimate dự án , v.v.
* Cơ sở hạ tầng như công cụ kiểm tra, dữ liệu và môi trường, tài liệu dự án, sản phẩm của việc kiểm thử (test case, script, report...) có thể tái sử dụng.
* Những người như nhà quản lý, lãnh đạo kỹ thuật và phi kỹ thuật, mức độ cam kết của quản lý cấp cao, kỹ năng và sự ổn định của nhóm dự án, mối tương quan với các nhóm khác, kiến thức hiểu biết về lĩnh vực.
* Mức độ phức tạp trong các quy trình, công nghệ được sử dụng bởi số lượng các bên liên quan và sự tham gia phối hợp của họ.
* Nhu cầu nâng cao kỹ năng hoặc nâng cấp hạ tầng.
* Yêu cầu các quy trình, công cụ hoặc kỹ thuật mới được phát triển.
* Yêu cầu mua sắm các phần cứng tùy chỉnh hoặc số lượng lớn công cụ kiểm tra.
* Tuân thủ các tiêu chuẩn tài liệu mới.
* Kiểm tra dữ liệu trong thời gian nhạy cảm.

Trong khi lập Estimate, người quản lý kiểm tra nên xem xét chất lượng và tính ổn định của phần mềm sẽ được gửi cho họ để kiểm tra. Cách thực hiện tốt nhất như tích hợp liên tục và tự động hóa kiểm thử đơn vị được sử dụng trong giai đoạn phát triển, nó sẽ giúp giảm 50% các lỗi trước khi kiểm thử. Phương pháp Agile cũng đã được báo cáo để sản xuất sản phẩm chất lượng cao để kiểm thử bằng cách loại bỏ các sai hỏng.
# Kỹ thuật Estimate Test

Người quản lý kiểm thử có thể sử dụng cách tiếp cận từ trên xuống( **top-down**) hoặc từ dưới lên( **bottom-up**) để ước lượng thời gian Test bằng một hoặc nhiều phương pháp sau:

1.  Các kinh nghiệm đã có trước đó và dự đoán có cơ sở.
2.  Work Breakdown Structure(WBS) : Cấu trúc phân chia công việc(WBS) , link tài liệu mô tả chi tiết về phương pháp này (https://www.workbreakdownstructure.com/) .
3.  Tổ chức nhiều phiên như Wide Band Delphi theo ước tính : WBS được phân phối cho một nhóm gồm 3-7 thành viên để estimate lại các task. Ước tính cuối cùng là kết quả cuối cùng của việc re-estimate của dự án là dựa trên sự đồng thuận của các thành viên trong nhóm.
4. Quy chuẩn tổ chức và thông qua thực hành tốt nhất.
5.  Tỷ lệ số lượng nhân viên dự án so với số người kiểm thử.
6.  Dữ liệu lịch sử liên quan đến chi phí, nỗ lực, thời gian, chu kỳ hồi quy, v.v. từ các dự án kiểm thử trước đó.
7.  Đánh điểm/trọng số cho các chức năng của phần mềm để từ đó ra được số Function Point(FP).

Sau khi ước tính được thực hiện, nó phải được báo cáo cho ban quản lý, cùng với dữ liệu đi kèm để đưa ra được các ước tính đó. Có thể có một số cuộc thảo luận sau này, dẫn đến việc sửa đổi Estimate.
Trong một kịch bản lý tưởng, ước tính cuối cùng sẽ cân bằng kỳ vọng của cả đội và nhóm dự án về chất lượng sản phẩm, lịch trình dự án, ngân sách và tính năng sản phẩm. Cần phải nhớ rằng mọi ước tính đều được chuẩn bị dựa trên tính khả dụng của dữ liệu trong trường hợp đó. Trong giai đoạn sơ bộ của dự án, lượng thông tin có sẵn sẽ khá ít. Nếu nhận được nhiều thông tin liên quan hơn khi dự án tiến triển, các ước tính phải được cập nhật để giữ cho chúng chính xác.

**Kết luận**

Qua bài viết trên ta hiểu được về khái niệm Estimate là gì? và những yếu tố ảnh hưởng mà nó đi kèm cũng như tầm quan trọng của nó trong quản lý kiểm thử nói riêng và quản lý phát triển sản phẩm nói chung.

Link tài liệu tham khảo: http://tryqa.com/what-is-test-estimation-factors-and-techniques/