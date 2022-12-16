Để tiếp nối [Phần 1](https://viblo.asia/p/tim-hieu-ve-content-based-filtering-phuong-phap-goi-y-dua-theo-noi-dung-phan-1-V3m5WGBg5O7) , ở bài này mình sẽ hướng dẫn các bạn thử demo thuật toán Content-based.

Thực sự thì chủ đề này khá khô khan và mình chẳng nghĩ ra được ý tưởng gì hay ho  nên mình cứ chần chừ mãi không viết. Nhưng sợ để lâu mình lại quên hết :( nên mình sẽ viết tiếp. Mong mọi người ủng hộ để mình có thể hoàn thành được hết series về thuật toán recommendation cơ bản nhé.

Vì lý thuyết cơ bản đã được trình bày ở phần 1, nên trong bài này, mình sẽ không nhắc lại lý thuyết mà sẽ thực hành luôn.

## 1.  Bộ MovieLen 100K

GroupLens Reasearch đã thu thập và tạo ra các bộ dữ liệu có sẵn từ trang web [MovieLens](http://movielens.org). Các tập dữ liệu được thu thập trong các khoảng thời gian khác nhau, tùy thuộc vào kích thước của tập hợp. Trong bài viết này và các bài viết tiếp theo mình sẽ sử dụng 2 bộ MovieLen 100K và 1M để thử nghiệm mô hình.

Mình đã xử lý lại một chút bộ dữ liệu để tiến hành so sánh đánh giá, nếu các bạn cần thì có thể xem link ở cuối bài nhé.

## 2. Tiền xử lý dữ liệu
Vì nhu cầu thu thập số liệu để đánh giá, mình sử dụng cả 2 tập 100K và 1M. Tuy nhiên, cấu trúc của 2 tập này không giống nhau:

```:100K
1|Toy Story (1995)|01-Jan-1995||http://us.imdb.com/M/title-exact?Toy%20Story%20(1995)|0|0|0|1|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0
2|GoldenEye (1995)|01-Jan-1995||http://us.imdb.com/M/title-exact?GoldenEye%20(1995)|0|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0|1|0|0
3|Four Rooms (1995)|01-Jan-1995||http://us.imdb.com/M/title-exact?Four%20Rooms%20(1995)|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|1|0|0
4|Get Shorty (1995)|01-Jan-1995||http://us.imdb.com/M/title-exact?Get%20Shorty%20(1995)|0|1|0|0|0|1|0|0|1|0|0|0|0|0|0|0|0|0|0
```

```:1M
1::Toy Story ::1995::Animation|Children's|Comedy
2::Jumanji ::1995::Adventure|Children's|Fantasy
3::Grumpier Old Men ::1995::Comedy|Romance
4::Waiting to Exhale ::1995::Comedy|Drama
5::Father of the Bride Part II ::1995::Comedy
```


nên mình cần xây dựng hàm `setGenresMatrix()` để code được đồng bộ:
```python
genresList = [
  "Action",
  "Adventure",
  "Animation",
  "Children",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Film-Noir",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
  "(no genres listed)"
]

def setGenresMatrix(genres):
    movieGenresMatrix = []
    movieGenresList = genres.split('|')
    for x in genresList:
        if (x in movieGenresList):
            movieGenresMatrix.append(1)
        else:
            movieGenresMatrix.append(0)
    return movieGenresMatrix
```

## 3. Xây dựng item-profile
Chúng ta sẽ get các vector nhị phân 19 chiều để mô tả cho mỗi bộ phim (do có 19 thể loại phim)
```python:100K
i_cols = ['movie id', 'movie title' ,'release date','video release date', 'IMDb URL', 'unknown', 'Action', 'Adventure',
 'Animation', 'Children\'s', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy',
 'Film-Noir', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western']

items = pd.read_csv('ml-100k/u.item', sep='|', names=i_cols, encoding='latin-1')

n_items = items.shape[0]

X0 = items.as_matrix()
X_train_counts = X0[:, -19:]
```

```python:1M
i_cols = ['movie id', 'title' ,'year', 'gen']

items = pd.read_csv('ml-1m/movies.dat', sep='::', names=i_cols, encoding='latin-1')
X = items.as_matrix()
n_items = X.shape[0] - 1
X_train_count = np.full(shape = (n_items, 19), fill_value = 0)
for i in range(n_items):
    X_train_count[i] = setGenresMatrix(X[i+1, 3])
```

Bạn có thể sử dụng trực tiếp các vector nhị phân này để làm feature vector. Nhưng ở đây, mình sẽ tiến hành tính tf-idf để sinh feature vector bằng thư viện `TfidfTransformer`
```python
from sklearn.feature_extraction.text import TfidfTransformer
transformer = TfidfTransformer(smooth_idf=True, norm ='l2')
tfidf = transformer.fit_transform( X_train_count.tolist()).toarray()
```

Kết quả tfidf thu được là ma trận mà mỗi hàng sẽ là feature vector của một bộ phim. Đây là ví dụ cho feature vector của một bộ phim
```
tfidf[0] = [0.         0.         0.         0.74066017 0.57387209 0.34941857
 0.         0.         0.         0.         0.         0.
 0.         0.         0.         0.         0.         0.
 0.        ]
```
chúng ta sẽ dùng các vector này để học ra mô hình dự đoán cho mỗi bộ phim.
## 4. Học mô hình
Đầu tiên chúng ta cần xây dựng hàm để get các bộ phim đã được rated bởi mỗi user:
```python
def get_items_rated_by_user(rate_matrix, user_id):
    y = rate_matrix[:,0]
    ids = np.where(y == user_id +1)[0]
    item_ids = rate_matrix[ids, 1] - 1
    scores = rate_matrix[ids, 2]
    return (item_ids, scores)
```
Với mỗi user, chúng ta sẽ sử dụng hàm `get_items_rated_by_user` để lấy mảng id các bộ phim đã được rated cùng điểm mà user đó đã rated cho mỗi bộ phim. Sau đó sử dụng các mảng đó để tính tính W và b, là các hệ số của Ridge Regression cho mỗi user. 
```python
d = tfidf.shape[1] # data dimension
W = np.zeros((d, self.n_users))
b = np.zeros((1, self.n_users))
for n in range(self.n_users):    
    ids, scores = get_items_rated_by_user(self.Y, n)
    clf = Ridge(alpha= self.lamda, fit_intercept  = True)
    Xhat = tfidf[ids, :]

    clf.fit(Xhat, scores) 
    W[:, n] = clf.coef_
    b[0, n] = clf.intercept_
```
Cuối cùng sử dụng W và b đã thu được để tính ra ma trận dự đoán.
```python
self.Yhat = tfidf.dot(W) + b
```
Vậy là xong :)
## 5. Đánh giá mô hình
Cuối cùng, để đánh giá mô hình mình đã sử dụng các độ đo là **RMSE, precision recall** . Các bạn có thể tham khảo code của mình ở dưới đây:
```python:RMSE
def RMSE(self, Data_test):
    se = 0
    cnt = 0
    for n in range(self.n_users):
        ids, scores_truth = get_items_rated_by_user(Data_test, n)
        scores_pred = self.Yhat[ids, n]
        e = scores_truth - scores_pred 
        se += (e*e).sum(axis = 0)
        cnt += e.size 
    return np.sqrt(se/cnt)
```
```python:PR
def evaluatePR(self, Data_test, top, data_size):
    sum_p = 0
    Pu = np.zeros((self.n_users,))
    for u in range(n_users):
        recommended_items = self.recommend(u, top)
        ids = np.where(Data_test[:, 0] == u)[0]
        rated_items = Data_test[ids, 1]
        for i in recommended_items:
            if i in rated_items:
                Pu[u] += 1
        sum_p += Pu[u]
    p = sum_p/(self.n_users * top)
    r = sum_p/(Data_test.shape[0] + 1)
    print('%s::%d::%r::%r\r\n' % (str(data_size), top, p, r))
```

Dưới đây là link source code, dữ liệu và tài liệu tham khảo. Hẹn gặp lại các bạn ở các bài viết tiếp theo.

[Source code](https://github.com/HaiHaChan/it5230/blob/master/notebooks/src/Content-based.ipynb)

[ 1M](https://www.kaggle.com/haihachan/it20182)

[Link tài liệu tham khảo](https://machinelearningcoban.com/2017/05/17/contentbasedrecommendersys/)