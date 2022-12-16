# Giới thiệu
Ở bài trước về paper FOTS, chắc hẳn bạn đã có cái nhìn tổng quan về các mô hình text spotting. Hầu hết đều sử dụng chung một mạng CNN, sau đó đưa qua một mạng phát hiện vật thể (ở đây có thể cho mô hình học theo tọa độ box, hay phân đoạn kí tự để phát hiện box chứa text  , ... ). Tiếp đến sử dụng một phương pháp để trích xuất ra các vùng thích nghi (có rất nhiều phương pháp và là mấu chốt cho recognition branch) . Đưa qua recognition branch, ở đây thường sẽ dùng một vài block CNN đơn giản sau đó đưa qua mạng seq2seq để học các kí tự tương ứng.

Những năm gần đây, rất nhiều các phương pháp end-to-end được đưa ra để cải thiện đáng kể hiệu suất của bài toán phát hiện văn bản. Dưới đây là tổng quan các phương pháp mà các paper khác đưa ra:

![](https://images.viblo.asia/1d51d947-b956-434c-bb3c-2043533dd823.png)

Hình 1: Các phương pháp về text spotting

Hình ảnh trên cho ta thấy cái nhìn tổng quan nhất về các phương pháp về text spotting. Ở bài viết này thì mình sẽ đi sâu vào paper có tên là ABCNet ddeeer cho các bạn có cái nhìn chi tiết hơn về nó nhé.

# Tổng quan 
Như ở hình trên, có rất nhiều phương pháp end-to-end được đưa ra để xử lí về bài toán phát hiện văn bản. Tuy nhiên những phương thức trên đều sử dụng hướng tiếp cận segmentation-based làm cho việc pipeline trở nên phức tạp hơn hoặc cần yêu cầu một lượng lớn sự chú ý vào mức kí tự. Hơn nữa, hầu hết các phương pháp trên đều chậm lúc inference, cản trở khó khăn trong quá trình áp dụng vào ứng dụng. 
![](https://images.viblo.asia/b070f48e-0ce6-4158-bae1-d796bd555202.png)

Hình 2: Hình ảnh so sánh giữa segmentation-based và phương pháp của ABCnet

Bài báo đưa ra một tiếp cận mới trong bài toán text spotting, cách tiệp cận này giải quyết rất tốt với dữ liệu cong, xiên,... và đặc biệt nó đem lại tốc độ tính toán nhanh giúp mô hình có thể chạy thời gian thực. ABCNet cho phép phát hiện văn bản có hình dạng cong, với một đường cong Bezier thích nghi hiệu quả.  Ngoài ra, bài báo đưa ra một lớp căn chỉnh tính năng mới - BezierAlign - để tính toán chính xác các đặc điểm tích tụ của các thể hiện văn bản ở dạng cong và do đó có thể đạt được độ chính xác nhận dạng cao với chi phí tính toán gần như không đáng kể.

Bài báo đưa ra những đóng góp sau :
* Để xác định được chính xác hơn đặc trưng của văn bản cong, xiên và hướng của nó trong hình ảnh, bài báo giới thiệu một cách biểu diễn tham số ngắn gọn bằng cách sử dụng đường cong Bezier.  Nó chứng minh được chi phí tính toán nhanh hơn nhiều so với việc dự đoán bao đóng cho văn bản.
* Bài báo đề xuất một phương pháp lấy mẫu, còn gọi là BezierAlign, để căn chỉnh đối tượng chính xác và do đó nhánh nhận dạng có thể được kết nối tự nhiên với cấu trúc tổng thể.  Bằng cách chia sẻ các tính năng của kiến trúc cơ sở, nhánh nhận dạng có thể được thiết kế với cấu trúc nhẹ.
* Sự đơn giản của phương pháp của bài báo cho phép nó thực hiện inference trong thời gian thực.  ABCNet đạt được hiệu suất hiện đại trên hai bộ dữ liệu đầy thách thức, Total-Text và CTW1500, thể hiện lợi thế về cả hiệu suất và hiệu quả.

# Ý tưởng chính
![](https://images.viblo.asia/b435817e-ca2e-40e1-9003-a5745addfd74.png)
Hình 3: Cấu trúc mô hình ABCNet

Bài báo đưa ra một giải pháp mới về phát hiện văn bản mới tên là Bezier ,phương pháp lấy mẫu có tên là BezierAlign, nhánh nhận dạng:
## Bezier detection
So sánh với việc các mô hình khác sử dụng phương thức phân đoạn ảnh làm cơ sở thì việc đưa ra giải pháp phương thức hồi quy làm cơ sở mang đến cho mô hình việc học các tham số để mô hình tìm được tọa bộ box trở nên dễ dàng và đỡ phức tạp hơn. Hơn nữa, nó đem lại hiệu quả hơn với dữ liệu văn bản cong, xiên.

Bài báo đã đưa ra một đường cong có tên là Bezier, đường cong được đặt là $c(t)$ và nó sử dụng [ Bernsterin Polynomials](https://www.researchgate.net/publication/234888751_On_the_Generating_Function_for_Bernstein_Polynomials). Công thức đường cong được biểu diễn như sau:
$$c(t) = \sum_{i==0}^nb_iB_{i,n}(t),0<=t<=1$$
Trong đó, n là hệ số góc, $b_i$ biểu diễn điểm thứ i và $B_{i,n}(t)$ biểu diễn Bernstein polynomials, theo công thức sau:
$$B_{i,n}(t) = {n\choose i} t^i (1-t)^{n-i},i = 0,...,n$$
trong đó ${n\choose i}$ là [hệ số nhị thức](https://en.wikipedia.org/wiki/Binomial_coefficient). 
Dựa vào đường cong Bezier, mô hình có thể dễ dàng phát hiện văn bản có hình dạng bất kỳ với bằng cách hồi quy tọa độ box với tổng cộng 8 điểm. Lưu ý rằng với một đoạn văn bản thẳng chỉ cần biểu diễn bằng 4 điểm (4 đỉnh ) , bài báo đưa ra thêm 4 điểm vào mỗi cạnh, từ đó mỗi cạnh có 3 điểm biểu diễn.

![](https://images.viblo.asia/6f40a2d3-4ab3-4083-9ccb-d4bba4e6e142.png)
Hình 4: Đường cong Bezier

Để học tạo độ các điểm điều khiển , đầu tiên phải sinh ra Bezier curve ground truth, sau đó sử dụng phương pháp hồi quy tuyến tính để học điểm dữ liệu.

$$\triangle_x = b_{ix}-x_{min}, \triangle_y = b_{iy}-y_{min}$$
trong đó $x_{min}$ và $y_{min}$ là số nhỏ nhất của x và y trong 4 điểm biểu diễn. Ưu điểm của việc điều chỉnh trước khoảng cách tương đối là nó không liên quan đến việc liệu các điểm kiểm soát đường cong Bezier có nằm ngoài giới hạn hình ảnh hay không. Để thực hiện điều này, ở đầu mô hình phát hiện, mô mhinfh sửa dụng 1 lớp Convolutions với 16 channel ứng với 8 điểm tọa độ (x,y) để học $\triangle_x$ và $\triangle_y$

## Bezier align
Cũng giống như bao paper về text spotting khác. Để cho phép đào tạo end-to-end, hầu hết các phương pháp trước đây đều áp dụng các phương thức lấy mẫu khác nhau (căn chỉnh tính năng) để kết nối nhánh nhận dạng. Thông thường, phương pháp sampling đại diện cho ưu đãi cắt xén vùng trong mạng. Nói cách khác, với bản đồ đặc trưng và khu vực ưa thích (RoI), sử dụng phương pháp lấy mẫu để chọn các tính năng của RoI và xuất một cách hiệu quả bản đồ đặc trưng có kích thước cố định. Tuy nhiên, các phương pháp lấy mẫu của các phương pháp không dựa trên phân đoạn trước đây, ví dụ: RoI Pooling , RoI-Rotate , Text-Align-Sampling  hoặc RoI Transform không thể căn chỉnh chính xác các đối tượng có hình dạng tùy ý văn bản (RoISlide nhiều phân đoạn dự đoán). Bằng cách khai thác bản chất tham số hóa của hộp giới hạn đường cong Bezier nhỏ gọn, mô hình đề xuất BezierAlign cho tính năng sampling. BezierAlign được mở rộng từ RoIAlign . Không giống như RoIAlign, hình dạng lưới lấy mẫu của BezierAlign không phải là hình chữ nhật. Thay vào đó, mỗi cột của lưới có hình dạng tùy ý trực giao với ranh giới đường cong Bezier của văn bản. 

Từ feature map và các điểm kiếm soát đường cong Bezier, xử lý đồng thời tất cả các pixel đầu ra của feature map đầu ra hình chữ nhật với kích thước $h_{out}xw_{out}$. Lất pixel $g_i$ vpwos vị trí $(g_{iw}, h_{ih})$, tính t theo công thức sau:
$$t = \frac{g_{iw}}{w_{out}}$$
Sau đó lấy t và công thức tính $c(t)$ ở trên để tính điểm trên của đường cong Bezier $tp$ và điểm dưới đường cong Bezier $bp$. Sử dụng $tp$ và $bp$ để xác định điểm mẫu $op$ một cách tuyến tính theo công thức sau:
$$op  = bp\frac{g_{ih}}{h_{out}}+tp(1-\frac{g_{ih}}{h_{out}})$$
Từ vị trí điểm $op$ có thể dễ dàng sử dụng bilinear interpolation để tính ra kết quả.
![](https://images.viblo.asia/53d3fd75-3c18-4280-b020-13a9ab01ad60.png)
Hình 5: So sánh các phương pháp lấy mẫu khác với Bezier Align
## Recogniton branch
![](https://images.viblo.asia/44161488-4ba7-451d-bc63-a46dd3ac5f4d.png)
Hình 5: Kiến trúc nhánh recognition branch

Ở nhánh nhận dạng này, bài báo sử dụng kiển trúc CRNN + CTC loss với số 8 layer CNN + BiLSTM, sau đó sử dụng CTC loss để giải mã.
# Kết luận
Với paper này, việc sử dụng phương pháp hồi quy để cho mô hình học các điểm tọa độ bao quanh văn bản giúp cho mô hình giảm đi độ tính toán và nó trở nên nhanh hơn. Hơn nữa, việc đưa ra Bezier detection và Bezier align giúp cho mô hình có thể phát hiện và biến đổi văn bản có hình dạng bất kì trở nên tốt hơn nhờ đường cong mà bezier tạo nên. Cảm ơn các bạn đã theo dõi bài viết này của mình, tuy nhiên thì bài viết sẽ không được rõ ràng lắm nên nếu không cần thiết thì các bạn chỉ cần hiểu ý tưởng, kết quả và sự hiệu quả nhé. Cho mình 1 vote vì nó free nhé (^^).
# Tham khảo
1. [ABCNet: Real-time Scene Text Spotting with Adaptive Bezier-Curve Network](https://arxiv.org/pdf/2002.10200v2.pdf)