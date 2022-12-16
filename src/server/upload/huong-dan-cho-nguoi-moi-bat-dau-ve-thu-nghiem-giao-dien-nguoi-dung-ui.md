## Kiểm tra GUI là gì?

Nếu sự khởi đầu của sự khôn ngoan là định nghĩa của các thuật ngữ, thì sự hiểu biết về kiểm thử GUI phải bắt đầu bằng định nghĩa của thuật ngữ GUI. Đây là từ viết tắt của Giao diện người dùng đồ họa, hoặc một phần của ứng dụng hiển thị cho người dùng. GUI có thể chứa các phần tử như menu, nút, hộp văn bản và hình ảnh. Một trong những GUI thành công đầu tiên là Apple Macintosh, đã phổ biến khái niệm "máy tính để bàn" của người dùng hoàn chỉnh với các thư mục tệp, lịch, thùng rác và máy tính.Trong môi trường thử nghiệm GUI ngày nay, “ứng dụng máy tính đơn giản” không còn giới hạn ở màn hình máy tính nữa. Nó có thể là một ứng dụng di động có sẵn trên tất cả các nền tảng di động chính. Hoặc, nó có thể là một ứng dụng đám mây phải được hỗ trợ bởi tất cả các trình duyệt chính. Người kiểm tra phải thực hiện kiểm tra đa trình duyệt và đa nền tảng để xác định các khiếm khuyết và đảm bảo rằng ứng dụng đáp ứng tất cả các yêu cầu. Do đó, kiểm tra GUI đề cập đến việc kiểm tra các chức năng của một ứng dụng mà người dùng có thể nhìn thấy. Trong ví dụ về ứng dụng máy tính, điều này sẽ bao gồm việc xác minh rằng ứng dụng có phản hồi chính xác với các sự kiện như nhấp vào số và nút chức năng hay không. Kiểm tra GUI cũng sẽ xác nhận rằng các yếu tố ngoại hình như phông chữ và hình ảnh tuân theo các thông số kỹ thuật thiết kế.

# Thử nghiệm giao diện người dùng có giống như thử nghiệm GUI không?

Một thách thức khi học về kiểm thử phần mềm là có rất nhiều thuật ngữ trong ngành và những thuật ngữ này thường có ý nghĩa trùng lặp hoặc được sử dụng không nhất quán. Ví dụ: thử nghiệm giao diện người dùng (UI) tương tự như thử nghiệm GUI và hai thuật ngữ này thường được coi là từ đồng nghĩa. Tuy nhiên, UI là một khái niệm rộng hơn có thể bao gồm cả GUI và Giao diện dòng lệnh (CLI). CLI cho phép người dùng tương tác với hệ thống máy tính thông qua các lệnh và phản hồi văn bản. Mặc dù CLI có trước GUI nhưng chúng vẫn được sử dụng ngày nay và thường được các quản trị viên và nhà phát triển hệ thống ưa thích. Kiểm tra GUI cũng sẽ xác nhận rằng các yếu tố ngoại hình như phông chữ và màu sắc tuân theo các thông số kỹ thuật thiết kế.

# Kiểm thử GUI phù hợp ở đâu trong vòng đời phát triển phần mềm?

## Test Levels

Mức thử nghiệm cho bạn biết khi nào thử nghiệm xảy ra trong vòng đời phát triển. Mỗi cấp độ tương ứng với một giai đoạn của vòng đời phát triển. Các cấp độ kiểm tra ISTQB là kiểm thử thành phần (còn gọi là kiểm thử đơn vị), kiểm thử tích hợp, kiểm thử hệ thống và kiểm thử chấp nhận.

### Component testing

Kiểm thử thành phần kiểm tra các đơn vị mã riêng lẻ. Kiểm thử thành phần thường được gọi là kiểm thử đơn vị, nhưng cũng có thể được gọi là kiểm thử mô-đun hoặc kiểm thử chương trình. Các nhà phát triển viết và thực hiện các bài kiểm tra đơn vị để tìm và sửa các lỗi trong mã của họ càng sớm càng tốt trong quá trình phát triển. Điều này rất quan trọng trong các môi trường phát triển nhanh, nơi các chu kỳ phát hành ngắn yêu cầu phản hồi thử nghiệm nhanh. Bài kiểm tra đơn vị là bài kiểm tra hộp trắng vì chúng được viết với kiến ​​thức về mã được kiểm tra.

### Integration testing

Kiểm thử tích hợp kết hợp các đơn vị riêng lẻ và kiểm tra sự tương tác của chúng. Một loại thử nghiệm tích hợp phổ biến là thử nghiệm giao diện / API. Giao diện lập trình ứng dụng (API) là một tập hợp các quy tắc mà hai mô-đun mã sử dụng để giao tiếp với nhau. Kiểm tra giao diện / API xác nhận tương tác này. Bởi vì các quy tắc API có xu hướng rất ổn định trong bất kỳ ứng dụng nhất định nào, các bài kiểm tra API là ứng cử viên tốt cho tự động hóa. Kiểm tra giao diện / API cũng là kiểm tra hộp trắng vì chúng yêu cầu kiến ​​thức về mã được kiểm tra.
Biểu tượng kiểm tra hệ thống

### System testing

Kiểm tra hệ thống xác minh rằng một hệ thống tích hợp hoàn chỉnh hoạt động như thiết kế. Vì không cần kiến ​​thức về mã cơ bản, đây là thử nghiệm hộp đen. Kiểm thử hệ thống là cấp độ mà kiểm tra GUI xảy ra.

### Acceptance testing

Kiểm tra chấp nhận thường được thực hiện bởi người dùng cuối hoặc proxy của họ, chẳng hạn như chủ sở hữu sản phẩm. Mục tiêu của thử nghiệm chấp nhận người dùng (UAT) là để đảm bảo rằng ứng dụng giải quyết được nhu cầu của khách hàng.

## Test Types
Loại kiểm tra cho bạn biết những gì đang được kiểm tra. Dưới đây là các loại thử nghiệm do ITSQB xác định.

### Functional testing

Kiểm thử chức năng so sánh một ứng dụng với các thông số kỹ thuật chức năng của nó để đảm bảo rằng ứng dụng đó thực hiện những gì nó phải làm. Trong trường hợp ứng dụng máy tính, kiểm tra chức năng sẽ đảm bảo rằng tất cả các phép toán hoạt động chính xác và bộ nhớ và các nút gọi lại lưu và trả lại dữ liệu đúng cách. Kiểm tra chức năng trả lời các câu hỏi như, "Việc xử lý lỗi chia cho 0 có hoạt động đúng không?" Kiểm thử GUI là một ví dụ về kiểm thử chức năng.

### Non-functional testing

Kiểm thử phi chức năng kiểm tra xem hệ thống hoạt động tốt như thế nào hơn là các chức năng cụ thể của nó. Kiểm thử phi chức năng xem xét các yếu tố như khả năng sử dụng, khả năng đáp ứng và khả năng mở rộng. Loại thử nghiệm này trả lời các câu hỏi như "Làm thế nào dễ dàng để thực hiện phép chia với ứng dụng này?" và "Ứng dụng này có hiển thị phù hợp trên các màn hình có kích thước khác nhau không?" Kiểm tra GUI về khả năng sử dụng là một ví dụ về kiểm thử phi chức năng.

### Structural testing

Kiểm tra cấu trúc là một cách tiếp cận hộp trắng. Nó xác minh rằng tất cả các thành phần của hệ thống được bao phủ bởi một thử nghiệm thích hợp. Nếu tìm thấy các khoảng trống về độ che phủ, thì các thử nghiệm bổ sung có thể được thiết kế để đảm bảo rằng mỗi thành phần được thử nghiệm đúng cách.

### Regression testing

Kiểm tra hồi quy liên quan đến việc chạy lại các kiểm tra đã thành công trước đó sau khi thay đổi mã, để xác nhận rằng không có lỗi bổ sung (hồi quy) nào được đưa vào. Kiểm tra hồi quy là lý tưởng cho tự động hóa vì chúng thường được lặp lại.

### End-to-end testing

Kiểm tra end-to-end xác nhận quy trình làm việc của hệ thống. Ví dụ: thử nghiệm từ đầu đến cuối đối với ứng dụng mua hàng sẽ đảm bảo rằng người dùng có thể tìm kiếm một mặt hàng, thêm mặt hàng đó vào giỏ hàng, nhập chi tiết thanh toán và giao hàng và hoàn tất giao dịch mua.

# Tại sao kiểm tra GUI lại quan trọng?
Trong phát triển phần mềm, chất lượng được định nghĩa là cung cấp một ứng dụng có chức năng và tính dễ sử dụng để đáp ứng nhu cầu của khách hàng và càng không có lỗi càng tốt. Người ta đã nói rằng “bạn không thể kiểm tra chất lượng thành một sản phẩm. Chất lượng ở đó hay không ở thời điểm nó được kiểm tra ”. Trích dẫn này nói về việc thử nghiệm một sản phẩm đã hoàn thiện như ô tô, nhưng nguyên tắc này cũng áp dụng cho phát triển phần mềm. Để cải thiện chất lượng, các nhóm phát triển tìm cách xây dựng nó vào các dự án của họ ngay từ đầu. Một cách để làm điều này là di chuyển thử nghiệm sớm hơn trong vòng đời phát triển phần mềm, một cách tiếp cận còn được gọi là thử nghiệm Shift Left.
Thay vì chờ đợi kiểm tra hệ thống sau khi ứng dụng hoàn tất, các nhóm phát triển tăng thời gian và tài nguyên dành cho việc kiểm tra đơn vị và giao diện. Việc phát hiện sớm các lỗi trong quá trình phát triển giúp giảm chi phí giải quyết chúng. Ngoài ra, các bài kiểm tra đơn vị và giao diện / API rất phù hợp cho tự động hóa: các bài kiểm tra đơn vị có thể được tạo bởi các nhà phát triển khi họ viết mã, trong khi các API có xu hướng rất ổn định và do đó yêu cầu bảo trì ít hơn các bài kiểm tra GUI. Với việc nhấn mạnh vào thử nghiệm Shift Left, có vẻ như thử nghiệm GUI không quan trọng. Rốt cuộc, kiểm tra GUI thủ công có thể tốn nhiều thời gian và tài nguyên. Và tự động hóa thử nghiệm là thách thức hơn đối với GUI: Vì giao diện người dùng có thể thay đổi thường xuyên, các thử nghiệm GUI tự động đã hoạt động trước đó có thể bị hỏng, đòi hỏi nỗ lực đáng kể để duy trì chúng. Nhưng kiểm thử đơn vị và giao diện không thể đánh giá tất cả các lĩnh vực của hệ thống, đặc biệt là các khía cạnh quan trọng của quy trình làm việc và khả năng sử dụng. Đặc biệt, các bài kiểm tra này chỉ có thể xác minh mã tồn tại. Họ không thể đánh giá chức năng có thể bị thiếu hoặc các vấn đề với các yếu tố hình ảnh và tính dễ sử dụng của ứng dụng. Đây là giá trị của thử nghiệm GUI, được thực hiện từ quan điểm của người dùng chứ không phải là nhà phát triển. Bằng cách phân tích một ứng dụng theo quan điểm của người dùng, kiểm thử GUI có thể cung cấp cho nhóm dự án thông tin họ cần để quyết định xem một ứng dụng đã sẵn sàng để triển khai hay chưa.

# Cách viết kế hoạch thử nghiệm GUI

Một kế hoạch thử nghiệm GUI đặt phạm vi của một dự án thử nghiệm. Trước khi viết các trường hợp thử nghiệm, điều quan trọng là phải có một kế hoạch thử nghiệm xác định các tài nguyên có sẵn để thử nghiệm và ưu tiên các khu vực của ứng dụng sẽ được thử nghiệm. Với thông tin này, nhóm thử nghiệm có thể tạo điều lệ thử nghiệm cho thử nghiệm khám phá và các kịch bản thử nghiệm, trường hợp thử nghiệm và tập lệnh thử nghiệm cho thử nghiệm theo kịch bản.

Kế hoạch kiểm tra xác định thông tin chính bao gồm:
1. Dự kiến ​​ngày thử nghiệm
1. Nhân sự cần thiết
1. Tài nguyên cần thiết, chẳng hạn như phần cứng vật lý, máy chủ ảo hoặc dựa trên đám mây và các công cụ như phần mềm tự động hóa
1. Các môi trường thử nghiệm mục tiêu, chẳng hạn như máy tính để bàn, thiết bị di động hoặc web có trình duyệt được hỗ trợ
1. Các quy trình và sự kiện của AUT sẽ được kiểm tra, cũng như thiết kế trực quan, khả năng sử dụng và hiệu suất của AUT.
1. Các kỹ thuật thử nghiệm có kế hoạch, bao gồm thử nghiệm theo tập lệnh, thử nghiệm khám phá và thử nghiệm trải nghiệm người dùng.
1. Các mục tiêu để kiểm tra bao gồm các tiêu chí để xác định sự thành công hay thất bại của nỗ lực kiểm tra tổng thể.

# Cách viết các trường hợp thử nghiệm GUI

Để viết một trường hợp thử nghiệm GUI, hãy bắt đầu với mô tả về sự kiện GUI sẽ được thử nghiệm, chẳng hạn như một lần đăng nhập. Sau đó, thêm các điều kiện và thủ tục để thực hiện kiểm tra. Cuối cùng, xác định kết quả mong đợi của thử nghiệm và tiêu chí để xác định xem thử nghiệm thành công hay thất bại.

Việc viết các thủ tục chung hay chi tiết phụ thuộc vào các yếu tố như:

1. Mức độ kinh nghiệm của người thử nghiệm, cả với thử nghiệm GUI nói chung và với ứng dụng cụ thể đang được thử nghiệm. Những người thử nghiệm ít kinh nghiệm hơn có thể cần các quy trình chi tiết hơn.
1. Tần suất thay đổi giao diện người dùng. Nếu một giao diện thay đổi thường xuyên, việc duy trì các thủ tục chi tiết đòi hỏi nhiều nỗ lực hơn.
1. Người dùng cuối sẽ có bao nhiêu tự do khi điều hướng qua ứng dụng. Nếu người dùng có nhiều quyền tự do, bạn có thể viết các thủ tục để bao gồm tất cả các đường dẫn hướng có thể có hoặc dựa vào khả năng của người thử nghiệm để dự đoán các đường dẫn ngẫu nhiên mà người dùng có thể đi.

Nếu người kiểm tra chỉ cần các quy trình chung, thì những quy trình này có thể xuất hiện trong chính trường hợp kiểm thử. Nếu người kiểm tra cần các quy trình chi tiết, việc đưa những quy trình này vào một kịch bản kiểm tra riêng có thể giúp làm cho các thử nghiệm của bạn dễ bảo trì hơn.
## Testcase cho GUI

1. Tất cả các trường bắt buộc phải được xác thực và biểu thị bằng biểu tượng dấu hoa thị (*)
1. Thông báo lỗi xác thực phải được hiển thị đúng ở vị trí chính xác
1. Tất cả các thông báo lỗi phải được hiển thị theo cùng một kiểu CSS (ví dụ: sử dụng màu đỏ)
1. Thông báo xác nhận chung phải được hiển thị bằng kiểu CSS khác với kiểu thông báo lỗi (ví dụ: sử dụng màu xanh lá cây)
1. Các trường thả xuống phải có mục nhập đầu tiên là trống hoặc văn bản như 'Chọn'
1. Xóa chức năng cho bất kỳ bản ghi nào trên trang nên yêu cầu xác nhận
1. Sắp xếp trang mặc định nên được cung cấp
1. Đặt lại chức năng của nút phải đặt giá trị mặc định cho tất cả các trường
1. Tất cả các giá trị số phải được định dạng đúng
1. Các trường đầu vào phải được kiểm tra giá trị trường tối đa. Giá trị đầu vào lớn hơn giới hạn tối đa đã chỉ định sẽ không được chấp nhận hoặc lưu trữ trong cơ sở dữ liệu
1. Kiểm tra tất cả các trường đầu vào để tìm các ký tự đặc biệt
1. Các nhãn trường phải là tiêu chuẩn, ví dụ: trường chấp nhận tên của người dùng phải được gắn nhãn chính xác là "First Name"
1. Kiểm tra chức năng sắp xếp trang sau các thao tác thêm / sửa / xóa trên bất kỳ bản ghi nào
1. Kiểm tra cookie được sử dụng trong một ứng dụng
1. Kiểm tra chức năng thời gian chờ. Giá trị thời gian chờ phải được định cấu hình. Kiểm tra hành vi của ứng dụng sau khi hết thời gian hoạt động
1. Kiểm tra xem các tệp có thể tải xuống có trỏ đến đúng đường dẫn tệp không
1. Sự cố ứng dụng hoặc các trang không khả dụng sẽ được chuyển hướng đến trang lỗi
1. Kiểm tra văn bản trên tất cả các trang để tìm lỗi chính tả và ngữ pháp
1. Kiểm tra các trường nhập số với giá trị đầu vào ký tự. Thông báo xác thực thích hợp sẽ xuất hiện
1. Kiểm tra các số âm nếu được phép đối với các trường số 27.
1. Kiểm tra chức năng của các nút có sẵn trên tất cả các trang
1. Kiểm tra các trường số tiền với các giá trị số thập phân
1. Người dùng sẽ không thể gửi trang hai lần bằng cách nhấn nút gửi liên tiếp.
1. Tất cả các trường trên trang (ví dụ: hộp văn bản, tùy chọn radio, danh sách thả xuống) phải được căn chỉnh chính xác
1. Phải cung cấp đủ không gian giữa các nhãn trường, cột, hàng, thông báo lỗi, v.v.
1. Thanh cuộn chỉ nên được bật khi cần thiết
1. Các trường bị vô hiệu hóa sẽ chuyển sang màu xám và người dùng sẽ không thể tập trung vào các trường này
1. Mô tả, hộp văn bản Địa chỉ phải có nhiều dòng
1. Người dùng sẽ không thể nhập danh sách chọn lọc thả xuống
1. Thông tin do người dùng điền phải vẫn còn nguyên vẹn khi có thông báo lỗi trên trang gửi. Người dùng sẽ có thể gửi lại biểu mẫu bằng cách sửa lỗi
1. Kiểm tra xem nhãn trường thích hợp có được sử dụng trong thông báo lỗi không
1. Giá trị trường thả xuống phải được hiển thị theo thứ tự sắp xếp xác định
1. Thứ tự tab phải hoạt động bình thường
1. Kiểm tra xem các trường đúng có được đánh dấu trong trường hợp có lỗi không
1. Kiểm tra xem các tùy chọn danh sách thả xuống có thể đọc được và không bị cắt bớt do giới hạn kích thước trường hay không
1. Kiểm tra tất cả các trang để tìm các liên kết bị hỏng
1. Tất cả các trang phải có tiêu đề
1. Người dùng chỉ có thể chọn một tùy chọn radio và bất kỳ kết hợp nào cho các hộp kiểm

# Tài liệu tham khảo 
https://www.ranorex.com/resources/testing-wiki/gui-testing/
https://reqtest.com/testing-blog/gui-testing-tutorial/