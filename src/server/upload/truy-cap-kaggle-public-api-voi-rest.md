# 1 Giới thiệu 
Kaggle, thuộc Google, là một cộng đồng dành cho Data Scientist và Machine Learning. Kaggle cho phép người dùng tìm và công bố các dataset, tìm và xây dững những mô hình, tham gia vào các cuộc thi dành cho Data Scientist/Machine Learning,... 

Tài liệu API của Kaggle chính thức là một Python CLI. Tuy Python CLI cũng có tính hữu dụng của nó, nhưng đôi khi mình muốn làm một Crawler, thì REST API sẽ hữu dụng hơn. Và có rất ít tài liệu chính thức hướng dẫn với Public Kaggle API. Nên đây là hướng dẫn truy cập Kaggle Public API với REST. 

# 2 Tạo API Key
Để sử dụng Public API Kaggle, bạn cần tạo một API key token, vào đường dẫn Account của bạn, kéo xuống phần API và nhấn vào nút Create New API Token. 
![](https://images.viblo.asia/ad3ea367-125f-491d-807e-9e79a3edef4d.PNG)
Khi đó, một file kaggle.json được tải xuống và sẽ chứa thông tin username và key của bạn. 

# 3 Tương tác với các API
Rất may mắn, đội ngũ Kaggle đã tạo sẵn một file yaml swagger nên chúng ta không phải mò những đường dẫn URL. 
1. Truy cập vào [đây](https://github.com/Kaggle/kaggle-api/blob/master/KaggleSwagger.yaml) để có file yaml swagger. 
2. Sử dụng một trình Swagger UI bất kì, ở đây mình sử dụng luôn trang web https://editor.swagger.io/ 
3. Import file yaml trên vào Swagger Editor. 
4. Các bạn có thể thấy các endpoint với thông tin query được hiện lên.
 
![](https://images.viblo.asia/9f730782-e2db-4841-b2e9-5e6d54f74647.PNG)

5. Kaggle sử dụng hệ thống Ủy quyền cơ bản, bạn chỉ cần nhập username và API key vào hai trường tương ứng là username và password. Còn khi code REST request, sẽ cần mã hóa cả hai thông tin này bằng mã hóa gốc 64 với format {username}:{api key} sẽ ra được header token. 

![](https://images.viblo.asia/2250e599-b4fb-40a4-bc03-0c9d28c90085.PNG)

6. Khi bạn code Crawler, thông thường điều bạn quan tâm sẽ là Dataset. Base API URL của Kaggle là: https://www.kaggle.com/api/v1/. Để tìm kiếm các dataset có tổng cộng 11 parameter, từ những từ khóa tìm kiếm đến phân trang,... Với method là GET, URL là https://www.kaggle.com/api/v1/datasets/list. Dưới đây là ví dụ mình tìm tất cả các dataset không dùng tham số nào cả. 

![](https://images.viblo.asia/48444315-f947-4261-a5ac-c5d56a65f550.PNG)

7. Danh sách các miêu tả về API của kaggle đối với từng đối tượng:
* __Competitions__ : Liệt kê các cuộc thi, Truy vấn các file trong cuộc thi, Download các file trong cuộc thi, Nộp bài cho cuộc thi, Liệt kê các bài nộp trong cuộc thi, Nhận bảng xếp hạng trong cuộc thi.
* __Datasets__: Liệt kê dataset, Liệt kê tệp cho dataset, Tải xuống file dataset, Khởi tạo file metadata để tạo dataset, Tạo dataset mới, Tạo phiên bản dataset mới, Tải xuống metadata cho dataset hiện có, Nhận trạng thái tạo dataset
* __Kernels__: Liệt kê các kernal, Khởi tạo  metadata cho một kernel, Đẩy lên một kernel, Kéo xuống một kernel, Truy xuất đầu ra của kernel, Nhận trạng thái của lần chạy kernel mới nhất