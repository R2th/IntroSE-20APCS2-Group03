## 7. Định lý công xác suất
Ở mục trước, chúng ta đã nghiên cứu các phương pháp tính trực tiếp xác suất của các biến các biến cố bằng các định nghĩa về xác suất. Song những cách tính trực tiếp này không phải là cơ bản trong lý thuyết xác suất. Việc áp dụng chúng không phải lúc nào cũng tiện lơi và có thể dùng được.

Vì vậy, để xác định xác suất của biến cố, người ta thường không áp dụng các phương pháp tính trực tiếp mà áp dụng các phương pháp tính gián tiếp, cho phép tính xác suất của một biến cố dựa vào xác suất đã biết của các biến cố khác có liên quan với nó thông qua các định lý xác suất, thường được gọi là định lý *cộng xác suất, nhân xác suất*.
 ### 7.1 Định nghĩa 1
 Biến cố $C$ được gọi là tổng của hai biến cố $A$ và $B$, ký hiệu là $C = A + B$ nếu $C$ chỉ xảy ra khi có ít nhất một trong hau biến cố $A$ và $B$ xảy ra.
 
*VD1:* Hai người cùng bắn vào tấm bia. Gọi $A$ là biến cố người thứ nhất bắn trúng. $B$ là biến cố người thứ 2 bắn trúng, $C$ là biến cố người thứ bia trúng đạn. Rõ ràng là biến cố $C$ sẽ xảy ra khi có ít nhất một trong hai biến cố $A$ và $B$ xảy ra. Vậy $C = A + B$

*VD2:* Gieo một con xúc xắc. Gọi $A$ là biến cố xuất hiện mặt 6 chấm, $B$ là biến cố xuất hiện mặt 5 chấm, $C$ là biến cố có được ít nhất mặt 5 chấm. Biến cố $C$ xảy ra khi hoặc $A$ hoặc $B$ xảy ra. Vây Vậy $C = A + B$

### 7.2 Định nghĩa 2 
Biến cố $A$ được gọi là tổng của $n$ biến cố $A_1, A_2, ... A_n$ nếu $A$ xảy ra khi có ít nhất một trong $n$ biến cố ấy xảy ra. Ký hiệu 
$$A = \sum_{i=1}^nA_i$$

### 7.3 Định nghĩa 3 
Hai biến cố $A$ và $B$ được gọi là xung khắc với nhau nếu chúng không thể đồng thời xảy ra trong một phép thử. Trường hợp ngược lại, nếu hai biến cố có thể cùng xảy ra trong một phép thử thì được gọi là không xung khắc. 

*VD3:* Một bình có 3 loại cầu trắng, cầu xanh, cầu đỏ. Lấy ngẫu nhiên từ bình đó một quả cầu. Gọi $A$ là biến cố lấy được cầu trắng $B$ là biến cố lấy được cầu xanh, $A$ và $B$ là hai biến cố xung khắc vơí nhau.
### 7.4 Định nghĩa 4
Nhóm $n$  biến cố $A_1, A_2, A_3 ... A_n$ được gọi là biến cố xung khắc từng đôi một nếu bất kỳ hai biến cố nào trong nhóm này cũng xung khắc với nhau.

### 7.5 Định nghĩa 5
Các biến cố $A_1, A_2, ... A_3$ được gọi là một nhóm đầy đủ các biến cố nếu trong kết quả của một phép thử sẽ xảy ra một và chỉ một trong các biến cố đó.

### 7.6 Định nghĩa 6
Hai biến cố $A$ và $\overline{A}$ là đối lập nhau nếu chúng tạo nên một nhóm đầy đủ các biến cố.

*VD4:* Bắn một viên đạn vào bia. Gọi $A$ là biến cố bắn trúng bia  $\overline{A}$  là biến cố bắn trượt bia.   $A$ và $\overline{A}$ là hai biến cố đối lập nhau.

### 7.7 Định lý 
*Xác suất cuả tổng hai biến cố xung khắc bằng tổng xác suất của các biến cố đó*. 
Như vậy, nếu $A$ và $B$ là hai biến cố xung khắc với nhau thì:
$$P(A+ B) = P(A) + P(B)$$

*Hệ quả 1:* Xác suất của tổng các biến cố xung khắc từng đôi một $A_1, A_2, ... A_n$ bằng tổng xác suất của các biến cố đó.
$$P(\sum_{i=1}^nA_i) = \sum_{i=1}^nP(A_i)$$

## 8. Định lý nhân xác suất

### 8.1 Định nghĩa 1
Biến cố $C$ được gọi là tích của hai biến cố $A$ và $B$ nếu $C$ xảy ra khi và chỉ khi cả hai biến cố $A$ và $B$ cùng đồng thời xảy ra. Ký hiệu $C = A.B$
*VD1:* Một mạch điện gồm hai bóng đèn mắc song song. Gọi $A$ là biến cố bóng thứ nhất bị cháy khi điện bị quá tải, $B$ là biến cố bóng thứ hai cháy khi điện bị quá tải, $C$ là biến cố mạch điện bị ngắt khi điện quá tải. Rõ ràng $C$ chỉ xảy ra khi hai biến cố $A$ và $B$ cùng đồng thời xảy ra. Vậy $C=A.B$.

*VD2:* Có hai hộp, mỗi hộp đều đựng một số cầu trắng và cầu đen. Lấy ngẫu nhiên từ mỗi hộp một quả cầu. Gọi $A$ là biến cố lấy được cầu trắng ở hộp thứ nhất, $B$ là biến cố lấy được cầu trắng ở hộp thứ hai. $C$ là biến cố lấy được hai quả cầu trắng như vậy $C=A.B$.

### 8.2 Định nghĩa 2 
Biến cố $A$ được gọi là tích của $n$ biến cố $A_1, A_2, ... A_n$ nếu $A$ xảy ra khi và chỉ khi cả $n$ biến cố trên cùng đồng thời xảy ra. Ký hiệu: 
$$A = \prod_{1=1}^nA_i$$
Gắn liền với khái niệm về tích các biến số là khái niệm về sự độc lập và phụ thuộc vào các biến cố đó.

### 8.3 Định nghĩa 3
Hai biến cố $A$ và $B$ gọi là độc lập với nhau nếu xảy ra hay không xảy ra biến cố này không làm thay đổi xác suất của biến cố kia và ngược lại. Trong trường hợp việc biến cố này xảy ra hay không xảy ra làm cho xác suất xảy ra hay không xảy ra của biến cố kia thay đổi thì hai biến cố đó được gọi là phụ thuộc nhau.

*VD3:* Trong bình có 3 quả cầu trắng và 2 cầu đe. Lấy ngẫu nhiễn một quả cầu. Gọi $A$ là biến cố lấy được cầu trắng. Hiển nhiên là $P(A)= \frac{3}{5}$. Quả cầu được bỏ lại bình và và tiếp tục lấy một quả cầu. Gọi $B$ là biến cố lần thứ hai cũng lấy được cầu trắng. Cũng như trước $P(B)=\frac{3}{5}$ và không phụ thuộc gì vào kết quả lấy lần trước (biến cố $A$). Cũng như vậy xác suất lấy được quả cầu ở lần thứ nhất biến cố $A$ không phụ thuộc gì vào kết quả lấy của lần thứ hai (biến cố B). Vậy hai biến cố $A$ và $B$ là độc lập với nhau.

### 8.4 Định nghĩa 4
Các biến cố $A_1, A_2, ... A_n$ gọi là độc lập từng đôi một với nhau nếu mỗi cặp hai trong số $n$ biến cố đó độc lập với nhau.

Chẳng hạn ba biến cố $A_1, A_2, A_3$ gọi là độc lập từng đôi một với nhau nếu $A_1$ độc lập với $A_2$, $A_1$ độc lập với $A_3$ và $A_2$ độc lập với $A_3$.