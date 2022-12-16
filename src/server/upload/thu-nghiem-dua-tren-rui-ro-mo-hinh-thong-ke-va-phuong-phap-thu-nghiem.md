Một trong những lý do chính đằng sau việc sản xuất ra phần mềm kém chất lượng là thiếu thời gian trong việc sản xuất phần mềm, dẫn đến thời gian cho khâu kiểm thử phần mềm ít hơn và ảnh hưởng đến chất lượng phần mềm. Thử nghiệm dựa trên rủi ro có thể giúp xác định kịch bản nào là quan trọng và phân bổ nhiều thời gian hơn cho các kịch bản đó. 

![](https://images.viblo.asia/f7683d9a-a0e1-4738-a1a7-e98eee80c412.png)

### Phương pháp thử nghiệm dựa trên rủi ro:

Phân tích rủi ro cần được thực hiện ban đầu giúp kiểm soát các vấn đề một cách hiệu quả. Bước đầu tiên trong thử nghiệm dựa trên rủi ro là Lập kế hoạch thử nghiệm. Rủi ro tiềm năng cần được công nhận và Chiến lược rủi ro cần được phát triển. Rủi ro có thể được phân loại trên cơ sở độ phức tạp trong AUT, các loại tài nguyên và công cụ khác nhau. Chiến lược rủi ro được theo sau bởi các hoạt động lập kế hoạch thử nghiệm.

Sau đó, kế hoạch giảm thiểu rủi ro cần được tạo ra. Ở đây, giải pháp cho kế hoạch tương ứng được mô tả. Ví dụ, đối với các ứng dụng phức tạp, kế hoạch giảm thiểu rủi ro sẽ giống như chia AUT thành các đơn vị nhỏ hơn và kiểm tra chúng kỹ lưỡng với nhiều tài nguyên tiềm năng hơn.

![](https://images.viblo.asia/742406d3-982a-405d-9d3d-fcee480e262b.png)

Kế hoạch giảm thiểu rủi ro được theo sau bởi báo cáo rủi ro. Nó cung cấp sự rõ ràng và rộng rãi cho các bên liên quan của dự án để đo lường và thực hiện. Điều này giúp xác định rủi ro bằng cách sử dụng các kỹ thuật như kiểm tra dựa trên số liệu. Đầu ra từ giai đoạn này được đưa vào khu vực xác định rủi ro và nó tiếp tục như một quy trình tuần hoàn, cho đến khi AUT không có rủi ro cao.

### Ví dụ cho thử nghiệm dựa trên rủi ro:

Hãy xem xét rằng có khoảng 6000 -8.000 trường hợp thử nghiệm cho toàn bộ bộ Ứng dụng. Hãy tưởng tượng rằng khoảng 1000 đến 2000 trường hợp thử nghiệm cần được thực hiện cho mỗi lần phát hành để thử nghiệm từ đầu đến cuối. Điều này có thể dẫn đến sự chậm trễ và quá đắt để hoạt động như thế này. Tuy nhiên, trong các ứng dụng thời gian thực, trong số 1000 đến 2000 trường hợp này, có thể thực hiện 100-200 trường hợp thử nghiệm sẽ dẫn đến lỗi do chúng được liên kết với các khu vực dễ bị rủi ro. Phương pháp nghiên cứu thống kê sẽ giúp có được số lượng khuyết tật tối đa.

### Mô hình thống kê:

Mô hình thống kê dựa trên việc phân loại dữ liệu số. Nó cũng giúp đo lường xác suất liên quan đến hành vi hệ thống. Ở đây kiểm tra dựa trên xác suất có một vấn đề cụ thể hoặc một phân khúc bị lỗi trên một môi trường cụ thể. Điều này giúp xác định thử nghiệm nào là tốt nhất và để đánh giá các lĩnh vực trọng tâm trong thử nghiệm dựa trên rủi ro. Điều này cũng giúp đánh giá các tiêu chí phù hợp nhất bằng cách hiểu đường dẫn quan trọng cho các khiếm khuyết. Thử nghiệm dựa trên rủi ro sẽ giúp hiểu được khu vực nào cần thử nghiệm trong AUT.

Rủi ro của hệ thống là một thông số quan trọng trong mô hình thống kê phụ thuộc vào xác suất xảy ra lỗi và hậu quả của lỗi. Chứng minh chung này từ Ấn Độ sẽ phụ thuộc vào chất lượng mã ở mức độ lớn. Nó sẽ được gây ra bởi các yếu tố như thiết kế kém hoặc được viết bởi lập trình viên chưa có nhiều kinh nghiệm. Chất lượng mã cũng có thể bị ảnh hưởng do chức năng phức tạp.

Hãy để chúng tôi xác định các tham số như sau:

Xác suất xảy ra lỗi - P (f)

Hậu quả của một vấn đề đối với khách hàng - C (c) Hậu quả của một vấn đề đối với nhà cung cấp - C (v).

### Hậu quả của một vấn đề cho khách hàng sẽ bao gồm:

1.Lỗi với rủi ro cao có thể dẫn đến mối đe dọa pháp lý
2. Có thể khiến khách hàng mất thị trường
3. Vi phạm quy định về FDI
Hai tham số C (c) và C (v) kết hợp với xác suất thất bại dẫn đến rủi ro, Re (f)

Re (f) = P (f) * (C (c) + C (v)) / 2

`Các thông số hậu quả cho khách hàng và nhà cung cấp thường được cân nhắc giữa 1-3. Xác suất thất bại có trọng số từ 0-1.`

Xác suất tham số thất bại dựa trên các khía cạnh sau:

1. Chức năng sửa đổi
2. Chức năng mới
3. Chất lượng thiết kế
4. Quy mô dự án
5. Phức tạp
6. Kỹ năng lập trình viên
Các loại phương pháp thử nghiệm khác nhau như System testing, core system testing , lĩnh vực kinh doanh cụ thể, Integration testing etc, v.v ... cần phải được thực hiện. Nhóm QA cũng cần tập trung vào kiểm tra hồi quy, kiểm tra adhoc, đặc biệt tập trung vào kiểm tra toàn vẹn dữ liệu và kiểm tra khối lượng.

### Các tham số đầu vào cần thiết để thiết kế mô hình thống kê là gì?

* Đếm các vấn đề
* Bản chất của khuyết tật: Khiếm khuyết DB, Khiếm khuyết khu vực Web
* Phân loại vấn đề: Điều này chủ yếu liên quan đến nguồn gốc của vấn đề - nếu đó là từ DB, máy chủ ứng dụng
* Nỗ lực liên quan đến việc khắc phục sự cố và khắc phục chúng
* Trọng số được gán cho hàm xác suất

### Thủ tục kiểm tra dựa trên rủi ro:

* Khiếm khuyết cần xác định
* Điều này phải được theo sau bằng cách kiểm tra xác suất của nhiều yếu tố có thể cản trở chất lượng sản phẩm
* Lấy giá trị cho hệ số tiếp xúc rủi ro.
* Hệ số rủi ro tiếp xúc cần được đưa vào các thuật toán lặp
* Xác định loại và số lượng các trường hợp thử nghiệm được yêu cầu cho Thử nghiệm dựa trên rủi ro.

![](https://images.viblo.asia/0e5ea763-1e80-47db-9d36-402d0277a52c.png)

Trong ứng dụng thời gian thực, hãy tưởng tượng rằng có 1000-2000 trường hợp thử nghiệm. Giả sử rằng nhóm QA hiểu dựa trên phân tích hiện tại rằng trường hợp thử nghiệm thứ 21 hoặc 31 sẽ dẫn đến lỗi trong một khu vực cụ thể theo các kỹ thuật lấy mẫu. Cũng hãy tưởng tượng rằng có những lỗi khác từ một khu vực khác. Nhóm QA có thể lấy mẫu chúng trên một thuật toán chung và tìm nạp chúng vào một thuật toán. Điều này giúp xác định giá trị của hệ số rủi ro. Đối với các khu vực có Re (f) cao, các khu vực đó cần được cung cấp bảo hiểm đầy đủ.

### Những gì tất cả các thử nghiệm cần phải được thực hiện cho bảo hiểm đầy đủ?

1. Kiểm tra trình duyệt chéo
2. Kiểm tra khả năng tương thích
3. Xác minh và xác nhận
4. Kịch bản tích cực và tiêu cực
5. CR
6. Xác nhận BR
7. Kiểm tra giao diện
8. Kết thúc để kết thúc thử nghiệm.

Nguồn https://www.softwaretestingclass.com/risk-based-testing-statistical-model-and-testing-approach/