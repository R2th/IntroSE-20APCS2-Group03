Để xây dựng một hệ thống phân tán không nhất thiết cần có một ý tưởng hay. Trong phần này, tôi sẽ trình bày về về bốn mục tiêu chính để xây dựng hệ thống phân tán. Một hệ thống phân tán thì có thể truy cập tài nguyên một cách dễ dàng; Nó che giấu việc các  tài nguyên được phân phối trên một mạng; nó nên được mở và chắc chắn có thể mở rộng.

**1. Hỗ trợ chia sẻ tài nguyên:**

Một mục tiêu quan trọng của hệ thống phân tán là giúp người dùng (ứng dụng) có thể dễ dàng truy cập và chia sẻ tài nguyên từ xa. Tài nguyên có thể là hầu hết bất cứ thứ gì, ví dụ như thiết bị ngoại vi, phương tiện lưu trữ, dữ liệu, tệp, dịch vụ, mạng,... Có rất nhiều lý do cần chia sẻ tài nguyên. Trong đó, một lý do rõ ràng nhất là về kinh tế. Ví dụ, sẽ rẻ hơn nếu có một CSDL đáng tin cậy cao cấp duy nhất được chia sẻ so với việc phải mua và duy trì lưu trữ cho từng người dùng riêng biệt.

Việc kết nối giữa người dùng và tài nguyên đã giúp cho việc chia sẻ và trao đổi thông tin trở nên dễ dàng hơn, được minh họa bởi sự thành công của internet với các giao thức đơn giản để trao đổi tệp, thư, tài liệu, âm thanh, video. Sự kết nối của internet đã cho phép người dùng phân tán về mặt địa lý làm việc cùng nhau bằng tất cả các loại phần mềm, đó là phần mềm để biên tập, cộng tác, hội nghị từ xa,... ví dụ như các công ty phát triển phần mềm đa quốc gia đã thuê ngoài (outsourcing) phần lớn từ châu Á.

Tuy nhiên, chia sẻ tài nguyên trong các hệ thống phân tán có lẽ được minh họa rõ nhất bằng sự thành công của các mạng ngang hàng chia sẻ tệp như BitTorrent. Các hệ thống phân tán này giúp người dùng chia sẻ tệp trên Internet cực kỳ đơn giản. Mạng ngang hàng thường liên quan đến việc phân phối các tệp phương tiện như âm thanh và video. Trong các trường hợp khác, công nghệ được sử dụng để phân phối một lượng lớn dữ liệu, như trong trường hợp cập nhật phần mềm, dịch vụ sao lưu và đồng bộ hóa dữ liệu trên nhiều máy chủ.

**Khiến việc phân tán trở nên trong suốt:**

Mục tiêu quan trọng của hệ thống phân tán là che giấu thực tế rằng các tiến trình và tài nguyên được phân phối vật lý trên nhiều máy tính có thể cách nhau một khoảng cách lớn. Nói cách khác, nó cố gắng làm cho việc phân phối các tiến trình và tài nguyên trở nên trong suốt, tức là vô hình đối với người dùng cuối và các ứng dụng.

**Các loại trong suốt:**
Khái niệm về tính trong suốt có thể được áp dụng cho một số khía cạnh của hệ thống phân tán, trong đó những khía cạnh quan trọng nhất được liệt kê trong bảng dưới. 

-----
| Trong suốt về  | Mô tả |
| -------- | -------- | 
| **Access**     | Che giấu sự khác biệt trong biểu diễn dữ liệu và cách một đối tượng được truy cập      | 
| **Location**     | Che giấu nơi đối tượng thuộc về     | 
| **Relocation**     | Che giấu việc một đối tượng có thể đã được chuyển đến vị trí khác trong khi đang sử dụng  | 
| **Migration**     | Che giấu việc di chuyển đối tượng đến nơi khác   | 
| **Replication**     | Che giấu việc một đối tượng đã được sao chép | 
| **Concurrency**     | Che giấu việc một đối tượng có thể chia sẻ với một số người dùng độc lập   | 
| **Failure**     | Che giấu lỗi và việc phục hồi của một đối tượng  | 


-----


Tính trong suốt của truy cập đề cập đến việc che giấu sự khác biệt trong việc biểu diễn dữ liệu và cách mà các đối tượng có thể được truy cập. Ở cấp độ cơ bản, ta che giấu sự khác biệt trong kiến trúc máy, nhưng điều quan trọng hơn là đạt được thỏa thuận về cách dữ liệu được đại diện bởi các máy và hệ điều hành khác nhau. Ví dụ, một hệ thống phân tán có thể có các hệ thống máy tính chạy các hệ điều hành khác nhau, mỗi hệ điều hành có quy ước đặt tên tệp riêng. Sự khác biệt về quy ước đặt tên, sự khác biệt trong hoạt động tệp hoặc sự khác biệt về cách thức giao tiếp cấp thấp với các quy trình khác diễn ra,... là những ví dụ về các vấn đề truy cập tốt hơn nên được ẩn khỏi người dùng và ứng dụng.

Một nhóm quan trọng của các loại trong suốt liên quan đến vị trí của một quy trình hoặc tài nguyên. Tính trong suốt của vị trí (**Location**)  đề cập đến thực tế là người dùng không thể biết vị trí thực tế của một đối tượng trong hệ thống. Đặt tên( naming) đóng một vai trò quan trọng trong việc đạt được sự trong suốt của vị trí. Đặc biệt, tính trong suốt về vị trí thường có thể đạt được bằng cách chỉ gán các tên hợp lý cho các tài nguyên, nghĩa là các tên mà vị trí của tài nguyên không được mã hóa bí mật. Ví dụ về tên như vậy là công cụ định vị tài nguyên thống nhất - Uniform Resource Locator (URL) https://www.youtube.com/watch?v=IoeELo1ygAY, không cung cấp manh mối nào về vị trí thực của máy chủ Web chính của Youtube. URL cũng không cung cấp manh mối về việc liệu các tệp đã luôn ở vị trí hiện tại của nó hay gần đây mới được chuyển đến đó. Ví dụ: toàn bộ trang web có thể đã được chuyển từ trung tâm dữ liệu này sang trung tâm dữ liệu khác, nhưng người dùng thì cũng không quan tâm. Điều thứ hai là một ví dụ về tính trong suốt khi di dời, điều này ngày càng trở nên quan trọng trong bối cảnh điện toán đám mây.

Trong đó, tính trong suốt của việc di chuyển( Relocation) đề cập đến việc được di chuyển bởi hệ thống phân tán, **Migration transparency** được cung cấp bởi hệ thống phân tán khi nó hỗ trợ tính di động của các quy trình và tài nguyên do người dùng khởi xướng mà không ảnh hưởng đến giao tiếp và hoạt động đang diễn ra. Một ví dụ điển hình là giao tiếp giữa điện thoại di động: bất kể hai người đang thực sự di chuyển, điện thoại di động sẽ cho phép họ tiếp tục cuộc trò chuyện của mình. Các ví dụ khác có thể nghĩ đến bao gồm theo dõi và truy tìm trực tuyến hàng hóa khi chúng đang được vận chuyển từ nơi này đến nơi khác và hội nghị từ xa (một phần) sử dụng các thiết bị được trang bị di động Internet.

Như chúng ta sẽ thấy, sao chép (**Replication**) đóng một vai trò quan trọng trong các hệ thống phân tán. Ví dụ: các tài nguyên có thể được sao chép để tăng tính khả dụng hoặc để cải thiện hiệu suất bằng cách đặt một bản sao gần nơi nó được truy cập. Tính trong suốt của sao chép( Replication) đề cập đến việc che giấu thực tế rằng một số bản sao của tài nguyên tồn tại hoặc một số quy trình đang hoạt động ở một số dạng chế độ khóa để một quy trình có thể tiếp quản khi một quy trình khác không thành công. Để ẩn bản sao với người dùng, điều cần thiết là tất cả các bản sao phải có cùng tên. Do đó, một hệ thống hỗ trợ tính trong suốt của bản sao nói chung cũng phải hỗ trợ tính trong suốt của vị trí, vì nếu không sẽ không thể tham chiếu đến các bản sao ở các địa điểm khác nhau.

Chúng ta đã đề cập rằng mục tiêu quan trọng của hệ thống phân tán là cho phép **chia sẻ tài nguyên.** Trong nhiều trường hợp, việc chia sẻ tài nguyên được thực hiện theo cách hợp tác, như trong trường hợp của các kênh truyền thông. Tuy nhiên, cũng có nhiều ví dụ về cạnh tranh chia sẻ tài nguyên. Ví dụ: hai người dùng độc lập mỗi người có thể đã lưu trữ tệp của họ trên cùng một máy chủ tệp hoặc có thể đang truy cập vào các bảng giống nhau trong cơ sở dữ liệu được chia sẻ. Trong những trường hợp như vậy, điều quan trọng là mỗi người dùng không nhận thấy rằng người kia đang sử dụng cùng một tài nguyên. Hiện tượng này được gọi là tính trong suốt đồng thời (**Concurrency Transparency**).

Một vấn đề quan trọng là việc truy cập đồng thời vào một tài nguyên được chia sẻ sẽ khiến tài nguyên đó ở **trạng thái nhất quán**. Tính nhất quán có thể đạt được thông qua cơ chế khóa, theo đó người dùng được cấp quyền truy cập độc quyền vào tài nguyên mong muốn. Một cơ chế tinh vi hơn là sử dụng các **giao dịch**, nhưng những giao dịch này có thể khó thực hiện trong một hệ thống phân tán, đặc biệt là khi khả năng mở rộng là một vấn đề.

Cuối cùng, không kém phần quan trọng với hệ thống phân tán đó chính là trong suốt về lỗi (**Failure Transparency**). Điều này có nghĩa là người dùng hoặc ứng dụng không nhận thấy rằng một số phần của hệ thống không hoạt động bình thường và sau đó (và tự động) phục hồi sau lỗi đó. Che dấu lỗi là một trong những vấn đề khó nhất trong các hệ thống phân tán và thậm chí là không thể xảy ra khi một số giả định thực tế nhất định được đưa ra, chúng ta sẽ thảo luận trong Chương 8. Khó khăn chính trong việc che giấu và khôi phục một cách trong suốt sau những thất bại nằm ở chỗ không thể phân biệt được giữa tiến trình đã chết và quá trình phản hồi chậm một cách khó chịu. Ví dụ, khi kết nối với một máy chủ Web bận, một trình duyệt cuối cùng sẽ hết thời gian chờ và báo cáo rằng trang Web không khả dụng. Tại thời điểm đó, người dùng không thể biết liệu máy chủ thực sự bị lỗi hay mạng bị tắc nghẽn nghiêm trọng.

**Các mức độ trong suốt**

Mặc dù tính trong suốt thường được coi là tốt đối với các hệ thống phân tán, nhưng có những trường hợp cố gắng che giấu một cách mù quáng tất cả các khía cạnh phân tán khỏi người dùng không phải là một ý kiến hay. Một ví dụ đơn giản là yêu cầu báo điện tử của bạn xuất hiện trong hộp thư của bạn trước 7 giờ sáng giờ địa phương, như thường lệ, trong khi bạn hiện đang ở đầu bên kia thế giới sống ở một múi giờ khác. Tờ báo buổi sáng của bạn sẽ không phải là tờ báo buổi sáng mà bạn quen dùng.

Tương tự như vậy, một hệ thống phân tán trên diện rộng kết nối tiến trình ở Hà Nội với tiến trình ở Hồ Chí Minh không thể che giấu sự thật rằng thực tế sẽ có độ trễ khi gửi tin . Thực tế cho thấy rằng nó thực sự mất vài chục đến vài trăm mili giây khi sử dụng mạng máy tính. Việc truyền tín hiệu không chỉ bị giới hạn bởi tốc độ mạng mà còn bởi khả năng xử lý hạn chế và độ trễ của các switches trung gian.

Ngoài ra còn có sự đánh đổi giữa mức độ trong suốt cao và hiệu suất của hệ thống. Ví dụ, nhiều ứng dụng Internet liên tục cố gắng liên hệ với một máy chủ trước khi hủy. Do đó, cố gắng che giấu một lỗi máy chủ tạm thời trước khi thử một máy chủ khác có thể làm chậm toàn bộ hệ thống. Trong trường hợp như vậy, tốt hơn là nên huỷ bỏ sớm hơn, hoặc ít nhất là để người dùng hủy bỏ nỗ lực liên hệ.
Một ví dụ khác là nơi chúng tôi cần đảm bảo rằng một số bản sao, nằm trên các lục địa khác nhau, phải nhất quán mọi lúc. Nói cách khác, nếu một bản sao bị thay đổi, thì sự thay đổi đó phải được truyền cho tất cả các bản sao trước khi cho phép bất kỳ thao tác nào khác. Rõ ràng rằng một thao tác cập nhật duy nhất hiện có thể mất vài giây để hoàn thành, điều này không thể bị ẩn đối với người dùng.

Cuối cùng, có những tình hiển nhiên rằng việc ẩn phân phối không phải là một ý kiến hay. Khi các hệ thống phân tán đang mở rộng sang các thiết bị mà mọi người mang theo và ở đó khái niệm về vị trí và nhận thức bối cảnh ngày càng trở nên quan trọng, nó cần thiết để lộ phân tán thay vì cố gắng che giấu nó. Một ví dụ rõ ràng là việc sử dụng các dịch vụ dựa trên vị trí, thường có thể tìm thấy trên điện thoại di động, chẳng hạn như tìm cửa hàng mang đi Trung Quốc gần nhất hoặc kiểm tra xem có ai trong số bạn bè của bạn ở gần không.

Cũng có những lập luận khác chống lại sự trong suốt trong việc phân tán. Thừa nhận rằng sự trong suốt trong phân tán hoàn toàn là không thể, chúng ta nên tự hỏi bản thân liệu có khôn ngoan không khi giả vờ rằng chúng ta có thể đạt được điều đó. Có thể tốt hơn nhiều nếu phân tán rõ ràng để người dùng và nhà phát triển ứng dụng biết là hệ thống không trong suốt. Kết quả là người dùng sẽ hiểu rõ hơn nhiều về hành vi (đôi khi không mong đợi) của một hệ thống phân tán, và do đó chuẩn bị tốt hơn nhiều để ứng phó với hành vi này.

**Nguồn**: *Distributed Systems 3rd edition Version 3.03 (2020) Maarten van Steen Andrew S. Tanenbaum*