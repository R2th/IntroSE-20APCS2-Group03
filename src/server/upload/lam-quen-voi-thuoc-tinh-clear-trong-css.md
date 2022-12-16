# Thuộc tính Clear - anh bạn thân của thuộc tính Float
## Đặt vấn đề
Trong quá trình thiết kế website, khi ta áp dụng thuộc tính Float cho một phần tử nào đó, trang HTML sẽ coi phần tử đó chưa hề tồn tại, do đó các phần tử bên dưới sẽ được dồn lên.<br>
Nhưng, giả sử ta không muốn các phần tử phía sau dồn lên, thì làm như thế nào đây?<br>
Cùng xem ví dụ sau<br>
![](https://images.viblo.asia/df162d1f-9608-4a2d-ba8c-c9320c685b54.png)<br>
Đây là cấu trúc HTML của ví dụ. Với thẻ img đã được áp dụng thuộc tính `float: left;`<br>
```HTML
<img src="..." />
<div id="content"> ....nội dung.... </div>
```
<br><br>
Bây giờ, muốn nội dung hiển thị như thế này thì làm như thế nào?<br>
![](https://images.viblo.asia/8e02f8cb-d5f0-4509-8ac9-7ef3a0029070.png)<br><br>
Có lẽ các bạn cũng nghĩ ra rồi đúng không?<br>
Có 2 cách cơ bản để làm việc này. Cách 1: dùng bố cục thông thường, tức là thẻ img viết trước, và nội dung đi ngay sau. Nhưng giả sử trong trường hợp ta bắt buộc phải Float thẻ img sang trái thì làm sao để vẫn giữ được bố cục như hình 2?
Khi ấy, cách 2 được áp dụng: trong thẻ div chứa nội dung, ta thêm vào thuộc tính `clear: left;`.<br>
## Tìm hiểu
+ Như vậy, Clear là thuộc tính được dùng khi ta muốn xóa đi ảnh hưởng của thuộc tính Float, cụ thể là xóa đi ảnh hưởng của phần tử ngay trước phần tử ta áp dụng thuộc tính Clear. Như ví dụ trên, ta áp dụng Clear cho thẻ div để xóa đi ảnh hưởng của thuộc tính Float lên thẻ img.<br>
Hiểu đơn giản, phần tử được áp dụng Clear sẽ hiển thị bình thường như khi phần tử trước nó chưa bị Float.<br>
Sau đây là một ứng dụng tiêu biểu của thuộc tính Clear trong quá trình thiết kế front-end<br>
![](https://images.viblo.asia/fc1bae36-0650-454d-aca5-142f2a3fda2d.png)<br>
Đến đây chắc các bạn cũng hiểu vì sao ta phải làm quen với thuộc tính này rồi phải không?<br>
+ Thuộc tính Clear có 3 giá trị chinh: *left*, *right* và *both*. Trong đó, ta hầu như dùng giá trị *both* xuyên suốt quá trình thiết kế (đến 99%).<br>
+ Dùng thuộc tính Clear sao cho chuyên nghiệp?
Ta sẽ không chèn thuộc tính Clear vào thẻ muốn áp dụng như thế này:
`#the_ap_dung_clear {
    width: 200px;
    height: 200px;
    clear: both;
    }`<br>
    Mà ta có một cách khác, chuyên nghiệp hơn, hãy xem dòng định dạng CSS sau:
    `.clear {clear: both}`<br>
    Tức là ta tạo một class có tên là "clear" rồi áp dụng class này cho thẻ ta muốn.
    <br>
  ## Kết
  Thuộc tính Clear thực sự không khó phải không nào?<br>
  Sau khi làm chủ được nó, kết hợp nhuần nhuyễn với thuộc tính Float, bạn sẽ có làm được nhiều hơn với trang web của mình. Chúc bạn thành công!