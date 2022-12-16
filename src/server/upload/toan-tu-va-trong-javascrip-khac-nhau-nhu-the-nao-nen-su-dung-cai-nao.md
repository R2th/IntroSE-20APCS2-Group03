Trong một lần đi phỏng vấn Full-Stack Developer mình đã được đặt câu hỏi toán tử == và === trong javasrip khác nhau như thế nào và nên dùng toán tử nào. Và tất nhiên mình không trả lời được cuối cùng  là bị tạch :v. Vậy nên mình đã về tìm hiểu và lên đây chia sẻ với ae, mong là đừng ae nào đi phỏng vấn rơi vào trường hợp như mình :)))). Bắt đầu luôn nhé !!!

# Toán tử ==

toán tử == dùng để kiểm tra xem 2 phần tử được kiểm tra đó có bằng nhau không, nhưng nó chỉ xét về giá trị mà không quan tâm đến kiểu dữ liệu của 2 phần tử đó
 
 ví dụ:  
 
-![](https://images.viblo.asia/61615c95-b733-4cc5-ab4a-96d4e1cbff88.PNG)

ở ví dụ trên thì ra true là đương nhiên vì hai phần tử có giá trị là 10 và cùng là kiểu số. tiếp nhé 

![](https://images.viblo.asia/97633c6b-51d8-4f0f-a187-137da4cdd6aa.PNG)

trường hợp này kết quả vẫn ra true mặc dù chỉ có giá trị là giống nhau còn kiểu dữ liệu  một bên là kiểu số một bên là kiểu chuỗi.

Lần này mình sẽ lấy ra một ví dụ về một số giá trị đặc biệt như:  
   1. False : kiểu  boolean, giá trị là false
    2. 0 : kiểu  số giá trị là 0 
    3. "" : kiểu chuỗi giá trị là rỗng 
    
   Nhưng khi sử dụng toán tử == tất cả các giá trị trên sẽ được ép về kiểu boolean với giá trị là false
   vì thế sẽ có kết quả như sau.
   ![](https://images.viblo.asia/b0814f79-ff0a-4178-a639-c8a5da558d9b.PNG)
   
   Nãy giờ toàn lấy về trường hợp true giờ mình sẽ lấy ví dụ về trường hợp false, đơn giản là khi hai phần tử có giá trị khác nhau thì sẽ trả về false :)
   
![](https://images.viblo.asia/045a6d1d-4c2a-4d4b-a59a-1fb815baeec6.PNG)


   
   tiếp theo chúng ta tìm hiểu về toán tử === !!!
   
   # toán tử === 
   
   Toán tử === cũng dùng để so sánh xem hai phần tử có bằng nhau không nhưng "nghiêm ngặt " hơn ==. Vậy nó "nghiêm ngặt"  hơn ở điểm nào ???  chúng ta cùng tìm hiểu qua ví dụ sau nhé :)
   
   
![](https://images.viblo.asia/3e1b6f95-c7b3-454b-a761-f7e71ce62d3c.PNG)

cũng ví dụ này ở trên toán tử == cho ra kết quả true nhưng toán tử === lại cho ra kết quả false vì toán tử === không chỉ so sánh giá trị của hai phần từ mà nó còn so sánh cả kiểu dữ liệu của hai phần tử đó. Đó chính là tính nghiêm ngặt của ===.

Một vài ví dụ nữa về === 

![](https://images.viblo.asia/87cf1664-bef5-4cf2-ac0d-63dd524e063a.PNG)

# Kết luận 
Như vậy mình và các bạn đã cùng tìm hiểu về toán tử == và === trong javascrip, có thể hiểu một cách ngắn gọn như sau với == thì chỉ quan tâm đến giá trị xem hai phần tử so sánh đó có bằng nhau không còn === thì "nghiêm ngặt" hơn ngoài so sánh giá trị n còn quan tâm đến cả kiểu dữ liệu của các phần tử được so sánh.
Vậy nên dùng == hay ===. Theo mình thì nên sử dụng toán tử === thay cho toán tử ==. Nó sẽ giúp bạn tránh được những vẫn để đau đầu liên quan đến giá trị, không phải ghi nhớ cách ép kiểu giá trị đặc biêt trong toán tử ==.
# Tài liệu tham khảo 

[](https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a)