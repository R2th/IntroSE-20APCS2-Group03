###  Agile testing là gì ?
- Không giống như phương pháp WaterFall, Agile testing có thể bắt đầu vào lúc bắt đầu của dự án với sự tích hợp liên tục giữa phát triển và thử nghiệm. Agile testing không theo tuần tự ( nghĩa là chỉ được thực hiện sau giai đoạn code) nhưng liên tục. 
- Agile team hoạt động hướng tới mục tiêu chung là đạt được chất lượng sản phẩm. Agile testing có các khung thời gian ngắn ( từ  1- 4 tuần).

Trong bài viết này, mình sẽ giới thiệu với các bạn về các nội dung sau:

1. **Test plan trong Agile**
2. **Chiến lược của Agile testing**
3. **Agile Testing Quadrants**
4. **Thách thức của QA trong Agile**

![](https://images.viblo.asia/6fd98d6d-8004-46a6-bc8d-2a003761cd3e.png)

### 1. Test plan trong Agile

Không giống với mô hình Waterfall, trong mô hình Agile, test plan được viết và cập nhật cho mỗi lần release. Test plan bao gồm việc hoàn thành các loại test trong mỗi vòng lặp. Các loại test plan trong Agile như:

- Phạm vi test
- Các chức năng mới cần test
- Level hoặc loại test theo mức độ phức tạp của các feature
- Load và performance testing
- Phân tích cơ sở hạ tầng
- Rủi ro và giải pháp
- Nguồn lực
- Việc bàn giao và các mốc thời gian.

### 2. Chiến lược của Agile testing
![](https://images.viblo.asia/d3b26c9b-e668-4859-bb67-80c2bc1a4ed4.png)
**(a) Iteration 0**

Trong giai đoạn đầu của iteration 0, bạn thực hiện thiết lập khởi tạo một số task bao gồm: người tham gia kiểm thử, cài đặt test tools, lên kế hoạch quản lý resource...Giai đoạn này gồm các bước sau:

a. Thành lập bussiness case cho dự án

b. Thiết lập các điều kiện biên và phạm vi dự án

c. Đưa ra các yêu cầu quan trọng và use cases cần thiết để triển khai

d. Đưa ra một vào nhiều kiến trúc cho dự án

e. Xác định rủi ro

g. Dự toán chi phí và chuẩn bị dự án sơ bộ.

**(b) Construction Iterations**

Giai đoạn thứ 2 của kiểm thử là Construction Iterations, phần lớn công việc kiểm thử diễn ra trong giai đoạn này. Giai đoạn này được xem như là tập hợp các phép lặp và tăng trưởng, đề xây dựng giải pháp. Để thực hiện điều đó, trong mỗi lần lặp lại, team thực hiện 1 loạt các phương pháp Agile như XP, Scrum, Agile modeling, and agile data,....

Trong giai đoạn này, Agile team  tuân theo các yêu cầu được ưu tiên: tai mỗi vòng lặp, yêu cầu thiết yếu nhất sẽ được chọn từ danh sách công việc và được thực hiện.

Construction Iteration phần thành 2 phần là confirmatory testing và investigative testing. Confirmatory testing tập trung vào xác mình xem hệ thông có đáp ứng mục đích giông như được mô tả  mà team nhận và thực hiện hay không. Trong khi đó, investigative testing phát hiện vẫn đề mà confirmatory team bỏ qua hoặc bỏ sót. Investigative testing còn kèm thêm integration testing, load/stress tesing và security testing.

Thêm nữa, confirmatory testing có 2 khía cạnh là developer testing và agile acceptance testing. Cả hai đều được tự động để cho phép regression test liên tục trong suốt vòng lặp đấy.

**(c) Release End Game Or Transition Phase**

Mục tiêu của “Release, End Game”  là để triển khai hệ thống thành công lên production. Các hoạt động trong phase này bảo gồm: đào tạo end users, hỗ trợ mọi người sử dụng sản phẩm. Ngoài ra, giai đoạn này còn bao gồm marketing sản phẩm,  sao lưu và phục hồi, hoàn thiện hệ thống và tài liệu người dùng.

**(d) Production**

Sau giai đoạn phát hành, sản phẩm sẽ chuyển sang giai đoạn sản xuất.

### 3. Agile Testing Quadrants

 Agile Testing Quadrants chia tiến trình thành 4 Quadrants và giúp ta hiểu cách kiêm rthuwr trong Agile
 
 ![](https://images.viblo.asia/4d6ecba1-0539-4a60-97fe-bbc260b4164d.png)
 
**a) Agile Quadrant I** 

Chất lượng cuả mã nguồn là mục tiêu chính trong Quadrant này. Nó bao gồm các loại kiểm thử sau:

- Unit tests

- Component Test

**b) Agile Quadrant II**

Quadrant này gồm các trường hợp kiểm thử bussiness logic dựa trên requirement. Các loại test được thực hiện là:

- Testing of examples of possible scenarios and workflows

- Testing of User experience such as prototypes

- Pair testing

**c) Agile Quadrant III**

Quadrant này cung cấp phản hồi cho Quadrant I và II. Các trường hợp kiểm thử được sử dụng như cơ sở để thực hiện automation testing. Việc kiểm thử của vòng lặp được review và thực hiện để đảm bảo tính tin cậy của sản phẩm. Các loại kiểm thử được thực hiện trong Quadrant này gồm có:
- Usability Testing
- Exploratory Testing
- Pair testing with customers
- Collaborative testing
- User acceptance testing

**d) Agile Quadrant IV**

Quadrant này tâp trung vào các yêu cầu non-functional như performance, security, stability,... Gồm các loại kiểm thử như:
-  Non-functional tests such as stress and performance testing

- Security testing with respect to authentication and hacking

- Infrastructure testing

- Data migration testing

- Scalability testing

- Load testing

### 4. Thách thức của QA trong Agile

- Phát hiện lỗi nhanh hơn , tuy nhiên tài liệu ít được coi trọng, do đó gây nhiều áp lực cho QA
- Tính năng mới được đưa ra nhanh chóng, làm giảm thời gian để nhóm test có thời gian xấc định các tính năng mới đó có phù hợp với yêu cầu.
- Chu kì thực hiện execute test bị dồn lại nhiều hơn.
- Có ít thời gian để chuẩn bị test plan
- Chỉ có khoảng thời gian tối thiểu để thực hiện regression test
- Vai trò của QA có sự thay đổi từ người quản lý chất lượng thành partner của chất lượng .
- Luôn phải đối mặt với thay đổi và cập nhật liên tục

**Kết luận**

Agile test thực hiện kiểm thử sớm nhất có thể trong vòng đời phát triển phẩn mềm. Nó đòi hỏi sự tham gia của khách hàng và việc kiểm thử code sớm nhất. Code phải đủ ổn định để đưa vào hệ thống kiểm thử. Việc thêm thời gian cho Regression test được thực hiện để chắc chắn tất cả bug được sửa và kiểm tra. Điều quan trọng là việc giao tiếp giữa các thành viên trong team sẽ tạo nên thành công cho Agile testing.

*Tài liệu tham khảo: https://www.guru99.com/agile-testing-a-beginner-s-guide.html*