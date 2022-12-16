Trong vài năm trở lại đây, công nghệ thông tin đã trở thành bàn đạp cho sự cải thiện mạnh mẽ cho vô số các loại hình kinh doanh. Song song, kiến trúc của các phần mềm cũng ngày càng trở nên phức tạp và số lượng người dùng của chúng đã và đang tăng lên theo cấp số nhân, đặt ra cho một thách thức không hề nhỏ về performance đối với bất kỳ ứng dụng nào. Performance kém có thể làm suy yếu các mục tiêu chiến lược của công ty, và đó chính là lý do tại sao việc tìm ra những cách thông minh để cải thiện performance là một việc có tầm quan trọng không hề nhỏ. Với lí lẽ đó, việc tránh overhead và giảm thời gian truy xuất, xử lý dữ liệu đã trở nên cấp thiết hơn bao giờ hết. Đây là lúc bộ nhớ đệm (cache) khẳng định vai trò của mình và không có 1 software dev nào có thể không quan tâm đến kỹ thuật này nữa.

Đầu tiên, chúng ta sẽ đi vào khái niệm bộ nhớ đệm, hiểu tại sao nó lại quan trọng và những rủi ro liên quan có thể xảy ra. Sau đó, chúng ta sẽ cùng tìm hiểu các loại bộ nhớ đệm quan trọng nhất.


### Khái niệm Caching

Caching là một cơ chế để cải thiện hiệu suất có thể áp dụng cho bất kỳ loại ứng dụng nào. Về mặt kỹ thuật, caching là quá trình lưu vào/lấy ra dữ liệu từ bộ nhớ đệm. Vậy, bộ nhớ đệm là gì? Bộ nhớ đệm là một software hoặc hardware component sinh ra nhằm mục đích lưu trữ các dữ liệu để các request cho dữ liệu đó trong tương lai có thể được serve nhanh hơn.

Lý do chính tại sao bộ nhớ đệm ra đời là việc truy cập dữ liệu từ các bộ nhớ liên tục (Persistent Memory) mất một lượng thời gian đáng kể. Vì vậy, bất cứ khi nào dữ liệu được truy xuất hoặc xử lý, nó nên được lưu trữ trong bộ nhớ có khả năng hoạt động hiệu quả hơn. Chúng ta gọi đó là bộ nhớ đệm, và có thể coi đây là tầng lưu trữ dữ liệu tốc độ cao với mục đích chính là giảm nhu cầu truy cập vào các tầng lưu trữ dữ liệu chậm hơn. Để tiết kiệm chi phí và hiệu quả, bộ nhớ đệm phải tương đối nhỏ, đặc biệt nếu so với bộ nhớ truyền thống. Đây là lý do tại sao chúng thường được thực hiện bằng cách sử dụng phần cứng truy cập nhanh như RAM (Bộ nhớ truy cập ngẫu nhiên) song song với một software component.

Nhờ có bộ nhớ đệm, chúng ta có thể triển khai một cơ chế tái sử dụng các dữ liệu được tính toán hoặc truy xuất trước đó một cách hiệu quả. Bất cứ khi nào có request mới, dữ liệu được request sẽ được tìm kiếm đầu tiên trong bộ nhớ cache. Rõ ràng, việc đọc dữ liệu từ bộ nhớ đệm hẳn là phải nhanh hơn việc tính toán lại kết quả hoặc đọc nó từ kho dữ liệu gốc. Vì vậy, càng nhiều yêu cầu có thể được phục vụ từ bộ nhớ cache, hệ thống sẽ càng nhanh.

Tóm lại, bộ nhớ đệm là một cách khá đơn giản để ta có thể cải thiện về hiệu suất. Điều này đặc biệt đúng khi so sánh với công việc tối ưu hóa thuật toán, thường là một công việc phức tạp và tốn nhiều thời gian.


### Tại sao bộ nhớ đệm lại quan trọng

Bộ nhớ đệm đóng một vai trò cực kỳ quan trọng vì nó cho phép các dev nâng cao performance (mà đôi khi là khá đáng kể). Và như đã đề cập trước đó, điều này rất quan trọng.

Đặc biệt, cả người dùng và dev đều không muốn ứng dụng mất nhiều thời gian để xử lý yêu cầu. Với tư cách là dev, chúng ta muốn cung cấp cho người dùng "phiên bản tốt nhất" của hệ thống mình phát triển. Và với tư cách là người dùng, chúng ta chỉ muốn đợi chỉ vài giây, và đôi khi thậm chí là mili giây. Sự thật là không ai thích lãng phí thời gian của họ vào việc ngồi nhìn tin nhắn "loading".

Thêm vào đó, việc hệ thống có hiệu suất cao đã trở nên quan trọng đến mức bộ nhớ đệm đã nhanh chóng trở thành một khái niệm không thể tránh khỏi trong lĩnh vực công nghệ máy tính. Điều này có nghĩa là ngày càng có nhiều dịch vụ đang sử dụng nó, khiến nó thực sự có mặt ở khắp nơi. Kết quả là, nếu chúng ta muốn cạnh tranh với vô số ứng dụng trên thị trường, chúng ta bắt buộc phải triển khai tốt hệ thống bộ nhớ đệm. Hơn nữa, việc giải thích cho người dùng lý do tại sao hệ thống bị chậm cũng là một vấn đề khá đau đầu.

Một khía cạnh quan trọng khác của bộ nhớ đệm là nó cho phép chúng ta tránh việc phải request mới hoặc xử lý lặp đi lặp lại dữ liệu. Điều này giúp chúng ta giảm thiểu chi phí, như chi phí mạng và giảm mức sử dụng CPU, đặc biệt nếu các request đòi hỏi các xử lý phức tạp. Điều này có thể kéo dài tuổi thọ của máy móc hoặc máy chủ, hay thậm chí giúp giảm chi phí cơ sở hạ tầng. Trên thực tế, khi sử dụng các nền tảng đám mây hoặc các public API provider, người ta thường tính phí cho các giao tiếp mạng giữa các dịch vụ của họ.


### Thách thức
Caching không phải là một practice đơn giản và có những thách thức không thể tránh khỏi trong chủ đề này. Hãy cùng khám phá những vấn đề gây đau đầu nhất.

**Vấn đề về tính thống nhất dữ liệu**
Vì bất cứ khi nào dữ liệu được lưu vào bộ nhớ cache, một bản sao của nó sẽ được tạo, nên bây giờ sẽ có hai phiên bản của cùng một dữ liệu. Điều này có nghĩa là chúng có thể trở nên bất đồng bộ. Nói một cách ngắn gọn, đây là vấn đề về tính thống nhất. Đây là vấn đề quan trọng và phức tạp nhất liên quan đến bộ nhớ đệm. Không có một giải pháp cụ thể nào vượt trội hơn hẳn và cách tiếp cận tốt nhất phụ thuộc vào các yêu cầu của hệ thống. Xác định cơ chế cập nhật bộ nhớ cache tốt nhất hoặc cơ chế vô hiệu hóa là một trong những thách thức lớn nhất liên quan đến bộ nhớ đệm và có lẽ là một trong những thách thức khó nhất trong ngành khoa học máy tính.

**Chọn dữ liệu được lưu vào bộ nhớ đệm**
Hầu như bất kỳ loại dữ liệu nào cũng có thể được lưu vào bộ nhớ đệm. Điều này có nghĩa là việc lựa chọn những gì sẽ nằm trong bộ nhớ cache và những gì không sẽ vô biên vô cùng. Để giải quyết vấn đề này, có một số khía cạnh chúng ta cần tính đến. Đầu tiên, nếu chúng ta đánh giá dữ liệu thay đổi thường xuyên, chúng ta không nên lưu nó vào bộ nhớ cache quá lâu. Nếu không, dữ liệu cung cấp cho người dùng có thể sẽ không chính xác. Mặt khác, điều này cũng phụ thuộc vào đánh giá của về việc dữ liệu bao lâu thì là quá cũ. Thứ hai, bộ nhớ cache phải luôn sẵn sàng để lưu trữ dữ liệu thường xuyên được yêu cầu mất nhiều thời gian để được tạo hoặc truy xuất. Xác định dữ liệu này không phải là một nhiệm vụ dễ dàng và bộ nhớ cache có thể có nguy cơ bị lấp đầy với dữ liệu vô ích. Thứ ba, khi dữ liệu lớn lưu vào bộ nhớ đệm, bộ nhớ cache có thể bị lấp đầy rất nhanh, hoặc tệ hơn là hết sạch luôn. Nếu ứng dụng và hệ thống bộ nhớ đệm đều dùng đến RAM, thì điều này sẽ rất sẽ trở thành một vấn đề, đó là lý do tại sao bạn nên giới hạn dung lượng RAM dành riêng cho bộ nhớ đệm.

**Xử lý Cache miss**
Các lần cache miss thể hiện chi phí của việc có một bộ nhớ cache xét theo mặt thời gian. Trên thực tế, cache miss sẽ gây ra các độ trễ đáng lẽ không phát sinh trong hệ thống không sử dụng bộ nhớ đệm. Vì vậy, để được hưởng lợi từ việc tăng tốc độ do có bộ nhớ cache, tỉ lệ cache miss phải được giữ ở mức tương đối thấp, đặt biệt là so với cache hit. Đạt được kết quả này không phải là dễ dàng, và nếu không đạt được, chính hệ thống bộ nhớ đệm của chúng ta sẽ biến thành overhead.


### Các loại bộ nhớ đệm

Mặc dù bộ nhớ đệm là một khái niệm chung, có một vài loại đáng đề cập hơn cả. Những loại cache này đại diện cho các khái niệm mà không dev nào quan tâm đến cache có thể bỏ qua.

**In-memory Caching**
Theo cách tiếp cận này, dữ liệu cache được lưu trữ trực tiếp trong RAM, được cho là nhanh hơn so với hệ thống nơi chứa dữ liệu gốc. Cách triển khai phổ biến nhất của loại bộ nhớ đệm này là dựa trên key-value database. Chúng có thể được coi là tập hợp các cặp khóa-giá trị. Key được biểu thị bằng một giá trị duy nhất, trong khi value là dữ liệu lưu trong bộ nhớ cache.

Về cơ bản, điều này có nghĩa là mỗi dữ liệu được xác định bằng một giá trị duy nhất. Bằng cách chỉ định giá trị này, key-value database sẽ trả về giá trị được liên kết. Đây là một giải pháp nhanh chóng, hiệu quả và dễ hiểu. Đây là lý do tại sao các dev thường chọn cách này để implement hệ thống cache.

**Database Caching**
Mỗi cơ sở dữ liệu thường đi kèm với tính năng cache ở một mức độ nào đó. Cụ thể, internal cache thường được sử dụng để tránh truy vấn cơ sở dữ liệu quá mức. Bằng cách lưu vào bộ nhớ đệm kết quả của các truy vấn cuối cùng được thực thi, cơ sở dữ liệu có thể cung cấp dữ liệu đã lưu trước đó ngay lập tức. Bằng cách này, trong khoảng thời gian mà dữ liệu được lưu trong bộ nhớ cache mong muốn vẫn còn valid, cơ sở dữ liệu có thể tránh thực thi các truy vấn. Mặc dù mỗi cơ sở dữ liệu có thể thực hiện điều này theo các cách thức khác nhau, nhưng cách tiếp cận phổ biến nhất là dựa trên việc sử dụng bảng băm lưu trữ các cặp khóa-giá trị. Giống như đã nói ở trên, khóa được sử dụng để tra cứu giá trị. Lưu ý rằng loại bộ đệm như vậy thường được cung cấp theo mặc định nhờ công nghệ ORM (Object Relational Mapping).

**Web Cache**
Loại cache có thể được chia thành hai loại nhỏ:

Web Client Caching
Đây là loại bộ nhớ đệm mà hầu hết người dùng Internet đã quá đỗi quen thuộc. Loại cache này được lưu trữ trên client. Vì nó thường là một phần của các trình duyệt nên nó còn được gọi là Web Browser Caching. Nó hoạt động một cách rất trực quan. Lần đầu tiên trình duyệt tải một trang web, trình duyệt sẽ lưu trữ các tài nguyên của trang, chẳng hạn như văn bản, hình ảnh, stylesheet, script và tệp media. Lần tiếp theo khi truy cập cùng một trang, trình duyệt có thể tìm trong bộ nhớ cache các tài nguyên đã được lưu trong bộ nhớ cache trước đó và truy xuất chúng từ máy của người dùng. Cách này thường nhanh hơn so với tải chúng từ mạng.

Web Server Caching
Đây là một cơ chế nhằm mục đích lưu trữ tài nguyên phía máy chủ để tái sử dụng. Cụ thể, cách tiếp cận này rất hữu ích khi hệ thống cần sử dụng nội dung được tạo động, cần thời gian để tạo. Ngược lại, nó không hữu ích trong trường hợp nội dung tĩnh. Bộ nhớ đệm của máy chủ web tránh cho máy chủ bị quá tải, giảm bớt công việc phải thực hiện và cải thiện tốc độ serve trang.

**CDN Caching**
Loại cache này nhằm mục đích lưu trữ các nội dung như các trang web, stylesheets, scripts, và media file vào bộ nhớ đệm trong các máy chủ proxy. Nó có thể được xem như một hệ thống các cổng giữa người dùng và máy chủ gốc, lưu trữ các tài nguyên của nó. Khi người dùng yêu cầu một tài nguyên, máy chủ proxy sẽ chặn request và kiểm tra xem có bản sao tồn tại hay không. Nếu có, tài nguyên ngay lập tức được chuyển đến người dùng; nếu không, yêu cầu được chuyển tiếp đến máy chủ gốc. Các máy chủ proxy này được đặt ở một số lượng lớn các địa điểm trên toàn thế giới và các request của người dùng được route đến địa điểm gần nhất. Do đó, chúng thường ở gần với người dùng cuối hơn so với máy chủ gốc, điều này có nghĩa là giảm độ trễ mạng. Thêm vào đó, nó cũng làm giảm số lượng yêu cầu được gửi đến các máy chủ gốc.


### Kết luận

Trong bài viết này, chúng ta đã tìm hiểu bộ nhớ đệm là gì và tại sao nó ngày càng trở nên quan trọng trong khoa học máy tính. Đồng thời, việc đánh giá các mối đe dọa và rủi ro đến với bộ nhớ đệm cũng rất quan trọng. Implement một hệ thống bộ nhớ đệm chuẩn chỉnh không phải là một nhiệm vụ dễ dàng và đòi hỏi thời gian và kinh nghiệm. Đây là lý do tại sao việc có kiến thức về các loại bộ nhớ cache quan trọng nhất là điều cơ bản để thiết kế hệ thống phù hợp. Như đã minh chứng ở trên, số lượng này là không nhiều. Làm chủ tất cả các cách tiếp cận nêu trên nên là nhiệm vụ của mọi developer.