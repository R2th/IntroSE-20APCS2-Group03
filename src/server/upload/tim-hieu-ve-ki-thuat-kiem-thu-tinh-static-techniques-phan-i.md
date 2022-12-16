![](https://images.viblo.asia/1a59c202-47fc-4e21-af65-38e08ff51eba.jpg)
$$
> **Kĩ thuật Kiểm thử tĩnh (Static testing)** cung cấp một phương pháp tuyệt vời để cải thiện chất lượng và năng suất của quá trình phát triển phần mềm. Chương này mô tả những kĩ thuật kiểm thử, bao gồm cả phần tổng hợp thông tin, và cung cấp một cái nhìn bao quát về phương thức thực hiện những kĩ thuật trên . Mục đích cốt lõi của kiểm thử tĩnh là để cải thiện chất lượng sản phẩm bằng cách trợ giúp các kĩ sư trong việc nhận biết và sửa chữa những lỗi sai của chính họ từ những giai đoạn đầu tiên trong quá trình phát triển phần mềm. Mặc dù kiểm thử tĩnh không giải quyết được hết tất cả các vấn đề nhưng nó có hiệu quả to lớn nhờ có có những yếu tố cấu thành khá ấn tượng. 
> Kiểm thử tĩnh không phải một "phép màu" và nó cũng không thể được xem là một phương pháp thay thế cho Kiểm thử động (Dynamic testing), nhưng tất cả các tổ chức liên quan tới phát triển phần mềm nên coi việc sử dụng kĩ thuật rà soát đánh giá (review) cho tất cả những thành phần chính trong công việc của họ bao gồm yêu cầu (requirements), thiết kế (design), thực hiện (implementation), kiểm thử, và bảo trì (maintenance).
> 
> Các công cụ phân tích tĩnh có thể thực hiện kiểm thử tự động trên các đoạn code.

![](https://images.viblo.asia/ddafb06d-d88f-4a04-9228-c5b1aa91a0cb.jpg)
### I.	Review và quy trình kiểm thử
Trong phần này sẽ tập trung làm rõ 3 nội dung:
- Nhận biết những sản phẩm phần mềm có thể được kiểm tra bằng kĩ thuật kiểm thử tĩnh. 
- Chỉ ra tầm quan trọng và giá trị của việc sử dụng kĩ thuật tĩnh trong việc đánh giá chất lượng sản phẩm phần mềm. 
- Giải thích sự khác nhau giữa các kĩ thuật tĩnh và động. 

Trong chương I của cuốn sách này, một số thuật ngữ đã được giải thích, bao gồm thuật ngữ "kiểm thử". Trong chương này thuật ngữ kiểm thử được nhắc lại như một phương tiện để giải thích 2 loại kiểm thử chính.

Định nghĩa kiểm thử vạch ra mục đích của nó: đánh giá, tìm ra những lỗi sai và chất lượng sản phẩm. Và trong đó cũng chỉ ra để đạt được những mục đích này thì người ta có thể sử dụng hai phương pháp tiếp cận đó là **Kiểm thử tĩnh (Static) và kiểm thử động (Dynamic)**.

Với phương pháp kiểm thử động, phần mềm được chạy thử sử dụng một tập hợp các giá trị đầu vào và sau đó đầu ra của nó sẽ được kiểm tra và so sánh với kết quả đang được kì vọng. Trong kiểm thử tĩnh thì sản phẩm được kiểm tra một cách thủ công hoặc bằng một số các công cụ hỗ trợ nhưng phần mềm không được chạy thử. Và kết quả là kiểm thử tĩnh chỉ có thể áp dụng cho các đoạn code. Kĩ thuật này được áp dụng như một phương thức để phát hiện lỗi và xác định các thành tố tạo nên chất lượng nhưng chỉ của những dòng code thôi. Và lựa chọn kiểm thử này thì không áp dụng được cho hầu hết các sản phẩm sinh ra trong quá trình phát triển phầm mềm. 

Khi đó các câu hỏi được đặt ra: **Làm thế nào để đánh giá hoặc phân tích tài liệu mô tả yêu cầu, tài liệu thiết kế, kế hoạch kiểm thử hay một tài liệu hướng dẫn sử dụng cho người dùng? Làm thế nào để ta có thể kiểm tra trước source code trước khi chạy?** Một phương pháp đầy "quyền năng" có thể được sử dụng ở đây, ví dụ như review (đánh giá). Về cơ bản phương pháp này có thể được sử dụng để kiểm tra tất cả mọi sản phẩm trong quá trình phát triển phần mềm. 

Kiểm thử động và tĩnh đều là những phương pháp bổ trợ rất tốt vì chúng có xu hướng tìm ra những loại lỗi thuộc các loại khác nhau rất hiệu quả và hợp lý. Những loại defect có thể dễ dàng tìm thấy trong quá trình kiểm thử tĩnh đó là: những sai lệch so với tiêu chuẩn, thiếu yêu cầu, những khuyết điểm trong thiết kế, những đoạn code không thể bảo trì nâng cấp và những đặc tả giao diện thiếu tính thống nhất.  Lưu ý rằng, đối lập với kiểm thử động, kiểm thử tĩnh tìm ra căn nguyên của lỗi sai thay vì bản thân những lỗi sai. 

Ngoài việc tìm ra những khuyết điểm, việc review còn nhằm mục đích cung cấp thông tin, trao đổi giao tiếp, và giáo dục mà ở đó những người tham gia vào quá trình này còn học được về nội dung của những sản phẩm này, giúp họ có một cái nhìn và hiểu rõ hơn vai trò công việc của chính họ, đồng thời lập kế hoạch cho những giai đoạn phát triển sau này. 

Review thường đại diện cho các dấu mốc quan trọng của dự án và hỗ trợ cho việc thiết lập nên một đường cơ sở làm tiêu chuẩn cho sản phẩm. Loại và chất lượng của lỗi được tìm thấy trong khi review có thể giúp các kĩ sư kiểm thử xác định được điểm cần tập trung test và lựa chọn cách test. Trong một vài trường hợp, khách hàng hoặc người dùng sẽ tham gia vào buổi review này để đưa ra những phản hồi cho đội ngũ phát triển, nên review ở đây cũng là một phương thức để giao tiếp với khách hàng/người dùng.

Các nghiên cứu cũng chỉ ra rằng kết quả của việc review giúp đạt được sự tăng trưởng đáng kể về năng suất và chất lượng sản phẩm. Giảm thiểu số lượng lỗi ngay từ những giai đoạn đầu tiên trong vòng đời phát triển sản phẩm cũng có nghĩa là giảm được thời gian dùng để kiểm thử và sửa chữa, bảo trì. 

Tóm lại, việc sử dụng kĩ thuật kiểm thử tĩnh có một số tác dụng đối với các sản phẩm chung trong quá trình phát triển: 

* Do việc kiểm thử tĩnh được thực hiện sớm, nên việc phản hồi góp ý về chất lượng cũng được thực hiện sớm. Ví dụ như thực hiện xác nhận với khách hàng để nắm rõ yêu cầu ngay từ đầu thì sẽ không phải để tới tận thời điểm thực hiện acceptance test mới nhận được phản hồi nữa. 
* Bằng cách phát hiện ra khiếm khuyết sớm, chị phí phát sinh cho việc làm lại cái đã làm thường sẽ giảm xuống khá nhiều và vì vậy việc cải thiện chất lượng sẽ được thực hiện một cách tiết kiệm hơn.
* Và vì công sức bỏ ra để làm lại được giảm xuống đáng kể, năng suất có nhiều khả năng sẽ tăng lên
* Việc thực hiện đánh giá trong cả một nhóm thêm vào một lợi thế cho phương pháp này bởi khi đó sẽ có thêm sự trao đổi thông tin giữa các thành viên.
* Kiểm thử tĩnh đóng góp vào việc gia tăng ý thức về vấn đề chất lượng.

Kiểm thử tĩnh là một phương pháp rất phù hợp để cải thiện chất lượng cả các sản phẩm. Điều này được áp dụng trước hết đối với sản phẩm được đánh giá nhưng một điểm cũng hết sức qua trọng đó là việc cải thiện chất lượng sản phẩm có được không phải chỉ là một lần mà nó còn do nhiều yếu tố khác cấu thành. Những phản hồi có được từ quá trình kiểm thử tĩnh giúp cải thiện cả quy trình, giúp ta tránh được việc mắc các lỗi tương tự trong tương lai.

### II. Quy trình đánh giá (Review process)
Trong phần này bài viết sẽ đề cập tới 3 ý chính: 
* Đưa ra những giai đoạn, vai trò và trách nhiệm của mỗi người trong một buổi đánh giá chính thức (formal review) 
* Giải thích sự khác nhau giữa: đánh giá không chính thức (informal review), đánh giá kỹ thuật (technical review), walkthrough và thanh tra  (inspection)
* Giải thích các yếu tố làm nên một buổi review thành công. 

Review có thể hết sức đa dạng từ rất không chính thống tới chính thống (có cấu trúc cụ thể và tuân thủ nghiêm ngặt các điều khoản) 

Mặc dù thanh tra (inspection) có thể được coi là phương pháp formal review được ghi chép tài liệu đầy đủ nhất nhưng nó không phải là phương pháp duy nhất. Tính chính thống của quá trình review liên quan tới những yếu tố như sự phát triển của quá trình, bất kì một yêu cầu nào về những luật lệ phải tuân theo hoặc nhu cầu về việc phải có biên bản kiểm tra truy nguyên. 

Trong thực tế, informal review có lẽ là phương pháp review thông dụng nhất. Việc thực hiện informal review có thể diễn ra ở nhiều thời điểm khác nhau. Chỉ với 2 người cũng đã có thể thực hiện bởi người triển khai chỉ cần nhờ một đồng nghiệp review giúp một tài kiệu hoặc code là ổn. 

Tuy nhiên càng ở những giai đoạn sau của quá trình phát triển thì việc review này cần nhiều người hơn và một buổi họp chính thức. Việc này thường sẽ có sự tham gia của nhiều người đồng nghiệp hơn, những người sẽ nỗ lực tìm ra những lỗi sai trong tài liệu và thảo luận về những điểm sai sót này trong buổi họp. Mục đích của việc làm này là để cái thiện nâng cao chất lượng của những tài liệu này. Đây chính là điểm khác biệt giữa informal meeting và formal meeting: informal meeting có thể được thực hiện dưới nhiều hình thức nhưng dù dưới hình thức nào thì cũng không hề có sự lưu lại tài liệu. 

#### 1. Các hoạt động trong formal review

![](https://images.viblo.asia/6e6a46d9-50fb-495a-983a-4be05acba8da.jpg)

Đối lập với informal review thì formal review tuân theo một quy trình rất rõ ràng. Thông thường một quy trình formal review sẽ có 6 bước: 
* Lên kế hoạch - Planning
* Bắt đầu - Kick-off
* Chuẩn bị - Preparation
* Họp đánh giá - Review meeting
* Làm lại - Rework
* Follow-up.

$~$



   ##### 1.1. Planning
   
Quy trình review bắt đầu bằng một "yêu cầu review" từ người làm ra sản phẩm tới moderator (hoặc inspection leader). Moderator thường được giao cho nhiệm vụ quản lí thời gian và lịch trình review. Xét trên quy mô dự án, việc lên kế hoạch đòi hỏi phải tính toán cả thời gian review và rework. Chính vì vậy, hãy tính toán và cho đội ngũ phát triển có cả thời gian để tham gia review. 

Trong formal review, moderator luôn thực hiện "entry check" kiểm tra đầu vào và xác định tiêu chuẩn đầu ra (exit criteria). Entry check được thực hiện để đảm vào không gây lãng phí thời gian của người review vào những tài liệu chưa sẵn sàng để review. Một tài liệu có quá nhiều lỗi có thể dễ dàng nhìn thấy sẽ không phù hợp để thực hiện formal review. Việc thực hiện review trên những tài liệu như vậy có thể để lại những hệ quả xấu tới hoạt động review. Vừa khiến người review cảm thấy chán nản lại vừa khiến người làm ra nó nhụt chí. Thêm vào đó những lỗi sai lớn thậm chí có thể bị bỏ sót do có quá nhiều lỗi khác. 

Mặc dù có thể có nhiều yêu cầu đầu vào khác nhau nhưng những tiêu chí dưới đây có thể được xem là những yêu cầu tối thiểu cần được thực hiện trong entry check:

* Moderator có thể kiểm tra nhanh một mẫu sảm phẩm. Nếu không có quá nhiều lỗi lớn. Ví dụ sau 30 phút kiểm tra mà không có hơn 3 lỗi lớn trên 1 trang hoặc ít hơn 10 lỗi trong tổng 5 trang.
* Tài liệu được review nên được đánh số theo từng dòng.
* Tài liệu nên được duyệt qua 1 lượt bằng các công cụ tự động.
* Những nguồn tham khảo sử dụng trong quá trình revew cần phải ổn định và sẵn có.
* Người làm ra tài liệu đó cần phải chuẩn bị sẵn sàng để tham gia review và tự tin về sản phẩm của chính mình. 

Nếu tài liệu vượt qua được kiểm tra đầu vào, khi đó moderator và tác giả sẽ quyết định phần nào của tài liệu sẽ được review. Bởi bộ não con người chỉ có thể thu nhận một khối lượng thông tin nhất định vào một thời điểm nên số lượng tài liệu được review nên được giới hạn. Số trang tài liệu được review phụ thuộc vào mục đích, kiểu review và loại hình của tài liệu và nên được đúc kết từ những kinh nghiệm trước đây. 

Thông thường con số sẽ nằm trong khoảng từ 10-20 trang đối với review và với inspection thì sẽ chỉ là 1 hoặc 2 trang tài liệu thôi. Mục đích là tìm thật kĩ để có thể phát hiện ra những lỗi khó nhận biết bằng những cách thông thường. 

Sau khi tài liệu được chỉ định, moderator sẽ cùng với tác giả chọn ra đội ngũ tham gia review. Thường thì một nhóm sẽ bao gồm từ 4-6 người bao gồm cả tác giả và moderator. Để nâng cao hiệu quả của việc review, mỗi người tham gia đều sẽ được giao cho 1 nhiệm vụ khác nhau. Việc phân chia như vậy giúp cho người review tập trung hơn vào loại defect mà mình được giao trong quá trình kiểm tra, đồng thời hạn chế khả năng tìm ra các lỗi trùng nhau. Người thực hiện phân chia nhiệm vụ là moderator. 

Hình 3.1 dưới đây chỉ ra những vai trò khác nhau trong một buổi review. Các vai trò đại diện cho các phương diện khác nhau của tài liệu được review.

Trong buổi review, những điểm sau có thể sẽ được tập trung hơn: 

*	Tập trung vào những tài liệu bậc cao hơn. Ví dụ như bản design có tuân thủ theo các yêu cầu (requirements) không.

*	Tập trung vào các tiêu chuẩn như sự nhất quán, rõ ràng, quy ước đặt tên, các bản mẫu (templates) trong chính tài liệu

*	Tập trung vào những tài liệu liên quan ví dụ như giao diện giữa các chức năng khác nhau

*	Tập trung vào cách sử dụng ví dụ như khả năng test được hoặc bảo trì được.


![](https://images.viblo.asia/55cc37b5-3c24-4953-a6d1-e8331f8a1e00.jpg)

Tác giả có thể thêm vào những vai trò cụ thể khác và những câu hỏi sẽ được đưa ra trong buổi review. Moderator được quyền đảm nhiệm một vai trò bên cạnh vai trò của một nhóm trưởng. Việc tham gia vào review tài liệu nâng cao khả năng dẫn dắt của moderator vì nó giúp moderator hiểu rõ hơn về tài liệu. Hơn nưa nó còn cải thiện tốc oddoj, hiệu quả của việc review nhờ việc moderator thay thế 1 kĩ sư, giảm effort, số người phải tham gia review. Thường thì moderator sẽ nhận nhiệm vụ kiểm tra sự tuân thủ các tiêu chuẩn của tài liệu vì việc này có vai trò khách quan cao, thường sẽ ít gây ra tranh luận khi tìm ra defect. 

$~$

 ##### 1.2. Kick-off
Một bước không bắt buộc trong quy trình review đó là buổi họp trước khi bắt đầu (kick-off meeting). Mục đích của việc thực hiện buồi hợp là để thống nhất quan điểm về tài liệu và thời gian tiến hàng. Trong trường hợp formal review thì có thể kết quả của việc kiểm tra đầu vào và tiêu chuẩn đầu ra cũng được được ra thảo luận.

Thông thường việc thực hiện kick-off là khá quan trọng bởi nó có một hiệu ứng tích cực đối với những người tham gia review và hiệu quả của cả quá trình. Trong khi thực hiện kick-off, ta có thể tìm ra tới 70% defect lớn trong một trang tài liệu. Những người tham gia review được giới thiệu ngắn gọn về mục đích của việc review và nội dung tài liệu review. Các mối quan hệ giữa tài liệu được review và tài liệu nguồn (source) sẽ được giải thích, đặc biệt khi con số tài liệu liên quan lại lớn. 

Trong buổi hợp này việc phân chia vai trò, tốc độ kiểm tra, phạm vi kiểm tra, quy trình và những câu hỏi khác có thể sẽ được đưa ra thảo luận. Đương nhiên việc phân chia tài liệu, tài liệu nguồn, v.v… có thể cũng được thực hiện tại buổi kick-off này.


$~$

 ##### 1.3. Preparation
Những người tham gia review sẽ làm việc biệt lập với nhau sử dụng những tài liệu, quy trình, quy định và checklist liên quan. Người review chịu trách nhiệm phát hiện defect sau đó đặt câu hỏi hay nhận xét dựa trên những hiểu biết cuả bản thân và theo đúng nhiệm vụ. Tất cả các vấn đề được nêu ra đều được ghi chép lại sử dụng các biểu mẫu khai báo. Những lỗi chính tả cũng sẽ được ghi lại trong tài liệu nhưng sẽ không được nhắc đến trong buổi họp. 

Tài liệu chú thích sẽ được đưa cho tác giả vào cuối buổi họp tổng kết. Sử dụng checklist trong giai đoạn này giúp việc review trở nên hiệu quả và đầy đủ hơn. Ví dụ như tạo riêng một bản checklist cụ thể dựa trên những quan điểm khác nhau của người dùng, người bảo trì, người kiểm thử hoặc vận hành hay một checklist dành riêng cho những vấn đề liên quan đến code điển hình.

Một yếu tố trọng yếu để có được sự chuẩn bị kĩ càng đó là số lượng trang được kiểm tra mỗi giờ. Con số này được gọi là tốc độ kiểm tra (checking rate). Tốc độ kiểm tra tối ưu là kết quả tính toán dựa trên nhiều yếu tố, bao gồm loại tài liệu cần review, độ phức tạp, số lượng tài liệu liên quan và kinh nghiệm của người review. 

Thông thường tốc độ kiểm tra sẽ rơi vào khoảng 5-10 trang/giờ nhưng cũng có thể sẽ chỉ là 1 trang/giờ đối với formal inspection chẳng hạn. Nhưng trong quá trình chuẩn bị thì những người tham gia không nên vượt quá con số này. Bằng cách thu thập dữ liệu và tính toán trong quá trình review, những tiêu chuẩn cụ thể của mỗi công ty đối với tốc độ kiểm tra và kích thước của tài liệu có thể được đưa ra như một con số cố định, tốt nhất là cho một loại tài liệu cụ thể.

$~$

 ##### 1.4. Review meeting
Buổi họp điển hình bao gồm những thành phần sau (có phần phụ thuộc vào loại review): giai đoạn log, giai đoạn thảo luận và giai đoạn đưa ra quyết định. 

Trong giai đoạn log, lỗi được phát hiện trong lúc chuẩn bị được nhắc tới và ghi chép lại bởi tác giả hoặc thư ký. Trong những buổi formal review như inspection, một người chỉ đảm nhận việc ghi chép đặc biệt hữu ích. Để đảm bảo tiến độ và hiệu suất, trong giai đoạn log này người tham gia không được thực hiện tranh luận. Nếu cần thảo luận, nội dung đó sẽ được ghi lại và xử lý tại giai đoạn thảo luận. Một cuộc tranh luận kiểu như, liệu một vấn đề nào đó có phải là lỗi (defect) hay không, thực sự không quan trọng và không có ý nghĩa. Thay vào đó, việc ghi chép lại và chuyển sang vấn đề tiếp theo sẽ hiệu quả hơn nhiều. Hơn nữa, thay vì việc phụ thuộc hoàn toàn vào ý kiến chủ quan của một nhóm người, một defect có thể trước đó đã bị bỏ qua lại trở thành một lỗi thực sự trong quá trình rework. 

Tất cả mọi defect và mức độ nghiêm trọng của chúng đều cần phải được ghi lại. Người phát hiện ra defect cũng sẽ là người đánh giá mức độ nghiêm trọng này. Mức độ nghiêm trọng có thể được chia làm nhiều cấp độ: 

* Critical: defect sẽ gây ra thiệt hại thứ cấp (từ lỗi này lại sinh ra thêm lỗi khác); phạm vi và tầm ảnh hưởng của lỗi còn vượt trên cả tài liệu được review. 
* Major: defect có thể sẽ gây ra thiệt hại thứ cấp (Ví dụ: lỗi design có thể khiến việc implement bị lỗi)
* Minor: defect hầu như không có khả năng gây thiệt hại thứ cấp (Ví dụ: lỗi không tuân thủ theo các tiêu chuẩn và khuôn mẫu)

Những lỗi như sai chính tả không được gọi là một loại defect. Những lỗi này được liệt kê ra trong quá trình review và đưa cho tác giả sau đó hoặc xử lý trong một buổi khác được tổ chức riêng để soát những lỗi tương tự như vậy. Trong giai đoạn log, mục đích cốt lõi là tìm được ra càng nhiều defect càng tốt trong một khoảng thời gian nhất định. Để đảm bảo điều này, moderator phải giữ được tốc độ log (số defect được log/phút). Trong một buổi formal review được dẫn dắt tốt và tuân thủ đúng các quy tắc, tốc độ log sẽ là khoảng 1-2 defect/phút. 

Trong formal review, những vấn đề cần thảo luận thêm được xử lý vào giai đoạn này. Những buổi informal review thường không có riêng giai đoạn log và sẽ thực hiện thảo luận luôn. Những người tham gia có thể tranh luận bằng cách đưa ra nhận xét và lí luận riêng. 

Là người dẫn dắt buổi họp, moderator sẽ chịu trách nhiệm về những vấn đề xảy ra trong buổi họp.Ví dụ như moderator có trách nhiệm giữ cho cuộc họp khách quan một cách tối đa, ngăn không cho nó đi sâu  vào những vấn đề cá nhân, tóm tắt lại những điểm đáng lưu ý nếu cần và có thể cho nghỉ giữa giờ để thư giãn khi có những tranh luận “nảy lửa”. 

Những người tham gia review nhưng không nhất thiết phải có mặt khi thảo luận có thể rời buổi họp hoặc ở lại. Moderator cũng sẽ thúc giục tại phần này của buổi họp để đảm bảo tất cả các vấn đề được thảo luận sẽ được giải quyết bằng cách này hay cách khác khi buổi họp kết thúc hoặc lưu lại để tìm phương án giải quyết sau. Kết quả của phần thảo luận sẽ được lưu lại để tham khảo về sau. 

Cuối buổi họp, những người tham gia review sẽ phải đi đến một quyết định cuối cùng, đôi khi sẽ phải bám chặt theo những tiêu chí đầu ra chính thức. Tiêu chí quan trọng nhất là số defect (critical và major) trung bình mỗi trang (ví dụ: <= 3 lỗi /trang) 

Nếu con số defect tìm thấy ở mỗi trang vượt quá mức quy định, tài liệu đó sẽ cần phải ***làm lại*** và ***lại review lại.***

Nếu tài liệu đáp ứng đầy đủ những tiêu chí đánh giá đầu ra, nó sẽ được chuyển sang giai đoạn follow-up và được moderator kiểm tra (có thể cùng với 1 hoặc nhiều người khác). 

Kết quả là tài liệu có thể thông qua quá trình review. Nếu 1 dự án đang bị áp lực về thời gian, moderator đôi khi bị ép phải bỏ bước review lại và chấp nhận một tài liệu có sai ót. Việc đặt ra và đồng thuận với những tiêu chí đánh giá đầu ra đảm bảo chất lượng tài liệu, giúp moderator đưa ra những quyết định đanh thép vào bất cứ lức nào. Bên cạnh số defect/trang tài liệu, những tiêu chí đánh giá đầu ra khác cũng được sử dụng, nó đo lường mức độ kĩ càng của quá trình review, như là đảm bảo tất cả các trang đều được kiểm tra đúng tốc độ. Con số trung bình defect/trang chỉ có hiệu lực như một chỉ số đánh giá chất lượng nếu tất cả các tiêu chí về quy trình đều được đảm bảo.


$~$

 ##### 1.5. Rework
Dựa trên kết quả của những defect đã được tìm ra, tác giả sẽ dần dần từng bước chỉnh sửa cập nhật tài liệu. Không phải bất cứ defect nào cũng khiến tác giả phải làm lại (rework). Việc đánh giá liệu một defect có bắt buộc phải sửa chữa không là trách nhiệm của tác giả. Tuy nhiên nếu trong trường hợp khi một vấn đề vì một lí do nào đó mà không được xử lí thì ít nhất nó cũng phải được báo cáo để cho thấy tác giả đã có cân nhắc về vấn đề đó. 

Những thay đổi được thực hiện trên tài liệu nên được xác định tại bước follow-up. Vì vậy, tác giả cần trình bày chỉ ra nơi những thay đổi đã được thực hiện. Ví dụ sử dụng các chức năng “Track changes” của các phần mềm xử lí văn bản.


$~$

 ##### 1.6. Follow-up
Moderator chịu trách nhiệm đảm bảo rằng các hàng động thỏa đáng đã được thực hiện đối với các lỗi được ghi lại, những đề xuất cải tiến quy trình và thay đổi yêu cầu. Mặc dù moderator sẽ kiểm tra để chắc chắn rằng tác giả đã thực hiện thay đổi trên tất cả các lỗi được báo cáo, moderator cũng không nhất thiết phải kiểm tra tất cả những thay đổi đó tới từng chi tiết. Nếu tất cả những người tham gia review được yêu cầu kiểm tra lại tài liệu sau khi cập nhật thì moderator sẽ làm nhiệm vụ phân phối công việc và thu thập tổng hợp những phản hồi. Đối với những kiểu review formal hơn thì moderator sẽ kiểm tra sự tuân thủ của tài liệu với những tiêu chuẩn đầu ra (exit criteria) 

Để kiểm soát và tối ưu hóa quá trình review, moderator sẽ thu thập một số các số liệu đo lường tại mỗi bước của quy trình. Ví dụ như số lỗi được tìm thấy, số lỗi được tìm thấy trong mỗi trang, thời gian dùng để kiểm tra một trang, tổng effort cho cả quá trình review, v.v... Trách nhiệm của moderator là đảm bảo những thông tin đó là chính xác và lưu giữ cho mục đích phân tích về sau. 

&nbsp;
> (Phần II của bài viết sẽ đề cập tới vai trò của các cá nhân, các loại review, các yếu tố làm nên sự thành công của việc review phương pháp phân tích tĩnh bằng các công cụ hỗ trợ, etc.)
&nbsp;

$~$$~$$~$$~$$~$$~$$~$$~$*Nguồn:*

$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$$~$*Bản dịch chương 3 cuốn: "Foundations of Software Testing: ISTQB Certification" của các tác giả Dorothy Graham, Erik Van Veenendaal, Isabel Evans, và Rex Black*