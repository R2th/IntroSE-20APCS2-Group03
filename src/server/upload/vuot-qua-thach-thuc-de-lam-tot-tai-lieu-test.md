Tham khảo từ nguồn: 

https://www.stickyminds.com/article/overcoming-challenges-good-test-documentation

# Tóm tắt:
Sự thu thập tài liệu test tốt là một thách thức nhất quán. Mô hình Agile đề xuất rằng bạn không nên xem nhẹ tài liệu và trong khi tài liệu kiểm tra không cần quá đề cao thì cũng cần phải rõ ràng và bao quát tất cả những gì sản phẩm dự định làm để bạn có thể đảm bảo được rằng điều kiện kiểm tra phù hợp và kết quả được ghi lại một cách đầy đủ. Đây là cách vượt qua một số rào cản lớn để bạn có được bộ tài liệu test tốt nhất.

Trước khi release nhanh, document kiểm tra tốt bao gồm plan kiểm tra chính thức và một bộ các trường hợp kiểm thử. Nhưng với Agile, kế hoạch test chính thức đã bị vứt bỏ.
Phạm vi testcase từ thực tế không tồn tại đến chi tiết, đến mức mà bạn chỉ có thể thực hiện thông qua mock. Sự thật của vấn đề là kết quả cuối cùng lý tưởng không nằm trong những cái có sẵn.
Một số rào cản để tạo ra các trường hợp thử nghiệm tốt, và làm thế nào chúng có thể được giải quyết? Hãy cùng xem xét các trường hợp thử nghiệm có thể được lấy từ các tiêu chí chấp nhận, các trường hợp sử dụng, thông số kỹ thuật và tài liệu thiết kế.
Có một vài thử thách như sau:

1. Quá trình test được siết chặt vào cuối giai đoạn nước rút, chuyển mức độ ưu tiên từ thử nghiệm toàn diện sang thử nghiệm tối thiểu và tài liệu trở thành một nhiệm vụ được bàn giao cho các nhóm khác support.
2. Việc thiếu tài liệu hỗ trợ tốt dẫn đến sự thiếu hiểu biết đầy đủ về tính năng hoặc một bộ tính năng nhất định.
3. Có một sự thiếu quan tâm trong việc viết và hiểu các chi tiết cần thiết để xây dựng và kiểm tra một ứng dụng.
4. Tester nghĩ rằng ad hoc testing là đủ để check testing box.

Ad-hoc testing là gì? Bạn xem thêm ở đây:
https://viblo.asia/p/exploratory-testing-va-ad-hoc-testing-ZDEeLdxzeJb

5. Công ty văn hóa doanh nghiệp không ưu tiên đến chất lượng, do đó, thậm chí không có một tiêu chuẩn nào được gắn vào thậm chí là tiêu chuẩn lỏng lẻo.

Bất chấp các thách thức này, nhưng trong quá trình làm việc chúng ta hãy luôn đặt midset như trong một câu nói của Arthur Ashe: “Để đạt được vĩ đại, hãy bắt đầu từ nơi bạn đến, sử dụng những gì bạn có, và làm những gì mà bạn có thể”.

Mặc dù phải đối mặt với những thách thức của việc không có đủ thời gian, thiếu tài liệu hỗ trợ và giải quyết các vấn đề về văn hóa để sản xuất hay bất kỳ loại tài liệu chính thức nào. Nhưng xem xét các trích dẫn ở trên, có một mức tối thiểu cần được sản xuất. Điều cần thiết là phải có một số loại tài liệu để tham khảo khi bạn test để đảm bảo quá trình test phù hợp và kết quả được ghi lại. Vậy làm thế nào để có thể giải quyết được các thách thức bên trên?

# Rào cản đối với tài liệu kiểm tra tốt
Bất chấp những nỗ lực tốt nhất và ngay cả trong một môi trường Agile, QA dường như đã giao mọi thứ cho họ để test vào những phút cuối hoặc cuối mỗi cuộc đua nước rút.

Trong khi chờ đợi sản phẩm có thể test được, hy vọng sẽ có nhiều thời gian để tìm hiểu về tính năng sẽ làm trong thời gian tới, hãy đọc tài liệu và trao đổi với các thành viên chính cho mỗi chức năng của đội develop và tìm hiểu về sản phẩm để hiểu chính xác nhất những gì bạn cần phải làm cho chức năng đó. Từ những thông tin thu thập được, QA có thể phát triển một tập hợp các trường hợp test để đảm bảo bao phủ được nhiều nhất các trường hợp có thể test trong chức năng chuẩn bị test trước khi bắt đầu test. Giả sử tính năng này tương đối nhỏ, do nó được phát triển trong một giai đoạn nước rút ngắn, bạn luôn sẵn sàng trong tư thế test khi có thể. Thời gian chờ đợi một tính năng release nên được dùng để hiểu, xác định và ghi lại các chiến lược cho công việc test của mình để sử dụng vào các tính năng tiếp theo trong dự án hoặc là để làm kinh nghiệm cho các dự án khác.

Tài liệu support là những gì? Có nhiều dự án không có tài liệu hỗ trợ gì cả. Hầu hết các công ty yêu cầu về thông số kỹ thuật chức năng, phi chức năng hoặc là chuyên về kỹ thuật, nhưng ngay cả khi tất cả đều có, bạn không thể chắc chắn được rằng những tài liệu đó có chứa mọi thứ mà bạn cần để test cho chức năng này một cách hiệu quá. Một tester tốt sẽ vượt lên trên và vượt ra ngoài những gì được cung cấp cho họ và tìm kiếm thêm thông tin để nắm bắt đầy đủ các tính năng.

Dưới đây là một số điều mà bạn có thể làm để rút ra những gì mà bạn cần để phát triển một tập hợp các trường hợp test.

1. Đọc bất kỳ tài liệu nào có sẵn cho dự án
2. Hãy suy nghĩ chín chắn về những gì mình đã đọc và hình thành nên các câu hỏi về nó.
3. Chủ động tham gia với mọi người để trả lời cho các câu hỏi còn thắc mắc của chính bạn.
    + Phát triển các câu hỏi về mặt kỹ thuật
    + Quản lý sản phẩm cho các câu hỏi về tính năng

Thêm một lý do nữa là các trường hợp test và các loại tài liệu test khác được tạo ra là do người test không tự tin vào khả năng viết tài liệu của mình và sợ tạo ra bất kỳ tài liệu nào dưới dạng văn bản. Nếu có nhu cầu cải tiến trong lĩnh vực đó, tùy thuộc vào từng cá nhân để xây dựng nên bộ kỹ năng như vậy.

Tin tốt là loại văn bản này không giống như văn bản được sử dụng cho một tác phẩm lớn của tiểu thuyết văn học hoặc thậm chí là một bài nghiên cứu về học thuật. Tài liệu của bạn có thể là đơn giản như một checklist kiểm tra có các dấu đầu dòng:

1. Đăng nhập với tư cách là quản trị viên hệ thống
2. Chạy câu lệnh SQL
3. Thực hiện call API

Hãy luôn ghi nhớ rằng một cái gì đó luôn là tốt hơn so với không có gì, và càng đơn giản thì càng tốt. Các trường hợp test được chứng minh bằng tài liệu trở nên quan trọng hơn nữa khi một người nào đó không phải là người khởi tạo cần để sử dụng chúng, như một kỹ sư test tự động hóa họ có thể không biết các tính năng của sản phẩm cũng như bạn hoặc một tester khác có thể cần kiểm tra hồi quy. Giảm bớt gánh nặng cho những người tiếp theo xuống bằng cách cung cấp tài liệu kiểm tra mạch lạc nhất có thể.

Thử thách cuối cùng là mọi người phải vật lôn với số lượng chi tiết mà chính họ cung cấp trong tài liệu của họ. Có những tài liệu mô tả quá chi tiết cầu kỳ làm cho người khác đọc khó follow cảm giác như là không có chi tiết cụ thể nào cả, quá lan man không trọng tâm. Như với hầu hết mọi thứ khác, mục tiêu ở đây là tìm sự cân bằng và những gì hoạt động trong tổ chức của bạn.

Một nguyên tắc tốt tiếp theo là suy nghĩ về đối tượng sử dụng của phần mềm và tự hỏi mình một số câu hỏi như: Bao nhiêu thì tôi có thể giả định để hiểu về những knowledge chung? Cần giả định lượng kiến thức ít nhất ở đâu? (Ví dụ, dựa trên những người mới tham gia tổ chức, có thể giả định được bao nhiêu trong việc đưa sản phẩm lên cho end-user và bất kỳ khóa đào tạo ban đầu nào có thể được cung cấp?). Một số cạm bẫy hay gặp phải trong quá trình test là gì? Khả năng những người khác sẽ gặp phải những vấn đề tương tự là gì? Cung cấp đủ tài liệu để khi những người khác sau này có support mình thì họ cũng có thể tìm ra con đường, cách giải quyết những vấn đề trong dự án, hoặc là họ có thể biết cần hiểu ngọn ngành vấn đề từ đầu.

# Bạn có thể làm gì để đảm bảo rằng tài liệu là có giá trị

Nói chung, tất cả những vấn đề này có thể được khắc phục bằng cách chủ động hoàn thành những gì cần hoàn thành để đưa một sản phẩm chất lượng dến tay khách hàng và với nguồn nhân lực hạn chế. Đừng chờ đợi bất cứ điều gì hoặc cho rằng những gì được giao cho bạn về mặt tài liệu hoặc thông số kỹ thuật sẽ là mọi thứ mà bạn cần.

Ngoài ra, hãy tham gia vào những gì đang đi xuống trước khi mọi thứ trở thành hiện thực, nói cách khác, đừng đợi cho đến khi chức năng đang được code rồi mới bắt đầu công việc test. Hãy tham gia vào việc đặt câu hỏi và giúp nhóm của mình hiểu và tìm ra cách test có chất lượng.
Chính bạn hãy có trách nhiệm hơn về các chức năng mới trên lộ trình phát triển của phần mềm. Tham gia đặt câu hỏi sớm và tạo những ghi chú của riêng mình. Điều này làm cho bạn hiểu tính năng trước khi nó được đưa vào chạy nước rút hoặc release, những ghi chú của bạn sẽ là khởi đầu cho các trường hợp test của bạn. Nếu cuối cùng bạn vẫn bị vắt kiệt sức thì ít nhất bạn cũng đã sẵn sàng để test chúng.

Chiến lược luôn đi đầu trong việc phát triển kỹ năng từ sớm trong một đặc tính chung sẽ giúp khắc phục vấn đề về việc thiếu tài liệu hỗ trợ. Nếu bạn tò mò vì các thông số kỹ thuật không tồn tại hoặc ít, việc này khuyến khích những người chịu trách nhiệm về tài liệu để đảm bảo rằng nó đã được viết. Ít nhất, thông số kỹ thuật sẽ được ghi lại qua các trường hợp test mà bạn đã làm ra.

Để giải quyết điểm cuối cùng của vấn đề, nếu tổ chức của bạn không quảng bá về văn hóa chia sẻ tài liệu và thông tin, bạn hãy là người làm việc đó. Hãy xem nó là điều cần thiết cho công việc của bạn để đảm bảo sản phẩm được vận chuyển và được phát hành với chất lượng cao nhất và thực hiện những gì nó dự kiến sẽ làm, không có vấn đề làm gián đoạn hoạt động của quá trình kinh doanh bình thường hoặc của những người hay tổ chức đang sử dụng nó.

Có một số người theo mô hình Agile có thể sẽ nói rằng tài liệu là không quan trọng. Đồng ý rằng tài liệu không cần quá đề cao, nhưng nó cần tồn tại, rõ ràng và bao gồm tất cả những gì mà sản phẩm dự định sẽ làm. Đây là một yếu tố quyết định mang lại lợi ích tích cực cho tất cả mọi người xung quanh: về chất lượng sản phẩm đến tay khách hàng, cho các thành viên khác trong nhóm, cho end-user, cho tổ chức của bạn và cho cả sự nghiệp của bạn nữa.