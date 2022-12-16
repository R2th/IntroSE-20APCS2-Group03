### 1. What is Software Test Estimation?
Test Estimation là một hoạt động quản lý gần đúng thời gian thực hiện một Task. Ước tính effort cho việc testing là một trong những nhiệm vụ chính và quan trọng trong Test Management.

### 2. Why Test Estimation?
Hai câu hỏi bạn có thể mong đợi từ khách hàng của mình khi thảo luận về các cam kết thử nghiệm đó là:
![](https://images.viblo.asia/55ca6e1b-8978-45d2-a404-29d373e96123.png)

Đối với các dự án nhỏ, những câu hỏi này tương đối dễ trả lời. Nhưng đối với dự án lớn như trang web của `Ngân hàng`, bạn phải suy nghĩ kỹ để trả lời những câu hỏi đó. Vậy chúng ta cùng tìm hiểu nhé

### 3. What to Estimate?
![](https://images.viblo.asia/43d2814c-a3c8-4014-8620-3fe569e7c804.png)

- **Resources**: Resources được yêu cầu để thực hiện bất kỳ task của dự án. Đó có thể là người, thiết bị, phương tiện, tài trợ hoặc bất cứ thứ gì có khả năng định nghĩa cần thiết để hoàn thành một hoạt động của dự án.
- **Times** : Thời gian là tài nguyên quý giá nhất trong một dự án. Mỗi dự án đều có deadline.
- **Human Skills**: Kỹ năng của con người có nghĩa là kiến thức và kinh nghiệm của các thành viên trong Team. Nó ảnh hưởng đến estimation của bạn. Ví dụ, một team, có thành viên có kỹ năng testing thấp, sẽ mất nhiều thời gian hơn để hoàn thành dự án so với nhóm có kỹ năng testing cao.
- **Cost**: Cost là budge của dự án. Nói chung, nó có nghĩa là phải mất bao nhiêu tiền để hoàn thành dự án.

### 4. How to estimate?
Danh sách các kỹ thuật Estimation kiểm thử phần mềm
- Work Breakdown Structure
- 3-Point Software Testing Estimation Technique
- Wideband Delphi technique
- Function Point/Testing Point Analysis
- Use – Case Point Method
- Percentage distribution
- Ad-hoc method

![](https://images.viblo.asia/d04a3292-9ba3-4122-92de-74b9bc37ef23.png)

- Chia nhỏ dự án thử nghiệm thành từng mảnh nhỏ.
- Phương pháp ước tính dựa trên dữ liệu thống kê.
- Đo size và  trọng số cho từng điểm chức năng.

- Sau đây là quy trình 4 Bước để đi đến estimate

![](https://images.viblo.asia/8e8901e9-bf4e-4794-b8fc-22f16e8987c4.png)

**Step1) Divide the whole project task into subtasks**

- Task là một phần công việc đã được giao cho ai đó. Để làm điều này, bạn có thể sử dụng kỹ thuật `Work Breakdown Structure`.
- Trong kỹ thuật này, một dự án phức tạp được chia thành các modules. Các modules được chia thành các sub-modules. Mỗi sub- modules được chia thành chức năng. Nó có nghĩa là chia toàn bộ task của dự án thành các task nhỏ nhất.

![](https://images.viblo.asia/c27434a3-c00d-461f-b147-1f9f75ee6a78.png)

- Sau đó, bạn có thể break out từng task thành những task con. Mục đích của hoạt động này là tạo ra task càng chi tiết càng tốt. 

![](https://images.viblo.asia/f8cb9680-57d9-418e-afa0-05efb8244fdf.png)

| Task |Sub task | 
| -------- | -------- |
| Phân tích đặc tả yêu cầu phần mềm  | Điều tra các thông số kỹ thuật yêu cầu mềm <hr> Trao đổi với developer và các bên liên quan khác để biết thêm về dự án| 
|Tạo Test Specification  | Design test scenarios <hr> Create test cases <hr> Review and revise test cases | 
|Execute the test cases  | Build up the test environment <hr> Execute the test cases <hr> Review test execution results| 
|Report the defects  | Create the Defect reports <hr> Report the defects| 


**Step 2) Allocate each task to team member**

Trong bước này, mỗi task được giao cho thành viên phù hợp trong team dự án. Bạn có thể assign task như sau:

| Task |Member | 
| -------- | -------- |
| Phân tích đặc tả yêu cầu phần mềm  | Tất cả member| 
|Tạo Test Specification  | Tester/Test Analyst | 
|Build up the test environmen  | Test Administrator | 
|Execute the test cases  | Tester, Test Administrator| 
|Report the defects  | Tester| 

**Step 3) Effort Estimation For Tasks**

Có 2 kỹ thuật mà bạn có thể áp dụng để estimate  effort cho các task:
- Functional Point Method
- Three Point Estimation

**Method 1) Function Point Method**
Trong phương pháp này, Test Manager sẽ estimates Size, Thời lượng và Chi phí cho các Task

![](https://images.viblo.asia/43e76a26-91f2-4f2f-9434-7054a6838f26.png)

**Step A) Estimate size for the task**
- Ở Bước 1, bạn đã chia toàn bộ task của dự án thành task nhỏ bằng cách sử dụng phương thức WBS. Bây giờ bạn estimate size của những task. Hãy cùng thực hành với một task cụ thể "**Tạo ra test specification**”.
- Size của task này phụ thuộc vào size chức năng của hệ thống được testing. Size chức năng phản ánh số lượng chức năng có liên quan đến người dùng. Số lượng chức năng càng nhiều, hệ thống càng phức tạp.
- Trước khi bắt đầu estimate effort thực tế, các điểm chức năng được chia thành ba nhóm như **Complex** (Phức tạp), **Medium** (Trung bình) và  **Simple** (Đơn giản) như sau:

![](https://images.viblo.asia/9722960e-d71e-4082-bd16-ff3c239041bc.png)

- Dựa trên sự phức tạp của các chức năng phần mềm, Test Manager sẽ  phải cung cấp đủ trọng số cho từng điểm chức năng. Ví dụ

| Group |Weightage | 
| -------- | -------- |
| Complex  | 5| 
|Medium  | 2 | 
|Simple	  | 1 | 

- Hãy cùng mình làm 1 ví dụ ở dưới đây nhé (Ví dụ mình có những chức năng về Website ngân hàng ở đây)

| No. | Module Name | Applicable Roles |Description |Weightage |
| -------- | -------- | -------- |-------- |-------- |
| 1     | Balance Enquiry    | Manager và Customer     |**Customer**: Một khách hàng có thể có nhiều tài khoản ngân hàng. Anh ta chỉ có thể xem số dư tài khoản của mình <hr> **Manager**: Người quản lý có thể xem số dư của tất cả các khách hàng chịu sự giám sát của mình  |3 |
| 2   | Fund Transfer   | Manager và Customer     |**Customer**: Một khách hàng có thể chuyển tiền từ tài khoản của riêng mình vào bất kỳ tài khoản nào. <hr> **Manager**: Người quản lý có thể chuyển tiền từ bất kỳ tài khoản ngân hàng nguồn  nào sang tài khoản đích  |5 |
| 3   | Change Password   | Manager và Customer     |**Customer**: Một khách hàng có thể thay đổi mật khẩu chỉ tài khoản của mình. <hr> **Manager**:  Người quản lý chỉ có thể thay đổi mật khẩu tài khoản của mình. Anh ta không thể thay đổi mật khẩu của khách hàng của mình |1 |
|4   | New Customer   | Manager     |**Manager**: Người quản lý có thể thêm một khách hàng mới. <hr> **Manager**: Người quản lý có thể chỉnh sửa các chi tiết như địa chỉ, email, điện thoại của khách hàng. |3 |
|5   | Customized Statement   | Manager và Customer    |**Customer**: Một khách hàng có thể thấy Customized Statement tài khoản của riêng mình. <hr> **Manager**:  Người quản lý có thể thấy Customized Statement của bất kỳ tài khoản nào. |5 |
|6   | Edit Account   | Manager    |**Manager**:  Người quản lý có thể thêm chi tiết chỉnh sửa tài khoản cho tài khoản hiện có. |1 |
|7   | Delete Customer   | Manager    |**Manager**:  Người quản lý có thể xóa 1 customer |1 |
|8   | Deposit   | Manager    |**Manager**:  Một người quản lý có thể gửi tiền vào bất kỳ tài khoản nào |3 |

**STEP B) Estimate duration for the task**
- Sau khi phân loại độ phức tạp của các điểm chức năng, bạn phải estimate  thời lượng để  testing chúng. Thời lượng có nghĩa là bao nhiêu thời gian cần để hoàn thành task.

![](https://images.viblo.asia/eb69b50f-8b6c-4bb9-8ac2-587d24907fba.png)

- **Total Effort**: Effort để  hoàn toàn tất cả các bài test cho chức năng của trang web.
- **Total Function Points**: Tổng modules của website
- **Estimate defined per Function Points**: Effort  trung bình để hoàn thành một điểm chức năng. Giá trị này phụ thuộc vào năng suất của thành viên sẽ phụ trách task này.

- Giả sử team dự án của bạn đã ước tính được xác định cho mỗi Điểm chức năng là 5 giờ / điểm, thì bạn có thể estimate cho website ngân hàng như sau:

| Group | Weightage |# of Function Points |Total |
| -------- | -------- | -------- |-------- |
| Complex     | 5     | 2     |10 |
| Medium     | 3     | 3     |9|
| Simple     | 1     | 3     |3 |
|**Function Total Points** |||**22** |
|**Estimate define per point**	|||**5** |
|**Total Estimated Effort (Person Hours)**	|||**110** |

**STEP C) Estimate the cost for the tasks**
- Bước này giúp bạn trả lời câu hỏi cuối cùng của khách hàng. Chi phí bao nhiêu?
- Giả sử, trung bình mức lương của đội bạn là 5 đô la mỗi giờ. Thời gian cần thiết cho nhiệm vụ của `Tạo Test Specs` là 110 giờ. Theo đó, chi phí cho nhiệm vụ là **5 * 110 = $ 550**. Bây giờ bạn có thể tính toán budget cho các hoạt động khác trong WBS và đến budge tổng thể cho dự án.


**METHOD 2) Three Point Estimation**
- Three-Point estimation là một trong những kỹ thuật có thể được sử dụng để estimate cho 1 task. Sự đơn giản của `Three-point estimation` làm cho nó trở thành một công cụ rất hữu ích cho Project Manager của dự án muốn ước tính.

![](https://images.viblo.asia/5481a3cc-c000-48b8-8222-82e2be46e6c0.png)

- Khi estimating 1 task, Test Manager  cần cung cấp ba giá trị, như được chỉ định ở trên. Ba giá trị được xác định, estimate  những gì xảy ra ở trạng thái tối ưu, khả năng để hoàn thành dự án hoặc đó sẽ là trường hợp xấu nhất.
- Ví dụ đối với Website ngân hàng như mình đã chia sẽ ở trên thì:
   + Trường hợp **best case** để hoàn thành nhiệm vụ này là 80 man-hours (khoảng 10 ngày). Trong trường hợp này, bạn có một đội ngũ tài năng, họ có thể hoàn thành nhiệm vụ trong thời gian nhỏ nhất.
   + Trường hợp  **most likely** có khả năng nhất  để hoàn thành nhiệm vụ này là 110 man-hours (khoảng 14 ngày). Đây là một trường hợp bình thường, bạn có đủ tài nguyên và khả năng để hoàn thành nhiệm vụ.
   + Trường hợp **worst case** để hoàn thành nhiệm vụ này là 160 man-hours (khoảng 20 ngày). Bạn cần thực hiện nhiều công việc hơn vì các thành viên trong nhóm của bạn không có kinh nghiệm.

- Bây giờ, gán giá trị cho từng tham số như dưới đây:
  + **a** = 80
  + **m** = 110
  + **b** = 160
- Vậy effort  hoàn thành task có thể được tính bằng công thức phân phối tam giác đôi như sau:

```
E = (a+4m+b)/6
E= (80+ (4*110) + 160)/6
E = 113.3 (man-hours)
```

- Trong công thức trên, tham số E được gọi là Trung bình có trọng số. Đó là estimation của task `Tạo ra  test specification`.

**Step 4) Validate the estimation**
- Khi bạn tạo ước tính tổng hợp cho tất cả các task được đề cập trong WBS, bạn cần chuyển tiếp nó đến ban quản lý, người sẽ xem xét và phê duyệt nó.

![](https://images.viblo.asia/7ca18699-8c38-4acf-9bdf-8d7e11b4cdb2.png)

- Thành viên của ban quản lý có thể bao gồm CEO, Project Manager và các bên liên quan khác.
- Ban quản lý sẽ xem xét và thảo luận về estimation plan của bạn với bạn. Bạn có thể giải thích cho họ estimation của bạn một cách hợp lý và để họ có thể phê duyệt estimation plan của bạn.

### 5. Test estimation best practices
Chủ đề này giới thiệu các mẹo chung về cách estimate Testing:
- **Add some buffer time**: Nhiều điều không thể đoán trước có thể xảy ra với dự án của bạn, chẳng hạn như một thành viên nhóm tài năng đột ngột rời bỏ công việc của mình, việc Testing mất nhiều thời gian hơn so với ước tính để hoàn thành, v.v. Đó là lý do tại sao bạn cần đưa một số bộ đệm vào dự toán của mình. Có một bộ đệm trong ước tính cho phép đối phó với bất kỳ sự chậm trễ nào có thể xảy ra.
- **Account Resource planning in estimation**: Bạn nên làm gì nếu một số thành viên trong team của bạn nghĩ trong thời gian dài? Nó có thể trì hoãn dự án. Resource planning trong dự toán đóng một vai trò quan trọng. Sự sẵn có của các nguồn lực khác sẽ giúp đảm bảo rằng các ước tính là thực tế. Ở đây bạn phải xem xét các ngày nghỉ của thành viên trong team bạn.
- **Use the past experience as reference**: Kinh nghiệm từ các dự án cũ đóng một vai trò quan trọng trong khi chuẩn bị estimates thời gian. Bởi vì một số dự án có thể là một số tương tự, bạn có thể sử dụng lại estimates trong dự án cũ. Ví dụ: nếu bạn sử dụng để thực hiện một dự án như testing trang web, bạn có thể học hỏi từ kinh nghiệm đó, cố gắng tránh tất cả những khó khăn hoặc vấn đề đã gặp phải trong các dự án trước đây.
- **Stick to your estimation**: Estimate chỉ là ước tính vì nó có thể sai. Trong giai đoạn đầu của dự án, bạn nên thường xuyên kiểm tra lại các estimate và thực hiện sửa đổi nếu cần. Chúng ta không nên mở rộng dự toán sau khi chúng ta sửa nó, trừ khi có những thay đổi lớn trong yêu cầu hoặc bạn phải thương lượng với khách hàng về việc ước tính lại.

**Nguồn Tham khảo:**
- https://www.guru99.com/an-expert-view-on-test-estimation.html