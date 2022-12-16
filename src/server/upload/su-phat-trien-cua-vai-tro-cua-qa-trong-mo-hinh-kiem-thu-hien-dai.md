Phát triển phần mềm tiến hóa từ mô hình Waterfall, Agile và bây giờ là DevOps. Đương nhiên cũng thấy được việc kiểm thử phần mềm cũng có những thay đổi lớn để phù hợp với công việc phát triển và phân phối phần mềm. 

Tuy nhiên, nhìn chung thì vẫn có 1 sự hiểu nhầm lớn và có 1 sự nhận thức không đúng về vai trò của Tester và đảm bảo chất lượng.

Trong bài viết này chúng ta sẽ có 1 cái nhìn về việc kiểm thử tiến hóa như thế nào, cụ thể là trong thế kỷ trước, điều mà 1 QA chuyên nghiệp cần để làm chủ cuộc chơi là gì.

Việc kiểm thử có thể thú vị hơn!

Trong khi các hoạt động kiểm thử phần mềm thay đổi để đáp ứng với các cách làm việc mới, thì tôi vẫn thấy nhiều quan điểm lỗi thời về việc kiểm thử và vai trò của 1 QA.

Thật buồn vì vẫn có nhiều người trong ngành IT xem các QA hay các Tester như là những người kiểm thử chức năng, đó là chỉ kiểm thử phần mềm đúng 1 lần sau khi mà Dev hoàn thành 1 tính năng nào đó. “Đảm bảo chất lượng” được xem như là các việc kiểm thử, tìm và báo cáo các lỗi và bật tín hiệu đèn Xanh cho việc release.

Điều đáng lo ngại hơn là chính những tester hay các chuyên gia QA cũng có những nhận thức như vậy về vai trò của 1 QA.

# Kiểm thử phần mềm truyền thống
![](https://images.viblo.asia/ccc2880a-2d77-4f6c-a23c-da89de139ae6.jpg)


Trong lịch sử, các QA sẽ đi đầu trong các giai đoạn cuối của 1 dự án mô hình thác nước, nói cách khác là việc kiểm thử sẽ cố định ở bên phải của vòng đời phát triển phần mềm. Nếu so sánh việc phát triển phần mềm với việc chạy tiếp sức, thì có thể hiểu sau khi mà xác định yêu cầu phần mềm, đội phát triển sẽ phát triển và sau đó sẽ giao chiếc gậy cho QA ở giai đoạn đóng việc phát triển và QA tiếp tục chạy các bản kịch bản kiểm thử rất dài và chi tiết, thường là thủ công và thường trong những đội và nhóm kín trong các doanh nghiệp quy mô vừa và nhỏ.

Các test case lên kế hoạch trước 1 cách tỉ mỉ, các kịch bản được thực thi bởi các chuyên gia, và các vòng đời kiểm thử được chạy đi chạy lại cho tới khi đạt tới các mức độ chất lượng được định nghĩa sẵn trước đó. 

Đáng chú ý nhất là luôn có sự tách biệt rõ ràng giữa Dev và Tester, và không bao giờ bị chồng chéo trách nhiệm và hoạt động giữa 2 vị trí này. Thực tế là suốt quá trình kiểm thử biệt lập này thì các hoạt động chỉ tập trung vào việc xác nhận chức năng của phần mềm với mục đích chính là tìm và báo cáo lại các lỗi của phần mềm.
# QA trong mô hình Agile
![](https://images.viblo.asia/d3eeac51-9779-40f8-a01f-d0276e5e8f9d.png)

Các phương thức và cách làm việc của mô hình Agile hợp nhất các hoạt động phát triển và kiểm thử đến mức việc kiểm thử không còn là 1 giai đoạn độc lập nữa. Thay vào đó, việc kiểm thử trở thành 1 hoạt động ngầm trong quá trình lập trình và phát triển phần mềm.

Trong 1 số trường hợp, sẽ khó để thấy khoảng cách giữa 1 Tester và 1 Dev vì mỗi người có thể thực hiện 1 cách liền mạch các hoạt động của người khác.

“Chất lượng” không trở thành trách nhiệm của các tester mà nó trở thành trách nhiệm của mọi người liên quan tới việc phát triển và phân phối sản phẩm.

Cùng với sự phát triển này thì nó dẫn đến các trách nhiệm kiểm thử bên trái của tester, tức là đảm bảo chất lượng ngay từ giai đoạn đầu.

Tập trung chuyển từ tìm lỗi phần mềm sau khi được tạo ra thành việc ngăn chặn các lỗi ngay từ khi mới bắt tay vào làm phần mềm. 

Với một mục tiêu được chia sẻ để đảm bảo không chỉ là sản phẩm hay tính năng đúng chức năng và yêu cầu mà còn phù hợp với mục tiêu và giúp cho người dùng có được một sự hài lòng cao với sản phẩm họ sử dụng.

Các tester tham gia vào các cuộc sàng lọc các câu truyện, các buổi peer code review, kiểm thử unit và các thực hành như TDD (Test-Driven Development) , BDD (Behavior Driven Development) , và tiếp tục kiểm thử và đảm bảo việc kiểm thử và chất lượng được đi đầu và được nhúng vào quá trình phát triển phần mềm.

Nhưng mà, trong khi mà Agile đã đi 1 chặng đường dài để kết hợp các hoạt động và thực tiễn của việc phát triển và việc kiểm thử  thì, team vận hành vẫn yên lặng. Hai luồng công việc (Dev & Ops) thường không biết về các hoạt động của nhau.

Nếu có bất kỳ sai sót nào trên production thì việc điều tra sẽ tốn thời gian. Dev đã không có cái nhìn sâu sắc về việc ứng dụng của họ đã đang thực hiện như thế nào trong môi trường Product trong 1 thời gian dài, cũng không có sự minh bạch hay rõ ràng về sự hợp tác giữa 2 nhóm.

# Chào mừng bạn đến với mô hình DevOps
![](https://images.viblo.asia/780819ec-e31c-46fd-b4c6-045d8b4952e2.png)


DevOps đề cập tới sự hợp tác giữa nhóm vận hành và nhóm phát triển trong việc tạo, phân phối bảo trì phần mềm cũng như việc hỗ trợ người dùng. Nó đề cập tới 1 sự kết hợp liên tục của các tài nguyên, tiến trình và chính sản phẩm đó.

DevOps cho phép các phương thức tích hợp liên tục và phân phối giá trị cho người dùng cuối.

**DevOps đã mang tới cái nhìn mới về việc kiểm thử và tạo ra những cơ hội mới cho chính bản thân các tester.**

Trong kỉ nguyên mới này, các tester cần phải được liên kết với cả việc phát triển và vận hành phần mềm.
Việc kiểm thử không chỉ giới hạn chỉ trong sản phẩm mà còn là cả kiểm thử cơ sở hạ tầng nơi mà sản phẩm được thực thi nữa.

Tích hợp liên tục (CI) và phân phối liên tục (CD), đã trở thành các tiêu chuẩn thực tế trong việc phát triển và phân phối phần mềm, và do đó phần nhiều effort kiểm thử hiện nay đang dành cho việc đảm bảo các luồng CI/CD, môi trường và cơ sở hạ tầng.

Đây là điều cốt lõi hỗ trợ cho cả việc phát triển và phân phối sản phẩm phần mềm.

Nếu việc kiểm thử những thứ này bị bỏ qua, nó có thể dẫn tới việc môi trường không ổn định, tốn nhiều effort để điều tra các vấn đề về cơ sở hạ tầng bị lỗi lặp đi lặp lại, và cuối cùng có rủi ro cao đến sự phát triển và tốc độ phân phối sản phẩm phần mềm.

# Kiểm thử hiện đại - Phát triển phần mềm hướng chất lượng
Mặc dù nhiều thứ đã được để nâng cao chất lượng ở mọi giai đoạn phát triển phần mềm và dẫn đến kết quả là việc kiểm thử cũng có phạm vi rộng hơn nhiều, nhưng tôi tin rằng nhiều QA vẫn đang dùng hầu hết thời gian của họ để tìm những lỗi chức năng và tập trung vào việc xác minh phần mềm.

Hầu hết các QA không nhận ra sự quan trọng của vai trò và tác động của họ có thể có trong việc phát triển và phân phối phần mềm.
Mặc dù cũng có những sự thay đổi đáng kể trong thực tiễn phát triển trong hơn 10 năm qua, nhưng tôi cảm thấy rằng các tester vẫn giữ quan điểm lỗi thời về vai trò của họ và do đó họ vẫn cố thủ trong kỷ nguyên kiểm thử cũ.

Kiểm thử là 1 nghề và vai trò của 1 tester đôi khi cũng bị đe dọa dưới sự phát triển của “kiểm thử tự động”. Và thực tế là nhiều chuyên gia trong ngành vẫn tin rằng vai trò của 1 tester chỉ đơn giản là kiểm thử ứng dụng mà dev đã xây dựng, mà những điều đó thì có thể được tự động hóa.
Nếu các Dev là phù hợp hơn và quen thuộc hơn với việc viết các mã code cần thiết cho việc kiểm thử tự động thì điều gì là cần thiết đối với 1 tester trong team đó?

Nó chính là thời điểm chúng ta thay đổi về nhận thức đó. Chúng ta thừa nhận sự khác biệt về giá trị và các kỹ năng giữa “sự kiểm thử” và “sự đảm bảo chất lượng” đó là, việc kiểm thử xác minh và xác nhận đúng chức năng của phần mềm, còn đảm bảo chất lượng thì không phải là 1 hoạt động đơn lẻ. QA là 1 chuỗi tiến trình bao gồm việc kiểm thử, và các bản thực hành tốt nhất để đảm bảo 1 sản phẩm chất lượng được cung cấp cho người dùng. 

Chúng ta phải cố gắng phát triển theo hướng về chất lượng sản phẩm và coi nghề QA là chức năng cốt lõi và trung tâm trong sự phát triển và phân phối phần mềm, đó chính là sự giải thích cho Kiểm thử hiện đại.

QA bây giờ sẽ là 1 thành phần quan trọng (key member) từ lúc bắt đầu tới lúc kết thúc của toàn bộ tiến trình phát triển phần mềm. Và, mặc dù thường hay nói là tất cả mọi người trong nhóm phân phối sản phẩm là những người có trách nhiệm đối với giao cho khách hàng 1 sản phẩm chất lượng, nhưng mà tôi tin chắc rằng trách nhiệm của 1 QA là đảm bảo rằng các bản thực hành chất lượng được cả nhóm tuân thủ một cách nghiêm ngặt.
 ![](https://images.viblo.asia/d6ff9bd3-3d85-493d-be50-32b30ec691d4.PNG)

# Ai là các QA hiện đại

Có nhiều trường hợp, nghề kiểm thử được coi là con đường tiếp cận tới các công việc như Dev, PM hoặc các nghề khác thì thường sẽ có lợi hơn, 1 QA mới 1 vai trò có kỹ năng cao đòi hỏi kiến thức toàn diện về thực tiễn phát triển phần mềm.

Nó đòi hỏi 1 sự hiểu biết rộng về thực tiễn lập trình, sự đánh giá về các phương pháp và môi trường phát triển cũng như cũng như là các thách thức, phương thức và tiêu chuẩn về an ninh.
Vai trò hình chữ T không chỉ áp dụng chuyên môn và kinh nghiệm sâu rộng của họ vào các nhiệm vụ cốt lõi mà còn áp dụng rộng rãi và trong quá trình phát triển và kiến trúc phần mềm. 

Việc nằm ở trung tâm của bất kỳ dự án nào thì các QA hiện đại nên có sự hiểu biết rõ về kiến trúc, hiệu suất, bảo mật và các dịch vụ điện toán đám mây, các kỹ thuật và luôn khao khát học hỏi các công nghệ mới thì mới có thể tồn tại được trong trong vai trò này.

 ![](https://images.viblo.asia/47094871-38c1-462d-83e8-a39a5935e0b7.PNG)

Đã đến lúc thay đổi nhận thức về vai trò của QA và tester làm gì. Điều này bắt đầu từ chính các Tester. Điểm bắt đầu là sự quan tâm sâu sắc về chất lượng sản phẩm. 

Các tester không chỉ thực hiện việc kiểm thử chức năng và báo cáo lỗi. Vai trò của các QA phải nhiều hơn thế nhiều. Chúng ta phải được đưa vào dự án để đảm bảo chất lượng.

Khi mà chúng ta đi sâu vào kiểm thử 1 ứng dụng, chúng ta phải có hiểu biết sâu sắc về toàn bộ sự vận hành của hệ thống đó chứ khoogn chỉ nhìn ứng dụng như 1 hộp đen nữa. 

Để có được có được sự hiểu biết sâu sắc đó thì chúng ta phải liên tục học để theo kịp các công nghệ và các cách làm việc mới. Quan trọng nhất là các QA cần phải thích nghi được. Khi mà các QA hiểu về mục đích của họ trong 1 dự án và bắt đầu tin rằng vai trò của họ là trung tâm của sự phát triển và phân phối phần mềm, khi mà chúng ta chấp nhận các nguyên tắc kiểm thử hiện đại thì chỉ khi đó chúng ta mới có thể thay đổi được nhận thức của những người khác. 

# Kết luận

Thật sự để trở thành 1 QA hiện đại thì quả là điều quá khó để làm đúng không ạ. Thế nhưng có câu “Nothing is impossible” vì vậy hãy cứ khát khao hãy cứ dại khờ nếu bạn muốn thôi. ^_^