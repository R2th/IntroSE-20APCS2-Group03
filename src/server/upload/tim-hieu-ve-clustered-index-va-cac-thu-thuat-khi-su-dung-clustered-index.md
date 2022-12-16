**Clustered index** là loại index theo đó các bản ghi trong bảng được sắp thứ tự theo trường index. 
Khi bảng được tạo clustered index thì bản thân nó trở thành một cây index, 
với các node lá chứa khóa là các trường được index và cũng đồng thời chứa tất cả các trường còn lại của bảng. 

Vì các bản ghi chỉ có thể được sắp xếp trên cây index theo một thứ tự nhất định 
nên mỗi bảng chỉ có thể có tối đa một clustered index. Bạn tạo clustered index như sau:

> CREATE CLUSTERED INDEX index_name ON dbo.Tblname(Colname1, Colname2...)

Khi bảng đã có **clustered index** thì các index khác (nonclustered) sẽ dùng khóa của trường clustered index làm con trỏ để trỏ về bản ghi tương ứng (nếu bảng không có clustered index thì một giá trị RID nội bộ được dùng).

**Clustered index** không đòi hỏi phải duy nhất (unique). Nhưng khi nó không duy nhất thì khóa index được gắn thêm một giá trị 4-byte ngẫu nhiên để đảm bảo các node index vẫn là duy nhất. 

Mục đích của việc này là để cho con trỏ trong các index khác luôn trỏ đến đến duy nhất một bản ghi, khi đó con trỏ sẽ bao gồm khóa index + chuỗi 4 byte được gắn thêm.

Việc gắn thêm như vậy làm tăng kích thước của clustered index cũng như các index khác, nên trong đa số tình huống thực tiễn bạn nên tạo clustered index là duy nhất. 
Thực tế, theo mặc định một clustered index duy nhất sẽ được tạo khi khai báo khóa chính.

> Việc tìm kiếm theo trường có clustered index tối ưu hơn so với non-clustered index vì nó bỏ qua được bước bookmark lookup (do tất cả các trường dữ liệu đã có sẵn tại node index).


**Các thủ thuật khi chọn trường làm clustered index**

Do các đặc tính như trên của clustered index, có một vài điểm bạn cần lưu ý khi chọn trường làm clustered index để có thể đạt hiệu quả tối ưu. 

*Một ứng cử viên cho clustered index cần đạt được các chỉ tiêu sau:*

**Kích thước nhỏ:** Nói chung với loại index nào thì bạn cũng nên chọn trường nhỏ để giảm kích thước của index. Với clustered index thì tiêu chí này càng quan trọng, vì khóa của nó được dùng trong tất cả các index khác (nonclustered) của bảng để làm con trỏ tới bản ghi. Ví dụ một trường VARCHAR(100) hay trường có kiểu dữ liệu xấp xỉ như FLOAT có lẽ cần được xem xét lại. Tốt nhất là một trường kiểu số nguyên (INT hoặc BIGINT) vì tìm kiếm theo số nguyên luôn nhanh hơn tìm kiếm theo chuỗi ký tự. Và mặc dù clustered index cho phép chứa nhiều trường (index phức hợp) nhưng bạn chỉ nên dùng một trường, cũng vì lý do giữ cho kích thước index nhỏ.

**Trường luôn tăng:** Khi giá trị mới của trường clustered index luôn tăng lên, các bản ghi mới sẽ luôn được thêm vào cuối bảng. Nếu giá trị này thay đổi bất kỳ, các bản ghi mới có thể được chèn vào giữa bảng. Điều này dẫn đến phân mảnh dữ liệu, tức là các bản ghi kế tiếp nhau một cách logic nhưng lại không được lưu trữ liền kề với nhau (lưu trữ ở các trang khác nhau). Phân mảnh làm cho hệ thống phải truy xuất nhiều hơn để đọc dữ liệu, nhất là khi cần lấy về một dải các bản ghi.

**Trường tĩnh:** Trường clustered index không nên bị cập nhật thường xuyên, một khi đã có mặt trong bảng thì giá trị của nó cần được giữ nguyên. Khi nó bị cập nhật, bản thân clustered index cũng cần được cập nhật để sắp xếp bản ghi vào vị trí mới cho đúng thứ tự, và đồng thời các nonclustered index khác cũng phải cập nhật theo để cho con trỏ giờ phải chứa giá trị mới. Thao tác cập nhật trường clustered index do vậy rất tốn kém và nếu diễn ra thường xuyên, cũng làm cho clustered index bị phân mảnh.

Cột kiểu tự tăng (IDENTITY) trong nhiều trường hợp rất phù hợp với clustered index vì nó thỏa mãn tất cả các yêu cầu trên: kích thước nhỏ (kiểu INT hoặc BIGINT), luôn tăng, và tĩnh (một khi đã insert thì bạn không mấy quan tâm đến giá trị của nó nữa và hiếm khi cần phải cập nhật). Bạn có thể trước hết hãy dùng cột IDENTITY làm clustered index, và sau đó nếu thấy không thích hợp thì chuyển sang chọn trường khác.

Hy vọng với bài viết này các bạn sẽ hiểu rõ hơn về clustered index và có thể lựa chọn cho mình được phương pháp tối ưu khi đánh index nhé.