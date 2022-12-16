Tiếp nối những bài chém gió về automation test ở trước. Hôm nay mình lại tiếp tục viết về nó tiếp. Công cuộc đi tìm hiểu lý thuyết về kiểm thử có vẻ vẫn rất còn dài đối với bản thân mình :sweat_smile: 

Phân loại kiểm thử tự động là xác định loại bộ kiểm thử nào có thể thực hiện một cách tự động hóa. Nội dung bài viết sẽ không liên quan đến các framework tự động mà là xác định cách bạn sẽ thiết kế bộ kiểm thử cua mình thành một gói tự động hóa có thể được thực thi một cách thuận tiện.
# Tự động hóa dựa trên loại kiểm thử
**Tự động hóa các bài kiểm tra chức năng**

Các bài kiểm tra chức năng được viết để kiểm tra logic nghiệp vụ đằng sau một ứng dụng. Tự động hóa các kịch bản này có nghĩa là để xác thực logic nghiệp vụ và chức năng được mong đợi từ ứng dụng.

**Tự động hóa các bài kiểm tra phi chức năng**

Các thử nghiệm phi chức năng xác định yêu cầu không liên quan đến nghiệp vụ của ứng dụng. Đây là những yêu cầu liên quan đến hiệu suất, bảo mật, cơ sở dữ liệu ... Những yêu cầu này có thể khong đổi hoặc có thể được thu nhỏ theo kích thước của phần mềm.
# Tự động hóa dựa trên giai đoạn kiểm thử
 **Tự động hóa cho unit test**
Các kiểm thử này được chạy trong giai đoạn phát triển. Lý tưởng nhất là bởi nhà phát triển sau khi hoàn thành quá trình phát triển và trước khi bàn giao hệ thống cho tester để thử nghiệm.

**Tự động hóa kiểm thử API**

Các kiểm thử API được chạy trong giai đoạn tích hợp. Chúng có thể được chạy bởi nhóm phát triển hoặc nhóm tester và có thể được chạy trước hoặc sau khi lớp UI được xây dựng cho ứng dụng. Các thử nghiệm này nhắm mục tiêu thử nghiệm dựa trên request và response mà ứng dụng được xây dựng.

**Tự động hóa các bài kiểm thử dựa trên UI**

Kiểm thử dựa trên UI được chạy trong giai đoạn thực hiện kiểm tra. Chúng được chạy bởi những tester và chỉ được chạy một lần trước khi UI của ứng dụng được bàn giao. Chúng kiểm tra chức năng và logic của ứng dụng từ mặt front end của ứng dụng.
# Tự động hóa dựa trên loại kiểm thử
**Unit test**

Unit test (kiểm thử đơn vị) là các kiểm tra được xây dựng để kiểm tra mã của ứng dụng và thường được tích hợp và mã nguồn. Họ nhắm mục tiêu các tiêu chuẩn mã hóa như cách các method và function được viết. 

Các bài kiểm tra này thường được viết bởi chính các nhà phát triển. Tuy nhiên, các tester cũng có thể được yêu cầu viết chúng.

Thực thi các kiểm thử này và không có lỗi có nghĩa là code của bạn sẽ biên dịch và chạy mà không gặp sự cố về code. Các kiểm thử này thường không nhắm tiêu các khía cạnh chức năng của ứng dụng và chúng chỉ nhắm mục tiêu đến code. Sẽ phù hợp hơn khi tự động hóa chúng để chúng có thể được chạy theo yêu cầu của nhà phát triển.

**Smoke test**

Smoke test là một thử nghiệm nổi tiếng được thực hiện trong vòng đời thử nghiệm. Đây là các thử nghiệm sau khi xây dựng, chúng được thực thi ngay lập tức sau khi bất kỳ bản release nào được đưa ra khỏi ứng dụng để đảm bảo rằng ứng dụng vẫn họat động sau khi qúa trình xây dựng được hoàn thành. 

Đây là một bộ thử nghiệm nhỏ và là thứ sẽ được thực thi nhiều lần và do đó nó có ý nghĩa để tự động hóa nó. Các thử nghiệm này thường sẽ có tính chất chức năng và tùy thuộc vào loại ứng dụng mà một công cụ có thể được lựa chọn cho chúng.

**API test**

Kiểm thử API trở nên quan trọng hơn. Các ứng dụng được xây dựng trên kiến trúc API có thể thực hiện kiểm thử này.

Trong kiểm thử API, tester kiểm tra xác thực lớp nghiệp vụ của ứng dụng bằng cách kiểm tra các request-response cho các API khác nhau mà ứng dụng được xây dựng. Kiểm thử API cũng có thể được thực hiện như một phần của kiếm thử tích hợp.

**Integration test**

Kiểm thử tích hợp có nghĩa là kiểm tra ứng dụng bằng cách tích hợp tất cả các mô-đun và kiểm tra chức năng của ứng dụng. 

Kiểm thử tích hợp có thể được thực hiện thông qua kiểm thử API ở trên hoặc có thể thực hiện thông qua lớp UI của ứng dụng.

**UI test**

Kiểm thử UI được thực hiện từ lớp UI hoặc giao diện của ứng dụng. Chúng có thể nhắm mục tiêu kiểm tra chức năng hoặc đơn giản là kiểm tra thành phầ UI của ứng dụng.

Tự động hóa UI để kiểm tra chức năng của một chức năng là một cách phổ biến. Tuy nhiên, tự động hóa các tính năng GUI là một trong những tự động hóa phức tạp hơn. 

**Regression test**

Một trong những bộ kiểm thử tự động phổ biến nhất là kiểm tra hồi quy.  Hồi quy là kiểm thử được thực hiện khi kết thúc thử nghiệm một mô-đun mới để đảm bào rằng không có mô-đun hiện tại nào bị ảnh hưởng bởi nó.

Nó được lặp lại sau mỗi lần thử nghiệm mới và các trường hợp thử nghiệm chính được cố định với thường là một vào bổ sung mới sau một lần lặp mới. Vì nó thường xuyên chạy gần như tất cả các nhóm tester đều cố gắng tự động hóa gói này.

**Tự động hóa như là CI (Continuous integration)**

CI có thể được chạy trên chính các bài kiểm thử hồi quy tự động. Tuy nhiên, để đạt được CI chúng ta cho phép hồi quy hoặc bộ kiểm tra xác định sẽ được chạy mỗi khi triển khai mới.

**Security test**

Kiểm thử bảo mật có thể là cả chức năng cũng như loại kiểm thử phi chức năng, bao gồm kiểm tra ứng dụng để tìm ra lỗ hổng. Các kiểm thử chức năng sẽ bao gồm các thử nghiệm liên quan đến ủy quyền (authorization)... Trong khi các yêu cầu phi chức năng có thể là kiểm tra SQL, cross site...

**Kiểm thử hiệu suất và kiểm soát chất lượng**

Các kiểm thử hiệu năng là kiểm thử phi chức năng vào các yêu cầu như tải, khả năng mở rộng của ứng dung.

**Acceptance test**

Kiểm thử chấp nhận lại rơi vào thử nghiệm chức năng. Nó thường được thực hiện để đảm bảo nếu các tiêu chí chấp nhận được đưa ra bởi khách hàng đã được áp dụng. 

# Kết luận
Trong bài này mình đã mô tả các loại kiểm thử có thể được tự động hóa và các phân loại khác nhau, giống nhau. Tất cả các phân loại cuối cùng sẽ dẫn đến kết quả cuối cùng của một bộ kiểm thử tự động hóa.

Khi bạn đã xác định các thử nghiệm mà bạn muốn tự động hóa từ phân loại trên, thì bạn sẽ cần thiết kế logic của mình để thực hiện các thử nghiệm nà một cách trơn tru và không cần sự can thiệp thủ công.