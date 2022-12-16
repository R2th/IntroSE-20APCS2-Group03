Tương tự như các bài trước, sau lý thuyết ở [Phần 1](https://viblo.asia/p/matrix-factorization-phuong-phap-goi-y-dua-tren-ky-thuat-phan-ra-ma-tran-p1-Az45bapNlxY), thì trong phần 2 này mình sẽ trình bày demo thuật toán. Cùng mình tìm hiểu nhé :)

### 1. Xây dựng class MF
#### Hàm khởi tạo

Tham số đầu vào:

- *Y*: ma trận Utility, gồm 3 cột, mỗi cột gồm 3 số liệu: user_id, item_id, rating.
- *n_factors*: số chiều ẩn giữa các users và items, mặc định *n_factors = 2*.
- *X*: ma trận users
- *W*: ma trận ratings
- *lamda*: trọng số regularization của hàm mất mát để tránh overfitting , mặc định *lamda = 0.1*
- *learning_rate*: là *learning_rate* - trọng số Gradient Descent, sử dụng để điều chỉnh tốc độ học., mặc định *learning_rate = 2*
- *n_epochs*: số lần lặp để huấn luyện, mặc định *n_epochs = 50*
- *top*: số lượng items gợi ý cho mỗi user. Mặc định bằng `10`.
- *filename*: File lưu số liệu đánh giá.

<br>

```python
class MF(object):
    def __init__(self, Y, n_factors = 2, X = None, W = None, lamda = 0.1, learning_rate = 2, n_epochs = 50, 
                 top = 10, filename = None):
        if filename:
            self.f = open(filename, 'a+')
        self.Y = Y
        self.lamda = lamda
        self.n_factors = n_factors
        self.learning_rate = learning_rate
        self.n_epochs = n_epochs
        self.top = top
        self.users_count = int(np.max(self.Y[:, 0])) + 1
        self.items_count = int(np.max(self.Y[:, 1])) + 1
        self.ratings_count = Y.shape[0]
        if X == None:
            self.X = np.random.randn(self.items_count, n_factors)
        if W == None:
            self.W = np.random.randn(n_factors, self.users_count)
        self.Ybar = self.Y.copy()
        
        self.bi = np.random.randn(self.items_count)
        self.bu = np.random.randn(self.users_count)
        self.n_ratings = self.Y.shape[0]
```

<br>

Thay đổi các trọng số, bạn có thể quan sát ảnh hưởng của trọng số tới kết quả đánh giá cuả thuật toán.

#### Hàm getUserRated() và getItemsRatedByUser()

Hàm `get_user_rated_item(i)` trả về danh sách users đã đánh giá item thứ `i`

```python
    def get_user_rated_item(self, i):
        ids = np.where(i == self.Ybar[:, 1])[0].astype(int)
        users = self.Ybar[ids, 0].astype(int)
        ratings = self.Ybar[ids, 2]
        
        return (users, ratings)
```

Hàm `get_item_rated_by_user(u)` trả về danh sách items được đánh giá bởi user thứ `u`
```python
def get_item_rated_by_user(self, u):
        ids = np.where(u == self.Ybar[:, 0])[0].astype(int)
        items = self.Ybar[ids, 1].astype(int)
        ratings = self.Ybar[ids, 2]
        
        return (items, ratings)
```

Chúng ta sẽ sử dụng 2 hàm này để tối ưu hai ma trận *X* và *W*.

#### Hàm update *X* và *W*:

Đây là hai hàm tối ưu *X* và *W*, với số vòng lặp đang được cố định là *50* lần.

```python
def updateX(self):
        for m in range(self.items_count):
            users, ratings = self.get_user_rated_item(m)
            Wm = self.W[:, users]
            b = self.bu[users]
            sum_grad_xm = np.full(shape = (self.X[m].shape) , fill_value = 1e-8)
            sum_grad_bm = 1e-8
            for i in range(50):
                xm = self.X[m]
                error = xm.dot(Wm) + self.bi[m] + b - ratings
                grad_xm = error.dot(Wm.T)/self.n_ratings + self.lamda*xm
                grad_bm = np.sum(error)/self.n_ratings
                sum_grad_xm += grad_xm**2
                sum_grad_bm += grad_bm**2
                # gradient descent
                self.X[m] -= self.lr*grad_xm.reshape(-1)/np.sqrt(sum_grad_xm)
                self.bi[m] -= self.lr*grad_bm/np.sqrt(sum_grad_bm)
        
    def updateW(self):
        for n in range(self.users_count):
            items, ratings = self.get_item_rated_by_user(n)
            Xn = self.X[items, :]
            b = self.bi[items]
            sum_grad_wn = np.full(shape = (self.W[:, n].shape) , fill_value = 1e-8).T
            sum_grad_bn = 1e-8
            for i in range(50):
                wn = self.W[:, n]
                error = Xn.dot(wn) + self.bu[n] + b - ratings
                grad_wn = Xn.T.dot(error)/self.n_ratings + self.lamda*wn
                grad_bn = np.sum(error)/self.n_ratings
                sum_grad_wn += grad_wn**2
                sum_grad_bn += grad_bn**2
                # gradient descent
                self.W[:, n] -= self.lr*grad_wn.reshape(-1)/np.sqrt(sum_grad_wn)
                self.bu[n] -= self.lr*grad_bn/np.sqrt(sum_grad_bn)          
```

<br>

#### Thuật toán chính

```python
    def fit(self, x, data_size, Data_test, test_size = 0):
        for i in range(self.n_epochs):
            self.updateW()
            self.updateX()
            if (i + 1) % x == 0:
                self.RMSE(Data_test,data_size = data_size, test_size = 0, p = i+1)
#                 self.evaluate(data_size, Data_test, test_size = 0)

    def pred(self, u, i):
        u = int(u)
        i = int(i)
        pred = self.X[i, :].dot(self.W[:, u]) + self.bi[i] + self.bu[u]
        
        return max(0, min(5, pred))
    
    def recommend(self, u):
        ids = np.where(self.Y[:, 0] == u)[0].astype(int)
        items_rated_by_user = self.Y[ids, 1].tolist()
        a = np.zeros((self.items_count,))
        recommended_items = []
        pred = self.X.dot(self.W[:, u])
        for i in range(self.items_count):
            if i not in items_rated_by_user:
                a[i] = pred[i] +self.bi[i] + self.bu[u]
        if len(a) < self.top:
            recommended_items = np.argsort(a)[-self.items_count:]
        else:
            recommended_items = np.argsort(a)[-self.top:]
        recommended_items = np.where(a[:] > 0)[0].astype(int)

#         return random.sample(list(recommended_items), self.top)
        return recommended_items[:self.limit]
#         return recommended_items
```

### 2. Đánh giá

Tương tự như 2 phương pháp trước, ở đây mình sử dụng 2 độ đo, `RMSE` và `PR`:

```python
 def RMSE(self, Data_test, test_size = 0, data_size = '100K', p = 10):
        n_tests = Data_test.shape[0]
        SE = 0
        for n in range(n_tests):
            pred = self.pred(Data_test[n, 0], Data_test[n, 1])
            SE += (pred - Data_test[n, 2])**2 
        RMSE = np.sqrt(SE/n_tests)
        
        print('%s::1::%d::%d::%r::%r::%r\r\n' % (str(data_size), self.n_factors, self.n_epochs, self.lamda, self.lr, RMSE))
        self.f.write('%s::1::%d::%d::%d::%r::%r::%r\r\n' % (str(data_size), self.n_factors, self.n_epochs, p, self.lamda, self.lr, RMSE))
        
        return RMSE
    
    def evaluate(self, data_size, Data_test, test_size = 0):
        sum_p = 0
        sum_r = 0
        self.Pu = np.zeros((self.users_count,))
        for u in range(self.users_count):
            recommended_items = self.recommend(u)
            ids = np.where(Data_test[:, 0] == u)[0]
            rated_items = Data_test[ids, 1]
            for i in recommended_items:
                if i in rated_items:
                    self.Pu[u] += 1
            sum_p += self.Pu[u]
        
        p = sum_p/(self.users_count * self.limit)
        r = sum_p/(Data_test.shape[0])
        self.f.write('%s::1::%d::%d::%d::%r::%r::%r\r\n' % (str(data_size), self.top, self.n_factors, self.n_epochs, test_size, p, r))
        
        return p, r
```

### 3. Demo với tập dữ liệu Movielen
```python
rs = MF(rate_train, n_factors = 2, lamda = 0.01, lr = 0.1, n_epochs= 20, filename = 'RMSE_100K_MF.dat')
rs.fit(10, "100K", rate_test)
rs.f.close()
```

Kết quả mình thu được là:

```
100K::1::2::20::0.01::0.1::0.9634817342439627

100K::1::2::20::0.01::0.1::0.9634984986336697
```

Thay đổi các trọng số để tìm bộ trọng số tốt nhất

```python
for i in [50, 60]:
    for j in [0.01, 0.1, 0.5, 1]:
        for k in [0.1, 0.5, 0.75, 1, 2]:
            rs = MF(rate_train, n_factors = i, lamda = 0.1, lr = 0.1, n_epochs= 10)
            rs.fit(10, data_size = "1M", Data_test = rate_test, test_size =0.1)
            rs.f.close()
```

Source code và tài liệu tham khảo:

[Code](https://github.com/HaiHaChan/it5230/blob/master/notebooks/src/Matrix%20Factorization.ipynb)

https://machinelearningcoban.com/2017/05/31/matrixfactorization/