Bài viết tham khảo từ: 
https://www.stickyminds.com/article/shifting-your-testing-when-switch-gears


# Tóm lược:

Thay đổi việc test phần mềm của bạn sang trái hoặc phải có thể đáp ứng các nhu cầu khác nhau và cải thiện các khía cạnh khác nhau. Làm thế nào để bạn cân nhắc có nên thay đổi hay không? Hãy để chu kỳ kiểm tra của bạn giống như một cuốn sách hướng dẫn. Cũng giống như khi lái xe ô tô với hộp số tay, nếu động cơ bắt đầu rên rỉ hoặc bạn sợ bị chòng chành, việc chuyển bánh răng có thể là điều bạn cần làm.


Trước kia khi nói đến sự thay đối trong quá trình test mọi người có nhắc đến cách test dịch chuyển trái. Bây giờ thì nó đã thay đổi rồi. Vậy nó thay đổi như thế nào?

Trước khi bạn thay đổi phương thức test của mình, quan trọng là bạn phải đánh giá hiện tại bạn đang ở vị trí nào. Hãy cùng xem các lợi ích của việc dịch chuyển sang trái hoặc phải, bao gồm cả những nhu cầu có thể được đáp ứng và những gì có thể được cải thiện bằng cách dịch chuyển.


# The Middle: Thiết bị thứ ba

Đây là tình hình hiện tại cho hầu hết các công ty. Trong phát triển, chỉ có kiểm tra cơ bản và kỹ thuật được thực hiện. Bạn có một hệ thống kiểm tra chuyên dụng, nơi kiểm tra chất lượng của bạn được thực hiện. Nói chung, các nhà phát triển phát triển và thực hiện các công cụ kỹ thuật và người kiểm tra kiểm tra các chức năng ở các cấp độ khác nhau và kết hợp với các ứng dụng khác.

Các ứng dụng được đóng gói sao cho các kết nối giữa chúng được dành riêng cho các chức năng và khả năng riêng biệt của chúng. Thiết lập này khá tĩnh và đòi hỏi nhiều nỗ lực trong bảo trì và kiến thức về từng sản phẩm, công nghệ và quy trình làm việc. Mỗi ứng dụng được dành riêng cho một nhóm, cho nhà phát triển hoặc cho công ty nhất định và những người quan tâm đến nó. Nếu bạn gặp vấn đề, bạn phải hỏi những người quan tâm đó, và nếu anh ta không có mặt, bạn sẽ bị mắc kẹt. Thông tin được lưu trữ trong silo của con người làm giảm thời gian của bạn để tiếp thị đáng kể.

Tôi đã làm việc với một ngân hàng sử dụng thiết lập này. Họ đã có các hệ thống chuyên dụng với thử nghiệm đơn giản trong mọi giai đoạn. Các trường hợp thử nghiệm được thực hiện cho các hệ thống dev hoặc thử nghiệm và các vấn đề sản xuất thực sự cần được tạo lại trong thử nghiệm để tái tạo chúng.

Các vấn đề bao gồm một thời gian dài để tiếp thị, dữ liệu thử nghiệm không nhất quán thông qua các hệ thống, sự khác biệt giữa môi trường của từng hệ thống và từng giai đoạn, một số lỗi chỉ xảy ra khi một số hệ thống nhất định được kết nối. Hầu hết thời gian thử nghiệm đã đi vào thiết lập và sau đó cố gắng căn chỉnh tất cả các hệ thống và tưởng tượng chúng như chúng sẽ chạy trong sản phẩm.

Một cơ sở dữ liệu về dữ liệu thử nghiệm có thể được nhập là một trợ giúp, bởi vì người dùng và tài khoản có thể được tạo nhanh chóng với bất kỳ ngày nào trên đó; nếu không, thử nghiệm sẽ mất nhiều thời gian. Nhưng có cách nào tốt hơn không?

# Dịch chuyển sang trái: Thiết bị đầu tiên

Tại sao chúng ta lại thực hiện quá trình test quá muộn trong vòng đời phát triển của mình? Nếu chúng ta quản lý quá trình test của mình, tiến hành test sớm hơn để tìm lỗi sớm hơn, chúng ta có thể giải quyết chúng một cách dễ dàng hơn, chưa kể nó còn giảm chi phí fix bug hoặc lỗi liên quan. Vì vậy, hãy để thử nghiệm dịch chuyển bên trái dọc theo dòng thời gian phát triển phần mềm, chuyển nó vào môi trường dev.


Điều này là có thể bởi vì cũng có một sự thay đổi trong thiết lập. Các hệ thống đã di chuyển lên đám mây và tester đã chuyển khỏi các kết nối chuyên dụng cho mọi ứng dụng sang API. Trong môi trường được kiểm soát bởi lớp API, mọi ứng dụng gọi một chức năng trên một dịch vụ, là chung chung hoặc dành riêng cho phép thử nghiệm trước đó. Kiểm tra được thực hiện trên các dịch vụ. Dữ liệu được truyền qua một yêu cầu và được nhận bởi phản hồi. Nếu một hệ thống không có sẵn, một dịch vụ ảo sẽ được thay thế.

Ảo hóa dịch vụ chỉ là một cách để chế nhạo bất kỳ loại hệ thống được kết nối nào, cho phép tester chơi xung quanh nó. Việc mô phỏng thậm chí có thể được thực hiện với các môi trường phức tạp và mọi người có thể được đào tạo và thực hành như trong thiết lập được phát hành, với ít rủi ro hơn nhiều. Luồng dữ liệu được ghi lại và sẽ được phát lại khi cần. Các cuộc gọi dịch vụ được thực hiện cho lớp API và dịch vụ ảo hóa trả lời giống như cách một hệ thống sản xuất sẽ làm. Ứng dụng này là một phần của toàn bộ môi trường và một cảnh quan rộng lớn đã được phát triển.

Một cách tiếp cận thử nghiệm dựa trên mô-đun cũng thay đổi trò chơi. Đội phát triển tạo ra các mô-đun được sử dụng sau này bởi các tester. Chỉ cần nghĩ về các quan điểm khác nhau về hệ thống đang thử nghiệm: Dev chỉ nhìn vào phần của chúng, trong khi đội tester nhìn vào sự kết hợp của các hệ thống và xem bức tranh lớn hơn trong toàn cảnh của hệ thống. Việc tái sử dụng một số hiện vật tạo ra một cách mới để tạo ra chuỗi quy trình hoặc có thể được sử dụng để mở rộng mô phỏng, chỉ thay đổi bắt đầu và kết thúc. Đội phát triển có thể xác định chi tiết kết nối như người dùng, mật khẩu, thiết bị đầu cuối, bảo mật trước và người kiểm tra chỉ cần đưa nó vào môi trường thử nghiệm. (Vâng, chỉ là một môi trường thử nghiệm. Nó không có nghĩa là một khu vực thử nghiệm chuyên dụng mà không ảo hóa, nơi các hệ thống thực sự tương tác với nhau.)

Dữ liệu thử nghiệm và các biến thể của tất cả các thử nghiệm có thể được chia sẻ giữa dev và thử nghiệm, do đó, một thử nghiệm hữu ích có thể được chạy trong dev, luôn phụ thuộc vào mức độ quan trọng và luồng dữ liệu được ghi lại. Nhiều người có thể chia sẻ kiến thức về chỉ đạo. Cuộc gọi dịch vụ có thể rất chung chung và phụ thuộc nhiều vào dữ liệu được cung cấp. Điều này có nghĩa là tìm ra lỗi sớm hơn, dẫn đến nỗ lực thử nghiệm ít hơn trong các giai đoạn tiếp theo và rút ngắn thời gian tiếp thị của bạn.

Tôi cũng đã làm việc với một công ty thẻ tín dụng trong quá trình thay đổi thử nghiệm của họ theo cách này. Họ đã quản lý để thoát khỏi giai đoạn tĩnh và chuyển sang API, mặc dù chúng không đủ chung chung nhưng vẫn cụ thể hơn cho một chức năng nhất định tại thời điểm này, họ vẫn sớm phát hiện ra nhiều lỗi. Họ đã có một đội test chuyên dụng chỉ tập trung vào lớp API và kiểm tra kết nối giữa nó và các ứng dụng. Đội test đã tạo ra các mô-đun với các nhà phát triển, đại diện cho các yêu cầu và phản hồi. Các mô-đun tương tự cũng có thể được sử dụng lại trong thử nghiệm với các tham số kết nối khác nhau, giúp tiết kiệm một lượng lớn thời gian vì mọi thứ đã được xác định trước và nhóm phát triển biết những tham số nào mà đội test cần trong trường hợp khi có thay đổi. Các vấn đề lớn và sự không nhất quán dữ liệu đã được kiểm tra trong môi trường dev và có thể được giải quyết trước khi triển khai để kiểm tra.

Họ mới bắt đầu giả lập các ứng dụng bằng ảo hóa dịch vụ, nhưng đối với những gì họ đã làm, các nhà phát triển nói với tôi rằng việc kiểm tra của họ có thể đi được bao xa vì hành vi ứng dụng cái mà sẽ làm giảm thời gian bảo trì và kiểm tra sau này.

# Chuyển sang phải: Thiết bị thứ năm

Phương pháp này là đặc biệt bởi vì chúng tôi loại nó, trộn lẫn nó và cố gắng để có được phương pháp tốt nhất của cả hai thế giới bên trên. Chúng tôi tăng đáng kể nhân lực của đội test lên, nhưng thời gian tiếp cận thị trường của chúng tôi cần phải rất ngắn vì thử nghiệm đang trong quá trình sản xuất.

Một trong những ví dụ tốt nhất để thay đổi quyền kiểm tra là Amazon. Khách hàng và người dùng sản phẩm của họ là những người tester. Hoạt động được tích hợp cao và có ý nghĩa hơn trong QA. Điều này hoạt động tốt nhất nếu bạn đã trải qua thay đổi quá trình test của mình và chỉ có một sản phẩm lớn chuyển qua bản dựng tự động.

Để đảm bảo quá trình test trong các công trình sản xuất, cần nhiều nỗ lực hơn so với các bánh răng khác. Các quy trình kiểm tra phải được xác định gần hoàn hảo và tất cả các công việc nên được tự động hóa, ưu tiên lớp API. Bất cứ điều gì bạn quên sẽ được check và có thể có mặt trong sản xuất, do đó, một khu vực được bao phủ trong thử nghiệm có thể dẫn đến thiệt hại thực sự. Sản phẩm của bạn phải cực kỳ ổn định và có thể không có quá nhiều thứ được kết nối với nhau hoặc ít nhất mọi thứ nên được kiểm tra với mức độ bảo hiểm rủi ro trên 90% nếu không các hoạt động khác sẽ không thể triển khai.

Mỗi phần nên được xử lý độc lập. Từ sự phát triển đến sản phẩm nên bao gồm các bit và miếng nhỏ, bởi vì điều này đảm bảo phạm vi kiểm tra tốt hơn. Các tính năng lớn có thể gây ra nhiều tác dụng phụ hơn mong đợi, vì vậy bạn muốn đưa chúng vào các thử nghiệm của mình càng sớm càng tốt. Bản thân bài test cuối cùng sẽ được xử lý thông qua người dùng và phản hồi của họ sẽ cung cấp cho bạn các lỗi.

Tuy nhiên, cần phải có một đường ống QA tích hợp liên tục được triển khai đầy đủ, sẽ được kích hoạt trong quá trình xây dựng. Hầu hết các thử nghiệm diễn ra tự động trong công cụ CI và việc xây dựng chỉ được thực hiện nếu các thử nghiệm có màu xanh. Người tester cần tạo và duy trì quá trình test và test kết quả. Trong trường hợp tốt nhất, người tester nên có thể nhận ra dương tính giả và đánh giá sự cần thiết của thử nghiệm hoặc sự tham gia của đội phát triển.

Nếu bạn đi qua toàn bộ hộp số, bạn sẽ có được lợi thế từ bánh răng đầu tiên. Các mô-đun API từ dev có thể được sử dụng lại ở đây và việc bảo trì ở cấp độ kỹ thuật chỉ được thực hiện một lần. Trạng thái thực hiện cuối cùng được dựa trên thông tin phản hồi. Không cần thêm bất cứ điều gì để thảo luận trực tiếp sau khi thử nghiệm của bạn; Nó nói thêm về việc nhận email từ những khách hàng khó chịu.

Đó là một lựa chọn tốt để tăng sự chấp nhận của người dùng và tạo các tính năng dựa trên trải nghiệm người dùng, nhưng sản phẩm của bạn cần phải ở một mức độ nhất định để đi theo nó. Nếu thay đổi của bạn không ảnh hưởng quá nhiều đến rủi ro kinh doanh của bạn, nghĩa là nếu cả hai thiệt hại trong trường hợp thất bại và tần suất sử dụng đều thấp, bạn có thể dễ dàng tin tưởng vào thiết bị của mình. Trong mọi trường hợp khác, hãy cố gắng đảm bảo rằng tất cả các xét nghiệm bao gồm càng nhiều càng tốt và tất cả các tác dụng phụ được phát hiện. Nhận dạng và phạm vi kiểm tra của bạn càng cao thì độ tin cậy trong đường ống và thiết lập của bạn để phân phối sản phẩm của bạn càng nhanh chóng và an toàn.

Tôi hiện đang thiết lập quy trình này cho một khách hàng là nhà cung cấp dịch vụ di động. Họ đã sẵn sàng ứng dụng của họ và chỉ thêm các tính năng trên các tính năng, vì vậy các phần nhỏ hơn. Mọi ứng dụng của bên thứ ba đều được ảo hóa và kết nối chạy qua các API. Mọi bản dựng đều đi qua một đường ống CI và được kiểm tra ở phía trước với các bài kiểm tra API và JUnit tự động.

Nếu điều này ổn, nó sẽ tự động chuyển sang môi trường kiểm tra chuyên dụng. Ở đó, một công cụ CI mô phỏng lại các máy móc, và giải pháp, bao gồm cả công cụ kiểm tra và môi trường, được xây dựng. Sau khi hoàn thành, các kiểm tra chức năng tự động được chạy bằng UI, API và thiết bị thực. Nếu tất cả các thử nghiệm đều có màu xanh, bản dựng sẽ được chuyển đến sản xuất và được xây dựng ở đó, mà không có bất kỳ đầu vào thủ công nào. Điều này đòi hỏi sự tin tưởng vào các hệ thống và ứng dụng, nhưng nó giúp tiết kiệm thời gian và tiền bạc.

Thay đổi trong các thử nghiệm xảy ra thông qua tất cả các giai đoạn chỉ bằng cách duy trì một đối tượng. Một thử nghiệm được tạo và ảnh hưởng đến nhiều môi trường, nhờ các mô đun dựng sẵn. Thách thức lớn nhất ở đây là sự liên kết trong việc ảo hóa các giai đoạn khác nhau. Trong quá trình tạo trường hợp thử nghiệm, chúng tôi đã giới thiệu một giai đoạn và sử dụng nguyên tắc của nhóm bốn mắt để kiểm tra xem mọi thứ đã được kiểm tra và bảo hiểm chưa.

# Đừng sợ sự Chuyển đổi bánh răng
Mọi môi trường đều phụ thuộc vào nhiều yếu tố, bao gồm ứng dụng, nhóm và thiết lập cơ sở hạ tầng. Các chiến lược và cách tiếp cận thử nghiệm khác nhau có thể được sử dụng cho các giai đoạn khác nhau và nếu quy trình của bạn chuyển bạn sang một giai đoạn khác hoặc nếu bạn nghĩ rằng một giai đoạn khác có thể phục vụ bạn tốt hơn thì hãy chuyển theo hướng đó.

Mỗi ca là một quá trình, không phải là một khoảnh khắc; cuộc hành trình của bạn sẽ tạo ra những khoảnh khắc cho bạn. Đừng ngần ngại chuyển thử nghiệm của bạn qua các giai đoạn khác nhau trong vòng đời phần mềm nếu bạn nghĩ rằng nó sẽ có lợi cho các quy trình của bạn hơn. Và đừng để ý tưởng “Phải tạo ra một kế hoạch kiểm tra hoàn toàn mới cản trở bạn”: Khả năng sử dụng lại kiểm tra rất cao và một cái gì đó được xác định trong thiết bị thứ ba có thể giúp bạn tiết kiệm thời gian và tiền bạc vào lần thứ năm.

Hãy để chu kỳ kiểm tra của bạn là hướng dẫn của bạn. Giống như khi lái xe ô tô với hộp số tay, nếu động cơ bắt đầu rên rỉ hoặc bạn sợ bạn sẽ chùn bước, việc sang số có thể là điều bạn cần.