Chắc chúng ta đều đã nghe đến Ruby on Rails, một trong những framework phát triển web phổ biến nhất hiện nay. Theo thống kê, Ruby on rails luôn nằm trong top đầu những framework được sử dụng nhiều nhất để phát triển website trên toàn cầu và số trang web sử dụng Ruby on rails dễ dàng đạt đến con số hàng triệu.

Vậy điều gì đã làm cho Ruby on Rails phổ biến đến vậy, mặc dù nó còn khá non trẻ nếu so sánh với nhiều framework phát triển web khác (chỉ mới được phát minh ra từ năm 2004)? Trong bài viết này, tôi sẽ cung cấp cho các bạn những lý do đó theo quan điểm của một người mới tiếp xúc với Ruby on Rails sau khi đã có chút ít kinh nghiệm với các web framework khác như ASP.net hay Django. Bài viết có thể mang nặng góc nhìn chủ quan của tôi nhưng hy vọng nó vẫn sẽ có giá trị tham khảo cho các bạn đang phân vân nên chọn framework nào để bắt đầu con đường lập trình web của mình.

Vậy không lan man nữa, chúng ta hãy bắt đầu ngay với những lý do mà những lập trình viên junior, hoặc thậm chí chưa biết gì về lập trình, nên chọn Ruby on Rails làm framework khởi đầu cho mình.

### Ruby là một ngôn ngữ dễ làm quen
### 

Giống như cái tên của nó, Ruby on Rails sử dụng Ruby, một trong những ngôn ngữ linh hoạt và ấn tượng nhất hiện nay. Lý do cho chuyện đó là bởi vì Ruby đã tổng hợp rất tốt những ưu điểm của dynamic language và strongly typed language. Những ưu điểm này kết hợp với tính đa hình hướng đối tượng của Ruby, tạo ra một ngôn ngữ có thể làm tốt việc mà không cần đến nhiều code.

Ruby cũng là một ngôn ngữ rất dễ làm quen dành cho những người mới bắt đầu, khi mà ngữ pháp của nó giống tiếng Anh bình thường đến đáng sợ. Chắc các bạn đã nghe đến sự thân thiện với người mới của Python, khi nó được đánh giá là ngôn ngữ rất dễ học dành cho những người chưa có chút kiến thức lập trình nào. Ruby còn hơn vậy nữa, các đoạn code rất tường minh và mặc dù là người chưa hề có kiến thức về Ruby, các bạn vẫn có thể hiểu lờ mờ được ý nghĩa của nó. Và với một người đã từng mất hàng giờ để fix lỗi indent khi mới bắt đầu học Python như tôi, thì Ruby thực sự là một ngôn ngữ dễ làm quen hơn rất nhiều.

### Ruby là ngôn ngữ thuần lập trình hướng đối tượng

Chắc các bạn đều đã quen thuộc với cụm từ "lập trình hướng đối tượng". Có nền tảng kiến thức tốt về lập trình hướng đối tượng gần như đã trở thành yêu cầu bắt buộc với mọi lập trình viên trong thời đại hiện nay, và Ruby là một ngôn ngữ không thể tuyệt vời hơn để bạn làm quen với khái niệm đó. Ruby là một ngôn ngữ thuần lập trình hướng đối tượng, có nghĩa là mọi thứ với nó đều là một object, từ một đoạn text đến chữ số đơn thuần. Làm việc với Ruby và bạn sẽ quen với lập trình hướng đối tượng ngay thôi, mặc dù bạn có là một người mới hoàn toàn đi chăng nữa. 

### Rails là một framework full-stack

Một trang web khi nào cũng sẽ bao gồm front-end và back-end, và bạn gần như sẽ không bao giờ sử dụng chỉ một ngôn ngữ trên trang web của mình cả. Bạn sẽ cần dùng đến HTML, CSS để làm trang web của mình bắt mắt hơn hay Javascript để tăng tính tương tác cho trang web. 

Một điều tuyệt vời về Rails là nó là một framework full-stack, có nghĩa là bạn có thể bao gồm cả front-end và back-end của mình vào trong một Rails application mà không cần phải tách biệt thành hai application riêng biệt như những framework truyền thống ví dự như NodeJS. Tổ chức thư mục của Rails cũng rất tốt nên tuy nằm chung một folder, back-end và front-end vẫn được phân biệt một cách rõ ràng và tôi đánh giá rất cao chuyện này. Thực ra hiện nay có không ít framework cho phép bạn dùng HTML, CSS và Javascript trong application của mình, nhưng theo cảm nhận chủ quan của tôi thì embedded ruby HTML thực sự tiện lợi và dễ sử dụng hơn template của .net hay Django rất nhiều.

### Rails có nhiều tài liệu giúp bạn dễ tiếp cận

Như tôi đã giới thiệu ở đầu bài viết, Rails là một framework nổi tiếng với nhiều người sử dụng, vậy nên đương nhiên cũng sẽ có nhiều tài liệu và hướng dẫn để bạn tiếp cận với nó. Chỉ bằng một vài từ khóa đơn giản trên google, bạn có thể tìm thấy vô số tutorial hoặc khóa học cơ bản cho Rails, cả miễn phí lẫn trả phí. Bản thân tôi cũng đã bắt đầu với Rails từ một khóa học như vậy, mà theo tôi đánh giá là có chất lượng khá tốt và cung cấp đủ những kiến thức nền để  mình có thể tiếp tục tự khám phá thêm nhiều hơn nữa về Rails.

Rails cũng nổi tiếng về có một cộng đồng mạnh và họat động năng nổ. Có rất nhiều các plugins hay library để hỗ trợ bạn và hầu như các vấn đề bạn gặp phải đều đã từng có người hỏi rồi nhận được sự giúp đỡ của cộng đồng. Đây thực sự là một yếu tố vô cùng quan trọng khi bạn muốn làm quen với một framework mới (tôi đã từng rất chật vật khi bắt đầu với cocos2D-js vì hỗ trợ hay tài liệu cho framework này gần như không tồn tại).

### Rails magic

Chúng ta cùng đến với lý do cuối cùng mà tại sao mà tất cả mọi người, không chỉ tôi hay bạn đều sử dụng Rails, đó chính là vì ma thuật của nó. Rails cung cấp cho chúng ta rất nhiều câu lệnh mà khi sử dụng lần đầu tôi đã phải kinh ngạc về sự tiện lợi của chúng. Ví dụ như một câu lệnh generate scaffold đơn giản sẽ chuẩn bị cho chúng ta tất cả những gì chúng ta cần cho một model, từ file model, controller cho đến các file view như show, edit... và thậm chí cả các unit test cũng đã được tạo sẵn, việc còn lại của chúng ta chỉ là fill nội dung vào cho những file đó. Khi bắt đầu dự án trên một framework mới, chắc các bạn cũng từng có lúc bối rối không biết chúng ta cần phải làm gì, bắt đầu từ đâu. Khi sử dụng Rails bạn sẽ không cần phải lo về chuyện đó vì bản thân Rails cũng đã như một tutorial vậy, nó đã chỉ cho chúng ta những việc cần làm, những file cần phải tạo. Tất nhiên chúng ta vẫn sẽ phải tự mình làm phần lớn việc coding, nhưng khi đang mù mờ không biết phải làm gì, chỉ cần nhìn thấy con đường cần phải đi thôi với tôi đã là tốt lắm rồi.

Chính nhờ những Rails magic như vậy mà Ruby on Rails được đánh giá là framework với thời gian phát triển nhanh nhất trong các framework web phổ biến. Với việc mô hình phổ biến nhất trong phát triển phần mềm hiện đại là mô hình Agile, ưu tiên thời gian phát triển ngắn thì có thể nói Ruby on Rails là một framework bắt rất đúng trend của thời đại. Cả .net hay Django cũng đều có những file generator như vậy, nhưng chúng chỉ đơn giản là không bao giờ nhanh được như Rails.

### Kết luận

Với những lý do trên, chắc các bạn đều đã nhận ra Ruby on Rails là một công cụ rất đáng để thuần thục. Rails là một framework full-stack rất hợp thời, nếu bạn thành thục nó thì sẽ không khó khăn để bạn có thể kiếm một công việc tốt. Ngoài ra Rails còn rất dễ làm quen và thân thiện với người mới nên nó sẽ là bước khởi đầu tuyệt vời cho bạn trên con đường lập trình web hoặc để cải thiện kỹ năng sẵn có của mình. Vậy nên nếu bạn đang tìm kiếm một web framework để khởi đầu hay để mở rộng hiểu biết của mình thì hãy cân nhắc đến lựa chọn Ruby on Rails nhé!