# 1. Agile Testing là gì?
**AGILE TESTING** là một phương thức test tuân theo các quy tắc và nguyên tắc phát triển phần mềm agile. Không giống như phương pháp Waterfall, Agile Testing có thể được thực hiện ngay từ thời điểm bắt đầu dự án với sự kết hợp liên tục giữa phát triển và kiểm thử. Agile Testing không tuân theo thứ tự (tức là chỉ được thực hiện sau khi code xong) mà nó được thực hiện liên tục.

# 2. Test Plan dành cho Agile Testing
Không giống như mô hình Waterfall, trong mô hình Agile, Test Plan được viết và cập nhật liên tục cho từng giai đoạn của dự án. Agile Test Plan bao gồm các loại kiểm thử được thực hiện trong giai đoạn đó như: yêu cầu dữ liệu kiểm thử, cơ sở hạ tầng, môi trường kiểm thử và kết quả kiểm thử. Một Agile Test Plan điển hình thường bao gồm:

- Phạm vi Test (Testing Scope)
- Các chức năng mới đang được test
- Mức độ hoặc Loại thử nghiệm dựa trên độ phức tạp của các tính năng
- Load Testing và Performance Testing
- Xem xét về cơ sở hạ tầng
- Kế hoạch để giảm thiểu rủi ro
- Cung cấp nguồn nhân lực và tài nguyên test
- Sản phẩm khi được bàn giao và các cột mốc quan trọng của dự án
![](https://images.viblo.asia/1c0229e0-9d0a-4e24-9e6b-5460e2f0f0b6.png)

# 3. Chiến lược cho Agile Testing
Vòng đời thử nghiệm cho Agile Testing trải qua bốn giai đoạn

## 3.1. Iteration 0 (Lặp lại 0)

Trong giai đoạn đầu tiên hay giai đoạn Iteration 0, các phần việc thiết lập ban đầu sẽ được thực hiện. Nó bao gồm việc xác định nhân lực để thực hiện test, cài đặt công cụ test, sắp xếp các tài nguyên test (ví dụ: các thiết bị test, môi trường test...) 
Các bước sau đây sẽ được thực hiện trong Iteration 0:
- Xây dựng các test cases logic chính (business case) cho dự án
- Thiết lập các điều kiện biên và phạm vi dự án
- Phác thảo các yêu cầu chính và các trường hợp sử dụng (use cases) để đảm bảo phần mềm được xây dựng theo đúng thiết kế
- Phác thảo lại một hoặc nhiều các bản thiết kế dự án 
- Xác định rủi ro
- Dự toán chi phí và chuẩn bị một dự án sơ bộ

## 3.2. Construction Iterations

Giai đoạn kiểm thử thứ hai là Construction Iterations, hầu hết quá trình testing sẽ được thực hiện trong giai đoạn này. Giai đoạn này được cho là một tập hợp các lần lặp lại việc test để tìm ra giải pháp cho các vấn đề hiện hữu. Trong Construction Iterations, nhóm agile tuân theo các yêu cầu ưu tiên trên thực tế: Với mỗi lần lặp lại, họ sẽ lấy các yêu cầu thiết yếu nhất trước để thực hiện trước.

Giai đoạn này cũng được chia thành 2 phần, confirmatory testing (kiểm thử xác nhận) và investigative testing (kiểm thử điều tra): 
Confirmatory testing tập trung vào việc xác minh rằng hệ thống đáp ứng yêu cầu  của các bên liên quan tại một thời điểm nhất định. 
Investigative testing phát hiện ra vấn đề mà Confirmatory testing đã bị bỏ sót. Trong Investigative testing, Testers xác định các vấn đề tiềm ẩn dưới dạng tường thuật lại các khiếm khuyết, nó liên quan đến các vấn đề phổ biến như integration testing, load/stress testing, và security testing. 

Tóm lại, Confirmatory testing có hai quan điểm để test như sau: dành cho developers và agile acceptance testing (kiểm thử chấp nhận trong agile). Cả hai đều được tự động hóa để cho phép thử nghiệm hồi quy liên tục trong suốt vòng đời. Confirmatory testing là phương thức test agile thực hiện trên các đặc thù về kỹ thuật.

Agile acceptance testing là sự kết hợp giữa functional testing và acceptance testing với tư cách là nhóm developers và các bên liên quan đang thực hiện cùng nhau. Trong khi đó, thử nghiệm dành cho nhà phát triển là sự kết hợp giữa unit testing và service integration testing. Developers testing xác minh cả mã code của ứng dụng và lược đồ cơ sở dữ liệu.

## 3.3. Giai đoạn release hoặc chuyển Phase (Release End Game Or Transition Phase)

Mục tiêu của phiên bản Release là để triển khai hệ thống của bạn thành công. Các hoạt động trong giai đoạn này là hướng dẫn end-users, người hỗ trợ và người vận hành sử dụng hệ thống. Ngoài ra, nó bao gồm tiếp thị phát hành sản phẩm, sao lưu và phục hồi, hoàn thiện tài liệu hệ thống và người dùng.

Giai đoạn thử nghiệm cuối cùng bao gồm full system testing và acceptance testing. Để hoàn thành giai đoạn thử nghiệm cuối cùng mà không gặp bất kỳ trở ngại nào, tester nên kiểm tra sản phẩm chặt chẽ hơn trong khi nó đang trong quá trình lặp lại xây dựng) construction iterations). 

## 3.4.Production (Sản phẩm đã hoàn thành)

Sau giai đoạn release, sản phẩm sẽ chuyển sang môi trường product.

**The Agile Testing Quadrants**
![](https://images.viblo.asia/4aa033fe-a069-4aad-8414-50cbb2037e92.png)
Agile testing quadrants chia toàn bộ quá trình test thành 4 phần:

###  a. Agile Quadrant I
 Chất lượng của mã code nội bộ là trọng tâm chính trong phần này và nó bao gồm các trường hợp test mà được điều khiển bởi công nghệ và được triển khai để hỗ trợ nhóm test, bao gồm:
1. Unit Tests
2. Component Tests

### b. Agile Quadrant II 
Giai đoạn này sẽ tiến hành thực hiện các test cases mà theo các luồng logic chính (function chính). Các loại Test được thực hiện trong giai đoạn này là:
1. Test các khả năng xảy ra của các scenarios and workflows
2. Kiểm thử trải nghiệm người dùng như nguyên mẫu
3. Kiểm thử theo cặp (Pair testing)

### c. Agile Quadrant III
Phần này đưa ra các feedback của Quadrant 1 và 2. Các trường hợp kiểm thử có thể được sử dụng làm cơ sở để thực hiện automation testing, đồng thời nhiều vòng đánh giá lặp (iteration reviews) sẽ được thực hiện nhằm tạo niềm tin cho sản phẩm. Các loại Test được thực hiện trong giai đoạn này là:
1. Usability Testing
2. Exploratory Testing
3. Pair testing with customers
4. Collaborative testing
5. User acceptance testing

### d. Agile Quadrant IV 
Phần này tập trung vào các yêu cầu phi chức năng như hiệu suất, bảo mật, ổn định, v.v ... Với phần test này, ứng dụng được tạo ra với chất lượng và giá trị đạt mong đợi. Các loại Test được thực hiện trong giai đoạn này là:

1. Kiểm thử phi chức năng như stress testing và performance testing
2. Kiểm thử bảo mật liên quan đến xác thực và hacking
3. Infrastructure testing
4. Data migration testing
5. Scalability testing
6. Load testing

# 4. Thách thức của QA với agile software development
a) Khả năng xảy ra lỗi sẽ xảy ra nhiều hơn trong kiểm thử agile, vì tài liệu requirement không phải ưu tiên hàng đầu nên có thể được cung cấp sau, từ đó gây nhiều trở ngại cho nhóm QA

b) Các functions mới được đưa ra một cách liên tục, phải tốn thêm thời gian để xác định xem các tính năng mới nhất có phù hợp với yêu cầu hay không và nó có thực sự giải quyết các vụ kiện kinh doanh không, điều này làm ảnh hưởng lớn đến thời gian estimate test ban đầu của QA 

c) Testers đôi khi phải đóng vai trò của một semi-developer

d) Các chu kỳ thực hiện test xảy ra liên tục và liên tiếp nhau

e) Rất ít thời gian để chuẩn bị kế hoạch test

f) Chỉ có một khoảng thời gian tối thiểu để thực hiện regression testing

g) Tester phải thay đổi vai trò của họ từ việc trở thành người kiểm tra chất lượng hay trở thành người đưa ra những yêu cầu trong việc quản lý chất lượng

h) Việc thay đổi và cập nhật về requirements vốn là thuộc tính trong agile và nó cũng là thách thức lớn nhất đối với QA

# 5. Kết luận
Agile testing là việc thực hiện test càng sớm càng tốt trong vòng đời phát triển phần mềm. Nó đòi hỏi việc tham gia thường xuyên của khách hàng vào quá trình test và mã code ngay khi có thể. Code phải đủ ổn định để có thể thực hiện system testing. Kiểm thử hồi quy mở rộng có thể được thực hiện để đảm bảo rằng các lỗi đã được sửa và kiểm thử. Và quan trọng hơn cả, việc giao tiếp giữa các teams chính là yếu tố làm cho agile testing thành công !!!

Link tham khảo: https://www.guru99.com/agile-testing-a-beginner-s-guide.html