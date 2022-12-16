Trong hai phần đầu của chuỗi bài viết giới thiệu lý thuyết trò chơi, mình đã trình bày ví dụ về 2 loại trò chơi đó là Zero-Sum Games và Nonzero-Sum Games. Đây là những trò chơi mà người chơi chỉ được chọn duy nhất 1 lần, độc lập và cùng lúc với người chơi còn lại. Trong các trò chơi bắt nguồn từ các tình huống kinh tế hoặc chính trị ngoài đời thực, điều này thường không xảy ra. Người chơi có thể thực hiện các phương án hay nước đi tuần tự và được quan sát toàn bộ hoặc một phần nước đi của người khác. Những tình huống như vậy được mô hình hóa tốt hơn bằng một loại trò chơi có tên là trò chơi dạng mở rộng (Extensive Form Games). Trong bài viết mình sẽ trình bày một số ví dụ liên quan tới loại trò chơi này.

# Extensive Form Games

## Trận chiến giữa một cặp đôi

Nếu bạn thấy quen quen thì đúng rồi đó :D Mình đã trình bày bài toán này trong bài viết về Nonzero-Sum Games. Nhắc lại một chút nội dung trò chơi nhé :) Một người đàn ông và một người phụ nữ muốn đi chơi cùng nhau, họ sẽ chọn đi xem một trận đấu bóng đá hoặc một buổi biểu diễn ba lê. Người đàn ông thích xem bóng đá và người phụ nữ thích xem múa ba lê. Cơ mà, họ đã quên thỏa thuận xem sẽ đi đâu vào tối hôm đó :D. Hai địa điểm xem bóng đá và biểu diễn ba lê ở hai nơi khác nhau và họ phải tự quyết xem đi đâu. Người đàn ông và người phụ nữ không có phương tiện giao tiếp. Nhưng đi đâu không quan trọng, điều quan trọng là họ được ở bên nhau :D Đó là nội dung bài toán trong Nonzero-Sum Games, tuy nhiên để mở rộng trò chơi để cho thuộc loại Extensive Form Games thì ta thêm một chi tiết đó là giả sử người đàn ông đưa ra lựa chọn đầu tiên và người phụ nữ có thể biết hay quan sát được lựa chọn này của anh ý :)

Khi đó mô hình cây quyết định của trò chơi được biểu diễn như sau:

![Imgur](https://imgur.com/1kW8hFR.png)

Người chơi 1 (người đàn ông) chọn trước, người chơi 2 (người phụ nữ) quan sát lựa chọn của người chơi 1 và sau đó đưa ra lựa chọn cho mình. Số đầu tiên trong mỗi cặp số là phần thưởng cho người chơi 1 và số thứ hai là phần thưởng cho người chơi 2. Các nút biểu thị các quyết định (của một người chơi) và cuối cùng là phần thưởng.

Dễ thấy, nếu người chơi 1 chọn F (Football), thì người chơi 2 chọn F cũng là tối ưu, và nếu người chơi 1 chọn B (Ballet), thì người chơi 2 chọn B cũng là tối ưu (trong hình đúng ra là nhánh ngoài cùng bên phải là B nhé :v). Giả sử rằng người chơi 1 biết được suy luận này về các lựa chọn của người chơi 2, người chơi 1 nên chọn F để đạt phần thưởng lớn nhất. Trong trò chơi này, cả 2 bên đều tối ưu lựa chọn của mình.

Ví dụ đơn giản này cho thấy là trong một trò chơi thuộc loại Extensive form games, có sự khác biệt giữa chiến lược chơi của một người chơi với nước đi hoặc lựa chọn thực tế của người chơi đó. Chiến lược của người chơi 2 là chọn F (B) nếu người chơi 1 chọn F (B). Lựa chọn thực tế của người chơi 2 là F — giả sử như trên rằng người chơi 1 đã chọn F. Ta sử dụng từ "chiến lược" để biểu thị một kế hoạch chơi và từ "hành động" để biểu thị một nước đi cụ thể. Trong trò chơi mà cần có sự lựa chọn đồng thời từ tất cả người chơi thì không có sự khác biệt này. Hiểu đơn giản là nghĩ như nào thì đánh như thế :) còn trong Extensive form games đưa ra chiến lược nhưng phải xem xem người chơi trước đánh như nào để chọn nước đi phù hợp :D

## Sự cạnh tranh (phần 1)

Một vấn đề cũ trong các tổ chức công nghiệp là: Với mục đích duy trì vị thế của mình, liệu một nhà độc quyền có khả năng thực hiện chống lại bất kỳ công ty nào mới gia nhập thị trường bằng cách đe dọa một cuộc chiến về giá cả hay không? 

Đây là một bài toán kinh tế. Để cho đơn giản, hãy xem xét ví dụ sau đây. Có hai người chơi, người chơi 1 đại diện cho một công ty mới, còn người chơi 2 đại diện cho nhà độc quyền. Vấn đề cho người chơi 1 là có nên tham gia thị trường mà đang có người chơi 2 hay không? (người chơi 2 độc quyền thị trường này). Nếu có kí hiệu là E, nếu không kí hiệu là O. Nếu người chơi 1 tham gia thị trường, người chơi 2 có thể hợp tác (C), hoặc chống lại (F) bằng cách giảm mạnh giá sản phẩm :). Các phần thưởng như sau. Lợi nhuận thị trường là 100 ở giá độc quyền và 0 ở giá cạnh tranh. Chi phí tham gia thị trường là 10. Nếu hợp tác thì chia đều lợi nhuận ở giá độc quyền.

Trò chơi được thể hiện bằng mô hình cây quyết định như hình dưới 

![Imgur](https://imgur.com/mlepFCi.png)

Từ mô hình ta có nhận xét rằng, khi người chơi 1 tham gia  thị trường (E), lựa chọn tối ưu nhất cho người chơi 2 là phải hợp tác (C) với người chơi 1. Nếu chống lại (F) thì sự cạnh tranh này chỉ thiệt cho cả 2 bên :) Người chơi 1 chọn E và người chơi 2 chọn C là lựa chọn tối ưu nhất cho cả 2. Tất nhiên là nếu người chơi 1 chọn O thì là tốt nhất cho người cho người 2 nhưng ở đây ta chỉ đề cập đến giải pháp tối ưu cho tất cả người chơi. Do vậy, chiến lược của người chơi 1 là chắc chắn phải tham gia thị trường để có lợi nhuận. Trong khi đó, chiến lược của người chơi 2 có hai trường hợp: Nếu người chơi 1 không tham gia thì ngon :D, lúc đó sẽ có toàn bộ lợi nhuận. Nhưng trường hợp nếu người 1 tham gia thì bắt buộc phải hợp tác để có lợi nhuận lớn nhất trong trường hợp này.

## Sự cạnh tranh (phần 2)

Vẫn bài toán giống như phần 1 nhưng trong phần 2 ta sẽ thay đổi một chút. Giả sử rằng với xác suất 50%, phần thưởng cho người chơi 2 khi lựa chọn F có thể bằng một số x chứ không phải chỉ bằng 0 như ở phần 1. (Ở đây, x là một số cho trước. Nó không phải là một biến mà là một tham số). Người chơi 1 vẫn thực hiện sự lựa chọn đầu tiên và biết khi nào thì phần thưởng là x hoặc 0. Người chơi 2 lựa chọn sau và không biết khi nào phần thưởng là x hay 0 khi thực hiện lựa chọn. Cả hai người chơi đều biết xác suất cho phần thưởng x và 0. Cơ bản là người chơi 2 không biết người chơi 1 có tham gia hay không và tiềm lực của người chơi 1 như nào. Ví dụ này có thể xảy ra nếu nguồn lực của người chơi 1 là thông tin bảo mật. Giá trị dương của x thể hiện rằng người chơi 1 có nguồn lực hạn chế làm cho người chơi 2 sẽ chiếm thị phần lớn hơn nếu anh ta chọn phương án cạnh tranh. Người chơi 2 ước tính xác suất người chơi 1 có nguồn lực hạn chế là 50% và người chơi 1 biết điều này.

![Imgur](https://imgur.com/n6bqz9z.png)

Ví dụ này có thể được mô hình hóa bằng cách đưa một nước đi may rủi vào *cây trò chơi*. Hơn nữa, cây trò chơi này cần thể hiện thông tin không cân xứng giữa những người chơi. Đầu tiên có một nước đi may rủi. Người chơi 1 tìm hiểu kết quả của nước đi may rủi và quyết định tham gia hay không. Nếu người chơi 1 chọn tham gia, thì người chơi 2 quyết định hợp tác hoặc chống lại, tuy nhiên không biết kết quả của nước đi may rủi, điều này được biểu thị bằng đường nét đứt. Nói một cách khác, người chơi 2 có hai nút quyết định có thể lựa chọn, nhưng lại không biết mình đang thực sự ở nút nào. Vì vậy, người chơi 2 chỉ có thể lựa chọn giữa ‘hợp tác’ và ‘chống lại’, mà không để cho lựa chọn này phụ thuộc vào kết quả của nước đi may rủi. Nếu x $\le$ 50 thì một giải pháp rõ ràng là người chơi 2 sẽ chọn hợp tác và người chơi 1 tham gia thị trường. 

# Tổng kết

Vậy bản chất của Extensive form games đó là các lựa chọn (hay nước đi) giữa những người chơi được thực hiện tuần tự. Người chơi sau có thể biết toàn bộ thông tin về phương án của người chơi trước, từ đó đưa ra phương án tối ưu cho mình. Tuy nhiên, trong một số trường hợp người chơi sau bị thiếu dữ kiện (ví dụ sự cạnh tranh phần 2). Khi đó, người chơi sau phải đưa ra lựa chọn tối ưu mà không bị phụ thuộc vào lựa chọn của người chơi trước. Hay nói cách khác, người chơi trước có thể chọn bất kì phương án nào, người chơi sau phải đảm bảo dù người chơi trước lựa chọn như nào thì lựa chọn của người chơi sau vẫn là tối ưu :)

Đó là một vài ví dụ cơ bản (nhưng cũng khá xoắn não :D) về Extensive form games. Trong phần sau, mình sẽ đề cập các ví dụ liên quan đến sự hợp tác trong lý thuyết trò chơi.

# Tài liệu tham khảo

1. Giải thuật và lập trình - Thầy Lê Minh Hoàng
2. [cp-algorithms.com](https://cp-algorithms.com/)
3. Handbook Competitive Programming - Antti Laaksonen
4. Competitve programming 3 - Steven Halim, Felix Halim
5. Game Theory - Giacomo Bonanno