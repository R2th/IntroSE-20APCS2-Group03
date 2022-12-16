# 3. Đặc trưng hóa và phân biệt

Đặc trưng hóa là việc tổng kết các đặc điểm hay tính chất chung của một lớp dữ liệu đích. 
Dữ liệu đó tương đương với một lớp do người dùng đặc tả bằng một truy vấn CSDL. 

Có một số phương pháp để tổng kết và biểu thị đặc trưng dữ liệu một cách hiệu quả. Chẳng hạn như thao tác ROLL-UP của hệ phân tích trực tuyến OLAP, dữ liệu dạng khối (data cube) có thể được dùng để thực hiện tổng kết theo một chiều cụ thể dưới sự điều khiển của người dùng.

Dữ liệu trả về của quá trình đặc trưng hóa có thể được biểu diễn ở những khuôn dạng khác nhau. Ví dụ nó có thể là biểu đồ hình tròn, biểu đồ hình cột, khối dữ liệu đa chiều hay các bảng đa chiều bao gồm cả các bảng tham khảo chéo. Kết quả của quá trình khai phá mô tả cũng có thể được biểu diễn như các quan hệ tổng quát hay các luật

# 4. Phân tích sự kết hợp
Phân tích sự kết hợp là việc khám phá ra các luật kết hợp trong một tập lớn dữ liệu. Các luật kết hợp thể hiện mối quan hệ giữa các giá trị thuộc tính mà ta nhận thấy được tự tần suất xuất hiện cùng với nhau. Các luật kết hợp được khám phá từ một tập lớn các bản ghi và những tập luật có ý nghĩa có thể giúp cho các nhà doanh nghiệp ra quyết định.

# 5. Phân lớp và dự đoán
Phân lớp là quá trình tìm một tập các mô hình (hoặc các chức năng) mô tả và phân biệt các lớp dữ liệu. Các mô hình này sẽ được sử dụng cho mục đích dự đoán về lớp của một đối tượng. Việc xây dựng mô hình dựa trên sự phân tích một tập các dữ liệu huấn luyện. Một mô hình như vậy có thể được biểu diễn trong nhiều dạng, chẳng hạn các dạng luật phân lớp IF-THEN, cây quyết định, công thức toán hay mạng nơ-ron. Tuy sự phân lớp được sử dụng để dự đoán nhãn lớp cho các đối tượng dữ liệu, trong nhiều ứng dụng người dùng cũng có thể mong muốn dự đoán những giá trị dữ liệu khuyết thiếu nào đó. Thông thường đó là việc dự đoán các giá trị thuộc kiểu dữ liệu số. Sự dự đoán cũng bao gồm việc xác định khuynh hướng phân lọai dựa trên những dữ liệu hiện có.

Để phân lớp và dự đoán, có thể cần trước một sự phân tích thích hợp. Sự phân tích đó nhằm xác định các thuộc tính không tham gia vào quá trình phân lớp và dự đoán, chúng sẽ bị loại trừu sau bước này

# 6. Phân cụm

Không giống như phân lớp và dự đoán, sự phân cụm sẽ phân tích các đối tượng dữ liệu khi chưa biết nhãn của lớp, nghĩa là nhãn của lớp không tồn tại trong quá trình huấn luyện dữ liệu. Phân cụm có thể được sử dụng để đưa ra những nhãn của lớp.

Sự phân cụm có mục đích nhóm các đối tượng lại theo nguyên tắc: 
* Các đối tượng trong cùng một nhóm giống nhau ở mức cao nhất
* Các đối tượng khác nhóm có mức giống nhau ít nhất 

Điều này có nghĩa là các cụm sẽ được tạo ra sao cho các đối tượng trong mỗi cụm có độ tương tự cao khi so sánh với nhau và rất khác nhau khi so sanh với các đối tượng thuộc cụm khác. Mỗi cụm được tạo thành có thể được xem như một lớp đối tượng. Và các luật sẽ được trích rút ra từ đó. Việc phân cụm cũng đem lại một phương pháp để định dạng và phân loại

# 7. Phân tích phần tử ngoài cuộc

Một cơ sở dữ liệu có thể chứa các đối tượng dữ liệu không tuân theo mô hình dữ liệu. Những đối tượng như vậy được gọi là phần tử ngoài cuộc. Hầu hết các phương pháp khai phá dữ liệu đều coi các phần tử ngoài cuộc là nhiễu và loại bỏ chúng.

Tuy nhiên thì trong một số ứng dụng nào đó các sự việc hiếm khi xảy ra lại được quan tâm hơn là những gì thường xuyên gặp phải. Sự phân tích các phần tử ngoài cuộc được xem như là sự khai phá các phần tử ngoài cuộc. Có một số phương pháp thường được sử dụng để phát hiện các phần tử ngoài cuộc:
* Dùng test mang tính thống kê trên cơ sở một giả thuyết về phân phối dữ liệu hay một mô hình xác suất cho dữ liệu
* Dùng các độ đo khoảng cách, theo đó các đối tượng có một khoảng cách đáng kể đến cụm bất kì khác được xem là phần tử ngoài cuộc
* Dùng các phương pháp dựa trên độ lệch để kiểm tra sự khác nhau trong những đặc trưng chính của đối tượng trong một nhóm

Phương pháp phân tích phần tử ngoài cuộc có thể khám phá ra những người sử dụng thẻ tín dụng ngân hàng một cách gian lận bằng việc phát hiện những việc mua sắm với một lượng tiền quá lớn trong tài khoản khi so sánh với những khoản chi phí thông thường được chi trả bằng chính tài khoản này. Những giá trị ngoài cuộc này cũng có thể được phát hiện với sự chú ý về địa điểm và loại mua sắm hoặc tần suất mua sắm.

Nguồn: Sách "CÁC HỆ CƠ SỞ DỮ LIỆU lí thuyết và thực hành", tập II của tác giả Hồ Thuần, Hồ Cẩm Hà