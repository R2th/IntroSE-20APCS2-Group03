# TL;DR
Feature Locality và Translational Invariance.

# Mở bài
Tại sao mình lại viết bài này? Lúc đó, mình đang đọc [bài này](https://viblo.asia/p/tim-hieu-ve-class-activation-maping-tai-sao-cac-mang-than-kinh-lai-dua-ra-quyet-dinh-nhu-vay-63vKjDXkl2R) của một bạn team mình, và bỗng nhiên mình đặt ra câu hỏi:

**Tại sao mạng/lớp tích chập lại hoạt động hiệu quả?**

Nhiều lúc mình cũng nghĩ về chuyện này, rồi tự nhủ mình hiểu rồi, để rồi sau này lại tự hỏi bản thân mình đã thực sự hiểu chưa. Cụ thể, câu hỏi to nhất mà mình có là:

**Tại sao máy có thể học được điểm chung các ảnh vô cùng khác nhau?** Cụ thể, 2 con chó khác hẳn nhau mà nó vẫn nhận ra? Đồng thời, các hình nền cũng khác nhau? Thậm chí ảnh có tận 2 con chó? Các con chó khác giống nhau — ví dụ, một con béc-giê to đùng và một con chihuahua nhỏ tí tẹo? Có con đang ra dáng nghệ sỹ và có con đang nằm ườn ra?

Vậy nên, mình đã ra đi tìm đường cứu nước bằng [một phát Google](https://www.google.com/search?q=why+do+convolutionals+work), và sau khi đọc [bài viết này](https://datascience.stackexchange.com/a/26291), mình quyết định viết ra bài này, vừa để giới thiệu lại bằng tiếng Việt, vừa để mình hiểu hơn về khái niệm này — một trong những viên gạch cơ bản nhất xây lên những mô hình cao cấp nhất bây giờ.

# Định nghĩa
Bạn có thể đọc lướt qua phần này:
- Mình đưa phần này vào cho đầy đủ các mục, trong đó có nhiều định nghĩa lý thuyết khô khan chẳng ai muốn hiểu cả.
- Khả năng lớn là bạn cũng biết về mặt lý thuyết là lớp này làm gì rồi — giống như mình, bạn chỉ không hiểu tại sao nó hoạt động thôi.

## Tích phân chập 1 chiều miền liên tục
Công thức của [tích chập](https://vi.wikipedia.org/wiki/T%C3%ADch_ch%E1%BA%ADp) 1 chiều được định nghĩa như sau:
$$(f*g)(t)\overset{\Delta}{=}\int_{-\infty}^{+\infty}f(\tau)g(t-\tau)d\tau,$$
trong đó, mình sẽ định nghĩa các hàm tương ứng với bên học máy để dễ liên hệ về sau:
- $f(t)$ là tín hiệu đầu vào — bên học máy thì đó là ảnh đầu vào,
- $g(t)$ là cửa sổ trượt - bên học máy là filter,
- $t$ là vị trí tương đối (độ trễ - $t$ thường được dùng cho thời gian) của cửa sổ so với tín hiệu - bên học máy cũng là vị trí của filter được đặt lên ảnh gốc.

Để dễ hình dung hơn 1 tẹo thì đây là ảnh gif minh hoạ mình lấy từ wiki về:

![](https://upload.wikimedia.org/wikipedia/commons/b/b9/Convolution_of_spiky_function_with_box2.gif)

Có một số điểm ban đầu mình không hiểu và bây giờ mình đã hiểu hơn 1 tí:
- Ảnh gif trên không biểu diễn hết miền kết quả. Đương nhiên là bạn không thể vẽ hết kết quả trên miền liên tục vô hạn rồi (tích phân trên cả $\mathbb{R}$ mà). Các kết quả bên trái và phải của gif trên đều bằng 0 ($f(t)=g(t)=f(t)\times g(t)=0$) nên không được vẽ cho đỡ tốn chỗ.
- Ở mỗi điểm $t$ thì $(f*g)(t)$ là giá trị của tích giao của tín hiệu và cửa sổ với độ trễ $t$. Tích phân đó cho độ (nghịch) tương quan của tín hiệu và cửa sổ trong cả miền xác định.

**Chú ý**: không nhất thiết tích giao đó tương ứng với diện tích của vùng giao đồ thị như trên ảnh gif. Về mặt tương trưng thì nó chỉ có nghĩa là giá trị $(f*g)(t)$ sẽ lớn nếu $f(t)$ và $g(t)$ lớn — tuy nhiên việc chúng tương đương với diện tích chỉ đúng trong trường hợp cả cửa sổ trượt chỉ tồn tại 2 giá trị là 0 và 1: $g(t)\in\{0,1\}\forall t\in\mathbb{R}$. Trong trường hợp đó, $g$ sẽ có tác dụng của một *công tắc*: khi $g(t)=1$, ta sẽ tính diện tích vùng đó của tín hiệu, và $g(t)=0$ thì ta bỏ qua.

- Bạn có thể thấy $f(t)$ không trượt mà chỉ có $g(t)$ trượt thôi. Lý do là vì trong công thức tích phân/tích chập, thành phần tín hiệu không phụ thuộc vào $t$, mà chỉ có cửa sổ phải trượt theo thời gian thôi.
- Tích chập và [độ tương quan](https://en.wikipedia.org/wiki/Cross-correlation) rất giống nhau nhưng khác nhau ở một điểm rất nhỏ (không tính ký hiệu tượng trưng). Sau đây là công thức tính độ tương quan của 2 tín hiệu trên miền thật:
$$(f\star g)(t)\overset{\Delta}{=}\int_{-\infty}^{+\infty}f(t)g(t+\tau)d\tau.$$
Đúng vậy, dấu trừ đã bị đổi thành dấu cộng. Vậy, tích chập của $f(t)$ và $g(t)$ tương đương với độ tương quan của $f(t)$ và $g(-t)$.

Ứng dụng của tích chập liên tục 1 chiều thì hãy hỏi các bạn làm về điện tử, mình ngày xưa dốt Vật lý kinh khủng.

## Biến đổi qua rời rạc và các khái niệm
Giờ chúng ta sẽ phân tích từ công thức 1D qua phiên bản được sử dụng trong các mạng xử lý ảnh. Đầu tiên chúng ta đổi từ miền liên tục qua miền rời rạc bằng [tổng Riemann](https://vi.wikipedia.org/wiki/T%E1%BB%95ng_Riemann):
$$(f*g)(t)\overset{\Delta}{\approx}\sum_{\tau\in D_f\vee t-\tau\in D_g}f(\tau)g(t-\tau).$$
Tổng Riemann ước lượng một tích phân bằng cách chia nhỏ từng khoảng một và tính diện tích của khoảng đó. Tưởng tượng trực quan về tổng Riemann như sau:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/LeftRiemann2.svg/2560px-LeftRiemann2.svg.png)

Số "khoảng" trên đó chính là kích cỡ của filter trong lớp tích chập. Ví dụ như filter có kích cỡ là $3\times 3$, thì lúc chúng ta nhân tích chập cũng chỉ làm 9 phép nhân thôi (rồi cộng chúng nó lại), thay vì phải tích phân cả vùng liên tục.

Thế là xong vấn đề miền liên tục trong tích phân trong tích chập, thế còn vấn đề về miền liên tục của tập xác định của tích chập? Câu trả lời là chúng ta không tìm hết tất cả các giá trị của $(f*g)(t)\forall t$, mà chỉ với một vài giá trị $t$ thôi. Ví dụ như trên hình tổng Riemann kia, thay vì phải tính giá trị hàm tại tất cả các điểm từ 0 đến 2, ta chỉ tính các kết quả cách nhau $0.5$ thôi, giảm từ vô hạn giá trị xuống còn có 4. Khoảng cách giữa các điểm được tính đó chính là khái niệm **stride**. Stride càng bé thì ta càng phải tính nhiều, và hệ quả là kích cỡ của đầu ra cũng to lên. Stride càng to thì ta càng tính ít, nhưng chúng ta sẽ mất nhiều thông tin liên quan ở giữa.

Giờ chúng ta quay lại ảnh gif lúc nãy:

![](https://upload.wikimedia.org/wikipedia/commons/b/b9/Convolution_of_spiky_function_with_box2.gif)

Như các bạn có thể thấy, tích chập của ví dụ trên có một đoạn từ $-0.5$ đến $0$ khi cửa sổ chỉ trùng với một phần của tín hiệu (mà không phải nằm gọn trong tín hiệu). Đây chính là khái niệm **padding**. Nếu có padding, tín hiệu sẽ được "đệm" thêm các giá trị 0 ở những nơi không tồn tại, để việc tính tích phân có thể được thực hiện trôi chảy. Nếu không có padding, cửa sổ sẽ chỉ được bắt đầu trượt từ nơi cửa sổ và tín hiệu giao nhau hoàn toàn (trong trường hợp trên, bắt đầu từ $t=0.5$).

## Tích chập 2D trong xử lý ảnh
Gom hết tất cả khái niệm trên và qua 2D, chúng ta có phiên bản tích chập cần tìm. Để có cảm giác trước về công thức của 2D tích chập, hãy vào [link này](https://cs231n.github.io/assets/conv-demo/index.html) để xem (và pause nếu cần) ảnh minh hoạ sau: 
- Anh đầu vào kích cỡ 5x5
- Kernel (filter) kích cỡ 3x3 <sup>[1]</sup>
- Stride 2: mỗi lần dịch chuyển kernel nhảy 2 bước
- Padding 1: rìa mỗi cạnh ảnh thêm 1 hàng/cột toàn số 0.

![](https://miro.medium.com/max/1680/1*_34EtrgYk6cQxlJ2br51HQ.gif)

Công thức của tích chập 2D trong xử lý ảnh như sau:
- $I$ là ảnh đầu vào,
- $W(r,c)$ là ma trận filter, kích cỡ $K\times K$,
- $W^0(r,c)$ là ma trận bias, kích cỡ như trên,
ta có:
$$\begin{aligned}
C(r,c)&=I*W(r,c)+W_0(r,c)\\
&=\sum_{i=1}^K\sum_{j=1}^KI(r+i-1,c+j-1)W(i,j)+W_0(r,c).
\end{aligned}$$

Mỗi lần cửa sổ trượt (filter) ở một vị trí nào đó, chúng ta nhân từng giá trị của ảnh đầu vào với giá trị của filter ở ô tương ứng, rồi cộng chúng lại với nhau (và cộng thêm bias nếu có) để ra kết quả cuối cùng tại từng điểm. Sau đó, chúng ta trượt cửa sổ sang phải (hoặc xuống dòng nếu kịch), và tiếp tục điền nốt các ô còn lại của kết quả.

Còn với phiên bản 3D, khi đầu vào của chúng ta có nhiều kênh (như trên ảnh gif minh hoạ trên), thì filter của chúng ta cũng có thể có cùng số kênh $D$. Sau tích chập, kết quả đầu ra sẽ là:
$$\begin{aligned}
C(r,c)&=I*W(r,c,d)+W_0\\
&=\sum_{l=1}^D\sum_{i=1}^K\sum_{j=1}^KI(r+i-1,c+j-1,l)W(i,j,l)+W_0.
\end{aligned}$$

**Nhưng bạn ơi, đây là công thức của cros-correlation mà?** Như mình đã nói ở trên, công thức tích chập chính là công thức của cross-correlation với ma trận filter lật đối xứng với đường antidiagonal. Lý do mọi người vẫn gọi nó là lớp tích chập bởi vì sự tương đồng với xử lý ảnh truyền thống, còn phép toán được thay đổi để tăng tốc độ xử lý: các CPU/GPU hiện đại đều có hàm nhân ma trận native. (Cảm ơn bạn [Lê Minh Tân](https://www.facebook.com/groups/machinelearningcoban/permalink/926463967811011/?comment_id=926597404464334&reply_comment_id=926637824460292))

<sup>[1]</sup> <sub>*Từ giờ trở đi trong bài, nếu đang nói về mạng tích chập, kernel và filter được sử dụng thay thế lẫn nhau và cùng dùng để chỉ cửa sổ tích chập trượt.*</sub>

## Max/Average Pooling
Tương tự với tích chập, pooling cũng có filter/kernel, stride, và padding. Pooling có thể được coi là một loại tích chập 2D đặc biệt. Trong đó, sự khác nhau duy nhất là nhân kernel được thay thế bởi hàm max (lấy giá trị tối đa) hoặc average (lấy trung bình/mean). Sau đây là công thức cho average pooling với kernel kích cỡ $d\times d$, và stride $s$:

$$\mathbf{P}[r][c]=\frac{1}{d\times d}\sum_{i=1}^d\sum_{j=1}^dI[(r-1)\times s+i][(c-1)\times s+j].$$

Và tiếp theo là hình ảnh minh hoạ của max-pooling với kích cỡ filter $2\times 2$, stride 2 và không có padding:

![](https://cs231n.github.io/assets/cnn/maxpool.jpeg)

## A Convolutional Block
Một khối tích chập ảnh sẽ bao gồm một (vài) lớp tích chập, rồi đến một lớp pooling. Ở các mạng hiện đại sẽ thêm một lớp đồng hoá độ lớn đầu vào (batch normalisation), tuy nhiên đó không phải là chủ đề của bài này. Ví dụ như, cấu trúc của VGG16 như sau:

![](https://neurohive.io/wp-content/uploads/2018/11/vgg16-1-e1542731207177.png)

Trong đó, chúng ta có thể thấy ảnh đầu vào được qua 2-3 lớp tích chập có padding, rồi pooling để giảm kích cỡ, và tiếp tục như vậy cho đến khi kích cỡ ảnh xuống còn $1\times 1$. Lúc đó, chúng ta có vector đặc trưng, và sẽ đưa qua một lớp multilayer perceptron để làm nhiệm vụ phân lớp. Và sau đây là biểu đồ khối cụ thể hơn:

![](https://neurohive.io/wp-content/uploads/2018/11/vgg16.png)

# Ý tưởng trực giác
Mình sẽ cố gắng đưa ra các ví dụ trực giác nhất để bạn có thể hình dung ra được cái lớp này nó đang làm cái gì sau cái mớ hổ lốn toàn công thức toán học đáng sợ kia.

## Các lớp tích chập cơ bản từ xử lý ảnh cổ điển
Chúng ta hãy nhảy luôn vào ví dụ cụ thể cho dễ hình dung nhé: đây là công thức cho Sobel filter, chuyên dùng để nhận biết cạnh (edge detection) dọc và ngang:
$$G_x=\begin{bmatrix}
-1 & 0 & +1\\
-2 & 0 & +2\\
-1 & 0 & +1
\end{bmatrix}\text{ và }
G_y=\begin{bmatrix}
+1 & +2 & +1\\
0 & 0 & 0\\
-1 & -2 & -1
\end{bmatrix}$$
Chúng ta có thể thấy $G_y$ chỉ là phiên bản quay 90 độ của $G_x$, hợp lý với việc $G_y$ dùng để bắt các cạnh ngang, khi $G_x$ được sử dụng để bắt các cạnh dọc.
```python
import numpy as np
g_x = np.array([[-1, 0, +1],[-2, 0, +2],[-1, 0, +1]])
g_y = np.array([[+1, +2, +1],[0, 0, 0],[-1, -2, -1]])
```
Sau đó, chúng ta có thể hình dung ra xem sau khi qua các filter đó, ảnh sẽ nhìn như thế nào?
```python
import matplotlib.pyplot as plt
# G_x
ax1 = plt.subplot(1,3,1)
plt.imshow(g_x, cmap='gray')
plt.title('$G_x$')
ax1.axis('off')
# G_y
ax2 = plt.subplot(1,3,2)
im = plt.imshow(g_y, cmap='gray')
plt.title('$G_y$')
ax2.axis('off')
# colorbar
ax3 = plt.subplot(1,3,3)
plt.gca().set_visible(False)
plt.colorbar(im, aspect=20, shrink=.5)
```
Chúng ta sẽ có được:

![](https://images.viblo.asia/39266e19-4ff9-4260-98cf-afe979750060.png)

Như dễ nhìn ra, filter nhận biết các cột cũng có độ lớn tăng dần theo cột, và tương tự với filter hàng ngang. Tiếp theo, chúng ta định nghĩa một phiên bản cơ bản của hàm tích chập:
```python
def convolution(img, kernel):
    # để cơ bản hoá, stride = 1, không padding
    output = np.empty((img.shape[0]-kernel.shape[0]+1, img.shape[1]-kernel.shape[1]+1))
    for i in range(output.shape[0]):
        for j in range(output.shape[1]):
            output[i,j] = np.sum(img[i:i+kernel.shape[0],j:j+kernel.shape[1]] * kernel)
    return output
```
Giờ chúng ta ứng dụng vào ảnh thật nhé: chúng ta có phiên bản dọc bằng $I_x=I*G_x$, phiên bản ngang $I_y=I*G_y$, và phiên bản toàn bộ $I'=\sqrt{I_x^2+I_y^2}$.
```python
# đổi từ ảnh màu sang đen trắng
img = plt.imread('workdesk.jpeg').dot([0.2989, 0.5870, 0.1140])
img_x = convolution(img, g_x)
img_y = convolution(img, g_y)
img_ = np.sqrt(img_x ** 2 + img_y ** 2)
```
![](https://images.viblo.asia/e5ec8353-1f93-4908-ae71-3027f662cec1.png)

Đây là hình ảnh bàn làm việc của mình tại công ty sau khi đã bắt các cạnh dọc, các cạnh ngang, và các viền (sau khi kết hợp kết quả của 2 filter trước). Nhìn khá là thú vị nhỉ?

Một số ví dụ về các lớp tích chập cổ điển khác bao gồm filter làm mờ ảnh (Gaussian blur, bên trái) và filter làm sắc nét ảnh (bên phải). Nếu bạn đã dùng các phầm mềm chỉnh sửa ảnh rồi thì sẽ không còn xa lạ gì với các filter này, đúng không?

![](https://images.viblo.asia/2a634df3-febc-4fb9-976b-394420ecfcab.png)

## Tích chập trong học sâu
Trong học sâu, các ma trận tích chập không được người thiết kế mạng đưa vào cụ thể. Thay vì đó, trong quá trình học, mạng sẽ tự học các lớp tích chập đó. Chúng có thể học lại được những lớp tích chập cổ điển có sẵn, và chúng cũng có thể học được những đặc trưng mà con người không hiểu rõ cụ thể. Sau đây là hình ảnh của một số filter của VGG16:

![](https://miro.medium.com/max/5176/1*8C49dLMgINot63DvafDD3g.jpeg)

Khá trìu tượng, đúng không? Trong số đó, ta có thể thấy một số filter máy học được tương tự như các filter truyền thống, như là filter bắt những đường chéo (ngoài cùng bên phải hàng 2 và 3). Tuy nhiên đừng sợ, ở phần gần cuối chúng ta sẽ giải thích một cách hiểu về cách hoạt động của mạng, và đồng thời sẽ giới thiệu một số cách để bạn cũng có thể nhìn/cảm nhận những filter như trên của một mạng tích chập bất kỳ nào khác.

## Chức năng của lớp tích chập
Như đã nhắc tới ở trên, các lớp tích chập sẽ nhận ra được các đặc trưng của mô hình từ cơ bản đến phức tạp dần theo độ sâu của mô hình. Càng qua các lớp, độ phức tạp càng tăng lên: để dễ hình dung, giả sử ta có 2 filter bắt được đường ngang, và 2 filter bắt được đường dọc. Sau khi qua các lớp kết hợp, chúng ta sẽ có được một filter sâu bắt được một hình tứ giác. Thậm chí, với nhiều lớp hơn, ta có thể nhận ra được hình tròn trong ảnh đó; vì hình tròn có thể được biểu diễn bằng vô số đường thẳng tiệm cận:

![](https://qph.fs.quoracdn.net/main-qimg-36eab3a4966a44701cf432679160f898)

bởi vì chúng ta có thể coi hình tròn là một hình đa giác có $\infty$ cạnh. Bởi vậy, mô hình không cần biết gì về đặc điểm tính chất của đầu vào từ ban đầu, chúng sẽ tự "học" được dần dần qua các lớp filter.

**Ngoài đề không liên quan đến tích chập:** đây cũng là ví dụ cho thấy feature engineering quan trọng trong mô hình học máy cổ điển. Với các mô hình sâu, chúng ta có thể bắt được những đặc trưng phi tuyến tính. Tuy nhiên, nếu chúng ta biến đổi miền đầu vào bằng cách sử dụng [hệ toạ độ cực](https://vi.wikipedia.org/wiki/H%E1%BB%87_t%E1%BB%8Da_%C4%91%E1%BB%99_c%E1%BB%B1c), bài toán bỗng nhiên trở thành tuyến tính (1 lớp).

Một chức năng thú vị của lớp tích chập là để giảm số trọng số của mô hình. Lấy ví dụ hơi phi thực tế: với ảnh của tập MNIST kích cỡ 28x28, với đầu ra mong muốn là 14x14 (giảm nửa). Nếu sử dụng mạng linear regression, chúng ta sẽ phải dải phẳng ảnh ra thành một vector 784 chiều, thả qua một ma trận trọng số để lấy về một vector 196 chiều, rồi sau đó sắp xếp lại thành một ảnh 14x14. Như vậy, chưa tính bias, lớp đó đã cần $784\times 196=153664$ trọng số rồi. Còn với việc sử dụng một lớp tích chập với filter 2x2 và stride 2, chúng ta có thể có cùng kích cỡ đầu ra chỉ với 4 trọng số (!) <sup>[2]</sup>

Ngoài ra nổi trội nhất chính là, lớp tích chập trong mạng được sử dụng để tách ra những đặc trưng trong ảnh theo từng vùng nhỏ với tên gọi là **Feature Locality**. Như nghĩa đen, feature (đặc trưng) locality (định xứ/cục bộ) tương tự như việc chúng ta cầm một cái kính lúp và chỉ nhìn từng vùng trong ảnh một thay vì bố cục toàn ảnh. Tưởng tượng như bạn đang chơi [Where's Waldo](https://en.wikipedia.org/wiki/Where%27s_Wally%3F) vậy: mục tiêu của bạn là tìm ra người này:

![](https://prodimage.images-bn.com/pimages/9780763645250_p0_v2_s550x406.jpg)

Trong ảnh này:

![](https://images-na.ssl-images-amazon.com/images/I/819TInppvbL._AC_SX522_.jpg)

Thật không tưởng đúng không? Chắc chắn là bạn không thể nhìn toàn cục rồi ngay lập tức chỉ tay bảo "Đây! Hắn ở đây!" được rồi. Thay vì đó, bạn sẽ phải zoom kỹ vào từng vùng của ảnh để tìm xem Waldo ở đâu. Ý tưởng (cơ bản) của lớp tích chập này cũng tương tự như vậy.

Ý tưởng về feature locality này cũng được Hinton, một trong những cha để của học sâu, thử nghiệm với một loại mô hình mới tên là [Capsule Network](https://en.wikipedia.org/wiki/Capsule_neural_network), nếu các bạn muốn tham khảo.

<sup>[2]</sup> <sub>*Như đã rào trước, ví dụ trên phi thực tế bởi vì khả năng xử lý của lớp regression kia lớn hơn rất rất nhiều với lớp tích chập trên (hơn nhau hẳn 40 nghìn lần cơ mà). Nhưng khi chồng các lớp/khối tích chập lên nhau, với các tính chất feature locality và translational invariant sắp được nói ở phần dưới, mạng tích chập sẽ cho ta kết quả tốt ngang với một lớp tuyến tính lớn như vậy. Theo ý kiến cá nhân của mình (nếu mình sai hãy tranh luận dưới comment nhé), lý do lớn nhất mọi người sử dụng mạng tích chập chính là để giảm số tham số — điều này vừa làm cho việc tính toán trở nên khả thi, vừa làm giảm độ phức tạp của mô hình để tránh overfitting. Feature locality và translational invariance không phải là những lý do chính tại sao họ dùng mạng tích chập, chúng chỉ là *lý do tại sao mạng tích chập hoạt động* thôi.*</sub>

## Chức năng của lớp pooling
Chức năng dễ nhận ra nhất của lớp pooling là làm giảm kích cỡ/kênh của ảnh/đặc trưng ngầm trong mạng. Kích cỡ của ảnh sẽ được giảm xuống xuống tỉ lệ thuận với kích cỡ kernel và stride: ví dụ như ảnh 5x5 với kernel 3x3 không có padding và stride 1 sẽ có kích cỡ đầu ra là 3x3, và nếu stride 2 thì kích cỡ là 2x2. Về việc thay đổi số chiều của ảnh đầu ra, ngoài việc thay đổi số kênh đầu ra bằng số filter của lớp tích chập ra, chúng ta có thể sử dụng một loại tích chập khác tên là [Depthwise Convolution](https://medium.com/@zurister/depth-wise-convolution-and-depth-wise-separable-convolution-37346565d4ec) có thể làm giảm số chiều của đầu vào. Về cơ bản, lớp tích chập này có kernel kích cỡ 1x1, không làm thay đổi kích cỡ ảnh đầu ra, mà chỉ thay đổi số kênh đầu ra mà thôi.

Tuy nhiên, chức năng của lớp pooling còn hơn thế nhiều nữa: đó là **Translational Invariance**. Không hề nói quá khi nhận xét rằng đây chính là phần khiến cho các mạng tích chập hoạt động tốt như vậy. Dịch nghĩa đen, translational (dịch chuyển) invariance (bất biến) nghĩa là mô hình không đưa ra kết quả khác nhau nếu đầu vào bị dịch chuyển, ví dụ như đưa camera sang trái hoặc phải một chút. Chúng ta có thể hiểu tính chất này như sau: sau khi lớp tích chập đã bắt được các đặc trưng nổi bật, lớp pooling sẽ gom chúng lại vào một khối — nhờ đó, việc đặc trưng đó nằm ở đâu không còn quan trọng nữa. Ví dụ: ta có một filter bắt được rằng cái ảnh có 1 con chó đang nằm đâu đó trong ảnh, nơi con chó nằm sẽ có toàn giá trị 1 và các chỗ khác có giá trị 0. Sau pooling toàn ảnh, ta sẽ chỉ còn 1 giá trị: giá trị đó sẽ là 1 nếu trong ảnh có con chó, và 0 nếu ngược lại. Vi vậy, việc con chó nằm ở đâu không ảnh hưởng đến đầu ra của mô hình.

**Fun fact/Trivia:** YOLOv3 không có lớp pooling (cảm ơn @phanhoang!)

## Ghép 2 lớp đó vào thành một khối
Như đã nói ở trên, một khối convolutional có một lớp tích chập và một lớp pooling. Lớp tích chập sẽ lấy các đặc trưng theo từng vùng (feature locality), và lớp pooling sẽ gom chúng lại dần dần thành đặc trưng toàn ảnh (translational invariant). Từ đó, chúng ta đưa ra khái niệm về **receptive field**:

![](https://images.viblo.asia/4163751b-4970-4a65-b3c5-17e96211ac04.png)

Với một kernel 3x3, một ô ở lớp thứ 2 sẽ "nhìn thấy" 9 ô ở lớp thứ nhất, và sau khi qua một kernel 3x3 khác (có thể là tích chập hoặc pooling), một ô ở lớp thứ 3 sẽ nhìn thấy 9 ô ở lớp thứ 2. Giả sử như chúng ta sử dụng stride 3 cho kernel đầu tiên (để không trượt trùng lên nhau), 1 ô ở lớp thứ 3 sẽ "nhìn" được tận 81 ô ở lớp thứ nhất! Từ đó ta có thể thấy, receptive field (vùng nhìn thấy) của các lớp ở sau càng ngày càng lớn ra, và đặc trưng đó bao quát một vùng ảnh ngày càng lớn; cho đến khi chúng ta chỉ còn một vector dài các đặc trưng 1x1 (nhìn hình minh hoạ của VGG16 ở trên), chúng là các đặc trưng cho toàn bộ ảnh. Đây chính là kết quả cuối cùng của feature locality và translational invariant.

# Hình dung cách các mạng sâu hoạt động
## Bắt đặc trưng sâu
Lấy một ví dụ cụ thể: đây là khối đầu tiên của VGG16, mỗi một ô vuông nhỏ tương ứng với các đặc trưng được bắt bởi một kênh của filter (feature map).

![](https://i.stack.imgur.com/j7QHf.png)

Chúng ta có thể thấy, kênh ở ô vuông màu đỏ (và một số ô khác) bắt những đường ngang, cụ thể là bắt được thanh chắn của xe, và ô màu xanh bắt được những nét dọc. Như đã phân tích ở trên, những đặc trưng đơn giản này sẽ được gộp vào nhau để thành các đặc trưng phức tạp hơn ở các lớp sau. Sau đây là hình ảnh về các kênh được kích hoạt ở khối thứ 5:

![](https://i.stack.imgur.com/3cGMQ.png)

Chúng ta có thể thấy trong khối này các đặc trưng không còn cơ bản như trước nữa, mà vô cùng cụ thể: vị dụ ở ô màu đó, ta có thể nhận ra kênh đó đang bắt được tóc của 2 người trong ảnh, ô màu xanh lá cây bắt được 2 khuôn mặt (và ô màu xanh dương cũng vậy). Sau các lớp/khối phối hợp, mạng đã học được những đặc trưng phức tạp như mặt người.

Nếu suy nghĩ kỹ, thì khả năng bắt đặc trưng mạnh mẽ đó cũng không phải tự nhiên mà ra: sau mỗi một khối thì số kênh của filter được nhân đôi. Đồng nghĩa với việc đó là sau 4 khối ($1\rightarrow 5$), bức ảnh này đã đi qua 12 lớp tích chập, và trải qua hàng chục kênh filter. Khi đưa ra một con số cụ thể như vậy, chúng ta có thể cảm nhận được *khả năng diễn đạt* của mạng này cao như thế nào.

**Lưu ý nhỏ** (tại vì mình cũng bị lẫn, cảm ơn @phanhoang): Có một sự khác nhau rất lớn giữa mục vừa rồi và các hình ảnh còn lại: ở mục này đang nói về *đặc trưng* của đầu vào, nghĩa là những tính chất của một ảnh đầu vào cụ thể được các lớp của mô hình nhận ra. Ở các mục còn lại nói về các lớp trong mô hình (không phụ thuộc vào một đầu vào cụ thể nào cả), và các hình ảnh của chúng tượng trưng cho những gì chúng có thể bắt được - ví dụ như, những đường dọc ngang.

## Gradient Ascent - hình dung ra các filter
Đây là cách lấy được bức tranh trìu tượng về các filter ở trên kia: chúng ta sẽ sử dụng gradient ascent để tìm ra đầu vào làm cho lớp đó được "kích hoạt" - ở đây nghĩa là có giá trị lớn nhất và có ảnh hưởng lớn nhất tới đầu ra cuối cùng.
- Việc đầu tiên, chọn lớp tích chập cần hình dung, và chỉ chú tâm vào phần mạng máy học từ đầu vào đến lớp đó — tạm gọi mạng con đó là $F(x)$.
- Định nghĩa hàm mục tiêu (objective function) mà chúng ta cần tối đa: ở đây, chúng ta chọn hàm tương ứng với việc đầu ra của mạng trên có giá trị lớn nhất - hàm trung bình: $\mathbb{E}[F(x)] = \frac{\sum F(x)}{|F(x)|_0}$.

Các bạn có thể thấy rằng từ đây, chúng ta chỉ cần tìm giá trị đầu vào $x$ sao cho $F(x)$ lớn nhất: $\argmax_xF(x)$. Tuy nhiên, nếu làm như vậy, kết quả sẽ không đẹp như hình trên, do chúng ta sẽ gặp phải cực đại lân cận; trong đó có những tần số adversarial lớn (sẽ giải thích ở dưới) đang lấn át các tần số thấp hơn. Hiện tượng này xảy ra vì các filter bắt feature này không hoạt động tốt với các data từ [prior](https://en.wikipedia.org/wiki/Prior_probability) không biết trước <sup>[3]</sup>. Vì vậy, để giải quyết cả 2 vấn đề này một lúc, chúng ta cần tìm điểm bắt đầu bằng cách *pretrain* đầu vào nhỏ rồi tăng kích cỡ dần:

- Bắt đầu bằng một đầu vào cỡ $(h_0,w_0)$ nhỏ random, rồi tìm $x_0=\argmax_{x\in R^{h_0\times w_0}}F(x)$ bằng gradient ascent.
- Tăng kích cỡ ảnh đó bằng zoom thành $h_1$ lên cỡ $(h_1,w_1)$.
- Tìm $x_1=\argmax_{x\in R^{h_1\times w_1}}F(x)$ bằng gradient ascent với điểm bắt đầu là $h_1$.
- Làm như quá trình trên đến lúc ta nhận được ảnh $x_n$ thuộc kích cỡ $(h_n,w_n)$ như mong muốn.

Đây là [link có code chính thức trên trang của Keras](https://keras.io/examples/conv_filter_visualization/), các bạn có thể vào tham khảo.

<sup>[3]</sup> <sub>*Về cơ bản, mạng sẽ không thể hoạt động tốt với các ảnh đầu vào mà không "tự nhiên" giống như ảnh được sử dụng để train. Mạng về cơ bản đã overfit với tập ảnh người chụp, và đương nhiên sẽ hoạt động vô cùng tệ hại khi đối mặt với ảnh có tính chất khác rất xa với các ảnh nó đã thấy.*</sub>

# Bonus: điểm yếu của mạng tích chập (hay tất cả các mạng học sâu)
Phần này không liên quan đến tích chập cụ thể, tuy nhiên nó khá thú vị nên mình muốn chia sẻ với mọi người trước khi kết thúc bài. Đó, là mạng học sâu rất dễ bị lừa.

![](https://miro.medium.com/max/2000/0*lyKz1kHcOYi3kb1B)

Từ bức hình một con heo (ảnh 1), chúng ta tạo ra một lớp nhiễu nhỏ phù hợp bằng cách backprop (ảnh 2), rồi cộng vào để ra ảnh 3. Kết quả là, ảnh mới đối với người thật nhìn vẫn ra con heo, nhưng mạng học máy lại không còn nhận ra con heo nữa mà dự đoán đó là máy bay! Theo như mạng, con lợn này biết bay rồi.

Ảnh nhiễu đó chính là kết quả chúng ta lấy được nếu chỉ dùng gradient ascent mà không upscale từ từ. Hình ảnh nhìn như nhiễu đó thực ra bao gồm các đặc trưng ngầm máy đã học tượng trưng cho một cái máy bay, mà con người không hiểu/không đúng. Còn tệ hơn, những đặc trưng đó có tần số rất lớn trong mạng, nên chỉ cần một thìa nhỏ tẹo (0.005 lần) là đã gây ảnh hưởng rất lớn tới kết quả đầu ra của mô hình của chúng ta rồi.

Đây là một ví dụ của adversarial example, khi một người dùng ma manh muốn lừa máy của chúng ta. Hãy tưởng tượng một hệ thống nhận diện khuôn mặt vào nhà trắng bị lừa như thế này xem, hậu quả sẽ khôn lường. Để chống lại việc này (đôi chút), một vài việc chúng ta có thể làm là:
- Sử dụng các [data augmentation](https://www.tensorflow.org/tutorials/images/data_augmentation):
    - Quay ảnh các góc,
    - Cắt xén ảnh,
    - Tạo nhiễu nhân tạo,
    - Thay đổi bảng màu
    - v.v.
- Sử dụng negative example: tạo một lớp riêng cho các ảnh không thuộc lớp nào trong tập train
- Sử dụng discriminator: phân biệt ảnh nhân tạo với ảnh tự nhiên. Nếu khái niệm này nghe quen quen, thì đó là vì *discriminator* (và generator) là các thành phần của generative *adversarial* network.
- v.v.

Từ đó, mô hình sẽ tốt hơn trong việc chống chọi với nhiễu, và hạn chế được những tình huống như vậy.

# Kết bài
Mình biết trong các bài mình viết thật sự vẫn còn khá (rất) lan man, nên nếu có góp ý gì về thay đổi cấu trúc, hay thêm thắt/lược bỏ dữ liệu, mong các bạn comment ở dưới giúp mình để mình thay đổi nhé. Mong bài này giúp đỡ được các bạn, và hẹn các bạn ở bài lần sau!