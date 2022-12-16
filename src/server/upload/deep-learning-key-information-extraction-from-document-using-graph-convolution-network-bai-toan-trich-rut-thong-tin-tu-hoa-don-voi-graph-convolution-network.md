Các nội dung sẽ được đề cập trong bài blog lần này
- Tổng quan về GNN, GCN
- Bài toán Key Information Extraction, trích rút thông tin trong văn bản từ ảnh
- Mô hình GNN
- Tập dữ liệu hóa đơn - SROIE / ICDAR 2019
- Invoice-GCN
- Huấn luyện mô hình với GCN
- 1 số cách tiếp cận và hướng phát triển khác cho bài toán KIE
- Kết luận
- Tài liệu tham khảo

---

- __UPDATED (31-10-2021)__: link project về trích rút thông tin từ hóa đơn với GCN, tập dữ liệu sử dụng là tập hóa đơn của Việt Nam MC-OCR: https://github.com/huyhoang17/KIE_invoice_minimal

- Kết quả cuối cùng thu được cho bài toán trích rút thông tin từ hóa đơn, với các text box màu đỏ thể hiện các thực thể (entity) mà mô hình phân loại được với nhãn tương ứng (company, address, date, total)

![Imgur](https://i.imgur.com/ZJlt0Mh.png)

![Imgur](https://i.imgur.com/ehIs8eT.png)

# Tổng quan về GNN, GCN

- Trong năm 2020, cùng với __Transformer__, __GNN__ hay __Graph Neural Network__ nhận được nhiều sự chú ý và quan tâm hơn từ cộng đồng. Gần đây, mình có viết 1 bài review về các phương pháp và hướng ứng dụng của Graph Neural Network, các bạn có thể tham khảo thêm tại đường link sau: [[Deep Learning] Graph Neural Network - A literature review and applications
](https://viblo.asia/p/deep-learning-graph-neural-network-a-literature-review-and-applications-6J3ZgP0qlmB)

- 1 số lớp bài toán điển hình của GNN bao gồm:
    - Node classification
    - Graph classification
    - Link prediction
    - Graph clustering
    - ...

- Trong thực tế, GNN có thể được áp dụng vào nhiều kiểu dữ liệu và bài toán khác nhau. 1 số ứng dụng như:
    - Các hệ thống gợi ý sản phẩm, 2 ví dụ tiêu biểu nhất là mô hình __PinSage__ (Pinterest) và __UberEat__ (Uber)
    - __Decagon__, mô hình giúp chẩn đoán các tác dụng phụ của thuốc, hay side-effect khi sử dụng chung nhiều loại thuốc với nhau
    - Feature Matching, liên quan tới lớp bài toán Deep Graph Matching, 1 mô hình SOTA trong thời gian gần đây có thể kể tới như __SuperGlue__
    - Text Classification, bài toán phân loại văn bản khá quen thuộc khi có thể kết hợp sử dụng thêm module GNN để extract được các mối liên hệ giữa word và document, 1 số mô hình tiêu biểu như: __TextGCN__, __HeteGCN__, __Every Document Owns Its Structure__, ...
    - NLP, các bài toán có mối liên hệ giữa các từ như Dependency Parsing, Relation Extraction, 1 số paper có thể kể tới như: __SpanBERT__, __GraphREL__, ...
    - Computer Vision: GNN cũng được sử dụng trong các bài toán về xử lý ảnh như: __Image Segmentation__, __Scene Text Detection__, __Scene Graph Generation__, __Pose Estimation__, ...
    - Reinforcement Learning: 1 bài toán điển hình là __Goal-Directed Generation__, với việc hình thành các cấu trúc phân tử dựa trên 1 số mục tiêu và điều kiện / quy tắc cho trước. Hay 1 hướng nghiên cứu được quan tâm gần đây như việc kết hợp reinforcement learning và GNN cho bài toán Recommender System.
    - ***Key Information Extraction***: bài toán trích rút thông tin từ văn bản, cũng sẽ là chủ đề được mình đề cập tới trong bài blog lần này.
    - .. và còn rất nhiều các hướng phát triển và ứng dụng khác nữa..

# Bài toán Key Information Extraction, trích rút thông tin trong văn bản từ ảnh

- Bài toán Information Extraction là 1 bài toán không mới, nhưng trong bài hướng dẫn này, dạng dữ liệu mà mình muốn hướng tới là hóa đơn (invoice). Nhiệm vụ đặt ra là làm sao phân loại được các text box vào các trường thông tin tương ứng, bao gồm: company (tên cty, nhà phân phối sản phẩm), address (địa chỉ), date (ngày giao dịch), total (tổng giá tiền) và other (không thuộc 4 trường trên).

- Có 1 chú ý rằng bài toán này được thực hiện với 1 yêu cầu rằng cần thực hiện 2 bài toán con trước đó là Scene Text Detection và Scene Text Recognition. Đầu ra của 2 bài toán này sẽ được sử dụng để xây dựng các feature và đồ thị cho bài toán thứ 3 là Key Information Extraction. Đầu vào của mô hình là ảnh, đầu ra ứng với mỗi text box sẽ được phân loại thuộc 4 trường thông tin tương ứng.

- Thực ra, với bài toán trích rút thông tin từ ảnh này, ta hoàn toàn có thể sử dụng các phương pháp dễ tiếp cận và quen thuộc hơn như: template-based hoặc NLP-based. Tuy nhiên, mỗi phương pháp đều có những hạn chế tương ứng:
    - __Template-based__: đơn giản là việc áp dụng các rule (luật), được định nghĩa từ trước lên các form, văn bản có layout / structure cố định, không thay đổi nhiều. Tiếp đó, sử dụng các phương pháp về text / keyword matching để xác định các trường thông tin tương ứng. Tuy nhiên, nhược điểm lớn nhất của phương pháp này là chúng ta phải định nghĩa từng luật riêng ứng với từng form, không có khả năng adapt sang dạng form mới và bị phụ thuộc hoàn toàn vào domain knowledge của từng người.
    - __NLP-based__: với phương pháp này, các nội dung thu được từ text-box có thể đưa vào 1 mô hình text classification hoặc NER để tiến hành phân loại hoặc xác định các thực thể thuộc từng trường thông tin tương ứng. Ưu điểm của phương pháp này so với Template-based là có khả năng adapt được với dữ liệu mới. Tuy nhiên, 1 số nhược điểm có thể kể tới như: bị phụ thuộc rất nhiều vào layout của form, hạn chế với dữ liệu được biểu diễn dưới dạng bảng / table, hoàn toàn không sử dụng các thông tin / feature về vị trí của text-box, cho dù các thông tin về layout như vậy cũng sẽ giúp ích rất nhiều trong việc xác định các trường tương ứng.

- Việc thay thế và áp dụng graph-based method cho bài toán này đến từ 1 số lý do sau:
    - Local pattern: tương tự như mô hình CNN, nhưng thay vì là các điểm pixel, các node có kết nối với nhau cũng sẽ có mối liên hệ cao hơn với các node xa hơn trong đồ thị.
    - Positional feature: các thông tin về vị trí / tọa độ của nút trên ảnh cũng sẽ giúp mô hình dễ dàng phân biệt các trường thông tin hơn. Ví dụ như thông tin về tên của siêu thị / cửa hàng thực phẩm thường được ghi ngay trên đầu của hóa đơn
    - Textual feature: tương tự như positional feature, các thông tin về text cũng rất quan trọng. Ví dụ như việc phân biệt trường thông tin `address` với các trường dữ liệu khác
    - Việc stack nhiều các module GCN lên nhau giúp model học được các high level feature tốt hơn

# Mô hình hóa bài toán với GCN

- Trong phần này, để dễ hình dung, mình sẽ đề cập tới phương pháp trong paper __Invoice-GCN__, bao gồm các bước về Feature Engineering, Graph Modeling và Model Training. 2 phần code mẫu thực hiện bởi Pytorch và Pytorch-Geometric sẽ được đề cập tại các phần bên dưới

## [Invoice GCN / An Invoice Reading System Using a Graph Convolutional Network](https://link.springer.com/chapter/10.1007/978-3-030-21074-8_12)

- Paper đầu tiên sử dụng GCN để trích rút các trường thông tin từ tập dữ liệu hóa đơn.  Các điểm chính trong paper bao gồm:
    - Graph Modeling: cách thức xây dựng graph dựa trên các bounding box text đã được OCR
    - Feature Engineering: cách xây dựng các đặc trưng ban đầu ứng với từng nút
    - Mô hình hóa với Chebyshev GCN và GCN model
    - Dataset, Experiment setup

## Feature Engineering

- Khi áp dụng các mô hình về GNN cho từng bài toán riêng biệt, điều đầu tiên ta cần quan tâm là làm thế nào để biểu diễn dữ liệu hay các feature dữ liệu dưới dạng đồ thị để đưa vào mô hình GCN sau này. 1 ví dụ đơn giản với tập dữ liệu CORA dataset, tập dữ liệu về academic paper thuộc 7 class. Các node của đồ thị là các paper, các cạnh thể hiện việc giữa 2 paper có cite lẫn nhau, ta chỉ xét đơn giản với đồ thị vô hướng. Các node feature của đồ thị được xây dựng khá đơn giản khi ứng với 1 node (paper), node feature sẽ được thể hiện bởi 1 vector 1433 chiều, ứng với index của 1433 từ hay xuất hiện trong vocab. Vector thu được là 1 binary vector (0 và 1), với 1 thể hiện rằng 1 từ có xuất hiện trong paper và ngược lại. 

- Còn đối với dữ liệu hiện tại là ảnh hóa đơn thì chúng ta sẽ encode graph dựa trên các thông tin sau:
    - Các bounding box ứng với từng dòng text của ảnh. Phần text detection này có thể sử dụng các mô hình Object Detection phổ biến hoặc dùng các mô hình chuyên biệt cho bài toán Scene Text Detection như: CTPN, EAST, Differentiable Binarization, CRAFT,...
    - Nội dung của các text box đó. Phần text recognition này có thể sử dụng các tool mì ăn liền như Tesseract hoặc các mô hình về Scene Text Recognition như: CRNN-CTC loss, Attention-OCR,...

- Ví dụ 1 ảnh sau khi thực hiện qua 2 bước detect và OCR (ảnh demo mình sử dụng từ trang: https://clova.ai/ocr của clova-AI)

![Imgur](https://i.imgur.com/3g3nHFN.png)

- Phần pipeline của mô hình được mô tả như sau

![Imgur](https://i.imgur.com/yPlvSGV.png)

- Phần Word Extractor bao gồm 2 phần là Text Detection và OCR như bên trên mình đã có đề cập.
- Phần Feature Calculator hay feature engineering, là phần tạo feature cho các node (nút, đỉnh) trên đồ thị. Các nút ở đây chính là các bounding box thu được sau bước text detect. Việc định nghĩa các cạnh của graph thuộc phần __Graph Modeler__, sẽ được mình đề cập kĩ hơn ở bên dưới. Giờ việc cần làm tiếp theo là xây dựng feature ban đầu cho các nút của đồ thị. Có nhiều cách nhưng mình sẽ ví dụ cách thực hiện trong paper Invoice-GCN, với việc xây dựng và tổng hợp feature từ nhiều kiểu / thuộc tính khác nhau:
    - Boolean feature: dựa trên đầu ra từ mô hình text recognition, ta xây dựng các thuộc tính như:
        - isDate: có phải là ngày tháng ko (1 / 0)
        - isZipCode: 6 kí tự có thuộc 1 zipcode mã vùng có sẵn ko (1 / 0)
        - isKnownCity, isKnownDept, isKnownCountry: lần lượt kiểm tra xem phần nội dung text có phải là tên của cục, sở, thành phố hay đất nước nào không (1 / 0)
        - nature: gồm 8 phần tử, lần lượt kiểm tra các thuộc tính bao gồm: isAlphabetic, isNumeric, isAlphaNumeric, isNumberwithDecimal, isRealNumber, isCurrency, hasRealandCurrency, mix (except these categories), mixc (mix and currency word). Mình thực ra cũng không hiểu hết các thuộc tính mang ý nghĩa gì, trong paper cũng không đề cập rõ nhưng với `nature` feature, ta sẽ thu được 1 binary vector 8 chiều ứng với 8 thuộc tính con.
    - Numeric feature: khoảng cách tương đối từ text box hiện tại tới 4 box tương ứng (Top, bottom, left, right). Việc xác định các box tương ứng sẽ được đề cập tại phần __Graph Modeling__.
    - Text feature: dựa trên đầu ra của mô hình text recognize, ta có thể sử dụng các mô hình thông dụng như Word2Vec, Glove,... để lấy vector embedding của từ (vì phần text detect trong paper là dựa theo word-based). Tuy nhiên, các mô hình này có hạn chế là OOV - Out of vocabulary hay các từ không xuất hiện lúc training sẽ không có embedding. Điều này có thể được cải thiện bằng cách sử dụng các phương pháp khác như: FastText hay BPE (InvoiceGCN). Hoặc nếu với 1 text line thì có thể sử dụng các mô hình về Bert-based để lấy embedding cho câu hiện tại!

==> Sau cùng, ta "nối" tất cả các thuộc tính đó lại và thu được 1 feature vector 317 chiều (1 + 1 + 3 + 8 + 4 + 300) làm node feature ban đầu ứng với từng nút (từng text box) trong graph!

## Graph Modeling

- Như bên trên mình có đề cập tới numeric feature, 4 features về tọa độ này được dựa trên vị trí __tương đối__ với 4 text box trên, dưới, trái, phải như hình bên dưới

![Imgur](https://i.imgur.com/tUMuAr8.png)

- Với 4 thông số $RD_L$, $RD_R$, $RD_T$, $RD_B$ được tính toán như sau

![Imgur](https://i.imgur.com/UvjNz5D.png)

ví dụ với $RD_L$ sẽ được tính toán dựa trên tọa độ của các bounding box (output của model text detection), hay chính bằng khoảng cách từ bounding box `Source` tới bounding box `Left`, rồi chia cho độ rộng của ảnh, tương tự với các thông số các cũng như vậy.

![Imgur](https://i.imgur.com/svOFueG.png)

- Ngoài ra, còn 1 điều chú ý khi xây dựng graph cho từng văn bản (invoice). Ví dụ như hình bên trên, các đường nối giữa các text box đã được thể hiện khá rõ ràng. Nhưng nếu để ý, các bạn có thể thấy rằng không có đường nối giữa 2 text box là `anticipé` và `le`. Đơn giản vì việc xác định các text box nào được nối với nhau sẽ theo 1 số luật như sau:
    - Xét theo 4 phía (trên, dưới, trái, phải) và xác định các $RD_L$, $RD_R$, $RD_T$, $RD_B$ tương ứng bằng việc chọn các text box có khoảng cách gần nhất
    - Thứ tự ưu tiên thực hiện sẽ từ trên xuống dưới, từ trái sang phải. Và 1 hướng chỉ có 1 đường nối với 1 text box khác! Như ví dụ bên trên, do text box `anticipé` và `fois` đã kết nối với nhau từ trước nên sẽ không có đường nối giữa `anticipé` và `le` nữa. Mặc dù 2 text box `fois` và `le` đều nằm ngay dưới và có khoảng cách tới text box `anticipé` là ngang nhau.

- Dưới đây là 1 ảnh minh họa thể hiện các node và edge trên 1 hóa đơn trong tập dữ liệu SROIE

![Imgur](https://i.imgur.com/mHAnDBR.jpg)

- Tất nhiên, về luật để xây dựng graph cho từng văn bản không hề có hạn chế, hoàn toàn có thể thử nghiệm các cách xây dựng khác nhau, ví dụ việc text box `anticipé` sẽ có 2 đường nối tới 2 text box `fois` và `le`, vì đều nằm ngay bên dưới và có khoảng cách tới text box `anticipé` là ngang nhau.

- Phần tạo graph cho từng hóa đơn các bạn có thể tham khảo 1 bài hướng dẫn sau:
    - [Using Graph Convolutional Neural Networks on Structured Documents for Information Extraction](https://towardsdatascience.com/using-graph-convolutional-neural-networks-on-structured-documents-for-information-extraction-c1088dcd2b8f)

## Modeling

- Trong paper Invoice-GCN có đề cập tới việc sử dụng Chebyshev-GCN model, là 1 spectral graph neural network. Về phần mô hình, có thể tóm gọn như ảnh dưới:

![Imgur](https://i.imgur.com/9jpW0q6.png)

- Model Chebyshev-GCN được xây dựng với 5 layers như hình trên, bao gồm 4 hidden layers và 1 output layer. Tham số $K$ trong Chebyshev model được chọn mặc định = 3 tại tất cả các hidden layer với số node input được quy định lần lượt là: 16, 32, 64, 128 (với nf = 16) và output layer gồm 28 output ứng với 28 nhãn / thực thể cần phân biệt. Mũi tên xanh là Relu activation function, mũi tên tím là Softmax, loss function là cross-entropy.

## Dataset & Experiment

- Vì tập dữ liệu khá đặc thù nên không public, bao gồm khoảng 3100 hóa đơn với 27 trường thông tin cần trích rút (product description, unit price, quantity, total, ...)

![Imgur](https://i.imgur.com/OnxitYu.png)

- Trên đây là bảng kết quả ứng với 27 trường thông tin với f1 trung bình = 0.93. Có thể thấy trong paper lựa chọn cách thức extract text theo word-based, không phải theo sentence-based, sử dụng BPE để encode embedding và xử lý với những case OOV. Ví dụ ảnh visualize kết quả đầu ra của mô hình

![Imgur](https://i.imgur.com/5tDRFOf.png)

# Huấn luyện mô hình với GCN

## Tập dữ liệu hóa đơn - SROIE

- Trong phần này, mình sẽ thực hiện định nghĩa và huấn luyện mô hình trên tập dữ liệu SROIE-2019. SROIE hay Scanned Receipts OCR and Information Extraction là tập dữ liệu được sử dụng trong RRC Competition - ICDAR 2019. Gồm 3 task con: text detection, text recognition và key information extraction. Các bạn có thể download tập dữ liệu tại [trang chủ](https://rrc.cvc.uab.es/?ch=13) hoặc dữ liệu đã được xử lý qua link driver sau: [preprocessed_SROIE_2019](https://drive.google.com/drive/folders/1UcW2Fwjd7fSr1wSSOeoCw2i1jCuBEN56?usp=sharing)

## Định nghĩa mô hình với thư viện Torch-Geometric.

### GCN vs Chebyshev GCN

- Để nhanh gọn, tại phần đầu này mình sẽ sử dụng các module có sẵn trong thư viện Torch-Geometric để xây dựng 1 mô hình đơn giản cho bài toán Invoice Information Extraction. __Torch-Geometric__, cùng với __DGL__, là 2 trong số rất nhiều thư viện về Graph Network được xây dựng và sử dụng hiện nay, tính đến thời điểm mình viết bài blog này đã có hơn 10k star trên repo. Torch-Geometric được contribute và cập nhật thường xuyên các mô hình về GNN mới, kèm theo các file example, danh sách các mô hình được support có thể xem thêm tại trang chủ: https://github.com/rusty1s/pytorch_geometric . Việc định nghĩa các thành phần mới cũng khá dễ dàng.

- Đoạn code bên dưới mô phỏng mô hình GCN được sử dụng trong bài toán này, bao gồm module GCN (trong paper Semi-Supervised Node classification) và Chebyshev-GCN (trong paper Invoice-GCN):

```python
class InvoiceGCN(nn.Module):

    def __init__(self, input_dim, chebnet=False, n_classes=5, dropout_rate=0.2, K=3):
        super().__init__()

        self.input_dim = input_dim
        self.n_classes = n_classes
        self.dropout_rate = dropout_rate

        if chebnet:
            self.conv1 = ChebConv(self.input_dim, 64, K=K)
            self.conv2 = ChebConv(64, 32, K=K)
            self.conv3 = ChebConv(32, 16, K=K)
            self.conv4 = ChebConv(16, self.n_classes, K=K)
        else:
            self.conv1 = GCNConv(self.first_dim, 64, improved=True, cached=True)
            self.conv2 = GCNConv(64, 32, improved=True, cached=True)
            self.conv3 = GCNConv(32, 16, improved=True, cached=True)
            self.conv4 = GCNConv(16, self.n_classes, improved=True, cached=True)

    def forward(self, data):
        # for transductive setting with full-batch update
        x, edge_index, edge_weight = data.x, data.edge_index, data.edge_attr

        x = F.dropout(F.relu(self.conv1(x, edge_index, edge_weight)), p=self.dropout_rate, training=self.training)
        x = F.dropout(F.relu(self.conv2(x, edge_index, edge_weight)), p=self.dropout_rate, training=self.training)
        x = F.dropout(F.relu(self.conv3(x, edge_index, edge_weight)), p=self.dropout_rate, training=self.training)
        x = self.conv4(x, edge_index, edge_weight)

        return F.log_softmax(x, dim=1)
```

### Định nghĩa dataset

- Để thuận tiện trong việc lưu giữ và lấy các thông tin, mình sử dụng luôn module dataset có sẵn trong Torch-Geometric. Về phần xây dựng node feature cho từng node, mình sử dụng thêm vector embedding từ mô hình [Sentence Transformer](https://github.com/UKPLab/sentence-transformers) cho text feature. Đoạn code mô tả như bên dưới:

```python
from torch_geometric.utils.convert import from_networkx
from bpemb import BPEmb
from sentence_transformers import SentenceTransformer

bpemb_en = BPEmb(lang="en", dim=100)
sent_model = SentenceTransformer('distilbert-base-nli-stsb-mean-tokens')

def make_sent_bert_features(text):
    emb = sent_model.encode([text])[0]
    return emb

def get_data(save_fd):
    """
    returns one big graph with unconnected graphs with the following:
    - x (Tensor, optional) – Node feature matrix with shape [num_nodes, num_node_features]. (default: None)
    - edge_index (LongTensor, optional) – Graph connectivity in COO format with shape [2, num_edges]. (default: None)
    - edge_attr (Tensor, optional) – Edge feature matrix with shape [num_edges, num_edge_features]. (default: None)
    - y (Tensor, optional) – Graph or node targets with arbitrary shape. (default: None)
    - validation mask, training mask and testing mask 
    """
    path = "/gdrive/MyDrive/workspace/data/sroie2019/data/raw/box"
    files = [i.split('.')[0] for i in os.listdir(path)]
    files.sort()
    all_files = files[1:]

    list_of_graphs = []
    train_list_of_graphs, test_list_of_graphs = [], []

    files = all_files.copy()
    random.shuffle(files)

    """Resulting in 550 receipts for training"""
    training, testing = files[:550], files[550:]

    for file in tqdm_notebook(all_files):
        connect = Grapher(file, data_fd)
        G,_,_ = connect.graph_formation()
        df = connect.relative_distance() 
        individual_data = from_networkx(G)

        feature_cols = ['rd_b', 'rd_r', 'rd_t', 'rd_l','line_number', \
                'n_upper', 'n_alpha', 'n_spaces', 'n_numeric','n_special']

        text_features = np.array(df["Object"].map(make_sent_bert_features).tolist()).astype(np.float32)
        numeric_features = df[feature_cols].values.astype(np.float32)

        features = np.concatenate((numeric_features, text_features), axis=1)mak
        features = torch.tensor(features)

        for col in df.columns:
            try:
                df[col] = df[col].str.strip()
            except AttributeError as e:
                pass

        df['labels'] = df['labels'].fillna('undefined')
        df.loc[df['labels'] == 'company', 'num_labels'] = 1
        df.loc[df['labels'] == 'address', 'num_labels'] = 2
        df.loc[df['labels'] == 'date', 'num_labels'] = 3
        df.loc[df['labels'] == 'total', 'num_labels'] = 4
        df.loc[df['labels'] == 'undefined', 'num_labels'] = 5
 
        assert df['num_labels'].isnull().values.any() == False, f'labeling error! Invalid label(s) present in {file}.csv'
        labels = torch.tensor(df['num_labels'].values.astype(np.int))
        text = df['Object'].values

        individual_data.x = features
        individual_data.y = labels
        individual_data.text = text
        individual_data.img_id = file

        if file in training:
            train_list_of_graphs.append(individual_data)
        elif file in testing:
            test_list_of_graphs.append(individual_data)

    train_data = torch_geometric.data.Batch.from_data_list(train_list_of_graphs)
    train_data.edge_attr = None
    test_data = torch_geometric.data.Batch.from_data_list(test_list_of_graphs)
    test_data.edge_attr = None

    torch.save(train_data, os.path.join(save_fd, 'train_data.dataset'))
    torch.save(test_data, os.path.join(save_fd, 'test_data.dataset'))

get_data(save_fd="/gdrive/MyDrive/workspace/data/sroie2019/data/processed" )
```

- Về phần tạo graph cho dữ liệu, các bạn có thể tham khảo file sau: [graph.py](https://gist.github.com/hoangph-1744/83e53e53e6ecceb90ed6d116e2393bff)

```python
def load_train_test_split(save_fd):
    train_data = torch.load(os.path.join(save_fd, 'train_data.dataset'))
    test_data = torch.load(os.path.join(save_fd, 'test_data.dataset'))
    return train_data, test_data

train_data, test_data = load_train_test_split(save_fd="/gdrive/MyDrive/workspace/data/sroie2019/data/processed")
print(train_data, test_data)
# Batch(batch=[29704], edge_index=[2, 40638], img_id=[550], text=[550], x=[29707, 778], y=[29707])
# Batch(batch=[3919], edge_index=[2, 5347], img_id=[76], text=[76], x=[3919, 778], y=[3919])
```

### Huấn luyện mô hình

```python
from sklearn.utils.class_weight import compute_class_weight

model = InvoiceGCN(input_dim=train_data.x.shape[1], chebnet=True)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
optimizer = torch.optim.AdamW(
    model.parameters(), lr=0.001, weight_decay=0.9
)
train_data = train_data.to(device)
test_data = test_data.to(device)

# class weights for imbalanced data
_class_weights = compute_class_weight(
    "balanced", train_data.y.unique().cpu().numpy(), train_data.y.cpu().numpy()
)
print(_class_weights)

no_epochs = 2000
for epoch in range(1, no_epochs + 1):
    model.train()
    optimizer.zero_grad()

    # NOTE: just use boolean indexing to filter out test data, and backward after that!
    # the same holds true with test data :D
    # https://github.com/rusty1s/pytorch_geometric/issues/1928
    loss = F.nll_loss(
        model(train_data), train_data.y - 1, weight=torch.FloatTensor(_class_weights).to(device)
    )
    loss.backward()
    optimizer.step()

    # calculate acc on 5 classes
    with torch.no_grad():
        if epoch % 200 == 0:
            model.eval()

            # forward model
            for index, name in enumerate(['train', 'test']):
                _data = eval("{}_data".format(name))
                y_pred = model(_data).max(dim=1)[1]
                y_true = (_data.y - 1)
                acc = y_pred.eq(y_true).sum().item() / y_pred.shape[0]

                y_pred = y_pred.cpu().numpy()
                y_true = y_true.cpu().numpy()
                print("\t{} acc: {}".format(name, acc))
                # confusion matrix
                if name == 'test':
                    cm = confusion_matrix(y_true, y_pred)
                    class_accs = cm.diagonal() / cm.sum(axis=1)
                    print(classification_report(y_true, y_pred))

            loss_val = F.nll_loss(model(test_data), test_data.y - 1
            )
            fmt_log = "Epoch: {:03d}, train_loss:{:.4f}, val_loss:{:.4f}"
            print(fmt_log.format(epoch, loss, loss_val))
            print(">" * 50)
```

### Inference

- Việc sử dụng API của Torch-Geometric 1 phần khiến cho việc inference trên 1 ảnh (1 graph) gặp khó khăn hơn 1 chút. Ví dụ đoạn code inference trên tập test và visualize được mình định nghĩa như bên dưới: 

```python
test_output_fd = "/gdrive/MyDrive/workspace/data/sroie2019/test_output"
shutil.rmtree(test_output_fd)
if not os.path.exists(test_output_fd):
    os.mkdir(test_output_fd)

def make_info(img_id='584'):
    connect = Grapher(img_id, data_fd)
    G, _, _ = connect.graph_formation()
    df = connect.relative_distance()
    individual_data = from_networkx(G)
    img = cv2.imread(os.path.join(img_fd, "{}.jpg".format(img_id)))[:, :, ::-1]

    return G, df, individual_data, img

y_preds = model(test_data).max(dim=1)[1].cpu().numpy()
LABELS = ["company", "address", "date", "total", "other"]
test_batch = test_data.batch.cpu().numpy()
indexes = range(len(test_data.img_id))
for index in tqdm_nb(indexes):
    start = time.time()
    img_id = test_data.img_id[index]  # not ordering by img_id
    sample_indexes = np.where(test_batch == index)[0]
    y_pred = y_preds[sample_indexes]

    print("Img index: {}".format(index))
    print("Img id: {}".format(img_id))
    print("y_pred: {}".format(Counter(y_pred)))
    G, df, individual_data, img = make_info(img_id)

    assert len(y_pred) == df.shape[0]

    img2 = np.copy(img)
    for row_index, row in df.iterrows():
        x1, y1, x2, y2 = row[['xmin', 'ymin', 'xmax', 'ymax']]
        true_label = row["labels"]

        if isinstance(true_label, str) and true_label != "invoice":
            cv2.rectangle(img2, (x1, y1), (x2, y2), (0, 255, 0), 2)

        _y_pred = y_pred[row_index]
        if _y_pred != 4:
            cv2.rectangle(img2, (x1, y1), (x2, y2), (255, 0, 0), 3)
            _label = LABELS[_y_pred]
            cv2.putText(
                img2, "{}".format(_label), (x1, y1),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2
            )

    end = time.time()
    print("\tImage {}: {}".format(img_id, end - start))
    plt.imshow(img2)
    plt.savefig(os.path.join(test_output_fd, '{}_result.png'.format(img_id)), bbox_inches='tight')
    plt.savefig('{}_result.png'.format(img_id), bbox_inches='tight')
```

### Kết quả trên tập test

- 1 vài kết quả trên tập test, còn 1 số ảnh bị dự đoán nhầm trên từng text box nhưng nhìn chung kết quả thu được khá ổn:

![Imgur](https://i.imgur.com/bwGgoVM.png)

## Định nghĩa mô hình đơn giản với Pytorch

- Mô hình dưới đây được mô phỏng theo paper: [Semi-supervised classification with GCN](https://arxiv.org/abs/1609.02907). Tuy nhiên, mình có tùy chỉnh bằng việc thêm 1 số các module linear trong mô hình, code minh họa như bên dưới:

```python
class GraphConvolution(nn.Module):

    def __init__(
        self,
        input_dim,
        output_dim,
        dropout=0.2,
        bias=True,
        activation=F.relu,
    ):
        super().__init__()

        if dropout:
            self.dropout = dropout
        else:
            self.dropout = 0.0

        self.bias = bias
        self.activation = activation

        def glorot(shape, name=None):
            """Glorot & Bengio (AISTATS 2010) init."""
            init_range = np.sqrt(6.0 / (shape[0] + shape[1]))
            init = torch.FloatTensor(shape[0], shape[1]).uniform_(
                -init_range, init_range
            )
            return init

        self.weight = nn.Parameter(glorot((input_dim, output_dim)))
        self.bias = None
        if bias:
            self.bias = nn.Parameter(torch.zeros(output_dim))

    def forward(self, inputs):
        # node feature, adj matrix
        # D^(-1/2).A.D^(-1/2).H_i.W_i
        # with H_0 = X (init node features)
        # V, A
        x, support = inputs

        x = F.dropout(x, self.dropout)
        xw = torch.mm(x, self.weight)
        out = torch.sparse.mm(support, xw)

        if self.bias is not None:
            out += self.bias

        if self.activation is None:
            return out, support
        else:
            return self.activation(out), support

class LinearEmbedding(torch.nn.Module):

    def __init__(self, input_size, output_size, use_act="relu"):
        super().__init__()
        self.C = output_size
        self.F = input_size

        self.W = nn.Parameter(torch.FloatTensor(self.F, self.C))
        self.B = nn.Parameter(torch.FloatTensor(self.C))

        if use_act == "relu":
            self.act = torch.nn.ReLU()
        elif use_act == "softmax":
            self.act = torch.nn.Softmax(dim=-1)
        else:
            self.act = None

        nn.init.xavier_normal_(self.W)
        nn.init.normal_(self.B, mean=1e-4, std=1e-5)

    def forward(self, V):
        # V shape B,N,F
        # V: node features
        V_out = torch.matmul(V, self.W) + self.B
        if self.act:
            V_out = self.act(V_out)

        return V_out
        
class GCN(nn.Module):

    def __init__(self, input_dim, output_dim, hidden_dims=[256, 128, 64],
                 bias=True, dropout_rate=0.1):
        super().__init__()

        self.input_dim = input_dim
        self.output_dim = output_dim
        self.hidden_dims = hidden_dims
        self.bias = bias
        self.dropout_rate = dropout_rate

        gcn_layers = []
        for index, (h1, h2) in enumerate(
            zip(self.hidden_dims[:-1], self.hidden_dims[1:])):
            gcn_layers.append(
                GraphConvolution(
                    h1,
                    h2,
                    activation=None if index == len(self.hidden_dims) else F.relu,
                    bias=self.bias,
                    dropout=self.dropout_rate,
                    is_sparse_inputs=False
                )
            )

        self.layers = nn.Sequential(*gcn_layers)
        self.linear1 = LinearEmbedding(input_dim, self.hidden_dims[0], use_act='relu')
        self.linear2 = LinearEmbedding(self.hidden_dims[-1], self.output_dim, use_act='relu')

    def forward(self, inputs):
        # features, adj
        x, support = inputs
        x = self.linear1(x)
        x = F.dropout(x, p=self.dropout_rate)
        x, _ = self.layers((x, support))
        x = self.linear2(x)
        return x, support
```

### Mini-batch training on multiple unique graphs

- 1 vấn đề cần lưu ý nữa là việc training theo batch cho mô hình GCN với multiple unique graphs, tức nhiều graph độc lập với số lượng node trên đồ thị là khác nhau

![Imgur](https://i.imgur.com/e55naM1.png)

- Ta lần lượt kí hiệu:
    - $A$: adjacency matrix, ma trận kề của đồ thị
    - $X$: ma trận lưu giữ node feature ứng với từng nút trong đồ thị
    - $Y$: ma trận ứng với nhãn của từng nút (company, address, date, total, other)

- Đặc điểm của dạng dữ liệu đồ thị là số lượng nút (node), cạnh (edge) không cố định và đồ thị thường "thưa thớt" (sparse). Với dạng dữ liệu này, ta có thể thực hiện training theo batch theo phương pháp sau:

#### Contruct big diagonal matrix

- Cách thứ hai không cần padding mà sẽ thực hiện tạo 1 ma trận adjacency A mới là sự kết hợp của các ma trận $A_i$ con, độc lập theo đường chéo chính của ma trận A. Hơi khó giải thích 1 chút nhưng các bạn xem hình mô tả bên dưới sẽ dễ hiểu hơn

![Imgur](https://i.imgur.com/NUP0QJY.png)

- hay theo kí hiệu toán học 

![Imgur](https://i.imgur.com/jeXMJDv.png)

- Giả sử ta đang thực hiện 1 bài toán về graph classification. Khác với các bài toán thường gặp về node classification, graph classification yêu cầu phân loại 1 đồ thị độc lập vào các class cố định, không còn thực hiện ở node level nữa. Ví dụ với bài toán phân loại các loại đồ thị như ảnh minh họa gồm 8 loại đồ thị (bao gồm đồ thị tròn khép kín, đồ thị bánh xe, đồ thị bậc thang, ...), big adjacency sẽ được khởi tạo như ảnh và mô tả bên trên, ví dụ với batch_size = 4 ứng với việc "nối" 4 adj matrix của 4 đồ thị độc lập với nhau.

- Quay trở lại với bài toán về information extraction, mỗi hóa đơn (invoice) cũng sẽ ứng với 1 adjacency matrix độc lập, không hề liên quan đến nhau nên hoàn toàn có thể sử dụng cách thức bên trên để thực hiện training theo batch. Chỉ khác 1 chút là bài toán thực hiện là node classification, tức việc phân loại từng node (từng text block) vào 5 class bao gồm: company, address, date, total và other!

- Về batch training cho các đồ thị độc lập, các bạn có thể đọc thêm tại phần hướng dẫn của 2 thư viện Pytorch-Geometric và DGL:
    - [Advanced mini-batch training - Torch Geometric](https://pytorch-geometric.readthedocs.io/en/latest/notes/batching.html)
    - [Batched  Graph Classification with DGL](https://www.dgl.ai/blog/2019/01/25/batch.html)
    - https://github.com/tkipf/gcn/issues/4

- Ngoài ra, ta có ma trận kề A là 1 ma trận rất thưa thớt (sparse) nên thường được lưu giữ dưới các dạng "nén" như: CSR (Compressed sparse row), CSC (compressed sparse column) hoặc COO (coordinate list). Việc tạo các `big adjacency matrix` như mình vừa đề cập có thể tham khảo các hướng dẫn sau:
    - https://stackoverflow.com/questions/42154606/python-numpy-how-to-construct-a-big-diagonal-arraymatrix-from-two-small-array
    - Với dense matrix https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.block_diag.html
    - Với sparse matrix https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.block_diag.html
    - Reference: sparse matrix - https://en.wikipedia.org/wiki/Sparse_matrix

### Huấn luyện mô hình

- Phần huấn luyện mô hình cũng không quá khó khăn. Loss function sử dụng cho bài toán node classification là cross-entropy. Vì số lượng class `other` là lớn hơn rất nhiều so với các class khác, nên trong quá trình training mình còn thực hiện đánh thêm trọng số cho các class ít sample, giúp mô hình học tốt hơn. Ngoài ra, trong phần mô hình bên trên, mình cũng sử dụng thêm các layer Dropout để hạn chế overfit trong quá trình training mô hình.

- Có nhiều hướng xử lý với bài toán mất cân bằng dữ liệu, 1 cách đơn giản nhất là ta tác động vào loss function. Ví dụ cách đơn giản nhất là đánh thêm trọng số hoặc sử dụng các hàm loss thông dụng hơn cho bài toán imbalanced data như focal loss.

- Xây dựng các hàm utility

```python
def weight_mask(labels):
    label_classes = copy.deepcopy(LABELS)
    weight_dict = {}
    for k in label_classes:
        if k == "other" or k == 'invoice':
            weight_dict[k] = 0.8
        else:
            weight_dict[k] = 1.0
    tmp_list = []
    for arr in labels:
        index = np.argmax(arr)
        tmp_list.append(weight_dict[label_classes[index]])
    return np.array(tmp_list)

def weighted_loss(preds, labels, weight=None, class_weight=False, device='cuda'):
    """Softmax cross-entropy loss with weights."""
    if class_weight:
        if weight is not None:
            weight = torch.tensor(weight).float().to(device)
        loss = F.cross_entropy(preds, labels, reduction='none', weight=weight)
    else:
        # sample weight
        # https://discuss.pytorch.org/t/how-to-weight-the-loss/66372/3
        # https://discuss.pytorch.org/t/how-to-handle-imbalanced-classes/11264
        loss = F.cross_entropy(preds, labels, reduction='none')
        if weight is not None:
            weight = weight.float()
            loss *= weight
    loss = loss.mean()
    return loss

def load_single_graph(img_id):
    adj = scipy.sparse.load_npz(os.path.join(matrix_dir, img_id + "_adj.npz"))
    features = np.load(os.path.join(matrix_dir, img_id + "_feature.npy"), allow_pickle=True)
    labels = np.load(os.path.join(matrix_dir, img_id + "_label.npy"), allow_pickle=True)
    weights_mask = weight_mask(labels)
    return adj, features, labels, weights_mask

def cal_accuracy(out, label):
    "Accuracy in single graph."
    pred = out.argmax(dim=1)
    correct = torch.eq(pred, label).float()
    acc = correct.mean()
    return acc

def convert_sparse_input(adj, features):
    supports = preprocess_adj(adj)
    # coords, values in coord
    m = torch.from_numpy(supports[0]).long()
    n = torch.from_numpy(supports[1])
    support = torch.sparse.FloatTensor(m.t(), n, supports[2]).float()

    features = [
        torch.tensor(idxs, dtype=torch.float32).to(device)
        if torch.cuda.is_available()
        else torch.tensor(idxs, dtype=torch.float32)
        for idxs in features
    ]
    features = torch.stack(features).to(device)

    if torch.cuda.is_available():
        m = m.to(device)
        n = n.to(device)
        support = support.to(device)
    return features, support

def normalize_adj(adj):
    """Symmetrically normalize adjacency matrix."""
    adj = sp.coo_matrix(adj)
    rowsum = np.array(adj.sum(1))  # D
    d_inv_sqrt = np.power(rowsum, -0.5).flatten()  # D^-0.5
    d_inv_sqrt[np.isinf(d_inv_sqrt)] = 0.0
    d_mat_inv_sqrt = sp.diags(d_inv_sqrt)  # D^-0.5
    return (
        adj.dot(d_mat_inv_sqrt).transpose().dot(d_mat_inv_sqrt).tocoo()
    )  # D^-0.5AD^0.5

def sparse_to_tuple(sparse_mx):
    """Convert sparse matrix to tuple representation."""

    def to_tuple(mx):
        if not sp.isspmatrix_coo(mx):
            mx = mx.tocoo()
        coords = np.vstack((mx.row, mx.col)).transpose()
        values = mx.data
        shape = mx.shape
        return coords, values, shape

    if isinstance(sparse_mx, list):
        for i in range(len(sparse_mx)):
            sparse_mx[i] = to_tuple(sparse_mx[i])
    else:
        sparse_mx = to_tuple(sparse_mx)

    return sparse_mx

def preprocess_adj(adj):
    """Preprocessing of adjacency matrix for simple GCN model and conversion to tuple representation."""
    adj_normalized = normalize_adj(adj + scipy.sparse.eye(adj.shape[0]))
    return sparse_to_tuple(adj_normalized)

def convert_loss_input(y_train, weight_mask):
    train_label = torch.from_numpy(y_train).long()
    weight_mask = torch.from_numpy(weight_mask)

    if torch.cuda.is_available():
        train_label = train_label.to(device)
        weight_mask = weight_mask.to(device)
    train_label = train_label.argmax(dim=1)

    return train_label, weight_mask

def normalize_adj(adj):
    """Symmetrically normalize adjacency matrix."""
    adj = sp.coo_matrix(adj)
    rowsum = np.array(adj.sum(1))  # D
    d_inv_sqrt = np.power(rowsum, -0.5).flatten()  # D^-0.5
    d_inv_sqrt[np.isinf(d_inv_sqrt)] = 0.0
    d_mat_inv_sqrt = sp.diags(d_inv_sqrt)  # D^-0.5
    return (
        adj.dot(d_mat_inv_sqrt).transpose().dot(d_mat_inv_sqrt).tocoo()
    )  # D^-0.5AD^-0.5
```

- Chú ý, ta normalize Adjacency matrix đúng như trong công thức của GCN model, với:

$$
H^{i + 1} = f(H^{i}, A) = \sigma(A H^{i} W^{i}) = \sigma(D^{-1}A H^{i} W^{i}) 
$$

với Symmetric Normalization, đổi công thức thành

$$
\sigma(D^{-1}A H^{i} W^{i}) = \sigma(D^{-1/2}A D^{-1/2} H^{i} W^{i})
$$
với $H^{0} = X$

> Reference http://web.stanford.edu/class/cs224w/slides/08-GNN.pdf

> hoặc các bạn có thể đọc thêm tại bài hướng dẫn sau: [Graph Neural Network - A literature review and applications](https://viblo.asia/p/deep-learning-graph-neural-network-a-literature-review-and-applications-6J3ZgP0qlmB#_gcn-15)

-    Phần code thực hiện training mô hình

```python
# training model
for epoch in range(20):
    net.train()
    random.shuffle(train_ids)
    t1 = time.time()
    train_losses = 0
    train_accs = []

    batch_losses = []
    # simple training with batch_size = 1
    for img_index, img_id in tqdm.notebook.tqdm(enumerate(train_ids)):
        adj, features, train_labels, weight_mask_ = load_single_graph(img_id)
        features, support = convert_sparse_input(adj, features)
        train_labels, weight_mask_ = convert_loss_input(train_labels, weight_mask_)
        support = support.to(device)
        out = net((features, support))[0]
        loss = weighted_loss(out, train_labels, _class_weights, class_weight=True)

        train_losses += loss.item()
        batch_losses.append(loss.item())
        if img_index % 100 == 0:
            print("\ttrain loss: {:.5f} ".format(np.mean(batch_losses)))
            batch_losses = []

        acc = cal_accuracy(out, train_labels)
        train_accs.append(acc.item())

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    train_losses /= (img_index + 1)
    acc = np.mean(train_accs)
    t2 = time.time()
    print(
        "Epoch:",
        "%04d" % (epoch + 1),
        "time: {:.5f}, loss: {:.5f}, acc: {:.5f}".format(
            (t2 - t1), train_losses, acc.item()
        ),
    )
```

### Hậu xử lý

- Tập dữ liệu SROIE 2019 vẫn tồn tại 1 số trường hợp mà dữ liệu annotate chưa đúng, ví dụ như label của các text box. Điều này là khó tránh khỏi và dễ gây nhầm lẫn cho mô hình. Để hạn chế việc đó, mình có tiến hành hậu xử lý để hạn chế các case false-positive và lọc false-negative:
    - Với tất cả các text box trong ảnh, set 1 ngưỡng (threshold) để lọc bớt các case có confidence score không cao, ví dụ 0.7. Nếu thấp hơn threshold thì gán lại nhãn là `other`
    - Với tất cả các hóa đơn, chỉ tồn tại 1 text box với nhãn là `total` hoặc `date`. Vậy nên việc lấy output có xác suất lớn nhất ứng với từng text box có thể dẫn đến xuất hiện nhiều các text box của `total` / `date`. Đơn giản là ta sẽ lấy text box có confidence score cao nhất.
    - 1 số trường hợp, các text box bị dự đoán nhầm là `total` (ví dụ như các text-box với nội dung là `Total`, `Total Cost`,...) mà đáng lẽ phải là text box __số__ nằm cùng hàng bên phải. Việc dự đoán nhầm vậy cũng 1 phần do tập dữ liệu annotate không chính xác. Cách đơn giản nhất để xử lý case này là ta lấy text box có confidence score cao nhất, ứng với nhãn `total` và dóng sang phải, nếu tồn tại 1 text box khác thì gán lại label là `total` cho text box đó.

### Kết quả

- 1 số kết quả thu được sau khi training mô hình với Pytorch

![Imgur](https://i.imgur.com/UGCPntX.jpg)


# 1 số cách tiếp cận và hướng phát triển khác cho bài toán KIE

- Như hướng tiếp cận mình vừa có trình bày bên trên, việc sử dụng Adjacency matrix kèm theo node feature giúp chúng ta sử dụng được các thông tin về vị trí và texture của từng text box. Tuy nhiên, các bạn có thể tham khảo thêm 1 số các cải tiến từ các paper dưới đây:
    - Kết hợp graph embedding, text embedding, edge feature và Bi-LSTM - CRF để tiến hành phân loại các trường thông tin như trong paper __[GCN for multi-modal visual rich document](https://arxiv.org/abs/1903.11279)__
    - Kết hợp các thông tin của cả global context và local context như: ảnh, text embedding, vị trí,... để xây dựng và kết hợp nhiều loại feature với nhau. 1 số paper có thể kể tới như: __[LayoutLM](https://arxiv.org/abs/1912.13318)__, __[PICK](https://arxiv.org/abs/2004.07464)__, __[Attention-based GNN with Global Context](https://www.aclweb.org/anthology/2020.ccl-1.79)__
    - Sử dụng thêm các thông tin về text như: font size, font type để xây dựng font embedding cho từng text box như trong paper __[Robust-layout IE for VRD](https://arxiv.org/abs/2005.11017)__

# GCN libraries

- Dưới đây là 1 vài các thư viện về GNN các bạn có thể tham khảo thử, cá nhân mình thường dùng Pytorch-Geometric và DGL, Stellagraph cũng đã từng sử dụng nhưng API không được thân thiện lắm :(
    - [DGL](https://www.dgl.ai/)
    - [Stellargraph](https://github.com/stellargraph/stellargraph)
    - [TF-Geometric](https://github.com/CrawlScript/tf_geometric)
    - [Spektral](https://graphneural.network/)
    - [PGL](https://github.com/PaddlePaddle/PGL): 1 thư viện gần giống với DGL, nhưng được build trên framework PaddlePaddle (1 phiên bản Tensorflow của Trung Quốc :D)

# Kết luận

- Trên đây là bài chia sẻ về việc áp dụng mô hình Graph Neural Network vào 1 bài toán khá đặc thù là Key Informatrion Extraction. Hi vọng qua bài viết này sẽ giúp các bạn hiểu và có thể áp dụng vào các vấn đề tương tự. Đừng quên upvote và chia sẻ rộng rãi bài viết này tới mọi người nhé ^^

- Mọi ý kiến phản hồi và góp ý vui lòng comment bên dưới bài viết hoặc gửi mail về địa chỉ: hoangphan0710@gmail.com :D Hẹn gặp lại các bạn trong những bài viết sắp tới!

# Reference

- An Invoice Reading System Using a Graph Convolutional Network: https://link.springer.com/chapter/10.1007/978-3-030-21074-8_12
- Key-value extraction using GCN - Cinnamon: https://cinnamonai.medium.com/key-value-extraction-using-graph-key-value-68718e1a4036
- Nanonet-p1: https://nanonets.com/blog/information-extraction-graph-convolutional-networks/
- Nanonet-p2: https://nanonets.com/blog/id-card-digitization-deep-learning/#graph-neural-networks-and-digitization
- GCN on structure document for KIE: https://towardsdatascience.com/using-graph-convolutional-neural-networks-on-structured-documents-for-information-extraction-c1088dcd2b8f
- Attend, copy, parse: https://www.semanticscholar.org/paper/Attend%2C-Copy%2C-Parse-End-to-end-Information-from-Palm-Laws/12dde50826698bfb45b45d931c2b94ba0c576b27
- PICK https://www.semanticscholar.org/paper/PICK%3A-Processing-Key-Information-Extraction-from-Yu-Lu/c672c18acbb2198b9f173e698301ab2bd583e825
- CUTIE https://www.semanticscholar.org/paper/CUTIE%3A-Learning-to-Understand-Documents-with-Text-Zhao-Wu/024aea24cc4d0949d6fe1482591d2429a9d8bbeb
- TRIE https://www.semanticscholar.org/paper/TRIE%3A-End-to-End-Text-Reading-and-Information-for-Zhang-Xu/617f5151f59848d24fe971cf1cf6bb0caec65ea4
- Chargrid https://www.semanticscholar.org/paper/Chargrid%3A-Towards-Understanding-2D-Documents-Katti-Reisswig/15aae08159856cdbf0ce539357d473a04dcbb7f3
- BERTGrid: https://www.semanticscholar.org/paper/BERTgrid%3A-Contextualized-Embedding-for-2D-Document-Denk-Reisswig/e3006e148d24d6b51b86e265df103ab0c6deb653
- GCN https://www.semanticscholar.org/paper/Graph-Convolution-for-Multimodal-Information-from-Liu-Gao/04df8c70257b5280b9d303502c9d7ddf946f181b
- LayoutML https://www.semanticscholar.org/paper/LayoutLM%3A-Pre-training-of-Text-and-Layout-for-Image-Xu-Li/619ede371f9fb311c0ed764d0513a3a4cb77bed6
- Robust Layout IE: https://www.semanticscholar.org/paper/Robust-Layout-aware-IE-for-Visually-Rich-Documents-Wei-He/a03407e7e8a4530d9bb96672e425cfa067f92b76
- GraphIE: https://www.semanticscholar.org/paper/GraphIE%3A-A-Graph-Based-Framework-for-Information-Qian-Santus/1da8e1ad1814d81f69433ac877ef70caa950e4e6
- Attention-based GNN: https://www.semanticscholar.org/paper/Attention-Based-Graph-Neural-Network-with-Global-Hua-Huang/67ef78cc760008a874f22bc2e568fcdee22a9b35
- GFTE: https://www.semanticscholar.org/paper/GFTE%3A-Graph-based-Financial-Table-Extraction-Li-Huang/ba86c20ea740c728b80fd6b1965eb3cbb637aaec
- Table Detection: https://priba.github.io/assets/publi/conf/2019_ICDAR_PRiba.pdf
- Cardinal GCN: https://dl.acm.org/doi/pdf/10.1145/3395027.3419584
- discuss: https://news.ycombinator.com/item?id=21626025
- Information Extraction from Image using Deep Learning: https://github.com/bikash/DocumentUnderstanding