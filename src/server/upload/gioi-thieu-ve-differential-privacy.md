# Tại sao bạn cần quan tâm?
Đầu tiên mình xin thẳng thắn: bài này mình viết có 2 lý do:
- Có một bài khác mình sắp viết cần có kiến thức về topic này.
- Các bạn ở Sun* nên đọc bài này trước khi quyết định có nên giải mã gene không nhé.

Nếu cả 2 event trên đã diễn ra thì hãy bỏ qua đoạn ngắn trên nhé.

---

Đã bao giờ bạn tự hỏi rằng, khi bạn tham gia trả lời một survey nào đó, câu trả lời của bạn có thể bị đem ra làm bằng chứng pháp lý kết tội bạn trước tòa không? *Tôi mong là không.*

Hay bạn có bao giờ tự hỏi rằng việc "thu thập thông tin cá nhân một cách ẩn danh" của các trang web lớn như Google có thực sự ẩn danh? *Tôi mong là có.*

Nếu bạn trả lời có cho 1 trong 2 câu hỏi trên, thì bài này sẽ là một kiến thức kỳ quái mà bạn sẽ muốn tiếp thu đấy.

# Ẩn danh fake loại 1
Bây giờ giả sử nhà nước đưa cho bạn một survey về việc bạn có bị trĩ không nhé (an sinh xã hội mà). Do kết quả phải công bố công khai, họ hứa sẽ không lưu tên của bạn, mà chỉ có một số thông tin như bạn ở phường nào hay là chế độ ăn uống của bạn là gì. Đương nhiên rồi, họ muốn biết rằng việc bạn bị trĩ có phải do lý do địa lý, hay do bạn ăn nhiều thịt, hay do công việc bạn có ngồi nhiều hay không, vân vân và mây mây. Bạn thấy rằng các thông tin như tên tuổi số chứng minh nhân dân của bạn không được cho vào, nên bạn thấy việc cung cấp thông tin đó khá là an toàn. Bùm, ngay hôm sau bạn bè của bạn sẽ trêu bạn tới bến vì phát hiện ra bạn bị trĩ. Vì bạn là một con người yêu nước nên bạn không tin rằng nhà nước đã không thực hiện đúng cam kết bảo mật của họ. Vậy thì bằng cách nào mà thông tin của bạn bị lộ ra vậy?

Có rất nhiều phương pháp có thể tìm ra đúng entry của bạn trong cái database đó. Đơn giản nhất, có bao nhiêu người sống ở quận của bạn, làm công việc của bạn, có sở thích như bạn? Họ chỉ cần query đúng những thông số đó và họ sẽ lấy được ngay đúng entry họ cần biết. Đây gọi là *linkage attack*, khi kẻ tấn công biết được các thông tin liên quan về bạn từ các nguồn khác để query chính xác ra kết quả của bạn.

Giả sử bạn là 1 công dân pro vip được ưu ái, sao cho các query về bạn không được trả về. Giờ tôi chỉ cần tìm query như sau: có bao nhiêu người không ở quận X, hoặc không làm việc Y, hoặc không thích ăn thịt, bị bệnh trĩ? Sau đó lấy tổng số người bị bệnh trĩ và trừ đi. Bùm, boolean arithmetics đã làm lộ ra thông tin của bạn. Đây gọi là *differencing attack*.

Giả sử hệ thống kia rất xịn và kiểm tra xem các query có gây ra tấn công trên không. Chưa nói đến việc bạn có thể thực hiện các query trên trong các session khác nhau để tránh bị kiểm duyệt, thì điều này là gần như không thể. Với một database đủ nhiều thông tin, làm cách nào bạn có thể kiểm duyệt được hết các bộ query như vậy? Mà kể cả nếu như bạn có thể (ví dụ như từ chối các bộ query mà sau khi cộng trừ nhau chỉ còn đúng 1 entry), thì ngay việc từ chối bộ query đó cũng đã leak ra ngoài được một số thông tin rồi.

Không nói đến database về bệnh trĩ nữa, giả sử database chỉ cho biết sở thích món ăn của bạn thôi. Nếu mọi người biết bạn thích ăn gì, thì sau này rủ nhau đi ăn sẽ dễ hơn đúng không? Thông tin này có vẻ khá vô hại... EEEEERH. Giả sử bạn là động vật ăn thịt, nhưng bỗng một hôm bạn update rằng dạo này bạn lại hay ăn rau. Ối, thế là chắc bạn bị trĩ rồi (hoặc mỡ máu hay cholesterol gì đó).

Còn một số hướng tấn công nữa, nhưng nó khá phức tạp nên mình sẽ không liệt kê hết ở đây.

Vậy làm cách nào để tránh hiện tượng này bây giờ? Câu trả lời chính là Differential Privacy, topic của bài viết này. Tuy nhiên, trước khi chúng ta đến với định nghĩa cụ thể thì hãy bắt đầu với ý tưởng của phương pháp này nhé.

# Làm sao để an toàn trả lời các câu hỏi nhạy cảm?
Differential Privacy bắt đầu từ một ứng dụng đơn giản trong việc thu thập dữ liệu cá nhân sao cho người tham gia cung cấp thông tin cá nhân không có khả năng bị kết tội bởi dữ liệu họ cung cấp. Bây giờ, ví dụ chúng ta cần tìm xác suất của một dân số có bao nhiêu người đã từng bị trĩ. Do khả năng lớn là bảo hiểm của họ sẽ không chi trả cho người có tiền sử bị bệnh (hoặc phí bảo hiểm sẽ bị độn lên kha khá), nếu một người trong lúc làm survey cung cấp thông tin họ bị trĩ, họ sẽ bị ảnh hưởng một cách tiêu cực từ thông tin đó, và đương nhiên không dại mà họ tham gia vào survey của bạn :D Đương nhiên là nếu họ trả lời hoàn toàn ngẫu nhiên thì kết quả của chúng ta trở nên vô giá trị. Vậy bây giờ chúng ta phải làm gì?

Bây giờ chúng ta sẽ thu thập thông tin của họ bằng cách như sau: người tham gia sẽ tung một đồng xu. Nếu đồng xu là ngửa, họ sẽ trả lời thật lòng. Nếu đồng xu là úp, họ sẽ tung đồng xu một lần nữa, và nếu ngửa họ sẽ trả lời có, và úp họ sẽ trả lời không. Với một câu trả lời có, xác suất họ bị bệnh thật chỉ là 3/4, và họ hoàn toàn có thể chối bỏ bất cứ kết luận nào về họ dựa trên kết quả đó vì lý do hôm đó họ đen bạc. Thế là an toàn rồi nhỉ?

Giờ với kết quả họ cung cấp thì chúng ta tính trung bình ra sao? Thấy rằng, nếu họ bị bệnh, xác suất họ sẽ trả lời có là 3/4, và nếu không bị, xác suất trả lời có là 1/4. Từ đó, chúng ta ra được công thức cho xác suất kết quả là có $P_T$ so với xác suất thật một người bị trĩ $P_{T'}$:

$$
P_T = \frac{3}{4}P_{T'} + \frac{1}{4}(1-P_{T'}) = \frac{1}{2}P_{T'} + \frac{1}{4}
$$

Đảo ngược lại công thức đó và bạn đã có được con số bạn mong muốn:

$$
P_{T'} = 2P_T - \frac{1}{2}
$$

Thật là vi diệu phải không? Bài học rút ra ở đây là nếu bạn muốn có privacy, bạn phải thêm tính ngẫu nhiên vào data của bạn.

# Ẩn danh hàng real love
Giờ quay lại về differential privacy nhé: giả sử bạn có một database gồm thông tin bệnh lý trĩ của rất nhiều người (toàn kết quả thật), và bạn cho người dùng query các thống kê của database đó theo một số đối tượng nhất định. Differential Privacy đảm bảo rằng nếu như query đó được chạy trên 2 dataset chỉ khác nhau đúng 1 entry (nghĩa là bạn có thể nằm trong dataset đó hoặc không), thì xác suất kết quả trả về là gần như nhau. Định nghĩa một cách cụ thể như sau: thuật toán $\mathcal{M}$ là $(\varepsilon, \delta)$-private nếu như với mọi $\mathcal{S}\subseteq \text{Range}(\mathcal{M})$ và với mọi database $x$ và $y$ chỉ khác nhau 1 entry:

$$
\Pr[\mathcal{M}(x)\in\mathcal{S}]\le\exp(\varepsilon)\Pr[\mathcal{M}(y)\in\mathcal{S}]+\delta
$$

Để dễ hình dung, tạm cho $\delta=0$ (phiên bản mạnh hơn). Nhận ra rằng công thức trên là đối xứng, ta có:

$$
\exp(-\varepsilon)\Pr[\mathcal{M}(y)\in\mathcal{S}]\le\Pr[\mathcal{M}(x)\in\mathcal{S}]\le\exp(\varepsilon)\Pr[\mathcal{M}(y)\in\mathcal{S}]
$$

Với $\varepsilon$ càng bé thì $\exp(\pm\varepsilon)$ càng dần về 1, và chặn 2 chiều của xác suất phân biệt 2 dataset càng sát; nghĩa là với bất cứ một filter nào chúng ta có thể đặt ra, xác suất đầu ra của thuật toán trên 2 dataset đó nằm trong/ngoài filter đó là gần như như nhau.

### An toàn kể cả sau phân tích dữ liệu
Một điểm mạnh nữa của differential privacy là *postprocessing immunity*: kẻ tấn công không thể làm giảm tính privacy cho dù họ có xử lý dữ liệu nhận được như một pro data scientist đi chăng nữa. Gọi $\mathcal{M}$ là thuật toán ngẫu nhiên được sử dụng mà $(\varepsilon,\delta)$-private, $f$ là bất cứ hàm postprocessing nào (có thể ngẫu nhiên), thì $f\circ\mathcal{M}$ cũng sẽ là $(\varepsilon,\delta)$-private. Với $x$ và $y$ là 2 bộ dữ liệu chỉ khác nhau ở 1 entry, $S$ là một event bất kỳ, và $T=\{r\in R:f(r)\in S\}$ là domain của event $S$, ta có:

$$
\begin{aligned}
\Pr[f(\mathcal{M}(x))\in S]
&=\Pr[\mathcal{M}(x)\in T] \\
&\le \exp(\varepsilon)\Pr[\mathcal{M}(y)\in T] + \delta \\
&= \exp(\varepsilon)\Pr[f(\mathcal{M}(y))\in S] + \delta.
\end{aligned}
$$

### Nhưng xài nhiều query thì sao?
Đương nhiên là nếu sử dụng nhiều query thì với phương thức trên, việc lấy ra kết quả thật là điều khá đơn giản. Trong ví dụ về lấy thông tin survey, dễ dàng nhận thấy rằng chỉ cần lấy trung bình của rất nhiều các query và chúng ta có thể có được clean expectation của kết quả thật.

Còn với phiên bản differential privacy, trong trường hợp đơn giản $\delta=0$, phân tích thẳng từ định nghĩa của differential privacy, chúng ta có mức privacy còn lại sau cả bộ query $\mathcal{M}_{[k]}$ là tổng của các giá trị của từng query $\sum_k\varepsilon_i$:

$$
\begin{aligned}
\frac{\Pr[\mathcal{M}_{[k]}(x)=\mathbf{r}]}{\Pr[\mathcal{M}_{[k]}(y)=\mathbf{r}]}
=\prod_{i=1}^k\frac{\Pr[\mathcal{M}_i(x)=r_i]}{\Pr[\mathcal{M}_i(y)=r_i]}\le \exp(\varepsilon)^k=\exp(k\varepsilon)
\end{aligned}
$$

Trong trường hợp $\delta > 0$, privacy bound của bộ query cũng là $(\sum_k\varepsilon_i,\sum_k\delta_i)$. Tuy nhiên chứng minh của công thức này khá lằng nhằng, nên chúng ta sẽ tạm bỏ qua phần chứng minh nhé :D

# Cụ thể thuật toán
Thôi bài này dài rồi nên mình sẽ cung cấp luôn thuật toán nhé. Có 2 phương pháp chèn nhiễu vào đầu ra chính được sử dụng, đó là dùng nhiễu Laplace, Gaussian, hoặc Exponential. Trong cả 2 thì chúng ta đều phụ thuộc vào một giá trị gọi là *sensitivity* của query output để tính được lượng nhiễu phù hợp cần cho vào.

$l_1$-sensitivity của một hàm $f$ được định nghĩa là
$$
\Delta f=\max_{\Vert x - y\Vert_1 = 1} \Vert f(x) - f(y)\Vert_1
$$

Nghĩa là, $\Delta f$ là thay đổi lớn nhất có thể của một query trên một cặp database bất kỳ mà chỉ khác nhau đúng 1 entry. Giờ chúng ta sẽ thêm nhiễu để sensitivity của query sẽ thấp đi đáng kể.

### The Laplace mechanism

Probability của một Laplace distribution với location $0$ và scale $b$ được định nghĩa là:

$$
\mathrm{Lap}(x|b)=\frac{1}{2b}\exp\left(-\frac{|x|}{b}\right)
$$

Location và scale là tên được dùng khi nói về phân bố này: location thì tương đương với mean, và scale thì tương ứng với variance $\sigma^2$ theo công thức $\sigma^2=2b^2$.

Giờ thì chúng ta chỉ cần thêm nhiễn với location $0$ và scale $\Delta f/\varepsilon$:

$$
\mathcal{M}_L(x,f(\cdot),\varepsilon)=f(x) + (Y_1,\dots,Y_k), Y_i \sim \mathrm{Lap}(\Delta f/\varepsilon)
$$

Khi sử dụng Laplace mechanism với scale trên, chúng ta sẽ có được $(\varepsilon,0)$-private. Đặt $f_x$ là probability distribution function của $\mathcal{M}_L(x,f,\varepsilon)$ và $f_y$ là probability distribution function của $\mathcal{M}_L(y,f,\varepsilon)$, chúng ta có:

$$
\begin{aligned}
\frac{p_x(z)}{p_y(z)}
&=\prod_{i=1}^k\left(\frac{\exp(-\frac{\varepsilon|f(x)_i-z_i|}{\Delta f})}{\exp(-\frac{\varepsilon|f(y)_i-z_i|}{\Delta f})}\right) \\
&=\prod_{i=1}^k\exp\left(\frac{\varepsilon(|f(y)_i - z_i| - |f(x)_i-z_i|)}{\Delta f}\right) \\
& \le \prod_{i=1}^k\exp\left(\frac{\varepsilon|f(x)_i-f(y)_i|}{\Delta f}\right) \\
& = \exp\left(\frac{\varepsilon\Vert f(x) - f(y)\Vert_1}{\Delta f}\right) \\
&\le \exp(\varepsilon)
\end{aligned}
$$

Để có được công thức $\Pr[\cdot\in S]$, chúng ta chỉ cần tích phân PDF ở trên và sẽ ra đúng tỉ lệ trên.

### The Gaussian mechanism
Laplace noise cho chúng ta DP với $l_1$-sensitivity, nhưng nếu chúng ta muốn sử dụng $l_2$-sensitivity thì sao?

$$
\Delta_2 f=\max_{\Vert x - y\Vert_1 = 1} \Vert f(x) - f(y)\Vert_2
$$

Với trường hợp này, chúng ta có thể sử dụng Gaussian noise, với phương pháp tương tự như trên, nhưng thay nhiễu từ $\mathrm{Lap}(\Delta_1 f/\varepsilon)$ với nhiễu từ $\mathcal{N}(0, c\Delta_2(f)/\varepsilon)$, trong đó $c^2>2\ln(1.25/\delta)$. Tuy nhiên, Gaussian noise chỉ áp dụng được với $\varepsilon\in(0, 1)$, và không cho chúng ta được chính xác $\delta=0$.

### The Exponential mechanism

Trong các bài toán đã được mô tả thì Laplace có lẽ là tối ưu rồi: $\delta=0$ vừa mạnh vừa khiến tất cả mọi phân tích đều dễ hơn rất nhiều. Tuy nhiên, có một số trường hợp chúng ta không thể cho quá nhiều nhiễu thẳng vào data được, ví dụ như trong một buổi đấu giá, chúng ta cần tìm giá trị max, nhưng thêm quá nhiều nhiễu vào thì kết quả đó sẽ mất đi độ chính xác và giá trị của nó. Trong bài toán cũ, giá trị của đầu ra chính là output của thuật toán, nghĩa là, chúng ta không muốn output thuật toán thay đổi nhiều với 2 database gần giống nhau. Tuy nhiên, với các mục tiêu khác thì chúng ta phải định nghĩa một utility function $u(x, r)$ khác mà chúng ta không muốn bị thay đổi; trong đó $x$ là input của thuật toán và $r$ là giá trị đầu ra có thể xảy ra. Trong trường hợp này, chúng ta cần định nghĩa lại về sensitivity: giờ sensitivity sẽ không còn được tính thẳng trên hàm $f$ nữa mà sẽ được tính trên hàm $u$:

$$
\Delta u\equiv\max_{r\in\mathcal{R}}\max_{|x-y|_1\le 1}|u(x,r)-u(y,r)|
$$

Trong đó $\mathcal{R}$ là range của hàm $f$. Và giờ, thay vì thêm nhiễu, chúng ta sẽ output $\mathcal{M}_E(x, u, \mathcal{R})$ với xác suất tỉ lệ thuận với $\exp(\frac{\varepsilon u(x, r)}{2\Delta u})$. Phương pháp này sẽ cho chúng ta $(\varepsilon, 0)$-privacy:

$$
\begin{aligned}
\frac{\Pr[\mathcal{M}_E(x,u,\mathcal{R})=r]}{\Pr[\mathcal{M}_E(y,u,\mathcal{R})=r]}
&=\frac{\left(\frac{\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}\right)}{\left(\frac{\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}\right)} \\
&=\frac{\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}{\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}\cdot\frac{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}
\end{aligned}
$$

Thừa số bên trái có thể giới hạn về privacy budget:
$$
\begin{aligned}
\frac{\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}{\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}
&=\exp\left(\frac{\varepsilon(u(x,r)-u(y,r))}{2\Delta u}\right) \\
&\le\exp\left(\frac{\varepsilon|u(x,r)-u(y,r)|}{2\Delta u}\right) \\
&\le \exp\left(\frac{\varepsilon}{2}\right)
\end{aligned}
$$

Tương tự:
$$
\begin{aligned}
&\frac{\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}{\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}\le \exp\left(\frac{\varepsilon}{2}\right)\\
\Rightarrow &\exp\left(\frac{\varepsilon u(y,r)}{2\Delta u}\right)\le \exp\left(\frac{\varepsilon}{2}\right)\exp\left(\frac{\varepsilon u(x,r)}{2\Delta u}\right)\\
\Rightarrow &\sum_{r'\in\mathcal{R}}\exp\left(\frac{\varepsilon u(y,r')}{2\Delta u}\right)\le \exp\left(\frac{\varepsilon}{2}\right)\sum_{r'\in\mathcal{R}}\exp\left(\frac{\varepsilon u(x,r')}{2\Delta u}\right)\\
\Rightarrow&\frac{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(y,r')}{2\Delta u})}{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(x,r')}{2\Delta u})}\le\exp\left(\frac{\varepsilon}{2}\right)
\end{aligned}
$$

Thay vào công thức bên trên, chúng ta tiếp tục:
$$
\begin{aligned}
\frac{\Pr[\mathcal{M}_E(x,u,\mathcal{R})=r]}{\Pr[\mathcal{M}_E(y,u,\mathcal{R})=r]}
&=\frac{\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}{\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}\cdot\frac{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(y,r)}{2\Delta u})}{\sum_{r'\in\mathcal{R}}\exp(\frac{\varepsilon u(x,r)}{2\Delta u})}\\
&\le\exp\left(\frac{\varepsilon}{2}\right)\cdot\exp\left(\frac{\varepsilon}{2}\right)\\
&=\exp(\varepsilon)
\end{aligned}
$$

Hết rồi đó, chúc mừng bạn đã sống sót qua quyển sách toán vừa rồi :D
# Tóm lại...
Differential Privacy sẽ bảo vệ bạn khỏi việc bị lộ bất cứ thông tin cá nhân gì, không chỉ tấn công liên quan đến việc định danh bạn trong một database ẩn danh. Phương pháp này chống lại được linkage attack và các tấn công khác. Ngoài ra, nó cho bạn biết được bạn bị mất cụ thể bao nhiêu riêng tư với phương pháp này, và có cơ chế bảo vệ bạn trong trường hợp kẻ tấn công sử dụng nhiều query để gộp lại. Cuối cùng, các thông tin được lấy ra từ database sẽ vẫn được ẩn danh cho dù kẻ tấn công có xử lý data pro đi thế nào chăng nữa.

Vì vậy, trước khi bạn định công bố một thông tin nhạy cảm nào đó cho một bên nào, hãy check xem policy của họ có thực sự bảo mật định danh không nhé. Nếu mình nhớ không nhầm thì ít nhất Apple thực hiện phương pháp này. Chúc bạn an toàn trên không gian mạng, nơi công ty nào cũng muốn bán thông tin của bạn!