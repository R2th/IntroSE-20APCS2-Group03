# I. Các phương thức

Trong Agile Testing, thông thường sử dụng phương thức testing truyền thống và hướng tới nguyên tắt - Bug phải được tìm thấy sớm nhất. Các Test case được viết trước khi viết code. Việc này tập trung vào phát hiện và ngăn chặn lỗi vào đúng thời điểm và đúng mức độ.

Trong phần này, bạn sẽ hiểu các phương thức:

- Test Driven Development (TDD)
- Acceptance Test Driven Development (ATDD)
- Behavior Driven Development (BDD)

## 1.Test Driven Development (TDD)
Theo phương pháp Test Driven Development (TDD), code được phát triển dựa theo hướng kiểm thử trước bằng cách viết automation test. Một testcase được viết đầu tiên sẽ fail, những lần code tiếp theo sẽ đảm bảo testcase pass. Phương thức này lặp lại, sửa đổi xuyên suốt quá trình phát triển code.

TDD có thể hiểu bằng các bước sau:

Bước 1 - Viết 1 testcase để phản ánh hoạt động kỳ vọng của chức năng cần viết.

Bước 2 - Chạy. Test sẽ fail vì code vẫn chưa phát triển.

Bước 3 - Code dựa theo testcase.

Bước 4 - Chạy test lại. Lần này, Test phải pass chức năng của code. Lặp lại Bước 3 và Bước 4 cho đến khi test pass

Bước 5 - Chỉnh sửa lại code

Bước 6 - Chạy test lại để chắc chắn nó pass

Lặp lại Bước 1 đến Bước 6 thêm testcase thêm vào chức năng. Những testcase được thêm và testcase trước đó mỗi lần running sẽ chắc chắn rằng code đang chạy đúng với kỳ vọng. Để làm việc này nhanh, testcase phải chạy tự động.

Testcase có thể là unit, integration or system level. Việc communication giữa Tester và Coder cần phải chắc chắn.

## 2. Acceptance Test Driven Development (ATDD)

Theo phương pháp Acceptance Test Driven Development (ATDD), code được phát triển trên việc kiểm thử trước theo hướng viết Testcase chấp nhận. Tập trung vào điều kiện chấp nhận và testcase chấp nhận được viết bởi Tester qua User Story(US) được công tác với khách hàng, người dùng cuối và các bên liên quan.

Bước 1 - Viết testcase chấp nhận dựa vào những US bằng cộng tác với khách hàng và người dùng.

Bước 2 - Định nghĩa các acceptance criteria.

Bước 3 - Phát triển dựa trên các acceptance tests và acceptance criteria.

Bước 4 - Chạy testcase chấp nhận để chắc rằng code đã chạy đúng yêu cầu.

Bước 5 - Tự động acceptance tests, Lặp lại Bước 3 đến Bước 5 cho đến khi tất cả các US trong chu trình phát triển được cài đặt.

Bước 6 - Tự động việc kiểm thử hồi quy.

Bước 7 - Chạy và tự động kiểm thử hồi quy để chắc chắn việc hồi quy liên tục.

## 3. Behavior Driven Development (BDD)

Behavior Driven Development (BDD) tương tự như Test Driven Development (TDD) và trọng tâm là testing code để đảm bảo hành vi mong đợi của hệ thống.

Trong BDD, ngôn ngữ như tiếng Anh được sử dụng để viết cú pháp hướng đến người dùng, tester và nhà phát triển. Nó đảm bảo -

- Trao đổi liên tục giữa người dùng, tester và nhà phát triển.
- Minh bạch về những gì đang được phát triển và thử nghiệm.

# II. Techniques

Testing Techniques từ kiểm thử truyền thống cũng có thể được sử dụng trong kiểm thử Agile. Thêm vào đó, các kỹ thuật và thuật ngữ kiểm thử cụ thể của Agile được sử dụng trong các dự án Agile.

## 1. Test Basis
Trong các dự án Agile, Các backlog thay thế các tài liệu đặc tả yêu cầu. Nội dung của backlog thường là những User Story(US). Các yêu cầu phi chức năng cũng được chú ý trong các US. Do đó, Kiểm thử cơ bản trong các dự án Agile là User case (UC).

Để đảm bảo chất lượng kiểm thử, những điều sau đây cũng có thể được xem xét bổ sung làm cơ sở kiểm thử -

- Kinh nghiệm từ các lần lặp lại trước đó của cùng một dự án hoặc các dự án trước đây.
- Các chức năng, kiến trúc, thiết kế, code và đặc điểm chất lượng hiện có của hệ thống.
- Lỗi dữ liệu từ các dự án hiện tại và quá khứ.
- Phản hồi của khách hàng.
- Tài liệu người dùng.

## 2. Definition of Done(DoD)

Definition of Done (DoD) là các tiêu chí được sử dụng trong các dự án Agile để đảm bảo hoàn thành một chức năng trong phần backlog của Sprint. DoD có thể thay đổi từ team Scrum này với team Scrum khác, nhưng nó phải nhất quán trong một nhóm.

DoD là một danh sách kiểm thử các hoạt động cần thiết đảm bảo thực hiện các chức năng và tính năng trong một US cùng với các yêu cầu non-functional là một phần của US. US đạt đến trạng thái xong sau khi tất cả các mục trong danh sách kiểm tra DoD được hoàn thành. Một DoD được chia sẻ giữa các team.

Một DoD điển hình cho một US có thể chứa -

- Tiêu chí chấp nhận kiểm thử chi tiết
- Tiêu chí để đảm bảo tính nhất quán của US với những người khác trong vòng phát triển
- Tiêu chí cụ thể liên quan đến sản phẩm
- Các khía cạnh hành vi chức năng
- Đặc điểm phi chức năng
- Giao diện
- Yêu cầu dữ liệu thử nghiệm
- Test Coverage
- Refactoring
- Yêu cầu xem xét và phê duyệt

Ngoài DoD cho US, DoD cũng được yêu cầu -

- Ở mọi cấp độ kiểm tra
- Cho từng tính năng
- Cho mỗi vòng lặp phát triển
- Phát hành

## 3. Thông tin kiểm thử

Tester cần có thông tin Kiểm tra sau

- US cần được kiểm tra
- Tiêu chí chấp nhận liên quan
- Giao diện hệ thống
- Môi trường nơi Hệ thống mong đợi sẽ hoạt động
- Tính khả dụng của công cụ
- Test Coverage
- DoD

Trong các dự án Agile, vì kiểm thử không phải là hoạt động tuần tự và tester cần phải cộng tác, đó là trách nhiệm của tester

- Có được thông tin kiểm tra cần thiết trên cơ sở liên tục.
- Xác định khoảng thông tin ảnh hưởng đến thử nghiệm.
- Giải quyết việc cộng tác với các thành viên khác trong nhóm.
- Quyết định khi nào đến mức thử nghiệm nào.
- Đảm bảo các kiểm thử thích hợp được thực hiện tại các thời điểm thích hợp.

## 4. Thiết kế kiểm thử Functional và Non-Functional

Trong các dự án Agile, các kỹ thuật thử nghiệm truyền thống có thể được sử dụng, nhưng trọng tâm là được triển khai sớm. Các trường hợp kiểm thử cần phải được đặt trước khi bắt đầu triển khai code. Đối với Functional test, tester và nhà phát triển có thể sử dụng các kỹ thuật thiết kế thử nghiệm Hộp đen truyền thống như

- Phân vùng tương đương
- Phân tích giá trị biên
- Bảng quyết định
- State Transition
- Class Tree

Đối với kiểm thử Non-Functional, vì các yêu cầu phi chức năng cũng là một phần của mỗi US, các kỹ thuật thiết kế kiểm thử hộp đen chỉ có thể được sử dụng để thiết kế các trường hợp kiểm thử có liên quan.


## 5. Kiểm thử dựa trên rủi ro (Risk-Based Testing)

Kiểm thử dựa trên rủi ro là kiểm thử dựa trên nguy cơ thất bại và giảm thiểu rủi ro bằng cách sử dụng các kỹ thuật thiết kế kiểm thử.

Rủi ro chất lượng sản phẩm có thể được xác định là một vấn đề tiềm ẩn với sản phẩm. Rủi ro chất lượng sản phẩm bao gồm

- Functional risks
- Non-functional performance risks
- Non-functional usability risks

Phân tích rủi ro phải được thực hiện để đánh giá xác suất và tác động của từng rủi ro. Sau đó, các rủi ro được ưu tiên

- Rủi ro cao yêu cầu kiểm thử nghiệm rộng rãi trên toàn hệ thống.
- Rủi ro thấp chỉ yêu cầu kiểm thử cho 1 vài chức năng.

Các kiểm thử được thiết kế bằng cách sử dụng các kỹ thuật kiểm thử phù hợp dựa trên mức độ rủi ro và đặc điểm rủi ro của từng rủi ro. Các kiểm thử sau đó được thực hiện để giảm thiểu rủi ro.

Nguồn Tham khảo:
- https://reqtest.com/testing-blog/agile-testing-principles-methods-advantages/