Khi mình còn lập trình C/C++, mình được học khái niệm con trỏ hàm và vận dụng viết các chương trình có khả năng tùy biến cao. Cho đến nay các ngôn ngữ hàng top như Python JavaScript vẫn còn giữ nó như là một cách viết mã hướng hàm thủ tục. Cách viết này người ta còn đặt tên là Functional Prototype Programming

![123123123123.PNG](https://images.viblo.asia/bd6f51e6-b55f-4bb3-a322-af44b7805b37.PNG)  
> Tạm dịch: hàm nguyên mẫu là một mẫu hoặc mô hình của sản phẩm được xây dựng để kiểm tra một khái niệm hoặc quy trình hoặc hoạt động như một phương tiện trực quan để được nhân rộng, cải tiến và học hỏi  😱*đọc xong muốn xỉu khó hiểu thiệc*
  
## Nội dung bài viết
- phần 1: (what how) trình bày cách viết functional prototype trong các ngôn ngữ Python C++ JavaScript
- phần 2: (why) tại sao lại viết như vậy, có ích gì ?
- phần 3: @Functional trong Java8 với biểu thức lambda, cách lập trình hàm thủ tục cho lập trình viên Java  


-----


## Phần 1: viết functional prototype trong Python C++ JavaScript
Mình chia làm 3 bước:
 - bước 1: khai báo một hàm
 - bước 2: khởi tạo một biến có kiểu dữ liệu là hàm, gán biến cho hàm đã được khai báo
 - bước 3: gọi biến hàm chạy
 

-----


 ![js.PNG](https://images.viblo.asia/5131ee34-9fa7-4973-8659-c02d2d45fe05.PNG)  
 ![c++.PNG](https://images.viblo.asia/873785d6-4bf1-4487-9efe-fda93f9b14f1.PNG)  
 ![py.PNG](https://images.viblo.asia/ddcd5324-e5b4-4e0f-8411-8d1a393eb9ac.PNG)  


-----


Trong JavaScript, biến f này được hiểu có kiểu dữ liệu là function  
![22.PNG](https://images.viblo.asia/17c7eef1-f5f1-4990-b85b-9f16e58713a9.PNG)  
Trong python mọi thứ đều là đối tượng , biến f được hiểu là một instance của class Function  
![1234.PNG](https://images.viblo.asia/e138af54-9476-473d-9a12-402760d7ab89.PNG)

*Học nhiều ngôn ngữ cho mình nhìn nhận kiến thức một cách tổng quan hơn*😊
 

-----
## Phần 2: tại sao lại viết như vậy ?
Này hơi khó giải thích. Mình lấy ví dụ trong đời sống để dễ hình dung. Nhà mình có một chiếc máy giặt. Mình muốn giặt đồ, việc đầu tiên là mình cho đồ vào máy, sau đó mình setup cho máy giặt sẽ chạy như nào.  
![DSC1376-1618396244.jpg](https://images.viblo.asia/6673eb20-3c31-4dad-8803-1ec7e039c1a4.jpg)     
Mình mô tả code như sau:  
![22221.PNG](https://images.viblo.asia/a5855625-9fe8-4961-8a72-ad04b33500bb.PNG)  
Mình muốn máy giặt sẽ chạy như nào thì nó sẽ chạy theo mình ý đó. Mình chỉ cần nạp vào máy chương trình của mình thông qua tham số vào chương trình máy giặt. Đấy, vậy là chương trình của mình trở nên **linh hoạt** nhiều rồi 

-----
## Phần 3: Lập trình functional prototype trong Java8
Mình làm tương tự các bước ở trên đã làm vào trong Java  
- Bước 1: Mình khai báo cấu trúc hàm vào trong một interface, interface này chỉ nên gồm 1 phương thức duy nhất  
- Bước 2: Hiểu interface như là một kiểu dữ liệu hàm, tạo một biến hàm và gán giá trị như một hàm  
- Bước 3: gọi hàm chạy  
  
![123123123123123.PNG](https://images.viblo.asia/f52f8e6f-4884-4a3a-a788-63e6ef8c0c21.PNG)  
Giống y như JavaScript vậy, thật đơn giản đúng không nào. Đây gọi là biểu thức lambda, một biểu thức lambda bao gồm : ngoặc hàm ( )  +  mũi tên --> + block code. Chúng ta sẽ hay gặp kiểu code này trong việc set sự kiện clickOn(), bài toán sắp xếp trong nhiều ngôn ngữ lập trình. Ngoài ra trong Java và JavaScript, khi xử lý một tập hợp, ta sẽ gọi các phương thức xử lý mà tham số sẽ truyền vào là một biểu thức hàm. Kỹ thuật này người ta gọi là **CallBack**  
![hi.png](https://images.viblo.asia/dd4b74f6-4d14-4ab5-8f4b-59ce51a56413.png)  
Hàm này truyền vô cái hàm này, cái hàm này chạy xong rồi thì mới tới cái hàm kia chạy. Vậy hàm này chạy sau. Được chạy sau vì gọi sau cho nên gọi là CallBack *nghe xỉu thiệt*😂😂 
Với Java8, để chắc chắc ta sẽ tạo ra một interface đại diện cho Function (chỉ gồm 1 phương thức). Ta thêm Annotation @FunctionalInterface trước interface đó để tránh lỗi biên dịch sai cần thiết. Ngoài ra còn nhiều kiến thức về biểu thức lambda nữa nhưng ngoài phạm vi bài viết này. Hẹn gặp lại các lập trình viên Java thân yêu ở các bài viết sau


-----

Nếu các bạn thấy hay, hãy để lại bình luận để mình có những bài viết tốt hơn. Chúc các bạn môt ngày vui vẻ 😘