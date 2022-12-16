*Chào mọi người, sau bài viết Jira là gì được mọi người đón nhận, mình sẽ tiếp tục chia sẻ thêm các kiến thức về Jira. Cảm ơn mọi người đã ủng hộ mình ^^*

Quy trình làm việc (Workflow) trong Jira cho phép các nhóm xác định các quy trình cần thiết để đáp ứng các mục tiêu kinh doanh. Bằng cách xác định và triển khai workflow trong Jira, chúng ta có thể thiết lập các quy trình chuẩn hóa cho tất cả các nhóm dự án đang quản lý. 

Từ việc xử lý các phiếu yêu cầu khách hàng đến giới thiệu một thành viên mới trong nhóm (onboarding), các nhóm sử dụng workflow trong Jira cho hầu hết mọi quy trình trong mọi ngành nghề. Jira Workflow giúp mọi người phù hợp và đúng tiến độ đồng thời là một trong những tính năng mạnh mẽ nhất của Jira.


## Đầu tiên, chúng ta hãy cùng tìm hiểu Workflow trong Jira là gì?
## 

Workflow trong Jira là một tập hợp các trạng thái (status) và chuyển đổi (transition) mà một issue di chuyển trong suốt vòng đời của nó. Nói chung, Workflow mô hình hóa các quy trình trong tổ chức và cho phép tiến hành các nhiệm vụ trong hệ thống.

Bằng cách tạo và triển khai workflow, bạn có thể thiết lập các quy trình chuẩn hóa cho tất cả các dự án đang quản lý. Từ việc xử lý các phiếu yêu cầu khách hàng đến giới thiệu một thành viên mới trong nhóm (onboarding), các nhóm sử dụng workflow trong Jira cho hầu hết mọi quy trình có thể tưởng tượng được. Workflow giúp mọi người phù hợp và đúng tiến độ đồng thời là một trong những tính năng mạnh mẽ nhất của Jira.

Jira cung cấp một số workflow mặc định, rất hữu ích như một điểm khởi đầu để xác định các quy trình cần thiết để hoàn thành các tác vụ cơ bản. Tuy nhiên, để tận dụng tối đa workflow, các nhóm phải tùy chỉnh các quy trình công việc mặc định này hoặc tạo quy trình công việc mới từ đầu để đáp ứng nhu cầu kinh doanh riêng biệt. Tuy nhiên, tùy chỉnh workflow (quy trình công việc) là một công việc phức tạp và có thể dễ dàng dẫn đến quy trình công việc không hoạt động hoặc không tận dụng được tất cả hiệu quả mà Jira cung cấp.

![](https://images.viblo.asia/27f620f3-cbbb-4291-b9e3-26eb504ba3a6.png)


## Các thành phần (component) của Jira Workflow
## 

Có một số thành phần riêng biệt của workflow trong Jira. Mỗi thành phần phục vụ một mục đích cụ thể trong việc xác định quy trình làm việc và các bước của nó. Bốn thành phần chính là statuses, transitions, assignees và resolutions. Chúng ta hãy xem xét từng thứ một.

### Statuses

Một Workflow bao gồm nhiều status khác nhau, thể hiện các giai đoạn mà Workflow có thể đi qua. Ví dụ: Workflow có thể bao gồm các status “Not Yet Started” (chưa bắt đầu), “Planning” (đang lập kế hoạch), “In Progress” (đang tiến hành) và “Complete” (hoàn thành).

Khi tạo hoặc tùy chỉnh Workflow, hãy nhớ rằng các issue trong Jira chỉ có thể có thể có một status tại một thời điểm – ví dụ: một issue không thể có cả hai status “On Deck” và “In Progress”. Bạn có thể xác định một status và thêm nó vào workflow bằng cách làm theo các bước sau:

Bắt đầu bằng cách nhấp vào biểu tượng Jira. Chọn Jira Setting, sau đó chọn Isssues, sau đó chọn Statuses.

Nhấp vào nút Add status. Chọn Jira Settings, sau đó chọn Issues, sau đó chọn Statuses.

Nhấp vào nút Add status. Xin lưu ý rằng hướng dẫn từng bước được cung cấp trong bài viết này thường chỉ áp dụng cho Jira Cloud. 

Người dùng có thể tạo status mới trong workflow với số lượng tùy ý và gắn nhãn chúng một cách tự do dựa trên thói quen làm việc của nhóm. Các status cũng có thể được mã hóa màu để phản ánh các danh mục khác nhau. 

### Transitions
### 

Transitions là một hành động nhằm di chuyển issue từ status này sang status khác. Ví dụ: bạn có issue đi từ status “To do” sang status “Progress“, bạn có thể sẽ cần transition “Start process”. Cũng như các status, các transition có thể được gắn nhãn và mã màu tùy ý.

Bạn có thể thêm transition vào workflow bằng cách điều hướng đến Workflows trong menu Issue, chọn Edit, sau đó bấm vào nút Add Transition trong tab Text.

Quá trình chuyển đổi có thể được sử dụng để tạo quy trình làm việc phi tuyến tính. Ví dụ: Workflow có status “In Progress” có thể cho phép người dùng chuyển issue trở lại giai đoạn “Planning” thông qua “Reject” transition hoặc chuyển sang “Seeking Client Feedback” thông qua transition “Approve”.

Quá trình transition cũng có một số thuộc tính mà người dùng có thể xác định để cấu hình cách hoạt động của transition. Chúng bao gồm các condition, validator, post function và triggers. Tùy chỉnh transition theo cách này là một trong những cách mạnh mẽ nhất để sử dụng Jira workflow và sẽ được thảo luận chi tiết hơn ở phần sau. 

### Assignees (Người được giao việc)
### 

Thành phần Assignees của workflow xác định người dùng hoặc nhóm Jira nào chịu trách nhiệm cho một issue trong các giai đoạn nhất định của workflow. Assignees có thể chịu trách nhiệm về issue đối với mọi status của workflow hoặc Assignees có thể thay đổi một lần hoặc nhiều lần trong quá trình này. 

### Resolutions
### 

Resolutions chứa thông tin về lý do tại sao một quá trình chuyển đổi lại dẫn đến một kết quả cụ thể. Ví dụ: các Resolutions cho workflow mô tả quy trình viết một bài viết có thể bao gồm “Article Posted” (bài báo đã đăng), “Won’t Do At This Time” hoặc “Rejected by Client”. Như đã lưu ý trước đó, bạn có thể tạo các Resolutions bằng cách chọn nút Resolutions trong menu Issues.

Khi một resolution được xác định, issue đó coi như đã kết thúc.

Nhiều người có thể nhầm lẫn 3 khái niệm resolutions với status hoặc transition. Status cho biết vị trí của issue trong workflow, trong khi resolutions cho biết lý do tại sao issue không còn trong workflow. Thực tế, resolution được tạo ra giúp người dùng không phải tạo nhiều status và khiến cho workflow trở nên phức tạp.

Status và transition trong workflow (lưu ý: resolution không được thể hiện trong workflow).

Tương tự, transition cho biết cách thức mà issue đến được vị trí này trong workflow ví dụ như “Post Article” – thay vì hiện tại – “Article Complete”. Cũng như các status và transitions, resolutions có thể được xác định với bất kỳ giá trị nào mà người dùng mong muốn. Tuy nhiên, điều quan trọng cần lưu ý là Jira sẽ coi một issue đã đóng lại mà không quan tâm đến resolution của nó có chứa nội dung gì. Vì lý do đó, bạn nên tránh xác định resolution bằng các câu như “Incomplete” (chưa hoàn thành). Một resolution với định nghĩa này có thể nhằm thể hiện một quá trình vẫn đang diễn ra, nhưng Jira sẽ không hiểu nó như vậy. Giải pháp tốt hơn là sử dụng resolution để đưa issue trở lại trạng thái trước đó, chẳng hạn như “In Progress” (đang xử lý). Và bạn nên xóa resolution khi reopen một issue.

## Hướng dẫn tạo Workflow trong Jira
## 

Cách tạo Workflow mới trong Jira tương đối đơn giản:

1. Bắt đầu bằng cách nhấp vào biểu tượng bánh răng.

![](https://images.viblo.asia/f367e727-343a-4971-859d-0fb86fc2f20d.png)


2. Chọn biểu tượng bánh răng, sau đó chọn **Issues**, sau đó chọn **Workflows** ở thanh bên trái.
3. Bấm vào nút **Add workflow**.
4. Sử dụng các nút **Add status** và **Add transition** để xác định các status và transition, và thêm chúng vào workflow của bạn. Bạn có thể xác định bao nhiêu thành phần này tùy thích.
5. Để thêm các Resolution vào Workflow, hãy quay lại menu **Issues** và chọn nút **Resolutions**. 


### So sánh Active Workflow và Inactive workflow
### 
Jira phân loại workflow thành 2 loại active và inactive. Workflows được coi là active nếu chúng được ít nhất một trong các dự án Jira sử dụng, trong khi Workflows được coi là Inactive phải được liên kết với một dự án trước khi nó có thể được sử dụng. Nói một cách đơn giản, Inactive workflow là một bản draft của active workflow.

Một phần mục đích của việc phân biệt active và inactive workflow là để giúp việc tạo bản sao lưu (backup) của một dòng công việc dễ dàng hơn. Nếu bạn tạo một workflow mới và muốn bắt đầu sử dụng nó ngay lập tức cho một dự án, bạn có thể tạo một bản sao của nó và giữ bản sao đó ở chế độ inactive. Bản sao inactive đóng vai trò như một bản sao lưu và có thể được sử dụng để khôi phục hoặc xây dựng lại workflow đang hoạt động của bạn trong trường hợp có sự cố xảy ra với phiên bản đang hoạt động, chẳng hạn như thay đổi so với cài đặt gốc khiến workflow ngừng hoạt động bình thường.


Inactive Workflow trong Jira

Một sự khác biệt quan trọng khác giữa Workflow Inactive và Active là khả năng chỉnh sửa workflow active bị hạn chế nghiêm trọng. Chỉ có thể chỉnh sửa mô tả workflow; bạn không thể thay đổi tên hoặc các status liên quan đến các bước. Ngoài ra, bạn chỉ có thể thêm transition đi vào một bước nếu bước đó đã xác định các chuyển đổi đi. 

## Làm thế nào để tận dụng tối đa Jira Workflow?
## 

Các nhóm sử dụng Jira có thể tận dụng workflow để giúp trực quan hóa, tổ chức và theo dõi tiến trình của các quy trình phức tạp. Tuy nhiên, chỉ tạo một workflow và liên kết nó với một dự án là không đủ. Bạn cần đảm bảo rằng bạn đang sử dụng workflow để xác định các quy trình hiệu quả phản ánh chính xác các hoạt động của tổ chức bạn. Dưới đây là một số phương pháp hay nhất cần tuân theo khi sử dụng workflow trong Jira. 

### Tránh sự phức tạp không cần thiết

Bạn có thể thêm bao nhiêu thành phần vào workflow tùy thích và bạn có thể tùy chỉnh định nghĩa của chúng theo bất kỳ cách nào bạn muốn. Tính linh hoạt này rất quan trọng đối với việc xây dựng workflow phù hợp với nhu cầu của bạn, nhưng điều quan trọng là đừng quá lạm dụng bằng cách tạo workflow với nhiều thành phần hơn mức cần thiết hoặc bằng cách đặt các định nghĩa thành phần tối nghĩa khó diễn giải.

Nói chung, hãy cố gắng tạo workflow ngắn gọn và chỉ chứa những yếu tố cần thiết cho dự án. Việc cố gắng vượt lên trên sẽ dẫn đến sự phức tạp không cần thiết và khiến workflow của bạn khó quản lý và sử dụng hơn.

### Thiết kế workflow phù hợp với quy trình kinh doanh
### 

Các thành phần mà bạn tạo và xác định trong workflow phải phản ánh các quy trình kinh doanh thực tế của bạn. Các quy trình lý thuyết có vẻ tốt khi lập kế hoạch dự án, nhưng nếu chúng thực sự không liên quan đến bất kỳ đơn vị hoặc hoạt động kinh doanh cụ thể nào, việc thực hiện chúng mà không có thử nghiệm quan trọng có khả năng tạo ra nhiều vấn đề hơn so với khả năng giải quyết.

Bạn cũng nên đảm bảo rằng các nhóm có thể thực hiện từng phần của workflow và có các công cụ cần thiết để thực hiện quy trình đó theo cách nó được xác định trong workflow. Nếu không, bạn lại gặp rủi ro khi tạo workflow trông tuyệt vời trong Jira nhưng lại khó chuyển thành hành động. 

### Lấy feedback từ các bên liên quan
### 

Trước khi tạo workflow, hãy đánh giá nhu cầu và quan điểm của tất cả các bên liên quan. Các bên liên quan không chỉ bao gồm các cá nhân hoặc nhóm sẽ tham gia vào workflow với tư cách là assignee mà còn bao gồm bất kỳ ai bị ảnh hưởng bởi kết quả của workflow. Hiểu được nhu cầu của tất cả các bên liên quan sẽ giúp bạn tránh được những lỗ hổng trong quy trình và dự đoán tốt hơn các kết quả có thể xảy ra. 

### Tạo Workflow Diagrams rõ ràng
### 

Workflow diagrams là một nguồn tài nguyên quan trọng để hình dung workflow và hiểu nhanh về cách chúng hoạt động. Vì lý do này, bạn nên đầu tư một chút thời gian để đảm bảo rằng sơ đồ rõ ràng và dễ đọc nhất có thể. Sử dụng mã màu một cách thích hợp để giúp nhóm của bạn xác định các thành phần khác nhau và đảm bảo rằng sơ đồ hiển thị rõ ràng cách các thành phần liên quan với nhau. 

### Test thử workflow
### 

Thay vì nghĩ về workflow như một thứ mà một người hoặc một nhóm tạo ra để những người khác sử dụng, hãy coi workflow như một nguồn lực mà các bên liên quan cùng nhau tạo ra và kiểm tra trước khi chúng được đưa vào áp dụng thực tế. Việc test workflow trước khi nó được triển khai chung cho tổ chức và tiếp tục kiểm tra sau khi đã áp dụng. Những kiểm tra này giúp bạn xác định những thiếu sót cần được giải quyết trước khi workflow được sử dụng rộng rãi và các cách để cải thiện quy trình. 

**Tùy chỉnh Transitions**

Jira cho phép bạn cấu hình hành vi của Transitions theo một số cách. Các cấu hình này giúp kiểm soát Transitions chặt chẽ hơn để tránh các kết quả không mong muốn, cũng như để tự động hóa các phần của workflow để loại bỏ các tác vụ thủ công.

Để cấu hình Transitions, hãy chọn Workflows từ menu Issues trong Jira Settings, chọn workflow bạn muốn tùy chỉnh, sau đó nhấp vào Edit. Sau đó nhấp vào mũi tên transition, chọn một transition, và chọn khía cạnh cụ thể của transition mà bạn muốn cấu hình.

**Điều kiện (Conditions)**

Các điều kiện chỉ định các điều kiện tiên quyết phải tồn tại trước khi có thể sử dụng transition. Không đáp ứng một điều kiện sẽ ẩn transition khỏi người dùng.

Các điều kiện có thể kiểm soát ai thực hiện transition hoặc trong những trường hợp nào thì transition có sẵn. Ví dụ: một điều kiện có thể yêu cầu người dùng ở vai trò “Architect” (kiến trúc sư) trước khi họ có thể sử dụng transition “Start Design” hoặc chuyển đổi “Complete Project” không khả dụng cho bất kỳ issue nào có subtasks chưa được xử lý.

**Trình xác thực (Validators)**

Validator yêu cầu người dùng nhập dữ liệu bổ sung trước khi quy trình có thể tiếp tục. Chúng là một công cụ hữu ích để đảm bảo rằng các thành viên trong nhóm bao gồm tất cả thông tin cần thiết trước khi một quy trình tiếp diễn.


**Post Functions**

Post Functions cho phép bạn xác định các quy trình bổ sung phải được thực hiện trong quá trình transition. Ví dụ: nếu quá trình transition bắt đầu, bạn có thể sử dụng các hàm đăng để yêu cầu thực hiện các bước bổ sung cùng lúc, chẳng hạn như tạo các tác vụ liên quan. 

**Triggers**


Cuối cùng, bạn có thể tùy chỉnh quá trình transitions bằng các trigger, tự động hóa quá trình chuyển đổi khi một số sự kiện nhất định xảy ra. Trigger loại bỏ nhu cầu nhóm của bạn phải thay đổi status của quy trình theo cách thủ công khi một điều kiện được đáp ứng. Sử dụng Workflow Properties Jira cũng cho phép bạn xác định các thuộc tính ở cấp độ của toàn bộ workflow, thay vì xác định các thuộc tính cụ thể cho transition như đã giải thích ở trên. Workflow properties có thể được sử dụng để hạn chế những hành động có thể được thực hiện cho các bước hoặc transitions nhất định trong Workflow. Ví dụ: bạn có thể ngăn người dùng thực hiện thay đổi đối với giá trị trường (field value) khi một điều kiện nhất định đã được đáp ứng, chẳng hạn như “Project Complete”. 

**Giờ thì các chúng ta có thể bắt đầu tạo workflow rồi!**

Có thể dễ dàng tạo Workflow trong Jira, nhưng điều khó hơn chính là tối ưu hóa chúng để đảm bảo rằng các quy trình kinh doanh hiệu quả nhất có thể. Chúng ta sẽ cần tích hợp quy trình làm việc với phần còn lại của Jira để xây dựng giải pháp quản lý dự án hiệu quả nhất cho nhóm. Chúc các bạn thành công!
 
 Các bạn có thể tham khảo thêm các bài viết để hiểu rõ hơn về Jira:
 
 - https://biplus.com.vn/huong-dan-jira/
 - https://biplus.com.vn/sprint-trong-jira/
 - https://biplus.com.vn/huong-dan-ap-dung-jira-cho-scrum/
 - https://biplus.com.vn/jira-dashboard-la-gi/
 - https://biplus.com.vn/epic-jira-la-gi/
 - https://biplus.com.vn/log-work-trong-jira/