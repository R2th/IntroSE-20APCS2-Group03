## Giới thiệu chung 
Trích xuất thông tin chính từ tài liệu văn bản như CV, hóa đơn, biên lai, ... là điều tối quan trọng trong tự động hóa văn phòng. Thông thường các phương pháp tiếp cận đều chỉ tập trung vào một số template cố định nên không thể tổng quát hóa tốt cho các tài liệu mà không theo 1 định dạng cho trước. Khi gặp các template chưa từng xuất hiện thì kết quả trích xuất sẽ rất tệ. Trong paper này, bài toán được đưa ra sẽ thách thức hơn, yêu cầu đăt ra sẽ là trích xuất thông tin từ các tài liệu văn bản nhưng tập train và tập test sẽ khác nhau về bố cục và định dạng. 

Thực tế cũng đã có vài model trước đây xử lý bài toán như này , ví dụ như model Named Entity Recognition (NER) trong paper CloudSan.
![image.png](https://images.viblo.asia/42e07931-8f91-4345-8e4a-3e76d1874e40.png)
<div align="center">Hình 1. Định nghĩa mối liên kết giữa các text trong NER</div>
Model NER thực hiện xâu chuỗi thông tin về dữ liệu trong từng dòng từ đó học được liên kết giữa các key chính để trích xuất dữ liệu. Tuy nhiên cách tiếp cận sẽ gặp khó khăn khi gặp các dạng tài liệu ảnh mà góc chụp gây sai lệch về khoảng cách các dòng, cột hay khi gặp các phần text kéo dài nhiều dòng. Nguyên nhân là việc xâu chuỗi dữ liệu liên tục như vậy sẽ chỉ khái quát hóa được liên kết dữ liệu trước - sau trên cùng 1 dòng chứ không thể bao quát cả những vùng dữ liệu bao quanh đó.

Trong bài báo này, tác giả đề xuất một model Spatial Dual-Modality Graph Reasoning (SDMGR) để trích xuất thông tin chính từ tài liệu không có cấu trúc. Ý tưởng là sử dụng dữ liệu cả về mặt hình ảnh và về text; các nút trong đồ thị được mã hóa cả các đặc trưng trực quan và đặc trưng văn bản về các vùng text được phát hiện; các cạnh của chúng đại diện cho không gian quan hệ giữa các vùng văn bản lân cận. 
![](https://images.viblo.asia/7c40ee98-e16e-4f27-8dae-763b9948ade7.png)
<div align="center">Hình 2. Cạnh của đồ thị được định nghĩa bằng quan hệ giữa các node</div>
Mỗi nút được liên kết với các đặc trưng văn bản và hình ảnh được học thông qua mạng RNN và mạng CNN một cách tự động. Các đặc trưng của mỗi nút được tinh chỉnh bằng cách tổng hợp đặc trưng của các nút  lân cận, tổng hợp qua nhiều vòng lặp. Bằng cách này, SDMG-R sử dụng đầy đủ các đặc trưng về cả hình ảnh và văn bản của tất cả các nút và các cạnh.

Để đánh giá được độ hiệu quả của model so với các model khác, chung ta cần 1 bộ dữ liệu đủ tốt và có sự khác nhau về tập train và test nhưng hiện nay các model đều sử dụng những bộ dữ liệu private hoặc có public thì lại quy mô khá nhỏ và ít trường, ví dụ như bộ SROIE. Vì vấn đề này, 1 bộ dữ liệu mới được xây dựng cho mục đích của bài toán. Bộ dữ liệu mới  WildReceipt bao gồm 25 trường , với 50000 text boxes, lớn hơn khoảng 2 lần so với bộ SROIE.
## Tổng quát hóa bài báo
Bài báo sẽ bao gồm 3 đóng góp chính, đó là:
- Đề xuất 1 model mới spatial dual-modality graph reasoning (viết tắt là SDMG-R), mô hình vẫn dựa trên mô hình graph nhưng sử dụng đồng thời cả đặc trưng hỉnh ảnh và đặc trưng văn bản.
- Xây dựng 1 bộ dự liệu tiêu chuẩn mới WildReceipt, số lượng dữ liệu lớn gấp đôi các bộ dữ liệu tương tự. Mục tiêu của nó là đánh giá quá trình trích xuất thông tin với bài toán có bộ dữ liệu training và bộ dữ liệu test khác nhau tương đối về template, điều này rất ít xuất hiện trong các bộ dữ liệu trước đó.
- So sánh tính hiệu quả của model trên 2 bộ dữ liệu tiêu chuẩn là SROIE và WildReceipt.
## Triển khai bài toán
**Key information extraction.** Khá nhiều paper đã sử dụng phương pháp template matching hay rule-base nhưng thực sự không hiệu quả với các tài liệu có định dạng mới. Sau đó CloudScan đã lập mô hình trích xuất thông tin NER nhưng chỉ sử dụng không gian 1 chiều, tổng hợp văn bản dưới dạng chuỗi. Chargrid đã encode dưới dạng 2 chiều nhưng không thể sử dụng nonlocal khi mà chỉ khai thác được những vùng text ngắn. Gần đây, VRD (Visually Rich Documents) đã encode ngữ cảnh 2 chiều của các đọan văn bản, kết hợp thêm encode dữ liệu dạng text 1 cách đầy đủ. Khác với VRD, mô hình SDMG-R được đề xuất ngoài dữ liệu về text còn kết hợp thêm các đặc trưng về hình ảnh. Đây là mô hình đầu tiên sử dụng cả đặc trưng văn bản lẫn đặc trưng về hình ảnh. Đến hiện nay đã có thêm 1 vài mô hình sử dụng cả 2 đặc trưng, ví dụ như LayoutLM. 

![image.png](https://images.viblo.asia/b1189f49-b481-4a63-9d86-b92d910fb767.png)

**Mạng Graph.** thời gian gần đây, mạng Graph là 1 chủ đề mới được mọi người sử dụng khá nhiều. Một số lượng khá đáng kể mô hình đã được nghiên cứu trong các lĩnh vực như nhận dạng hành động con người, phân tích liên kết mạng xã hội, nhận dạng hình ảnh đa nhãn, trả lời câu hỏi tự động, truy xuất dữ liệu, ... Những công việc này tạo ra các đồ thị mô hình hóa các mối quan hệ giữa các đối tượng hoặc vùng hình ảnh. Ngược lại, tác giả việc sử dụng đồ thị để thể hiện quan hệ không gian giữa các text box và áp dụng nó vào lĩnh vực khai thác thông tin quan trọng. Đối với mỗi text box được phát hiện, nó có thể tự động khai thác cấu trúc bố cục hữu ích trong
các khu vực lân cận.

Trong bài viết này, mình sẽ không đề cập sâu vào mạng Graph, mọi người có thể tìm hiểu thêm chi tiết ở trong bài viết này của anh Phạm Huy Hoàng: https://viblo.asia/p/deep-learning-graph-neural-network-a-literature-review-and-applications-6J3ZgP0qlmB

![](https://images.viblo.asia/6418031d-63ea-41fe-baed-8653bbf6c209.png)
<div align="center">Hình 3.  Kiến trúc tổng thể của mô hình SDMG-R được đề xuất để khai thác thông tin chính. </div>

Như hình ảnh trên, các đặc trưng trực quan $v_{i}$ được trích xuất qua U-Net và ROIPooling trong khi các đặc trưng văn bản $t_{i}$ được trích xuất qua Bi-LSTM. Sau đó, Các đặc trưng được kết hợp bởi tích Kronecker, điều này được thực hiện bên trong Mô-đun kết hợp không gian kép trước khi được đưa vào Mô-đun Graph, nơi các đặc trưng của nút được tinh chỉnh và tổng hợp, đồng thời trọng số cạnh được học động. Các đặc trưng của nút cuối cùng được phân loại nhãn trong mô-đun phân loại.

Đầu vào sẽ là hình ảnh tài liệu I có kích thước HxW, cùng với các vùng chữ được nhận diện $r_{i}$, với $r_{i} = <x_{i}, y_{i}, h_{i}, w_{i}, s_{i}>$ trong đó $(x_{i}, y_{i}), h_{i}, w_{i}$ và $s_{i}$ lần lượt là tọa độ góc trên bên trái, chiều cao, chiều rộng và chuỗi văn bản được nhận diện; mục đích của bài toán là phân loại từng vùng văn bản được nhận diện $r_{i}$ thành một trong tập hợp danh mục được định nghĩa từ trước Y.
Việc trích xuất thông tin văn bản được coi như là bài phân loại nút trong đồ thị sử dụng các đặc trưng về không gian kép, cụ thể là đặc trưng hình ảnh và đặc trưng văn bản. Mô hình sẽ bao gồm mô đun tích hợp không gian kép (Dual Modality Fusion Module), mô đun suy luận đồ thị (Graph Reasoning Module) và mô đun phân loại, như ở trong hình 3.

(*) Xét ma trận $A = [a_{ ij } ] _ { m n }$ và ma trận $B = [b_{ ij } ] _ { r s }$. Tích Kronecker của hai ma trận A và B, được kí hiệu là A $⊗$ B được xác định như ma trận sau:
$$A \otimes B = \left [ a _ { ij } B \right ] = \begin{bmatrix}
a_{11}B & a_{12}B & ...&a_{1n}B\\
a_{21}B & a_{22}B &...&a_{2n}B\\
...&...&...&...\\
a_{m1}B & a_{m2}B &...&a_{mn}B
\end{bmatrix}$$

### A. Mô đun kết hợp không gian kép
Cho một hình ảnh với các vùng văn bản ${r_{i}}$, trích xuất lấy vector đặc trưng  $n _ { i } ∈ R ^ { D_{n}}$  đại diện cho từng vùng văn bản $r_{i}$ thông qua mô-đun tổng hợp kép. 

Đặc trưng hình ảnh $v_{i} ∈ R  ^ { D_{v} }$ thu được từ $r_{i}$ thông qua lớp RoI Pooling ( Region of Interest - tổng hợp vùng quan tâm ) với các vùng box  $((x_{i}, y_{i}), h_{i}, w_{i})$ trên feature maps đầu ra của lớp cuối cùng của 1 trình trích xuất CNN. Trong bài báo, tác giả sử dụng U-net nhưng mọi người hoàn toàn có thể thay thế bằng model khác phù hợp hơn cho bài toán của mình. 

Kế tới là đặc trưng về văn bản từ $r_{i}$ thông qua layer Bi-LSTM. Mỗi kí tự của chuỗi $s_{i}$ sẽ được biểu diễn thành 1 one-hot vector $e_{i}^{j} ∈ R^{D_{c}}$ với kích thước $D_{c}$ là số kí tự trong danh sách được định nghĩa.  Vector $e_{i}^{j}$ sau đó được chiếu vào không gian nhỏ hơn rồi đưa tuần tự vào mô-đun Bi-LSTM để thu được kết quả biểu diễn văn bản $t_{i} ∈ D^{t}$ ứng với mỗi vùng văn bản $r_{i}$. 
$$t_{i} = Bi-LSTM(W_{s}e_{i}^{j})$$
trong đó $W_{s} ∈ R^{D_{s}×D_{c}}$ là ma trận hình chiếu của các vector $e_{i}^{j}$. Đặc trưng hình ảnh và đặc trưng văn bản sẽ được kết hợp với nhau bằng tích Kronecker như sau:
$$n_{i} = P(t_{i} ⊗v_{i})$$
$⊗$ là tích Kronecker. $P ∈ R^{D_{n}×D_{v}×D_{t}}$ là một phép biến đổi tuyến tính có thể học được và $n_{i} ∈ R^{D_{n}}$ là tính năng sau cùng thu được. **Tuy nhiên số lượng các tham số phát triển tuyến tính với kích thước của các đặc trưng trực quan,của những đặc trưng văn bản và của những biến số sinh ra khi tích hợp dẫn đến nặng bộ nhớ và chi phí tính toán.** Để giảm độ phức tạp của bộ nhớ và tính toán, trước tiên tác giả định dang lại phương trình thành dạng tensor:
$$\quad n _ { i } = T \times _ { 1 } t _ { i } ^ { T } \times _ { 2 } v _ { i } ^ { T } $$
trong đó $T\times ∈ R^{D_{t}×(D_{v}×D_{n})}$ là 1 tensor định dạng lại $P$ , $x_{j}$ là mode-j product, $x^{T}$ là chuyển vị của x. Tiếp đó, tác giả giới thiệu phương pháp phân rã block để phân tách T như sau:
$$T = C _ { b } \times _ { 1 } P _ { t } \times _ { 2 } P _ { v } \times _ { 3 } P _ { n } ,$$
(*) mode-j product là phép nhân mà trong đó tất cả các chiều sẽ đuọc khóa cứng và chỉ thực hiện trên chiều thứ j.

ở đó $C_{b} ∈ R^{D_{t}^{b}R×D_{v}^{b}R×D_{n}^{b}R}$ là tích chéo theo block với R là số block và $D_{t}^{b}×D_{v}^{b}×D_{n}^{b}$ là kích thước của block, $P _ { t } \in R ^ { D _ { t } \times D _ { t } ^ { b } R } , P _ { v } \in R ^ { D _ { v } \times D _ { v } ^ { b } R }$ và $P _ { n } \in R ^ { D _ { n } ^ { b } R \times D _ { n } }$. Vì được chia nhỏ thành các block nên $D _ { t } \gg D _ { t } ^ { b } , D _ { v } \gg D _ { v } ^ { b }, D _ { n } \gg D _ { v } ^ { n }$ và R được đặt là 1 hằng số khá nhỏ. Do đó, số tham số tensor phân rã trong công thức ban đầu là rất lớn
 được thu về nhỏ hơn tenxơ ban đầu trong phương trình $R ( D _ { t } ^ { b } \times D _ { v } ^ { b } \times D _ { n } ^ { b } ) + D _ { t } D _ { t } ^ { b }  R + D _ { v } D _ { v } ^ { b } R + D _ { n } D _ { n } ^ { b } R \ll D _ { v } D _ { t } D _ { n }$

Ngoài ra, tác giả cũng thử nghiệm với 2 phương pháp khác mà mọi người có thể cân nhắc sử dụng:

**LinearSum.** các đặc trưng trực quan $x_{v}$ và đặc trưng văn bản $x_{t}$ được chiếu tuyến tính vào 1 không gian chung $R^{D_{n}}$ thông qua 1 MLP 3 lớp và sau đó thêm phần tử phù hợp để hợp nhất thành $n_{i}$.

**ConcatMLP.** các đặc trưng trực quan $x_{v}$ và đặc trưng văn bản $x_{t}$ được concat với nhau và theo sau đó là 1 MLP 3 lớp.

### B. Mô đun Graph
Thực hiện mô hình hóa các hình ảnh tài liệu dưới dạng đồ thị $G = ( N , \varepsilon ) ,$ trong đó $N$ = {$n_{i}$} với $n_{i}$ là vector đặc trưng ứng với mỗi node $r_{i}$ và $\varepsilon$={$e_{ij}$} với $e_{ij}$ là cạnh liên kết giữa node $r_{i}$ và node $r_{j}$. Encode mỗi quan hệ $e_{ij} \in R$ giữa  $r_{i}$ và $r_{j}$ thông qua một cơ chế chú ý động. Đầu tiên cần xác định quan hệ không gian giữa node $r_{i}$ và node $r_{j}$ như sau:

Quan hệ vị trí không gian giữa các node:
$$\Delta x _ { i j } = x _ { j } - x _ { i } ,$$
$$\Delta y _ { i j } = y _ { j } - y _ { i } ,$$
$$r _ { i j } ^ { P } = \frac { \Delta x _ { i j } } { d } \| \frac { \Delta y _ { i j } } { d } ,$$
Quan hệ tỷ lệ giữa các node:
$$r _ { i j } ^ { s } = \frac { w _ { i } } { h _ { i } } \| \frac { h _ { j } } { h _ { i } } \| \frac { w _ { j } } { h _ { i } } ,$$
Sau cùng tổng hợp các mỗi quan hệ lại:
$$r _ { i j } = r _ { i j } ^ { p } \| r _ { i j } ^ { s } ,$$
trong đó $\Delta x _ { i j }$ và $\Delta y _ { i j }$ là khoảng cách nằm ngang và dọc một giữa hai box chứa văn bản $r_{i}$ và $r_{j}$ tương ứng. d là một hằng số chuẩn hóa, $\|$ là phép nối 2 giá trị lại vs nhau. Mối quan hệ vị trí không gian giữa hai box văn bản đóng một vai trò chủ chốt trong việc khai thác thông tin quan trọng. $r _ { i j } ^ { P }$ encode khoảng cách vị trí không gian tương đối giữa node $r_{i}$ và node $r_{j}$. Số hạng đầu tiên và hai số hạng sau trong Công thức tính quan hệ tỷ lệ lần lượt encode tỷ lệ khung hình của $r_{i}$ và thông tin hình dạng tương đối tương ứng.

2 mối quan hệ trên có tác dụng scale lại các box để có độ tương đồng về tỷ lệ, giúp model dễ học hơn.

Tiến hành embeding thông tin về quan hệ giữa các node thành trọng số cạnh $e_{ij} \in \varepsilon$ như sau:
$$e' _ { i j }  = N _ { l _ { 2 } } \left ( E r _ { i j } \right ) ,$$
$$e _ { i j } = n _ { i } \| e '_ { i j } \| n _ { j }    (1)$$ 
$$e _ { i j } = M ( e _ { i j } )$$
trong đó $E \in R ^ { D _ { e } \times 5 }$ là một phép biến đổi tuyến tính embed thông tin quan hệ không gian $r_{ij}$ thành một biểu diễn $D_{e}$-chiều. $N_{l_{2}}$ là phương thức chuẩn hóa $l_{2}$, được đưa vào nhằm mục địch ổn định quá trình training. $e _ { i j } \in R ^ { ( D _ { e } + 2 * D _ { n } ) }$ đại diện cho cạnh kết nối biểu thị quan hệ giữa $r_{i}$ và $r_{j}$. M là 1 MLP biến đổi $e_{ij}$ sang vô hướng.

**Graph reasoning.** Tinh chỉnh lặp lại các đặc trưng {$n_{i}$} của đồ thị L lần:
$$\quad n _ { i } ^ { l + 1 } = n _ { i } ^ { l } + \sigma ( W ^ { l } ( \sum _ { j \neq i } \alpha _ { i j } ^ { l } e _ { i j } ^ { l } ) ) ,$$
trong đó, $u _ { i } ^ { l } \in R ^ { D _ { n } }$ biểu thị đặc trưng của node thứ i tại bước thứ l. $W_{l} \in R ^ { D _ { n } \times ( D _ { e } + 2 D _ { n } ) }$ là hàm biến đổi tuyến tính tại bước l. $e _ { i j } ^ { l }$ đại diện cho hợp nhất liên kết của $n_{i}^{l}$ và $n_{j}^{l}$ tại bước l như ở công thức (1). $\sigma$ là hàm RELU phi tuyễn. $\alpha _ { i j } ^ { l }$ là trọng số cạnh chuẩn hóa giữa nút i và j tại bước l, theo công thức:
$$\alpha _ { i j } ^ { l } = \frac { \exp \left ( e _ { i j } \right ) } { \sum _ { k \neq i } \exp \left ( e _ { i k } \right ) } ,$$
trọng số của đồ thị G sẽ thay đổi động trong quá trình suy luận từ bước này sang bước khác.

Vì  $e _ { i j }$ được tổng hợp từ đặc trưng của cạnh và cả nút nên cần phải được chuẩn hóa qua  trọng số $\alpha$ sau đó mới mới được tổng hợp vào đặc trưng $n _ { i }$ qua các vòng lặp .

### C. Hàm loss
Đầu ra của mô đun suy luận $n^{L}$ sẽ được đưa vào mô đun phân loại để đánh nhãn cho từng vùng văn bản theo danh mục ban đầu. Hàm loss được tác giả định nghĩa là:
$$L o s s = \sum _ { i } C E ( n _ { i } ^ { L } , y _ { i } )$$
trong đó $y_{i} \in Y$ là danh mục ground truth, CE là hàm cross entropy.

Tuy nhiên trong trường hợp số lượng dữ liệu cho từng classs được phân bổ không đều, dẫn tới hiện tượng Imbalanced , để giải quyết vấn đề này tôi đề xuất sử dụng hàm loss là weighted cross entropy thay vì cross entropy. Lúc này các class sẽ được đánh trọng số để cân bằng lại sự chênh lệch về dữ liệu giúp cho việc training được hiệu quả hơn.
## Bộ dữ liệu WildReceipt
Bộ dữ liệu sẽ gồm dữ liệu dạng biên lai như ở bộ SROIE vì những lí do: (1) Các biên lai là ẩn danh, phú hợp làm bộ dữ liệu public, không gây rò rỉ thông tin; (2) hóa đơn mỗi công ty, cửa hàng là khác nhau nên phù hợp để đánh giá bài toán; (3) các biên lai dễ dàng thu thâp vì ở đâu cũng dùng; (4) thông tin từ hóa đơn có thể dùng cho nhiều mục đích thiết yếu như sổ sách thanh toán, hoàn trả phí, ...

Quá trình xây dựng bộ dữ liệu:
- Thu thập dữ liệu: Tìm kiếm hình ảnh trên các công cụ tìm kiếm theo từ khóa. Từ đó thu thập được 4300 hình ảnh.
- Làm sạch dữ liệu: Xóa những hình ảnh có nhiều hóa đơn, không phải hóa đơn, những hình bị mờ , không đủ hoặc không phải tiếng anh.
- Gán nhãn dữ liệu: Đầu tiên là chia box cho từng text sau đó gán nhãn cho từng box, tổng số là 25 trường.
![image.png](https://images.viblo.asia/bbf7d7d5-e01f-4ee8-afa0-f4a04e21342c.png)
Hình 4. Dữ liệu mẫu trên tập WildReceipt. Bên trái là clean-data đã được gán nhãn, bên phải là dữ liệu bị loại bỏ. 
Sau cùng thu được bộ dữ liệu bao gồm 1740 hình ảnh với 68975 text boxes. Trung bình mỗi hình ảnh có khoảng 39 box, trong đó có 25 danh mục thông tin chính gồm 12 là từ khóa, 12 là các giá trị tương ứng, 1 là các giá trị khác. WildReceipt lớn gấp 2- lần so với SROIE [7] về số ảnh và số danh mục. Bên cạnh đó, nó chứa các danh mục thông tin chính chi tiết, tất cả đều liên quan đến số liệu nên sẽ khó phân biết với nhau nếu chỉ dùng mỗi dữ liệu bản mà bỏ qua thông tin hình ảnh. 

Lấy mẫu ngẫu nhiên 1268 và 472 hình ảnh để làm tập train.Trong quá trình lấy mẫu, đẩm bảo bộ train và test có sự khác nhau về định dạng. 
Do đó, WildReceipt phù hợp để đánh giá mô hình trích xúâ thông từ tài liệu văn bản mà không biết trước định dạng tập mẫu.
Hiệu suất trên WildReceipt được đánh giá bằng điểm F1

## Thực nghiệm
Tiến hành thiết lập các giá trị đầu vào cho mô hình SDMG-R như $D_{c}$, $D_{s}$, $D_{v}$, $D_{e}$, ... 
So sánh SDMG_R với các phương tiếp cận bài toán tương tự mới ra gần đây như :
- Chargrid : Mô dình hóa tài liệu dưới dạng 2 chiều và đưa vào 1 mạng CNN để dự đoán.
- Chargrid-UNet: Sử dụng mạng U-net làm backbone cho Chatgrid trong khi vẫn giữ nguyên những thứ khác.
- VRD: Nó mô hình hóa các tài liệu với các text box dưới dạng đồ thị, sau đó được đưa vào một CRF.
Kết quả thử nghiệm được thể hiện trong bảng bên dưới:

![](https://images.viblo.asia/22e188c9-7b7c-4b25-9390-2a8e7295966c.png)

Có thể thấy rằng SDMG-R vượt trội hơn tất cả các model còn lại. Cụ thể, SDMGR đạt F1-score tính trung bình trên 12 loại giá trị trên WildReceipt lớn hơn 11,8%, 9,7% và 3% so với Chargrid, Chargerid-UNet và VRD tương ứng. Hơn nữa, SDMG-R đạt F1-score cao nhất cho 10 trong số 12 hạng mục. SDMG-R vượt trội hơn rất nhiều so với Chargerid-UNet,đó là do sự liên kết giữa các text xa nhau được học thông qua đồ thị. 

![](https://images.viblo.asia/0987dcf3-2762-4d7e-948c-9f35fa6bcf3b.png)

Tác giả cũng so sánh phương pháp của mình với các phương pháp khác trên bộ dữ liệu SROIE. Tương tự như WildReceipt, rõ ràng SDMG-R hoạt động tốt hơn các model khác. 

Tiếp sau đó họ tiến hành cắt bỏ chi tiết để đánh giá độ hiệu quả của từng phần trong SDMG-R:

![image.png](https://images.viblo.asia/ee009b51-a97e-4f5c-9eba-feee90f5a1a7.png)

**Effects of visual and textual features.** SDMGR giảm 8,6% trên WildReceipt về F1-score khi không có tính năng văn bản. Tương tự, nó giảm 2,3% khi không có các tính năng trực quan. Người ta đã chỉ ra rằng cả các đặc điểm văn bản và hình ảnh, đặc biệt là các đặc điểm văn bản, đều đóng góp rất nhiều vào việc khai thác thông tin chính.

**Effects of spatial relation.** SDMG-R giảm F1-score xuống 81,8% trên WildReceipt.Quan sát thấy rằng các mối quan hệ không gian giữa hai text box đóng một vai trò quan trọng trong việc trích xuất thông tin chính và rõ ràng có thể tăng hiệu suất của model.

**Effects of graph reasoning.** Nếu không có Graph, tác giả phải trực tiếp tiến hành phân loại các tính năng hình ảnh và văn bản hợp nhất, dẫn đến sự suy giảm hiệu suất lớn. Cụ thể, điểm số F1 tuyệt đối giảm 11,5% trên WildReceipt.

## Kết luận
Có thể thấy model SDMG-R được đề xuất trong paper là 1 hướng tiếp cận mới nhưng lại có độ hiệu quả tương đối ấn tượng. Việc sử dụng cả 2 loại đặc trưng về hình ảnh và văn bản rồi kết hợp chúng qua tích Krobecker là một phương pháp rất hay. Model này có thể được vận dụng vào giải quyết một số bài toán đặc thù một cách hiệu quả, rát đáng để mọi người áp dụng.
Bài biết này trình bày sơ lược về mô hình Spatial Dual-Modality Graph Reasoning (SDMG-R) , cảm ơn các bạn đã đọc bài, nếu có góp ý cho bài viết, các bạn vui lòng để ở phần comment.