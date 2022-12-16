# 1. Khái niệm của kiểm thử hộp xám?
* Nếu bạn đã từng nghe đến kiểm thử hộp đen kiểm thử hộp trắng thì ở đây, kiểm thử hộp xám là sự kết hợp của cả 2 loại kiểm thử trên. 

* Cụ thể, trong kiểm thử hộp trắng sự hiểu biết về cấu trúc bên trong hệ thống là thiết yếu và phải rõ ràng còn trong kiểm thử hộp đen sự hiểu biết này lại không quá cần thiết, nhưng với kiểm thử hộp xám người kiểm thử cần phải có một phần sự hiểu biết về cấu trúc của hệ thống cũng như là quyền truy cập vào cơ sở dữ liệu.

# 2. Tại sao phải kiểm thử hộp xám ?
* Kiểm thử hộp xám có sự kết hợp giữa lợi ích của kiểm thử hộp đen và hộp trắng.
* Kiểm thử hộp xám thường được sử dụng trong Kiểm thử tích hợp (Intergration test). Tuy nhiên, dựa vào giải thuật và chức năng, nó cũng có thể được sử dụng ở nhiều mức kiểm thử khác nhau.
* Cách tiếp cận của phương pháp này hết sức hữu ích khi kiểm tra các ứng dụng web.
* Trong quá trình tiến hành kiểm thử hộp xám, người kiểm thử sẽ tạo input vào từ phía front-end, sau đó xác minh dữ liệu từ phía back-end.

# 3. Ưu điểm và nhược điểm

## a. Ưu điểm
* Quan điểm kiểm thử của kiểm thử hộp xám là từ quan điểm của người dùng.
* Cung cấp các lợi ích của cả thử nghiệm hộp đen và hộp trắng cùng nhau.
* Sẽ dựa trên các đặc tả chức năng, mô tả của người dùng và sơ đồ kiến trúc hệ thống, từ đó xác nhận các yêu cầu ngay từ ban đầu.
* Việc kiểm tra sẽ tường minh vì sẽ có nhiều sự quan tâm giữa người kiểm thử phần mềm và người thiết kế hoặc kỹ sư.
## b.  Nhược điểm
* Kiểm tra hộp xám cũng có thể mất nhiều thời gian để kiểm tra từng đường dẫn và đôi khi điều này là không thực tế.
* Rất khó để liên kết lỗi khi thực hiện kiểm tra hộp xám cho một ứng dụng có hệ thống phân tán.
* Thông thường sẽ dẫn đến phạm vi kiểm tra thấp hơn so với thực hiện kiểm tra hộp trắng và đen riêng biệt.
* Có thể không phù hợp để thử nghiệm một số loại chức năng.

# 4. Kỹ thuật trong kiểm thử hộp xám
## a. Kiểm thử ma trận (Matrix Testing)
* Đây là loại kiểm thử nhằm xác định các biến đang tồn tại trong hệ thống. Và khi ma trận được ghi lại đầy đủ với các dữ liệu đầu vào cho tất cả các biến có sẵn, nó sẽ trở nên như là một danh sách để đảm bảo rằng không bỏ xót một trường hợp nào.
## b. Kiểm thử hồi quy (Regression Testing)
* Khi có 1 chức năng mới thêm vào, để đảm bảo chức năng mới này không làm ảnh hưởng đến các chức năng khác trong hệ thống, chúng ta cần phải cân nhắc việc kiểm tra lặp lại những trường hợp đã từng kiểm thử rồi. Lúc này việc kiểm thử lặp lại được gọi là kiểm thử hồi quy.
## c. Kiểm thử mảng trực giao (Orthogonal Array Testing or OAT)
* Đây như là một kỹ thuật thống kê để tạo ra hoán vị các đầu vào, tạo ra các test case có phạm vi kiểm tra tối ưu để giảm công sức của con người trong giai đoạn lập kế hoạch thử nghiệm và thiết kế thử nghiệm.
## d. Kiểm thử mẫu (Pattern Testing)
* Kỹ thuật này được thực hiện trên lịch sử dữ liệu của các lỗi hệ thống trước đó. Không giống như thử nghiệm hộp đen, kiểm thử hộp xám đào sâu vào trong mã nguồn và xác định lý do tại sao sự cố xảy ra.
## e. Ngoài ra
* Thông thường, phương pháp kiểm thử hộp xám sử dụng các công cụ kiểm thử phần mềm tự động để tiến hành kiểm tra. Và còn có các stubs và module drivers được tạo giúp giải tỏa 1 phần quá trình kiểm thử bằng cách viết code thủ công. 

# 5. Tổng kết
Với thử nghiệm hộp xám, tổng chi phí cho các lỗi hệ thống có thể được giảm và ngăn chặn để không thể vượt qua. Loại kiểm thử này phù hợp hơn với kiểm thử GUI, chức năng, đánh giá bảo mật, ứng dụng web, dịch vụ web, v.v.. Thay vì sử dụng kỹ thuật hộp đen và hộp trắng thì để tận dụng sự hữu ích của cả 2 loại kiểm thử kia thì chúng ta có thể sử dụng kỹ thuật này.

**Tài liệu dịch/ tham khảo:**

https://www.guru99.com/grey-box-testing.html
https://blog.testlodge.com/what-is-grey-box-testing/
https://www.testbytes.net/blog/grey-box-testing/