# MỤC TIÊU
* Tìm hiểu các kỹ thuật để nắm bắt các chức năng của hệ thống một cách hiệu quả và mang lại kết quả tối ưu.
* Tìm hiểu các kỹ thuật để nắm bắt hoạt động của người dùng mong muốn một cách hiệu quả và mang lại kết quả tối ưu.
* Tìm hiểu các kỹ thuật để nắm bắt kiến trúc logic và vật lý của hệ thống một cách hiệu quả và mang lại kết quả tối ưu.

# TỔNG QUAN
Mặc dù việc đánh giá hệ thống là một quá trình liên tục trong suốt kì kiểm thử hiệu suất, nhưng nó sẽ mang lại kết quả tốt hơn khi được thực hiện sớm trong một dự án kiểm thử. Mục đích của việc đánh giá hệ thống là thu thập thông tin về dự án cũng như toàn bộ,  các chức năng của hệ thống, các hoạt động người dùng mong muốn, kiến trúc hệ thống và bất kỳ chi tiết nào khác hữu ích trong việc chỉ dẫn kiểm thử hiệu suất để đạt được các nhu cầu cụ thể của dự án. Các thông tin này cung cấp nền tảng để thu thập các mục tiêu và yêu cầu về hiệu suất,  mô tả khối lượng công việc, tạo ra các chiến lược và kế hoạch kiểm thử hiệu suất, và đánh giá các rủi ro của dự án và hệ thống.

Một sự hiểu biết thấu đáo về hệ thống đang được kiểm thử là rất quan trọng đối với một kiểm thử hiệu suất thành công. Các phép đo lường được thu gom lại trong suốt các giai đoạn sau này chỉ mang tính chính xác như các mô hình đã được phát triển và xác nhận trong giai đoạn này. Việc đánh giá cung cấp một nền tảng để xác định hiệu suất có thể chấp nhận được; chỉ định các yêu cầu về hiệu suất của phần mềm, hệ thống hoặc các thành phần; và xác định bất kì rủi ro nào đến hiệu năng ngay cả trước khi kiểm thử bắt đầu.

# CÁCH SỬ DỤNG CHƯƠNG NÀY
Sử dụng chương này để tìm hiểu cách đánh giá các hệ thống cho một kiểm thử hiệu suất. Chương này hướng dẫn bạn đi qua các hoạt động chính liên quan đến đánh giá hệ thống. Để khai thác tối đa chương này:
- Sử dụng phần “Phương pháp tiếp cận để đánh giá hệ thống” để biết tổng quan về các hoạt động được bao gồm trong đánh giá hệ thống và hướng dẫn tham khảo nhanh cho bạn và nhóm của bạn.
- Sử dụng các phần còn lại của chương để hiểu chi tiết và các giải thích quan trọng về đánh giá hệ thống.

# PHƯƠNG PHÁP ĐÁNH GIÁ HỆ THỐNG
* Đánh giá hệ thông bao gồm các hoạt động sau (bao gồm nhưng không giới hạn số hoạt động):
* Xác định chức năng hướng đến đối tượng là người dùng của hệ thống.
* Xác định các quy trình và chức năng không do người dùng khởi tạo (batch).
* Xác định hoạt động của người dùng mong đợi.
* Phát triển hiểu biết hợp lý về hoạt động của người dùng tiềm năng ngoài những gì được mong đợi.
* Phát triển một mô hình chính xác của cả kiến trúc thử nghiệm và sản xuất.
* Xây dựng một mô hình hợp lý của môi trường người dùng thực tế.
* Xác định bất kỳ quy trình / hệ thống nào khác sử dụng kiến trúc.

Các hoạt động này có thể được thực hiện bằng cách làm theo các bước sau:
* Nắm bắt các chức năng của hệ thống và / hoặc các quy trình kinh doanh.
* Nắm bắt các hoạt động của người dùng.
* Nắm bắt kiến trúc logic và vật lý.

Các bước này được giải thích chi tiết trong các phần sau.
# NẮM BẮT CÁC CHỨC NĂNG CỦA HỆ THỐNG VÀ QUY TRÌNH KINH DOANH
Trong bước này, bạn xác định các chức năng cốt lõi của hệ thống để xây dựng nên tiêu chí hiệu suất có thể chấp nhận. Sau đó, các mô hình tải có thể được đánh giá để xác định đồng thời cả tiêu chuẩn có thể chấp nhận và các chức năng của hệ thống.

Để thực hiện kiểm thử hiệu suất, cần xác định các chức năng cốt lõi của hệ thống đang được kiểm tra. Điều này cho phép bạn xác định các tiêu chí hiệu suất có thể chấp nhận suất ban đầu, cũng như các mô hình cộng đồng người dùng để đánh giá sự thành công của ứng dụng trong việc đáp ứng các tiêu chí chấp nhận này.

Để đảm bảo rằng tất cả các chức năng của hệ thống đều được nắm bắt, hãy bắt đầu bằng cách họp với các bên liên quan để xác định mục đích tổng thể của hệ thống hoặc ứng dụng. Trước khi bạn có thể xác định làm thế nào để kiểm tra một hệ thống một cách tốt nhất , bạn phải hoàn toàn hiểu được mục đích của hệ thống. Trường hợp thường xuyên xảy ra là các tài liệu của dự án không thể hiện rõ ràng các chức năng của dự án bằng tầm nhìn của các bên liên quan.  Đây là lý do tại sao bạn nên bắt đầu với các bên liên quan trước khi chuyển sang đánh giá tài liệu.

Các nguồn có giá trị để xác định chức năng hệ thống bao gồm:
- Phỏng vấn các bên liên quan
- Hợp đồng
- Thông tin về cách sử dụng các ứng dụng tương tự
- Kỳ vọng của khách hàng
- Trải nghiệm của riêng bạn với các ứng dụng tương tự
- Tài liệu thiết kế
- Biểu đồ chuyển trạng thái
- Yêu cầu và trường hợp sử dụng
- Tài liệu tiếp thị
- Kế hoạch dự án
- Vòng đời kinh doanh
- Các quy trình kinh doanh chính

**XEM XÉT**

Cân nhắc các điểm chính sau đây trong quá trình nắm bắt các chức năng hệ thống và / hoặc quy trình kinh doanh:
- Gặp gỡ các bên liên quan để xác định mục đích tổng thể của hệ thống.
- Hãy nhớ rằng các hợp đồng và tài liệu có thể đi chệch khỏi quan điểm của các bên liên quan về hệ thống. Các chức năng của hệ thống có thể là do người dùng khởi tạo, được lên lịch (batch), hoặc các tiến trình không liên quan trực tiếp đến hệ thống nhưng vẫn ảnh hưởng đến nó, chẳng hạn như quét virus và sao lưu dữ liệu.
- Hỏi lại, xem xét tài liệu và kế hoạch chứa các chức năng cao cấp một cách thường xuyên. Ví dụ: "cung cấp phương thức đăng nhập an toàn" có nghĩa là phải thực hiện các chức năng như theo dõi phiên, mất mật khẩu, tạo người dùng mới, nhận dạng người dùng, vai trò người dùng và quyền, v.v...

# NẮM BẮT CÁC HOẠT ĐỘNG NGƯỜI DÙNG
Trong bước này, bạn phải xác định các hoạt động của người dùng chính cho ứng dụng đang được kiểm thử. Bởi vì xác đinh này không phải thực tế và hầu như không thể mô phỏng mọi tác vụ hoặc hoạt động của người dùng có thể có trong một bài kiểm thử hiệu suất, bạn cần quyết định hoạt động nào là quan trọng nhất để mô phỏng. Tuy nhiên, trước khi bạn có thể thực hiện việc này, bạn phải xác định những hoạt động có thể có của người dùng.

Nơi đầu tiên để bắt đầu là đánh giá trang web của đối thủ cạnh tranh (hoặc ứng dụng, vì các ứng dụng cạnh tranh có thể không dựa trên web). Có hay không trường hợp đánh giá này được tuyên bố rõ ràng, tại một thời điểm nào đó trong dự án, nó có thể trở nên rất rõ ràng rằng mục đích là để cho phép người dùng của bạn thực hiện tất cả các hoạt động có sẵn từ đối thủ cạnh tranh. Biết trước những hoạt động này sẽ khiến bạn không ngạc nhiên khi chúng xuất hiện trong ứng dụng - cho dù chúng có xuất hiện trong bất kỳ tài liệu nào hay không.

Các nguồn để có thể xác định chức năng hệ thống:

* Thông tin về cách sử dụng các ứng dụng tương tự
* Kỳ vọng của khách hàng
* Trải nghiệm của riêng bạn với các ứng dụng tương tự
* Yêu cầu và trường hợp sử dụng
* Phỏng vấn các bên liên quan
* Tài liệu quảng bá
* Tài liệu trợ giúp và tài liệu cho người dùng
* Biểu đồ tổ chức khách hàng
* Ma trận bảo mật mạng hoặc ứng dụng
* Dữ liệu lịch sử (hóa đơn, nhật ký web, v.v.)
* Chu kỳ kinh doanh chính (tính toán hàng tháng, quy trình cuối năm, lưu trữ 5 năm, v.v 

Một khi bạn đã thu thập danh sách những gì bạn cho là tất cả các hoạt động mà người dùng có thể thực hiện, hãy lưu trữ lại danh sách các họa động này trong nhóm cùng với câu hỏi, "Người dùng khác có thể làm bất kỳ loại nào với ứng dụng này theo hoạt động trong danh sách?"

**XEM XÉT**

Cân nhắc các điểm chính sau đây trong quá trình nắm bắt các chức năng hệ thống và / hoặc quy trình kinh doanh:

* Đánh giá trang web của đối thủ cạnh tranh, vì có khả năng việc bắt kịp với đối thủ cạnh tranh cuối cùng sẽ trở thành mục tiêu của dự án.
* Hãy nhớ đưa tất cả danh mục người dùng vào tài khoản khi bạn thu hút các hoạt động của người dùng tiềm năng. Khách hàng, quản trị viên, nhà cung cấp và đại diện của trung tâm cuộc gọi có khả năng sử dụng và có quyền truy cập vào các khía cạnh rất khác nhau của ứng dụng mà kía cạnh này có thể không dễ dàng tìm thấy trong tài liệu.
* Dành thêm thời gian thu hút các hoạt động ngoại lệ và trường hợp lỗi, thường được ẩn ý hoặc cất giấu trong tài liệu.
* Nếu bạn thấy các hoạt động bị thiếu có vẻ quan trọng với bạn hoặc xuất hiện trong các ứng dụng cạnh tranh, hãy tham khảo ý kiến cùng với các thành viên trong nhóm càng sớm càng tốt. Những điều này có thể cho thấy sự giám sát không chủ ý.

# NẮM KIẾN TRÚC LOGIC VÀ VẬT LÝ
Trong bước này, bạn phải xác định mối quan hệ giữa ứng dụng và cấu trúc của phần cứng và phần mềm. Thông tin này là rất quan trọng khi bạn đang thiết kế các bài kiểm thử hiệu suất để giải quyết những vùng quan tâm cụ thể, và khi bạn đang xác định vị trí của một nút thắt hiệu suất.

Một hiểu biết kém về kiến trúc hệ thống có thể dẫn đến những ảnh hưởng bất lợi cho việc kiểm thử hiệu suất sau này trong dự án và có thể phải cần thêm thời gian vào quá trình điều chỉnh, sửa đổi. Để nắm bắt kiến trúc logic và vật lý, nhân viên kiểm thử phải gặp các bên liên quan về công nghệ, người thiết kế và quản trị viên cho cả môi trường sản xuất và thử nghiệm. Điều này là rất quan trọng bởi vì việc thiết kế một chiến lược thử nghiệm hiệu quả đòi hỏi người kiểm thử hiệu suất phải biết được các thành phần hoặc tầng nào của hệ thống giao tiếp với nhau và cách chúng làm được như vậy. 

Bởi vì thuật ngữ "kiến trúc" được sử dụng theo nhiều cách khác nhau bởi các nhóm khác nhau, nên các phần sau đây đã được đưa vào để làm rõ ràng hơn.

**Kiến Trúc Logic**
Kiến trúc logic, như cách mà nó được sử dụng trong chương này, khi đề cập đến cấu trúc, sự tương tác và tính trừu tượng của phần mềm và / hoặc code. Code đó có thể bao gồm mọi thứ từ các đối tượng, các hàm, và các lớp đến toàn bộ các ứng dụng. Bạn sẽ phải học kiến trúc Code level từ nhóm của bạn. Khi làm như vậy, hãy nhớ tìm hiểu thêm khái niệm về các tầng kiến trúc logic.

Kiến trúc cơ bản nhất cho các ứng dụng dựa trên Web được biết là kiến trúc ba tầng, trong đó các tầng này thường tương ứng với các máy vật lý với các vai trò được định nghĩa như sau:
- Tầng khách hàng (máy của người dùng) – hiển thị những dữ liệu được yêu cầu.
- Tầng trình bày (máy chủ Web) - xử lý tất cả logic nghiệp vụ và phục vụ dữ liệu cho (các) khách hàng.
- Tầng lưu trữ dữ liệu (máy chủ cơ sở dữ liệu) - duy trì dữ liệu được hệ thống sử dụng, thường là trong một cơ sở dữ liệu quan hệ.

![](https://images.viblo.asia/f95ef68b-2fab-4198-913f-5480eab6b0e4.gif)

**Hình 8.1** Kiến Trúc 3 tầng

*To be continued...*

**Nguồn: **https://docs.microsoft.com/en-us/previous-versions/msp-n-p/bb924363(v%3dpandp.10)