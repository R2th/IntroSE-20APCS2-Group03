## Mở Đầu
Một phần của nhiệm vụ để tìm hiểu về AI, phải đặt ra cho mình mục tiêu xây dựng một mạng lưới thần kinh đơn giản trong Python. Để đảm bảo tôi thực sự hiểu nó, ta đã phải xây dựng nó từ đầu mà không sử dụng một thư viện neural. Nhờ một bài đăng blog tuyệt vời của [Andrew Trask](http://iamtrask.github.io/2015/07/12/basic-python-network/) mà sẽ cho ra đời hương giải quyết xây dựng một neural network trong 9 lines code Python.

## 9 lines code:

```
from numpy import exp, array, random, dot
training_set_inputs = array([[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]])
training_set_outputs = array([[0, 1, 1, 0]]).T
random.seed(1)
synaptic_weights = 2 * random.random((3, 1)) - 1
for iteration in xrange(10000):
    output = 1 / (1 + exp(-(dot(training_set_inputs, synaptic_weights))))
    synaptic_weights += dot(training_set_inputs.T, (training_set_outputs - output) * output * (1 - output))
print 1 / (1 + exp(-(dot(array([1, 0, 0]), synaptic_weights))))
```
Trong bài viết này, tôi sẽ giải thích cách tôi tạo ra mạng neural đó, và bạn có thể dựa theo để tự dựng cho mình một mạng neural. Tôi cũng sẽ cung cấp một bản code dài hơn, nhưng rõ ràng hơn ở cuối bài viết.

Nhưng trước tiên, một mạng lưới thần kinh là gì? Bộ não con người bao gồm 100 tỉ tế bào gọi là tế bào thần kinh (neuron), kết nối với nhau bằng các khớp thần kinh (synaptic). Nếu một khớp thần kinh của một tế bào có đủ năng lượng và phát sáng, tế báo đó cũng sẽ phát sáng — truyền tiếp dữ liệu đi (If sufficient synaptic inputs to a neuron fire, that neuron will also fire). Chúng ta gọi quá trình này là “suy nghĩ”.
Chúng ta có thể mô hình quá trình này bằng cách tạo ra một mạng lưới thần kinh trên một máy tính. Nhưng không cần thiết để mô hình phức tạp sinh học của não bộ con người ở mức độ phân tử, chỉ quy định mức độ cao hơn của nó. Chúng ta sử dụng một kỹ thuật gọi là ma trận toán học, đó là lưới của các con số. Để làm cho nó thực sự đơn giản, chúng tôi sẽ chỉ mô hình một tế bào thần kinh duy nhất, với ba đầu vào và một đầu ra.
![](https://images.viblo.asia/dea51391-5e0b-407d-9e09-5ffcece8909c.png)

Chúng tôi sẽ đào tạo các tế bào thần kinh để giải quyết các vấn đề dưới đây. Bốn ví dụ đầu tiên được gọi là một tập huấn luyện. Bạn có thể tìm ra quy luật? Chỗ dấu ‘?’ là 0 hay 1?
![](https://images.viblo.asia/c717ad92-67da-4518-b98a-b9cc9b111c90.png)
Bạn có thể thấy, mà đầu ra luôn luôn bằng với giá trị của các cột đầu vào tận cùng bên trái. Vì vậy câu trả lời là ‘?’ Nên được 1.

## Quá trình đào tạo

Nhưng làm thế nào để chúng ta dạy cho tế bào thần kinh trả lời câu hỏi một cách chính xác? Chúng ta sẽ cung cấp cho mỗi đầu vào một trọng số, có thể là một số dương hoặc âm. Một đầu vào với một trọng số cực lớn hoặc một trọng số âm cực lớn, sẽ có một tác động mạnh đến đầu ra của tế bào thần kinh. Trước khi chúng ta bắt đầu, chúng ta thiết lập mỗi trọng số bằng một số ngẫu nhiên. Sau đó chúng ta bắt đầu quá trình đào tạo:

* Lấy inputs từ tập dữ liệu huấn luyện, điều chỉnh chúng bằng trọng số, ném chúng qua một công thức đặc biệt để tính neuron’s output.
* Tính lỗi, đó là sự khác biệt của neuron’s output và output mà ta mong muốn, out mong muốn này đã có sẵn trong tập huấn luyện.
* Tùy thuộc vào sự chỉ đạo của các lỗi, điều chỉnh trọng số một cách nhẹ nhàng.
* Lặp lại quá trình này 10, 000 lần.* 
![](https://images.viblo.asia/1cf328bc-db7e-4196-99c9-9ed17c92b3fa.jpeg)
Cuối cùng trọng số của các tế bào thần kinh sẽ đạt được tối ưu với các giá trị trong tập huấn luyện. Nếu chúng ta dùng mạng lưới neural này để xử lý một tình huống mới, chúng sẽ áp dụng các trọng số, và đưa ra một dự đoán.
Quá trình này được gọi là lan truyền ngược (back propagation).
Công thức tính kết quả của tế bào thần kinh

Bạn có thể tự hỏi, công thức đặc biệt để tính output là cái quái gì? Đầu tiên hãy lấy trọng số nhân với dữ liệu inputs:
![](https://images.viblo.asia/f08f6519-cfa3-43ef-8a68-d0a54f266fff.png)
Tiếp theo chúng ta bình thường hóa nó, để kết quả nằm giữa 0 và 1. Để làm điều này, chúng ta sử dụng một hàm toán học, được gọi là hàm sigmoid:
![](https://images.viblo.asia/6948ab8f-7fdc-4ac1-a5b6-83cf5ba6546f.png)
Nếu vẽ trên một đồ thị, hàm sigmoid là một đường cong hình chữ S.
![](https://images.viblo.asia/67ab9f77-3e2b-4d85-99c6-e1fcecef9ffe.png)
Vì vậy, bằng cách thay thế phương trình đầu tiên vào phương trình thứ hai, công thức cho output của các tế bào thần kinh là:
![](https://images.viblo.asia/25951161-ebbd-40d6-8f87-093987108cb2.png)
Bạn có thể thấy rằng chúng ta không sử dụng một ngưỡng bắn tối thiểu (minimum firing threshold) hay còn gọi là “hàm kích hoạt", cốt là để giữ cho mọi thứ đơn giản.

## Công thức để điều chỉnh trọng số

Trong suốt chu trình đào tạo (Hình 3), chúng ta điều chỉnh các trọng số. Nhưng câu hỏi là điều chỉnh như thế nào? Chúng ta có thể sử dụng công thức “Error Weighted Derivative”:
![](https://images.viblo.asia/00250dc3-fc13-4e44-85fa-36a6f5adc295.png)
1. Tại sao lại là công thức này? Đầu tiên, chúng ta muốn thực hiện việc điều chỉnh tỷ lệ thuận với kích thước của các lỗi (tức là sai lệch càng nhiều thì anh sẽ điều chỉnh càng mạnh tay). Thứ hai, chúng ta nhân với dữ liệu đầu vào, đó là hoặc là 0 hoặc là 1. Nếu đầu vào là 0, trọng số chả cần điều chỉnh quái gì. Cuối cùng, chúng ta nhân với [gradient](https://vi.wikipedia.org/wiki/Gradien) (độ dốc) của đường cong Sigmoid (Hình 4). Để hiểu câu cuối, hơi khó đấy, hãy tôi giải thích rõ:
2. Chúng ta sử dụng đường cong Sigmoid để tính output of the neuron.
3. Nếu output là một số dương hoặc âm lớn, nó có ý nghĩa là tế bào thần kinh đã khá tự tin một cách này hay cách khác.
4. Từ Hình 4, chúng ta có thể thấy nếu giá trị trục x tiến tới âm vô cùng hoặc dương vô cùng, đường cong Sigmoid có một độ dốc thấp (đồi thoải, gần như bằng phẳng).
5. Nếu các tế bào thần kinh là tự tin rằng trọng số hiện tại là đúng, nó không muốn điều chỉnh nhiều. Nhân với độ dốc của đường cong Sigmoid là để đạt được điều này.

Độ dốc của đường cong sigmoid, có thể được tìm thấy bằng cách lấy đạo hàm:
![](https://images.viblo.asia/5255ae73-9b47-4fa5-befd-a19274d83be5.png)
Vì vậy, bằng cách thay thế các phương trình thứ hai vào phương trình đầu tiên, các công thức cuối cùng để điều chỉnh trọng số là:
![](https://images.viblo.asia/77788a3b-b67c-493a-9691-9669204bdcce.png)
Có các công thức khác, sẽ cho phép các tế bào thần kinh học nhanh hơn, nhưng công thức chúng ta sử dụng có lợi thế là khá đơn giản.

## Xây dựng mã Python

Mặc dù chúng ta không sử dụng thư viện neural network nào cả, chúng ta sẽ sử dụng 4 phương thức từ lib numpy của Python. Đó là:

* exp — tính luỹ thừa tự nhiên (the natural exponential)
* array —tạo ma trận ( creates a matrix)
* dot — nhân ma trận (multiplies matrices)
* random — sinh số ngẫu nhiên (gives us random numbers)
Ví dụ chúng ta có thể sử dụng phương thức array() để biểu diễn tập dữ liệu huấn luyện như sau:
```
training_set_inputs = array([[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]])
training_set_outputs = array([[0, 1, 1, 0]]).T
```
Hàm ‘.T’ , transpose-chuyển đổi ma trận từ ngang sang dọc. Do đó máy tính sẽ lưu trữ như thế này:
![](https://images.viblo.asia/79dea296-c339-4b64-90ab-02f4f4d8684a.png)
Được. Tôi nghĩ rằng chúng ta đã sẵn sàng cho phiên bản đẹp hơn của mã nguồn. Sau khi show code, tôi sẽ kết thúc bài viết này với một số cảm nghĩ của mình.

Tôi đã thêm các comment vào mã nguồn để giải thích tất cả mọi thứ, từng dòng một, hãy đọc nhé. Lưu ý rằng trong mỗi lần lặp, chúng ta xử lý toàn bộ tập huấn luyện cùng một lúc. Do đó biến của chúng ta là các ma trận. Dưới đây là một ví dụ làm việc hoàn toàn được viết bằng Python:
```
from numpy import exp, array, random, dot


class NeuralNetwork():
    def __init__(self):
        # Seed the random number generator, so it generates the same numbers
        # every time the program runs.
        random.seed(1)

        # We model a single neuron, with 3 input connections and 1 output connection.
        # We assign random weights to a 3 x 1 matrix, with values in the range -1 to 1
        # and mean 0.
        self.synaptic_weights = 2 * random.random((3, 1)) - 1

    # The Sigmoid function, which describes an S shaped curve.
    # We pass the weighted sum of the inputs through this function to
    # normalise them between 0 and 1.
    def __sigmoid(self, x):
        return 1 / (1 + exp(-x))

    # The derivative of the Sigmoid function.
    # This is the gradient of the Sigmoid curve.
    # It indicates how confident we are about the existing weight.
    def __sigmoid_derivative(self, x):
        return x * (1 - x)

    # We train the neural network through a process of trial and error.
    # Adjusting the synaptic weights each time.
    def train(self, training_set_inputs, training_set_outputs, number_of_training_iterations):
        for iteration in xrange(number_of_training_iterations):
            # Pass the training set through our neural network (a single neuron).
            output = self.think(training_set_inputs)

            # Calculate the error (The difference between the desired output
            # and the predicted output).
            error = training_set_outputs - output

            # Multiply the error by the input and again by the gradient of the Sigmoid curve.
            # This means less confident weights are adjusted more.
            # This means inputs, which are zero, do not cause changes to the weights.
            adjustment = dot(training_set_inputs.T, error * self.__sigmoid_derivative(output))

            # Adjust the weights.
            self.synaptic_weights += adjustment

    # The neural network thinks.
    def think(self, inputs):
        # Pass inputs through our neural network (our single neuron).
        return self.__sigmoid(dot(inputs, self.synaptic_weights))


if __name__ == "__main__":

    #Intialise a single neuron neural network.
    neural_network = NeuralNetwork()

    print "Random starting synaptic weights: "
    print neural_network.synaptic_weights

    # The training set. We have 4 examples, each consisting of 3 input values
    # and 1 output value.
    training_set_inputs = array([[0, 0, 1], [1, 1, 1], [1, 0, 1], [0, 1, 1]])
    training_set_outputs = array([[0, 1, 1, 0]]).T

    # Train the neural network using a training set.
    # Do it 10,000 times and make small adjustments each time.
    neural_network.train(training_set_inputs, training_set_outputs, 10000)

    print "New synaptic weights after training: "
    print neural_network.synaptic_weights

    # Test the neural network with a new situation.
    print "Considering new situation [1, 0, 0] -> ?: "
    print neural_network.think(array([1, 0, 0]))
```
Bài viết được tham khảo tại nguồn ở [đây](http://iamtrask.github.io/2015/07/12/basic-python-network/).
[Link Source Code Here.](https://github.com/miloharper/simple-neural-network)