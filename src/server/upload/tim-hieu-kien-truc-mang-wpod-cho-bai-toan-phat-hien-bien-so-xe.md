# 1. Lời mở đầu
<div align="justify">
    
Bài toán nhận diện biển số xe là một bài toán không còn mới. Ứng dụng nhận diện biển số xe được sử dụng rộng rãi trong các bãi giữ xe cấp phát vé tự động, các trạm thu phí trên đường cao tốc hoặc là các hệ thống theo dõi phương tiện tham gia giao thông và phát hiện các phương tiện vi phạm. Hiện nay có rất nhiều các phương pháp khác nhau được đưa ra để giải quyết bài toán này, các bạn có thể tham khảo một phương pháp được đề cập trong một bài viết khá tâm huyết của tác giả [Bùi Quang Mạnh](https://viblo.asia/u/buiquangmanh) ở [đây](https://viblo.asia/p/nhan-dien-bien-so-xe-viet-nam-Do754P9L5M6). <br>
    
    
Tuy nhiên với mỗi phương pháp đều có ưu nhược điểm riêng, ở bài viết này mình sẽ giới thiệu với các bạn một kỹ thuật khá hay được áp dụng để giải quyết bài toán này. Các bạn hãy cùng mình tìm hiểu nhé :D.
    
</div>    
    
# 2. Đôi nét về phương pháp giải quyết bài toán nhận diện biển số xe

### 2.1. Những điểm chung của đa số các phương pháp
Thông thường luồng xử lý của các phương pháp được mô tả như hình dưới đây: 
![Hình 1: Các bước xử lý](https://images.viblo.asia/d058adda-a3e8-4ebc-88a6-e286aeafb397.png)
<div align="center">
    
 *Hình 1: Các bước xử lý của bài toán*
    
</div>

Nhìn vào hình trên ta có thể thấy để giải quyết được bài toán nhận diện biển số xe thì chúng ta phải đi giải quyết ba bài toán con.
* **Bài toán thứ nhất:** Định vị vùng chứa biển số xe và tách ra được biển số.
* **Bài toán thứ hai:** Định vị ký tự.
* **Bài toán thứ ba:** Nhận dạng ký tự.

### 2.2. Định vị vùng chứa biển số xe
<div align="justify">
    
Nhiệm vụ của bài toán này là với một ảnh đầu vào cần trích xuất được toạ độ của vùng biển số xe trong ảnh và cắt ra được vùng biển số đó. Vì vậy đó là một bài toán object detection, có rất nhiều các phương pháp có thể giải quyết được vấn đề này như dùng các đặc trưng hand crafted, hoặc sử dụng các kỹ thuật liên quan đếp deep learning như các mạng object detection: YOLO, SSD, Faster RCNN...
    
</div>    
    
![](https://images.viblo.asia/cb6e49b4-e1a7-45dd-aa9c-da6fc0cc051b.jpg)
<div align="center">
    
 *Hình 2: Kết quả của bài toán xác định vùng chứa biển số xe*
    
</div>

### 2.3. Định vị ký tự
Sau khi đã xác định được vùng biển số xe thì việc tiếp theo là định vị và tách riêng từng vùng của các ký tự trên biển số ra.<br>
Để định vị và tách riêng được từng vùng ký tự trên biển số xe được tốt nhất thì ảnh thu được từ bước  **Định vị biển số xe** phải là ảnh với góc nhìn chính diện tới biển số xe, hạn chế có các chi tiết thừa từ thân xe.

### 2.4. Nhận dạng ký tự
Các vùng ký tự của bước trước sẽ được xử lý ở bước này để ra đưa ra được ký tự tương ứng với từng vùng và gộp lại trả về thông tin của biển số xe.


-----


Hiện nay ta có thể gộp 2 bài toán **Định vị ký tự** và **Nhận dạng ký tự** thành một bài toán chung đó là **OCR**(Optical Character Recoginition)

Nội dung bài viết của mình hôm nay sẽ tập trung giới thiệu với các bạn một kỹ thuật được sử dụng để giải quyết bài toán thứ nhất đó chính là sử dụng mạng WPOD.
# 3. Kiến trúc mạng WPOD
<div align="justify">
    
Vấn đề của các phương pháp object detection được áp dụng vào bài toán phát hiện biển số xe là nó chỉ đưa về kết quả là một vùng chứa biển số xe (vùng này có thể bao gồm cả biển số xe và phần chi tiết của thân xe) . Những trường hợp trả về cả biển số là những trường hợp biển số được chụp thẳng chính diện với camera ví dụ như ở các bãi gửi xe tự động thì camera sẽ được lắp sao cho camera sẽ hướng thẳng đến vùng có biển số. Tuy nhiên trong một số trường hợp không phải lúc nào biển số xe cũng được chụp ở hướng chính diện. Ví dụ trong trường hợp một chú cảnh sát giao thông với một thiết bị máy quay di động ( hoặc smartphone) dẫn đến góc nhìn tới biển số bị nghiêng gây ảnh hưởng đến việc trích xuất thông tin biển số ở các bước sau. 

Các bạn có thể nhìn hình 3 dưới đây, có thể nhìn thấy ngay là với trường hợp hướng nhìn chính diện (hình trái) thì vùng biển số phát hiện được hầu như không có chi tiết của thân xe, với trường hợp hướng nhìn hơi nghiêng một chút (hình phải) thì vùng biển số đã có rất nhiều các chi tiết thừa ở thân xe.
    
</div>    
    
![](https://images.viblo.asia/86532b45-5b0e-4e04-8e8a-b82af913f525.png)

<div align="center">
    
 *Hình 3: Kết quả detect dùng YOLO trên ảnh với hướng nhìn chính diện và hướng nghiêng khi chụp biển số xe*
    
</div>




**Và WPOD ra đời để giải quyết vấn đề đó !**
<div align="justify">

WPOD - Wraped Planer Object Detection Network. Mạng được thiết kế dựa trên ý tưởng của YOLO, SSD và STN (Spatial Tranformer Network). Trong khi các mạng YOLO và SSD chỉ trả về một hình chữ nhật bao quanh biển số xe mà không quan tâm đến không gian xung quanh biển số xe là như thế nào thì WPOD có thể trả về một vùng tứ giác bao quanh biển số xe và đưa biển số về hướng nhìn chính diện.
    
</div>
    
![](https://images.viblo.asia/024c395b-9605-4879-9cf6-8ebd3befbc5a.png)
<div align="center">
    
*Hình 4: Kết quả dectect khi sử dụng WPOD cho trường hợp biển số xe bị nghiêng*   
</div>
 
 Hình 4 là kết quả detect khi sử dụng WPOD, ta có thể thấy vùng biển số xe detect ra không có các chi tiết thừa từ thân xe và WPOD đã chuyển đổi vùng biển số xe này về hướng chính diện.
 
 **Vậy nó hoạt động như thế nào để làm được điều đó ?**
![sss](https://images.viblo.asia/ed3bbc88-9410-4719-8808-5da03a6e2d84.PNG)
<div align="center">
    
*Hình 5: Hoạt động của mạng WPOD*
    
</div>

<div align="justify">
    
Hình bên trên thể hiện cách thức hoạt động của mạng WPOD. Ta có thể thấy từ 1 ảnh đầu vào thông qua quá trình lan truyền tiến qua mạng ta thu được output features map gồm 8 channels trong đó 2 channels đầu tiên là xác suất có/không có biển số xe và 6 channels còn lại là những thông số để tính toán ma trận transform (là ma trận được sử dụng để chuyển đổi góc nhìn của biển số xe).

Để trích xuất ra được vùng biển số xe thì nhóm tác giả đã xét một hình vuông với kích thước cố định (phần hình vuông viền trắng trên hình) xung quanh từng cell trên output features map. Nếu xác suất có đối tượng của cell đó lớn hơn ngưỡng quy định thì những giá trị của 6 channels còn lại của cell đó sẽ được sử dụng để tính toán ma trận tranform từ vùng hình vuông về vùng biển số xe (đa giác viền đỏ trên hình). Và ta cũng sẽ sử dụng ma trận này để đưa biển số xe về hướng nhìn chính diện.

Ta sẽ đi vào tìm hiểu về kiến trúc mạng của nó nhé :D

</div>

### 3.1. Chi tiết về kiến trúc mạng WPOD
![Chi tiết kiến trúc mạng WPOD](https://images.viblo.asia/1f9e0c2f-bc20-4ca7-8148-90bfaa7b1eb6.PNG)
<div align="center">
    
*Hình 6: Kiến trúc mạng WPOD*
    
</div>


Kiến trúc của mạng bao gồm 21 lớp convolutional trong đó có 14 lớp là nằm trong các khối residual. Tất cả các lớp đều dùng filter với kích thước 3x3 và dùng hàm kích hoạt là Relu ngoại trừ khối **Detection**. Khối **Detection** là khối đáng chú ý nhất trong kiến trúc mạng này. 


<div align="justify">
    
Như đã đề cập ở trên thì output features map sẽ bao gồm 8 channels trong đó 2 channels đầu là xác suất có/không có đối tượng, 6 channels sau chứa các giá trị để tạo ra ma trận affine transform. Và để tạo ra được output features map như vậy thì khối **Detection** có 2 luồng riêng biệt, luồng thứ nhất dành cho việc tính toán xác suất có/không có đối tượng (2 channels đầu tiên của output features map) với luồng này thì sử dụng activations là **softmax**, luồng thứ 2 phục vụ cho việc tính toán các thông số để tạo ra ma trận transform với luồng này ta không sử dụng hàm kích hoạt hay nói cách khác hàm kích hoạt cho luồng này là hàm $\mathbf{f(x) = x}$. Kết quả của 2 luồng nay sau đó sẽ được gộp với nhau để đưa ra output.
    
</div>




### 3.2. Loss function
Hàm loss của mạng bao gồm 2 thành phần gồm độ sai lệch giữa 4 điểm góc của biển số dự đoán và thực tế và thành phần liên quan đến xác suất có/không có đối tượng.

Thành phần thứ nhất của hàm loss được tính như sau:

* $\mathbf{p}_i ={[{x_i, y_i}]}^\mathbf{T}$ với $i=1,2, 3,4$ lần lượt là toạ độ của 4 góc thực tế của biển số đã được gán nhãn lần lượt theo chiều kim đồng hồ từ góc trên cùng bên trái.
* $\mathbf{q_1} =[-0.5, -0.5]^T$, $\mathbf{q_2} =[0.5, -0.5]^T$, $\mathbf{q_3} =[0.5, 0.5]^T$, $\mathbf{q_4} =[-0.5, 0.5]^T$ lần lượt là toạ độ của 4 đỉnh của hình vuông xung quanh 1 cell của output features map.

Để tính được sai lệch giữa 4 góc thực tế ($\mathbf{p_i}$) và 4 góc mạng dự đoán đựa trên $\mathbf{q_i}$ mạng sẽ xây dựng 1 ma trận tranform các điểm $\mathbf{q_i}$ về 4 điểm mới để so sánh với 4 điểm $\mathbf{p_i}$ góc thực tế đã được gán nhãn.

<div align="center">

$T_{mn}(\mathbf{q})=\begin{bmatrix}
max(v_3, 0) & \mathbf{v_4}\\
\mathbf{v_5} & max(v_6, 0)
\end{bmatrix}{\mathbf{q}} + \begin{bmatrix}
\mathbf{v_7}\\
\mathbf{v_8}
\end{bmatrix}$

</div>

trong đó $\mathbf{v_i}$ là chiều thứ $i$ tại một điểm trên ouput features map, $(m, n)$ là toạ độ điểm đang xét trên output features map.

Để có thể tính toán sai lệch giữa 4 điểm góc dự đoán $T_{mn}(\mathbf{q})$ và 4 điểm góc thực tế thì ta cần đưa 4 điểm góc thực tế trên ảnh input về các toạ độ tương ứng trên output features map do trong quá trình lan truyền tiến qua mạng kích thước output của mạng đã bị giảm xuống so với kích thước input.
<div align="center">

 $A_{mn}(\mathbf{p}) =\frac{1}{\alpha} ({\frac{1}{N_s}{\mathbf{p}} - \begin{bmatrix}n \\ m \end{bmatrix}})$

</div>

Trong đó $\alpha =7.75$, $N_s = 4$, $N_s$ là tỉ lệ kích thước của output features map và ảnh input.


Như vậy thành phần thứ nhất của hàm loss tại một điểm $(m, n)$ sẽ là: 
<div align="center">
    
$f_{affine} =\sum_{i=1}^{4} {\begin{Vmatrix}
{T_{mn}(\mathbf{q_i}}) - A_{mn}(\mathbf{p_i})
\end{Vmatrix}}_1$

</div>




-----



Thành phần thứ 2 của hàm loss liên quan tới xác suất có/không có đối tượng:
xét một cell $(m, n)$ trên output features map ta có:
<div align="center">
    
$f_{probs}(m, n)=logloss(\mathbb{I}_{obj}, v_1)+logloss(1-\mathbb{I}_{obj}, v_2)$

</div>

với $logloss(a, b)=-a*log(b)$,
$\mathbb{I}_{obj} =1$ khi tại cell $(m, n)$ có đối tượng và $\mathbb{I}_{obj} =0$ khi tại cell đó không có đối tượng.

Tổng hợp 2 thành phần ta có hàm loss của mạng là :
<div align="center">
    
$loss =\sum_{m=1}^{M}{\sum_{n=1}^{N}}{[\mathbb{I}_{obj}*f_{affine}(m, n) + f_{probs}(m, n)]}$
    
</div>

### 3.3. Huấn luyện mô hình
Dữ liệu dùng để huấn luyện mô hình gồm 196 ảnh từ các tập dataset khác nhau liên quan đến phương tiện giao thông. Với mỗi ảnh, vùng biển số xe sẽ được gán nhãn bằng cách xác định 4 góc của vùng biển số đó.

![](https://images.viblo.asia/86ee0e82-2c8e-4dd8-962a-707b12d464a1.PNG)
<div align="center">
    
  *Hình 7: Một số hình ảnh trong tập dữ liệu*
    
 </div>
 
 Biển số xe trong tập dữ liệu là biển số của Mỹ, Brazil, Đài Loan và một số nước ở châu Âu. Tuy nhiên khi sử dụng pretrained model này với biển số xe Việt Nam thì nó vẫn hoạt động rất tốt :D
 
 Ngoài ra tác giả còn sử dụng một số các phương pháp tăng cường dữ liệu cho việc huấn luyện mô hình (các bạn có thể xem chi tiết các phương pháp tăng cường dữ liệu mà tác giả sử dụng ở trong bài báo nhé).
# 4. Kết luận
Nội dung bên trên mình đã trình bày cho các bạn về kiến trúc mạng WPOD để phục vụ cho bài toán phát hiện biển số xe. Bài viết này mình chưa đề cập đến code của phương pháp này, trong bài viết tiếp theo mình đi vào coding một hệ thống nhận diện biển số xe sử dụng kiến trúc mạng WPOD này. Các bạn có thể tham khảo code của tác giả bài báo tại [đây](https://github.com/sergiomsilva/alpr-unconstrained). Cảm ơn mọi người đã đọc bài viết của mình :hugs:
<div align="center">


</div>

# Reference:
* [License Plate Detection and Recognition in
Unconstrained Scenarios](https://openaccess.thecvf.com/content_ECCV_2018/papers/Sergio_Silva_License_Plate_Detection_ECCV_2018_paper.pdf)