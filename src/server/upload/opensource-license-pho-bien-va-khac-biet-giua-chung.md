Hiện nay hầu hết các dự án đều sử dụng các open source từ github, chắc hẳn không ít lần bạn để ý đến giấy phép mã nguồn mở như GPL, MIT, BSD... Nhưng thực sự chúng có gì khác nhau và ảnh hưởng thế nào khi sử dụng? 
# 0. Tổng hợp
Đúng ra phần này nằm cuối cùng nhưng nếu bạn nào muốn đỡ tốn thời gian thì đọc đây cho nhanh.

Cơ bản thì các giấy phép công cộng đều có 2 thành phần chính:
- Thông báo giấy phép.
- Phủ nhận trách nhiệm (Nếu bạn làm gì phạm pháp thì người viết ra nó không phải chịu trách nhiệm).

![](https://images.viblo.asia/cf0ef92f-20af-4cbd-9eca-5557636f4b87.png)

Bảng trên tổng hợp sự khác biệt giữa các giấy phép. Dưới đây sẽ là chi tiết về sự khác biệt giữa các giấy phép sắp xếp theo từ thoải mái đến chặt chẽ.

# 1. MIT
Giấy phép ngắn gọn nhất, chỉ bao gồm 2 thành phần cơ bản như đã nêu ở trên. Theo đó giấy phép này cho phép người sử dụng hoàn toàn thoải mái sử dụng, sửa đổi, nghiên cứu, phát hành lại...

Những phần mềm có giấy phép MIT có thể được sản xuất, không hạn chế, bất kỳ công cụ phái sinh nào từ phần mềm gốc và thậm chí gặt hái lợi ích thương mại từ việc bán sản phẩm thứ cấp.

Ở đây công cụ phái sinh (Không phải phát sinh, không viết sai chính tả đâu) là các sản phẩm thứ cấp sử dụng sản phẩm có giấy phép MIT. Ví dụ Mariadb là phái sinh của Mysql nhưng web bạn code ra có gọi đến mysql server thì không.

# 2. BSD và 3-Clause BSD

Các giấy phép nguồn mở cho phép này tương tự như giấy phép MIT, với một điểm khác biệt nhỏ nhưng quan trọng: trong khi nó bao gồm các thông báo bản quyền và từ chối trách nhiệm, nó cũng cung cấp một điều khoản không thuộc tính bổ sung để bảo vệ người tạo ban đầu của phần mềm. Điều khoản này được gọi một cách không chính thức là điều khoản không chứng thực. Đây là yêu cầu các nhà phát triển phải có được sự cho phép rõ ràng trước khi sử dụng tên gốc của người tạo để quảng bá các sản phẩm phái sinh.

Tương tự trường hợp MariaDB, nếu người phát hành MySQL không đồng ý với việc nhắc đến MySQL khi phân phối MariaDB thì việc quảng cáo rằng MariaDB là 1 phái sinh của MySQL là không hợp lệ.

3-Clause BSD là phiên bản rút gọi của BSD khi đã bỏ "advertising clause" từ BSD 4 clause (Bản gốc). 
# 3. Apache 2.0
Apache là giấy phép nguồn mở của Apache Software Foundation - ASF. Tương tự như các giấy phép phần mềm tự do khác, Giấy phép Apache trao cho người dùng phần mềm quyền tự do sử dụng phần mềm với bất kỳ mục đích nào, phân phối, chỉnh sửa, và phân phối bản có sửa đổi của phần mềm, theo các điều khoản của giấy phép, mà không lo lắng tới phí bản quyền.

[Các điều khoản giấy phép (Trích wiki):](https://vi.wikipedia.org/wiki/Gi%E1%BA%A5y_ph%C3%A9p_Apache#C%C3%A1c_%C4%91i%E1%BB%81u_kho%E1%BA%A3n_gi%E1%BA%A5y_ph%C3%A9p)
- Giấy phép Apache được xem là loại giấy phép không có nhiều ràng buộc vì nó không bắt buộc phiên bản đã thay đổi của phần mềm phải được phân phối với cùng giấy phép (không giống như các giấy phép copyleft). Trong mỗi tập tin được cấp phép, bất kỳ bản quyền, bằng sáng chế, thương hiệu, và thông báo ghi công phải được giữ nguyên trong các đoạn mã khi phát hành lại (ngoại trừ các thông báo không liên quan đến tác phẩm phái sinh); và, trong tất cả các tập tin có thay đổi, phải thêm vào một thông báo nói rằng tập tin này đã được thay đổi.

- Nếu có một tập tin văn bản NOTICE trong bản phân phối tác phẩm gốc, thì các tác phẩm phái sinh phải kèm theo bản sao của thông báo nào bên trong tập tin NOTICE đi kèm với tác phẩm phái sinh, bên trong mã nguồn hoặc tài liệu hướng dẫn sử dụng, hoặc bên trong một giao diện của tác phẩm phái sinh (tại nơi thường hiển thị thông báo của bên thứ ba).

- Nội dung của tập tin NOTICE không được thay đổi giấy phép, vì chúng chỉ mang tính thông tin thuần túy, và được phép thêm vào thông báo ghi công vào phần bổ sung của tập tin NOTICE, miễn là các thông báo này không bị hiểu thành thay đổi giấy phép. Những sự thay đổi có thể có các thông báo bản quyền phù hợp, và có thể có điều khoản giấy phép khác biệt cho phần sửa đổi.

- Trừ khi có tuyên bố khác, bất kỳ đóng góp nào do người được cấp phép gửi cho người cấp phép sẽ tuân theo các điều khoản của giấy phép mà không kèm điều khoản và điều kiện, nhưng điều này không ảnh hưởng đến các thỏa thuận riêng rẽ giữa hai bên liên quan đến phần đóng góp này.

Túm lại vác đi đâu nhớ mang Notice.

# 4. GNU GPL
Trước khi MIT và BSD ra đời GPL từng là giấy phép phổ biến nhất. Tương tự các giấy phép trên GPL đảm bảo quyền tự do chạy, nghiên cứu, sửa đổi và chia sẻ phần mềm. 

Mặc dù các giấy phép cho phép như Apache 2.0 cho phép các nhà phát triển đưa vào các tuyên bố bản quyền của riêng họ, các giấy phép copyleft như GPL không cung cấp đặc quyền như vậy. Thay vào đó, các quy tắc giấy phép GPL yêu cầu tất cả các tác phẩm phái sinh phải tuân theo giấy phép gốc. Điều này có nghĩa là các nhà phát triển không thể đưa ra yêu cầu bằng sáng chế hoặc bản quyền trên phần mềm gốc.