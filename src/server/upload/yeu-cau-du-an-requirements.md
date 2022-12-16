Yêu Cầu Dự Án (Requirements) - Gian nan ở câu chuyện viết gì và viết như thế nào!?

![](https://images.viblo.asia/4b595f5b-d40a-47f1-8c67-877b26c169e7.png)

Đầu tiên thì chúng ta thử nhắc lại với nhau xem yêu cầu dự án (requirements) là gì đã. Theo IIBA có định nghĩa tại BABOK V3.0 (để tìm hiểu IIBA là gì và BABOK thì các thử search google với các keywords đó nhé) có đưa ra rằng:

*“A requirement is a usable representation of a need. Requirements focus on understanding what kind of value could be delivered if a requirement is fulfilled.”*

Tạm dịch: "Một yêu cầu là một đại diện khả dụng của một nhu cầu người dùng. Yêu cầu tập trung vào việc hiểu giá trị mà yêu cầu đó mang lại sau khi được đáp ứng.”

![](https://images.viblo.asia/25be6dae-95cf-4b76-bfe2-500eecbcbb89.jpg)

![](https://images.viblo.asia/b737922e-31ca-4447-8093-37aa151623ea.jpg)

![](https://images.viblo.asia/6996d799-9e1f-44b5-9591-9fe15ad3eb2c.png)

Trong BABOK cũng có nhắc tới các loại yêu cầu tuỳ vào đối tượng cung cấp: Yêu cầu người dùng, yêu cầu doanh nghiệp, hay yêu cầu giải pháp... Trong các mảng việc dự án mình từng tham dự thì yêu cầu giải pháp (solution requirements) là được phân tích và quản lý trực tiếp bởi các BA trực chiến dự án. Bởi ở đó tập trung các yêu cầu cụ thể để đội phát triển có thể thực hiện việc xây dựng giải pháp, bao gồm yêu cầu chức năng (functional requirements) và yêu cầu phi chức năng (non-functional requirements). Đây cũng là loại yêu cầu phổ biến nhất bởi phần lớn dự án phát triển sản phẩm. Vậy thì là các BA trực tiếp làm việc với team giải pháp hay team development thì khi được yêu cầu viết tài liệu chúng ta nên viết gì? và viết như thế nào đây?...

**Hãy thử cùng nhau đặt câu hỏi và trả lời xung quanh vấn đề này xem sao các bạn nhé!**

# Thứ nhất, tại sao mình lại nói là “được yêu cầu viết tài liệu"
Có rất nhiều dự án họ muốn tối giản hoá tài liệu và sử dụng các bộ công cụ nhằm mô hình hoá yêu cầu thay vì sử dụng word, excel, powerpoint để viết và lưu trữ theo cách truyền thống. Ví dụ: Promap được sử dụng để vừa mô hình hoá và quản lý quy trình nghiệp vụ, quản lý workflow đồng thời có tính năng để giải thích thêm các điều kiện hay ràng buộc... Invision, Miro được sử dụng để tạo prototype và flow màn hình, dòng thao tác người dùng...Việc của BA sẽ là bám sát các team tham gia từ SME tới UX, PO, Delivery Manager, development team(s) để kết nối thông tin, đảm bảo thông tin được đồng bộ và tiến trình go-live của các yêu cầu được mượt mà, phù hợp với product roadmap của PO. Vậy thì document chỉ cần thiết khi có các quyết định mấu chốt giải quyết các vấn đề phát sinh, phân tích ảnh hưởng của thay đổi khi có xảy ra (điều này thì luôn luôn xảy ra rồi)...Và khi cần có update thì các bên liên quan cùng nhau update trên các tool sẵn có đã sử dụng...

Tuy nhiên những dự án thế này lại không nhiều. BA chúng ta luôn được yêu cầu “viết tài liệu dự án” trong job description khi tuyển dụng và luôn có lợi ích của việc viết documents mà không phải BA nào cũng chấp nhận ngay, nhất là các dự án migration mà các bạn phải thực hiện reverse engineering để viết ra yêu cầu cho giải pháp mới, hay các dự án các bạn take over từ một vendor khác và vendor lại “lười" viết documents...và cũng không phải development team nào cũng hào hứng cùng bạn “đọc code thằng khác”.

# Thứ hai, viết gì? 
Cá nhân mình thấy để đưa ra được một câu trả lời thoả mãn hết các bạn sẽ rất khó. Mỗi dự án, mỗi công ty, khách hàng sẽ có những yêu cầu khác nhau cho việc viết tài liệu. Đặc biệt là mỗi development team sẽ có cách đọc khác nhau, yêu cầu khác nhau... Nhưng dù gì thì tài liệu này cần trả lời được câu hỏi của development team: Yêu cầu này liên quan người dùng nào?, họ sẽ đạt được gì từ yêu cầu này? và làm thế nào để yêu cầu được đáp ứng?

**Để biết BA nên viết gì, các bạn thử nghĩ tới một vài gạch đầu dòng như thế này nhé:**

Tạo một buổi họp để thảo luận cách viết, các chi tiết cần có trong specs (tài liệu chi tiết của yêu cầu). Hãy coi development team như 1 khách hàng của BA, hãy đưa cho họ một tập sticky notes và vài cây viết và chúng ta thực hành requirements elicitation với họ. Đảm bảo sẽ ra được các yêu cầu với việc viết tài liệu của BA. Mình đã từng áp dụng và vẫn tiếp tục tìm cơ hội lặp lại việc này mỗi khi có cơ hội (thường là sau mỗi dự án) để team và bản thân cùng tiến bộ

Challenge templates nếu có. Các dự án đã có sẵn template thì tốt quá rồi, BA cứ theo đó mà viết thôi. Phần nào đi sâu technical có thể quay sang Tech Lead để hỏi hay kêu gọi hợp tác hoàn thiện requirements. Tuy nhiên mình khuyến khích các bạn BA mình từng làm việc chung hay từng lead là hãy challenge chính cái template mình dùng, nếu thấy quá cồng kềnh, hay phần nào đó là không cần thiết cho dự án mình đang làm thì cứ mạnh dạn speak up.

Tạo buổi họp để giải thích requirements cho các bên liên quan thay vì chỉ gửi documents và hỏi “let me know if any comments". Kể cả khi các bạn làm dự án outsource và giờ bạn có thể họp là giờ khách hàng đang...ngủ. Hãy thử đề xuất thời gian họp phù hợp nhất như đi làm sớm hơn 1-2 tiếng hay ở lại trễ hơn 1-2 tiếng. Mình tin điều này không xảy ra hàng ngày, và mình cũng tin vào việc khi bạn thể hiện được commitment của bản thân thì niềm tin sẽ được tạo dựng, không chỉ với team mà còn với khách hàng.

Nếu các bạn thử google về cách viết tài liệu hiệu quả thì quả thực đọc mải mê không hết nhưng tựu chung sẽ có các chuẩn mực chung với yêu cầu như 5C, INVEST... Ở đây mình không bàn tới điều này mà mình muốn lược lại các kinh nghiệm của mình như thế này.

**Hãy cố gắng dùng hình ảnh thay cho chữ viết**

Một wireframe dù vẽ tay cũng dễ hình dung hơn nhiều là bạn giải thích dù cụ thể tới bao nhiêu.

Nếu yêu cầu là thay đổi xảy ra trên một hay nhiều màn hình của ứng dụng có sẵn, hãy chụp màn hình và take note ngay trên hình chụp màn hình đó.

Nếu yêu cầu là một thay đổi liên quan tới nhiều màn hình, nhiều bước thực hiện người dùng hãy tạo một luồng màn hình bằng cách đơn giản nhất bạn có thể (paint, excel, hay miro…) để đưa vào tài liệu.

**Nếu là change thì rất nên có 2 phần**: Hiện tại (Current hay As-Is) và Mong muốn (Expected hay To-Be). Việc này nhằm giúp người đọc hình dung nhanh nhất thay đổi là gì và xảy ra ở đâu.

Thay việc viết Use Case bằng swimlane flow chart. Các bạn có thể thấy qua cách mình viết bài là mình đang cố gắng sử dụng tiếng Việt càng nhiều càng tốt nhưng khả năng dịch thuật không mạnh nên mình đảm bảo có nhiều chỗ các bạn đọc mà không hiểu “bả đang muốn nói cái gì"...Mình viết document biết rõ nhược điểm này nên tối đa sử dụng hình vẽ, dù là vẽ tay loằng ngoàng.

# Cuối cùng là viết như thế nào? 

Thực tế thì bản thân mình cũng nhiều lần trải nghiệm đau thương từ việc bị khách hàng phàn nàn, team development phàn nàn về cách viết requirements quá dài làm họ ngại đọc, qúa nhiều chi tiết không tập trung...nên mình rất đồng cảm với các bạn bị càm ràm từ chính thức tới không chính thức về tài liệu mình viết. Một số kinh nghiệm đúc kết của mình xin được chia sẻ như sau:

Đừng ôm tài liệu ngồi viết rồi khi nào xong mới gửi review, hãy biến nó thành một quá trình như các bạn development làm việc trong team là bạn cũng setup các buổi elaboration để bạn giải thích requirement và team cùng thảo luận.

Hãy review live với khách hàng ngay khi có cơ hội. Và cũng biết nó thành một practice thường xuyên. Giả sử có ngày nào bỗng nhiên ta hết chuyện về requirements hãy tranh thủ “tâm sự" cũng là một cách xây dựng mỗi quan hệ tốt. Sử dụng các tool như webex, teams các bạn đều có thể có e-meeting với tài liệu mở trước mặt để cùng review và confirm những điểm cần thiết.

Đối chiếu hay keep track requirements mapping thường xuyên. Đây là điểm mình bị đánh giá “khó tính và ôm đồm" khi mình luôn hỏi product roadmap, kiến trúc dự án và delivery plan. Các bạn có thể bỏ qua bước đó nhưng với requirement mapping thì nên làm, tự làm một note riêng cho mình cũng được vì cách này có thể giúp bạn nắm rõ mối quan hệ giữa các requirements (dependency) và tương tác (integration) để đảm bảo khi có change xảy ra thì impact sẽ được phân tích đầy đủ, tránh rủi ro của việc thiếu thông tin.

Hãy mạnh dạn hẹn một senior BA hơn trong cty hay đơn vị giúp mình khi cần một lời khuyên.