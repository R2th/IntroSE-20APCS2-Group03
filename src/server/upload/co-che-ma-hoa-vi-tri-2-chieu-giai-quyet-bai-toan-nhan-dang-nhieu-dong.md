# Giới thiệu
Hầu hết các mô hình nhận dạng văn bản hiện nay đều xử lí trên dữ liệu 1 dòng . Về cơ bản mô hình nhận dạng sẽ có 3 thành phần là trích xuất , giải mã. Ở phần trích xuất sẽ là các mạng trích xuất đặc trưng như CNN,.. thu được một véc-tơ 1 chiều biểu diễn đặc trưng của các kí tự từ ảnh đầu vào. Vì vậy khi cho qua phần 2 đó là phần giải mã, phần này có nhiệm vụ dự đoán các giá trị phần tử trong véc-tơ trên tương ứng với kí tự nào trong bộ từ điển. Như vậy, việc biểu diễn ảnh đầu vào thành 1 véc-tơ đặc trưng 1 chiều không làm cho mô hình có thể học được dữ liệu dạng nhiều dòng, vì nó đều quy về tính toán trên 1 dòng hết.

Trên ứng dụng thực tế, việc xử lí trên dữ liệu nhiều dòng không có tính ứng dụng cao và bởi vì có thể chia dữ liệu nhiều dòng thành nhiều dữ liệu 1 dòng và đưa qua mô hình nhận dạng như bình thường. Do vậy, việc xây dựng một mô hình nhận dạng trên nhiều dòng không được sự chú ý và quan tâm nhiều từ các nhà nghiên cứu và cộng đồng phân tích văn bản. Tuy vậy, vẫn có nhiều bài toán đặc thù, mà việc áp dụng một mô hình có thể học và hiểu được cả dữ liệu 1 chiều và nhiều chiều là rất hữu ích, ví dụ như bài toán nhận dạng biển số xe, đặc thù của biển số xe là nó gồm cả biển số xe 1 dòng và biển số xe 2 dòng. Với bài toán nhận dạng biển số xe, hoàn toàn các bạn có thể xử lí theo hướng phát hiện biển số xe, sau đó điều chỉnh nó và chia đôi thành 2 phần trên dưới và đưa qua mô hình nhận dạng 1 dòng hay có thể phát hiện 4 góc của biển số xe rồi sau đó chia đôi 2 phần bằng trên dưới rồi cũng đưa qua mô hình nhận dạng 1 dòng hay phân đoạn ảnh cũng là 1 ý tưởng cho bài toán này. Tuy nhiên, sẽ có rất nhiều trường hợp mà biển số đó bị mất góc hay nghiêng, xiên, thì việc phát hiện sau đó chia đôi ảnh biển số xe ra sẽ gặp vấn đề về phát hiện không được hay chia đôi bị mất thông tin kí tự, ...

Cho nên ở một số bài toán thì việc làm cho mô hình có thể nhận dạng trên nhiều chiều là một hướng xử lí rất hay và có tính nghiên cứu cao, không những vậy nó còn đạt hiệu suất cao trong quá trình dự đoán. Để mô hình có thể làm được điều này, ở bài viết này mình sẽ giới thiệu đến các bạn một phương thức mã hóa vị trí 2 chiều, áp dụng cho mô hình TransformerOCR.
# Mã hóa vị trí 2 chiều
Trong kiến trúc Transformer , mã hóa vị trí (Positional Encoding - PE) được định nghĩa là một phương thức làm cho mô hình có thể tính toán theo thứ tự . PE có thể giữ đươc thông tin về mối quan hệ về vị trí giữa các mã hóa trong dãy, từ đó khi đưa vào mô hình Transformer nó có thêm thông tin về vị trí, sư tương quan lẫn nhau giữa các mã hóa trong dãy, giúp cho việc dự đoán trở nên tốt hơn. Trong bài toán OCR, Transformer thường sẽ được kết hợp cùng với mạng trích xuất đặc trưng CNN. PE đóng vai trò quan trọng là cầu nối giữa CNN và Transformer. Ban đầu, PE được thiết kế để nhúng các giá trị vị trí thành 1 ma trận đặc trưng 1 chiều, tuy nhiên, điều này làm cho mô hình chỉ chú ý vào dãy tuần tự từ trái sang phải và nó không phù hợp với dữ liệu nhiều dòng.

Trong khi PE làm mất đi thông tin vị trí theo chiều dọc của ảnh thì 2DPE có thể giải quyết được vấn đề này bằng cách cho mô hình chú ý là cả chiều dọc và chiều ngang của ảnh. Điều này làm cho mô hình có thể chú ý trên từng dòng của và từ trái qua phải. Do vậy, nhánh nhận dạng có thể học dữ liệu cong, xiêng, nhiều dòng mà không cần xoay ảnh.

Giả sử rằng chúng ta có một ma trận đặc trưng hai chiều được sinh ra bởi Mạng chia sẻ. Đặt nó là ma trận $S$ và có chiều $(N,C,H,W)$, trong đó $N$ là kích thước của 1 lô dữ liệu, $H$ và $W$ lần lượt là chiều cao và chiều rộng của feature map khi đi qua backbone. Cho rằng chúng ta có ma trận $S$ được xem là $s_{hw}$. Khi đó cơ chế tự chú ý được tính toán như sau:\
	$\text{Attention}_{hw} = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$\
Trong đó $Q=W_qS_{hw}$, $K=W_kS_{h'w'}$ và $V=W_vS_{hw}$ , $W_q,W_k$ và $W_v$ là trọng số tuyến tính của mô hình. $QK^T$ là trọng số thể hiện hệ số chú ý của ma trận đặc trưng khi $(h,w)$, trong khi ma trận truy vấn đặc trưng có kích thước $(h',w')$, trong cơ chế tự chú ý thì $h=h',w=w'$.

Mã hóa vị trí hai chiều 2DPE được biểu diễn như sau:\
	$\text{attn\_weight} = QK^T = p_{hw}W^qW^{k^T}p_{h'w'}$\
	$p_{hw} = \alpha(S)p_h^{sinu}+\beta(S)p_w^{sinu}$\
	$p_{h'w'} = \alpha(S)p_h'^{sinu}+\beta(S)p_w'^{sinu}$\
    Trong đó, $p_h^{sinu}$, $p_w^{sinu}$ là các mã hóa vị trí theo chiều cao và chiều rộng có dạng hình sin :\
	$p_{p,2i}^{sinu} = \text{sin}(p/10000^{2i/D})$\
	$p_{p,2i+1}^{sinu} = \text{cos}(p/10000^{2i/D})$\
    Ở đây, $p$ và $i$ chỉ số vị trí trong dãy và số chiều. Các hệ số tỷ lệ, $\alpha(S)$ và $\beta(S)$, được tính toán từ ma trận đặc trưng đầu vào \textbf{S} với hai lớp tích chập được áp dụng vào tính năng trung bình toàn cục như sau:\
    $\alpha(S) = \text{sigmoid}(\text{max}(0,g(S)W_1^h)W_2^h)$\
	$\beta(S) = \text{sigmoid}(\text{max}(0,g(S)W_1^w)W_2^w)$\
	Trong đó, $W_1^h,W_2^h,W_1^w,W_2^w$ là trọng số tuyến tính của mô hình. Hàm $g(S)$ chỉ ra một hình thức gộp trung bình trên tất cả các tính năng của $S$. Đầu ra được cho qua hàm kích hoạt sigmoid. $\alpha(S)$ và $\beta(S)$ đã xác định ảnh hưởng trực tiếp đến mã hóa vị trí chiều rộng và chiều cao để kiểm soát tỷ lệ tương ứng giữa trục dọc và trục ngang để duy trì sự đa dạng về không gian. Theo đó, 2DPE cho phép mô hình phản ánh một cách thích ứng sự liền kề của chiều rộng và chiều cao khi tính toán trọng lượng của sự chú ý bằng cách sử dụng $\alpha$ và $\beta$
   
   # Triển khai code trên Torch
   Đầu tiền chúng ta khởi tạo 1 class có tên là `_2DPositionalEncoding` như sau :
  ```
 class _2DPositionalEncoding(nn.Module):
    def __init__(self, d_model, dropout=0.1, max_len=100):
        super(_2DPositionalEncoding, self).__init__()
        #code
    def forward(self,x):
        #code
```
 Trong đó `d_model` là số chiều chiều của mô hình, `max_len` là số lượng kí tự tối đa, x là feature map đầu ra khi cho qua một mạng backbone. 
 Tiếp theo, chúng ta cần khởi tạo tensor `pe` có kích thước (max_len,d_model) và tính toán pe theo công thức của . Và sau đó khởi tạo các lớp để tính hàm $\alpha(S)$ và $\beta(S)$ như theo công thức trên :
  ```
class _2DPositionalEncoding(nn.Module):
    def __init__(self, d_model, dropout=0.1, max_len=100):
        super(_2DPositionalEncoding, self).__init__()
        #init positional encoding
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)
        #init other
        self.avg = nn.AdaptiveAvgPool2d(1)
        self.dense = nn.Sequential(
            nn.Linear(d_model,d_model//2),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(d_model//2,d_model*2),
            nn.Sigmoid())
        self.d_model = d_model
    def forward(self,x):
 ```
 Tiếp theo đến hàm forward, áp dụng công thức tính PE lên chiều cao và chiều rộng của đầu vào x. Thu được 2 `h_encoding` và `w_encoding`. Tính $\alpha$ và $\beta$ thông qua `avg` và `dense`. Tính toán 2DPE theo công thức ở trên, ta có code hoàn thiện sau đây :
  ```
class _2DPositionalEncoding(nn.Module):
    def __init__(self, d_model, dropout=0.1, max_len=100):
        super(_2DPositionalEncoding, self).__init__()
        #init positional encoding
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)
        #init other
        self.avg = nn.AdaptiveAvgPool2d(1)
        self.dense = nn.Sequential(
            nn.Linear(d_model,d_model//2),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(d_model//2,d_model*2),
            nn.Sigmoid())
        self.d_model = d_model
    def forward(self,x):
        B,C,H,W = x.shape
        #position encoding
        h_encoding = self.pe[:H,:] #H,D
        w_encoding = self.pe[:W,:] #W,D
        h_encoding = h_encoding.unsqueeze(1) #H,1,D
        w_encoding = w_encoding.unsqueeze(0) #1,H,D
        h_encoding = h_encoding.unsqueeze(0).repeat(B,1,1,1) #B,H,1,D
        w_encoding = w_encoding.unsqueeze(1).repeat(B,1,1,1) #B,1,W,D

        #adaptive position encoding

        inter = self.avg(x).view(B,-1) #B,Hidden
        alpha = self.dense(inter) #B,d_model*2
        alpha = alpha.reshape(-1,2,1,self.d_model)#B,2,1,d_model
        x = x.permute(0,2,3,1)
        x = x + alpha[:,0:1,:,:]*h_encoding+ alpha[:,1:2,:,:]*w_encoding 
        return x.reshape(-1,H*W,self.d_model).permute(1,0,2)  
```
# Tổng kết
Để xây dựng mô hình hoàn chỉnh Tranformer OCR các bạn phải thiết kế thêm phần trích xuất thông tin sử dụng mạng CNN nào đó và sau khi đưa qua 2DPE thì cho qua mô hình transformer. Cảm ơn các bạn đã quan tâm, nếu thấy hay thì cho mình 1 vote nhé <3

![](https://images.viblo.asia/cad05157-fde7-4f8d-a572-d6dfe0ca7716.jpg)

Hinh1: hình ảnh attention map trên ảnh biển số xe 2 dòng khi sử dụng 2DPE
# Tham khảo
[On Recognizing Texts of Arbitrary Shapes with 2D Self-Attention](https://arxiv.org/abs/1910.04396)