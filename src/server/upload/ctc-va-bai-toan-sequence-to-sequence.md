## Thuật toán CTC
### Giới thiệu
Seq2Seq là dạng bài toán có input và output đều dạng chuỗi. Những bài toán Seq2Seq như Machine Translate, Auto Tagging, Speech to Text, Text to Speech, Handwriting recognition khá quen thuộc và hầu hết giải pháp tối ưu nhất cho những bài toán này đều dựa vào Deep learning. Trong đó có hai dạng khá là khó: Speech to Text và Handwriting recognition, hãy quan sát ví dụ dưới đây:
![](https://images.viblo.asia/cf5ef4ef-f110-4597-bab4-1470c1fe1e6b.png)

Định nghĩa bài toán: input là 1 chuỗi X = $[x_1, x_2, x_3,... x_T]$, output là chuỗi Y = $[y1, y2, y3,  .. y_U]$.  Dễ nhận ra vấn đề của bài toán này:
* Độ dài X và Y là biến số (tức không phải là 1 hằng số cố định)  và giá trị khác nhau.
* Độ rộng của từng phần tử $x_i$ không giống nhau. Rất khó để chia input thành từng đoạn rõ ràng, tách biệt .

Trước đây, trước khi có CTC người ta dùng các giải pháp để cố gắng tách chuỗi input thành từng đoạn tương ứng với $y_i$ .Tuy nhiên cách này không hiệu quả lắm. CTC ra đời nhằm giải quyết những bài toán dạng này.
### Ý tưởng CTC
Thay vì tìm cách phân đoạn (align) bằng các thuật toán được định nghĩa bên ngoài, CTC sẽ tự học và làm việc đó. Hãy quan sát hình dưới đây.

![](https://images.viblo.asia/f45f0db2-b3b9-4fd8-aa3e-fb754201a41e.png)

Giả sử input là một audio chia thành 10 time_step, output mà chúng ta cần là "hello".  Thay vì tìm cách predict ra "hello", ta sẽ predict ra các *biến thể* của nó là "hhheel_llo", "h_e_ll_l_o", ... mỗi biến thể này ta gọi là một **alignment**. Độ dài của một alignment bằng với độ dài input = T   ($timesteps$). Như vậy model deep learning sẽ có nhiệm vụ từ input đầu vào với $timestep$ = t,  model phải predict ra một alignment ( "hhheel_llo" hoặc h_e_ll_l_o, ... ) tương ứng với nhãn "hello". Từ các alignment, loại bỏ các kí tự lặp ta thu được kết quả mong muốn.  Xác xuất để predict ra "hello" bằng tổng xác xuất tất cả alignment tương ứng.

### Cách tạo ra các alignment
Tạo các alignment cho "hello" bằng cách lặp lại các kí tự với sao cho len(y) = len(x). Có một vấn đề đặt ra là: giả sử model predict ra được "heeeeellloo", output sau khi loại bỏ các kí tự lặp ta chỉ thu được "helo" thay vì "hello". 

Giải quyết vấn đề này, ta sử dụng kí tự đặc biệt *blank token* - $ϵ$ (đừng nhầm với kí tự khoảng trắng, khoảng cách). $ϵ$ được thêm vào bất kì chỗ nào trong chuỗi "hello", và bắt buộc phải được thêm vào giữa hai kí tự giống nhau liền kề.
Như vậy, sau khi align từ "hello", ta được các alignment "heeeel--llo",  '-hell-l--oo' ..v.v  luôn có ít nhất một kí tự "-" giữa hai kí tự "l" ( "-" là biểu diễn cho $ϵ$)

### Loss function
Đặt $A_{XY}$ là tập tất cả các alignment A của Y. Xác xuất model có thể predict ra Y với input X là tổng xác xuất của tất cả phần tử A trong $A_{XY}$ với điều kiện X:
![](https://images.viblo.asia/95fd4906-48e1-47b2-973f-0e9c0a2ba944.png)

**Loss function** cần tối ưu chính là Loss = -p(Y|X)

### Phương pháp tính P(Y|X) cải tiến
Về lý thuyết, để tính P(Y|X), ta cần thống kê ra tất cả các trường hợp có thể alignment (kể cả đúng và sai). Giả sử với tập 9 kí tự, *time_step* = 10,  số lượng tổ hợp  lên tới $10^9$. Số lượng tổ hợp tăng cấp số nhân theo số lượng kí tự và *time_step* .

Để cải thiện tốc độ, người ta đã sử dụng thuật toán dynamic programing, thuật toán như sau:

Do *blank token* $ϵ$ có thể xuất hiện tại bất kì vị trí nào trong chuỗi Y, để dễ dàng mô tả thuật toán, ta đặt Z = [$ϵ$, y1, $ϵ$, y2 ... ys, $ϵ$]. Chi tiết:
+ Z được tạo từ Y với các kí tự $ϵ$ xen giữa các kí tự $y_i$, length(Z) = S
+ Đặt M là chuỗi kết quả model predict ra được, length(M) = length(input) = T.
+ Đặt $p_{s,t}$ là xác suất để M[t] = Z[s]
+ Đặt $a_{s,t}$ là xác suất tạo chuỗi Z[1:s]  từ chuỗi M[1:t] thu gọn. 
+ Ví dụ Y = "hello"  => Z = [$ϵ$, h, $ϵ$, e, $ϵ$, l, $ϵ$, l, $ϵ$, o, $ϵ$ ]. kết quả cuối cùng model predict ra là chuỗi M = "$ϵ$,h,$ϵ$,e,e,$ϵ$,l,l,$ϵ$,l,$ϵ$,o,$ϵ$". Có thể tính $a_{4,5}$ là xác suất chuỗi gồm 5 kí tự đầu tiên ""$ϵ$,h,$ϵ$,e,e" trong chuỗi M trở thành chuỗi gồm 4 kí tự [$ϵ$, h, $ϵ$, e] trong chuỗi Z
+   Tư tưởng của dynamic programing trong việc tính loss function này là: **khi biết $a_{s,t}$ và $p_{s,t}$ ta có thể tính được $a_{s,t+1}$, $a_{s+1,t+1}$**

![](https://images.viblo.asia/21797b79-abc8-4e33-a3b2-de58760c932e.png)

> Note: Thực sự thuật toán này đọc hơi trìu tượng và rất khó để diễn ra nên các bạn có thể skip phần này (mình mất 1 buổi chiều để viết nhưng có vẻ vẫn rất khó hiểu ). CTC_loss hiện tại đều được hỗ trợ trong keras, tensorflow hay các thư viện khác nên bạn không cần phải code lại.
-----
Có 2 trường hợp xảy ra khi tính $a_{s,t}$
#### Case 1: Z[s-1] = $ϵ$ và nằm giữa hai kí tự giống nhau
Trong trường hợp này, kí tự $ϵ$ là kí tự không thể thiếu, bắt buộc phải có để phân biệt hai kí tự giống nhau. Vậy sẽ có hai trường hợp hợp lệ xảy ra taị thời điểm t-1 là:  M[t-1] = Z[s-1] = $ϵ$ và M[t-1] = Z[s]  (do Z[s-1] = $ϵ$ nên Z[s] != $ϵ$)

Vậy:    $a_{s,t}$ = ( $a_{s-1,t-1}$ + $a_{s,t-1}$ ) . $p_{s,t}$

#### Case 2: Z[s-1] = $ϵ$ và nằm giữa hai kí tự khác nhau 
Đặt hai kí tự khác nhau này là  b và c . Trong trường hợp này, kí tự $ϵ$ không còn quan trọng (tức không giữ vai trò phân biệt hai kí tự lặp) nên kết quả tính ra có thể không cần $ϵ$. Vậy tại 1 thời điểm t với M[t] = b, sẽ có 3 khả năng xảy ra tại thời điểm t-1:
M[t-1] = c, M[t-1] = $ϵ$ , M[t-1] = b. ( Khi tính toán, trường hợp này tương đương với trường hợp Z[s-1] != $ϵ$ )

Vậy:  $a_{s,t}$ = ( $a_{s-2,t-1}$ +  $a_{s-1,t-1}$ + $a_{s,t-1}$ ) . $p_{s,t}$

Như vậy mình đã giới thiệu qua về tư tưởng của CTC, hơi khó hiểu nên mình sẽ cố gắng mô tả lại thuật toán dễ hiểu hơn, thanks :D.