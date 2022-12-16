*Bên cạnh các định nghĩa, các lưu ý khi thực hiện việc kiểm thử website, mình cũng muốn giới thiệu đến các bạn một số câu hỏi chung thường gặp khi QA thực hiện việc test các sản phẩm ứng dụng, không chỉ trên web mà cả trên các thiết bị di động (mobile app).*

![](https://images.viblo.asia/2269619f-3438-4cd8-8d74-02a83ad38839.jpg)

1. Ứng dụng/ trang web có hoạt động như mong đợi?
1. Liệu người dùng cuối (End-user) có thấy ứng dụng/ trang web dễ sử dụng?
1. Người dùng cuối có thể truy cập ứng dụng/ trang web trên các thiết bị khác nhau hay không?
1. Ứng dụng trang web có đảm bảo bảo mật tốt?
1. Hiệu suất trang web có đạt đến mức chuẩn?
1. Dữ liệu được nhập trên ứng dụng/ trang web có được lưu trữ chính xác và tồn tại qua các phiên bản?
1. Ứng dụng/ trang web có được tích hợp tốt với các giao diện khác trong quy trình làm việc không?
1. Liệu ứng dụng/ trang web có hoạt động như mong đợi ngay cả sau khi đã hoạt động?

:white_check_mark: Trả lời những câu hỏi trên, sẽ xác định được các kỹ thuật kiểm thử khác nhau sẽ phù hợp để sử dụng kiểm tra một ứng dụng/ trang web. Chúng ta sẽ xem xét chi tiết từng câu hỏi được chỉ định ở trên để hiểu phạm vi kiểm tra và xem xét lựa chọn cách kiểm tra trang web tương ứng.

## 1. Ứng dụng/ trang web có hoạt động như mong đợi?

![](https://images.viblo.asia/22bc60a3-b77d-42a9-9c87-1218324b4726.png)

:arrow_right: Để xác nhận ứng dụng/ trang web có đang hoạt động tốt, QA cần thực hiện việc kiểm tra chức năng (Function testing). Trong quá trình kiểm thử chức năng, các tính năng khác nhau của ứng dụng cần được xác nhận theo các yêu cầu được đề cập trong tài liệu đặc tả chức năng (recruitment, spec,...).

:arrow_right: Dưới đây là một số kịch bản test cơ bản có thể áp dụng cho nhiều loại mô hình ứng dụng/ trang web, kết quả kiểm thử mong muốn của QA cần bảo đảm độ bao phủ việc kiểm tra các chức năng của bất kỳ ứng dụng/ trang web nào ngay cả khi chúng không được đề cập trong thông số kỹ thuật chức năng:

* Thực hiện các thao tác người dùng cơ bản trên ứng dụng/ trang web: Di chuyển đến các trang khác nhau và hoàn thành quy trình đó từ đầu đến cuối.
* Kiểm tra việc có thể chọn / bỏ chọn các hộp kiểm.
* Kiểm tra có thể chọn các giá trị từ các trường thả xuống.
* Kiểm tra có thể chọn / bỏ chọn các nút radio.
* Các nút điều hướng khác nhau như: Gửi, Tiếp theo, Tải lên, v.v. có đang hoạt động tốt.
* Lịch - ngày - giờ có lấy dữ liệu đúng cách và có cho phép người dùng lựa chọn hoặc thay đổi khác.
* Các tính toán có hoạt động đúng khi được sử dụng.
* Chức năng tìm kiếm có đang hoạt động. 
* Hiển thị thông tin chính xác.
* Thứ tự tab của các trường đúng.
* Các trường Bắt buộc và Tùy chọn phải được xác minh gồm các đầu vào đúng đắn và cả các giá trị không mong muốn.
* Giá trị mặc định cho mỗi trường phải được xác minh.
* Chức năng email có được triển khai cho một số action.


**Riêng với trang web cần chú ý thêm:**

:star: Các liên kết nội bộ của trang web và các liên kết bên ngoài đến các trang web khác hoạt động bình thường.

:star: Điều quan trọng là các trang web phải tương thích với các công cụ tìm kiếm. Do đó, chúng ta cũng nên xem xét về độ chính xác của cú pháp HTML, định dạng và các tiêu chuẩn tuân thủ như WS-I, ISO & ECMA.

:star: Về cookie - được sử dụng để duy trì các phiên đăng nhập, trang web cần được kiểm tra bằng cách bật / tắt cookie hoặc bằng cách sử dụng miền không khớp. Thử nghiệm cũng có thể được thực hiện trên các phiên bằng cách đặt lại cookie để đưa trình duyệt trở lại trạng thái ban đầu. QA cũng nên xác nhận rằng cookie của trang web luôn được lưu trữ cục bộ ở định dạng được mã hóa.

##  2. Liệu người dùng cuối (End-user) có thấy ứng dụng/ trang web dễ sử dụng?
:arrow_right: Kiểm tra khả năng sử dụng (Usability testing) phải được thực hiện để đo lường mức độ dễ sử dụng của ứng dụng/ trang web đối với người dùng cuối trong bối cảnh khả năng truy cập, khả năng tìm kiếm và tính hữu ích, v.v..

![](https://images.viblo.asia/1adc71ed-fdc5-4de9-852c-deae73a4cfa7.png)

:arrow_right: Dưới đây là một số kịch bản thử nghiệm cần được thực hiện khi thực hiện kiểm tra khả năng sử dụng cho một trang web:

:small_orange_diamond: Nội dung phải đầy đủ thông tin, có cấu trúc và được liên kết một cách logic để người dùng có thể hiểu một cách dễ dàng.

:small_orange_diamond: Các điều khiển trang phải dễ dàng cho người dùng điều hướng.

:small_orange_diamond: Phải có các tài liệu Trợ giúp & Hướng dẫn được tải lên.

:small_orange_diamond: Nên có tính năng Tìm kiếm để thuận tiện cho người dùng cuối.

:small_orange_diamond: Truy cập vào/ từ menu chính đến tất cả các trang nên có.

:small_orange_diamond: Nội dung phải được xác minh xem có bất kỳ lỗi chính tả nào không.

:small_orange_diamond: Phải tuân theo các nguyên tắc đã xác định trong tài liệu: về màu nền, hình mẫu, kiểu, phông chữ, vị trí hình ảnh, khung, đường viền, v.v..

:small_orange_diamond: Trang web nên tương thích với tính năng dịch vì thực tế là nó có thể được truy cập bởi người dùng từ các quốc gia khác nhau với các ngôn ngữ, đơn vị tiền tệ khác nhau, v.v..

:exclamation: Xem xét sự gia tăng các giao diện dựa trên màn hình cảm ứng, cần xác nhận khả năng truy cập của cả đầu vào chính và đầu vào màn hình cảm ứng. Tương tự, hình ảnh và nội dung phải được xác thực khả năng sử dụng trên các kích thước màn hình khác nhau (điện thoại di động, máy tính xách tay và tab, v.v.).

## 3. Người dùng cuối có thể truy cập ứng dụng/ trang web trên các thiết bị khác nhau hay không?

![](https://images.viblo.asia/4834b809-f1a4-4623-8b1c-046201f570f0.jpg)

:heavy_check_mark: Giả sử rằng ứng dụng/ trang web của chúng ta có thể được truy cập bởi nhiều người dùng với các thiết bị khác nhau, chúng ta cần đảm bảo rằng ứng dụng/ trang web chạy tốt trên tất cả các thiết bị ấy mà không gặp bất kỳ trục trặc nào.

:heavy_check_mark: Để đảm bảo điều tương tự, nên thực hiện thử nghiệm tính tương thích đi kèm với kiểm tra tính tương thích (Compatibility Testing). Trong quá trình kiểm tra tính tương thích, hãy đảm bảo rằng ứng dụng/ trang web chạy tốt trên các trình duyệt, hệ điều hành và thiết bị khác nhau như máy tính xách tay, điện thoại di động, máy tính bảng, máy in, v.v..

**a. Khả năng tương thích của trình duyệt (Cross Browser Testing):**

:small_red_triangle_down: Trang web cần hoạt động tốt với các trình duyệt khác nhau như Microsoft Internet Explorer, Microsoft Edge, Firefox, Google Chrome, Safari,... Tất cả các phiên bản đang hoạt động của các trình duyệt này phải được xác minh với các tính năng khác nhau khi bật/ tắt các tính năng này của trình duyệt.

:small_red_triangle_down: Ngoài ra, trong khi thực hiện kiểm tra trên nhiều trình duyệt, QA cũng nên kiểm tra hiệu suất trang web tối ưu trên các trình duyệt.

**b. Khả năng tương thích hệ điều hành (Cross Platform Testing):**

:small_red_triangle_down: Để xác định các vấn đề tiềm ẩn về trải nghiệm người dùng, một ứng dụng/ trang web nên được kiểm tra trên các nền tảng khác nhau như Windows, Linux, Unix.MAC, Solaris, v.v. để đảm bảo tính tương thích của hệ điều hành.

**c. Khả năng tương thích của thiết bị (Cross-Device Testing):**

:small_red_triangle_down: Một ứng dụng/ trang web có thể được duyệt qua các thiết bị khác nhau như máy tính xách tay, điện thoại di động, máy tính bảng, v.v. với các hệ điều hành khác nhau có sẵn như iOS, Android, Windows, v.v. Do đó, thử nghiệm nên được thực hiện trên các thiết bị với các trường hợp dưới đây: 

* Kích thước màn hình phải được điều chỉnh tùy theo thiết bị.
* Thiết bị có tính năng xoay màn hình.
* Không được hiển thị bất kỳ sự cố tải nào trên các thiết bị khác nhau có tốc độ mạng khác nhau.
* Xác minh hoạt động của ứng dụng/ trang web khi thiết bị ở trong / ngoài phạm vi mạng.
* Xác minh hành vi của ứng dụng/ trang web trên CPU và Bộ nhớ ít liệu có hỗ trợ các hệ số dạng khác nhau không.
* Điều quan trọng nữa là phải xác nhận việc sử dụng các tốc độ mạng khác nhau, để đảm bảo rằng mọi khách hàng đều có thể sử dụng được.
## 4. Ứng dụng/ trang web có đảm bảo bảo mật tốt?

![](https://images.viblo.asia/ea656667-29fa-4264-949d-1969c01ca887.jpeg)

:ballot_box_with_check: Kiểm tra bảo mật (Security testing) được thực hiện để phát hiện ra các lỗ hổng trong hệ thống và đảm bảo ứng dụng/ trang web được bảo mật. Dưới đây là checklists có thể được dùng để kiểm thử trong khi thực hiện kiểm tra bảo mật:

:small_red_triangle: Chỉ những người dùng đã xác thực mới có thể truy cập trang web. Phân quyền trang web theo các role đã xác định.

:small_red_triangle: Người dùng trang web chỉ có thể thực hiện những tác vụ mà họ được ủy quyền.

:small_red_triangle: Trang web phải được xác minh các trường CAPTCHA để nhận dạng người dùng.

:small_red_triangle: Cài đặt bảo mật của trình duyệt phải được xác minh trong khi chuyển từ các trang an toàn sang không an toàn.

:small_red_triangle: Web Server protection phải có đối với các thư mục hoặc tệp web không thể truy cập được.

:small_red_triangle: Đảm bảo các tệp bị hạn chế không được tải xuống nếu không có quyền truy cập thích hợp.

:small_red_triangle: Các phiên không hoạt động sẽ tự động bị ngắt sau một khoảng thời gian nhất định.

:small_red_triangle: Tất cả các nỗ lực không hợp lệ và trái phép của người dùng cuối hoặc lỗi / lỗi hệ thống không liên tục phải được ghi lại cho mục đích phân tích.

:small_red_triangle: Ngoài ra đối với các trang web thương mại điện tử hoặc trang web có tích hợp thanh toán cần chú ý các xác thực sau:
* Kiểm soát Truy cập Trang web.
* Không để rò rỉ bất kì thông tin cá nhân nào của người dùng.
* Phương thức Thanh toán  phải bảo đảm.

:ballot_box_with_check: Các công cụ như Vulnerability Management, Veracode, và SQLMap có thể được sử dụng để thực hiện kiểm tra bảo mật cho trang web của bạn.

## 5. Hiệu suất trang web có đạt đến mức chuẩn?
:arrow_forward: Để kiểm tra hiệu suất của một trang web, có thể thực hiện việc kiểm thử hiệu suất (performance testing). Nó sẽ đánh giá hành vi của một ứng dụng/ trang web trong nhiều điều kiện khối lượng công việc khác nhau, đây có thể là một kịch bản thực tế. 

![](https://images.viblo.asia/c421acda-af03-4738-a64e-cf611850080c.png)

:arrow_forward: Nếu hệ thống hoạt động mà không tiến hành các bài kiểm tra hiệu suất, có thể gặp phải các vấn đề như hệ thống chạy chậm hoặc khả năng sử dụng kém. Dưới đây là danh sách kiểm tra để kiểm thử hiệu suất web:

:small_blue_diamond: Hành vi, các hoạt động của trang web phải được quan sát trong điều kiện tải bình thường và cao điểm.

:small_blue_diamond: Hiệu suất của trang web nên được kiểm tra bằng cách đo thời gian phản hồi, tốc độ, khả năng mở rộng và sử dụng tài nguyên.

:small_blue_diamond: Proper RCA (phân tích nguyên nhân - root cause analysis) nên được thực hiện với một giải pháp nếu hệ thống bị hỏng hoặc không ổn định tại bất kỳ thời điểm nào.

:small_blue_diamond: Các vấn đề về độ trễ mạng cần được xác định nếu có

:x: Đối với một số web thương mại, cần chú ý với trường hợp: Trong thời gian bán hàng, người dùng truy cập trang web sẽ tăng lên gấp bội. Ngoài ra, hành vi của trang web cần được kiểm tra khi nhiều người dùng đồng thời truy cập cùng một mặt hàng hoặc thực hiện các hành động giống nhau (như giao dịch hoặc đặt hàng) trên trang web.  
:x: Bên cạnh đó, cần sử dụng một nhóm người dùng mô phỏng trong điều kiện tải bình thường cũng như cao điểm (có thể trong ”Mùa giảm giá”) để việc kiểm tra kỹ lưỡng hơn.

:arrow_forward: Có nhiều công cụ khác nhau có sẵn trên thị trường để kiểm tra hiệu suất, ví dụ như: LoadRunner, WinRunner, Silk Performer, JMeter, v.v.

## 6. Dữ liệu được nhập trên ứng dụng/ trang web có được lưu trữ chính xác và tồn tại qua các phiên bản?
:negative_squared_cross_mark: Cơ sở dữ liệu là một trong những thành phần quan trọng của ứng dụng/ web, là nơi chứa thông tin đầy đủ được nhập thông qua chính ứng dụng/ trang web đó. Do đó, để đảm bảo rằng dữ liệu người dùng chính xác được lưu trong các bảng cơ sở dữ liệu, mà không cần bất kỳ thao tác nào và để duy trì tính toàn vẹn của dữ liệu, các xác minh dưới đây nên được thực hiện:

:low_brightness: Xác minh tính nhất quán của dữ liệu trên giao diện người dùng, tức là giao diện người dùng và cơ sở dữ liệu của ứng dụng/ web.

:low_brightness: Xác minh rằng các bảng DB đang cập nhật đúng cách bất cứ khi nào các hành động thêm / cập nhật / xóa được thực hiện bởi một ứng dụng/ trang web.

:low_brightness: Xác minh thời gian phản hồi của các truy vấn kỹ thuật và tinh chỉnh chúng nếu cần.

:low_brightness: Kiểm tra kết nối DB và quyền truy cập. 

## 7. Ứng dụng/ trang web có được tích hợp tốt với các giao thức khác trong quy trình làm việc không?
:negative_squared_cross_mark: Kiểm tra mức độ giao thức (Interface level testing) được thực hiện để kiểm tra sự tương tác mượt mà của ứng dụng/ web với các giao diện khác nhau như Web Server & Database Server.

:negative_squared_cross_mark: Trong quá trình kiểm tra giao thức, người kiểm tra cần đảm bảo liệu các yêu cầu ứng dụng được gửi đúng cách đến cơ sở dữ liệu và thông tin chính xác được hiển thị cho máy client dưới dạng đầu ra. Web server không nên đưa ra bất kỳ ngoại lệ từ chối nào vào bất kỳ thời điểm nào và cơ sở dữ liệu phải luôn đồng bộ với ứng dụng.

## 8. Liệu ứng dụng/ web có hoạt động như mong đợi ngay cả sau khi đã hoạt động?
:diamond_shape_with_a_dot_inside: Một khi ứng dụng/ web chuyển sang môi trường production, việc kiểm tra thường xuyên cần được thực hiện để đảm bảo chất lượng. Các trường hợp kiểm thử dưới đây có thể được xem xét khi thực hiện việc kiểm thử ở môi trường production:

:black_small_square: Kiểm tra ứng dụng/ web phải được thực hiện định kỳ và nhật ký kiểm tra phải được lưu làm bằng chứng về việc tuân thủ Thỏa thuận mức dịch vụ (Service Level Agreement - SLA).

:black_small_square:Hệ thống tự động điều chỉnh tỷ lệ và bộ cân bằng tải phải được kiểm tra xem có đúng vị trí và hoạt động không.

:black_small_square: Duy trì kiểm tra trải nghiệm của người dùng cuối và cố gắng phát hiện ra các khiếm khuyết hoặc các cuộc tấn công độc hại có thể bị bỏ sót trong quá trình kiểm thử với môi trường dev.

:black_small_square: Theo dõi thời gian phản hồi của sản phẩm trong thời gian tải cao điểm.

:black_small_square: Thực hiện các Edge level test trong thời gian thực để xác định lỗi mạng, lỗi kết nối hoặc gián đoạn bởi một cuộc gọi bất ngờ.

## Lời kết:
`Hy vọng bài viết này sẽ giúp bạn hiểu thêm các khía cạnh khác nhau của kiểm thử ứng dụng/ web. Với mình, qua bài viết này sẽ giúp mình cải thiện hơn nữa về mindset của QA không chỉ là thực hiện việc testing các chức năng của ứng dụng trang web, mà cần phát triển hơn nữa tư duy người dùng cuối, từ đó trau dồi và phát triển kỹ năng testing của bản thân, giúp cho việc kiểm thử hoàn thiện hơn, chất lượng công việc nâng cao hơn.`

**Link tham khảo:**  https://www.softwaretestinghelp.com/web-application-testing/