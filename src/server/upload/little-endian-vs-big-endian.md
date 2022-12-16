> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/09/20/little-endian-vs-big-endian.html (đã xin phép tác giả :D)

Little endian và big endian, đây là hai phương thức khác nhau để lưu trữ dữ liệu dạng nhị phân (binary).  Bình thường thì chúng ta cũng chẳng cần quan tâm đến chúng làm gì.  Bởi mọi việc sẽ được tự động hoá hết.

Thế nhưng có những tình huống, ví dụ khi phải xử lý các tập tin có cấu trúc, tập tin binary, nhất là những tập tin được ghi bằng ngôn ngữ khác, thì việc hiểu về little endian và big endian là rất quan trọng. Bởi nếu không, rất có thể chúng ta sẽ đọc sai thứ tự và xử lý với dữ liệu được hiểu sai.

# Dữ liệu

Dữ liệu là thể hiện của thông tin dưới dạng lưu trữ được.  Thông tin là thứ trừu tượng, không có hình dạng, đó là những hiểu biết về các sự vật, sự việc xung quanh chúng ta.  Để lưu trữ, cũng như truyền đạt thông tin đến mọi người, chúng ta cần đến dữ liệu.  Dữ liệu có thể là chữ viết, hình ảnh được ghi trên giấy, tất cả chúng ta dữ liệu mà con người có thể hiểu được.

Nhưng những dữ liệu đó cần phải được mã hoá một lần nữa, nếu chúng ta muốn lưu trữ chúng trên máy tính.  Như chúng ta đều biết, máy tính chỉ làm việc với dữ liệu được mã hoá dưới dạng nhị phân, vậy nên mọi dữ liệu cần được mã hoá thành nhị phân mới có thể xử lý trên máy tính được.

> Thực ra điều này chỉ đúng với máy tính số (digital electronic computer).  Nghe nói hiện nay máy tính lượng tử, máy tính sinh học cũng đang được phát triển, hy vọng trong vài năm tới, chúng ta sẽ update lại kiến thức về dữ liệu.

Thực ra, máy tính không hiểu được các ký tự 0, 1 trong hệ nhị phân đâu, nó hoạt động theo các tín hiệu điện tử.  Mô tả chính xác thì rất khó, nhưng chúng ta có thể hiểu "sơ sơ" rằng, gặp bit 1 thì sẽ có dòng diện, gặp bit 0 thì không có.  Như vậy, các bit 0, 1 được xử lý thành các tín hiệu điện tử tương ứng, và chúng ta coi đó như máy tính đã hiểu được dữ liệu nhị phân.

Thế nhưng, mặc dù cùng sử dụng tín hiệu dạng nhị phân, các máy tính khác nhau cũng không thực sự nói chung một ngôn ngữ.  Cũng giống như coi người vậy, khi nhìn các ký tự `a`, `b`, `c` có người hiểu, có người không.  Máy tính khi nhìn vào các tín hiệu tương ứng với các ký hiệu `0` hay `1`, mỗi máy tính có thể hiểu theo một cách khác nhau.

Thế nhưng, rất may là các máy tính vẫn hoạt động theo những tiêu chuẩn chung, thế nên nó vẫn có thể giao tiếp với nhau được.  Tuy nhiên, lưu ý rằng, không phải bất cứ lúc nào, các máy tính cũng có thể hiểu được lẫn nhau.

Trong máy tính, các dữ liệu nhị phân không được xử lý theo từng bit riêng lẻ, mà được xử lý thành từng khối 8 bit một, và đơn vị xử lý nhỏ nhất này gọi là byte.

Ví dụ, số nguyên `123456789` được biểu diễn dưới dạng nhị phân sẽ là (ở đây tôi cho rằng kiểu dữ liệu `int` sẽ có kích thước là 4 byte, tuy nhiên, nhiều hệ thống 64 bit đã nâng kích thước này lên 8 byte)

```
00000111 01011011 11001101 00010101
```

Để ngắn gọn, chúng ta có thể viết nó dưới dạng hexa như sau:

```
07 5b cd 15
```

Đã có bao giờ, bạn tự hỏi, khi ghi dữ liệu này trên đĩa cứng chẳng hạn, nó được ghi thế nào chưa.  Bạn cho rằng, nó sẽ được ghi lần lượt theo thứ tự mà chúng ta đang đọc và viết ở trên, thì bạn đã nhầm.

Đây là cách viết theo kiểu số Ả rập cho chúng ta dễ hiểu thôi, máy tính không "đọc" các ký tự giống như chúng ta nên nó cũng không lưu trữ giống cách chúng ta viết các ký tự này ra đâu.  Việc ghi dữ liệu như thế nào chính là lúc little endian và big endian được dùng đến.

# Little endian và big endian là gì?

Little endian và big endian là hai phương thức khác nhau để lưu trữ dữ liệu.  Sự khác biệt của little endian và big endian khi lưu trữ chính là ở việc sắp xếp thứ tự các byte dữ liệu.

Trong cơ chế lưu trữ little endian (xuất phát từ "little-end" nghĩa kết thúc nhỏ hơn), byte cuối cùng trong biểu diễn nhị phân trên sẽ được ghi trước.  Ví dụ `123456789` ghi theo kiểu little endian sẽ thành

```
15 cd 5b 07
```

Hơi ngược một chút đúng không?  Big endian (xuất phát từ "big-end") thì ngược lại, là cơ chế ghi dữ liệu theo thứ tự bình thường mà chúng ta vẫn dùng.  `123456789` được lưu trữ vẫn theo đúng thứ tự là

```
07 5b cd 15
```

Các thuật ngữ big-end hay little-end xuất phát từ cuốn tiểu thuyết Gulliver du ký (Gulliver's Travels), trong đó nhân vật Lilliputans tranh luận về việc nên đập trứng bằng đầu to hay nhỏ.

Và ngành IT đã ứng dụng thuật ngữ ngày, tương đối giống với nghĩa gốc. Lưu ý rằng, little endian hay big endian chỉ khác nhau ở cách sắp xếp các **byte** dữ liệu, còn thứ tự từng bit trong byte thì giống nhau. Rất may, các máy tính vẫn có điểm trung này.

Thêm một lưu ý nữa rằng, little endian hay big endian chỉ khác biệt khi cần lưu trữ những dữ liệu có nhiều byte.  Những dữ liệu chỉ có 1 byte (ví dụ ký tự ASCII) thì không ảnh hưởng gì (chính xác là dù dùng phương thức nào kết quả cũng như nhau)

# Little endian và big endian được dùng trên những máy tính nào?

Việc sắp xếp các byte dữ liệu theo kiểu little endian hay big endian không chỉ xảy ra khi chúng ta lưu trữ dữ liệu ra bộ nhớ ngoài.  Mọi hoạt động của máy tính đều sử dụng dữ liệu nhị phân, nên little endian/big endian hiện hữu trong mọi hoạt động của máy tính.

Ngoài việc sử dụng little endian/big endian một phần phụ thuộc vào phần mềm (do lập trình viên cố ý sử dụng một trong hai loại, hoặc ngôn ngữ lập trình quy định trước), nó còn phụ thuộc vào bộ vi xử lý của chính máy tính đó.

Các bộ vi xử lý Intel đều sử dụng little endian, các bộ vi xử lý cả ARM trước đây cũng là little endian, nhưng hiện này ARM đã nâng cấp vi xử lý của mình thành bi-endian (tức là xử lý cả little endian và big endian).

Các bộ vi xử lý PowerPC và SPARK trước đây đều là big endian, nhưng hiện nay chúng cũng được nâng cấp thành bi-endian.

# Các làm nào thì tốt hơn: little endian hay big endian?

Little endian hay big endian cũng như tranh luận gốc về việc đập trứng, không có một phương thức nào thực sự tốt hơn phương thức nào.

Little endian hay big endian chỉ khác nhau ở việc lưu trữ thứ tự các byte dữ liệu.  Cả hai phương thức đều không làm ảnh hưởng đến tốc độ xử lý của CPU.  Thế nên cả hai phương thức đều vẫn tồn tại song song và sẽ không bao giờ có thể có một câu trả lời thoả đáng: Phương thức nào thì tốt hơn?

Mỗi phương thức đều có những lợi thế nhất định.  Với little endian, vì byte nhỏ nhất luôn nằm bên trái, nó sẽ cho phép chúng ta đọc dữ liệu với độ dài tuỳ ý.  Nó sẽ rất thích hợp nếu chúng ta cần ép kiểu, ví dụ từ `int` thành `long int`.

Với giả định `int` là 4 byte, `long int` là 8 byte, nếu dùng little endian, khi ép kiểu, địa chỉ bộ nhớ không cần phải thay đổi, chúng ta chỉ cần ghi tiếp các byte lớn hơn mà thôi.

Nhưng nếu cũng trường hợp đó, mà sử dụng big endian, thì chúng ta sẽ phải dịch địa chỉ bộ nhớ hiện tại thêm 4 byte nữa mới có không gian để lưu trữ.

Nhưng big endian cũng có nhưng lợi thế nhất định, với việc đọc dữ liệu byte lớn nhất trước, nó sẽ rất dễ dàng kiểm tra một số là âm hay dương, do byte chứa dấu được đọc đầu tiên.

# Xem các byte dữ liệu trong bộ nhớ

Chương trình C đơn giản nhau cho chúng ta cách nhìn về việc sắp xếp các byte trong bộ nhớ.

```c
#include <stdio.h>

/* function to show bytes in memory, from location start to start+n */
void
show_mem_rep (char *start, int n)
{
  int i;
  for (i = 0; i < n; i++)
    printf (" %.2x", start[i]);
  printf ("\n");
}

/* Main function to call above function for 0x01234567 */
int
main ()
{
  int i = 0x01234567;
  show_mem_rep ((char *) &i, sizeof (i));
  return 0;
}
```

Khi thực thi chương trình trên, nếu máy của bạn là little endian thì kết quả sẽ là

```
 67 45 23 01
```

còn nếu máy bạn là big endian thì nó sẽ hiển thị theo thứ tự thông thường

```
 01 23 45 67
```

Có cách nào để xác định máy tính của chúng ta là little endian hay big endian hay không?  Có vô số các cách khác nhau, dưới đây là một trong số những cách đó:

```c
#include <stdio.h>

int
main ()
{
  unsigned int i = 1;
  char *c = (char *) &i;
  if (*c)
    printf ("Little endian");
  else
    printf ("Big endian");
  return 0;
}
```

Với đoạn code đơn giản trên, `c` là con trỏ, nó trỏ đến vùng nhớ của biến `i` là một số nguyên.  Bởi vì số nguyên là kiểu dữ liệu nhiều byte, trong khí dữ liệu của `char` chỉ là một byte mà thôi, nên `*c` sẽ trả về giá trị là byte đầu tiên của số nguyên `i`.

Nếu máy tính của chúng ta là little endian thì byte đầu tiên này sẽ là `1`, ngược lại thì nó sẽ là `0`.

# Điều này ảnh hưởng thế nào đến việc lập trình

Về cơ bản thì little endian hay big endian không có ảnh hưởng lắm đến việc lập trình.  Phần lớn các lập trình viên không cần quan tâm nhiều lắm, bởi mọi việc đã được các trình biên dịch/thông dich đảm nhiệm hết.

Tuy nhiên, một số trường hợp, chúng ta cần quan tâm, đặc biệt khi chuyển đổi dữ\ liệu giữa các máy tính khác nhau.  Ví dụ: khi chúng ta cần xử lý một file có cấu trúc thế này, 4 byte đầu tiên là một số nguyên `n`, sau đó là n số nguyên, mỗi số chiếm 4 byte bộ nhớ, v.v...

Trong trường hợp này, khi nhận file được tạo ra từ một máy tính khác, việc nó được ghi theo kiểu little endian hay big endian rõ ràng là ảnh hưởng rất nghiêm trọng, nếu sử dụng sai phương thức, chúng ta sẽ thu về dữ liệu sai.

Một trường hợp khác nữa có thể xảy ra vấn đề là khi chúng ta ép kiểu cho các biến

```c
#include <stdio.h>

int
main ()
{
  unsigned char arr[2] = { 0x01, 0x00 };
  unsigned short int x = *(unsigned short int *) arr;
  printf ("%d", x);

  return 0;
}
```

Trong đoạn code trên, chúng ta đã ép kiểu một array hai phần tử `char` thành một số nguyên 2 byte (`short int`).  Trong ví dụ này, little endian hay big endian cũng có ảnh hưởng rất lớn.

Một máy tính dùng little endian sẽ có kết quả là `1` trong khi big endian sẽ cho kết quả là `256`.  Để tránh những lỗi đáng tiếc có thể xảy ra, những code như trên cần phải tránh.

# Vấn đề NUXI

NUXI là một vấn đề rất nổi tiếng liên quan đến little endian và big endian: UNIX được lưu trong một hệ thống big-endian sẽ được hiểu là NUXI trong một hệ thống little endian.

Giả sử chúng ta cần lưu trữ 4 byte (`U`, `N`, `I`, `X`) bằng hai số nguyên dạng `short int`: `UN` và `IX`.

```c
#include <stdio.h>

int
main ()
{
  short int *s; // pointer to set shorts
  s = (short int *)malloc(sizeof(short int));    // point to location 0
  *s = "UN";  // store first short: U * 256 + N (fictional code)
  s += 2;    // point to next location
  *s = "IX";  // store second short: I * 256 + X

  return 0;
}
```

Đoạn code trên hoàn toàn độc lập với hệ thống, bất kể nó là little hay big endian.  Nếu chúng ta lưu trữ các giá trị "UN" và "IX" khi đọc ra, nó vẫn sẽ là "UNIX" hay không?  Nếu mọi việc chỉ xảy ra trên một máy tính, dù là big endian hay little endian thì nó sẽ luôn là như vậy, bởi mọi thứ sẽ được tự động hoá giúp chúng ta.

Với bất cứ dữ liệu nào cũng vậy, chúng ta luôn thu được dữ liệu đúng nếu đọc và ghi trong cùng một hệ thống.  Thế nhưng, hãy xem xét kỹ hơn về việc sắp xếp các byte trong bộ nhớ.

Một hệ thống big endian sẽ lưu trữ như sau:

```
U N I X
```

Còn một hệ thống little endian thì sẽ như sau:

```
N U X I
```

Mặc dù trông hơi ngược nhưng hệ thống little endian sẽ xử lý việc đọc giúp chúng ta, nên lưu trữ như vậy nhưng khi lấy ra chúng ta vẫn có dữ liệu ban đầu.  Thế nhưng khi chúng ta ghi dữ liệu này ra file, chuyển sang một máy tính khác.  Và mỗi máy tính lại xử lý theo cách riêng của nó thì UNIX trên máy big endian sẽ được hiểu là NUXI trên máy little endian (và ngược lại).

Đây chính là vấn đều nguy hiểm nhất khi chúng ta trao đỏi dữ liệu qua lại giữa các máy tính với nhau, đặc biệt trong thời đại Internet ngày nay.

# Trao đổi dữ liệu giữa các máy có endian khác nhau

Ngày nay, mọi máy tính đều được kết nối để trao đổi dữ liệu với nhau. Little endian hay big endian cũng đều phải trao đổi với nhau, nhưng làm thế nào để có hiểu được nhau khi chúng không nói chung một thứ tiếng?

Có 2 giải pháp chính cho việc này

## Sử dụng chung định dạng

Một phương án đơn giản nhất tất cả sử dụng chung một định dang khi truyền dữ liệu.

Ví dụ những tập tin dạng PNG đều bắt buộc phải sử dụng big endian. Tương tự với các tập tin có cấu trúc khác.  Đó là lý do vì sao chúng ta nhiều khi cần phải dùng những phần mềm chuyên dụng để đọc và ghi các file này.

Thế nhưng trong kết nối với Internet, việc truyền dữ liệu còn phức tạp hơn thế.  Chúng ta không thể cứ dùng một định dạng file nào đó, rồi truyền từng byte một sang máy khác được.  Muốn tăng tốc độ, bắt buộc chúng ta phải truyền nhiều byte một lúc.

Và khi đó chúng ta cần có một chuẩn chung.  Hiện nay, chuẩn chung cho việc truyền dữ liệu trên mạng, gọi là [network byte order](https://tools.ietf.org/html/rfc1700#page-3) chính là big endian.  Thế nhưng, dù đã chuẩn chung rồi, thỉnh thoảng vẫn có những giao thức chơi chội hơn, sử dụng little endian.

Để có thể chuyển đổi dữ liệu thành dữ liệu chuẩn theo network byte order, chương trình cần gọi hàm `hton*` (host-to-network) (trong ngôn ngữ C).  Trong hệ thống big endian, hàm này không cần làm gì cả, còn little endian sẽ thực hiện chuyển đối các byte một chút.

Dù hệ thống big endian không cần chuyển đổi dữ liệu, việc gọi hàm này vẫn là rất cần thiết.  Chương trình của chúng ta có thể được viết bằng một ngôn ngữ (C) nhưng có thể được dịch và thực thi ở nhiều hệ thống khác nhau, việc gọi hàm này sẽ giúp chúng ta làm điều đó.

Tương tự, ở chiều ngược lại, chúng ta cần gọi hàm `ntoh*` để chuyển đổi dữ liệu nhận được từ mạng về dữ liệu máy tính có thể hiểu được. Ngoài ra, chúng ta còn phải hiểu rõ kiểu dữ liệu mà chúng ta cần chuyển đổi nữa, danh sách các hàm chuyển đổi như sau:

- `htons` - "Host to Network Short"
- `htonl`- "Host to Network Long"
- `ntohs` - "Network to Host Short"
- `ntohl` - "Network to Host Long"

Những hàm này vô cùng quan trọng khi thực hiện chia sẽ dữ liệu ở tầng thấp, ví dụ khi kiểm tra checksum của các gói tin chẳng hạn.  Nếu không hiểu rõ về little endian và big endian thì khi cần làm việc về mạng, bạn sẽ gặp nhiều khó khăn.

## Sử dụng BOM (Byte Order Mark)

Một phương án khác để giải quyết sự khác biệt về endian là sử dụng BOM ([Byte Order Mark](https://www.unicode.org/versions/Unicode5.0.0/ch16.pdf#G25817)). Đây là một ký tự đặc biệt, có giá trị là `0xFEFF`, được ghi ở vị trí đầu tiên của file.

Nếu bạn đọc ký tự này là `0xFFFE` (bị ngược) thì có nghĩa file này được ghi với endian khác với hệ thống của bạn, khi đó, bạn sẽ cần phải thay đổi phương thức đọc dữ liệu một chút.

Có một vài vấn đề nhỏ với việc sử dụng BOM.  Thứ nhất, BOM sẽ gây tăng dữ liệu được ghi vào file.  Ngay cả khi chúng ta chỉ gửi đi 2 byte dữ liệu, chúng ta vẫn cần thêm 2 byte BOM nữa.

Thứ hai, BOM không hoàn toàn thần thánh, bởi nó phụ thuộc vào lập trình viên.  Có người có tâm thì đọc và xử lý khi gặp BOM, có người thì hoàn toàn bỏ quên nó và coi nói như dữ liệu thông thường.  Unicode sử dụng BOM khi lưu trữ dữ liệu nhiều byte (nhiều ký tự Unicode được mã hoá thành 2, 3 thậm chí là 4 byte).