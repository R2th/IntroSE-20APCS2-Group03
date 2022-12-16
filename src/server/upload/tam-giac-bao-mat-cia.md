Tam giác bảo mật CIA
Vấn đề bảo mật thông tin không chỉ đơn thuần là việc chống lại các cuộc tấn công từ hacker, ngăn chặn malware để đảm bảo thông tin không bị phá hủy hoặc bị tiết lộ ra ngoài… Hiểu rõ 3 mục tiêu của bảo mật ở trên là bước căn bản đầu tiên trong quá trình xây dựng một hệ thống thông tin an toàn nhất có thể. Ba mục tiêu này còn được gọi là tam giác bảo mật C-I-A.

**Tính bí mật: Confidentiality**

Đảm bảo tính bí mật của thông tin, tức là thông tin chỉ được phép truy cập (đọc) bởi những đối tượng (người, chương trình máy tính…) được cấp phép.

Tính bí mật của thông tin có thể đạt được bằng cách giới hạn truy cập về cả mặt vật lý, ví dụ như tiếp cận trực tiếp tới thiết bị lưu trữ thông tin đó hoặc logic, ví dụ như truy cập thông tin đó từ xa qua môi trường mạng. Sau đây là một số cách thức như vậy:

Khóa kín và niêm phong thiết bị.
Yêu cầu đối tượng cung cấp credential, ví dụ, cặp username + password hay đặc điểm về sinh trắc để xác thực.
Sử dụng firewall hoặc ACL trên router để ngăn chặn truy cập trái phép.
Mã hóa thông tin sử dụng các giao thức và thuật toán mạnh như SSL/TLS, AES, v.v..

**Tính toàn vẹn: Integrity**

Đảm bảo tính toàn vẹn của thông tin, tức là thông tin chỉ được phép xóa hoặc sửa bởi những đối tượng được phép và phải đảm bảo rằng thông tin vẫn còn chính xác khi được lưu trữ hay truyền đi. Về điểm này, nhiều người thường hay nghĩ tính “integrity” đơn giản chỉ là đảm bảo thông tin không bị thay đổi (modify) là chưa đẩy đủ.

Ngoài ra, một giải pháp “data integrity” có thể bao gồm thêm việc xác thực nguồn gốc của thông tin này (thuộc sở hữu của đối tượng nào) để đảm bảo thông tin đến từ một nguồn đáng tin cậy và ta gọi đó là tính “authenticity” của thông tin.

Sau đây là một số trường hợp tính “integrity” của thông tin bị phá vỡ:

Thay đổi giao diện trang chủ của một website.
Chặn đứng và thay đổi gói tin được gửi qua mạng.
Chỉnh sửa trái phép các file được lưu trữ trên máy tính.
Do có sự cố trên đường truyền mà tín hiệu bị nhiễu hoặc suy hao dẫn đến thông tin bị sai lệch.

**Tính sẵn sàng: Availability**

Đảm bảo độ sẵn sàng của thông tin, tức là thông tin có thể được truy xuất bởi những người được phép vào bất cứ khi nào họ muốn. Ví dụ, nếu một server chỉ bị ngưng hoạt động hay ngừng cung cấp dịch vụ trong vòng 5 phút trên một năm thì độ sẵn sàng của nó là 99,999%.

Ví dụ sau cho thấy hacker có thể cản trở tính sẵn sàng của hệ thống như thế nào: Máy của hacker sẽ gửi hàng loạt các gói tin có các MAC nguồn giả tạo đến switch làm bộ nhớ lưu trữ MAC address table của switch nhanh chóng bị đầy khiến switch không thể hoạt động bình thường được nữa. Đây cũng thuộc hình thức tấn công từ chối dịch vụ (DoS).

Để tăng khả năng chống trọi với các cuộc tấn công cũng như duy trì độ sẵn sàng của hệ thống ta có thể áp dụng một số kỹ thuật như: Load Balancing, Clustering, Redudancy, Failover…

Nguồn : https://techzones.me/2019/08/07/tam-giac-bao-mat-cia/