Trước khi bắt đầu mình sẽ giải thích đơn giản CI - Continues Integration (Tích hợp liên tục)  là gì?
> Tích hợp liên tục (CI) là phương pháp phát triển phần mềm đòi hỏi các thành viên trong nhóm tích hợp công việc thường xuyên. Mỗi ngày, các thành viên đều phải theo dõi và phát triển công việc của họ ít nhất một lần. Việc này sẽ được một nhóm khác kiểm tra tự động, nhóm này sẽ tiến hành kiểm thử truy hồi để phát hiện lỗi nhanh nhất có thể. Mỗi tích hợp được "build" tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể. Cả team nhận thấy rằng cách tiếp cận này giảm thiểu vấn đề tích hợp và cho phép phát triển phần mềm nhanh hơn.

Hiểu đơn giản thì các step trong 1 kịch bản CI sẽ như hình vẽ dưới đây:
![](https://images.viblo.asia/3a8256f5-ea71-41db-a487-5736cd14b8d8.jpg)

Nhìn vào sơ đồ trên có thể thấy viết Test trong 1 kịch bản CI là rất quan trọng. Trong bài viết này mình sẽ giới thiệu 1 vài cách & công  cụ để viết Test tốt hơn trong Ruby on Rails để tích hợp vào CI. 
Có 1 câu hỏi được đặt ra là viết Test trước hay sau khi phát triển sẽ là 1 cách tiếp cận tốt hơn? Thì xin phép trong phạm vi bài này xin phép tạm bỏ qua các phương luận và các yếu tố khác để đi TẠM COI như viết Test trước khi phát triển là hiệu quả hơn nhé :)

Trong phạm vi bài viết này, tôi cũng sẽ thảo luận về 1 số yếu tố cần thiết trong Ruby on Rails để tạo ra 1 bộ Test case vững chắc bằng cách sử dụng 1 trong những Testing Framework phổ biến nhất. Chúng ta sẽ cùng tìm hiểu các khái niệm thử nghiệm và thảo luận về 1 số công cụ hiện có, các config được define trong Testing Framework này và đưa ra 1 số mẹo về cách viết Test sao cho thực tiễn nhất.

## 1. TDD là gì?
TDD - Test Driven Development - Phát triển theo hướng thử nghiệm - là 1 cách tiếp cận. Đầu tiên, thử nghiệm được phát triển nhằm xác nhận những gì mã sẽ làm. Sau đó, viết và sửa các bài kiểm tra thất bại trước khi viết mã mới. Điều này giúp tránh trùng lặp mã khi chúng tôi viết một lượng nhỏ mã tại một thời điểm để vượt qua các bài kiểm tra. Từ kinh nghiệm của tôi, đó là một cách tiếp cận vững chắc vì nó khiến nhà phát triển suy nghĩ về các vấn đề phụ nhỏ hơn trước khi xây dựng toàn bộ các yêu cầu - sau đó sẽ tái cấu trúc (Refactor) trong nhiều giờ.

 Tóm gọn lại thì TDD hiểu đơn giản thì có 3 màu như sau:
1. Viết test Fail (Red)
2. Sửa code cho Test Pass (Green)
3. Loại bỏ code dư thừa - Refactor Code (Blue)

## 2. Chúng ta bắt đầu từ đâu? RSPEC !!!
Trong bài viết này, chúng tôi sẽ suggest các bạn sử dụng RSPEC để viết Test, đây là một Testing Framework phổ biến trong Ruby on Rails. 1 vài ưu điểm kể đến của Rspec như sau:
- Cú pháp ngắn gọn, dễ đọc. Rspec có thể đọc và hiểu bởi những người có ít kiến thức lập trình nhất -> từ đó giúp việc giao tiếp giữa Developer - Tester - Customer trở nên dễ dàng hơn bao giờ hết
- Có nhiều Tools hỗ trợ tuyệt vời
- Test Result dễ check, dễ đọc

## 3. Những Tools Awesome cùng với RSPEC
#### [Timecop](https://github.com/travisjeffery/timecop)
Cung cấp khả năng cho chúng tôi viết các bài kiểm tra liên quan đến thời gian. Đồng thời cung cấp một phương thức hợp nhất để giả định Time.now, Date.today và DateTime.now khi được gọi đến.

#### [Database Cleaner](https://github.com/DatabaseCleaner/database_cleaner)
Database Cleaner cung cấp cách để dọn dẹp cơ sở dữ liệu của bạn trong Ruby giữa chạy thử nghiệm. Nó đảm bảo làm sạch trạng thái cho testing.

#### [Shoulda Matchers](https://github.com/thoughtbot/shoulda-matchers)
Shoulda-Matcher cung cấp match one-line tới RSpec để sử dụng trong test các chức này năng của Rails mà chúng ta sẽ thấy ngay đây thôi

#### [Factory Bot](https://github.com/thoughtbot/factory_bot)
Cung cấp một công cụ rất hữu ích để tạo các mô hình của chúng tôi và có thể có các loại đặc điểm khác nhau đi kèm với các câu chuyện trường hợp người dùng.

#### [Faker](https://github.com/stympy/faker)
Cung cấp một thư viện cho phép chúng tôi có các loại dữ liệu ngẫu nhiên giả cho các mô hình nhà máy của chúng tôi, v.v.

#### [Capybara](https://github.com/teamcapybara/capybara)
Giúp kiểm tra các ứng dụng web bằng cách mô phỏng cách người dùng thực sự tương tác với ứng dụng của bạn.

#### [Pry](https://github.com/pry/pry)
Cung cấp cho chúng tôi khả năng gỡ lỗi các thử nghiệm của chúng tôi - tương tự như bảng điều khiển đường ray trong bộ thử nghiệm của chúng tôi.

## 4. Những khái niệm cần biết

#### Double.
Một cách để bạn mô phỏng dữ liệu mô hình
#### Stubs
Giả lập dữ liệu để trả lời các cuộc gọi được thực hiện trong quá trình thử nghiệm.
#### Factory
Giả lập để các nhà phát triển có thể tạo, xây dựng, v.v. dữ liệu được mô hình hóa với các đặc điểm trong bộ thử nghiệm của chúng tôi để thay thế nhân đôi.
#### Mock
Ý tưởng tái tạo một đối tượng với dữ liệu giả với đặc điểm kỹ thuật của các cuộc gọi mà họ dự kiến ​​sẽ nhận được.
#### Fixtures
Khả năng có các tệp dữ liệu lớn được phân đoạn thành các thư mục và đọc bên trong bộ phần mềm với cách đọc dữ liệu sạch hơn.
#### Describe
Các unit test thường liên quan đến việc thử nghiệm một single method trên một single class. Do đó, điều rất quan trọng là chúng ta mô tả method đang thử nghiệm một cách nhất quán. 
Vd:  Xác thực, #GET index , Callback ...
#### Context
Nhiều khối bên trong khối mô tả; mặc dù điều này sẽ làm cho bài kiểm tra của bạn rõ ràng và được tổ chức tốt
#### It
Chặn thông báo cụ thể những gì giá trị sẽ trả về và không được vượt quá 40 ký tự
#### Before do
Cơ hội trước khi các khối chạy để tạo các biến thể hiện, điền dữ liệu hoặc một tác vụ cụ thể.
#### After do
Cơ hội sau khi các khối chạy để tạo các biến thể hiện, điền dữ liệu hoặc một tác vụ cụ thể

## 5. 1 số mẹo nhỏ
-  Sử dụng `let` hoặc `let!` Thay vì thêm các biến thể hiện với trước khi gọi lại.
-  Giữ mô tả của bạn ngắn.
- Sử dụng các ví dụ được chia sẻ để DRY bộ thử nghiệm của bạn.
- CHỈ kiểm tra những gì bạn thấy
- Không sử dụng `should` khi mô tả các bài kiểm tra.

Có thể tham khảo [betterspec.org](http://www.betterspecs.org/) để  luyện tập những các viết Rspec tốt hơn.

Bài dịch từ:  https://blog.codeship.com/optimize-ci-testing-suite-with-ruby-on-rails/