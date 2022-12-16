![](https://images.viblo.asia/9016f929-92ac-4dcc-9dbe-7376e8595b80.jpg)
# Cuộc chiến Fork trong Bitcoin là một cuộc nội chiến
Trước khi hiểu bitcoin fork là gì, thì ai cũng hiểu fork trong lập trình là một kỹ thuật để " cập nhập phần mềm " hoặc " sửa lỗi ". Cách sử dụng fork chúng ta vẫn thường xuyên sử dụng trên git hoặc update 1 ứng dụng nào đó trên smartphone. Và Bitcoin fork cũng tương tự như việc fork đó, tuy nhiên nó lại có chủ thế là "bitcoin" và nó có 2 dạng fork là " soft fork " và " hard fork".
![](https://images.viblo.asia/00ff0568-c94e-457f-b11c-916936424cd3.jpg)
## Soft fork là gì?
Từ cách đặt tên này, chúng ta cũng dễ dàng liên tưởng đây là một đợt cập nhập phần mềm và không hề xung đột với các phiên bản cũ, điều này có thể không bắt buộc và có thể cho phép mạng lưới của bitcoin điều chỉnh các tính năng mới. Việc fork này có thể cập nhập và không ảnh hưởng gì đến mạng lưới chung của bitcoin hay với những node không cập nhập.
Nếu như việc cập nhập này không tăng tính hiệu quả mà ngược lại gây ra lỗi hoặc không được chào đón thì hoàn toàn có thể đảo ngược quy trình để trở về phiên bản trước đó. Phần này mình sẽ không đi sâu vào các phiên bản soft fork.
![](https://images.viblo.asia/81645f29-2994-4428-8dae-5a4531b9ba29.jpg)
## Hard Fork là gì? 
Hard Fork - là một phiên bản cập nhập mới, các thay đổi mang tính bắt buộc thay thế phiên bản cũ tránh trường hợp phát sinh lỗi không mong muốn hoặc không thể truy cập.
Bản chất của hard fork là tạo ra version mới và thay thế hoàn toàn version cũ ( ví dụ từ 1.0 lên 2.0 ). Điều này giống như việc hệ điều hành cập nhập thì các phần mềm nếu không muốn phát sinh lỗi không mong muốn thì bạn bắt buộc phải cập nhập phần mềm lên version cao hơn.
Khác hoàn toàn với soft fork thì hard fork không thể đảo ngược một hard fork ( nếu phát sinh lỗi trong quá trình này thì chỉ có thể sinh ra thêm 1 hard fork khác chứ không thể rollback về version trước nó )

Sâu xa hơn thì HardFork là một sự phân kỳ vĩnh viễn chuỗi khối, các node không được nâng cấp sẽ không thể xác nhận các Block mới được tạo ra do không theo sát các quy định về xác thực dành cho block mới. Do đó việc hardfork xảy ra sẽ bắt buộc tất cả các node người dùng nâng cấp đến phiên bản mới nhất trên giao thức.

Lần HardFork của bitcoin core gần nhất được biết đến là năm 2017 khi mà bitcoin gặp vấn đề kích thước khối (block) không đủ đáp ứng nhu cầu của mạng lưới ( tại thời điểm đó mỗi block giới hạn là 1MB). Các giao dịch trên mạng lưới bitcoin mất quá nhiều thời gian để thực thi và phí giao dịch thì quá lớn ( có những lúc lên đến 30$/1 giao dịch thành công ). Điều này đi ngược hoàn toàn với cách thức sinh ra bitcoin và có thể gây sụp đổ mạng lưới giao dịch của bitcoin ( chi phí quá lớn để xử lý ). 
Các giao dịch này được lưu trữ trên Blockchain ( sổ cái ), do đó với kích thước khối như vậy không đủ để sao lưu hàng trăm giao dịch mà mỗi người dùng cố gắng gửi dẫn đến vấn đề pending xác thực giao dịch, quá trình này có thể lên tới hàng giờ hoặc nhiều ngày. Để giao dịch được ưu tiên, chi phí bỏ ra cần cao hơn so với đa số các giao dịch khác ( gần giống đấu giá cho việc thực hiện giao dịch ).

Hard Fork được sinh ra khi việc Segwit thất bại ( segwit là một giải pháp để điều chỉnh lại lượng thông tin lưu trữ trong từng block).
Lần phân tách này của bitcoin đã dẫn tới tạo ra 2 đồng tiền điện tử mang cùng tên bitcoin - BTC và BCH, trong đó BTC là bản nâng cấp không mở rộng kích thước khối còn BCH thì tăng kích thước khối lên 2MB ( tối đa 8MB).
![](https://images.viblo.asia/20b38c7a-a644-4d94-ae90-9e4dcc67cdca.png)
> Tuy nhiên sau khi phân tách, bitcoin core vẫn giữ phí giao dịch khá cao ( gần 1$) nhưng BCH lại thấp hơn nhiều ( 0,2$) nhưng cộng đồng lại đón nhận bitcoin một cách mạnh mẽ hơn BCH bởi vì BCH sẽ có thể cần nâng cấp tiếp hoặc có nhiều đợt hardfork khác.
## BCH Hard Fork 2018
Ngày 15/11/2018 - Bitcoin Cash (BCH) đã hard fork ra 2 phiên bản : **Bitcoin Cash SV và Bitcoin Cash ABC**  Vấn đề tại sao BCH cần Hard Fork thì lại giống y như việc tại sao Bitcoin cần phân tách năm 2017, việc này dự báo có nhiều đợt phân tách nữa nếu BCH còn tồn tại.
![](https://images.viblo.asia/8d14da81-1c7d-45f8-88ce-1da03cc018f9.jpg)
> Lần hard Fork này của Bitcoin Cash có thể nói là cuộc nội chiến thảm khốc khi mà nó đẩy tất cả thị trường tiền điện tử lao dốc.