## Lời nói đầu. 
-  Thỉnh thoảng trong các bài viết có sử dụng ngôn ngữ python, người ta thường hay trích dẫn là theo PEP XXX, hoặc tham khảo PEPYYY gì đó. Hoặc code-convention chưa đúng, theo PEP8 phải viết như này, như kia mới đúng. Vậy PEP là gì thế? 
-  Khi mình bắt đầu học và code ngôn ngữ python, cũng không có khái niệm chính xác, hoặc hiểu chính xác PEP là gì, mà bộp một cái, phải đọc hiểu PEP8, để sử dụng nó như một code-convention chuẩn của các project python. Hồi đó, mình nghĩ PEP chắc là chuẩn code-covention được cộng đồng python đồng ý và sử dụng rộng rãi, như kiểu người ta có quy ước chung về một điều gì đó mà mọi người đều cho là đúng vậy. 
-  Không thể phủ nhận, nếu mới bắt đầu bước vào con đường lập trình, và sử dụng ngôn ngữ python, việc học thuộc lòng PEP8 và sử dụng nó như một chuẩn code-convetion để viết code, là một lựa chọn đơn giản và dễ dàng nhất. Nó mang lại rất nhiều điều hữu ích khi định hình một cái nhìn đúng cho bạn về ngôn ngữ python. 
-  Bài viết này, mình dịch từ chuẩn PEP1. Tất nhiên, mình không có ý định dịch toàn bộ các PEPXXX, vì thật tuyệt với chúng ta giờ đã có đến PEP3333, và chúng ta không thể tìm hiểu tất cả chúng được. Nhưng tại sao mình lại chọn PEP1 mà không phải PEP8, cái thường được nhắc đến như là chuẩn code-convention tốt nhất cho người mới bắt đầu, hơn nữa, mình còn ca ngợi PEP 8 và thần thánh hóa nó lên ở bên trên nữa. Nguyên nhân, có lẽ vì PEP 8 là cái thường được tiếp xúc nhiều, và tìm hiểu dễ dàng, qua các ví dụ, cái nào nên, cái nào không nên, còn PEP1, đề cập đến mục đích và cách sử dụng PEP. Khi chúng ta cần tìm hiểu một vấn đề nào đó, chúng ta có thể sử dụng PEP như một nguồn tài liệu chuẩn đơn giản và ngắn gọn.

## PEP 1 -- PEP Purpose and Guidelines

|PEP|1|
| -------- | -------- |
|Title| PEP Purpose and Guidelines|
|Author| Barry Warsaw, Jeremy Hylton, David Goodger, Nick Coghlan|
|Status| Active|
|Type|Process|
|Created|13-Jun-2000|
|Post-History|21-Mar-2001, 29-Jul-2002, 03-May-2003, 05-May-2012, 07-Apr-2013|

Thông tin của một PEP bất kỳ đều được trình bày như trên, mình không cố ý dịch nó sang tiếng việt, vì với mỗi một chuẩn PEP bất kỳ, đều có mô tả ngắn gọn như trên, để khi tìm tài liệu, chúng ta có những thông tin đơn giản nhất về nó. Như theo ví dụ trên, chúng ta có thể biết được các thông  tin như số thứ tự là PEP 1 (Còn có cả PEP0 nữa các sếp nhé). Nội dung về mục địch của PEP và cách sử dụng, tác giả bao gồm :Barry Warsaw, Jeremy Hylton, David Goodger, Nick Coghlan, trạng thái vẫn được sử dụng, kiểu của pep là Process, được tạo vào 13 tháng 6 năm 2000, được chỉnh sửa theo các mốc thời gian bên dưới. 
Chúng ta đến với nội dung của PEP 1 nào. 

### What is PEP?
- PEP là viết tắt của Python Enhancement Proposal. Một PEP là 1 tài liệu được thiết kế để cung cấp thông tin đến cộng đồng python, hoặc miêu tả một feature mới của python, hoặc các tiến trình hay môi trường của nó. Một PEP phải cung cấp một đặc tả kỹ thuật ngắn gọn về tính năng và lý do cho tính năng này.
- PEP trở thành cơ chế cơ bản để đề xuất một feature mới, hay thu thập các issue, cũng là tài liệu thiết kế chính quyết định xem thứ gì nên có mặt ở bản release version tiếp theo của python. Những tác giả của PEP chịu trách nhiệm về việc xây dựng cộng đồng và ghi lại các ý kiến bất đồng. 
- PEP được lưu trữ các văn bản text, nên lịch sử chỉnh sửa của chúng chính là lịch sử chỉnh sửa các đề xuất feature. Cảm ơn chúa, ít ra thì mình cũng hiểu được mình đang viết cái gì. :) 
### PEP Types 
- Có 3 kiểu PEP, một là đàn ông, hai là phụ nữ,  ba là ngoài hai cái kể trên. :) 
    + Một **Standards Track** PEP miêu tả một feature hoặc một triển khai mới của python. Nó cũng có thể mô tả một khả năng tương tác chuẩn sẽ dược hỗ trợ ngoài các thư viện chuẩn cho các phiên bản Python hiện tại, trước khi PEP tiếp theo sẽ đưa ra thông tin bổ sung thư viện chuẩn cho phiên bản python tương lai.
    + Một **Information** PEP miêu tả những vấn đề (issue) trong thiết kê Python, hoặc cung cấp guidelines thông thường, hoặc các thông tin đến cộng đồng Python, nhưng nó không đề xuất một feature mới. **Infomation**PEP không nhất thiết phải được mọi người trong cộng đồng Python đồng ý, nghĩa là nó như một lời khuyên hữu ích, và có thể đồng ý hoặc không với một **Infomation** PEP. 
    + Một **Process** PEP (giống như cái PEP 1 mà mình cố gắng trình bày đây), mô tả những tiến trình xung quanh Pythn, hoặc đề xuất một sự thay đổi của các tiến trình. **Process PEP** giống với **Standars Track**, nhưng nó chỉ được áp dụng với chính bản thân ngôn ngữ Python thôi. Nó có thể đề xuất một cách triển khai, nhưng nó không phải là python codebase., nó thường phải được đồng thuận từ công đồng python, không giống như **Infomation PEP**, Các **Process PEP** không phải là các gợi ý mà người dùng có thể bỏ qua nó mà không phải suy nghĩ gì. Ví dụ như các thủ tục, guidelines, các thay đổi về việc quyết định các tiến trình, hay sự thay đổi về công cụ hỗ trợ hay môi trường dùng để phát triển python. Đọc có khó hiểu lắm không ? Hiểu đơn giản chỉ là với **infomation PEP** thì có thể không cần quan tâm, không cần đọc, nhưng với **process** thì cần phải đọc, cần phải quan tâm, và thường là phải làm theo/ đọc hiểu theo. Bất kỳ một meta-PEP nào cũng là một **Process PEP**. meta PEP là cái zì nhở?
### PEP workflow 
#### Python's BDFL 
- BDFL là viết tắt của cụm từ "Benevolent Dictato for Life",  văn phong mình cùi bắp, chưa hiểu nó định thể hiện cái gì ở chỗ này. Nhưng nói chung ở đây đề cập đến Guido van Rossum, người được biết đến như là cha đẻ của ngôn ngữ python. còn đâu thì chịu. :) 
#### PEP Editors
-  Chris Angelico
- Anthony Baxter
- Georg Brandl
- Brett Cannon
- David Goodger
- R. David Murray
- Jesse Noller
- Berker Peksag
- Guido van Rossum
- Barry Warsaw

Là những người được đề cập đến trong việc chỉnh sửa và viết những tài liệu này. 
####  Bắt đầu với một ý tưởng cho Python 
- Một **PEP process** bắt đầu với một ý tưởng mới cho Python. Một PEP khuyến kích chỉ tồn tại một đề nghị duy nhất hoặc một ý tưởng mới. Không tạo ra một PEP chỉ để thực hiện một cải tiến nhỏ, hay viết cho các bản cập nhật vá lỗi, những cải tiến nhỏ, hay bản vá lỗi sẽ được ném vào **issue tracker** của python. PEP càng tập trung, đơn giản càng tốt. Các PEP editor có quyền từ chối đề xuất PEP của bạn trong trường hợp nó quá rộng, hoặc **không tập trung**. Trong trường hợp đó, bạn nên tách PEP của bạn thành một vài cái PEP mang tính tập trung và ngắn gọn hơn.
- Mỗi PEP phải có một **champion** - người viết các PEP theo style và format được mô tả bên dưới, rồi thì tạo các cuộc thảo luận tại các forum thích hợp, và xây dựng, diễn giải, tìm kiếm sự ủng hộ của cộng đồng về ý tưởng mới. Một **PEP champion** (có thể chính là tác giả) đầu tiên là phải cố gắng xác định xem ý tưởng ấy có thể là một PEP không. Đăng ý tưởng vào những group mới hay mail cho python-list@python.org hoặc python-ideas@python.org là cách tốt nhất để thực hiện điều này. 
- Quá trình công khai một ý tưởng và biến nó trở thành một PEP mất khá  nhiều thời gian. Rất nhiều ý tưởng được đưa ra để thay đổi Python đã bị từ chối bởi nhiều lý do. Hỏi công động Python là điều đầu tiên cần làm để ngăn chặn việc tốn quá nhiều thời gian cho một thứ chắc chắn bị từ chối bởi những cuộc thảo luận trước đó. Một ý tưởng có thể tốt với tác giả, nhưng nó lại không có nghĩa sẽ hoạt động tốt cho hầu hết mọi người sử dụng Python khác. 
- Mỗi khi một **PEP champion** đưa ra câu hỏi cho cộng đồng Python là ý tưởng này có khả năng được đồng ý hay không, thì nó nên được trình bày theo đúng định dạng, có chất lượng cao và trình bày một cách rõ ràng và chính xác về ý tưởng đó.
#### Submit một PEP 
- Sau khi thảo luận  xong về ý tưởng cho pythn, thì một đề xuất chỉnh sửa sẽ được submit giống như một bản nháp của một PEP thông qua một github request. Bản nháp sẽ phải được viết theo phong cách PEP style được mô tả bên dưới, nếu không, nó sẽ bị **tèo** ngay lập tức. 
- Một quy trình chuẩn cho một PEP như sau:
    + Bạn, một PEP author, sẽ fork PEP repository về, sau đó tạo 1 file và đặt tên nó là PEP-9999, chứa nội dung PEP mới của bạn. Sử dụng "9999" để nói rằng nó là một bản PEP nháp. Nhưng có lẽ cái chuẩn sẽ được thay đổi dần nếu bản PEP hiện tại cao lên. Hiện tại number PEP cao nhất là 3333, thì có lẽ với sử phát triển của python, thì bản nháp sẽ đổi thành PEP-99999 :) 
    + Đẩy nó lên cái repo github bạn đã fork về, rồi tạo Pull Request 
    + Một PEP editor sẽ review PR của bạn về cấu trúc, format, hoặc các lỗi khác. 
    + Một khi được **approved**, họ (các PEP editor) sẽ gắn cho PEP của bạn một số nào đó, với nhãn của nó là loại  của PEP (ví dụ như Standards Track, Informational, Process) với status của nó là **Draft**.
-  Một khi quá trình review được hoàn thành, và PEP editor đã đồng ý, thì họ sẽ có nhiệm vụ kéo cái PR của bạn lên nhánh master.
-  Các **PEP editor** không thể từ chối một PEP với lý do chơi chơi như nhìn thằng submit PR này xấu zai, hay đồng ý vì bạn đẹp zai, xinh gái được. Các lý do được đưa ra bao gồm: duplication of effort, being technically unsound, not providing proper motivation or addressing backwards compatibility, or not in keeping with the Python philosophy. **BDFL** ( Guido van Rossum) sẽ là trọng tài, và là người quyết định cuối cùng cho số phận của một bản nháp PEP.  xin lỗi, tại mình chưa tìm được cách giải thích tốt nhất của mấy cái lý do tiếng anh được đề cập đến ở trên. 
-  Các developer có quyền **git push** có thể thực hiện việc thực hiện một PEP number nào đó. Khi nào như vậy, developer sẽ phải handle các task mà thông thường nó được thực hiện bởi PEP editors. Điều này bao gồm việc đảm bảo các chuẩn đã được thông qua việc submit một PEP mới.  Tất nhiên, developer có thể thực hiện việc này thông qua PR, như vậy, các PEP editor sẽ có những hướng dẫn bạn cách thực hiện thay đổi PEP trực tiếp trên repository. 
-  Khi bản cập nhật cần thiết, PEP author có thể kiểm tra nó tại version mới nhất khi họ hoặc developer của họ có quyền **git push**. 
-  Sau khi một PEP number được gán, một bản nháp PEP sẽ dược đưa ra thảo luận về những ý tưởng python mới. Tất nhiên, mọi **Standars Track PEP** phải dược gửi cho các python-dev để họ xem xét như một phẩn mô tả ở section tới. 
-  **Standards Track PÉP** sẽ được chia ra làm 2 phần, một phần thiết kế tài liệu, và phần còn lại là các triển khai tương ứng. Thông thường, nó sẽ được khuyến khích có tài liệu có thể triển khai và cài đặt. Vì một ý tưởng nghe có vẻ là tốt, nhưng khi thực hiện trên thực tế lại là một điều không thể thực hiện được. 
-  PEP author là người chịu trách nhiệm về việc thu thập các phản hội về PEP trước khi submit PEP và yêu cầu review. Tuy nhiên, bất cứ lúc nào, thì những cuộc thảo luận dài không có hồi kết được công khai trên mail là nên tránh. 

#### PEP review & Resolution 
- Một khi những tác giả của PEP hoàn thành một PEP, họ sẽ có thể yêu cầu sự review của các PEP editor về style và tính nhất quán. Tuy nhiên, nối dung và sự chấp thuật cuối cùng của một PEP phải được **BDFL** thông qua. Thông thường thì thông qua bở python-mailling list. Các PEPs sau khi được review và tư vấn bởi **BDFL**, nó sẽ được accept (đồng ý) hoặc reject(từ chối) hoặc gửi nó lại để tác giả chỉnh sửa thêm. 
- Người có thẩm quyền cao nhất để quyết định approved một PEP là **BDFL**, tuy nhiên, đôi khi họ cũng forward PEP này đến với một core-developer - là người có nhiều kinh nghiệm và kiến thức để họ quyết định một PEP. Khi được ủy quyền, thì một core-developer cũng có thể approved hoặc reject một PEP. 
![quy trình chung của việc review và quyết định](https://images.viblo.asia/c1ff31ce-bb69-4203-884c-fc7580a9b4b4.jpg)
Bên trên là các trạng thái chuyển đổi của một PEP cho đến khi được Active 
#### PEP maintenance 
- Thông thường, một **Standards track PEP** không có thay đổi nhiều nếu nó đã ở trạng thái FInal. Khi một PEP được hoàn thành, nso trở thành một tài liệu chuẩn của ngôn ngữ r. Không được chỉnh sửa.
- **Information PEP** và **Process PEP** có thể updated theo sự thay đổi trong quá trình phát triển cụ thể. 
### Một PEP thành công bao gồm điều gì.
-  Preamble: Có style đúng chuẩn, bao gồm header, meta-data, miêu tả ngắn gọn ở tiêu đề với ký tự tối đa 44 ký tự. có tên và tùy chọn liên lạc với các tác giả...
-  Abstract: Một miêu tả ngắn gọn khoảng 200 từ về vấn đề kỹ thuật được giải quyết 
-  Copyright/public domain: Mỗi PEP phải có chính xác nhãn hoặc nơi để public domain, hoặc licensed 
-  Specification: Đặc điểm kỹ thuật mô tả cụ thể cấu trúc và ý nghĩa của tính năng mới. Tài liệu phải cụ thể, và có thể triển khai tương thích với một python platform (Cpython, Jython, IronPYthon, PYPY)
-  Motivation: Việc mô tả rõ động lực thay đổi, đặc biệt là muốn thay đổi Python language, rất quan trọng, phải mô tả và làm rõ tại sao các phiên bản trước không có khả năng giải quyết vấn đề, và việc PEP được thực hiện sẽ đưa đến hiệu quả như nào. Nếu một PEP không có động lực thay đổi rõ ràng, nó có thể bị từ chối ngay lập tức từ khi bắt đầu. 
-  Rationale: Lý do thay đổi, đưa ra các bằng chứng cụ thể về việc được sự đồng thuận của cồng đồng python, hay những feedback khác nhau từ cộng đồng. 
-  Backwards Compatibility: Khả năng tương thích ngược, cụ thể, (theo mình hiểu), nó có tương thích với những gì sẵn có của ngôn ngữ hay không?
-  Reference Implementation: Các tham chiếu về việc triển khai phải thực hiện hoàn thành trước khi một trạng thái PEP là "Final", tuy nhiên nó không cần thiết ở trạng thái accepted. 
-  How to Teach This: Một PEP được thêm vào, sẽ có thể thay đổi hành vi của language (python ), do đó, nó cần có một phần là làm sao để dạy nwhngx người dùng, những người mới hay kể cả những người có kinh nghiệm, làm sao có thể áp dụng PEP này vào công việc của họ. 
Nguồn tham khảo thêm tại [PEP1](https://www.python.org/dev/peps/pep-0001/)