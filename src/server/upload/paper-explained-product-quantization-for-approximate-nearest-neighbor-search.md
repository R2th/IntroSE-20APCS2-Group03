- __Keyword__: Product Quantization,  Approxiamate Nearest Neighbor Search, Similar Search, Deep Binary Hashing,  Polysemous Codes, Binary Hash Codes

- Kĩ năng đọc hiểu paper không chỉ là 1 kĩ năng cần thiết đối với những người làm nghiên cứu hay researcher mà còn đối với những người đang làm về machine learning, deep learning nói chung: machine learning engineer, data analysis, data scientist, ... Đó cũng là một cách để cập nhật được các kiến thức mới; trau dồi, củng cố thêm các kiến thức nền tảng, nhất là trong thời kì phát triển nở rộ của machine learning và deep learning hiện nay. 

- Đây cũng là bài blog đầu tiên của mình trong loạt bài Paper Explained nhằm giải thích và implement lại các thuật toán, các phương pháp với code kèm theo. Tất nhiên, trong quá trình viết bài blog này, mình có tham khảo từ khá nhiều nguồn, có thể còn có những sai sót, mọi ý kiến phản hồi hay thắc mắc, các bạn vui lòng comment bên dưới bài post hoặc gửi mail về địa chỉ: phan.huy.hoang@framgia.com. Rất cảm ơn các bạn!

- Papers
    - [Product Quantization](https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf)
    - [A Survey of Product Quantization](https://www.jstage.jst.go.jp/article/mta/6/1/6_2/_pdf/)

### Giới thiệu chung về ANN Search

- Lấy ví dụ Flickr, 1 trang mạng xã hội chia sẻ ảnh nổi tiếng trên thế giới, như trong bài blog trước mình cũng đã có giới thiệu về [Semantic Search](https://viblo.asia/p/mo-phong-he-truy-van-hinh-anh-voi-machine-learning-semantic-search-phan-1-L4x5xwpalBM), có một chức năng khá thú vị là tìm kiếm các ảnh tương đồng. Về bản chất, mỗi ảnh đều đã được biểu diễn bởi 1 vector N chiều. Nhiệm vụ bây giờ là tìm kiếm các vector tương đồng trên toàn bộ tập dữ liệu với các metric quen thuộc như: cosine, euclid, .. Câu chuyện sẽ không có gì đáng nói nếu tập dữ liệu của bạn là nhỏ, nhưng với tập dữ liệu đến [hàng tỉ ảnh](https://thenextweb.com/socialmedia/2011/08/05/flickr-hits-6-billion-total-photos-but-facebook-does-that-every-2-months/) của Flickr, vấn đề sẽ trở nên nan giải hơn rất nhiều. Việc tìm kiếm và so sánh lần lượt từng vector trên toàn bộ tập dữ liệu tỏ ra không khả thi, ..

- Trong khoảng 1 thập niên gần đây, rất nhiều các phương pháp về ANN search được đề xuất, điển hình như 1 số phương pháp quen thuộc như: LSH (Localy Sensitive Hasing), tree-based method, .. Tuy nhiên, các phương pháp đó tỏ ra khá hiệu quả với tập dữ liệu vừa và nhỏ, số lượng có thể lên đến hàng triệu sample, nhưng đối với tập dữ liệu lớn và rất lớn lên đến hàng tỉ ảnh như của Flickr thì hoàn toàn không đáp ứng được về mặt thời gian và chi phí lưu giữ.

- Cùng lúc đó, 1 số phương pháp tìm kiếm lân cận được đề xuất liên quan đến việc sử dụng __short-codes__. Trong đó, 2 phương pháp về __short-code-based__ đáng chú ý là: [Binary-based](https://www.iis.sinica.edu.tw/~kevinlin311.tw/cvprw15.pdf) và [PQ-based (Product-Quantization-based)](https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf). Phương pháp __Binary-based__ ánh xạ vector đầu ra (có thể thu được sau khi cho ảnh qua 1 mạng CNN để thu được feature vector) sang một vector nhị phân (N chiều, mỗi phần tử được biểu diễn bởi 2 giá trị 0 hoặc 1). Phương pháp __Binary-based__ tỏ ra khá hiệu quả với thời gian tính toán khá nhanh, trong khi đó, phương pháp PQ-based tỏ ra chính xác hơn với cùng một chi phí bộ nhớ. Phương pháp __PQ-based__ mình sẽ đề cập kĩ hơn bên dưới, __Binary-based__ method sẽ được mình đề cập trong bài blog tiếp theo.

### Vector Quantization

- Ý tưởng ban đầu sử dụng __Vector Quantization__. Cụ thể, thay vì tìm kiếm trên 1 tỉ bức ảnh thì ta phân cụm với k-means được 1 triệu cluster chẳng hạn, mỗi cluster ứng với 1 centroid. Khi thực hiện tìm kiếm với query là một bức ảnh, sau khi thực hiện feature engineering thu được 1 vector N chiều, vector đó sẽ được so sánh với các centroid để tìm ra centroid gần nhất. Từ đó, chỉ cần so sánh các ảnh trong cluster đó với query vector. Kĩ thuật này dùng để xấp xỉ 1 vector bằng 1 vector khác, trong trường hợp này là centroid, hay kĩ thuật __Vector Quantization__. Tuy nhiên, việc phân cụm ra 1 triệu cluster và so sánh trong cluster gần nhất vẫn rất tốn thời gian, 1 kĩ thuật đơn giản hơn được đề xuất gọi là __Product Quantization__. __Product Quantization__ là một trong những phương pháp tỏ ra khá hiệu quả trong việc handing với tập dữ liệu lớn (large-scale data). Mỗi vector sẽ được chia nhỏ (split) và được ánh xạ thành các `short code` hoặc `PQ-code`, khi phân cụm ta tiến hành ngay trên tập vector đã được chia nhỏ đó (sub-vectors). Theo [code.flickr.net](https://code.flickr.net/2017/03/07/introducing-similarity-search-at-flickr/) và [Forum Machine Learing cơ bản](https://machinelearningcoban.com/2017/06/22/qns1/#-similarity-search)

### Product Quantization

- Trước khi đi sâu vào phân tích thuật toán với code kèm theo, trong paper về Product Quantization của mình, tác giả __Jegou__ có miêu tả:
1. __PQ can be used to compress high-dimensional feature vector__: compress ở đây không liên quan đến dimension reduction (giảm chiều dữ liệu). Về bản chất, PQ thực hiện chia nhỏ tập vector thành tập các sub-vectors, sau đó thực hiện lưu giữ các index centroids, ánh xạ sang short-codes và khoảng cách từ `query-vector` tới tập `PQ-code` được tính toán và lưu giữ vào 1 bảng đối chiếu (look-up table)
2.  __The distance between an original vector and a PQ-encoded code can be efficiently approximated__: trong paper, tác giả đề cập việc tính toán xấp xỉ vector gốc ban đầu với short-codes hay Asymmetric distance computation, từ đó xây dựng bảng đối chiếu để tiến hành query sau này.
3. __Fast search system can be built by combining PQ-encoding and inverted indexing__: bằng việc sử dụng một bảng đối chiếu (look-up table) để xác định centroids cho từng sub-vectors. Từ đó, tác giả đề cập tới __IVFADC (inverted file system with the asymmetric distance computation)__ để tiến hành cải thiện tốc độ truy vấn.

### Encoding

- Với 1 vector D chiều $x \in \mathbb{R}^D$, ta tiến hành chia nhỏ vector thành M sub-vectors:

![Imgur](https://i.imgur.com/tyVJpsE.png)

với sub-vector thứ $m$ được kí hiệu: $x^m \in \mathbb{R}^{D/M}$, $m \in \{1, ..., M\}$.

- Tiếp theo, ta `encode` vector dưới dạng các `short-codes`. Từng `sub-codebook` trên tập `sub-vector` thứ m được định nghĩa: $C^m = \{c^m_k\}^K_{k=1}$ với $m \in \{1,...,M\}$ và ta gọi mỗi $c^m_k \in \mathbb{R}^{D/M}$ là 1 `sub-codeword`. Số lượng `sub-codewords K` của từng `sub-codebook` ở đây là tham số được xác định bởi người dùng, chính là số lượng cluster khi thực hiện k-means trên tập `sub-vector` thứ $m$. Như vậy, ta chạy k-means $M$ lần ứng với từng tập `sub-vector` thứ $m$.

- 1 vector đầu vào $x$ được `encode` như sau: 1 `sub-encoder` ứng với `sub-vector` thứ $m$ của $x$ được định nghĩa: $i^m : \mathbb{R}^{D/M} \to \{1,...,K\}$ hay $i^m$ bao gồm các giá trị từ 1 đến K, ứng với K cluster trong 1 tập `sub-vector` thứ $m$:

![Imgur](https://i.imgur.com/N1HHaeF.png)

hay $i^m(x^m)$ là hàm trả về index thứ $k$ với $k \in \{1,...,K\}$ ứng với `sub-codeword` gần nhất hay `centroied` gần nhất.

- Tiếp đó, `short-codes` của vector $x$ được định nghĩa như sau:

![Imgur](https://i.imgur.com/0IbaC6T.png)

là 1 mảng gồm $M$ giá trị, mỗi giá trị là index thứ $k$ được tính toán với `sub-vector` thứ $m$ của $x$ như bên trên. Và ta gọi $i(x)$ thu được là 1 `short-codes` hay `PQ-code` của vector $x$. Hàm mất mát ứng với 1 vector $x$ khi được thực hiện `encode` sang 1 `short-code` như sau:

![Imgur](https://i.imgur.com/7emurAW.png)

hay tìm khoảng cách nhỏ nhất giữa `sub-vector` thứ $m$ của $x$ với tập `sub-codewords` (centroids) thứ $m$ (gồm $K$ `sub-codeword`), rồi cộng dồn $M$ phần ($M$ `sub-vectors` của $x$) khoảng cách đó lại.

###### __Hình minh họa__:

- Lấy ví dụ bạn có 1 tập dữ liệu với gồm 50000 ảnh, mỗi ảnh sau khi thực hiện `feature extraction` qua mạng CNN thu được 1 vector 1024D. Như vậy, ta có 1 ma trận: 50000x1024

![image_vectors](https://i.imgur.com/CEA0cLg.png)

- Ta tiến hành chia nhỏ (split) từng vector thành 8 tập sub-vectors, mỗi sub-vectors là 128D (128 * 8 = 1024). Khi đó, ta thu được một tập hợp các sub-vectors như hình bên dưới:

![vector_slice](https://i.imgur.com/USbxWhz.png)

- Ta thực hiện phân cụm với thuật toán k-means với từng tập sub-vectors của 50000 ảnh (ứng với từng cột sub-vectors như hình dưới), kết quả thu được là một tập các cụm của sub-vectors:

![kmeans_clustering](https://i.imgur.com/fe0VCo0.png)

- Khi đó, mỗi cột (8 cột) được gọi là 1 `sub-codebook` và mỗi cụm (256 cụm mỗi sub-codebook) được gọi là một `sub-codeword` (mỗi `sub-codeword` ứng với 1 `centroid`. Sau khi thu được các cluster và đánh index từ 1->256, ta tính toán theo 2 công thức
 
![Imgur](https://i.imgur.com/N1HHaeF.png)

![Imgur](https://i.imgur.com/0IbaC6T.png)
 
thu được `short-code` tương ứng với vector đầu vào $x$ (hàng xanh lá cây như hình bên dưới)

![compression](https://i.imgur.com/JbCX9RV.png)

- Giả sử với 1 vector ban đầu 1024D 32-bit floats (tương đương 4096 bytes). Sau khi chia nhỏ vector, mỗi sub-vector lại có kích thước 128D 32-bit floats (4096 bytes). Bởi vì, ta có 256 `centroid` (cluster) nên chỉ cần dùng 8-bits để lưu giữ các `centroid id`. Với phương pháp [Lossy Compression](https://en.wikipedia.org/wiki/Lossy_compression) này, ta giảm thiểu được bộ nhớ khi truy vấn đi rất nhiều lần, đồng thời, thời gian tìm kiếm cũng nhanh chóng hơn bằng việc xấp xỉ vector ban đầu bằng `PQ-code`.

###### __Code minh họa__:

```python
import numpy as np
from scipy.cluster.vq import vq, kmeans2
from scipy.spatial.distance import cdist


def train(vec, M, Ks=256):
    '''
    :param M: số lượng sub-vectors của từng vector
    :param Ks: số cluster áp dụng trên từng tập sub-vectors
    '''
    Ds = int(vec.shape[1] / M)  # số chiều 1 sub-vector
    # tạo M codebooks
    # mỗi codebook gồm Ks codewords
    codeword = np.empty((M, Ks, Ds), np.float32)

    for m in range(M):
        vec_sub = vec[:, m * Ds: (m + 1) * Ds]
        # thực hiện k-means trên từng tập sub-vector thứ m
        centroids, labels = kmeans2(vec_sub, Ks)
        # centroids: (Ks x Ds)
        # labels: vec.shape[0]
        codeword[m] = centroids

    return codeword


def encode(codeword, vec):
    # M sub-vectors
    # Ks clusters ứng với từng tập sub-vector 
    # Ds: số chiều 1 sub-vector
    M, Ks, Ds = codeword.shape

    # tạo pq-code cho n samples (với n = vec.shape[0])
    # mỗi pq-code gồm M giá trị
    pqcode = np.empty((vec.shape[0], M), np.uint8)

    for m in range(M):
        vec_sub = vec[:, m * Ds: (m + 1) * Ds]
        # codes: 1 mảng gồm n phần tử (n = vec.shape[0]), lưu giữ cluster index gần nhất của sub-vector thứ m của từng vector
        # distances: 1 mảng gồm n phần từ (n = vec.shape[0]), lưu giữ khoảng cách giữa sub-vector thứ m của từng vector với centroid gần nhất
        codes, distances = vq(vec_sub, codeword[m])
        # codes: vec.shape[0]
        # distances: vec.shape[0]
        pqcode[:, m] = codes

    return pqcode
```

### Xây dựng look-up table

- Với `PQ-code` đã được sinh ra đối với từng vector, câu hỏi đặt ra là: với 1 query vector $y$, làm sao ta tính khoảng cách giữa vector $y$ đó với các `PQ-code` được lưu giữ. Khi đó, khoảng cách giữa query vector $y$ và các vector gốc ban đầu (các vector ứng với từng `PQ-code`) có thể được xấp xỉ khoảng cách gọi là `Asymmetric Distance Computation`.

- Ta định nghĩa 1 query vector $y \in \mathbb{R}^D$ và 1 `PQ-code` $i_x = [i^1,...,i^M]^T \in \{1,...,K\}^M$. Để xấp xỉ khoảng cách giữa query vector và vector gốc của `PQ-code` (hay $d(y, x)^2$), ta định nghĩa 1 khoảng cách bất đối xứng (Asymmetric Distance) $\overline{d}(.,.)^2$ là khoảng cách giữa query vector và vector được `decode` từ `PQ-code` hay: $d(y, x)^2 \approx \overline{d}(y, x)^2 = d(y, \overline{x})^2$ với $\overline{x}$ là vector được `decode` từ `PQ-code`.

- Quay lại với query vector $y$, với mỗi `sub-vector` của $y$: $y^m \in \mathbb{R}^{D/M} (m \in \{1,...,M\})$, ta tính toán khoảng cách giữa $y^m$ với $K$ `sub-codewords` $c^m_k \in C^m$, và lưu giữ các giá trị đó vào 1 look-up table (bảng đối chiếu) $A: \{1,...,M\} \times \{1,...,K\} \to \mathbb{R}$ hay 1 ma trận có kích thước $M \times K$ được định nghĩa như sau:

$$
\begin{aligned}
A(m, k) = d(y^m, c^m_k)^2
\end{aligned} 
$$

- Với 1 bộ cơ sở dữ liệu `PQ-codes` $i_x = [i^1,...,i^M]^T$, ADC được tính toán như sau:

![Imgur](https://i.imgur.com/FWTWVwH.png)

- Khoảng cách giữa $y^m$ với tập `sub-codeword` thứ $m$ đã được tính toán và lưu giữ trong ma trận A, cộng $M$ giá trị ứng với $M$ `sub-vector` của $y$ thu được khi đối chiếu với `look-up table`, ta thu được ADC.

###### __Code minh họa__:

```python
def search(codeword, pqcode, query):
    M, Ks, Ds = codeword.shape

    dist_table = np.empty((M, Ks), np.float32)

    for m in range(M):
        query_sub = query[m * Ds: (m + 1) * Ds]
        dist_table[m, :] = cdist([query_sub], codeword[m], 'sqeuclidean')[0]

    dist = np.sum(dist_table[range(M), pqcode], axis=1)

    return dist


if __name__ == '__main__':
    N, Nt, D = 10000, 2000, 128
    # 10,000 128-dim vectors to be indexed
    vec = np.random.random((N, D)).astype(np.float32)
    vec_train = np.random.random((Nt, D)).astype(
        np.float32)  # 2,000 128-dim vectors for training
    query = np.random.random((D,)).astype(np.float32)  # a 128-dim query vector

    M = 8  # chia query-vector thành thành M sub-vector
    codeword = train(vec_train, M)  # tiến hành tạo codeword bằng k-means, số cluster lấy mặc định = 256
    pqcode = encode(codeword, vec)  # tạo pqcode lấy tập dữ liệu training
    dist = search(codeword, pqcode, query)  # tạo
    print(dist)
    mind_ids = dist.argsort()[:10]
    for id_ in mind_ids:
        print("Id: {} -> Dist: {}".format(id_, dist[id_]))
```

Kết quả

```
[17.090908 13.061664 12.844361 ... 16.18401  16.647713 16.605381]
Id: 9499 -> Dist: 10.84366226196289
Id: 3010 -> Dist: 10.903709411621094
Id: 2983 -> Dist: 11.361068725585938
Id: 5180 -> Dist: 11.394947052001953
Id: 2637 -> Dist: 11.415714263916016
Id: 2121 -> Dist: 11.448192596435547
Id: 2241 -> Dist: 11.763036727905273
Id: 1173 -> Dist: 11.77695083618164
Id: 9613 -> Dist: 11.802627563476562
Id: 6956 -> Dist: 11.836016654968262
```

- Các bạn tham khảo code cuối cùng tại đây: [GithubGist](https://gist.github.com/huyhoang17/6ad54db6d861c10b36a2da047f746d33)

- 1 phương pháp khác cải thiện rất nhiều so với Product Quantization là [LOPQ](http://image.ntua.gr/iva/files/lopq.pdf) hay `Locally Optimized Product Quantization` - `LOPQ is state-of-the-art for quantization methods` theo [Flickr](https://code.flickr.net/2017/03/07/introducing-similarity-search-at-flickr/) Các bạn có thể đọc thêm về `LOPQ` tại [đây](https://code.flickr.net/2017/03/07/introducing-similarity-search-at-flickr/) và [đây](http://image.ntua.gr/iva/research/lopq/). Về thư viện mã nguồn mở, các bạn có thể tham khảo [lopq](https://github.com/yahoo/lopq) của `Yahoo`.

## Kết luận

- Trên đây là bài blog giới thiệu về 1 trong các phương pháp Approxiamate Nearest Neighbor Search đời đầu theo hướng `short-code-based`: __Product Quantization__. Hi vọng sẽ giúp các bạn hiểu rõ hơn về thuật toán, paper; từ đó, có thể tự tìm hiểu và học hỏi thêm các kiến thức cho riêng mình. Nếu còn sai sót, các bạn vui lòng góp ý bên dưới bài blog hoặc liên hệ về địa chỉ: phan.huy.hoang@framgia.com. Cảm ơn các bạn!

- Source code trong bài: [Github Gist](https://gist.github.com/huyhoang17/6ad54db6d861c10b36a2da047f746d33)

## References

- Implement PQ algorithm in pure python: [nanopq](https://github.com/matsui528/nanopq/blob/master/nanopq/pq.py)

- Origin Paper: [Link](https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf)

- Related Paper:
	- A Survey of Product Quantization: [Link](https://www.jstage.jst.go.jp/article/mta/6/1/6_2/_pdf/)
	- Optimized Product Quantization: [Link](http://kaiminghe.com/cvpr13/index.html)
	- Deep Learning of Binary Hash Codes for Fast Image Retrieval: [Link](https://www.iis.sinica.edu.tw/~kevinlin311.tw/cvprw15.pdf)
	- Polysemous Codes: [Link](https://research.fb.com/wp-content/uploads/2016/11/polysemous-codes.pdf?)
	- Learning to Hash for Indexing Big Data: [Link](https://arxiv.org/pdf/1509.05472.pdf)

- http://www.robots.ox.ac.uk/~vgg/rg/slides/ge__cvpr2013__optimizedpq.pdf

- http://mccormickml.com/2017/10/13/product-quantizer-tutorial-part-1/
- http://mccormickml.com/2017/10/22/product-quantizer-tutorial-part-2/

- https://machinelearningcoban.com/2017/06/22/qns1/#-similarity-search
- https://machinelearningcoban.com/2017/06/22/qns1/#-binary-hashing-cho-bai-toan-information-retrieval

- https://code.flickr.net/2017/03/07/introducing-similarity-search-at-flickr/