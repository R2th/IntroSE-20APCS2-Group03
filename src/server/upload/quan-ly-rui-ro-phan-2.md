Ở phần trước chúng ta đã biết rủi ro là gì, kiểm thử dựa trên rủi ro là như thế nào. Trong phần này chúng ta sẽ tìm hiểu về làm thế nào để kiểm thử dựa trên rủi ro và các vấn đề liên quan đến quản lý kiểm thử.
## I. Kiểm thử dựa trên rủi ro làm như thế nào
Quản lý rủi ro bao gồm ba hoạt động chính sau:
### 1. Xác định rủi ro
Xác định rủi ro chỉ ra cái khác nhau giữa rủi ro về chất lượng và rủ ro về dự án cho dự án
Xác định rủi ro sử dụng các kỹ thuật như là:
* Phỏng vấn chuyên gia
* Đánh giá độc lập
* Sử dụng các mẫu sẵn có của rủi ro
* Các cuộc họp nhìn lại của dự án
* Các cuộc hội thảo và brainstorming về rủi ro 
* Các danh sách về rủi ro
* Gọi lại kinh nghiệm trong quá khứ về rủi ro

### 2. Phân tích rủi ro
Phân tích rủi ro là đánh giá mức độ của rủi ro cho mỗi mục rủi ro được xác định thường được dựa trên khả năng xảy ra và tác động lên hệ thống.

*Các nhân tố bên trong dự án chúng ta có thể cân nhắc như*:
* Độ phức tạp về công nghệ và đội dự án
* Vấn đề về nhân sự và đào tạo
* Sự giao tiếp hay xung đột trong đội dự án hay ngoài đội dự án
* Các vấn để liên quan hợp đồng của các nhà cung cấp hay đầu tư
* Sự phân bố về địa lý của các tổ chức phát triển
* Các thiết kế và công nghệ được thiết lập hoặc kế thừa so với các thiết kế và kỹ thuật mới
* Thiếu chất lượng trong các công cụ và kỹ thuật đã sử dụng
* Người lãnh đạo kỹ thuật hoặc người quản lý kém
* Thời gian, nguồn lực và sức ép quản lý đặc biệt khi áp dụng hình phạt về tại chính
* Thiếu khiểm thử từ lúc ban đầu và các nhiệm vụ đảm bảo chất lượng trong vòng đời phát triển phần mềm
* Tỉ lệ cao trong sự thay đổi về yêu cầu, thiết kế và mã nguồn trong dự án
* Tỉ lệ lỗi cao
* Các vấn đề về giao tiếp và tích hợp phức tạp
* Thiếu các yêu cầu đầy đủ về tài liệu.

*Các nhân tố về kinh doanh chúng ta có thể xem xét như*: 
* Tần xuất sử dụng và tầm quan trọng của các đặc trưng bị ảnh hưởng
* Tiềm năng thiệt hại ảnh hưởng đến hình ảnh của công ty
* Việc mất khách hàng và mất kinh doanh
* Tiềm năng về tài chính, sinh thái, tổn thất xã hội hoặc trách nhiệm mang tính pháp lý
* Hình thức xử phạt dân sự hoặc hình sự
* Mất giấy phép kinh doanh, giấy phép và các loại tương tự
* Thiếu cách giải quyết hợp lý
* Khả năng hiển thị của lỗi và các tiêu cực liên quan được đưa ra công khai

Kỹ thuật trọng số nhẹ (lightweight techniques) cho phép sử dụng trọng số của khả năng xảy ra và các nhân tố ảnh hưởng để đưa ra các rủi ro về kỹ thuật hoặc kinh doanh
* Chỉ sử dụng hai nhân tố là khả năng và ảnh hưởng
* Sử dụng đơn giản, đánh giá định tính về quy mô và chất lượng

Trọng số nặng (Heavy-weight) ở cuối của quy mô có một số các lựa chọn:
* Hazard analysis mở rộng quy trình phân tích ngược cố gắng xác định các mối nguy hiểm mà nó nằm dưới mỗi rủi ro
* Cost of exposure cho mỗi mục rủi ro về định tính của chất lượng nơi mà quy trình đánh giá rủi ro liên quan đến việc xác đinh có 3 nhân tố:

    a. Khả năng (được biểu thị bằng phần trăm) của lỗi có liên quan đến từng mục rủi ro
    
    b. Chi phí tổn thất (được biểu thị bằng số lượng tài chính) được liên kết với một lỗi điển hình liên lệ tới một mục rủi ro, lỗi xảy ra trên môi trường thực.
    
    c. Chi phí kiểm thử cho các lỗi như vậy.
* Failure Mode and Efect Analysis (FMEA) và các biến thể của nó, nơi mà rủi ro chất lượng, các nguyên nhân tiềm ẩn của chúng và các kết quả được xác định, sau đó đánh trọng số, độ ưu tiên và đánh giá phát hiện được chỉ định.
* Quality Function Deployment (QFD) là một kỹ thuật quản lý rủi ro về chất lượng với các hàm ý kiểm tra, cụ thể là liên quan đế rủi ro về chất lượng phát sinh từ việc hiểu sai hoặc thiếu về yêu cầu của khách hàng hay người sử dụng.
* Fault Tree Analysis (FTA) nơi nhiều lỗi được quan sát thực tế ( từ việc kiểm thử hoặc từ môi trường thực) hoặc các lỗi tiềm năng (rủi ro về chất lượng) được phân tích tới nguyên nhân gốc rễ của lỗi. Bắt đầu từ các lỗi (defect) mà có thể là nguyên nhân gây ra failure, sau đó với các lỗi do con người tạo ra hoặc lỗi do source, lỗi được ghi lại gây ra các defect khác. Điều này được tiếp tục thực hiện tới tận khi các nguyên nhân gốc rễ được xác định.

### 3. Giảm thiểu rủi ro

Nằm trong risk control bởi vì nó bao gồm cả giảm thiểu, phòng tránh, chuyển giao và các hoạt động có thể được chấp nhận cho các rủi ro khác nhau.

## II. Các vấn đề quản lý kiểm thử

Những vấn đề này thường trong bốn khu vực:
* Quản lý các chiến lược kiểm thử phản ứng (reactive) và kỹ thuật kiểm thử dựa trên kinh nghiệm
* Quản lý kiểm thử hệ thống của hệ thống
* Quản lý kiểm thử hệ thống an toàn cao (safety-critical system)
* Quản lý kiểm thử phi chức năng

### 1. Vấn đề quản lý kiểm thử hệ thống của hệ thống

Các hệ thống là sự phức tạp của việc kiểm thử hệ thống được phân tán ( nhiều các mức độ kiểm thử khác nhau sẽ xảy ra ở nhiều vị trí khác nhau và nhiều mức độ khác nhau được thực hiện bởi các nhóm khác nhau ).
Gợi ý:
* Quản lý kiểm thử sẽ liên quan tới một kế hoạch kiểm thử tổng quan mà nó có nhiều mức độ. kế hoạch kiểm thử tổng quan này dễ để viết và quản lý nếu đội dự án ban đầu theo dõi.
* Một kế hoạch và quy trình đảm bảo chất lượng chính thức mà bao gồm việc verification và validation thông qua vòng đời phát triển, Nó bao gồm cả kiểm thử tĩnh và động và tất cả các mức độ kiểm thử chính thức đều rất là hữu ích.
* Quản lý cấu hình chính thức, quản lý các thay đổi, các kế hoạch quản lý bàn giao sản phẩm và các quy trình phải được định nghĩa ở các điểm thỏa thuận. Tài liệu bàn giao giữa kiểm thử và phần còn lại của dự án cũng nằm trong phần này.

### 2. Các vấn đề kiểm thử của hệ thống an toàn cao

Đối với các hệ thống yêu cầu về độ an toàn cao, có các chuẩn công nghiệp mà được ứng dụng cho kiểm thử và đảm bảo chất lượng:
* Đối với hệ thống tự động, có chuẩn Motor Industry Software Reliability Association (MISRA)
* Đối với hệ thống về y tế, các cơ quan chính phủ như cục quản lý thuốc và thực phẩm Mỹ áp dụng các chuẩn bắt buộc một cách nghiêm ngặt.
* Các hệ thống liên quan đến quân sự thường phải tuân thủ theo các tiêu chuẩn khác nhau.
Hệ thống yêu cầu an toàn cao là hệ thống an toàn cao vì nó có liên quan trực tiếp hoặc gián tiếp đến việc làm bị thương hoặc giết chết ai đó nếu hệ thống đó bị lỗi. Rủi ro này tạo ra trách nhiệm pháp lý cũng như trách nhiệm về đạo đức đối với các nhà cung cấp hoặc các nhà cung cấp tạo ra hệ thống. Trong khi không phải tất cả các rủi ro của lỗi có thể được giảm về không. Chúng ta có thể sử dụng các kỹ thuật nghiêm ngặt, chính thức bao gồm:
* Ma trận hai chiều về yêu cầu, thiết kế, và theo dấu các rủi ro thông qua mã nguồn và kiểm thử.
* Tối đa hóa các mức độ bao phủ kiểm thử.
* Các điều kiện có thể chấp nhận được tập trung vào chất lượng bao gồm cả những cái bắt được tập trung vào các đặc trưng chất lượng phi chức năng.
* Chuẩn hóa, chi tiết hóa và các tài liệu kiểm thử là bắt buộc bao gồm cả các kết quả kiểm thử.

### 3. Các vấn đề về kiểm thử phi chức năng
* Tài liệu thì ít hoặc có thể bị thiếu hoàn toàn
* Vấn đề chính phát sinh từ các yêu cầu phi chức năng không thể kiểm thử
Cải thiện khả năng kiểm thử của các yêu cầu phi chức năng bởi những điều sau:
* Các yêu cầu xác định với kiểm thử
* Các trao đổi được viết phải được viết ra
* Tránh các yêu cầu không rõ ràng
* Giảm thiểu các rủi ro phi chức năng trong suốt các mức độ của kiểm thử ngay từ sớm, việc xem xét (review) thì rất là hữu ích.
* Sử dụng một định dạng chuẩn cho các yêu cầu.
* Xác định các yêu cầu định lượng nơi mà có thể và thích hợp
* Kiểm thử phi chức năng nên được ưu tiên và được sắp xếp theo mức độ của rủi ro.

### 4. Quản lý các chiến lược phản ứng lại và các kỹ thuật kiểm thử dựa trên kinh nghiệm
Ba vấn đề chính trong chiến lược kiểm thử phản ứng như là việc tìm lỗi, tấn công phần mềm và kiểm thử khám phá
* Khó để quản lý, không ghi lại bằng văn bản cái mà được kiểm thử, và không dễ dàng mở rộng tới đội lớn có nhiều nhân viên kiểm thử.
* Trong khi một số người ủng hộ kiểm thử khám phá đã gặp phải những chỉ trích, một số trong số họ cố gắng đáp ứng hiệu quả công việc bằng cách đưa ra các kỹ thuật quản lý cho họ.

*Solution*
* Sử dụng quản lý kiểm thử dựa trên các session. Bạn chia các effort thực hiện kiểm thử vào các session kiểm thử. Một session kiểm thử là một đơn vị cơ bản của công việc kiểm thử. Thông thường nó được hạn chế về thời gian, điển hình là khoảng từ 30 đến 120 phút một session. Khoảng thời gian được gán cho sesion kiểm thử được gọi là hộp thời gian.
* Các session kiểm thử nên tập trung vào một mục tiêu kiểm thử xác định. Chúng ta nên tập trung vào mục tiêu kiểm thử xác định và được ghi lại trong charter kiểm thử.
* Cuối mỗi sesstion có báo cáo, ghi lại chi tiết cái mà kiểm thử viên đã kiểm thử.
Quản lý kiểm thử dựa trên session sử dụng một từ viết tắt, PROOF:
* Pass: Cái gì đã xảy ra trong suốt session? Cái gì bạn đã làm và cái gì bạn đã nhìn thấy?
* Results:Cái đạt được trong suốt session? Lỗi gì mà bạn đã tìm thấy? Những cái gì đã làm việc?
* Outlook: Những cái gì vẫn cần được thuwcjc hiện? Cái session kiểm thử nào chúng ta nên làm tiếp theo?
* Obstacles: Cái gì cản trở việc kiểm thử? Bạn không thể làm điều gì mà bạn muốn?
* Feelings: Bạn cảm thấy thế nào về session kiểm thử này.

Tôi hy vọng qua bài viết của mình đã giúp bạn hiểu được rõ hơn phần nào về quản lý rủi ro trong dự án chúng ta đang làm. Cách chúng ta xác định, phân tích, giảm thiểu rủi ro trong dự án. Cũng như các phương pháp phòng tránh rủi ro.

*Tài liệu tham khảo*: Advanced Software Testing Vol.1