Trong bài viết này, mình sẽ giới thiệu một số thư viện sử dụng trong khoa học dữ liệu. Thư viện là một tập hợp các function và method cho phép bạn thực hiện nhiều hành động khác nhau mà không cần tự viết code. mình sẽ tập trung vào các thư viện Python
### 1. Scientific Computing
* Pandas cung cấp cấu trúc dữ liệu và công cụ để làm sạch dữ liệu, thao tác và phân tích hiệu quả. Nó cung cấp các công cụ để làm việc với các loại dữ liệu khác nhau. Công cụ chính của Pandas là một bảng hai chiều bao gồm các cột và hàng. Bảng này được gọi là "DataFrame" và được thiết kế để cung cấp lập chỉ mục dễ dàng để bạn có thể làm việc với dữ liệu của mình. 
* Thư viện Numpy dựa trên các mảng, cho phép bạn áp dụng các hàm toán học cho các mảng này. 
* Pandas thực sự được xây dựng trên các phương pháp trực quan hóa dữ liệu, trong khi đó numpy là một cách tuyệt vời để giao tiếp và kết nối dữ liệu.

### 2. Visualization
Phương pháp trực quan hoá dữ liệu là một cách tuyệt vời để giao tiếp với người khác và hiển thị kết quả phân tích một cách có ý nghĩa.
* Matplotlib package là thư viện nổi tiếng nhất để trực quan hóa dữ liệu và nó là tuyệt vời để tạo ra các biểu đồ, sơ đồ. Các biểu đồ cũng có khả năng tùy biến cao. 
* Một thư viện trực quan cấp cao khác, Seaborn, dựa trên matplotlib. Seaborn giúp bạn dễ dàng tạo ra các sơ đồ như bản đồ nhiệt, chuỗi thời gian,... 

### 3. High-Level Machine Learning and Deep Learning
* Đối với Machine Learning, thư viện Scikit-Learn chứa các công cụ để mô hình hóa thống kê, bao gồm hồi quy, phân loại, phân cụm và các công cụ khác. Nó được xây dựng trên Numpy, Scipy và Matplotlib, và nó tương đối đơn giản để bắt đầu. Đối với cách tiếp cận High-Level này, bạn xác định mô hình và chỉ định các loại tham số bạn muốn sử dụng. 
* Với Deep Learning, Keras cho phép bạn xây dựng mô hình Deep Learning tiêu chuẩn. Giống như Scikit-Learn, giao diện High-Level cho phép bạn xây dựng các mô hình nhanh chóng và đơn giản. Nó có thể hoạt động bằng cách sử dụng các đơn vị xử lý đồ họa (GPU), nhưng đối với nhiều trường hợp Deep Learning, cần có môi trường cấp thấp hơn. 

### 4. Deep Learning
* Tensorflow là một low-level framework được sử dụng trong production quy mô lớn của các mô hình Deep Learning. Nó được thiết kế cho production nhưng có thể khó để thực nghiệm. 
* Pytorch được sử dụng để thực nghiệm, giúp các nhà nghiên cứu đơn giản kiểm tra ý tưởng của họ

#### Tham khảo từ quyển Getting Started with Data Science của IBM