- Trong bài blog hồi trước về [Xây dựng hệ thống gợi ý cho website Viblo](https://viblo.asia/p/xay-dung-he-thong-goi-y-don-gian-cho-website-viblo-YWOZrgLYlQ0), mình đã sử dụng mô hình LDA (Latent Dirichlet Allocation) để xây dựng 1 hệ gợi ý bài viết đơn giản cho website Viblo. Về tổng quan, mô hình cho phép đánh giá độ tương đồng thông qua phân phối về topic giữa các bài viết với nhau hay topic distribution. Một document (bài viết) chứa nhiều topic với trọng số tương ứng, mỗi topic cũng chứa nhiều các từ với các trọng số tương ứng, trọng số càng cao chứng tỏ mức độ quan trọng / đóng góp của topic / từ đó cho document / topic đó càng cao. Từ đó, sử dụng [Jensen Shannon](https://www.quora.com/How-does-Jensen%E2%80%93Shannon-divergence-criterion-work) để đánh giá độ tương đồng về topic distribution, sau đó query ra các bài viết tương đồng với nhau về mặt topic. Phần demo các bạn có thể xem tại phần cuối của  viết bên trên.
- Để tiếp tục series về __Recommender System__ (thực ra đây mới làm bài viết thứ 2 của mình về RS trên Viblo :D :D :D), hơn nữa mình cũng khá thích thú khi được tìm hiểu và làm các bài toán về RS, trong bài blog lần này, mình sẽ đề cập tới 1 phương pháp dựa trên session hay session-based recommender system ứng dụng mô hình Word2Vec?! Với 1 số bạn đã từng tiếp xúc với các mô hình Word Embedding như Word2Vec chắc hẳn cũng đang thắc mắc làm thế nào để áp dụng Word2Vec cho RS hay là khác biệt so với các cách tiếp cận Word2Vec cho __từ__ như thế nào? Mình sẽ cố gắng đề cập chi tiết và dễ hiểu nhất tại các phần bên dưới.

- Các phần nội dung chính sẽ được đề cập trong bài blog lần này:
    - Sơ lược về mô hình Word2Vec
    - Giới thiệu Word2vec cho bài toán Recommender System 
    - CBOW và Skip-grams model
    - Áp dụng cho bài toán Recommender System
    - Negative Sampling 
    - Đánh giá mô hình
    - Một số chú ý trong quá trình xây dựng mô hình
    - Kết luận

### Sơ lược về mô hình Word2Vec

- Word Embedding là việc biểu diễn các từ dưới dạng các vector số thực với số chiều xác định. __Word2Vec__ là 1 trong những mô hình đầu tiên về Word Embedding sử dụng mạng neural, vẫn khá phổ biến ở thời điểm hiện tại, có khả năng vector hóa từng từ dựa trên tập các từ chính và các từ văn cảnh... Về mặt toán học, thực chất __Word2Vec__ là việc ánh xạ từ từ 1 tập các từ (vocabulary) sang 1 không gian vector, mỗi vector được biểu diễn bởi n số thực. Mỗi từ ứng với 1 vector cố định. Sau quá trình huấn luyện mô hình bằng thuật toán backprobagation, trọng số các vector của từng từ được cập nhật liên tục. Từ đó, ta có thể thực hiện tính toán bằng các khoảng cách quen thuộc như euclide, cosine, mahattan, ,..., những từ càng "gần" nhau về mặt khoảng cách thường là các từ hay xuất hiện cùng nhau trong văn cảnh, các từ đồng nghĩa, các từ thuộc cùng 1 trường từ vừng, ... 

![](http://ruder.io/content/images/2016/10/synonym_antonym_projections.png)

- Trước khi có Word2Vec cũng có khá nhiều các phương pháp khác về Word Representation như:
    - Giảm kich thước ma trận đồng xuất hiện (Dimension Reduction, SVD, ..)

    ![](https://cdn-images-1.medium.com/max/1600/1*1p0geczj9KbJvwYi25B2Jg.png)

    - WordNet database 

    ![](https://www.codeproject.com/KB/string/semanticsimilaritywordnet/CarFork_Taxonomy.png)

    - Biểu diễn từ bằng One-hot encoding
    
    ![](https://cdn-images-1.medium.com/max/1200/1*YEJf9BQQh0ma1ECs6x_7yQ.png)
    
    nhưng các phương pháp trên đều có những điểm yếu nhất định: thiếu sắc thái, không biểu diễn được mối quan hệ giữa các từ, tốn nhiều công sức để thực hiện, kích thước embedding quá lớn, chi phí tính toán khá lớn với các phương pháp giảm chiều dữ liệu, ... Cụ thể hơn, các bạn tham khảo tại 1 bài viết khá chi tiết về Word2Vec của tác giả Quang Phạm: [Viblo - Xây dựng mô hình không gian vector cho Tiếng Việt](https://viblo.asia/p/xay-dung-mo-hinh-khong-gian-vector-cho-tieng-viet-GrLZDXr2Zk0) :100:

- Word2Vec bao gồm 2 cách tiếp cận chính, mình sẽ đề cập tại phần bên dưới, bao gồm:
    - CBOW model
    - Skip-gram model

- Mô hình chung của Word2Vec (cả CBOW và Skip-gram) đều dựa trên 1 mạng neural netword khá đơn giản. Gọi V là tập các tất cả các từ hay vocabulary với n từ khác nhau. Layer input biểu diễn dưới dạng one-hot encoding với n node đại diện cho n từ trong vocabulary. Activation function (hàm kích hoạt) chỉ có tại layer cuối là softmax function, loss function là cross entropy loss, tương tự như cách biểu diễn mô hình của các bài toán classification thông thường vậy. Ở giữa 2 layer input và output là 1 layer trung gian với size = k, chính là vector sẽ được sử dụng để biểu diễn các từ sau khi huấn luyện mô hình. 

![](https://i2.wp.com/adventuresinmachinelearning.com/wp-content/uploads/2017/07/Word2Vec-softmax.jpg?w=676&ssl=1)

- 1 điểm nữa, ta có 2 khái niệm quan trọng là: __target word (center word)__ và __context words__. Hiểu đơn giản là ta sẽ sử dụng từ ở giữa (target word hoặc center word) cùng với các từ xung quanh nó (context words) để mô hình thông qua đó để tiến hành huấn luyện:

![](https://cdn-images-1.medium.com/max/2600/0*1uA0SYcKU_dLTj-V.png)

cùng với đó, quy định 1 tham số c hay window là việc sử dụng bao nhiêu từ xung quanh, gồm 2 bên trái phải của target word, gần như cách biểu diễn theo n-grams cho từ vậy.

###  CBOW và Skip-grams model

![cbow-sg](https://www.researchgate.net/profile/Wang_Ling/publication/281812760/figure/fig1/AS:613966665486361@1523392468791/Illustration-of-the-Skip-gram-and-Continuous-Bag-of-Word-CBOW-models.png)

##### CBOW 

- CBOW model: ý tưởng chính của CBOW là dựa vào các context word (hay các từ xung quanh) để dự đoán center word (từ ở giữa). CBOW có điểm thuận lợi là training mô hình nhanh hơn so với mô hình skip-gram, thường cho kết quả tốt hơn với frequence words (hay các từ thường xuất hiện trong văn cảnh).

![](https://adriancolyer.files.wordpress.com/2016/04/word2vec-cbow.png?w=600)

![cbow](https://www.researchgate.net/profile/Tom_Kenter/publication/325451970/figure/fig2/AS:632023664300034@1527697592983/Graphical-display-of-the-word2vec-CBOW-architecture-where-the-input-sentence-is-all.png)

##### Skip-gram

![sg](https://adriancolyer.files.wordpress.com/2016/04/word2vec-skip-gram.png?w=600)

![](https://i0.wp.com/rwalk.xyz/wp-content/uploads/2018/08/word2vec-arch.png?resize=724%2C724&ssl=1)

- Còn skip-gram thì ngược lại với CBOW, dùng target word để dự đoán các từ xung quanh. Skip-gram huấn luyện chậm hơn. Thường làm việc khá tốt với các tập data nhỏ, đặc biệt do đặc trưng của mô hình nên khả năng vector hóa cho các từ ít xuất hiện tốt hơn CBOW.

### Word2vec với bài toán Recommender System 

- Một số cách tiếp cận khi sử dụng Word Embedding và ứng dụng NLP cho bài toán Recommender System:
    - __Fuzzy Search__: giả sử khi bạn google, ví dụ khi bạn search: `tà liệu về recommenderrr system cho newbiee`, rõ ràng là bạn gõ sai từ nhưng google sẽ tự động gợi ý với câu đúng: `Showing results for: tài liệu về recommender system cho newbie`. Khoảng cách thường được sử dụng là [khoảng cách Levenshtein](https://en.wikipedia.org/wiki/Levenshtein_distance), dựa trên số lần thay đổi ít nhất (thêm, xóa, thay thế) để biến 1 từ A thành 1 từ B, càng ít lần thay đổi thì khoảng cách giữa 2 từ càng nhỏ. Về thư viện python thì các bạn tham khảo [https://github.com/seatgeek/fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy), trước mình cũng đã từng dùng thư viện này cho 1 project recommend về sách hồi trước. Hoặc gợi ý các từ khóa có liên quan đến từ tìm kiếm sử dụng Word2Vec.
    - __Word Similarity hoặc Document Similarity__: sử dụng các mô hình liên quan đến Word Embedding hoặc Document Embedding để xử lí các task cụ thể. Với word thì có khá nhiều các mô hình như: Word2Vec (CBOW, skip-gram), Glove, FastText, ... sử dụng như là bộ pretrain word embedding ban đầu cho các bài toán sử dụng mạng NN, ví dụ: sentiment analysis, toxic classification, .... Với document thì có thể lấy trung bình vector các từ trong document để sinh 1 document embedding, từ đó recommend ra các document tương tự nhau. 1 cách tiếp cận khác các bạn có thể tìm hiểu thêm là: [Doc2Vec](https://github.com/topics/doc2vec)
    - Các mô hình liên quan đến __Topic Modeling__ như: LSI (TF-IDF + SVD), LDA, pLDA, LDA2Vec, ... Trong đó, bài blog trước đây của mình về viblo recommender system là sử dụng thuật toán LDA (Latent Dirichlet Allocation). Các bạn tham khảo tại: [Xây dựng hệ thống gợi ý cho website Viblo](https://viblo.asia/p/xay-dung-he-thong-goi-y-don-gian-cho-website-viblo-YWOZrgLYlQ0)
    - vân vân và mây mây ... :P 

- Về bản chất, như các bạn cũng đã thấy, Word2Vec được xây dựng dựa trên giả thiết rằng các từ hay xuất hiện cùng nhau trong nhiều ngữ cảnh sẽ gần tương đương nhau về mặt ý nghĩa / ngữ nghĩa hay cùng thuộc 1 trường từ vựng sẽ gần nhau hơn so với các từ khác. Đối với CBOW là sử dụng các từ xung quanh (dựa trên window) để dự đoán từ ở giữa, hay đối với Skip-gram thì sử dụng 1 từ để dự đoán các từ xung quanh (hay ngữ cảnh):

![](https://www.samyzaf.com/ML/nlp/word2vec2.png)

- Tổng quan về session-based recommender system (ở đây áp dụng Word2Vec model): hiểu đơn giản là phương pháp sẽ được thực hiện trên các tập dữ liệu dạng __sequence__, dạng __context__ liền kề nhau được quy định bởi dấu thời gian. Ví dụ: bạn xây dựng 1 hệ thống recommend bài nhạc thì dữ liệu của bạn có sẽ là dữ liệu lịch sử là 1 chuỗi các bài nhạc được nghe liên tiếp với nhau của người dùng đó, với giả thiết rằng các bài nhạc được "chọn" phát liền kề nhau là các bài có mức độ quan tâm từ người dùng gần tương đương nhau, từ đó mô hình có khả năng __"tổng quát hóa"__ trên tập dữ liệu lớn __N__ người dùng và thực hiện recommend.

![](https://cdn-images-1.medium.com/max/2400/1*qDtNbazlYcWSAZk9Q0DNXg.png)

hoặc 1 ví dụ khác: bạn xây dựng 1 hệ thống recommend sản phẩm (item) cho 1 trang thương mại điện tử (eCommerce). Khi đó, dữ liệu bạn có sẽ là các clicking session xem chi tiết từng sản phẩm của từng người dùng, kèm theo đó là dữ liệu về searching, check-out, ... Giả sử 1 người dùng khi tiến hành truy cập vào trang web sẽ có 1 session_id nhất định ứng với phiên làm việc đó. Lúc đó, bất kì khi nào người dùng thực hiện click để xem 1 sản phẩm cụ thể, hệ thống đều thực hiện logging lại. Mỗi session cụ thể sẽ ứng với 1 dây các sản phẩm được click liên tiếp (theo thời gian), với giả định rằng các sản phẩm được chọn "gần nhau" đó sẽ là các sản phẩm nhận được mức độ quan tâm từ người dùng tương đương nhau, hoặc các sản phẩm thường được mua cùng nhau sẽ đi liền với nhau (ví dụ khi bạn mua bếp ga thì gợi ý thêm về máy hút mùi chẳng hạn, mua cái áo A này thì thường được mua kèm cùng với cái chân váy B chẳng hạn, ,...).

- Vậy cụ thể hơn là gì? Mình sẽ dựa trên ví dụ về __music session__ bên trên. Khi áp dụng Word2Vec cho dữ liệu này, ta coi các bài nhạc trung tâm là các từ trung tâm (center words hay target words) trong mô hình Word2Vec, các bài nhạc được phát liền trước và liền sau được coi như là các từ xung quanh (context word). Khi sử dụng phương pháp này, giống như Word2Vec, các bài nhạc hay được phát cùng nhau sẽ có chung các đặc điểm mà người dùng đó thích hoặc mức độ quan tâm tương đương. Khi áp dụng lên 1 tập dữ liệu đủ lớn gồm N người dùng, mô hình có khả năng __"tổng quát hóa"__ và recommend bài hát phù hợp nhất.

- Mô hình ở đây mình sử dụng là __Skip-gram__ model, thay vì CBOW. Dưới đây là 1 vài lí do lựa chọn __Skip-gram__:
    - Skip-gram sẽ làm việc tốt hơn với các item ít xuất hiện mặc dù việc huấn luyện mô hình sẽ chậm hơn so với CBOW. Theo nguyên lí [Pareto](https://en.wikipedia.org/wiki/Pareto_principle), đối với Recommender System, 80% lợi nhuận đến từ 20% số sản phẩm phổ biến. Số lượng bài nhạc thì rất nhiều nhưng số lượng bài hát được nghe thường xuyên có thể chỉ chiếm 20% tổng số bài hát.
    - CBOW sử dụng các từ xung quanh để dự đoán từ ở giữa. Lúc đó, các context vector được lấy trung bình trước khi thực hiện predict target word, còn skip-gram thì ko như vậy. Từ đó, CBOW có xu hướng vector hóa cho các từ ít xuất hiện kém hơn so với skip-gram.
    - Model skip-gram còn sử dụng thêm 1 kĩ thuật nữa gọi là __negative sampling__. Lí do: việc layer cuối cùng có size bằng vocabulary size và phải tính giá trị hàm softmax tại đó trên toàn bộ tập các từ khiến việc tính toán lâu hơn và không cần thiết. Khi đó, chọn ngẫu nhiên n từ để tính toán thay vì tính toàn bộ.
    - Reference: [https://code.google.com/archive/p/word2vec/](https://code.google.com/archive/p/word2vec/) và [https://stats.stackexchange.com/questions/180548/why-is-skip-gram-better-for-infrequent-words-than-cbow](https://stats.stackexchange.com/questions/180548/why-is-skip-gram-better-for-infrequent-words-than-cbow)

- Cách tiếp cận theo session-based áp dụng Word2Vec này còn được gọi là __Item2Vec__ hoặc __Prod2Vec__.

### Word2Vec với Negative Sampling

- Với skip-gram model, ta dùng center word để dự đoán các context word. Ta có công thức hàm softmax tại layer cuối như sau:

$$
p(c|w;\theta) = \frac{e^{v_c.v_w}}{\sum_{c^{'} \in C}e^{v_{c^{'}}}.e^{v_w}}
$$

với $w$ đại diện cho từ input, $c$ đại diện cho các từ xung quanh của $w$ (hay context). $v_c$ và $v_w$ $\in$ $\mathbb{R^d}$ là các vector biểu diễn cho các từ $c$ và $w$. $C$ là tập hợp tất cả các từ context có thể có hay tập hợp tất cả các từ. 

- Maximum tỉ lệ trên đảm bảo các từ xuất hiện gần nhau trong cùng ngữ cảnh sẽ gần nhau hơn so với các từ khác. Tuy nhiên, 1 hạn chế của Word2Vec đó chính là output là layer với size bằng với độ lớn của vocabulary, nên việc tính toán softmax qua toàn bộ các từ rất tốn kém và không cần thiết. __Negative Sampling__ được đề xuất để giải quyết vấn đề đó, thay vì tính toàn bộ, ta chọn ngẫu nhiên 1 số từ trong context $c^{'}$ để làm từ $negative$, các từ context xung quanh $w$ được coi là $positive$. Ví dụ cho đoạn văn sau:

![](https://i.stack.imgur.com/nnnQX.png)

kết quả mô hình giả định rằng các từ context c như: `The, widely, popular, algorithm, was, developed`, .. sẽ gần với từ $w$ `Word2vec` hơn là __1 số từ được chọn ngẫu nhiên__ từ vocabulary như: `produce, software, Collobert, margin-based, probabilistic`, ... thay vì việc phải tính trên toàn bộ tập các từ, khiến việc huấn luyện mô hình nhanh hơn nhiều. Với từ $w$, ta sẽ dùng nó để predict các context words, và thực ra là không khác gì 1 bài toán multi-class classification với N class (N là tổng số từ trong vocabulary). Hiển nhiên, N thường là 1 con số rất lớn.

- Việc __negative sampling__ làm là chuyển bài toán của ta từ multi-class classification thành bài toán binary classification. Giả sử ta có 1 cặp từ context (w, c), điều ta cố gắng thực hiện là tăng xác suất xuất hiện của cặp "positive" (w, c) và giảm xác suất xuất hiện của cặp "negative" (w, s) được chọn bất kì, với s là từ không hề nằm trong bất kì window nào của center word $w$. Từ đó, ta cố gắng maximum hàm sau:

$$
J = \sum_{(w, c) \in D}  log {\sigma}(v_c.v_w) + \sum_{(w, s) \in D^{'}} log {\sigma}(-v_s.v_w)
$$

với định nghĩa $\sigma(x) = \frac{1}{1 + e^{-x}}$. $D$ là tập các cặp $positive$, $D^{'}$ là tập các cặp $negative$ được chọn ngẫu nhiên.

- Chi tiết hơn về mặt toán học, bạn đọc có thể xem thêm tại paper: [Word2Vec Explained](https://arxiv.org/pdf/1402.3722.pdf)

- Việc coi các từ xung quanh từ $w$ là $positive$ và chọn ngẫu nhiên 1 số từ khác là $negative$, bằng việc lấy mẫu random nên phương pháp này gọi là negative sampling là vì vậy. Theo như paper gốc Word2Vec của tác giả `Tomas Mikolov`, với những tập dataset bé, ta lấy mẫu khoảng 5-20 từ negative, với tập dataset lớn, lấy mẫu khoảng 2-5 từ negative.

### Áp dụng cho bài toán Recommender System

- Dataset: về nguồn dữ liệu để kiểm thử mô hình thì các bạn có thể tham khảo 1 số dataset sau:
    - [Yoochoose Dataset](https://2015.recsyschallenge.com/): dataset khá lớn, được public trên trang chủ của hội nghi RecSys Challenge 2015.
    - [Music Session Dataset - Lastfm](http://www.dcs.gla.ac.uk/~daniel/spud/): dataset gồm hơn 3.4m bản ghi từ Lastfm về lịch sử nghe nhạc của gần 100 người dùng.
    - ....

- Xử lí dữ liệu: dữ liệu cũng không cần xử lí quá nhiều, được lưu vào sqlite, gồm 1 số bảng dữ liệu như sau:

```python
import sqlite3

spud = sqlite3.connect(DATA_PATH)
cur = spud.cursor()
cur.execute('SELECT name FROM sqlite_master WHERE type="table";')
cur.fetchall()

# output
[('artists',),
 ('sqlite_sequence',),
 ('albums',),
 ('tracks',),
 ('lastfmusers',),
 ('lastfmplaylists',),
 ('lastfmplayliststracks',),
 ('lastfmtracklistens',)]
```

- Thực hiện join các bảng tại các trường tương ứng của từng bảng:

```python 
dataset = pd.read_sql('SELECT \
    l.user AS user_id, \
    l.date AS listen_date, \
    t.trackid AS track_id, \
    t.title AS track_title, \
    a.artistid AS artist_id, \
    a.name AS artist_name, \
    m.albumid AS album_id, \
    m.name AS album_name, \
    m.artist AS album_artist \
  FROM lastfmtracklistens AS l \
  INNER JOIN tracks t ON l.track = t.trackid \
  INNER JOIN artists a ON t.artist = a.artistid \
  INNER JOIN albums m ON t.album = m.albumid;', con=spud)
  
  print(dataset.shape)
  
  # output
  (3480460, 9)
```

- Cùng nhìn qua dữ liệu 1 chút:

```python
dataset.sample(10)
```

![Imgur](https://i.imgur.com/oCD9Dxy.png)

- Thực hiện format lại trường datetime và sắp xếp theo chiều thời gian:

```python
dataset['listen_date'] = dataset['listen_date'].apply(lambda s: datetime.datetime.strptime(s, '%Y-%m-%d %H:%M:%S+00:00'))
dataset.sort_values('listen_date', ascending=True, inplace=True)
```

- Phân bố dữ liệu tại trường `track_id`:

```python
_ = plt.hist(dataset["track_id"].value_counts().values, bins=50, range=(0, 50))
```

![Imgur](https://i.imgur.com/vwGRA9P.png)

có thể thấy là số lượng các track được nghe dưới 10 lần khá chiều, chiếm đa số.

- Lấy `track_id` sau từng `user_id` cụ thể (về thực tế không cần quan tâm user là ai)

```python
start = time.time()
sessions = []
for user_id, df in dataset.groupby('user_id', sort=False):
    session = []
    for index, row in df.iterrows():
        session.append(str(row['track_id']))
  
    sessions.append(session)
    
print("Took {}'s".format(time.time() - start))

# output
Took 378.7666292190552's

print(sessions[0])
# output
['422042', '51739', '422041', '422040', '243084', '53998', '422039', '138183', '422038', '58410', '...']
```

- Thật ra dữ liệu này mình cảm giác không được "thật" lắm, 3.4 triệu log mà có mỗi 90 người dùng :v nên đoạn này mình tách thành các nhóm `n-gram` theo n track_id liên tiếp được nghe bời cùng 1 user. Coi đó như là 1 user trong 1 phiên làm việc với `session_id` cụ thể, nghe nhiều các bài hát với `track_id` cụ thể.

```python
def make_ngrams(session, n=5):
    return list(zip(*[session[i:] for i in range(n)]))
```

ví dụ

```python
make_ngrams(sessions[0], n=5)

# output
[('422042', '51739', '422041', '422040', '243084'),
 ('51739', '422041', '422040', '243084', '53998'),
 ('422041', '422040', '243084', '53998', '422039'),
 ('422040', '243084', '53998', '422039', '138183'),
 ('243084', '53998', '422039', '138183', '422038'),
 ('53998', '422039', '138183', '422038', '58410'),
 ('422039', '138183', '422038', '58410', '246234'),
 ('138183', '422038', '58410', '246234', '67'),
 ....]
```

chú ý đây chỉ là 1 cách làm đơn giản để mình fake dữ liệu trông "có vẻ" thật hơn, nếu các bạn có dữ liệu thật về lịch sử nghe nhạc của người dùng thì kết quả thu được sẽ thật và tốt hơn nhiều. Không cần biết user đó là ai, không cần độ dài mỗi session là như nhau (số bài hát nghe trong 1 session), mà chỉ cần quan tâm với 1 user_id hoặc session_id nhất định tương tác với n item_id nhất định.

- Thực hiện tạo 1 list các list chứa các `track_id` đã nghe trong 1 `session_id`

```python
gen_sessions = []
for session in sessions:
    gen_sessions.extend(make_ngrams(session, 11))

print(len(gen_sessions))
# output
3479560
```

- Logging model trước lúc training:

```python
import logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logging.root.level = logging.INFO
```

- Training mô hình 

```python
model = Word2Vec(
    gen_sessions,
    size=32,            # Vector dimensions
    window=5,           # Sliding window size
    sg=1,               # Use the skip gram model
    hs=0,               # Use negative sampling
    negative=20,        # Number of negative samples
    ns_exponent=-0.5,   # Unigram distribution's exponent
    sample=1e-4,        # Subsampling rate
    workers=(2 * multiprocessing.cpu_count() + 1),
    iter=5
)
model.save("music_session.model")
```

- Vậy là xong. Tiến hành tìm các `track` tương tự nhau cũng như các từ trong model Word2Vec vậy. Trong gensim thì các bạn dùng method: `model.wv.most_similar(track_id)` để tiến hành query.

### Evaluated model

- Metric đánh giá thường được sử dụng trong các bài toán về Recommender System thường là mAP@k (Mean Average Precision at k) hoặc thương mại hơn là CTR (Click through rate), ngoài ra còn rất nhiều các metric đánh giá khác, các bạn có thể tham khảo tại bài viết sau: [Evaluation Metrics for Recommender Systems](https://towardsdatascience.com/evaluation-metrics-for-recommender-systems-df56c6611093). Code tham khảo các bạn tham khảo phần reference bên dưới.

### Some common pitfalls

##### Vấn đề cập nhật Vocabulary và Online Learning Word2Vec

- Việc sử dụng mô hình Word2Vec có hạn chế với đầu ra là 1 layer cố định nên khi có item mới (từ, bài hát, sản phẩm, ...), mô hình đều phải thực hiện training lại trên toàn bộ tập dữ liệu. Việc cập nhật mô hình thường xuyên và liên tục là đặc biệt quan trọng khi xử lí các bài toán về recommend system, vì dữ liệu thường biến đổi liên tục, không cố định nên các phương pháp truyền thống như __Matrix Completion / Matrix Factorization__ hoàn toàn không đáp ứng được yêu cầu. Bởi vì chi phí tính toán khá lớn, dữ liệu sparse hay rất thưa thớt, ví dụ làm các bài toán RS sử dụng data là rating sản phẩm chẳng hạn. 

- Một câu chuyện có thật về RS của Netflix, các bạn có thể đọc tại [đây](https://www.techdirt.com/articles/20120409/03412518422/why-netflix-never-implemented-algorithm-that-won-netflix-1-million-challenge.shtml). Netflix có 1 challenge về RS năm 2006, với giải thưởng lên tới 1 triệu USD. Đội top 1 sau đó đã công bố source code cho BTC và kết quả là ensemble 107 model lại với nhau để đạt được kết quả cuối cùng. Trong đó, 2 model chính mà đội đó sử dụng là: SVD (Singular Value Decomposition) và RBM (Restricted Boltzman Machine), kết quả cuối cùng đạt được là 0.88 RMSE. Nhưng:

>>> We evaluated some of the new methods offline but the additional accuracy gains that we measured did not seem to justify the engineering effort needed to bring them into a production environment.

- Việc emsemble quá nhiều mô hình và sử dụng các phương pháp về Matrix Factorization khiến việc cập nhật mô hình về sau vô cùng khó khăn với lượng dữ liệu mới, chưa kể chi phí tính toán lớn và deploy mô hình lên production sau này. Hoàn toàn không phù hợp với 1 nền tảng streaming tivi như hiện nay. Nên cho dù đội đó "ăn" được giải 1 triệu đô nhưng mô hình hoàn toàn không thể dùng được!

- Word2Vec cũng gặp vấn đề gần tương tự khi layer output đầu ra là cố định. Để giải quyết vấn đề này, 1 cải tiến được đề xuất là `Online Learning Word2Vec`. 2 từ khóa các bạn có thể tìm hiểu thêm đó là: [Space-Saving word2vec](https://arxiv.org/pdf/1704.07463.pdf) và [Incremental SGNS](https://aclweb.org/anthology/D17-1037) (Incremental skip-gram model with negative sampling).

- Gensim cũng hỗ trợ việc cập nhật mô hình, các bạn có thể xem thêm tại PR này (đã merge): https://github.com/RaRe-Technologies/gensim/pull/435 . Về cách implement có 1 số chú ý:

```python
# bạn thực hiện load lại model đã training từ trước
model = gensim.models.Word2Vec.load('path-to-pretrain-model')

# với corpus từ mới, có chứa 1 số từ không có trong vocabulary hiện tại, đầu tiên là build vocabulary và để update=True (bắt buộc)
model.build_vocab(new_corpus, update=True)
# lúc này, vocabulary đã được tăng lên, kèm theo các từ mới từ new_corpus
# tiến hành train model
model.train(new_corpus, total_examples=model.corpus_count, epochs=model.iter)

# và lần train sau thường nhanh hơn rất nhiều so với lần train đầu tiên.
```

### Bonus

- Ngoài phương pháp item2vec (prod2vec) mình có trình bày bên trên, 1 phương pháp khác về session-based cũng được đề xuất là __Meta-Prod2Vec__, có khả năng thể hiện tốt hơn với các item cold-start. Ngoài việc sử dụng session data, phương pháp còn sử dụng thêm các meta-data của từng item (ví dụ như ngoài music session thì từng bài hát còn có tên tác giả, tên album, ...) để đưa vào mô hình. Chi tiết các bạn có thể đọc thêm tại paper [Meta-Prod2Vec](https://arxiv.org/abs/1607.07326) :+1: :D 

### Kết luận

- Qua bài blog lần này, mình đã giới thiệu về 1 phương pháp session-based RS dựa trên thuật toán khá phổ biến là Word2Vec. Hi vọng có ích với các bạn đang tìm hiểu và hứng thú với các bài toán Recommender System. Mình cũng khá may mắn khi được làm việc với 1 dự án có nguồn dữ liệu thật từ người dùng và item2vec cũng là 1 trong số các giải thuật mình có tham khảo để xây dựng hệ thống gợi ý hiện tại. Tuy rằng, các bộ dataset mình liệt kê trong bài đã có từ khá lâu và có phần không được "thật" hoàn toàn nhưng hi vọng giúp các bạn có cái nhìn tổng quan và cách áp dụng phương pháp lên bài toán cụ thể. Giải thuật, mô hình thì đã có nhiều nhưng điều quan trọng hơn là các bạn áp dụng đúng mô hình cho từng bài toán recommend cụ thể, dựa trên dữ liệu hiện có, tiếp cận theo hướng "Data First" chứ không phải"Model First"!

- Cảm ơn các bạn đã đọc đến cuối bài viết, hãy __upvote__  nếu thấy hữu ích và __follow__ mình để chờ đợi các bài blog sắp tới nhé. Mọi ý kiến phản hồi, đóng góp vui lòng comment bên dưới hoặc gửi về mail: __phan.huy.hoang@sun-asterisk.com__.

### Reference

- Paper: [Word2vec applied to Recommendation: Hyperparameters Matter](https://arxiv.org/pdf/1804.04212.pdf)

- Paper: [Meta-Prod2Vec](https://arxiv.org/pdf/1607.07326.pdf)

- Paper: [From Word Embedding to Item Recommendation](https://arxiv.org/pdf/1601.01356.pdf)

- Paper: [Word2Vec with Negative Sampling explained](https://arxiv.org/pdf/1402.3722.pdf)

- [Viblo - Quang Phạm - Xây dựng mô hình không gian vector cho Tiếng Việt](https://viblo.asia/p/xay-dung-mo-hinh-khong-gian-vector-cho-tieng-viet-GrLZDXr2Zk0)

- [Skip-gram tutorial](http://mccormickml.com/2016/04/19/word2vec-tutorial-the-skip-gram-model/)

- [Introduction to Recommender Systems in 2019](https://tryolabs.com/blog/introduction-to-recommender-systems/)

- [item2vec overview](https://towardsdatascience.com/introduction-to-recommender-system-part-2-adoption-of-neural-network-831972c4cbf7)

- [item2vec for music RS](https://towardsdatascience.com/using-word2vec-for-music-recommendations-bb9649ac2484)

- [Online Learning for Word Embedding](https://medium.com/explorations-in-language-and-learning/online-learning-of-word-embeddings-7c2889c99704)

- https://code.google.com/archive/p/word2vec/

- [https://stats.stackexchange.com/questions/180548/why-is-skip-gram-better-for-infrequent-words-than-cbow](https://stats.stackexchange.com/questions/180548/why-is-skip-gram-better-for-infrequent-words-than-cbow)

- [mAP@k explained](https://www.kaggle.com/pestipeti/explanation-of-map5-scoring-metric)

- [Evaluation metrics for recommender system](https://towardsdatascience.com/evaluation-metrics-for-recommender-systems-df56c6611093)

- [mAP@k](https://github.com/benhamner/Metrics/blob/master/Python/ml_metrics/average_precision.py)

- [mAR@k](https://github.com/statisticianinstilettos/recmetrics/blob/master/recmetrics/metrics.py)