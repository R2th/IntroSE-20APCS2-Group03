Trong bài viết trước, mình đã giới thiệu qua về các nhiệm vụ trong xử lý ngôn ngữ tự nhiên cũng như lợi ích của việc sử dụng Deep Learning cho các nhiệm vụ xử lý ngôn ngữ.

Bài viết tiếp theo này được viết dựa trên bài giảng tuần thứ 2 của khóa CS224n, gồm những nội dung chính sau:
1. Giới thiệu về Word2vec
2. Hàm đánh giá trong Word2vec
3. Tối ưu tham số

Việc sử dụng các phương pháp Word embedding cũng đã được mình trình bày rất kỹ ở bài viết [Xây dựng mô hình không gian vector cho Tiếng Việt](https://viblo.asia/p/xay-dung-mo-hinh-khong-gian-vector-cho-tieng-viet-GrLZDXr2Zk0), để việc hiểu nội dung của bài viết này thật tốt, bạn có thể nên xem lại tại [đây](https://viblo.asia/p/xay-dung-mo-hinh-khong-gian-vector-cho-tieng-viet-GrLZDXr2Zk0).

Bài viết này sẽ dựa vào những nội dung đã đề cập trong bài viết nêu ở trên để từ đó đi sâu vào tìm hiểu cách mà word2vec hoạt động.

## Giới thiệu về Word2vec

Nhắc lại một chút về word2vec, word2vec là một phương pháp word embedding chuyển một từ hoặc cụm từ từ không gian 1 chiều cho mỗi từ sang không gian nhiều chiều số thực với số chiều cố định.

Nghĩa của từ được thể hiện thông qua ngữ cảnh là những từ xuất hiện xung quanh nó, được biểu diễn bởi vector trọng số của một mạng neural 1 lớp ẩn, số nút trong lớp ẩn bằng với số chiểu của không gian số thực cần biểu diễn cho mỗi từ.

Khi từ **w** xuất hiện trong một văn bản, ngữ cảnh của nó là tập hợp các từ ở gần nó(trong một cửa sổ có kích thước định trước).

Chúng ta sẽ xây dựng một vector dày đặc là biểu diễn cho mỗi từ, sao cho các từ có nghĩa tương tự nhau(thường xuất hiện trong các ngữ cảnh giống nhau) sẽ có các vector biểu diễn tương tự nhau.
<br><br>
Về Word2vec, Word2vec là một framework cho việc học các vector biểu diễn từ, được Mikolov xây dựng vào năm 2013 dựa trên ý tưởng:
+ Việc tìm ra vector biểu diễn cho mỗi từ sẽ dựa vào một tập hợp lớn các văn bản
+ Mỗi từ trong từ điển sẽ được đại diện bởi một vector số thực
+ Khi đi qua mỗi vị trí **t** của văn bản, một từ sẽ được chọn làm từ trung tâm **c** và các từ ngữ cảnh của **c** được gọi là outside **o**
+ Sử dụng sự tương đồng giữa các vector đại diện cho **c** và **o** để tính toán xác suất để  xuất hiện từ **o** khi đã biết sự xuất hiện của từ **c**(hoặc ngược lại).
+ Sử dụng các phương pháp tối ưu để điều chỉnh các word vector để cực đại xác suất này.

Ví dụ với windows size = 2(lấy ngữ cảnh là 2 từ ở 2 bên từ trung tâm) và tiến hành tính xác suất $P(w_{t+j})|w_t)$

![](https://images.viblo.asia/7969b9ca-fab5-4068-882f-9e97499f8609.png)

Như hình vẽ trên, các từ ngữ cảnh **o** là các từ *problems*, *turning*, *banking*, *crises*. Từ trung tâm là từ *into*.

Trượt cửa sổ này cho đến hết câu, ta được các cặp từ trung tâm và ngữ cảnh của nó, đây sẽ là dữ liệu training cho thuật toán.

![](https://images.viblo.asia/dcaf9f01-136c-4e2e-a293-a4af252df435.png)

## Hàm đánh giá trong Word2vec

Giả sử câu có độ dài **T**, với mỗi vị trí $t = 1,...,T$, dự đoán ngữ cảnh của từ trong cửa sổ trượt có kích thước là **m** khi đã biết được từ trung tâm $w_j$.

![](https://images.viblo.asia/271face5-2231-40ee-a5ec-ae93eef6af47.png)

Hàm lỗi $J(\theta)$ là đối dấu của giá trị trung bình của logarithm $L(\theta)$.(Lý do lấy logarithm $L(\theta)$ là vì phép logarithm giúp ta chuyển từ phép nhân về phép cộng, và phép $logarithm(x)$ luôn đồng biến khi x > 0, dễ thấy tối ưu hóa một tổng tốt dễ hơn nhiều so với 1 tích).

![](https://images.viblo.asia/9f9d2dd1-5405-4dfb-a023-25e21de9423a.png)

Việc tối ưu tham số để cực đại hóa dự đoán tương đương với việc cực tiểu hóa hàm lỗi $J(\theta)$.

Để cực tiểu hóa hàm $J(\theta)$, ta sử dụng 2 vector cho mỗi từ **w**:
+ vector $v_w$ khi w là từ trung tâm
+ vector $u_w$ khi w là một từ trong ngữ cảnh của một từ khác

Sau đó, với mỗi cặp từ trung tâm **c** và một ngữ cảnh của nó, từ **o**, tính $P(w_{t+j}|w_t;\theta)$ theo công thức:

![](https://images.viblo.asia/ea0f2bf8-451f-4de1-a2d7-4a10b5559aff.png)

Công thức trên chính là hàm **softmax**:

![](https://images.viblo.asia/01998d9c-1a1d-47e9-96f1-7491aa9d2563.png)

Trong đó, $x_i$ là đại lượng đánh giá mức độ tương đồng về mặt ngữ nghĩa giữa từ **c** và ngữ cảnh của nó **o** và được đo bằng tích vô hướng giữa 2 vector. Giá trị này càng cao, mức độ tương đương càng lớn.

Hàm softmax ánh xạ một giá trị tùy ý $x_i$ sang một phân phối xác suất. Hàm này thường được sử dụng trong các kiến trúc Deep Learning.

Ta sẽ tính với tất cả các cặp **c** và **o** từ kho dữ liệu:

![](https://images.viblo.asia/25989d21-d970-49d3-b197-cf7fbb25ad71.png)

## Tối ưu tham số

Nhớ rằng, việc training mô hình ở đây được hiểu chính là việc ta đi tối ưu bộ tham số $\theta$ sao cho $J(\theta)$ là nhỏ nhất.

Trong trường hợp này, các giá trị cần tối ưu ở đây chính là các vector đại diện cho các từ trong từ điển.

![](https://images.viblo.asia/32f3f15c-80a7-46f1-a399-760e939182d9.png)

Trong đó, **d** là số chiều vector cần được biểu diễn, **V** là số từ trong từ điển và mỗi từ luôn luôn tồn tại 2 vector(vector khi từ đó là từ trung tâm và khi từ đó là ngữ cảnh của một từ khác). Chúng ta sẽ đi tối ưu các tham số này.

#### Ôn lại một chút về gradient

1. Cơ bản nhất:

![](https://images.viblo.asia/5888b734-f9a5-4ed2-807a-d338ea181b28.png)

2. Chain rule: Nếu $y=f(u)$ và $u=g(x)$ hay $y=f(g(x))$ thì ta có công thức:

![](https://images.viblo.asia/f6e0e298-d49e-4ab7-8c70-f309e56f07a0.png)

Tiến hành tính đạo hàm cho $J(\theta)$ bằng việc tính đạo hàm $log\ p(w_{t+j}|w_t)$ cho tất cả các từ trung tâm cho mỗi cửa sổ với tất cả các từ ngữ cảnh.

#### Gradient Descent

Gradient Descent là một thuật toán để cực tiểu hóa $J(\theta)$.

Ý tưởng cốt lõi của thuật toán này là: Tại mỗi thời điểm tham số có trạng thái ${\theta}_{r} $, tính đạo hàm của $J(\theta)$ với giá trị ${\theta}_{r} $ sau đó tiến hành dịch chuyển 1 khoảng nhỏ ngược chiều với đạo hàm. Việc này sẽ giúp ta tiến gần hơn với giá trị cực tiểu của hàm số.

![](https://images.viblo.asia/5327a632-0554-4e67-9308-bcc5e8271bde.png)

Ví dụ với hàm lồi đơn giản chỉ có 2 tham số, sự dịch chuyển này được diễn ra như hình vẽ dưới đây:

![](https://images.viblo.asia/816304cd-cd04-40e4-b00c-fc5e659bbf05.png)

Việc cập nhật tham số được tính toán theo công thức:

![](https://images.viblo.asia/61be5601-6d3c-4c59-9447-555c3a02e644.png)

**Lưu ý:** khi **learning rate** càng nhỏ, hàm lồi hội tụ càng chậm, nhưng khí để  **learning rate** quá lớn, hàm số có thể phân kì(không thể đạt được trạng thái hội tụ).

**Thuật toán:**

```python
    while True:
        theta_grad = evaluate_gradient(J, corpus, theta)
        theta = theta - learning_rate* theta_grad
```
#### Stochastic Gradient Descent

Tuy nhiên, vấn đề là ở chỗ hàm $J(\theta)$ được tính toán trên tất cả các của sổ trượt trong tập lớn các văn bản nên việc tính đạo hàm của nó là cực kỳ tốn chi phí tính toán và thời gian tính toán cực kỳ nhiều cho 1 lần cập nhật tham số.

Khái niệm **Stochastic Gradient Descent(SGD)** được hình thành để giải quyết vấn đề này. Thay vì tính đạo hàm và cập nhật lại tham số khi tính toán với tất cả các cửa sổ trượt thì ta thực hiện cập nhật lại sau mỗi lần cửa sổ trượt được quét.

**Thuật toán:**

```python
    while True:
        window = sample_window(corpus)
        theta_grad = evaluate_gradient(J, window, theta)
        theta = theta - learning_rate* theta_grad
```

## Suggested Readings:
+ [Word2Vec Tutorial - The Skip-Gram Model](http://mccormickml.com/2016/04/19/word2vec-tutorial-the-skip-gram-model/)
+ [Distributed Representations of Words and Phrases and their Compositionality](http://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf)
+ [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/pdf/1301.3781.pdf)

Bài viết tiếp theo sẽ không phải là bài viết lý thuyết mà chúng ta sẽ tiến hành thực hiện [Assignments 1](http://web.stanford.edu/class/cs224n/assignment1/index.html)- tiến hành cài đặt thuật toán word2vec bằng python để hiểu rõ hơn về cách làm việc của thuật toán này. Bài viết sẽ khả dụng tại [đây](https://viblo.asia/p/natural-language-processing-with-deep-learning-assignment-1-neural-networks-word-vectors-and-their-application-to-sentiment-analysis-WAyK8L2NKxX).