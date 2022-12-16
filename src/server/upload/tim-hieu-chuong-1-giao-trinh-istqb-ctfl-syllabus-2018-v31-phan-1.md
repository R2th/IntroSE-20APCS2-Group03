Xin chào tất cả mọi người,chắc hẳn với các bạn đã và đang làm Tester sẽ không còn thấy xa lạ với giáo trình ISTQB-CTFL_Syllabus_2018_V3.1.  Hôm nay mình sẽ giới thiệu nội dung của Chương 1. 
Vì có những từ chuyên ngành dịch sang tiếng việt sẽ chưa được sát nghĩa do đó mình sẽ để tiếng anh, mong quý bạn đọc thông cảm.

Tổng quan Nội dung chương 1 tập chung vào các nguyên tắc cơ bản của kiểm thử/thử nghiệm và bao gồm 5 phần chính (như hình dưới đây) 
![](https://images.viblo.asia/866167ab-e4b9-44d9-91b0-60f6d1b7f1d7.png)
 Mình sẽ chia làm 2 phần, hôm nay mình chia sẻ phần 1 từ 1.1 đến mục 1.4 còn lại sẽ chia sẻ ở phần 2 nhé.
## 1.1 What is Testing ( Kiểm thử là gì) 
Hệ thống phần mềm là một phần không thể thiếu trong cuộc sống, từ các ứng dụng kinh doanh (ngân hàng) đến người tiêu dùng sản phẩm (ô tô) và hầu hết mọi người đã có trải nghiệm với phần mềm không hoạt động như mong đợi. Phần mềm hoạt động không chính xác có thể dẫn đến nhiều vấn đề như:  tổn thất tiền bạc, thời gian, danh tiếng kinh doanh và thậm chí thương tật hay tử vong. Để khắc phục điều đó, Kiểm thử phần mềm đã ra đời đó là một cách để đánh giá chất lượng của phần mềm, cũng là để giảm nguy cơ lỗi phần mềm khi vận hành.

Kiểm thử phần mềm là một quá trình bao gồm nhiều hoạt động khác nhau như: lập kế hoạch kiểm tra, phân tích, thiết kế, thực hiện kiểm tra, báo cáo tiến trình và kết quả thử nghiệm, đồng thời đánh giá chất lượng của đối tượng thử nghiệm.

Kiểm thử bao gồm kiểm thử động và tĩnh (dynamic testing & static testing)
### 1.1.1 What is Testing
### Đối với bất kỳ kiểm thử nào thì cũng bao gồm các mục tiêu sau:
- Đánh giá sản phẩm như requirement, user stories, design và code
- Xác minh xem tất cả các yêu cầu đã được thực hiện đầy đủ hay chưa
- Kiểm tra xem đối tượng thử nghiệm có hoàn chỉnh hay không và xác nhận xem nó có hoạt động như người dùng và các bên liên quan mong đợi
- Để xây dựng sự tự tin về mức độ chất lượng của đối tượng test
- Tìm ra các failures và lỗi để giảm mức độ rủi ro về sự không đầy đủ của chất lượng phầm mềm
- Cung cấp đầy đủ thông tin cho các bên liên quan để cho phép họ đưa ra các quyết định sáng suốt đặc biệt là về mức độ chất lượng của đối tượng test
- Tuân thủ các yêu cầu hoặc tiêu chuẩn theo hợp đồng, pháp lý hoặc quy định và / hoặc để xác minh

Các mục tiêu của thử nghiệm có thể khác nhau, tùy thuộc vào bối cảnh của thành phần hoặc hệ thống đang được thử nghiệm,mức độ thử nghiệm và mô hình vòng đời phát triển phần mềm.
### 1.1.2 Testing & Debugging 
| Testing| Debugging  |
| -------- | -------- | -------- |
| Là hoạt động tìm kiếm lỗi xảy ra trong phần mềm     | Debug là hoạt động nhằm tìm kiếm, phân tích và sửa chữa lỗi đó     |
## 1.2 Why is Testing Necessary
- Kiểm tra nghiêm ngặt các thành phần và hệ thống cũng như tài liệu liên quan của chúng, có thể giúp giảm rủi ro thất bại xảy ra trong quá trình vận hành.
- Khi các defect được phát hiện và sau đó được khắc phục, điều này góp phần vào chất lượng của các thành phần hoặc hệ thống.
- Kiểm thử phần mềm cũng có thể bắt buộc phải đáp ứng các yêu cầu theo hợp đồng hoặc pháp lý hoặc các tiêu chuẩn cụ thể của ngành.
### 1.2.1 Testing’s Contributions to Success

| Phase | Contribute |
| -------- | -------- | -------- |
| Tester  tham gia vào việc xem xét các yêu cầu hoặc sàng lọc yêu cầu người dùng có thể phát hiện lỗi   | Giảm nguy cơ sai hoặc không thể kiểm tra được chức năng đang được phát triển    | 
| Tester làm việc chặt chẽ với designer trong khi hệ thống đang được thiết kế có thể tăng cường hiểu biết và cách kiểm tra nó| Giảm nguy cơ mắc các lỗi thiết kế cơ bản và giúp xác định sớm|
| Tester làm việc chặt chẽ với developers có thể làm tăng sự hiểu biết và cách kiểm tra nó| Giảm nguy cơ lỗi trong code và test  |
| Tester xác minh và xác thực phần mềm trước để phát hành có thể phát hiện các lỗi   | Tăng khả năng đáp ứng nhu cầu của phần mềm với các bên liên quan |
### 1.2.2 Quality Assurance & Testing
![](https://images.viblo.asia/f7f32d0f-6113-432f-8cee-90c225af1aa6.jpg)

Mặc dù mọi người thường sử dụng cụm từ đảm bảo chất lượng (hoặc chỉ QA) để chỉ việc Test, đảm bảo chất lượng và thử nghiệm không giống nhau, nhưng chúng có liên quan với nhau. Một khái niệm lớn hơn, quản lý chất lượng, gắn kết chúng với nhau.
Quản lý chất lượng (QM)  bao gồm tất cả các hoạt động chỉ đạo và kiểm soát một tổ chức về chất lượng.
- Trong số các hoạt động khác, quản lý chất lượng bao gồm cả đảm bảo chất lượng (QA Quality Assurance ) và kiểm soát chất lượng (QC Quality Control). Chất lượng sự đảm bảo thường tập trung vào việc tuân thủ các quy trình thích hợp, để cung cấp sự tin tưởng rằng mức chất lượng thích hợp sẽ đạt được. Khi các quy trình được thực hiện đúng cách, các sản phẩm làm việc được tạo ra bởi các quy trình đó thường có chất lượng cao hơn, góp phần ngăn ngừa defect.
- QC Kiểm soát chất lượng liên quan đến các hoạt động khác nhau, bao gồm các hoạt động thử nghiệm, hỗ trợ việc đạt được các mức chất lượng thích hợp. Hoạt động kiểm thử là một phần của quá trình phát triển hoặc bảo trì phần mềm tổng thể quá trình.
### 1.2.3 Errors, Defects, and Failures
![](https://images.viblo.asia/0215548b-e811-4042-a7c9-5a3d56918d81.png)
Một người có thể mắc lỗi (Mistake/Error), điều này có thể dẫn đến việc đưa ra một khiếm khuyết (Defect/Bug) trong code hoặc trong một số sản phẩm công việc liên quan khác.
Và một số lý do gây ra lỗi (Mistake/Error): 
- Áp lực về mặt thời gian
- Sai lầm của con người
- Do kinh nghiệm và kỹ năng không đủ 
- Thông tin sai lệch giữa những người tham gia dự án, bao gồm cả thông tin sai lệch về các yêu cầu và thiết kế
- Độ phức tạp của code, thiết kế, kiến trúc, vấn đề cơ bản cần giải quyết và / hoặc công nghệ được sử dụng
- Những hiểu lầm về giao diện nội bộ hệ thống và liên hệ thống, đặc biệt là khi số lượng lớn các tương tác giữa hệ thống và giữa các hệ thống như vậy
- Công nghệ mới, không quen thuộc
* Nguyên nhân gốc rễ của các defect là những hành động hoặc điều kiện sớm nhất góp phần tạo ra các defect .
* Các defect có thể được phân tích để xác định nguyên nhân gốc rễ của chúng, để giảm sự xuất hiện của các defect tương tự trong tương lai. 

Bằng cách tập trung vào các nguyên nhân gốc rễ quan trọng nhất, phân tích nguyên nhân gốc rễ có thể dẫn đến quá trình cải tiến giúp ngăn ngừa một số lượng đáng kể các defect  trong tương lai được đưa vào.
## 1.3 Seven Principles of Testing
### Testing shows presence of defects
- Kiểm tra có thể chỉ ra rằng có defect, nhưng không thể chứng minh rằng không có defect.
- Kiểm tra làm giảm xác suất các lỗi chưa được phát hiện còn lại trong một phần mềm nhưng, ngay cả khi không defect được tìm thấy, nó không phải là bằng chứng về tính đúng đắn
### Exhaustive testing is impossible – Complete test
- Kiểm tra mọi thứ (tất cả sự kết hợp của đầu vào và điều kiện tiên quyết) là không khả thi
- Thay vì kiểm tra toàn diện, phân tích rủi ro và các ưu tiên nên được sử dụng để tập trung các nỗ lực kiểm tra tập trung trong testing
### Early testing
- Các hoạt động kiểm thử nên bắt đầu càng sớm càng tốt trong vòng đời phát triển phần mềm hoặc phần mềm
chu kỳ và nên tập trung vào các mục tiêu đã xác định
- Thực hiện sớm các hoạt động thiết kế kiểm tra và xem xét có thể phát hiện sớm các defect khi chúng còn rẻ để tìm và sửa chữa.
### Defect clustering: defect density
- Một số lượng nhỏ các mô-đun thường chứa hầu hết các lỗi được phát hiện trong quá trình phát hành trước thử nghiệm hoặc chịu trách nhiệm cho hầu hết các lỗi vận hành
- Quy tắc 80/20: Lỗi mô-đun thường chứa 80% defect
### Pesticide paradox
- Nếu các phép thử giống nhau được lặp đi lặp lại nhiều lần mà không tìm ra được defect mới.
- Để khắc phục nghịch lý thuốc trừ sâu này, các test case cần phải được thường xuyên rà soát, sửa đổi, test mới và khác đi để tìm ra nhiều lỗi tiềm ẩn hơn.
### Testing is context dependent
- Thử nghiệm được thực hiện khác nhau trong các ngữ cảnh khác nhau
### Absence of error fallacy
- Tất cả các yêu cầu cụ thể và sửa chữa tất cả các lỗi được tìm thấy vẫn có thể tạo ra một hệ thống khó để sử dụng, điều đó không đáp ứng nhu cầu và mong đợi của người dùng hoặc kém hơn so với hệ thống cạnh tranh.
## 1.4 Test Process
Quy trình kiểm thử phần mềm thích hợp, cụ thể trong bất kỳ tình huống nào phụ thuộc vào nhiều yếu tố.
### 1.4.1 Test Process in Context
 Các yếu tố ngữ cảnh ảnh hưởng đến quá trình kiểm tra đối với một tổ chức và bao gồm: 
- Mô hình vòng đời phát triển phần mềm và các phương pháp luận của dự án đang được sử dụng
     + Mức độ kiểm tra và các loại kiểm tra đang được xem xét
     + Rủi ro về sản phẩm và dự án
     + Lĩnh vực kinh doanh
- Các ràng buộc về hoạt động, bao gồm:
    + Ngân sách và nguồn lực
    + Thang đo thời gian
    + Sự phức tạp
    + Các yêu cầu về quy định và hợp đồng
- Các chính sách và yêu cầu tổ chức
- Các tiêu chuẩn nội bộ và bên ngoài bắt buộc
##  **Tổng Kết**
Trên đây mình đã giới thiệu cho các bạn một số phần liên quan đến nguyên tắc kiểm thử phần mềm, mình sẽ giới thiệu tiếp 1.4 và 1.5 ở phần 2 của bài viết.
Rất mong nhận được sự đóng góp từ quý bạn đọc để bài viết của mình được hoàn thiện hơn. 
Chúc mọi người luôn hạnh phúc và an nhiên trong cuộc sống! 

**Tài liệu tham khảo:** 
https://astqb.org/assets/documents/CTFL-2018-Syllabus.pdf