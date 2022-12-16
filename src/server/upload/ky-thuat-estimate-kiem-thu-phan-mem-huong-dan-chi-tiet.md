## Thế nào là Estimate kiểm thử phần mềm?

Estimation là một hoạt động quản lý, ước tính thời gian một task sẽ hoàn thành. Estimation effort cho việc test là một trong những nhiệm vụ quan trọng và chủ yếu của Test Management.

## Tại sao cần Estimation?

Estimation sẽ giúp bạn trả lời được 2 câu hỏi:

![](https://images.viblo.asia/d3517f3b-c1c0-416e-80d2-00e2ece731b2.png)

## Estimate cái gì?

![](https://images.viblo.asia/8d714751-6e4f-4130-9ec7-e9c90b0755a3.jpg)

**Tài nguyên**: Cần có nguồn lực để thực hiện các task của dự án. Tài nguyên có thể là con người, thiết bị, cơ sở vật chất, kinh phí, hoặc bất kỳ một cái gì có khả năng được định nghĩa bắt buộc để hoàn thành một hoạt động của dự án.

**Thời gian**: Thời gian là tài nguyên quý giá nhất trong một dự án. Tất cả các dự án đều có deadline để phát hành dự án.

**Kỹ năng con người**: Kỹ năng con người là kiến thức và kinh nghiệm của các thành viên đội dự án. Nó sẽ ảnh hưởng đến estimation của bạn. Ví dụ: team có các thành viên có kỹ năng kiểm thử kém thì sẽ mất nhiều thời gian để hoàn thành hơn một team có kỹ năng kiểm thử tốt hơn.

**Chi phí**: Chi phí là ngân sách của dự án. Nó chính là số tiền cần có để hoàn thành dự án.

## Estimate như thế nào?

**Các kỹ thuật estimation:**

- Work Breakdown Structure (cấu trúc phân chia công việc)
- 3-Point Software Testing Estimation Technique (kỹ thuật estimation 3 điểm)
- Wideband Delphi technique
- Function Point/Testing Point Analysis (phân tích điểm chức năng/ điểm kiểm thử)
- Percentage distribution (phân phối phần trăm)
- Ad-hoc method

![](https://images.viblo.asia/54e9328a-b830-4b68-a2fd-a98139a7f1f4.png)

**Sau đây là quy trình 4 bước của việc estimate:**

![](https://images.viblo.asia/f4b8c3c4-95a6-4955-83de-f54b02388887.png)

### 1. Step 1: Phân chia toàn bộ task cả dự án thành các sub-task

Task là một phần công việc đã được giao cho ai đó. Để phân chia task, bạn có thể sử dụng kỹ thuật Work Breakdown Structure.

Sử dụng kỹ thuật này, một dự án phức tạp sẽ được phân chia thành các module. Các module tiếp tục được phân chia thành các sub-module. Mỗi sub-module lại được phân chia thành các chức năng. Điều đó có nghĩa là phân chia task của dự án thành những task nhỏ nhất.

![](https://images.viblo.asia/b56004d0-222d-48e9-a4ec-97b8afeaa317.png)

Sử dụng Work Break Down structure để chia dự án Guru99 Bank thành 5 task nhỏ hơn:

![](https://images.viblo.asia/9d819846-4f19-410b-9e6b-4fc59f261cb8.png)

Sau đó, bạn có thể chi mỗi task thành các sub-task. Mục đích của hoạt động này là tạo các task chi tiết nhất có thể.

| Task | Sub task  |
| -------- | --------  |
| Phân tích đặc tả yêu cầu phần mềm   |  - Xem xét đặc tả yêu cầu phần mềm - Trò chuyện với developer và các bên liên quan để hiểu hơn về website |
| Create Test Specification   | - Thiết kế Test Scenario - Create Test case - Review và sửa đổi test case|
| Thực thi test case   | - Xây dựng môi trường kiểm thử - Thực thi test case - Review kết quả test|
| Báo cáo defect   | - Create defect report - Báo cáo defect|

### 2. Step 2: Chỉ định task cho member

Ở bước này, mỗi task sẽ được gán cho thành viên thích hợp trong team dự án. Bạn có thể gán như sau:

| Task | Members | 
| -------- | -------- | 
| Phân tích đặc tả yêu cầu phần mềm   |  Tất cả member|
| Create Test Specification   |  Tester/ Test Analyst|
| Xây dựng môi trường test   | Test Administrator |
| Thực thi test case   | Tester, Test Administrator |
| Báo cáo defect   | Tester|

### 3. Step 3: Estimate effort cho task

Có 2 kỹ thuật bạn có thể sử dụng để estimate effort cho task:

- Functional Point Method (phương thức điểm chức năng)
- Three Point Estimation (ước tính 3 điểm)

### Phương thức 1. Functional Point Method

Với phương thức này, Test Manager sẽ estimate độ lớn, thời gian, và chi phí cho các task.

![](https://images.viblo.asia/7821f61a-9edd-42d6-892f-f3e3f13f7215.png)

**Step A) Estimate độ lớn của task**

Ở bước 1, bạn đã sử dụng phương thức WBS để chia toàn bộ task dự án thành các task nhỏ. Bây giờ bạn sẽ estimate độ lớn của các task đó. Hãy cùng thực hành với task "Tạo test specification"

Độ lớn của task này phụ thuộc vào độ lớn chức năng của hệ thống cần test. Độ lớn chức năng phản ánh số lượng chức năng có liên quan đến người dùng. Càng nhiều chức năng thì hệ thống càng phức tạp.

Trước khi bắt đầu estimate effort, điểm chức năng được phân chia thành 3 nhóm như Complex, Medium, Simple:

![](https://images.viblo.asia/ba1b9b79-6cb3-43c2-935a-a76041488aec.png)

Dựa vào độ phức tạp của chức năng phần mềm, Test Manager phải đánh trọng lượng (weightage) cho mỗi chức năng. Ví dụ:

|Group | Weightage | 
| -------- | -------- | 
| Complex    | 5    | 
| Medium    | 3    | 
| Simple     | 1     | 

**Step B) Estimate duration làm task**

Sau khi xác định độ phức tạp của các điểm chức năng, bạn phải estimate duration test chúng. Duration là khoảng thời gian bạn cần để kết thúc task. 

![](https://images.viblo.asia/31d2fc3d-f1f1-487d-a2a0-2184b76d3bf5.png)

- Tổng effort: effort cần để hoàn thành việc kiểm tra tất cả các chức năng của trang web.
- Tổng điểm chức năng: tổng số các module của trang web
- Estimate xác định cho mỗi điểm chức năng: effort trung bình để hoàn thành một điểm chức năng. Giá trị này phụ thuộc vào hiệu suất của thành viên sẽ thực hiện task này.

Ví dụ: Giả sử team dự án của bạn estimate cho mỗi điểm chức năng là 5 giờ/điểm. Bạn có thể estimate tổng số effort để test tất cả các tính năng của ví dụ trong step A như sau:

|  | Weightage | Số điểm chức năng |Total |
| -------- | -------- | -------- |-------- |
| Complex    | 5     | 3   |15    |
| Medium    | 3    | 5  |15    |
| Simple    | 1     | 4   |4    |
| Tổng số điểm chức năng   |    |    | 34   |
| Estimate cho mỗi điểm chức năng  |    |    | 5   |
| Tổng số estimate effort   |    |    |170   |

Khi bạn nắm được effort cần thiết, bạn có thể chỉ định các nguồn lực để xác định nhiệm vụ sẽ mất bao lâu (thời gian) và sau đó bạn có thể ước tính chi phí lao động và phi lao động.

**Step C) Estimate chi phí của task**

Bước này sẽ giúp bạn trả lời cho câu hỏi cuối cùng của khách hàng: "Chi phí là bao nhiêu?"

Giả sử, lương trung bình của team là 5$/giờ. Thời gian yêu cầu của task "Create Test Specs" là 170 giờ. Thì chi phí cho task này là 5 * 170=850$. Bây giờ bạn có thể tinh toán ngân sách cho các hoạt động khác và tính được tổng ngân sách của dự án.

Là một project manager, bạn phải quyết định làm thế nào để thu được nhiều lợi nhuận nhất cho công ty. Ước tính chi phí dự án của bạn càng chính xác, bạn càng có thể quản lý ngân sách của dự án tốt hơn.

### PHƯƠNG PHÁP 2) Estimate 3 điểm

Estimate 3 điểm là một trong những kỹ thuật có thể được sử dụng để estimate cho task. Với kỹ thuật này, 3 giá trị được sản xuất ban đầu cho các task dựa vào kinh nghiệm trước hoặc dự đoán tốt nhất như sau:

![](https://images.viblo.asia/75a1031c-db38-4ca1-907f-0b5c4a798c3f.png)

Khi estimate một task, Test Manager cần cung cấp 3 giá trị như đã xác định ở trên. 3 giá trị được xác định là:  estimate những gì xảy ra trong** trạng thái tối ưu**, điều gì **có khả năng xảy ra cao nhất**, hoặc điều gì bạn nghĩ là **trường hợp xấu nhất**.

Ví dụ: Với task "Create the test specification" (Tạo đặc tả test), bạn có thể estimate như sau:

- Trường hợp tối ưu nhất để hoàn thành task này là 120 man-hours (khoảng 15 ngày). Với case này, bạn có một đội ngũ tài năng, bạn có thể hoàn thành task với thời gian ngắn nhất.
- Trường hợp khả dĩ nhất để hoàn thành task này là 170 man-hours (khoảng 21 ngày). Đây là case cơ bản, bạn có đủ nguồn lực và khả năng để hoàn thành task này.
- Trường hợp xấu nhất để hoàn thành task này là 200 man-hours (khoảng 25 ngày). Bạn cần làm nhiều việc hơn vì các thành viên trong team bạn chưa có kinh nghiệm.

Bây giờ, gán các giá trị cho từng tham số như sau:

![](https://images.viblo.asia/f44e56b5-ee24-4977-92da-bf4473265387.png)

Effort để hoàn thành task có thể được tính toán bằng công thức phân phối tam giác kép (double-triangular distribution) như sau:

![](https://images.viblo.asia/5a61171e-fc4b-4d64-b956-30782b8f4fc4.png)

Trong đó, tham số E là Weighted Average (bình quân gia quyền). Nó là estimate của task "Create test specification".

Công thức trên chỉ có thể xác định giá trị có thể chứ không phải một giá trị nhất định. Do đó, nếu sếp hỏi: "Xác suất của ước tính đúng là bao nhiêu?" thì bạn có thể sử dụng công thức sau:

![](https://images.viblo.asia/da90be2b-8c9e-46c1-9bf4-f6094099c72c.png)

Trong đó, SD là Standard Deviation (Độ lệch tiêu chuẩn). Giá trị này có thể cung cấp cho bạn xác suất của ước tính đúng. 

Sau đó, bạn có thể kết luận estimate của task "Create test specification" là: 166.6 ± 13.33 man-hours (153.33 to 179.99 man-hour).

### 4. Step 4: Xác thực estimation

Khi bạn tạo một ước tính tổng hợp cho tất cả các nhiệm vụ được đề cập trong WBS, bạn cần chuyển nó đến ban quản lý để quản lý xem xét và phê duyệt nó.

Thành viên ban quản lý có thể bao gồm Giám đốc điều hành, Giám đốc dự án và các bên liên quan khác.

Ban quản lý sẽ cùng bạn xem xét và thảo luận về phương án dự toán. Bạn có thể giải thích cho họ ước tính của bạn một cách logic và hợp lý để họ có thể chấp thuận kế hoạch ước tính của bạn.

Tham khảo: https://www.guru99.com/an-expert-view-on-test-estimation.html