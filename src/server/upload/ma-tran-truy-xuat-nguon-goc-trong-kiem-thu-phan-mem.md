Ma trận truy xuất nguồn gốc trong kiểm thử phần mềm là một công cụ cần thiết cho bất kỳ người kiểm thử phần mềm nào. Nó nên được áp dụng trong toàn bộ vòng đời phát triển phần mềm để mang lại sự minh bạch và đầy đủ cho các nỗ lực kiểm thử phần mềm.

# 1. Yêu cầu kiểm thử phần mềm đối với ma trận truy xuất nguồn gốc

Nói một cách đơn giản, ma trận truy xuất nguồn gốc các yêu cầu kiểm thử là tài liệu theo dõi và phản ánh yêu cầu của người dùng, thường là ID yêu cầu từ tài liệu đặc tả , ID trường hợp kiểm thử. Mục đích của tài liệu này là để đảm bảo rằng tất cả các yêu cầu đều được bao hàm trong các trường hợp kiểm thử và không bị bỏ sót bất cứ trường hợp nào.

Tài liệu ma trận truy xuất nguồn gốc được chuẩn bị để cho khách hàng thấy rằng phạm vi bảo đảm đã hoàn tất. Nó thường bao gồm các cột sau: yêu cầu, số tham chiếu tài liệu cơ sở, trường hợp / điều kiện kiểm thử và lỗi / ID lỗi ( requirement, baseline document reference number, test case/condition and defect/bug ID). Sử dụng tài liệu này, người đó có thể theo dõi Yêu cầu dựa trên id Lỗi.

Thêm một vài cột nữa vào ma trận truy xuất nguồn gốc cung cấp cho bạn một danh sách kiểm tra bao phủ phạm vi cho các trường hợp kiểm thử một cách tốt nhất.

# 2. Các loại ma trận truy xuất nguồn gốc
1. **Truy xuất nguồn gốc xuôi (Forward Traceability)**: Phản ánh các yêu cầu đến các trường hợp kiểm thử.
1. **Truy xuất nguồn gốc ngược (Backward Traceability)**: Phản ánh các trường hợp kiểm thử thành các yêu cầu.
1. **Truy xuất nguồn gốc hai hướng (Bi-Directional Traceability)**: Một ví dụ điển hình về ma trận truy xuất nguồn gốc hai hướng được sử dụng trong kiểm thử phần mềm là các tham chiếu từ các trường hợp kiểm thử đến tài liệu cơ sở và ngược lại.

Truy xuất nguồn gốc xuôi giúp xem xét các yêu cầu nào sẽ được đề cập trong các trường hợp kiểm thử nào? Hoặc liệu một yêu cầu có được đảm bảo hay không.

Ma trận truy xuất nguồn gốc xuôi đảm bảo rằng chúng ta đang xây dựng sản phẩm phù hợp.

Ma trận truy xuất nguồn gốc ngược giúp xem xet các trường hợp kiểm thử nào sẽ được phản ánh theo các yêu cầu nào.

Điều này sẽ giúp chúng ta xác định được nếu có các trường hợp kiểm thử không theo dõi bất kỳ mục đảm bảo nào. Nếu trường hợp kiểm thử không tuân theo một phạm vi đảm bảo nào, thì nó có thể là không bắt buộc, nên được loại bỏ, hoặc nếu không thì một đặc điểm kỹ thuật như một yêu cầu phải được thêm vào. Do đó, việc truy xuất nguồn gốc ngược này cũng rất hữu ích nếu bạn muốn xác định rằng một trường hợp kiểm thử cụ thể đang bao gồm bao nhiêu yêu cầu.

Ma trận truy xuất nguồn gốc ngược đảm bảo rằng chúng ta đang xây dựng sản phẩm đúng.

Ma trận truy xuất nguồn gốc hai hướng chứa cả khả năng truy xuất nguồn gốc xuôi và ngược.

# 3. Tại sao lại sử dụng ma trận truy xuất nguồn gốc trong kiểm thử phần mềm?

Ma trận truy xuất nguồn gốc là câu trả lời cho các câu hỏi sau khi kiểm thử bất kỳ dự án phần mềm nào:

* Làm thế nào để đảm bảo rằng đối với mỗi giai đoạn của SDLC, đã tính toán chính xác tất cả các nhu cầu của khách hàng?
* Làm cách nào để chứng nhận rằng sản phẩm phần mềm cuối cùng đáp ứng được nhu cầu của khách hàng? Nó cho phép đảm bảo các yêu cầu được đề cập trong các trường hợp kiểm thử.

## Nhược điểm của việc không sử dụng ma trận truy xuất nguồn gốc:
* Nhiều khiếm khuyến ( defect) được tìm thấy trong sản phẩm và  phạm vi kiểm thử không được xác định.
* Việc phát hiện ra các lỗi sau đó trong chu kỳ phát triển dẫn đến các bản sửa lỗi đắt hơn.
* Khó khăn khi lập kế hoạch và theo dõi dự án.
* Sự hiểu lầm giữa các nhóm khác nhau về sự phụ thuộc của dự án, sự chậm trễ, v.v.

## Lợi ích của việc sử dụng ma trận truy xuất nguồn gốc:

* Làm cho khách hàng thấy rõ rằng phần mềm đang được phát triển theo yêu cầu.
* Đảm bảo rằng tất cả các yêu cầu đều là một phần của các trường hợp kiểm thử.
* Đảm bảo rằng các nhà phát triển không tạo ra các tính năng mà không ai yêu cầu.
* Giúp dễ dàng xác định các chức năng còn thiếu.
* Giúp dễ dàng tìm ra trường hợp kiểm thử nào cần cập nhật nếu có yêu cầu thay đổi.

# 3. Cách tạo ma trận truy xuất nguồn gốc
1. Mở Excel để tạo Ma trận truy xuất nguồn gốc:
2. Xác định các cột sau:
*  ID ca sử dụng / ID yêu cầu. (Use case ID / requirement ID)
*  Mô tả ca sử dụng / yêu cầu. (Use case / requirement description)
*  Một cột cho mỗi trường hợp thử nghiệm.
3. Xác định tất cả các yêu cầu có thể kiểm tra ở cấp độ chi tiết từ tài liệu yêu cầu. Các yêu cầu điển hình bạn cần nắm bắt như sau:
* Các trường hợp đã sử dụng (tất cả các luồng được ghi lại)
* Thông báo lỗi
* Yêu cầu kinh doanh
* Yêu cầu chức năng
* Thông số kỹ thuật yêu cầu của phần mềm
* Thông số kỹ thuật yêu cầu của chức năng
4. Nhận dạng tất cả các kịch bản kiểm thử và các luồng kiểm thử.
5. Phản ánh ID yêu cầu với các trường hợp kiểm thử. 

*Giả sử (theo bảng bên dưới), Trường hợp kiểm thử “TC 001” là một luồng hoặc một kịch bản. SR-1.1 và SR-1.2 được đảm bảo .*

6. Bây giờ từ bảng bên dưới, bạn có thể dễ dàng xác định các trường hợp kiểm thử nào bao gồm các yêu cầu nào và các trường hợp kiểm thử nào cần cập nhật nếu có bất kỳ yêu cầu thay đổi nào.

| ID yêu cầu  | Mô tả yêu cầu | TC001 | TC002 | TC003|
| -------- | -------- | -------- | -------- | -------- |
|SR-1.1   | Người dùng sẽ có thể làm điều này.     | x   |   |      |
| SR-1.2      |Người dùng sẽ có thể làm điều đó.    | x   |    |    |
| SR-1.3      |Khi nhấp vào đây, thông báo sau sẽ xuất hiện.    |     |x  |     |
| SR-1.4      |  |     |x   |  |
| SR-1.5    |   | x   |   | x   |
| SR-1.6     |   |     |    |x   |
| SR-1.7     |    |    |x     |   |

Đây là một dạng ma trận truy xuất nguồn gốc rất cơ bản. Bạn có thể thêm nhiều cột khác và làm cho nó hiệu quả hơn. Dưới đây là một số cột bạn nên xem xét thêm:

* ID
* Assoc ID (PGS ID)
* Các giả định kỹ thuật
* yêu cầu của khách hàng
* Yêu cầu về chức năng
* Tình trạng
* Tài liệu cấu trúc / thiết kế
* Thông số kỹ thuật
* Thành phần hệ thống
* Mô-đun phần mềm
* Số trường hợp kiểm thử
* Đã kiểm tra ở trong
* Thực hiện ở trong
* Xác minh
* Ý kiến khác

# Tài liệu tham khảo 

https://www.optimusinfo.com/blog/software-testing-traceability-matrix