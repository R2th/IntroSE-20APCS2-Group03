# 3.8 Circular Linked Lists
Trong danh sách được liên kết đơn và danh sách được liên kết kép, phần cuối của danh sách được biểu thị bằng giá trị NULL.\
Nhưng danh sách liên kết vòng không có kết thúc.\
Trong khi lướt qua các danh sách liên kết vòng, chúng ta cần cẩn thận; nếu không, chúng ta sẽ đi vào danh sách vô hạn.\
Trong danh sách liên kết vòng, mỗi nút có một nút kế vị.\
Lưu ý rằng không giống như danh sách được liên kết đơn, không có nút nào có con trỏ NULL trong danh sách được liên kết tròn.\
Trong một số tình huống, danh sách liên kết vòng tròn rất hữu ích.\
Ví dụ: khi một số quy trình đang sử dụng cùng một tài nguyên máy tính (CPU) trong cùng một khoảng thời gian, chúng ta phải đảm bảo rằng không có quy trình nào truy cập tài nguyên trước khi tất cả các quy trình khác thực hiện (thuật toán round robin).\
Trong danh sách liên kết vòng, chúng tôi truy cập các phần tử bằng cách sử dụng nút đầu (tương tự như nút đầu trong danh sách liên kết đơn và danh sách liên kết đôi).\
Để dễ đọc, chúng ta hãy giả sử rằng tên lớp của danh sách liên kết vòng là CLLNode.


## Đếm số node trong một Circular Linked List
Danh sách hình tròn có thể truy cập được thông qua head node được đánh dấu. (Còn gọi là tail node).\
Để đếm các nút, danh sách phải được duyệt qua từ head node được đánh dấu, với sự trợ giúp của node tạm thời và dừng việc đếm khi node đó đến head node.\
Nếu danh sách trống, head sẽ là NULL, và trong trường hợp đó, bộ đếm = 0.\
Nếu không, hãy đặt con trỏ hiện tại thành nút đầu tiên và tiếp tục đếm cho đến khi con trỏ hiện tại đến nút bắt đầu.

![image.png](https://images.viblo.asia/713f8070-2319-4132-a0d8-9168a720f8cc.png)

```
    public int CircularListLength(CLLNode tail){
        int length = 0;
        CLLNode currentNode = tail.getNext();
        while(currentNode != tail){
            length++;
            currentNode = currentNode.getNext();
        }
        return length;
    }
```

Time Complexity: $O(n)$. Trong trường hợp xấu nhất, chúng ta có thể phải chèn nút vào cuối danh sách.\
Space Complexity: $O(1)$, để tạo một biến tạm thời.

## In ra nội dung của một circular list
Ở đây chúng tôi giả định rằng danh sách đang được truy cập bởi head node.\
Vì tất cả các nút được sắp xếp theo kiểu hình tròn, nên nút đuôi của danh sách sẽ là nút trước nút đầu.\
Giả sử chúng ta muốn in nội dung của các nút bắt đầu bằng nút đầu.\
In nội dung của nó, chuyển đến nút tiếp theo và tiếp tục in cho đến khi chúng ta đến nút đầu một lần nữa.

![image.png](https://images.viblo.asia/3f18394b-b314-4150-91d8-dd406b99953a.png)

```
    public int printCircularListDât(CLLNode tail){
        CLLNode currentNode = tail.getNext();
        while(currentNode != tail){
            System.out.print(currentNode.getData() + "->");
            currentNode = currentNode.getNext();
        }
        System.out.print("(" + currentNode.getData() + ")headNode");
    }
```


## Thêm một node vào cuối của một Circular Linked List
Nút mới sẽ được đặt ngay sau nút đuôi (là nút cuối cùng của danh sách), có nghĩa là nó sẽ phải được chèn vào giữa nút đuôi và nút đầu tiên.
* Tạo một nút mới và ban đầu giữ cho con trỏ next của nó trỏ đến chính nó.

![image.png](https://images.viblo.asia/51bb17aa-6d25-4380-bb4b-9216d72a23c9.png)
* Cập nhật con trỏ next của nút mới với nút đầu và cũng duyệt qua danh sách đến phần đuôi. Điều đó có nghĩa là trong một danh sách vòng tròn, chúng ta nên dừng lại ở nút có nút tiếp theo là nút đầu.

![image.png](https://images.viblo.asia/4c342f22-559e-4813-b193-614ea8a5ab61.png)
* Cập nhật con trỏ next của nút đầu để trỏ đến nút mới và chúng ta nhận được danh sách như hình dưới đây.

![image.png](https://images.viblo.asia/e0312827-7d5b-46bc-b2ae-d327d6caa820.png)

Time Complexity: $O(n)$. Trong trường hợp xấu nhất, chúng ta có thể phải chèn nút vào cuối danh sách.\
Space Complexity: $O(1)$, để tạo một biến tạm thời.

## Thêm một node vào trước của một Circular Linked List
Sự khác biệt duy nhất giữa việc chèn một nút vào đầu và cuối là, sau khi chèn nút mới, chúng ta chỉ cần cập nhật con trỏ. Các bước để thực hiện việc này được đưa ra dưới đây:
* Tạo một nút mới và ban đầu giữ cho con trỏ next của nó trỏ đến chính nó.

![image.png](https://images.viblo.asia/a638cc60-c980-4d26-87ec-24046c046121.png)

* Cập nhật con trỏ tiếp theo của nút mới với nút đầu và cũng duyệt qua danh sách cho đến tail node. Điều đó có nghĩa là trong một danh sách vòng tròn, chúng ta nên dừng lại ở nút là nút trước của nút cuối trong danh sách.

![image.png](https://images.viblo.asia/0c63b791-7f4f-4bc7-b860-7561f289c694.png)
* Cập nhật nút đầu trước đó trong danh sách để trỏ đến nút mới.

![image.png](https://images.viblo.asia/30adc1c2-90b1-4cc6-9234-e81706d52454.png)

* Đặt nút mới làm head.

![image.png](https://images.viblo.asia/57fc2075-fe91-4223-8e85-ebacdbc29fa8.png)

Time Complexity: $O(n)$. Trong trường hợp xấu nhất, chúng ta có thể phải chèn nút vào cuối danh sách.\
Space Complexity: $O(1)$, để tạo một biến tạm thời.

## Xóa node cuối cùng trong Circular List
Danh sách phải được duyệt qua để đến nút trước nút cuối. Để xóa nút 40 cuối cùng, danh sách phải được duyệt qua cho đến khi bạn đạt đến 7. Trường tiếp theo của 7 phải được thay đổi thành 60.
* Duyệt qua danh sách và tìm nút cuối và nút trước của nó.

![image.png](https://images.viblo.asia/09e4ea03-da28-4c03-bef8-180eede10821.png)
* Cập nhật con trỏ nút trước của nút đuôi trỏ tới nút đầu.

![image.png](https://images.viblo.asia/c5d9b51a-9890-4181-b234-f574115d1a0c.png)
* Loại bỏ nút cuối

![image.png](https://images.viblo.asia/f8c5e31a-649d-408e-8d5a-3951f085303c.png)


Time Complexity: $O(n)$. Trong trường hợp xấu nhất, chúng ta có thể phải chèn nút vào cuối danh sách.\
Space Complexity: $O(1)$, để tạo một biến tạm thời.

## Xóa node đầu tiên trong Circular List
Có thể xóa nút đầu tiên bằng cách thay thế nút tiếp theo của nút đuôi bằng nút tiếp theo của nút đầu tiên.
* Tìm nút đuôi của danh sách được liên kết bằng cách duyệt qua danh sách. Nút đuôi là nút trước của nút đầu mà chúng ta muốn xóa.

![image.png](https://images.viblo.asia/e4f49e2e-db83-4c6c-9807-9f690c1e7cfb.png)
* Tạo một nút tạm thời sẽ trỏ đến nút đầu. Ngoài ra, cập nhật con trỏ next của các nút đuôi để trỏ đến nút tiếp theo của đầu (như hình dưới đây).

![image.png](https://images.viblo.asia/f023f520-d90f-42ef-81df-4306f22405e5.png)
* Bây giờ, di chuyển con trỏ đầu đến nút tiếp theo, loại bỏ nút đầu. 

![image.png](https://images.viblo.asia/74fbd34a-d06b-4ea7-a728-a800cc52f188.png)

Time Complexity: $O(n)$. Trong trường hợp xấu nhất, chúng ta có thể phải chèn nút vào cuối danh sách.\
Space Complexity: $O(1)$, để tạo một biến tạm thời.

## Ứng dụng của Circular List
Danh sách liên kết tròn được sử dụng để quản lý tài nguyên máy tính của máy tính. Chúng ta có thể sử dụng danh sách vòng tròn để triển khai ngăn xếp và hàng đợi.