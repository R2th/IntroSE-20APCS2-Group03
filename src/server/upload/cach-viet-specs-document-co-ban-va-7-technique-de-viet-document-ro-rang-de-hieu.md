Nguồn bài viết : [サンプル例に見る機能仕様書の基本的な書き方＆読みやすくする7つのテクニック](http://www.atmarkit.co.jp/ait/articles/1502/06/news013.html)

Trong bài viết trước tác giả đã giải thích tầm quan trọng của document đối với communication trong dự án phát triển hệ thống IT, trong đó đã giới thiệu về 1 trong 3 loại document quan trọng là  “Functional Specifications của Joel”. Trong bài viết này tác giả sẽ giải thích cụ thể  về cách viết loại document này.
　

# “Functional Specifications của Joel” là gì？
　 “Functional Specifications của Joel” là loại Specifications document về các màn hình và thao tác sử dụng software dựa trên quan điểm người dùng, là loại document chia sẻ thông tin giữa người dùng và người phát triển hệ thống. 
  Vì không phải là document dành cho engineer nên tránh dùng nhiều từ ngữ chuyên ngành kĩ thuật khó hiểu.
　
# Cách viết document cơ bản
Document gồm các mục sau

**『Mục lục』**

　Nếu document có trên 10 trang thì nên có mục lục và nếu có thể thì nên sử dụng những tool tạo mục lục  tự động.

**『Mở đầu』**

Mục này sẽ viết vị trí các phần trong document và các lưu ý đối với người đọc khi đọc document.
Ví dụ như trong document của Joel, ông viết là “Đây không phải là một document hoàn thiện”, nghĩa là document giống như 1 vật thể sống, sau này sẽ còn được cập nhật nhiều lần.  Viết như thế này sẽ giúp người đọc tránh được hiểu lầm rằng đây là 1 document đã hoàn thiện không có sửa đổi gì nữa.
Ngoài ra cũng có thể viết  về mục đích của hệ thống, suy nghĩ nhắn nhủ với engineer…

**『Scenario』**
　
 
 Để biết được hình ảnh của hệ thống khi thực tế sử dụng sẽ như thế nào thì cần viết scenario (story) theo cách nhìn của người dùng.

*・Scenario là gì？*

Scenario là văn bản viết các sự việc xảy ra theo mốc thời gian đúng theo trình tự triển khai của story. Những nhân vật sẽ xuất hiện và hành động của nhân vật đó, cùng với kết quả xử lí trả lại từ hệ thống được viết theo trình tự diễn ra 1 cách cụ thể.


*・Cách viết scenario*

Để người đọc không bị hiểu nhầm thì cần viết càng cụ thể càng tốt về tình huống sử dụng 1 cách dễ hiểu, ví dụ như đặt tên cho nhân vật, địa điểm sẽ xuất hiện.

Trường hợp nội dung quá phức tạp không thể viết hết trong 1 scenario thì nên chia ra theo đơn vị chức năng hoặc đơn vị màn hình, điều chỉnh cho phù hợp với từng hệ thống.
　

**『Đối tượng ngoài』（hoặc là phạm vi ngoài）**


　Phần này sẽ viết những đối tượng ngoài phạm vi xử lí của hệ thống. Theo một ý nghĩa nào đó thì đây có lẽ là 1 trong những quan trọng nhất.
　
 
 Trong quá trình làm dự án, khi phát hiện ra chức năng không có ghi trong document thì sẽ xảy ra 2 cách giải thích như sau:
1. Đây là chức năng cần thiết phải làm mà quên không viết vào document
2. Nếu không viết trong document thì chắc chắn là chức năng không cần làm

Trong hầu hết các trường hợp, 2 cách lý giải này sẽ gây ra hiểu nhầm , thường phía người dùng sẽ lý giải theo cách 1 còn team phát triển sẽ lý giải theo cách 2.


Để tránh gây ra hiểu nhầm như thế này thì nên viết những chức năng không làm vào mục “đối tượng ngoài” ở ngay phần đầu của document nơi dễ nhận thấy. 


**『Flow chart khái quát』（hoặc là Overview）**

Đây sẽ là mục giải thích khái quát toàn bộ hình ảnh các chức năng của hệ thống trước khi đi vào các chức năng cụ thể.
Có thể viết dạng flow chart hoặc bất cứ dạng nào khái quát được tổng thể toàn thể hệ thống. Thường có những loại như sơ đồ di chuyển màn hình, bản đồ flow nghiệp vụ, bản đồ usecase, list các chức năng…

Tất nhiên nếu văn bản có thể giải thích được đầy đủ cụ thể thì cũng không có vấn đề, quan trọng là nhìn từ quan điểm của người dùng có dễ hiểu hay không.

**『Specification theo từng màn hình』（Specification chi tiết）**


Phần này sẽ giải thích chi tiết các chức năng đã giải thích cơ bản ở phần “Khái quát”, là phần quan trọng nhất của 1 specification document.

Cần chú ý viết đủ, không sót các mục trong phạm vi đã nêu ra ở phần khái quát. Để làm được điều này cần phải chia mục 1 cách đầy đủ và hợp lí.

Màn hình có thể thực tế nhìn thấy nên là 1 đơn vị chia dễ hiểu và khó có thiếu sót.
Ngoài ra còn có cách chia theo đơn vị chức năng , theo đơn vị input, output dữ liệu…

*・Đặt tên cho các mục đã chia chi tiết*

Khi đã chia các mục chi tiết rồi thì cần đặt tên cho chúng, nhằm giúp bất kì ai khi đọc document đều không bị hiểu nhầm mà có thể hiểu ngay được. Ví dụ như màn hình A, chức năng B, file C…đặt tên theo quy tắc cụ thể và ngắn gọn.

*・Viết về các chức năng một cách cụ thể, chi tiết*

　Viết từng chức năng của hệ thống một cách cụ thể, chi tiết để người dùng có thể hiểu được.
Bắt đầu từ chức năng cơ bản, rồi đến chức năng phụ trợ, hoạt động của màn hình, dữ liệu và file được export ra , các thao tác xảy khi có lỗi…nếu cần thiết sẽ có thêm các mục nhỏ trong từng chức năng.
　
 
 Ở đây, quan điểm giải thích cũng là nhìn từ phía người dùng, xem người dùng nhìn hệ thống như thế nào rồi mới viết giải thích.
Giải thích chi tiết này chính là điểm xuất phát quan trọng của document thực hiện, bởi trong quá trình thực hiện và test, để confirm mục đích và ý nghĩa của từng chức năng thì engineer cần xem lại document này rất nhiều lần.

**『Những vấn đề chưa quyết định』（Hay To be determined - TBD）**
　

Mục này sẽ viết những vấn đề hiện tại chưa thể giải quyết, quyết định được ngay, trong quá trình phát triển hệ thống rất hay nảy sinh ra những vấn đề như thế này.
Để tránh việc bị thiếu trong quá trình viết thì khi nhận thấy vấn đề cần viết ngay lại chứ không chờ sau này mới tổng hợp lại.
　

**『Technical memo』（Memo đặc biệt）**
　

Phần này sẽ viết những ghi chú cho tầng độc giả đặc biệt.
Người viết document hầu hết là người xuất thân từ ngành kĩ thuật. Document phải viết theo quan điểm của người dùng nhưng trong khi viết nhiều khi người viết nảy ra ý tưởng về cách giải quyết các vấn đề kĩ thuật. Nếu quên mất thì sẽ rất lãng phí nên cần tạo một mục gọi là “Technical memo” để ghi lại những ý tưởng như vậy.

Sau này những ghi chú này có khả năng trở thành hint quan trọng engineer, và vì đã chia thành mục riêng biệt nên những người không quan tâm đến vấn đề kĩ thuật có thể bỏ qua.
Đồng thời, với những memo liên quan đến test thì tạo 1 mục là “Test memo”, liên quan đến security thì là “Security memo”…để ghi lại những điều cần thiết.


# 7 technique để viết được document dễ đọc, dế hiểu
　

**【1】Viết câu ngắn gọn rõ ý**

Viết từng câu càng ngắn càng tốt, nếu câu dài thì nên chia ra. Nên tránh cách viết mơ hồ, câu mang nhiều ý nghĩa, trong khả năng có thể viết câu ngắn gọn , ý nghĩa trọn vẹn trong 1 câu để người đọc dễ hiểu hơn. 

Trong trường hợp nội dung nhiều không thể nói hết trong 1 câu thì dùng cách viết như “Nguyên tắc là…, tuy nhiên…”, đầu tiên nêu nội dung chủ đạo rồi sau đó thêm vào các trường hợp ngoại lệ, từ đó nêu rõ được ý muốn nói.
　

**【2】Không tạo document template**


Trong các doanh nghiệp hay tổ chức thường hay có những template cơ bản định hình các mục nên viết trong document, song điều này không được khuyến khích đối với người viết thông thường.
Mỗi dự án phát triển lại có những nội dung, chức năng, quy mô, kiến trúc hệ thống khác nhau, từ đó mà những mục nên viết trong document cũng sẽ khác nhau. Vì vậy điều quan trọng là cần liệt kê được các mục cần có này khi thiết kế hệ thống.

Nếu cứ cố gắng tạo 1 template thì sẽ cần kết hợp các mục trong  document của dự án 1 tỉ yen với dựa án 2 triệu yen, chỉ có cách đó mới tránh được việc thiếu sót khi liệt kê ra các mục cần thiết.
Template cũng có thể tạo được, tuy nhiên chỉ giới hạn ở lĩnh vực và quy mô của đối tượng hệ thống cụ thể.

**【3】『Tiêu đề, các đầu mục』chiếm 80% document**


Để viết được document rành mạch dễ hiểu cần viết được nội dung 1 cách cụ thể, chi tiết, chia nhỏ các mục ra chứ không được viết gộp hết vào 1 mục. Chúng ta có thể sử dụng triệt để tiêu đề để làm được điều đó.

Tiêu đề chính là tên của 1 mục, có thể viết nội dung trước gắn tiêu đề sau, tuy nhiên nếu có thể thì nên xác định tiêu đề trước khi viết. Điều này sẽ giúp tránh được sai sót, giúp document rõ ràng dễ hiểu. Theo kinh nghiệm bản thân tác giả thì chỉ cần viết được hết ra các tiêu đề của đề mục là có cảm giác như đã hoàn thành 80% document rồi.

**【4】Thứ tự các mục có thể quyết định sau**


Ngay khi mới bắt đầu viết document thì sẽ có trường hợp chưa nhìn thấy được hình ảnh toàn cảnh, cấu trúc của document nên khi đó chưa cần quan tâm đến thứ tự các mục mà cứ viết hết ra những mục được cho là cần thiết. Sau đó đến 1 thời điểm nhất định sẽ nhìn ra được mối quan hệ giữa các mục, khi đó sắp xếp thứ tự cho chúng cũng chưa muộn.

**【5】Những vấn đề chưa được quyết định gây băn khoăn**


Nếu trong khi viết có những vấn đề chưa rõ ràng, chưa được quyết định thì cũng không nên băn khoăn mà dừng lại, chỉ cần đánh dấu chúng là “TBD – To be determined” là được. Những vấn đề này sẽ được giải quyết ở những cuộc họp hoặc điều tra, nghiên cứu riêng, khi đã được giải quyết rồi thì sẽ cập nhật lại document.

**【6】Đùa vui trong chừng mực**

Đặc biệt trong khi viết scenario thì để cho dễ hiểu và việc đọc trở nên thú vị hơn thì có thể sử dụng những câu đùa, tuy nhiên nên ở trong chừng mực và khi viết thì nên xem xét đối tượng đọc là ai.
　

Trong document của Joel có xuất hiện những câu đùa mà chỉ riêng những người trong một tổ chức mới hiểu được, song về cơ bản ở các document thì nên sử dụng ngôn ngữ formal tránh gây cảm giác là 1 tác phẩm mang xu hướng cá nhân hay thương hiệu riêng của cá nhân.

**【7】Thường xuyên giữ cho document là 1 “thực thể sống”**

Trong quá trình phát triển dự án người chịu trách nhiệm viết document cần phải thường xuyên cập nhật những thay đổi về chức năng, về những yêu cầu mới quyết định…điều này đồng thời tạo nên thành công cho document và cả dự án. Bởi như đã nói ở phía trên, việc này mang lại lợi ích trong nghiệp vụ phát triển dự án và tránh được những rủi ro không đáng có.

Khi người viết cập nhật những thay đổi trong document thì những người liên quan khi nhìn vào sẽ thấy ngay được sự thay đổi của dự án, đống thời so sánh được nội dung mới và nội dung cũ để nắm được nội dung thay đổi.

***Nên sử dụng tool nào để viết document***


Việc sử dụng tool nào là tùy thuộc vào ý thích của người viết, song cơ bản thì nếu thỏa mãn được các điều kiện dưới đây thì sẽ viết được document dễ hiểu.
1.	Dễ dàng tạo được những đoạn văn bản có tiêu đề
2.	Dễ dàng chia sẻ được phiên bản online mới nhất 1 cách thường xuyên 
3.	Có thể thêm vào bảng hay biểu đồ.
4.	Có thể xác định được lịch sử thay đổi cũng như các nội dung đã thay đổi

***Những tool mà tác giả hay sử dụng***

•	A.  Google document＋「Table of contents」add-on

•	B.  Microsoft Word

•	C.  Markdown text＋Subversion（hoặc là Git）
　

***Những tool nên tránh***

Đầu tiên là các tool tạo slide giống như Microsoft PowerPoint, bởi các slide tạo cảm giác mỗi slide là một đơn vị thông tin, nên sẽ không thể hiện được tính logic toàn bộ của document.

Ngoài ra với cùng lý do kể trên thì những tool như Microsoft Excel cũng nên tránh bởi chúng chia đơn vị theo sheet, theo cell gây khó khan trong việc thay đổi, sửa chữa vì document thường đi theo một mạch liên kết toàn thể.


***Ai là người nên viết document***

　
Theo Joel thì người nên viết document là program manager, người này sẽ đứng giữa team phát triển và người dùng để quyết định, điều chỉnh specification cho phù hợp.

Tuy nhiên ở mỗi team thì các vị trí lại có tên gọi khác nhau nên theo tác giả thì người thỏa mãn những điều kiện dưới đây nên là người viết document.

Điều kiện của người viết document
1.	Có thể viết được văn bản rõ ràng rành mạch, logic
2.	Có thể đối thoại với người dùng và hiểu được người dùng
3.	Xuất thân là nguời làm kĩ thuật hoặc có được kiến thức kĩ thuật trong 1 lĩnh vực cụ thể
     - Không viết document không thể hiện thực hóa trên phương diện kĩ thuật

     
      
      - Có thể đối thoại với team phát triển
	 - Không nhất thiết cần là 1 programmer giỏi
4.	Ít nhất cần có kiến thức cơ bản về thiết kế UI/UX
5.	(Trường hợp phát triển sản phẩm của công ty) Cần có hiểu biết về đối tượng thị trường của sản phẩm
　Khó ai có thể đáp ứng được tất cả những yêu cầu kể trên, song ít nhất thì cũng cần phải viết được văn bản rõ ràng dễ hiểu hợp logic

# Tổng kết
Trong bài viết lần này tác giả đã giải thích cụ thể cách viết document theo phong cách của Joel, làm giảm communication lost giữa người dùng và team phát triển, từ đó tăng năng suất cho toàn dự án.

# Chủ đề lần tới : Design doc
Lần tới tác giả sẽ giới thiệu loại document còn lại của seri bài viết này là Design doc, mong mọi người sẽ chú ý đón đọc nhé.