![](https://images.viblo.asia/e8e1032e-2d21-425d-a7d8-745b0d8c6694.jpg)

## Mở đầu

Chào tất cả các bạn trong ngành :raised_hands:

Mình là một BrSE theo nghề được gần tròn 2 năm ( 5 ngày nữa là kỉ niệm 2 năm mình làm việc tại cty). 

Nửa năm trở lại đây, mình bắt đầu được quản lý một dự án đúng nghĩa "từ đầu đến cuối", có nghĩa là mình đã trải qua đầy đủ các  công đoạn trong một quy trình phát triển phần mềm.

Dự án đầu tiên đó gần kết thúc, với rất nhiều những vẫn đề mình nhận thấy phát sinh từ việc quản lý specs kém hiểu quả

Dự án mới thì cũng đang bắt đầu, và để tránh "đạp phải vết xe đổ", mình đang dành nhiều thời gian cho việc tìm  hiểu kĩ hơn về quá trình làm tài liệu yêu cầu/ thiết kế hệ thống.
Và đặc biệt quan tâm tới tài liệu Đặc tả yêu cầu phần mềm (Software Requirement Specification, SRS). Chuẩn IEEE của tài liệu này cũng như guidline hướng dẫn cách viết có khá nhiều trên mạng nên các bạn có thể tham khảo nhé.

Trong lúc tìm kiếm thì mình có đọc được một bài viết mà title cũng là title mình đặt cho bài viết này của một bác chuyên viết Docs SRS làm trong nghề đã hơn 30 năm (link bài viết gốc ở cuối bài). Thật sự mình rất tâm đắc vì những bài học này nó rất thiết thực với những ai thực sự quan đến chất lượng của quá trình này.

Rất hân hạnh được giới thiệu đến các bạn nội dung của bài viết đó, mình chia làm 2 phần vì nội dung khá dài. Mình vừa dịch vừa truyền đạt, sửa đổi một chút theo những kinh nghiệm bản thân mình. Các bạn quan tâm hãy góp ý, trao đổi nội dung với mình để chúng ta cùng tiến bộ nhé!

Đối tượng đọc bài viết
1. Các vị trí đảm nhiệm việc "Đăc tả yêu cầu phần mềm" có thể là BrSE, BA, PM
2. Tất cả các role còn lại trong team phát triển, để có thể review được tài liệu mà các vị trí kia soạn thảo, góp phầm giảm thiểu sai sót, nâng cao tính toàn diện, chính xác của tài liệu


### Bài Học #1: Nếu không xác định được đúng yêu cầu, thì công sức ở các giai đoạn sau của dự án coi như vô nghĩa. 

Chúng ta đều biết mục tiêu của một dự án phát triển phần mềm là tạo ra một sản phẩm đem lại giá trị cho một nhóm đối tượng khách hàng. 

Nằm trong Giải đoạn "Khởi tạo dự án" - quá trình "Đăc tả yêu cầu" là nhằm xác định các **tính năng** và **tính chất** trong một giải pháp phần mềm mà tạo ra được tốt nhất giá trị này.

Những nhận thức của chúng ta về giải pháp đó sẽ được dần làm sáng tỏ theo thời gian khi Khách Hàng (KH) ngày càng hiểu rõ hơn kỳ vọng và nhu cầu thật sự của họ. 

Nếu BrSE/ BA không đáp ứng đươc thưc tế trên, tức là quan tâm thỏa đáng và đầu tư thời gian để làm rõ được những kỳ vọng này thì cơ hội một sản phẩm khi hoàn thiện thỏa mãn nhu cầu KH sẽ rất mong manh.

Một kỹ thuật để chúng ta có thể kiểm nghiệm tính những yêu cầu này đúng, đó là làm việc thường xuyên với những KH "chủ chốt" (Product Owner) để làm rõ những **Tiêu chí chấp thuận sản phầm (acceptance criteria) ** hay **Bộ test chấp thuận sản phầm (acceptance tests)**. 

Những tiêu chí này sẽ giúp chúng ta xác định được đâu là những điểm quan trọng trong sản phẩm mà KH quan tâm và trả tiền cho chúng ta vì nó! 

Còn **Bộ test chấp thuận** chỉ nên dùng làm tư lliệu tham khảo, là những testcase/checklist những xử lý (behavior) của sản phẩm mà KH mong muốn, 
không thay thế nó với các quy trình Test quy dịnh của dự án.

### Bài học #2: "Đặc tả yêu cầu phần mềm" là cả một quá trình khám phá và xây dựng, không đơn thuần chỉ là "quá trình thu thập các yêu cầu"

Mọi người thường hay gọi quá trình này là "thu thập các yêu cầu", khiến quá trình này được hiểu là: các yêu cầu đã được phơi bày, sẵn sàng, và chờ đợi BA/BrSE lấy ra từ trong đầu của KH. 

Nhưng bản chất của nó không đơn thuần như thế! 

Từ những thông tin yêu cầu mà KH cung cấp, chúng ta cần tiếp tục có những phân tích đánh giá để thậm chí "sáng tạo" tìm tòi ra những yêu cầu đúng đăn, mang lại giá trị. 

Hơ nữa, "Đặc tả yêu cầu phần mềm" là một quá  trình **lặp đi lăp lại**, cụ thể, KH trong một buổi thảo luận về yêu cầu phầm mềm, sẽ rất khó để có thể mô tả hết những điều họ mong muốn, chính họ cũng cần thời gian để hiểu hơn về chính sản phẩm của mình.

Do đó, BrSE/ BA không đơn thuẩn chị bấm máy lưu lại yêu cầu của khách hàng "từng từ từng từ" một, mà cốt lõi là tiến hành "điều tra" (bằng nhiều cách thức, những câu hỏi khéo léo, công cụ khác nhau,...), để khiến KH động não, lột vỏ những thông tin đang còn được che đậy - không chỉ một mà nhiều lần, trong suốt quá trình phát triển dự án.

### Bài học #3:  Thay đổi sẽ luôn xảy ra

Thay đổi trong yêu cầu phần mềm là một thưc tế không thể tránh khỏi. 

Nội bộ KH xảy ra những bất đồng ý kiến, hay enduser thay đổi nghiệp vụ, hay nhóm đối tượng, hoặc thị trường sử dụng mới được phát hiện, hay có thay đổi trong thể chế chính trị, kinh tế...
là những tác nhân có thể kể đến gây ra những sự thay đổi này.

Trong khi tâm lý của nhiều developer vẫn còn e ngại với sự thay đổi.... thì việc áp dụng những Phương pháp phát triển phần mềm thích ứng với sự thay đổi như Agile chính là lời giải cho vấn đề này. 

Gần như tất cả các dự án phầm mềm sẽ dần trở nên lớn hơn so với ước tính ban đầu. Do đó dự đoán những thay đổi có thể xảy ra để bổ sung **buffer/ dự trù thời gian** vào kế hoạch phát triển là việc không bao giờ là thừa.

### Bài học #4: Mong muốn của các "Stakeholder (bên liên quan)" thì "mỗi người một ý"...

Trước tiên chúng ta cần hiểu Stakeholder là những thành phần tham gia có ảnh hưởng về quan điểm cá nhân đến quá trình phát triển sản phẩm hay đăc tính + chức năng của sản phẩm.

![](https://images.viblo.asia/2372a8ee-0210-4549-990f-53fcdd2080bd.png)

Sơ đồ dưới đây mô tả một ví dụ mà trong đó các stakeholder được chia làm 3 phân nhóm:
* Project team (đội phát triển): gồm PM, BA, Developer, QA, Infra...
* Developing Organization (công ty của nhóm phát triển): gồm CEO, PMO, Sales...
* Ouside the Developing Organization: Enduser, KH, Thành viên chính phủ, Tester của bên thứ 3...

Nhìn vào sơ đồ này, thì phải nói rằng, vai trò của BA/BrSE trong việc làm thế nào để giao tiếp có hiệu quá với các stakeholder để tìm ra một giải pháp phần mềm thỏa mãn nhất với mong muốn của các bên là rất quan trọng.

Một gợi ý đó là thay vì lấy ý kiến của từng cá nhân, thì ở đầu dự án, hãy nhóm các cá nhân này vào các nhóm, sau đó tìm ra Key member - descision maker của từng nhóm - những người mà tiếng nói của họ ảnh hưởng nhất. Chính họ sẽ là nhân tố giải quyết mâu thuẫn về quan điểm và giúp chúng ta chốt các yêu cầu. 

### Bài học #5: Sự tham gia của Khách Hàng (KH) là nhân tố tối quan trọng quyết định đến chất lượng của sản phẩm

Hãy tưởng tự một dự án mà khách hàng chỉ trao cho đội dự án đôi dòng đặc tả về những tính năng họ muốn cho một phần mềm, và yêu cầu chúng ta phải xây dựng nó.

Rõ ràng trên đây là một kịch bản không ai chúng ta muốn nó xảy ra. 

Trên thực tế, câu chuyện không quá bi kịch như trên, nhưng chuyện khách hàng luôn than phiền rằng họ có rất ít thời gian để có thể thảo luận về **yêu cầu phần mềm** thì không hiểm chút nào. Và khi mà sản phẩm hoàn thành, họ lại có hàng tá thời gian săm soi những điểm mà họ không hài lòng trên sản phẩm...

Câu chuyện sẽ không trở nên "thàm kịch" nếu như chúng ta khai thác được tối đa những mong muốn của họ càng sớm  càng  tốt,.. đừng để implement xong rồi mới chờ review...

Như mình có nhắc đến ở các bài học trên, quá trình "đặc tả yêu cầu" không đơn thuần là tổ thu thập thông tin trong đôi buổi thảo luận/ video meeting... mà nó là xuyên suốt thời gian phát triển dự án đòi hỏi đội dự án phải theo sát đồng hành cùng khách hàng, liên tục kiểm tra những mong muốn, kỳ vọng của họ...

to be continue...

*Original article: https://medium.com/swlh/ten-cosmic-truths-about-software-requirements-edd33292a456*