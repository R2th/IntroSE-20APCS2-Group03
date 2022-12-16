Nếu bạn đã từng đọc qua một vài shellscript thì nhất định bạn đã từng gặp một đoạn mã kỳ quặc như dưới đây:
```
echo hello >/dev/null 2>&1
```
Và rồi tự hỏi nó là cái éo gì vậy, sau hồi google và stackoverflow các kiểu cũng hiểu được đôi chút.
À thì ra là mọi thứ trong linux đều là file, ngay cả các standard input, output và error cũng đều là file. Mỗi file đều có một cái định danh gì đó để có thể cầm nắm hay thao tác được đó là các file descriptor. Một file descriptor được diễn đạt như một số nguyên dương, các chuẩn input, output và error cũng không phải ngoại lệ, các file desciptor của chúng có giá trị lần lượt:
```
standard input : 0
standard ouput : 1
standard error:  2
```

Còn `/dev/null` hoá ra là một device hay cũng là một file đặc biệt trong linux/unix thường được dùng để chứa các dữ liệu rác từ các input stream khi chúng ta không muốn xử lý hay muốn hiển thị nó, nói dễ hiểu hơn `/dev/null` giống như một `Hố Đen` có thể chứa tất cả các dữ liệu được redirect tới nó.  

Các toán tử `>` là các toán tử redirect từ luồng stream này sang luống stream khác.

như vậy `echo hello >/dev/null 2>&1` có ý nghĩa là 
* `>/dev/null`: redirect tất cả các standard output sang `/dev/null` . Tương đương cách viết `1>/dev/null`
* `2>&1`: redirect tất cả các standard error sang standard output. Nhưng thời điểm này standard output đang trỏ tới  `/dev/null` nên standard error sẽ redirect tới  `/dev/null`

Có thể viết lại câu lệnh trên tường minh hơn:

```
echo hello 1>/dev/null 2>/dev/null
```
Lệnh này có ngụ ý là sẽ không in ra màn hình tất cả các output và error bằng các đẩy chúng vào `Hố đen` `/dev/null`. Chú ý là lệnh `echo` cũng là một loại standard output

Đến đây mọi thứ có vẻ sáng tỏ, nghịch ngợm chút bây giờ thử viết ngược lại đoạn redirect thì kết quả có còn giống nhay không?

```
$ cat Test
echo stdout
echo stderr >&2

$ ./Test > /dev/null 2>&1
$

$ ./Test 2>&1 > /dev/null
stderr
```

2 câu lệnh trên là khác nhau. Ở câu lệnh thứ 2,  đầu tiên standard error được redirect tới standard output, tại thời điểm này dữ liệu thuộc luồng standard error sẽ được in ra màn hình, ngay sau đó 
standard output sẽ tiếp tục được redirect tới `/dev/null`. Đó là lý do ở câu 2 `stderr` vẫn được in ra màn hình.
Còn ở câu 1 như đã giải thích ở trên thì cả standard output, standard error đều trỏ đến `/dev/null` nên không có dữ liều gì được show ra màn hình

Nói tóm lại là nếu hiểu được các standard input/output và error cùng redirect thì bạn sẽ đỡ ức chế và dễ chịu hơn khi đọc hay viết shellscript