![](https://images.viblo.asia/12e05e18-ce37-408a-a2cd-6cfc2fcd13e0.jpg)

**Stack** và **Queue** đều là các cấu trúc dữ liệu không nguyên thủy (non-primitive). Sự khác biệt lớn nhất giữa **Stack** và **Queue** là **Stack** sử dụng phương thức **LIFO** (last in first out) để truy cập và thêm các phần tử dữ liệu trong khi **Queue** sử dụng phương thức **FIFO** (First in first out) để truy cập và thêm các phần tử dữ liệu.

**Stack** chỉ có một đầu mở để pushing  và popping các phần tử dữ liệu, còn **Queue** có cả hai đầu mở để enqueuing và dequeuing các phần tử dữ liệu.

**Stack** và **Queue**  là các cấu trúc dữ liệu được sử dụng để lưu trữ các yếu tố dữ liệu và nó dựa trên một số các ví dụ có thực trong cuộc sống hàng ngày của chúng ta. Ví dụ, **Stack** là một chồng đĩa CD, nơi bạn có thể lấy ra và đưa vào đĩa CD thông qua đỉnh của ngăn xếp đĩa CD. Tương tự, **Queue** là hàng đợi cho các vé của Nhà hát nơi người đứng ở vị trí đầu tiên, nghĩa là, phía trước hàng đợi sẽ được phục vụ trước và người mới đến sẽ xuất hiện ở phía sau hàng đợi.

## Bảng so sánh


| Cơ sở để so sánh | STACK | QUEUE |
| -------- | -------- | -------- |
| Nguyên tắc làm việc     | LIFO (Last in First out)     | FIFO (First in First out)     |
| Structure     | Dùng một đầu để chèn và xóa các phần tử dữ liệu   | Có 2 đầu để xử lý dữ liệu, một đầu chèn một đầu xóa|
| Số con trỏ được sử dụng     | Một     | Hai (Trong trường hợp đơn giản)     |
| Hoạt động được thực hiện     | Push và Pop     | Enqueue và dequeue     |
| Kiểm tra empty condition     | Top == -1	     | Front == -1 || Front == Rear + 1     |
| Examination  full condition     | Top == Max - 1     | Rear == Max - 1     |
| Biến thể     | Không có biến thể     | Nó có các biến thể như hàng đợi tròn, hàng đợi ưu tiên, hàng đợi kết thúc gấp đôi.     |
| Thực hiện     | Đơn giản     | Tương đối phức tạp     |


## Định nghĩa về Stack.
**Stack** là một loại cấu trúc dữ liệu tuyến tính không nguyên thủy. Nó là một danh sách được sắp xếp trong đó các phần tử được thêm vào hoặc xóa đi chỉ ở một đầu của danh sách, được gọi là đỉnh của ngăn xếp (TOS). Vì tất cả việc xóa và chèn trong ngăn xếp được thực hiện từ đầu ngăn xếp, phần tử cuối cùng được thêm vào sẽ là phần tử đầu tiên được xóa khỏi ngăn xếp. Đó là lý do tại sao ngăn xếp được gọi là loại danh sách Last-in-First-out (LIFO).

![](https://images.viblo.asia/49147803-0793-413c-8083-a6d7005f211c.jpg)

Ví dụ:
Bạn có 1 hộp bánh và chỉ có 1 đầu để lấy bánh ra, bạn chỉ có thể lấy từng cái ra bằng đầu này ( cái này gọi là popping). Tương tự, bạn muốn cất số bánh đã lấy thừa, bạn chỉ có thể cất từng cái bánh vào hộp thông qua đầu này (gọi là pushing).


## Định nghĩa về Queue.
**Queue** là một loại cấu trúc dữ liệu tuyến tính thuộc loại không nguyên thủy. Nó là một tập hợp các loại yếu tố tương tự. Việc bổ sung các yếu tố mới diễn ra ở một đầu được gọi là Rear-end. Tương tự như vậy, việc xóa các phần tử hiện có diễn ra ở đầu kia được gọi là Front-end.

![](https://images.viblo.asia/0525cb70-6d4d-4794-b854-c3a8a69a2bca.jpg)

Ví dụ: Nó giống như việc bạn sếp hàng để mua vé xem phim, người đến trước sẽ được phục vụ trước người đến sau phải đứng vào cuối hàng đợi chờ để được phục vụ.

## Thực hiện Stack
Stack có thể thực hiện theo 2 cách:

1. **Static implementation** (triển khai tĩnh)  sử dụng mảng để tạo stack. Triển khai tĩnh mặc dù là một kỹ thuật dễ dàng nhưng không phải là cách tạo linh hoạt, vì việc khai báo kích thước của ngăn xếp phải được thực hiện trong quá trình thiết kế chương trình, sau đó kích thước không thể thay đổi. Ngoài ra, triển khai tĩnh không hiệu quả lắm đối với việc sử dụng bộ nhớ. Vì một mảng (để thực hiện ngăn xếp) được khai báo trước khi bắt đầu hoạt động (tại thời điểm thiết kế chương trình).
Bây giờ nếu số lượng phần tử được sắp xếp rất ít trong ngăn xếp, bộ nhớ được phân bổ tĩnh sẽ bị lãng phí. Mặt khác, nếu có nhiều số phần tử được lưu trữ trong ngăn xếp thì chúng ta không thể thay đổi kích thước của mảng để tăng dung lượng của nó, để nó có thể chứa các phần tử mới.
2.  **Dynamic implementation**(triển khai động) cũng được gọi là biểu diễn danh sách được liên kết và sử dụng các con trỏ để thực hiện kiểu ngăn xếp của cấu trúc dữ liệu.

## Thực hiện Queue
1. **Static implementation** (triển khai tĩnh): Nếu hàng đợi được triển khai bằng mảng, số lượng phần tử chính xác mà chúng tôi muốn lưu trữ trong hàng đợi phải được đảm bảo trước, bởi vì kích thước của mảng phải được khai báo tại thời điểm thiết kế hoặc trước khi quá trình xử lý bắt đầu.
Trong trường hợp này, phần đầu của mảng sẽ đứng trước của hàng đợi và vị trí cuối cùng của mảng sẽ đóng vai trò là phía sau của hàng đợi. Mối quan hệ sau đây cung cấp cho toàn bộ các phần tử tồn tại trong hàng đợi khi được triển khai bằng cách sử dụng các mảng.

2.  **Dynamic implementation**(triển khai động): thực hiện các hàng đợi bằng cách sử dụng các con trỏ, nhược điểm chính là một nút trong biểu diễn được liên kết sẽ tiêu tốn nhiều không gian bộ nhớ hơn một phần tử tương ứng trong biểu diễn mảng.
Vì có ít nhất hai trường trong mỗi nút một cho trường dữ liệu và trường khác để lưu địa chỉ của nút tiếp theo trong khi trong biểu diễn chỉ có trường dữ liệu là có. Công dụng của việc sử dụng biểu diễn được liên kết trở nên rõ ràng khi được yêu cầu chèn hoặc xóa một phần tử ở giữa một nhóm các phần tử khác.

## Hoạt động trên Stack
Các hoạt động cơ bản có thể được vận hành trên ngăn xếp như sau:

**PUSH** : khi một phần tử mới được thêm vào đầu ngăn xếp được gọi là hoạt động PUSH. Đẩy một phần tử trong ngăn xếp gọi thêm phần tử, vì phần tử mới sẽ được chèn ở trên cùng. Sau mỗi hoạt động đẩy, đỉnh được tăng thêm một. Nếu mảng đầy, và không có phần tử mới nào có thể được thêm vào, nó được gọi là điều kiện STACK-FULL hoặc STACK OVERFLOW.
Sử dụng **push** trong C
```
int stack [5], top = -1;
 void push() {
   int item;
   if (top < 4) {
     printf ("Enter the number");
     scan ("%d", & item);
     top = top + 1;
     stack [top] = item;
     }else {
      printf (" Stack is full");
     }
 }
```

**POP** : Khi một phần tử bị xóa khỏi đầu ngăn xếp, nó được gọi là hoạt động POP. Ngăn xếp được giảm đi một, sau mỗi hoạt động pop. Nếu không còn phần tử nào trên ngăn xếp và pop được thực hiện, thì điều này sẽ dẫn đến điều kiện STACK UNDERFLOW, điều đó có nghĩa là ngăn xếp của bạn trống.
Sử dụng **pop** trong C

```
int stack [5], top = -1;
void pop() {
int item;
if (top >= 4) {
  item = stack [top];
  top = top - 1;
  printf ("Number deleted is = %d", item) ;
}else {
  printf (" Stack is empty");
 }    
}
```

## Hoạt động trên Queue

Các hoạt động cơ bản có thể được thực hiện trên hàng đợi là:

1. **Enqueue** : Để chèn một phần tử vào hàng đợi
 Sử dụng Enqueue trong C:
 
```
int queue [5], Front = -1 and rear = -1;
 void add () {
   int item;
   if ( rear < 4) {
     printf ("Enter the number");
     scan ("%d", & item);
     if (front == -1) {
       front =0;
       rear =0;
     } else{
         rear = rear + 1;
     }
     queue [rear] = item ;
   }else {
     printf ("Queue is full") ;
   }
 }
```

2. **Dequeue** : Để xóa một phần tử vào hàng đợi
Sử dụng Dequeue trong C:

```
 int queue [5], Front = -1 and rear = -1;
 void delete () {
   int item;
   if ( front  != -1) {
    item = queue [ front ];
     if (front == rear) {
       front =-1;
       rear =-1;
     } else{
        front = front + 1;
        printf ("Number deleted is = %d", item);
     }
   }else {
     printf ("Queue is empty");
   }
 }
```

## Kết luận
Như vậy **Stack** và **Queue** là các cấu trúc dữ liệu tuyến tính khác nhau theo các cách nhất định như cơ chế làm việc, cấu trúc, cách thực hiện, các biến thể nhưng cả hai đều được sử dụng để lưu trữ các phần tử trong danh sách và thực hiện các thao tác trong danh sách như thêm và xóa các phần tử.

Trên đây là những chia sẻ của mình về sự khác nhau của **Stack** và **Queue**.