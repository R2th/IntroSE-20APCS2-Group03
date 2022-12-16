Nếu ứng dụng của bạn đang gặp vấn đề với vấn đề về loading, đây là lúc bạn cần nghĩ đến những giải pháp để giải quyết chúng. Bạn đã có số lượng user đến mức giới hạn mà bạn có thể giải quyết, hiệu suất ứng dụng trở nên chậm dần đi và xuất hiện lỗi. Network request bắt đầu bị time-out, truy vấn dữ liệu bắt đầu mất 1 khoảng thời gian để xử lí, tốc đô load trang ngày càng chậm. Chúc mừng @@@. Ứng dụng của bạn bắt đầu cần phải scale. Nếu bạn không sclae nhanh chóng, các đối thủ khác có thể copy ý tưởng của bạn và xây dựng 1 app hoàn hảo hơn. Khi đó, dù có là người đi đầu nhưng cũng không phải người về đích. 

# Cái giá của scaling
Trước khi bạn bắt đầu scaling theo chiều dọc, sâu hoặc từ trong ra, một nguyên tắc rất quan trọng nên được tuân thủ. Bạn không nên triển khai các bản tối ưu thử nghiệm, hoặc cố gắng scale khi chưa thực sự cần. Việc triển khai các giải pháp scaling giới thiệu các vấn đề sau: 

* Thêm chức năng sẽ tốn thời gian hơn
* Hệ thống trở nên phức tạp với nhiều mảnh, và các biến tăng
* Việc code trở nên khó test hơn
* Việc tìm và giải quyết bug cũng trở nên khó hơn

Bạn nên chỉ chấp nhận việc scaling nếu app của bạn đã đạt đến giới hạn. Giữ hệ thống ở mức đơn giản, không nên giới thiệu nhiều sự pháp tạp từ việc scaling nếu không thực sự cần thiết. 
![](https://images.viblo.asia/10abbab3-9868-44de-9003-7fd602712d59.jpeg)

# Tìm Bottlenecks với metrics
Mỗi ứng dụng/hệ thống đều khác nhau, để xác định giải pháp scaling để triển khai, bạn cần phải xác định bottlenecks ở đâu. Đây là lúc cần kiểm tra hệ thống theo dõi tài nguyên của bạn hoặc cần phải tạo nếu bạn chưa có. Không quan trọng stack công nghệ bạn đang sử dụng sẽ luôn có tools có sẵn cho việc theo dõi tài nguyên của bạn. Nếu bạn đang chạy ứng dụng trên các nền tảng IaaS như AWS, Azure, GCP, sẽ có những ứng dụng tuyệt vời cho việc theo dõi tài nguyên. 

Các công cụ đó minh họa hiệu suất việc sử dụng tài nguyên của bạn thông qua các đồ thị và các phương thức minh họa khác. Các công cụ đó có thể phát hiện tài nguyên đang bị quá tải, hoặc tài nguyên hiện có không thể xử lí các tác vu mới. Nếu không có gì hiển hiện ở phần sức chứa tài nguyên, bạn có thể xem logs để tìm ra các tác vụ tốn tài nguyên nhất. Bạn nên hosting database ở 1 server khác, và trong trường hợp đó bạn cũng nên kiểm tra việc theo dõi sử dụng tài nguyên cho server đó.

Bằng việc suy nghĩ về việc cách người dùng sử dụng ứng dụng của bạn và suy nghĩ logic về các lỗi có thể xảy ra thì việc xác định bottleneck có thể là tương đối đơn giản. Ví dụ với Twitter, nền tảng này chủ yếu cho mọi người đọc và viết các tweets. Nếu dịch vụ theo dõi của Twitter thông báo rằng việc load database đang gặp vấn đế, các đội phát triển của họ sẽ bắt đầu tối ưu từ phân vùng này. Trong bài viết này, chúng ta sẽ chia ra các giải pháp để scaling database.
![](https://images.viblo.asia/4732c6b6-2acb-4a17-9da7-0b3b92b703c4.png)

# Scaling ứng dụng
Bây giờ chúng ta đã hiểu được phần nào về bottleneck là gì ? bottleneck như thế nào, chúng ta có thể bắt đầu triển khai các giải pháp để giái quyết các vấn đề này. Hãy nhớ rằng sự đơn giản là chìa khóa, chúng ta luôn muốn tránh các sự phức tạp không cần  thiết. 

Mục tiêu đầu tiền của các giải pháp scaling là giảm trừ các loading, thời gian xử lí các tác vụ phức tạp. Cách các kĩ thuật scaling thường làm theo những cách sau:
* Sử dụng data đã được tìm kiếm trước đó
* Loại bỏ request từ phía client cho các data đã được sở hữu trước đó
* Lưu trữ các kết quả từ các tác vụ được lặp đi lặp lại
* Loại bỏ các tác vụ phức tạp trong vòng lặp request và response

Nhiều kỹ thuật scaling quy mô cho một số hình thức lưu trữ. Trong quá khứ, bộ nhớ đắt tiền và khan hiếm, ngày nay, nó không còn tốn kém để thêm nó vào máy chủ. Bộ nhớ có cường độ nhanh hơn để truy cập dữ liệu so với đĩa hoặc mạng, trong thời đại ngày nay, nơi người dùng có rất nhiều sự lựa chọn, cùng với khoảng chú ý tối thiểu, tốc độ và hiệu suất của chúng là tối quan trọng đối với sự sống còn của ứng dụng của bạn.

# Các phương pháp scaling database
## Cache Database Queries
Caching truy vấn database là 1 trong những phương pháp cải thiện đơn giản nhất để bạn xử lí việc load database. Thông thường, một ứng dụng sẽ có 1 số câu truy vấn được dùng nhiều lần để xây dựng luồng chính trong ứng dụng. Thay vì việc dùng đi thêm 1 vòng nữa cho mỗi lần nhận được request để lấy dữ liêu, chúng ta đơn giản có thể cache chúng ở bộ nhớ trên web server. Request đầu tiên sẽ lấy data từ cơ sở dữ liêu, sau đó cache kết quả đó trên server, các request trong tương lai chỉ cần đọc dữ liệu từ cache. Điều này sẽ làm tăng performance của hệ thống cũng như việc dành ít thời gian hơn trong việc lấy data. Cũng như việc tăng tính sẵn sàng, nếu database không khả dụng tại 1 thời điểm, cache vẫn có thể tiếp tục cung cấp dịch vụ tới ứng dụng, làm cho ứng dụng vẫn khó bị lỗi hơn. Có rất nhiều tools bạn có thể sự dụng để phân tích log của các câu truy vân, do đó bạn có thể điểu tra ra các câu truy vẫn tốn thơi gian và các câu truy vấn được dùng thường xuyên. 

Rõ ràng, dữ liệu mà bộ nhớ cache trong bộ nhớ cache có thể trở nên lỗi thời hoặc nhanh chóng bị lỗi thời. Bạn sẽ phải chú ý đến dữ liệu nào bạn đã chọn để lưu trữ và thời gian sử dụng. Ví dụ: một tờ báo trực tuyến sẽ có một tờ báo hàng ngày mới cứ sau 24 giờ, thay vì yêu cầu dữ liệu đó từ cơ sở dữ liệu mỗi khi người dùng truy cập trang web, họ có thể lưu trữ dữ liệu đó trên máy chủ web trong 24 giờ và phục vụ trực tiếp từ máy chủ . Các yêu cầu về sản phẩm hoặc kinh doanh sẽ quyết định những gì có thể và có thể được lưu trong bộ nhớ cache.
![](https://images.viblo.asia/3c6bdc9a-c4a6-4b9b-86ea-8aaf8f5639ae.png)

## Database Indexes

Lập index dữ liệu là một kỹ thuật cải thiện tốc độ của các hoạt động truy xuất dữ liệu trên bảng cơ sở dữ liệu. Các index được sử dụng để nhanh chóng xác định vị trí dữ liệu mà không phải tìm kiếm mọi hàng trong bảng mỗi khi bảng được truy cập. Thông thường, cấu trúc dữ liệu cho một index cơ sở dữ liệu sẽ là một cây tìm kiếm nhị phân. Điều này cho phép giảm độ phức tạp thời gian của việc truy cập dữ liệu từ thời gian tuyến tính O (n) sang thời Olog (n).

Tùy thuộc vào số lượng hàng trong một bảng, điều này có thể tiết kiệm đáng kể thời gian các truy vấn sử dụng cột được index. Ví dụ: nếu bạn có 10.000 người dùng và ứng dụng của bạn có các trang hồ sơ tìm kiếm người dùng theo tên người dùng của họ, một truy vấn không được lập index sẽ kiểm tra từng hàng trong bảng người dùng cho đến khi tìm thấy hồ sơ phù hợp với tên người dùng được chuyển vào truy vấn . Điều đó có thể mất tới 10.000 lần check -> O (n). Bằng cách tạo một index cho cột tên người dùng , cơ sở dữ liệu có thể giảm độ phức tạp câu truy vấn về (Olog (n)). Trong trường hợp này, số lần kiểm tra hàng tối đa sẽ là 14 thay vì 10.000 !

Lập index hiệu quả làm giảm tải trên cơ sở dữ liệu bằng cách tăng hiệu quả, điều này cũng cung cấp hiệu suất tăng đáng kể dẫn đến trải nghiệm người dùng tốt hơn. Tạo một index sẽ thêm một bộ dữ liệu khác sẽ được lưu trữ trên cơ sở dữ liệu, do đó phải thực hiện phán đoán cẩn thận khi quyết định các trường nào để lập index. Ngay cả với không gian lưu trữ hiện có được sử dụng, việc lập index có xu hướng rất đáng giá, đặc biệt là trong sự phát triển hiện đại, nơi bộ nhớ rẻ và hiệu năng là không thể thiếu để tồn tại.

## Session Storage

Rất nhiều ứng dụng xử lý các session bằng cách lưu trữ ID phiên trong cookie, sau đó lưu trữ dữ liệu thực tế cho cặp khóa / giá trị của mỗi session trong một bảng trên cơ sở dữ liệu. Điều này có thể trở thành một số lượng lớn đọc và ghi vào cơ sở dữ liệu của bạn. Nếu cơ sở dữ liệu của bạn đang bị quá tải dữ liệu session, thì đó là một ý tưởng tốt để suy nghĩ lại về cách thức và nơi bạn lưu trữ dữ liệu đó.
Di chuyển dữ liệu session sang một công cụ bộ nhớ đệm trong bộ nhớ như redis hoặc memcached có thể là một lựa chọn tốt. Điều này sẽ loại bỏ tải dữ liệu phiên từ cơ sở dữ liệu của bạn và cũng tăng tốc độ truy cập vì trong bộ nhớ nhanh hơn lưu trữ đĩa liên tục mà hầu hết các cơ sở dữ liệu sử dụng. Tuy nhiên, vì bộ nhớ trong là bộ nhớ dễ bay hơi, có nguy cơ mất tất cả dữ liệu session nếu hệ thống bộ đệm không hoạt động.

Bạn cũng có thể xem xét việc thay đổi triển khai session của mình thành lưu trữ thông tin phiên trong chính cookie, điều này sẽ chuyển phương tiện duy trì trạng thái phiên ra khỏi máy chủ và thay vào máy khách. JWT sóng là cách triển khai phổ biến nhất cho mẫu này. Điều này sẽ làm giảm bớt cơ sở dữ liệu của bạn về tất cả dữ liệu session và loại bỏ sự phụ thuộc của các session phía máy chủ, mặc dù nó đưa ra các thách thức của riêng nó.

## Master Slave Replication
Nếu cơ sở dữ liệu của bạn vẫn còn quá tải từ việc đọc ngay cả sau khi lưu các truy vấn chung, tạo các index hiệu quả và xử lý lưu trữ phiên, thì sao chép có thể là bước tốt nhất tiếp theo.

Với bản sao master-Slave, bạn có một cơ sở dữ liệu duy nhất mà bạn viết. Nó được sao chép vào một số (bao nhiêu bạn cần) cơ sở dữ liệu slave mà bạn đọc từ đó, với mỗi cơ sở dữ liệu slave trên một máy khác (tham khảo sơ đồ bên dưới). Điều này sẽ phân tải ra khỏi cơ sở dữ liệu chủ và phân phối nó trên nhiều máy chủ. Mô hình này cũng cải thiện hiệu suất ghi khi cơ sở dữ liệu chủ được dành riêng để ghi, trong khi tăng đáng kể tốc độ đọc và giảm độ trễ khi cơ sở dữ liệu nô lệ được trải rộng trên các vùng khác nhau.

![](https://images.viblo.asia/cf633d54-335c-4e21-bfed-bae759985b7f.png)

Vì mỗi cơ sở dữ liệu slave nằm trên một máy khác, nên ghi vào cơ sở dữ liệu chủ cần truyền qua các slave có thể dẫn đến dữ liệu không nhất quán. Nếu bạn cần đọc ngay dữ liệu được ghi vào cơ sở dữ liệu, giả sử bạn đang cập nhật một hồ sơ và muốn nó được hiển thị ngay lập tức, bạn có thể chọn đọc từ cơ sở dữ liệu chính. Sao chép Slave-master là một giải pháp mở rộng vô cùng mạnh mẽ, nhưng nó đi kèm với sự phức tạp của nó. Thật khôn ngoan khi thực hiện giải pháp này sau khi sử dụng hết các giải pháp đơn giản hơn và đảm bảo tối ưu hóa hiệu quả trong ứng dụng.
* Mô hình kiến trúc này thường được gọi là sao chép master-slave, nhưng nó là một thuật ngữ đã nhận được sự chỉ trích trong nhiều năm và đang trong quá trình thay thế trong cộng đồng công nghệ.

## Database Sharding

Hầu hết các giải pháp mở rộng cho đến nay đã tập trung vào việc giảm tải thông qua việc quản lý các lần đọc vào cơ sở dữ liệu. Cơ sở dữ liệu sharding là một giải pháp mở rộng theo chiều ngang để quản lý tải bằng cách quản lý đọc và ghi vào cơ sở dữ liệu. Nó có một mô hình kiến trúc liên quan đến quá trình phân tách (phân vùng) cơ sở dữ liệu chủ thành nhiều cơ sở dữ liệu (phân đoạn), nhanh hơn và dễ quản lý hơn.
Có hai loại kỹ thuật sharding cơ sở dữ liệu - sharding dọc và sharding ngang (tham khảo các sơ đồ bên dưới). Với phân vùng ngang, các bảng được lấy và đặt trên các máy khác nhau với mỗi bảng có các cột giống nhau, nhưng các hàng khác nhau. Phân vùng dọc phức tạp hơn, liên quan đến việc chia một bảng trên nhiều máy. Một bảng được tách ra và đưa vào các bảng mới, riêng biệt. Dữ liệu được giữ trong một phân vùng dọc độc lập với dữ liệu trong tất cả các phân vùng khác, mỗi bảng chứa cả hàng và cột riêng biệt.

![](https://images.viblo.asia/1a9bc129-4a60-4b0a-9433-c3fc02415e8c.png)

Cả hai kỹ thuật sharding đều tạo điều kiện mở rộng theo chiều ngang, còn được gọi là mở rộng quy mô, cho phép thực hành thêm nhiều máy vào hệ thống để phân phối / truyền tải. Chia tỷ lệ theo chiều ngang thường tương phản với tỷ lệ theo chiều dọc, còn được gọi là chia tỷ lệ, liên quan đến việc nâng cấp phần cứng của máy chủ hiện có. Mở rộng cơ sở dữ liệu tương đối đơn giản, mặc dù bất kỳ cơ sở dữ liệu không phân tán nào cũng sẽ có giới hạn về khả năng tính toán và lưu trữ, do đó, có thể tự do mở rộng quy mô giúp hệ thống của bạn linh hoạt hơn rất nhiều.

Một kiến trúc cơ sở dữ liệu bị phân mảnh cũng có thể làm tăng đáng kể tốc độ truy vấn của ứng dụng của bạn, cũng như tăng khả năng phục hồi cho các lỗi. Khi gửi một truy vấn trên cơ sở dữ liệu không được bảo vệ, nó có thể phải tìm kiếm mọi hàng trong bảng có thể bị chậm rất nhiều. Ngoài ra, bằng cách sắp xếp một bảng vào nhiều bảng, các truy vấn phải vượt qua các bản ghi ít hơn nhiều để trả về kết quả. Vì mỗi bảng trong một máy chủ riêng biệt, tác động của máy chủ trở nên không khả dụng sẽ được giảm thiểu. Với cơ sở dữ liệu được bảo vệ, tác động của việc ngừng hoạt động có thể sẽ chỉ ảnh hưởng đến một phân đoạn duy nhất, so với cơ sở dữ liệu không được bảo vệ nơi mất điện có khả năng khiến toàn bộ ứng dụng không khả dụng.

Có một kiến trúc cơ sở dữ liệu phân đoạn cung cấp một số lợi ích khá lớn, tuy nhiên, nó phức tạp và có chi phí thực hiện và bảo trì cao. Đây chắc chắn là một lựa chọn mà bạn muốn xem xét sau khi sử dụng hết các giải pháp mở rộng quy mô khác vì việc phân nhánh thực hiện không hiệu quả có thể khá nghiêm trọng.

# Kết luận
Trên đây là 5 giải pháp scaling database bạn có thể cân nhắc để tăng hiệu quả hệ thống của bạn. Bạn cũng cần lưu ý khi nào thật sự dùng tới chúng và luôn nhớ rằng chúng ta có thể KEEP IT SIMPLE, STUPID. Happy coding!!!

# Nguồn
https://medium.com/swlh/5-database-scaling-solutions-you-need-to-know-e307570efb72