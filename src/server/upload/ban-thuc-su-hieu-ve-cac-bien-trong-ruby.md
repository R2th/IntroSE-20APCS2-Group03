![](https://images.viblo.asia/e46c3f5f-ff53-4a49-b453-04dfc816ed2c.png)

### 1. Variable (biến) là gì ?
Biến là nơi lưu trữ dữ liệu. Mỗi biến có một tên riêng, tên biến được đặt theo một số quy luật riêng. Mỗi biến có một kiểu dữ liệu riêng. Ruby có rất nhiều kiểu dữ liệu có sẵn. Kiểu dữ liệu trong Ruby là kiểu dữ liệu động, tức là khi chúng ta khai báo biến và gán giá trị thì Ruby sẽ tự động gán kiểu dữ liệu cho biến dựa trên giá trị đó chứ chúng ta không cần phải khai báo trước kiểu dữ liệu như trong các ngôn ngữ như C++, Java…
#### Ví dụ : 
```
i = 5
puts i  # result = 5
i = 7.7
puts i # result = 7.7
```
### 2. Các loại biến trong Ruby
![](https://images.viblo.asia/4fba9949-05f9-4892-8e98-21c81a3e76dc.png)<br>
Trong ruby có 5 loại biến được định nghĩa :<br>
❖ Global variable (biến toàn cục) -  ký hiệu $<br>
➔ Có sẵn ở mọi nơi trong tập lệnh Ruby của bạn<br>
❖ Local variable (biến cục bộ)  cách tạo biến là chữ cái thường <br>
➔ Nó phụ thuộc vào phạm vi (tạo phạm vi mới với lớp mới, mô-đun mới, phương thức)<br>
❖  Instance variable (biến phiên bản)- ký hiệu @<br>
➔ Chỉ khả dụng trong một đối tượng cụ thể, trên tất cả các phương thức trong một lớp<br>
 Không có sẵn trực tiếp từ các định nghĩa lớp.<br>
❖ Class variable  (biến lớp) - ký hiệu @@<br>
➔ Có sẵn từ định nghĩa lớp và bất kỳ lớp con nào. Không có sẵn từ bất kỳ đâu bên ngoài.<br>
❖ Constants (hằng số) - Bắt đầu bằng một chữ cái viết hoa chữ cái đầu hoặc viết hoa toàn bộ tên biến . Biến hằng trong ruby có thể thay đổi giá trị.<br>
Như ae thấy trong ruby có nhiều loại biến khác nhau đúng không nên cân nhắc khi sử dụng cho phụ hợp nhé :)
### 3 . Cách sử dụng các biến trong  Ruby
### Global variables
![](https://images.viblo.asia/6a3c6279-92f8-4ec1-98f2-dc797f304076.png)
![](https://images.viblo.asia/7dcdfea8-3d14-4bd9-b7a8-dc1cf4a4f9d6.png) <br>
Qua ví dụ trên dễ thấy là : $global là biến không nằm trong class C nhưng khi chúng ta new đối tượng gọi đến phương thức my_method  thì biến $global nó sẽ lấy giá trị ban đầu là 0 rồi cộng thêm 1.Lẽ đương nhiên là giá trị biến $global = 1 lúc này . thế dễ hiểu mà đúng không ae
### Local variable
![](https://images.viblo.asia/c57d9ed7-0d05-4c54-b434-404ba0ba204d.png)<br>
Đọc lại phạm vi của biến cục bộ và tự đoán kết như thế nào nhé  ?  Chắc ae cũng đoán đúng rồi nhỉ . <br>
Nhìn vào đoạn code trên thấy biến chỉ có 1 biến duy nhất đó là  color  (dễ vl) , vậy liệu nó có cùng giá trị bằng nhau không . Khi ta gọi hàm method thì giá trị nào được in ra "Red" hay 192.
color = "Red" biến này trong nằm trong phạm vi hàm method nên nó không in ra rồi và color = "Red" sẽ in ở puts nhé vì phạm vi của nó ở ngoài hàm . <br>
![](https://images.viblo.asia/02c8f5d6-4d85-4fe9-ac6b-f85c59192422.png) <br>
### Instance variable 
Để hiểu đó hơn biến này thì mình sẽ đề cấp đến class nhé . Ae nào chưa đọc qua class trong Ruby thì cũng không quá lo lắng nhé . Mình chỉ biến phạm vi của nó là oke rồi . Biết sớm cái   gì sớm thì càng tốt thôi chứ ... <br>
 * Trong Ruby class được định nghĩa
```
class NameClass
     ...
end
```
![](https://images.viblo.asia/6273c11b-231c-4991-abd0-4bedaa6a74fc.png)<br>
Hàm initialize  là hàm tạo trong ruby nhé.<br>
![](https://images.viblo.asia/74b1e413-eb97-4295-953b-d67c287cfb9c.png)<br>
Biến @student_id , @student_name là biến instance nên nó chỉ có phạm vi trong phương thức của class . Được sử dụng  khi khởi tạo đối tượng student 
### Class variable 
Đến đây chắc ae hình dung class trong Ruby như thế nào rồi đúng không . Vậy tiếp tục tìm hiểu thêm loại biến nữa nào @@ <br>
![](https://images.viblo.asia/c84707b0-0d80-4f38-9b47-877a5dba8da1.png) <br>
Có lẽ mọi người đang thế lạ về hàm này <br>
>     def self.sides
>         @@sides
>     end
 <br>
 Hàm này  có tên là ** class method**  . Đơn giản là khi class gọi đến hàm này mà không cần khởi tạo 1 đối tượng thôi . Vì từ khóa *self*  đang tham chiếu đến chính class hiện gọi nó. Ae tìm hiểu self trong Ruby nhé thú zị lắm đấy <br>
 
### Constant variable

![](https://images.viblo.asia/f2560385-9308-4b21-957d-1b665f981fa1.png)
 <br>
Dễ thấy có biến hằng số NAME đúng không. <br>
![](https://images.viblo.asia/d5cc678a-46b3-4f2c-9e48-aa02fad965dc.png)
<br>
Mình đã đề cập là biến constant có thể thay đối giá trị được , đó điều thú vị trong Ruby.<br>
Vậy trong ruby có cách nào để không thay đổi giá trị biết hằng được không.  Reply : được nhé dùng từ khóa freeze dùng trong (array, string là 1 mảng chuỗi nhé ) sẽ không thay đổi biến contanst: <br>
![](https://images.viblo.asia/ec160fec-76ee-43bb-80a5-1d28b1062002.png)

* Vừa rồi mình đã giới thiệu qua về biến trong Ruby và khi nào  sử dụng các loại biến đó. Hi  vọng bài mình chia sẽ  có thể giúp cho các bạn mới học Ruby hiểu được biến và những điều thú vị trong Ruby . Lần đầu tiên mình viết blog nên có thiếu sót gì cứ comment để mình cải thiện nhé . Hẹn gặp lại ae vài bài share tiếp share của mình :)