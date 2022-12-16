# Giới thiệu

Geoffrey Hinton là một nhà nghiên cứu khá nổi tiếng với các công trình liên quan đến mạng neuron nhân tạo. Trong một bài AMA trên reddit, khi được hỏi về ý kiến gây tranh cãi nhất của ông về học máy, ông trả lời rằng:
> [The pooling operation used in convolutional neural networks is a big mistake and the fact that it works so well is a disaster.](https://www.reddit.com/r/MachineLearning/comments/2lmo0l/ama_geoffrey_hinton/clyj4jv/)


Dịch sơ sơ ra là:
> Phép pooling được sử dụng trong mạng neuron tích chập (CNN - Convolutional Neural Network) là một sai lầm lớn và việc nó hoạt động hiệu quả là một thảm họa.

Năm 2017, ông công bố nghiên cứu của mình về Capsule Network (CapsNet) và kết quả cho thấy rằng CapsNet đạt được kết quả state-of-the-art trên bộ MNIST và có khả năng nhận diện các số bị đè lên nhau tốt hơn mạng CNN bình thường. Vậy câu hỏi là: phép pooling có vấn đề gì và capsule đã khắc phục nó ra sao?
# 1. Vấn đề của hàm pooling
Trong mạng CNN, hàm pooling (nhất là hàm max pooling) thường được dùng chủ yếu để downsample (giảm kích thước) của feature map, tạo ra một feature map mới tổng quát các đặc trưng của input. Điều này khiến cho nó có thể tăng field-of-view (vùng nhìn thấy) của các neuron ở layer bậc cao hơn, giúp chúng học được các đặc trưng cấp cao hơn. Ngoài ra, việc dùng hàm pooling còn giúp mạng CNN có thể nhận diện một object ở các vị trí khác nhau bằng cách sử dụng weight tốt có được tại một vị trí với các vị trí khác trong input. Tuy nhiên, cách hàm pooling hoạt động cũng tạo nên một điểm yếu của nó: hàm pooling không giữ thông tin về vị trí tương đối giữa các vật thể với nhau.

![image.png](https://images.viblo.asia/c14f65ad-d4b3-4c86-8f06-6449ec506f49.png)

Hình trên sẽ giúp mọi người dễ hình dung hơn. Bên trái của hình là một khuôn mặt với mắt, mũi và môi ở đúng vị trí, còn bên phải là khuôn mặt với các bộ phận không ở đúng vị trí của nó. Với con người, chúng ta có thể dễ dàng nhận diện hình bên trái là một khuôn mặt người hợp lệ, còn bên phải thì không. Tuy nhiên, mạng CNN sẽ nhận diện cả 2 đều là một khuôn mặt hợp lệ bởi tất cả đều có đầy đủ mắt, mũi và môi, bất kể vị trí của chúng. Hướng của các bộ phận và vị trí tương đối trong không gian giữa các bộ phận với nhau đều bị bỏ qua. Như vậy, miễn là có đầy đủ các bộ phận, mạng CNN sẽ nhận diễn ra là khuôn mặt, cho dù các bộ phận được sắp xếp cho bất hợp lý như thế nào đi chăng nữa. Lý do là vì hàm max pooling chỉ lấy các neuron mà active nhất (hay có giá trị lớn nhất) và đưa cho layer tiếp theo. Việc này tuy làm giảm kích thước của feature map nhưng lại làm mất đi thông tin quý giá về không gian giữa các feature khi dữ liệu đi qua các layer. Gọi là quý giá là vì các thông tin này có thể giúp mạng CNN xác định được liệu các feature vừa detect được có làm nên được một feature hợp lệ không. Ví dụ, với các sắp xếp hình bên trái mới là hợp lệ bởi mắt luôn ở trên mũi và mũi ở trên mồm, không như hình bên phải.

# 2. Capsule
Như vậy, để giải quyết vấn đề trên của mạng CNN, Geoffrey Hinton đã đề xuất sử dụng Capsule thay vì dùng max pooling. Capsule được định nghĩa là một nhóm các neuron mà vector của nó được dùng để biểu diễn các tham số của một entity (thực thể) nhất định như một object hay một phần của object đó. Nó hoạt động theo cơ chế **Inverse graphics**. Để hiểu rõ hơn, hãy tưởng tượng rằng bạn muốn render một vật thể nào đó nào đó trong game. Để render được object này, bạn cần phải biết các thông số của object đó như chiều dài/rộng/cao, màu sắc, dáng, vị trí,... Khi biết được các thông số đó, bạn mới có thể render được object. Ngoài ra, khi muốn render một object (gọi là Master) được tạo thành bởi nhiều object con thì việc đó cũng được thực hiện tương tự, đi từ thông số của các object con rồi mới đến object Master. Cơ chế Inverse graphics sẽ đi ngược lại, tức là từ một object, nó sẽ đoán các thông số được dùng để khởi tạo object đó (và cũng tương tự từ object Master đến object con rồi đến các thông số của object con). Để dễ hình dung hơn nữa, hãy nhớ lại cấu trúc dữ liệu dạng cây. Quá trình render thông thường sẽ đi theo kiểu bottom-up, còn inverse rendering sẽ đi theo kiểu top-down. Capsule sẽ chứa các thông số khởi tạo này trong activity vector của nó. Theo như Geoffrey Hinton:
* **Độ dài của activity vector được dùng để biểu diễn xác suất một object tồn tại.**
* **Hướng của activity vector sẽ biểu diễn tham số khởi tạo hay pose của object.**

Do độ dài của vector biểu diễn xác suất một object tồn tại, nó sẽ luôn phải ở trong đoạn từ 0 đến 1. Điều này được thực hiện bằng cách sử dụng một hàm gọi là hàm squash. Hàm này sẽ đảm bảo rằng các vector nào có độ dài ngắn thì sẽ bị rút về gần 0, còn các vector dài hơn thì sẽ cho gần về 1. Hàm này được tính như sau:
![image.png](https://images.viblo.asia/26e87732-8340-4a0c-b15a-1d63e52a98ea.png)

với $v_j$ là vector output của capsule $j$ và $s_j$ là tổng input của nó. Input này được tính bằng tổng các tích của các vector dự đoán của capsule layer trước $\hat{u}_{j|i}$ với hệ số coupling coefficient $c_{ij}$. $\hat{u}_{j|i}$ được tính bằng cách nhân output của một capsule layer trước $\bold{u_i}$ với một ma trận trọng số $W_{ij}$.

![image.png](https://images.viblo.asia/e6fa79d4-c84a-4900-b011-16402eb82283.png)

Tổng các coupling coefficient giữa một capsule và các capsule ở layer sau luôn bằng 1 nên nó sẽ được xác định bởi xác suất capsule $i$ nên được cặp với capsule $j$ gọi là $b_{ij}$. (Ban đầu, các coefficient này sẽ được cho bằng nhau và sẽ được điều chỉnh dần thông qua quá trình học)

![image.png](https://images.viblo.asia/32c07c0e-892d-4bb3-ab08-2166bc13cc66.png)

Như vậy, để xác định các feature có hợp lệ hay không, từng capsule (child) mà đang active sẽ tính toán output với tất cả các capsule ở layer cao hơn (parent). Nếu như output với parent nào mà lớn nhất thì parent đó sẽ được "kích hoạt" với child đó. Ví dụ như ta có capsule biểu diễn ngón tay cái ở layer thứ n, layer thứ n+1 có capsule biểu diễn bàn tay và bàn chân. Sau khi nhân các trọng số lại, output của ngón tay cái với bàn tay được 0.9, của ngón tay cái với bàn chân được 0.7 thì capsule bàn tay sẽ được kích hoạt. Cơ chế này được gọi là **Iterative routing-by-agreement**

![image.png](https://images.viblo.asia/8dd513d3-26f8-4e21-a503-ab6557617eec.png)

Nếu một object thuộc class thứ $k$ xuất hiện trong ảnh, ta sẽ muốn kéo dài length của vector khởi tạo capsule thuộc lớp $k$ ở layer trên cùng. Việc này được thực hiện bằng cách sử dụng hàm margin loss:

![image.png](https://images.viblo.asia/4c61b62d-930e-4a8e-ac95-e68123d805ab.png)

với $T_k = 1$ nếu như class $k$ xuất hiện trong input và $0$ nếu như không xuất hiện, $m^+ = 0.9$ và $m^- = 0.1$. Ngoài ra, trong hàm loss này còn có một hệ số $\lambda = 0.5$ được dùng để tránh trường hợp độ dài của các vector bị giảm đi đáng kể trong giai đoạn đầu của quá trình training.

# 3. Mạng CapsNet
Để sử dụng Capsule cho việc nhận diện số trong bộ dataset MNIST, Geoffrey Hinton đã đề xuất mạng CapsNet. Nó gồm 2 phần: encoder và decoder.
## 3.1. Encoder
![image.png](https://images.viblo.asia/6cba4ff4-6bd4-45f5-89d8-9b5e3bb2ba90.png)

Phần encoder chỉ gồm có 3 layer chính:
1. ReLU Conv1: gồm 256 kernel 9x9 với stride 1 và một layer activation ReLU để detect các feature cơ bản trong ảnh đầu vào (có kích thước 28x28). Output có kích thước 20x20x256.
2. PrimaryCaps: gồm 32 capsule. Mỗi capsule sẽ tính toán 8 kernel 9x9x256 (stride 2) với output của layer trước và tạo ra output có kích thước là 6x6x8. Output của PrimaryCaps có size là 32x6x6x8.
3. DigitCaps: gồm 10 capsule 16 chiều (do có 10 class) và chúng sẽ nhận input từ các capsule của PrimaryCaps. Output là ma trận 10x16.

## 3.2. Decoder
![image.png](https://images.viblo.asia/45d814a7-7e57-43fb-bac0-a47a4a958f3a.png)

Phần decoder được thêm vào để có thể tái tạo lại được hình ảnh của số từ thông tin được lấy từ DigitCaps. Do đó, việc training decoder cũng sẽ bắt các capsule phải lấy được thông tin khởi tạo từ ảnh đầu vào. Nó gồm 3 layer fully connected, trong đó 2 layer đầu dùng hàm ReLU, layer cuối dùng hàm sigmoid. Trong lúc training, các activity vector của capsule thuộc về các số không ở trong ảnh đầu vào sẽ được zero-mask, để decoder chỉ tái tạo lại hình ảnh của số trong input. Việc training này giúp cho capsule network có thể tái tạo lại được hình ảnh mới gần giống với hình ảnh gốc như hình dưới. Chỉ có 2 case khó ở bên phải là CapsNet đoán sai.

![image.png](https://images.viblo.asia/fd882f1e-cc5b-46af-be56-c825b9834e91.png)

Nếu muốn tìm hiểu cách cài đặt CapsNet để dùng trên bộ dataset MNIST, bạn có thể tham khảo link [Colab](https://colab.research.google.com/drive/1OTimrrpwfqx2lLzNfdGAtv-GaEixuFjR?usp=sharing). Sau 7 epoch training, CapsNet đã đạt được độ chính xác 99% và peak tại 99.5% (do mình chưa train hết 500 epoch :D).

Hi vọng bài viết trên đã giúp cho các bạn hiểu cách Capsule hoạt động để khắc phục điểm yếu của hàm pooling trong mạng CNN và cách áp dụng nó trong mạng CapsNet.