# Khái niệm chung
> con người luôn có nhu cầu trao đổi thông tin với nhau (Communication) , những thông tin này được truyền dưới những dạng năng lượng khác nhau được gọi là *vật mang* (Carrier). Vật mang chứa thông tin trong nó, được gọi là *tín hiệu* (Signal).
> <br>Trong chương này sẽ giới thiệu 1 cách tổng quát về mô hình của 1 hệ thống truyền tin và chức năng các khâu chính trong mô hình này. 
-----
## 1.1 Hệ thống truyền tin
* Chúng ta có thể định nghĩa : *Truyền tin* (Transaction) là sự dịch chuuyển thông tin từ điểm này tới điểm khác trong một môi trường xác định. Hai điểm này gọi là *điểm nguồn* (Infomation source) và điểm *nhận tin* (Infomation destination). *Môi trường truyền tin* (Transmission media) còn được gọi là *kênh tin* (Channel).
* Chúng ta có thể phân làm hai loại hệ thống truyền tin: 
> * Hệ thống truyền tin rời rạc
> * hệ thống truyền tin liên tục <br>
> `Ví dụ: Hệ thống thông tin quang năng, Hệ thống thông tin dùng sóng siêu âm (năng lượng cơ học)`
<br>
![](https://images.viblo.asia/86480a98-22f6-4db8-b972-5fda1ae2b719.png) <br>
* Trong sơ đồ này: 
>1. Nguồn tin là nơi sản sinh ra hay chứa các tin cần truyền đi.
>2. Kênh tin là môi trường lan truyền thông tin.
>3. Nhận tin là cơ chế khôi phục thông tin ban đầu từ tín hiệu lấy ở đầu ra của kênh. <br>
### 1.1.1. Nguồn tin nguyên thuỷ
* *nguồn tin nguyên thuỷ* là tập hợp những những tin nguyên thuỷ (chưa qua một phép biến đổi nhận tạo nào). Ví dụ âm thanh tiếng nói, âm nhạc, hình ảnh, các biến đổi khí tượng...
* Thông tin nguyên thuỷ có thể là các hệ hàm theo thời gian và các thông số khác, ở đây là với trường hợp thông tin hình ảnh màu: 
> $\begin{cases}f(x,y,z)\\g(x,y,z)\\h(x,y,z)\end{cases}$ <br>
* Ở đây hàm *f(x,y,z)* làm hàm biến đổi liên tục theo thời gian còn *g(x,y,z) và h(x,y,z)* là hàm biến đổi theo toạ độ không gian màn hình.
* Các nguồn tin đã bị biến đổi nhân tạo sau đó đưa vào kênh truyền sẽ trở thành *nguồn tin rời rạc* và kênh truyền tin lúc đó cũng trở thành *kênh tin rời rạc*.
* Để nghiên cứu định lượng nguồn tin cũngn như hệ thống truyền tin, chúng ta có thể mô hình hoá toán học nguồn tin bằng 4 quá trình sau: 
>* *Quá trình ngẫu nhiên liên tục*: Nguồn tiếng nói, âm thanh, hình ảnh. Ví dụ trong các hệ thống thông tin thoại, truyền thanh, truyền hình.
>* *Quá trình ngẫu nhiên rời rạc*: Một quá trình ngẫy nhiên liên tục sau khi được lượng tử hoá sẽ trở thành quá trình này. Ví dụ một ngôn ngữ, tín hiệu điện tín.
>* *Dãy ngẫu nhiên liên tục*: Đây là trường hợp nguồn liên tục đã được gián đoạn hoá theo thời gian, như thường gặp trong các hệ thống xung điều biên.
>* *Dãy ngẫu nhiên rời rạc*: Trong các hệ thống thông tin xung có lượng tử hoá như điều biên (pha , tần) xung lượng tử hoá.
### 1.1.2. Kênh tin
* Kênh tin có thể được hiểu là một môi trường để hình thành tín hiệu mang tin và truyền tín hiệu mang tin. Trong kênh diễn ra sự làn truyền của tín hiệu mang tin và chịu tác động của tạp nhiễu. Khi tín hiệu đi qua các môi trường khác nhau, ngoài sự biến đổi về mặt năng lượng, dạng của tín hiệu cũng bị thay đổi do tác động của tạp nhiễu tồn tại trong các môi trường vật lý hoặc do phương thức truyền lan.
* Có 3 dạng môi trường truyền lan cơ bản:
>* Môi trường trong đó tác động của nhiễu cộng là chủ yếu.
>* Môi trường trong đó tác độ của nhiễu nhân là chủ yếu.
>* Môi trường gồm cả nhiễu công và nhiễu nhân.<br>
![](https://images.viblo.asia/01da3c9f-e5f3-408a-87d2-e77ddd19c829.png) <br>
* Với giả thiết rằng mạng hai cửa này có hàm truyền đơn vị (bằng 1) trên mọi tần số và trên toàn miền thời gian, ta có: 
> $S_r(t) = N_n(t)S_o(t) +N_c(t) $
* Trong đó $N_n(t)$ là ký hiệu cho nhiễn nhân và $N_c(t)$ là ký hiệu cho nhiễu cộng.
> * Nhiễu cộng sinh ra một tín hiệu ngẫu nhiên không mong muốn và tác động thêm vào tín hiệu ở đầu ra. Nhiễu cộng do các nguồn nhiễu công nghiệp và vũ trụ tạo ra, luôn tồn tại trong môi trường truyền lan tín hiệu.
> * Nhiễu nhân là tác động nhân vào tín hiệu, gây ra do phương thức truyền lan tín hiệu, hay là sự thay đổi thông số vật lý của bộ phận môi tường truyền lan khi tín hiệu đi qua.
* Các kênh trong thực tế không đảm bảo đặc tính xung hoặc đăc tính tần số đơn vị nên công thức tính tín hiệu ra là: 
> $S_r(t) = N_n(t)S_o(t)H(t) +N_c(t) $
* Ở đây $H(t)$ là đặc tính xung của kênh. Đặc tính kênh không lý tưởng này sẽ gây ra sự biến dạng của tính hiệu ra so với tín hiệu vào, gọi là méo tín hiệu, là 1 nguồn nhiễu trong quá trình truyền tin.
### 1.1.3. Nhận tin
* Nhận tin là đầu cuối của hệ thống truyền tin. Bộ xử lý thông tin có thể là người , có thể là thiết bị. Nếu bộ phận xử lý thông tin là thiết bị tự động thì chúng ta có một hệ thống truyền tin tự động.
* Nhiệm vụ chính của nhận tin là từ tín hiệu nhận được $Y(t)$ phải xác định được $X(t)$ nào được đưa vào đầu vào của kênh. Bài toán này được gọi là bài toán thu hay phục hồi tín tín hiêu tại điểm thu.
### 1.1.4. Những vấn đề cơ bản của hệ thống truyền tin
1. *Hiệu suất truyền tin*, hay là tốc độ truyền tin của hệ thống. Đó là lượng thông tin hệ thống cho phép, truyền đi trong 1 đơn vị thời gian.
2. *Độ chính xác truyền tin*, nói cách khác là khả năng chống nhiễu của hệ thống.
## 1.2. Rời rạc hoá một nguồn tin liên tục
> Phép biến đổi nguồn tin liên tục thành rời rạc gồm 2 khâu cơ bản:
> * Rời rạc hoá theo thời gian, hay còn được gọi là khâu `Lấy mẫu`.
> * Lượng tử hoá theo mức (viết tắt là `Lượng tử hoá`).
### 1.2.1. Lấy mẫu
* Lấy mẫu một hàm tin là trích từ hàm đó ra các mẫu tạo những thời điểm nhất định.
### 1.2.2. Lượng tử hoá
## 1.3. Độ đo thông tin
* Độ đo (Metric) của một đại lượng là ta xác định độ lớn của đại lượng đó. Mỗi độ đo phải thoải mãn 3 tính chất sau: 
> * Độ đo phải cho phép ta xác định được độ lớn của đại lượng. Đại lượng càng lớn, giá trị đo được càng phải lớn.
> * Độ đo phải không âm.
> * Độ đo phải tuyến tính, tức là giá trị đo được của đại lượng tổng cộng phải bằng tổng giá trị của các đại lượng riêng phần khi sử dụng độ đo này để đo chúng.
## 1.4. Mã hoá
* Mã hoá là một phép biến đổi cấu trúc của thống kê của nguồn. 
* Nói một cách khác, lớp tin ở đầu vào thiết bị mã hoá được thay thế bằng một lớp tin khác tương đương và kinh tế hơn, như tốc độ hình thành tin gần với khả năng cho thông tin qua của kênh hơn, tính chống nhiễu của tin khi truyền qua kênh cũng tăng lên.
* ví dụ chúng ra có một nguồn tin có 4 đẳng tin xác suất với sơ đồ thống kê như sau: 
> * $A = \begin{pmatrix}
   a1 & a1 & a3 & a4 \\
   \frac 1 4 & \frac 1 4 & \frac 1 4 & \frac 1 4 &
\end{pmatrix}$
> * lượng tin $I(a_i)$ chứa trong một tin của A bằng: $I(a_i) = 1.(-log_2 \frac 1 4 ) = 2bit$
* Bằng một phép mã hoá như sau: 
> $a1 \to b1b2$<br>
> $a2 \to b1b2$<br>
> $a3 \to b2b1$<br>
> $a4 \to b2b2$<br>
* Chúng ta đổi thành một nguồn tin mới gồm 2 ký hiệu đẳng xác suất: 
> $B = \begin{pmatrix}
   b1 & b2 \\
   \frac 1 4 & \frac 1 4 
\end{pmatrix}$
* Lượng tin chứa trong một tin của B cũng vẫn bằng lượng tin chứa trong tin tương ứng của A, ví dụ tin b1b1 tương ứng với tin a1 trong A: 
> $I(b1b2) = 2log_22 = 2(bit)$
* Nói chung khi mã hoá một tin x của nguồn A bằng 1 tin y của nguồn B, chúng ta đã thay một dãy ký hiệu: 
> $x = (x1,x2,...,xn)$
> trong  đó $x_j = a_i$ bất kỳ, i = 1,2,...,m; j = 1,2,...,n bằng một dãy ký kiệu: <br>
> $x = (y1,y2,...,y'n)$ với $y_j$ bất kỳ $b_i \in B, i = 1,2,..,m; j = 1,2,..,n'$
* Sự biến đổi đó phải đảm bảo một đối tượng và lượng tin chứa trong x và y bằng nhau:
> $I(x) = nlogm = I(y) = n'logm$