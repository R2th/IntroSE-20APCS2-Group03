Thường thì khi bạn làm việc trong 1 team test lớn, bạn có 1 sản phẩm quy mô tương đương để test và thách thức không kém phần phức tạp mà bạn phải đối diện.

Khó khăn gặp phải đó là duy trì các tiêu chuẩn chất lượng, chia sẻ kiến thức và sự phân cấp chuyên môn.

Hãy để tôi giải thích sâu hơn vấn đề này và cũng như các giải pháp có thể áp dụng.

Tuy nhiên, tôi muốn bạn hiểu rằng mặc dù hầu hết những suy nghĩ của tôi ở đây đến từ kinh nghiệm quản lý của tôi, việc thực hiện các phương pháp mà tôi sẽ giải thích sẽ giúp ích cho cả senior và các junior của team và các team ở bất cứ quy mô nào.

## 5 vấn đề nghiêm trọng với các nhóm QC lớn cùng với các biện pháp khắc phục

### 1. Vấn đề 1

Với các team test lớn: Duy trì chất lượng tốt đều đặn theo thời gian

![](https://images.viblo.asia/d75ba1be-6389-4672-8dd6-544fce577c58.jpg)


**Vấn đề**: có bao nhiêu người trong chúng ta đã có kinh nghiệm rằng việc duy trì chất lượng tốt trong 1 sản phẩm trở nên khá khó khăn khi quy mô team đã tăng so với trước?

**Biện pháp khắc phục**: Lý do của việc này là, tất cả chúng ta có các kỹ năng khác nhau, nắm giữ điểm mạnh, yếu trong các lĩnh vực khác nhau, năng khiếu khác nhau, phong cách hoặc cách tiếp cận khác nhau để test và dĩ nhiên là các kinh nghiệm cũng khác nhau.

Ngăn chặn lối suy nghĩ của 1 vài người theo 1 cách riêng và chuyển hướng nó tới 1 vài thứ khác là không nên trừ khi nó thực sự cần thiết. Vì thế, cần phải có những sự nỗ lực thật lớn từ các mentor/lead những người sẽ chia sẻ, mang đến 1 mối quan hệ tốt với từng tester.

Quay lại với vấn đề thực sự - khi được cung cấp 1 function cụ thể để test không phải tất cả member team của bạn có thể phát hiện ra tất cả các thiếu sót. Số lượng, chất lượng của các thiết sót có thể phát hiện được và thời gian mà chúng bị phát hiện cũng sẽ khác nhau.

1 vài hoặc toàn bộ các kết quả dưới đây có thể gặp trong các trường hợp như vậy:

* Gặp các issue trong các module đã release
* Không thể nghĩ ra tất cả các kịch bản khác biệt trong khi xây dựng test case hoặc các kịch bản test
* Cố gắng 1 cách cực đoan để bắt các case trong khi đang bỏ qua các case khác
* Có ít  các member tự tin với công việc của họ trong team
* Lặp lại các chu kỳ test để tăng sự tự tin bị mất
    
### 2. Vấn đề 2 

Với team lớn: Tập trung kiến thức và chuyên môn

**Vấn đề**: 1 vấn đề khác mà các manager/lead sẽ quan tâm hơn là việc tập trung kiến thức hay chuyên môn trên 1 module hoặc test type cụ thể cho 1 vài member trong team.

Ví dụ: John, Johny, Janardan cùng nhau tạo thành 1 team. John thông minh trong security test, Johny có kiến thức sâu trong workflow module, Janardan là người không thể thay thế khi nói tới Performance test và payment module.

Có các chuyên gia module/type trong team giúp các manager trong thời gian ngắn họ có thể dễ dáng gán new work tới pro và sau đó các manager có thể thư giãn vì họ biết họ sẽ nhận được kết quả tốt nhất có thể.

Tuy nhiên, về lâu dài, việc này tăng sự khó khăn để quản lý sự phụ thuộc. Sự không sẵn có của tài nguyên “key” có thể tạo ra 1 vấn đề và khiến việc release bị dừng lại. Sự không sẵn có có thể do nhiều lý do ví dụ nhưng việc nghỉ làm không có kế hoạch, bệnh tật, thay đổi nội bộ, từ chức….

Chúng ta dã nói về chuyên môn, về những kiến thức gì đó đang chia sẻ?

Nếu chúng ta lấy ví dụ của chúng ta phần trên, thì Johny sẽ có thể giúp đỡ nếu anh ấy nhận được phần việc về product của Jarnadan đang làm không? Kiến thức của John có thể giúp workflow module của Jarnadan không? Điều đó có giúp họ hiểu được nhưng phát triển mới trong sản phẩm và suy đoán ảnh hưởng của họ ở các phần của họ và những sự chuyển giao hiện tại không? Toàn bộ kiến thức về product có giúp bản thân họ khi làm việc với các task trong tương lai không?

Tôi nghe thấy “YES” rất to của bạn.

Biện pháp khắc phục: Hiện giờ chúng ta đã nói về các problem, hãy để tôi nói về cái cách mà team của tôi hoạt động và khắc phục tất cả các problem này và nhiều vấn đề khác.

Chúng tôi đi theo 2 nguyên tắc mà tôi chắc chắn các bạn đã nghe trước đây:

* People over Processes.
* Collaboration over Documentation.
    
Đây là các work flow trong các case của chúng tôi:

1) Thu thập các yêu cầu: Story/feature XYZ luôn sẵn sang để thảo luận từ phía các BA.
2) Thảo luận về user story: Các requirement mới, nếu phức tạp, sẽ được thảo luận trước ở cấp độ lead, trong đó Business analyst, dev lead và test lead làm cho các user story sẵn sàng để grooming (thảo luận các requirement với team). Quá trình tư duy sau việc này là để giải quyết những nghi ngờ/khoảng trống trong các story trước đó và nêu chi tiết về chúng để tiết kiệm thời gian của team.
3) Grooming session: Đây là 1 session mà chúng ta gọi là Grooming/Hole punching session trong đó Business Analyst điều khiển các team qua toàn bộ các requirement function. Có khoảng 90% sự rõ ràng cho 1 tester người mà đang làm đến việc này (hãy gọi họ là Story owner từ bây giờ).
Khi tôi nói rõ ràng, hầu hết các test case đã hình thành trong đầu họ. Tôi đang để ra 5-10% các case mà vẫn unknown.
4) Brainsorming session*: Post grooming, dev và các team test gặp để thảo luận các yêu cầu kỹ thuật cao hơn function trong đó nhiều thứ giống như tác động đến các feature hiện có, cần vá dữ liệu hiện có, các hidden scenario và effort đã được thảo luận.
Yếu tố chính ở đây là tòa n bộ các member từ team test cố gắng tham dự session này để đóng góp vào danh sách các scenario của Story owner. Điều này tất nhiên cũng giúp kiến thức của riêng họ. Vì vậy, chúng tôi nhận được nhiều tư duy test ở đây hơn là chỉ một.

Giống như trong ví dụ của chúng tôi, ngay cả khi John sở hữu story đặc biệt này, anh ta cũng sẽ có Johny và Janardan cùng suy nghĩ và giúp đỡ anh ta.

Story owner sau đó ghép nối tất cả các kịch bản được thảo luận vào danh sách hiện có từ grooming session. Lý tưởng nhất là hầu hết mọi thứ được đề cập trong session này ngoại trừ một vài bug hoàn toàn ngẫu nhiên và chỉ có thể được phát hiện thông qua test thăm dò tốt.
5) Chuyển đổi các test case: Story owner sau đó bắt đầu chuyển đổi yêu cầu và kịch bản mà anh ta thu thập được từ chuỗi trước đó thành các test case. Đồng thời, dev bắt đầu viết code cho các tính năng mới sau khi thiết kế. Sau khi test case viết xong ,Story owner chia sẻ chúng với đối tác Phát triển của mình để họ xem xét và tham khảo.

6) Test và khám phá các test case: Một khi story được đánh dấu là ‘Hoàn thành’ từ team dev, Story owner hoàn thành test dựa trên các test case được viết nhưng theo cách khám phá, trong đó họ cũng test nhiều thứ khác. Khi đạt được mức chất lượng mong muốn (quyết định về phạm vi test, số lượng bug mở và độ tin cậy của story owner), story được đánh dấu là QC Done.
7) Overlapping Session *: Khi story là QC Done, Story owner sẽ tiến hành một overview session nhỏ (trước khi release được phát hành) cho tính năng mới mà họ đã giải thích các function và hoàn thành test. Chúng tôi gọi đây là overlapping session. Tham dự ở đây là bắt buộc đối với tất cả những tester không giống như Brainstorming session.

Vì vậy, ít nhất là ở cấp độ cao, mọi người đều biết những gì đang được phát hành, họ cũng có thể nghĩ nếu vẫn còn bất kỳ tác động nào của story này đến việc test story của họ và ngược lại. Họ thậm chí có thể hỏi story owner một số câu hỏi.

8) Overlapping  testing round*: Bước quan trọng nhưng là bước tùy chọn (vì phụ thuộc vào tải có sẵn với team) mà chúng tôi thực hiện Overlapping  testing round bởi một người khác không phải story owner trong thời gian không quá một giờ.

Các tester của overlapping chỉ nghĩ về các trường hợp tiêu cực cực đoan giả sử các điều hiển nhiên đã được test. Điều này giống như một ý kiến thứ hai trước khi release được phát hành.

Có thể bạn đã thiết lập các quy trình trong nhóm của mình, bao gồm hầu hết hoặc tất cả các quy trình trên. Trong trường hợp của chúng tôi, mỗi bước đều quan trọng nhưng sự khác biệt thực sự so với phần còn lại sẽ là ba bước được đánh dấu *, tạo ra sự khác biệt tích cực.

### 4. Vấn đề 4

Với team lớn: Làm cho công việc vui vẻ và thú vị

![](https://images.viblo.asia/f75d85aa-f368-4106-9bd9-55f206537e84.jpg)

**Vấn đề**: Bạn có nghĩ rằng tôi chỉ đơn giản làm cho nhóm của tôi làm việc mà không có yếu tố vui vẻ hay cải tiến cá nhân nào không? Đó sẽ là tội ác cho bất kỳ nhà lãnh đạo giỏi nào. Nếu bạn ném chỉ công việc tới những con người của bạn thì cuối cùng họ sẽ kiệt sức, buồn chán và thậm chí là thất vọng.

**Biện pháp khắc phục**: Chúng tôi có môi trường rất thân thiện không chỉ trong nhóm của chúng tôi mà trong toàn bộ tổ chức. Nếu tôi nói về nhóm của mình, chúng tôi giống bạn bè hơn và không giống như người quản lý và reporter.

Đây là những gì chúng tôi làm thêm mà đáng được đề cập.

Mỗi thứ tư, tất cả chúng tôi (tất cả những tester từ tất cả các product của tôi) sẽ gặp nhau trong một vài giờ. Chúng tôi gọi đó là Q&A session.

Đây là những gì chúng tôi làm ở đó:

* Bất cứ ai cũng có thể đặt câu hỏi về bất cứ điều gì và không chỉ là việc test và những người khác có thể trả lời.
* Bất cứ ai cũng có thể chia sẻ một ý tưởng, cải tiến quy trình, thành tựu của riêng họ với tất cả. Chỉ cần bất cứ điều gì cũng có thể được chia sẻ.
* Mọi người kiến nghị mang đến một cái gì đó mới trong thế giới test mà họ nghĩ rằng những người khác có thể không biết. Bằng cách đó, chúng tôi nâng cao kiến thức cơ bản của chúng tôi.
* Điều này vẫn giống như công việc? Vâng, chúng tôi click vào Pics, chúng tôi chơi nhiều trò chơi mới. Và hơn bất cứ điều gì khác, chúng tôi chơi MAFIA :). Chúng tôi chia sẻ tất cả trên Trello Board của chúng tôi (Một chủ đề khác để nói chuyện vào một ngày nào đó) hoặc Slack Channel.

### 5. Vấn đề 5

Với team lớn: Đánh giá cao và tạo động lực

**Vấn đề**: Bạn có thể phân loại từng thành viên trong nhóm của mình vào - bucket- Rockstar, Performer hoặc under Performer.

Vấn đề thực sự xảy ra khi bạn có nhiều Rockstar và Performer nhưng không có under Performer. Bởi vì, nó đột nhiên làm cho Performer của bạn trông giống như under Performer khi so sánh với Rockstar.

**Biện pháp khắc phục**: Biện pháp khắc phục bắt đầu bằng việc chấp nhận thực tế là bạn không thể có tất cả các Rockstar trong đội của mình. Mỗi người đều có tài năng thiên bẩm khác nhau, tốc độ học tập khác nhau và phong cách làm việc khác nhau. Là một nhà lãnh đạo, bạn phải đánh giá cao nó.

Bạn có thể giúp Performer trở thành Rockstar nhưng không đơn độc. Bạn sẽ phải tìm các leader (không nhất thiết phải được chỉ định mà là ai đó ngẫu nhiên) trong nhóm của bạn trước tiên và kéo họ vào trách nhiệm này.

Là người quản lý / lãnh đạo, bạn không thể dành đủ thời gian cho mọi người trong nhóm của mình. Bạn phải ủy thác trách nhiệm cho leader Rockstar phù hợp sau khi khiến họ tin vào tầm nhìn của bạn.

Tôi đã làm điều đó và tôi có thể tự hào nói rằng mọi leader trong nhóm của tôi sẽ nhận được hơn 4,5 trên 5 trong số phản hồi của Reportee được báo cáo hàng năm.

Bạn có thể kết nối với số người tối đa mà bạn có thể, nhưng bạn phải liên tục nói chuyện với các leader, hướng dẫn họ, đánh giá cao những nỗ lực của họ và chia sẻ tầm nhìn. Họ sẽ làm phần còn lại của công việc sau đó bạn có thể chỉ cần theo dõi.

Tất nhiên, viết email đánh giá cao, nói chuyện động viên, vỗ tay công khai nhóm của bạn là điều bạn sẽ phải tiếp tục làm luôn.

Tham khảo: [https://www.softwaretestinghelp.com/problems-with-large-qa-testing-teams-and-remedies/](https://www.softwaretestinghelp.com/problems-with-large-qa-testing-teams-and-remedies/)