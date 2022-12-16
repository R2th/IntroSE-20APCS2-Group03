"DoD của bạn ở đâu?" Khi đặt câu hỏi này đối với agile team, đôi khi sẽ nhận được sự ngơ ngác của họ.

Definition of Done (DoD) và Acceptance Criteria list là những khái niệm quan trọng trong Agile, đặc biệt là scrum. Đó là hợp đồng ràng buộc những gì Chủ sở hữu sản phẩm (PO) muốn đội phát triển (team) cung cấp.

Definition of Done là một danh sách rõ ràng và súc tích các yêu cầu mà phần mềm phải tuân thủ để được coi là hoàn thành. Trong khi DoD thường được áp dụng cho tất cả các mục trong productbacklog thì acceptance criteria được áp dụng cho 1 user story cụ thể. Để hoàn thành Story thì cả DoD và Acceptance criteria phải được hoàn thành.

Đưa chúng lên giấy là việc đơn giản. Khó khăn thường nằm ở việc khiến cho nhóm phát triển thực sự chấp nhận và tuân theo. Vì vậy, nhóm có thể làm gì để đảm bảo rằng các tiêu chuẩn DoD và acceptance criteria được tôn trọng? Bắt đầu bằng cách đưa chúng vào quy trình công việc (workflow) của dự án. Và nếu nhóm phát triển đang sử dụng Jira, nhúng DoD và acceptance criteria list trực tiếp vào Jira ticket!

![](https://images.viblo.asia/6df128ef-531a-490a-b96f-202ddd4977c9.png)
### 1. Tạo một DoD tại Jira
Cách tốt nhất để có một DoD trong Jira là sử dụng một trường Tùy chỉnh ([Customer Field](https://confluence.atlassian.com/jira061/jira-administrator-s-guide/configuring-fields-and-screens/adding-a-custom-field)). Bạn có thể sử dụng ‘text field’ hoặc ‘checkbox’ nhưng cả hai đều có nhược điểm - ví dụ: các trường ‘text field’ không hiển thị các mục nào đã hoàn thành và ‘checkbox’ chỉ hiển thị trong chế độ chỉnh sửa. Chúng ta xây dựng trường tùy chỉnh Checklist để hỗ trợ tốt hơn DoD.

![](https://images.viblo.asia/5e6ed839-7aab-4320-994b-a2c0a0306323.png)
### 2. Break down DoD
DoD tương ứng với các phần khác nhau của quá trình phát triển: technical tasks, user stories, và bugs. Ví dụ, một dự án có thể có DoD này:
* Code builds without warnings (technical task)
* Code unit tested (technical task)
* Documentation updated (user story)
* Build pushed to demo server (user story)
Bởi custom field có thể khác nhau tùy thuộc vào các issue type, nên cách hiệu quả nhất để đạt được sự tách biệt này là tạo một DoD cho các technical task và một DoD cho các user story. Bằng cách này, DoD sẽ thích nghi với quy trình phát triển.
### 3. Tạo DoD global
Bằng cách sử dụng [custom field options ](https://confluence.atlassian.com/jira061/jira-administrator-s-guide/configuring-fields-and-screens/adding-a-custom-field/configuring-a-custom-field), bạn có thể tạo các mục DoD được áp dụng cho bất kỳ vấn đề nào: cũ hoặc mới. Thêm, sửa đổi, bổ sung hoặc loại bỏ một lựa chọn được phản ánh ngay lập tức trong tất cả các Jira issue.
### 4. Quản lý DoD
DoD là một hợp đồng giữa PO và nhóm, do đó nếu bạn muốn phù hợp với càng nhiều item trong DoD càng tốt để đảm bảo chất lượng của sản phẩm thì điều này có thể phản tác dụng. Khi team phải đương đầu với quá nhiều item trong DoD, họ sẽ chỉ có thể đáp ứng một vài trong số các yêu cầu hoặc cố gắng thực hiện toàn bộ và thất bại. 

DoD là một tài liệu trực tiếp nên được xem xét thường xuyên. Khi nhóm phát triển của bạn cố gắng cải thiện, bạn có thể thực hiện các hoạt động của mình nghiêm ngặt theo thời gian. Thay vì xóa hoặc sửa đổi các tùy chọn, chỉ cần vô hiệu hóa (disable) chúng. Vô hiệu hoá một tùy chọn sẽ giữ tùy chọn trong Jira nhưng ngăn không cho nó xuất hiện trong các ticket hoặc issue. Điều này cho phép bạn lưu giữ theo thời gian. Và nếu bạn thực sự muốn thử thách team, bạn có thể thêm nhiều item trong DoD nhưng làm cho một số trong số đó bắt buộc và những cái khác là tùy chọn.
### 5. Làm cho PO chịu trách nhiệm và team có trách nhiệm
Thiết lập trường DoD tuỳ chỉnh sao cho chỉ PO mới có thể thêm / sửa / gỡ bỏ các item. Điều này sẽ khiến PO chịu trách nhiệm về việc họ muốn gì. Sau đó, để nhóm tự chịu trách nhiệm về việc deliver bằng cách chọn những item sẽ thực hiện hay bỏ qua trong DoD.
### 6. Thực hiện DoD
Cách tốt nhất để một team thực hiện theo DoD là đưa nó vào quy trình công việc của họ. Sử dụng [Workflow Validator](https://confluence.atlassian.com/jira061/jira-administrator-s-guide/configuring-workflow/advanced-workflow-configuration) trong technical task hoặc user story workflow để ngăn cản việc giải quyết task cho đến khi tất cả các mục DoD đã được hoàn tất. Điều này đòi hỏi trách nhiệm giải trình và củng cố khái niệm như thế nào được coi là ‘Done’
### 7. Tạo một danh sách các tiêu chí chấp nhận (accetance criteria list) trong Jira
Vào cuối ngày, danh sách các tiêu chí chấp nhận không chỉ là một DoD cụ thể cho từng user story. Để thực hiện một danh sách các tiêu chuẩn chấp nhận trong Jira, hoặc là tạo ra một custom field mới hoặc trở lại với global DoD. Với checklist, bạn có thể thêm trực tiếp các item ở mức issue. Vì vậy, bạn có thể có một DoD custom field với các global item bắt buộc và các tiêu chí chấp nhận ở mức issue.

*Tham khảo: https://www.atlassian.com/blog/jira-software/8-steps-to-a-definition-of-done-in-jira*