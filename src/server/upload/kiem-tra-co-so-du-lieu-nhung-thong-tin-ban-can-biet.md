## 1.Kiểm thử cơ sở dữ liệu là gì?
Cơ sở dữ liệu ngày càng trở nên phức tạp hơn theo thời gian do lượng dữ liệu khổng lồ được lưu trữ trong hệ thống phần mềm. Thông qua quá trình xây dựng cơ sở dữ liệu, chúng tôi có thể đánh giá tính toàn vẹn của dữ liệu, tính hợp lệ của dữ liệu, hiệu suất cơ sở dữ liệu và các chức năng được bao bọc xung quanh nó.

Bằng cách thực hiện quy trình, tính ổn định tối đa, hiệu quả, hiệu suất và bảo mật của cơ sở dữ liệu có thể được kiểm tra theo thời gian để đảm bảo rằng phần mềm ổn định khi được triển khai trong môi trường cạnh tranh.

## 2.Các loại kiểm tra cơ sở dữ liệu
Chức năng và cấu trúc là những gì xác định loại kiểm thử phải được thực hiện trên hệ thống cơ sở dữ liệu. Trên cơ sở các yếu tố này, kiểm thử cơ sở dữ liệu có thể được chia thành
![](https://images.viblo.asia/7bbe1c57-70b4-406c-8c04-9aa9ddfacf07.png)
**Kiểm thử cơ sở dữ liệu có cấu trúc** - Các thành phần của cơ sở dữ liệu không hiển thị cho người dùng phải được kiểm tra. Vì vậy, kiểm tra cơ sở dữ liệu cấu trúc có thể được sử dụng. Một lợi ích khác của loại thử nghiệm này là nó có thể được sử dụng để xác nhận cơ sở dữ liệu.

**Kiểm thử chức năng** - Có rất nhiều chức năng được liên kết với cơ sở dữ liệu từ góc độ người dùng. Kiểm tra hộp trắng và hộp đen là các loại kiểm tra được sử dụng cho mục đích này

**Kiểm tra phi chức năng** - Yếu tố rủi ro của cơ sở dữ liệu, yêu cầu, hiệu suất, v.v. của cơ sở dữ liệu phải được đưa vào kiểm tra và đó là yếu tố phi chức năng của bất kỳ cơ sở dữ liệu nào.

## 3.Các bước thực hiện kiểm tra cơ sở dữ liệu 
Mở máy chủ SQL và sau đó là trình phân tích truy vấn, viết truy vấn và truy xuất dữ liệu. So sánh điều đó với kết quả mong đợi. Cập nhật hoặc xóa dữ liệu và xem ứng dụng phần mềm hoạt động như thế nào
Để chạy thử nghiệm, có một quy trình cụ thể liên quan, bao gồm,

* Thiết lập môi trường thử nghiệm
* Chạy thử nghiệm
* xác thực kết quả với kết quả mong đợi
* Báo cáo kết quả cho các bên liên quan

## 4.Tại sao Kiểm tra Cơ sở dữ liệu lại Quan trọng?
### 1. Tính toàn vẹn của dữ liệu

Điều này sẽ bao gồm các hoạt động - Tạo, Truy xuất, Cập nhật và Xóa - CRUD, cập nhật hoặc trạng thái gần đây hoặc bất kỳ giá trị nào trong dữ liệu được chia sẻ hoặc phải hiển thị trên màn hình hoặc biểu mẫu.
Bằng cách thực hiện thay đổi dữ liệu trong BD chúng ta có thể kiểm tra được dữ liệu trên giao diện người dùng có được update đúng. Việc kiểm tra này sẽ cho phép kiểm tra dữ liệu  ở những nơi khác nhau để kiểm tra xem chúng có giống nhau một cách nhất quán hay không.

### 2. Mapping dữ liệu
Bạn cần hiểu rằng dữ liệu liên tục chuyển từ giao diện người dùng (UI) sang cơ sở dữ liệu và sau đó chuyển trở lại UI. Các khía cạnh chính cần ghi nhớ là:
Bạn cần kiểm tra tất cả trường có trong giao diện người dùng và giao diện người dùng để chúng có thể ánh xạ nhất quán với bảng tương ứng trong cơ sở dữ liệu. 
Các thao tác từ giao diện người dùng được thực hiện trong một ứng dụng thì CRUD song song sẽ tham gia vào giao diện người dùng. Điều cần thiết là phải kiểm tra xem các hành động được thực hiện dữ liệu có được ánh xạ phù hợp hay không.

### 3. Sự tuân thủ quy tắc
Điểm này hoàn toàn phụ thuộc vào độ phức tạp của dự án. Khi cơ sở dữ liệu có độ phức tạp thì các thành phần cũng sẽ phức tạp như trình kích hoạt, ràng buộc quan hệ và các thủ tục được lưu trữ, v.v. Trong trường hợp như vậy, được kiểm tra cần lưu ý một số điều, đặc biệt là Truy vấn SQL có thể giúp bạn kiểm tra độ phức tạp của DB.

### 4. Xác thực các thuộc tính ACID
Chủ yếu có bốn thuộc tính mà hiệu suất của Cơ sở dữ liệu phụ thuộc vào
Atomicity - kiểm tra những giao dịch thất bại để đảm bảo dự liệu không bị sai trong những trường hợp này
Consistency - Tính nhất quán là kết quả xác thực của toàn bộ giao dịch theo cơ sở dữ liệu.
Isolation - Cần thực hiện nhiều giao dịch cùng một lúc để kiểm tra kết quả sẽ được hiển thị một cách liên tục lần lượt.
Durability - Độ bền là yếu tố cho thấy rằng một khi dữ liệu được lưu trữ thì không có sự cố hoặc mất điện nào có thể xóa được.

## 5. Thử nghiệm cơ sở dữ liệu
 Dưới đây là những điểm cần phải tuân theo để thực hiện kiểm tra Cơ sở dữ liệu một cách dễ dàng
 
### 1. Tạo truy vấn
Để dễ dàng kiểm tra cơ sở dữ liệu, bạn cần phải có kiến ​​thức SQL sâu và cả Ngôn ngữ thao tác dữ liệu.
Sự hiểu biết về cấu trúc cơ sở dữ liệu nội bộ là điều bắt buộc để kiểm tra nó. Khi điều này được thực hiện, cần kiểm tra đến các hoạt động CRUD của một ứng dụng.
Điều này sẽ giúp xác minh kết quả truy vấn SQL. Thậm chí có thể sử dụng truy vấn ghi với sự trợ giúp của SQL Query Analyzer để lấy kết quả hiệu quả.
Cân phải có kiến thức SQL nếu không sẽ không thể dễ dàng kiểm tra DB.
Trong trường hợp DB phức tạp, người kiểm thử không thể viết các truy vấn.
Do đó, các nhà phát triển hỗ trợ họ để đảm bảo rằng kết quả không bị xáo trộn. Điều này sẽ không chỉ tăng hiệu suất kiểm tra mà còn giúp rèn luyện các kỹ năng SQL. 

### 2. Quan sát dữ liệu 
Với cơ sở dữ liệu phức tạp, liên kết nhiều bảng, việc thực hiện các thao tác CRUD ( Create - Read - Update - Delete). Sẽ cần kiểm tra data trên các bảng tương ứng.
Do đó, trong khi thực hiện kiểm tra trên bảng, hãy đảm bảo rằng bạn có kiến thức phù hợp về cấu trúc của bảng.

### 3. Truy vấn
Như đã đề cập ở trên, khi bạn đang thực hiện kiểm tra trên DB, bạn sẽ yêu cầu một số truy vấn sẽ sử dụng các hoạt động CRUD.
Tuy nhiên, trong một số trường hợp nhất định, khi bạn đang xác minh dữ liệu, có thể việc thực thi không được thực hiện theo một cách nhất định.
Bạn có thể nhận trợ giúp từ nhà phát triển của mình, người có kiến thức chuyên sâu hơn về chủ đề này.
Đây chắn là một lựa chọn lý tưởng cho người kiểm tra để tránh nhiều vấn đề nhất có thể. 

## 6. Điểm khác nhau giữa kiểm thử GUI và Database
| GUI | Database |
| -------- | -------- |
| Tập trung vào giao diện bên ngoài phần mềm     | Phải có kiến thức về các yêu cầu nghiệp vụ     | 
| phải hiểu rõ yêu cầu nghiệp vụ các chức năng   |nắm vững kiến thức cơ sở dữ liệu    | 
| Có thể kiểm tra tất cả các chức năng   |chỉ có thể dược sử dụng để kiểm tra các hoạt động liên quan đến dữ liệu    | 
| Không nhất thiết phải biết thông tin csdl   |Phải nắm toàn bộ thông tin về csdl : các table, các trường....    | 




Tài liệu tham khảo: https://www.testbytes.net/blog/database-testing/