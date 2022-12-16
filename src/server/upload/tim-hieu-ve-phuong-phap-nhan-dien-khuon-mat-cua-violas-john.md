Phát hiện mặt người là bài toán cơ bản được xây dựng từ nhiều năm nay, có nhiều phương pháp được đưa ra như sử dụng template matching, neuron network…Cho tới nay bài toán này hầu như được giải quyết dựa trên phương pháp sử dụng các đặc trưng haar like. Phương pháp này được cho là đơn giản và kết quả phát hiện là tương đối cao, lên tới 98%, các hãng sản xuất máy ảnh như Canon, Samsung… cũng đã tích hợp nó vào trong các sản phẩm của mình. Và trong bài viết này, mình sẽ cùng các bạn tìm hiểu về phương pháp pháp phát hiện khuôn mặt của Violas và John được cài đặt trong OpenCV.

## 1. Các đặc trưng Haar-Like
Các đặc trưng Haar-Like là những hình chữ nhật được phân thành các vùng khác nhau như hình:

![](https://images.viblo.asia/eb362785-807d-4c45-a311-6062ae274457.png)

Đặc trưng do Viola và Jones công bố gồm 4 đặc trưng cơ bản để xác định khuôn mặt người. Mỗi đặc trưng Haar-Like là sự kết hợp của hai hay ba hình chữ nhật trắng hay đen như trong hình sau:

![](https://images.viblo.asia/7c513d3e-7af9-4619-a3c4-ed8e77f31b7b.jpg)

Để sử dụng các đặc trưng này vào việc xác định khuôn mặt người, 4 đặc trưng Haar-Like cơ bản được mở rộng ra và được chia làm 3 tập đặc trưng như sau:
-	Đặc trưng cạnh(edge feature)
![](https://images.viblo.asia/47709099-37f8-48f2-be1b-4a5dc6a41c5b.png)
-	Đặc trưng đường(line feature)
![](https://images.viblo.asia/29443da2-2467-4776-990e-69d9977c902e.png)
 
-	Đặc trưng xung quanh tâm(center-surround features)
![](https://images.viblo.asia/988200ee-7f89-4d58-bdb3-52479e62dc35.png)

Dùng các đặc trưng trên, ta có thể tính được các giá trị của đặc trưng Haar-Like là sự chênh lệch giữa tổng của các pixel của vùng đen và vùng trắng như trong công thức sau:

<br>

![](https://images.viblo.asia/03103102-c58f-4107-a33c-7e948c1644d0.png)
<br>

Viola và Joines đưa ra một khái niệm gọi là Integral Image, là một mảng 2 chiều với kích thước bằng với kích thước của ảnh cần tính đặc trưng Haar-Like, với mỗi phần tử của mảng này được tính bằng cách tính tổng của điểm ảnh phía trên (dòng-1) và bên trái (cột-1) của nó. 

![](https://images.viblo.asia/4c81ed49-fdd0-4bc0-b547-34d02bbcdd70.jpg)

<div align="center">
Công thức tính Intergral Image
</div>

   ![](https://images.viblo.asia/36a840b9-a1b1-4250-afda-4cf0d27f87b8.jpg)

Sau khi tính được Integral Image, việc tính tổng các giá trị mức xám của một vùng bất kỳ nào đó trên ảnh thực hiện rất đơn giản theo cách sau:

Giả sử ta cần tính tổng giá trị mức xám của vùng D như hình dưới, ta có thể tính được như sau:
<div align="center">
D = A + B + C + D – (A+B) – (A+C) + A
</div>

Với A + B + C + D chính là giá trị tại điểm P4 trên Integral Image, tương tự như vậy A+B là giá trị tại điểm P2, A+C là giá trị tại điểm P3, và A là giá trị tại điểm P1. Vậy ta có thể viết lại biểu thức tính D ở trên như sau:

![](https://images.viblo.asia/9f474539-e53d-4468-8e79-c023f1652d0d.jpg)

![](https://images.viblo.asia/e19e18e4-d6c4-4a45-a9fe-f6943d6e91b7.jpg)

### 2. AdaBoost

AdaBoost là một bộ phân loại mạnh phi tuyến phức dựa trên hướng tiếp cận boosting được Freund và Schapire đưa ra vào năm 1995. Adaboost cũng hoạt động trên nguyên tắc kết hợp tuyến tính các weak classifiers để hình thành một trong các classifiers.

Viola và Jones dùng AdaBoost kết hợp các bộ phân loại yếu sử dụng các đặc trưng Haar-like theo mô hình phân tầng (cascade) như sau:

![](https://images.viblo.asia/724360ed-3ddf-484b-a8cc-69349e80e704.jpg)

Trong đó, **h(k)** là các bộ phân loại yếu, được biểu diễn như sau:

![](https://images.viblo.asia/7cc5fbd3-a60b-4435-92f4-1965ace1ad1b.jpg)

 với:
 
 ![](https://images.viblo.asia/ac478505-55b2-428e-8dd0-53fbde15e6c6.png)

AdaBoost sẽ kết hợp các bộ phân loại yếu thành bộ phân loại mạnh như sau:

![](https://images.viblo.asia/13a4634c-940f-47c9-b4e7-bf68680a5c01.png)

Đây là hình ảnh minh họa việc kết hợp các bộ phân loại yếu thành bộ phân loại mạnh

![](https://images.viblo.asia/6201f71f-0cb8-44a8-b130-605cd4f249e0.jpg)

### 3. Sơ đồ nhận diện khuôn mặt

![](https://images.viblo.asia/5cb00be6-9ab5-421c-8bd4-cde93b1cb7d9.jpg)


Source Code tham khảo

https://github.com/HaiHaChan/mmdb_20171

### Tài liệu tham khảo

[1] http://kdientu.duytan.edu.vn/media/49682/le-dac-thinh-bao-cao-nckh.pdf

[2] https://hackaday.io/project/12384-autofan-automated-control-of-air-flow/log/41956-face-detection-using-a-haar-cascade-classifier

[3] https://www.tutorialspoint.com/pyqt/