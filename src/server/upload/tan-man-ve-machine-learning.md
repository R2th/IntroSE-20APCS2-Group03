## Bước đầu đi vào con đường Tin học
Tôi khởi đầu với công nghệ thông tin vào năm học đại học, theo tôi nghĩ đó là khá trễ, không phải là tôi có ý định chọn công nghệ thông tin mà chính là vì một lý do hết sức nhảm nhí. Rồi tôi cũng chấp nhận sự thật là tôi là một sinh viên công nghệ thông tin. Ban đầu, tôi đã rất hứng thú khi làm được một `API` đơn giản bằng `NodeJS`, lần đầu tiên biết sử dụng `Command Line` để dịch về file nhị phân mà không cần đến những chương trình như Visual Studio, Xcode, ... Tôi đã rất hứng thú và đã có một chút cơ bản về tin học nên tôi quyết định thử sức với các bài toán giải thuật tin học.

Vì là một học sinh chuyên toán nên khi đi vào thế giới giải thuật tin học, cách tư duy rất khác nên rất bỡ ngỡ. Ví dụ như với bài toán: "Trong một bữa tiệc gồm $2n$ người, biết rằng mỗi người có không ít hơn $n$ người quen trong bữa tiệc. Chứng minh tồn tại một cách xếp $2n$ đó vào một bàn tròn sao cho hai người quen nhau thì ngồi cạnh nhau". 

Nếu với tin học, chúng ta phải cố gắng đưa về một loại cấu trúc dữ liệu nào đó để giải quyết: "Trong một đồ thị đơn vô hướng $n$ đỉnh và bậc mỗi đỉnh không bé hơn $\dfrac{n}{2}$. Khi đó, đồ thị tồn tại ít nhất một chu trình Hamilton". Còn đối với toán, ta sẽ tư duy theo kiểu đơn biến: "Tìm một cách đối chỗ nào đó để giảm số cặp không quen nhau và ngồi cạnh nhau qua mỗi lần đổi chỗ". 

Hoặc với một bài toán tìm đường đi ngắn nhất đối với hai đỉnh bất kỳ, đơn giản nhất ta sẽ nghĩ đến giải thuật `Floyd-Warshall`. Tuy nhiên với tư duy toán học, ta sẽ thực hiện các phép toán ma trận trên trường số $\mathbb{R}$ ứng với hai phép toán $a \oplus b = \text{min} \{a, b\}$ và $a \otimes b = a + b$. 

Một lần được học với thầy Nguyễn Khắc Minh ở trường Đông (hoặc Xuân, Hè, Thu, tôi không nhớ rõ) ở Phú Yên, tôi được thử sức với bài toán sau: "Cho một mảnh đất $m \times n$, mỗi ô của mảnh đất được trồng một cây thanh long. Người ta chông đèn vào các góc của mảnh đất đơn vị đất. Biết rằng một bóng đèn chiếu sáng được $4$ cây thanh long xung quanh. Hãy tìm số bóng đèn nhỏ nhất sao cho nếu một bóng đèn bị cháy thì cả mảnh đất vẫn sẽ được chiếu sáng."

Bài này thật sự rất khó, là bài toán trong tạp chí Pi số nào đó, mấu chốt ở đây bằng nhận xét "Mỗi ô phải được chiếu sáng bởi hai bóng đèn", và bài toán này lại chuyển về thành bài toán tô màu bảng chữ nhật để tìm cận dưới và đưa ra một ví dụ để chỉ ra dấu bằng cho cận dưới. Khi nhớ đến bài toán này, tôi chợt nhận ra rằng tư duy giải thuật tin học nó hoàn toàn khác với tư duy toán học, cách giải bài toán này hoàn toàn khác với cách mà tin học làm, tin học giúp ta sử dụng mày tính để giải bài toán bằng các cấu trúc dữ liệu, nhưng bài toán này, ta hoàn toàn có thể giải bằng tay 100%.

## Khi tôi gặp Machine Learning
Tôi hoàn toàn không có tài năng trong giải thuật tin học, thật sự. Do rất tò mò về mọi thứ nên một ngày, tôi tìm thấy Machine Learning và đọc qua blog machinelearningcoban. Nhận xét đầu tiên của tôi đó là "Machine Learning rất giống một áp dụng của toán học". 

Hãy nhìn cách mà Hồi quy tuyến tính thực hiện, đơn thuần là bài toán cực trị trong không gian $\mathbb{R}^n$: $||Ax - b||$ nhỏ nhất khi $x = (A^T.A)^{-1}.A^{T}.b$ với $A$ có các cột độc lập tuyến tính.

Đa số các bài toán học có giám sát trong Machine Learning là các bài toán cực trị một biểu thức nào đó. Ví dụ đối với phân lớp ta sẽ cực trị cho hàm Entropy hoặc với hồi quy ta sẽ cực trị hàm độ lệch chuẩn.

Các học vào, tôi càng thấy Machine Learning càng giống toán hơn, và khi học Random Forest, nhận ra Random Forest là một kỹ thuật lấy mẫu trong thống kê, lúc đó tôi có thể kết luận rằng tư duy toán học phù hợp với Machine Learning.

Nhìn mạng Neural, tôi cứ ngỡ rằng cần một giải thuật duyệt đồ thị. Nhưng không, tôi đã lầm, mạng Neural đơn thuần mà một dãy phép toán ma trận để tìm được một hàm số biểu diễn gần đúng tập dữ liệu ban đầu. Backpropagation ở đây, đơn thuần là áp dụng Gradient Decent và phép đạo hàm trong giải tích ma trận, và tôi hoàn toàn quen thuộc với đống kiến thức đó.

Một ví dụ đơn giản cho thấy sự khác biệt với giải thuật tin học thuần túy là `SVM kernel`. Đơn thuần chỉ là nó chia hai miền dữ liệu đã gán nhãn bằng cách ánh xạ vào tập dữ liệu để chuyển nó về một không gian mà ở đó ta có thể dùng các siêu phẳng để phân chia các dữ liệu thành các miền độc lập, nó còn chẳng có tí xác suất gì cả.

Tôi không cần suy nghĩ quá nhiều đến thời gian chạy thuật toán nữa, bởi vì khi một model đã được huấn luyện xong rồi thì thời gian chạy luôn luôn gần bằng một hằng số. Tôi không còn quan tâm đến các time complexity, ... và các vấn đề tôi cần quan tâm đến nhẹ nhàng hơn nhiều, thật sự rất thoải mái. 

Tôi không nói rằng tin học không có trong đây, nhưng bản chất của việc tư duy trong Machine Learning không phải là của tin học, mấu chốt ở đây là nếu chúng ta không thể tự giải ra nhanh, Machine Learning giúp ta thực hiện điều đó. Tin học ở đây là gì vì chẳng ai ngồi tính đạo hàm để tìm ra hệ số tốt nhất cho mạng Neural, kernel của SVM, hay ngồi bagging và bootstrap dữ liệu cả ngày cả... Và cho dù cốt lõi của các prototype toán học trong tin học có là thuần tin học đi chăng nữa, bản chất nó vẫn là một kiểu tư duy toán học.

## Python và Matlab

Đối với tôi, Python đã giúp tôi thực sự nhiều trong con đường nhập môn Machine Learning. Lúc đầu, tôi khá bảo thủ chọn `C++` đơn giản vì `syntax` của `Python` nhìn rất chán, và `C++` cũng chính là môn tôi học ở trường. Tôi đã sử dụng `armadillo` trong `C++` để xử lý ma trận vì nó dễ dùng nhất. Và sự khó chịu ở đây chính là toán tử element-wise product, thật sự kinh khủng: `A % B`. Việc chuyển đổi từ `opencv` qua `armadillo` cũng rất đau đớn. Trong khi đó `Python`, với `numpy`, tương tác trực tiếp với `opencv` và toán tử element-wise product rất mộc mạc: `A * B`. Thử xem hàm sau đây viết bằng `armadillo`:
```Cpp
arma::mat func(const arma::mat& x) {
    arma::mat temp = arma::exp(x);
    return temp % x;
}
```
Hàm này ánh xạ từng phần tử của ma trận từ $x$ về $e^x.x$, trong khi đó, `numpy`, đơn giản là phép `*`:
```Python
def func(x):
    temp = np.exp(x)
    return temp * x
```
Nhìn vào hàm số này, mọi người sẽ nghĩ ngay đến hàm tính $e^x.x$ cho một số chứ không ai sẽ nghĩ đến phép toán tích element-wise cho ma trận. Rất mộc mạc! Và tôi đã chuyển qua `Python` kể từ lúc tôi thấy được sự mộc mạc và đa dạng của `numpy`.

Nhiều người bạn của tôi bảo rằng tại sao lại không tự viết thuật toán mà phải sử dụng các thư viện có sẵn? Rất đơn giản, với Machine Learning, việc giải một bài toán theo thiên hướng sử dụng các phép toán học rất nhiều, chúng ta chỉ cần các prototype toán học trong các thư viện đó dễ hỗ trợ việc giải. Ví dụ, chả ai ngồi viết thuật toán phân rã ma trận làm gì cả, trong khi chỉ cần `np.linalg.svd` là xong. Hay việc ngồi cân bằng dữ liệu, chả ai ngồi đó mà viết thuật toán cân bằng lại dữ liệu mà không dùng hàm có sẵn của `scikit learn` cả. Việc ngồi viết lại các prototype toán học, nó giúp chúng ta rất nhiều trong việc làm giảm đi tiến độ học tập. 

Tôi cũng từng viết một mạng Neural theo hướng dẫn trên machinelearningcoban, rồi cũng viết một mạng tích chập và mạng sinh chỉ bằng bằng `numpy` và `scipy`, lúc mà mạng tích chập và mạng Neural fully connected bình thường nhận diện đúng được dữ liệu trong tập mnist, tôi cảm thấy thực sự phấn kích. Khi nắm được căn nguyên của mạng Neural, tôi sử dụng `Tensorflow` và `Keras` cho tiện.

`Matlab`, thú thật là tôi dùng bản lậu vì chẳng có tí tiền nào để mua bản quền cả. `syntax` thật sự gọn nhẹ, tốc độ tính toán cao, một lượng hàm toán học khổng lồ. Cũng nhìn vào cách mà `Python` và `Matlab` nối một ma trận:
```Python
Python:
temp1 = np.concatenate((a, b), axis=0)
temp2 = np.concatenate((a, b), axis=1)
```
```Matlab
Matlab:
temp1 = [a; b]
temp2 = [a b]
```
`Python`, ta sẽ nghĩ đơn giản là một hàm số nối hai ma trận với nhau. Tuy nhiên với `Matlab`, nó cho thấy đặc tính toán học trong đây: `[a b]`. Nếu bạn chưa hiểu thì chắc là bạn rất không đào sâu vào đại số tuyến tính. Ví dụ, với tập vector $\{x_1, x_2, ..., x_n\}$ và ta viết một tổ hợp tuyến tính của chúng, nó đơn giản là nhân có hướng của $(x_1, x_2, ..., x_n)$ và $(a_1, a_2, ..., a_n)$ và nó chính là `[x_1 x_2 ... x_n] [a_1; a_2; ...; a_n]` (Ta để vector ở trước vì `n x 1` nhân với `1 x 1` mới có nghĩa). Hoặc đối với việc nhân hai ma trận `A` và `B`. ta có thể tách `A = [a b]` và `B = [c; d]` sao cho `ac` và `bd` có nghĩa, từ đó ta tính được `AB = [a b][c; d] = ac + bd`. Và còn nhiều thứ khác ma Matlab giúp tôi tiết kiệm rất nhiều thời gian để làm quen và tư duy.

Tóm lại, giờ đây, để nghiên cứu thêm một cái gì đó mới, tôi thường dùng `Matlab` hơn là `Python` để tiết kiệm thêm đống thời gian. Để hiện thực một ý tưởng đã nghiên cứu xong rồi, tôi sẽ trở lại với `Python` vì `Python` chứa rất nhiều `tool` để thực hiện nhiều vấn đề hơn.

Đây là một ít quan điểm của tôi về toán học, tin học và Machine Learning. Nếu có ý kiến gì thì xin comment bên dưới để tôi có thể trao đổi nếu tôi sai hoặc giải đáp cho mọi người thắc mắc nào đó.