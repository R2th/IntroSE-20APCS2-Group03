### Introduction
Trong những năm gần đây, **Deep Learning**  đã có những thành tựu quạn trọng. Từ việc phân loại hình ảnh và dịch ngôn ngữ đến chế tạo xe tự lái, tất cả các nhiệm vụ này đều được điều khiển bởi máy tính thay vì nỗ lực của con người. **Deep Learning** đã thâm nhập vào nhiều ngành công nghiệp và đa dạng, và nó tiếp tục phát triển. Vì vậy có thể hiểu được đây là lĩnh vực được rất nhiều người quan. Nhưng bạn nên bắt đầu từ đâu? Bạn nên học gì? Các khái niệm cốt lõi thực sự tạo nên lĩnh vực phức tạp nhưng hấp dẫn này là gì?

Mình rất hào hứng viết ra một loạt các bài báo mà tôi sẽ chia nhỏ các thành phần cơ bản mà mọi người đam mê tìm hiểu sâu nên biết kỹ. Các bài viết này sẽ flow theo khóa học [Deep Learning](https://www.coursera.org/specializations/deep-learning?skipBrowseRedirect=true) trên cousera, và nhiều tài liệu tham khảo khác, mình sẽ viết ở cuối mỗi bài viết.

>Mình sẽ thực hiện theo cách tiếp cận từ dưới lên trong suốt loạt bài này . Chúng ta phải hiểu các khái niệm cơ bản sau đó mới đi sâu vào trong. Cách tiếp cận này đã được chứng minh là rất hữu ích cho mình.

### Prerequisite
 Các kiến thức bạn cần có để học đơn giản hơn bao gồm:
 * Biết cơ bản về lập trình, trong loạt bài viết này mình sẽ dùng ngôn ngữ thông dụng python
 * Các kiến thức về toán như đại số tuyến tính, giải tích, xác xuất thống kê, ...Bạn có thể tham khảo khóa học [này](https://www.coursera.org/specializations/mathematics-machine-learning) 
 * Biết sử dụng các thư viện cơ bản, framwork như: numpy, matplot, ...
 * Có kiến thức nền tảng về machine learning. Các bạn có thể tham khảo tài liệu tiếng việt viết rất chi tiết của anh Tiệp [Machine Learning cơ bản](https://machinelearningcoban.com/2016/12/26/introduce/)


Mình cũng mới tìm hiểu về lĩnh vực **Deep Learning**  này, có gì sai sót, mọi nguời comment để mình biết và rút kinh nghiệm. Nào cùng bắt đâu với bài viết thứ nhất.


Mục tiêu của bài viết này :
* Hiểu được các nhân tố chính thúc đẩy sự phát triển của Deep Learning
* Có thể hiểu cơ bản cách Deep Learning áp dụng cho học có giám sát
* Biết được các mạng thần kinh chính (như CNN và RNN) là gì và khi nào áp dụng chúng ?
### What is a Neural Network?
Hãy bắt đầu với mấu chốt của Deep Learning bằng một câu hỏi  quan trọng: Mạng thần  kinh là gì ?
Hãy bắt đầu bằng một ví dụ chúng ta dự đoán giá nhà ( một bài toán quen thuộc về Linear Regression). Các biến được đưa ra là kích thước của ngôi nhà tính bằng mét vuông và giá của ngôi nhà. Bây giờ giả sử chúng ta có 6 căn nhà. Ta có biểu đồ như sau:
![](https://images.viblo.asia/bb4f498e-6bd5-4f0a-9d25-46fc78401dc6.PNG)

Như ta thấy trục x là kích thước ngôi nhà, trục y biểu diễn giá ngôi nhà. Như trong machine learning, một mô hình hồi quy tuyến tính sẽ có cố vẽ một đường thẳng phụ hợp với dữ liệu đã cho ( sao cho tổng khoảng các giữa các điểm đến đường thẳng là nhỏ nhất):
![](https://images.viblo.asia/16b36fad-7b4e-429b-b220-83fc91ee62ba.png)

Vì vậy, đầu vào x ở đây là kích thước ngôi nhà và đâu ra y là  giá. Bây giờ hãy xem làm thế nào chúng ta có thể giải quyết điều này bằng cách sử dụng một mạng lưới thần kinh đơn giản gồm 1 neuron:
![](https://images.viblo.asia/04d89431-62be-4c00-bd8b-b394e870f8b2.png)
Bạn hãy tưởng tượng nó mô phỏng một neuron trong não của chúng ta, cần có nhiều giá trị đầu vào, ở phần Nucleus chọn thông tin nào đi qua và chuyển thông tin đó đến nuron tiếp theo.

![](https://images.viblo.asia/2b19fa03-a540-4075-8c51-b5c8a7dc8591.jpg)

Cấu trúc neuron trong học máy:

 ![](https://images.viblo.asia/548836c5-56a2-4f76-9224-09bab9eda1a8.jpg)


Ở đây với bài toán dự đoán giá nhà, một nơron sẽ lấy một đầu vào, áp dụng một số hàm kích hoạt (activation) cho nó và tạo ra một đầu ra. Một trong những chức năng kích hoạt được sử dụng phổ biến nhất là ReLU. 
![](https://images.viblo.asia/c9f8f621-dd48-4c20-9023-526a3502af41.png)
RELU lấy max giá trị đầu vào và 0. Vì vấy nếu đầu vào là 10 thì đầu ra là 10, nếu đầu vào là -10 đầu ra sẽ là 0.  Chúng ta sẽ thảo luận chi tiết về các hàm kích hoạt (activation) trong các bài viết sau. Bây giờ bán váo  ví dụ đã cho, nếu áp dụng hàm RELU vào dự đoán giá nhà, thì cách dự đoán có thể như sau:
    ![](https://images.viblo.asia/a5f9e43f-e571-489d-b699-8db16f5d4633.png)
 
 
 Trong ví dụ trên ta thấy mạng thần kinh có 1 neuron duy nhất, tức là chúng ta chỉ có một tính năng (feature) là kích thước nhà để dự đoán giá nhà. Nhưng trong thực tế chúng ta phải dựa trên nhiều tính năng như số phòng, quy mô gia đình, vị trí khu phố, ... Làm thế nào chúng ta có thể định nghĩa một mạng thần kinh trong trường hợp này ?
 ![](https://images.viblo.asia/7c9f16e0-4575-4094-bfb8-67315d3f4691.png)
 
 Từ ví dụ hình trên, chúng ta chuyển 4 tính năng làm đầu vào cho mạng thần kinh là x, nó tự động xác định một số tính năng ẩn từ đầu vào và cuối cùng tạo ra đầu ra y. Đây là cách một mạng thần kinh có 4 đầu vào và đầu ra với một lớp ẩn duy nhất:
 ![](https://images.viblo.asia/6e5f561f-472a-42a1-b702-f2667f10b3be.png)
 
 Vậy ta đã có cái nhìn tổng quát về 1 mạng lưới thần kinh, giờ chúng ta sẽ xem những ứng dụng chính của nó trong các bài toán học tập có giám sát. Nhắc lại kiến thức thì, Supervised learning là thuật toán dự đoán đầu ra (outcome) của một dữ liệu mới (new input) dựa trên các cặp (input, outcome) đã biết từ trước. Cặp dữ liệu này còn được gọi là (data, label), tức (dữ liệu, nhãn).
###  Supervised Learning with Neural Networks

Dưới đây là một bảng khá tiện dụng để xem xét các ứng dụng khác nhau của việc học có giám sát và các loại mạng thần kinh khác nhau có thể được sử dụng để giải quyết các vấn đề trong cuộc sống.

|  Đầu vào (X) | Đầu ra (y) | Ứng dụng | Loại mạng thần kinh|
| -------- | -------- | -------- |-------- |
| Tính năng nhà     | Giá bán     |  Mua bán nhà đất     | Mạng thần kinh tiêu chuẩn     |
| Thư điện tử     | Có phải Spam không     | Phân loại thư    | Mạng thần kinh tiêu chuẩn  |
| Hình ảnh     | Lớp hình ảnh     | gắn ảnh thẻ      | CNN     |
| Âm thanh     | văn bản     | Nhận dạng giọng nói     | RNN     |
| Tiến Anh     | Tiếng Việt     | Máy dịch     | RNN     |
| Hình ảnh, Radar info     | Vị trí xe     | Xe tự lái     | Mix các mạng thần kinh     |

![ ](https://images.viblo.asia/394f66fa-7d4b-43fa-999f-9e4059067b50.png)
Bên trên là đại diện cho các dạng mạng thần kinh thường dùng, nhưng trong các bài viết đầu mình sẽ tập trung vào mạng thần kinh tiêu chuẩn, các bài viết sẽ nâng cao hơn tìm hiểu vê CNN và RNN. Như bạn có thể nhận thấy, việc học có giám sát có thể được sử dụng trên cả dữ liệu có cấu trúc và không cấu trúc.

Trong ví dụ dự đoán giá nhà, dữ liệu cho cho chúng ta biết kích thước và số phòng ngủ. Đây là dữ liệu có cấu trúc, có nghĩa là mỗi tính năng, chẳng hạn như kích thước của ngôi nhà, số phòng ngủ,... có một ý nghĩa được xác định rất rõ.

Ngược lại, dữ liệu phi cấu trúc đề cập đến như âm thanh, âm thanh thô hoặc hình ảnh mà bạn có thể muốn nhận ra cái gì đó trong hình ảnh hoặc văn bản (như phát hiện đối tượng). Ở đây, các tính năng có thể là các giá trị pixel trong một hình ảnh hoặc các từ riêng lẻ trong một đoạn văn bản. Nó không thực sự rõ ràng, đây là các dữ liệu không có cấu trúc.

Các thuật toán học máy đơn giản hoạt động tốt với dữ liệu có cấu trúc. Nhưng khi nói đến dữ liệu phi cấu trúc, hiệu suất của chúng có xu hướng giảm đi khá nhiều. Đây là lúc các mạng lưới thần kinh được chứng minh là rất hiệu quả và hữu ích. Chúng thực hiện đặc biệt tốt trên dữ liệu phi cấu trúc. Hầu hết các nghiên cứu đột phá ngày nay đều có mạng lưới thần kinh là cốt lõi.
### Why is Deep Learning Taking off?
Để hiểu điều này, chúng ta nhìn vào đồ thị sau:
![](https://images.viblo.asia/390b5004-5311-451d-b868-f7dae4a32867.PNG)

Khi lượng dữ liệu tăng lên, hiệu suất của các thuật toán học tập truyền thống, như SVM và hồi quy logistic, không cải thiện được nhiều. Trong thực tế, nó có xu hướng cao nguyên sau một điểm nhất định. Trong trường hợp mạng thần kinh, hiệu suất của mô hình tăng lên cùng với sự gia tăng dữ liệu bạn cung cấp cho mô hình.
Về cơ bản, ba yếu tố thúc đẩy sự phát triển Deep Learning là:
* Data
* Thời gian tính toán
* Các thuật toán
### Reference
* Tuần 1 khóa học [Nerual Network and Deep Learning](https://www.coursera.org/learn/neural-networks-deep-learning?)
* https://machinelearningcoban.com/2016/12/27/categories/
### Kết
Bài viết đầu tiên đã cho chúng ta về cái nhìn tổng quát về Deep Learning và mạng nơron, trong bài tiếp theo mình sẽ đi sâu về những điều cơ bản của mạng thần kình và giải quyết bài toán hồi quy logistic bằng mạng thần kinh. Hẹn gặp lại các bạn trong các bài tiếp theo.:laughing: