Đối với bất kỳ ứng dụng di động, hiệu suất là rất quan trọng. Nếu ứng dụng di động không hoạt động tốt, người dùng sẽ gỡ cài đặt ứng dụng, tìm một ứng dụng khác hoạt động tốt hơn.
Trong bài viết này chúng ta sẽ tìm hiểu về hiệu suất ứng dụng di động.
Hiệu suất của ứng dụng trên điện thoại di động hoặc bất kỳ thiết bị thông minh nào thường được đánh giá theo 3 loại sau:
- Hiệu suất thiết bị
- Hiệu suất máy chủ / API
- Hiệu suất mạng

 ![](https://images.viblo.asia/62ea393a-67e9-4eeb-93f0-6556985693ab.png)

### 1.  Hiệu suất thiết bị

Đối với hiệu suất thiết bị cần kiểm tra những vấn đề sau:
- Khởi động ứng dụng

Ứng dụng mất bao nhiêu thời gian để khởi động? Đây là hiệu suất đầu tiên được đánh giá bởi người dùng. Sau khi người dùng chạm vào biểu tượng ứng dụng, màn hình đầu tiên sẽ hiển thị sau 1-2 giây.
- Thời gian sử dụng pin trong khi sử dụng ứng dụng

Khi sử dụng liên tục, một số ứng dụng di động tiêu thụ một lượng pin lớn và làm nóng điện thoại. Hiện tượng này có thể xảy ra khi ứng dụng sử dụng nhiều tài nguyên hơn mức yêu cầu. 
Việc sử dụng tài nguyên quá mức tạo ra gánh nặng cho bộ xử lý và làm cho điện thoại bị nóng lên.

- Tiêu thụ bộ nhớ


Khi kiểm tra một ứng dụng, cần kiểm tra mức tiêu thụ bộ nhớ của một ứng dụng.
Trong một số trường hợp, người ta đã nhận thấy rằng việc sử dụng bộ nhớ của toàn bộ O.S chỉ là 14%, nhưng một ứng dụng lại đang tiêu tốn 11%. Vì vậy, các yếu tố này phải được xử lý trước khi triển khai ứng dụng hoặc đưa cho khách hàng.

- Sự khác nhau về phần cứng / phần mềm

Khi kiểm tra một ứng dụng di động, bắt buộc phải kiểm tra các ứng dụng trên các thiết bị khác nhau. Ứng dụng có thể chạy trơn tru trên thiết bị này nhưng không chạy trên thiết bị khác. Một ứng dụng nên được kiểm tra trên nhiều hãng máy như Samsung, HTC và Lenovo với các thông số RAM và  bộ xử lý khác nhau như 1 GB hoặc 2 GB 

- Sử dụng đồng thời với các ứng dụng khác

Khi ứng dụng đang thử nghiệm chạy song song với các ứng dụng khác, việc này sẽ không gây ra trở ngại nào cho tất cả các ứng dụng đang chạy.

- Chạy ứng dụng dưới nền

Một ứng dụng đang chạy trong nền và được gọi lại, nó sẽ vẫn ở trạng thái như trước và dữ liệu phải được lưu trữ.

### 2. Hiệu suất máy chủ / API


Khi ứng dụng tương tác với máy chủ thông qua API, hiệu suất được đánh giá qua  thời gian phản hồi. Đối với hiệu suất máy chủ/API cần kiểm tra những vấn đề sau:

- Tải dữ liệu từ máy chủ

Ứng dụng sẽ xử lý dữ liệu được gửi từ máy chủ. Trong một số ứng dụng nhất định, dữ liệu được gửi theo định dạng cụ thể, trước khi hiển thị ra màn hình, dữ liệu đó có thể được chuyển đổi sang dạng khác. Trong quá trình này, các ứng dụng đôi khi trở nên chậm hơn và thời gian phản hồi trở nên dài hơn.

- Các lệnh gọi API được tạo từ ứng dụng

Trong một số trường hợp, nhiều lệnh gọi API được thực hiện cho cùng một chức năng. Để có hiệu suất tốt hơn, điều này nên được xử lý với số lượng cuộc gọi API ít hơn.

- Thời gian ngừng hoạt động của máy chủ

Do bất kỳ lý do nào nếu máy chủ ngừng hoạt động hoặc không thể truy cập, dữ liệu có thể được lưu  trong cơ sở dữ liệu gốc. Một giải pháp khác là các máy chủ cơ sở dữ liệu chuyển đổi dự phòng, tức là nếu một trong các máy chủ ngừng hoạt động hoặc đang trong giai đoạn bảo trì thì máy chủ dự phòng sẽ có sẵn để chuyển đổi. Máy chủ dự phòng phải được sao chép và đồng bộ hóa liên tục với máy chủ chính.

### Hiệu suất mạng

Hiệu suất của ứng dụng trên các mạng và thuộc tính mạng khác nhau cần được đo lường.

Đối với hiệu suất Mạng cần kiểm tra những vấn đề sau:

- Jitters

Khi có sự chậm trễ trong việc nhận thông tin trên mạng thì nó được gọi là jitter. Đó là một vấn đề với các mạng không kết nối hoặc mạng chuyển mạch gói. Khi thông tin được phân phối thành các gói, các gói có thể di chuyển theo một đường dẫn khác nhau từ người gửi đến người nhận. Khi dữ liệu đến vị trí dự định, nó sẽ bị xáo trộn so với ban đầu được gửi. Trong trường hợp của Jitters, ứng dụng di động phải đủ khả năng để xử lý nó.

Bạn cần hiển thị các thông báo phù hợp cho người dùng cuối để gửi lại yêu cầu hoặc đợi cho đến khi hệ thống phản hồi lại.

- Mất gói tin

Trong trường hợp mất gói tin hoàn toàn, ứng dụng sẽ có thể gửi lại yêu cầu cung cấp thông tin hoặc sẽ tạo cảnh báo tương ứng. Nếu dữ liệu không đầy đủ thì người dùng sẽ không thể hiểu được thông tin được hiển thị trong ứng dụng.  Vì vậy, tốt hơn là hiển thị một thông báo phù hợp hoặc nhắc người dùng thử lại.

- Tốc độ mạng

Ứng dụng cần được kiểm tra trên nhiều mạng với tốc độ thay đổi. Ứng dụng nên được thử nghiệm trên các mạng 2.5G, 3G và 4G,  mạng Wi-Fi và đặc biệt, khi cả hai mạng đều khả dụng và việc chuyển đổi xảy ra từ mạng này sang mạng khác.

### Khắc phục sự cố Hiệu suất Ứng dụng Di động

1.  Ứng dụng di động phản ứng chậm

Nguyên nhân của sự chậm trễ này có thể là RAM, Cache, v.v.

Bạn cần phải loại bỏ các tiến trình không cần thiết hoặc xóa bộ nhớ cache. Khắc phục sự cố kết nối có thể giải quyết một số vấn đề đang tạo ra độ trễ.

2. Ứng dụng bị khởi động lại , bị đóng băng hoặc không phản hồi.

Hiện tượng này có thể được khắc phục bằng một số bước sau:

- Tối ưu hóa code của ứng dụng.

- Phần mềm nên được cập nhật.

- Tự động phục hồi.

- Quản lý RAM hoặc ROM trong khi sử dụng thẻ nhớ ngoài.

- Xóa phân vùng bộ đệm

- Xác minh ứng dụng hoạt động với các ứng dụng và API của bên thứ ba khác.


### Công cụ kiểm tra ứng dụng di động hữu ích

Các công cụ kiểm tra ứng dụng di động khác nhau tùy theo thiết bị hoặc hệ điều hành di động. Các công cụ kiểm tra hiệu suất phổ biến là:

**ANDROID**

- Robotium

Nó giống như Selenium cho ứng dụng di động. Người kiểm tra có thể ghi lại và thực hiện một số thao tác cần thiết để thực hiện kiểm tra.

- MonkeyRunner

MonkeyRunner có thể chạy thử nghiệm trên các thiết bị thực được kết nối với PC hoặc trình giả lập. Công cụ này có API, cho phép điều khiển điện thoại thông minh, máy tính bảng.

**APPLE**

- Automator (Mac)

Automator là một ứng dụng được phát triển bởi Apple cho OS X. Nó thực hiện việc nhấp (hoặc kéo và thả) để tự động hóa các thao tác lặp đi lặp laị. Điều này giúp tiết kiệm thời gian và công sức thay vì thao tác thủ công.

### Những khó khăn khi thực hiện kiểm tra hiệu suất ứng dụng di động
Những khó khăn khi Kiểm tra hiệu suất bao gồm:

- Thị trường có nhiều nền tảng di động và hệ điều hành khác nhau.

- Cần chuẩn bị các kết nối như Edge, 3G, 4G hoặc WiFi, v.v.

- Các hạn chế của thiết bị di động như tời gian pin và tài nguyên.

- Tính khả dụng điện thoại di động.

- Các loại kích thước của thiết bị di động.

### Checklist kiểm tra hiệu suất ứng dụng di động
Kiểm tra hiệu suất của các ứng dụng di động là một biện pháp quan trọng trước khi phát hành.

- Cần bao nhiêu RAM để sử dụng ứng dụng này?

- Xác minh tốc độ và thời gian phản hồi của ứng dụng trong các mạng và hoàn cảnh khác nhau.

- Đảm bảo trải nghiệm người dùng thực tế trong một số điều kiện mạng.

- Đảm bảo đạt được kết quả cần thiết trong trường hợp có nhiều kết nối.

- Đảm bảo ứng dụng không bị sập.

- Theo dõi thời gian hoạt động và gọi API trên thiết bị di động.

- Đảm bảo tối đa số lượng người dùng đồng thời.

- Kiểm tra ứng dụng di động đến giới hạn của nó.

Nguồn tham khảo: https://www.guru99.com/mobile-app-performance-testing-strategy-tools.html#6