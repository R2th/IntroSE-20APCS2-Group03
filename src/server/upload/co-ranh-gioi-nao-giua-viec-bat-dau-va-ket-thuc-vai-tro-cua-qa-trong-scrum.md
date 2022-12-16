## Vai trò của QA trong Scrum là gì: Các hoạt động của Scrum đối với các tester

Bài viết này không chỉ là 1 hướng dẫn về 1 số quy trình hoặc các phương pháp về cách làm việc giống như 1 QA. Thêm vào đó, đây là 1 bài viết mà trong đó tôi muốn chia sẻ kinh nghiệm  làm việc của bản thân khi làm 1 Senior QA trong Scrum.

CTO trước đây của tôi thường nói rằng “Tự do đi liền với trách nhiệm”. Nếu bạn muốn tự do làm công việc của bạn theo cách bạn muốn thì chính bạn và chỉ bạn là người chịu trách nhiệm cho công việc hoặc các task hoặc các hoạt động của bạn.

![](https://images.viblo.asia/3350a5e5-0a93-4b55-8b57-29d5b433fabd.png)

## Tổng quan về Scrum

Scrum là 1 tập hợp con của các phương pháp nhanh chóng và là 1 quy trình framework đơn giản mà được sử dụng rộng rãi.

Scrum giúp chúng ta giúp cho các khách hàng hài lòng bằng cách đưa tới họ những sản phẩm theo các module nhỏ, nó cũng giúp các khách hàng biết rằng các yêu cầu thay đổi thường xuyên của họ có thể làm chậm các hoạt động. Các bản release ngắn và công việc được thực hiện theo khả năng của các team tham gia, do đó khả năng thất bại hoặc khách hàng không hài lòng sẽ giảm xuống rất nhiều.

Mặt khác, các yêu cầu(trong các user story của trường hợp này) được hoàn thiện trước khi các Sprint bắt đầu để tránh thực hiện lại và do đó dẫn đến sự chậm trễ hoặc thất bại của Sprint (luôn có ngoại lệ).

Nhưng thách thức lớn nhất đối với 1 QA là các khoảng release ngắn, 1 Sprint thường có 1 chu kỳ là 15 ngày. Do đó, việc cung cấp 1 sản phẩm không có bug trong tối đa 4-5 ngày (chiếm hết thời gian phát triển) cần rất nhiều nỗ lực và các tư duy thông minh.

**Tôi là QA**

Ồ vâng, tôi là QA của team và tôi là 1 nhân vật quan trọng của team. Tại sao?? Bởi vì các khách hàng, BA, Scrum master và những người khác đều mờ nhạt về giá trị, tầm nhìn và cảm nhận và hiệu suất của các ứng dụng hay sản phẩm.

Trong Scrum, vì thời hạn cảu các sprint ngắn, QA phải thực hiện 1 cách thông minh và do đó việc QA cần được tham gia ngay từ khi bắt đầu lập kế hoạch trở nên rất quan trọng. Đôi khi, 1 QA có thể đóng các vai trò chủ sở hữu của 1 Proxy product khi không có các PO, từ đó giúp các BA tạo ra các tiêu chí của các kịch bản / các case test.

Các dev cũng tiếp cận các QA tại các thời điểm khi họ đối mặt các rắc rối với các function hay các business rule. Trong Scrum, chỉ chú trọng việc release Sprint suôn sẻ và thành công và chứ không nói về “my work” hay “your work” cần đưa ra sự giúp đỡ.

Trong Scrum team, các mối quan hệ lành mạnh giữa các thành viên của team đóng vai trò rất quan trọng và là QA bạn nên cực kỳ cẩn thận trong khi truyền đạt ý tưởng của bạn về các user story mà bạn đang test. Sự truyền đạt của bạn nên về các user story hay các function chứ không phải về những người mà làm nó.

Trong Scrum, QA không chỉ được đánh giá bởi số lượng các bug họ tìm ra mà còn về cách họ tương tác với các team, giúp đỡ các team và thúc đẩy các team ngay cả những thời điểm khó khăn.

Ngoài việc test các task của các sprint, việc viết các test plan/ test case/ các tài liệu release cũng cố gắng tham gia nhiều bởi vì thời hạn release của các sprint ngắn và các mục tiêu là giống mọi người “ để cung cấp 1 sản phẩm thành công làm việc không có lỗi bằng cách giúp đỡ lẫn nhau”.

QA có liên quan đến hầu hết các hoạt động được thực hiện trong 1 Sprint và về mặt kỹ thuật không có ranh giới cho việc bắt đầu hay dừng lại các hoạt động của QA. Không giống như mô hình Waterfall truyền thống nơi mà các QA chỉ được giới hạn trong việc test các bản release, ở đây các QA có nhiều trách nhiệm hơn. Bởi vậy, tôi sẽ đề nghị cố gắng thực hiện nhiều hơn các hoạt động dưới đây.

## Các hoạt động cần thực hiện

Đưa ra 1 vài hoạt động dưới đây, tôi muốn gợi ý bạn như 1 QA trong Scrum.

###  1.Dwel Deeper:

Bằng cách này, ý tôi là khi các user story và các acceptance criteria đã sẵn sàng, nghiên cứu kỹ và suy nghĩ sâu hơn về các vấn đề, các thành quả tiềm ẩn và nếu có cách nào tốt hơn để làm điều đó.

Trao đổi và hợp tác với các BA và các dev team về điều này bởi vì nó có thể có thể xảy ra rằng họ cũng có thể không nghĩ về điều này. Chia sẻ ý tưởng và tìm tòi của bạn với các team.

Nếu bạn thấy rằng có những rào cản tiềm ẩn hoặc các tác động tiêu cực, thì hãy raise chúng với các Scrum master và các dev sẽ cho họ thời gian để suy nghĩ và hành động phù hợp. Hoạt động này trong Scrum  trở nên rất quan trọng khi các dự án có quy mô lớn và khi có các module trải rộng qua các team.

Trong khi nghiên cứu về các vấn đề, 1 tác động là rất quan trọng đối với 1 QA và nó thậm chí làm cho các dev team nhận thức tương tự. Để làm điều này, hãy thảo luận với các QA của các team khác và tiếp nhận các input từ họ.

### 2. Tham gia trong các dự tính:

Thông thường 1 QA cần tham gia vào các dự tính nhưng nhiều khi do các sprint nhỏ, các QA có thể không bị yêu cầu dự tính cho các task được test và mất 3/4/5 ngày cho công việc test.

Đừng bao giờ chấp nhận điều này. Hãy lên tiếng nếu bạn phải chấp nhận nhưng đảm bảo rằng bạn đang cung cấp dự tính test của bạn cái mà cần bao gồm thời gian bạn cần để làm mỗi công việc.

Nó có thể bao gồm thời gian nghiên cứu, thời gian thiết lập, thời gian thu thập dữ liệu lịch sử…, nhưng phải nghiêm ngặt và cụ thể về thời gian cần thiết để thực hiện các hoạt động test và bổ sung các giá trị thời gian tới các user story cùng với thời gian phát triển các task.

Điều này rất quan trọng bởi vì nếu bạn cố gắng làm công việc của bạn trong thời gian đã được quy định và nếu nếu bạn không thể hoàn thành, chỉ mình bạn sẽ phải chịu trách nhiệm cho các thất bại. Khi thời gian của các QA được bổ sung, các Scrum master, các PO sẽ nhận thức được các hoạt động của các QA và thời lượng cần thiết.

### 3. Ghép nối Dev QA

Ý tưởng trong Scrum, các user story của các Sprint được bàn giao để test sau khi hoàn tất phát triển và khi các dev testing được thực hiện, nhưng các vấn đề ở đây là vào thời điểm đó nó đã được bàn giao tới các QA để test trong 4-5 ngày để demo hoặc review lại.
Bây giờ, nếu như 1 QA (bạn) mà tìm ra 4 blocker hay các function lỗi, bạn sẽ phải làm việc đến đêm hoặc vào cuối tuần để đáp ứng ngày release của bạn khi có các functional testing, regression…cần được thực hiện. Đây dường như giống với các mô hình Waterfall truyền thống cái mà không phải là cách tốt nhất để làm, trong Scrum cách thông mình nhất là “Ngăn chặn các thiếu sót hơn là tìm ra các thiếu sót”.
Bởi vì các giải pháp là để kết nối dev QA và thực hiện 1 vòng test cơ bản trên các dev setup ngay khi các dev sẵn sàng với các story thậm chí trước khi test 1 release chính thức.
Các tiêu chí sau có thể được xem xét để thực hiện 1 BVT trên các dev setup đối với các user story:
    • Acceptance criteria for each user story: BVT của các user story theo các acceptance criteria.
    • Lack of confidence in Developers: Đôi khi các dev không tự tin về 1 vài thực thi và do đó họ mô tả về các thực thi đó và làm 1 BVT cho những thực thi này trên cùng dev setup.
    • Dependencies/Impact Testing: BVT của các vấn đề hay anh hưởng đến/của các module khác của các thực thi mới.
    • Unit Testing: làm 1 BVT với các dev của các unit test mà họ đã tạo, nếu cần giúp họ bằng cách bổ sung hoặc update các unit test.
Điều này sẽ giúp giảm thiểu các lỗi phát sinh, tiết kiệm thời gian cho mỗi người vì trước khi các release tới QA phần lớn các crash hoặc function bug đã được fix. Hãy nhờ ghi lại những thiếu sót này trong công cụ của bạn trước khi review các sprint và chuyển chúng tới trạng thái close.

![](https://images.viblo.asia/e921da37-c70c-4dc0-8e95-3b4dae47396a.jpg)

### 4. QA trên bảng trắng

Cá nhân tôi luôn khuyến khích team của tôi đưa các task QA lên bảng trắng của Scrum bao gồm cả các bug. Điều này giúp các Scrum master chỉ ra trạng thái của các QA của 1 user story đơn giản chỉ nhìn vào bảng.

Không có các bug trong list, các bug trong progress list, các hoạt động của QA cần làm, nói lên danh sách in progress và done của chính họ. Tôi thấy thực sự tổn thương khi có ai đó đến hỏi về tình trạng test của các story lẻ tẻ cho 1 sprint bởi vì tôi phải dành thêm thời gian để đưa ra tình trạng của tôi từ các công cụ biên dịch và show chúng hoặc viết 1 email.

Tôi đơn giản thích hướng mỗi người tới Scrum board và tự giải quyết vấn đề của mình. Thích màu sáng nổi bật cho các QA Sticky slip.

![](https://images.viblo.asia/693e39ab-397a-423f-aead-1ac1a38a9805.jpg)

### 5. Tài liệu

Đây là 1 trong những nhược điểm của Scrum do quy mô nhỏ của Sprint không có nhiều thời gian cho tài liệu và tôi chưa bao giờ thấy 1 technical writer trong 1 Scrum team. Các Scrum master/BA có thể không hoặc không phải lúc nào cũng update các tài liệu về các thông tin sản phẩm.

Vấn đề xảy ra nếu các thành viên mới join hoặc trong trường hợp xấu nhất các business rule, các function thay đổi và làm thế nào để tiếp tục theo dõi chúng bởi vì tìm kiếm thông tin của các user story Done sẽ giống như tìm kim trong đống cỏ khô.

Giải pháp là có 1 tác vụ riêng được tạo trong 1 sprint bất cứ khi nào có thể (chủ yếu trong thời gian rỗi hoặc khi khối lượng công việc ít) để bạn có thể review tài liệu và update hoặc làm cho các Scrum master hay các BA update chúng.

1 QA là người phù hợp để giúp update các tài liệu bởi vì bạn là người test, verify các user story và biết các function in và out. Tự làm nó nếu không có BA và nếu Scrum master của bạn bận.

### 6. Sprint review/Sprint Demo

Chủ yếu xảy ra khi các QA là người được chọn để đưa ra các bản demo tới các PO và Stakeholder, mà không thuyết phục được Scrum master của bạn làm như vậy. 1 QA là người phù hợp để đưa ra các demo vì họ đã test các user story in và out.

1 QA có thể demo từ quan điểm của các business bởi vì họ biết các function, các flow và các business rule. Chuẩn bị tốt cho các demo và cố gắng trả lời mỗi câu hỏi mà các PO và Stakeholder đưa ra. Điều này sẽ giúp bạn trở thành điểm kết nối cho họ khi không có các Scrum master và BA.

### 7. Hành động giống như 1 BA
Đây không phải là 1 nhiệm vụ thường xuyên và thậm chí không được mong đợi bởi 1 QA nhưng hãy cố nhận vai trò này khi có 1 cơ hội vì 1 QA là người tốt nhất để trở thành 1 BA. Ví dụ, cố suy nghĩ và hình dung nếu các flow, các function hay các business rule có thể được chỉnh sửa theo 1 cách mà có lợi cho khách hàng.

Suy nghĩ và tìm kiếm các xu hướng hiện tại trong các UI, tầm nhìn và cảm nhận của các ứng dụng và làm thế nào nó có thể được cải tiến, thân thiện hơn với người dùng… Nếu các team bi mắc kẹt ở 1 vài vấn đề, hãy tham gia và cố gắng đưa ra 1 giải pháp đơn giản và thông minh. Điều này sẽ thúc đẩy vai trò của bạn và sẽ là 1 yếu tố đóng góp cho sự phát triển nghề nghiệp của bạn.

Cơ hội đến khi thực hiện các cuộc gọi với các PO khi 1 số vấn đề được thảo luận hoặc review/demo nơi mà bạn có thể đưa ra những đề xuất.

## Kết luận

Scrum là 1 phương pháp rất khác biệt với phương pháp Waterfall thông thường, và các Scrum master là người hỗ trợ. Do đó, đừng mong đợi họ hướng dẫn cho các hoạt động của bạn.

Trong Scrum, không có ranh giới giữa bắt đầu và kết thúc đối với vai trò của 1 QA. QA cần và phải tham gia vào mọi hoạt động ngay từ khi bắt đầu đến khi kết thúc, ngay từ trước khi lập kế hoạch đến các sprint review/demo và phải tham gia vào tất cả các hoạt động.

Điều này sẽ giúp hiểu sản phẩm hoặc ứng dụng vì (như tối đã nói trước đó) không có sẵn tài liệu phù hợp khi làm việc trong Scrum. Bạn được kỳ vọng sẽ có trách nhiệm, có động lực và tính chủ động. Do đó đừng đợi bất kỳ ai đến và nói với bạn phải làm gì hay làm như thế nào.

Bạn nên tự mình thực hiện các sáng kiến riêng, giúp các team theo mọi cách có thể, duy trì mối quan hệ lành mạnh, theo dõi những điều đang diễn ra trong các team và quan trọng nhất là phải rõ ràng về các task của bạn trong 1 sprint được đưa ra.

Ở đây, không có các manager giám sát bạn hay theo dõi các hoạt động của bạn. Luôn luôn sẵn sàng giúp team của bạn 1 tay và bạn sẽ nhận được những cơ hội tốt nhất.

Tham khảo: [https://www.softwaretestinghelp.com/qa-role-in-scrum/](https://www.softwaretestinghelp.com/qa-role-in-scrum/)