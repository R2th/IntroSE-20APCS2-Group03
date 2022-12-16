Lập kế hoạch cho dự án là một trong những yếu tố then chốt trong quá trình quản lý dự án.

Cách mỗi nhóm diễn giải các mục tiêu cần đạt được là sự thể hiện trực tiếp mức độ rõ ràng trong kế hoạch của dự án. Đặc biệt khi nói đến kiểm thử dự án, việc lập kế hoạch dự án không chính xác có thể có ảnh hưởng nghiêm trọng đến việc thực hiện kiểm thử của hệ thống và về chất lượng tổng thể của toàn bộ sản phẩm.
![](https://images.viblo.asia/74d2fec3-742e-499e-94d7-2f2f07069bba.jpg)

Trong bài hướng dẫn lập kế hoạch dự án thử nghiệm này, chúng ta sẽ học : 

- Quy trình lập kế hoạch kiểm thử dự án tổng thể 
- Thảo luận về một số yếu tố lập kế hoạch cụ thể như quản lý tài nguyên, điều phối và kỹ thuật báo cáo

## Quy trình lập kế hoạch kiểm thử
Dưới đây là phần trình bày về các giai đoạn khác nhau của quá trình lập kế hoạch kiểm thử, được thảo luận một cách ngắn gọn.
### Giai đoạn # 1: Xem xét và phân tích các yêu cầu

Đây là bước đầu tiên cho bất kỳ dự án nào và đóng một vai trò rất quan trọng trong toàn bộ việc kiểm thử nghiệm dự án.

Trong khi cố gắng phân tích các yêu cầu, nhóm kiểm thử phải xác định được những mục nào cần phải kiểm thử. Những mục này chủ yếu dựa vào cách người dùng cuối sẽ sử dụng hệ thống và do đó, nhóm kiểm thử cần đo lường chi tiết và có ý nghĩa.

Các mục hoặc tính năng được xác định thường mô tả những gì phần mềm hoặc sản phẩm cụ thể dự định thực hiện; đặc trưng là các yêu cầu chức năng. Cũng có thể có một số yêu cầu phi chức năng được xác định như hiệu suất hoặc tương tác giữa các thành phần phần mềm từ đầu đến cuối.

Các yêu cầu sau đó được ghi lại và luân chuyển liên tục để review. Tất cả các nhận xét đánh giá và phản hồi phải được kết hợp để đưa tài liệu đến bước đánh giá cuối cùng.

### Giai đoạn # 2: Xác định phạm vi thử nghiệm

Xác định phạm vi thử nghiệm nói chung là một phần mở rộng của giai đoạn phân tích yêu cầu và chủ yếu được coi là một hoạt động đơn lẻ. 

Hoạt động này cũng nên hướng đến mục tiêu xác định những lĩnh vực thử nghiệm nào được thực hiện bởi những nhóm nào. Ví dụ, một nhóm dành riêng cho FVT (Function Verification Test - Kiểm thử chức năng) và SVT (System Verification Test - Kiểm tra tổng thể hệ thống) sẽ có phạm vi kiểm tra hoàn toàn khác nhau. 

Ngoài ra, nếu dự án thử nghiệm yêu cầu tự động hóa, thì tính khả thi của điều đó cũng được đánh giá ở đây. Việc phân tích phạm vi rõ ràng sẽ giúp cho đội quản lý xác định được rõ những gì đã được thử nghiệm và nhóm nào sẽ thực hiện thử nghiệm.

### Giai đoạn 3: Thiết kế chiến lược thử nghiệm dựa theo phạm vi

Nhóm kiểm thử sau khi tập hợp các yêu cầu và xác định phạm vi kiểm thử thì sẽ đưa ra một tài liệu cấp cao gọi là tài liệu chiến lược kiểm thử, xác định cách tiếp cận dự án để đạt được các mục tiêu kiểm thử.

Tài liệu chiến lược kiểm thử không bắt buộc phải được cập nhật quá thường xuyên.

Ở cấp độ cao, nội dung của tài liệu chiến lược kiểm thử sẽ có phạm vi và mục tiêu kiểm thử, cách tiếp cận, vai trò và trách nhiệm của các nhóm kiểm thử riêng lẻ, các tool để kiểm thử, các chỉ số được xác định để quản lý rủi ro và kế hoạch giảm thiểu, báo cáo và theo dõi cơ chế, v.v.

### Giai đoạn # 4: Xác định các tool bắt buộc cần có để kiểm thử và quản lý

Dựa trên việc có thể tự động hóa hay không và liệu tự động hóa có được phải là mục tiêu hay không, các tool tương ứng cần được xác định.

Ngoài ra còn phải có các tool được xác định để quản lý kiểm thử sẽ giúp tạo và giao nhiệm vụ, theo dõi tiến trình kiểm thử, xác định các rào cản và tạo báo cáo chỉ ra tiến độ. Phần này sẽ được thảo luận chi tiết hơn trong phần thứ hai của hướng dẫn.

### Giai đoạn # 5: Ước tính nguồn lực thử nghiệm

Ước tính nguồn lực chính xác có thể ngăn chặn bất kỳ sự chậm trễ nào về thời gian và tự động cho phép tái cân bằng các nguồn lực theo yêu cầu.

Các yếu tố chính ảnh hưởng đến hoạt động này là quy mô của nhóm, kỹ năng của các thành viên trong nhóm, thái độ của các thành viên và lịch trình.


### Giai đoạn # 6: Xác định thời gian kiểm thử

Ngay khi danh sách các mục cần kiểm thử đã được chia nhỏ thành các mục hợp lý, ước tính xong nguồn lực hoàn thành cho các phần công việc cụ thể, một lịch trình kiểm thử sẽ được xác định dựa trên tất cả những điều này và những người kiểm thử được chỉ định.

### Giai đoạn # 7: Xác định ý nghĩa của kế hoạch kiểm thử

Cho dù đó là một dự án mới cần được thử nghiệm hay là một sự cải tiến của hệ thống đã tồn tại trước đó, nhóm thử nghiệm phải được đào tạo không chỉ về mặt kỹ thuật mà còn về quy trình thử nghiệm đang được tuân thủ.

### Giai đoạn # 8: Xác định và chuẩn bị môi trường thử nghiệm

Xác định cơ sở hạ tầng cần thiết cần thiết để kiểm tra hệ thống, đề xuất tất cả các yêu cầu để có được phần cứng, phần mềm và phần mạng cần thiết để hỗ trợ quá trình kiểm thử.

Đây là một yếu tố quan trọng trong giai đoạn lập kế hoạch vì điều này sẽ chi phối sự ổn định của môi trường thử nghiệm, điều này sẽ ảnh hưởng trực tiếp đến các lỗi được tạo ra.

### Giai đoạn # 9: Xác định các số liệu thử nghiệm ### 

![](https://images.viblo.asia/82493efd-e202-4d62-99da-68b31883f30a.jpg)

Các số liệu kiểm thử nói chung là phương pháp định lượng để xác định chất lượng của sản phẩm hoặc hệ thống.

Khi bắt đầu bất kỳ dự án nào, các đơn vị đo lường này cần phải được đánh giá cấp độ để hỗ trợ việc xác định xem có bất kỳ cơ hội cải tiến nào hay không.

### Giai đoạn # 10: Tạo kế hoạch kiểm tra phần mềm, đánh giá và phê duyệt

Tài liệu kế hoạch kiểm thử tập trung vào kiểm thử nhiều hơn và giải thích “kiểm tra cái gì”, “khi nào kiểm tra”, “cách kiểm tra” và “ai sẽ kiểm tra”. 

Từ đầu đến giờ chúng ta đã thảo luận về các giai đoạn khác nhau trong lập kế hoạch Dự án.

Mặc dù bản thân mỗi giai đoạn có thể coi là một hướng dẫn, nhưng phần này của bài viết nhằm mục đích đưa ra các nhiệm vụ lập kế hoạch ít được nói đến hơn. Chúng ta hãy xem xét các nhiệm vụ này, tầm quan trọng của chúng và các mẹo để không ngừng ứng biến chúng nhằm quản lý kiểm thử dự án một cách hiệu quả.

## Quản lý kiểm thử dự án một cách hiệu quả
Khi các kỹ thuật lập kế hoạch hiệu quả được áp dụng, mọi rủi ro hoặc sai sót có thể dễ dàng được xác định ngay cả trước khi thử nghiệm thực sự bắt đầu.

### Chỉ định và  sắp xếp các nhiệm vụ
Điều này bắt nguồn từ Ước tính nguồn lực và định mức trong giai đoạn lập kế hoạch. Hãy ghi nhớ dựa vào kỹ năng, thái độ, lịch trình và quy mô của nhóm, dưới đây là một số gợi ý để phân bổ nhiệm vụ:

**1)** Một phương pháp rất hay là cả nhóm ngồi lại, truyền đạt mục tiêu và lý do đằng sau mỗi nhiệm vụ một cách cụ thể và rõ ràng. Hiểu rằng một đầu việc cụ thể phù hợp như thế nào với cả kế hoạch, sẽ giúp mọi người tìm ra phương pháp hoàn thành có ý nghĩa họ và sẽ cho phép họ nỗ lực hết mình về phía trước.

**2)** Chuẩn bị một đồ thị biểu thị kỹ năng của tất cả các thành viên trong nhóm và phân công nhiệm vụ dựa theo đó. Ngoài ra, hãy nhớ rằng cơ hội công bằng phải được trao cho ngay cả các thành viên cấp dưới.

Ví dụ: Nếu một nhiệm vụ lớn, nó có thể được chia cho một thành viên cấp cao và các thành viên cấp dưới. Làm điều này sẽ tạo ra tố chất lãnh đạo ở thành viên cấp cao và cũng sẽ xây dựng kiến thức cho thành viên cấp dưới. Nếu một nhiệm vụ phức tạp, hãy có 2 hoặc nhiều hơn các thành viên cấp cao đóng góp công sức vào.

**3)** Khi bộ khung ban đầu của lịch trình kiểm thử được xác định, hãy đưa nó vào trong nhóm và yêu cầu họ xem xét. Ngoài ra, hãy giải thích nguyên nhân và logic đằng sau các nhiệm vụ đó.

Trước khi hoàn thành nhiệm vụ, bạn nên kiểm tra với cá nhân đó xem họ có đồng ý với nó hay không hoặc họ có bất kỳ đề xuất nào khác không.

Thảo luận với các cá nhân về lý do tại sao họ không đồng ý với điều đó và tôn trọng ý kiến của họ. Nếu mong muốn của họ hợp lệ, hãy tìm các phương án để cân bằng lại công việc, sao cho không có rủi ro đối với nhiệm vụ được hoàn thành đúng tiến độ.

**4)** Đồng ý về chế độ báo cáo dự kiến. Cho phép các cá nhân quyết định xem họ muốn cập nhật email hay sử dụng bất kỳ chế độ quen thuộc nào khác. Hãy timf hiểu và tạo cảm giác rằng họ có thể tiếp cận bạn bất cứ lúc nào họ cảm thấy bị mắc kẹt hoặc nếu có điều gì ngăn cản họ đạt được mục tiêu.


**5)** Việc xác định các tool cần thiết để theo dõi các nhiệm vụ là điều cần thiết. Điều này sẽ giúp xem xét kịp thời các nhiệm vụ vẫn chưa hoàn thành, những công việc đang thực hiện và những công việc đã hoàn thành.**

## Mẹo quản lý nguồn lực

**1)**   Người kiểm thử luôn phải chịu áp lực cao do thời hạn dự án nghiêm ngặt, nhân viên thiếu hoặc quá nhiều yêu cầu đột ngột được thêm vào mà không có sự sắp xếp trước trong lịch trình dự án.

Trong những trường hợp như vậy, nếu bạn thấy trước rằng các mốc thời gian có thể bị cản trở, hãy thảo luận với đội quản lý và sửa đổi phạm vi kiểm thử cho phù hợp.

**2)** Điều rất quan trọng là giữ các mối liên hệ luôn sẵn sàng với người thử nghiệm trong những trường hợp như vậy. Thảo luận với người thử nghiệm về tình hình hiện tại và cho biết những thay đổi này xảy ra như thế nào.

**3)** Sẽ luôn có các khiếm khuyết, các vấn đề kỹ thuật, các yêu cầu cần được giải quyết có ảnh hưởng trực tiếp đến tình trạng dự án. Luôn cố gắng giảm khoảng cách giữa nhóm phát triển và nhóm kiểm tra để các vấn đề liên quan đến lỗi hoặc khác các yêu cầu về kỹ thuật được sắp xếp nhanh chóng.

Truyền cho mỗi người thử nghiệm cảm giác tự chủ, để họ có thể tự tin thúc đẩy và dẫn dắt các cuộc thảo luận nhằm giải quyết các vấn đề hoặc yêu cầu kỹ thuật với ban quản lý hoặc nhà phát triển tại bất kỳ thời điểm nào.

**4)** Các lịch trình luôn có khả năng xảy ra sự phức tạp,  vì vậy đừng đặt kỳ vọng cho ban quản lý về việc luôn đòi hỏi được nhiều từ các thành viên đội kiểm thử.

## Kiểm tra theo dõi / công cụ được sử dụng để báo cáo
Ban quản lý thường phản ứng bằng cách nhướng mày khi tình trạng thực tế được thông báo tới họ. Dưới đây là một số mẹo để thu gọn lông mày của họ xuống một mức độ hợp lý.

**1)** Người kiểm thử phải đối mặt với rất nhiều sự không ổn định trong khi kiểm tra và nhiều lần xảy ra trường hợp có nhiều người yêu cầu họ phải tiến bộ lên các cấp độ khác nhau. Họ thấy rằng việc thực hiện các tác vụ quản trị này là vô cùng mệt mỏi và tốn kém, thì bạn phải tìm ra một cách ít rườm rà hơn để đẩy thúc đẩy sự tiến bộ của họ.

**2)** Thường xuyên tổ chức các cuộc họp checkpoint / scrum với nhóm kiểm thử và phân tích xem mọi thứ có diễn ra suôn sẻ hay không. Liên hệ với họ để xem họ đã đi được đến giai đoạn nào, những gì đang diễn ra, điều gì cần phải làm và điều gì đang kìm hãm họ. Trong trường hợp ai đó cảm thấy quá tải, hãy hành động để cân bằng lại. 

**3)** Tổ chức các cuộc họp thường xuyên với ban quản lý và làm cho họ nhận ra rằng người quản lý là đầu mối liên hệ cho bất kỳ câu hỏi nào liên quan đến trạng thái và người kiểm tra cá nhân cũng có thể được trình bày khi được yêu cầu.

Nếu người kiểm thử đã đưa ra một lỗi quan trọng, hãy giới thiệu và đánh giá cao lỗi đó trước team. Điều này sẽ thúc đẩy mọi người nâng cao ý kiến cá nhân của họ.

**4)** Thậm chí không cần phải đề cập một cách chính xác và minh bạch nhất về tình trạng báo cáo,  là do có các công cụ được xác định để quản lý / báo cáo thử nghiệm.

Có sẵn các công cụ toàn diện giúp lập kế hoạch kiểm tra toàn bộ - như Microsoft Project Planner hoặc MS project 2013.
Công cụ này giúp xác định dự án trong các giai đoạn, ý chính của các nhiệm vụ được yêu cầu, cùng với bảng phân tích các nhiệm vụ chính và phụ được phân bổ cho mỗi giai đoạn, ước tính nguồn lực, xác định sự phụ thuộc giữa các nhiệm vụ và phân bổ nguồn lực với việc theo dõi và quản lý hiệu quả một dự án.

## Kết luận 
Mặc dù mỗi giai đoạn trong quá trình lập kế hoạch có thể được thảo luận dài, nhưng tài liệu này sẽ giúp người kiểm tra hiểu vai trò của họ phù hợp với quy trình tổng thể này như thế nào, cơ sở hàng ngày để thực hiện công việc của họ một cách hiệu quả.

Hy vọng bài viết này đưa ra những khía cạnh nhất định của việc lập kế hoạch dự án một cách rõ ràng.
Nguồn : https://www.softwaretestinghelp.com/test-project-planning/