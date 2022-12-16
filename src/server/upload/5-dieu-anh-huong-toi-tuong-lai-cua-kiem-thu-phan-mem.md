Trong vài thập kỷ gần đây, kiểm thử phần mềm đã phát triển về cả 2 phương diện: các tool được linh hoạt sử dụng trong quy trình kiểm thử và sự nhận thức của người tester khi sử dụng các công cụ đó. Trước đây chỉ có một số ít các tools được sử dụng trong kiểm thử phần mềm, nhưng hiện tại có rất nhiều tools để lựa chọn từ các tools cần bản quyển cho đến tools mã nguồn mở. Tương tự như vậy, mọi người đã bắt đầu nghĩ về testers như là những người làm trung gian về thông tin, môi giới thông tin thay vì là người đóng vai trò "gatekeepers" và đã có rất nhiều sự phát triển tích cực trong thế giới nhanh đã góp phần thay đổi đáng kể các quy trình mà các teams follow trong vòng đời phát triển phần mềm (software development lifecycle). Những bước tiến trong công nghệ là nhờ có sự phát triển này. 
Từ cách chúng ta nhìn vào phần mềm, đánh giá rủi ro, suy ngẫm về mức độ phức tạp, thiết kế các cách thức test và các chiến lược, và giúp cho ra một sản phẩm ổn định cho khách hàng, công nghệ chắc chắc có ảnh hưởng đến cách thức kiểm thử phần mềm, và mức độ ảnh hưởng của công nghệ/ các tools sẽ còn tiếp tục ảnh hưởng khi công nghệ tiến bộ xa hơn nữa trong tương lai. Ở cấp độ cao hơn (high level), dưới đây là năm điều quan trọng sẽ định hình tương lai của kiểm thử phần mềm. 

### 1. Trí tuệ nhân tạo
Khoảng năm năm trước, mọi người đều nói về điện thoại di động là đầu tiên (mobile first) và cung cấp cho người dùng trải nghiệm di động bằng cách sử dụng các ứng dụng mobile web, ứng dụng gốc (native applications) và ứng dụng lai (hybrid applications). Ngày nay, từ thông dụng mới chính là trí tuệ nhân tạo (AI - Artificial Inteligence). Đó chính là xe hơi tự lái, người giúp việc gia đình, thị giác máy tính(computer vision), chăm sóc sức khỏe, tài chính, và bây giờ là kiểm thử phần mềm.

Hiện nay, có rất ít công cụ đáng tin cậy trên thị trường sử dụng máy có khả năng tự học (machine learning) để giúp đỡ trong việc soạn thảo và thực hiện kiểm thử chức năng (functional testing), kiểm thử đầu cuối (end-to-end testing) và kiểm thử hồi quy (regression testing). Chúng chủ yếu tập trung vào kiểm thử tự động dựa trên giao diện người dùng (UI-based test automation), càng nhiều thử nghiệm mà người dùng tạo ra, thuật toán càng trở nên thông minh hơn, giúp cho quá trình test ổn định hơn.

Dưới đây là một số lợi ích chúng ta có thể mong đợi để bắt đầu thấy trong kiểm thử nhờ vào AI:

* Dễ dàng ủy quyền trong kiểm thử
* Giảm tải công việc bảo trì trong test script 
* Ít flaky tests (flaky tests là những trường hợp bạn viết test và chạy pass ở máy mình, nhưng khi push code lên, CI chạy test lại bị fail? Bạn chạy thử lại ở local thì vẫn pass, chạy lại lần nữa thì lại bị fail? và người ta gọi những TH test như vậy là flaky test (theo cách nói dân dã là test bị failed một cách "hên xui") )
* Dành cho những người không chuyên về technical và bắt đầu làm test automation
* Tích hợp CI / CD dễ dàng hơn
* Có khả năng tái sử dụng kiểm thử

Ví dụ, chúng ta built một framework tự động (automation framework) với Cucumber, Java và Appium. Mặc dù chúng ta có một robust framework và rất linh hoạt trong việc viết mã tùy chỉnh (custom code) để thực hiện các hành động khác nhau, chúng ta thường gặp phải vấn đề chung về bảo trì. Khi developers thay đổi thuộc tính của một yếu tố đã được bao phủ bởi automation test, các cases sẽ bắt đầu failed. Kết quả là, chúng ta đã tốn rất nhiều thời gian chỉ để maintain những kiểm thử này thay vì viết mã tự động hóa mới (new automation code) để có thể bao quát các chức năng mới đã được thực thi.

Vấn đề này hiện có thể được giải quyết bằng cách sử dụng các bộ định vị động (dynamic locators), trích xuất AI từ Mô hình Đối tượng Tài liệu (DOM - Document Object Model). Trong thời gian thực (real time), AI phân tích tất cả các object trees và thuộc tính từ DOM và có thể tạo một danh sách các thuộc tính khác nhau cho một yếu tố cụ thể. Vì vậy, khi một thuộc tính của một phần tử thay đổi, AI cố gắng đi đến thuộc tính tiếp theo trong danh sách để xác định vị trí của phần tử và tiếp tục đi qua danh sách cho đến khi phần tử được định vị. Các phần tests ổn định hơn, việc cấp quyền và thực thi các tests nhanh hơn nhiều và người tester chỉ phải dành ít thời gian hơn cho việc bảo trì hệ thống. 

### 2. DevOps
DevOps đã giúp các nhóm phát triển phần mềm và các nhóm vận hành cộng tác tốt hơn, qua đó đảm bảo có sự tự động hóa và giám sát liên tục trong suốt vòng đời phát triển phần mềm (SDLC - Software Development Lift Cycle), bao gồm cả quản lý cơ sở hạ tầng.

Bạn có thể hỏi, làm thế nào điều này sẽ ảnh hưởng đến kiểm thử phần mềm? Câu trả lời là: Mọi thứ chúng ta làm như một phần của kiểm thử sẽ thay đổi. Những thay đổi có thể thấy trước bao gồm:

* Cần bắt đầu tự động hóa ngay khi bắt đầu SDLC và đảm bảo gần như tất cả các trường hợp kiểm thử được tự động hóa
* Tất cả các nhiệm vụ QA sẽ cần được căn chỉnh để đảm bảo chu trình CI / CD trơn tru
* Một mức độ hợp tác cao sẽ là cần thiết để đảm bảo có sự giám sát liên tục trong môi trường sản xuất
* Tất cả các môi trường QA sẽ cần phải được chuẩn hóa
* Những mindset về kiểm thử thay đổi từ việc hoàn thành kiểm thử module sang việc xác định đâu là rủi ro ảnh hưởng tới business của khách hàng

Chìa khóa cho tất cả các thay đổi ở trên chính là tự động hóa. DevOps và tự động hóa đi đôi với nhau mà nếu thiếu đi một trong hai yếu tố thì không thể vận hành công việc. Đây là nơi mà con người và các công cụ có thể giúp mang lại các chu kỳ ngắn hơn và đáng tin cậy hơn trong vòng đời release (release cycles)

### 3. QA là Service
Cũng giống như cách chúng ta có SaaS (phần mềm là dịch vụ), IaaS (cơ sở hạ tầng là dịch vụ) và PaaS (nền tảng là dịch vụ), giờ đây chúng ta có QAaaS. Trong vài năm qua, điều này đã trở thành một xu hướng cho các công ty để đáp ứng nhu cầu kiểm thử phần mềm của họ.

Các công ty có giải pháp QAaaS làm cho các khía cạnh khác nhau của quy trình kiểm thử phần mềm của bạn dễ dàng hơn bằng cách cung cấp:

* Quản lý kiểm thử và giải pháp bảo trì
* Sử dụng các automation tools và giảm thiểu coding 
* Các tính năng báo cáo kiểm thử (robust test reporting) với logs, quay video và ảnh chụp màn hình
* Dễ dàng tích hợp với các hệ thống CI

Các tài nguyên như điện thoại di động, máy ảo, mạng an toàn và người kiểm tra trong thời gian tự động hóa, một vài vấn đề lớn có thể gặp phải là phải duy trì máy chủ của riêng mình để chạy automation test. Các máy chủ có các vấn đề khác nhau, như hết dung lượng lưu trữ, kết nối internet không ổn định, tốc độ xử lý chậm đối với số lượng kiểm thử đang được chạy liên tục trong tuần và cần phải cập nhật thường xuyên với hệ điều hành mới nhất, các công cụ xây dựng , bản vá bảo mật, IDE, v.v. Những loại vấn đề này có thể được giải quyết với các nhà cung cấp QaaS, vì họ có thể thực hiện tất cả các hoạt động này cho bạn, vì vậy các thành viên trong nhóm có thể tập trung vào các nhiệm vụ quan trọng hơn.

Trong tương lai, các nhà cung cấp QaaS sẽ suy nghĩ về nhiều cách hơn để cải thiện các dịch vụ của họ để đi trước các đối thủ cạnh tranh, điều này cũng sẽ có lợi cho những người kiểm thử phần mềm.

### 4. Internet vạn vật
Với sự ra đời của thiết bị đeo (wearables), nhà thông minh, xe hơi được kết nối và các công nghệ đám mây khác, internet của vạn vật (IoT) đã trở thành một chủ đề thảo luận lớn. Điều tuyệt vời về các thiết bị này là có rất nhiều giao tiếp (communication) và tích hợp (integrations) diễn ra mỗi giây.

Hãy cùng phân tích ở mức độ cao hơn, đầu tiên, ứng dụng di động (mobile app) và các fitness tracker cần trao đổi, liên lạc được với nhau. Dữ liệu được thu thập bởi ứng dụng di động của bạn sẽ tích hợp liền mạch với các phiên bản ứng dụng dành cho máy tính để bàn, web di động và máy tính bảng và tất cả các giao tiếp này trên các thiết bị sẽ diễn ra trong thời gian thực (update realtime). Tất cả dữ liệu di chuyển đến và từ đám mây, thiết bị và ứng dụng. Mọi người cũng có thể lập các groups và thi đấu với nhau thông qua ứng dụng, vì vậy những tính toán và kết nối này cũng cần phải xảy ra trong thời gian thực. Dựa vào việc bắt các sự kiện khác nhau (event triggered), các thông báo chính xác cần được gửi đến đúng người dùng vào đúng thời điểm. Tất cả các thông tin liên lạc này đều được thực hiện qua internet.

Hãy tưởng tượng bạn là một tester kiểm thử phần mềm fitness tracker- phần mềm theo dõi tập luyện. Bạn sẽ bắt đầu từ đâu? Làm thế nào để thiết kế chiến lược kiểm thử và phương pháp tiếp cận hiệu quả?

IoT đưa ra mức độ phức tạp của riêng mình trong kiểm thử phần mềm. Nó sẽ ảnh hưởng đến cách chúng ta nghĩ về kiểm thử, đặc biệt là vì cần tập trung nhiều hơn vào việc phân tích test so với phương pháp kiểm thử cũ của từng thành phần riêng biệt.

Ví dụ, đối với một công ty booking du lịch, có một ứng dụng mới cho Apple Watch được xây dựng bằng WatchOS (khi nó được Apple giới thiệu lần đầu tiên). Ứng dụng này tuy các chức năng còn hạn chế nhưng khá hữu ích, như khả năng xem thông báo và các thông tin ưu đãi, đặt chỗ và vị trí của khách sạn, chuyến bay và cho thuê xe. Khi test ứng dụng này, ta nhận thấy rằng khi ứng dụng Apple Watch được kết nối với cùng một ứng dụng trên điện thoại, có một số vấn đề kỳ lạ: Khi thu nhỏ ứng dụng trên điện thoại, Apple Watch bị trống, chỉ hiển thị màn hình đen; nhưng khi mở lại ứng dụng trên điện thoại, màn hình đen biến mất và ứng dụng Apple Watch hoạt động bình thường.

Đây là một ví dụ hoàn hảo về lý do tại sao việc kiểm thử tích hợp (integration testing) lại rất quan trọng. Với ngày càng nhiều thiết bị xuất hiện trên thị trường, integration testing sẽ rất quan trọng đối với các tổ chức và người dùng khi sử dụng phần mềm. 

### 5. Robots
Hiện tại chúng ta đã có kiểm thử bằng robots. Một số người có thể nghĩ rằng điều này là đáng lo ngại và đặt ra những vấn đề về bảo mật, nhưng không thể phủ nhận rằng trí thông của con người là không bao giờ có thể bị thay thế bởi robots. Vẫn cần có con người giám sát các robot để đảm bảo chúng đang làm những việc được giao với kết quả như con người mong đợi. Điều này có thể mở rộng ra bao xa và bao lâu? Chỉ có thời gian mới trả lời được. 

Tóm lại, những tiến bộ trong công nghệ đã bắt đầu ảnh hưởng đến cách chúng ta đang thực hiện kiểm thử phần mềm. Nó cũng khiến các công ty phải suy nghĩ lại về cấu trúc tổ chức của họ: Nhóm QA đang tiến tới việc được nhúng vào nhóm Developers và toàn bộ cả nhóm sẽ đạt được chất lượng công việc cao. Công nghệ cũng sẽ trở nên quan trọng đối với việc nghiên cứu và phát triển trong việc tương tác thường xuyên với nhóm developers để làm cho sản phẩm thông minh hơn và hữu ích hơn cho khách hàng.

Cũng cần phải có các quy trình để xử lý một lượng lớn dữ liệu, cũng như khả năng tính toán phù hợp để kết hợp thông qua dữ liệu này để có được thông tin và phản hồi hữu ích. Cuối cùng, để biến tất cả thành hiện thực, các công ty cần áp dụng các quy trình tinh gọn và minh bạch hơn nhiều để tránh trở thành một trở ngại cho sự đổi mới. Chuyển đổi tinh gọn sẽ rất quan trọng cho tăng trưởng hiệu quả.

Điều quan trọng là thay đổi suy nghĩ của chúng ta về cách chúng ta nhìn nhận các hệ thống và kiểm tra chúng cho phù hợp. Chúng ta có thể chọn bỏ qua nó hoặc nắm bắt nó. Bạn sẽ làm gì?

References: https://www.stickyminds.com/article/5-things-will-impact-future-software-testing