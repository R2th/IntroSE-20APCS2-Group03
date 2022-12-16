### Mở đầu
Hello các bạn, hôm nay mình sẽ chia sẻ với các bạn cách để có thể tự xây dựng 2 loại cấu trúc dữ liệu stack(ngăn xếp) và queue(hàng đợi) sử dụng mảng trong C++;

Thông thường, trong quá trình làm việc mình nghĩ chắc hẳn đã có nhiều bạn đã từng làm việc với 2 loại cấu trúc dữ liệu này. Và hầu hết là các bạn đều sử dụng các lớp Stack, Queue được xây dựng sẵn của ngôn ngữ lập trình. Vậy đã bao giờ bạn nghĩ rằng Stack và Queue được xây dựng như thế nào? Và liệu rằng chính mình có tự xây dựng nó được không? Mình sẽ trả lời giúp bạn là "Có, hoàn toàn có thể luôn".

Vậy trước khi đi vào việc xây dựng nó, mình sẽ lướt qua 1 chút kiến thức cơ bản về 2 loại cấu trúc này nhé.
### 1. Giới thiệu về Stack và Queue.
#### 1.1 Stack
Stack hay còn gọi là ngăn xếp, là 1 loại cấu trúc dữ liệu trừu tượng hoạt động theo nguyên lý "Vào Sau Ra Trước" - Last In First Out(LIFO).

![](https://images.viblo.asia/4399b6f2-7d4f-4f8e-9014-a6978aa41409.png)

Hình vẽ trên mô tả khá rõ về cấu trúc của 1 stack như đã định nghĩa. Để dễ hình dùng hơn, mình sẽ lấy 1 ví dụ cụ thể như này. Ví dụ bạn có 1 giá sách, nếu bạn muốn thêm 1 quyển sách mới vào giá, bạn chỉ việc đặt quyển sách đó lên đỉnh của giá. Hoặc nếu bạn muốn lấy 1 quyển sách từ giá, bạn chỉ việc lấy quyển sách đầu tiên ra khỏi giá.
Ngăn xếp đơn giản phải không nào! Vì vậy các thao tác với ngăn xếp cũng đơn giản thôi. Đây là một số thao tác cơ bản với ngăn xếp:
   1. push: đẩy 1 phần thử vào đầu ngăn xếp.
   2. pop: xóa 1 phần tử đầu khỏi ngăn xếp.
   3. peek: lấy 1 phần tử đầu của ngăn xếp mà không xóa phần tử đó.
   4. isFull: kiểm tra ngăn xếp đã đầy chưa.
   5. isEmpty: kiểm tra ngăn xếp có rỗng không.
- **Chú ý:** Tất cả các thao tác với ngăn xếp chỉ tác động đến phần tử ở đầu ngăn xếp.

OK, về stack mình chỉ nói ngắn gọn vậy thôi. Có thời gian mình sẽ viết chi tiết thêm nữa hoặc bạn tự tìm hiểu nhé. Bây giờ mình chuyển qua tìm hiểu Queue xem nó thế nào nhé! Let's go.
#### 1.2 Queue
Queue hay còn gọi là hàng đợi, là 1 loại cấu trúc dữ liệu trừu tượng hoạt động theo nguyên lý "Vào Trước Ra Trước" - First In First Out(FIFO).

![](https://images.viblo.asia/53a48f0e-d6a7-4e1b-9a8f-05ccd200bf33.jpg)

Hình vẽ này cũng mô tả khá rõ về cấu trúc của 1 hàng đợi. Tuy nhiên mình muốn lấy 1 ví dụ thực tế hơn cho các bạn dễ hình dung. Ví dụ khi bạn vào 1 quầy bán vé xem phim, người bán thì chỉ có 1, còn người mua thì rất đông. Vì vậy các bạn phải xếp hàng lần lượt để đợi. Như vậy, bạn nào xếp hàng trước thì sẽ mua được vé trước, bạn nào vào sau thì mua sau. (Tuy nhiên, thực tế thì không phải lúc nào cũng vậy :'()

Hàng đợi cũng không phải cái gì cao siêu đúng không các bạn. Do đó khi làm việc với hàng đợi cũng có một số thao tác cơ bản sau:

   1. enqueue: thêm 1 phần tử vào hàng đợi.
   2. dequeue: xóa 1 phần tử khỏi hàng đợi.
   3. peek: lấy 1 phần tử đầu của hàng đợi mà không xóa nó.
   4. isFull: kiểm tra hàng đợi đã đầy chưa.
   5. isEmpty: kiểm tra hàng đợi có rỗng không.

**Chú ý:** Tất cả các thao tác với hàng đợi sẽ tác động đến phần tử đầu và cuối của hàng đợi.

Đến đây, mình đã cung cấp cho các bạn những hiểu biết cơ bản nhất về ngăn xếp và hàng đợi rồi đấy. Bây giờ mình sẽ hướng dẫn dẫn các bạn cách xây dựng cụ thể của từng loại như thế nào nhé. Đâu tiên là stack nha.
À, ở phần xây dựng này mình sử dụng C++ để code nha, các bạn có thể sử dụng Java hoặc ngôn ngữ nào mà bạn thích để làm theo. Mình nghĩ việc xây dựng bằng ngôn ngữ khác cũng không khác nhau là mấy đâu, quan trọng là ở cái logic thôi. Ahihi (^_^)
### 2. Xây dựng Stack
 Đầu tiên mình sẽ thực hiện khởi tạo stack với các thông tin: vị trí top(đỉnh ngăn xếp), kích thước ngăn xếp
```
// định nghĩa kích thước của ngăn xếp
int size = 100;
// tạo 1 biến để xác định vị trí đầu ngăn xếp
int top = 0;
// khai báo 1 mảng để tạo ngăn xếp
int stack[100];
```
 Tiếp theo là việc định nghĩa các phương thức tương ứng với các thao tác như bên trên mình đã nói.
- **isEmpty**: kiểm tra ngăn xếp có rỗng không
```
bool isEmpty() {
    return top == 0 ? true : false;
}
```
- **isFull**: kiểm tra xem ngăn xếp đã đầy chưa
```
bool isFull() {
    return top == size ? true : false;
}
```
- **push**: đưa 1 phần tử vào đầu ngăn xếp
```
void push(int item) {
    if (isFull()) {
        cout << "Ngăn xếp đầy rùi má ơi, không push được nữa đâu!" << endl;
        return;
    }
    top++;
    stack[top] = item;
}
```
- **pop**: xóa 1 phần tử khỏi đầu ngăn xếp
```
void pop() {
    if (isEmpty()) {
        cout << "Uầy, ngăn xếp rỗng má ơi, có gì đâu mà pop!"
        return;
    }
    stack[top] = 0;
    top--;
}
```
- peek: lấy 1 phần tử đầu ngăn xếp mà không xóa nó
```
int peek() {
    return stack[top];
}
```

 OK, vậy là bạn đã xây dựng xong các thao tác cơ bản với stack rồi đó, cũng không có gì làm khó bạn đúng không nào. Đây là chương trình đầy đủ khi ghép nối các phương thức trên lại với nhau.
```
#include <iostream>

using namespace std;

int size = 10;
int top = -1;
int stack[10];

bool isEmpty() {
    return top == -1 ? true : false;
}

bool isFull() {
    return top == size ? true : false;
}

void push(int item) {
    if (isFull()) {
        cout << "Ngăn xếp đầy rùi má ơi, không push được nữa đâu!" << endl;
        return;
    }
    top++;
    stack[top] = item;
}

void pop() {
    if (isEmpty()) {
        cout << "Uầy, ngăn xếp rỗng má ơi, có gì đâu mà pop!" << endl;
        return;
    }
    stack[top] = 0;
    top--;
}

int peek() {
    return stack[top];
}

int main() {
    // gọi các thao tác với stack ở đây
    return 0;
}
```
Tiếp theo sẽ là queue nhé
### 3. Xây dựng Queue
 Đầu tiên thì vẫn là việc khởi tạo queue, tương tự như stack thôi mà :)
```
// định nghĩa kích thước của hàng đợi
int size = 10;
// đánh dấu vị trí đầu hàng đợi
int front = 0;
// đánh dấu vị trí cuối hàng đợi
int rear = -1;
// khai báo 1 mảng để tạo hàng đợi
int queue[10];
```
 Tiếp theo mình sẽ định nghĩa các thao tác với hàng đợi.
- **isEmpty():** kiểm tra hàng đợi có rỗng không.
```
bool isEmpty() {
    return (front < 0 || front > rear) ? true : false;
}
```
- **isFull():** kiểm tra hàng đợi đã đầy chưa.
```
bool isFull() {
    return rear == size - 1 ? true : false;
}
```
- **enqueue:** thêm 1 phần tử vào hàng đợi.
```
void enqueue(int item) {
    if (isFull()) {
        cout << "Hàng đợi đầy rùi má ơi, không enqueue được nữa đâu!" << endl;
        return;
    }
    rear++;
    queue[rear] = item;
}
```
- **dequeue():** xóa 1 phần tử khỏi hàng đợi.
```
void dequeue() {
    if (isEmpty()) {
        cout << "Uầy, hàng đợi rỗng má ơi, có gì đâu mà dequeue!" << endl;
        return;
    }
    queue[front] = 0;
    front++;
}
```
- **peek():** lấy phần tử đầu của hàng đợi mà không xóa nó.
```
int peek() {
    return queue[front];
}
```
 Yeh, vậy là cũng xong việc xây dựng các thao tác với queue rồi đó các bạn, công việc còn lại là ghép code nữa thôi. Đây là chương trình hoàn chỉnh sau khi ghép nối các phương thức.
```
#include <iostream>

using namespace std;

int size = 10;
int front = 0;
int rear = -1;
int queue[10];

bool isEmpty() {
    return (front < 0 || front > rear) ? true : false;
}

bool isFull() {
    return rear == size - 1 ? true : false;
}

void enqueue(int item) {
    if (isFull()) {
        cout << "Hàng đợi đầy rùi má ơi, không enqueue được nữa đâu!" << endl;
        return;
    }
    rear++;
    queue[rear] = item;
}

void dequeue() {
    if (isEmpty()) {
        cout << "Uầy, hàng đợi rỗng má ơi, có gì đâu mà dequeue!" << endl;
        return;
    }
    queue[front] = 0;
    front++;
}

int peek() {
    return queue[front];
}

int main() {
    // gọi các thao tác với queue ở đây
    return 0;
}
```
### Kết luận
Trên đây, là những chia sẻ của mình về Stack và Queue. Như mình có nói ở phần mở đầu, trong thực tế khi bạn đi làm, rất ít khi bạn phải tự xây dựng lại những loại cấu trúc dữ liệu dạng này. Vì hầu hết chúng đã được tích hợp sẵn trong các ngôn ngữ lập trình rồi. Tuy nhiên, khi sử dụng các loại cấu trúc dữ liệu như này thì các bạn cũng nên biết sâu một chút về nó thì vẫn tốt hơn. Mình hy vọng qua bài biết này, các bạn sẽ nắm được những kiến thức cơ bản như: cách thức hoạt động, các thao tác và cách để xây dựng được 2 loại cấu trúc này. Bài viết trên mình đang sử dụng mảng trong C++ để cài đặt. Các bạn hoàn toàn có thể sử dụng ngôn ngữ khác như: java, c#... và cấu trúc khác như: danh sách liên kết, ... để cài đặt theo ý mình. Chúc các bạn thành công. Trong quá trình viết bài không tránh khỏi những thiếu sót, rất mong được sự phản hồi góp ý từ các bạn để bài viết được tốt hơn. Thanks all!