Vai trò QA trong Scrum là gì? Các hoạt động Scrum cho Tester?

Bài viết này không phải chỉ là hướng dẫn về một số process hoặc method hoặc hướng dẫn về làm thế nào để làm việc như một QA. Mà, nó là một bài viết trong đó tôi muốn chia sẻ cho các bạn kinh nghiệm của tôi về cách làm việc như một Senior QA trong Scrum.

CTO trước của tôi luôn nói rằng **"Tự do đi kèm với trách nhiệm"**. Nếu bạn có sự tự do để làm việc theo cách của bạn, thì bạn và chỉ bạn mới có trách nhiệm với công việc cũng như task và các hoạt động của bạn. 

Đây là tất cả những gì về Scrum!! Hãy để tôi giải thích với bạn rõ hơn về Scrum.

![](https://images.viblo.asia/fa64fc0e-724b-44dc-956c-b146ad0d03a6.png)

## Tổng quan về Scrum

Scrum là một tập con của phương pháp Agile và là một framework quy trình được sử dụng rộng rãi.

Scrum giúp chúng ta keep được sự happy của khách hàng bằng cách cung cấp cho họ sản phẩm trong các module nhỏ, nó cũng giúp cho khách hàng nhận thức được việc thay đổi yêu cầu thường xuyên của họ có thể làm chậm tiến độ sản phẩm. Bản release ngắn và làm việc dựa theo khả năng của team tham gia, do đó cơ hội thất bại hoặc khách hàng không hài lòng được giảm đến mức độ lớn.

Nhưng thách thức lớn cho QA là khoảng thời gian release ngắn, một Sprint thường có vòng đời 15 ngày. Do đó, phát hành 1 sản phẩm free bug trong tối đa 4-5 ngày (không tính thời gian developement) cần rất nhiều effort và tư duy thông minh.

## Tôi là QA trong team:

![](https://images.viblo.asia/b3ec1e4f-7be3-4531-b9ff-d8b58d1730f0.jpg)

Vâng, tôi là QA trong team và tôi là một phần quan trọng của team. Tại sao? Bởi vì khách hàng, BA, Scrum Master và tất cả mọi người đều mơ hồ về chất lượng, giao diện, và hiệu suất của ứng dụng hoặc sản phẩm.

Trong Scrum, thời gian của sprint ngắn, QA cần phải thực hiện theo cách thông minh và do đó việc QA cần được tham gia từ đầu "Planning" là rất quan trọng. Thỉnh thoảng khi PO vắng mặt, QA có thể đóng vai trò của PO, giúp BA tạo ra các kịch bản/trường hợp test tiêu chí chấp nhận.

Developer cũng có thể tiếp cận QA khi họ có rắc rối với chức năng hoặc quy tắc kinh doanh. Trong Scrum, trọng tâm là chỉ release Sprint thành công và trơn tru, và nó không phải là "Việc của tôi" hay "Việc của bạn", bạn cần sẵn sàng giúp đỡ khi team bạn cần giúp đỡ.

Trong liên kết team Scrum, quan hệ lành mạnh giữa các thành viên trong team đóng vai trò rất quan trọng. Và là 1 QA, bạn nên rất cẩn thận khi trao đổi ý kiến của bạn về user story mà bạn đang test. **Thông tin liên lạc của bạn nên là về user story hoặc chức năng, chứ không phải là về thành viên đang làm việc đó.**

Trong Scrum, QA không chỉ được đánh giá hoặc đánh giá cao về số lượng bug mà họ tìm thấy, mà còn về cách họ tương tác với team, giúp đỡ team và động viên team mỗi khi khó khăn.

Ngoài việc kiểm thử các task sprint, viết test plan, test case, QA cũng cần tham gia vào việc viết tài liệu document nhiều hơn vì thời gian release của Sprint là ngắn, và mục đích là giống nhau với tất cả mọi người: **"deliver một sản phẩm hoạt động không có bug thành công với sự giúp đỡ lẫn nhau"**.

1 QA có liên quan đến tất cả các hoạt động được thực hiện trong một Sprint và kỹ thuật, thì không có ranh giới nào cho việc bắt đầu hoặc kết thúc công việc của QA. Không giống như mô hình Waterfall, QA chỉ giới hạn trong việc test bản release, trong Scrum, QA có nhiều trách nhiệm hơn. Vì vậy, tôi đề nghị cố gắng thực hiện nhiều hoạt động sau đây.

## Các hoạt động cần được follow

Dưới đây là một số hoạt động tôi muốn đề nghị bạn follow khi là 1 QA trong Scrum:

### 1. Dwell Deeper:

Bằng cách này, ý tôi là khi các user story và tiêu chí chấp nhận sẵn sàng, hãy nghiên cứu kỹ lưỡng và nghĩ sâu hơn về sự phụ thuộc, các đầu ra ẩn, và cách tốt hơn để làm chúng.

Trao đổi và hợp tác với BA và đội phát triển về nó, bởi vì rất có khả năng họ không nghĩ về điều này. Chia sẻ ý tưởng của bạn và những phát hiện của bạn với team.

Nếu bạn phát hiện ra rằng có những chướng ngại ẩn hoặc những tác động tiêu cực, hãy raise chúng với Scrum Master và các nhà phát triển sẽ dành thời gian để suy nghĩ và hành động tương ứng. **Hoạt động này trong Scrum trở nên rất quan trọng khi dự án có quy mô lớn và khi có nhiều module trải rộng trên các team**.

Bây giờ trong khi nghiên cứu về các phụ thuộc, một tác động là rất quan trọng cho QA, và thậm chí nó làm cho cả đội phát triển cũng nhận thức được điều tương tự. Để làm nó, hãy trao đổi với các QA của các team khác và lấy đầu vào từ họ.

### 2. Involve in Estimations:

Một pratice thông thường là có sự tham gia của QA trong việc estimate, nhưng trong rât nhiều sprint nhỏ, QA có thể không được yêu cầu estimate thời gian test các task và để lại chúng với 3/4/5 ngày cho việc test.

Không bao giờ chấp nhận điều đó. Hãy nâng cao tiếng nói của bạn nếu bạn phải đảm bảo rằng bạn đang cung cấp estimate cho việc thử nghiệm của bạn, bao gồm thời gian bạn cần để thực hiện mọi việc.

Nó có thể bao gồm thời gian để nghiên cứu, setups, thu thập dữ liệu lịch sử, ... nhưng phải chính xác và cụ thể về thời gian cần thiết để thực hiện các hoạt động test, và những giá trị thời gian này cần được add vào user story cùng với thời gian phát triển.

Điều này rất quan trọng. Bởi vì trong trường hợp không add QA time vào, nếu bạn cố gắng thực hiện công việc trong thời gian quy định, và nếu bạn không thể hoàn thành nó, khi đó chỉ mình bạn phải chịu trách nhiệm cho sự thất bại này. Nhưng khi QA time được add, Scrum Master, PO sẽ nhận thấy các hoạt động QA có liên quan và lượng thời gian cần thiết. 

### 3. Cặp đôi Dev QA 

Trong Scrum, lý tưởng nhất là các Sprint User Story được bàn giao để test sau khi việc phát triển hoàn thành, và mỗi khi việc thử nghiệm dev được thực hiện. Nhưng vấn đề ở đây là thời gian nó được chuyển giao cho QA test thường mất 4-5 ngày cho việc Demo hoặc review remain. 

Bây giờ, nếu là 1 QA, bạn tìm ngay ra 4 blocker hoặc lỗi chức năng, bạn sẽ phải làm việc muộn hoặc cuối tuần để đáp ứng thời gian release của bạn vì sẽ có thử nghiệm chức năng, hồi quy, ... được thực hiện. Điều này có vẻ giống với mô hình waterfall truyền thống. Đó không phải là cách tốt nhất để làm. Trong Scrum, cách thông minh đó là "**Ngăn chặn lỗi hơn là tìm lỗi**".

Vì vậy, giải pháp là thực hiện ghép dev QA và thực hiện một vòng thử nghiệm cơ bản trên môi trường dev setup ngay sau khi developer sẵn sàng với stories, trước khi bản release chính thức được test.

**Các tiêu chí dưới đây có thể được xem xét cho việc BVT trên môi trường dev setup cho các user story:**

- ***Tiêu chí chấp nhận cho mỗi user story***: BVT của user stories phù hợp với tiêu chí chấp nhận
- ***Thiếu tự tin trong các developer***: Thỉnh thoảng các developer không tự tin về một vài triển khai và do đó họ thảo luận về những triển khai như vậy, và thực hiện BVT cho chúng trên môi trường dev setup tương tự.
- ***Phụ thuộc/Thử nghiệm tác động***: BVT của sự phụ thuộc hoặc tác động trên/của các module khác của các triển khai mới.
- ***Unit Testing***: thực hiện BVT với developer của các unit test mà họ tạo, nếu cần, hãy giúp đỡ họ bằng cách tạo thêm hoặc update các unit test.

Nó sẽ giúp giảm thiểu các lỗi, tiết kiệm thời gian của mọi người trước khi release cho QA khi mà đa số các lỗi crash hoặc lỗi chức năng đã được fix. Hãy nhớ log lại các lỗi đó trong công cụ của bạn trước khi thực hiện review sprint và chuyển chúng về trạng thái "closed".

![](https://images.viblo.asia/5920ed60-b48f-4dfd-a261-f08739e58d69.jpg)

### 4. QA trên bảng trắng:

Tôi luôn luôn khuyến khích nhóm của mình note cả QA task trên bảng trắng Scrum, bao gồm cả bug. Nó giúp cho Scrum Master tính toán trạng thái của QA trong user story bằng cách nhìn vào bảng.

Số bug trong danh sách To Do, bug trong In Progress, các hoạt động của QA trong To Do, trong In Progress, và trong Done nói về điều đó. Tôi thấy thật sự đau đầu khi có một ai đó hỏi về tình trạng kiểm thử của các story riêng biệt trong một Sprint. Bởi  vì tôi phải mất rất nhiều thời gian để tổng kết trạng thái từ các tool và chỉ cho họ.

Với Scrum, đơn giản tôi chỉ cần chỉ cho họ về Scrum Board và để họ tự tổng kết. Hãy ưu tiên các màu sắc nổi bật cho các QA Sticky slip.

![](https://images.viblo.asia/0d1f71e3-2b56-4117-a143-57e898f9aed5.jpg)

### 5. Tài liệu

Đây là một nhược điểm hoặc khiếm khuyết của Scrum vì với thời gian ngắn của Sprint thì không có nhiều thời gian cho tài liệu, và tôi không bao giờ thấy Technical Writer trong một Scrum team. Scrum Master/BA có thể không và không phải lúc nào cũng update tài liệu về thông tin sản phẩm.

Vấn đề xảy ra nếu có một thành viên mới join, hoặc tệ nhất là nếu quy tắc kinh doanh, chức năng thay đổi và cách để track chúng. Bởi vì để tìm kiếm thông tin trong những user story "Done" giống như tìm kiếm một cây kim trong một đống cỏ khô.

Giải pháp là tạo task riêng biệt trong một Sprint bất cứ khi nào có thể cho việc viết tài liệu (chủ yếu trong thời gian slack hoặc khi công việc rất ít) để bạn có thể review các document và update chúng, hoặc để Scrum Master hoặc BA sẽ update chúng.

QA là người thích hợp nhất update tài liệu bởi vì bạn là người test, xác nhận các user story và biết về chức năng cả trong lẫn ngoài. Hãy tự làm nó nếu như không có BA hoặc Scrum Master quá bận để update.

### 6. Sprint review/Sprint Demo:

Chủ yếu QA là người được chọn để đưa bản demo cho PO và Stakeholders, nhưng nếu không thuyết phục Scrum Master của bạn để làm nó. QA là người thích hợp để đưa bản demo vì cô ấy/anh ấy đã test các user story cả trong và ngoài.

QA có thể demo từ quan điểm kinh doanh bởi vì họ biết các chức năng, các flow, các quy tắc kinh doanh. Chuẩn bị tốt cho bản demo và cố gắng trả lời bất kỳ câu hỏi nào của PO và Stakeholders. Nó sẽ giúp bạn trở thành điểm giao tiếp của họ trong trường hợp vắng mặt Scrum Master và BA.

### 7. Hành động như một BA:

Đây không phải là một nhiệm vụ thường xuyên và thậm chí không được kỳ vọng từ một QA, nhưng hãy cố gắng đạt vai trò này khi có cơ hội, bởi vì Qa là người tốt nhất để trở thành một BA. Ví dụ, hãy cố gắng nghĩ và hình dung về các flow, chức năng hoặc quy tắc kinh doanh có thể được thay đổi để có lợi cho khách hàng.

Nghĩ và tìm hiểu các xu hướng hiện tại trong UI, giao diện của ứng dụng và cách làm nó thân thiện với người dùng hơn, ... Nếu team bị mắc kẹt với một vài vấn đề, tham gia và cố gắng đưa ra giải pháp đơn giản và thông minh. Điều này se giúp tăng cường vai trò của bạn và sẽ là một yếu tố góp phần vào sự phát triển nghề nghiệp của bạn.

Cơ hội sẽ đến trong khi đang trao đổi với PO về một số vấn đề hoặc trong khi review/demo mà bạn đưa ra được các suggest hợp lý.

## Kết luận

Scrum là một phương pháp rất khác biệt với phương pháp Waterfall thông thường, và Scrum Master là một người điều khiển. Vì vậy đừng mong chờ anh ấy/cô ấy định nghĩa các hoạt động của bạn cho bạn.

**Trong Scrum, không có ranh giới bắt đầu và kết thúc cho vai trò của một QA**. QA cần và phải tham gia vào mọi hoạt động ngay từ đầu đến cuối, ngay từ khi bắt đầu lên kế hoạch cho đến khi review/demo, và phải tham dự vào tất cả các hoạt động.

Bạn nên tự mình sáng tạo, giúp đỡ team bằng mọi cách có thể, giữ gìn mối quan hệ lành mạnh, theo dõi các hoạt động đang diễn ra trong team, và quan trọng nhất là phải clear tất cả các task của bạn trong một sprint.

Ở đây không có Managers người sẽ giám sát hoặc theo dõi các hoạt động của bạn. Luôn luôn sẵn sàng giúp đỡ team của bạn và bạn sẽ có được những cơ hội tốt nhất.

Tham khảo: https://www.softwaretestinghelp.com/qa-role-in-scrum/