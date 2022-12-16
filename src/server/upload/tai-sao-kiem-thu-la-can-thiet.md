Kiểm thử phần mềm là cần thiết vì không có gì là hoàn hảo , tất cả chúng ta đều có thể mắc lỗi ở những mức độ khác nhau . Một số những sai lầm là không quan trọng, nhưng một số khác là rất nghiêm trọng bạn sẽ phải mất rất nhiều tiền hoặc nguy hiểm bởi lỗi lầm đấy. Chúng ta cần phải kiểm tra mọi thứ và bất cứ thứ gì chúng ta sản xuất ra bởi vì mọi thứ luôn có thể sai - con người luôn phạm sai lầm.

Vì vậy tôi cho rằng công việc của chúng ta dù ít hay nhiều cũng có thể có những sai lầm, do đó tất cả chúng ta đều cần phải kiểm tra công việc của mình. Thường một số sai lầm đến từ các giả định xấu và các điểm mù, vì vậy chúng ta có thể mắc phải những sai lầm tương tự khi chúng ta không thực hiện kiểm thử, hoặc tự mình kiểm thử công việc của mình. Việc tự kiểm tra sẽ làm cho chúng ta không thể nhận thấy những sai sót, vì mặc định chúng ta đã làm đúng các yêu cầu đúng không ?
    
Nên chúng ta nên nhờ người khác kiểm tra công việc của mình vì một người khác , người đứng ở cương vị người dùng khắt khe sẽ có nhiều khả năng phát hiện ra các sai sót. 
 
 Trước khi đưa ra những nguyên nhân chúng ta hãy cùng tìm hiểu các vấn đề sau.


# 1. Ngữ cảnh của các hệ thống phần mềm
Các hệ thống phần mềm là 1 phần của cuộc sống. Bạn đã từng sử dụng 1 phần mềm chạy không đúng với mong đợi chưa?

Phần mềm làm việc không đúng có thể dẫn đến nhiều vấn đề:
 * Mất tiền
* Mất thời gian
* Mất uy tín kinh doanh
 * Dẫn đến bệnh tật hoặc cái chết
# 2.  Nguyên nhân của lỗi
Các định nghĩa:
+ Error/mistake: Là hành động của con người dẫn đến kết quả sai.
+ Bug/Defect/Fault: Là một khiếm khuyết trong một thành phần hoặc hệ thống mà nó có thể làm cho thành phần hoặc hệ thống này không thực hiện đúng chức năng yêu cầu của nó. => Một bug, nếu gặp phải trong quá trình hệ thống hoạt  động, có thể gây ra failure trong thành phần hoặc hệ thống.
+ Failure: Sự khác biệt giữa kết quả thực tế và kết quả mong đợi của một thành phần, hệ thống hoặc service nào đó.

***Tóm lại :*** con người gây ra error, mistake trong code, tài liệu,... dẫn đến có bug, defect hoặc fault trong code, tài liệu, khi thực thi chương trình thì bắt gặp failure.
### Nguyên nhân của lỗi (Defect)
- Con người làm sai
- Áp lực về thời gian
- Code phức tạp
- Hạ tầng(infrastructure) phức tạp
- Thay đổi công nghệ
- Tương tác với nhiều hệ thống
### Nguyên nhân của lỗi (Failure)
Điều kiện môi trường.

VD: Các firmware bị ảnh hưởng bởi bức xạ, từ tính, trường điện từ, bụi bẩn, thay đổi phần cứng ảnh hưởng đến phần mềm.
# 3.  Vai trò của kiểm thử trong phát triển, bảo trì và vận hành phần mềm
Kiểm thử nghiêm ngặt làm:
+ Giảm rủi ro xảy ra lỗi khi vận hành
+ Tăng chất lượng phần mềm
khi defect được tìm thấy và được sửa đúng.

Việc kiểm thử cũng cần phù hợp với các yêu cầu chính thức hoặc theo hợp đồng hoặc theo chuẩn công nghiệp cụ thể.
# 4.  Kiểm thử và chất lượng
Có thể đo đạc chất lượng phần mềm theo lượng defect tìm thấy của:
+ Các yêu cầu chức năng (functional)
+ Yêu cầu phi chức năng (non-functional)
+ Các đặc tính(Characteristic) của nó (độ tin cậy, khả năng sử dụng, tính hiệu quả, khả năng bảo trì, khả năng tương thích...)

Theo chuẩn chất lượng sản phẩm phần mềm ISO 9126.

Kiểm thử mang lại sự tin tưởng về chất lượng nếu ít hoặc không có defect được tìm thấy.

Các test được thiết kế đầy đủ mà PASS thì giúp giảm mức độ rủi ro trong hệ thống.

Kiểm thử tìm ra defect, sau đó defect được fix sẽ dẫn đến chất lượng phần mềm tăng.

Là bài học cho các dự án sau:
+ Hiểu nguyên nhân gốc rễ của defect trong dự án khác dẫn đến cải thiện quy trình giúp ngăn chặn tái diễn .Tất yếu chất lượng được cải thiện.
    
Kiểm thử là một trong những hoạt động đảm bảo chất lương (bên cạnh các chuẩn về chất lượng, training, phân tích lỗi).
# 5. Kiểm thử bao nhiêu là đủ?
Quyết định test bao nhiêu phụ thuộc vào mức độ rủi ro, như: 
+ Công nghệ
+ Độ an toàn
+ Rủi ro nghiệp vụ 
+ Các ràng buộc  thời gian và tiền (budget)
# 6. Kết luận
Kiểm thử phần mềm là rất quan trọng vì:



1. Kiểm thử phần mềm thực sự được yêu cầu để chỉ ra các defects và errors đã được thực hiện trong các giai đoạn phát triển phần mềm.

2. Đó là điều cần thiết vì nó đảm bảo độ tin cậy của Khách hàng và sự hài lòng của họ trong ứng dụng.

3. Nó là rất quan trọng để đảm bảo chất lượng của sản phẩm. Sản phẩm chất lượng được giao cho khách hàng giúp họ kiếm được lợi nhuận nhiều hơn cho công việc, lấy được sự tin cậy từ khách hàng. (Biết thêm về Chất lượng Phần mềm).

4. Thử nghiệm là cần thiết để cung cấp các thiết bị cho khách hàng như phân phối sản phẩm chất lượng cao hoặc ứng dụng phần mềm đòi hỏi chi phí bảo trì thấp hơn và do đó dẫn đến kết quả chính xác, nhất quán và đáng tin cậy hơn.

5. Thử nghiệm là cần thiết  để cho ra ứng dụng phần mềm hoặc sản phẩm hiệu quả.

6. Điều quan trọng là phải đảm bảo rằng ứng dụng sẽ không dẫn đến bất kỳ lỗi nào vì nó có thể rất tốn kém trong việc bảo trì tương lai hoặc trong các giai đoạn sau của quá trình phát triển. Sau khi đã giao sản phẩm cho khách hàng , mà có bất kì lỗi phát sinh chúng ta sẽ phải bồi thường một khoản chi phí có thể rất lớn , làm ảnh hưởng đến uy tín .

7. Điều đó là cần thiết luôn tồn tại trong kinh doanh .
# Tài liệu tham khảo
http://istqbexamcertification.com/why-is-testing-necessary/