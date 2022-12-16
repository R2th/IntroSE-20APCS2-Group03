Theo quan điểm cá nhân mình thấy Testing chính là tư duy (mindset), và nó không đơn thuần chỉ là một role cần được thực hiện.  Testing không chỉ là một phần của chu trình phát triển mà nó nên được đi sâu vào mọi giai đoạn. Mọi khía cạnh đều có thể  test , cho dù đó là requirements, architectural diagrams, code, unit tests, test scripts, user docs ....

### Khi nào thì start Testing?

Nếu mình bắt đầu làm việc với một dự án, mình sẽ bắt đầu Testing từ lúc được assigned vào dự án . Có một lý do chính đáng cho việc này đó là mình cảm thấy rằng thử nghiệm không chỉ đơn thuần là viết Test plans, execute test cases, developing automation ... 

### Testing không chỉ là Test Cases

Từ khi bắt đầu start cuộc thảo luận đầu tiên về một sản phẩm hoặc tính năng mới , mình biết là mình đã đang Testing , đang tìm hiểu về các thay đổi, đang hiểu về các tính năng, để nghĩ đến những câu hỏi thích hợp sẽ giúp mình hiểu về sản phẩm để có thể hỗ trợ dev trong việc thiết kế design ,nâng cao xử lý  code . Mình sẽ ghi lại những suy nghĩ của mình và cung cấp một số form Test Plan  (có thể là sơ đồ mindmap ). Sau đó sẽ viết các trường hợp kiểm thử,  tự động hóa(nếu cần) để verify Test cases rồi đưa ra các defects. Dù sao đi nữa thì Testcases cũng vẫn chỉ là một phần trong vai trò tổng thể của Testing .

### Testing được sử dụng để cải thiện chất lượng

Testing không chỉ là làm thế nào để phá vỡ sản phẩm, mà còn là về cách chúng ta có thể giúp cải thiện chất lượng của sản phẩm được giao. Hiểu đơn giản là khi có một cuộc họp ở thời điểm bắt đầu một sprint,  bạn sẽ đặt những câu hỏi về design và đưa ra các cải tiến nâng cao chất lượng, sau đó bạn tìm cách tạo ra sản phẩm chất lượng tốt hơn. Chắc chắn một điều là  khi tìm dk mấu chốt vấn đề ở giai đoạn design sẽ hiệu quả và hiệu quả hơn là phát hiện ra bug sau khi nó được develop vì sau đó sẽ tốn effort để fix chúng .Tuy nhiên thì mọi vấn đề  cũng không phải dễ dàng nhìn thấy được nên quan trọng rằng bạn luôn có suy nghĩ để cải thiện chất lượng sản phẩm dù nó đang trong bất kỳ giai đoạn phát triển nào. 

### Khi nào kết thúc Testing ?

Công việc của Tester không bao giờ có định nghĩa hoàn thành , sẽ có thể luôn có nhiều Testcases để xác định và có nhiều kịch bản hơn để chạy, nhưng nếu mức chất lượng đủ cao đã được chứng minh và rủi ro liên quan đến công việc với xác suất là thấp thì bạn hoàn toàn có thể tự tin để nói tôi hoàn thành test . Thực tế thì các định nghĩa về hoàn thành thường sẽ được xác định bởi các tiêu chí do team đặt ra hoặc theo tiêu chuẩn của riêng bạn.  Điều đó có nghĩa là, thực ra tất cả các mục Tests đã pass không bao giờ đủ để nói rằng Testing đã hoàn tất, luôn có nhiều việc có thể được thực hiện.

### Và sau đây là  4 steps bạn cần làm để hướng tới phát triển tư duy Agile Testing. 

### Step # 1:  Education, education, education!
Nếu bạn muốn những Tester của bạn bao quát được tư duy nhanh nhẹn, thì  điều đầu tiên cần làm là Education (nâng cao kiến thức)

1. Tester phải tự học về những quy trình Agile :  Về Quy trình làm việc mới sẽ là gì ?  Điều gì sẽ được mong đợi ở họ trong vai trò mới của họ ? 

2. Group Testers cần có tiếng nói trong business . Họ phải được trao quyền để quản lý việc nâng cao kiến thức hoặc nhóm chỉ đạo Agile.  Điều quan trọng là họ góp phần vào việc áp dụng Agile và cảm thấy rằng các yêu cầu riêng của họ đang được xem xét. 

3. Tester  phải chủ động trong việc học hỏi  về từng dự án. Họ phải được thông báo và bao gồm ngay từ đầu của một dự án mới;  họ phải hiểu giá trị doanh nghiệp và làm việc để hiểu nhu cầu của người dùng cuối.

### Step # 2: Cân bằng tài liệu

Sự phụ thuộc vào tài liệu là một thói quen trong cách làm cũ và cần phải được phá vỡ và những kỳ vọng xung quanh việc tạo ra nó phải cần xem xét lại. Việc dựa vào các tài liệu yêu cầu được viết trước khi bất kỳ sự phát triển nào bắt đầu sẽ không còn hiệu quả nữa.

Agile là tất cả về việc thích ứng với vòng phản hồi của người dùng, tạo ra sản phẩm cuối cùng trong các lần lặp khi bạn thực hiện . Điều đó có nghĩa là bất kỳ tài liệu nào bạn dựa vào đều phải được cập nhật theo sự phát triển sản phẩm.

Một tư duy Agile Testing có nghĩa là Tester nên tránh sa lầy vào những điều lan man và chưa được thực hiện 1 cách cẩn thận . Người Tester càng dành nhiều thời gian để thực hiện các nhiệm vụ như ghi lại các Testcases , họ càng có ít thời gian để thực hiện các hoạt động giá trị gia tăng như tìm lỗi. Automatic script generation để kiểm tra hồi quy là một lối tắt thông minh bạn có thể thực hiện.

Những gì yêu cầu trong một Agile environment chính là "smart documentation" . Cần phải có một sự chấp nhận rằng không phải tất cả mọi thứ đều có thể được ghi lại và tập trung vào những gì mà thực sự cần thiết để duy trì các quy trình.

Tạo sự cân bằng giữa việc ghi chép tài liệu đủ để cho phép chuyển giao kiến thức trong tương lai trong khi giữ công việc không cần thiết ở mức tối thiểu có thể là một trong những phần khó nhất khi thực hiện quy trình nhanh.

### Bước # 3: Sắp xếp lại metrics

Có lẽ sự điều chỉnh thái độ lớn nhất cần để chuyển đổi thành công sang agile testing  là sự cố gắng thay thế mindset testing theo các số liệu (metrics). Team QA và  Testers đã từng sử dụng metrics để đo lường theo dõi hoàn thành các hoạt động Testing và tạo ra các defects . Những metrics đó không phù hợp với bản chất giá trị gia tăng của Agile.  Danh sách “Những cái Không” sau đây có thể làm cho những  Testers mà đã quen với mindset metrics truyền thống thấy lo lắng , nhưng nó sẽ khiến team có được sự phù hợp hướng tới sự thành công trong dự án:

1. Không tập trung vào tổng số defects . Số lượng lỗi mà người kiểm tra tìm thấy không phải là thước đo đầy đủ về hiệu quả của chúng. Tập trung vào số lượng hơn chất lượng là một sai lầm. Nếu những người Tester cảm thấy bị áp lực phải đánh những con số thì họ có nhiều khả năng bỏ qua những khiếm khuyết đáng ngờ . Yêu cầu tính năng, khoảng cách thiết kế và yêu cầu không rõ ràng không phải là defects.

2. Không tập trung vào số lượng kịch bản thử nghiệm được thực hiện mỗi ngày. Mỗi case không được tạo ra giống nhau.  Con số là sai lệch và nên tập trung vào việc cung cấp chất lượng thay vì số lượng.

3. Không tập trung vào tỷ lệ pass trên tổng thể kịch bản. Cho dù các test scripts riêng lẻ chạy mà không xảy ra sự cố thì điều này không nói lên rằng sản phẩm đã tốt với users , hoặc liệu nó có đáp ứng mong đợi của người dùng cuối hay không. Nói cho cùng thì Tester chính là người biện hộ lớn nhất cho người dùng cuối và  việc của Tester là  quan tâm đến việc người dùng có được sự vui vẻ , thoái mái, tiện lợi nhất khi sử dụng sản phẩm. 

Trọng tâm nên chuyển sang sự hài lòng của người dùng cuối và tránh xa việc theo dõi hoạt động.  Nếu mọi người trong công ty bạn đang hướng đến việc cung cấp sản phẩm tốt nhất cho khách hàng và lắng nghe phản hồi của họ,  thì thành công sẽ chỉ là vấn đề thời gian .

### Bước # 4: Thay đổi thái độ

Một sự sẵn sàng để giao tiếp và hợp tác là tối quan trọng đối với sự thành công của Agile . Trước đây, các bộ phận QA thường có thể thành công như một đơn vị biệt lập - họ sẽ tự đặt mình là gatekeepers  sản phẩm, cảm thấy như thể họ làm việc đối lập với các nhà phát triển. Vâng - Thời kỳ đó đã qua rồi - và đó là thời gian để đưa  Tester  vào cuộc.  Còn việc nâng cao kiến thức , trao quyền cho họ và họ sẽ mang lại giá trị kinh doanh lớn hơn nhiều.

Đây là một con đường hai chiều. Trao quyền cho Tester và chịu trách nhiệm cho sự phát triển của họ . Đề cập việc sắp xếp các mục tiêu trong công ty của bạn để mọi bộ phận và mọi thành viên trong đội ngũ của bạn đều theo cùng một hướng.

Tất cả phải tập trung vào việc tạo ra trải nghiệm tốt nhất có thể cho người dùng cuối.

Tóm lại, bên cạnh việc bạn là một người chăm chỉ, cẩn thận, tỉ mỉ thì Tester ( Tester in Agile)  là một nghề cần có tư duy tốt vì đặc thù công việc làm trong lĩnh vực phát triển phần mềm. Đối với mình kinh nghiệm làm việc không thực sự quan trọng bằng tư duy tốt.  Vì vậy mỗi cá nhân hãy tự trau dồi và học hỏi để nâng cao mindset của mình. Mọi vấn đề đều được giải quyết nếu bạn có một cái nhìn và một tư duy tốt. 

Refer resource : 

https://priorsworld.wordpress.com/2015/08/19/the-testing-mindset/
https://www.softwaretestinghelp.com/developing-the-agile-testing-mindset/