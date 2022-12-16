## Test Estimation là gì?
Test Estimation là một hoạt động ước lượng gần đúng thời gian thực hiện một task (Nhiệm vụ). Ước tính nỗ lực cho việc test là một trong những task chính và quan trọng trong việc Quản lý test.
## Tại sao phải  Estimate?
Hai câu hỏi bạn có thể nhận được từ khách hàng của mình khi thảo luận về các cam kết trong quá trình test là
![](https://images.viblo.asia/60b26c50-f8f2-408f-838c-affffe8043bd.png)


Đối với các dự án nhỏ, những câu hỏi này tương đối dễ trả lời. Nhưng đối với dự án lớn, bạn phải suy nghĩ kỹ để trả lời những câu hỏi đó.

Trong hướng dẫn này, bạn sẽ học-

Test Estimation là gì?
Tại sao phải thực hiện Test Estimation?
Estimate cái gì?
Làm thế nào để Estimate?
Bước 1) Chia toàn bộ task dự án thành các Sub task (task nhỏ)
Bước 2) Phân bổ từng task cho các thành viên trong nhóm
Bước 3) Estimate nỗ lực cho các task
Phương pháp 1) Phương pháp Function Point 
Phương pháp 2) Three Point Estimation
Bước 4) Xác thực estimate
Thực hành Test Estimation một cách chính xác nhất
Kỹ thuật khác

## Estimate cái gì?
![](https://images.viblo.asia/b466c6e2-9979-4252-84b2-47a84e882447.jpg)

* ***Resource (Tài nguyên):*** Resource được yêu cầu để thực hiện 1 task bất kỳ của dự án. Đó có thể là con người, thiết bị, phương tiện, tài trợ hoặc bất cứ thứ gì có khả năng cần thiết để hoàn thành một hoạt động của dự án.
* ***Time (Thời gian):*** Thời gian là tài nguyên quý giá nhất trong một dự án. Mỗi dự án đều có một thời hạn bàn giao riêng.
* ***Human skill (Kỹ năng của con người):*** Kỹ năng của con người có nghĩa là kiến thức và kinh nghiệm của các thành viên trong Đội. Chúng ảnh hưởng đến việc estimate của bạn. Ví dụ, một nhóm với những thành viên có kỹ năng test thấp sẽ mất nhiều thời gian hơn để hoàn thành dự án so với nhóm có kỹ năng test cao.
* ***Cost (Chi phí):*** Chi phí là ngân sách dự án . Nói chung, nó có nghĩa là phải mất bao nhiêu tiền để hoàn thành dự án.
## Làm thế nào để Estimate?
Danh sách các kỹ thuật ước Test estimation một dự án phần mềm

* Cấu trúc Work Break Down
* Kỹ thuật 3-Point
* Kỹ thuật Wideband Delphi
* Phân tích Function Point/Testing Point
* Phương pháp Use – Case Point 
* Phân chia theo tỷ lệ phần trăm
* Phương pháp Ad-hoc
![](https://images.viblo.asia/d591a227-43a1-42b4-8e5b-4583edf41027.png)

Sau đây là quy trình 4 Bước để thực hiện Estimation
![](https://images.viblo.asia/579a868e-6c46-4840-88fd-f27a6159fa27.png)

### Bước 1) Chia toàn bộ task của dự án thành các task nhỏ
Task là một phần công việc đã được giao cho ai đó. Để làm điều này, bạn có thể sử dụng kỹ thuật Cấu trúc Work Break Down.

Trong kỹ thuật này, một dự án phức tạp được chia thành các mô-đun. Các mô-đun được chia thành các mô-đun phụ. Mỗi mô-đun phụ được chia thành chức năng. Nó có nghĩa là chia toàn bộ task của dự án thành các sub task nhất.
![](https://images.viblo.asia/debf4685-b06a-4f04-9026-01567149fc7f.png)

Sử dụng cấu trúc Work Break Down để chia 1 dự án Ngân hàng thành 5 Sub task 
![](https://images.viblo.asia/ebd8e31a-fd1b-491b-8468-04d7fee9788d.png)

Sau đó, bạn có thể chia ra từng task cho Sub task . Mục đích của hoạt động này là tạo ra task càng chi tiết càng tốt.

### Bước 2) Phân bổ từng task cho các thành viên trong nhóm
Trong bước này, mỗi task sẽ được giao cho thành viên phù hợp trong nhóm dự án. Bạn có thể được giao task như sau:

### Bước 3) Estimation effort  cho các task
Có 2 kỹ thuật có thể áp dụng để estimation effort  cho các task

**1. Phương pháp Function Point**

**2. Three Point Estimation**

### Phương pháp 1) Phương pháp Function Point
Trong phương pháp này, Test Manager sẽ estimation Độ phức tạp, Thời lượng và Chi phí cho các task.
![](https://images.viblo.asia/76695ba8-5459-422a-904d-3939267fee1b.png)

**Bước A) Estimate độ phức tạp của task**

Ở Bước 1 , bạn đã chia toàn bộ task của dự án thành sub task bằng cách sử dụng phương pháp WBS. Bây giờ bạn estimate độ phức tạp của mỗi task. Hãy thực hành với một task đặc biệt “ *Tạo test đặc tả* ”.

Độ phức tạp của task này phụ thuộc vào độ lớn chức năng của hệ thống test. Độ lớn chức năng phản ánh số lượng chức năng có liên quan đến người dùng. Độ lớn càng cao, hệ thống càng phức tạp.

Trước khi bắt đầu estimate effort thực tế, các Function Point được chia thành ba nhóm Phức tạp , Trung bình Đơn giản như sau:
![](https://images.viblo.asia/346116bb-6f23-4cb6-aecb-d9e370d185a3.png)


Dựa trên độ phức tạp của các chức năng phần mềm, Test Manager có đủ cơ sở để phân loại các task

| Nhóm| Trọng lượng |
| -------- | -------- | 
| Phức tạp     | 5     |
| Trung bình     | 3     |
| Đơn giản     | 1     |

**BƯỚC B) Estimate thời lượng cho nhiệm vụ**

Sau khi phân loại độ phức tạp của các chức năng, bạn phải estimate thời lượng để test chúng. Thời lượng có nghĩa là bao nhiêu thời gian cần để hoàn thành task.
![](https://images.viblo.asia/4e763fe9-305d-45f3-b52f-51ff323a8b06.png)

* **Tổng effort**: Effort để test tất cả các chức năng của trang web
* **Tổng Function Points** : Tổng số mô-đun của trang web
* **Estimate được xác định cho mỗi Function Points** : Effort trung bình để hoàn thành một Function Point. Giá trị này phụ thuộc vào năng suất của thành viên sẽ phụ trách task này.

Giả sử nhóm dự án của bạn đã estimate được cho mỗi Function Point là 5 giờ / Point . Bạn có thể estimate toàn bộ effort để test tất cả các tính năng của một trang web như sau:

| Column 1 | Weightage | Function Points | Tổng |
| -------- | -------- | -------- |-------- |
| Phức tạp     | 5     | 3     | 15     |
| Trung bình     | 3     | 5     | 15     |
| Đơn giản     | 1     | 4     | 4     |
| Tổng Function Points     |      |      | 34     |
| Estimate được xác định cho mỗi point     |      |      | 5     |
| Tổng Estimated Effort (Person Hours)     |      |      | 170     |

Vậy toàn bộ effort để hoàn thành task "*Tạo ra đặc tả test*" của web Ngân hàng là khoảng 170 giờ

Khi bạn hiểu được effort cần có, bạn có thể chỉ định các tài nguyên để xác định thời gian thực hiện task (thời gian) và sau đó bạn có thể ước tính chi phí lao động và phi lao động.

Ví dụ trên cũng cho thấy tầm quan trọng của thành viên trong nhóm của bạn. Nếu bạn có các thành viên tài năng và có kinh nghiệm , bạn có thể hoàn thành nhiệm vụ được giao trong thời gian nhỏ và dự án của bạn sẽ hoàn thành đúng thời hạn hoặc sớm hơn.

**BƯỚC C) Estimate chi phí cho các nhiệm vụ**

Bước này giúp bạn trả lời câu hỏi cuối cùng của khách hàng. Chi phí bao nhiêu?

Giả sử, trung bình mức lương của đội bạn là 5 đô la mỗi giờ. Thời gian cần thiết cho nhiệm vụ Tạo Test Specs là 170 giờ. Theo đó, chi phí cho nhiệm vụ là 5 * 170 = $ 850. Bây giờ bạn có thể tính toán ngân sách cho các hoạt động khác trong WBS và tính ra ngân sách tổng thể cho dự án.

Là người quản lý dự án, bạn phải quyết định làm thế nào để có được lợi tức cao nhất cho khoản đầu tư của công ty bạn. Estimate chi phí dự án của bạn càng chính xác, bạn càng có khả năng quản lý ngân sách dự án tốt hơn .

### PHƯƠNG PHÁP 2) Three Point Estimation

Three Point Estimation là một trong những kỹ thuật có thể được sử dụng để estimate một task. Sự đơn giản của Three Point Estimatio làm cho nó trở thành một công cụ rất hữu ích cho Người quản lý dự án muốn estimate.

Trong Three Point Estimatio, ba giá trị được tạo ban đầu cho mọi tác vụ dựa trên kinh nghiệm trước đó hoặc dự đoán tốt nhất như sau
![](https://images.viblo.asia/3ff5bb53-006d-4245-b9ef-fb212b37a032.png)

Khi estimate một task, Test Manager cần cung cấp ba giá trị, như được chỉ định ở trên. Ba giá trị được xác định, estimate những gì xảy ra ở trạng thái tối ưu , khả năng cao nhất hoặc những gì chúng ta nghĩ đó sẽ là trường hợp xấu nhất .

Hãy xem cách sử dụng ba giá trị trên trong ví dụ sau

Đối với mỗi task, hãy tạo ra "đặc tả test" , bạn có thể estimate số effort cần để test không? Hãy nhớ rằng bạn phải estimate tất cả các mô-đun của trang web Ngân hàng như được thực hiện trong Phương thức Function Point 

Bạn có thể estimate như sau

* Best case (Điều kiện tốt nhất) để hoàn thành task này là 120 người - giờ (khoảng 15 ngày). Trong trường hợp này, bạn có một đội ngũ tài năng, họ có thể hoàn thành nhiệm vụ trong thời gian ngắn nhất.
* Most likely case (Điều kiện có thể) để hoàn thành nhiệm vụ này là 170 người - giờ (khoảng 21 ngày). Đây là một trường hợp bình thường, bạn có đủ tài nguyên và khả năng để hoàn thành task.
* Worst case (Trường hợp xấu nhất) để hoàn thành nhiệm vụ này là 200 người - giờ (khoảng 25 ngày). Bạn cần thực hiện nhiều công việc hơn vì các thành viên trong nhóm của bạn không có kinh nghiệm.

Bây giờ, gán giá trị cho từng tham số như dưới đây
![](https://images.viblo.asia/b7d0d825-aa9e-427b-92e4-6f79e20ff5bf.png)

Effort hoàn thành task có thể được tính bằng công thức phân phối tam giác đôi như sau-
![](https://images.viblo.asia/6af96935-3b35-4c2f-953d-3095ea0e81ba.png)


Trong công thức trên, tham số E được gọi là Trung bình Weighted. Đó là estimate của task. Tạo đặc tả test.

Bạn có thể sử dụng công thức khác:
![](https://images.viblo.asia/dbaf2bb5-ad76-426f-a0e0-667f96aac108.png)


Trong công thức trên, SD có nghĩa là Độ lệch chuẩn, giá trị này có thể cung cấp cho bạn thông tin về xác suất estimate chính xác.

Bây giờ bạn có thể kết thúc việc estimate cho task, hãy tạo đặc tả test.

Để hoàn thành nhiệm vụ, hãy tạo ra đặc tả test Trang web của Ngân hàng , bạn cần 166,6 ± 13,33 giờ (153,33 đến 179,99 giờ)

### Bước 4) Xác thực estimate
Khi bạn tạo estimate tổng hợp cho tất cả các nhiệm vụ được đề cập trong WBS, bạn cần chuyển tiếp nó đến các manager , người sẽ xem xét và phê duyệt nó.
![](https://images.viblo.asia/46a20285-dbc5-4826-8021-352ff64d4a99.jpg)

Thành viên của ban quản lý có thể bao gồm CEO, Giám đốc dự án và các bên liên quan khác.

Các manager sẽ xem xét và thảo luận về kế hoạch estimate của bạn cùng với bạn. Bạn có thể giải thích cho họ estimate của bạn một cách hợp lý để họ có thể phê duyệt nó.

## Thực hành Test Estimation một cách chính xác nhất
Chủ đề này giới thiệu các mẹo chung về cách Test Estimation chính xác.

* **Thêm một số thời gian đệm**: Nhiều điều không thể đoán trước có thể xảy ra với dự án của bạn, chẳng hạn như một thành viên tài năng của nhóm đột ngột rời bỏ công việc của mình, việc test mất nhiều thời gian hơn so với estimate để hoàn thành Vv, v.v. Có một bộ đệm trong estimte cho phép đối phó với bất kỳ sự chậm trễ nào có thể xảy ra.
* **Hoạch định nguồn lực trong quá trình estimate**: Bạn nên làm gì nếu một số thành viên trong nhóm của bạn nghỉ phép? Nó có thể trì hoãn dự án. Lập kế hoạch nguồn lực trong quá trình estimate đóng một vai trò quan trọng. Sự sẵn có của các nguồn lực sẽ giúp đảm bảo rằng các số liệu estimate là thực tế. Ở đây bạn phải xem xét đến sự phù hợp đối với các thành viên trong nhóm của bạn.
* **Sử dụng kinh nghiệm trong quá khứ làm tài liệu tham khảo**:  Kinh nghiệm từ các dự án trong quá khứ đóng vai trò quan trọng trong khi chuẩn bị estimate. Bởi vì một số dự án có thể tương tự với dự án khác, bạn có thể sử dụng lại số liệu estimate trong quá khứ.
* **Bám sát estimate của bạn**:  Estimate chỉ là ước tính vì nó có thể sai . Trong giai đoạn đầu của dự án, bạn nên thường xuyên kiểm tra lại các số liệu estimate và thực hiện sửa đổi nếu cần. Chúng ta không nên mở rộng estimate sau khi sửa nó, trừ khi có những thay đổi lớn trong yêu cầu hoặc bạn phải thương lượng với khách hàng về việc estimate lại.

### [Software Test Estimation Excel(.xlsx)](https://drive.google.com/file/d/13CyT2YKETVDOXPGEem7eU9GCMNSNEYkx/view?usp=sharing)
## Kỹ thuật khác
Kỹ thuật Wideband Delphi, Phương pháp Use – Case Point, Phân phối theo tỷ lệ phần trăm, Phương pháp  Ad-hoc là các kỹ thuật estimate khác trong Kỹ thuật phần mềm.

**Video**:
https://youtu.be/btNboe_EhX8


*Bài viết được dịch lại và sửa đổi từ nguồn: https://www.guru99.com/*