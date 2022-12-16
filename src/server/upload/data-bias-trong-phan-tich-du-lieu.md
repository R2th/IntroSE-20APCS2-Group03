Hi các bạn, để tiếp tục chuỗi bài chia sẻ về nghiệp vụ của BA, hôm nay mình sẽ chia sẻ một chút về Data analysis (phân tích dữ liệu) - một kỹ thuật khá là rộng và cũng rất quan trọng với BA trong thời kỳ 4.0 này.

Trong phân tích dữ liệu thì nguồn dữ liệu là một phần tối quan trọng, vì nguồn dữ liệu từ đầu đã không được sạch, chuẩn thì có phân tích đằng trời cũng chẳng thể đưa ra quyết định đúng. Vậy nên hôm nay ta sẽ tìm hiểu một khái niệm thường xuất hiện làm cho dữ liệu bị sai lệch, đó là "data bias" (dịch nôm na là dữ liệu có tính thiên kiến)

# 1. Sampling bias
Khi xây dựng nguồn dữ liệu, có những trường hợp ta không thể lấy được dữ liệu trên toàn bộ tập mà ta đang xét mà chỉ có thể lấy theo một số "mẫu". Trường hợp lấy "mẫu" này thường dẫn đến "Sampling bias".

> Sampling bias là loại bias mà dữ liệu được lấy mẫu không đủ để đại diện cho toàn bộ tập đang xét.

Ta có thể lấy một ví dụ rõ ràng hơn như sau:

1. Mục tiêu: Xác định mức độ hài lòng của người dân về tình trạng giao thông của thành phố
2. Dữ liệu đã được thu thập: Câu trả lời của 20 nam thanh niên tuổi từ 18-25 & đang sử dụng xe máy

Ok, nhìn ví dụ mọi người sẽ thấy ngay được vấn đề đúng không? Với dữ liệu như thế này liệu ta có đánh giá được mức độ hài lòng của toàn bộ người dân về tình trạng giao thông như mục tiêu đề ra không?

Tất nhiên là không rồi! Vì còn dữ liệu của phái nữ này, của những người đi bộ, đi ô tô,... những người ít & nhiều tuổi hơn thì sao? Rõ ràng là tập lấy mẫu trên không thể mang tính "đại diện" cho toàn bộ tập mà ta đang xét. Nếu sử dụng tập dữ liệu này để phân tích thì kết luận của chúng ta sẽ mang thiên hướng sai lệch rất nhiều. Từ đó có thể dẫn đến các hậu quả như đưa ra các giải pháp không phù hợp, thậm trí còn làm tụt đi mức độ hài lòng của người dân so với khi chưa đưa ra giải pháp

# 2. Observer bias
Observer bias này thì nó có 2 kiểu đặc trưng như sau:

##  Kiểu "thầy bói xem voi"

Các bạn biết câu chuyện "thầy bói xem voi" chứ? Đó là khi quan sát, chúng ta chỉ quan sát được 1 phần của đối tượng, và ghi dữ liệu đó thành dữ liệu của toàn bộ đối tượng. 
 
Điều này dẫn đến câu chuyện gì? Xin thưa rằng nó tương tự với Sampling bias mà mình có ví dụ ở trên kia. Cũng là 1 kiểu lấy dữ liệu không đủ đại diện cho toàn bộ tập đang xét mà đã tính đó là tất cả dữ liệu chúng ta cần xét đến.

Cơ mà nói thì dễ vậy thôi, chứ để nhìn được toàn bộ các khía cạnh của một đối tượng cũng khá khó đấy, điều này còn phụ thuộc vào 2 thứ là **kinh nghiệm** & **hiểu biết về lĩnh vực**. Khi có 2 điều này ta mới có thể đánh giá xem dữ liệu có thể hiện được đầy đủ bài toán ta đang giải quyết không. Vậy nên đối với một BA, việc có hiểu biết sâu về lĩnh vực mình đang làm là một điều tối quan trọng khi thực hiện bất kỳ 1 task gì

## Kiểu khác tiêu chí

Kiểu này thì khó hiểu hơn một chút, mình sẽ lấy ví dụ nhé:

Đề bài: Đánh giá mức độ ảnh hưởng của đợt bùng phát COVID-19 lần thứ 4 tại Việt Nam

Ok, với đề bài như vậy thì mọi người sẽ đánh giá nó như nào? Dạng dữ liệu này thường xuất hiện trong các bài toán nghiên cứu, khi mục tiêu mang tính chất tổng quan, và các team nghiên cứu thì mỗi team xử dụng một tiêu chí đánh giá khác nhau.

Như bài toán nêu trên, ta sẽ có team A đánh giá mức độ ảnh hưởng dựa theo các chỉ số kinh tế như GDP, chỉ số giá tiêu dùng, mức độ nợ xấu tại các ngân hàng,...

Team B thì đánh giá dựa theo số lượng người bị mắc, số lượng người tử vong, tình trạng y tế tại các địa phương,...

Và như vậy, dữ liệu thu thập, cũng như kết luận từ các bên sẽ khác nhau. Lúc này, ta cần phải xem lại bài toán của ta phải giải quyết là gì, từ đó chọn dữ liệu của bên phù hợp. Và để chọn được, một lần nữa ta phải dựa vào **kinh nghiệm** & **hiểu biết về lĩnh vực**.

# 3. Interpretation bias
Interpretation bias là kiểu chúng ta luôn có khuynh hướng diễn giải một điều gì đó luôn theo hướng tiêu cực hoặc tích cực.

Lại ví dụ cho dễ hiểu nhé: 

Chúng ta gửi email đến 2 khách hàng khác nhau để mời chào sử dụng dịch vụ và nhận về 2 email trả lời với nội dung như sau:
1. Khách hàng A: Giọng điệu bực bội và không hài lòng vì đã bị quá nhiều bên như công ty của chúng ta email đến mời chào. Họ không quan tâm sản phẩm đó là gì & không có nhu cầu dùng nó
2. Khách hàng B: Giọng điệu thoải mái & muốn hỏi thêm thông tin về sản phẩm

Nguyên do của Interpretation bias là bởi mỗi con người có những trải nghiệm riêng, sở thích riêng, nhu cầu riêng trong cuộc sống. Có thể từ trước đó họ đã có những ấn tượng quá tốt/quá xấu về một điều gì đó nên sau này gặp những chuyên tương tự sẽ xuất hiện những phản ứng thái quá => dữ liệu được ghi nhận lúc đó không còn chính xác nữa.

Điều này khiến ta phải có một suy nghĩ rằng, khi thu thập dữ liệu từ người dùng, nên thu thập từ nhiều loại người dùng khác nhau thay vì chỉ một số lượng khiêm tốn. Vì nếu như nhận dựa vào những dữ liệu có tính Interpretation bias, ta sẽ đưa ra những quyết định sai lầm có thể nói là nghiêm trọng.

# 4. Confirmation bias
Con người có xu hướng chỉ tiếp nhận & ghi nhớ những thông tin mà mình muốn nghe, muốn thấy.

Bạn thử xem trong những đầu báo bạn đọc hàng ngày, hay những page, người nổi tiếng bạn follow trên Facebook, có mấy ai là người đi ngược lại với quan điểm của bản thân bạn?

Ngoài ra, thử nhớ lại một vài ký ức cụ thể nào đó, ta có thể nhận ra rằng thường chúng ta sẽ nhớ những thứ đặc biệt ấn tượng, hoặc là thứ-mà-ta-muốn-nhớ.

Điều này sẽ dẫn đến những sai lệch khi ta thu thập customer journey, hoặc trải nghiệm của người dùng trên sản phẩm. Khi này, người dùng sẽ có khuynh hướng kết hợp cả Interpretation bias & Confirmation bias. Họ sẽ chỉ ghi nhớ những thứ họ muốn nhớ & diễn tả lại nó theo một cách có tính thiên vị khá cao. Đối với một BA, ta nên nhận ra những dữ liệu dạng này để biết rằng những gì người dùng đang kể chưa phải là toàn bộ sự thật. Ta cần sử dụng kỹ thuật "Elicit" trong BA để khai thác thêm thông tin từ người dùng.

Có một trang Wikipedia nói khá rõ về Confirmation bias, nội dung tại đây đi khá sâu về tâm lý học, các bạn tham khảo nhé: https://vi.wikipedia.org/wiki/Thi%C3%AAn_ki%E1%BA%BFn_x%C3%A1c_nh%E1%BA%ADn

# Nguồn tham khảo
1. https://www.coursera.org/learn/data-preparation
2. https://vi.wikipedia.org/wiki/Thi%C3%AAn_ki%E1%BA%BFn_x%C3%A1c_nh%E1%BA%ADn
3. https://en.wikipedia.org/wiki/Interpretive_bias
4. http://www.scholarpedia.org/article/Sampling_bias