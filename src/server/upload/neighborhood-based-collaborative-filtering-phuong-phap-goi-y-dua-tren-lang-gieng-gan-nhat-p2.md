Ở phần 2 này thì mình sẽ viết demo cho Neighborhood-based Collaborative Filtering (NBCF).

Lý thuyết mình đã trình bày ở phần 1, nếu muốn các bạn có thể xem lại tại [đây](https://viblo.asia/p/neighborhood-based-collaborative-filtering-phuong-phap-goi-y-dua-tren-lang-gieng-gan-nhat-p1-4dbZNpvn5YM) ;)

### 1. Về hàm khoảng cách
Trong bài này, mình sẽ demo với 2 hàm khoảng cách cơ bản là **cosine** và **pearson**

Với **cosine**, mình sử dụng hàm [`cosine_similarity`](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html) có sẵn của `sklearn`.

Còn **pearson**, mình sử dụng `pearsonr` của `scipy`. Nhưng do hàm này không nhận ma trận (mảng 2 chiều) nên mình phải convert lại như vậy:

```python
from scipy.stats.stats import pearsonr

def pearson(X, Y = None):
    x = X.shape[0]
    y = X.shape[1]
    a = np.zeros((x, x))
    u = np.zeros((x, y))
    temp = 0
    
    for i in range(x):
        for j in range(y):
            u[i][j] = X[i, j]
    for i in range(x):
        for j in range(x):
            temp = pearsonr(u[i], u[j])[0]
            a[i][j] =  temp if not np.isnan(temp) else 0
    
    return a
```

### 2. Xây dựng class NBCF

#### Hàm khởi tạo:
Tham số đầu vào:
- *Y*: ma trận Utility, gồm 3 cột, mỗi cột gồm 3 số liệu: user_id, item_id, rating.
- *k*: số lượng láng giềng lựa chọn để dự đoán rating.
- *uuCF*: Nếu sử dụng `uuCF` thì *uuCF = 1* , ngược lại *uuCF = 0*. Tham số nhận giá trị mặc định là `1`.
- *dist_f*: Hàm khoảng cách, như đã nói ở mục 1, ở đây mình sử dụng 2 hàm **cosine** và **pearson**. Tham số nhận giá trị mặc định là hàm `cosine_similarity` của `klearn`.
- *limit*: Số lượng items gợi ý cho mỗi user. Mặc định bằng `10`.

```python
def __init__(self, Y, k, uuCF = 1, dist_f = cosine_similarity, limit = 10):
        self.uuCF = uuCF
        self.f = open('danhgiaNBCF.dat', 'a+')
        self.Y = Y if uuCF else Y[:, [1, 0, 2]]
        self.Ybar = None
        self.k = k
        self.limit = limit
        self.dist_func = dist_f
        self.users_count = int(np.max(self.Y[:, 0])) + 1
        self.items_count = int(np.max(self.Y[:, 1])) + 1
        self.Pu = None
        self.Ru = None
```

<br>

>> Lưu ý, class NBCF đồng bộ cho cả hai phương pháp `iiCF` và `uuCF` nên khi tính toán bằng `uuCF`, ma trận Utility truyền vào là `Y`, ngược lại thì cột 0 và 1 của Y được đổi chỗ cho nhau (hoán đổi vị trí của user và item) 
>> 

<br>

#### Hàm chuẩn hóa

Như lý thuyết trong [Phần 1](https://viblo.asia/p/neighborhood-based-collaborative-filtering-phuong-phap-goi-y-dua-tren-lang-gieng-gan-nhat-p1-4dbZNpvn5YM), mỗi rating của mỗi user được chuẩn hóa bằng cách trừ đi trung bình cộng các rating mà user đó đã đánh giá:  

```python
def normalizeY(self):
        users = self.Y[:, 0]
        self.Ybar = self.Y.copy()
        self.mu = np.zeros((self.users_count,))
        for i in range(self.users_count):
            ids = np.where(users == i)[0].astype(int)
            ratings = self.Y[ids, 2]
            m = np.mean(ratings)
            if np.isnan(m):
                m = 0
            self.mu[i] = m
            self.Ybar[ids, 2] = ratings - self.mu[i]
        self.Ybar = sparse.coo_matrix((self.Ybar[:, 2],
            (self.Ybar[:, 1], self.Ybar[:, 0])), (self.items_count, self.users_count))
        self.Ybar = self.Ybar.tocsr()
```

<br>

#### Hàm tính khoảng cách tương đồng
```python
def similarity(self):
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)
```

<br>

#### Hàm dự đoán rating và đưa ra danh sách items
```python
   def pred(self, u, i, normalized = 1):
        ids = np.where(self.Y[:, 1] == i)[0].astype(int)
        if ids == []:
            return 0
        users = (self.Y[ids, 0]).astype(int)
        sim = self.S[u, users]
        a = np.argsort(sim)[-self.k:]
        nearest = sim[a]
        r = self.Ybar[i, users[a]]
        
        if normalized:
            return (r*nearest)[0]/(np.abs(nearest).sum() + 1e-8)

        return (r*nearest)[0]/(np.abs(nearest).sum() + 1e-8) + self.mu[u]
        
        
    def _pred(self, u, i, normalized = 1):
        if self.uuCF: return self.pred(u, i, normalized)
        return self.pred(i, u, normalized)
```

>> Lưu ý, với `uuCF = 0`, mình sẽ thực hiện hàm đổi chỗ 2 tham số _u_ và _i_ khi thực hiện hàm `pred` 

<br>

```python
def recommend(self, u):
        if self.uuCF:
            ids = np.where(self.Y[:, 0] == u)[0].astype(int)
            items_rated_by_user = self.Y[ids, 1].tolist()
            n = self.items_count
        else:
            ids = np.where(self.Y[:, 1] == u)[0].astype(int)
            items_rated_by_user = self.Y[ids, 0].tolist()
            n = self.users_count
        a = np.zeros((n,))
        recommended_items = []
        for i in range(n):
            if i not in items_rated_by_user:
                a[i] = self._pred(u, i)
        if len(a) < self.limit:
            recommended_items = np.argsort(a)[-len(a):]
        else:
            recommended_items = np.argsort(a)[-self.limit:]
        return recommended_items
```


### 3. Đánh giá thuật toán
Tương tự với Content-base, ở đây mình cũng đánh giá thuật toán bằng RMSE và precision recall . Các bạn có thể tham khảo một chút:

```python
def RMSE(self, data_size, Data_test, test_size = 0):
        SE = 0
        n_tests = Data_test.shape[0]
        for n in range(n_tests):
            if Data_test[n, 1] == 1681:
                pred = 0
            else:
                pred = self._pred(Data_test[n, 0], Data_test[n, 1], normalized = 0)
            SE += (pred - Data_test[n, 2])**2 

        RMSE = np.sqrt(SE/n_tests)

        print('%s::%d::%d::cosine_similarity::%r::%r\r\n' % (str(data_size), self.uuCF, self.k, test_size, RMSE))
        self.f.write('%s::%d::%d::cosine_similarity::%r::%r\r\n' % (str(data_size), self.uuCF, self.k, test_size, RMSE))
        
    def evaluate(self, data_size, Data_test, test_size = 0):
        sum_p = 0
        n = self.users_count if self.uuCF else self.items_count
        self.Pu = np.zeros((n,))
        for u in range(n):
            recommended_items = self.recommend(u)
            ids = np.where(Data_test[:, 0] == u)[0]
            rated_items = Data_test[ids, 1]
            for i in recommended_items:
                if i in rated_items:
                    self.Pu[u] += 1
            sum_p += self.Pu[u]
        p = sum_p/(n * self.limit)
        r = sum_p/(Data_test.shape[0] + 1)
        print('%s::%d::%d::cosine_similarity::%r::%r\r\n' % (str(data_size), self.uuCF, self.limit, p, r))
        self.f.write('%s::%d::%d::cosine_similarity::%r::%r\r\n' % (str(data_size), self.uuCF, self.limit, p, r))
```

<br>

Vậy là kết thúc 2 phần của Neighborhood-based Collaborative Filtering. Còn Matrix Factorization nữa thôi là mình sẽ kết thúc chủ đề này. Hy vọng là mình sẽ hoàn thành được :) 

Dưới đây là link source code và tài liệu tham khảo. Hẹn gặp bạn ở bài viết tiếp theo nhé :)

[Source code](https://github.com/HaiHaChan/it5230/blob/master/notebooks/src/Neighborhood-based.ipynb)

[Link tài liệu tham khảo](https://machinelearningcoban.com/2017/05/24/collaborativefiltering/)