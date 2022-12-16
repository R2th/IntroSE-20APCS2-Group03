Không như mọi khi, bài viết này sẽ gồm các kiến thức hàn lâm dành cho DevOps/SRE trong doanh nghiệp và kiến thức này cần phải nắm rất chắc để có thể làm việc mang hiệu quả cho tổ chức và người dùng.

Nếu có một điểm chung mà mọi sản phẩm công nghệ đều phải có, chính là: Người dùng (User). 

Cho dù là Google, phục vụ một tỷ người dùng hoạt động hàng tháng tương tác miễn phí với dịch vụ hay Airbn, với 200 triệu người dùng kinh doanh, giao dịch, thì việc xây dựng một sản phẩm công nghệ đều là việc phục vụ mọi người.

Và trong thế giới luôn phát triển ngày nay, kỳ vọng của mọi người đối với các dịch vụ miễn phí và trả phí đều rất cao. Tốc độ, thời gian phục vụ, UX hoản hảo. Mọi thứ đều phải đáp ứng tiêu chuẩn cao.

Với nhu cầu cao như vậy, hệ thống của bạn sẽ phải chứng minh được với người dùng: Thời gian ngừng phục vụ (Downtime) bao lâu một lần? Nhóm của bạn sẽ phản hồi nhanh như thế nào nếu hệ thống gặp sự cố? Bạn đang cam kết gì về tốc độ và trải nghiệm? Vì vậy bạn cần SLA, SLO và SLI. 

![](https://images.viblo.asia/616e5f9a-4037-45a2-9fcd-b0fdb4b6a7aa.jpg)

### SLA: Thỏa thuận cấp độ dịch vụ
#### SLA là gì?
SLA (Service-Level Agreement) là thỏa thuận giữa nhà cung cấp và người dùng về các chỉ số có thể đo lường như thời gian phục vụ, khả năng đáp ứng và trách nhiệm.

Những thỏa thuận này thường được soạn thảo bởi các nhóm pháp lý và kinh doanh và chúng thể hiện những lời cam kết mà bạn đang thực hiện với người dùng và hậu quả nếu bạn không thực hiện những lời cam kết đó. Thông thường, hình phạt là tài chính hoặc giấy phép.

#### Thách thức với SLA
SLA rất khó đo lường và báo cáo. Những thỏa thuận này, thường được viết bởi những người không có kinh nghiệm về công nghệ, thường đưa ra những lời cam kết mà các nhóm khó đo lường, không phải lúc nào cũng phù hợp với các ưu tiên kinh doanh hiện tại và không ngừng phát triển và không tính đến sắc thái. 

Ví dụ: SLA có thể cam kết rằng các nhóm sẽ giải quyết các vấn đề với Sản phẩm X trong vòng 24 giờ. Nhưng SLA này không giải thích điều gì sẽ xảy ra nếu người dùng mất 24 giờ để gửi câu trả lời hoặc ảnh chụp màn hình để giúp nhóm của bạn chẩn đoán, xử lý sự cố. Nó có nghĩa là trong 24 giờ, nhóm đã bị chậm lại bởi người dùng. Một cách tốt hơn là bắt đầu tính giờ từ sau khi người dùng cung cấp đủ thông tin. SLA cần phải trả lời những câu hỏi này, nhưng họ thường không làm được như vậy, nên một thực tế đã tạo ra rất nhiều khó khăn trong việc phối hợp từ các nhóm với người quản lý.

Đối với nhiều chuyên gia, câu trả lời cho thách thức này trước hết là nhóm công nghệ nên tham gia vào việc tạo ra SLA. Càng nhiều kỹ sư và DevOps hợp tác phát triển SLA giải quyết các tình huống trong thế giới thực, thì càng có nhiều SLA thực tế hơn, chẳng hạn như ví dụ trên.

#### Ai cần SLA?
SLA là thỏa thuận giữa nhà cung cấp và người dùng trả phí sử dụng dịch vụ. Các công ty cung cấp dịch vụ miễn phí cho người dùng có thể không muốn hoặc cần SLA cho những người dùng miễn phí đó.

### SLO: Mục tiêu cấp độ dịch vụ
#### SLO là gì?
SLO (Service-Level Objective) là một phần trong SLA về một số liệu cụ thể như thời gian phục vụ hoặc thời gian phản hồi. Vì vậy, nếu SLA là thỏa thuận chính thức giữa bạn và người dùng của bạn, SLO là những lời cam kết cá nhân mà bạn đang thực hiện với người dùng đó. SLO là những mục tiêu đo lường của người dùng và nhóm kỹ sư, DevOps đặt ra để biết được mức độ phục vụ của sản phẩm công nghệ.

#### Những thách thức của SLOs
SLO ít bị ghét hơn SLA, nhưng chúng có thể tạo ra nhiều vấn đề nếu chúng được định nghĩa mơ hồ, quá phức tạp hoặc không thể đo lường được. Chìa khóa để SLOs không khiến các kỹ sư gặp khó khăn là sự đơn giản và rõ ràng. Chỉ các số liệu quan trọng nhất mới được đưa vào SLO, các mục tiêu phải được viết bằng ngôn ngữ đơn giản và như với SLA, chúng phải luôn tính đến các vấn đề như sự chậm chạp, không phối hợp từ phía người dùng.

#### Ai cần SLO?
Trong trường hợp SLA chỉ có liên quan trong trường hợp người dùng trả tiền, SLO có thể hữu ích cho cả tài khoản miễn phí, cũng như người dùng nội bộ và bên ngoài. 

Với các hệ thống nội bộ, chẳng hạn như CRM, kho dữ liệu người dùng và mạng nội bộ. Và việc có SLO cho các hệ thống nội bộ đó là một phần quan trọng không chỉ để đáp ứng các mục tiêu kinh doanh mà còn cho phép các nhóm nội bộ đáp ứng được các mục tiêu của người dùng trong chính tổ chức.

### SLI: Chỉ báo cấp độ dịch vụ
#### SLI là gì?
SLI (Service-Level Indicator) đo lường sự tuân thủ với SLO (Service-Level Objective). Vì vậy, ví dụ: nếu SLA của bạn nói rằng hệ thống của bạn sẽ sẵn sàng 99,95% thời gian, SLO của bạn có khả năng là 99,95% thời gian Online và SLI của bạn là phép đo thực tế về thời gian Online của sản phẩm. Có thể là 99,96%. Có thể là 99,99%. Để tuân thủ SLA của bạn, SLI sẽ cần phải đáp ứng hoặc vượt quá những lời cam kết được đưa ra trong tài liệu đó.
Nếu SLI nằm dưới SLO, nghĩa là hệ thống cần cải thiện hơn nữa. Nếu muốn biết dịch vụ đáng tin cậy đến mức nào, bạn cần có khả năng đo lường các thông số đã cam kết trong SLO.

#### Những thách thức của SLIs
Đối với SLO, thách thức của SLI là giữ cho chúng đơn giản, chọn đúng số liệu để theo dõi và không làm phức tạp hóa công việc của kỹ sư bằng cách theo dõi quá nhiều số liệu không thực sự quan trọng đối với người dùng.

#### Tạo một kế hoạch khắc phục lỗi "nghiêm trọng" một cách chi tiết.
Bạn sẽ làm gì khi Downtime xảy ra? Nếu bạn chưa biết câu trả lời cho câu hỏi đó, câu trả lời mặc định sẽ là "Lãng phí thời gian quý báu để tìm ra những việc cần làm ngay!".

Kế hoạch xử lý sự cố của bạn càng chuẩn bị tốt, nhóm vận hành của bạn sẽ xử lý sự cố nhanh hơn và hiệu quả hơn. Đó là lý do tại sao bước đầu tiên của bất kỳ công việc quản lý sự cố nào đều phải là lập quy trình và lập kế hoạch.

#### Ai cần SLI?
Bất kỳ tổ chức nào đo lường hiệu suất của họ với SLO đều cần SLI để thực hiện các phép đo đó. Bạn không thể thực sự có SLO nếu không có SLI.

* SLAs: Lời cam kết với người dùng.  
* SLOs: Mục tiêu nội bộ nhóm vận hành, kỹ sư.  
* SLIs: Chúng tôi đã làm như thế nào?

### Các phương pháp hay nhất về SLA, SLO và SLI

#### Tạo SLA theo mong đợi của người dùng/đối tác.
Mọi phần trong thỏa thuận với người dùng của bạn nên được soạn thảo xoay quanh những gì quan trọng đối với người dùng. Mặt khác, một sự cố có thể có phải giải quyết 10 việc khác nhau. Nhưng điều đó không quan trọng, theo quan điểm của người dùng, tất cả những gì quan trọng là hệ thống hoạt động như mong đợi. 

SLA và SLO của bạn phải phản ánh thực tế. Đừng phức tạp hóa mọi thứ bằng cách đi sâu đến mức chi tiết và đưa ra lời cam kết riêng cho từng việc trong số 10 việc đó. Giữ lời cam kết của bạn ở chức năng cấp cao, mà người dùng đang trực tiếp dùng. Điều này sẽ giúp người dùng vui hơn và dễ hiểu hơn, đơn giản hóa công việc của các kỹ sư chịu trách nhiệm thực hiện các lời cam kết SLA của bạn.

#### Sử dụng ngôn ngữ đơn giản trong SLA
Không phải lúc nào người dùng cũng yêu cầu làm rõ, vì vậy nếu ngôn ngữ trong SLA của bạn phức tạp, có thể bạn đang tự tạo ra một số hiểu lầm cho người dùng. Ngôn ngữ của bạn càng đơn giản, thì càng ít xảy ra hiểu lầm với người dùng trong tương lai.

#### Với SLO, ít hơn là nhiều
Không phải mọi chỉ số đều quan trọng đối với người dùng, có nghĩa là không phải mọi chỉ số đều phải đưa vào SLO. Cam kết thực hiện càng ít SLO càng tốt và tập trung vào những SLO quan trọng nhất đối với người dùng. 

#### Không phải mọi chỉ số có thể theo dõi đều phải là SLI
Tương tự, việc theo dõi hiệu suất trên 10 chỉ số cho mỗi 10 SLO có thể trở nên rất khó. Thay vào đó, hãy chọn một cách khéo léo những chỉ số nào thực sự quan trọng đối với SLO của bạn và dồn sức vào việc theo dõi những chỉ số đó một cách sát sao.

#### Thêm các yếu tố nằm ngoài tầm kiểm soát của nhóm phát triển
Điều gì xảy ra khi người dùng là người làm tốn thời gian giải quyết ? Nếu bạn không hiểu rõ điều này trong SLA của mình, nhóm của bạn có thể phải tuân theo tiêu chuẩn bất khả thi là giải quyết các vấn đề của người dùng mà không có sự hợp tác, phối hợp của người dùng.

#### Đừng cam kết khi biết không thể làm được
Chỉ vì nhóm của bạn có thể duy trì 99,99% thời gian Online không có nghĩa là 99,99% phải là số trong SLO của bạn. Luôn luôn tốt hơn nếu cam kết dưới mức có thể đạt được và làm được những điều tốt hơn mức đó. Điều này đặc biệt đúng với các sản phẩm muốn đổi mới nhanh và liên tục.

### Những cam kết này ảnh hưởng đến SREs/DevOps như thế nào?
![](https://images.viblo.asia/9ef481f4-5b85-4522-90e1-abdab6d310d1.png)

Đối với những người mô hình làm việc của Google và sử dụng nhóm Kỹ thuật SRE để thu nhỏ khoảng cách giữa phát triển và vận hành, SLA, SLO và SLI là nền tảng để sản phẩm thành công. SLA giúp các nhóm thiết lập ranh giới. SLO giúp ưu tiên công việc. Và SLI cho SRE biết khi nào họ cần làm gì.