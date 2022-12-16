# 1. System testing là gì?
Kiểm thử hệ thống là loại kiểm thử để kiểm tra hành vi của sản phẩm phần mềm được tích hợp hoàn chỉnh và đầy đủ dựa trên tài liệu đặc tả yêu cầu phần mềm (SRS). Trọng tâm chính của thử nghiệm này là đánh giá các yêu cầu của Doanh nghiệp / Chức năng / Người dùng cuối.<br><br>

Kiểm tra hệ thống là rất cần thiết trước bất kỳ dự án nào, kiểm thử trực tiếp vì nó đảm bảo rằng tất cả các chức năng phần mềm cần thiết được đặt đúng chỗ và hoạt động như mong đợi.<br><br>

Mức kiểm thử này chỉ được thực hiện sau khi hoàn thành kiểm thử tích hợp hệ thống khi cả hai yêu cầu chức năng & phi chức năng đã được kiểm thử trước đó. <br><br>

Trong các mức kiểm thử trước đó, kiểm thử viên tập trung vào việc tìm kiếm các lỗi / lỗi trên các module tích hợp. Nhưng trong kiểm thử hệ thống, kiểm thử viên cần tập trung vào việc tìm ra lỗi / lỗi dựa trên hành vi ứng dụng phần mềm, thiết kế phần mềm và kỳ vọng của người dùng cuối.
# 2. Tầm quan trọng của system testing.
* Trong Vòng đời phát triển phần mềm, kiểm thử hệ thống được thực hiện như là cấp độ kiểm tra đầu tiên trong đó toàn bộ hệ thống được kiểm tra.
*  Trong bước kiểm thử này kiểm tra xem hệ thống có đáp ứng yêu cầu chức năng hay không.
*  Kiểm thử hệ thống cho phép bạn kiểm tra, xác thực và xác minh cả các yêu cầu kinh doanh và kiến trúc ứng dụng.
*  Ứng dụng / Hệ thống được kiểm thử trong một môi trường đặc biệt giống với môi trường sản xuất hiệu quả nơi ứng dụng / phần mềm sẽ được triển khai lần cuối.
# 3. Những lưu ý để system test hiệu quả
Trong kiểm thử hệ thống phần mềm, cần lưu ý thực hiện các bước sau đây:

### Bước 1: Bước đầu tiên & quan trọng là chuẩn bị kế hoạch kiểm thử hệ thống

Tuy nhiên, đây là danh sách các điểm tiêu chuẩn sẽ được xem xét khi tạo Kế hoạch kiểm tra hệ thống:

- Mục đích & Mục tiêu: xác nhận xem hệt hống phần mềm có đáp ứng đúng theo luồng hoạt động trong đặc tả yêu cầu hay không.
- Phạm vi kiểm thử
- Vùng chức năng quan trọng: Xác định các chức năng chính, chức năng quan trọng nhất trong một sản phẩm phần mềm, có ảnh hưởng lớn đến việc sử dụng ứng dụng của người dùng: Đăng ký/ Đăng nhập/ Thanh toán/...
- Vùng chức năng cần tập trung: cần xác định các vùng chức năng quan trọng và có nguy cơ xảy ra nhiều bug nhất ví dụ như các chức năng mới bổ sung/ chức năng có flow phức tạp, <br>
    - Giao diện phần cứng: Các giao diện hệ thống như kết nối phần mềm với cổng USB, đọc DVD, v.v ... đang hoạt động tốt trong một hệ thống.
    - Các chức năng phức tạp: Hệ thống đang hoạt động như mong đợi đối với các chức năng có luồng hoạt động phức tạp
    - Chức năng hay được sử dụng trong ứng dụng,...
    - Bảo mật hệ thống: Toàn bộ hệ thống được tích hợp đủ bảo mật và cho phép người dùng dự định truy cập các chức năng hệ thống được gán cho người dùng.
    - Phục hồi lỗi/ Kiểm tra lỗi: Mất bao lâu để hệ thống phục hồi sau khi ngừng hoạt động hoặc lỗi mà không ảnh hưởng đến tính liên tục của doanh nghiệp.
    - Kiểm tra hiệu suất: Kiểm tra hiệu suất được thực hiện để đảm bảo hệ thống có thể chịu được tải hoặc yêu cầu bất ngờ mà không bị hỏng.
    - Giao diện người dùng: Hệ thống dễ dàng phản hồi giao diện người dùng như thế nào đối với yêu cầu như cuộc gọi AJAX, nhấp vào nút, tải lên tệp, v.v.
    - Khả năng cài đặt: Phần mềm dễ dàng được cài đặt như thế nào mà không cần nhiều nỗ lực hoặc kiến thức cần thiết.
    - Tài liệu: Cách sử dụng hiệu quả hướng dẫn sử dụng được ghi lại để sử dụng phần mềm bởi người dùng cuối.
    - Tính khả dụng: Phần mềm hệ thống được thiết kế dễ dàng như thế nào để người dùng có thể dễ dàng sử dụng.
    - Kiểm thử hiệu năng: Loại kiểm thử này xác định khả năng chịu tải tối đa của phần mềm hệ thống trước khi nó có thể bị hỏng hoặc sập.
    - Khả năng tương thích ngược: Nếu một phiên bản phần mềm mới được phát triểnthêm hoặc bỏ đi một số chức năng, hệ thống mới sẽ đảm bảo rằng nó hỗ trợ tất cả các giao diện và chức năng hiện có trong phiên bản cũ và trên hết các chức năng mới được hỗ trợ.

- Xây dựng chiến lược cho kiểm thử hệ thống: trong mỗi lần system testing, cần xác định nguồn lực hiện có( số người, thời gian, thiết bị) để đưa ra kế hoạch hợp lý kịp tiến độ kiểm thử nhưng vẫn đảm bảo chất lượng kiểm thử, kiểm thử đầy đủ các chức năng chính, chức năng quan trọng, ai sẽ chịu trách nhiệm kiểm thử những chức năng đó. 
- Lịch kiểm thử: dựa vào quỹ thời gian cho phép và chiến lược kiểm thử, xác định thời gian bắt đầu và kết thúc kiểm thử hệ thống. Những vùng chức năng chính và chức năng quan trong sẽ được ưu tiên kiểm thử và chiếm thiều thời gian kiểm thử hơn các vùng chức năng khác. 
- Tiêu chí đầu vào và đầu ra: Kết quả kiểm thử hệ thống cần phải đạt được những điều kiện tối thiểu về mức hoạt động của các chức năng quan trọng có ổn hay không. 
- Tiêu chí đình chỉ và bắt đầu lại kiểm thử hệ thống: khi sản phẩm phần mềm đạt được đủ các tiêu chí đầu vào thì mới được phép thực hiện kiểm thử hệ thống. Việc này giúp đảm bảo kiểm thử hệ thống được chính xác nhất và cũng đỡ tốn effort kiểm thử.
- Môi trường kiểm thử: cài đặt đúng môi trường kiểm thử và chạy thử ứng dụng trên môi trường đó ổn định. 
<br><br>
### Bước 2: Xem xét các loại kiểm thử

Tại đây, bạn nên xem xét các loại kiểm thử khác nhau như :
* Kiểm tra khả năng sử dụng: Để kiểm tra các giao diện người dùng thân thiện với người dùng, dễ vận hành và sử dụng.
* Kiểm tra tài liệu: Để kiểm tra hướng dẫn sử dụng và hướng dẫn hệ thống là chính xác và đầy đủ.
* Kiểm tra chức năng: Để kiểm tra các chức năng hệ thống đang hoạt động như mong đợi và được chỉ định trong tài liệu yêu cầu phần mềm.
* Kiểm tra khả năng tương tác: Để kiểm tra tính tương thích của hệ thống với các sản phẩm phần mềm của bên thứ ba khác.
* Kiểm tra hiệu suất: Để kiểm tra hiệu năng của hệ thống và đảm bảo hệ thống không bị hỏng trong khi vận hành với các tài nguyên có sẵn.
* Kiểm tra khả năng mở rộng: Để kiểm tra rằng hệ thống có thể mở rộng đủ về người dùng, địa lý, tài nguyên, v.v.
* Kiểm tra chịu tải & ổn định: Để kiểm tra rằng hệ thống có đủ khả năng chịu được tải dự kiến mà không bị hỏng.
* Kiểm tra độ tin cậy: Để kiểm tra thời gian hệ thống có thể hoạt động mà không phát triển bất kỳ vấn đề hoặc lỗi nào.
* Kiểm tra hồi quy: Để đảm bảo rằng các chức năng mới được thêm vào hệ thống không phá vỡ các chức năng hiện có.
* Kiểm tra tuân thủ và quy định: Để kiểm tra rằng đặc điểm kỹ thuật và hoạt động của hệ thống tuân thủ tốt với các cơ quan quản lý cần thiết.
* Kiểm tra bảo mật: Để kiểm tra rằng hệ thống được bảo mật đủ để bảo vệ hệ thống khỏi những người dùng ngoài ý muốn.
* Kiểm tra khả năng phục hồi: Để kiểm tra hệ thống có thể phục hồi tốt như thế nào sau sự cố hoặc ngừng hoạt động mà không ảnh hưởng đến doanh nghiệp.
<br><br>
### Bước 3: Tạo dữ liệu kiểm thử chuẩn bị cho kiểm thử hệ thống
- Nếu cần kiểm  thử tự động, bạn nên chuẩn bị bộ test data chuẩn phục vụ cho việc kiểm thử tự động.
- Một số chức năng liên quan đến các con số, tính toán phức tạp ví dụ như thanh toán, thống kê bạn cũng cần có một bộ test data cho các trường hợp kiểm thử.
### Bước 4: Thực hiện chạy kiểm thử các trường hợp cần kiểm thử tự động 
- Cần lưu ý có bộ test script chuẩn cho những trường hợp cần kiểm thử tự động.
- Thiết lập môi trường, công cụ kiểm thử tự động ổn định đảm bảo kiểm thử được hết những trường hợp kiểm thử đã được chuẩn bị ở bước trước. 
- Thường xuyên theo dõi việc chạy kiểm thử tự động để kịp thời giải quyết những trục trặc trong quá trình chạy kiểm thử tự động ví dụ như lỗi mạng, lỗi server, kết nối, ... 
### Bước 5: Thực hiện kiểm thử các trường hợp kiểm thử bình thường & cập nhật kết quả
- Kiểm thử luồng hoạt động và các chức năng ở những màn hình chính đảm bảo đúng theo tài liệu đặc tả.
- Luôn luôn cập nhật kết quả kiểm thử trong quá trình kiểm thử để cả đội dự án có thể theo dõi.
### Bước 6: Báo cáo lỗi, kiểm thử hồi quy
-  Khi phát hiện lỗi cần, nên báo cáo lỗi có đánh giá theo mức độ nghiêm trọng và độ ưu tiên để team dev có thể  tập trung và ưu tiên sửa những lỗi quan trọng trước. 
-  Thường xuyên theo dõi trạng thái của bug để kịp thời xác nhận và trao đổi với các thành viên khác.
-  Kiểm thử hồi quy cần kiểm soát được vùng ảnh hưởng của lỗi, tránh gây ra những lỗi khác. 
### Bước 7: Lặp lại vòng đời kiểm thử (nếu cần).
- Sau khi hoàn thành kiểm thử hệ thống lượt 1, nên rà soát số lượng lỗi và mức độ nghiêm trọng của từng lỗi.
- Khi team dev fix bug hoàn thành, có thể xem xét lặp lại vòng đời kiểm thử để đảm bảo tối đa các chức năng hoạt động trơn tru nhất và hạn chế các lỗi phát sinh.<br><br>
Trên đây là một số lưu ý mình tham khảo được và lưu ý thực tế trong quá trình làm việc. Hy vọng nhận được sự góp ý và bổ sung của mọi người. :)