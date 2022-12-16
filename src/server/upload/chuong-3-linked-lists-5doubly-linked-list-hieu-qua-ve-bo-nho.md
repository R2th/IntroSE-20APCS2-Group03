### 3.9 Doubly Linked List hiệu quả về bộ nhớ
Trong cách triển khai thông thường, chúng ta cần giữ một con trỏ next trỏ đến mục tiếp theo trong danh sách và một con trỏ prev trỏ tới mục trước đó.\
Điều đó có nghĩa là, các phần tử trong triển khai danh sách được liên kết kép bao gồm dữ liệu, một con trỏ đến nút tiếp theo và một con trỏ đến nút trước đó trong danh sách như được hiển thị bên dưới.

**Conventional Node Definition**
```
    public class DLLNode{
        private int data;
        private DLLNode next;
        private DLLNode prev;
        ...............
    }
```

Hiện tại chúng ta có một cách triển khai thay thế của danh sách liên kết kép ADT, với các thao tác chèn, duyệt và xóa.
Việc triển khai này dựa trên sự khác biệt của con trỏ. Mỗi nút chỉ sử dụng một con trỏ để duyệt qua lại danh sách.\
Nó còn được gọi là **XOR Linked List**

**New Node Definition**
```
    public class ListNode{
        private int data;
        private ListNode ptrdiff;
        ...............
    }
```

Con trỏ ptrdiff chứa sự khác biệt giữa con trỏ tới nút tiếp theo và con trỏ tới nút trước đó.
Sự khác biệt của con trỏ được tính bằng cách sử dụng phép toán exclusive-or $(⊕)$
> ptrdiff = pointer to previous node $⊕$ pointer to next node

Điểm chính của nút bắt đầu (head node) là $⊕$ của NULL và nút tiếp theo của head.\
Tương tự, điểm thứ tự của nút kết thúc là $⊕$ của nút trước đó (trước đến nút cuối) và NULL.\
Ví dụ, hãy xem xét danh sách liên kết sau đây.

![image.png](https://images.viblo.asia/62c13eca-c4bb-46c9-a0b9-260cf4525855.png)

Trong ví dụ trên,
* Con trỏ tiếp theo của A là: NULL $⊕$ B
* Con trỏ tiếp theo của B là: A $⊕$ C
* Con trỏ tiếp theo của C là: B $⊕$ D
* Con trỏ tiếp theo của D là: C $⊕$ NULL


\
**Why does it work?**\
Để tìm câu trả lời cho câu hỏi này, chúng ta hãy xem xét các thuộc tính của ⊕:
* X ⊕ X = 0
* X ⊕ 0 = X
* X ⊕ Y = Y ⊕ X (symmetric - tính đối xứng)
* (X ⊕ Y) ⊕ Z = X ⊕ (Y ⊕ Z) (transitive - tính bắc cầu)

Với ví dụ trên, chúng ta hãy giả sử rằng chúng ta đang ở nút C và muốn chuyển đến nút B.\
Chúng ta biết rằng ptrdiff của nút C được định nghĩa là B ⊕ D.\
Nếu chúng ta muốn di chuyển đến B, thực hiện ⊕ trên điểm thứ ba của C với D sẽ cho B.\
Điều này là do thực tế rằng,

![image.png](https://images.viblo.asia/9d970b3e-30d3-4f59-9958-eb4b1bd035ff.png)

Tương tự, nếu chúng ta muốn chuyển đến D, thì chúng ta phải áp dụng ⊕ cho ptrdiff của C với B để có được D.

![image.png](https://images.viblo.asia/822f1caf-5f1a-46ad-9c52-f0d99bd7df31.png)

Từ thảo luận trên, chúng ta có thể thấy rằng chỉ bằng cách sử dụng một con trỏ duy nhất, chúng ta có thể di chuyển qua lại.\
Có thể triển khai danh sách liên kết kép một cách hiệu quả về bộ nhớ mà không ảnh hưởng đến hiệu quả thời gian một cách tối thiểu.

**Note**: Ở đây mình không implement vì nếu chúng ta cần lấy XOR của hai địa chỉ, chúng ta cần truyền địa chỉ bộ nhớ thành số nguyên, điều này không thể thực hiện được trong java. Nó có thể implement sử dụng C/C++, các bạn nếu muốn tìm hiểu thêm có thể tham khảo [ở đây](https://www.geeksforgeeks.org/xor-linked-list-a-memory-efficient-doubly-linked-list-set-1/)