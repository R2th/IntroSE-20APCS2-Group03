## 7 thủ thuật giúp UI của bạn tốt hơn
Mình cho rằng hầu hết chúng ta bắt đầu thiết kế UI với rất ít kinh nghiệm về trải nghiệm người dùng. Rồi chúng ta ngồi cày các tài liệu, ebook về thiết kế, hiểu cách phối màu, typography, bố cục sản phẩm … Nhưng thiết kế UI ko chỉ đơn giản là về màu sắc, hình khối, ngôn từ mà nó còn phải trả lời câu hỏi “Vì sao” đằng sau,  khi nào thì để text lớn hơn, đổ bóng shadow, đổi màu. Phải có 1 lí do trả lời cho việc tại sao mọi thứ nên trông như thế.
Trong bài này mình sẽ chia sẻ một số thứ đã học được và rút ra được một số thứ trong thiết kế Web, và tất nhiên những điều ngược lại ko có nghĩa là thiết kế sai, chỉ là mình áp dụng để UI đẹp hơn mà thôi :D 

**1.	“Đoạn text này quan trọng, hãy làm nó trông to hơn!”**

Khi gặp những đoạn nội dung đặc biệt, quan trọng hơn bình thường, chúng ta thường làm cho font-size của nó lớn hơn, và đây thực sự không phải ý hay, thử nhìn xem:
 ![](https://images.viblo.asia/1a451c62-298f-47e3-92aa-95dc4a74c659.png)
Nhấn mạnh vào những nội dung quan trọng không phải là chỉ làm font size lớn hơn, mà là độ đậm, màu sắc, độ tương phản, nhìn ví dụ này xem có khác hẳn ko :D :
 
Vậy làm thế nào để mình làm text nổi bật hơn:
-	Đừng dùng đúng 1 font-weight (độ dày) với các font-size (cỡ chữ) khác nhau
-	Thay vào đó, hãy làm nó đậm hơn, hoặc làm cho đoạn nội dung phụ nhạt hơn và màu sáng hơn.
-	Chọn sẵn 3 màu chữ trải đều từ nhạt - vừa – đậm
-	Đừng ngại tăng khoảng cách trên – dưới giữa các dòng text
-	Nhớ công thức: Độ tương phản = cỡ chữ + độ dày chữ + màu chữ
-	Và cuối cùng, kiểm tra hệ số tương phản ở đây: https://contrast-ratio.com/#black-on-yellow (điểm càng cao càng tốt nhé)
![](https://images.viblo.asia/50c32dec-ff69-4590-9d85-22a062f8dd82.png)

**2.	Đừng tạo các gam màu đen khác nhau**

Thử tưởng tượng trên một background màu trắng mà trang web của bạn có đến 2-3 loại màu đen khác nhau. Sự thực là khi sử dụng màu #000 (màu đen tuyệt đối) làm cho mắt rất mỏi, khó đọc. Giải pháp là hãy dùng màu đen với opacity khác nhau (độ trong suốt):
 ![](https://images.viblo.asia/962fee39-4d04-4b58-a15c-c73c08f7da9b.png)

Ví dụ trên đây mình đều dùng màu đen (0,0,0) nhưng giảm opacity, trong css sẽ lần lượt là: rgba(0,0,0,0.85), rgba(0,0,0,0.60), rgba(0,0,0,0.75), nhìn sẽ đỡ đau mắt hơn đúng ko.



**3.	Dùng  Spacing (khoảng cách) để chia các khối text khác nhau**
 
Hãy nhóm các khối text liên quan với nhau lại thành khối, và set khoảng cách giữa các khối đủ lớn để thấy sự độc lập của từng khối, trên ví dụ trên mình để Title cách với phần Author là 24px, nhưng 2 dòng text phần tác giả thì cho sát nhau, tạo nên sẽ rõ ràng giữa từng khối text.
![](https://images.viblo.asia/510829eb-7528-47cb-9c72-3634f686a663.png)

**4. Dùng các màu khác nhau để phân biệt các dòng trong table**

 ![](https://images.viblo.asia/1a7a30aa-9d79-404f-9519-a1a8cd8731e8.png)
Đối với người dùng, nhìn một table hàng chục dòng có thiết kế tệ thực sự rất đau mắt, nhiều khi không rõ mình đang nhìn dòng nào. Vì vậy đừng nên chia các dòng khác nhau chỉ bằng border (các đường kẻ vạch) mà nên đổi màu nền của các dòng chẵn lẻ.

**5. Đổ bóng màu nền thay vì đổ bóng text**

 ![](https://images.viblo.asia/66724698-f262-4b2c-bf51-15cf091ac48e.png)
Trong css3 có một thuộc tính mới là Multiply cho phép đổ màu lên background-image, hãy sử dụng nó để background-text trông rõ ràng hơn thay vì dùng css text-shadow lên text
Link codepen tham khảo: https://codepen.io/tr-ho-ng/pen/wNQeYP

**6. Chiều ngang của khối text**

 ![](https://images.viblo.asia/ba155a8f-927f-4182-ba37-53ad79144ed5.png)
Mắt người thích hợp đọc văn bản với khoảng 50 chữ 1 dòng, tương đương khoảng 10 từ, vì vậy đừng nên để 1 dòng có quá nhiều từ, ngoài ra nên cố gắng để cho khối text ở chính giữa màn hình hơn là lệch về bên trái hoặc phải

**7. Dùng màu của Brand vô tội vạ**

 ![](https://images.viblo.asia/97f1a851-68ce-4ed9-817c-100f3aa0485d.png)
Chúng ta thường nghĩ rằng màu chính của sản phẩm phải được sử dụng, phủ càng nhiều diện tích càng tốt. Câu trả lời là chỉ nên sử dụng nó như một điểm nhấn, đừng làm người dùng choáng ngợp vì Brand color của mình. 
Ngoài ra mình còn muốn chia sẻ nhiều trick khác để tăng trải nghiệm người dùng, nhưng trước hết mình mong những điều bên trên giúp các bạn có 1 sản phẩm đẹp hơn ^^.

**Nguồn tham khảo:**

https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886
https://medium.com/sketch-app-sources/design-cheatsheet-274384775da9