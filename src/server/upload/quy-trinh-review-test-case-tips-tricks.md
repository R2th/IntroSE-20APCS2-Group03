![](https://images.viblo.asia/1cdb1e4d-eff6-4223-9d38-30805d0413b0.png)

Bản thân tôi khi đi làm việc và tham gia vào các dự án thật đã được các anh chị có kinh nghiệm hơn giúp “Review test case” nhiều lần và đó dường như là task mà hầu hết công ty nào cũng đưa ra ở quy trình test một sản phẩm, tuy nhiên với những tester mới  vào nghề/ chưa làm việc ở các process chuyên nghiệp rõ ràng thì task này còn khá mơ hồ và ví dụ như bản thân tôi, khái niệm “ review test case” tôi mới biết được nó là 1 task quan trọng từ khi tìm hiểu các tài liệu ISTQB, còn trước đó thì tôi cũng không biết là nó quan trọng như thế nào. 
      Mới đây, khi tôi được assign vào một dự án mobile – lĩnh vực mà trước đó tôi chưa từng làm chuyên sâu bao giờ, thì tôi mới càng thấy được tầm quan trọng của việc review test case là như thế nào đối với quy trình kiểm thử nói riêng và quy trình sản xuất phần mềm nói chung cũng như mức ảnh hưởng của task này đói với việc đảm bảo chất lượng sản phẩm phần mềm. 
Ở topic viblo tuần này tôi xin được cùng mọi người tìm hiểu về những tips & tricks của “ Quy trình Review test case”
      Quá trình review test case rất quan trọng trong chu trình sản xuất phần mềm. Người viết cần đảm bảo rằng mọi chức năng được đề cập trong tài liệu đặc tả sản phẩm phải được bao phủ bởi test case. Test case cũng luôn cần phải được chuẩn hóa và theo sát những tiêu chuẩn khi thực hiện. Vì vậy, để thành công trong việc thực thi kiểm thử thì mọi test case cần được review lại cẩn thận. 
      
# I.	Những cách review test case
### 1.	Tự review
Đây là cách mà QA ( tester) – người viết ra test case tự mình review những test case do mình viết ra bằng cách rà soát lại test case và những tài liệu đặc tả sản phẩm cũng  như các tài liệu quy chuẩn của dự án để xem test case mình viết ra đã tối ưu chưa

•	Ưu điểm: 
Tốn ít thời gian vì người viết ra thì họ sẽ hiểu được bộ test case của mình nên họ đọc và hiểu test case nhanh hơn. Khi rà soát lại sẽ dễ dàng hơn

•	Nhược điểm:
Không hiệu quả. Do là cùng 1 người thì cách nhìn nhận vấn đề vẫn chỉ từ 1 chiều, và điều đó dẫn đến tính chủ quan nên sẽ không đạt hiệu quả cao.

### 2.	Review chéo
Đây là cách mà các QA trong cùng một team giúp nhau review test case chéo. Cách này còn được gọi là Marker / Checker

* Ưu điểm:
  - Khá hiệu quả vì mỗi QA trong team đều là người đã tìm hiểu tài liệu dự án kỹ càng cũng như nắm chắc các tiêu chuẩn viết test case
  - Sử dụng nhiều người để review sẽ đưa lại nhiều cái nhìn khác nhau về vấn đề nên sẽ giúp tăng tính bao phủ cho test case
  - Hỗ trợ rất tốt cho việc nắm vững những chức năng cần thực thi kiểm thử cho tất cả các member trong team tránh trường hợp ai viết và tìm hiểu test case chức năng nào thì chỉ biết về chức năng đó

* Nhược điểm: 
Mất rất nhiều thời gian và effort của toàn team

### 3.	Review bởi supervisor
Supervisor – có thể là test leader hoặc là người quản lý trực tiếp của QA đã viết lên test case. Yêu cầu là người supervisor cũng phải là người nắm rõ những yêu cầu chức năng và những quy chuẩn viết test case của dự án.

•	Ưu điểm: 
Supervisor thường là người có kinh nghiệm hơn và có nhiều cách nhìn hơn nên khi review test case sẽ đem lại hiệu quả. Ngoài ra QA viết test case có thể học hỏi được thêm nhiều kinh nghiệm sau khi được supervisor giúp review

•	Nhược điểm: 
Được review bởi “sếp” nên đôi khi sẽ thường “ được ép” yêu cầu thay đổi mặc dù có thể ý kiến sửa đổi đôi khi chưa đủ thuyết phục. 

Đối với ý kiến cá nhân tôi, tôi thấy phương pháp review chéo là hiệu quả nhất. Theo kinh nghiệm thực tế của bản thân tôi thì hầu như ở mỗi dự án, mỗi member sẽ được assign cho một function riêng để đọc hiểu tài liệu và tạo test case, bởi vậy khi review chéo giữa các member, bản thân mỗi tester không những có thể có thời gian tìm hiểu và hiểu sâu về các chức năng chính của toàn bộ hệ thống mà các member trong team còn có thể trao đổi, hiểu thêm về mindset và cách làm việc của nhau, đồng thời học hỏi  kinh nghiệm lẫn nhau. Việc nắm bắt được toàn hệ thống sẽ giúp ích rất nhiều cho việc thực thi test sau này và các member hoàn toàn có thể support và back up cho nhau khi cần thiết. Việc feedback và đưa ra ý kiến giữa các member cũng thuận tiện hơn và dễ dàng đóng góp ý kiến cho nhau hơn là việc supervisor và member. 
# II.	Một vài những lỗi thông thường hay xảy ra khi viết test case
1.	Lỗi chính tả: 
Lỗi chính tả đôi khi khiến cho ý nghĩa của câu từ sai khác đi gây ra những hiểu lầm nghiêm trọng khi thực thi kiểm thử
2.	Lỗi ngữ pháp:
Nếu viết câu trong test case không đúng ngữ pháp có thể dẫn đến việc thực hiện test case sai cách dẫn đến sai kết quả khi test
3.	Template format:
Nếu ngay từ đầu khi viết test case chúng ta đã tuân theo đúng 1 template format chuẩn thì sau này khi cần chỉnh sửa hoặc thêm bớt case sẽ rất dễ dàng
4.	Tiêu chuẩn/ chỉ dẫn
Trong quá trình review, điều quan trọng là phải xem test case đã được viết theo đúng các tiêu chuẩn, hướng dẫn đã đề ra trước đó hay không.
5.	Ngôn ngữ
Test case cần được viết bằng ngôn ngữ đơn giản, dễ hiểu
6.	Phạm vi chức năng
Khuyến khích rằng tất cả các chức năng chính cần được bao phủ hết và không bị bỏ sót
7.	Trùng lặp:
Đây là trường hợp mà các trường hợp kiểm thử bị trùng nhau, có thể 2 hoặc nhiều case dung để kiểm thử cùng 1 chức năng trong cùng 1 điều kiện, như vậy thì hãy gộp các case đã bị trùng lại làm 1 để tiết kiệm thời gian và không gian.
8.	Dự phòng: 
Là việc các case đã bị lỗi thời do việc cập nhật các tài liệu yêu cầu mà chưa update test case. Những case này cần được bỏ đi vì dư thừa.
Sau khi kiểm tra tất cả những lỗi trên thì người review sẽ note lại tất cả những điểm cần thay đổi hoặc chỉnh sửa để đưa ra thảo luận cùng với người viết test case và thống nhất cùng nhau.

# III.	Những điểm cần lưu ý / lời khuyên 
1.	Cần có sẵn sàng một bản tài liệu SRS ( Software requirement system) để xem xét đối chiếu
2.	Nếu bạn không chắc chắn về test case hoặc là expected result thì tốt nhất là bạn hãy thảo luận lại với khách hàng hoặc quản lý của mình trước khi đưa ra quyết định
3.	Nếu có thể, hãy thực hiện test case ở trên hệ thống test SUT( system under test) để có thể hiểu hơn về expected result cũng như các bước thực hiện
4.	Tốt hơn hết là nên thảo luận Face-to-face giữa người review và người viết ra test case để giúp họ hiểu hơn về những điều đã được feedback
5.	Khuyến khích rằng các bạn nên đánh số version cho những bản review. Bởi sau nhiều lần chỉnh sửa chúng ta sẽ có những bản back up để so sánh đối chiếu.

Ngoài ra, dựa vào chút kinh nghiệm của bản thân mình thì tôi muốn gợi ý 1 số chú ý sau:
-	Ngay từ trước khi tiến hành viết test case, test leader cần phổ biến cụ thể những quy chuẩn viết test case: flow đi như thế nào, sẽ chia nhỏ test case đến mức độ nào, ngôn ngữ cần sử dụng như thế nào, có những từ cần dùng chung thống nhất ra sao… để hạn chế những lỗi nhỏ không cần thiết
-	Bên cạnh những tiêu chuẩn của dự án cần phải theo, các tester member và cả test leader cũng không nên quá cứng nhắc và máy móc trong công việc và cả khi review test case. Bạn có thể đưa ra quan điểm trên góc nhìn của bạn nhưng cũng hãy lắng nghe và tôn trọng quan điểm của đồng nghiệp. 
-	Nếu có khúc mắc khi trao đổi thảo luận giữa hai bên, hãy tham khảo ý kiến của bên thứ 3 có kinh nghiệm hơn

 Mỗi chúng ta khi thực hiện một công việc đều có chút ảnh hưởng bởi lối mòn kinh nghiệm, bởi tính chủ quan cá nhân và dĩ nhiên hai thứ đó đều rất hạn chế và chẳng bao giờ là đủ, chính bởi vậy việc thu thập thêm ý kiến của  những đồng nghiệp, leader và việc rà soát lại công việc của mình là một điều hoàn toàn cần thiết để thực hiện. Công việc Quản lý chất lượng của tôi và các đồng nghiệp chưa bao giờ là một công việc dễ dàng thậm chí còn cần sự cẩn thận tỉ  mỉ rất nhiều. Bản thân tôi cũng luôn hy vọng mình sẽ luôn tích lũy được kinh nghiệm để đưa vào dự án giúp cho chất lượng sản phẩm mà mình quản lý ngày một tốt hơn. Task review test case còn rất nhiều kiến thức và tips khác mà chúng ta cần học hỏi trau dồi và tôi sẽ cố gắng phát triển nó ở những topic tiếp theo.
 
 Tham khảo: http://www.softwaretestingclass.com/test-case-review-process-tips-and-tricks/