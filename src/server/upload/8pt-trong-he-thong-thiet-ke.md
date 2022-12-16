## Vấn đề ở đây là gì?
Bootstrap đã không còn là thư viện xa lạ gì với các nhà thiết kế web. Trong Bootstrap chúng ta có thể sử dụng các component như button, input,... bằng cách thêm các class mà họ đã viết sẵn. Tuy nhiên những component này nhìn có vẻ rất hợp lí khi đứng riêng rẽ nhưng khi đặt nó vào element lớn hơn thì về tổng thể thiết kế nhìn sẽ không được ăn khớp. Lí do là khi làm như vậy thì bố cục của trang sẽ không được nhất quán. Nếu không có hệ thống spacing thì sẽ rất khó để tạo được sự nhất quán về thiết kế trong các elements. Hãy nhìn ảnh dưới đây, bên trái là một hệ thống lưới 8pt sắp xếp theo chiều dọc các phần tử của biểu mẫu và bên trái là hệ thống thiết kế phổ biến sử dụng các số tùy ý cho các phần tử không gian và kích thước.
![](https://images.viblo.asia/158430e8-a772-468c-a711-254dedd3eaf1.png)

## Hệ thống 8pt là gì ?
Đó là việc sử dụng ít nhất là 8 đơn vị tăng theo cấp số cộng của 8. Điều này có nghĩa là gì, nó có nghĩa là bất bất kỳ chiều cao hoặc chiều rộng được xác định, margin hoặc padding sẽ tăng 8 đơn vị.

## Tại sao lại là 8 ?
Sự đa dạng về kích thước màn hình và mật độ pixel đã tiếp tục tăng lên khiến công việc chỉnh sửa các asset sau này trở nên phức tạp hơn đối với các nhà thiết kế. Việc sử dụng một số chẵn như 8  giúp cho việc chia tỷ lệ cho nhiều loại thiết bị trở nên dễ dàng và nhất quán.
Ví dụ, các thiết bị có độ phân giải 1,5x sẽ khó có thể làm tròn nhiệm nhiệm vụ với các số lẻ. Thu nhỏ 5px x 1,5 lần sẽ tạo ra độ lệch một nửa pixel.

Phần lớn các kích thước màn hình phổ biến chia hết cho 8, giúp dễ dàng điều chỉnh. Chia tỷ lệ theo số gia 8 cung cấp một số lượng tùy chọn tốt mà không làm bạn quá tải với các biến như hệ thống 6  hoặc giới hạn bạn như hệ thống 10.

## Giá trị mà hệ thống 8pt mang lại?
- Đối với Designer: Hiệu quả, nhanh gọn không còn phải tốn quá nhiều thời gian để suy nghĩ về khoảng cách của các phần tử, cũng như không cần phải nhớ xem mình đã dùng spacing bao nhiêu ở các màn khác. Điều này đem lại sự nhất quán cho thiết kể của mình 
- Đối với Dev: Thứ nhất con số sẽ chẵn, thứ hai không cần phải tốn thời gian để đo xem phần tử này cách nhau bao nhiêu, và cuối cùng dev có thể tính toán sắp đặt sao cho hợp lí ở những màn không có design.

Để hiểu rõ hơn thì hãy nhìn bức ảnh dưới đây
![](https://images.viblo.asia/38ad4d63-3930-4e2b-ae48-c564cb7711e2.png)

Có thể thấy, hình thứ 3 có độ nhất quán về khoảng cách, padding, margin giúp cho phần card được sắp xếp rất clean và khiến cho người xem cảm thấy dễ dàng thao tác và xử lý thông tin.

<hr>
Bài viết có tham khảo tại https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632