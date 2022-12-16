Bài viết này của mình mang tính chất tổng hợp, và tự kiểm tra lại kiến thức Ruby on Rails sau một quá trình làm quen và học ngôn ngữ này.
## 1. Block vs Proc 
* Block là 1 tập hợp câu lệnh được viết thành 1 khối, còn Proc là một Object
* Proc là Block đã được định danh
* Block chỉ được sử dụng 1 lần, là một phần của hàm nên không có ý nghĩa khi đứng độc lập
* Proc khắc phục nhược điểm khả năng sử dụng hạn chế của Block, có thể dùng nhiều lần

## 2. Proc vs Lambda
* Proc linh hoạt đối số
* Lamda nghiêm ngặt về đối số, nếu đối số truyền vào sai, nó sẽ trả về `Argument Error`
* Khi sử dụng return, lamda chỉ dừng khi kết thúc hàm, nghĩa là dù gặp `lambda {return }` thì câu lệnh phía sau đó vẫn được thực hiện, và chỉ dừng lại khi hàm kết thúc. Còn khi sử dụng Proc thì nếu gặp `return` hàm sẽ dừng lại ngay.
## 3. String vs Symbol
* String là một array mà các phần tử của nó là một ký tự kiểu char
* Symbol có thể hiểu là một object được đặt tên
* String có thể thay đổi được nội dung của nó, còn symbol thì không.
* Symbol không tạo mới đối tượng, mà sẽ lấy nó từ bộ nhớ => tiết kiệm bộ nhớ
* Khi so sánh, symbol chỉ so sánh nếu nó là cùng một đối tượng, nên tốc độ so sánh của symbol nhanh hơn String
* String có nhiều phương thức hữu dụng hơn symbol, nhưng vì tình bất biến của mình nên symbol thường được chọn để là keys cho Hash
## 4. Scope vs Class method
* Scope cũng là một Class method
* Scope luôn trả về object, trong khi đó Class method có thể trả về nil
* Scope có thể gọi liên tiếp được, khi gọi liên tiếp, các scope sẽ được hiểu thành 1 câu truy vấn liên kết với nhau bằng AND
* Scope có thể mở rộng được
## 5. Class vs Module
* Class: Có thể khởi tạo và kế thừa class khác, song nó không cho phép đa thừa kế
* Module: Tuy không thể khởi tạo cũng như không có tính thừa kế, nhưng sử dụng module mixin sẽ cho phép đa thừa kế
## 6. Class vs Object
* Class là một lớp các khuôn mẫu dùng để tạo ra các Objects
* Object là một đối tượng, là thể hiện của Class
## 7. Form_for, Form_tag và Form_with
* Form_for dùng cho đối tượng (Sử dụng khi tạo mới hoặc cập nhật đối tượng)
* Form_tag dùng khi không có đối tượng, sử dụng `Form builder fielder helper` để tạo các field
* Form_with dùng khi có hay không có đối tượng đều được, sử dụng `Form builder` để tạo các field
* Form_for và Form_tag các field được gán id và class tự động, còn form_with phải tự tạo id, class thủ công
* Cuối cùng, Form_with khác 2 cái còn lại ở chỗ, form_with được mặc định sẵn chế độ remote true, nghĩa là form_with sẽ được submit bởi Ajax.
## 8. PUT vs PATCH
### Put và patch đều được sử dụng khi muốn update dữ diệu, nhưng:
* PUT: Update toàn bộ thông tin
* PATCH: Update một phần, một hay một vài trường
## 8. Class method vs Instance method
* Class method được gọi thông qua class
* Instance method được gọi bởi một object của class
## 9. Resource vs Resources
* Tự động tạo ra các routes dành cho 7 phương thức mặc định: `Index`, `Show` `New`, `Create`, `Update`, `Edit`, `Destroy`
* Tạo ra các routes cho một đối tượng củ thể, nên nó không có phương thức `Index`, các phương thức còn lại giống như Resources
## 10. Collection vs Member
* Được sử dụng trong resources với mục đích tạo ra các routes cho các method không phải là 7 phương thức mặc định (liệt kê ở trên)
* Collection không yêu cầu Id, Member yêu cầu Id
## 11. Map, Collect, Select, Inject, Reject
* Map: Lấy tất cả đối tượng, trả về mảng mới là kết quả của một xử lý nào đó
* Collect: return về 1 mảng từ mảng ban đầu với điều kiện trong block
* Select: Duyệt từng phần tử trong mảng, rồi thực hiện câu lệnh ở khối block, trả về kết quả sau khi thực thi
* Inject: Giống Each, chỉ duyệt và thực thi câu lệnh, không return kết quả sau khi thực hiện
* Reject: Tương tự như select, nhưng thay vì theo logic là select trả về true, thì reject sẽ trả kết quả khi điều kiện trong khối lệnh là false.
## 12. Delete vs Destroy
* Delete: Đơn thuần là gọi một câu truy vấn SQL, bỏ qua việc check validate, các hàm `callbacks`
* Detroy: Trước khi gọi câu truy vấn SQL để thực hiện việc xóa, thì sẽ chạy các hàm `callbacks` và kiểm tra validate
## 13. Find vs Find_by
* Find: Trả về Exception nếu không tìm thấy bản ghi nào
* Find_by: Nếu không tìm thấy bản ghi nào thì sẽ trả về nil chứ khống bắn ra Exception