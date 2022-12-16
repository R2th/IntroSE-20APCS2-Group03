Truy vấn cơ sở dữ liệu rất phổ biến khi bạn phát triển các ứng dụng web. ActiveRecord trong Ruby on Rails cho phép bạn không phải viết hàng tấn mã SQL soạn sẵn và kết quả là tạo ra các truy vấn mạnh mẽ và đẹp đẽ trong Ruby một cách đơn giản.

Có một sự thật rằng rất nhiều những khả năng to lớn mà Ruby và ActiveRecord cung cấp vẫn chưa được sử dụng. Thường thì bạn sẽ thấy rất nhiều scope khổng lồ trong các model Ruby on Rails, chuỗi truy vấn vô tận trong các controller và thậm chí là các khối SQL cồng kềnh.

*Các trường hợp truy vấn ActiveRecord không tốt*

![](https://images.viblo.asia/879713a5-7c28-41c3-8f50-e03b7fd30f85.png)

Những đoạn mã không tốt này có thể tạo ra những trở ngại và trở thành lý do khiến các dev đau đầu với các ứng dụng web trong thế giới thực.
# Các vấn đề ứng dụng truy vấn DB điển hình
* Các đoạn mã truy vấn lớn trong controller / model / service làm rối code của bạn
* Thật khó để hiểu các request cơ sở dữ liệu phức tạp
* Việc insert SQL không nhất quán và thường được viết chung với các truy vấn ActiveRecord
* Kiểm tra (testing) một truy vấn riêng biệt một cách cô lập là rất khó khăn
* Rất khó để viết, mở rộng hoặc kế thừa các truy vấn
* Nguyên tắc Single Responsibility thường bị vi phạm
# Giải pháp
Những vấn đề này có thể được giải quyết bằng cách sử dụng Query Object pattern - một kỹ thuật phổ biến để cô lập các truy vấn phức tạp của bạn.

Đối tượng truy vấn trong trường hợp lý tưởng là một lớp riêng biệt chứa một truy vấn cụ thể chỉ thực hiện một quy tắc logic nghiệp vụ.
# Thực hiện
Đối với hầu hết các trường hợp Đối tượng truy vấn là PORO chấp nhận quan hệ trong hàm tạo và định nghĩa các truy vấn có tên giống như một phương thức ActiveRecord phổ biến:
*Sử dụng Query object trong controller*

![](https://images.viblo.asia/81f87958-3e37-4a30-8a5e-e78d5c8dd968.png)
![](https://images.viblo.asia/92ce87a6-b6bb-4cb2-9a58-abdb66c89c44.png)

## Extending scope:
Nếuscope của bạn liên quan đến QueryObject hiện tại, bạn có thể dễ dàng mở rộng mối quan hệ của nó thay vì làm lộn xộn các model của bạn.

Phương thức ActiveRecord::QueryMethods.extending sẽ giúp bạn:

*Mở rộng scope cho các quan hệ Query Object*

![](https://images.viblo.asia/00965f0b-f8e6-4407-8922-0752accef4ef.png)

![](https://images.viblo.asia/c1883031-af0e-4bc6-ab13-313bdd64a0b1.png)

# Viết các Query Object:
Các Query Object nên được tạo ra để hỗ trợ viết các Đối tượng truy vấn khác và các quan hệ ActiveRecord. Trong ví dụ bên dưới, hai Đối tượng truy vấn được viết đại diện cho một truy vấn SQL:

![](https://images.viblo.asia/78021e30-b1a2-4c84-b14a-849ce1a7cb1a.png)
# Kế thừa các Query Object:
Nếu bạn có các truy vấn tương tự nhau, bạn có thể muốn chúng được kế thừa để giảm sự lặp lại và tuân theo nguyên tắc DRY:
![](https://images.viblo.asia/d18715a9-2f73-4327-8350-e974cd5cade9.png)
# Testing Query Objects:
Query Object được thiết kế cho việc test dễ dàng. Trong hầu hết các trường hợp, bạn chỉ cần kiểm tra các phương thức cốt lõi được xác định trong truy vấn để biết kết quả của chúng:
![](https://images.viblo.asia/41102c91-a1c5-4cec-bee8-16b660864016.png)
# Tổng kết
## Ưu điểm
* Tuân theo nguyên tắc Single Responsibility
* Có thể dễ dàng test độc lập
* Có thể được kết hợp / mở rộng với một Query Object khác
* Có thể dễ dàng sử dụng lại trong bất kỳ phần nào khác của ứng dụng
* Trả về ActiveRecord::Relation, không phải là Array
* Chỉ đại diện cho truy vấn cơ sở dữ liệu, không phải bussiness logic hoặc action
* Các phương thức của Query Object được đặt tên giống phương thức ActiveRecord (all, last, count, etc)
## Sử dụng Query Object khi:
* Bạn cần sử dụng lại một truy vấn ở nhiều nơi trong ứng dụng
* Bạn cần mở rộng, soạn thảo hoặc kế thừa các truy vấn và mối quan hệ của chúng
* Bạn cần viết rất nhiều câu SQL, nhưng không muốn làm rối code của bạn
* Truy vấn của bạn quá phức tạp / rộng lớn đối với một phương thức hoặc scope
## Không sử dụng Query Object khi:
* Truy vấn của bạn đủ đơn giản cho chỉ một phương thức hoặc scope
* Bạn không cần phải mở rộng, soạn thảo hoặc kế thừa truy vấn của mình
* Truy vấn của bạn là duy nhất và bạn không muốn làm cho nó có thể sử dụng lại