Trong bài viết này mình sẽ nói về cách chúng ta sẽ sử dụng để phân tích và so sánh các loại thuật toán khác nhau
### 1.4 Why the Analysis of Algorithms?
Giả sử: Để đi từ Hà Nội đến Sài Gòn, có thể có nhiều cách để thực hiện điều này: bằng máy bay, bằng xe buýt, bằng tàu hỏa và cả bằng xe đạp.\
Tùy theo sự sẵn có và tiện lợi mà chúng ta chọn loại phù hợp với mình.\
Tương tự, trong khoa học máy tính, nhiều thuật toán có sẵn để giải quyết cùng một vấn đề (ví dụ: một bài toán sắp xếp có nhiều thuật toán, như sắp xếp chèn, sắp xếp lựa chọn, sắp xếp nhanh và nhiều thuật toán khác).\
Phân tích thuật toán giúp chúng ta **xác định thuật toán nào hiệu quả nhất về thời gian và không gian** đã tiêu thụ.

### 1.5 Goal of the Analysis of Algorithms
Mục tiêu của việc phân tích các thuật toán là **so sánh các thuật toán** (hoặc giải pháp) chủ yếu về thời gian chạy mà còn về các yếu tố khác (ví dụ: bộ nhớ, developer effort, v.v.)

### 1.6 What is Running Time Analysis?
**Đây là quá trình xác định thời gian xử lý tăng lên như thế nào khi quy mô của vấn đề (kích thước input) tăng lên.**\
Kích thước đầu vào là số phần tử trong input và tùy thuộc vào loại vấn đề, đầu vào có thể có nhiều kiểu khác nhau. 
Sau đây là các loại đầu vào phổ biến:
* Kích thước của một array
* Bậc của một đa thức
* Số phần tử trong 1 ma trận
* Số bit trong biểu diễn nhị phân của input
* Các đỉnh và cạnh trong môt graph(đồ thị)

### 1.7 How to Compare Algorithms
Để so sánh một thuật toán, chúng ta sẽ sử dụng một số thước đo khách quan:\
* **Execution times?** Không phải là một biện pháp tốt vì thời gian thực hiện là khác nhau trên mỗi máy tính(phụ thuộc phần cứng: cpu, dây cáp, ...).
* **Number of statements executed?(Số câu lệnh được thực thi)**: Không phải là một thước đo tốt, vì số lượng câu lệnh thay đổi theo ngôn ngữ lập trình cũng như phong cách của từng lập trình viên.

\
=> **Ideal solution?**: Giả sử rằng chúng ta thể hiện thời gian chạy của một thuật toán nhất định dưới dạng **một hàm của kích thước đầu vào n (tức là f (n))** và so sánh các hàm khác nhau này tương ứng với việc chạy lần. Loại so sánh này không phụ thuộc vào thời gian máy, kiểu lập trình, v.v.