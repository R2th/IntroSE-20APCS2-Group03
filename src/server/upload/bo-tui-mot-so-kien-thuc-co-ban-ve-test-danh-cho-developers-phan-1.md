# 1. Mở đầu 
Khi làm các bài tập lớn trên trường phát triển một ứng dụng nào đó hầu hết các sinh viên thường chỉ chú trọng vào việc viết code để ứng dụng chạy mà không để ý đến việc kiểm thử ứng dụng đó. Việc làm này tưởng chừng không có vấn đề gì khi hầu hết các bài tập trên trường chỉ là các ứng dụng khá là nhỏ khi phát sinh lỗi hoàn toàn có thể tìm ra lỗi một cách nhanh chóng. Tuy nhiên đối với các dự án trong thực tế quy mô thường khá lớn. Việc phát sinh một lỗi nào đó có thể rất khó để phát hiện và khắc phục việc này có thể gây ra những hậu quả nghiêm trọng. Chính vì vậy việc kiểm thử ứng dụng trở nên quan trọng để có thể nhằm tìm ra lỗi và khắc phục lỗi một cách nhanh nhất có thể.

Dù biết việc kiểm thử có vai trò quan trọng trong việc phát triển phần mềm tuy nhiên nhiều Developer vẫn không quan tâm tới việc kiểm thử cho lắm (thường là các Developer mới), họ nghĩ rằng công việc của Developer là việc tạo ra các chức năng còn công việc kiểm thử là của các Tester. Đứng trên một phương diện nào đó thì việc này đúng tuy nhiên là một Developer chúng ta vẫn thường phải viết các Unit Test, những kiến thức và tư duy của một Tester cũng là cần thiết đối với một Developer:
* Tư duy Tester giúp chúng ta bao quát được những trường hợp có thể gây ra lỗi cho hệ thống, từ đó nghĩ ra phương pháp giải quyết phù hợp.
* Tư duy Tester cũng sẽ giúp cho việc giao tiếp giữa Developer và Tester trở nên dễ dàng hơn khi thường phải làm việc với nhau.
* Biết cách chia hệ thống ra từng phần cho dễ  kiểm thử.
* Developer có tư duy Tester sẽ xem xét đoạn code mình viết ra một cách kĩ lưỡng nên code viết ra ít có bug hơn, giúp nâng cao chất lượng phần mềm, tiết kiệm được thời gian phát triển phần mềm.

Trong bài viết này mình xin phép trình bày, giới thiệu  một số khái niệm cơ bản về kiểm thử mà Developer nên biết.
# 2. Những khái niệm cơ bản về kiểm thử
### 1. Kiểm thử hộp trắng và kiểm thử hộp đên (White box / Black box)
* Kiểm thử hộp trắng (White box): Là việc kiểm thử mà chúng ta biết được source code. Kiểm thử kiểu này giúp chúng ta có thể biết được code của chúng ta có chạy đúng hay không.
* Kiểm thử hộp đen (Black box): Là việc kiểm thử đứng trên phương diện người dùng không biết hệ thống hoạt động ra làm sao chỉ dựa vào input và output để xem hệ thống hoạt động đúng hay không.
![](https://images.viblo.asia/026f1b95-a05d-4660-a146-f515efee120e.jpg)

### 2. Manual Test và Automation Test
* Manual Test: Là việc test thủ công bằng việc chạy chương trình và kiểm tra kết quả thu được có đúng hay không.
* Automation Test: Là việc sử dụng các đoạn code để kiểm tra một cách tự động, code sẽ tự động chạy chương trình tạo các input và so sánh đầu ra của chương trình với kết quả và đưa ra các report.

### 3. Các mức độ kiểm thử
1. Unit Test: Kiểm thử đơn vị thường do các Developer viết ra dùng để chạy thử code các thành phần một cách độc lập, được thực hiện trên các thành phần nhỏ nhất trong chương trình như các hàm, các class, ... nhằm cô lập các thành phần của chương trình và chứng minh các bộ phận chính xác theo yêu cầu của các chức năng.
2. Integration test: Là việc kiểm thử các thành phần trong một hệ thống xem nó giao tiếp với nhau như thế nào nhằm phát hiện lỗi giao tiếp giữa các thành phần. Có 4 loại kiểm tra trong Integration test:
    * Kiểm thử cấu trúc(structure): giống kiểm thử hộp trắng chú trọng đến các thành phần cấu trúc của chương trình.
    * Kiểm tra chức năng (functional): giống kiểm thử hộp đen chú trọng tới chức năng của chương trình không quan tâm tới cách chương trình hoạt động.
    * Kiểm thử hiệu năng (performance): Kiểm tra việc vận hành của hệ thống.
    * Kiểm tra khả năng chịu tải của hệ thống (stress): Kiểm tra các giới hạn của hệ thống.
4. System Test: Kiểm thử toàn bộ hệ thống đánh giá xem hệ thống có hoạt động đúng hay không, có thỏa mãn các yêu cầu đã được đưa ra hay không. System test thường được thực hiện bởi một nhóm kiểm tra độc lập với nhóm phát triển dự án.
5. Acceptance test: Mục tiêu của kiểm thử này là để đánh giá sự tuân thủ của hệ thống với các yêu cầu nghiệp vụ và thẩm định xem đã có thể chấp nhận để bàn giao chưa. Kiểm thử chấp nhận thường được khách hàng thực hiện.

![](https://images.viblo.asia/c69ad7ef-4b6b-4810-9476-f8506c2c955c.jpg)

# 3. Kết luận
Trong phần 1 mình đã giới thiệu một số các khái niệm cơ bản về kiểm thử. Trong phần 2 mình sẽ giới thiệu về TDD (Test Driven Development) và BDD (Behavior Driven Development) hi vọng mọi người sẽ ủng hộ.