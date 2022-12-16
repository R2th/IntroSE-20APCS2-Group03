Trong [phần trước](https://viblo.asia/p/gioi-thieu-ve-test-driven-development-WAyK8pdkKxX) chúng ta đã thảo luận về TDD là gì. Chúng ta đã nói về cách TDD là quá trình phát triển tập trung vào kiểm thử , trong đó chúng ta bắt đầu viết các test case trước.  Điều này giúp chúng ta theo nhiều cách
*  Chúng ta sẽ viết code dựa trên các bài test. Điều này sẽ hạn chế rất nhiều lỗi trong quá trình code và tạo ra những sản phẩm có chất lượng tốt.
*  Với mỗi iteration, chúng ta đêu phải viết các bài test tương ứng và kết quả là với mỗi iteration , chúng ta có được một bộ test case regression . Điều này sẽ rất hữu ích vì với mỗi iteration , chúng ta có thể chắc chắn rằng các tính năng trước đó đang hoạt động.
*  Các bài test này sẽ đóng vai trò là tài liệu về hành vi ứng dụng (specs) và tài liệu tham khảo cho các iteration khác trong tương lai.

# Behavior Driven Development
Behavior Driven Development (BDD) là một phần mở rộng của TDD. Giống như ở TDD, trong BDD chúng ta cũng viết các bài test trước và sau đó mới code ứng dụng để vượt qua những bài test đó. Sự khác biệt chính của BDD so với TDD chính là:

* Các bài test hay các test case sẽ được viết bằng ngữ pháp tiếng Anh và mô tả rất đơn giản
* Các bài test được xem như là hành vi của ứng dụng dựa trên những nhu cầu thực tế của người dùng với ứng dụng đó
* Sử dụng các ví dụ để làm rõ các yêu cầu của ứng dụng

Sự khác biệt này dẫn đến sự cần thiết phải có một ngôn ngữ có thể định nghĩa, trong một định dạng dễ hiểu để chúng ta có thể áp dụng BDD một cách hiệu quả nhất . Và Gherkin là ngôn ngữ sẽ làm việc này ( sẽ giới thiệu cụ thể ở bài sau)

![](https://images.viblo.asia/0a12f8ee-69c0-4f79-b3f8-e0ff75470d36.jpg)

# Features of BDD
1. Chuyển từ suy nghĩ về "những bài test" sang suy nghĩ về "hành vi của ứng dụng"
1. Sự hợp tác giữa các bên liên quan Business stakeholders, Business Analysts, QA Team and developers đều phải tham gia vào quá trình phát triển
1. Ngôn ngữ phổ biến, dễ dàng để mô tả
1. Hướng đến những giá trị kinh doanh
1. Mở rộng Test Driven Development (TDD) bằng cách sử dụng ngôn ngữ tự nhiên mà các bên liên quan không cần biết kỹ thuật vẫn có thể hiểu được nhau
1. Các framework BDD như Cucumber hoặc JBehave là những người đi tiên phong, đóng vai trò là cầu nối giữa các ngôn ngữ Business và Technical

BDD ngày này rất phổ biến và có thể được sử dụng cho Unit test case và cho cả các UI test case . Các công cụ như  RSpec (cho Ruby) hoặc trong .NET, người ta thường dùng MSpec hoặc SpecUnit được sử dụng phổ biến cho Unit test theo phương pháp BDD. Ngoài ra, bạn có thể viết specs dựa trên kiểu BDD về tương tác giữa các phần tử UI với nhau . Giả sử bạn đang xây dựng một ứng dụng web, có thể bạn sẽ sử dụng thư viện tự động hóa trình duyệt như WatiR / WatiN hoặc Selenium và viết kịch bản bằng cách sử dụng một trong các framework vừa được đề cập ở trên, hoặc công cụ kiểu  Given / When / Then như Cucumber ( cho Ruby) hoặc SpecFlow (cho .NET) .

![](https://images.viblo.asia/3c552cc4-be87-4c68-9ecc-31a7c1b1e75e.png)

# BDD Tools Cucumber & SpecFlow
## What is Cucumber?
Cucumber là một testing framework hỗ trợ Behavior Driven Development (BDD). Nó cho phép chúng ta định nghĩa các hành vi ứng dụng tương tự như những câu tiếng Anh có ý nghĩa đơn giản bằng cách sử dụng một ngữ pháp đơn giản được xác định bởi một ngôn ngữ gọi là Gherkin . Bản thân Cucumber được viết bằng Ruby , nhưng nó có thể được sử dụng để test cho Ruby hoặc các ngôn ngữ khác bao gồm Java , C # và Python.

##  What is SpecFlow?
SpecFlow được lấy cảm hứng từ Cucumber trong thế giới Ruby on Rails. Cucumber sử dụng tiếng Anh đơn giản ở định dạng Gherkin để diễn đạt yêu cầu của người dùng. Khi các yêu cầu của người dùng và kỳ vọng của họ được viết, Cucumber được sử dụng để thực hiện các yêu cầu đó. SpecFlow mang khái niệm tương tự vào thế giới .NET và cho phép nhà phát triển thể hiện tính năng này bằng ngôn ngữ tiếng Anh đơn giản. Nó cũng cho phép viết specs bằng Gherkin để mọi người đều có thể đọc được.

# Why BDD Framework?
Giả sử có một yêu cầu từ khách hàng đối với trang web Thương mại điện tử để tăng doanh số bán sản phẩm với việc triển khai một số tính năng mới trên trang web. Thách thức duy nhất của nhóm phát triển là chuyển đổi ý tưởng của khách hàng thành thứ gì đó thực sự mang lại lợi ích cho khách hàng.

Ý tưởng ban đầu là tuyệt vời. Nhưng thách thức duy nhất ở đây là người đang phát triển ý tưởng không phải là người có ý tưởng này. Nếu người có ý tưởng là một nhà phát triển phần mềm tài năng, thì chúng ta có thể gặp may: ý tưởng có thể được chuyển thành phần mềm hoạt động mà không cần phải giải thích với bất kỳ ai khác. Bây giờ ý tưởng đó cần được truyền đạt và phải đi từ Business Owner (Khách hàng) đến các nhóm phát triển hoặc nhiều người khác.

Hầu hết các dự án phần mềm đều làm việc theo team và có thêm một số người liên quan làm việc cùng nhau, vì vậy giao tiếp chất lượng tốt với nhau là rất quan trọng đối với thành công của một dự án phần mềm. Như bạn biết, giao tiếp tốt không chỉ là mô tả hùng hồn ý tưởng của bạn cho người khác; bạn cũng cần thu thập các phản hồi để đảm bảo bạn đã hiểu đúng và team của bạn cũng đang hiểu đúng những gì bạn đang trình bày. Đây là lý do tại sao Agile development team đã học cách làm việc theo từng bước nhỏ,bằng cách thường xuyên gửi những chức năng ngay khi nó vừa được hoàn thành cho khách hàng để nhận phản hồi thường xuyên từ khách hàng và cũng để trả lời cho câu hỏi "Đây có phải là thứ khách hàng muốn ?" một cách nhanh nhất.

![](https://images.viblo.asia/80676286-e3d2-4877-a3d5-1409ebc37b6e.gif)


Với sự giúp đỡ của ngôn ngữ Gherkin, Cucumber có thể giúp cả team tạo ra một ngôn ngữ chung mà không cần phân biệt người đó có cần biết về kỹ thuật hay không. Các bài test được viết bằng Cucumber tương tác trực tiếp với code, nhưng các bài test này được viết bằng ngôn ngữ khá dễ hiểu thường sẽ được bởi các bên liên quan đến kinh doanh. Cucumber test giúp chúng ta loại bỏ nhiều hiểu lầm trong specs để phòng ngừa khả năng tạo ra những đoạn code mơ hồ và không chắc chắn.

## Example of a Cucumber/SpecFlow/BDD Test:

Tính năng chính của Cucumber là nó tập trung vào Acceptance testing. Nó giúp mọi người trong nhóm dễ dàng đọc và viết các bài test và cũng với tính năng này, nó sẽ giúp đưa business user vào quy trình kiểm thử, giúp team hiểu rõ hơn về những nhu cầu của họ đối với phần mềm (làm rõ requirement). Dưới đây là một vài ví dụ để bạn có thể hiểu rõ hơn về cách viết các bài test dùng BDD

**Feature:** Sign up
Sign up should be quick and friendly.

**Scenario:** Successful sign up

New users should get a confirmation email and be greeted
personally by the site once signed in.

**Given** I have chosen to sign up

**When** I sign up with valid details

**Then** I should receive a confirmation email

**And** I should see a personalized greeting message


**Scenario**: Duplicate email

Where someone tries to create an account for an email address
that already exists.

**Given** I have chosen to sign up

**But** I enter an email address that has already registered

**Then** I should be told that the email is already registered

**And** I should be offered the option to recover my password

# Summary
Sau khi xem đoạn code ví dụ ở trên, bất kỳ ai cũng có thể hiểu được hoạt động của bài test và những gì nó dự định làm. Nó mang lại một tác động mạnh mẽ bất ngờ bằng cách cho phép mọi người hình dung hệ thống trước khi nó được xây dựng. Bất kỳ business user nào cũng sẽ đọc và hiểu bài test và có thể cung cấp cho bạn thông tin phản hồi rằng liệu nó có phản ánh đúng ý tưởng của họ về những gì hệ thống nên làm hay không và thậm chí có thể dẫn đến suy nghĩ về các kịch bản khác cũng cần được xem xét. Từ đó chúng ta sẽ làm rõ hơn về những gì khách hàng hoặc business user thật sự muốn ở phần mềm của họ, qua đó sẽ dễ dàng dẫn đến một sản phẩm thành công. 

Nguồn : https://www.toolsqa.com
https://chercher.tech/java/cucumber-bdd