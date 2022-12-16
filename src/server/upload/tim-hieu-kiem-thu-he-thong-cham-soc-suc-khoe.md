Trước khi bắt đầu thử nghiệm, hãy tìm hiều nhanh kiến thức về HealthCare Domain
### Kiến thức cơ bản về HealthCare Domain
Toàn bộ hệ thống chăm sóc sức khỏe được kết hợp với nhau thường được gọi là bệnh viện hoặc nhà cung cấp (bác sĩ).
Trong khi các thực thể khác bao gồm-
* **Công ty bảo hiểm:** Medicare, Medicaid, BCBS, v.v.
* **Bệnh nhân / Người tiêu dùng**: Bệnh nhân đã đăng ký
* **Cơ quan quản lý**: HIPAA, đánh giá OASIS, HCFA 1500 và UB92, v.v.
* **Nhà cung cấp giải pháp chăm sóc sức khỏe và khoa học đời sống**
Thuật ngữ cơ bản của hệ thống chăm sóc sức khỏe
* **Nhà cung cấp**: Một chuyên gia chăm sóc sức khỏe (bác sĩ), nhóm y tế, phòng khám, phòng thí nghiệm, bệnh viện, vv được cấp phép bởi các dịch vụ chăm sóc sức khỏe
* **Yêu cầu**: Yêu cầu công ty bảo hiểm y tế của bạn thanh toán hóa đơn cho dịch vụ chăm sóc sức khỏe
* **Nhà môi giới**: Một chuyên gia bảo hiểm, người đàm phán, mua bảo hiểm thay mặt cho người được bảo hiểm hoặc người được bảo hiểm tiềm năng
* **Tài chính**: Các cơ quan bảo hiểm chi trả cho các chi phí y tế, đó có thể là chính phủ (Medicare hoặc Medicaid) hoặc thương mại (BCBS)
* **Medicare**: Chương trình bảo hiểm y tế liên bang dành cho người già và người tàn tật vĩnh viễn
* **Trợ cấp y tế**: Chương trình chung và tiểu bang giúp các gia đình và cá nhân có thu nhập thấp thanh toán chi phí liên quan đến chăm sóc y tế
* **Mã CPT**: Mã thuật ngữ thủ tục hiện tại là mã y tế được đặt để mô tả các dịch vụ y tế, phẫu thuật và chẩn đoán
* **HIPAA**: Đó là một bộ quy tắc và quy định mà các bác sĩ, bệnh viện, nhà cung cấp dịch vụ chăm sóc sức khỏe và chương trình y tế phải tuân theo để cung cấp dịch vụ của họ
Trong hướng dẫn này, chúng ta sẽ tìm hiểu-

429/5000
* Kiến thức cơ bản về lĩnh vực chăm sóc sức khỏe
* Quy trình kinh doanh chăm sóc sức khỏe
* Kiểm tra hệ thống nhà cung cấp
* Kiểm tra hệ thống môi giới
* Kiểm tra hệ thống thành viên
* Kiểm tra hệ thống xác nhận quyền sở hữu
* Kiểm tra hệ thống tài chính
* Kiểm tra theo tuân thủ quy định
* Kiểm tra hiệu suất của Ứng dụng chăm sóc sức khỏe
* Các loại thử nghiệm khác cho ứng dụng chăm sóc sức khỏe
* Thử thách trong ứng dụng chăm sóc sức khỏe
* Kiểm tra thiết bị chăm sóc sức khỏe
* Lời khuyên hữu ích cho việc kiểm tra sức khỏe
### Quy trình kinh doanh chăm sóc sức khỏe
Hầu hết các tổ chức chăm sóc sức khỏe có chương trình phần mềm thích ứng để xử lý trơn tru các hoạt động của hệ thống. Hệ thống phần mềm này cung cấp tất cả thông tin trong một tài liệu duy nhất cho mỗi thực thể xử lý vấn đề này.
![](https://images.viblo.asia/c2b11159-5d88-4bb2-9aed-743322f106cf.png)
Kết nối toàn bộ hệ thống này với một ứng dụng web là một nhiệm vụ lớn và làm cho nó hoạt động hiệu quả thậm chí còn là một nhiệm vụ lớn hơn. Thực hiện kiểm tra nghiêm ngặt ứng dụng sức khỏe này là bắt buộc, và nó phải trải qua các giai đoạn thử nghiệm khác nhau.
Trong hướng dẫn này, chúng ta sẽ tìm hiểu,
### Kiểm tra hệ thống nhà cung cấp
Mẫu kịch bản thử nghiệm  và các trường hợp thử nghiệm cho hệ thống nhà cung cấp (bác sĩ / bệnh viện):


| Test Scenario | Test Cases |
| -------- | -------- |
| Truy cập hệ thống nhà cung cấp     | Hệ thống nhà cung cấp sẽ cho phép nhập, chỉnh sửa và lưu dữ liệu của nhà cung cấp     |
| Positive flow System Testing     | Nó bao gồm các kịch bản để nhập các loại nhà cung cấp khác nhau, thay đổi chi tiết nhà cung cấp, lưu và truy vấn     |
| Negative flow System Testing     | Cho phép lưu thông tin nhà cung cấp với dữ liệu không đầy đủ, ngày hiệu lực của hợp đồng, nhập chi tiết về các nhà cung cấp hiện có trong hệ thốngn     |
| System Integration Testing     | Xác thực nguồn cấp dữ liệu cho hệ thống thành viên, hệ thống tài chính, hệ thống yêu cầu và cổng thông tin nhà cung cấp. Ngoài ra, xác nhận nếu các thay đổi từ cổng nhà cung cấp được nhập vào hồ sơ của nhà cung cấp tương ứng     |
| Positive flow providers portal testing    | Đăng nhập và xem chi tiết nhà cung cấp, trạng thái yêu cầu và chi tiết thành viên, Thực hiện thay đổi yêu cầu thay đổi tên, địa chỉ, số điện thoại, v.v.     |
| Negative flow providers portal testing     | Xem chi tiết thành viên với ID không hợp lệ. Đăng nhập với thông tin không hợp lệ     |
| Positive flow Broker portal testing     | Đăng nhập và xem chi tiết về thanh toán môi giới và hoa hồng. Yêu cầu thay đổi tên, địa chỉ, số điện thoại, v.v.     |
| Negative flow Broker portal testing     | Bao gồm các kịch bản để đăng nhập với thông tin không hợp lệ     |
### Kiểm tra hệ thống môi giới
**Kịch bản thử nghiệm mẫu và trường hợp thử nghiệm cho Hệ thống môi giới:**
| Test Scenario | Test Cases |
| -------- | -------- |
| Hệ thống môi giới     | Nó sẽ có khả năng chỉnh sửa, nhập và lưu dữ liệu môi giới. Tính toán hoa hồng môi giới dựa trên chi tiết thanh toán cao cấp từ hệ thống thành viên     |
| Positive flow System Testing     | Nhập, lưu và chỉnh sửa hồ sơ môi giới cho các loại môi giới khác nhau. Đối với các nhà môi giới hoạt động, tính toán hoa hồng bằng cách tạo tệp nguồn cấp dữ liệu với bản ghi tương ứng cho các thành viên với gói khác     |
| Negative flow System Testing     | Nhập một bản ghi môi giới với dữ liệu không đầy đủ và lưu cho các loại môi giới khác nhau. Bằng cách tạo tệp nguồn cấp dữ liệu với bản ghi tương ứng cho các thành viên với gói khác nhau, tính toán hoa hồng cho nhà môi giới bị chấm dứt. Bằng cách tạo tệp nguồn cấp với bản ghi tương ứng cho các thành viên với gói khác nhau, tính toán hoa hồng cho người môi giới không hợp lệ     |
| System  Testing     | Để hệ thống hạ nguồn như hệ thống tài chính, cổng thông tin môi giới và hệ thống thành viên xác nhận các nguồn cấp dữ liệu. Xác thực nếu các thay đổi từ cổng môi giới được kết hợp trong hồ sơ môi giới tương ứng     |
### Kiểm tra hệ thống thành viên
**Các kịch bản thử nghiệm mẫu và các trường hợp thử nghiệm cho Hệ thống Thành viên (Bệnh nhân):**
| Test Scenario | Test Cases |
| -------- | -------- |
| Hệ thống thành viên     | Ghi danh, phục hồi và chấm dứt thành viên. Xóa và thêm một phụ thuộc. Tạo hóa đơn cao cấp. Xử lý thanh toán phí bảo hiểm     |
| Positive flow System Testing     | Với ngày hiệu lực hiện tại, quá khứ và tương lai, hãy đăng ký các loại thành viên khác nhau. Hỏi và thay đổi thành viên. Tạo hóa đơn cao cấp cho một thành viên tích cực cho tháng tiếp theo. Chấm dứt một thành viên tích cực với ngày chấm dứt trong quá khứ, hiện tại và tương lai lớn hơn ngày có hiệu lực. Đăng ký lại một thành viên bị chấm dứt với ngày có hiệu lực hiện tại, quá khứ và tương lai. Tái lập một số kết thúc     |
| Negative flow System Testing     | Với dữ liệu không đủ đăng ký thành viên. Đối với một thành viên bị chấm dứt sản xuất một hóa đơn cao cấp cho tháng tiếp theo    |
| System Integration Testing     | Xác thực nguồn cấp dữ liệu cho các hệ thống hạ nguồn như cổng nhà cung cấp, cổng môi giới, hệ thống tài chính và hệ thống khiếu nại. Xác thực nếu các thay đổi từ cổng thông tin thành viên được kết hợp trong hồ sơ thành viên tương ứng. Xử lý thanh toán hóa đơn cao cấp được tạo bằng nguồn cấp dữ liệu từ cổng thông tin thành viên có chi tiết thanh toán được thực hiện    |
### Kiểm tra hệ thống Yêu cầu bồi thường
**Các kịch bản thử nghiệm mẫu và các trường hợp thử nghiệm cho Hệ thống Yêu cầu bồi thường:**
| Test Scenario | Test Cases |
| -------- | -------- |
| Hệ thống yêu cầu bồi thường     | Yêu cầu chăm sóc sức khỏe nên chỉnh sửa, nhập và xử lý khiếu nại cho thành viên cũng như người phụ thuộc. Đối với khiếu nại không hợp lệ, cần ném lỗi khi nhập dữ liệu không chính xác     |
| Positive flow System Testing     | Bao gồm kịch bản để chỉnh sửa, nhập và xử lý khiếu nại cho thành viên cũng như phụ thuộc     |
| Negative flow System Testing     | Xác nhận và nhập một yêu cầu với mã thủ tục và mã chẩn đoán không hợp lệ. Xác thực và nhập khiếu nại với ID nhà cung cấp không hoạt động. Xác thực và nhập một yêu cầu với một thành viên bị chấm dứt    |
| System Integration Testing     | Bao gồm một kịch bản để xác nhận nguồn cấp dữ liệu cho các hệ thống hạ nguồn như nhà cung cấp và cổng thông tin tài chính    |
### Kiểm tra hệ thống Tài chính
**Các kịch bản thử nghiệm mẫu và các trường hợp thử nghiệm cho Hệ thống Tài chính:**
| Test Scenario | Test Cases |
| -------- | -------- |
| Hệ thống tài chính     |Ghi danh, phục hồi và chấm dứt thành viên     |
| Positive flow System Testing     | Cần kiểm tra xem số tài khoản hoặc địa chỉ chính xác được chọn cho thành viên, nhà cung cấp hoặc nhà môi giới tương ứng cho khoản thanh toán     |
| Negative flow System Testing     | Xác minh xem thanh toán được thực hiện cho một thành viên, nhà cung cấp hoặc ID nhà môi giới không hợp lệ bằng cách tạo một bản ghi tương ứng trong nguồn cấp dữ liệu. Xác minh xem thanh toán được thực hiện với số tiền không hợp lệ cho thành viên, nhà cung cấp hoặc nhà môi giới bằng cách tạo hồ sơ tương ứng trong nguồn cấp dữ liệu   |
### Kiểm tra tuân thủ quy định
Bảo vệ dữ liệu nhạy cảm của bệnh nhân và thông tin sức khỏe là ưu tiên hàng đầu của các cơ quan quản lý sức khỏe. Việc kiểm tra nên được thực hiện theo sự tuân thủ của các cơ quan quản lý đó.
**Các kịch bản thử nghiệm mẫu và các trường hợp thử nghiệm cho kiểm tra tuân thủ quy định:**
| Test Scenario | Test Cases |
| -------- | -------- |
| Xác thực người dùng     |Sử dụng phương pháp xác minh để đảm bảo rằng người dùng chính xác có được thông tin đăng nhập và từ chối người khác     |
| Công bố thông tin     | Cho phép truy cập thông tin dựa trên vai trò của người dùng và giới hạn bệnh nhân     |
| Truyền dữ liệu     | Tại tất cả các lần chuyển, các điểm đảm bảo rằng dữ liệu được mã hóa   |
| Audit Trail     | Tất cả các giao dịch và tất cả các nỗ lực truy cập dữ liệu với một bộ thông tin theo dõi kiểm toán thích hợp được ghi lại   |
| Kiểm tra vệ sinh liên quan đến cơ quan quản lý     | Thực hiện kiểm tra độ chân thực và xác minh mã hóa dữ liệu được thực hiện ở các khu vực cụ thể như EPHI (Thông tin sức khỏe được bảo vệ điện tử)   |
### Kiểm tra hiệu suất của Ứng dụng chăm sóc sức khỏe
Trước khi chuẩn bị các kịch bản thử nghiệm yêu cầu nhất định của hệ thống nên được xem xét. Ví dụ, các nhà cung cấp dịch vụ chăm sóc sức khỏe (Bác sĩ / Bệnh viện) cung cấp dịch vụ chăm sóc 24/7, vì vậy phần mềm đăng ký bệnh nhân cần phải có sẵn mọi lúc. Ngoài ra, nó cần liên lạc với các công ty bảo hiểm để xác nhận thông tin chính sách, gửi yêu cầu và nhận kiều hối. Ở đây, kiến trúc nên xác định các thành phần khác nhau của hệ thống, giao thức để liên lạc với các công ty bảo hiểm và cách triển khai hệ thống để nó tuân thủ 24/7.

Là người thử nghiệm, bạn cần đảm bảo rằng hệ thống phần mềm chăm sóc sức khỏe đáp ứng tiêu chuẩn tải / hiệu suất mong muốn.

### Các loại thử nghiệm khác cho ứng dụng chăm sóc sức khỏe
![](https://images.viblo.asia/c10475ce-b421-404e-908c-5c40d26f77f1.png)
* Kiểm tra chức năng: Kiểm tra ứng dụng chăm sóc sức khỏe chống lại các khả năng chức năng
* Kiểm tra sự phù hợp: Kiểm tra sự phù hợp Các yêu cầu bảo mật chăm sóc sức khỏe và khung công nghiệp
* Kiểm tra nền tảng: Kiểm tra các ứng dụng trên nền tảng Di động và kiểm tra các ứng dụng để tương thích trình duyệt chéo
* Kiểm tra khả năng tương tác: Kiểm tra sự phù hợp với các tiêu chuẩn tương tác (Ví dụ: DICOM, HL7, CCD / CDA)
### Thử thách trong ứng dụng chăm sóc sức khỏe
Thử thách thử nghiệm trong thử nghiệm ứng dụng chăm sóc sức khỏe không khác gì thử nghiệm ứng dụng web khác.

* Yêu cầu chuyên môn về kiểm tra, và thông thường, nó có chi phí cao
* Yêu cầu khả năng tương tác, tuân thủ, quy định, bảo mật, kiểm tra an toàn bên cạnh các kỹ thuật kiểm tra thường xuyên (Kiểm tra không chức năng, chức năng và tích hợp)
* Kiểm tra nên được thực hiện để ghi nhớ các tiêu chuẩn an toàn và quy định - vì bất kỳ lỗi nào cũng có thể gây ảnh hưởng trực tiếp đến cuộc sống của bệnh nhân
* Nhóm thử nghiệm cần nhận thức rõ các chức năng khác nhau, sử dụng lâm sàng và môi trường mà phần mềm sẽ được sử dụng cho
* Một sản phẩm chăm sóc sức khỏe phải tuân thủ các tiêu chuẩn khác nhau như FDA, ISO và CMMI trước khi có thể sử dụng
* Sự phụ thuộc chéo của người kiểm thử phần mềm cần đảm bảo rằng mọi thay đổi trong một thành phần hoặc lớp này sẽ không dẫn đến tác dụng phụ đối với phần kia.
### Kiểm tra thiết bị chăm sóc sức khỏe
Mặc dù phần mềm thiết bị chăm sóc sức khỏe không phải là mối quan tâm trực tiếp của bệnh nhân, họ cũng yêu cầu kiểm tra nghiêm ngặt như kiểm tra phần mềm khác. Ví dụ, các máy X-quang được kiểm soát bởi các chương trình phần mềm nên được kiểm tra tốt vì mọi lỗi kiểm tra trong phần mềm đều có thể dẫn đến ảnh hưởng nghiêm trọng đến bệnh nhân.

FDA (Cục quản lý thực phẩm và dược phẩm) có hướng dẫn cho các ứng dụng di động và web cho các thiết bị y tế. Mặc dù thử nghiệm các thiết bị y tế, Kế hoạch kiểm tra chức năng phù hợp cùng với các tiêu chí đạt và không đạt cũng là một phần của hướng dẫn của FDA. Khi một kế hoạch kiểm tra được thực hiện, kết quả được thu thập và báo cáo cho FDA. Quá trình này đảm bảo rằng thiết bị đáp ứng tiêu chuẩn của các cơ quan quản lý.

### Lời khuyên hữu ích cho việc kiểm tra sức khỏe
Trong khi kiểm tra phần mềm, bạn có thể xem xét một số mẹo quan trọng cho hệ thống chăm sóc sức khỏe thử nghiệm.

* Ngày tháng là quan trọng và cần phải chính xác
* Trong khi thiết kế các trường hợp thử nghiệm xem xét các tham số khác nhau như các loại kế hoạch khác nhau, các nhà môi giới, thành viên, hoa hồng, v.v.
* Cần có kiến ​​thức đầy đủ về tên miền

Nguồn: https://www.guru99.com/healthcare-application-testing-with-sample-test-cases.html