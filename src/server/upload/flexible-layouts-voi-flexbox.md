*Flexbox hay còn gọi là Flexible Box Layout Module, kỹ thuật cho phép xây dựng những components hay grids linh hoạt một cách dễ dàng*


Trước khi đi vào tìm hiểu Flexbox là gì, chúng ta cùng xem xét các phiên bản browsers hiện nay support Flexbox như thế nào, đây cũng là một điều khá quan trọng cần lưu ý khi xây dựng một ứng dụng cross browsers
![](https://images.viblo.asia/d4a8c089-5ae6-4e52-8a13-c9829628bb20.png)
Có thể thấy rằng các phiên bản mới nhất của hầu hết browsers đều đã hỗ trợ thuộc tính này mà không cần vendor prefix.

Rất đơn giản để tạo một flexible box layout, chỉ cần set:
```
display: flex
```
hoặc là:
```
display: inline-flex
```
cho thẻ bao (the containing element)

Khi một element cha được set là flexbox thì những elements con của nó trở thành flex items. Nếu những thành phần con đó không có thêm thuộc tính nào nữa, thì chúng sẽ:
    + Có chiều cao bằng với element cao nhất.
    + Xếp chồng theo chiều ngang không có khoảng trống giữa các cạnh của mỗi element.
![](https://images.viblo.asia/9a3a4e5f-3404-4a92-ba9e-f6bca13dbde2.png)

Đây có vẻ không phải là một vấn đề lớn, tuy nhiên nó giúp cho CSS trở nên đơn giản hơn cho đa phần các mẫu UI.
Sử dụng flexbox cho page layout cũng có một số rủi ro nhất định. Bởi vì nội dung ảnh hưởng đến layout, người dùng với đường truyền chậm có thể gặp sự cố nhảy bố cục trong khi trang đang được load. Vì vậy không nên dùng flexbox cho trang tổng thể. 

**Sử dụng flex-wrap để tạo Grids đơn giản**
Flexbox cho phép tạp components theo grid với thuộc tính flex-wrap. Ban đầu, giá trị của flex-wrap là nowrap. Lúc này các flex items chỉ đơn giản là fill độ rộng của container, dãn ra hay co lại để vừa trên một dòng. Nếu set nó với thuộc tính là wrap, flex items sẽ xuống dòng tiếp theo nếu chiều rộng của chúng vượt quá container.

Một ví dụ:
```
<div class="grid">
    <div class="alpha">A</div>
    <div class="beta">B</div>
    <div class="gamma">C</div>
    <div class="delta">D</div>
    <div class="epsilon">E</div>
    <div class="zeta">F</div>
    <div class="eta">G</div>
</div>
```
```
.grid{
    display: flex;
    flex-wrap: wrap;
}
.grid > * {
    flex: 0 0 25%;
}
```
![](https://images.viblo.asia/0aca7564-48a4-4cb1-a89b-81ed6ee525ba.png)

Kết quả có vẻ chưa đẹp lắm khi hàng thử 2 chỉ có 3 item và còn 1 khoảng trốn bên phải. Thử thay đổi giá trị của thuộc tính flex:
```
.grid > * {
    flex: 1 0 25%;
}
```
bây giờ các item ở row 2 sẽ giản ra với độ rộng bằng nhau để lấp đây container:
![](https://images.viblo.asia/d27fbcd7-ddb5-4d92-a998-33c4150b59c5.png)

**Tạo Flexible Component với thuộc tính flex**
Một trường hợp sử dụng khác cho flexbox là tạo các thành phần linh hoạt được sắp xếp theo chiều dọc.

Xem xét mẫu giao diện sau:
![](https://images.viblo.asia/b182b92d-9651-4300-8d52-564941ab74ac.png)

Chúng ta có một form input với một nút liền kề. Cả 2 điều được căn chỉnh theo chiều dọc và cái nút thì có độ rộng là 110px. Yêu cầu là làm sao để thẻ input lấp đầy container chứa nó.
```
div {
    display: flex;
    justify-content: center;
}

input[type="text"],
button {
    border:0;
    display: inline;
    font: inherit;
}

input[type="text"] {
    flex: 1 0 auto;
}

button {
    background: #003;
    color: whitesmoke;
    display: block;
    text-align: center;
    flex: 0 0 110px;
}
```
Chúng ra set flex: 1 0 auto cho thẻ input. Do giá trị flex-grow là 1, nên ó sẽ lấp đầy không gian của thẻ cha bao nó.
Đối với thẻ button, chúng ta set giá trị flex-grow và flex-shrink là 0, flex-basis là 110px.

Qua các ví dụ trên cũng đã diểm qua các thuộc tính và cách sử dụng flexbox để có thể ứng dụng vào việc xây dựng những layout ngày càng có độ phức tạp cao.

*Tham khảo: CSS Master by Tifany B. Brow*