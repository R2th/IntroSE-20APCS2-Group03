# Mở đầu
Để có một trang web thân thiện và không khiến cho người dùng phải ngơ ngác chờ đợi sau mỗi action trên màn hình, những hiệu ứng phản hồi ngay tức thì là thứ luôn cần thiết.

Bạn muốn submit thanh toán, thay đổi ngôn ngữ, chuyển trạng thái sử dụng, ... Tất cả phải diễn ra thật nhanh chóng, chí ít là phải để người dùng hiểu rằng " ồ hố, yêu cầu của mình đang được xử lí". Thế là những thanh loading, những chuyển động trên giao diện được hiện ra sau các cú chích chuột sẽ kéo dài thời gian cho ta xử lí tác vụ bên dưới, thời gian có thể không được rút ngắn nhưng được cái là không ai phải bực mình !

Từ đây, css sẽ giúp chúng ta làm được điều này bằng Animation.
( Nếu bạn tìm thấy vài thư viện js làm được điều tương tự thì hãy yên tâm rằng họ cũng chỉ thay đổi css thông qua js mà thôi, như thêm bớt class css chẳng hạn )
# Animation
Thuộc tính animation trong css bao trùm lên nhiều thuộc tính con, mà mỗi thuộc tính con này thể hiện hay điều khiển một khía cạnh của sự chuyển động trong animate.

Đầu tiên hãy cũng điểm qua các thuộc tính này, và animation sẽ giống như bản liệt kê các tham số của tất cả.
## Animation-name
Dùng để đặt tên cho animation, tên này có tác dụng đánh dấu animation, khi đã có tên bạn có thể khai báo nó ở nơi khác và thêm vài thuộc tính khác nếu cần.
VD: 
```
animation-name: move;
```
## Animation-duration
Xác định 1 chu kì chuyển động của đối tượng bạn gắn vào theo đơn vị giây, tuỳ vào kích thước và giới hạn bước dịch chuyển mà tốc độ chuyển động có thể nhanh hoặc chậm hơn.
VD: 
```
animation-duration: 3s;
```

## Animation-timing-function
Thuộc tính này có khá nhiều option hay cho bạn chọn:

1.  linear: Chuyển động đều từ đầu tới cuối chu kì.
2.  ease: Chuyển động sẽ biến thiên từ chậm -> nhanh -> chậm trong 1 chu kì (default).
3.  ease-in: Chuyển động nhanh dần.
4.  ease-out: Chuyển động chậm dần.
5.  ease-in-out: Khá giống với ease nhưng lúc bắt đầu thì sẽ chậm hơn chút.
6.  cubic-bezier(x, x, x, x) : Thiết lập 1 độ chính xác cao hơn cho chuyển động.


## Animation-delay
Dùng chỉ định thời gian đếm trước khi animate bắt đầu, tính bằng giây.
VD: 
```
animation-delay: 3s;
```
## Animation-iteration-count
Chỉ định số lần hay số chu kì chuyển động, hoặc có thể dùng option "infinite" để chạy vô hạn:
```
animation-iteration-count: 10;
or :
animation-iteration-count: infinite;
```
## Animation-direction
Quy định việc đảo chiều chuyển động giữa các chu kì.

1. "alternate" các chu kì đảo chiều so le nhau.
2. "normal" không đảo chiều. 

 > Cuối cùng thì như đã nói, chúng ta có thể liệt kê các giá trị của những yếu tố trên thành 1 dãy trong animation như sau (Chú ý là khuyết vài thứ cũng được nhưng nhớ thứ tự của duration và delay nhé ) : 
```
animation: move 3s linear 3s infinite normal;
-moz-animation: move 3s linear 3s infinite normal;
-webkit-animation: move 3s linear 3s infinite normal;
-o-animation: move 3s linear 3s infinite normal;
```

# keyframes
Đây là nơi mà animation-name có thể chèn vào để sử dụng. Sau khi được định nghĩa tên như bên trên, ta có thể làm như sau :
```
@keyframes move {
0% { transform: translateY(-100%); }
100% { transform: translateY(100%); }
}
```
Đoạn này có nghĩa là chuyển động sẽ dọc theo trục Y trong mặt phẳng toạ độ 2 chiều, đồng thời  có chiều từ trên xuống dưới (0% tương ứng với thời điểm bắt đầu và ở vị trí trên cùng, 100% là hết 1 chu kì và vị trí dưới cùng )