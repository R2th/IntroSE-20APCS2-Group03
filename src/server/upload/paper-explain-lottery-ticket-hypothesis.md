Sau khi phát triển được một mô hình (model) đạt được độ chính xác theo yêu cầu. Việc tiếp theo có lẽ chúng ta sẽ phải làm trước khi triển khai mô hình là tối ưu về tốc độ(speed), bộ nhớ(memory footprint) và năng lượng(energy). Những cách phổ biến có thể nghĩ đến là lượng tử hóa(quantization), chưng cất hiểu biết(knowledge distillation) và cắt tỉa trọng số(weight pruning). Trong bài này, chúng ta sẽ cùng bàn luận về bài báo(paper) như tiêu đề, bài báo về chủ đề cắt tỉa trọng số của mô hình. Bài viết này đã xuất bản được hơn 2 năm và làm cơ sở cho nhiều bài báo sau này. Tuy gần đây cũng có bài báo chỉ ra sự không hiệu quả của phương pháp trong bài báo này, song việc tìm hiểu cả hai chiều giúp chúng ta có được cái nhìn mới về những khía cạnh xung quanh việc huấn luyện mô hình.
# Giới thiệu

![](https://images.viblo.asia/ba68b59c-23f5-434a-869a-6e3c1870139f.png) 
![](https://images.viblo.asia/ee38b9dd-bc68-40b8-acd6-65a04f311091.png)
 
Trong paper này, tác giả chỉ ra rằng luôn tồn tại một mạng con(subnetwork) nhỏ hơn mà nếu huấn luyện chúng từ đầu và học trong thời gian nhiều nhất là bằng với mô hình gốc thì sẽ đạt tới độ chính xác(accuracy) tương tự mạng gốc. Đường nét liền trong hình trên thể hiện mạng tác giả tìm được theo phương pháp trong bài báo (winning ticket, trung bình 5 lần thử). Đường nét đứt là các mạng thưa được lấy mẫu ngẫu nhiên(trung bình 10 lần thử)  

### Định nghĩa
Giả thuyết vé số (**The Lottery Ticket Hypothesis**): một mạng nơ-ron đặc (dense neural network) khởi tạo một cách ngẫu nhiên sẽ chứa một mạng con (subnetwork), mạng con đó khi được huấn cô lập có thể thu được độ chính xác tương tự với mạng gốc sau khi huấn luyện với cùng số lần lặp(iteration) với mô hình gốc, hoặc có thể ít hơn. 


Cụ thể, xét một mạng nơ rơn đặc $f(x;\theta)$ với tham số khởi tạo $\theta = \theta_0 ∼ \mathcal{D}_\theta$. Khi tối ưu với stochastic gradient descent(SGD) trên một tập training set, $f$ đạt validation loss cực tiểu $l$ tại lần lặp $j$ với độ chính xác là $a$. Thêm vào đó, xét việc huấn luyện $f(x, m\bigodot\theta$) với mặt nạ $m \in \{0, 1\}^{|\theta|}$ của tham số để khởi tạo của nó trở thành $m \bigodot \theta_0$. Khi tối ưu với SGD trên cùng một tập training (với $m$ cố định), $f$ đạt validation loss cực tiểu $l'$ tại lần lặp $j'$ với độ chính xác $a'$. Giả thuyết vé số dự đoán rằng $\exists m$ thỏa mãn $j' \leq j$(tương đương về mặt thời gian huấn luyện), $a' \geq a$(tương  đương về độ chính xác), và $||m||_0 \ll |\theta|$(số tham số ít hơn).

Tác giả cho rằng các phương pháp cắt tỉa tiêu chuẩn tự động để tiết lộ một mạng con như vậy từ mạng fully-connected và convolutional. Mạng này được gọi là vé thắng(**winning ticket**). Vé thắng này là tổ hợp của vị trí các kết nối (connection) và các trọng số khởi tạo ban đầu của chúng hay $f(x;m \bigodot \theta_0)$. Nếu chúng ta sử dụng các connection này với các trọng số được khởi tạo lại $f(x;m \bigodot \theta'_0)$ trong đó $\theta'_0 ∼ \mathcal{D}_\theta$, vé này sẽ không còn là vé thắng vì nó không cho performance tốt như mô hình gốc.

### Tìm vé thắng
Chúng ta tìm vé thắng bằng cách huấn luyện một mạng và tỉa những trọng số có độ lớn nhỏ nhất. Phần còn lại là những kết nối tạo lên kiến trúc của vé thắng. Giá trị của các kết nối không bị tỉa được reset trở về giá trị ban đầu của chúng trước khi huấn luyện. Các bước để tìm vé thắng:
1. Khởi tạo ngẫu nhiên một mạng nơ ron $f(x;\theta_0)$ trong đó $\theta_0 ∼ \mathcal{D}_\theta$.
2. Huấn luyện mạng trong $j$ lần lặp, thu được $\theta_j$.
3. Tỉa $p\%$ số tham số của $\theta_j$, tạo mặt nạ $m$.
4. Reset những tham số còn lại về giá trị ban đầu của chúng trong $\theta_0$, tạo thành vé thắng $f(x;m \bigodot\theta_0)$

Bốn bước trên tương ứng với phương pháp tỉa *one-shot*. Tuy nhiên, trong bài báo, tác giả tập trung vào tỉa lặp lại (**iterative pruning**), nghĩa là lặp lại việc huấn luyện, tỉa, và reset mô hình $n$ vòng(round), mỗi lần tỉa $p^\frac{1}{n}\%$ số trọng số còn lại từ vòng trước. 

### Kết quả 
Tác giả tìm vé thắng trong kiến trúc fully-connected cho MNIST và  kiến trúc tích chập cho CIFAR10 cùng với vài chiến lược tối ưu (SGD, momentum và Adam) với các kỹ thuật như dropout, weight decay, batchnorm và residual connection. Tác giả sử dụng kỹ thuật tỉa không cấu trúc (unstructured pruning). Với các mạng sâu hơn, chiến lược dựa vào cắt tỉa để tìm ra vé thắng nhạy cảm với tốc độ học (leanring rate): nó yêu cầu warmup để tìm tìm vé thắng ở learning rate cao hơn. Vé thắng tác giả tìm thấy chỉ chiếm 10-20% kích thước của mạng gốc nhưng vẫn đạt hoặc vượt độ chính xác của mạng gốc. Khi khởi tạo lại ngẫu nhiên, vé thắng cho kết quả tệ hơn, điều này có nghĩa là chỉ riêng cấu trúc mạng sẽ không đủ để tạo nên thành công của vé thắng.

# Vé thắng trong mạng fully-connected
![](https://images.viblo.asia/0f850793-c4a6-4658-86ab-61ee1899452e.png)

Tác giả đánh giá giả thuyết vé số với mạng fully-connected được huấn luyện trên tập MNIST. Mô hình được sử dụng là Lenet-300-100 mô tả ở hình trên. Các bước được tiến hành như ở phần giới thiệu: sau khi khởi tạo ngẫu nhiên và huấn luyện mạng, tác giả tỉa mạng và reset các kết nối còn lại về giá trị khởi tạo. Việc cắt tỉa được thực hiện bằng cách loại bỏ theo phần trăm các trọng số có độ lớn nhỏ nhất của mỗi lớp(layer). Các kết nối với đầu ra(outputs) được tỉa bằng một nửa tỷ lệ của phần còn lại của mạng. 

**Định nghĩa** $P_m = \frac{||m||_0}{\theta}$ là độ thưa của mặt nạ $m$. Ví dụ, $P_m = 25\%$ khi 75% trọng số được tỉa.

![](https://images.viblo.asia/34c2c5fe-cc08-4f21-bc77-b3247bdf0b2f.png)

Tỉa lặp lại **(iterative pruning)**. Vé thắng chúng ta tìm học nhanh hơn mạng gốc. Hình trên thể hiện độ chính xác trung bình khi huấn luyện vé số theo cách lặp lại với nhiều mức độ. Trong vòng tỉa đầu tiên, mạng học nhanh hơn và đạt độ chính xác cao hơn là những mạng được tỉa nhiều hơn(trong hình bên trái). Vé thắng gồm 51.3% trọng số từ mạng gốc($P_m = 51.3\%$) đạt độ chính xác cao hơn và nhanh hơn mạng gốc nhưng chậm hơn so với $P_m = 21.1\%$. Khi $P_m < 21.1\%$, quá trình học bắt đầu chậm hơn(hình ở giữa). Khi $P_m = 3.6\%$, vé thắng có performance thấp hơn so với mạng gốc. Một pattern tương tự lặp lại trong các thử nghiệm trong suốt bài báo.

Khởi tạo lại ngẫu nhiên (**Random reinitialization**): để đo sự quan trọng của việc khởi tạo của vé thắng, tác giả giữ lại cấu trúc của vé thắng nhưng khởi tạo mới $\theta'_0 ∼ \mathcal{D}_\theta$. Tác giả thấy rằng khởi tạo là yếu tố quyết định cho sự hiệu quả của vé thắng. Mô hình học chậm hơn và cho độ chính xác thấp hơn khi khởi tạo lại ngẫu nhiên. 

**One-shot pruning**: mặc dù việc tỉa lặp lại  trích xuất vé thắng nhỏ hơn, nhưng việc lặp lại khiến chúng sẽ tốn chi phí để tìm. Tỉa one-shot là phương pháp khả thi để tìm vé thắng mà không phải lặp lại quá trình huấn luyện. Vé thắng được tỉa một cách lặp lại sẽ học nhanh hơn và đạt được độ chính xác cao hơn với kích thước mạng nhỏ hơn. 

# Vé thắng trong mạng tích chập
Tác giả thử nghiệm trên CIFAR10, tăng cả độ phức tạp của bài toán và kích thước của mạng. Xét các kiến trúc Conv-2, Conv-4, Conv-6, là các biến thể nhỏ hơn của họ VGG. Các mạng này có 2, 4, 6 lớp tích chập theo sau là hai lớp fully-connected; max-pooling sau mỗi hai lớp tích chập. 

![](https://images.viblo.asia/a6cb485e-307a-466d-88f0-de8aacdf5c4e.png)

**Tìm vé thắng**: đường nét liền trong hình trên thể hiện thí nghiệm vé số lặp lại trên Conv-2(blue), Conv-4(orange), và Conv-6 ở tỷ lệ tỉa theo từng lớp. Pattern từ Lenet trong phần trước lặp lại: khi mạng được tỉa, nó học nhanh hơn và độ chính xác tăng so với mạng gốc. Trong trường hợp này, kết quả khá dễ thấy. Vé thắng đạt validation loss cực tiểu và nhanh hơn 3.5 lần với Conv-2 ($P_m=8.8\%$), 3.5 lần với Conv-4($P_m=9.2\%$), và 2.5 lần với Conv-6($P_m=15.1\%$). Cả ba mạng đều cho độ chính xác cao hơn độ chính xác trung bình gốc khi $P_m > 2\%$

**Global pruning**. Trong Lenet và Conv-2/4/6, tác giả tỉa mỗi lớp riêng biệt với cùng tỷ lệ. Với Resnet-18 và VGG-19, tác giả sử dụng tỉa toàn cục(global pruning), loại bỏ những trọng số có độ lớn thấp nhất trong tất cả các lớp tích chập. Tác giả phỏng đoán rằng với những mạng sâu hơn, có những lớp sẽ có nhiều tham số hơn các lớp khác. Ví dụ như, hai lớp tích chập đầu tiên của VGG có 1728 và 36864 tham số trong khi đó 2 lớp cuối có 2.35 triệu. Khi tất cả các lớp được tỉa với cùng tỷ lệ, những lớp nhỏ hơn này trở thành nút thắt cổ chai.

# Những điểm hạn chế
Trong bài báo tác giả chỉ xét những dataset nhỏ như MNIST và CIFAR10 và cần có phương pháp hiệu quả hơn để tìm vé thắng với những bài toán phức tạp hơn, có dataset lớn hơn như ImageNet.

Với những mạng sâu hơn (Resnet-18 và VGG-19), tỉa lặp lại không thể tìm thấy vé thắng trừ khi huấn luyện với tốc độ học khởi động (learning rate warmup). Do đó khi sử dụng learning rate thường được áp dụng cho các mạng này thì không thể sử dụng phương pháp này để tìm vé thắng.

# Lời kết
Trong bài này, mình đã tóm tắt các ý chính trong bài báo. Cá nhân mình thấy phương pháp này chỉ có ứng dụng với những mạng nhỏ, nhưng kết quả của bài báo này là khá bất ngờ và rất nhiều bài báo sau này đã dựa trên khám phá này. Cũng có một bài báo mới đây đã chỉ ra điều kiện để tìm ra winning ticket và kết luận rằng phương pháp này không hiệu quả với những model cần huấn luyện với leanring rate lớn. Tuy vậy, mình đánh giá bài báo này đã có những khám phá mới giúp chúng ta có những hướng đi mới trong việc pruning model và hiểu hơn về các yếu tố xung quanh việc huấn luyện mạng.