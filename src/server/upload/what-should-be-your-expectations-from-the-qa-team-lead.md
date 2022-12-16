Khi thảo luận về một chủ đề nào đó, đặc biệt là thảo luận về chủ đề dựa trên quy trình  (Ví dụ: Tạo ma trận (traceability matrix) hoặc review tài liệu kiểm thử, v.v.) , câu hỏi ngay lập tức có thể nhận được là: “Ai đảm nhận việc này? QA leader hay là thành viên trong nhóm ”

Đây là một ví dụ rõ ràng cho thấy những người mới bắt đầu thường sẽ gặp khó khăn trong việc nắm được phạm vi công việc, vai trò và trách nhiệm. Họ chỉ có một ý hiểu chung chung về các điểm này và thường tìm cách xác nhận xem sự hiểu biết của họ có chính xác hay không. Và nếu bạn nghĩ rằng đây chỉ là vấn đề của những người mới- beginners thì bạn đã nhầm. Khá nhiều managers /leaders / coordinators cũng nhận thức rằng định nghĩa về vai trò / phân công công việc có thể trở thành một vấn đề - issue, lý do là họ thiếu hiểu biết rõ ràng về những điểm này - bản thân họ phải làm gì và phân công công việc gì cho ai thường là một tình huống khó xử đối với các QA lead.

![](https://images.viblo.asia/4968449d-9d37-4777-9830-f17c3ea6019b.jpg)

Cũng giống như một số bạn có thể nghĩ và tôi cũng tự vấn rằng, “Nếu họ không biết phải bắt đầu như thế nào thì sẽ phải làm gì? nếu họ không tìm ra cách thức, hướng giải quyết cho 1 vấn đề nào đó thì phải làm thế nào? " Có, họ vẫn sẽ tìm ra giải pháp thôi, nhưng sẽ tốn rất nhiều thời gian, hiệu quả và chất lượng từ đó bị ảnh hưởng trong quá trình này.

Để tránh tất cả những điều đó, chúng tôi đã vạch ra các nhiệm vụ chính (major tasks) là một phần của vòng đời sản xuất phần mềm (STLC) và các trách nhiệm tương ứng với từng vị trí ,nhiệm vụ đó dưới dạng bảng dưới đây:

### Team lead’s responsibilities for different QA activities:
| **STLC activity** | **QA Team lead Tasks** | **Team member tasks** |
| -------- | -------- | -------- |
| Project Kickoff- Start    | Tạo và đưa ra các điểm nổi bật cần chú ý của dự án cho QA team và các bên liên quan khác    | Hỗ trợ và báo cáo cho leader biết về bất kỳ cải tiến hoặc mâu thuẫn nào     |
| Test Planning   | Tạo, duy trì, quản lý và thực thi test plan, phân tích và quản lý rủi ro    | Cung cấp input cho tài liệu test plan, ví dụ: phạm vi, giả định, rủi ro, các mốc quan trọng và bất kỳ thông tin nào khác có thể input được|
| Requirement gathering   | Phân chia công việc dựa trên các modules và lựa chọn các members làm đầu mối liên lạc cho mỗi module, chốt deadline, để team nhận thức được kết quả mong đợi (expected outcome) ví dụ: danh sách các yêu cầu cô đọng, hiểu tài liệu,...    |  Phụ trách module của cá nhân mình, thu thập các yêu cầu thông qua tài liệu yêu cầu nghiệp vụ (BRD)/ tài liệu yêu cầu chức năng (FRD) hoặc các buổi meetings tổng hợp, trình bày/ văn bản hóa các yêu cầu theo đúng định dạng format trong thời gian cho phép, đưa ra các gợi ý hoặc các quan điểm thay thế trong trường hợp định dạng không phù hợp hoặc không hoàn thành được theo đúng time lines  |
| Test scenario creation   | Phân bổ công việc, giải quyết thắc mắc, hoàn thiện template, đặt deadline, tham gia và đóng góp vào việc tạo kịch bản kiểm thử   | Tạo các kịch bản kiểm thử cho module mà mình phụ trách với timelines đã đặt và theo định dạng đã được đồng thuận trước đó. Tham vấn giải pháp từ leader hoặc từ team kỹ thuật liên quan trong trường hợp có câu hỏi    |
| Test case documentation   | Phân bổ công việc, giải quyết thắc mắc, hoàn thiện template, viết test cases    |Tạo test cases và data phù hợp  |
| Traceability Matrix creation   | Tạo template và chia sẻ hướng dẫn về cách tạo ma trận trong trường hợp cần thiết (các màn search,...), làm việc với team và đóng góp ý kiến     | Đóng góp vào việc tạo ma trận cho các modules của mình     |
| Test documentation review- internal    | Đặt ra rules dựa trên những quan điểm cơ bản, đặt time lines và trách nhiệm liên quan, là một trong những cộng sự và tham gia vào quá trình review    | Thực hiện đánh giá dựa trên các quy tắc đã đặt ra và đưa ra các nhận xét khách quan về công việc của các members khác cùng team    |
| Test documentation review- external    | Thông báo cho BA, team dev rằng tài liệu kiểm thử (test cases) đã sẵn sàng để review và gửi cho các bên liên quan     | Chờ kết quả review và sẵn sàng update theo những đề xuất nhận được trong quá trình review  |
| Test readiness review    | Tạo review checklist, trình bày bản kết quả review cho PM, kiểm tra nhanh những điểm cơ bản cốt lõi, smoke test và xác định xem đã sẵn sàng để bắt đầu test hay chưa?    | Chờ thông báo bắt đầu test, thực hiện smoke test và sanity test cho những modules của mình     |
| Test execution    | Đặt nguyên tắc thực hiện test sau khi nắm được chất lượng đầu vào của từng members, thực hiện test, giúp những người mới nắm bắt được ứng dụng ở thời điểm hiện tại, báo cáo lỗi, review các lỗi được báo cáo bởi members để chắc chắn rằng các lỗi là hợp lệ, không trùng lặp và các phần mô tả phải hoàn chỉnh, báo cáo lên cấp trên bất kỳ khó khăn nào và đưa ra quyết định về cách xử lý các tình huống đó   | Thực thi test cases, đánh kết quả status và báo cáo tiến độ, thông báo ngay lập tức các khó khăn hoặc các vấn đề ảnh hưởng đến testing time lines, báo cáo lỗi đầy đủ, rõ ràng   |
| Reporting    | Gửi báo cáo hàng ngày đến các bên liên quan, đại điện cho team QA ở  bất kỳ cuộc họp nào, thu thập số liệu dựa vào thống kê kiểm thử  | Hỗ trợ team lead tất cả các tasks đang thực hiện  |
| Test closure    | Đánh giá các tiêu chí xem quá trình kiểm thử đã hoàn thành hay chưa, chia sẻ kết quả đánh giá đó, nếu tất cả các tiêu chí liên quan đều được đáp ứng, lập báo cáo kết thúc kiểm thử và gửi cho các bên liên quan, những người có thẩm quyền cho phép QA dừng quá trình kiểm thử  và cung cấp cho QA danh sách các vấn đề còn tồn đọng (known issues), thu thập thông tin chi tiết về tổng thể dự án (điểm thành công, điểm cần cải thiện, các bài học ghi nhận, các hướng dẫn chuẩn đã được thực thi,...) và trình bày chúng trong buổi retrospection hoặc ghi lại trong tài liệu dự án     | Hỗ trợ team lead về các task liên quan trong quá trình kết thúc kiểm thử    |
| UAT   | Thu thập tiêu chí chấp nhận (acceptance criteria) từ người dùng để hiểu về các thông số và đánh giá của họ, chia sẻ các tiêu chí này với team và làm việc với team để thu thập hoặc tạo UAT test cases. Có thể hướng dẫn người dùng sử dụng hệ thống nếu cần thiết. Trong quá trình UAT, luôn sẵn sàng hỗ trợ bất cứ khi nào ,demo một số tasks và trình bày kết quả cho người dùng để họ đưa ra quyết định ok hay không  | Tạo, thu thập UAT test cases, thực hiện hoặc hỗ trợ trong quá trình UAT khi cần thiết  |

Để thực hiện đúng và đủ những nhiệm vụ trên, dưới đây là một vài tips mà bạn có thể tham khảo. 

![](https://images.viblo.asia/4baf0717-84b9-4d40-a288-ea766ca2d3ea.jpg)

### A few tips for QA team members:

1. Không tạo các test cases, bugs linh tinh với hi vọng rằng nếu có bất cứ vấn đề gì với các test cases hay bugs này, team lead sẽ tìm ra và sửa chữa nó cho bạn. Mỗi một cá nhân đều có trách nhiệm với các "sản phẩm" mà họ tạo ra và chất lượng của chúng. Review của team lead đóng vai trò là một yếu tố kiểm tra bổ sung thêm (additional checkpoint). 
2. Đừng mong đợi quá nhiều vào việc cầm tay chỉ việc hàng ngày. Không có team lead nào mà ngày qua ngày chỉ cho chúng ta những việc cá nhân chúng ta cần phải làm. Vì vậy mỗi member cần đề cao tính chủ động, tự giác trong công việc của chính bản thân mình mà không đợi đến team lead nhắc nhở. 
3. Chủ động trao đổi khi có bất kỳ mối quan tâm hoặc vấn đề nan giải nào đó
4. Trừ khi quy trình không cho phép, nếu bạn có bất kỳ câu hỏi nào liên quan đến các chức năng hoặc kỹ thuật, hãy tự chủ động trao đổi với dev, BA, hoặc các team kỹ thuật liên quan mà không cần thông qua leader để chuyển tiếp thông tin cho bạn. Khi trao đổi thông tin, bạn có thể cc, add thêm leader vào để nắm được tình hình, nhưng người điều phối, chủ trì nên là chính bạn.

![](https://images.viblo.asia/bd61f264-8444-4f24-b333-dbdfe4f2e734.jpg)



### Tips for QA team leads:

1. Cân nhắc ý kiến của member về timelines, schedules, effort estimations và planning 
2. Xây dựng các quy trình chặt chẽ, vững mạnh để team có thể làm việc một cách độc lập với sự giám sát tối thiếu hoặc là không có sự giám sát 
3. Giữ các kênh liên lạc giữa mình và member hoặc team QA với các bên liên quan luôn hoạt động và dễ tiếp cận 
4. Hãy luôn là một thành viên trong team QA và chia sẻ trách nhiệm với nhau 

![](https://images.viblo.asia/dca9b6a3-b17d-4688-b851-6a99f5b861c6.jpg)


Đó là tóm tắt nhanh về vai trò, nhiệm vụ của team lead và team member và trách nhiệm của từng vị trí trong một team QA điển hình. 

Vui lòng chia sẻ kinh nghiệm, nhận xét và đặt câu hỏi của bạn bên dưới nhé, kỳ sau chúng ta sẽ có một bài viết chia sẻ về [cách làm thế nào để xây dựng một team QA thành công, vững mạnh](https://www.softwaretestinghelp.com/how-to-build-a-successful-qa-team/) !



*Reference: https://www.softwaretestinghelp.com/expectations-from-qa-team-lead/*