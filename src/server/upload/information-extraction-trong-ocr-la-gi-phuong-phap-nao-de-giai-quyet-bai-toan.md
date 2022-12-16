# Giới thiệu bài toán
Nhắc đến Key Information Extraction là gì chắc nhiều bạn đang chưa có câu trả lời cho mình, vì lâu nay đối với bài toán Optical Character Recognition (OCR) thường thì chúng ta sẽ quan tâm đến các bài toán như Text Detection và Text Recognition. Trong bài toán Text Detection hiện nay có một số mô hình khá nổi tiếng và tốt trên multi language texts như Character-Region Awareness For Text detection ([CRAFT](https://github.com/clovaai/CRAFT-pytorch)), Difference Binarization ([DB](https://github.com/MhLiao/DB)). Trong bài toán Text Recogniztion thì có [Deep-Text-Recognition-Benchmark](https://github.com/clovaai/deep-text-recognition-benchmark) hay trong tiếng Việt hiện nay đang đạt kết quả khá tốt với ngôn ngữ tiếng Việt như [VietOCR](https://github.com/pbcquoc/vietocr).

Hiện nay, các mô hình state-of-the-art Deep Learning trong Computer Vision đã đã thành công lớn trong các bài toán về Optical Character Recognition (OCR) bao gồm cả Text Detection và Text Recognition. Nhưng đối với bài toán Information Extraction từ văn bản, là một bài toán phụ của OCR, có rất nhiều tình huống khác nhau trong thực tế. Bài toán Information Extraction đúng là một thử thách bởi vì trong thực tế thì các văn bản trên thực tế có cấu trúc và thành phần khác nhau, các thành phần ngữ nghĩa không được trực quan và có sự nhập nhằng giữa các trường thông tin trong văn bản. Để có thể trích xuất được những thông tin cần thiết trong văn bản chúng ta cần đòi hỏi một mô hình có thể hiểu được ngữ nghĩa, cấu trúc của chúng trong văn bản và cuối cùng là phân loại chúng.

#  Phương pháp tiếp cận
Hiện này, có rất nhiều mô hình với các hướng tiếp cận khác nhau trong bài toán này. Hướng tiếp cận đơn giản nhất đó là sử dụng Text Classification để phân loại ra những thông tin nào thuộc lớp nào, cách giải quyết này có thể đơn giản và tốt trên nhưng dạng văn bản có sự dạng thấp và phân biệt rõ rệt giữa các trường thông tin, và đặc biệt là cấu trúc văn bản đó đơn giản.
![](https://images.viblo.asia/b8fdd6ac-ddfa-4160-b573-b323836c190d.png)
Hình 1: Các loại cấu trúc và phương thức cho bài toán trích xuất thông tin.
Trên ảnh là 4 hướng tiếp cận với bài toán này:
* Phương thức 1a) sử dụng đầu vào là text và box chứa text đó và dùng các công thức, mẫu chuẩn để giải quyết bài toán, cuối cùng là đưa ra dự đoán cho thực thể đó
* Phương thức 1b) sử dụng đầu vào là text và dùng một mô hình Encoder gồm các layer BiLSTM và Decoder sử dụng layer CRF để dự đoán thực thể đó. (Phương thức này như mình đã nói ở trên thì đơn giản là bài toán Text Classification)
* Phương thức 1c) sử dụng đầu vào là text và box chứa text đó đi qua một mô hình Encoder gồm các layer BiLSTM sau đó đưa qua một mô hình Graph gọi là GCN cuối cùng đưa qua mạng Decoder bao gồm cả BiLSTM và CRF để dự đoán ra thực thể đó
* Phương thức 1d) phức tạp hơn các phương thức còn lại. Nó nhận đầu vào là text, box chứa text và cả image nữa . Đầu tiên cho qua một mô hình Encoder gồm (CNN+ Transformer) sau đó cho qua mô hình Graph gọi là GLCN rồi cuối cùng đưa vào mô hình Decoder bao gồm (BiLSTM+CRF) để đưa ra dự đoán cho thực thể đó

Vì thời lượng có hạn nên mình sẽ không đào sâu vào phương thức mà mình sẽ nói về phương thức phức tạp nhất trên 4 phương thức trên, nếu hiểu rõ phương thức này thì mình tin chắc là các phương thức khác bạn đọc cũng sẽ dễ dàng để hiểu nó. Để hiểu rõ phương pháp 1d) này hơn thì trong bài viết này mình sẽ giải thích một phương pháp đạt kết quả cao trên tập SROI2019, có tên gọi là "Processing Key Information Extraction from Documents using Improved Graph Learning-Convolutional Networks" ([PICK](https://arxiv.org/abs/2004.07464)). 
# Processing Key Information Extraction from Documents using Improved Graph Learning-Convolutional Networks
Trong bài viết này mình sẽ giới thiệu tới các bạn một mô hình rất mạnh và tốt trong bài toán trích xuất thông tin với đa dạng cấu trúc trong văn bản gọi tắt là PICK. PICK kết hợp *graph learning* mô-đun tinh chỉnh hiệu quả, giúp mô hình có thể nắm được quan hệ giữa các vùng cần trích xuất. Từ đó giúp mô hình có thể phân loại hiệu quả và chính xác hơn về các vùng trích xuất đó. Bên cạnh đó, việc PICK sử dụng rất nhiều features của văn bản bao gồm text, image và position features làm tăng khả năng biểu diễn của chúng. Việc biểu diễn các features từ rất nhiều thông tin làm cho PICK đạt hiệu năng tốt hơn các mô hình còn lại.

Để giúp các bạn hiểu rõ hơn về các phương pháp mà mô hình sử dụng thì mình sẽ giải thích cách mà mô hình đã hoạt động ra sao và tại sao nó lại đạt hiệu quả cao.
## Method
Mô hình sử dụng có 3 mô-đun chính sau đây :
* Encoder: sử dụng mô hình Transformer để trích xuất đặc trưng từ văn bản và sử dụng một mạng CNN để trích xuất đặc trưng từ ảnh. Sau đó kết hợp text embbedings và image embbedings lại thành vector biểu diễn X thể hiện khả năng biểu diễn text và image chứa text đó. X được đưa xem là đâu vào của Graph mô-đun.
* Graph mô-đun: sử dụng một mạng GCN để làm giàu khả năng biểu diễn giữa các node với nhau. Việc các thông tin cần trích xuất có vị trí và nội dung khác nhau , nó không cục bộ và không theo thứ tự nên việc sử dụng Graph giúp mô hình có thể học được khả năng biểu diễn mối tương quan giữa chúng về khoảng cách và vị trí trong văn bản.
*  Decoder: Sau khi kết hợp mô-đun Graph để làm giàu thông tin thì mô hình kết hợp thông tin đó và cả thông tin do mô-đun Encoder sinh ra để đưa vào mô-đun Decoder để nhận dạng và phân loại chúng. Ở mô-đun này mô hình PICK sử dụng BiLSTM layer + CRF layer.

![](https://images.viblo.asia/4cbfec74-7277-4ce0-8473-47ef0c343dc9.png)
Hình 2: Tổng quan mô hình PICK
###   Encoder
Như hình vẽ trên, Encoder gồm 2 luồng xử lí. Luồng đầu tiên, sử dụng các vùng text để đưa qua mô hình Transformer giúp việc trích xuất dữ liệu từ dạng text. Mặt khác, luồng thứ 2 sử dụng một mạng CNN để trích xuất đặc trưng từ các vùng ảnh. Sau đó, kết hợp chúng lại bằng phép toán cộng ma trận được một ma trận $X$ có  $X\in R^{NxTxd_ {model}}$ . Trong đó, N là số lượng vùng văn bản hoặc câu, T là độ dài của văn bản hoặc câu đó và D_model là số chiều ẩn của mô hình. 
      
   $X\in R^{NxTxd_ {model}}$ được làm để biểu diễn một tập hợp các nodes của Graph và $X$ được sử dụng làm input $X_0$ của **Graph Module** bằng cách qua một layer pooling và $X_0\in R^{Nxd_{model}}$
   
###  Graph mô-đun

  Ở mô-đun này, mô hình sử dụng một mạng Graph neural network để mô hình hóa bối cảnh toàn cục và các thông tin có cấu trúc không tuần tự để xác định trước loại cạnh và ma trận kề của đồ thị. Định nghĩa cạnh là việc các nodes/text segments kết nối với nhau theo chiều ngang hay chiều dọc. Ma trận kề được xác định dựa trên 4 loại cạnh sau: "Trái sang Phải","Phải sang Trái ","Trên xuống Dưới " , "Dưới lên Trên ".  Nhưng phương pháp này không thể sử dụng đầy đủ tất cả các nút của đồ thị và khai thác các nút được kết nối tiềm ẩn cách xa nhau trong văn bản. Mặc dù  sử dụng mô hình kết nối đầy đủ nhưng thao tác này dẫn đến tổng hợp thông tin nút dư thừa và vô ích của biểu đồ.
    Bởi vì thế, Paper đã kết hợp phát triển mạng Graph learning-convolutional dựa trên cấu trúc mô hình Graph để học một *soft adjacent matrix*  thay vì *hard adjacent matrix* . Gồm 2 phần chính :
    
1.    **Graph Learning**:

   Nhận đầu vào là một vector $V=[v_1,...,v_N]^T\in R^{Nxd_{model}}$, trong đó $v_i\in R^{d_{model}}$ là node thứ i trong đồ thị và khởi tạo giá trị $V$ bằng với $X_0$, **Graph Module** sinh ra một ma trận kề $A$ biểu diễn mốt quan hệ giữa 2 nodes đầu tiên cho qua **Graph Learning**, và ma trận $H$ được trích xuất cho mooix node $v_i$  sử dụng một mạng multi-layer perceptron (MLP), nhận đầu vào là $V$ và vector $\alpha$ embbeding từ mối quan hệ tương ứng giữa các nodes. Sau đó đưa ma trận $H$ qua mạng **Graph Convolutional**  và biển diễn chúng thành $V'$. Về toán học, để học một *soft adjacent matrix A* sử dụng một layer neural hoạt động như sau:
$$\begin{cases} A_i = softmax(e_i), & i = 1,...,N, j = 1,...,N, \\ e_{ij} = LeakRelu(w_i^T|v_i - v_j|), \end{cases}$$
Trong đó, $w_i \in R^{d_{model}}$ là learnable weight vector . Hàm *softmax* được tính toán trên mỗi hàng của ma trận $A$ .

Hàm loss $\pounds_{GL}$ được định nhĩa như sau:

$$\pounds_{GL} = \frac{1}{N^2} \sum_{i,j=1}^Nexp(A_{ij} + \eta||v_i - v_j||_2^2)+\gamma||A||_F^2$$

Với biểu thức đầu tiên, mục tiêu là với các node $v_i$ và $v_j$ càng xa nhau thì giá trị weight của $A_{ij}$ càng nhỏ.Tương tự, các node gần nhau có thế có trọng số mạnh mẽ hơn. Việc này có thể ngăn việc *Graph Convolutional* học các node nhiễu. Sau đó tính trung bình lại do số lượng các node là không cố định trong từng văn bản.
2. **Graph Convolutional** :
Graph convolutional network có nhiệm vụ biểu diễn thông tin và bố cục của các nodes. Biểu diễn graph convolutional theo *node-edge-node* $(v_i,\alpha_{ij},v_j)$ .
Khởi tạo ban đầu, nhận đầu vào là $V^0=X_0\in R^{Nxd_{model}}$ và khởi tạo $\alpha_0$ bằng công thức sau:
$$\alpha_{ij}^0=W_{\alpha}^0[x_{ij},y_{ij},\frac{w_i}{h_i},\frac{h_j}{h_i},\frac{w_j}{h_i},\frac{T_j}{T_i}]^T$$

  Trong đó, W là trọng số học của mô hình, $x_{ij}$ and $y_{ij}$ là khoảng cách chiều ngang và chiều dọc của node i đến node j. $w_i,h_i,w_j,h_j$ là chiều rộng và chiều cao của các node i và j.
  
  Sau đó, tính toán ra đặc trưng ẩn $h_{ij}^l$ giữa node $v_i$ và node $v_j$ từ graph sử dụng bộ ba node-edge-node $(v_i,\alpha_{ij},v_j)$  ,$h_{ij}^l$ được tính theo công thức sau:
  $$h_{ij}^l=\alpha(W_{v_ih}^lv_i^l+W_{v_jh}^lv_j^l+\alpha_{ij}^l+b^l)$$
Cuối cùng, $v_i^{l+1}$ tổng hợp thông tin từ các đặc trưng ẩn $h_{ij}^l$ và ma trận kề mềm $A$ sử dụng graph convolutional để cập nhập các node. Theo công thức sau:
$$v_i^{l+1}=\alpha(A_ih_i^lW^l)$$
$\alpha_{ij}^{l+1}$ được cập nhật theo công thức sau:
$$\alpha_{ij}^{l+1}=\alpha(W_\alpha^lh_{ij}^l)$$

### Decoder

Nhận đầu vào là sự kết hợp giữa đầu ra của **Encoder** và **Graph Module**. Cho qua một mạng BiLSTM layer và CRF layer để phân loại chúng.Cuối cụng mô hình sử dụng 2 hàm loss để tối ưu đồng thời chúng , đó là loss của Graph learning và CRF loss.
# Kết luận
Qua bìa viết của mình hy vọng các bạn sẽ hiểu về bài toán trích xuất thông tin trong OCR là gì và làm cách nào để giải quyết bài toán này. Ở bài viết này mình có viết sâu về mô hình PICK vì mình thấy bài báo này tổng hợp rất nhiều thông tin để có thể tối ưu bài toán này. Bài viết chắc chắn còn nhiều sai sót hy vọng mình sẽ nhận được feedback từ các bạn để có thể cải thiện bài viết này tốt hơn. Hẹn gặp lại !  (loveyou3000)
# References
1. https://arxiv.org/abs/2004.07464