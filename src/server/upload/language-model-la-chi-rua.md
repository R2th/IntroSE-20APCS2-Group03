# Giới thiệu
Hi guys, hôm nay mình sẽ nói về "mô hình ngôn ngữ" (language model). Chắc hẳn các bạn đã từng gõ chữ trên điện thoại và biết tính năng gợi ý từ như ảnh này nhỉ:

![](https://images.viblo.asia/ed508ab6-5ffe-4502-9430-8c0753c80386.png)

Tính năng ấy cũng có trong các công cụ tìm kiếm chẳng hạn như google, bing, ...

![](https://images.viblo.asia/edd07d1c-8ef6-4a96-8fb1-39e1122fff6f.jpg)

Nó hoạt động bằng cách đưa ra những chữ hay từ thường xuyên xuất hiện khi ta nhập vào một chữ hay từ nào đó.

Để tính được sự thường xuyên ấy thì người ta sử dụng **Language Model** đó. Để hiểu hơn về "mô hình ngôn ngữ" cũng như cách mà nó giúp gợi ý từ thì ta đi qua khái niệm trước tiên nhé.
# Khái niệm
Language Model (LM) là một mô hình đại diện cho những *kiến thức đã biết* về một ngôn ngữ, những *kiến thức* ấy có thể là những từ, chuỗi các từ **có thể có** hay **mức độ thường xuyên mà chúng xuất hiện**.

LM được chia thành ba nhóm đó là Statistical LM (Count-based), Neural Network LM (Continuous-space) và Knowledge-based LM, Ngoài ra còn một số LM khác chẳng hạn như KenLM, ...

Statistical LM được sử dụng phổ biến nhất từ trước tới giờ nên mình sẽ nói về nó trước nhé.
# Statistical Language Models (Count-based)
Những mô hình thuộc nhóm này đều dựa trên việc đếm tần suất xuất hiện của từng từ hay chuỗi, do đó nó cần một lượng dữ liệu lớn, càng nhiều càng tốt.

Statistical LM là phân bố xác suất $P(W), W \in V^+$ trên tập hợp tất cả các chuỗi (câu văn) $V^+$ có trong tập dữ liệu thuộc bộ từ vựng $V$ của một ngôn ngữ nào đó.

Khi đó, $P(W) \ge 0$ và $\sum_{W  \in V^+} P(W) = 1$.

Trong đó, xác suất của một chuỗi có độ dài $K$ được tính như sau:

$$
\begin{aligned}
P(w_1w_2...w_K) &= P(w_1)P(w_2|w_1)...P(w_K|w_1w_2...w_{K-1}) \\
&= \prod_{k=1}^K P(w_k|w_1w_2...w_{k-1})
\end{aligned}
$$

$P(w_k|w_1w_2...w_{k-1})$ là xác suất của từ $w_k$ khi đã biết chuỗi $w_1w_2...w_{k-1}$ và được tính bằng cách đếm chuỗi như sau:

$$
P(w_k|w_1w_2...w_{k-1}) = \frac{count(w_1w_2...w_k)}{count(w_1w_2...w_{k-1})}
$$

Tuy nhiên, nếu $K$ càng lớn thì tần suất xuất hiện của chuỗi $K$ từ ấy càng nhỏ và sẽ có trường hợp tần suất xuất hiện của chuỗi $K-1$ từ dẫn trước là lớn, khiến cho xác suất $P(w_k|w_1w_2...w_{k-1})$ gần như bằng 0, dẫn tới việc chuỗi $K$ từ ấy không bao giờ xảy ra (nói đơn giản hơn là chuỗi ấy không có mặt trong tập huấn luyện). Giải pháp để giảm thiểu vấn đề này là thay vì tính theo $K-1$ thì ta chỉ chọn $N-1$ từ dẫn trước thôi, và thế là ta có **N-gram Language Models**:

$$
P(w_k|w_1w_2...w_{k-1}) = P(w_k|w_{k - N + 1}w_{k-N+2}...w_{k-1})
$$

## N-gram Language Models
Như vậy ta sẽ có xác suất của một chuỗi là như sau:

$$
P_N(W) = \prod_{k=1}^K P(w_k|w_{k - N + 1}w_{k-N+2}...w_{k-1})
$$

Thông thường người ta sẽ chọn $N=1,2,3$

Người ta còn gọi mô hình này với cái tên khác là **(N-1)-order Markov Models**.

Nhưng mà, mô hình này có các nhược điểm như sau:

* **Sai điều kiện về sự phụ thuộc**: Việc chuyển từ $K-1$ về $N-1$ ngay từ đầu đã không đúng rồi.
* **Bão hoà** (Saturation): Data càng nhiều thì model sẽ càng tốt nhưng sẽ đến lúc thêm data *khác* thì phân bố xác suất không thay đổi. Điều này xảy ra với bigram, trigram khi số từ đạt tới hàng tỷ.
* **Thiếu tính tổng quát hoá**: Từng thể loại, chủ đề, phong cách thì sẽ có các kết hợp câu, từ khác nhau. Do đó với các nguồn dữ liệu khác nhau thì chất lượng mô hình sẽ khác nhau, nhất là khi tập train với test khác kiểu viết thì performance của mô hình sẽ rất tệ.
* **Thưa thớt dữ liệu** (Data sparseness): Khi thiếu dữ liệu hoặc dữ liệu bị mất thì sẽ dẫn về lại vấn đề chuỗi không có mặt trong tập train mà có mặt trong tập test khiến xác suất bằng 0, N-gram chỉ giảm hiện tượng này chứ chưa giải quyết được hẳn.

## Structured Language Models

Giả sử chúng ta có câu sau: "The dogs chasing the cat bark". Ta sẽ thấy rằng xác suất của trigram $P(\text{bark}| \text{the cat})$ sẽ rất thấp vì một mặt là mèo không kêu "gâu gâu", mặt khác là từ "bark" là số nhiều trong khi "the cat" là số ít (sai ngữ pháp). Điều này dẫn tới mô hình N-gram hoạt động không tốt, ta cũng có thể tăng N để giải quyết vấn đề này nhưng như thế nó sẽ gặp lại vấn đề của *Statistical LM*. Do đó, ta cần áp dụng cấu trúc phân cấp (hierarchical structure) của câu văn vào mô hình, những models được áp dụng đó người ta gọi là **structured language models**.

![](https://images.viblo.asia/56c2b83e-71a4-4424-8f23-44beda74a1c4.png)

Thông thường các models dạng này sử dụng một cái gọi là *statistical parser* đã được train để làm *hierarchical structure*.

Một số parser được sử dụng cùng với N-gram LM:

* [Grammatical Trigrams](https://aaai.org/Papers/Symposia/Fall/1992/FS-92-04/FS92-04-014.pdf)
* [Statistical Parsing with a CFG and Word Statistics](https://pdfs.semanticscholar.org/6619/a18b6d17432ba22770c4074cd30eced02681.pdf)
* [TWO DECADES OF STATISTICAL LANGUAGE MODELING: WHERE DO WE GO FROM HERE?](https://www.cs.cmu.edu/~roni/papers/survey-slm-IEEE-PROC-0004.pdf)
* [Robust Probabilistic Predictive Syntactic Processing](https://arxiv.org/pdf/cs/0105019.pdf)
* [RICHER SYNTACTIC DEPENDENCIES FOR STRUCTURED LANGUAGE MODELING](https://arxiv.org/pdf/cs/0110015.pdf)
* [Language modeling using efficient best-first bottom-up parsing](https://ieeexplore.ieee.org/document/1318492)
* [Language modeling using a statistical dependency grammar parser](http://users.umiacs.umd.edu/~mharper/papers/ASRU2003.pdf)
* [Head-Driven Parsing for Word Lattices](https://www.aclweb.org/anthology/P04-1030)
# Knowledge Based Models
Những mô hình thuộc nhóm này được xây dựng theo những kiến thức đã được con người (cụ thể là các chuyên gia về ngôn ngữ học) tích luỹ, nào là cú pháp, các cụm từ, các thì, ... Nếu những kiến thức này được định nghĩa bằng các luật thì mô hình sẽ được gọi là *rule-based model*.

Mô hình này có ưu điểm là không yêu cầu một chút dữ liệu nào để huấn luyện.

Tuy nhiên, mô hình kiểu này cũng có nhược điểm là:

* **Khó xây dựng**: Do yêu cầu về kiến thức chuyên sâu về ngôn ngữ học mà lại thể hiện chúng dưới dạng mô hình và thuật toán thì rất tốn thời gian và chi phí.
* **Chỉ nhận diện được các từ thuộc intra-grammatical**: Intra-grammatical có thể hiểu như là văn viết (formal), trái ngược với extra-grammatical là văn nói (informal). Nếu học ngôn ngữ thì ngôn ngữ nào cũng có sự khác biệt giữa văn nói và văn viết.
* **Thiếu tính tần số** (Lack of frequencies): Độ phổ biến của câu từ đóng vai trò không kém quan trọng, chẳng hạn như "How to recognize speech" và "How to wreck a nice beach" đều đúng ngữ pháp nhưng câu đầu đúng hơn vì phổ biến hơn và câu sau có nghĩa hơi kì lạ.
* **Chỉ phân biệt được hợp lý hay không**: Do cấu trúc của mô hình nên kết quả của mô hình này đối với một câu là có hợp lý (hay đúng ngữ pháp) của một ngôn ngữ hay không chứ không có dự đoán hay gợi ý được từ.

# Neural Network Language Models (Continuous-space)

Loại mô hình ngôn ngữ này được giới thiệu để xử lý vấn đề **thưa thớt dữ liệu** (data sparseness) của *N-gram Language Models*. Mô hình kiểu này được chia làm hai dạng là *Feed Forward Neural Networks (FNNs)* và *Recurrent Neural Networks (RNNs)*.

Mọi mô hình kiểu này đều có input và output là:

* **Input**: Word Embedding hay Character Embedding, là chuyển từ hay ký tự sang vector số thực trong một không gian $n$ chiều (dimensions) cố định
* **Output**: Với mỗi output unit là xác suất của một từ hay ký tự khi đã biết context. Context là gì thì còn tùy thuộc vào dạng mô hình sử dụng.

Đối với dạng *FNNs*, **context** là một chuỗi có độ dài cố định và là những từ hay ký tự đúng trước ký tự đang xét, nghĩa là giống như N-gram Language Models vậy đó.

Đối với dạng *RNNs*, **context** như của *FNNs* nhưng có độ dài không cố định và dạng này giúp giải quyết vấn đề *Limited context* của *FNNs*, tức là không còn là N-gram nữa và các nhược điểm của N-gram Language Models không còn nữa.

# Tổng kết
Như vậy, mô hình ngôn ngữ đại diện cho những kiến thức đã biết về một ngôn ngữ, những kiến thức đó là **sự hợp lý** về mặt cấu trúc, cú pháp hay **sự phổ biến** của câu từ.

Mô hình ngôn ngữ ngày nay được sử dụng khá phổ biến và tùy thuộc vào mục đích sử dụng mà ta chọn loại mô hình ngôn ngữ phù hợp, chẳng hạn như trong *nhận diện giọng nói*, *nhận diện chữ viết tay* hay các bài toán có đầu ra là một chuỗi các từ hay ký tự có sử dụng *Connectionist Temporal Classification* thì mô hình ngôn ngữ được dùng để "rescore" trong giải thuật *beam search decoding* như ở [đây](https://viblo.asia/p/gioi-thieu-ve-connectionist-temporal-classification-ctc-phan-2-924lJWdN5PM#_beam-search-decoding-with-language-model-re-scoring-6).
# Tham khảo
1. [http://people.ee.ethz.ch/~spr/publications/Beutler:07_diss.pdf](http://people.ee.ethz.ch/~spr/publications/Beutler:07_diss.pdf)
2. [https://web.stanford.edu/~jurafsky/slp3/3.pdf](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
3. [https://medium.com/syncedreview/language-model-a-survey-of-the-state-of-the-art-technology-64d1a2e5a466](https://medium.com/syncedreview/language-model-a-survey-of-the-state-of-the-art-technology-64d1a2e5a466)