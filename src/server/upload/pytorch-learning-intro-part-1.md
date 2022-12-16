Xin chào mọi người, chào mừng đến với Serie học Pytorch của mình. Mình chỉ là 1 người đam mê đơn thuần với trí tuệ nhân tạo, đang cố gắng học hỏi để sau này có thể trở thành 1 kĩ sư trí tuệ nhân tạo thực sự giỏi. 
![Deep Learning with PyTorch](https://images.viblo.asia/54c828ff-208c-4ff0-9877-5b9893826e36.png)

Với những ai bắt đầu với lĩnh vực này, mình nghĩ hãy dành cho mình khoảng 3, 4 tháng để theo các bài trong trang web https://machinelearningcoban.com/ để ít nhất hiểu được thế nào là AI và machine learning. Sau đó hãy follow khóa [cs231n](http://cs231n.stanford.edu/2017/) có cả video bài giảng để nắm được thêm về deep learning. Sau đó chúng ta sẽ đi vào Serie của mình.

Serie này chủ yếu hướng dẫn cách sử dụng công cụ Pytorch, một thư viện giúp chúng ta dễ dàng triển khai các thuật toán deep learning 1 cách dễ dàng, và hơn thế nữa, tạo ra các sản phẩm AI hữu ích. Quyển sách mà mình sử dụng để học là quyển [Deep Learning with PyTorch](https://pytorch.org/deep-learning-with-pytorch), ai muốn đọc tiếng Anh có thể dùng trực tiếp hoặc lên trang chủ có [tutorials](https://pytorch.org/tutorials/) giúp thuận tiện học hơn. Oke, vậy chúng ta hãy đi vào tìm hiểu xem Pytorch là gì đã nhé. 

## 1. Pytorch là gì?
**Định nghĩa** trong sách giáo khoa thì ghi là: **Pytorch** là 1 **thư viện** cho ngôn ngữ **Python**, tạo điều kiện cho việc xây dựng các dự án **deep learning** (À quên để dùng đc Pytorch thì bạn ít nhất phải biết lập trình và biết qua 1 chút cách sử dụng python nhé). 

Với việc sử dụng Pytorch thì bạn sẽ dễ dàng xây dựng các mô hình hơn, chạy huấn luyện và thử nghiệm mô hình vô cùng dễ dàng. Tuy nhiên công việc này thì rất nhiều những thư viện, framework khác cx có thể làm được, ví dụ như: tensorflow, mxnet, Theano(dead)... **Vậy tại sao chúng ta lại học Pytorch?**

Theo quyển sách mình đọc ở trên thì tác giả nói rằng:
- Pytorch cực kì đơn giản. Điều này được công nhân bởi rất nhiều nhà nghiên cứu cũng như những lập trình viên, nó dễ dàng để học, sử dụng, mở rộng và debug. 
- Pytorch đưa ra cho chúng ta kiểu dữ liệu Tensor, Tensor này có thể giữ trong nó các kiểu dữ liệu như numbers, vectors, matrices, arrays. Với Tensor thì ta có thể sử dụng các loại phép tính như sử dụng Python 1 cách thông thường (hoặc giống như [NumPy](https://numpy.org/), nếu ko biết cái này làm ơn quay lại đọc qua khóa ML cơ bản và cs231n nhé =)) )
- Pytorch cũng giúp ta có thể sử dụng GPU và CPU cho việc tính toán (GPU có thể tăng tốc việc tính toán khoảng hơn 50 lần đấy, nên đừng có đùa), đồng thời có hỗ trợ tối ưu hóa các phép toán trên số (cho ngay cả các phép toán cơ bản.
- Và cuối cùng, Pytorch với phần core sử dụng c++, cũng giúp tăng tốc thời gian chạy thực tế lên rất nhiều, giúp cho việc triển khai trên production khả thi hơn.

Nhìn vào các ý trên các bạn cũng có thể thấy là các framework khác như tensorflow đều có thể làm được.

 Đúng vậy, nhưng với bản thân mình, mình chọn Pytorch vì nó cực kì dễ dàng để đọc và dễ để bắt đầu hơn. Syntax trong Pytorch cũng hoàn toàn giống như chúng ta sử dụng Python vậy. Với Tensorflow, mọi thứ phức tạp hơn chút với cơ chế computation (tính toán) của nó, khiến nhiều lúc việc đọc cũng như debug code gây đôi chút bối rối.
##  2. Pytorch làm được những gì?
Để trả lời được câu hỏi này, chúng ta hãy tính xem Pytorch làm được những gì với 1 dự án về học máy hay học sâu:

- Mặc dù là thư viện cho python, nhưng phần lớn Pytorch được viết bằng C++ và CUDA (2 thứ sức mạnh nhất nhì về tốc độ và khả năng tương thích tính toán), với cơ chế parallelism trên GPUs. Kèm với đó, Pytorch cung cấp khả năng chạy trực tiếp từ C++ hỗ trợ tốc độ cho việc deploy (triển khai) model trên production (sản phẩm). 
- Pytorch cũng tương thích với bất kì thư viện python nào khác, chúng ta có thể sử dụng kết hợp mà ko cần lo lắng.
- Pytorch cung cấp mảng nhiều chiều Tensors, hỗ trợ nhiều kiểu dự liệu, các phép toán trên tensor có thể tính toán trên cả CPU lẫn GPU và có thể chuyển đổi qua lại. 
- Điều mạnh hơn nữa là engine autograd của Pytorch đi kèm trong Tensors giúp ta tracking được vi phân của bất kì output nào theo bất kì input tương ứng. Việc này cực kỳ hữu ích nếu ta muốn sử dụng những kĩ thuật để phân tích các lớp trong mạng học sâu (các phương pháp như [GradCAM](https://arxiv.org/pdf/1610.02391.pdf) hoặc [CAM](https://arxiv.org/pdf/1512.04150.pdf) rất cần điều này)
- Pytorch cũng cung cấp sẵn 1 lượng tương đối các model và pretrained của nó. Ta hoàn toàn có thể sử dụng cho việc tuning hoặc khởi tạo trọng số.
- Hiện nay thì cũng có rất nhiều ecosystem hỗ trợ của Pytorch cho việc tracking quá trình build và train mô hình, tối ưu mô hình, deploy mô hình (JIT, Torchscript, ONNX). Hơn nữa, ra mắt vào năm 2020 là sự kết hợp của [TorchServe](https://pytorch.org/serve/) và AWS để đối đầu với [Tensorflow Serving](https://www.tensorflow.org/tfx/guide/serving) của Google hứa hẹn sẽ đem lại sức mạnh vô cùng lớn với Pytorch đối với cộng đồng.

![Deep Learning with PyTorch](https://images.viblo.asia/829b51ec-3688-4544-8b2e-bd80c8d66531.png)

Một dự án học máy triển khai với Pytorch đơn giản sẽ trông như hình trên, với quy trình không quá phức tạp, tuy nhiên đi sâu vào thì mỗi bài toán lại có cách triển khai khác nhau riêng, cái này chúng ta sẽ đề cập ở những phần sắp tới nhé.

## 3. Tổng kết.
Ở phần này mình giới thiệu qua chút về thư viện Pytorch cho deeplearning. Về phần cài đặt, mình sẽ không giới thiệu ở đây do trang chủ đã giới thiệu cực kỳ chi tiết rồi, các bạn có thể tham khảo ở https://pytorch.org/get-started/locally. Ở bài sau, chúng ta sẽ đến với Tensor, nơi tình yêu bắt đầu, thứ làm nên sức mạnh để phát triển các dự án deeplearning. Cảm ơn mọi người đã đọc bài viết, có gì thắc mắc hoặc không hợp lý comment phía dưới để mình biết nữa nhé.