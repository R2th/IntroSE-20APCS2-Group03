# Abstract 
Chào các bạn, hôm nay chủ đề mình đưa ra khá là chung chung. Tuy nhiên, theo góc nhìn của một đứa cũng chậm chững bước chân vào lĩnh vực này thì mình thấy nội dung này khá cần thiết để giúp các bạn tiếp cận và hiểu hơn về Machine Learning cũng như workflow của Machine Learning 

Bài viết này mình có công như là phiên dịch của Machine Learning Roadmap (2020), thêm vào đó là các nội dung bổ sung, kinh nghiệm của mình trong quá trình học tập và làm việc. À, bài viết của mình chủ yếu đưa ra các từ khóa chứ không phân tích sâu để các bạn nếu muốn đi sâu hơn thì có thể tìm kiếm các từ khóa đó nhé.

Bài viết được lấy cảm hứng từ bài chia sẻ bổ ích của một bạn trong nhóm Machine Learning cơ bản https://www.facebook.com/vefacademy/photos/a.1010757529668990/1013281886083221/

Chúc mọi người có những phút giây đọc thật thư giãn!

**Machine Leanring Process:** Gồm các phần lớn sau
1. Data Collection
2. Data Preparation
3. Train model
4.  Analysis – Evaluation 

Giới thiệu qua vậy thôi, cùng đi sâu vào từng phần để hiểu rõ hơn nhé

## I. Data Collection
### 1. Yêu cầu
* Loại vấn đề cần giải quyết là gì?
* Nguồn dữ liệu (data) có tồn tại hay không?
* Về quyền riêng tư của dữ liệu? Data public? Các vấn đề phát sinh?
* Nên lưu trữ dữ liệu ở đâu?

### 2. Kiểu dữ liệu
**Dữ liệu có cấu trúc (Structured Data)**: Xuất hiện dạng bảng, có nhiều kiểu dữ liệu khác nhau
* Nomical/Categorical
* Numerical
* Ordinal 
* Time series 

**Dữ liệu không có cấu trúc (Unstructured Data)**: ví dụ như ảnh, video, văn bản ngôn ngữ tự nhiên, giọng nói, …

## II. Data Preparation 
### 1. Phân tích dữ liệu, hiểu về dữ liệu mình đang làm việc cùng
* Đặc điểm dữ liệu đầu vào? Mục tiêu đầu ra là gì?
* Loại dữ liệu làm việc cùng? (Structured, Unstructured, …)
* Có tồn tại các giá trị bị mất? (Cái này mình hay gặp khá nhiều, dữ liệu ở một số vị trí bị thiếu) Hướng giải quyết? (Loại bỏ, sửa, thêm, …)
* Có xuất hiện các ngoại lai (outliers) không? Chúng thường xuất hiện ở đâu? Có nhiều không? Tỷ lệ thế nào với toàn bộ tập dữ liệu?
### 2. Tiền xử lý để đưa dữ liệu vào mô hình
Tùy bài toán mà việc tiền xử lý dữ liệu sẽ khác nhau, chúng ta không thể áp dụng tiền xử lý ảnh cho tiền xử lý tự nhiên được :)

Dưới đây là một vài nội dung khái quát của việc tiện xử lý dữ liệu:

* Xử lý dữ liệu bị thiếu:
    * Tính trung bình cột để dùng cho ô bị thiếu, mô hình hóa các giá trị còn thiếu, ...
    * Sử dụng K-Nearest Neighbors (K-NN), Random Imputation, Sliding Window, …
* Feature Encoding (Nên nhớ mô hình của chúng ta chỉ hiểu các dữ liệu dạng số, dù đầu vào có là text, hình ảnh hay âm thanh thì chúng ta đều cần phải chuyển đổi về dạng số)
    * One-hot encoding
    * Label Encoder
    * Embedding Encoder
* Feature Normalization: Thử hình dung dữ liệu đầu vào của bạn gồm đủ thứ như giá nhà, diện tích, số phòng ngủ, số tầng, … mà mỗi trường đó lại có vùng giá trị khác nhau, trường thì chỉ là 3, 4, 5 (tầng), có trường lại lên tới 100, 1000 (diện tích) vậy nên việc chuẩn hóa là vô cùng quan trọng. Trong phần này sẽ có 2 từ khóa chính là Scaling và Standardization 
    * Feature Scaling: đơn giản là ta sẽ đưa các giá trị về thuộc khoảng [0, 1] bằng cách tìm ra min, max đối với từng trường dữ liệu, rồi chuẩn hóa. Tất nhiên các bạn phải hiểu 0.3 của trường dữ liệu này khác và không liên quan tới 0.3 của trường dữ liệu khác (ví dụ số phòng với giá nhà chẳng hạn)
    * Feature Standardization: Chuẩn hóa để các giá trị có giá trị trung bình bằng 0 và phương sai đơn vị. Nó tính bằng cách trừ giá trị trung bình và chia cho độ lệch chuẩn của một đặc trưng cụ thể. Với phương pháp này thì giá trị có thể không thuộc [0, 1]. Điều này giúp phương pháp mạnh mẽ đối với vấn đề ngoại lai
* Feature Engineering: Biến đổi dữ liệu thành có ý nghĩa đại diện hơn. Dữ liệu ban đầu bạn có chỉ là dữ liệu thô, chưa xử lý. Một số kĩ thuật có thể kế tới như:
    * Decompose: ví dụ với thông tin 03-02-2021 ta có thể phân rã ra các thông tin như ngày nào, ngày bao nhiêu của năm, ngày bao nhiêu của tuần, thứ mấy, …
    * Discretization: Các bạn có thể hiểu là gom nhóm, tùy vào mục đích bài toán. Ví dụ với giá trị tuổi tác, ta có thể chuyển từ các con số cụ thể hay nhóm nhỏ thành nhóm lớn hơn, từ 20-40, hay dưới 50, …
    * Crossing and Interaction features: ta sẽ combine các features lạiđể tạo ra một feature mới 
    * Indicator features: Sử dụng các thành phần của dữ liệu để chỉ ra một số thứ có thể quan trọng
    * Feature selection: Chạy những features có giá trị nhất trong dataset để sử dụng cho model (Điều này có thể giúp model giảm overfitting, giảm thời gian training, tăng accuracy, giảm số chiều dữ liệu, …)
    * Dealing with imbalance: Trong bài toán ML thì sẽ không ít lần chúng ta gặp vấn đề mất cân bằng dữ liệu (ví dụ class A có 100 ảnh, class non-A có 100.000 ảnh). Một số giải pháp đưa ra:
        * Thu thập thêm dữ liệu
        * Sử dụng scikit-learn-contrib imbalance-learn package, một thư viện của python giúp hỗ trợ giải quyết vấn đề imbalance data 
        * Tham khảo một số bài báo về giải quyết vấn đề imbalance để hiểu kĩ thuật xử lý của họ. Ví dụ như sử dụng một hàm loss có tên là Focal Loss
### 3. Data Splitting 
Thông thường sẽ chia tập dataset làm 3 phần chính:
* Training set (70-80%): Đây là phần dữ liệu mô hình sẽ sử dụng để học, điều chỉnh các parameters 
* Validation set (10-15%): Phần dữ liệu sẽ giúp chúng ta điều chỉnh các hyper-parameters để mô hình tốt hơn, tránh các vấn đề overfitting. Phần dữ liệu này giống như một bài kiểm tra 15’, kiểm tra trong từng bước học của bạn xem bạn có học tốt thật không hay học vẹt 
* Test set (10-15%): Phần dữ liệu này sẽ dùng để đánh giá mô hình, không sử dụng để tuning model. Phần dữ liệu này có thể coi là thi cuối kì, đánh giá tổng thể quá trình học.
## III. Training model on data 
### 1. Chọn thuật toán phù hợp
* Supervised Algorithms:
    * Linear regression
    * Logistic regression
    * K-Nearest Neighbors
    * Support Vector Machines
    * Decision Trees – Random Forests
    * AdaBoost/Gradient Boosting Machines
    * Neural Network 
        * Convolutional neural networks
        * Recurrent neural networks
        * Transformer networks
* Unsupervised Algorithms:
    * Clustering
    * Visualization and dimensionality reduction
        * Principal Component Analysis (PCA)
        * Autoencoders
        * T-Distributed Stochastic Neighbor Embedding (t-SNE)
    * An anomaly detection
        * Autoencoder
        * One-class classification
### 2. Lựa chọn cách học cho model 
* Batch learning: Tất cả data tồn tại trong một “big static warehouse”, cần train model với nó (Data warehouse được hiểu là một kĩ thuật thu thập và quản lý dữ liệu từ nhiều nguồn khác nhau để cung cấp những hiểu biết nghiệp vụ có ý nghĩa, nó là bộ lưu trữ điện tử lưu trữ một số lượng lớn thông tin, được thiết kế để truy vấn và phân tích, thay vì xử lý giao dịch. Data warehouse – cơ sở dữ liệu hỗ trợ ra quyết định – nó là một môi trường, không phải sản phẩm)
* Online learning: Data được update liên tục, model train liên tục trên nó, quá trình training nhanh, rẻ.
* Transfer learning: Lấy kiến thức từ một pretrain model và sử dụng nó, kết hợp với một phần mạng của mình. Các bạn có thể tham khảo thêm về Tranfer learning qua một bài viết của mình ở [đây](https://viblo.asia/p/transfer-learning-va-bai-toan-face-recognition-3Q75w7xD5Wb ) 
* Active learning: hay còn được gọi là “Human in the loop” learning. Con người tương tác với mô hình, cung cấp các cập nhật với labels, với những samples mà model không chắc chắn về nó
* Ensembling: Không hẳn là một dạng learning, nó gộp nhiều thuật toán đã được học để cho ra một kết quả tốt
### 3. Vấn đề Underfitting
* Xảy ra khi model không biểu diễn được đặc trưng của dữ liệu, bạn có thể hiểu ví dụ như mô hình quá phức tạp, nhưng dữ liệu quá nhỏ, tất nhiên các parameters sẽ không được điều chỉnh tốt để phục vụ bài toán
* Có thể thử một số cách sau để giải quyết vấn đề Underfitting:
    * Training lâu hơn
    * Thêm dữ liệu
    * Chỉnh sửa lại mô hình
### 4. Vấn đề Overfitting
* Cách dễ nhất để nhận biết vấn đề Overfitting đó là khi bạn training với tập training set và validation set, đến một epoch nào đó, train-loss vẫn giảm nhưng validation-loss bắt đầu tăng thì đó chính là một biểu hiện của overfitting. Hay khi bạn huấn luyện mô hình tốt trên training set (ví dụ accuracy đạt 99%) tuy nhiên vô cùng tệ trên tập test.
* Có thể giải quyết vấn đề Overfitting này qua một số cách sau:
    * Sử dụng L1, L2 regularization 
    * Sử dụng Dropout
    * Kĩ thuật Early stopping
    * Sử dụng Data Augmentation (sinh thêm dữ liệu từ dữ liệu gốc bằn một vài phép biến đổi)
    * Sử dụng Batch normalization 
### 5. Hyperparameter tuning
* Trước hết mình nghĩ các bạn cần phân biệt rõ parameter – hyperparameter. Các bạn có thể tham khảo ở [đây](https://viblo.asia/p/mot-vai-hieu-nham-khi-moi-hoc-machine-learning-4dbZNoDnlYM)
* Một số vấn đề liên quan tới hyperparameter tuning:
    * Cài đặt learning rate: Thông thường, learning rate cao thì thuật toán thích nghi nhanh chóng với dữ liệu mới, tuy nhiên có thể xảy ra vấn đề không hội tụ vì dao động quanh điểm Global minimum. Còn Learning rate thấp thì thuật toán thích nghi chậm với dữ liệu mới và mất khá nhiều thời gian để hội tụ. Tùy từng bài toán và kết quả sau training mà các bạn sẽ điều chỉnh cho phù hợp. Thông thường mình hay sử dụng learning rate là 1e-2 hoặc 1e-3
    * Bạn đọc có thể tham khảo một paper khá nổi tiếng về vấn đề này: [A disciplined approach to neural network hyperparameter](https://arxiv.org/pdf/1803.09820.pdf ) 
    * Bên cạnh đó, có thể tuning một số hyperparameter khác:
        * Số layers (trong Neural network)
        * Batch size
        * Số cây (trong Decision tree)
        * Số bước lặp
        * …
## IV. Analysis/Evaluation 
### 1. Evaluation metrics
* Mình đã có một bài viết cụ thể về các Evaluation metrics ở [đây](https://viblo.asia/p/danh-gia-cac-mo-hinh-hoc-may-RnB5pp4D5PG), các bạn có thể tham khảo thêm để hiểu rõ hơn. 
### 2. Feature importance
* Features nào mang thuộc tính quan trọng nhất trong model?
* Có nên loại bỏ một số features để giúp mô hình “nhẹ” hơn, tốt hơn? Tại sao loại bỏ feature đó? So sánh kết quả khi sử dụng và loại bỏ các features đó?
### 3. Training/Inference time, cost
* Model train mất bao lâu? Model Predict mất bao lâu? Có khả thi với bài toán áp dụng?
* Cấu hình phần cứng áp dụng?
### 4. Comparing to other models
* So sánh với các model khác cùng doimain, kết quả tốt hơn hay kém hơn? Nguyên nhân? Do data hay do mô hình?
### 5. Server mode (deploying a model)
* Sử dụng model trong sản phẩm: Nghiên cứu khác thực tế 😊)). Có thể trên nghiên cứ thì mô hình này đạt kết quả cao, tuy nhiên đưa ra thực tế sản phẩm thì chưa chắc. Nên nhớ con đường đi từ nghiên cứu ra thực tế không phải đơn giản.
* Một vài tools có thể sử dụng:
    * Tensorflow serving 
    * Pytorch serving 
    * Google AI Platform 
    * Sagemaker 
* MLOps: Nơi mà software engineering gặp Machine learning.
### 6. Retrain model
* Hiệu suất model sau khi serving?
* Model sẽ dần “ngố” khi mà dữ liệu liên tục được update. Vì vậy cần retrain model.
# Summary
Bài viết của mình đến đây là hết rồi. Bài viết chủ yếu đưa ra một Roadmap về Machine Learning, giúp các bạn mới đỡ bỡ ngỡ, dễ tiếp cận hơn. Bài viết chủ yếu đưa ra các từ khóa giúp các bạn tra cứu nhanh hơn. Trong các bài viết sau mình sẽ cố gắng đi sâu vào các vấn đề hơn.
Cảm ơn các bạn đã đọc đến cuối bài viết. Chúc mọi người cuối tuần vui vẻ! ^^

# References 
[Machine Learning Roadmap (2020)](https://whimsical.com/machine-learning-roadmap-2020-CA7f3ykvXpnJ9Az32vYXva?fbclid=IwAR1nGRPFISiS1d6nEj4EngcZPa811YgJtydaF9rh5EBsZj9SNF_jrJsXRqc)