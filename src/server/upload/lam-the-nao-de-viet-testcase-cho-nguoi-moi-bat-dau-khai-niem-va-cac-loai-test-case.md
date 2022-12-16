Danh từ trong ngành phần mềm thường dễ gây nhầm lẫn. Test case, test script, test scenario, test plan; tất cả chúng nghe có vẻ giống nhau. Kể cả khi bạn là một tester đầy kinh nghiệm hay mới vào nghề, thì việc tìm hiểu các khái niệm rất quan trọng để tránh sự khó hiểu trong ngành software testing. Đó là nguyên nhân tại sao trong bài viết này, chúng ta sẽ tìm hiểu về "Test case". Vậy, test case trong ngành software testing là gì?

![](https://images.viblo.asia/6aee8b3c-4f10-4a54-8c94-55b1f0ef97e4.png)

### 1. Định nghĩa - Test case trong software testing là gì?

Đơn giản nhất, một test case là một tập hợp điều kiện và tham số dưới dự định nghĩa của một tester để quy định phần mềm có hoạt động đúng như yêu cầu và chức năng hay không.

Một test case là một đơn vị test đơn mà tester thực hiện. Nó hướng dẫn làm thể nào theo từng steps để test. Bạn có thể nghĩ một test case như là một tập hợp step-by-step hướng dẫn để verify hành vi gì đó là đúng yêu cầu.

#### 1.1 Một test case thường chứa:

- Tiêu đề
- Mô tả
- Test step
- Kết quả mong muốn (Expected result)
- Kết quả thực test (Actual result)

#### 1.2 Ai viết test case?

Điển hình thì một thành viên từ QA team sẽ viết test case. Ở đây không bao gồm unit test, được viết bởi development team, nhưng chúng ta sẽ không tham khảo unit test trong bài post này. Hãy chắc chắn rằng ai đang viết test case đều có kỹ năng viết, hiểu mục đích và giá trị của test case đó cung cấp.

#### 1.3 Nó đem lại giá trị gì?

Test case có một ý nghĩ lớn trong testing phase. Viết test case là bước quan trọng nhấy trong quy trình test. Hoạt động viết test case sẽ giúp bạn hiểu xuyên suốt chi tiết và chắc chắn rằng bạn đã kiểm tra tất cả các case nếu có thể

Giá trị của test case trong thời gian dài là bất cứ ai cũng có thể xem và test lại bằng việc sử dụng bộ test case. Test case là sẽ hỗ trợ các thành viên khác trong team trong tương lai. Ngắn gọn, test case sẽ giúp ta:

- Chắc chắn bao phủ cả system (các chức năng chính sẽ không bị quên trong quá trình test).
- Cho phép tester nghĩ đến các vấn đề bằng các cách khác nhau để verify lại các tính năng.
- Những negative test case cũng được lưu lại để tham khảo
- Chúng được sử dụng lại trong tương lai, ai cũng có thể xem và chạy lại test

#### 1.4 Khi nào thì sử dụng test case?

Test case được sử dụng sau khi development kết thúc một chức năng hay một tập chức năng. Trong khi chờ development hoàn thành, hoặc ngay thời điểm bắt đầu, tester có thể chuẩn bị test case để chạy. Mục đính là có test case sẵn sàng khi test bắt đầu.

Khi testing bắt đầu, tester theo bộ test case hoặc "script" họ đã viết để chạy test và verify phần mềm. Một nhóm các test case được gọi là test suite.

#### 1.5 Best practice trong khi viết test case

Khi nào viết test case, hãy nghĩ về vấn đề này:

- Giữ cho title ngắn gọn
- Bao gồm một mô tả chi tiết
- Rõ ràng và xúc tích
- Bao gồm giá trị mong đợi

Bạn cũng sẽ muốn thử viết những test case có thể tái sử dụng, vậy nên bạn có thể quản lý test và sử dụng lại sau này.

Trong khi viết test case có thể tốn effort test của bạn, nó cũng mang lại nhiều giá trị trong quá trình test và nâng cao chất lượng phần mềm của bạn.

### 2. Các loại test case trong software testing

![](https://images.viblo.asia/f9d0b1a7-760d-4b4e-8082-19490fc5ea5d.png)

#### 2.1 Functionality Test Case

Functionality Test Case được sử dụng để nếu một application interface hoạt động với sự tương tác giữa hệ thống và user của nó. Test xác định thành công hay fail một chức năng của phần mềm chính là giá trị kỳ vọng.

Những case này là một loại black-box test, yêu cầu hay user story của phần mềm được đặt ra để test. Điều này cho phép test thực hiện mà không cần phải truy cập vào cấu trúc bên dưới của phần mềm được test. QA team thường viết functionality test case bởi vì nó là một task trong quy trình QA bình thường. Chúng có thể được viết và chạy sớm trong giai đoạn development như là chức năng đầu tiên được test. Để giúp chỉ đạo phát triểu, chúng có thể được viết bằng code, nếu tất các tester nằm được yêu cầu.

The quy định trên, chúng có thể được viết và chạy trước khi làm và chúng nên được lặp lại bất cứ khi nào có thay đổi hoặc thêm mới.

Ví dụ: *Confirm một user có thành công upload hình đại diện*

#### 2.2 User Interface Test Case

User interface test case được xử dụng để verify những case đặt biệt là một phần GUI và mong đợi nó hoạt động đúng. Loại test case này có thể sử dụng để kiểm định về thẩm mỹ, ngữ pháp và lỗi dịch thuật, link và bất cứ thành phần nào mà user sử dụng interface có thể thấy.

Những case này thường được viết bởi testing team nhưng design team cũng có thể tham gia vì họ quen thuộc với giao diện. UI test case là loại test case trong software testing thường dùng cross-browser testing. Browser khác nhau thì render khác nhau và UI test case giúp chắc chắn rằng application của bạn hoạt động tốt qua các browser.

Những test case này sẽ chạy một lần ở development phase khi hoàn thành.

Ví dụ: *Chuyện gì xảy ra khi website được hiển thị trên một màn hình điện thoại nhỏ? Nó có làm UI bị bể?*

#### 2.3 Performance Test Cases

Performance test là kiểm tra hiệu năng về thời gian response và hiệu quả tổng thể của một ứng dụng. Đó là, sau khi thực hiện một hành động, phải mất bao lâu để hệ thống phản hồi? Các trường hợp kiểm tra hiệu suất nên có một bộ tiêu chí rất rõ ràng.

Tester team thường viết các trường hợp thử nghiệm này và chúng thường được kiểm tra tự động. Một ứng dụng lớn có thể có hàng trăm hoặc hàng ngàn bài kiểm tra về performance. Tự động hóa các thử nghiệm này và chạy chúng thường xuyên thấy các tình huống trong đó ứng dụng không hoạt động ở mức mong đợi. 

Các trường hợp kiểm thử hiệu năng giúp hiểu được ứng dụng sẽ hoạt động như thế nào trong trường hợp thực tế. Những trường hợp này có thể được viết khi tester team đã nhận được yêu cầu về hiệu suất từ product team. 

Ví dụ: *Mất bao lâu để hệ thống xác thực người dùng và tải trang tiếp theo? Khi nhiều người đăng nhập cùng một lúc, ứng dụng có ổn định không?*

#### 2.4 Integration Test Cases

Các trường hợp kiểm thử tích hợp có nghĩa là để xác định cách các mô-đun khác nhau tương tác với nhau. Mục đích chính với các trường hợp kiểm thử tích hợp là để đảm bảo giao diện giữa các mô-đun khác nhau hoạt động tốt.

Tester team sẽ xác định khu vực nào sẽ trải qua thử nghiệm tích hợp, trong khi development team sẽ có input đầu vào về cách các trường hợp thử nghiệm đó được viết.  Một trong hai team này có thể làm việc để execute các trường hợp. Họ xác minh rằng các mô-đun đã hoạt động riêng lẻ, cũng có thể hoạt động cùng nhau.

Ví dụ: *Kiểm tra liên kết giữa [Home] page và phần “favorites” section Khi bạn thêm một mục dưới dạng “favorites” section , từ trang chủ, nó có xuất hiện trong phần yêu thích của người dùng không?*

#### 2.5 Usability Test Cases
Usability test cases thường có thể được gọi là “tasks” hoặc “scenarios”. Thay vì cung cấp các hướng dẫn chi tiết từng bước để thực hiện kiểm tra, tester sẽ trình bày với một “scenarios” hoặc "task" để hoàn thành.

Usability test cases giúp xác định cách người dùng tiếp cận và sử dụng ứng dụng một cách tự nhiên. Họ giúp hướng dẫn người thử nghiệm thông qua các tình huống và các flow khác nhau. 

Các trường hợp thử nghiệm này thường được chuẩn bị bởi design team và tester team. Usability testing nên được thực hiện trước khi acceptance testing.

Ví dụ: *Người dùng có thể thêm thành công nhiều hơn một mặt hàng vào giỏ hàng của họ không? Trải nghiệm đó thế nào?*

#### 2.6 Database Test Cases

Test cases để kiểm cho database testing là kiểm tra về các luồng xử lý, hướng đi trong DB. Giao diện người dùng sạch sẽ và mọi thứ dường như đang hoạt động nhưng tất cả dữ liệu đó sẽ đi đâu?

Để viết các trường hợp thử nghiệm này, bạn cần có hiểu biết sâu sắc về toàn bộ ứng dụng, các bảng cơ sở dữ liệu và các thủ tục được lưu trữ. Tester team thường sẽ sử dụng các truy vấn SQL để query các trường hợp kiểm tra cơ sở dữ liệu.

Kiểm tra cơ sở dữ liệu được sử dụng để xác minh developer đã viết mã theo cách lưu trữ và xử lý dữ liệu đã đúng hay chưa.

Ví dụ: *Hãy xem xét việc tạo user profile. Khi người dùng gửi hồ sơ của họ, những điều sau đây cần được kiểm tra liên quan đến cơ sở dữ liệu.*
 - Có phải tất cả dữ liệu sẽ được lưu trữ vào DB
 -  Có bất kì dữ liệu nào bị mất trong quá trình?
 -  Nếu dữ liệu chỉ được thực hiện 1 phần thì có dc lưu hay không?x

#### 2.7 Security Test Cases
Các trường hợp kiểm tra Security giúp đảm bảo ứng dụng hạn chế các hành động và permissions bất cứ khi nào cần thiết. Những trường hợp thử nghiệm này được viết để bảo vệ dữ liệu

Xác thực và mã hóa thường là trọng tâm chính trong các trường hợp kiểm tra bảo mật. Nhóm bảo mật (nếu có) thường chịu trách nhiệm viết và thực hiện các thử nghiệm này.

Ví dụ: *Nếu người dùng đạt X số lần đăng nhập thất bại, tài khoản có bị khóa không? Là người dùng có thể tải lên dữ liệu mà không cần đăng nhập?*

#### 2.8 User Acceptance Test Cases

Các trường hợp kiểm tra acceptance testing, hoặc các trường hợp kiểm tra của UAT sẽ giúp tester team kiểm tra môi trường chấp nhận của người dùng. Các trường hợp thử nghiệm này phải rộng, cover tất cả các lĩnh vực của ứng dụng..

Mục đích của các trường hợp thử nghiệm này là không tìm thấy lỗi (hy vọng rằng chúng đã được tìm thấy và sửa trong các thử nghiệm trước đó), nhưng để xác minh ứng dụng được người dùng chấp nhận. Vì vậy, khi họ execute test, kết quả của bài kiểm tra đó và kinh nghiệm của bài kiểm tra đó có được chấp nhận không?

Khi nhiều loại thử nghiệm khác đã được thực hiện vào thời điểm UAT bắt đầu, nó không focus quá nhiều ở mức độ chi tiết, nhưng đi được mức độ tổng thể. Các trường hợp kiểm tra chấp nhận người dùng được sử dụng bởi người dùng cuối hoặc khách hàng và được chuẩn bị bởi testing team hoặc product manager. Đây có lẽ là giai đoạn thử nghiệm quan trọng nhất vì đây là bước cuối cùng trước khi đi vào sản xuất.

Ví dụ: *Nếu thử nghiệm chẳng hạn, ứng dụng quản lý ảnh cho studio chụp ảnh, khách hàng (người dùng) nên kiểm tra xem họ có thể tải lên và quản lý ảnh theo cách phù hợp với nhu cầu kinh doanh của họ không.*

#### Finally

Các trường hợp của test case sẽ tùy thuộc vào loại trường hợp thử nghiệm được viết, bạn có thể cần một nền tảng kỹ thuật hơn hoặc một trong UX để viết một trường hợp thử nghiệm tốt.

Mỗi loại kiểm thử phần mềm yêu cầu các loại trường hợp kiểm thử khác nhau. Bằng cách xem xét các thể loại test case khi bạn thiết kế các bài kiểm tra của mình, bạn sẽ tối đa hóa phạm vi kiểm tra và đưa ra sản phẩm với sự tự tin hơn.


**Tham khảo:**

 - https://blog.testlodge.com/types-of-test-cases-in-software-testing/
 - https://blog.testlodge.com/what-is-a-test-case-in-software-testing/