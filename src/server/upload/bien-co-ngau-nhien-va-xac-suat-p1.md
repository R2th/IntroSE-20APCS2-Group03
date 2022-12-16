## 1. Phép thử và các loại biến cố 
Trong tự nhiên và trong xã hội, mỗi hiện tượng đều gắn liền với một nhóm các điều kiện cơ bản và các hiện tượng đó chỉ có thể xảy ra khi nhóm các điều kiện cơ bản gắn với nó được thưc hiện. Do đó, khi muốn nghiên cứu một hiện tượng, ta cần thực hiện nhóm các điều kiện cơ bản đấy.
Việc thực hiện một nhóm các điều kiện cơ bản để quan sát một hiện tượng nào đó có thể xảy ra hay không được gọi là thực hiện một phép thử, còn hiện tượng có thể xảy ra trong kết quả của phép thử được gọi là biến cố. (Vd. Gieo một con xúc sắc xuống đất là một phép thử còn việc lật lên một mặt là biến cố)
* *Biến cố chắc chắn*: Là biến cố chắc chắn sẽ xảy ra khi thực hiện một phép thử. Biến cố chắc chắn được ký hiệu là $U$. Vd. Khi gieo con xúc xắc gọi $U$ là biến cố xuất hiện số chấm nhỏ hơn bằng 6. Biến cố chắc chắn được ký hiệu bằng $U$.
* *Biến cố không thể có*: Là biến cố nhất định không xảy ra khi thực hiện phép thử. Biến cố không thể có được ký hiệu là $V$. Vd. Khi gieo một con xúc xắc, gọi $V$ là biến cố "xuất hiện mặt có 7 chấm" $V$ là biến cố không thể có. 
* *Biến cố ngẫu nhiên*: Là biến cố có thể xảy ra hoặc hoặc không xảy ra khi thực hiện phép thử. Các biến cố ngẫu nhiên được ký hiệu là A, B, C hoặc $A_1, A_2 ... A_n, B_1, B_2 ... B_n$


## 2. Xác suất của biến cố 
Như đã thấy ở trên, việc biến cố ngẫu nhiên xảy ra hay không xảy ra trong trong kết quả của phép thử là điều không thể đoán trước được. Tuy nhiên bằng trực quan có thể nhận thấy các biến cố ngẫu nhiên khác nhau có những khả năng khách quan khác nhau. Chẳng hạn biến cố "Xuất hiện mặt sấp" khi gieo một đồng xu có khả năng xảy ra lớn hơn nhiều so với biến cố "Xuất hiện mặt một chấm" khi gieo một con xúc xắc. Hơn nữa, khi lặp đi lặp lại nhiều lần cùng một phép thử trong những điều kiện như nhau, người ta sẽ nhận thấy rằng tính ngẫu nhiên của biến cố mất dần đi và khả năng xảy ra của biến cố sẽ được thể hiện theo những quy luật nhất định. Từ đó ta có khả năng định lượng (đo lường), khả năng khách quan xuất hiện một biến cố nào đó.


## 3. Định nghĩa cổ điển về xác suất
#### 1. ĐỊnh nghĩa
Xác suất của biến cố $A$ trong một phép thử là tỷ số giữa kết cục thuận lợi cho $A$ và tổng số các kết cục duy nhất đồng khả năng có thể xảy ra khi thực hiện phép thử đó.
Nếu ký hiệu $P(A)$ là xác suất của biến cố $A$, $m$ là số kết cục thuận lợi cho biến cố $A$, $n$ là số kết cục duy nhất đồng khả năng của phép thử, ta có công thức sau : 
$$P(A) =  \frac{m}{n} $$
trong đó: m, n là các số nguyên không âm.


#### 2. Các tính chất của xác suất
* Từ định nghĩa cổ điển về xác suất ta có thể suy ra các tính chất sau đây:
Xác suất của biến cố ngẫu nhiên là một số dương nằm trong khoảng 0 và 1. 
$$0 < P(A) < 1$$
* Xác suất của biến cố chắc chắn bằng 1.
$$P(U)=\frac{m}{n} = 1$$
* Xác suất của biến cố không thể có bằng không.
$$P(V)=\frac{m}{n} = 0$$


#### 3. Các phương pháp tính xác suất bằng định nghĩa cổ điển 
##### 3.1. Phương pháp suy luận trực tiếp:
Nếu số các kết cục trong phép thử là khá nhỏ và việc suy đoán là khá đơn giản thì có thể sử dụng phương pháp suy luận trực tiếp.


*VD1*: Trong bình có $a$ quả cầu trắng và $b$ quả cầu đen ($a, b$ là các số nguyên không âm). Lây ngẫu nhiên một quả cầu tìm xác suất để được quả cầu trắng.


*Giải*:  Gọi $A$ là biến cố lấy được quả cầu trắng. Khi lấy ngẫu nhiên từ bình ra một quả cầu, ta có thể lấy được bất kỳ quả nào trong số a + b quả cầu có trong bình. Như vậy số kết cục thuận lợi $m = a$. Từ đó theo định nghĩa cổ điển về xác suất ta có:
$$P(A) = \frac{m}{n} = \frac{a}{a + b}$$

##### 3.2 Phương pháp dùng sơ đồ Venn:
Khi số kết cục là khá lớn và việc suy đoán phức tạp hơn thì có thể dùng sơ đồ Venn, tức là mô tả các kết cục của phép thử dưới dạng sơ đồ để dễ nhận biết hơn. Trong thực tế có các loại sơ đồ sau: 


1. Sơ đồ cây
2. Sơ đồ dạng bảng 
3. Sơ đồ dạng tập hợp 


##### 3.3 Phương pháp dùng các công thức của giải tích tổ hợp
Nếu số kết cục của phép thử là rất lớn mà không thể suy đoán trực tiếp được thì có thể dùng các công thức của giải tích tổ hợp, chủ yếu là các công thức tổ hợp chỉnh hợp, chỉnh hợp lặp, hoán vị và tổ hợp để tính toán.


*VD1.* Một người khi gọi điện thoại quên mất hai số cuối của số điện thoại và chỉ nhớ được chúng khác nhau. Tìm xác suất để quay ngẫu nhiên một lần được đúng số cần gọi. 


*Giải:* Gọi $B$ là biến cố "Quay ngẫu nhiên một lần được đúng số cần gọi". Số kết cục đồng khả năng là tất cả phương thức để lập nên một cặp hai số khác nhau từ 10 số tự nhiên đầu tiên. Nó bằng chỉnh hợp chập 2 từ 10. Như vậy $n = A_{10}^{2}=10.9=90$. Còn số kết cục thuận lợi cho biến cố $B$ xảy ra chỉ một kết cục. Do đó theo định nghĩa cổ điển:
$$P(B) = \frac{m}{n}$$


*VD2.*  BIết rằng 3 tháng cuối năm có 5 máy đã bị hỏng. Tìm xác suất để không có ngày nào có quá quá một máy bị hỏng.


*Giải:* Gọi $A$ là biến cố không có ngày nào có quá một máy bị hỏng. Số kết cục đồng khả năng là số chỉnh hợp chập 5 từ 92 phần tử ($n = \overline{A}_{92}^5 = 92^5$).


Số kết cục thuận lợi là số chỉnh hợp chập 5 từ 92 phần tử ($n = {A}_{92}^5 = 88.89.90.91.92 = 0.8954$).


Vậy 
$$ P(A) =  \frac{m}{n} = \frac{88.89.90.91.92}{92^5} = 0.8954 $$

## 4. Định nghĩa thống kê về xác suất
### 1.  Định nghĩa 1 
Tần số xuất hiện biến cố trong $n$ phép thử là tỷ số giữa số phép thử trong đó biến cố xuất hiện và tổng số phép thử được thực hiện. Như vậy, nếu ký hiệu số phép thử là $n$, số lần xuất hiện biến cố $A$ là $k$ tần suất xuất hiện biến cố $A$ là $f(A)$ thì:
$$f(A) = \frac{k}{n}$$

*VD1:* Khi kiểm tra ngẫu nhiên 80 sản phẩm do một nhà máy sản xuất, người ta phát hiện ra 3 phế phẩm. Vậy tần suất xuất hiện của phế phẩm bằng: 
$$f(A) =  \frac{3}{80} $$

### 2. Định nghĩa 2
Xác suất xuất hiện biến cố $A$ trong một phép thử là một số $p$ không đổi mà tần suất $f$ xuất hiện biến cố đó trong $n$ phép thử sẽ dao động rất ít xung quanh nó khi phép thử tăng lên vô hạn. Như vậy về mặt thực tế số phép thử đủ lớn có thể lấy: 
$$P(A)  \approx f(A)$$
### 3. Ưu điểm và hạn chế của định nghĩa thống kê về xác suất
Định nghĩa thống kê về xác suất có ưu điểm lớn là nó không đòi hỏi những điều kiện áp dụng  như đối với định nghĩa cổ điển. Nó hoàn toàn dựa trên các quan sát thực tế để làm cơ sở kết luận về xác suất xảy ra của một biến cố.

Tuy nhiên, định nghĩa thống kê về xác suất chỉ áp dụng được đối các hiện tượng ngẫu nhiên mà tần suất của nó có tính ổn định. Hơn nữa, để xác định một cách tương đối chính xác giá trị của xác suất ta phải tiến hành trên thực tế một số đủ lớn các phép thử.

## 5. Một số định nghĩa khác về xác suất
Trong thực tế ngoài định nghĩa cổ điển và định nghĩa thống kê về xác suất người ta còn sử dụng một số định nghĩa sau về xác suất. 
### 1. Định nghĩa hình học về xác suất
Định nghĩa hình học về xác suất có thể sử dụng khi xác suất để một điểm ngẫu nhiên rơi vào một phần nào đó của một miền cho trước tỷ lệ với độ đo của miền đó (độ dài, diện tích, thể tích ...) và không phụ thuộc vào vị trí và dạng thức của miền đó.
Nếu độ đo hình học của toàn bộ miền cho trước là $S$, còn độ đo hình học của một phần $A$ nào đó là $S_A$ thì xác suất để điểm ngẫu nhiên rơi vào phần $A$ sẽ bằng:
$$P= \frac{S_A}{S}$$
Trong đó $S, S_A$ có thể có độ đo bất kỳ. Như vậy có thể xem định nghĩa hình học về xác suất là sự mở rộng tương ứng của định nghĩa cổ điển về xác suất.
### 2. Xác suất chủ quan 
Xác suất chủ quan được định nghĩa như sự đánh giá chủ quan của một cá nhân nào đó về khả năng xảy ra của biến cố. Sự đánh giá này chủ yếu dựa trên nhận xét cá nhân, thông tin ngoại lai, trực giác hoặc kinh nghiệm tích luỹ được của một cá nhân liên quan đến hiện tượng được xem xét. Như vây, với cùng một hiện tượng thì xác suất chủ quan của người này có thể ngừoi này có thể rất khác so với xác suất chủ quan của người khác, vì vậy nó còn gọi là xác suất của cá nhân.
## 6. Nguyên lý xác suất lớn và xác suất nhỏ
Trong nhiều bài toán thực tế ta thường gặp biến cố có xác suất rất nhỏ, tức là gần bằng 0. Trong trường hợp đó liệu có thể cho rằng những biến cố có xác suất rất nhỏ sẽ không xảy ra khi thực hiện một phép thử ? Tất nhiên là không thể kết luận như vậy, vì như đã nêu thậm chí một biến cố có xác suất bằng không vẫn không thể chắc chắn biến cố không thể có, tức là cũng có thể xảy ra.

Tuy nhiên qua nhiều lần quan sát, người ta thấy rằng các biến cố có xác suất nhỏ gần như sẽ không thể xảy ra khi tiến hành một phép thử. Trên cơ sở đó có thể đưa ra "Nguyên lý thực tế không thể có của các biến cố có xác suất nhỏ sau đây":  *Nếu một biến cố có xác suất rất nhỏ thì thực tế có thể cho rằng trong một phép thử biến cố đó sẽ không xảy ra.*

Tương tự như vây, ta có thể đưa ra "Nguyên lý thực tế chắc chắn xảy ra của các biến cố của xác suất lớn" như sau: "*Nếu biến cố ngẫu nhiên có xác suất gần bằng 1 thì thực tế có thể cho rằng biến cố đó sẽ xảy ra trong một phép thử*"