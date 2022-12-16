### ARRAY
Hôm nay mình sẽ tiếp tục dịch về phần Array tiếp theo của bài lần trước:

Trong bài trước chúng ta đã biết về

`VARIABLE DATE`

Việc khởi tạo một định nghĩa với các mục như sau:


| 4 D A T E | code 2 | Room for one cell |
| -------- | -------- | -------- |


Bây h nếu bạn thực hiện:

`1 CELLS ALLOT`
 
điều này sẽ thực hiện thêm cell vào định nghĩa như sau:



| 4 D A T E | code| Room for first cell | Room for second cells |
| -------- | -------- | -------- | -------- |





Kết quả trả về tương tự với việc bạn sử dụng 2 VARIABLE. Bằng cách thay đổi đối số thành ALLOT, dù vậy, bạn vẫn có thể định nghĩa một số bất kỳ của variables dưới cùng một tên. Một nhóm của variable như vậy được gọi là "array". 


Trong ví dụ sau, nói về 1 phòng thí nghiệm chứa 5 ngọn đèn đang làm nóng các bình chất lỏng
![](https://1scyem2bunjw1ghzsf1cjwwn-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/ch8-burners.gif)

TOO-HOT 
nếu chúng ta định nghĩa một LIMIT sử dụng array thay vì một constant, Liệu chúng ta có thể kiểm tra xem cả 5 bình có vượt quá giới hạn của chúng hay ko ?

Khai báo một array với tên là LIMITS bằng cách:

`VARIABLE LIMITS  4 CELLS ALLOT`


Với “4 CELLS ALLOT” cho một mảng mở rộng có 4 cells ( có tất cả 5 cells )



| 6LIMITS | code | 	Burner0 | Burner1 | Burner2 |Burner3 |Burner4 |
| -------- | -------- | -------- | -------- | -------- | -------- |-------- |

Nếu chúng ta muốn cho giá trị max của Burrer0 là 220 thì chúng ta thực hiện:

`220 LIMITS !`


Bởi vì LIMITS trả về địa chỉ của cell đầu tiên trong array. Nếu chúng ta muốn max của burrer 1 là 340. Chúng ta có thể lưu giá trị này bằng cách add thêm 1 CELLS vào địa chỉa của cell đầu tiên bằng cách:

`340 LIMITS 1 CELLS + !`

We can store limits for burners 2, 3, and 4 by adding the “offsets” 2 CELLS, 3 CELLS, and 4 CELLS, respectively, to the original address. We can define the convenient word

Chúng ta có thể lưu trữ max cho burners 2, 3 và 4 bằng cách thêm vào "offsets" 2CELLS, 3 CELLS, 4CELLS một cách tương ứng so với địa chỉ ô đầu tiên.

Chúng ta có thể định nghĩa một cách ngắn gọn:

`: LIMIT  ( burner# -- addr ) CELLS LIMITS + ;`

để lấy số burner trong stack và tính toán địa chỉ của các offfset một cách thích hợp.


Và bây giờ, nếu chúng ta muốn gán giá trị 170 cho max của burner 2, chúng ta gọi:

`170 2 LIMIT !`



tương tự, chúng ta có thể lấy giá trị max của burner 2 bằng cách:

`2 LIMIT ?`

Để tăng tính hiệu quả khi sử dụng từ khóa LIMIT, chúng ta có thể định nghĩa lại ?TOO-HOT bằng cách:

`: ?TOO-HOT ( temp burner# -- )   LIMIT @ > IF  ." Danger -- reduce heat "  THEN ;`


### Byte Array


Forth cho phép bạn tạo một mảng mà mỗi element bao gồm một byte hơn là 1 full cell.  Điều này rất hữu ích khi bạn lưu trữ một chuỗi số, mà mỗi số trong đó được biểu thị bằng 8bits.

![](https://1scyem2bunjw1ghzsf1cjwwn-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/ch8-byte-array.gif)


Phạm vi của số unsigned 8-bit là 0 - 255. Byte arrays thường xuyên được sử dụng để lưu trữ các ký tự ASCII. Lợi của việc sử dụng byte array thay thế cho các cell array là bạn chỉ phải sử dụng 25% của bộ nhớ ( 32 - bit Forth).

Cơ chế sử dụng của một bit array với cell array giống nhau ngoại trừ một số điểm sau:

+ bạn không cần sử dụng CELLS trong việc điều khiển các offset vì mỗi element đã tương ứng với 1 phần tử.
+ bạn phải sử dụng các từ C! và C@ thay vì ! và @. Những từ này chỉ hoạt động trên các giá trị bit, có tiền tố C bởi vì cách sử dụng thông thường của chúng là với các ký tự ANSII.

![](https://1scyem2bunjw1ghzsf1cjwwn-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/ch8-pronounce-3.gif)

`C!` : lưu trữ bit char vào address.

`C@` : lấy bit value từ address.

### Initializing an Array

Nhiều tình huống yêu cầu một mảng có giá trị không bao giờ thay đổi trong quá trình hoạt động của ứng dụng và cũng có thể được lưu trữ vào mảng cùng lúc với mảng được tạo, giống như CONSTANT. Forth cung cấp các phương tiện để thực hiện điều này thông qua hai từ "CREATE" và ",".

Giả sử chúng ta muốn các giá trị không thay đổi trong array LIMITS, thay vì chúng ta sử dụng:

`VARIABLE LIMITS 4 CELLS ALLOT`

Chúng ta sẽ sử dụng:

`CREATE LIMITS  220 , 340 , 170 , 100 , 190 ,`

Thông thường các giá trị trên sẽ được thêm vào từ một tệp, nhưng bằng cách này nó cũng hoạt động tương tự.


Giống như  VARIABLE, CREATE đưa một tên mới trong từ điển vào thời gian biên dịch và trả về địa chỉ của định nghĩa khi nó được thực thi. Nhưng nó không phân bổ bất kỳ một bytes nào cho giá trị.

The word , takes a number off the stack and stores it into the array. So each time you express a number and follow it with ,, you add one cell to the array.

Từ đó , lấy một số ra khỏi stack và lưu trữ nó vào array. Vì mỗi lần bạn thực hiện  "number," bạn add một cell vào array.

![](https://1scyem2bunjw1ghzsf1cjwwn-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/ch8-array-increases.gif)

Trên đây là phần giới thiệu về ARRAYS trong Forth. Cũng là phần cuối trong các bài giới thiệu về FORTH của mình. Do vốn TA có hạn lên bài dịch còn nhiều chỗ không được chuẩn + mình cũng thay đổi nhiều theo ý hiểu của bản thân. Lên nếu có vấn đề gì xin các bạn góp ý!!! Thanks!!! bài viết gốc: https://www.forth.com/starting-forth/8-variables-constants-arrays/