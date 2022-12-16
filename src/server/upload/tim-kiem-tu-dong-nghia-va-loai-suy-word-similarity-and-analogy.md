![](https://cdn-images-1.medium.com/max/1024/1*W6FRoId8E-OUPCgM7nuMNQ.png)

# Glove embedding

Trong xử lý ngôn ngữ tự nhiên, có rất nhiều kỹ thuật có thể ánh xạ từ ngữ sang vector số thực, còn được gọi là embedding từ (word embedding). Có rất nhiều kỹ thuật, đơn giản nhất là sử dụng vector one-hot để đại diện cho từ. Tuy nhiên, kỹ thuật này lại không biểu diễn được độ tương quan giữa các từ.

Một kỹ thuật tốt hơn là Word2Vec, nó biểu diễn 1 từ bằng 1 vector có độ dài cố định, vector này giúp biểu thị tốt hơn độ tương quan cũng như quan hệ loại suy (analogy) giữa các từ. Kỹ thuật này gồm 2 mô hình là Skip-gram và CBOW.

Nếu mọi người đã từng huấn luyện mô hình Skip-gram trong kỹ thuật Word2Vec, hàm mất mát thường được sử dụng là entropy chéo. Hàm mất mát này tuy là phổ biến nhưng đôi khi lại không phải là 1 lựa chọn phù hợp. Trong mô hình Skip-gram, chi phí để đưa ra 1 dự đoán phân phối xác suất của 1 từ là rất lớn. Hàm mất mát entropy chéo dự đoán cuối cùng cho phân phối xác suất có điều kiện trên một lượng lớn các từ hiếm gặp rất có thể sẽ không được chính xác.

Mô hình Glove xuất hiện sau Word2Vec và đã khắc phục được các nhược điểm của Word2Vec.

Chúng ta có thể huấn luyện 1 mô hình embedding từ đầu bằng cách sử dụng các cách tiếp cận bên trên. Nhưng chúng ta cũng có thể tận dụng các phương pháp nhúng đã được huấn luyện trước dựa trên hàng triệu tài liệu.

Ở đây, mình sử dụng luôn các embedding Glove đã được huấn luyện trước với kích thước chiều nhúng là 50, 100, 300 có thể được tải [từ đây](http://nlp.stanford.edu/data/glove.6B.zip)

Mình import các thư viện để tải embedding glove:
```
import numpy as np
from io import BytesIO
import matplotlib.pyplot as plt
from urllib.request import urlopen
from zipfile import ZipFile
```

Tiếp theo là unzip:
```
resp = urlopen('http://nlp.stanford.edu/data/glove.6B.zip')
zipfile = ZipFile(BytesIO(resp.read()))
zipfile.namelist()
```

Sau khi unzip chúng ta được 1 danh sách các file như sau:

```
['glove.6B.50d.txt',
 'glove.6B.100d.txt',
 'glove.6B.200d.txt',
 'glove.6B.300d.txt']
```

Chiều nhúng chính là hậu tố cuối cùng (50, 100, 200, 300) trong tên các file trên. Mình có thể chọn 1 chiều nhúng để thử nghiệm

```
EMBEDDING_DIM = 300
```

Mình tiến hành tải file glove với chiều tương ứng đã chọn:

```
embeddings_file = 'glove.6B.{0}d.txt'.format(EMBEDDING_DIM)
zipfile.extract(embeddings_file)
```

Kiểm tra từ đầu tiên trong file glove và nhúng của nó:
```
with open(embeddings_file, 'r') as fp:
    line = next(fp)
    values = line.rstrip().split()
    token, vec = values[0], [float(embed) for embed in values[1:]]
    print (f"word: {token}")
    print (f"embedding:\n{vec}")
    print (f"embedding dim: {len(vec)}")
```

Chúng ta sẽ thấy như sau:
```
word: the
embedding:
[-0.038194, -0.24487, 0.72812, -0.39961, 0.083172, ...]
embedding dim: 300
```

File này có số dòng bằng số từ vựng, mỗi dòng gồm 1 từ token ở đầu và 300 số thực theo sau và được phân cách bởi dấu cách.

Đến đây, để dễ dàng làm việc hơn với file glove, mình import thư viện `gensim`:
```
import gensim
from gensim.models import KeyedVectors
from gensim.scripts.glove2word2vec import glove2word2vec
```

Mình tiến hành chuyển file nhúng glove sang định sang Word2Vec bằng cách tạo 1 file mới có tên giống file glove và thêm hậu tố `.word2vec`:
```
word2vec_output_file = '{0}.word2vec'.format(embeddings_file)
glove2word2vec(embeddings_file, word2vec_output_file) # (400000, 300)
```

Sau đó, tải nội dung của file vừa tạo và dùng:
```
glove = KeyedVectors.load_word2vec_format(word2vec_output_file, binary=False)
```

Mình có thể kiểm tra 1 số thông tin của file glove như sau:
```
# Số chiều nhúng
glove.vector_size # 300
```

```
# Tất cả các từ trong bộ từ vựng
glove.index2word
```

```
# Vector nhúng của từ 'the'
glove.word_vec('the')
```

```
# Vector nhúng của tất cả các từ
glove.vectors
```

Tiếp theo chúng ta định nghĩa lớp TokenEmbedding để nạp embedding glove ở trên:

```
class TokenEmbedding:
    def __init__(self, glove):
        self.tokens, self.vectors = self.load_embedding(glove)
        self.unk_idx = 0
        self.token_to_idx = {token: idx for idx, token in enumerate(self.tokens)}

    def load_embedding(self, glove):
        tokens = np.array(['<unk>'] + glove.index2word)
        vectors = torch.zeros((len(glove.index2word) + 1, glove.vector_size))
        vectors[1:] = torch.tensor(glove.vectors)
        return tokens, vectors

    def __getitem__(self, tokens):
        indeces = [self.token_to_idx.get(token, self.unk_idx) for token in tokens]
        vectors = self.vectors[np.array(indeces)]
        return vectors

    def __len__(self):
        return len(self.tokens)
```

```
glove_6b300d = TokenEmbedding(glove=glove)
```

```
glove_6b300d.token_to_idx['beautiful'], glove_6b300d.tokens[3367]
# beautiful, 3367
```

# Tìm các từ đồng nghĩa

Mình lập trình thuật toán tìm các từ đồng nghĩa bằng độ tương tự cosin giữa 2 vector.

Tại đây mình sử dụng lại logic tìm kiếm k láng giềng gần nhất ($k$-nearest neighbors) để tìm kiếm các loại suy và gói gọn trong 1 hàm knn:
```
def knn(W, x, k):
    # Add 1e-9 for numerical stability
    cos = torch.mv(W, x.reshape(
        -1,)) / (torch.sqrt(torch.sum(W * W, axis=1) + 1e-9) * torch.sqrt(
            (x * x).sum()))
    _, topk = torch.topk(cos, k=k)
    return topk, [cos[int(i)] for i in topk]
```

Kế tiếp, chúng ta tìm kiếm các từ đồng nghĩa nhờ tiền huấn luyện thực thể vector từ embedding glove.

```
def get_similar_tokens(token, k, embed):
    topk, cos = knn(embed.vectors, embed[[token]], k + 1)
    for i, c in zip(topk[1:], cos[1:]):  # Exclude the input word
        print(f'cosine sim={float(c):.3f}: {embed.tokens[int(i)]}')
```

Chúng ta thử tìm kiếm với 3 từ cùng nghĩa với từ `chip`:
```
get_similar_tokens('chip', 3, glove_6b300d)
```

Được kết quả như sau:

```
cosine sim=0.791: chips
cosine sim=0.555: semiconductor
cosine sim=0.550: intel
```

Tìm các từ đồng nghĩa với từ `baby` và được kết quả như sau:
```
get_similar_tokens('baby', 3, glove_6b300d)
```
```
cosine sim=0.732: babies
cosine sim=0.671: newborn
cosine sim=0.662: infant
```

# Tìm kiếm các loại suy

Bên cạnh việc tìm kiếm các từ đồng nghĩa, ta cũng có thể sử dụng các vector từ đã tiền huấn luyện để tìm kiếm các loại suy giữa các từ

Ví dụ, “man”:“woman”::“son”:“daughter” là một loại suy, “man (nam)” với “woman (nữ)” giống như “son (con trai)” với “daughter (con gái)”

Bài toán tìm kiếm loại suy có thể được định nghĩa như sau: với bốn từ trong quan hệ loại suy  $a:b::c:d$ , cho trước ba từ $a$, $b$ và $c$ , ta muốn tìm từ $d$

Giả sử, vector từ cho từ $w$ là $vec(w)$. Để giải quyết bài toán loại suy, ta cần tìm vector từ gần nhất với vector là kết quả của $vec(c)$ + $vec(b)$ − $vec(a)$.

```
def get_analogy(token_a, token_b, token_c, embed):
    vecs = embed[[token_a, token_b, token_c]]
    x = vecs[1] - vecs[0] + vecs[2]
    topk, cos = knn(embed.vectors, x, 1)
    return embed.tokens[int(topk[0])]  # Remove unknown words
```

Kiểm tra quan hệ loại suy “nam giới - nữ giới”:
```
get_analogy('man', 'woman', 'son', glove_6b300d) # 'daughter'
```

Loại suy “thủ đô-quốc gia”: từ “beijing” với từ “china” tương tự như từ “tokyo” với từ nào? Đáp án là “japan”.

```
get_analogy('beijing', 'china', 'hanoi', glove_6b50d) # 'vietnam'
```

# Kết luận

- Các vector từ được tiền huấn luyện trên kho ngữ liệu cỡ lớn thường được áp dụng cho các tác vụ xử lý ngôn ngữ tự nhiên.

- Ta có thể sử dụng các vector từ được tiền huấn luyện để tìm kiếm các từ đồng nghĩa và các loại suy.

# Tham khảo
[How to Compute Word Similarity — A Comparative Analysis](https://towardsdatascience.com/how-to-compute-word-similarity-a-comparative-analysis-e9d9d3cb3080)

[Find Text Similarities with your own Machine Learning Algorithm](https://towardsdatascience.com/find-text-similarities-with-your-own-machine-learning-algorithm-7ceda78f9710)

[Dive into Deep Learning](http://d2l.ai)