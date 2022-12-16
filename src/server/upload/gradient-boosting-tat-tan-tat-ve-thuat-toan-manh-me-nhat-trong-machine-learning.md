Xin chào các bạn, sau 1 thời gian vắng bóng vì cạn ý tưởng viết bài và cũng cảm thấy bản thân chưa làm được điều gì nên hồn để chia sẻ, mình đã quay trở lại với Viblo để viết về một chủ đề không mới, về một thuật toán không mới, tuy nhiên không phải ai cũng hoàn toàn hiểu được và vận dụng được nó : **Gradient Boosting.**

Ý tưởng để gợi lên mình viết bài viết này có lẽ bắt nguồn từ bài viết [Ensemble learning và các biến thể (P1)](https://viblo.asia/p/ensemble-learning-va-cac-bien-the-p1-WAyK80AkKxX) của tác giả Phạm Minh Hoàng. Đây là một bài viết khá hay và phần giải thích dễ hiểu về các thuật toán ensemble, tuy nhiên có 1 điều khá đáng tiếc là sau hơn 1 năm chờ đợi, tác giả đã viết rất nhiều bài viết chất lượng khác, nhưng tuyệt nhiên lại không có bài viết nào liên quan đến "Ensemble learning và các biến thể (P2)", làm các fan comment chờ đợi trong vô vọng. 

![img](https://images.viblo.asia/b81701d8-f0dd-4902-b256-15596835babd.png)

Thế nên là "Tự túc là hạnh phúc", hôm nay mình viết bài này, xin phép nối tiếp nội dung mà tác giả đang chia sẻ dở, một bài viết về thuật toán Ensemble tiếp theo, sau Bagging, chính là về **Boosting**. Các bạn có thể gọi bài viết này với một tiêu đề khác là *"Ensemble learning và các biến thể (P2)"* cũng được :smile:

Oke, bắt đầu vào nội dung chính của bài viết nào !
# 1. Nhắc lại 1 chút về Ensemble Methods
Ensemble Method hay gọi một cách Việt hóa là Học Kết Hợp, là một phương pháp với tư tưởng là **Thay vì cố gắng xây dựng một mô hình tốt duy nhất, chúng ta sẽ xây dựng một họ các mô hình yếu hơn một chút, nhưng khi kết hợp các mô hình lại, (nếu có thể kết hợp một cách chính xác) sẽ thu được một mô hình còn vượt trội hơn cả.**

![img](https://images.viblo.asia/164922f0-051f-4fed-ba49-042316501ba0.png)

### 1.1 Single weak learner
Nếu tiếp xúc đủ lâu với Machine Learning, các bạn chắc hẳn đều đã biết đến những giải thuật, những mô hình kinh điển trong lĩnh vực này :
* Linear Discriminant Analysis
* Decision Trees
* Neural Networks
* Na ̈ıve Bayes Classifier
* k-Nearest Neighbor
* Support Vector Machines and Kernel Methods

Khi gặp một bài toán bất kì, dù là phân lớp (classification) hay hồi quy (regression) thì việc chọn ra một mô hình đủ tốt luôn là một quyết định quan trọng và khó khăn nhất. Khác với Deep Learning, việc tìm ra mô hình tốt là việc cố gắng thay đổi số layer hay thay đổi cấu trúc mạng, ở Machine Learning, việc lựa chọn mô hình là việc tối ưu tham số, quan sát các đặc điểm về số chiều của không gian dữ liệu, đặt ra các giả thiết về phân phối dữ liệu, ...

Có thể mô tả một quá trình giải quyết bài toán machine learning như sau : 
* Phân tích dữ liệu 
* Thử các mô hình (thử có định hướng sau khi giả định về tính chất dữ liệu, hoặc thử tất cả các phương pháp có thể)
* Finetune lại mô hình để tìm ra các tham số tốt nhất
* Đánh giá kết quả
* Quay lại bước 1 nếu kết quả đánh giá không tốt =))

![img](https://i.imgur.com/877qVdv.jpg)

Tất cả các thao tác trên bản chất là xoay quanh để giải quyết vấn đề giữa bias và variance ([bias-variance trade off](https://medium.com/@mp32445/understanding-bias-variance-tradeoff-ca59a22e2a83)). Hiểu đơn giản về bias-variance trade off tức là *"chúng ta mong muốn mô hình khi fit vào dữ liệu sẽ có bias thấp và variance thấp, tuy nhiên, bias và variance thường có xu hướng nghịch đảo với nhau. - bias thấp nhưng variance cao hoặc variance thấp nhưng bias cao, và chúng ta chỉ có thể lựa chọn tăng cái này và chấp nhận giảm cái kia"*. 

Một điều đặc biệt là, khi chúng ta chỉ sử dụng single model hay single learner (tức là chỉ dùng đúng duy nhất một model để fit vào dữ liệu), bias-variance trade off là điều không thể tránh khỏi - **Single weak learner** .

![img](https://i.imgur.com/vQKoT79.png)

### 1.2 Combine weak learners
Để giải quyết được vấn đề bias-variance trade off, một hướng giải quyết được đề xuất là : "**Nếu 1 model không thể tự giải quyết được, hãy để nhiều model cùng nhau giải quyết**". Tất nhiên, nhiều model ở đây có thể là cùng một loại nhưng áp dụng trên những phần dữ liệu khác nhau (kì vọng là độc lập với nhau) hoặc những model hoàn toàn khác loại được kết hợp lại.

Mỗi kiểu kết hợp model lại được áp dụng tùy theo mục đích nhất định, chứ không phải là kết hợp tùy tiện. Dựa vào tính chất này, chúng ta chia các thuật toán ensemble thành các nhóm chính sau (phần này mình xin trích lại từ [Part1](https://viblo.asia/p/ensemble-learning-va-cac-bien-the-p1-WAyK80AkKxX) nha): 
* Bagging (**Mục tiêu là giảm variance - áp dụng cho các model đã có sẵn bias thấp và đang bị variance cao**): Xây dựng một lượng lớn các model (thường là cùng loại) trên những subsamples khác nhau từ tập training dataset (random sample trong 1 dataset để tạo 1 dataset mới). Những model này sẽ được train độc lập và song song với nhau nhưng đầu ra của chúng sẽ được trung bình cộng để cho ra kết quả cuối cùng.
* Boosting (**Mục tiêu là giảm bias - áp dụng cho các model có variance thấp và bị bias cao**): Xây dựng một lượng lớn các model (thường là cùng loại). Mỗi model sau sẽ học cách sửa những errors của model trước (dữ liệu mà model trước dự đoán sai) -> tạo thành một chuỗi các model mà model sau sẽ tốt hơn model trước bởi trọng số được update qua mỗi model (cụ thể ở đây là trọng số của những dữ liệu dự đoán đúng sẽ không đổi, còn trọng số của những dữ liệu dự đoán sai sẽ được tăng thêm) . Chúng ta sẽ lấy kết quả của model cuối cùng trong chuỗi model này làm kết quả trả về.
* Stacking (**Mục tiêu là giảm bias - áp dụng cho các model có variance thấp và bị bias cao**): Xây dựng một số model (thường là khác loại) và một meta model (supervisor model), train những model này độc lập, sau đó meta model sẽ học cách kết hợp kết quả dự báo của một số mô hình một cách tốt nhất.

![img](https://i.imgur.com/iq3mjju.png)
# 2. Bỏ qua Bagging, chúng ta đến với Boosting
### 2.1 Ý tưởng của Boosting
Qua Part 1, chúng ta đã biết được Bagging được kết hợp từ các model được fit trên các tập dữ liệu con (được lấy theo boostrap sample để các tập con được kì vọng là độc lập), từ đó kết hợp các kết quả từ các model này để đưa ra kết quả cuối cùng. Tuy nhiên, có 1 số điều chúng ta có thể để ý ở đây
* Các model trong Bagging đều là học một cách riêng rẽ, không liên quan hay ảnh hưởng gì đến nhau, điều này trong một số trường hợp có thể dẫn đến kết quả tệ khi các model có thể học cùng ra 1 kết quả. **Chúng ta không thể kiểm soát được hướng phát triển của các model con thêm vào bagging**
* Chúng ta mong đợi các model yếu của thể hỗ trợ lẫn nhau, học được từ nhau để tránh đi vào các sai lầm của model trước đó. **Đây là điều Bagging không làm được**

Boosting ra đời dựa trên việc mong muốn cải thiện những hạn chế trên. Ý tưởng cơ bản là Boosting sẽ tạo ra một loạt các model yếu, học bổ sung lẫn nhau. Nói cách khác, trong Boosting, các model sau sẽ cố gắng học để hạn chế lỗi lầm của các model trước. 

Vậy làm thể nào để hạn chế được sai lầm từ các model trước ? Boosting tiến hành  đánh trọng số cho các mô hình mới được thêm vào dựa trên các cách tối ưu khác nhau. Tùy theo cách đánh trọng số (cách để các model được fit một cách tuần tự) và cách tổng hợp lại các model, từ đó hình thành nên 2 loại Boosting :
* Adaptive Boosting (AdaBoost)
* Gradient Boosting

Chúng ta sẽ phân tích sâu hơn về 2 dạng Boosting này ở phần sau. Để kết thúc phần này,  có một vài nhận xét về Boosting như sau: 
* Boosting là một quá trình tuần tự, không thể xử lí song song, do đó, thời gian train mô hình có thể tương đối lâu.
* Sau mỗi vòng lặp, Boosting có khả năng làm giảm error theo cấp số nhân.
* Boosting sẽ hoạt động tốt nếu base learner của nó không quá phức tạp cũng như error không thay đổi quá nhanh.
* Boosting giúp làm giảm giá trị bias cho các model base learner.

### 2.2 AdaBoost - Gradient Boosting
Cả AdaBoost và Gradient Boosting đều xây dựng thuật toán nhằm giải quyết bài toán tối ưu sau : 
$$
\text{min}_{c_n=1:N, w_n=1:N} L(y, \sum^N_{n=1} c_n w_n))
$$
Trong đó : 
* $L$ : giá trị loss function
* $y$ : label
* $c_n$ : confidence score của weak learner thứ n (hay còn gọi là trọng số)
* $w_n$ : weak learner thứ n

Thoạt nhìn, công thức trên có vẻ khá giống với Bagging, thế nhưng cách tính ra các giá trị confidence score kia lại làm nên sự khác biệt về hướng giải quyết của Boosting. Thay vì cố gằng quét tìm tất cả các giá trị $c_n, w_n$ để tìm nghiệm tối ưu toàn cục - một công việc tốn nhiều thời gian và tài nguyên, chúng ta sẽ cố gắng tìm các giá trị nghiệm cục bộ sau khi thêm mỗi một mô hình mới vào chuỗi mô hình với mong muốn dần đi đến nghiệm toàn cục. 
$$
\text{min}_{c_n, w_n} L(y, W_{n-1} + c_n w_n))
$$
với $W_{n-1} = \sum^{N-1}_{n=1} c_n w_n$
#### Adaptive Boosting
AdaBoost tiến hành train các mô hình mới dựa trên việc đánh lại trọng số cho các điểm dữ liệu hiện tại, nhằm giúp các mô hình mới có thể tập trung hơn vào các mẫu dữ liệu đang bị học sai, từ đó làm giảm giá trị loss của mô hình. Cụ thể, các bước triển khai thuật toán như sau : 
* Khởi tạo weight ban đầu là bằng nhau (bằng $1/N$) cho mỗi điểm dữ liệu
* Tại vòng lặp thứ i
    * train model $w_i$ (weak learner) mới được thêm vào 
    * tính toán giá trị loss (error), từ đó tính toán ra giá trị confidence score $c_i$ của model vừa train
    * Cập nhật model chính $W = W + c_i * w_i$
    * Cuối cùng, đánh lại trọng số cho các điểm dữ liệu (Các điểm dữ liệu bị đoán sai --> tăng trọng số, các điểm dữ liệu đoán đúng --> giảm trọng số). 
* Sau đó lặp lại với vòng lặp thêm model tiếp theo i + 1.

Chi tiết về cách thuật toán hoạt động, bạn có thể đọc thêm example tại [A Step by Step Adaboost Example](https://sefiks.com/2018/11/02/a-step-by-step-adaboost-example/)

![img](https://i.imgur.com/HDCbnL7.png)

> FYI: AdaBoost có thể được áp dụng mà không cần dựa vào việc đánh trọng số lại các điểm dữ liệu, thay vào đó, chúng ta có thể re-sample để lấy dữ liệu train cho các model tiếp theo dựa vào xác suất được xác định bới các trọng số. 
#### Gradient Boosting
Gradient Boosting là một dạng tổng quát hóa của AdaBoost. Cụ thể như sau, vẫn vấn đề tối ưu ban đầu 
$$
\text{min}_{c_n, w_n} L(y, W_{n-1} + c_n w_n)) 
$$
Trước tiên mình xin nhắc lại một chút lí thuyết mà các bạn đã khá quen trong neural network: [**Gradient Descent**](https://machinelearningcoban.com/2017/01/12/gradientdescent/)
$$
\theta_n = \theta_{n-1} - \eta \frac{\partial}{\partial \theta}L(\theta_{n-1})
$$
Phía trên là công thức cập nhật tham số mô hình theo hướng giảm của đạo hàm (Gradient Descent). Công thức này được sử dụng không gian tham số, tuy nhiên, để liên hệ với bài toán chúng ta đang xét, mình chuyển công thức sang góc nhìn của không gian hàm số. 

Khá đơn giản thôi, nếu chúng ta coi chuỗi các model boosting là một hàm số $W$, thì mỗi hàm learner có thể coi là một tham số $w$. Đến đây, để cực tiểu hóa hàm loss $L(y, W)$, chúng ta áp dụng Gradient Descent 
$$
W_n = W_{n-1} - \eta \frac{\partial}{\partial w}L(W_{n-1})
$$

Đến đây, ta có thể thấy mối quan hệ liên quan sau 
$$
c_n w_n \approx - \eta \frac{\partial}{\partial w}L(W_{n-1})
$$
với $w_n$ là model được thêm vào tiếp theo. Khi đó, model mới cần học để fit để vào giá trị $- \eta \frac{\partial}{\partial w}L(W_{n-1})$. (Giá trị $- \eta \frac{\partial}{\partial w}L(W_{n-1})$ còn có 1 tên gọi khác là **pseudo-residuals**)

Tóm lại, chúng ta có thể tóm tắt quá trình triển khai thuật toán như sau:
* Khởi tạo giá trị pseudo-residuals là bằng nhau cho từng điểm dữ liệu
* Tại vòng lặp thứ i 
    * Train model mới được thêm vào để fit vào giá trị của pseudo-residuals đã có
    * Tính toán giá trị confidence score $c_i$ của model vừa train
    * Cập nhật model chính $W = W + c_i * w_i$
    * Cuối cùng, tính toán giá trị pseudo-residuals $- \eta \frac{\partial}{\partial w}L(W_{n-1})$ để làm label cho model tiếp theo
* Sau đó lặp lại với vòng lặp i + 1.

Nếu bạn để ý thì phương pháp cập nhật lại trọng số của điểm dữ liệu của AdaBoost cũng là 1 trong các case của Gradient Boosting. Do đó, Gradient Boosting bao quát được nhiều trường hợp hơn.
![img](https://i.imgur.com/ZE8bBTA.png)
# 3. LightGBM và XGBOOST
Các phần trên là lí thuyết tổng quát về Ensemble Learning, Boosting và Gradient Boosting cho tất cả các loại model. Tuy nhiên, dù Bagging hay Boosting thì base model mà chúng ta biết đển nhiều nhất là dựa trên Decision Tree. Lí do là việc ensemble với các thuật toán Tree base cho kết quả cải thiện rõ ràng nhất, cũng là những thuật toán tốt nhất hiện nay đối với dạng dữ liệu có cấu trúc.

Với Gradient Boosting có base model là Decision Tree, ta biết đến 2 framework phổ biến nhất là XGBoost và LightGBM

### 3.1 XGBOOST
XGBoost (Extreme Gradient Boosting) là một giải thuật được base trên gradient boosting, tuy nhiên kèm theo đó là những cải tiến to lớn về mặt tối ưu thuật toán, về sự kết hợp hoàn hảo giữa sức mạnh phần mềm và phần cứng, giúp đạt được những kết quả vượt trội cả về thời gian training cũng như bộ nhớ sử dụng. 

Mã nguồn mở với ~350 contributors và ~3,600 commits trên Gihub, XGBoost cho thấy những khả năng ứng dụng đáng kinh ngạc của mình như : 
* XGBoost có thể được sử dụng để giải quyết được tất cả các vấn đề từ hồi quy (regression), phân loại (classification), ranking và giải quyết các vấn đề do người dùng tự định nghĩa.
*  XGBoost hỗ trợ trên Windows, Linux và OS X.
* Hỗ trợ tất cả các ngôn ngữ lập trình chính bao gồm C ++, Python, R, Java, Scala và Julia.
* Hỗ trợ các cụm AWS, Azure và Yarn và hoạt động tốt với Flink, Spark và các hệ sinh thái khác.
* ...

![img](https://i.imgur.com/BqaYk2z.png)

Kể từ lần đầu ra mắt năm 2014, XGBoost nhanh chóng được đón nhận và là giải thuật được sử dụng chính, tạo ra nhiều kết quả vượt trội, **giành giải cao trong các cuộc thi trên kaggle** do tính đơn giản và hiểu quả của nó. 
### 3.2 LightGBM
Mặc dù đạt được những kết quả vượt trội, XGBoost gặp một vấn đề là thời gian training khá lâu, đặc biệt với những bộ dữ liệu lớn. Đến tháng 1 năm 2016, Microsoft lần đầu realease phiên bản thử nghiệm LightGBM, và LightGBM nhanh chóng thay thế vị trí của XGBoost, trở thành **thuật toán ensemble được ưa chuộng nhất.**

![imgur](https://i.imgur.com/qSBQiE0.png)

LightGBM có những cải tiến gì? Chúng ta sẽ điểm qua một vài điểm chính sau đây:
* LightGBM sử dụng "**histogram-based algorithms**" thay thế cho "pre-sort-based algorithms " thường được dùng trong các boosting tool khác để tìm kiếm split point trong quá trình xây dựng tree. Cải tiến này giúp LightGBM tăng tốc độ training, đồng thời làm giảm bộ nhớ cần sử dụng .Thật ra cả xgboost và lightgbm đều sử dụng histogram-based algorithms, điểm tối ưu của lightgbm so với xgboost là ở 2 thuật toán: **GOSS (Gradient Based One Side Sampling) và EFB (Exclusive Feature Bundling)** giúp tăng tốc đáng kể trong quá trình tính toán. Chi tiết về GOSS và EFB, các bạn có thể đọc thêm tại: https://towardsdatascience.com/what-makes-lightgbm-lightning-fast-a27cf0d9785e
* LightGBM phát triển tree dựa trên **leaf-wise**, trong khi hầu hết các boosting tool khác (kể cả xgboost) dựa trên level (depth)-wise. Leaf-wise lựa chọn nút để phát triển cây dựa trên tối ưu toàn bộ tree, trong khi level-wise tối ưu trên nhánh đang xét, do đó, với số node nhỏ, **các tree xây dựng từ leaf-wise thường out-perform level-wise**.

Note: *Leaf-wise tuy tốt, nhưng với những bộ dữ liệu nhỏ, các tree xây dựng dựa trên leaf-wise thường dẫn đến **overfit khá sớm**. Do đó, lightgbm sử dụng thêm 1 hyperparameter là maxdepth nhằm cố gắng hạn chế điều này. Dù vậy, LightGBM vẫn được khuyến khích sử dụng khi bộ dữ liệu là đủ to.*

Chi tiết hơn về các cải tiến của LightGBM, các bạn có thể đọc thêm tại: https://github.com/Microsoft/LightGBM/blob/master/docs/Features.rst

![imgur](https://i.imgur.com/tixTkYI.png)

# Kết luận
Bài cũng đã dài, mình định thêm 1 phần code minh họa nữa nhưng chắc sẽ các bạn cũng có thể tìm thấy rất nhiều đoạn code sử dụng LightGBM trên **Kaggle** nên mình không nếu thêm ra nữa. Hi vọng qua bài viết này, các bạn hiểu thêm về lí thuyết, tư tưởng của thuật toán Gradient Boosting, cũng như vận dụng tốt hơn 2 framework mạnh mẽ XGBoost và LightGBM để giải quyết các bài toán của bản thân. 

Nếu các bạn cần tham khảo thêm về tham số của 2 thư viện này, các bạn có thể đọc thêm tại https://towardsdatascience.com/lightgbm-vs-xgboost-which-algorithm-win-the-race-1ff7dd4917d hoặc tại chính docs của 2 framework này để nắm vững hơn. 

Cuối cùng, đừng quên **upvote + comment + share** nếu thấy bài viết này hữu ích. 

See ya :D