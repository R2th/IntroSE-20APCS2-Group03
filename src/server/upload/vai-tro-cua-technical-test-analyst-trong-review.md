Các bạn có biết tại sao chuẩn bị review là quan trọng cho Technical Test Analyst không? Đó là bởi vì Technical Test Analysts phải là những người tham gia review tích cực trong quy trình review, họ cung cấp các xem xét theo khía cạnh riêng theo chuyên môn của họ. Họ cũng nên được đào tạo để hiểu rõ hơn vai trò tương ứng của mình trong bất kỳ quy trình review kỹ thuật nào. Tất cả các người tham gia đánh giá phải cam kết các lợi ích của một review kỹ thuật được tiến hành tốt. Để có mô tả đầy đủ các đánh giá kỹ thuật bao gồm nhiều các danh sách review. Technical Test Analyst thường tham gia trong các review kỹ thuật và điều tra nơi mà họ mang những quan điểm kiểm tra về hoạt động hay hành vi mà có thể bị bỏ lỡ bởi các lập trình viên.

Hơn nữa, Technical Test Analyst đóng vai trò quan trọng trong việc định nghĩa, áp dụng và duy trì các danh sách review và thông tin về mức độ nghiêm trọng của lỗi. Tương ứng với các kiểu review mà sẽ được tạo, Technical Test Analyst phải được cho phép đủ thời gian chuẩn bị. Điều này bao gồm thời gian để review sản phẩm công việc, thời gian để kiểm tra các tài liệu được chứng thực chéo để xác định tính nhất quán, và thời gian để xác định cái có thể bị bỏ qua từ sản phẩm công việc. Nếu không có thời gian chuẩn bị đầy đủ, review có thể trở thành việc chỉnh sửa hơn là review. Một review tốt bao gồm việc hiểu cái được viết, xách định cái bị bỏ qua và xác thực rằng sản phẩm được miêu tả là thống nhất với các sản phẩm khác đã phát triển hoặc đang phát triển. 

Ví dụ khi review một kế hoạch kiểm thử mức tích hợp, Technical Test Analyst cũng phải xem xét các danh sách mà đang được tích hợp. Chúng có sẵn sàng cho tích hợp không? Có các phụ thuộc nào mà cần phải được ghi lại ? Có dữ liệu để kiểm tra điểm tích hợp hay không ? Một review không bị cô lập với các sản phẩm công việc đang được review. Nó cũng phải được cân nhắc như việc tương tác của các mục với các mục khác của hệ thống. Technical Test Analyst nên đảm bảo việc tiếp cận bất kỳ các nhận xét review từ quan điểm kiểm thử của các người làm việc cùng với tác giả để tạo ra một sản phẩm tốt nhất có thể. Bằng việc sử dụng tiếp cận này, các nhận xét sẽ được diễn đạt một các có cấu trúc và sẽ luôn được hướng tới sản phẩm công việc chứ không phải là tác giả. 

Ví dụ, Nếu một câu nào đó khó hiểu, sẽ tốt hơn để nói : "tôi không hiểu cái tôi nên kiểm thử để xác thực yêu cầu này có được thực hiện đúng hay không. Bạn có thể giúp tôi hiểu nó ? " hơn là "Yêu cầu này rất là mơ hồ và không ai có thể hiểu được"

Công việc của Technical Test Analyst trong review là để đảm bảo rằng thông tin cung cấp trong sản phẩm công việc sẽ là đầy đủ để hỗ trợ effort kiểm thử. Nếu thông tin không có hoặc không rõ ràng, thì đây có thể là một lỗi cần được chỉnh sửa bởi tác giả. Các nhận xét sẽ được nhận tốt hơn và các cuộc họp sẽ có hiệu quả hơn.

# 1. Sử dụng Checklists trong Review

Checklist thường được sử dụng trong suốt quá trình review để nhắc nhở những người tham gia xác thực các điểm đặc biệt trong suốt quá trình review. Ví dụ như các checklist giống nhau mà chúng ta có thế sử dụng cho mọi review và chúng tôi không chỉ nhắm tới sản phẩm công việc của bạn. Các checklist có thể dùng chung và được sử dụng cho tất cả review hoặc tập trung trên các đặc trưng hoặc khu vực yêu cầu chất lượng đặc biệt. 

Ví dụ Một checklist dùng chung có thể xác định việc sử dụng đúng các thuật ngữ "phải" và "nên", xác định đúng định dạng và mục phù hợp tương tự. Một checklist được nhắm mục tiêu có thể tập trung vào các vấn đề về bảo mật hoặc các vấn đề về hiệu năng.

Checklist hữu ích nhất là những cái được phát triển bởi một tổ chức riêng bởi vì chúng phản ánh:
* Bản chất tự nhiên của sản phẩm
* Môi trường phát triển địa phương

        * Nhân viên
        * Công cụ
        * Độ ưu tiên

* Lịch sử của các thành công và các lỗi trước đó
* Các vấn đề cụ thể ( như là hiệu suất, bảo mật..)
Checklist nên được tùy chỉnh cho phù hợp với tổ chức và cho dự án cụ thể. Một số tổ chức mở rộng khái niệm của một checklist phần mềm bao gồm "anti-patterns" cái mà tham chiếu tới các lỗi thông thường, các kỹ thuật kém, và các phương pháp không hiểu quả khác. Thuật ngữ này xuất phát từ một khái niệm rất phổ biến của "design patterns" cái mà là các giải pháp có khả năng sử dụng lại cho các vấn đề thường gặp mà được chứng minh là có hiệu quả trong các tình huống thực tế. Một anti-pattern thường tạo lỗi , và được thực hiện như một phương pháp cắt giảm nhanh. Nó quan trọng để ghi nhớ rằng nếu một yêu cầu không thể kiểm thử có nghĩa rằng nó không được định nghĩa như một cách mà Technical Test Analyst có thể xác định các kiểm thử nó như thế nào sau đó nó chính là một lỗi.
Ví dụ: một yêu cầu nêu rõ "Phần mềm phải nhanh" không thể được kiểm thử. Technical Test Analyst phải xác định phần mềm nhanh là như thế nào ? Thay vào đó nếu yêu cầu nói "Phần mềm phải cung cấp thời gian đáp ứng tối đa là ba giây trong điều kiện tải cụ thể " sau đó khả năng kiểm thử của yêu cầu này đã được cải thiện hơn, Nếu chúng ta định nghĩa " Điều kiện tải cụ thể "  (ví dụ như số lượng người dùng đồng thời, các hoạt động được thực hiện bởi người dùng) . Nó cũng là một yêu cầu tổng quan bởi vì đây là một yêu cầu có thể dễ dàng sinh ra nhiều trường hợp kiểm thử riêng trong một ứng dụng. Theo dấu từ yêu cầu này tới các trường hợp kiểm thử cũng có thể là quan trọng bởi vì nếu yêu cầu thay đổi thì tất cả các trường hợp kiểm thử sẽ cần được review và được cập nhật nếu cần thiết.

## 1.1 Review kiến trúc

Kiến trúc phần mềm bao gồm tổ chức cơ bản của một hệ thống, được thể hiện trong các thành phần, mối quan hệ giữa các thành phần với nhau và môi trường, và các nguyên tắc chi phối thiết kế và sự thay đổi. [ANSI/IEEE Std 1471-2000] Ví dụ Checklist được sử dụng cho review kiến trúc có thể bao gồm việc xác định việc thực hiện thích hợp của các mục dưới đây:
* Kết nối tổng hợp - làm giảm thời gian thực hiện liên quan đến việc thiết lập kết nối cơ sở dữ liệu bằng cách thiết lập một nhóm kết nối được chia sẻ.
* Cân bằng tải - mở rộng khả năng tải đồng đều giữa một tập hợp các tài nguyên.
* Quy trình phân tán
* Caching - sử dụng một bản sao dữ liệu cục bộ để giảm thời gian truy cập
* Lazy instantiation
* Giao dịch đồng thời
* Cô lập quy trình giữa Quy trình giao dịch trực tuyến (OLTP) và Quy trình phân tích trực tuyến (OLAP) 
* Sao chép dữ liệu

## 1.2 Review mã nguồn

Checklist cho review mã nguồn phải chi tiết cùng với checklist cho review kiến trúc và hữu ích nhất khi hai review này là cùng ngôn ngữ, dự án và công ty cụ thể. Bao gồm anti-pattern mức độ mã nguồn là hữu ích, đặc biệt cho các lập trình viên có ít kinh nghiệm. 
Checklist được sử dụng cho review mã nguồn có thể bao gồm sáu mục dưới đây: 

**1.2.1  Cấu trúc**

* Mã nguồn có thực hiện hoàn thành và chính xác theo thiết kế không?
* Mã nguồn có phù hợp với bất kỳ tiêu chuẩn  nào không?
* Mã nguồn có được cấu trúc tốt, nhất quán về phong cách và được định dạng nhất quán không?
* Có bất kỳ thủ tục không cần thiết hoặc không được gọi hoặc bất kỳ mã nguồn không thể truy cập không?
* Có bất kỳ stub còn lại nào hoặc các thủ tục kiểm tra trong mã nguồn không?
* Có thể thay thế bất kỳ mã nguồn nào bằng cách gọi đến các thành phần hoặc chức năng thư viện có thể tái sử dụng bên ngoài không?
* Có bất kỳ khối mã nguồn lặp lại nào có thể được coi như một quy trình đơn lẻ không?
* Việc sử dụng bộ nhớ có hiệu quả không?
* Có các biểu tượng được sử dụng thay vì hằng số ảo hoặc hằng xâu kí tự không?
* Có bất kỳ mô-đun nào quá phức tạp và phải được cấu trúc lại hoặc chia thành nhiều mô-đun không?

**1.2.2 Văn bản**

* Mã nguồn có được ghi lại một cách rõ ràng và đầy đủ với kiểu nhận xét dễ để bảo trì không?
* Tất cả các nhận xét thống nhất với mã nguồn không?
* Văn bản có phù hợp với các tiêu chuẩn mà có thể áp dụng không?

**1.2.3 Các biến**

* Tất cả các biến có được đặt tên đúng có ý nghĩa, nhất quán và rõ ràng không?
* Có bất kỳ các biến dư thừa hoặc không sử dụng nào không?
 
**1.2.4 Các phép tính toán**

* Mã nguồn có tránh việc so sánh số dấu phẩy động bằng nhau không? 
* Hệ thống mã nguồn có ngăn ngừa lỗi làm tròn không?
* Mã nguồn tránh việc cộng và trừ trên các số với độ lớn khác nhau?
* Các ước số được kiểm tra giá trị không hoặc nhiễu không ?

**1.2.5 Các vòng lập và rẽ nhánh**

* Tấ cả các vòng lập, rẽ nhánh và các cấu trúc logic hoàn chỉnh, chính xác và được lồng nhau đúng không?
* Tất cả các trường hợp thông thường được kiểm tra đầu tiên trong dãy IF - ELSEIF không?
* Tất cả các trường hợp đã bao phủ trong một vòng lặp IF - ELSEIF hoặc CASE bao gồm các mệnh đề ELSE hoặc DEFAULT ?
* Mọi câu lệnh trường hợp có giá trị mặc định không?
* Các điều kiện kết thúc vòng lặp có rõ ràng và không thay đổi không?
* Các chỉ số hoặc chỉ số có được khởi tạo đúng cách và ngay trước vòng lặp khồng?
* Có bất kỳ câu lệnh nào mà nằm trong  vòng lặp có thể thay thế ở bên ngoài vòng lặp không?
* Mã nguồn trong vòng lặp có tránh thao tác biến chỉ mục hoặc sử dụng nó khi thoát khỏi vòng lặp không?

**1.2.6 Chương trình bảo vệ**

* Các chỉ mục, con trỏ và các kịch bản con có được kiểm tra dựa trên mảng, bản ghi hoặc các giới hạn tệp không?
* Các dữ liệu được nhập vào bằng tệp và các đối số đầu vào có được kiểm tra tính hợp lệ và đầy đủ không?
* Tất cả các biến đầu ra có được gán không?
* Các thành phần dữ liệu có hoạt động chính xác trên mỗi câu lệnh không?
* Phân bổ bổ nhớ có được release không?
* Thời gian timeout hoặc các bẫy lỗi được sử dụng cho việc truy cập từ các thiết bị bên ngoài không?
* Các tệp có được kiểm tra tồn tại trước khi cố gắng truy cập không?
* Tất cả các tệp và thiết bị có ở trạng thái chấm dứt khi ở cuối chương trình không?

Để biết thêm các ví dụ về checklist được sử dụng cho review mã nguồn ở các mức độ kiểm thử khác nhau các bạn có thể tham khảo thêm ở [Web-6]

Ở trên tôi đã giới thiệu cho các bạn về vai trò của Technical Test Analyst trong review. Hy vọng qua bài viết này sẽ giúp ích phần nào trong công việc của các bạn.

Tài liệu tham khảo: *Advanced sysllabus 2012 technical test analyst*