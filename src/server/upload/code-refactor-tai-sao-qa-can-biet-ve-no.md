Thuật ngữ 'Refactor code-Tái cấu trúc' chắc hẳn không còn xa lạ gì với QA nếu đã từng tham gia các dự án phát triển phần mền. Tái cấu trúc chủ yếu được sử dụng cho việc dọn dẹp/ thiết kế lại code của chức năng.
Trong bài này chúng ta sẽ cùng tìm hiểu về định nghĩa, nhu cầu tái cấu trúc, xem xét tác động sau khi tái cấu trúc lên chức năng đồng thời cũng tìm hiểu cho phần quan trọng nhất: Là người thử nghiệm, tại sao bạn cần phải biết về tái cấu trúc?
![](https://images.viblo.asia/86f56155-46a2-4b2c-bad3-bc27094fc3a1.jpg)
### 1. Giới thiệu về Refactor code-Tái cấu trúc:
a. Refactor code là gì?
Refactor code cơ bản là một quá trình cải thiện lại code hiện có, biến đổi mã không hiểu quá hoặc quá phức tạp trở thành mã hiệu quả và đơn giản hơn.Việc này hỗ trợ rất nhiều cho dự án lâu dài khi có chức năng cần sửa đổi.
b. Khi nào thì cần refactor code:
Khi mới bắt đầu dự án với vòng quay tiến trình của dự án sẽ không ai chú ý đến việc code đó đã tối ưu hay chưa, có dễ hiểu cho người khác tiếp cận hay không nhưng càng đi đến cuối dự án khi có thời gian để xem lại code thì sẽ phát hiện có rất nhiều chỗ code chưa được... có rất nhiều lí do để tiến hành refator code như:
  + Code phức tạp không xúc tích
  + Kỹ thuật chưa tối ưu
  + Khó thêm, sửa cho giai đoạn mantain
Chúng ta sẽ tìm hiểu từng loại cụ thể:
- Code phức tạp không xúc tích: 
Code khó hiểu, phức tạp là dấu hiệu cho thấy một vấn đề nghiêm trọng có thể tồn tại trong mã, sau đây là một số mã xấu phổ biến:
  + Xuất hiện mã dự phòng hoặc giống hệt nhau
  + Một biến được khai báo nhưng lại không được sử dụng ở bất kỳ đâu trong phần còn lại của mã
  + Thiết kế mã quá phức tạp
  + Lớp mã quá ít và không biện minh cho sự tồn tại của lớp được định nghĩa
  + Sự tồn tại của quá nhiều điều kiện và vòng lặp có khả năng bị phá vỡ và đơn giản hóa
  + Việc xây dựng mã theo cách mà một thay đổi trong một phần của mã nhưng yêu cầu thay đổi phải được thực hiện tại các địa điểm khác
mã xấu sẽ trở lên rõ ràng theo thời gian, khi ứng dụng của hệ thống phát triển dẫn đến đoạn mã này bắt đầu ảnh hưởng đến việc phát triển mã, bảo trì và thậm chí là hệ thống hoạt động trong các tình huống khắc nghiệt
- Kỹ thuật chưa tối ưu:
Trong khi phát triển một phần mềm, trong thời gian giới hạn và nguồn lực sẵn có, thường chúng ta có thể thực hiện các bước tắt để đạt đến kết quả mong muốn. Có thể lấy ví dụ đơn giản như sau: Có một tính năng cần được thêm vào mo-dun hiện có. Có 2 cách để thực hiện: cách thứ nhất là tiếp cận dài hạn nhưng code hay, cách thứ 2 là chạy nước rút ngắn thời gian nhưng mã hóa lại lộn xộn. Nếu nhóm chịu áp lực về thời gian giới hạn thì họ có thể làm theo cách thứ 2 và để phần tồn đọng cho tương lai=> lúc này hình thành nên kỹ thuật xấu
- Khó thêm, sửa cho giai đoạn mantain: Nếu không có code đơn giản, có cấu trúc tốt và dễ bảo trì thì sẽ gây khó khăn cho những nhà phát triển mở rộng mỗi lần lặp lại. Nếu mã thay đổi mà không cần tái cấu trúc đúng thì nó có thể đóng góp vào việc viết mã
### 2. Tại sao một QA cần biết về refactor code:
- Dành cho người thử nghiệm/ nhà phát triển đơn vị:
  + Trong khi tái cấu trúc mã, khi mã mới được chèn vào cộng với các mã cũ có thể gây ra lỗi. 
  + Để các nhà phát triển có thể dễ dàng tiếp cận được code khi phát triển hoặc sửa một phần nào đó
- Đối với người thử nghiệm:
  + Là một người thử nghiệm, việc tái cấu trúc mã gần như dịch thành = kiểm tra chuyên sâu + kiểm tra hồi quy. Kiểm tra chuyên sâu cần bao gồm tất cả các luồng người dùng hiện có để đảm bảo rằng tất cả các chức năng đang hoạt động như trước đây. Kiểm tra hồi quy của toàn bộ ứng dụng (hoặc các khu vực bị ảnh hưởng) là bắt buộc để đảm bảo rằng việc nâng cấp một mô-đun đã không vô tình phá vỡ chức năng của các mô-đun khác.
  + Bài kiểm tra chấp nhận của người dùng sẽ rất quan trọng và các bài kiểm tra này cần phải vượt qua trước khi bản cho môi trường thật có thể được khai báo sẵn sàng để phát hành.
  + Ngoài ra, bất kỳ thử nghiệm nào khác được yêu cầu như kiểm tra tải, kiểm tra bảo mật , v.v. cũng sẽ cần được triển khai theo yêu cầu.
- Đối với khách hàng tiềm năng:
  + Khách hàng tiềm năng có thể được yêu cầu làm việc cùng với phần còn lại của nhóm bao gồm nhà phát triển, nhà phân tích sản phẩm và thậm chí cả các bên liên quan để đảm bảo rằng việc lập kế hoạch kiểm tra cho các dự án đó được thực hiện một cách cẩn thận.
  + Điều quan trọng là phải hiểu chức năng hiện có. Dựa trên chức năng hiện có, các trường hợp nghiệp vụ, luồng người dùng và kiểm tra chấp nhận của người dùng cần phải được ghi lại. Khi một mã được tái cấu trúc đang được thử nghiệm, tất cả các kịch bản này cần được xác thực, cùng với việc kiểm tra hồi quy các khu vực bị ảnh hưởng.
  + Chủ động trong khi lập kế hoạch thử nghiệm và phương án kiểm tra . Nếu bạn dự đoán yêu cầu của nhiều môi trường thử nghiệm hoặc công cụ kiểm tra mới, nên gửi yêu cầu sớm để ngăn chặn bất kỳ sự chậm trễ nào khi giai đoạn thử nghiệm bắt đầu.
  + Đừng ngần ngại kết nối đến các thành viên nhóm không thuộc dự án hoặc người dùng cuối để đóng góp vào thử nghiệm.
- Ví dụ điển hình:

  Nhiệm vụ : Tái cấu trúc thủ tục lưu trữ hiện có để tạo điều kiện cho quy mô ứng dụng tăng lên.

  Thủ tục được lưu trữ trong kịch bản này là một thủ tục đã lưu trữ cũ được thiết kế cách đây vài năm, lưu ý yêu cầu rằng ứng dụng đang sử dụng thủ tục lưu sẵn của nó như một ứng dụng nội bộ có ít hơn 10 phiên đồng thời .

  Bây giờ công ty muốn tiếp thị ứng dụng này như là một phần mềm như một dịch vụ (SaaS), với khối lượng dự kiến khoảng 300 phiên đồng thời

  Tuy nhiện hệ thống đã xảy ra lỗi khi có 25 phiên đồng thời cùng xử lí. Do đó cần tái cấu trúc lại mã để cho phép ứng dụng mở rộng và hỗ trợ tối đa 500 phiên đồng thời mà không xảy ra lỗi

  Một số vấn đề được xác định với thủ tục được lưu trữ này là nhiều truy vấn phụ trong một truy vấn đơn, kết nối nặng với các khung nhìn thay vì bảng, sử dụng lựa chọn * thay vì chọn một cột cụ thể, v.v. Do các vấn đề mã hóa này, ứng dụng đã tìm nạp nhiều dữ liệu hơn thực sự cần thiết, do đó khiến ứng dụng bị chậm lại và cuối cùng bị lỗi.
Thách thức:
+ Quản lý dự án:
  + Thu thập yêu cầu - Do quy trình được lưu trữ này là một mã kế thừa, nên không có yêu cầu được ghi lại khi nó được thiết kế lần đầu tiên. Ngoài ra đối với các lần lặp được thực hiện trong vài năm qua, không có nhật ký thay đổi để chỉ ra các quy tắc nghiệp vụ và logic được thêm vào hoặc bị loại bỏ khỏi mô-đun.
  + Lịch trình dự án - Do các yêu cầu không được xác định rõ ràng và các phụ thuộc mã chưa được xác định đầy đủ, rất khó để truyền đạt lịch trình dự kiến.
+ Dành cho nhà phát triển:
  + Thiếu các yêu cầu rõ ràng và quy tắc kinh doanh.
  + Làm sạch mã mà không làm mất chức năng của nó.
  + Các khu vực bị ảnh hưởng không rõ và / hoặc các phụ thuộc mã.
  + Không thể cung cấp ước tính thời gian phát triển cụ thể.
  + Cần tạo các Bài kiểm tra Đơn vị mới
+ Dành cho người thử nghiệm:
  + Thiếu các yêu cầu rõ ràng và quy tắc kinh doanh tác động lên kế hoạch kiểm tra.
  + Các khu vực bị ảnh hưởng không xác định ảnh hưởng đến việc lập kế hoạch kiểm tra, đặc biệt cho các thử nghiệm hồi quy.
  + Không thể cung cấp các ước tính thử nghiệm cụ thể
+ Các bên liên quan khác: Thiếu các yêu cầu tài liệu rõ ràng + luồng người dùng + thời gian chặt chẽ => nguy cơ thất bại cao
=> Cách tiếp cận theo nhóm giảm thiểu rủi ro 
+ Nhóm nghiên cứu theo cách tiếp cận hợp tác để thu thập yêu cầu: Nhà phân tích sản phẩm và kiểm thử làm việc chặt chẽ với người dùng cuối nội bộ để hiểu và ghi lại chức năng chính và luồng người dùng
+ Môi trường thử nghiệm thay thế được tạo ra để kiểm tra sự thay đổi đang được thực hiện: Có 2 môi trường thử nghiệm song song, cho phép nhóm nghiên cứu kiểm tra sâu hơn và khám phá bằng cách so sánh hành vi trong 2 môi trường thử nghiệm này, họ có thể xác định các lỗi có thể xảy ra
+ Người dùng cuối và các bên liên quan tham gia thử nghiệm sớm : Bất kỳ vấn đề rõ ràng nào đã bị bắt và báo cáo sớm về việc cho phép nhiều thời gian hơn cho nhóm triển khai và kiểm tra bản sửa lỗi cần thiết.
+ Thiết lập một ngày phát hành dự kiến: Đặt ngày phát hành phù hợp và thúc đẩy nhóm làm việc hướng tới một điểm cuối chung. Dựa trên phạm vi của dự án, nhóm được khuyến cáo nên chạy nước rút trong 3 tuần thay vì chạy nước rút trong 2 tuần thường xuyên để đủ thời gian cho nhóm thực hiện dự án

### Tóm lại:
Việc tái tạo cấu trúc mã là một quá trình để làm sạch/ đơn giản hóa thiết kế của một mô-đun mà không thay đổi chức năng của nó. Quá trình tái cấu trúc có thể đơn giản, như thêm nhận xét, thêm thụt lề chính xác, loại bỏ biến tĩnh, v.v. hoặc có thể phức tạp đối với các hệ thống kế thừa phức tạp
Đối với người thử nghiệm, việc tái cấu trúc mã gần như dịch thành = kiểm tra chuyên sâu + kiểm tra hồi quy. Kiểm tra chuyên sâu được yêu cầu để kiểm tra tất cả các luồng người dùng hiện có để đảm bảo nếu tất cả các chức năng đang hoạt động như trước đây. Kiểm tra hồi quy của toàn bộ ứng dụng (hoặc các khu vực bị ảnh hưởng) là bắt buộc để đảm bảo rằng việc nâng cấp một mô-đun đã không vô tình phá vỡ chức năng của các mô-đun khác.