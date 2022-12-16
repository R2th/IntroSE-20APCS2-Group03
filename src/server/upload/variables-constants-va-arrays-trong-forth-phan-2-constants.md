Hôm nay mình sẽ tiếp tục dịch về phần Constants tiếp theo của bài lần trước:
#### 2. Constants
Khi variables được sử dụng một cách bình thường cho các giá trị và việc thay đổi chúng. Constants lại được sử dụng để ko thể thay đổi. Trong Forth, chúng ta tạo ra một constant và set giá trị cho nó ở một thời điểm nào đó bằng cách:
```
220 CONSTANT LIMIT
```
Ở đây chúng ta đã định nghĩa một constant với tên là LIMIT, và gán cho nó giá trị là 220. Bây giờ chúng ta có thể sử dụng từ khóa LIMIT đê thay thế cho 220 như sau:
```
: ?TOO-HOT  LIMIT > IF  ." Danger -- reduce heat "  THEN ;
```
Nếu số trong stack lớn hơn 220 thì có tin cảnh báo được in ra.
Chú ý đến khi chúng ta nói:
```
LIMIT
```
Chúng ta đã lấy giá trị, ko phải là địa chỉ. 
Ở đây có sự khác biệt lớn giữa variables và constants. Lý do cho sự khác biệt là với variables, chúng ta cần địa chỉ để có thể tìm kiếm và lưu trữ. Với constants chúng ta luôn luôn muốn là giá trị; chúng ta chắc chắn ko cần lưu trữ.
Một cách sử dụng cho constants là đặt tên cho một địa chỉ phần chỉ phần cứng. Một ví dụ ở trình điều khiển vi sử lý trên camera  áp dụng với contain được định nghĩa:
```
: PHOTOGRAPH   SHUTTER OPEN  TIME EXPOSE  SHUTTER CLOSE ;
```
Here the word SHUTTER has been defined as a constant so that execution of SHUTTER returns the hardware address of the camera’s shutter. It might, for example, be defined:
Ở đây key word SHUTTER đã được định nghĩa là constant vì khi thực thi SHUTTER trả về địa chỉ phần cứng của camera shutter. Ví dụ:
```
HEX
FFFF3E27 CONSTANT SHUTTER
DECIMAL
```
Ký tự OPEN và CLOSE được định nghĩa:
```
: OPEN  1 SWAP ! ;
: CLOSE 0 SWAP ! ;
```
sau đó đến:
```
SHUTTER OPEN
```
1 cho shutter address, vì shutter đã thực hiện open.

Ở đây một vài tình huống tốt nhất khi được sử dụng định nghĩa với constants:
+ Khi nó rất quan trọng trong việc ứng dụng của bạn có thể đọc. Một trong những ứng dụng của Forth là việc định nghĩa có thể tự đọc, tiêu biểu là định nghĩa của PHOTOGRAPH.
+ Khi nó có một vài lợi ích cho việc sử dụng tên để thay thế cho số. Ví dụ, nếu bạn  muốn thay đổi lại giá trị bạn sẽ thay đổi giá trị một trong những file nơi mà constant được định nghĩa chứ ko phải tìm đến từng vị trí trong ứng dụng của bạn để thay đổi.
+ (Chỉ đúng với trình biên dịch Forth kém tính vi) Khi bạn sử dụng một giát trị ở một vài thời điểm nào đó trong ứng dụng của bạn, Trong trình biên dịch từ định nghĩa, tham chiếu đến constant đòi hỏi bộ nhớ một cách ít nhất.
```
CONSTANT xxx ( n — ) xxx: ( — n )
```
Tạo ra tên biết là xxx có giá trị là n; ký tự xxx trả về n khi được thực thi.

#### 3. Double-Length Variables and Constants
Bạn có thể định nghĩa double-length variable bởi sử dụng ký tự 2VARIABLE. Ví dụ:
```
2VARIABLE DATE
```
Bây giờ bạn có thể sử dụng ký tự 2! của Forth và 2@ để đồng ý cho double-length variable. Bạn có thể lưu trữ double-length số tới nó bởi:
```
800,000 DATE 2!
```
và khi lấy ra:
```
DATE 2@
```
giá trị nhận được là 800000
hoặc bạn có thể lưu trữ tất cả ngày/tháng/năm vào một biến bằng cách:
```
7/17/03 DATE 2!
```
và khi lấy ra:
```
DATE 2@
```
giá trị nhận được là 7/17/03.

Giả định bạn đã lấy version cuối cùng của .DATE. (ở cuối chương trước)
Bạn có thể định nghĩa double-length constant bằng cách sử dụng 2CONSTANT của Forth bằng cách:
```
200,000 2CONSTANT APPLES
```
Bây giờ ký tự APPLES sẽ đặt số có độ dài doublle-length trên stack.
```
APPLES D
```
gía trị nhận được là 200000.

Trong bài này chúng ta có thể:
```
400,000 2CONSTANT MUCH
: MUCH-MORE  200,000 D+  MUCH D+ ;
```
Để có thể gọi:
```
APPLES MUCH-MORE D
```
Giá trị nhận được là 800000.
Tiền tố "2" nhắc nhở chúng ta, chúng ta có thể thường xuyên sử dụng 2CONSTANT để định nghĩa một cặp số single-length. Lý do cho việc đẩy 2 số bên dưới vào một name là một vấn đề thuận tiện cho không gian lưu trữ trong từ điển: 
![](https://1scyem2bunjw1ghzsf1cjwwn-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/ch8-pronounce-2.gif)
Trong ví dụ này:
```
355 113 */
```
có nhiều số sấp sỉ với giá trị của số pi. Chúng ta có thể lưu trữ hai intergers và một 2CONSTANT theo cách:
```
355 113 2CONSTANT PI
```
Lúc này chỉ cần sử dụng cụm từ
```
PI */
```
vi dụ:
```
10000 PI */
```
giá trị nhận được 31415.
Sau đây là phần tổng hợp lại của double-length data-structure:
```
2VARIABLE XXX( — ) xxx: ( — addr )
```
+ Tạo một double-length variable có tên là xxx; ký tự xxx trả về địa chỉ của nó khi được thực thi.
```
2CONSTANT XXX( d — ) xxx: ( — d )
```
+ tạo một double-length constant có tên là xxx với value là d; ký tự xxx trả về d khi được thực thi.
```
2!( d addr — ) or ( n1 n2 addr — )
```
+ Lưu trữ một số double-length ( hoặc một cặp số single-length ) ở địa chỉ addr.
```
2@( addr — d ) or ( addr – n1 n2 )
```
+ lấy ra một số double length ( hoặc một cặp số single-length ) từ addr.
+ 
Trên đây là phần giới thiệu về CONSTANTS trong Forth. Trong bài sau mình sẽ tiếp tục dịch về phần Arrays trong Forth. Do vốn TA có hạn lên bài dịch còn nhiều chỗ không được chuẩn + mình cũng thay đổi nhiều theo ý hiểu của bản thân. Lên nếu có vấn đề gì xin các bạn góp ý!!! Thanks!!! bài viết gốc: https://www.forth.com/starting-forth/8-variables-constants-arrays/