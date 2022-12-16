# Lời nói đầu
Xin chào các bác, em đã trở lại rồi đây 😃).Khác với các bài chia sẻ trước, lần này em sẽ không chia sẻ về một kỹ thuật cụ thể nào về các ngôn ngữ lập trình hay framework của nó. Mà sẽ là một bài viết, hay đúng hơn là một bài chia sẻ cá nhân của một lập trình viên lâu năm mà em vô tình được đọc.Bài viết về  "What is the hardest skill to teach in software engineering?" có thể tạm dịch là "Kỹ năng khó dạy nhất trong ngành kỹ thuật phần mềm là gì?". Giờ thì cùng xem kỹ năng khó dạy nhất là gì nhé! let's go =))
# Content
Có một kỹ năng cực kỳ khó dạy hay thực hiện trong bất kỳ tình huống nào của kỹ thuật phần mềm...

Để hiểu về điều này tôi cần kể một câu chuyện khá buồn cười.

Nhiều năm trước Google tung ra tính năng mới đáng kinh ngạc này. Đó là một ô bảng tự động xổ xuống hiện ra các từ khi bạn đang gõ vào. Thực sự quá ấn tượng.

Về kỹ thuật mà nói, họ phải giải quyết một vài vấn để lớn để có thể khiến tính năng này vận hành được.

Đầu tiên, họ phải có được trải nghiệm UI (User Interface - Giao diện người dùng) và những phần javascript liên quan để hiện ra được hết những từ gợi ý được tự động hoàn thành trong thời gian thực (hoặc tôi đoán là phải gần với thời gian thực).

Thứ hai, họ cần có một danh sách gợi ý tự động hoàn thành hợp lý dựa trên những gì mà một người dùng đang gõ vào. Và rõ ràng người dùng đó có thể gõ bất kỳ thứ gì vào Google, thực sự có quá NHIỀU biến thể.

Thứ ba, việc này có khả năng tạo ra một lượng tải dữ liệu lớn lên hệ thống. Theo tôi nhớ, bài đăng trên blog ấy nói rằng tính năng này khiến họ cần phải nâng cấp cơ sở hạ tầng lên tới 6 lần để hỗ trợ các yêu cầu HTTP bổ sung và những truy vấn cơ sở dữ liệu, vv...

Thực hiện được tất cả các việc đó khi biết lượng người dùng của Google là vài trăm triệu thực sự là một điều cực kỳ ấn tượng.

Đồng thời, đối với bất kỳ ai nghĩ rằng bạn có thể thực hiện điều này vào cuối tuần bằng React và Elastic Search thì, không có công cụ nào trong số đó tồn tại vào thời điểm ấy.
Dù sao chăng nữa, như tôi đã nói đó là một tính năng cực kỳ tuyệt vời vào lúc bấy giờ và cùng lúc đó tôi đang làm việc với rất nhiều trang web gây quỹ phi lợi nhuận mang lại nguồn đóng góp hàng triệu đô la.

Ai đó đã thấy việc Google đang làm và nghĩ rằng chúng tôi nên đưa tính năng đó vào trang web của mình. Rất tiện lợi khi muốn tìm kiếm các sự kiện và con người một cách nhanh chóng hơn, vì thế có lẽ đó là một ý tưởng hay ho vào lúc đó.
Chúng tôi có một chuyên gia JavaScript trong nhóm lúc bấy giờ, vì thế đội front end đã cùng giải quyết một vài vấn đề. Về phía backend chúng tôi đang dùng MySQL, vì thế chúng tôi đã cùng nhau hack một bảng gợi ý. Hơi chậm một chút, nhưng khi chạy thử cũng khá ổn.

Vì thế, sau một tháng phát triển, chúng tôi phát hành tính năng này. Có vẻ cũng chẳng có chuyện gì lớn cho đến khoảng vài giờ sau đó...

Trang web sập luôn.

Có vẻ như chúng tôi đã bị Ddos và tốn khoảng một giờ để đảo ngược mọi thứ về lúc trước và đưa trang web trở lại bình thường.

Hóa ra JS đã gửi một yêu cầu AJAX với mỗi lần bấm phím. Vì thế, nếu một người dùng gõ “John Doe” thật nhanh vào thanh tìm kiếm, nó sẽ gửi đi tám yêu cầu HTTP. Tệ hơn là, 7 truy vấn đầu tiên hoàn toàn vô dụng.

Quá rõ tại sao Google cần nâng cấp cơ sở hạ tầng của họ để phù hợp với tính năng ấy. Trưởng nhóm đã không xem xét vấn đề đó một chút nào.

Giải pháp hóa ra khá đơn giảm, hãy đặt một khoảng thời gian nghỉ để đợi ít nhất là nửa hoặc một giây sau lần gõ phím sau cùng trước khi xổ ra tấm bảng tự động gợi ý. Đồng thời, sau đó chúng tôi sử dụng ElasticSearch để tìm kiếm backend khi nó được phát hành.

Có hai vấn đề cốt lõi trong câu chuyện này.
Một, trang web sập trong vòng một giờ có thể gây tổn thất đâu đó từ 10,000 đến 100,000 USD tiền đóng góp. Gần một năm lương của FTE rồi đó (phụ thuộc vào vị trí và số lượng thực sự bị tổn hại).

Hai, thực ra không hề cần tới tính năng đó. Đó là một tính năng “có vẻ hay” nhưng không đảm bảo được rằng ứng dụng của bạn sẽ tốt hơn. Đồng thời, nó mang lại một rủi ro tổn hại khiến chúng tôi chịu một cú đòn khá đau đớn.

Chúng tôi có thể tránh được tất cả những điều này nếu nhóm tiếp cận kỹ thuật phần mềm từ cách tiếp cận tối giản.
Code nhanh nhất là code không phải chạy một chút nào.
Chạy ít truy vấn SQL tốt hơn là chạy nhiều truy vấn.

Ít tính năng hơn tức là ít phức tạp hơn.
Ít thư viện hơn tức là ít phức tạp hơn.
Ít công cụ hơn là ít phức tạp hơn.
Phức tạp khiến ta tốn thời gian.
Phức tạp khiến ta tốn ttiền bạc.
Không làm gì tốt hơn là làm một việc thừa.

Một kỹ sư Phần mềm trưởng thành sẽ làm mọi thứ trong khả năng của mình để tránh sự phức tạp và việc viết code khi nào có thể.

Gần như không thể dạy được về tính tối giản trong kỹ thuật phần mềm.

Cũng rất khó để có được một nhóm quanh bạn. Hầu hết mọi người sẽ sử dụng thư viện mới, công nghệ mới và những thứ tương tự trong cuộc đua được định sẵn bởi sự lười biếng của họ.

Món nợ trong công nghệ là tiêu chuẩn mới mà mọi người rất hạnh phúc khi không thể nào dứt bỏ nó được.
Vì thế, có được sự tối giản trong kỹ thuật phần mềm, giả dụ như cách tiếp cận để tạo ra ít khối lượng phần mềm nhất với ít công cụ nhất, không phải là một kỹ năng phổ thông hay dễ dàng truyền dạy được.

Các lập trình viên thích lăn lóc trên một mớ hổ lốn những “đồ chơi”. Thực tế là gần như không thể đạt được tới một thứ gì đó gần với nó trong một tổ chức có nhiều hơn một người.
# lời kết
Đây là bài chia sẻ của Brian, tác giả của bài viết. Bản thân em thấy khá hay ho. không biết các bác thấy thế nào? comment bên dưới suy nghĩ của các bác nhé! và cùng đóng góp ý kiến để em có thể cải thiện nội dung bài viết ở những bài post sau. Thanks :D
# Tham khảo
https://www.quora.com/What-is-the-hardest-skill-to-teach-in-software-engineering/answer/Brian-Knapp-1