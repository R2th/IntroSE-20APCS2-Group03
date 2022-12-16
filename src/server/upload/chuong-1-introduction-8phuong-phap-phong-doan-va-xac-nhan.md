### 1.26 Method of Guessing and Confirming
Ở bài viết này, mình sẽ trình bày phương pháp có thể được sử dụng để giải quyết bất kỳ sự lặp lại nào. \
Ý tưởng cơ bản của phương pháp này là :

> **Đoán đáp án, sau đó chứng minh bằng quy nạp.**

Nói cách khác, nó giải quyết câu hỏi:\
  Điều gì sẽ xảy ra nếu sự lặp lại đã cho dường như không khớp với bất kỳ phương pháp nào trong số master theorem ( định lý chính) mà mình đã trình bày trong các bài trước? \
  Nếu chúng ta **đoán một giải pháp** và sau đó cố gắng **xác minh theo suy đoán** của mình, thường là việc chứng minh sẽ thành công (trong trường hợp này chúng ta đã hoàn thành), hoặc thất bại (trong trường hợp này, thất bại sẽ giúp chúng ta tinh chỉnh lại suy đoán của mình).
  
  **Ví dụ:** ta hãy xem xét hàm đệ quy sau: $T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n$. Cấu trúc này không phù hợp với bất kỳ form nào trong các Master Theorem. Quan sát kĩ hàm đệ quy cho chúng ta ấn tượng rằng nó tương tự như phương pháp chia để trị (chia bài toán thành $\sqrt { n }$ các bài toán con với kích thước mỗi bài toán $\sqrt { n }$).\
  Như chúng ta thấy, kích thước của các bài toán con ở mức đệ quy đầu tiên là n.\
  Vì vậy, chúng ta hãy đoán rằng $T ( n ) = O ( n l o g n )$, và sau đó cố gắng chứng minh rằng suy đoán của chúng ta là đúng.
  
Hãy bắt đầu bằng cách cố gắng chứng minh một giới hạn trên upper bound $T ( n ) \leq c n l o g n$:\
$T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n$\
$\quad \quad \leq \quad \sqrt { n } \cdot c \sqrt { n } V o g \sqrt { n } + n$\
$\quad \quad  = n . c l o g \sqrt { n } + n$\
$\quad \quad  = n . c . \frac { 1 } { 2 } . l o g n + n$
$\quad \quad  \leq c . n . l o g n$ (*)

Từ (*) =>  $1  \leq c . n . l o g n$. Điều này đúng nếu n đủ lớn và với bất kỳ hằng số c nào, dù nhỏ đến đâu.\
Từ chứng minh trên, chúng ta có thể thấy rằng suy đoán của chúng ta là đúng đối với giới hạn trên.

Chúng ta tiếp tục chứng minh giới hạn dưới lower bound cho hàm đệ quy này.\
$T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n$\
$\quad \quad  \geq \sqrt { n } . k \sqrt { n} l o g \sqrt { n } + n$\
$\quad \quad = n . k l o g \sqrt { n } + n$\
$\quad \quad = n . k \frac { 1 } { 2 }  . l o g n + n$ 
$\geq k n l o g n$ (*)

Từ (*) => $1 \geq k . { \frac { 1 } { 2 } } . l o g n$. Điều này không chính xác nếu n đủ lớn và với bất kỳ hằng số k. \
Từ bằng chứng trên, chúng ta có thể thấy rằng suy đoán của chúng ta không chính xác đối với giới hạn dưới này.


-----


Từ chứng minh ở trên, chúng ta hiểu rằng Θ(nlogn) là quá lớn. Nếu vậy Θ(n) thì sao? Giới hạn dưới dễ dàng chứng minh trực tiếp:\
$\quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n  \geq n$\
Bây giờ, chúng ta hãy chứng minh giới hạn trên cho Θ (n) này.\
$T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n$\
$\quad \quad \leq \sqrt { n } . c . \sqrt { n } + n$\
$\quad \quad =  n  . c  + n$\
$\quad \quad =  n  .( c  + 1)$\
![image.png](https://images.viblo.asia/d9b3f594-1dfc-4e5d-8f1c-89870a2f2889.png) (Kí hiệu này mình thử mãi không biểu diễn được nên đành chụp ảnh vậy 😁)


-----


Từ chứng minh trên, chúng ta hiểu rằng **Θ (n) quá nhỏ và Θ (nlogn) quá lớn**. Vì vậy, chúng ta cần một cái gì đó lớn hơn n và nhỏ hơn nlogn.\
Thử với $n l o g l o g n$.\
Chứng minh cận trên upper bound cho $n l o g l o g n$\
$T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n$\
$\quad \quad \leq \sqrt { n } . c . \sqrt { n } l o g l o g \sqrt { n } + n$\
$\quad \quad = n . c . ( l o g l o g  n + log(\frac { 1 } { 2 } ) ) + n$\
$\quad \quad = n . c . { l o g l o g  n - c .n } + n$ (Lấy log cơ số 2 => $log(\frac { 1 } { 2 } )$ = -1)\
$\quad \quad \leq c n l o g l o g n , if c \geq 1$

Chứng minh cận dưới lower bound cho $n l o g l o g n$\
$T ( n ) = \sqrt { n } T ( \sqrt { n } ) + n$\
$\quad \quad \geq \sqrt { n } \cdot k \cdot \sqrt { n } l o g l o g \sqrt { n } + n$\
$\quad \quad = n .k. l o g l o g n - k . n + n$\
$\quad \quad \geq k n l o g l o g n , \text { i f } k \leq 1$


Từ các chứng minh trên, chúng ta có thể thấy rằng T (n) ≤ cnloglogn, nếu c ≥ 1 và T (n) ≥ knloglogn, nếu k ≤ 1.\
Yeah, chứng minh thành công, ta đã tìm được cận trên và dưới của hàm T(n) đã cho.

### Tạm kết
Haizzzzz, quả là nhiều toán, lâu lâu mới động vào cũng đau đầu thật các bạn ạ 😅\
Bài viết tiếp theo sẽ là Amortized Analysis(Phân tích khấu hao), lý thuyết cuối cùng của chương 1, sau đó sẽ là 1 số Problem và các solution để chúng ta áp dụng và nhớ hơn các lý thuyết đã học 😁