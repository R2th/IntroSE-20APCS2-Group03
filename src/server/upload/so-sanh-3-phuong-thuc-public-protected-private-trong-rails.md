# Khái Quát Về Public, Private, Protected
Đầu tiên, khi nhắc đến tính bao đóng ( đóng gói ) trong các ngôn ngữ ta hình dung đến các phương thức này.
Các phương thức public, protected và private nó đặc trưng cho tính bao đóng trong OOP tức là đề cập đến khả năng truy cập của các phương thức.
Mặc định, tất cả phương thức đều ở trạng thái public. Nếu không chỉ định khả năng truy cập của phương thức, nó sẽ là public.
Phương thức protected và private không thể truy cập một cách tự do, và do đó khi có một thể hiện của đối tượng, bạn sẽ không thể gọi được các phương thức đó.
# 1. Public
- Với phương thức public thì chúng ta có thể gọi method đó ở bên ngoài class, sử dụng trong class đó và ở tính kế thừa thì class con có thể gọi được method public từ class cha và sử dụng nó.
- Mặc định các method khi không khai báo thì nó đều mà public method vì thế chúng ta sẽ có 2 cách để khai báo phương thức public đó là 

![](https://images.viblo.asia/f5df9f24-d6e0-4057-a671-1eaa37fd36fd.png)
![](https://images.viblo.asia/ec2e5876-d83c-4c62-b801-66c0944ea8f8.png)
 
- Mình sẽ lấy ví dụ về phương thức public để các bạn dễ hiểu 
- VD1:

![](https://images.viblo.asia/a5f9d888-e902-4aad-865b-a7861d3539e7.png)
+ Kết quả:    
![](https://images.viblo.asia/1b2d87e6-00af-44f9-b65c-9cbe510d2271.png)
- VD2:

![](https://images.viblo.asia/ec45342d-00b0-4596-b834-c308a3fbf151.png)
+ Kết quả:  
![](https://images.viblo.asia/8ea5ee69-e99d-4146-9255-614729c08ebe.png)

# 2. Protected
- Với phương thức protected thì chúng ta không thể gọi method đó ở bên ngoài class và chỉ được phép gọi nó bên trong class và các class con kế thừa nó.
- Câu hỏi đặt ra:  Nếu như vậy thì làm sao để ta có thể get dữ liệu từ method protected như vậy trong khi không gọi nó bên ngoài được ?
* Theo mình tìm hiểu thì protected nó thể gọi get dữ liệu như sau:
    + Sử dụng method public gọi lại method protected để lấy dữ liệu
    + VD1
   
     ![](https://images.viblo.asia/ca49c996-2884-4424-b3f8-e6bf9d7591a7.png)
     + Kết quả: 
     
    ![](https://images.viblo.asia/2c61f170-59c9-41fb-ad3a-344b6944cad8.png)
     + VD2
     
     ![](https://images.viblo.asia/68507c41-bb80-4bdc-b51b-fceecb931c93.png)
     + Kết quả: 
     
     ![](https://images.viblo.asia/2c61f170-59c9-41fb-ad3a-344b6944cad8.png)
#      3.Private
- Tương tự với phương thức protected thì chúng ta không thể gọi method đó ở bên ngoài class và chỉ được phép gọi nó bên trong class và các class con kế thừa nó.
- Cùng với câu hỏi đặt ra ở protected là :  Nếu như vậy thì làm sao để ta có thể get dữ liệu từ method protected như vậy trong khi không gọi nó bên ngoài được ?
- Thì nó có điểm khác với protected là nó không thể sử dụng bằng cách self.name_method
+ Ví dụ cho thấy sự khác nhau giữa private và protected, đối với protected thì sử dụng self nó vẫn hoạt động tốt còn private thì không nó sẽ lỗi.

![](https://images.viblo.asia/cad1d915-0b2d-4409-a30f-88270fb38e5b.png)
   + Kết quả: 
![](https://images.viblo.asia/aa60de5f-899b-40e7-81c5-46d7c43a3cbf.png)

+ Ví dụ để get dữ liệu từ 1 method private bình thường 
+![](https://images.viblo.asia/45b132f0-9616-4a98-82a0-0823b2b41e7b.png)
     + Kết quả: 
     
   ![](https://images.viblo.asia/2c61f170-59c9-41fb-ad3a-344b6944cad8.png)
   
#    Tổng quát
Đối với một lập trình viên thì mình nghỉ  các phương thức của method là cái không thể thiếu. 
mình hi vọng qua bài viết này các bạn có thể hiểu sâu hơn về các phương thức đó. Cảm ơn bạn đã đọc 
> Happy coding :sunflower: