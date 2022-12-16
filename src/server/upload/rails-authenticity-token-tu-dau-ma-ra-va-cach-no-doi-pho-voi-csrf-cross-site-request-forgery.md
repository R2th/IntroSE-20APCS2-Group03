# *`authenticity_token từ đâu mà ra?`*
Khi chúng ta tạo form để thêm, sửa hoặc xóa tài nguyên nào đó, Rails tạo ra một **authenticity_token** ngẫu nhiên, lưu token này trong session và tạo một hidden field trong form đó. Khi người dùng submit form trên, Rails sẽ so sánh **authenticity_token** được lưu trong session và **authenticity_token** trong form. Nếu chúng giống nhau thì request sẽ không bị chặn lại.

# *`Tại sao lại cần authenticity_token?`*
Do **authenticity_token** được lưu trong session nên client sẽ không thế lấy được giá trị của nó. Việc này ngăn chặn hacker submit form từ một trang web khác mà không phải là trang web gốc nói trên. Giả sử bạn đang ở trang web A, đăng nhập vào hệ thống và mọi thứ hoạt động trơn tru. Sau đó, bạn truy cập một trang web B, nhìn thấy một bức ảnh và bấm vào nó để xem toàn màn hình. Và nếu như có một đoạn code nào đó ở trang web B cố tình gửi request đến server của trang web A (bạn đã đăng nhập từ trước) với mục đích xấu như xóa tài khoản, thay đổi thông tin, ... Ví dụ trên được gọi là **CSRF (Cross Site Request Forgery).**

Nếu như trang web A có **authenticity_token** thì sẽ ngăn chặn được **CSRF** vì request từ trang web B sẽ không thể có **authenticity_token** hợp lệ như trang web A.

# *`Lưu ý khi sử dụng authenticity_token`*
Rails chỉ dùng **authenticity_token** với những HTTP method ***có thể thay đổi dữ liệu*** như POST, PUT/PATCH và DELETE. HTTP GET sẽ không được kiểm tra **authenticity_token**. Lý do là bởi vì đặc điểm của HTTP GET request chỉ là lấy và hiển thị dữ liệu từ database chứ không được phép thêm, sửa, xóa tài nguyên từ server như các HTTP khác.

**Nguồn tham khảo:** https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token