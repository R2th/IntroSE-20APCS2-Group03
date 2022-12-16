Definitive guide for performance engineer.

Bạn đang gặp vấn đề với performance?
API của bạn có thời gian phản hồi quá lâu?
Server của bạn thường xuyên quá tải?
Hay hoá đơn cloud đập vào mặt bạn những con số quá kinh khủng dùng mới chỉ có một nhúm người dùng?

Nếu bạn đang gặp phải những vấn đề trên, hay chỉ đơn giản bạn là một developer đang mong muốn tăng lương mà chưa biết nên lấy lý do gì?

**HÃY ĐỌC TIẾP, BÀI VIẾT NÀY LÀ DÀNH CHO BẠN**.

![Performance Optimization](https://images.viblo.asia/f69c36bf-63a2-4642-bfbc-88ebb420143b.jpeg)


## First things first

Xin chào các bạn, lại là mình đây, **Minh Monmen** trong sự trở lại đầy ngoạn mục đầu năm 2021 với series **Performance Optimization Guideline** - Hướng dẫn gối đầu giường của performance engineer. Đây là một dự án cá nhân đầy thách thức được mình ấp ủ đã lâu từ khi bước chân vào con đường Solution Architect với mong muốn sẽ cung cấp cho các bạn, những developer, devops, solution architect hay cụ thể hơn là performance engineer những hướng dẫn cơ bản nhất để có thể giải được những bài toán khó mãn tính là **optimize performance**.

**Performance Optimization Guideline** sẽ được mình tổng hợp từ kiến thức bản thân mấy năm đi làm, cũng như kết quả nghiên cứu dùi mài kinh sử của mình trong lĩnh vực tối ưu performance, do đó nó sẽ không chỉ có phần tóm tắt những lý thuyết hay cách tiếp cận thông dụng, mà sẽ chứa rất nhiều usecase mình đã từng gặp trong quá khứ. Rất mong rằng tất cả anh em không phân biệt già trẻ lớn bé gái trai sau khi đọc series này thì cũng đều rút ra được những kinh nghiệm để áp dụng cho công việc của chính mình, đồng thời sẽ góp ý đóng góp thêm cho mình để series này hoàn thiện và tiếp cận được tới nhiều người hơn.

Vì là một dự án dài hơi, cho nên mình cũng không biết chắc lắm liệu mình sẽ hoàn thành được nó trong bao lâu, hay thậm chí là có đủ khả năng hoàn thành không. Nhưng được tới đâu hay tới đó vậy, mong là mình có thể giữ được lịch 1-2 tuần release 1 chap để phục vụ các bạn. Và cũng bởi vì đây là dự án kéo dài qua nhiều bài viết, do đó mình cũng không chắc chắn hoàn toàn về nội dung của những bài viết sau này, do đó mình để ở đây 1 cái mục lục sương sương thôi nha. Mình nghĩ ở đây chắc sẽ nhiều bạn giống mình thường ngại đọc sách nên nếu nhìn thấy những thứ dài dài thì hay hoảng sợ =))), nhưng mong là các bạn sẽ yên tâm mà đọc hết series nha, bởi vì chính mình là người còn thực dụng và lười hơn cả các bạn cơ, sẽ không đưa những thứ dông dài trong sách vở ra làm gì nếu không thật sự thấy cần thiết. Ngoài ra mình sẽ cố lồng ghép thật nhiều câu chuyện thực tế để các bạn đỡ buồn ngủ nữa :D.

Đây là nội dung sơ bộ của series này:
- **Chap 1: Performance Optimization: what, why, who, when, where, how?**
- [**Chap 2: Scalability và câu chuyện về ảo tưởng distributed**](https://viblo.asia/p/scalability-va-cau-chuyen-ve-ao-tuong-distributed-3Q75wQA9ZWb)
- [**Chap 3: Nghệ thuật tìm kiếm bottleneck**](https://viblo.asia/p/performance-optimization-103-nghe-thuat-tim-kiem-bottleneck-jvEla784Kkw)
- **Chap 4: Trinh sát ứng dụng với monitoring / profiling**
- **Chap 5: Database optimization - Đuổi bắt kẻ tội đồ**
- **Chap 6: Caching optimization - Con đường lắm chông gai**
- **Chap 7: Buffering optimization - Bước đệm cần thiết**
- **Chap 8: Connection optimization - Những cái chết đau thương**
- **Chap 9: Coding optimization - Liệu có đáng không?**
- **Chap 10: System optimization - Khi nhịp tim ở 3GHz**
- **Chap 11: Architect optimization - Trở lại vạch xuất phát**

**CALL TO ACTION**: UPVOTE và CLIP bài viết này để sau này đọc lại mà thực hành các bạn nhé. (Ngoài ra nó cũng cổ vũ mình viết tiếp nữa). Các bạn sẽ không thật sự **MUỐN** học tập 1 thứ gì đó cho tới khi bạn cảm thấy **CẦN** nó. **Thật sự cần ấy!** Nói vậy có nghĩa là những thứ mà mình sắp nói đây, hoặc những thứ các bạn đã từng buộc phải học, **chắc chắn sẽ có ích**, chỉ là giờ bạn chưa có cần, nên nếu nhớ được thì tốt mà không nhớ được thì cứ save lại cũng được roài.

**Let do it! NOW!!!**

## Giới thiệu (tiếp)

Tiếp tục chương trình là 1 phút dành cho quảng cáo.

**Tác giả**

Tên: **Minh**

Nghệ danh: **Monmen**

Lĩnh vực công tác: **Backend**, **Devops**, **Solution Architect**

**Performance Optimization 101: what, why, who, when, where, how?**

Chapter này sẽ trả lời 6 câu hỏi khởi nguồn của mọi vấn đề: 5W + 1H, chứa những định nghĩa cơ bản về performance optimization (1 cách có hệ thống và khoa học do mình phịa ra). 

Ban đầu thì suy nghĩ của mình là: 1 mớ lý thuyết về bơi sải thì chả quan trọng bằng việc lao mặt xuống biển và để đại dương vả vào mặt bằng những con sóng thần. Và đúng là sau khi thử như vậy, cũng đã uống no nước biển rồi thì con người ta tự khắc sẽ biết... đường mà không nghĩ ngu như vậy nữa. Tới lúc cần thì mình mới cảm thấy những tháng ngày học lập trình cơ bản nhàm chán với pascal, những đêm đọc về những concept cơ bản để sớm hôm sau đi phỏng vấn nó có ích với mình như nào.

Vậy nên bài viết này là 1 chút lý thuyết để các bạn có 1 cái nhìn tổng quát và hiểu được chúng ta sắp làm gì trong những bài tiếp theo. Thêm nữa là để chứng minh mình không chém gió suông mà những kiến thức này từ lâu đã được đúc kết trong sách vở roài.

Okay, giờ bắt đầu thật nè.

## Performance Optimization là gì?

**Performance Optimization** là hoạt động tối ưu **hiệu suất** của hệ thống. Nói theo phương diện của dân kinh tế bọn mình thì nó chính là tối ưu **kết quả đầu ra** dựa trên **nguồn lực đầu vào hữu hạn**.
Ví dụ:
- Bạn có 1 thời gian hữu hạn đầu vào là **8 giờ làm việc**
- Bạn có 1 kết quả đầu ra là **số sản phẩm**
- Performance hiện tại của bạn là **100 sản phẩm / 8 giờ**

Vậy thì **Performance Optimization** chính là làm sao để tăng cái phân số **100sp / 8h** của bạn lên, có thể là tăng giảm 1 yếu tố như **150sp / 8h** hoặc **100sp / 6h**, hay cả 2 yếu tố như **150sp / 6h**.

Tới đây vẫn là dễ hiểu đúng không? Mình xuất phát từ dân kinh tế, nên các bạn sẽ thấy cách tiếp cận của mình nó sẽ tràn ngập màu sắc kinh tế, và cái nhìn của mình cũng sẽ rất thực dụng nữa. Hãy làm quen với điều này nhé.

Vậy đối với công việc đặc thù trong ngành chúng ta như Developer, System Admin hay cao hơn là Solution Architect thì **Performance Optimization** mang ý nghĩa thế nào? Và chúng ta sẽ gắn những khái niệm ở trên với ngành của chúng ta như thế nào?

> **TIPs**: Phần lớn những quyển sách hay bài viết mà mình đã đọc từ xưa tới nay thì vấn đề này thường được tổng kết thành 1 định nghĩa khá loằng ngoằng, kiểu chốt luôn vào mặt người đọc chứ chẳng giải thích tại sao lại phải làm vậy. Nên có khi mình sẽ thường miss mất cái phần tư duy và chuyển qua luôn phần học thuộc. Đừng làm vậy nhé. Hãy cố gắng hệ thống những thứ đó lại thành 1 thứ gì đó quen thuộc và bạn sẽ không cần phải ghi nhớ nó nữa luôn.

**Performance Optimization** mà mình đang nói cụ thể ở đây đối với phần mềm sẽ vẫn là làm tăng **kết quả đầu ra** dựa trên **nguồn lực đầu vào hữu hạn**. Cái bạn cần làm chính là tìm xem **kết quả đầu ra** là gì và **nguồn lực đầu vào** của bạn là gì thôi.

![](https://images.viblo.asia/8a3b6b6f-adfc-436b-988b-a63e6fc0335c.png)

**1 số kết quả đầu ra cụ thể:**

- Số lượng request có thể đáp ứng
- Số lượng user / connection concurrent
- Thời gian chờ của 1 request
- Tỷ lệ request thành công

**1 số nguồn lực đầu vào cụ thể:**

- **Thời gian**
- CPU
- RAM
- Disk IO
- Network bandwidth

## Tại sao phải thực hiện Performance Optimization?

Câu hỏi thứ 2: **Tại sao phải làm vậy?**

Việc trả lời câu hỏi này rất quan trọng bởi vì nó sẽ quyết định các bạn có làm hay là không và làm tới mức độ nào. Đã có rất nhiều bài học đau thương xảy ra đối với mình cũng như những người xung quanh chỉ vì không trả lời được câu hỏi này, hoặc trả lời bị sai dẫn tới việc không thực hiện hoặc quá phí phạm nguồn lực để thực hiện.

Performance Optimization sẽ mãi mãi là ảo tưởng của lập trình viên cho tới khi nó trở thành 1 vấn đề thật sự. Sự khác biệt giữa vision của một người làm nghề từng trải và sự mơ mộng của gã trai mới ra trường cũng thể hiện ngay khi họ trả lời câu hỏi này.

Thật ra câu trả lời vốn rất đơn giản: **Bài toán kinh tế**

- Nếu bạn mới chỉ kiếm ra 100$ nhưng tiền server của bạn đã 1000$ ~> Bạn cần tối ưu!
- Nếu số khách hàng của bạn là 1 triệu nhưng hệ thống của bạn chỉ đáp ứng được tối đa 1000 ~> Bạn cần tối ưu!
- Nếu trang web của bạn load quá lâu khiến user dỗi bỏ đi ~> Bạn cần tối ưu!
- Nếu google đánh giá web bạn thấp do quá nặng và không thèm show cho user trong kết quả tìm kiếm ~> Bạn cần tối ưu!

![](https://images.viblo.asia/1527ffdb-a649-4489-a585-2650c3b843a1.png)


Mình đã từng gặp trường hợp này trong công việc, mặc dù 1 hệ thống chạy rất tiêu tốn tài nguyên và mình hoàn toàn có thể tối ưu nó để tiết kiệm chi phí server. Nhưng stake holder (người có lợi ích liên quan) thấy không cần thiết và không muốn làm. Đơn giản là vì với họ hệ thống này không có bài toán kinh tế phải giải quyết, nên hiển nhiên là sẽ không cần tối ưu và sẽ để dành nguồn lực (là mình) cho những tác vụ khác.

Ngẫm lại thì bài toán kinh tế của họ to hơn của mình. Và xác định được bài toán kinh tế là bước đầu tiên để có lý do cho câu chuyện tối ưu.

Nếu không thì sao? Okay, bạn có thể chơi kiểu: "Tao thích thì tao làm thôi".

## Ai là người thực hiện Performance Optimization?

Well, công việc của ai thì cũng đều có phần để tối ưu mà. Do đó chắc chắn sẽ không có 1 người nào hay vai trò nào luôn luôn đảm nhận công việc này. Tại sao lại như vậy?

Performance của hệ thống là 1 phạm trù rộng lớn bị ảnh hưởng bởi nhiều yếu tố cả phần cứng và phần mềm. Chính vì vậy để tối ưu được nó cũng cần sự kết hợp của rất nhiều vai trò trong công ty:

- Đối với dev thì là tối ưu code
- Đối với system admin thì là tối ưu phần cứng hay các cài đặt trong os
- Đối với database admin thì là tối ưu query, tối ưu thiết kế db
- Đối với solution architect thì là tối ưu thiết kế hệ thống
- Đối với devops thì là tối ưu quá trình tích hợp

Hiện nay ở 1 số công ty còn xuất hiện cả 1 vai trò là **Performance Engineer**, tức là những kỹ sư chuyên đi ngồi tối ưu hiệu năng. Công việc của họ sẽ là phân tích, đánh giá, tìm ra vấn đề, đưa ra phương hướng giải quyết các vấn đề liên quan tới performance. Nghề hứa hẹn đấy, chỉ tiếc là chưa được phổ biến lắm ở VN chúng ta. Chủ yếu việc tối ưu performance sẽ được tích hợp vào công việc của nhiều vai trò khác nhau chứ sẽ không tách ra riêng hẳn như vậy.

Nhiều người có thể tham gia như vậy, nhưng ai mới là người có khả năng thực hiện công việc này nhất? Bởi vì tối ưu performance là quá trình cần có kiến thức của nhiều vai trò, rồi kiến thức về vận hành nói riêng cũng như có kiến thức về toàn bộ hệ thống nói chung. Do đó mình thường thấy những người đóng vai trò **DevOps**, **Sys Admin**, **Solution Architect** là những người có khả năng tiếp cận nhiều với các bài toán về hiệu năng hơn cả. Và thực tế là tại những công ty mình đã từng làm thì đội DevOps với điều kiện phù hợp là đội biết các chỉ số về vận hành, cũng như nắm kiến thức cả về tài nguyên và code sẽ là đội đốc thúc việc tối ưu hiệu năng.

Dù vậy nhưng một cây thì làm chẳng nên non. Một người thì cũng sẽ có những hạn chế về mặt kiến thức nhất định, do vậy tối ưu performance nói chung sẽ cần phải có sự giao lưu phối kết hợp của nhiều bên.

## Khi nào thì cần thực hiện Performance Optimization?

Mặc dù chúng ta đã nói chỉ khi nào performance trở thành bài toán về kinh tế thì mới có đầy đủ lý do để thực hiện, nhưng tại mọi thời điểm thì mình đều cần có cái **performance mindset** trong đầu. Tức là ngay từ bước thiết kế ứng dụng, thiết kế db thì cũng nên tính toán cho kỹ 1 chút, chứ không phải cứ thiết kế bừa vào rồi lúc nào chậm thì xử lý.
 
Nhưng cũng có một trường phái khác phản biện: thông thường tối ưu performance sẽ khiến code rắc rối hơn, khó đọc và khó maintain hơn. Do đó việc tối ưu performance chỉ nên thực hiện ở cuối của quá trình phát triển, khi mọi thứ đã đi đúng quỹ đạo sẵn. Điều này cũng có phần đúng. Chính vì vậy để quyết định được "khi nào" là thời điểm phù hợp để tối ưu hiệu năng cũng sẽ là 1 câu hỏi khó trả lời. Sau khi đúc rút từ kinh nghiệm cá nhân thì mình có 1 số gợi ý như sau:
 
- Luôn có **performance mindset** khi thiết kế và triển khai 1 giải pháp phần mềm.
- Performance Optimization nói tới cả **1 quá trình** từ khi thiết kế, triển khai tới vận hành, feedback,... Do đó hiểu biết về toàn bộ luồng của hệ thống rất quan trọng.
- Có **mindset** về performance khác với việc **thực hiện** tối ưu performance ngay từ đầu. Đừng nhầm lẫn nhé. Có mindset tức là biết chỗ này có thể tối ưu được, chỗ này có thể nhanh hơn được, thiết kế chỗ này cho phép tối ưu về sau,... nhưng thực hiện thì không phải luôn và ngay mà chỉ tới khi nào cần mới thực hiện.
 
Ví dụ ở việc implement caching của mình:
 
- Có mindset về caching tức là biết **data ở đâu có thể cache**, và **dùng nó thì có thể giảm được tài nguyên gì**.
- Implement caching ngay từ khi mới bắt đầu code không phải lúc nào cũng tốt, vì **caching làm phát sinh nhiều vấn đề liên quan tới logic business, sai lệch dữ liệu**,... mà trong giai đoạn ban đầu (là giai đoạn thử logic ứng dụng) không nên vấp phải.
 
Thế nên trong khá nhiều app mà mình đã làm thì đồng nghiệp thường xuyên hỏi: *"Ơ tại sao mày chưa làm cache cho API này, tiết kiệm việc đọc db các thứ các thứ"*. Mình chỉ trả lời đơn giản là: **"Chưa tới lúc!"**.

![](https://images.viblo.asia/0bd8508b-c5e2-41cd-8364-407b6a69381c.jpeg)
 
## Performance Optimization được thực hiện ở đâu?
 
Câu trả lời hiện lên ngay trong đầu nhiều anh em chắc sẽ là: **everywhere**.
 
Well, thật ra câu trả lời này không sai, tất cả các khâu, các component của hệ thống sẽ đều có thể tối ưu được. Ví dụ draft 1 cái kế hoạch tối ưu trang web theo gu gờ:
 
- Giảm số HTTP request
- Sử dụng HTTP version 2
- Bỏ REST sang GRPC
- Minify css, js
- Cache lại response
- Denormalize Database để giảm JOIN query
...
 
Rất nhiều thứ phải không? Câu hỏi đặt ra là bạn có thể làm hết được mọi thứ không?
 
Tất nhiên là có rồi. **Khả năng của bạn** là **vô hạn**.
 
Nhưng, **thời gian** thì lại **có hạn**. Do đó việc lựa chọn thực hiện tối ưu ở đâu sẽ là quá trình bạn đi **tìm kiếm các vấn đề**, **xếp hạng vấn đề** và **giải quyết theo độ ưu tiên**. Và đôi khi để tìm ra điểm nghẽn của hệ thống thôi cũng đã tiêu tốn của bạn không ít thời gian rồi. Hệ thống thì phức tạp mà vấn đề có khi chỉ nằm ở 1 vài cái nhỏ nhỏ nên thông thường thì chúng ta sẽ đi chệch hướng =))). Yeah, đừng ngại khi phải thừa nhận sự thật phũ phàng này. Đôi khi chúng ta tìm kiếm sai chỗ, dẫn tới việc tối ưu không đem lại kết quả hoặc kết quả không được như mong đợi.
 
Một ví dụ: Sau khi tiếp cận hệ thống micro services với mạng lưới request chéo chằng chịt, 1 bạn đã hỏi mình: Tại sao hệ thống lại chưa sử dụng GRPC? Rồi sau đó list ra khoảng chục cái điểm ưu thế của GRPC so với RESTful API, điển hình như request tới service khác sẽ giảm đi thời gian kết nối, giảm payload truyền tải, blablo... Như vậy thì các service sẽ gọi chéo nhau nhanh hơn :D
 
Mình trả lời: Ai cũng nhìn thấy điều đó, và đúng là đó là thứ có thể tối ưu được, nhưng chỉ cần làm 1 phép so sánh đơn giản:
 
- 1 Request đang mất **300ms** để phản hồi
- Sử dụng GRPC tiết kiệm được **10ms**
- Tối ưu query tiết kiệm được **200ms**
 
Vậy thì **chúng ta của hiện tại** sẽ chọn tối ưu chỗ nào? Mình sẽ để đây và không nói gì thêm.

![](https://images.viblo.asia/79ea19f5-2935-4e34-a326-9e80a55f784d.png)
 
## How can we do it?
 
Sau khi trả lời những câu hỏi trên, chắc hẳn các bạn cũng bắt đầu thấy một bức tranh rộng lớn hơn của Performance Optimization rồi đúng không? Rất nhiều pitfall, rất nhiều sai lầm đã, đang và sẽ được tạo ra trong quá trình tối ưu này. Chung quy lại nó sẽ hay bị như này:
 
- Thiếu cái nhìn tổng quan về Performance Optimization. Tối ưu performance hệ thống không chỉ là mỗi làm tăng req/s đâu.
- Chưa có 1 lý do chính xác để thực hiện. Nên nhớ lý do sẽ quyết định bài toán, có bài toán mới biết giải theo cách nào.
- Thiếu sự kết hợp của các bộ phận trong khâu tối ưu performance.
- Đúng vấn đề nhưng sai thời điểm.
- Sai cả vấn đề luôn.
 
Vậy để không bị mắc lại những cạm bẫy phía trên thì mình nên có **1 cách tiếp cận khoa học** để thực hiện quá trình performance optimization, chứ không chỉ là nói: "Tôi thấy làm cái này sẽ nhanh" được. Cũng chính bởi vì hệ thống rất phức tạp mà chúng ta lại thiếu đi 1 góc nhìn xác đáng do đó chúng ta thường tiếp cận Performance Optimization bằng việc đổ lỗi cho 1 yếu tố gì đó của hệ thống (câu này trích trong sách nhé) và bắt đầu đi chứng minh giả định này đúng hay sai. Cách làm này rất nguy hiểm, bởi vì nó sẽ tiêu tốn của bạn không ít thời gian và công sức mà nhiều khi phải bắt đầu lại từ đầu. Mình nghĩ nó sẽ phù hợp với những lão làng nhiều kinh nghiệm, nhắm bách phát bách trúng khi đưa ra giả thuyết điểm nghẽn hệ thống hơn là những tay mơ như chúng mình.
 
Tuy nhiên các bạn có thể luyện tập đưa ra phán đoán. Trí tưởng tượng là 1 lợi thế quan trọng trong nghệ thuật phân tích điểm nghẽn hệ thống và đã giúp mình trong vô số pha cứu net. Nhưng **ĐỪNG LỆ THUỘC** hoặc **BÁM DÍNH** vào giả thuyết của bạn khi nó chưa đủ căn cứ. Luôn để mắt tìm kiếm những điều bất thường khác trong quá trình phân tích nhé.

### Quy trình thực hiện

Trở lại với phương pháp thôi. Trong cuốn **System Performance - Enterprise and the Cloud** của Brendan Gregg có liệt kê 9 step thực hiện việc đánh giá và tối ưu performance. Tuy nhiên mình xin tóm tắt lại bằng 1 số bước sau:

- **Chọn thang đo performance và thiết lập target về performance**: Từ yêu cầu của business như có bao nhiêu user cùng truy cập các bạn phải chọn 1 cách đo lường performance (có thể là CCU, throughput, latency,...). Tiếp đến là lên kế hoạch tài nguyên (Capacity Planning). Đây là bước quan trọng nhất, làm nền cho toàn bộ các hoạt động khác như lựa chọn tối ưu cái gì, tối ưu tới mức nào,...
- **Phân tích performance tĩnh**: Đánh giá performance hệ thống dựa vào việc review solution, review kiến trúc, review code,... Bước này diễn ra trong quá trình dev, yêu cầu người review (techlead, solution architect,...) phải am hiểu về business, am hiểu về hệ thống và có khả năng đánh giá performance dựa vào **trí tưởng tượng** =)). Đừng cười mình, đây là kỹ năng cực kỳ quan trọng và phải tập rất nhiều, trải nghiệm rất nhiều mới có thể làm được. Trong quá trình làm cũng phải không ngừng học hỏi và cải tiến để thích ứng với các bài toán mới hơn và lớn hơn. Người làm review tốt sẽ có cơ sở rất quan trọng để đưa ra giả thiết điểm nghẽn hệ thống mà không cần hệ thống phải chạy.
- **Benchmarking**: Thông thường mọi người nghĩ về performance optimization chỉ hay nghĩ tới bước này, tức là benchmarking xem app của mình có chịu được 1 cái tải gì đó không. Nhưng thực chất đây chỉ là 1 phần của quá trình tối ưu thôi. Benchmarking sẽ tái tạo 1 số điều kiện cụ thể để test xem application có đạt được performance mong muốn lúc đầu hay không.
- **Monitoring / Profiling**: Performance engineer giỏi là người hiểu về monitoring cũng như cách để monitoring. Đây cũng là bước quan trọng trong suốt quá trình từ khi dev tới operation. Chúng ta thường đưa ra những giả thuyết sai lầm bởi vì thiếu thông tin của monitoring. Mình cũng thấy lạ lùng là ở rất nhiều công ty lớn, mặc dù developer đều có title Senior hết nhưng lại ít người quan tâm tới kiến thức về monitoring cũng như vận hành hệ thống. Không biết monitor ứng dụng của mình hoặc không hiểu các chỉ số là 1 thiệt thòi lớn và là rào cản khổng lồ của quá trình tối ưu performance. Monitoring còn đóng vai trò cảnh báo sớm cho các sự cố về performance có thể xảy ra.
- **Phân tích performance động khi có sự cố**: Những vấn đề thực tế thì luôn khác xa những thứ ta nghĩ trong phòng lab và khi xảy ra thì chúng ta còn bị giới hạn cả thời gian để xử lý nữa, do đó đây thường là bước khó nhất và đòi hỏi nhiều skill nhất. Các bạn sẽ phải kết hợp nhiều sự hiểu biết, trí tưởng tượng và khả năng ứng biến để giải quyết được những vấn đề về performance khi phát sinh. Cái này ngoại trừ việc chuẩn bị kỹ năng debug siêu cấp và hiểu biết hệ thống thượng thừa thì mình nghĩ chỉ có thể xây đắp bằng kinh nghiệm. Cứ trải qua vài lần hệ thống quá tải rồi sẽ giác ngộ.
 
### Cách tiếp cận
 
Có 2 cách tiếp cận khi đề cập tới performance analysis và sẽ ảnh hưởng tới nhiều quyết định của chúng ta sau này:
 
- **Phân tích workload**: Đặt target về workload (tải) của hệ thống và xem application có đáp ứng được không. Ví dụ là đặt target 10.000 CCU và chạy test để theo dõi các metric sau:
   + Số lượng request vào hệ thống
   + Latency
   + Error rate
Cách tiếp cận này thường được thực hiện từ hướng developer để có phương án tối ưu code.
 
- **Phân tích tài nguyên**: Theo dõi mức độ sử dụng tài nguyên (CPU, RAM, disk, network,...) trong các trường hợp khác nhau. Ví dụ với 1 server 2 core 4 GB thì sẽ chạy test để theo dõi các metric sau:
   + Throughput (req/s) tối đa
   + Utilization: mức độ sử dụng tài nguyên
   + Saturation: Điểm overload
Cách tiếp cận này thường được thực hiện từ hướng system admin để có phương án quy hoạch tài nguyên, scaling,...
 
Trong thực tế thì mình thường kết hợp cả 2 cách tiếp cận để có 1 cái nhìn tổng quát nhất.
 
Ví dụ mình có 1 service A cung cấp 1 API và yêu cầu là đáp ứng được 10.000 req/s
 
Mình sẽ đi từ hướng **Phân tích tài nguyên** để tìm ra giới hạn performance cho 1 lượng tài nguyên nhất định, giả sử service A có khả năng đáp ứng 1000 req/s với tài nguyên 1CPU 2GB ram. Vậy là chỗ này mình chỉ cần chạy 10 con server để có 10CPU 20GB ram là có thể đáp ứng được 10.000 req/s rồi (cứ cho là service A scale ngon đi). Thế nhưng việc chạy 10 server cho service A là qúa tốn chi phí cho 1 service rất nhỏ, do đó mình sẽ phải cố định lại tài nguyên của nó. Ví dụ 5 server đi rồi bắt đầu **phân tích workload** để xem với các workload yêu cầu của mình thì hệ thống có khả năng đáp ứng không, tỷ lệ lỗi và latency là bao nhiêu và bắt đầu tối ưu thêm.
 
## Tổng kết

Người ta nói trăm nghe không bằng một thấy, trăm lời nói cũng không bằng 1 hình ảnh. Mình sẽ đúc kết toàn bộ kiến thức trong bài viết này bằng sơ đồ tư duy sau:

![](https://images.viblo.asia/6a9f0368-a240-446e-82f8-025c1b9abf93.png)

Vậy là mình mới cùng các bạn trả lời 6 câu hỏi 5W + 1H về vấn đề Performance Optimization. Trên đây là những hiểu biết sơ bộ về hoạt động performance optimization mà mình đã gặt hái được trong quá trình làm việc suốt mấy năm. Trong những bài viết tiết theo, mình sẽ đi sâu hơn vào các phương pháp tìm kiếm bottleneck của hệ thống cũng như những cách xử lý mà mình đã từng thực hiện. Cụ thể là trong bài viết sau mình sẽ đề cập ngay tới câu chuyện [**Scalability và câu chuyện về ảo tưởng distributed**](https://viblo.asia/p/scalability-va-cau-chuyen-ve-ao-tuong-distributed-3Q75wQA9ZWb). Các bạn hãy cùng đón chờ nhé.

**P/s: Đừng quên upvote + clip lại bài viết này để cổ vũ mình và tiếp tục theo dõi những bài viết tiếp sau của mình nhé.**