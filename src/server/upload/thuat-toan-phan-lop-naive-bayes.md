&nbsp;&nbsp;&nbsp;&nbsp;Bộ phân lớp  Bayes là một giải thuật thuộc lớp giải thuật thống kê, nó có thể dự đoán xác suất của một phần tử dữ liệu thuộc vào một lớp là bao nhiêu. Phân lớp Bayes được dựa trên định lý Bayes (định lý được đặt theo tên tác giả của nó là Thomas Bayes)
## 1. Định lý Bayes
- Gọi A, B là hai biến cố<br>

![](https://images.viblo.asia/5d21c1b7-39f1-4b1d-bf0d-ae24eaf1dad8.png)

- Công thức Bayes tổng quát<br>

![](https://images.viblo.asia/42277770-2664-4169-bb10-fe86b6159d71.png)

&nbsp;&nbsp;&nbsp;&nbsp;Trong đó ta gọi A là một chứng cứ (evidence) (trong bài toán phân lớp A sẽ là một phần tử dữ liệu),  B là một giả thiết nào để cho A thuộc về một lớp C nào đó. Trong bài toán phân lớp chúng ta muốn xác định giá trị P(B/A) là xác suất để giả thiết B là đúng với chứng cứ A thuộc vào lớp C với điều kiện ra đã biết các thông tin mô tả A. P(B|A) là một xác suất hậu nghiệm (posterior probability hay posteriori probability) của B với điều kiện A.<br>
&nbsp;&nbsp;&nbsp;&nbsp;Giả sử tập dữ liệu liệu khách hàng của chúng ta được mô tả bởi các thuộc tính tuổi và thu nhập, và một khách hàng X có tuổi là 25 và thu nhập là 2000$. Giả sử H là giả thiết khách hàng đõ sẽ mua máy tính, thì P(H|X) phản ánh xác xuất người dùng X sẽ mua máy tính với điều kiện ta biết tuổi và thu nhập của người đó.<br>
&nbsp;&nbsp;&nbsp;&nbsp;Ngược lại P(H) là xác suất tiền nghiệm (prior probability hay priori probability) của H. Trong ví dụ trên, nó là xác suất một khách hàng sẽ mua máy tính mà không cần biết các thông tin về tuổi hay thu nhập của họ. Hay nói cách khác, xác suất này không phụ thuộc vào yếu tố X. Tương tự, P(X|H) là xác suất của X với điều kiện H (likelihood), nó là một xác suất hậu nghiệm. VÍ dụ, nó là xác suất người dùng X (có tuổi là 25 và thu nhập là $200) sẽ mua máy tính với điều kiện ta đã biết người đó sẽ mua máy tính. Cuối cùng P(X) là xác suất tiền nghiệm của X. Trong ví dụ trên, nó se là xác xuất một người trong tập dữ liệu sẽ có tuổi 25 và thu nhập $2000.<br>
**Posterior = Likelihood * Prior / Evidence**
## 2. Phân lớp Naive Bayes
&nbsp;&nbsp;&nbsp;&nbsp;Bộ phân lớp Naive bayes hay bộ phân lớp Bayes (simple byes classifier) hoạt động như sau:
1. Gọi D là tập dữ liệu huấn luyện, trong đó mỗi phần tử dữ liệu X được biểu diễn bằng một vector chứa n giá trị thuộc tính A<sub>1</sub>, A<sub>2</sub>,...,A<sub>n</sub> = {x<sub>1</sub>,x<sub>2</sub>,...,x<sub>n</sub>}
2. Giả sử có m lớp C<sub>1</sub>, C<sub>2</sub>,..,C<sub>m</sub>. Cho một phần tử dữ liệu X, bộ phân lớp sẽ gán nhãn cho X là lớp có xác suất hậu nghiệm lớn nhất. Cụ thể, bộ phân lớp Bayes sẽ dự đoán X thuộc vào lớp C<sub>i</sub> nếu và chỉ nếu:**<br>P(C<sub>i</sub>|X) > P(C<sub>j</sub>|X)  (1<= i, j <=m, i != j)**<br> Giá trị này sẽ tính dựa trên định lý Bayes.
3. Để tìm xác suất lớn nhất, ta nhận thấy các giá trị P(X) là giống nhau với mọi lớp nên không cần tính. Do đó ta chỉ cần tìm giá trị lớn nhất của P(X|C<sub>i</sub>) * P(C<sub>i</sub>). Chú ý rằng P(C<sub>i</sub>) được ước lượng bằng |D<sub>i</sub>|/|D|, trong đó D<sub>i</sub> là tập các phần tử dữ liệu thuộc lớp C<sub>i</sub>. Nếu xác suất tiền nghiệm P(C<sub>i</sub>) cũng không xác định được thì ta coi chúng bằng nhau P(C<sub>1</sub>) = P(C<sub>2</sub>) = ... = P(C<sub>m</sub>), khi đó ta chỉ cần tìm giá trị P(X|C<sub>i</sub>) lớn nhất.
4. Khi số lượng các thuộc tính mô tả dữ liệu là lớn thì chi phí tính toàn P(X|C<sub>i</sub>) là rất lớn, dó đó có thể giảm độ phức tạp của thuật toán Naive Bayes giả thiết các thuộc tính độc lập nhau. Khi đó ta có thể tính:<br>
**P(X|C<sub>i</sub>) = P(x<sub>1</sub>|C<sub>i</sub>)...P(x<sub>n</sub>|C<sub>i</sub>)**
### Ví dụ 1:
&nbsp;&nbsp;&nbsp;&nbsp;Phân các bệnh nhân thành 2 lớp ung thư và không ung thư. Giả sử xác suất để một người bị ung thư là 0.008 tức là P(cancer) = 0.008; và P(nocancer) = 0.992. Xác suất để bệnh nhân ung thư có kết quả xét nghiệm dương tính là 0.98 và xác suất để bệnh nhân không ung thư có kết quả dương tính là 0.03 tức là P(+/cancer) = 0.98, P(+/nocancer) = 0.03. Bây giờ giả sử một bệnh nhân có kết quả xét nghiệm dương tính. Ta có:<br>
P(+/canncer)P(cancer) = 0.98 * 0.008 = 0.0078<br>
P(+/nocancer)P(nocancer) = 0.03 * 0.992 = 0.0298<br>
Như vậy, P(+/nocancer)P(nocancer) >> P(+/cancer)P(cancer).<br>
Do đó ta xét đoán rằng, bệnh nhân là không ung thư.
### Ví dụ 2:

Cơ sở dữ liệu khách hàng:<br>
|ID  | Tuổi | Thu nhập | Sính viên  | Đánh giá tín dụng | Mua máy tính |
| -------- | -------- | -------- |-------- | -------- | -------- |
|  1    |youth      | high     | no     | fair     | no     |
|  2    |youth      | high     | no     | excellent     | no     |
|  3    |middle      | high     | no     | fair     | yes     |
|  4    |senior      | medium     | no     | fair     | yes     |
|  5    |senior     | low     | yes     | fair     | yes|
|  6    |senior      | low     | yes    | excellent     | no  | 
|  7   |middle      | low     | yes     | excellent     | yes|
|  8   |youth      | medum     | no     | fair     | yes|
|  9   |youth      | low    | yes   | fair     | yes|
|  10   |senior      | medium     | yes     | fair     | yes|
|  11   |youth      | medium     | yes     | excellent     | yes|
|12|middle|medium|no|excellent|yes|
|13|middle|high|yes|fair|yes|
|14|senior|medium|no|excellent|no|

&nbsp;&nbsp;&nbsp;&nbsp;Giả sử ta có một khách hàng mới X có các thuộc tính<br>
X = (age = youth, income = medium, student = yes, credit_rating = fair)<br>
Bây giớ cần xác định xem khách hàng X có thuộc lớp C<sub>yes</sub> (mua máy tính) hay không, ta tính toán như sau:<br>
P(C<sub>yes</sub>) = 9/14 = 0.357<br>
Các xác suất thành phần: <br>
P(age = youth|C<sub>yes</sub>) = 2/9 = 0.222<br>
P(age = youth|C<sub>no</sub>) = 3/5 = 0.6<br>
P(income = medium|C<sub>yes</sub>) = 4/9 = 0.444<br>
P(income = medium|C<sub>no</sub>) = 2/5 = 0.4<br>
P(student = yes|C<sub>yes</sub>) = 6/9 = 0.667<br>
P(student = yes|C<sub>no</sub>) = 1/5 = 0.2<br>
P(credit_rating = fair|C<sub>yes</sub>) = 6/9 = 0.667<br>
P(credit_rating = fair|C<sub>no</sub>) = 2/5 = 0.2<br>
Cuối cùng:<br>
P(X|C<sub>yes</sub>) = 0.222 * 0.444 * 0.667 * 0.667 = 0.044<br>
P(X|C<sub>no</sub>) = 0.60.4 * 0.2 * 0.4 = 0.019<br>
P(X|C<sub>yes</sub>)*P(C<sub>yes</sub>) = 0.044 * 0.643<br>
P(X|C<sub>no</sub>)*P(C<sub>no</sub>) =0.019 * 0.357 = 0.007<br>
    
&nbsp;&nbsp;&nbsp;&nbsp;Từ kết quả này ta thấy P(X |C<sub>yes</sub>)P(C<sub>yes</sub>) có giá trị lớn nhất, do đó thuật toán Bayes sẽ kết luận là khách hàng X sẽ mua máy tính.

## 3. Khắc phục vấn đề xác suất điều kiện bằng zero
* Nếu trong dữ liệu huấn luyện không có đối tượng X nào có thuộc tính lớp C<sub>k</sub> có thuộc tính F<sub>i</sub> nhận một giá trị cụ thể v<sup>i</sup><sub>j</sub>, xác suất điều kiện P(F<sub>i</sub> = x<sup>i</sup><sub>j</sub> | C<sub>k</sub>) sẽ bằng 0.
* Khi phân lớp, nếu có một đối tượng nào mang thuộc tính này thì xác suất phân vào lớp Ck luôn bằng 0.
* Khắc phục bằng cách ước lượng theo công thức sau:

![](https://images.viblo.asia/a453c7e3-615e-426e-a8e0-b891a15523d1.png)

## 4. Ưu điểm
1. Giả định độc lập: hoạt động tốt cho nhiều bài toán/miền sữ liệu và ứng dụng.<br>Đơn giản nhưng đủ tốt để giải quyết nhiều bài toán như phân lớp văn bản, lọc spam,..
2. Cho phép kết hợp tri thức tiền nghiệm (prior knowledge) và dữ liệu quan sát được (obserwed data). <br> Tốt khi có sự chệnh lệch số lượng giữa các lớp phân loại.
3. Huấn luyện mô hình (ước lượng tham số) dễ  và nhanh.
## 5. Nhược điểm
1. Giả định độc lập (ưu điểm cũng chính là nhược điểm) <br> hầu hết các trường hợp thực tế trong đó có các thuộc tính trong các đối tượng thường phụ thuộc lẫn nhau.
2. Vấn đề zero (đã nêu cách giải quyết ở phía trên)
3. Mô hình không được huẩn luyện bằng phượng pháp tối ưu mạnh và chặt chẽ.<br>Tham số mủa mô hình là các ước lượng xác suất điều kiện đơn lẻ.<br>Không tính đến sự tương tác giữa các ước lượng này.
## 6. Ứng dụng cụ thể
### 6.1. Phân lớp văn bản (document classification)
Tham khảo cuốn sách sau:<br>
Christopher Manning, Prabhakar Raghavan, and Hinrich Schutze,
Introduction to Information Retrieval, Cambridge University
Press, 2008. (Free)<br>
Chương 13. Text classification and Naïve Bayes<br>
Tham khảo thêm:<br>
http://en.wikipedia.org/wiki/Document_classification<br>
http://en.wikipedia.org/wiki/Naive_Bayes_classifier<br>
### 6.2. Lọc spam (Spam filtering)

Tham khảo: <br>
Bayesian spam filtering <br>
http://en.wikipedia.org/wiki/Bayesian_spam_filtering<br>
http://en.wikipedia.org/wiki/Naive_Bayes_classifier<br>
http://en.wikipedia.org/wiki/Email_filtering<br>

<br>&nbsp;&nbsp;&nbsp;&nbsp;*Bài viết tham khảo từ cuốn "Giáo trình khai phá dữ liệu" của thầy Hà Quang Thụy - Nguyễn Hà Nam - Nguyễn Trí Thành* :stuck_out_tongue_winking_eye: