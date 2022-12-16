### **I. Tổng quan về hệ thống gợi ý**

* Hệ thống gợi ý (Recommender systems hoặc Recommendation systems) là một dạng của hệ hỗ trợ ra quyết định, cung cấp giải pháp mang tính cá nhân hóa mà không phải trải qua quá trình tìm kiếm phức tạp. Hệ gợi ý học từ người dùng và gợi ý các sản phẩm tốt nhất trong số các sản phẩm phù hợp.

* Hệ thống gợi ý sử dụng các tri thức về sản phẩm, các tri thức của chuyên gia hay tri thức khai phá học được từ hành vi con người dùng để đưa ra các gợi ý về sản phẩm mà họ thích trong hàng ngàn hàng vạn sản phẩm có trong hệ thống. Các website thương mại điện tử, ví dụ như sách, phim, nhạc, báo...sử dụng hệ thống gợi ý để cung cấp các thông tin giúp cho người sử dụng quyết định sẽ lựa chọn sản phẩm nào. Các sản phẩm được gợi ý dựa trên số lượng sản phẩm đó đã được bán, dựa trên các thông tin cá nhân của người sử dụng, dựa trên sự phân tích hành vi mua hàng trước đó của người sử dụng để đưa ra các dự đoán về hành vi mua hàng trong tương lai của chính khách hàng đó. Các dạng gợi ý bao gồm: gợi ý các sản phẩm tới người tiêu dùng, các thông tin sản phẩm mang tính cá nhân hóa, tổng kết các ý kiến cộng đồng, và cung cấp các chia sẻ, các phê bình, đánh giá mang tính cộng đồng liên quan tới yêu cầu, mục đích của người sử dụng đó.

### **II. Các phương pháp gợi ý**

* Giả sử rằng I là tập các đối tượng (Item) có thể được gợi ý, U là tập người dùng, u là một người dùng cụ thể trong tập U và i là một đối tượng cụ thể trong I mà chúng ta muốn dự đoán cho u (dựa vào sở thích của u).

| Phương pháp gợi ý | Dữ liệu cơ sở | Dữ liệu đầu ra | Tiến trình xử lý |
| -------- | -------- | -------- | -------- |
| Dựa theo lọc cộng tác | Các điểm số đánh giá của những người sử dụng trong U đối với các đối tượng trong I. | Các điểm số đánh giá của u cho các đối tượng trong I. | Nhận ra người sử dụng trong U tượng tự với u ( về sở thích) và sau đó ngoại suy điểm số đánh giá vủa u cho i. |
| Dựa theo nội dung | Các đặc điểm của các đối tượng trong I. | Các điểm số đánh giá của u cho các đối tượng trong I. | Tạo ra một mô hình mô tả sở thích của người sử dụng u, sau đó sử dụng để đánh giá mức độ ưa thích của u với i. |
| Dựa trên cơ sở tri thức | Các đặc điểm của các đối tượng trong I. Các tri thức (hiểu biết) về sự phù hợp giữa các đối tượng với nhu cầu của người sử dụng. | Một sự mô tả nhu cầu và sở thích của người sử dụng u. | Suy luận sự phù hợp giữa I và nhu cầu của u. |

#### **1. Hệ thống gợi ý dựa theo lọc cộng tác**

* Hệ thống gợi ý dựa theo lọc cộng tác (Collaborative recommendation systems): là phương pháp gợi ý được triển khai rộng rãi nhất và thành công nhất trong thực tế.
* Hệ thống theo lọc công tác phân tích và tổng hợp các điểm số đánh giá của các đối tượng, nhận ra sự tương đồng giữa những người sử dụng trên cơ sở các điểm số đánh giá của họ và tạo ra các gợi ý dựa trên sự so sánh này. Hồ sơ (profile) của người sử dụng điển hình trong hệ thống lọc cộng tác bao gồm một vector các đối tượng (item) và các điểm số đánh giá của chúng, với số chiều tăng lên liên tục khi người sử dụng tương tác với hệ thống theo thời gian.
* Một số hệ thống sử dụng phương pháp chiết khấu dựa trên thời gian (time-based discounting) để tính toán cho yếu tố "trượt" đối với sự quan tâm của người sử dụng. Trong một số trường hợp điểm số đánh giá (rating) có thể là nhị phân (thích/không thích) hoặc các giá trị số thực cho thấy mức độ ưu tiên.
* Thế mạnh lớn nhất của kỹ thuật gợi ý theo lọc cộng tác là chúng hoàn toàn độc lập với sự biểu diễn của các đối tượng đang được gợi ý, và do đó có thể làm việc tốt với các đối tượng phức tạp như âm thanh và phim. Schafer, Konstan & Riedl (1999) gọi lọc cộng tác là "tương quan giữa người – với – người" (people-to-people correlation).
* Minh họa:
![](https://images.viblo.asia/de4ea513-4a46-46a7-b6c5-d30491a54e6d.png)
 
#### **2. Hệ thống gợi ý dựa theo nội dung**

* Hệ thống gợi ý dựa theo nội dung (Content-based recommendation systems): là sự kế thừa và mở rộng của lĩnh vực nghiên cứu lọc thông tin.
* Trong hệ thống thì các đối tượng được biểu diễn bởi các đặc điểm liên quan tới chúng.
* Ví dụ, hệ thống gợi ý văn bản như hệ thống lọc tin NewsWeeder sử dụng những từ của các văn bản như các đặc điểm.
* Một số hệ thống gợi ý dựa trên nội dung học một hồ sơ cá nhân về sở thích của người sử dụng dựa trên các đặc điểm xuất hiện trong chính các đối tượng người sử dụng đã đánh giá (rated). Schafer, Konstan & Riedl gọi gợi ý theo nội dung là "tương quan đối tượng với đối tượng" (item-to-item correlation). Hồ sơ người sử dụng của một hệ thống gợi ý theo nội dung phụ thuộc vào phương pháp học máy được dùng.
* Cây quyết định (Decision trees), mạng noron (neural nets) và biểu diễn dựa theo vector (vector-based representations) đều có thể được sử dụng để học hồ sơ người dùng. Cũng giống như trong lọc cộng tác, hồ sơ người dùng trong gợi ý dựa theo nội dung là những dữ liệu lâu dài và được cập nhật theo thời gian.
* Minh họa:
![](https://images.viblo.asia/a66a586d-4d39-40d5-a5dc-c06803cac313.png)

#### **3. Hệ thống gợi ý dựa trên cơ sở tri thức**

* Hệ thống gợi ý dựa trên cơ sở tri thức (Knowledge-based recommenders systems): gợi ý các đối tượng dựa trên các suy luận về nhu cầu và sở thích của người dùng. Theo một nghĩa nào đó, tất cả các kỹ thuật gợi ý có thể mô tả như là làm một số suy luận. Phương pháp tiếp cận dựa trên cơ sở tri thức được phân biệt ở chỗ: chúng có kiến thức làm thế nào một đối tượng cụ thể đáp ứng nhu cầu một người dùng cụ thể, và do đó có thể lập luận về mối quan hệ giữa nhu cầu và các gợi ý cụ thể.
* Sử dụng miền tri thức rõ ràng, có liên quan tới mối quan hệ giữa yêu cầu của người dùng và sản phẩm cụ thể. Ban đầu người ta đưa ra 3 dạng tri thức: tri thức về danh mục (tri thức về sản phẩm được gợi ý), tri thức người sử dụng (tri thức về các yêu cầu của người sử dụng), tri thức về các chức năng (tri thức để ánh xạ các yêu cầu của người sử dụng tới các sản phẩm thoả mãn các yêu cầu đó).
* Phương pháp này không dựa trên tiểu sử người sử dụng nên không gặp phải khó khăn về sản phẩm mới và người dùng mới. Gợi ý trên cơ sở tri thức có khả năng suy diễn, khả năng suy diễn phụ thuộc vào độ phù hợp của yêu cầu người sử dụng với các thuộc tính của sản phẩm.
* Mọi hệ thống dựa trên cơ sở tri thức đều là mối quan hệ thu nhận tri thức. Thực tế, chất lượng của các phương án gợi ý tùy thuộc vào độ chính xác của cơ sở tri thức. Đây cũng là hạn chế lớn nhất của phương pháp này.
* Minh họa:
![](https://images.viblo.asia/f2c3f1fc-2269-4e91-b4e6-edfe8541bc60.png)

### **IV. So sánh các phương pháp gợi ý**

#### **1. Hệ thống gợi ý dựa theo lọc cộng tác**

* Ưu điểm:
    * Khả năng đa hạng mục
    * Không cần tri thức miền
    * Chất lượng tăng theo thời gian
    * Đủ thông tin phản hồi không tường minh
* Nhược điểm:
    * Vấn đề người dùng mới
    * Vấn đề sản phẩm/đối tượng mới
    * Vấn đề "Gray sheep"
    * Chất lượng phụ thuộc vào độ lớn dữ liệu lịch sử thao tác của người sử dụng
    * Vần đề về tính bền vững và mềm dẻo
 
#### **2. Hệ thống gợi ý dựa theo nội dung**

* Ưu điểm:
    * Không cần tri thức miền
    * Chất lượng tăng theo thời gian
    * Đủ thông tin phản hồi không tường minh
* Nhược điểm:
    * Vấn đề người dùng mới
    * Chất lượng phụ thuộc vào độ lớn dữ liệu lịch sử thao tác của người sử dụng
    * Vần đề về tính bền vững và mềm dẻo

#### **3. Hệ thống gợi ý dựa trên cơ sở tri thức**

* Ưu điểm:
    * Có thể ánh xạ giữa nhu cầu người dùng và sản phẩm/đối tượng
* Nhược điểm:
    * Cần phải thu thập tri thức.

### **V. Kết luận**

Trên đây là giới thiệu về hệ thống gợi ý (Recommender systems hoặc Recommendation systems). Hi vọng bài viết có thể giúp các bạn có được cách nhìn tổng quan về hệ thống gợi ý .