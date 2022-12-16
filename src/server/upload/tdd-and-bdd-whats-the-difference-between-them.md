Nếu bạn là một Developer, thường xuyên up-to-date các practices phát triển phần mềm mới nhất, chắc hẳn đã từng nghe về các khái niệm Test-Driven Development (TDD) và Behavior-Driven Developent (BDD). Vậy TDD và BDD là gì? Sự khác nhau giữa chúng ra sao? chúng ta sẽ đề cập đến trong bài viết này.

![](https://images.viblo.asia/bfcd2481-3d47-4e63-93bd-676973722c9a.jpg)

## Vậy thế nào là Unit Testing?
**Unit testing** - Kiểm thử đơn vị là một phương pháp được sử dụng để kiểm thử logic thực hiện của các khối code (code block) riêng biệt (class, component). Trong thực tế, *Unit test* được thực hiện một cách tự động và đại diện cho một block code nhỏ để kiểm tra độ chính xác đầu ra mong đợi từ một hoặc một tập hợp các thành phần. Những thành phần được kiểm thử một cách riêng biệt với các phụ thuộc của chúng trong một thử nghiệm cô lập: DB, storage (kho lưu trữ), network, ...

## TDD (Test-Driven Development)
![](https://images.viblo.asia/c581d8cf-de39-461d-9c9c-a081bb3a8839.jpg)

**TDD** là phương pháp phát triển dựa trên việc hỗ trợ viết test cho các đoạn code nhỏ (unit test). Kết quả của việc sử dụng phương thức này, chúng ta nhận được tập hợp đầy đủ unit tests mà có thể chạy ở bất cứ lúc nào, bất cứ đâu mà chúng ta cần kiểm tra xem code của ứng dụng có hoạt động chính xác hay không. **TDD** được sử dụng khá phổ biến, ở các công ty phát triển theo mô hình Agile - Mô hình phát triển linh hoạt.

Phương châm của *TDD*: "*Red - Green - Refactor*"
> + "Red": tạo ra unit test và chạy nó để xem nó fail như thế nào
> + "Green": Thực thi logic code để hoàn thành test
> + "Refactor": cải thiện code, tránh dupplicate (trùng lặp), cải thiện kiến trúc test để kết quả test là thành công

Test được viết trước khi logic code thực tế được thực thi, *TDD* đảm bảo chất lượng cao cho sản phẩm và giúp đội phát triển tập trung vào việc viết code đơn giản và dễ hiểu. *Unit test* tập trung vào các khái niệm bên trong code của ứng dụng, vì vậy những nhà phát triển bên ngoài sẽ khó hiểu chúng. Hơn nữa, việc đánh giá các khái niệm, độ bao phủ code cũng như chất lượng của unit test trước khi thực hiện kiểm thử tích hợp cũng gặp nhiều khó khăn.
Đó là lý do tại sao toàn bộ trách nhiệm cho unit test không chỉ thuộc về QA, mà còn của Developer, unit test xử lý low-level code blocks và yêu cầu kiến thức về kiến trúc ứng dụng phần mềm. 

Nhược điểm:
> + Một số developers vẫn còn tư duy Testing là một sự lãng phí thời gian
> + Việc tạo thêm Test code làm tăng thời gian phát triển sản phẩm
> + Việc thực thi test có thể dễ dàng thực hiện sai cách, chỉ test các methods, class cụ thể riêng biệt, nhưng chưa test hệ thống nói chung

Ưu điểm:
> + Hiểu rõ về logic hoạt động của code
> + Tăng chất lượng code, do developer có thể cấu trúc lại code bất kỳ lúc nào và kiểm tra tính chính xác của code
> + Giảm thiểu các tickets do QA trả về cho dev
> + Giảm sự xuất hiện của các lỗi tương tự
## BDD (Behaviour-Driven Development)
![](https://images.viblo.asia/5c099335-7050-42c1-b338-7f07cb6c9a5d.jpg)

**BDD** được phát triển dựa trên **TDD**, tuy nhiên *TDD* tập trung vào kiểm tra quy trình nội bộ và độ chính xác của hiệu suất code, trong khi *BDD*, ưu tiên giá trị được đưa ra trong yêu cầu và nghiệp vụ của phần mềm được đảm bảo (kiểm thử chất nhận). *BDD* đảm bảo rằng tiến trình phát triển sản phẩm được tạo tra ngay từ đầu. Những kiểm thử đầu tiên này phải mô tả được chức năng dự kiến của sản phẩm và hành vi của phần mềm.

Các bước:
- Viết kịch bản test
- Chạy kịch bản test và kiểm tra cách hoạt động của hệ thống
> - Xác định các tình huống khi thực hiện kịch bản
> - Kiểm tra các tình huống này, nhận biết những gì hoạt động không đúng
> - Xác định và thực hiện các chức năng tối thiểu cần thiết cho tất cả các ví dụ để test
- Thực hiện test nhiều lần, nếu có lỗi lặp lại bước trên
- Kịch bản hoạt động, thực hiện tạo lịch bản mới để coverage những yêu cầu chính

Nhược điểm:
- Yêu cầu hiểu sâu về số lượng lớn các khái niệm, vì vậy muốn tiếp cận với BDD thì yêu cầu developers cần hoàn toàn hiểu rõ về TDD
- Vì nó là một khái niệm, biến nó thành một kỹ thuật thực hành hoặc kết nối nó với một bộ công cụ có nghĩa là hủy hoại nó

Ưu điểm:
- Nhờ có sự hiểu biết và cách nhìn tổng quan mà đội phát triển tập trung vào các tính năng ưu tiên từ khách hàng
- Giúp developers tập trung vào nhu cầu của người dùng và hành vi mong đợi thay vì đi vào sâu tất cả các chi tiết không cần thiết của sản phẩm
- Đội phát triển tập trung cụ thể vào chi tiết các chức năng và kiển tra những thứ quan trọng thay vì viết test cho toàn bộ code
- Đòi hỏi sự tăng trưởng liên tục trong sự hiểu biết về các yêu cầu sản phẩm, làm cho sự phát triển của các ứng dụng thay đổi dễ dàng hơn

## Nên sử dụng *TDD* hay *BDD*?
Bây giờ sự khác biệt đã được giải quyết giữa các cách tiếp cận này, vậy bạn nên sử dụng cách nào? Bạn có thể sử dụng thử nghiệm riêng từng phương pháp, và sự lựa chọn giữa chúng sẽ phụ thuộc vào cái mà team muốn hướng tới nhiều hơn và trải nghiệm nó với kiểm thử đơn vị. Điều được nhắc đến ở đây đó là nhiều kỹ thuật trong *TDD* sẽ được sử dụng trong *BDD*, vì vậy lời khuyên dành cho các bạn đó là nên thử nghiệm với *TDD* trước. Nếu bạn trải nghiệm với *TDD* nhưng chưa đạt được kết quả như mong đợi thì hãy thử với *BDD*. Hoặc kết hợp sử dụng chúng để bổ sung cho nhau cũng là cách rất độc đáo và hiệu quả.

Việc sử dụng TDD và BDD mang lại cho đội phát triển một lợi thế đáng kể trong việc tạo ra ứng dụng. Vì vậy hãy vận dụng và kết hợp chúng một cách có hiệu quả để tạo ra những sản phẩm mang lại nhiều giá trị cho người dùng.
### Tài liệu tham khảo
1, [Behavior Driven Development and Test Driven Development: Pros and Cons](https://redwerk.com/blog/behavior-and-test-driven-development)

2, [The Difference Between TDD and BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)