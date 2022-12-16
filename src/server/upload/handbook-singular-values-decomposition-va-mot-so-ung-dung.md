## Cơ sở lý thuyết.
### 1. Giá trị riêng, vector riêng của một ma trận.
#### 1. Định nghĩa.

Giả sử $A, x$ lần lược là một ma trận vuông cấp $n$ trên trường $K$. Giả sử có số $\lambda\in K$ thỏa mãn tồn tại vector $x\in K^n$ mà $x\ne 0$ thỏa mãn $Ax=\lambda x$ thì $\lambda$ được gọi là giá trị riêng của $A$, $x$ được gọi là vector riêng tương ứng với giá trị riêng $\lambda$.

#### 2. Tính chất.

**Tính chất 1.**

Mỗi vector riêng có một giá trị riêng duy nhất:

Giả sử ma trận vuông $A$ có vector riêng $x$ ứng với hai giá trị riêng $\lambda_1, \lambda_2$ thì $Ax = \lambda_1x = \lambda_2x \Leftrightarrow (\lambda_1 - \lambda_2)x = 0 \Leftrightarrow \lambda_1 = \lambda_2$

**Tính chất 2.**

Nếu $x$ là vector riêng ứng với giá trị riêng $\lambda$ của ma trận vuông $A$ thì $kx$ cũng là vector riêng ứng với $\lambda$: $Ax = \lambda x \Leftrightarrow A(kx) = \lambda(kx)$

**Tính chất 3.**

Nếu $\lambda$ là giá trị riêng của ma trận vuông $A$ thì $\lambda^n$ là giá trị riêng của ma trận $A^n$

Giả sử $x$ là vector riêng ứng với giá trị riêng $\lambda$ của ma trận $A$, khi đó $A^nx = A^{n-1}(Ax) = A^{n-1}\lambda x = \lambda A^{n-1} x = ... = \lambda^n x$

**Tính chất 4.**

Giá trị riêng của ma trận vuông $A$ là nghiệm của phương trình $\text{det}(A-\lambda\mathbb{I}) = 0$

Giả sử $\lambda$ là giá trị riêng của ma trận $A$, khi đó tồn tại $x \ne 0$ mà $Ax = \lambda x \Leftrightarrow (A - \lambda\mathbb{I})x = 0$

Đây là một hệ phương trình tuyến tính, hệ này có nghiệm $x \ne 0$ khi và chỉ khi $\text{det}(A-\lambda\mathbb{I}) = 0$

**Tính chất 5.**

Ma trận vuông $A$ có giá trị riêng $\lambda$ thì họ vector riêng ứng với $\lambda$ là nghiệm của $(A - \lambda\mathbb{I})x = 0$

**Tính chất 6.**

Một ma trận đối xứng thì các vector riêng vuông góc với nhau.

Giả sử ma trận đối xứng $A$ có các vector riêng $x, y$ ứng với các giá trị riêng phân biệt $\lambda, \gamma$. Khi đó:
$$\lambda x^Ty = (\lambda x)^Ty = (Ax)^Ty = x^TA^Ty = x^TAy = x^T\gamma y$$
$$= \gamma x^Ty\Leftrightarrow (\lambda - \gamma)x^Ty = 0 \Leftrightarrow x^Ty = 0$$

### 2. Chéo hóa ma trận.
#### 1. Định nghĩa.
Ma trận vuông $A$ được gọi là chéo hóa được khi và chỉ khi tồn tại ma trận $P$ vuông không suy biến và ma trận đường chéo $D$ thỏa mãn $P^{-1}AP = D$

#### 2. Diagonalication Theorem.
**Phát biểu:**

Ma trận vuông $A$ kích thước $n \times n$ chéo hóa được khi và chỉ khi nó có $n$ vector riêng độc lập tuyến tính.

**Chứng minh.**

Giả sử $A$ có $n$ vector riêng độc lập tuyến tính là $v_1, v_2, ..., v_n$ ứng với các giá trị riêng $\lambda_1, \lambda_2, ..., \lambda_n$, khi đó xét $P = (v_1, v_2, ..., v_n)$ và $D = \text{diag}(\lambda_1, \lambda_2, ..., \lambda_n)$

Khi đó dễ thấy $AP = PD$, do $P$ có các vector độc lập tuyến tính nên $P$ không suy biến, do đó $P^{-1}AP = D$ nên $A$ chéo hóa được.

Ngược lại nếu $A$ chéo hóa được, nghĩa là $P^{-1}AP = D \Leftrightarrow AP = PD$.

Giả sử $P = (v_1, v_2, ..., v_n)$ và $D =  \text{diag}(\lambda_1, \lambda_2, ..., \lambda_n)$. Khi đó $Av_i = \lambda_i v_i$

Do đó $v_1, v_2, ..., v_n$ là các vector riêng của ma trận $A$ ứng với các giá trị riêng $\lambda_1, \lambda_2, ..., \lambda_n$

Ngoài ra theo định nghĩa, $P$ không suy biến, nghĩa là $P$ gồm các vector độc lập tuyến tính, nói cách khác, các vector riêng $v_1, v_2, ..., v_n$ là độc lập tuyến tính.

### 3. Singular Value Decomposition.
#### 1. Giới thiệu.
Singular Value Decomposition là một phương pháp phân tích ma trận $A$ kích thước $m \times n$ thành dạng tích ba ma trận: $A = USV^T$. Trong đó

• $U$ là ma trận  kích thước $m \times r$ sao cho các vector cột tạo thành một hệ trực chuẩn.

• $S$ là ma trận đường chéo kích thước $r \times r$ ($r$ là hạng của $A$)

• $V$ là ma trận kích thước $n \times r$ sao cho các vector cột tạo thành một hệ trực chuẩn.

Thấy rằng $A^T = VSU^T$ nên $A^TA = VSU^TUSV^T = VS^2V^T$, nhân bên phải cả hai vế cho $V$, ta được $A^TAV = VS^2$

Do đó ta có thể thấy rằng $S^2$ chứa các trị riêng của $A^TA$ và $V$ chứa các vector riêng tương ứng với trị riêng ở vị trí tương ứng.

Tương tự $AA^T = USV^TVSU^T$ nên $AA^TU = US^2$ nên $U$ chứa các vector riêng của $AA^T$ tương ứng với các trị riêng ở ma trận $S$

Ta thấy rằng nếu $\lambda$ là một giá trị riêng của ma trận $A^TA$, tương ứng với đó là vector $x$ thì $A^TAx = \lambda x$ thì $x^TA^TAx = \lambda x^Tx$

Tương đương với $||Ax||^2 = \lambda ||x||^2$, mà do $x \ne 0$ nên $\lambda \geqslant 0$

Do đó $\lambda_1, \lambda_2, ..., \lambda_r$ là các trị riêng của $A^TA$ thì quy ước $S = \text{diag}(\sqrt{\lambda_1}, \sqrt{\lambda_2}, ..., \sqrt{\lambda_r})$

• Đặt $U = (u_1, u_2, ..., u_r), V = (v_1, v_2, ..., v_r), S = \text{diag}(\sigma_1, \sigma_2, ..., \sigma_r)$ thì ta có dạng tương đương của $A = USV^T$ như sau:

$$A = \sigma_1u_1v^T_1 +  \sigma_2u_2v^T_2 + ...  + \sigma_ru_rv^T_r$$

• Các vector $u_1, u_2, ..., u_r$ gọi là các left singular vector.

• Các vector $v_1, v_2, ..., v_r$ gọi là các right singular vector.

• Các số $\sigma_1, \sigma_2, ..., \sigma_r$ gọi là các singular value.

#### 2. Các tính chất.

Giả sử ta có phân tích SVD của ma trận $A$ như sau: $A = \sigma_1u_1v^T_1 +  \sigma_2u_2v^T_2 + ...  + \sigma_ru_rv^T_r$, trong đó $\sigma_1 \geq \sigma_2 \geq ... \geq \sigma_r$

Với $1\leq k\leq r$, đặt $A_k = \sigma_1u_1v^T_1 +  \sigma_2u_2v^T_2 + ...  + \sigma_ku_kv^T_k$ thì rõ ràng $A_k$ có hạng bằng $k$.

Và cũng dễ thấy rằng $A_k$ cũng là tích của ba ma trận: $k$ cột đầu của $U$, ma trận vuông $k \times k$ đầu tiên của $S$ và $k$ hàng đầu của $V^T$. 

Ta có các tính chất sau:

**Tính chất 1.**

Ta có: $v_1 = \underset{||x|| = 1}{\text{argmax}} ||Ax||, v_i = \underset{||x|| = 1, \;x \perp v_1, v_2, ..., v_{i - 1}}{\text{argmax}} ||Ax||$

Giả sử $x = \sum\limits_{i = 1}^{r} \alpha_i v_i$ thì $||Ax|| = ||\sum\limits_{i = 1}^{r} \alpha_i Av_i|| = ||\sum\limits_{i = 1}^{r} \alpha_i \sigma_iu_i|| = \sqrt{\sum\limits_{i = 1}^{r} \alpha_i^2\sigma_i^2}$

Khi đó để $||Ax||$ lớn nhất thì $\sqrt{\sum\limits_{i = 1}^{r} \alpha_i^2\sigma_i^2}$ lớn nhất, mà do $\sum\limits_{i=1}^{r} \alpha_i^2 = 1$ và $\sigma_j\leq \sigma_i$ nên $||Ax|| \leq \sigma_1$

Dấu bằng xảy ra khi và chỉ khi $x = v_1$

Tiếp theo $x = \sum\limits_{i = 1}^{r} \alpha_i v_i$ mà $x \perp v_1$ thì $\alpha_1 = 0$, do đó $||Ax|| = \sqrt{\sum\limits_{i = 2}^{r} \alpha_i^2\sigma_i^2} \leq \sigma_2$

Dấu bằng xảy ra khi và chỉ khi $x = v_2$. Cứ tiếp tục như thế và ta thu được kết quả.

**Tính chất 2.**

Trong tất cả các ma trận $X$ có hạng bé hơn hoặc bằng $k$ thì $||A - X||_F$ đạt giá trị nhỏ nhất khi và chỉ khi $X = A_k$

Ta thấy rằng $||A - X||_F$ là tổng của bình phương độ dài các vector hàng của $A - X$. 

Các vector hàng của $A - X$ đạt giá trị nhỏ nhất về độ dài khi và chỉ khi vector hàng tương ứng ở $X$ là hình chiếu của vector hàng tương ứng ở $A$ trên không gian sinh bởi các vector hàng của $X$

Do đó $||A - X||_F$ nhỏ nhất khi và chỉ khi các vector hàng của $X$ là hình chiếu của các vector hàng của $A$

Để ý rằng nếu không gian sinh bởi các vector hàng của $X$ có cơ sở $w_1, w_2, ..., w_k$ là một hệ trực chuẩn thì $||A - X||_F^2 \geq ||A||_F^2 - (||Aw_1||^2 + ||Aw_2||^2 + ... + ||Aw_k||^2)$ (Định lý Pythagoras)

Do đó ý tưởng ta sẽ quy nạp $||Av_1||^2 + ||Av_2||^2 + ... + ||Av_k||^2 \geqslant ||Aw_1||^2 + ||Aw_2||^2 + ... + ||Aw_k||^2$ và công việc này thực sự được chứng minh nhẹ nhàng nhờ tính chất 1.

Cuối cùng, nhận xét rằng $A_k$ là hình chiếu của các vector hàng của $A$ lên không gian được sinh bởi các vector hàng của $A_k$, và hiển nhiên cơ sở của nó là $v_1, v_2, ..., v_k$.

####  3. Nhận xét.

Phần định nghĩa giới thiệu về SVD là cách phân tích một ma trận qua dạng SVD bằng cách tính các giá trị riêng và vector riêng của $A^TA$ và $AA^T$

Theo **tính chất 2**, ta phần nào đó có thể nói rằng $A_k$ là ma trận xấp xỉ nhất với $A$ trong tất cả các ma trận hạng bé hơn hoặc bằng $k$, với $k$ càng cao thì càng xấp xỉ.

Một cách hình học, $V_k = \text{span}(\{v_1, v_2, ..., v_k\})$ là không gian $k$ chiều khít $A$ nhất. Về bản chất, có lẽ định hướng về hình học này là nguyên nhân sinh ra SVD.

Tuy nhiên thì đi từ hướng chưa có gì này nó hơi khó một chút nên mình đi theo hướng ngược lại để bài viết ngắn hơn.

#### 4. Các hàm hỗ trợ tính SVD.

Trong thực tế, người ta thường chọn $U, V$ là các ma trận vuông kích thước $m \times m, n\times n$ và $S$ có kích thước $m\times n$ (Dù dư một số vector nằm trong $\text{null}(A)$)

Trong `Python`, hàm tính SVD là `U, s, V = np.linalg.svd(...)`, trong `Octave, Matlab` là `[U, s, V] = svd(...)`

## Ứng dụng cơ bản.

### 1. Giảm chiều dữ liệu.

Các ma trận $A_k$ gần khít với $A$ và có hạng bằng $k$ nên ta có thể dùng SVD để giảm chiều dữ liệu.

Việc giảm chiều dữ liệu giúp ta có khả năng biễu diễn bộ dữ liệu đó một cách khá chính xác trên đồ thị. Giả sử ta có một tập dữ liệu 4 chiều và ta muốn biểu diễn tập dữ liệu này trên đồ thị thì ta có thể dùng SVD để giảm chiều dữ liệu về 3.

Việc giảm chiều dữ liệu nhưng vẫn giữ được đặc trưng của bộ dữ liệu còn giúp số lượng tham số cần tính toán là ít hơn nên tính toán nhanh hơn.

### 2. Nén ảnh.

Với **tính chất 2**, ta thấy rằng nếu ảnh grayscale là $A$ kích thước $m \times n$ thì $A_k$ kích thước $m \times n$ sẽ khá khít với $A$ khi $k$ càng lớn.

Do đó ta có ý tưởng lưu các ma trận SVD của $A_k$ để thay thế, như thế ta cần lưu $k(m + n + 1)$ phần tử  (Chỉ cần lưu các singular values ở $S$) so với $mn$ phần tử của $A$

Ta cần $k < \dfrac{mn}{m + n + 1}$ là được. Và để ảnh có thể biểu diễn tốt nhất thì ta cần $\dfrac{||A - A_k||_F^2}{||A||_F^2} = \dfrac{\sum\limits_{i = k + 1}^{r} \sigma_i^2}{\sum\limits_{i = 1}^{r} \sigma_i^2}$ chấp nhận được.

Tương tự với ảnh màu, ta làm tương tự cho từng ma trận của từng kênh màu.

### 3. Hồi quy tuyến tính.

Với bài toán hồi quy tuyến tính, với $A$ và $b$ cho trước, ta phải tìm $x$ sao cho $||Ax - b||$ là bé nhất.

Khi đó phân tích SVD $A = USV^T$, trong đó $U, V$ là các ma trận trực giao. (Cách lấy thứ 2, không phải cách lấy được giới thiệu đầu bài)

Ta có $U^T$ là một phép quay và $VV^T = 1$ nên $||Ax - b|| = ||U^T(AVV^Tx - b)|| = ||S\underset{z}{\underbrace{V^Tx}} - U^Tb|| = \sum\limits_{i = 1}^{n} (\sigma_iz_i - u_i^Tb)^2$

Với $i > r$ thì $\sigma_i = 0$ nên $||Ax - b|| = \sum\limits_{i = 1}^{r} (\sigma_iz_i - u_i^Tb)^2 + \sum\limits_{i = r + 1}^{n} (u_i^Tb)^2 \geq  \sum\limits_{i = r + 1}^{n} (u_i^Tb)^2$

Dấu bằng xảy ra khi và chỉ khi $z_i = \dfrac{u_i^Tb}{\sigma_i}$ hay $x = \sum\limits_{i = 1}^{r} \dfrac{u_i^Tb}{\sigma_i}v_i$

### 4. PCA.

Ta thấy rằng, khi từ một tập điểm cho trước, việc giảm chiều cũng như là kẻ một siêu phẳng biểu diễn khít tập điểm đã cho. Ta không thể dùng các ma trận $A_k$ một cách trực tiếp được, vì các ma trận $A_k$ biểu diễn một siêu phẳng đi qua góc tọa độ.

Ta có thể thấy rằng $v_1$ biểu diễn phương mà tập điểm đó phân bố tập trung nhất khi nhìn từ gốc tọa độ ($||Av_1||$ đạt giá trị lớn nhất). Sau đó $v_2$ lại biểu diễn phương vuông góc với $v_1$ mà phương đó tập điểm phân bố tập trung nhất cũng khi nhìn từ gốc tọa độ... Vậy một cách đơn giản, ta chỉ cần dời nó về trọng tâm của tập điểm và dùng SVD giảm chiều xuống.

## Kết luận.

Ngoài các ứng dụng trên, SVD còn có các ứng dụng trong tối ưu cực trị rời rạc, lát cắt cực đại, K-means Clustering, Graph Partitioning, ... với một performance tính toán tương đối, rất thích hợp cho lượng dữ liệu lớn nhưng công dụng chính nhất vẫn là giảm chiều dữ liệu. Trong đó các vector $v_1, v_2, ..., v_r$ lần lượt biểu diễn các phương mà dữ liệu phân bố tập trung nhất khi nhìn từ gốc tọa độ. Mong bài biết nhỏ này có thể giúp các bạn hiểu hơn về mô hình dữ liệu, cách sử dụng, tính toán SVD bằng tay hoặc bằng hàm viết sẵn. Việc dẫn nguồn rất khó vì mình đọc từ rất nhiều tài liệu pdf trên mạng và viết bài này mà không có kinh nghiệm dẫn nguồn, ngoài ra bài viết có thể có nhiều sai sót nên mong các bạn góp ý, thông cảm.