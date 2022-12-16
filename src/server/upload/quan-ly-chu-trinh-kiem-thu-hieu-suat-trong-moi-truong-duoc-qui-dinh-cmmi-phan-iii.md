*Related parts:*
- https://viblo.asia/p/quan-ly-chu-trinh-kiem-thu-hieu-suat-trong-moi-truong-duoc-qui-dinh-cmmi-phan-i-07LKXOXk5V4
- https://viblo.asia/p/quan-ly-chu-trinh-kiem-thu-hieu-suat-trong-moi-truong-duoc-qui-dinh-cmmi-phan-ii-1VgZvNwYZAw

## Hoạt động 5. Tạo các kiểm thử (Design Tests)
Việc tạo các kiểm thử hiệu suất bao gồm nhận định kịch bản sử dụng chính, xác định các sự khác biệt người dùng thích hợp, xác định và tạo dữ liệu kiểm thử, và chỉ định các số liệu cần thu thập. Cuối cùng các mục này sẽ cung cấp nền tảng cho khối lượng công việc và các hồ sơ khối lượng công việc.

Khi tạo và lên kế hoạch kiểm thử, mục đích là mô phỏng kiểm thử thực tế nhất để có thể cung cấp dữ liệu đáng tin cậy  giúp thuận lợi đưa ra các quyết định kinh doanh mang tính thông báo. Việc tạo ra các kiểm thử thực tế sẽ tăng đáng kể độ tin cậy và tính hữu ích của các kết quả dữ liệu.

Kịch bản sử dụng chính cho ứng dụng được kiểm tra thường xuất hiện trong quá trình xác định các đặc tính hiệu suất mong muốn của ứng dụng. Nếu đó không phải trường hợp cho dự án kiểm thử của bạn, xác định rõ ràng các kịch bản sử dụng có giá trị nhất để sử dụng

Xem xét các vấn đề sau đây khi xác định các kịch bản sử dụng chính, nhớ suy nghĩ về cả con người lẫn người dùng hệ thống, chẳng hạn như một loạt các quy trình và các ứng dụng bên ngoài:
* Các kịch bản sử dụng có liên quan đến hợp đồng
* Các kịch bản sử dụng đã bao hàm và được ủy nhiệm bởi các mục đích và mục tiêu kiểm thử hiệu suất
* Các kịch bản sử dụng phổ biến nhất
* Các kịch bản sử dụng quan trọng thiên về kinh doanh
* Các kịch bản sử dụng có hiệu suất cao
* Các kịch bản sử dụng liên quan đến kỹ thuật
* Các kịch bản sử dụng của các bên liên quan
* Các kịch bản sử dụng có tầm nhìn cao

Sau khi các kịch bản sử dụng chính được xác định, chúng sẽ được sửa chửa, soạn thảo thành các trường hợp kiểm thử. Quá trình soạn thảo này thường liên quan đến các hoạt động sau:
* Xác định các đường dẫn điều hướng cho các kịch bản chính.
* Xác định  dữ liệu người dùng cá nhân và các sự khác biệt.
* Xác định phân bố tương đối của kịch bản.
* Nhận ra các mức tải mục tiêu.
* Nhận ra số liệu sẽ được ghi lại trong quá trình thực thi.

### Xác định các đường dẫn điều hướng cho các kịch bản chính.
Con người là yếu tố không thể đoán trước, và các trang web thường cung cấp chức năng dư thừa. Ngay cả với một số lượng tương đối nhỏ người dùng, nó chỉ gần như chắc chắn rằng người dùng thực sự sẽ không chỉ sử dụng mọi đường dẫn bạn nghĩ rằng họ sẽ hoàn thành một nhiệm vụ, nhưng họ cũng sẽ chắc chắn phát hiện ra rằng bạn đã không lên kế hoạch. Mỗi đường dẫn người dùng thực hiện để hoàn thành một hoạt động sẽ đặt một tải khác nhau trên hệ thống. Sự khác biệt đó có thể là không đang kể, hoặc nó có thể rất lớn - không có cách nào để chắc chắn cho đến khi bạn kiểm tra nó. Có nhiều phương pháp để xác định các đường dẫn điều hướng, bao gồm: 

* Nhận ra các đường dẫn người dùng trong ứng dụng Web của bạn mà được mong đợi sẽ có tác động đáng kể đến hiệu suất và hoàn thành một hoặc nhiều các kịch bản chính đã được xác nhận.
* Đọc kỹ hướng dẫn thiết kế và / hoặc sử dụng
* Cố gắng hoàn thành các hoạt động của mình.
* Quan sát những người khác đang cố gắng hoàn thành hoạt động mà không có hướng dẫn (trừ khi người sử dụng mới phải sử dụng hệ thống lần đầu).
* Phân tích dữ liệu thực nghiệm từ log của máy chủ mà đã thu được trong quá trình phát hành sản phẩm thử nghiệm và nghiên cứu sử dụng.

### Xác định  dữ liệu người dùng cá nhân và các sự khác biệt.
Trong kì đầu của quá trình phát triển và kiểm thử, dữ liệu người dùng và sự khác biệt thường được ước tính dựa trên việc sử dụng mong muốn  và sự quan sát của người dùng đang làm việc với các ứng dụng tương tự. Các ước tính này thường được tăng cường hoặc sửa đổi khi dữ liệu thực nghiệm từ log của máy chủ trở nên khả dụng. Một số các chỉ số hữu ích hơn có thể được đọc hoặc giải thích từ log của máy chủ bao gồm:

* **Lượt Xem Trang mỗi kì**. Lượt xem trang là một yêu cầu trang mà nó bao gồm tất cả các yêu cầu file phụ thuộc ( .jpg, CSS, v.v ...). Lượt xem trang có thể được theo dõi hàng giờ, hàng ngày hoặc hàng tuần để coi như mô hình chu kì hoặc các hoạt động của người sử dụng cao điểm trên trang Web.
* **Các phiên người dùng mỗi kì.** Một phiên người dùng là chuỗi các yêu cầu có liên quan bắt nguồn từ một lần truy cập của người dùng đến trang web, như đã giải thích trước đây. Giống như lượt xem trang, phiên người dùng có thể kéo dài hàng giờ, hàng ngày và hàng tuần.
* **Thời lượng phiên**. Số liệu này thể hiện số lượng thời gian mà một phiên người dùng kéo dài được đo từ yêu cầu trang đầu tiên cho đến khi yêu cầu trang cuối cùng được hoàn thành và bao gồm thời gian người dùng dừng lại khi điều hướng từ trang này sang trang khác.
* **Phân phối yêu cầu trang**. Số liệu này đại diện cho sự phân bố, theo phần trăm, lần truy cập trang theo loại chức năng (Trang chủ, đăng nhập, thanh toán, v.v.). Tỷ lệ phân phối sẽ thiết lập một tỷ lệ trọng số của các lượt truy cập trang dựa trên việc sử dụng thực tế của trang web.
* **Tốc độ tương tác**. Còn được gọi là "thời gian người dùng nghĩ đến", "thời gian xem trang" và "sự chậm trễ của người dùng", số liệu này đại diện cho thời gian người dùng thực hiện chuyển tiếp giữa các trang khi điều hướng trang web, tạo thành hành vi thời gian suy nghĩ. Điều quan trọng cần nhớ là mỗi người dùng sẽ tương tác với trang Web với một tốc độ khác nhau.
* **Sự từ bỏ của người dùng**. Số liệu này đại diện cho khoảng thời gian mà người dùng sẽ đợi trang tải trước khi thể hiện sự không hài lòng, thoát khỏi trang web và do đó bỏ qua phiên người dùng. Các phiên bị bỏ rơi là khá bình thường trên Internet và do đó sẽ có ảnh hưởng đến kết quả kiểm tra tải.

### Xác định phân bố tương đối của kịch bản.
Sau khi xác định các kịch bản nào để mô phỏng, các bước nào và dữ liệu liên quan nào là những kịch bản và hợp nhất những kịch bản này vào một hoặc nhiều mô hình tải công việc (workload), bây giờ bạn cần phải xác định tần suất người dùng thực hiện mỗi hoạt động thể hiện trong mô hình liên quan đến các hoạt động cần thiết khác để hoàn thành mô hình tải công việc.

Thỉnh thoảng, phân bổ một lượng tải công việc là không đủ. Nghiên cứu và kinh nghiệm cho thấy rằng các hoạt động của người dùng thường khác nhau rất nhiều theo thời gian. Để đảm bảo giá trị của kiểm thử, bạn phải xác nhận rằng các hoạt động được đánh giá theo thời gian trong ngày, ngày trong tuần, ngày trong tháng, và thời gian trong năm. Các phương pháp phổ biến nhất để xác định sự phân bố tương đối của các hoạt động bao gồm:

* Giải phóng các giá trị sử dụng thực tế, các giá trị tải, các tình huống sử dụng phổ biến và không phổ biến (đường dẫn của người dùng), thời gian trễ của người dùng giữa các lần nhấn chuột hoặc trang và sự khác biệt về dữ liệu đầu vào (để đặt tên cho một số it) trực tiếp từ các file log.
* Phỏng vấn các cá nhân chịu trách nhiệm bán / tiếp thị các tính năng mới để tìm ra những tính năng / chức năng được mong đợi và do đó rất có thể sẽ được sử dụng. Bằng cách phỏng vấn người dùng hiện tại, bạn cũng có thể xác định tính năng / chức năng mới mà họ tin rằng họ có nhiều khả năng sử dụng nhất.
* Triển khai bản beta cho một nhóm người dùng đại diện - khoảng 10-20% độ lớn mà người sử dụng mong đợi - và phân tích các log file từ việc sử dụng trang web của họ.
* Thực hiện các thử nghiệm đơn giản trong nhà bằng cách sử dụng nhân viên, khách hàng, bạn bè hoặc thành viên gia đình để xác định, ví dụ: đường dẫn người dùng tự nhiên và sự khác biệt thời gian xem trang giữa người dùng mới và người dùng cũ.
* Cuối cùng, bạn có thể sử dụng trực giác của bạn hoặc dự đoán tốt nhất để ước tính dựa trên sự quen thuộc của chính bạn với trang web.

Một khi bạn tự tin rằng mô hình này đã đủ tốt để thực hiện kiểm thử hiệu suất, hãy bổ sung cho mô hình với dữ liệu sử dụng cá nhân mà bạn đã thu thập trước đây theo cách mà mô hình chứa tất cả dữ liệu bạn cần để tạo ra.

### Nhận ra các mức tải mục tiêu.
Mỗi lần khách hàng truy cập vào một trang web bao gồm một loạt các yêu cầu liên quan được biết đến dưới dạng phiên người dùng. Những người dùng có các hành vi khác nhau điều hướng cùng một trang Web không gây ra các yêu cầu chồng chéo lên máy chủ Web trong các phiên của họ. Do đó, thay vì mô hình hóa trải nghiệm người dùng trên cơ sở người dùng đồng thời, hữu ích hơn để dựa vào mô hình của bạn trên các phiên người dùng. Các phiên người dùng có thể được định nghĩa là một chuỗi các hành động trong luồng điều hướng trang, được thực hiện bởi một lần khách hàng truy cập vào một trang web.

Nếu không có một số dữ liệu thực nghiệm, mức tải mục tiêu là chính xác - các mục tiêu. Các mục tiêu này thường được doanh nghiệp đặt ra, dựa trên các mục tiêu liên quan đến ứng dụng và liệu rằng các mục tiêu đó có phải là cách để thâm nhập thị trường, tạo doanh thu hoặc cái gì khác. Đây là những con số bạn muốn làm việc ngay từ đầu.

Ngay khi các log của máy chủ cho lần tiền sản xuất được đưa ra hoạt động hoặc hiện thực ứng dụng có sẵn, bạn có thể sử dụng dữ liệu từ các log này để xác nhận tính hợp lệ và / hoặc tăng cường dữ liệu được thu thập bằng cách sử dụng các tài nguyên ở trên. Bằng cách thực hiện phân tích định lượng trên log của máy chủ , bạn có thể xác định:

* Tổng số lượt truy cập vào trang web trong một khoảng thời gian (tháng / tuần / ngày).
* Khối lượng sử dụng, về tổng số trung bình và tải cao điểm, trên cơ sở hàng giờ.
* Thời lượng của các phiên cho tổng số trung bình và tải cao điểm, trên cơ sở hàng giờ.
* Tổng số giờ trung bình và tải đỉnh được chuyển thành các phiên người dùng chồng chéo để mô phỏng khối lượng khả năng thực sự cho kiểm tra tải.

Bằng cách kết hợp thông tin khối lượng với các mục tiêu, các tình huống chính, sự chậm trễ của người dùng, các đường dẫn điều hướng và phân phối kịch bản từ các bước trước, bạn có thể xác định các chi tiết còn lại cần thiết để thực hiện mô hình tải công việc dưới một mục tiêu tải  cụ thể.

### Nhận ra số liệu sẽ được ghi lại trong quá trình thực thi.
Khi đã nhận ra, nắm bắt và có báo cáo chính xác, các số liệu sẽ cung cấp thông tin về hiệu suất của ứng dụng so với các đặc tính hiệu suất mong muốn của bạn là bao nhiêu. Ngoài ra, các số liệu có thể giúp bạn xác định các khu vực có vấn đề và tắc nghẽn trong ứng dụng của bạn.
Cần nhận ra các chỉ số liên quan đến các tiêu chí chấp nhận thực hiện trong quá trình kiểm thử để phương pháp thu thập các chỉ số này có thể được tích hợp vào các cuộc kiểm thử  khi thực hiện tạo kiểm thử. Khi xác định số liệu, hãy sử dụng các đặc điểm hoặc chỉ số mong muốn cụ thể liên quan trực tiếp hoặc gián tiếp đến các đặc điểm đó.

### Cân nhắc
Xem xét các điểm chính sau đây khi tạo một kiểm thử:
- Các thiết kế kiểm thử thực tế rất nhạy cảm với các phụ thuộc nằm ngoài sự kiểm soát của hệ thống, chẳng hạn như con người và các hệ thống khác tương tác với ứng dụng.
- Thiết kế kiểm thử thực tế dựa trên hoạt động và dữ liệu thực tế chứ không phải các thủ tục cơ học.
- Thiết kế kiểm thử thực tế mang lại kết quả đáng tin cậy hơn và do đó nâng cao giá trị của việc kiểm thử hiệu suất.
- Sự mô phỏng thực tế của sự chậm trễ và thời gian suy nghĩ của người dùng là rất quan trọng đối với tính chính xác của bài kiểm tra.
- Nếu người dùng có thể từ bỏ một tác vụ vì bất kỳ lý do nào, điều này nên được tính trong thiết kế thử nghiệm của bạn.
- Hãy nhớ bao gồm các lỗi người dùng thông thường trong các tình huống của bạn.
- Kiểm thử hiệu suất của các thành phần là một phần không thể thiếu trong thực tế.
- Các thiết kế kiểm thử thực tế có thể tốn kém hơn và mất nhiều thời gian hơn để thực hiện, nhưng chúng mang lại kết quả chính xác hơn cho doanh nghiệp và các bên liên quan.
- Sự thừa kế các kết quả thực hiện từ các kiểm thử không thực tế có thể không chính xác khi phạm vi của hệ thống tăng lên và thường dẫn đến các quyết định không đúng.
- Có sự tham gia của các nhà phát triển và quản trị viên trong quá trình xác định các số liệu nào có thể làm tăng giá trị và phương pháp nào tốt nhất kết hợp việc thu thập các số liệu đó vào thử nghiệm.
- Hãy cẩn thận khi cho phép các công cụ của bạn ảnh hưởng đến thiết kế thử nghiệm của bạn. Các bài kiểm tra tốt hơn hầu như luôn luôn là kết quả của việc thiết kế các phép thử dựa trên giả định rằng chúng có thể được thực hiện và sau đó thích nghi với thử nghiệm hoặc công cụ khi giả định đó được chứng minh sai, thay vì bằng cách không thiết kế các kiểm thử cụ thể dựa trên giả định rằng bạn không có quyền truy cập để thực hiện kiểm thử.

*To be continue...*