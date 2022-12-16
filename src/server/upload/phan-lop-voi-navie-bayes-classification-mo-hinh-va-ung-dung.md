Chắc hẳn khi nhập môn Machine Learning mọi người cũng nghe qua về thuật toán phân lớp, hôm nay mình muốn giới thiệu cho mọi người một phương pháp đem lại hiệu quả tốt trong lớp các bài toán phân lớp hay dự đoán. Giải thuật mình muốn nói đến hôm nay là Naive Bayes - một trong những thuật toán rất tiêu biểu cho hướng phân loại dựa trên lý thuyết xác suất.

# 1. Khái niệm

Lý thuyết về Bayes thì có lẽ không còn quá xa lạ với chúng ta nữa rồi. Nó chính là sự liên hệ giữa các xác suất có điều kiện. Điều đó gợi ý cho chúng ta rằng chúng ta có thể tính toán một xác suất chưa biết dựa vào các xác suất có điều kiện khác. Thuật toán Naive Bayes cũng dựa trên việc tính toán các xác suất có điều kiện đó.

Naive Bayes Classification (NBC) là một thuật toán phân loại dựa trên tính toán xác suất áp dụng định lý Bayes. Thuật toán này thuộc nhóm Supervised Learning (Học có giám sát).

Theo định lý Bayes, ta có công thức tính xác suất  như sau:

![](https://images.viblo.asia/013f676c-0fd6-430b-a21e-2b55a5035b1c.png)
<br>
Do đó ta có:

![](https://images.viblo.asia/348c0131-f026-4e21-b787-ce9cc3fe0f3e.png)
<br>
Trên thực tế thì ít khi tìm được dữ liệu mà các thành phần là hoàn toàn độc lập với nhau. Tuy nhiên giả thiết này giúp cách tính toán trở nên đơn giản, training data nhanh, đem lại hiệu quả bất ngờ với các lớp bài toán nhất định

Cách xác định các thành phần (class) của dữ liệu dựa trên giả thiết này có tên là Naive Bayes Classifier

# 2. Mô hình thuật toán Navie Bayes

Một trong các bài toán nổi tiếng hiệu quả khi sử dụng NBC là bài toán phân loại text

Trong bài toán này, mỗi văn bản được thể hiện thành dạng bag of words, hiểu nôm na là thể hiện xem có bao nhiêu từ xuất hiện và tần suất xuất hiện trong văn bản, nhưng bỏ qua thứ tự các từ

Có 2 mô hình thuật toán Naive Bayes thường sử dụng là: mô hình Bernoulli và mô hình Multinomial. Trong bài toán này ta chỉ tìm hiểu mô hình Multinomial

# 3. Mô hình Multinomial

Mô hình này chủ yếu được sử dụng trong phân loại văn bản mà feature vectors được tính bằng Bags of Words. Lúc này, mỗi văn bản được biểu diễn bởi một vector có độ dài `d` chính là số từ trong từ điển. Giá trị của thành phần thứ i trong mỗi vector chính là số lần từ thứ `i` xuất hiện trong văn bản đó.

Ta tính xác suất từ xuất hiện trong văn bản P(xi∣y) như sau

![](https://images.viblo.asia/662b1fed-9dfd-4b39-815a-a9c28edea8e7.png)
<br>
Trong đó:
- Ni là tổng số lần từ xi xuất hiện trong văn bản.

- Nc là tổng số lần từ của tất cả các từ x1,…xn xuất hiện trong văn bản.

Công thức trên có hạn chế là khi từ xi không xuất hiện lần nào trong văn bản, ta sẽ có Ni=0. Điều này làm cho P(xi∣y)=0

Để khắc phục vấn đề này, người ta sử dụng kỹ thuật gọi là Laplace Smoothing bằng cách cộng thêm vào cả tử và mẫu để giá trị luôn khác 0

![](https://images.viblo.asia/c3893321-ec71-4c35-a8b7-ce297c5c6519.png)
<br>
Trong đó:
- α thường là số dương, bằng 1.
- dα được cộng vào mẫu để đảm bảo ∑i=1dP(xi∣y)=1

# 4. Ví dụ: Bài toán phân loại email

- Ta có bộ training data gồm E1, E2, E3. Cần phân loại E4
- Nhãn N là thư not spam, còn S là thư spam
-	Bảng từ vựng: [w1,w2,w3,w4,w5,w6,w7].
-	Số lần xuất hiện của từng từ trong từng email tương ứng với bảng

![](https://images.viblo.asia/c135144b-c01c-469c-9c99-c4224e4a1319.png)
<br>

Giải bài toán bằng Python nhé :)

```python
from sklearn.naive_bayes import MultinomialNB
import numpy as np
```
Import thư viện cần thiết

```python
e1 = [1, 2, 1, 0, 1, 0, 0]
e2 = [0, 2, 0, 0, 1, 1, 1]
e3 = [1, 0, 1, 1, 0, 2, 0]

train_data = np.array([e1, e2, e3])
label = np.array(['N', 'N', 'S'])
```

Khai báo dữ liệu training và nhãn

```python
e4 = np.array([[1, 0, 0, 0, 0, 0, 1]])
```

Khai báo dữ liệu tập test

```python
clf1 = MultinomialNB(alpha=1)

clf1.fit(train_data, label)
```
Dán nhãn dữ liệu cho máy học

Rồi bây giờ để máy predict tập test thôi
```python
print(clf1.predict_proba(e4)) #Probabiliry of e4 for each class
print(str(clf1.predict(e4)[0])) #Predicting class of e4
```

Kết quả

![](https://images.viblo.asia/9ab0b22d-ef3c-427e-aa9f-68a6cbef0f15.png)
<br>

Như sk.learn trong python đã giúp chúng ta tính hết rồi :) từ tỉ lệ tới việc dự đoán tập test chỉ bằng vài dòng code đơn giản

Bài viết của mình đến đây là hết, hi vọng các bạn có thể hiểu được qua về thuật toán Navie Bayes và áp dụng được nó, các bạn có thể copy code để chạy nhiều trường hợp khác nhé.

Tài liệu tham khảo
- https://machinelearningcoban.com/2017/08/08/nbc/
- https://en.wikipedia.org/wiki/Naive_Bayes_classifier
- https://scikit-learn.org/stable/modules/naive_bayes.html