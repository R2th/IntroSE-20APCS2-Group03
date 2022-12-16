**Vai trò của QA trong dự án chạy theo mô hình Scrum là gì? Phạm vi của Scrum đối với Kiểm thử viên**

Bài viết này không phải là lý thuyết hướng dẫn về quy trình, phương pháp hay hướng dẫn cách sử dụng Scrum cho QA mà đúng hơn nó chỉ là một bài báo nói về kinh nghiệm làm việc như là 1 Senior QA trong dự án SCRUM.

![](https://images.viblo.asia/6d9bd902-8333-4277-bc9a-74dabcf0d079.png)

## Tổng quan về Scrum
- Scrum là một tập con của phương pháp Agile và là một framework được sử dụng rộng rãi trong công việc không chỉ đối với ngành IT mà còn đối với nhiều ngành nghề khác.

- Scrum giúp chúng ta mang lại sự hài lòng cho khách hàng bằng cách cung cấp cho họ sản phẩm trong các mô-đun nhỏ, nó cũng giúp khách hàng hiểu rằng các yêu cầu thường xuyên thay đổi của họ có thể làm chậm hoạt động. Các bản phát hành ngắn và công việc được thực hiện theo khả năng của đội ngũ tham gia, do đó khả năng thất bại hoặc sự không hài lòng của khách hàng được giảm xuống mức độ lớn nhất.
- Nói theo một cách khác, những yêu cầu của khách hàng (được mô tả trong các User stories) được hoàn thành trước khi 1 Sprint bắt đầu để tránh phải làm đi làm lại nhiều lần và như vậy cũng tránh được việc Sprint đó bị bàn giao chậm hoặc là bị fail.
- Nhưng thách thức lớn nhất cho QA trong dự án SCRUM là thời gian release ngắn, một Sprint thông thường sẽ kéo dài khoảng 15 ngày. Do đó, để phát hành một sản phẩm không lỗi trong vòng tối đa 4-5 ngày (so với thời gian phát triển) QA cần nhiều effort và tư duy thông minh.

![](https://images.viblo.asia/a44e80ac-742f-4b8f-b1ac-1f591552f212.jpg)

- Trong Scrum, vì thời gian chạy nước rút ngắn, QA  phải thực hiện một cách thông minh và do đó  QA được yêu cầu tham gia ngay từ giai đoạn bắt đầu 'Lập kế hoạch' trở nên rất quan trọng. Có những thời điểm QA có thể đóng vai trò của một Product owner khi chưa có PO, do đó QA có thể giúp BA tạo ra các kịch bản / trường hợp  tiêu chí chấp nhận kiểm thử .
- Ở một thời điểm nào đó các lập trình viên cũng có thể thăm dò ý kiến của QA khi họ gặp phải các vấn đề về chức năng hoặc là các logic liên quan đến nghiệp vụ. Trong SCRUM, chỉ tập trung vào việc release sản phẩm thành công và suôn sẻ chứ không phải là sản phẩm của cá nhân hay là công việc của riêng một người nó cần sự giúp đỡ của cả một tập thể để đạt được mục tiêu.
- Sự liên kết nhóm trong Scrum, mối quan hệ thân thiết giữa các thành viên trong nhóm đóng một vai trò rất quan trọng và là một QA, bạn nên rất cẩn thận trong khi trao đổi ý kiến của bạn về các yêu cầu của người dùng mà bạn đang kiểm thử. Trao đổi của bạn nên nói về các user story hoặc chức năng của người dùng chứ không phải về người làm việc trên đó.
-  Trong Scrum, QA không chỉ phán đoán hay đánh giá về số lượng lỗi mà anh ấy / cô ấy phát hiện ra mà còn về cách anh ấy / cô ấy đang tương tác với nhóm, giúp đỡ nhóm và thúc đẩy nhóm ngay cả ở những thời điểm khó khăn.
-  Một phần từ nhiệm vụ kiểm thử nước rút, QA cũng cố gắng tham gia nhiều hơn vào việc viết các kế hoạch kiểm thử / các trường hợp kiểm tra / tài liệu phát hành vì thời gian phát hành của Sprint ngắn và  tất cả mọi người đều cùng chung một mục tiêu. "Để release thành công một sản phẩm không lỗi bằng cách giúp đỡ lẫn nhau".
-  QA có liên quan đến hầu hết các hoạt động được thực hiện trong Sprint và về mặt kỹ thuật không có ranh giới cho việc bắt đầu hoặc ngừng hoạt động của QA. Không giống như mô hình Waterfall truyền thống, QA chỉ giới hạn trong việc kiểm tra bản phát hành, ở đây, QA có nhiều trách nhiệm hơn. Vì vậy, QA sẽ cố gắng và thực hiện các hoạt động sau đây.

## Các hoạt động cần được thực hiện:

Dưới đây là vài hoạt động một QA trong Scrum cần thực hiện.

**1) Nghiên cứu kỹ lưỡng:**
- Bằng cách này, điều này có nghĩa là khi user story và tiêu chí chấp nhận (acceptance criteria) đã sẵn sàng, hãy nghiên cứu kỹ lưỡng và suy nghĩ nhiều hơn về các biến phụ thuộc, biến kết quả  và tìm xem có cách nào tốt hơn để làm điều đó.

- Trao đổi  và cộng tác với BA và nhóm phát triển về điều này bởi vì đôi khi họ có thể không suy nghĩ về điều này. Chia sẻ ý tưởng và phát hiện của bạn với nhóm.

- Nếu bạn thấy rằng có những trở ngại ẩn hoặc những tác động tiêu cực, thì hãy thông báo với Scrum Master và  nhóm phát triển sẽ cho họ thời gian để suy nghĩ và hành động phù hợp. Hoạt động này trong Scrum trở nên rất quan trọng khi dự án là một quy mô lớn và khi có các mô-đun trải rộng trên các nhóm.

Bây giờ trong khi nghiên cứu về các biến phụ thuộc, một tác động rất quan trọng đối với một QA và nó thậm chí còn làm cho nhóm phát triển cũng nhận thức được như vậy. Để làm điều này, hãy thảo luận với các QA của các đội khác và lấy dữ liệu đầu vào đầu vào từ họ.

**2) Tham gia vào quá trình Estimate**

Thông thường QA sẽ tham gia vào việc estimate cùng  nhưng có  thể do sprint nhỏ mà QA không tham gia vào việc estimate hoặc QA có thể không được yêu cầu tham gia vào việc estimate các task và thời gian kiểm thử có thể để default là  3/4/5 ngày đối với công việc kiểm thử.

Không bao giờ chấp nhận điều này. Raise ý kiến của bạn nếu bạn phải đảm bảo rằng bạn đang cung cấp  estimate thời gian kiểm thử của mình, bao gồm thời gian bạn cần cho mọi công việc. Nó có thể bao gồm thời gian nghiên cứu, thời gian setup, thời gian để thu thập dữ liệu lịch sử, nhưng phải nghiêm ngặt và cụ thể về thời gian cần thiết để thực hiện các hoạt động kiểm tra và có các giá trị thời gian này được thêm vào user story cùng với thời gian phát triển .

Điều này là rất quan trọng bởi vì nếu bạn cố gắng làm công việc của bạn trong thời gian quy định và nếu bạn không thể hoàn thành, thì có bạn sẽ phải chịu trách nhiệm cho sự thất bại của dự án. Khi thời gian QA được thêm vào, Scrum Master, PO sẽ nhận thức được các hoạt động QA có liên quan và lượng thời gian cần thiết.

**3) Làm việc theo cặp giữa QA và Dev**

Trong Scrum, lý tưởng nhất, User story của từng Sprint được bàn giao cho QA để kiểm tra sau khi nhóm lập trình viên hoàn thành task của họ và khi Dev đã hoàn thành Unit test, nhưng vấn đề ở đây là khi nó được chuyển giao cho QA để kiểm thử thì hầu như chỉ có 4-5 ngày để chạy Demo hoặc rà soát lại.

Bây giờ, nếu như một QA phát hiện ra ngay cả 4  blocker hoặc lỗi chức năng, bạn sẽ phải làm thêm vào buổi đêm  hoặc cuối tuần để đáp ứng ngày phát hành vì sẽ có kiểm thử chức năng, hồi quy, vv, được thực hiện. Điều này có vẻ giống như mô hình thác nước truyền thống mà không phải là cách tốt nhất để làm, trong Scrum cách thông minh nhất là "Ngăn ngừa khiếm khuyết hơn là tìm lỗi".

Do đó giải pháp được đưa ra là thực hiện làm việc theo cặp giữa Dev và QA và thực hiện một vòng kiểm thử cơ bản ngay sau khi các lập trình viên sẵn sàng với các stories ngay cả trước khi phát hành chính thức để kiểm thử.

Các tiêu chí sau đây có thể được xem xét để thực hiện BVT (Build Verification Test) về thiết lập cho các User stories:

* Tiêu chuẩn chấp nhận cho mỗi User stories: BVT của các User stories tương ứng với các tiêu chí chấp nhận.

* Thiếu tự tin cảu đội lập trình viên: Thỉnh thoảng các lập trình viên cảm thấy không tự tin về việc triển khai và do đó họ thảo luận về việc triển khai và thực hiện BVT cho những người khác giống như môi trường của các lập trình viên.

* Biến phụ thuộc / Kiểm thử tác động: BVT của các biến phụ thuộc hoặc tác động đến / của các mô-đun khác của việc triển khai mới.

* Kiểm tra đơn vị: Các lập trình viên hực hiện BVT bằng việc unit test, nếu cần, QA có thể giúp họ bằng cách thêm hoặc cập nhật các unit tests.

Điều này sẽ giúp giảm thiểu việc lặp đi lặp lại lỗi, tiết kiệm thời gian của mọi người  trước khi đưa cho QA . Hãy nhớ ghi lại các lỗi đó bằng công cụ của bạn trước khi review sprint và chuyển chúng đến trạng thái 'đóng'.

![](https://images.viblo.asia/29cdf9af-cae2-4bb2-ab97-b37a61cd386f.jpg)

**4) QA on white board:**

Luôn luôn khuyến khích nhóm QA cập nhật các task cần làm trên bảng trắng Scrum bao gồm cả các lỗi. Điều này giúp Scrum Master biết tình trạng của QA với từng user stories bằng cách nhìn vào bảng.

Số lượng các lỗi trong danh sách Công việc, các lỗi đang trong trạng thái Progress,  danh sách công việc cần làm của nhóm QA, các task đang ở status Progress và Done. 

Trước hoặc trong daily scrum, việc ước lượng sẽ ddwwocj thay đổi (lên hoặc xuống) và các card sẽ được di chuyển từ ô này sang ô khác trong bảng.

Mỗi dòng trên bảng sẽ là một user story, một đơn vị của product backlog. Trong cuốc họp sprint planning, team sẽ chọn các item trong product backlog mà họ có thể hoàn thành trong sprint sắp tới.

Đây là một số cột thông thường được sử dụng trên một taskboard:

* Story: mô tả user story (“Là user, tôi muốn…”) thể hiện trên mỗi hàng.

* To do: là nơi để các card chưa xong (Done) hoặc chưa bắt đầu (In Process).

* Work in process: bất kỳ card nào đang được thực hiện. Lập trình viên nào chọn task này sẽ di chuyển card đó sang cột này ngay khi cô ấy bắt đầu nó. Thường thì điều này xảy ra trong daily scrum khi mà ai đó nói “Tôi sẽ làm boojum hôm nay.”

* To verify: nhiều task cần có task test tương ứng. Do đó, nếu có card “Code boojum class”, gần như sẽ có một hoặc nhiều task card liên quan đến việc test: “Test boojum”, “Viết bài test Fitnesse để test boojum”… Vài task không có task test tương ứng. Ví dụ: fix bug 321 trên Bugzilla, nên nó sẽ được vào cột “To Verify”.

* Done: các card sẽ được đặt chồng nhau lên cột này sau khi hoàn thành. Và nó sẽ được loại bỏ vào cuối sprint. Thỉnh thoảng chúng ta cũng loại bỏ chúng dù chưa đến cuối sprint, nếu có quá nhiều card.

![](https://images.viblo.asia/5ea81036-e8be-4f3e-8fb1-121b28ff67d7.jpg)

**5) Tài liệu**

Đây là một trong những hạn chế hoặc nhược điểm của Scrum do thời gian cho mỗi một sprint là ngắn QA sẽ không có nhiều thời gian cho việc tạo tài liệu. Scrum Master / BA có thể không và không phải lúc nào cũng cập nhật các tài liệu thông tin về sản phẩm.

Vấn đề xảy ra nếu các thành viên mới tham gia hoặc trong trường hợp xấu nhất nếu logic nghiệp vụ, chức năng thay đổi sẽ gây khó khăn cho các thành viên mới để tìm kiếm các thông tin về yêu cầu của sản phẩm.

Giải pháp được đưa ra ở đây là  phải chia nhỏ các task tạo tài liệu trong một sprint bất cứ lúc nào có thể bạn có thể xem lại tài liệu và cập nhật chúng hoặc bạn có thể yêu cầu Scrum Master hoặc BA cập nhật chúng.

QA là người thích hợp để giúp cập nhật tài liệu vì bạn là người kiểm tra, xác minh các user stories và hiểu rõ các chức năng trong và ngoài. Tự mình làm nếu không có BA hoặc nếu Scrum Master của bạn bận rộn không thể cập nhật được.

**6) Sprint Review / Sprint Demo:**

Chủ yếu là QA là một trong những người được chọn để cung cấp cho các bản demo cho PO và các bên liên quan. nhưng nếu không thuyết phục Scrum Master của bạn làm như vậy. Một QA là một người thích hợp để cung cấp cho các bản demo như anh / cô ấy đã kiểm thử các user stories trong và ngoài.

Một QA có thể giới thiệu về sản phẩm vì họ hiểu các chức năng, các luồng và các logic nghiệp vụ. Chuẩn bị tốt cho bản demo và cố gắng trả lời từng câu hỏi mà PO và các bên liên quan đưa ra. Điều này sẽ giúp bạn trở thành cầu nối giao tiếp với khách hàng họ trong trường hợp không có Scrum Master và BA.

**7) Hành động như một BA:**

Đây không phải là một nhiệm vụ thường xuyên và thậm chí không mong đợi từ một QA nhưng cố gắng để có được trong vai trò này  một khi cơ hội được trao cho bởi vì một QA là người tốt nhất để được một BA. Ví dụ, cố gắng suy nghĩ và hình dung xem các luồng, chức năng hoặc logic nghiệp vụ có thể được sửa đổi theo cách sẽ mang lại lợi ích cho khách hàng hay không.

Hãy suy nghĩ và tìm kiếm các xu hướng hiện tại trong giao diện người dùng, giao diện của ứng dụng và cách nó có thể được đánh giá cao, thân thiện hơn với người dùng. Nếu nhóm bị kẹt ở một số vấn đề, hãy tham gia và cố gắng đưa ra một giải pháp thông minh và đơn giản. Điều này sẽ giúp tăng cường vai trò của bạn và sẽ là một yếu tố góp phần vào sự phát triển nghề nghiệp của bạn.

Các cơ hội đến trong khi trên các cuộc nói chuyện với PO khi một số vấn đề được thảo luận hoặc xem xét / demo, nơi bạn có thể đưa ra gợi ý.

## Kết luận
Scrum là một phương pháp rất khác so với phương pháp Waterfall bình thường, và Scrum Master là một người hỗ trợ. Do đó không mong đợi Scrum master xác định các hoạt động cho bạn.

Trong Scrum, không có ranh giới bắt đầu và kết thúc đối với vai trò của QA. QA cần và phải tham gia vào mọi hoạt động ngay từ đầu cho đến cuối, ngay từ khi lập kế hoạch  cho tới review/demo sprint và phải tham gia tất cả các hoạt động.

Điều này sẽ giúp QA hiểu sản phẩm hoặc ứng dụng, không có tài liệu thích hợp có sẵn khi làm việc trong Scrum. QA sẽ được mong đợi là người có trách nhiệm, năng động và chủ động trong công việc. Do đó không chờ đợi bất cứ ai đến và nói với bạn những gì hoặc làm thế nào bạn có nghĩa vụ phải làm.
Bạn nên tự mình sáng tạo, giúp nhóm theo mọi cách có thể, duy trì mối quan hệ lành mạnh, theo dõi những điều đang diễn ra trong nhóm và quan trọng nhất là làm rõ nhiệm vụ của bạn trong mỗi sprint.

Nguồn dịch: https://www.softwaretestinghelp.com/qa-role-in-scrum/