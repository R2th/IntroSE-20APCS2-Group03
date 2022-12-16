Deep Learning - Một khái niệm trong lĩnh vực AI(Artificial Intelligence) mà dù đã nghe đến nhiều nhưng thật sự tôi không phải người trong ngành nên khó mơ hồ hình dung ra được, vì vậy mới vọc thử một bài viết giới thiệu trên medium xem nó là gì !

https://medium.com/ub-women-data-scholars/introduction-to-deep-learning-bcae684488e0

## Mở đầu

Hơn 10 năm trước ...

`Mùa hè nóng bức năm 2007, trong khi bạn bè có tiền để  đi bắn Half-Life, nhảy audition, cậu bé tên V cứ hằng ngày sang nhà chú hàng xóm vào phòng ngồi điều hòa mát lạnh! Ở quê lúc bấy giờ ít nhà có điều hòa lắm, nhưng V sang đó là vì nguyên nhân khác - vì không có tiền chơi game 😄 Ờ đúng vậy.V chuyển sang thích một trò chơi khác, đó là cờ tướng, nhà chú hàng xóm có máy và mạng để đánh cờ online.`
![](https://images.viblo.asia/35eecef2-0340-400e-aa97-45eb7428aef0.jpg)
`V không biết Hồ  Vinh Hoa là ai (Và chắc chắn không biết software tiếng anh nghĩa là gì), nhưng V biết mỗi lần chơi cờ là phải mang Software(SW) ra chém, tung hoành khắp giang hồ  gặp không ít đối thủ trên khắp cả nước. Không cần biết là quán quân tỉnh hay huyện, chỉ cần là "người" mà gặp phải V thì xác định là đau đầu buốt óc, có vài trận V khai cuộc khá yếu nhưng càng đánh trung tàn V càng chống đỡ rất lỳ lợm, cuối cùng đối thủ vẫn phải buông cờ đầu hàng. V vì vậy càng thích *"chơi"* cờ hơn. Và câu chuyện ngây thơ đó tưởng như sẽ tốt đẹp không có hồi kết cho đến một ngày V bị admin phát hiện và ban nick 😄!`

*Vậy rốt cuộc công nghệ được sử dụng để làm nên SW đánh cờ thần sầu của V là gì mà hay vậy ???*

**Có thể bạn không thích!**
*  Thất bại đầy cay đắng *0-6* của nhà vua `Gary Kasparov` năm ***1997*** môn *cờ vua* mặc dù mới 1 năm trước ông vẫn còn có thể hành xác con DEEP BLUE!
*  Tin đồn lan rộng: huyền thoại `Hồ Vinh Hoa` để thua sau 69 nước cờ khi đấu với con XQMaster 3.0, khiến cho khi về Việt Nam con này bị crack rất nhiều =)), tuy nhiên chỉ 1 năm sau phiên bản XQMaster 6.0 vừa nâng cấp đã lập tức trở thành dĩ vãng trước sự ra đời của hàng loạt phần mề m thế hệ mới cực mạnh tại giải vô địch *Cờ tướng* máy tính tháng 10 năm ***2007*** tại Đài Loan TQ, bắt đầu sự thống trị của phần mềm ở môn cờ tướng.
*  Đầu ***2017*** nhiều người vẫn không khỏi bất ngờ trước sức mạnh tuyệt đối của `Alpha Go` trong môn *cờ vây*, khi trước đó đã cho nhà vô địch 18 lần cờ vây thế giới - `Fan Hui` phải khô máu, mặc dù trước đó các chương trình cờ vây khác không thể  đạt tới trình độ cờ vây nghiệp dư.

**Just for laugh :v:!** các ví dụ trên không phải để dìm hàng những nhà quán quân, nhưng với tốc độ này thì sau **2027** rất có thể  dạy chúng ta học sẽ là phần mềm mà không cần giảng viên là người nữa =)).

*DEEP BLUE*, *XQMS*, *ALPHA GO* chúng là cái thứ gì mà đáng sợ vậy? Tạm thời ~~*bó cánh*~~, nhưng chắc chắn rằng chính con người đã dạy cho chúng: **trí thông minh**

![](https://images.viblo.asia/be00e463-735d-4742-841b-82e3da58e019.jpeg)

## I. AI ... là ai?
Liên quan 😄? Tiêu đề  là Deep Learning cơ mà !!!

Rõ ràng là tôi đang tìm hiểu về  Deep Learning, vậy tại sao lại nói về AI trước? Giống như khi ta giới thiệu bà con họ hàng thôi: *Thằng bé này tên là A con zai bác B, cháu ông C ở thôn D*. Giống như việc ta được giới thiệu 1 người họ hàng mà chẳng biết họ hàng cái kiểu gì? từ đâu? bao giờ? vậy, cảm thấy tò mò về  cái thằng DL mà không biết ông nó là AI, hay thằng cha ML của nó thì rất là lởm khởm!

![](https://images.viblo.asia/842dfc58-4c9a-4e31-83b4-f803c033f466.jpg)
**AI** là viết tắt của Artificial Intelligence, dịch ra thành Trí tuệ nhân tạo. Nó là một thuật ngữ mà tôi gọi là *rất cao siêu*. Vì thế  bỏ qua các định nghĩa khó hiểu thì tôi chưa dám tò mò về thằng này nhiều, chỉ dám tờ mờ rằng: `*máy tính* mà *như con người*` thì đó là AI. Trong lịch sử phát triển AI, các nhà nghiên cứu phân thành 4 hướng tiếp cận chính:
* Hành động như người (acting humanly)
* Suy nghĩ như người (thinking humanly)
* Suy nghĩ hợp lý (thinking rationally)
* Hành động hợp lý (acting rationally)

![](https://images.viblo.asia/e2044523-3955-465c-b371-6c15699fa515.jpg)

**Vân vân & Mây mây các lĩnh vực liên quan đến AI... Why ? Trong danh sách này có đứa mà tôi cần tìm**
* Tâm lý học nhận thức
* Thần kinh học
* Lý thuyết về hệ thống 
* Toán Logic và Logic học
* Sinh học tiến hoá
* Khoa học về hành vi bầy đàn
* Tổ chức học
* Thống kê học
* Các phương pháp tìm kiếm lời giải 
* Hệ chuyên gia 
* Xử lý ngôn ngữ tự nhiên 
* Lý thuyết nhận dạng 
* Lập kế hoạch và Người máy (Robot)
* Các mô hình thần kinh (Mạng Neuron và giải thuật di truyền)
* **Máy học** <- *Đó, chính là nó - thằng ML mà tôi nhắc tới cùng với AI ở bên trên đó*
* ...

## II. Machine Learning (ML)

**Machine learning:** máy có khả năng thích nghi với các điều kiện môi trường xung quanh để rút trích ra các nguyên lý từ tri thức thu nhận được phục vụ cho việc ra quyết định.
![](https://images.viblo.asia/b3185101-b207-46f3-b0d3-64ee37ac7d4c.png)
**30s Quảng cáo:**
* Series *Machine Learning thật thú vị* - Translater: Nguyen Dinh Tung
    https://viblo.asia/p/machine-learning-that-thu-vi-1-du-doan-gia-nha-dat-gAm5y91w5db
* Giải thích Machine Learning với các bạn "mù" công nghệ thế nào? - Author: Nguyen Dinh Tung
    https://viblo.asia/p/giai-thich-machine-learning-voi-cac-ban-mu-cong-nghe-the-nao-maGK78AOZj2

ML chỉ là một thành phần trong hướng tiếp cận *hành động như người*, và hướng tiếp cận này lại thuộc bốn hướng tiếp cận của AI.
Để đạt được mục tiêu này, các nhà khoa học đã nghiên cứu ra nhiều giải thuật và các hướng giải quyết khác nhau:

* Supervised-learning: decision tree, k-NN, naive bayes, SVM, neural network, **deep learning**, …
* Unsupervised-learning: k-means, hierachical clustering
* Reinforcement learning: passive/acive/generalization.

*Một lần nữa ta có thể thấy Deep learning chỉ là một phương pháp nằm trong hướng giải quyết học có giám sát của ML. Tại sao DL lại gây bão nhiều như vậy. Nhà nhà, doanh nghiệp, engineer đều làm nghiên cứu Deep learning?*
> AI (Trí tuệ nhân tạo) đang tiến bộ với tốc độ lớn và **Deep Learning** là một trong những nhân đóng góp cho điều đó.

## III. `Deep Learning` là gì?

> Deep Learning là một phần của ML trong hướng tiếp cận AI - bắt chước các hoạt động của bộ não con người trong việc xử lý dữ liệu và tạo ra các mô hình để sử dụng trong việc ra quyết định. Deep Learning là một tập hợp con của Machine Learning trong Trí tuệ nhân tạo (AI) có mạng lưới có khả năng `học tập không giám sát`(unsupervised learning) từ dữ liệu `không có cấu trúc`(unstructured) hoặc `không có nhãn`(unlabeled).
![](https://images.viblo.asia/8e0c44c7-4f1e-4405-a0c6-2e56354f3d71.png)
> Also known as deep structured learning or hierarchical learning

**supervised learning vs unsupervised learning:**

Giải thích Deep learning bằng tiếng việt dễ  hiểu nhất thế  giới:
https://spiderum.com/bai-dang/Loi-giai-thich-don-gian-ve-Deep-Learning-ma-gan-nhu-ai-cung-co-the-hieu-8a9

Mù công nghệ mà đọc đến đoạn *mạng lưới*, *học tập không giám sát* mà không cảm thấy khó hiểu mới lạ:

**Supervised learning:** Liên quan đến việc sử dụng các bộ dữ liệu đã được gán mà có đầu vào `(Input)` và các đầu ra `(Output)` như kỳ vọng.

**Unsupervised learning:** Là cách dạy các AI bằng cách sử dụng các bộ dữ liệu mà không có cấu trúc cụ thể

### Mạng nơ-ron (neural network) là gì?
Thuật toán Deep Learning tương tự như hệ thống thần kinh được cấu trúc trong đó mỗi tế bào thần kinh kết nối lẫn nhau và truyền thông tin.

Hãy bắt đầu với nơron nhân tạo được gọi là `*perceptron*`. Làm thế nào để *perceptron* hoạt động? *Perceptron* nhận một số  binary inputs, x1, x2,… và tạo ra một *single binary output*:
![](https://images.viblo.asia/85eb080e-5ca0-49f4-ba1b-79c49240c44e.png)

Trong ví dụ cho thấy perceptron có ba đầu vào, x1, x2, x3. Nói chung nó có thể có nhiều hoặc ít đầu vào. Rosenblatt đã đề xuất một quy tắc đơn giản để tính toán đầu ra. Ông đã giới thiệu trọng số, w1, w2, ..., số thực thể hiện tầm quan trọng của các đầu vào tương ứng với đầu ra.
Sản lượng của nơron, 0 hoặc 1, được xác định bởi liệu tổng trọng số ∑jwjxj nhỏ hơn hay lớn hơn giá trị ngưỡng nào đó. Cũng giống như trọng số, ngưỡng là một số thực - đó là một tham số của nơron. Để đặt nó trong các thuật ngữ đại số chính xác hơn:
![](https://images.viblo.asia/7edd9321-dd41-4cac-b599-2b1bf69e8901.png)

Đó là tất cả những gì có liên quan đến cách một perceptron hoạt động!

Học thuật toán âm thanh tuyệt vời. Nhưng làm thế nào chúng ta có thể đưa ra các thuật toán như vậy cho một mạng thần kinh? Giả sử chúng ta có một mạng lưới các perceptron mà chúng ta muốn sử dụng để học cách giải quyết một số vấn đề.

Rất khó để xem làm thế nào để dần dần sửa đổi các trọng số và thành kiến ​​để mạng trở nên gần gũi hơn với hành vi mong muốn. Có lẽ có một số cách thông minh để giải quyết vấn đề này. Nhưng nó không phải là ngay lập tức rõ ràng làm thế nào chúng ta có thể có được một mạng lưới các perceptrons để tìm hiểu.

> Chúng ta có thể khắc phục vấn đề này bằng cách giới thiệu một loại nơron nhân tạo mới gọi là nơron sigmoid. Các nơron Sigmoid tương tự như các perceptron, nhưng được sửa đổi sao cho những thay đổi nhỏ về trọng lượng và độ lệch của chúng chỉ gây ra một thay đổi nhỏ trong đầu ra của chúng. Đó là thực tế quan trọng sẽ cho phép một mạng lưới các tế bào thần kinh sigmoid để học.
> Giống như một perceptron, nơron sigmoid có đầu vào, x1, x2,…. Ahh! Nhưng thay vì chỉ 0 hoặc 1, các đầu vào này cũng có thể nhận bất kỳ giá trị nào trong khoảng từ 0 đến 1.

### Kiến trúc của Neural Network:
![](https://images.viblo.asia/671f0c47-205b-4fe5-bb86-22882ff1971b.png)

Các giá trị của lớp đầu vào, hoặc nói cách khác là dữ liệu cơ bản của chúng ta, được truyền qua "mạng" này của các lớp ẩn cho đến khi chúng hội tụ với lớp đầu ra. Lớp đầu ra là dự đoán của chúng tôi: nó có thể là một nút nếu mô hình chỉ xuất ra một số hoặc một vài nút nếu đó là vấn đề phân loại nhiều lớp.

Các lớp ẩn của Neural Net thực hiện các sửa đổi trên dữ liệu để cuối cùng cảm nhận mối quan hệ của nó với biến mục tiêu là gì. Mỗi nút có một trọng số, và nó nhân giá trị đầu vào của nó theo trọng lượng đó. Làm điều đó qua một vài lớp khác nhau, và Net có thể thao tác cơ bản dữ liệu vào một cái gì đó có ý nghĩa.

### Các loại NEURAL NETWORK

**1. Mạng Neural Feedforward - Neuron nhân tạo:**
- Dạng đơn giản nhất của ANN, nơi dữ liệu

- đầu vào di chuyển theo một hướng

- Dữ liệu đi qua các nút đầu vào và thoát trên các nút đầu ra

- có sóng lan truyền phía trước và không truyền lại bằng cách sử dụng chức năng kích hoạt phân loại thường.

- Ứng dụng các mạng nơ-ron về phía trước nguồn cấp dữ liệu được tìm thấy trong nhận dạng giọng nói và nhận dạng giọng nói khi phân loại các lớp đích là phức tạp. Các loại mạng thần kinh này đáp ứng với dữ liệu ồn ào và dễ bảo trì.

Mã để thực hiện việc trồng nhánh bằng cách sử dụng numpy:

```python
import numpy as np

def sigmoid(x):
    """
    Calculate sigmoid
    """
    return 1/(1+np.exp(-x))

# Network size
N_input = 4
N_hidden = 3
N_output = 2

np.random.seed(42)
# Make some fake data
X = np.random.randn(4)

weights_input_to_hidden = np.random.normal(0, scale=0.1, size=(N_input, N_hidden))
weights_hidden_to_output = np.random.normal(0, scale=0.1, size=(N_hidden, N_output))


# TODO: Make a forward pass through the network

hidden_layer_in = np.dot(X, weights_input_to_hidden)
hidden_layer_out = sigmoid(hidden_layer_in)

print('Hidden-layer Output:')
print(hidden_layer_out)

output_layer_in = np.dot(hidden_layer_out, weights_hidden_to_output)
output_layer_out = sigmoid(output_layer_in)

print('Output-layer Output:')
print(output_layer_out)
```

**2. Mạng thần kinh tái phát - Recurrent Neural Network (RNN) - Bộ nhớ dài hạn.**
- hoạt động trên nguyên tắc tiết kiệm đầu ra của một lớp và đưa nó trở lại đầu vào để giúp dự đoán kết quả của lớp.
- lớp đầu tiên được hình thành tương tự như mạng lưới thần kinh tiến lên phía trước với sản phẩm của tổng trọng lượng và các tính năng.

- Đây là cách trông giống như Recurrent Neural Network cơ bản
![](https://images.viblo.asia/325918cc-9d7d-4122-ac74-5e0b2e81322d.gif)
- Việc áp dụng các Recurrent Neural Network có thể được tìm thấy trong các mô hình chuyển đổi văn bản thành giọng nói (TTS).

*3. Mạng thần kinh liên kết:*
- tương tự như các mạng nơron chuyển tiếp, nơi mà các nơron có trọng số và thành kiến có thể học được.

- Ứng dụng của nó đã được trong tín hiệu và xử lý hình ảnh mà mất hơn OpenCV trong lĩnh vực tầm nhìn máy tính.

Dưới đây là một biểu diễn của một ConvNet, trong mạng nơ-ron này, các tính năng đầu vào được thực hiện theo hàng loạt như một bộ lọc. Điều này sẽ giúp mạng nhớ hình ảnh trong các phần và có thể tính toán các hoạt động.
![](https://images.viblo.asia/9a781a09-93af-410e-af47-8218bd0c3bcd.gif)

Có một số loại mạng thần kinh tiên tiến khác như: - Kohonen Self Organizing Neural Network,Modular Neural Network,Radial basis function Neural Network..

**Nguồn tham khảo:**
https://medium.com/ub-women-data-scholars/introduction-to-deep-learning-bcae684488e0
https://ongxuanhong.wordpress.com
https://spiderum.com/bai-dang/Loi-giai-thich-don-gian-ve-Deep-Learning-ma-gan-nhu-ai-cung-co-the-hieu-8a9