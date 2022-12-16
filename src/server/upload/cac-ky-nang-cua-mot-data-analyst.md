# Lời mở đầu
Nghề phân tích dữ liệu luôn phải làm các công việc khác nhau liên quan đến dữ liệu, tùy mức độ của dữ liệu ( tính đa dạng, sự thiếu sót, đặc điểm, tính phân bố, số lượng, ... ) mà việc phân tích có thể kéo dài 1 tiếng, hàng tiếng hoặc cả tháng. Thời gian phân tích cũng phụ thuộc rất nhiều vào kỹ năng, từ kỹ thuật tới kỹ năng mềm ( giao tiếp ). Vì vậy, trong bài viết này tôi sẽ nhắc tới top 5 kỹ năng trong 18 kỹ năng của một chuyên gia phân tích dữ liệu ( https://www.indeed.com/career-advice/resumes-cover-letters/skills-for-data-analyst ).

Bài viết này hướng tới độc giả muốn trở thành nhà phân tích dữ liệu hoặc những người có hứng thú với phân tích dữ liệu như tôi chẳng hạn nên hôm nay tôi dịch lại bài này cho các bạn độc giả xem. Ok vào công "chiện" thôi.

# SQL
Như các bạn biết thì công việc phân tích dữ liệu là thao tác, sửa chữa, thêm thắt, tính toán, ... với dữ liệu. Mà dữ liệu lấy ở đâu, không nhắc tới việc crawl dữ liệu mà chỉ đề cập việc mình có dữ liệu thì đơn giản nó nằm trong cơ sở dữ liệu. Nếu xét nhiều năm trước, chúng ta chỉ có thuật ngữ cơ bản database thì với thời điểm đại thông tin, dữ liệu bùng nổ thì ta có thêm thuật ngữ data lake, data warehouse, ... 

Vì vậy không ngạc nhiên mà SQL trở thành kỹ năng quạn trọng nhất của một nhà phân tích dữ liệu. Tùy nhu cầu mà một câu lệnh SQL có thể đơn giản như xuất báo cáo mà cũng có thể phức tạp như kết nối với tác vụ khác như xử lý dữ liệu của các thuật toán học máy.

Đây là mộ vài thứ cần biết khi bạn dùng SQL:
- Joining, Aggregating, Filtering dữ liệu từ bảng của database
- Xuất kết quả giống dạng CSV
- Design lại báo cáo cho đẹp mắt tùy theo nhu cầu như Tableau, Looker, ...
- Tạo kết nối tĩnh hoặc động ( 1 requests hoặc nhiều requests hoặc requests mang tính liên tục tùy theo nhu cầu )

Tóm lại, SQL là một công cụ mạnh mẽ được nhiều người cũng như các công ty sử dụng để giao tiếp với dữ liệu, phân tích dữ liệu tùy theo tính chất của công việc.

# Spreadsheets
Tuy SQL dùng nhiều đấy nhưng query để tính toán thì lại phức tạp và kết quả xuất ra của SQL cũng không được đẹp cho lắm nên đôi lúc chúng ta có thể chuyển đổi ra file excel.

Tuy việc dùng excel không phải là kỹ năng thiên về kỹ thuật máy tính, nhưng lại là một kỹ năng mềm được dùng thường xuyên trong cuộc sống ( kế toán, tài chính, ... ). Có 2 dạng excel được dùng nhiều là Google Sheets và Microsoft Excel. Tôi thì thích dùng Google Sheets hơn bởi vì tính năng "hợp tác trực tuyến".

Một số tác dụng khi dùng "bảng tính":
- Dễ dàng visualize dữ liệu
- Dễ dàng chia sẻ dữ liệu
- Đánh dấu (highlight ) dữ liệu để tiện so sánh
- Xếp hạng dữ liệu
- Nhóm các dữ liệu cùng điều kiện
- Sử dụng các công thức mà "bảng tính" cung cấp cũng như tự tạo công thức dành cho dữ liệu chuyên biệt
- Format theo thiết lập điều kiện dữ liệu

Đối với khách hàng có hiểu biết ít về công nghệ thì excel là dạng file thông dụng, hiệu quả cao mà người nhìn một phát là hiểu ngay nên đây cũng là một kỹ năng cần thiết của một nhà phân tích dữ liệu

# Critical Thinking
Kỹ năng này thì không chỉ có mỗi phân tích dữ liệu cần dùng, nó còn được dùng trong nhiều ngành nghề khác nữa. Rất khó để đưa ra một ví dụ cụ thể của "suy nghĩ trọng tâm" trong việc phân tích dữ liệu bởi vì mỗi yêu cầu của khách hàng và mục tiêu của công ty khác nhau. Ở đây tôi sẽ đưa ra vài kịch bản đơn giản:
- Khi tạo dashboard ( giao diện hiển thị dữ liệu trực quan hóa ý ) thì cần nhóm dữ liệu theo thời gian. Cái này khách  hàng rất hay yêu cầu vì muốn xem dữ liệu thay đổi theo thời gian, tiêu biểu dữ liệu dạng time series.
- Lưu ý dữ liệu có bị thiếu trường nào không, dựa trên nhu cầu sẽ phát sinh thêm việc fill missing hoặc ignore missing.
- Khi làm việc với khách hàng cần đưa ra các câu hỏi trọng tâm để mình có thể hiểu yêu cầu một cách đúng nhất.

Việc hướng dẫn từng bước "suy nghĩ trọng tâm" là rất khó bởi tùy theo nhu cầu của công việc, khách hàng, thể loại của dữ liệu mà sẽ có cách query khác nhau. Việc này cần thời gian dài tích lũy kinh nghiệm.

# Statistical Programming Languages
Kỹ năng này liên quan tới 2 ngôn ngữ R và Python, cũng như SAS ( https://www.analyticsvidhya.com/blog/2017/09/sas-vs-vs-python-tool-learn/ ). Nói chung đây là các công cụ mạnh mẽ hỗ trợ phân tích dữ liệu. 
- SAS là một phần mềm cung cấp người dùng các hàm thống kê, hiển thị dữ liệu
- Python là ngôn ngữ lập trình bậc cao, có nhiều thư viện tính toán thống kê cũng như visualize dữ liệu như pandas, numpy, scipy, matplotlib, ...
- R cũng là một ngôn ngữ lập trình dành cho phân tích dữ liệu ( ngôn ngữ này tôi chưa học nên cũng chả chém đc, các bạn có thể thử tìm hiểu qua bác google ).

Việc học các công cụ này là điều bắt buộc khi làm ngành phân tích dữ liệu cũng như cho A/B testing, có thể chọn 1 trong 3 công cụ, không cần thiết phải học hết.

Các lợi ích khi sử dụng ngôn ngữ lập trình:
- Cung cấp các hàm tính toán, thống kê
- Cung cấp thư viện hỗ trợ việc giao tiếp với dữ liệu ( vẽ bảng, hiển thị trực quan hóa, ... )
- Thí nghiệm và kiểm tra mà không ảnh hưởng tới dữ liệu
- A/B testing cho việc so sánh sản phẩm
- Quan sát được các thay đổi bất thường của dữ liệu ( Outlier analysis )
- Phân phối, đánh giá chất lượng dữ liệu
- Phân tích hồi quy, đánh giá mối quan hệ giữa các biến phụ thuộc. Ví dụ: giá nhà với diện tích, ...
- Xếp hạng tính quan trọng của từng tập dữ liệu ( Feature/data importance )

Ngôn ngữ lập trình ứng dụng rất nhiều và hiệu quả trong công việc phân tích dữ liệu. Tất nhiên ngoài phân tích dữ liệu, kỹ năng này cũng được sử dụng trong nhiều ngành nghề khác nữa. Các bạn ứng viên muốn ứng tuyển các công ty công nghệ thì bắt buộc phải học rồi :)

# Data Visualization
Skill này là tập hợp của các skill kể trên, bởi vì khi làm việc với khách hàng, các yêu cầu luôn bắt đầu với việc nhận dữ liệu và kết thúc bằng việc hiển thị dữ liệu.

Có nhiều cách hiển thị dữ liệu, cơ bản nhất là xuất ra file CSV, muốn giao diện đẹp hơn thì có Tableau, Looker hoặc sử dụng ngôn ngữ lập trình để hiển thị dữ liệu như Pyjthon.

Các lợi ích của kỹ năng này:
-  Hiển thị trực quan hóa dữ liệu
-  Chia sẻ dữ liệu hoặc kết quả dễ dàng
-  So sánh dữ liệu
-  Có thể nhét hết dữ liệu trong biểu đồ hiển thị qua dashboard mà không cần lướt, cuộn, di chuyển qua khu vực khác ( nói chung là dễ dàng quan sát )

Hiển thị dữ liệu là một kỹ năng quan trọng của một nhà phân tích dữ liệu, là cách show kết quả rõ ràng nhất cho khách hàng đánh giá và quan sát.

# Tổng kết
Tuy 5 kỹ năng này rất quan trọng nhưng cũng có nhiều kỹ năng quan trọng không kém mà tôi chưa đề cập tới trong bài viết này. Như kỹ năng mềm giao tiếp, thuyết trình, quản lý dự án cũng rất cần thiết trong phân tích dữ liệu.

À mà nếu bạn là một nhà phân tích dữ liệu có kiến thức về học máy cũng có khả năng trở thành một nhà khoa học dữ liệu ( data scientist ).

Well, rất cám ơn các bạn đã xem bài viết này.

# References
https://towardsdatascience.com/top-data-analyst-skills-8ec0678475fe

https://www.analyticsvidhya.com/blog/2017/09/sas-vs-vs-python-tool-learn/

https://www.indeed.com/career-advice/resumes-cover-letters/skills-for-data-analyst