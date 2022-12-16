Thuật ngữ "Refactoring (tái cấu trúc lại code)" thường được sử dụng để diễn tả việc dọn dẹp / thiết kế lại về source code theo yêu cầu.

Trong bài này, chúng ta sẽ hiểu rõ được định nghĩa về tái cấu trúc mã (Refactoring code). Cùng nhau thảo luận câu trả lời cho câu hỏi - Là một người thử nghiệm, tại sao bạn cần biết về tái cấu trúc mã?

![](https://images.viblo.asia/a61453f9-7bbe-4e7a-82eb-3d9d4471e08a.jpg)

## Giới thiệu về Refactoring code.

Để bắt đầu, chúng ta hãy tìm hiểu, Refactoring code thực chất là gì.

Refactoring code về cơ bản là một quy trình cải thiện mã hoặc cơ sở dữ liệu trong khi duy trì chức năng hiện có. Lý tưởng là để chuyển đổi mã không hiệu quả và mã quá phức tạp thành mã hiệu quả hơn, tốt hơn là đơn giản hơn và dễ dàng hơn.

Refactoring code hiện nay đã phổ biến rộng rãi hơn với các nhóm phát triển. Các nhóm trong dự án thường có thời gian để triển khai tính năng mới hoặc mở rộng chức năng của các tính năng với mã hiện có. Mã code dễ hiểu và duy trì chắc chắn sẽ dễ dàng hơn trong việc phát triển dự án trong một thời gian dài, và quản lý cũng dễ hơn rất nhiều.

## Tính cần thiết trong việc Refactoring code.

Nếu chúng ta đang duy trì chức năng ban đầu của sản phẩm hoặc mô-đun trong phần mềm, câu hỏi được đặt ra ở đây là: Tại sao chúng ta còn bận tâm đến việc tái cấu trúc mã? Có rất nhiều lý do mà một mô-đun hoặc đoạn mã cụ thể có thể cần phải được cấu trúc lại, như:

1. Code smells / Mã xấu.
2. Technical debt / Nợ kỹ thuật.
3. Agile software development approach / Phát triển phần mềm theo quy trình Agile.

![](https://images.viblo.asia/ad67b581-5ea5-4ce9-b3ce-9a365ed25a19.JPG)

### Code smells (Mã xấu)

Tất cả chúng ta đều hiểu rằng khi thực phẩm bắt đầu có mùi, điều đó cho thấy rất có thể nó đang bắt đầu có vấn đề - điều này cũng đúng với mã code! Mã xấu là dấu hiệu cho thấy một vấn đề nhỏ hoặc nghiêm trọng đang tồn tại trong mã nguồn.

Sau đây là một số hình ảnh gợi tới mùi mã xấu:

* Sự hiện diện của những đoạn mã giống hệt nhau nhưng không được sử dụng chính đáng.
* Biến được khai báo nhưng không được sử dụng ở bất kỳ đâu trong mã nguồn dự án.
* Thiết kế mã quá phức tạp.
* Class quá ít, không chứng minh được sự tồn tại của các class được định nghĩa.
* Sự tồn tại của quá nhiều điều kiện và vòng lặp có thể đơn giản hóa.

Mã xấu ngày càng trở nên rõ ràng hơn với thời gian trôi qua. Khi một ứng dụng hoặc hệ thống phát triển, cuối cùng các mã xấu này bắt đầu ảnh hưởng đến việc phát triển mã, bảo trì và thậm chí là hiệu năng của hệ thống. Ít nhiều nó có thể ảnh hưởng tới việc sử dụng hệ thống sau này.

 [(Tìm hiểu thêm về mã xấu)](https://viblo.asia/p/ma-xau-code-smells-va-refactor-huong-den-nguoi-lap-trinh-chuyen-nghiep-1Je5E8a4lnL)

### Technical Debt (Nợ kỹ thuật)

Trong khi phát triển 1 phần mềm, đơn giản là 1 tính năng. Trong 1 khoảng thời gian có hạn và tài nguyên sẵn có, thường thì lối tắt sẽ là cách đơn giản nhất để phát triển nó. Lối tắt ở đây là phát triển ứng dụng theo hướng đơn giản nhất, dễ đạt mục đích mong muốn nhất. Điều này dẫn tới code không được tối ưu nhất khi phát triển và duy trì nó.

Để dễ hình dung sự việc tôi sẽ cho bạn 1 ví dụ thế này: Để xây 1 cây cầu cho đoàn người qua lại thường xuyên, thay vì dùng giải pháp tối ưu là làm 1 cây cầu thép kiên cố chắc chắn, sử dụng lâu dài, thì đội ngũ xây dựng lại làm cây cầu vừa "đủ" đáp ứng được nhu cầu - một cây cầu gỗ. Tuy về mặt yêu cầu sản phẩm thì nó hoàn toàn đáp ứng được yêu cầu, nhưng về mặt duy trì và chất lượng thì lại không đáp ứng được. Ở trường hợp này, có thể gọi là đang nợ kỹ thuật. 

Nói một cách đơn giản, nợ kỹ thuật trong phát triển phần mềm là khoản phí / thời gian bỏ ra để đưa ra các bản vá phù hợp hoặc thực hiện mọi việc theo cách đúng đắn hơn, chất lượng hơn. Các khản nợ cũng giống trong cuộc sống, dự án trải qua càng nhiều giai đoạn, thời gian thì các khoản nợ kỹ thuật lại càng phình to ra. Điều này khiến cho phần mềm, ứng dụng dễ gặp lỗi, khó hỗ trợ và duy trì được lâu dài.

[(Tìm hiểu thêm về nợ kỹ thuật)](https://viblo.asia/p/technical-debt-no-ki-thuat-no-code-khong-chi-tra-bang-code-nwmGyEQMGoW)

### Agile software development approach (Phát triển phần mềm theo quy trình Agile)

Đặc trưng của quy trình [Agile](https://itviec.com/blog/agile-la-gi-scrum-la-gi/) là tính linh hoạt, bàn giao sản phẩm liên tục. Nếu không có mã tốt hoặc một cấu trúc ổn định trong mã, các nhóm phát triển sẽ không thể tối ưu hóa được code để mở rộng thêm phạm vi của chức năng trong mã. Nếu một đoạn mã không tốt, chưa tối ưu được sử dụng nhiều lần, nhiều nơi, dần dần sẽ góp phần tạo nên mã xấu và nợ kỹ thuật trong dự án. 

## Tại sao một QA lại cần biết về tái cấu trúc mã - Refactoring code?

![](https://images.viblo.asia/e0881ed7-94be-452f-84f8-c1e68874c2b9.jpg)

Ở bài viết này tôi sẽ chỉ đưa ra sự ảnh hưởng, những điều cần biết khi gặp refactoring code dưới vai trò là một QA / Tester.

Khi một chức năng, một màn hình được tái cấu trúc mã (không có thêm chức năng mới, hoặc nếu có thì nên tách rời ra làm các giai đoạn khác nhau), những yêu cầu của sản phẩm được định nghĩa sản phẩm tại tài liệu phải được giữ nguyên. Những chức năng chính của người dùng cuối không nên bị thay đổi hoặc chỉnh sửa luồng sử dụng nó. 

* Là một nhân viên kiểm thử, refactoring code có thể hiểu thành: in-depth testing (Kiểm thử chuyên sâu) và Regression testing (Kiểm thử hồi quy). Kiểm thử chuyên sâu cần bao gồm tất cả các luồng người dùng hiện có để đảm bảo rằng tất cả các chức năng của sản phẩm đang hoạt động đúng như trước. Kiểm thử hồi quy của toàn bộ ứng dụng là cần thiết, để đảm bảo rằng sau khi tái cấu trúc mã của một module nó sẽ không làm ảnh hưởng tới chức năng của một module khác. 
* User acceptance test sẽ rất quan trọng và các testcase của giai đoạn này cần phải được Pass hết toàn bộ trước khi bàn giao sản phẩm. 
* Ngoài ra các loại kiểm thử khác như:  load tests, security tests.... cũng cần được thực hiện nếu như có yêu cầu.

Những điều bạn nên thực hiện khi được giao nhiệm vụ đảm bảo Refactoring code:
1. Xác định phạm vị ảnh hưởng của module được Refactoring code.
2. Lên kế hoạch kiểm thử, viết testcase / checklist nếu cần thiết (tùy vào độ rộng hoặc nặng chức năng).
3. Xác định những vấn đề tìm thấy có phải do Refactoring code hay không.
4. Báo cáo tình hình về việc Refactoring code có ảnh hưởng nhiều đến các chức năng chính của sản phẩm hay không, nếu có cần phải được xem xét kỹ càng quy trình và thực hiện những bài test khác liên quan.
5. Verify bug, regression test cho phần vừa thực hiện kiểm thử, đảm bảo rằng những vấn đề đó sau khi được fix sẽ không phát sinh thêm vấn đề nào nữa. 

## Phần kết
Tóm lại tái cấu trúc mã là một quá trình làm sạch đẹp, tối ưu lại mã code. Có thể là dọn dẹp nhỏ trong code, có thể chỉnh sửa lại code nhưng vẫn giữ logic cũ. 

Là một QA bạn cần xác định được độ nghiêm trọng và sự ảnh hưởng của nó tới các chức năng trong sản phẩm mình. Nhiều khi vì lơ là bạn bỏ qua nhưng có thể do đó mà phát sinh ra những lỗi không tưởng. Kinh nghiệm cho thấy bạn nên xác nhận sự phức tạp của Refactoring code qua đội Dev và tất nhiên có được xác nhận từ Leader, cộng với kinh nghiệm từ mọi người thì bạn sẽ có được độ chính xác cao trong việc cover được hết những trường hợp có thể xảy ra sau đó. 

-----

Source: https://www.softwaretestinghelp.com/code-refactoring/#more-38110