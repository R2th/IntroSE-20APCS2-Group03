## Mở đầu
Đã đến lúc chúng ta tìm hiểu về con trỏ. Hãy ra hít một hơi thật sâu trước khi bắt đầu vì tôi biết
bài học này chắc chắn sẽ không khiến bạn thấy thú vị. Nhưng con trỏ là một khái niệm được sử
dụng rất thường xuyên trong C. Nói về tầm quan trọng, chúng ta không thể nào lập trình trên ngôn
ngữ C mà không dùng đến con trỏ, và bạn cũng đã từng dùng nó mà không biết.

Phần lớn những người bắt đầu học C thường xuyên vấp ngã trong phần kiến thức về con trỏ. Và
tôi hi vọng bài học này sẽ giúp các bạn không nằm trong số đó. Hãy tập trung gấp đôi bình thường
và bỏ thêm thời gian để hiểu rõ từng biểu đồ, ví dụ có trong bài học này.
### Một vấn đề nan giải
Đây là một trong những vấn đề lớn liên quan đến con trỏ, các bạn mới bắt đầu thường bị nhầm lẫn,
cảm thấy khó khăn trong việc nắm vững cách hoạt động và sử dụng.
"Con trỏ rất cần thiết, và chúng ta sẽ thường xuyên dùng đến nó, hãy tin tôi !"
Tôi sẽ cho bạn xem một ví dụ mà các bạn không thể nào giải quyết được nếu không sử dụng đến
con trỏ. Đây cũng là tiêu điểm của bài học này, tôi sẽ hướng dẫn cách giải quyết ở cuối bài học.
Đây là vấn đề: Tôi muốn viết một function trả về hai giá trị. Việc này là không thể vì mỗi function
chỉ có thể trả về duy nhất một giá trị.

C code:
```cpp
int function ( )
{
return giatri;
}
```
Nếu ta khai báo function với type int, thì ta sẽ nhận được một số dạng int (nhờ vào instruction
return).
Chúng ta cũng đã học cách viết một function không trả về bất cứ giá trị nào với từ khóa void:

C code:
```cpp
void function( )
{ }
```
Nhưng để nhận được hai giá trị trả về cùng lúc thật sự là việc không thể. Chúng ta không thể sử
dụng hai return cùng lúc.

Giả sử tôi muốn viết một function, trong parameter tôi sẽ cho nó một giá trị tính bằng phút, tôi
muốn nó chuyển thành giờ và phút tương ứng:

1. Nếu ta đưa vào giá trị 45, function sẽ trả về 0 giờ và 45 phút.
2. Nếu ta đưa vào giá trị 60, function sẽ trả về 1 giờ và 0 phút.
3. Nếu ta đưa vào giá trị 60, function sẽ trả về 1 giờ và 30 phút .

Nhìn có vẻ khá đơn giản, nhưng hãy cùng test đoạn code sau:

C code:

```c
#include <stdio.h>
#include <stdlib.h>
/* Toi dat cac prototypes tren cung. Vi day la mot chuong trình kha nho nen toi khong
dat chung trong mot file.h, nhung trong mot chuong trinh that su, toi se dat chung trong
mot file.h nhu da huong dan o bai truoc*/

void chuyenDoi(int gio, int phut);
int main (int argc, char *argv[ ])
{
int gio = 0, phut = 90;
/*Chung ta co bien so "phut" giá trị 90. Sau khi ket thuc function, toi muon bien so
"gio" nhan gia tri 1 và bien so "phut" nhan gia tri 30 */

chuyenDoi(gio, phut);
printf ("%d gio va %d phut", gio, phut);
return 0;
}

void chuyenDoi(int gio, int phut)
{
gio= phut/ 60; // 90 / 60 = 1
phut= phut% 60; // 90 % 60 = 30
}
```
Và đây là **kết quả**:

Console
```c
0 gio va 90 phut

```

Ặc... chương trình đã không hoạt động. **Vì sao** vậy?

Khi bạn gửi giá trị của một biến số vào vị trí parameter của một function, một bản sao của biến số
này được tạo ra. Nói cách khác, biến số "gio" trong function chuyenDoi không phải là biến số "gio"
trong function main! Nó chỉ là bản sao!

Function chuyenDoi đã thực hiện nhiệm vụ của nó. Trong function chuyenDoi, những biến số "gio"
và "phut" nhận giá trị chính xác: 1 và 30.

Nhưng sau đó, function kết thúc khi dấu ngoặc } đóng lại. Như ta đã học ở bài học trước, tất cả
những biến số tạo ra trong một function sẽ bị xóa đi khi function đó kết thúc. Và ở đây, biến số
gio và phut đã bị xóa đi. Sau đó chương trình tiếp tục phần tiếp theo của main, và ở đó biến số gio
và phut của main giá trị vẫn là 0 và 90. Đó là lí do bạn thất bại!

```c
Cần ghi thêm ở đây, function tạo ra một bản sao cho biến số ta gửi vào nó, nên
bạn không cần phải gọi tên biến số đó chính xác giống như cách bạn gọi ở main.
*Để rõ ràng hơn, bạn xem đoạn code sau:*
                                        void chuyenDoi (int g, int p)
                                        (g thay cho gio và p thay cho phút)
```

Và tiếp theo, hãy thử tìm nhiều cách khác sửa đổi chương trình trên, như trả về một giá trị sau khi
kết thúc function (sử dụng return và thay đổi type function thành int), bạn chỉ nhận được một trong
hai giá trị bạn cần. Bạn không thể nào nhận được cùng lúc hai giá trị. Và bạn tuyệt đối không được
sử dụng biến số global, lí do tôi đã giải thích ở bài trước.

Và đó là vấn đề khó khăn đặt ra , vậy con trỏ sẽ giải quyết vấn đề trên như thế nào?

-----