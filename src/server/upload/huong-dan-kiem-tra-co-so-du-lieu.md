Các ứng dụng máy tính ngày nay phức tạp hơn và cũng có rất nhiều ứng dụng trên điện thoại thông minh.
Khi sự phức tạp của ứng dụng tăng lên sẽ yêu cầu một cơ sở dữ liệu (CSDL) an toàn và chất lượng hơn. Đối với các ứng dụng có tần suất giao dịch cao (ví dụ: ứng dụng ngân hàng hoặc tài chính) sẽ cần một CSDL đầy đủ tính năng.

Có một số công cụ CSDL ví dụ MS-Access, MS SQL Server, SQL Server, Oracle, Oracle Financial, MySQL, PostgreSQL, DB2, Toad, Admirer... Những công cụ này khác nhau về chi phí, độ mạnh, tính năng và bảo mật. Mỗi CSDL đều có những lợi ích và nhược điểm riêng.

## Tại sao phải kiểm thử Database (DB)

### 1. Data Mapping (Ánh xạ dữ liệu)

Trong các hệ thống phần mềm, dữ liệu thường truyền qua lại từ UI (giao diện người dùng) đến DB và ngược lại.

- Kiểm tra xem các trường trong UI/frontend có được ánh xạ nhất quán với các trường tương ứng trong bảng DB không.
- Bất cứ khi nào một hành động nhất định được thực hiện từ ứng dụng, một hành động như tạo, xem, cập nhật và xóa tương ứng sẽ được gọi ở phía CSDL. 

Người kiểm tra sẽ phải kiểm tra xem hành động đó có được gọi hay không và gọi có thành công hay không.

### 2. Xác thực thuộc tính ACID

Mỗi giao dịch mà DB thực hiện phải tuân thủ bốn thuộc tính này.

![](https://images.viblo.asia/318888cb-03e6-40b0-99f8-6b0cbb95c57c.jpg)

- **Atomicity** phản ánh kết quả của một giao dịch: thất bại hoặc thành công. Điều này có nghĩa là khi một phần của giao dịch không thành công thì toàn bộ giao dịch đã thất bại. 

- **Consistency**  Một giao dịch sẽ luôn có kết quả hợp lệ trong DB.

- **Isolation**: Nếu có nhiều giao dịch và chúng được thực hiện cùng một lúc, kết quả của DB sẽ giống như khi các giao dịch được thực hiện lần lượt.

- **Durability**: Nếu một giao dịch đã được thực hiện thì sẽ không có yếu tố bên ngoài nào như mất điện hoặc sự cố có thể thay đổi kết quả giao dịch.

### 3. Tính toàn vẹn dữ liệu

Khi ứng dụng đang được thực thi, người dùng cuối chủ yếu sử dụng các hoạt động CRUD để tương tác với DB. CRUD là gì?

**C: Create** - Khi người dùng lưu bất kì giao dịch mới nào, thao tác Create sẽ được thực hiện.
**R: Retrieve** - Khi người dùng tìm kiếm, hoặc xem trên bất kỳ giao dịch đã được lưu nào, thao tác Retrieve sẽ được thực hiện.
**U: Update** - Khi người dùng chỉnh sửa bản ghi hiện có, hoạt động Update sẽ được thực hiện.
**D: Delete** - Khi người dùng Xóa bất kỳ bản ghi nào khỏi hệ thống, hoạt động Delete sẽ được thực hiện.

Bất kỳ hoạt động CSDL nào được thực hiện bởi người dùng cuối luôn là một trong bốn điều trên.
Vì vậy, hãy nghĩ ra các trường hợp kiểm tra DB để kiểm tra dữ liệu ở tất cả các vị trí để xem dữ liệu có giống nhau không.

## Hoạt động kiểm tra dữ liệu

Kiểm thử CSDL nên tập trung vào các hoạt động kiểm tra sau:

### 1. Đảm bảo Data mapping (Ánh xạ dữ liệu)

Ánh xạ dữ liệu là một trong những khía cạnh quan trọng trong CSDL và nó phải được kiểm tra nghiêm ngặt bởi người kiểm thử phần mềm.
Đối với tất cả các hoạt động CRUD, hãy xác minh rằng các bảng và bản ghi tương ứng được cập nhật khi người dùng thực hiện lưu, sửa, tìm kiếm hoặc xóa khỏi GUI của ứng dụng.

Bạn cần xác minh những điều sau:

- Hoạt động ánh xạ bảng, ánh xạ cột và ánh xạ kiểu dữ liệu.
- Tra cứu ánh xạ dữ liệu.
- Hoạt động CRUD chính xác cho mọi hành động của người dùng tại UI.
- Hoạt động CRUD thành công.

### 2. Đảm bảo các thuộc tính ACID của giao dịch

Các thuộc tính ACID của giao dịch CSDL đề cập đến là Atomicity, Consistency, Isolation và Durability . Kiểm tra đúng bốn thuộc tính này phải được thực hiện trong hoạt động kiểm tra CSDL. Bạn cần xác minh rằng mọi giao dịch đơn lẻ đều thỏa mãn các thuộc tính ACID của CSDL.

![](https://images.viblo.asia/42d9bb1d-e999-4781-ab78-eac72df246ac.jpg)

Chúng ta hãy lấy một ví dụ đơn giản thông qua mã SQL bên dưới:

**CREATE TABLE  Test (A INTEGER, B INTEGER, CHECK (A + B = 100));**

Bảng kiểm tra sẽ có hai cột A và B. Có một ràng buộc toàn vẹn là tổng giá trị trong A và B phải luôn là 100.

- Atomicity test sẽ đảm bảo mọi giao dịch được thực hiện trên bảng này là thành công hoặc thất bại. Sẽ không có bản ghi nào được cập nhật nếu bất kỳ bước nào của giao dịch không thành công.

- Consistency test sẽ đảm bảo rằng bất cứ khi nào giá trị trong cột A hoặc B được cập nhật, tổng luôn luôn là 100. 

- Isolation test sẽ đảm bảo rằng nếu hai giao dịch xảy ra cùng một lúc và cố gắng sửa đổi dữ liệu của bảng Test, thì các giao dịch này được thực hiện một cách độc lập.

- Durability test sẽ đảm bảo rằng một khi giao dịch trên bảng này được thực hiện, nó sẽ vẫn như vậy, ngay cả trong trường hợp mất điện, sự cố hoặc lỗi.

### 3. Đảm bảo tính toàn vẹn dữ liệu

Đảm bảo rằng trạng thái dữ liệu mới nhất được phản ánh ở mọi nơi. Hệ thống phải hiển thị các giá trị được cập nhật gần đây nhất hoặc trạng thái của dữ liệu trên tất cả các biểu mẫu và màn hình. Điều này được gọi là tính toàn vẹn dữ liệu.

Các trường hợp kiểm tra để xác nhận tính toàn vẹn dữ liệu của cơ sở dữ liệu:

- Kiểm tra tất cả các triggers được đặt ra để cập nhật các bản ghi trong bảng.

- Kiểm tra xem có dữ liệu không chính xác trong các cột của mỗi bảng không.

- Cố gắng chèn dữ liệu sai vào bảng và quan sát nếu có lỗi xảy ra.

- Kiểm tra hoạt động thêm giá trị liên quan đến khóa chính và khóa phụ.

- Kiểm tra lỗi xảy ra nếu bạn xóa một bản ghi vẫn được tham chiếu trong bất kỳ bảng khác.

- Kiểm tra nếu các máy chủ và cơ sở dữ liệu được nhân rộng.

### Cách kiểm tra cơ sở dữ liệu (Quy trình từng bước)

Sau đây là các bước cơ bản:

Bước 1: Chuẩn bị môi trường

Bước 2: Chạy thử nghiệm

Bước 3: Kiểm tra kết quả kiểm tra

Bước 4: Xác thực theo kết quả dự kiến

Bước 5: Báo cáo kết quả cho các bên liên quan

![](https://images.viblo.asia/cf373d8d-9fde-4cd1-ab5f-74dc75876cc8.jpg)

Thông thường các truy vấn SQL được sử dụng để kiểm tra. Lệnh được sử dụng phổ biến nhất là SELECT.

## Một số lời khuyên thiết thực

**1. Tự viết truy vấn**

Để kiểm tra CSDL một cách chính xác, người kiểm tra cần có kiến thức rất tốt về các câu lệnh SQL. Người kiểm tra cũng nên biết cấu trúc DB bên trong của ứng dụng.

Bạn có thể kết hợp GUI và xác minh dữ liệu trong các bảng tương ứng. Nếu bạn đang sử dụng máy chủ SQL thì bạn có thể sử dụng Trình phân tích truy vấn SQL để viết các truy vấn, thực hiện chúng và truy xuất kết quả.

Đây là cách tốt nhất và mạnh mẽ để kiểm tra CSDL khi ứng dụng có mức độ phức tạp nhỏ hoặc trung bình.

Nếu ứng dụng rất phức tạp thì người kiểm tra khó có thể viết tất cả các truy vấn SQL. Đối với các truy vấn phức tạp, bạn cần sự giúp đỡ từ nhà phát triển.

**2. Nhận truy vấn từ các nhà phát triển**

Đây là cách đơn giản nhất để kiểm tra CSDL. Thực hiện bất kỳ hoạt động CRUD nào từ GUI và xác minh tác động của nó bằng cách thực hiện các truy vấn SQL tương ứng thu được từ nhà phát triển. Nó không đòi hỏi kiến thức tốt về SQL và cũng không đòi hỏi kiến thức tốt về cấu trúc DB của ứng dụng.

Nhưng phương pháp này cần được sử dụng thận trọng. Điều gì xảy ra nếu truy vấn do nhà phát triển đưa ra là sai về mặt ngữ nghĩa hoặc không đáp ứng chính xác yêu cầu của người dùng? 

Nguồn tham khảo:https://www.softwaretestinghelp.com/database-testing-process/