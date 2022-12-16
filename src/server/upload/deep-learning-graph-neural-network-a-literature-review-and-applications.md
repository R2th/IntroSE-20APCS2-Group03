__Nghiêm cấm Topdev và TechTalk reup dưới mọi hình thức!__ :pray:

Các nội dung chính sẽ được đề cập trong bài blog lần này

- Graph representation learning and application?
- 1 số lý thuyết đồ thị cơ bản
- 1 số bài toán điển hình của Graph Neural Network trong thực tế
    - Link Prediction
    - Node Classification
    - Community Detection
- Node Embedding - Graph Representation Learning
    - DeepWalk
    - Node2Vec
- Spectral vs Spatial Graph Neural Network
    - GCN
    - GraphSage (an inductive learning method)
- 1 số ứng dụng trong thực tế
- 1 số bài toán và hướng phát triển khác
- Hạn chế và lưu ý
- 1 số paper và nguồn tài liệu đáng chú ý
- Tài liệu tham khảo

# Graph representation learning and application?

- Chắc hẳn đối với những bạn đã tiếp xúc với ML, DL thì không còn xa lạ gì với những bài toán điển hình như:
    - Computer Vision: với dữ liệu chính là ảnh, video. Các bài toán như: Image Classification, Object Detection, Image Segmentation,...
    - NLP: với dữ liệu chính là từ (word), thường được biểu diễn dưới dạng sequence. Các bài toán như: Neural Machine Translation, Text Classification, Text Summarization, Topic Modeling,...
    - Sound: dữ liệu là các nguồn âm thanh, dễ dàng biểu diễn dưới dạng 1D hoặc 2D. Các bài toán như: TTS, STT, Sound Recognition, ...
    - ... và còn rất nhiều các loại dữ liệu khác nữa

- Tuy nhiên, cũng có rất nhiều bài toán và kiểu dữ liệu khác, chúng ta khó có thể biểu diễn dữ liệu với dạng 1D, 2D như thông thường, hay các dạng dữ liệu Non-Euclidean. Ví dụ như:
    - Dữ liệu mạng xã hội - social network
    - Liên kết trên mạng internet
    - Tương tác giữa các phân tử, nguyên tử - protein-protein interaction (PPI)
    - ....

![Imgur](https://i.imgur.com/FSJq5lx.png)

- Với những dạng dữ liệu đặc thù như vậy, cũng yêu cầu những mục tiêu khác nhau tùy nhu cầu của bài toán, ví dụ như:
    - Phân tích dữ liệu mạng xã hội để nắm bắt được các xu hướng của cộng đồng hiện tại, các nhóm đối tượng khách hàng
    - Các gợi ý kết bạn, follow các page trên nền tảng quen thuộc là facebook
    - Phân tích sự tương tác ở cấp độ phân tử, nguyên tử nhằm mục đích phục vụ cho các vấn đề về y sinh học, ví dụ phân tích tác dụng phụ của thuốc
    - Xây dựng các hệ thống gợi ý sản phẩm cho các trang web thương mại điện tử từ dữ liệu tương tác của người dùng
    - ....

![Imgur](https://i.imgur.com/N9QoKxa.png)

- Lấy 1 ví dụ trong Computer Vision, giả dụ với bài toán phân loại ảnh chó mèo - Cat-Dog classification

![Imgur](https://i.imgur.com/yCnJ2xr.png)

- 1 mô hình đã rất phổ biến là CNN được sử dụng. CNN gồm các kernel (hoặc filter) với kích thước cố định, có tác dụng giống như 1 cửa sổ trượt, từ trái sang phải, từ trên xuống dưới, nhằm mục đích trích rút ra được các đặc trưng từ 1 bức ảnh. Các kernel (filter) thực chất chính là trọng số của mô hình CNN sẽ được cập nhật dần trong quá trính training với backpropagation. Mỗi kernel có 1 giá trị riêng, học được các feature khác nhau từ bức ảnh, có kernel thì làm nổi bật các đường biên của đối tượng, có kernel thì làm nổi rõ từng vùng riêng biệt của bức ảnh, ...

![Imgur](https://i.imgur.com/R9kuSdo.png)

- Trong thực tế tồn tại rất nhiều dạng dữ liệu non-euclidean data. Nếu như trong bài toán xử lý ảnh dùng CNN, chúng ta sử dụng các filter cố định tổng hợp giá trị của các điểm pixel lân cận nhau thì trong __graph neural network__ cũng tương tự như vậy. Cũng là tổng hợp giá trị của các nút lân cận nhau. Tuy nhiên các nút trên đồ thị là không có thứ tự và số degree (hay số cạnh liên kết với từng nút) là không giống nhau!

![Imgur](https://i.imgur.com/f2LGHTz.png)

- Tương tự các bài toán về ML, DL khác, cách biểu diễn đơn giản nhất cho các nút và cạnh trên đồ thị là việc biểu diễn các nút / cạnh đó dưới dạng các vector embedding, tiếp đó sử dụng các embedding này cho các downstream task khác như node classification, graph clustering, ...

![Imgur](https://i.imgur.com/U1Ye0Od.png)

- Với ví dụ với 1 đồ thị như hình dưới, các nút trên đồ thị được ánh xạ sang 1 không gian vector mới qua 1 hàm f(x). 2 nút $u$ và $v$ trên đồ thị được coi là tương đồng với nhau nếu khoảng cách giữa 2 vector embedding $z_u$ và $z_v$ trên không gian mới là nhỏ

![Imgur](https://i.imgur.com/SHLFrDF.png)

# 1 số lý thuyết đồ thị cơ bản

- Trước khi đi sâu phân tích các bài toán và vấn đề đặc thù của GNN, chúng ta cùng ôn lại 1 chút kiến thức về lí thuyết đồ thị đã!

- 1 đồ thị được biểu diễn dưới dạng G = (V, E) với:
    - G là đồ thị được cấu thành
    - V là tập hợp các nút của đồ thì (vertices / node)
    - E là tập hợp các cạnh kết nối các nút của đồ thị (edge) 
    - $e_{ij} = (v_i, v_j) \in E$ là biểu diễn các cạnh $e \in E$ nối từ nút $v_i$ tới nút $v_j$ của đồ thị
    - Kí hiệu $N(v) = {u \in V | (v, u) \in E}$ là các nút kề $u$ (nút làng giềng có chung cạnh) với nút $v$

![Imgur](https://i.imgur.com/ZU5rHIH.png)

- Các thuật ngữ này là tương đương nhau khi biểu diễn các bài toán về đồ thị:
    - G(V, E) ~ System (Object, Interaction)
    - System ~ Network, Graph
    - Object ~ Node, vertices
    - Interaction ~ Link, Edges

- Adjacency matrix (ma trận kề) A, là 1 ma trận vuông kích thước nxn (với n là tổng số nút của đồ thị)
    - $A_{ij} = 1$ nếu $e_{ij} \in E$
    - $A_{ij} = 0$ nếu $e_{ij} \notin E$
    - Adjacency matrix (A) cũng được gọi là 1 weighted-matrix, thể hiện trọng số các cạnh của đồ thị. Với hình minh họa Adjacency matrix bên trên thì các cạnh có trọng số như nhau nhưng có thể thay đổi lại tùy bài toán và dữ liệu

- Degree matrix (ma trận bậc) D, là 1 ma trận đường chéo vuông nxn, chứa thông tin bậc của mỗi đỉnh, với
    - $D_{ii} = \sum^n_{i = 1} A_{ij}$
    - Chú ý rằng với đồ thị có hướng (direct matrix) thì bậc của từng nút chỉ tính các cạnh nối có chiều tới nút đó

- Identity matrix (ma trận đơn vị) I, là 1 ma trận đường chéo nxn, với các giá trên đường chéo chính = 1, còn lại = 0
    - $I_{ij} = 1$ nếu $i == j$, ngược lại = 0

- Laplacian matrix hay ma trận dẫn nạp L, với $L = D - A$

- Directed graph và undirect graph
    - Undirect graph hay ma trận vô hướng, khi cạnh nối giữa 2 đỉnh i và j là như nhau, hay $e_{ij} = e_{ji}$
    - Direct graph hay ma trận có hướng, có chiều xác định từ đỉnh $v_i$ tới $v_j$ và tồn tại liên kết cạnh $e_{ij}$

- Self-loop: nút gồm cạnh nối từ nó tới chính nó 

![Imgur](https://i.imgur.com/IG6bSVJ.png)

- Multi-graph: là các đồ thị với các cặp đỉnh kề nhau có nhiều hơn 1 cạnh nối liên kết giữa chúng

- Heterogeneous và homogeneous graph
    - __Homogeneous graph__: có thể hiểu là các đồ thị đơn, khi các nút  và cạnh của đồ thị chỉ biểu diễn duy nhất 1 đối tượng, ví dụ nút biểu diễn con người và cạnh biểu diễn những người là bạn bè với nhau  
    - __Heterogeneous graph__: hay multi-model graph, là các đồ thị có nút và cạnh thể hiện nhiều mối liên kết giữa các đối tượng với nhau, liên quan mật thiết tới 1 khái niệm rộng hơn là knowledge graph

![Imgur](https://i.imgur.com/mepMMXX.png)

- Bi-partite graph (đồ thị 2 phía): là 1 đồ thị khá đặc biệt, có thể phân các đỉnh thành 2 tập không giao nhau, tức không có cạnh nối 2 đỉnh bất kì thuộc cùng 1 tập.

![Imgur](https://i.imgur.com/zHJ8XTF.png)

- Mỗi nút trên đồ thị, tùy bài toán cũng sẽ có nhãn (label) ứng với từng nút. Ví dụ bạn đang xây dựng 1 bài toán phân loại thể loại của paper dựa trên các citation giữa các paper với nhau. Các nút là các paper, các cạnh thể hiện các paper có liên kết (citation) với nhau thì nhãn của nút có thể là: Computer Vision, NLP, Reinforcement Learning,...
- Node feature: các nút của đồ thị cũng có thể bao gồm các đặc trưng (hoặc feature) riêng của từng nút. Các đặc tính này hoàn toàn có thể được trích rút thêm từ các thông tin của nút đó. Ví dụ:
    - Với 1 bài toán social network, các nút trong mạng thể hiện 1 người, node feature là các đặc trưng như tuổi, giới tính, công việc, trình độ học vấn,...
    - Với 1 bài toán về phân loại topic cho document, các nút của đồ thị là các document, node feature có thể được biểu diễn đơn giản bằng 1 binary vector với số chiều bằng số lượng từ trong từ điển (hay vocab), ví dụ là 50.000 từ, với giá trị 1 thể hiện từ có xuất hiện trong từ điển và ngược lại. Hoặc có thể biểu diễn đơn giản hơn bằng cách sử dụng các mô hình language model hoặc word embedding để sinh được 1 feature vector ứng với từng từ hoặc từng đoạn, ví dụ mình có thể sử dụng 1 mô hình doc2vec để ánh xạ 1 document thành 1 vector 300D.
        - ...

- Với ma trận adjacency matrix (A) bên trên, 1 số điểm dễ nhận thấy rằng:
    - Ma trận A cũng thể hiện trọng số các cạnh của đồ thị
    - Đa số các trường hợp là 1 ma trận thưa (hay sparse matrix), hay tỉ lệ 1/0 trên toàn đồ thị là rất bé
    - Trong nhiều bài toán, để thuận tiện, ngoài việc sử dụng adjacency matrix thì người ta cũng sử dụng adjacency list để biểu thị cạnh nối giữa 2 đỉnh cho thuận tiện

Reference: https://towardsdatascience.com/graph-theory-and-deep-learning-know-hows-6556b0e9891b

# 1 số bài toán điển hình

### Link Prediction

![Imgur](https://i.imgur.com/bk6ZM4V.png)

- Là bài toán dự đoán xem 2 nút trong mạng có mối liên hệ hoặc có cạnh nối mới giữa 2 nút hay không.
### Node classification

![Imgur](https://i.imgur.com/0jC3Nh5.png)

- Là bài toán phân loại từng nút (node) trên đồ thị ứng với các nhãn (label) tương ứng, đây cũng là bài toán khá phổ biến nhất trong GNN

![Imgur](https://i.imgur.com/AixthQa.png)

### Clustering & Community detection

![Imgur](https://i.imgur.com/zkzsT2P.jpg)

- Là bài toán phân cụm cộng đồng hay graph clustering

# Node Embedding

- Nói về **Graph-based Learning**, trước hết ta cần nói về **Graph-based Embedding**, bao gồm 2 phân nhóm chính:
    - __Vertex Embedding (Node embedding)__: hay việc ánh xạ 1 nút trong đồ thị sang 1 không gian latent space khác với D-dims. Ta hoàn toàn có thể sử dụng các latent space này nhằm mục đích visualization, hay áp dụng vào các downstream task như: node classifition, graph clustering, ...
    - __Graph Embedding__: tương tự như trên, nhưng là việc ánh xạ cả 1 đồ thị / graph hoặc sub-graph thành 1 vector duy nhất, ví dụ như việc ánh xạ sang latent space của các cấu trúc phân tử để so sánh với nhau. Việc ánh xạ này sẽ liên quan nhiều tới các bài toán về graph/sub-graph classification

- Rất nhiều các giải thuật về graph-based learning (graph-based embedding, graph neural network) nói chung đều dựa trên giả định rằng các nút ở gần nhau sẽ có các đặc trưng về feature là gần giống nhau. Ví dụ việc bạn follow ai ở trên twitter cũng sẽ phần nào giúp ta đoán được rằng user đó quan tâm đến vấn đề gì trên mạng xã hội, có thể là các vấn đề liên quan đến học thuật như: machine learning, deep learning; hay các vấn đề về chính trị, tôn giáo, sắc tộc bằng việc follow các user liên quan,... Từ đó, các nhà phát triển sẽ dựa trên những mối liên hệ đó để thiết kế mô hình cho những mục đích riêng, ví dụ như: social network analysis, recommender engine,...

- 2 nút không kết nối trực tiếp với nhau vẫn có thể có những đặc điểm giống nhau, ví dụ điển hình nhất là trong bài toán về colaborative filtering trong recommender system. Khi 2 user A, B hoàn toàn không liên quan đến nhau, user A thích các sản phẩm P1, P2, P3, P4; user B thích các sản phẩm P1, P3, P4. Vậy nhiều khả năng rằng thói quen mua đồ của 2 user là khá giống nhau và hệ thống tiến hành gợi ý thêm cho user B sản phẩm P2, ... Hay ví dụ như hình dưới, nút 5 và 6 không connect trực tiếp với nhau nhưng có chung nhiều nút "làng giềng" nên giả định rằng 2 nút này sẽ khá giống nhau, tương đồng với nhau về mặt context

![Imgur](https://i.imgur.com/WEgRIAo.png)

### Random Walk là gì?

- Về Vertex Embedding (Node Embedding), trước tiên ta cần xem xét khái niệm Random-Walk là gì?

- Nếu các bạn đã từng làm việc với các bài toán về NLP trong ML, DL nói chung, chắc hẳn các bạn cũng biết tới 1 mô hình word embedding rất phổ biến và quen thuộc là Word2Vec. Về mặt lý thuyết mình xin phép không đề cập kĩ trong bài blog này, các bạn có thể tham khảo thêm tại các bài blog khác trên viblo như:
    - [Xây dựng mô hình không gian vector cho Tiếng Việt](https://viblo.asia/p/GrLZDXr2Zk0) - Quang Phạm 
    - [Lecture 2: Simple Word Vector representations: Word2vec](https://viblo.asia/p/gGJ59bNxKX2) - Quang Phạm
    - [Ứng dụng mô hình Word2vec cho bài toán session-based Recommender System?!](https://viblo.asia/p/Qbq5Q4YJlD8) - Phan Hoàng

![Imgur](https://i.imgur.com/BSketq8.png)

- Ý tưởng đơn giản của Word2Vec là xây dựng 1 mô hình có khả năng ánh xạ các từ sang 1 không gian vector mới và giả định rằng các từ thường xuất hiện cùng nhau, cùng 1 context sẽ có các embedding vector gần nhau (euclide distance, cosine distance,..). Word2Vec gồm 2 mô hình chính:
    - CBOW: sử dụng các context word để predict target word ở giữa (các từ trong ô xanh từ target word, ô trắng là context word)
    - Skip-gram: sử dụng target word để predict các context word xung quanh

### DeepWalk

- DeepWalk là 1 mô hình Node Embedding khá đơn giản, dựa trên ý tưởng chủ đạo từ Word2Vec, mà cụ thể là từ mô hình Skip-gram. Trong paper của DeepWalk có nói đến 1 thuật ngữ là Graph Sampling sử dụng random walk hay bước đi ngẫu nhiên trên đồ thị. Random walk đơn giản là việc chọn đi **ngẫu nhiên** tới các nút láng giềng trong đồ thị, kể cả bước đi tiếp theo có thể quay lại nút trước đó. Bằng việc sampling sử dụng random walk, ta đã chuyển dữ liệu từ 1 dạng cấu trúc phức tạp hơn là đồ thị (với rất nhiều nút và cạnh nối với nhau) sang dạng biểu diễn sequence 1D, tương tự như các chữ cái liên tiếp nhau trong 1 câu vậy. Các nút hiện tại được biểu diễn như các từ trong mô hình word2vec với độ dài câu (hay số bước nhảy của random walk) không cố định. Và ta có thể sử dụng luôn được mô hình Word2Vec để áp dụng trực tiếp lên dạng dữ liệu đồ thị này!

![Imgur](https://i.imgur.com/L3hGyxG.png)

- Ví dụ như ảnh trên, từ 2 đỉnh A và F, bước đi ngẫu nhiên với bước nhảy = 3 sẽ sinh ra các sequence như: A -> C -> F -> G, F -> G -> E -> D, ...

![Imgur](https://i.imgur.com/1C942Xv.png)

- Bằng cách đó, sau khi thực hiện training mô hình, mỗi nút trên mạng sẽ được biểu diễn bằng 1 embedding vector (ví dụ 128 chiều). Ta có thể sử dụng phần embedding này tiến hành visualize để xem tương quan giữa các nút với nhau, bằng các thuật toán giảm chiều dữ liệu như: t-SNE, UMAP, ... Hoặc sử dụng cho các downstream task cho các bài toán con, ví dụ việc sử dụng SVM để tiến hành phân loại các embedding vector vào các nhãn tương ứng (node classification). Ví dụ với mô hình DeepWalk trên tập dữ liệu karate club gồm 4 nhãn. Sau khi tiến hành visualize, có thể thấy các phân tách khá rõ ràng qua màu sắc 

![Imgur](https://i.imgur.com/nTNYlCM.png)

### Node2Vec

- Node2Vec cũng là 1 mô hình Node Embedding dựa trên ý tưởng của DeepWalk và Word2Vec. Điểm khác biệt của Node2Vec là ngoài việc sử dụng random walk như thông thường, mô hình giới thiệu thêm 2 thông số P và Q để điều chỉnh lại bước đi ngẫu nhiên trên đồ thị. 

![Imgur](https://i.imgur.com/qQRcSwg.png)

- Với $p$ (hay còn lại là return parameter) quy định khả năng quay lại 1 nút trước đó trên bước đi ngẫu nhiên. Với $p$ lớn thì ít có khả năng quay lại nút trước đó và ngược lại.  

- Với $q$ (hay còn lại là in-out parameter) quy định khả năng bước đi "gần" hay "xa" so với nút ban đầu. Với $q > 1$ thì bước đi ngẫu nhiên có xu hướng đi quanh quẩn nút ban đầu và ngược lại, đi ra xa khỏi nút ban đầu. 

- Ví dụ với việc sử dụng node2vec trước và sau khi áp dụng lên tập dữ liệu về persona data

![Imgur](https://i.imgur.com/2mo8sBp.png)

- 1 số các mô hình về Vertex Embedding các bạn có thể tham khảo thêm như: LINE (Line Large-scale Information Network Embedding), HOPE, ....

### Điểm hạn chế các các mô hình Vertex/Node Embedding nói chung

- Nhìn chung, các mô hình Node Embedding đều hướng đến việc ánh xạ các nút trong đồ thị sang 1 không gian vector mới, với các nút lân cận nhau, có context giống nhau sẽ ở gần nhau.

- Tuy nhiên, có 1 số vấn đề như sau:
    - Giả dụ với 2 mô hình DeepWalk và Node2Vec bên trên, đều dựa trên ý tưởng của Word2Vec. Nếu trong 1 bài toán có domain hẹp và ít có sự cập nhật trong mô hình thì không vấn đề gì nhưng đối với các nút mới (bao gồm các liên kết mới) trong đồ thị thì chúng sẽ được ánh xạ như thế nào? Bản thân model Word2Vec với những từ không có trong từ điển sẽ không có embedding vector biểu diễn cho từ đó.
    - Thứ hai, như ta đã bàn về 1 số các khái niệm chung trong đồ thị như bên trên. Hiện tại, ta mới chỉ sử dụng thông tin là các nút lân cận nhau để xây dựng mô hình, chứ chưa sử dụng các thông tin khác như node feature hay thuộc tính của từng nút trong đồ thị. Ví dụ, với 1 bài toán về social network analytic, ngoài các kết nối giữa người với người thì các thông tin bản thân của từng người như: giới tính, độ tuổi, trình trạng hiện tại, ... cũng vô cùng cần thiết. Các mô hình không có khả năng adapt, generalization tốt trên các unseen data được gọi là **tranductive learning method**, ngược lại là **inductive learning method**

- Trong phần tiếp, ta sẽ đề cập tới các mô hình thuở ban đầu của GNN cũng như các mô hình liên quan đến 2 khái niệm tranductive và inductive learning bên trên và hướng cải thiện

# Spectral vs Spatial Graph Neural Network

- Thực tế, các mô hình về graph neural network cũng đã được tìm hiểu từ khá lâu, trong khoảng thời gian 2014 tới nay thì mới dành được sự quan tâm nhiều hơn từ cộng đồng và được chia khá rõ ràng thành 2 phân lớp chính:
    - __Spectral Graph Neural Network__: liên quan đến các khái niệm về phân tách ma trận eigen-decomposition, eigenvector, eigenvalues,... Tuy nhiên, các phương pháp về spectral-based thường có chi phí tính toán khá lớn và dần bị thay thế bởi các phương pháp spatial-based
    - __Spatial Graph Neural Network__: là 1 phương pháp đơn giản hơn cả về mặt toán học và mô hình. Spatial-based method dựa trên ý tưởng việc xây dựng các node embedding phụ thuộc vào các node lân cận. 

![Imgur](https://i.imgur.com/CWE7bpl.png)

Reference https://ai.stackexchange.com/questions/14003/

# GCN

- Phần này sẽ đề cập tới mô hình GCN trong paper [Semi-Supervised Classification with Graph Convolutional Networks - 2016](https://arxiv.org/abs/1609.02907)

- Để đơn giản và dễ hiểu, ta định nghĩa 1 mô hình GCN như sau:
    - 1 đồ thị $G = (V, E)$
    - 1 ma trận adjacency matrix A nxn
    -  $X \in R^{n x d}$ là ma trận feature ứng với các nút của đồ thị, với $n$ là tổng số lượng nút và $d$ là số chiều của node feature. Node embedding như ta cũng đã đề cập ở trên, liên quan đến các thông tin của nút đó.

- Để dễ hình dung, chúng ta hãy làm 1 số ví dụ nhỏ như sau:

### Ví dụ 1

- Với 1 đồ thị vô hướng như hình dưới

![Imgur](https://i.imgur.com/hqi3fHm.png)

- Đồ thị gồm 6 nút từ A -> F. Để đơn giản, với mỗi nút sẽ được biểu diễn bằng 1 trọng số (hay ví dụ node embedding hiện tại của nút A = [0.1])

- Với giả định từ đầu rằng các nút lân cận nhau là gần giống nhau. Từ đó, ta thực hiện 1 phép toán đơn giản để tổng hợp lại thông tin của các nút lân cận của nút $v_i$ cụ thể, bằng cách lấy trung bình các giá trị của các nút lận cận + giá trị của nút $v_i$, ta thu được giá trị mới $p$, gắn giá trị mới $p$ này cho nút $v_i$. Đối với các nút khác cũng thực hiện tương tự trong 1 step. Các step kế tiếp cũng tiếp tục thực hiện phép toán vừa nêu với tất cả các nút trong mạng. Sau step 1, ta thu được các giá trị mới cho đồ thị như sau:

![Imgur](https://i.imgur.com/9Og45XV.gif)

![Imgur](https://i.imgur.com/di7HFmC.png)

- Thực hiện tương tự cho tất cả các nút trong step 2

![Imgur](https://i.imgur.com/sdcHiuL.png)

- Có thể thấy rằng, giá trị hiện tại của các nút trong mạng đã được điều chỉnh lại và san đều hơn giữa các nút, những nút gần nhau sẽ có giá trị gần nhau hơn, những nút có cấu trúc liên kết giống nhau như nút E và F đều nhận giá trị là giống nhau.

- Nếu gọi $A^{0}$ là giá trị nút A tại step 0, tương tự các với nút khác thì ta có công thức

![Imgur](https://i.imgur.com/9P7G1Po.png)

- Bằng phép thế, ta có

![Imgur](https://i.imgur.com/lGFtKYi.png)

- Có thể thấy rằng, với 2 step, giá trị hiện tại của nút A bị ảnh hưởng bởi các nút nằm trong phạm vi 2 bước nhảy tính từ nút A, bao gồm cả 5 nút còn lại. Nhưng nếu giả sử có 1 nút G nối độc lập với nút F chẳng hạn thì giá trị hiện tại của A chưa bị ảnh hưởng bởi nút G (vì 3 bước nhảy)

- Với phép toán tính trung bình (mean) bên trên, ta hoàn toàn có thể thay thế bằng 1 số phép toán khác, được gọi là aggregation function (sẽ được đề cập kĩ hơn tại mô hình GraphSage). Tóm lại, giá trị của $A_1$ sẽ được biểu diễn tóm gọn như sau

![Imgur](https://i.imgur.com/PWAM3wy.png)

![Imgur](https://i.imgur.com/p0M5orW.png)

![Imgur](https://i.imgur.com/q9XnC00.png)

- Với $N(v)$ là tập hợp các nút lân cận của nút $v$

### Ví dụ 2

- Ta có 1 đồ thị vô hướng gồm 6 nút và ma trận adj A như hình dưới (đồ thị này được mình tạo bằng thư viện [networkx](https://networkx.github.io/))

![Imgur](https://i.imgur.com/nMwDJzq.png)

- Kèm theo đó là node feature $x_i \forall x \in X$ ứng với từng nút trong đồ thị. Ở đây, mình định nghĩa ngẫu nhiên 1 ma trận X như bên dưới

![Imgur](https://i.imgur.com/1cO41zz.png)

- Và giờ hãy thực hiện phép nhân ma trận đơn giản AX, ta thu được 

![Imgur](https://i.imgur.com/oGfPhMG.png)

- Có thể dễ thấy rằng, giá trị ma trận 6x2 thu được hiện tại, với mỗi giá trị tại từng dòng là tổng tất cả các trọng số của các nút lân cận. Ví dụ với nút 0 liên kết với 3 nút 0, 1, 2 thì vector representation hiện tại của nút 0 ứng với 1 vector 1x2 = [6, -6] (với 1 * 1 + 1 * 2 + 1 * 3 = 6 và 1 * -1 + 1 * -2 + 1 * -3 = -6)

==> Qua 2 ví dụ đơn giản trên, có thể thấy rằng feature của từng nút bị ảnh hưởng bởi các nút lân cận trong đồ thị. Ta sẽ cùng bàn luận kĩ hơn mô hình __Graph Convolution Network__ tại phần bên dưới 

### GCN

- Paper: [GCN - Semi-Supervised Classification with Graph Convolutional Networks - 2016](https://arxiv.org/abs/1609.02907) được đề xuất bởi Thomas N. Kipf và Max Welling là 1 trong những paper về Graph Neural Network về Semi-supervised Node Classification được cite nhiều nhất

- 1 hidden layer của GCN có thể được biểu diễn như sau: $H^{i} = f(H^{i - 1}, A)$, trong đó:
    - $H^{i}$ biểu diễn đầu ra của layer thứ i + 1, mỗi layer $H^{i}$ tương ứng với 1 ma trận có kích thước $N$ x $F^{i}$. Với $F^{i}$ thể hiện số feature đầu ra của từng nút tại layer $H^{i}$
    - $H^{0} = X$, có trọng số được khởi tạo luôn là node feature của từng nút

- Trong đó, hàm f có thể được biểu diễn đơn giản bằng 1 công thức sau: $H^{i + 1} = f(H^{i}, A) = \sigma(A H^{i} W^{i})$, với:
    - $W^{i}$ là ma trận trọng số ứng với layer thứ $i$
    - $\sigma$ là 1 hàm kích hoạt phi tuyến tính (activation function), ví dụ hàm ReLU

- Nhưng với công thức hiện tại, có 2 điểm hạn chế như sau:
    - Dễ thấy rằng, bằng việc nhân thêm ma trận A, với từng nút, giá trị mà các nút lân cận contribute cho nút $v_i$ hiện tại đúng bằng tổng số feature của các nút đó nhưng chưa bao gồm nút $v_i$. Ta có thể khắc phục điều đó bằng cách "cộng thêm" identity matrix vào ma trận A, tức A = A + I
    - Với những nút có degree lớn (tức những nút liên kết với nhiều nút khác) thì chúng gây ảnh hưởng lớn hơn trong quá trình cập nhật trọng số của mô hình. 1 điều nữa, các khoảng giá trị hiện tại của A chưa hề được normalize, tức hoàn toàn có thể dẫn tới việc vanishing / exploding gradient trong quá trình backprop. Do đó, ta có thể normalize A bằng cách $D^{-1}A$, với D là degree matrix. Điều đó đồng nghĩa với việc lấy trung bình feature của các nút lân cận.

- Từ đó, công thức ban đầu được biến đổi thành

$$
H^{i + 1} = f(H^{i}, A) = \sigma(A H^{i} W^{i}) = \sigma(D^{-1}A H^{i} W^{i})
$$

- Trong paper, tác giả sử dụng Symmetric Normalization, đổi công thức thành

$$
\sigma(D^{-1}A H^{i} W^{i}) = \sigma(D^{-1/2}A D^{-1/2} H^{i} W^{i})
$$
với $H^{0} = X$

Reference http://web.stanford.edu/class/cs224w/slides/08-GNN.pdf

### Những nhược điểm / hạn chế của mô hình GCN truyền thống và hướng cải thiện

- Nhìn chung, mô hình GCN trong paper [Semi-Supervised Classification with Graph Convolutional Networks - 2016](https://arxiv.org/abs/1609.02907) được thiết kế khá đơn giản, tuy nhiên còn 1 vài hạn chế như sau:
    - **Memory requirement**: trọng số của mô hình vẫn được cập nhật qua từng epoch, nhưng với mỗi epoch được cập nhật theo full-batch gradient descent, không phải mini-batch gradient descent, tức việc cập nhật trên toàn bộ điểm dữ liệu cùng 1 lúc. Điều đó cũng hoàn toàn dễ hiểu bởi vì trong công thức cập nhật bên trên, mô hình vừa phải giữ toàn bộ trọng số và ma trận adjacency matrix A. Với 1 tập dữ liệu nhỏ như CORA dataset (2708 paper~node và 5429 citation / edge) thì không phải vấn đề nhưng với 1 tập dữ liệu lớn hơn với hàng triệu node và dense-adjacency matrix thì cách tiếp cận này hoàn toàn không phù hợp khi memory requirement là rất lớn!
    - **Directed edges and edge features**: mô hình hiện tại về GCN được công bố tại paper đang chưa sử dụng thêm các yếu tố khác như edge feature (adj matrix A hiện tại chỉ là binary matrix) và directed graph (tức ma trận có hướng). Hướng xử lý trong paper đang bị giới hạn với undirected graph (ma trận vô hướng).
    - **Limiting assumption**: việc cộng adjacency matrix A với identity matrix I để có thêm feature của chính nút đó. Cách làm này đang giả định rằng nút $v_{i}$ và các nút lân cận của $v_{i}$ đang contribute tới $v_{i}$ là như nhau, ta có thể nhân thêm 1 tham số $\lambda$ để điều chỉnh lại trọng số của nút $v_{i}$: $A = A + \lambda I$. $\lambda$ thực chất có thể là 1 trainable parameter, hiện trong paper fix cứng = 1 và tác giả cũng có đề cập thêm về thông số này tại mục 7.2 (limitations and future work).
    - **Transductive setting**: với những nút mới thêm vào đồ thị (kèm theo các liên kết mới), mô hình GCN có khả năng tổng quan hóa (generalization) rất kém với những nút mới đó và yêu cầu cần re-training để cập nhật lại mô hình!

# GraphSage (an inductive learning method)

- Vào năm 2017, 1 paper mới với tên gọi [**Inductive Representation Learning on Large Graphs - 2017**](https://arxiv.org/abs/1706.02216) hay GraphSage được đề xuất, với khá nhiều cải tiến về mặt mô hình so với paper [GCN - 2016](https://arxiv.org/abs/1609.02907). Có thể tóm gọn trong 1 số ý như sau:
    - An inductive learning method, tức GraphSage có khả năng tổng quát hóa tốt hơn với các unseen data
    - Vẫn dựa trên ý tưởng sinh các node embedding dựa trên các node lân cận. Trong paper GraphSage, tác giả đề cập tới việc thiết kế các hàm aggrerate nhằm tổng hợp lại thông tin từ các nút lân cận và đề xuất 3 hàm aggrerate tương ứng.
    - Mini-batch update gradient descent và là 1 spatial gnn method, khắc phục được hạn chế lớn nhất của GCN là việc cập nhật theo full-batch gradient descent

![Imgur](https://i.imgur.com/O3BAlgl.png)

- Tổng quan, mô hình GraphSage được xây dựng cũng dựa trên ý tưởng là tổng hợp thông tin từ các nút lân cận. Chi tiết giải thuật như sau:
    - Input: đồ thị $G = (V, E)$, các note feature $x_v \in X, \forall v \in V$, $\forall k \in {1, ..., K}$, với $K$ là số aggregator function được áp dụng liên tiếp nhau
    - Output: embedding vector $z_v \forall v \in V$

![Imgur](https://i.imgur.com/xE0gt8s.png)

- Ta có, $h^0_v = x_v$, và với từng aggre function thứ k, tại từng nút $v \in V$, ta tổng hợp thông tin từ các nút lân cận $u, \forall u \in N(v)$, thu được 1 vector biểu diễn $h^k_{N(v)}$. Các hàm aggre biểu diễn có thể sử dụng 1 số các hàm đơn giản như mean, pooling, ... hay thậm chí các mạng như lstm

- Với thông tin thu được tổng hợp từ các nút lân cận $h^k_{N(v)}$, ta tiến hành concat $h^k_{N(v)}$ với thông tin của nút $v$ tại step trước đó (k - 1). 

- Với vector mới vừa được concat, ta đưa qua 1 fully connected layer đơn giản với 1 hàm kích hoạt phi tuyến tính ở cuối, ví dụ ReLU. Đồng thời normalize $h^k_v, k \in K$

- Sau khi thực hiện tính toán qua K lần (K aggre function), ta thu được feature vector $z_v \equiv h^K_v, \forall v \in V$

- Ta có thể stack nhiều aggre function liên tiếp nhau với mong muốn mô hình sẽ sâu hơn và học được nhiều các abstract feature. Tuy nhiên, với dữ liệu đồ thị, việc stack quá nhiều aggre function cũng không đem lại khác biệt quá nhiều về mặt kết quả, thậm chỉ ảnh hưởng đến performance của mô hình. Thường ta sử dụng 1, 2 aggre function là đủ.

- Bằng việc thiết kế các hàm aggre function như vậy, trọng số của mô hình dần được cập nhật dựa trên thông tin các nút lân cận $u, \forall u \in N(v)$ của nút $v$. Khi đó, mô hình có khả năng tổng quát hóa tốt hơn (better generalization) với các điểm dữ liệu mới (unseen node). Với các unseen node mới như vậy, embedding vector được tạo ra dựa trên thông tin từ các nút lân cận của unseen node và từ chính node feature của nút đó. Giải thuật này có tính ứng dụng cao hơn, phù hợp với nhiều bài toán mà dữ liệu lớn hơn và thay đổi thường xuyên như: dữ liệu mạng xạ hội, dữ liệu các trang wikipedia được liên kết, dữ liệu từ các paper mới khi cite / reference tới các paper trước đó, hay dữ liệu người dùng upvote, clip hay follow user chính trên website Viblo này đây :D

### Aggregator functions

- Dữ liệu dạng đồ thị không có tính thứ tự, tương đối về vị trí như các dạng dữ liệu như sequence, image, ... nên giả định rằng các aggregator function được định nghĩa cũng phải có tính chất là symmetric (tức ít bị ảnh hưởng bởi hoán vị của các nút lân cận). Trong paper có đề cập tới việc sử dụng 3 aggregator function là __mean__, __pooling__ và __LSTM__

- Mean aggregator, là 1 non-parametric function và symmetric, đơn giản là việc lấy trung bình vector của các nút lân cận tại mỗi vị trí, hay element-wise mean operation. Việc thực hiện concat 2 vector trên đoạn pseudo code bên trên gần tương tự như 1 "skip connection" trong mạng redidual network.

- LSTM aggregator, là 1 parametric function. LSTM được thiết kế cho các bài toán dạng sequence, tức không phải symmetric. Tuy nhiên, trong paper có đề cập tới việc sử dụng các hoán vị ngẫu nhiên từ input là các nút lân cận. Kết quả thu được cũng khá khả quan so với các aggregator function khác

- Pooling aggregator, vừa là 1 parametric function và symmetric, được thiết kế theo công thức. Với $\sigma$ là activation function, $max$ là toán tử element-wise max-pooling operation

![Imgur](https://i.imgur.com/wh3Kf7f.png)

### Loss function

- Với bài toán supervised learning, đầu ra gồm các feature embedding $z_v$, ta có thể thiết kế thêm các layer, đơn giản như 1 mạng fully connected layer ở cuối, với số node đầu ra bằng số class, hàm loss function sử dụng là cross entropy

- Với bài toán un-supervised learnig, mặc dù không có label, nhưng với cách thiết kế từ mô hình, các node embedding thu được sau khi training hoàn toàn có thể được sử dụng lại ở các downstream task.

- Từ đó, hàm loss function được định nghĩa cho bài toán un-supervised learning như sau:

![Imgur](https://i.imgur.com/HvQbnee.png)

- Trong đó, $u$ và $v$ là 2 nút lân cận nhau, lân cận trong số bước đi ngẫu nhiên cố định đã xác định từ trước. $Q$ là tập hợp các cặp negative sample, tức 2 nút không lận cận nhau. $\sigma$ là sigmoid function.

- Dễ thấy rằng, việc tính loss là dựa vào các nút lân cận, tùy số bước trong bước đi ngẫu nhiên nên giúp mô hình có khả năng tổng quát hóa hơn trên toàn dữ liệu, và khi áp dụng cho các unseen node; khác hoàn toàn với việc huấn luyện embedding cố định cho từng node như các mô hình node embedding như DeepWalk hoặc Node2Vec. Đó chính là sự khác biệt lớn nhất giữa các mô hình tranductive learning (DeepWalk, Node2Vec) với các mô hình inductive learning như GraphSage.

# How to apply?

![Imgur](https://i.imgur.com/V5ADRKj.png)

- Reference: http://web.stanford.edu/class/cs224w/slides/07-noderepr.pdf

# 1 số ứng dụng trong thực tế

### PinSage - Pinterest Recommender Engine

- Pinterest là 1 mạng xã hội chia sẻ hình ảnh rất phổ biến. Nguồn thông tin trên Pinterest được xây dựng dựa trên các thông tin về pins và boards. Với pins tương tự như chức năng lưu / yêu thích ảnh từ người dùng, còn boards là tổng hợp các ảnh cùng 1 chủ đề, có liên quan đến nhau, được xây dựng bởi cộng đồng. Bài toán đặt ra với các kĩ sư Pinterest là làm sao để gia tăng lượng tương tác từ người dùng, bằng cách recommend các boards có liên quan khi người dùng thực hiện pin / save 1 bức ảnh nào đó

- Tập dữ liệu mà bên Pinterest lưu trữ tương đối lớn, khoảng 2 tỉ lượt pins và 1 tỉ các boards, với khoảng 18 tỉ connection (edge) giữa các pin và board. Nhiệm vụ của bài toán recommend là xây dựng được bộ node embedding cho các pins để từ đó tiến hành recommend các ảnh tương đồng hoặc các board có liên quan. Và bên Pinterest có kế thừa từ mô hình __GraphSage__ ta vừa bàn luận bên trên bằng cách xây dựng 1 bi-partite graph (đồ thị 2 phía) với 1 bên là các pins, 1 bên là các boards và liên kết giữa pins-boards

![Imgur](https://i.imgur.com/GLDSBNn.png)

- Với Node Embedding được khởi tạo ban đầu, các nhà phát triển bên Pinterest tận dụng các metadata từ nhiều kiểu dữ liệu khác nhau, từ cả ảnh và text để tạo các node embedding $x_i$ ban đầu ứng với từng node. Bên cạnh đó, trong paper PinSage còn đề cập tới các hướng improve khác như: __Producer consumer mini-batch construction__, __Efficient MapReduce Inference__, __Negetive Sampling Mining__, __Curriculum Training__, ...

- Trong quá trình thực hiện A/B test, đội ngũ bên Pinterest cũng thấy rằng hiệu năng của hệ thống được tăng lên đáng kể

![Imgur](https://i.imgur.com/FTkWN3I.png)

- Chi tiết về hướng áp dụng và cải thiện của PinSage, các bạn có thể tham khảo thêm tại các nguồn sau:
    - Paper [Graph Convolutional Neural Networks for Web-Scale
Recommender Systems](https://arxiv.org/abs/1806.01973)
    - Pinterest Engineering https://medium.com/pinterest-engineering/88795a107f48
    - [How Pinterest improved their recommendation system?](https://medium.com/@williamscott701/149cb35fdfa5)

### UberEat - user-based recommender engine

- [UberEat - Food Delivery with Uber](https://www.ubereats.com/) là 1 service cung cấp dịch vụ giao đồ ăn từ cửa hàng đến tận tay khách hàng một cách nhanh chóng và tiện lợi. Về mặt giải thuật recommender, bên Uber cũng dựa trên mô hình __GraphSage__ giống như bên Pinterest. Tuy nhiên, khác với bên Pinterest, Uber tiến hành tạo 2 bipartite graph. 1 cho liên kết user-dish, tức liên kết giữa user và các món ăn đã đặt trong quá khứ. Bipartite graph thứ 2 là liên kết user-restaurant, tức liên kết giữa user và các cửa hàng đã đặt món trong quá khứ.

- Mỗi bipartite graph sẽ được xây dựng để phục vụ cho 1 mục đích recommend riêng, ví dụ như ảnh gif bên dưới

![Imgur](https://i.imgur.com/IWbJMtd.gif)

![Imgur](https://i.imgur.com/kiM1Bkr.gif)

- Có 1 điểm chú ý trong cách xây dựng node embedding ban đầu. Vì các nút hiện tại bao gồm 3 thực thể khác nhau (user-dish-restaurant, còn ví dụ của pinterest bên trên là 2 thực thể pin-board) nên các nút sẽ có các initial embedding với số chiều khác nhau. Ta tiến hành cài đặt thêm 1 mạng MLP ứng với từng nút thực thể để quy về 1 node embedding với số chiều là cố định.

- Vì 1 user có thể đặt 1 món ăn nhiều lần hoặc đặt món ăn thường xuyên từ 1 số nhà hàng, nên trong phần loss function cũng tiến hành sửa đổi để re-ranking lại các nút trong đồ thị

- Bên Uber cũng tiến hành thực hiện A/B testing và cũng nhận được những cải thiện rất tốt từ hệ thống.

- Reference: https://eng.uber.com/uber-eats-graph-learning/

### Decagon - Heterogeneous Drug Side-Effect

- Drug Side-Effect có thể hiểu là những tác dụng phụ (tác dụng ngược) có ảnh hưởng thêm, không tốt đối với người sử dụng khi sử dụng thuốc hoặc nhiều loại thuốc kết hợp với nhau mà không có chỉ định rõ ràng từ bác sĩ. Vì cấu tạo thành phần các các loại thuốc rất phức tạp về cấu trúc phân tử nên sẽ gây khó khăn trong việc điều chế và sử dụng nhiều loại thuốc khác nhau. 

![Imgur](https://i.imgur.com/AXFbjjJ.png)

- Với dạng dữ liệu kiểu này, ta cũng hoàn toàn có thể sử dụng các mô hình GNN cho từng bài toán nhất định, ví dụ bài toán về chuẩn đoán tác dụng phụ khi sử dụng chung nhiều loại thuốc. 

![Imgur](https://i.imgur.com/LKgKTYz.png)

- Về mặt graph cũng được xây dựng phức tạp hơn 1 chút. Với các nút xanh là tên thuốc, các nút cam là thành phần cấu tạo kèm theo node embedding ứng với từng thành phần. Các cạnh bao gồm các tương tác giữa drug-gene, gene-gene và các side-effect giữa các loại thuốc với nhau

- Chi tiết về bài toán này, các bạn có thể tham khảo 1 open-source của stanford và Decagon tại link sau: http://snap.stanford.edu/decagon/

- 1 số các website về drug side effect information
    - https://www.drugs.com/sfx/
    - https://supp.ai/

### GCPN - Goal-directed generation

- Là bài toán graph generation hay việc sinh / hình thành các nút và cạnh mới trên đồ thị để tạo ra các kiến trúc mới. 1 bài toán dễ hình dùng là hình thành các cấu trúc phân tử dựa trên 1 số mục tiêu và điều kiện / quy tắc cho trước.

![Imgur](https://i.imgur.com/Kguf9zU.png)

![Imgur](https://i.imgur.com/9Yw3OfD.png)

- Từ đó, 1 hướng nghiên cứu mới là có thể áp dụng Reinforcement Learning với Graph Neural Network để tối ưu hóa các mục tiêu và điều kiện cho trước. 

![Imgur](https://i.imgur.com/hRPEKJX.png)

![Imgur](https://i.imgur.com/1FQAvDJ.png)

- Chi tiết các bạn có thể tham khảo thêm tại các đường link sau
    - https://cs.stanford.edu/people/jure/pubs/gcpn-neurips18.pdf
    - https://github.com/bowenliu16/rl_graph_generation
    - https://arxiv.org/abs/1910.07421
    - https://arxiv.org/abs/2006.12576

Reference http://web.stanford.edu/class/cs224w/slides/19-applications.pdf

# 1 số bài toán và hướng phát triển khác

- 3D Object Detection 
    - https://arxiv.org/abs/2004.01389
    - https://arxiv.org/abs/2003.01251

- OCR / Scene Text Detection
    - https://arxiv.org/abs/2003.07493

- NLP / Text Classification
    - https://arxiv.org/abs/1809.05679

- GAN
    - https://arxiv.org/abs/1912.01899

- VAE
    - https://arxiv.org/abs/1611.07308

- Feature Matching
    - SuperGlue https://arxiv.org/abs/1911.11763

- Action Recognition
    - https://arxiv.org/abs/2003.14111

- Pose Estimation
    - https://arxiv.org/abs/2004.00060

- Document Information Extraction
    - https://arxiv.org/abs/1906.01969
    - https://link.springer.com/chapter/10.1007/978-3-030-21074-8_12

- Scene Graph Generation
    - https://paperswithcode.com/task/scene-graph-generation

- Recommender System
    - https://arxiv.org/abs/2008.00404

- And many more...

Reference https://github.com/nnzhan/Awesome-Graph-Neural-Networks

# Hạn chế và lưu ý

### Non-injective neightbor aggregation & injective neightbor aggregation

- Trong nhiều trường hợp, việc sử dụng các aggre function như mean, max, .. khiến mô hình khó có thể phân biệt được các cấu trúc khác nhau, hay còn gọi là các non-injective aggre function. Trong paper về Graph Isomorphism Network có đề cập tới việc thiết kế mô hình để thu được các injective aggre function, các bạn có thể đọc thêm tại paper sau: https://cs.stanford.edu/people/jure/pubs/gin-iclr19.pdf)

![Imgur](https://i.imgur.com/OfcdwZQ.png)

### Adversarial Attack

- Là việc tấn công vào các nút hoặc cạnh của đồ thị để làm sai lệch kết quả dự đoán của mô hình. 1 số dữ liệu dạng đồ thị có thể dễ dàng bị tấn công như: credit card fraud detection, social recommendation, product recommendation, ....

![Imgur](https://i.imgur.com/ZJhYIjn.png)

- 1 số kiểu tấn công thường gặp như
    - Thêm / xóa / thay đổi các mối liên kết trên đồ thị (modify edge)
    - Thêm / xóa các nút trên đồ thị (node injection)
    - Thay đổi các feature hay node embedding của nút (modify feature)

![Imgur](https://i.imgur.com/Vh9b6Sh.png)

- Các bạn có thể tham khảo thêm tại paper sau: https://arxiv.org/abs/1805.07984

Reference: http://web.stanford.edu/class/cs224w/slides/18-limitations.pdf

# 1 số paper và nguồn tài liệu đáng chú ý khác

- 1 số paper mình nghĩ là nên / cần đọc sau khi đã nắm được các phần về Node Embedding (Random Walk, DeepWalk, Node2Vec, ..) và GNN (GCN, GraphSage, ..) đã đề cập ở trên

- GAT (Graph Attention Network)
    - Áp dụng thêm attention mechanism vào GNN
    - https://arxiv.org/abs/1710.10903
    - https://github.com/PetarV-/GAT

- ClusterGCN: An Efficient Algorithm for Training Deep and Large Graph Convolutional Networks
    - Cải thiện việc training trên các tập dữ liệu lớn bằng việc chia nhỏ graph thành các cluster và tiến hành node sampling trên tập các sub-graph đó
    - https://arxiv.org/abs/1905.07953
    - https://github.com/benedekrozemberczki/ClusterGCN

- GraphSaint: Graph Sampling Based Inductive Learning Method
    - Là 1 phương pháp __graph sampling based inductive learning__, cũng liên quan đến việc cải thiện việc training trên các tập dữ liệu lớn
    - https://arxiv.org/abs/1907.04931v4
    - https://github.com/GraphSAINT/GraphSAINT

- GIN (Graph Isomorphism Network) - HOW POWERFUL ARE GRAPH NEURAL NETWORKS?
    - Thiết kế các injective aggre function trong GNN
    - https://cs.stanford.edu/people/jure/pubs/gin-iclr19.pdf
    - https://github.com/weihua916/powerful-gnns

- 1 số các nguồn tài liệu là các khóa học và bài giảng hữu ích
    - __CS224W - Machine Learning with Graph__ http://web.stanford.edu/class/cs224w/
    - __Stanford - Representation Learning on Networks__ http://snap.stanford.edu/proj/embeddings-www/
    - __Learning and Reasoning on Graph for Recommendation__ https://next-nus.github.io/slides/tuto-cikm2019-public.pdf
    - __GNN - Models and Applications__ https://cse.msu.edu/~mayao4/tutorials/aaai2020/
    - Stanford - Deep Learning for Network Biology http://snap.stanford.edu/deepnetbio-ismb/
    - Stanford - Web search and Text mining https://cs.stanford.edu/~srijan/teaching/cse6240/spring2020/
    - Machine Learning for 3D data https://cse291-i.github.io/schedule.html

# Kết luận

- Phewww, cuối cùng thì mình cũng hoàn thành được bài blog khá dài này. Hi vọng qua bài blog này sẽ giúp các bạn hiểu hơn về các mô hình cơ bản của Graph-based Representation Learning. Mọi ý kiến phản hồi và đóng góp, các bạn có thể cmt bên dưới hoặc gửi mail về địa chỉ: hoangphan0710@gmail.com . Cảm ơn các bạn :bow: 

# Reference

- A comprehensive survey on Graph - paper https://arxiv.org/pdf/1901.00596.pdf
- Representation Learning on Networks - Stanford http://snap.stanford.edu/proj/embeddings-www/
- Representation Learning on Graph: Methods & Applications - paper https://www-cs.stanford.edu/people/jure/pubs/graphrepresentation-ieee17.pdf
- CS224W - Machine Learning on Graphs http://web.stanford.edu/class/cs224w/
- Machine Leanring on 3D data - course https://cse291-i.github.io/schedule.html
- Graph Neural Network - Models & Applications https://cse.msu.edu/~mayao4/tutorials/aaai2020/
- Graph Convolution Network - AI in plain english https://medium.com/ai-in-plain-english/graph-convolutional-networks-gcn-baf337d5cb6b
- Innovation in Graph Representation Learning https://ai.googleblog.com/2019/06/innovations-in-graph-representation.html
- Benchmarking Graph Neural Networks http://www.chaitjo.com/assets/BenchmarkingGNNs_ASTAR_Slides.pdf
- Convolutional Neural Networks on Graphs http://helper.ipam.ucla.edu/publications/dlt2018/dlt2018_14506.pdf
- GCN paper - semi-supervised classification https://arxiv.org/pdf/1609.02907.pdf
- GraphSage paper https://arxiv.org/pdf/1706.02216.pdf
- GraphSage explained https://dsgiitr.com/blogs/graphsage/
- Deep Graph Infomax paper https://arxiv.org/pdf/1809.10341.pdf
- GIN paper https://arxiv.org/pdf/1810.00826.pdf
- https://towardsdatascience.com/recommender-systems-the-most-valuable-application-of-machine-learning-part-1-f96ecbc4b7f5
- https://medium.com/stellargraph/knowing-your-neighbours-machine-learning-on-graphs-9b7c3d0d5896
- https://dsgiitr.com/blogs/gcn/
- Spectral cs Spatial GNN method https://ai.stackexchange.com/questions/14003/
- Spectral graph neural network explained https://towardsdatascience.com/spectral-graph-convolution-explained-and-implemented-step-by-step-2e495b57f801
- Learning and Reasoning on Graph for Recommendation System https://next-nus.github.io/slides/tuto-cikm2019-public.pdf
- PinSage (GraphSage-based) - Pinterest https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48
- PinnerSage - Multi-Model User Embedding RS https://medium.com/pinterest-engineering/pinnersage-multi-modal-user-embedding-framework-for-recommendations-at-pinterest-bfd116b49475
- UberEat (GraphSage-based) https://eng.uber.com/uber-eats-graph-learning/
- GCN - DGL framework https://docs.dgl.ai/en/latest/tutorials/models/1_gnn/1_gcn.html
- Exciting Applications of Graph Neural Networks https://blog.fastforwardlabs.com/2019/10/30/exciting-applications-of-graph-neural-networks.html

Code implementation
- DGL - GraphSage https://github.com/dmlc/dgl/blob/master/examples/pytorch/graphsage
- Pytorch-Geometric - GraphSage https://github.com/rusty1s/pytorch_geometric/blob/20e24f9e1df03c08b562995951ee5b48edf836ac/examples/unsup_sage_rw.py

__Nghiêm cấm Topdev và TechTalk reup dưới mọi hình thức!__ :pray: