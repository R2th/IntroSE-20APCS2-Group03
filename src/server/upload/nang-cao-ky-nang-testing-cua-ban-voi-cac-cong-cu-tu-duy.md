## Chìa khóa chính
Công cụ tư duy là một cách tiết kiệm hơn và hiệu quả để phát triển tư duy Testing  và nâng cao kỹ năng Testing.
Công cụ tư duy được phát triển từ các câu chuyện thử nghiệm, do đó, dễ dàng hình dung trong các tình huống được mô tả và dễ học và áp dụng.
Chúng  truyền cảm hứng cho bạn để được đổi mới và sáng tạo đối với quan sát và phản ánh của bạn.
Công cụ tư duy có thể giúp nâng cao kỹ năng của bạn trong cả khía cạnh kỹ thuật và con người của thử nghiệm và phát hành một sản phẩm chất lượng.
Bạn có thể phát triển Công cụ tư duy của riêng mình và trở nên có giá trị hơn trong vai trò là người kiểm thử , lập trình viên, người kiểm tra hoặc người quản lý dự án.


## Giới thiệu
Khá nhiều Tester  thường bỏ lỡ những suy nghĩ cần thiết cho việc thử nghiệm và phân phối các sản phẩm chất lượng. Đôi khi dường như ý thức chất lượng bị thiếu. Ít ai ngờ rằng một số Tester chỉ tìm thấy các lỗi rõ ràng và tại sao chất lượng lại bị lấy đi từ PUT (Chương trình đang thử nghiệm), mặc dù có sự hiện diện của người thử nghiệm trong dự án. Thêm vào đó là những thách thức lớn và không cần thiết đang chờ đợi một dự án, trong đó mỗi cá nhân trong mỗi vai trò (lập trình viên, quản lý dự án, trưởng thử nghiệm, kiểm thử viên) thiếu hiểu biết đúng đắn và mức độ tư duy kiểm tra cần thiết cho từng vai trò, để tăng cường phát hành thành công các sản phẩm chất lượng. Bài viết này là về cách tôi phát hiện ra một cách để phát triển tư duy Test của mình và cách khám phá của tôi hữu ích trong việc nâng cao kỹ năng Test của tôi.

Tôi đã suy nghĩ rằng : 
Tôi là loại Tester  nào, và tôi muốn trở thành loại  Tester nào?
Tôi bắt đầu như một "công cụ tìm lỗi rõ ràng". Tôi tin rằng nhiều Tester đã hoặc đang trải qua giai đoạn này, nơi họ dường như chỉ tìm thấy các bug rõ ràng. Tôi thấy mình trong những tình huống mà những Tester khác mà cuối cùng tôi bắt đầu gọi là những Tester giỏi, đã tìm ra những lỗi quan trọng từ một phần mềm mà tôi đã test. Tôi đã từng tự hỏi mình, làm sao họ tìm thấy những bugs đó?  Và tại sao tôi không tìm ra được  ???

Ban đầu tôi tự an ủi mình với suy nghĩ rằng đó là vì họ có nhiều kinh nghiệm hơn tôi và theo thời gian, tôi hy vọng sẽ trở nên giống họ. Nhưng không lâu sau đó, tôi đã quan sát thấy một số Tester thiếu kinh nghiệm cũng đang tìm thấy các lỗi quan trọng trên một phần mềm mà tôi hoặc một thành viên khác trong nhóm đã test. Cũng có một số Tester đã có nhiều năm kinh nghiệm nhưng chỉ tìm thấy lỗi rõ ràng. Sau đó, tôi nhận ra có vẻ như nó không phải nằm ở số  năm kinh nghiệm !

Vì vậy, tôi tự nhủ, có lẽ họ đã hoàn thành một số chứng chỉ. Tôi cũng làm như vậy, nhưng nó không giúp được gì nhiều. Tôi nhớ đã đi phỏng vấn trong giai đoạn này và người phỏng vấn hỏi tôi sẽ kiểm tra một chương trình cụ thể như thế nào. Tôi bắt đầu nói với anh ấy rằng tôi sẽ viết kế hoạch kiểm tra và các trường hợp kiểm tra theo cách tôi được dạy trong chứng nhận mà tôi đã làm. Anh nói với tôi " Tôi không muốn thử nghiệm như bạn! Tôi muốn một người kiểm thử sẽ không phải viết kế hoạch kiểm tra dài trước khi kiểm thử và một người kiểm thử có thể kiểm thử chỉ bằng một dòng của trường hợp kiểm thử  "  Cuộc phỏng vấn đó khiến tôi nhận ra rằng chứng chỉ của tôi đã không dạy tôi nhiều.

Sau đó, tôi nhận ra rằng có lẽ những Tester giỏi đã đọc những cuốn sách về Testing . Vì vậy, tôi bắt đầu đọc sách. Điều này tỏ ra khá hữu ích, nhưng không đủ nhanh để đưa tôi đến nơi mà tôi nghĩ tôi nên đến.

Tôi cũng quan sát thấy rằng những Tester giỏi đã được công nhận nhiều hơn về dự án. Khách hàng tiềm năng kiểm tra thường sẽ chỉ định các tính năng quan trọng và quan trọng hơn cho họ, trong khi những người tìm thấy các lỗi rõ ràng, thì được chỉ định để làm việc với các tính năng / nhiệm vụ ít quan trọng hơn và ít quan trọng hơn.

Không hay chút nào khi trở thành một công cụ tìm kiếm các lỗi rõ ràng và một người thử nghiệm có công cụ duy nhất đấy. Tôi mong muốn trở thành một người Tester có giá trị, người giúp cung cấp thông tin quan trọng có thể giúp cải thiện chất lượng sản phẩm.

Một ý nghĩ xuất hiện thường xuyên và trở thành câu hỏi mà thỉnh thoảng tôi đã tự hỏi mình khi nghĩ về cách biến mong muốn của mình thành hiện thực, đó là lý do tại sao những người thử nghiệm mà tôi gọi là những người thử nghiệm giỏi và tìm thấy những thứ mà tôi không nhìn thấy và tìm thấy? Nếu tôi có thể tìm ra điều này, thì tôi có thể biết được điều gì làm nên sự khác biệt giữa "người thử nghiệm tốt" và bản thân tôi và cách phát triển. Vì vậy, con đường phía trước là bắt tay vào tìm hiểu!

## Khám phá đã thay đổi cách tôi kiểm tra: các công cụ Tư duy và  Tư duy Tester !

### Công cụ tư duy

Khi tôi nghĩ về những gì tạo ra sự khác biệt, tôi nhận ra rằng có lẽ tôi có thể học được điều gì đó từ những gì đang xảy ra xung quanh tôi. Vì vậy, tôi bắt đầu quan sát, phân tích và suy ngẫm vào những dịp mà tôi hoặc những người khác trong nhóm của tôi phát hiện ra những lỗi quan trọng:  làm thế nào tôi / họ tìm thấy chúng? Quá trình suy nghĩ của tôi / họ lúc đó là gì?

Những phản ánh của tôi đã thu hút sự chú ý của tôi vào những câu chuyện thử nghiệm do những phát hiện lỗi và những cuộc gặp gỡ hàng ngày của tôi khi tôi thử nghiệm và tương tác với các cá nhân trong các vai trò khác nhau trong dự án. Tôi đã khám phá ra điều đó:

### Tư duy của tôi đóng một vai trò quan trọng trong cách tôi tìm thấy lỗi và thử nghiệm của tôi tốt như thế nào
Khi tôi tiếp tục quan sát, phân tích và phản ánh, tôi đi đến kết luận rằng thử nghiệm đòi hỏi tôi:

- Giữ cho suy nghĩ của tôi linh hoạt khi tôi kiểm tra
- Xem các nhiệm vụ / tính năng thử nghiệm khác nhau, từ các góc độ khác nhau, với các ống kính khác nhau và các suy nghĩ khác nhau

Do đó, tôi cần thay đổi suy nghĩ / lý luận của mình đối với PUT mỗi khi tôi kiểm tra.

Để giữ cho suy nghĩ của tôi linh hoạt và giúp tôi nhìn mọi thứ từ các góc độ khác nhau:

Tôi xác định các phương pháp tư duy mà tôi thấy hữu ích trong các câu chuyện thử nghiệm do phát hiện lỗi hoặc các sự cố tương tác trong dự án
Tôi đặt một tên trên phương pháp tư duy xác định. Tôi gọi mỗi tư duy được dán tên là Công cụ tư duy. Tôi nghĩ ra một cái tên giúp tôi dễ nhớ hoặc kết nối với từng Công cụ tư duy được xác định. Tôi chia thành từng bài học rút ra từ những câu chuyện thử nghiệm mà tôi gọi là Tweaks Mindset
Tôi sử dụng Tweaks Mindset để bắt đầu sử dụng từng Công cụ Mindset bằng cách điều chỉnh suy nghĩ của mình theo Tweaks Mindset mỗi khi tôi kiểm thử.

Ví dụ về các công cụ tư duy mà tôi đã xác định và đặt tên từ các câu chuyện thử nghiệm bao gồm:

- Tư duy End User
- Tư duy đã test
- Tư duy dựa sự lười biếng
- Tư duy phân tích 
- Tư duy phê phán 
- Tư duy tò mò 
- Tư duy lỗi thuyết phục 
- Tư duy liên kết 
- Tư duy Business 
- Tư duy dẫn đầu 
- Tư duy phê phán
- Tư duy xử lý sự e ngại 

Đây là khởi đầu của sự đột phá  vào thế giới thử nghiệm tốt hơn và hiệu quả hơn, cũng như tăng trưởng nhanh chóng!

Vì vậy, tôi tự nghĩ, đây là điều làm nên sự khác biệt.  Không có gì ngạc nhiên khi một số người thử nghiệm chỉ tìm thấy các lỗi rõ ràng và tại sao chất lượng lại vượt xa PUT, mặc dù có sự hiện diện của những người thử nghiệm trong dự án!

## Tư duy kiểm thử  :
Là phần tiếp theo của những trải nghiệm này, tôi đã đưa ra định nghĩa cho tư duy người thử nghiệm. Tôi đã định nghĩa tư duy thử nghiệm, hay tư duy kiểm tra, như:

- Cách lập luận xác định hành vi, quan điểm hoặc thái độ tinh thần của người kiểm tra, lập trình viên hoặc người quản lý dự án đối với việc kiểm tra PUT
- Lý do cần thiết trong việc đặt câu hỏi và điều tra PUT. Điều này được lấy cảm hứng từ định nghĩa của thử nghiệm, khi đặt câu hỏi về PUT hoặc điều tra PUT để có được thông tin hữu ích về chất lượng sản phẩm của nhóm (James Bach)
- Một hành vi xác định cách người kiểm thử, lập trình viên hoặc người quản lý dự án điều chỉnh suy nghĩ hoặc lý luận của anh ấy / cô ấy liên quan đến PUT và mọi thứ được kết nối với sự tồn tại của nó, ví dụ: hoạt động thử nghiệm, lập trình viên đồng nghiệp, quản lý dự án, thành viên nhóm...

## Tư duy của người kiểm tra yêu cầu:

- Người kiểm tra phải liên tục trả lời câu hỏi, "tôi muốn liên quan đến PUT như thế nào và mọi thứ liên quan đến sự tồn tại của nó (bao gồm cả con người) để cung cấp hiệu quả thông tin có giá trị cần để đưa ra quyết định về chất lượng của PUT?"
- Các lập trình viên, trưởng nhóm kiểm tra và quản lý dự án trả lời nhất quán câu hỏi về cách tôi muốn hỗ trợ thử nghiệm, từ đó tăng cường phát triển và phát hành một sản phẩm chất lượng?

## Công cụ tư duy: Nó hoạt động như thế nào?
Để giải thích cách tôi sử dụng Công cụ tư duy, tôi sẽ đưa ra ba ví dụ.

1. Ví dụ đầu tiên là Công cụ tư duy của người dùng trên mạng:
Câu chuyện thử nghiệm cơ bản: Trong những ngày đầu làm thử nghiệm, tôi đã trải qua những lần tôi phát hiện ra một số lỗi nhất định và sau khi đánh giá, lập trình viên hoặc trưởng nhóm phần mềm sẽ nói rằng người dùng sẽ không sử dụng sản phẩm theo cách đó! Vì vậy, lỗi không được sửa chữa. Có một lần, sản phẩm đã được phát hành và một lỗi mà các lập trình viên đã nói, người dùng sẽ không sử dụng sản phẩm theo cách đó, là một trong những lỗi đầu tiên được báo cáo từ hiện trường. Và đoán xem? Sau khi điều tra, chúng tôi phát hiện ra rằng người dùng thực sự đã sử dụng sản phẩm theo cách các lập trình viên nói rằng họ sẽ không sử dụng nó!

Để tin rằng người dùng sẽ không sử dụng sản phẩm theo những cách nhất định mà chúng tôi không mong đợi, là một lời ngụy biện! Do đó, cần phải mở rộng trí tưởng tượng của chúng ta về cách người dùng sẽ sử dụng sản phẩm. Dựa trên câu chuyện thử nghiệm này, tôi đã gắn nhãn cho công cụ Mindset Mind của người dùng và xác định các Tweak tư duy sau đây mà tôi sử dụng để điều chỉnh lý luận của mình khi tôi kiểm tra. Chúng đã rất hữu ích trong việc tìm kiếm các lỗi quan trọng hơn trong danh mục này.

## Mindset Tweaks (đi từ bài học kinh nghiệm):

Trở thành người dùng, tức là nghĩ như người dùng khi bạn kiểm tra (cả lập trình viên và người kiểm tra)
 Người dùng sẽ trải nghiệm sản phẩm bằng 5 giác quan của mình. Ví dụ: suy nghĩ về: cách họ chạm vào, họ sẽ cảm thấy gì khi chạm vào, cách họ có thể phản ứng khi chạm, nếm, ngửi và nghe âm thanh từ sản phẩm
Con người là thám hiểm trong tự nhiên, do đó người dùng sẽ khám phá.
Thu thập thông tin về cách người dùng có thể sử dụng Chương trình được kiểm tra để giúp bạn suy luận

2. Một ví dụ thứ hai là "Công cụ tư duy đã được thử nghiệm"
Câu chuyện kiểm tra lý lịch: Thường thì tôi đã gặp phải tình huống người ta nói rằng một phần mềm đã được kiểm tra và tất cả những gì tôi cần làm là kiểm tra nhanh. Có một lần, đồng nghiệp lập trình viên của tôi nói với tôi rằng anh ta đã thử nghiệm một chức năng trong một tính năng và tôi không nên kiểm tra lại nó. Nhưng do tiền lệ, tôi quyết định vẫn kiểm tra ngắn gọn. Trước sự ngạc nhiên của tôi, chức năng đã thất bại với những gì lập trình viên nói rằng anh ta đã thử nghiệm.

Một thử thách mà tôi gặp phải là, làm thế nào để nói với anh ấy rằng tôi vẫn đi kiểm tra những gì anh ấy nói tôi không nên kiểm tra. Chà, tôi đã giải quyết điều này bằng cách thiết lập một kịch bản thử nghiệm bao gồm việc sử dụng chức năng thất bại trong thử nghiệm hiện tại của tôi. Vì vậy, tôi đã mời anh ấy đến phòng thí nghiệm và giải thích rằng tôi đã quan sát thấy một hành vi mà tôi đã không hiểu trong một trong những thử nghiệm của mình và tôi muốn anh ấy xem xét nó. Khi nhìn thấy những gì đã xảy ra, anh ta nói, đã khắc, nhưng tôi đã thử nghiệm điều này trước khi cuốn. Anh ta nói thêm, "Vivien, anh sẽ không tin tôi nữa đâu.

Tôi có thể thấy sự bối rối được viết trên người anh ấy và biết rằng tôi cần phải giúp đỡ tình hình. Vì vậy, tôi đã trả lời, không hoàn toàn tin tưởng, tôi tin bạn, tôi tin bạn và tôi biết bạn luôn phấn đấu để làm tốt công việc. Tuy nhiên, sự hiểu biết của tôi là bản chất của mã có lỗi bug (Tôi cũng đã sử dụng sự bối rối và suy nghĩ tin cậy trong dịp này).

Trong một dịp khác, một đồng nghiệp lập trình viên của tôi đã nói với một người thử nghiệm hợp nhất một phần mềm vào nhánh chính mà không cần kiểm tra. Theo ông, ông chỉ thực hiện một thay đổi không đáng kể trong việc làm sạch một dòng mã không sử dụng, đã được nhận xét trước đó. Nhưng anh ta không biết, anh ta đã xóa một dòng mã hoạt động bổ sung trong quy trình.

Vì vậy, người kiểm thử đã hợp nhất mà không cần kiểm tra, và sau đó không ai có thể sử dụng nhánh chính của phần mềm. Trong quá trình điều tra, người ta phát hiện ra rằng nguyên nhân của vấn đề là do phần mềm mà anh ta nói với người thử nghiệm để hợp nhất.

Dựa trên những bài học rút ra từ những câu chuyện thử nghiệm này, tôi đã nghĩ ra cái tên Công cụ tư duy đã được thử nghiệm và Công cụ tư duy Tweaks sau đây mà tôi sử dụng để điều chỉnh lý luận của mình khi kiểm tra:

## Tinh thần tư duy:

- Hãy xem xét chất lượng thử nghiệm đã được thực hiện trước đó
- Hãy xem xét khả năng áp lực của người thử nghiệm / lập trình viên. Chúng tôi thấy khác nhau, lý do khác nhau và có chuyên môn khác nhau như lập trình viên và người thử nghiệm
- Hãy xem xét cái gọi là những thay đổi không đáng kể  - không có những thay đổi không đáng kể nào

3. Một ví dụ thứ ba là Công cụ tư duy lười biếng của người kiểm tra lười biếng:
Câu chuyện thử nghiệm cơ bản: Cách đây một thời gian, tôi đang ngồi trong một cuộc họp và người đứng đầu phần mềm cho biết, ông A thử nghiệm lười biếng phát hiện ra lỗi đó. Anh ấy nói thêm, rất tốt khi có chúng trong dự án, nhưng không quá nhiều trong số chúng. Điều này khiến tôi chú ý. Tôi đã ghi chú ID báo cáo lỗi và đi tìm xem "người kiểm tra lười biếng" này là ai.

Tôi phát hiện ra rằng người được nhắc đến là một đồng nghiệp thử nghiệm của tôi, người thường tìm thấy những lỗi khá quan trọng. Nhưng cách anh ta tìm thấy chúng là trong khi anh ta đang thử nghiệm, anh ta nghỉ ngơi để đi đến máy pha cà phê chẳng hạn. Tại máy pha cà phê, anh ta bị mang đi nói chuyện với một đồng nghiệp, quên rằng anh ta đang chạy thử. Khi quay lại Chương trình đang thử nghiệm, anh phát hiện ra rằng nó đang ở trạng thái bất thường: đã xảy ra lỗi! Anh ta báo cáo lỗi bao gồm một lời giải thích rằng anh ta đã mang đi nói chuyện với một đồng nghiệp. Do đó, anh ta có được danh hiệu: Người lười thử nghiệm.

Phân tích câu chuyện thử nghiệm này, tôi quyết định nghiên cứu sự lười biếng. Tôi phát hiện ra câu nói của Bill Gates, trong đó có nội dung: Tôi sẽ luôn sử dụng một người kiểm tra lười biếng để làm một công việc khó khăn vì tôi biết anh ta sẽ luôn tìm ra một cách dễ dàng để làm điều đó. Rồi tôi tự nghĩ:

- Dường như có một số giá trị ở những người lười biếng, do đó tôi đặt tên cho công cụ này là Công cụ tư duy kẻ lười biếng
- Có những lỗi chúng tôi có thể không bao giờ tìm thấy, ngoại trừ khi chúng tôi kiểm tra như người thử nghiệm Lazy!
- Tôi không phải lười biếng, nhưng chuyển sang Tư duy này sẽ hoàn thành công việc!

Vì vậy, tôi đã nghĩ ra Tweaks Mindset sau đây mà tôi sử dụng để điều chỉnh Tư duy của mình khi tôi kiểm tra:

## Tinh thần tư duy:

Khám phá những gì người kiểm tra lười biếng làm; họ khám phá phần mềm theo cách mà những người làm việc chăm chỉ 
Đối với các thử nghiệm dẫn đầu: khám phá tài năng trong nhóm của bạn

Chẩn đoán Test Mindset:  Công cụ tư duy dành cho tất cả mọi người!
Tôi tiếp tục quan sát các sự cố dẫn đến sự tương tác trong nhóm và tôi không thể ngừng tự hỏi:

- Tại sao người kiểm tra nên bị khiển trách vì không tìm thấy một số lỗi nhất định, khi tất cả những gì họ đã có là một kế hoạch thời gian không thể?
- Tại sao các lập trình viên nên được đánh giá dựa trên số lượng lỗi được tìm thấy trong mã của họ hoặc người kiểm tra được đánh giá theo số lượng lỗi mà họ tìm thấy?
- Tại sao các lỗi không được tìm thấy trong quá trình thực hiện nếu kỳ vọng khi kiểm tra là người kiểm tra chỉ nên đánh dấu vào danh sách kiểm tra?
- Tại sao PUT không bị lỗi như lỗi Bug, khi bộ não và trí óc của người kiểm tra bị hạn chế tuân thủ nghiêm ngặt các trường hợp kiểm tra bằng văn bản, do đó hạn chế khả năng suy luận của họ vượt quá phạm vi của các trường hợp kiểm tra bằng văn bản?
- Tại sao phải thử nghiệm và chất lượng sản phẩm được coi là trách nhiệm duy nhất của người thử nghiệm hoặc lập trình viên?
- Những nhận thức này phá hỏng các dự án của chúng tôi do thiếu hiểu biết đúng đắn về những gì kiểm tra liên quan.

Vì vậy, hãy nghĩ về nó:

Các lập trình viên nói: Tôi muốn xây dựng phần mềm
Người kiểm thử nói:  Tôi muốn kiểm tra phần mềm và cung cấp đầu vào để cải thiện chất lượng
Các nhà quản lý dự án cho biết:  Tôi muốn cung cấp một phần mềm chất lượng làm việc cho các bên liên quan
Những người tiếp thị nói:  Tôi muốn bán phần mềm có lãi
Mỗi vai trò này thường mong đợi rằng những người thử nghiệm sẽ tìm thấy tất cả các lỗi trong phần mềm.

Tuy nhiên, theo tôi, thử nghiệm thành công và hiệu quả bắt đầu với các cá nhân trong mỗi vai trò nhận ra rằng:

 - Thử nghiệm có sự phụ thuộc vào vai trò của họ và thành công của vai trò của họ có sự phụ thuộc vào thử nghiệm. Nói cách khác, họ không thành công cho đến khi thử nghiệm thành công.
- Xây dựng phần mềm chất lượng là trách nhiệm của mọi người, do đó tất cả các vai trò trong dự án phát triển phần mềm phải hợp tác cùng nhau
- Hiểu được tâm lý của từng vai trò và điều quan trọng nhất trong các tình huống khác nhau là cần thiết cho sự phát triển và phát hành phần mềm chất lượng
- Mọi người làm việc với PUT đều cần một tư duy hoạt động với sự hiểu biết về mục tiêu của từng vai trò và bản thân họ.

Nếu bạn đồng ý với tôi về những điểm trên, thì có lẽ bạn sẽ đồng ý với tôi rằng mọi người làm việc với PUT cần một tư duy kiểm tra để phát triển và phát hành phần mềm chất lượng! Và nếu bạn đồng ý với điều đó, rất có thể bạn sẽ đồng ý với tôi rằng Công cụ tư duy dành cho tất cả mọi người!

Nếu mọi người làm việc với sự phát triển của một sản phẩm có sự hợp lý về tư duy kiểm tra và chúng tôi làm việc với sự hiểu biết về cách thức hoạt động của chúng tôi kiểm tra tác động và chất lượng sản phẩm cuối cùng, thì chất lượng sẽ không bị ảnh hưởng. 

## Khám phá và phát triển Công cụ tư duy của riêng bạn

Thường thì chúng ta không quan sát, và chúng ta không phản ánh về những quan sát của mình.Nếu chúng ta làm như vậy, rất có thể chúng ta không thể rút ra kết luận hoặc học hỏi từ những phản ánh của chúng ta. Câu chuyện thử nghiệm ở khắp mọi nơi, mỗi ngày, xung quanh chúng ta khi chúng ta làm việc trong các dự án phát triển phần mềm. Nếu chúng ta dám khám phá chúng, tôi nghĩ chúng có thể là một nguồn học tập tuyệt vời. Tôi đã nảy ra ý tưởng về Công cụ tư duy bằng cách quan sát, phản xạ và phản hồi lại những phản ánh của mình, bằng cách điều chỉnh lý luận của tôi với kết quả của những suy nghĩ của tôi.

Mọi người thường hỏi tôi:   Làm thế nào chúng ta có thể nhồi nhét các Công cụ tư duy và Tinh chỉnh tư duy?  
Câu hỏi này thực sự khiến tôi suy nghĩ và những gì tôi nghĩ ra, là không cần phải nhồi nhét. Vì Công cụ tư duy được xây dựng từ những câu chuyện thử nghiệm xảy ra xung quanh chúng ta, nên chúng ta có khả năng tự nhiên tìm hiểu chúng và thậm chí phát triển Công cụ tư duy của riêng mình, nếu chúng ta có ý thức về quá trình. Do đó tôi đề xuất một mô hình Công cụ tư duy như dưới đây:

### Quan sát:

Quan sát những gì xảy ra trong công việc hàng ngày của bạn
Hãy chú ý đến cách bạn / người kiểm tra khác tìm thấy lỗi
Tìm hiểu để kể / ghi chú các câu chuyện thử nghiệm do các tương tác giữa Người kiểm tra, Lập trình viên, Người dẫn thử nghiệm và Người quản lý dự án trong nhóm

### Phản chiếu:

Phản ánh về các hoạt động được quan sát trong ngày, các lỗi được tìm thấy, cách chúng được tìm thấy và các tình huống phát sinh từ Người kiểm tra, Lập trình viên, Người dẫn thử nghiệm và Người quản lý dự án Tương tác trong nhóm, v.v.

### Phản hồi / Thích ứng:

 - Xác định và gắn tên lý do / suy nghĩ mà bạn thấy hữu ích trong các câu chuyện thử nghiệm và trong khi thực hiện nhiệm vụ của bạn trong dự án
-  Hãy đến với Mindset Tweaks bằng cách ghi rõ từng mục từ bài học kinh nghiệm
 - Điều chỉnh lý luận của bạn dựa trên Công cụ tư duy và Tinh chỉnh tư duy đã xác định của bạn khi bạn thực hiện nhiệm vụ của mình trong dự án

## Phần kết luận
Nếu chúng ta dám quan sát, và dám suy ngẫm về những quan sát của mình và hơn nữa dám hành động theo kết quả của những phản ánh của chúng ta, thì chúng ta đã dám học hỏi và phát triển! Khi tôi bắt đầu sử dụng Công cụ tư duy, tôi bắt đầu phát triển và trở nên tốt hơn khi thử nghiệm. Tôi trở thành một người thử nghiệm có giá trị hơn, có ý kiến quan trọng trong các quyết định được đưa ra về sản phẩm. Tôi thấy mọi thứ khác đi và tìm thấy những lỗi quan trọng, ngoài những lỗi rõ ràng. Các đồng nghiệp lập trình viên của tôi sẽ hỏi ý kiến của tôi về cách tôi nghĩ một vấn đề nên được giải quyết hoặc điều tôi nghĩ là giải pháp tốt nhất để sửa các lỗi hoặc sự cố cụ thể. Họ nghĩ  vì tôi thấy được mọi thứ có thể sai trong phần mềm. Điều này, tôi tin rằng,  là vì họ phát hiện ra rằng lý do của tôi về phần mềm đã trở nên có giá trị.

Tôi tìm thấy các đồng nghiệp hỏi tôi làm thế nào tôi phát hiện ra một số lỗi nhất định, bởi vì đôi khi họ bối rối trước những gì có thể khiến ai đó nghĩ về những kịch bản có giá trị như vậy. Giám đốc dự án của tôi đã đưa ra phản hồi cho công ty của tôi nói rằng: Tôi à một người thử nghiệm siêu sao siêu sao. Có một lần, chúng tôi có một khách hàng ghé thăm và các lập trình viên đã giới thiệu tôi là người thử nghiệm tốt nhất trên thế giới - giá trị họ đã khám phá theo cách tôi kiểm tra). Một điều thú vị khác, là khi tôi thực hành sử dụng Công cụ tư duy, tôi nhận thấy rằng nó cũng tác động đến cách các lập trình viên làm việc;  họ cũng phát triển, học hỏi và cải thiện tư duy kiểm tra.



Refer source:
https://www.infoq.com/articles/testing-mindset-tools/