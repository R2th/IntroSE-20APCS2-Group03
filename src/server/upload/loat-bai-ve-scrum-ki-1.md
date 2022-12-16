Chào các bạn, là một nhân lực ngành IT, hẳn các bạn đều đã nghe qua khái niệm "Agile" rồi nhỉ? "Agile" là một mô hình phát triển sản phẩm linh hoạt, có tính tùy biến cao nếu so với mô hình "waterfall" có tính ổn định trong các ngành sản xuất truyền thống.

Thế nhưng để có thể phát huy tối đa ưu điểm của Agile, chúng ta cần có những công cụ hữu ích. Nói đến đây, sẽ có 1 khái niệm khác mà hẳn bạn cũng ít nhiều từng nghe qua, hay sử dụng qua: Scrum.

Nếu hỏi "Scrum là gì?", bản thân tôi cũng chỉ có thể nói : "Nó là một mô hình quản lý giúp các PM/Leader có thể quản lý dự án theo cách linh hoạt nhất".

Nhưng cứ hiểu mang máng như thế, sẽ không thể dùng tốt Scrum và đi theo định hướng Agile, thế là tôi quyết định sẽ dịch và tìm hiểu tài liệu về Scrum rồi chia sẻ cho các bạn.

Mục đích của bản dịch này không chỉ là học hỏi, mà còn để thống nhất các khái niệm vốn chỉ có trong tiếng Anh sang tiếng Việt, thế nên bản dịch đôi chỗ sẽ để lại tiếng Anh nhằm giúp bạn đối chiếu với bản dịch của tôi.

Và vì tài liệu cũng lớn, nên tôi sẽ chia thành nhiều bài, mỗi bài sẽ gồm nội dung dịch + ghi chú và kiến giải của tôi đối với các khái niệm trong bài. Đồng thời cũng sẽ lưu ý về các từ khóa có thể xuất hiện trong bài test giành chứng chỉ Agile, như vậy người đọc vừa có thể học vừa có thể luyện thi luôn.

Bạn có thể đọc full bản tiếng Anh tại Scrumguides.org nhé.
 
Chúc các bạn sớm trở thành những Scrum Master "thiện chiến", đưa dự án đến thành công rực rỡ.

**1. Định nghĩa**

Scrum là một cơ cấu (framework) có thể giúp các cá nhân, đội nhóm và tổ chức tạo ra giá trị thông qua những giải pháp uyển chuyển cho những vấn đề phức tạp. Tóm lại, Scrum đòi hỏi một Bậc thầy Scrum (Scrum master) để tạo ra một môi trường mà trong đó:

1. Chủ sở hữu sản phẩm (Product Owner) đặt ra những công việc dành cho một vấn đề phức tạp vào trong Đơn hàng sản phẩm (Product Backlog).
2. Đội Scrum biến công việc đã chọn thành sự gia tăng giá trị xuyên suốt một Sprint.
3. Đội Scrum và các bên liên quan (stakeholders) nghiên cứu kết quả và điều chỉnh cho Sprint tiếp theo.. 
4. Lặp lại Scrum là một điều đơn giản. 

(Bạn cần) thử dùng Scrum đúng theo bản chất của nó và quyết định xem liệu triết lý, giả thuyết và cấu trúc của Scrum có giúp bạn đạt đến mục tiêu của bạn cũng như tạo ra giá trị hay không. Cấu trúc của Scrum vốn không hoàn chỉnh một cách cố tình, và nó chỉ định nghĩa những phần cần thiết cho việc thực thi lý thuyết của Scrum. Scrum được xây dựng dựa trên lượng thông tin có tính chọn lọc của những người dùng nó. Thay vì cung cấp hướng dẫn chi tiết cho người dùng, những luật lệ của Scrum sẽ dẫn đường cho những mối quan hệ và sự tương tác của họ.

*Ghi chú của người viết: Ngoài việc ghi nhớ các từ khóa như stakeholder, Product Owner, bạn nên xem xét các khái niệm trên và so sánh chúng với dự án mình đang làm. Trong dự án của bạn, ai là Product Owner, ai là Stakeholder? Có thể bạn sẽ trả lời sai. Nhưng không sao, bạn sẽ hoàn thiện dần câu trả lời của mình sau khi đọc các phần sau. Quan trọng là thực hành và suy nghĩ theo đường lối của Scrum.*

Có rất nhiều quy trình, kĩ thuật và biện pháp có thể được dùng bên trong cơ cấu này. Scrum bao hàm những phương pháp đã tồn tại hoặc xác định cái nào là không cần thiết. Scrum cũng cho thấy sự hiệu quả tương đối của nghiệp vụ quản lý, môi trường, kĩ thuật làm việc mà bạn đang có, nhờ đó mà bạn có thể tạo nên những sự cải thiện.

Lý thuyết của Scrum được dựng nên dựa trên chủ nghĩa kinh nghiệm (empiricism) và tư duy tinh gọn (lean thinking). Chủ nghĩa kinh nghiệm khẳng định rằng kiến thức  đến từ kinh nghiệm và ra quyết định dựa theo những gì quan sát được. Tư duy tinh gọn giảm thiểu lãng phí và tập trung vào những thứ chính yếu. Scrum sử dụng một phương hướng tiếp cập có tính lặp lại (**iterative**), tính gia tăng (**incremental**) để tùy chỉnh tính dự đoán (**predictability**), kiểm soát rủi ro (**risk**). Scrum giúp những người có kĩ năng và chuyên môn để làm công việc (được giao) có thể chia sẻ hay đạt được những kỹ năng cần có. Scrum kết hợp bốn sự kiện (**event**) chính thức dành cho việc kiểm tra (**inspection**) và thích ứng (**adaptation**) bên trong một sự kiện tổng (**containing event**) gọi là The Sprint. 

*Ghi chú của người dịch: Cách dịch của tôi có thể chưa được sát nghĩa và tôi sẽ sửa lại trong quá trình học hỏi. Thế nên các từ khóa in đậm trong đoạn trên bạn nên cố gắng nhớ từ tiếng Anh để vừa có thể kiểm tra được điểm cao, và bám sát định nghĩa của Scurm nhất có thể.*
Những sự kiện này có hiệu quả vì chúng thực thi những giá trị cốt lõi mang tính kinh nghiệm của Scrum bao gồm tính minh bạch (transparency), sự kiểm tra (inspection) và sự thích ứng (adaptation). 

![](https://images.viblo.asia/619cbf37-987b-4394-9f39-9fe016ba38e3.png)

Tính minh bạch **(transparency)**: Quá trình thay đổi và làm việc phải được công khai (visible) cho những ai thực hiện công việc cũng như những người nhận công việc. Với Scrum, những quyết định quan trọng được dựa trên trạng thái quan sát được của 3 kết quả được lưu trữ (artifact) chính thức. Những kết quả lưu trữ mà có tính minh bạch thấp có thể dẫn đến kết quả lợi ít rủi ro nhiều.
Tính minh bạch giúp cho việc kiểm tra có giá trị. Kiểm tra mà không minh bạch thì chỉ gây ra nhầm đường và lãng phí.

Sự kiểm tra **(Inspection)**: Những kết quả lưu trữ của Scrum và quá trình đạt được mục tiêu đề ra phải được kiểm tra thường xuyên và nghiêm túc để phát hiện ra những biến số có khả năng gây ra vấn đề mà không ai mong muốn. Để hỗ trợ điều tra, Scrum tạo nên một tiết tấu trong hình dạng của 5 sự kiện. Và sự kiểm tra sẽ giúp cho sự thích ứng. Kiểm tra mà không tạo nên sự thích ứng thì sẽ là vô nghĩa. Những sự kiện trong Scrum được thiết kế để tạo nên thay đổi.

Sự thích ứng (**Adaptation**): Nếu bất kì phương diện nào của quy trình trượt ra khỏi giới hạn chấp nhận được hay nếu sản phẩm không thể chấp nhận được, quy trình đang áp dụng hay nguyên liệu đang được dùng cho sản xuất phải được điều chỉnh.

Sự điều chỉnh phải được tạo ra càng sớm càng tốt để tối thiểu hóa những biến tướng (**deviation**). Sự thích ứng sẽ khó hơn khi những người liên quan không được trợ lực (**empowered**) hay không có tính tự quản **(self-managing)**. Một đội ngũ Scrum được kì vọng sẽ thích ứng ngay tại lúc đội ngũ ấy phát hiện ra điều gì mới thông qua kiểm tra. 

Giá trị của Scrum

Sự thành công của Scrum phụ thuộc vào việc người dùng trở nên hiệu quả hơn trong việc áp dụng 5 giá trị:

- Cam kết (**Commitment**)
- Tập trung (**Focus**)
- Sự cởi mở (**Openness**)
- Tôn trọng (**Respect**)
- Can đảm (**Courage**) 

Đội ngũ Scrum cam kết đạt được mục tiêu và sẽ hỗ trợ lẫn nhau. Sự tập trung chính của họ dồn vào việc thực hiện Sprint để tạo nên quá trình tốt nhất có thể hướng đến những mục tiêu này. Đội Scrum và các bên liên quan chia sẻ một cách cởi mở về công việc cũng như các thách thức. Thành viên đội Scrum tôn trọng lẫn nhau để như những người có năng lực, độc lập và đồng thời tôn trọng cộng sự của mình. 

Thành viên team Scrum có can đảm để làm điều đúng, xử lý những vấn đề khó khăn. Những giá trị này dẫn lối cho team Scrum trong công việc, hành động, cư xử. Những quyết định được thực hiện, những bước đã đi và cách mà Scrum được dùng sẽ củng cố thêm các giá trị này chứ không làm giảm đi hay che lấp chúng. Thành viên team Scrum học và khám phá các giá trị này dựa trên các cột mốc công việc và các kết quả được lưu trữ. Khi những giá trị này được thành hình bởi team Scrum và những ai mà họ làm việc cùng, những trụ cột Scrum gồm tính minh bạch, kiểm tra và thích ứng sẽ đạt được độ tín dụng vững chãi như một tòa cao ốc.

*Ghi chú: Scrum *