<h2>Mở đầu</h2>
<blockquote>Every single computer you know today except Watson is a programmable system.
Watson has now launched a third era IBM like to call it cognitive computing.
Coginitive systems learn they are not programmed yet, cognitive system are more than machine learning system</blockquote>
Mình tình cờ xem video robot <a href="https://www.youtube.com/watch?v=rXVoRyIGGhU&amp;t=197s">IBM Watson</a> và câu bên trên là một câu được robot nói. Các máy tính ngày nay bạn biết ngoại trừ Watson đều được lập trình tường minh. Watson mở ra một kỷ nguyên mới được gọi là cognitive computing. Cognitive systems học, chúng không phải lập trình, cognitive system nhiều hơn machine learning system. Bài dịch này không nhằm mục đích giới thiệu IBM Watson hay coginitive system (vì mình cũng không biết nó). Bài viết chỉ ra cái nhìn khác, mặt hạn chế của machine learning. Mình không cố giật tít, tiêu đề là mình dịch nguyên gốc.
<h2>Machine Learning hoạt động như thế nào? Thần thoại và sự thật</h2>
Đáp lại câu hỏi "Machine Learning hoạt động như nào?" Có rất nhiều huyền thoại: rằng nó học một cách tự động, rằng nó không yêu cầu phải tùy biến hay chỉnh sửa bởi các tổ chức sử dụng nó, rằng nó phù hợp với bất kỳ business nào và có thể giải quyết bất kỳ vấn đề nào. Nhưng liệu có đúng như vậy.

Giống như bất kỳ công nghệ nào, Machine Learning có tiềm năng về business trong một vài trường hợp, nhưng không phải luôn luôn. Mặc dù được quảng cáo là tạo ra các máy tiếp thị công nghệ cao, nó thường không phải là giải pháp tốt nhất cho việc phân tích thông tin phi cấu trúc. Mặc dù các mà bạn <a href="https://www.kdnuggets.com/2016/08/artificial-intelligence-useful-technology-next-frankenstein.html">nghe được</a>, nhưng nó không phải ngày hôm này, trong tương lai gần. Đây là sự thật mà (hầu hết) không có ai muốn nói về nó.

Như đã giải thích trong <a href="https://www.expertsystem.com/truth-machine-learning-deep-learning-2/">bài viết này,</a> machine learning là "một cách khác của việc lập trình máy tính thực thi một tác vụ;" vì thế trước khi hỏi "machine learning làm việc như thế nào?". Nó rất quan trọng để thiết lập lại kỳ vọng đúng đắn về tiềm năng của machine learning trong business, nhớ rằng nó không phải là thứ phép thuật hay thứ gì đó mới mẻ. Và mặc dù nó gây ấn tượng(hiểu lầm) rằng máy tính có thể nhanh chóng trở nên thông minh (trong hoặc vượt ra ngoài trình độ của loài người, cảm ơn trí tuệ nhân tạo).
<h3>Đặc trưng của machine learning (và giới hạn của chúng)</h3>
Mặc dù có một số kĩ thuật machine learning, tất cả chúng đều chung phần lõi thống kê. Nói một cách đơn giản (In layman's terms), Machine learning không nhúng hiểu biết, nó yêu cầu tập tài liệu cho training (một tập tài liệu lớn hơn thì tốt hơn). Tập training phải được đánh dấu thủ công bởi con người vì thế thuật toán có thể ghi lại cái gì có trong tài liệu. Đây là lý do tại sao machine learning không thể tự nó làm mọi thứ... Rất nhiều công việc chân tay sẽ được yêu cầu trong bất kỳ kịch bản nào!

Để học hay nhận dạng tài liệu liên quan tới chủ đề, kĩ thuật machine learning phải nuốt vào một số lượng lớn các tài liệu liên quan tới chủ đề đó. Nó cũng phải được gắn thẻ thủ công một lượng lớn tài liệu cái chứa chủ đề và một lớn tương tự không chứa chủ đề đó. Chỉ sau quá trình xử lý nhiều tài liệu đồng thời và tần xuất các từ khóa hệ thống sẽ nhận ra được chủ đề của tài liệu.

Độ chính xác của hệ thống đã được train sẽ thay đổi dựa trên số lượng tài liệu được sử dụng trong suốt quá trình train và bao quát các tài liệu này. Hệ thống cũng thường xuyên phải train lại để duy trì chất lượng hệ thống. Sự quá tải thông tin sẽ làm chậm cả hệ thống, trong khi quá khớp (quá nhiều hệ thống cùng thể loại) sẽ khiến cho độ chính xác thấp. Nói cách khác tài liệu sai sẽ là lý do khiến chất lượng giảm.

Trong một  <a href="https://www.wired.com/2016/05/the-end-of-code/">article</a> nổi tiếng, chúng tôi đọc rằng "với machine learning, các kĩ sư không bao giờ biết đúng tuy nhiên máy tính lại hoàn thành được tác vụ của nó". Neural networks hoạt động mờ mịt và không thể hiểu được, một cách nói khác "black box". Nghĩa là vấn đề cải thiện bị giới hạn, và nó thường khó để hiểu được tại sao hệ thống lại cải thiện hay làm cách nào bạn cải thiện nó. Trong hệ thống machine learning, đơn giản là không có công cụ nào để với cái để lọc giải thuật. Với machine learning thuần, chỉ một sự lựa chọn bạn có là thử thật nhiều giải thuật khác nhau. Không may, điều này không đảm bảo rằng bạn sẽ cải thiện được kết quả và đạt tới độ chính xác yêu cầu.

Nếu có bất kỳ sai lầm nào được phát hiện hoặc hệ thống cần phải sửa đổi vì bất kỳ lý do gì, quá trình lại quay về điểm bắt đầu.
<h3>Từ machine learning đến Cognitive AI</h3>
Trở lại với câu hỏi đầu tiên của chúng ta "machine learning hoạt động như nào?" Chúng ta có thể nói rằng machine learning hỗ trợ tổ chức khi chúng ta có đủ số lượng tài liệu để train và khi đó chúng ta có một kịch bản đơn giản. Đối với phân tích dữ liệu, ứng cử viên cho thuần machine learning chính xác là cái này: Trường hợp độ phức tạp thấp và tập dữ liệu training lớn với phân phối xác suất của các đầu ra cân bằng.

Thay vào đó, khi tình hình mà một lượng nhỏ và không đồng đều các mẫu, độ phức tạp cao, machine learning là không đủ. Cho trường hợp này, bạn cần một <strong>linguistic enginem </strong>thứ đủ tinh vi để đảm bảo hiểu sâu vào nội dung và tập công cụ mạnh mẽ đủ để phát triển một ứng dụng <strong>advanced linguistic rules</strong> hiệu quả.

Tập kĩ thuật Cogito cognitive cung cấp các luật cơ bản về cognitive technology và thuật toán dựa vào machine learning để giải quyết các vấn đề thường gặp về xử lý thông tin phi cấu trúc. Bao gồm phần lớn các kĩ thuật AI nâng cao như machine learning với thuật toán xử lý ngôn ngữ tự nhiên và ngữ nghĩa. Cogito đảm bảo là có hiệu quả cao cho mỗi tình hình.

<a href="https://www.youtube.com/watch?v=l9bA9AjtRgI">Xem video này</a> để hiểu sự khác biệt giữa Cogito và các công nghệ dựa trên machine learning và Làm thế nào để Cogito tạo ra giá trị cho business của bạn
<h2>Kết thúc</h2>
Mình đã cố gắng dịch sát nghĩa nhất, một số đoạn mình chưa hiểu lắm. Bạn có thể vào <a href="https://www.expertsystem.com/how-does-machine-learning-work/">https://www.expertsystem.com/how-does-machine-learning-work/.</a> Bài viết quảng cáo cogito nhưng mình chưa thấy demo nào.

Tóm lại machine learning không giải quyết được mọi vấn đề của doanh nghiệp, nó còn có các hạn chế.

Ngoài machine learning, AI còn rất rộng còn có một thứ gọi là Cognitive computing.

Đối với mình, kĩ thuật nào đều có hạn chế của nó, machine learning cũng vậy, nó không thể giải quyết được mọi vấn đề, không phải là true AI, nhưng nó đã giải quyết được rất nhiều bài toán thực tế. Còn cognitive system như IBM Watson là rất ấn tượng, nhưng có vẻ chưa được rõ ràng và cũng không có nhiều tài liệu nói về nó.

Cảm ơn các bạn!