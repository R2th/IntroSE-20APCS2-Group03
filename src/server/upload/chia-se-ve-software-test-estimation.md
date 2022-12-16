Estimate là một khái niệm mà rất nhiều QA thấy lo lắng khi nhắc đến, bản thân mình khi có task cần estimate cũng vậy, chỉ sợ est thiếu thì toang :v Vậy thì phải làm sao? Mình có tham khảo từ nhiều nguồn tài liệu và kinh nghiệm của các QA đi trước, vô tình đọc được bài này trên trang guru99 thấy khá là hay nên chia sẻ cùng mọi người. Nếu các bạn có tip gì hay khi est thì chia sẻ cho mình ở dưới comment với nhé. Cảm ơn cả nhà 
# Software Test Estimation là gì?
Test Estimation là một hoạt động quản lý mà trong đó người ta sẽ phải ước tính xem mất **bao lâu** thi task được hoàn thành. Việc estimate cho test là một trong những task quan trọng trong việc quản lý testing.
# Tại sao cần Test Estimation?
2 câu hỏi mà khách hàng của bạn có thể quan tâm về phần testing:
![](https://images.viblo.asia/1410dbe4-f5ff-40e8-a735-5e111c4e0420.png)
Việc testing sẽ mất bao lâu và nó sẽ tốn bao nhiêu (về mặt chi phí).

Cho những dự án nhỏ, những câu hỏi này khá dễ để trả lời. Tuy nhiên với dự án lớn, đây là những câu hỏi đòi hỏi phải suy nghĩ rất nhiều để trả lời.

Trong tutorial này, chúng ta hãy cùng xem xét:

* Estimate những gì?
* Estimate như thế nào?
  * Bước 1) Chia dự án lớn thành các subtask nhỏ
  * Bước 2) Chỉ định từng task cho từng member
  * Bước 3) Tính toán Estimate cho từng task
    * Phương pháp 1) Function Point Method
    * Phương Pháp 2) Three Point Estimation
  * Bước 4) Validate các estimation

# Estimate những gì?
![](https://images.viblo.asia/082c4d3a-e9d1-42c3-baac-2d35d6649a76.jpg)
* **Resources:** (tài nguyên) là tất cả những gì cần để hoàn thành task. Đó không chỉ là con người mà còn là trang thiết bị, cơ sở vật chất, kinh phí hay bất cứ thứ gì cần thiết cho việc hoàn thành dự án.
* **Times:** (thời gian) loại tài nguyên giá trị nhất đối với dự án. Mọi dự án đều có deadline cho việc delivery. (Nếu không có nó không phải dự án).
* **Human Skills:** bao gồm kiến thức và kinh nghiệm của team member. Yếu tố này ảnh hướng lớn đến Estimation. Ví dụ, một team có kĩ năng testing kém sẽ tốn nhiều thời gian hơn một team có kĩ năng testing tốt.
* **Cost:** chi phí, đơn giản là cần bao nhiêu tiền để hoàn thành dự án.
# Estimate như thế nào?
Có rất nhiều method để estimate, có thể kể đến như:
* Work Breakdown Structure
* 3-Point Software Testing Estimation Technique
* Wideband Delphi technique
* Function Point/Testing Point Analysis
* Use – Case Point Method
* Percentage distribution
* Ad-hoc method

![](https://images.viblo.asia/fa3de4e9-1a2b-455b-8c75-ebe81be5bab0.png)
* Work breakdown structure (WBS): Chia test project thành những phần nhỏ
* Three point esimation: phương pháp estimate dựa trên dữ liệu thống kê
* Function point method: Tính toán kích thước và đặt trọng số cho từng function point.

Sau đây là quy trình 4 bước để đạt được một estimate. Hãy cùng sử dụng case study của Guru99 Bank để hiểu rõ hơn về cách thức.

![](https://images.viblo.asia/78d96e67-31f7-4d57-af29-d91f7c725bea.png)
## Bước 1) Chia dự án lớn thành các subtask nhỏ (nhỏ nhất có thể)
Task là một phần công việc có thể giao cho một người nào đó. Để thực hiện việc chia task, bạn có thể sử dụng WBS.

Trong kĩ thuật này, một dự án phức tạp được chia thành các module. Module được chia thành các module nhỏ hơn. Mỗi module được hoàn thành thông qua các function. Vấn đề là bạn cần chia dự án thành các task thực sự **nhỏ nhất** có thể.

![](https://images.viblo.asia/824e294d-bbae-4f1b-86fc-246fe2a10618.png)

Sử dụng WBS để chia dự án Guru99 Bank thành 4 task:

![](https://images.viblo.asia/0ca23af7-816e-429a-91b1-e86359325905.png)

Sau đó bạn có thể chia các task thành các subtask. Mục địch của hành động này là để task chi tiết nhất có thể. Ví dụ:

![](https://images.viblo.asia/80d6b7df-2c7d-4697-8df6-e44a8fc01078.png)

## Bước 2) Chỉ định từng task cho từng member
Trong bước này, từng task một sẽ được assign cho từng member hợp lý trong team làm dự án. Bạn có thể tạo một bản assign task như sau:
![](https://images.viblo.asia/33b2cf6c-4c80-4f07-8993-61ef7cc58eb1.png)
## Bước 3) Tính toán Estimate cho từng task

Ở bước này chúng ta có thể dùng 2 phương pháp sau để estimate efford của từng task:
1. **Functional Point Method**
2. **Three Point Estimation**

### Phương thức 1) Function Point Method
Trong method này, Test manager sẽ estimate kích thước, thời gian và chi phí của từng task.

![](https://images.viblo.asia/32cde392-e839-4f81-bdc6-e405091b7926.png)

#### Bước A) Estimate kích thước của task
Từ bước 1, chúng ta đã chia dự án thành các task nhỏ bằng WBS. Giờ chúng ta cấn estimate kích thước của các task đó. Hãy cùng thực hành với một task cụ thể là "Create the test specification"

Kích thước của 1 task phụ thuộc vào kích thước function của hệ thống trong quá trình test. Kích thước function phản ánh số lượng chức năng có liên quan đến người dùng. Càng nhiều chức năng, hệ thống càng phức tạp.


Trước khi bắt đầu nỗ lực ước tính thực tế, các điểm chức năng được chia thành ba nhóm như Phức tạp, Trung bình và Đơn giản như sau:

![](https://images.viblo.asia/b94923df-dd0a-44b9-bf76-17bbcd93745f.png)

Dựa trên độ phức tạp của chức năng, test manager phải đặt trọng số cho từng chức năng, ví dụ như:

![](https://images.viblo.asia/74f6127d-7bb3-40b9-8dab-e527bed0f3c0.png)

Hãy thử làm một ví dụ để hiểu rõ hơn:

Xem xet một đặc tả phần mềm của website Guru99 Bank ở đây, developer sẽ mô tả chi tiết thành từng module, bạn có thể xác định độ phức tạp của feature bằng cách đóng trọng số cho từng module.

Function point càng phức tạp, effort để test nó càng nhiều. Website được chia thành 12 function point, bạn có thể xác định độ phức tạp của từng function point như sau:

![](https://images.viblo.asia/9fcdc60e-e719-48d4-b2c2-ddc404667665.png)

#### Bước B) Estimate thời gian của task
Sau khi phân loại độ khó của từng function point, bạn phải estimate thời gian để test chúng. Nói cách khác, mất bao lâu để test xong chức năng này.

![](https://images.viblo.asia/285ab33a-b339-48ff-8cdc-962e61ebe7cb.png)

* **Total Effort**: Là lượng công sức để hoàn thành việc test cho toàn bộ dự án.
* **Total Function Points**: Toàn bộ module của website
* **Estimate defined per Function Points**:  Công sức trung bình bỏ ra để hoàn thành 1 function points. Giá trị này phục thuộc vào năng xuất của member đã được assign task từ trước.

Giả sử rằng, đội dự án của bạn estimate rằng mỗi function point tốn 5 giờ (5 hours/points). Bạn có thể estimate tổng thời gian để test tất cả các feature như sau:

![](https://images.viblo.asia/68966378-f12b-419b-adaa-7e1aca7ead9a.png)

Vậy, tổng số effort để hoàn thành task “Create the test specification” là 170 man-hours.

Khi bạn hiểu được effort cần có, bạn có thể chỉ định các tài nguyên để xác định thực hiện task mất bao lâu (thời gian) và sau đó bạn có thể ước tính chi phí lao động và phi lao động.

Ví dụ trên cũng cho thấy tầm quan trọng của thành viên trong nhóm của bạn. Nếu bạn có các thành viên tài năng và có kinh nghiệm, bạn có thể hoàn thành nhiệm vụ được giao trong thời gian nhỏ và dự án của bạn sẽ hoàn thành vào thời hạn hoặc sớm hơn.

#### STEP C) Estimate chi phí của tasks
Bước này giúp bạn trả lời câu hỏi cuối cùng của khách hàng. Chi phí bao nhiêu?

Giả sử, trung bình mức lương của đội bạn là 5 đô la mỗi giờ. Thời gian cần thiết cho task “Create Test Specs” là 170 giờ. Theo đó, chi phí cho nhiệm vụ là 5 * 170 = $ 850. Bây giờ bạn có thể tính toán ngân sách cho các hoạt động khác trong WBS và đến ngân sách tổng thể cho dự án.

Là người quản lý dự án, bạn phải quyết định làm thế nào để có được lợi tức cao nhất cho khoản đầu tư của công ty bạn. Ước tính chi phí dự án của bạn càng chính xác, bạn càng có khả năng quản lý ngân sách dự án của bạn càng tốt.

### Phương Thức 2) Three Point Estimation
Three Point Estimation là một trong những kỹ thuật có thể được sử dụng để estimate một task. Sự đơn giản của ước tính ba điểm làm cho nó trở thành một công cụ rất hữu ích cho Người quản lý dự án muốn ước tính.

Trong ước tính ba điểm, ba giá trị được tạo ban đầu cho mọi task dựa trên kinh nghiệm trước đó hoặc dự đoán tốt nhất như sau:

![](https://images.viblo.asia/265eccd5-1b59-4ee2-8e0c-642121be2aa2.png)

Khi ước tính một task, test manager cần cung cấp ba giá trị, như được chỉ định ở trên. Ba giá trị được xác định, ước tính những gì xảy ra ở trạng thái tối ưu, khả năng cao nhất hoặc những gì chúng tôi nghĩ đó sẽ là trường hợp xấu nhất.

Hãy cùng xem cách sử dụng ba giá trị trên trong ví dụ sau:

Đối với task "Create the test specification", bạn có thể ước tính efford thử nghiệm không? Hãy nhớ rằng bạn phải bao gồm tất cả các module của trang web như được thực hiện trong Phương thức function point.

Bạn có thể ước tính như sau:

* Trường hợp tốt nhất để hoàn thành task này là 120 giờ (khoảng 15 ngày). Trong trường hợp này, bạn có một đội ngũ tài năng, họ có thể hoàn thành nhiệm vụ trong thời gian nhỏ nhất.
* Trường hợp có khả năng nhất để hoàn thành task này là 170 giờ (khoảng 21 ngày). Đây là một trường hợp bình thường, bạn có đủ tài nguyên và khả năng để hoàn thành nhiệm vụ
* Trường hợp xấu nhất để hoàn thành task này là 200 giờ (khoảng 25 ngày). Bạn cần thực hiện nhiều công việc hơn vì các thành viên trong nhóm của bạn không có kinh nghiệm.

Ta có vài giá trị như sau:

![](https://images.viblo.asia/11ab6caf-72bd-4402-9450-568db7e1ebca.png)

Ta sử dụng công thức tính như sau:

![](https://images.viblo.asia/4cffa526-4816-46b9-95d2-b3bb37f9dfc0.png)

Trong công thức trên, tham số E được gọi là Trung bình có trọng số. Đó là ước tính của task "Create the test specification".

Nhưng bạn vẫn cần biết ước tính này có khả năng sai lệch là bao nhiêu, ta có:

![](https://images.viblo.asia/1c4de71e-881f-4fc1-850f-d41ba42f44af.png)

Vậy để hoàn thành task “Create the test specification” ta cần 166.6 ± 13.33 Man-hour (153.33 to 179.99 man-hour)

## Bước 4) Xác thực các estimation
Khi bạn tạo ước tính tổng hợp cho tất cả các nhiệm vụ được đề cập trong WBS, bạn cần chuyển tiếp nó đến ban quản lý, người sẽ xem xét và phê duyệt nó.

Thành viên của ban quản lý có thể bao gồm CEO, Giám đốc dự án và các bên liên quan khác.

Ban quản lý sẽ xem xét và thảo luận với bạn về kế hoạch dự toán bạn đã đưa ra. Bạn có thể giải thích cho họ ước tính của bạn một cách hợp lý và hợp lý để họ có thể phê duyệt kế hoạch dự toán của bạn.

Tài liệu tham khảo: Bài viết này được dịch từ [https://www.guru99.com/an-expert-view-on-test-estimation.html](https://www.guru99.com/an-expert-view-on-test-estimation.html)