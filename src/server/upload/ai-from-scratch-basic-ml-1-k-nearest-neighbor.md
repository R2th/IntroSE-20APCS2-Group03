Xin chào các bạn, chắc hẳn cái tên của series này đã nói lên tất cả. Đây là một series implement lại các thuật toán phổ biến trong Machine Learning và Deep Learning **FROM SCRATCH**. Có nhiều bạn sẽ đặt câu hỏi rằng tại sao phải implement từ đầu làm gì trong khi các thư viện đã thực hiện hết cho chúng ta rồi. Đúng vậy, với sự phổ biến của các thư viên AI ngày nay thì việc build một mô hình AI không còn quá khó khăn. Tuy nhiên việc implement từ đầu vẫn mang lại nhiều giá trị nhất định như: 
* Code từ đầu giúp bạn hiểu được rõ ràng nhất về luồng hoạt động của mô hình 
* Là các tường minh nhất để hiểu về các công thức toán học đằng sau mỗi mô hình (bạn không code được nó tức là bạn chưa hiểu nó) 
* Hiểu được cách tối ưu code của thư viên (cùng một thuật toán tại sao thư viện chạy nhanh hơn của mình) 
* Tăng skill coding và tính toán toán học hơn rất nhiều bởi khi implement lại từ đầu bạn sẽ phải chứng minh tất cả các công thức, đạo hàm .... bằng tay. Từ đó cũng giúp bạn hiểu thêm nhiều hơn. 

Xuất phát từ lý do đó, mình cùng một số thành viên trong [Sun* AI Research](https://viblo.asia/o/sun-ai-research-team) khởi động series này với hi vọng sẽ đóng góp cho cộng đồng những cái nhìn tường minh, những giải thích tường tận cho từng thuật toán. OK, không dài dòng nữa, chúng ta sẽ bắt đầu ngay với một thuật toán cơ bản nhất nhé. Bài này là bài mở đầu nên sẽ rất nhẹ nhàng thôi. Chúng ta cùng bắt đầu với thuật toán đơn giản bậc nhất của Machine Learning nhưng lại tỏ ra vô cùng hiệu quả đó chính là **K Nearest Neighbor**. Let's goooo....

# K Nearest Neighbor

Ở một số tài liệu tiếng việt gọi thuật toán này là **K láng giềng gần nhất**. Đây là một trong những thuật toán thuộc vào hàng đơn giản nhất trong các thuật toán thuộc **supervised learning** được sử dụng trong cả bài toán classification và regression. Ở đây nếu các bạn chưa hiểu khái niệm **supervised learning, classification, regression** là gì thì có thể tìm hiểu thêm trên các bài viết khác trên Viblo đã viết khá nhiều. Thuật toán này có thể được trình bày đơn giản chỉ trong hình sau 

![](https://images.viblo.asia/09a85eb8-fe99-476b-b70e-d70b752ab202.png)

Về cơ bản, toàn bộ các bước xử lý của thuật toán này thực hiện trong quá trình inference. Với một điểm dữ liệu mới $x$ cần dự đoán label $l$ chúng ta sẽ làm như sau 

> * **Bước 1:** Tính khoảng cách từ $x$ đến tất cả các điểm $(x', l^)$ trong toàn tập dữ liệu. 
> * **Bước 2:** Sắp xếp lại tập dữ liệu theo thứ tự khoảng cách từ nhỏ đến lớn 
> * **Bước 3:** Lọc ra Top $k$ điểm có khoảng cách nhỏ nhất. Đếm số lần xuất hiện của mỗi class $l_'$ trong top $k$. Giả sử là $l_j$ có số lần xuất hiện lớn nhất trong top $k$
> * **Bước 4:** Đưa ra kết luận $x$ có nhãn là $l_j$


Nhìn chung đây là một thuật toán rất đơn giản. Chúng ta sẽ tiến hành đi vào implement ngay nhé. 

# Implement thuật toán

## Khởi tạo các giá trị cần thiết 

```python 
from collections import Counter

import numpy as np


class KNN:
    def __init__(self, top_k=5):
        self.top_k = top_k
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y
```

Như chúng ta đã nói thì các bước xử lý hoàn toàn được thực hiện trong khi inference nên hàm `fit()` chỉ đơn thuần là lưu lại giá trị của `X_train` và `y_train` mà thôi 

## Tạo hàm tính khoảng cách 

Rất đơn giản chúng ta có đoạn code sau
 
```python 
    @staticmethod
    def distance(x1, x2):
        return np.linalg.norm(x1 - x2)
```

## Tạo hàm predict 
Như đã trình bày ở phía trên thì đây mới là bước xử lý quan trọng của chúng ta. Cũng chính là linh hòn của thuật toán này. Đây chính là các bước mình đã viết ở phần cơ sở lý thuyết phía trên. Khá rõ ràng và cũng không có gì nhiều để giải thích phải không nào 

```python 
    def predict(self, x):
        # Compute distance to all points in train set
        distances = [self.distance(x, x_train) for x_train in self.X_train]
        # Sort the distance with index
        top_idx = np.argsort(distances)[:self.top_k]
        # Get top K label
        k_nearests = self.y_train[top_idx]
        # Predict the label
        label = Counter(k_nearests).most_common(1)[0][0]
        return label
```

Để thuận tiện cho việc predict theo batch thì mình có viêt luôn một hàm cho việc này 

```python 
    def predict_batch(self, X):
        y_pred = [self.predict(x) for x in X]
        return y_pred
```

## Chạy thử code với một dataset mẫu 

Chúng ta tiến hành với dataset Iris rất quen thuộc về phân loại các loài hoa. Dataset này có sẵn trong thư viện sklearn nên chúng ta sẽ sử dụng luôn nhé. Đầu tiên tiến hành import thư viên sklearn và các hàm cần thiết 

**Import thư viện**
```python 
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
```

**Load data và train mô hình**

```python 
# Load iris data
data = load_iris()
# train test split
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.3)
# Load model
model = KNN(top_k=5)
model.fit(X_train, y_train)
# Sample predict model
y_pred = model.predict_batch(X_test)
# Caculate accuracy score
acc = accuracy_score(y_pred, y_test)
```

Sau khi train mô hình chúng ta sẽ thu được kết quả khoảng 0.977

```python 
print(acc) 

>>> 0.977777
```

# Full source 
Các bạn có thể tham khảo source code mẫu tại [đây](https://github.com/toanpv-0639/viblo-mlfs/blob/main/knn/KNN.ipynb)
# Kết luận 
Như vậy trong bài này chúng ta đã tiến hành implement lại một thuật toán cơ bản nhất của Machine Learning đó là **K Nearest Neighbor**. Do đây là bài toán rất cơ bản nên chúng ta cũng không có gì để bàn nhiều ở bài này cả. Hi vọng những bài tiếp theo sẽ có nhiều thứ để chia sẻ hơn. Hẹn gặp lại các bạn vào những bài sau.