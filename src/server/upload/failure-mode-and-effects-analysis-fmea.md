***Failure Mode and Effects Analysis (FMEA)* là một kỹ thuật quản lý rủi ro**.

Nếu thực hiện chính xác, đây có thể là một bổ sung tuyệt vời cho các quy trình đảm bảo chất lượng tốt nhất tuân thủ. Trong bài này, mục đích của chúng tôi là giới thiệu với bạn kỹ thuật phân tích rủi ro rất hữu ích trong việc cải thiện chất lượng phần mềm.

![](https://images.viblo.asia/66168777-3196-42ac-b9e7-6d4487a82549.png)

### Failure Mode And Effects Analysis

FMEA được sử dụng hầu hết bởi người quản lý cấp trên hoặc các bên liên quan. Trong thực tế, tester ít có cái nhìn sâu sắc về kỹ thuật này. Nhưng xu thế bây giờ đang thay đổi và tôi cảm thấy nếu tester hiểu đúng về khái niệm này, họ có thể sử dụng kỹ thuật này để viết test case, từ đó có thể: 

* Hiểu mục đích của các bên liên quan trong việc test ứng dụng
* Hiểu nghiệp vụ
* Thiết kế các scenario mức high-level dựa trên nghiệp vụ và sự quan tâm của quản lý
* Thiết kế các test case hiệu quả, cung cấp độ bao phủ tốt hơn các khu vực dễ rủi ro
* Đánh độ ưu tiên các test case
* Quyết định test cái gì và cái gì cần hoãn lại ở bất kỳ phase nào

### Nền tảng

RISK ANALYSIS (Phân tích rủi ro) là một khía cạnh quan trọng của Test Management. Câu hỏi đặt ra là: **Phân tích rủi ro là gì**? **Tại sao nó quan trọng**? 

Để hiểu được điều đó, chúng ta cùng tìm hiểu: **Risk (Rủi ro) là gì?**

![](https://images.viblo.asia/5dadecf5-4c6c-4ad5-b908-9cd952eda248.jpg)

### RISK (RỦI RO)

**Risk là gì?**

Risk là những vấn đề tiềm ẩn mà mình không xác định được và có thể sẽ gây ra những hậu quả ảnh hưởng tới dự án, tới công ty.

Xác định và quản lý risk là mối quan tâm chính trong mỗi dự án phần mềm. Phân tích rủi ro phần mềm hiệu quả sẽ giúp lập kế hoạch và phân chia công việc hiệu quả hơn.

**Các loại Risk**

**1. Schedule Risks**: Tiến độ dự án sẽ bị chậm khi các task và tiến độ release rủi ro không đúng. Schedule risk ảnh hưởng chủ yếu đến một dự án và cuối cùng là nền kinh tế của công ty, và có thể dẫn đến sự thất bại của dự án.

Schedule bị chậm thường do các nguyên nhân sau:

* Thời gian estimate sai
* Quản lý nguồn lực không đúng. Tất cả các nguồn lực như nhân viên, hệ thống, kỹ năng cá nhân, ....
* Lỗi trong việc xác định các chức năng phức tạp và thời gian phát triển các chức năng đó
* Mở rộng phạm vi dự án bất ngờ

**2. Budget Risks**

* Estimate sai budget
* Vượt quá chi phí
* Mở rộng phạm vi dự án

**3. Operational Risks (Rủi ro vận hành)**: Rủi ro mất mát do thực hiện không đúng quy trình hệ thống hoặc một vài sự kiện rủi ro khác. Nguyên nhân là do:

* Lỗi xác định độ ưu tiên các xung đột
* Lỗi giải quyết các trách nhiệm
* Không đủ nguồn lực
* Không đào tạo chuyên môn phù hợp
* Không có kế hoạch tài nguyên
* Không có sự giao tiếp trong team

**4. Technical Risks**: Rủi ro kỹ thuật thường dẫn đến các lỗi chức năng và hiệu suất. Nguyên nhân do:

* Liên tục thay đổi requirement
* Không có sẵn công nghệ tiên tiến hoặc công nghệ hiện có là trong giai đoạn đầu
* Sản phẩm phức tạp 
* Khó khăn trong việc tích hợp các module

**5. Programmatic Risks:** Đây là các rủi ro mở rộng vượt ra ngoài giới hạn vận hành. Đây là tất cả các rủi ro không chắc chắn nằm ngoài tầm kiểm soát của chương trình. Nó có thể là:

* Hết quỹ
* Phát triển thị trường
* Thay đổi chiến lược và độ ưu tiên của khách hàng
* Chính quyền thay đổi

### Risk Analysis là gì?

Risk Analysis là một cơ chế xác định các rủi ro tiềm ẩn, từ đó phân tích và nghiên cứu để tìm ra xác suất và ảnh hưởng. Cần đo lường 2 thuộc tính và dựa trên kết quả để xác định:

* Test cái gì trước?
* Test cái gì nhiều hơn?
* Cái gì không cần test (trong thời gian này)?

Có nhiều phương pháp để thực hiện Risk Analysis, và chúng được chia thành 2 loại:

* **Informal Techniques (Kỹ thuật không chính thống)**: được dựa trên kinh nghiệm, phán đoán và trực giác.
* **Formal Techniques (Kỹ thuật chính thống)**: Xác định và cân nhắc các thuộc tính rủi ro

Failure Mode And Effects Analysis (FMEA): Đây là phương pháp chính thống để thực hiện phân tích rủi ro. Vậy FMEA là gì?

### Khái niệm FMEA 

***FMEA là viết tắt của “Phân tích mô hình sai lỗi và ảnh hưởng” là một cụm từ được dịch từ Anh ngữ "Failure Mode, Effects and Criticity Analysis". FMEA là một kỹ thuật chính thống phân tích rủi ro sử dụng cách tiếp cận từng bước để xác định các lỗi tiềm ẩn trong thiết kế, quy trình hoặc sản phẩm hoặc dịch vụ. Nhận dạng này cho phép phân tích để ngăn ngừa hoặc giảm bớt những sai sót trong tương lai.***

**Mô tả:** 

FMEA bắt đầu và tiếp tục với các phiên Brainstorming. Những người tham gia cần xác định tất cả các thành phần, module, sự phụ thuộc, giới hạn có thể lỗi trong môi trường product và cuối cùng dẫn đến chất lượng kém, thiếu tin cậy và có thể dẫn đến kết quả là mất khách hàng.

Trong FMEA, chúng ta không chỉ xác định những mất mát mà còn phải xác định nguyên nhân của các rủi ro đó. Để đo lường FMEA, cần có 3 thuộc tính:

* **Severity** (Mức độ nghiêm trọng) của Failure (S)
* **Priority** (Mức độ ưu tiên) của Failure (P)
* **Likelihood** (Xác suất) của Failure (L)

Chúng ta đặt từng thuộc tính theo tỉ lệ sau:

**Severity Scale:**

| Description | Class | Scale |
| -------- | -------- | -------- |
| Mất dữ liệu, vấn đề phần cứng hoặc các vấn đề an toàn     | Urgent    | 1     |
| Mất chức năng mà không có cách giải quyết     | High    | 2     |
| Mất chức năng nhưng có cách giải quyết     | Medium    | 3     |
| Mất một phần chức năng     | Low    | 4     |
| Cosmetic or trivial     | None    | 5     |

**Priority Scale:**

| Description | Class | Scale |
| -------- | -------- | -------- |
| Mất hoàn toàn giá trị hệ thống     | Urgent    | 1     |
| Mất mát không thể chấp nhận giá trị hệ thống     | High    | 2     |
| Có khả năng giảm giá trị hệ thống     | Medium    | 3     |
| Giảm có thể chấp nhận được giá trị hệ thống     | Low    | 4     |
| Giảm không đáng kể giá trị hệ thống     | None    | 5     |

**Likelihood Scale:**

| Description | Class | Scale |
| -------- | -------- | -------- |
| Chắc chắn anh hưởng đến toàn bộ người dùng     | Urgent    | 1     |
| Rất có thể ảnh hưởng đến một số người dùng     | High    | 2     |
| Có khả năng ảnh hưởng đến một số người dùng     | Medium    | 3     |
| Hạn chế ảnh hưởng đến vài người dùng     | Low    | 4     |
| Không ảnh hưởng trong sử dụng thực tế     | None    | 5     |

Tất cả các thuộc tính Severity, Priority, Likelihood được đo lường độc lập theo tỉ lệ và sau đó được nhân lên để có số ưu tiên rủi ro **Risk Priority Number (RPN)**: 

**Risk Priority Number (RPN)** = S * P * L

Dựa trên giá trị RPN, chúng ta xác định mức độ thử nghiệm. RPN càng thấp thì Risk càng cao. 

### Ví dụ về Failure Mode Effect Analysis

Hãy cùng xem xét ứng dụng banking có 4 tính năng:

* Feature 1: Rút tiền Withdraw
* Feature 2: Tiền gửi Deposit
* Feature 3: Vay mua nhà Home Loan
* Feature 4: Fixed Deposits

Team phân tích rủi ro được thành lập bao gồm: bank manager, UAT Test manager (đại diện cho end-user), Technical Architect, Network Administrator, DBA, và project manager.

Sau một loạt các buổi brainstorming, team đưa ra các rủi ro sau:

* Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà.
* Hệ thống lỗi khi có 200 user đồng thời truy cập
* Hệ thống không thể xử lý các tài liệu có dung lượng lớn hơn 6MB.

Bây giờ hãy cùng tính toán Severity, Priority, Likelihood của các risk trên.

**Severity:**

| Feature | Class | Scale |
| -------- | -------- | -------- |
| Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà     | Very High    | 2     |
| Hệ thống lỗi khi có 200 user đồng thời truy cập     | High    | 3     |
| Hệ thống không thể xử lý các tài liệu có dung lượng lớn hơn 6MB     | Very High    | 2     |

**Priority:**

| Feature | Class | Scale |
| -------- | -------- | -------- |
| Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà     | Very High    | 2     |
| Hệ thống lỗi khi có 200 user đồng thời truy cập     | High    | 3     |
| Hệ thống không thể xử lý các tài liệu có dung lượng lớn hơn 6MB     | High    | 3     |

**Likelihood:**

| Feature | Class | Scale |
| -------- | -------- | -------- |
| Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà     | High    | 3     |
| Hệ thống lỗi khi có 200 user đồng thời truy cập     | High    | 3     |
| Hệ thống không thể xử lý các tài liệu có dung lượng lớn hơn 6MB     | Low    | 4     |

**Bây giờ đặt tất cả vào một bảng:**

| Feature | Severity | Priority | Likelihood |
| -------- | -------- | -------- | -------- |
| Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà     | 2    | 2     | 3     |
| Hệ thống lỗi khi có 200 user đồng thời truy cập     | 3    | 3     | 3     |
| Hệ thống không thể xử lý các tài liệu có dung lượng lớn hơn 6MB     | 2    | 3     | 4     |

**Giờ cùng tính RPN** (RPN = Severity * Priority * Likelihood)

| Feature | Severity | Priority | Likelihood | RPN |
| -------- | -------- | -------- | -------- | -------- |
| Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà     | 2    | 2     | 3     | 12     |
| Hệ thống lỗi khi có 200 user đồng thời truy cập     | 3    | 3     | 3     | 27     |
| Hệ thống không thể xử lý các tài liệu có dung lượng lớn hơn 6MB     | 2    | 3     | 4     | 24     |

Bây giờ chìa khóa là: RPN thấp nhất - Risk cao nhất. Do đó Feature 1 (Logic business phức tạp trong trường hợp tính lãi suất của khoản vay mua nhà) có độ rủi ro cao nhất, và Feature 2 (Hệ thống lỗi khi có 200 user đồng thời truy cập) có độ rủi ro thấp nhất.

**Vậy dựa vào tính toán trên, chúng ta sẽ tạo ra test case như thế nào?**

Vì **Feature 1** là **tính năng rủi ro nhất**, nên test case cần phải chính xác và chuyên sâu hơn. Test case cần bao phủ toàn bộ chức năng và các module bị ảnh hưởng. Cần sử dụng tất cả các kỹ thuật viết test case (Phân vùng tương đương và Phân tích giá trị biên, Biểu đồ nguyên nhân (Cause and effect graph), Sơ đồ chuyển trạng thái (State Transition diagram) ) để thiết  kế test case.

Test case không chỉ viết cho chức năng mà còn viết cho phi chức năng (Load test, Stress, Volumn test, ...). Chúng ta cần thực hiện test toàn diện cho toàn bộ tính năng này, vì vậy hãy căn cứ để viết của bạn cho phù hợp. Ngoài ra, hãy xem xét tất cả các module phụ thuộc vào tính năng quan trọng này.

**Feature 2** là tính năng ít rủi ro nhất, vì vậy viết test case của bạn trên chức năng chính. Chỉ cần viết high-level test case để xác minh rằng tính năng hoạt động đúng như mong đợi là được.

**Feature 3**  là tính năng có mức độ rủi ro vừa phải, vì vậy viết test case của bạn trên chức năng chính và các chức năng phụ thuộc. Viết một vài test case phân tích giá trị biên để xác minh một số trường hợp tiêu cực là tốt. Phạm vi của các test case phải nằm giữa yếu tố rủi ro cao và thấp. Nếu cần thiết, hãy viết một vài test case cho phi chức năng là được.

### FMEA và mức độ thử nghiệm

Dựa vào giá trị RPN, chúng ta xác định mức độ thử nghiệm sẽ được thực hiện. 

**Thông thường nếu:**

* RPN từ 1-10, chúng ta thực hiện Extensive Testing - Test sâu rộng (Bao phủ tất cả các tính năng chính và tính năng phụ thuộc)
* RPN từ 11-30, chúng ta thực hiện Balanced Testing - Test cân bằng (Bao phủ tất cả các chức năng chính của tính năng/module)
* RPN từ 31-70, thực hiện Opportunity Testing - Test cơ hội (Bao phủ chức năng cơ bản của tính năng/module)
* RPN từ 70 trở lên, không cần test, hoặc nếu thời gian cho phép thì chỉ cần báo cáo bất thường.

**Những dải RPN có thể thay đổi tùy theo tính chất dự án**.

Kết luận:

Phân tích rủi ro sử dụng FMEA yêu cầu thời gian và kinh nghiệm. Kết quả mong muốn chỉ có thể đạt được khi tất cả các thành viên trong nhóm có trách nhiệm. Mặc dù kỹ thuật này là chính thức, nhưng nó yêu cầu một loạt các phiên brainstorming và điều quan trọng không kém là ghi lại tất cả các rủi ro đã được xác định.

Vì hầu hết các ứng dụng là độc quyền, thang đo để đo các tham số của FMEA (Severity, Priority, Likelihood) cũng phụ thuộc vào ứng dụng. Nếu được thực hiện một cách thích hợp, có rất nhiều lợi thế với kỹ thuật FMEA. Nó có thể được sử dụng để xác định các rủi ro tiềm ẩn và dựa vào đó team có thể lập một chiến lược giảm thiểu hiệu quả.

Tham khảo:

https://www.softwaretestinghelp.com/failure-mode-and-effects-analysis-fmea/

https://www.softwaretestinghelp.com/types-of-risks-in-software-projects/