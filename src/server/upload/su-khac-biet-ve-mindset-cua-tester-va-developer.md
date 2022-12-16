Một số chuyên gia CNTT cho rằng vai trò của Tester là không cần thiết và một developer có thể kiểm tra mã code do anh ấy viết. Khái niệm như vậy là hoàn toàn sai. Nhưng bạn có thể đoán tại sao? Một developer chắc chắn có thể kiểm tra mã code của riêng mình và cũng là mã code được viết bởi các developer khác. Nhưng một điều mà một developer sẽ thiếu là chiến lược, cách tiếp cận và suy nghĩ của tester.


Trong bài viết này, chúng tôi sẽ nói về tư duy của một developer và Tester và sự khác biệt. Chúng tôi cũng sẽ nhấn mạnh vào lợi ích của tư duy khác nhau như vậy và mối quan hệ của developer và Tester được tăng cường hơn nữa. Vì vậy, hãy bắt đầu với phương pháp tiếp cận cá nhân của họ.

Sự khác biệt giữa cách tiếp cận của developer và tester. Công việc của developer là tạo ra một ứng dụng, trong khi những Tester là tìm sơ hở trong đó và tìm cách phá vỡ nó. Mặc dù các cách tiếp cận hoàn toàn khác nhau, cả hai vai trò đều hướng tới một mục tiêu chung, đó là tạo ra một ứng dụng ổn định mà không có bất kỳ vấn đề nào. Trong quá trính phát triển phần mềm, cả developer và Tester đều làm việc trên cùng một ứng dụng trong khi mục tiêu của họ mâu thuẫn với nhau.

![](https://images.viblo.asia/54d8f248-2c2f-47ec-8f0f-d8530de9c5d0.png)

### Mindset của Tester trong quá trình phát triển phần mềm
* Trong giai đoạn phân tích yêu cầu, Tester sẽ tìm hiểu toàn bộ ứng dụng. Họ tạo ra các kế hoạch kiểm tra, chiến lược kiểm tra và hiểu phạm vi của ứng dụng.
* Khi quá trình phát triển hoàn tất và  ổn định, họ kiểm tra ứng dụng một cách nghiêm ngặt trên các môi trường khác nhau và kiểm tra hiệu suất và chức năng của tổng thể ứng dụng.
* Tester bắt đầu thử nghiệm với suy nghĩ rằng sự phát triển được thực hiện bởi các Developer có thể bị lỗi và cần phải được kiểm tra kỹ lưỡng trước khi bàn giao.
* Bất kỳ lỗi nào phát sinh trong quá trình kiểm tra đều được ghi lại trong công cụ theo dõi lỗi.
* Sau đó, các kịch bản tự động được tạo ra để giảm chi phí thủ công.
* Kiểm tra hồi quy và kiểm tra lại được thực hiện để đảm bảo sản phẩm có chất lượng tốt nhất.
### Mindset của Developer trong quá trình phát triển phần mềm
* Developer phân tích các yêu cầu và xác định những thách thức liên quan và kết hợp các phương pháp tốt nhất có thể.
* Các Developer, không phân biệt kỹ năng của họ, tự tin về mã code của họ. Họ cho rằng mã code của họ là hoàn hảo và không có khiếm khuyết. Sau khi mã code được hoàn thành, họ tạo ra các bài kiểm tra đơn vị và kiểm tra ứng dụng theo sự hiểu biết của họ.
* Nếu các vấn đề phát sinh trong giai đoạn này, các bản fix code được sử dụng để sửa đổi chúng.

Bây giờ chúng ta đã biết rõ về các nhiệm vụ cá nhân được thực hiện bởi các Developer và tester, giờ đây chúng tôi sẽ nói về toàn bộ quá trình phát triền phần mềm,  tức là khi các Developer và Tester làm việc song song.

* Sau khi quá trình phân tích yêu cầu đã được thực hiện, các Developer chủ yếu tham gia vào việc viết code tính năng của họ, trong khi Tester sử dụng tài liệu yêu cầu để định hình các trường hợp thử nghiệm và các chiến lược thử nghiệm.
* Sau khi Developer tạo các trường hợp thử nghiệm đơn vị và thực hiện ít nhất một vòng thử nghiệm, ứng dụng ổn định được đẩy vào nhóm của tester. Trong giai đoạn này, Developer thường bắt tay vào phần yêu cầu tiếp theo hoặc cung cấp dữ liệu thử nghiệm để thử nghiệm ứng dụng. Thử nghiệm như vậy có phạm vi hẹp và có thể bỏ qua rất nhiều lỗi có thể xảy ra.
* Bây giờ khi một Tester nhận được ứng dụng được phát triển, anh ta / cô ta dựa vào tài liệu yêu cầu và thực hiện từng trường hợp thử nghiệm. Ngoài ra, một vòng thử nghiệm tích hợp được thực hiện để đảm bảo rằng logic hoặc chức năng mới được triển khai không phát sinh lỗi cho phiên bản trước của ứng dụng.
* Kiểm tra chi tiết và chuyên sâu này cung cấp cho Tester một lợi thế lớn và giúp họ xác định các lỗi đã bị Developer bỏ qua. Khi Tester không tham gia vào việc viết code ứng dụng, họ có một cách nhìn khác về ứng dụng.
* Sau khi một vòng kiểm tra cơ bản được hoàn thành, và các vấn đề đã biết được ghi lại, các kịch bản tự động được tạo và thực thi trong các khoảng thời gian định kỳ để cung cấp kiểm tra phạm vi tốt hơn.
* Một Tester cũng chịu trách nhiệm thực hiện các thử nghiệm khác nhau, như hiệu suất, kiểm tra API để loại bỏ bất kỳ vấn đề nào trong tương lai. Thử nghiệm như vậy tùy thuộc vào loại ứng dụng và theo yêu cầu của khách hàng.
### Tester và Developer có nên có mindset khác nhau?
Bây giờ chúng ta đã tìm ra các nhiệm vụ của các Developer và người kiểm thử, câu hỏi đặt ra, “Liệu tư duy khác nhau giữa những Tester và developer có phải là tốt? Vâng, câu trả lời là có!

Mặc dù mối quan tâm duy nhất của Developer là tìm kiếm giải pháp cho nhiệm vụ của mình, mục tiêu của Tester là tìm ra các lỗ hổng và các khu vực dễ gặp lỗi trong ứng dụng. Vì lý do này, việc ủy thác các hoạt động thử nghiệm cốt lõi cho Tester là cách tiếp cận tốt nhất. Khi một Developer thử nghiệm ứng dụng, một số kịch bản thử nghiệm bị bỏ lại do các khái niệm được hình thành trước và không thể tách suy nghĩ ra khỏi mã code của họ. Nhưng khi một tester được đặt trong tình huống này, anh / cô ấy có một tầm nhìn mới và một cơ hội tốt để tìm ra các sơ hở.

Sự khác biệt như vậy là suy nghĩ trong quá trình thực hiện kiểm tra được đánh giá cao bởi hầu hết các công ty, và họ có các nhóm riêng biệt để phát triển và thử nghiệm ứng dụng.
### Tester và Developer: Mindset khác nhau, nhưng cùng mục tiêu
Hầu hết mọi người đồng ý rằng việc định vị và sửa lỗi sớm trong quá trình phát triển phần mềm thì phần mềm có chất lượng cao hơn và chi phí thấp hơn. Việc chuyển đổi sang kiểm thử tự động có nghĩa là các vấn đề có thể được sửa chữa sớm hơn. Nhưng việc cân bằng giữa các Developer và Tester là rất quan trọng. Cả Developer  và Tester đều có một tư duy khác nhau, nhưng cuối cùng là một mục tiêu - để cung cấp các sản phẩm và dịch vụ chất lượng hàng đầu đáp ứng hoặc vượt quá nhu cầu của khách hàng.

Thách thức đối với các Developer  là tự kiểm tra công việc của mình, thay vì giao nó cho người kiểm tra, là khả năng họ có thể bỏ sót lỗi, quên thay đổi hoặc thường cảm thấy quá lạc quan. Bởi vì công việc của tester là tìm kiếm sự sai lệch, công việc sẽ được xem xét một cách khách quan.

Chiến lược thử nghiệm trưởng thành đòi hỏi sự tương tác giữa các bên liên quan, Developer và người kiểm tra, với người quản lý đóng vai trò tích cực trong việc hướng dẫn và dàn xếp. Và mọi dự án đều khác nhau. Nếu bạn tính toán rủi ro của một dự án trên cơ sở tác động của thất bại đối với doanh nghiệp, bạn có thể xây dựng một chiến lược khả thi. Một số công ty chi tiêu nhiều hơn vào việc thử nghiệm hơn là phát triển nếu có rủi ro kinh doanh hoặc tìm kiếm sự an toàn cao, trong khi các dự án khác chỉ có thể yêu cầu một nửa effort dành cho thử nghiệm so với việc phát triển.

#### Tự động hóa thử nghiệm trưởng thành
Bằng cách xem xét các quy trình của bạn từ góc độ kiểm tra sự trưởng thành, bạn sẽ có thể áp dụng các công cụ mới tốt hơn. Hãy suy nghĩ về trạng thái hiện tại quy trình của bạn và xem xét những ý tưởng này để cải thiện tốc độ và chất lượng của các bản phát hành mới.
* Đưa ra một quy trình để dễ dàng truyền đạt những gì cần khắc phục.
* Quản lý cách mã code được triển khai để đảm bảo kết quả có thể lặp lại.
* Xây dựng chiến lược thử nghiệm trước khi cam kết nguồn lực thử nghiệm của bạn mà chỉ có thể tìm thấy một phần lỗi tiềm ẩn.
* Đặt cơ sở hạ tầng để quản lý thông tin về sự cố và cấu hình.
* Thiết lập các kỹ thuật để tạo dữ liệu thử nghiệm để bạn có thể xác nhận rằng các kịch bản thử nghiệm khác nhau hoạt động chính xác.

Từ Phương pháp tiếp cận nhóm, giúp các Developer và Tester làm việc cộng tác hơn với nhau để xây dựng thành công và thúc đẩy sản xuất. Dưới đây là một số gợi ý để giúp xây dựng mối quan hệ cộng sinh quan trọng này:

 
##### Tìm hiểu về khách hàng cùng nhau
Đưa ra tình huống rõ ràng bằng cách cả nhóm cùng xem lại sản phẩm, ứng dụng hoặc web, trước khi bàn giao cho khách hàng sử dụng.

 
##### Tập trung vào giá trị
Bằng cách đặt mình vào vị trí người dùng, nhóm sẽ cùng nhau làm tốt những gì đang xây dựng. Khuyến khích các Developer và Tester cùng nhau lập điều kiện mà phần mềm cần thỏa mãn yêu cầu của người dùng.

 

##### Định nghĩa lại “Done”
Định nghĩa của bạn về việc kết thúc cần một số chú ý. Chỉ bằng cách xem lại định nghĩa về ‘hoàn thành’ của nhóm của bạn, bạn sẽ có thể tạo ra các tiêu chí nghiêm ngặt hơn để tạo ra chất lượng cao hơn.

 

##### Tạo các bài kiểm tra đơn vị với nhau
Điều gì sẽ xảy ra nếu một Tester và một Developer đã viết một bộ kiểm thử đơn vị - cùng nhau? Quan điểm chất lượng từ Tester và tầm nhìn mới có thể mang lại kết quả tích cực.

 
### Kết luận
Cuối cùng, mục tiêu của Developer và Tester là như nhau, mặc dù các vai trò khác nhau. Nhưng với sự tập trung thống nhất vào việc đáp ứng nhu cầu của khách hàng và làm việc trong tinh thần hợp tác, kết quả cuối cùng là đạt được hiệu quả cao hơn với các nhóm có sức mạnh hơn, mạnh mẽ hơn.

Nguồn:
http://www.helpingtesters.com/mind-set-difference-testers-developer/