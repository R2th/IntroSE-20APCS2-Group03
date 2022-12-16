Trong tuần này, mình sẽ giới thiệu về thuật toán tìm cạnh trong xử lý ảnh. 

# What is an edge ?

Trong ảnh số, những điểm ảnh có cường độ ảnh sáng thay đổi mạnh so với các điểm xung quanh thường được gọi là các điểm cạnh (edge point). *Cạnh* (edge) là tập hợp các điểm cạnh tạo nên một hình dạng có ý nghĩa nào đó liên quan đến thông tin hình dạng và cấu trúc của đối tượng trong ảnh, ví dụ đường bao của một khuôn mặt, cấu trúc vành mũ, ... Tách cạnh là quá trình trích rút các thông tin tin cạnh bằng các phép toán xử lý ảnh. 

Ví dụ như ta có một bức ảnh và ta lấy một đường kẻ ngang rồi ta sẽ lấy mức xác theo đường thằng đó, ta sẽ thấy được sự thay đổi mức xám ở các ví trị.
![](https://images.viblo.asia/4f1f1f7c-98f4-43f8-9fbc-a783297d9a09.PNG)

# Gradient 
Khi nhắc đến sự thay đổi đổi thì ta thường nhắc tới **Gradient**. **Gradient** của hàm cho biết hàm tăng mạnh như thế nào. 

- Ví dụ với hàm 1 chiều: $f(x) = x^{2}$ thì Gradient của nó được ký hiệu và tính như sau:  $Grad(x) = 
\frac{\partial f(x)}{\partial (x)} = 2x$
    - Grad (2) = 4 chỉ ra hướng tăng của hàm là bên phải
    - Grad (-1) = - 2 chỉ ra hướng tăng của hàm nằm ở bên trái.

Gradient không chỉ tính bằng đạo hàm bậc 1, ta cũng thể  tính bằng đạo hàm bậc. Với độ biến đổi của mức sáng bên trên ta tính được đạo hàm bậc 1, bậc 2 và công thức tương ứng như sau:
![](https://images.viblo.asia/d359a16c-9fc1-4f78-a756-9d21dc4caaca.PNG)

# Edge detection using derivatives
Ta có 2 cách để phát hiện cạnh sử dụng đạo hàm là:
- Phát hiện giá trị cực tiểu hoặc cực đại địa phương trong đạo hàm bậc 1
- Phát hiện zero-crosssing (chính là chỗ giá trị từ âm sang dương hoặc ngược lại bạn có thể nhìn chú thích ở hình trên) trong đạo hàm bậc 2. 

![](https://images.viblo.asia/ed231252-4b7c-44bf-af9a-ba1b35c0ec94.PNG)

Đạo hàm trong không gian 2 chiều được tính như sau: 

![](https://images.viblo.asia/7b7f3113-ce20-44c9-852d-cfed10e72a83.PNG) 

Tuy nhiên để áp dụng cho ảnh số, việc xấp xỉ hóa đạo hàm của hàm rời rạc là cần thiết. Xấp xỉ đạo hàm bậc nhất hàm gradient được tính như sau (1): 

![](https://images.viblo.asia/5531e493-cd0a-4100-9cd3-6f8b66565376.PNG) 

Độ lớn của Gradient cho biết cường đọi của cạnh tại điểm $(x,y)$: 

![](https://images.viblo.asia/cb397ed2-b6fc-46aa-bedf-115939000e1e.PNG)

Trong ảnh số, ta có các bước để tính gradient như sau:
- Tính Gradient theo cột 
- Tình Gradient theo hàng
- Tính Gradient cuối cùng bằng cách tổng hợp 2 Gradient bên trên. 

Nếu ta tính gradient bằng phương pháp thông thường theo kiểu duyệt theo hàng và cột rồi tính thì rất mất thời gian, có cách nào làm nhanh hơn không ? Và ta có cách dùng phép toán sử dụng kernel ta học ở bài trước để tính toán. 

## Various kernels used to compute the gradient
 Ở đây, mình sẽ giới thiệu cho các bạn những kernel được sử dụng rộng rãi nhất trong xử lý ảnh. Đầu tiền ta có cái nhìn tổng quan về các kernel được giới thiệu như sau: 
 ![](https://images.viblo.asia/fc7d6a54-4539-44e6-9a57-108ae931d33a.PNG)

### Pixel Difference masks
![](https://images.viblo.asia/e6d5a672-54be-459e-ad49-a8465224e0e9.PNG)


Kernel này thể hiện rõ công thức đạo hàm bậc 1 theo x và theo y bên trên (1) với -1 đằng sau số 1 vì ở đây ta thực hiện phép toán **Convolution** nên nó đảo ngược . 

Ví dụ của một ảnh sử dụng kernel trên như sau: 

![](https://images.viblo.asia/1eaba0a2-495a-413c-9690-545a3310d2ef.PNG)

Kết quả cho ra không được tốt cho lắm, vì thế ta sẽ tìm các hiểu tìm hiểu các kernel khác cho kết quả tốt hơn. 

### Robert mask

Roberts masks tính gradient theo đường chéo giữa 2 điểm. Kernel đạo hàm theo x và y như sau: 

![](https://images.viblo.asia/6666499c-c6ae-4a10-8540-fad89fa1a862.PNG)

Kết quả với cùng một ảnh gốc ở ví dụ pixel difference masks với Robert mask như sau: 

![](https://images.viblo.asia/d826cf32-ccc5-4285-80fc-5964795c63c2.PNG)

Ta thấy kết quả sẽ đậm hơn theo đường chéo mà không phải ngang hay dọc như ở kernel trước, Kernel kích thước 2 x 2 thường khó để cài đặt bởi tính toán của chính không rõ ràng. Do đó, cửa sổ kích thước 3 x 3 thường được sử dụng.

### Prewitt mask

Prewitt mask được định nghĩa như sau: 

![](https://images.viblo.asia/17d7e401-1b1b-4e2c-bd42-bf3394e3cfc9.PNG)

Ta có một  ví dụ sử dụng Prewitt mask.

![](https://images.viblo.asia/168877ac-cbde-435b-9084-e533bf6ff1ec.PNG)

### Sobel mask

Một biến thể khác của Prewitt mask sử dụng tăng trọng số của điểm trung tâm lên 2 là Sobel mask. Giá trị 2 được sử dụng để làm mượt ảnh và cũng để đánh giá điểm trung tâm quan trọng hơn các điểm khác. 

![](https://images.viblo.asia/d0399944-25bb-41bc-a898-31f26ca4faca.PNG)

Và đây là kết quả khi sử dụng Sobel mask với bức ảnh đầu vào: 
![](https://images.viblo.asia/7b2c9cde-a1f8-4850-b9f4-4f4e59cf6894.PNG)


## Laplace gradient
Các kernel ở trên đều tính gradient dựa trên đạo hàm bậc 1, với gradient đạo hàm bậc 2 theo cả hai chiều hay còn gọi là Laplace trong miền liên tục được nghĩa như sau: 

![](https://images.viblo.asia/aaf23523-3a77-4d22-9866-5f7ffc611b39.PNG)

Trong miền liên tục, công thức trên được xấp xỉ thành: 

![](https://images.viblo.asia/8b434dcd-8797-4a3b-94ca-1ff33f115dab.PNG)

Ta có Laplace mask hay đại diện cho hàm H bên trên được nghĩa là: 

![](https://images.viblo.asia/274c6205-ec37-46ac-bd98-e6d41edb256d.PNG)

Kết quả khi sử dụng Laplace mask khi sử dụng Laplace mask: 

![](https://images.viblo.asia/c8b3a08c-0c99-4a3f-aae0-185039b00fc5.PNG)

Ta thấy kết quả đẹp hơn nhiều ở ví trị đầu,... nhưng vẫn chưa tốt vì còn lấy các giá trị ở phần nền cỏ tạo ra các chấm rời rạc vì nhiệm vụ của tách cạnh là lấy ra những cạnh liền mạch có giá trị.

Ta có cái nhìn tổng quan khi áp dụng 5 kernel khác nhau để tách cạnh như sau: 

![](https://images.viblo.asia/b6b7cc27-a8cf-45b9-a89e-d8371c388fc3.PNG)

# More advanced edge detection
## Laplacian of a Gaussian (LoG) edge detection
Không như các thuật toán trước tính gradient sử dụng các  phép toán tuyến tính, thuật toán này tính theo hàm gaussian. Các bước thực hiện thuật toán như sau: 
1. Áp dụng LoG cho ảnh: 
    
    ![](https://images.viblo.asia/a4183ecc-15f8-4912-89e9-49e9d307f920.png)

2. Phát hiện những cũng zero-crossing trong ảnh.
3. Lọc ngưỡng trên zero-crossing chỉ để lại những điểm mạnh ( khác biệt lớn giữa cực đại dương và cực tiểu âm) 

Ví dụ về các bước thực hiện của LoG edge như sau: 

![](https://images.viblo.asia/ef158cc2-99d7-47ba-a81e-009a521186b9.png)

## Canny edge detection

Phương pháp tách cạnh Canny sử dụng thuật toán có nhiều bước để tìm cạnh trong ảnh. Nó được phát triển bởi John F. Canny vào năm 1986. Hoạt động của phương pháp này có thể tóm tắt như sau:

1. **Giảm nhiễu**: Ảnh thu nhận được từ thiết bị thu nhận thường có nhiều nhiễu, để nhiễu không ảnh hướng đến quá trình tách cạnh nó cần được giảm thiểu. Làm mờ ảnh, giảm nhiễu dùng bộ lọc Gaussian kích thước 5x5. Kích thước 5x5 thường hoạt động tốt cho giải thuật Canny. Dĩ nhiên bạn cũng có thể thay đổi kích thước của bộ lọc làm mờ cho phù hợp.

     ![](https://images.viblo.asia/e935baca-8a8c-4feb-a7c1-b7ee55e30cf7.png)

2. **Tính Gradient và hướng gradient**: Tính Gradient cho mõi điểm ảnh sử dụng bộ lọc cạnh Sobel được giới thiệu ở trên. Sau đó xác định độ lớn của cạnh được định nghĩa là độ lớn của Gradient và hướng của cạnh là hướng của Gradient. 

    ![](https://images.viblo.asia/bfbc8b98-dcb4-4bbe-9829-2b987d95a232.png)

    ![](https://images.viblo.asia/f921aeb4-f81e-407b-a25b-2b8482488da4.png)


3.  **Non-maximum Suppression** (viết tắt NMS): loại bỏ các pixel ở vị trí không phải cực đại toàn cục. Các điểm cạnh được định nghĩa là cực đại địa phương trogn ảnh độ lớn cạnh. Thuật toán để xác định điểm cạnh tại mỗi vị trí (x,y) được thực hiện như sau:
     - Làm tròn hướng cạnh  $Angle(\theta)$ tới góc là bội của $45^{\circ}$ gần nhất tương ứng chỉ tới 8 điểm lân cận. 
    
    ![](https://images.viblo.asia/cebef7e7-cd4a-4157-8804-0e063333016d.png)
    
    - So sánh độ lớn cạnh của điểm (x,y) hiện tại với điểm lân cận theo hướng của cạnh và hướng ngược lại . Ví dụ nếu có  $Angle(\theta) = -180^{\circ}$ thì 2 điểm lân cận phía sau và phía trước của điểm hiện tại được so sánh. Nếu độ lớn của cạnh của điểm (x,y) là lớn nhất thì điểm đó là cạnh, ngược lại thì không phải là cạnh.
     
    ![](https://images.viblo.asia/967f5ede-da00-40aa-b6fe-1ac3cc14cda7.png)
    
    ![](https://images.viblo.asia/3eaf4c5b-338a-4949-a4bb-2dcb8b6e9f41.png)

4. **Lọc ngưỡng**: Các điểm cạnh được lựa chọn trong bước 3 hầu hết là những cạnh thực, tuy nhiên vẫn còn những điểm cạnh bị chọn sai vì nhiễu hoặc do biến đổi màu sắc trên bề mặt của một đối tượng. Cách đơn giản nhất để phan biệt chúng là sử dụng một ngưỡng mà chỉ những điểm cạnh nào có độ lớn lớn hơn ngưỡng này thì được giữ lại. Thuật toán tách cạnh Canny sử dụng ngưỡng kép bao gồm một ngưỡng cao và một ngưỡng thấp. Những điểm nào có độ lớn cạnh lớn hơn ngưỡng cao được đánh dấu là cạnh mạnh (strong edge). Những điểm nào nào có độ lớn năm giữa hai ngưỡng được đánh đấu là cạnh yếu (weak edge).

    ![](https://images.viblo.asia/76c45ffb-c848-489b-a6ec-081dd0f0ce02.png)

    ![](https://images.viblo.asia/00597173-6d85-459d-aee1-57f0dc0c1837.png)

5. Cuối cùng: Các điểm được đánh dấu là *cạnh mạnh* được lựa chọn ngay là điểm cạnh. Những điểm cạnh yếu được chọn là điểm cạnh khi và chỉ khi nó nằm cạnh một điểm cạnh mạnh. Ở đây các điểm cạnh mạnh được coi là cạnh thực, những điểm cạnh yếu thì có thể là cạnh thực hoặc nhiễu. Và chúng chỉ có thể là cạnh thực nếu liền kề với một điểm là cạnh thực. 

    ![](https://images.viblo.asia/62884eff-18b8-412d-8973-d4a66935df42.png)


Trong opencv, ta muốn sử dụng thuật toán Canny chỉ cần sử dung câu lệnh đơn giản sau: 
```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread('cameraman.png', 0)
edges = cv2.Canny(image, 100, 200)
plt.imshow(edges, cmap='gray')
```
Với ảnh cameraman.png bạn có thể tải về máy:

![](https://images.viblo.asia/0eb9fe55-9ab8-427c-92d2-293d36f8820d.png)

Và kết quả nó sẽ như sau:

![](https://images.viblo.asia/6e2c9c99-b90b-40d4-9af2-4562559fe953.png)

Bạn có hiểu rõ hơn các tham số của hàm Canny() trong tài liệu  [cv2.Canny](https://docs.opencv.org/4.0.0/dd/d1a/group__imgproc__feature.html#ga04723e007ed888ddf11d9ba04e2232de)

# Tài liệu tham khảo
1. Xử lý ảnh - Lê Thanh Hà Chương 6
2.  R. C. Gonzalez, R. E. Woods, “Digital Image Processing,” 4th edition, Pearson, 2018.
3.  [Slide](https://github.com/chupibk/INT3404_1/blob/master/week5/Week%205%20-%20Gradient%20and%20edge.pdf)
4.  Code github: [here](https://github.com/chupibk/INT3404_1/tree/master/week5/code)
5.  http://deeplearning.net/software/theano/tutorial/conv_arithmetic.html
6.  [Feature extraction (Edge, Line, Texture)](https://www.youtube.com/watch?v=0-oVCt8NpEk&list=PLrNHXuoAEKba8cGy-4JvKtM0FKtk8h2nX&index=4)
7.  https://minhng.info/tutorials/xu-ly-anh-opencv-hien-thuc-canny-edge.html
8.  https://towardsdatascience.com/canny-edge-detection-step-by-step-in-python-computer-vision-b49c3a2d8123