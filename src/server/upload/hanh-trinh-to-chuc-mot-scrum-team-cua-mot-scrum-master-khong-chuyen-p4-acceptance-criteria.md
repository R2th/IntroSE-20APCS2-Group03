Để một scrum-team vận hành tốt, đáp ứng được yêu cầu của khách hàng trong việc sản xuất phần mềm thì ngoài việc đảm bảo vận hành phù hợp nhất với quy trình (phù hợp thôi chứ không thể áp đặt 100% phải giống được), scrum-master có thể hỗ trợ team bằng cách đưa ra các định nghĩa, các khái niệm, ví dụ để team làm việc theo. 

Một scrum-master có nhiều kinh nghiệm sẽ có "giá" càng cao trên "thị trường chuyển nhượng"  là do họ có cả một "kho tàng" về cách thức vận hành, cách thức viết đầu bài, kết nối giữa các thành viên trong team, đưa ra các chuẩn làm việc chung giữa các team với nhau trong cùng công ty.

Trong bài viết này, tôi sẽ trình bày về một khái niệm là: "Acceptance criteria" và cách đưa AC vào công việc.


# Định nghĩa

## Định nghĩa "máy móc"
Tiêu chí chấp nhận (Acceptance Criteria) là tập hợp các kịch bản kiểm thử được xây dựng để đảm bảo phần mềm hoạt động như mong đợi của người dùng, khách hàng.

Lưu ý: Tập hợp các kịch bản kiểm thử này có thể không cần chi tiết như test case (nhưng phỉa là tập con của test case)

Ví dụ: 

**User story**: Là một người dùng, tôi muốn có chức năng đăng ký trực tuyến, để tôi có thể bắt đầu mua hàng online.

Chúng ta có thể tạo thành các AC như sau: 

![](https://images.viblo.asia/9a168d72-4a90-47f3-b13c-e0d766111124.png)


## Định nghĩa đơn giản

Tiêu chí chấp nhận (Acceptance Criteria) là một danh sách hoặc checklist hoặc các gạch đầu dòng mô tả, đại diện cho các yêu cầu (dưới dạng các kết quả mong muốn) của khách hàng cho mỗi user-story/task. 

Các tiêu chí chấp nhận (Acceptance Criteria) thường chỉ có hai trạng thái PASS/FAIL
PASS: Xác nhận hoàn thành
FAIL: Chưa hoàn thành

(đây là lý do tại sao ở hình ảnh phía trên có hình checkbox)

Trong quy trình phát triển phần mềm, chỉ khi tất cả các Acceptance criteria trong user-story/task được xác nhận hoàn thành mới có thể chuyển giao user-story/task sang các trạng thái công việc khác.

![](https://images.viblo.asia/e73d8fe2-ee6b-4240-b308-1222fe528d55.png)


# Tại sao Acceptance criteria lại quan trọng

![](https://images.viblo.asia/b628a738-2254-47c4-a221-1e765df571ee.png)

Acceptance criteria: Đại diện cho các yêu cầu của khách hàng về sản phẩm trong mỗi giai đoạn

Trong mỗi giai đoạn, muốn chuyển giao được sản phẩm cho khách hàng thì sản phẩm phải thỏa mãn được hết các yêu cầu đại diện.

Sản phẩm sẽ thất bại hoặc khách hàng sẽ không chấp nhận nếu như nhóm phát triển không đáp ứng được yêu cầu đại diện.

--> Khi xác định rõ các tiêu chí chấp nhận ngay từ đầu thì team sẽ đảm bảo chất lượng sản phẩm và độ hài lòng của khách hàng cao hơn. 

# Mục đích sử dụng acceptance criteria 

**Xác định ranh giới**: Acceptance criteria giúp team phát triển định nghĩa được ranh giới của các story/task.  

Nói cách khác AC sẽ giúp team có được “confirm” như thế nào là ứng dụng/chức năng đã hoạt động như mong muốn. Điều này có nghĩa là story/task đã hoàn thành. 

**Đạt được sự đồng thuận**: Acceptance criteria sẽ cung cấp tiếng nói chung giữa nhóm phát triển và khách hàng. 

Khách hàng biết những kỳ vọng nào của mình sẽ được đáp ứng và nhóm phát triển biết chính xác những điều kiện cần phải đáp ứng khách hàng.

**Làm cơ sở cho xây dựng test-case**: Acceptance criteria là các tiêu chí kiểm thử ở mức độ nhỏ nhất (điều kiện tối thiểu) để đảm bảo hệ thống hoạt động như mong đợi. 

Từ các tiêu chí này, tester sẽ mở rộng các trường hợp để xây dựng lên các test-case chi tiết hoặc test-plan, automation-test. 

**Là các tiêu chí để lập kế hoạch và dự toán chi phí**:  Các kịch bản acceptance criteria hỗ trợ việc chia tách chính xác story/task ra thành các task/subtask. Từ đó có thể thực hiện lên kế hoạch, ước tính chi phí chính xác. (Chi phí ở đây là thời gian hoàn thành, số lượng nhân sự cần thiết,...)

# Sử dụng acceptance criteria như thế nào

Các **Acceptance criteria** được đưa vào phần mô tả của các story/task

Lập trình viên khi thực hiện phát triển các module/sản phẩm sẽ thực hiện “kiểm thử” các chức năng theo như các acceptance criteria. (Yêu cầu tối thiểu để chuyển giao trạng thái các story/task)

Tester dựa vào acceptance criteria để xây dựng các test-case. (Acceptance criteria là tập con của test-case) 


# Khi nào nên tạo Acceptance criteria

Các Acceptance criteria cần được tạo/review/confirm trước khi các lập trình viên bắt đầu lập trình/tester bắt đầu thực hiện công việc của mình.

--> Để giai đoạn phát triển phần mềm có thể bắt đầu, team và product owner nên thỏa thuận về mức độ tối thiểu của acceptance criteria.

**Lý do**

Khi các tiêu chí chấp nhận đã được định nghĩa rõ ràng: 
- Dev/tester sẽ không phải trao đổi qua lại với BA/PO về kỳ vọng của khách hàng với sản phẩm.
- Tester sẽ viết ra test case chính xác.
- Dev/tester sẽ không phải chuyển qua lại trạng thái Developing/Testing. 
- Team hiểu rõ các tính năng của hệ thống hoạt động như thế nào.

# Ai là người tạo Acceptance criteria

Các Acceptance criteria thường do PO/Khách hàng tạo ra khi đưa ra yêu cầu với nhóm phát triển.

BA sau khi tiếp nhận các yêu cầu sẽ thực hiện “dịch” ra ngôn ngữ “kỹ thuật” hoặc format chung và đưa ra các ra Acceptance criteria phù hợp với quy chuẩn chung của đội ngũ phát triển.

Dev có thể cũng là người đưa ra các acceptance criteria nếu như họ thấy các AC trong đề bài vẫn chưa đủ hoặc có những yêu cầu vô lý. 
Nhưng cần lưu ý là các AC phát sinh phải là tập con của các test-case

Nếu như các Acceptance criteria không xuất phát từ PO mà do team phát triển xây dựng trong các buổi "Refinement metting" (làm rõ yêu cầu đầu bài)  thì nên được PO/ “người chịu trách nhiệm” review để loại bỏ những yêu cầu thừa, không cần thiết.

# Định dạng của Acceptance criteria
Mỗi công ty phần mềm sẽ có các định dạng đầu bài khác nhau nên định dạng của AC cũng muôn hình vạn trạng :), cá nhân tôi thường gặp 2 loại sau: 

**Rules-oriented**: Checklist – a form of list

**Scenario-oriented**: Given/When/Then (GWT) type



## Rules-oriented: Checklist – a form of list

```
When I <input> X and <process> Y, I will check for <outcome> as the result
```

**Outcome/Result**: Danh sách các acceptance criteria 

Ví dụ: 


User story: As a credit card holder, I want to view my statement (or account) balance, so that I can pay the balance due.

Acceptance criteria: 

- Display statement balance upon authentication. Say for example $1560
- Display total balance. For example $3560. Here the balance due from the current period is $2560 and past balance due is $2000.
- Show Minimum payment due. For example $140
- Show Payment due date. For example May 16th of the current month
- Show error message if service not responding or timeout. For example ‘Sorry, something went wrong with the service. Please try again.’

![](https://images.viblo.asia/90baefd2-b287-4eab-aa2b-76a7df177987.png)


## Scenario-oriented: Given/When/Then (GWT) type


```
Given <some precondition/context> When <I do some action> Then <I expect some result>
```

```
Given <some precondition/context> 
When <I do first action> AND <I do second action>
Then <I expect first result> AND <I expect second result>
```

GWT type thường được dùng trong behavior-driven development (BDD) – phát triển phần mềm hướng hành vi & được xây dựng để sẵn sàng cho viết automantion-test.
Có hẳn 1  riêng hướng dẫn cách làm GWT type: 

Ví dụ: 

User story: Là một người dùng, tôi muốn có chức năng lấy lại mật khẩu cho tài khoản của tôi, để tôi có thể truy cập vào tài khoản khi tôi quên mật khẩu.

![](https://images.viblo.asia/ecb41382-65a8-4f03-824c-c058e0d3b576.png)

![](https://images.viblo.asia/4671a7ba-7653-4cd9-8716-127eaba712b0.png)


GWT type thường được viết thay thế luôn đề bài của các task/sub-task trong story/task. 

Tuy nhiên cách làm này có nhược điểm: 
- Tốn nhiều thời gian để xây dựng xong đề bài chi tiết.
- Khó khăn cho những người mới tiếp cận hoặc người không thuộc role PO/BA

Vì vậy, thường GWT type được áp dụng trong các công ty...có quy mô lớn. Ở Việt Nam, rất ít công ty sử dụng GWT, tuy nhiên các bạn có thể tham khảo cách làm này tại đây https://docs.behat.org/en/v2.5/guides/1.gherkin.html



---
Khi bắt đầu build team, việc lựa chọn chuẩn làm việc chung là việc vô cùng quan trọng. Trên cương vị một scrum master, bạn hãy cố gắng tư vấn thật tốt cho team của mình những gì cần làm nhé. 

Cảm ơn các bạn đã đọc bài viết của tôi.