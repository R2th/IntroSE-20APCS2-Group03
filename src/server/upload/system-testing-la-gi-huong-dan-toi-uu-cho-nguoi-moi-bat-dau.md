### System Testing là gì?

***System Testing nghĩa là test toàn bộ hệ thống. Tất cả các module/components được tích hợp theo thứ tự để xác minh rằng hệ thống làm việc đúng hay không.***

System Testing được thực hiện sau Integration Testing. Nó đóng vai trò quan trọng trong việc phát hành một sản phẩm chất lượng cao.

![](https://images.viblo.asia/90ddfbdd-bfd9-4917-92f4-410423fbd6b4.jpg)

Quy trình test tích hợp hệ thống phần cứng và phần mềm để xác minh rằng hệ thống thỏa mãn yêu cầu đặc tả. 

Verification (Xác minh): Confirm bằng sự kiểm tra và quy định của những envidence khách quan rằng các yêu cầu cụ thể đã được thỏa mãn.

Nếu một ứng dụng có 3 module A, B, C, thì việc test kết hợp module A & B, hoặc B & C, hoặc A & C được biết là Integration testing. Còn việc tích hợp cả 3 module và test nó như một hệ thống hoàn chỉnh được gọi là System Testing.

![](https://images.viblo.asia/e3d34dfd-663d-4fa7-842f-9c1c09f2ed3f.jpg)

### Ví dụ về System Testing

*Một nhà sản xuất ô tô không sản xuất toàn bộ chiếc xe. Mà từng thành phần của chiếc xe được chia ra, ví dụ: ghế, gương, cable, động cơ, khung xe, bánh xe, ...*

*Sau khi chế tạo từng bộ phận, nó sẽ được test độc lập xem nó có hoạt động đúng hay không, và đó là Unit Testing.*

*Khi mỗi phần đã hoạt động đúng, chúng sẽ được lắp ráp với phần khác. Việc lắp ráp đó được kiểm tra xem có bất kỳ vấn đề gì xảy ra với chức năng của từng thành phần hay không, và liệu cả 2 thành phần có hoạt động cùng nhau như mong đợi hay không. Đó được gọi là Integration testing.*

*Khi tất cả các thành phần được lắp ráp với nhau, và chiếc xe đã sẵn sàng. Nhưng thực ra nó chưa hề sẵn sàng.*

*Chúng ta cần kiểm tra toàn bộ chiếc xe trên những khía cạnh khác nhau theo những yêu cầu được xác định như: xe có hoạt động trơn tru không, breaks, bánh răng và những chức năng khác đều hoạt động đúng, chiếc xe không có bất kỳ dấu hiệu bất thường nào sau khi đã đi 2500 dặm liên tục, màu sắc của xe dễ dàng được chấp nhận và yêu thích, xe có thể chạy trên nhiều loại đường bằng phẳng, gồ ghề, ... Việc test này được gọi là System testing, và nó không liên quan gì với Integration testing.*

Ví dụ này hoạt động theo cách nó được mong đợi và khách hàng đã bị thuyết phục về những nỗ lực cần thiết cho System testing.

Tôi nêu ví dụ này để nhấn mạnh tầm quan trọng của việc system test: bất kỳ hệ thống nào cũng cần thực hiện việc system test.

### Cách tiếp cận

System test được thực hiện khi integration testing được hoàn thành.

![](https://images.viblo.asia/663aebfb-42bb-40a3-af69-6cb9d46cb389.jpg)

Nó chính là kiểu test black box. Việc test đánh giá hoạt động của hệ thống từ quan điểm của người dùng, với sự giúp đỡ của các tài liệu đặc tả. Nó không yêu cầu bất kỳ kiến thức nội bộ về hệ thống như design hoặc cấu trúc code.

Nó chứa các khu vực chức năng và phi chức năng của ứng dụng/sản phẩm.

**Tiêu chí trọng tâm**: Các tiêu chí trọng tâm bao gồm:

1. Giao diện bên ngoài
2. Đa chức năng và các chức năng phức tạp
3. Bảo mật
4. Phục hồi
5. Hiệu năng
6. Vận hành và user tương tác trơn tru với hệ thống
7. Khả năng cài đặt
8. Tài liệu
9. Tính sử dụng
10. Load/ stress

### Tại sao cần System Testing (ST)?

1. Rất quan trọng để hoàn thành một chu trình kiểm thử đầy đủ, và ST là một giai đoạn nơi điều đó được thực hiện.
2. ST được thực hiện trong môi trường tương tự với môi trường production, do đó các bên liên quan có thể lấy được những ý tưởng tốt từ phản ứng của người dùng.
3. Nó giúp giảm thiểu việc xử lý sự cố sau khi triển khai và các cuộc gọi hỗ trợ
4. Trong giai đoạn STLC (Software Testing Life Cycle), Kiến trúc ứng dụng và yêu cầu Business đều được kiểm thử

ST là rất quan trọng và nó đóng một vai trò quan trọng trong việc phát hành sản phẩm chất lượng đến người dùng.

**Hãy cùng xem tầm quan trọng của System testing qua các ví dụ dưới đây bao gồm các nhiệm vụ hàng ngày của chúng tôi:**

* Điều gì xảy ra nếu một giao dịch trực tuyến bị lỗi sau khi xác nhận?
* Điều gì xảy ra nếu một mặt hàng được đặt trong giỏ hàng của một trang web trực tuyến không cho phép đặt hàng?
* Điều gì xảy ra nếu muốn tạo nhãn mới trong tài khoản Gmail và có lỗi khi nhấp vào tab Create?
* Điều gì xảy ra nếu hệ thống bị crash khi việc tải tăng lên trên hệ thống?
* Điều gì xảy ra nếu cài đặt một phần mềm trên hệ thống mất thời gian hơn mong đợi và vào cuối cùng lại bị lỗi?
* Điều gì xảy ra nếu thời gian phản hồi của trang web lâu hơn nhiều so với mong đợi sau khi enhancement?
* Điều gì xảy ra nếu trang web quá chậm khiến người dùng không thể đặt vé du lịch?

Trên đây chỉ là một vài ví dụ để cho thấy rằng System testing sẽ ảnh hưởng như thế nào nếu không được thực hiện đúng cách.

Tất cả những ví dụ trên là kết quả của việc system testing không được thực hiện hoặc thực hiện không đúng cách. Tất cả các module được tích hợp nên được test để đảm bảo rằng sản phẩm hoạt động đúng như mong đợi.

### Cách thực hiện System Test

System Test là một phần cơ bản của kiểm thử phần mềm, và test plan phải luôn chứa không gian cụ thể cho loại test này.

Để test toàn bộ hệ thống, requirement và expectation phải rõ ràng và tester cũng cần hiểu cách sử dụng thời gian thực của ứng dụng.

Ngoài ra, hầu hết các tool bên thứ ba, phiên bản OS, kiến trúc của OS có thể ảnh hưởng đến chức năng của hệ thống, hiệu năng, bảo mật, khả năng phục hồi hoặc cài đặt.

Do đó, trong khi test hệ thống, một bức tranh rõ ràng về cách sử dụng ứng dụng như thế nào, và các loại vấn đề có thể phải đối mặt trong thực tế là hữu ích. Hơn nữa, tài liệu requirement cũng quan trọng như cách hiểu ứng dụng.

Clear và update tài liệu requirement có thể giúp tester tránh được một số hiểu lầm, giả định và các câu hỏi.

Tóm lại, một tài liệu yêu cầu rõ ràng và sắc  nét với các update mới nhất cùng với sự hiểu biết về việc sử dụng thời gian thực có thể làm cho System testing hiệu qủa hơn.

Thử nghiệm này được thực hiện một cách có kế hoạch và có hệ thống.

**Dưới đây là các bước khác nhau liên quan trong khi thực hiện loại thử nghiệm này:**

* Bước đầu tiên là tạo kế hoạch kiểm tra
* Tạo System Test case và test script
* Chuẩn bị dữ liệu test yêu cầu cho loại test này
* Thực hiện system test case và script
* Báo cáo bug. Re-test bug sau khi fix
* Test hồi quy để xác minh ảnh hưởng của việc thay đổi trong code
* Lặp lại vòng đời kiểm thử cho đến khi hệ thống sẵn sàng để deploy
* Sign off khỏi đội test

![](https://images.viblo.asia/87337b1c-0d0c-4b83-99de-e3bcdc3b469e.jpg)

### Test cái gì?

**Các điểm nêu dưới đây được đề cập trong system testing:**

* End to end testing: bao gồm xác minh tương tác giữa tất cả các thành phần và cùng với các thiết bị ngoại vi bên ngoài để đảm bảo rằng hệ thống làm việc đúng trong bất kỳ kịch bản nào được đề cập trong thử nghiệm này.
* Xác  minh các đầu vào được cung cấp cho hệ thống sẽ cung cấp kết quả mong đợi
* Xác minh tất cả các yêu cầu chức năng và phi chức năng đều được test để xem nó hoạt động đúng như mong đợi hay không
* Ad-hoc và exploratory testing có thể được thực hiện trong loại test này sau khi kịch bản test được thực hiện. Exploratory testing và ad-hoc testing giúp tìm thấy các bug cái mà không thể tìm thấy trong kịch bản test vì nó mang lại sự tự do cho tester để test dựa trên kinh nghiệm và trực giác của họ.

### Ưu điểm

Một số ưu điểm của System Testing:

* Thử nghiệm này bao gồm các kịch bản từ đầu đến cuối để test hệ thống.
* Thử nghiệm này được thực hiện trong môi trường giống với môi trường Production, từ đó giúp hiểu được quan điểm của người dùng và tránh được các issue có thể xảy ra khi hệ thống go live.
* Nếu thử nghiệm này được thực hiện có hệ thống và đúng phương pháp, nó sẽ giúp giảm thiểu các vấn đề sau khi lên production.
* Thử nghiệm này test cả kiến trúc ứng dụng và yêu cầu business.

### Tiêu chí đầu vào/Tiêu chí kết thúc

**Tiêu chí đầu vào:**

- Hệ thống phải pass các tiêu chí kết thúc của giai đoạn Integration testing. Ví dụ: tất cả các test case phải được thực thi và không có bug critical hay có độ ưu tiên Immediately, Urgent, High ở trạng thái open.
- Test Plan phải được approve và sign off.
- Test case/ Test scenario phải sẵn sàng để thực thi
- Test script phải sẵn sàng để thực thi
- Tất cả các yêu cầu phi chức năng phải có sẵn và test case tương tự phải được tạo
- Môi trường test phải sẵn sàng.

**Tiêu chí kết thúc:**

- Tất cả các test case phải được thực thi
- Không có bug critical, hoặc có độ ưu tiên cao, hoặc liên quan đến bảo mật ở trạng thái open.
- Nếu bất kỳ bug có độ ưu tiên medium hay low đang ở trạng thái open, thì nó phải được thực hiện với sự chấp nhận của khách hàng.
- Báo cáo kết thúc phải được submit.

### System Test Plan

Test Plan là một tài liệu được sử dụng để mô tả mục đích, mục tiêu, phạm vi của sản phẩm được phát triển. Những gì cần test và những gì không cần test, chiến lược test, công cụ được sử dụng, môi trường yêu cầu và mọi chi tiết khác được ghi lại để tiến hành test.

Test plan giúp tiến hành test có phương pháp và đúng cách, và giúp tránh được những rủi ro và issue trong khi test được thực hiện.

**System Test Plan bao phủ những điểm sau:**

* Mục đích và mục tiêu được định nghĩa cho thử nghiệm này
* Phạm vi (Những chức năng được test, chức năng chưa được test được liệt kê ra)
* Tiêu chí chấp nhận (tiêu chí mà hệ thống sẽ được chấp nhận). Ví dụ: điểm được đề cập trong tiêu chí chấp nhận phải ở trạng thái pass
* Tiêu chí đầu vào/ Tiêu chí kết thúc (Định nghĩa tiêu chí khi nào system testing bắt đầu và khi nào nó được xem xét là hoàn thành)
* Test Schedule (Estimate thử nghiệm sẽ được hoàn thành trong một thời gian cụ thể)
* Chiến lược test (bao gồm các kỹ thuật test)
* Nguồn lực (Số nguồn lực yêu cầu cho việc test, vai trò của họ, nguồn lực sẵn có, ...)
* Môi trường test (Hệ điều hành, Browser, Platform)
* Test Case (Danh sách các test case được thực thi)
* Giả định (Nết có bất kỳ giả định nào, nó nên được ghi lại trong test plan)

### Thủ tục, quy trình viết System Test Case

System test case bao phủ tất cả các scenario và use case và nó cũng bao phủ các chức năng, phi chức năng, giao diện người dùng, các test case liên quan đến bảo mật. Test case của System test được viết giống như cách viết test case test chức năng.

**System test case bao gồm các trường sau:**

* Test case ID
* Test Suite name
* Description - Mô tả về các test case được thực thi
* Steps - Các bước để thực hiện test case
* Test Data - Dữ liệu giả được chuẩn bị để test
* Expected result - Kết quả mong đợi dựa trên requirement
* Actual Result - Kết quả nhận được sau khi thực thi test case
* Pass/Fail 
* Remarks

![](https://images.viblo.asia/6908d2ce-51e8-4400-89df-16221acd0ca5.jpg)

### Các loại System Testing

![](https://images.viblo.asia/58cd8fad-3654-445d-bc73-135010e2cdd0.jpg)

**Functionality Testing** (Test chức năng): Đảm bảo chức năng của sản phẩm hoạt động đúng như yêu cầu, trong khả năng của hệ thống

**Recoverability Testing** (Test khả năng phục hồi): Đảm bảo hệ thống có khả năng phục hồi tốt từ các lỗi đầu vào khác nhau và các tình huống lỗi khác.

**Interoperability Testing** (Test khả năng tương tác): Đảm bảo hệ thống có thể vận hành tốt với các sản phẩm thứ ba hay không.

**Performance Testing** (Kiểm tra hiệu năng): Đảm bảo hiệu năng của hệ thống dưới các điều kiện khác nhau.

**Scalability Testing** (Test khả năng mở rộng): Đảm bảo khả năng mở rộng của hệ thống trong những điều kiện khác nhau như: mở rộng user, địa lý hay tài nguyên.

**Reliability Testing** (Test tính tin cậy): Đảm bảo hệ thống có thể vận hành trong thời gian dài mà không có lỗi phát sinh.

**Regression Testing** (Test hồi quy): Đảm bảo sự ổn định của hệ thống khi nó được tích hợp với các hệ thống con khác nhau và thực hiện các task bảo trì khác nhau.

**Documentation Testing** (Kiểm tra tài liệu): Đảm bảo tài liệu hướng dẫn sử dụng và các tài liệu khác đúng và có thể sử dụng

**Security Testing **(Test bảo mật): Đảm bảo hệ thống không cho phép sự truy cập trái phép vào dữ liệu hoặc tài nguyên.

**Usability Testing** (Test khả năng sử dụng): Đảm bảo hệ thống dễ sử dụng, dễ học và dễ vận hành.

**Ngoài ra, còn có các loại System testing như bảng sau:**

![](https://images.viblo.asia/7dcd6c62-99dd-433c-b502-932c0c86ea55.jpg)

### Sự khác nhau giữa System Testing và Acceptance Testing

| System Testing | Acceptance Testing  |
| -------- | -------- |
| System Testing là test toàn bộ hệ thống. Test từ đầu đến cuối hệ thống được thực hiện nhằm xác minh tất cả các kịch bản đã hoạt động đúng như mong đợi.     | Acceptance Testing được thực hiện nhằm xác minh sản phẩm đúng với yêu cầu khách hàng hay chưa.     |
| System Testing bao gồm test chức năng và phi chức năng, và được thực hiện bởi tester.     | Acceptance Testing là test chức năng và được thực hiện bởi tester cũng như khách hàng.     |
| ST sử dụng dữ liệu test được tạo bởi tester.     | Acceptance Testing sử dụng dữ liệu thực/production.     |
| Toàn bộ hệ thống được test để kiểm tra chức năng và hiệu suất của sản phẩm.     | Acceptance Testing được thực hiện nhằm xác minh rằng yêu cầu kinh doanh giải quyết được những điều khách hàng đang tìm kiếm.     |
| Defect tìm thấy có thể fix.     | Bất kỳ defect nào được tìm thấy trong acceptance test đều được đánh giá là failure của sản phẩm.     |
| System testing gồm: system testing và system integration testing.     | Acceptance Testing gồm: Alpha testing và Beta testing.     |

### Tips để thực hiện System Testing

1. Tái tạo các kịch bản thời gian thực hơn là thực hiện thử nghiệm lý tưởng vì hệ thống sẽ được sử dụng bởi người dùng cuối chứ không phải bởi người kiểm tra được đào tạo.
2. Xác minh phản ứng của hệ thống trong các điều kiện khác nhau vì con người không thích chờ đợi hoặc trông thấy dữ liệu sai.
3. Cài đặt và cấu hình hệ thống theo tài liệu vì đó là những gì người dùng cuối sẽ làm.
4. Thu hút mọi người từ các khu vực khác nhau như BA, developer, tester, customer.
5. Test thường xuyên là cách duy nhất để đảm bảo rằng thay đổi nhỏ nhất trong code để fix bug không tạo ra bug nghiêm trọng trong hệ thống.

Tham khảo: https://www.softwaretestinghelp.com/system-testing/