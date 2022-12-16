![](https://images.viblo.asia/f1a06faa-c209-4bba-995b-36b3a57d1158.jpg)

# Giới thiệu
Sự khác biệt chính giữa **Array** và **Linked List**  liên quan đến cấu trúc của chúng. **Array** có cấu trúc dữ liệu dựa trên chỉ mục (index based),  trong đó mỗi phần tử chỉ được ứng với một chỉ mục. Còn, **Linked list** phụ thuộc vào các tham chiếu (references) trong đó mỗi nút bao gồm dữ liệu và các tham chiếu đến phần tử trước và phần tiếp theo.

Về cơ bản, một **Array** là một tập hợp các đối tượng dữ liệu tương tự được lưu trữ trong các vị trí bộ nhớ tuần tự dưới một tiêu đề chung hoặc một tên biến.

Trong khi **Linked list** là một cấu trúc dữ liệu chứa một chuỗi các phần tử trong đó mỗi phần tử được liên kết với phần tử tiếp theo của nó. Có hai trường trong một yếu tố của **Linked list**, là trường dữ liệu (data field)  và trường liên kết (link field). Trường dữ liệu chứa giá trị thực sẽ được lưu trữ và xử lý. Trường liên kết giữ địa chỉ của mục dữ liệu tiếp theo trong danh sách được liên kết. Địa chỉ được sử dụng để truy cập vào một nút cụ thể được gọi là một con trỏ.

Một sự khác biệt đáng kể khác giữa **Array** và **Linked list** là **Array** có kích thước cố định và được yêu cầu khai báo trước, còn **Linked list** không bị giới hạn về kích thước và có khả năng mở rộng trong quá trình thực thi.

Bảng so sánh **Array** và **Linked List**


| Cơ sở so sánh | Array | Linked List |
| -------- | -------- | -------- |
| Basic     | 	Nó là một tập hợp nhất quán của một tập mục dữ liệu cố định.     | Nó là một tập hợp được sắp xếp bao gồm một số lượng lớn các mục dữ liệu.     |
| Size    | Được chỉ định trong khi khai báo.     | 	Không cần chỉ định. Có khả năng tự mở rộng trong qúa trình phát triển     |
| Phân bổ lưu trữ     | Vị trí phần tử được phân bổ trong thời gian biên dịch.     | Vị trí phần tử được chỉ định trong thời gian chạy.     |
| Thứ tự của các element     | Lưu trữ liên tiếp     | Được lưu trữ ngẫu nhiên     |
| Truy cập phần tử     | Truy cập trực tiếp hoặc ngẫu nhiên, nghĩa là có thể chỉ định mảng hoặc chỉ mục mảng.     |   Truy cập tuần tự Traverse bắt đầu từ nút đầu tiên trong danh sách theo con trỏ.   |
| Chèn và xóa phần tử     | Chậm     | Nhanh hơn     |
| Searching     | Tìm kiếm nhị phân và tìm kiếm tuyến tính     | tìm kiếm tuyến tính     |
| Yêu cầu bộ nhớ     | ít hơn     | nhiều hơn     |
| Sử dụng bộ nhớ     | Không hiệu quả     | Hiệu quả hơn     |

# Định nghĩa của Array
Một **Array** được định nghĩa là một tập hợp một số lượng nhất định các phần tử đồng nhất hoặc các mục dữ liệu. Nó có nghĩa là một mảng chỉ có thể chứa một loại dữ liệu ví dụ tất cả các số nguyên, tất cả các số dấu phẩy động hoặc tất cả các ký tự,...  Khai báo một mảng như sau:

int a [10];

![](https://images.viblo.asia/3f05dded-784d-48c4-bb3e-912f65313078.jpg)

Một số khái niệm cần nhớ về mảng:

Các phần tử riêng lẻ của một mảng có thể được truy cập bằng cách mô tả tên của mảng, theo sau là chỉ mục hoặc chỉ mục (xác định vị trí của phần tử trong mảng) bên trong dấu ngoặc vuông. Ví dụ, để lấy phần tử thứ 5 của mảng, chúng ta cần viết một câu lệnh a [4].

Trong mọi trường hợp, các phần tử của một mảng sẽ được lưu trữ trong một vị trí bộ nhớ liên tiếp.

Phần tử đầu tiên của mảng có chỉ số zero [0]. Nó có nghĩa là phần tử đầu tiên và cuối cùng sẽ được chỉ định là [0] và [9] tương ứng.

Số phần tử có thể được lưu trữ trong một mảng, nghĩa là kích thước của một mảng hoặc độ dài của nó được đưa ra theo phương trình sau:
(upper bound-lower bound) + 1

Đối với mảng trên, nó sẽ là (9-0 ) + 1 = 10. Trong đó 0 là giới hạn dưới của mảng và 9 là giới hạn trên của mảng.

Mảng có thể được đọc hoặc viết thông qua các vòng lặp. Nếu chúng ta đọc mảng một chiều, nó yêu cầu một vòng lặp để đọc và một vòng khác để viết (in) mảng, ví dụ:
 Để đọc một mảng với vòng lặp for
 
 `for ( i= 0; i <= 9; i++) { scanf ( “%d”, &a[ i ] ) ; }`
 
 Các bước hoạt động được thực hiện trên mảng
 
1.  Tạo mảng
1. Đi qua một mảng
1. Chèn các yếu tố mới
1. Xóa các yếu tố cần thiết.
1. Sửa đổi một yếu tố.
1. Sáp nhập mảng

Chương trình sau đây sẽ minh họa việc đọc và ghi của 1 mảng :
``` c
#include<stdio.h>
#include<conio.h>
void main () {
 int a[10],i;
 printf("Enter the array");
 for ( i= 0; i <= 9; i++) {
  scanf ( "%d", &a[ i ] ) ;
 }
 printf( "Enter the array" );
 for (i = 0 ; i <= 9 ; i++) {
  printf ( "%d\n", a[ i ] ) ;
 }
 getch ();
}
```
# Định nghĩa của Linked List
**Linked List** là một danh sách cụ thể của một số yếu tố dữ liệu được liên kết với nhau. Trong phần này, mọi phần tử đều trỏ đến phần tử tiếp theo thể hiện thứ tự logic. Mỗi phần tử được gọi là một nút, có hai phần.

Phần **INFO** lưu trữ thông tin và **POINTER** trỏ đến phần tử tiếp theo và phần thứ 2 là một loại con trỏ.

Các loại danh sách được liên kết là **Singly-linked list, Doubly linked list, Circular linked list, Circular double linked list**.

![](https://images.viblo.asia/e015a4ac-2fa3-463a-886d-521790f68cea.jpg)

Các bước hoạt động được thực hiện trên **Linked List**

1. Creation
1. Duyệt qua
1. Chèn
1. Xóa
1. Tìm kiếm
1. Liên kết
1. Hiển thị

Đoạn mã sau minh họa việc tạo **Linked List**: 

``` c
struct node {
 int num;
 stuct node *next;
}
start = NULL;
void create() {
 typedef struct node NODE;
 NODE *p, *q;
 char choice;
 first = NULL;
 do {
  p = (NODE *) malloc (sizeof (NODE));
  printf ("Enter the data item\n");
  scanf ("%d", & p -> num);
  if (p == NULL) {
   q = start;
   while (q -> next ! = NULL) {
    q = q -> next
   }
   p -> next = q -> next;
   q -> = p;
  }else {
    p -> next = start;
    start = p;
   }
   printf ("Do you want to continue (type y or n) ? \n");
   scanf ("%c", &choice) ;
  }
  while ((choice == 'y') || (choice == 'Y'));
 }
```

# Kết luận
**Array** và **Linked lists** là các loại cấu trúc dữ liệu khác nhau về cấu trúc, phương thức truy cập và thao tác, yêu cầu bộ nhớ và sử dụng. Cả 2 có lợi thế và bất lợi đặc biệt so với việc thực hiện trong các trường hợp khác nhau. Do đó các bạn nên cân nhắc trước khi sử dụng giữa **Array** và **Linked lists**. Trên đây là nhưng điểm khác nhau giữa **Array** và **Linked lists** mà mình tìm hiểu được.

Cảm ơn các bạn đã đọc bài!

Tài liệu tham khảo: 

https://www.learn-c.org/en/Linked_lists

https://www.tutorialspoint.com/cprogramming/c_arrays.htm

https://techdifferences.com/difference-between-array-and-linked-list.html