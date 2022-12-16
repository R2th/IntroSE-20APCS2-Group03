> **"Quý vị nên nhớ. Amen. Tui là đạo Phật mà." - Đệ nhất nhà tiên tri vũ trụ Trần Dần**

## Mở đầu

Hôm nay sau vài tuần nghiên cứu tìm hiểu kinh kệ sách vở các thứ nhằm tìm ra cách để fix bug có hiệu quả nhất. Tôi quyết định viết loạt bài này. Hy vọng nó sẽ có ích cho quý vị trong việc fix bug. Bài viết này tôi quyết định áp dụng tư tưởng Phật giáo để làm nền tảng từ lý thuyết đến thực hành trong việc xử lý các bug khó nhằn để công việc lập trình được suôn sẻ.

Đời người có rất nhiều những khổ đau và bế tắc, công việc làm dev cũng tương tự như vậy, và khổ đau nhất có lẽ là việc luôn gặp phải bug và phải dành hàng giờ, thậm chí hàng tuần, hàng tháng để fix những con bug mà đôi khi fix xong bug này lại lòi ra bug khác. Theo nhiều thống kê, công việc của dev chỉ có khoảng 20% là phát triển các tính năng mới, còn lại là 80% dành cho việc fix bug. Thành ra, công việc lập trình cứ tưởng là vui vẻ nhẹ nhàng vì được thoả sức với đam mê lại thành ra là vô cùng đau đầu. Vì một con bug mà đôi khi dẫn đến mất ăn mất ngủ. Hạnh phúc gia đình đôi khi sứt mẻ chỉ vì trong những hôm gặp con bug khó nhằn, vợ bạn lại không hiểu vì sao hôm nay anh ấy có vẻ lạnh nhạt lại còn hay cau có với mình như vậy.


## Tứ diệu đế

Thế nào là fix bug hiệu quả ? Là fix bug nhanh ư ? Không phải. Là phải fix đúng chỗ, fix tận gốc của bug, fix sao cho không phát sinh thêm bug mới, fix sao cho trên mọi case chương trình của ta vẫn hoạt động đúng yêu cầu.

Trên cơ sở nền tảng tư tưởng phật giáo Theravada (phật giáo Nguyên thuỷ), thay vì mong cầu vào một đấng siêu nhiên như Quan thế âm Bồ tát cứu khổ cứu nạn cho mình khỏi những con bug, ta nên áp dụng con đường chân lý mà đức phật Thích Ca đã chỉ ra trong Kinh Chuyển Pháp Luân về kinh nghiệm của ngài trong việc giác ngộ. Con đường chân lý ấy chính là Tứ diệu đế mà tôi sắp trình bày dưới đây cho quý vị nghe. Giáo lý Tứ Diệu Đế là cốt lõi quan trọng nhất đã được tất cả các Tông phái công nhận như là điểm chung đồng và thuần túy nhất của đạo Phật. Thông suốt được những điểm giáo lý này có thể được xem như đã thâm nhập toàn bộ con đường giác ngộ giải thoát của Ðức Phật rồi.

Trong Kinh Chuyển Pháp Luân, Tứ Diệu Đế được ghi chép lại như sau:

* Này các tỳ kheo, đây chính là Khổ thánh đế: sinh là khổ, bệnh là khổ, già là khổ, chết là khổ, oán ghét gặp nhau là khổ; thân ái biệt li là khổ, cầu không được là khổ, tóm lại năm uẩn chấp thủ là khổ.
* Này các tỳ kheo, đây chính là Tập khổ thánh đế. Chính là ái đưa đến hữu, tương ứng với hỉ và tham, tìm cầu hoan lạc chỗ này chỗ kia, chính là dục ái, sinh ái, vô sinh ái.
* Này các tỳ kheo, đây chính là Diệt khổ thánh đế. Chính là sự diệt tận, vô dục, từ bỏ, xả li, giải thoát, tự tại đối với các ái.
* Này các tỳ kheo, đây chính là Đạo diệt khổ thánh đế, đưa đến diệt Khổ, chính là con đường gồm tám thứ giúp ta chứng được Đạo: Chính kiến, Chính tư duy, Chính ngữ, Chính nghiệp, Chính mệnh, Chính tinh tiến, Chính niệm, Chính định.

Ta có thể tóm tắt lại như sau:

* Khổ thánh đế là chân lý về sự Khổ (giải thích khổ là gì)
* Tập khổ thánh đế là chân lý về sự phát sinh của khổ (giải thích tại sao lại khổ)
* Diệt khổ thánh đế là chân lý về diệt khổ (giải thích diệt khổ là gì)
* Đạo diệt khổ thánh đế là chân lý về con đường để diệt khổ (giải thích diệt khổ bằng cách nào)

Đó là Tứ Diệu Đế đối với kiếp nhân sinh, còn đối với công việc fix bug, nếu ta coi bug đồng nghĩa với khổ thì việc fix bug đồng nghĩa với việc diệt khổ. Vậy thì nếu áp dụng Tứ Diệu Đế vào trong việc fix bug, ta sẽ cần phải hiểu được: bug là gì, tại sao lại có bug, cách fix bug là gì và con đường loại bỏ bug như thế nào.

## Khổ thánh đế trong fix bug

Bạn phải hiểu được bug là gì, xảy ra như thế nào, xảy ra trong trường hợp nào thì mới biết đường mà fix chứ đúng không. Cũng giống như đi khám bệnh phải biết được triệu chứng của bệnh, phải biết bệnh ở đâu, phải làm xét nghiệm và chẩn đoán đúng bệnh. Nói chính xác là bạn phải tái hiện (reproduce) được bug trước khi bắt tay vào sửa bất cứ dòng code nào.

Bạn có thể ngay lập tức đưa ra một số giả định nào đó, lao vào sửa, kiểm tra code thấy chạy đúng, đóng gói và ngồi đó nghĩ rằng mình đã fix thành công. Như một vài anh bạn mà tôi biết nói rằng cứ sửa bừa thôi mà chẳng hiểu vì sao code mình chạy được. Đó là một sai lầm điển hình. Ngay hôm sau, tester thông báo rằng bug đó vẫn chưa được sửa. Và bạn lại lặp lại việc đưa ra giả định, lại cắm đầu vào sửa như vậy vài lần nữa.

Bạn CẦN phải tái tạo được kịch bản chính xác nhất mà xuất hiện lỗi. Nó nên là kịch bản có ít bước nhất để phạm vi fix được thu gọn lại. Nếu bạn không thể tự tái tạo, hãy nhờ những người khác. Không có gì ngu ngốc hơn việc ngồi mò mẫm trong bóng tối cả.

Việc làm sao để tái hiện được bug có lẽ tôi sẽ chia sẻ kỹ hơn trong các bài viết tiếp theo.

## Tập khổ thánh đế trong fix bug

Bạn phải hiểu được bug đến từ đâu, do file nào, class nào hay method nào gây ra để biết được nơi cần phải sửa code. Cũng giống như khi đi khám bệnh, cần phải biết nguyên nhân của bệnh đến từ đâu để có thể tìm ra pháp đồ điều trị hợp lý và hiệu quả nhất.

Một số bug sẽ cho phép bạn phát hiện nguyên nhân thông qua stacktrace của IDE. Hãy tận dụng điều này để biết đích xác nơi nào bug được tạo ra. Kỹ năng đọc và hiểu stacktrace nhanh chóng là một kỹ năng rất cần thiết trong sự nghiệp làm dev của bạn. Mấu chốt ở đây là bạn cần tìm được nguyên nhân gốc rễ, và nó thì thường nằm ở dưới cùng của stack. Kinh nghiệm của tôi là hãy đọc stacktrace từ dưới cùng lên thì sẽ nhanh tìm thấy nguyên nhân hơn.

Một số người có thói quen copy nguyên cả đoạn stacktrace để search Google với mong cầu sẽ có nhiều người cũng gặp phải bug này giống như mình. Có thể họ may mắn tìm được một topic trên StackOverflow và ấn tổ hợp Ctrl + C, Ctrl + V và thấy code chạy ngon nghẻ. Điều này sẽ khiến bạn chẳng hiểu gốc rễ của bug nằm ở đâu nên sẽ chẳng giúp bạn hiểu và học được bất kỳ điều gì. Ngoài ra cũng chưa chắc là đoạn code đó đã fix được bug của bạn vì đôi khi các bug khách nhau có thể đưa ra các stacktrace hơi hơi giống nhau.

Tóm lại, bạn CẦN phải hiểu được nguyên nhân của bug, hoặc là bạn chỉ là một lang băm chữa bệnh mò chứ không thể trở thành một thầy thuốc giỏi được.

Ngoài việc sử dụng stacktrace, có một vài mẹo nữa để điều tra nguyên nhân bug mà tôi chắc chắn sẽ chia sẻ trong các bài viết tiếp theo.

## Diệt khổ thánh đế trong fix bug

Khi đã biết được bug đến từ đâu rồi, việc fix bug có lẽ cũng đơn giản hơn nhiều rồi. Giống như khi đến bệnh viện và đã biết chính xác nguyên nhân của bệnh, ta sẽ đưa ra pháp đồ điều trị phù hợp với từng loại bệnh khác nhau.

Giống như người bác sĩ giỏi sẽ đưa ra được pháp đồ điều trị hiệu quả, ít tốn kém, ít tác dụng phụ nhất, việc fix bug có hiệu quả hay không phụ thuộc vào kinh nghiệm cũng như trình độ của người fix.

Nếu bạn đã có nhiều kinh nghiệm và kiến thức đủ để xử đẹp con bug với ít line change và vùng ảnh hưởng (impact range) hẹp nhất thì hãy cứ tự tin mà fix thôi. Còn nếu bạn chưa nhiều kinh nghiệm và kiến thức chuyên môn, hãy hỏi những người giỏi hơn. Tận dụng các nguồn trên internet như Google, với việc cung cấp nhiều thông tin nhất có thể lên thanh tìm kiếm, khả năng cao là bạn sẽ tìm thấy cách fix hiệu quả nhất. Hãy lựa chọn những suggest ngắn gọn dễ hiểu nhất, có lượt upvote cao và cập nhật mới nhất, lưu ý thêm là bạn phải hiểu những suggest ấy trước khi nhấn Ctrl + C. Nếu bạn cảm thấy khó hiểu, hãy ưu tiên thử tìm các suggest khác dễ hiểu hơn. Điều đó sẽ giúp bạn dễ làm chủ và áp dụng vào code của mình.

Một cách khác nữa là nhờ những người có kinh nghiệm hơn trong team. Đôi khi họ có thể suggest những cách giải quyết mà bạn không thể ngờ là lại dễ hiểu và ngắn gọn đến vậy. Lưu ý lần nữa là việc hỏi người trong team chỉ nên được áp dụng khi bạn đã chắc chắn biết nguyên nhân của bug. Nếu bạn còn chưa biết nguyên nhân của bug ở đâu mà đã nhờ người khác thì họ sẽ buộc phải ngồi nhìn code và tìm nguyên nhân cùng bạn. Điều đó rất mất thời gian của họ vì bạn là người hiểu code cũng như dự án của mình nhất mà còn chưa tìm ra thì một người ngoài làm sao tìm ra nhanh cho được.

## Đạo diệt khổ thánh đế trong fix bug

Con đường fix bug là một con đường rất lâu dài và mọi chương trình bạn viết ra hẳn đều sẽ có rất nhiều bug tiềm tàng sắp được phát hiện. Con đường thoát khỏi bệnh tật cũng là một con đường lâu dài và bạn cần kiên trì uống thuốc để trị bệnh tận gốc và duy trì một lối sống khoa học để phòng tránh bệnh tật.

Cách để không phải đau đầu với việc fix bug chính là áp dụng kiến trúc sạch, code sạch, giảm thiểu những logic phức tạp, viết những đoạn mã dễ hiểu và làm chủ chúng. Ngoài ra cũng cần trau dồi kiến thức cũng như kinh nghiệm để nếu bug có xảy ra cũng tự tin fix chúng. Thay vì trốn tránh việc fix bug bằng cách đổ lỗi cho nền tảng hoặc người đi trước code dở và từ chối việc fix thì hãy yêu cầu thêm thời gian để tìm hiểu. Refactor những đoạn smell code cũng là một cách để giúp việc fix bug trong tương lai trở nên dễ dàng hơn.

Mỗi khi fix được một con bug khó hãy tận hưởng cảm giác đó và thư giãn một chút. Vì bạn vừa bước thêm một nấc thang mới trên hành trình trở thành một người thầy thuốc giỏi. Có thể ghi chép chúng lại vào một cuốn sổ tay để nếu sau này có gặp lại thì không cần mất nhiều thời gian nữa.

Dần dần khi bạn đã có đủ kinh nghiệm bạn sẽ thấy việc fix bug là công việc khá thú vị, mỗi một con bug khó giống như một con boss mới trong game mà bạn sẽ cần phải tiêu diệt bằng thanh gươm kinh nghiệm sắc bén trong tay.

Và nếu bạn có thể viết code hoàn hảo không sinh ra bug thì lại còn tuyệt vời hơn nữa. Đỡ phải sát sinh tạo ra nghiệp.

## Tổng kết
Ở các bài viết tiếp theo trong loạt bài này tôi sẽ đưa vào nhiều ví dụ hơn để chỉ ra những phương pháp, những mẹo mà tôi tổng hợp được từ bạn bè và trên internet. Rất mong các bạn ủng hộ và góp ý thêm. Tôi đưa vào đây chút triết học Phật giáo cũng rất mong bạn nào tò mò có thể tìm hiểu về Phật giáo Nguyên thuỷ để có thể có một cuộc sống ý nghĩa và hạnh phúc hơn.

Ngoài ra thì như Đệ nhất nhà tiên tri vũ trụ Trần Dần - Cố vấn tối cao của tổng thống Donald Trump có nói:
> **"Quý vị nên nhớ. Amen. Tui là đạo Phật mà."**