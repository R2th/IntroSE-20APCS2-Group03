@ bạn admin: cho mình hỏi với, 2 bài liên tục, mình đều bị system auto gắn là spam, bạn gỡ giúp mình với, với cho hỏi, bài viết mình có gì không ổn, mà bị gắn spam mãi vậy??
* Do chỉnh lại tag thường xuyên?
* Do viết kiểu cứ được tý tý rồi update?

***Chủ nhật vừa rồi, mình không động chút nào tới code hay lý thuyết cả. Phải cố gắng lắm mới làm thế được, vì một ngày không học hành, không làm lụng, nó rất trái với nội tâm mình, luôn muốn mỗi ngày phải có chút gì đó tiến bộ, chút gì đó học tập.
Dù vậy, một ngày để suy ngẫm, thì cũng có cái hay. Tư ra vài điều, mình sẽ viết dưới kia.*

# Tuần 15.
## Nhận xét về Datacamp.
Trong [bài viết trước](https://viblo.asia/p/con-duong-tu-nganh-thuc-pham-sang-machine-learning-63vKjXz6l2R) mình có mồi chài ít về atacamp. Giờ nói về Datacamp nhé.

Trước hết, phải nói là giao diện học tập của Datacamp rất đẹp. Đơn giản, tối giản, và đẹp một cách hiệu quả. Nó không tối giản và đẹp tới mức phải cắt giảm công năng, như cái triết lý của bác thiết kế trưởng Apple - thiết kế đi trước công năng - Datacamp đẹp và đủ dùng. Cụ thể: 
* Trang học tập, chỉ có:
    * 2 cụm chính: cụm hướng dẫn + cụm làm bài.
    * 1 thanh công cụ chính: mục lục.
    * vài thứ nhỏ nhỏ để download tài liệu, video.
* Hết.

Mọi thứ mình cần để học, đều ở đó, không có bất kỳ điều gì gây xao lãng.
Về nội dung, có hai điểm mạnh.
Thứ nhất. Nội dung nhấn mạnh thực hành. Mỗi course, thường chia thành 3 hay 4 part, mỗi part chỉ có tầm 2 video lý thuyết, mỗi cái cỡ 3 phút. Ngay sau 3 phút lý thuyết đó là thực hành áp dụng những gì vừa nghe vào làm luôn. Đây là cách dạy đưa kiến thức thành kỹ năng cực nhanh. Ý kiến bản thân, mình nghĩ cách dạy này hay hơn rất nhiều MOOCs của Andrew Ng. Các MOOCs của Ng, mỗi tuần có tới 1 tiếng lý thuyết, và phần code thực tế đặt rất xa sau lý thuyết, dẫn tới bị quên, hoặc có cảm giác lý thuyết không gắn liền với implement thực.

Thứ hai, là cách dạy 'chia để trị'. Tức là kiến thức dù nghe có vẻ advanced tới đâu, cũng đều được xắt nhỏ, thành nhiều cái basic. Học trên này, mình bắt đầu có cảm giác, việc chia các kiến thức về Python thành basic và advanced là khá tương đối, và gây sợ cho người học. Mình nghĩ, kiến thức nào, mà dùng vào công việc, thì cũng nên được gọi là basic hết. Chỉ những cái nào, phải trui rèn cả năm mới dùng được, thì mới được gọi là advanced, chứ cứ học xong dùng được ngay, dùng kiểu đơn giản, dùng kiểu phức tạp, thì đều là basic hết cả.

À, mình đã mua gói 1 năm của Datacamp rồi, 2 triệu 7. Tiền nào của nấy.

## Suy nghĩ bên lề

Mình không định hướng trở thành một Data Scientist. Hồi trước, khi đang còn là Food technology engineer, mình còn chẳng chút thiên hướng nào trở thành Food technology scientist, thì giờ, với ngành data, cũng không lý nào mình muốn là Data scientist cả.
Mình chỉ muốn là AI hoặc Machine learning engineer thôi.
Là engineer, là sử dụng những kiến thức được khai mở bởi ông scientist, áp nó vào thực tiễn, tạo ra máy móc mới, hoặc áp dụng máy móc mới vào công việc thực tế ở nhà máy, ở công ty. Lúc nào tay cũng vấy bẩn. Đấy là kiểu công việc mình thích. Chứ chuyên sâu vào lý thuyết, mình chịu thôi.

À, trong tuần trước, mình nghĩ là không cần học Python tới mức quá chuyên sâu. Có lẽ mình nhầm. Theo [bài này trên quora](https://www.quora.com/How-do-I-learn-machine-learning-1), #1 có nói:
> do the same thing with programming. I’d consider myself a nearly complete expert in Python. You need to be a quick and effective programmer to be of any use. I know at least one very talented and knowledgable data scientist whose mediocre programming skills make him almost useless.
> 
Có nghĩa là, anh engineer hay anh scientist cũng giống như người bác sỹ vậy. Bác sỹ, phải vừa hiểu rõ lý thuyết, và dẻo tay mổ, mới giúp người được chứ. Chỉ 'biết', mà không thể làm, cũng là một kiểu bất lực. 

## Học được gì tuần này
Tuần này mình học được khá nhiều thứ thực tế, ví như:
* Cách import đủ các thể loại data format.
* Cách build cơ bản một package của Python, sau này tiến tới đóng gói chương trình mình viết cho anh em xài.
* Cách dùng numpy và panda với sklearn để build một mô hình rất đơn giản, là kNN. Chạy cái này với MNIST, mới thấy là éo được các bạn ạ. Mình bật GPU lên rồi, Kaggle chạy 20 phút không xong một iter. Thế là phải kiểm tra lại computational cost của kNN, với bộ dữ liệu khoảng 50k datapoints, ô, hóa ra là lớn khủng khiếp luôn. Sang tuần mình sẽ tính cụ thể số ra, chứ nọ ngồi ước lượng, là đã nhận ra kNN với cái này có vẻ bất khả.

Học được cách đấm nhau. 
Cái này là chuyện bên lề nhé. Còn nhớ tuần trước mình có nói, mình là công an không. Chính xác hơn là làm an ninh, cụ thể hơn nữa thì không nói được, đề phòng các phần tử xấu mua chuộc. Vì là công an nên độ này mình phải dành 5 tuần học võ, từ thứ 2 đến thứ 7, mỗi ngày 5 tiếng. Và tập nặng chứ không phải là chơi đâu. Ban đầu cũng bực mình chả muốn đi, vì đang cần dành time cho AI, vậy mà, tập rồi, lại mê. Mình vốn là thằng thích đánh đấm, tập Aikido cũng được kha khá time, rồi vô Đà Nẵng tập boxing tý tóe khoảng 1 năm. Tập rất tận tâm chứ không phải kiểu thể thao đến đấm gió vài cái là về đâu. Có lần bị đấm gãy mũi, nằm viện. Có lần đấm xước môi xước má.. Ôi.. Cái cảm giác được ăn đấm, phê lắm các bro à. Rồi cái cảm giác, tay trái thả lỏng, cương cứng lên chỉ trong khoảnh khắc đấm chạm mục tiêu, toàn thân vẫn lỏng, tay cứng và thân lỏng như ngắt kết nối, tạo ra độ agile cho cơ thể.. Ôi.. Cái cảm giác điều khiển được cơ thể nó phê lắm bác. Kể có ai từng tập violin rồi, thì sẽ biết cảm giác này rất giống. Khi mà kéo vỹ đến mức mỏi hết cả tay, thì tay bắt đầu lỏng, cả đầu óc cũng nhẹ ra, thế là cảm được nhạc. Bọn võ biền chúng tớ cũng thế, khi người bắt đầu bầm dập, thì mới là biết vị phê.

Tuần này mình viết thế thôi nhé.