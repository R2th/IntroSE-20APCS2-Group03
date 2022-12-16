# 1. Sơ bộ về Self-Attention và Transformer
## 1.1 Self Attention
![alt ](https://miro.medium.com/max/1948/1*oSK132KAPqkMeKaGC9R1Qg.png)  ![alt](https://miro.medium.com/max/2176/1*fL8arkEFVKA3_A7VBgapKA.gif  "aaaa")

Trong ví dụ trên, đầu vào bao gồm hai câu: "the rabbit quickly hopped" và "the turtile slowly crawled". **[SEP]** là token đặc biệt ngăn cách giữa các câu, **[CLS]** là token được thêm vào đầu câu sử dụng cho classification tasks. Hình ảnh biểu diễn cho mỗi từ ở bên trái với những từ ở bên phải sẽ có trọng số nhất định. Độ đậm của màu thể hiện độ lớn của attention weight. Tuy nhiên có một vài từ có trọng số attention weight cao hơn những từ khác v.d. rabbit và hopped.
Self Attention có thể được biểu diễn bằng công thức dưới đây:

![](https://pic3.zhimg.com/80/v2-645f1ab1008160089dace9a448c84a4e_720w.png)

Ảnh phía dưới có thể giúp chúng ta dễ hiểu hơn:
![The Illustrated Transformer – Jay Alammar – Visualizing machine learning  one concept at a time.](https://jalammar.github.io/images/t/self-attention-matrix-calculation-2.png)
$d_k$ là số chiều của vector K, $Q, K, V$ là Query, Key và Value, là những vectors được tạo bởi phép nhân ma trận của X với, $W^q, W^k, W^v$ tương ứng.

![Understand Self-Attention in BERT Intuitively | by Xu LIANG | Towards Data  Science](https://miro.medium.com/max/1162/0*_nyMI3ri4aUTxlEw.png)
## 1.2 Positional Embedding
Bởi vì mô hình không có thông tin về vị trí ở mỗi từ trong câu, nên positional embedding được đưa ra để lấy thông tin đó.
![python - Positional Encoding for time series based data for Transformer DNN  models - Stack Overflow](https://i.stack.imgur.com/PxeeE.png)
## 1.3 Transformer
Transformer được giới thiệu tại hội nghị NIPS vào năm 2017 với tiêu đề là Attention is All You Need. Nó sử dụng kiến trúc encoder-decoder và được sử dụng trong dịch máy.
![Transformers In NLP | State-Of-The-Art-Models](https://cdn.analyticsvidhya.com/wp-content/uploads/2019/06/Screenshot-from-2019-06-17-19-53-10.png)
### 1.3.1 Transformer Encoder
![Transformers - "Người máy biến hình" biến đổi thế giới NLP](https://images.viblo.asia/a7781efa-223e-4c94-93a6-48b725c34ecd.png)
Như hình minh họa, đầu vào của Encoder là word vectors và Positional Encoder, sau đó đi qua Self Attention và Layer Norm, và cuối cùng đi qua Feed Forward Network. Ngoài ra, có 2 lớp Skip Connection trong mỗi Encoder. Kiến trúc của 1 lớp Encoder được lặp lại 6 lần cuối cùng ta được thông tin mã hóa của câu.
### 1.3.2 Transformer Decoder

![Transformers - "Người máy biến hình" biến đổi thế giới NLP](https://images.viblo.asia/8c3008f3-c9de-4fd0-8513-d209db6d6897.png)

Nửa bên phải của hình trên là kiến trúc của Transformer Decoder. Attention thứ nhất của Decoder thì cũng tương tự như trong Encoder, ngoại trừ việc có thêm Mask tương ứng với vị trí từ hiện tại (khi dự đoán vị trí thứ i, thì đầu vào là embedding của vị trí thứ i-1 và những vị trí phía trước nó được định nghĩa bới Mask). Attention thứ 2 cũng có kiến trúc tương tự ngoại trừ việc đầu vào để tính Q, K, V là khác biệt, Q được tính từ đầu ra của decoder, và K, V được tính từ đầu ra của Encoder. Cuối cùng sau 6 Decoders, kết quả dịch của mỗi từ sẽ được tính từ linear layer và softmax.
![](https://jalammar.github.io/images/t/transformer_decoding_2.gif)
# 2. Detection Transformer (DETR)
## 2.1 Kiến trúc của DETR
Về cơ bản DETR bao gồm 3 thành phần chính là: Transformer Encoder, Transformer Decoder và Feed-Forward Network (FFN). Những phương pháp detection truyền thống như là Anchor-base method thì dựa trên việc hiệu chỉnh category classification và bounding box coefficient regression trên Anchors được định nghĩa từ trước. Vì Transformer thực chất biến đổi chuỗi nên DETR có thể coi như là quá trình biến đổi từ image sequence đến Object Query.

![](https://media.geeksforgeeks.org/wp-content/uploads/20200601074340/detr-arch.jpg)
## 2.2 DETR Encoder
Như chúng ta có thể thấy ở hình 2, DETR đầu tiên sử dụng một Backbone (như là ResNet, ViT,..) để extract feature ta thu được feature có chiều là $C \times H \times W$ sau đó $1 \times 1$ convoluion được sử dụng  để giảm số chiều của C giảm xuống còn d, ta được feature mới có chiều là $d \times H \times W$.
Sau khi giảm chiều của feature, feature sẽ được thêm Spatial Positional Encoding rồi sau có đưa vào Encoder.
![DETR | Object Detection | Facebook AI | VisionWizard](https://miro.medium.com/max/1400/1*rJ5rPa5JHVy297wbJ23Atg.png)
## 2.3 DETR Decoder 
Cấu trúc của DETR Decoder về cơ bản cũng tương tự như Transformer, khác biệt là Decoder decode N objects một cách song song và cách thêm Positional Encoding ở Decoder.
DETR Decoder có 2 inputs: 1 là đầu ra của Encoder, 2 là Object Query (query_embed ở trong code). Ta sẽ đi sâu hơn vào Object Query.
Trong code, query_embed được khởi tạo như sau:
```python3
self.query_embed = nn.Embedding(num_queries, hidden_dim)
```
num_query là số target queries được định nghĩa từ trước, là 100 ở trong code. num_query ở đây có vai trò tương tự như số anchor trong bài toán anchor-based object detection truyền thống, hay ta cũng có thể liên tưởng đến max length ở trong bài toán dịch máy. Object Query cũng được tác giả gọi là learned positional embedding. Ta có thể hiểu đơn giản là dựa vào features đã được encode bởi DETR Encoder, DETR Decoder sẽ convert 100 queries thành 100 targets.
Cuối cùng, class prediction được đưa ra thông qua lớp Linear và box prediction được đưa ra bởi MLP.
 ```python3
#forward
hs = self.transformer(self.input_proj(src), mask, self.query_embed.weight, pos[-1])[0]
outputs_class = self.class_embed(hs)
outputs_coord = self.bbox_embed(hs).sigmoid()
out = {'pred_logits': outputs_class[-1], 'pred_boxes': outputs_coord[-1]}
```
## 2.4 Loss Function
DERT sử dụng thuật toán Hungarian để thực hiện **bipartite matching** giữa N object predicts và ground truth boxes ở đây ta có thể liên tưởng tới phép assigment trong bài toán object detection. Giả sử rằng là N sẽ lớn hơn số object có trong ảnh ta sẽ padding tập ground truth với $\emptyset$ (no object). Để tìm bipartite matching giữa 2 tập với cost nhỏ nhất:

![Screenshot from 2022-08-04 08-46-49.png](https://images.viblo.asia/14736390-3d20-4932-8a8c-44663d40f27e.png)

Cost của mỗi cặp predict box và ground truth box $\mathcal{L}_{match}(y_i,\hat{y}_{\sigma(i)})$ được định nghĩa bằng công thức dưới đây:

![Screenshot from 2022-08-04 08-45-58.png](https://images.viblo.asia/0eca2b7d-aa70-4502-966d-c1e22327d64e.png)

Trong đó:
- $1_{\{c_i\ne\emptyset\}}$ là một hàm mà bằng 1 khi $c_i\ne\emptyset$, ngược lại thì bằng 0;
- $\hat{p}_{\sigma(i)}(C_i)$ là xác suất dự đoán của class $c_i$ với index $\sigma(i)$;
- $\hat{b}_{\sigma(i)}$ là bounding box dự đoán với index $\sigma(i)$.

Sau khi có optimal match ($\hat{\sigma}$) giữa predictions boxes và image object ta sẽ tính được loss dựa trên optial match đó.
![Screenshot from 2022-08-04 08-48-02.png](https://images.viblo.asia/2fc6625b-a720-46a1-aa02-8b5f657169c0.png)
## 2.5 Experiment
Sau đây là bảng kết quả thí nghiệm so sánh giữa DETR khi so sánh với RetinaNet và Faster-RCNN.
![Screenshot from 2022-08-04 08-50-12.png](https://images.viblo.asia/851415e8-6797-4669-972e-21b8dda88c0c.png)
# 3. Personal comment
Có thể kết quả của DETR chưa thật sự ấn tượng nhưng nó là một hướng tiếp cận mới so với hướng tiếp cận CNN truyền thống và đầy hứa hẹn ở phía trước. Sau DETR cũng có rất nhiều phiên bản cải tiến như: DN-DETR,  Dynamic-DETR, DAB-DETR...Nó cũng là tiền để để các tác giả cải tiến với những phiên bản có độ chính xác cao nhất hiện tại như: DINO, Mask-DINO...Trong bài viết tiếp theo mình sẽ giới thiệu một phiên bản cải tiến khá quan trọng của DETR là Deformable DETR.
# Trích dẫn
Attention is all you need: https://arxiv.org/pdf/1706.03762.pdf

DETR: https://arxiv.org/pdf/2005.12872.pdf

Review — DETR: End-to-End Object Detection with Transformers: https://sh-tsang.medium.com/review-detr-end-to-end-object-detection-with-transformers-c64977be4b8e