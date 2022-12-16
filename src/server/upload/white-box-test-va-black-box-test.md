Trong kiếm thử phần mềm, có rất nhiều kỹ thuật được sử dụng. Người ta phân loại chúng dựa vào tiến độ, kỹ thuật, vào chất lượng sản phẩm cần hướng tới. 
Trong bài viết này mình xin được giới thiệu cũng như so sánh 2 loại test được phân chia theo kỹ thuật kiểm thử đó là white box test và black box test.

![](https://images.viblo.asia/cc8affd8-3550-4ec3-b24e-2acaa2bd1ddb.jpg)

 I. Black box test
1.Định nghĩa.
- Black box testing là một phương pháp kiểm thử phần mềm mà việc kiểm tra các chức năng của một ứng dụng không cần quan tâm vào cấu trúc nội bộ hoặc hoạt động của nó.
- Đối tượng kiểm thử: Là thành phần phần mền có thể là 1 hàm chức năng, 1 modul chức năng, 1 phân hệ chức năng...

2. Phương pháp thử nghiệm.
Dựa vào chức năng, Black box test có thể được áp dụng hầu hết trong mọi cấp độ như Unitest, Intergration test, system test,...

3. Đặc điểm.
- Là phương pháp kiểm thử dựa theo thông tin duy nhất về các đặc tả về yêu cầu chức năng.
- Người kiểm thử không nhất thiết phải có kiến thức về mẫ hóa, cấu trúc bên trong thành phần phần mềm cũng như không cần biết về lập trình.
- Việc kiểm thử dựa trên yêu cầu về Output, phần mềm làm được gì, có đạt yêu cầu người dung hay không.

4. Ưu điểm
- Các tester khi dùng phương pháp này sẽ không cần phải hiểu và biết đến code.
- Có thể tìm được nhiều bug hơn.
-  Việc kiểm thử được thực hiện bởi một cách độc lập với các Dev, cho phép quan điểm khách quan và tránh sự thiên vị.

5. Nhược điểm:
- Chỉ có một số lượng nhỏ các đầu vào có thể được kiểm tra và nhiều đường dẫn chương trình hoặc 1 vài phần cuối sẽ không được kiểm tra.
- Các thử nghiệm có thể thừa nếu dev phần mềm đã chạy thử nghiệm.

II. White box test
1. Định nghĩa
- While box test là phương pháp thử nghiệm phần mềm, trong đó các thiết kế, cấu trúc giải thuật bên trong, và việc thực hiện các công việc đều được biết đến.
- Đối tượng là 1 thành phần của phần mềm (1 chức năng, 1 module chức năng, 1 phân hệ chức năng....)

2. Phương pháp thử nghiệm.
Dựa vào thuật giải cụ thể, vào các cấu truc dữ liệu bên trong cảu đơn vị phần mềm để xác định xem đơn vị phần mềm đó chạy có đúng không. 

3. Đặc điểm.
- Là phương pháp kiềm thử dựa vào giải thuật, cấu trúc bên trong chức năng của thành phần phần mềm tương ứng. 
- Thích hợp dùng  cho kiểm thử đơn vị Unit test.
- Ngưới test phải có kiến thức nhất định về việc mã hóa ,cấu trúc bên trong của chức năng, biết lập trình phần mềm. 
- Việc kiểm thử được tiến hàn dựa vào việc kiểm tra xem giải thuật, mã lệnh có được thực hiện đúng hay không. 

4. Ưu điểm:
- Dễ dàng tự động hóa
- Cung cấp các quy tắc dựa trên kỹ thuật rõ ràng cho thời điểm ngừng thử nghiệm.
- Buộc các chuyên gia thử nghiệm phải suy luận cẩn thận về việc test lỗi vì vậy lỗi sẽ được triệt để.

5. Nhược điểm:
- Khá tốn thời gian và công sức.
- Vẫn sẽ tồn tại lỗi.
- Để kiểm tra được bằng phương pháp này cần có kinh nghiệm và trình độ chuyên sâu về kiểm thử.