### __Attention, Attention, Attention, ...__

- Bài blog này được viết với mục đích tìm hiểu về __Attention Mechanism__ trong Machine Learning. Để viết nên bài blog lần này, mình có tham khảo từ khá nhiều nguồn tài liệu (các bạn có thể tham khảo tại phần cuối của bài viết), bao gồm các bài blog, paper, .. Tuy nhiên, mình sẽ tập trung vào 1 số nguồn tài liệu sau đây:
    - Paper: [NEURAL MACHINE TRANSLATION
BY JOINTLY LEARNING TO ALIGN AND TRANSLATE](https://arxiv.org/pdf/1409.0473.pdf)
    - Paper: [FEED-FORWARD NETWORKS WITH ATTENTION CAN
SOLVE SOME LONG-TERM MEMORY PROBLEMS](https://arxiv.org/pdf/1512.08756.pdf)

### Giới thiệu về cơ chế Attention

- __ATTENTION__: dịch theo tiếng Việt là chú ý. Còn trong Deep Learning là 1 khái niệm nhận được rất nhiều sự quan tâm từ cộng đồng ML, DL trong vài năm gần đây.  Một vài task điển hình sử dụng Attention:

    - Task 1: Neural Machine Translation (NMT) dịch văn bản tự động, tương tự như Google Translate. Lấy 1 ví dụ với dữ liệu gồm các cặp câu Anh-Pháp. Hình bên dưới miêu tả mối liên hệ giữa các từ khi được dịch từ tiếng Anh sang tiếng Pháp sử dụng thêm cơ chế __Attention__. Các ô càng sáng biểu thị rằng 1 từ A từ ngôn ngữ E1 "chú ý" hay có tương quan hơn (correlation) với 1 từ B từ ngôn ngữ E2 (Đây cũng sẽ là ví dụ chính mình dùng để giải thích về cơ chế __Attention__ tại phần bên dưới)

    ![NMT](https://lilianweng.github.io/lil-log/assets/images/bahdanau-fig3.png)

    - Task 2:  Image Captioning. Với bài toán này, __Attention__ giúp mô hình có thể xác định được những pixel nào cần tập trung hơn để sinh text (generate text for image)

    ![Image_captioning](https://qph.fs.quoracdn.net/main-qimg-158a35df2e4e66b464f1d30b120ff577.webp)
    - Task 3: Text Summarizarion hay tóm tắt văn bản. Với lượng thông tin và kiến thức khổng lồ và được cập nhật thường xuyên trong thời đại 4.0 hiện nay, việc khiến cho mình luôn "update" thông tin nhanh và đầy đủ nhất vô cùng khó khăn. Từ đó, 1 bài toán được đề xuất là tóm tắt văn bản (các bài báo, tin tức) thành các đoạn văn ngắn hơn nhiều lần mà vẫn bao hàm đủ ý chính. Việc sử dụng thêm cơ chế __Attention__ khiến mô hình có thể tập trung nhiều hơn vào các từ khóa chính hay các câu văn mang lại nhiều thông tin trong văn bản gốc.  BONUS: Các bạn có thể tham khảo 1 bài viết khá hay về tóm tắt văn bản với Machine Learning của tác giả Hoàng Anh tại link sau: [Tóm tắt văn bản cho tiếng Việt](https://viblo.asia/p/xay-dung-chuong-trinh-tom-tat-van-ban-tieng-viet-don-gian-voi-machine-learning-YWOZrgAwlQ0)

    ![Text_summarizarion](https://3qeqpr26caki16dnhd19sv6by6v-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/Pointer-generator-model-for-Text-Summarization.png)
    - Một vài task khác: Text Classification, OCR, Voice Recognition, Generate parse trees of sentences, Chatbots, ...

### Core idea

- Trong phần này của bài blog, mình sẽ đi sâu vào tìm hiểu về cơ chế __Attention__ với công thức miêu tả kèm theo, ví dụ chính trong phần này mình sử dụng là: Neural Machine Translation với mô hình Sequence to Sequence.

- Trong mô hình seq2seq dùng cho bài toán NMT (Neural Machine Translation) bao gồm 2 mạng RNN chính: Encoder và Decoder. __Encoder__ với đầu vào là câu ở ngôn ngữ gốc, đầu ra tại layer cuối cùng của Encoder gọi là 1 context vector. Với ý nghĩa lượng thông tin từ câu của Encoder sẽ được tóm gọn lại trong 1 vector đầu ra cuối cùng. Từ đó, __Decoder__ dùng chính context vector đó, cùng với hidden state và từ trước đó để predict từ tiếp theo tại decoder qua từng timestep.

![seq2seq](https://i.imgur.com/tVtHhNp.png)

- Trong paper gốc của tác giả [Bahdanau]() có nói:

```
... we conjecture that the use of a fixed-length vector is a
bottleneck in improving the performance of this basic encoder–decoder architecture,
and propose to extend this by allowing a model to automatically (soft-)search
for parts of a source sentence that are relevant to predicting a target word, without
having to form these parts as a hard segment explicitly
```

- Việc encode toàn bộ thông tin từ source vào 1 vector cố định khiến việc mô hình khi thực hiện trên các câu dài (long sentence) không thực sự tốt, mặc dù sử dụng LSTM (BiLSTM, GRU) để khắc phục điểm yếu của mạng RNN truyền thống với hiện tượng Vanishing Gradient, nhưng như thế có vẻ vẫn chưa đủ, đặc biệt đối với những câu dài hơn những câu trong training data. Từ đó, trong paper, tác giả Bahdanau đề xuất 1 cơ chế cho phép mô hình có thể chú trọng vào những phần quan trọng (word liên kết với word từ source đến target), và thay vì chỉ sử dụng context layer được tạo ra từ layer cuối cùng của Encoder, tác giả sử dụng tất cả các output của từng cell qua từng timestep, kết hợp với hidden state của từng cell để "tổng hợp" ra 1 context vector (attention vector) và dùng nó làm đầu vào cho từng cell trong Decoder. Cách thức "tổng hợp" ở đây có thể được tạo ra bẳng nhiều cách, mình sẽ có 1 phần đề cập bên dưới. Còn trong phần này, mình tập trung vào cơ chế "tổng hợp" Attention trong paper của tác giả Bahdanau! Gọi là `Align and Jointly model` hay `Additive Attention`.

![attention01](https://talbaumel.github.io/blog/attention/img/encdec.jpg)

cơ chế seq2seq phổ biến (không có attention)

![attention_paper_01](https://lilianweng.github.io/lil-log/assets/images/encoder-decoder-attention.png)

.. và khi sử dụng thêm attention!

### Nội dung thuật toán

- Trong bài toán NMT sử dụng seq2seq, ta có 1 chuỗi các từ trong văn bản gốc $x$ với độ dài $n$, và 1 chuỗi các từ trong văn bản dịch $y$ tương ứng với văn bản gốc $x$ với độ dài $m$:

$$
\begin{aligned}
x = [x_1, x_2, ..., x_n] \\
y = [y_1, y_2, ..., y_m]
\end{aligned} 
$$

- Mỗi decoder output phụ thuộc vào từ trước đó $y_{i - 1}$, hidden state của decoder $s_i$ và __context vector__ (được tính toán như công thức bên dưới):

$$
\begin{aligned}
p(y_i | \{y_1, ..., y_{i - 1}\}, x) = g(y_{i - 1}, s_i, c_i)
\end{aligned} 
$$

- Hidden state $s_i$ của decoder được tính thông qua 1 mạng RNN của decoder với thông tin từ hidden state trước đó của decoder $s_{i - 1}$, từ $y_{i - 1}$ và 1 context vector $c_i$

$$
\begin{aligned}
s_i = f(s_{i - 1}, y_{i - 1}, c_i) \\
i = 1,...,m
\end{aligned} 
$$

- Context vector là vector được tạo ra là tổng trọng số của các encoder output tại timestep thứ $j$, với $\alpha_{ij}$ là "trọng số" biểu thị mức độ "attention" của từng hidden state $h_j$ của encoder, trọng số bởi $\alpha_{ij}$ hay gọi là `alignment score`:

$$
\begin{aligned}
c_i = \sum_{j = 1}^{T_x} \alpha_{ij}h_j
\end{aligned} 
$$

với $T$ là tổng số timestep của encoder.

- Với mỗi $\alpha_{ij}$ thực chất được tính thông qua 1 hàm `softmax` là trọng số riêng được tính tại timestep $t$ ứng với mỗi state $h_j$. Sử dụng hàm `softmax` như là một cách để normalize đối với từng attention `energy` $e_{ij}$, và được tính bằng 1 function $a$ với đầu vào là hidden state trước đó của decoder $s_{i - 1}$ và encoder output $h_j$

$$
\begin{aligned}
\alpha_{ij} = align(y_i, x_j) \\
= \frac{exp(e_{ij})}{\sum_{k = 1}^{T} exp(e_{jk})}
\end{aligned} 
$$

đánh mức độ tương quan (corralation) giữa 2 từ $y_i$ và $x_j$

$$
\begin{aligned}
e_{ij} = a(s_{i - 1}, h_j)
\end{aligned} 
$$

$e_{ij}$ hay $a(s_{i - 1}, h_j)$ được gọi là 1 `alignment model` với mục đích đáng giá mức độ tương quan của từ tại vị trí $j$ của encoder với từ output tại vị trí $i$ của decoder bằng việc gán 1 trọng số $\alpha_{ij}$

- Trong paper của tác giả Bahdanau, alignment model $a$ được chọn với công thức như sau:

$$
\begin{aligned}
score(s_{i - 1}, h_j)  = a(s_{i - 1}, h_j) = v^\top_a tanh(W_a s_{i - 1} + U_a h_j)
\end{aligned} 
$$

thực chất là 1 multilayer perception với $W_a\in\mathbb{R^{n x n}}$, $U_a\in\mathbb{R^{n x 2n}}$ và $v_a\in\mathbb{R^n}$ là các ma trận trọng số.

![Imgur](https://i.imgur.com/itj3zA3.png)

- Trong hình trên, các ô màu xanh lá cây là các hidden state $h_j$ của encoder, sau khi cho hidden state $s_{i - 1}$ của decoder và hidden state $h_j$ của encoder vào `alignment model a`, ta thu được các `alignment score` $e_{ij}$, normalize bằng `softmax` để tổng `attention score`  bằng 1, thu được các $\alpha_{ij}$. Cuối cùng tính tổng các tích $\alpha_{ij}$ và $h_{j}$ và thu được `context vector`  $c_i$, dùng làm input để predict từ $y_i$ của decoder!

- Và ma trận bất đối xứng (confusion matrix) được tạo ra bởi `alignment score`, thể hiện mức độ tương quan `correlation` giữa source và target.

![alignment_score](https://lilianweng.github.io/lil-log/assets/images/bahdanau-fig3.png)

- __NÓI CÁCH KHÁC__, thực chất __ATTENTION MECHANISM__ là 1 cơ chế giúp mô hình có thể tập trung vào các phần quan trọng trên dữ liệu, bằng việc tạo 1 `alignment model a` tính các `alignment score` $\alpha_{ij}$ để __REWEIGHT__ lại các hidden state $h_j$ của encoder. Trong bài toán NMT sử dụng seq2seq, việc đó giúp mô hình tập trung hơn vào những từ quan trọng trong câu input $x$, để từ đó predict từ $y_i$ tiếp theo tại decoder, được biểu thị bằng các ô sáng màu như trong confusion matrix bên trên, cũng là mức độ tương quan `correlation` từ $x_j$ (source) và từ $y_i$ (target)!

- Có nhiều cách để chọn `alighment model a`, các bạn tham khảo phần tại phần bên dưới

###  1 số cách tính alignment score khác

- Reference: [How to compute attention weights](https://www.coursera.org/lecture/language-processing/attention-mechanism-1nQaG)

- Content-base Attention: [Neural Turing Machine](https://arxiv.org/abs/1410.5401):

$$
\begin{aligned}
score(s_{i - 1}, h_j)  = cosine[s_{i - 1}, h_j]
\end{aligned} 
$$

- Additive Attention, [Bahdanau's Paper: NEURAL MACHINE TRANSLATION
BY JOINTLY LEARNING TO ALIGN AND TRANSLATE](https://arxiv.org/pdf/1409.0473.pdf), được đề cập trong bài này:

$$
\begin{aligned}
score(s_{i - 1}, h_j)  = v^\top_a tanh(W_a s_{i - 1} + U_a h_j)
\end{aligned} 
$$

- Multiplicative Attention hay General Attention, [Luong's Paper: Effective Approaches to Attention-based Neural Machine Translation](https://arxiv.org/pdf/1508.04025.pdf)

$$
\begin{aligned}
score(s_{i - 1}, h_j)  = s^\top_{i - 1} W_a h_j
\end{aligned} 
$$

- hoặc đơn giản nhất là Dot Product (simple mechanism), [Luong's Paper: Effective Approaches to Attention-based Neural Machine Translation](https://arxiv.org/pdf/1508.4025.pdf):

$$
\begin{aligned}
score(s_{i - 1}, h_j)  = s^\top_{i - 1} h_j
\end{aligned} 
$$

### Giải thích 1 cách đơn giản hơn

1. Bài toán: bạn có 1 tập dữ liệu với đầu vào mô hình seq2seq là các input: $x_1, x_2, x_3, ... x_m$, đầu ra là các output $y_1, y_2, y_3, ... y_n$ với $n,m\in\mathbb{N}$ 

2. Với cách tiếp cận encoder-decoder thông thường (chưa có attention), thông tin của input sẽ được encode vào 1 context vector với độ dài cố định từ output của layer cuối cùng của encoder

$$
\begin{aligned}
h_1 = Encoder(x_1, x_2, x_3, ...)
\end{aligned} 
$$

còn với mô hình sử dụng thêm cơ chế __Attention__, các output của từng cell của encoder đều được sử dụng 

$$
\begin{aligned}
h_1, h_2, h_3, ... = Encoder(x_1, x_2, x_3, ...)
\end{aligned} 
$$

3. `Alignment model` $e$ hoăcj $a$ đánh giá mức độ liên quan giữa input của encoder với output tiếp theo của decoder. Với $s_0 = 0$, ta có:

$$
\begin{aligned}
e_{11} = a(0, h_1) \\
e_{12} = a(0, h_2) \\
e_{13} = a(0, h_3)
\end{aligned} 
$$

tương tự, với các timestep tiếp theo

$$
\begin{aligned}
e_{21} = a(s_1, h_1) \\
e_{22} = a(s_1, h_2) \\
e_{23} = a(s_1, h_3)
\end{aligned} 
$$

với `alignment model a` là 1`feedforward neural network`

4. Output của alignment model được normalize sử dụng hàm `softmax`, được coi như là trọng số ấn định mức độ tương quan của encoder input tại từng timestep với output hiện tại của decoder. Với

$$
\begin{aligned}
\alpha_{11} = exp(e_{11}) / (exp(e_{11}) + exp(e_{12}) + exp(e_{13})) \\
\alpha_{12} = exp(e_{12}) / (exp(e_{11}) + exp(e_{12}) + exp(e_{13})) \\
\alpha_{13} = exp(e_{13}) / (exp(e_{11}) + exp(e_{12}) + exp(e_{13}))
\end{aligned} 
$$

tương tự

$$
\begin{aligned}
\alpha_{21} = exp(e_{21}) / (exp(e_{21}) + exp(e_{22}) + exp(e_{23})) \\
\alpha_{22} = exp(e_{22}) / (exp(e_{21}) + exp(e_{22}) + exp(e_{23})) \\
\alpha_{23} = exp(e_{23}) / (exp(e_{21}) + exp(e_{22}) + exp(e_{23}))
\end{aligned} 
$$

5. Tiếp tục, các context vector được tổng hợp như công thức bên trên , với cách làm đó, mô hình có khả năng tập trung vào các phần quan trọng của input, $\alpha_{ij}$ có vai trò để reweight lại các output  encoder $h_j$

$$
\begin{aligned}
s_1 = Decoder(c_1) \\
...
\end{aligned} 
$$

### Kết luận

- Qua những phần trên, hi vọng các bạn hiểu hơn về __Attention Mechanism__ là gì và có thể apply cơ chế này vào các bài toán hiện tại (1 số ví dụ mình có nêu bên trên). Mọi ý kiến phản hồi vui lòng comment bên dưới hoặc gửi về địa chỉ: phan.huy.hoang@framgia.com

- Các bạn tham khảo mục `Reference` bên dưới, kèm theo đó là các paper, bài tutorial và code trong 1 số framework phổ biến!

- Các bài blog trong thời gian sắp tới, dựa trên 1 số paper sau, hi vọng nhận được sự đóng góp từ các bạn:

    - [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
    - CRNN-CTC cho bài toán Handwriting Recognition với Attention Mechanism.

### Reference

- Paper: [FEED-FORWARD NETWORKS WITH ATTENTION CAN SOLVE SOME LONG-TERM MEMORY PROBLEMS](https://arxiv.org/pdf/1512.08756.pdf)

- Paper: [NEURAL MACHINE TRANSLATION BY JOINTLY LEARNING TO ALIGN AND TRANSLATE](https://arxiv.org/pdf/1409.0473.pdf)

- Paper: [Attention is all you need](https://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf)

- [NMT Tutotial - Thang Luong](https://github.com/tensorflow/nmt#intermediate)

- Colab: [Attention with Tensorflow](https://colab.research.google.com/github/tensorflow/tensorflow/blob/master/tensorflow/contrib/eager/python/examples/nmt_with_attention/nmt_with_attention.ipynb)

- Medium: [Bahdanau's Attention with Keras](https://medium.com/datalogue/attention-in-keras-1892773a4f22)

- Github: [Bahdanau's Attention with Pytorch](https://github.com/spro/practical-pytorch/blob/master/seq2seq-translation/seq2seq-translation.ipynb)

- Blog: [Bahdanau's Attention with Dynet](https://talbaumel.github.io/blog/attention/)

- Blog: https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html

- [How to compute attention weights](http://ruder.io/deep-learning-nlp-best-practices/)

- [Attention-based sequence in Keras](https://wanasit.github.io/attention-based-sequence-to-sequence-in-keras.html)

- https://skymind.ai/wiki/attention-mechanism-memory-network

- https://www.alibabacloud.com/blog/self-attention-mechanisms-in-natural-language-processing_593968

- https://syncedreview.com/2017/09/25/a-brief-overview-of-attention-mechanism/

- Blog: [Custom Layer in Keras](https://keras.io/layers/writing-your-own-keras-layers/)

- Blog: [Custom layer Keras](https://keunwoochoi.wordpress.com/2016/11/18/for-beginners-writing-a-custom-keras-layer/)

- [Gist - Write custom layer in Keras](https://gist.github.com/abhaikollara/430c0491c851cf0b05a852f1faa805d7)

- [Antirectifier](https://github.com/keras-team/keras/blob/master/examples/antirectifier.py)