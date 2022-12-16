**Kiểm thử web là gì?**

Kiểm thử web theo thuật ngữ đơn giản là kiểm tra ứng dụng web của bạn để tìm lỗi tiềm ẩn trước khi deloy lên môi trường production. 
Trong giai đoạn này, các vấn đề như bảo mật ứng dụng web, chức năng trang web, quyền truy cập và khả năng xử lý lưu lượng của nó sẽ được kiểm thử.

**Cách kiểm thử trang web**

Các bước kiểm thử có thể được thực hiện tùy thuộc vào yêu cầu kiểm thử web của bạn. 

Một ứng dụng web thường có rất nhiều nhóm người sử dụng với nhiều nền tảng khác nhau (hệ điều hành, trình duyệt…), người ta cũng rất khó có thể đoán được số lượng người sử dụng một ứng dụng web là bao nhiêu, rồi thời gian hồi đáp yêu cầu của người sử dụng đối với ứng dụng là một trong những yếu tố mang tính quyết định thành bại của ứng dụng…dẫn đến việc kiểm thử ứng dụng web sẽ có những khác biệt nhất định so với kiểm thử phần mềm truyền thống. Trong đó, kiểm thử giao diện người dùng, kiểm thử hiệu năng và kiểm thử bảo mật là những loại kiểm thử mà ứng dụng web cần chú trọng. 
<br>
Sau đây người viết xin giới thiệu 8 bước kiểm thử ứng dụng web

# 1. Kiểm thử chức năng

Việc kiểm thử chức năng đòi hỏi tester phải thực hiện test tất cả các chức năng chính các link trong trang web, định dạng được sử dụng trong các trang web để gửi và nhận các thông tin cần thiết từ người dùng. Ngoài ra còn có kết nối cơ sở dữ liệu, kiểm tra cookies và xác minh HTML/CSS.
<br>

## Test link

Kiểm tra tất cả các link trong trang web của bạn đang hoạt động chính xác và đảm bảo không có liên kết (links) nào bị chết bị hỏng. Link được kiểm thử bao gồm:
- Liên kết ngoài trang web
- Liên kết nội bộ
- Liên kết tới các vị trí trong cùng trang
- Liên kết sử dụng để gửi email tới admin hoặc người dùng khác trong trang...

## Test Forms

Kiểm tra forms của các trang đảm bảo đã hoạt động như mong đợi, bao gồm các yêu cầu sau:

- Kiểm tra các trường của trang đã hoạt động đúng hay chưa. Ví dụ: nếu người dùng không nhập vào các trường bắt buộc thì có hiển thị thông báo lỗi hay không?
- Kiểm tra giá trị mặc định của các trường là gì?
- Nhập đầu vào không đúng validate của các trường thì sao?
- Thao tác trên các trường: xem, nhập, lưu, sửa, xóa…có ổn định hay không
- Các form có thân thiện dễ nhìn và dễ thao tác hay không?

## Test Cookies

Kiểm thử Cookies có đang hoạt động như mong đợi. Cookies là các tệp được tạo bởi trang web đã truy cập để lưu trữ thông tin duyệt web, như các tùy chọn trang web hoặc thông tin đăng nhập của người dùng. Người dùng có thể tùy chỉnh trên trình duyệt nhằm quản lý cookies, thực hiện các thao tác cho phép lưu, hoặc xóa, hoặc chặn…để kiểm thử các tính năng lưu hoặc không lưu trạng thái đăng nhập, tính năng bảo mật của ứng dụng web. Test Cookies sẽ bao gồm:

- Kiểm tra cookie (sessions) sẽ bị xóa khi xóa bộ nhớ cache hoặc khi chúng hết hạn.
- Xóa cookie (sessions) và kiểm tra thông tin đăng nhập có được yêu cầu khi bạn truy cập trang web lần sau.


## Test HTML and CSS


Xác minh HTML/CSS: việc xác minh này đặc biệt quan trọng khi developer thực hiện tối ưu hóa trang web cho các công cụ tìm kiếm, chủ yếu liên quan tới lỗi cú pháp HTML. Tester sẽ kiểm thử xem trang web có được nhận diện bởi các công cụ tìm kiếm khác nhau hay không (ví dụ: Google, Yahoo, Bing…) 

## Test business workflow

Bao gồm: 
- Kiểm thử các test case từ khi bắt đầu đến lúc kết thúc, giúp người dùng có thể đi qua theo 1 flow của trang web
- Kiểm thử các test case abnormal để khi người dùng thực hiện một số bước unexpected thì sẽ thông báo lỗi hoặc có tương tác phù hợp sẽ được hiển thị để người dùng có thể biết khi thao tác.

# 2. Kiểm thử tính khả dụng

Kiểm thử tính khả dụng hiện đã trở thành một phần quan trọng của bất kỳ dự án nào. Nó có thể được thực hiện bởi Tester, dev, hoặc bất cứ người nào trong dự án. 

Tính khả dụng của trang web được định nghĩa là trang web dễ sử dụng, có hướng dẫn sử dụng rõ ràng, rành mạch, mỗi trang đều có menu chính và menu này phải nhất quán. Tester cần lưu ý những điều này.

- Kiểm tra Navigation: Menu, button, textbox, breadcrum hoặc link đến các trang khác nhau trên trang web của bạn phải dễ nhìn thấy và nhất quán trên tất cả các trang web.
- Kiểm tra nội dung: nội dung phải dễ đọc không có lỗi chính tả hoặc ngữ pháp, thân thiện với người dùng. Hình ảnh được sắp xếp gọn gàng, hợp lý.

# 3. Kiểm thử giao diện

3 lĩnh vực sẽ được kiểm thử ở đây là: Ứng dụng, Web Sever và Database Sever

- Ứng dụng: Yêu cầu kiểm thử được gửi chính xác đến Database và đầu ra ở phía client được hiển thị chính xác. Nếu có lỗi trả về thì ứng dụng thì ngay lập tức phải nhận được và cho hiển thị cảnh báo tới người dùng.
- Web Sever: Test web sever là kiểm thử quá trình xử lý tất cả các yêu cầu của ứng dụng mà không xảy ra bất kỳ lỗi nào được trả về.
- Database Sever: Đảm bảo các truy vấn được gửi đến cơ sở dữ liệu như kết quả được mong đợi.

Kiểm thử các trường hợp khi kết nối giữa 3 lớp (ứng dụng, web và database) bị ngắt đột ngột do người dùng, hoặc kết nối tới sever bị gián đoạn, bị khởi động lại...

# 4. Kiểm thử Database

Database là một thành phần quan trọng trong ứng dụng web của bạn và phải kiểm thử kỹ lưỡng. Các hoạt động kiểm thử sẽ bao gồm:

- Nếu có bất kỳ lỗi nào được hiển thị trong khi thực hiện các truy vấn.
- Tính toàn vẹn dữ liệu được duy trì trong khi tạo, cập nhật hoặc xóa dữ liệu trong database.
- Kiểm tra thời gian phản hồi của các truy vấn và tinh chỉnh lại nếu cần thiết.
- Kiểm tra dữ liệu lấy từ database của bạn được hiển thị chính xác trong ứng dụng

# 5. Kiểm thử khả năng tương thích

Kiểm thử khả năng tương thích đảm bảo rằng ứng dụng web của bạn hiển thị chính xác trên các thiết bị khác nhau. Tester cần lưu ý những điều sau:

- Tương thích với trình duyệt (trên máy tính và trên điện thoại di động): cùng một trang web trong các trình duyệt khác nhau sẽ hiển thị khác nhau. Bạn cần kiểm thử xem ứng dụng web của bạn có được hiển thị chính xác trên các trình duyệt hay không. Cần phải kiểm thử ứng dụng web trên càng nhiều trình duyệt càng tốt (IE, Firefox, Chrome, Safari, Opera...) để kiểm thử tương thích. Kiểm tra trên cả các phiên bản khác nhau của trình duyệt. Kiểm thử trên cả trình duyệt của thiết bị điện thoại thông minh. Nếu ứng dụng chạy tốt hơn, hoặc có ưu tiên tương thích hơn với trình duyệt nào đó thì cần có thông báo tới người dùng.
- Tương thích với hệ điều hành: một số chức năng của ứng dụng có thể không tương thích với một số hệ điều hành, hoặc có những lưu ý khác khi sử dụng, điều này cần phải được kiểm thử kỹ và thông báo cho người dùng được biết.

- Tương thích với các thiết bị ngoại vi (máy in…): khi người dùng có lệnh in trang thì phải đảm bảo tính chính xác của fonts, cỡ chữ, cỡ giấy…mà người dùng đã chọn.

# 6. Kiểm thử hiệu năng (Performance)

Kiểm tra hiệu năng sẽ đảm bảo trang web của bạn hoạt động dưới tất cả các tải. Bao gồm các yêu cầu:
- Thời gian phản hồi của ứng dụng trang web ở các tốc độ kết nối khác nhau
- Stress test ứng dụng web của bạn để xác định hành vi của nó vẫn hoạt động bình thường vào tầm cao điểm. 
- Stress test trang web của bạn để xác định điểm dừng của nó khi được đẩy vượt quá tải bình thường vào tầm cao điểm sẽ ra sao.
- Kiểm tra xem nếu có sự cố xảy ra do tải cao điểm, làm thế nào để trang web phục hồi sau sự cố đó.
- Đảm bảo các kỹ thuật tối ưu hóa như nén zip, bộ đệm phía trình duyệt và máy chủ được bật để giảm thời gian tải.


Tóm lại cần kiểm thử tải và kiểm thử áp lực

# 7. Kiểm thử bảo mật (Security)

Kiểm thử bảo mật là rất quan trọng đối với mỗi trang web thương mại điện tử lưu trữ thông tin khách hàng hoặc thông tin nhạy cảm đó là thẻ tín dụng. Bao gồm:

- Gõ trực tiếp URL vào thanh địa chỉ của trình duyệt mà không qua đăng nhập. Các trang nội bộ phải được bảo mật.
-  Sau khi đăng nhập và mở các trang nội bộ, thay đổi url trực tiếp bằng cách đổi tham số ID của trang tới trang thuộc quyền người dùng đã đăng nhập khác. Truy cập phải bị từ chối bởi người dùng này không thể xem trang thống kê của người dùng khác.
- Không thể tải xuống các tệp bị hạn chế nếu không có quyền truy cập phù hợp
- Sessions sẽ tự động bị hủy sau khi người dùng không hoạt động trong một thời gian 
- Nhập các giá trị đầu vào không hợp lệ trong các trường Username, Password thì hệ thống phải báo lỗi.
- Kiểm tra CAPTCHA cho các đăng nhập tự động
- Tất cả các phiên giao dịch, các thông báo lỗi, các hành vi cố gắng xâm phạm an ninh phải ghi trong log và lưu tại web server.

# 8. Crowd Testing

Bạn sẽ chọn một số lượng lớn người (crowd) để thực hiện các bài kiểm tra mà nếu không thì sẽ thực hiện một nhóm người được chọn trong công ty. Crowd testing là một khái niệm thú vị và giúp làm sáng tỏ nhiều khiếm khuyết không được chú ý.

Nó bao gồm hầu hết tất cả các loại kiểm thử áp dụng cho ứng dụng web của bạn

Là một Tester test web, điều quan trọng cần lưu ý khi kiểm thẻ web là một quá trình khá khó khăn và bạn nhất định sẽ gặp nhiều trở ngại. Một trong những vấn đề lớn mà bạn sẽ phải đối mặt đó là áp lực deadline. Hãy chắc chắn rằng bạn lập kế hoạch công việc của bạn và biết rõ những gì bạn muốn. Nó xác định tốt nhất tất cả các nhiệm vụ liên quan đến kiểm thử web của bạn và sau đó tạo một biểu đồ công việc để ước tính và lập kế hoạch chính xác.




*Nguồn dịch: https://www.guru99.com/web-application-testing.html*