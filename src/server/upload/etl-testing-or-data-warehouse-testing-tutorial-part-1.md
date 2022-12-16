Trước khi chúng ta học bất cứ gì về kiểm thử ETL thì điều quan trọng là cần phải học về Business Intelligence và Dataware.

Hãy cùng bắt đầu nào!

### BI là gì?

BI là tiến trình thu thập dữ liệu thô hoặc dữ liệu kinh doanh và biến nào thành những thông tin hữu ích và có ý nghĩa hơn. 

Các dữ liệu thô là các bản ghi về các giao dịch hàng ngày của một tổ chức như các tương tác với khách hàng, quản trị tài chính, quản lý nhân viên, v.v. 

Những dữ liệu này sẽ được sử dụng cho việc “Báo cáo, phân tích, khai thác dữ liệu, phân tích và nâng cao chất lượng dữ liệu và phân tích dự đoán.

### Kho dữ liệu là gì?

Một kho dữ liệu là CSDL mà được thiết kế cho việc truy vấn và phân tích dữ liệu thay vì xử lý giao dịch. 

Kho dữ liệu được xây dựng bằng việc tích hợp dữ liệu từ nhiều nguồn không đồng nhất. 
Nó cho phép công ty hoặc tổ chức hợp nhất dữ liệu từ một số nguồn khác nhau và tách biệt công việc phân tích với công việc giao dịch. 

Dữ liệu được chuyển thành thông tin chất lượng cao để đáp ứng tất cả những yêu cầu báo cáo của doanh nghiệp cho tất cả các cấp độ người dùng. 

![](https://images.viblo.asia/c181fc2a-9ba1-4fac-bd89-c95dcb07477f.jpg)

### ETL là gì?
ETL là viết tắt cho **Extract-Transform-Load** và nó là một quy trình về cách mà dữ liệu được tải từ hệ thống nguồn tới Kho dữ liệu. Dữ liệu được trích xuất từ một CSDL OLTP,  được chuyển đổi để khớp với lược đồ kho dữ liệu và được tải tới CSDL kho dữ liệu. Nhiều kho dữ liệu cũng kết hợp dữ liệu từ các hệ thống không phải OLTP như các tệp văn bản, hệ thống cũ.
 
### Hãy xem cách nó hoạt động nhé!
 
Ví dụ, có một cửa hàng bán lẻ mà có các bộ phận khác nhau như bán hàng, tiếp thị, hậu cần, vv. Mỗi bộ phận xử thông tin khách hàng một cách độc lập, và cách mà họ lưu trữ dữ liệu là khá khác nhau. Bộ phận bán hàng lưu trữ bởi tên khách hàng trong khi bộ phận tiếp thị lại lưu trữ ID khách hàng.

Bây giờ họ muốn kiểm tra lịch sử khách hàng và muốn biết những sản phẩm khác nhau mà các khách hàng đã mua do các chiến dịch tiếp thị khác nhau thì nó sẽ thật là rắc rối đây.

Giải pháp là sử dụng một kho dữ liệu để lưu trữ thông tin từ các nguồn khác nhau trong một cấu trúc thống sử dụng ETL. ETL có thể chuyển đổi các bộ dữ liệu khác nhau thành một cấu trúc hợp nhất. Sau đó sử dụng các công cụ BI để lấy các báo cáo và thông tin có ý nghĩa từ dữ liệu này.
 
### Biểu đồ dưới đây sẽ cho bạn thấy ROAD MAP của tiến trình ETL.
![](https://images.viblo.asia/9565f898-0de0-4baa-b443-10f05a2635a3.png)

1. Trích xuất
   : Trích xuất dữ liệu liên quan
2. Biến đổi:

    - Chuyển đổi dữ liệu sang định dạng DW (kho dữ liệu)
    - Xây dựng các loại khóa - Khóa là một hoặc nhiều thuộc tính dữ liệu mà xác định duy nhất một thực thể. Có nhiều loại khóa khác nhau như khóa chính, khóa thay thế, khóa ngoại, khóa tổng hợp, khóa đại lý kho dữ liệu sở hữu các khóa này và không bao giờ cho phép bất kỳ thực thể nào khác gán chúng.
    - Làm sạch dữ liệu: Sau khi dữ liệu được trích xuất, nó sẽ chuyển sang giai đoạn tiếp theo, gọi là giai đoạn làm sạch và làm phù hợp dữ liệu. Việc làm sạch sẽ thực hiện xác định và sửa các thiếu sót cũng như các lỗi.dữ liệu. Việc làm phù hợp có nghĩa là giải quyết các xung đột giữa các dữ liệu mà không tương thích nhau, để chúng có thể được sử dụng trong kho dữ liệu doanh nghiệp. Thêm vào đó, hệ thống này tạo ra siêu dữ liệu mà được sử dụng để chẩn đoán các vấn đề hệ thống nguồn và nâng cao chất lượng dữ liệu.
 
3. Tải:
    - Tải dữ liệu vào DW (Kho dữ liệu)
    - Xây dựng các tập hợp - Tạo một tập hợp là tóm tắt và lưu trữ dữ liệu mà sẵn có trong bảng thực tế để nâng cao hiệu suất của các truy vấn người dùng cuối.
 
### Kiểm thử ETL là gì?
Kiểm thử ETL được thực hiện để đảm bảo rằng các dữ liệu được tải từ một nguồn đến các điểm đích sau các giao dịch kinh doanh là chính xác. Nó cũng liên quan đến việc xác minh dữ liệu tại các giai đoạn giữa mà đang được sử dụng ở giữa nguồn và đích. ETL là viết tắt của **Extract-Transform-Load**

### Tiến trình kiểm thử ETL
Giống với tiến trình kiểm thử nghiệm, ETL cũng đi qua các giai đoạn khác nhau. Các giai đoạn khác nhau của tiến trình thử ETL như sau:
 
 ![](https://images.viblo.asia/186dc0a1-b3b7-41a0-ba86-dd113cbab9b7.png)
 
 Kiểm thử ETL được thực hiện trong 5 giai đoạn:
 
1. Xác định yêu cầu và các nguồn dữ liệu
1. Thu thập dữ liệu
1. Triển khai logic kinh doanh và mô hình hóa kích thước
1. Xây dựng và lấy dữ liệu
1. Xây dựng báo cáo

![](https://images.viblo.asia/3aa38517-649c-4fcb-930a-b1d96293301e.jpg)

Các loại kiểm thử ETL

| Loại kiểm thử ETL | Tiến trình kiểm thử |
| ---------- | ---------- |
| Kiểm thử xác thực sản xuất| “Cân bằng bảng” hoặc “Hòa hợp sản xuất” là một trong số các loại kiểm thử ETL trên dữ liệu mà nó được chuyển vào các hệ thống sản xuất. Để hỗ trợ cho các quyết định kinh doanh, dữ liệu trong các hệ thống sản xuất của bạn phải theo đúng thứ tự. Tùy chọn xác thực dữ liệu [Informatica](https://www.guru99.com/informatica-tutorials.html) cung cấp các khả năng quản lý và tự động hóa kiểm thử ETL để đảm bảo rằng các hệ thống sản xuất không bị xâm phạm bởi dữ liệu.|
| Kiểm thử từ nguồn tới đích (kiểm thử xác thực) | Thực hiện để xác thực xem liệu các giá trị dữ liệu được chuyển đổi có đúng là các giá trị dữ liệu như mong đợi hay không.    |
| Nâng cấp ứng dụng | Loại thử nghiệm ETL này có thể được sinh ra một cách tự động, giúp tiết kiệm thời gian kiểm thử đáng kể. Nó sẽ kiểm tra xem liệu dữ liệu được trích xuất từ một kho lưu trữ hay một ứng dụng cũ hơn có hoàn toàn giống với dữ liệu trong kho lưu trữ hoặc ứng dụng mới hay không.     |
| Kiểm thử siêu dữ liệu | Bao gồm kiểm thử loại dữ liệu, kiểm thử độ dài dữ liệu và kiểm thử chỉ số/ ràng buộc.    |
| Kiểm thử tính đầy đủ của dữ liệu| Kiểm thử tính đầy đủ được thực hiện để xác nhận rằng tất cả dữ liệu mong đợi được tải từ nguồn đến đích. Một số kiểm thử được chạy để so sánh và xác thực số lượng, tập hợp và dữ liệu thực tế giữa nguồn và đích đối với các cột với phép chuyển đổi đơn giản hoặc không chuyển đổi.     |
| Kiểm thử tính chính xác của dữ liệu| Được thực hiện nhằm đảm bảo dữ liệu được tải và chuyển đổi chính xác như mong đợi.    |
| Kiểm thử sự chuyển đổi dữ liệu| Được thực hiện trong nhiều trường hợp mà không thể đạt được bằng cách viết một câu truy vấn SQL từ nguồn và so sánh đầu ra với đích. Có lẽ cần chạy nhiều truy vấn SQL cho mỗi hàng để xác định được quy tắc chuyển đổi. |
| Kiểm thử chất lượng dữ liệu| Kiểm thử chất lượng dữ liệu gồm kiểm thử cú pháp và tài liệu tham khảo. Để tránh bất kỳ lỗi nào do ngày hoặc số đơn đặt hàng trong quá trình kinh doanh thì kiểm thử chất lượng dữ liệu sẽ được thực hiện. Kiểm thử cú pháp: Nó sẽ báo cáo các dữ liệu bẩn, dựa trên các ký tự không hợp lệ, mẫu ký tự, thứ tự chữ hoa hoặc chữ thường không chính xác, v.v. Kiểm thử tài liệu tham khảo: Nó sẽ kiểm tra dữ liệu dựa trên mô hình dữ liệu. Ví dụ: Kiểm thử chất lượng dữ liệu ID khách hàng gồm kiểm thử số, ngày, kiểm thử độ chính xác, kiểm thử dữ liệu, kiểm thử rỗng, v.v.   |
|Kiểm thử ETL tăng dần| Được thực hiện để kiểm thử tính toàn vẹn dữ liệu của dữ liệu cũ và mới khi mà có sự bổ sung dữ liệu mới. Kiểm thử tăng dần xác định rằng việc chèn và cập nhật dữ liệu mới đang được xử lý như mong đợi trong quá trình ETL gia tăng.   |
| Kiểm thử điều hướng/GUI | Được thực hiện để kiểm thử các khía cạnh điều hướng hoặc GUI của các báo cáo giao diện người dùng cuối. |

### Tạo các Test case ETL như thế nào
Kiểm thử ETL là một khái niệm mà có thể được áp dụng cho các CSDL và công cụ khác nhau trong ngành quản lý thông tin. Mục tiêu của kiểm thử ETL là  rằng các dữ liệu được tải từ một nguồn đến các điểm đích sau các giao dịch kinh doanh là chính xác. 

Nó cũng liên quan đến việc xác minh dữ liệu tại các giai đoạn giữa mà đang được sử dụng ở giữa nguồn và đích.
 
Trong khi thực hiện kiểm thử ETL, có 2 tài liệu luôn được 1 Tester ETL sử dụng đó là:

**1. Bảng ánh xạ ETL:** 

Một bảng ánh xạ ETL chứa tất cả thông tin của các bảng nguồn và bảng đích bao gồm mỗi cột và các tra cứu tương ứng của chúng trong các bảng tham khảo. Các tester ETL cần phải hiểu rõ các truy vấn SQL vì kiểm tra ETL có thể liên quan đến việc viết các câu truy vấn lớn với nhiều phép nối để xác thực dữ liệu ở bất kỳ giai đoạn nào của ETL. Bảng ánh xạ ETL cung cấp một sự giúp đáng kể trong khi viết các câu truy vấn để xác minh dữ liệu.

**2. Lược đồ DB của nguồn và đích:** 

Nó cần được giữ cẩn thận để xác minh bất kỳ chi tiết nào trong các bảng ánh xạ.

### Các kịch bản kiểm thử ETL và Test Cases

| Kịch bản kiểm thử | Test cases |
| -------- | -------- |
| Sự xác nhận tài liệu ánh xạ     | Xác minh tài liệu ánh xạ xem liệu thông tin ETL tương ứng có được cung cấp hay không. Thay đổi Log nên duy trì trong mọi tài liệu ánh xạ.|
| Sự xác nhận     | Xác nhận cấu trúc bảng nguồn và đích dựa trên tài liệu ánh xạ tương ứng. Loại dữ liệu nguồn và dữ liệu đích nên giống nhau Độ dài của các loại dữ liệu nguồn và đích phải bằng nhau Xác minh rằng các loại và định dạng trường dữ liệu được chỉ định Độ dài loại dữ liệu nguồn không được nhỏ hơn độ dài loại dữ liệu đích Xác thực tên của các cột trong 	bảng dựa trên tài liệu ánh xạ.|
| Xác nhận ràng buộc    | Đảm bảo các ràng buộc được xác định cho bảng cụ thể như mong đợi.|
| Các vấn đề nhất quán dữ liệu | 1. Kiểu dữ liệu và độ dài cho một thuộc tính cụ thể có thể khác nhau trong các tệp hoặc bảng mặc dù định nghĩa ngữ nghĩa là giống nhau. <br> 2. Lạm dụng các ràng buộc toàn vẹn.|
| Các vấn đề về tính đầy đủ| 1. Đảm bảo rằng tất cả các dữ liệu mong đợi được tải vào bảng đích. <br> 2. So sánh số lượng bản ghi giữa nguồn và đích. <br> 3. Kiểm tra các bản ghi bất kỳ bị bỏ đi. <br> 4.  Kiểm tra dữ liệu không nên bị rút ngắn trong cột của các bảng mục tiêu. <br> 5. Kiểm tra phân tích giá trị biên. <br> 6. So sánh các giá trị duy nhất của các trường khóa giữa dữ liệu được tải vào WH và dữ liệu nguồn.|
| Các vấn đề về tính đúng đắn| 1. Dữ liệu mà bị sai chính tả hoặc ghi không chính xác. <br> 2. Dữ liệu null, không duy nhất hoặc ngoài phạm vi.|
| Sự biến đổi| Sự biến đổi|
| Chất lượng dữ liệu    | 1. Kiểm tra số liệu: Các con số cần kiểm tra và xác nhận. <br> 2. Kiểm tra ngày tháng: Dữ liệu phải tuân theo định dạng ngày tháng và nó cần phải giống nhau ở tất cả các hồ sơ. <br> 3. Kiểm tra độ chính xác. <br> 4. Kiểm tra dữ liệu. <br> 5. Kiểm tra null|
| Xác thực null| Xác minh các giá trị null, nơi mà giá trị not null được xác định cho 1 cột cụ thể.|
| Kiểm tra trùng lặp | 1. Cần xác thực khóa duy nhất, khóa chính và cột bất kỳ nên là duy nhất theo yêu cầu nghiệp vụ đang có bất kỳ hàng trùng lặp nào. <br> 2. Kiểm tra nếu bất kỳ giá trị nào trùng lặp nào tồn tại trong bất kỳ cột nào mà đang trích xuất từ nhiều cột trong dữ liệu nguồn và kết hợp chúng lại thành 1 cột. <br> 3. Theo yêu cầu của khách hàng, cần đảm bảo rằng không có sự trùng lặp kết hợp nhiều cột trong mục tiêu. <br> 4. Theo yêu cầu khách hàng, cần đảm bảo rằng không có giá trị trùng trong sự kết hợp của nhiều cột mục tiêu duy nhất.    |
| Xác thực ngày | Giá trị ngày đang được sử dụng ở nhiều nơi trong sự phát triển ETL. <br> 1. Để biết ngày tạo hàng <br> 2. Xác định các bản ghi hoạt động theo quan điểm phát triển ETL <br> 3. Xác định các bản ghi hoạt động theo quan điểm yêu cầu kinh doanh <br> 4. Đôi khi dựa trên các giá trị ngày, các cập nhật và chèn được sinh ra.     |
| Xác thực  dữ liệu hoàn chỉnh | 1. Để xác thực tập dữ liệu hoàn chỉnh trong các bảng nguồn và đích trừ đi một truy vấn trong một giải pháp tốt nhất. <br> 2. Chúng ta cần lấy dữ liệu nguồn trừ dữ liệu đích và ngược lại. <br> 3. Nếu câu truy vấn trừ trả về bất kỳ giá trị nào thì những giá trị này nên được xem là các hàng không khớp. <br> 4. Cần khớp các hàng giữa dữ liệu nguồn và đích sử dụng câu lệnh giao nhau. <br> 5. Số lượng được trả về từ các câu lệnh giao nhau nên khớp với số lượng đơn lẻ của các bảng dữ liệu nguồn và đích. <br> 6. Nếu câu truy vấn trừ trả về các hàng và số lượng đếm được từ câu lệnh giao nhau nhỏ hơn số lượng số lượng của bảng nguồn hoặc đích thì chúng ta có thể coi như có các hàng trùng lặp.|
| Độ sạch dữ liệu| Các cột không cần thiết nên được xóa trước khi tải vào khu vực trung gian.|

**Còn tiếp...**

Hẹn gặp lại mọi người ở phần tiếp theo!

Bài dịch từ link:  https://www.guru99.com/utlimate-guide-etl-datawarehouse-testing.html