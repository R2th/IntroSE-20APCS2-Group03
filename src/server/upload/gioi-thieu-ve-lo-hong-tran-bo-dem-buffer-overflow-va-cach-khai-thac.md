# Khái niệm
Lỗ hổng tràn bộ đệm (Buffer Overflow) là lỗ hổng trong lập trình, cho phép dữ liệu được ghi vào một buffer có thể tràn ra ngoài buffer đó, ghi đè lên dữ liệu khác và dẫn tới hoạt động bất thường của chương trình.
![](https://images.viblo.asia/d138ca3c-2200-44c7-92db-b2ff040401be.png)
* Dễ tránh nhưng phổ biến và nguy hiểm nhất hiện nay.
* Hai dạng lớn: trên stack, trên heap 
* Có nhiều cơ chế bảo vệ và cũng có nhiều kỹ thuật khai thác
![](https://images.viblo.asia/6100e910-3318-4773-a717-4b1d8252afc5.png)

![](https://images.viblo.asia/a2d90afc-e259-4796-8d3e-c9487cf95189.png)
# Hệ quả
Các lỗi tràn bộ đệm có thể làm cho một tiến trình đổ vỡ hoặc cho ra các kết quả sai. Các lỗi này có thể được kích hoạt bởi các dữ liệu vào được thiết kế đặc biệt để thực thi các đoạn mã phá hoại hoặc để làm cho chương trình hoạt động một cách không như mong đợi. Bằng cách đó, các lỗi tràn bộ đệm gây ra nhiều lỗ hổng bảo mật (vulnerability) đối với phần mềm và tạo cơ sở cho nhiều thủ thuật khai thác (exploit). Việc kiểm tra biên (bounds checking) đầy đủ bởi lập trình viên hoặc trình biên dịch có thể ngăn chặn các lỗi tràn bộ đệm.
# Nguyên tắc khai tác lỗ hổng
* Dữ liệu quan trọng phải nằm phía sau (ở địa chỉ cao hơn) so với bộ đệm.
* Phần dữ liệu tràn phải đủ lớn để đè lên được dữ liệu quan trọng.
* Những dữ liệu khác nằm giữa vùng đệm và dữ liệu mục tiêu cũng bị ghi đè. Việc ghi đè đó có thể ảnh hưởng đến logic làm việc của chương trình, đến khả năng thành công của việc khai thác.
# Khai thác
Có rất nhiều cách để khai thác lỗ hổng này như: Ghi đè lên biến cục bộ, ghi đè địa chỉ trả về, trở về thư viện chuẩn,...
Và trong bài này mình sẽ hướng dẫn các bạn một cách đơn giản nhất, đó là: Ghi đè lên biến cục bộ.
## Ghi đè biến cục bộ
Ta có đoạn mã nguồn như sau:
```
#include <stdio.h>
int main()
{
    int cookie=0;
    char buf[16];
    printf("Your name: ");
    gets(buf);
    if(cookie == 0x41424344)
		puts("You win!");
    else
		puts("Try again!");
    return 0;
}

```
* Đoạn mã trên cho phép người dùng nhập vào một chuỗi kí tự, sau đó kiểm tra biến cookie với 0x41424344, nếu bằng thì in ra "You win!", nếu không thì in ra "Try again!". Nhưng biến cookie ở đây được gán giá trị ban đầu là 0 và chương trình không có đoạn code nào thây đổi giá trị của nó, vì vậy chương trình sẽ luôn chạy vào nhánh "Try again!"
* Đoạn mã trên đã bị lỗi buffer overflow do sử dụng hàm gets, hàm này sẽ lưu toàn bộ những gì chúng ta nhập vào biến buf, nếu người dùng nhập số kí tự lớn hơn số ô nhớ được cấp phát cho biến buff thì sẽ xảy ra lỗi buffer overflow.
* Và mục đích của chúng ta là phải khai thác lỗi này, làm cho chương trình chạy vào nhánh "You win!".

Ví dụ ta có một file thực thi của mã nguồn trên, sau khi dịch ngược bằng IDA Pro ta thu được đoạn mã như sau:
```
int __cdecl main(int argc, const char **argv, const char **envp)
{
	char Buffer;	// [esp+1Ch] [ebp-14h]
	int v5;			// [esp+2Ch] [ebp-4h]
	v5 = 0;
	printf("Your name: ");
	gets(&Buffer);
	if ( v5 == 0x41424344 )
		puts("You win!");
	else
		puts("Try again!");
	return 0;
}

```
Từ đoạn mã này ta có thể thấy:
* biến Buffer(buf) nằm ở stack có địa chỉ [ebp-14h], v5(cookie) nằm ở stack có địa chỉ [ebp-4h].
* Buffer nằm thấp hơn v5, vậy ta có thể ghi đè giá trị của biến Buffer lên biến v5.
* Khoảng cách từ Buffer đến v5 (-4h) – (-14h) = 10h = 16.
* Cần 16 bytes bất kỳ để tiếp cận, tiếp đó là dữ liệu muốn ghi đè lên v5 (cookie).
 ![image.png](https://images.viblo.asia/6a6948b1-f4cc-4274-95ec-ae82cfdc69c5.png)
 Khi chúng ta chạy chương trình và thử nhập một chuỗi "123456789abc" thì sẽ nhận được kết quả:
 ![image.png](https://images.viblo.asia/3800604b-38f8-43b9-b2a2-8fd60fcac7b8.png)
Kết quả này đúng như luống chạy của chương trình
![image.png](https://images.viblo.asia/29d8aa3f-32b9-4578-b94f-c6b2cb49fbdc.png)

Các kí tự được nhập vào sẽ được chuyến sang mã ASCII và lưu vào biến buff, các kí tự này vẫn nằm trong vùng nhớ được cấp cho biến buf, do vậy vẫn chưa có gì xảy ra, giờ ta sẽ tạo ra một đoạn mã khai thác chương trình theo công thức: 

```sql
"c"x16 + "DCBA" 
- c là kí tự bất kì
- x16 là lặp lại 16 lần
Đoạn mã này sử dụng 16 kí tự bất kì để lấp đầy ô nhớ được cấp cho biến buff(16 ô) rồi sử dụng 4 kí tự cuối để ghi đè lên biến cookie.
```
Ta chạy chương trình và nhập vào chuỗi "0123456789abcdefDCBA" thu được kết quả:
![image.png](https://images.viblo.asia/10490e3c-4f48-43ce-b1b7-4a8e7a22d32a.png)
![image.png](https://images.viblo.asia/81184151-bf15-4a89-b38f-91959bea1436.png)

Nhìn vào hình trên ta có thể thấy lúc này biến cookie sẽ có giá trị là 0x41424344 (biến trong stack được lưu theo kiểu little endian). Và khi chương trình kiểm tra cookie == 0x41424344 là đúng và sẽ chạy vào nhánh "You win!".
# Kết
Cảm ơn các bạn đã theo dõi bài viết của mình, chúc các bạn một ngày vui vẻ.