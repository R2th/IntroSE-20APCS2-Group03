# I. Word representation là gì ?

  Word representation (biểu diễn từ) là nhiệm vụ tối quan trọng trong NLP (Natural Language Processing). Nó là một trong những basic buildings blocks trong NLP, đặc biệt với neural networks. Nó có ảnh hưởng đáng kể đến những mô hình Deep learning hiện nay. Trong bài viết này, mình sẽ giới thiệu đến mọi người một số cách tiếp cận để biểu diễn từ và đi sâu vào distributed word representations – một cách tiếp cận cho cái nhìn trực quan trên phương diện đại số tuyến tính.'

# II. Cách hướng tiếp cận
## One-Hot Encoding

  Cách tiếp cận đầu tiên này có tên là One-Hot Encoding. Ý tưởng chính là tạo ra một vector w đại diện cho mỗi từ. Vector w có kích thước (N+1, 1) trong đó N là kích thước của từ điển và cộng thêm 1 dành cho những từ không xuất hiện trong từ điển(unknown word). Đối với mỗi vector w chỉ có wi = 1(i là vị trí của từ trong từ điển) còn lại đều là 0. Tuy nhiên, cách tiếp cận này có rất nhiều yếu điểm. Ví dụ như không tận dung được tần suất của các từ xuất hiện trong corpus, cũng như không thể hiện được ngữ nghĩa của từ. Sau đây là ví dụ:
![](https://images.viblo.asia/cec3a600-4874-4a6b-bdd0-8c9054b7c61d.jpg)

## Distributional Representation

  Ý tưởng chính đằng sau cách tiếp cận thứ hai này là các từ thường xuất hiện trong ngữ cảnh(context) tương tự sẽ có ý nghĩa tương tự. Ta lưu trữ lại word-context co-occurrence matrix F trong đó các hàng đại diện cho các từ trong từ điển và các cột đại diện cho ngữ cảnh. Ngữ cảnh có thể là toàn bộ câu hoặc toàn bộ văn bản. Word-context co-occurrence matrix F bao gồm frequency counts hoặc tf-idf(term frequency-inverse document frequency). Sau đây là ví dụ:
  ![](https://images.viblo.asia/fd94736f-7a04-41e9-bbc0-39ad53db2afb.png)

  Hơn nữa, một số hàm có thể áp dụng cho ma trận F để giảm nhiễu, làm mịn tần số, hoặc giảm chiều của vector biểu diễn từ. Một số hàm đó có thể là linear decomposition hoặc cũng có những cách tiếp cận nâng cao sử dụng LDA(Latent Dirichlet Allocation) hoặc Hyperspace Analogue to Language(HAL).
  
  Các phương pháp tiếp cận theo hướng này dựa chủ yếu vào phân bố của từ trong văn bản, chúng dễ sử dụng nhưng có nhược điểm là khó đào và yêu cầu bộ nhớ lớn. Hơn nữa, chúng không kết hợp các nghĩa của từ trong quá trình biểu diễn từ.
 
## Distributed word representation
  Ý tưởng chính cho cách tiếp cận thứ 3 này là biểu diễn các từ dưới dạng các feature vectors. Mỗi entry trong vector là một hidden feature. Chúng có thể biểu đạt các phụ thuộc về ngữ nghĩa hoặc cú pháp cho từ. Dưới đây là một biểu diễn 300 chiều cho các từ flight, plane, river và lake.
![](https://images.viblo.asia/42854888-f3d2-4f86-9c65-390f17c9199b.png)

  Chúng ta có thể thấy trong hình trên, các giá trị vector của flight và plane tương đối giống nhau, tương tự river và lake cũng vậy do chúng có mối quan hệ chặt chẽ về nghĩa với nhau. Kết quả là chúng tạo ra những mối quan hệ tuyến tính rất đẹp. Ví dụ kinh điển thường được sử dụng để miêu tả quan hệ tuyến tính này đó là phép loại suy của 4 từ “king”, “queen”, “man” và “woman”. Sự khác biệt giữa king và queen cũng gần giống sự khác biệt giữa man và woman. Điều này dẫn đến phép toán dưới đây:

$$ V_{king} - V_{queen} ≈  V_{man} - V_{woman}$$

### Word2Vec
  Một trong những mô hình biểu diễn từ theo Distributed word representations được sử dụng rộng rãi là mô hình Skip-Gram và CBOW(Continuous Bag of Words Model) là một phần của thư viện Word2Vec. Nó được tạo ra bởi một nhóm các nhà nghiên cứu do Tomas Mikolov đứng đầu tại Google. Ý tưởng chính là biểu diễn từ dựa trên các từ xung quanh(context-word) nó trong window-context(cửa sổ ngữ cảnh) của nó.
  #### Skip-Gram model
  Mô hình skip-gam giả định rằng một từ có thể được sử dụng để sinh ra các từ xung quanh nó trong một chuỗi văn bản. Giả sử ta có chuỗi văn bản là "I", "am", "happy", "because", "i", "am", "learning". Ta sử dụng từ "because" làm center-word và đặt kích thước của window-context bằng 2. Với từ trung tâm là "because", mô hình Skip-gram quan tâm đến xác suất có điều kiện sinh ra các context-word ("am", "happy", "i", "am") nằm trong khoảng cách không quá 2 từ:
$$\boxed{P("am", "happy", "i", "am"|"because")}$$

  Ta giả định rằng, với center-word cho trước, các context-word được sinh ra độc lập với nhau. Trong trường hợp này, công thức trên có thể được viết lại thành
$$P("am"|"because").P("happy"|"because").P("i"|"because").P("am"|"because")$$

  Trong mô hình skip-gam, mỗi từ được biểu diễn bằng hai vector $d$-chiều để tính xác suất có điều kiện. 
$$\frac{P(o|c) = exp(u_o ^Tv_c)}{\sum_{w\epsilon V}{exp(u_w ^Tv_c)}}$$

Với $c$ và $o$ lần lượt là chỉ số của center-word $w_c$ và context-word $w_o$.

$u_o$ và $v_o$ lần lượt là các context-vector và center-vector của từ $w_o$ và từ $w_c$.

$V$ là tập các từ trong từ điển.

Lưu ý là mỗi một từ có cả 2 vector đó là context-vector và center-vector.

  Giả sử trong một chuỗi văn bản có độ dài $T$ , từ tại bước thời gian $t$ được ký hiệu $w_t$. Khi kích thước window-context là m nhiệm vụ của chúng ta là tối đa hóa công thức dưới đây:
$$ Likelihood = L(\theta) =  \prod_{t=1}^{T} \prod_{-m \leq j \leq m,\ j \neq 0} P(w_{t+j} \mid w_t) $$
Ở đây, bất kỳ bước thời gian nào nhỏ hơn 1 hoặc lớn hơn T đều có thể bị bỏ qua.

Thay vì tối đa hóa hàm trên, trong khi training ta sẽ tối thiểu hóa hàm log-likelihood dưới đây:
$$ J(\theta) = -\frac{1}{T} \log{L(\theta)} = -\frac{1}{T} \sum_{t=1}^{T} \sum_{-m \leq j \leq m,\ j \neq 0} \text{log}\, P(w_{t+j} \mid {w_t;\theta}).$$

# III. Kết luận
Như vậy mình đã giới thiệu xong một cách tổng quan về Word representation. Hiện nay đã có thêm một số cách tiếp cận và một số mô hình nổi bật như BERT hay GPT-3 cho hiệu suất cao hơn hẳn nhưng chúng ta vẫn cần xem xét những mô hình và cách tiếp cận trên để hiểu rõ hơn về Word representation. Mặc dù mình rất muốn viết thêm về TF-IDF cũng như CBOW nhưng do bài viết đã khá dài nên mình xin dừng tại đây.

# Tài liệu tham khảo
1. https://www.youtube.com/watch?v=8rXD5-xhemo&list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z - đây là một bài giảng rất hay mở đầu về NLP cũng như word representation
2. https://www.youtube.com/watch?v=kEMJRjEdNzM&list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z&index=2 - đây là bài giảng tiếp nối sau bài giảng 1 ^_^
3. https://arxiv.org/abs/1301.3781 - paper về Word2Vec