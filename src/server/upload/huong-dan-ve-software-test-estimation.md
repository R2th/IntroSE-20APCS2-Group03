**Test Estimation** là một hoạt động quản lí gần đúng thời gian cần để hoàn thành nhiệm vụ. Việc ước lượng những effort cần thiết cho hoạt động kiểm thử là một nhiệm vụ cấp thiết và quan trọng trong quản lý kiểm thử. Việc ước lượng chính xác trong kiểm thử phần mềm giúp mức bao phủ tối đa.
# 1. Ước lượng cái gì ?
![](https://images.viblo.asia/f853c1ac-7439-4d3c-8ef1-97ca56cf6e3a.jpg)

*  **Resources**: các tài nguyên được yêu cầu để thực hiện bất kì nhiệm vụ trong các dự án. Đó có thể là con người, thiết bị, phương tiện, hoặc bất kì tài nguyên được định nghĩa bất buộc cho việc hoàn thành một hoạt động của dự án

*  **Times**: Thời gian là tài nguyên có giá trị cao nhất trong 1 dự án. Mỗi dự án đều có một deadline để giao hàng.

*  **Human Skill:**  Kỹ năng của con người là kiến thức và kinh nghiệm của các thành viên trong nhóm. Chúng ảnh hưởng tới việc ước tính của bạn. 
Ví dụ: Nhóm có kĩ năng test yếu  thì sẽ mất nhiều thời gian hơn để hoàn thành dự án  so với  nhóm có kĩ năng test tốt hơn.

* **Cost**: là ngân sách của dự án. Nó có nghĩa là cần bao nhiêu tiền để hoàn thành dự án.

# 2. Làm thế nào để ước lượng ?
Danh sách các kĩ thuật ước lượng trong kiểm thử phần mềm:

* Work Breakdown Structure
* 3-Point Software Testing Estimation Technique
* Wideband Delphi technique
* Function Point/Testing Point Analysis
* Use – Case Point Method
* Percentage distribution
* Ad-hoc method

![](https://images.viblo.asia/52cd7d2e-03b5-4eaa-986b-94c0abac1e27.png)

Dưới đây là 4 bước để ước lượng.
Chúng ta sẽ tìm hiểu các bước để estimate dựa vào các nội dung sau:

![](https://images.viblo.asia/4d0945bb-9de8-41e9-94ab-ab24153bb125.png)

### **Step 1** Phân chia toàn bộ nhiệm vụ của dự án thành các nhiệm vụ nhỏ
Nhiêm vụ là một phần của công việc mà sẽ được giao  cho ai đó thực hiện. Để thực hiện , bạn có thể sử dụng kĩ thuật **Work Breakdown Structure** .
Kĩ thuật này sẽ phân chia dự án phức tạp thành các module , từ các module sẽ được phân chia thành các module nhỏ, các module nhỏ được phân chia thành các chức năng. Có nghĩa là kĩ thuật này sẽ phân chia các nhiệm vụ của dự án thành các nhiệm vụ nhỏ nhất.

![](https://images.viblo.asia/eb62ede5-a44d-4f47-acf4-a4dd13432d22.png)

Ví dụ về việc chia nhỏ tasks cho dự án kiểm thử phần mềm. Chúng ta chia thành 4 task lớn. Sau đó, chia ra từng nhiệm vụ nhỏ. Mục đích  của việc này là **tạo ra nhiệm vụ càng chi tiết càng tốt**



| Task | Task nhỏ | 
| -------- | -------- |
| Phân tích đặc tả yêu cầu phần mềm	     | - Phân tích các yêu cầu phần mềm - Trao đổi với dev team , Brse, comtor... để hiểu rõ hơn về phần mêm| 
| Tạo đặc tả kiểm thử     | - Tạo kịch bản kiểm thử  - Tạo test cases - Xem xét và cập nhật bộ test case| 
| Thực hiện kiểm tra     | - Tạo testdata - Thiết lập môi trường test - Thực hiện kiểm tra - Kiểm tra lại kết quả| 
| Báo cáo      | - Tạo báo cáo lỗi - Báo cáo theo ngày|

### **Step 2** Phân bổ nhiệm vụ cho thành viên trong nhóm dự án

Trong bước này, các nhiệm vụ sẽ được phân bổ cho các thành viên thích hợp trong nhóm dự án.
Ví dụ


| Task  | Người thực hiện |
| -------- | -------- | 
| Phân tích đặc tả yêu cầu phần mềm	     | Tất cả thành viên     |
| Tạo testcase | Senior tester and junior tester | 
| Tạo môi trường kiểm thử | Junior tester | 
| Review testcase | Testlead and Senior tester | 
| Thực hiện test | Senior tester and junior tester  | 
| Báo cáo lỗi | Senior tester and junior tester  | 
| Báo cáo tổng hàng ngày | Testlead |

### **Step 3** Ước lương effort cho các nhiệm vụ
Chúng ta sẽ sử dụng phương pháp Functional Point Method  để ước lượng Size, Duration và Cost cho các nhiệm vụ.

![](https://images.viblo.asia/e5e27f06-3cc3-4dc0-85ca-c4e97a09c6f8.png)

**Bước A:** Ước lượng size cho nhiệm vụ

Trong step 1, bạn đã chia nhỏ nhiệm vụ của dự án thành các nhiệm vụ nhỏ . Hiện tại, bạn sẽ ước lượng size cho các nhiệm vụ đấy. Hãy thực hành với nhiệm vụ cụ thể :  "Tạo đặc tả kiểm thử"
Size của nhiệm vụ  phụ thuộc vào size  chức năng của hệ thống cần kiểm thử. Size chức năng phản ánh số lượng chức năng liên quan tới người dùng. Càng **nhiều chức năng**, thì  hệ thống  **càng phức tạp.**
Trước khi ước tính, bạn cần chia chức năng thành  3 nhóm  như : complex, medium, simple.

![](https://images.viblo.asia/d0fe65b1-b875-4d4a-afd8-a29bc62a31f8.png)

Dựa vào tính phức tạp của chức năng, người quản lý có thể cung cấp **weightage** cho mỗi nhóm chức năng. 



| Nhóm | Trọng lượng | 
| -------- | -------- | 
| Phức tạp	     | 5    | 
| Trung bình	     | 3     | 
| Đơn giản	     | 1     | 

Hãy xem ví dụ sau để làm rõ hơn:


| STT  | Module | Miêu tả |Trọng lượng|
| -------- | -------- | -------- | -------- |
| 1     | Login     |  Dùng để đăng nhập vào hệ thống. Ngoài ra , thiết kế tính năng block account nếu login fail nhiều lần.     |1     |
| 2     | Forgot password     | Dùng để lấy lại password mới      |1     |
| 3     | Tạo/ chính sửa admin     | Thêm mới account , chỉnh sửa các thông tin liên quan như name, email, tel...   |3     |
| 4     | Tạo/ chính sửa Corporation     | Thêm mới Corporation, chỉnh sửa các thông tin liên quan như address, date time, perfecture....      |3     |
| 5     | Tạo/ chính sửa Location     | Thêm mới Corporation, chỉnh sửa các thông tin liên quan như address, date time, tel, mail....     |3     |
| 6     | Tạo/ chính sửa Order     | Thêm mới order, chỉnh sửa các thông tin liên quan như thời gian, số lượng,....     |5     |



**Bước B**  Ước lượng thời gian cho nhiệm vụ
Sau khi phân loại **độ phức tạp** của các chức năng, bạn cần phải ước lượng **thời lượng** để test chúng.

![](https://images.viblo.asia/0c1e600d-4f6a-4f68-8792-2aa4fac2b300.png)

* Total Effort: effort để hoàn thành việc kiểm thử tất cả các chức năng của hệ thống.
* Total Function Points: tổng số  modules của hệ thống
* Estimate defined per Function Points:  effort trung bình để hoàn thành 1 điểm chức năng. Giá trị này phụ thuộc vào năng suất của thành viên chịu trách nhiệm về nhiệm vụ này.

Giả sử dự án của bạn ước lượng 1 điểm chức năng là 4 tiếng. Vậy tổng effort dự tính để kiểm tra tất cả chức năng ở Bước A là: 



| - | Weightage	 | # of Function Points	 |Total |
| -------- | -------- | -------- | -------- |
| Complex	   | 5     | 1     |5     |
| Medium   | 3     | 3     |9     |
| Simple     | 1     | 2     |2     |
| Function Total Points	     |      |      |16     |
| Estimate define per point	   |      |      |4     |
| Total Estimated Effort (Person Hours)	     |      |      |64     |

Tổng số effort để hoàn thành các nhiêm vụ trên là 64 man-hours. 
Nhờ việc hiểu được các effort cần thiết, bạn có thể  xác định được thời gian hoàn thành nhiệm vụ, ước lượng được chi phí lao động.

**Bước C** Ước lượng chi phí cho các nhiệm vụ

Bước này giúp bạn trả lời câu hỏi cuối cùng của khách hàng " **Chi phí là bao nhiêu ?** "
Giả sử, tiền lương của nhóm bạn trung bình là  5 usd/ giờ. Thời gian cần thiết để hoàn thành nhiệm vụ trên là 64 giờ. Theo đó, chi phí cho nhiệm vụ này là 64 X 5 = 320 usd.
Là người quản lý dự án, bạn phải quyết định cách nhận được lợi tức cao nhất cho khoản đầu tư của công ty bạn. Chi phí dự án của bạn càng chính xác, bạn càng có khả năng quản lý ngân sách của dự án của mình tốt hơn.

### Step 4: Xác thực việc ước lượng

Khi bạn tạo ước lượng tổng hợp cho tất cả các nhiệm vụ trong dự án , bạn cần gửi  nó tới ban quản lý và phê duyệt nó.
Ban quản lý sẽ xem xét và thảo luận kế hoạch ước lượng  với bạn. Bạn có thể giải thích cho họ ước lượng của bạn một cách hợp lý để họ có thể phê duyệt kế hoạch ước lượng của bạn.

Nguồn : https://www.guru99.com/an-expert-view-on-test-estimation.html