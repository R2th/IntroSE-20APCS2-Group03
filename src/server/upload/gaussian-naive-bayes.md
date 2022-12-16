Naive Bayes có thể được mở rộng thành các thuộc tính có giá trị thực, phổ biến nhất bằng cách giả sử phân phối Gaussian.

Phần mở rộng này của Naive Bayes được gọi là Gaussian Naive Bayes. Các hàm khác có thể được sử dụng để ước tính phân phối dữ liệu, nhưng Gaussian (hoặc phân phối chuẩn) là dễ nhất để làm việc vì bạn chỉ cần ước tính giá trị trung bình và độ lệch chuẩn từ dữ liệu đào tạo của bạn.

## Đại diện cho Gaussian Naive Bayes
Ở trên, tôi đã tính xác suất cho các giá trị đầu vào cho mỗi lớp bằng tần số. Với các đầu vào có giá trị thực, chúng ta có thể tính độ lệch trung bình và độ lệch chuẩn của các giá trị đầu vào (x) cho mỗi lớp để tóm tắt phân phối.

Điều này có nghĩa là ngoài các xác suất cho mỗi lớp, chúng ta cũng phải lưu trữ độ lệch trung bình và độ lệch chuẩn cho từng biến đầu vào cho mỗi lớp.

## Tìm hiểu mô hình Gaussian Naive Bayes từ dữ liệu
Điều này đơn giản như việc tính giá trị trung bình và độ lệch chuẩn của từng biến đầu vào (x) cho từng giá trị lớp.

```
trung bình (x) = 1 / n * tổng (x)
```
Trong đó n là số lượng phiên bản và x là các giá trị cho một biến đầu vào trong dữ liệu đào tạo của bạn.

Chúng ta có thể tính độ lệch chuẩn bằng phương trình sau:
```
độ lệch chuẩn (x) = sqrt (1 / n * sum (xi-mean (x) ^ 2))
```
Đây là căn bậc hai của hiệu số bình phương trung bình của mỗi giá trị của x từ giá trị trung bình của x, trong đó n là số lượng phiên bản, sqrt () là hàm căn bậc hai, sum () là hàm tổng, xi là một giá trị cụ thể của biến x cho trường hợp thứ i và giá trị trung bình (x) được mô tả ở trên và ^ 2 là hình vuông.

Đưa ra dự đoán với mô hình Gaussian Naive Bayes
Xác suất của các giá trị x mới được tính bằng Hàm mật độ xác suất Gaussian (PDF).

Khi đưa ra dự đoán, các tham số này có thể được cắm vào Gaussian PDF với đầu vào mới cho biến và đổi lại, Gaussian PDF sẽ cung cấp ước tính xác suất của giá trị đầu vào mới đó cho lớp 

```
pdf (x, trung bình, sd) = (1 / (sqrt (2 * PI) * sd)) * exp (- ((x-mean ^ 2) / (2 * sd ^ 2)))
```
Trong đó pdf (x) là Gaussian PDF, sqrt () là căn bậc hai, giá trị trung bình và sd là giá trị trung bình và độ lệch chuẩn được tính ở trên, PI là hằng số, exp () là hằng số e hoặc Euler được nâng lên thành công suất và x là giá trị đầu vào cho biến đầu vào.

Sau đó chúng ta có thể cắm các xác suất vào phương trình trên để đưa ra dự đoán với các đầu vào có giá trị thực.

Ví dụ: điều chỉnh một trong các tính toán trên với các giá trị số cho thời tiết và xe hơi:
```
đi ra ngoài = P (pdf (thời tiết) | class = đi ra ngoài) * P (pdf (xe hơi) | class = đi ra ngoài) * P (class = đi ra ngoài)
```
Chuẩn bị tốt nhất dữ liệu của bạn cho Naive Bayes
Đầu vào phân loại: Naive Bayes giả định các thuộc tính nhãn như nhị phân, phân loại hoặc danh nghĩa.
Đầu vào Gaussian: Nếu các biến đầu vào có giá trị thực, phân phối Gaussian được giả sử. Trong trường hợp đó, thuật toán sẽ hoạt động tốt hơn nếu các phân phối đơn biến của dữ liệu của bạn là Gaussian hoặc gần Gaussian. Điều này có thể yêu cầu xóa các ngoại lệ (ví dụ: các giá trị lớn hơn 3 hoặc 4 độ lệch chuẩn so với giá trị trung bình).
Các vấn đề phân loại: Naive Bayes là một thuật toán phân loại phù hợp cho phân loại nhị phân và đa lớp.
Nhật ký xác suất: Việc tính toán khả năng của các giá trị lớp khác nhau liên quan đến việc nhân rất nhiều số nhỏ với nhau. Điều này có thể dẫn đến một dòng chảy của độ chính xác số. Vì vậy, đó là một thực hành tốt để sử dụng một biến đổi nhật ký của xác suất để tránh dòng chảy này.
Các hàm nhân: Thay vì giả sử phân phối Gaussian cho các giá trị đầu vào số, các phân phối phức tạp hơn có thể được sử dụng như một loạt các hàm mật độ nhân.
Cập nhật xác suất: Khi dữ liệu mới có sẵn, bạn chỉ cần cập nhật xác suất của mô hình. Điều này có thể hữu ích nếu dữ liệu thay đổi thường xuyên.

## Naive Bayes Trainning

Trong quy trình đào tạo của một vấn đề phân loại Bayes, dữ liệu mẫu thực hiện như sau:
Ước tính phân phối khả năng của X cho mỗi giá trị của Y
Ước tính xác suất tiền nghiệm P (Y = j)

Gaussian Naive Bayes in Scikit-learn.
Ta xét ví dụ với bộ dữ liệu hoa Iris để thử nghiệm.

```
from sklearn.naive_bayes import GaussianNB
from sklearn.datasets import load_iris
from sklearn.cross_validation import train_test_split
from sklearn.metrics import accuracy_score
```
```
# Create features' DataFrame and response Series
iris = load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=6)
```
```
# Instantiate: create object
gnb = GaussianNB()

# Fit
gnb.fit(X_train, y_train)

# Predict
y_pred = gnb.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
acc
```
Output: `0.92105263157894735`