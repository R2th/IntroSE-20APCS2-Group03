...Tiếp sau khi bài viết mà mình đã từng viết trước đó về hệ gợi ý ở đây [Làm quen với hệ gợi ý](https://viblo.asia/p/bat-dau-lam-quen-ve-he-goi-y-recommender-system-3Q75w8rGKWb)
Chúng ta có 4 kỹ thuật chính để sử dụng cho hệ gợi ý :
* Collaborative Filtering ( Lọc cộng tác )
* Content Based  ( Lọc dựa trên nội dung )
* Knowledge-based recommendation
* Hybrid ( Kết hợp của cả 2 phương pháp trên ...)

Lần này chúng ta sẽ tìm hiểu về Collaborative Filltering .   Đây là một trong những PP được sử dụng sớm nhất.
Bắt đầu nhé !!!
### Định Nghĩa :
Gợi ý dựa trên những điều người dùng quan tâm trong quá khứ.   
Ví dụ : A, B có 1 lịch sử mua hàng trùng lặp, A mới mua 1 cuốn sách => gợi ý cho B mua nó và ngược lại !!!   
2 item X, Y này được người dùng đánh giá điểm rất giống nhau, tuy nhiên người  dùng này chỉ mua X mà chưa mua Y => Gợi ý cho họ mua Y
###       Các bước giải quyết vấn đề 
1.  Xác định được sự giống nhau giữa 2 user-user 
2.  Tính toán mực độ quan tâm của user lên 1 item nào đó 
### Ví Dụ 
Ở ví dụ này tôi sử dụng kỹ thuật User-based nearest neighbor recommendation. Được gọi là khuyến nghị hàng xóm   
Ý tưởng chính là : Cung cấp một cơ sở dữ liệu xếp hạng và ID của người dùng hiện tại, xác định các người dùng khác có sở thích tương tự. Từ đó chúng ta có một loạt người dùng ngang hàng, với mọi sản phẩm người dùng đó chưa thấy các tính toán về độ quan tâm sử được dựa trên nhóm người dùng ngang hàng đó 

![](https://images.viblo.asia/34c50911-2be0-4f85-bf4f-d48360665bda.png)

Bây giờ cần phải xác định là : Alice có thích item5 hay không ?   
Trước tiên ta quy ước : U={u1,...,un} là tập hợp các user, P={p1,...,pm} là tập hợp các sản phẩm, R là ma trận n * m với n , r(i, j) với i thuộc 1 ... n, j thuộc 1 ... m.   
1 có nghĩa là cực kỳ không thích, 5 cực thích . 

Đầu tiên: Chúng ta cần tính độ tương tự  giữa 2 user .  Lần này tôi sử dụng tương quan Pearson 
![](https://images.viblo.asia/c49e7c5b-2660-4fcd-91d8-eff5c741a4fd.png)
Ký hiệu r(với dấu gạch ngang ở trên ) là giá trị điểm trung bình mà a cho với các sản phẩm.     Điều này để tăng thêm sự chính xác vì trong thực tế, bạn rất sành trong việc mua sản phẩm nên cho điểm khó tình, ngược lại tôi chỉ toàn cho 5*, hay 5* mặc dù chưa quá hài lòng. Điều này làm cho việc tính sự tương đồng trở nên chính xác hơn. 

Độ tương tự giữa Alice và user1 được tính như sau:  (Alice là a, user1 là b)
![](https://images.viblo.asia/a74f2fe4-6201-42fc-8238-25f5946da4a5.png)
Lần lượt tính toán độ tương tự giữa Alice và các user còn lại kết quả như sau:
* User2 là 0.70
* User 3 là  0.00
* User4 là −0.79

Lưu ý : Độ tương ứng theo tương quan Pearson sẽ nằm từ +1 (mạnh) đế -1 (yếu) 
Qua tính toán ta thấy user1, user2, user3 khá là giống nhau và có thể dùng để tính toán mực độ yêu thích của Alice với item5.
Đây là biểu đồ dựa trên bảng rate : 
![](https://images.viblo.asia/e55715f8-7b8e-4431-8a85-b713ede95d73.png)
Có thể thấy rõ Alice và User1 có sự tương đồng trong đồ thị. 

Bước 2 : Sau khi đã có được kết quả của mức độ liên quan giữa các user , ta thấy có 3 user tương đồng nhau ( các User ngang hàng ) Alice, User1, User2.  
Do đó ta sẽ tính độ quan tâm của Alice với item 5 dựa trên User1 và User2 

![](https://images.viblo.asia/56998e64-8729-4ac7-945a-e0871e93cb8d.png)

Và đây là kết quả của dự đoán điểm số mà Alice sẽ dành cho item5. 
![](https://images.viblo.asia/53106e44-ee5b-4842-aaa7-7506e64d6379.png)
Và từ số điểm trên chúng ta sẽ đề xuất nó với Alice và khả năng cao Alice sẽ thích item5.

Tuy nhiên như chúng ta đã biết có 1 số lĩnh vực luôn có một số mặt hàng được tất cả mọi người ưa thích ví dụ : trong bóng đá là Ronaldo, Messi. Trong phim thì là Tây du Ký... Lúc đó Tương quan Pearson có thể không còn là lựa chọn tốt nhất 

Người ta cũng chứng minh được rằng các dự đoán dựa trên xệp hạng của hàng xóm mà người dùng (muốn gợi ý)  chỉ đánh giá một vài điểm chung là một lựa chọn tồi !!!

Và chỉ khi có từ 20-50 người dùng ngang hàng thì có vẻ sự hợp lý được cải thiện. 

Đối với các kỹ thuật khuyến nghị dựa trên mô tả sau này, biện pháp Cô-Si luôn vượt trội.
Nhân bài viết này ta sẽ sử dụng cách tính theo công thức Cô-Si để xem kết quả ra sao nhé :
### Cách tiếp cận khác
Tại sao cần tiếp cận khác ! Chúng ta thấy trong thương mại điện tử chúng ta xử lý hàng triệu người dùng và hàng triệu danh mục. 
Do đó cần phải quét lượng lớn hàng xóm tiềm năng cho nó và phải tính toán nó trong thời gian thực . Điều này thật khó khăn !

Tuy nhiên ta sẽ gợi ý dựa trên Item-based nearest neighboor recommendation. So sánh các mặt hàng khác với măt hàng giống item5 . Dựa vào xếp hạng của user này cho sản phẩm gần liên quan đến nó và dự đoán . Đây là công thức Cô-Si


![](https://images.viblo.asia/f2e3fb22-6b40-4829-9584-26545fe91ccd.png)


Giá trị này nằm từ 0-1 . Ta có thể thấy Vetoc a nhân vector b (vô hướng)/ độ dài của vector a * độ dài vector b :)

![](https://images.viblo.asia/43c1c632-ae7e-4dbe-ad38-ba3737f8861e.png)

Tuy nhiên để giải quyết vấn đề giá trị trung bình điểm số của các user . Ta sẽ tính trung bình điểm của user đó, sau đó lấy số điểm ban đầu trừ trung bình. 
Ta có công thực được tinh chỉnh : 
![](https://images.viblo.asia/54c935cc-93bf-45ed-8a71-79bb7440cd20.png)

Đây là kết quả độ tương đồng giữa item 5 và item 1: ![](https://images.viblo.asia/1c38b736-19fd-44b1-aafd-d301adfcc513.png)

Và cuối cùng đây là điểm dự đoán của user u cho sản phẩm p theo công thức : 
![](https://images.viblo.asia/64280a62-b11a-468d-9c6b-178819aa2495.png)

Như vậy chúng ta đã nắm được 2 cách trong kỹ thuật lọc cộng tác dùng cho Recommendation System . Về lọc cộng tác dựa trên sản phẩm  đã được sử dụng tại Amazon.com năm 2003 khi đó với 29 triệu người dùng. Tuy nhiên dó có một số hạn chế ....


### Hạn chế 
Trong 15 năm qua vẫn luôn có những câu hỏi đối với CF và hạn chế của nó ...
1. Thuật toán gặp vấn để khi không mở rộng tốt cho cả khi số lượng người dùng tăng, sản phẩm tăng
2. Khi có hàng triệu khách hàng và sản phẩm thì việc tính toán thời gian thực là không thể  
3. Thực tế là ma trận Rated là ít và dẫn đến kết quả sai nên kết hợp với các thông tin bên ngoài , chẳng hạn như hybrid
4. Khi người dùng chỉ có một vài đánh giá ít ỏi thì giải quyết thế nào ?
### Lợi Thế :
1. Không cần sử dụng kiến thức về sản phẩm , và người dùng
2. Không cần nạp thông tin về sản phẩm vào hệ thống để xử lý 
### Tham khảo :
Bài viết tham khảo tạo cuốn sách Recommender Systems: An Introduction
Book by Alexander Felfernig, Dietmar Jannach, and Markus Zanker