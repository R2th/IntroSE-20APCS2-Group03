### *Các thuật ngữ, khái niệm sẽ được giải thích một cách đơn giản nhất kèm với các ví dụ thực tế, code và toán học*




### Lộ trình
Trong series này các bạn sẽ cùng mình tìm hiểu thế nào là Machine Learning, sau đó sẽ đi sâu tìm hiểu các nhánh rẽ trong nghiên cứu, ứng dụng về công nghệ này. 

**Phần 1**: Tại sao Machine Learning lại được quan tâm đến vậy. Bức tranh tổng quan của  artificial intelligence (trí tuệ nhân tạo) và machine learning — qúa khứ, hiện tại, tương lai.

**Phần 2.1**: Supervised Learning (Học có giám sát). Học với cặp answer-key. Giới thiệu về linear regression (hồi quy tuyến tính), loss functions (hàm mất mát), overfitting, và gradient descent.

**Phần 2.2**: Supervised Learning II. Hai phương pháp phân loại: logistic regression và SVMs.

**Phần 2.3**: Supervised Learning III. Non-parametric learners: k-nearest neighbors, decision trees, random forests. Introducing cross-validation, hyperparameter tuning, and ensemble models.

**Phần 3**: Unsupervised Learning (Học không có giám sát). Clustering: k-means, hierarchical. Dimensionality reduction: principal components analysis (PCA), singular value decomposition (SVD).

**Phần 4**: Neural Networks & Deep Learning. Why, where, and how deep learning works. Drawing inspiration from the brain. Convolutional neural networks (CNNs), recurrent neural networks (RNNs). Real-world applications.

**Phần 5**: Reinforcement Learning (Học củng cố). Khám phá và khai thác. Tiến trình đưa ra quyết định Markov. Q-learning, policy learning, và deep reinforcement learning. The value learning problem.

**Phụ lục**: Nguồn tư liệu quý để bạn bắt đầu nghiên cứu Machine Learning 

## Phần 1: Tại sao Machine Learning lại được quan tâm hơn bao giờ hết.
Trí tuệ nhân tạo sẽ làm thay đổi mạnh mẽ và định hình lại tương lai của chúng ta hơn bất kì các phát kiến nào trong thế kỉ này. Bất cứ ai không hiểu về công nghệ này sẽ sớm nhận ra rằng mình đã bị bỏ lại phía sau, như kiểu bạn thức dậy trong một thế giới đầy phép màu ma thuật vậy.

Tốc độ phát triển của Machine Learning đang được gia tăng hơn bao giờ hết, sau nhiều thập kỉ đóng băng, không được dành quá nhiều kì vọng thì giờ đây với sự nâng cấp vượt bậc trong công nghệ lưu trữ cũng như khả năng xử lý của máy tính, thì cùng diện của Machine Learning đã được thay đổi hoàn toàn.

Trong năm 2015, Google đã ra mắt một AI đàm thoại không những có thể tương tác ngôn từ một cách thuyết phục với con người mà còn có thể hoạt động dưới vai trò của một người trợ lý, đưa ra ý kiến, thảo luận và trả lời các câu hỏi thực tế khách quan.

![](https://images.viblo.asia/26241a52-7d72-4628-8391-842015fad70f.png)
(Vinyals & Le, 2017)

Trong khi đó, AlphaGo đã đánh bại danh thủ cờ Go — có thể nói đây là một kì tích trong làng game mà con người đã thống trị trong 2 thập kỉ kể từ lần cuối cùng máy tính đánh bại con người. Rất nhiều cao thủ không thể hiểu nổi tại sao một cỗ máy lại có thể nắm trọn các đường đi nước bước của một môn nghệ thuật của Trung Quốc này, người ta dự tính có khoảng 10¹⁷⁰ nước đi có thể triển khai, trong khi số lượng nguyên tử trong vũ trụ này mới chỉ là 10⁸⁰.

![](https://images.viblo.asia/dde8f889-9fa1-4c0b-ae75-e6d349e246da.png)
Professional Go player Lee Sedol reviewing his match with AlphaGo after defeat. Photo via The Atlantic.

Mới chỉ năm ngoái, 11 tháng 8 2017, OpenAI lại đặt được một cột mốc quan trọng khác khi đánh bái được top 1 Dota thế giới Dendi trong hạng mục đánh solo 1vs1

![](https://images.viblo.asia/245bd80b-e2d2-4d5e-ac05-aa6d20dbe39f.png)
See the full match at The International 2017, with Dendi (human) vs. OpenAI (bot), on YouTube.

Ngày càng nhiều những thiết bị công nghệ của chúng ta được vận hành bởi trí tuệ nhân tạo. Chỉ cần trỏ camera về phía Menu của một nhà Hàng ở Đài Loan và tự khắc sẽ được chuyển sang tiếng Anh thông qua app Google Translate.

![](https://images.viblo.asia/8eab6491-f9f7-40fc-abfc-10aba20389e9.png)
Google Translate overlaying English translations on a drink menu in real time using convolutional neural networks.

Ngày nay, AI còn được sử dụng trong thiết kế phác đồ điều trị dựa trên lịch sử điều trị bệnh dành cho các bệnh nhân bị ung thư hay lập tức cho ra kết quả từ các bài xét nghiệm y tế để báo cho chuyên gia điều trị phù hợp nhất.

Trong cuộc sống hiện đại, ngày càng xuất hiện nhiều hơn những cỗ máy làm thay những việc mà từ trước đến giờ vẫn được đảm đương bởi con người. Vậy nên đừng bị shock khi bạn yêu cầu lễ tân khách sạn gửi cho bạn một bàn chải đánh răng và ngay sau đó thấy một con robot thực hiện việc này.


Trong series “Ai cũng có thể hiểu được Machine Learning” này, chúng ta sẽ cùng nhau tìm hiểu những khái niệm, cơ chế đằng sau những công nghệ này. Và khi bạn cùng chúng tôi đi đến cuối cùng của series, sẽ có thể tự mình mô tả được làm sao chúng có thể vận hành được ở mức độ khái niệm, đồng thời được trang bị những công cụ để có thể tự mình phát triển các ứng dụng tương tự.

## Sơ đồ cây của trí tuệ nhân tạo và machine learning

Trước tiên hãy đến với một lời khuyên từ founder của SpaceX, Tesla: “Chúng ta nên nhìn tri thức dưới dạng một cái cây ngữ nghĩa. Hãy chắc chắn rằng bạn hiểu được những nhánh to, hay những nguyên lý của vấn đề trước khi vào sâu tầng ngọn tầng lá, nếu không thì bạn sẽ không biết chúng được “mọc” ra từ đâu đâu.”

![](https://images.viblo.asia/9443881a-e256-4463-88b8-2dfdcded72c5.png)
Trí tuệ nhân tạo là quá trình học của một chương trình mà trong đó, nó tiếp thu thế giới xung quanh, tự xây dựng kế hoạch và đưa ra quyết định để đạt được mục tiêu. Nền tảng của nó được xây dựng nên từ toán học, logic, Its foundations include mathematics, logic, triết học, xác xuất, ngôn ngữ học, thần kinh học và thuyết quyết định. Có rất nhiều lĩnh vực con thuộc “chiếc dù lớn” AI, trong đó ta có thể kể đến như robotics, computer vision, machine learning và xử lý ngôn ngữ.

Machine learning là một lĩnh vực con của AI. Mục tiêu của nó là tạo cho máy tính khả năng tự học. Một thuât toán tự học của một máy cho phép nó nhận diện các điểm tương đồng thông qua việc tiếp nhận data, và dự đoán tình huống mà con người không phải lập trình cụ thể cho nó.

AI sẽ thay đổi mãi mãi thế giới của chúng ta, để hiểu tại sao nó có thể làm được điều đó thì Machine Learning chính là nơi chúng ta có thể bắt đầu.

Các công nghệ mà chúng ta tìm hiểu phía trên có thể được xếp vào nhóm Trí tuệ nhân tạo hẹp (artificial narrow intelligence - ANI) - những chương trình có thể thực hiện những nhiệm vụ đã được định nghĩa rõ từ trước.

Trong khi chúng ta đang sắp chạm đến mức trí tuệ nhân tạo tương đuơng với trí tuệ con người - hay ta còn gọi là strong AI hay AGI (artificial general Intelligence). AGI có thể hiểu là trí tuệ nhân tạo có thể thực hiện bất kì một nhiệm vụ cần đến tri thức nào mà con người có thể thực hiện bao gồm cả tự học, lên kế hoạch, đưa ra quyết định dưới một tình huống cụ thể, giao tiếp, nói đùa, hoặc thậm chí tự lập trình lại chính bản thân nó.

Một khi mà chúng ta có thể tạo được một AI có thể tự hoàn thiện được chính bản thân nó sẽ mở ra một kỉ ngguyên bùng nổ trí tuệ môt ngày không xa có thể là vài thập kỉ nữa hoặc cũng có khi chỉ trong vài ngày tới đây, không ai biết được?!

**Reference: https://medium.com/machine-learning-for-humans/why-machine-learning-matters-6164faf1df12*