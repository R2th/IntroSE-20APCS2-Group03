Test plan là kế hoạch để thực hiện công việc kiểm thử của một dự án. Nó không phải là một đặc tả thiết kế kiểm thử (test design specification), không phải là một tập hợp các test case hay một bộ các quy trình kiểm thử. Trên thực tế, nhiều người cũng có các định nghĩa khác nhau cho test plan.

Tại sao cần phải viết test plan? Chúng ta có 3 lý do chính để viết test plan:

**Thứ nhất**, bằng việc viết test plan, nó sẽ dẫn lối cho suy nghĩ của chúng ta. Việc viết một test plan buộc chúng ta phải đối mặt với những thách thức đang chờ đợi và tập trung suy nghĩ của chúng ta vào các chủ đề quan trọng.

Fred Brooks giải thích tầm quan trọng của việc estimate và lập kế hoạch cho hoạt động kiểm thử trong một cuốn sách của mình như sau:

![](https://images.viblo.asia/7f18c7df-b377-4b69-9ed4-4944d3b18644.png)

“*Việc không có đủ thời gian để system test, đặc biệt, đặc biệt là thảm họa. Bởi vì sự delay lại đến vào cuối của schedule, không ai biết trước về sự cố này cho đến khi gần đến ngày giao hàng và sự chậm trễ tại thời điểm này gây ra những hậu quả nghiêm trọng về tài chính. Dự án có đầy đủ nhân lực và kinh phí tối đa cho mỗi ngày. Do đó, điều rất quan trọng là cho phép có đủ thời gian để system test trong schedule ngay từ ban đầu*.” [**Brooks, 1995**]

Bằng cách sử dụng một template để viết test plan giúp chúng ta ghi nhớ những đòi hỏi quan trọng. Bạn có thể sử dụng template test plan IEEE 829 được trình bày trong chương này, hoặc sử dụng những template của người khác hoặc tự mình tạo ra những template của riêng mình.

**Thứ hai**, quy trình lập test plan và bản thân kế hoạch đóng vai trò là phương tiện kết nối với các thành viên trong nhóm dự án, tester, đồng nghiệp, người quản lý và các bên liên quan khác.
Hoạt động giao tiếp này cho phép test plan có ảnh hưởng đến team dự án và ngược lại. Đặc biệt là trong lĩnh vực chính sách và động cơ kiểm thử trên phạm vi toàn bộ tổ chức: các phạm vi, mục tiêu quan trọng để kiểm thử; rủi ro về dự án và sản phẩm, cân nhắc hạn chế về nguồn nhân lực, các chiến lược và phương pháp đảm bảo thuộc tính chất lượng kiến trúc phần mềm. 
Chúng ta có thể hoàn thiện phương pháp giao tiếp này bằng cách lưu hành một hoặc hai bản nháp test plan và thông qua các cuộc họp đánh giá. Một bản nháp như vậy sẽ bao gồm các ký chú như sau: 

[***TBD: Jennifer: Xin vui lòng cho tôi biết kế hoạch release các mục kiểm thử vào test lab cho mỗi chu kỳ thực thi system test là gì***?]

[***Dave -  vui lòng cho tôi biết phiên bản nào của test tool sẽ được sử dụng cho các hoạt động regression test của các increment trước đó***]

Khi chúng tôi note hoặc ghi lại câu trả lời cho các loại câu hỏi này, test plan sẽ trở thành một bản ghi các cuộc thảo luận và sự thống nhất trước đó giữa người kiểm thử và team dự án.

**Thứ ba**, test plan giúp ta quản lý thay đổi. Trong giai đoạn đầu của dự án, chúng ta thu thập dữ liệu và rà soát lại các plan. Khi dự án phình to lên và tình hình thay đổi, chúng ta điều chỉnh lại kế hoạch cho thích nghi với quy mô.

Việc điều chỉnh plan ở các mốc quan trọng giúp chúng ta test kịp tiến độ với dự án. Và mỗi khi chúng ta chạy test, chúng ta tạo ra các thay đổi cuối cùng cho plan dựa vào kết quả test.

Bạn có thể sẽ ko có thời gian hoặc công sức để cập nhật test plan mỗi khi dự án có thay đổi, vì một số dự án khá là linh động. Vào những lúc đó, thì bạn nên viết nhiều test plan cho các tình huống khác nhau.

Ví dụ, khi chúng ta phải xử lý test ở mức tích hợp và hệ thống, mỗi loại test đó lại đc chạy ở giai đoạn khác nhau và có mục tiêu test khác nhau. Với một số dự án hệ thống, test plan cho phần cứng và test plan cho phần mềm sẽ  cần những kỹ thuật, công cụ khác nhau và dành cho các đối tượng khác nhau. Tuy nhiên, cũng có khả năng các test plan đó lại sẽ bị trùng nhau, do đó master test plan sẽ phải đc điều chỉnh lại để tránh bị trùng lặp quá nhiều.

**Template của test plan theo chuẩn IEEE 829:**

- Định danh test plan
- Sản phẩm test
- Giới thiệu
- Các task cần tes
- Các đối tượng cần test
- Môi trường cần thiết
- Các tính năng cần test
- Trách nhiệm
- Các tính năng ko cần test
- Số nhân công và đào tạo cần thiết
- Đưa ra tiến độ
- Các tiêu chuẩn pass/fail
- Rủi ro và các sự cố bất ngờ
- Tiêu chuẩn về thời gian treo và khởi động lại

Tài liệu tham khảo:
http://tryqa.com/what-is-the-purpose-and-importance-of-test-plans/