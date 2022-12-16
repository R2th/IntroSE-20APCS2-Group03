Nguồn bài viết : [ドキュメントは最強のコミュニケーションツールである―Joelの機能仕様書入門 ](http://www.atmarkit.co.jp/ait/articles/1412/15/news023.html)

**1. Mở đầu**

Tác giả bài viết tuy là người làm kĩ thuật có nhiều năm kinh nghiệm trong nhiều mảng về computer system development nhưng trong bài viết này sẽ dành trọng tâm để nói về những vấn đề ngoài kĩ thuật. Bởi vì như chúng ta đã biết chỉ có kĩ thuật thôi thì không thể đủ để đảm bảo cho thành công của system development, và về mảng kĩ thuật thì đã có rất nhiều bài viết từ nhiều người xuất sắc viết và nhìn nhận ở nhiều phương diện khác nhau. Do đó thay vì thêm vào những bài viết về kĩ thuật, lần này tác giả nghĩ rằng viết vềmột chủ đề nhìn từ quan điểm khác ngoài kĩ thuật sẽ thú vị hơn.

Nội dung chính dự định sẽ là những nội dung liên quan đến documentation và năng suất của việc phát triển dự án.
Đối tượng của bài viết chủ yếu  là những engineer, manager nhận yêu cầu phát triển hệ thống từ người sử dụng. Ở đây tác giả không phân biệt hệ thống được phát triển trong nội bộ tổ chức hay ủy thác cho bên ngoài làm, song ở mỗi dự án phát triển hệ thống thì đều có bên phát triển và bên sử dụng nên bài viết này sẽ hướng đến những người làm công việc ở bên phát triển hệ thống, ngoài ra những người làm việc cùng họ cũng có thể coi đây là một bài viết để tham khảo.
　

**2. Vấn đề khi phát triển hệ thống IT**

Có rất nhiều ý kiến liên quan đến tỉ lệ thành công của việc phát triển hệt hống IT. Ví dụ như theo “Sách trắng về Software development data 2014-2015” do IPA SEC (Software reliability Enhancement Center) phát hành thì tuy có chênh lệch theo quy mô và nội dung của dự án phát triển song tỉ lệ thành công tương đối là 70%, có nghĩa là có khoảng 30% thất bại.

Trong sách trắng này tuy không nói về nguyên nhân thất bại song theo tác giả thì phần lớn nguyên nhân nằm ở những chỗ không liên quan đến kĩ thuật. Tác giả hầu như ít gặp trường hợp chỉ những vấn đề đơn thuần về kĩ thuật như infra, thiết kế DB hay programing khiến cho dự án thất bại. Nguyên nhân có thể nghĩ đến là vì ngay từ bước đầu tiên khi xem xét có tiến hành dự án hay không thì người ta đã phải đánh giá trình độ kĩ thuật của team phát triển, nếu không phù hợp sẽ không đồng ý cho phát triển dự án.

Ngược lại nguyên nhân nhiều nhất gây nên thất bại của dự án mà tác giả nhận thấy là vấn đề về communication. Tuy có những trường hợp nguyên nhân thất bại liên quan đến cả kĩ thuật và những vấn đề khác, song hầu như khi xem xét những dự án có vấn đề thì đều nhận thấy thất bại trong communication giữa những người liên quan trong dự án. (bên sử dụng, bên phát triển…)


**3. Thất bại trong communication là gì**

Trong bài viết này thất bại trong communication mà tác giả muốn nói đến là Requirement Specifications (những yêu cầu mà bên sử dụng mong muốn) và  Implementation Specifications (thực tế hệ thống được phát triển) không khớp với nhau.

Trong việc phát triển hệ thống có rất nhiều cách để communication như họp, điện thoại, chat, mail, SNS, hợp đồng, tài liệu Specifications…song nếu việc communication không hiệu quả thì cuối cùng kết quả vẫn là những yêu cầu và hệ thống thực tế làm ra khác xa nhau gây nên thất bại của dự án.

Hình ảnh dưới đây thể hiện một cách vô cùng dễ hiểu về vấn đề xảy ra khi yêu cầu của người sử dụng và sản phẩm team phát triển làm ra không khớp với nhau. 
![](https://images.viblo.asia/217a954a-ed8a-4e0f-88ea-eea73f0918b0.jpg)

**4. Làm sao để tránh được thất bại trong communication?**

　Vậy thì phương pháp cụ thể để tránh được thất bại trong communication là gì? Theo tác giả thì việc lấy document làm trọng tâm trong việc communication là phương pháp mang lại hiệu quả cao nhất.

Có thể sẽ có rất nhiều người nghĩ rắng “tưởng gì, hóa ra là document à…” Đúng vậy, việc lấy document làm trọng tâm trong việc communication không có gì là mới mẻ cả, song tác giả nhận thấy việc thường xuyên xem xét lại document là một việc rất quan trọng. Những người làm kĩ thuật IT thường chỉ bị thu hút bởi những kĩ thuật tiên tiến nhất, tuy nhiên dù kĩ thuật có tiên tiến vượt trội đến cỡ nào đi nữa thì trong việc  phát triển hệ thống được làm ra bởi sự chung tay góp sức của nhiều người thì communication hiệu quả, chính xác là điều không thể thiếu, để làm được điều đó thì hiện nay không có công cụ nào hiệu quả hơn document cả.

Hơn nữa có thể có người sẽ nghĩ rằng “nói đến communication thì không phải là trao đổi hội thoại trực tiếp mới là quan trọng à?”  Hội thoại là yếu tố cơ bản của communication, song đối với một hoạt động tập thể phức tạo như phát triển hệ thống thì chỉ lấy hội thoại làm công cụ duy nhất để communication là quá nguy hiểm. Bởi vì nếu không ghi lại kết quả của hội thoại thành document thì chắc chắn sẽ không thể chia sẻ thông tin một cách đầy đủ chính xác giữa nhiều người với nhau. Ngoài ra nếu tính total cost thì communication mà không có document sẽ dẫn đến wasted cost cho dự án. 

**5. Document nào được coi là cần thiết?**

Trong bài viết này tác giả sẽ nói về document cần thiết trong thực tế phát triển hệ thống, là một công cụ trợ giúp hiệu quả cho team phát triển.
Những document tác giả recommend bao gồm 3 loại dưới đây.
1.	“Functional Specifications của Joel” (Joel on Software)
2.	Design Doc
3.	Meeting minutes
Tác giả cho rằng nếu sử dụng hiệu quả 3 loại document này thì tỉ lệ thất bại của dự án sẽ rất thấp. Trong series bài viết của mình tác giả sẽ giải thích cụ thể về 3 loại document này.
Đầu tiên chúng ta hãy cùng xem xét loại thứ nhất : “Functional Specifications của Joel” (Joel on Software) nhé.

**6. Sự cần thiết của Specification Document mang tính thực dụng cao**

Đối với những người phát triển hệ thống theo trường phái Agile hoặc những trường phái mới khác thì bản Specification Document theo chủ nghĩa hoàn thiện cổ điển được coi là không có ý nghĩa.

Specification Document theo chủ nghĩa hoàn thiện có nghĩa là document chi tiết hoàn thiện đến từng hạng mục, không có mâu thuẫn sai sót và rất dày. Loại document này rất lý tưởng với ý nghĩa là “chỉ cần xem document này là có thể hiểu được tất cả”. Tuy nhiên do việc viết và update loại document này quá tốn chi phí về thời gian và tiền bạc nên với business speed của thời đại  hiện nay thì không còn phù hợp nữa. Dù vậy không phải vì chủ nghĩa hoàn thiện khó thực hiện mà Specification Document lại bị xem nhẹ.

Không cần document mà cũng có thể phát triển được  hệ thống thì chỉcó ở những trường hợp rất đặc biệt, ví dụ như là xóa bỏ hoàn toàn hệ thống cũ. Tuy nhiên với những dự án phát triển hệ thống thông thường thì thường bao gồm những yêu cầu và yếu tố mới, nên không thể không viết document mà tiến hành code ngay được. Việc này không những làm giảm năng suất của dự án mà còn tạo ra những đoạn code yếu kém về chất lượng và performance. 

Do vậy chúng ta không nên theo chủ nghĩa hoàn thiện hay theo chủ nghĩa xem nhẹ document, mà điều cần thiết là cần phải biết được cách viết document hiệu quả có tính thực tế cao như document Joel on Software mà tác giả giới thiệu dưới đây.


**7.  “Functional Specifications của Joel” là gì?**

Joel Spolsky là 1 kĩ sư software nổi tiếng từng làm Program Manager của Microsoft Excel, tác giả cuốn Joel on Software. “Functional Specifications của Joel” là tên mà tác giả gọi cách viết Specifications Document mà Joel giới thiệu.

“Functional Specifications của Joel” nói một cách đơn giản là document tổng hợp cách software vận hành nhìn trên quan điểm của người sử dụng, hướng đến trở thành công cụ để chia sẻ, communicate giữa team phát triển và người sử dụng.

Chi tiết document này được public miễn phí trên website của Joel, song nó đã được public khá lâu rồi (hơn 10 năm) nên hiện nay nhiều người không biết đến. Tuy là 1 tài liệu có thể coi là cũ nhưng nội dung của nó vô cùng xuất sắc nên tác giả rất muốn giới thiệu tới mọi người ở bài viết này.
3 vai trò của “Functional Specifications của Joel”

Trước khi bàn đến nội dung chi tiết cách viết Specification Document của Joel thì tác giả muốn giải thích về vai trò của nó, để người đọc dễ dàng hiểu được tại sao lại nên viết document theo cách mà Joel hướng dẫn.

3 vai trò của document này lần lượt như dưới đây.
1.	Giúp kĩ sư thiết kế program một cách đúng đắn
o	Giúp cho việc chia sẻ, xem xét sửa lại bản thiết kế trở nên đơn giản, kết quả là rút ngắn thời gian phát triển
o	Làm rõ những mục đã quyết định và những mục chưa quyết định
2.	Tiết kiệm thời gian communication
3.	Là thông tin cơ bản để lên schedule

【1】Giúp kĩ sư thiết kế program một cách đúng đắn

•	Kiểu phát triển hệ thống “có đến đâu làm đến đó”

Có rất nhiều kĩ sư (bao gồm cả tác giả) yêu thích việc code, nên khi bắt đầu 1 dự án mới chỉ cần đọc qua yêu cầu là đã tiến hành code ngay. Hay tệ hơn là có những người chưa cần hiểu yêu cầu hệ thống nhưng nghĩ rằng trước tiên cứ làm màn hình khởi động xem sao đã rồi tính. Họ nghĩ rằng sau đó sẽ code thêm các chức năng khác vào sau, sửa đổi 1 chút là có thể hoàn thiện hệ thống rồi.

Tuy nhiên càng làm thì các xảy ra nhiều vấn đề và mâu thuẫn trong thiết kế cũng như specification, họ lại nghĩ rằng lúc đó thì sửa theo thay đổi là được. Hoặc là họ lại tức giận cho rằng yêu cầu của người dùng đầy mâu thuẫn, làm sao mà làm được trong khi họ không nghĩ tới việc chính bản thân mình chưa suy nghĩ cẩn thận mà đã bắt tay vào làm.

Hơn nữa nếu cứ phát triển hệ thống theo cách này thì sau này về cả mặt thời gian và mặt tâm lí đều rất khó sửa đổi cũng như bỏ những đoạn code cũ đi để thay bằng code mới.
Vì vậy cần có 1 bản document rõ ràng từ ban đầu để kĩ sư có thể nắm được cơ bản toàn bộ yêu cầu của hệ thống, tránh việc bắt tay vào làm ngay khi chưa hiểu rõ yêu cầu làm mất nhiều thời gian lãng phí.

•	Dựa vào Functional Specifications có thể hoàn thành thiết kế 1 cách nhanh chóng, đúng đắn

Nếu viết được Functional Specifications thì sẽ tiết kiệm được nhiều thời gian khi thiết kế hệ thống, dù chỉ vài dòng thôi nhưng ai cũng hiểu được và việc update, sửa đổi cũng dễ dàng.

Hơn nữa nếu có Functional Specifications thì sẽ dễ dàng nhận ra được các vấn đề trong giai đoạn mới phát triển. Nếu không hiểu được yêu cầu thì không thể viết được document này nên người thiết kế hệ thống sẽ cần phải tìm hiểu, nâng cao năng lực của mình đồng thời khi viết xong sẽ được nhiều bên review bao gồm cả người sử dụng nên sẽ sớm phát hiện được các lỗi sai cũng như các điểm còn thiếu sót.

•	Dựa vào Functional Specifications có thể làm rõ được những mục chưa quyết định

Hầu hết ở các hệ thống yêu cầu phát triển thì ngay trong phía người sử dụng (bên yêu cầu) cũng có nhiều ý kiến khác nhau, dẫn đến có những chức năng mãi không quyết định cụ thể được dù đã họp bao nhiêu lần vẫn ở trạng thái pending. Đối với những dự án không có document thì những chức năng như trên mãi dở dang không được hoàn thành, đến gần ngày bàn giao sản phẩm sẽ trở thành vấn đề lớn.

Với những dự án đã quen với việc viết document thì sẽ dễ dàng tránh được vấn đề này. Chỉ cần note lại những vấn đề chưa được quyết định trong document là sẽ rõ ràng trong việc trao đổi confirm giữa các bên. 

【2】Tiết kiệm thời gian communication

Khi đã viết document rồi thì dù có chia sẻ cho bao nhiêu người đi nữa cũng chỉ mất cost 1 lần. 

Document này người dùng, test team, support team, sale team đều có thể đọc để hiểu hệ thống được.  Sau này nếu có thêm người vào dự án thì cũng không cần phải giải thích lại từ đầu. Người thiết kế (người viết document) cũng có thể đọc lại và nếu cần thiết thì sửa đổi cho phù hợp.

Nếu như không có document thì sẽ xảy ra tình trạng hỗn loạn, khi có điều gì chưa rõ thì test team, support team… sẽ  hỏi team phát triển, có khả năng nhiều câu hỏi sẽ trùng lặp với nhau, team phát triển đáng ra phải tập trung code thì lại phải dành thời gian để trả lời dẫn đến năng suất công việc giảm. Vấn đề này có thể không nhìn thấy ngay được nhưng thực tế lại tốn rất nhiều cost và thời gian của dự án.

【3】Là thông tin cơ bản để lên schedule

Dựa vào bản Specification document cũng như bản thiết kế của dự án, team phát triển sẽ biết được công việc cụ thể của mình từ đó mới có thể estimate và lên schedule chính xác. 

**8. Tổng hợp**

Ở bài viết này tác giả đã nêu lên tầm quan trọng của communication với dự án phát triển hệ thống IT, cũng như tầm quan trọng của document trong việc communication. Theo đó trong 3 recommend document đã nêu tác giả đã giới thiệu được “Functional Specifications của Joel”, mong có thể giúp ích được người đọc trong việc ý thức được liên hệ giữa document và năng suất của dự án. 
Trong bài viết tới tác giả sẽ giới thiệu những technique cụ thể của document này.