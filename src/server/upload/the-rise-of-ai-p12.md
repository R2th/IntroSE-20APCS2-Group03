Sau khi đọc bài viết [đầu tiên](https://viblo.asia/p/1-introduction-to-ai-artificial-intelligent-gGJ59vMjKX2) trong series này với những lời viết đầy tính trào phúng và châm biếm, thật vui là các bạn vẫn còn chút tò mò để tiếp tục mò mẫm tới bài viết thứ 2 này. Trong bài viết này chúng ta sẽ tìm hiểu về những thuật ngữ về AI cần thiết để có thể tương tác được ít nhiều với những siêu nhân dù dỏm hay xịn trong lĩnh vực này cũng như lý do lớn mạnh của nó. Dĩ nhiên là tôi sẽ không giải thích chúng bằng những thuật ngữ kĩ thuật khác mà chỉ bằng thứ ngôn ngữ nông dân trồng cần cũng có thể hiểu. Bắt đầu nào 

# 1. What is AI:
Dù bài viết trước tôi đã nhắc tới 2 hướng nghiên cứu của lĩnh vực trí tuệ nhân tạo, nhưng thực sự chưa có lời nào giải thích cho các bạn biết nó là gì cả. Đây là một lĩnh vực lớn, giờ sẽ là định nghĩa ngô nghê của riêng tôi: 
- Bất cứ thứ gì có được trí tuệ và được tạo bởi bàn tay con người thì nó được gọi là Trí Tuệ Nhân Tạo. (Cái tên nói lên tất cả :smile: )
- Cái thứ đó có thể có trí tuệ xịn như người hay chỉ là bắt chước bằng cách này hay cách khác trí tuệ của con người trong một tác vụ cụ thể. Ví dụ:
    - Skynet, Jarvis, Ultron, ... hay bất cứ cái gì là máy được người tạo ra và thậm chí được lồng tiếng để biết nói chuyện với người trong các bộ phim giả tưởng thì nó chắc là AI.
    - Trong các trò chơi mà người chơi có địch thủ không phải là người và được lập trình sẵn trong các game đó thì cũng là AI cả (phần lớn bọn này khá dốt, dễ bị người chơi bắt bài nên các thánh chơi game chả coi tụi này ra gì)
    - Cái điện thoại của các bạn có thể focus vào mặt người để chụp ảnh cho nét (cái ô vuông đi theo mặt bạn trong màn hình của ứng dụng chụp ảnh ấy)
    - Facebook tự động đề xuất những quảng cáo liên quan tới mặt hàng dịch vụ bạn đang quan tâm, hay bài viết theo trend.. Đáng tiếc nó cũng là AI (Khi biết sự thật này tôi cảm thấy bị facebook xỏ mũi dắt đi theo dư luận :disappointed_relieved: )
    - Cái đèn xanh đèn đỏ ở ngã tư thì ... không phải AI. Vì theo như thuật ngữ chuyên ngành của các Thần Phím và Lướt Lướt công chúa thì đây là hành động "không não", mà đã là không não thì làm gì có trí tuệ. Các bạn thử tưởng tượng mình đứng ở ngã tư cầm 3 cái đèn, và giơ lên theo giờ đã định mà xem có đúng không! Haiz thực sự là các cô chú cảnh sát giao thông quá đen khi phải làm một công việc tựa như vậy vào mỗi giờ tan tầm để điều hướng cho hội những người nhiều não có thể đi về nhà.
- Lan mãn nãy giờ vậy thôi chứ thực ra giờ 99% những cái mà được gọi AI các bạn đang được nghe thấy trên tivi, báo đài nó được gọi là Machine Learning (Tôi nghĩ dịch sát nghĩa nên là Sự học của máy). Đơn giản nó là một mảng nghiên cứu nằm trong AI, cụ thể là gì thì tôi sẽ đề cập ngay trong phần tiếp theo.

# 2. What is Machine Learning:
- Dù là một mảng nghiên cứu con trong AI nhưng Machine Learning cũng rộng lớn chả khác gì thằng cha AI của nó cả, vì thế nên để cho đơn giản, tôi sẽ chỉ đề cập tới một phương pháp của Machine Learning được gọi là Supervise Learning (Sự học có giám sát). Đừng cảm thấy quay cuồng vì bạn sẽ hiểu nó trong vài giây tiếp theo. 
- 90% các sản phẩm về AI hiện tại được tung hô là sản phẩm của phương pháp này nên biết tới nó cũng là một phần đáng kể để giúp bạn hiểu về AI và đi chém gió về nó rồi :smile: 
- Supervise Learning là phương pháp dạy cho máy học bằng cách cấp cho chúng một lượng lớn các ví dụ về công việc mà nó cần làm. Tức là bạn cho nó input (đầu vào) và output (đầu ra) còn làm sao để từ input ra được output tương ứng thì đó là việc của nó :cat: 
![](https://images.viblo.asia/ac77c711-d7b9-4ff5-a9ff-f41a3674fd36.png)
- Hãy lấy một ít ví dụ cho dễ hiểu nào: 
    - Bạn cần một phần mềm dịch từ tiếng Anh sang tiếng việt: hãy cung cấp cho cỗ máy thân yêu của bạn một lượng lớn những cặp câu Anh - Việt có chung ý nghĩa. Câu tiếng Anh ở đây là input và câu tiếng Việt là output. 
    - Bạn cần một chiếc camera có thể biết mặt bạn ở đâu: hãy cung cấp cho chiếc camera xinh xinh của bạn một lượng lớn dữ liệu trong đó mỗi dữ liệu bao gồm 1 bức ảnh có mặt bạn và toạ độ của hình vuông có mặt bạn trên bức ảnh đó.
    - Hòm thư của bạn có nhiều thư spam quá ư, hãy cho phần mềm quản lý email của bạn biết đâu là email spam và đâu là email bình thường. Ở đây input là nội dung email của bạn, tên người gửi, tiêu đề và output là spam/not spam
    - Bạn có quá nhiều gấu để nhắn tin, ngón tay mỏi nhừ vì gõ phím. Hãy cho cỗ máy vạn năng kia các đoạn ghi âm giọng nói của bạn và nội dung tin nhắn tương ứng với đoạn ghi âm đó. Ở đây input là đoạn ghi âm lời nhắn bằng giọng nói và output là đoạn text tương ứng của đoạn ghi âm kia. Trong trường hợp bạn chưa nhận ra thì đây là tính năng nhận diện giọng nói.
    - Và vô số các ứng dụng khác, chỉ cần bạn có thể tìm ra được đầu vào và đầu ra tương ứng, máy sẽ tự học ra cho bạn xem. Đến đây nếu các bạn đã có con và chịu khó quan sát chúng thì sẽ thấy rằng chúng ta thường xuyên phải dạy chúng theo cách này. "Con ơi đây là củ cà rốt", "Việc này là không tốt đâu con", "Đồ ăn rơi xuống đất không được ăn", "Đánh bạn là không tốt", "Ăn rau rất tốt cho sức khoẻ".
    
# 3. Why now ?
- Đến đây hẳn nhiều bạn sẽ ngạc nhiên tại sao chỉ đơn giản có vậy mà giờ người ta mới làm được. Trước kia đúng là chúng ta có thể tạo ra dữ liệu tương tự như vậy và ta đã làm điều đó. Nếu để ý rằng trong những năm gần đây, thiết bị lưu trữ của chúng ta ngày càng lớn, cảm biến ngày một nhiều, với sự phát triển của Internet, số lượng website tăng lên chóng mặt đi kèm với nội dung phong phú đa dạng, nhiều khi ngừơi viết báo và blog còn nhiều hơn người đọc :smile: Điều có nghĩa là dữ liệu chúng ta có ngày một nhiều, nhiều hơn so với trước kia rất nhiều.
- Tuy vậy nhưng một trong những bộ dữ liệu đem lại thành công ngày hôm nay của AI thực ra chỉ là những bức ảnh đi kèm với trong bức ảnh có con gì hay vật gì được tạo bởi ý đồ của một phòng lab tại Stanford. Tuy nhiên tập dữ liệu này có tới > 14 triệu bức ảnh :shit: Nếu bạn tò mò hãy nghe chia sẻ của bà tại video bên dưới 
[](https://www.youtube.com/watch?v=40riCqvRoMs)
- Sự vươn lên của Deep Learning, với lượng dữ liệu lớn, máy móc tối tân hơn (thứ tôi muốn ám chỉ ở đây là những chiếc card đồ hoạ xịn xò mà các con giời chỉ thích dùng để chơi game hay đào coin :disappointed_relieved: ). Một cách đơn giản bạn chỉ cần hiểu rằng đây là một kĩ thuật mà khi có càng nhiều dữ liệu nó càng cho kết quả tốt hơn. Trong trường hợp bạn chưa từng nghe tới thuật ngữ này thì hãy hiểu rằng Deep Learning chính là kĩ thuật mà các bác hay dùng mạng nơ ron nhân tạo đang sử dụng. Và dĩ nhiên thằng này lại là một mảng nhỏ nằm trong Machine Learning. (Chia gì mà nhiều thế không biết)
![](https://images.viblo.asia/101cc6fb-58a5-4039-be1a-a6526f1bf783.png)
   Như các bạn thấy trên hình, các sản phẩm sử dụng mạng nơ ron hay Deep Learning đem lại kết quả tốt hơn tương ứng với số lượng dữ liệu

# 4. Tổng kết:
- Giờ ta đã hiểu AI là gì ? Machine Learning là gì ? Dạy dỗ chúng như thế nào ?
- Tại sao giờ đây AI lại nở rộ
- Sản phẩm như thế nào có thể ứng dụng AI
- Máy học từ dữ liệu vậy dữ liệu là gì thì trong bài tiếp theo ta sẽ cùng nhau tìm hiểu cùng với các thuật ngữ khác về AI.