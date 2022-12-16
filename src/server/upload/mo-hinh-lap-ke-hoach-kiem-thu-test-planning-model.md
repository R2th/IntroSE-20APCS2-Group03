# I. Test plan là gì?
- Theo ISTQB, Test plan là một tài liệu mô tả phạm vi, cách tiếp cận, nguồn lực và lịch trình dự kiến cho hoạt động kiểm thử
- Test plan giúp chúng ta xác định, giám sát và kiểm soát chi tiết các hoạt động kiểm thử phần mềm
# II. Mô hình hóa test planning
![image.png](https://images.viblo.asia/829aa8aa-63e0-4969-b860-d2a9df21058c.png)
([image source](http://apps.testinsane.com/mindmaps/uploads/TestPlanningModel.png))
- Khi thực hiện kế hoạch test cho một sản phẩm nói chung và phần mềm nói riêng, chúng ta cần xác định 4 yếu tố cơ bản, gồm: 
    - **Test item analysis**: Phân tích hoạt động kiểm thử
    - **Risk analysis**: Phân tích rủi ro
    - **Designing the testing strategy**: Thiết kế chiến lược test
    - **Logistics**: Những nhân tố, hoạt động hậu cần
## 1. Phân tích hoạt động kiểm thử
- Khi phân tích hoạt động kiểm thử, ta sẽ đặt ra 2 câu hỏi: 
    - WHAT ? Test cái gì ?
    - HOW? Test như thế nào ?
### a. What ?
![image.png](https://images.viblo.asia/b81c63fa-96cc-402f-98f3-c9fa0496392d.png)
Với câu hỏi WHAT, có 3 đối tượng cần phân tích
- **USER**: Khi thực hiện một sản phẩm, sẽ luôn hướng đến tệp khách hàng sẽ là ai? họ có thể làm gì với sản phẩm của mình hay nói cách khác, sản phẩm có tiềm năng để sử dụng đối với tệp khách hàng đó hay không.
- **OPERATIONS EXPECTED FROM THE TEST ITEM**: Cách hoạt động mong đợi từ kiểm thử
- **PRODUCT**: 
    - Cần xác định được cấu trúc về code, files, database để có thể tạo nên sản phẩm;
    - Các chức năng có thể thực hiện trong sản phẩm;
    - Tệp dữ liệu
### b. How ? 
![image.png](https://images.viblo.asia/1e8b7d33-2f93-4b34-a5c0-0f636cc78891.png)
Để có thể biết được về hoạt động test sẽ thực hiện như thế nào, chúng ta cần xác định
- **PRODUCT WALKTHROUGH**: là hoạt động đánh giá sản phẩm để tất cả mọi người trong team phát triển và các bên liên quan có thể đưa ra câu hỏi, góp ý, nhận xét về các lỗi có thể xảy ra, vi phạm đối với tiêu chuẩn phát triển và các vấn đề, sự cố khác.
- **TO PROTOTYPE/ TO MODEL**: xây dựng những nguyên mẫu ứng dụng phần mềm của sản phẩm đang được phát triển, nhằm giúp mô hình hóa yêu cầu sản phẩm của khách hàng ở giai đoạn phát triển ban đầu.
-  **ORACLES**: Chúng ta cần phải xác định được các thông tin quan trọng để thực hiện, dựa vào:
    -  Các tài liệu liên quan
    -  Các yêu cầu đặc tả sản phẩm
    -  Kinh nghiệm cao khi sử dụng như một người dùng cuối
- **ANALYSIS**: phân tích sản phẩm ở góc nhìn kinh doanh, hệ thống và thiết kế sản phẩm
- **SIMILAR PRODUCTS**: Khi phát triển một sản phẩm, việc dựa vào những sản phẩm tương tự sẽ giúp quá trình phát triển nhanh và tốt hơn
- **PREVIOUS VERSIONS OF THE SAME TEST ITEM**: Nhất là các sản phẩm đang thực hiện ở các giai đoạn sau, việc dựa vào phiên version trước đó sẽ hỗ trợ tốt đa cho các hoạt động phát triển cũng như testing được thực hiện một cách trôi chảy, cải thiện những điểm chưa hợp lý và thực hiện các chức năng mới.
## 2. Phân tích rủi ro
- Việc thực hiện đánh giá và phân tích mức độ rủi ro là rất cần thiết. 
- Phân tích rủi ro là hoạt động đánh giá các rủi ro liên quan đến khả năng của một sự kiện trong tương lai có hậu quả tiêu cực
- Mức độ rủi ro được xác định bởi khả năng của sự kiện và tác đông (tác hại) từ sự kiện đó.
### a. What?
![image.png](https://images.viblo.asia/bac38300-2820-4bc0-96b4-b034af11d603.png)
- Rủi ro và mức độ rủi ro sẽ phụ thuộc vào các yếu tố sau: 
    - **THREATS**: Nếu rủi ro xảy ra thì sẽ có các mối đe dọa tác động đến khả năng cung cấp sản phẩm của dự án (phạm vi, chi phí, thời gian) và nguy cơ đối với chất lượng sản phẩm.
    - **VULNERABILITIES**: Các nhược điểm có thể có
    - **IMPACT** : Xác định các tác động từ rủi ro đến end user và team để có được phương án phòng trừ, giải quyết hợp lý
### b. How? 
![image.png](https://images.viblo.asia/1d00e578-1201-4fa0-87b2-af751b40a592.png)
- Trong trường hợp rủi ro xảy ra, chúng ta cần có các hoạt động phòng trừ và xử lý.
    - **REVIEW DOCUMENTATION and SPECIFICATIONS**: Hoạt động review các tài liệu và yêu cầu đặc tả rất cần thiết ngay từ khi dự án vừa mới bắt đầu. Trong quá trình xem xét, phân tích tài liệu, có thể phát hiện được các lỗi, các vấn đề chưa hợp lý, ... giúp giảm thiểu được rủi ro sau này.
    - **CLOSED DEFECTS ANALYSIS**: Dựa vào các lỗi đã từng gặp và đánh giá theo mức độ của lỗi để có thể chủ động tránh, không bị lỗi cũ.
    - **MEETING**: Trong quá trình phát triển, chúng ta rất cần triển khai các buổi meeting để trao đổi, đánh giá và chia sẻ về các risk đã từng gặp, có thể sẽ gặp và cách xử lý tốt nhất.
    - **PATTERS ANALYSIS**: Phân tích các defect/failure để tìm được nguyên nhân gốc rễ, mức độ ảnh hưởng đến sản phẩm.
## 3. Thiết kế chiến lược test
- Thiết kế chiến lược test sẽ bao gồm việc xác định được các kỹ thuật test và cách lập kế hoạch

![image.png](https://images.viblo.asia/d235c8ad-b992-449e-b7e4-e39086043aba.png)
### a. Các kỹ thuật test
![image.png](https://images.viblo.asia/fa77dffe-618f-4ccf-8b95-7a7766f4b015.png)
- Sử dụng các kỹ thuật test như :
    - Thiết kế test hướng đặc tả (**Specification based**) : Equivelence partitioning; Boundary value; Decision tables; State transition; Use case testing
    - Thiết kế test hướng cấu trúc (**Structure based**) : Statement testing; Brach testing; Condition testing; Multiple conditions.
    - Thiết kế test hướng kinh nghiệm (**Experience based**) : Error guessing; Exploratory testing; Checklist testing.
### b. Các chiến lược test
![image.png](https://images.viblo.asia/673b90c3-5642-4d58-8b4f-9185931af0a2.png)
- **LINKING RISK TO AREAS OF THE TEST ITEM**: Xác định sự ảnh hưởng của rủi ro đối với đối tượng test
- **STRATEGIES**: Các chiến lược test dựa vào thực hành, thực tiễn và bối cảnh, dựa vào:
    - Linh hoạt các phương pháp test **(Methodical)**: Ngoài sử dụng kỹ thuật test phía trên, chúng ta có thể sử dụng một số bộ test hoặc điều kiện test xác định trước, chẳng hạn như phân loại các loại lỗi phổ biến, các đặc điểm quan trọng hoặc tiêu chuẩn chung cho ứng dụng di động, trang web.
    - Tuân thủ quy trình **(Process-compliant)**: Dựa trên các quy tắc, tiêu chuẩn và quy trình chung
    - Tư vấn **(Consultative)**: Dựa trên lời khuyên, hướng dẫn của các bên liên quan hoặc các chuyên gia trong lĩnh vực.
- **IDENTIFY OPPORTUNITIES TO INCLUDE AUTOMATION**: Tự động hóa trong quá trình kiểm thử ( áp dụng vào các bài test hồi quy)
- **MODEL THE REALITY AT HAND FOR TESTING IT**: Kiểm thử trên môi trường thực tế.
- **BUILD A PROTOTYPE OF THE TEST**: Thực hiện và theo dõi tiến độ kiểm thử
- **UNPLANNED TASKS**: Một số các tố chất cần cải thiện như:
    - Phản ứng nhanh: Thay đổi các phương thức test để nhanh chóng phù hợp với bối cảnh của dự án (như sử dụng Exploratory testing)
    - Nhanh nhẹn và thích nghi nhanh
    - Không quá cứng nhắc theo kế hoạch: cần phải có sự linh hoạt trong quá trình monitoring and control để thay đổi kế hoạch theo hướng tốt nhất
    - Hạn chế tối đa việc bị trễ theo kế hoạch mà không có phương án giải quyết.
## 4. Logictics
![image.png](https://images.viblo.asia/01bff8c0-5309-4775-a73d-c344f48a05e9.png)
Thực hiện hoạt động kiểm thử trong quy trình phát triển phần mềm, sẽ phụ thuộc và ảnh hưởng đến các nhân tố, hoạt động sau:
- **Estimate**: Ước lượng effort và thời gian cần để thực hiện
- **People in team**: Một team sẽ  cần có nhiều role và tiêu chí như kỹ năng, kinh nghiệm, trách nhiệm rõ ràng và hợp lý để team có thể vận hành tốt.
- **Trannings**: Hoạt động trannings là hoạt động cần có để đảm bảo được các thành viên cần nắm được hệ thống, yêu cầu đặc tả của sản phẩm.
- **Requirement engineering**: Yêu cầu về kỹ thuật phải luôn được quản lý, đảm bảo và cập nhật liên tục trong quá trình phát triển
- **Project meeting**: Triển khai các cuộc họp như daily meeting, planning meet, retrospective, ...
- **Team relationship**: Đảm bảo các mối quan hệ trong team với nhau, leader đối với member, team đối với khách hàng,...
- **Platform**: 
    - Các yêu cầu về môi trường testing, UAT hoặc production
    - Đáp ứng cho manual tests, automated tests, performance test,...
- **Tools**: Các công cụ hỗ trợ test
- **Testing management**: Bao gồm bộ test case, quản lý các defects,...
- **Report**: Báo cáo nội dung, quá trình, kết quả test đến các bên liên quan
-----
Tài liệu tham khảo
- http://apps.testinsane.com/mindmaps/test-planning-model
- https://www.istqb.org/downloads/syllabi/foundation-level-syllabus.html