Từ khi tìm hiểu về Machine Learning, mình luôn thấy các tài liệu hoặc thư viện sử dụng R hoặc python để xây dựng mạng nơ ron. Cho đến một ngày, mình thử search "javascript machine learning framework" trên google, kết quả trả về khiến mình khá ngạc nhiên :open_mouth: 

![](https://images.viblo.asia/1d20983c-e6ae-4ea2-b582-a47d4729c4ce.png)

- *8 Machine Learning JavaScript Frameworks*
- *11 Javascript Machine Learning Libraries To Use In Your App*
- ...

So với python, mình chỉ biết đến các framework về machine learning/deep learning như caffe, tensorflow, keras, scikit-learn, chỉ sau 1 cú search google, quan niệm về Javascript của mình đã hoàn toàn thay đổi. Trong bài viết này, mình sẽ viết ra những gì mình tìm hiểu tại sao một ngôn ngữ chỉ dành để phát triển web  lại có thể sử dụng vào machine learning?

## Tốc độ phát triển "thần thánh" của Javascript trên đa nền tảng

Chúng ta không thể chối cãi được rằng Javascript đang phát triển cực kỳ mạnh mẽ vài năm trở lại đây với sự ra đời của các framework dành cho nhiều nền tảng khác nhau, ví dụ như:
* [react-native](https://facebook.github.io/react-native/) dành cho mobile
* [electronjs](https://electronjs.org/) dành cho ứng dụng desktop
* [tessel](https://tessel.io/) dành cho IoT
* network applications - backend applications - [N o d e . j s](https://nodejs.org/en/)

Javascript không phải chỉ dành cho phát triển web nữa, vậy tại sao chúng ta không dùng javascript vào Machine Learning luôn, có thể javascript cũng có thể dùng để khai báo các thuật toán phức tạp như nó đã và đang làm tốt với đa nền tảng chứ? Đúng như sự phát triển "thần thánh" đó, đã có một vài thư viện xuất hiện giúp chúng ta có thể tạo ra một framework có thể xử lý các thuật toán và tạo ra mạng nơ ron. Các thư viện này khiến việc tính toán của machine learning trở nên hiệu quả bằng cách sử dụng WebGL của browser. Có lẽ đây không phải là ý tưởng tốt nhất để huấn luyện model machine learning! Để giải quyết vấn đề này, một ý tưởng xa mà gần được đưa ra: sử dụng các model machine learning **ĐÃ ĐƯỢC HUẤN LUYỆN** trên trình duyệt.

![](https://images.viblo.asia/816a0cbd-65a0-4c12-9282-905d351f6c04.jpg)

## cùng với sự ra đời của WebGL

Thuật toán của machine learning phụ thuộc rất lớn vào performance. Các thuật toán thường sử dụng đến vector để tối ưu về khả năng tính toán của nó, và GPU luôn được sử dụng để thực hiện các thuật toán đó. Chính vì vấn đề này, Javascript không bao giờ được nghĩ đến việc phát triển vào machine learning. Cho đến ngày [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) ra đời, Javascript API này trở nên phổ biến cho GPU thực thi ngay trên browser, nó cũng được tối ưu dành cho một số thư viện javascript machine learning.

![](https://images.viblo.asia/12d63b83-29d5-4b64-bbec-b809e11ce142.jpg)

## kể từ đó, các thư viện Javascript tính toán ra đời.

Như đã đề cập ở trên, ý tưởng 
> *sử dụng các model machine learning **ĐÃ ĐƯỢC HUẤN LUYỆN** trên trình duyệt.*
> 
là ý tưởng khả thi nhất dành cho "native javascript machine learning way". Nhưng tham vọng của con người không dừng lại ở sự trông chờ ăn sẵn này. Javascript cũng là một ngôn ngữ lập trình bậc cao, nó cũng có thể làm được như các ngôn ngữ bậc cao khác.
Ví dụ, ngày xưa machine learning sẽ là:

* **Tính toán/phân tích dữ liệu:** Matlab, Octave, Julia, R
* **Khai phá dữ liệu (Data Mining):** Scala, Java (Hadoop, Spark, Deeplearning4j)

Còn với ngày không xưa lắm, python được sử dụng chính vào machine learning vì python có các thư viện phù hợp, một hệ sinh thái tuyệt vời dành cho nó:

* **Tính toán:** numpy
* **Phân tích dữ liệu:** pandas
* **Data mining:** PySpark
* **Server:** Flask, Django
* **Framework/lib:**
    * Tensorflow (được viết bằng python qua C/C++ engine)
    * Keras
    * Scikit-learn
    * Theano
    * Caffee
    * ... [xem thêm ở đây ](http://stackabuse.com/the-best-machine-learning-libraries-in-python/)

Và ngày nay, bạn cũng có thể sử dụng javascript để train model, sử dụng file model đã train vào mục đích của mình.

* **Tính toán:** math.js, gpu.js
* **Phân tích dữ liệu:** d3.js
* **Server:** node.js
* **Framework:**
     * [TensorFlow.js](https://github.com/tensorflow/tfjs)
     * [Keras.js](https://github.com/transcranial/keras-js)
     * [brain.js](https://github.com/BrainJS/brain.js)
     * [synaptic](https://github.com/cazala/synaptic)
     * [ConvNetJS](https://github.com/karpathy/convnetjs)

Quá trình phát triển của Javascript trong machine learning mới chỉ phát triển vài năm gần đây nhưng sự phát triển của nó rất mạnh mẽ, tất cả các thư viện, framework đều là open source, mỗi giờ đều có contribution bởi cộng đồng trên toàn thế giới. Nếu bạn là một web developer, bạn không phải lo lắng hoặc tự ti rằng Javascript của bạn chỉ dừng lại ở web animation :D.

## Chứng minh trực tiếp cho những gì đã thần thánh hóa JS ở trên về Machine Learning.

#### 1. [FlappyLearning](https://github.com/xviniette/FlappyLearning)
Một neuro-evolution học cách chơi trò chơi Flappy Bird nổi tiếng.

Github: https://github.com/xviniette/FlappyLearning

Demo: https://xviniette.github.io/FlappyLearning/

![](https://images.viblo.asia/19f7f070-2ef9-4855-b794-1717dd70263a.png)

#### 2. Gấu mình có đang giận mình không?
Một neural network mình tự train với gấu của mình, sử dụng [brain.js](https://github.com/BrainJS/brain.js)

Github: https://github.com/nguyenthetoan/demo-ml-js

Demo:

![](https://images.viblo.asia/bbdbb12b-9214-495d-a504-91be4ff0f756.png)

p/s: *rip means <<R.I.P me>>.*