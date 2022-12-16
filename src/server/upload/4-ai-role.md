Chào các ban, rất vui được gặp lại các bạn trong bài viết thứ 4 trong chuyên mục "From AI to Strategy". Trong các bài viết trước ta đã tìm hiểu về một số khái niệm của AI cũng như sự loằng ngoằng dây thép trong việc hiểu và cung cấp dữ liệu cho máy học hành thi cử. Hôm nay, ta sẽ tiếp tục tìm hiểu về các nhân tố trong một đội AI, vai trò và công việc của họ là gì. Trước tiên là một phút với khái niệm Machine Learning & Data Science.

# 1. Machine Learning & Data Science:
![](https://images.viblo.asia/425d410f-8788-447a-b476-a5463004fffe.png)
Các bạn sẽ ngạc nhiên rằng tại sao tôi lại nhắc tới Machine Learning và Data Science, trong khi chủ đề chính của chúng ta lại là về AI. Như đã nói trong những bài viết trước, sự lớn mạnh hiện tại của AI là nhờ Machine Learning và Machine Learning là các kĩ thuật yêu cầu dữ liệu. Nhưng bên cạnh đó cũng có những lĩnh vực khác yêu cầu dữ liệu - những lĩnh vực đó được gộp chung vào Data Science (Ngành khoa học về dữ liệu). Hay nói cách khác Machine Learning hay một phần của nó vừa nằm trong AI và vừa nằm trong Data Science. Mọi thứ vẫn chưa rõ ràng nhỉ, nhưng trước tiên hãy đi qua khái niệm rồi sau đó tôi sẽ giải thích cẩn thận hơn.

###     a. Machine Learning: 
- Đây là lĩnh vực nơi mà ta sẽ cho máy tính có khả năng học hỏi mà không cần phải lập trình một cách cụ thể. Ví dụ: 
    - Nếu bạn đi làm ở các dây chuyền sản xuất. Bạn sẽ được làm một công việc cụ thể ở một khâu nhất định trong dây chuyển, chẳng hạn đóng gói sản phẩm. Bạn sẽ được chỉ từng bước từng bước như thế nào (Lấy hộp, bỏ sản phẩm vào theo 1 chiều cố định, đóng hộp, rồi chuyển sang cho bộ phận tiếp theo). Công việc của bạn rất rõ ràng, không cần suy nghĩ hay làm gì đó đặc biệt, điều này giống với máy tính với những chỉ thị cụ thể. Mỗi khi làm 1 khâu nhất định, bạn lại được chỉ từng thao tác một cách cụ thể, vì thế trước khi có Machine Learning, từng thao tác của máy được người lập trình đưa ra một cách rõ ràng.
    - Nếu trong trường hợp khác thay vì được chỉ vào làm một vị trí cụ thể, bạn được quyền tự lựa chọn vị trí trong dây chuyền sản xuất nhưng bù lại sẽ không ai chỉ từng thao tác cho bạn nữa. Lúc này một là bạn không thể làm ở vị trí nào cả vì bạn không thể tự nhận ra được vị trí nào thì phải làm gì, hai là bạn có thể làm ở bất kì khâu nào vì bạn có thể học cách người ta làm thông qua quan sát những công nhân khác. Đây chính là trường hợp ứng với Machine Learning, máy không được lập trình cụ thể, nhưng nó được lập trình để có thể học.
###     b. Data Science:
- Đây là ngành khoa học nghiên cứu dữ liệu để có thể trích xuất được thông tin, kiến thức từ dữ liệu đó hay hiểu chúng một cách tường tận. (Quả là một định nghĩa mơ hồ và khó hiểu không kém so với Machine earning). Ví dụ nào:
    - Bạn là một thám tử, bạn thu thập được rất nhiều thông tin từ hiện trường vụ án, bạn nhận được dữ liệu lịch sử của các đối tượng tình nghi, và nhiều loại dữ liệu khác nữa. Không giống như Machine Learning, bạn sẽ là người hiểu chúng, bạn có thể sử dụng Machine Learning để đưa ra một vài kết luận, nhưng nòng cốt là bạn, không phải cái máy. Khi hiểu và có được những chứng cứ quan trọng từ đống dữ liệu kia, bạn sẽ đi trình bày với cảnh sát hay toà án. Chứng cứ quan trọng tương ứng với khả năng trích xuất thông tin từ dữ liệu, đưa ra kết luận về người phạm tội cũng như hiểu tường tận những gì xảy ra trong vụ án chính là khả năng hiểu dữ liệu một cách tường tận.

###     c. Same data, diffirence problem:
 - Hãy xem thử tập dữ liệu sau: 
 

| Size of house (m2) | # of bedroom | # of bathroom | newly renovated | price (1000$)
| ------- | ----- | ----- | -------- | -------- |
| 49     | 1     | 2     | N| 115 |
| 60     | 1     | 3     | N| 150 |
| 65     | 2     | 1     | N| 210 |
| 96     | 3     | 3     | Y | 280 |
| 213   | 4     | 4     | N| 355 |
| 236   | 4     | 5     | Y | 440 |


 - Với dữ liệu như trên bạn có thể làm gì ?
 - Trả lời: 
     - Bạn có thể dự đoán giá nhà thông qua mô tả về diện tích ngôi nhà, số lượng các phòng và gần đây có được cải tạo không ?
     - Liệu với căn nhà hiện tại bạn có nên cải tạo để bán được giá hơn không ?
     - Bạn muốn xây một căn nhà với diện tích cụ thể thì nên xây bao nhiêu phòng để bán được giá hơn ?
 - Đây là 3 câu hỏi bạn có thể trả lời được với bảng dữ liệu trên, nhưng trả lời chúng như thế nào ? Theo hướng của Data Science hay Machine Learning.
     - **Câu 1**: Bạn có thể trả lời được nếu dùng Data Science, nhưng nếu bạn muốn xây dựng một hệ thống dự đoán giá nhà, thì không thể một người am hiểu dữ liệu trên ngồi dự đoán nhà với từng yêu cầu được. Hệ thống này xịn nhưng chạy tốn cơm quá. Chính vì thế bạn nên dùng Machine Learning, máy chạy chỉ tốn điện thôi. Với đây là một bài toán Supervise Learning điển hình với input là dữ liệu dạng bảng.
     - **Câu 2**: Tương tự như câu 1, hiển nhiên dùng Data Science có thể làm được nhưng nếu muốn xây dựng một hệ thống đưa ra lời khuyên có cải tạo nhà không thì bạn có thể dùng Machine Learning. Nhưng ở đây không như câu 1, đầu ra của bạn chỉ là có/không cải tạo nhà. Tức là chỉ có 2 giá trị có thể xảy ra. Nếu như cải tạo lại nhà luôn bán được giá, thì chẳng phải máy tính chả cần học, chỉ luôn đoán là "có" là được sao. Đây là một tri thức được đúc kết từ dữ liệu, và nó bất biến. Khi đó chỉ đơn thuần bạn trình bày lại cho ban giám đốc, họ sẽ biết phải làm gì thay vì dựng cả một hệ thống đồ sộ.
     - **Câu 3**: Trong trường hợp này thì bạn có thể thấy nhà nhiều phòng thì đắt hơn, nhưng vì diện tích nhà bị giới hạn nên số phòng không thể nhiều hơn một cách thoải mái được. Tức là với mỗi căn nhà câu trả lời sẽ không giống nhau. Vậy nên giống câu 1, bạn hay dựng một mô hình Machine Learning dự đoán số phòng nên xây thì hơn !
 - Các bạn có thể thấy, cùng một tập dữ liệu, chúng ta có thể mong muốn nhiều thông tin khác nhau, có lúc nên dùng Machine Learning, có lúc nên dùng Data Science. Vậy nên thường thì trong công ty, 2 lĩnh vực này sẽ được phân thành các role khác nhau. Researcher hay Engineer Machine Learning có thể sẽ không làm công việc của Data Science và ngược lại.
# 2. AI Role:
- Trong các công ty làm về hay có nhóm làm về AI sẽ có nhiều role khác nhau. Vai trò của những role này nhìn chung sẽ có đôi chút khác biệt giữa các tổ chức, nhưng về cơ bản thì có vài role chính như sau: 
- **Machine Learning:**
    - *Machine Learning Researcher*: Đây là các thánh trong team, nhiệm vụ của họ là đưa độ chính xác của hệ thống AI lên một tầm cao mới (họ có thể xây dựng giải thuật mới). Thường là các đột phá như các nhóm Deep Mind (Google) hay Open AI (đội của Elon Musk). Thuật ngữ đại diện cho thành tựu này là SOTA - State of The Art.
    - *Machine Learning Engineer*: Đây là các kĩ sư vừa có kĩ năng về áp dụng Machine Learning (chỉ là áp dụng thôi) vừa có kĩ năng về hệ thống. Biết làm sao cho hệ thống chịu tải tốt, áp dụng kết quả của các Researcher vào hệ thống của bạn. 
- **Data Science:**
    - *Data Analyst*: Đây là người đóng vai trò giúp bạn phân tích dữ liệu. Loại bỏ dữ liệu dư thừa hay bị nhiễu (dữ liệu do người dùng nhập sai có chủ ý hay từ những cảm biến bị hỏng), phân nhóm dữ liệu...
    - *Data Engineer*: Tương tự như Machine Learning Engineer thì đây là kĩ sư có kiến thức về dữ liệu (hiểu về các loại hình, cấu trúc dữ liệu...) cũng như kiến thức về hệ thống. Họ có khả năng xây dựng cấu trúc dữ liệu mang lại hiệu quả cao, xây dựng data warehouse, hệ thống phân tán (để giúp lưu trữ dữ liệu tại nhiều nơi mà vẫn đảm bảo tốc độ truy cập)..
    - *Data Scientist*: Đây là những người sẽ giúp bạn hiểu tường tận về dữ liệu, trích xuất thông tin từ đó đưa ra lời khuyên cho business.
    
# 3. AI has many tools:
- Những thứ tôi nói với bạn về AI không chỉ dừng lại ở Machine Learning hay Supervise Learning mà còn rất rất nhiều thứ khác. Chẳng hạn: 
    - *Unsupervise Learning* (Đây là các phương pháp không cần dữ liệu được gán nhãn)
    - *Reinforcement Learning* (Đây là các phương pháp không đưa dữ liệu thủ công cho máy mà cho chúng cả một thế giới để tương tác tựa như cho trẻ tự học hỏi từ thế giới mà không cần sự chỉ bảo của người lớn)
    - *Graphical Models* (Đây là các phương pháp mà người dùng thay vì tạo ra bài toán tương ứng với các giải thuật của AI sẽ mô hình hoá vấn đề mà bạn muốn giải quyết rồi từ đó xây dựng giải thuật)
    - *Planing, knowledge graph*...
- Trong bài viết tiếp theo chúng ta sẽ tiếp tục tìm hiểu về AI company, điều gì tạo nên một công ty về AI. Hẹn gặp lại các bạn trong tương lai gần :smiley: