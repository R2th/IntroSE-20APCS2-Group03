Gần đây chúng ta hay thấy văng vẳng bên tai từ khoá AI. Với sự phát triển của công nghệ, AI có thể làm thay chúng ta những công việc hiện tại mà ta đang làm, khiến chúng ta trở nên dần nhàn hơn.

Việc phát triển nhanh của AI làm cho kỹ thuật đi sâu và gắn liền với đời sống sinh hoạt của con người. Ví dụ như  smart phone or máy tính, máy hút bụi trong ô tô, hay tủ lạnh. Tất cả đều dã được tích hợp AI, gắn liền mật thiết với những gì xung quanh ta. 

Vậy chắc hẳn sẽ có những cá nhân có hứng thú với AI, muốn trở thành 1 kỹ sư AI phải không.  Nói thường hay hơn làm, để hiểu và nắm bắt một cách nhanh nhất, có lẽ ko gì bằng thực tiễn sờ chạm, tạo ra nó như thế nào. Nhưng vấn đề mắc phải ở đây, đó là nên bắt đầu từ đâu, và làm nó như thế nào. Không ít người sẽ dừng lại và hết duyên với AI ở giai đoạn này. 

Vì vậy bài viết này được tạo ra với mục đích truyền tải cách tạo ra AI một cách đơn giản nhất. Cùng nhau đi tìm cách một simple AI được tạo ra như thế nào.

# 1. Mối quan hệ giữa trí tuệ nhân tạo và Python. 

![](https://images.viblo.asia/a83319ac-77f2-4f46-bd06-55914711c112.jpg)
Đầu tiên, AI là cụm từ rút gọn của Artificial Intellihence. Là kỹ thuật tiến hành bởi máy tính nhắm thay thế con người về lý giải ngôn ngữ, dự đoán, giải quyết vấn đề ....

POINT:
Machine learning được biết đến như là cở sở của kỹ thuật AI. Máy tính thông qua việc thống kê lượng data lớn, phán đoán nhằm hướng tới việc huẩn luyện để có thể thao tác một hoặc nhiều nhiệm vụ nào đó.Có nhiều ngôn ngữ có thể sử dụng trong  machine learning, nhưng được sử dụng nhiều nhất không thể không nhắc tới Python. 

Trên thực tế có rất nhiểu đơn vị lựa chọn Python để phát triển, như service của Instagram, YouTube. Vậy tai sao Python lại được sử 
rộng rãi trong machine learning. So với những ngôn ngữ khác, thì Python cần ít số lượng code hơn, ngôn ngữ đơn giản, dễ hiểu, dễ viết code. Hơn nữa có rất nhiều những package tập hợp nhiều lib sử dụng trong việc tính toán và trong machine learning. Chính vì thế  với những người mới về programming cũng có thể hiểu và phát triển một cách nhanh chóng. Đây chính là một trong những ma lực của Python.

# 2. Muốn tạo AI, cần phải chuẩn bị những gì, env như thế nào. 

![](https://images.viblo.asia/140fda62-a839-423c-b53b-5c15f033cf45.jpg)
**2.1 Những tool tiện lợi trong quá trình phát triển AI**

Anaconda : Tập hợp rất nhiều tool tiện lợi trong quá trình phát triển machine learning và data science. 
Bao gồm cả môi trường phát triển với Python, và các tool editer. Có thể install các tool cần thiết từ **Anaconda**. 

* Lợi ích của Anaconda:
* Dễ dàng tải 1500+ packages về Python/R cho data science
* Quản lý thư viện, môi trường và dependency giữa các thư viện dễ dàng
* Dễ dàng phát triển mô hình machine learning và deep learning với scikit-learn, tensorflow, keras
* Xử lý dữ liệu tốc độ cao với numpy, pandas
* Hiện thị kết quả với Matplotlib, Bokeh

**2.2 Library sử dụng trong machine learning**

TensorFlow chính là thư viện mã nguồn mở cho machine learning nổi tiếng nhất thế giới, được phát triển bởi các nhà nghiên cứu từ Google. Việc hỗ trợ mạnh mẽ các phép toán học để tính toán trong machine learning và deep learning đã giúp việc tiếp cận các bài toán trở nên đơn giản, nhanh chóng và tiện lợi hơn nhiều.

Các hàm được dựng sẵn trong thư viện cho từng bài toán cho phép TensorFlow xây dựng được nhiều neural network. Nó còn cho phép bạn tính toán song song trên nhiều máy tính khác nhau, thậm chí trên nhiều CPU, GPU trong cùng 1 máy hay tạo ra các dataflow graph – đồ thị luồng dữ liệu để dựng nên các model. Nếu bạn muốn chọn con đường sự nghiệp trong lĩnh vực A.I. này, nắm rõ những điều cơ bản của TensorFlow thực sự rất quan trọng.

Được viết bằng C++ và thao tác interface bằng Python nên phần performance của TensorFlow cực kỳ tốt. Đối tượng sử dụng nó cũng đa dạng không kém: từ các nhà nghiên cứu, nhà khoa học dữ liệu và dĩ nhiên không thể thiếu các lập trình viên.

# 3. List software sử dụng để tạo ra AI. 

Đến đây chúng ta đã nắm được phần nào về cách phát triển AI thông qua các tool, lib... . Vậy liệu có phầm mềm nào giúp chúng ra trong việc ạo AI hay không ? Chắc hẳn không ít người thắc mắc câu hỏi này. 
Tuỳ theo việc phát tiển theo các lĩnh vực khác nhau. Chúng tôi xin phép giói thiệu một số Web service tiện lợi dưới đây. 

**3.1 AutoML tiện lợi trong việc tạo model**

Model được ví như đầu não trong AI . Ứng với việc input data nguồn sẽ xuất ra câu trả lời tương ứng. 
AutoML là web service được Google cung cấp, bạn không cần có kiến thức về machine learning. Chỉ với lượng data cần tiết, có thể hoàn toàn tự động tạo  model machine learning. 

**3.2 Neural Network Console**

Neural Network Console là môi trường tích hợp có thể tạo ra các program Deep learning được cung cấp bởi Sony. 
Một ví dụ về  Deep learning: 
Chúng ta đang muốn học sâu hơn về đối tượng "con mèo đen". Thì khi tiến hành học sâu sẽ là, nhìn con mèo đen ở trong bóng tối thì màu sắc sẽ khác con mèo đen ở nơi có ánh sáng. Mặc dù cùng là con mèo đen. Vì vậy cần phải thiết lập sao cho, độ ưu tiên liên quan đến màu sắc của con mèo ở những vùng ánh sáng khác nhau để model sẽ hiểu rõ và phân biệt một cách chính xác hơn. Đây là một ví dụ nói về  mối liên hệ giữa thông tin với thông tin With neural network. 

**3.3 AI maker** 

Là một flatform mà khi sử dụng nó ai cũng có thể phát triển machine learning một cách nhẹ nhàng. 
Bạn có thể tìm hiểu sâu hơn tại : 
https://aimaker.io/

**Tựu lại**

① Để tạo ra AI có thể hình dung gồm 3 công đoạn sau đây: 

② Chuẩn bị lượng data lớn để tiến hành cho learning. 

③ Tiến hành train model bởi machine learning

④ Đặt câu hỏi với  train model và đưa ra kết qủa. 

Nguồn lượm lặt : 

https://aizine.ai/ai-development0117/
https://topdev.vn/blog/tensorflow-la-gi/
https://livestream.vn/anaconda-python-la-gi-yeu-cau-phan-cung-va-phan-mem/