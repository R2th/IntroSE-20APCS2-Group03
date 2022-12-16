# 1. Giới thiệu
- Trong mạng neural, mô hình mạng neural tích chập (CNN) là 1 trong những mô hình để nhận dạng và phân loại hình ảnh. Trong đó, xác định đối tượng và nhận dạng khuôn mặt là 1 trong số những lĩnh vực mà CNN được sử dụng rộng rãi.
- CNN phân loại hình ảnh bằng cách lấy 1 hình ảnh đầu vào, xử lý và phân loại nó theo các hạng mục nhất định (Ví dụ: Chó, Mèo, Hổ, ...). Máy tính coi hình ảnh đầu vào là 1 mảng pixel và nó phụ thuộc vào độ phân giải của hình ảnh. Dựa trên độ phân giải hình ảnh, máy tính sẽ thấy H x W x D (H: Chiều cao, W: Chiều rộng, D: Độ dày). Ví dụ: Hình ảnh là mảng ma trận RGB 6x6x3 (3 ở đây là giá trị RGB).
![Hình 1: Mảng ma trận RGB](https://images.viblo.asia/1caaebfd-df67-4b11-a0ff-9b54951f406b.png)
- Về kỹ thuật, mô hình CNN để training và kiểm tra, mỗi hình ảnh đầu vào sẽ chuyển nó qua 1 loạt các lớp tích chập với các bộ lọc (Kernals), tổng hợp lại các lớp được kết nối đầy đủ (Full Connected) và áp dụng hàm Softmax để phân loại đối tượng có giá trị xác suất giữa 0 và 1. Hình dưới đây là toàn bộ luồng CNN để xử lý hình ảnh đầu vào và phân loại các đối tượng dựa trên giá trị.
![Mạng neural với nhiều lớp tích chập](https://images.viblo.asia/31db48c4-5df9-409b-8632-85d39196595b.jpeg)

# 2. Lớp tích chập - Convolution Layer
- Tích chập là lớp đầu tiên để trích xuất các tính năng từ hình ảnh đầu vào. Tích chập duy trì mối quan hệ giữa các pixel bằng cách tìm hiểu các tính năng hình ảnh bằng cách sử dụng các ô vương nhỏ của dữ liệu đầu vào. Nó là 1 phép toán có 2 đầu vào như ma trận hình ảnh và 1 bộ lọc hoặc hạt nhân.
![](https://images.viblo.asia/c0713ab2-5380-4df7-91d0-bc701ac357eb.png)
- Xem xét 1 ma trận 5 x 5 có giá trị pixel là 0 và 1. Ma trận bộ lọc 3 x 3 như hình bên dưới.
![](https://images.viblo.asia/a23fa8bc-1b0e-4ce0-8ac8-3e0cf87d9d61.png)
- Sau đó, lớp tích chập của ma trận hình ảnh 5 x 5 nhân với ma trận bộ lọc 3 x 3 gọi là 'Feature Map' như hình bên dưới.
![](https://images.viblo.asia/f7fdeef5-7191-4de9-9938-2238490064ca.gif)

- Sự kết hợp của 1 hình ảnh với các bộ lọc khác nhau có thể thực hiện các hoạt động như phát hiện cạnh, làm mờ và làm sắc nét bằng cách áp dụng các bộ lọc. Ví dụ dưới đây cho thấy hình ảnh tích chập khác nhau sau khi áp dụng các Kernel khác nhau.
![](https://images.viblo.asia/470abaeb-08f4-4b0c-98a9-873bf5764f2a.png)

# 3. Bước nhảy - Stride
- Stride là số pixel thay đổi trên ma trận đầu vào. Khi stride là 1 thì ta di chuyển các kernel 1 pixel. Khi stride là 2 thì ta di chuyển các kernel đi 2 pixel và tiếp tục như vậy. Hình dưới là lớp tích chập hoạt động với stride là 2.
![](https://images.viblo.asia/10821e76-0338-493e-b2c9-175fb7ffb18d.png)

# 4. Đường viền - Padding
- Đôi khi kernel không phù hợp với hình ảnh đầu vào. Ta có 2 lựa chọn:
*     Chèn thêm các số 0 vào 4 đường biên của hình ảnh (padding).
*     Cắt bớt hình ảnh tại những điểm không phù hợp với kernel.
# 5. Hàm phi tuyến - ReLU
- ReLU viết tắt của Rectified Linear Unit, là 1 hàm phi tuyến. Với đầu ra là: ƒ (x) = max (0, x).
- Tại sao ReLU lại quan trọng: ReLU giới thiệu tính phi tuyến trong ConvNet. Vì dữ liệu trong thế giới mà chúng ta tìm hiểu là các giá trị tuyến tính không âm.
![](https://images.viblo.asia/04dbd88d-797b-458a-ba07-5a8422d603e5.png)
- Có 1 số hà phi tuyến khác như `tanh, sigmoid` cũng có thể được sử dụng thay cho ReLU. Hầu hết người ta thường dùng ReLU vì nó có hiệu suất tốt.

# 6. Lớp gộp - Pooling Layer
- Lớp pooling sẽ giảm bớt số lượng tham số khi hình ảnh quá lớn. Không gian pooling còn được gọi là lấy mẫu con hoặc lấy mẫu xuống làm giảm kích thước của mỗi map nhưng vẫn giữ lại thông tin quan trọng. Các pooling có thể có nhiều loại khác nhau:
* Max Pooling
* Average Pooling
* Sum Pooling
- Max pooling lấy phần tử lớn nhất từ ma trận đối tượng, hoặc lấy tổng trung bình. Tổng  tất cả các phần tử trong map gọi là sum pooling
![Max Pooling](https://images.viblo.asia/cc4ae912-a9ce-4815-a3ca-e859999432af.png)
# 7. Tóm tắt
- Đầu vào của lớp tích chập là hình ảnh
- Chọn đối số, áp dụng các bộ lọc với các bước nhảy, padding nếu cần. Thực hiện tích chập cho hình ảnh và áp dụng hàm kích hoạt ReLU cho ma trận hình ảnh.
- Thực hiện Pooling để giảm kích thước cho hình ảnh.
- Thêm nhiều lớp tích chập sao cho phù hợp
- Xây dựng đầu ra và dữ liệu đầu vào thành 1 lớp được kết nối đầy đủ (Full Connected)
- Sử dụng hàm kích hoạt để tìm đối số phù hợp và phân loại hình ảnh.
> Nguồn:
> https://www.mathworks.com/discovery/convolutional-neural-network.html
> https://adeshpande3.github.io/adeshpande3.github.io/A-Beginner's-Guide-To-Understanding-Convolutional-Neural-Networks/
> https://ujjwalkarn.me/2016/08/11/intuitive-explanation-convnets/
> https://blog.datawow.io/interns-explain-cnn-8a669d053f8b