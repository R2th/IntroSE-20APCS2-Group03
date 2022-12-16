Link tham khảo: https://www.stickyminds.com/article/4-strategies-structured-qa-process


![](https://images.viblo.asia/a734f2d9-2437-4bab-a052-6c3a529b28a7.png)

Tóm lược:

Bạn đang là một người kiểm thử phần mềm, nhiệm vụ của bạn không chỉ là tìm ra nhiều lỗi nhất có thể, cải tiến chất lượng của phần mềm trước khi Release. Nó còn là vấn đề liên tục phải cải tiến để phù hợp với thị trường phần mềm ngày nay, xác định được một chiến lược test rõ ràng, mở rộng tư duy hơn nữa để cải tiến chất lượng phần mềm. Theo cách tiếp cận thống kê, có cấu trúc với QA sẽ giúp bạn có thêm nhiều kiến thức về sản phẩm mà bạn đang test, đặt các câu hỏi mà bạn có thể không nghĩ đến, nhiều quan điểm nhất có thể về valid, invalid cho mỗi chức năng, để giúp bạn tự tin trở thành chủ sở hữu thực sự về chất lượng của phần mềm.


Vai trò của tester đang phát triển cùng với sự thay đổi trong công nghệ công nghiệp ngày nay và đang dần chuyển sang một phương thức mới theo mô hình Agile. Quá trình chuyển đổi này đang mở ra những cơ hội chưa được khám phá, thú vị và cũng đầy cơ hội thách thức cho tất cả những tester khắp mọi nơi trên thế giới. Chúng ta hãy xem những thay đổi có ý nghĩa gì đối với nghề của người tester thông qua ống kính trải nghiệm cá nhân của tôi.


# Cách cũ: Chỉ tập trung vào tìm bug

Trong những năm đầu tiên của tôi với tư cách là một tester có những tư duy ít về tư duy, quan điểm phê phán. Vào mỗi buổi sáng team test của chúng tôi được cung cấp một danh sách các ứng dụng để review. Tài nguyên được assign sẽ được cài đặt trên những ứng dụng đó và chúng tôi những người tester sẽ cố gắng để chia nhỏ các chức năng đó, test từng phần nhỏ đầu tiên.

Việc để đánh giá hiệu suất của chúng tôi là rất đơn giản: Chúng tôi ai càng tìm được nhiều lỗi hơn, thì người đó càng được đánh giá cao hơn! Không có ý nghĩ, không có chiến lược, cũng không có động lực. Trong những giờ nghỉ giải lao của chúng tôi là những thảo luận chữa đầy các lỗi mà mỗi người trong số chúng tôi tìm thấy, thay vào việc nghĩ về chất lượng của những lỗi đó.


Điều đó khiến tôi suy nghĩ. Chúng tôi đã thêm những giá trị gì? Chúng ta có nên nghĩ việc test chỉ là để tìm lỗi hay không? Tôi đã có quá nhiều những câu hỏi mà không có câu trả lời.


# Phát triển Quy trình QA

Công việc tiếp theo của tôi là thay đổi cách nghĩ. Là một phần của test một chức năng, team QA cũng nên debug, phân tích theo phương pháp ngăn xếp và cung câp nguyên nhân gốc rễ của vấn đề cho đội Develop. Đó là việc làm mới để tất cả mọi người hãy cùng cộng tác với nhau như một nhóm mà không phân biệt QA team hay Develop team, cùng hướng tới một mục tiêu chung là đảm bảo chất lượng của phần mềm.


Dưới cương vị là một Develop tôi nhận ra rằng một người thử nghiệm không phải là một cá nhân đơn thuần cố gắng chia nhỏ các chức năng, tạo ra nhiều quan điểm test khác nhau, mà còn là một người trong một nhóm tập thể đóng góp cho nỗ lực tổng thể. Khi tester xoay vòng công việc test qua mình trong cùng một bộ testcase, chúng tôi ưu tiên cải tiến liên tục tính tự động hóa và kiến thức chuyên sâu về từng thành phần. Tôi đã phát triển một quan điểm hoàn toàn khác về QA và có sự tôn trọng mới về giá trị gia tăng mà vai trò của tester mang lại.

Ở vị trí tiếp theo của tôi, khi tôi bắt đầu, tôi đã ngay lập tức kết hợp với một kiến trúc sư QA. Tôi không biết rằng cố vấn này sẽ có một tác động sâu sắc và lâu dài đối với tôi. Tôi nhận ra tầm quan trọng của việc tuân theo một cách tiếp cận có cấu trúc hơn đối với QA. Với sự giúp đỡ của kiến trúc sư QA, tôi đã mài giũa và hoàn thiện bốn chiến lược hướng tới quy trình QA được cải thiện.


# 1. Xem xét tài liệu thiết kế và kiến trúc

Khi chúng ta có được càng nhiều kiến thức về sản phẩm cái mà chúng ta đang làm khi đó chúng ta sẽ có những ý tưởng tốt hơn, cũng như việc kiểm thử càng trở nên tốt hơn. Nếu có design sẵn, tài liệu là luôn sẵn sàng, hay cho QA đọc chúng. Bạn sẽ ngạc nhiên khi nhận ra rằng bạn sẽ càng hiểu rõ hơn về kiến trúc của sản phẩm, về các thành phần tích hợp và những luống dữ liệu hơn là lúc mà bạn kiểm thử một mình hay tìm hiểu về hệ thống một mình. Tôi nghiệm ra một điều rằng, khi chúng ta test bất cứ sản phẩm nào, việc chúng ta ghi chép lại những vấn đề đó song song với việc vẽ mô hình thì bạn sẽ hiểu về hệ thống nhanh hơn, lâu hơn và hiểu rõ hơn về cách mà hệ thống tương tác.

# 2. Những defects trong quá khứ cần được nghiên cứu

Quá khứ thông báo hiện tại. Điều quan trọng là phải biết các khu vực nguy hiểm và chức năng nhạy cảm nhất có thể phá hỏng ứng dụng của bạn với mọi thay đổi. Loại dữ liệu đó có thể đến từ lịch sử của defects.


Tiến hành một số nghiên cứu trên công cụ quản lý lỗi của dự án và phân tích những lỗi trong quá khứ đã được báo cáo trước đó. Bất kỳ bug nào trong quá khứ mà bạn có thể dự đoán được để phân tích ra nguyên nhân gây ra bug và những vùng ảnh hưởng đến nó sẽ giúp bạn phát triển thêm tư duy về tính tự động xung quanh các vùng đó. Nếu có lỗi nào đó được báo cáo từ khách hàng, hãy cũng tiến hành phân tích chúng một cách tích cực. Hãy coi nó là những bài tập để giúp bạn có thể đưa ra các quyết định về chiến lược cho những nhánh release khác nhau hay là thậm chí trong các dự án khác của bạn mà bạn có thể áp dụng.

# 3. Phân loại lỗi

QA tìm thấy một vấn đề, vì vậy bạn báo cáo nó. Nhưng công việc của bạn đang làm chưa hoàn thành — bạn có thể đi xa hơn bằng cách hỏi thêm một số câu hỏi quan trọng. Bạn có thể làm gì khác không? Bạn có biết tại sao vấn đề này xảy ra không, nguyên nhân gây ra vấn đề và commit nào có thể là vấn đề?


Đây không chỉ là công việc của Development. Bạn có quyền truy cập vào file log, các cam kết và code, vì vậy bạn có thể thực hiện một số thao tác để giúp giải quyết các vấn đề. Tùy thuộc vào kỹ thuật của bạn, bạn có thể đi sâu như bạn muốn. Nhưng trên một mức độ cao, hãy nhìn vào các ngoại lệ trong log. Nó là một ngoại lệ con trỏ null? Điều đó có liên quan đến dữ liệu cụ thể hay một số chuỗi các bước không?

Thu hẹp vấn đề và bắt đầu cuộc trò chuyện với Developer. Họ sẽ đánh giá cao thông tin và nghiên cứu chi tiết.

# 4. Vượt ra ngoài vấn đề được báo cáo.

Không chỉ tập trung vào chức năng thử nghiệm. Hãy nghĩ về tương tác ngược lại và giao diện người dùng của ứng dụng của bạn.

Ví dụ, khi bạn kiểm tra theo dõi các bản ghi, ứng dụng có thể hoạt động như mong đợi nhưng với một số lỗi xảy ra tiềm ẩn ở phía sau. Các bản ghi có đủ chi tiết không? Các trường hợp ngoại lệ có được xử lý không? Đối với tương tác của trình duyệt, hãy mở công cụ nhà phát triển trong trình duyệt của bạn và theo dõi thành phần mạng. Phản hồi có mất nhiều thời gian hơn bình thường không? Có bất kỳ yêu cầu nào không cần thiết khi truy cập một số phần của ứng dụng của bạn không?

Tất cả những câu hỏi này cho phép người thử nghiệm vượt lên trên và vượt ra ngoài những gì họ được “chỉ định” để kiểm tra. Họ cũng khuyến khích các cuộc thảo luận với chủ sở hữu sản phẩm và nhà phát triển, những người có thể không nghĩ về một số trường hợp này.

Điều quan trọng là phải có một tư duy nhanh nhẹn khi tìm kiếm khoảng trống sản phẩm và các giải pháp để lấp đầy chúng. Một bài học quan trọng trong thử nghiệm đang được chủ động thay vì phản ứng. Các lỗi mà bạn phát hiện ra có thể là vấn đề hoặc câu chuyện kỹ thuật, nhưng bằng cách có câu trả lời đó, bạn đã ngăn chặn các lỗi có thể đã không được chú ý hoặc xuất hiện dưới dạng các vấn đề nghiêm trọng hơn sau này.


# Sở hữu chất lượng của sản phẩm

Là người kiểm thử phần mềm không chỉ là tìm lỗi và cố gắng tìm cách phá vỡ ứng dụng. Mà cần có thêm vấn đề về cải tiến liên tục, xác định một chiến lược kiểm tra rõ ràng, và mở rộng để cải t quan điểm test để cải thiện chất lượng. Theo cách tiếp cận thống nhất, có cấu trúc đối với QA sẽ giúp bạn có thêm kiến thức về sản phẩm bạn đang thử nghiệm, đặt câu hỏi mà bạn có thể không nghĩ đến để trở thành chủ sở hữu thực sự về chất lượng.