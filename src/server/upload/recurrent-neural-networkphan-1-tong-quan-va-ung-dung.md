Bài viết này dành cho những bạn đã có kiến thức cơ bản về mạng thần kinh Neural Network. Nếu bạn chưa có cái nhìn nào về Neural Network thì hãy tham khảo bài viết tóm tắt kiến thức về Artificial Neural Network của tôi tại [đây](https://viblo.asia/p/tong-quan-ve-artificial-neural-network-1VgZvwYrlAw) hoặc nếu quá khó hiểu thì bạn có thể tham khảo video [này](https://www.youtube.com/watch?v=aircAruvnKk&t=11s).
# Mạng hồi quy RNN
Để có thể hiểu rõ về RNN, trước tiên chúng ta cùng nhìn lại mô hình Neural Network dưới đây:<br><br>
![](https://images.viblo.asia/87b9952d-f8f8-40d0-a9df-15d74c66cb47.gif)<br><br>
Như đã biết thì Neural Network bao gồm 3 phần chính là Input layer, Hidden layer và Output layer, ta có thể thấy là đầu vào và đầu ra của mạng neuron này là độc lập với nhau. Như vậy mô hình này không phù hợp với những bài toán dạng chuỗi như mô tả, hoàn thành câu, ... vì những dự đoán tiếp theo như từ tiếp theo phụ thuộc vào vị trí của nó trong câu và những từ đằng trước nó.<br>
Và như vậy RNN ra đời với ý tưởng chính là sử dụng một bộ nhớ để lưu lại thông tin từ từ những bước tính toán xử lý trước để dựa vào nó có thể đưa ra dự đoán chính xác nhất cho bước dự đoán hiện tại. Nếu các bạn vẫn chưa hiểu gì thì hãy cùng xem mô hình mạng RNN sau và cùng phân tích để hiểu rõ hơn: <br><br>
![](https://images.viblo.asia/4a1049be-e04c-482b-b8f4-775a7bd55c15.png)
<br><br>
Giải thích một chút: Nếu như mạng Neural Network chỉ là input layer $x$ đi qua hidden layer $h$ và cho ra output layer $y$ với ***full connected*** giữa các layer thì trong RNN, các input $x_t$ sẽ được kết hợp với hidden layer $h_{t-1}$ bằng hàm $f_W$ để tính toán ra hidden layer $h_t$ hiện tại và output $y_t$ sẽ được tính ra từ $h_t$, $W$ là tập các trọng số và nó được ở tất cả các cụm, các $L_1,L_2,...,L_t$ là các hàm mất mát sẽ được giải thích sau. Như vậy kết quả từ các quá trình tính toán trước đã được "nhớ" bằng cách kết hợp thêm $h_{t-1}$ tính ra $h_t$ để tăng độ chính xác cho những dự đoán ở hiện tại. Cụ thể quá trình tính toán được viết dưới dạng toán như sau:<br>
$h_t = f_W(h_{t-1}, x_t)$<br>
Hàm $f_W$ chúng ta sẽ xử dụng hàm **tanh**, công thức trên sẽ trở thành :<br><br>
$h_t = tanh(W_{hh}h_{t-1} + W_{xh}x_t)$<br>
$y_t = W_{hy}h_t$<br><br>
Đến đây có 3 thứ mới xuất hiện: $W_{xh}, W_{hh}, W_{hy}$. Đối với mạng NN chỉ sử dụng một ma trận trọng số W duy nhất thì với RNN nó sử dụng 3 ma trận trọng số cho 2 quá trình tính toán: $W_{hh}$ kết hợp với "bộ nhớ trước" $h_{t-1}$ và $W_{xh}$ kết hợp với $x_t$ để tính ra "bộ nhớ của bước hiện tại" $h_t$ từ đó kết hợp với $W_hy$ để tính ra $y_t$.<br>

Ngoài mô hình Many to Many như ta thấy ở trên thì RNN còn rất nhiều dạng khác như sau:
![](https://images.viblo.asia/dfaf8c5f-749f-43ca-ad0a-58f14f3b649f.png)

# Ứng dụng và ví dụ
Để hiểu hơn về mô hình RNN ta lấy một ví dụ sau: Cho tập input x = [h,e,l,o], sử dụng mô hình RNN để tạo ra một từ có nghĩa. Ta sẽ encode các chữ cái dưới dạng [one hot encoding](https://hackernoon.com/what-is-one-hot-encoding-why-and-when-do-you-have-to-use-it-e3c6186d008f).<br>

Và kết quả như sau:
![](https://images.viblo.asia/d51786e2-ba51-42af-9589-77a0036c6a16.png)

Ta thấy kí tự bắt đầu là "h" từ đó ta tìm ra chữ cái tiếp theo có xác suất lớn nhất là "e" và "e" tiếp tục trở thành input vào của cụm tiếp theo,... cứ như vậy cho đến khi tạo thành một từ có nghĩa, trong trường hợp này là từ "hello".<br>

RNN được ứng dụng và thành công ở rất nhiều bài toán, đặc biệt là ở lĩnh vực NLP(xử lý ngôn ngữ tự nhiên). Trên lý thuyết thì đúng là RNN có khả năng nhớ được những tính toán (thông tin) ở trước nó, nhưng mô hình RNN truyền thống không thể nhớ được những bước ở xa do bị mất mát đạo hàm (sẽ được đề cập ở bài sau) nên những thành công của mô hình này chủ yếu đến từ một mô hình cải tiến khác là LSTM (Long Short-Term Memory, sẽ được đề cập ở những bài sau). LSTM về cơ bản cũng giống với RNN truyền thống ngoài việc thêm các cổng tính toán ở hidden layer để quyết định giữ lại các thông tin nào.<br>

Ta sẽ cùng tìm hiểu một số lĩnh vực chính mà RNN cũng như LSTM được ứng dụng.
### Mô hình ngôn ngữ và tự động sinh văn bản
RNN cho phép ta dự đoán xác suất của một từ mới nhờ vào các từ đã biết liền trước nó. Cơ chế này hoạt động giống với ví dụ bên trên, với các đầu ra của cụm này sẽ là đầu vào của cụm tiếp theo cho đến khi ta được một câu hoàn chỉnh. Các input thường được encode dưới dạng 1 vector one hot encoding. Ví dụ với tập dataset gồm 50000 câu ta lấy ra được một dictionary gồm 4000 từ, từ "hot" nằm ở vị trí 128 thì vector one hot của từ "hot" sẽ là một vector gồm 4000 phần tử đều bằng 0 chỉ có duy nhất vị trí 128 bằng 1. Mô hình này này chính là mô hình Many to Many với số lượng đầu ra, đầu vào và lớp ẩn bằng nhau.<br>
Một vài nghiên cứu về lĩnh vực này :<br>
* [Recurrent neural network based language model](http://www.fit.vutbr.cz/research/groups/speech/publi/2010/mikolov_interspeech2010_IS100722.pdf)
* [Extensions of Recurrent neural network based language model](http://www.fit.vutbr.cz/research/groups/speech/publi/2011/mikolov_icassp2011_5528.pdf)
### Dịch máy

Dịch máy giống với mô hình ngôn ngữ ở chỗ  đầu vào của chúng là một chuỗi các từ trong ngôn ngữ cần dịch(ví dụ: tiếng Đức). Ta cần phải dịch các từ đó sang một ngôn ngữ đích(ví dụ: tiếng Anh). Nếu suy nghĩ đơn giản thì nó thật dễ đúng không, chỉ cần ánh xạ từ đó đến nghĩa của từ đó trong database rồi ghép chúng lại với nhau. Nhưng mọi thứ không đơn giản như vậy, vì mỗi từ khi đi cùng một từ trước nó thì nghĩa của nó lại thay đổi, và một từ có rất nhiều nghĩa trong từng hoàn cảnh khác nhau, vậy nên đó là lý do ta cần dùng đến RNN để tạo ra một câu dịch sát cả về nghĩa và văn vẻ. Để làm được vậy thì ta cần phải xem xét và xử lý qua tất cả chuỗi đầu vào. 
![](https://images.viblo.asia/585881f1-0a22-44e9-89dd-9444533ae030.png)
Một số nghiên cứu về dịch máy :
* [A Recursive Recurrent Neural Network for Statistical Machine Translation](http://www.aclweb.org/anthology/P14-1140.pdf)
* [Sequence to Sequence Learning with Neural Networks](http://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural-networks.pdf)
### Nhận dạng giọng nói
Với chuỗi đầu là tín hiệu âm thanh ở dạng sóng âm, chúng ta có thể dự đoán một chuỗi các đoạn ngữ âm cùng với xác suất của chúng.
Một số nghiên cứu về Speech Recognition:
* [Towards End-to-End Speech Recognition with Recurrent Neural Networks](http://www.fit.vutbr.cz/research/groups/speech/publi/2011/mikolov_icassp2011_5528.pdf)
### Mô tả hình ảnh
Trong lĩnh vực này mạng [convolution neural network](https://viblo.asia/p/machine-learning-that-thu-vi-3-tim-kiem-anh-chua-chim-voi-cnn-vyDZOX1xlwj) thường được sử dụng để detect các object có trong ảnh sau đó RNN sẽ sinh ra các câu có nghĩa mô tả bức ảnh đó. Sự kết hợp này mang lại sự hiệu quả đáng kinh ngạc.<br>
![](https://images.viblo.asia/4205f5e9-d298-4a1b-ae8c-2ebbf5d54284.png)
![](https://images.viblo.asia/dc862834-942f-4094-ac43-3a113125ca72.png)
Hình ảnh trên là cách những người thiết kế đã kết hợp mạng CNN [VGG16](https://www.pyimagesearch.com/2017/03/20/imagenet-vggnet-resnet-inception-xception-keras/) (bỏ đi 2 lớp FC-1000 và Softmax) với mạng RNN.<br>
<br>
# Kết luận
Trên đây ta đã có được cái nhìn tổng quan nhất về RNN là gì và nó được ứng dụng như thế nào. Ở phần sau ta sẽ đi vào tìm hiểu về Training cũng như đi trả lời câu hỏi mất mát đạo hàm là gì và vì sao nó lại khiến mạng RNN truyền thống không thể nhớ được những bước ở xa.

# Tham khảo
[Slide lectures 10 khóa Stanford về RNN](http://www.wildml.com/2015/09/recurrent-neural-networks-tutorial-part-1-introduction-to-rnns/)
<br>
[Recurrent Neural Networks Tutorial](http://www.wildml.com/2015/09/recurrent-neural-networks-tutorial-part-1-introduction-to-rnns/) (một series cực hay về RNN tuy hơi khó hiểu nếu mới tìm hiểu)