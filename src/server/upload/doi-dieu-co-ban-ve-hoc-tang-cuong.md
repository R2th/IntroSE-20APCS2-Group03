# 1. Giới thiệu

Ắt hẳn các bạn đang đọc đã từng biết đến ít nhất một môn cờ (cờ caro, cờ vua, cờ tướng, cờ vây, ...). Mỗi một môn cờ có những luật chơi, chiến thuật và không gian các nước đi khác nhau, như số nước đi hợp lệ trong cờ vua là $10^{120}$ với trung bình 30 đến 40 nước đi mỗi ván cờ ([CLAUDE E. SHANNON - Programming a Computer for Playing Chess](https://vision.unipv.it/IA1/ProgrammingaComputerforPlayingChess.pdf)), số lượng vị trí nước đi hợp lệ trên bàn cờ trong cờ vây được ước tính là $2.10^{170}$ ([Wikipedia](https://vi.wikipedia.org/wiki/C%E1%BB%9D_v%C3%A2y)). Nếu bạn thấy nó vẫn còn ít thì hãy nhớ rằng số lượng nguyên tử trong vũ trụ chỉ khoảng $10^{78}$ đến $10^{82}$ nguyên tử ([Universe today](https://www.universetoday.com/36302/atoms-in-the-universe/)). Nếu bạn vẫn chưa hình dung ra nó nhiều như thế nào 😑 thì hãy cứ xem rằng nó rất rất lớn đến mức các siêu máy tính mạnh nhất hiện nay cũng không thể tính toán hết số lượng các nước cờ có thể xảy ra để tìm ra một nước đi tối ưu trong thời gian một đời người.

Với số lượng nước đi lớn như vậy, các thuật toán trong các chương trình máy tính chơi cờ hiện nay mới chỉ xét được một số lượng rất nhỏ không gian các bước đi. Do đó các phần mềm này chưa thắng được các đại kiện tướng,  những cờ thủ chuyên nghiệp, cho đến khi AlphaGo ra đời. Theo mô tả trên [trang chủ](https://www.deepmind.com/research/highlighted-research/alphago), đây là phần mềm máy tính đầu tiên đánh bại một người chơi cờ vây chuyên nghiệp. Điều đặc biệt làm cho AlphaGo trở nên mạnh mẽ như vậy một phần là do sự phát triển của trí tuệ nhân tạo, và một nhánh trong đó là **Học tăng cường (Reinforcement learning)**. AlphaGo đã tự chơi với chính nó và cải thiện dần dần các **mạng neural** được sử dụng để đánh giá bàn cờ, đưa ra chiến lược và quyết định các nước đi.

Trong bài viết này mình sẽ trình bày một số **khái niệm cơ bản** của **học tăng cường**.  Bài viết này nằm trong series mà mình đã lên kế hoạch viết trong quá trình tìm hiểu về học tăng cường, nhằm mục đích tổng hợp lại những điều mình học và chia sẻ kiến thức. Do đó, mình sẽ không thể tránh khỏi những thiếu sót, rất mong nhận được sự góp ý của các bạn. 

# 2. Tổng quan

### 2.1 Một số định nghĩa

**Học tăng cường (Reinforcement learning - RL)** là một nhánh của **học máy (Machine learning - ML)**, nghiên cứu cách thức một ***tác nhân (Agent)*** trong một ***môi trường (Environment)*** đang ở một ***trạng thái (State)*** thực hiện một ***hành động (Action)***  để tối ưu hóa một ***phần thưởng (Reward)*** chung.

Một bài toán học tăng cường thường được mô hình dưới dạng một *qui trình đưa ra quyết định Markov* (cái này mình không biết dùng từ gì, tiếng anh của nó là **Markov decision process - MDP**). **MDP** vẫn được coi là tiêu chuẩn để mô hình hóa các bài toán học tăng cường. Ngoài ra các thuật toán của học tăng cường cũng liên quan nhiều đến kỹ thuật *quy hoạch động*.

Để đơn giản hơn, ta xét đến bài toán như sau: Ở tại thời điểm $t$, tác nhân $\mathcal{A}$ có trạng thái là $s_{t} \in \mathcal{S}$ (tập các trạng thái có thể có của tác nhân trong môi trường),  thực hiện hành động $a \in \mathcal{A}$ (tập các hành động của tác nhân) và có một xác suất $P_{sa}(s_{t+1})$ chuyển đến trạng thái tiếp theo $s_{t+1}$ và nhận được một phần thưởng tức thời $r_{t}$. $P_{sa}$ là một phân phối biểu diễn trạng thái tiếp theo của tác nhân khi thực hiện hành động $a \in \mathcal{A}$ tại trạng thái $s \in \mathcal{S}$. Mục tiêu của bài toán là tối đa phần thưởng (lợi tức) chung $\mathcal{R}$.

Xét một ví dụ đơn giản, game rắn săn mồi như hình bên dưới:
![image.png](https://images.viblo.asia/cfd450b3-25da-4e3e-80bd-edf5868be409.png)

Tác nhân ở đây chính là con rắn. Trạng thái hiện tại $s$ bao gồm: *tọa độ của đầu và các phần thân rắn, hướng di chuyển rắn, tọa độ của mồi*. Các hành động có thể thực hiện $\mathcal{A} =\{ left, forward, right \}$ tương ứng với sang trái, đi thẳng, sang phải. Với mỗi hành động đó, khi thực hiện sẽ đưa con rắn vào trạng thái mới và trả về các phần thưởng tức thời: 

* Nếu sang trái, ăn được mồi, nhận được 1 điểm, $r = 1$.
* Nếu đi thẳng, cắn vào thân, trò chơi kết thúc, $r = -1$.
* Nếu sang phải, không ăn được mồi nhưng cũng không cắn vào đuôi, $r = 0$.

### 2.2 Hàm giá trị

Phần thưởng chung $\mathcal{R}$ là số mồi ăn được, nhìn sơ qua 3 trường hợp trên, nếu chỉ xét đến phần thưởng tức thời lớn nhất là 1 và thực hiện sang trái, con rắn sẽ bị rơi vào trạng thái không thể thoát ra được và bất kỳ hành động nào cũng sẽ dẫn đến hết game, cách tốt nhất là đi sang phải và quay lại ăn sau. Như vậy xét đến phần thưởng tức thời là chưa đủ, ta cần xét đến các trạng thái tiếp theo và các phần thưởng có thể đạt được của các trạng thái đó nữa. Ta có hàm lợi tức:
$$
G _ { t } = \sum _ { i = 0 } ^ { \infty }R _ { t + i } = R _ { t } + R _ { t + 1 } + R _ { t +2 } + \cdots
$$

Vì không thể biết trước số bước thực hiện trong tương lai, có thể có vô số bước, nên chuỗi $G_{t}$ không hội tụ (convergence) được, do đó một hệ số chiết khấu được thêm vào để đảm bảo tính hội tụ, và lúc này gọi $G_{t}$ là  **lợi tức chiết khấu**:
$$
G _ { t } = \sum _ { i = 0 } ^ { \infty } \gamma ^ { i } R _ { t + i } = R _ { t } + \gamma R _ { t + 1 } + \gamma^2 R_{t+2} \ldots + \gamma ^ { n } R _ { t + n } + \ldots
$$
Chúng ta đang xét đến tác nhân và trạng thái của nó, nên để dễ hình dung hơn, ta chuyển các mốc thời gian thành các trạng thái tại thời điểm tương ứng (giả sử tại thời điểm $t$ tác nhân đang ở trạng thái $s_0$, các trạng thái tiếp theo là $s_1, s_2, s_3, \ldots$:
$$
G _ { t } = \sum _ { i = 0 } ^ { \infty } \gamma ^ { i } R \left (s_i \right ) = R \left (s_0 \right ) + \gamma R \left (s_1 \right ) + \gamma^2 R \left (s_2 \right ) \ldots + \gamma ^ { n } R \left (s_n \right ) + \ldots
$$


Với $\gamma$ là *hệ số chiết khấu* và $0 \leq \gamma \leq 1$. Với $\gamma = 0$ là trường hợp chỉ xét đến phần thưởng tức thời, còn $\gamma = 1$ là xét đến lợi tức trong tất cả các trạng thái tiếp theo. Tuy nhiên việc tính toán $R_{t}$ không hề đơn giản, vì các bước đi tiếp theo và các trạng thái tương ứng là chưa biết trước, do đó một hàm **giá trị trạng thái (V-funtion)** được sử dụng để ước tính giá trị của một trạng thái hay ước lượng *lợi tức mong đợi khi ở trạng thái đó*. Nói cách khác *hàm V* láy trung bình lợi tức chiết khấu $G_{t}$ để đo mức độ tốt xấu của một trạng thái $s$ khi tác nhân thực hiện hành động tuân theo một **chiến lược** $\pi$ :
$$
V ^ { \pi } \left ( s \right ) = E \left [ R \left ( s _ { 0 } \right ) + \gamma R \left ( s _ { 1 } \right ) + \gamma ^ { 2 } R \left ( s _ { 2 } \right ) + \cdots | s _ { 0 } = s, \pi \right ].
$$

$s_0$ = $s$ nên $V^\pi$ có thể viết lại tuân theo phương trình **Bellman**:
$$
V ^ { \pi } \left ( s \right ) = R \left ( s \right ) + \gamma \sum _ { s ^ { \prime } \in S } P _ { s \pi \left ( s \right ) } \left ( s ^ { \prime } \right ) V ^ { \pi } \left ( s ^ { \prime } \right ).
$$

Trong đó $P_{s \pi (s)}(s')$ là xác suất đến được trạng thái $s'$ khi thực hiện hành động theo chiến lược $\pi(s)$ khi ở trạng thái $s$. $V^\pi$ cũng có thể viết theo hành động-trạng thái như sau với xác suất thực hiện hành động $a$ tại trạng thái $s$ tuân theo chiến lược $\pi$ là $\pi ( s | a)$ và trong một số trường hợp chưa biết trước hành động sẽ dẫn đến trạng thái nào, xác xuất chuyển đến trạng thái $s'$ khi thực hiện hành động $a$ tại trạng thái $s$ là  $P _ { s a } \left ( s ^ { \prime } \right )$:
$$
\tag{1}
V ^ { \pi } \left ( s \right ) = R \left ( s \right ) + \gamma \sum_{ a \in \mathcal{A}} \pi ( s | a) \sum _ { s ^ { \prime } \in S } P _ { s a } \left ( s ^ { \prime } \right ) V ^ { \pi } \left ( s ^ { \prime } \right ).
$$

Từ đó, định nghĩa một hàm **giá trị trạng thái tối ưu**:
$$
V ^ { * } \left ( s \right ) = \max _ { \pi } V ^ { \pi } \left ( s \right ).
$$

Có thể hiểu đây là giá trị lớn nhất có thể đạt được của tổng các lợi tức chiết khấu. Theo (1) ta có:
$$
\tag{2}
V ^ { * } \left ( s \right ) = R \left ( s \right ) + \max _ { a \in \mathcal{A} } \gamma \sum _ { s ^ { \prime } \in S } P _ { s a } \left ( s ^ { \prime } \right ) V ^ { * } \left ( s ^ { \prime } \right ).
$$

Và một chiến lược để đạt được giá trị tại các trạng thái là tối ưu:
$$
\tag{3}
\pi ^ { * } \left ( s \right ) = \arg \max _ { a \in \mathcal{A} } \sum _ { s ^ { \prime } \in S } P _ { s a } \left ( s ^ { \prime } \right ) V ^ { * } \left ( s ^ { \prime } \right ).
$$

### 2.3 Hàm Q (Q-function)
Trong các công thức của hàm giá trị, ta thấy đều có một đại lượng $P _ { s a } \left ( s ^ { \prime } \right )$ được xác định bởi thương của *số lần thực hiện hành động $a$ ở trạng thái $s$ chuyển sang trạng thá*i $s'$ chia cho *số lần thực hiện hành động $a$ ở trạng thái* $s$. Trong nhiều trường hợp việc xác định chuỗi trạng thái - hành động là không hề dễ dàng, nên hàm **giá trị-hành động ($Q$)** thường được sử dụng. $Q$ là phần thưởng mong đợi nhận được khi thực hiện một hành động .

 Từ công thức (1), thực hiện một hành động cụ thể $a$, định nghĩa:
 $$
 Q(s,a)  = R \left ( s \right ) +\gamma \sum _ { s ^ { \prime } \in S } P _ { s a } \left ( s ^ { \prime } \right ) V ^ { \pi } \left ( s ^ { \prime } \right )
 $$
 Do $\sum _ { s ^ { \prime } \in S } P _ { s a } \left ( s ^ { \prime } \right ) = 1$, ta có:
 
 $$
 \tag{4}
 \begin{aligned}
 Q(s,a) &= \sum _ { s ^ { \prime } \in S } P _ { s a } \left ( s ^ { \prime } \right ) \left ( R(s) + \gamma V ^ { \pi } \left ( s ^ { \prime } \right ) \right ) \\ &= E_{s \sim P(s' | s , a)} \left (R(s) + \gamma V ^ { \pi } \left ( s ^ { \prime } \right ) \right )
 \end{aligned}
  $$

 Khi đó (1) và (2) trở thành:
 $$
 \tag{5}
V ^ { \pi } \left ( s \right ) =E_{a \sim \pi}Q(s,a).
$$

Từ (4) và (5), gọi $R(s,a)$ là phần thưởng nhận được khi thực hiện hành động $a$ ở trạng thái $s$, ta có:
$$
\tag{6}
Q(s,a) = E_{s \sim P(s' | s , a)} \left ( R(s,a) + \gamma E_{a \sim \pi}Q(s,a) \right )
$$

Khi tuân theo chiến lược tối ưu $\pi^*$, $Q$ trở thành $Q^*$:
$$
\tag{7}
Q^*(s,a) = \max _ {a \sim \pi^*}Q(s,a)
$$
và:
$$
V^*(s) = \max _ {a \in \mathcal{A}}Q^*(s,a)
$$
$$
\tag{8}
\pi ^ * = \argmax _{a \in \mathcal{A}} Q^{*} (s,a)
$$

Do đó phương trình *Bellman* với Q là :
$$
\tag{9}
\begin{aligned}
Q^*(s,a) &= E_{s \sim P(s' | s , a)} \left (R(s, a) + \gamma V ^ { * } \left ( s ^ { \prime } \right ) \right ) \\ &=  E_{s \sim P(s' | s , a)} \left (R(s, a) + \gamma\max _ {a \in \mathcal{A}}Q^*(s,a) \right )
\end{aligned}
$$
# 3.Một số thuật toán học tăng cường
### 3.1 Dựa trên MDP
Mục tiêu của bài toán học tăng cường là tìm được chuỗi hành động tối ưu để tối đa phần thưởng. Do đó chúng ta có thể giải bài toán bằng cách tìm được chiến lược $\pi^*$ hoặc tính được giá trị $V^*$,$Q^$ rồi chọn các hành động một cách "*tham lam*" dựa vào (3) và (8). Cụ thể có 3 thuật toán cơ bản giựa trên các hàm trên:
* Dựa trên hàm giá trị:
![value_iter](https://images.viblo.asia/0738e4d0-1b67-4214-9936-0a1e9ba03fe5.png)

* Dựa trên chiến lược:
![policy_iter](https://images.viblo.asia/c5079600-11e1-4b23-9c96-ac0609d853e5.png)

* Kết hợp giá trị và chiến lược:
![value_policy](https://images.viblo.asia/d5f4c3d5-ead1-438a-bea9-fab55319d2ca.png)

### 3.2 Q-Learning

Việc tìm ra chuỗi hành động tối ưu dựa vào hàm **giá trị - hành động $Q$** hay tìm ra giá trị $Q^*$ cũng có thể thực hiện tượng tự như thuật toán 3. Tuy nhiên, nếu cập nhật $Q$ theo (9), tại mỗi trạng thái, các hành động khi được thực hiện có phần thưởng khác nhau sẽ làm giá trị của $Q$ thay đổi liên tục và khó hội tụ. Do đó, một hệ số học $\alpha$ quen thuộc được đưa vào để $Q$ cập nhật chậm hơn, dễ hội tụ hơn:
$$
\begin{aligned}
Q(s,a) &= Q(s, a) + \alpha ( Q^*(s,a) - Q(s,a)) \\ &= (1-\alpha) Q(s,a) + \alpha E_{s \sim P(s' | s , a)} \left (R(s, a) + \gamma\max _ {a \in \mathcal{A}}Q^*(s,a) \right )
\end{aligned}
$$

# 4. Tổng kết
Trong bài viết này mình đã giới thiệu với các bạn một số tổng quan về học tăng cường, nội dung bài viết là kết quả quá trình tìm hiểu của mình ở nhiều nguồn khánhieeufu nên không thể tránh khỏi có những sai sót, mong các bạn bỏ qua. Nếu thấy hay thì ngần ngại gì mà không cho mình 1 upvote để mình có động lực viết tiếp 😄

## reference:
1. [Reinforcement Learning and Control - cs.229, fall 2020, Standford](https://cs229.stanford.edu/notes2020fall/notes2020fall/cs229-notes12.pdf)
2. [Q-Function Learning Methods, UC Berkeley Robot Learning Lab](https://rll.berkeley.edu/deeprlcoursesp17/docs/lec3.pdf)