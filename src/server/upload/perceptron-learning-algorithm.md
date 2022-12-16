# 1 Giới thiệu
### 1.1 Bài toán phân loại (classification)
Giả sử chúng ta cần chia khách hàng ra làm hai loại/lớp (category/class) dựa vào nguồn lợi họ đem lại cho công ty: khách hàng nhỏ và khách hàng lớn. Về cơ bản, nguồn lợi được tính theo giá mặt hàng và số lượng khách mua. Như vậy, ta sẽ biểu diễn khách hàng theo hai yếu tố trên trên mặt phẳng:

![](https://images.viblo.asia/5d455d1e-fa56-4475-9831-193344e05164.png)

Bài toán của chúng ta là từ những điểm xanh và đỏ cho trước (tức marketer đã xác định), hãy xây dựng một quy tắc phân loại để dự đoán class của điểm màu xám. Nói cách khác, chúng ta cần xác định một _biên giới_ để chia lãnh thổ của hai class này, rồi với điểm cần phân loại màu xám ta chỉ cần xem nó nằm ở phía bên nào của đường biên giới là xong. Biên giới đơn giản nhất (theo đúng nghĩa toán học) trong mặt phẳng là một đường thằng (đường màu đen trong hình), trong không gian ba chiều là một mặt phẳng, trong không gian nhiều chiều là một siêu phẳng (hyperplane, một đường thẳng nằm trong nhiều chiều).

Lưu ý rằng các khái niệm _lớp_, _nhãn_, _danh mục_ ở bài toán phân loại là tương tự nhau.

### 1.2 Perceptron

Perceptron Learning Algorithm, gọi ngắn là Perceptron, là một thuật toán giúp chúng ta thực hiện công việc phân loại với hai lớp như trên, ta sẽ gọi hai lớp này là {+1, -1}. Thuật toán ban đầu được [Frank Rosenblatt](https://en.wikipedia.org/wiki/Frank_Rosenblatt) đề xuất dựa trên ý tưởng của Neural thần kinh, nó nhanh chóng tạo nên tiếng vang lớn trong lĩnh vực AI. Không giống như Naive Bayes - một thuật toán phân loại bằng cách tính xác xuất trên toàn bộ tập dữ liệu (batch learning), Perceptron sẽ đọc từng dữ liệu và điều chỉnh _biên giới_ sao cho tất cả các điểm nằm cùng một phía của _biên giới_ có nhãn giống nhau (online learning).

### 1.3 Linear Separability
Một nhược điểm của Perceptron là nó chỉ hoạt động thực sự tốt khi dữ liệu phân tách tuyến tính (linearly separable), tức có thể dùng đường thẳng, mặt phẳng, siêu phẳng để làm _biên giới_, nếu dữ liệu không thỏa điều kiện này, không những Perceptron mà bất kì thuật toán phân loại tuyến tính nào cũng sẽ fail "nhè nhẹ". Điều này dẫn đến một khái niệm quan trọng:

**Linear separability:** cho vector $\bold{x}_i$ biểu diễn một dữ liệu, $y_i$ là nhãn của $\bold{x}_i$ và $f(\bold{x}_i, y_i) = y_i \bold{x}_i$ là feature function của dữ liệu, tập dữ liệu này được gọi là _linearly separable_ nếu tồn tại một vector trọng số $\bold{w}$ và một margin $p > 0$ sao cho:

$$
\forall (\bold{x}_i, y_i) \in Dataset, \ \ \bold{w} \cdot f(\bold{x}_i, y_i) \geq p + \bold{w} \cdot f(\bold{x}_i, y')
$$
với $y'$ khác $y_i$, là nhãn của lớp còn lại. Điều này khá dễ hiểu vì khi $\bold{x}_i \cdot \bold{w}^\top$ cùng dấu với $y_i$, tức phân lớp đúng, thì tích của chúng không âm.

Ví dụ ta có vector trọng số $\bold{w} = [1, 1]$ và vector $\bold{x} = [2, 2]$ có nhãn $y = 1$, như vậy thay vào công thức trên ta được:

$$
1 [2, 2] \cdot [1, 1] \geq p + (-1)[2, 2] \cdot [1, 1]
$$
$$
\Leftrightarrow 4 \geq p + (-4) \Leftrightarrow p \leq 8
$$
![](https://images.viblo.asia/4cbee644-932e-4357-bd60-004885cd662d.png)

Nói cách khác, dữ liệu là linearly separable khi hai tập bao lồi các điểm của hai lớp không giao nhau.

![](https://images.viblo.asia/466ae3a9-c6da-452c-940b-3a7feb6c6b47.png)

Dữ liệu trên thực tế thường hiếm khi linearly separable là một hạn chế cho Perceptron, tuy nhiên Perceptron vẫn là nền tảng cho các thuật toán Neural Network hay Deep Learning sau này.

# 2 Thuật toán Perceptron
### 2.1 Ý tưởng

![](https://images.viblo.asia/658733aa-d44e-4e75-8385-898fe882dd01.png)
Chúng ta có đường nét đứt là biên giới phân lớp. Thuật toán sẽ dùng đường biên giới để thử phân loại dữ liệu, với mỗi lần phân loại thử bị sai, thuật toán sẽ điều chỉnh lại biên giới. Ở hình bên trái, có một điểm xanh nằm cùng _lãnh thổ_ với các điểm màu đỏ, do đó nó bị thuật toán phân loại sai. Thuật toán sẽ "xoay" biên giới về phía điểm xanh ấy sao cho điểm này thuộc về _lãnh thổ_ của các điểm xanh.

### 2.2 Cơ sở toán học

#### 2.2.1 Vector trọng số và biên giới
Ở phần 1.3 ta đã đề cập:
$$
y_i \bold{x}_i \cdot \bold{w}^\top \geq p + y' \bold{x}_i \cdot \bold{w}^\top
$$

Vì $p > 0$ nên
$$
y_i \bold{x}_i \cdot \bold{w}^\top > y' \bold{x}_i \cdot \bold{w}^\top \ \ \ \ \ (1)
$$
Và vì $y_i$ trái dấu $y'$ và vế trái của $(1)$ luôn _lớn hơn_ vế phải, nên vế trái của $(1)$ *không âm* và vế phải luôn *âm*

Ta có hàm $\cos$ của hai vector:

$$
\cos(\bold{a},  \bold{b}) = \frac{\bold{a} \cdot  \bold{b}^\top}{\sqrt{\sum^{k}_{i=1}a_i^2} + \sqrt{\sum^{k}_{i=1}b_i^2}}
$$

Quay về $(1)$, với vế trái là tích của hai vector $y_i \bold{x}_i$ và $\bold{w}$ là không âm ta có:
$$
y_i \bold{x}_i \cdot \bold{w}^\top \geq 0 \Leftrightarrow \cos(y_i \bold{x}_i, \bold{w}) \geq 0 \ \ \ \ \ (2)
$$
Vế bên phải cũng tương tự:
$$
y' \bold{x}_i \cdot \bold{w}^\top < 0 \Leftrightarrow \cos(y' \bold{x}_i, \bold{w}) < 0 \ \ \ \ \ (3)
$$

Gọi $\alpha$ là góc giữa hai vector $y_i \bold{x}_i$ và $\bold{w}$. Ở $(2)$, $\cos(y_i \bold{x}_i, \bold{w}) \geq 0$ nên $\alpha$ nằm trong đoạn $[0 \degree, 90 \degree] \cup [270\degree, 360\degree]$. Tương tự với $(3)$, góc giữa $y' \bold{x}_i$ và $\bold{w}$ là $\alpha'$ nằm trong khoảng $(90\degree, 270\degree)$. Như vậy các feature vector  $y_i \bold{x}_i$ và  $y' \bold{x}_i$ phải hợp với $\bold{w}$ một góc lần lượt là $\alpha$ và $\alpha'$, ta hình dung được lãnh thổ của mỗi class:

![](https://images.viblo.asia/32328294-a812-4b33-a0ca-48b6c7683077.png)

$\bold{w}$ vuông góc với biên giới phân lớp. Do đó với mọi vector nằm cùng lãnh thổ chia bởi biên giới thì tích vô hướng của chúng với $\bold{w}$ không trái dấu với các vector khác trong cùng lãnh thổ, tất cả đều thuộc về một class. Khi vector $\bold{w}$ xoay bao nhiêu thì biên giới cũng xoay bấy nhiêu để đảm bảo chúng vuông góc nhau, đây là câu trả lời tại sao $\bold{w}$ quyết định biên giới phân lớp.

#### 2.2.2 Cập nhật

Việc cập nhật sẽ diễn ra khi thuật toán **đoán sai nhãn** của dữ liệu học. Khi phải đoán một điểm dữ liệu, thuật toán không hề biết trước nhãn/lớp của nó, dữ liệu đoán mặc định có feature vector là tích của vector biểu diễn dữ liệu đó với $+1$.

Chúng ta có hai trường hợp phải cập nhật:
* Khi nhãn dữ liệu là +1 và đoán thành -1.
* Khi nhãn dữ liệu là -1 và đoán thành +1.

Ta sẽ xem xét trường hợp đầu tiên, $y_i = +1$ và $y' = -1$. Ở phần trên đã đề cập, khi dự đoán đúng nhãn $y_i$:
$$
y_i \bold{x}_i \cdot \bold{w}^\top \geq 0 \ \ \ \ \ (4)
$$
Vì $y_i = +1$ nên để thỏa (4), thì $\bold{x}_i \cdot \bold{w}^\top \geq 0$. Nhưng vì dự đoán sai nên hiện tại $\bold{x}_i \cdot \bold{w}^\top < 0$, dẫn đến không thỏa $(4)$. Cũng có:
$$
\bold{x}_i \cdot \bold{w}^\top < 0  \Leftrightarrow \alpha \in (90\degree, 270\degree)
$$

Mục đích cập nhật ở trường hợp này là điều chỉnh lại $\bold{w}$ sao cho:  
$$
\bold{x}_i \cdot \bold{w}^\top \geq 0 \ \ hay \ \ \alpha \leq 90\degree
$$
> Lưu ý: ta không cần để ý đến đoạn $[270\degree, 360\degree]$, vì nó cũng tương tự với đoạn $[0\degree, 90\degree]$.

Vậy phải điều chỉnh $\bold{w}$ làm sao để $\alpha \leq 90\degree$? Ta có quy tắc hình bình hành:

![](https://images.viblo.asia/aa11db0d-2059-4c3d-81a2-289d1ae40fba.png)

Đường chéo của hình bình hành, tức $\bold{w} + \bold{x}_i$ sẽ luôn hợp với $\bold{x_i}$ một góc không lớn hơn $90\degree$! Như vậy công thức cập nhật khi nhãn dữ liệu là +1 và đoán sai thành -1 là:

$$
\bold{w} \leftarrow \bold{w} + \bold{x}_i
$$

Suy luận tương tự với trường hợp nhãn dữ liệu là -1 và đoán sai thành +1, công thức cập nhật:
$$
\bold{w} \leftarrow \bold{w} - \bold{x}_i
$$
Ta có công thức cập nhật tổng quát mỗi khi thuật toán đoán sai, với $y_i$ là nhãn chính xác của dữ liệu:
$$
\bold{w} \leftarrow \bold{w} + y_i\bold{x}_i
$$
### 2.3 Thuật toán
Thuật toán được viết gọn như sau:
![](https://images.viblo.asia/7cf59961-cb59-41d3-a482-3130eeba58ae.png)

Với hàm $sgn(x) = 1$ nếu $x \geq 0$ và $sgn(x) = -1$ nếu $x < 0$.

### 2.4 Averaged Perceptron

Nếu dữ liệu linearly separable, Perceptron sẽ dừng lại một khi tìm được biên giới phân loại chính xác, còn không nó sẽ luẩn quẩn giữa các trọng số mà không hội tụ lại. Một giải pháp cho trường hợp này là ta sẽ cộng các vector $\bold{w}$ ở cuối mỗi lần lặp, rồi chia nó cho số lần lặp, thuật toán chắc chắn hội tụ. Ta xem xét nếu trọng số trung bình giữa các vòng lặp chênh nhau ở một ngưỡng nào đó thì có thể cho dừng. Việc tính trọng số trung bình được chứng minh là làm cho mô hình có tính tổng quát. Tuy nhiên cách làm này tốn rất nhiều chi phí hơn "bản gốc" . 

Một cách khác là ta sử dụng một tập kiểm tra ở ngoài, khi độ chính xác trên tập này bắt đầu giảm, có thể thuật toán đang dần overfit và ta dừng ở đây. Cách làm này gọi là **early stopping**.

---

Chúng ta vừa tìm hiểu một thuật toán nền tảng cho Neural Network, hi vọng bạn đọc phần nào hình dung được cách làm việc của nó. Bài viết nhiều toán và khô khan như thế này khó tránh khỏi sai sót, mong mọi người đóng góp ý kiến :smiley: