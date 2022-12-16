Trong thời kỳ mà lĩnh vực "**khoa học máy tính**" phát triên nở rộ như hiện nay thì dữ liệu chính là chủ thể gần như quan trọng nhất với lĩnh vực này. Các công ty lớn thì không ngại chi rất nhiều tiền chủ yếu cho viêc thu thập dữ liệu. Từ đây, ta có thể dễ thấy sự quan trọng của dữ liệu trong lĩnh vực này. Vậy nên, hôm nay bài viết này sẽ cung cấp những thông tin tổng quan về dữ liệu: Có những loại dữ liệu nào, đặc điểm của nó ra sao. Chúng ta hãy cùng bắt đầu ngay nhé.<br><br>
Thông thường thì giá trị dữ liệu sẽ được phân thành những loại sau:<br>
* **Nominal** - Dữ liệu bình thường hay dữ liệu **định danh**:<br>
    *  là tập các nhãn dùng để mô tả, phân loại các đối tượng, ta có thể dễ dàng phân biệt được giá trị này với giá trị kia; với kiểu dữ liệu này thì ta chỉ có các phép toán : **=** hoặc **!=** .<br>
    *  **Ví dụ** : Mã SV, màu mắt, mã bưu chính,...
* **Ordinal** - dữ liệu có **trât tự** :
    *  là tập các phần tử chỉ định một thứ tự được sắp xếp; khác với kiểu dữ liệu Nominal thì Ordinal còn có thêm các phép toán khác : **>, <, >=, <=** 
    *  **Ví dụ:** Hạnh kiểm: { kém, trung bình, khá, giỏi }
*  **Interval** - Dữ liệu dạng **khoảng**
    *  là tập giá trị các phần tử nằm trong một khoảng nhất định; Interval có thêm các phép toán như **+,** **-**
    *  **Ví dụ**: Nhiệt độ đo ở dạng độ C,...
*  **Raito** - dữ liệu dạng **tỉ lệ**
    *  tương tự kiểu dữ liệu khoảng, điểm khác biệt là các phần tử thuộc kiểu dữ liệu này có thể so sánh như là bội số với nhau; Raito có thêm các phép toán **x** và **:** .
    *  **Ví dụ**:  Nhiệt độ đo ở độ K, độ dài,...
<br>

Dữ liệu ngoài cách phân loại trên thì cũng có thể phân chia như sau:<br>
* **Discrete** - **Dữ liệu rời rạc** :<br>
    * là dữ liệu mà chỉ có một bộ dữ liệu hữu hạn hoặc vô hạn mà đếm được ; thường được đại diện bởi giá trị nguyên.
    * Ví dụ: mã bưu chính, số đếm,... Giải thích thêm về số vô hạn mà đếm được thì ta xét số lần nài nỉ mẹ xin tiền đến khi mẹ cho là 1,2,3,4,...- giá trị này về lý thuyết thì không có giới hạn giá trị hữu hạn nhưng ta hoàn toàn đếm được.<br>
* **Continuous** - **Dữ liệu liên tục** :<br>
    * Dữ liệu mà có thể nhận tất cả các giá trị có thể trong một phạm vi được gọi là dữ liệu liên tục; thường đươc đại diện bởi số thực.
    * với kiểu dữ liệu liên tục để sử dụng trước hết thì ta thường rời rạc hóa các giá trị liên tục này.
    * **Ví dụ**: Nhiệt độ, chiều cao, cân nặng,... là kiểu dữ liệu liên tục; với dữ liệu chiều cao thì ta có thể rời rạc hóa thành 3 kiểu như: **thấp**, **trung bình**, **cao** 
 <br>
 Các loại bộ dữ liệu dùng trong Data Science:
*  **Record** 
    *  Data Matrix :Dữ liệu ma trận
    *  Document Data : Dữ liệu dạng tài liệu
    *  Transaction Data : Dữ liệu giao dịch
*  **Multi-Relational**
    *  Star or Snowflake schema
*  **Graph**
    *  World wide web :Dữ liệu web, ví dụ như cây DOM
    *  Molecular Structures : Cấu trúc phâ tử
*  **Ordered**
    *  Spatial Data - Dữ liệu về không gian
    *  Temporal Data - Dữ liệu thời gian
    *  Sequential Data - Dữ liệu tuần tự<br><br>
    
**Kết luận**: Trên đây thì mình chỉ nêu ra những kiến thức chung nhất về dữ liệu trong Data Science, để hiểu rõ thì chúng ta sẽ cần phải tìm hiểu sâu vào từng mục cụ thể ở trên.<br>
**Nguồn tham khảo, trích dẫn : Cô Nguyễn Quỳnh Chi- PTIT**