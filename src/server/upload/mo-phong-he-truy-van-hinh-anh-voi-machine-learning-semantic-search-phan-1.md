# Mô phỏng hệ truy vấn hình ảnh với Machine Learning - Semantic Search (Phần 1)
---

1. Mô tả bài toán
2. Chuẩn bị dữ liệu
3. Mô hình chung cho bài toán
4. Truy vấn hình ảnh với ảnh
5. Truy vấn hình ảnh với chữ
6. Kết quả
7. Kết luận

- __Keyword__: Content-Based Image Retrieval (CBIR), Semantic Search, Visual Search, Similar Searching, Approximate Nearest Neighbor Search (ANN Search), Product Quantization, Polysemous Codes.

- Link Github: https://github.com/huyhoang17/Semantic_Search

- Trong phần 1, mình sẽ đề cập tới các nội dung tại mục 1, 2, 3, 4. Các nội dung còn lại sẽ được đề cập và hoàn thiện tại phần 2 của blog.

---

- Machine Learning và Deep Learning là 2 trong rất nhiều các từ khóa được quan tâm và chú ý trong cuộc cách mạng công nghệ 4.0 hiện nay. Từ các thành tựu trong __Computer Vision, NLP (natural language processing), Hệ gợi ý hay hệ khuyến nghị (Recommender System)__ cho tới các bài toán cụ thể về y khoa, y sinh, xe tự hành, v..v ... Mỗi bài toán đều có các cách xử lí dữ liệu và mô hình riêng, nhưng nhìn chung đều hướng tới 1 mục đích: cải thiện đời sống và giúp ích cho xã hội nói chung và cho các doanh nghiệp, startup, .. nói riêng.

- Với tiêu chí: __"Learn by doing"__, trong bài blog lần này, chủ đề mà mình muốn nói tới là mô phỏng 1 hệ truy vấn (tìm kiếm) hình ảnh, tương tự như __Google Image Search__ vậy. Nếu các bạn nào đã từng sử dụng qua các dịch vụ hay mạng xã hội như: __Flickr__ hay __Pinterest__ sẽ thấy 2 mạng xã hội này có các chức năng tìm kiếm liên quan đến ảnh khá thú vị và độc đáo. Lấy ví dụ với Pinterest, một trong những mạng xã hội về ảnh lớn nhất hiện nay, có 1 chức năng vô cùng hay ho là cắt và tìm kiếm ảnh trực tiếp ngay trên nền ứng dụng. Các ảnh được truy vấn ra đều tương đồng với phần ảnh bị cắt, kèm theo đó là những từ khóa (tag) liên quan tới phần ảnh được cắt ra, khá thú vị phải không nào =)

![Pinterest](https://cdn-images-1.medium.com/max/1600/1*1SoitQHdT7q2BZ2pszvqTQ.gif)

- Lấy 1 ví dụ khác với Flickr, 1 dịch vụ upload và chia sẻ ảnh chất lượng cao phổ biến trên toàn thế giới, cũng gần tương tự với cách làm của Pinterest, khi sử dụng machine learning để tìm kiếm các ảnh theo các nhãn (tag) khi người dùng nhập 1 từ khóa vào (vì đơn giản không phải ảnh nào cũng được người dùng gán tag cho ảnh, chưa kể đến việc các tag có thể không liên quan đến ảnh), và tìm kiếm các ảnh tương đồng. Các bạn có thể thấy được sự hữu ích của thuật toán qua ảnh GIF bên dưới =) That's magic =)

![Flickr](https://flickrcode.files.wordpress.com/2017/03/demo.gif)

- Như các bạn có thể thấy, việc tìm tòi và áp dụng các bài toán ứng dụng machine learning cho doanh nghiệp đem lại những bước đột phá và kết quả đáng ngạc nhiên như vậy. Phần tiếp theo của bài blog này, mình sẽ nói sâu hơn về các thuật toán với các code minh họa kèm theo. Hi vọng sẽ giúp ích cho các bạn đang trong quá trình tìm hiều về __Image Search Engine__. Mọi ý kiến phản hồi và góp ý, các bạn vui lòng comment bên dưới bài post hoặc email về địa chỉ: phan.huy.hoang@framgia.com nhé! Cảm ơn các bạn!

---

### 1. Mô tả bài toán

- Mô phỏng 1 hệ truy vấn hình ảnh với một số vấn đề như sau:
	- Word Embedding
	- Image Embedding
	- Tìm kiếm các từ khóa tương đồng với 1 từ khóa cho trước
	- Tìm kiếm ảnh tương đồng với 1 ảnh cho trước
	- Tìm kiếm ảnh dựa trên sự kết hợp về ý nghĩa của CÁC từ khóa truy vấn
	- Phương pháp tìm kiếm tương đồng (Nearest Neighbor Search)

### 2. Chuẩn bị dữ liệu

- Tập dữ liệu mình sử dụng trong bài toán này là: [Tiny-Imagenet](https://tiny-imagenet.herokuapp.com). Khá tương đồng với tập dữ liệu phổ biến Imagenet nhưng nhỏ hơn nhiều và phù hợp với quá trình test thử mô hình.
- Tiny Imagenet bao gồm 200 classes, mỗi class gồm có 500 ảnh training, 50 ảnh validation, 50 ảnh test. Vậy là với dữ liệu để training chúng ta có 100.000 ảnh, 1 con số không hề nhỏ.

### 3. Mô hình chung cho bài toán

- Trước khi có sự bùng nổ của deep learning hiện nay, các phương pháp xử lí ảnh truyền thống như: __HOG, SIFT__, .. được sử dụng khá nhiều. Tuy nhiên, với sự phát triển của Deep Learning trong vài năm trở lại đây, mạng neural của Deep Learning cũng được coi như 1 phương pháp Feature Extraction, điển hình là mạng neural network cơ bản CNN (Convolution Neural Network), thường được sử dụng với các bài toán liên quan xử lí ảnh và cho độ chính xác tốt hơn nhiều các phương pháp truyền thống.

- Lấy ví dụ với 1 mạng CNN khá quen thuộc, đã từng đứng đầu đạt Top 5 Error trong Imagenet Classification Challenge 2014, [VGG hay Visual Geometry Group](https://www.quora.com/What-is-the-state-of-the-art-today-on-ImageNet-classification-In-other-words-has-anybody-beaten-Deep-Residual-Learning):

![VGG16](https://www.pyimagesearch.com/wp-content/uploads/2017/03/imagenet_vgg16.png)

- Như các bạn có thể thấy, input của mạng VGG16 là 1 ảnh có kích thước 244x244x3 (pixels), output là 1 layer với 1000 node, tương ứng với 1000 class trong Imagenet, sử dụng Softmax với phân phối xác suất đầu ra ứng với từng class. Các lớp hidden layers ở giữa bao gồm các layer cơ bản của 1 mạng CNN như: lớp Convolution, Pooling (Max Pooling, Avegare Pooling, ..), Fully Connected Layer và Activation Function (Sigmoid, Tanh, Relu, ..). Như mình đã nói ở trên, mạng neural hoạt động cũng tương tự như 1 feature extraction, với các layer ở lớp đầu dùng để bóc tách các low level feature như: góc, cạnh, hình khối vật thể. Các layer ở lớp cao hơn thực hiện bóc tách cách high level feature, ứng với các đặc trưng riêng của từng đối tượng:

![DL_Feature_Extraction](https://cdn-images-1.medium.com/max/800/1*zUATaXMAmKof27rPyBRWsg.png)

- 1 phương pháp thường được sử dụng để biểu diễn ảnh input đầu vào là thay vì sử dụng đầu ra cố định 1000 node với hàm softmax như ảnh bên trên, sau khi thực hiện training mô hình, ta có thể sử dụng các layer gần cuối như một feature extraction để biểu diễn cho ảnh đó. Việc chọn layer nào là tùy các bạn, có thể chọn layer fully connected ngay trước softmax hoặc output của layer max pooling cuối cùng, nhưng sẽ sử dụng các layer gần cuối. Các bạn có thể tìm hiểu thêm với 1 số từ khóa kèm theo, mình sẽ không đề cập quá sâu trong bài blog lần này: feature extraction, transfer learning, fine-tuning, image embedding

![Image_Embedding](https://www.pyimagesearch.com/wp-content/uploads/2014/06/cnn_architecture.jpg)

- Như ví dụ với ảnh bên trên, ta sử dụng đầu ra của lớp pooling cuối cùng làm feature extraction. Sau khi thực hiện flatten được 1 vector 1024 chiều chẳng hạn thì vector 1024D đó chính là biểu diễn cho tập dữ liệu ảnh của mình. Khi so sánh độ tương đồng giữa 2 ảnh, ta tính bằng một metric như: cosine, euclid, ... Khoảng cách càng nhỏ chứng tỏ sự tương đồng giữa 2 hay nhiều vector càng cao. Ở đây có 1 chú ý là mình sử dụng pretrained VGG16 model được huấn luyện trên tập dữ liệu Imagenet, tập dữ liệu mới của mình là tương đồng với imagenet (tiny-imagenet :D) nên mình không thực hiện training gì thêm. Việc fine-tuning mô hình còn phụ thuộc vào sự tương đồng giữa 2 tập dữ liệu và kích thước của tập dữ liệu mới, về transfer learning và fine-tuning model, các bạn có thể đọc thêm tại link sau: [CS231 - Transfer Learning](http://cs231n.github.io/transfer-learning/), và chú ý tới 4 gạch đầu dòng tại mục: "__When and how to fine-tune?__"

### 4. Truy vấn hình ảnh với ảnh:

- Ta sử dụng Vector Embedding để biểu diễn cho từng ảnh. Cụ thể với mạng VGG16 bên trên, ta sử dụng đầu ra của lớp fully connected gần cuối làm feature extraction với 4096 node. Các bạn có thể thực hiện fine-tuning mô hình của các bạn nếu tập dữ liệu tương đối nhỏ hoặc fine-tuning toàn bộ mô hình nếu 2 tập dữ liệu hoàn toàn khác nhau. Ở đây, mình không thực hiện huấn luyện lại mà sử dụng luôn pretrained VGG16 model, đầu ra của 1 ảnh khi cho qua model là 1 vector 4096 chiều

![VGG16_4096](https://cdn-images-1.medium.com/max/800/1*LdB1mhrN6hT-EznkkFE8Cg.jpeg)

- Một vấn đề đặt ra: Giả sử bạn có 100.000 ảnh ứng với 100.000 vector 4096D trong cơ sở dữ liệu của bạn. Nếu đem ra so sánh lần lượt trên tập dữ liệu đó thì hoàn toàn KHÔNG khả thi và rất tốn thời gian. 1 số các phương pháp các bạn có thể tìm hiểu thêm về __Nearest Neighbor Search__ như: [Product Quantization](https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf) hoặc [Polysemous Codes](https://research.fb.com/publications/polysemous-codes/), [Random Projection](https://en.wikipedia.org/wiki/Locality-sensitive_hashing#Random_projection), .. (Trong 1 bài blog tiếp theo, mình sẽ nói sâu hơn về các phương pháp này) Ở đây, mình dùng [Annoy](https://github.com/spotify/annoy), 1 thư viện của python liên quan đến Nearest Neighbor Search, sử dụng [Random Projection](https://github.com/spotify/annoy#how-does-it-work). Một vài thư viện về ANN Search đáng chú ý khác như:
	- [Pysparnn - Facebook](https://github.com/facebookresearch/pysparnn) - for sparse data
	- [Faiss - Facebook](https://github.com/facebookresearch/faiss) - for dense vector

Code minh họa tạo image index trong annoy

```python
from annoy import AnnoyIndex
from tqdm import tqdm


def generate_features(id_labels, model=None):
    base_train = 'path-to-train-folder/train'
    for folder in tqdm(id_labels):
        label_path = os.path.join(base_train, folder, 'images')
        fn_paths = sorted(os.listdir(label_path))
        fn_paths = [os.path.join(label_path, fn_path) for fn_path in fn_paths]
        for fn_path in fn_paths:
            img = image.load_img(fn_path, target_size=(224, 224))
            img = image.img_to_array(img)
            img = np.expand_dims(img, axis=0)
            input_ = preprocess_input(img)
            if model is not None:
                feature = model.predict(input_)
            else:
                feature = input_

            yield feature, fn_path


def index_features(features, mode="image", n_trees=1000, dims=4096):
    feature_index = AnnoyIndex(dims, metric='angular')
    for i, row in enumerate(features):
        vec = row
        if mode == "image":
            feature_index.add_item(i, vec[0][0])
        elif mode == "word":
            feature_index.add_item(i, vec)
    feature_index.build(n_trees)
    return feature_index

images_features_gen = generate_features(id_labels, model)
image_index = index_features(images_features_gen, mode="image", n_trees=1000, dims=4096)
```

```python
import matplotlib.image as mpimg
import matplotlib.pyplot as plt


def build_image_mapping(id_labels):
    base_train = 'path-to-train-folder/train'
    i = 0
    image_mapping = {}
    for folder in tqdm(id_labels):
        label_path = os.path.join(base_train, folder, 'images')
        fn_paths = sorted(os.listdir(label_path))
        fn_paths = [os.path.join(label_path, fn_path) for fn_path in fn_paths]
        for fn_path in fn_paths:
            image_mapping[i] = fn_path
            i += 1
    return image_mapping


def search_index_by_key(key, feature_index, item_mapping, top_n=10):
    distances = feature_index.get_nns_by_item(key, top_n, include_distances=True)
    return [[a, item_mapping[a], distances[1][i]] for i, a in enumerate(distances[0])]


def show_sim_imgs(search_key):
	results = search_index_by_key(search_key, image_index, image_mapping)
	plt.imshow(result[0][1])

    fig = plt.figure(figsize=(8, 8))
    columns = 3
    rows = 3
    for i in range(1, columns*rows +1):
        img = mpimg.imread(results[i][1])
        fig.add_subplot(rows, columns, i)
        plt.imshow(img)
    plt.show()

show_sim_imgs(100)
...
```

- Sau đây là 1 số kết quả khi truy vấn ảnh dùng ảnh:

Kết quả 1:
![Result_1](https://i.imgur.com/G0nFOpr.png)

![Result_11](https://i.imgur.com/GTb6dUW.png)

Kết quả 2:
![Result_2](https://i.imgur.com/PETSvjo.png)

![Result_22](https://i.imgur.com/GwmNI2C.png)

Kết quả 3:
![Result_3](https://i.imgur.com/ROQ1muP.png)

![Result_33](https://i.imgur.com/G8Dgo9b.png)

Kết quả 4:
![Result_4](https://i.imgur.com/pEXVKaF.png)

![Result_44](https://i.imgur.com/VRxuomX.png)

- Trước khi kết thúc phần 1, chúng ra sẽ nói 1 chút về Word Embedding. Ở đây, mình dùng tập pretrained vector của [Glove](https://nlp.stanford.edu/projects/glove/) đã được huấn luyện trên dữ liệu của Wikipedia, cụ thể là tập 6B.100D.Glove với 6 tỷ token, 400.000 từ vựng, mỗi từ vựng được biểu diễn bởi 1 vector 100 chiều (100D). Code minh họa load word embedding từ Glove pretrained vector:

```python
def load_glove_vectors(glove_dir, glove_name='glove.6B.100d.txt'):
    with open(os.path.join(glove_dir, glove_name)) as f:
        embeddings_index = {}
        for line in f:
            values = line.split()
            word = values[0]
            coefs = np.asarray(values[1:], dtype='float32')
            embeddings_index[word] = coefs
    print('Found %s word vectors.' % len(embeddings_index))
    return embeddings_index

word_vectors = load_glove_vectors("path-to-glove-folder")
# Found 400000 word vectors.
```

- Ta cũng dùng Annoy để build Word Index, tương tự như Image Index bên trên. Code minh họa:

```python
def build_word_mapping(word_vectors):
    word_mapping = {i: word for i, word in enumerate(word_vectors)}
    return word_mapping

word_mapping = build_word_mapping(word_vectors)
word_index = index_features(images_features_gen, mode="word", n_trees=20, dims=100)
```

- và tìm kiếm top 10 các từ khóa tương đồng với từ được truy vấn. Code minh họa:

```python
result = search_index_by_key(100, word_index, word_mapping, top_n=10)
print(result)
```

```python
# Result
[[100, 'so', 0.0],
 [151, 'even', 0.3725559711456299],
 [317, 'too', 0.40388232469558716],
 [34, 'but', 0.40827909111976624],
 [20, 'it', 0.4440842866897583],
 [113, 'because', 0.46193355321884155],
 [191, 'very', 0.4656434953212738],
 [143, 'well', 0.4742829501628876],
 [413, 'though', 0.474283903837204],
 [36, 'not', 0.48641782999038696]]

[[200, 'according', 0.0],
 [255, 'report', 0.6661985516548157],
 [1099, 'sources', 0.7130154967308044],
 [350, 'earlier', 0.7130315899848938],
 [21, 'by', 0.7232713103294373],
 [687, 'reports', 0.7305183410644531],
 [429, 'agency', 0.732568621635437],
 [2835, 'citing', 0.7381625771522522],
 [293, 'reported', 0.7408336400985718],
 [243, 'based', 0.7700074315071106]]

[[300, 'man', 0.0],
 [787, 'woman', 0.5790520310401917],
 [1606, 'boy', 0.6457751989364624],
 [167, 'old', 0.7198447585105896],
 [629, 'father', 0.7252141833305359],
 [852, 'turned', 0.7283275723457336],
 [38, 'who', 0.7286275029182434],
 [507, 'whose', 0.7312828898429871],
 [1749, 'girl', 0.7359766960144043],
 [18, 'he', 0.740867555141449]]

[[400, 'troops', 0.0],
  [340, 'forces', 0.40737587213516235],
  [666, 'soldiers', 0.4568820893764496],
  [330, 'army', 0.5508490204811096],
  [3466, 'deployed', 0.6030014157295227],
  [4332, 'peacekeepers', 0.645034670829773],
  [178, 'military', 0.6453427076339722],
  [10848, 'reinforcements', 0.6732158064842224],
  [1102, 'armed', 0.6880024075508118],
  [4462, 'marines', 0.7308720946311951]],
 [[500, 'working', 0.0]

[[500, 'working', 0.0],
  [275, 'help', 0.736937403678894],
  [2116, 'helping', 0.7737798690795898],
  [5, 'and', 0.7951116561889648],
  [667, 'able', 0.8018860220909119],
  [741, 'wanted', 0.8142691850662231],
  [201, 'several', 0.8193658590316772],
  [2795, 'begun', 0.8195382952690125],
  [4379, 'studying', 0.8257055282592773],
  [4, 'to', 0.829670250415802]]

[[600, 'together', 0.0],
  [17, 'with', 0.7020285725593567],
  [60, 'up', 0.7060710787773132],
  [143, 'well', 0.7262124419212341],
  [101, 'them', 0.7410644292831421],
  [326, 'come', 0.7458860874176025],
  [2725, 'apart', 0.7610493302345276],
  [66, 'out', 0.7717634439468384],
  [773, 'instead', 0.7834240198135376],
  [39, 'they', 0.784579873085022]]

...
```

- Các bạn có thể thấy sự tương đồng giữa các từ khóa được truy vấn. Trong phần 2, mình sẽ tiến hành xây dựng 1 mô hình có khả năng mapping giữa feature vector của từng ảnh với ngữ nghĩa (word embedding) của các tag tương ứng với ảnh đó. Cụ thể hơn, cho phép mô hình có khả năng gán tag (label) cho từng ảnh đầu vào và ngược lại, tìm kiếm các ảnh liên quan dựa vào các từ khóa mà người dùng nhập vào, tương tự như chức năng của Pinterest và Flickr vậy (Như mình đã nói từ đầu, không phải ảnh nào cũng được gán tag, hoặc gán tag nhưng không liên quan đến nội dung ảnh). Hẹn gặp lại các bạn trong phần 2 của blog!

- Các bạn có thể xem thêm về visual t-SNE của Word2Vec tại link [sau](https://projector.tensorflow.org/)

- Các bạn có thể đọc thêm về Word2Vec trong bài blog [này](https://viblo.asia/p/xay-dung-mo-hinh-khong-gian-vector-cho-tieng-viet-GrLZDXr2Zk0) của tác giả [Quang Phạm](https://viblo.asia/u/QuangPH), xây dựng mô hình không gian vector cho tiếng Việt.

- Source code trong bài của mình tham khảo từ repo [Semantic-Search](https://github.com/hundredblocks/semantic-search) nhưng có chỉnh sửa đi khá nhiều để phù hợp với tập dữ liệu các cách thức `fetch` dữ liệu vào mô hình. Trong bài, tác giả thực hiện trên 1 tập dữ liệu khá nhỏ, 20 class, mỗi class có 50 ảnh và lưu dữ liệu vào 1 mảng 1000 phần tử và sử dụng method `fit` trong framework `keras`. Cách làm đó hoàn toàn không phù hợp với tập dữ liệu 100.000 ảnh và mình có viết lại phần `fetch` dữ liệu đó sử dụng method `fit_generator` trong `keras`, viết riêng 1 class để gen data, chỉ load ảnh theo từng batch. Chi tiết các bạn có thể tham khảo tại repo của mình: [loaders.py](https://github.com/huyhoang17/Semantic_Search/blob/master/src/loaders.py). Phần mô hình mình sẽ nói rõ hơn trong phần 2 của blog.

- Github Link: https://github.com/huyhoang17/Semantic_Search

---

### Reference

- Visual Search at Pinterest: https://newsroom.pinterest.com/en/post/our-crazy-fun-new-visual-search-tool

- Similar Search at Flickr: http://code.flickr.net/2017/03/07/introducing-similarity-search-at-flickr

- Building a semantic seach engine: http://insight.streamlit.io/0.13.3-8ErS/index.html?id=QAKzY9mLjr4WbTCgxz3XBX

- Xây dựng mô hình không gian vector cho tiếng Việt: https://viblo.asia/p/xay-dung-mo-hinh-khong-gian-vector-cho-tieng-viet-GrLZDXr2Zk0