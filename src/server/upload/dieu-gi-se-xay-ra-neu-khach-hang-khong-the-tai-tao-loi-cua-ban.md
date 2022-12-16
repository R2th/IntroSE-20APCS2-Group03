Kiểm tra và đảm bảo chất lượng phần mềm là một thủ tục phức tạp đòi hỏi sự tận tâm, chuyên môn kỹ thuật, con mắt nhìn chi tiết và hàng giờ làm việc. Người thử nghiệm là những người đi sâu vào sản phẩm của bạn và có tác động lớn đến kết quả cuối cùng của dự án. Đó là lý do tại sao điều quan trọng là các chủ sở hữu sản phẩm không chỉ hiểu rõ tầm quan trọng của kiểm thử phần mềm mà còn cả những điểm khó của nó từ bên trong để giao tiếp hiệu quả hơn. Bài đăng hôm nay tập trung vào các vấn đề tái tạo lỗi thường vẫn tồn tại ở hậu trường đối với mọi người trừ những người kiểm tra, điều này không phải lúc nào cũng tốt cho chất lượng toàn bộ dự án phần mềm.

![](https://images.viblo.asia/67258ecf-2242-4a97-b088-22819d2e2f16.jpg)


### “Không thể tái tạo”: chúng ta đang làm gì sai?
Nhiều người kiểm tra phần mềm sớm hay muộn cũng phải đối mặt với sự cố khi khách hàng / nhóm của họ hay đội phát triển không thể tạo lại lỗi đã báo cáo. Một lỗi mà bạn đã dành thời gian và công sức để điều tra. Bạn đã cố gắng rất nhiều để báo cáo lại nó một cách rõ ràng và ngắn gọn, nhưng họ lại ném vào mặt bạn bản án "không thể tái tạo".

Lý do tại sao một người gặp khó khăn khi sao chép lỗi cũng có thể là do hành động của người thử nghiệm. Ví dụ: anh ấy / cô ấy có thể đã cung cấp một bản tóm tắt lỗi mơ hồ, liệt kê các bước không chắc chắn để tái tạo hoặc đính kèm một tệp đính kèm vô dụng không thể hiện đúng lỗi hoặc không muốn mở. Thậm chí tệ hơn nếu bạn không kiểm tra việc tái tạo lỗi trước khi nhận được báo cáo và nó đã ngừng sao chép sau khi bộ nhớ cache được xóa.

Trong trường hợp bạn chắc chắn rằng lỗi đã được báo cáo chính xác cũng như người dùng cuối ứng dụng có thể tìm thấy lỗi, bạn không có lựa chọn nào khác ngoài việc bảo vệ nó. Điều này đạt được thông qua giao tiếp với tất cả các bên liên quan có thể điều tra và sửa lỗi đó trong tương lai. 

### Vì vậy, những câu hỏi bạn nên đặt ra cho nhóm QA của mình để tìm ra lý do tại sao họ không thể tái tạo lỗi của bạn là gì?

1. Bạn có sử dụng các **môi trường thử nghiệm** giống nhau (nền tảng, trình duyệt, phiên bản trình duyệt, thiết bị, hệ điều hành, độ phân giải màn hình) không?
2. Bạn và nhóm thử nghiệm đã sử dụng **loại kết nối Internet** nào?
3. Nhóm đã tính tất cả **các điều kiện tiên quyết** do bạn chỉ định và các bước để tái tạo lỗi chưa?
4. **Kết quả mong đợi** của bạn về hành vi phần mềm có phù hợp với những điều này của nhóm cũng như kết quả thử nghiệm mong đợi được nêu trong các yêu cầu của dự án không?
5. Bạn hoặc nhóm của bạn có sử dụng bất kỳ ứng dụng hoặc tiện ích mở rộng trình duyệt nào của bên thứ ba có thể ảnh hưởng đến hiệu suất của phần mềm không?

### Vì vậy, chúng ta hãy xem xét tất cả những câu hỏi này chi tiết hơn:
![](https://images.viblo.asia/9ef5bf65-9646-46d7-9295-80e91da54517.jpg)


### 1. Môi trường thử nghiệm của bạn có phù hợp không?
Bạn phải chỉ định môi trường chính xác mà nhóm đã kiểm tra lỗi của bạn. 

Người ta cho rằng môi trường của một lỗi phát sinh đã được nêu trong phần mô tả về nó. Do đó, bạn phải kiểm tra kỹ xem đồng nghiệp của bạn đang cố gắng tái tạo lỗi có đang sử dụng cùng một nền tảng để làm điều đó hay không (trình duyệt, thiết bị, hệ điều hành, độ phân giải màn hình, tất nhiên nếu chúng ta đang nói về một lỗi dành riêng cho môi trường) như bạn đã làm.

***Ví dụ,*** chúng tôi đã từng gặp trường hợp khi người kiểm tra của chúng tôi báo cáo lỗi chỉ có thể sao chép trên iPhone 6 mà không có các phiên bản khác. Đó là lý do tại sao anh ấy chỉ định môi trường cụ thể trong mô tả báo cáo lỗi . Một dev đã phải xử lý báo cáo lỗi đó đã không chú ý đến thực tế là lỗi chỉ có thể được nhìn thấy trên một thiết bị cụ thể. Vì anh ấy chỉ có một chiếc iPhone 7 gần mình nên anh ấy không thể tái tạo sự cố được báo cáo. Chỉ sau khi chúng tôi kiểm tra kỹ mọi thứ, sự hiểu lầm cuối cùng đã được giải quyết: lỗi từng chỉ xảy ra trên iPhone 6 đã được tìm thấy và sửa chữa.

### 2. Bạn và nhóm thử nghiệm đã sử dụng loại kết nối Internet nào?
Phần lớn, một câu hỏi như vậy nên được hỏi về các lỗi liên quan đến thiết bị, vì loại kết nối Internet (wi-fi, 3G, 4G, v.v.) có thể ảnh hưởng đến hiệu suất của ứng dụng hoặc trang web, vì vậy thông tin này thực sự quan trọng và phải được làm rõ.

Ví dụ, có một dự án từng gặp vấn đề rằng : cửa hàng trực tuyến không hiển thị bản đồ các bưu cục có sẵn cho một số phương thức giao hàng nhất định. Chúng tôi phát hiện ra nó khi tất cả đang làm việc ở nhà do bị cách ly. Nhóm khách hàng không thể tái tạo lỗi, đối với họ, dường như mọi thứ đều được hiển thị hoàn hảo. Sau một vài cuộc thảo luận, chúng tôi quyết định điều tra lỗi này. Sau khi một bộ phận trong nhóm của chúng tôi quay lại với công việc văn phòng, chúng tôi nhận thấy rằng lỗi này không thể tái tạo được nữa.

Vì một bộ phận nhân viên tiếp tục làm việc từ xa, chúng tôi đã phát hiện ra một sự thật thú vị. Với kết nối internet gia đình, lỗi tiếp tục tái tạo, trong khi tại văn phòng của chúng tôi, nơi kết nối ổn định hơn, bản đồ bưu điện được hiển thị thành công, giống như ở phía khách hàng. Đó là khi chúng tôi quyết định đưa thông tin về loại kết nối internet và tốc độ của nó vào báo cáo lỗi. Như bạn có thể thấy, bản thân kết nối internet có thể là lý do gây ra lỗi, trong trường hợp của chúng tôi có thể dẫn đến việc một số khách hàng nhất định không thể đặt hàng trong cửa hàng trực tuyến đó.

### 3. Nhóm đã thiết lập đầy đủ tất cả các điều kiện tiên quyết do bạn chỉ định và các bước để tái tạo lỗi chưa?
Quay trở lại vấn đề nhóm không chú ý thực hiện đầy đủ như bản tóm tắt lỗi và tệp đính kèm và thiếu một số thông tin quan trọng. Cụ thể là cách tái tạo một lỗi cụ thể.

Thông thường, những nhân viên có năng lực có xu hướng nghĩ rằng họ đã thành thạo chức năng của dự án đến mức họ không cần phải kiểm tra các bước để tái tạo và điều kiện tiên quyết một cách kỹ lưỡng. Đó là lý do tại sao bạn nên kiểm tra lại chính xác cách các nhà phát triển đã cố gắng tái tạo lỗi của bạn, cho dù họ đã bỏ lỡ một bước hay không tính đến bất kỳ điều kiện tiên quyết nào.

Chúng tôi đã gặp trường hợp lỗi chỉ tái tạo sau khi chúng tôi đánh dấu một trong bốn hộp kiểm trong cài đặt của phần mềm đang được thử nghiệm. Chúng tôi đã thêm tất cả thông tin này vào mô tả lỗi mà đồng nghiệp của chúng tôi chưa đọc xong và kết quả là không thể tạo lại lỗi, vì anh ta đang làm theo các bước thông thường để tạo lại.

### 4. Kết quả mong đợi của bạn về hành vi phần mềm có phù hợp với những điều này của nhóm cũng như kết quả thử nghiệm mong đợi được nêu trong các yêu cầu của dự án không?
Bạn đã báo cáo lỗi vì nó không khớp với kết quả mong đợi được chỉ định trong các yêu cầu hoặc thậm chí là những lỗi không được chỉ định, nhưng bạn biết chính xác chức năng sẽ hoạt động như thế nào dựa trên kinh nghiệm của bạn, tiêu chuẩn chung hoặc chỉ thông thường. Bạn nên thảo luận vấn đề này với đồng nghiệp của mình. Có thể ai đó trong nhóm đang dựa vào thông tin không chính xác về kết quả mong đợi của hành vi phần mềm.

### 5. Bạn hoặc nhóm của bạn có sử dụng bất kỳ ứng dụng hoặc tiện ích mở rộng trình duyệt nào của bên thứ ba có thể ảnh hưởng đến hiệu suất của phần mềm không?
Và câu hỏi cuối cùng để thảo luận là câu hỏi có thể được hỏi từ tác giả báo cáo lỗi. Đôi khi, một số ứng dụng nhất định có thể xung đột với nhau. Đương nhiên, điều này gây ra lỗi phần mềm mà các nhà phân tích QA phân loại là lỗi. Ngay cả VPN cũng có thể ảnh hưởng đến công việc. Vì vậy, bạn phải đảm bảo rằng trong quá trình sao chép lỗi, không có ứng dụng của bên thứ ba, có thể ảnh hưởng đến hiệu suất của sản phẩm được thử nghiệm và gây hiểu nhầm cho toàn bộ nhóm đã cài đặt. Hoặc, ví dụ: bạn sử dụng máy ảo để thử nghiệm, máy này có thể kém ổn định hơn so với nền tảng gốc hoặc chính trình duyệt. Điều này cũng phải được làm rõ.


***Tóm lại,***
mục đích của người kiểm tra phần mềm là đảm bảo chức năng phần mềm ổn định và không có lỗi, cố gắng ngăn người dùng phát hiện ra lỗi. Đó là lý do tại sao chúng tôi kiểm tra và phân loại tất cả các lỗi bạn có thể gặp phải. Chúng tôi hoàn toàn chịu trách nhiệm về chất lượng của sản phẩm đã được kiểm tra, báo cáo lỗi chất lượng cao trong trường hợp tìm thấy lỗi, cũng như xử lý chất lượng cao đối với sản phẩm đó. Và nếu bạn tìm thấy một lỗi mà đối với bạn dường như là lý do nghiêm trọng để hủy phát hành sản phẩm và nhóm không thể tái tạo lỗi đó, bạn chắc chắn nên tìm ra lý do bằng cách hỏi các câu hỏi được liệt kê ở trên.

***Reference:***

https://stackoverflow.com/questions/3657267/what-a-tester-need-to-do-when-he-found-a-bug-and-the-dev-does-not-want-to-fix-it

http://www.testingvn.com/viewtopic.php?f=19&t=8000