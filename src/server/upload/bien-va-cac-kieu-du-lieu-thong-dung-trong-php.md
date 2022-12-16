**1**. **Biến**

Trong PHP, để khai báo biến ta sẽ viết dấu đô-la ($) đằng trước nó, và dữ liệu được khai báo sẽ đứng sau dấu bằng (=). Khi gọi biến ra, ta cũng viết tên biến kèm theo dấu $. Ví dụ bạn thử viết đoạn sau vào tập tin index.php trong theme thử nhé:

![](https://images.viblo.asia/2e545628-fcaa-463f-80cb-81edcd03bf8d.PNG)

Như vậy nghĩa là chúng ta đã tạo ra hai biến tên là $name với giá trị là tên của website và $url với giá trị là địa chỉ của website. Cả hai giá trị này đều được lấy từ hàm get_bloginfo() trong WordPress mà hàm này sẽ có chức năng lấy thông tin của website chúng ta, về khái niệm hàm bạn sẽ hiểu hơn về nó ở bài viết giới thiệu hàm trong PHP.

Điều này cũng có nghĩa là trong tập tin index.php, bạn có thể sử dụng hai cái biến đã được khai báo để hiển thị các giá trị cần thiết thay vì viết lại giá trị. Ngoài ra biến cũng được sử dụng trong các mục đích khác như kiểm tra hoặc so sánh. Tóm lại biến là một giá trị dữ liệu có thể được thay đổi trong chương trình. Giá trị dữ liệu có thể là loại chuỗi (string), số tự nhiên (interger), số trôi nổi (float), logic (boolean), mảng (array), đối tượng (object) hoặc dữ liệu rỗng (NULL).

**2.** **Các kiểu dữ liệu**

* **Dữ liệu chuỗi (STRING)**

Kiểu dữ liệu string là một giá trị kiểu chuỗi văn bản, ví dụ như thiết lập tên, địa chỉ,… Khi viết chuỗi trong PHP, nó phải được đặt vào dấu nháy đơn (') hoặc nháy đôi (").

Dùng nháy đơn khi bạn in ra một chuỗi dữ liệu không chứa các ký tự đặc biệt và không có nhu cầu sử dụng các ký tự chuỗi đặc biệt.

Bạn nên dùng nháy đôi khi dữ liệu chuỗi bạn cần sử dụng các ký tự đặc biệt hoặc muốn khai báo tên biến vào mà không cần nối chuỗi.

* **Dữ liệu số tự nhiên  (INTEGER)**

Dữ liệu kiểu số tự nhiên khi khai báo sẽ không đặt trong dấu nháy đôi hoặc nháy đơn.

![](https://images.viblo.asia/82c6f3a4-f3df-4c1d-ba24-e02aafe7e286.PNG)

* **Dữ liệu mảng  (ARRAY)**

Đây là một kiểu dữ liệu rất quan trọng và thường được sử dụng nên ở đây mình chỉ nói khái quát, còn chi tiết sẽ có phần riêng cho nó.

Mảng nghĩa là tập hợp nhiều giá trị được chứa trong một biến. Mỗi giá trị sẽ có một khoá (key) riêng để đại diện cho nó.

![](https://images.viblo.asia/caa0d6b6-8910-433e-b1b6-91d9b2ef7f0d.PNG)

* **Dữ liệu đối tượng  (OBJECT)**

Đây là một loại dữ liệu nâng cao mà mình sẽ nói kỹ hơn ở phần lập trình hướng đối tượng (OOP). Một đối tượng nghĩa là một biến được tạo ra từ một lớp (class) code.

![](https://images.viblo.asia/c4c438a6-0a1c-498a-a2cd-14dbaab73935.PNG)

* **Dữ liệu  rỗng (NULL)**

Dữ liệu rỗng nghĩa là nó được khai báo trong bộ nhớ nhưng chưa có giá trị.

![](https://images.viblo.asia/fc1ad638-51d8-4890-87f4-b8ee0374a32c.PNG)

Cảm ơn đã đọc bài viết chúc các bạn thành công!

Tài liệu tham khảo: 

https://thachpham.com/wordpress/wordpress-development/bien-du-lieu-la-gi.html