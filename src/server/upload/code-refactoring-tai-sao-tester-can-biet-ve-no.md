## Hiểu về Code Refactoring: Một quan điểm của Tester

Thuật ngữ "Refactoring" chủ yếu được dùng để chỉ định cho việc thiết kế lại/dọn dẹp mã.

Trong bài này, chúng ta sẽ hiểu về định nghĩa của refactoring, trao đổi về sự cần thiết của việc refactoring code, và xem xét ảnh hưởng của refactoring code trên các thành viên nhóm dự án khác nhau. Chúng ta cũng sẽ thảo luận về câu trả lời cho câu hỏi quan trọng - **Là một Tester, tại sao bạn cần biết về Refactoring?**

Ngoài ra, chúng ta cũng sẽ thảo luận về một số nghiên cứu điển hình để làm rõ khái niệm này.

![](https://images.viblo.asia/a9158bc4-4ab9-4f13-abde-847f97ea3810.jpg)

## Giới thiệu về Refactoring

Để bắt đầu, việc đầu tiên chúng ta cần tìm hiểu là: Refactoring là gì?

Refactoring cơ bản là một quá trình cải thiện code và/hoặc database trong khi maintain các tính năng đã tồn tại. Ý tưởng là chuyển đổi từ việc không hiệu quả hoặc code quá phức tạp thành hiệu quả hơn, code đơn giản và dễ dàng hơn.

Refactoring code bây giờ cũng đã tạo đà với nhiều đội hơn bằng cách làm theo cách tiếp cận Phát triển phần mềm Agile. Các đội dự án thường bị giới hạn thời gian triển khai tính năng mới hoặc mở rộng chức năng và mã hiện có. Code dễ hiểu và có khả năng bảo trì chắc chắn phải mất một thời gian dài để đáp ứng.

## Sự cần thiết của Code Refactoring

Nếu chúng ta đang maintain chức năng gốc của ứng dụng hoặc module, câu hỏi đặt ra là Tại sao chúng ta cũng bận tâm Refactoring? Ồ, có một số lý do cho một module cụ thể hoặc đoạn code cần được refactor, như sau:

1. Code smells
2. Technical debt
3. Cách tiếp cận phần mềm theo hướng Agile, ...

Chúng ta sẽ thảo luận về các điểm cụ thể trong những phần dưới đây.

### #1) Code Smells:

Tất cả chúng ta có thể hiểu rằng khi thức ăn bắt đầu có mùi, nó cho thấy thức ăn đang dần bị hỏng - điều này cũng tương tự với code. Code smells cho thấy có vấn đề nghiêm trọng có thể xảy ra trong code.

Dưới đây là một số code smells phổ biến:

- Code dư thừa hoặc trùng lặp
- Khai báo một biến không được sử dụng ở bất kỳ chỗ nào trong code
- Design code quá phức tạp
- Code class quá ít và không xác minh sự tồn tại của lớp được định nghĩa. Các lớp như vậy được biết đến như là lớp lười biếng hoặc freeloader
- Có quá nhiều điều kiện hoặc vòng lặp
- Thay đổi một phần của code gây ra thay đổi cả ở những phần khác

Code smells trở nên rõ ràng hơn theo thời gian. Khi ứng dụng hoặc hệ thống phát triển, code smells bắt đầu ảnh hưởng đến việc phát triển code, bảo trì và thậm chí là cả hiệu suất hệ thống.

### #2) Technical Debt:

Khi phát triển một phần mềm, trong khoảng thời gian có hạn và resource có sẵn, thường chúng ta hay theo lối tắt để đạt được kết qủa mong muốn.

Xem xét một tính năng cần được thêm vào module có sẵn. Sau khi thảo luận, team thu hẹp 2 cách để thêm tính năng này. Cách A, mất 2 sprint để deliver, là cách tiếp cận dài hạn được duyệt. Cách B chỉ mất 5 ngày để deliver là một bản hack hard-code lộn xộn, cái mà được thiết kế chỉ để phục vụ module trong một thời gian ngắn.

Nếu team chịu áp lực deliver tính năng trong thời gian giới hạn, thì hiện tại họ có thể sẽ chọn cách B và thêm cách A vào backlog cho tương lai. Bằng cách này, team chỉ tạo được technical debt cho chính bản thân họ.

Một cách đơn giản, technical debt trong phát triển phần mềm đề cập đến việc bổ sung làm lại hoặc chi phí cần thiết để đưa các bản sửa lỗi thích hợp hoặc làm mọi thứ đúng cách.

Hệ thống Legacy có xu hướng thu được technical debt khổng lồ theo thời gian, từ đó có thể khiến ứng dụng dễ bị thất bại, khó cho việc support và maintain.

### #3) Cách tiếp cận phần mềm theo hướng Agile:

Cách tiếp cận phát triển phần mềm Agile giúp tăng trưởng sự phát triển. Không rõ ràng, không có cấu trúc tốt và không dễ dàng để maintain, nó không khả thi cho team mở rộng code có sẵn với mỗi vòng lặp. Nếu code được thay đổi không refactor đúng, nó có thể gây ra code smells hoặc technical debt.

Mối quan hệ được mô tả trong sơ đồ dưới đây:

![](https://images.viblo.asia/a392b199-aed7-47be-a3e3-6126274ea280.jpg)

## Tại sao QA cần biết về Refactoring?

Tất cả những gì chúng ta thảo luận đến giờ dường như liên quan đến coding và trông giống những gì một developer phải lo lắng.

Sau đó, tại sao chúng ta lại thảo luận vấn đề không liên quan này trong Cộng đồng hỗ trợ kiểm thử phần mềm? Hãy tiếp tục đọc những phần giới thiệu dưới đây để tìm câu trả lời nhé.

### #1) Cho Unit Testers/Developers

Trong khi refactor code, khi code mới được chèn vào, các class cũ được update, các class mới được update, và Unit test đã tồn tại có thể fail. Ngoài ra, cho hệ thống lagacy, có thể không có unit test nào được thực hiện cả. Unit test mới cần thiết sẽ được tạo và set up từ đầu trong phần lớn các trường hợp.

### #2) Cho Testers

Khi một tính năng được refactor (giả thiết rằng chúng ta không add thêm chức năng mới), nghĩa là sau khi yêu cầu thay đổi được thực hiện, phần lớn chức năng cho người dùng cuối vẫn được giữ nguyên.

* Là một Tester, refactoring code gần như bằng test sâu + test hồi quy. Test sâu cần test tất cả các flow người dùng hiện có để đảm bảo rằng tất cả các chức năng hoạt động đúng như trước. Test hồi quy của toàn thể ứng dụng (hoặc những phần bị ảnh hưởng) là cần thiết để đảm bảo việc nâng cấp một module không vô tình phá vỡ các chức năng của các module khác.
* Test chấp nhận là quan trọng và cần thiết phải pass trước khi bản build được thông báo sẵn sàng để release.
* Ngoài ra, một số test cần thiết khác là: load test, security test,... 

### #3) Kỹ sư kiểm thử tự động

Refactoring code có thể khiến cho script của function hoặc non-function bị lỗi.

Lỗi xảy ra do một số nguyên nhân sau:

* Nếu page object thay đổi như một phần của refactoring và nếu đoạn script tự động của Selenium dựa vào các page object đó, thì đoạn script sẽ bị lỗi và cần được update.
* Nếu có những thay đổi nhỏ, sau đó nó chuyển thành add hoặc remove trong quá trình refactoring, đoạn script hiện có sẽ lỗi và cần được update.

Chúng tôi đề nghị rằng kiểm thử tự động chỉ nên được thiết lập khi các  chức năng đã ổn định, nếu không nó sẽ dẫn đến nhiều việc làm lại khi tính năng phát triển.

Là một developer của test tự động, các kỹ sư kiểm thử tự động cần nghĩ như một developer và mong muốn tạo ra code sạch và dễ dàng để bảo trì. Hầu hết các IDE như IntelliJ IDEA, Eclipse,... bao gồm menu refactoring in-built với các phương thức refactoring thường được sử dụng để tham khảo.

Screenshot dưới đây là menu refactoring trong IntelliJ IDEA:

![](https://images.viblo.asia/4ae93387-0a9b-45a9-92af-fee83b85e11b.png)

### #4) Cho Test Leads/ QA Leads

* Test Leads/ QA Leads có thể được yêu cầu làm việc cùng với phần còn lại của team bao gồm developer, phân tích dự án, có thể cả các bên liên quan để đảm bảo rằng Test plan cho các dự án như vậy được thực hiện cẩn thận.
* Nó là quan trọng để hiểu về những chức năng hiện có. Dựa vào những chức năng hiện có, các trường hợp nghiệp vụ, luồng sử dụng người dùng và test chấp nhận sản phẩm cần được ghi chép lại. Khi một refactor code được test, tất cả các kịch bản này cần được xác nhận, cùng với kiểm thử hồi quy những vùng bị ảnh hưởng.
* Chủ động trong việc lên kế hoạch các cách tiếp cận và kế hoạch test. Nếu bạn dự đoán trước yêu cầu của nhiều môi trường test hoặc các tool test mới, hãy gửi yêu cầu sớm để ngăn chặn bất kỳ sự delay nào mỗi khi giai đoạn thử nghiệm bắt đầu.
* Đừng ngần ngại liên hệ với các member non-project hoặc end user để đóng góp cho thử nghiệm.

## Case Studies

Bây giờ chúng ta sẽ thảo luận về một số trường hợp nghiên cứu thực tế cái mà tôi đã có cơ hội làm việc trực tiếp hoặc đóng góp gián tiếp.

### Case Study #1

**Task:** Refactor một module để thay thế các giá trị hard-code thành các biến và thêm comment cho công cụ tạo tài liệu kỹ thuật tự động mới.

**Challenges:** Không có thách thức chính. Module là mới, đã có tài liệu chức năng, và yêu cầu chấp nhận người dùng, luồng người dùng và test case. Unit test được thiết lập trong lần khởi chạy ban đầu.

**Test Approach**: Test case của module được refactor và các khu vực bị ảnh hưởng tương đối được thực hiện. Vài defect được báo cáo và giải quyết trước khi release.

### Case study #2

**Task:** Refactor thủ tục được lưu trữ hiện tại để tăng quy mô của ứng dụng.

Thủ tục lưu trữ trong kịch bản là thủ tục lưu trữ cũ được thiết kế vài năm trước, lưu ý yêu cầu rằng ứng dụng sử dụng thủ tục lưu trữ như một ứng dụng nội bộ với ít hơn 10 session đồng thời.

Bây giờ công ty muốn phát hành ứng dụng này như một phần mềm dịch vụ, với độ lớn mong muốn là 300 session đồng thời trong một phiên.

Team thực hiện một vài load test ban đầu và kết luận rằng hệ thống bị vỡ với 25 session đồng thời. Team review code và đề nghị refactor một thủ tục lưu trữ cốt lõi hiện có, cái cho phép ứng dụng mở rộng quy mô và hỗ trợ tới 500 session đồng thời mà không bị vỡ.

Một vài issue được xác định với thủ tục lưu trữ này là có nhiều truy vấn con trong một truy vấn đơn, kết nối cồng kềnh với view thay vì table, sử dụng select * thay vì select một cột cụ thể, ... Do những issue đó, ứng dụng phải tìm kiếm nhiều dữ liệu hơn dữ liệu thực sự cần thiết, do đó làm cho ứng dụng bị chậm lại và thậm chí bị crash.

**Challenges:** 

**#1) Project Manager/ Product Analyst**

* **Thu thập yêu cầu:** Vì thủ tục được lưu trữ này là mã cũ, nên không có yêu cầu được ghi chép lại khi module được thiết kế lần đầu tiên. Ngoài ra với sự lặp đi lặp lại trong vài năm qua, cũng không có log thay đổi để chỉ ra các quy trình nghiệp vụ và logic được thêm hoặc xóa đi từ module.
* **Kế hoạch dự án:** Vì yêu cầu không được định nghĩa rõ ràng và các phụ thuộc code chưa được xác định đầy đủ, nên khó khăn cho việc truyền đạt lịch trình dự kiến.

**#2) Cho developers**

* Thiếu yêu cầu và quy tắc nghiệp vụ rõ ràng
* Làm sạch mã mà không làm mất tính năng của nó
* Không biết rõ khu vực ảnh hưởng hoặc/và sự phụ thuộc code
* Không thể cung cấp ước tính thời gian phát triển cụ thể
* Cần phải tạo Unit Test mới

**#3) Cho Testers:**

* Thiếu yêu cầu rõ ràng và quy trình nghiệp vụ tác động lên kế hoạch test
* Không biết những khu vực bị tác động tác động đến kế hoạch test, đặc biệt là test hồi quy
* Không thể cung cấp ước tính thời gian thử nghiệm cụ thể

**#4) Các bên liên quan**

* Thiếu các yêu cầu được ghi chép rõ ràng và/hoặc yêu cầu người dùng + deadline chặt chẽ = Rủi ro cao cho thất bại

**Test Approach để giảm thiểu rủi ro và làm việc xung quanh những thách thức**: 

**(i) Team thực hiện theo phương pháp cộng tác để thu thập yêu cầu:** Project Manager/ Product Analyst và Testers làm việc chặt chẽ với end user nội bộ để hiểu và ghi chép lại những tính năng chính và luồng người dùng.

Developers cũng review code và thêm các thông tin liên quan vào tài liệu yêu cầu. Nó sẽ hoàn thành trước ngày start sprint.

**(ii) Môi trường thay thế được tạo ra để test những phần thay đổi đang được thực hiện:** Hãy gọi những môi trường này là Gamma và Phi. Gamma sẽ chưá mã cũ và Phi sẽ chứa những thủ tục lưu trữ được refactor mới nhất được triển khai ở mọi thời điểm.

Có 2 môi trường song song, gần như tái tạo trước và sau khi tiếp cận, cho phép team test sâu hơn và khám phá hơn nhờ sự so sánh hành vi của 2 môi trường test, do đó họ có thể xác định được các lỗi có thể xảy ra.

Team đã cung cấp yêu cầu cho môi trường thay thế trước ngày start sprint.

**(iii) End user và các bên liên quan tham gia test sớm:** Bất kỳ vấn đề hiển nhiên nào được phát hiện và báo cáo sớm sẽ giúp cho team có nhiều thời gian hơn để deploy và test.

**(iv) Xác định tiêu chí kết thúc và tôn trọng nó:** Tiêu chí kết thúc được xác định trong giai đoạn lập kế hoạch ban đầu - 80% luồng người dùng được test, không có bug nghiêm trọng nào chưa được giải quyết, demo và đăng xuất khỏi các bên liên quan trước khi release.

**(v) Thiết lập ngày release dự kiến:** Thiết lập ngày release sẽ thúc đẩy team làm việc hướng tới một endpoint chung. Dựa vào phạm vi của dự án, team được khuyến cáo phát triển trong 3 tuần thay vì 2 tuần để có đủ thời gian thực hiện dự án.

## Kết luận

Tóm tắt lại, refactoring code là quy trình làm sạch/đơn giản việc thiết kế module không có sự thay đổi tính năng của nó. Quy trình refactoring có thể đơn giản, như thêm comment, thêm thụt lề chính xác, xóa một biến tĩnh, ..., cũng có thể phức tạp đối với các hệ thống thừa kế phức tạp.

Một module cụ thể hoặc một đoạn code có thể cần được refactor bởi vì code smells, technical debt hoặc bằng cách làm theo phương pháp tiếp cận Agile.

Test sâu là cần thiết để test tất cả các luồng người dùng hiện có để đảm bảo tất cả các tính năng là làm việc như trước đây. Test hồi quy toàn bộ ứng dụng (hoặc các phần liên quan) là cần thiết để đảm bảo rằng một module được nâng cấp không vô tình phá vỡ các tính năng của các module khác.

Test Leads/ QA Leads có thể được yêu cầu làm việc cùng với phần còn lại của team bao gồm developers, Product analyst đặc biệt là các dự án thừa kế. Chủ động trong khi lập kế hoạch thử nghiệm và kế hoạch kiểm tra. Nếu bạn dự đoán trước yêu cầu của nhiều môi trường test hoặc các tool test mới, hãy gửi yêu cầu sớm để ngăn chặn bất kỳ sự delay nào mỗi khi giai đoạn thử nghiệm bắt đầu.

Link tham khảo: 
https://www.softwaretestinghelp.com/code-refactoring/