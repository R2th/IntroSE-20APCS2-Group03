# Khi tính toán est một task, cũng có những trường hợp chúng ta chưa xác định được bản thân của task đó cần những gì, yêu cầu như thế nào, hay mức độ ảnh hưởng ra sao, dẫn đến hiện tượng sẽ khó để có thể est một cách chính xác. 


Vậy thì những trường hợp như thế, chúng ta phải est với cả những phần chưa xác định được rõ ràng ở trên, ở bài viết này tôi xin giới thiệu về một kỹ thuật để est được gọi là SRSS (tạm gọi là est 2 mức).

```
Law này đểu có thể apply được với đơn vị khi est dù là số man day, haystory point.
```

# Thời gian bình quân_thuận lợi  và thời gian trong trường hợp không thuận lợi_delay.
Bằng giác quan linh cảm, chúng ta sẽ đưa ra con số est ứng với mỗi task.

Chúng ta quy ước hiểu "bình quân" và  "không thuận lợi " lần lượt như dưới đây:
1. Thời gian bình quân sẽ done được task mà không gặp phải vấn đề gì so với dự tính trước đó.
2. Thời gian bao gồm cả trường hợp nếu như mắc phải vấn đề gì đó có gây ra ảnh hưởng ở một mức độ nào đó.

Có thể tưởng tượng  tồn tại với  2 mức 50% và 90%. 

1. Khoảng 50% thì có thể sẽ có khả năng over. 
2. Khoảng 90%  các bạn tưởng tượng mức độ nguy hiểm như thiên thạch rơi xuống trái đất và chúng ta sẽ bị hủy diệt (tất nhiên là khó có hiện tượng đó xảy ra), nhưng điều tôi muốn nhấn mạnh ở đây đó là khi có những điều xấu ngoài dự kiến xảy ra nhiều thì chúng ta sẽ phải làm như thế nào . 

# Problem khi buffer quá độ.
Vì chúng ta chưa chắc chắn xác thực 1 task nên việc cần thêm buffer là cần thiết không thể thiếu.

Ở đây, chúng ta sẽ bàn luận đến trường hợp nhiều task được thực hiện một cách tuần tự, không song song với nhau để phân tích và hiểu rõ hơn nữa. 

Hãy cùng tưởng tượng như là chỉ có 1 man, những task có những liên quan với nhau, nếu như không hoàn thành 1 task trước sẽ không thể tiếp tục được task tiếp theo. 

![](https://images.viblo.asia/e8d346e1-3bd2-47b3-83b0-9ada6600f2f3.PNG)

Nếu suy nghĩ một cách đơn tuần thì là chỉ cẩn est toàn bộ task với mức (2) 90% là ok nhưng chúng thấy rằng :

Tổng số thời gian với case phòng cho rủi ro xảy ra là 15 tiếng, liệu thời gian này có hợp lý, có thỏa đáng. 

Giả sử rằng est với 50% - 90% là chính xác (chính xác ở đây cũng vẫn với nghĩa là dựa trên cảm tính vừa đưa ra).

Nếu như vậy, về tính hiệu suất thì est với mức 50% thì task cũng sẽ được done và phần buffer chắc chắn sẽ không cần thiết. 

Vậy thì khoảng time là 15 tiếng phải chăng mang tính chất quá bi quan, đưa ra để phòng trừ trường hợp nào đó có thể xảy ra mà ta không đoán trước được.Nhưng nếu đứng trên mặt xét về cost thì như thế hoàn toàn ko hợp lý. 


Ví thế trong các phương pháp tính toán để đưa ra buffer thỏa đáng, thì việc apply SRSS law là một trong các phương pháp này. 

Điểm qua một chút về phương pháp mà chúng ta vẫn hay áp dụng từ trước tới nay . 
Thông thường chúng ta hay thấy cách est như dưới đây: 

![](https://images.viblo.asia/5ae3455a-b6dc-44d5-b5c1-c1d61130e93c.PNG)

Ở đây chúng ta thấy ứng với góc độ của từng task đều sẽ có những lượng buffer cần thiết. 
Vậy thì số lượng đầu task càng lớn, đồng nghĩa với tính không xác thực càng cao. Sẽ có những băn khoăn như là, có đúng task C cần tới 21 point or giảm bớt 1 chút có lẽ sẽ tốt hơn chăng. Sẽ rất khó để phán đoán và đánh giá . 

# Luật SRSS (Sử dụng độ dài của đường chéo)

Lượng bất ổn = ("t.h không thuận lợi" - "bình quân"- )^2  tương ứng với mỗi task, cuối cùng là sẽ lấy được con số buffer hợp lý.  Với trường hợp có số thập phân, chúng ta có thể làm tròn lên. 

![](https://images.viblo.asia/b4559ee3-fe20-417f-a9f1-682976ce21a8.PNG)


So với việc chỉ thêm vào 15hours với case phòng rủi ro, thì ở đây buffer là 13. Với mức này, chắc chắn là ko vấn đề gì. 

# Tạo sao lại là Đường Chéo ??
Luật SRSS giống như công thức tính chiều dài của đường chéo của hình lập phương or hình chữ nhật. Vì thế chúng ta có thể dễ tưởng tượng được. 
Ví dụ như với 2 task có  ("t.h không thuận lợi" - "bình quân") tương ứng là "3" và "4", thì buffer sẽ là 5 theo công thức tính chiều dài của tam giác vuông dài rộng là 3x4.

![](https://images.viblo.asia/54e65cfb-a0f9-4b0a-898d-ad74723c98d9.PNG)

Cũng với cách tưởng tượng như vậy, với 3 task với  giá trị  ("t.h không thuận lợi"-"bình quân") tương ứng là "1" thì ta có giá trị là √(1^2+1^2+1^2) = 1.73205, giá trị này cũng giống với công thức tín đường chéo chủa hình lập phương với cạnh là 1x1x1.

![](https://images.viblo.asia/4823755a-aa69-4539-a6ea-5d221fb9e097.PNG)

Quay trở lại với Fingure1, chúng ta có thể tính được lượng buffer như sau : 

※ Lượng Buffer = Total "bình quân"+SQRT("lượng bất ổn") 
Như ở ví dụ trên :  9+SQRT(12)=13 vậy chúng ta hiểu được rằng đã est nhiều hơn so với lượng chúng ta đã est. 

Hơn nữa, nếu như khoảng cách giữa time "bình quân" và "không thuận lợi" càng lớn, thì sẽ được thể hiện ở lượng buffer ở đây là 3.46.
Nhìn vào lượng buffer này chúng ta có thể thấy được phần nào chúng ta đang est lỏng, hay chặt chẽ.

# CONCLUDE
Đây vẫn là một phương pháp dựa trên trực giác, nhưng nó không tốn quá nhiều thời gian, vì vậy được coi như một suggestion để định lượng buffer trong công việc.
Đương nhiên, những cách tính buffer phổ thông khác như x1.5 vẫn được apply và vẫn bảo đảm công việc, nhưng tôi khuyên bạn nên thử để có những nhận định khách quan tương ứng với từng phương pháp.