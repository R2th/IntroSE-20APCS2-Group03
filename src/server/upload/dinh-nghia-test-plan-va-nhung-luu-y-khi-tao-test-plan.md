## I. Giới Thiệu test plan

Test plan là một tài liệu chi tiết vạch ra những chiến lược của kiểm thử, mục đích, mục tiêu kiểm thử, cách sử dụng nguồn lực test nó bao gồm nhân lực, phần mềm, phần cứng cần thiết để kiểm thử, xác định được tiến độ, ước lượng thời gian, chất lượng từ các sản phẩm thử nghiệm. Từ đó để ta hiểu về test plan khái niệm nó là gì ? Vai trò của test plan?  Những bước thực hiện test plan. 

## II. Khái niệm và vai trò của test plan

### 1. Khái niệm

Test Plan là một tài liệu mô tả phạm vi và hoạt động kiểm thử phần mềm. Nó là cơ sở để chính thức kiểm tra bất kỳ phần mềm / sản phẩm nào trong một dự án.
    ![](https://images.viblo.asia/fe24cb8a-a9e6-4827-841c-bc04032a79fb.jpg)

- Theo định nghĩa của ISTQB

Test plan: Một tài liệu mô tả phạm vi, cách tiếp cận, nguồn lực và lịch trình của các hoạt động kiểm tra dự định. Nó xác định các mục kiểm tra khác, các tính năng sẽ được kiểm tra, các nhiệm vụ kiểm tra, ai sẽ thực hiện từng nhiệm vụ, mức độ độc lập của người kiểm tra, môi trường kiểm tra, các kỹ thuật thiết kế kiểm tra và tiêu chí xuất nhập được sử dụng và lý do căn bản của chúng sự lựa chọn, và bất kỳ rủi ro đòi hỏi lập kế hoạch dự phòng. Nó là một bản ghi của quá trình lập kế hoạch kiểm tra.

Nói một cách khác cho dễ hiểu thì Test Plan là tài liệu tổng quan về việc test 1 project. Scope của project, hướng tiếp cận, STLC(Software Testing Life Cycle), resource và nhân lực cần có, các features cần được test và không phải test, các tool test và môi trường test cần có. Có thể ví test plan là 1 cái xương sống của 1 testing project và là cái được chuẩn bị đầu tiên khi có 1 project. 

### 2. Vai trò test plan 

- Một kế hoạch chi tiết để tiến hành các hoạt động kiểm thử phần mềm thứ được quản lý 

- Kiểm soát rõ ràng bởi người quản lý.

- Nó giúp chúng ta định rõ những nỗ lực cần thiết để tạo ra chất lượng của ứng dụng đang được kiểm tra

- Giúp những người bên ngoài nhóm thử nghiệm như các nhà phát triển, quản lý kinh doanh, khách hàng hiểu các chi tiết của thử nghiệm.

## III. Bước thực hiện viết test plan và nội dung của một test plan.

### 1. Bước thực hiện của một test plan bạn cần làm những nội dung sau đây:

Để lập test plan chúng ta có 7 bước cơ bản sau:

- Xác định yêu cầu kiểm tra.

- Khảo sát rủi ro.

-  Xác định chiến lược kiểm tra.

- Xác định nhân lực, vật lực cần thiết.

- Lập kế hoạch chi tiết.

- Tổng hợp và đưa ra kế hoạch kiểm tra.

- Xem xét các kế hoạch kiểm tra.

### 2. Nội dung test plan.

Các định dạng và nội dung của testplan là khác nhau tùy vào các quy trình , tiêu chuẩn và các công cụ quản lý lỗi. Tuy nhiên định dạng sau dựa trên tiêu chuẩn IEEE cho test plan cung cấp 1 cách đầy đủ và tóm tắt những gì nên đưa và có thể đưa vào.

- Test plan indentifier(nhận dạng test plan) : 

Mã nhận dạng kế hoạch kiểm tra là một số duy nhất để xác định kế hoạch kiểm tra.

Ví dụ: ProjectName_0001

- Tài liệu

Phần này là để chỉ định tất cả danh sách các tài liệu hỗ trợ kế hoạch kiểm tra mà bạn hiện đang tạo.

Ví dụ: SRS (Đặc tả yêu cầu hệ thống), Tài liệu sử dụng, Chiến lược kiểm tra, Kế hoạch dự án, Nguyên tắc dự án, v.v.

-  Giới thiệu: 

Giới thiệu hoặc tóm tắt bao gồm mục đích và phạm vi của dự án

Ví dụ: Mục tiêu của tài liệu này là kiểm tra chức năng của ‘ProjectName,

-  Test item:

Một danh sách các mục kiểm tra sẽ được kiểm tra

Ví dụ: Việc kiểm tra phải được thực hiện ở cả mặt trước và mặt sau của ứng dụng trên môi trường Windows / Linux.

- Các tính năng cần kiểm tra:

Trong phần này, chúng tôi liệt kê tất cả các tính năng sẽ được thử nghiệm trong dự án.

Ví dụ: Các tính năng sẽ được kiểm tra là Trang đăng nhập, Bảng điều khiển, Báo cáo, Các tính năng cần kiểm tra:
Trong phần này, chúng tôi liệt kê tất cả các tính năng sẽ được thử nghiệm trong dự án.

-  Các tính năng không được kiểm tra:
Trong phần này, chúng tôi liệt kê các tính năng không có trong dự án.

Ví dụ: Thanh toán bằng các tính năng của PayPal ở trên đã xóa khỏi ứng dụng. Không cần phải kiểm tra tính năng này.

- Tiếp cận:

Chiến lược tổng thể về cách kiểm tra sẽ được thực hiện. Nó chứa các chi tiết như Phương pháp luận, Loại thử nghiệm, Kỹ thuật thử nghiệm, v.v.

Ví dụ: Chúng tôi theo Phương pháp Agile trong dự án này

- Tiêu chí đạt / không đạt:

Trong phần này, chúng tôi chỉ định các tiêu chí sẽ được sử dụng để xác định tỷ lệ đạt hoặc không đạt của các mục kiểm tra.

Ví dụ: Tất cả các chức năng chính của ứng dụng nên hoạt động như dự định và tỷ lệ phần trăm vượt qua của các trường hợp thử nghiệm phải lớn hơn 95% và không nên có bất kỳ lỗi nghiêm trọng nào

- Tiêu chí kết thúc/ dừng:

Trong phần này, chúng tôi chỉ định khi nào nên dừng thử nghiệm.

Ví dụ: Nếu bất kỳ chức năng chính nào không hoạt động hoặc gặp sự cố hệ thống thì việc kiểm tra sẽ tạm dừng.

- Sản phẩm thử nghiệm:

Danh sách các tài liệu cần phải được gửi trong mỗi giai đoạn của vòng đời thử nghiệm. Danh sách tất cả các hiện vật thử nghiệm.

Ví dụ: Các trường hợp thử nghiệm, Báo cáo lỗi

- Nhiệm vụ kiểm tra:

Trong phần này, chúng tôi chỉ định danh sách các nhiệm vụ thử nghiệm mà chúng tôi cần hoàn thành trong dự án hiện tại.

Ví dụ: Môi trường thử nghiệm phải sẵn sàng trước giai đoạn thực hiện thử nghiệm. Báo cáo tóm tắt kiểm tra cần phải được chuẩn bị.

 - Chuẩn bị môi trường test:

Danh sách phần cứng, phần mềm và bất kỳ công cụ nào khác cần thiết cho môi trường thử nghiệm.

- Trách nhiệm:

Chúng tôi chỉ định danh sách vai trò và trách nhiệm của từng nhiệm vụ kiểm tra.

Ví dụ: Kế hoạch kiểm tra nên được chuẩn bị bởi Test Lead. Chuẩn bị và thực hiện các bài kiểm tra nên được thực hiện bởi người kiểm tra.

-  Nhu cầu nhân sự và đào tạo:

Lập kế hoạch khóa đào tạo để cải thiện các kỹ năng của các nguồn lực trong dự án để đạt được các mục tiêu mong muốn.

- Lịch trình:

Hoàn thành chi tiết về thời điểm bắt đầu, kết thúc và thời gian mỗi nhiệm vụ sẽ diễn ra.

Ví dụ: Thực hiện kiểm tra thực hiện - 120 giờ, Báo cáo kiểm tra - 30 giờ

- Rủi ro và dự phòng:

Trong phần này, chúng tôi chỉ định xác suất rủi ro và dự phòng để khắc phục những rủi ro đó.

Ví dụ: Rủi ro - Trong trường hợp dự toán ngân sách sai, chi phí có thể vượt quá. Kế hoạch dự phòng - Thiết lập phạm vi trước khi bắt đầu các nhiệm vụ thử nghiệm và chú ý trong kế hoạch dự án và cũng theo dõi các dự toán ngân sách liên tục.

- Phê duyệt:

Ai nên đăng xuất và phê duyệt dự án thử nghiệmChỉ định tên và vai trò của tất cả những người phải phê duyệt kế hoạch.

Cung cấp không gian cho chữ ký và ngày. (Nếu tài liệu sẽ được in.)

Ví dụ: Người quản lý dự án nên đồng ý hoàn thành dự án và xác định các bước để tiến hành thêm.

*Nguồn tham khảo : http://softwaretestingfundamentals.com/test-plan/*