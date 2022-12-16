# 1. Giới thiệu
Một STLC (vòng đời kiểm thử) luôn có nhiều bước thực hiện và nhiều tài liệu kiểm thử phải tiến hành. Tất cả những ai đã tham gia vào dự án với vai trò Kiểm thử viên (Tester/QA) đều phải tiếp xúc với Test plan trước tiên. Đây là loại tài liệu bất kỳ QA/Tester nào đều phải biết hay tiếp xúc trong khi kiểm thử. Testplan chính là tài liệu mở đầu cho quá trình kiểm thử. Bài viết này mình xin chia sẻ 2 phần chính:
* Khái niệm Test plan
* Những câu hỏi cần đặt ra trong giai đoạn tạo Test plan.
# 2. Khái niệm Testplan
## a. Test plan là gì?
![](https://images.viblo.asia/39c80384-6d47-4fb1-8319-1b498f7f1f8d.JPG)
Test plan là tài liệu tổng quan về việc kiểm thử 1 project đặc tả: phạm vi dự án, hướng tiếp cận, quy trình kiểm thử, tài nguyên và nhân lực cần có, các tính năng cần được test và không cần phải test, các công cụ và môi trường test cần có. Test plan là cơ sở để test các sản phẩm / phần mềm trong một dự án.
## b. Các loại test plan
* Master testplan: một kế hoạch test bao quát nhất cho sản phầm/ phần mềm tổng hợp tất cả các test plan trước đó.
* Testing Level Specific Test Plans(test testplan cụ thể) : kế hoạch test cụ thể cho từng mức Unit test plan Intergration test plan System test plan Accptance test plan
* Testing Type Specific Test Plans
## c. Một số mục trong Test plan
Testplan cung cấp cái nhìn tổng quan nhất khi kiểm thử 1 project. Sau đây là 1 số hạng mục thường có trong một Testplan, đôi khi số lượng mục cần xác định còn phụ thuộc vào quy mô dự án:
* Tiêu đề
* Định nghĩa version của phần mềm (version release)
* Lưu lại quá trình hiệu chỉnh tài liệu như tác giả, ngày cập nhật, duyệt
* Mục lục
* Mục đích của tài liệu, ý kiến chung
* Mục tiêu của chi phí kiểm thử (test)
* Giới thiệu tổng quan về sản phẩm
* Danh sách tài liệu liên quan như spec, tài liệu thiết kế, các kế hoạch test khác,...
* Các tiêu chuẩn thích hợp, các yêu cầu hợp lệ
* Nguồn gốc của các sự thay đổi
* Assumptions and dependencies
* Phân tích rủi ro của dự án
* Các vấn đề ưu tiên và tập trung test
* Phạm vi và giới hạn test -Test phác thảo - phân tích cách tiếp cận theo loại test, tính năng, chức năng, quy trình, hệ thống, mô đun, v.v ... khi áp dụng
* Phân tích giá trị tương đương đầu vào, phân tích giá trị biên, các trường hợp lỗi
* Môi trường test - Phần cứng, hệ điều hành, phần mềm yêu cầu khác, cấu hình dữ liệu, giao diện với các hệ thống khác
* Phân tích tính hợp lệ của môi trường test - sự khác nhau giữa các hệ thống test - product và ảnh hưởng của chúng đối với tính hợp lệ của việc test.
* Các vấn đề thiết lập môi trường và cấu hình
* Quá trình chạy phần mềm
* Kiểm tra yêu cầu thiết lập dữ liệu
* Yêu cầu thiết lập cơ sở dữ liệu
* Test tự động - giải thích và tổng quan
* Các công cụ test được sử sụng, bao gồm các version, bản vá lỗi,...v.v
* Các qui trình bảo trì và quản lý version của test script/test code
* Theo dõi và giải quyết vấn đề - Các công cụ và qui trình
* Các thước đo về test sản phẩm được sử dụng
* Báo cáo các yêu cầu và khả năng giao test
* Điều kiện đầu vào và đầu ra của phần mềm
* Giai đoạn và điều kiện test ban đầu
* Điều kiện dừng test và test lại
* Sự bố trí nhân sự
* Những người cần training trước khi tham gia
* Nơi test
* Các tổ chức test bên ngoài sẽ sử dụng và mục đích, trách nhiệm, khả năng hoàn thành, người liên hệ và các vấn đề hợp tác của họ
* Các vấn đề độc quyền thích hợp, phân loại, bảo mật và bản quyền.
* Các vấn đề mở
* Phụ lục - bảng chú giải, các từ viết tắt, ...v.v...
# 3. Những câu hỏi trong khi tạo Test plan
* Khái niệm chung của QA phần mềm khá đơn giản: Đảm bảo được phần mềm thực sự sẵn sàng cho thị trường. Tuy nhiên, điều này dễ nói hơn là thực hiện.Việc đưa ra được 1 chiến lược quản lý việc kiểm thử  đáp ứng đầy đủ yêu cầu cũng như loại bỏ hết lỗi có thể xảy ra đòi hỏi rất nhiều nỗ lực của cả Tester và Devs họ làm việc cùng (giả sử như 1 DevOps)
* Ngay giai đoạn lập Test plan cũng chính là thời điểm tốt để bắt đầu thực hiện các câu hỏi ngay từ đầu. Có 3 câu hỏi thường tập trung nhất khi viết Test plan:
###  Câu hỏi 1: End user muốn gì?
* Để Tester có thể chắc chắn rằng PM thực hiện được những gì như mong muốn, Tester phải hiểu được “PM được định nghĩa làm gì?”. Trong những ngày phát triền đầu tiên, điều này thực sự cần xác định các chức năng quan trọng là gì. Nhưng ngày này, End user thường có rất nhiều yêu cầu. Có rất nhiều yếu tố khác nhau để thiết kế được một PM thành công và Tester cần phải quan tâm đến những điều này ngay đầu để tạo ra được những test case cần thiết.
* Điều này thực sự quan trọng trong pha kiểm thử chấp nhận người dùng (UAT), khi khách hàng thực thử nghiệm, tiếp xúc với PM. Theo chuyên gia ngành Scott Barber, mục tiêu của UAT có thể tóm tắt lại bằng câu hỏi đơn giản: “Những người sử dụng hệ thống có đồng ý rằng chúng tôi đã đáp ứng đúng các yêu cầu chúng tôi đưa ra chưa?”
* Nếu Tester không nhận thức điều này đầu tiên, ta sẽ không thể tạo ra được những test case trả lời được câu hỏi này.
###  Câu hỏi 2: Kiểm thử có bao nhiêu thời gian?
* Một người quản lý kiểm thử phải biết rằng mình đang cố gắng để đặt được điều gì và phải tích cực tham gia vào quá trình xây dựng timeline cho 1 dự án. Điều này khó hơn việc chỉ yêu cầu deadline chính xác nhiều. Thay vào đó, nó liên quan đến sự xem xét thận trọng đối với những gì có thể thực hiện thành công được trong một khoảng thời gian nhất định. Nhanh chóng để đạt được thời gian lý tưởng đưa ra thị trường, nhưng điều đó không mang nghĩa là công việc quản lý QA làm qua loa.
* Một trong những lợi ích của xu hướng Agile là nó có thể loại bỏ các nhược điểm của mô hình truyền thống. Phương pháp phát triền gồm nhiều thứ hơn, có nghĩa là Tester liên quan nhiều hơn đến quá trình đưa ra quyết định, một trong số đó là thiết lập được một timeline của project. Khi mà Tester biết tốn các bước xây dựng tốn bao nhiêu thời gian, chúng ta có thể phản ứng nhanh hơn trong mô hình Agile, hay có thể điều chỉnh sách lược để làm quen quy trình nhanh. Ví dụ các phương pháp luận kiểm thử Agile có thể đảm bảo rằng mọi iteration mới được kiểm tra đúng cách.
### Câu hỏi 3: Công cụ nào phù hợp với việc kiểm thử?
* Câu hỏi cuối cùng cũng không kém phần quan trọng. Tester cần kiểm tra những công cụ có sẵn/phù hợp để giúp Tester đảm bảo được đầy đủ yêu cầu của người dùng trong khoảng thời gian xây dựng Project. Ví dụ, trong môi trường Agile hoặc tích hợp liên tục, QA sẽ cần một công cụ quản lý kiểm thử vừa có được Dasboeard đơn giản dễ hiều vừa có hỗ trợ theo dõi trong thời gian thực. Điều này giúp mọi người luôn đồng bộ tình hình trong mọi thời điểm.
* Tự động tích hợp cũng cực kỳ có ích, vì nó cho phép tự động hóa các test case có thể tốn thời gian và gây ra nhiều lỗi con người được lặp đi lặp lại liên tục. Các test hồi quy đặc biệt là những ứng viên lý tưởng của việc tự động hóa. Những cases này sẽ được chạy với mỗi iteration mới để chắc chắn không có gì bị ảnh hưởng gây lỗi trong quá trình build bởi những thay đổi gần nhất.
# 4.Tổng kết
Khi ba câu hỏi phía trên đã được giải quyết đầy dủ, Tester sẽ phải tìm hiểu sâu hơn về những quy trình hàng ngày. Ngay cả khi đó, việc xem xét đến yêu cầu của người dùng, thời gian để đưa sản phẩm ra thị trường hay tính khả dụng của các nguồn tài nguyên dự án sẽ tiếp tục thúc đẩy việc quản lý chất lượng thông qua việc phát hành sản phẩm xa hơn nữa.
# 5.Tài liệu tham khảo
* http://www.logigear.com/blog/testing-2/top-3-questions-to-ask-while-creating-a-test-plan/
* http://softwaretestingfundamentals.com/test-plan/